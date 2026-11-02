import type { Metadata } from "next";
import Link from "@/components/Link";
import {
  Aviso,
  Bloque,
  Checklist,
  Codigo,
  CriterioRubrica,
  DosColumnas,
  Paso,
  Prompt,
  TONO,
  Tarjeta,
  cls,
} from "@/app/programacion-ia/_video/piezas";
import { RAIZ, sesion } from "../_datos";
import {
  CabeceraSesion,
  EnEstaSesion,
  Fuente,
  LoQueTeLlevas,
  NavSesiones,
  ParaAmpliar,
  Tarea,
  VideoResumen,
} from "../_ui";
import { Anonimizar, ArbolPonderacion, CicloEvaluar, DobleCorreccion, FlujoExamen, ProductoProceso, PruebaTresTrabajos } from "./figuras";
import { PROMPTS_S3 } from "./prompts";

const S = sesion(3);

export const metadata: Metadata = {
  title: `Sesión 3 · ${S.titulo} — Seminario de IA para docentes – Aula en la nube`,
  description:
    "Evaluar y corregir con IA sin perder el control: rúbricas a partir de tus criterios (RA y CE en FP, criterios de evaluación en ESO y Bachillerato), la prueba de justicia, feedback a toda la clase sin nombres, corrección de exámenes con Copilot y revisión humana, tareas a prueba de IA y normas de uso para el alumnado. Con prompts listos para copiar.",
  alternates: { canonical: S.ruta },
};

/** El texto de un prompt de la sesión, por su id. */
function texto(id: string) {
  const p = PROMPTS_S3.find((x) => x.id === id);
  if (!p) throw new Error(`Prompt desconocido: ${id}`);
  return p.texto;
}

const PROTOCOLO = `# Mi protocolo de corrección con IA

1. Antes de corregir: criterios y rúbrica escritos y compartidos con el grupo.
2. Datos: cada trabajo lleva un código (A01…). La lista nombre → código no sale de mi ordenador.
3. Herramienta: Copilot con mi cuenta @edu.gva.es, con el escudo verde de protección de datos a la vista.
4. Nunca: salud, NEE, situaciones familiares ni fotos de caras. Ni en Copilot.
5. La IA transcribe y propone con citas. Lo ilegible se marca, no se adivina.
6. Reviso cada propuesta con el trabajo delante y rehago los cálculos.
7. La nota la pongo yo. Apunto cada vez que no coincido con la IA, y por qué.
8. El alumnado sabe cómo corrijo y puede pedirme revisión.`;

const LECTURAS = [
  {
    t: "Corregir exámenes con IA: flujo realista y dónde están sus límites",
    u: "https://apps-educativas.com/blog/corregir-examenes-con-ia-sigue-siendo-el-docente",
  },
  {
    t: "Corrección con IA vs manual: lo que vimos al compararlas",
    u: "https://apps-educativas.com/blog/ia-vs-correccion-manual-en-clase",
  },
  {
    t: "Detectores de IA en deberes: por qué fallan y qué hacer en su lugar",
    u: "https://apps-educativas.com/blog/detectores-de-ia-en-deberes-por-que-fallan",
  },
  {
    t: "AI Act en clase: qué se aplaza a 2027 y qué no",
    u: "https://apps-educativas.com/blog/ai-act-en-clase-obligaciones-y-prohibiciones",
  },
];

export default function Sesion3() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <CabeceraSesion n={3}>
        Corregir es lo que más tiempo se come, y es justo donde más cuidado hay que tener. Hoy verás dónde te ahorra
        horas la IA —aplicar la misma rúbrica a treinta trabajos y escribir un comentario útil para cada uno— y dónde no
        puede entrar: <b>la nota la decides tú</b>. Sales con una rúbrica probada y con tu protocolo de corrección.
      </CabeceraSesion>

      <VideoResumen n={3} />

      <EnEstaSesion
        tono="ambar"
        items={[
          ["limites", "Qué hace la IA al evaluar"],
          ["criterios", "Evaluar por criterios"],
          ["rubricas", "Rúbricas desde tus criterios"],
          ["feedback", "Feedback a toda la clase"],
          ["examenes", "Corregir exámenes con IA"],
          ["tareas", "Tareas y normas de uso"],
        ]}
      />

      {/* ═══ 1 · Los límites ═══════════════════════════════════════════ */}
      <Bloque
        id="limites"
        etiqueta="1 · Los límites"
        titulo="La IA propone, tú decides"
        entradilla={
          <>
            Evaluar con IA no es apretar un botón y copiar la nota. Es un ciclo de cuatro pasos y la IA solo hace uno:{" "}
            <b>proponer</b>. Los criterios los pones tú antes, y la revisión y la nota, después. Si te quedas con esta
            figura, tienes media sesión hecha.
          </>
        }
      >
        <CicloEvaluar />
      </Bloque>

      <Bloque nivel={3} titulo="Dónde ayuda y dónde no">
        <DosColumnas
          nivel={4}
          centro="pero"
          a={{
            titulo: "Lo que la IA hace bien",
            tono: "verde",
            puntos: [
              "Aplicar la misma rúbrica al trabajo 3 y al trabajo 23, sin el cansancio de las once de la noche.",
              "Escribir un comentario concreto para cada alumno, que antes no daba tiempo.",
              "Detectar los errores que se repiten en toda la clase.",
              "Darte un primer borrador de rúbrica a partir de tu criterio.",
            ],
          }}
          b={{
            titulo: "Lo que la IA no puede hacer",
            tono: "rosa",
            puntos: [
              "Conocer a tu alumno: su contexto, su evolución, sus adaptaciones.",
              "Garantizar que lee bien una letra difícil o que hace bien las cuentas.",
              "Valorar con fiabilidad lo creativo o la voz propia.",
              "Responder de la nota ante una reclamación. Eso es tuyo.",
            ],
          }}
        />
      </Bloque>

      <Bloque
        nivel={3}
        titulo="Lo que dicen las normas"
        entradilla="Tres textos distintos llegan a la misma conclusión: una persona revisa y decide."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta nivel={4} tono="azul" antetitulo="Unión Europea" titulo="Reglamento de IA">
            Usar IA para evaluar resultados de aprendizaje es <b>alto riesgo</b>. Esas obligaciones se aplazaron al{" "}
            <b>2 de diciembre de 2027</b> (Reglamento 2026/1744), pero la idea ya vale hoy: supervisión humana de
            verdad.
          </Tarjeta>
          <Tarjeta nivel={4} tono="morado" antetitulo="Protección de datos" titulo="RGPD">
            Tu alumnado tiene derecho a <b>no ser objeto de una decisión basada solo en un tratamiento automatizado</b>{" "}
            que le afecte de forma importante. Una nota que nadie ha revisado lo es.
          </Tarjeta>
          <Tarjeta nivel={4} tono="verde" antetitulo="Conselleria" titulo="Guía del CEFIRE">
            Si hace falta tratar <b>notas u observaciones</b>, solo en Copilot con tu cuenta @edu.gva.es y lo mínimo
            imprescindible. Salud, NEE o situación familiar: <b>nunca</b>, ni siquiera ahí.
          </Tarjeta>
        </div>
        <Fuente id="aiAct" />
        <Fuente id="guiaCefire" />
      </Bloque>

      {/* ═══ 2 · Evaluar por criterios ═════════════════════════════════ */}
      <Bloque
        id="criterios"
        etiqueta="2 · Evaluar por criterios"
        titulo="Primero, qué cuenta y cuánto"
        entradilla={
          <>
            Antes de pedirle nada a la IA, decide <b>qué se evalúa y cuánto pesa</b>. En FP, cada resultado de
            aprendizaje (RA) pesa una parte de la nota y cada criterio (CE), una parte de su RA.
          </>
        }
      >
        <ArbolPonderacion />
      </Bloque>

      <Bloque nivel={3} titulo="En FP y en ESO, la misma lógica">
        <DosColumnas
          nivel={4}
          centro="y"
          a={{
            titulo: "En FP: RA y CE",
            antetitulo: "Ciclos formativos",
            tono: "azul",
            puntos: [
              <>
                El módulo tiene sus <b>resultados de aprendizaje</b> (RA), y cada RA, sus <b>criterios de evaluación</b>{" "}
                (CE).
              </>,
              "Tu programación fija cuánto pesa cada RA y cómo se reparte entre sus CE.",
              "Cada CE se evalúa con una actividad o instrumento: práctica, examen, observación, proyecto.",
            ],
          }}
          b={{
            titulo: "En ESO y Bachillerato: criterios",
            antetitulo: "Secundaria",
            tono: "verde",
            puntos: [
              <>
                Cada materia tiene sus <b>competencias específicas</b>, y cada una, sus <b>criterios de evaluación</b>.
              </>,
              "Los criterios son el referente de la evaluación; los saberes básicos son lo que se trabaja.",
              "Las situaciones de aprendizaje y sus instrumentos aportan las evidencias de cada criterio.",
            ],
          }}
        />
      </Bloque>

      <Bloque
        nivel={3}
        titulo="Las cuentas, mejor fuera del chat"
        entradilla={
          <>
            Con el ejemplo del árbol: si el RA 2 tiene un 7 en el CE a, un 6 en el b y un 8 en el c, y los otros RA
            tienen un 6 y un 5, esta es la nota. Un chat puede equivocarse en una suma sin avisar.{" "}
            <b>Pídele ayuda para definir, no para calcular.</b>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className={cls.tarjeta}>
            <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Nota del RA 2</h4>
            <p className={`mt-2 font-mono text-lg ${cls.texto}`}>0,40 × 7 + 0,30 × 6 + 0,30 × 8 = 7,0</p>
          </div>
          <div className={cls.tarjeta}>
            <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Nota del módulo</h4>
            <p className={`mt-2 font-mono text-lg ${cls.texto}`}>0,30 × 6 + 0,45 × 7 + 0,25 × 5 = 6,2</p>
          </div>
        </div>
        <div className={`mt-4 rounded-2xl border p-4 ${TONO.ambar.caja}`}>
          <p className={`text-lg ${TONO.ambar.tinta}`}>
            Estas cuentas las hace una hoja de cálculo… o tu propia herramienta. En la{" "}
            <Link href={sesion(5).ruta} className={cls.enlace}>
              sesión 5
            </Link>{" "}
            puedes construirte un <b>cuaderno de evaluación por criterios</b> que las haga solo, con tus pesos, en tu
            navegador.
          </p>
        </div>
      </Bloque>

      <Bloque
        nivel={3}
        titulo="De los criterios a los instrumentos"
        entradilla="Aquí sí rinde la IA: te propone con qué evaluar cada criterio y qué evidencia recoger. Los pesos y las cuentas, tuyos."
      >
        <Prompt text={texto("s3-instrumentos")} etiqueta="Prompt · de criterios a instrumentos" />
      </Bloque>

      {/* ═══ 3 · Rúbricas ══════════════════════════════════════════════ */}
      <Bloque
        id="rubricas"
        etiqueta="3 · Rúbricas"
        titulo="Una rúbrica que se puede defender"
        entradilla={
          <>
            Una rúbrica es una tabla que dice, para cada criterio, <b>qué se ve en un trabajo de cada nivel</b>. Bien
            hecha, el alumnado sabe qué se le pide antes de empezar y tú puedes explicar cualquier nota. La IA te da el
            borrador en un minuto; que sea justa depende de tres pasos.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta nivel={4} tono="azul" antetitulo="La fila" titulo="El criterio">
            Lo que se evalúa, copiado literal de tu currículo o tu programación. Si lo reescribes, ya no es el mismo.
          </Tarjeta>
          <Tarjeta nivel={4} tono="ambar" antetitulo="Las columnas" titulo="Los niveles">
            Cuatro suele bastar: Insuficiente, En desarrollo, Competente y Excelente, cada uno con su porcentaje.
          </Tarjeta>
          <Tarjeta nivel={4} tono="verde" antetitulo="Las casillas" titulo="Los descriptores">
            Lo que se ve en el trabajo en cada nivel. Si no lo puedes señalar con el dedo, no sirve.
          </Tarjeta>
        </div>
      </Bloque>

      <Paso
        n={1}
        titulo="Elige un criterio y su evidencia"
        entradilla="Uno solo, de algo que vayas a evaluar este trimestre. Y decide qué produce el alumnado para demostrarlo."
      >
        <DosColumnas
          centro="o"
          a={{
            titulo: "Ejemplo de FP",
            tono: "azul",
            puntos: [
              <>
                <b>Criterio:</b> «Se ha elaborado un presupuesto ajustado a las necesidades del cliente» (inventado).
              </>,
              <>
                <b>Evidencia:</b> un presupuesto a partir de un encargo real del taller.
              </>,
            ],
          }}
          b={{
            titulo: "Ejemplo de ESO",
            tono: "verde",
            puntos: [
              <>
                <b>Criterio:</b> «Defender oralmente una opinión con datos contrastados» (inventado).
              </>,
              <>
                <b>Evidencia:</b> una exposición de tres minutos con una pregunta del público.
              </>,
            ],
          }}
        />
      </Paso>

      <Paso n={2} titulo="Pide la rúbrica a Copilot">
        <Prompt text={texto("s3-rubrica")} etiqueta="Prompt · una rúbrica a partir de tu criterio" />
      </Paso>

      <Bloque
        nivel={3}
        titulo="Así queda un criterio"
        entradilla="Un subcriterio de cada ejemplo. Fíjate en que cada casilla se puede comprobar mirando el trabajo."
      >
        <div className="space-y-6">
          <CriterioRubrica
            nombre="Presupuesto ajustado al cliente (FP)"
            peso={40}
            que="Partidas, importes y justificación del presupuesto."
            niveles={[
              { nombre: "Insuficiente", pct: 0 },
              { nombre: "En desarrollo", pct: 50 },
              { nombre: "Competente", pct: 80 },
              { nombre: "Excelente", pct: 100 },
            ]}
            descriptores={[
              "Faltan partidas o los importes no cuadran con el encargo.",
              "Están todas las partidas, pero sin desglosar o con algún error de cálculo.",
              "Partidas completas y desglosadas, IVA bien aplicado y sumas correctas.",
              "Además, justifica cada partida y propone una alternativa más barata.",
            ]}
          />
          <CriterioRubrica
            nombre="Opinión defendida con datos (ESO)"
            peso={30}
            que="Uso de datos y respuesta a las preguntas en la exposición."
            niveles={[
              { nombre: "Insuficiente", pct: 0 },
              { nombre: "En desarrollo", pct: 50 },
              { nombre: "Competente", pct: 80 },
              { nombre: "Excelente", pct: 100 },
            ]}
            descriptores={[
              "Lee un texto sin datos o sin relación con la pregunta.",
              "Da su opinión con un dato, sin decir de dónde sale.",
              "Defiende su opinión con dos datos citados y responde a la pregunta.",
              "Además, rebate una objeción con un dato y matiza su postura.",
            ]}
          />
        </div>
      </Bloque>

      <Paso
        n={3}
        titulo="Pásale la prueba de justicia"
        entradilla={
          <>
            Antes de usarla, pruébala con <b>tres trabajos reales</b>, sin nombre: uno flojo, uno medio y uno bueno. Si
            una rúbrica no los separa, no sirve para corregir a treinta.
          </>
        }
      >
        <PruebaTresTrabajos />
      </Paso>

      <Bloque nivel={3} titulo="Cinco comprobaciones antes de usarla">
        <Checklist
          items={[
            { texto: "Cada descriptor se puede señalar", detalle: "Si dice «adecuado», pregúntate: ¿adecuado cómo?" },
            { texto: "Los niveles no se solapan", detalle: "Un mismo trabajo no puede encajar en dos casillas a la vez." },
            { texto: "Cada nivel añade algo", detalle: "De En desarrollo a Competente hay un salto que se nota." },
            { texto: "Habla del criterio, no de otra cosa", detalle: "Ni la letra ni la presentación, salvo que el criterio lo diga." },
            { texto: "Separa tus tres trabajos", detalle: "Flojo, medio y bueno caen en niveles distintos." },
            { texto: "La entiende tu alumnado", detalle: "Léela en voz alta: si hay que traducirla, reescríbela." },
          ]}
        />
      </Bloque>

      <Bloque
        nivel={3}
        titulo="Pídele que la critique"
        entradilla="La misma IA que la escribió es muy buena buscándole fallos si se lo pides así. Con la cuenta del centro (el escudo verde arriba) y trabajos sin nombre."
      >
        <Prompt text={texto("s3-prueba-justicia")} etiqueta="Prompt · la prueba de justicia" />
      </Bloque>

      <Bloque
        nivel={3}
        titulo="Rúbricas en Enseñar, Teams y Aules"
        entradilla="Cuando la tengas, llévala a donde corriges. Tres sitios que ya tienes, sin pagar nada."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta nivel={4} tono="morado" antetitulo="Copilot · barra lateral" titulo="Enseñar (Teach)">
            En «Deberes y evaluaciones», <b>«Criterio de evaluación»</b> crea la rúbrica con sus niveles de rendimiento,
            editable y lista para compartir. Gratis para docentes con A1 o A3. Abajo, campo a campo.
          </Tarjeta>
          <Tarjeta nivel={4} tono="azul" antetitulo="Microsoft Teams" titulo="Tareas de Teams">
            Al crear una tarea, la IA te ayuda con las instrucciones y la rúbrica (incluido en A1 y A3). La rúbrica queda
            adjunta y el alumnado la ve antes de entregar.
          </Tarjeta>
          <Tarjeta nivel={4} tono="verde" antetitulo="Moodle de la Conselleria" titulo="Tarea de Aules">
            La tarea admite la rúbrica como método de calificación avanzado: copias niveles y descriptores, y corriges
            marcando casillas.
          </Tarjeta>
        </div>
        <Fuente id="teach" />
        <Fuente id="funcionesEdu" />
      </Bloque>

      <Bloque
        nivel={3}
        titulo="La rúbrica en Enseñar, campo a campo"
        entradilla={
          <>
            En Copilot: <b>Enseñar → Deberes y evaluaciones → Criterio de evaluación → Crear mi propio</b>. El formulario
            tiene cuatro campos, y el truco está en el tercero.
          </>
        }
      >
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Título de criterio de evaluación", "Obligatorio. El nombre de la tarea o del criterio: «Presupuesto para un cliente»."],
            ["Nivel de grado", "Obligatorio. Va de Infantil a Bachillerato y «Educación superior»; no hay FP."],
            ["Descripción", "Obligatoria, hasta 10.000 caracteres. Aquí pegas tu criterio literal, o tu RA con sus CE."],
            ["Competencias", "Con «Agregar estándares». De España solo hay cuatro conjuntos, de Primaria y ESO."],
          ].map(([t, d], i) => (
            <li key={t} className={cls.tarjeta}>
              <p className={`text-base font-bold uppercase tracking-wider ${TONO.morado.texto}`}>{`Campo ${i + 1}`}</p>
              <h4 className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-100">{t}</h4>
              <p className={`mt-2 ${cls.texto}`}>{d}</p>
            </li>
          ))}
        </ol>
        <div className={`mt-5 rounded-2xl border p-4 ${TONO.morado.caja}`}>
          <p className={`text-lg ${TONO.morado.tinta}`}>
            <b>Si das clase en FP:</b> en «Nivel de grado» elige el más parecido (Bachillerato para grado medio, Educación
            superior para grado superior) y pega en «Descripción» tu RA, sus CE y, si quieres, tu ficha entera: caben. Los
            estándares de España son de Primaria y ESO (Ciencia, Ciencias Sociales, Lengua y Literatura y Matemáticas): no
            traen FP, ni Bachillerato, ni el currículo valenciano. <b>Tus criterios van en la descripción.</b>
          </p>
        </div>
      </Bloque>

      {/* ═══ 4 · Feedback ══════════════════════════════════════════════ */}
      <Bloque
        id="feedback"
        etiqueta="4 · Feedback"
        titulo="Un comentario útil para cada alumno"
        entradilla={
          <>
            Aquí es donde más rinde la IA: un comentario concreto para cada trabajo, que antes no daba tiempo a escribir.
            El truco para hacerlo sin riesgos es <b>que Copilot solo vea códigos</b>.
          </>
        }
      >
        <Anonimizar />
      </Bloque>

      <Bloque
        nivel={3}
        titulo="Dos fortalezas, una mejora, un paso"

      >
        <Prompt text={texto("s3-feedback")} etiqueta="Prompt · feedback para toda la clase" />
      </Bloque>

      <Bloque nivel={3} titulo="Qué se pega y qué no">
        <DosColumnas
          nivel={4}
          centro="pero"
          a={{
            titulo: "Sí, con la cuenta del centro",
            tono: "verde",
            puntos: [
              "El texto del trabajo, sin nombre ni datos que identifiquen.",
              "El código A01, A02… y tu rúbrica.",
              "Tu valoración o la nota propuesta, si hace falta.",
            ],
          }}
          b={{
            titulo: "Nunca, en ninguna IA",
            tono: "rosa",
            puntos: [
              "Datos de salud, NEE, informes o adaptaciones.",
              "Situaciones familiares o personales.",
              "Fotos donde se vea la cara de un alumno.",
            ],
          }}
        />
        <Fuente id="guiaCefire" />
      </Bloque>

      <Bloque
        nivel={3}
        titulo="Lo que falla toda la clase"
        entradilla="Con las valoraciones de un grupo entero, la IA encuentra en un minuto el error que se repite. Tu próxima clase empieza ahí."
      >
        <Prompt text={texto("s3-patrones")} etiqueta="Prompt · lo que falla toda la clase" />
      </Bloque>

      {/* ═══ 5 · Exámenes ══════════════════════════════════════════════ */}
      <Bloque
        id="examenes"
        etiqueta="5 · Exámenes"
        titulo="Corregir exámenes con IA"
        entradilla={
          <>
            Copilot lee fotos: un examen en papel se puede transcribir y valorar con tu rúbrica. Funciona si el examen
            tiene <b>criterios claros</b> y si tú <b>revisas cada propuesta</b> con la hoja delante. Estos son los cinco
            pasos.
          </>
        }
      >
        <FlujoExamen />
      </Bloque>

      <Paso n={4} titulo="Prepara el examen y anonimízalo">
        <Checklist
          items={[
            { texto: "Preguntas con criterio claro", detalle: "«Define y pon un ejemplo» se corrige mejor que «comenta»." },
            { texto: "La rúbrica, escrita antes", detalle: "Y la solución de referencia de cada pregunta." },
            { texto: "Un código en la cabecera", detalle: "El alumnado escribe A07, no su nombre. La lista la guardas tú." },
            { texto: "Fotos nítidas", detalle: "Una por página, de frente, con buena luz y sin caras." },
          ]}
        />
      </Paso>

      <Paso
        n={5}
        titulo="Pide una propuesta con citas"
        entradilla={
          <>
            Adjunta las fotos con el botón <b>+</b> de la caja («Agregar y administrar orígenes»). Pídele que transcriba
            antes de valorar y que cite cada puntuación: así revisas en segundos si tiene razón.
          </>
        }
      >
        <Prompt text={texto("s3-corregir-examen")} etiqueta="Prompt · propuesta de corrección" />
      </Paso>

      <Paso n={6} titulo="Revisa, decide y explica">
        <Checklist
          items={[
            { texto: "Compara la transcripción con la foto", detalle: "Si leyó mal una palabra, todo lo demás falla." },
            { texto: "Comprueba cada cita", detalle: "Que la frase exista y diga lo que la IA dice que dice." },
            { texto: "Rehaz los cálculos", detalle: "En matemáticas y en ciencias, la IA se equivoca con aplomo." },
            { texto: "Los casos frontera, tú", detalle: "Un 4,8 o un 9,6 se deciden con el examen en la mano." },
            { texto: "Apunta dónde no coincides", detalle: "Tras unos cuantos exámenes sabrás cuánto puedes fiarte." },
            { texto: "Explica cómo has corregido", detalle: "Al alumnado y, si preguntan, a las familias." },
          ]}
        />
      </Paso>

      <Bloque nivel={3} titulo="Dónde ahorra tiempo y dónde no">
        <DosColumnas
          nivel={4}
          centro="y"
          a={{
            titulo: "Rinde mucho",
            tono: "verde",
            puntos: [
              "Preguntas de desarrollo con una rúbrica clara.",
              "Problemas con razonamiento, si rehaces tú los cálculos.",
              "El comentario individual: es su mayor aportación.",
              "Ver qué error se repite en toda la clase.",
            ],
          }}
          b={{
            titulo: "Rinde poco",
            tono: "ambar",
            puntos: [
              "Tests cerrados: Aules o Forms ya los corrigen solos.",
              "Redacción creativa y voz propia: revisarla cuesta casi lo mismo.",
              "Letra muy difícil de leer.",
              "Proyectos complejos, donde mirar el diseño es trabajo experto.",
            ],
          }}
        />
      </Bloque>

      <Bloque
        nivel={3}
        titulo="Un caso real: corregir dos veces"
        entradilla={
          <>
            Así corrige Edu los proyectos de su curso de Programación con IA, en FP: cada entrega la corrigen{" "}
            <b>dos modelos por separado</b> con la misma rúbrica. Uno es el del servidor del instituto; el otro solo ve la
            entrega <b>anonimizada</b>, con un código aleatorio. Él revisa la media y la publica, y el alumnado ve cómo se
            ha hecho.
          </>
        }
      >
        <DobleCorreccion />
      </Bloque>

      <Bloque
        nivel={3}
        titulo="Tu protocolo en una página"
        anchoJunto={700}
        junto={<Codigo code={PROTOCOLO} kind="md" etiqueta="mi-protocolo-de-correccion.md" />}
        entradilla={
          <>
            Esta es la pieza de hoy. Cópialo, ajústalo a tu materia y <b>compártelo con tu grupo</b>: explicar cómo
            corriges da más confianza que esconder que usas IA.
          </>
        }
      >
        <p className={cls.texto}>
          Si en tu centro no hay un servidor propio, tu versión es más sencilla: Copilot con la cuenta del centro,
          trabajos con código y tu revisión. Y si dudas de una propuesta, ábrele una conversación nueva y compara.
        </p>
      </Bloque>

      {/* ═══ 6 · Tareas y normas ═══════════════════════════════════════ */}
      <Bloque
        id="tareas"
        etiqueta="6 · Tareas y normas"
        titulo="Tareas que la IA no resuelve sola"
        entradilla={
          <>
            Si una tarea se puede encargar entera a un chat y no se nota, el problema no es el alumno: es el diseño. La
            salida es pedir <b>el producto y el proceso</b>, con hitos que dejan evidencia en clase.
          </>
        }
      >
        <ProductoProceso />
      </Bloque>

      <Bloque
        nivel={3}
        titulo="Rediseña una tarea tuya"
        entradilla="Coge la tarea que más te preocupa y pídele a Copilot que la convierta en hitos. El criterio de evaluación no cambia."
      >
        <Prompt text={texto("s3-tarea-proceso")} etiqueta="Prompt · tarea con proceso visible" />
      </Bloque>

      <Bloque
        nivel={3}
        titulo="Los detectores de IA no funcionan"
        entradilla="Antes de fiarte de uno, tres datos. Y lo que sí puedes hacer cuando sospechas."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta nivel={4} tono="rosa" titulo="Ni su fabricante pudo">
            OpenAI retiró en 2023 su propio detector: reconocía solo el <b>26 %</b> de los textos hechos con IA y marcaba
            como IA el <b>9 %</b> de los escritos por personas.
          </Tarjeta>
          <Tarjeta nivel={4} tono="ambar" titulo="Castigan a quien escribe sencillo">
            Un estudio de Stanford (2023) vio que marcaban como IA el <b>61 %</b> de las redacciones de estudiantes no
            nativos. Escribir con frases simples parece «de máquina».
          </Tarjeta>
          <Tarjeta nivel={4} tono="verde" titulo="Si sospechas, conversa">
            «Explícame este párrafo», un fragmento reescrito en clase y puntuar lo que sabe defender. Nunca una acusación
            basada solo en un detector.
          </Tarjeta>
        </div>
      </Bloque>

      <Bloque
        nivel={3}
        titulo="Normas de IA para tu grupo"
        entradilla={
          <>
            Prohibirla no funciona; ponerle reglas, sí. Indica en cada tarea un <b>nivel de uso</b> y pide que se declare
            siempre: qué herramienta, para qué y qué cambió el alumno.
          </>
        }
      >
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Nivel 0 · Sin IA", "En clase, a mano o en un examen.", "rosa"],
            ["Nivel 1 · IA para ideas", "Buscar enfoques; el texto es suyo.", "ambar"],
            ["Nivel 2 · IA para revisar", "Corregir su borrador y decir qué cambió.", "azul"],
            ["Nivel 3 · IA libre", "Cualquier uso, siempre declarado.", "verde"],
          ].map(([t, d, tono]) => (
            <li key={t} className={`rounded-2xl border p-4 ${TONO[tono as keyof typeof TONO].caja}`}>
              <h4 className={`text-xl font-bold ${TONO[tono as keyof typeof TONO].texto}`}>{t}</h4>
              <p className={`mt-1 ${cls.texto}`}>{d}</p>
            </li>
          ))}
        </ol>
        <div className={`mt-5 rounded-2xl border p-4 ${TONO.gris.caja}`}>
          <p className={`text-lg ${TONO.gris.tinta}`}>
            <b>Con el alumnado, solo apps autorizadas en AppsEdu.</b> A noviembre de 2026, Copilot, ChatGPT y Gemini no
            aparecen en el catálogo: no las exijas en clase. Lo que sí puedes regular es cómo se declara su uso cuando
            la usan por su cuenta.
          </p>
        </div>
        <Fuente id="appsedu" />
      </Bloque>

      <Bloque
        nivel={3}
        titulo="Redacta tus normas con Copilot"
        entradilla="Una versión que se lea en clase en cinco minutos, con el lenguaje de la edad de tu grupo."
      >
        <Prompt text={texto("s3-normas-ia")} etiqueta="Prompt · normas de uso de la IA" />
      </Bloque>

      <Aviso titulo="Para leer con calma" tono="gris">
        <p>Cuatro artículos de apps-educativas.com que amplían esta sesión, con datos y fuentes:</p>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {LECTURAS.map((l) => (
            <li key={l.u}>
              <a href={l.u} target="_blank" rel="noopener noreferrer" className={cls.enlace}>
                {l.t}
              </a>
            </li>
          ))}
        </ul>
      </Aviso>

      <ParaAmpliar
        id="ampliar"
        entradilla="La corrección de exámenes en directo, los shorts de «IA en clase» sobre rúbricas, feedback y detectores, y el Reglamento de IA explicado."
        ids={[
          "jGhicjeUz24",
          ["pZvW2ENzJjQ", 2419],
          "tG2_SBBqp0Q",
          "8FOXlFX1wRg",
          "vuuAQe2AoJU",
          "oU_CeUjhjis",
          "XL2aZId8h1o",
          "mxMTg7m-Npg",
          "O-mYNYBK2KE",
        ]}
      />

      <Tarea
        n={3}
        tiempo="unas dos horas"
        items={[
          {
            texto: "Elige un RA o un criterio",
            detalle: "Uno que vayas a evaluar este trimestre, copiado literal.",
          },
          {
            texto: "Genera su rúbrica",
            detalle: "Con el prompt del paso 2 y tu ficha de la sesión 1.",
          },
          {
            texto: "Pásale la prueba de justicia",
            detalle: "Tres trabajos sin nombre: flojo, medio y bueno.",
          },
          {
            texto: "Corrige tú primero",
            detalle: "Pon tu nota a esos tres trabajos sin mirar lo que diga la IA.",
          },
          {
            texto: "Compara con la propuesta de la IA",
            detalle: "Apunta dónde no coincidís y por qué: esa es tu tasa de fiabilidad.",
          },
          {
            texto: "Escribe tus normas de IA",
            detalle: "Para un grupo tuyo, con los cuatro niveles, y léelas en clase.",
          },
        ]}
        resultado={
          <>
            Una rúbrica probada con trabajos reales, una idea clara de cuánto puedes fiarte de la IA en tu materia, tu
            protocolo de corrección y unas normas de IA para tu grupo.
          </>
        }
      />

      <LoQueTeLlevas n={3}>
        <p>
          La IA te ahorra horas en lo que más pesa al corregir: <b>aplicar la rúbrica igual al trabajo 3 y al 23</b> y{" "}
          <b>escribir un comentario útil para cada alumno</b>. Pero solo ocupa una casilla del ciclo: los criterios, la
          revisión y la nota son tuyos.
        </p>
        <p>
          Te llevas una <b>rúbrica con la prueba de justicia pasada</b> y <b>tu protocolo en una página</b>: códigos en
          vez de nombres, Copilot con la cuenta del centro, citas en cada puntuación y tu firma al final. En la sesión 4
          lo pondrás a trabajar para planificar el curso, y en la{" "}
          <Link href={`${RAIZ}sesion-05/`} className={cls.enlace}>
            sesión 5
          </Link>{" "}
          las cuentas de la nota las hará tu propia herramienta.
        </p>
      </LoQueTeLlevas>

      <NavSesiones n={3} />
    </div>
  );
}
