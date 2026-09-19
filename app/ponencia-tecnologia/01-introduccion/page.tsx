import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Sección 1 · La oposición y la IA — Ponencia Tecnología — Aula en la Nube",
  description:
    "Qué ha cambiado en la oposición de Tecnología, cómo usar IA para preparar los 71 temas, y cómo la IA ya es competencia didáctica: el encuadre de la ponencia.",
};

const chip =
  "inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700";

export default function PonenciaS1() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Programación e IA", path: "/zona-programacion/" },
          { title: "Ponencia Tecnología", path: "/ponencia-tecnologia/" },
          { title: "Sección 1", path: "/ponencia-tecnologia/01-introduccion/" },
        ]}
      />
      <span className={chip}>Sección 1 · Bloque 10:00-10:25 · Solo cabeza (portátil aún en la mochila)</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        La oposición de Tecnología, y la IA que ya no se puede ignorar
      </h1>

      <p className="mt-4 text-lg text-zinc-600">
        Antes de tocar ninguna herramienta, pongamos en común qué va y qué no ha cambiado. Porque el
        error clásico —y caro— del opositor es aplicar la IA donde no vale (y que el tribunal lo
        note) o no aplicarla donde sí vale (y perder tiempo que otros no pierden).
      </p>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">1 · El terreno: 71 temas, un temario, dos partes</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        El temario nacional de Tecnología en Secundaria está regulado por el{" "}
        <b>Real Decreto 276/2007</b> y son <b>71 temas</b>: energía, materiales, estructuras, sistemas de
        control, instalaciones, electrónica, dibujo técnico, TIC y programación, y la didáctica
        correspondiente. Lo primero que hay que saber de este terreno:
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">📚 Parte teórica: qué NO ha cambiado</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600">
            <li>El temario <b>sigue siendo el mismo</b>. La IA no ha cambiado qué se pregunta (energía, materiales, sistemas de control…).</li>
            <li>La <b>práctica</b> sigue midiendo saber aplicar conceptos tecnológicos a situaciones reales.</li>
            <li>La <b>defensa oral sigue siendo oral</b>: si la IA escribió un fragmento y tú no lo entiendes, el tribunal no sabe quién escribió el tema.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <h3 className="text-[15px] font-bold">🚀 Qué SÍ ha cambiado (y a tu favor)</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-emerald-900">
            <li><b>Velocidad de síntesis:</b> lo que antes era leer 4 temas enteros ahora es 20 minutos de IA bien dirigida + tu lectura crítica.</li>
            <li><b>La didáctica con IA ya es pregunta legítima</b>: «cómo integras IA en tu aula de Tecnología» es un supuesto de examen plausible en 2026.</li>
            <li><b>La práctica:</b> un agente que ejecuta código te da un laboratorio de bolsillo que no dependía de la versión del examen.</li>
          </ul>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">2 · Cómo atacar los 71 temas con IA (y que no te la descubran)</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        Regla número uno: <b>la IA trabaja para que TÚ entiendas, no para que la IA escriba por tí</b>.
        Si el tribunal sospecha que un tema está redactado por un modelo, lo único que le importa es si
        puedes defender cada párrafa. Cuatro modos de uso que les voy a enseñar a usar hoy mismo:
      </p>
      <div className="mt-4 space-y-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">① Mapa mental del tema en 10 minutos</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Antes de estudiar un tema: pídele a la IA un mapa del contenido + preguntas que un tribunal
            haría + palabras clave que <b>debes</b> saber definir de memoria. El tema sigue estudiándose;
            la IA te ahorra la primera hora de desorden. <b>Este mapa es tuyo, para estudiar; no se entrega.</b>
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">② «Escríbeme el tema como si fuese un vocal»</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Prompt clásico: <i>«Redacta el tema X de la oposición de Tecnología (Secundaria, RD 276/2007)
            con estructura de suposición: introducción, desarrollo por apartados, supuestos de
            aplicación y bibliografía. Tono pro, sin relleno.»</i> La IA da un esqueleto sólido; <b>tú
            relees cada frase y la reescribes</b>. Lo que entregues es tu tema, con tu criterio encima.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">③ El simulador de tribunal</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Dile a la IA: <i>«Actúa como vocal de una oposición de Tecnología. Lée mi tema (te lo
            pego) y hazme 5 preguntas incómodas; no me dejes contestar hasta que conteste.»</i> Es el
            mejor ensayo de defensa que existe, gratis y sin compromiso. 15 minutos antes del examen
            real valen más que una tarde de repaso pasivo.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">④ Supuestos didácticos generados por ti, dirigidos por IA</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Para los temas didácticos (y los «contextualizados» del examen): pide a la IA <b>10 supuestos
            de aula diferentes</b> para un tema (una falla, un grupo heterogéneo, un alumnado con
            dificultades, un proyecto interdisciplinar…) y elige los que te encajan. El supuesto lo
            desarrollas tú: la IA generó el escenario, tu didáctica hace el trabajo.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-[15px] text-blue-900">
        <b>Contra la tentación de «copiar el tema»:</b> la IA es un redactor muy confiable que se
        inventa referencias con cara de verdad. Si citas algo —un decreto, un estándar, una norma—
        <b>compruébalo antes de entregarlo</b>. Un vocal con un decreto abierto no perdona una
        referencia inventada.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">3 · Los datos que justifican que la IA ya está en el aula</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        Para que no se lo cuenten en la defensa como opinión:
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-3xl font-extrabold text-blue-700">72 %</p>
          <p className="mt-1 text-sm text-zinc-600">
            de los profesionales de TI ya usa IA generativa para programar en su día a día{" "}
            <span className="text-xs text-zinc-400">(ServiceNow, 2025)</span>. Si el sector la usa,
            el profe que no la ha probado está a años luz del aula.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-3xl font-extrabold text-blue-700">90 %</p>
          <p className="mt-1 text-sm text-zinc-600">
            del alumnado de FP ya usa IA generativa para estudiar. En Secundaria la cifra es similar:
            tus alumnos ya saben usarla más que la mayoría de vocales. <span className="text-xs text-zinc-400">(Informe CSIC, 2026)</span>
          </p>
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-[15px] text-emerald-900">
        <b>Conclusión que les quiero llevar de esta sección:</b> tu diferencia competitiva no es «sé
        el temario» (todos lo saben). Tu diferencia es <b>saber usar IA para preparar 71 temas en la
        mitad de tiempo sin perder criterio, y saber defender una práctica con un agente delante del
        tribunal</b>. Eso es lo que vamos a construir en las 2 horas de hoy.
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-5">
        <Link href="/ponencia-tecnologia/" className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← Portada de la ponencia
        </Link>
        <Link href="/ponencia-tecnologia/02-herramientas-gratuitas/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
          Sección 2 · Tu kit gratuito →
        </Link>
      </div>
    </div>
  );
}
