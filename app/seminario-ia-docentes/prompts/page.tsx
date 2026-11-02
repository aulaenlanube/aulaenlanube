import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Chip, Prompt, TONO, cls } from "@/app/programacion-ia/_video/piezas";
import { MOMENTOS, RAIZ, SESIONES, type Momento, type PromptSeminario } from "../_datos";
import { PROMPTS_S1 } from "../sesion-01/prompts";
import { PROMPTS_S2 } from "../sesion-02/prompts";
import { PROMPTS_S3 } from "../sesion-03/prompts";
import { PROMPTS_S4 } from "../sesion-04/prompts";
import { PROMPTS_S5 } from "../sesion-05/prompts";

export const metadata: Metadata = {
  title: "Biblioteca de prompts para docentes — Seminario de IA para docentes – Aula en la nube",
  description:
    "Todos los prompts del Seminario de IA para docentes en una página, ordenados por momento del curso: empezar, preparar clases, evaluar y corregir, planificar y construir tu herramienta. Con huecos marcados para FP, ESO y Bachillerato.",
  alternates: { canonical: `${RAIZ}prompts/` },
};

// Una sola fuente: cada sesión exporta sus prompts y aquí solo se juntan.
const TODOS: PromptSeminario[] = [...PROMPTS_S1, ...PROMPTS_S2, ...PROMPTS_S3, ...PROMPTS_S4, ...PROMPTS_S5];
const ORDEN: Momento[] = ["empezar", "preparar", "evaluar", "planificar", "herramienta"];
const TONO_MOMENTO: Record<Momento, keyof typeof TONO> = {
  empezar: "azul",
  preparar: "verde",
  evaluar: "ambar",
  planificar: "morado",
  herramienta: "rosa",
};

export default function BibliotecaPrompts() {
  const grupos = ORDEN.map((m) => ({ m, lista: TODOS.filter((p) => p.momento === m) })).filter((g) => g.lista.length > 0);
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <section className="max-w-[1100px]">
        <Breadcrumbs
          grande
          items={[
            { title: "Seminario de IA para docentes", path: RAIZ },
            { title: "Biblioteca de prompts", path: `${RAIZ}prompts/` },
          ]}
        />
        <Chip>{`${TODOS.length} prompts · las cinco sesiones`}</Chip>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">Biblioteca de prompts</h1>
        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          Todos los prompts del seminario en un solo sitio, ordenados por el momento del curso en que los vas a necesitar.
          Copia el que quieras, <b>sustituye lo que va [EN MAYÚSCULAS ENTRE CORCHETES]</b> y pégalo donde indica cada uno.
          Casi todos empiezan pidiendo tu ficha de la sesión 1: con ella, la respuesta deja de ser genérica.
        </p>
        <div className={`mt-6 rounded-2xl border p-4 ${TONO.rosa.caja}`}>
          <p className={`text-lg ${TONO.rosa.tinta}`}>
            <b>Antes de pegar nada:</b> ningún nombre, foto o dato de salud del alumnado. Si un prompt necesita datos
            personales, solo en Copilot con tu cuenta @edu.gva.es y lo mínimo (A01, A02…).{" "}
            <Link href={`${SESIONES[0].ruta}#datos`} className={cls.enlace}>
              El semáforo de datos
            </Link>
            .
          </p>
        </div>
        <nav aria-label="Momentos del curso" className="mt-6 flex flex-wrap gap-2">
          {grupos.map(({ m, lista }) => (
            <a
              key={m}
              href={`#${m}`}
              className={`rounded-full border px-4 py-1.5 text-base font-semibold transition hover:opacity-80 ${TONO[TONO_MOMENTO[m]].chip}`}
            >
              {`${MOMENTOS[m]} · ${lista.length}`}
            </a>
          ))}
        </nav>
      </section>

      {grupos.map(({ m, lista }) => (
        <section key={m} id={m} className="mt-16 max-w-[1100px] scroll-mt-24">
          <h2 className="text-[32px] font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">{MOMENTOS[m]}</h2>
          <div className="mt-6 space-y-10">
            {lista.map((p) => {
              const s = SESIONES[p.sesion - 1];
              return (
                <article key={p.id} id={p.id} className="scroll-mt-24">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`${s.ruta}`} className={`rounded-full border px-3 py-0.5 text-base font-semibold ${TONO[s.tono].chip}`}>
                      {`Sesión ${s.n}`}
                    </Link>
                    <Chip tono="gris">{p.donde}</Chip>
                  </div>
                  <h3 className="mt-2 text-[24px] font-bold leading-tight text-zinc-900 dark:text-zinc-50">{p.titulo}</h3>
                  <p className={`mt-1 ${cls.texto}`}>{p.para}</p>
                  <div className="mt-3">
                    <Prompt text={p.texto} etiqueta={`Prompt · ${p.titulo}`} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <nav aria-label="Seminario" className="mt-16 grid max-w-[1100px] grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href={RAIZ}
          className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-900 dark:hover:border-blue-500/50"
        >
          <span className="block text-base font-semibold text-zinc-600 dark:text-zinc-400">← Volver</span>
          <span className="mt-1 block text-xl font-bold text-zinc-900 dark:text-zinc-100">Portada del seminario</span>
        </Link>
        <Link
          href={`${RAIZ}tu-herramienta/`}
          className="rounded-2xl border border-zinc-200 bg-white p-5 text-right transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-900 dark:hover:border-blue-500/50"
        >
          <span className="block text-base font-semibold text-zinc-600 dark:text-zinc-400">Y después →</span>
          <span className="mt-1 block text-xl font-bold text-zinc-900 dark:text-zinc-100">Tu herramienta, paso a paso</span>
        </Link>
      </nav>
    </div>
  );
}
