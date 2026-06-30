import fs from "node:fs";
import path from "node:path";
import { highlightCode } from "./highlight";

export const SITE_NAME = "Aula en la nube";
export const SITE_URL = "https://aulaenlanube.com";

const DATA = path.join(process.cwd(), "tools", "data");
function read<T>(f: string): T {
  return JSON.parse(fs.readFileSync(path.join(DATA, f), "utf8")) as T;
}

/* ---------- tipos de datos crudos ---------- */
export interface Lesson {
  id: number; slug: string; path: string; title: string;
  videoId: string; videoUrl: string; desc: string;
  parent: number; menuOrder: number; date: string; family: string;
  yoastTitle: string; yoastDesc: string; thumb: string;
}
export interface Post {
  id: number; slug: string; path: string; title: string;
  date: string; modified: string; parent: number; menuOrder: number;
  content: string; contentLen: number;
  yoastTitle: string; yoastDesc: string; thumb: string;
  categories: { name: string; slug: string }[];
}
export interface Landing {
  id: number; slug: string; path: string; title: string; date: string;
  parent: number; menuOrder: number; content: string; contentLen: number;
  elementorTexts: string[]; elementorHeadings: string[]; elementorImages: string[];
  elemLen: number; hasVideoWidget: boolean;
  yoastTitle: string; yoastDesc: string; thumb: string;
}
interface Head { path: string; title: string; description: string; canonical: string; }
export interface Product {
  id: number; name: string; url: string; image: string;
  description: string; cta: string; badge: string;
}

const lessons = read<Lesson[]>("lessons.json");
const posts = read<Post[]>("posts.json");
const landings = read<Landing[]>("landings.json");
const heads = read<Head[]>("head.json");

// Productos propios (bloques que sustituyen a AdSense). Tolerante si no existe aún.
let products: Product[] = [];
try { products = read<Product[]>("products.json"); } catch { products = []; }
export function getProducts(limit?: number): Product[] {
  return typeof limit === "number" ? products.slice(0, limit) : products;
}

// Menú principal (réplica del de WordPress). Tolerante si no existe.
export interface MenuItem { title: string; url: string; external?: boolean; children?: MenuItem[]; }
let menu: MenuItem[] = [];
try { menu = read<MenuItem[]>("menu.json"); } catch { menu = []; }
export function getMenu(): MenuItem[] { return menu; }

// El <title> del crawl puede traer entidades HTML (&#038;, &#8230;, ...).
// Las decodificamos para que React no las doble-escape y el título sea fiel.
function decodeEntities(s: string): string {
  return (s || "")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "…")
    .replace(/&raquo;/g, "»")
    .replace(/&laquo;/g, "«");
}
const headByPath = new Map(
  heads.map((h) => [h.path, { ...h, title: decodeEntities(h.title) }])
);

// Clave normalizada (decodifica %xx) para tolerar que Next devuelva los
// params descodificados (p.ej. "▷") aunque la ruta original esté codificada.
function normKey(p: string): string {
  return p
    .split("/")
    .map((s) => {
      let cur = s;
      // Decodifica de forma iterativa: Next puede doble-codificar el '%'
      // de rutas como %e2%96%b7 (▷) -> %25e2%2596%25b7.
      for (let i = 0; i < 4; i++) {
        try {
          const dec = decodeURIComponent(cur);
          if (dec === cur) break;
          cur = dec;
        } catch {
          break;
        }
      }
      return cur;
    })
    .join("/");
}

const lessonByPath = new Map(lessons.map((l) => [normKey(l.path), l]));
const postByPath = new Map(posts.map((p) => [normKey(p.path), p]));
const landingByPath = new Map(landings.map((l) => [normKey(l.path), l]));
const lessonById = new Map(lessons.map((l) => [l.id, l]));

// Mapa ruta → portada (thumb), de cualquier tipo de página.
const thumbByPath = new Map<string, string>();
for (const x of [...lessons, ...posts, ...landings]) {
  if (x.thumb) thumbByPath.set(normKey(x.path), x.thumb);
}
const thumbOf = (path: string) => thumbByPath.get(normKey(path));

/* ---------- arbol unificado (para navegacion e indices) ---------- */
type Kind = "lesson" | "post" | "landing";
interface Node {
  id: number; path: string; title: string;
  menuOrder: number; date: string; parent: number; kind: Kind;
}
const nodes: Node[] = [
  ...lessons.map((l) => ({ id: l.id, path: l.path, title: l.title, menuOrder: l.menuOrder, date: l.date, parent: l.parent, kind: "lesson" as const })),
  ...posts.map((p) => ({ id: p.id, path: p.path, title: p.title, menuOrder: p.menuOrder, date: p.date, parent: p.parent, kind: "post" as const })),
  ...landings.map((l) => ({ id: l.id, path: l.path, title: l.title, menuOrder: l.menuOrder, date: l.date, parent: l.parent, kind: "landing" as const })),
];
const nodeById = new Map(nodes.map((n) => [n.id, n]));
const childrenByParent = new Map<number, Node[]>();
for (const n of nodes) {
  const arr = childrenByParent.get(n.parent) ?? [];
  arr.push(n);
  childrenByParent.set(n.parent, arr);
}
function sortNodes(arr: Node[]): Node[] {
  // menuOrder es 0 en el 86% de lecciones; la fecha de publicación refleja
  // mejor la secuencia pedagógica real en WordPress. Orden: fecha → menuOrder → título.
  return [...arr].sort(
    (a, b) =>
      a.date.localeCompare(b.date) ||
      a.menuOrder - b.menuOrder ||
      a.title.localeCompare(b.title)
  );
}
function childrenOf(id: number): Node[] {
  return sortNodes(childrenByParent.get(id) ?? []);
}

export interface NavLink { path: string; title: string; }

function prevNextOf(n: Node): { prev?: NavLink; next?: NavLink } {
  const sibs = sortNodes(childrenByParent.get(n.parent) ?? []);
  const i = sibs.findIndex((s) => s.id === n.id);
  const prev = i > 0 ? sibs[i - 1] : undefined;
  const next = i >= 0 && i < sibs.length - 1 ? sibs[i + 1] : undefined;
  return {
    prev: prev ? { path: prev.path, title: prev.title } : undefined,
    next: next ? { path: next.path, title: next.title } : undefined,
  };
}
function parentLinkOf(n: Node): NavLink | undefined {
  const p = nodeById.get(n.parent);
  return p ? { path: p.path, title: p.title } : undefined;
}

/* ---------- utilidades ---------- */
function stripHtml(s: string): string {
  return (s || "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}
// Enlaces de "cita" cuyo texto visible es solo un dominio/URL (típico del
// contenido con referencias). Migrados, quedan pegados a la palabra anterior y
// se ven como un error ("simples" + "es.wikipedia.org"). Aquí los reconvertimos:
// el enlace pasa a subrayar la palabra previa (sin mostrar la URL) y, si no hay
// palabra delante, queda una marca discreta. Citas consecutivas se colapsan.
const CITE_HOST =
  /^(?:https?:\/\/)?(?:www\.)?(?:[a-z0-9-]+\.)+(?:com|org|net|es|io|dev|ai|edu|gov|co|info|tv|me|news|tech|app|gg|xyz)(?:[/?#][^\s]*)?$/i;
const WORD = "A-Za-z0-9áéíóúüñçÁÉÍÓÚÜÑÇ";
// Sentinels en el Área de Uso Privado Unicode: jamás aparecen en el contenido.
// (Se localizan con indexOf, no dentro de regex, para evitar rarezas del motor.)
const CS = "";
const CE = "";
// Fronteras de "ámbito" de una cita: la frase-ancla no las cruza.
const CITE_BOUNDARY = /[<>.,;:!?()[\]{}«»¿¡–—"“”…]/;
// Conectores que pueden ir dentro de un término ("ATI Radeon", "GeForce de la serie").
const CITE_JOIN = new Set(["de", "del", "la", "el", "los", "las", "y", "e", "o", "con", "para"]);
// Palabras vacías: por sí solas no merecen ser el ancla de una cita.
const CITE_STOP = new Set([
  "de","del","la","las","el","los","y","e","o","u","con","para","por","en","a","al","un","una",
  "su","sus","que","como","más","muy","solo","sólo","ya","fue","son","era","ser","han","ha","se",
  "lo","le","les","este","esta","esto","ese","esa","sobre","entre","desde","hasta","cada","tan","menos",
]);
// Palabra "significativa": nombre propio, sigla/modelo o con dígitos (términos técnicos).
function citeIsSig(w: string): boolean {
  return /^[A-ZÁÉÍÓÚÜÑ]/.test(w) || /^[A-Z0-9]+$/.test(w) || /\d/.test(w);
}
// Elige cuántas palabras finales (índice de inicio) forman el ancla del término.
function pickCiteAnchor(toks: string[]): number {
  let start = toks.length - 1; // la última palabra siempre va dentro
  while (start - 1 >= 0) {
    const prev = toks[start - 1];
    if (citeIsSig(prev)) { start--; continue; }                                  // racha de nombres/modelos
    const lp = prev.toLowerCase();
    if (CITE_JOIN.has(lp) && start - 2 >= 0 && citeIsSig(toks[start - 2])) {       // sig + conector + sig
      start -= 2; continue;
    }
    break;
  }
  // Término llano de dos palabras ("shaders unificados", "tiempo real").
  if (start === toks.length - 1 && start - 1 >= 0) {
    const prev = toks[start - 1].toLowerCase();
    if (!citeIsSig(toks[start]) && !CITE_STOP.has(prev)) start--;
  }
  if (toks.length - start > 6) start = toks.length - 6;                           // tope de seguridad
  return start;
}
// Índice (en `before`) donde empieza la frase-ancla; -1 si no hay palabra previa.
function citeAnchorStart(before: string): number {
  const segStart = before.lastIndexOf(">") + 1; // solo el nodo de texto final (no cruza etiquetas)
  let clauseStart = segStart;
  for (let k = before.length - 1; k >= segStart; k--) {
    if (CITE_BOUNDARY.test(before[k])) { clauseStart = k + 1; break; }
  }
  const clause = before.slice(clauseStart);
  const tokRe = new RegExp("[" + WORD + "]+(?:[-‑/.][" + WORD + "]+)*", "g");
  const toks: { w: string; i: number }[] = [];
  let t: RegExpExecArray | null;
  while ((t = tokRe.exec(clause))) toks.push({ w: t[0], i: t.index });
  if (!toks.length) return -1;
  return clauseStart + toks[pickCiteAnchor(toks.map((x) => x.w))].i;
}
// ¿El enlace es una "cita"/referencia? Señales: fragmento de texto (#:~:text=,
// generado al "copiar enlace al fragmento" — casi siempre una cita), el texto
// visible es un dominio, o es un título de referencia (" - Wikipedia", "| Renesas").
const CITE_REF_TITLE =
  /\s[-–—|]\s*(?:Wikipedia|[A-Z][\w.&]+)\s*$|Wikipedia,?\s+la enciclopedia/i;
function isCitationLink(href: string, text: string): boolean {
  return /#:~:text=/.test(href) || CITE_HOST.test(text) || CITE_REF_TITLE.test(text);
}
// Frases-ancla elegidas a mano (vía revisión) para citas de artículos clave
// (hardware): mapa "href¦cola-normalizada-del-texto-previo" → frase literal.
// Permite anclar el término con sentido en vez de una palabra genérica.
let _citeOv: Record<string, string> | null = null;
function citeOverrides(): Record<string, string> {
  if (_citeOv) return _citeOv;
  try { _citeOv = read<Record<string, string>>("citation-anchors.json"); }
  catch { _citeOv = {}; }
  return _citeOv;
}
function citeDecodeEnt(s: string): string {
  return s.replace(/&amp;/g, "&").replace(/&nbsp;/g, " ")
    .replace(/&#0?39;|&#x27;|&apos;|&#8217;|&rsquo;/g, "'").replace(/&quot;|&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&ndash;/g, "–").replace(/&mdash;/g, "—").replace(/&hellip;/g, "…");
}
// Clave estable: href + últimos 40 alfanuméricos del texto previo (decodificado).
function citeKey(href: string, beforeRaw: string): string {
  const n = citeDecodeEnt(beforeRaw.replace(/<[^>]+>/g, "")).toLowerCase().replace(/[^a-z0-9áéíóúñü]/gi, "");
  return href + "¦" + n.slice(-40);
}
// Elemento en línea (negrita/cursiva…) justo antes de la cita: cuando no queda
// texto suelto que anclar, se enlaza ese elemento entero (su término clave).
// Solo el ÚLTIMO elemento en línea con TEXTO PLANO dentro (sin etiquetas), para
// no abarcar varios elementos/párrafos por error.
const CITE_INLINE_EL = /<(strong|em|b|i|code|span|mark|abbr)\b[^>]*>([^<]+)<\/\1>\s*$/i;
function tidyCitations(html: string): string {
  if (!html || !html.includes("<a")) return html;
  // 1) Sentinela cada enlace-cita (dominio, fragmento #:~:text= o título de referencia).
  const s = html.replace(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (m, href, inner) =>
    isCitationLink(href, inner.replace(/<[^>]+>/g, "").trim()) ? CS + href + CE : m
  );
  if (!s.includes(CS)) return html;
  // 2) Procesa cada cita: la frase-ancla previa pasa a ser el enlace; si no hay
  //    palabra delante, queda una marca discreta «↗». Citas consecutivas (solo
  //    espacios entre medias) se colapsan en una.
  const link = (href: string, text: string) =>
    '<a href="' + href + '" target="_blank" rel="nofollow noopener">' + text + "</a>";
  let out = "";
  let i = 0;
  for (;;) {
    const a = s.indexOf(CS, i);
    if (a < 0) { out += s.slice(i); break; }
    const b0 = s.indexOf(CE, a);
    if (b0 < 0) { out += s.slice(i); break; }
    const href = s.slice(a + 1, b0);
    let j = b0 + 1;
    for (;;) {
      let k = j;
      while (k < s.length && /\s/.test(s[k])) k++;
      if (s[k] === CS) { const e = s.indexOf(CE, k); if (e < 0) break; j = e + 1; }
      else break;
    }
    const ovKey = citeKey(href, s.slice(i, a)); // clave antes de desenvolver el "("
    let before = s.slice(i, a);
    // Cita entre paréntesis "( … )": quitamos los paréntesis y enlazamos la
    // frase previa (p.ej. "…1.0 GHz en 2000 (Clock rate - Wikipedia)").
    if (/\(\s*$/.test(before) && s[j] === ")") {
      before = before.replace(/\s*\(\s*$/, "");
      j += 1;
    }
    // 1) Frase-ancla elegida a mano (override): se enlaza esa frase literal
    //    dentro del nodo de texto final.
    const ov = citeOverrides()[ovKey];
    const seg = before.lastIndexOf(">") + 1;
    let pos = ov ? before.lastIndexOf(ov) : -1;
    if (ov && pos >= seg) {
      out += before.slice(0, pos) + link(href, ov) + before.slice(pos + ov.length);
      i = j;
      continue;
    }
    // 2) Heurística: frase-ancla en el nodo de texto final.
    const at = citeAnchorStart(before);
    // Ancla "débil": un número/año/unidad suelto o una palabra vacía. En ese
    // caso, si justo antes hay un término en negrita/cursiva, lo enlazamos a él
    // (p.ej. "…<strong>1.0 GHz</strong> en 2000 (cita)" → enlace en "1.0 GHz").
    const isWeak = (c: string) =>
      /^[\d.,]+\s*[a-zA-Z%º°]{0,4}$/.test(c) || (!/\s/.test(c) && CITE_STOP.has(c.toLowerCase()));
    if (at >= 0) {
      const tail = before.slice(at);
      const trail = (tail.match(/\s+$/) || [""])[0];
      const core = tail.slice(0, tail.length - trail.length);
      const head = before.slice(0, seg);
      const elH = isWeak(core) ? head.match(CITE_INLINE_EL) : null;
      if (elH && stripHtml(elH[2]).trim()) {
        const elTrail = (elH[0].match(/\s+$/) || [""])[0];
        const elHtml = elH[0].slice(0, elH[0].length - elTrail.length);
        out += head.slice(0, head.length - elH[0].length) +
          '<a href="' + href + '" target="_blank" rel="nofollow noopener">' + elHtml + "</a>" +
          elTrail + before.slice(seg);
      } else {
        out += before.slice(0, at) + link(href, core) + trail;
      }
    } else {
      // 3) Sin texto suelto: enlazar el elemento en línea previo (negrita…).
      const el = before.match(CITE_INLINE_EL);
      if (el && stripHtml(el[2]).trim()) {
        const trail = (el[0].match(/\s+$/) || [""])[0];
        const elHtml = el[0].slice(0, el[0].length - trail.length);
        out += before.slice(0, before.length - el[0].length) +
          '<a href="' + href + '" target="_blank" rel="nofollow noopener">' + elHtml + "</a>" + trail;
      } else {
        // 4) Último recurso: marca discreta «↗».
        out += before + '<sup class="aeln-cite">' + link(href, "↗") + "</sup>";
      }
    }
    i = j;
  }
  return out;
}
// Citas en TEXTO PLANO (sin enlace) tipo "(Título - Wikipedia)" o "(… | Renesas)":
// las quitamos, ya que no aportan nada (no hay enlace que conservar).
const CITE_PLAIN =
  /\s*\([^()]*?(?:\s[-–—|]\s*Wikipedia|Wikipedia,?\s+la enciclopedia|\s\|\s*[A-Z][\w.&]+)[^()]*?\)/g;
function removePlainRefs(html: string): string {
  return html.replace(CITE_PLAIN, "");
}

function sanitize(html: string): string {
  const cleaned = (html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<ins\b[^>]*(?:adsbygoogle|data-ad-)[\s\S]*?<\/ins>/gi, "") // quita unidades AdSense (por clase o por data-ad-*)
    // Los emoji de WordPress vienen como <img class="emoji" .../> y, sin el CSS
    // de WP, se renderizan enormes. Los sustituimos por su carácter unicode (alt).
    .replace(/<img\b[^>]*>/gi, (tag) =>
      /class="[^"]*\bemoji\b|s\.w\.org\/images\/core\/emoji|\/emoji\//i.test(tag)
        ? (tag.match(/\balt="([^"]*)"/)?.[1] ?? "")
        : tag
    )
    // Estilos rotos de Elementor (variables CSS sin valor): sin el CSS de
    // WordPress dejarían el texto sin formato o, peor, invisible.
    .replace(/\sstyle="[^"]*(?:var\(|--e-global)[^"]*"/gi, "")
    .replace(/ on[a-z]+="[^"]*"/gi, "");
  return removePlainRefs(tidyCitations(cleaned));
}

// URL interna absoluta (https://aulaenlanube.com/...) → relativa, para que las
// imágenes funcionen igual en staging (/preview-next) y tras el cutover.
function relUrl(u: string): string {
  return (u || "").replace(/^https?:\/\/(?:www\.)?aulaenlanube\.com/i, "");
}
function clip(s: string, n = 158): string {
  const t = stripHtml(s);
  return t.length > n ? t.slice(0, n - 1).trimEnd() + "…" : t;
}

// Las landings "friki" del original eran rejillas Elementor de productos de
// afiliado: cada ficha = una imagen + un título + un enlace (amzn/amazon) con el
// texto "VER PRODUCTO". El contenido migrado conserva esa secuencia en plano;
// aquí la reconstruimos como tarjetas para maquetarla igual que el original.
const PRODUCT_CARD_RE =
  /<img[^>]*\bsrc="([^"]+)"[^>]*>([\s\S]*?)<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;

// Emojis e iconos SVG decorativos (p.ej. los emoji de WordPress en los títulos)
// no son imágenes de producto: se descartan antes de emparejar fichas.
const isDecorativeImg = (src: string) => /emoji|s\.w\.org|\.svg(\?|$)|\/svg\//i.test(src);

function parseProductCards(content: string): { intro: string; cards: ProductCard[] } {
  const c = (content || "").replace(/<img[^>]*>/gi, (tag) => {
    const m = tag.match(/\bsrc="([^"]*)"/);
    return m && isDecorativeImg(m[1]) ? "" : tag;
  });
  const first = c.search(/<figure|<img/i);
  const intro = first > 0 ? sanitize(c.slice(0, first)).trim() : "";
  const body = first >= 0 ? c.slice(first) : "";
  const cards: ProductCard[] = [];
  PRODUCT_CARD_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = PRODUCT_CARD_RE.exec(body))) {
    const href = m[3];
    if (!/amzn\.to|amazon\./i.test(href)) continue; // solo fichas de afiliado
    const title = decodeEntities(stripHtml(m[2])).replace(/^▷\s*/, "").trim();
    cards.push({ src: m[1], title, href });
  }
  return { intro, cards };
}

// La home original es una página Elementor con secciones fijas (bienvenida,
// teaser friki, tarjetas, "programas gratuitos", rejilla de cursos, "¿dónde
// está la trampa?", "otros cursos" y FAQ). El contenido migrado conserva el
// texto en plano; aquí lo troceamos por sus titulares conocidos para
// reconstruir el inicio igual que el original.
function paraHtml(region: string): string {
  return [...region.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => m[1].trim())
    .filter((t) => stripHtml(t).length > 0)
    .map((t) => `<p>${sanitize(t)}</p>`)
    .join("");
}
function parseHomeContent(raw: string): HomeContent | undefined {
  if (!raw) return undefined;
  const c = raw.replace(/\s+/g, " ");
  const iH1 = c.indexOf("100% GRATIS");
  const iProg = c.indexOf("Programas gratuitos");
  const iCursos = c.indexOf("CURSOS AULAENLANUBE");
  const iTrampa = c.indexOf("Dónde está la trampa");
  const iOtros = c.indexOf("OTROS CURSOS");
  const iFaq = c.indexOf("Preguntas frecuentes");
  if ([iH1, iProg, iCursos, iTrampa, iOtros, iFaq].some((i) => i < 0)) return undefined;

  // Bienvenida + teaser friki (antes del <h1> "...100% GRATIS").
  const pre = c.slice(0, c.lastIndexOf("<h1", iH1));
  const preParas = [...pre.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => m[1].trim())
    .filter((t) => stripHtml(t).length > 0);
  const frikiIdx = preParas.findIndex((t) => /Lo s[eé]/i.test(stripHtml(t)));
  const wrap = (arr: string[]) => arr.map((t) => `<p>${sanitize(t)}</p>`).join("");
  const welcomeHtml = wrap(frikiIdx >= 0 ? preParas.slice(0, frikiIdx) : preParas);
  const frikiHtml = wrap(frikiIdx >= 0 ? preParas.slice(frikiIdx) : []);

  // Tarjetas (h3 + p) entre el h1 y "Programas gratuitos".
  const features = [...c.slice(iH1, iProg).matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>\s*<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => ({ title: stripHtml(m[1]), text: stripHtml(m[2]) }));

  const trampaMatch = c.slice(c.lastIndexOf("<h3", iTrampa)).match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/i);

  // FAQ: pares <a tabindex>Pregunta</a> <p>Respuesta</p>.
  const faqs = [...c.slice(iFaq).matchAll(/<a\b[^>]*tabindex[^>]*>([\s\S]*?)<\/a>\s*<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => ({ q: decodeEntities(stripHtml(m[1])), a: sanitize(m[2].trim()) }))
    .filter((f) => f.q);

  return {
    welcomeHtml, frikiHtml, features,
    programasHtml: paraHtml(c.slice(iProg, iCursos)),
    trampaTitle: trampaMatch ? decodeEntities(stripHtml(trampaMatch[1])) : "¿Dónde está la trampa?",
    trampaHtml: paraHtml(c.slice(iTrampa, iOtros)),
    otrosHtml: paraHtml(c.slice(iOtros, iFaq)),
    faqs,
  };
}
function ytThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

/* ---------- entradas resueltas para render ---------- */
export interface LessonEntry {
  kind: "lesson"; path: string; title: string; description?: string; image?: string;
  head?: Head; lesson: Lesson; bodyHtml: string; prev?: NavLink; next?: NavLink; parent?: NavLink;
  siblingCount: number; siblings: { path: string; title: string; videoId?: string }[];
  courseList: { n: number; path: string; title: string; current: boolean }[];
}
export interface ProductCard { src: string; title: string; href: string; }
// Artículo troceado en HTML normal + bloques de código resaltado. Se usa cuando
// el contenido lleva ejemplos de código (<pre><xmp>…</xmp></pre>), para pintarlos
// con CodeBlock (resaltado + botón de copiar) en lugar de texto crudo.
export type ArticlePart =
  | { t: "html"; html: string }
  | { t: "code"; code: string; lines: string[]; lang: string }
  | { t: "video"; videoId: string };
export interface ArticleEntry {
  kind: "article"; path: string; title: string; description?: string; image?: string;
  head?: Head; html: string; date?: string; categories?: { name: string; slug: string }[]; parent?: NavLink;
  intro?: string; cards?: ProductCard[]; parts?: ArticlePart[];
  subzones?: { path: string; title: string; image?: string }[];
}
export interface CourseCard { path: string; title: string; image?: string }
// Bloques de una página "hub" (índice de curso tipo Elementor), reconstruidos en
// orden desde el JSON de Elementor del crawl.
export type HubBlock =
  | { t: "image"; src: string; alt: string }
  | { t: "html"; html: string; boxed: boolean }
  | { t: "heading"; text: string }
  | { t: "slides"; url: string }
  | { t: "video"; videoId: string }
  | { t: "alert"; title: string; desc: string; variant: string }
  | { t: "cards"; columns: number; items: CourseCard[] };
// Página "hub": índice de curso rico hecho con Elementor (intro + presentación +
// vídeo + rejillas de tarjetas). La produce tanto una lección (p.ej. zona Java)
// como una landing (p.ej. /cursos/curso-google/).
export interface HubEntry {
  kind: "hub"; path: string; title: string; description?: string; image?: string;
  head?: Head; hub: HubBlock[]; parent?: NavLink; lesson?: Lesson;
}
// Página de "ejercicios resueltos" (zona de programación): intro + lista de
// ejercicios, cada uno con enunciado y solución desplegable (código resaltado).
export interface Exercise {
  n: number; title: string; statementHtml: string;
  code?: string; lines?: string[]; lang: string;
}
export interface ExerciseEntry {
  kind: "exercises"; path: string; title: string; description?: string; image?: string;
  head?: Head; date?: string; intro?: string; exercises: Exercise[]; parent?: NavLink;
}
export interface CourseIndexEntry {
  kind: "courseIndex"; path: string; title: string; description?: string; image?: string;
  head?: Head; intro?: string; introHtml?: string; items: { path: string; title: string; videoId?: string; image?: string; isSection: boolean }[]; parent?: NavLink;
  // Solo para la portada de cursos (/cursos/): rejillas de portadas + advertencia + FAQ.
  coursesGrid?: CourseCard[]; otherCourses?: CourseCard[]; advertencia?: string; faqs?: { q: string; a: string }[];
  // Landing de sección (p.ej. /zona-programacion/): hero + intro + cursos + aviso + últimas entradas.
  section?: {
    heroImage?: string; introHtml: string;
    coursesTitle: string; courseCards: CourseCard[];
    notice: string;
    recentTitle: string; recentPosts: { path: string; title: string; image?: string }[];
  };
}
export interface HomeContent {
  welcomeHtml: string; frikiHtml: string;
  features: { title: string; text: string }[];
  programasHtml: string;
  trampaTitle: string; trampaHtml: string;
  otrosHtml: string;
  faqs: { q: string; a: string }[];
}
export interface HomeEntry {
  kind: "home"; path: "/"; title: string; description?: string;
  content?: HomeContent;
  courses: { path: string; title: string; image?: string; count: number }[];
  sections: { path: string; title: string; image?: string; count: number }[];
  recentPosts: { path: string; title: string; date: string }[];
}
export type Entry = LessonEntry | HubEntry | ArticleEntry | ExerciseEntry | CourseIndexEntry | HomeEntry;

/* ---------- páginas "hub" (índices de curso Elementor) ----------
   Algunas páginas (p.ej. /zona-programacion/java/) son índices ricos hechos con
   Elementor: imagen, texto, presentación en Google Slides, vídeo y rejillas de
   tarjetas que enlazan a las páginas hijas. El contenido plano migrado pierde
   esos widgets dinámicos; aquí los reconstruimos leyendo el JSON de Elementor
   del crawl (content.jsonl) para replicar el original 1:1. */
let _elementor: Map<number, string> | null = null;
function elementorOf(id: number): string | undefined {
  if (!_elementor) {
    _elementor = new Map();
    try {
      const raw = fs.readFileSync(path.join(DATA, "content.jsonl"), "utf8");
      for (const ln of raw.split(/\r?\n/)) {
        if (!ln.trim()) continue;
        try {
          const o = JSON.parse(ln);
          if (o.id && typeof o.elementor === "string" && o.elementor) _elementor.set(o.id, o.elementor);
        } catch { /* línea corrupta: se ignora */ }
      }
    } catch { /* sin crawl disponible: no habrá hubs */ }
  }
  return _elementor.get(id);
}
function ytId(url: string): string {
  return url.match(/(?:youtu\.be\/|[?&]v=|\/embed\/)([\w-]{11})/)?.[1] ?? "";
}
function hubCard(id: number): CourseCard | null {
  const n = nodeById.get(id);
  return n ? { path: n.path, title: decodeEntities(n.title), image: thumbOf(n.path) } : null;
}
function temaNum(t: string): number | null {
  const m = t.match(/tema\s*(\d+)/i);
  return m ? parseInt(m[1], 10) : null;
}
// Extrae los bloques de Elementor de una página (sin exigir widget "posts").
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function elementorBlocks(id: number): HubBlock[] {
  const raw = elementorOf(id);
  if (!raw) return [];
  let tree: unknown;
  try { tree = JSON.parse(raw); } catch { return []; }
  const blocks: HubBlock[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const walk = (el: any): void => {
    if (Array.isArray(el)) { el.forEach(walk); return; }
    if (!el || typeof el !== "object") return;
    const s = el.settings || {};
    switch (el.widgetType) {
      case "image":
        if (s.image?.url) blocks.push({ t: "image", src: relUrl(s.image.url), alt: s.image.alt || "" });
        break;
      case "text-editor":
        if (s.editor && stripHtml(s.editor)) {
          const html = sanitize(s.editor).trim();
          blocks.push({ t: "html", html, boxed: /^<(?:ol|ul)\b/i.test(html) });
        }
        break;
      case "heading":
        if (s.title) blocks.push({ t: "heading", text: decodeEntities(stripHtml(s.title)) });
        break;
      case "video": {
        const v = ytId(s.youtube_url || "");
        if (v) blocks.push({ t: "video", videoId: v });
        break;
      }
      case "html": {
        const src = (s.html || "").match(/<iframe[^>]*\bsrc="([^"]+)"/i)?.[1];
        if (src && /docs\.google|drive\.google/i.test(src)) blocks.push({ t: "slides", url: src });
        break;
      }
      case "alert":
        blocks.push({
          t: "alert",
          title: decodeEntities(stripHtml(s.alert_title || "")),
          desc: decodeEntities(stripHtml(s.alert_description || "")),
          variant: s.alert_type || "info",
        });
        break;
      case "posts": {
        const ids: number[] = (s.posts_posts_ids || [])
          .map((x: string) => parseInt(x, 10))
          .filter((n: number) => n > 0);
        let items = ids.map(hubCard).filter(Boolean) as CourseCard[];
        // El original muestra los temas ordenados 1..N: si todos llevan "Tema N",
        // los ordenamos por ese número.
        if (items.length && items.every((c) => temaNum(c.title) !== null)) {
          items = [...items].sort((a, b) => temaNum(a.title)! - temaNum(b.title)!);
        }
        if (items.length) blocks.push({ t: "cards", columns: parseInt(s.classic_columns, 10) || 2, items });
        break;
      }
    }
    if (el.elements) walk(el.elements);
  };
  walk(tree);
  return blocks;
}
// Tarjetas extra a añadir a la rejilla de un hub (por id de página). Útil para
// completar índices a los que les faltan cursos respecto al original.
const HUB_EXTRA_CARDS: Record<number, string[]> = {
  // /cursos/curso-google/: añadir Sites, Apps Script y Apps Script Avanzado (→ 8 bloques).
  2432: [
    "/cursos/curso-google-sites/",
    "/cursos/curso-google-apps-script/",
    "/cursos/curso-google-apps-script-avanzado/",
  ],
};
function pathToCard(p: string): CourseCard | null {
  const k = normKey(p);
  const x = lessonByPath.get(k) || landingByPath.get(k) || postByPath.get(k);
  return x ? { path: x.path, title: decodeEntities(x.title), image: x.thumb || thumbOf(x.path) } : null;
}
// Añade las tarjetas extra a la rejilla y actualiza el "N bloques" del encabezado.
function augmentHub(id: number, blocks: HubBlock[]): HubBlock[] {
  const extra = (HUB_EXTRA_CARDS[id] || []).map(pathToCard).filter(Boolean) as CourseCard[];
  if (!extra.length) return blocks;
  let total = 0;
  const withCards = blocks.map((b) => {
    if (b.t === "cards") {
      const items = [...b.items, ...extra.filter((c) => !b.items.some((x) => x.path === c.path))];
      total = items.length;
      return { ...b, items };
    }
    return b;
  });
  if (!total) return blocks;
  return withCards.map((b) =>
    b.t === "heading" ? { ...b, text: b.text.replace(/\b\d+\s+bloques/i, `${total} bloques`) } : b
  );
}
// Una página es "hub" si su Elementor incluye un widget de rejilla ("posts").
function parseHubBlocks(id: number): HubBlock[] {
  const raw = elementorOf(id);
  if (!raw || !raw.includes('"posts"')) return [];
  return augmentHub(id, elementorBlocks(id));
}

/* ---------- páginas fusionadas ----------
   Algunos cursos están partidos en dos URLs: una con la presentación (intro +
   vídeo) y otra con el índice de lecciones. Las unimos: ambas URLs muestran el
   contenido combinado (cada una conserva su <head> para la paridad SEO). */
const MERGE_GROUPS: { ids: number[]; intro: number; lessons: number; lessonsTitle: string }[] = [
  // Curso OBS Studio: mega-curso-obs-studio (intro+vídeo) + curso-obs-studio (12 lecciones).
  { ids: [4448, 4474], intro: 4448, lessons: 4474, lessonsTitle: "El curso se divide en los siguientes vídeos" },
];
function mergedHubEntry(reqId: number, g: { intro: number; lessons: number; lessonsTitle: string }): HubEntry {
  const node = nodeById.get(reqId)!;
  const introLesson = lessonById.get(g.intro);
  // Bloques de la página de presentación (intro + secciones + vídeo).
  const blocks = elementorBlocks(g.intro);
  // Rejilla con las lecciones de la página índice.
  const items = childrenOf(g.lessons).map((k) => {
    const les = lessonById.get(k.id);
    return { path: k.path, title: k.title, image: thumbOf(k.path) || (les ? ytThumb(les.videoId) : undefined) };
  });
  if (items.length) {
    blocks.push({ t: "heading", text: g.lessonsTitle });
    blocks.push({ t: "cards", columns: 2, items });
  }
  const head = headByPath.get(node.path);
  return {
    kind: "hub", path: node.path, title: node.title,
    description: head?.description || introLesson?.yoastDesc || undefined,
    image: introLesson?.thumb || undefined,
    head, hub: blocks, parent: parentLinkOf(node),
    // vídeo-LD solo en la página que es realmente una lección con vídeo propio.
    lesson: reqId === g.intro ? introLesson : undefined,
  };
}

function lessonEntry(l: Lesson): LessonEntry {
  const node = nodeById.get(l.id)!;
  const { prev, next } = prevNextOf(node);
  const kids = childrenOf(node.parent);
  const siblings = kids
    .filter((s) => s.id !== l.id)
    .map((s) => ({ path: s.path, title: s.title, videoId: lessonById.get(s.id)?.videoId }));
  const courseList = kids.map((s, i) => ({ n: i + 1, path: s.path, title: s.title, current: s.id === l.id }));
  return {
    kind: "lesson", path: l.path, title: l.title,
    description: l.yoastDesc || clip(l.desc), image: l.thumb || ytThumb(l.videoId),
    head: headByPath.get(l.path), lesson: l, bodyHtml: sanitize(l.desc),
    prev, next, parent: parentLinkOf(node),
    siblingCount: kids.length, siblings, courseList,
  };
}

// Construye una entrada "hub" a partir de una lección o landing con widgets
// Elementor (intro + presentación + rejillas de tarjetas). `lesson` solo se pasa
// para lecciones (habilita el JSON-LD de vídeo).
function hubEntry(
  base: { id: number; path: string; title: string; yoastDesc?: string; thumb?: string },
  descSrc: string,
  blocks: HubBlock[],
  lesson?: Lesson
): HubEntry {
  const node = nodeById.get(base.id)!;
  return {
    kind: "hub", path: base.path, title: base.title,
    description: base.yoastDesc || clip(descSrc),
    image: base.thumb || undefined,
    head: headByPath.get(base.path), hub: blocks, parent: parentLinkOf(node), lesson,
  };
}
function articleFromPost(p: Post): ArticleEntry {
  const node = nodeById.get(p.id)!;
  const parts = parseArticleParts(p.content);
  return {
    kind: "article", path: p.path, title: p.title,
    description: p.yoastDesc || clip(p.content), image: p.thumb || undefined,
    head: headByPath.get(p.path), html: sanitize(p.content), date: p.date,
    categories: p.categories, parent: parentLinkOf(node),
    ...(parts ? { parts } : {}),
  };
}
function articleFromLanding(l: Landing): ArticleEntry {
  const node = nodeById.get(l.id)!;
  const html = sanitize(l.content) || `<p>${l.elementorTexts.join("</p><p>")}</p>`;
  const { intro, cards } = parseProductCards(l.content);
  // Subzonas: hijas de la landing (p.ej. /zona-friki/ enlaza tazas/funko/moda).
  const subzones = childrenOf(l.id).map((k) => ({
    path: k.path, title: k.title, image: landingById.get(k.id)?.thumb || undefined,
  }));
  const parts = cards.length >= 3 ? null : parseArticleParts(l.content);
  return {
    kind: "article", path: l.path, title: l.title,
    description: l.yoastDesc || clip(l.content || l.elementorTexts.join(" ")),
    image: l.thumb || undefined, head: headByPath.get(l.path), html, date: l.date,
    parent: parentLinkOf(node),
    // Si hay ≥3 fichas de afiliado, la landing se maqueta como rejilla de productos.
    ...(cards.length >= 3 ? { intro, cards } : {}),
    ...(parts ? { parts } : {}),
    ...(subzones.length ? { subzones } : {}),
  };
}
// ¿Es una página de ejercicios resueltos al estilo del WordPress original?
// (encabezados "Ejercicio N" + botón "MOSTRAR / OCULTAR SOLUCIÓN" + código en
// <xmp>). p.ej. /zona-programacion/java/ejercicios-recursividad-java/.
function isExercisesContent(content: string): boolean {
  const c = content || "";
  if (!/OCULTAR/i.test(c) || !/<xmp>/i.test(c)) return false;
  return (c.match(/<h[1-6][^>]*>\s*Ejercicio\s+\d+/gi) || []).length >= 2;
}

// Trocea el contenido en intro + ejercicios. Cada ejercicio = encabezado
// "Ejercicio N" → enunciado (texto e imagen de ejemplo, sin el botón ni anuncios)
// → código (dentro de <xmp>), que se resalta en tiempo de compilación.
function parseExercises(content: string): { intro: string; exercises: Exercise[] } {
  const c = content || "";
  const headRe = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  const bounds: { start: number; headEnd: number; title: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = headRe.exec(c))) {
    const title = stripHtml(m[2]).replace(/\s+/g, " ").trim();
    if (/^Ejercicio\s+\d+/i.test(title)) bounds.push({ start: m.index, headEnd: headRe.lastIndex, title });
  }
  const intro = bounds.length ? sanitize(c.slice(0, bounds[0].start)).trim() : "";
  const exercises: Exercise[] = bounds.map((b, idx) => {
    const blockEnd = idx + 1 < bounds.length ? bounds[idx + 1].start : c.length;
    const body = c.slice(b.headEnd, blockEnd);
    const xmp = body.match(/<xmp>([\s\S]*?)<\/xmp>/i);
    const hl = xmp ? highlightCode(xmp[1], "java") : null;
    // Enunciado: todo lo previo al <pre>, quitando el botón y los anuncios.
    const preIdx = body.search(/<pre\b/i);
    const stmt = (preIdx >= 0 ? body.slice(0, preIdx) : body)
      // El "punto moderado" (?!<\/a>) confina la coincidencia a un único enlace
      // (el botón muerto), sin tragarse un enlace previo y su texto.
      .replace(/<a\b[^>]*>(?:(?!<\/a>)[\s\S])*?OCULTAR(?:(?!<\/a>)[\s\S])*?<\/a>/gi, "")
      .replace(/<ins\b[\s\S]*?<\/ins>/gi, "")
      .replace(/<!--[\s\S]*?-->/g, "");
    return {
      n: parseInt((b.title.match(/\d+/) || ["0"])[0], 10),
      title: b.title,
      statementHtml: sanitize(stmt).trim(),
      code: hl?.code,
      lines: hl?.lines,
      lang: "Java",
    };
  });
  return { intro, exercises };
}

// Trocea el HTML de un artículo separando los bloques de código
// (<pre>…<xmp>código</xmp>…</pre>) del texto. Cada trozo de texto se sanea como
// siempre; cada bloque de código se resalta. Si no hay código, devuelve null y
// el artículo se pinta como antes (un solo bloque de HTML).
// URL de vídeo de YouTube "suelta" (en su propia línea, como las auto-incrusta
// WordPress), no dentro de un <a href>. Se reconoce porque va precedida de salto
// de línea o de un cierre de etiqueta ('>'), nunca de la comilla de un href.
const STANDALONE_VIDEO =
  /(?:^|[\n>])[ \t]*(https?:\/\/(?:www\.)?(?:youtu\.be\/[\w-]{11}|youtube\.com\/(?:watch\?v=|embed\/)[\w-]{11})[^\s<]*)/gi;

function parseArticleParts(content: string): ArticlePart[] | null {
  // Algunas entradas traen dos URLs de YouTube pegadas sin separador
  // (…youtu.be/IDhttps://youtu.be/ID2); las separamos para incrustar ambas.
  const c = (content || "").replace(/(youtu\.be\/[\w-]{11})(https?:\/\/)/gi, "$1\n$2");
  type Block = { start: number; end: number; part: ArticlePart };
  const blocks: Block[] = [];

  // Bloques de código <pre>…<xmp>código</xmp>…</pre>.
  const preRe = /<pre\b[^>]*>[\s\S]*?<\/pre>/gi;
  let m: RegExpExecArray | null;
  while ((m = preRe.exec(c))) {
    const block = m[0];
    const xmp = block.match(/<xmp>([\s\S]*?)<\/xmp>/i);
    const codeTag = block.match(/<code\b[^>]*>([\s\S]*?)<\/code>/i);
    const raw = xmp
      ? xmp[1]
      : codeTag
        ? decodeEntities(codeTag[1].replace(/<[^>]+>/g, ""))
        : decodeEntities(block.replace(/<\/?pre[^>]*>/gi, ""));
    const lang = detectCodeLang(raw);
    const hl = highlightCode(raw, lang.toLowerCase());
    blocks.push({ start: m.index, end: preRe.lastIndex, part: { t: "code", code: hl.code, lines: hl.lines, lang } });
  }

  // Vídeos de YouTube sueltos → reproductor incrustado.
  const vidRe = new RegExp(STANDALONE_VIDEO.source, "gi");
  while ((m = vidRe.exec(c))) {
    const url = m[1];
    const id = ytId(url);
    if (!id) continue;
    const start = m.index + m[0].indexOf(url);
    blocks.push({ start, end: start + url.length, part: { t: "video", videoId: id } });
  }

  if (!blocks.some((b) => b.part.t !== "html")) return null;
  blocks.sort((a, b) => a.start - b.start);

  const parts: ArticlePart[] = [];
  let last = 0;
  for (const b of blocks) {
    if (b.start < last) continue; // descarta solapamientos (p.ej. URL dentro de <pre>)
    const before = c.slice(last, b.start);
    if (stripHtml(before).trim() || /<img|<iframe/i.test(before)) parts.push({ t: "html", html: sanitize(before) });
    parts.push(b.part);
    last = b.end;
  }
  const tail = c.slice(last);
  if (stripHtml(tail).trim() || /<img|<iframe/i.test(tail)) parts.push({ t: "html", html: sanitize(tail) });
  return parts.some((p) => p.t !== "html") ? parts : null;
}

// Heurística de lenguaje para la etiqueta de la caja (todo el contenido actual
// es Java; solo se marca Python ante señales claras).
function detectCodeLang(code: string): string {
  const py = /^\s*def\s+\w+\s*\(|^\s*(?:elif|print)\b|:\s*$/m.test(code) && !/;\s*$/m.test(code);
  return py ? "Python" : "Java";
}

function exerciseEntryFromLanding(l: Landing): ExerciseEntry {
  const node = nodeById.get(l.id)!;
  const { intro, exercises } = parseExercises(l.content);
  return {
    kind: "exercises", path: l.path, title: l.title,
    description: l.yoastDesc || clip(l.content), image: l.thumb || undefined,
    head: headByPath.get(l.path), date: l.date,
    intro: intro || undefined, exercises, parent: parentLinkOf(node),
  };
}

// FAQ compartida (inicio y /cursos/ usan la misma): se parsea del inicio.
let _faqs: { q: string; a: string }[] | null = null;
function sharedFaqs(): { q: string; a: string }[] {
  if (_faqs) return _faqs;
  const home = landingByPath.get("/");
  _faqs = (home && parseHomeContent(home.content)?.faqs) || [];
  return _faqs;
}
// Texto de la caja "ADVERTENCIA" del contenido de /cursos/.
function parseAdvertencia(content: string): string {
  const c = (content || "").replace(/\s+/g, " ");
  const i = c.indexOf("ADVERTENCIA");
  if (i < 0) return "";
  const rest = c.slice(i + "ADVERTENCIA".length);
  const end = rest.search(/<button|Descartar|Preguntas frecuentes/i);
  return stripHtml(end > 0 ? rest.slice(0, end) : rest).trim();
}
// "Otros cursos" = subgrupo "Otros cursos" del menú, con su portada.
function otherCoursesList(): CourseCard[] {
  const cursos = menu.find((m) => /^cursos$/i.test(m.title));
  const otros = cursos?.children?.find((c) => /otros cursos/i.test(c.title));
  return (otros?.children ?? [])
    .filter((k) => k.url)
    .map((k) => ({ path: k.url, title: k.title, image: thumbOf(k.url) }));
}

// Landing de sección "en construcción" (p.ej. /zona-programacion/): intro + aviso.
function parseSectionLanding(content: string): { introHtml: string; notice: string } {
  const c = (content || "").replace(/\s+/g, " ");
  const iCursos = c.search(/Cursos de programaci[oó]n/i);
  const introHtml = paraHtml(iCursos > 0 ? c.slice(0, iCursos) : c);
  let notice = "";
  const iCons = c.search(/\.\.\.en construcci[oó]n/i);
  if (iCons >= 0) {
    const rest = c.slice(iCons).replace(/^\.\.\.en construcci[oó]n/i, "");
    const end = rest.search(/<button|Descartar|<ins\b|Últimas entradas/i);
    notice = stripHtml(end > 0 ? rest.slice(0, end) : rest).trim();
  }
  return { introHtml, notice };
}

function courseIndexEntry(l: Landing): CourseIndexEntry {
  const node = nodeById.get(l.id)!;
  const kids = childrenOf(l.id);
  const items = kids.map((k) => {
    const les = lessonById.get(k.id);
    return { path: k.path, title: k.title, videoId: les?.videoId, image: thumbOf(k.path), isSection: childrenOf(k.id).length > 0 };
  });
  const intro = l.yoastDesc || (l.elementorTexts[0] ? stripHtml(l.elementorTexts[0]) : "");
  const introHtml = sanitize(l.content) || undefined;
  // La portada de cursos (/cursos/) se maqueta como el original: rejilla de
  // portadas propias + "Otros cursos" + advertencia + FAQ.
  const isCursos = normKey(l.path) === normKey("/cursos/");
  const isZonaProg = normKey(l.path) === normKey("/zona-programacion/");
  const sl = isZonaProg ? parseSectionLanding(l.content) : null;
  return {
    kind: "courseIndex", path: l.path, title: l.title,
    description: l.yoastDesc || clip(intro || l.title), image: l.thumb || undefined,
    head: headByPath.get(l.path), intro: intro || undefined, introHtml, items, parent: parentLinkOf(node),
    ...(isCursos
      ? {
          coursesGrid: kids.map((k) => ({ path: k.path, title: k.title, image: thumbOf(k.path) })),
          otherCourses: otherCoursesList(),
          advertencia: parseAdvertencia(l.content),
          faqs: sharedFaqs(),
        }
      : {}),
    ...(sl
      ? {
          section: {
            heroImage: l.thumb || undefined,
            introHtml: sl.introHtml,
            coursesTitle: "Cursos de programación",
            courseCards: kids.map((k) => ({ path: k.path, title: k.title, image: thumbOf(k.path) })),
            notice: sl.notice,
            recentTitle: "Últimas entradas programación",
            recentPosts: getRecentPosts(6),
          },
        }
      : {}),
  };
}
const landingById = new Map(landings.map((x) => [x.id, x]));
function homeEntry(l: Landing): HomeEntry {
  // cursos = hijos directos de /cursos/ (con su portada)
  const cursos = landingByPath.get(normKey("/cursos/"));
  const courses = cursos
    ? childrenOf(cursos.id).map((c) => ({
        path: c.path, title: c.title,
        image: landingById.get(c.id)?.thumb || undefined,
        count: countDescendants(c.id),
      }))
    : [];
  // secciones = otras zonas de primer nivel con hijos (Programación, Hardware, Zona friki)
  const sections = landings
    .filter((x) => x.parent === 0 && x.path !== "/" && x.path !== "/cursos/" && childrenOf(x.id).length > 0)
    .map((x) => ({ path: x.path, title: x.title, image: x.thumb || undefined, count: countDescendants(x.id) }))
    .sort((a, b) => b.count - a.count);
  const recentPosts = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6)
    .map((p) => ({ path: p.path, title: p.title, date: p.date }));
  return {
    kind: "home", path: "/", title: l.title || SITE_NAME,
    description: headByPath.get("/")?.description || undefined,
    content: parseHomeContent(l.content), courses, sections, recentPosts,
  };
}
function countDescendants(id: number): number {
  let total = 0;
  for (const c of childrenOf(id)) total += 1 + countDescendants(c.id);
  return total;
}

/* ---------- barra lateral de artículos: últimas publicaciones + búsqueda ---------- */
export interface RecentPost { path: string; title: string; image?: string }
export function getRecentPosts(limit = 5): RecentPost[] {
  return [...posts]
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, limit)
    .map((p) => ({ path: p.path, title: decodeEntities(p.title), image: p.thumb || undefined }));
}
// Cursos recientes (hijos de /cursos/ con portada), para la barra lateral.
export function getLatestCourses(limit = 4): { path: string; title: string; image?: string }[] {
  const cursos = landingByPath.get(normKey("/cursos/"));
  if (!cursos) return [];
  return childrenOf(cursos.id)
    .filter((c) => thumbOf(c.path))
    .slice()
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, limit)
    .map((c) => ({ path: c.path, title: c.title, image: thumbOf(c.path) }));
}
export interface SearchItem { t: string; p: string }
export function getSearchIndex(): SearchItem[] {
  return nodes
    .filter((n) => n.path !== "/")
    .map((n) => ({ t: decodeEntities(n.title), p: n.path }));
}

export function getByPath(p: string): Entry | undefined {
  const k = normKey(p);
  if (k === "/") {
    const home = landingByPath.get("/");
    return home ? homeEntry(home) : { kind: "home", path: "/", title: SITE_NAME, courses: [], sections: [], recentPosts: [] };
  }
  // Páginas fusionadas (p.ej. las dos URLs del curso de OBS): ambas muestran el
  // contenido combinado, cada una con su propio <head>.
  const mergeNode = lessonByPath.get(k) || landingByPath.get(k);
  if (mergeNode) {
    const g = MERGE_GROUPS.find((x) => x.ids.includes(mergeNode.id));
    if (g) return mergedHubEntry(mergeNode.id, g);
  }
  const les = lessonByPath.get(k);
  if (les) {
    // Hub Elementor (rejillas de tarjetas): p.ej. /zona-programacion/java/.
    const blocks = parseHubBlocks(les.id);
    if (blocks.some((b) => b.t === "cards")) return hubEntry(les, les.desc, blocks, les);
    return lessonEntry(les);
  }
  const post = postByPath.get(k);
  if (post) return articleFromPost(post);
  const land = landingByPath.get(k);
  if (land) {
    // Páginas de ejercicios resueltos (zona de programación): enunciado +
    // solución desplegable con código resaltado.
    if (isExercisesContent(land.content)) return exerciseEntryFromLanding(land);
    const hasChildren = childrenOf(land.id).length > 0;
    const isProductGrid = parseProductCards(land.content).cards.length >= 3;
    // Hub Elementor para landings tipo "índice de sub-cursos" (intro + "X
    // bloques" + rejilla de tarjetas de posts), p.ej. /cursos/curso-google/.
    // Solo si NO tiene hijos directos (si los tiene, el índice ya los muestra) y
    // no es una rejilla de productos de afiliado (zona friki).
    if (!hasChildren && !isProductGrid) {
      const blocks = parseHubBlocks(land.id);
      if (blocks.some((b) => b.t === "cards")) return hubEntry(land, land.content, blocks);
    }
    // Con hijos se usa el índice de sección, salvo que sea una landing de
    // productos (≥3 fichas de afiliado, p.ej. /zona-friki/): entonces, rejilla.
    if (hasChildren && !isProductGrid) {
      return courseIndexEntry(land);
    }
    return articleFromLanding(land);
  }
  return undefined;
}

/* ---------- rutas para generateStaticParams / sitemap ---------- */
export function segsToPath(segs?: string[]): string {
  if (!segs || segs.length === 0) return "/";
  return "/" + segs.join("/") + "/";
}
export function getAllPaths(): string[] {
  return nodes.map((n) => n.path);
}
export function getAllForSitemap(): { path: string; lastmod: string }[] {
  return nodes.map((n) => ({ path: n.path, lastmod: (n.date || "").slice(0, 10) || "2024-01-01" }));
}

const nodeByPath = new Map(nodes.map((n) => [n.path, n]));
export function getBreadcrumbs(p: string): NavLink[] {
  const chain: NavLink[] = [];
  let cur: Node | undefined = nodeByPath.get(p);
  const seen = new Set<number>();
  while (cur && !seen.has(cur.id)) {
    seen.add(cur.id);
    chain.unshift({ path: cur.path, title: cur.title });
    cur = cur.parent ? nodeById.get(cur.parent) : undefined;
  }
  return chain;
}
