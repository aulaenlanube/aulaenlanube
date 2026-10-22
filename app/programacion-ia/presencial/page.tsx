import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import BotonProgramacion from "../_programacion-didactica/BotonProgramacion";

export const metadata: Metadata = {
  title: "Curso de Programación con IA · Presencial (1º DAM/DAW) – Aula en la nube",
  description:
    "Grupo presencial del Curso de Programación con IA (IES Simarro): web personal de marca en marcha, proyecto final individual y proyecto final en grupo.",
};

const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";
const tag =
  "mb-2 inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider";

export default function CursoIAPresencial() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Curso de Programación con IA", path: "/programacion-ia/" },
          { title: "Presencial", path: "/programacion-ia/presencial/" },
        ]}
      />
      <span className={chip}>Grupo presencial · 1º DAM/DAW · IES Simarro</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Curso de Programación con IA · <span className="text-blue-700 dark:text-blue-300">Presencial</span>
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
        Estás viendo la zona del <b>grupo presencial</b>. El curso se hace haciendo: proyectos que van a
        más, guiados con agentes de IA. Ahora mismo hay <b>un proyecto en marcha</b>; al final del curso,
        <b> dos proyectos finales</b>: uno individual y <b>uno en grupo</b> — el grupo semipresencial
        trabaja solo el individual.
      </p>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px] text-blue-900 dark:text-blue-200">
          <b>¿Eres alumno del curso?</b> Entra en tu aula: sesiones de cada proyecto, tus entregas y tu nota
          explicada con la rúbrica.
        </p>
        <Link
          href="/programacion-ia/acceso/"
          className="inline-flex flex-none items-center justify-center rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Acceso al aula →
        </Link>
      </div>

      <h2 className="mt-9 text-xl font-extrabold tracking-tight">Los proyectos</h2>
      <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
        El temario se construye con los proyectos: cada uno deja una técnica o una herramienta nueva.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4">
        <Link
          href="/programacion-ia/web-personal/"
          className="block rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <span className={`${tag} border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300`}>
            En marcha · presencial y semipresencial
          </span>
          <h3 className="text-lg font-bold">Web personal de marca</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Una landing sobre ti: quién eres, qué has hecho, qué te gusta. Se construye{" "}
            <b>fichero a fichero</b> con el chat del centro para entender cómo funciona una web por
            dentro. Tu primera web real y tu carta de presentación.
          </p>
          <p className="mt-3 text-sm font-semibold text-blue-700 dark:text-blue-300">
            Ver proyecto, material y sesión 1 →
          </p>
        </Link>

        <Link
          href="/programacion-ia/proyecto-final-individual/"
          className="block rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <span className={`${tag} border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300`}>
            Proyecto final · individual
          </span>
          <h3 className="text-lg font-bold">Tu proyecto, a tu altura</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Seis familias de proyecto con ideas y ejemplos reales: CLI, apps con IA por API, SaaS,
            videojuegos, Android, automatizaciones. Con plan para elegirlo bien.
          </p>
          <p className="mt-3 text-sm font-semibold text-blue-700 dark:text-blue-300">Ver ideas y casos reales →</p>
        </Link>

        <Link
          href="/programacion-ia/proyecto-final-grupo/"
          className="block rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <span className={`${tag} border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300`}>
            Proyecto final · en grupo · SOLO presencial
          </span>
          <h3 className="text-lg font-bold">Startup de 4-5</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Un producto real: publicado en un VPS, con Stripe montado y pensado para <b>sobrevivir al
            curso</b>. Grupos compactos, roles tipo startup y sprints con PRs de verdad.{" "}
            <b>El semipresencial no cursa este proyecto.</b>
          </p>
          <p className="mt-3 text-sm font-semibold text-blue-700 dark:text-blue-300">Ver el plan de startup →</p>
        </Link>
      </div>

      <h2 className="mt-9 text-xl font-extrabold tracking-tight">El curso, en vídeo</h2>
      <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
        Cada semana, un vídeo corto contando el curso real: método, proyectos y clase aumentada.
        <Link href="/programacion-ia/video-semana/" className="ml-1 font-semibold">Ver la serie →</Link>
      </p>

      <div className="mt-6 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 p-5 text-[15px]">
        <b>Cómo trabajaremos:</b> el primer proyecto se hace pieza a pieza, pidiendo cada fichero al
        chat del centro. Según avancemos, subimos de nivel: agentes de código (OpenCode), versionado
        con Git y despliegue real. Criterio en todo: el proyecto funciona, sabes contarlo, y se ve
        que decides tú.
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px] text-blue-900 dark:text-blue-200">
          <b>Programación didáctica del módulo 0485 (curso 2026-27).</b> El documento oficial del grupo
          presencial: resultados de aprendizaje, las 6 unidades de trabajo (una por proyecto, con la startup
          como proyecto anual), temporalización, evaluación y atención a la diversidad.
        </p>
        <BotonProgramacion modalidad="presencial" />
      </div>
    </div>
  );
}
