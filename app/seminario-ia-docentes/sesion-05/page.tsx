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
import { AGENTS_MD, OPENCODE_JSON, P_NOTAS } from "../tu-herramienta/ficheros";
import {
  BucleDocente,
  CarpetaMundo,
  CuandoSeLee,
  DondeVive,
  HerramientaViaja,
  PlanBSinInstalar,
  PlanBuild,
  TresCaminos,
  TresReglas,
  UnFallo,
} from "./figuras";
import { PROMPTS_S5 } from "./prompts";

export const metadata: Metadata = {
  title: "Sesión 5 · Tu herramienta desde cero con OpenCode — Seminario de IA para docentes – Aula en la nube",
  description:
    "Laboratorio para docentes de FP y Secundaria: instala OpenCode, un agente de IA gratuito y de código abierto, y convierte tu encargo en una herramienta web de un solo fichero que funciona sin internet. Carpeta, modelo, AGENTS.md, permisos, plan y construcción, pruebas, deshacer y compartir. Con plan B sin instalar nada.",
  alternates: { canonical: `${RAIZ}sesion-05/` },
};

const P = Object.fromEntries(PROMPTS_S5.map((p) => [p.id, p]));
const RUTA_HERRAMIENTA = `${RAIZ}herramientas/cuaderno-evaluacion/`;

const INDICE: [string, string][] = [
  ["agente", "De un chat a un agente"],
  ["instalar", "Instalar la app"],
  ["carpeta", "Tu carpeta"],
  ["modelo", "Elegir el modelo"],
  ["memoria", "AGENTS.md: la memoria"],
  ["reglas", "Las tres reglas"],
  ["plan", "Plan y construcción"],
  ["probar", "Probar y corregir"],
  ["compartir", "Compartirla"],
  ["plan-b", "Plan B sin instalar"],
];

export default function Sesion5() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <CabeceraSesion n={5} />
      <VideoResumen n={5} />
      <EnEstaSesion items={INDICE} tono="rosa" />

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
            La herramienta que construye vive en tu carpeta, no en la web de nadie.
          </Tarjeta>
          <Tarjeta titulo="El mismo concepto" tono="morado" suave>
            El modo agente de Copilot y otros agentes funcionan igual: lo que aprendes aquí te sirve allí.
          </Tarjeta>
        </div>
      </Bloque>

      <Aviso titulo="Lo que sigue siendo tuyo" tono="rosa">
        <p>
          El agente escribe el código, pero <b>la herramienta es tuya</b>: tú decides qué hace, tú lees cada permiso antes
          de aceptarlo y tú la pruebas antes de fiarte de un solo número. Si calcula mal una nota y no lo compruebas, el
          error no es de la IA: es de quien la usó sin mirar.
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
          y harás tu herramienta con Copilot Chat, sin instalar nada.
        </p>
        <Fuente id="opencode">Descarga oficial</Fuente>
        <p className={`mt-2 ${cls.tenue}`}>
          Los nombres de botones de esta sesión se comprobaron en la interfaz web de OpenCode 2.2.5, en castellano. Si tu
          app los muestra en inglés o en otro sitio, busca la misma palabra.
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
            El agente trabaja <b>dentro de una carpeta</b>. Créala vacía, solo para tu herramienta, por ejemplo en
            Documentos. Después, en OpenCode: <b>Añadir proyecto</b>, se abre la ventana <b>Abrir proyecto</b>, buscas tu
            carpeta y pulsas <b>Seleccionar carpeta</b>.
          </>
        }
        junto={
          <Arbol
            titulo="Tu carpeta, al acabar la sesión"
            raiz="cuaderno-evaluacion"
            nodos={[
              { nombre: "AGENTS.md", nivel: 0, nota: "la memoria (paso 4)" },
              { nombre: "opencode.json", nivel: 0, nota: "las reglas (paso 5)" },
              { nombre: "index.html", nivel: 0, nota: "tu herramienta: la escribe el agente", tono: "rosa" },
            ]}
            tono="verde"
          />
        }
      >
        <Lista
          className={cls.texto}
          items={[
            <>Un nombre corto y sin espacios ni tildes: <C>cuaderno-evaluacion</C>, <C>banco-preguntas</C>…</>,
            <>Nada más dentro: ni apuntes, ni listas de clase, ni fotos. Lo que haya en la carpeta, el agente lo puede leer.</>,
            <>Una carpeta por herramienta. Si mañana haces otra, otra carpeta.</>,
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
            <b>GLM-5.3-Flash Free</b> y <b>DeepSeek V4.1 Flash Free</b> son los únicos gratuitos que declaran no guardar
            lo que les escribes. La herramienta de ejemplo se hizo con GLM.
          </Tarjeta>
          <Tarjeta titulo="Ojo con el que viene marcado" tono="ambar" antetitulo="Letra pequeña">
            El que sale como <b>Predeterminado</b> puede no ser el que quieres. Big Pickle, Flint y MiMo pueden usar lo que
            escribes para mejorar su modelo, y los Nemotron registran el uso.
          </Tarjeta>
          <Tarjeta titulo="GitHub Copilot" tono="azul" antetitulo="Si eres docente verificado">
            Con GitHub Education tienes Copilot Pro gratis (1.500 créditos al mes). En OpenCode: <b>Conectar proveedor</b>{" "}
            (o <C>/connect</C>), GitHub Copilot y «Login with GitHub Copilot».
          </Tarjeta>
        </div>
        <Fuente id="githubDocentes">GitHub para docentes</Fuente>
      </Paso>

      <Bloque titulo="Tres caminos para el modelo" nivel={3}>
        <TresCaminos />
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
            <>Las reglas que no se rompen: un solo fichero, sin internet, datos solo en el navegador.</>,
            <>Cada vez que el agente repita un error, una línea más.</>,
          ]}
        />
        <p className={`mt-4 ${cls.texto}`}>
          <a href={`${RUTA_HERRAMIENTA}AGENTS.md`} download className={cls.enlace}>
            Descarga este AGENTS.md
          </a>{" "}
          y adáptalo, o pídeselo a Copilot con tu ficha (el prompt de abajo).
        </p>
      </Paso>

      <Bloque titulo="Quién la usa y qué es: AGENTS.md" nivel={3}>
        <Codigo code={AGENTS_MD} kind="md" etiqueta="cuaderno-evaluacion/AGENTS.md · parte 1 de 2" rango={[1, 11]} />
      </Bloque>

      <Bloque titulo="Reglas y forma de trabajar: AGENTS.md" nivel={3}>
        <Codigo code={AGENTS_MD} kind="md" etiqueta="cuaderno-evaluacion/AGENTS.md · parte 2 de 2" rango={[13, 25]} />
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
          <a href={`${RUTA_HERRAMIENTA}opencode.json`} download className={cls.enlace}>
            Descarga este opencode.json
          </a>
          . El bloque final, <C>agents</C>, impide que el agente Plan escriba: solo piensa.
        </p>
      </Paso>

      <Bloque titulo="El opencode.json, entero" nivel={3}>
        <Codigo code={OPENCODE_JSON} kind="json" etiqueta="cuaderno-evaluacion/opencode.json" ajustar={false} />
      </Bloque>

      <Bloque titulo="Qué pasa cuando quiere actuar" nivel={3}>
        <TresReglas />
      </Bloque>

      <Aviso titulo="Permitir una vez, no permitir siempre" tono="rosa">
        <p>
          Cuando quiera cambiar <C>index.html</C>, verás <b>Permiso requerido</b> con tres botones: <b>Denegar</b>,{" "}
          <b>Permitir siempre</b> y <b>Permitir una vez</b>. Usa <b>Permitir una vez</b>: es tu ocasión de ver qué toca.
          En Ajustes hay un interruptor, <b>Aceptar permisos automáticamente</b>: déjalo apagado.
        </p>
        <p className="text-base">
          Con total transparencia: la primera versión del ejemplo se construyó sin pantalla, desde un script, con una copia
          de estas reglas que permitía editar y prohibía las órdenes de terminal. Todas las mejoras posteriores se hicieron
          en la interfaz, aprobando cada cambio con «Permitir una vez».
        </p>
      </Aviso>

      {/* ═══ 7 · Plan y construcción ══════════════════════════════════════ */}
      <Paso
        id="plan"
        n={6}
        titulo="Pide primero el plan"
        entradilla={
          <>
            OpenCode trae dos agentes: <b>Plan</b>, que piensa y no toca ficheros, y <b>Build</b>, que construye. Para
            verlos, activa en <b>Ajustes</b> la opción <b>Mostrar agente</b>: aparece el selector <b>Elegir agente</b>{" "}
            junto al del modelo. Elige Plan y pega tu encargo de la sesión 4.
          </>
        }
      >
        <Prompt text={P["s5-plan"].texto} etiqueta={`Prompt · ${P["s5-plan"].donde}`} />
      </Paso>

      <Bloque titulo="Plan, revisas, Build, pruebas" nivel={3}>
        <PlanBuild />
      </Bloque>

      <Bloque
        titulo="Lo que hizo el plan con el cuaderno"
        nivel={3}
        entradilla="El plan real del ejemplo, en 34 segundos: pantallas, cómo guardar los datos y cómo calcular. Y lo más útil: sus dudas."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tarjeta titulo="Lo que propuso" tono="morado">
            <Lista
              items={[
                "Cinco pestañas: Configuración, Alumnado, Actividades, Notas y Resultados.",
                "Todo en el navegador, bajo una sola clave, y guardado a cada cambio.",
                "Medias ponderadas que ignoran lo no evaluado, con avisos.",
              ]}
            />
          </Tarjeta>
          <Tarjeta titulo="Lo que preguntó" tono="ambar">
            <Lista
              items={[
                "Si los pesos no suman 100, ¿avisar o bloquear?",
                "Al cambiar de modo FP / ESO, ¿borrar los datos?",
                "Una casilla vacía, ¿es un cero o «no evaluado»?",
              ]}
            />
          </Tarjeta>
        </div>
        <p className={`mt-4 ${cls.texto}`}>
          La segunda duda importaba: proponía <b>borrar todo al cambiar de modo</b>. Se lo corregimos en la respuesta. Por
          eso el plan va antes: lo que decides ahí no hay que arreglarlo después.
        </p>
      </Bloque>

      <Paso
        id="construir"
        n={7}
        titulo="Da luz verde a Build"
        entradilla={
          <>
            Cambia a <b>Build</b> y contesta sus dudas en el mismo mensaje en que le das permiso para empezar. Con cada
            cambio te pedirá permiso: <b>Permitir una vez</b>, y mira qué fichero toca.
          </>
        }
      >
        <Prompt text={P["s5-adelante"].texto} etiqueta={`Prompt · ${P["s5-adelante"].donde}`} />
        <p className={`mt-4 ${cls.texto}`}>
          En el ejemplo, este mensaje produjo la primera versión completa: un <C>index.html</C> de unos 35 KB con las cinco
          pestañas, los cálculos, la copia en JSON, el CSV y la impresión.{" "}
          <Link href={`${RAIZ}tu-herramienta/`} className={cls.enlace}>
            La cadena completa, mensaje a mensaje
          </Link>
          .
        </p>
      </Paso>

      {/* ═══ 8 · Probar y corregir ════════════════════════════════════════ */}
      <Paso
        id="probar"
        n={8}
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
            { texto: "Escribe «abc» en una nota", detalle: "¿Borra la nota que había?" },
            { texto: "Pon un 11 o un −2", detalle: "¿Lo acepta, lo cambia o avisa?" },
            { texto: "Deja casillas vacías", detalle: "¿Cuentan como cero o como «no evaluado»?" },
            { texto: "Pesos que no suman 100", detalle: "¿Avisa? ¿Calcula igual?" },
            { texto: "Recarga la página", detalle: "¿Siguen ahí tus datos?" },
            { texto: "Exporta el CSV y ábrelo", detalle: "¿Lo entiende tu hoja de cálculo?" },
            { texto: "Comprueba una nota a mano", detalle: "Con calculadora, de un alumno inventado." },
            { texto: "Úsala solo con el teclado", detalle: "Tabulador, flechas, Intro." },
          ]}
        />
      </Paso>

      <Aviso titulo="Lo que encontramos en la primera versión" tono="ambar">
        <p>
          Los cálculos salían bien, comprobados a mano con un ejemplo inventado. Pero al escribir <b>«abc»</b> sobre un 5,{" "}
          <b>el 5 desaparecía sin avisar</b>, y un <b>11</b> se veía como 11 pero se guardaba como 10. Además, había
          rótulos en minúsculas: «Nota ra», «Añadir ce». Nada de eso se ve si solo pruebas lo que funciona.
        </p>
      </Aviso>

      <Paso
        id="corregir"
        n={9}
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

      <Bloque titulo="La petición real del fallo de las notas" nivel={3}>
        <Prompt text={P_NOTAS} etiqueta="Prompt real · OpenCode (Build)" />
        <p className={`mt-4 ${cls.texto}`}>
          Resultado: ahora la casilla se pone en rojo, avisa de qué está mal y, al salir, recupera la nota anterior. Se
          volvió a probar con «abc» y con 11: las notas se conservan.
        </p>
      </Bloque>

      <Bloque
        titulo="Deshacer"
        nivel={3}
        entradilla="Si un cambio no te gusta, vuelve atrás antes de seguir pidiendo cosas."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tarjeta titulo="/undo" tono="azul" mono>
            Escribe <C>/</C> en la caja y elige <b>/undo</b>: «Deshacer el último mensaje». Tu petición vuelve a la caja y
            los ficheros, a como estaban.
          </Tarjeta>
          <Tarjeta titulo="Restablecer a este punto" tono="azul">
            Cada mensaje tuyo tiene esta opción, para volver a ese punto de la conversación cuando quieres retroceder más de
            un paso.
          </Tarjeta>
        </div>
        <p className={`mt-4 ${cls.texto}`}>
          Lo comprobamos: OpenCode solo puede devolverte los ficheros si la carpeta es un <b>repositorio git</b>. Si no lo
          es, tu red de seguridad eres tú: cada vez que una versión funcione, <b>copia index.html</b> con otro nombre (
          <C>index-v1.html</C>, <C>index-v2.html</C>…).
        </p>
      </Bloque>

      {/* ═══ 9 · Compartir ════════════════════════════════════════════════ */}
      <Paso
        id="compartir"
        n={10}
        titulo="Compártela con tu departamento"
        entradilla={
          <>
            Tu herramienta es un solo fichero: se comparte como cualquier documento. Lo que <b>no</b> viaja son los datos,
            que se quedan en el navegador de cada uno.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="OneDrive del centro" tono="azul">
            Sube <C>index.html</C> y comparte el enlace. Cada compañero lo <b>descarga</b> y lo abre con doble clic en su
            navegador.
          </Tarjeta>
          <Tarjeta titulo="GitHub Pages" tono="gris" antetitulo="Opcional">
            Una dirección web pública y gratis. Vale para la herramienta, nunca para datos.{" "}
            <Link href="/programacion-ia/tutoriales/github-pages/" className={cls.enlace}>
              Tutorial
            </Link>
            .
          </Tarjeta>
          <Tarjeta titulo="Haz copia de tus datos" tono="ambar">
            Si borras el historial del navegador, se borran. Exporta la copia en JSON cada semana y guárdala en tu OneDrive.
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
            [RUTA_HERRAMIENTA + "index.html", "El cuaderno de evaluación", "La herramienta de esta sesión, para usarla ya."],
            ["https://apps-educativas.com", "apps-educativas.com", "Más de cien apps de aula, gratis y sin anuncios."],
            ["https://aulaenlanube.com/cadenas-de-prompts/", "Cadenas de prompts", "Apps reales con la conversación entera que las creó."],
            ["/ponencia-tecnologia/app-ensayo-traccion/", "Ensayo de tracción", "Un simulador de Tecnología salido de un solo encargo."],
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

      {/* ═══ 10 · Plan B ══════════════════════════════════════════════════ */}
      <Bloque
        id="plan-b"
        etiqueta="Si no puedes instalar nada"
        titulo="Plan B: tu herramienta con Copilot Chat"
        entradilla={
          <>
            Sin agente también se puede: Copilot Chat escribe el código y tú haces de agente, guardando el fichero. Es más
            lento para corregir, pero funciona en cualquier ordenador con navegador.
          </>
        }
      >
        <PlanBSinInstalar />
      </Bloque>

      <Bloque titulo="El encargo para Copilot Chat" nivel={3}>
        <Prompt text={P["s5-plan-b"].texto} etiqueta={`Prompt · ${P["s5-plan-b"].donde}`} />
        <p className={`mt-4 ${cls.texto}`}>
          Si la respuesta se corta a la mitad, el fichero no funcionará: pídele menos pantallas y añádelas después, de una
          en una, pidiendo siempre el fichero completo.
        </p>
      </Bloque>

      <ParaAmpliar ids={["BPCe65apZTw", "n7zjADLSR5Y", "y_MC9m803sc", "WXqvGKKFOHw", "Zc2siCcNeHg", "NbXf8NyFLXg", "9778n1WTGXY"]} />

      <Tarea
        n={5}
        tiempo="entre 3 y 4 horas"
        items={[
          { texto: "Instala OpenCode y abre tu carpeta", detalle: "O prepara el plan B con Copilot Chat." },
          { texto: "Pon AGENTS.md y opencode.json", detalle: "Descárgalos de esta página y adapta AGENTS.md a tu ficha." },
          { texto: "Pasa tu encargo por Plan", detalle: "Responde sus dudas antes de construir nada." },
          { texto: "Construye la v1 con Build", detalle: "Permitir una vez en cada cambio, mirando qué toca." },
          { texto: "Haz las pruebas del alumno trasto", detalle: "Con el prompt de las diez pruebas, y apunta los fallos." },
          { texto: "Tres mejoras en cadena", detalle: "Una por petición, comprobando cada una y guardando una copia." },
          { texto: "Enséñasela a un compañero", detalle: "Apunta dónde se atasca sin que tú le expliques nada." },
          { texto: "Escribe tu hoja de ruta", detalle: "Qué mejoras para lo que queda de curso y cuáles para el siguiente." },
        ]}
        resultado="Tu herramienta v1 funcionando, con tres mejoras, una copia de seguridad de cada versión y la hoja de ruta para lo que queda de curso y el siguiente."
      />

      <LoQueTeLlevas n={5}>
        <p>
          Una herramienta <b>tuya</b>, hecha desde cero sin programar: un encargo bien escrito, una carpeta con su memoria y
          sus reglas, un plan revisado antes de construir y una cadena de peticiones cortas, cada una comprobada.
        </p>
        <p>
          Y el método, que vale para la siguiente: <b>encargar, revisar, probar como un trasto y corregir de uno en uno</b>.
          La IA escribe el código; el criterio sigue siendo tuyo.
        </p>
      </LoQueTeLlevas>

      <section className="mt-10 max-w-[1100px]">
        <Link
          href={`${RAIZ}tu-herramienta/`}
          className={`block rounded-2xl border-2 p-5 transition hover:-translate-y-0.5 ${TONO.rosa.caja}`}
        >
          <span className={`block text-base font-bold uppercase tracking-wider ${TONO.rosa.texto}`}>El ejemplo resuelto</span>
          <span className="mt-1 block text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Tu herramienta, paso a paso: el cuaderno de evaluación y su cadena real de prompts →
          </span>
        </Link>
      </section>

      <NavSesiones n={5} />
    </div>
  );
}
