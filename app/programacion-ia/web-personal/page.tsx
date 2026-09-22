import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Proyecto · Web personal de marca — Curso de Programación con IA",
  description:
    "Primer proyecto del Curso de Programación con IA: tu web personal de marca, construida pieza a pieza con el chat del centro. Estructura HTML, CSS y JS.",
};

const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";

const CARDS = [
  ["index.html", "Estructura y contenido.", "Qué hay en la página y en qué orden: encabezados, párrafos, imágenes, enlaces. El esqueleto."],
  ["style.css", "Presentación.", "Colores, tipografías, espaciados, rejillas y versión móvil. No añade contenido: lo viste. Aquí la web se vuelve tuya."],
  ["script.js", "Comportamiento.", "Lo que reacciona: menú en móvil, modo oscuro, animaciones. La página deja de ser un folio."],
] as const;

const FILAS = [
  ["1 · Cabecera (hero)", "Tu nombre, una frase que te defina y una llamada a la acción («ver proyectos», «contáctame»). Decide si siguen leyendo.", "¿Quién es este y por qué me importa?"],
  ["2 · Sobre mí", "2-4 líneas: de dónde vienes, qué estudias, qué te motiva. Primera persona, sin postureo.", "¿Quién eres de verdad?"],
  ["3 · Lo que he hecho", "Pruebas: cursos, proyectos, deportes, colaboraciones. Hechos con contexto, no adjetivos.", "¿Qué sabes hacer?"],
  ["4 · Me gusta", "3-6 cosas que te interesan (música, tech, videojuegos…). Tu diferenciador; da pistas de cómo piensas.", "¿Qué te quema dentro?"],
  ["5 · Contacto", "Correo y enlaces (GitHub, LinkedIn). Sin fricción: un clic y apareces.", "¿Cómo te escribo?"],
  ["6 · Pie", "Tu nombre, año, un detalle con personalidad.", "Cierre profesional."],
] as const;

export default function CursoIAWebPersonal() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Curso de Programación con IA", path: "/programacion-ia/" },
          { title: "Web personal de marca", path: "/programacion-ia/web-personal/" },
        ]}
      />
      <span className={chip}>Proyecto 1 · Web personal de marca · Toda la clase</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Tu web personal, pieza a pieza
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
        Primer proyecto del curso: una <b>landing de marca personal</b>. Tu carta de presentación y, a
        la vez, la mejor forma de aprender cómo funciona una web por dentro antes de dejar que un
        agente la construya por ti.
      </p>

      <h2 className="mt-9 text-xl font-extrabold tracking-tight">Qué vas a construir</h2>
      <p className="mt-1 max-w-3xl text-[15px] text-zinc-600 dark:text-zinc-400">
        Una web real es una carpeta con ficheros que el navegador interpreta en tres pasos: el HTML
        dice <b>qué hay</b>, el CSS <b>cómo se ve</b> y el JS <b>qué hace</b>. Ese es el trío que
        aprenderás a dirigir:
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {CARDS.map(([f, t, d]) => (
          <div key={f} className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <h3 className="font-mono text-[15px] font-bold text-zinc-800 dark:text-zinc-200">{f}</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              <b>{t}</b> {d}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
        Cuando los proyectos crezcan llegará el cuarto elemento, la <b>base de datos</b> (usuarios,
        partidas, pedidos): el corazón del proyecto final en grupo.
      </p>

      <h2 className="mt-9 text-xl font-extrabold tracking-tight">
        Anatomía de una web de marca personal
      </h2>
      <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
        Una landing de marca responde en 10 segundos a quien llega. Cada bloque tiene una misión:
      </p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-100 dark:bg-white/10 text-left">
              <th className="w-[26%] px-3.5 py-2.5 font-bold">Bloque</th>
              <th className="px-3.5 py-2.5 font-bold">Qué contiene</th>
              <th className="w-[24%] px-3.5 py-2.5 font-bold">Qué responde</th>
            </tr>
          </thead>
          <tbody>
            {FILAS.map(([b, q, r]) => (
              <tr key={b} className="border-t border-zinc-200 dark:border-white/10 align-top">
                <td className="px-3.5 py-2.5 font-bold text-zinc-800 dark:text-zinc-200">{b}</td>
                <td className="px-3.5 py-2.5 text-zinc-600 dark:text-zinc-400">{q}</td>
                <td className="px-3.5 py-2.5 italic text-zinc-500 dark:text-zinc-400">{r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-9 text-xl font-extrabold tracking-tight">Sesiones del proyecto</h2>
      <div className="mt-4 space-y-3">
        <Link
          href="/programacion-ia/sesion-01/"
          className="flex flex-col gap-2 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:flex-row sm:items-center"
        >
          <span className="font-extrabold text-zinc-400 dark:text-zinc-400">01</span>
          <span className="flex-1">
            <span className="block text-[16px] font-bold">
              Crear tu web con el chat del centro
            </span>
            <span className="block text-sm text-zinc-600 dark:text-zinc-400">
              Pide tu HTML, tu CSS y tu JS con prompts listos para copiar, únelos, pruébala y
              publícala. Es una fase de trabajo: puede ocupar más de una clase, avanzamos a vuestro
              ritmo. Con checklist de entrega.
            </span>
          </span>
          <span className="w-fit rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            Ya disponible
          </span>
        </Link>
        <Link
          href="/programacion-ia/sesion-02/"
          className="flex flex-col gap-2 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:flex-row sm:items-center"
        >
          <span className="font-extrabold text-zinc-400 dark:text-zinc-400">02</span>
          <span className="flex-1">
            <span className="block text-[16px] font-bold">GitHub en carne viva: tu web, versionada por ti</span>
            <span className="block text-sm text-zinc-600 dark:text-zinc-400">
              Qué es Git y qué es GitHub de verdad, la configuración global desde consola y qué
              escribir exactamente cuando pide usuario y contraseña (un token, no tu contraseña),
              con los errores típicos y su arreglo. Después: repo enlazado a tu carpeta, commits
              honestos, máquina del tiempo y dos diseños en dos ramas.
            </span>
          </span>
          <span className="w-fit rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            Esta sesión
          </span>
        </Link>

        <Link
          href="/programacion-ia/sesion-03/"
          className="flex flex-col gap-2 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:flex-row sm:items-center"
        >
          <span className="font-extrabold text-zinc-400 dark:text-zinc-400">03</span>
          <span className="flex-1">
            <span className="block text-[16px] font-bold">Por qué programamos así</span>
            <span className="block text-sm text-zinc-600 dark:text-zinc-400">
              Los datos del sector y de la FP, tu nuevo rol como desarrollador con IA, y la justificación
              del proyecto de innovación: el porqué de este curso, negro sobre blanco.
            </span>
          </span>
          <span className="w-fit rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            Preparada
          </span>
        </Link>
      </div>

      <div className="mt-6 rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-5 text-[15px] text-blue-900 dark:text-blue-200">
        <b>Por qué empezamos por aquí:</b> este proyecto enseña el ciclo que usarás todo el curso —
        pensar, pedir, comprobar, corregir, publicar. Después llegará la misma dinámica con agentes
        de código: más rápido, mismo criterio.
      </div>
    </div>
  );
}
