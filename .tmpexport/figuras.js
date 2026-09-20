"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineaH = LineaH;
exports.TablaSignos = TablaSignos;
exports.FichasColores = FichasColores;
exports.Icono = Icono;
exports.Termohorizontal = Termohorizontal;
exports.Jerarquia = Jerarquia;
exports.Fases = Fases;
const jsx_runtime_1 = require("react/jsx-runtime");
const ui_1 = require("./ui");
const COLORES = {
    rojo: "#dc2626",
    azul: "#0284c7",
    verde: "#16a34a",
    violeta: "#6d28d9",
    ambar: "#b45309",
};
// Recta numérica HORIZONTAL (regla de Edu 20-09: nunca vertical).
// Marca el 0 en el centro del tramo, graduación cada 1 o 2 unidades y puntos.
function LineaH({ desde, hasta, marcas, caption, }) {
    const W = 520;
    const H = 86;
    const pad = 26;
    const px = (x) => pad + ((x - desde) * (W - 2 * pad)) / (hasta - desde);
    const paso = hasta - desde > 160 ? 40 : hasta - desde > 80 ? 20 : hasta - desde > 40 ? 10 : hasta - desde > 20 ? 4 : hasta - desde > 16 ? 2 : 1;
    const ticks = [];
    for (let i = desde; i <= hasta; i += paso)
        ticks.push(i);
    const cero = px(0);
    return ((0, jsx_runtime_1.jsx)(ui_1.Figura, { caption: caption, children: (0, jsx_runtime_1.jsxs)("svg", { viewBox: `0 0 ${W} ${H}`, className: "h-28 w-full max-w-full", role: "img", "aria-label": "Recta num\u00E9rica horizontal", children: [desde < 0 && hasta > 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("rect", { x: pad, y: 30, width: cero - pad, height: 18, fill: "#dbeafe", opacity: "0.55" }), (0, jsx_runtime_1.jsx)("rect", { x: cero, y: 30, width: W - pad - cero, height: 18, fill: "#fee2e2", opacity: "0.5" })] })), (0, jsx_runtime_1.jsx)("line", { x1: 10, y1: 39, x2: W - 10, y2: 39, stroke: "#475569", strokeWidth: "2" }), (0, jsx_runtime_1.jsx)("path", { d: `M${W - 10} 39 l-7 -3.5v7z`, fill: "#475569" }), (0, jsx_runtime_1.jsx)("path", { d: `M10 39 l7 -3.5v7z`, fill: "#475569" }), ticks.map((t) => ((0, jsx_runtime_1.jsxs)("g", { children: [(0, jsx_runtime_1.jsx)("line", { x1: px(t), y1: 33, x2: px(t), y2: 45, stroke: "#64748b", strokeWidth: t === 0 ? 2.4 : 1.4 }), (0, jsx_runtime_1.jsx)("text", { x: px(t), y: 60, fontSize: "11", textAnchor: "middle", fill: t === 0 ? "#0f172a" : "#64748b", fontWeight: t === 0 ? 700 : 400, fontFamily: "system-ui", children: t })] }, t))), marcas.map((m, i) => {
                    const c = COLORES[m.color || "azul"];
                    return ((0, jsx_runtime_1.jsxs)("g", { children: [(0, jsx_runtime_1.jsx)("circle", { cx: px(m.x), cy: 39, r: 5.5, fill: c, stroke: "#fff", strokeWidth: "1.5" }), m.label ? ((0, jsx_runtime_1.jsx)("text", { x: px(m.x), y: 20, fontSize: "11", textAnchor: "middle", fill: c, fontWeight: 700, fontFamily: "system-ui", children: m.label })) : null] }, i));
                })] }) }));
}
function TablaSignos() {
    // Espejo del diagrama del libro: recuadros azul (+) y rojo (−).
    const sq = (x, y, pos) => ((0, jsx_runtime_1.jsx)("rect", { x: x, y: y + 2, width: 16, height: 16, rx: 3, fill: pos ? "#bfdbfe" : "#fecaca", stroke: pos ? "#1d4ed8" : "#dc2626", strokeWidth: "1.5" }, x));
    const row = (y, a, b, r) => ((0, jsx_runtime_1.jsxs)("g", { fontFamily: "system-ui", fontSize: "12", fontWeight: "bold", children: [sq(10, y, a), (0, jsx_runtime_1.jsx)("text", { x: 33, y: y + 15, fill: "#334155", children: "\u00B7" }), sq(40, y, b), (0, jsx_runtime_1.jsx)("text", { x: 63, y: y + 15, fill: "#334155", children: "=" }), sq(74, y, r), (0, jsx_runtime_1.jsx)("text", { x: 100, y: y + 15, fontSize: "10.5", fill: "#475569", children: r ? "positivo (+)" : "negativo (−)" })] }, y));
    return ((0, jsx_runtime_1.jsx)(ui_1.Figura, { caption: "Regla de los signos (igual que en tu libro): mismo color = positivo \u00B7 colores distintos = negativo. Vale igual para dividir.", children: (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 180 108", className: "h-36 w-auto max-w-full", role: "img", "aria-label": "Tabla de signos con recuadros azules y rojos", children: [row(8, true, true, true), row(32, false, false, true), row(56, true, false, false), row(80, false, true, false)] }) }));
}
// Modelo de fichas para SUMAR/RESTAR (apartado 4): azul = +, rojo = −;
// cada pareja azul+rojo se anula y el color que sobra da el signo del resultado.
function FichasColores() {
    const chips = (x0, y0, n, pos) => Array.from({ length: n }, (_, i) => ((0, jsx_runtime_1.jsx)("rect", { x: x0 + i * 20, y: y0, width: 16, height: 16, rx: 3, fill: pos ? "#bfdbfe" : "#fecaca", stroke: pos ? "#1d4ed8" : "#dc2626", strokeWidth: "1.5" }, `${x0}-${i}`)));
    // [y, azules, rojas, sobra: "azul"|"rojo"|null, etiqueta resultado]
    const filas = [
        [10, 3, 2, "azul", "= +1"],
        [40, 2, 5, "rojo", "= −3"],
        [70, 4, 4, null, "= 0"],
    ];
    return ((0, jsx_runtime_1.jsx)(ui_1.Figura, { caption: "Sumar con fichas: azul = positivo, rojo = negativo. Cada pareja azul + rojo se anula (vale 0); el color que sobra es el signo del resultado.", children: (0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 300 96", className: "h-28 w-auto max-w-full", role: "img", "aria-label": "Tres combinaciones de fichas azules y rojas con su resultado", children: filas.map(([y, az, ro, sobra, res]) => ((0, jsx_runtime_1.jsxs)("g", { children: [chips(10, y - 2, az, true), (0, jsx_runtime_1.jsx)("text", { x: 14 + az * 20, y: y + 11, fontSize: "12", fontWeight: "bold", fill: "#334155", children: "+" }), chips(26 + az * 20, y - 2, ro, false), (0, jsx_runtime_1.jsx)("text", { x: 44 + (az + ro) * 20, y: y + 11, fontSize: "12", fontWeight: "bold", fill: "#334155", children: "=" }), sobra ? ((0, jsx_runtime_1.jsx)("rect", { x: 60 + (az + ro) * 20, y: y - 2, width: 16, height: 16, rx: 3, fill: sobra === "azul" ? "#bfdbfe" : "#fecaca", stroke: sobra === "azul" ? "#1d4ed8" : "#dc2626", strokeWidth: "1.5" })) : ((0, jsx_runtime_1.jsx)("text", { x: 58 + (az + ro) * 20, y: y + 11, fontSize: "13", fontWeight: "bold", fill: "#64748b", children: "\u2205" })), (0, jsx_runtime_1.jsx)("text", { x: 84 + (az + ro) * 20, y: y + 11, fontSize: "11", fontWeight: "bold", fill: "#0f172a", children: res })] }, y))) }) }));
}
// Iconos-objeto sencillos (40x40) para la cajita de cada actividad.
function Icono({ k }) {
    const s = { width: 40, height: 40, viewBox: "0 0 40 40", "aria-hidden": true };
    const line = { fill: "none", strokeWidth: 2, strokeLinecap: "round" };
    switch (k) {
        case "termometro": // horizontal: termómetro tumbado
            return ((0, jsx_runtime_1.jsxs)("svg", { ...s, children: [(0, jsx_runtime_1.jsx)("rect", { x: "6", y: "16", width: "22", height: "8", rx: "4", fill: "#e0f2fe", stroke: "#0284c7" }), (0, jsx_runtime_1.jsx)("circle", { cx: "32", cy: "20", r: "5", fill: "#ef4444", stroke: "#b91c1c" }), (0, jsx_runtime_1.jsx)("rect", { x: "12", y: "18", width: "16", height: "4", rx: "2", fill: "#ef4444" }), (0, jsx_runtime_1.jsx)("path", { d: "M10 10v4M18 10v4M26 10v4", stroke: "#0369a1", strokeWidth: "1.5" })] }));
        case "etiquetas":
            return ((0, jsx_runtime_1.jsxs)("svg", { ...s, children: [(0, jsx_runtime_1.jsx)("rect", { x: "4", y: "8", width: "14", height: "12", rx: "3", fill: "#dcfce7", stroke: "#16a34a" }), (0, jsx_runtime_1.jsx)("rect", { x: "22", y: "20", width: "14", height: "12", rx: "3", fill: "#fee2e2", stroke: "#dc2626" }), (0, jsx_runtime_1.jsx)("path", { d: "M8 14h6M11 11v6", stroke: "#16a34a", ...line }), (0, jsx_runtime_1.jsx)("path", { d: "M26 26h6", stroke: "#dc2626", ...line })] }));
        case "banco":
            return ((0, jsx_runtime_1.jsxs)("svg", { ...s, children: [(0, jsx_runtime_1.jsx)("rect", { x: "5", y: "10", width: "30", height: "20", rx: "3", fill: "#fef3c7", stroke: "#b45309" }), (0, jsx_runtime_1.jsx)("circle", { cx: "20", cy: "20", r: "6", fill: "none", stroke: "#b45309" }), (0, jsx_runtime_1.jsx)("path", { d: "M20 15v10M17 17.5h6M17 22.5h6", stroke: "#b45309", strokeWidth: "1.5" })] }));
        case "rana":
            return ((0, jsx_runtime_1.jsxs)("svg", { ...s, children: [(0, jsx_runtime_1.jsx)("ellipse", { cx: "20", cy: "24", rx: "11", ry: "8", fill: "#bbf7d0", stroke: "#16a34a" }), (0, jsx_runtime_1.jsx)("circle", { cx: "14", cy: "15", r: "3.5", fill: "#bbf7d0", stroke: "#16a34a" }), (0, jsx_runtime_1.jsx)("circle", { cx: "26", cy: "15", r: "3.5", fill: "#bbf7d0", stroke: "#16a34a" }), (0, jsx_runtime_1.jsx)("circle", { cx: "14", cy: "15", r: "1.3", fill: "#14532d" }), (0, jsx_runtime_1.jsx)("circle", { cx: "26", cy: "15", r: "1.3", fill: "#14532d" }), (0, jsx_runtime_1.jsx)("path", { d: "M15 28c2 2 8 2 10 0", stroke: "#14532d", ...line })] }));
        case "ascensor":
            return ((0, jsx_runtime_1.jsxs)("svg", { ...s, children: [(0, jsx_runtime_1.jsx)("rect", { x: "10", y: "4", width: "20", height: "32", rx: "2", fill: "#ede9fe", stroke: "#6d28d9" }), (0, jsx_runtime_1.jsx)("path", { d: "M10 15h20M10 25h20", stroke: "#6d28d9", strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("rect", { x: "15", y: "26", width: "10", height: "7", rx: "1.5", fill: "#c4b5fd", stroke: "#6d28d9" }), (0, jsx_runtime_1.jsx)("path", { d: "M20 6l3 4h-6z", fill: "#6d28d9" })] }));
        case "tesoro":
            return ((0, jsx_runtime_1.jsxs)("svg", { ...s, children: [(0, jsx_runtime_1.jsx)("rect", { x: "10", y: "18", width: "20", height: "12", rx: "2", fill: "#fde68a", stroke: "#b45309" }), (0, jsx_runtime_1.jsx)("path", { d: "M10 22h20M20 18v12", stroke: "#b45309", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M20 6l4 6h-8z", fill: "#b45309" }), (0, jsx_runtime_1.jsx)("circle", { cx: "20", cy: "13", r: "2", fill: "#fef3c7", stroke: "#b45309" })] }));
        case "globos": // ciudades / temperatura mundo
            return ((0, jsx_runtime_1.jsxs)("svg", { ...s, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "20", cy: "22", r: "13", fill: "none", stroke: "#0284c7", strokeWidth: "2" }), (0, jsx_runtime_1.jsx)("path", { d: "M7 22h26M20 9c-5 5-5 21 0 26M20 9c5 5 5 21 0 26", stroke: "#0284c7", strokeWidth: "1.3", fill: "none" }), (0, jsx_runtime_1.jsx)("path", { d: "M14 16l-8-6", stroke: "#dc2626", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("circle", { cx: "6", cy: "10", r: "2", fill: "#dc2626" })] }));
        case "congelador":
            return ((0, jsx_runtime_1.jsxs)("svg", { ...s, children: [(0, jsx_runtime_1.jsx)("rect", { x: "9", y: "5", width: "22", height: "30", rx: "3", fill: "#e0f2fe", stroke: "#0369a1" }), (0, jsx_runtime_1.jsx)("path", { d: "M9 18h22", stroke: "#0369a1", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M18 24l2 2-2 2 2 2m-2-6h6m-6 0l2-2m-2 6l2 2", stroke: "#0284c7", ...line }), (0, jsx_runtime_1.jsx)("path", { d: "M18 11l2 2-2 2m-2-3h6", stroke: "#0369a1", ...line })] }));
        case "aguila":
            return ((0, jsx_runtime_1.jsxs)("svg", { ...s, children: [(0, jsx_runtime_1.jsx)("path", { d: "M4 14c8-8 24-8 32 0-6 2-10 2-16 2s-10 0-16-2z", fill: "#fef3c7", stroke: "#92400e" }), (0, jsx_runtime_1.jsx)("circle", { cx: "20", cy: "13", r: "2.5", fill: "#92400e" }), (0, jsx_runtime_1.jsx)("path", { d: "M20 16v4m-3-1l3 5 3-5", stroke: "#92400e", ...line })] }));
        case "mago":
            return ((0, jsx_runtime_1.jsxs)("svg", { ...s, children: [(0, jsx_runtime_1.jsx)("path", { d: "M20 4l12 26H8z", fill: "#ede9fe", stroke: "#6d28d9" }), (0, jsx_runtime_1.jsx)("path", { d: "M12 24c4 2 12 2 16 0", stroke: "#6d28d9", ...line }), (0, jsx_runtime_1.jsx)("circle", { cx: "27", cy: "10", r: "1.6", fill: "#fbbf24" }), (0, jsx_runtime_1.jsx)("path", { d: "M30 16l1.5 3 3 .5-2 2 .5 3-3-1.4-3 1.4.6-3-2-2 3-.5z", fill: "#fbbf24" })] }));
        case "signos":
            return ((0, jsx_runtime_1.jsxs)("svg", { ...s, children: [(0, jsx_runtime_1.jsx)("rect", { x: "6", y: "6", width: "28", height: "28", rx: "4", fill: "#f1f5f9", stroke: "#334155" }), (0, jsx_runtime_1.jsx)("text", { x: "20", y: "18", fontSize: "10", fontWeight: "bold", fill: "#16a34a", textAnchor: "middle", children: "+ = +" }), (0, jsx_runtime_1.jsx)("text", { x: "20", y: "30", fontSize: "10", fontWeight: "bold", fill: "#dc2626", textAnchor: "middle", children: "+ = \u2212" })] }));
        case "verdad":
            return ((0, jsx_runtime_1.jsxs)("svg", { ...s, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "20", cy: "20", r: "14", fill: "#f1f5f9", stroke: "#334155" }), (0, jsx_runtime_1.jsx)("path", { d: "M13 20l5 5 9-11", stroke: "#16a34a", strokeWidth: "3", fill: "none", strokeLinecap: "round" })] }));
        case "letras":
            return ((0, jsx_runtime_1.jsxs)("svg", { ...s, children: [(0, jsx_runtime_1.jsx)("rect", { x: "6", y: "12", width: "28", height: "16", rx: "3", fill: "#fff", stroke: "#334155" }), (0, jsx_runtime_1.jsx)("text", { x: "20", y: "25", fontSize: "12", fontWeight: "bold", fill: "#6d28d9", textAnchor: "middle", children: "A B C" })] }));
        case "dados":
            return ((0, jsx_runtime_1.jsxs)("svg", { ...s, children: [(0, jsx_runtime_1.jsx)("rect", { x: "6", y: "6", width: "13", height: "13", rx: "3", fill: "#fee2e2", stroke: "#dc2626" }), (0, jsx_runtime_1.jsx)("rect", { x: "21", y: "21", width: "13", height: "13", rx: "3", fill: "#dcfce7", stroke: "#16a34a" }), (0, jsx_runtime_1.jsx)("circle", { cx: "12.5", cy: "12.5", r: "1.8", fill: "#dc2626" }), (0, jsx_runtime_1.jsx)("circle", { cx: "27.5", cy: "27.5", r: "1.8", fill: "#16a34a" })] }));
        default: // "recta" — genérico
            return ((0, jsx_runtime_1.jsxs)("svg", { ...s, children: [(0, jsx_runtime_1.jsx)("path", { d: "M5 20h30", stroke: "#475569", strokeWidth: "2" }), (0, jsx_runtime_1.jsx)("path", { d: "M35 20l-4-2.5v5z", fill: "#475569" }), (0, jsx_runtime_1.jsx)("path", { d: "M13 15v10M20 13v14M27 15v10", stroke: "#0284c7", strokeWidth: "2" })] }));
    }
}
// Termómetro HORIZONTAL para teoría (regla de Edu: la recta siempre horizontal).
function Termohorizontal() {
    return ((0, jsx_runtime_1.jsx)(ui_1.Figura, { caption: "El term\u00F3metro es una recta horizontal: a la izquierda, bajo cero (azul); a la derecha, sobre cero (rojo).", children: (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 420 120", className: "h-32 w-full max-w-full", role: "img", "aria-label": "Term\u00F3metro horizontal con la escala de menos diez a m\u00E1s diez", children: [(0, jsx_runtime_1.jsx)("rect", { x: "10", y: "46", width: "330", height: "26", rx: "13", fill: "#f1f5f9", stroke: "#64748b", strokeWidth: "2" }), (0, jsx_runtime_1.jsx)("rect", { x: "10", y: "46", width: "165", height: "26", rx: "13", fill: "#dbeafe" }), (0, jsx_runtime_1.jsx)("rect", { x: "175", y: "46", width: "165", height: "26", fill: "#fee2e2" }), (0, jsx_runtime_1.jsx)("rect", { x: "14", y: "50", width: "120", height: "18", rx: "9", fill: "#3b82f6" }), (0, jsx_runtime_1.jsx)("circle", { cx: "352", cy: "59", r: "17", fill: "#3b82f6", stroke: "#1d4ed8", strokeWidth: "2" }), (0, jsx_runtime_1.jsx)("g", { stroke: "#334155", strokeWidth: "1.5", children: [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (0, jsx_runtime_1.jsx)("line", { x1: 20 + i * 40, y1: 40, x2: 20 + i * 40, y2: 46 }, i)) }), (0, jsx_runtime_1.jsx)("g", { fontSize: "11", fill: "#334155", fontFamily: "system-ui", textAnchor: "middle", children: [["−10", 20], ["−5", 100], ["0", 180], ["5", 260], ["10", 330]].map(([t, x], i) => (0, jsx_runtime_1.jsx)("text", { x: x, y: 32, children: t }, i)) }), (0, jsx_runtime_1.jsx)("line", { x1: "180", y1: "38", x2: "180", y2: "98", stroke: "#0f172a", strokeWidth: "2", strokeDasharray: "4 3" }), (0, jsx_runtime_1.jsx)("text", { x: "90", y: "98", fontSize: "11", fill: "#1d4ed8", fontFamily: "system-ui", textAnchor: "middle", children: "bajo cero (\u2212)" }), (0, jsx_runtime_1.jsx)("text", { x: "270", y: "98", fontSize: "11", fill: "#b91c1c", fontFamily: "system-ui", textAnchor: "middle", children: "sobre cero (+)" })] }) }));
}
// Tarjeta de jerarquía de operaciones para teoría (apartado 5).
function Jerarquia() {
    return ((0, jsx_runtime_1.jsx)(ui_1.Figura, { caption: "Orden fijo: lo de arriba se hace primero. Los enteros no cambian la lista, solo el signo de cada t\u00E9rmino.", children: (0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 300 120", className: "h-32 w-auto max-w-full", role: "img", "aria-label": "Tarjeta con los cuatro niveles de la jerarqu\u00EDa de operaciones", children: [["1. Paréntesis ( )", 12, "#6d28d9", "#ede9fe"], ["2. Potencias", 40, "#b45309", "#fef3c7"], ["3. · y :  (izq. → dcha.)", 68, "#0284c7", "#e0f2fe"], ["4. + y −  (izq. → dcha.)", 96, "#16a34a", "#dcfce7"]].map(([t, y, c, f], i) => ((0, jsx_runtime_1.jsxs)("g", { children: [(0, jsx_runtime_1.jsx)("rect", { x: "8", y: y, width: "284", height: "24", rx: "6", fill: f, stroke: c, strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("text", { x: "150", y: y + 16.5, fontSize: "12", fontWeight: "bold", fill: c, fontFamily: "system-ui", textAnchor: "middle", children: t })] }, i))) }) }));
}
// Fases del método de resolución (apartado 6).
function Fases() {
    return ((0, jsx_runtime_1.jsx)(ui_1.Figura, { caption: "El m\u00E9todo en cuatro fases: traducir, esquematizar, escribir la operaci\u00F3n y responder.", children: (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 320 70", className: "h-20 w-full max-w-full", role: "img", "aria-label": "Cuatro fases numeradas con flechas", children: [[["1", "Subraya\ndatos", "#1d4ed8", "#dbeafe"], ["2", "Dibuja\nla recta", "#6d28d9", "#ede9fe"], ["3", "Escribe la\noperación", "#b45309", "#fef3c7"], ["4", "Responde\ncon unidades", "#15803d", "#dcfce7"]].map(([n, t, c, f], i) => ((0, jsx_runtime_1.jsxs)("g", { fontFamily: "system-ui", children: [(0, jsx_runtime_1.jsx)("circle", { cx: 34 + i * 84, cy: 26, r: 22, fill: f, stroke: c, strokeWidth: "2" }), (0, jsx_runtime_1.jsx)("text", { x: 34 + i * 84, y: 31, fontSize: "15", fontWeight: "bold", fill: c, textAnchor: "middle", children: n }), (0, jsx_runtime_1.jsxs)("text", { x: 34 + i * 84, y: 62, fontSize: "9.5", fill: "#334155", textAnchor: "middle", children: [t.split("\n")[0], " ", t.split("\n")[1]] }), i < 3 && (0, jsx_runtime_1.jsx)("path", { d: `M${58 + i * 84} 26 h14`, stroke: "#94a3b8", strokeWidth: "2", markerEnd: "url(#fse)" })] }, i))), (0, jsx_runtime_1.jsx)("defs", { children: (0, jsx_runtime_1.jsx)("marker", { id: "fse", markerWidth: "7", markerHeight: "7", refX: "5", refY: "2.5", orient: "auto", children: (0, jsx_runtime_1.jsx)("path", { d: "M0 0L5 2.5L0 5z", fill: "#94a3b8" }) }) })] }) }));
}
