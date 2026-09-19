import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PromptBlock from "@/components/PromptBlock";

export const metadata: Metadata = {
  title: "Sección 2 · Tu kit gratuito — Ponencia Tecnología — Aula en la Nube",
  description:
    "Las 3 capas de Copilot gratuitas que un opositor de Tecnología puede tener funcionando hoy: Copilot Chat de M365 para Educación, GitHub Copilot en VS Code en modo agente, y cómo exprimir los límites reales.",
};

const chip =
  "inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700";

export default function PonenciaS2() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Programación e IA", path: "/zona-programacion/" },
          { title: "Ponencia Tecnología", path: "/ponencia-tecnologia/" },
          { title: "Sección 2", path: "/ponencia-tecnologia/02-herramientas-gratuitas/" },
        ]}
      />
      <span className={chip}>Sección 2 · Bloque 10:25-10:50 · Portátil sobre la mesa, VS Code abierto</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Tu kit gratuito: lo que ya puedes usar hoy sin pagar ni un euro
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        «Copilot» es confuso: hay varios, y los 3 relevantes para ti son gratis (o ya pagados con
        licencias de tu centro). Van de menor ambición a mayor poder. <b>Objetivo de esta sección:
        que al terminar tengas los 3 funcionando en tu portátil.</b>
      </p>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Capa 1 · Copilot Chat de Microsoft 365 (el de tu licencia Education)</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        Si tu centro tiene <b>Microsoft 365 for Education</b> (la inmensa mayoría en C. Valenciana),
        ya tienes <b>Copilot Chat + Designer</b> incluido en tu licencia, sin coste extra: es la
        capa «de educación» de Microsoft, con contexto de aula y menos restricciones que la personal.
        Sirve para:
      </p>
      <ul className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <li>• <b>Chat de trabajo diario:</b> resumir un tema, generar un supuesto de examen, reformular un objetivo didáctico al lenguaje de la LOMLOE («competencia…», «criterio de evaluación…»). Es el 80 % del trabajo mental del opositor.</li>
        <li>• <b>Designer:</b> genera miniaturas, imágenes para diapositivas y hasta presentaciones sencillas a partir de un texto. Para el examen teórico práctico (si te piden materiales didácticos) es oro puro.</li>
        <li>• <b>Análisis de datos en Excel/Power BI:</b> si te toca la parte de sistemas de control o energía con datos, «¿cuál es la tendencia?» en natural resuelve lo que antes era una fórmula.</li>
      </ul>
      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <b>Cómo verlo ahora mismo:</b> si tienes acceso, <code>microsoft365.com</code> → copilot.
        Si tu centro usa la capa «copilot para educación» de pago (~18 $/usuario al mes, la que
        Microsoft ofrece a centros desde 2025), tu acceso será más completo; <b>compruébalo con tu
        administración antes de la sesión</b> — la parte «free» es Copilot Chat + Designer, y ahí no
        te fías: es la que siempre funciona.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Capa 2 · Copilot en la web/chat (personal, sin licencia)</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        El que se abre con «haz esto» y aparece en el sidebar de Office Web y en el navegador. Gratis
        con cuenta personal de Microsoft. <b>Sus límites:</b> no ve tus ficheros (a menos que se los
        pegues), la memoria es corta, y para lo que hace bien hay 50 herramientas igual de buenas.
        Úsalo como «copa de emergencia», no como cabecera del pipeline.
      </p>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Capa 3 · GitHub Copilot en VS Code (el que programa)</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        <b>Aquí está el que cambia tu parte práctica.</b> VS Code + extensión GitHub Copilot + cuenta de
        GitHub (gratis) → plan gratuito con 50 peticiones de chat y 2.000 autocompletados al mes, y
        <b>modo agente</b>: le encargas «crea una web que…» y te construye el proyecto solo. Es la
        capa que usamos en el laboratorio de la sección 3, y la que más impresiona en la defensa oral.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">Instalación en 10 minutos (se hace en la sesión)</h3>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-zinc-600">
            <li>GitHub.com → Create account → email (2 min)</li>
            <li>VS Code (code.visualstudio.com) → instalar → arrancar (3 min)</li>
            <li>Extend → «GitHub Copilot» → instalar → login con tu cuenta GitHub (2 min)</li>
            <li>Abre una carpeta de trabajo vacía → new terminal → listo (1 min)</li>
          </ol>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <h3 className="text-[15px] font-bold">Los límites reales (para no llevarte la decepción en directo)</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-emerald-900">
            <li>50 chats/mes: con un proyecto razonable te sobran, pero <b>no uses chat para lo que hace autocompletado</b>.</li>
            <li>El agente no ve tu disco a menos que se lo permitas en la carpeta del proyecto.</li>
            <li>Cada petición larga consume créditos: pide <b>paso a paso</b>, no «hazlo todo».</li>
            <li>Si te quedas corto: hay 4 alternativas igualmente gratis, y la misma extensión acepta otras keys — te las enseño si te quedas a medias.</li>
          </ul>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">El prompt que te separa del 90 % de opositores</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        Antes de la sección 3, todos guardamos este prompt. Es la diferencia entre «le he preguntado
        a la IA» y «la he dirigido»:
      </p>
      <PromptBlock text={`# Rol
Eres una persona experta en [el área relevante del tema que estoy preparando].
# Contexto
Estoy preparando la oposición de Tecnología (Secudaria, RD 2007) en C. Valenciana.
Lo que voy a pedirte debe poder defenderse delante de un tribunal técnico:
cero relleno, cifras con unidad, normativas con número y año.
# Reglas de respuesta
1) Nunca inventes normativa: si no hay certeza, márcalo con [COMPROBAR].
2) Cuando veas que te pido algo demasiado grande, dime "pídemelo en X pasos".
3) Responde con estructura: respuesta corta → desarrollo → 3 preguntas incómodas
   que haría un vocal, a las que me pides conteste antes de avanzar.
# Mi encargo
[pega aquí lo que quieras: tema, supuesto, programa didáctico, código...].`}/>

      <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-100 p-5 text-[15px] text-zinc-700">
        <b>Cierran la sección:</b> los tres niveles funcionando. Ahora sí, laboratorio.
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-5">
        <Link href="/ponencia-tecnologia/01-introduccion/" className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← Sección 1
        </Link>
        <Link href="/ponencia-tecnologia/03-laboratorio/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
          Sección 3 · Laboratorio →
        </Link>
      </div>
    </div>
  );
}
