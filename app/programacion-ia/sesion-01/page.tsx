import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PromptBlock from "@/components/PromptBlock";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Sesión 1 · Crear tu web personal — Curso de Programación con IA",
  description:
    "Sesión 1 del primer proyecto (web personal de marca): HTML, CSS y JS paso a paso con el chat del centro, prompts copiables y checklist de entrega.",
};

const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";
const meta =
  "rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 px-3 py-1 text-[12px] font-semibold text-zinc-700 dark:text-zinc-300";

function Paso({ n, t, children }: { n: string; t: string; children: React.ReactNode }) {
  return (
    <section className="my-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
      <h3 className="flex flex-wrap items-center gap-3 text-[17px] font-bold">
        <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-slate-700 text-sm font-extrabold text-white">
          {n}
        </span>
        {t}
      </h3>
      <div className="mt-2 space-y-2 text-[15px] text-zinc-700 dark:text-zinc-300">{children}</div>
    </section>
  );
}

export default function CursoIASesion1() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Curso de Programación con IA", path: "/programacion-ia/" },
          { title: "Web personal de marca", path: "/programacion-ia/web-personal/" },
          { title: "Sesión 1", path: "/programacion-ia/sesion-01/" },
        ]}
      />
      <span className={chip}>1º DAM · Proyecto web personal · Sesión 1 (fase)</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Tu web personal con IA
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Primera fase del proyecto: una <b>landing de marca personal</b>. La construyes <b>directamente desde el
        chat</b> con los modelos del centro, gestionando tú los ficheros. Sin API todavía: tú
        diriges, la IA ejecuta. Esta fase puede ocupar más de una clase —la próxima seguimos mejorando
        la web—: avanzamos a vuestro ritmo.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={meta}>🎯 Web personal</span>
        <span className={meta}>📁 HTML + CSS + JS</span>
        <span className={meta}>💬 Chat del centro</span>
        <span className={meta}>📤 Entrega: carpeta + se enseña en clase</span>
      </div>

      <div className="my-5 rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-5 text-[15px] text-amber-900 dark:text-amber-200">
        <b>Antes de empezar:</b> crea una carpeta llamada <code>mi-web</code> en tu cuenta. Ahí irán
        los tres ficheros. Todo lo que te responda la IA lo <b>tú copias, pegas, guardas y pruebas
        en el navegador</b>. Si sale raro, no es culpa de la IA: vuelve a pedirlo mejor. Eso también
        es programar.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">¿Qué vamos a montar?</h2>
      <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">Una web real = una carpeta con ficheros. Lo mínimo:</p>
      <pre className="my-3 overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 p-4 font-mono text-[13.5px] leading-relaxed text-zinc-800 dark:text-zinc-200">
{`mi-web/
├── index.html   ← la estructura (qué hay)
├── style.css    ← el estilo (cómo se ve)
└── script.js    ← la interacción (qué hace)`}
      </pre>
      <p className="text-[15px] text-zinc-600 dark:text-zinc-400">
        Una web compleja, además, base de datos. Eso llegará con el proyecto final en grupo. Hoy
        dominan el trío: estructura, estilo, comportamiento.
      </p>

      <Paso n="1" t="Pensar antes de pedir">
        <p>La IA no sabe quién eres. Rellena esta ficha en un <code>notas.txt</code> dentro de <code>mi-web</code> (la usarás en el paso 2):</p>
        <ul className="list-disc space-y-1 pl-6 text-sm text-zinc-600 dark:text-zinc-400">
          <li>Nombre y apellidos + <b>una frase</b> que diga quién eres</li>
          <li>3-5 «cosas que he hecho» (curso, hobby, proyecto, viaje, deporte)</li>
          <li>3 cosas que me gustan (música, series, videojuegos, tecnología…)</li>
          <li>Qué quiero ser / qué me interesa de la programación</li>
          <li>3 colores o estilo que te va (minimalista, gamer, retro, oscuro…)</li>
        </ul>
      </Paso>

      <Paso n="2" t="El HTML: pedirlo con condiciones">
        <p>Copia este prompt, pégalo en el chat del centro y <b>complétalo con tu ficha</b> (eso es lo que lo convierte en tu web, no en la de nadie):</p>
        <PromptBlock text={`Quiero crear mi web personal de marca con HTML, CSS y JS puros. Voy a gestionar yo los ficheros,
así que dame el código completo de cada fichero en un bloque, sin explicaciones largas.

Ficha: soy ___, del ciclo de 1º DAM del IES Simarro.
Cosas que he hecho: ___
Me gusta: ___
Quiero ser / me interesa: ___
Colores/estilo: ___

Haz el index.html con: cabecera (nombre + frase), "Sobre mí", "Lo que he hecho",
"Me gusta", un pie de página con contacto. HTML semántico, etiquetas comentadas.`} />
        <div className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-4 text-sm text-blue-900 dark:text-blue-200">
          <b>El truco del profesional:</b> pide, pega, guarda… y <b>ábrela en el navegador</b>.
          Comprueba que están todos los bloques, pruébala estrecha (como en el móvil) y, si algo no
          se ve como lo pediste, pídele a la IA el cambio concreto: eso también es programar.
        </div>
      </Paso>

      <Paso n="3" t="Compruébala antes de seguir">
        <p>
          Abre el <code>index.html</code> en el navegador. ¿Están los bloques en orden? ¿Se ve tu
          nombre? ¿Y al achicar la ventana (modo móvil)? Si algo no cuadra, se lo describes a la IA
          y pides el arreglo concreto.
        </p>
        <PromptBlock text={`En mi web falta / se ve mal: ___ (describe lo que ves, no lo que crees).
Dame el HTML corregido de ese bloque y por qué pasaba.`} />
      </Paso>

      <Paso n="4" t="CSS: que se vea tuyo">
        <PromptBlock text={`Genera el style.css para mi web personal.
- Paleta basada en los colores que te dije: ___
- Cabecera con fondo de color, texto legible, tipografía limpia
- Contenido centrado, ancho máx 900px, espaciado generoso
- Cuadrícula de 2 columnas para "Me gusta", adaptada a móvil (1 columna)
- Estilo de enlaces y botones coherente con la marca
Sin frameworks. Solo CSS puro, comentado.`} />
        <p>Prueba a cambiar un color o una medida tú directamente: lo que editas a mano lo entiendes doble.</p>
      </Paso>

      <Paso n="5" t="JS: interactividad a elegir">
        <p>Pide <b>una</b> (luego otra si te sobra tiempo). Elige tú, no la IA:</p>
        <ul className="list-disc space-y-1 pl-6 text-sm text-zinc-600 dark:text-zinc-400">
          <li><b>Modo oscuro</b> con botón (guardando la preferencia en <code>localStorage</code>)</li>
          <li><b>Efecto máquina de escribir</b> en tu frase de presentación</li>
          <li><b>Menú responsive</b> (hamburguesa en móvil)</li>
          <li><b>Contador</b> de «cosas que he hecho» que se despliega al hacer clic</li>
          <li><b>Fondo de partículas</b> sutil</li>
        </ul>
        <PromptBlock text={`Añade a mi web personal (tengo index.html y style.css, te pego el HTML):
[pega aquí tu index.html]
Quiero ___ (ej: un botón de modo oscuro que recuerde la elección con localStorage).
Dame el script.js completo y las líneas exactas que debo añadir al HTML y al CSS,
indicando dónde van. Comenta el código.`} />
      </Paso>

      <Paso n="6" t="Iterar: la parte que te hace programador">
        <p>Tu web ya funciona. Ahora la mejoras con <b>3 iteraciones cortas</b> (peticiones concretas, no «arregla todo»):</p>
        <PromptBlock text={`Iteración: en la sección "Sobre mí", añade una foto con estilo ___ y que la frase
de cabecera use un degradado de mis colores. No cambies nada más.`} />
        <PromptBlock text={`Iteración: en el móvil el menú se apila mal: ___(describe lo que ves).
Dame solo el CSS que lo arregla y por qué pasaba.`} />
      </Paso>

      <Paso n="7" t="Entrega">
        <p>Sube la carpeta <code>mi-web</code> al sitio que indique el profe. En la <a href="/programacion-ia/sesion-02/" className="font-semibold underline">sesión 2</a> aprenderás a tenerla además en GitHub, tu copia de seguridad del curso. Checklist:</p>
        <ul className="mt-2 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
          <li>☐ Se abre y se ve bien en escritorio y en móvil</li>
          <li>☐ Tiene mis datos reales (nombre, hechos, gustos)</li>
          <li>☐ He editado al menos una cosa a mano y lo sé explicar</li>
          <li>☐ Al menos una interacción JS funciona</li>
          <li>☐ Sé contar qué bloques tiene mi web y cómo cambiarlos</li>
        </ul>
      </Paso>

            <div className="my-5 rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-5 text-[15px] text-amber-900 dark:text-amber-200">
        <b>Criterio:</b> no vale «me lo hizo la IA». Vale: la web funciona, sabes contar qué tiene y
        qué cambiarías, y se ve que decides tú. En clase la enseñarás y responderás 2-3 preguntas
        sobre ella (sin leer el código línea a línea: entendiendo cómo funciona).
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Kit de rescate</h2>
      <details className="my-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4">
        <summary className="cursor-pointer text-[15px] font-bold text-zinc-800 dark:text-zinc-200">«No sé cómo pedir lo que quiero»</summary>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Prompt: <i>«Quiero que mi web se parezca a ___ (describe sensaciones: sobria, colorida, tipo portfolio…). Pregúntame 5 cosas una por una y luego diséñame el estilo.»</i> — que la IA te entreviste.</p>
      </details>
      <details className="my-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4">
        <summary className="cursor-pointer text-[15px] font-bold text-zinc-800 dark:text-zinc-200">«La IA me da el código en trozos y no sé dónde va»</summary>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Prompt: <i>«Dame el fichero completo, no fragmentos, e indica con comentarios qué parte es nueva.»</i> Y si no: <i>«dime exactamente la línea donde insertar esto»</i>.</p>
      </details>
      <details className="my-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4">
        <summary className="cursor-pointer text-[15px] font-bold text-zinc-800 dark:text-zinc-200">«Se me ha roto algo al tocar el CSS»</summary>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Prompt: <i>«Mi web estaba así: [pega el CSS]. Al añadir ___ dejó de funcionar ___. ¿Qué está mal y por qué?»</i> — Pegar el código roto es el 90 % del debugging.</p>
      </details>
      <details className="my-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4">
        <summary className="cursor-pointer text-[15px] font-bold text-zinc-800 dark:text-zinc-200">«¿Puedo usar cualquier IA?»</summary>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Puedes usar la que quieras —incluidos los agentes del centro—, pero el trabajo de revisar, comprender y decidir es tuyo, no de la herramienta. Si en clase no lo sabes explicar, no cuenta.</p>
      </details>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 dark:border-white/10 pt-5">
        <Link href="/programacion-ia/web-personal/" className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5">
          ← Volver al proyecto
        </Link>
        <PrintButton />
      </div>
    </div>
  );
}
