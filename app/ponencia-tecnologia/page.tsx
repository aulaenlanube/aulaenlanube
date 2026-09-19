import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Ponencia: Herramientas de IA para la Oposición de Tecnología (Secundaria) — Aula en la Nube",
  description:
    "Guía y soporte de la ponencia de 2 horas para opositores de Tecnología (Secundaria, C. Valenciana): IA y temario, herramientas gratuitas (Copilot), laboratorio con portátil, y evaluación/práctica oral con IA.",
};

const chip =
  "inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700";

const SECTIONS = [
  {
    n: "01",
    t: "La oposición de Tecnología y la IA",
    d: "Qué ha cambiado, qué no, y cómo atacar los 71 temas nacionales con IA de forma seria (sin que te la descubran). Didáctica con IA incluida.",
    href: "/ponencia-tecnologia/01-introduccion/",
    bloques: "25 min",
  },
  {
    n: "02",
    t: "Tu kit gratuito: lo que ya tienes",
    d: "Lo que ya puedes usar hoy gratis: Copilot de tus licencias, Copilot de Microsoft 365 y GitHub Copilot en VS Code con modo agente. Límites reales y cómo exprimirlos.",
    href: "/ponencia-tecnologia/02-herramientas-gratuitas/",
    bloques: "25 min",
  },
  {
    n: "03",
    t: "Laboratorio: programa tu herramienta",
    d: "Con el portátil: construimos juntos un mini-proyecto agéntico — una página interactiva para tu programación didáctica. Paso a paso, con prompts copiables.",
    href: "/ponencia-tecnologia/03-laboratorio/",
    bloques: "40 min",
  },
  {
    n: "04",
    t: "IA en el examen: práctica y defensa",
    d: "Cómo usar IA en la parte práctica sin que te la descuelguen, cómo defender una práctica con un agente delante de los vocales, y la rubrica que te salvó.",
    href: "/ponencia-tecnologia/04-evaluacion/",
    bloques: "25 min",
  },
];

export default function PonenciaTecnologia() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Programación e IA", path: "/zona-programacion/" },
          { title: "Ponencia Tecnología", path: "/ponencia-tecnologia/" },
        ]}
      />
      <span className={chip}>Opositores · Tecnología Secundaria · C. Valenciana</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Herramientas de IA para la oposición de Tecnología
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-zinc-600">
        Ponencia de 2 horas (misma sesión, jueves y viernes) para opositores de <b>Tecnología en
        Secundaria</b> — Comunidad Valenciana. Pensada con el portátil abierto: una parte para pensar
        con la IA, otra para <b>programar con ella</b>. Todo lo que se enseña es gratuito y lo puedes
        tener funcionando antes de salir del aula.
      </p>

      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-[15px] text-emerald-900">
        <b>El itinerario de la sesión (2:00 h):</b> 10 min de encuadre → <b>Sección 1</b> (la
        oposición y la IA, 25 min) → <b>Sección 2</b> (tu kit gratuito, 25 min) → pausa breve →{" "}
        <b>Sección 3</b> (laboratorio con portátil, 40 min) → <b>Sección 4</b> (IA en el examen y la
        defensa, 25 min) → 5 min de preguntas. Las 4 secciones están escritas aquí, en el orden de la
        sesión, para que las consultes antes, durante y después.
      </div>

      <div className="mt-6 space-y-4">
        {SECTIONS.map((s) => (
          <Link
            key={s.n}
            href={s.href}
            className="group flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50/40"
          >
            <div className="w-14 flex-none text-3xl font-extrabold tracking-tight text-blue-700">{s.n}</div>
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h2 className="text-lg font-bold text-zinc-900 group-hover:text-blue-800">{s.t}</h2>
                <span className="rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-500">
                  {s.bloques}
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-600">{s.d}</p>
            </div>
            <div className="self-center text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600">→</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-100 p-5 text-sm text-zinc-700">
        <b>Antes de venir:</b> (1) portátil con VS Code (o capacidad para instalarlo), (2) cuenta de
        GitHub (gratis, 2 min), (3) si tu centro usa Microsoft 365 para Educación, entra una vez con
        esa cuenta para ver qué Copilot tienes. El resto te lo montamos en la sesión.
      </div>
    </div>
  );
}
