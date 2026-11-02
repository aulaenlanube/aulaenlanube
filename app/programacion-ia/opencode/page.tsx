import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import BucleAgente from "../_video/bucle";
import {
  Anatomia,
  Aviso,
  Bloque,
  C,
  Chip,
  Codigo,
  DosColumnas,
  IconoPermiso,
  LineaTiempo,
  Lista,
  Paso,
  Permiso,
  Prompt,
  Regla,
  TONO,
  Tarjeta,
  Teclas,
  Terminal,
  cls,
  type Hito,
  type TipoPermiso,
  type Tono,
} from "../_video/piezas";
import { CaminoPeticion, CapasFusion, CuandoSeCarga, DondeVive, FlujoPermiso, QuienHace, Subagentes } from "./figuras";
import { AGENTS_MD, CONFIG_GLOBAL, CONFIG_PROYECTO, MCP_JSON, NUEVA_ACCION_MD, REVISOR_MD, SKILL_MD } from "../_opencode/ficheros";

export const metadata: Metadata = {
  title: "OpenCode: tu agente de programación — Curso de Programación con IA",
  description:
    "Guía de OpenCode 2 para el curso: instalación, conexión a los modelos del centro, agentes, permisos, AGENTS.md, comandos, skills y MCP.",
};

// Página pensada para grabarse (docs/paginas-para-video.md): cada <Bloque> es
// una pantalla de 16:9 con una sola idea, los pasos se titulan «Paso N · …» y
// todo lo que cuenta cada pieza está escrito, sin pulsar ni pasar el ratón.
// Versión: la última estable de OpenCode 2 (documentación en opencode.ai/v2/docs).

/* ------------------------------------------------------------------ */
/* Datos                                                               */
/* ------------------------------------------------------------------ */

const INDICE = [
  ["chat-agente", "Chat frente a agente"],
  ["por-que", "Por qué OpenCode"],
  ["instalar", "Instalación"],
  ["conectar", "Modelos del centro"],
  ["tui", "Primeros pasos"],
  ["agentes", "Agentes"],
  ["permisos", "Permisos"],
  ["agents-md", "AGENTS.md"],
  ["comandos", "Comandos"],
  ["skills", "Skills"],
  ["mcp", "MCP"],
  ["flujo", "Flujo de trabajo"],
  ["ruta", "Tu ruta en el curso"],
  ["errores", "Errores típicos"],
  ["enlaces", "Enlaces"],
] as const;

const HERRAMIENTAS: { grupo: string; tono: Tono; items: [string, string, string][] }[] = [
  {
    grupo: "Para mirar",
    tono: "azul",
    items: [
      ["read", "Lee un fichero (o un trozo).", "Como abrirlo en el editor para mirarlo."],
      ["glob", "Busca ficheros por nombre o patrón: src/**/*.py.", "Como el buscador de ficheros."],
      ["grep", "Busca texto dentro de los ficheros.", "Como Ctrl+Shift+F en VS Code."],
      ["webfetch", "Descarga una página web y la lee.", "En el proyecto, siempre pregunta antes."],
    ],
  },
  {
    grupo: "Para cambiar",
    tono: "morado",
    items: [
      ["edit", "Cambia unas líneas concretas de un fichero que ya existe.", "Te enseña el diff antes de aplicarlo (si está en ask)."],
      ["write", "Crea un fichero nuevo o lo reescribe entero.", "Lo controla el mismo permiso que edit."],
      ["shell", "Ejecuta una orden en la terminal: uv run, git status, ls…", "La más potente y la más peligrosa: por eso pregunta."],
    ],
  },
  {
    grupo: "Para organizarse",
    tono: "verde",
    items: [
      ["subagent", "Lanza un subagente (general, explore o uno tuyo) para una subtarea.", "Trabaja en una sesión hija y te devuelve un resumen."],
      ["todowrite", "Mantiene una lista de pasos pendientes y hechos.", "Verás la lista tachándose mientras trabaja."],
      ["skill", "Carga una skill (conocimiento extra) cuando la necesita.", "Solo carga la que le sirve, no todas."],
      ["question", "Te hace una pregunta con opciones cuando duda.", "Respóndela: es mejor que dejarle adivinar."],
    ],
  },
];

// [teclas, comando, para qué]
const ATAJOS: [string, string, string][] = [
  ["shift+tab", "", "Cambia de agente: build ↔ plan"],
  ["ctrl+x a", "/agents", "Elegir agente de la lista"],
  ["Esc", "", "Interrumpe la respuesta en curso"],
  ["ctrl+p", "", "Paleta con todos los comandos"],
  ["ctrl+x n", "/new", "Sesión nueva (una por tarea)"],
  ["ctrl+x l", "/sessions", "Lista de sesiones para retomar una"],
  ["ctrl+x m", "/models", "Elegir modelo"],
  ["ctrl+x c", "/compact", "Compacta la conversación para liberar contexto"],
  ["ctrl+x u", "/undo", "Deshace tu último mensaje y lo que hizo después"],
  ["ctrl+x r", "/redo", "Rehace lo deshecho"],
  ["ctrl+x x", "/export", "Exporta la sesión a tu editor"],
  ["ctrl+x e", "/editor", "Escribe la petición en tu editor"],
  ["ctrl+c", "", "Salir (también ctrl+d o ctrl+x q)"],
];

const SIN_ATAJO: [string, string][] = [
  ["/init", "Configuración guiada del AGENTS.md del proyecto"],
  ["/review", "Revisa los cambios sin commit (o un commit, rama o PR)"],
  ["/skills", "Las skills que ve el agente"],
  ["/help", "Ayuda"],
  ["/connect", "Conecta un proveedor de modelos"],
  ["/mcps", "Servidores MCP: conectar o desconectar"],
  ["/diff", "Revisa los cambios en una vista de diferencias"],
  ["/btw", "Pregunta al margen: la respuesta no entra en la conversación"],
];

// [veredicto, regla («acción · recurso → efecto»), qué significa]
const REGLAS_FICHEROS: [TipoPermiso, string, string][] = [
  ["ask", "edit · * → ask", "Cada edición o fichero nuevo te enseña el diff y espera tu sí. En la semana 1 es obligatorio: lees todo lo que entra en tu repo."],
  ["ask", "webfetch · * → ask", "Si quiere leer una web, pregunta. Así sabes de dónde saca la información."],
  ["ask", "external_directory · * → ask", "Nada fuera de la carpeta del proyecto sin preguntar (tu carpeta personal, otras prácticas…). De fábrica no pregunta: por eso la regla."],
  ["allow", "read · * → allow", "Puede leer cualquier fichero del proyecto sin preguntar…"],
  ["deny", "read · *.env, *.env.* → deny", "…salvo los .env con claves: esos ni los ve. Van DESPUÉS del «*» porque gana la última que coincide."],
  ["allow", "read · *.env.example → allow", "La plantilla sin claves sí puede leerla (va al final para volver a permitirla)."],
];

const REGLAS_ORDENES: [TipoPermiso, string, string][] = [
  ["ask", "shell · * → ask", "Regla general: cualquier orden pregunta. Es la primera para que las demás la puedan matizar."],
  ["allow", "shell · ls *, pwd, cat * → allow", "Mirar carpetas y ficheros no rompe nada."],
  ["allow", "shell · git status *, git diff *, git log * → allow", "Consultar git tampoco. El agente puede ver qué ha cambiado."],
  ["allow", "shell · uv run tareas --help, uv run tareas validar * → allow", "Probar la ayuda y validar acciones.json es inofensivo."],
  ["allow", "shell · uv run pytest * → allow", "Pasar las pruebas (semana 4)."],
  ["ask", "shell · git commit * → ask", "Los commits los haces tú; si te lo propone, te pregunta (y normalmente dirás que no)."],
];

const REGLAS_NUNCA: [TipoPermiso, string, string][] = [
  ["deny", "shell:git push *, shell:git reset * → deny", "Subir o reescribir historia: nunca el agente."],
  ["deny", "shell:rm *, shell:sudo * → deny", "Borrar ficheros o usar permisos de administrador: prohibido."],
  ["deny", "agents.plan · edit * → deny", "Al agente plan le quita editar; sus órdenes siguen tus reglas de shell (explicado en Agentes)."],
  ["deny", "agents.explore · edit * → deny", "Lo mismo para explore: tu edit · * → ask le devolvería la edición."],
];

const COMPARA_FILAS = ["Qué es", "Cuándo se carga", "Quién lo dispara", "Gasta contexto", "Ejemplo del curso", "Dónde"];
const COMPARA: { titulo: string; tono: Tono; valores: string[] }[] = [
  {
    titulo: "AGENTS.md",
    tono: "azul",
    valores: ["Normas fijas del proyecto", "Siempre, al empezar cada sesión", "Nadie: está siempre", "Siempre: tenlo corto", "Stack, órdenes, «no hagas push»", "AGENTS.md (raíz)"],
  },
  {
    titulo: "Skill",
    tono: "morado",
    valores: [
      "Conocimiento especializado",
      "Solo cuando el agente decide que le sirve",
      "El agente (herramienta skill) o tú con @id",
      "Solo id y descripción hasta que se usa",
      "Reglas del esquema de acciones.json",
      ".opencode/skills/<id>/SKILL.md",
    ],
  },
  {
    titulo: "Comando",
    tono: "verde",
    valores: ["Un prompt que repites", "Cuando tú escribes /nombre", "Tú", "Solo al usarlo", "/nueva-accion renombrar-capturas", ".opencode/commands/<nombre>.md"],
  },
];

const FLUJO: { quien: "Tú" | "Plan" | "Build"; titulo: string; texto: string; ej: string }[] = [
  { quien: "Tú", titulo: "Escribe la intención", texto: "Spec, entrada de acciones.json o criterio de aceptación. Qué quieres y cómo sabrás que está bien.", ej: "docs/spec.md" },
  { quien: "Plan", titulo: "Pide un plan", texto: "Shift+Tab a plan: «explícame cómo lo harías y qué ficheros tocarías». Lo lees y lo corriges.", ej: "shift+tab → plan" },
  { quien: "Build", titulo: "Que lo haga", texto: "Shift+Tab a build: «hazlo». Apruebas cada edición y cada orden leyendo el diff.", ej: "shift+tab → build" },
  { quien: "Tú", titulo: "Audita", texto: "Lee el código y prueba en ~/pruebas-tareas con --simular y casos feos. Si sale mal: /undo o le explicas el fallo.", ej: "!uv run tareas …" },
  { quien: "Tú", titulo: "Commit pequeño", texto: "git add + git commit con un mensaje que cuenta el paso. Guarda el prompt clave en docs/prompts.md (o exporta la sesión).", ej: "git commit" },
  { quien: "Tú", titulo: "Sesión nueva", texto: "Una sesión por tarea (/new) y compacta (ctrl+x c) si la conversación se alarga.", ej: "/new" },
];

const QUIEN: Record<"Tú" | "Plan" | "Build", Tono> = { Tú: "verde", Plan: "morado", Build: "azul" };

const RUTA: Hito[] = [
  {
    titulo: "Semana 1",
    fecha: "26-30 oct",
    enlace: { texto: "Sesión 1 · Arranque", href: "/programacion-ia/cli/sesion-01/" },
    puntos: [
      "Instalar OpenCode y conectarlo con los modelos del centro.",
      "Antes de abrir OpenCode, a mano: uv init, .gitignore y git init (sin git no hay /undo).",
      "opencode.json de permisos del proyecto.",
      "/init → AGENTS.md, que luego editas tú.",
      "plan → build para crear cli.py (version + listar), aprobando diffs; /undo; commits tuyos.",
    ],
  },
  {
    titulo: "Semana 2",
    fecha: "2-6 nov",
    enlace: { texto: "Sesión 2 · acciones.json y el motor", href: "/programacion-ia/cli/sesion-02/" },
    puntos: [
      "Tu acciones.json, escrito por ti sin IA.",
      "Skill del proyecto acciones-json (compruébala con /skills).",
      "Comando personalizado /nueva-accion.",
      "Subagente revisor y /review antes de cada commit.",
    ],
  },
  {
    titulo: "Semana 3",
    fecha: "avance",
    futuro: true,
    puntos: [
      "MCP: context7 para documentación de librerías, apagado por defecto y encendido solo cuando hace falta.",
      "La capa IA de TU CLI llamando desde Python a los mismos modelos del centro (CENTRO_IA_URL / CENTRO_IA_KEY, modo sin red).",
    ],
  },
  {
    titulo: "Semana 4",
    fecha: "avance",
    futuro: true,
    puntos: ["El agente escribe pruebas que tú auditas.", "opencode run no interactivo (por ejemplo, en scripts).", "Release v1.0."],
  },
];

// [síntoma, causa probable, solución]
const ERRORES: { titulo: string; items: [string, string, string][] }[] = [
  {
    titulo: "Errores al instalar",
    items: [
      ["opencode: command not found (o «no se reconoce» en Windows)", "La terminal se abrió antes de instalar y no tiene el PATH nuevo, o la carpeta del zip no está en el PATH.", "Cierra y abre la terminal. En Windows, comprueba que la carpeta donde descomprimiste el zip está en el PATH."],
      ["opencode --version dice 1.algo", "Tienes OpenCode 1: otro instalador, un paquete antiguo (opencode-ai) o un mise anterior a la versión de octubre de 2026.", "Desinstálalo e instala con el script de la v2 (o npm install -g @opencode/cli)."],
    ],
  },
  {
    titulo: "Errores al conectar",
    items: [
      ["/models no enseña el modelo del centro", "La config no está donde OpenCode la busca, el JSON tiene un error o el proveedor no se llama centro.", "opencode debug paths config te dice la ruta; revisa el fichero y el nombre."],
      ["opencode run se queda esperando", "El servidor no responde: URL mal escrita, falta /v1, no estás en la red del centro o el servidor está caído.", "Ctrl+C. Revisa CENTRO_IA_URL (termina en /v1) y que estás en la red del aula; si sigue, avisa al profesor."],
      ["Error 401/403 o «clave no válida»", "La variable no existe en esa terminal: {env:VAR} se sustituye por una cadena vacía. Falta export, o la terminal es anterior al setx.", "echo $CENTRO_IA_KEY (bash) o echo $env:CENTRO_IA_KEY (PowerShell). Si sale vacío: export en ~/.bashrc o setx, y terminal NUEVA."],
    ],
  },
  {
    titulo: "Errores de configuración",
    items: [
      ["opencode mcp list dice «No MCP servers configured»", "Los servidores con disabled: true no salen. O el bloque mcp está mal escrito y OpenCode lo descarta sin avisar: command como cadena, o servidores fuera de mcp.servers.", "Enciende el que necesites. command siempre como array ([\"npx\", \"-y\", \"paquete\"]) y cada servidor dentro de mcp.servers."],
      ["He cambiado la config y no hace caso", "OpenCode trabaja con un servicio de fondo que puede seguir con la config anterior.", "opencode reload, o sal de OpenCode y vuelve a abrirlo."],
      ["Una skill no aparece", "Le falta description, o la carpeta no se llama como el id que usas.", "La carpeta es el id; description es obligatoria para que el agente la vea."],
    ],
  },
  {
    titulo: "Errores mientras trabajas",
    items: [
      ["/undo no revierte los ficheros", "El proyecto no es un repositorio git, o el fichero está ignorado por git o pasa de 2 MiB.", "git init antes de abrir OpenCode (los commits no hacen falta)."],
      ["Se ejecutó algo que creía prohibido", "Una regla «*: allow» posterior (otra config o un agente) gana a tu deny.", "Lo que nunca debe pasar, en policies (solo pueden negar). Revisa el orden con opencode debug agents."],
      ["Respuestas cortadas o «context length exceeded»", "Conversación muy larga o demasiados MCP y skills cargados.", "Compacta (ctrl+x c) o abre sesión nueva (/new); apaga los MCP que no uses."],
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Piezas propias de esta página                                       */
/* ------------------------------------------------------------------ */

/** Dos columnas: texto a un lado, código al otro (en móvil, el texto primero). */
function Junto({ texto, codigo, codigoAncho = false }: { texto: ReactNode; codigo: ReactNode; codigoAncho?: boolean }) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 ${
        codigoAncho ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
      }`}
    >
      <div className="min-w-0 space-y-4">{texto}</div>
      <div className="min-w-0">{codigo}</div>
    </div>
  );
}

/** Esquema de la pantalla de OpenCode: cada parte numerada y cada línea, su elemento. */
function Marca({ n }: { n: number }) {
  return (
    <span
      aria-hidden
      className="mr-2 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400 font-sans text-base font-extrabold text-zinc-950"
    >
      {n}
    </span>
  );
}

const PARTES_TUI: [string, string][] = [
  ["Conversación.", "Tus mensajes, las respuestas y cada herramienta que usa (qué fichero lee, qué orden ejecuta). Léelo: es el «razonamiento en voz alta» del agente."],
  ["Petición de permiso.", "Cuando una regla está en ask, se para y te enseña el diff o la orden. Nada se aplica hasta que respondes."],
  ["Caja de entrada.", "Escribes la petición. Intro envía; para un salto de línea, shift+enter o ctrl+j."],
  ["Barra inferior.", "Agente activo (Build o Plan) y modelo. Míralo antes de escribir: ¿estás en el agente que quieres?"],
];

function EsquemaTui() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]">
      <div
        className="overflow-x-auto rounded-2xl border border-zinc-300 bg-zinc-950 p-4 font-mono text-base leading-[1.45] text-zinc-300 dark:border-white/10"
        role="img"
        aria-label="Esquema simplificado de la pantalla de OpenCode: conversación arriba, petición de permiso, caja de entrada y barra inferior con el agente y el modelo."
      >
        <div className="min-w-[520px] space-y-3">
          <div className="flex items-start">
            <Marca n={1} />
            <div className="flex-1">
              <div className="text-zinc-50">
                <span className="text-blue-300">tú ›</span> Añade la orden version a @src/tareas/cli.py
              </div>
              <div className="text-zinc-400">→ Read src/tareas/cli.py</div>
              <div className="text-zinc-400">→ Read src/tareas/__init__.py</div>
              <div>Voy a añadir una función version() que lea __version__…</div>
              <div className="text-zinc-400">→ Edit src/tareas/cli.py</div>
            </div>
          </div>
          <div className="flex items-start">
            <Marca n={2} />
            <div className="flex-1 rounded-lg border border-amber-500/60 bg-amber-500/10 p-2">
              <div className="text-amber-300">Permiso: editar src/tareas/cli.py</div>
              <div className="text-emerald-300">+ @app.command()</div>
              <div className="text-emerald-300">+ def version():</div>
              <div className="mt-1 text-zinc-300">[once] [always] [reject]</div>
            </div>
          </div>
          <div className="flex items-start">
            <Marca n={3} />
            <div className="flex-1 rounded-lg border border-zinc-600 px-2 py-1.5 text-zinc-400">
              Escribe aquí… <span className="text-zinc-400">@fichero · !orden · /comando</span>
            </div>
          </div>
          <div className="flex items-start">
            <Marca n={4} />
            <div className="flex flex-1 flex-wrap justify-between gap-2">
              <span>
                <span className="rounded bg-blue-500/25 px-1.5 text-blue-200">Build</span>{" "}
                <span className="text-zinc-300">Qwen 3.8 Flash-Next (centro)</span>
              </span>
              <span className="text-zinc-400">shift+tab agentes · ctrl+p comandos</span>
            </div>
          </div>
        </div>
      </div>
      <ol className="space-y-3">
        {PARTES_TUI.map(([t, d], i) => (
          <li key={t} className={`flex ${cls.texto}`}>
            <Marca n={i + 1} />
            <span>
              <b className={cls.fuerte}>{t}</b> {d}
            </span>
          </li>
        ))}
        <li className={`italic ${cls.tenue}`}>Esquema simplificado: colores y textos exactos cambian según el tema y la versión.</li>
      </ol>
    </div>
  );
}

/**
 * «Gana la última que coincide» con dos órdenes a la vez: filas = reglas en su
 * orden, columnas = órdenes. Cada regla sale una sola vez (la cámara la enfoca
 * por su texto) y la casilla ganadora de cada columna va resaltada.
 */
const REGLAS_EJEMPLO: [string, TipoPermiso][] = [
  ["shell · * → ask", "ask"],
  ["shell · git diff * → allow", "allow"],
  ["shell · rm * → deny", "deny"],
];
const ORDENES_EJEMPLO: { orden: string; coincide: boolean[]; resultado: TipoPermiso }[] = [
  { orden: "git diff src/tareas/cli.py", coincide: [true, true, false], resultado: "allow" },
  { orden: "rm -r build", coincide: [true, false, true], resultado: "deny" },
];

function TablaCoincidencias() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
      <table className="w-full min-w-[640px] border-collapse text-base">
        <thead>
          <tr className="bg-zinc-100 dark:bg-white/10">
            <th className="px-4 py-3 text-left font-bold text-zinc-700 dark:text-zinc-200">Reglas, de arriba abajo</th>
            {ORDENES_EJEMPLO.map((o) => (
              <th key={o.orden} className="px-4 py-3 text-left font-mono font-bold text-zinc-900 dark:text-zinc-50">
                {o.orden}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {REGLAS_EJEMPLO.map(([regla], i) => (
            <tr key={regla} className="border-t border-zinc-200 dark:border-white/10">
              <th scope="row" className="px-4 py-3 text-left font-mono font-bold text-zinc-900 dark:text-zinc-100">
                {regla}
              </th>
              {ORDENES_EJEMPLO.map((o) => {
                const gana = o.coincide.lastIndexOf(true) === i;
                return (
                  <td
                    key={o.orden}
                    className={`px-4 py-3 ${
                      gana
                        ? "bg-blue-50 font-bold text-blue-900 dark:bg-blue-500/15 dark:text-blue-100"
                        : o.coincide[i]
                          ? "text-zinc-800 dark:text-zinc-200"
                          : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    {gana ? "coincide · gana ✓" : o.coincide[i] ? "coincide" : "no coincide"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-zinc-300 dark:border-white/20">
            <th scope="row" className="px-4 py-3 text-left font-bold text-zinc-900 dark:text-zinc-100">
              Resultado
            </th>
            {ORDENES_EJEMPLO.map((o) => (
              <td key={o.orden} className="px-4 py-3">
                <span className="inline-flex items-center gap-2 font-mono text-lg font-extrabold text-zinc-900 dark:text-zinc-50">
                  <IconoPermiso tipo={o.resultado} tam={26} /> {o.resultado}
                </span>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

/**
 * Un trozo del opencode.json del proyecto y sus reglas explicadas. Con
 * `tituloReglas`, las reglas van en la pantalla siguiente (no caben debajo).
 */
function TrozoConfig({
  titulo,
  rango,
  parte,
  reglas,
  tituloReglas,
}: {
  titulo: string;
  rango: [number, number];
  parte: number;
  reglas: [TipoPermiso, string, string][];
  tituloReglas?: string;
}) {
  const codigo = <Codigo code={CONFIG_PROYECTO} kind="json" etiqueta={`cli-tareas/opencode.json · parte ${parte} de 3`} ajustar={false} rango={rango} />;
  const lista = (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2">
      {reglas.map(([t, r, d]) => (
        <Regla key={r} tipo={t} regla={r}>
          {d}
        </Regla>
      ))}
    </ul>
  );
  if (!tituloReglas) {
    return (
      <Bloque titulo={titulo} nivel={3}>
        {codigo}
        <div className="mt-5">{lista}</div>
      </Bloque>
    );
  }
  return (
    <>
      <Bloque titulo={titulo} nivel={3}>
        {codigo}
      </Bloque>
      <Bloque titulo={tituloReglas} nivel={3}>
        {lista}
      </Bloque>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export default function GuiaOpenCode() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      {/* Portada */}
      <section data-bloque className="max-w-[1100px]">
        <Breadcrumbs
          grande
          items={[
            { title: "Curso de Programación con IA", path: "/programacion-ia/" },
            { title: "OpenCode", path: "/programacion-ia/opencode/" },
          ]}
        />
        <Chip>Guía del curso · OpenCode</Chip>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          OpenCode: tu <span className="text-blue-600 dark:text-blue-400">agente de programación</span>
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          A partir del proyecto 2 programas de forma <b>agéntica</b>: con <b>OpenCode</b>, un agente que vive en tu
          terminal, lee tu proyecto, propone cambios y ejecuta órdenes — siempre con tu permiso. Está conectado a los{" "}
          <b>modelos de IA locales del centro</b>: tu código y tus datos <b>no salen del instituto</b>. El chat queda
          para consultas; el código se construye con el agente.
        </p>
        <p className="mt-3 max-w-4xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          Esta guía es tu referencia para <b>todo el curso</b>, en presencial y en semipresencial. Vuelve a ella cada
          vez que aparezca algo nuevo. Y fíjate en el detalle: la herramienta con la que vas a programar tu CLI…{" "}
          <b>es una CLI</b>.
        </p>

        <div className={`mt-5 rounded-2xl border p-4 ${TONO.verde.caja}`}>
          <p className={`text-base font-bold uppercase tracking-wider ${TONO.verde.texto}`}>El hilo del proyecto 2</p>
          <ol className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3">
            {[
              "Detectas una tarea que te hace perder tiempo",
              "La automatizas con tu propia CLI, construida con OpenCode",
              "La reutilizas: una orden, cada vez que la necesites",
            ].map((t, i) => (
              <li key={t} className="flex items-start gap-3 text-lg font-semibold text-emerald-950 dark:text-emerald-100">
                <span aria-hidden className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-extrabold ${TONO.verde.disco}`}>
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["OpenCode 2", "la última versión estable"],
            ["Modelos del centro", "nada sale del instituto"],
            ["Tú decides", "permisos y diffs"],
            ["Todo el curso", "del proyecto 2 en adelante"],
          ].map(([a, b]) => (
            <div key={a} className={`${cls.suave} !p-4`}>
              <p className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">{a}</p>
              <p className={cls.tenue}>{b}</p>
            </div>
          ))}
        </div>
      </section>

      <Bloque titulo="En esta guía">
        <nav aria-label="En esta página">
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {INDICE.map(([id, t], i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="flex h-full items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-base font-semibold text-zinc-800 transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-900 dark:text-zinc-200 dark:hover:border-blue-500/50"
                >
                  <span aria-hidden className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-base font-extrabold ${TONO.azul.disco}`}>
                    {i + 1}
                  </span>
                  {t}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Bloque>

      {/* 1 · Chat frente a agente */}
      <Bloque
        id="chat-agente"
        titulo="Chat frente a agente"
        entradilla={
          <>
            Hasta ahora usabas la IA como un <b>chat</b>: preguntas, te contesta con texto, y tú copias el código y lo
            pegas. Un <b>agente</b> es el mismo tipo de modelo, pero con <b>herramientas</b>: puede abrir tus ficheros,
            buscar, editarlos y ejecutar órdenes. Ve el resultado de cada paso y decide el siguiente, en bucle, hasta
            terminar.
          </>
        }
      >
        <DosColumnas
          a={{
            titulo: "Chat",
            tono: "gris",
            puntos: [
              "No ve tu proyecto: solo lo que le pegas.",
              "Responde una vez; tú haces el trabajo de copiar, pegar y probar.",
              "Ideal para preguntar: «¿qué es un decorador?», «¿por qué falla esto?».",
            ],
          }}
          b={{
            titulo: "Agente (OpenCode)",
            tono: "azul",
            puntos: [
              "Lee el proyecto entero por su cuenta (lo que necesite).",
              "Edita ficheros y ejecuta órdenes, pidiéndote permiso según tus reglas.",
              "Comprueba su propio trabajo (ejecuta, ve el error, corrige) antes de darte el turno.",
            ],
          }}
        />
      </Bloque>

      <Bloque titulo="El bucle del agente" nivel={3}>
        <BucleAgente />
      </Bloque>

      <Bloque
        titulo="Las herramientas del agente"
        nivel={3}
        entradilla={
          <>
            Son las que tiene el agente <b>build</b>. Los permisos (más abajo) deciden cuáles usa solo, cuáles te pregunta
            y cuáles tiene prohibidas.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {HERRAMIENTAS.map((g) => (
            <div key={g.grupo} className={`${cls.tarjeta} !p-4`}>
              <h4 className={`text-xl font-bold ${TONO[g.tono].texto}`}>{g.grupo}</h4>
              <ul className="mt-2 space-y-2">
                {g.items.map(([h, d, o]) => (
                  <li key={h}>
                    <code className="font-mono text-lg font-bold text-zinc-900 dark:text-zinc-50">{h}</code>
                    <p className="text-base leading-snug text-zinc-700 dark:text-zinc-300">
                      {d} <span className="text-zinc-600 dark:text-zinc-400">{o}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Bloque>

      <Aviso titulo="Qué cambia para ti" tono="ambar">
        <p>
          Ya no escribes cada línea, pero sigues siendo quien <b>decide</b> qué se hace, quien <b>revisa</b> cada diff y
          cada orden antes de aceptarla, y quien <b>responde</b> de lo que entrega.
        </p>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["Decides", "qué se hace"],
            ["Revisas", "cada diff y cada orden"],
            ["Respondes", "de lo que entregas"],
          ].map(([v, d]) => (
            <li key={v} className="rounded-xl border border-amber-300 bg-white/70 px-4 py-3 dark:border-amber-500/40 dark:bg-slate-900/60">
              <span className="block text-2xl font-extrabold">{v}</span>
              <span className="text-lg">{d}</span>
            </li>
          ))}
        </ul>
        <p>
          Si el agente mete un fallo y tú lo aceptas, el fallo es tuyo. <i>Lo que no sabes explicar, no lo entregas.</i>
        </p>
      </Aviso>

      {/* 2 · Por qué OpenCode */}
      <Bloque id="por-que" titulo="Por qué OpenCode">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Open source", "Código abierto: puedes ver cómo funciona y no depende de una suscripción."],
            ["En la terminal", "Funciona igual en Linux, Windows y macOS, y dentro de la terminal integrada de VS Code."],
            ["Cualquier proveedor", "Se conecta a decenas de proveedores… y a un servidor propio como el del centro."],
            ["Agentes y permisos a tu medida", "Defines qué puede hacer solo, qué te pregunta y qué nunca hará."],
            ["El mismo concepto que la industria", "Claude Code, Codex o el modo agente de Copilot funcionan igual: lo que aprendes aquí, lo usas allí."],
            ["Configuración en ficheros", "AGENTS.md, comandos, skills y agentes viven en tu repo y viajan con él."],
          ].map(([t, d]) => (
            <Tarjeta key={t} titulo={t} suave>
              <p>{d}</p>
            </Tarjeta>
          ))}
        </div>
      </Bloque>

      <Bloque titulo="Por qué modelos del centro" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            ["Privacidad", "Tu código, tus ficheros y tus prompts se quedan en el servidor del instituto. No alimentan a ninguna empresa."],
            ["Sin cuentas de pago", "No necesitas tarjeta ni suscripción. Te basta la clave que te da el profesor."],
            ["Igual para todos", "Todo el grupo usa el mismo modelo con las mismas condiciones: la nota depende de tu trabajo, no de quién paga más."],
          ].map(([t, d]) => (
            <Tarjeta key={t} titulo={t} nivel={4} antetitulo="Modelos locales" tono="verde">
              <p>{d}</p>
            </Tarjeta>
          ))}
        </div>
      </Bloque>

      <Bloque titulo="El camino de tu petición" nivel={3}>
        <CaminoPeticion />
      </Bloque>

      {/* 3 · Instalación */}
      <Paso
        id="instalar"
        n={1}
        titulo="Instala OpenCode"
        entradilla={
          <>
            Usamos la <b>última versión estable de OpenCode 2</b>. El número exacto importa poco: lo que vas a aprender es
            a trabajar con un agente. En los equipos del aula lo instalas en la primera sesión; en casa (semipresencial),
            elige tu sistema:
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Tarjeta titulo="Linux y macOS" className="flex flex-col">
            <p className="mb-3">
              El script oficial. Después, <b>abre una terminal nueva</b>. (También vale <C>npm install -g @opencode/cli</C>.)
            </p>
            <Codigo code={`curl -fsSL https://opencode.ai/v2/install | bash`} />
          </Tarjeta>
          <Tarjeta titulo="Windows nativo" className="flex flex-col">
            <ol className="list-decimal space-y-1 pl-5">
              <li>
                Instala <b>Git for Windows</b>: sin git no hay <C>/undo</C> de ficheros.
              </li>
              <li>
                Descarga el zip oficial:{" "}
                <a className={cls.enlace} href="https://opencode.ai/update/api/latest/cli/opencode/opencode-windows-x64.zip">
                  opencode-windows-x64.zip
                </a>
                .
              </li>
              <li>
                Descomprímelo en una carpeta tuya (por ejemplo <C>C:\opencode</C>) y añade esa carpeta al <b>PATH</b>.
              </li>
              <li>Abre una terminal nueva de PowerShell.</li>
            </ol>
          </Tarjeta>
          <Tarjeta titulo="Windows con WSL" className="flex flex-col">
            <p className="mb-3">Un Linux dentro de Windows. Si ya usas WSL (Ubuntu), dentro de su terminal usa el script de Linux:</p>
            <Codigo code={`curl -fsSL https://opencode.ai/v2/install | bash`} etiqueta="Terminal de WSL" />
            <p className="mt-3">
              Ojo: en WSL las variables de entorno y la config van en el <C>~</C> de Linux, no en el de Windows.
            </p>
          </Tarjeta>
        </div>
      </Paso>

      <Paso n={2} titulo="Comprueba que está bien">
        <Junto
          codigo={
            <Terminal
              lineas={[
                { o: "opencode --version", c: "# debe decir v2.algo" },
                { s: "opencode v2.2.5", tono: "ok" },
                { o: "opencode debug paths config", c: "# dónde busca tu config global" },
                { s: "/home/tu-usuario/.config/opencode" },
              ]}
            />
          }
          texto={
            <Tarjeta titulo="Si algo falla">
              <Lista
                items={[
                  <>
                    Sale <i>command not found</i> (o <i>no se reconoce</i> en Windows): cierra la terminal y abre otra. Las
                    terminales abiertas antes de instalar no conocen el PATH nuevo.
                  </>,
                  <>
                    Dice 1.algo: tienes OpenCode 1 de otro instalador. Mira{" "}
                    <a className={cls.enlace} href="#errores">
                      Errores típicos
                    </a>
                    .
                  </>,
                  <>
                    Para ponerte al día con la última estable: <C>opencode upgrade</C>.
                  </>,
                ]}
              />
            </Tarjeta>
          }
        />
      </Paso>

      {/* 4 · Conectar */}
      <Paso
        id="conectar"
        n={3}
        titulo="Crea la config global"
        entradilla={
          <>
            OpenCode necesita saber <b>a qué servidor</b> hablar y <b>con qué clave</b>. Eso va en tu configuración{" "}
            <b>global</b> (de tu usuario, en tu equipo), nunca en el repositorio. La URL del servidor y la clave te las da
            el profesor (en clase o en el aula virtual).
          </>
        }
      >
        <p className={`mb-4 ${cls.texto}`}>
          Ruta: <C>~/.config/opencode/opencode.json</C>. Si dudas (Windows, WSL…), <C>opencode debug paths config</C> te
          dice la carpeta exacta. Créala y abre el fichero con tu editor:
        </p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Codigo code={`mkdir -p ~/.config/opencode\ncode ~/.config/opencode/opencode.json   # o nano`} etiqueta="bash / zsh" />
          <Codigo
            code={`New-Item -ItemType Directory -Force "$env:USERPROFILE\\.config\\opencode"\nnotepad "$env:USERPROFILE\\.config\\opencode\\opencode.json"`}
            etiqueta="PowerShell"
          />
        </div>
      </Paso>

      <Paso
        n={4}
        titulo="Pega la configuración"
        entradilla={
          <>
            Tal cual. No hay ninguna dirección ni clave escrita: las dos salen de <b>variables de entorno</b> (el paso 5).
          </>
        }
      >
        <Codigo code={CONFIG_GLOBAL} kind="json" etiqueta="~/.config/opencode/opencode.json" ajustar={false} />
      </Paso>

      <Bloque titulo="Qué hace cada clave" nivel={3}>
        <ul className={`grid grid-cols-1 gap-x-8 gap-y-3 lg:grid-cols-2 ${cls.texto}`}>
          {[
            <>
              <C>centro</C> (en <C>providers</C>): el nombre del proveedor; es lo que va antes de la barra en <C>model</C>.
            </>,
            <>
              <C>package</C> <C>openai-compatible</C>: el servidor del centro habla el mismo «idioma» que la API de OpenAI.
            </>,
            <>
              <C>{'"env": ["CENTRO_IA_KEY"]'}</C>: de qué variable de entorno sale la clave.
            </>,
            <>
              <C>{"{env:CENTRO_IA_URL}"}</C>: la dirección del servidor, leída de otra variable.
            </>,
            <>
              <C>limit</C>: cuánto contexto y salida admite el modelo. Sin esto OpenCode no sabe cuándo resumir la
              conversación.
            </>,
            <>
              <C>{'"tools": true'}</C>: el modelo sabe usar herramientas. Sin eso no hay agente, solo chat.
            </>,
            <>
              <C>model</C>: el modelo que usa por defecto, en formato <C>proveedor/modelo</C>.
            </>,
          ].map((x, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-base font-extrabold ${TONO.azul.disco}`}>
                {i + 1}
              </span>
              <span>{x}</span>
            </li>
          ))}
        </ul>
      </Bloque>

      <Paso
        n={5}
        titulo="Define las variables de entorno"
        entradilla={
          <>
            Sustituye los <C>…</C> por lo que te dé el profesor (la URL termina en <C>/v1</C>).
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Codigo
            code={`# Añade al final de ~/.bashrc (o ~/.zshrc en macOS)\nexport CENTRO_IA_URL="…"\nexport CENTRO_IA_KEY="…"`}
            etiqueta="Linux / macOS / WSL"
          />
          <Codigo code={`setx CENTRO_IA_URL "…"\nsetx CENTRO_IA_KEY "…"`} etiqueta="Windows (PowerShell)" />
        </div>
        <p className={`mt-4 text-lg ${cls.texto}`}>
          Y después, <b>abre una terminal nueva</b>: las variables solo existen en las terminales que se abren después.
        </p>
      </Paso>

      <Paso n={6} titulo="Comprueba la conexión">
        <Terminal
          lineas={[
            { o: "opencode models", c: "# entre ellos, el del centro" },
            { s: "centro/qwen3.8-flash-next", tono: "ok" },
            { o: 'opencode run "Responde solo: hola"', c: "# prueba real con el modelo" },
            { s: "> build · qwen3.8-flash-next" },
            { s: "Hola", tono: "ok" },
          ]}
        />
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <Tarjeta titulo="Si se queda esperando" tono="ambar">
            <p>
              Si <C>opencode run</C> no responde, el servidor no contesta. Sal con <b>Ctrl+C</b> y revisa la URL y que estás
              en la red del centro.
            </p>
          </Tarjeta>
          <Anatomia
            etiqueta="Anatomía de la orden opencode run"
            partes={[
              { texto: "opencode", nombre: "programa", tono: "azul" },
              { texto: "run", nombre: "subcomando", tono: "morado" },
              { texto: '"Responde solo: hola"', nombre: "argumento", tono: "verde" },
            ]}
          />
        </div>
      </Paso>

      <Aviso titulo="¿Por qué variables y no la clave escrita?" tono="verde">
        <p>
          Porque así la clave no está en <b>ningún fichero</b>, y por tanto no puede acabar por accidente en un commit, en
          una captura o en un repo público. Es la misma regla que en tu proyecto: <i>ninguna clave en el repo ni en su
          historial</i> (es un mínimo del proyecto 2).
        </p>
        <p>
          En la semana 3, tu propia CLI leerá las <b>mismas variables</b> desde Python.
        </p>
      </Aviso>

      <Aviso titulo="Semipresencial: OpenCode en casa" tono="azul">
        <p>
          Puedes usar OpenCode en casa, también dentro de la terminal integrada de VS Code. Cómo conectarte desde casa a
          los modelos del centro lo explica el profesor en la <b>tutoría colectiva de arranque</b>.
        </p>
      </Aviso>

      {/* 5 · TUI */}
      <Paso
        id="tui"
        n={7}
        titulo="Abre OpenCode en tu proyecto"
        entradilla={
          <>
            <b>TUI</b> (<i>Text User Interface</i>) es una interfaz completa dentro de la terminal. Se abre entrando en la
            carpeta del proyecto y escribiendo <C>opencode</C>:
          </>
        }
      >
        <div className="max-w-xl">
          <Codigo code={`cd ~/cli-tareas\nopencode`} />
        </div>
      </Paso>

      <Bloque titulo="La pantalla de OpenCode" nivel={3}>
        <EsquemaTui />
      </Bloque>

      <Bloque titulo="Lo que puedes escribir en la caja" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="texto normal" nivel={4} mono tono="azul">
            <p>Tu petición, en español. Concreta: qué fichero, qué orden, qué criterio de «terminado».</p>
          </Tarjeta>
          <Tarjeta titulo="@fichero" nivel={4} mono tono="azul">
            <p>
              Adjunta un fichero (con búsqueda): <C>@src/tareas/cli.py</C>, o solo unas líneas:{" "}
              <C>@src/tareas/cli.py#20-45</C>.
            </p>
          </Tarjeta>
          <Tarjeta titulo="!orden" nivel={4} mono tono="azul">
            <p>
              Con <C>!</C> al principio de la caja vacía entras en modo shell: la orden se ejecuta en tu proyecto y su
              salida queda en la sesión. <b>Esc</b> para salir. Con <C>/</C> ves los comandos.
            </p>
          </Tarjeta>
        </div>
        <p className={`mt-5 mb-2 text-lg ${cls.texto}`}>Un ejemplo de primera petición en el agente plan:</p>
        <Prompt
          etiqueta="Prompt · agente plan"
          text={`Lee @AGENTS.md y @src/tareas/cli.py. Quiero añadir la orden «version» que muestre la versión de __init__.py. No cambies nada todavía: explícame en 5 líneas qué ficheros tocarías y cómo comprobaré que funciona.`}
        />
      </Bloque>

      <Bloque
        titulo="Atajos de teclado"
        nivel={3}
        entradilla={
          <>
            La <b>tecla líder</b> es <Teclas combo="ctrl+x" />: la pulsas, sueltas y pulsas la letra (por ejemplo{" "}
            <Teclas combo="ctrl+x u" /> = deshacer).
          </>
        }
      >
        <ul className="grid grid-cols-1 gap-x-6 gap-y-2 lg:grid-cols-2">
          {ATAJOS.map(([teclas, comando, para]) => (
            <li
              key={teclas}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-3 gap-y-1 border-b border-zinc-200 pb-2 dark:border-white/10 sm:grid-cols-[8.5rem_6rem_minmax(0,1fr)]"
            >
              <Teclas combo={teclas} />
              <code className="font-mono text-base font-bold text-blue-700 dark:text-blue-300">{comando}</code>
              <span className={`col-span-2 sm:col-span-1 ${cls.texto}`}>{para}</span>
            </li>
          ))}
        </ul>
      </Bloque>

      <Bloque titulo="Comandos de barra sin atajo" nivel={3} entradilla="Escribe / en la caja y aparece la lista entera.">
        <ul className="grid grid-cols-1 gap-x-6 gap-y-2 lg:grid-cols-2">
          {SIN_ATAJO.map(([comando, para]) => (
            <li
              key={comando}
              className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-baseline gap-2 border-b border-zinc-200 pb-2 dark:border-white/10"
            >
              <code className="font-mono text-base font-bold text-blue-700 dark:text-blue-300">{comando}</code>
              <span className={cls.texto}>{para}</span>
            </li>
          ))}
        </ul>
      </Bloque>

      <Bloque titulo="Una sesión por tarea" nivel={3}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Tarjeta titulo="Sesiones" nivel={4}>
            <p>
              Cada conversación es una <b>sesión</b> y se guarda. Abre una nueva para cada tarea (<C>/new</C>), recupera
              una anterior con <C>/sessions</C> o continúa la última desde la terminal con <C>opencode -c</C>.
            </p>
          </Tarjeta>
          <Tarjeta titulo="Compactar" nivel={4}>
            <p>
              <Teclas combo="ctrl+x c" /> resume la conversación para liberar contexto. OpenCode lo hace solo cuando se
              llena, pero hacerlo tú al cambiar de fase (o abrir <C>/new</C>) da mejores resultados: un modelo con menos
              ruido se equivoca menos.
            </p>
          </Tarjeta>
          <Tarjeta titulo="Exportar" nivel={4}>
            <p>
              <Teclas combo="ctrl+x x" /> exporta la sesión a tu editor. Útil para guardar el prompt clave y lo que
              respondió en <C>docs/prompts.md</C>, que forma parte de tu proceso evaluable.
            </p>
          </Tarjeta>
        </div>
      </Bloque>

      <Bloque
        titulo="/undo y /redo"
        nivel={3}
        entradilla={
          <>
            <C>/undo</C> deshace tu último mensaje y lo que hizo el agente después; tu mensaje vuelve a la caja para que lo
            corrijas. Se confirma al enviarlo: <C>/redo</C> antes de enviar lo cancela.
          </>
        }
      >
        <DosColumnas
          nivel={4}
          centro="pero"
          a={{
            titulo: "Deshace",
            tono: "verde",
            puntos: ["Tu último mensaje y sus respuestas.", "Los ficheros que cambió el agente desde entonces."],
          }}
          b={{
            titulo: "No deshace efectos externos",
            tono: "rosa",
            puntos: [
              "Un paquete instalado o una orden que tocó cosas fuera.",
              <>
                Un <C>git push</C>.
              </>,
              "Ficheros ignorados por git o de más de 2 MiB.",
            ],
          }}
        />
        <p className={`mt-4 ${cls.texto}`}>
          Funciona con <b>instantáneas internas</b>: <b>no hace commits</b> ni toca tu rama. Pero necesita que el proyecto{" "}
          <b>sea un repositorio git</b> (<C>git init</C>); los commits no hacen falta.
        </p>
      </Bloque>

      {/* 6 · Agentes */}
      <Bloque
        id="agentes"
        etiqueta="Agentes"
        titulo="Plan frente a build"
        entradilla={
          <>
            Un <b>agente</b> es una configuración del modelo: un prompt, unas herramientas y unos permisos. OpenCode trae
            varios, y puedes crear los tuyos. Los dos <b>primarios</b> son estos:
          </>
        }
      >
        <DosColumnas
          a={{
            antetitulo: "primario",
            titulo: "plan",
            tono: "morado",
            puntos: [
              "Para pensar: analizar, proponer, revisar un plan.",
              "No edita los ficheros del proyecto (solo sus propios planes).",
              "Ojo: sus órdenes siguen tus reglas de shell.",
            ],
          }}
          b={{
            antetitulo: "primario (por defecto)",
            titulo: "build",
            tono: "azul",
            puntos: ["Para hacer: editar, crear, ejecutar.", "Todas las herramientas, con los permisos de tu config."],
          }}
        />
        <p className={`mt-4 flex flex-wrap items-center gap-2 text-lg ${cls.texto}`}>
          <Teclas combo="shift+tab" /> alterna entre build y plan (mira la barra inferior).
        </p>
      </Bloque>

      <Aviso titulo="Plan solo bloquea ediciones" tono="ambar">
        <p>
          El agente plan de fábrica no escribe ficheros, pero sí ejecuta órdenes con tus permisos. Y si tu configuración
          dice <C>edit · * → ask</C>, esa regla le alcanza también a plan.
        </p>
        <p>
          Por eso el <C>opencode.json</C> del proyecto le añade a plan (y a explore) su propio <C>edit · * → deny</C>: las
          reglas de un agente van después de las generales y ganan. Compruébalo con <C>opencode debug agents</C>. Y lo que
          nunca debe pasar va en <b>policies</b>, que nadie deshace.
        </p>
      </Aviso>

      <Bloque titulo="Subagentes: general y explore" nivel={3}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Tarjeta titulo="general" nivel={4} mono tono="morado" antetitulo="subagente">
            <p>Investigación y tareas de varios pasos. Puede modificar ficheros, pero no lanzar otros subagentes.</p>
          </Tarjeta>
          <Tarjeta titulo="explore" nivel={4} mono tono="morado" antetitulo="subagente">
            <p>Solo busca y lee (no edita), aunque puede ejecutar órdenes. «¿Dónde se valida el JSON?»</p>
          </Tarjeta>
          <Tarjeta titulo="Cómo se invocan" nivel={4}>
            <p>
              Pídeselo con palabras: «Usa el subagente explore para buscar dónde se lee acciones.json». El agente también
              los lanza solo (herramienta <C>subagent</C>).
            </p>
          </Tarjeta>
        </div>
        <div className="mt-4">
          <Subagentes />
        </div>
      </Bloque>

      <Bloque
        titulo="Crea tus agentes"
        nivel={3}
        anchoJunto={700}
        junto={<Codigo code={REVISOR_MD} kind="md" etiqueta=".opencode/agents/revisor.md" />}
      >
        <div className="space-y-3">
          <p className={cls.texto}>
            Un fichero Markdown en <C>.opencode/agents/</C>: el nombre del fichero es el id del agente, el frontmatter su
            configuración (<C>description</C>, <C>mode: subagent</C>, <C>permissions</C>…) y el cuerpo, su prompt. Es el
            revisor de la semana 2.
          </p>
          <p className={cls.texto}>
            Se usa pidiéndoselo: «Usa el subagente revisor para revisar src/tareas/motor.py». No puede editar ni navegar por
            la web; solo mirar diffs e historial. Ojo: un subagente tuyo solo tiene <b>sus</b> permisos, no hereda los del
            agente que lo llama.
          </p>
        </div>
      </Bloque>

      {/* 7 · Permisos */}
      <Bloque
        id="permisos"
        titulo="Permisos"
        entradilla={
          <>
            De fábrica, OpenCode lo permite casi todo: edita y ejecuta órdenes sin preguntar. En el curso eso no vale. Cada
            herramienta (y cada orden de la terminal) acaba en una de tres respuestas:
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Permiso tipo="allow" texto="Lo hace sin preguntar." />
          <Permiso tipo="ask" texto="Se para, te enseña qué va a hacer y espera." />
          <Permiso tipo="deny" texto="Bloqueado. Ni lo intenta." />
        </div>
      </Bloque>

      <Bloque titulo="Qué pasa cuando quiere actuar" nivel={3}>
        <FlujoPermiso />
      </Bloque>

      <Bloque
        titulo="Anatomía de una regla"
        nivel={3}
        entradilla="En OpenCode 2 los permisos son una lista de reglas. Cada regla tiene tres partes:"
      >
        <Anatomia
          etiqueta="Anatomía de una regla de permisos"
          partes={[
            { texto: '{ "action": "shell",', nombre: "qué herramienta", tono: "morado" },
            { texto: '"resource": "git diff *",', nombre: "sobre qué", tono: "azul" },
            { texto: '"effect": "allow" }', nombre: "qué pasa", tono: "verde" },
          ]}
        />
        <p className={`mt-4 ${cls.texto}`}>
          El <C>*</C> significa «cualquier cosa»: <C>git diff *</C> vale para <C>git diff</C> y para <C>git diff src/</C>.
          Si ninguna regla coincide, OpenCode pregunta.
        </p>
      </Bloque>

      <Bloque
        titulo="Gana la última que coincide"
        nivel={3}
        entradilla={
          <>
            Las reglas se leen de arriba abajo y, si varias coinciden, <b>manda la última</b>. Por eso la general (
            <C>*</C>) va primero y las excepciones después.
          </>
        }
      >
        <TablaCoincidencias />
      </Bloque>

      <Bloque
        titulo="El opencode.json del proyecto"
        nivel={3}
        entradilla={
          <>
            Va en la <b>raíz de tu repo</b> (<C>cli-tareas/opencode.json</C>) y <b>se sube a git</b>: no lleva claves,
            solo reglas. Se fusiona con tu config global.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="1 · Ficheros" nivel={4} tono="azul">
            <p>Qué puede leer y editar, y qué hace con la web y con lo que está fuera del proyecto.</p>
          </Tarjeta>
          <Tarjeta titulo="2 · Órdenes" nivel={4} tono="morado">
            <p>Qué órdenes de terminal ejecuta solo y cuáles te pregunta.</p>
          </Tarjeta>
          <Tarjeta titulo="3 · Lo que nunca hará" nivel={4} tono="rosa">
            <p>Las políticas (policies), que solo pueden negar, y el freno de edición del agente plan.</p>
          </Tarjeta>
        </div>
        <p className={`mt-4 ${cls.texto}`}>Lo verás en tres trozos; el botón de cada uno copia el fichero entero.</p>
      </Bloque>

      <TrozoConfig titulo="Parte 1: ficheros" tituloReglas="Reglas para ficheros" parte={1} rango={[1, 10]} reglas={REGLAS_FICHEROS} />
      <TrozoConfig titulo="Parte 2: órdenes" tituloReglas="Reglas para órdenes" parte={2} rango={[11, 22]} reglas={REGLAS_ORDENES} />
      <TrozoConfig titulo="Parte 3: lo que nunca hará" parte={3} rango={[23, 33]} reglas={REGLAS_NUNCA} />

      <Aviso titulo="¿Por qué ejecutar no está permitido?" tono="ambar" icono={<IconoPermiso tipo="ask" tam={36} />}>
        <p>
          Porque <C>uv run tareas ejecutar …</C> <b>mueve, renombra o borra ficheros de verdad</b>. Si el agente se
          equivoca de carpeta, los daños son reales y <C>/undo</C> no los deshace.
        </p>
        <p>
          Esa orden siempre te pregunta, y tú la pruebas en <C>~/pruebas-tareas</C> con <C>--simular</C>. Y{" "}
          <C>git push</C> lo haces tú.
        </p>
      </Aviso>

      <Bloque
        titulo="La trampa al fusionar"
        nivel={3}
        entradilla={
          <>
            Las configuraciones (la base de OpenCode, la global, la del proyecto y la de cada agente) se <b>fusionan</b> en
            ese orden. Si la global dice <C>rm * → deny</C> y otra posterior dice <C>* → allow</C>, gana la última:{" "}
            <b>rm queda permitido</b>. Las políticas lo arreglan: van al final y solo pueden negar.
          </>
        }
      >
        <CapasFusion />
      </Bloque>

      <Aviso titulo="Nunca uses --auto" tono="rosa" icono={<IconoPermiso tipo="deny" tam={36} />}>
        <p>
          <C>opencode --auto</C> aprueba solo todo lo que no esté denegado expresamente. Es decir: <b>desactiva tu
          revisión</b>. Y responder <b>always</b> guarda la orden como regla allow del proyecto: úsalo solo con órdenes
          inofensivas.
        </p>
        <p>
          Un modelo que entiende mal una petición puede borrar, sobrescribir o ejecutar lo que no debe, y tú ni lo verás.
          En el curso está prohibido; en tu carpeta personal, también.
        </p>
      </Aviso>

      {/* 8 · AGENTS.md */}
      <Bloque
        id="agents-md"
        titulo="AGENTS.md: la memoria del proyecto"
        entradilla={
          <>
            El modelo no recuerda nada entre sesiones. <C>AGENTS.md</C> es un fichero Markdown en la raíz del proyecto que
            OpenCode <b>carga al empezar cada sesión</b>: qué es el proyecto, cómo se ejecuta, qué normas hay que
            respetar. Es un estándar: lo leen también otros agentes.
          </>
        }
      >
        <Codigo code={AGENTS_MD} kind="md" etiqueta="cli-tareas/AGENTS.md" />
      </Bloque>

      <Bloque titulo="Dónde vive cada fichero" nivel={3}>
        <DondeVive />
      </Bloque>

      <Bloque titulo="Créalo con /init y mejóralo" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tarjeta titulo="Créalo con /init" nivel={4}>
            <p>
              <C>/init</C> te guía: analiza el repo, puede hacerte alguna pregunta y crea (o mejora) el <C>AGENTS.md</C>.
              Después <b>lo editas tú</b>: quita lo que sobra, añade tus normas. Corto y concreto: se carga siempre y ocupa
              contexto.
            </p>
          </Tarjeta>
          <Tarjeta titulo="Cuando el agente repite un error" nivel={4} tono="azul">
            <p>
              Cada vez que el agente repita un error («otra vez ha usado os.system»), la solución no es repetírselo en
              cada sesión: es <b>añadir una línea a AGENTS.md</b> y hacer commit. Los cambios en AGENTS.md cuentan tu
              proceso.
            </p>
          </Tarjeta>
        </div>
      </Bloque>

      {/* 9 · Comandos */}
      <Bloque
        id="comandos"
        titulo="Comandos personalizados"
        entradilla={
          <>
            Si escribes el mismo tipo de prompt muchas veces, conviértelo en un <b>comando</b>: un fichero{" "}
            <C>.opencode/commands/&lt;nombre&gt;.md</C> que se lanza con <C>/nombre</C>.
          </>
        }
      >
        <Junto
          codigoAncho
          texto={
            <Tarjeta titulo="Piezas de un comando">
              <Lista
                items={[
                  <>
                    <b>Frontmatter</b>: <C>description</C> (lo que ves en la lista), <C>agent</C> (con qué agente se
                    ejecuta) y, si quieres, <C>model</C> o <C>subagent: true</C> (en una sesión hija).
                  </>,
                  <>
                    <C>$ARGUMENTS</C>: todo lo que escribes detrás del comando. <C>$1</C>, <C>$2</C>…: cada argumento por
                    separado (entre comillas si lleva espacios).
                  </>,
                  <>
                    <C>!`orden`</C>: mete la salida de la orden en el prompt. Se ejecuta fuera de tus permisos: solo
                    órdenes de confianza.
                  </>,
                  <>
                    Un <C>@fichero</C> dentro del comando no se adjunta: adjúntalo en la caja al lanzarlo.
                  </>,
                ]}
              />
            </Tarjeta>
          }
          codigo={<Codigo code={NUEVA_ACCION_MD} kind="md" etiqueta=".opencode/commands/nueva-accion.md" />}
        />
      </Bloque>

      <Bloque titulo="Así se usa /nueva-accion" nivel={3} entradilla="En la semana 2, para añadir una acción a tu herramienta:">
        <Prompt
          etiqueta="Caja de entrada de OpenCode"
          text={`/nueva-accion renombrar-capturas "Renombra las capturas de pantalla con su fecha y un contador"`}
        />
        <div className="mt-5">
          <Anatomia
            etiqueta="Partes del comando /nueva-accion"
            partes={[
              { texto: "/nueva-accion", nombre: "el comando", tono: "azul" },
              { texto: "renombrar-capturas", nombre: "$1", tono: "morado" },
              { texto: '"Renombra las capturas de pantalla con su fecha y un contador"', nombre: "$2", tono: "verde" },
            ]}
          />
        </div>
        <p className={`mt-4 ${cls.texto}`}>
          <C>$ARGUMENTS</C> es todo lo que va detrás del comando: aquí, <C>$1</C> y <C>$2</C> juntos.
        </p>
      </Bloque>

      {/* 10 · Skills */}
      <Bloque
        id="skills"
        titulo="Skills: conocimiento bajo demanda"
        entradilla={
          <>
            Una <b>skill</b> es un paquete de conocimiento que el agente <b>carga solo cuando lo necesita</b>. Ve una lista
            con el id y la descripción de cada skill; si una le sirve, la carga con la herramienta <C>skill</C> y lee el
            contenido completo. Así no gasta contexto en lo que no toca. Tú también puedes cargarla escribiendo{" "}
            <C>@id</C>.
          </>
        }
      >
        <Tarjeta titulo="Dónde y cómo">
          <ul className="grid list-disc grid-cols-1 gap-x-8 gap-y-2 pl-5 marker:text-zinc-400 lg:grid-cols-2">
            <li>
              Una carpeta por skill: <C>.opencode/skills/&lt;id&gt;/SKILL.md</C>.
            </li>
            <li>
              El <b>id</b> es el nombre de la carpeta; <C>name</C> es solo una etiqueta.
            </li>
            <li>
              <C>description</C>: imprescindible. Di <b>qué hace y cuándo usarla</b>: sin ella el agente ni la ve.
            </li>
            <li>
              Compruébalo con <C>/skills</C> en la TUI; para forzar que la cargue, <C>@acciones-json</C>.
            </li>
          </ul>
        </Tarjeta>
      </Bloque>

      <Bloque titulo="La skill acciones-json" nivel={3}>
        <Codigo code={SKILL_MD} kind="md" etiqueta=".opencode/skills/acciones-json/SKILL.md" />
      </Bloque>

      <Bloque titulo="¿AGENTS.md, skill o comando?" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {COMPARA.map((c) => (
            <div key={c.titulo} className={`min-w-0 rounded-2xl border-2 bg-white p-5 dark:bg-slate-900 ${TONO[c.tono].linea}`}>
              <h4 className={`font-mono text-2xl font-extrabold ${TONO[c.tono].texto}`}>{c.titulo}</h4>
              <dl className="mt-2 space-y-1.5">
                {COMPARA_FILAS.map((f, i) => (
                  <div key={f}>
                    <dt className="text-base font-bold text-zinc-600 dark:text-zinc-400">{f}</dt>
                    <dd className="text-base text-zinc-900 dark:text-zinc-100">{c.valores[i]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <p className={`mt-4 text-lg ${cls.texto}`}>
          Regla rápida: lo que debe saber <b>siempre</b> → AGENTS.md; lo que debe saber <b>a veces</b> → skill; lo que{" "}
          <b>tú pides</b> a menudo → comando. Y los tres se suben a git.
        </p>
      </Bloque>

      <Bloque titulo="Cuándo entra cada cosa en el contexto" nivel={3}>
        <CuandoSeCarga />
      </Bloque>

      {/* 11 · MCP */}
      <Bloque
        id="mcp"
        titulo="MCP: enchufes para herramientas externas"
        entradilla={
          <>
            El <b>Model Context Protocol</b> (MCP) es un estándar para conectar un agente con <b>herramientas de fuera</b>:
            documentación actualizada de librerías, un navegador, una base de datos… Cada <b>servidor MCP</b> es un enchufe
            que añade herramientas nuevas (se llaman <C>servidor_herramienta</C>). OpenCode es el cliente; tú decides qué
            enchufas.
          </>
        }
        anchoJunto={600}
        junto={<Codigo code={MCP_JSON} kind="json" etiqueta="opencode.json (bloque mcp)" />}
      />

      <Bloque titulo="remote frente a local" nivel={3}>
        <DosColumnas
          nivel={4}
          a={{
            antetitulo: "Servidor en Internet",
            titulo: "remote",
            tono: "azul",
            puntos: [
              <>
                Lleva <C>url</C> (y si hace falta, <C>headers</C>).
              </>,
            ],
          }}
          b={{
            antetitulo: "Programa en tu equipo",
            titulo: "local",
            tono: "morado",
            puntos: [
              <>
                <C>command</C> es un <b>array</b> (<C>[&quot;npx&quot;, &quot;-y&quot;, …]</C>), nunca una cadena: si no,
                no arranca.
              </>,
            ],
          }}
        />
        <ul className={`mt-4 list-disc space-y-1.5 pl-5 marker:text-zinc-400 ${cls.texto}`}>
          <li>
            Cada servidor va dentro de <C>mcp.servers</C>. <C>disabled: true</C>: definido pero apagado; lo enciendes
            cuando lo necesitas.
          </li>
          <li>
            <C>opencode mcp list</C>: estado de cada servidor. En la TUI, <C>/mcps</C> los conecta o desconecta (sin tocar
            la config).
          </li>
        </ul>
      </Bloque>

      <Bloque titulo="MCP: contexto y riesgos" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className={`rounded-2xl border p-5 ${TONO.ambar.caja}`}>
            <h4 className={`text-xl font-bold ${TONO.ambar.tinta}`}>Gastan contexto</h4>
            <p className={`mt-2 text-base leading-relaxed ${TONO.ambar.tinta}`}>
              Cada servidor conectado añade la descripción de <b>todas</b> sus herramientas al contexto. Dos o tres MCP
              pueden comerse buena parte y hacer que el agente use peor sus herramientas. Por eso context7 va con{" "}
              <C>disabled: true</C> y se enciende solo cuando hace falta (semana 3).
            </p>
          </div>
          <div className={`rounded-2xl border p-5 ${TONO.rosa.caja}`}>
            <h4 className={`text-xl font-bold ${TONO.rosa.tinta}`}>Riesgos</h4>
            <p className={`mt-2 text-base leading-relaxed ${TONO.rosa.tinta}`}>
              Un MCP local ejecuta código con tus permisos; uno remoto recibe lo que el agente le envía. Solo servidores
              conocidos y de confianza, y si piden token, nunca en claro:{" "}
              <C>{'"headers": { "Authorization": "Bearer {env:DOCS_API_KEY}" }'}</C>.
            </p>
          </div>
        </div>
        <p className={`mt-4 ${cls.texto}`}>
          Detalle: <C>opencode mcp add</C> lo añade al proyecto; con <C>--global</C>, a todos tus proyectos.
        </p>
      </Bloque>

      {/* 12 · Flujo */}
      <Bloque
        id="flujo"
        titulo="El flujo de trabajo del curso"
        entradilla="El mismo en todas las sesiones. Si te saltas un paso, lo notarás (y se notará en tus commits)."
      >
        <QuienHace />
      </Bloque>

      <Bloque titulo="El flujo, paso a paso" nivel={3}>
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FLUJO.map((p, i) => (
            <li key={p.titulo} className={`${cls.tarjeta} flex flex-col !p-4`}>
              <div className="flex items-center justify-between">
                <span aria-hidden className="text-3xl font-extrabold text-blue-700 dark:text-blue-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Chip tono={QUIEN[p.quien]}>{p.quien}</Chip>
              </div>
              <h4 className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-100">{p.titulo}</h4>
              <p className={`mt-1 flex-1 ${cls.texto}`}>{p.texto}</p>
              <code className="mt-2 w-fit rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-base text-zinc-800 dark:bg-white/10 dark:text-zinc-200">
                {p.ej}
              </code>
            </li>
          ))}
        </ol>
      </Bloque>

      <Bloque titulo="Buenas prácticas con modelos locales" nivel={3}>
        <ul className={`grid grid-cols-1 gap-x-8 gap-y-3 lg:grid-cols-2 ${cls.texto}`}>
          {[
            <><b>Tareas pequeñas</b>: una orden, una función, un error. Nunca «hazme la CLI entera».</>,
            <><b>Una sesión por tarea</b> (<C>/new</C>): menos ruido, menos errores.</>,
            <><b>Plan antes de build</b>: corregir un plan cuesta segundos; corregir código, horas.</>,
            <><b>Lee cada diff</b> antes de aceptarlo. Si no lo entiendes, pregunta antes de aceptar.</>,
            <>Adjunta solo los ficheros necesarios con <C>@</C>, no «lee todo el proyecto».</>,
            <>Compacta (<C>ctrl+x c</C>) cuando la conversación se alargue.</>,
            <><b>Commits pequeños hechos por ti</b>, con mensajes que cuentan el paso.</>,
            <><b>Guarda tus prompts</b> clave en <C>docs/prompts.md</C> (o exporta la sesión).</>,
          ].map((x, i) => (
            <li key={i} className="flex gap-3">
              <IconoPermiso tipo="allow" tam={24} />
              <span>{x}</span>
            </li>
          ))}
        </ul>
      </Bloque>

      <Bloque titulo="Seguridad" nivel={3}>
        <ul className={`grid grid-cols-1 gap-x-8 gap-y-3 lg:grid-cols-2 ${cls.texto}`}>
          {[
            <><b>Secretos</b>: las claves solo en variables de entorno. Nunca en el código, en <C>opencode.json</C> ni en el chat.</>,
            <><C>.env</C> en el <C>.gitignore</C> <b>antes</b> del primer commit; el agente tiene prohibido leerlo.</>,
            <><b>Permisos</b> del proyecto siempre activos: edición y órdenes en ask; <C>rm</C>, <C>sudo</C> y <C>git push</C> en policies.</>,
            <><b>Nunca <C>--auto</C></b>, y <b>always</b> solo para órdenes inofensivas.</>,
            <><b>Nunca en carpetas reales</b>: las acciones de tu CLI se prueban en <C>~/pruebas-tareas</C> y con <C>--simular</C>.</>,
            <>No abras OpenCode en tu carpeta personal (<C>~</C>): ábrelo dentro del proyecto.</>,
          ].map((x, i) => (
            <li key={i} className="flex gap-3">
              <IconoPermiso tipo="deny" tam={24} />
              <span>{x}</span>
            </li>
          ))}
        </ul>
      </Bloque>

      {/* 13 · Ruta */}
      <Bloque
        id="ruta"
        titulo="Tu ruta con OpenCode en el curso"
        entradilla="No se aprende todo el primer día. Cada semana del proyecto 2 añade una pieza. En semipresencial, las semanas 1 y 2 son la quincena 3 y las semanas 3 y 4, la quincena 4."
      >
        <LineaTiempo hitos={RUTA} />
      </Bloque>

      <Bloque titulo="Más adelante en el curso" nivel={3}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Plugins", "Código que amplía OpenCode o reacciona a lo que hace el agente: por ejemplo, impedir que lea ciertos ficheros."],
            ["opencode run en scripts", "Sin interfaz: un script o la CI le pasa una tarea. Siempre con permisos exactos y con un tiempo máximo, por si el servidor no responde."],
            ["opencode mini", "Una interfaz mínima en la terminal, para tareas rápidas sin la pantalla completa."],
            ["Escritorio y web", "El mismo agente con otra cara: OpenCode también tiene app de escritorio y versión web."],
          ].map(([t, d]) => (
            <Tarjeta key={t} titulo={t} nivel={4} suave>
              <p>{d}</p>
            </Tarjeta>
          ))}
        </div>
      </Bloque>

      {/* 14 · Errores */}
      <Bloque
        id="errores"
        titulo="Errores típicos y soluciones"
        entradilla="Antes de pedir ayuda, busca aquí el síntoma. Para diagnosticar casi todo:"
      >
        <div className="max-w-3xl">
          <Codigo
            code={`opencode --version        # qué versión tienes\nopencode debug paths      # dónde están la config, los datos y los logs\nopencode debug config     # qué ficheros de config ha leído\nopencode debug agents     # permisos efectivos de cada agente\nopencode mcp list         # estado de los MCP`}
            etiqueta="Diagnóstico"
          />
        </div>
      </Bloque>

      {ERRORES.map((g) => (
        <Bloque key={g.titulo} titulo={g.titulo} nivel={3}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {g.items.map(([s, c, sol]) => (
              <div key={s} className={`${cls.tarjeta} min-w-0`}>
                <h4 className="text-lg font-bold text-zinc-900 [overflow-wrap:anywhere] dark:text-zinc-50">{s}</h4>
                <dl className="mt-2 space-y-2">
                  <div>
                    <dt className="text-base font-bold text-amber-700 dark:text-amber-300">Causa probable</dt>
                    <dd className={cls.texto}>{c}</dd>
                  </div>
                  <div>
                    <dt className="text-base font-bold text-emerald-700 dark:text-emerald-300">Solución</dt>
                    <dd className={cls.texto}>{sol}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </Bloque>
      ))}

      {/* 15 · Enlaces */}
      <Bloque id="enlaces" titulo="Enlaces">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/programacion-ia/cli/", "Proyecto 2 · CLI tareas", "El proyecto en el que estrenas OpenCode."],
            ["/programacion-ia/presencial/", "Grupo presencial", "Horario, proyectos y avisos del grupo."],
            ["/programacion-ia/semipresencial/", "Grupo semipresencial", "Quincenas, tutorías y entregas."],
            ["/programacion-ia/acceso/", "Acceso al aula", "Campus: entregas, rúbricas y notas."],
          ].map(([href, t, d]) => (
            <Link
              key={href}
              href={href}
              className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-900 dark:hover:border-blue-500/50"
            >
              <span className="block text-xl font-bold text-zinc-900 dark:text-zinc-100">{t} →</span>
              <span className={`mt-1 block ${cls.texto}`}>{d}</span>
            </Link>
          ))}
        </div>
        <p className={`mt-5 ${cls.texto}`}>
          Documentación oficial:{" "}
          <a href="https://opencode.ai/v2/docs" target="_blank" rel="noopener noreferrer" className={cls.enlace}>
            opencode.ai/v2/docs
          </a>
          . Si un tutorial usa <C>permission</C>, <C>agent</C> o <C>bash</C> en singular, es de OpenCode 1: la 2 todavía lo
          entiende, pero aquí escribimos la sintaxis nueva.
        </p>
      </Bloque>
    </div>
  );
}
