// Constructor del documento de exportación (formato markdown del motor
// OposicionesIA) a partir de los datos del Tema 1. Se ejecuta en el build:
// serializa las figuras SVG de los componentes React a texto para que el
// motor del PDF las rasterice como diagramas. Sin react-dom/server (bloqueo
// del App Router): se recorre el árbol de elementos React directamente.
import { APS, ACTS, LABELS } from "./datos";
import type { Ap, Act } from "./datos";
import { Termohorizontal, TablaSignos, FichasColores, Jerarquia, Fases, LineaH } from "./figuras";

export type PdfSec = { title?: string; content: string };
export type PdfPayload = {
  filename: string;
  headerTitle: string;
  headerSubtitle: string;
  footerTitle: string;
  sections: PdfSec[];
  // Idioma del pie del motor («Pàgina X de Y» en valencià). Por defecto castellano.
  lang?: "castellano" | "valenciano";
};

// ── Avaluació 1 (ACI 1) · Nombres enters · 2n ESO D ──────────────────────
// Fuente de verdad del examen: la página /examen/ lo lista y payloadExamen()
// lo traduce al formato del motor con huecos [[fill:N]] (versión «per a
// resolver»). La versión oficial maquetada con la plantilla del centre es el
// PDF estático de public/exams/mat-2eso/aci1-nombres-enters-2eso-d.pdf.
export type ExamenEx = { n: number; t: string; parts?: string[]; text?: string[]; espai: number };

export const EXAMEN: ExamenEx[] = [
  { n: 1, t: "Resol", espai: 2, parts: [
    "**a)** – 3 + 5 =", "**b)** + 12 – 5 =", "**c)** 4 + ( – 2) =",
    "**d)** – 2 – ( – 3) =", "**e)** – ( – 3 + 8) + 7 =", "**f)** 3 – ( 7 + 5 ) =",
    "**g)** – 5 + 3 – ( – 8 ) =",
  ] },
  { n: 2, t: "Calcula", espai: 3, parts: [
    "**a)** 5 – ( – 3 + 6) – ( – 5 – 1 ) =",
    "**b)** – ( 5 + 4 ) – [ –3 – (5 + 7)] =",
    "**c)** 7 – [ – 2 + ( 5 – 12 ) ] + ( – 6 ) =",
  ] },
  { n: 3, t: "Resol les restes amb l'algoritme de la resta (portant)", espai: 5, parts: [
    "**a)** 5.240 – 3.678 =", "**b)** 10.005 – 7.486 =",
    "**c)** 7.000 – 3.862 =", "**d)** 23.041 – 15.786 =",
  ] },
  { n: 4, t: "Problema de pisos", espai: 4, text: [
    "La Malena viu al 5é pis. Baixa 6 plantes en ascensor per a anar al traster a arreplegar uns productes de neteja i, després, puja 8 plantes per a netejar la casa dels seus pares. **En quin pis viuen els pares de la Malena?**",
  ] },
  { n: 5, t: "Problema de pisos (més senzill)", espai: 4, text: [
    "En Marc viu al 3r pis. Baixa 5 pisos en ascensor per a anar al garatge i, després, puja 7 pisos per a anar a casa d'un amic. **En quin pis viu l'amic d'En Marc?**",
  ] },
  { n: 6, t: "Calcula (multiplicació i divisió d'enters)", espai: 2, parts: [
    "**a)** ( – 2 ) · 4 =", "**b)** – 3 · ( – 10) =",
    "**c)** 80 : ( – 40) : 2 =", "**d)** – 15 : [( – 5) · 3] =",
  ] },
];

// Soluciones del examen (para el profe; el payload «per a resolver» nunca las lleva).
export const EXAMEN_SOL: Record<number, string[]> = {
  1: ["a) +2", "b) +7", "c) +2", "d) +1", "e) +2", "f) –9", "g) +6"],
  2: ["a) +8", "b) +1", "c) –4"],
  3: ["a) 1.562", "b) 2.519", "c) 3.138", "d) 7.255"],
  4: ["5 – 6 + 8 = 7 → al **7é pis**."],
  5: ["3 – 5 + 7 = 5 → al **5é pis**."],
  6: ["a) –8", "b) +30", "c) –1", "d) –1"],
};

// Examen en formato del motor: todo en valencianís, con renglones [[fill:N]]
// detrás de cada apartado/enunciado y SIN soluciones.
export function payloadExamen(): PdfPayload {
  const L: string[] = [
    "# Avaluació 1 · Nombres enters",
    "",
    "Tema 1 — Matemàtiques 2n ESO · Grup 2n ESO D · Curs 26/27",
    "",
    "*Escriu les operacions pas a pas, de manera que es puga seguir el procés de resolució. Exercicis sense el procés o raonament corresponent no es consideraran correctes.*",
    "",
  ];
  for (const ex of EXAMEN) {
    L.push(`## Exercici ${ex.n} — ${ex.t}`, "");
    if (ex.text) for (const t of ex.text) { L.push(t, ""); }
    if (ex.parts) for (const p of ex.parts) { L.push(`- ${p}`, `[[fill:${ex.espai}]]`, ""); }
    else L.push(`[[fill:${ex.espai}]]`, "");
  }
  return {
    filename: "PT-2ESO-Matematicas-T1-Examen-Avaluacio1.pdf",
    headerTitle: "Avaluació 1 · Nombres enters",
    headerSubtitle: "Tema 1 · Matemàtiques 2n ESO · Adaptaciones PT",
    footerTitle: "aulaenlanube.com",
    lang: "valenciano",
    sections: [{ content: L.join("\n") }],
  };
}

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

// ── Figuras de teoría (componentes sin props → se invocan directos) ──
const FIGS: Record<string, () => unknown> = {
  termo: () => Termohorizontal(),
  signos: () => TablaSignos(),
  fichas: () => FichasColores(),
  jerarquia: () => Jerarquia(),
  fases: () => Fases(),
};

// Elemento React de una figura → bloque ```svg + pie de figura (cursiva).
function figMd(node: unknown): string {
  const html = walk(node).replace(/ class="[^"]*"/g, "");
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
      if (t.startsWith("Fig:")) {
        const f = FIGS[t.slice(4)];
        return f ? figMd(f()) : "";
      }
      return t;
    })
    .filter(Boolean)
    .join("\n\n");
}

function ejemplosMd(ap: Ap): string {
  return ap.ej.map((e) => `- ${e}`).join("\n");
}

function lineaDeActividad(a: Act): string {
  if (!a.ln) return "";
  return figMd(
    LineaH({
      desde: a.ln[0],
      hasta: a.ln[1],
      marcas: a.ln[2].map(([x, label, color]) => ({ x, label, color: color as "rojo" | "azul" | "verde" })),
      caption: "Recta numérica horizontal de apoyo para esta actividad.",
    })
  );
}

// Niveles del PDF (los que entiende el motor en opts.niveles): caja lvl 0 =
// original sin adaptación (a.nv[0]), lvl 1 = 1.º ESO (a.nv[1]),
// lvl 2 = 6.º primaria (a.nv[2]), lvl 3 = 5.º primaria (a.nv[3]).
const PDF_NIVELES: { nv: number; lvl: number; bg: string; accent: string }[] = [
  { nv: 0, lvl: 0, bg: "#eaf5ea", accent: "#2e7d32" },
  { nv: 1, lvl: 1, bg: "#f3e8fb", accent: "#7b1fa2" },
  { nv: 2, lvl: 2, bg: "#e8f1fb", accent: "#1565c0" },
  { nv: 3, lvl: 3, bg: "#fdf3e0", accent: "#b26a00" },
];

// El motor ahora filtra soluciones/niveles con el 9º argumento (opts): este
// emisor SIEMPRE escribe la sintaxis completa (:::box, [[fill]], líneas @).
// El parámetro `soluciones` se mantiene por compatibilidad pero se ignora.
function actMd(a: Act, _soluciones = true): string {
  const L: string[] = [];
  if (a.d) { L.push(a.d, ""); }
  const ln = lineaDeActividad(a);
  if (ln) L.push(ln, "");
  if (a.regla) L.push(figMd(TablaSignos()), "");
  for (const { nv, lvl, bg, accent } of PDF_NIVELES) {
    const n = a.nv[nv];
    if (!n) continue;
    L.push(`:::box title="${LABELS[nv]}" lvl=${lvl} bg=${bg} accent=${accent}`);
    if (lvl === 0 && a.d) L.push(a.d, "");
    if (n.in) L.push("> " + n.in, "");
    n.p.forEach((x) => L.push(`- ${x}`, "[[fill]]"));
    L.push("@ Solución:");
    n.s.forEach((x) => L.push("@ " + x));
    if (n.ad) L.push(`~ Adaptación: ${n.ad}`);
    L.push(":::", "");
  }
  return L.join("\n");
}

const TEMA = "Tema 1 · Números enteros";

// Un apartado = teoría + ejemplos, y cada actividad en su propia portadilla
// (página nueva entera: ninguna actividad se parte entre dos páginas).
// El payload SIEMPRE lleva la sintaxis completa (cajas, huecos [[fill]] y
// soluciones @): quien filtra niveles y soluciones es el motor con el 9º
// argumento opts de exportPdf. El filename es la base sin sufijos: el botón
// compone el nombre final (nivel + con/sin soluciones).
export function payloadApartado(ap: Ap): PdfPayload {
  const acts = ACTS[ap.slug] || [];
  const cabecera = `# ${ap.t}\n\n${TEMA} — Matemáticas 2.º ESO · Adaptaciones PT\n\n## Teoría\n\n${teoriaMd(ap)}\n\n## Ejemplos resueltos\n\n${ejemplosMd(ap)}`;
  return {
    filename: `PT-2ESO-Matematicas-T1-${ap.slug}.pdf`,
    headerTitle: `${ap.n}. ${ap.t}`,
    headerSubtitle: `${TEMA} · Matemáticas 2.º ESO`,
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
    filename: `PT-2ESO-Matematicas-Tema1-completo.pdf`,
    headerTitle: TEMA,
    headerSubtitle: "Adaptaciones PT · Matemáticas 2.º ESO",
    footerTitle: "aulaenlanube.com",
    sections: APS.map((ap) => ({
      title: `${ap.n}. ${ap.t}`,
      content: `## Teoría\n\n${teoriaMd(ap)}\n\n## Ejemplos resueltos\n\n${ejemplosMd(ap)}\n\n## Actividades\n\n${(ACTS[ap.slug] || [])
        .map((a, k) => `### Actividad ${k + 1} — ${a.t}\n\n${actMd(a)}`)
        .join("\n")}`,
    })),
  };
}
