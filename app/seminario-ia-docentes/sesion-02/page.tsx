import type { Metadata } from "next";
import Link from "@/components/Link";
import { Aviso, Bloque, C, Checklist, Codigo, DosColumnas, Lista, Paso, Prompt, TONO, Tarjeta, cls } from "@/app/programacion-ia/_video/piezas";
import { RAIZ, sesion } from "../_datos";
import { CabeceraSesion, EnEstaSesion, Fuente, LoQueTeLlevas, NavSesiones, ParaAmpliar, Tarea, VideoResumen } from "../_ui";
import { BibliotecaPrompts, CaminoMaterial, FlujoAules, GuionDiapositivas, PiezasUnidad, SietePiezas, SinConFuentes, TeachSalidas } from "./figuras";
import { p2 } from "./prompts";

const S = sesion(2);

export const metadata: Metadata = {
  title: `Sesión 2 · ${S.titulo} — Seminario de IA para docentes – Aula en la nube`,
  description:
    "Preparar clases con IA en FP, ESO y Bachillerato: un cuaderno de Copilot con tu currículo, Enseñar (Teach) para planes y cuestionarios, una unidad de trabajo o situación de aprendizaje completa, láminas y presentaciones, y bancos de preguntas en GIFT para Aules.",
  alternates: { canonical: S.ruta },
};

// Un fichero GIFT de ejemplo: una pregunta de FP, otra de ESO y otra de unidades.
const GIFT = `// Pregunta 1 · opción múltiple con retroalimentación
::P1 · Riesgo eléctrico::¿Qué dispositivo protege a las personas frente a los contactos indirectos?{
=Interruptor diferencial#Corta en cuanto detecta una fuga a tierra.
~Magnetotérmico#Protege la instalación frente a sobrecargas, no a las personas.
~Fusible#Actúa ante cortocircuitos y sobrecargas, no ante fugas.
}

// Pregunta 2 · verdadero o falso
::P2 · Ciclo del agua::La condensación del vapor de agua forma las nubes.{T}

// Pregunta 3 · respuesta corta (vale cualquiera de las dos)
::P3 · Unidades::¿En qué unidad del SI se mide la potencia?{=vatio =W}`;

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Sesion2() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <CabeceraSesion n={2} />
      <VideoResumen n={2} />

      <EnEstaSesion
        tono="verde"
        items={[
          ["camino", "Del currículo al material"],
          ["cuaderno", "Un cuaderno con tus fuentes"],
          ["ensenar", "Enseñar: el espacio para docentes"],
          ["unidad", "Una unidad completa con un prompt"],
          ["materiales", "Materiales que entran por los ojos"],
          ["aules", "Preguntas para Aules"],
          ["biblioteca", "Tu biblioteca de prompts"],
          ["ampliar", "Vídeos para ampliar"],
          ["tarea", "Tu tarea"],
        ]}
      />

      {/* ═══ 1 · El camino ═══════════════════════════════════════════════ */}
      <Bloque
        id="camino"
        etiqueta="El método"
        titulo="Del currículo al material"
        entradilla={
          <>
            Preparar clase con IA no es escribir «hazme una clase de…». Es recorrer el camino de siempre, del currículo a
            los materiales, con un ayudante muy rápido que hace el trabajo pesado en cada tramo. <b>Tú decides en cada
            parada</b>: qué criterio, qué grupo, qué se queda y qué se tira.
          </>
        }
      >
        <CaminoMaterial />
      </Bloque>

      <Bloque
        titulo="Mismo camino, dos vocabularios"
        nivel={3}
        entradilla="La IA conoce las palabras de las dos etapas, pero solo las usa bien si se las das tú, copiadas de tu currículo. En cada prompt de hoy eliges la opción de tu etapa."
      >
        <DosColumnas
          centro="o"
          a={{
            titulo: "En FP",
            tono: "azul",
            puntos: [
              "Módulo profesional, con sus resultados de aprendizaje (RA) y sus criterios de evaluación (CE).",
              "La unidad de trabajo agrupa uno o varios RA y se organiza en prácticas y actividades.",
              <>
                Pide <b>«unidad de trabajo»</b> y pega el RA y los CE literales.
              </>,
            ],
          }}
          b={{
            titulo: "En ESO y Bachillerato",
            tono: "verde",
            puntos: [
              "Materia, con competencias específicas, criterios de evaluación y saberes básicos.",
              "La situación de aprendizaje plantea un reto y un producto final con sentido.",
              <>
                Pide <b>«situación de aprendizaje»</b> y pega la competencia y sus criterios literales.
              </>,
            ],
          }}
        />
      </Bloque>

      <Aviso titulo="La regla de toda la sesión" tono="verde">
        <p>
          <b>El contenido lo pones tú; el acabado, la IA. Nunca al revés.</b> Cuando le das tus criterios, tus
          definiciones y tu grupo, recibes <i>tu</i> material bien maquetado. Cuando no se los das, recibes algo bonito y
          genérico que podría ser de cualquiera, y eso el alumnado lo nota enseguida.
        </p>
        <p>
          Por eso todos los prompts de hoy empiezan igual: <C>[PEGA AQUÍ TU FICHA]</C>, la ficha de tu materia o módulo
          que escribiste en la <Link href={`${RAIZ}sesion-01/`} className={cls.enlace}>sesión 1</Link>.
        </p>
      </Aviso>

      {/* ═══ 2 · El cuaderno ═════════════════════════════════════════════ */}
      <Bloque
        id="cuaderno"
        etiqueta="Tus fuentes"
        titulo="Un cuaderno con tus fuentes"
        entradilla={
          <>
            Un chat normal contesta con lo que aprendió de internet: suena bien, pero puede mezclar el currículo de otra
            comunidad o inventarse un criterio. Un <b>cuaderno</b> es una carpeta de Copilot donde reúnes tus documentos;
            cuando le preguntas, busca primero en ellos y te dice de dónde sale cada cosa.
          </>
        }
      >
        <SinConFuentes />
      </Bloque>

      <Paso
        n={1}
        titulo="Crea el cuaderno de tu curso"
        entradilla={
          <>
            Entra en <C>copilot.cloud.microsoft</C> con tu cuenta @edu.gva.es (comprueba el escudo verde de protección de
            datos arriba). En la barra de la izquierda, <b>Cuadernos → Nuevo cuaderno</b>, y ponle un nombre que encuentres
            en junio: «Biología · 3.º ESO» o «Montaje de equipos · 1.º SMR». Después, añade tus documentos.
          </>
        }
      >
        <DosColumnas
          centro="y nunca"
          a={{
            titulo: "Sí, al cuaderno",
            tono: "verde",
            puntos: [
              "El currículo de tu materia o módulo (DOGV o BOE), en PDF.",
              "Tu programación didáctica y tus unidades del curso pasado.",
              "Tus apuntes, presentaciones y enunciados de prácticas.",
              "Tu ficha de la sesión 1.",
            ],
          }}
          b={{
            titulo: "Nunca, al cuaderno",
            tono: "rosa",
            puntos: [
              "Listas de clase, notas o fotos del alumnado.",
              "Informes, adaptaciones o datos de salud: ni aquí ni en ninguna IA.",
              "Exámenes corregidos con el nombre del alumno.",
              "Material con derechos que no es tuyo ni es público.",
            ],
          }}
        />
      </Paso>

      <Aviso titulo="Cuadernos, con tu cuenta del centro" tono="ambar">
        <p>
          Los cuadernos (Copilot Notebooks) entran <b>sin coste</b> con las licencias de Microsoft 365 Education, también
          en la versión gratuita de Copilot Chat, la que pone «Copilot Chat (Básico)» abajo a la izquierda, desde junio de
          2026. Están en la app Copilot, no dentro de OneNote.
        </p>
        <p>
          Microsoft no publica cuántos documentos admite la versión gratuita. Si te dice que no caben más, quédate con lo
          esencial: el currículo y tu programación.{" "}
          <a href="https://learn.microsoft.com/en-us/microsoft-365/loop/cpcn-requirements" {...ext} className={cls.enlace}>
            Requisitos de Cuadernos y Páginas (Microsoft Learn)
          </a>
          .
        </p>
      </Aviso>

      <Paso
        n={2}
        titulo="Pregúntale solo a tus fuentes"
        anchoJunto={760}
        junto={<Prompt text={p2("s2-mapa-curriculo")} etiqueta="Prompt · en tu cuaderno" />}
        entradilla={
          <>
            El primer encargo convierte tu currículo en un <b>mapa</b>: todos los RA o competencias con sus criterios,
            literales y con su página. Lo usarás en cada prompt del curso.
          </>
        }
      >
        <Lista
          className={cls.texto}
          items={[
            <>
              <b>Compruébalo con el PDF abierto</b>: tres filas al azar. Si una no coincide, díselo y que la corrija.
            </>,
            <>
              <b>Guarda la tabla</b> en tu ficha: a partir de hoy, copias los criterios de ahí.
            </>,
            <>
              Si contesta «no está en las fuentes», <b>es buena señal</b>: no se lo ha inventado.
            </>,
          ]}
        />
      </Paso>

      <Bloque
        titulo="Una pregunta con red"
        nivel={3}
        anchoJunto={760}
        junto={<Prompt text={p2("s2-pregunta-fuentes")} etiqueta="Prompt · en tu cuaderno" />}
        entradilla={
          <>
            Para cualquier otra duda sobre tu currículo o tu programación, pregunta con estas tres reglas delante. Pruébalo
            primero con algo cuya respuesta <b>ya sabes</b>: es la forma más rápida de saber cuánto te puedes fiar.
          </>
        }
      >
        <p className={cls.texto}>
          Ejemplos: «¿Qué criterios del RA 3 se pueden evaluar con una práctica de taller?» o «¿Qué saberes básicos de 2.º
          de ESO se relacionan con la competencia 4?».
        </p>
      </Bloque>

      <Bloque
        titulo="¿Y NotebookLM?"
        nivel={3}
        entradilla="Es la herramienta de Google que vimos en el seminario de febrero, y es muy buena. Pero cada una tiene su sitio."
      >
        <DosColumnas
          centro="o"
          a={{
            titulo: "Cuadernos de Copilot",
            tono: "azul",
            puntos: [
              "Con tu cuenta @edu.gva.es y la protección de datos de la organización.",
              "Es la IA corporativa que avala la guía del CEFIRE para el profesorado.",
              "La que usamos en este seminario.",
            ],
          }}
          b={{
            titulo: "NotebookLM de Google",
            tono: "gris",
            puntos: [
              "Muy completo: resúmenes en audio, mapas mentales y cuestionarios.",
              "La suite de la Conselleria es Microsoft 365: Google iría con tu cuenta personal.",
              "Solo con documentos públicos o tuyos, sin un solo dato del alumnado.",
            ],
          }}
        />
        <Fuente id="guiaCefire">Qué IA usar con qué datos</Fuente>
      </Bloque>

      {/* ═══ 3 · Enseñar (Teach) ═════════════════════════════════════════ */}
      <Bloque
        id="ensenar"
        etiqueta="Solo para docentes"
        titulo="Enseñar: el espacio para docentes"
        entradilla={
          <>
            En la barra de Copilot hay una entrada llamada <b>Enseñar</b> (en inglés, Teach): las «Herramientas de
            enseñanza». Viene activada con la cuenta del centro, A1 y A3, no cuesta nada y el alumnado no la ve. Le das tu
            contexto y te devuelve documentos que puedes editar.
          </>
        }
      >
        <TeachSalidas />
      </Bloque>

      <Bloque titulo="Lo que hace cada herramienta" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Tarjeta titulo="Plan de lección" nivel={4} tono="morado" antetitulo="Planificación">
            Objetivos, actividades y tiempos de una sesión, en un documento que retocas.
          </Tarjeta>
          <Tarjeta titulo="Plan de unidad" nivel={4} tono="morado" antetitulo="Planificación">
            Varias lecciones seguidas, con sus evaluaciones. Ideal para el esqueleto de una unidad.
          </Tarjeta>
          <Tarjeta titulo="Criterio de evaluación" nivel={4} tono="ambar" antetitulo="Evaluación">
            Es la <b>rúbrica</b>: criterios y niveles de logro. En la sesión 3 verás cómo saber si es justa.
          </Tarjeta>
          <Tarjeta titulo="Cuestionario" nivel={4} tono="ambar" antetitulo="Evaluación">
            Preguntas que se convierten en un <b>Microsoft Forms</b> listo para compartir.
          </Tarjeta>
          <Tarjeta titulo="Tarjetas de estudio" nivel={4} tono="verde" antetitulo="Actividades">
            Y también «Rellenar los espacios en blanco» y «Coincidencia», para repasar.
          </Tarjeta>
          <Tarjeta titulo="Modificar contenido existente" nivel={4} tono="azul" antetitulo="Adaptar">
            Pegas un material tuyo y le cambias el nivel de lectura, lo diferencias o le añades ejemplos.
          </Tarjeta>
        </div>
      </Bloque>

      <Aviso titulo="Enseñar no conoce tu currículo" tono="ambar">
        <p>
          Sus formularios piden el <b>«Nivel de grado»</b>: Infantil, Primaria, ESO, Bachillerato y «Educación superior».{" "}
          <b>No existe FP</b>: elige el nivel más parecido y describe tu módulo.
        </p>
        <p>
          En «Agregar estándares», de España solo hay <b>cuatro conjuntos</b> de Primaria y ESO: Ciencia, Ciencias Sociales,
          Lengua y Literatura y Matemáticas. Nada de FP, de Bachillerato ni del currículo valenciano. Por eso, en la{" "}
          <b>«Descripción»</b>, pega siempre tu ficha y los criterios literales.
        </p>
        <p>
          Genera muy bien en castellano; el valenciano no está entre los idiomas validados. Y Copilot <i>dentro</i> de Forms es
          de pago: el <b>Cuestionario de Enseñar</b>, que crea el Forms por ti, es la vía gratuita.
        </p>
        <Fuente id="teach">Qué hace Enseñar</Fuente>
      </Aviso>

      <Paso
        n={3}
        titulo="Tu primer plan de lección"
        anchoJunto={760}
        junto={<Prompt text={p2("s2-plan-leccion")} etiqueta="En la descripción del Plan de lección" />}
        entradilla="Cinco minutos y tienes el borrador de tu próxima sesión."
      >
        <ol className={`list-decimal space-y-2 pl-6 ${cls.texto} marker:font-bold marker:text-violet-700 dark:marker:text-violet-300`}>
          <li>Abre Copilot y pulsa Enseñar en la barra de la izquierda.</li>
          <li>En «Planificación del currículo», elige Plan de lección.</li>
          <li>Elige el «Nivel de grado» (en FP, el más parecido) y pega en la «Descripción» el texto de la derecha.</li>
          <li>Lee el resultado como el de un compañero en prácticas: qué falta, qué sobra y qué no funcionaría con tu grupo.</li>
        </ol>
      </Paso>

      {/* ═══ 4 · La unidad ═══════════════════════════════════════════════ */}
      <Bloque
        id="unidad"
        etiqueta="El encargo grande"
        titulo="Una unidad completa con un prompt"
        entradilla={
          <>
            Para una unidad entera, con su reto, su secuencia y su evaluación, necesitas más control que en Enseñar:{" "}
            <b>Copilot Chat con un encargo en seis bloques</b> y tu ficha delante. Esto es lo que tiene que salir.
          </>
        }
      >
        <PiezasUnidad />
      </Bloque>

      <Paso
        n={4}
        titulo="Pide la unidad o la situación"
        anchoJunto={760}
        junto={<Prompt text={p2("s2-unidad")} etiqueta="Prompt · Copilot Chat" />}
        entradilla="Vale igual para FP y para Secundaria: elige la opción de tu etapa en cada corchete."
      >
        <Lista
          className={cls.texto}
          items={[
            <>
              <b>Si sale muy larga</b>, pídela por partes: primero la tabla de sesiones y después cada sesión.
            </>,
            <>
              <b>Si una sesión no te convence</b>, pide solo esa: «Rehaz la sesión 3 con…».
            </>,
            <>
              <b>Guarda la versión buena fuera del chat</b>: en un Word, o en una página de Copilot (Páginas) para
              compartirla con tu departamento.
            </>,
            <>
              El <b>Control</b> del final es lo más valioso: te dice dónde mirar primero.
            </>,
          ]}
        />
      </Paso>

      <Bloque
        titulo="Cómo revisarla antes de darla"
        nivel={3}
        entradilla="Trátala como el borrador de un compañero muy rápido que no conoce a tu grupo. Seis preguntas:"
      >
        <Checklist
          items={[
            { texto: "¿Los criterios son literales?", detalle: "Compáralos con tu mapa: el fallo más frecuente es un criterio reescrito o inventado." },
            { texto: "¿Cabe en tu calendario real?", detalle: "Festivos, salidas y evaluaciones: la IA no los conoce." },
            { texto: "¿Tienes esos recursos?", detalle: "Taller, ordenadores, materiales, permisos para salir del centro." },
            { texto: "¿Cada criterio tiene instrumento?", detalle: "Si uno no se evalúa en ninguna parte, falta algo." },
            { texto: "¿La diversidad es la de tu grupo?", detalle: "Medidas para tu grupo real, no una lista genérica." },
            { texto: "¿Queda algún [COMPLETAR]?", detalle: "Lo rellenas tú, nunca la IA a ojo." },
          ]}
        />
      </Bloque>

      <Bloque
        titulo="Que la revise tu cuaderno"
        nivel={3}
        anchoJunto={760}
        junto={<Prompt text={p2("s2-revisar-unidad")} etiqueta="Prompt · en tu cuaderno" />}
        entradilla={
          <>
            El truco de la sesión: pega la unidad en tu cuaderno y deja que la compare <b>con tus fuentes</b>. Encuentra en
            un minuto el criterio mal copiado que a ti te costaría media hora.
          </>
        }
      />

      {/* ═══ 5 · Materiales ══════════════════════════════════════════════ */}
      <Bloque
        id="materiales"
        etiqueta="Lo visual"
        titulo="Materiales que entran por los ojos"
        entradilla={
          <>
            Copilot genera imágenes con la cuenta del centro, pero «hazme una infografía de…» devuelve un cartel bonito y
            vacío. Una lámina que se puede proyectar lleva <b>siete piezas</b> en el encargo.
          </>
        }
      >
        <SietePiezas />
      </Bloque>

      <Paso
        n={5}
        titulo="Pide tu primera lámina"
        anchoJunto={760}
        junto={<Prompt text={p2("s2-lamina")} etiqueta="Prompt · imagen en Copilot Chat" />}
        entradilla={
          <>
            Rellena los corchetes y, sobre todo, <b>dicta tú cada definición</b>: la IA solo la dibuja. Si se lo dejas a
            ella, se las inventa.
          </>
        }
      >
        <p className={cls.texto}>
          ¿Prefieres partir de algo hecho? En{" "}
          <a href="https://aulaenlanube.com/cadenas-de-prompts/" {...ext} className={cls.enlace}>
            Cadenas de prompts
          </a>
          , pestaña Infografías, tienes láminas de aula con el prompt exacto de cada una: copia el de la más parecida y
          cámbiale el tema.
        </p>
      </Paso>

      <Bloque titulo="Antes de proyectar, revísala" nivel={3}>
        <DosColumnas
          a={{
            titulo: "Lista para clase",
            tono: "verde",
            puntos: [
              "Textos sin faltas, sin palabras inventadas y con sus tildes.",
              "Cada rótulo señala lo que dice que señala.",
              "Los datos y las unidades son los que tú dictaste.",
            ],
          }}
          b={{
            titulo: "Lo que delata una imagen generada",
            tono: "rosa",
            puntos: ["Letras de más o palabras que no existen.", "Una flecha que apunta a otra cosa.", "Cifras inventadas en un gráfico de adorno."],
          }}
        />
        <p className={`mt-5 ${cls.texto}`}>
          <b>La regla de los diez segundos:</b> proyéctala, ve al fondo del aula y cuenta hasta diez. Si no se entiende de
          qué va, vuelve al prompt y pide menos cosas, más grandes.
        </p>
      </Bloque>

      <Bloque titulo="Imágenes: tres reglas" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="Nada de personajes ni marcas" nivel={4} tono="rosa">
            Ni de películas, ni de videojuegos, ni logos. Describe el personaje que quieres, no uno que ya existe.
          </Tarjeta>
          <Tarjeta titulo="Nunca caras del alumnado" nivel={4} tono="rosa">
            Ni para generar, ni para editar, ni como referencia. Tampoco caras reconocibles de personas reales.
          </Tarjeta>
          <Tarjeta titulo="Di que es generada" nivel={4} tono="verde">
            Muchas imágenes de IA llevan marcas invisibles que lo indican: no las quites. Y contarlo en clase es una lección
            de pensamiento crítico.
          </Tarjeta>
        </div>
      </Bloque>

      <Bloque
        titulo="Del guion a las diapositivas"
        nivel={3}
        entradilla={
          <>
            El error clásico es pedir «una presentación sobre X»: salen veinte diapositivas de viñetas. Se pide al revés:
            primero escribes tú el guion y luego pides la maqueta. Desde abril de 2026, sin licencia de pago, Copilot ya no
            está <i>dentro</i> de PowerPoint: se hace desde la app Copilot, con su <b>agente de PowerPoint</b>.
          </>
        }
      >
        <GuionDiapositivas />
      </Bloque>

      <Bloque
        titulo="El prompt de la presentación"
        nivel={3}
        anchoJunto={760}
        junto={<Prompt text={p2("s2-presentacion")} etiqueta="Prompt · Copilot Chat" />}
        entradilla={
          <>
            Pégalo en Copilot Chat y revisa el guion diapositiva a diapositiva. Cuando te guste, pídele al agente de
            PowerPoint que monte el archivo.
          </>
        }
      >
        <Lista
          className={cls.texto}
          items={[
            <>
              La columna <b>«qué digo yo»</b> va a las notas del orador: es tu explicación ensayada.
            </>,
            <>
              Los <C>[DATO]</C> los rellenas tú, con la fuente delante.
            </>,
            <>
              Con la licencia <b>A3</b> tienes además PowerPoint de escritorio para los retoques finos.
            </>,
          ]}
        />
      </Bloque>

      <Aviso titulo="Microsoft Learning Zone" tono="azul">
        <p>
          Una aplicación de <b>Windows 11</b> que convierte un tema o un documento tuyo en una lección interactiva, con
          diapositivas y preguntas, que el alumnado abre en el navegador del ordenador. Es gratis con las licencias
          educativas y ya no necesita un ordenador Copilot+: en cualquier Windows 11 genera lecciones de hasta 10
          diapositivas (esa opción se mantiene hasta el 1 de agosto de 2027). Genera en castellano, no en valenciano.
        </p>
        <p>
          <b>Antes de usarla con tu grupo</b>, mira si está en AppsEdu: la guía del CEFIRE solo permite con el alumnado las
          aplicaciones autorizadas.
        </p>
      </Aviso>

      {/* ═══ 6 · Aules ═══════════════════════════════════════════════════ */}
      <Bloque
        id="aules"
        etiqueta="Aules"
        titulo="Preguntas para Aules"
        entradilla={
          <>
            Aules, el Moodle de la Conselleria, se actualizó a Moodle 5.2 en julio de 2026 y no trae IA. Pero importa
            preguntas desde un fichero de texto. Si la IA te escribe ese fichero en el formato correcto, un banco de veinte
            preguntas te cuesta minutos, no una tarde.
          </>
        }
      >
        <FlujoAules />
        <Fuente id="aules" />
      </Bloque>

      <Bloque titulo="GIFT o Moodle XML" nivel={3} entradilla="Moodle entiende varios formatos. Para empezar, el más cómodo es GIFT.">
        <DosColumnas
          centro="o"
          a={{
            titulo: "Formato GIFT",
            tono: "verde",
            puntos: [
              "Texto plano que se lee y se corrige a simple vista.",
              "Opción múltiple, verdadero o falso, respuesta corta, numérica y emparejar.",
              "El que usaremos: lo revisas antes de importarlo.",
            ],
          }}
          b={{
            titulo: "Formato Moodle XML",
            tono: "azul",
            puntos: [
              "El más completo de Moodle: guarda más datos de cada pregunta.",
              "Útil para llevarte preguntas de otro curso o de otro Moodle.",
              "Más difícil de revisar a ojo.",
            ],
          }}
        />
      </Bloque>

      <Paso
        n={6}
        titulo="Pide las preguntas en GIFT"
        anchoJunto={760}
        junto={<Prompt text={p2("s2-gift")} etiqueta="Prompt · Copilot Chat" />}
        entradilla={
          <>
            Pídelas para <b>un criterio concreto</b> y con distractores que sean errores reales de tu alumnado. Las preguntas
            buenas no salen solas: salen de lo que tú sabes que fallan.
          </>
        }
      >
        <p className={cls.texto}>
          Si en tu materia hay cálculos, pide además: «resuelve cada pregunta numérica paso a paso antes de escribir la
          respuesta». Y compruébalo tú.
        </p>
      </Paso>

      <Bloque
        titulo="Así es un fichero GIFT"
        nivel={3}
        anchoJunto={760}
        junto={<Codigo code={GIFT} kind="txt" etiqueta="preguntas.txt" />}
        entradilla="Tres preguntas: una de FP, otra de ESO y otra que vale para las dos. No hace falta saber escribirlo, pero sí leerlo para revisarlo."
      >
        <ul className={`space-y-2 ${cls.texto}`}>
          <li>
            <C>::título::</C> nombra la pregunta en el banco.
          </li>
          <li>
            <C>=</C> marca la respuesta correcta y <C>~</C> las incorrectas.
          </li>
          <li>
            <C>#</C> añade la explicación que verá el alumnado.
          </li>
          <li>
            <C>{"{T}"}</C> o <C>{"{F}"}</C>: verdadero o falso.
          </li>
          <li>Una línea en blanco separa cada pregunta de la siguiente.</li>
        </ul>
      </Bloque>

      <Paso
        n={7}
        titulo="Impórtalas en Aules"
        entradilla={
          <>
            Copia el bloque de código, pégalo en el Bloc de notas y guárdalo como <C>preguntas.txt</C> (con la codificación
            UTF-8, que es la que usa por defecto). Después, en tu curso:
          </>
        }
      >
        <ol className={`list-decimal space-y-2 pl-6 ${cls.texto} marker:font-bold marker:text-amber-700 dark:marker:text-amber-300`}>
          <li>Entra en tu curso de Aules y abre Más → Bancos de preguntas.</li>
          <li>Abre el banco del curso y, en el menú de arriba, elige Importar.</li>
          <li>Formato GIFT; arrastra preguntas.txt y pulsa Importar.</li>
          <li>Moodle te enseña lo que ha leído; si una pregunta falla, te dice cuál y por qué.</li>
          <li>Revisa cada pregunta en la vista previa antes de ponerla en un cuestionario.</li>
        </ol>
        <p className={`mt-4 ${cls.tenue}`}>
          Si tu Aules muestra los menús con otros nombres, la importación sigue estando en el banco de preguntas; también
          llegas a él desde un cuestionario.{" "}
          <a href="https://docs.moodle.org/502/en/Import_questions" {...ext} className={cls.enlace}>
            Importar preguntas (documentación de Moodle)
          </a>
          .
        </p>
      </Paso>

      <Aviso titulo="Revisa la respuesta correcta, siempre" tono="rosa">
        <p>
          La IA se equivoca más de lo que parece en la respuesta «correcta», sobre todo en cálculos y en los matices de tu
          materia. Un cuestionario con una clave mal puesta enseña justo lo contrario de lo que quieres, y te cuesta una
          reclamación. <b>Lee cada pregunta como la leería tu alumno más listo</b> antes de publicarla.
        </p>
      </Aviso>

      {/* ═══ 7 · Biblioteca ══════════════════════════════════════════════ */}
      <Bloque
        id="biblioteca"
        etiqueta="Tu pieza de hoy"
        titulo="Tu biblioteca de prompts"
        entradilla={
          <>
            Un prompt que te ha funcionado vale oro: la próxima vez solo cambias los huecos. Guárdalos en un Word o en
            OneNote, en tu OneDrive, con los huecos entre corchetes. Junto con tu cuaderno, es la pieza que te llevas hoy.
          </>
        }
      >
        <BibliotecaPrompts />
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="Con sus huecos" nivel={4} tono="verde" suave>
            <C>[CURSO]</C>, <C>[CRITERIO]</C>…: así te sirve para otro grupo y otro curso.
          </Tarjeta>
          <Tarjeta titulo="Con una nota" nivel={4} tono="verde" suave>
            Para qué sirve y qué tuviste que corregir la primera vez.
          </Tarjeta>
          <Tarjeta titulo="Por momentos" nivel={4} tono="verde" suave>
            Preparar, evaluar, planificar: como la{" "}
            <Link href={`${RAIZ}prompts/`} className={cls.enlace}>
              biblioteca del seminario
            </Link>
            .
          </Tarjeta>
        </div>
      </Bloque>

      {/* ═══ Para ampliar, tarea y cierre ════════════════════════════════ */}
      <ParaAmpliar
        id="ampliar"
        titulo="Vídeos para ampliar"
        ids={["i2VB17Brw40", "zWgG2F5AkTU", "pHbb8uNrK3M", "p2wAa5AYuNo", "Z2AWL_YWqrY", "mtURjDFfFF0"]}
      />
      <ParaAmpliar
        titulo="Más ideas para tus clases"
        ids={["2hJdcvMoov0", "2vET-LM-LGY", ["pM8Eam7_exg", 2549], "LjsQAt7ygzo", "mxMTg7m-Npg"]}
        entradilla="El tramo del seminario de febrero en el que se crean preguntas para Aules empieza en el minuto 42."
      />

      <Tarea
        n={2}
        tiempo="unas tres horas"
        items={[
          { texto: "Tu cuaderno, con tres fuentes", detalle: "Currículo, programación y apuntes. Hazle diez preguntas cuya respuesta ya sepas y apunta cuántas cita bien." },
          { texto: "Una unidad o situación completa", detalle: "Con el prompt del paso 4 y revisada con las seis preguntas." },
          { texto: "Un cuestionario de verdad", detalle: "Importado en Aules en GIFT, o el que crea Enseñar en Microsoft Forms." },
          { texto: "Una lámina para proyectar", detalle: "Con las siete piezas, y que pase la regla de los diez segundos." },
          { texto: "Cinco prompts en tu biblioteca", detalle: "Los que te hayan funcionado, con sus huecos y una nota." },
          { texto: "Opcional: una presentación", detalle: "Desde tu guion, con el agente de PowerPoint de la app Copilot." },
        ]}
        resultado="Tu cuaderno del curso, una unidad lista para dar, un cuestionario en Aules o en Forms y los primeros prompts de tu biblioteca: la pieza 2 del hilo."
      />

      <LoQueTeLlevas n={2}>
        <p>
          Preparar clase con IA es recorrer el camino de siempre con un ayudante muy rápido: <b>tus fuentes en un
          cuaderno</b>, tu contexto en cada encargo y tu criterio en cada revisión. Enseñar para lo rápido, Copilot Chat con
          seis bloques para lo grande, imágenes con siete piezas y preguntas que Aules importa en minutos.
        </p>
        <p>
          En la sesión 3 usamos todo esto para lo más delicado: <b>evaluar y corregir</b>, sin que la IA ponga la nota.
        </p>
      </LoQueTeLlevas>

      <NavSesiones n={2} />
      <p className={`mt-8 max-w-[1100px] text-base ${TONO.gris.texto}`}>
        Rótulos de Copilot comprobados con una cuenta @edu.gva.es en noviembre de 2026. Si en tu pantalla algo se llama
        distinto, es que Microsoft lo ha movido: busca la misma idea con otro nombre.
      </p>
    </div>
  );
}
