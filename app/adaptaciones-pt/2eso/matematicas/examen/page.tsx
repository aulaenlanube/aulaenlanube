import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { chip, tarjeta, Renglones } from "../ui";
import { mdTex } from "../tex";
import OposPdfButton from "../pdf-button";
import { EXAMEN, EXAMEN_SOL, payloadExamen } from "../exportar";

// Avaluació 1 (ACI 1) · Nombres enters · 2n ESO D · Curs 26/27.
// Fuente de verdad de los ejercicios: exportar.ts (EXAMEN / EXAMEN_SOL).
// La versión oficial para imprimir, maquetada con la plantilla del centre
// (banda de logos Generalitat · Simarro · FP Excelència + pie UE/GVA), es el
// PDF estático de public/exams/mat-2eso/. El botón del motor genera además
// una «ficha per a resolver» con renglones de escritura.
export const metadata: Metadata = {
  title: "Avaluació 1 · Nombres enters (2n ESO) — Adaptaciones PT",
  description:
    "Examen del Tema 1 (nombres enters) de 2n ESO D: 6 exercicis amb solucions, PDF oficial amb la capçalera del centre i fitxa per a resolver.",
};

const PDF_OFICIAL = "/exams/mat-2eso/aci1-nombres-enters-2eso-d.pdf";

export default function ExamenACI1() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Adaptaciones PT", path: "/adaptaciones-pt/" },
          { title: "2.º ESO", path: "/adaptaciones-pt/2eso/" },
          { title: "Matemáticas", path: "/adaptaciones-pt/2eso/matematicas/" },
          { title: "Tema 1", path: "/adaptaciones-pt/2eso/matematicas/tema-1/" },
          { title: "Avaluació 1", path: "" },
        ]}
      />
      <span className={chip}>Tema 1 · Avaluació 1 · 2n ESO D · Curs 26/27</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Avaluació 1 · Nombres enters
      </h1>
      <p className="mt-4 text-[15px] text-zinc-600 dark:text-zinc-400">
        Examen de 6 exercicis: sumes i restes d&apos;enters, parèntesis i claudàtors, restes amb
        l&apos;algoritme (portant), dos problemes de pisos i multiplicació/divisió d&apos;enters.
        <b> Escriu les operacions pas a pas</b>: sense el procés, l&apos;exercici no es considera
        correcte.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={PDF_OFICIAL}
          download
          className="rounded-xl border border-blue-300 dark:border-blue-500/40 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-blue-700 dark:text-blue-300 shadow-sm transition hover:bg-blue-50 dark:hover:bg-blue-500/10"
        >
          ⬇ PDF oficial (3 pàgines, capçalera del centre)
        </a>
        <OposPdfButton
          payload={payloadExamen()}
          sinSoluciones
          label="⬇ PDF per a resolver (motor, amb renglones)"
        />
      </div>

      {EXAMEN.map((ex) => (
        <section key={ex.n} className="mt-8 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm sm:p-7">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Exercici {ex.n} · {ex.t}
          </h2>
          {ex.text ? (
            <div className="mt-2 space-y-1 text-[15px] text-zinc-800 dark:text-zinc-200">
              {ex.text.map((t, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: mdTex(t) }} />
              ))}
            </div>
          ) : null}
          {ex.parts ? (
            <ul className="mt-2 space-y-1 text-[15px] text-zinc-800 dark:text-zinc-200">
              {ex.parts.map((p, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: mdTex(p) }} />
              ))}
            </ul>
          ) : null}
          <Renglones n={ex.n === 3 ? 3 : 2} />
          <details className="mt-3">
            <summary className="cursor-pointer text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              Solucions (profe)
            </summary>
            <ul className="mt-2 space-y-1 text-sm text-zinc-800 dark:text-zinc-200">
              {(EXAMEN_SOL[ex.n] || []).map((s, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: mdTex(s) }} />
              ))}
            </ul>
          </details>
        </section>
      ))}

      <div className={`${tarjeta} !mt-10 !text-sm`}>
        <b>Per al profe:</b> l&apos;enunciat i les solucions viuen a{" "}
        <code>exportar.ts</code> (<code>EXAMEN</code> / <code>EXAMEN_SOL</code>) — canviant-los
        aquí, aquesta pàgina i la fitxa del motor es regeneren soles. El PDF oficial es
        reconstrueix amb <code>python3 tools/examen/generar.py</code>. L&apos;exercici 5 és la
        versió senzilla del 4 (mateix tipus d&apos;ascensor) per a l&apos;alumnat que va més
        just.
      </div>
    </div>
  );
}
