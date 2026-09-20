import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PromptBlock from "@/components/PromptBlock";

export const metadata: Metadata = {
  title: "Sección 1 · Tu examen y la IA — Ponencia Tecnología — Aula en la Nube",
  description:
    "Lo que hicimos en la Sección 1: el terreno (71 temas), qué ha cambiado, qué no, y los 4 modos de usar IA para preparar el temario, con los prompts copiables y ejercicios de repaso.",
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
      <span className={chip}>Sección 1 · Tu examen y la IA</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Tu examen de Tecnología y la IA
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        Este es el apunte de lo que hacemos juntos en la primera parte: poner en claro qué va y qué
        no ha cambiado en tu oposición, y dejar funcionando los <b>4 modos serios de atacar los 71
        temas con IA</b>. Todos los prompts son copiables con un clic y funcionan en el Copilot de
        tu licencia o en el de web (los dejamos listos en la Sección 2).
      </p>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">El terreno: 71 temas, dos partes</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        Tu temario está regulado por el <b>Real Decreto 276/2007</b>: 71 temas — energía, materiales,
        estructuras, sistemas de control, instalaciones, electrónica, dibujo, TIC/programación y
        didáctica. Dos cosas que conviene tener claras antes de pedir nada a la IA:
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">📚 Lo que NO ha cambiado</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600">
            <li>El temario sigue siendo el mismo: la IA cambia <b>cómo lo estudias</b>, no <b>lo que se pregunta</b>.</li>
            <li>La parte práctica sigue midiendo que <b>tú</b> aplica conceptos a una situación real.</li>
            <li>La defensa es oral: cualquier párrafo que no entiendas del todo, el tribunal se da cuenta.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <h3 className="text-[15px] font-bold">🚀 Lo que SÍ ha cambiado (a tu favor)</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-emerald-900">
            <li><b>Velocidad:</b> lo que eran 4 temas de lectura a fondo, ahora son 20 min de IA bien dirigida + tu lectura crítica.</li>
            <li><b>«¿Cómo integras la IA en tu aula?»</b> es ya un supuesto plausible de examen: saber responderlo te diferencia.</li>
            <li><b>Un agente de código</b> te da a ti, opositor, un laboratorio de bolsillo que antes no tenías.</li>
          </ul>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">La regla de oro</h2>
      <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-[15px] text-amber-900">
        <b>La IA trabaja para que tú entiendas — no para que escriba por ti.</b> Si el tribunal
        sospecha un tema «generado», lo único que le importa es: ¿puedes defender cada párrafo? Si
        sí, ni se enteran. Si no, lo han pillado. Apúntate esta regla en tu lista: es la que
        diferencia cada una de tus defensas.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Los 4 modos de usar IA con tu temario</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        Los hicimos juntos delante de todo el mundo. Cada uno con su prompt listo: elige uno para
        probar ahora mismo (funciona igual en el chat de tu licencia, en Copilot web o en el chat de
        de VS Code (el de la Sección 2).
      </p>

      <div className="mt-4 space-y-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">① El esqueleto del tema — antes de estudiarlo</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Pídeselo antes de estudiar un tema: estructura, preguntas probables, y el vocabulario
            que debes poder definir de memoria. El mapa es tuyo, para estudiar; no se entrega.
            Ahorra la primera hora de desorden de cada tema.
          </p>
          <PromptBlock text={`Estoy preparando el tema [Nº]: "[TÍTULO]" de la oposición de Tecnología (Secundaria, RD 276/2007).
Dame:
1) El esqueleto del tema en una sola página: bloques principales y sub-bloques.
2) Las 5 preguntas más probables de tribunal, de menor a mayor dificultad.
3) Las 10 definiciones o términos clave que debería saber dar de memoria (con 1 línea de definición cada una).
4) Una pista: ¿con qué otros temas suele combinarse este en el examen?
Formato: título + listas numeradas, sin introducciones floridas.`} />
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">② El tema en voz de vocal — para redactar</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Esqueleto completo del tema con estructura de defensa. Lo importante: <b>tú relees cada
            frase y la reescribes</b>. Lo que se entrega es tu tema, con tu criterio encima. Nunca
            entregues el output de la IA sin pasarlo por tus palabras.
          </p>
          <PromptBlock text={`Redacta el tema [Nº]: "[TÍTULO]" (oposición de Tecnología, Secundaria, RD 276/2007) como lo explicaría un vocal:
1) Inicio: 3-4 líneas de encuadre con el marco legal exacto (cita el RD 276/2007; si hay otras normas, márcalas con [COMPROBAR] si no tienes seguridad).
2) Desarrollo: apartados numerados, con cifras con unidades y ejemplos de aula en cada uno.
3) Cierre: 3 líneas de síntesis + 1 aplicación didáctica concreta a Educación Secundaria.
Tono profesional, cero relleno. Máximo 2 páginas.`} />
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">③ El simulador de tribunal — el ensayo que mejor sale</h3>
          <p className="mt-1 text-sm text-zinc-600">
            El mejor ensayo de defensa que existe, gratis: la IA te interroga con preguntas
            incómodas y <b>no te deja avanzar hasta que respondas</b>. Quince minutos el día antes
            del examen valen más que una tarde de repaso pasivo. Úsalo con tus propios temas
            redactados, no con los suyos.
          </p>
          <PromptBlock text={`Actúa como vocal de una oposición de Tecnología de Secundaria (Comunidad Valenciana), con 25 años de experiencia y fama de pregunta incómoda.
Te pego mi tema redactado:

[PEGA AQUÍ TU TEMA]

Pregúntame 5 preguntas, una a una, de menor a mayor incómodas (incluye al menos una de aplicación a aula y una técnica pura). No me des la respuesta correcta hasta que yo haya contestado; luego corrígeme en concreto: qué falla, qué dirías el tribunal, y cómo la reformularía en 1 frase. Al final: valoración numérica del 1 a 10 con una línea de justificación.`} />
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">④ Tu banco de supuestos didácticos</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Para los temas didácticos y los supuestos contextualizados: la IA te genera 10
            escenarios de aula distintos, y tú eliges y desarrollas los que te encajan. La IA pone
            el escenario; <b>tu didáctica hace el trabajo</b>. Guarda los que te gusten: te ahorrarán
            horas en cada supuesto de examen.
          </p>
          <PromptBlock text={`Genera 10 supuestos didácticos REALISTAS (no genéricos) para el tema [Nº]: "[TÍTULO]" (oposición de Tecnología, ESO/FP C. Valenciana).
Cada supuesto en: contexto (una escuela concreta y creíble: tipo de centro, curso, tamaño de grupo, perfil del alumnado, una tensión real) + lo que se pide.
Varía: grupo heterogénero, alumnado con dificultades, proyecto interdisciplinar, aula con poca infraestructura, convivencia con un conflicto, familias desvinculadas, alumnado con altas capacidades, programación de un trimestre, evaluación competencial, integración de IA en el aula.
No repitas escenarios entre supuestos.`} />
        </div>
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">El enemigo: la referencia inventada</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        El fallo más caro de usar IA en tus temas: <b>una cita de algo que no existe</b>. La IA
        cita reales Decretos y reales estándares con cara de verdad. Regla: toda norma, todo número
        y todo estándar que aparezca en tu tema final <b>se comprueba antes de entregarlo</b> — su
        BOE, su fecha, su número. Un vocal con el BOE abierto no perdona. El prompt ② ya la exige
        con el marcador [COMPROBAR]: cuando veas uno, ahí va tu ojo humano.
      </p>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Los datos que puedes invocar en la defensa</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-3xl font-extrabold text-blue-700">72 %</p>
          <p className="mt-1 text-sm text-zinc-600">
            del sector TIC ya usa IA generativa para programar a diario{" "}
            <span className="text-xs text-zinc-400">(ServiceNow, 2025)</span>. Si el sector la usa,
            el profesor de Tecnología que no la ha probado queda a años luz de su aula.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-3xl font-extrabold text-blue-700">90 %</p>
          <p className="mt-1 text-sm text-zinc-600">
            del alumnado de FP ya usa IA generativa para estudiar{" "}
            <span className="text-xs text-zinc-400">(Informe CSIC, 2026)</span>. Tu alumnado de
            Secundaria la maneja mejor que la mayoría de los vocales. Cita esto con prudencia (es
            un informe del sector) y con la cifra.
          </p>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">✏️ Tu material de repaso</h2>
      <ul className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <li>• <b>Esta semana:</b> pídele el esqueleto (prompt ①) a 5 temas y compártelo con un compañero: ¿os da respuestas diferentes? (La IA no es un libro: dirige igual y aprende a calibrarla.)</li>
        <li>• <b>Cada día de estudio:</b> cierra cada tema con 10 min del simulador (③) sobre TU tema, no sobre el de otro.</li>
        <li>• <b>Antes de cada supuesto de práctica:</b> pide 5 escenarios (④) y elige el que más te dé juego: tu supuesto didáctico empieza ahí.</li>
      </ul>

      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-[15px] text-emerald-900">
        <b>Conclusión que te llevas de esta sección:</b> tu ventaja competitiva no es «sé el
        temario» (todo el mundo lo sabe). Tu ventaja es <b>saber dirigir la IA para preparar 71
        temas en la mitad de tiempo sin perder criterio — y saber defender una práctica con un
        agente delante del tribunal</b>. Eso es lo que construímos el resto del curso.
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
