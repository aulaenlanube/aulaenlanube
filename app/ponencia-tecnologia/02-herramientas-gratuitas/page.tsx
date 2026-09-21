import type { Metadata } from "next";
import PromptBlock from "@/components/PromptBlock";
import { ArbolCopilot, MapaCopilot } from "../_svg/copilot";
import { vecinos } from "../_datos";
import {
  Cierre,
  Contraste,
  Dentro,
  FichaPrompt,
  Fuera,
  Grabacion,
  H2,
  Lista,
  Migas,
  NavPie,
  Nota,
  P,
  Pasos,
  Portadilla,
  Rejilla,
  Tarjeta,
} from "../_ui/piezas";

export const metadata: Metadata = {
  title: "Bloque 2 · Copilot: el kit que ya tienes — Del prompt a la plaza — Aula en la Nube",
  description:
    "Qué incluye exactamente Copilot con la cuenta educativa de la Generalitat Valenciana (Microsoft 365 A1 y A3), qué es GitHub Copilot y por qué el profesorado verificado puede tener Copilot Pro gratis, cuál abrir para cada encargo y qué datos no se meten nunca en un chat.",
};

const { atras, adelante } = vecinos(2);

export default function Bloque2() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <Migas bloque={{ titulo: "Bloque 2", ruta: "/ponencia-tecnologia/02-herramientas-gratuitas/" }} />
      <Portadilla
        n={2}
        tono="morado"
        minutos={20}
        titulo="Copilot: el kit que ya tienes"
        entradilla={
          <>
            Media docena de herramientas distintas se llaman «Copilot», y esa confusión es
            responsable de la mitad de las decepciones. Aquí se aclara <b>cuál es cuál</b>, qué te da
            ya la cuenta del centro sin pagar un euro, por qué como docente puedes tener gratis la
            versión de pago de la que programa, y qué no se mete nunca en un chat.
          </>
        }
      />

      {/* ═══ 1. El mapa ═══════════════════════════════════════════════════ */}
      <H2 ante="El mapa" tono="morado">
        Seis herramientas, dos cuentas, un solo nombre
      </H2>
      <P>
        Lo primero es dejar de decir «Copilot» y empezar a decir cuál. De la{" "}
        <b>Identitat Digital del centro</b> cuelga una familia; de tu <b>cuenta personal de
        GitHub</b>, otra. No se parecen en nada: unas trabajan con texto, las otras con ficheros de
        tu ordenador. Pulsa cualquier pieza del mapa.
      </P>

      <MapaCopilot />

      <H2 ante="Lo que ya tienes" tono="azul">
        Qué te da tu cuenta @edu.gva.es
      </H2>
      <P>
        Esto es concreto y comprobable: la Conselleria asigna <b>licencia educativa de Microsoft
        365</b> a todo el profesorado, alumnado y personal de los centros públicos de titularidad de
        la Generalitat, vinculada a la Identitat Digital. Hay dos modalidades, <b>A1 y A3</b>, y la
        propia Conselleria publica quién tiene cuál.
      </P>
      <Rejilla>
        <Tarjeta tono="azul" titulo="A1 · la de la mayoría">
          Es la que tiene el profesorado de un IES ordinario, Tecnología incluida: Office solo en
          web, 50 GB de correo, 100 GB de OneDrive y Teams. <b>Copilot Chat entra igual</b> — no
          hace falta A3 para nada de lo que se ve en esta sesión.
        </Tarjeta>
        <Tarjeta tono="verde" titulo="A3 · familias concretas">
          Desde octubre de 2025 se asigna a FP de Informática y Comunicaciones, Administración y
          Gestión, y Comercio y Marketing; centros a distancia; conservatorios profesionales;
          enseñanzas artísticas superiores; EOI; y CEFIRE. Añade las aplicaciones de escritorio, 100
          GB de correo y 1 TB de OneDrive.
        </Tarjeta>
      </Rejilla>
      <P>
        En ambos casos, entrando con la cuenta del centro, <b>Copilot Chat</b> te da chat con
        búsqueda en la web, <b>subida y análisis de ficheros</b>, <b>generación de imágenes</b>,{" "}
        <b>cuadernos</b> (reúnes tus fuentes y preguntas solo sobre ellas, con guía de estudio y
        mapa mental), <b>páginas</b> (un borrador que se edita y se comparte) y el agente educativo{" "}
        <b>Study and Learn</b>. Y algo que no es un detalle menor: <b>protección de datos de la
        organización</b> — lo que le pegas con la cuenta institucional no alimenta el entrenamiento
        de los modelos, cosa que sí puede ocurrir con una cuenta personal gratuita.
      </P>

      <Nota tono="ambar" titulo="Compruébalo tú, hoy, y no te fíes de lo que viste el curso pasado">
        Esto se mueve deprisa. En abril de 2026 Microsoft retiró el Copilot Chat que aparecía{" "}
        <i>dentro</i> de Word, Excel, PowerPoint y OneNote para quien no tiene la licencia de pago en
        organizaciones grandes, y muchos docentes se encontraron con que el botón había desaparecido
        —el Copilot Chat de la aplicación propia, de la web y de Outlook siguió funcionando—. Por eso
        la única respuesta fiable a «¿qué tengo yo?» es abrir la sesión con tu cuenta y mirar. Si en
        la sesión aparece algo que en tu portátil no está, avisa: probablemente sea una diferencia de
        licencia y conviene saberlo antes del examen, no durante.
      </Nota>

      <H2 ante="La mejor noticia" tono="verde">
        GitHub Copilot Pro, gratis por ser docente
      </H2>
      <P>
        Esta cuenta no depende del centro: te la abres tú. Y <b>GitHub Education ofrece Copilot Pro
        sin coste al profesorado verificado</b>. Se solicita con el correo institucional y una prueba
        del vínculo laboral —carné docente o certificado de empleo—, y GitHub revisa la elegibilidad
        cada mes.
      </P>
      <Contraste
        bien={{
          titulo: "Con Copilot Pro de docente verificado",
          items: [
            "Completado de código ilimitado mientras escribes.",
            "Puedes elegir el modelo: no todos rinden igual según lo que pidas.",
            "Modo agente completo, que es el que monta las aplicaciones del bloque 5.",
            "Además, GitHub Team gratis (repositorios privados sin límite) y GitHub Classroom.",
          ],
        }}
        mal={{
          titulo: "Con el plan gratuito normal",
          items: [
            "2.000 completados de código al mes.",
            "50 peticiones de chat al mes: se agotan en una tarde de laboratorio.",
            "Sin elección de modelo: te toca el que el sistema decida.",
            "Modo agente sí, pero sin el agente que trabaja solo en la nube.",
          ],
        }}
      />
      <Nota tono="verde" titulo="Hazlo esta semana, aunque todavía no programes">
        La verificación no es inmediata y el plan gratuito normal se agota enseguida en cuanto
        empiezas a trabajar con un agente. Solicítalo en{" "}
        <Fuera href="https://github.com/education/teachers">github.com/education/teachers</Fuera>. Y
        si a ti no te aplica —porque aún no estás en activo—, el modo agente también existe en el
        plan gratuito: rinde menos, pero para el laboratorio de la sesión llega.
      </Nota>

      {/* ═══ 2. Cuál abro ═════════════════════════════════════════════════ */}
      <H2 ante="La decisión" tono="rosa">
        ¿Cuál abro para esto?
      </H2>
      <P>
        Casi todas las decepciones con la IA salen de haber abierto la herramienta equivocada. La
        pregunta correcta no es «¿qué herramienta uso?» sino <b>«¿qué quiero que exista cuando
        termine?»</b>. Un texto, un documento trabajado, una imagen o un programa. Pulsa cualquier
        rama.
      </P>

      <ArbolCopilot />

      {/* ═══ 3. Casos de uso ══════════════════════════════════════════════ */}
      <H2 ante="Casos de uso" tono="azul">
        Doce cosas que puedes hacer hoy mismo
      </H2>
      <P>
        Seis para el opositor que eres ahora y seis para el docente que serás. Todas con lo que ya
        tienes, sin pagar nada.
      </P>
      <Rejilla>
        <Tarjeta tono="azul" titulo="Para la oposición">
          <ul className="space-y-1.5">
            <li>• Esqueleto de un tema antes de estudiarlo, y las cinco preguntas probables.</li>
            <li>• Simulador de tribunal sobre tu propio tema redactado.</li>
            <li>• Diez supuestos didácticos realistas para practicar la parte práctica.</li>
            <li>• Reformular tus objetivos al lenguaje exacto del currículo vigente.</li>
            <li>• Un cuaderno con la normativa y tus apuntes, para preguntar solo sobre eso.</li>
            <li>• Repaso relámpago de diez preguntas en cinco minutos, en días alternos.</li>
          </ul>
        </Tarjeta>
        <Tarjeta tono="verde" titulo="Para el aula">
          <ul className="space-y-1.5">
            <li>• Rúbricas de evaluación a partir de los criterios que tú fijes.</li>
            <li>• La misma actividad en tres niveles de dificultad, para atender al grupo real.</li>
            <li>• Láminas y esquemas para proyectar (bloque 4).</li>
            <li>• Baterías de problemas con solución razonada y distractores creíbles.</li>
            <li>• Correos difíciles a familias: el borrador lo hace él, el criterio lo pones tú.</li>
            <li>• Simuladores y aplicaciones interactivas como las del bloque 5.</li>
          </ul>
        </Tarjeta>
      </Rejilla>

      <FichaPrompt
        tono="azul"
        etiqueta="Prompt · el más rentable del bloque"
        titulo="La misma actividad, en tres niveles"
      >
        <p className="mb-2">
          Este es el que más se usa una vez estás en el aula, y el que mejor queda en un supuesto de
          atención a la diversidad.
        </p>
        <PromptBlock
          text={`# Rol
Eres profesor de Tecnología de Secundaria con experiencia en grupos muy heterogéneos.

# Contexto
Curso: [CURSO]. Contenido: "[CONTENIDO]".
Grupo real: [Nº] alumnos, de los cuales [Nº] con dificultades de aprendizaje
y [Nº] que terminan siempre antes de tiempo. Dispongo de [Nº] minutos.

# Tarea
Dame UNA actividad en tres niveles, no tres actividades distintas:
el mismo enunciado base y la misma idea, con el andamiaje graduado.

# Reglas
1) Nivel 1: con los pasos guiados y los datos dados. Nivel 2: el estándar. Nivel 3: abierto,
   con una decisión de diseño que el alumno tenga que justificar.
2) Los tres niveles se corrigen con LA MISMA rúbrica: no puede haber alumnado de segunda.
3) Datos y magnitudes reales, con sus unidades.
4) Nada de material que no haya en un taller de instituto normal.

# Formato
Enunciado base · los tres niveles · la rúbrica común (3 criterios, 4 descriptores cada uno) ·
qué observo mientras trabajan para saber si lo están pillando.

# Control
Dime qué parte de esta actividad fallaría si el grupo llega más flojo de lo que he descrito.`}
        />
      </FichaPrompt>

      {/* ═══ 4. Lo que no se mete ═════════════════════════════════════════ */}
      <H2 ante="El límite" tono="rosa">
        Lo que no se mete nunca en un chat
      </H2>
      <P>
        Este apartado no es burocracia: es lo que separa usar la herramienta con criterio de tener un
        problema. Y en una defensa oral, saber decirlo suma tanto como saber usarla.
      </P>
      <Contraste
        bien={{
          titulo: "Puedes meter",
          items: [
            "Tus propios apuntes, tus temas y tus borradores.",
            "Normativa y currículo: son documentos públicos.",
            "Enunciados, actividades y rúbricas que has escrito tú.",
            "Datos anonimizados de verdad: «un alumno de 3.º con dificultades en cálculo».",
          ],
        }}
        mal={{
          titulo: "No metas nunca",
          items: [
            "Nombres, apellidos o iniciales de alumnado, ni sus notas asociadas a una persona.",
            "Fotos de menores, ni para generar, ni para editar, ni como referencia.",
            "Informes psicopedagógicos, dictámenes o datos de salud. Son categorías especiales.",
            "Datos de familias: teléfonos, direcciones, situaciones personales.",
          ],
        }}
      />
      <Lista
        tono="rosa"
        items={[
          <>
            <b>Con la cuenta del centro es más seguro, pero no es una barra libre.</b> La protección
            de datos de la organización evita que tus conversaciones alimenten el entrenamiento de
            los modelos; no te autoriza a tratar datos personales de terceros sin base legal.
          </>,
          <>
            <b>Antes de usar una herramienta con el alumnado, mira Appsedu.</b> Es el catálogo oficial
            de aplicaciones evaluadas por la Conselleria junto al Delegado de Protección de Datos, con
            estado de autorizada o no autorizada. Citarlo en una defensa demuestra que conoces el
            terreno real de un centro valenciano.
          </>,
          <>
            <b>Edad del alumnado.</b> En las cuentas educativas, el acceso del alumnado menor de 13
            años está bloqueado, y entre 13 y 17 depende de que el centro lo habilite expresamente.
            No es una decisión que tomes tú en tu aula: la toma el centro.
          </>,
          <>
            <b>Y una cautela honesta:</b> no hay a día de hoy una instrucción publicada de la
            Conselleria específica sobre uso de IA generativa en centros. Lo que sí hay es{" "}
            <b>formación</b>: un CEFIRE específico de Inteligencia Artificial y Pensamiento
            Computacional creado en 2025 y un plan de alfabetización en IA para el profesorado. Si en
            una defensa citas normativa autonómica de IA, asegúrate de que existe.
          </>,
        ]}
      />

      {/* ═══ 5. Práctica ══════════════════════════════════════════════════ */}
      <H2 ante="Para practicar" tono="morado">
        Tu kit montado en tres pasos
      </H2>
      <Pasos
        tono="morado"
        items={[
          <>
            <b>Hoy, cinco minutos:</b> entra con la cuenta del centro y abre Copilot Chat. Comprueba
            que te deja subir un fichero y generar una imagen. Ya tienes los bloques 3 y 4
            cubiertos.
          </>,
          <>
            <b>Hoy, diez minutos:</b> cuenta de GitHub y solicitud del programa educativo. Mientras
            se verifica, instala Visual Studio Code y la extensión de Copilot.
          </>,
          <>
            <b>Esta semana:</b> crea un cuaderno con tus tres temas más fuertes dentro y hazle diez
            preguntas. Es la mejor forma de comprobar si la herramienta responde sobre{" "}
            <i>tus</i> fuentes o se inventa cosas de fuera.
          </>,
          <>
            <b>Antes del examen:</b> ten el kit probado en un ordenador que no sea el tuyo. El día de
            la prueba no hay segunda oportunidad, y las sorpresas de licencia aparecen siempre en el
            peor momento.
          </>,
        ]}
      />

      <Cierre tono="morado">
        <b>Lo que te llevas de este bloque:</b> tienes pagado, con la cuenta del centro, un chat con
        protección de datos, ficheros, imágenes, cuadernos y un agente educativo. Y con una
        verificación de diez minutos, la versión de pago del Copilot que programa. La pregunta ya no
        es qué herramienta usar: es{" "}
        <b>qué quieres que exista cuando termines</b>. El resto es el árbol de decisión.
      </Cierre>

      <Grabacion matiz="Este es el bloque que más conviene volver a ver con el portátil delante: se sigue paso a paso mientras montas tu kit." />

      <P>
        Lo siguiente es ponerlo a trabajar sobre los 71 temas:{" "}
        <Dentro href="/ponencia-tecnologia/temario-con-ia/">bloque 3</Dentro>.
      </P>

      <NavPie atras={atras} adelante={adelante} />
    </div>
  );
}
