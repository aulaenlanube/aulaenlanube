import type { Metadata } from "next";
import Link from "@/components/Link";
import {
  Arbol,
  Aviso,
  Bloque,
  C,
  Checklist,
  Codigo,
  DosColumnas,
  Lista,
  Paso,
  Regla,
  Prompt,
  TONO,
  Tarjeta,
  cls,
} from "@/app/programacion-ia/_video/piezas";
import { RAIZ } from "../_datos";
import { CabeceraSesion, EnEstaSesion, Fuente, LoQueTeLlevas, NavSesiones, ParaAmpliar, Tarea, VideoResumen } from "../_ui";
import { OPENCODE_JSON } from "../tu-herramienta/ficheros";
import { AGENTS_MM, ENCARGO_MM } from "../tu-herramienta/plataforma";
import { CADENA, REPO, VERSIONES_MM } from "../tu-herramienta/cadena";
import {
  BucleDocente,
  CarpetaMundo,
  CuandoSeLee,
  CuentaA01,
  DondeVive,
  HerramientaViaja,
  MapaPlataforma,
  PiezasEnUna,
  PlanBSinInstalar,
  PlanBuild,
  TresCaminos,
  TresComprobaciones,
  TresReglas,
  UnFallo,
} from "./figuras";
import { PROMPTS_S5 } from "./prompts";

export const metadata: Metadata = {
  title: "Sesión 5 · Tu plataforma del módulo con un agente de IA — Seminario de IA para docentes – Aula en la nube",
  description:
    "Laboratorio para docentes de FP y Secundaria: un agente de IA gratuito (OpenCode) construye, sin que escribas código, la plataforma de tu módulo: currículo del BOE, unidades, calendario con festivos, rúbricas, cuaderno de evaluación, preguntas GIFT para Aules y prompts para Copilot. Con la conversación real, sus fallos y el repositorio público.",
  alternates: { canonical: `${RAIZ}sesion-05/` },
};

const P = Object.fromEntries(PROMPTS_S5.map((p) => [p.id, p]));
const RUTA = `${RAIZ}herramientas/mi-modulo/`;
const M = Object.fromEntries(CADENA.map((m) => [m.clave, m]));

const INDICE: [string, string][] = [
  ["destino", "Lo que vas a construir"],
  ["agente", "De un chat a un agente"],
  ["instalar", "Instalar la app"],
  ["carpeta", "Tu carpeta"],
  ["modelo", "Elegir el modelo"],
  ["memoria", "AGENTS.md: la memoria"],
  ["reglas", "Las tres reglas"],
  ["encargo", "El encargo, por fases"],
  ["plan", "Plan y construcción"],
  ["probar", "Probar y corregir"],
  ["crecer", "Crecer pieza a pieza"],
  ["versiones", "Versiones y repositorio"],
  ["compartir", "Compartirla"],
  ["plan-b", "Plan B sin instalar"],
];

const PANTALLAS: [string, string, keyof typeof TONO][] = [
  ["Inicio", "El estado del módulo y los avisos de todo.", "gris"],
  ["Currículo", "Pegas el BOE: RA y CE literales, con sus pesos.", "rosa"],
  ["Unidades", "Horas y CE de cada una, y la cobertura.", "azul"],
  ["Calendario", "Festivos reales y las fechas de cada unidad.", "azul"],
  ["Rúbricas", "Un CE, cuatro niveles, para imprimir.", "verde"],
  ["Cuaderno", "Notas, corrección con rúbrica y nota final.", "verde"],
  ["Preguntas", "Banco por CE y fichero GIFT para Aules.", "ambar"],
  ["Prompts", "Encargos para Copilot con tus datos dentro.", "morado"],
];

export default function Sesion5() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <CabeceraSesion n={5} />
      <VideoResumen n={5} />
      <EnEstaSesion items={INDICE} tono="rosa" />

      {/* ═══ 0 · El destino ═══════════════════════════════════════════════ */}
      <Bloque
        id="destino"
        etiqueta="Lo que vas a construir"
        titulo="Tu plataforma del módulo"
        entradilla={
          <>
            Empieza por el final: esta es la plataforma que un agente de IA construye hoy, <b>sin que escribas código</b>.
            Un solo fichero que funciona sin internet, guarda los datos en tu navegador y junta todo lo que preparas cada
            curso. La de ejemplo es de <b>Montaje y mantenimiento de equipos</b> (1.º de SMR); la tuya, de tu módulo.
          </>
        }
      >
        <MapaPlataforma />
        <div className="sem-solo-web mt-6 flex flex-wrap gap-3">
          <a
            href={`${RUTA}index.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-rose-600 px-5 py-3 text-lg font-bold text-white transition hover:bg-rose-700 dark:bg-rose-500 dark:text-slate-950 dark:hover:bg-rose-400"
          >
            Abrir la plataforma →
          </a>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-lg font-bold text-zinc-800 transition hover:border-rose-300 dark:border-white/15 dark:bg-slate-900 dark:text-zinc-100"
          >
            Ver el repositorio
          </a>
        </div>
      </Bloque>

      <Bloque titulo="Ocho pantallas, un solo fichero" nivel={3}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PANTALLAS.map(([t, d, tono]) => (
            <Tarjeta key={t} titulo={t} tono={tono} suave>
              {d}
            </Tarjeta>
          ))}
        </div>
      </Bloque>

      <Bloque
        titulo="Las cinco piezas, en una"
        nivel={3}
        entradilla="En la sesión 4 elegías una herramienta del catálogo. Hoy no eliges: el cuaderno, el planificador, las rúbricas, el banco de preguntas y los prompts van juntos. Y cada pieza del seminario encuentra su sitio."
      >
        <PiezasEnUna />
      </Bloque>

      {/* ═══ 1 · De un chat a un agente ═══════════════════════════════════ */}
      <Bloque
        id="agente"
        etiqueta="Antes de empezar"
        titulo="De un chat a un agente que trabaja"
        entradilla={
          <>
            Hasta ahora, Copilot te contestaba con texto y tú copiabas, pegabas y probabas. Un <b>agente</b> es el mismo
            tipo de IA, pero con <b>herramientas</b>: abre los ficheros de una carpeta, los escribe, mira lo que ha hecho y
            decide el siguiente paso, en bucle, hasta acabar. Tú no programas: <b>encargas, revisas y decides</b>.
          </>
        }
      >
        <DosColumnas
          a={{
            titulo: "Copilot Chat",
            antetitulo: "Sesiones 1 a 4",
            tono: "gris",
            puntos: [
              "Te contesta con texto: una respuesta por mensaje.",
              "No ve tus ficheros: solo lo que le pegas.",
              "El trabajo de copiar, guardar y probar es tuyo.",
            ],
          }}
          b={{
            titulo: "OpenCode",
            antetitulo: "Hoy",
            tono: "rosa",
            puntos: [
              "Trabaja dentro de una carpeta de tu ordenador.",
              "Crea y cambia los ficheros él mismo, con tu permiso.",
              "Da vueltas hasta acabar y te avisa para que pruebes.",
            ],
          }}
        />
      </Bloque>

      <Bloque titulo="El bucle del agente" nivel={3}>
        <BucleDocente />
      </Bloque>

      <Bloque titulo="Por qué OpenCode" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Tarjeta titulo="Gratis" tono="verde" suave>
            Se descarga sin pagar y trae modelos gratuitos para empezar sin cuenta.
          </Tarjeta>
          <Tarjeta titulo="Código abierto" tono="azul" suave>
            Licencia MIT: cualquiera puede leer cómo funciona por dentro.
          </Tarjeta>
          <Tarjeta titulo="Tus ficheros, en casa" tono="ambar" suave>
            Lo que construye vive en tu carpeta, no en la web de nadie.
          </Tarjeta>
          <Tarjeta titulo="El mismo concepto" tono="morado" suave>
            El modo agente de Copilot y otros agentes funcionan igual: lo que aprendes aquí te sirve allí.
          </Tarjeta>
        </div>
      </Bloque>

      <Aviso titulo="Lo que sigue siendo tuyo" tono="rosa">
        <p>
          El agente escribe el código, pero <b>la plataforma es tuya</b>: tú decides qué hace, tú lees cada permiso antes de
          aceptarlo y tú la pruebas antes de fiarte de un solo número. Si calcula mal una nota y no lo compruebas, el error
          no es de la IA: es de quien la usó sin mirar.
        </p>
      </Aviso>

      {/* ═══ 2 · Instalar ═════════════════════════════════════════════════ */}
      <Paso
        id="instalar"
        n={1}
        titulo="Instala la app de escritorio"
        entradilla={
          <>
            OpenCode tiene una versión de terminal y una <b>app de escritorio</b>. Para este seminario, la app: ventanas y
            botones, sin escribir órdenes. Se descarga de <C>opencode.ai/download</C>, en el apartado OpenCode Desktop.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="Windows" tono="azul">
            Botón de <b>Windows (x64)</b>; si tu portátil es ARM, el de ARM64. Es un instalador: doble clic y siguiente.
          </Tarjeta>
          <Tarjeta titulo="macOS" tono="gris">
            El <C>.dmg</C> de Apple Silicon o de Intel, según tu Mac. Lo arrastras a Aplicaciones.
          </Tarjeta>
          <Tarjeta titulo="Linux" tono="gris">
            Paquete <C>.deb</C> (Ubuntu, LliureX) o <C>.rpm</C> (Fedora), con el instalador de tu sistema.
          </Tarjeta>
        </div>
        <p className={`mt-5 ${cls.texto}`}>
          ¿Tu portátil no te deja instalar programas? Es normal en equipos gestionados. No pasa nada: salta al{" "}
          <a href="#plan-b" className={cls.enlace}>
            plan B
          </a>{" "}
          y harás tu plataforma con Copilot Chat, sin instalar nada.
        </p>
        <Fuente id="opencode">Descarga oficial</Fuente>
        <p className={`mt-2 ${cls.tenue}`}>
          Las capturas y los nombres de botones de esta sesión son de OpenCode 2.2.5 en castellano (la interfaz de la app
          de escritorio). Si tu versión los muestra en inglés o en otro sitio, busca la misma palabra.
        </p>
      </Paso>

      <Bloque titulo="Dónde vive cada cosa" nivel={3}>
        <DondeVive />
      </Bloque>

      {/* ═══ 3 · La carpeta ═══════════════════════════════════════════════ */}
      <Paso
        id="carpeta"
        n={2}
        titulo="Crea tu carpeta y ábrela"
        entradilla={
          <>
            El agente trabaja <b>dentro de una carpeta</b>. Créala solo para tu plataforma, por ejemplo en Documentos. En
            OpenCode: <b>Añadir proyecto</b>, buscas tu carpeta en la ventana <b>Abrir proyecto</b> y pulsas{" "}
            <b>Seleccionar carpeta</b>.
          </>
        }
        junto={
          <Arbol
            titulo="Tu carpeta, al acabar la sesión"
            raiz="mi-modulo"
            nodos={[
              { nombre: "AGENTS.md", nivel: 0, nota: "la memoria (paso 4)" },
              { nombre: "opencode.json", nivel: 0, nota: "las reglas (paso 5)" },
              { nombre: "encargo.md", nivel: 0, nota: "tu encargo (paso 6)" },
              { nombre: "curriculo-montaje.txt", nivel: 0, nota: "el BOE, para probar" },
              { nombre: "calendario-2026-27.txt", nivel: 0, nota: "el DOGV, para probar" },
              { nombre: "index.html", nivel: 0, nota: "tu plataforma: la escribe el agente", tono: "rosa" },
            ]}
            tono="verde"
          />
        }
      >
        <Lista
          className={cls.texto}
          items={[
            <>Un nombre corto, sin espacios ni tildes: <C>mi-modulo</C>, <C>tecnologia-3eso</C>…</>,
            <>Tus tres ficheros: AGENTS.md, opencode.json y el encargo de la sesión 4.</>,
            <>Y dos que valen oro: el currículo copiado del BOE y el calendario escolar oficial, para que el agente pruebe con datos reales.</>,
            <>Nada personal dentro: ni listas de clase ni notas reales. Lo que haya en la carpeta, el agente lo puede leer.</>,
          ]}
        />
      </Paso>

      <Bloque titulo="La carpeta es su mundo" nivel={3}>
        <CarpetaMundo />
      </Bloque>

      {/* ═══ 4 · El modelo ════════════════════════════════════════════════ */}
      <Paso
        id="modelo"
        n={3}
        titulo="Elige el modelo"
        entradilla={
          <>
            El modelo es la IA que piensa; OpenCode solo es el que trabaja. Se elige en el selector que hay{" "}
            <b>debajo de la caja de texto</b>, donde se ve su nombre. En la lista, los gratuitos llevan la etiqueta{" "}
            <b>Gratis</b>.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="Elige GLM o DeepSeek" tono="verde" antetitulo="Gratis, sin cuenta">
            <b>GLM-5.3-Flash</b> y <b>DeepSeek V4.1 Flash</b> son los únicos gratuitos que declaran no guardar lo que les
            escribes ni usarlo para entrenar. La plataforma de ejemplo empezó con GLM.
          </Tarjeta>
          <Tarjeta titulo="Ojo con el que viene marcado" tono="ambar" antetitulo="Letra pequeña">
            El que sale marcado de serie, <b>Big Pickle</b>, puede usar lo que escribes para mejorar su modelo, como
            Iceman, Flint y MiMo. Beam y Crouton lo guardan 30 días, y los Nemotron registran el uso.
          </Tarjeta>
          <Tarjeta titulo="GitHub Copilot" tono="azul" antetitulo="Si eres docente verificado">
            Con GitHub Education tienes Copilot Pro gratis (1.500 créditos al mes). En OpenCode: <b>Conectar proveedor</b>{" "}
            (o <C>/connect</C>), GitHub Copilot y «Login with GitHub Copilot».
          </Tarjeta>
        </div>
        <Fuente id="opencodeZen">Privacidad de cada modelo gratuito</Fuente>
      </Paso>

      <Bloque titulo="Tres caminos para el modelo" nivel={3}>
        <TresCaminos />
      </Bloque>

      <Bloque
        titulo="Si se acaba el uso gratuito"
        nivel={3}
        entradilla="Nos pasó a mitad de la plataforma: «Límite gratuito alcanzado». El uso gratis es diario y común a todos los modelos gratuitos (DeepSeek tampoco respondía). Tres salidas:"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="Espera a que se renueve" tono="gris" antetitulo="Gratis">
            Se renueva cada día: el aviso dice a qué hora. AGENTS.md y el propio fichero le cuentan al agente dónde
            estabas.
          </Tarjeta>
          <Tarjeta titulo="GitHub Copilot" tono="azul" antetitulo="Docentes verificados">
            <b>Conectar proveedor</b>, GitHub Copilot, y sigues con tus créditos mensuales de GitHub Education.
          </Tarjeta>
          <Tarjeta titulo="El servidor de tu centro" tono="verde" antetitulo="Si tu centro tiene uno">
            OpenCode se conecta a cualquier servidor compatible. Nosotros seguimos con el <b>Qwen 3.8</b> del servidor
            del instituto: gratis y sin que los datos salgan del centro.{" "}
            <Link href="/pp1-simarro/infraestructura-ia/" className={cls.enlace}>
              Cómo es ese servidor
            </Link>
            .
          </Tarjeta>
        </div>
      </Bloque>

      {/* ═══ 5 · AGENTS.md ════════════════════════════════════════════════ */}
      <Paso
        id="memoria"
        n={4}
        titulo="Escribe AGENTS.md: su memoria"
        entradilla={
          <>
            El modelo no recuerda nada de un día para otro. <C>AGENTS.md</C> es un fichero de texto en tu carpeta que
            OpenCode lee al empezar cada conversación: <b>tu ficha y tus reglas</b>. Es la ficha de la sesión 1, convertida
            en instrucciones.
          </>
        }
      >
        <Lista
          className={cls.texto}
          items={[
            <>Corto y concreto: se lee siempre, así que cada línea cuenta.</>,
            <>Las reglas que no se rompen: un solo fichero, sin internet, datos solo en el navegador, alumnado por código.</>,
            <>Una regla para una plataforma que crece: <b>los datos de una versión anterior se siguen leyendo</b>.</>,
          ]}
        />
        <p className={`mt-4 ${cls.texto}`}>
          <a href={`${RUTA}AGENTS.md`} download className={cls.enlace}>
            Descarga este AGENTS.md
          </a>{" "}
          y adáptalo, o pídeselo a Copilot con tu ficha (el prompt de abajo).
        </p>
      </Paso>

      <Bloque titulo="Qué es y quién la usa: AGENTS.md" nivel={3}>
        <Codigo code={AGENTS_MM} kind="md" etiqueta="mi-modulo/AGENTS.md · parte 1 de 2" rango={[1, 10]} />
      </Bloque>

      <Bloque titulo="Reglas y forma de trabajar: AGENTS.md" nivel={3}>
        <Codigo code={AGENTS_MM} kind="md" etiqueta="mi-modulo/AGENTS.md · parte 2 de 2" rango={[12, 24]} />
      </Bloque>

      <Bloque titulo="Tu AGENTS.md, a partir de tu ficha" nivel={3}>
        <Prompt text={P["s5-agents-md"].texto} etiqueta={`Prompt · ${P["s5-agents-md"].donde}`} />
      </Bloque>

      <Bloque titulo="Se lee al empezar cada sesión" nivel={3}>
        <CuandoSeLee />
      </Bloque>

      <Aviso titulo="La extensión que Windows esconde" tono="ambar">
        <p>
          Si creas el fichero con el Bloc de notas, guárdalo con <b>Tipo: Todos los archivos</b> y codificación{" "}
          <b>UTF-8</b>. Si no, se llamará <C>AGENTS.md.txt</C> y OpenCode no lo encontrará. Descargarlo desde esta página
          te ahorra el problema.
        </p>
      </Aviso>

      {/* ═══ 6 · Reglas ═══════════════════════════════════════════════════ */}
      <Paso
        id="reglas"
        n={5}
        titulo="Pon las tres reglas: opencode.json"
        entradilla={
          <>
            De fábrica, OpenCode lo permite casi todo sin preguntar. Este fichero, en tu carpeta, le pone tres reglas.
            No hace falta entender cada línea: <b>descárgalo y déjalo tal cual</b>.
          </>
        }
      >
        <ul className="space-y-4">
          <Regla tipo="ask" regla="edit · ask">
            Para cambiar un fichero, te pregunta. Las órdenes de terminal y las webs, también.
          </Regla>
          <Regla tipo="deny" regla="external_directory · deny">
            No sale de tu carpeta: ni lee ni escribe fuera de ella.
          </Regla>
          <Regla tipo="deny" regla="policies · rm, del, sudo">
            Nunca borra ficheros, se lo pida quien se lo pida.
          </Regla>
        </ul>
        <p className={`mt-4 ${cls.texto}`}>
          <a href={`${RUTA}opencode.json`} download className={cls.enlace}>
            Descarga este opencode.json
          </a>
          . El bloque final, <C>agents</C>, impide que el agente Plan escriba: solo piensa.
        </p>
      </Paso>

      <Bloque titulo="El opencode.json, entero" nivel={3}>
        <Codigo code={OPENCODE_JSON} kind="json" etiqueta="mi-modulo/opencode.json" ajustar={false} />
      </Bloque>

      <Bloque titulo="Qué pasa cuando quiere actuar" nivel={3}>
        <TresReglas />
      </Bloque>

      <Bloque
        titulo="Dos ajustes antes de empezar"
        nivel={3}
        entradilla="En Ajustes › Preferencias, una vez y para siempre."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tarjeta titulo="Mostrar agente: encendido" tono="verde">
            Aparece el selector <b>Elegir agente</b> junto al del modelo: así puedes pasar de <b>Plan</b>, que piensa, a{" "}
            <b>Build</b>, que construye.
          </Tarjeta>
          <Tarjeta titulo="Aceptar permisos automáticamente: apagado" tono="rosa">
            Si lo enciendes, el agente cambia tus ficheros sin preguntarte. Déjalo apagado: cada permiso es tu ocasión de
            ver qué toca.
          </Tarjeta>
        </div>
      </Bloque>

      <Aviso titulo="Permitir una vez, no permitir siempre" tono="rosa">
        <p>
          Cuando quiera cambiar <C>index.html</C>, verás <b>Permiso requerido</b> con tres botones: <b>Denegar</b>,{" "}
          <b>Permitir siempre</b> y <b>Permitir una vez</b>. Usa <b>Permitir una vez</b> y mira qué fichero toca.
        </p>
        <p className="text-base">
          A veces pide <b>ejecutar una orden</b> (empieza por <C>node</C>, <C>sed</C>…) para comprobar su trabajo. Si no la
          entiendes, pulsa <b>Denegar</b>: el agente se para. Pregúntale qué quería comprobar: en la plataforma de ejemplo
          lo explicó en lenguaje llano (solo leía el fichero para buscar errores) y entonces se le dio permiso.
        </p>
      </Aviso>

      <Bloque titulo="Si deniegas una orden, pregunta" nivel={3}>
        <Prompt text={P["s5-orden"].texto} etiqueta={`Prompt · ${P["s5-orden"].donde}`} />
      </Bloque>

      {/* ═══ 7 · El encargo ═══════════════════════════════════════════════ */}
      <Paso
        id="encargo"
        n={6}
        titulo="Escribe el encargo, por fases"
        entradilla={
          <>
            El encargo de la sesión 4, con la misma plantilla, y una sección más al final: <b>Por fases</b>. Describes la
            plataforma entera, para que el agente prepare los datos pensando en todo, pero le pides que construya primero la
            base y espere a que la pruebes. Después, <b>una pantalla por mensaje</b>.
          </>
        }
      >
        <Codigo code={ENCARGO_MM} kind="md" etiqueta="mi-modulo/encargo.md · parte 1 de 2" rango={[1, 22]} />
      </Paso>

      <Bloque titulo="Pantallas, reglas y lo que no hace" nivel={3}>
        <Codigo code={ENCARGO_MM} kind="md" etiqueta="mi-modulo/encargo.md · parte 2 de 2" rango={[24, 54]} />
      </Bloque>

      <Bloque
        titulo="Cómo sabré que funciona"
        nivel={3}
        entradilla="La parte del encargo que más vale: pruebas con números que tú puedes comprobar. Las cuatro salen de fallos reales de las sesiones anteriores."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tarjeta titulo="Los 8 RA, sin perder ni uno" tono="rosa" suave>
            Pegas el currículo del BOE y salen los 8 RA con sus 60 CE. Una IA que resume se come criterios (sesión 2).
          </Tarjeta>
          <Tarjeta titulo="Un festivo en martes" tono="azul" suave>
            Descuenta ese día y no la semana entera: el fallo de la temporalización de Copilot (sesión 4).
          </Tarjeta>
          <Tarjeta titulo="La nota, con calculadora" tono="verde" suave>
            Dos alumnos inventados: la nota de cada CE, de cada RA y la final, igual que a mano.
          </Tarjeta>
          <Tarjeta titulo="El GIFT bien escrito" tono="ambar" suave>
            El verdadero o falso, con <C>{"{T}"}</C> o <C>{"{F}"}</C>: Copilot lo escribió mal en la sesión 2.
          </Tarjeta>
        </div>
        <p className={`mt-4 ${cls.texto}`}>
          <a href={`${RUTA}encargo.md`} download className={cls.enlace}>
            Descarga este encargo
          </a>{" "}
          o empieza por la plantilla:
        </p>
        <Prompt text={P["s5-encargo"].texto} etiqueta={`Plantilla · ${P["s5-encargo"].donde}`} />
      </Bloque>

      {/* ═══ 8 · Plan y construcción ══════════════════════════════════════ */}
      <Paso
        id="plan"
        n={7}
        titulo="Pide primero el plan"
        entradilla={
          <>
            OpenCode trae dos agentes: <b>Plan</b>, que piensa y no toca ficheros, y <b>Build</b>, que construye. Elige Plan
            en el selector <b>Elegir agente</b> y escríbele este primer mensaje, el real.
          </>
        }
      >
        <Prompt text={M.plan.texto} etiqueta="Mensaje 1 · OpenCode (Plan)" />
      </Paso>

      <Bloque titulo="Plan, revisas, Build, pruebas" nivel={3}>
        <PlanBuild />
      </Bloque>

      <Bloque
        titulo="Lo que hizo el plan, en 22 segundos"
        nivel={3}
        entradilla="Leyó los tres ficheros y propuso la fase 1. Lo más útil, como siempre: sus dudas."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tarjeta titulo="Lo que propuso" tono="morado">
            <Lista
              items={[
                "Tres pantallas: Inicio, Currículo y Unidades.",
                "Un solo objeto de datos con sitio ya reservado para las fases siguientes.",
                "Leer el BOE línea a línea: «1.» es un RA, «a)» es un CE, y fuera títulos y «Duración».",
              ]}
            />
          </Tarjeta>
          <Tarjeta titulo="Lo que preguntó" tono="ambar">
            <Lista
              items={[
                "¿Pesos a cero o repartidos a partes iguales?",
                "Si las horas no suman 224, ¿avisar o bloquear?",
                "¿Qué avisos quieres en Inicio?",
                "Al importar una copia, ¿enseñar antes qué trae?",
              ]}
            />
          </Tarjeta>
        </div>
        <p className={`mt-4 ${cls.texto}`}>
          Un detalle: en el plan contó «59…» criterios. El currículo tiene 60. Una cifra que da la IA, la compruebas tú: al
          construir, contó bien.
        </p>
      </Bloque>

      <Paso
        id="construir"
        n={8}
        titulo="Da luz verde a Build"
        entradilla={
          <>
            Cambia a <b>Build</b> y contesta sus dudas en el mismo mensaje en que le das permiso para empezar. Con cada
            cambio te pedirá permiso: <b>Permitir una vez</b>.
          </>
        }
      >
        <Prompt text={M.adelante.texto} etiqueta="Mensaje 2 · OpenCode (Build)" />
        <p className={`mt-4 ${cls.texto}`}>
          Seis minutos y doce cambios después, la primera versión: un <C>index.html</C> de 35 KB con las tres pantallas y la
          copia en JSON. Y su comprobación con el currículo real: <b>8 RA y 60 CE</b>, uno a uno, y los pesos repartidos
          para que cada RA sume exactamente 100.
        </p>
      </Paso>

      {/* ═══ 9 · Probar y corregir ════════════════════════════════════════ */}
      <Paso
        id="probar"
        n={9}
        titulo="Pruébala como el alumno más trasto"
        entradilla={
          <>
            Que funcione con los datos bonitos no significa nada. Ábrela con doble clic y <b>intenta romperla</b>: es lo que
            hará el primer día cualquier usuario con prisa.
          </>
        }
      >
        <Checklist
          items={[
            { texto: "Escribe «abc» donde va un número", detalle: "¿Borra lo que había?" },
            { texto: "Pon un 150 o un −5", detalle: "¿Lo acepta, lo cambia o avisa?" },
            { texto: "Deja casillas vacías", detalle: "¿Cuentan como cero o como «no evaluado»?" },
            { texto: "Pesos que no suman 100", detalle: "¿Avisa? ¿Calcula igual?" },
            { texto: "Recarga la página", detalle: "¿Siguen ahí tus datos?" },
            { texto: "Importa un fichero que no toca", detalle: "¿Lo rechaza sin cambiar nada?" },
            { texto: "Comprueba una nota a mano", detalle: "Con calculadora, de un alumno inventado." },
            { texto: "Abre la consola (F12)", detalle: "¿Sale algo en rojo al usarla?" },
          ]}
        />
      </Paso>

      <Aviso titulo="Lo que encontramos en la primera versión" tono="ambar">
        <p>
          El currículo, perfecto. Pero al escribir <b>«abc»</b> en un peso se guardaba un <b>0</b> sin avisar; un{" "}
          <b>150</b> se guardaba como 100; y dejaba crear una unidad de <b>−20 horas</b>. Nada de eso se ve si solo pruebas
          lo que funciona.
        </p>
      </Aviso>

      <Paso
        id="corregir"
        n={10}
        titulo="Corrige de uno en uno"
        entradilla={
          <>
            Un fallo, una petición. Dile <b>qué haces, qué pasa y qué esperabas</b>, y pídele que arregle solo eso. Después,
            vuelve a probar antes de pedir lo siguiente.
          </>
        }
      >
        <Prompt text={P["s5-un-fallo"].texto} etiqueta={`Prompt · ${P["s5-un-fallo"].donde}`} />
      </Paso>

      <Bloque titulo="Un fallo, una petición" nivel={3}>
        <UnFallo />
      </Bloque>

      <Bloque titulo="La petición real de los números" nivel={3}>
        <Prompt text={M.numeros.texto} etiqueta="Mensaje 3 · OpenCode (Build)" />
        <p className={`mt-4 ${cls.texto}`}>
          Resultado: la casilla se pone en rojo, dice «"abc" no es un número» y conserva el valor anterior. Igual con las
          horas y con las unidades.
        </p>
      </Bloque>

      <Bloque
        titulo="Tres comprobaciones que no se saltan"
        entradilla="El alumno trasto encuentra los fallos que se ven. Para los que no se ven, dos más: la consola del navegador y la calculadora."
      >
        <TresComprobaciones />
      </Bloque>

      <Bloque
        titulo="La consola: los fallos que no se ven"
        nivel={3}
        entradilla={
          <>
            Pulsa <b>F12</b> (en Mac, <b>Cmd + Opción + I</b>) y abre la pestaña <b>Consola</b>. Usa la plataforma: si
            aparece algo en <b>rojo</b>, es un error. No hace falta entenderlo: lo copias entero y se lo pegas.
          </>
        }
      >
        <Prompt text={M.consola.texto} etiqueta="Mensaje 4 · OpenCode (Build)" />
      </Bloque>

      <Bloque
        titulo="La calculadora: una nota a mano"
        nivel={3}
        entradilla="El agente dijo que había comprobado las cuentas. Con la calculadora, A01 daba 7,75 y la plataforma decía 7,9: el peso de un RA no se guardaba. Se arregló con los números delante."
      >
        <CuentaA01 />
      </Bloque>

      <Bloque titulo="La petición real de la calculadora" nivel={3}>
        <Prompt text={M.calculadora.texto} etiqueta="Mensaje 6 · OpenCode (Build)" />
      </Bloque>

      <Aviso titulo="Si a la segunda no lo arregla" tono="ambar">
        <p>
          Pasó con las rúbricas: el agente dijo «arreglado» y el fallo seguía. No repitas la misma frase: dale{" "}
          <b>el error entero de la consola, con sus líneas</b>, y pídele que no lo dé por arreglado hasta entender por qué
          falla ahí. A la tercera lo entendió y lo arregló.
        </p>
      </Aviso>

      {/* ═══ 10 · Crecer ══════════════════════════════════════════════════ */}
      <Paso
        id="crecer"
        n={11}
        titulo="Hazla crecer, pantalla a pantalla"
        entradilla={
          <>
            Con la base probada, una pantalla nueva por mensaje, siempre con la misma forma: <b>para qué me sirve</b>, qué
            tiene, <b>no cambies nada de lo que ya funciona</b> y una prueba con números al acabar.
          </>
        }
      >
        <Prompt text={P["s5-mejora"].texto} etiqueta={`Plantilla · ${P["s5-mejora"].donde}`} />
      </Paso>

      <Bloque titulo="La cadena, versión a versión" nivel={3}>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {VERSIONES_MM.map((v) => (
            <div key={v.v} className={`${cls.suave} !p-4`}>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                <span className={`mr-2 font-mono ${TONO[v.tono].texto}`}>{v.v}</span>
                {v.que}
              </p>
              <p className={cls.tenue}>{v.detalle}</p>
            </div>
          ))}
        </div>
      </Bloque>

      <Bloque
        titulo="El Calendario y el cambio de hora"
        nivel={3}
        entradilla="Le pedimos la prueba del encargo con el calendario oficial 2026-27: 7 horas a la semana y el festivo del martes 8 de diciembre."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="Su prueba destapó un fallo" tono="ambar" suave>
            Por el cambio de hora de octubre, el festivo del 8/12 contaba como día de clase. Lo encontró, lo arregló y lo
            explicó.
          </Tarjeta>
          <Tarjeta titulo="249 horas reales" tono="azul" suave>
            Del 9/9/2026 al 18/6/2027, con lunes 2, martes 3 y jueves 2 horas: 249 horas para un módulo de 224.
          </Tarjeta>
          <Tarjeta titulo="Dos avisos con sentido" tono="rosa" suave>
            La UT4 y la UT7 empiezan en una evaluación y acaban en otra. Copilot lo hizo sin avisar en la sesión 4.
          </Tarjeta>
        </div>
        <p className={`mt-4 ${cls.texto}`}>
          Comprobado por nuestra cuenta, día a día: las ocho unidades empiezan y acaban en las mismas fechas.
        </p>
      </Bloque>

      <Bloque
        titulo="Preguntas y el analizador de GIFT"
        nivel={3}
        entradilla="La pantalla que más costó: se cortó por el límite gratuito y, ya terminada, el agente aseguró que el GIFT salía «como lo corta Moodle». Lo comprobamos con un analizador de GIFT: no."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="El banco no enseñaba nada" tono="ambar" suave>
            La pregunta se guardaba, pero la consola daba un error y no salía ninguna tarjeta. El Qwen del instituto
            encontró la causa leyendo el fichero.
          </Tarjeta>
          <Tarjeta titulo="No pasaba el analizador" tono="rosa" suave>
            Faltaba una línea en blanco tras cada <C>$CATEGORY</C> y entre preguntas: Aules habría juntado la categoría
            con la primera pregunta. Un mensaje, y arreglado.
          </Tarjeta>
          <Tarjeta titulo="Importa lo de Copilot" tono="verde" suave>
            Pegas el GIFT que te da Copilot: lo que entiende va al banco y avisa del resto, como el{" "}
            <C>{"{=TRUE ~FALSE}"}</C> que en realidad es de opción múltiple.
          </Tarjeta>
        </div>
        <p className={`mt-4 ${cls.texto}`}>
          Tu analizador más fiable es Aules: importa el fichero en un curso de pruebas antes de usarlo con tu grupo.
        </p>
      </Bloque>

      <Bloque
        titulo="Prompts, ejemplo, avisos e impresión"
        nivel={3}
        entradilla="Las últimas piezas, una por mensaje y cada una probada."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tarjeta titulo="Prompts con tus datos dentro" tono="morado" suave>
            Cinco plantillas para tu asistente de Copilot, en seis bloques, con el RA y el CE literales y las horas de la
            unidad. Nunca piden datos del alumnado.
          </Tarjeta>
          <Tarjeta titulo="Cargar ejemplo" tono="verde" suave>
            Un clic y la plataforma se llena con Montaje y mantenimiento de equipos: currículo, calendario 2026-27, ocho
            unidades, rúbrica, notas de muestra y preguntas.
          </Tarjeta>
          <Tarjeta titulo="Los avisos de todo, en Inicio" tono="ambar" suave>
            Con el ejemplo cargado, Inicio decía «Todo en orden» aunque dos unidades cruzaban de evaluación. Ahora recoge
            los avisos de todas las pantallas, cada uno con su botón.
          </Tarjeta>
          <Tarjeta titulo="Imprimir la programación" tono="azul" suave>
            El anexo de tu programación didáctica: cada unidad con sus horas, fechas, evaluación, CE literales y
            actividades, y la tabla de RA por unidad.
          </Tarjeta>
        </div>
      </Bloque>

      <Bloque
        titulo="También para ESO y Bachillerato"
        nivel={3}
        entradilla="Una tarjeta «Etapa» en Currículo: FP (RA y CE) o ESO y Bachillerato (competencias específicas y criterios). Los rótulos de todas las pantallas cambian con ella."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tarjeta titulo="Probado con Tecnología y Digitalización" tono="verde" suave>
            Los criterios copiados del BOE (RD 217/2022): 7 competencias específicas y 15 criterios, con sus pesos
            repartidos.
          </Tarjeta>
          <Tarjeta titulo="En FP, ni una letra distinta" tono="gris" suave>
            Repetimos todas las pruebas anteriores: las mismas notas, las mismas fechas, la misma rúbrica y el mismo GIFT.
          </Tarjeta>
        </div>
      </Bloque>

      <Bloque
        titulo="Sesión nueva, con el modelo del instituto"
        nivel={3}
        entradilla="Tras el límite gratuito, seguimos en una sesión nueva con el Qwen del servidor del instituto. Empieza limpia y no pierde nada: AGENTS.md y el propio index.html le cuentan dónde estabas. En noventa segundos encontró por qué fallaba Preguntas."
      >
        <Prompt text={P["s5-sesion-nueva"].texto} etiqueta={`Prompt · ${P["s5-sesion-nueva"].donde}`} />
      </Bloque>

      {/* ═══ 11 · Versiones ═══════════════════════════════════════════════ */}
      <Bloque
        id="versiones"
        etiqueta="Tu red de seguridad"
        titulo="Deshacer y guardar cada versión"
        entradilla="Si un cambio no te gusta, vuelve atrás antes de seguir pidiendo cosas."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tarjeta titulo="/undo" tono="azul" mono>
            Escribe <C>/</C> en la caja y elige <b>/undo</b>: «Deshacer el último mensaje». Tu petición vuelve a la caja y
            los ficheros, a como estaban.
          </Tarjeta>
          <Tarjeta titulo="Una copia por versión" tono="verde">
            OpenCode solo recupera los ficheros si la carpeta es un <b>repositorio git</b>. Si no lo es, tu red eres tú:
            cada versión que funcione, copia <C>index.html</C> como <C>index-v1.html</C>, <C>index-v2.html</C>…
          </Tarjeta>
        </div>
      </Bloque>

      <Bloque
        titulo="El repositorio del ejemplo"
        nivel={3}
        entradilla={
          <>
            La plataforma de ejemplo está publicada en GitHub con <b>un cambio guardado por cada mensaje al agente</b>: lo
            que pedimos, lo que cambió y cada versión, para descargarla o compararla.
          </>
        }
      >
        <a
          href={REPO}
          target="_blank"
          rel="noopener noreferrer"
          className={`block rounded-2xl border-2 p-5 transition hover:-translate-y-0.5 ${TONO.rosa.caja}`}
        >
          <span className={`block font-mono text-lg font-bold ${TONO.rosa.texto}`}>github.com/aulaenlanube/mi-modulo</span>
          <span className="mt-1 block text-xl font-bold text-zinc-900 dark:text-zinc-100">
            El código, los ficheros de la carpeta y la conversación entera →
          </span>
        </a>
      </Bloque>

      {/* ═══ 12 · Compartir ═══════════════════════════════════════════════ */}
      <Paso
        id="compartir"
        n={12}
        titulo="Compártela con tu departamento"
        entradilla={
          <>
            Tu plataforma es un solo fichero: se comparte como cualquier documento. Lo que <b>no</b> viaja son los datos, que
            se quedan en el navegador de cada uno.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="OneDrive del centro" tono="azul">
            Sube <C>index.html</C> y comparte el enlace. Cada compañero lo <b>descarga</b> y lo abre con doble clic.
          </Tarjeta>
          <Tarjeta titulo="GitHub Pages" tono="gris" antetitulo="Opcional">
            Una dirección web pública y gratis. Vale para la plataforma, nunca para datos.{" "}
            <Link href="/programacion-ia/tutoriales/github-pages/" className={cls.enlace}>
              Tutorial
            </Link>
            .
          </Tarjeta>
          <Tarjeta titulo="Haz copia de tus datos" tono="ambar">
            Si borras el historial del navegador, se borran. Descarga la copia en JSON cada semana y guárdala en tu
            OneDrive.
          </Tarjeta>
        </div>
      </Paso>

      <Bloque titulo="La herramienta viaja; los datos, no" nivel={3}>
        <HerramientaViaja />
      </Bloque>

      <Bloque
        titulo="Para inspirarte"
        nivel={3}
        entradilla="Todo esto está hecho con IA y el mismo método: encargo, plan, construir y probar."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            [RUTA + "index.html", "Mi módulo", "La plataforma de esta sesión: pruébala con «Cargar ejemplo»."],
            [`${RAIZ}herramientas/cuaderno-evaluacion/index.html`, "El cuaderno, solo", "Una herramienta más pequeña, hecha igual."],
            ["https://apps-educativas.com", "apps-educativas.com", "Más de cien apps de aula, gratis y sin anuncios."],
            ["https://aulaenlanube.com/cadenas-de-prompts/", "Cadenas de prompts", "Apps reales con la conversación entera."],
          ].map(([href, t, d]) => (
            <a
              key={t}
              href={href}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="block rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-900 dark:hover:border-blue-500/50"
            >
              <span className="block text-xl font-bold text-zinc-900 dark:text-zinc-100">{t} →</span>
              <span className={`mt-1 block ${cls.texto}`}>{d}</span>
            </a>
          ))}
        </div>
      </Bloque>

      {/* ═══ 13 · Plan B ══════════════════════════════════════════════════ */}
      <Bloque
        id="plan-b"
        etiqueta="Si no puedes instalar nada"
        titulo="Plan B: tu plataforma con Copilot Chat"
        entradilla={
          <>
            Sin agente también se puede: Copilot Chat escribe el código y tú haces de agente, guardando el fichero. Es más
            lento para corregir, pero funciona en cualquier ordenador con navegador. Y puedes empezar por la nuestra:
            descárgala y pídele a Copilot que la adapte, pantalla a pantalla.
          </>
        }
      >
        <PlanBSinInstalar />
      </Bloque>

      <Bloque titulo="El encargo para Copilot Chat" nivel={3}>
        <Prompt text={P["s5-plan-b"].texto} etiqueta={`Prompt · ${P["s5-plan-b"].donde}`} />
        <p className={`mt-4 ${cls.texto}`}>
          Si la respuesta se corta a la mitad, el fichero no funcionará: pídele solo la fase 1 y añade las pantallas
          después, de una en una, pidiendo siempre el fichero completo.
        </p>
      </Bloque>

      <ParaAmpliar ids={["BPCe65apZTw", "n7zjADLSR5Y", "y_MC9m803sc", "WXqvGKKFOHw", "Zc2siCcNeHg", "NbXf8NyFLXg", "9778n1WTGXY"]} />

      <Tarea
        n={5}
        tiempo="entre 3 y 4 horas"
        items={[
          { texto: "Instala OpenCode y abre tu carpeta", detalle: "O prepara el plan B con Copilot Chat." },
          { texto: "Pon AGENTS.md, opencode.json y tu encargo", detalle: "Y tu currículo copiado del BOE, para que pruebe." },
          { texto: "Pasa tu encargo por Plan", detalle: "Responde sus dudas antes de construir nada." },
          { texto: "Construye la fase 1 con Build", detalle: "Permitir una vez en cada cambio, mirando qué toca." },
          { texto: "Las tres comprobaciones", detalle: "El alumno trasto, la consola (F12) y una nota a mano." },
          { texto: "Una pantalla nueva por mensaje", detalle: "Probando cada una y guardando una copia de cada versión." },
          { texto: "Enséñasela a un compañero", detalle: "Apunta dónde se atasca sin que tú le expliques nada." },
          { texto: "Escribe tu hoja de ruta", detalle: "Qué añades este curso y qué dejas para el siguiente." },
        ]}
        resultado="Tu plataforma funcionando con tu currículo, probada con las tres comprobaciones, una copia de cada versión y la hoja de ruta para lo que queda de curso."
      />

      <LoQueTeLlevas n={5}>
        <p>
          Una plataforma <b>tuya</b>, hecha desde cero sin programar: un encargo escrito por fases, una carpeta con su
          memoria y sus reglas, un plan revisado antes de construir y una cadena de peticiones cortas, cada una comprobada.
        </p>
        <p>
          Y el método, que vale para la siguiente: <b>encargar, revisar, probar como un trasto, mirar la consola, comprobar
          con la calculadora y corregir de uno en uno</b>. Con esta acaba el seminario: la IA te ahorra el borrador; el
          criterio, la revisión y la firma siguen siendo tuyos.
        </p>
      </LoQueTeLlevas>

      <section className="mt-10 max-w-[1100px]">
        <Link
          href={`${RAIZ}tu-herramienta/`}
          className={`block rounded-2xl border-2 p-5 transition hover:-translate-y-0.5 ${TONO.rosa.caja}`}
        >
          <span className={`block text-base font-bold uppercase tracking-wider ${TONO.rosa.texto}`}>El ejemplo resuelto</span>
          <span className="mt-1 block text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Tu plataforma, paso a paso: la conversación real con el agente, mensaje a mensaje →
          </span>
        </Link>
      </section>

      <NavSesiones n={5} />
    </div>
  );
}
