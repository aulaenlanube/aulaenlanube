// Resaltado de sintaxis en tiempo de compilación (sin dependencias ni JS en el
// cliente): tokeniza el código y envuelve cada token en un <span class="tok-…">
// con colores semánticos (paleta tipo VS Code Dark+). La salida va escapada para
// HTML y troceada por líneas, de modo que la plantilla pueda pintar una columna
// de numeración alineada y un botón de copiar fiable.
//
// Está afinado para Java —el lenguaje de la zona de programación— y degrada con
// elegancia para otros lenguajes de la familia C (las palabras desconocidas
// quedan en texto normal).

// Palabras clave de control de flujo (morado): expresan "qué hace" el programa.
const CONTROL = new Set([
  "if", "else", "for", "while", "do", "switch", "case", "default", "break",
  "continue", "return", "try", "catch", "finally", "throw", "throws", "new",
  "instanceof", "assert", "yield",
]);
// Palabras clave de declaración/modificador (azul): expresan "de qué tipo es".
const KEYWORD = new Set([
  "abstract", "boolean", "byte", "char", "class", "const", "double", "enum",
  "extends", "final", "float", "goto", "implements", "import", "int",
  "interface", "long", "native", "package", "private", "protected", "public",
  "record", "sealed", "permits", "short", "static", "strictfp", "super",
  "synchronized", "this", "transient", "var", "void", "volatile",
]);
const LITERAL = new Set(["true", "false", "null"]);

type Tok = { cls: string; text: string };

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const isIdStart = (c: string) => /[A-Za-z_$]/.test(c);
const isIdPart = (c: string) => /[A-Za-z0-9_$]/.test(c);
const isDigit = (c: string) => c >= "0" && c <= "9";

function tokenize(code: string): Tok[] {
  const toks: Tok[] = [];
  const n = code.length;
  let i = 0;
  let plain = "";
  const flush = () => {
    if (plain) {
      toks.push({ cls: "", text: plain });
      plain = "";
    }
  };
  const push = (cls: string, text: string) => {
    flush();
    toks.push({ cls, text });
  };

  while (i < n) {
    const c = code[i];
    const d = code[i + 1];

    // Comentario de línea //…
    if (c === "/" && d === "/") {
      let j = i + 2;
      while (j < n && code[j] !== "\n") j++;
      push("tok-com", code.slice(i, j));
      i = j;
      continue;
    }
    // Comentario de bloque /* … */ (puede abarcar varias líneas)
    if (c === "/" && d === "*") {
      let j = i + 2;
      while (j < n && !(code[j] === "*" && code[j + 1] === "/")) j++;
      j = Math.min(n, j + 2);
      push("tok-com", code.slice(i, j));
      i = j;
      continue;
    }
    // Cadena "…" o carácter '…' (con escapes \")
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < n && code[j] !== "\n") {
        if (code[j] === "\\") {
          j += 2;
          continue;
        }
        if (code[j] === c) {
          j++;
          break;
        }
        j++;
      }
      push("tok-str", code.slice(i, j));
      i = j;
      continue;
    }
    // Número (entero, hex, decimal, con sufijo)
    if (isDigit(c) || (c === "." && isDigit(d))) {
      let j = i;
      if (c === "0" && (d === "x" || d === "X")) {
        j += 2;
        while (j < n && /[0-9a-fA-F_]/.test(code[j])) j++;
      } else {
        while (j < n && /[0-9_]/.test(code[j])) j++;
        if (code[j] === "." && isDigit(code[j + 1])) {
          j++;
          while (j < n && /[0-9_]/.test(code[j])) j++;
        }
        if (/[eE]/.test(code[j] || "") && /[0-9+\-]/.test(code[j + 1] || "")) {
          j++;
          if (/[+\-]/.test(code[j])) j++;
          while (j < n && isDigit(code[j])) j++;
        }
      }
      while (j < n && /[lLfFdD]/.test(code[j])) j++;
      push("tok-num", code.slice(i, j));
      i = j;
      continue;
    }
    // Anotación @Override
    if (c === "@" && isIdStart(code[i + 1] || "")) {
      let j = i + 1;
      while (j < n && isIdPart(code[j])) j++;
      push("tok-ann", code.slice(i, j));
      i = j;
      continue;
    }
    // Identificador / palabra clave / tipo / llamada a método
    if (isIdStart(c)) {
      let j = i + 1;
      while (j < n && isIdPart(code[j])) j++;
      const word = code.slice(i, j);
      let k = j;
      while (k < n && (code[k] === " " || code[k] === "\t")) k++;
      let cls = "";
      if (CONTROL.has(word)) cls = "tok-ctrl";
      else if (KEYWORD.has(word)) cls = "tok-kw";
      else if (LITERAL.has(word)) cls = "tok-lit";
      else if (code[k] === "(") cls = "tok-fn";
      // Mayúscula inicial → tipo (System, String…), pero no una sola letra
      // (p.ej. `N` es una variable, no un tipo).
      else if (word.length > 1 && /^[A-Z]/.test(word)) cls = "tok-type";
      push(cls, word);
      i = j;
      continue;
    }
    // Resto (operadores, signos de puntuación, espacios): texto normal
    plain += c;
    i++;
  }
  flush();
  return toks;
}

// Reparte los tokens en líneas de HTML ya pintado. Los tokens que abarcan varias
// líneas (p.ej. comentarios de bloque) se cierran y reabren en cada salto, así
// cada línea es HTML válido por sí sola y la numeración encaja perfecta.
function toLines(toks: Tok[]): string[] {
  const lines: string[] = [];
  let cur = "";
  for (const t of toks) {
    const segs = t.text.split("\n");
    for (let s = 0; s < segs.length; s++) {
      if (s > 0) {
        lines.push(cur);
        cur = "";
      }
      const seg = segs[s];
      if (seg === "") continue;
      cur += t.cls ? `<span class="${t.cls}">${esc(seg)}</span>` : esc(seg);
    }
  }
  lines.push(cur);
  return lines;
}

// Quita la indentación común al bloque (el original a veces sangra todo el
// método salvo el comentario de autoría), para que el código quede pegado al
// margen izquierdo. Se ignora la sangría de las líneas que son solo comentario
// "//" (a menudo están a la izquierda del cuerpo y falsearían el mínimo), y el
// recorte se limita a la sangría propia de cada línea (no corta contenido).
function dedent(s: string): string {
  const rows = s.split("\n");
  let min = Infinity;
  for (const r of rows) {
    if (!r.trim()) continue;
    if (/^[ \t]*\/\//.test(r)) continue;
    const lead = (r.match(/^[ \t]*/) || [""])[0].length;
    if (lead < min) min = lead;
  }
  if (!Number.isFinite(min) || min === 0) return s;
  const cut = new RegExp(`^[ \\t]{0,${min}}`);
  return rows.map((r) => r.replace(cut, "")).join("\n");
}

export interface Highlighted {
  code: string; // código limpio (lo que copia el botón "Copiar")
  lines: string[]; // HTML pintado, una entrada por línea
}

export function highlightCode(raw: string, _lang = "java"): Highlighted {
  // El crawl de WordPress trae a veces espacios duros (U+00A0): se normalizan a
  // espacios normales para que la sangría sea uniforme y el código copiado
  // compile al pegarlo.
  const norm = (raw || "").replace(/ /g, " ");
  const code = dedent(norm.replace(/^\n+/, "").replace(/[ \t\n]+$/g, ""));
  return { code, lines: toLines(tokenize(code)) };
}
