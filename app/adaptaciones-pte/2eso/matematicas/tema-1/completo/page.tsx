import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";
import OposPdfButton from "../../pdf-button";
import { payloadTema } from "../../exportar";
import { TeoriaBloque } from "../../teoria-bloque";
import { mdTex } from "../../tex";
import { LineaH, Icono, TablaSignos } from "../../figuras";
import { APS, ACTS, LABELS } from "../../datos";

export const metadata: Metadata = {
  title: "Tema 1 completo (imprimible) · Matemáticas · 2.º ESO · Adaptaciones PTE",
};

const crumbs = [
  { title: "Adaptaciones PTE", path: "/adaptaciones-pte/" },
  { title: "2.º ESO", path: "/adaptaciones-pte/2eso/" },
  { title: "Matemáticas", path: "/adaptaciones-pte/2eso/matematicas/" },
  { title: "Tema 1 · Números enteros", path: "/adaptaciones-pte/2eso/matematicas/tema-1/" },
];

export default function TemaCompleto() {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[...crumbs, { title: "Vista completa del tema", path: "" }]} />

      <header className="mt-6 border-b border-zinc-200 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Tema 1 · Números enteros — <span className="text-blue-700">todo el tema</span>
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">
          Teoría, ejemplos y actividades de los 7 apartados en una sola página. Con el botón{" "}
          <b>Descargar PDF</b> se abren todas las soluciones y podrás guardarlo o imprimirlo en A4.
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
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
              {i + 1}. {ap.t}
            </h2>

            <div className="pte-teoria mt-4 rounded-2xl border border-blue-200 bg-blue-50/60 p-5 shadow-sm sm:p-7">
              {ap.teoria.map((b, j) => (
                <TeoriaBloque key={j} items={[b]} />
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold tracking-tight text-zinc-900">✏️ Ejemplos resueltos</h3>
              <div className="pte-ej mt-2 space-y-2 text-[15px] text-zinc-800">
                {ap.ej.map((e, j) => (
                  <p key={j}>{mdTex(e)}</p>
                ))}
              </div>
            </div>

            {acts.map((a, k) => (
              <div key={k} className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                <h4 className="flex items-center gap-2 text-base font-bold text-zinc-900">
                  <Icono k={a.ic} />
                  Actividad {k + 1} · {a.t}
                </h4>
                <p className="mt-1 text-sm text-zinc-600">{a.d}</p>
                {a.ln ? (
                  <LineaH desde={a.ln[0]} hasta={a.ln[1]} marcas={a.ln[2].map(([x, label, color]) => ({ x, label, color: color as "rojo" }))} caption="Recta numérica horizontal de apoyo para esta actividad." />
                ) : null}
                {a.regla ? (
                  <div className="mt-4">
                    <TablaSignos />
                    <p className="mt-1 text-center text-[11px] text-zinc-500">Regla de los signos: igual → positivo (+) · distinto → negativo (−).</p>
                  </div>
                ) : null}
                <div className="mt-3 grid gap-4 lg:grid-cols-2">
                  {a.nv.map((n, l) => (
                    <div key={l} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                      <div className="text-xs font-bold uppercase tracking-wide text-blue-700">{LABELS[l]}</div>
                      {n.in ? <p className="mt-1 text-sm text-zinc-600 italic">{n.in}</p> : null}
                      <ul className="mt-2 space-y-1 text-sm text-zinc-800">
                        {n.p.map((x, m) => (
                          <li key={m}>{mdTex(x)}</li>
                        ))}
                      </ul>
                      <details className="mt-3">
                        <summary className="cursor-pointer text-sm font-semibold text-blue-700">Ver solución</summary>
                        <ul className="mt-2 space-y-1 text-sm text-zinc-800">
                          {n.s.map((x, m) => (
                            <li key={m}>{mdTex(x)}</li>
                          ))}
                        </ul>
                        {n.ad ? (
                          <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                            <span className="text-xs font-bold uppercase tracking-wide">🔧 Qué se adapta</span>
                            <p className="mt-1">{n.ad}</p>
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
