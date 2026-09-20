import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Tu plataforma · Herramientas de IA para la oposición de Tecnología — Aula en la Nube",
  description:
    "Plataforma de consulta de la sesión práctica de 2 horas para opositores de Tecnología (Secundaria, C. Valenciana): introducir los 71 temas con IA, kit gratuito de Copilot, laboratorio y defensa de la práctica.",
};

const chip =
  "inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700";

const SECTIONS = [
  {
    n: "1",
    t: "Tu examen y la IA",
    d: "Qué ha cambiado, qué no, y cómo atacar los 71 temas con IA sin que el tribunal te la descubra. Los 4 usos, con sus prompts.",
    href: "/ponencia-tecnologia/01-introduccion/",
  },
  {
    n: "2",
    t: "Tu kit gratuito",
    d: "Las 3 capas de Copilot que terminas la sesión con ellas funcionando: la de tu licencia Education, la de web y la que programa (VS Code), con instalación paso a paso.",
    href: "/ponencia-tecnologia/02-herramientas-gratuitas/",
  },
  {
    n: "3",
    t: "Tu laboratorio",
    d: "El quiz de autoevaluación que construimos juntos con el portátil: todos los prompts, los pasos de verificación y cómo publicarlo en tu GitHub.",
    href: "/ponencia-tecnologia/03-laboratorio/",
  },
  {
    n: "4",
    t: "La práctica y la defensa",
    d: "Cómo defender una práctica hecha con un agente delante del tribunal, la regla «si te cambian una línea, respondes» y tu lista de control del día del examen.",
    href: "/ponencia-tecnologia/04-evaluacion/",
  },
];

const LINKS = [
  { t: "YouTube · Aula en la nube", d: "Mis cursos gratuitos (programación, GIMP, OBS, Google…): más de 800 vídeos donde nada te cuesta.", u: "https://www.youtube.com/@aulaenlanube" },
  { t: "YouTube · IA para Docentes", d: "Canal de IA aplicada al aula: la herramienta, el método y las clases donde se ve en uso real.", u: "https://www.youtube.com/@iaparadocentes" },
  { t: "apps-educativas.com", d: "Plataforma gratuita: crea clases, grupos y ejercicios. Convierte el quiz de la sección 3 en una clase real.", u: "https://apps-educativas.com" },
  { t: "Cadenas de prompts", d: "Mis plantillas de prompt organizadas por uso (temas, supuestos, defensa). Copiar y pegar.", u: "/cadenas-de-prompts/" },
  { t: "Insignias.org", d: "Mi blog de metodologías y prácticas: material para tus supuestos didácticos.", u: "https://insignias.org" },
  { t: "OposicionesIA", d: "La plataforma de oposiciones que yo desarrollé: la misma familia de IA, aplicada a estudiar.", u: "https://oposicionesia.com" },
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
      <span className={chip}>Para opositores · Tecnología Secundaria · C. Valenciana</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Herramientas de IA para tu oposición de Tecnología
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-zinc-600">
        Esta es <b>tu plataforma de consulta</b> de la sesión de 2 horas: todo lo que hicimos
        juntos, aquí — cómo atacar los 71 temas con IA, el kit gratuito que dejaste funcionando en
        tu portátil, el proyecto del laboratorio y la estrategia de tu defensa. Vuelve antes de
        cada examen: es el apunte completo, con sus prompts y sus ejercicios de repaso.
      </p>

      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-[15px] text-emerald-900">
        <b>Lo que hicimos en la sesión (itinerario):</b> 10 min de encuadre → <b>Sección 1</b>,
        tu examen y la IA (25 min) → <b>Sección 2</b>, tu kit gratuito (25 min) → pausa →{" "}
        <b>Sección 3</b>, laboratorio con tu portátil (40 min) → <b>Sección 4</b>, la práctica y
        la defensa (25 min) → preguntas. Cada sección de abajo es tu apunte de ese bloque:
        contenido, los prompts que usamos, enlaces y ejercicios para repasar.
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
              <h2 className="text-lg font-bold text-zinc-900 group-hover:text-blue-800">{s.t}</h2>
              <p className="mt-1 text-sm text-zinc-600">{s.d}</p>
            </div>
            <div className="self-center text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600">→</div>
          </Link>
        ))}
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Tu material de referencia</h2>
      <p className="mt-1 text-sm text-zinc-600">
        Todo gratuito y mío: úsalo antes de la sesión y como apunte entre sesiones.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {LINKS.map((l) => {
          const interno = l.u.startsWith("/");
          return interno ? (
            <Link key={l.u} href={l.u} className="group rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-blue-300">
              <div className="text-sm font-bold text-blue-700 group-hover:underline">{l.t} →</div>
              <p className="mt-1 text-xs text-zinc-500">{l.d}</p>
            </Link>
          ) : (
            <a key={l.u} href={l.u} target="_blank" rel="noopener" className="group rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-blue-300">
              <div className="text-sm font-bold text-blue-700 group-hover:underline">{l.t} ↗</div>
              <p className="mt-1 text-xs text-zinc-500">{l.d}</p>
            </a>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-100 p-5 text-sm text-zinc-700">
        <b>Cómo usar esta página:</b> antes del examen, repasa la <b>lista de control</b> de la
        Sección 4 (está pensada para imprimirla). Si te quedaste a medias en el laboratorio, la
        Sección 3 tiene cada prompt copiable para rematarlo desde casa. ¿Dudas de un prompt?
        Míralo también en <Link className="text-blue-700 underline" href="/cadenas-de-prompts/">Cadenas de prompts</Link>.
      </div>

      <div className="mt-6 flex justify-end">
        <PrintButton />
      </div>
    </div>
  );
}
