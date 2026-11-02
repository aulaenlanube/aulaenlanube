import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/components/Link";
import {
  Aviso,
  Bloque,
  C,
  Checklist,
  Codigo,
  DosColumnas,
  Lista,
  Paso,
  Prompt,
  TONO,
  Tarjeta,
  cls,
} from "@/app/programacion-ia/_video/piezas";
import { HERRAMIENTAS, RAIZ } from "../_datos";
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
import { AnatomiaAgente, CorreoSeguro, DelProblemaAlEncargo, DondePiensa, GratisDePago, Temporalizacion, TresPreguntas } from "./figuras";
import { P4 } from "./prompts";

export const metadata: Metadata = {
  title: "Sesión 4 · Planificar el curso y crear tu asistente — Seminario de IA para docentes – Aula en la nube",
  description:
    "Temporalización, programación didáctica, actas y correos con IA; tu propio agente de Copilot con la cuenta @edu.gva.es, paso a paso; IA sin salir de tu ordenador con LM Studio, y el encargo de la herramienta que construirás en la sesión 5. Para docentes de FP, ESO y Bachillerato.",
  alternates: { canonical: `${RAIZ}sesion-04/` },
};

const DOC_AGENTES = "https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/agent-builder-build-agents";
const DOC_LICENCIAS = "https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/prerequisites#agent-capabilities-and-licensing-models";

function Externo({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls.enlace}>
      {children}
    </a>
  );
}

export default function Sesion4() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <CabeceraSesion n={4} />
      <VideoResumen n={4} />

      <EnEstaSesion
        tono="morado"
        items={[
          ["temporalizar", "Planificar el curso"],
          ["correos", "Actas, reuniones y correos"],
          ["agente", "De chat a agente"],
          ["asistente", "Tu asistente de Copilot"],
          ["local", "IA sin salir de tu ordenador"],
          ["elige", "Elige tu herramienta"],
          ["encargo", "El encargo de tu herramienta"],
          ["tarea", "Tu tarea de esta sesión"],
        ]}
      />

      {/* ═══ 1 · Planificar el curso ═════════════════════════════════════ */}
      <Bloque
        id="temporalizar"
        etiqueta="Planificar"
        titulo="Planificar el curso con IA"
        entradilla={
          <>
            Planificar es donde la IA ahorra más horas… y donde más daño hace si la dejas decidir. Su papel es{" "}
            <b>hacer las cuentas y escribir el borrador</b>. El tuyo, poner los datos reales —tu calendario, tu
            currículo, tu grupo— y <b>revisar cada cifra</b> antes de darla por buena.
          </>
        }
      >
        <Temporalizacion />
      </Bloque>

      <Bloque
        titulo="Los datos que pones tú"
        nivel={3}
        entradilla="La IA no conoce tu horario ni tu calendario. Lo que no le des, se lo inventa con toda la seguridad del mundo."
      >
        <DosColumnas
          centro="y"
          a={{
            titulo: "En FP",
            tono: "azul",
            puntos: [
              "Las horas totales del módulo, que fija el currículo del título.",
              "Los resultados de aprendizaje (RA) con su ponderación.",
              "Tus unidades de trabajo y, si toca, el periodo de formación en empresa.",
            ],
          }}
          b={{
            titulo: "En ESO y Bachillerato",
            tono: "verde",
            puntos: [
              "Las horas semanales de tu materia en tu horario.",
              "Competencias específicas, criterios de evaluación y saberes básicos.",
              "Las situaciones de aprendizaje que ya tengas pensadas.",
            ],
            pie: (
              <>
                Y en los dos casos, <b>el calendario escolar oficial</b> del curso, copiado de su fuente: inicio, fin,
                festivos y evaluaciones.
              </>
            ),
          }}
        />
      </Bloque>

      <Bloque
        titulo="El prompt de la temporalización"
        nivel={3}
        anchoJunto={700}
        junto={<Prompt text={P4["s4-temporalizacion"].texto} etiqueta="Prompt · temporalización" />}
        entradilla="Seis bloques, como en la sesión 1, con tu ficha dentro. Pide siempre una tabla: se revisa de un vistazo."
      >
        <Lista
          className={cls.texto}
          items={[
            <>
              <b>Pega el calendario tal cual</b>, del documento oficial. No le preguntes cuándo son los festivos.
            </>,
            <>
              <b>Una semana de margen</b> por evaluación: siempre pasa algo (una salida, una huelga, una gripe).
            </>,
            <>
              <b>La regla 2 es la importante:</b> obliga a que la suma cuadre, y el control final te dice si no.
            </>,
            <>
              <b>¿No te convence el reparto?</b> No lo rehagas a mano: dile qué cambiar y que vuelva a sumar.
            </>,
          ]}
        />
      </Bloque>

      <Aviso titulo="Las cuentas, revísalas tú" tono="ambar">
        <p>
          Un modelo de lenguaje <b>predice palabras, no cuenta</b>. Es muy habitual que una tabla de horas «parezca»
          correcta y no sume lo que dice, o que meta clase en un festivo. Por eso el prompt le pide la suma al final.
        </p>
        <p>
          Comprueba tú dos cosas antes de usarla: que <b>el total de horas</b> es el de tu currículo y que{" "}
          <b>ninguna semana</b> cae en vacaciones. Dos minutos con una calculadora te ahorran un disgusto en mayo.
        </p>
      </Aviso>

      <Bloque
        titulo="La programación didáctica"
        nivel={3}
        entradilla="La programación es un documento con tu firma. La IA puede ayudarte a ordenarla y a encontrar huecos; las decisiones siguen siendo tuyas."
      >
        <DosColumnas
          centro="y"
          a={{
            titulo: "Lo que puede hacer la IA",
            tono: "morado",
            puntos: [
              "Redactar apartados a partir de las decisiones que ya has tomado.",
              "Revisar que cada RA o criterio se trabaja y se evalúa.",
              "Preparar una versión corta para el alumnado o las familias.",
              "Pasar a limpio tablas y temporalizaciones.",
            ],
          }}
          b={{
            titulo: "Lo que es tuyo",
            tono: "ambar",
            puntos: [
              "La metodología, la ponderación y los criterios de calificación.",
              "Cómo atiendes a la diversidad de tu grupo real.",
              "La normativa: la copias de la fuente oficial, no de la IA.",
              "La firma: lo que entregas, lo defiendes tú.",
            ],
          }}
        />
      </Bloque>

      <Bloque
        titulo="Revisar la coherencia de tu programación"
        nivel={3}
        anchoJunto={700}
        junto={<Prompt text={P4["s4-coherencia"].texto} etiqueta="Prompt · revisar la programación" />}
        entradilla="Adjunta tu programación al chat de Copilot y pídele una revisión, no una reescritura. Es el uso con menos riesgo y más rendimiento."
      >
        <p className={cls.texto}>
          Fíjate en el detalle de la tarea: <b>«No reescribas nada todavía»</b>. Primero quieres el diagnóstico, en una
          tabla. Con la tabla delante decides tú qué arreglar, y entonces se lo pides apartado por apartado.
        </p>
        <p className={`mt-3 ${cls.texto}`}>
          Una programación no lleva datos personales: puedes adjuntarla sin miedo. Aun así, hazlo siempre con la cuenta
          del centro.
        </p>
      </Bloque>

      {/* ═══ 2 · Actas, reuniones y correos ══════════════════════════════ */}
      <Bloque
        id="correos"
        etiqueta="Fuera del aula"
        titulo="Actas, reuniones y correos"
        entradilla={
          <>
            Es el trabajo que nadie ve y que más tardes se come. Aquí la IA brilla: ordena tus notas y te da un
            borrador con el tono justo. Pero recuerda el semáforo de la sesión 1: en el chat,{" "}
            <b>sin nombres y sin datos de salud</b>.
          </>
        }
      >
        <CorreoSeguro />
      </Bloque>

      <Bloque
        titulo="El acta, a partir de tus notas"
        nivel={3}
        anchoJunto={700}
        junto={<Prompt text={P4["s4-acta"].texto} etiqueta="Prompt · acta" />}
        entradilla="Toma notas como puedas durante la reunión: frases sueltas, abreviaturas, flechas. Lo importante es que estén los acuerdos."
      >
        <p className={cls.texto}>
          La regla clave es <b>«no añadas nada que no esté en mis notas»</b>. Sin ella, el acta sale redonda… con
          acuerdos que nadie tomó. Y la palabra «FALTA» te marca lo que tienes que completar tú antes de firmarla.
        </p>
      </Bloque>

      <Bloque
        titulo="El correo difícil a una familia"
        nivel={3}
        anchoJunto={700}
        junto={<Prompt text={P4["s4-correo-familia"].texto} etiqueta="Prompt · correo a una familia" />}
        entradilla="Cuando el correo cuesta escribirlo, la IA te ayuda a encontrar el tono. El contenido y el nombre, los pones tú."
      >
        <Lista
          className={cls.texto}
          items={[
            <>
              <b>Describe la situación, no a la persona:</b> «la alumna de 2.º B», nunca su nombre ni un diagnóstico.
            </>,
            <>
              <b>Pide dos versiones</b> y quédate con frases de las dos.
            </>,
            <>
              <b>La última línea del prompt</b> es la que más vale: te avisa de lo que podría sentar mal.
            </>,
            <>
              <b>Antes de enviarlo, léelo en voz alta.</b> Si no lo dirías así en una tutoría, cámbialo.
            </>,
          ]}
        />
      </Bloque>

      <Bloque
        titulo="Empresas y comunicados de tutoría"
        nivel={3}
        entradilla="Dos encargos cortos que se repiten cada curso. Guárdalos en tu biblioteca y cambia solo los huecos."
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="min-w-0">
            <p className={`mb-2 text-base font-bold uppercase tracking-wider ${TONO.azul.texto}`}>En FP · formación en empresa</p>
            <Prompt text={P4["s4-correo-empresa"].texto} etiqueta="Prompt · correo a una empresa" />
          </div>
          <div className="min-w-0">
            <p className={`mb-2 text-base font-bold uppercase tracking-wider ${TONO.verde.texto}`}>En ESO · tutoría</p>
            <Prompt text={P4["s4-comunicado"].texto} etiqueta="Prompt · comunicado de tutoría" />
          </div>
        </div>
      </Bloque>

      {/* ═══ 3 · De chat a agente ════════════════════════════════════════ */}
      <Bloque
        id="agente"
        etiqueta="El salto"
        titulo="De chat a agente"
        entradilla={
          <>
            Hasta ahora, cada conversación empezaba de cero y tú pegabas tu ficha una y otra vez. Un <b>agente</b> es un
            chat que ya lo sabe: lleva unas <b>instrucciones</b> que lee siempre, un <b>conocimiento</b> que consulta y
            unas <b>herramientas</b> que puede usar.
          </>
        }
      >
        <AnatomiaAgente />
      </Bloque>

      <Bloque titulo="Chat y agente, cara a cara" nivel={3}>
        <DosColumnas
          a={{
            titulo: "Un chat",
            tono: "gris",
            puntos: [
              "Empieza de cero en cada conversación.",
              "Le pegas tu ficha cada vez que quieres algo afinado.",
              "Perfecto para encargos sueltos y preguntas rápidas.",
            ],
          }}
          b={{
            titulo: "Un agente",
            tono: "morado",
            puntos: [
              "Tu ficha y tus reglas ya van dentro, siempre.",
              "Responde igual hoy que dentro de tres meses.",
              "Lo compartes con tu departamento y todos ganan.",
            ],
          }}
        />
      </Bloque>

      <Bloque
        titulo="Dos agentes en este seminario"
        nivel={3}
        entradilla="Los dos son agentes, pero no hacen lo mismo. Hoy construyes el primero; en la próxima sesión, usas el segundo."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tarjeta titulo="Copilot: escribe contigo" tono="morado" antetitulo="Hoy">
            Vive en Copilot y habla contigo. Escribe textos: actividades, rúbricas, correos, explicaciones. Lo que te da,
            lo copias y lo usas tú. No toca nada de tu ordenador.
          </Tarjeta>
          <Tarjeta titulo="OpenCode: construye por ti" tono="rosa" antetitulo="Próxima sesión">
            OpenCode vive en tu ordenador. Crea y edita ficheros por ti, prueba lo que hace y te pide permiso antes de cada
            cambio. De tu encargo sale una herramienta web que funciona sola.
          </Tarjeta>
        </div>
      </Bloque>

      {/* ═══ 4 · Tu asistente de Copilot ═════════════════════════════════ */}
      <Bloque
        id="asistente"
        etiqueta="Tu asistente"
        titulo="Tu asistente de Copilot"
        entradilla={
          <>
            Copilot trae un creador de agentes dentro del propio chat: <b>Agent Builder</b>. Con tu cuenta del centro y
            sin pagar nada puedes crear agentes con instrucciones y webs públicas. Es justo lo que necesitas: que tu
            ficha vaya siempre dentro.
          </>
        }
      >
        <GratisDePago />
        <Fuente id="agentes" />
        <p className="mt-1 text-base text-zinc-600 dark:text-zinc-400">
          Detalle de lo que entra en cada licencia:{" "}
          <Externo href={DOC_LICENCIAS}>Agent capabilities and licensing models (Microsoft Learn)</Externo> (30 de
          septiembre de 2026).
        </p>
      </Bloque>

      <Aviso titulo="Si no te aparece la opción" tono="ambar">
        <p>
          El creador de agentes lo puede activar o desactivar el administrador de las cuentas, que en tu caso es la
          Conselleria. Hoy, con una cuenta @edu.gva.es, aparece en <b>«Agentes» → «Nuevo agente»</b>.
        </p>
        <p>
          <b>Plan B si un día no está:</b> guarda las instrucciones del paso 3 en un documento y pégalas al empezar cada
          conversación, o trabaja con el cuaderno de la sesión 2. Pierdes comodidad, no el método.
        </p>
      </Aviso>

      <Paso
        n={1}
        titulo="Abre el creador de agentes"
        entradilla={
          <>
            En <C>copilot.cloud.microsoft</C>, con tu cuenta del centro, abre <b>«Agentes»</b> en la barra lateral y
            pulsa <b>«Nuevo agente»</b>. Primero te propone describirlo con tus palabras; si pulsas <b>«Omitir»</b>, la
            pantalla se parte en dos: a la izquierda, un chat para pedir cambios; a la derecha, el formulario.
          </>
        }
      >
        <DosColumnas
          centro="o"
          a={{
            titulo: "Describirlo con tus palabras",
            tono: "gris",
            puntos: [
              "En «Cree su propio agente especialista» le cuentas qué quieres.",
              "Él rellena nombre, descripción e instrucciones.",
              "Rápido, pero genérico si no le das tu ficha.",
            ],
          }}
          b={{
            titulo: "Configurarlo a mano",
            tono: "morado",
            puntos: [
              "Pulsa «Omitir» y pasas al modo «Configurar».",
              "Rellenas cada campo y pegas tu ficha tal cual.",
              "Lo que hacemos aquí: ya tienes todo escrito.",
            ],
          }}
        />
      </Paso>

      <Paso
        n={2}
        titulo="Nombre y descripción"
        entradilla={
          <>
            El <b>nombre</b> admite 30 caracteres. En <b>«Describe tu agente»</b> caben hasta 1.000, pero bastan dos
            frases: le sirven a Copilot para saber cuándo usarlo y a tus compañeros para saber para qué es.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tarjeta titulo="Ayudante de Montaje · 1.º SMR" tono="azul" antetitulo="Ejemplo en FP">
            <p>
              Prepara actividades, prácticas de taller y rúbricas del módulo de Montaje y Mantenimiento de Equipos,
              alineadas con sus RA y CE.
            </p>
          </Tarjeta>
          <Tarjeta titulo="Ayudante de Biología · 3.º ESO" tono="verde" antetitulo="Ejemplo en ESO">
            <p>
              Prepara situaciones de aprendizaje, actividades y rúbricas de Biología y Geología de 3.º de ESO, alineadas
              con sus criterios de evaluación.
            </p>
          </Tarjeta>
        </div>
        <p className={`mt-4 ${cls.texto}`}>
          Deja el <b>«Modo de respuesta»</b> en «Automático»: el agente decide cuándo pensar más despacio.
        </p>
      </Paso>

      <Paso
        n={3}
        titulo="Escribe las instrucciones"
        anchoJunto={700}
        junto={<Codigo code={P4["s4-instrucciones"].texto} kind="md" rango={[1, 12]} etiqueta="Instrucciones · parte 1 de 2" />}
        entradilla={
          <>
            Es lo que el agente lee <b>antes de cada respuesta</b>: hasta 8.000 caracteres en el campo{" "}
            <b>«Instrucciones»</b>. Tu ficha cabe de sobra.
          </>
        }
      >
        <Lista
          className={cls.texto}
          items={[
            <>
              <b>Copia la plantilla entera</b> con el botón y rellena los huecos en mayúsculas.
            </>,
            <>
              <b>Pega tu ficha</b> de la sesión 1 donde dice «PEGA AQUÍ TU FICHA».
            </>,
            <>
              <b>«Qué haces»</b> dice para qué sirve; ajústalo a lo que más te pidas a ti mismo.
            </>,
            <>
              El botón <b>«Sugerir mejoras»</b> propone cambios: léelos antes de aceptarlos.
            </>,
          ]}
        />
      </Paso>

      <Bloque
        titulo="Las instrucciones, segunda parte"
        nivel={3}
        anchoJunto={700}
        junto={<Codigo code={P4["s4-instrucciones"].texto} kind="md" rango={[14, 25]} etiqueta="Instrucciones · parte 2 de 2" />}
        entradilla="La parte que más importa: lo que el agente no debe hacer nunca. Son las tres reglas del seminario, traducidas para él."
      >
        <p className={cls.texto}>
          <b>No inventa normativa, no decide notas y te avisa si se cuela un dato personal.</b> Y la última línea le
          obliga a decirte qué revisar: es tu recordatorio de que lo que firma la IA lo firmas tú.
        </p>
        <p className={`mt-3 ${cls.texto}`}>
          Ojo: <b>quien use tu agente puede llegar a ver lo que hay en sus instrucciones</b>. Por eso la ficha no lleva ni
          un nombre.
        </p>
      </Bloque>

      <Paso
        n={4}
        titulo="Conocimiento y capacidades"
        entradilla={
          <>
            En <b>«Conocimiento»</b> le das fuentes concretas. Con la versión gratuita, las que funcionan son{" "}
            <b>webs públicas</b>: se añaden con «Agregar conocimiento», escribiendo el vínculo.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Tarjeta titulo="Webs que sí sirven" tono="verde" nivel={4}>
            <Lista
              items={[
                "La página pública de tu ciclo o tu materia.",
                "La web de tu departamento o tu blog de aula.",
                "Una web oficial de referencia de tu especialidad.",
              ]}
            />
            <p className="mt-2">
              Hasta cuatro, de dos niveles como mucho: <C>web.es/a/b</C> sí; <C>web.es/a/b/c</C>, no.
            </p>
          </Tarjeta>
          <Tarjeta titulo="Ficheros: en la gratuita, no" tono="rosa" nivel={4}>
            Según Microsoft, en Copilot Chat (Básico) los ficheros como conocimiento de un agente son de pago por uso,
            desactivado por defecto. Lo esencial, mételo en las instrucciones; los documentos largos, en tu cuaderno de
            la sesión 2.
          </Tarjeta>
          <Tarjeta titulo="Lo que ya trae de serie" tono="ambar" nivel={4}>
            Escribir código, crear archivos de Word, Excel y PowerPoint y generar gráficos e ilustraciones. La{" "}
            <b>«Búsqueda en la Web»</b> viene activada: déjala, o apágala si quieres que se ciña a tus webs.
          </Tarjeta>
        </div>
      </Paso>

      <Paso
        n={5}
        titulo="Pruébalo antes de crearlo"
        anchoJunto={700}
        junto={<Prompt text={P4["s4-pruebas"].texto} etiqueta="Cinco pruebas · una por mensaje" />}
        entradilla={
          <>
            Arriba a la derecha, el desplegable <b>«Configurar»</b> cambia a <b>«Vista previa»</b>: ahí hablas con el
            agente mientras lo ajustas. Lánzale estas cinco
            peticiones, una por mensaje: cada una comprueba una regla.
          </>
        }
      >
        <ol className={`list-decimal space-y-1.5 pl-6 ${cls.texto}`}>
          <li>Debe decir a qué RA o criterios responde.</li>
          <li>Rúbrica con niveles y el criterio citado.</li>
          <li>Tiene que reconocer que no lo sabe, o preguntarte.</li>
          <li>Propone cómo calcularla; la decisión te la deja a ti.</li>
          <li>Te avisa del nombre y del dato de salud. El nombre es inventado: nunca uses uno real.</li>
        </ol>
        <p className={`mt-3 ${cls.texto}`}>
          ¿Falla una? <b>Corrige las instrucciones, no discutas con la respuesta.</b>
        </p>
      </Paso>

      <Bloque
        titulo="Las indicaciones sugeridas"
        nivel={3}
        entradilla={
          <>
            En <b>«Indicaciones sugeridas»</b> añades botones de inicio (hasta doce), cada uno con un título y un
            mensaje. Son lo primero que ve un compañero al abrir tu agente. Cuatro que funcionan:
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Actividad en tres niveles", "La misma actividad, con tres andamiajes y una sola rúbrica."],
            ["Rúbrica de un criterio", "Cuatro niveles con descriptores observables."],
            ["Explícalo más fácil", "El mismo contenido para quien va con más dificultades."],
            ["Diez preguntas de repaso", "Con su solución y el error típico de cada una."],
          ].map(([t, d]) => (
            <Tarjeta key={t} titulo={t} nivel={4} suave>
              {d}
            </Tarjeta>
          ))}
        </div>
        <p className={`mt-4 ${cls.texto}`}>
          Cuando las cinco pruebas salen bien, pulsa <b>«Crear»</b>. Te pedirá que nombre, descripción e instrucciones no
          estén en blanco.
        </p>
      </Bloque>

      <Paso
        n={6}
        titulo="Compártelo con tu departamento"
        entradilla={
          <>
            Recién creado, el agente es <b>privado</b>: solo lo ves tú. Desde el propio agente, en su opción de compartir,
            añades compañeros por nombre o correo y eliges qué pueden hacer.
          </>
        }
      >
        <DosColumnas
          a={{
            titulo: "Solo chatear",
            tono: "verde",
            puntos: ["Lo usa, pero no lo cambia.", "Lo normal para el profesorado del departamento."],
          }}
          b={{
            titulo: "Editar",
            tono: "ambar",
            puntos: ["Lo cambia, lo comparte y lo puede borrar.", "Para quien lo mantiene contigo, como copropietario."],
          }}
        />
        <p className={`mt-4 ${cls.texto}`}>
          También puedes copiar el enlace del agente y mandarlo por Teams. Y cuando cambies algo, tus compañeros no lo
          verán hasta que lo actualices. Detalle oficial:{" "}
          <Externo href={DOC_AGENTES}>Build agents in Agent Builder (Microsoft Learn, 26 de octubre de 2026)</Externo>.
        </p>
      </Paso>

      {/* ═══ 5 · IA sin salir de tu ordenador ════════════════════════════ */}
      <Bloque
        id="local"
        etiqueta="Opcional"
        titulo="IA sin salir de tu ordenador"
        entradilla={
          <>
            <b>LM Studio</b> es un programa gratuito que descarga un modelo de IA abierto y lo ejecuta en tu propio
            ordenador. Lo que escribes no sale de él y funciona sin internet. No sustituye a Copilot: es otra opción.
          </>
        }
      >
        <DondePiensa />
      </Bloque>

      <Bloque titulo="LM Studio: ventajas y límites" nivel={3}>
        <DosColumnas
          centro="pero"
          a={{
            titulo: "Ventajas",
            tono: "verde",
            puntos: [
              "Funciona sin conexión: en el tren o con la red del centro caída.",
              "Nada de lo que escribes sale de tu equipo.",
              "Gratis, sin cuentas y sin límites de uso.",
            ],
          }}
          b={{
            titulo: "Límites",
            tono: "rosa",
            puntos: [
              "Pide un ordenador con bastante memoria; si no, va lento.",
              "Los modelos que caben en casa se equivocan más que Copilot.",
              "Hay que instalarlo: el portátil del centro quizá no te deje.",
              "No está en AppsEdu: es para tu trabajo, nunca con alumnado.",
            ],
            pie: <>Y no cambia las reglas: el semáforo de la sesión 1 sigue valiendo aquí.</>,
          }}
        />
      </Bloque>

      {/* ═══ 6 · Elige tu herramienta ════════════════════════════════════ */}
      <Bloque
        id="elige"
        etiqueta="Hacia la sesión 5"
        titulo="Elige tu herramienta"
        entradilla={
          <>
            En la sesión 5 un agente te construye una <b>herramienta web a tu medida</b>. Hoy eliges cuál.
          </>
        }
      >
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {HERRAMIENTAS.map((h) => (
            <li key={h.id} className={`${cls.tarjeta} min-w-0`}>
              <h3 className={`text-xl font-bold ${TONO[h.tono].texto}`}>{h.titulo}</h3>
              <p className={`mt-2 ${cls.texto}`}>{h.hace}</p>
              {h.ejemplo ? (
                <Link href={`${RAIZ}tu-herramienta/`} className={`mt-2 inline-block text-base ${cls.enlace}`}>
                  Ver el ejemplo resuelto →
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </Bloque>

      <Bloque
        titulo="Tres preguntas para elegir"
        nivel={3}
        entradilla="Si dudas entre dos, quédate con la que responde «sí» a las tres. Y si tienes una idea que no está en la lista, mejor: pásala por las mismas preguntas."
      >
        <TresPreguntas />
      </Bloque>

      {/* ═══ 7 · El encargo ══════════════════════════════════════════════ */}
      <Bloque
        id="encargo"
        etiqueta="Tu encargo"
        titulo="El encargo de tu herramienta"
        entradilla={
          <>
            Un agente construye lo que le pides, ni más ni menos. El <b>encargo</b> es una página que lo dice todo: qué
            problema resuelve, qué entra, qué sale y, sobre todo, <b>qué no hace</b>. Lo escribes con Copilot en dos
            pasos.
          </>
        }
      >
        <DelProblemaAlEncargo />
      </Bloque>

      <Paso
        n={7}
        titulo="Deja que Copilot te entreviste"
        anchoJunto={700}
        junto={<Prompt text={P4["s4-entrevista"].texto} etiqueta="Prompt · la entrevista" />}
        entradilla="Es el metaprompt de la sesión 1 llevado al extremo: en vez de pedirle la respuesta, le pides que te pregunte."
      >
        <Lista
          className={cls.texto}
          items={[
            <>
              <b>Hazlo en tu asistente nuevo:</b> ya conoce tu ficha.
            </>,
            <>
              <b>Contesta con ejemplos reales</b> de tu semana, con cifras: «tardo una hora cada viernes».
            </>,
            <>
              <b>Pega la plantilla del paso 8</b> donde dice, para que el encargo salga con su forma.
            </>,
            <>
              <b>Si se alarga,</b> dile «ya tienes bastante: redacta el encargo».
            </>,
          ]}
        />
      </Paso>

      <Paso
        n={8}
        titulo="Revisa el encargo y guárdalo"
        anchoJunto={700}
        junto={<Codigo code={P4["s4-plantilla-encargo"].texto} kind="md" rango={[1, 17]} etiqueta="Plantilla del encargo · parte 1 de 2" />}
        entradilla="Esta es la plantilla que pegas en la entrevista. Lo que Copilot te devuelva, léelo como si fueras el agente que tiene que construirlo."
      >
        <p className={cls.texto}>
          <b>El problema</b> necesita un ejemplo real y cuánto tiempo te cuesta: es lo que guía cada decisión del agente.
        </p>
        <p className={`mt-3 ${cls.texto}`}>
          <b>Las pantallas</b>, pocas: dos o tres. Una herramienta que hace una cosa bien vale más que una que hace diez
          a medias.
        </p>
      </Paso>

      <Bloque
        titulo="La plantilla del encargo, segunda parte"
        nivel={3}
        anchoJunto={700}
        junto={<Codigo code={P4["s4-plantilla-encargo"].texto} kind="md" rango={[19, 33]} etiqueta="Plantilla del encargo · parte 2 de 2" />}
        entradilla="Las reglas fijas no se tocan: son las que hacen que tu herramienta funcione sin internet y que tus datos no salgan de tu ordenador."
      >
        <p className={cls.texto}>
          <b>«Qué NO hace»</b> es la sección que más se olvida y la que más te protege: sin ella, cada petición añade algo
          y la herramienta crece hasta romperse.
        </p>
        <p className={`mt-3 ${cls.texto}`}>
          <b>«Cómo sabré que funciona»</b> son tus tres pruebas: las harás nada más abrirla en la sesión 5.
        </p>
      </Bloque>

      <Bloque
        titulo="Antes de darlo por bueno"
        nivel={3}
        entradilla={
          <>
            Pasa esta lista y guárdalo en OneDrive: en la sesión 5 lo pegarás en OpenCode tal cual. Si quieres ver uno
            terminado, el del cuaderno de evaluación está en{" "}
            <Link href={`${RAIZ}tu-herramienta/`} className={cls.enlace}>
              tu herramienta, paso a paso
            </Link>
            .
          </>
        }
      >
        <Checklist
          items={[
            { texto: "Cabe en una página", detalle: "Si ocupa tres, hay dos herramientas dentro: elige una." },
            { texto: "El problema tiene un ejemplo", detalle: "Con una situación real y el tiempo que te cuesta hoy." },
            { texto: "Dice qué NO hace", detalle: "Al menos dos cosas que quedan fuera a propósito." },
            { texto: "Reglas fijas intactas", detalle: "Un fichero, sin internet, datos en el navegador." },
            { texto: "Tres pruebas concretas", detalle: "Que puedas hacer en dos minutos al abrirla." },
            { texto: "Ningún dato personal", detalle: "Ni en el encargo ni en los ejemplos: datos inventados." },
          ]}
        />
      </Bloque>

      <ParaAmpliar
        ids={["3uvGObre7t0", "e3JGzKJ70rA", "7G-y0yFu8V0", "hg7Kt0jkCvU", ["pM8Eam7_exg", 3422], "Zc2siCcNeHg"]}
        entradilla="Planificar una evaluación entera, la IA sin internet, cómo aprender con ella, por qué tu trabajo no se va a ninguna parte y cómo crear un asistente por asignatura (en Gemini, la misma idea)."
      />

      <Tarea
        n={4}
        tiempo="unas dos horas"
        items={[
          {
            texto: "Crea tu asistente",
            detalle: "Pasos 1 a 4: nombre, descripción, tus instrucciones con la ficha y, si quieres, una o dos webs.",
          },
          {
            texto: "Pruébalo con las cinco pruebas",
            detalle: "Y corrige las instrucciones cada vez que falle una, hasta que salgan las cinco.",
          },
          {
            texto: "Úsalo con cinco encargos reales",
            detalle: "Lo que tengas que preparar esta semana. Apunta qué te ha ahorrado y qué has corregido.",
          },
          {
            texto: "Compártelo con un compañero",
            detalle: "Con permiso para chatear. Pídele que lo pruebe y te diga qué echa de menos.",
          },
          {
            texto: "Elige herramienta y escribe su encargo",
            detalle: "Las tres preguntas, la entrevista y la plantilla. Guárdalo en OneDrive.",
          },
          {
            texto: "Instala OpenCode Desktop",
            detalle: (
              <>
                Sigue el paso de instalación de la{" "}
                <Link href={`${RAIZ}sesion-05/#instalar`} className={cls.enlace}>
                  sesión 5
                </Link>{" "}
                y ábrelo una vez. Si tu portátil no te deja instalar, no pasa nada: la sesión 5 tiene un plan B.
              </>
            ),
          },
        ]}
        resultado="Un asistente de Copilot que ya conoce tu materia y tus reglas, compartido con tu departamento, y el encargo de tu herramienta listo para pegarlo en la sesión 5."
      />

      <LoQueTeLlevas n={4}>
        <p>
          <b>Planificar</b> con IA es darle tus datos reales y revisar sus cuentas: el borrador es suyo; la temporalización,
          la programación y los correos que firmas, tuyos.
        </p>
        <p>
          Tienes un <b>asistente de Copilot</b> que ya sabe quién eres, qué enseñas y qué no debe hacer nunca, y lo puedes
          compartir con tu departamento sin pagar nada.
        </p>
        <p>
          Y tienes el <b>encargo de tu herramienta</b>: una página que dice qué construir y qué no. En la sesión 5, un
          agente lo convierte en una web que funciona sola.
        </p>
      </LoQueTeLlevas>

      <NavSesiones n={4} />
    </div>
  );
}
