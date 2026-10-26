import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CodeBlock from "@/components/CodeBlock";
import PromptBlock from "@/components/PromptBlock";

export const metadata: Metadata = {
  title: "OpenCode: tu agente de programación — Curso de Programación con IA",
  description:
    "Guía de OpenCode 1.18.35 para el curso: instalación, conexión a los modelos del centro, agentes, permisos, AGENTS.md, comandos, skills y MCP.",
};

/* ------------------------------------------------------------------ */
/* Resaltado mínimo para shell, JSON y Markdown (en compilación).      */
/* ------------------------------------------------------------------ */

type Kind = "sh" | "json" | "md" | "txt";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const span = (c: string, t: string) => `<span class="tok-${c}">${esc(t)}</span>`;

function pintarLinea(l: string, kind: Kind): string {
  if (kind === "txt") return esc(l);
  let out = "";
  let i = 0;
  const n = l.length;
  while (i < n) {
    const c = l[i];
    const prev = i === 0 ? " " : l[i - 1];
    // Comentarios con # (shell y PowerShell)
    if (c === "#" && kind === "sh" && /\s/.test(prev)) {
      out += span("com", l.slice(i));
      break;
    }
    // Cadenas
    if (c === '"' || (c === "'" && kind === "sh")) {
      let j = i + 1;
      while (j < n && l[j] !== c) {
        if (l[j] === "\\") j++;
        j++;
      }
      out += span("str", l.slice(i, j + 1));
      i = j + 1;
      continue;
    }
    // Opciones de línea de órdenes: --version, -c…
    if (kind === "sh" && c === "-" && /\s/.test(prev) && /[A-Za-z-]/.test(l[i + 1] ?? "")) {
      let j = i;
      while (j < n && /[^\s=]/.test(l[j])) j++;
      out += span("kw", l.slice(i, j));
      i = j;
      continue;
    }
    // Variables: $HOME, $env:CENTRO_IA_KEY
    if (kind === "sh" && c === "$" && /[A-Za-z_]/.test(l[i + 1] ?? "")) {
      let j = i + 1;
      while (j < n && /[\w:]/.test(l[j])) j++;
      out += span("ann", l.slice(i, j));
      i = j;
      continue;
    }
    // Palabras
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < n && /[\w]/.test(l[j])) j++;
      const w = l.slice(i, j);
      if (kind === "sh" && out.replace(/<[^>]+>/g, "").trim() === "") out += span("fn", w);
      else if (kind === "json" && (w === "true" || w === "false" || w === "null")) out += span("lit", w);
      else out += esc(w);
      i = j;
      continue;
    }
    // Números
    if (/\d/.test(c) && kind === "json") {
      let j = i;
      while (j < n && /[\d.]/.test(l[j])) j++;
      out += span("num", l.slice(i, j));
      i = j;
      continue;
    }
    out += esc(c);
    i++;
  }
  return out;
}

/** Markdown con frontmatter: claves YAML, títulos, `código`, $ARGUMENTS, @fichero y !`orden`. */
function pintarMd(lineas: string[]): string[] {
  let enFront = false;
  return lineas.map((l, idx) => {
    if (l.trim() === "---") {
      if (idx === 0) enFront = true;
      else if (enFront) enFront = false;
      return span("com", l);
    }
    if (enFront) {
      const m = l.match(/^(\s*)("?[^":]+"?)(:)(.*)$/);
      if (!m) return esc(l);
      const valor = m[4];
      const v = /^\s*(allow|ask|deny|true|false|subagent|primary|build|plan)\s*$/.test(valor)
        ? span("lit", valor)
        : /^\s*[\d.]+\s*$/.test(valor)
          ? span("num", valor)
          : esc(valor);
      return esc(m[1]) + span(m[2].startsWith('"') ? "str" : "kw", m[2]) + esc(m[3]) + v;
    }
    if (/^#{1,6}\s/.test(l)) return span("type", l);
    let out = "";
    let i = 0;
    while (i < l.length) {
      const c = l[i];
      if (c === "!" && l[i + 1] === "`") {
        const j = l.indexOf("`", i + 2);
        const fin = j === -1 ? l.length : j + 1;
        out += span("fn", l.slice(i, fin));
        i = fin;
        continue;
      }
      if (c === "`") {
        const j = l.indexOf("`", i + 1);
        const fin = j === -1 ? l.length : j + 1;
        out += span("str", l.slice(i, fin));
        i = fin;
        continue;
      }
      if ((c === "$" || c === "@") && /[\w]/.test(l[i + 1] ?? "")) {
        let j = i + 1;
        while (j < l.length && /[\w./-]/.test(l[j])) j++;
        out += span("ann", l.slice(i, j));
        i = j;
        continue;
      }
      if (i === 0 && /^(\s*)(-|\d+\.)\s/.test(l)) {
        const m = l.match(/^(\s*)(-|\d+\.)/)!;
        out += esc(m[1]) + span("kw", m[2]);
        i = m[0].length;
        continue;
      }
      out += esc(c);
      i++;
    }
    return out;
  });
}

function pintar(raw: string, kind: Kind) {
  const code = raw.replace(/^\n+/, "").replace(/\s+$/, "");
  const crudas = code.split("\n");
  const lines = kind === "md" ? pintarMd(crudas) : crudas.map((l) => pintarLinea(l, kind));
  return { code, lines };
}

function Codigo({ code, kind = "sh", lang }: { code: string; kind?: Kind; lang?: string }) {
  const etiqueta = lang ?? { sh: "Terminal", json: "JSON", md: "Markdown", txt: "Salida" }[kind];
  return (
    <div className="min-w-0">
      <CodeBlock {...pintar(code, kind)} lang={etiqueta} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Estilos compartidos                                                 */
/* ------------------------------------------------------------------ */

const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";
const card =
  "rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm";
const h2 = "mt-14 scroll-mt-20 text-2xl font-extrabold tracking-tight";
const h3 = "mt-8 text-lg font-bold";
const lead = "mt-2 max-w-3xl text-[15px] text-zinc-600 dark:text-zinc-400";
const muted = "text-sm text-zinc-600 dark:text-zinc-400";
const code = "rounded bg-zinc-100 dark:bg-white/10 px-1 py-0.5 font-mono text-[13px] [overflow-wrap:anywhere]";
const th = "px-3.5 py-2.5 text-left font-bold";
const td = "px-3.5 py-2.5 align-top text-zinc-600 dark:text-zinc-400";
const tdMono = "px-3.5 py-2.5 align-top font-mono text-[13px] text-zinc-800 dark:text-zinc-200";
const tr = "border-t border-zinc-200 dark:border-white/10";
const tabla = "mt-4 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10";
const thead = "bg-zinc-100 dark:bg-white/10";
const enlace = "font-semibold text-blue-700 underline-offset-2 hover:underline dark:text-blue-300";

function C({ children }: { children: ReactNode }) {
  return <code className={code}>{children}</code>;
}

function Nota({ tono = "blue", children }: { tono?: "blue" | "amber" | "emerald" | "rose"; children: ReactNode }) {
  const t = {
    blue: "border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-200",
    amber: "border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 text-amber-900 dark:text-amber-200",
    emerald: "border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-200",
    rose: "border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 text-rose-900 dark:text-rose-200",
  }[tono];
  return <div className={`mt-5 rounded-2xl border p-5 text-[15px] ${t}`}>{children}</div>;
}

function Paso({ n, titulo, children }: { n: number; titulo: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-extrabold text-white">
        {n}
      </span>
      <div className="min-w-0 flex-1">
        <h4 className="font-bold">{titulo}</h4>
        <div className={`mt-1 ${muted}`}>{children}</div>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Datos                                                               */
/* ------------------------------------------------------------------ */

const INDICE = [
  ["chat-agente", "Chat vs agente"],
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

const HERRAMIENTAS: [string, string, string][] = [
  ["read", "Lee un fichero (o un trozo).", "Como abrirlo en el editor para mirarlo."],
  ["glob", "Busca ficheros por nombre o patrón: src/**/*.py.", "Como el buscador de ficheros."],
  ["grep", "Busca texto dentro de los ficheros.", "Como Ctrl+Shift+F en VS Code."],
  ["edit", "Cambia unas líneas concretas de un fichero que ya existe.", "Te enseña el diff antes de aplicarlo (si está en ask)."],
  ["write", "Crea un fichero nuevo o lo reescribe entero.", "Lo controla el mismo permiso que edit."],
  ["bash", "Ejecuta una orden en la terminal: uv run, git status, ls…", "La más potente y la más peligrosa: por eso pregunta."],
  ["webfetch", "Descarga una página web y la lee.", "En el proyecto, siempre pregunta antes."],
  ["task", "Lanza un subagente (general, explore o uno tuyo) para una subtarea.", "Trabaja en una sesión hija y te devuelve un resumen."],
  ["todowrite", "Mantiene una lista de pasos pendientes y hechos.", "Verás la lista tachándose mientras trabaja."],
  ["skill", "Carga una skill (conocimiento extra) cuando la necesita.", "Solo carga la que le sirve, no todas."],
  ["question", "Te hace una pregunta con opciones cuando duda.", "Respóndela: es mejor que dejarle adivinar."],
];

const ATAJOS: [string, string, string][] = [
  ["Tab / Shift+Tab", "—", "Cambia de agente primario: build ↔ plan"],
  ["Esc", "—", "Interrumpe la respuesta en curso"],
  ["ctrl+p", "—", "Paleta con todos los comandos"],
  ["ctrl+x n", "/new", "Sesión nueva (una por tarea)"],
  ["ctrl+x l", "/sessions", "Lista de sesiones para retomar una"],
  ["ctrl+x m", "/models", "Elegir modelo"],
  ["ctrl+x c", "/compact", "Resume la conversación para liberar contexto"],
  ["ctrl+x u", "/undo", "Deshace tu último mensaje, sus respuestas y sus cambios en ficheros"],
  ["ctrl+x r", "/redo", "Rehace lo deshecho"],
  ["ctrl+x x", "/export", "Exporta la conversación a Markdown"],
  ["—", "/init", "Crea o mejora el AGENTS.md del proyecto"],
  ["—", "/review", "Revisa los cambios sin commit (o un commit o rama)"],
  ["—", "/skills", "Explora las skills que ve el agente"],
  ["—", "/mcps", "Servidores MCP; espacio los activa o desactiva"],
  ["—", "/help", "Ayuda"],
  ["ctrl+c", "/exit", "Salir"],
];

const REGLAS_PROYECTO: [string, string][] = [
  ['"edit": "ask"', "Cada edición o fichero nuevo te enseña el diff y espera tu sí. En la semana 1 es obligatorio: lees todo lo que entra en tu repo."],
  ['"webfetch": "ask"', "Si quiere leer una web, pregunta. Así sabes de dónde saca la información."],
  ['"external_directory": "ask"', "Nada fuera de la carpeta del proyecto sin preguntar (tu carpeta personal, otras prácticas…)."],
  ['"read": { "*": "allow", … }', "Puede leer cualquier fichero del proyecto sin preguntar…"],
  ['"*.env": "deny", "*.env.*": "deny"', "…salvo los .env con claves: esos ni los ve. Va DESPUÉS del \"*\" porque gana la última que coincide."],
  ['"*.env.example": "allow"', "La plantilla sin claves sí puede leerla (va al final para volver a permitirla)."],
  ['"bash": { "*": "ask", … }', "Regla general: cualquier orden pregunta. Es la primera para que las demás la puedan matizar."],
  ['"ls *", "pwd", "cat *"', "Mirar carpetas y ficheros no rompe nada: allow."],
  ['"git status *", "git diff *", "git log *"', "Consultar git tampoco: allow. El agente puede ver qué ha cambiado."],
  ['"uv run tareas --help", "uv run tareas validar *"', "Probar la ayuda y validar acciones.json es inofensivo: allow."],
  ['"uv run pytest *"', "Pasar las pruebas (semana 4): allow."],
  ['"git commit *": "ask"', "Los commits los haces tú; si te lo propone, te pregunta (y normalmente dirás que no)."],
  ['"git push *", "git reset *": "deny"', "Subir o reescribir historia: nunca el agente."],
  ['"rm *", "sudo *": "deny"', "Borrar ficheros o usar permisos de administrador: prohibido. Al final del bloque, para que nada los pise."],
  ['"agent": { "plan": … }', "Al agente plan le quita editar y le pone bash en ask (explicado en Agentes)."],
];

const COMPARA: [string, string, string, string][] = [
  ["Qué es", "Normas fijas del proyecto", "Conocimiento especializado", "Un prompt que repites"],
  ["Cuándo se carga", "Siempre, al empezar cada sesión", "Solo cuando el agente decide que le sirve", "Cuando tú escribes /nombre"],
  ["Quién lo dispara", "Nadie: está siempre", "El agente (herramienta skill)", "Tú"],
  ["Gasta contexto", "Siempre: tenlo corto", "Solo nombre y descripción hasta que se usa", "Solo al usarlo"],
  ["Ejemplo del curso", "Stack, órdenes, «no hagas push»", "Reglas del esquema de acciones.json", "/nueva-accion renombrar-capturas"],
  ["Dónde", "AGENTS.md (raíz)", ".opencode/skills/<nombre>/SKILL.md", ".opencode/commands/<nombre>.md"],
];

const FLUJO: { quien: string; titulo: string; texto: string; ej?: string }[] = [
  { quien: "Tú", titulo: "Escribe la intención", texto: "Spec, entrada de acciones.json o criterio de aceptación. Qué quieres y cómo sabrás que está bien.", ej: "docs/spec.md" },
  { quien: "Plan", titulo: "Pide un plan", texto: "Tab a plan: «explícame cómo lo harías y qué ficheros tocarías». Lo lees y lo corriges.", ej: "Tab → plan" },
  { quien: "Build", titulo: "Que lo haga", texto: "Tab a build: «hazlo». Apruebas cada edición y cada orden leyendo el diff.", ej: "Tab → build" },
  { quien: "Tú", titulo: "Audita", texto: "Lee el código y prueba en ~/pruebas-tareas con --simular y casos feos. Si sale mal: /undo o le explicas el fallo.", ej: "!uv run tareas …" },
  { quien: "Tú", titulo: "Commit pequeño", texto: "git add + git commit con un mensaje que cuenta el paso. Guarda el prompt clave en docs/prompts.md (o /export).", ej: "git commit" },
  { quien: "Tú", titulo: "Sesión nueva", texto: "Una sesión por tarea (/new) y /compact si la conversación se alarga.", ej: "/new" },
];

const RUTA: { sem: string; fechas: string; sesion?: [string, string]; opencode: string[]; avance?: boolean }[] = [
  {
    sem: "Semana 1",
    fechas: "26-30 oct",
    sesion: ["Sesión 1 · Arranque", "/programacion-ia/cli/sesion-01/"],
    opencode: [
      "Instalar la 1.18.35 y conectarla con los modelos del centro.",
      "Antes de abrir OpenCode, a mano: uv init, .gitignore y primer commit (sin git no hay /undo).",
      "opencode.json de permisos del proyecto.",
      "/init → AGENTS.md, que luego editas tú.",
      "plan → build para crear cli.py (version + listar), aprobando diffs; /undo; commits tuyos.",
    ],
  },
  {
    sem: "Semana 2",
    fechas: "2-6 nov",
    sesion: ["Sesión 2 · acciones.json y el motor", "/programacion-ia/cli/sesion-02/"],
    opencode: [
      "Tu acciones.json, escrito por ti sin IA.",
      "Skill del proyecto acciones-json (compruébala con /skills).",
      "Comando personalizado /nueva-accion.",
      "Subagente revisor (@revisor) y /review antes de cada commit.",
    ],
  },
  {
    sem: "Semana 3",
    fechas: "avance",
    opencode: [
      "MCP: context7 para documentación de librerías, desactivado por defecto y activado solo cuando hace falta.",
      "La capa IA de TU CLI llamando desde Python a los mismos modelos del centro (CENTRO_IA_URL / CENTRO_IA_KEY, modo sin red).",
    ],
    avance: true,
  },
  {
    sem: "Semana 4",
    fechas: "avance",
    opencode: [
      "El agente escribe pruebas que tú auditas.",
      "opencode run no interactivo (por ejemplo, en scripts).",
      "Release v1.0.",
    ],
    avance: true,
  },
];

const ERRORES: [string, string, string][] = [
  ["opencode: command not found (o «no se reconoce» en Windows)", "La terminal se abrió antes de instalar y no tiene el PATH nuevo; o la instalación de npm no está en el PATH.", "Cierra y abre la terminal. Linux/macOS: el script instala en ~/.opencode/bin. Windows: comprueba npm install -g y abre una terminal nueva."],
  ["opencode --version no dice 1.18.35", "Lo instalaste con brew, pacman u otro gestor que trae OpenCode 2, o se actualizó.", "Desinstala esa versión e instala con el script o npm fijando 1.18.35; deja \"autoupdate\": false."],
  ["opencode models centro no muestra nada", "La config no está en ~/.config/opencode/opencode.json, el JSON tiene un error o el id del proveedor no es centro.", "opencode debug config para ver qué config lee; revisa la ruta y el nombre."],
  ["opencode run se queda reintentando sin fin", "El servidor no responde: URL mal escrita, falta /v1, no estás en la red del centro o el servidor está caído.", "Ctrl+C. Revisa CENTRO_IA_URL (termina en /v1) y que estás en la red del aula; si sigue, avisa al profesor."],
  ["Error 401/403 o «clave no válida»", "La variable no existe en esa terminal: {env:VAR} se sustituye por una cadena vacía. Falta export, o la terminal es anterior al setx.", "echo $CENTRO_IA_KEY (bash) o echo $env:CENTRO_IA_KEY (PowerShell). Si sale vacío: export en ~/.bashrc o setx, y terminal NUEVA."],
  ["Expected array, got \"npx …\" mcp.x.command y no arranca", "El command de un MCP local está escrito como cadena.", "\"command\": [\"npx\", \"-y\", \"paquete\"]: siempre un array."],
  ["bad file reference: \"{file:…}\" … does not exist", "Usas {file:…} apuntando a un fichero que no existe: OpenCode se niega a arrancar.", "Crea el fichero o corrige la ruta. En el curso usamos {env:…}, no {file:…}."],
  ["V2 permissions are not supported by OpenCode V1", "Has copiado configuración de OpenCode 2 (\"permissions\" en plural).", "Claves en singular: permission, agent, provider, command, mcp."],
  ["Mis agentes o proveedores no aparecen", "Están bajo \"agents\" o \"providers\" (claves V2): la 1.18 las ignora sin avisar.", "Renómbralas a agent y provider."],
  ["/undo no revierte los ficheros", "El proyecto no es un repositorio git (o no tiene commits).", "git init, git add y un primer commit antes de abrir OpenCode."],
  ["He cambiado la config y no hace caso", "La configuración no se recarga en caliente.", "Sal de OpenCode y vuelve a abrirlo."],
  ["Se ejecutó algo que creía prohibido", "Una regla \"*\": \"allow\" posterior (otra config o el agente) gana a tu deny.", "Pon los deny al final del bloque; compruébalo con opencode debug agent build."],
  ["Una skill no aparece en /skills", "name distinto de la carpeta, sin description, o frontmatter mal escrito.", "opencode debug skill y revisa el frontmatter."],
  ["Pregunta permiso para todo", "bash con \"*\": \"ask\" y pocas excepciones.", "Es lo esperado al principio. Añade allow solo para órdenes seguras, o responde always en la sesión."],
  ["Respuestas cortadas o «context length exceeded»", "Conversación muy larga o demasiados MCP y skills cargados.", "/compact o /new; desactiva los MCP que no uses."],
  ["En Linux no puedo copiar ni pegar", "Falta la utilidad de portapapeles.", "xclip o xsel (X11), wl-clipboard (Wayland)."],
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

const CONFIG_PROYECTO = String.raw`
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "edit": "ask",
    "webfetch": "ask",
    "external_directory": "ask",
    "read": { "*": "allow", "*.env": "deny", "*.env.*": "deny", "*.env.example": "allow" },
    "bash": {
      "*": "ask",
      "ls *": "allow",
      "pwd": "allow",
      "cat *": "allow",
      "git status *": "allow",
      "git diff *": "allow",
      "git log *": "allow",
      "uv run tareas --help": "allow",
      "uv run tareas validar *": "allow",
      "uv run pytest *": "allow",
      "git commit *": "ask",
      "git push *": "deny",
      "git reset *": "deny",
      "rm *": "deny",
      "sudo *": "deny"
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
/* Diagrama: el bucle del agente                                       */
/* ------------------------------------------------------------------ */

const NODOS = [
  { id: "pides", x: 20, y: 132, w: 130, t1: "Tú pides", t2: "«añade la orden listar»", c: "slate" },
  { id: "plan", x: 200, y: 40, w: 170, t1: "Planifica", t2: "qué mirar, qué cambiar", c: "blue" },
  { id: "tool", x: 440, y: 40, w: 180, t1: "Usa una herramienta", t2: "read · grep · edit · bash", c: "violet" },
  { id: "res", x: 440, y: 224, w: 180, t1: "Ve el resultado", t2: "contenido, diff, salida", c: "emerald" },
  { id: "fin?", x: 200, y: 224, w: 170, t1: "¿Ha terminado?", t2: "compara con lo pedido", c: "amber" },
  { id: "permiso", x: 660, y: 40, w: 140, t1: "Te pide permiso", t2: "si la regla es ask", c: "rose", dash: true },
  { id: "fin", x: 200, y: 340, w: 170, t1: "Termina y te avisa", t2: "tú revisas y decides", c: "slate" },
] as const;

const COLOR_NODO = {
  slate: { rect: "fill-slate-500/10 stroke-slate-500", txt: "fill-slate-800 dark:fill-slate-100" },
  blue: { rect: "fill-blue-500/10 stroke-blue-500", txt: "fill-blue-700 dark:fill-blue-300" },
  violet: { rect: "fill-violet-500/10 stroke-violet-500", txt: "fill-violet-700 dark:fill-violet-300" },
  emerald: { rect: "fill-emerald-500/10 stroke-emerald-500", txt: "fill-emerald-700 dark:fill-emerald-300" },
  amber: { rect: "fill-amber-500/10 stroke-amber-500", txt: "fill-amber-700 dark:fill-amber-300" },
  rose: { rect: "fill-rose-500/10 stroke-rose-500", txt: "fill-rose-700 dark:fill-rose-300" },
} as const;

function DiagramaBucle() {
  const H = 56;
  const flecha = "stroke-zinc-500 dark:stroke-zinc-400";
  return (
    <div className={`${card} mt-5 overflow-x-auto`}>
      <svg
        viewBox="0 0 820 410"
        className="mx-auto block w-full min-w-[680px] max-w-4xl"
        role="img"
        aria-label="Bucle del agente: tú pides; el agente planifica, usa una herramienta (leer, buscar, editar o ejecutar), ve el resultado y comprueba si ha terminado. Si no, repite el bucle. Cuando una herramienta tiene la regla ask, te pide permiso antes de usarla. Cuando termina, te avisa y tú revisas."
      >
        <defs>
          <marker id="punta" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#71717a" />
          </marker>
        </defs>

        {/* Flechas */}
        <g fill="none" strokeWidth={1.75} className={flecha} markerEnd="url(#punta)">
          <path d="M150 160 H175 V68 H196" />
          <path d="M370 68 H436" />
          <path d="M530 96 V220" />
          <path d="M440 252 H374" />
          <path d="M285 224 V100" />
          <path d="M285 280 V336" />
          <path d="M620 60 H656" markerStart="url(#punta)" />
        </g>
        <text x={292} y={166} fontSize={12} fontWeight={700} className="fill-amber-700 dark:fill-amber-300">no: otra vuelta</text>
        <text x={292} y={314} fontSize={12} fontWeight={700} className="fill-emerald-700 dark:fill-emerald-300">sí</text>
        <text x={540} y={164} fontSize={11} className="fill-zinc-600 dark:fill-zinc-400">muchas</text>
        <text x={540} y={178} fontSize={11} className="fill-zinc-600 dark:fill-zinc-400">vueltas</text>
        <text x={624} y={86} fontSize={11} className="fill-zinc-600 dark:fill-zinc-400">tú: sí / no</text>

        {/* Nodos */}
        {NODOS.map((n) => {
          const k = COLOR_NODO[n.c];
          const cx = n.x + n.w / 2;
          return (
            <g key={n.id}>
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={H}
                rx={10}
                className={k.rect}
                strokeWidth={1.5}
                strokeDasharray={"dash" in n ? "5 4" : undefined}
              />
              <text x={cx} y={n.y + 24} textAnchor="middle" fontSize={14} fontWeight={800} className={k.txt}>
                {n.t1}
              </text>
              <text x={cx} y={n.y + 42} textAnchor="middle" fontSize={11} className="fill-zinc-600 dark:fill-zinc-400">
                {n.t2}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-3 text-center text-sm text-zinc-500 dark:text-zinc-400">
        Un chat da <b>una</b> respuesta. Un agente da <b>muchas vueltas</b> a este bucle hasta acabar la tarea.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Esquema de la TUI                                                   */
/* ------------------------------------------------------------------ */

function Marca({ n }: { n: number }) {
  return (
    <span className="mr-2 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400 font-sans text-[11px] font-extrabold text-zinc-900">
      {n}
    </span>
  );
}

function EsquemaTui() {
  return (
    <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[3fr_2fr]">
      <div
        className="overflow-x-auto rounded-2xl border border-zinc-300 dark:border-white/10 bg-zinc-950 p-4 font-mono text-[12.5px] leading-relaxed text-zinc-300 shadow-sm"
        role="img"
        aria-label="Esquema simplificado de la pantalla de OpenCode: conversación arriba, petición de permiso, caja de entrada y barra inferior con el agente y el modelo."
      >
        <div className="min-w-[440px]">
          <div className="flex items-start">
            <Marca n={1} />
            <div className="flex-1 space-y-1">
              <div className="text-zinc-100">
                <span className="text-blue-400">tú ›</span> Añade la orden version a @src/tareas/cli.py
              </div>
              <div className="text-zinc-500">→ Read src/tareas/cli.py</div>
              <div className="text-zinc-500">→ Read src/tareas/__init__.py</div>
              <div>Voy a añadir una función version() que lea __version__…</div>
              <div className="text-zinc-500">→ Edit src/tareas/cli.py</div>
            </div>
          </div>
          <div className="mt-3 flex items-start">
            <Marca n={2} />
            <div className="flex-1 rounded-lg border border-amber-500/50 bg-amber-500/10 p-2">
              <div className="text-amber-300">Permiso: editar src/tareas/cli.py</div>
              <div><span className="text-emerald-400">+ @app.command()</span></div>
              <div><span className="text-emerald-400">+ def version():</span></div>
              <div className="mt-1 text-zinc-400">[once] [always] [reject]</div>
            </div>
          </div>
          <div className="mt-3 flex items-start">
            <Marca n={3} />
            <div className="flex-1 rounded-lg border border-zinc-700 px-2 py-1.5 text-zinc-500">
              Escribe aquí… <span className="text-zinc-600">@fichero · !orden · /comando</span>
            </div>
          </div>
          <div className="mt-2 flex items-start">
            <Marca n={4} />
            <div className="flex flex-1 flex-wrap justify-between gap-2 text-[11.5px]">
              <span>
                <span className="rounded bg-blue-500/20 px-1.5 text-blue-300">Build</span>{" "}
                <span className="text-zinc-400">Qwen 3.8 Flash-Next (centro)</span>
              </span>
              <span className="text-zinc-500">tab agentes · ctrl+p comandos</span>
            </div>
          </div>
        </div>
      </div>
      <ol className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
        <li className="flex"><Marca n={1} /><span><b className="text-zinc-800 dark:text-zinc-200">Conversación.</b> Tus mensajes, las respuestas y cada herramienta que usa (qué fichero lee, qué orden ejecuta). Léelo: es el «razonamiento en voz alta» del agente.</span></li>
        <li className="flex"><Marca n={2} /><span><b className="text-zinc-800 dark:text-zinc-200">Petición de permiso.</b> Cuando una regla está en ask, se para y te enseña el diff o la orden. Nada se aplica hasta que respondes.</span></li>
        <li className="flex"><Marca n={3} /><span><b className="text-zinc-800 dark:text-zinc-200">Caja de entrada.</b> Escribes la petición. Intro envía; para un salto de línea, shift+enter o ctrl+j.</span></li>
        <li className="flex"><Marca n={4} /><span><b className="text-zinc-800 dark:text-zinc-200">Barra inferior.</b> Agente activo (Build o Plan) y modelo. Míralo antes de escribir: ¿estás en el agente que quieres?</span></li>
        <li className="text-[12px] italic">Esquema simplificado: colores y textos exactos cambian según el tema y la versión.</li>
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export default function GuiaOpenCode() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Curso de Programación con IA", path: "/programacion-ia/" },
          { title: "OpenCode", path: "/programacion-ia/opencode/" },
        ]}
      />

      {/* 1 · Cabecera */}
      <span className={chip}>Guía del curso · OpenCode</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
        OpenCode: tu <span className="text-blue-600 dark:text-blue-400">agente de programación</span>
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
        A partir del proyecto 2 programas de forma <b>agéntica</b>: con <b>OpenCode</b>, un agente
        que vive en tu terminal, lee tu proyecto, propone cambios y ejecuta órdenes — siempre con tu
        permiso. Está conectado a los <b>modelos de IA locales del centro</b>: tu código y tus datos{" "}
        <b>no salen del instituto</b>. El chat queda para consultas; el código se construye con el
        agente.
      </p>
      <p className="mt-3 max-w-3xl text-[15px] text-zinc-600 dark:text-zinc-400">
        Esta guía es tu referencia para <b>todo el curso</b>, en presencial y en semipresencial.
        Vuelve a ella cada vez que aparezca algo nuevo. Y fíjate en el detalle: la herramienta con la
        que vas a programar tu CLI… <b>es una CLI</b>.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["OpenCode 1.18.35", "la versión de clase"],
          ["Modelos del centro", "nada sale del instituto"],
          ["Tú decides", "permisos y diffs"],
          ["Todo el curso", "del proyecto 2 en adelante"],
        ].map(([a, b]) => (
          <div key={a} className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 p-4">
            <div className="text-[16px] font-extrabold text-zinc-800 dark:text-zinc-100">{a}</div>
            <div className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">{b}</div>
          </div>
        ))}
      </div>

      <nav aria-label="En esta página" className="mt-6 flex flex-wrap gap-2">
        {INDICE.map(([id, t], i) => (
          <a
            key={id}
            href={`#${id}`}
            className="rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 px-3 py-1 text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 transition hover:border-blue-300 hover:text-blue-700 dark:hover:border-blue-500/50 dark:hover:text-blue-300"
          >
            {i + 1}. {t}
          </a>
        ))}
      </nav>

      {/* 2 · Chat vs agente */}
      <h2 id="chat-agente" className={h2}>Chat vs agente</h2>
      <p className={lead}>
        Hasta ahora usabas la IA como un <b>chat</b>: preguntas, te contesta con texto, y tú copias
        el código y lo pegas. Un <b>agente</b> es el mismo tipo de modelo, pero con{" "}
        <b>herramientas</b>: puede abrir tus ficheros, buscar, editarlos y ejecutar órdenes. Ve el
        resultado de cada paso y decide el siguiente, en bucle, hasta terminar.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className={card}>
          <h3 className="text-[16px] font-bold text-zinc-700 dark:text-zinc-200">Chat</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>No ve tu proyecto: solo lo que le pegas.</li>
            <li>Responde una vez; tú haces el trabajo de copiar, pegar y probar.</li>
            <li>Ideal para preguntar: «¿qué es un decorador?», «¿por qué falla esto?».</li>
          </ul>
        </div>
        <div className={card}>
          <h3 className="text-[16px] font-bold text-blue-700 dark:text-blue-300">Agente (OpenCode)</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Lee el proyecto entero por su cuenta (lo que necesite).</li>
            <li>Edita ficheros y ejecuta órdenes, pidiéndote permiso según tus reglas.</li>
            <li>Comprueba su propio trabajo (ejecuta, ve el error, corrige) antes de darte el turno.</li>
          </ul>
        </div>
      </div>

      <h3 className={h3}>El bucle del agente</h3>
      <DiagramaBucle />

      <h3 className={h3}>Las herramientas del agente</h3>
      <p className={`mt-1 ${muted}`}>
        Son las que tiene el agente <b>build</b> en la versión de clase. Los permisos (más abajo)
        deciden cuáles usa solo, cuáles te pregunta y cuáles tiene prohibidas.
      </p>
      <div className={tabla}>
        <table className="w-full min-w-[620px] border-collapse text-sm">
          <thead>
            <tr className={thead}>
              <th className={`${th} w-[16%]`}>Herramienta</th>
              <th className={th}>Qué hace</th>
              <th className={th}>Dicho de otra forma</th>
            </tr>
          </thead>
          <tbody>
            {HERRAMIENTAS.map(([h, d, o]) => (
              <tr key={h} className={tr}>
                <td className={`${tdMono} font-bold`}>{h}</td>
                <td className={td}>{d}</td>
                <td className={td}>{o}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Nota tono="amber">
        <b>Qué cambia para ti.</b> Ya no escribes cada línea, pero sigues siendo quien{" "}
        <b>decide</b> qué se hace, quien <b>revisa</b> cada diff y cada orden antes de aceptarla, y
        quien <b>responde</b> de lo que entrega. Si el agente mete un fallo y tú lo aceptas, el fallo
        es tuyo. <i>Lo que no sabes explicar, no lo entregas.</i>
      </Nota>

      {/* 3 · Por qué OpenCode */}
      <h2 id="por-que" className={h2}>Por qué OpenCode (y por qué modelos del centro)</h2>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Open source", "Código abierto: puedes ver cómo funciona y no depende de una suscripción."],
          ["En la terminal", "Funciona igual en Linux, Windows y macOS, y dentro de la terminal integrada de VS Code."],
          ["Cualquier proveedor", "Se conecta a decenas de proveedores… y a un servidor propio como el del centro."],
          ["Agentes y permisos a tu medida", "Defines qué puede hacer solo, qué te pregunta y qué nunca hará."],
          ["El mismo concepto que la industria", "Claude Code, Codex o el modo agente de Copilot funcionan igual: lo que aprendes aquí, lo usas allí."],
          ["Configuración en ficheros", "AGENTS.md, comandos, skills y agentes viven en tu repo y viajan con él."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 p-4">
            <div className="font-bold text-zinc-800 dark:text-zinc-100">{t}</div>
            <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          ["Privacidad", "Tu código, tus ficheros y tus prompts se quedan en el servidor del instituto. No alimentan a ninguna empresa."],
          ["Sin cuentas de pago", "No necesitas tarjeta ni suscripción. Te basta la clave que te da el profesor."],
          ["Igual para todos", "Todo el grupo usa el mismo modelo con las mismas condiciones: la nota depende de tu trabajo, no de quién paga más."],
        ].map(([t, d]) => (
          <div key={t} className={card}>
            <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Modelos locales</div>
            <h3 className="mt-1 font-bold">{t}</h3>
            <p className={`mt-1 ${muted}`}>{d}</p>
          </div>
        ))}
      </div>
      <Nota tono="rose">
        <b>Ojo con la versión.</b> En clase usamos <b>OpenCode 1.18.35</b> (la línea OpenCode 1).
        Existe ya <b>OpenCode 2</b>, que cambia la configuración: usa claves en plural (
        <C>permissions</C>, <C>agents</C>, <C>providers</C>) que la 1.18 no entiende. Si un tutorial
        habla de <C>permissions</C> o <C>agents</C> en plural, es OpenCode 2: aquí van en singular (
        <C>permission</C>, <C>agent</C>, <C>provider</C>, <C>command</C>, <C>mcp</C>). Y{" "}
        <b>no instales con <C>brew install opencode</C> ni con <C>pacman -S opencode</C></b>: esos
        traen la V2. Si tu editor marca las claves en singular como <i>deprecated</i>, ignóralo: el
        esquema publicado ya es el de la V2.
      </Nota>

      {/* 4 · Instalación */}
      <h2 id="instalar" className={h2}>Instalación paso a paso</h2>
      <p className={lead}>
        En los equipos del aula ya lo tienes preparado o lo instalas en la primera sesión. En casa
        (semipresencial), elige tu sistema:
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className={`${card} flex min-w-0 flex-col`}>
          <h3 className="text-[16px] font-bold">Linux y macOS</h3>
          <p className={`mt-1 mb-3 ${muted}`}>
            El script oficial, fijando la versión. Instala en <C>~/.opencode/bin</C> y lo añade al
            PATH. Después, <b>abre una terminal nueva</b>.
          </p>
          <Codigo code={`curl -fsSL https://opencode.ai/install | bash -s -- --version 1.18.35`} />
        </div>
        <div className={`${card} flex min-w-0 flex-col`}>
          <h3 className="text-[16px] font-bold">Windows nativo</h3>
          <ol className={`mt-1 mb-3 list-decimal space-y-1 pl-5 ${muted}`}>
            <li>
              Instala <b>Git for Windows</b> (OpenCode usa Git Bash para ejecutar órdenes).
            </li>
            <li>
              Instala <b>Node.js LTS</b> (trae npm).
            </li>
            <li>En una terminal nueva de PowerShell:</li>
          </ol>
          <Codigo code={`npm install -g opencode-ai@1.18.35`} lang="PowerShell" />
        </div>
        <div className={`${card} flex min-w-0 flex-col`}>
          <h3 className="text-[16px] font-bold">Windows con WSL</h3>
          <p className={`mt-1 mb-3 ${muted}`}>
            La alternativa que recomienda la documentación: un Linux dentro de Windows. Si ya usas
            WSL (Ubuntu), dentro de su terminal usa el script de Linux:
          </p>
          <Codigo code={`curl -fsSL https://opencode.ai/install | bash -s -- --version 1.18.35`} lang="Terminal de WSL" />
          <p className={`mt-3 ${muted}`}>
            Ojo: en WSL las variables de entorno y la config van en el <C>~</C> de Linux, no en el de
            Windows.
          </p>
        </div>
      </div>
      <h3 className={h3}>Comprueba que está bien</h3>
      <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="min-w-0">
          <Codigo code={`opencode --version     # debe decir 1.18.35\nopencode debug paths   # dónde guarda config, datos y logs`} />
        </div>
        <p className={muted}>
          Si sale <i>command not found</i> (o <i>no se reconoce</i> en Windows), cierra la terminal y
          abre otra: las terminales abiertas antes de instalar no conocen el PATH nuevo. Si la versión
          no es la 1.18.35, revisa cómo lo instalaste (mira <a className={enlace} href="#errores">Errores típicos</a>).
          En Linux, para copiar y pegar dentro de OpenCode hace falta <C>xclip</C>, <C>xsel</C> o{" "}
          <C>wl-clipboard</C>.
        </p>
      </div>

      {/* 5 · Conectar */}
      <h2 id="conectar" className={h2}>Conectarlo a los modelos del centro</h2>
      <p className={lead}>
        OpenCode necesita saber <b>a qué servidor</b> hablar y <b>con qué clave</b>. Eso va en tu
        configuración <b>global</b> (de tu usuario, en tu equipo), nunca en el repositorio. La URL
        del servidor y la clave te las da el profesor (en clase o en el aula virtual).
      </p>
      <ol className="mt-6 space-y-6">
        <Paso n={1} titulo="Crea el fichero de configuración global">
          <p>
            Ruta: <C>~/.config/opencode/opencode.json</C> (en Windows,{" "}
            <C>%USERPROFILE%\.config\opencode\opencode.json</C>). Crea la carpeta y ábrelo con tu
            editor:
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="min-w-0">
              <Codigo code={`mkdir -p ~/.config/opencode\ncode ~/.config/opencode/opencode.json   # o nano`} lang="bash / zsh" />
            </div>
            <div className="min-w-0">
              <Codigo
                code={`New-Item -ItemType Directory -Force "$env:USERPROFILE\\.config\\opencode"\nnotepad "$env:USERPROFILE\\.config\\opencode\\opencode.json"`}
                lang="PowerShell"
              />
            </div>
          </div>
        </Paso>
        <Paso n={2} titulo="Pega esta configuración tal cual">
          <p>
            No hay ninguna dirección ni clave escrita: <C>{"{env:CENTRO_IA_URL}"}</C> y{" "}
            <C>{"{env:CENTRO_IA_KEY}"}</C> le dicen a OpenCode que las lea de dos{" "}
            <b>variables de entorno</b>.
          </p>
          <div className="mt-3">
            <Codigo code={CONFIG_GLOBAL} kind="json" lang="~/.config/opencode/opencode.json" />
          </div>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li><C>autoupdate: false</C>: que no se actualice solo (seguimos en 1.18.35).</li>
            <li><C>centro</C>: el nombre que le damos al proveedor; es lo que va antes de la barra en <C>model</C>.</li>
            <li><C>@ai-sdk/openai-compatible</C>: el servidor del centro habla el mismo «idioma» que la API de OpenAI.</li>
            <li><C>limit</C>: cuánto contexto y salida admite el modelo. Sin esto OpenCode no sabe cuándo resumir la conversación.</li>
            <li><C>tool_call: true</C>: el modelo sabe usar herramientas. Sin eso no hay agente, solo chat.</li>
            <li><C>model</C> y <C>small_model</C>: el modelo de trabajo y el de tareas ligeras (títulos de sesión…). Aquí, el mismo.</li>
          </ul>
        </Paso>
        <Paso n={3} titulo="Define las variables de entorno">
          <p>
            Sustituye los <C>…</C> por lo que te dé el profesor (la URL termina en <C>/v1</C>).
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="min-w-0">
              <Codigo
                code={`# Añade al final de ~/.bashrc (o ~/.zshrc en macOS)\nexport CENTRO_IA_URL="…"\nexport CENTRO_IA_KEY="…"`}
                lang="Linux / macOS / WSL"
              />
            </div>
            <div className="min-w-0">
              <Codigo code={`setx CENTRO_IA_URL "…"\nsetx CENTRO_IA_KEY "…"`} lang="Windows (PowerShell)" />
            </div>
          </div>
          <p className="mt-3">
            Y después, <b>abre una terminal nueva</b>: las variables solo existen en las terminales
            que se abren después.
          </p>
        </Paso>
        <Paso n={4} titulo="Comprueba la conexión">
          <div className="mt-1">
            <Codigo
              code={`opencode models centro              # debe salir centro/qwen3.8-flash-next\nopencode debug config               # config final; la clave sale enmascarada\nopencode run "Responde solo: hola"  # prueba real con el modelo`}
            />
          </div>
          <p className="mt-3">
            Si <C>opencode run</C> se queda esperando sin fin, el servidor no responde: OpenCode
            reintenta para siempre. Sal con <b>Ctrl+C</b> y revisa la URL y que estás en la red del
            centro.
          </p>
        </Paso>
      </ol>
      <Nota tono="emerald">
        <b>¿Por qué variables y no la clave escrita en el fichero?</b> Porque así la clave no está en{" "}
        <b>ningún fichero</b>, y por tanto no puede acabar por accidente en un commit, en una captura
        o en un repo público. Es la misma regla que en tu proyecto: <i>ninguna clave en el repo ni en
        su historial</i> (es un mínimo del proyecto 2). En la semana 3, tu propia CLI leerá las{" "}
        <b>mismas variables</b> desde Python.
      </Nota>
      <Nota>
        <b>Semipresencial:</b> puedes usar OpenCode en casa, también dentro de la terminal integrada
        de VS Code. Cómo conectarte desde casa a los modelos del centro lo explica el profesor en la{" "}
        <b>tutoría colectiva de arranque</b>.
      </Nota>

      {/* 6 · TUI */}
      <h2 id="tui" className={h2}>Primeros pasos en la TUI</h2>
      <p className={lead}>
        <b>TUI</b> (<i>Text User Interface</i>) es una interfaz completa dentro de la terminal. Se
        abre entrando en la carpeta del proyecto y escribiendo <C>opencode</C>:
      </p>
      <div className="mt-4 max-w-xl">
        <Codigo code={`cd ~/cli-tareas\nopencode`} />
      </div>
      <EsquemaTui />

      <h3 className={h3}>Lo que puedes escribir en la caja</h3>
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className={card}>
          <div className="font-mono text-lg font-bold text-blue-700 dark:text-blue-300">texto normal</div>
          <p className={`mt-1 ${muted}`}>Tu petición, en español. Concreta: qué fichero, qué orden, qué criterio de «terminado».</p>
        </div>
        <div className={card}>
          <div className="font-mono text-lg font-bold text-blue-700 dark:text-blue-300">@fichero</div>
          <p className={`mt-1 ${muted}`}>
            Adjunta un fichero (con búsqueda difusa): <C>@src/tareas/cli.py</C>. También invoca
            subagentes: <C>@explore …</C>.
          </p>
        </div>
        <div className={card}>
          <div className="font-mono text-lg font-bold text-blue-700 dark:text-blue-300">!orden</div>
          <p className={`mt-1 ${muted}`}>
            Ejecuta una orden tú mismo y el agente ve la salida: <C>!uv run tareas --help</C>. Escribir{" "}
            <C>/</C> abre la lista de comandos.
          </p>
        </div>
      </div>
      <p className={`mt-5 ${lead}`}>Un ejemplo de primera petición en el agente plan:</p>
      <PromptBlock
        text={`Lee @AGENTS.md y @src/tareas/cli.py. Quiero añadir la orden «version» que muestre la versión de __init__.py. No cambies nada todavía: explícame en 5 líneas qué ficheros tocarías y cómo comprobaré que funciona.`}
      />

      <h3 className={h3}>Atajos y comandos de barra</h3>
      <p className={`mt-1 ${muted}`}>
        La <b>tecla líder</b> es <C>ctrl+x</C>: la pulsas, sueltas y pulsas la letra (por ejemplo{" "}
        <C>ctrl+x</C> y luego <C>u</C> = deshacer).
      </p>
      <div className={tabla}>
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className={thead}>
              <th className={`${th} w-[20%]`}>Atajo</th>
              <th className={`${th} w-[18%]`}>Comando</th>
              <th className={th}>Para qué</th>
            </tr>
          </thead>
          <tbody>
            {ATAJOS.map(([a, c, d]) => (
              <tr key={a + c} className={tr}>
                <td className={tdMono}>{a}</td>
                <td className={tdMono}>{c}</td>
                <td className={td}>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={card}>
          <h3 className="text-[16px] font-bold">Sesiones</h3>
          <p className={`mt-1 mb-3 ${muted}`}>
            Cada conversación es una <b>sesión</b> y se guarda. Abre una nueva para cada tarea (
            <C>/new</C>), recupera una anterior con <C>/sessions</C>, o continúa la última desde la
            terminal:
          </p>
          <Codigo code={`opencode -c            # continúa la última sesión\nopencode session list  # lista de sesiones`} />
        </div>
        <div className={card}>
          <h3 className="text-[16px] font-bold">/undo y /redo</h3>
          <p className={`mt-1 ${muted}`}>
            <C>/undo</C> borra tu último mensaje, sus respuestas y <b>revierte los cambios en
            ficheros</b>; <C>/redo</C> lo restaura. Funciona con <b>instantáneas internas</b> que
            OpenCode guarda aparte: <b>no hace commits en tu repo</b>. Pero necesita que el proyecto{" "}
            <b>sea un repositorio git con al menos un commit</b>. Y no deshace efectos externos: un
            paquete instalado, una orden que movió ficheros fuera, un <C>git push</C>…
          </p>
        </div>
        <div className={card}>
          <h3 className="text-[16px] font-bold">/compact</h3>
          <p className={`mt-1 ${muted}`}>
            Resume la conversación para liberar contexto. OpenCode lo hace solo cuando se llena, pero
            hacerlo tú al cambiar de fase (o abrir <C>/new</C>) da mejores resultados: un modelo con
            menos ruido se equivoca menos.
          </p>
        </div>
        <div className={card}>
          <h3 className="text-[16px] font-bold">/export</h3>
          <p className={`mt-1 ${muted}`}>
            Exporta la conversación a Markdown y la abre en tu editor. Útil para guardar el prompt
            clave y lo que respondió en <C>docs/prompts.md</C>, que forma parte de tu proceso
            evaluable.
          </p>
        </div>
      </div>

      {/* 7 · Agentes */}
      <h2 id="agentes" className={h2}>Agentes: build, plan y subagentes</h2>
      <p className={lead}>
        Un <b>agente</b> es una configuración del modelo: un prompt, unas herramientas y unos
        permisos. OpenCode trae varios, y puedes crear los tuyos.
      </p>
      <div className={tabla}>
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className={thead}>
              <th className={`${th} w-[14%]`}>Agente</th>
              <th className={`${th} w-[16%]`}>Tipo</th>
              <th className={th}>Qué puede hacer</th>
              <th className={th}>Cuándo</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["build", "primario (por defecto)", "Todas las herramientas, con los permisos de tu config.", "Para hacer: editar, crear, ejecutar."],
              ["plan", "primario", "No puede editar ficheros (salvo sus propios planes). Ojo: de fábrica bash NO está restringido.", "Para pensar: analizar, proponer, revisar un plan."],
              ["general", "subagente", "Investigación y tareas de varios pasos. Puede modificar ficheros.", "Una subtarea que no quieres que ensucie tu conversación."],
              ["explore", "subagente", "Solo lectura: busca y lee (no edita), aunque puede ejecutar órdenes.", "«¿Dónde se valida el JSON?», «¿qué usa a motor.py?»"],
            ].map(([a, t, p, c]) => (
              <tr key={a} className={tr}>
                <td className={`${tdMono} font-bold`}>{a}</td>
                <td className={td}>{t}</td>
                <td className={td}>{p}</td>
                <td className={td}>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Nota tono="amber">
        <b>Plan solo bloquea ediciones.</b> El agente plan de fábrica no puede escribir ficheros,
        pero sí ejecutar órdenes con tus permisos generales. Y si tu configuración dice{" "}
        <C>{'"edit": "ask"'}</C>, esa regla le alcanza también a plan. Por eso el <C>opencode.json</C> del
        proyecto le pone <C>{'"edit": "deny"'}</C> y deja que las órdenes sigan tus reglas de bash (las
        peligrosas siguen en deny). Ojo: si le pusieras <C>{'"bash": "ask"'}</C>, anularías esos deny y{" "}
        <C>rm</C> pasaría a «preguntar». Compruébalo con <C>opencode debug agent plan</C>.
      </Nota>
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={card}>
          <h3 className="text-[16px] font-bold">Cambiar e invocar</h3>
          <ul className={`mt-2 list-disc space-y-1 pl-5 ${muted}`}>
            <li><b>Tab</b> alterna entre build y plan (mira la barra inferior).</li>
            <li>
              Un subagente se invoca con <C>@</C>: <C>@explore busca dónde se lee acciones.json</C>.
            </li>
            <li>
              El agente principal también puede lanzarlos solo (herramienta <C>task</C>), eligiéndolos
              por su descripción.
            </li>
            <li>Los subagentes trabajan en una sesión hija: su exploración no llena tu contexto.</li>
          </ul>
          <div className="mt-3">
            <Codigo code={`opencode agent list         # agentes cargados\nopencode debug agent plan   # reglas efectivas de uno`} />
          </div>
        </div>
        <div className={`${card} min-w-0`}>
          <h3 className="text-[16px] font-bold">Crea los tuyos</h3>
          <p className={`mt-1 ${muted}`}>
            Un fichero Markdown en <C>.opencode/agents/</C>: el nombre del fichero es el nombre del
            agente, el frontmatter su configuración (<C>description</C> es obligatoria;{" "}
            <C>mode: subagent</C>, <C>temperature</C>, <C>permission</C>…) y el cuerpo, su prompt. Es
            el revisor de la semana 2:
          </p>
        </div>
      </div>
      <div className="mt-4">
        <Codigo code={REVISOR_MD} kind="md" lang=".opencode/agents/revisor.md" />
      </div>
      <p className={`mt-3 ${muted}`}>
        Se usa así: <C>@revisor revisa src/tareas/motor.py</C>. No puede editar ni navegar por la web;
        solo mirar diffs e historial sin preguntar. Como es un fichero del repo, el revisor viaja con
        tu proyecto.
      </p>

      {/* 8 · Permisos */}
      <h2 id="permisos" className={h2}>Permisos: lo que puede hacer sin preguntarte</h2>
      <p className={lead}>
        De fábrica, OpenCode tiene casi todo en <b>allow</b>: edita y ejecuta órdenes sin preguntar.
        En el curso eso no vale. Cada herramienta (y cada orden de bash) acaba en una de tres
        respuestas:
      </p>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          ["allow", "Lo hace sin preguntar.", "emerald"],
          ["ask", "Se para, te enseña qué va a hacer y espera.", "amber"],
          ["deny", "Bloqueado. Ni lo intenta.", "rose"],
        ].map(([a, d, c]) => (
          <div
            key={a}
            className={`rounded-2xl border p-4 ${
              c === "emerald"
                ? "border-emerald-200 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10"
                : c === "amber"
                  ? "border-amber-200 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10"
                  : "border-rose-200 bg-rose-50 dark:border-rose-500/30 dark:bg-rose-500/10"
            }`}
          >
            <div className="font-mono text-lg font-extrabold text-zinc-800 dark:text-zinc-100">{a}</div>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{d}</p>
          </div>
        ))}
      </div>
      <p className={`mt-4 ${muted}`}>
        Cuando pregunta, respondes <b>once</b> (solo esta vez), <b>always</b> (lo mismo durante el
        resto de la sesión) o <b>reject</b> (no). Las órdenes que te pregunta, <b>léelas antes de
        aceptar</b>.
      </p>

      <h3 className={h3}>La regla de oro: gana la última que coincide</h3>
      <p className={`mt-1 ${muted}`}>
        Las reglas se leen de arriba abajo y, si varias coinciden, <b>manda la última</b>. Por eso{" "}
        <C>&quot;*&quot;</C> va primero (lo general) y las excepciones después, con los{" "}
        <C>deny</C> al final. El <C>*</C> significa «cualquier cosa»: <C>git diff *</C> vale para{" "}
        <C>git diff</C> y para <C>git diff src/</C>.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {[
          {
            orden: "git diff src/tareas/cli.py",
            reglas: [["*", "ask", true], ["git diff *", "allow", true], ["rm *", "deny", false]],
            res: "allow",
          },
          {
            orden: "rm -r build",
            reglas: [["*", "ask", true], ["git diff *", "allow", false], ["rm *", "deny", true]],
            res: "deny",
          },
        ].map((e) => (
          <div key={e.orden} className={card}>
            <div className="font-mono text-[13px] text-zinc-500 dark:text-zinc-400">
              orden: <span className="font-bold text-zinc-800 dark:text-zinc-100">{e.orden}</span>
            </div>
            <ul className="mt-3 space-y-1.5 font-mono text-[13px]">
              {e.reglas.map(([p, a, ok], i) => {
                const ultima = ok && e.reglas.slice(i + 1).every((r) => !r[2]);
                return (
                  <li
                    key={String(p)}
                    className={`flex justify-between rounded-lg border px-3 py-1.5 ${
                      ultima
                        ? "border-blue-400 bg-blue-50 dark:border-blue-400/60 dark:bg-blue-500/15"
                        : ok
                          ? "border-zinc-300 dark:border-white/15"
                          : "border-dashed border-zinc-200 text-zinc-400 dark:border-white/10 dark:text-zinc-500"
                    }`}
                  >
                    <span>&quot;{p}&quot;: {a}</span>
                    <span className="font-sans text-[11px] font-bold">
                      {ultima ? "gana ✓" : ok ? "coincide" : "no coincide"}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className={`mt-3 ${muted}`}>
              Resultado: <b className="font-mono">{e.res}</b>
            </p>
          </div>
        ))}
      </div>

      <h3 className={h3}>El opencode.json del proyecto</h3>
      <p className={`mt-1 ${muted}`}>
        Va en la <b>raíz de tu repo</b> (<C>cli-tareas/opencode.json</C>) y <b>se sube a git</b>: no
        lleva claves, solo reglas. Se fusiona con tu config global.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="min-w-0">
          <Codigo code={CONFIG_PROYECTO} kind="json" lang="cli-tareas/opencode.json" />
        </div>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className={thead}>
                <th className={`${th} w-[42%]`}>Regla</th>
                <th className={th}>Qué significa</th>
              </tr>
            </thead>
            <tbody>
              {REGLAS_PROYECTO.map(([r, d]) => (
                <tr key={r} className={tr}>
                  <td className="px-3 py-2 align-top font-mono text-[12px] text-zinc-800 dark:text-zinc-200">{r}</td>
                  <td className="px-3 py-2 align-top text-[13px] text-zinc-600 dark:text-zinc-400">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Nota tono="amber">
        <b>¿Por qué no está permitido <C>uv run tareas ejecutar …</C>?</b> Porque esa orden{" "}
        <b>mueve, renombra o borra ficheros de verdad</b>. Si el agente se equivoca de carpeta, los
        daños son reales y <C>/undo</C> no los deshace. Esa orden siempre te pregunta, y tú la
        pruebas en <C>~/pruebas-tareas</C> con <C>--simular</C>. Y <C>git push</C> lo haces tú.
      </Nota>

      <h3 className={h3}>La trampa al fusionar configuraciones</h3>
      <p className={`mt-1 ${muted}`}>
        Las configuraciones (global, proyecto, agente) se <b>fusionan</b>, no se sustituyen. Si la
        global dice <C>{'"rm *": "deny"'}</C> y otra posterior dice <C>{'"*": "allow"'}</C>, el
        resultado queda en ese orden… y como gana la última, <b><C>rm</C> queda permitido</b>.
        Solución: repite los <C>deny</C> importantes <b>después</b> del <C>&quot;*&quot;</C> en el
        mismo bloque (como hace el fichero de arriba) y compruébalo con{" "}
        <C>opencode debug agent build</C>.
      </p>
      <Nota tono="rose">
        <b>Nunca uses <C>--auto</C>.</b> <C>opencode --auto</C> (o el «auto-approve» de la paleta)
        aprueba solo todo lo que está en ask. Es decir: desactiva tu revisión. Un modelo que entiende
        mal una petición puede borrar, sobrescribir o ejecutar lo que no debe, y tú ni lo verás. En
        el curso está prohibido; en tu carpeta personal, también.
      </Nota>

      {/* 9 · AGENTS.md */}
      <h2 id="agents-md" className={h2}>AGENTS.md: la memoria del proyecto</h2>
      <p className={lead}>
        El modelo no recuerda nada entre sesiones. <C>AGENTS.md</C> es un fichero Markdown en la raíz
        del proyecto que OpenCode <b>carga al empezar cada sesión</b>: qué es el proyecto, cómo se
        ejecuta, qué normas hay que respetar. Es un estándar: lo leen también otros agentes.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-4">
          <div className={card}>
            <h3 className="text-[16px] font-bold">Créalo con /init</h3>
            <p className={`mt-1 ${muted}`}>
              <C>/init</C> analiza el repo, puede hacerte alguna pregunta y crea (o mejora) el{" "}
              <C>AGENTS.md</C>. Después <b>lo editas tú</b>: quita lo que sobra, añade tus normas.
              Corto y concreto: se carga siempre y ocupa contexto.
            </p>
          </div>
          <div className={card}>
            <h3 className="text-[16px] font-bold">Global vs proyecto</h3>
            <ul className={`mt-2 list-disc space-y-1 pl-5 ${muted}`}>
              <li>
                <b>Proyecto</b>: <C>AGENTS.md</C> en la raíz. <b>Se sube a git</b>: cualquiera (o
                cualquier agente) que abra tu repo hereda las normas.
              </li>
              <li>
                <b>Global</b>: <C>~/.config/opencode/AGENTS.md</C>. Tus preferencias personales para
                todos los proyectos («respóndeme en español»).
              </li>
            </ul>
          </div>
        </div>
        <div className="min-w-0">
          <Codigo code={AGENTS_MD} kind="md" lang="cli-tareas/AGENTS.md" />
        </div>
      </div>
      <p className={`mt-3 ${muted}`}>
        Cada vez que el agente repita un error («otra vez ha usado os.system»), la solución no es
        repetírselo en cada sesión: es <b>añadir una línea a AGENTS.md</b> y hacer commit. Los
        cambios en AGENTS.md cuentan tu proceso.
      </p>

      {/* 10 · Comandos */}
      <h2 id="comandos" className={h2}>Comandos personalizados</h2>
      <p className={lead}>
        Si escribes el mismo tipo de prompt muchas veces, conviértelo en un <b>comando</b>: un
        fichero <C>.opencode/commands/&lt;nombre&gt;.md</C> que se lanza con <C>/nombre</C>.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[2fr_3fr]">
        <div className={card}>
          <h3 className="text-[16px] font-bold">Piezas</h3>
          <ul className={`mt-2 list-disc space-y-1.5 pl-5 ${muted}`}>
            <li>
              <b>Frontmatter</b>: <C>description</C> (lo que ves en la lista), <C>agent</C> (con qué
              agente se ejecuta) y, si quieres, <C>model</C> o <C>subtask: true</C> (como subtarea, sin
              ensuciar tu conversación).
            </li>
            <li>
              <C>$ARGUMENTS</C>: todo lo que escribes detrás del comando. <C>$1</C>, <C>$2</C>…: cada
              argumento por separado (entre comillas si lleva espacios).
            </li>
            <li>
              <C>!`orden`</C>: ejecuta la orden al lanzar el comando y mete su salida en el prompt.
            </li>
            <li>
              <C>@fichero</C>: adjunta un fichero.
            </li>
          </ul>
        </div>
        <div className="min-w-0">
          <Codigo code={NUEVA_ACCION_MD} kind="md" lang=".opencode/commands/nueva-accion.md" />
        </div>
      </div>
      <p className={`mt-4 ${muted}`}>Se usa así (semana 2):</p>
      <PromptBlock text={`/nueva-accion renombrar-capturas "Renombra las capturas de pantalla con su fecha y un contador"`} />

      {/* 11 · Skills */}
      <h2 id="skills" className={h2}>Skills: conocimiento bajo demanda</h2>
      <p className={lead}>
        Una <b>skill</b> es un paquete de conocimiento que el agente <b>carga solo cuando lo
        necesita</b>. El agente ve una lista con el nombre y la descripción de cada skill; si una le
        sirve para lo que está haciendo, la carga con la herramienta <C>skill</C> y lee el contenido
        completo. Así no gasta contexto en lo que no toca.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-4">
          <div className={card}>
            <h3 className="text-[16px] font-bold">Dónde y cómo</h3>
            <ul className={`mt-2 list-disc space-y-1.5 pl-5 ${muted}`}>
              <li>
                Una carpeta por skill: <C>.opencode/skills/&lt;nombre&gt;/SKILL.md</C>.
              </li>
              <li>
                <C>name</C>: minúsculas, números y guiones, y <b>igual que el nombre de la carpeta</b>.
              </li>
              <li>
                <C>description</C>: obligatoria. Di <b>qué hace y cuándo usarla</b>: es lo único que el
                agente lee para decidir.
              </li>
              <li>
                Compruébalo con <C>/skills</C> en la TUI (o <C>opencode debug skill</C>).
              </li>
            </ul>
          </div>
        </div>
        <div className="min-w-0">
          <Codigo code={SKILL_MD} kind="md" lang=".opencode/skills/acciones-json/SKILL.md" />
        </div>
      </div>
      <h3 className={h3}>¿AGENTS.md, skill o comando?</h3>
      <div className={tabla}>
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <thead>
            <tr className={thead}>
              <th className={`${th} w-[18%]`}></th>
              <th className={th}>AGENTS.md</th>
              <th className={th}>Skill</th>
              <th className={th}>Comando</th>
            </tr>
          </thead>
          <tbody>
            {COMPARA.map(([k, a, s, c]) => (
              <tr key={k} className={tr}>
                <td className="px-3.5 py-2.5 align-top font-semibold text-zinc-800 dark:text-zinc-200">{k}</td>
                <td className={td}>{a}</td>
                <td className={td}>{s}</td>
                <td className={td}>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={`mt-3 ${muted}`}>
        Regla rápida: lo que debe saber <b>siempre</b> → AGENTS.md; lo que debe saber <b>a veces</b>{" "}
        → skill; lo que <b>tú pides</b> a menudo → comando. Y los tres se suben a git.
      </p>

      {/* 12 · MCP */}
      <h2 id="mcp" className={h2}>MCP: enchufes para herramientas externas</h2>
      <p className={lead}>
        El <b>Model Context Protocol</b> (MCP) es un estándar para conectar un agente con{" "}
        <b>herramientas de fuera</b>: documentación actualizada de librerías, un navegador, una base
        de datos… Cada <b>servidor MCP</b> es un enchufe que añade herramientas nuevas (se llaman{" "}
        <C>servidor_herramienta</C>). OpenCode es el cliente; tú decides qué enchufas.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">
        <div className="min-w-0">
          <Codigo code={MCP_JSON} kind="json" lang="opencode.json (bloque mcp)" />
        </div>
        <div className={card}>
          <h3 className="text-[16px] font-bold">Dos tipos</h3>
          <ul className={`mt-2 list-disc space-y-1.5 pl-5 ${muted}`}>
            <li>
              <b>remote</b>: un servidor en Internet; lleva <C>url</C> (y si hace falta,{" "}
              <C>headers</C>).
            </li>
            <li>
              <b>local</b>: un programa que se arranca en tu equipo; <C>command</C> es un{" "}
              <b>array</b> (<C>[&quot;npx&quot;, &quot;-y&quot;, …]</C>), nunca una cadena: si no,
              OpenCode no arranca.
            </li>
            <li>
              <C>enabled: false</C>: definido pero apagado. Lo enciendes cuando lo necesitas.
            </li>
          </ul>
          <div className="mt-3">
            <Codigo code={`opencode mcp list   # estado de cada servidor`} />
          </div>
          <p className={`mt-3 ${muted}`}>
            En la TUI, <C>/mcps</C> los lista y la barra espaciadora los enciende o apaga.
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Nota tono="amber">
          <b>Gastan contexto.</b> Cada servidor encendido añade la descripción de <b>todas</b> sus
          herramientas a cada petición. Dos o tres MCP pueden comerse buena parte del contexto y
          hacer que el agente use peor sus herramientas. Por eso context7 va con{" "}
          <C>enabled: false</C> y se activa solo cuando hace falta (semana 3).
        </Nota>
        <Nota tono="rose">
          <b>Riesgos.</b> Un MCP local ejecuta código con tus permisos; uno remoto recibe lo que el
          agente le envía. Solo servidores conocidos y de confianza, y si piden token, nunca en claro:{" "}
          <C>{'"headers": { "CONTEXT7_API_KEY": "{env:CONTEXT7_API_KEY}" }'}</C>.
        </Nota>
      </div>
      <p className={`mt-3 ${muted}`}>
        Detalle: <C>opencode mcp add</C> escribe en tu config <b>global</b>, aunque estés dentro del
        proyecto. Si quieres el MCP en el proyecto, edita su <C>opencode.json</C> a mano.
      </p>

      {/* 13 · Flujo */}
      <h2 id="flujo" className={h2}>El flujo de trabajo del curso</h2>
      <p className={lead}>
        El mismo en todas las sesiones. Si te saltas un paso, lo notarás (y se notará en tus
        commits).
      </p>
      <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FLUJO.map((p, i) => (
          <li key={p.titulo} className={`${card} flex flex-col`}>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-blue-600/25 dark:text-blue-400/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                  p.quien === "Tú"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                    : p.quien === "Plan"
                      ? "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
                }`}
              >
                {p.quien}
              </span>
            </div>
            <h3 className="mt-1 text-[16px] font-bold">{p.titulo}</h3>
            <p className={`mt-1 flex-1 ${muted}`}>{p.texto}</p>
            {p.ej && (
              <span className="mt-3 w-fit rounded-md bg-zinc-100 dark:bg-white/10 px-2 py-0.5 font-mono text-[12px] text-zinc-700 dark:text-zinc-300">
                {p.ej}
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={card}>
          <h3 className="text-[16px] font-bold">Buenas prácticas con modelos locales</h3>
          <ul className={`mt-2 list-disc space-y-1.5 pl-5 ${muted}`}>
            <li><b>Tareas pequeñas</b>: una orden, una función, un error. Nunca «hazme la CLI entera».</li>
            <li><b>Una sesión por tarea</b> (<C>/new</C>): menos ruido, menos errores.</li>
            <li><b>Plan antes de build</b>: corregir un plan cuesta segundos; corregir código, horas.</li>
            <li><b>Lee cada diff</b> antes de aceptarlo. Si no lo entiendes, pregunta antes de aceptar.</li>
            <li>Adjunta solo los ficheros necesarios con <C>@</C>, no «lee todo el proyecto».</li>
            <li><C>/compact</C> cuando la conversación se alargue.</li>
            <li><b>Commits pequeños hechos por ti</b>, con mensajes que cuentan el paso.</li>
            <li><b>Guarda tus prompts</b> clave en <C>docs/prompts.md</C> (o <C>/export</C>).</li>
          </ul>
        </div>
        <div className={card}>
          <h3 className="text-[16px] font-bold">Seguridad</h3>
          <ul className={`mt-2 list-disc space-y-1.5 pl-5 ${muted}`}>
            <li><b>Secretos</b>: las claves solo en variables de entorno. Nunca en el código, en <C>opencode.json</C> ni en el chat.</li>
            <li><C>.env</C> en el <C>.gitignore</C> <b>antes</b> del primer commit; el agente tiene prohibido leerlo.</li>
            <li><b>Permisos</b> del proyecto siempre activos: <C>edit: ask</C>, bash en ask, <C>rm</C>/<C>sudo</C>/<C>git push</C> en deny.</li>
            <li><b>Nunca <C>--auto</C></b>.</li>
            <li><b>Nunca en carpetas reales</b>: las acciones de tu CLI se prueban en <C>~/pruebas-tareas</C> y con <C>--simular</C>.</li>
            <li>No abras OpenCode en tu carpeta personal (<C>~</C>): ábrelo dentro del proyecto.</li>
          </ul>
        </div>
      </div>

      {/* 14 · Ruta */}
      <h2 id="ruta" className={h2}>Tu ruta con OpenCode en el curso</h2>
      <p className={lead}>
        No se aprende todo el primer día. Cada semana del proyecto 2 añade una pieza. En
        semipresencial, las semanas 1 y 2 son la quincena 3 y las semanas 3 y 4, la quincena 4.
      </p>
      <div className={tabla}>
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className={thead}>
              <th className={`${th} w-[22%]`}>Semana</th>
              <th className={th}>Qué aprendes de OpenCode</th>
            </tr>
          </thead>
          <tbody>
            {RUTA.map((r) => (
              <tr key={r.sem} className={`${tr} ${r.avance ? "opacity-80" : ""}`}>
                <td className="px-3.5 py-3 align-top">
                  <div className="font-bold text-zinc-800 dark:text-zinc-200">{r.sem}</div>
                  <div className="text-[12px] text-zinc-500 dark:text-zinc-400">{r.fechas}</div>
                  {r.sesion && (
                    <Link href={r.sesion[1]} className={`mt-1 block text-[13px] ${enlace}`}>
                      {r.sesion[0]} →
                    </Link>
                  )}
                </td>
                <td className={td}>
                  <ul className="list-disc space-y-1 pl-5">
                    {r.opencode.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className={h3}>Más adelante en el curso</h3>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Plugins", "Código JavaScript/TypeScript que reacciona a lo que hace el agente: por ejemplo, impedir que lea ciertos ficheros."],
          ["Herramientas propias", "Le das al agente herramientas nuevas escritas por ti en .opencode/tools/."],
          ["opencode run en scripts", "Sin interfaz: un script o la CI le pasa una tarea. Siempre con permisos exactos (nunca --auto) y con un tiempo máximo, porque si el servidor no responde reintenta sin fin."],
          ["opencode github", "El agente responde a comentarios en issues y PR de GitHub. Ojo: los servidores de GitHub no llegan a la red del centro."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 p-4">
            <div className="font-bold text-zinc-800 dark:text-zinc-100">{t}</div>
            <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400">{d}</p>
          </div>
        ))}
      </div>

      {/* 15 · Errores */}
      <h2 id="errores" className={h2}>Errores típicos y soluciones</h2>
      <p className={lead}>
        Antes de pedir ayuda, busca aquí el síntoma. Para diagnosticar casi todo:{" "}
        <C>opencode debug config</C>.
      </p>
      <div className={tabla}>
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className={thead}>
              <th className={`${th} w-[30%]`}>Síntoma</th>
              <th className={th}>Causa probable</th>
              <th className={th}>Solución</th>
            </tr>
          </thead>
          <tbody>
            {ERRORES.map(([s, c, sol]) => (
              <tr key={s} className={tr}>
                <td className="px-3.5 py-2.5 align-top font-semibold text-zinc-800 dark:text-zinc-200">{s}</td>
                <td className={td}>{c}</td>
                <td className={td}>{sol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 max-w-2xl">
        <Codigo
          code={`opencode debug config        # config final fusionada (claves enmascaradas)\nopencode debug agent build   # permisos efectivos de un agente\nopencode debug skill         # skills que encuentra\nopencode mcp list            # estado de los MCP`}
          lang="Diagnóstico"
        />
      </div>

      {/* 16 · Enlaces */}
      <h2 id="enlaces" className={h2}>Enlaces</h2>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["/programacion-ia/cli/", "Proyecto 2 · CLI tareas", "El proyecto en el que estrenas OpenCode."],
          ["/programacion-ia/presencial/", "Grupo presencial", "Horario, proyectos y avisos del grupo."],
          ["/programacion-ia/semipresencial/", "Grupo semipresencial", "Quincenas, tutorías y entregas."],
          ["/programacion-ia/acceso/", "Acceso al aula", "Campus: entregas, rúbricas y notas."],
        ].map(([href, t, d]) => (
          <Link
            key={href}
            href={href}
            className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span className="block text-[16px] font-bold">{t} →</span>
            <span className="mt-1 block text-sm text-zinc-600 dark:text-zinc-400">{d}</span>
          </Link>
        ))}
      </div>
      <p className={`mt-5 ${muted}`}>
        Documentación oficial:{" "}
        <a href="https://opencode.ai/docs" target="_blank" rel="noopener noreferrer" className={enlace}>
          opencode.ai/docs
        </a>
        . Ya describe la versión 1.19, pero lo esencial coincide con la 1.18.35 de clase. No sigas la
        documentación de OpenCode 2 (<C>/v2/docs</C>) ni los tutoriales con claves en plural.
      </p>
    </div>
  );
}
