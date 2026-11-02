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

export const metadata: Metadata = {
  title: "OpenCode: tu agente de programación — Curso de Programación con IA",
  description:
    "Guía de OpenCode 1.18.35 para el curso: instalación, conexión a los modelos del centro, agentes, permisos, AGENTS.md, comandos, skills y MCP.",
};

// Página pensada para grabarse (docs/paginas-para-video.md): cada <Bloque> es
// una pantalla de 16:9 con una sola idea, los pasos se titulan «Paso N · …» y
// todo lo que cuenta cada pieza está escrito, sin pulsar ni pasar el ratón.

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
      ["bash", "Ejecuta una orden en la terminal: uv run, git status, ls…", "La más potente y la más peligrosa: por eso pregunta."],
    ],
  },
  {
    grupo: "Para organizarse",
    tono: "verde",
    items: [
      ["task", "Lanza un subagente (general, explore o uno tuyo) para una subtarea.", "Trabaja en una sesión hija y te devuelve un resumen."],
      ["todowrite", "Mantiene una lista de pasos pendientes y hechos.", "Verás la lista tachándose mientras trabaja."],
      ["skill", "Carga una skill (conocimiento extra) cuando la necesita.", "Solo carga la que le sirve, no todas."],
      ["question", "Te hace una pregunta con opciones cuando duda.", "Respóndela: es mejor que dejarle adivinar."],
    ],
  },
];

// [teclas (alternativas), comando, para qué]
const ATAJOS: [string[], string, string][] = [
  [["Tab", "Shift+Tab"], "", "Cambia de agente primario: build ↔ plan"],
  [["Esc"], "", "Interrumpe la respuesta en curso"],
  [["ctrl+p"], "", "Paleta con todos los comandos"],
  [["ctrl+x n"], "/new", "Sesión nueva (una por tarea)"],
  [["ctrl+x l"], "/sessions", "Lista de sesiones para retomar una"],
  [["ctrl+x m"], "/models", "Elegir modelo"],
  [["ctrl+x c"], "/compact", "Resume la conversación para liberar contexto"],
  [["ctrl+x u"], "/undo", "Deshace tu último mensaje, sus respuestas y sus cambios en ficheros"],
  [["ctrl+x r"], "/redo", "Rehace lo deshecho"],
  [["ctrl+x x"], "/export", "Exporta la conversación a Markdown"],
  [["ctrl+c"], "/exit", "Salir"],
  [[], "/init", "Crea o mejora el AGENTS.md del proyecto"],
  [[], "/review", "Revisa los cambios sin commit (o un commit o rama)"],
  [[], "/skills", "Explora las skills que ve el agente"],
  [[], "/mcps", "Servidores MCP; espacio los activa o desactiva"],
  [[], "/help", "Ayuda"],
];

const REGLAS_FICHEROS: [TipoPermiso, string, string][] = [
  ["ask", '"edit": "ask"', "Cada edición o fichero nuevo te enseña el diff y espera tu sí. En la semana 1 es obligatorio: lees todo lo que entra en tu repo."],
  ["ask", '"webfetch": "ask"', "Si quiere leer una web, pregunta. Así sabes de dónde saca la información."],
  ["ask", '"external_directory": "ask"', "Nada fuera de la carpeta del proyecto sin preguntar (tu carpeta personal, otras prácticas…)."],
  ["allow", '"read": { "*": "allow", … }', "Puede leer cualquier fichero del proyecto sin preguntar…"],
  ["deny", '"*.env": "deny", "*.env.*": "deny"', "…salvo los .env con claves: esos ni los ve. Va DESPUÉS del \"*\" porque gana la última que coincide."],
  ["allow", '"*.env.example": "allow"', "La plantilla sin claves sí puede leerla (va al final para volver a permitirla)."],
];

const REGLAS_ORDENES: [TipoPermiso, string, string][] = [
  ["ask", '"bash": { "*": "ask", … }', "Regla general: cualquier orden pregunta. Es la primera para que las demás la puedan matizar."],
  ["allow", '"ls *", "pwd", "cat *"', "Mirar carpetas y ficheros no rompe nada: allow."],
  ["allow", '"git status *", "git diff *", "git log *"', "Consultar git tampoco: allow. El agente puede ver qué ha cambiado."],
  ["allow", '"uv run tareas --help", "uv run tareas validar *"', "Probar la ayuda y validar acciones.json es inofensivo: allow."],
  ["allow", '"uv run pytest *"', "Pasar las pruebas (semana 4): allow."],
  ["ask", '"git commit *": "ask"', "Los commits los haces tú; si te lo propone, te pregunta (y normalmente dirás que no)."],
  ["deny", '"git push *", "git reset *": "deny"', "Subir o reescribir historia: nunca el agente."],
  ["deny", '"rm *", "sudo *": "deny"', "Borrar ficheros o usar permisos de administrador: prohibido. Al final del bloque, para que nada los pise."],
  ["deny", '"agent": { "plan": … }', "Al agente plan le quita editar; sus órdenes siguen tus reglas de bash (explicado en Agentes)."],
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
      "El agente (herramienta skill)",
      "Solo nombre y descripción hasta que se usa",
      "Reglas del esquema de acciones.json",
      ".opencode/skills/<nombre>/SKILL.md",
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
  { quien: "Plan", titulo: "Pide un plan", texto: "Tab a plan: «explícame cómo lo harías y qué ficheros tocarías». Lo lees y lo corriges.", ej: "Tab → plan" },
  { quien: "Build", titulo: "Que lo haga", texto: "Tab a build: «hazlo». Apruebas cada edición y cada orden leyendo el diff.", ej: "Tab → build" },
  { quien: "Tú", titulo: "Audita", texto: "Lee el código y prueba en ~/pruebas-tareas con --simular y casos feos. Si sale mal: /undo o le explicas el fallo.", ej: "!uv run tareas …" },
  { quien: "Tú", titulo: "Commit pequeño", texto: "git add + git commit con un mensaje que cuenta el paso. Guarda el prompt clave en docs/prompts.md (o /export).", ej: "git commit" },
  { quien: "Tú", titulo: "Sesión nueva", texto: "Una sesión por tarea (/new) y /compact si la conversación se alarga.", ej: "/new" },
];

const QUIEN: Record<"Tú" | "Plan" | "Build", Tono> = { Tú: "verde", Plan: "morado", Build: "azul" };

const RUTA: Hito[] = [
  {
    titulo: "Semana 1",
    fecha: "26-30 oct",
    enlace: { texto: "Sesión 1 · Arranque", href: "/programacion-ia/cli/sesion-01/" },
    puntos: [
      "Instalar la 1.18.35 y conectarla con los modelos del centro.",
      "Antes de abrir OpenCode, a mano: uv init, .gitignore y primer commit (sin git no hay /undo).",
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
      "Subagente revisor (@revisor) y /review antes de cada commit.",
    ],
  },
  {
    titulo: "Semana 3",
    fecha: "avance",
    futuro: true,
    puntos: [
      "MCP: context7 para documentación de librerías, desactivado por defecto y activado solo cuando hace falta.",
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
      ["opencode: command not found (o «no se reconoce» en Windows)", "La terminal se abrió antes de instalar y no tiene el PATH nuevo; o la instalación de npm no está en el PATH.", "Cierra y abre la terminal. Linux/macOS: el script instala en ~/.opencode/bin. Windows: comprueba npm install -g y abre una terminal nueva."],
      ["opencode --version no dice 1.18.35", "Lo instalaste con brew, pacman u otro gestor que trae OpenCode 2, o se actualizó.", "Desinstala esa versión e instala con el script o npm fijando 1.18.35; deja \"autoupdate\": false."],
      ["En Linux no puedo copiar ni pegar", "Falta la utilidad de portapapeles.", "xclip o xsel (X11), wl-clipboard (Wayland)."],
    ],
  },
  {
    titulo: "Errores al conectar",
    items: [
      ["opencode models centro no muestra nada", "La config no está en ~/.config/opencode/opencode.json, el JSON tiene un error o el id del proveedor no es centro.", "opencode debug config para ver qué config lee; revisa la ruta y el nombre."],
      ["opencode run se queda reintentando sin fin", "El servidor no responde: URL mal escrita, falta /v1, no estás en la red del centro o el servidor está caído.", "Ctrl+C. Revisa CENTRO_IA_URL (termina en /v1) y que estás en la red del aula; si sigue, avisa al profesor."],
      ["Error 401/403 o «clave no válida»", "La variable no existe en esa terminal: {env:VAR} se sustituye por una cadena vacía. Falta export, o la terminal es anterior al setx.", "echo $CENTRO_IA_KEY (bash) o echo $env:CENTRO_IA_KEY (PowerShell). Si sale vacío: export en ~/.bashrc o setx, y terminal NUEVA."],
    ],
  },
  {
    titulo: "Errores de configuración",
    items: [
      ["Expected array, got \"npx …\" mcp.x.command y no arranca", "El command de un MCP local está escrito como cadena.", "\"command\": [\"npx\", \"-y\", \"paquete\"]: siempre un array."],
      ["bad file reference: \"{file:…}\" … does not exist", "Usas {file:…} apuntando a un fichero que no existe: OpenCode se niega a arrancar.", "Crea el fichero o corrige la ruta. En el curso usamos {env:…}, no {file:…}."],
      ["V2 permissions are not supported by OpenCode V1", "Has copiado configuración de OpenCode 2 (\"permissions\" en plural).", "Claves en singular: permission, agent, provider, command, mcp."],
      ["Mis agentes o proveedores no aparecen", "Están bajo \"agents\" o \"providers\" (claves V2): la 1.18 las ignora sin avisar.", "Renómbralas a agent y provider."],
    ],
  },
  {
    titulo: "Errores mientras trabajas",
    items: [
      ["He cambiado la config y no hace caso", "La configuración no se recarga en caliente.", "Sal de OpenCode y vuelve a abrirlo."],
      ["/undo no revierte los ficheros", "El proyecto no es un repositorio git (o no tiene commits).", "git init, git add y un primer commit antes de abrir OpenCode."],
      ["Se ejecutó algo que creía prohibido", "Una regla \"*\": \"allow\" posterior (otra config o el agente) gana a tu deny.", "Pon los deny al final del bloque; compruébalo con opencode debug agent build."],
    ],
  },
  {
    titulo: "Errores con el agente",
    items: [
      ["Una skill no aparece en /skills", "name distinto de la carpeta, sin description, o frontmatter mal escrito.", "opencode debug skill y revisa el frontmatter."],
      ["Pregunta permiso para todo", "bash con \"*\": \"ask\" y pocas excepciones.", "Es lo esperado al principio. Añade allow solo para órdenes seguras, o responde always en la sesión."],
      ["Respuestas cortadas o «context length exceeded»", "Conversación muy larga o demasiados MCP y skills cargados.", "/compact o /new; desactiva los MCP que no uses."],
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Textos de configuración                                             */
/* ------------------------------------------------------------------ */

const CONFIG_GLOBAL = String.raw`
{
  "$schema": "https://opencode.ai/config.json",
  "autoupdate": false,
  "provider": {
    "centro": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "IA del centro",
      "options": {
        "baseURL": "{env:CENTRO_IA_URL}",
        "apiKey": "{env:CENTRO_IA_KEY}"
      },
      "models": {
        "qwen3.8-flash-next": {
          "name": "Qwen 3.8 Flash-Next (centro)",
          "limit": { "context": 524288, "output": 65536 },
          "tool_call": true
        }
      }
    }
  },
  "model": "centro/qwen3.8-flash-next",
  "small_model": "centro/qwen3.8-flash-next"
}
`;

// Las reglas van agrupadas por línea igual que en «Reglas para ficheros» y
// «Reglas para órdenes»: cada línea del fichero es una fila de esas listas.
const CONFIG_PROYECTO = String.raw`
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "edit": "ask",
    "webfetch": "ask",
    "external_directory": "ask",
    "read": { "*": "allow", "*.env": "deny", "*.env.*": "deny",
              "*.env.example": "allow" },
    "bash": {
      "*": "ask",
      "ls *": "allow", "pwd": "allow", "cat *": "allow",
      "git status *": "allow", "git diff *": "allow", "git log *": "allow",
      "uv run tareas --help": "allow", "uv run tareas validar *": "allow",
      "uv run pytest *": "allow",
      "git commit *": "ask",
      "git push *": "deny", "git reset *": "deny",
      "rm *": "deny", "sudo *": "deny"
    }
  },
  "agent": {
    "plan": { "permission": { "edit": "deny" } }
  }
}
`;

const AGENTS_MD = String.raw`
# tareas · CLI de tareas con ficheros (proyecto de 1º DAM)
## Stack y órdenes
- Python 3.12 + Typer + Rich, gestionado con uv (src layout, paquete src/tareas).
- Ejecutar: ` + "`uv run tareas --help`" + String.raw` · Validar config: ` + "`uv run tareas validar`" + String.raw` · Pruebas (semana 4): ` + "`uv run pytest`" + String.raw`.
## Normas
- Mensajes y comentarios en español; código claro antes que listo.
- pathlib siempre, encoding="utf-8", nada de os.system ni shell=True: tiene que funcionar en Linux, Windows y macOS.
- Nunca ejecutes acciones sobre carpetas reales: solo en ~/pruebas-tareas y con --simular.
- No toques .env ni escribas claves en ningún fichero. No hagas git push ni commits: los hace el alumno.
- Antes de cambiar un fichero, explica en 2-3 líneas qué vas a hacer.
`;

const REVISOR_MD = String.raw`
---
description: Revisa el código de la CLI tareas sin modificar nada y señala errores, casos feos y problemas multiplataforma
mode: subagent
temperature: 0.1
permission:
  edit: deny
  webfetch: deny
  bash:
    "*": deny
    "git diff *": allow
    "git log *": allow
    "git status *": allow
---
Eres el revisor de código del proyecto (1º DAM). Revisa lo que te indiquen y responde en español con:
1. Errores seguros (con fichero y línea).
2. Casos feos sin cubrir: ruta inexistente, carpeta vacía, nombres con tildes o espacios, JSON roto, destino que ya existe.
3. Problemas en Windows/macOS (rutas, encoding, shell).
4. Una pregunta que el alumno debería saber responder sobre ese código.
No reescribas el código: señala y explica.
`;

const NUEVA_ACCION_MD = String.raw`
---
description: Añade una acción nueva a acciones.json y, si hace falta, el código que la soporta
agent: build
---
Quiero añadir la acción: $ARGUMENTS
1. Carga la skill acciones-json.
2. Propón primero la entrada JSON y espera mi visto bueno.
3. Si el tipo ya existe, solo edita acciones.json. Si no, añade la clase en src/tareas/acciones.py siguiendo el patrón de las demás.
4. Termina ejecutando ` + "`uv run tareas validar`" + String.raw` y dime qué orden con --simular debo probar yo.
Estado actual del repo:
!` + "`git status --short`";

const SKILL_MD = String.raw`
---
name: acciones-json
description: Reglas del fichero acciones.json de la CLI tareas (campos, tipos, filtros, plantillas y validación). Úsala siempre que crees o cambies acciones o el código que las lee (config.py, acciones.py, motor.py).
---
# Esquema de acciones.json
- Raíz: {"version": 1, "acciones": [...]}. Cada acción: nombre (único, minúsculas-con-guiones), descripcion, tipo.
- Tipos: mover y copiar (requieren destino), renombrar (requiere plantilla), borrar (siempre pide confirmación salvo --si).
- filtro opcional: extensiones (lista, en minúsculas), patron (regex válida), mas_antiguo_que_dias, mayor_que_mb.
- plantilla: huecos {fecha:%Y-%m-%d}, {n:03}, {ext}, {nombre}.
## Reglas al programar
- Valida el JSON en config.py ANTES de ejecutar; errores con AccionNoValida(accion, campo, motivo).
- pathlib y shutil; encoding="utf-8"; nunca shell=True; nunca sobrescribir (destino_libre).
- Toda acción admite --simular y devuelve list[Resultado].
- Si añades un campo o un tipo nuevo, documéntalo en el README y en esta skill.
`;

const MCP_JSON = String.raw`
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp",
      "enabled": false
    },
    "apuntes": {
      "type": "local",
      "command": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "./docs"],
      "enabled": false
    }
  }
}
`;

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
              <span className="text-zinc-400">tab agentes · ctrl+p comandos</span>
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
  ['"*": ask', "ask"],
  ['"git diff *": allow', "allow"],
  ['"rm *": deny', "deny"],
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

/** Reglas que coinciden con una orden: gana la última. */
function Coincidencias({
  orden,
  reglas,
  resultado,
  pie,
}: {
  orden: string;
  reglas: { patron: string; accion: TipoPermiso; coincide: boolean; origen?: string }[];
  resultado: TipoPermiso;
  pie?: ReactNode;
}) {
  const ganadora = reglas.map((r) => r.coincide).lastIndexOf(true);
  return (
    <div className={cls.tarjeta}>
      <p className="font-mono text-lg text-zinc-600 dark:text-zinc-400">
        orden: <span className="font-bold text-zinc-900 dark:text-zinc-50">{orden}</span>
      </p>
      <ol className="mt-3 space-y-2 font-mono text-base">
        {reglas.map((r, i) => (
          <li
            key={r.patron + i}
            className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-1.5 ${
              i === ganadora
                ? "border-blue-500 bg-blue-50 text-zinc-900 dark:border-blue-400 dark:bg-blue-500/15 dark:text-zinc-50"
                : r.coincide
                  ? "border-zinc-300 text-zinc-800 dark:border-white/20 dark:text-zinc-200"
                  : "border-dashed border-zinc-300 text-zinc-500 dark:border-white/15 dark:text-zinc-400"
            }`}
          >
            <span>
              {r.origen ? <span className="font-sans text-zinc-600 dark:text-zinc-400">{r.origen} · </span> : null}
              &quot;{r.patron}&quot;: {r.accion}
            </span>
            <span className="shrink-0 font-sans font-bold">{i === ganadora ? "gana ✓" : r.coincide ? "coincide" : "no coincide"}</span>
          </li>
        ))}
      </ol>
      <p className={`mt-3 flex items-center gap-2 ${cls.texto}`}>
        Resultado: <IconoPermiso tipo={resultado} tam={24} /> <b className="font-mono">{resultado}</b>
      </p>
      {pie ? <p className={`mt-2 ${cls.texto}`}>{pie}</p> : null}
    </div>
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
            ["OpenCode 1.18.35", "la versión de clase"],
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
            Son las que tiene el agente <b>build</b> en la versión de clase. Los permisos (más abajo) deciden cuáles usa
            solo, cuáles te pregunta y cuáles tiene prohibidas.
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

      <Bloque
        titulo="Ojo con la versión"
        nivel={3}
        entradilla={
          <>
            En clase usamos <b>OpenCode 1.18.35</b> (la línea OpenCode 1). Existe ya <b>OpenCode 2</b>, que cambia la
            configuración.
          </>
        }
      >
        <DosColumnas
          nivel={4}
          centro="no es lo mismo que"
          a={{
            antetitulo: "En clase",
            titulo: "OpenCode 1.18.35",
            tono: "verde",
            puntos: [
              <>
                Claves en singular: <C>permission</C>, <C>agent</C>, <C>provider</C>, <C>command</C>, <C>mcp</C>.
              </>,
              <>
                Si tu editor marca las claves en singular como <i>deprecated</i>, ignóralo: el esquema publicado ya es el
                de la V2.
              </>,
            ],
          }}
          b={{
            antetitulo: "No la uses",
            titulo: "OpenCode 2",
            tono: "rosa",
            puntos: [
              <>
                Claves en plural (<C>permissions</C>, <C>agents</C>, <C>providers</C>) que la 1.18 no entiende.
              </>,
              <>
                Si un tutorial habla de <C>permissions</C> o <C>agents</C> en plural, es OpenCode 2.
              </>,
              <>
                <b>No instales con <C>brew install opencode</C> ni con <C>pacman -S opencode</C></b>: esos traen la V2.
              </>,
            ],
          }}
        />
      </Bloque>

      {/* 3 · Instalación */}
      <Paso
        id="instalar"
        n={1}
        titulo="Instala OpenCode"
        entradilla="En los equipos del aula ya lo tienes preparado o lo instalas en la primera sesión. En casa (semipresencial), elige tu sistema:"
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Tarjeta titulo="Linux y macOS" className="flex flex-col">
            <p className="mb-3">
              El script oficial, fijando la versión. Instala en <C>~/.opencode/bin</C> y lo añade al PATH. Después,{" "}
              <b>abre una terminal nueva</b>.
            </p>
            <Codigo code={`curl -fsSL https://opencode.ai/install | bash -s -- --version 1.18.35`} />
          </Tarjeta>
          <Tarjeta titulo="Windows nativo" className="flex flex-col">
            <ol className="mb-3 list-decimal space-y-1 pl-5">
              <li>
                Instala <b>Git for Windows</b> (OpenCode usa Git Bash para ejecutar órdenes).
              </li>
              <li>
                Instala <b>Node.js LTS</b> (trae npm).
              </li>
              <li>En una terminal nueva de PowerShell:</li>
            </ol>
            <Codigo code={`npm install -g opencode-ai@1.18.35`} etiqueta="PowerShell" />
          </Tarjeta>
          <Tarjeta titulo="Windows con WSL" className="flex flex-col">
            <p className="mb-3">
              La alternativa que recomienda la documentación: un Linux dentro de Windows. Si ya usas WSL (Ubuntu), dentro
              de su terminal usa el script de Linux:
            </p>
            <Codigo code={`curl -fsSL https://opencode.ai/install | bash -s -- --version 1.18.35`} etiqueta="Terminal de WSL" />
            <p className="mt-3">
              Ojo: en WSL las variables de entorno y la config van en el <C>~</C> de Linux, no en el de Windows.
            </p>
          </Tarjeta>
        </div>
      </Paso>

      <Paso n={2} titulo="Comprueba la versión">
        <Junto
          codigo={
            <Terminal
              lineas={[
                { o: "opencode --version", c: "# debe decir 1.18.35" },
                { s: "1.18.35", tono: "ok" },
                { o: "opencode debug paths", c: "# dónde guarda config, datos y logs" },
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
                    La versión no es la 1.18.35: revisa cómo lo instalaste (mira{" "}
                    <a className={cls.enlace} href="#errores">
                      Errores típicos
                    </a>
                    ).
                  </>,
                  <>
                    En Linux, para copiar y pegar dentro de OpenCode hace falta <C>xclip</C>, <C>xsel</C> o{" "}
                    <C>wl-clipboard</C>.
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
          Ruta: <C>~/.config/opencode/opencode.json</C> (en Windows, <C>%USERPROFILE%\.config\opencode\opencode.json</C>).
          Crea la carpeta y ábrelo con tu editor:
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
            Tal cual. No hay ninguna dirección ni clave escrita: <C>{"{env:CENTRO_IA_URL}"}</C> y{" "}
            <C>{"{env:CENTRO_IA_KEY}"}</C> le dicen a OpenCode que las lea de dos <b>variables de entorno</b>.
          </>
        }
        junto={<Codigo code={CONFIG_GLOBAL} kind="json" etiqueta="~/.config/opencode/opencode.json" ajustar={false} />}
      >
        <Lista
          className={cls.texto}
          items={[
            <>
              <C>autoupdate: false</C>: que no se actualice solo (seguimos en 1.18.35).
            </>,
            <>
              <C>centro</C>: el nombre del proveedor; es lo que va antes de la barra en <C>model</C>.
            </>,
            <>
              <C>@ai-sdk/openai-compatible</C>: el servidor del centro habla el mismo «idioma» que la API de OpenAI.
            </>,
            <>
              <C>limit</C>: cuánto contexto y salida admite el modelo. Sin esto OpenCode no sabe cuándo resumir la
              conversación.
            </>,
            <>
              <C>tool_call: true</C>: el modelo sabe usar herramientas. Sin eso no hay agente, solo chat.
            </>,
            <>
              <C>model</C> y <C>small_model</C>: el modelo de trabajo y el de tareas ligeras (títulos de sesión…). Aquí, el
              mismo.
            </>,
          ]}
        />
      </Paso>

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
            { o: "opencode models centro", c: "# debe salir centro/qwen3.8-flash-next" },
            { s: "centro/qwen3.8-flash-next", tono: "ok" },
            { o: "opencode debug config", c: "# config final; la clave sale enmascarada" },
            { o: 'opencode run "Responde solo: hola"', c: "# prueba real con el modelo" },
          ]}
        />
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <Tarjeta titulo="Si se queda esperando" tono="ambar">
            <p>
              Si <C>opencode run</C> se queda esperando sin fin, el servidor no responde: OpenCode reintenta para siempre.
              Sal con <b>Ctrl+C</b> y revisa la URL y que estás en la red del centro.
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
              Adjunta un fichero (con búsqueda difusa): <C>@src/tareas/cli.py</C>. También invoca subagentes:{" "}
              <C>@explore …</C>.
            </p>
          </Tarjeta>
          <Tarjeta titulo="!orden" nivel={4} mono tono="azul">
            <p>
              Ejecuta una orden tú mismo y el agente ve la salida: <C>!uv run tareas --help</C>. Escribir <C>/</C> abre la
              lista de comandos.
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
          {ATAJOS.filter(([t]) => t.length).map(([teclas, comando, para]) => (
            <li
              key={teclas.join()}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-3 gap-y-1 border-b border-zinc-200 pb-2 dark:border-white/10 sm:grid-cols-[11rem_6rem_minmax(0,1fr)]"
            >
              <span className="flex flex-wrap items-center gap-1">
                {teclas.map((t, i) => (
                  <span key={t} className="inline-flex items-center gap-1">
                    {i > 0 ? <span className="text-zinc-500 dark:text-zinc-400">/</span> : null}
                    <Teclas combo={t} />
                  </span>
                ))}
              </span>
              <code className="font-mono text-base font-bold text-blue-700 dark:text-blue-300">{comando}</code>
              <span className={`col-span-2 sm:col-span-1 ${cls.texto}`}>{para}</span>
            </li>
          ))}
        </ul>
      </Bloque>

      <Bloque titulo="Comandos de barra sin atajo" nivel={3} entradilla="Escribe / en la caja y aparece la lista entera.">
        <ul className="grid grid-cols-1 gap-x-6 gap-y-2 lg:grid-cols-2">
          {ATAJOS.filter(([t]) => !t.length).map(([, comando, para]) => (
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
            <p className="mb-3">
              Cada conversación es una <b>sesión</b> y se guarda. Abre una nueva para cada tarea (<C>/new</C>), recupera
              una anterior con <C>/sessions</C>, o continúa la última desde la terminal:
            </p>
            <Codigo code={`opencode -c            # continúa la última sesión\nopencode session list  # lista de sesiones`} />
          </Tarjeta>
          <Tarjeta titulo="/compact" nivel={4} mono>
            <p>
              Resume la conversación para liberar contexto. OpenCode lo hace solo cuando se llena, pero hacerlo tú al
              cambiar de fase (o abrir <C>/new</C>) da mejores resultados: un modelo con menos ruido se equivoca menos.
            </p>
          </Tarjeta>
          <Tarjeta titulo="/export" nivel={4} mono>
            <p>
              Exporta la conversación a Markdown y la abre en tu editor. Útil para guardar el prompt clave y lo que
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
            <C>/undo</C> borra tu último mensaje, sus respuestas y <b>revierte los cambios en ficheros</b>; <C>/redo</C> lo
            restaura.
          </>
        }
      >
        <DosColumnas
          nivel={4}
          centro="pero"
          a={{
            titulo: "Deshace",
            tono: "verde",
            puntos: ["Tu último mensaje y sus respuestas.", "Los cambios que hizo en tus ficheros."],
          }}
          b={{
            titulo: "No deshace efectos externos",
            tono: "rosa",
            puntos: ["Un paquete instalado.", "Una orden que movió ficheros fuera.", <>Un <C>git push</C>.</>],
          }}
        />
        <p className={`mt-4 ${cls.texto}`}>
          Funciona con <b>instantáneas internas</b> que OpenCode guarda aparte: <b>no hace commits en tu repo</b>. Pero
          necesita que el proyecto <b>sea un repositorio git con al menos un commit</b>.
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
              "No puede editar ficheros (salvo sus propios planes).",
              "Ojo: de fábrica bash NO está restringido.",
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
          <Teclas combo="Tab" /> alterna entre build y plan (mira la barra inferior).
        </p>
      </Bloque>

      <Aviso titulo="Plan solo bloquea ediciones" tono="ambar">
        <p>
          El agente plan de fábrica no puede escribir ficheros, pero sí ejecutar órdenes con tus permisos generales. Y si
          tu configuración dice <C>{'"edit": "ask"'}</C>, esa regla le alcanza también a plan.
        </p>
        <p>
          Por eso el <C>opencode.json</C> del proyecto le pone <C>{'"edit": "deny"'}</C> y deja que las órdenes sigan tus
          reglas de bash (las peligrosas siguen en deny). Ojo: si le pusieras <C>{'"bash": "ask"'}</C>, anularías esos
          deny y <C>rm</C> pasaría a «preguntar». Compruébalo con <C>opencode debug agent plan</C>.
        </p>
      </Aviso>

      <Bloque titulo="Subagentes: general y explore" nivel={3}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Tarjeta titulo="general" nivel={4} mono tono="morado" antetitulo="subagente">
            <p>Investigación y tareas de varios pasos. Puede modificar ficheros.</p>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">Una subtarea que no quieres que ensucie tu conversación.</p>
          </Tarjeta>
          <Tarjeta titulo="explore" nivel={4} mono tono="morado" antetitulo="subagente">
            <p>Solo lectura: busca y lee (no edita), aunque puede ejecutar órdenes.</p>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">«¿Dónde se valida el JSON?», «¿qué usa a motor.py?»</p>
          </Tarjeta>
          <Tarjeta titulo="Cómo se invocan" nivel={4}>
            <Lista
              items={[
                <>
                  Con <C>@</C>: <C>@explore busca dónde se lee acciones.json</C>.
                </>,
                <>
                  El agente principal también puede lanzarlos solo (herramienta <C>task</C>), eligiéndolos por su
                  descripción.
                </>,
                "Trabajan en una sesión hija: su exploración no llena tu contexto.",
              ]}
            />
          </Tarjeta>
        </div>
        <div className="mt-4 max-w-2xl">
          <Codigo code={`opencode agent list         # agentes cargados\nopencode debug agent plan   # reglas efectivas de uno`} />
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
            Un fichero Markdown en <C>.opencode/agents/</C>: el nombre del fichero es el nombre del agente, el frontmatter
            su configuración (<C>description</C> es obligatoria; <C>mode: subagent</C>, <C>temperature</C>,{" "}
            <C>permission</C>…) y el cuerpo, su prompt. Es el revisor de la semana 2.
          </p>
          <p className={cls.texto}>
            Se usa así: <C>@revisor revisa src/tareas/motor.py</C>. No puede editar ni navegar por la web; solo mirar diffs
            e historial sin preguntar. Como es un fichero del repo, el revisor viaja con tu proyecto.
          </p>
        </div>
      </Bloque>

      {/* 7 · Permisos */}
      <Bloque
        id="permisos"
        titulo="Permisos"
        entradilla={
          <>
            De fábrica, OpenCode tiene casi todo en <b>allow</b>: edita y ejecuta órdenes sin preguntar. En el curso eso no
            vale. Cada herramienta (y cada orden de bash) acaba en una de tres respuestas:
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Permiso tipo="allow" texto="Lo hace sin preguntar." />
          <Permiso tipo="ask" texto="Se para, te enseña qué va a hacer y espera." />
          <Permiso tipo="deny" texto="Bloqueado. Ni lo intenta." />
        </div>
        <div className={`mt-4 ${cls.suave}`}>
          <p className={cls.texto}>Cuando pregunta, respondes:</p>
          <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {[
              ["once", "solo esta vez"],
              ["always", "lo mismo durante el resto de la sesión"],
              ["reject", "no"],
            ].map(([a, d]) => (
              <li key={a} className={cls.texto}>
                <code className="font-mono font-bold text-zinc-900 dark:text-zinc-50">{a}</code> · {d}
              </li>
            ))}
          </ul>
          <p className={`mt-2 ${cls.texto}`}>
            Las órdenes que te pregunta, <b>léelas antes de aceptar</b>.
          </p>
        </div>
      </Bloque>

      <Bloque
        titulo="Gana la última que coincide"
        nivel={3}
        entradilla={
          <>
            Las reglas se leen de arriba abajo y, si varias coinciden, <b>manda la última</b>. Por eso <C>&quot;*&quot;</C>{" "}
            va primero (lo general) y las excepciones después, con los <C>deny</C> al final. El <C>*</C> significa
            «cualquier cosa»: <C>git diff *</C> vale para <C>git diff</C> y para <C>git diff src/</C>.
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
        anchoJunto={760}
        junto={<Codigo code={CONFIG_PROYECTO} kind="json" etiqueta="cli-tareas/opencode.json" ajustar={false} />}
      >
        <p className={cls.texto}>Cada línea del fichero es una regla de las dos listas que vienen ahora.</p>
      </Bloque>

      <Bloque titulo="Reglas para ficheros" nivel={3}>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-5 lg:grid-cols-2">
          {REGLAS_FICHEROS.map(([t, r, d]) => (
            <Regla key={r} tipo={t} regla={r}>
              {d}
            </Regla>
          ))}
        </ul>
      </Bloque>

      <Bloque titulo="Reglas para órdenes" nivel={3}>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2">
          {REGLAS_ORDENES.map(([t, r, d]) => (
            <Regla key={r} tipo={t} regla={r}>
              {d}
            </Regla>
          ))}
        </ul>
      </Bloque>

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
            Las configuraciones (global, proyecto, agente) se <b>fusionan</b>, no se sustituyen. Si la global dice{" "}
            <C>{'"rm *": "deny"'}</C> y otra posterior dice <C>{'"*": "allow"'}</C>, el resultado queda en ese orden… y como
            gana la última, <b><C>rm</C> queda permitido</b>.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Coincidencias
            orden="rm -r build"
            reglas={[
              { patron: "rm *", accion: "deny", coincide: true, origen: "global" },
              { patron: "*", accion: "allow", coincide: true, origen: "posterior" },
            ]}
            resultado="allow"
          />
          <Tarjeta titulo="Solución" nivel={4} tono="verde">
            <p>
              Repite los <C>deny</C> importantes <b>después</b> del <C>&quot;*&quot;</C> en el mismo bloque (como hace el
              fichero del proyecto) y compruébalo con <C>opencode debug agent build</C>.
            </p>
          </Tarjeta>
        </div>
      </Bloque>

      <Aviso titulo="Nunca uses --auto" tono="rosa" icono={<IconoPermiso tipo="deny" tam={36} />}>
        <p>
          <C>opencode --auto</C> (o el «auto-approve» de la paleta) aprueba solo todo lo que está en ask. Es decir:{" "}
          <b>desactiva tu revisión</b>.
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

      <Bloque titulo="Proyecto frente a global" nivel={3}>
        <DosColumnas
          nivel={4}
          a={{
            antetitulo: "Se sube a git",
            titulo: "Proyecto",
            tono: "azul",
            puntos: [
              <>
                <C>AGENTS.md</C> en la raíz del repo.
              </>,
              "Cualquiera (o cualquier agente) que abra tu repo hereda las normas.",
            ],
          }}
          b={{
            antetitulo: "Solo en tu equipo",
            titulo: "Global",
            tono: "morado",
            puntos: [
              <>
                <C>~/.config/opencode/AGENTS.md</C>.
              </>,
              "Tus preferencias personales para todos los proyectos («respóndeme en español»).",
            ],
          }}
        />
      </Bloque>

      <Bloque titulo="Créalo con /init y mejóralo" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tarjeta titulo="Créalo con /init" nivel={4}>
            <p>
              <C>/init</C> analiza el repo, puede hacerte alguna pregunta y crea (o mejora) el <C>AGENTS.md</C>. Después{" "}
              <b>lo editas tú</b>: quita lo que sobra, añade tus normas. Corto y concreto: se carga siempre y ocupa
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
                    ejecuta) y, si quieres, <C>model</C> o <C>subtask: true</C> (como subtarea, sin ensuciar tu
                    conversación).
                  </>,
                  <>
                    <C>$ARGUMENTS</C>: todo lo que escribes detrás del comando. <C>$1</C>, <C>$2</C>…: cada argumento por
                    separado (entre comillas si lleva espacios).
                  </>,
                  <>
                    <C>!`orden`</C>: ejecuta la orden al lanzar el comando y mete su salida en el prompt.
                  </>,
                  <>
                    <C>@fichero</C>: adjunta un fichero.
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
            Una <b>skill</b> es un paquete de conocimiento que el agente <b>carga solo cuando lo necesita</b>. El agente ve
            una lista con el nombre y la descripción de cada skill; si una le sirve para lo que está haciendo, la carga con
            la herramienta <C>skill</C> y lee el contenido completo. Así no gasta contexto en lo que no toca.
          </>
        }
      >
        <Tarjeta titulo="Dónde y cómo">
          <ul className="grid list-disc grid-cols-1 gap-x-8 gap-y-2 pl-5 marker:text-zinc-400 lg:grid-cols-2">
            <li>
              Una carpeta por skill: <C>.opencode/skills/&lt;nombre&gt;/SKILL.md</C>.
            </li>
            <li>
              <C>name</C>: minúsculas, números y guiones, y <b>igual que el nombre de la carpeta</b>.
            </li>
            <li>
              <C>description</C>: obligatoria. Di <b>qué hace y cuándo usarla</b>: es lo único que el agente lee para
              decidir.
            </li>
            <li>
              Compruébalo con <C>/skills</C> en la TUI (o <C>opencode debug skill</C>).
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
      >
        <Codigo code={MCP_JSON} kind="json" etiqueta="opencode.json (bloque mcp)" ajustar={false} />
      </Bloque>

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
                OpenCode no arranca.
              </>,
            ],
          }}
        />
        <ul className={`mt-4 list-disc space-y-1.5 pl-5 marker:text-zinc-400 ${cls.texto}`}>
          <li>
            <C>enabled: false</C>: definido pero apagado. Lo enciendes cuando lo necesitas.
          </li>
          <li>
            <C>opencode mcp list</C>: estado de cada servidor. En la TUI, <C>/mcps</C> los lista y la barra espaciadora
            los enciende o apaga.
          </li>
        </ul>
      </Bloque>

      <Bloque titulo="MCP: contexto y riesgos" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className={`rounded-2xl border p-5 ${TONO.ambar.caja}`}>
            <h4 className={`text-xl font-bold ${TONO.ambar.tinta}`}>Gastan contexto</h4>
            <p className={`mt-2 text-base leading-relaxed ${TONO.ambar.tinta}`}>
              Cada servidor encendido añade la descripción de <b>todas</b> sus herramientas a cada petición. Dos o tres MCP
              pueden comerse buena parte del contexto y hacer que el agente use peor sus herramientas. Por eso context7 va
              con <C>enabled: false</C> y se activa solo cuando hace falta (semana 3).
            </p>
          </div>
          <div className={`rounded-2xl border p-5 ${TONO.rosa.caja}`}>
            <h4 className={`text-xl font-bold ${TONO.rosa.tinta}`}>Riesgos</h4>
            <p className={`mt-2 text-base leading-relaxed ${TONO.rosa.tinta}`}>
              Un MCP local ejecuta código con tus permisos; uno remoto recibe lo que el agente le envía. Solo servidores
              conocidos y de confianza, y si piden token, nunca en claro:{" "}
              <C>{'"headers": { "CONTEXT7_API_KEY": "{env:CONTEXT7_API_KEY}" }'}</C>.
            </p>
          </div>
        </div>
        <p className={`mt-4 ${cls.texto}`}>
          Detalle: <C>opencode mcp add</C> escribe en tu config <b>global</b>, aunque estés dentro del proyecto. Si quieres
          el MCP en el proyecto, edita su <C>opencode.json</C> a mano.
        </p>
      </Bloque>

      {/* 12 · Flujo */}
      <Bloque
        id="flujo"
        titulo="El flujo de trabajo del curso"
        entradilla="El mismo en todas las sesiones. Si te saltas un paso, lo notarás (y se notará en tus commits)."
      >
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FLUJO.map((p, i) => (
            <li key={p.titulo} className={`${cls.tarjeta} flex flex-col !p-4`}>
              <div className="flex items-center justify-between">
                <span aria-hidden className="text-3xl font-extrabold text-blue-700 dark:text-blue-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Chip tono={QUIEN[p.quien]}>{p.quien}</Chip>
              </div>
              <h3 className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-100">{p.titulo}</h3>
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
            <><C>/compact</C> cuando la conversación se alargue.</>,
            <><b>Commits pequeños hechos por ti</b>, con mensajes que cuentan el paso.</>,
            <><b>Guarda tus prompts</b> clave en <C>docs/prompts.md</C> (o <C>/export</C>).</>,
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
            <><b>Permisos</b> del proyecto siempre activos: <C>edit: ask</C>, bash en ask, <C>rm</C>/<C>sudo</C>/<C>git push</C> en deny.</>,
            <><b>Nunca <C>--auto</C></b>.</>,
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
            ["Plugins", "Código JavaScript/TypeScript que reacciona a lo que hace el agente: por ejemplo, impedir que lea ciertos ficheros."],
            ["Herramientas propias", "Le das al agente herramientas nuevas escritas por ti en .opencode/tools/."],
            ["opencode run en scripts", "Sin interfaz: un script o la CI le pasa una tarea. Siempre con permisos exactos (nunca --auto) y con un tiempo máximo, porque si el servidor no responde reintenta sin fin."],
            ["opencode github", "El agente responde a comentarios en issues y PR de GitHub. Ojo: los servidores de GitHub no llegan a la red del centro."],
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
        entradilla={
          <>
            Antes de pedir ayuda, busca aquí el síntoma. Para diagnosticar casi todo: <C>opencode debug config</C>.
          </>
        }
      >
        <div className="max-w-3xl">
          <Codigo
            code={`opencode debug config        # config final fusionada (claves enmascaradas)\nopencode debug agent build   # permisos efectivos de un agente\nopencode debug skill         # skills que encuentra\nopencode mcp list            # estado de los MCP`}
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
          <a href="https://opencode.ai/docs" target="_blank" rel="noopener noreferrer" className={cls.enlace}>
            opencode.ai/docs
          </a>
          . Ya describe la versión 1.19, pero lo esencial coincide con la 1.18.35 de clase. No sigas la documentación de
          OpenCode 2 (<C>/v2/docs</C>) ni los tutoriales con claves en plural.
        </p>
      </Bloque>
    </div>
  );
}
