"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sub = exports.tarjeta = exports.n5 = exports.n6 = exports.n1 = exports.n2 = exports.chip = void 0;
exports.Figura = Figura;
exports.Enunciado = Enunciado;
exports.Solucion = Solucion;
exports.Adaptacion = Adaptacion;
exports.Teoria = Teoria;
exports.SeccionTitulo = SeccionTitulo;
exports.Nivel = Nivel;
const jsx_runtime_1 = require("react/jsx-runtime");
// Piezas compartidas por las páginas de ejercicios de Adaptaciones PT.
// Solo reutilizan las clases visuales ya presentes en el blog (tarjetas
// sky/indigo, chips de nivel, detalles <details> nativos) — sin CSS nuevo.
exports.chip = "inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700";
const nivel = "inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider";
exports.n2 = nivel + " border-violet-300 bg-violet-50 text-violet-700";
exports.n1 = nivel + " border-sky-300 bg-sky-50 text-sky-700";
exports.n6 = nivel + " border-emerald-300 bg-emerald-50 text-emerald-700";
exports.n5 = nivel + " border-amber-300 bg-amber-50 text-amber-700";
exports.tarjeta = "mt-8 scroll-mt-24 rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 p-5 shadow-sm sm:p-7";
const sol = "mt-3 rounded-xl border border-emerald-200 bg-white p-4 text-sm text-zinc-700";
const ad = "mt-2 rounded-xl border border-zinc-200 bg-white/70 p-4 text-[13px] text-zinc-600";
exports.sub = "text-sm font-bold uppercase tracking-wide text-zinc-500";
function Figura({ children, caption }) {
    return ((0, jsx_runtime_1.jsxs)("figure", { className: "mt-6 flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm", children: [children, caption ? (0, jsx_runtime_1.jsx)("figcaption", { className: "mt-2 text-center text-xs text-zinc-500", children: caption }) : null] }));
}
function Lineas({ partes, className }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "space-y-1 " + (className || ""), children: partes.map((p, i) => ((0, jsx_runtime_1.jsx)("p", { children: p }, i))) }));
}
// Enunciado: intro opcional + UN APTADO POR LÍNEA (a, b, c, d…)
function Enunciado({ intro, partes }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "mt-2", children: [intro ? (0, jsx_runtime_1.jsx)("p", { className: "text-[15px] text-zinc-800", children: intro }) : null, (0, jsx_runtime_1.jsx)(Lineas, { partes: partes, className: "mt-1 text-[15px] text-zinc-800" })] }));
}
function Solucion({ partes }) {
    return ((0, jsx_runtime_1.jsxs)("details", { className: sol, children: [(0, jsx_runtime_1.jsx)("summary", { className: "cursor-pointer select-none font-bold text-emerald-700", children: "Ver soluci\u00F3n" }), (0, jsx_runtime_1.jsx)(Lineas, { partes: partes, className: "mt-2" })] }));
}
function Adaptacion({ children }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: ad, children: [(0, jsx_runtime_1.jsx)("span", { className: exports.sub, children: "\uD83D\uDD27 Qu\u00E9 se adapta:" }), " ", children] }));
}
// Bloque «Teoría» de un apartado: explicación corta y accesible, misma tarjeta
// visual que los ejercicios.
function Teoria({ children }) {
    return ((0, jsx_runtime_1.jsxs)("section", { className: "mt-8 rounded-2xl border border-blue-200 bg-blue-50/60 p-5 shadow-sm sm:p-7", children: [(0, jsx_runtime_1.jsx)("h2", { className: "flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl", children: "\uD83D\uDCD8 Teor\u00EDa" }), (0, jsx_runtime_1.jsx)("div", { className: "mt-3 space-y-3 text-[15px] leading-relaxed text-zinc-700", children: children })] }));
}
// Cabecera de sección dentro de un apartado (Ejemplos / Actividades).
function SeccionTitulo({ emoji, titulo, subtitulo }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "mt-10", children: [(0, jsx_runtime_1.jsxs)("h2", { className: "flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl", children: [emoji, " ", titulo] }), subtitulo ? (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-zinc-500", children: subtitulo }) : null] }));
}
function Nivel({ cls, label, intro, partes, solucion, adaptacion, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "mt-6", children: [(0, jsx_runtime_1.jsx)("span", { className: cls, children: label }), (0, jsx_runtime_1.jsx)(Enunciado, { intro: intro, partes: partes }), adaptacion ? (0, jsx_runtime_1.jsx)(Adaptacion, { children: adaptacion }) : null, (0, jsx_runtime_1.jsx)(Solucion, { partes: solucion })] }));
}
