// Resaltado mínimo (en compilación) para la portada del proyecto 2: shell,
// Python, JSON y TOML. El de _video/resaltado.ts no trae Python ni TOML; este
// es el que ya usaba la página, sacado a su módulo.

export type Kind = "sh" | "py" | "json" | "toml" | "txt";

const PY_KW = new Set([
  "def", "import", "from", "return", "if", "else", "elif", "for", "in", "class", "with",
  "as", "try", "except", "raise", "not", "and", "or", "None", "True", "False", "pass",
]);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const span = (c: string, t: string) => `<span class="tok-${c}">${esc(t)}</span>`;

function pintarLinea(l: string, kind: Kind): string {
  if (kind === "txt") return esc(l);
  let out = "";
  let i = 0;
  const n = l.length;
  while (i < n) {
    const c = l[i];
    const prev = i === 0 ? " " : l[i - 1];
    // Comentarios con # (shell, PowerShell, Python, TOML)
    if (c === "#" && kind !== "json" && /\s/.test(prev)) {
      out += span("com", l.slice(i));
      break;
    }
    // Cadenas
    if (c === '"' || (c === "'" && kind !== "json")) {
      let j = i + 1;
      while (j < n && l[j] !== c) {
        if (l[j] === "\\") j++;
        j++;
      }
      out += span("str", l.slice(i, j + 1));
      i = j + 1;
      continue;
    }
    // Opciones de línea de órdenes: --simular, -n, -ExecutionPolicy…
    if (kind === "sh" && c === "-" && /\s/.test(prev) && /[A-Za-z-]/.test(l[i + 1] ?? "")) {
      let j = i;
      while (j < n && /[^\s=]/.test(l[j])) j++;
      out += span("kw", l.slice(i, j));
      i = j;
      continue;
    }
    // Decoradores de Python
    if (kind === "py" && c === "@") {
      let j = i + 1;
      while (j < n && /[\w.]/.test(l[j])) j++;
      out += span("ann", l.slice(i, j));
      i = j;
      continue;
    }
    // Tablas de TOML: [project.scripts]
    if (kind === "toml" && c === "[" && i === 0) {
      out += span("type", l);
      break;
    }
    // Palabras
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < n && /\w/.test(l[j])) j++;
      const w = l.slice(i, j);
      if (kind === "py" && PY_KW.has(w)) out += span("ctrl", w);
      else if (kind === "sh" && out.replace(/<[^>]+>/g, "").trim() === "") out += span("fn", w);
      else if (kind === "json" && (w === "true" || w === "false" || w === "null")) out += span("lit", w);
      else out += esc(w);
      i = j;
      continue;
    }
    // Números
    if (/\d/.test(c) && kind !== "sh") {
      let j = i;
      while (j < n && /[\d.]/.test(l[j])) j++;
      out += span("num", l.slice(i, j));
      i = j;
      continue;
    }
    out += esc(c);
    i++;
  }
  return out;
}

export function pintar(raw: string, kind: Kind) {
  const code = raw.replace(/^\n+/, "").replace(/\s+$/, "");
  return { code, lines: code.split("\n").map((l) => pintarLinea(l, kind)) };
}
