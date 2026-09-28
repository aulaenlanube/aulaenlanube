"use client";

// Rúbrica interactiva (profesor: clic en el nivel de cada criterio) o de
// lectura (alumno: ve su nivel resaltado y, atenuados, los demás, para saber
// qué le falta para subir).

import { calcularNota, formatoNota, type Minimos, type Rubrica, type Valoraciones } from "@/lib/campus/rubricas";
import { cls } from "./ui";

const TONO_NIVEL = [
  { borde: "border-red-300 dark:border-red-500/50", anillo: "ring-red-300 dark:ring-red-500/50", fondo: "bg-red-50 dark:bg-red-500/15", texto: "text-red-700 dark:text-red-300" },
  { borde: "border-amber-300 dark:border-amber-500/50", anillo: "ring-amber-300 dark:ring-amber-500/50", fondo: "bg-amber-50 dark:bg-amber-500/15", texto: "text-amber-800 dark:text-amber-300" },
  { borde: "border-blue-300 dark:border-blue-500/50", anillo: "ring-blue-300 dark:ring-blue-500/50", fondo: "bg-blue-50 dark:bg-blue-500/15", texto: "text-blue-700 dark:text-blue-300" },
  { borde: "border-emerald-300 dark:border-emerald-500/50", anillo: "ring-emerald-300 dark:ring-emerald-500/50", fondo: "bg-emerald-50 dark:bg-emerald-500/15", texto: "text-emerald-700 dark:text-emerald-300" },
];

export function NotaGrande({ rubrica, valoraciones, minimos }: { rubrica: Rubrica; valoraciones: Valoraciones; minimos: Minimos }) {
  const r = calcularNota(rubrica, valoraciones, minimos);
  const color = r.noEvaluable ? "text-red-700 dark:text-red-300" : r.puntuacion !== null && r.puntuacion >= 5 ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300";
  return (
    <div className="flex items-baseline gap-3">
      <span className={`text-4xl font-extrabold tracking-tight ${color}`}>
        {r.noEvaluable ? "NE" : formatoNota(r.puntuacion)}
      </span>
      <span className={`text-sm ${cls.tenue}`}>
        {r.noEvaluable
          ? `no evaluable · rúbrica: ${formatoNota(r.puntuacion)}`
          : r.puntuacion === null
            ? `faltan ${r.pendientes.length} criterios por valorar`
            : "sobre 10"}
      </span>
    </div>
  );
}

type Props = {
  rubrica: Rubrica;
  valoraciones: Valoraciones;
  minimos: Minimos;
  editable?: boolean;
  onValoraciones?: (v: Valoraciones) => void;
  onMinimos?: (m: Minimos) => void;
};

export default function RubricaVista({ rubrica, valoraciones, minimos, editable = false, onValoraciones, onMinimos }: Props) {
  const elegir = (id: string, n: number) => onValoraciones?.({ ...valoraciones, [id]: { ...valoraciones[id], n } });
  const comentar = (id: string, c: string) => {
    const previa = valoraciones[id];
    if (!previa) return;
    onValoraciones?.({ ...valoraciones, [id]: { ...previa, c } });
  };

  return (
    <div className="space-y-5">
      {/* Requisitos mínimos: la puerta de entrada */}
      <div className="rounded-2xl border border-red-200 bg-red-50/60 p-4 dark:border-red-500/30 dark:bg-red-500/10">
        <h3 className="text-[15px] font-bold text-red-900 dark:text-red-200">Requisitos mínimos (sin ellos, el proyecto no se evalúa)</h3>
        <ul className="mt-2 space-y-2">
          {rubrica.minimos.map((m) => {
            const ok = minimos[m.id] === true;
            return (
              <li key={m.id} className="text-sm">
                {editable ? (
                  <label className="flex cursor-pointer items-start gap-2 text-zinc-800 dark:text-zinc-200">
                    <input
                      type="checkbox"
                      checked={ok}
                      onChange={(e) => onMinimos?.({ ...minimos, [m.id]: e.target.checked })}
                      className="mt-0.5 h-4 w-4 flex-none accent-emerald-600"
                    />
                    <span>{m.texto}</span>
                  </label>
                ) : (
                  <span className="flex items-start gap-2 text-zinc-800 dark:text-zinc-200">
                    <span aria-hidden className={`flex-none font-bold ${ok ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                      {ok ? "✓" : "✗"}
                    </span>
                    <span>
                      <span className="sr-only">{ok ? "Cumplido: " : "No cumplido: "}</span>
                      {m.texto}
                    </span>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {rubrica.criterios.map((c) => {
        const v = valoraciones[c.id];
        return (
          <section key={c.id} className="rounded-2xl border border-zinc-200 p-4 dark:border-white/10">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[15px] font-bold">
                {c.nombre}
                <span className="ml-2 rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-600 dark:bg-white/10 dark:text-zinc-300">{c.peso} pts</span>
              </h3>
              {v && (
                <span className={`text-xs font-bold uppercase tracking-wider ${TONO_NIVEL[v.n]?.texto ?? ""}`}>
                  {rubrica.niveles[v.n]?.nombre} · {Math.round((c.peso * (rubrica.niveles[v.n]?.pct ?? 0)) / 10) / 10} pts
                </span>
              )}
            </div>
            <p className={`mt-0.5 text-xs ${cls.tenue}`}>{c.qué}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4" role={editable ? "radiogroup" : undefined} aria-label={editable ? c.nombre : undefined}>
              {c.niveles.map((desc, i) => {
                const sel = v?.n === i;
                const t = TONO_NIVEL[i];
                const base = `rounded-xl border p-3 text-left text-[13px] leading-snug transition`;
                const estilo = sel
                  ? `${t.borde} ${t.fondo} ${t.anillo} ring-2`
                  : v && !editable
                    ? "border-zinc-200 opacity-55 dark:border-white/10"
                    : "border-zinc-200 dark:border-white/10";
                const cuerpo = (
                  <>
                    <span className={`mb-1 block text-[11px] font-bold uppercase tracking-wider ${t.texto}`}>
                      {sel && <span aria-hidden>✓ </span>}
                      {rubrica.niveles[i].nombre} · {rubrica.niveles[i].pct}%
                    </span>
                    <span className="text-zinc-700 dark:text-zinc-300">{desc}</span>
                  </>
                );
                return editable ? (
                  <button
                    key={i}
                    type="button"
                    role="radio"
                    aria-checked={sel}
                    onClick={() => elegir(c.id, i)}
                    className={`${base} ${estilo} hover:border-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:hover:border-white/30`}
                  >
                    {cuerpo}
                  </button>
                ) : (
                  <div key={i} className={`${base} ${estilo}`} aria-current={sel ? "true" : undefined}>
                    {cuerpo}
                  </div>
                );
              })}
            </div>
            {editable ? (
              <textarea
                value={v?.c ?? ""}
                onChange={(e) => comentar(c.id, e.target.value)}
                disabled={!v}
                placeholder={v ? "Comentario para el alumno sobre este criterio (opcional)" : "Elige primero un nivel"}
                rows={2}
                className={`${cls.input} mt-3 text-sm disabled:opacity-50`}
              />
            ) : (
              v?.c && (
                <p className="mt-3 rounded-xl bg-zinc-50 px-3 py-2 text-sm text-zinc-700 dark:bg-white/5 dark:text-zinc-300">
                  <b>Comentario:</b> {v.c}
                </p>
              )
            )}
          </section>
        );
      })}
    </div>
  );
}
