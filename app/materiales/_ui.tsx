import type { ReactNode } from "react";
import Link from "@/components/Link";

// ════════════════════════════════════════════════════════════════════════════
// Piezas de maquetación de «Materiales de ESO y Bachillerato».
//
// Índices (portada, curso, asignatura) y esquemas de estudio comparten este
// vocabulario. Todo son Componentes de Servidor. Las clases van escritas enteras
// en cada tono: Tailwind lee el código fuente y no ve clases construidas.
// ════════════════════════════════════════════════════════════════════════════

export const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";

const tarjeta =
  "rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5";

/** Tarjeta de índice: enlazada si hay contenido, atenuada si está en preparación. */
export function Tarjeta({
  href,
  marca,
  titulo,
  children,
  extra,
}: {
  href?: string;
  marca: string;
  titulo: string;
  children: ReactNode;
  extra?: string;
}) {
  const cabeza = (activo: boolean) => (
    <div className="flex items-baseline gap-3">
      <span className={activo ? "text-3xl font-extrabold tracking-tight text-blue-700 dark:text-blue-300" : "text-3xl font-extrabold tracking-tight text-zinc-400"}>
        {marca}
      </span>
      <h2 className={activo ? "text-lg font-bold text-zinc-900 dark:text-zinc-100" : "text-lg font-bold text-zinc-500 dark:text-zinc-400"}>
        {titulo}
      </h2>
    </div>
  );
  if (!href) {
    return (
      <div className={`${tarjeta} opacity-60`}>
        {cabeza(false)}
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{children}</p>
        <div className="mt-2 text-xs font-bold uppercase tracking-wide text-zinc-400">En preparación</div>
      </div>
    );
  }
  return (
    <Link
      href={href}
      className={`${tarjeta} group block shadow-sm transition hover:border-blue-300 dark:hover:border-blue-500/40 hover:bg-blue-50/40 dark:hover:bg-blue-500/10`}
    >
      {cabeza(true)}
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{children}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide">
        <span className="text-emerald-700 dark:text-emerald-300">Disponible →</span>
        {extra && <span className="text-zinc-500 dark:text-zinc-400">· {extra}</span>}
      </div>
    </Link>
  );
}

// ── Esquemas de estudio ─────────────────────────────────────────────────────

export type Tono = "sky" | "rose" | "amber" | "emerald" | "teal";

const TONO: Record<Tono, { num: string; borde: string; texto: string }> = {
  sky: { num: "bg-sky-600", borde: "border-sky-500", texto: "text-sky-700 dark:text-sky-300" },
  rose: { num: "bg-rose-600", borde: "border-rose-500", texto: "text-rose-700 dark:text-rose-300" },
  amber: { num: "bg-amber-500", borde: "border-amber-500", texto: "text-amber-700 dark:text-amber-300" },
  emerald: { num: "bg-emerald-600", borde: "border-emerald-500", texto: "text-emerald-700 dark:text-emerald-300" },
  teal: { num: "bg-teal-600", borde: "border-teal-500", texto: "text-teal-700 dark:text-teal-300" },
};

/** Apartado del tema: número, título, página del libro y contenido. */
export function Apartat({
  id,
  num,
  titol,
  pagina,
  tono,
  children,
}: {
  id: string;
  num: string;
  titol: string;
  pagina: string;
  tono: Tono;
  children: ReactNode;
}) {
  const t = TONO[tono];
  return (
    <section id={id} className={`mt-8 scroll-mt-24 rounded-2xl border border-zinc-200 dark:border-white/10 border-l-4 ${t.borde} bg-white dark:bg-slate-900 p-5 sm:p-6`}>
      <header className="flex flex-wrap items-center gap-3">
        <span className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-extrabold text-white ${t.num}`}>{num}</span>
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">{titol}</h3>
        <span className="ml-auto rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          {pagina}
        </span>
      </header>
      {children}
    </section>
  );
}

/** Texto con marcado mínimo: **negrita** y *cursiva*. */
export function R({ s }: { s: string }) {
  return (
    <>
      {s.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((p, i) =>
        p.startsWith("**") ? <b key={i}>{p.slice(2, -2)}</b> : p.startsWith("*") && p.length > 2 ? <i key={i}>{p.slice(1, -1)}</i> : p,
      )}
    </>
  );
}

/** Definición literal del libro (los «quadres morats»): hay que saberla de memoria. */
export function Definicio({ etiqueta, children }: { etiqueta: string; children: ReactNode }) {
  return (
    <div className="mt-4 rounded-xl border-2 border-violet-300 dark:border-violet-500/40 bg-violet-50 dark:bg-violet-500/10 px-4 py-3">
      <div className="text-[11px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">{etiqueta}</div>
      <p className="mt-1 text-[17px] leading-relaxed text-violet-950 dark:text-violet-100">{children}</p>
    </div>
  );
}

/** Lista de ideas clave. */
export function Idees({ children }: { children: ReactNode }) {
  return <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">{children}</ul>;
}

export function Idea({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-zinc-400" />
      <span>{children}</span>
    </li>
  );
}

const NOTA = {
  recorda: { t: "Recorda", c: "border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10", k: "text-sky-700 dark:text-sky-300" },
  sabies: { t: "Sabies que…", c: "border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10", k: "text-amber-700 dark:text-amber-300" },
  mes: { t: "Saber-ne més", c: "border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10", k: "text-emerald-700 dark:text-emerald-300" },
  info: { t: "", c: "border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5", k: "text-zinc-600 dark:text-zinc-300" },
};

/** Caja lateral del libro («Recorda», «Sabies que…», «Saber-ne més») o una propia. */
export function Nota({ tipus, titol, children }: { tipus: keyof typeof NOTA; titol?: string; children: ReactNode }) {
  const n = NOTA[tipus];
  return (
    <div className={`mt-4 rounded-xl border px-4 py-3 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 ${n.c}`}>
      <div className={`text-[11px] font-bold uppercase tracking-wider ${n.k}`}>{titol ?? n.t}</div>
      <div className="mt-1">{children}</div>
    </div>
  );
}

/** Dibujo con pie. El SVG se pinta a tamaño real y desliza en pantallas estrechas. */
export function Figura({ peu, children }: { peu?: ReactNode; children: ReactNode }) {
  return (
    <figure className="mt-4">
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/60 dark:bg-white/5 p-3">{children}</div>
      {peu && <figcaption className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">{peu}</figcaption>}
    </figure>
  );
}
