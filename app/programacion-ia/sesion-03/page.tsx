import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Sesión 3 · Por qué programamos así — Curso de Programación con IA",
  description:
    "Por qué este curso enseña programación con IA y no sintaxis seca: datos reales del sector y de la FP española, el rol que se espera de ti y la justificación del proyecto de innovación del IES Simarro.",
};

const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";

type Nivel = [string, string, string, string];
const RUBRICA: { nombre: string; peso: number; qué: string; niveles: Nivel }[] = [
  {
    nombre: "Contacto real y funcional", peso: 15,
    qué: "Que un desconocido pueda escribirte desde la web y te llegue.",
    niveles: [
      "Enlace roto, botón muerto o mail inventado.",
      "mailto: o teléfono visible y correcto, sin más.",
      "Formulario que envía de verdad (Formspree/Web3Forms/GitHub Issue) con validación y mensaje de éxito.",
      "Canal con respuesta automática: chatbot con la API del centro, auto-responder por correo, o formulario que abre un issue/PR etiquetado — y sabes explicar el recorrido del dato.",
    ],
  },
  {
    nombre: "Contenido propio y densidad", peso: 15,
    qué: "Una web de marca se define por qué dice de TI, no por su plantilla.",
    niveles: [
      "Solo el texto genérico que soltó la IA en el primer prompt.",
      "1-2 secciones con algo tuyo (fotos, algún trabajo).",
      "4+ secciones coherentes: sobre mí, proyectos con contexto, servicios/habilidades, experiencia; textos revisados por ti, sin humo.",
      "Además: casos de proyecto reales con problema→solución→resultado, datos o métricas propias, y una voz reconocible (se nota quién eres sin leer el nombre).",
    ],
  },
  {
    nombre: "Diseño y coherencia visual", peso: 15,
    qué: "Que parezca una marca, no una demo de plantilla.",
    niveles: [
      "Colores y tipografías aleatorias; roto en móvil.",
      "Plantilla correcta pero impersonal; responsive básico.",
      "Sistema coherente: paleta y tipografía deliberadas, espaciados regulares, responsive real en 3 anchos, modo oscuro que suma.",
      "Identidad propia defendible: logo/favicon hechos por ti, microinteracciones, consistencia en 4+ páginas, y sabes justificar cada decisión de diseño.",
    ],
  },
  {
    nombre: "Riqueza de medios", peso: 10,
    qué: "Imágenes, SVG, vídeo, animación: el contenido multimedia cuenta la historia.",
    niveles: [
      "Solo texto o una foto de stock.",
      "Imágenes variadas sin optimizar (peso, alt, lazy).",
      "Mezcla trabajada: fotos propias optimizadas, ≥2 SVG propios (iconos/illustraciones), vídeo embebido, animaciones CSS/JS que aportan.",
      "Todo lo anterior con criterio: SVG animados propios, vídeo propio o demo grabada, animaciones con intención (no decorativas), Lighthouse media sin avisos.",
    ],
  },
  {
    nombre: "Interactividad y funcionalidad extra", peso: 15,
    qué: "Lo que une el 'te hace una web' con el 'has construido una aplicación'.",
    niveles: [
      "Solo enlaces ancla y algún acordeón de serie.",
      "Alguna interacción cosmética (hover, carrusel).",
      "≥2 funciones reales: menú móvil propio, buscador/filtro de proyectos, formulario validado, calculadora, test, dark-mode con persistencia.",
      "Función con estado o datos: login demo con zona interna, consumo de una API externa real, chatbot operativo, o personalización según parámetros — con el código explicado en la defensa.",
    ],
  },
  {
    nombre: "Arquitectura, calidad técnica y accesibilidad", peso: 15,
    qué: "Cómo está montado por dentro: semántica, estructura, rendimiento.",
    niveles: [
      "Un index.html gigante con estilos inline, sin carpetas.",
      "Estructura de ficheros razonable pero HTML no semántico.",
      "HTML semántico, CSS organizado (variables/tokens), JS modular, <title>/meta/OG por página, contraste y foco accesibles, alt en imágenes.",
      "Además: componentes reutilizables o templates, Lighthouse ≥90 en rendimiento/accesibilidad, y ADR o README técnico explicando 2 decisiones de arquitectura.",
    ],
  },
  {
    nombre: "Proceso: git, iteración y evidencia de trabajo", peso: 15,
    qué: "El corazón del curso: el trabajo detrás, visible en el historial.",
    niveles: [
      "1-2 commits monolíticos.",
      "3-9 commits con mensajes flojos ('cambios', 'final').",
      "≥10 commits atómicos con mensajes que cuentan decisiones + ramas para las features grandes.",
      "Historial que se puede leer como un diario: issues/PR, iteraciones visibles, v1→v2 con mejoras rastreables, y las órdenes clave a la IA archivadas en el repo.",
    ],
  },
];

function Dato({ cifra, texto, fuente, url, pct = true }: { cifra: string; texto: string; fuente: string; url: string; pct?: boolean }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
      <div className="w-24 flex-none text-center">
        <div className="text-3xl font-extrabold tracking-tight text-blue-700 dark:text-blue-300">{cifra}</div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400">%&nbsp;aprox.</div>
      </div>
      <div className="text-sm text-zinc-700 dark:text-zinc-300">
        {texto}
        <div className="mt-1 text-xs text-zinc-400 dark:text-zinc-400">
          <a href={url} target="_blank" rel="noopener" className="underline decoration-dotted hover:text-blue-700 dark:hover:text-blue-300">
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
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Ya habréis notado que este curso no va de memorizar sintaxis. Esta sesión lo pone negro sobre
        blanco: qué está pasando ahí fuera, qué se espera de vosotros como desarrolladores, y por qué
        estamos pilotando una forma de enseñar que casi nadie está atreviéndose a llevar al aula.
      </p>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Los datos: la IA ya está en el código y en el aula</h2>
      <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
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
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        Durante décadas, programar se enseñaba como dominio de sintaxis: escribir desde cero, de
        memoria, líneas y líneas. Con agentes que escriben esas líneas en segundos, enseñar eso es
        enseñar una habilidad que el mercado ya no contrata. Lo que el mercado <b>sí</b> contrata, y
        lo que este curso entrena, es el nivel superior:
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">🎯 Especificar</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Traducir lo que quieres a un encargo claro y acotado. Un prompt vago produce un desastre con buena caligrafía.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">🔍 Verificar</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Probar, dudar, detectar lo que suena bien pero está mal. La IA se equivoca con total seguridad: tu criterio es el cortafuegos.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">🧭 Dirigir</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Arquitectura, git, alcance, prioridades. Lo que un senior hace con su equipo, hoy un desarrollador lo hace con sus agentes.</p>
        </div>
      </div>
      <div className="my-5 rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-5 text-[15px] text-blue-900 dark:text-blue-200">
        <b>Por eso la defensa oral no es un trámite:</b> si no sabes explicar lo que tu proyecto hace y
        cómo, no puedes dirigirlo. Y lo que no puedes dirigir, no te contrata nadie —lo dirija tú o lo
        dirija una IA. «Aprender a preguntar, a desconfiar y a verificar» es hoy la competencia central
        del programador.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Y aquí entra la parte de innovación</h2>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        Este enfoque no es improvisado: el IES Simarro lo está pilotando dentro de su{" "}
        <b>Programa de Excelencia</b>, como proyecto de innovación educativa —de los pocos de FP en
        España que se atreven a reescribir <i>cómo</i> se enseña a programar, no solo a añadir «IA» al
        título del tema. La apuesta, documentada sesión a sesión en esta web para que cualquiera pueda
        replicarla o criticarla con datos:
      </p>
      <ul className="mt-3 space-y-2 text-[15px] text-zinc-700 dark:text-zinc-300">
        <li>• <b>Proyectos, no temas:</b> se aprende construyendo (web personal → GitHub → proyectos con agentes → finales individual y en grupo).</li>
        <li>• <b>IA como herramienta estándar,</b> no como trampa: la usarás en clase, en entregas y en evaluación, con la exigencia de dirigir.</li>
        <li>• <b>Evidencia pública:</b> GitHub como portafolio y esta web como memoria del método. Si funciona, se exporta; si falla, se corrige en público.</li>
      </ul>
      <div className="my-5 rounded-2xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-5 text-[15px] text-emerald-900 dark:text-emerald-200">
        <b>Traducción para vosotros:</b> no estáis en «el curso raro del profe». Estáis siendo cohorte
        piloto de una forma de aprender programación que la industria ya practica y que la UE recomienda. Los que salgáis de aquí sabréis hacer dos cosas que escasean: construir rápido con IA
        y saber exactamente qué habéis construido. Eso vale más que memorizar <code>public static void main</code>.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">La rúbrica con la que se corrige vuestra web de marca</h2>
      <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
        Que la IA te monte una web en cinco minutos no es mérito: eso lo hace cualquiera. Lo que se
        evalúa es <b>el trabajo que hay detrás</b>: lo que especificaste, lo que añadiste, lo que
        arreglaste, lo que sabes explicar. Esta es la rúbrica completa — úsala como hoja de ruta: cada
        casilla que subas de nivel son puntos, y casi todas se consiguen con una buena orden a tu
        agente. Sobre 100 puntos, con <b>requisitos mínimos obligatorios</b> antes de nada.
      </p>

      <div className="mt-4 rounded-2xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 p-5 text-[15px] text-red-900 dark:text-red-200">
        <b>Requisitos mínimos (puerta de entrada — sin esto el proyecto no se evalúa):</b>
        <ol className="mt-2 space-y-1 text-sm">
          <li>✓ La web carga en producción (GitHub Pages) sin errores en consola (F12 limpio).</li>
          <li>✓ <b>Un visitante puede ponerse en contacto contigo y eso funciona de verdad</b>: formulario que envía (formspree/Web3Forms), o chatbot con tu clave API del centro que responde, o al menos <code>mailto:</code>/teléfono visibles y correctos. Un botón «Contacto» que no hace nada = suspenso directo.</li>
          <li>✓ Se ve bien en el móvil (probado con DevTools → modo dispositivo, no solo en tu portátil).</li>
          <li>✓ Historial git real: mínimo 10 commits con mensajes que cuentan el proceso (no un único «web final»).</li>
        </ol>
      </div>

      <div className="mt-5 overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/10">
        <table className="min-w-[860px] border-collapse text-sm">
          <thead className="bg-zinc-50 text-left dark:bg-white/5">
            <tr>
              <th className="px-3 py-2.5 font-bold">Criterio (peso)</th>
              <th className="px-3 py-2.5 text-red-700 dark:text-red-300">Insuficiente · 0%</th>
              <th className="px-3 py-2.5 text-amber-700 dark:text-amber-300">En desarrollo · 50%</th>
              <th className="px-3 py-2.5 text-blue-700 dark:text-blue-300">Competente · 80%</th>
              <th className="px-3 py-2.5 text-emerald-700 dark:text-emerald-300">Excelente · 100%</th>
            </tr>
          </thead>
          <tbody>
            {RUBRICA.map((r) => (
              <tr key={r.nombre} className="border-t border-zinc-100 align-top dark:border-white/5">
                <td className="px-3 py-2.5">
                  <b>{r.nombre}</b>
                  <span className="ml-1 rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-600 dark:bg-white/10 dark:text-zinc-300">{r.peso} pts</span>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{r.qué}</p>
                </td>
                {r.niveles.map((n, i) => (
                  <td key={i} className="px-3 py-2.5 text-zinc-600 dark:text-zinc-300">{n}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-5 rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-5 text-[15px] text-blue-900 dark:text-blue-200">
        <b>Cómo subir puntos (instrucciones para continuar el desarrollo):</b> no rehagas la web:
        <b> iterarla</b>. Abre tu agente y ataca los criterios de menor a mayor visibilidad — 1) arregla
        el contacto (el mínimo que falla, es el que hunde la nota); 2) añade una pieza de contenido
        nueva que la IA no puede inventar por ti (tu foto, tu trabajo, tus datos); 3) pide una función
        interactiva (login demo, calculadora, test, chatbot); 4) sustituye dos imágenes de stock por dos
        SVG propios; 5) commit y push con mensaje honesto de lo que cambiaste. Cada iteración = commits
        = evidencias. La rúbrica se corrige <b>sobre lo que haya en el repo el día de la entrega</b>, así
        que hasta el último minuto hay puntos en la mesa.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Para cerrar el círculo: vuestra opinión</h2>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        Parte de esta sesión es escucharos, porque el método se ajusta con evidencia — la vuestra
        primera. Reflexiona y comparte (la usaremos para mejorar el curso):
      </p>
      <ol className="mt-3 space-y-2 text-[15px] text-zinc-700 dark:text-zinc-300">
        <li>1 · ¿Qué has aprendido haciendo la web que no creías que ibas a aprender?</li>
        <li>2 · ¿En qué momento la IA te dio algo «que parecía bien pero no lo estaba» y cómo lo detectaste?</li>
        <li>3 · ¿Qué parte del curso te resulta menos clara o menos justa? Propón el cambio.</li>
      </ol>
      <p className="mt-4 text-[15px] text-zinc-600 dark:text-zinc-400">
        Con esto queda justificada la forma de trabajar. Lo que viene ahora es lo serio: los dos
        proyectos finales, donde todo esto se pone a prueba de verdad.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 dark:border-white/10 pt-5">
        <Link href="/programacion-ia/sesion-02/" className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5">
          ← Sesión 2
        </Link>
        <div className="flex gap-3">
          <Link href="/programacion-ia/proyecto-final-individual/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:hover:bg-slate-600">
            Proyecto final individual →
          </Link>
          <Link href="/programacion-ia/proyecto-final-grupo/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:hover:bg-slate-600">
            Startup en grupo →
          </Link>
        </div>
      </div>
    </div>
  );
}
