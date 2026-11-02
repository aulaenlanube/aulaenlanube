import type { Metadata } from "next";
import {
  Anatomia,
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
import { CicloMetaprompt, MapaCopilot, Semaforo, SiguientePalabra, SinContexto, TresNiveles, UnaFichaCuatroUsos } from "./figuras";
import { FICHA_ESO, FICHA_FP, p1 } from "./prompts";

export const metadata: Metadata = {
  title: "Sesión 1 · La IA que ya tienes y cómo pedirle las cosas — Seminario de IA para docentes – Aula en la nube",
  description:
    "Qué es una IA generativa y por qué se inventa cosas, qué te da Microsoft Copilot Chat con la cuenta @edu.gva.es (A1 y A3), el semáforo de datos de la guía del CEFIRE, el prompt en seis bloques, el metaprompt y la ficha de tu materia o módulo. Para docentes de FP, ESO y Bachillerato de la Comunitat Valenciana.",
  alternates: { canonical: "/seminario-ia-docentes/sesion-01/" },
};

const INDICE: [string, string][] = [
  ["que-es", "Qué es una IA generativa"],
  ["copilot", "El Copilot que ya tienes"],
  ["datos", "El semáforo de datos"],
  ["prompt", "El prompt en seis bloques"],
  ["metaprompt", "El metaprompt"],
  ["ficha", "La ficha de tu materia"],
  ["encargo", "Tu primer encargo real"],
  ["ampliar", "Vídeos para ampliar"],
  ["tarea", "Tu tarea de esta sesión"],
];

/** Un prompt de la sesión con su rótulo. */
function P({ id }: { id: string }) {
  const p = p1(id);
  return <Prompt text={p.texto} etiqueta={`Prompt · ${p.titulo}`} />;
}

export default function Sesion1() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <CabeceraSesion n={1}>
        Antes de pedirle nada a una IA conviene saber <b>qué es</b> (y qué no), <b>cuál tienes ya</b> pagada con tu cuenta
        del centro y <b>qué datos no pueden entrar nunca</b>. Con eso claro, aprendes a escribir encargos que rinden a la
        primera y te llevas la primera pieza del seminario: <b>la ficha de tu materia o módulo</b>.
      </CabeceraSesion>

      <VideoResumen n={1} />

      <EnEstaSesion items={INDICE} tono="azul" />

      {/* ═══ 1 · Qué es ═══════════════════════════════════════════════ */}
      <Bloque
        id="que-es"
        etiqueta="Sin humo"
        titulo="Qué es una IA generativa"
        entradilla={
          <>
            Un <b>modelo de lenguaje</b> (la pieza que hay dentro de Copilot, ChatGPT o Gemini) ha leído una cantidad enorme
            de texto y ha aprendido una sola cosa: <b>qué palabra suele venir detrás</b>. No busca en una base de datos ni
            comprueba nada. Escribe, palabra a palabra, lo más probable.
          </>
        }
      >
        <SiguientePalabra />
      </Bloque>

      <Bloque
        titulo="Por qué se inventa cosas"
        nivel={3}
        entradilla={
          <>
            A eso se le llama <b>alucinación</b>: una respuesta que suena perfecta y es falsa. No es un fallo raro; es la
            consecuencia directa de cómo funciona. Estos son los tres sitios donde más aparece.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="Normativa y referencias" tono="rosa" antetitulo="Cuidado 1">
            Un decreto con número y año, un artículo concreto o un libro con su autor. Suenan oficiales y pueden no existir.
          </Tarjeta>
          <Tarjeta titulo="Cifras y fechas" tono="rosa" antetitulo="Cuidado 2">
            Porcentajes, datos de un informe o el año de un hecho. Si el dato importa, lo buscas en la fuente.
          </Tarjeta>
          <Tarjeta titulo="Lo que no sabe de ti" tono="rosa" antetitulo="Cuidado 3">
            Tu currículo, tu grupo, tu horario. Si no se lo cuentas, lo rellena con lo más típico y no te avisa.
          </Tarjeta>
        </div>
        <p className={`mt-5 ${cls.texto}`}>
          La regla práctica: <b>todo lo que vaya a una programación, a una familia o a un documento oficial lo compruebas
          tú</b>. La IA te ahorra el borrador, no la revisión.
        </p>
      </Bloque>

      <Bloque
        titulo="Hoy un chat; en la sesión 5, un agente"
        nivel={3}
        entradilla="Casi todo el seminario usa la IA como chat. En la última sesión darás el salto a un agente, que no solo contesta: trabaja."
      >
        <DosColumnas
          a={{
            titulo: "Chat",
            antetitulo: "Sesiones 1 a 4",
            tono: "azul",
            puntos: [
              "Le escribes, te contesta con texto, imágenes o un documento.",
              "Tú copias, pegas, revisas y decides qué usar.",
              "Ideal para preparar, redactar, adaptar y corregir.",
            ],
          }}
          b={{
            titulo: "Agente",
            antetitulo: "Sesión 5",
            tono: "rosa",
            puntos: [
              "Tiene herramientas: crea y edita ficheros en una carpeta tuya.",
              "Trabaja en bucle hasta acabar, y te pide permiso para actuar.",
              "Con él te construirás una herramienta propia.",
            ],
          }}
        />
      </Bloque>

      {/* ═══ 2 · Copilot ══════════════════════════════════════════════ */}
      <Bloque
        id="copilot"
        etiqueta="Tu kit"
        titulo="El Copilot que ya tienes"
        entradilla={
          <>
            La Conselleria da a todo el profesorado una cuenta de Microsoft 365, la de <b>@edu.gva.es</b>, y con ella{" "}
            <b>Microsoft Copilot Chat</b>. La guía oficial del CEFIRE la llama «solución corporativa de IA»: lo que escribes
            no se usa para entrenar modelos y queda bajo los acuerdos entre la Generalitat y Microsoft.
          </>
        }
      >
        <MapaCopilot />
      </Bloque>

      <Bloque
        titulo="Qué incluye, pieza a pieza"
        nivel={3}
        entradilla="Todo esto entra con la cuenta del centro, sin licencia de pago, y casi todo está en la barra lateral de la izquierda. Las piezas que más vas a usar tienen su sesión."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Tarjeta titulo="Chat con la web" nivel={4} suave>
            Pregunta, redacta y resume; busca en internet si hace falta.
          </Tarjeta>
          <Tarjeta titulo="Tus ficheros" nivel={4} suave>
            Con el botón + de la caja subes un PDF, un Word o una foto.
          </Tarjeta>
          <Tarjeta titulo="Imágenes" nivel={4} suave>
            Láminas y apoyos visuales para tus clases (sesión 2).
          </Tarjeta>
          <Tarjeta titulo="Cuadernos" nivel={4} suave>
            Un cuaderno que responde con tus fuentes (sesión 2).
          </Tarjeta>
          <Tarjeta titulo="Biblioteca" nivel={4} suave>
            Lo que vas creando con Copilot, a mano en la barra lateral.
          </Tarjeta>
          <Tarjeta titulo="Agentes" nivel={4} suave>
            «Nuevo agente»: tu asistente con tus instrucciones (sesión 4).
          </Tarjeta>
          <Tarjeta titulo="Enseñar (Teach)" nivel={4} tono="azul" suave>
            Planes de lección, rúbricas y cuestionarios. Solo docentes (sesión 2).
          </Tarjeta>
          <Tarjeta titulo="Estudiar y aprender" nivel={4} tono="azul" suave>
            Un agente para estudiar, pensado para alumnado de 13 años o más.
          </Tarjeta>
        </div>
      </Bloque>

      <Bloque
        titulo="A1 o A3: qué licencia tienes"
        nivel={3}
        entradilla="Hay dos licencias educativas y la Conselleria publica quién tiene cada una. La buena noticia: todo el seminario funciona con la A1."
      >
        <DosColumnas
          centro="o"
          a={{
            titulo: "A1 · la mayoría",
            tono: "azul",
            puntos: [
              "Profesorado de ESO, Bachillerato y del resto de familias de FP.",
              "Word, Excel y PowerPoint en el navegador, OneDrive y Teams.",
              "Copilot Chat completo, con protección de datos.",
            ],
          }}
          b={{
            titulo: "A3 · centros y familias concretas",
            tono: "verde",
            puntos: [
              "FP de Informática y Comunicaciones, Administración y Gestión, y Comercio y Marketing.",
              "Educación a distancia, conservatorios, ISEACV, EOI y profesorado de los CEFIRE.",
              "Además, las aplicaciones de escritorio de Office.",
            ],
          }}
        />
        <Fuente id="licencias" />
      </Bloque>

      <Aviso titulo="Lo que cambió el 15 de abril de 2026" tono="ambar">
        <p>
          Sin licencia de pago, <b>desapareció el Copilot que había dentro de Word, Excel, PowerPoint y OneNote</b>. Sigue
          funcionando en el navegador, en la app de Copilot y en Outlook. Si abajo a la izquierda, junto a tu nombre, ves{" "}
          <b>«Copilot Chat (Básico)»</b>, es justo eso: la versión incluida, sin el botón dentro de Word.
        </p>
        <p>
          Si un tutorial te enseña ese botón, es anterior a abril. Y algunas guías todavía lo citan: ante la duda, lo que
          manda es lo que ves con tu cuenta.
        </p>
      </Aviso>

      <Paso
        n={1}
        titulo="Entra con tu cuenta del centro"
        entradilla="Cinco minutos que te ahorran disgustos: la protección de datos solo existe si entras con la cuenta del centro."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <ol className={`list-decimal space-y-2 pl-6 ${cls.texto}`}>
            <li>
              Abre <C>copilot.cloud.microsoft</C> en el navegador.
            </li>
            <li>
              Inicia sesión con tu cuenta <b>@edu.gva.es</b>, la de la Identitat Digital.
            </li>
            <li>
              Mira arriba a la derecha: un <b>escudo verde</b>. Al pasar el ratón sale «Protección de datos de empresa se
              aplica a este chat». Según la guía del CEFIRE, ese indicador confirma que estás en el entorno corporativo.
            </li>
            <li>
              Abajo a la izquierda, tu nombre con la etiqueta <b>«Trabajo»</b>.
            </li>
            <li>Prueba dos cosas: con el botón + sube un PDF y pídele un resumen; después, pídele una imagen.</li>
          </ol>
          <Tarjeta titulo="Si no ves el escudo verde" tono="rosa" nivel={4} className="self-start">
            Has entrado sin sesión o con una cuenta personal (Outlook, Hotmail, Gmail). Ahí no hay garantías: cierra sesión
            y vuelve a entrar con la del centro.
          </Tarjeta>
        </div>
        <Fuente id="guiaCefire" />
      </Paso>

      {/* ═══ 3 · Datos ════════════════════════════════════════════════ */}
      <Bloque
        id="datos"
        etiqueta="Protección de datos"
        titulo="El semáforo de datos"
        entradilla={
          <>
            La guía del CEFIRE para el curso 2026-2027 lo deja claro, y cabe en un semáforo. Sin datos personales, puedes usar
            la IA que quieras para preparar. Con ellos, solo la del centro. Y hay datos que no entran nunca.
          </>
        }
      >
        <Semaforo />
        <Fuente id="guiaCefire" />
      </Bloque>

      <Bloque
        titulo="Cómo se anonimiza"
        nivel={3}
        entradilla="Minimizar es pedir lo mismo con menos datos: códigos en lugar de nombres, grupos en lugar de personas y necesidades en lugar de diagnósticos."
      >
        <DosColumnas
          centro="mejor"
          a={{
            titulo: "Así no",
            tono: "rosa",
            puntos: [
              "«Laura Pérez, de 2.º de SMR, tiene un 3,5 en el RA2.»",
              "«Pablo tiene TDAH y no atiende en clase.»",
              "La lista de notas de la clase, con nombres y apellidos.",
            ],
          }}
          b={{
            titulo: "Así sí",
            tono: "verde",
            puntos: [
              "«A07, de 2.º de SMR: 3,5 en el RA de montaje.»",
              "«Un alumno al que le cuesta atender más de diez minutos.»",
              "Las notas con códigos A01-A24; la tabla de nombres, solo en tu ordenador.",
            ],
          }}
        />
        <p className={`mt-5 ${cls.texto}`}>
          Y cuando puedas, <b>datos agregados</b>: «6 de 24 suspenden el criterio 3.2» dice lo mismo sin señalar a nadie.
        </p>
      </Bloque>

      <Aviso titulo="Con tu alumnado, solo AppsEdu" tono="rosa">
        <p>
          La guía es tajante: <b>con alumnado solo se usan aplicaciones autorizadas en AppsEdu</b>, y no se le puede pedir
          que se cree cuentas en servicios no autorizados. A noviembre de 2026, ni Copilot, ni ChatGPT, ni Gemini aparecen
          en ese catálogo. Tú puedes usar la IA para preparar; si tu centro necesita una para el aula, se pide su evaluación
          por gvaSAI.
        </p>
        <p>
          Y una nota de contexto: el Reglamento europeo de IA pide a las organizaciones que usan IA que formen a su personal
          en lo básico. Este seminario es exactamente eso.
        </p>
        <Fuente id="appsedu">Catálogo</Fuente>
      </Aviso>

      {/* ═══ 4 · El prompt ════════════════════════════════════════════ */}
      <Bloque
        id="prompt"
        etiqueta="Cómo pedir"
        titulo="El prompt en seis bloques"
        entradilla={
          <>
            Un <b>prompt</b> es el texto que le escribes a la IA. Si no le cuentas quién eres, para quién es y qué formato
            quieres, contesta para el docente promedio: correcto, genérico y sin sitio en tu aula.
          </>
        }
      >
        <SinContexto />
      </Bloque>

      <Bloque
        titulo="Los seis bloques, uno a uno"
        nivel={3}
        entradilla="Cada bloque empieza con su nombre tras una almohadilla (#), así tú y la IA veis dónde empieza cada parte. Los cuatro primeros los escribe casi todo el mundo; los dos últimos marcan la diferencia."
      >
        <Anatomia
          etiqueta="Los seis bloques de un prompt"
          partes={[
            { texto: "# Rol", nombre: "quién responde", tono: "azul" },
            { texto: "# Contexto", nombre: "tu etapa y tu grupo", tono: "verde" },
            { texto: "# Tarea", nombre: "un solo encargo", tono: "morado" },
            { texto: "# Reglas", nombre: "lo que no puede hacer", tono: "rosa" },
            { texto: "# Formato", nombre: "cómo lo quieres", tono: "ambar" },
            { texto: "# Control", nombre: "cómo lo compruebas", tono: "gris" },
          ]}
        />
        <p className={`mt-5 ${cls.texto}`}>
          <b># Control</b> es el bloque que casi nadie escribe: le pides que te diga qué tienes que comprobar. Convierte cada
          respuesta en una revisión guiada.
        </p>
      </Bloque>

      <Bloque
        titulo="Antes y después, en FP"
        nivel={3}
        anchoJunto={760}
        junto={<P id="s1-ejemplo-fp" />}
        entradilla={
          <>
            <b>Antes:</b> «Hazme una práctica de montaje de ordenadores». Sale una práctica cualquiera, sin tiempo, sin
            material y sin seguridad.
          </>
        }
      >
        <Lista
          className={cls.texto}
          items={[
            <>
              <b>Después:</b> el mismo encargo con su grupo, sus 110 minutos y su taller real.
            </>,
            <>Las reglas evitan lo que no sirve: marcas, material que no hay, riesgos.</>,
            <>El control le obliga a decirte dónde fallará la primera vez.</>,
          ]}
        />
      </Bloque>

      <Bloque
        titulo="Antes y después, en ESO"
        nivel={3}
        anchoJunto={760}
        junto={<P id="s1-ejemplo-eso" />}
        entradilla={
          <>
            <b>Antes:</b> «Hazme ejercicios de porcentajes». Salen diez ejercicios iguales, con números imposibles de calcular
            a mano.
          </>
        }
      >
        <Lista
          className={cls.texto}
          items={[
            <>
              <b>Ahora:</b> un reto con contexto real, tiempo y grupo descritos.
            </>,
            <>Atiende a quien lee despacio (enunciado corto) y a quien acaba antes (ampliación).</>,
            <>La pregunta final pide justificar, no solo calcular.</>,
          ]}
        />
      </Bloque>

      <Bloque titulo="Los cuatro fallos de siempre" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tarjeta titulo="Pedir dos cosas a la vez" tono="rosa" nivel={4}>
            «Hazme la unidad y el examen» devuelve dos cosas mediocres. Son dos prompts.
          </Tarjeta>
          <Tarjeta titulo="Discutir con la respuesta" tono="rosa" nivel={4}>
            Si no es lo que querías, el fallo suele estar en el encargo. Arregla el prompt, no la respuesta.
          </Tarjeta>
          <Tarjeta titulo="Seguir en un chat torcido" tono="rosa" nivel={4}>
            La IA arrastra todo lo hablado. Si se ha liado, abre una conversación nueva y pega el prompt corregido.
          </Tarjeta>
          <Tarjeta titulo="Creérselo todo" tono="rosa" nivel={4}>
            Lo que suena seguro no es lo mismo que lo que es cierto. Pide el bloque de control y revisa.
          </Tarjeta>
        </div>
      </Bloque>

      <Bloque
        titulo="La plantilla para cualquier encargo"
        nivel={3}
        anchoJunto={760}
        junto={<P id="s1-plantilla" />}
        entradilla="Cópiala tal cual y cambia solo lo que va entre corchetes. Funciona igual para una actividad, un correo difícil o una rúbrica."
      >
        <Lista
          className={cls.texto}
          items={[
            <>Los huecos van en mayúsculas y entre corchetes: se ven a la primera.</>,
            <>Las reglas de la plantilla valen casi siempre; añade las tuyas.</>,
            <>Si te sale bien, guárdala: es el principio de tu biblioteca.</>,
          ]}
        />
      </Bloque>

      {/* ═══ 5 · Metaprompt ═══════════════════════════════════════════ */}
      <Bloque
        id="metaprompt"
        etiqueta="El atajo"
        titulo="El metaprompt: pide el encargo"
        entradilla={
          <>
            Escribir seis bloques cada vez cansa. El truco: cuéntale en bruto lo que necesitas, como a un compañero en el
            pasillo, y pídele que escriba <b>él</b> el prompt ideal, preguntándote antes lo que le falte.
          </>
        }
      >
        <CicloMetaprompt />
      </Bloque>

      <Bloque
        titulo="La frase que cierra tu explicación"
        nivel={3}
        anchoJunto={700}
        junto={<P id="s1-metaprompt" />}
        entradilla="Pégala al final de tu explicación en bruto. Te devolverá preguntas; contéstalas y tendrás un encargo mejor que el que habrías escrito solo."
      >
        <div className="space-y-3">
          <Tarjeta titulo="Úsalo cuando…" tono="verde" nivel={4}>
            El encargo es importante o lo vas a repetir: una unidad, una rúbrica, un examen.
          </Tarjeta>
          <Tarjeta titulo="No hace falta cuando…" nivel={4}>
            La pregunta es de una línea: «¿cómo se dice <i>destornillador</i> en inglés técnico?».
          </Tarjeta>
        </div>
      </Bloque>

      {/* ═══ 6 · La ficha ═════════════════════════════════════════════ */}
      <Bloque
        id="ficha"
        etiqueta="La pieza de hoy"
        titulo="La ficha de tu materia o módulo"
        entradilla={
          <>
            Todo lo que la IA necesita saber de tu trabajo, en una página: etapa, materia o módulo, lo que dice tu currículo y
            cómo es tu grupo, <b>sin un solo nombre</b>. La escribes una vez y la usas en todo el seminario.
          </>
        }
      >
        <UnaFichaCuatroUsos />
      </Bloque>

      <Paso
        n={2}
        titulo="Copia la plantilla de FP"
        anchoJunto={700}
        junto={<Codigo code={FICHA_FP} kind="md" etiqueta="Ficha de mi módulo (FP) · 1 de 2" rango={[1, 13]} />}
        entradilla="Si das clase en FP, esta es la tuya. Los resultados de aprendizaje y los criterios de evaluación, copiados literales del currículo oficial de tu ciclo."
      >
        <Lista
          className={cls.texto}
          items={[
            <>
              <b>RA</b>: resultado de aprendizaje; <b>CE</b>: criterio de evaluación.
            </>,
            <>Basta con los RA que vayas a trabajar este trimestre.</>,
            <>El peso de cada RA, si ya lo tienes en tu programación.</>,
          ]}
        />
      </Paso>

      <Bloque
        titulo="Ficha FP: tu grupo y cómo trabajas"
        nivel={3}
        anchoJunto={700}
        junto={<Codigo code={FICHA_FP} kind="md" etiqueta="Ficha de mi módulo (FP) · 2 de 2" rango={[15, 27]} />}
        entradilla="La segunda mitad es la que la IA no puede adivinar: cómo es tu grupo de verdad y qué esperas de ella."
      >
        <Lista
          className={cls.texto}
          items={[
            <>El grupo, en números y en necesidades: nunca con nombres.</>,
            <>Tus espacios y tu plataforma: así no te propone lo que no tienes.</>,
            <>Una regla fija: si duda, que escriba [COMPROBAR].</>,
          ]}
        />
      </Bloque>

      <Bloque
        titulo="La plantilla de ESO y Bachillerato"
        nivel={3}
        anchoJunto={700}
        junto={<Codigo code={FICHA_ESO} kind="md" etiqueta="Ficha de mi materia (ESO y Bach.) · 1 de 2" rango={[1, 12]} />}
        entradilla="Si das clase en ESO o Bachillerato, la misma idea con el vocabulario de tu currículo."
      >
        <Lista
          className={cls.texto}
          items={[
            <>Competencias específicas y criterios de evaluación, copiados literales.</>,
            <>Los saberes básicos que tocan en la unidad que preparas.</>,
            <>La situación de aprendizaje en marcha, si la tienes.</>,
          ]}
        />
      </Bloque>

      <Bloque
        titulo="Ficha ESO: tu grupo y cómo trabajas"
        nivel={3}
        anchoJunto={700}
        junto={<Codigo code={FICHA_ESO} kind="md" etiqueta="Ficha de mi materia (ESO y Bach.) · 2 de 2" rango={[14, 26]} />}
        entradilla="Igual que en FP: el grupo real, los recursos que tienes y lo que le pides a la IA."
      >
        <Lista
          className={cls.texto}
          items={[
            <>Describe lo que necesitan, no quiénes son.</>,
            <>Si hay altas capacidades, dilo: la IA preparará ampliaciones.</>,
            <>El idioma: puedes pedirle el material en valenciano.</>,
          ]}
        />
      </Bloque>

      <Paso n={3} titulo="Rellénala sin un solo nombre" entradilla="Cinco comprobaciones antes de darla por buena.">
        <Checklist
          items={[
            { texto: "Currículo copiado, no resumido", detalle: "Literal del texto oficial: así la IA usa tus palabras y no las suyas." },
            { texto: "El grupo, en números", detalle: "«22 alumnos, 4 leen despacio»: sin nombres ni iniciales." },
            { texto: "Necesidades, no diagnósticos", detalle: "«Le cuesta atender» y no el nombre de un trastorno: la salud es zona roja." },
            { texto: "Una página como mucho", detalle: "Si no cabe, sobra algo. Mejor corta y al grano." },
            { texto: "Qué quieres de la IA", detalle: "Idioma, tono y lo que no debe hacer nunca." },
          ]}
        />
      </Paso>

      <Paso n={4} titulo="Guárdala y úsala siempre" entradilla="Guárdala en tu OneDrive del centro, por ejemplo «Ficha · [tu materia].docx». Para usarla tienes dos caminos.">
        <DosColumnas
          centro="o"
          a={{
            titulo: "Pegarla al empezar",
            tono: "azul",
            puntos: [
              "Copia el texto y pégalo como primer mensaje.",
              "Debajo, tu encargo: «Con esta ficha, …».",
              "Lo más rápido y lo que mejor funciona.",
            ],
          }}
          b={{
            titulo: "Adjuntarla como fichero",
            tono: "verde",
            puntos: [
              "Súbelo con el botón + de la caja del chat.",
              "Pídele que la tenga en cuenta en toda la conversación.",
              "Útil cuando la ficha crece o tiene tablas.",
            ],
          }}
        />
      </Paso>

      {/* ═══ 7 · Primer encargo ═══════════════════════════════════════ */}
      <Bloque
        id="encargo"
        etiqueta="Manos a la obra"
        titulo="Tu primer encargo real"
        entradilla={
          <>
            Con la ficha pegada, pide algo que de verdad te ahorre trabajo: <b>la misma actividad en tres niveles</b>, para
            atender al grupo real sin preparar tres actividades distintas.
          </>
        }
      >
        <TresNiveles />
      </Bloque>

      <Paso
        n={5}
        titulo="Pide una actividad en tres niveles"
        anchoJunto={760}
        junto={<P id="s1-tres-niveles" />}
        entradilla="Pega antes tu ficha. Después, este encargo con tu RA o tu criterio de evaluación."
      >
        <Lista
          className={cls.texto}
          items={[
            <>Un enunciado, tres andamios: nadie hace «la ficha fácil».</>,
            <>Una rúbrica común: los tres niveles cuentan igual.</>,
            <>Te dice qué observar mientras trabajan.</>,
          ]}
        />
      </Paso>

      <Paso
        n={6}
        titulo="Revísala antes de llevarla a clase"
        anchoJunto={600}
        junto={<P id="s1-revisar" />}
        entradilla="Primero, que la propia IA te señale lo dudoso. Después, tu revisión."
      >
        <ul className={`space-y-2 ${cls.texto}`}>
          {[
            "¿Los datos y las cifras son correctos?",
            "¿Cita normativa o fuentes? Compruébalas.",
            "¿Encaja con el nivel real de tu grupo?",
            "¿Cabe en el tiempo y con tu material?",
            "¿La entendería quien lee despacio?",
          ].map((t) => (
            <li key={t} className="flex gap-3">
              <span aria-hidden className={`mt-1 h-5 w-5 shrink-0 rounded-md border-2 ${TONO.azul.linea}`} />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Paso>

      <ParaAmpliar
        id="ampliar"
        titulo="Vídeos para ampliar"
        entradilla="Del canal IA para docentes y de Aula en la Nube. Los cortos, para un café; los largos, para cuando tengas un rato."
        ids={["p-SfyxxqhwE", "2jh6-S7b_go", "Ph-Y_y7en94", "kZMsseeI9Zg", "PMggpH1csws", ["pM8Eam7_exg", 1968], "OV_Br6wlr9o", "O-mYNYBK2KE"]}
      />

      <Tarea
        n={1}
        tiempo="una hora y media"
        items={[
          { texto: "Escribe tu ficha y guárdala", detalle: "Con la plantilla de tu etapa, en tu OneDrive del centro." },
          { texto: "Comprueba el escudo verde", detalle: "Entra en copilot.cloud.microsoft con tu @edu.gva.es y búscalo arriba a la derecha." },
          { texto: "Prueba tres prompts con tu ficha", detalle: "La actividad en tres niveles, el metaprompt y la revisión de lo dudoso." },
          { texto: "Guarda los que funcionen", detalle: "Un documento «Mis prompts»: es el principio de tu biblioteca." },
          { texto: "Opcional: solicita GitHub Education", detalle: "Copilot Pro gratis para docentes; tarda días y te servirá en la sesión 5." },
        ]}
        resultado="Tu ficha lista para pegar, tres prompts que ya funcionan con tu materia y la certeza de que trabajas en el Copilot protegido del centro."
      />

      <LoQueTeLlevas n={1}>
        <p>
          Una IA generativa escribe lo probable, no lo comprobado: <b>tú revisas</b>. Con tu cuenta @edu.gva.es tienes Copilot
          Chat con protección de datos, sin pagar nada. Sin datos personales, cualquier IA; con ellos, solo la del centro y lo
          mínimo; salud y NEE, nunca.
        </p>
        <p>
          Un encargo en seis bloques —o un metaprompt— y tu ficha pegada delante convierten una respuesta genérica en una que
          sirve en tu aula. Esa ficha es la primera pieza: en la sesión 2 la convertirás en un cuaderno con tus fuentes.
        </p>
      </LoQueTeLlevas>

      <NavSesiones n={1} />
    </div>
  );
}
