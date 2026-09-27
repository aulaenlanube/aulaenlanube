"use client";

// Vista de una historia social: elección de versión (chico/chica), descarga del
// PDF, miniaturas de todas las hojas y lector a pantalla completa (para leerla
// con el alumno en una tableta o proyectada). Las hojas salen de maquetar(),
// igual que el PDF, así que lo que se ve es lo que se imprime.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { maquetar } from "./maqueta";
import { HojaSvg } from "./hoja";
import type { Genero, Historia } from "./tipos";

const chipCls = (sel: boolean) =>
  sel
    ? "rounded-full border border-blue-500 bg-blue-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm transition"
    : "rounded-full border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-3.5 py-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300 transition hover:border-blue-300 dark:hover:border-blue-500/40 hover:bg-blue-50 dark:hover:bg-blue-500/10";

export default function Visor({ historia }: { historia: Historia }) {
  const [genero, setGenero] = useState<Genero>("o");
  const [conTarjetas, setConTarjetas] = useState(true);
  const [estado, setEstado] = useState<"idle" | "gen" | "ok" | "err">("idle");
  const [lector, setLector] = useState<number | null>(null);

  // En pantalla siempre se enseña el anexo de tarjetas (marcado como opcional).
  const hojas = useMemo(() => maquetar(historia, genero, true), [historia, genero]);
  const nAnexo = historia.tarjetas.length ? 1 : 0;
  const nHistoria = hojas.length - nAnexo;
  const nPdf = conTarjetas ? hojas.length : nHistoria;

  const descargarPdf = async () => {
    setEstado("gen");
    try {
      const { generarPdf, descargar } = await import("./pdf");
      const blob = await generarPdf(maquetar(historia, genero, conTarjetas), {
        titulo: `${historia.titulo} · Historia social`,
        asunto: `Historia social con pictogramas ARASAAC (${genero === "a" ? "versión chica" : "versión chico"})`,
      });
      descargar(blob, `historia-social-${historia.slug}-${genero === "a" ? "chica" : "chico"}.pdf`);
      setEstado("ok");
    } catch {
      setEstado("err");
    }
  };

  return (
    <>
      <div className="no-print mt-6 flex flex-col gap-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-white/5 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Versión</span>
          <button type="button" className={chipCls(genero === "o")} onClick={() => setGenero("o")} aria-pressed={genero === "o"}>
            Chico
          </button>
          <button type="button" className={chipCls(genero === "a")} onClick={() => setGenero("a")} aria-pressed={genero === "a"}>
            Chica
          </button>
          <span className="mx-2 hidden h-5 w-px bg-zinc-300 dark:bg-white/20 sm:block" aria-hidden />
          <button
            type="button"
            role="switch"
            aria-checked={conTarjetas}
            onClick={() => setConTarjetas((v) => !v)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold shadow-sm transition ${
              conTarjetas
                ? "border-emerald-500 bg-emerald-600 text-white hover:bg-emerald-700"
                : "border-zinc-400 dark:border-white/20 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-zinc-100 dark:hover:bg-white/10"
            }`}
          >
            {conTarjetas ? "Con tarjetas recortables" : "Sin tarjetas recortables"}
          </button>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          La versión cambia el texto (<i>enfadado/enfadada</i>, <i>tranquilo/tranquila</i>…) y los
          pictogramas en los que aparece el protagonista.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={descargarPdf}
            disabled={estado === "gen"}
            className="rounded-xl border border-blue-300 dark:border-blue-500/40 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-blue-700 dark:text-blue-300 shadow-sm transition hover:bg-blue-50 dark:hover:bg-blue-500/10 disabled:opacity-60"
          >
            {estado === "gen" ? "Generando…" : estado === "ok" ? "✓ Descargado" : estado === "err" ? "No se pudo generar" : "⬇ Descargar PDF"}
          </button>
          <button
            type="button"
            onClick={() => setLector(0)}
            className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition hover:bg-zinc-50 dark:hover:bg-white/5"
          >
            ▶ Leer en pantalla
          </button>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {nPdf} páginas · A4 apaisado · una idea por página
          </span>
        </div>
      </div>

      <ol className="mt-8 grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
        {hojas.map((h, i) => {
          const anexo = i >= nHistoria;
          return (
            <li key={i} className={anexo && !conTarjetas ? "opacity-50" : undefined}>
              <button
                type="button"
                onClick={() => setLector(i)}
                aria-label={`Ver la página ${i + 1} en grande`}
                className="aeln-lamina block w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10 bg-white shadow-sm transition hover:border-blue-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <HojaSvg hoja={h} className="block h-auto w-full" />
              </button>
              <div className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                {i === 0 ? "Portada" : anexo ? "Anexo · tarjetas para recortar (opcional)" : `Página ${i + 1}`}
              </div>
            </li>
          );
        })}
      </ol>

      {lector !== null ? (
        <Lector hojas={hojas} inicio={lector} titulo={historia.titulo} onClose={() => setLector(null)} />
      ) : null}
    </>
  );
}

function Lector({ hojas, inicio, titulo, onClose }: { hojas: ReturnType<typeof maquetar>; inicio: number; titulo: string; onClose: () => void }) {
  const [i, setI] = useState(inicio);
  const cerrar = useRef<HTMLButtonElement>(null);
  const ir = useCallback((d: number) => setI((v) => Math.min(hojas.length - 1, Math.max(0, v + d))), [hojas.length]);

  useEffect(() => {
    cerrar.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); ir(1); }
      else if (e.key === "ArrowLeft") ir(-1);
    };
    window.addEventListener("keydown", tecla);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", tecla);
    };
  }, [ir, onClose]);

  const flecha =
    "grid h-12 w-12 flex-none place-items-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20 disabled:opacity-25";

  return (
    <div role="dialog" aria-modal="true" aria-label={`${titulo}: lector`} className="fixed inset-0 z-[80] flex flex-col bg-slate-950/95 p-3 sm:p-6">
      <div className="flex items-center justify-between text-sm text-white/80">
        <span>
          {titulo} · {i + 1} / {hojas.length}
        </span>
        <button ref={cerrar} type="button" onClick={onClose} className="rounded-full bg-white/10 px-4 py-1.5 font-semibold text-white hover:bg-white/20">
          Cerrar ✕
        </button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center gap-2 sm:gap-4">
        <button type="button" className={flecha} onClick={() => ir(-1)} disabled={i === 0} aria-label="Página anterior">
          ‹
        </button>
        <div className="flex h-full min-w-0 flex-1 items-center justify-center">
          {/* Ancho = el que cabe a lo ancho o a lo alto, lo que sea menor (A4 apaisado = 1,415 : 1). */}
          <HojaSvg
            hoja={hojas[i]}
            className="aeln-lamina block h-auto rounded-lg bg-white shadow-2xl"
            style={{ width: "min(100%, calc((100dvh - 6.5rem) * 1.415))" }}
          />
        </div>
        <button type="button" className={flecha} onClick={() => ir(1)} disabled={i === hojas.length - 1} aria-label="Página siguiente">
          ›
        </button>
      </div>
    </div>
  );
}
