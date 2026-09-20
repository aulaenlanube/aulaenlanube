import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PromptBlock from "@/components/PromptBlock";

export const metadata: Metadata = {
  title: "Sección 3 · Tu laboratorio — Ponencia Tecnología — Aula en la Nube",
  description:
    "Lo que construimos juntos con el portátil: un quiz de autoevaluación como web offline, con todos los prompts copiables, los pasos de verificación y cómo dejarlo publicado en tu GitHub.",
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
      <span className={chip}>Sección 3 · Tu laboratorio</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Tu proyecto: el quiz de autoevaluación
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        Esto es lo que hicimos juntos en el bloque de portátil. Si te lo llevaste funcionando,
        esta página es tu apunte para adaptarlo a TU tema antes del examen. Si te quedaste a
        medias, <b>todo está aquí con sus prompts para rematarlo desde casa</b>.
      </p>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Por qué «quiz web» y no algo más gordo</h2>
      <ul className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <li>• Encaja literalmente en tu temario (TIC, programación, evaluación, didáctica).</li>
        <li>• <b>Funciona offline en cualquier PC</b> — sin dependencias del proyector del tribunal.</li>
        <li>• Demuestra el método (especificar → delegar → verificar) sin que el framework sea el protagonista.</li>
        <li>• Lo adapta a TU tema fuerte: energía, materiales, circuitos… Cambias el contenido, no el esqueleto.</li>
      </ul>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Paso 0 · Tu encargo (así lo hicimos)</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        Carpeta <code>~/ponencia/quiz</code> abierta en VS Code, chat de Copilot, y este encargo
        (copia y cambia solo el tema):
      </p>
      <PromptBlock text={`Crea en esta carpeta un quiz web de autoevaluación sobre [TU TEMA, p. ej. "transformadores y distribución de energía"],
para la oposición de Tecnología Secundaria.

Requisitos duros:
1) Un único index.html + styles.css + quiz.js (sin frameworks, sin build).
2) 8 preguntas tipo test de una sola respuesta, con 2-3 distractores creíbles CADA una
   (no obvios: si no sabías la respuesta, no deberías descartar 3 de 4 al vuelo).
3) Al terminar: puntuación sobre 8, y por cada pregunta incorrecta, 1 línea de
   justificación de por qué era la respuesta correcta (la explicación didáctica es
   tan importante como la pregunta).
4) Diseño digno: 1 sola pregunta visible, botón "Siguiente", barra de progreso,
   tipografía legible, responsive para pantallas táctiles.
5) No uses librerías externas ni CDN: si el tribunal no tiene internet, debe funcionar.`}/>
      <p className="mt-3 text-sm text-zinc-600">
        El agente tardó 2–4 min y dejó 3 ficheros en TU carpeta. El tuyo está en{" "}
        <code>~/ponencia/quiz</code>. No lo borres: es el punto de partida de todo lo que viene.
      </p>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Paso 1 · Verificar (lo que separa tus defensas)</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        La parte más importante de toda la sesión. <b>No es opcional</b>: si no verificas, estás
        defendiendo lo que la IA cree que hace, no lo que hace.
      </p>
      <ol className="mt-3 list-decimal space-y-2 text-[15px] text-zinc-700">
        <li><b>Corre el código</b>: terminal de VS Code → <code>npx serve .</code> (o dobleclick en el <code>index.html</code>). Juega el quiz entero, de principio a fin.</li>
        <li><b>Revisa las 8 preguntas</b>: ¿son creíbles? ¿la respuesta correcta lo es de verdad? <b>Si la IA falló alguna, corrígela tú en el JS</b> y anótala mentalmente para la defensa: «esto lo he verificado y corregido yo».</li>
        <li><b>Busca los fallos clásicos</b> (los que vimos juntos): el distractor «todas las anteriores» que resulta correcto, texto cortado en móvil, el botón que se queda negro tras reiniciar.</li>
        <li>Pide al agente cada arreglo por separado: <i>«El botón Reiniciar no limpia el estado: arrégalo sin tocar el resto»</i>. Verifica otra vez.</li>
      </ol>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Paso 2 · Mejorar (3 peticiones, en orden)</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        Estas tres mejoras son las que hicimos en la sesión. Si no llegaste, hazlas ahora — cada
        una es una petición de chat + verificación:
      </p>
      <ol className="mt-3 list-decimal space-y-2 text-[15px] text-zinc-700">
        <li><b>Modo examen</b>: <i>«Añade un modo examen que oculta las explicaciones hasta el final y guarda mi mejor resultado en localStorage»</i> — demuestra que el programa persiste datos.</li>
        <li><b>Tu marca</b>: <i>«Cambia la estética: sobria, cabecera con el nombre exacto del tema, y al pie mi nombre. Nada de logos ajenos»</i> — tu firma en el código es una señal de autoría.</li>
        <li><b>Compartir resultado</b>: <i>«Añade un botón Compartir que copia al portapapeles el texto para pegar en WhatsApp con mi puntuación»</i> — 15 líneas de JS, 10 segundos de agente.</li>
      </ol>
      <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-[15px] text-blue-900">
        <b>El truco que no debes olvidar:</b> cuando te atques, no escribas «ayúdame». Escribe{" "}
        <i>«¿por qué hace eso?»</i> o <i>«explícame el bug antes de arreglarlo»</i>. Si no
        entiendes la explicación, sigue preguntando hasta que la entiendas. <b>Eso es el criterio
        de opositor, y es lo que el tribunal no puede generarte.</b>
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Paso 3 · Publicar (que no se quede en el portátil)</h2>
      <ol className="mt-3 list-decimal space-y-2 text-[15px] text-zinc-700">
        <li><b>Sube a GitHub</b>: repo <code>quiz-oposicion</code> con los 3 ficheros. En el chat: <i>«sube esta carpeta a mi repo quiz-oposicion; no tiene secretos»</i> — la IA guía el git paso a paso.</li>
        <li><b>GitHub Pages</b>: repo → Settings → Pages → desde la rama principal. En 1 min tienes <code>https://TUusuario.github.io/quiz-oposicion/</code>. <b>Ese link va en tu defensa</b>: el vocal lo abre desde su PC sin instalar nada.</li>
        <li><b>Capturas</b>: una del quiz funcionando + una del código en VS Code. Van en la diapositiva de la práctica — venden más que diez párrafos.</li>
      </ol>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">✏️ Tu material de repaso</h2>
      <ul className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <li>• <b>Esta semana:</b> remata el proyecto que te quedaste a medias usando los bloques de arriba. Objetivo: un quiz funcionando, verificado y con link de GitHub Pages.</li>
        <li>• <b>Adáptalo 100 % a TU tema</b>: 8 preguntas nuevas, tu título, tu nombre. «El quiz de la ponencia sin tocar» = copiado.</li>
        <li>• <b>Extensión (si te sobra tiempo):</b> pídele <i>«añade un temporizador de 5 minutos por pregunta y un resumen final de mis aciertos por bloque»</i> — dos funciones de examen real, y más material para tu defensa.</li>
        <li>• <b>Conviértelo en clase:</b> con <a href="https://apps-educativas.com" target="_blank" rel="noopener" className="text-blue-700 underline">apps-educativas.com</a> puedes crear una clase real con ese quiz: un extra que el tribunal de Secundaria valora.</li>
      </ul>

      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-[15px] text-emerald-900">
        <b>Cierre de la sección:</b> ya sabes programar agéntico — especificar, delegar, verificar,
        dirigir. En la defensa lo enseñas con el portátil abierto; eso no se imita con
        diapositivas.
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-5">
        <Link href="/ponencia-tecnologia/02-herramientas-gratuitas/" className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← Sección 2
        </Link>
        <Link href="/ponencia-tecnologia/04-evaluacion/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
          Sección 4 · La práctica y la defensa →
        </Link>
      </div>
    </div>
  );
}
