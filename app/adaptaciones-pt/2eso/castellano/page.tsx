import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { chip } from "./ui";

export const metadata: Metadata = {
  title: "Castellano · 2.º ESO — Adaptaciones PT — Aula en la Nube",
  description:
    "Temario de Lengua Castellana y Literatura con adaptaciones PT: cada tema con sus bloques de teoría, ejemplos y actividades en cinco niveles (el ejercicio base de 2.º ESO y sus adaptaciones a 1.º ESO, 6.º, 5.º y 4.º de primaria).",
};

const TEMAS = [
  { n: "Tema 1", t: "Comunicación, palabra y literatura", href: "/adaptaciones-pt/2eso/castellano/tema-1/", listo: true,
    d: "6 bloques: actividades de repaso, la comunicación, sustantivo y adjetivo, derivación nominal y adjetival, los géneros literarios y acentuación. Con los ejercicios adaptados ya publicados." },
  { n: "Tema 2", t: "El texto y sus tipos", href: "", listo: false, d: "En preparación." },
  { n: "Tema 3", t: "El verbo y el sintagma verbal", href: "", listo: false, d: "En preparación." },
  { n: "Tema 4", t: "La oración simple", href: "", listo: false, d: "En preparación." },
  { n: "Tema 5", t: "Léxico y significado", href: "", listo: false, d: "En preparación." },
  { n: "Tema 6", t: "La narración y la descripción", href: "", listo: false, d: "En preparación." },
  { n: "Tema 7", t: "Lírica y recursos literarios", href: "", listo: false, d: "En preparación." },
  { n: "Tema 8", t: "El teatro y la lectura dramatizada", href: "", listo: false, d: "En preparación." },
];

export default function PteCastellano() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Programación e IA", path: "/zona-programacion/" },
          { title: "Adaptaciones PT", path: "/adaptaciones-pt/" },
          { title: "2.º ESO", path: "/adaptaciones-pt/2eso/" },
          { title: "Castellano", path: "/adaptaciones-pt/2eso/castellano/" },
        ]}
      />
      <span className={chip}>2.º de ESO · Castellano · Temario del curso</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Lengua Castellana: temas
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Cada tema se reparte en <b>bloques</b> con teoría, ejemplos resueltos y actividades
        en <b>cinco niveles</b>. Primero va el <b>ejercicio base de 2.º de ESO</b>, el del
        curso; debajo, cuatro adaptaciones descendentes —<b>1.º de ESO, 6.º, 5.º y 4.º de
        primaria</b>— para el alumnado cuyo nivel de competencia curricular está por debajo del
        curso. Mismo objetivo en los cinco: lo que baja es la exigencia de acceso, no la meta.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {TEMAS.map((t) =>
          t.listo ? (
            <Link key={t.n} href={t.href} className="group rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:border-blue-300 dark:hover:border-blue-500/40 hover:bg-blue-50/40 dark:hover:bg-blue-500/10">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400">{t.n}</div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-800">{t.t}</h2>
              <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400">{t.d}</p>
              <div className="mt-2 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Disponible →</div>
            </Link>
          ) : (
            <div key={t.n} className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 opacity-60">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400">{t.n}</div>
              <h2 className="text-base font-bold text-zinc-500 dark:text-zinc-400">{t.t}</h2>
              <p className="mt-1 text-[13px] text-zinc-500 dark:text-zinc-400">{t.d}</p>
            </div>
          )
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 p-5 text-sm text-zinc-700 dark:text-zinc-300">
        <b>Marco normativo:</b> saberes básicos del anexo III del Decreto 107/2022 (C. Valenciana)
        para Lengua Castellana y Literatura —comunicación, reflexión sobre la lengua y educación
        literaria—; en los niveles de Primaria, descentración al Decreto 106/2022. Adaptaciones de
        acceso conforme al Decreto 104/2018 y la Orden 20/2019.
      </div>
    </div>
  );
}
