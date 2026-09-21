// Constructor del documento de exportación (formato markdown del motor
// OposicionesIA) a partir de los datos del Tema 1 de Castellano. Se ejecuta en
// el build: serializa las figuras SVG de los componentes React a texto para
// que el motor del PDF las rasterice como diagramas. Sin react-dom/server
// (bloqueo del App Router): se recorre el árbol de elementos React a mano.
import { APS, ACTS, TEMA } from "./datos";
import type { Ap, Act } from "./tipos";
import { LABELS } from "./tipos";
import { FIGS } from "./figuras";

export type PdfSec = { title?: string; content: string };
export type PdfPayload = {
  filename: string;
  headerTitle: string;
  headerSubtitle: string;
  footerTitle: string;
  sections: PdfSec[];
};

// ── Serializador mínimo de elementos React → HTML (suficiente para SVG) ──
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const CAMEL_OK = new Set([
  "viewBox", "markerWidth", "markerHeight", "refX", "refY", "baseFrequency",
  "stdDeviation", "preserveAspectRatio", "xmlnsXlink", "xLinkHref", "patternUnits",
]);
const kebab = (k: string) =>
  CAMEL_OK.has(k) ? k : k.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());

function styleObj(o: Record<string, unknown>): string {
  return Object.entries(o).map(([k, v]) => `${kebab(k)}:${v}`).join(";");
}

function attrs(props: Record<string, unknown>): string {
  let out = "";
  for (const [k, v] of Object.entries(props)) {
    if (k === "children" || k === "key" || v == null || v === false || v === true) continue;
    const name = k === "className" ? "class" : kebab(k);
    const val = typeof v === "object" ? styleObj(v as Record<string, unknown>) : String(v);
    out += ` ${name}="${esc(val)}"`;
  }
  return out;
}

const FRAGMENT = Symbol.for("react.fragment");

function walk(el: unknown): string {
  if (el == null || el === false || el === true) return "";
  if (typeof el === "string" || typeof el === "number") return esc(String(el));
  if (Array.isArray(el)) return el.map(walk).join("");
  const e = el as { type?: unknown; props?: Record<string, unknown> };
  if (e && typeof e === "object" && "type" in e && e.props) {
    if (e.type === FRAGMENT) return walk(e.props.children);
    if (typeof e.type === "function") return walk((e.type as (p: unknown) => unknown)(e.props));
    if (typeof e.type === "string") {
      const inner = walk(e.props.children);
      return `<${e.type}${attrs(e.props)}>${inner}</${e.type}>`;
    }
  }
  return "";
}

// Elemento React de una figura → bloque ```svg + pie de figura (cursiva).
function figMd(clave: string): string {
  const C = FIGS[clave];
  if (!C) return "";
  const html = walk(C()).replace(/ class="[^"]*"/g, "");
  const svg = /<svg[\s\S]*?<\/svg>/i.exec(html);
  if (!svg) return "";
  const cap = /<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i.exec(html);
  const fence = svg[0].replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ');
  const out = ["```svg", fence, "```"];
  if (cap) out.push("*" + cap[1].replace(/<[^>]+>/g, "").trim() + "*");
  return out.join("\n");
}

// Tabla HTML (RAW: de la teoría) → tabla markdown de pipes (el motor solo
// maquetiza tablas de pipes, con fondo de cabecera y rejilla).
function tablaMd(html: string): string {
  const cap = /<caption>([\s\S]*?)<\/caption>/.exec(html)?.[1]?.trim();
  const rows = (html.match(/<tr>[\s\S]*?<\/tr>/g) || []).map((r) =>
    (r.match(/<(?:th|td)[^>]*>([\s\S]*?)<\/(?:th|td)>/g) || [])
      .map((c) => c.replace(/<[^>]+>/g, "").replace(/\|/g, "/").trim())
  );
  if (rows.length < 2) return "";
  const out: string[] = [];
  if (cap) out.push("**" + cap + "**", "");
  out.push("| " + rows[0].join(" | ") + " |");
  out.push("|" + rows[0].map(() => "---").join("|") + "|");
  for (const r of rows.slice(1)) out.push("| " + r.join(" | ") + " |");
  return out.join("\n");
}

function teoriaMd(ap: Ap): string {
  return ap.teoria
    .map((t) => {
      if (t.startsWith("RAW:")) return tablaMd(t.slice(4));
      if (t.startsWith("Fig:")) return figMd(t.slice(4));
      return t;
    })
    .filter(Boolean)
    .join("\n\n");
}

function ejemplosMd(ap: Ap): string {
  return ap.ej.map((e) => `- ${e}`).join("\n");
}

// Niveles del PDF (los que filtra el motor con opts.niveles): caja lvl 0 =
// ejercicio base de 2.º ESO (a.nv[0]), lvl 1 = 1.º ESO (a.nv[1]),
// lvl 2 = 6.º primaria, lvl 3 = 5.º primaria, lvl 4 = 4.º primaria.
const PDF_NIVELES: { nv: number; lvl: number; bg: string; accent: string }[] = [
  { nv: 0, lvl: 0, bg: "#f3e8fb", accent: "#7b1fa2" },
  { nv: 1, lvl: 1, bg: "#e8f1fb", accent: "#1565c0" },
  { nv: 2, lvl: 2, bg: "#eaf5ea", accent: "#2e7d32" },
  { nv: 3, lvl: 3, bg: "#fdf3e0", accent: "#b26a00" },
  { nv: 4, lvl: 4, bg: "#fdeaea", accent: "#b3261e" },
];

// El emisor SIEMPRE escribe la sintaxis completa (:::box, [[fill]], líneas @);
// quien filtra niveles y soluciones es el motor, con el 9.º argumento opts de
// exportPdf.
function actMd(a: Act): string {
  const L: string[] = [];
  if (a.d) L.push(a.d, "");
  if (a.fig) {
    const f = figMd(a.fig);
    if (f) L.push(f, "");
  }
  for (const { nv, lvl, bg, accent } of PDF_NIVELES) {
    const n = a.nv[nv];
    if (!n) continue;
    L.push(`:::box title="${LABELS[nv]}" lvl=${lvl} bg=${bg} accent=${accent}`);
    if (n.in) L.push("> " + n.in, "");
    n.p.forEach((x) => L.push(`- ${x}`, "[[fill]]"));
    L.push("@ Solución:");
    n.s.forEach((x) => L.push("@ " + x));
    if (n.ad) L.push(`~ Adaptación: ${n.ad}`);
    L.push(":::", "");
  }
  return L.join("\n");
}

// Un bloque = teoría + ejemplos, y cada actividad en su propia portadilla
// (página nueva entera: ninguna actividad se parte entre dos páginas).
export function payloadApartado(ap: Ap): PdfPayload {
  const acts = ACTS[ap.slug] || [];
  const cabecera = `# ${ap.t}\n\n${TEMA} — Lengua Castellana · Adaptaciones PT\n\n## Teoría\n\n${teoriaMd(ap)}\n\n## Ejemplos resueltos\n\n${ejemplosMd(ap)}`;
  return {
    filename: `PT-Castellano-T1-${ap.slug}.pdf`,
    headerTitle: `${ap.n}. ${ap.t}`,
    headerSubtitle: `${TEMA} · Lengua Castellana`,
    footerTitle: "aulaenlanube.com",
    sections: [
      { content: cabecera },
      ...acts.map((a, k) => ({ title: `Actividad ${k + 1} · ${a.t}`, content: actMd(a) })),
    ],
  };
}

// Tema completo: un bloque por apartado, cada uno en página nueva.
export function payloadTema(): PdfPayload {
  return {
    filename: "PT-Castellano-Tema1-completo.pdf",
    headerTitle: TEMA,
    headerSubtitle: "Adaptaciones PT · Lengua Castellana",
    footerTitle: "aulaenlanube.com",
    sections: APS.map((ap) => ({
      title: `${ap.n}. ${ap.t}`,
      content: `## Teoría\n\n${teoriaMd(ap)}\n\n## Ejemplos resueltos\n\n${ejemplosMd(ap)}\n\n## Actividades\n\n${(ACTS[ap.slug] || [])
        .map((a, k) => `### Actividad ${k + 1} — ${a.t}\n\n${actMd(a)}`)
        .join("\n")}`,
    })),
  };
}
