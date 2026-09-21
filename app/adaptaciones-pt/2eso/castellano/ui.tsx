import type { ReactNode } from "react";

// Piezas visuales compartidas por las páginas de Castellano · Adaptaciones PT.
// Mismo lenguaje que las de matemáticas (tarjetas sky/indigo, chips de nivel,
// <details> nativos): sin CSS nuevo, solo clases ya presentes en el blog.

export const chip =
  "inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700";

const nivel =
  "inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider";

// Orden de los cuatro niveles: 1.º ESO (referencia) → 6.º → 5.º → 4.º primaria.
export const n1 = nivel + " border-violet-300 bg-violet-50 text-violet-700";
export const n6 = nivel + " border-sky-300 bg-sky-50 text-sky-700";
export const n5 = nivel + " border-emerald-300 bg-emerald-50 text-emerald-700";
export const n4 = nivel + " border-amber-300 bg-amber-50 text-amber-700";

export const NIVEL_CLS = [n1, n6, n5, n4];

export const tarjeta =
  "mt-8 scroll-mt-24 rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 p-5 shadow-sm sm:p-7";

export const sub = "text-sm font-bold uppercase tracking-wide text-zinc-500";

// Marco de figura. El diagrama va en un carril con scroll horizontal: los SVG
// llevan min-w, así que en un móvil estrecho el dibujo se desliza en vez de
// encoger — el texto de dentro nunca baja de un tamaño legible en clase.
export function Figura({ children, caption }: { children: ReactNode; caption?: ReactNode }) {
  return (
    <figure className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="w-full overflow-x-auto">{children}</div>
      {caption ? <figcaption className="mt-2 text-center text-xs text-zinc-500">{caption}</figcaption> : null}
    </figure>
  );
}

// Cabecera de sección dentro de un bloque (Ejemplos / Actividades).
export function SeccionTitulo({ emoji, titulo, subtitulo }: { emoji: string; titulo: string; subtitulo?: string }) {
  return (
    <div className="mt-10">
      <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
        {emoji} {titulo}
      </h2>
      {subtitulo ? <p className="mt-1 text-sm text-zinc-500">{subtitulo}</p> : null}
    </div>
  );
}
