import katex from "katex";

// Renderiza $…$ como LaTeX (KaTeX, servidor) y **…** como negrita.
// El texto se escapa: solo generan HTML los marcadores ** y $.
function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function mdTex(src: string): string {
  const partes = src.split("$");
  let out = "";
  for (let i = 0; i < partes.length; i++) {
    if (i % 2 === 0) {
      const bolds = partes[i].split("**");
      out += bolds.map((b, j) => (j % 2 ? `<b>${esc(b)}</b>` : esc(b))).join("");
    } else {
      out += katex.renderToString(partes[i], { throwOnError: false });
    }
  }
  return out;
}

// Igual pero SIN escapar: para tablas RAW escritas por nosotros (de confianza).
export function texRaw(src: string): string {
  const partes = src.split("$");
  let out = "";
  for (let i = 0; i < partes.length; i++) {
    out += i % 2 === 0 ? partes[i] : katex.renderToString(partes[i], { throwOnError: false });
  }
  return out;
}
