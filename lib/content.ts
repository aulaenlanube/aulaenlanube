import fs from "node:fs";
import path from "node:path";

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
function sanitize(html: string): string {
  return (html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<ins\b[^>]*adsbygoogle[\s\S]*?<\/ins>/gi, "") // quita unidades AdSense
    .replace(/ on[a-z]+="[^"]*"/gi, "");
}
function clip(s: string, n = 158): string {
  const t = stripHtml(s);
  return t.length > n ? t.slice(0, n - 1).trimEnd() + "…" : t;
}
function ytThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

/* ---------- entradas resueltas para render ---------- */
export interface LessonEntry {
  kind: "lesson"; path: string; title: string; description?: string; image?: string;
  head?: Head; lesson: Lesson; bodyHtml: string; prev?: NavLink; next?: NavLink; parent?: NavLink;
  siblingCount: number; siblings: { path: string; title: string; videoId?: string }[];
}
export interface ArticleEntry {
  kind: "article"; path: string; title: string; description?: string; image?: string;
  head?: Head; html: string; date?: string; categories?: { name: string; slug: string }[]; parent?: NavLink;
}
export interface CourseIndexEntry {
  kind: "courseIndex"; path: string; title: string; description?: string; image?: string;
  head?: Head; intro?: string; items: { path: string; title: string; videoId?: string; isSection: boolean }[]; parent?: NavLink;
}
export interface HomeEntry {
  kind: "home"; path: "/"; title: string; description?: string;
  hubs: { path: string; title: string; count: number }[];
  recentPosts: { path: string; title: string; date: string }[];
}
export type Entry = LessonEntry | ArticleEntry | CourseIndexEntry | HomeEntry;

function lessonEntry(l: Lesson): LessonEntry {
  const node = nodeById.get(l.id)!;
  const { prev, next } = prevNextOf(node);
  const siblings = childrenOf(node.parent)
    .filter((s) => s.id !== l.id)
    .map((s) => ({ path: s.path, title: s.title, videoId: lessonById.get(s.id)?.videoId }));
  return {
    kind: "lesson", path: l.path, title: l.title,
    description: l.yoastDesc || clip(l.desc), image: l.thumb || ytThumb(l.videoId),
    head: headByPath.get(l.path), lesson: l, bodyHtml: sanitize(l.desc),
    prev, next, parent: parentLinkOf(node),
    siblingCount: childrenOf(node.parent).length, siblings,
  };
}
function articleFromPost(p: Post): ArticleEntry {
  const node = nodeById.get(p.id)!;
  return {
    kind: "article", path: p.path, title: p.title,
    description: p.yoastDesc || clip(p.content), image: p.thumb || undefined,
    head: headByPath.get(p.path), html: sanitize(p.content), date: p.date,
    categories: p.categories, parent: parentLinkOf(node),
  };
}
function articleFromLanding(l: Landing): ArticleEntry {
  const node = nodeById.get(l.id)!;
  const html = sanitize(l.content) || `<p>${l.elementorTexts.join("</p><p>")}</p>`;
  return {
    kind: "article", path: l.path, title: l.title,
    description: l.yoastDesc || clip(l.content || l.elementorTexts.join(" ")),
    image: l.thumb || undefined, head: headByPath.get(l.path), html, date: l.date,
    parent: parentLinkOf(node),
  };
}
function courseIndexEntry(l: Landing): CourseIndexEntry {
  const node = nodeById.get(l.id)!;
  const kids = childrenOf(l.id);
  const items = kids.map((k) => {
    const les = lessonById.get(k.id);
    return { path: k.path, title: k.title, videoId: les?.videoId, isSection: childrenOf(k.id).length > 0 };
  });
  const intro = l.yoastDesc || (l.elementorTexts[0] ? stripHtml(l.elementorTexts[0]) : "");
  return {
    kind: "courseIndex", path: l.path, title: l.title,
    description: l.yoastDesc || clip(intro || l.title), image: l.thumb || undefined,
    head: headByPath.get(l.path), intro: intro || undefined, items, parent: parentLinkOf(node),
  };
}
function homeEntry(l: Landing): HomeEntry {
  // hubs = paginas de primer nivel (parent 0) que son indice de curso (tienen hijos)
  const topLandings = landings.filter((x) => x.parent === 0 && x.path !== "/");
  const hubs = topLandings
    .filter((x) => childrenOf(x.id).length > 0)
    .map((x) => ({ path: x.path, title: x.title, count: countDescendants(x.id) }))
    .sort((a, b) => b.count - a.count);
  const recentPosts = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6)
    .map((p) => ({ path: p.path, title: p.title, date: p.date }));
  return {
    kind: "home", path: "/", title: l.title || SITE_NAME,
    description: headByPath.get("/")?.description || undefined, hubs, recentPosts,
  };
}
function countDescendants(id: number): number {
  let total = 0;
  for (const c of childrenOf(id)) total += 1 + countDescendants(c.id);
  return total;
}

export function getByPath(p: string): Entry | undefined {
  const k = normKey(p);
  if (k === "/") {
    const home = landingByPath.get("/");
    return home ? homeEntry(home) : { kind: "home", path: "/", title: SITE_NAME, hubs: [], recentPosts: [] };
  }
  const les = lessonByPath.get(k);
  if (les) return lessonEntry(les);
  const post = postByPath.get(k);
  if (post) return articleFromPost(post);
  const land = landingByPath.get(k);
  if (land) return childrenOf(land.id).length > 0 ? courseIndexEntry(land) : articleFromLanding(land);
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
