import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { chip } from "../ui";
import { APS, ACTS, TEMA } from "../datos";

export const metadata: Metadata = {
  title: "Tema 1 · Comunicació, llengua i ortografia — Valencià 2.º ESO — Adaptaciones PT",
  description:
    "Tema 1 de Valencià con adaptaciones PT: seis bloques, cada uno con teoría, ejemplos resueltos y seis activitats en cinco niveles (ejercicio base de 2.º ESO y adaptaciones a 1.º ESO, 6.º, 5.º y 4.º de primaria).",
};

const DESC: Record<string, string> = {
  "00-repas": "Síl·laba tònica, gènere i nombre, articles i contraccions, lectura, orden alfabético y familias de palabras: lo que hace falta para arrancar.",
  "01-comunicacio": "Emissor, receptor, missatge, canal, codi i context. Les funcions del llenguatge. Verbal i no verbal.",
  "02-diversitat": "Quantes llengües hi ha al món, famílies lingüístiques d'Europa, l'origen romànic del valencià i les llengües en perill.",
  "03-classes-paraules": "Les huit classes de paraules: variables (nom, adjectiu, determinant, pronom, verb) i invariables (adverbi, preposició, conjunció).",
  "04-sintagmes": "SN, SV, SAdj., SAdv. i SPrep.: la classe depén del nucli; proves de substitució i ampliació.",
  "05-puntuacio": "Coma, punt, punt i coma, dos punts, punts suspensius, signes d'entönació i el guió llarg de diàleg.",
  "06-ortografia-vocals": "E i o obertes o tancades, divergències amb el castellà, la [a] que no s'escriu i dictats de comprovació.",
};

export default function PteValenciaTema1() {
  const base = "/adaptaciones-pt/2eso/valenciano/tema-1";
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Adaptaciones PT", path: "/adaptaciones-pt/" },
          { title: "2.º ESO", path: "/adaptaciones-pt/2eso/" },
          { title: "Valencià", path: "/adaptaciones-pt/2eso/valenciano/" },
          { title: "Tema 1", path: `${base}/` },
        ]}
      />
      <span className={chip}>Tema 1 · {APS.length} blocs · {APS.length * 6} activitats × 5 niveles</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{TEMA}</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Cada bloque lleva su <b>teoría</b> (explicación corta y accesible), <b>ejemplos</b>{" "}
        resueltos y <b>seis activitats</b>, cada una con el ejercicio base de 2.º de ESO y sus
        cuatro adaptaciones. El bloc 0 és de
        repàs: conviene empezar por ahí y seguir el orden, aunque los enlaces permiten saltar a
        cualquier bloque.
      </p>

      <div className="mt-6 space-y-3">
        {APS.map((a) => (
          <Link
            key={a.slug}
            href={`${base}/${a.slug}/`}
            className="group flex gap-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:border-blue-300 dark:hover:border-blue-500/40 hover:bg-blue-50/40 dark:hover:bg-blue-500/10"
          >
            <div className="w-12 flex-none text-2xl font-extrabold tracking-tight text-blue-700 dark:text-blue-300">{a.n}</div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-800">{a.t}</h2>
              <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400">{DESC[a.slug]}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400">
                {(ACTS[a.slug] || []).length} activitats × 5 niveles
              </p>
            </div>
            <div className="self-center text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600">→</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link href={`${base}/completo/`} className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5">
          📄 Vore tema complet imprimible
        </Link>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 p-5 text-sm text-zinc-700 dark:text-zinc-300">
        <b>Saberes básicos (anexo III, Decreto 107/2022):</b> los elementos de la comunicación y la
        intención comunicativa; las clases de palabras y sus procedimientos de formación; la
        ortografía de la tilde; y la lectura y el reconocimiento de los géneros literarios.
      </div>
    </div>
  );
}
