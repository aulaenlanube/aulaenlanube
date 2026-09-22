import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";
import OposPdfButton from "../../pdf-button";
import { payloadTema } from "../../exportar";
import { TeoriaBloque } from "../../teoria-bloque";
import { md } from "../../texto";
import { Icono, Fig } from "../../figuras";
import { APS, ACTS, LABELS, TEMA } from "../../datos";

export const metadata: Metadata = {
  title: "Tema 1 completo (imprimible) · Castellano · 2.º ESO · Adaptaciones PT",
  description:
    "Teoría, ejemplos y actividades de los seis bloques del Tema 1 de Lengua Castellana en una sola página imprimible, con el ejercicio base de 2.º de ESO, sus cuatro adaptaciones y las soluciones.",
};

const crumbs = [
  { title: "Adaptaciones PT", path: "/adaptaciones-pt/" },
  { title: "2.º ESO", path: "/adaptaciones-pt/2eso/" },
  { title: "Castellano", path: "/adaptaciones-pt/2eso/castellano/" },
  { title: "Tema 1", path: "/adaptaciones-pt/2eso/castellano/tema-1/" },
];

export default function TemaCompleto() {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[...crumbs, { title: "Vista completa del tema", path: "" }]} />

      <header className="mt-6 border-b border-zinc-200 dark:border-white/10 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {TEMA} — <span className="text-blue-700 dark:text-blue-300">todo el tema</span>
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          Teoría, ejemplos y actividades de los {APS.length} bloques en una sola página. Con el
          botón <b>Descargar PDF</b> puedes elegir un solo nivel (o todos) y sacarlo con o sin
          soluciones para imprimir en A4.
        </p>
        <div className="no-print mt-4 flex flex-wrap items-center gap-3">
          <OposPdfButton payload={payloadTema()} />
          <PrintButton />
        </div>
      </header>

      {APS.map((ap, i) => {
        const acts = ACTS[ap.slug] || [];
        return (
          <section key={ap.slug} className={i === 0 ? "mt-10" : "print-break mt-14"}>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {ap.n}. {ap.t}
            </h2>

            <div className="mt-4 rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/60 dark:bg-blue-500/10 p-5 shadow-sm sm:p-7">
              <TeoriaBloque items={ap.teoria} />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">✏️ Ejemplos resueltos</h3>
              <div className="pte-ej mt-2 space-y-2 text-[15px] text-zinc-800 dark:text-zinc-200">
                {ap.ej.map((e, j) => (
                  <p key={j}>• <span dangerouslySetInnerHTML={{ __html: md(e) }} /></p>
                ))}
              </div>
            </div>

            {acts.map((a, k) => (
              <div key={k} className="mt-6 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
                <h4 className="flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-zinc-100">
                  <Icono k={a.ic} />
                  Actividad {k + 1} · {a.t}
                </h4>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{a.d}</p>
                {a.fig ? <Fig k={a.fig} /> : null}
                <div className="mt-3 grid gap-4 lg:grid-cols-2">
                  {a.nv.map((nv, l) => (
                    <div key={l} className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 p-4">
                      <div className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">{LABELS[l]}</div>
                      {nv.in ? <p className="mt-1 text-sm italic text-zinc-600 dark:text-zinc-400" dangerouslySetInnerHTML={{ __html: md(nv.in) }} /> : null}
                      <ul className="mt-2 space-y-1 text-sm text-zinc-800 dark:text-zinc-200">
                        {nv.p.map((x, m) => (
                          <li key={m} dangerouslySetInnerHTML={{ __html: md(x) }} />
                        ))}
                      </ul>
                      <details className="mt-3">
                        <summary className="cursor-pointer text-sm font-semibold text-blue-700 dark:text-blue-300">Ver solución</summary>
                        <ul className="mt-2 space-y-1 text-sm text-zinc-800 dark:text-zinc-200">
                          {nv.s.map((x, m) => (
                            <li key={m} dangerouslySetInnerHTML={{ __html: md(x) }} />
                          ))}
                        </ul>
                        {nv.ad ? (
                          <div className="mt-3 rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-3 text-sm text-amber-900 dark:text-amber-200">
                            <span className="text-xs font-bold uppercase tracking-wide">🔧 Qué se adapta</span>
                            <p className="mt-1" dangerouslySetInnerHTML={{ __html: md(nv.ad) }} />
                          </div>
                        ) : null}
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}
