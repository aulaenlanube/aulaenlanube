import type { ReactNode } from "react";

// Piezas compartidas por las páginas de ejercicios de Adaptaciones PTE.
// Solo reutilizan las clases visuales ya presentes en el blog (tarjetas
// sky/indigo, chips de nivel, detalles <details> nativos) — sin CSS nuevo.

export const chip =
  "inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700";

const nivel =
  "inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider";

export const n2 = nivel + " border-violet-300 bg-violet-50 text-violet-700";
export const n1 = nivel + " border-sky-300 bg-sky-50 text-sky-700";
export const n6 = nivel + " border-emerald-300 bg-emerald-50 text-emerald-700";
export const n5 = nivel + " border-amber-300 bg-amber-50 text-amber-700";

export const tarjeta =
  "mt-8 scroll-mt-24 rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 p-5 shadow-sm sm:p-7";

const sol =
  "mt-3 rounded-xl border border-emerald-200 bg-white p-4 text-sm text-zinc-700";
const ad =
  "mt-2 rounded-xl border border-zinc-200 bg-white/70 p-4 text-[13px] text-zinc-600";

export const sub = "text-sm font-bold uppercase tracking-wide text-zinc-500";

export function Figura({ children, caption }: { children: ReactNode; caption?: ReactNode }) {
  return (
    <figure className="mt-6 flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      {children}
      {caption ? <figcaption className="mt-2 text-center text-xs text-zinc-500">{caption}</figcaption> : null}
    </figure>
  );
}

function Lineas({ partes, className }: { partes: ReactNode[]; className?: string }) {
  return (
    <div className={"space-y-1 " + (className || "")}>
      {partes.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

// Enunciado: intro opcional + UN APTADO POR LÍNEA (a, b, c, d…)
export function Enunciado({ intro, partes }: { intro?: ReactNode; partes: ReactNode[] }) {
  return (
    <div className="mt-2">
      {intro ? <p className="text-[15px] text-zinc-800">{intro}</p> : null}
      <Lineas partes={partes} className="mt-1 text-[15px] text-zinc-800" />
    </div>
  );
}

export function Solucion({ partes }: { partes: ReactNode[] }) {
  return (
    <details className={sol}>
      <summary className="cursor-pointer select-none font-bold text-emerald-700">Ver solución</summary>
      <Lineas partes={partes} className="mt-2" />
    </details>
  );
}

export function Adaptacion({ children }: { children: ReactNode }) {
  return (
    <div className={ad}>
      <span className={sub}>🔧 Qué se adapta:</span> {children}
    </div>
  );
}

export function Nivel({
  cls,
  label,
  intro,
  partes,
  solucion,
  adaptacion,
}: {
  cls: string;
  label: string;
  intro?: ReactNode;
  partes: ReactNode[];
  solucion: ReactNode[];
  adaptacion?: ReactNode;
}) {
  return (
    <div className="mt-6">
      <span className={cls}>{label}</span>
      <Enunciado intro={intro} partes={partes} />
      {adaptacion ? <Adaptacion>{adaptacion}</Adaptacion> : null}
      <Solucion partes={solucion} />
    </div>
  );
}
