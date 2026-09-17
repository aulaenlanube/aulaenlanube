import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Curso de Programación con IA (DAM · DAW) – Aula en la nube",
  description:
    "Curso de Programación con IA del IES Simarro: se aprende haciendo proyectos con agentes de IA. Ahora: web personal de marca. Final de curso: proyecto individual y proyecto en grupo.",
};

const chip =
  "inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700";
const tag =
  "mb-2 inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider";

export default function CursoIAInicio() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <Breadcrumbs items={[{ title: "Curso de Programación con IA", path: "/programacion-ia/" }]} />
      <span className={chip}>1º DAM/DAW · IES Simarro · Programación</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Curso de Programación con IA
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-zinc-600">
        Aprender a programar <b>con</b> IA, no gracias a la IA. El curso se hace haciendo: una serie de
        proyectos que van a más, guiados con agentes de IA. Ahora mismo tenemos{" "}
        <b>un proyecto en marcha</b>; al final del curso habrá <b>dos proyectos finales, los más
        importantes</b>: uno individual y uno en grupo.
      </p>

      <h2 className="mt-9 text-xl font-extrabold tracking-tight">Los proyectos</h2>
      <p className="mt-1 text-[15px] text-zinc-600">
        El temario se construye con los proyectos: cada uno deja una técnica o una herramienta nueva.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4">
        <Link
          href="/programacion-ia/web-personal/"
          className="block rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <span className={`${tag} border-blue-200 bg-blue-50 text-blue-700`}>
            En marcha · toda la clase
          </span>
          <h3 className="text-lg font-bold">Web personal de marca</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Una landing sobre ti: quién eres, qué has hecho, qué te gusta. Se construye{" "}
            <b>fichero a fichero</b> con el chat del centro para entender cómo funciona una web por
            dentro. Tu primera web real y tu carta de presentación.
          </p>
          <p className="mt-3 text-sm font-semibold text-blue-700">
            Ver proyecto, material y sesión 1 →
          </p>
        </Link>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <span className={`${tag} border-emerald-200 bg-emerald-50 text-emerald-700`}>
            Proyecto final · individual
          </span>
          <h3 className="text-lg font-bold">Tu proyecto, a tu altura</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Cada alumno elegirá un proyecto personal más ambicioso, más allá de la web estática: un
            SaaS, un videojuego, una app con IA… Con plan propio, alcance negociado y defensa oral.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <span className={`${tag} border-emerald-200 bg-emerald-50 text-emerald-700`}>
            Proyecto final · en grupo
          </span>
          <h3 className="text-lg font-bold">Startup de 4-5</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Grupos como pequeñas empresas: un producto con <b>base de datos</b>, roles, entregas por
            sprints y presentación final. El salto de la web estática a la aplicación real.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-100 p-5 text-[15px]">
        <b>Cómo trabajaremos:</b> el primer proyecto se hace pieza a pieza, pidiendo cada fichero al
        chat del centro. Según avancemos, subimos de nivel: agentes de código (OpenCode), versionado
        con Git y despliegue real. Criterio en todo: el proyecto funciona, sabes contarlo, y se ve
        que decides tú.
      </div>
    </div>
  );
}
