import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PromptBlock from "@/components/PromptBlock";

export const metadata: Metadata = {
  title: "Sección 3 · Laboratorio — Ponencia Tecnología — Aula en la Nube",
  description:
    "La parte de portátil encendido: construir con GitHub Copilot en VS Code una web interactiva de programación didáctica (quiz o calculadora temática) en 40 minutos, paso a paso.",
};

const chip =
  "inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700";

export default function PonenciaS3() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Programación e IA", path: "/zona-programacion/" },
          { title: "Ponencia Tecnología", path: "/ponencia-tecnologia/" },
          { title: "Sección 3", path: "/ponencia-tecnologia/03-laboratorio/" },
        ]}
      />
      <span className={chip}>Sección 3 · Bloque 10:55-11:35 · El portátil trabaja, el profe pasa por sitios</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Laboratorio: construimos una herramienta con el portátil
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        Objetivo: en 40 minutos, <b>un mini-programa funcional que puedes enseñar en la oral y que
        demuestra que sabes programar agéntico</b>. Elegí un proyecto a propósito: no es una app
        «bonita y hueca», es algo que ya te sirve para tu programación didáctica — un <b>quiz de
        autoevaluación</b> (o una calculadora de un tema tuyo) como página web única, HTML+CSS+JS,
        sin frameworks, sin instalaciones: la ejecutas en cualquier PC del tribunal.
      </p>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Por qué «web con quiz» y no algo más gordo</h2>
      <ul className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <li>• Encaja <b>literalmente</b> en el temario (TIC, programación, didáctica, sistemas de información).</li>
        <li>• <b>Funciona offline en cualquier PC</b> — no dependes del proyector del tribunal.</li>
        <li>• El profe puede demostrar <b>el método</b> (especificar → delegar → verificar) en una sesión, no el framework.</li>
        <li>• Se puede adaptar a TU tema fuerte: calculadora de energía, conversor de materiales, simulador básico de un circuito…</li>
      </ul>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Paso 0 · El escenario (2 min)</h2>
      <ol className="mt-3 list-decimal space-y-2 text-[15px] text-zinc-700">
        <li>VS Code → «Open Folder» → crea <code>~/ponencia/quiz</code> (carrucha vacía, 30 seg).</li>
        <li>En el panel, <b>Chat</b> de Copilot, y el encargo (escribe o copia):</li>
      </ol>
      <PromptBlock text={`Crea en esta carpeta un quiz web de autoevaluación sobre [TU TEMA, p. ej. "transformadores y distribución de energía"],
para la oposición de Tecnología Secundaria.

Requisitos duros:
1) Un único index.html + styles.css + quiz.js (sin frameworks, sin build).
2) 8 preguntas tipo test de una sola respuesta, con 2-3 distractores creíbles CADA una
   (no obvios: si no sabías la respuesta, no deberías descartar 3 de 4 al vuelo).
3) Al terminar: puntuación sobre 8, y por cada pregunta incorrecta, 1 línea de
   justificación de por qué era la respuesta correcta (la explicación didáctica es
   tan importante como la pregunta).
4) Diseño digno: 1 sola pregunta visibles, botón "Siguiente", barra de progreso,
   tipografía legible, responsive para pantallas táctiles.
5) No uses librerías externas ni CDN: si el tribunal no tiene internet, debe funcionar.`}/>
      <p className="mt-2 text-[15px] text-zinc-700">
        <b>Mientras genera (2-4 min):</b> todos abriendo en paralelo el <b>Prompt de rol de la
        sección 2</b> como chat de referencia. Cuando el agente acabe, ya tienes 3 ficheros en el
        explorador de VS Code.
      </p>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Paso 1 · Verificar (10 min) — la parte que marca la diferencia</h2>
      <ol className="mt-3 list-decimal space-y-2 text-[15px] text-zinc-700">
        <li><b>Corre el código</b>: terminal de VS Code → <code>npx serve .</code> (o dobleclick al HTML). Abre el navegador, juega el quiz entero.</li>
        <li><b>Revisa las 8 preguntas</b>: ¿son creíbles? ¿las respuesta es correcta? <b>Si la IA falló alguna, corrígela en el JS y di «esto lo he verificado yo». Esa frase vale un punto en la oral.</b></li>
        <li><b>Busca el fallo clásico</b>: el distractor «todas las anteriores» que es la correcta, el texto que queda medio cortado en móvil, el botón que se queda a negro tras el reinicio del quiz.</li>
        <li>Pide al agente el arreglo: <code>«El botón "Reiniciar" no limpia el estado: fíjalo sin tocar el resto»</code>. Verifica otra vez.</li>
      </ol>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Paso 2 · Mejorar (15 min) — aquí es donde enseñas a <i>dirigir</i></h2>
      <p className="mt-2 text-[15px] text-zinc-700">Tres mejoras, en este orden (cada una una petición de chat, con verificación entre medio):</p>
      <ol className="mt-3 list-decimal space-y-2 text-[15px] text-zinc-700">
        <li><b>«Añade un modo "examen" que oculta las explicaciones hasta el final y guarda el mejor resultado en localStorage»</b> — demuestra que el programa persiste.</li>
        <li><b>«Cambia la estética: colores sobrios, una cabecera con el nombre del tema y un pie con el logo "IES Simarro · Excelencia IA"»</b> — marca personal en el código, un voto de confianza del tribunal.</li>
        <li><b>«Añade un botón "Compartir resultado" que genera el texto para WhatsApp/Telegram con la puntuación y el mejor acierto»</b> — 15 líneas de JS, la IA la genera en 10 seg.</li>
      </ol>
      <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-[15px] text-blue-900">
        <b>El truco de oro del laboratorio:</b> cuando te atasques, NO hagas «ayúdame». Haz{" "}
        <code>«¿por qué hace esto?»</code> o <code>«explica el bug antes de arreglarlo»</code>.
        La IA te enseña; tú diriges. Si no entiendes la respuesta de la IA, sigue preguntando hasta
        que lo entiendas. <b>Eso es el criterio del profe.</b>
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Paso 3 · Publicar y llevar a casa (10 min)</h2>
      <ol className="mt-3 list-decimal space-y-2 text-[15px] text-zinc-700">
        <li><b>GitHub</b>: crea un repo <code>quiz-oposicion</code>, sube los 3 ficheros (3 min, la IA te lo enseña paso a paso en el chat: <code>«sube esta carpeta a mi repo quiz-oposicion, sin .gitignore porque no tiene secretos»</code>).</li>
        <li><b>GitHub Pages</b>: repo → Settings → Pages → Deploy from branch → index.html. En 1 min tienes <code>https://TUUsuario.github.io/quiz-oposicion/</code> — <b>ese link lo pones en la defensa</b> y se abre desde el PC del vocal sin instalar nada.</li>
        <li><b>Fotografía</b>: una captura del quiz funcionando en el portátil + una del código en VS Code. Esa imagen en una diapositiva de la práctica oral vende más que diez párrafas de diseño.</li>
      </ol>

      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-[15px] text-emerald-900">
        <b>Cierre de la sección:</b> en 40 minutos tienes un programa funcional, verificado por
        vosotros, en GitHub y online. <b>Ya sabes programar agéntico</b>, y en la oral lo enseñas
        con el portátil abierto — mucho más potente que una diapositiva.
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-5">
        <Link href="/ponencia-tecnologia/02-herramientas-gratuitas/" className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← Sección 2
        </Link>
        <Link href="/ponencia-tecnologia/04-evaluacion/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
          Sección 4 · IA en el examen →
        </Link>
      </div>
    </div>
  );
}
