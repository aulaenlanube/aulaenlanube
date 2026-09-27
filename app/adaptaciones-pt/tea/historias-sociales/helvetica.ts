// Métricas reales de Helvetica y Helvetica-Bold (Adobe AFM, 1/1000 em): las
// mismas tablas que usa el motor opos-pdf.js. La maqueta parte las líneas con
// ellas, así que el PDF (Helvetica estándar) y la vista web (SVG en Helvetica /
// Arial / Liberation Sans, fuentes con las mismas métricas) cortan igual.

const REG: Record<string, number> = {
  " ": 278, "!": 278, '"': 355, "#": 556, $: 556, "%": 889, "&": 667, "'": 191,
  "(": 333, ")": 333, "*": 389, "+": 584, ",": 278, "-": 333, ".": 278, "/": 278,
  "0": 556, "1": 556, "2": 556, "3": 556, "4": 556, "5": 556, "6": 556, "7": 556, "8": 556, "9": 556,
  ":": 278, ";": 278, "<": 584, "=": 584, ">": 584, "?": 556, "@": 1015,
  A: 667, B: 667, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278,
  J: 500, K: 667, L: 556, M: 833, N: 722, O: 778, P: 667, Q: 778, R: 722,
  S: 667, T: 611, U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611,
  "[": 278, "]": 278, _: 556, "`": 222,
  a: 556, b: 556, c: 500, d: 556, e: 556, f: 278, g: 556, h: 556, i: 222,
  j: 222, k: 500, l: 222, m: 833, n: 556, o: 556, p: 556, q: 556, r: 333,
  s: 500, t: 278, u: 556, v: 500, w: 722, x: 500, y: 500, z: 500,
  "«": 556, "»": 556, "¿": 611, "¡": 333, "·": 278, "…": 1000, "–": 556, "—": 1000,
};

const BLD: Record<string, number> = {
  " ": 278, "!": 333, '"': 474, "#": 556, $: 556, "%": 889, "&": 722, "'": 238,
  "(": 333, ")": 333, "*": 389, "+": 584, ",": 278, "-": 333, ".": 278, "/": 278,
  "0": 556, "1": 556, "2": 556, "3": 556, "4": 556, "5": 556, "6": 556, "7": 556, "8": 556, "9": 556,
  ":": 333, ";": 333, "<": 584, "=": 584, ">": 584, "?": 611, "@": 975,
  A: 722, B: 722, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278,
  J: 556, K: 722, L: 611, M: 833, N: 722, O: 778, P: 667, Q: 778, R: 722,
  S: 667, T: 611, U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611,
  "[": 333, "]": 333, _: 556, "`": 278,
  a: 556, b: 611, c: 556, d: 611, e: 556, f: 333, g: 611, h: 611, i: 278,
  j: 278, k: 556, l: 278, m: 889, n: 611, o: 611, p: 611, q: 611, r: 389,
  s: 556, t: 333, u: 611, v: 556, w: 778, x: 556, y: 556, z: 500,
  "«": 556, "»": 556, "¿": 611, "¡": 333, "·": 278, "…": 1000, "–": 556, "—": 1000,
};

// Vocales acentuadas, ñ, ç, ü…: la tilde no ensancha la letra, mide lo que su base.
const base = (c: string) => c.normalize("NFD")[0];

export function ancho(texto: string, size: number, bold = false): number {
  const t = bold ? BLD : REG;
  let u = 0;
  for (const c of texto) u += t[c] ?? t[base(c)] ?? (bold ? 600 : 556);
  return (u * size) / 1000;
}

// Reparto voraz por palabras en líneas de ancho máximo `max`.
export function partir(texto: string, size: number, bold: boolean, max: number): string[] {
  const out: string[] = [];
  let cur = "";
  for (const w of texto.split(/\s+/).filter(Boolean)) {
    const prueba = cur ? `${cur} ${w}` : w;
    if (!cur || ancho(prueba, size, bold) <= max) cur = prueba;
    else {
      out.push(cur);
      cur = w;
    }
  }
  if (cur) out.push(cur);
  return out;
}
