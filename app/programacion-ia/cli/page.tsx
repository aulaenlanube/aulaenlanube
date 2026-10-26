import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CodeBlock from "@/components/CodeBlock";
import { RUBRICA_CLI } from "@/lib/campus/rubricas";

export const metadata: Metadata = {
  title: "Proyecto 2 · CLI «tareas con IA» — Curso de Programación con IA",
  description:
    "Proyecto 2: tu propia herramienta de terminal en Python con Typer y uv. Acciones en acciones.json, IA y multiplataforma (Linux, Windows y macOS).",
};

/* ------------------------------------------------------------------ */
/* Resaltado mínimo para shell, Python, JSON y TOML (en compilación).  */
/* ------------------------------------------------------------------ */

type Kind = "sh" | "py" | "json" | "toml" | "txt";

const PY_KW = new Set([
  "def", "import", "from", "return", "if", "else", "elif", "for", "in", "class", "with",
  "as", "try", "except", "raise", "not", "and", "or", "None", "True", "False", "pass",
]);

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
    // Comentarios con # (shell, PowerShell, Python, TOML)
    if (c === "#" && kind !== "json" && /\s/.test(prev)) {
      out += span("com", l.slice(i));
      break;
    }
    // Cadenas
    if (c === '"' || (c === "'" && kind !== "json")) {
      let j = i + 1;
      while (j < n && l[j] !== c) {
        if (l[j] === "\\") j++;
        j++;
      }
      out += span("str", l.slice(i, j + 1));
      i = j + 1;
      continue;
    }
    // Opciones de línea de órdenes: --simular, -n, -ExecutionPolicy…
    if (kind === "sh" && c === "-" && /\s/.test(prev) && /[A-Za-z-]/.test(l[i + 1] ?? "")) {
      let j = i;
      while (j < n && /[^\s=]/.test(l[j])) j++;
      out += span("kw", l.slice(i, j));
      i = j;
      continue;
    }
    // Decoradores de Python
    if (kind === "py" && c === "@") {
      let j = i + 1;
      while (j < n && /[\w.]/.test(l[j])) j++;
      out += span("ann", l.slice(i, j));
      i = j;
      continue;
    }
    // Tablas de TOML: [project.scripts]
    if (kind === "toml" && c === "[" && i === 0) {
      out += span("type", l);
      break;
    }
    // Palabras
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < n && /\w/.test(l[j])) j++;
      const w = l.slice(i, j);
      if (kind === "py" && PY_KW.has(w)) out += span("ctrl", w);
      else if (kind === "sh" && out.replace(/<[^>]+>/g, "").trim() === "") out += span("fn", w);
      else if (kind === "json" && (w === "true" || w === "false" || w === "null")) out += span("lit", w);
      else out += esc(w);
      i = j;
      continue;
    }
    // Números
    if (/\d/.test(c) && kind !== "sh") {
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

function pintar(raw: string, kind: Kind) {
  const code = raw.replace(/^\n+/, "").replace(/\s+$/, "");
  return { code, lines: code.split("\n").map((l) => pintarLinea(l, kind)) };
}

function Codigo({ code, kind = "sh", lang }: { code: string; kind?: Kind; lang?: string }) {
  const etiqueta =
    lang ?? { sh: "Terminal", py: "Python", json: "JSON", toml: "TOML", txt: "Salida" }[kind];
  return <CodeBlock {...pintar(code, kind)} lang={etiqueta} />;
}

/* ------------------------------------------------------------------ */
/* Estilos compartidos                                                 */
/* ------------------------------------------------------------------ */

const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";
const card =
  "rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm";
const h2 = "mt-12 scroll-mt-20 text-2xl font-extrabold tracking-tight";
const lead = "mt-2 max-w-3xl text-[15px] text-zinc-600 dark:text-zinc-400";
const muted = "text-sm text-zinc-600 dark:text-zinc-400";
const code = "rounded bg-zinc-100 dark:bg-white/10 px-1 py-0.5 font-mono text-[13px]";
const th = "px-3.5 py-2.5 text-left font-bold";
const td = "px-3.5 py-2.5 align-top text-zinc-600 dark:text-zinc-400";
const tr = "border-t border-zinc-200 dark:border-white/10";

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

/* ------------------------------------------------------------------ */
/* Datos                                                               */
/* ------------------------------------------------------------------ */

const INDICE = [
  ["que-es", "Qué es una CLI"],
  ["anatomia", "Anatomía de una orden"],
  ["mundo", "Las CLI que usa el mundo"],
  ["ciclo", "Cómo se desarrolla"],
  ["tecnologias", "Tecnologías"],
  ["multiplataforma", "Multiplataforma"],
  ["instalar", "Instalarla"],
  ["proyecto", "El proyecto"],
  ["planificacion", "Semanas 1 y 2"],
  ["evaluacion", "Cómo se evalúa"],
] as const;

const GUI_CLI = [
  ["Gana la GUI (ventanas y ratón)", "emerald", [
    "Explorar algo que no conoces: ves las opciones en pantalla.",
    "Tareas visuales: retocar una foto, maquetar, editar vídeo a mano.",
    "Usuarios que no quieren aprender órdenes.",
  ]],
  ["Gana la CLI (texto y teclado)", "blue", [
    "Automatizar y repetir: la misma orden hoy, mañana y 300 veces.",
    "Encadenar herramientas con tuberías (|): la salida de una es la entrada de otra.",
    "Servidores sin pantalla: el 90 % de Internet se administra por SSH.",
    "Scripts, tareas programadas (cron) e integración continua (CI): nadie hace clic ahí.",
    "Dejar rastro: una orden se copia, se documenta y se repite exacta.",
  ]],
] as const;

const PIEZAS: [string, string, string, Kind][] = [
  ["Ayuda (--help)", "Toda CLI decente se explica sola. Es lo primero que pruebas con una herramienta nueva y lo primero que se evalúa en la tuya.", "tareas --help\ntareas ejecutar --help", "sh"],
  ["Argumentos vs opciones", "Argumento: dato posicional, normalmente obligatorio (QUÉ). Opción: empieza por - o --, tiene nombre y suele ser opcional (CÓMO). Un flag es una opción sí/no.", "tareas listar ~/Descargas            # argumento\ntareas listar ~/Descargas --json     # + opción (flag)\ntareas --config otro.json acciones   # opción con valor", "sh"],
  ["stdin, stdout y stderr", "Tres canales: entrada estándar, salida estándar (resultados) y salida de error (avisos y fallos). Separarlos permite redirigir solo lo útil.", "tareas listar > lista.txt          # stdout a un fichero\ntareas validar 2> errores.txt      # stderr a otro\ntareas listar --json | jq length   # tubería: stdout entra en jq", "sh"],
  ["Códigos de salida", "Al acabar, el programa devuelve un número: 0 = todo bien, distinto de 0 = algo falló. Los scripts y la CI deciden con él. En tu CLI: 0 bien · 1 fallo al ejecutar · 2 error de uso · 3 configuración inválida.", "tareas validar\necho $?            # bash/zsh → 0, 1, 2 o 3\necho $LASTEXITCODE # PowerShell", "sh"],
  ["Variables de entorno", "Valores que el sistema le pasa al programa sin escribirlos en la orden: rutas, idioma, claves de API (nunca en el código).", "export TAREAS_MODELO=llama3   # bash/zsh\n$env:TAREAS_MODELO = \"llama3\"  # PowerShell", "sh"],
  ["Fichero de configuración", "Lo que cambia poco y no quieres teclear cada vez. En tu proyecto, las acciones viven en acciones.json, no en el código.", "tareas acciones                     # usa ./acciones.json\ntareas --config ~/mis.json acciones", "sh"],
  ["Formato de salida", "Para personas: tablas y colores. Para máquinas: --json (estable, sin colores). Una buena CLI ofrece las dos.", "tareas listar ~/Descargas          # tabla bonita\ntareas listar ~/Descargas --json   # para otro programa", "sh"],
  ["Interactiva vs no interactiva", "Antes de borrar, pregunta (¿Seguro? [s/N]). Pero en un script nadie responde: --si confirma sin preguntar. Y --simular enseña qué haría sin tocar nada.", "tareas ejecutar limpiar-temporales --simular\ntareas ejecutar limpiar-temporales        # pregunta\ntareas ejecutar limpiar-temporales --si   # no pregunta", "sh"],
];

const HERRAMIENTAS: { cat: string; items: [string, string, string][] }[] = [
  {
    cat: "Código y versiones",
    items: [
      ["git", "Control de versiones: la máquina del tiempo de tu código.", "git log --oneline -5"],
      ["gh", "GitHub desde la terminal: repos, issues, PR y releases.", "gh repo create cli-tareas --public"],
      ["Claude Code · OpenCode", "Agentes de código que viven en la terminal: leen tu repo, ejecutan órdenes y proponen cambios.", "opencode"],
    ],
  },
  {
    cat: "Red y descargas",
    items: [
      ["curl", "Habla HTTP: descarga ficheros, prueba APIs, instala herramientas.", "curl -s https://api.github.com/users/octocat"],
      ["yt-dlp", "Descarga vídeo y audio de cientos de webs (respeta derechos y licencias).", "yt-dlp -x --audio-format mp3 URL"],
      ["rsync", "Copias y copias de seguridad incrementales, en local o por red.", "rsync -av ~/Proyectos/ /media/usb/copia/"],
    ],
  },
  {
    cat: "Multimedia y documentos",
    items: [
      ["ffmpeg", "La navaja suiza del vídeo y el audio: convertir, recortar, extraer.", "ffmpeg -i clase.mov -c:v libx264 clase.mp4"],
      ["magick (ImageMagick)", "Convierte, redimensiona y retoca imágenes por lotes.", "magick foto.png -resize 50% foto.jpg"],
      ["pandoc", "Convierte documentos entre formatos: Markdown, Word, PDF, HTML.", "pandoc apuntes.md -o apuntes.docx"],
    ],
  },
  {
    cat: "Buscar y filtrar",
    items: [
      ["rg (ripgrep)", "Busca texto en miles de ficheros en milisegundos.", "rg \"TODO\" src/"],
      ["fzf", "Buscador difuso interactivo: elige de una lista tecleando.", "ls | fzf"],
      ["jq", "Lee, filtra y transforma JSON en la terminal.", "jq \".acciones[].nombre\" acciones.json"],
    ],
  },
  {
    cat: "Sistema y entornos",
    items: [
      ["docker", "Ejecuta aplicaciones en contenedores aislados y reproducibles.", "docker run --rm -it python:3.12"],
      ["uv · pip · npm", "Gestores de paquetes: instalan librerías y herramientas.", "uv add typer"],
      ["htop · btop", "Monitor de procesos, CPU y memoria en la terminal.", "btop"],
    ],
  },
  {
    cat: "Ayuda e IA",
    items: [
      ["tldr", "Ejemplos prácticos de cualquier orden, sin leer el manual entero.", "tldr tar"],
      ["ollama", "Descarga y ejecuta modelos de IA en tu propio equipo.", "ollama run llama3.2 \"Resume esto\""],
    ],
  },
];

const IDEAS: [string, string, string, string][] = [
  ["1", "Renombrar", "Fotos con su fecha (2026-10-26_001.jpg), quitar espacios y tildes de nombres, numerar entregas.", "sistema"],
  ["2", "Ordenar", "Descargas por tipo (PDF, imágenes, comprimidos, instaladores) o apuntes por asignatura según el nombre.", "sistema"],
  ["3", "Limpiar y detectar", "Temporales con más de 30 días, duplicados por hash (mismo contenido, distinto nombre), informe de espacio en disco por carpeta.", "sistema"],
  ["4", "Resumir con IA", "Resumir PDFs o textos largos, generar el README de una carpeta de proyecto, convertir apuntes desordenados en Markdown limpio.", "IA"],
  ["5", "Renombrar por contenido con IA", "La IA lee el principio de cada documento y propone un nombre que diga lo que es (con --simular primero).", "IA"],
  ["6", "Acciones encadenadas", "Ordenar → quitar duplicados → resumir lo nuevo → informe final. Una orden, varios pasos.", "sistema + IA"],
];

const CICLO: [string, string, string][] = [
  ["Spec de 10 líneas", "Para quién es, qué problema resuelve, qué órdenes tendrá, qué NO hará. Si no cabe en 10 líneas, aún no sabes qué quieres.", "docs/spec.md"],
  ["Interfaz", "Las órdenes y opciones exactas, como las teclearía alguien. Se diseña antes que el código: es el contrato con quien la usa.", "tareas --help"],
  ["Núcleo (motor)", "La lógica que hace el trabajo, separada de la interfaz: el motor no sabe nada de Typer ni de colores. Así se prueba y se reutiliza.", "motor.py"],
  ["Errores y casos feos", "Carpeta que no existe, JSON mal escrito, fichero abierto, sin permisos, sin red, nombre con tildes. Mensajes claros, nunca un traceback.", "errores.py"],
  ["Pruebas", "pytest comprueba que cada acción hace lo que dice en una carpeta temporal. Si cambias algo y se rompe, te enteras antes que tu usuario.", "tests/"],
  ["Empaquetado e instalación", "pyproject.toml con su entry point: tu programa se convierte en un comando que se instala con una orden.", "uv tool install"],
  ["Release", "Versión etiquetada (v1.0.0), notas de cambios y README con instalación probada en otro sistema.", "git tag v1.0.0"],
];

const TECNOLOGIAS: [string, string, string, string][] = [
  ["Python · Typer / Click / argparse", "Legible, librerías para todo (ficheros, PDF, IA), multiplataforma, rapidísimo de escribir. argparse viene de serie; Typer genera ayuda y autocompletado desde los tipos.", "Necesita Python instalado (uv lo resuelve); arranque algo más lento; no da un único ejecutable de serie.", "aws-cli, yt-dlp, httpie, pip, Ansible"],
  ["Node.js · commander / oclif", "Ecosistema npm enorme; ideal si ya trabajas en JavaScript; buena integración con herramientas web.", "Necesita Node; node_modules pesados; asincronía que complica scripts sencillos.", "npm, Vercel CLI, Heroku CLI, Angular CLI"],
  ["Go · cobra", "Un único binario sin dependencias, compila para cualquier sistema, arranque instantáneo.", "Más verboso; tipado y compilación que ralentizan el primer prototipo.", "kubectl, gh, docker, hugo"],
  ["Rust · clap", "Velocidad máxima y seguridad de memoria; binarios únicos; clap es excelente.", "Curva de aprendizaje dura; compilaciones lentas.", "ripgrep, fd, bat, uv"],
  ["Scripts Bash / PowerShell", "Ya están instalados; perfectos para pegar 5 órdenes existentes.", "Frágiles al crecer, difíciles de probar y no multiplataforma (Bash ≠ PowerShell).", "instaladores, nvm, scripts de despliegue"],
];

const POR_QUE = [
  ["Legible", "Puedes leer y auditar lo que escribe el agente aunque estés empezando."],
  ["Multiplataforma", "El mismo código funciona en Linux, Windows y macOS si sigues cuatro reglas."],
  ["El agente lo domina", "Python es el lenguaje en el que más código ha visto cualquier modelo: menos inventos."],
  ["Una orden para instalar", "uv instala Python, dependencias y tu herramienta como comando global."],
  ["Typer hace el trabajo sucio", "A partir de los tipos de tus funciones genera --help, validación de argumentos y autocompletado."],
  ["Rich incluido", "Tablas, colores y barras de progreso que funcionan también en Windows Terminal."],
] as const;

const REGLAS: { regla: string; mal: string; bien: string; por: string }[] = [
  {
    regla: "Rutas con pathlib, nunca concatenando",
    mal: "ruta = carpeta + \"/\" + nombre",
    bien: "ruta = Path(carpeta) / nombre",
    por: "Windows usa \\ y Linux /. Path elige el separador correcto por ti.",
  },
  {
    regla: "La ~ hay que expandirla",
    mal: "open(\"~/Descargas/lista.txt\")",
    bien: "Path(\"~/Descargas\").expanduser() / \"lista.txt\"",
    por: "~ lo entiende la shell, no Python. Sin expanduser() busca una carpeta llamada «~».",
  },
  {
    regla: "Codificación explícita",
    mal: "Path(\"acciones.json\").read_text()",
    bien: "Path(\"acciones.json\").read_text(encoding=\"utf-8\")",
    por: "En Windows la codificación por defecto puede no ser UTF-8: las tildes y la ñ se rompen.",
  },
  {
    regla: "Nada de shell=True ni os.system",
    mal: "os.system(\"mv \" + origen + \" \" + destino)",
    bien: "shutil.move(origen, destino)",
    por: "mv no existe en PowerShell clásico, un nombre con espacios lo rompe y abre la puerta a inyecciones.",
  },
  {
    regla: "Saltos de línea normalizados",
    mal: "(sin .gitattributes)",
    bien: "# .gitattributes\n* text=auto",
    por: "Windows usa CRLF y Linux LF. Sin esto, git marca cambios fantasma en todas las líneas.",
  },
  {
    regla: "Colores con Rich",
    mal: "print(\"\\033[31mError\\033[0m\")",
    bien: "console.print(\"[red]Error[/red]\")",
    por: "Los códigos ANSI a mano salen como basura en algunas consolas. Rich detecta lo que soporta cada una.",
  },
];

const EQUIV: [string, string, string][] = [
  ["Listar ficheros", "ls -la", "Get-ChildItem   (o ls)"],
  ["Cambiar de carpeta", "cd ~/Proyectos", "cd ~\\Proyectos"],
  ["¿Dónde estoy?", "pwd", "pwd   (Get-Location)"],
  ["Crear carpeta", "mkdir -p pruebas/a", "mkdir pruebas\\a   (New-Item -ItemType Directory)"],
  ["Copiar", "cp origen destino", "cp origen destino   (Copy-Item)"],
  ["Mover / renombrar", "mv viejo nuevo", "mv viejo nuevo   (Move-Item)"],
  ["Borrar", "rm fichero · rm -r carpeta", "rm fichero · rm -r carpeta   (Remove-Item)"],
  ["Ver un fichero", "cat acciones.json", "cat acciones.json   (Get-Content)"],
  ["¿Dónde está un comando?", "which tareas", "Get-Command tareas · where.exe tareas"],
  ["Leer una variable", "echo $HOME", "echo $env:USERPROFILE"],
  ["Código de salida", "echo $?", "echo $LASTEXITCODE"],
];

const ORDENES: [string, string][] = [
  ["tareas --help", "Ayuda general con todas las órdenes (la genera Typer)."],
  ["tareas version", "Muestra la versión instalada (0.1.0 al empezar)."],
  ["tareas listar [CARPETA]", "Tabla con nombre, tipo, tamaño y fecha de cada fichero. Por defecto, la carpeta actual."],
  ["tareas acciones", "Lista las acciones definidas en acciones.json con su descripción."],
  ["tareas validar", "Comprueba acciones.json y dice exactamente qué campo falla (código 3 si es inválido)."],
  ["tareas ejecutar NOMBRE [CARPETA] --simular", "Muestra qué haría la acción sin tocar nada."],
  ["tareas ejecutar NOMBRE [CARPETA] --si", "La ejecuta sin preguntar (para scripts)."],
  ["tareas --config RUTA …", "Opción global: otro fichero de acciones (por defecto ./acciones.json)."],
];

const CAMPOS: [string, string][] = [
  ["version", "Versión del esquema del fichero. Si algún día cambias el formato, sabrás leer los antiguos."],
  ["acciones", "Lista de acciones. Añadir una nueva no exige tocar el código: ese es el objetivo."],
  ["nombre", "Identificador que se teclea: tareas ejecutar ordenar-descargas. Minúsculas y guiones, único."],
  ["descripcion", "Lo que verá quien ejecute tareas acciones. Una frase que diga qué hace."],
  ["tipo", "Qué clase de acción es: mover, renombrar, copiar, borrar… (y en la semana 3, las de IA). Cada tipo es una clase en acciones.py."],
  ["origen / destino", "Carpetas sobre las que trabaja. Admiten ~ (se expande con expanduser). Si no hay origen, se usa la CARPETA de la orden."],
  ["filtro", "Qué ficheros le afectan: extensiones, patron (expresión regular sobre el nombre), mas_antiguo_que_dias…"],
  ["plantilla", "Para renombrar: {fecha:%Y-%m-%d} es la fecha del fichero, {n:03} un contador a 3 cifras y {ext} la extensión original."],
  ["confirmar", "true en acciones destructivas: pregunta antes de actuar salvo que pases --si."],
];

const ESTRUCTURA = String.raw`
cli-tareas/
├── pyproject.toml        # [project.scripts] tareas = "tareas.cli:app"
├── README.md
├── .gitignore            # .venv/, __pycache__/, .env, *.egg-info, dist/
├── .gitattributes        # * text=auto
├── acciones.json         # TUS acciones (lo escribes tú)
├── docs/adr/0001-configuracion-externa.md
├── src/tareas/
│   ├── __init__.py       # __version__ = "0.1.0"
│   ├── __main__.py       # permite: python -m tareas
│   ├── cli.py            # interfaz Typer: órdenes, opciones, salida
│   ├── config.py         # leer y VALIDAR acciones.json
│   ├── motor.py          # clase Motor: ejecuta una Accion sobre una carpeta
│   ├── acciones.py       # clases Accion (mover, renombrar, copiar, borrar…)
│   └── errores.py        # TareasError, ConfigError, AccionNoValida
└── tests/                # semana 4
`;

const ACCIONES_JSON = String.raw`
{
  "version": 1,
  "acciones": [
    { "nombre": "ordenar-descargas", "descripcion": "Mueve los PDF y documentos de Descargas a Documentos/PDF",
      "tipo": "mover", "origen": "~/Descargas", "filtro": { "extensiones": [".pdf", ".docx"] }, "destino": "~/Documentos/PDF" },
    { "nombre": "renombrar-fotos", "descripcion": "Renombra fotos con su fecha: 2026-10-26_001.jpg",
      "tipo": "renombrar", "filtro": { "extensiones": [".jpg", ".jpeg", ".png"] }, "plantilla": "{fecha:%Y-%m-%d}_{n:03}{ext}" },
    { "nombre": "limpiar-temporales", "descripcion": "Borra .tmp con más de 30 días",
      "tipo": "borrar", "filtro": { "patron": ".*\\.tmp$", "mas_antiguo_que_dias": 30 }, "confirmar": true }
  ]
}
`;

const HOLA_PY = `
import typer

app = typer.Typer(help="Tu primera CLI con Typer.")


@app.command()
def hola(nombre: str, veces: int = 1, gritar: bool = False):
    """Saluda a NOMBRE tantas VECES como pidas."""
    for _ in range(veces):
        texto = f"Hola, {nombre}"
        print(texto.upper() if gritar else texto)


if __name__ == "__main__":
    app()
`;

const HOLA_HELP = `
 Usage: hola.py [OPTIONS] {nombre}

 Saluda a NOMBRE tantas VECES como pidas.

╭─ Arguments ──────────────────────────────────────────────────────────╮
│ *    nombre      <str>  [required]                                   │
╰──────────────────────────────────────────────────────────────────────╯
╭─ Options ────────────────────────────────────────────────────────────╮
│ --veces                                <int>  [default: 1]           │
│ --gritar                --no-gritar           [default: no-gritar]   │
│ --install-completion                          Install completion for │
│                                               the current shell.     │
│ --show-completion                             Show completion for    │
│                                               the current shell, to  │
│                                               copy it or customize   │
│                                               the installation.      │
│ --help                                        Show this message and  │
│                                               exit.                  │
╰──────────────────────────────────────────────────────────────────────╯
`;

const SEMANAS = [
  {
    n: "Semana 1",
    fechas: "26-30 oct",
    sesion: "Sesión 1 · Arranque: la terminal y tu primera orden",
    href: "/programacion-ia/cli/sesion-01/",
    objetivo: "Perderle el miedo a la terminal y tener un comando tareas que existe de verdad.",
    hace: [
      "Moverte por carpetas, crear, copiar y borrar en tu terminal (bash o PowerShell).",
      "Instalar uv y Python 3.12; crear el proyecto con uv init --package y añadir Typer.",
      "Escribir tu spec de 10 líneas y el .gitignore (con .env) ANTES del primer commit.",
      "Primeras órdenes: --help, version y listar con tabla Rich.",
      "Instalarla con uv tool install --editable . y lanzarla desde cualquier carpeta.",
    ],
    producto: "Repo cli-tareas en GitHub con tareas --help, tareas version y tareas listar funcionando, y varios commits que cuentan el proceso.",
  },
  {
    n: "Semana 2",
    fechas: "2-6 nov",
    sesion: "Sesión 2 · Acciones predefinidas: acciones.json y el motor",
    href: "/programacion-ia/cli/sesion-02/",
    objetivo: "Que tu herramienta haga cosas útiles definidas en un fichero que escribes tú.",
    hace: [
      "Diseñar tu acciones.json con al menos 3 acciones propias (no las del ejemplo).",
      "config.py que valida el JSON y dice qué campo falla; errores.py con tus excepciones.",
      "Clases Accion y Motor separadas de la interfaz; órdenes acciones, validar y ejecutar.",
      "--simular siempre primero y confirmación antes de borrar; todo en ~/pruebas-tareas.",
      "ADR 0001: por qué configuración externa y no acciones escritas en el código.",
    ],
    producto: "3 acciones propias funcionando con --simular, tareas validar con mensajes claros, ADR escrito y commits pequeños.",
  },
];

/* ------------------------------------------------------------------ */
/* Diagrama: anatomía de una orden                                     */
/* ------------------------------------------------------------------ */

const SEGMENTOS = [
  { t: "tareas", x: 20, w: 78, label: "programa", d1: "el comando", d2: "instalado", c: "slate" },
  { t: "ejecutar", x: 110, w: 97, label: "subcomando", d1: "qué hacer", d2: "(un verbo)", c: "blue" },
  { t: "ordenar-descargas", x: 219, w: 183, label: "argumento 1", d1: "qué acción ejecutar", d2: "(de acciones.json)", c: "emerald" },
  { t: "~/Descargas", x: 414, w: 126, label: "argumento 2", d1: "sobre qué carpeta", d2: "(opcional)", c: "emerald" },
  { t: "--simular", x: 552, w: 106, label: "opción (flag)", d1: "cómo: enseña qué", d2: "haría, sin tocar", c: "amber" },
] as const;

const COLOR_SEG = {
  slate: { rect: "fill-slate-500/10 stroke-slate-500", txt: "fill-slate-700 dark:fill-slate-200" },
  blue: { rect: "fill-blue-500/10 stroke-blue-500", txt: "fill-blue-700 dark:fill-blue-300" },
  emerald: { rect: "fill-emerald-500/10 stroke-emerald-500", txt: "fill-emerald-700 dark:fill-emerald-300" },
  amber: { rect: "fill-amber-500/10 stroke-amber-500", txt: "fill-amber-700 dark:fill-amber-300" },
} as const;

function DiagramaOrden() {
  return (
    <div className={`${card} mt-5 overflow-x-auto`}>
      <svg
        viewBox="0 0 680 160"
        className="mx-auto block w-full min-w-[620px] max-w-3xl"
        role="img"
        aria-label="Anatomía de la orden tareas ejecutar ordenar-descargas ~/Descargas --simular: tareas es el programa, ejecutar el subcomando, ordenar-descargas y ~/Descargas son argumentos y --simular es una opción."
      >
        {SEGMENTOS.map((s) => {
          const k = COLOR_SEG[s.c];
          const cx = s.x + s.w / 2;
          return (
            <g key={s.t}>
              <rect x={s.x} y={20} width={s.w} height={40} rx={8} className={k.rect} strokeWidth={1.5} />
              <text
                x={cx}
                y={45}
                textAnchor="middle"
                className={`${k.txt} font-mono`}
                fontSize={16}
                fontWeight={700}
              >
                {s.t}
              </text>
              <path
                d={`M ${s.x + 4} 68 v 6 h ${s.w - 8} v -6 M ${cx} 74 v 14`}
                fill="none"
                className="stroke-zinc-400 dark:stroke-zinc-500"
                strokeWidth={1.5}
              />
              <text x={cx} y={106} textAnchor="middle" fontSize={13} fontWeight={800} className={k.txt}>
                {s.label}
              </text>
              <text x={cx} y={124} textAnchor="middle" fontSize={11} className="fill-zinc-600 dark:fill-zinc-400">
                {s.d1}
              </text>
              <text x={cx} y={139} textAnchor="middle" fontSize={11} className="fill-zinc-600 dark:fill-zinc-400">
                {s.d2}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-3 text-center text-sm text-zinc-500 dark:text-zinc-400">
        Se lee como una frase: <i>«herramienta, haz esto, con esto, aquí, de esta manera»</i>.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export default function CursoIACliTareas() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Curso de Programación con IA", path: "/programacion-ia/" },
          { title: "CLI tareas con IA", path: "/programacion-ia/cli/" },
        ]}
      />

      {/* 1 · Cabecera */}
      <span className={chip}>Proyecto 2 · CLI tareas con IA · Presencial y semipresencial</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
        Tu propia herramienta de terminal: <span className="text-blue-600 dark:text-blue-400">tareas</span>
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
        Vas a construir una <b>CLI</b>: un programa que se usa escribiendo órdenes en la terminal y
        que trabaja con <b>tus ficheros</b> — ordena descargas, renombra fotos, limpia temporales,
        resume documentos — mediante <b>acciones que defines tú</b> en un fichero{" "}
        <C>acciones.json</C>. Combina lo que sabe hacer el sistema operativo con lo que sabe hacer la
        IA, y se instala con <b>una sola orden</b> en Linux, Windows y macOS.
      </p>
      <p className="mt-3 max-w-3xl text-[15px] text-zinc-600 dark:text-zinc-400">
        Por qué importa: los desarrolladores viven en la terminal. Git, los gestores de paquetes, los
        servidores, la integración continua y los propios agentes de IA son CLI. Quien sabe usarlas{" "}
        <b>automatiza</b>; quien sabe <b>construirlas</b> crea herramientas que usan otros.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Python 3.12", "+ Typer + uv"],
          ["acciones.json", "tus acciones, fuera del código"],
          ["Sistema + IA", "ficheros reales y modelos"],
          ["3 sistemas", "Linux · Windows · macOS"],
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

      {/* 2 · Qué es una CLI */}
      <h2 id="que-es" className={h2}>Qué es una CLI</h2>
      <p className={lead}>
        <b>CLI</b> (<i>Command Line Interface</i>, interfaz de línea de órdenes) es un programa que
        se controla escribiendo texto: tecleas una orden, pulsas Intro, el programa hace su trabajo,
        escribe un resultado y termina. Sin ventanas, sin botones. Lo contrario es una <b>GUI</b>{" "}
        (<i>Graphical User Interface</i>): ventanas, menús y ratón.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {GUI_CLI.map(([t, tono, items]) => (
          <div key={t} className={card}>
            <h3
              className={`text-[16px] font-bold ${tono === "blue" ? "text-blue-700 dark:text-blue-300" : "text-emerald-700 dark:text-emerald-300"}`}
            >
              {t}
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
              {items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="mt-8 text-lg font-bold">Terminal, shell y CLI: no es lo mismo</h3>
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className={card}>
          <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-400">La ventana</div>
          <h4 className="mt-1 font-bold">Terminal</h4>
          <p className={`mt-1 ${muted}`}>
            La aplicación que muestra texto y recoge lo que tecleas: Terminal de Linux o macOS,
            Windows Terminal, la terminal integrada de VS Code.
          </p>
        </div>
        <div className={card}>
          <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-400">El intérprete</div>
          <h4 className="mt-1 font-bold">Shell</h4>
          <p className={`mt-1 ${muted}`}>
            El programa que lee tu orden y la lanza: <b>bash</b> (Linux), <b>zsh</b> (macOS),{" "}
            <b>PowerShell</b> (Windows). Cada una tiene su sintaxis: por eso hay órdenes que cambian
            de un sistema a otro.
          </p>
        </div>
        <div className={card}>
          <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-400">El programa</div>
          <h4 className="mt-1 font-bold">CLI</h4>
          <p className={`mt-1 ${muted}`}>
            La herramienta que la shell ejecuta: <C>git</C>, <C>curl</C>, <C>uv</C>… y, dentro de
            dos semanas, <C>tareas</C>. Funciona igual desde cualquier shell.
          </p>
        </div>
      </div>
      <p className={`mt-3 ${muted}`}>
        Resumen: abres una <b>terminal</b>, dentro corre una <b>shell</b>, y en ella escribes órdenes
        que lanzan <b>CLI</b>.
      </p>

      {/* 3 · Anatomía */}
      <h2 id="anatomia" className={h2}>Anatomía de una orden</h2>
      <p className={lead}>
        Esta es una orden real de tu futura herramienta. Separada en piezas se entiende todo lo
        demás:
      </p>
      <DiagramaOrden />
      <p className={`mt-6 ${lead}`}>Y estas son las otras piezas que tiene cualquier CLI seria (y tendrá la tuya):</p>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {PIEZAS.map(([t, d, ej, k]) => (
          <div key={t} className={`${card} flex flex-col`}>
            <h3 className="text-[16px] font-bold">{t}</h3>
            <p className={`mt-1 mb-3 flex-1 ${muted}`}>{d}</p>
            <Codigo code={ej} kind={k} />
          </div>
        ))}
      </div>

      {/* 4 · Las CLI que usa el mundo */}
      <h2 id="mundo" className={h2}>Las CLI que usa el mundo</h2>
      <p className={lead}>
        Muchas de las herramientas más potentes de la informática no tienen ventanas. Algunas que
        verás (o usarás) este curso:
      </p>
      <div className="mt-5 space-y-6">
        {HERRAMIENTAS.map((g) => (
          <div key={g.cat}>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{g.cat}</h3>
            <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map(([n, d, ej]) => (
                <div key={n} className="flex flex-col rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4 shadow-sm">
                  <div className="font-mono text-[15px] font-bold text-zinc-800 dark:text-zinc-100">{n}</div>
                  <p className="mt-1 flex-1 text-[13px] text-zinc-600 dark:text-zinc-400">{d}</p>
                  <div className="mt-3 overflow-x-auto rounded-lg bg-zinc-900 px-3 py-2 font-mono text-[12px] whitespace-nowrap text-emerald-300">
                    <span className="select-none text-zinc-500">$ </span>
                    {ej}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Nota>
        <b>Truco para la vida:</b> antes de buscar en Google cómo se usa una orden, prueba{" "}
        <C>orden --help</C>, <C>tldr orden</C> o <C>man orden</C>. Y si tu herramienta no se explica
        así de bien, aún no está terminada.
      </Nota>

      <h3 className="mt-10 text-lg font-bold">Ideas de acciones para tu herramienta</h3>
      <p className={lead}>
        De menos a más difícil. Empieza por arriba; las de IA llegan en la semana 3. Tus acciones
        tienen que resolver <b>un problema tuyo</b>: mira tu carpeta de descargas y piensa qué te
        gustaría no volver a hacer a mano.
      </p>
      <ol className="mt-4 space-y-3">
        {IDEAS.map(([n, t, d, tipo]) => (
          <li key={n} className="flex gap-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-extrabold text-white">
              {n}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold">{t}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                    tipo === "sistema"
                      ? "bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300"
                      : "bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300"
                  }`}
                >
                  {tipo}
                </span>
                <span className="text-[12px] tracking-widest text-amber-500" aria-label={`Dificultad ${n} de 6`}>
                  {"●".repeat(Number(n))}
                  <span className="text-zinc-300 dark:text-zinc-600">{"●".repeat(6 - Number(n))}</span>
                </span>
              </div>
              <p className={`mt-1 ${muted}`}>{d}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* 5 · Ciclo */}
      <h2 id="ciclo" className={h2}>Cómo se desarrolla una CLI de verdad</h2>
      <p className={lead}>
        Las herramientas profesionales no salen de un prompt gigante. Salen de este ciclo, paso a
        paso, con un commit al acabar cada uno. Es el que seguirás:
      </p>
      <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CICLO.map(([t, d, ej], i) => (
          <li key={t} className={`${card} relative flex flex-col`}>
            <span className="text-3xl font-extrabold text-blue-600/25 dark:text-blue-400/30">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-1 text-[16px] font-bold">{t}</h3>
            <p className={`mt-1 flex-1 ${muted}`}>{d}</p>
            <span className="mt-3 w-fit rounded-md bg-zinc-100 dark:bg-white/10 px-2 py-0.5 font-mono text-[12px] text-zinc-700 dark:text-zinc-300">
              {ej}
            </span>
          </li>
        ))}
        <li className="flex flex-col justify-center rounded-2xl border border-dashed border-blue-300 dark:border-blue-500/40 p-5 text-sm text-blue-900 dark:text-blue-200">
          <b>Y vuelta a empezar.</b> Cada acción nueva repasa el ciclo en pequeño: spec → interfaz →
          motor → casos feos → prueba → commit.
        </li>
      </ol>
      <Nota tono="amber">
        <b>El método del curso:</b> tú <b>escribes</b> la spec y el <C>acciones.json</C> (decides
        qué hace), el agente o asistente <b>implementa</b>, y tú <b>auditas</b>: lees el código,
        pruebas casos feos y haces commits pequeños con mensajes que cuentan el proceso. Guarda tus
        prompts clave en <C>docs/prompts.md</C>. <i>Lo que no sabes explicar, no lo entregas.</i>
      </Nota>

      {/* 6 · Tecnologías */}
      <h2 id="tecnologias" className={h2}>Tecnologías para hacer una CLI</h2>
      <p className={lead}>Casi cualquier lenguaje sirve. Cada uno paga un precio distinto:</p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-100 dark:bg-white/10">
              <th className={`${th} w-[19%]`}>Opción</th>
              <th className={th}>A favor</th>
              <th className={th}>En contra</th>
              <th className={`${th} w-[19%]`}>CLI famosas hechas así</th>
            </tr>
          </thead>
          <tbody>
            {TECNOLOGIAS.map(([o, pro, contra, fam], i) => (
              <tr key={o} className={`${tr} ${i === 0 ? "bg-blue-50/60 dark:bg-blue-500/10" : ""}`}>
                <td className="px-3.5 py-2.5 align-top font-bold text-zinc-800 dark:text-zinc-200">
                  {o}
                  {i === 0 && (
                    <span className="mt-1 block w-fit rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      La del curso
                    </span>
                  )}
                </td>
                <td className={td}>{pro}</td>
                <td className={td}>{contra}</td>
                <td className={`${td} italic`}>{fam}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mt-8 text-lg font-bold">Por qué Python 3 + Typer + uv</h3>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {POR_QUE.map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 p-4">
            <div className="font-bold text-zinc-800 dark:text-zinc-100">{t}</div>
            <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400">{d}</p>
          </div>
        ))}
      </div>
      <p className={`mt-6 ${lead}`}>
        Un «hola mundo» con Typer. Fíjate: no escribes nada sobre la ayuda ni sobre cómo leer los
        argumentos. Typer lo deduce de <C>nombre: str</C>, <C>veces: int = 1</C> y{" "}
        <C>gritar: bool = False</C>.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="min-w-0">
          <Codigo code={HOLA_PY} kind="py" lang="hola.py" />
        </div>
        <div className="min-w-0 space-y-4">
          <Codigo
            code={`uv run --with typer hola.py Ana --veces 2 --gritar\n# HOLA, ANA\n# HOLA, ANA\nuv run --with typer hola.py --help`}
            kind="sh"
          />
          <Codigo code={HOLA_HELP} kind="txt" lang="Salida de --help" />
        </div>
      </div>
      <p className={`mt-3 ${muted}`}>
        Argumento obligatorio, opciones con valor por defecto, un flag con su contrario y
        autocompletado para tu shell. Gratis.
      </p>

      {/* 7 · Multiplataforma */}
      <h2 id="multiplataforma" className={h2}>Multiplataforma: Linux primero, pero en todas partes</h2>
      <p className={lead}>
        En el aula trabajas en <b>Linux</b>. Pero tu herramienta la instalará gente con{" "}
        <b>Windows</b> y <b>macOS</b> (y si eres de semipresencial, tu propio equipo puede ser
        cualquiera de los tres). Python lo pone fácil si respetas seis reglas:
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {REGLAS.map((r) => (
          <div key={r.regla} className={card}>
            <h3 className="text-[16px] font-bold">{r.regla}</h3>
            <div className="mt-3 space-y-2 font-mono text-[12.5px]">
              <div className="flex gap-2 overflow-x-auto rounded-lg border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 px-3 py-2">
                <span className="shrink-0 font-sans text-[11px] font-extrabold text-rose-700 dark:text-rose-300">MAL</span>
                <span className="whitespace-pre text-rose-900 dark:text-rose-200">{r.mal}</span>
              </div>
              <div className="flex gap-2 overflow-x-auto rounded-lg border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-2">
                <span className="shrink-0 font-sans text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300">BIEN</span>
                <span className="whitespace-pre text-emerald-900 dark:text-emerald-200">{r.bien}</span>
              </div>
            </div>
            <p className={`mt-3 ${muted}`}>{r.por}</p>
          </div>
        ))}
      </div>
      <p className={`mt-4 ${muted}`}>
        Y en la semana 4, GitHub Actions ejecutará tus pruebas en Ubuntu, Windows y macOS a la vez
        en cada <C>git push</C>: si algo solo funciona en tu equipo, te enterarás.
      </p>

      <h3 className="mt-8 text-lg font-bold">Equivalencias bash ↔ PowerShell</h3>
      <p className={`mt-1 ${muted}`}>
        PowerShell tiene alias con los nombres de Linux (<C>ls</C>, <C>cp</C>, <C>mv</C>…), pero
        las opciones no siempre coinciden. Entre paréntesis, el nombre «de verdad» del cmdlet.
      </p>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
        <table className="w-full min-w-[620px] border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-100 dark:bg-white/10">
              <th className={`${th} w-[24%]`}>Quiero…</th>
              <th className={th}>bash / zsh (Linux, macOS)</th>
              <th className={th}>PowerShell (Windows)</th>
            </tr>
          </thead>
          <tbody>
            {EQUIV.map(([q, b, p]) => (
              <tr key={q} className={tr}>
                <td className="px-3.5 py-2 align-top font-semibold text-zinc-800 dark:text-zinc-200">{q}</td>
                <td className="px-3.5 py-2 align-top font-mono text-[13px] text-zinc-700 dark:text-zinc-300">{b}</td>
                <td className="px-3.5 py-2 align-top font-mono text-[13px] text-zinc-700 dark:text-zinc-300">{p}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 8 · Instalar */}
      <h2 id="instalar" className={h2}>Instalarla para que sea útil</h2>
      <p className={lead}>
        Un script que solo funciona con <C>python src/tareas/cli.py</C> desde su carpeta es un
        ejercicio. Una herramienta se teclea por su nombre desde <b>cualquier carpeta</b>. ¿Cómo lo
        consigue <C>git</C>?
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className={card}>
          <h3 className="text-[16px] font-bold">El PATH</h3>
          <p className={`mt-1 ${muted}`}>
            Cuando escribes <C>tareas</C>, la shell busca un ejecutable con ese nombre en una lista
            de carpetas: la variable de entorno <b>PATH</b>. Un comando está «instalado» cuando hay
            un ejecutable suyo en alguna de ellas.
          </p>
          <div className="mt-3">
            <Codigo code={`echo $PATH        # bash/zsh\n$env:Path          # PowerShell\nwhich tareas       # ¿cuál se ejecuta? (Get-Command en Windows)`} />
          </div>
        </div>
        <div className={card}>
          <h3 className="text-[16px] font-bold">El entry point</h3>
          <p className={`mt-1 ${muted}`}>
            En <C>pyproject.toml</C> declaras qué función se ejecuta al teclear el comando. Al
            instalar, uv crea el ejecutable <C>tareas</C> en una carpeta del PATH (
            <C>~/.local/bin</C> en Linux y macOS).
          </p>
          <div className="mt-3">
            <Codigo code={`[project.scripts]\ntareas = "tareas.cli:app"   # comando = "módulo:objeto"`} kind="toml" lang="pyproject.toml" />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className={`${card} flex flex-col`}>
          <span className="w-fit rounded-full bg-blue-50 dark:bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            Mientras desarrollas
          </span>
          <p className={`mt-2 mb-3 flex-1 ${muted}`}>
            Modo editable: cada cambio que guardas se nota al momento, sin reinstalar.
          </p>
          <Codigo code={`cd cli-tareas\nuv tool install --editable .\ntareas --help`} />
        </div>
        <div className={`${card} flex flex-col`}>
          <span className="w-fit rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
            Para otra persona
          </span>
          <p className={`mt-2 mb-3 flex-1 ${muted}`}>
            Directamente desde tu repo público de GitHub. Con uv o, si no lo tiene, con pipx.
          </p>
          <Codigo
            code={`uv tool install git+https://github.com/TU-USUARIO/cli-tareas\n# o bien\npipx install git+https://github.com/TU-USUARIO/cli-tareas`}
          />
        </div>
        <div className={`${card} flex flex-col`}>
          <span className="w-fit rounded-full bg-rose-50 dark:bg-rose-500/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">
            Desinstalar
          </span>
          <p className={`mt-2 mb-3 flex-1 ${muted}`}>
            Una buena herramienta se va igual de limpia que llegó. Su configuración de usuario (si
            la hay) se borra aparte.
          </p>
          <Codigo code={`uv tool uninstall tareas\nuv tool list        # comprobar que ya no está`} />
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-100 dark:bg-white/10">
              <th className={`${th} w-[30%]`}>Dónde vive cada cosa</th>
              <th className={th}>Linux / macOS</th>
              <th className={th}>Windows</th>
            </tr>
          </thead>
          <tbody>
            <tr className={tr}>
              <td className="px-3.5 py-2 font-semibold">El comando instalado</td>
              <td className="px-3.5 py-2 font-mono text-[13px]">~/.local/bin/tareas</td>
              <td className="px-3.5 py-2 font-mono text-[13px]">%USERPROFILE%\.local\bin\tareas.exe</td>
            </tr>
            <tr className={tr}>
              <td className="px-3.5 py-2 font-semibold">acciones.json (por defecto)</td>
              <td className="px-3.5 py-2 font-mono text-[13px]" colSpan={2}>
                ./acciones.json, en la carpeta donde lanzas la orden, o la que indiques con --config
              </td>
            </tr>
            <tr className={tr}>
              <td className="px-3.5 py-2 font-semibold">Config de usuario (avance)</td>
              <td className="px-3.5 py-2 font-mono text-[13px]">~/.config/tareas/</td>
              <td className="px-3.5 py-2 font-mono text-[13px]">%APPDATA%\tareas\</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className={`mt-2 text-[13px] text-zinc-500 dark:text-zinc-400`}>
        La ruta de config de usuario no se escribe a mano: la librería <C>platformdirs</C> devuelve
        la correcta en cada sistema.
      </p>

      <Nota tono="emerald">
        <b>Cómo comprobar que funciona en otro sistema</b>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-[14px]">
          <li>Pide a un compañero (mejor con otro sistema operativo) que siga <b>solo tu README</b>, sin ayuda tuya.</li>
          <li>Instala con la orden de <C>uv tool install git+…</C> y prueba <C>tareas --help</C> y <C>tareas version</C> desde otra carpeta.</li>
          <li>Crea una carpeta de pruebas con ficheros de ejemplo y lanza cada acción con <C>--simular</C> y luego de verdad.</li>
          <li>Prueba un nombre con tildes y espacios (<C>Apuntes de Física.pdf</C>) y una ruta con <C>~</C>.</li>
          <li>Rompe a propósito el <C>acciones.json</C>: <C>tareas validar</C> debe decir qué falla y salir con código 3.</li>
          <li>Desinstala y comprueba que <C>tareas</C> ya no existe. Todo lo que haya fallado, al README o a un issue.</li>
        </ol>
      </Nota>

      {/* 9 · El proyecto */}
      <h2 id="proyecto" className={h2}>El proyecto: qué tiene que hacer tu CLI</h2>
      <p className={lead}>
        El comando de ejemplo se llama <C>tareas</C> y el repo <C>cli-tareas</C> (público en
        GitHub). Puedes elegir otro nombre, pero estas son las órdenes de referencia:
      </p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-100 dark:bg-white/10">
              <th className={`${th} w-[42%]`}>Orden</th>
              <th className={th}>Qué hace</th>
            </tr>
          </thead>
          <tbody>
            {ORDENES.map(([o, d]) => (
              <tr key={o} className={tr}>
                <td className="px-3.5 py-2 align-top font-mono text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">{o}</td>
                <td className={`${td} py-2`}>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={`mt-3 ${muted}`}>
        Códigos de salida: <b>0</b> bien · <b>1</b> fallo al ejecutar · <b>2</b> error de uso (lo
        pone Typer) · <b>3</b> configuración inválida.
      </p>

      <h3 className="mt-8 text-lg font-bold">acciones.json: el corazón del proyecto</h3>
      <p className={`mt-1 max-w-3xl ${muted}`}>
        Las acciones no se escriben en el código: se describen en este fichero y el motor las
        interpreta. Este es el esquema de referencia; tú lo adaptas a tus acciones y lo documentas
        en tu README.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="min-w-0">
          <Codigo code={ACCIONES_JSON} kind="json" lang="acciones.json" />
        </div>
        <dl className="min-w-0 space-y-2">
          {CAMPOS.map(([k, v]) => (
            <div key={k} className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 px-3.5 py-2.5">
              <dt className="font-mono text-[13px] font-bold text-blue-700 dark:text-blue-300">{k}</dt>
              <dd className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <h3 className="mt-8 text-lg font-bold">Estructura del repositorio</h3>
      <p className={`mt-1 max-w-3xl ${muted}`}>
        Cada fichero tiene un único trabajo. La regla de oro: <C>cli.py</C> habla con la persona,{" "}
        <C>motor.py</C> y <C>acciones.py</C> hacen el trabajo, <C>config.py</C> desconfía del JSON.
      </p>
      <div className="mt-4">
        <Codigo code={ESTRUCTURA} kind="sh" lang="cli-tareas/" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 p-5">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-violet-700 dark:text-violet-300">Avance · semana 3</span>
          <h3 className="mt-1 text-[16px] font-bold text-violet-950 dark:text-violet-100">La capa de IA</h3>
          <p className="mt-1 text-sm text-violet-900 dark:text-violet-200">
            Acciones de tipo IA (resumir, generar README, renombrar por contenido) que llaman a un
            modelo — los del centro o el que configures. La clave va en un <C>.env</C> ignorado por
            git desde el primer commit, con un <C>.env.example</C> documentado.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 p-5">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Avance · semana 3</span>
          <h3 className="mt-1 text-[16px] font-bold">Modo sin red</h3>
          <p className={`mt-1 ${muted}`}>
            Si no hay red o falta la clave, tu CLI no revienta con un traceback: lo explica en una
            línea y sigue ofreciendo todas las acciones que no necesitan IA.
          </p>
        </div>
      </div>

      <Nota tono="rose">
        <b>Seguridad desde el día 1.</b> <C>.gitignore</C> con <C>.env</C> antes del primer commit;
        nunca claves en el repo ni en el chat; acciones destructivas siempre con <C>--simular</C>{" "}
        primero y confirmación; y prueba <b>siempre</b> en <C>~/pruebas-tareas</C>, nunca en tus
        ficheros reales hasta que funcione.
      </Nota>

      {/* 10 · Planificación */}
      <h2 id="planificacion" className={h2}>Planificación: las dos primeras semanas</h2>
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {SEMANAS.map((s) => (
          <div key={s.n} className={`${card} flex flex-col`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300">{s.n}</span>
              <span className="rounded-full bg-zinc-100 dark:bg-white/10 px-2.5 py-0.5 text-[12px] font-bold text-zinc-700 dark:text-zinc-300">{s.fechas}</span>
            </div>
            <h3 className="mt-2 text-[17px] font-extrabold">{s.sesion}</h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              <b>Objetivo:</b> {s.objetivo}
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
              {s.hace.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="mt-4 flex-1 rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-3 text-sm text-emerald-900 dark:text-emerald-200">
              <b>Producto al acabar:</b> {s.producto}
            </div>
            <Link
              href={s.href}
              className="mt-4 inline-flex w-fit items-center gap-1 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Ir a la sesión →
            </Link>
          </div>
        ))}
      </div>

      <h3 className="mt-8 text-lg font-bold">Cómo se organiza cada grupo</h3>
      <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={card}>
          <span className={chip}>Presencial</span>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Es tu <b>segundo proyecto</b>: línea individual de <b>4 h/semana</b> en el aula, en paralelo a la startup en grupo (las otras 4 h).</li>
            <li>Equipos del aula con <b>Linux</b>: la terminal es bash desde el primer minuto.</li>
            <li>Herramientas: terminal, el agente de código del centro (<b>OpenCode</b>) y el <b>chat del centro</b> con modelos locales.</li>
            <li>Cada sesión acaba con commit y push: lo que no está en GitHub no existe.</li>
          </ul>
        </div>
        <div className={card}>
          <span className="inline-block rounded-full border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">
            Semipresencial
          </span>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
            <li><b>Quincena 3</b> = estas dos semanas (26 oct → 6 nov).</li>
            <li><b>Comprobación de proceso el 6 nov:</b> 3 acciones propias funcionando + ADR + commits reales.</li>
            <li><b>Quincena 4</b> (9 → 20 nov): IA, pruebas, release y <b>entrega el 20 nov</b>.</li>
            <li>Primera unidad con <b>editor en casa</b>: VS Code con su terminal integrada y el asistente de código que facilite la Conselleria. El chat de Copilot de Microsoft 365 sigue valiendo para preguntar.</li>
            <li>La terminal se aprende en la <b>tutoría colectiva de arranque</b>, de <b>presencia obligatoria</b> (fecha en el aula virtual).</li>
            <li>Tu equipo puede ser Windows, Linux o macOS: la sección multiplataforma es para ti.</li>
          </ul>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-white/15 p-4">
          <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Después · semana 3</div>
          <p className={`mt-1 ${muted}`}>Capa IA: <C>.env</C>, modelos del centro y modo sin red.</p>
        </div>
        <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-white/15 p-4">
          <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Después · semana 4</div>
          <p className={`mt-1 ${muted}`}>Pruebas (pytest + GitHub Actions), README, release v1.0 y día de instalación cruzada.</p>
        </div>
      </div>

      {/* 11 · Evaluación */}
      <h2 id="evaluacion" className={h2}>Cómo se evalúa</h2>
      <p className={lead}>
        Primero, la puerta de entrada: si falla <b>cualquiera</b> de estos mínimos, el proyecto no se
        evalúa (aunque el resto esté genial).
      </p>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {RUBRICA_CLI.minimos.map((m) => (
          <li key={m.id} className="flex gap-3 rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-4 text-sm text-amber-950 dark:text-amber-100">
            <span aria-hidden className="font-extrabold text-amber-600 dark:text-amber-400">✓</span>
            {m.texto}
          </li>
        ))}
      </ul>
      <p className={`mt-6 ${lead}`}>
        Después, {RUBRICA_CLI.criterios.length} criterios con su peso. Esto es lo que hay que hacer
        para el <b>Excelente</b> en cada uno:
      </p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-100 dark:bg-white/10">
              <th className={`${th} w-[26%]`}>Criterio</th>
              <th className={`${th} w-[9%] text-right`}>Peso</th>
              <th className={th}>Nivel Excelente</th>
            </tr>
          </thead>
          <tbody>
            {RUBRICA_CLI.criterios.map((c) => (
              <tr key={c.id} className={tr}>
                <td className="px-3.5 py-2.5 align-top">
                  <div className="font-bold text-zinc-800 dark:text-zinc-200">{c.nombre}</div>
                  <div className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-400">{c.qué}</div>
                </td>
                <td className="px-3.5 py-2.5 text-right align-top font-mono font-bold text-blue-700 dark:text-blue-300">{c.peso} %</td>
                <td className={td}>{c.niveles[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={`mt-3 ${muted}`}>
        La rúbrica completa, con los cuatro niveles (
        {RUBRICA_CLI.niveles.map((n) => n.nombre).join(", ")}) de cada criterio, está en el campus
        del aula. Léela antes de empezar, no después de entregar.
      </p>

      {/* 12 · Enlaces */}
      <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          ["/programacion-ia/acceso/", "Acceso al aula", "Campus: entregas, rúbrica completa y notas."],
          ["/programacion-ia/presencial/", "Grupo presencial", "Horario, proyectos y avisos del grupo."],
          ["/programacion-ia/semipresencial/", "Grupo semipresencial", "Quincenas, tutorías y entregas."],
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
    </div>
  );
}
