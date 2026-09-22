// Renderizador de texto de los materiales de Castellano. El contenido se
// escapa siempre: solo generan HTML los marcadores **negrita**, *cursiva* y
// `código` (en matemáticas el equivalente es tex.tsx, que además pasa KaTeX;
// aquí no hay fórmulas, así que el renderizador es puramente tipográfico).

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const COD = "rounded bg-zinc-100 dark:bg-white/10 px-1 py-0.5 font-mono text-[0.92em] text-zinc-800 dark:text-zinc-200";

// Marcadores en línea. El orden importa: ** antes que * para que la negrita
// no se coma la cursiva.
function marcas(s: string) {
  return s
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/\*([^*]+)\*/g, "<i>$1</i>")
    .replace(/`([^`]+)`/g, `<code class="${COD}">$1</code>`);
}

export function md(src: string): string {
  return marcas(esc(src));
}

// Igual pero SIN escapar: para los bloques RAW: de la teoría (tablas HTML
// escritas por nosotros, de confianza).
export function mdRaw(src: string): string {
  return marcas(src);
}
