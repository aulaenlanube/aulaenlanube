"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ESCENAS, type NombreEscena, type PasoEscena } from "./pasos";

// Visor 3D de las páginas del curso (proyecto 3). Una escena real de Three.js
// que se explica sola: recorre los pasos de su guion (pasos.ts) y marca en la
// lista de la derecha por cuál va. Pensado para grabarse (docs/paginas-para-
// video.md, «Visores 3D»):
//  · no hace falta tocar nada: el guion avanza solo y vuelve a empezar;
//  · cada paso es un <li> con su nombre y su frase, siempre a la vista, para
//    que la cámara pueda enfocarlo;
//  · en la web, además, se gira arrastrando y se salta de paso pulsándolo;
//  · la figura lleva data-estado ("lista" cuando la escena ya se ve), para
//    que el motor de grabación sepa cuándo puede empezar la toma.
// three y la escena se cargan con import() cuando el visor se acerca a la
// pantalla: las páginas sin visores no cargan nada de esto.

type Estado = "espera" | "cargando" | "lista" | "sin-webgl" | "error";

export default function Visor3D({ escena, pie }: { escena: NombreEscena; pie?: ReactNode }) {
  const guion = ESCENAS[escena];
  const pasos: readonly PasoEscena[] = guion.pasos;
  const marco = useRef<HTMLDivElement>(null);
  const lienzo = useRef<HTMLCanvasElement>(null);
  const mando = useRef<{ irA(p: number): void; reproducir(si: boolean): void } | null>(null);
  const [estado, setEstado] = useState<Estado>("espera");
  const [paso, setPaso] = useState(0);
  const [dato, setDato] = useState("");
  const [suelto, setSuelto] = useState(true); // true: recorre el guion entero

  useEffect(() => {
    const caja = marco.current;
    const canvas = lienzo.current;
    if (!caja || !canvas) return;
    let vivo = true;
    let destruir: (() => void) | undefined;

    const cargar = async () => {
      setEstado("cargando");
      try {
        const [motor, indice] = await Promise.all([import("./motor"), import("./escenas/indice")]);
        if (!vivo) return;
        if (!motor.hayWebGL()) {
          setEstado("sin-webgl");
          return;
        }
        const fabrica = await indice.cargarEscena(escena);
        if (!vivo) return;
        const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
        const m = await motor.montarVisor(
          canvas,
          escena,
          fabrica,
          { alCambiarPaso: setPaso, alCambiarDato: setDato },
          { quieto },
        );
        if (!vivo) {
          m.destruir();
          return;
        }
        if (quieto) setSuelto(false);
        mando.current = m;
        destruir = m.destruir;
        setEstado("lista");
      } catch (e) {
        console.error(`Visor 3D «${escena}»:`, e);
        if (vivo) setEstado("error");
      }
    };

    // La escena se monta al acercarse a la pantalla, no al cargar la página.
    const vigia = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          vigia.disconnect();
          void cargar();
        }
      },
      { rootMargin: "600px" },
    );
    vigia.observe(caja);

    return () => {
      vivo = false;
      vigia.disconnect();
      mando.current = null;
      destruir?.();
    };
  }, [escena]);

  const irA = (i: number) => {
    mando.current?.irA(i);
    setSuelto(false);
  };
  const alternar = () => {
    mando.current?.reproducir(!suelto);
    setSuelto(!suelto);
  };

  return (
    <figure
      data-visor3d={escena}
      data-estado={estado}
      className="rounded-2xl border border-zinc-200 p-4 dark:border-white/10"
      style={{ background: "var(--dg-fondo)" }}
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,330px)]">
        <div ref={marco} className="relative min-w-0 overflow-hidden rounded-xl" style={{ aspectRatio: "16 / 9", background: "var(--dg-papel)" }}>
          <canvas ref={lienzo} role="img" aria-label={guion.etiqueta} className="block h-full w-full cursor-grab active:cursor-grabbing" />
          {estado === "lista" ? (
            <>
              <p className="pointer-events-none absolute left-3 top-3 rounded-lg bg-blue-600 px-3 py-1 text-base font-bold text-white dark:bg-blue-400 dark:text-slate-950">
                {pasos[paso].nombre}
              </p>
              {dato ? (
                <p className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-1 font-mono text-base font-semibold text-zinc-800 dark:bg-slate-950/85 dark:text-zinc-100">
                  {dato}
                </p>
              ) : null}
            </>
          ) : (
            <p className="absolute inset-0 grid place-items-center px-6 text-center text-lg text-zinc-600 dark:text-zinc-300">
              {estado === "sin-webgl"
                ? "Este navegador no tiene WebGL activado: la escena 3D no se puede mostrar."
                : estado === "error"
                  ? "La escena 3D no se ha podido cargar."
                  : "Cargando la escena 3D…"}
            </p>
          )}
        </div>

        <ol className="flex min-w-0 list-none flex-col justify-center gap-2 p-0">
          {pasos.map((p, i) => {
            const activo = estado === "lista" && i === paso;
            return (
              <li
                key={p.nombre}
                aria-current={activo ? "step" : undefined}
                className={`rounded-xl border px-3 py-2 transition-colors ${
                  activo
                    ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-500/15"
                    : "border-zinc-200 bg-white dark:border-white/10 dark:bg-slate-900"
                }`}
              >
                <button type="button" onClick={() => irA(i)} className="block w-full cursor-pointer text-left">
                  <span className={`block text-lg font-bold leading-snug ${activo ? "text-blue-800 dark:text-blue-200" : "text-zinc-900 dark:text-zinc-100"}`}>
                    {p.nombre}
                  </span>
                  <span className="mt-0.5 block text-base leading-snug text-zinc-700 dark:text-zinc-300">{p.detalle}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {pie ? <figcaption className="mt-3 text-center text-lg text-zinc-700 dark:text-zinc-300">{pie}</figcaption> : null}

      <div className="sem-solo-web mt-3 flex flex-wrap items-center justify-between gap-2 text-base text-zinc-600 dark:text-zinc-400">
        <span>Arrastra la escena para girarla. Pulsa un paso para quedarte en él.</span>
        <button
          type="button"
          onClick={alternar}
          disabled={estado !== "lista"}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3 py-1 text-base font-semibold text-zinc-700 transition hover:border-blue-400 hover:text-blue-700 disabled:opacity-50 dark:border-white/15 dark:bg-slate-800 dark:text-zinc-200 dark:hover:border-blue-400/60 dark:hover:text-blue-300"
        >
          {suelto ? "Detener" : "Seguir el recorrido"}
        </button>
      </div>
    </figure>
  );
}
