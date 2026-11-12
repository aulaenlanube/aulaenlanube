import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Curso de Programación con IA (DAM · DAW) – Aula en la nube",
  description:
    "Curso de Programación con IA del IES Simarro: se aprende haciendo proyectos con agentes de IA. Dos grupos con su propio curso: presencial (con proyecto en grupo) y semipresencial (solo individual, por quincenas).",
};

export default function CursoIAInicio() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <Breadcrumbs items={[{ title: "Curso de Programación con IA", path: "/programacion-ia/" }]} />
      <span className="inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
        1º DAM/DAW · IES Simarro · Programación
      </span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Curso de Programación con IA
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
        Aprender a programar <b>con</b> IA, no gracias a la IA. El curso se hace haciendo: proyectos que
        van a más, guiados con agentes de IA. El centro imparte el curso en <b>dos grupos</b> con su
        propio recorrido: elige el tuyo.
      </p>

      {/* Bifurcación: los dos cursos, separados a la vista */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Link
          href="/programacion-ia/presencial/"
          className="group flex flex-col rounded-3xl border-2 border-blue-300 dark:border-blue-500/40 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <span className="inline-block w-fit rounded-full bg-blue-700 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white dark:bg-blue-600">
            Grupo presencial · 1CFSD
          </span>
          <h2 className="mt-3 text-2xl font-extrabold">Curso presencial</h2>
          <p className="mt-2 flex-1 text-[15px] text-zinc-600 dark:text-zinc-400">
            Ritmo semanal en el aula: kickoff, build y demo. Ahora: proyecto 2, la <b>CLI «tareas con
            IA»</b> construida con el agente <b>OpenCode</b>, en paralelo al proyecto final <b>en grupo</b>
            (una startup de 4-5 publicada de verdad). Todos los proyectos, sesiones y rúbricas.
          </p>
          <p className="mt-4 text-sm font-bold text-blue-700 group-hover:underline dark:text-blue-300">
            Entrar al curso presencial →
          </p>
        </Link>

        <Link
          href="/programacion-ia/semipresencial/"
          className="group flex flex-col rounded-3xl border-2 border-amber-300 dark:border-amber-500/40 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <span className="inline-block w-fit rounded-full bg-amber-600 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
            Grupo semipresencial · 1CFSDS
          </span>
          <h2 className="mt-3 text-2xl font-extrabold">Curso semipresencial</h2>
          <p className="mt-2 flex-1 text-[15px] text-zinc-600 dark:text-zinc-400">
            Mismo método, otro formato: <b>planificado por quincenas</b> y <b>solo con proyectos
            individuales</b> — no hay proyecto en grupo. Ahora: quincenas 3 y 4, la <b>CLI «tareas con
            IA»</b>, tu herramienta de terminal construida con el agente OpenCode.
          </p>
          <p className="mt-4 text-sm font-bold text-amber-700 group-hover:underline dark:text-amber-400">
            Entrar al curso semipresencial →
          </p>
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px] text-zinc-700 dark:text-zinc-300">
          <b>¿Alumnado?</b> El aula es común para los dos grupos: entra con tu usuario y verás las
          entregas y la nota de <b>tu</b> grupo.
        </p>
        <Link
          href="/programacion-ia/acceso/"
          className="inline-flex flex-none items-center justify-center rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Acceso al aula →
        </Link>
      </div>

      <div className="mt-6 rounded-2xl border border-violet-200 dark:border-violet-500/30 bg-violet-50 p-5 text-[15px] text-violet-900 dark:bg-violet-500/10 dark:text-violet-200">
        <b>Tu herramienta de trabajo: OpenCode.</b> Desde el proyecto 2 los dos grupos programan de forma
        agéntica con OpenCode, el agente open source del instituto conectado a los modelos de IA locales del
        centro.{" "}
        <Link href="/programacion-ia/opencode/" className="font-semibold underline">
          Abrir la guía →
        </Link>
      </div>

      <Link
        href="/programacion-ia/video-semana/"
        className="group mt-6 flex items-center gap-4 rounded-2xl border border-red-200 dark:border-red-500/25 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-500/10 dark:to-orange-500/10 p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FF0000] shadow-md">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="#fff" aria-hidden="true">
            <path d="M8.7 15.4V8.6c0-.5.5-.8.9-.5l5.5 3.4c.4.2.4.8 0 1l-5.5 3.4c-.4.3-.9 0-.9-.5z" />
          </svg>
        </span>
        <span className="flex-1">
          <span className="block text-lg font-extrabold leading-tight text-zinc-900 dark:text-white">
            El curso, en vídeo: los 9 episodios de la serie
          </span>
          <span className="mt-0.5 block text-sm text-zinc-600 dark:text-zinc-400">
            Cada semana un vídeo del curso real —método, proyectos y clase aumentada— con guion y capítulos.
          </span>
        </span>
        <span className="shrink-0 rounded-xl bg-[#FF0000] px-5 py-2.5 text-sm font-bold text-white shadow-md transition group-hover:bg-[#cc0000]">
          Ver la serie →
        </span>
      </Link>
    </div>
  );
}
