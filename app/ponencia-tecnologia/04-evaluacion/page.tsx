import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Sección 4 · La práctica y la defensa — Ponencia Tecnología — Aula en la Nube",
  description:
    "Cómo defender una práctica hecha con un agente delante del tribunal, la regla «si te cambian una línea, respondes», lo que no debes usar y tu lista de control imprimible del día del examen.",
};

const chip =
  "inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700";

export default function PonenciaS4() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Programación e IA", path: "/zona-programacion/" },
          { title: "Ponencia Tecnología", path: "/ponencia-tecnologia/" },
          { title: "Sección 4", path: "/ponencia-tecnologia/04-evaluacion/" },
        ]}
      />
      <span className={chip}>Sección 4 · La práctica y la defensa</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Tu práctica y tu defensa: cómo no te la descuelguen
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        Con las 3 secciones anteriores ya tienes ventaja. Esta decide el examen: cómo defender la
        parte práctica hecha con un agente, qué hacer cuando el vocal mete nariz en el código, y la
        lista de control que te llevas al examen.
      </p>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">1 · Lo que el tribunal ve (y lo que no)</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        En el examen práctico el tribunal no ve tu portátil — ve <b>el resultado</b>. La pregunta
        que se hacen sin decirlo: «¿esto lo programó él o lo generó una IA?» Ambas respuestas son
        defendibles, pero solo si sabes cuál es la tuya. Esto es lo que debes poder decir:
      </p>
      <div className="mt-4 space-y-3">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <h3 className="text-[15px] font-bold">✔ La defensa correcta, si usaste IA</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-emerald-900">
            <li>Dilo sin miedo: <i>«He usado un agente de código como herramienta, igual que se usa en cualquier empresa»</i>. Puntuas saber dirigir, no teclear.</li>
            <li>Puedes explicar <b>cada función</b> que el agente generó, y <b>reproducir un bug</b> que le diste para que lo corrigiera.</li>
            <li>Enseñas <b>la conversación con el agente</b> como evidencia de tu método, no la escondes.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
          <h3 className="text-[15px] font-bold">✘ Te descuelgan cuando…</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-rose-900">
            <li>El código traía una tecnología que no sabes explicar (le pediste «hazlo bonito» y vino con un framework que no entiendes).</li>
            <li>El vocal cambia un parámetro y <b>no sabes qué pasa</b> en la salida. El agente lo corrigió — tú no.</li>
            <li>La estética es impecable y la lógica, vacía: se nota a distancia que lo «pinta» pero no «funciona».</li>
          </ul>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">2 · La regla «si te cambian una línea, respondes»</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        Las defensas se rompen cuando el vocal dice «y si aquí cambiáis esto, qué pasa». La regla:
        <b> si no estás dispuesto a que toquen una línea, no la lleves</b>. Tu código debe ser
        «tocable»: corto, legible, sin capas de más. Si te generaron 200 líneas y solo usas 60, las
        otras 140 son 140 interrogatorios potenciales.
      </p>
      <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h3 className="text-[15px] font-bold">Tu mini-test antes de la defensa (10 min, en casa)</h3>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-zinc-600">
          <li>Cubre tu solución con una hoja. ¿A que puedes describir qué hace el programa sin mirarlo?</li>
          <li>Descubre la hoja. ¿Puedes explicar cada bloque de 5-10 líneas en una frase?</li>
          <li>Cambia en tu cabeza un parámetro de entrada. ¿Conoces su efecto sobre la salida?</li>
          <li>Si alguna respuesta es «no», <b>recorta ese bloque</b> o estúdialo. No lo lleves a ciegas.</li>
        </ol>
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">3 · Lo que NO debes usar (aunque la IA lo haga muy bien)</h2>
      <ul className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <li>• <b>Tecnologías de moda que no domines</b> (React/Angular/Flutter), a no ser que sepas justificar cada línea.</li>
        <li>• <b>Datos generados al azar</b> para rellenar una gráfica — cualquier vocal de Tecnología nota un dataset inventado a simple vista.</li>
        <li>• <b>Normativa que hayas leído en el chat</b> sin haberla comprobado en el BOE/DOGV: la IA cita normas que no existen. La tuya, verificada, es esta:</li>
        <li>• <b>El quiz de la sección 3 sin tocar</b> — adáptalo a tu tema; llevar tu propia demo sin variarla es invitar a que lo noten.</li>
      </ul>
      <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm text-zinc-700">
        <h3 className="text-[15px] font-bold">Tu marco normativo exacto (cópialo, no lo improvises)</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li><b>Temario:</b> 71 temas fijados por la <b>Orden de 9 de septiembre de 1993</b>, vigente vía Orden ECD/191/2012 — no es el RD 276/2007, que es solo el reglamento del proceso selectivo.</li>
          <li><b>Proceso selectivo (cuerpo 0590, C. Valenciana):</b> RD 276/2007 + Orden 1/2025, de 28 de enero (DOGV 30/01/2025), modificada por Orden 4/2025. Tecnología (590019) no estaba convocada en esa orden: ni plazas ni fechas, [COMPROBAR] en la convocatoria del año.</li>
          <li><b>Parte A (tema):</b> eliges entre cuatro temas, 2 horas, anónimo con etiquetas; criterios ANEXO VI: estructura 10 %, expresión y presentación 10 % (incluido lenguaje inclusivo), conocimiento científico e innovación 80 %.</li>
          <li><b>Parte B (práctica):</b> lo que traes y el tiempo los fija el <b>ANEXO III</b> de la convocatoria para tu especialidad; los criterios los publican las comisiones antes del inicio. Sin A no hay B.</li>
          <li><b>Segunda prueba:</b> programación de aula de una materia y nivel para el curso completo, con <b>mínimo 6 situaciones de aprendizaje desarrolladas</b>; defiendes UNA de ellas. Valenciano C1 requisito de acceso; documento no propio = 0 puntos; no entregar en plazo = renuncia.</li>
          <li><b>Concurso de méritos:</b> ANEXO I. Currículo ESO: Decreto 107/2022 modificado por Decreto 66/2024 (7 competencias específicas propias, no extrapoles las 5 del RD 217/2022).</li>
        </ul>
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">4 · Tu lista de control para el examen (imprime esto)</h2>
      <ol className="mt-3 list-decimal space-y-2 text-[15px] text-zinc-700">
        <li><b>1 herramienta principal</b> (Copilot Chat o Copilot de VS Code) + <b>1 alternativa</b> por si se cae la red (Capa 2).</li>
        <li>El <b>prompt de rol</b> de la sección 2 en papel, listo para pegarlo.</li>
        <li>Tu <b>quiz publicado en GitHub</b> con su enlace de GitHub Pages.</li>
        <li><b>Capturas</b> del código y del quiz para la diapositiva de la práctica.</li>
        <li><b>15 min de simulacro</b>: le enseñas tu quiz a alguien y le pides que cambie una línea.</li>
      </ol>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">🎧 La sesión, otra vez</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        La sesión se graba íntegra. Al día siguiente tendrás aquí el enlace a la grabación completa
        y, por bloque, un resumen en audio y un resumen escrito de 10 líneas:
      </p>
      <ul className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <li>• <b>Escucha el audio de este bloque estudiando o andando</b> — la estrategia de defensa repasada a pie, sin pantalla.</li>
        <li>• <b>¿Faltaste o te perdiste algo?</b> El resumen en audio sustituye a la clase: escúchalo y vuelve a este apunte antes de imprimir la lista de control.</li>
        <li>• <b>El resumen escrito de 10 líneas</b> te devuelve lo esencial del bloque cuando solo tienes un minuto.</li>
      </ul>

      <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-[15px] text-blue-900">
        <b>Cierre de la ponencia:</b> no vengas al examen a demostrar que sabes código. Vengas a
        demostrar que <b>sabes dirigir una herramienta de código</b>: verificas, sabes explicar por
        qué cada línea está ahí, y el resultado funciona. En 2026, eso <i>es</i> saber programar.
      </div>

      <div className="mt-6 flex justify-end">
        <PrintButton />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-5">
        <Link href="/ponencia-tecnologia/03-laboratorio/" className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← Sección 3
        </Link>
        <Link href="/ponencia-tecnologia/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
          Portada de la ponencia →
        </Link>
      </div>
    </div>
  );
}
