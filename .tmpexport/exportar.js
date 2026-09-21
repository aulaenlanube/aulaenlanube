"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payloadApartado = payloadApartado;
exports.payloadTema = payloadTema;
// Constructor del documento de exportación (formato markdown del motor
// OposicionesIA) a partir de los datos del Tema 1. Se ejecuta en el build:
// serializa las figuras SVG de los componentes React a texto para que el
// motor del PDF las rasterice como diagramas. Sin react-dom/server (bloqueo
// del App Router): se recorre el árbol de elementos React directamente.
const datos_1 = require("./datos");
const figuras_1 = require("./figuras");
// ── Serializador mínimo de elementos React → HTML (suficiente para SVG) ──
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const CAMEL_OK = new Set([
    "viewBox", "markerWidth", "markerHeight", "refX", "refY", "baseFrequency",
    "stdDeviation", "preserveAspectRatio", "xmlnsXlink", "xLinkHref", "patternUnits",
]);
const kebab = (k) => CAMEL_OK.has(k) ? k : k.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
function styleObj(o) {
    return Object.entries(o).map(([k, v]) => `${kebab(k)}:${v}`).join(";");
}
function attrs(props) {
    let out = "";
    for (const [k, v] of Object.entries(props)) {
        if (k === "children" || k === "key" || v == null || v === false || v === true)
            continue;
        const name = k === "className" ? "class" : kebab(k);
        const val = typeof v === "object" ? styleObj(v) : String(v);
        out += ` ${name}="${esc(val)}"`;
    }
    return out;
}
const FRAGMENT = Symbol.for("react.fragment");
function walk(el) {
    if (el == null || el === false || el === true)
        return "";
    if (typeof el === "string" || typeof el === "number")
        return esc(String(el));
    if (Array.isArray(el))
        return el.map(walk).join("");
    const e = el;
    if (e && typeof e === "object" && "type" in e && e.props) {
        if (e.type === FRAGMENT)
            return walk(e.props.children);
        if (typeof e.type === "function")
            return walk(e.type(e.props));
        if (typeof e.type === "string") {
            const inner = walk(e.props.children);
            return `<${e.type}${attrs(e.props)}>${inner}</${e.type}>`;
        }
    }
    return "";
}
// ── Figuras de teoría (componentes sin props → se invocan directos) ──
const FIGS = {
    termo: () => (0, figuras_1.Termohorizontal)(),
    signos: () => (0, figuras_1.TablaSignos)(),
    fichas: () => (0, figuras_1.FichasColores)(),
    jerarquia: () => (0, figuras_1.Jerarquia)(),
    fases: () => (0, figuras_1.Fases)(),
};
// Elemento React de una figura → bloque ```svg + pie de figura (cursiva).
function figMd(node) {
    const html = walk(node).replace(/ class="[^"]*"/g, "");
    const svg = /<svg[\s\S]*?<\/svg>/i.exec(html);
    if (!svg)
        return "";
    const cap = /<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i.exec(html);
    const fence = svg[0].replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ');
    const out = ["```svg", fence, "```"];
    if (cap)
        out.push("*" + cap[1].replace(/<[^>]+>/g, "").trim() + "*");
    return out.join("\n");
}
// Tabla HTML (RAW: de la teoría) → tabla markdown de pipes (el motor solo
// maquetiza tablas de pipes, con fondo de cabecera y rejilla).
function tablaMd(html) {
    const cap = /<caption>([\s\S]*?)<\/caption>/.exec(html)?.[1]?.trim();
    const rows = (html.match(/<tr>[\s\S]*?<\/tr>/g) || []).map((r) => (r.match(/<(?:th|td)[^>]*>([\s\S]*?)<\/(?:th|td)>/g) || [])
        .map((c) => c.replace(/<[^>]+>/g, "").replace(/\|/g, "/").trim()));
    if (rows.length < 2)
        return "";
    const out = [];
    if (cap)
        out.push("**" + cap + "**", "");
    out.push("| " + rows[0].join(" | ") + " |");
    out.push("|" + rows[0].map(() => "---").join("|") + "|");
    for (const r of rows.slice(1))
        out.push("| " + r.join(" | ") + " |");
    return out.join("\n");
}
function teoriaMd(ap) {
    return ap.teoria
        .map((t) => {
        if (t.startsWith("RAW:"))
            return tablaMd(t.slice(4));
        if (t.startsWith("Fig:")) {
            const f = FIGS[t.slice(4)];
            return f ? figMd(f()) : "";
        }
        return t;
    })
        .filter(Boolean)
        .join("\n\n");
}
function ejemplosMd(ap) {
    return ap.ej.map((e) => `- ${e}`).join("\n");
}
function lineaDeActividad(a) {
    if (!a.ln)
        return "";
    return figMd((0, figuras_1.LineaH)({
        desde: a.ln[0],
        hasta: a.ln[1],
        marcas: a.ln[2].map(([x, label, color]) => ({ x, label, color: color })),
        caption: "Recta numérica horizontal de apoyo para esta actividad.",
    }));
}
// Niveles del PDF (los que entiende el motor en opts.niveles): caja lvl 0 =
// original sin adaptación (a.nv[0]), lvl 1 = 1.º ESO (a.nv[1]),
// lvl 2 = 6.º primaria (a.nv[2]), lvl 3 = 5.º primaria (a.nv[3]).
const PDF_NIVELES = [
    { nv: 0, lvl: 0, bg: "#eaf5ea", accent: "#2e7d32" },
    { nv: 1, lvl: 1, bg: "#f3e8fb", accent: "#7b1fa2" },
    { nv: 2, lvl: 2, bg: "#e8f1fb", accent: "#1565c0" },
    { nv: 3, lvl: 3, bg: "#fdf3e0", accent: "#b26a00" },
];
// El motor ahora filtra soluciones/niveles con el 9º argumento (opts): este
// emisor SIEMPRE escribe la sintaxis completa (:::box, [[fill]], líneas @).
// El parámetro `soluciones` se mantiene por compatibilidad pero se ignora.
function actMd(a, _soluciones = true) {
    const L = [];
    if (a.d) {
        L.push(a.d, "");
    }
    const ln = lineaDeActividad(a);
    if (ln)
        L.push(ln, "");
    if (a.regla)
        L.push(figMd((0, figuras_1.TablaSignos)()), "");
    for (const { nv, lvl, bg, accent } of PDF_NIVELES) {
        const n = a.nv[nv];
        if (!n)
            continue;
        L.push(`:::box title="${datos_1.LABELS[nv]}" lvl=${lvl} bg=${bg} accent=${accent}`);
        if (lvl === 0 && a.d)
            L.push(a.d, "");
        if (n.in)
            L.push("> " + n.in, "");
        n.p.forEach((x) => L.push(`- ${x}`, "[[fill]]"));
        L.push("@ Solución:");
        n.s.forEach((x) => L.push("@ " + x));
        if (n.ad)
            L.push(`*Adaptación: ${n.ad}*`);
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
function payloadApartado(ap) {
    const acts = datos_1.ACTS[ap.slug] || [];
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
function payloadTema() {
    return {
        filename: `PT-2ESO-Matematicas-Tema1-completo.pdf`,
        headerTitle: TEMA,
        headerSubtitle: "Adaptaciones PT · Matemáticas 2.º ESO",
        footerTitle: "aulaenlanube.com",
        sections: datos_1.APS.map((ap) => ({
            title: `${ap.n}. ${ap.t}`,
            content: `## Teoría\n\n${teoriaMd(ap)}\n\n## Ejemplos resueltos\n\n${ejemplosMd(ap)}\n\n## Actividades\n\n${(datos_1.ACTS[ap.slug] || [])
                .map((a, k) => `### Actividad ${k + 1} — ${a.t}\n\n${actMd(a)}`)
                .join("\n")}`,
        })),
    };
}
