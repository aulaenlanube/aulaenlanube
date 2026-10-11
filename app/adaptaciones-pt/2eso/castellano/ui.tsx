import type { ReactNode } from "react";
import { md } from "./texto";

// Piezas visuales compartidas por las páginas de Castellano · Adaptaciones PT.
// Mismo lenguaje que las de matemáticas (tarjetas sky/indigo, chips de nivel,
// <details> nativos): sin CSS nuevo, solo clases ya presentes en el blog.

export const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";

const nivel =
  "inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider";

// Orden de los cinco niveles: 2.º ESO (base) → 1.º ESO → 6.º → 5.º → 4.º.
// Los cuatro primeros colores son los mismos que usa matemáticas para esos
// mismos cursos, para que un nivel se reconozca igual en las dos materias.
export const n2 = nivel + " border-violet-300 dark:border-violet-500/40 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300";
export const n1 = nivel + " border-sky-300 dark:border-sky-500/40 bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300";
export const n6 = nivel + " border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
export const n5 = nivel + " border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300";
export const n4 = nivel + " border-rose-300 dark:border-rose-500/40 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300";

export const NIVEL_CLS = [n2, n1, n6, n5, n4];

export const tarjeta =
  "mt-8 scroll-mt-24 rounded-2xl border border-sky-200 dark:border-sky-500/30 bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 dark:from-sky-500/10 dark:via-blue-500/10 dark:to-indigo-500/10 p-5 shadow-sm sm:p-7";

export const sub = "text-sm font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400";

// Marco de figura. El diagrama va en un carril con scroll horizontal: los SVG
// llevan min-w, así que en un móvil estrecho el dibujo se desliza en vez de
// encoger — el texto de dentro nunca baja de un tamaño legible en clase.
// Las figuras son láminas de ficha: dibujan tinta oscura sobre papel y, además,
// se serializan tal cual para el PDF (ver exportar.ts), así que sus colores van
// literales y no pueden depender del tema. Por eso la lámina conserva el papel
// blanco también en oscuro; `aeln-lamina` solo le baja un poco el brillo para
// que no deslumbre (app/globals.css).
export function Figura({ children, caption }: { children: ReactNode; caption?: ReactNode }) {
  return (
    <figure className="aeln-lamina mt-6 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white p-5 shadow-sm">
      <div className="w-full overflow-x-auto">{children}</div>
      {caption ? <figcaption className="mt-2 text-center text-xs text-zinc-500">{caption}</figcaption> : null}
    </figure>
  );
}

// Cabecera de sección dentro de un bloque (Ejemplos / Actividades).
export function SeccionTitulo({ emoji, titulo, subtitulo }: { emoji: string; titulo: string; subtitulo?: string }) {
  return (
    <div className="mt-10">
      <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
        {emoji} {titulo}
      </h2>
      {subtitulo ? <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{subtitulo}</p> : null}
    </div>
  );
}

// Espacio de escritura: N renglones vacíos separados 48 px (suficiente para
// escribir a mano, criterio de la adaptación del bloque 8 de valenciano). En
// el PDF salen como [[fill:N]] (ver exportar.ts); aquí se dibujan punteados.
export function Renglones({ n = 3 }: { n?: number }) {
  return (
    <div className="mt-1 mb-2" aria-hidden={true}>
      {Array.from({ length: Math.max(1, Math.min(14, n)) }).map((_, i) => (
        <div key={i} className="h-12 border-b border-dashed border-zinc-400 dark:border-zinc-500" />
      ))}
    </div>
  );
}

// Ítem de `p` que puede contener (o ser por completo) el marcador «[[espai:N]]»:
// el texto se dibuja como párrafo y los renglones salen en su sitio. Para una
// fila de lista («li») pasa `as="li"` (vista completa).
const ESPAI_RE = /\[\[espai:(\d+)\]\]/g;
export function Part({ s, as = "p" }: { s: string; as?: "p" | "li" }) {
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const push = (txt: string, k: string) => {
    if (!txt.trim()) return;
    const html = { __html: md(txt) };
    out.push(as === "li" ? <li key={k} dangerouslySetInnerHTML={html} /> : <p key={k} dangerouslySetInnerHTML={html} />);
  };
  while ((m = ESPAI_RE.exec(s))) {
    push(s.slice(last, m.index), "t" + last);
    out.push(<Renglones key={"f" + m.index} n={Number(m[1])} />);
    last = m.index + m[0].length;
  }
  push(s.slice(last), "te");
  return <>{out}</>;
}
