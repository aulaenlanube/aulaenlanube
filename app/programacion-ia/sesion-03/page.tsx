import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Sesión 3 · Por qué programamos así — Curso de Programación con IA",
  description:
    "Por qué este curso enseña programación con IA y no sintaxis seca: datos reales del sector y de la FP española, el rol que se espera de ti y la justificación del proyecto de innovación del IES Simarro.",
};

const chip =
  "inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700";

function Dato({ cifra, texto, fuente, url, pct = true }: { cifra: string; texto: string; fuente: string; url: string; pct?: boolean }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="w-24 flex-none text-center">
        <div className="text-3xl font-extrabold tracking-tight text-blue-700">{cifra}</div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">%&nbsp;aprox.</div>
      </div>
      <div className="text-sm text-zinc-700">
        {texto}
        <div className="mt-1 text-xs text-zinc-400">
          <a href={url} target="_blank" rel="noopener" className="underline decoration-dotted hover:text-blue-700">
            {fuente} ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CursoIASesion3() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Curso de Programación con IA", path: "/programacion-ia/" },
          { title: "Web personal de marca", path: "/programacion-ia/web-personal/" },
          { title: "Sesión 3", path: "/programacion-ia/sesion-03/" },
        ]}
      />
      <span className={chip}>1º DAM · Proyecto web personal · Sesión 3 (reflexión)</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Por qué programamos así — y por qué enseñarlo de otra forma ya no tiene sentido
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        Ya habréis notado que este curso no va de memorizar sintaxis. Esta sesión lo pone negro sobre
        blanco: qué está pasando ahí fuera, qué se espera de vosotros como desarrolladores, y por qué
        estamos pilotando una forma de enseñar que casi nadie está atreviéndose a llevar al aula.
      </p>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Los datos: la IA ya está en el código y en el aula</h2>
      <p className="mt-1 text-[15px] text-zinc-600">
        No es una opinión ni una moda: es cómo trabaja hoy la industria y cómo estudia ya vuestra
        generación. Tres cifras verificables:
      </p>
      <div className="mt-4 space-y-3">
        <Dato
          cifra="72"
          texto="de los profesionales de TI ya usa IA generativa para programar en su día a día (encuesta ServiceNow a miles de desarrolladores, 2025). Nadie serio se extraña hoy de que un junior la use: se espera que sepa usarla —y revisar lo que produce—."
          fuente="ServiceNow, Generative AI usage in coding survey"
          url="https://www.servicenow.com/es/platform/generative-ai/generative-ai-usage-in-coding-survey.html"
        />
        <Dato
          cifra="90"
          texto="del alumnado de FP Superior ya usa herramientas de IA generativa para sus estudios (77% para preparar trabajos). El mismo informe CSIC señala que el 60% del profesorado reconoce necesitar formación urgente para integrarlas con criterio. Es decir: el alumnado ya va por delante del aula. Este curso es ese acompañamiento."
          fuente="Informe CSIC sobre IA y FP (Cinco Días, jun 2026)"
          url="https://cincodias.elpais.com/opinion/2026-06-04/la-ia-ya-esta-en-el-aula-de-fp-el-acompanamiento-no.html"
        />
        <Dato
          cifra="UE"
          pct={false}
          texto="En mayo de 2026 el Consejo de la Unión Europea aprobó conclusiones sobre «el profesorado en la era de la IA»: las herramientas deben asistir —no sustituir— al docente, y la alfabetización en IA debe integrarse en la formación. Lo que aquí hacemos no es una excentricidad local: es la línea oficial europea, aplicada."
          fuente="Council of the EU, Conclusions on teachers in the era of AI"
          url="https://data.consilium.europa.eu/doc/document/ST-8262-2026-INIT/en/pdf"
        />
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Lo que ha cambiado: tu rol ya no es teclear, es decidir</h2>
      <p className="mt-1 text-[15px] text-zinc-700">
        Durante décadas, programar se enseñaba como dominio de sintaxis: escribir desde cero, de
        memoria, líneas y líneas. Con agentes que escriben esas líneas en segundos, enseñar eso es
        enseñar una habilidad que el mercado ya no contrata. Lo que el mercado <b>sí</b> contrata, y
        lo que este curso entrena, es el nivel superior:
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">🎯 Especificar</h3>
          <p className="mt-1 text-sm text-zinc-600">Traducir lo que quieres a un encargo claro y acotado. Un prompt vago produce un desastre con buena caligrafía.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">🔍 Verificar</h3>
          <p className="mt-1 text-sm text-zinc-600">Probar, dudar, detectar lo que suena bien pero está mal. La IA se equivoca con total seguridad: tu criterio es el cortafuegos.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">🧭 Dirigir</h3>
          <p className="mt-1 text-sm text-zinc-600">Arquitectura, git, alcance, prioridades. Lo que un senior hace con su equipo, hoy un desarrollador lo hace con sus agentes.</p>
        </div>
      </div>
      <div className="my-5 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-[15px] text-blue-900">
        <b>Por eso la defensa oral no es un trámite:</b> si no sabes explicar lo que tu proyecto hace y
        cómo, no puedes dirigirlo. Y lo que no puedes dirigir, no te contrata nadie —lo dirija tú o lo
        dirija una IA. «Aprender a preguntar, a desconfiar y a verificar» es hoy la competencia central
        del programador.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Y aquí entra la parte de innovación</h2>
      <p className="mt-1 text-[15px] text-zinc-700">
        Este enfoque no es improvisado: el IES Simarro lo está pilotando dentro de su{" "}
        <b>Programa de Excelencia</b>, como proyecto de innovación educativa —de los pocos de FP en
        España que se atreven a reescribir <i>cómo</i> se enseña a programar, no solo a añadir «IA» al
        título del tema. La apuesta, documentada sesión a sesión en esta web para que cualquiera pueda
        replicarla o criticarla con datos:
      </p>
      <ul className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <li>• <b>Proyectos, no temas:</b> se aprende construyendo (web personal → GitHub → proyectos con agentes → finales individual y en grupo).</li>
        <li>• <b>IA como herramienta estándar,</b> no como trampa: la usarás en clase, en entregas y en evaluación, con la exigencia de dirigir.</li>
        <li>• <b>Evidencia pública:</b> GitHub como portafolio y esta web como memoria del método. Si funciona, se exporta; si falla, se corrige en público.</li>
      </ul>
      <div className="my-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-[15px] text-emerald-900">
        <b>Traducción para vosotros:</b> no estáis en «el curso raro del profe». Estáis siendo cohorte
        piloto de una forma de aprender programación que la industria ya practica y que la UE recomienda. Los que salgáis de aquí sabréis hacer dos cosas que escasean: construir rápido con IA
        y saber exactamente qué habéis construido. Eso vale más que memorizar <code>public static void main</code>.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Para cerrar el círculo: vuestra opinión</h2>
      <p className="mt-1 text-[15px] text-zinc-700">
        Parte de esta sesión es escucharos, porque el método se ajusta con evidencia — la vuestra
        primera. Reflexiona y comparte (la usaremos para mejorar el curso):
      </p>
      <ol className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <li>1 · ¿Qué has aprendido haciendo la web que no creías que ibas a aprender?</li>
        <li>2 · ¿En qué momento la IA te dio algo «que parecía bien pero no lo estaba» y cómo lo detectaste?</li>
        <li>3 · ¿Qué parte del curso te resulta menos clara o menos justa? Propón el cambio.</li>
      </ol>
      <p className="mt-4 text-[15px] text-zinc-600">
        Con esto queda justificada la forma de trabajar. Lo que viene ahora es lo serio: los dos
        proyectos finales, donde todo esto se pone a prueba de verdad.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-5">
        <Link href="/programacion-ia/sesion-02/" className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← Sesión 2
        </Link>
        <div className="flex gap-3">
          <Link href="/programacion-ia/proyecto-final-individual/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
            Proyecto final individual →
          </Link>
          <Link href="/programacion-ia/proyecto-final-grupo/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
            Startup en grupo →
          </Link>
        </div>
      </div>
    </div>
  );
}
