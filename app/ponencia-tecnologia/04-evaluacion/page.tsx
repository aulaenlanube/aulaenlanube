import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Sección 4 · IA en el examen — Ponencia Tecnología — Aula en la Nube",
  description:
    "Cómo usar IA en la parte práctica sin que la descuelguen, cómo defender una práctica con un agente delante del tribunal, y la lista de control que te aparta de una mala defensa.",
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
      <span className={chip}>Sección 4 · Bloque 11:40-12:05 · Vuelta a la charla, el portátil como prueba</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        IA en el examen: la práctica, la defensa y lo que te aparta de una mala valoración
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        Las 2 secciones anteriores ya te dan ventaja. Esta última es la que decide: qué hace
        distinto un opositor que <b>sabe usar IA en el examen</b> de uno que la usa por miedo.
      </p>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">1 · La práctica con IA: lo que el tribunal ve (y lo que no)</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        En el examen práctico, el tribunal no ve tu portátil — ve el <b>resultado</b>. La pregunta
        que se hacen, sin decirlo, es: «¿esto lo programó él o lo generó una IA?» Las dos respuestas
        son defendibles, pero solo si sabes cuál de las dos es la tuya. Esto es lo que les va a
        permitir defenderlo con convicción:
      </p>
      <div className="mt-4 space-y-3">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <h3 className="text-[15px] font-bold">✔ Si lo generó con IA — la defensa correcta</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-emerald-900">
            <li>Dilo sin miedo: <i>«He usado un agente de código como herramienta de desarrollo, igual que hoy se usa en cualquier empresa»</i>. Lo que puntuas es <b>saber dirigir</b>, no teclear.</li>
            <li>Eres capaz de explicar <b>cada función</b> que el agente te generó, y de <b>reproducir el bug</b> que le diste para que lo corrigiera.</li>
            <li>Tienes <b>la conversación con el agente</b> (chat o log) como evidencia del método: lo enseñas con orgullo, no lo escondes.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
          <h3 className="text-[15px] font-bold">✘ Se descuelga cuando…</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-rose-900">
            <li>El código tiene <b>un framework que no sabes explicar</b> (le pediste «hazlo bonito» y vino con React sin entender nada).</li>
            <li>El vocal cambia un parámetro en el código y <b>no sabes qué pasa</b>. El agente lo corrigió, tú no.</li>
            <li>La estética es impecable y la lógica, vacía: se nota de lejos que «pinta» sin «funcionar».</li>
          </ul>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">2 · La regla «si el vocal cambia una línea, tú respondes»</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        La defensa oral rompe cuando el vocal dice «y si aquí cambio esto, ¿qué pasa?». La regla
        para no romperse: <b>si no estás dispuesto a que toquen una línea, no la incluyas</b>. Tu
        código debe ser «tocable»: corto, legible, sin capas innecesarias. Si te han generado 200
        líneas y solo usas 60, las otras 140 son 140 interrogatorio-potenciales.
      </p>
      <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h3 className="text-[15px] font-bold">El mini-test antes de la defensa (10 min, en casa)</h3>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-zinc-600">
          <li>Cubre tu solución con una hoja. ¿Sabrías describir qué hace el programa sin mirarla?</li>
          <li>Abre la hoja. ¿Podrías explicar cada bloque de 5-10 líneas en una frase?</li>
          <li>Cambia en tu cabeza un parámetro de entrada. ¿Sabes el efecto en la salida?</li>
          <li>Si alguna respuesta es «no», <b>recorta ese bloque</b> o estudialo. No lo lleves a ciegas.</li>
        </ol>
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">3 · Lo que NO debes usar en el examen (aunque la IA lo haga muy bien)</h2>
      <ul className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <li>• <b>Frameworks «de moda» que no domines</b> (React/Angular/Flutter) — a menos que puedas justificar cada línea y el vocal no te atrape.</li>
        <li>• <b>Generación aleatoria de datos</b> para «rellenar gráficas» — un vocal de Tecnología nota un dataset inventado al instante.</li>
        <li>• <b>Normativa que hayas visto en el chat</b> sin comprobar el boe. La IA cita RDs que no existen.</li>
        <li>• <b>El quiz de la sección 3 tal cual</b> — adáptalo, o hazlo tuyo (otro tema, otra estética). Copiar tu propia demo sin variarla es pedir que lo noten.</li>
      </ul>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">4 · La lista de control de la sesión (llevala impreso)</h2>
      <ol className="mt-3 list-decimal space-y-2 text-[15px] text-zinc-700">
        <li><b>1 herramienta principal</b> (Chat de M365 o Copilot en VS Code) + 1 alterativa para si se cae la red.</li>
        <li><b>El prompt de rol</b> de la sección 2, pegado en un papel, listo para copiar.</li>
        <li>El <b>quiz de la sección 3 en tu GitHub</b>, ya funcionando y con link de GitHub Pages.</li>
        <li>Una <b>captura</b> del código + del quiz para tu diapositiva de práctica.</li>
        <li>5 min de <b>simulacro de defensa</b> con un compañero: le enseñas el quiz y te cambia algo.</li>
      </ol>

      <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-[15px] text-blue-900">
        <b>Cierre de la ponencia:</b> no vengas a este examen a demostrar que sabes código. Vengas a
        demostrar que <b>sabes dirigir una herramienta de código</b> — que verificas, que dices por
        qué cada línea está ahí, y que el resultado funciona. En 2026, eso <i>es</i> saber programar.
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-5">
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
