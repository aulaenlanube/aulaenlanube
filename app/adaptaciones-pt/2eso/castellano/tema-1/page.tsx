import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { chip } from "../ui";
import { APS, ACTS, TEMA } from "../datos";

export const metadata: Metadata = {
  title: "Tema 1 · Comunicación, palabra y literatura — Castellano 2.º ESO — Adaptaciones PT",
  description:
    "Tema 1 de Lengua Castellana con adaptaciones PT: seis bloques, cada uno con teoría, ejemplos resueltos y seis actividades en cinco niveles (ejercicio base de 2.º ESO y adaptaciones a 1.º ESO, 6.º, 5.º y 4.º de primaria).",
};

const DESC: Record<string, string> = {
  "00-repaso": "Sílaba, palabra y oración, orden alfabético, mayúsculas y comprensión lectora: lo que hace falta para arrancar.",
  "01-comunicacion": "Emisor, receptor, mensaje, canal, código y contexto. Comunicación verbal y no verbal.",
  "02-sustantivo-adjetivo": "Género, número y clases de sustantivo; el adjetivo, su concordancia y sus grados.",
  "03-derivacion": "Lexema, prefijos y sufijos: cómo se fabrican sustantivos y adjetivos nuevos.",
  "04-generos-literarios": "Narrativa, lírica y teatro: cómo se reconocen y en qué se diferencian.",
  "05-acentuacion": "Sílaba tónica, agudas, llanas y esdrújulas, hiatos y tilde diacrítica.",
};

export default function PteCastellanoTema1() {
  const base = "/adaptaciones-pt/2eso/castellano/tema-1";
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Adaptaciones PT", path: "/adaptaciones-pt/" },
          { title: "2.º ESO", path: "/adaptaciones-pt/2eso/" },
          { title: "Castellano", path: "/adaptaciones-pt/2eso/castellano/" },
          { title: "Tema 1", path: `${base}/` },
        ]}
      />
      <span className={chip}>Tema 1 · {APS.length} bloques · {APS.length * 6} actividades × 5 niveles</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{TEMA}</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Cada bloque lleva su <b>teoría</b> (explicación corta y accesible), <b>ejemplos</b>{" "}
        resueltos y <b>seis actividades</b>, cada una con el ejercicio base de 2.º de ESO y sus
        cuatro adaptaciones. El bloque 0 es de
        repaso: conviene empezar por ahí y seguir el orden, aunque los enlaces permiten saltar a
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
                {(ACTS[a.slug] || []).length} actividades × 5 niveles
              </p>
            </div>
            <div className="self-center text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600">→</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link href={`${base}/completo/`} className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5">
          📄 Ver tema completo imprimible
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
