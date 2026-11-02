// Resaltado mínimo (en compilación) para los bloques de código de las páginas
// del curso: shell, JSON, Markdown con frontmatter, Python y TOML. Devuelve el código limpio
// (lo que se copia) y el HTML de cada línea por separado, que es lo que pinta
// PromptBlock: una línea, un elemento.

export type Kind = "sh" | "json" | "md" | "py" | "toml" | "txt";

const PY_KW = new Set([
  "def", "class", "import", "from", "return", "if", "else", "elif", "for", "in", "while", "with", "as",
  "try", "except", "raise", "not", "and", "or", "is", "pass", "lambda", "yield", "continue", "break",
]);
const PY_LIT = new Set(["None", "True", "False"]);

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
    // Comentarios con # (shell, PowerShell, Python y TOML)
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
    // Opciones de línea de órdenes: --version, -c…
    if (kind === "sh" && c === "-" && /\s/.test(prev) && /[A-Za-z-]/.test(l[i + 1] ?? "")) {
      let j = i;
      while (j < n && /[^\s=]/.test(l[j])) j++;
      out += span("kw", l.slice(i, j));
      i = j;
      continue;
    }
    // Variables: $HOME, $env:CENTRO_IA_KEY
    if (kind === "sh" && c === "$" && /[A-Za-z_]/.test(l[i + 1] ?? "")) {
      let j = i + 1;
      while (j < n && /[\w:]/.test(l[j])) j++;
      out += span("ann", l.slice(i, j));
      i = j;
      continue;
    }
    // Decoradores de Python: @app.command()
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
      while (j < n && /[\w]/.test(l[j])) j++;
      const w = l.slice(i, j);
      if (kind === "py" && PY_KW.has(w)) out += span("ctrl", w);
      else if (kind === "py" && PY_LIT.has(w)) out += span("lit", w);
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

/** Markdown con frontmatter: claves YAML, títulos, `código`, $ARGUMENTS, @fichero y !`orden`. */
function pintarMd(lineas: string[]): string[] {
  let enFront = false;
  return lineas.map((l, idx) => {
    if (l.trim() === "---") {
      if (idx === 0) enFront = true;
      else if (enFront) enFront = false;
      return span("com", l);
    }
    if (enFront) {
      const m = l.match(/^(\s*)("?[^":]+"?)(:)(.*)$/);
      if (!m) return esc(l);
      const valor = m[4];
      const v = /^\s*(allow|ask|deny|true|false|subagent|primary|build|plan)\s*$/.test(valor)
        ? span("lit", valor)
        : /^\s*[\d.]+\s*$/.test(valor)
          ? span("num", valor)
          : esc(valor);
      return esc(m[1]) + span(m[2].startsWith('"') ? "str" : "kw", m[2]) + esc(m[3]) + v;
    }
    if (/^#{1,6}\s/.test(l)) return span("type", l);
    let out = "";
    let i = 0;
    while (i < l.length) {
      const c = l[i];
      if (c === "!" && l[i + 1] === "`") {
        const j = l.indexOf("`", i + 2);
        const fin = j === -1 ? l.length : j + 1;
        out += span("fn", l.slice(i, fin));
        i = fin;
        continue;
      }
      if (c === "`") {
        const j = l.indexOf("`", i + 1);
        const fin = j === -1 ? l.length : j + 1;
        out += span("str", l.slice(i, fin));
        i = fin;
        continue;
      }
      if ((c === "$" || c === "@") && /[\w]/.test(l[i + 1] ?? "")) {
        let j = i + 1;
        while (j < l.length && /[\w./-]/.test(l[j])) j++;
        out += span("ann", l.slice(i, j));
        i = j;
        continue;
      }
      if (i === 0 && /^(\s*)(-|\d+\.)\s/.test(l)) {
        const m = l.match(/^(\s*)(-|\d+\.)/)!;
        out += esc(m[1]) + span("kw", m[2]);
        i = m[0].length;
        continue;
      }
      out += esc(c);
      i++;
    }
    return out;
  });
}

export function pintar(raw: string, kind: Kind) {
  const code = raw.replace(/^\n+/, "").replace(/\s+$/, "");
  const crudas = code.split("\n");
  const lines = kind === "md" ? pintarMd(crudas) : crudas.map((l) => pintarLinea(l, kind));
  return { code, lines };
}
