import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { RUBRICA_CLI } from "@/lib/campus/rubricas";
import {
  AntesDespues,
  Arbol,
  Aviso,
  Bloque,
  C,
  Checklist,
  Chip,
  Codigo,
  CriterioRubrica,
  DosColumnas,
  LineaTiempo,
  TONO,
  Tarjeta,
  Terminal,
  cls,
  type Hito,
  type NodoArbol,
  type Tono,
} from "../_video/piezas";
import { QuienHace } from "../opencode/figuras";
import {
  AnatomiaOrden,
  Calendario,
  CapasTerminal,
  CicloDesarrollo,
  DelNombreAlCodigo,
  PesosRubrica,
  RecorridoOrden,
  TareaAOrden,
  TresSistemas,
  Tuberia,
  TyperDeduce,
} from "./figuras";

export const metadata: Metadata = {
  title: "Proyecto 2 · CLI «tareas con IA» — Curso de Programación con IA",
  description:
    "Proyecto 2: tu herramienta de terminal en Python (Typer + uv), construida con el agente OpenCode y los modelos de IA del centro. Linux, Windows y macOS.",
};

// Página pensada para grabarse (docs/paginas-para-video.md): cada <Bloque> es
// una pantalla de 16:9 con una sola idea y lo que cuenta cada pieza está
// escrito, sin pulsar ni pasar el ratón. El hilo del proyecto (una herramienta
// útil para ti, que automatiza lo que te hace perder tiempo) va en la portada.

/* ------------------------------------------------------------------ */
/* Datos                                                               */
/* ------------------------------------------------------------------ */

const INDICE = [
  ["perder-tiempo", "Tu herramienta"],
  ["que-es", "Qué es una CLI"],
  ["anatomia", "Anatomía de una orden"],
  ["mundo", "Las CLI que usa el mundo"],
  ["ciclo", "Cómo se desarrolla"],
  ["agente", "Con un agente"],
  ["tecnologias", "Tecnologías"],
  ["multiplataforma", "Multiplataforma"],
  ["instalar", "Instalarla"],
  ["proyecto", "El proyecto"],
  ["planificacion", "Las cuatro semanas"],
  ["evaluacion", "Cómo se evalúa"],
] as const;

const IDEAS: [number, string, string, string][] = [
  [1, "Renombrar", "Fotos con su fecha (2026-10-26_001.jpg), quitar espacios y tildes de nombres, numerar entregas.", "sistema"],
  [2, "Ordenar", "Descargas por tipo (PDF, imágenes, comprimidos, instaladores) o apuntes por asignatura según el nombre.", "sistema"],
  [3, "Limpiar y detectar", "Temporales con más de 30 días, duplicados por hash (mismo contenido, distinto nombre), informe de espacio en disco por carpeta.", "sistema"],
  [4, "Resumir con IA", "Resumir PDFs o textos largos, generar el README de una carpeta de proyecto, convertir apuntes desordenados en Markdown limpio.", "IA"],
  [5, "Renombrar por contenido con IA", "La IA lee el principio de cada documento y propone un nombre que diga lo que es (con --simular primero).", "IA"],
  [6, "Acciones encadenadas", "Ordenar → quitar duplicados → resumir lo nuevo → informe final. Una orden, varios pasos.", "sistema + IA"],
];

const PIEZAS: [string, string, string][] = [
  ["Ayuda (--help)", "Toda CLI decente se explica sola. Es lo primero que pruebas con una herramienta nueva y lo primero que se evalúa en la tuya.", "tareas --help\ntareas ejecutar --help"],
  ["Argumentos vs opciones", "Argumento: dato posicional, normalmente obligatorio (QUÉ). Opción: empieza por - o --, tiene nombre y suele ser opcional (CÓMO). Un flag es una opción sí/no.", "tareas listar ~/Descargas            # argumento\ntareas listar ~/Descargas --json     # + opción (flag)\ntareas --config otro.json acciones   # opción con valor"],
  ["stdin, stdout y stderr", "Tres canales: entrada estándar, salida estándar (resultados) y salida de error (avisos y fallos). Separarlos permite redirigir solo lo útil.", "tareas listar > lista.txt          # stdout a un fichero\ntareas validar 2> errores.txt      # stderr a otro\ntareas listar --json | jq length   # tubería: stdout entra en jq"],
  ["Códigos de salida", "Al acabar, el programa devuelve un número: 0 = todo bien, distinto de 0 = algo falló. Los scripts y la CI deciden con él. En tu CLI: 0 bien · 1 fallo al ejecutar · 2 error de uso · 3 configuración inválida.", "tareas validar\necho $?            # bash/zsh → 0, 1, 2 o 3\necho $LASTEXITCODE # PowerShell"],
  ["Variables de entorno", "Valores que el sistema le pasa al programa sin escribirlos en la orden: rutas, idioma, claves de API (nunca en el código).", "export TAREAS_MODELO=llama3   # bash/zsh\n$env:TAREAS_MODELO = \"llama3\"  # PowerShell"],
  ["Fichero de configuración", "Lo que cambia poco y no quieres teclear cada vez. En tu proyecto, las acciones viven en acciones.json, no en el código.", "tareas acciones                     # usa ./acciones.json\ntareas --config ~/mis.json acciones"],
  ["Formato de salida", "Para personas: tablas y colores. Para máquinas: --json (estable, sin colores). Una buena CLI ofrece las dos.", "tareas listar ~/Descargas          # tabla bonita\ntareas listar ~/Descargas --json   # para otro programa"],
  ["Interactiva vs no interactiva", "Antes de borrar, pregunta (¿Seguro? [s/N]). Pero en un script nadie responde: --si confirma sin preguntar. Y --simular enseña qué haría sin tocar nada.", "tareas ejecutar limpiar-temporales --simular\ntareas ejecutar limpiar-temporales        # pregunta\ntareas ejecutar limpiar-temporales --si   # no pregunta"],
];

const GRUPOS_PIEZAS: [string, number][] = [
  ["Ayuda y argumentos", 0],
  ["Canales y salida del programa", 2],
  ["Entorno y configuración", 4],
  ["Formato y preguntas", 6],
];

const HERRAMIENTAS: { cat: string; items: [string, string, string][] }[] = [
  {
    cat: "Código y versiones",
    items: [
      ["git", "Control de versiones: la máquina del tiempo de tu código.", "git log --oneline -5"],
      ["gh", "GitHub desde la terminal: repos, issues, PR y releases.", "gh repo create cli-tareas --public"],
      ["OpenCode", "Agente de código open source que vive en la terminal: lee tu repo, ejecuta órdenes (con tu permiso) y propone cambios. Primos: Claude Code, Codex CLI, Gemini CLI.", "opencode"],
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

const CICLO: [string, string, string][] = [
  ["Spec de 10 líneas", "Para quién es, qué problema resuelve, qué órdenes tendrá, qué NO hará. Si no cabe en 10 líneas, aún no sabes qué quieres.", "docs/spec.md"],
  ["Interfaz", "Las órdenes y opciones exactas, como las teclearía alguien. Se diseña antes que el código: es el contrato con quien la usa.", "tareas --help"],
  ["Núcleo (motor)", "La lógica que hace el trabajo, separada de la interfaz: el motor no sabe nada de Typer ni de colores. Así se prueba y se reutiliza.", "motor.py"],
  ["Errores y casos feos", "Carpeta que no existe, JSON mal escrito, fichero abierto, sin permisos, sin red, nombre con tildes. Mensajes claros, nunca un traceback.", "errores.py"],
  ["Pruebas", "pytest comprueba que cada acción hace lo que dice en una carpeta temporal. Si cambias algo y se rompe, te enteras antes que tu usuario.", "tests/"],
  ["Empaquetado e instalación", "pyproject.toml con su entry point: tu programa se convierte en un comando que se instala con una orden.", "uv tool install"],
  ["Release", "Versión etiquetada (v1.0.0), notas de cambios y README con instalación probada en otro sistema.", "git tag v1.0.0"],
];

const FLUJO: [string, string][] = [
  ["Tú decides", "Escribes la intención: la spec, tu acciones.json o el criterio de aceptación de la tarea."],
  ["Plan", "Agente plan (Shift+Tab): «explícame cómo lo harías y qué ficheros tocarías». Lees el plan y lo corriges."],
  ["Build aprobando diffs", "Agente build (Shift+Tab): «hazlo». Lees cada diff y cada orden antes de aceptarla."],
  ["Auditas", "Lees el código y pruebas con --simular en ~/pruebas-tareas, con casos feos. ¿Mal? /undo o le explicas el fallo."],
  ["Commit tuyo", "git add + git commit los haces tú, pequeños y con un mensaje que cuente el paso. El prompt clave, a docs/prompts.md."],
  ["Sesión nueva", "/new para cada tarea y /compact si la conversación se alarga: contexto limpio, menos errores."],
];

const FICHEROS_REPO: [string, string, string][] = [
  ["opencode.json", "Semana 1", "Permisos: qué puede hacer solo (leer, git status), qué te pregunta (editar, casi todas las órdenes) y qué nunca (git push, rm, leer .env)."],
  ["AGENTS.md", "Semana 1", "Lo genera /init y lo editas tú: stack, órdenes del proyecto y normas (pathlib, utf-8, nada de commits ni push)."],
  [".opencode/skills/acciones-json/SKILL.md", "Semana 2", "Skill: las reglas de tu acciones.json, que el agente carga cuando toca acciones."],
  [".opencode/commands/nueva-accion.md", "Semana 2", "Comando /nueva-accion: añadir una acción siempre con los mismos pasos."],
  [".opencode/agents/revisor.md", "Semana 2", "Subagente revisor de solo lectura: se lo pides por su nombre y busca errores y casos feos antes de cada commit."],
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
  { regla: "Rutas con pathlib, nunca concatenando", mal: "ruta = carpeta + \"/\" + nombre", bien: "ruta = Path(carpeta) / nombre", por: "Windows usa \\ y Linux /. Path elige el separador correcto por ti." },
  { regla: "La ~ hay que expandirla", mal: "open(\"~/Descargas/lista.txt\")", bien: "Path(\"~/Descargas\").expanduser() / \"lista.txt\"", por: "~ lo entiende la shell, no Python. Sin expanduser() busca una carpeta llamada «~»." },
  { regla: "Codificación explícita", mal: "Path(\"acciones.json\").read_text()", bien: "Path(\"acciones.json\").read_text(encoding=\"utf-8\")", por: "En Windows la codificación por defecto puede no ser UTF-8: las tildes y la ñ se rompen." },
  { regla: "Nada de shell=True ni os.system", mal: "os.system(\"mv \" + origen + \" \" + destino)", bien: "shutil.move(origen, destino)", por: "mv no existe en PowerShell clásico, un nombre con espacios lo rompe y abre la puerta a inyecciones." },
  { regla: "Saltos de línea normalizados", mal: "(sin .gitattributes)", bien: "# .gitattributes\n* text=auto", por: "Windows usa CRLF y Linux LF. Sin esto, git marca cambios fantasma en todas las líneas." },
  { regla: "Colores con Rich", mal: "print(\"\\033[31mError\\033[0m\")", bien: "console.print(\"[red]Error[/red]\")", por: "Los códigos ANSI a mano salen como basura en algunas consolas. Rich detecta lo que soporta cada una." },
];

const GRUPOS_REGLAS: [string, number][] = [
  ["Rutas y la ~", 0],
  ["Codificación y órdenes del sistema", 2],
  ["Saltos de línea y colores", 4],
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

const ESTRUCTURA: NodoArbol[] = [
  { nombre: "pyproject.toml", nivel: 0, nota: '[project.scripts] tareas = "tareas.cli:app"' },
  { nombre: "README.md", nivel: 0 },
  { nombre: ".gitignore", nivel: 0, nota: ".venv/, __pycache__/, .env, *.egg-info, dist/" },
  { nombre: ".gitattributes", nivel: 0, nota: "* text=auto" },
  { nombre: "acciones.json", nivel: 0, nota: "TUS acciones (lo escribes tú)", tono: "ambar" },
  { nombre: "docs/adr/0001-configuracion-externa.md", nivel: 0 },
  { nombre: "src/tareas/", nivel: 0, carpeta: true },
  { nombre: "__init__.py", nivel: 1, nota: '__version__ = "0.1.0"' },
  { nombre: "__main__.py", nivel: 1, nota: "permite: python -m tareas" },
  { nombre: "cli.py", nivel: 1, nota: "interfaz Typer: órdenes, opciones, salida", tono: "azul" },
  { nombre: "config.py", nivel: 1, nota: "leer y VALIDAR acciones.json" },
  { nombre: "motor.py", nivel: 1, nota: "clase Motor: ejecuta una Accion sobre una carpeta", tono: "morado" },
  { nombre: "acciones.py", nivel: 1, nota: "clases Accion (mover, renombrar, copiar, borrar…)", tono: "morado" },
  { nombre: "errores.py", nivel: 1, nota: "TareasError, ConfigError, AccionNoValida" },
  { nombre: "tests/", nivel: 0, carpeta: true, nota: "semana 4" },
];

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

// Lo que hace cada acción del ejemplo, con ficheros inventados para verlo.
type Ejemplo = {
  titulo: string;
  linea: [number, number];
  orden: string;
  aviso?: string;
  antes: { titulo: string; raiz: string; nodos: NodoArbol[] };
  despues: { titulo: string; raiz: string; nodos: NodoArbol[] };
};

const EJEMPLOS: Ejemplo[] = [
  {
    titulo: "Qué hace ordenar-descargas",
    linea: [4, 5],
    orden: "tareas ejecutar ordenar-descargas",
    antes: {
      titulo: "Descargas, antes",
      raiz: "~/",
      nodos: [
        { nombre: "Descargas/", nivel: 0, carpeta: true },
        { nombre: "apuntes-tema1.pdf", nivel: 1 },
        { nombre: "contrato.docx", nivel: 1 },
        { nombre: "foto-playa.jpg", nivel: 1 },
        { nombre: "Documentos/PDF/", nivel: 0, carpeta: true },
      ],
    },
    despues: {
      titulo: "Descargas, después",
      raiz: "~/",
      nodos: [
        { nombre: "Descargas/", nivel: 0, carpeta: true },
        { nombre: "foto-playa.jpg", nivel: 1, nota: "no es PDF ni docx: se queda" },
        { nombre: "Documentos/PDF/", nivel: 0, carpeta: true },
        { nombre: "apuntes-tema1.pdf", nivel: 1, tono: "verde" },
        { nombre: "contrato.docx", nivel: 1, tono: "verde" },
      ],
    },
  },
  {
    titulo: "Qué hace renombrar-fotos",
    linea: [6, 7],
    orden: "tareas ejecutar renombrar-fotos ~/Imágenes/viaje",
    antes: {
      titulo: "Fotos, antes",
      raiz: "~/Imágenes/viaje/",
      nodos: [
        { nombre: "IMG_2041.jpg", nivel: 0 },
        { nombre: "IMG_2042.jpg", nivel: 0 },
        { nombre: "Captura de pantalla.png", nivel: 0 },
        { nombre: "notas.txt", nivel: 0 },
      ],
    },
    despues: {
      titulo: "Fotos, después",
      raiz: "~/Imágenes/viaje/",
      nodos: [
        { nombre: "2026-10-26_001.jpg", nivel: 0, tono: "verde" },
        { nombre: "2026-10-26_002.jpg", nivel: 0, tono: "verde" },
        { nombre: "2026-10-26_003.png", nivel: 0, tono: "verde" },
        { nombre: "notas.txt", nivel: 0, nota: "no es una foto: se queda" },
      ],
    },
  },
  {
    titulo: "Qué hace limpiar-temporales",
    linea: [8, 9],
    orden: "tareas ejecutar limpiar-temporales ~/pruebas-tareas",
    aviso: "Antes de borrar pregunta: ¿Seguro? [s/N]",
    antes: {
      titulo: "Temporales, antes",
      raiz: "~/pruebas-tareas/",
      nodos: [
        { nombre: "cache-viejo.tmp", nivel: 0, nota: "hace 45 días" },
        { nombre: "sesion.tmp", nivel: 0, nota: "hace 2 días" },
        { nombre: "informe.pdf", nivel: 0 },
      ],
    },
    despues: {
      titulo: "Temporales, después",
      raiz: "~/pruebas-tareas/",
      nodos: [
        { nombre: "sesion.tmp", nivel: 0, nota: "menos de 30 días: se queda" },
        { nombre: "informe.pdf", nivel: 0, nota: "no es .tmp: se queda" },
      ],
    },
  },
];

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
    opencode: [
      "Instalar OpenCode (la última versión estable) y conectarlo a los modelos del centro.",
      "uv init y .gitignore a mano y primer commit ANTES de abrir OpenCode (/undo necesita git).",
      "opencode.json de permisos en la raíz del repo.",
      "/init → AGENTS.md, que revisas y editas tú.",
      "plan → build para crear cli.py (version + listar), aprobando cada diff; /undo cuando algo sale mal.",
    ],
    producto: "Repo cli-tareas en GitHub con tareas --help, tareas version y tareas listar funcionando, opencode.json y AGENTS.md, y varios commits tuyos que cuentan el proceso.",
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
    opencode: [
      "Tu acciones.json lo escribes tú, sin IA.",
      "Skill del proyecto acciones-json con las reglas del esquema (compruébala con /skills).",
      "Comando personalizado /nueva-accion para añadir acciones siempre igual.",
      "Subagente revisor de solo lectura y /review antes de cada commit.",
    ],
    producto: "3 acciones propias funcionando con --simular, tareas validar con mensajes claros, ADR escrito, skill + comando + revisor en .opencode/ y commits pequeños.",
  },
  {
    n: "Semana 3",
    fechas: "9-13 nov",
    sesion: "Sesión 3 · La capa IA: tu CLI pregunta a los modelos del centro",
    href: "/programacion-ia/cli/sesion-03/",
    objetivo: "Que tu herramienta lea: resuma, ponga nombre y clasifique con los modelos del centro, sin filtrar la clave y sin dejar a nadie tirado sin red.",
    hace: [
      "Secretos primero: .env ignorado, .env.example documentado y el historial comprobado.",
      "ProveedorIA detrás de una interfaz y ProveedorCentro con httpx; orden comprobar-ia.",
      "Al menos 2 acciones con IA tuyas (resumir, renombrar-ia, clasificar…); --simular no gasta.",
      "La respuesta del modelo se limpia o se valida antes de usarla.",
      "Modo sin red: sale con 4, lo explica y las acciones sin IA siguen funcionando.",
    ],
    opencode: [
      "MCP: context7 en opencode.json, apagado, y encendido con /mcps solo para consultar la documentación de httpx.",
      "Lo que trae el MCP también se audita: la forma obsoleta de httpx 0.28.",
      "Skill acciones-json al día con los tipos de IA.",
    ],
    producto: "2 acciones con IA tuyas, comprobar-ia, modo sin red, ninguna clave en el historial, la skill y el README al día y el ADR-0002.",
  },
  {
    n: "Semana 4",
    fechas: "16-20 nov",
    sesion: "Sesión 4 · Pruebas y release v1.0",
    href: "/programacion-ia/cli/sesion-04/",
    objetivo: "Demostrar que funciona, que sigue funcionando y que otra persona la instala con una orden.",
    hace: [
      "pytest con una caja de arena: ninguna prueba toca tus carpetas ni el servidor.",
      "Casos feos con parametrize, y el código roto a propósito para ver la prueba en rojo.",
      "La IA probada con un ProveedorFalso; los códigos de salida, con CliRunner.",
      "GitHub Actions en Linux, Windows y macOS en cada push.",
      "Release v1.0.0: rama, PR, CHANGELOG, README, tag e instalación cruzada.",
    ],
    opencode: [
      "El agente escribe las pruebas; tú auditas cada assert.",
      "opencode run sin pantalla: el revisor en un script (scripts/revisar.sh).",
      "Un borrador de CHANGELOG desde git log… que hay que corregir.",
    ],
    producto: "28 pruebas o más en verde en tres sistemas, la etiqueta v1.0.0 con su release y su CHANGELOG, y la instalación de un compañero.",
  },
];

const RUTA: Hito[] = [
  { titulo: "Semana 1", fecha: "26-30 oct", enlace: { texto: "Sesión 1 · Arranque", href: SEMANAS[0].href }, puntos: SEMANAS[0].hace },
  { titulo: "Semana 2", fecha: "2-6 nov", enlace: { texto: "Sesión 2 · acciones.json", href: SEMANAS[1].href }, puntos: SEMANAS[1].hace },
  {
    titulo: "Semana 3",
    fecha: "9-13 nov",
    enlace: { texto: "Sesión 3 · Capa IA", href: SEMANAS[2].href },
    puntos: ["2 acciones con IA tuyas, la clave fuera del repo y un modo sin red.", "context7 por MCP, solo cuando hace falta."],
  },
  {
    titulo: "Semana 4",
    fecha: "16-20 nov",
    enlace: { texto: "Sesión 4 · Release", href: SEMANAS[3].href },
    puntos: ["pytest y Actions en 3 sistemas, opencode run en un script y la release v1.0."],
  },
];

const GRUPOS_RUBRICA: [string, number[]][] = [
  ["Rúbrica: acciones y configuración", [0, 1]],
  ["Rúbrica: IA y robustez", [2, 3]],
  ["Rúbrica: diseño y pruebas", [4, 5]],
  ["Rúbrica: instalación y proceso", [6]],
];

/* ------------------------------------------------------------------ */
/* Piezas propias de esta página                                       */
/* ------------------------------------------------------------------ */

/** Dificultad de 1 a 6 en puntos dibujados (sin texto: no compite con el contraste). */
function Dificultad({ n }: { n: number }) {
  return (
    <svg viewBox="0 0 84 12" width={84} height={12} role="img" aria-label={`Dificultad ${n} de 6`} className="shrink-0">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={i} cx={6 + i * 14} cy={6} r={5} className={i < n ? "fill-amber-500 dark:fill-amber-400" : "fill-zinc-300 dark:fill-zinc-600"} />
      ))}
    </svg>
  );
}

/** Regla multiplataforma: la regla y su porqué a un lado; MAL y BIEN, al otro. */
function ReglaSistema({ r }: { r: (typeof REGLAS)[number] }) {
  return (
    <div className={`${cls.tarjeta} grid min-w-0 grid-cols-1 gap-x-6 gap-y-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]`}>
      <div className="min-w-0">
        <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{r.regla}</h4>
        <p className={`mt-2 ${cls.texto}`}>{r.por}</p>
      </div>
      <div className="min-w-0 space-y-2 self-center font-mono text-base">
        <div className="flex gap-3 overflow-x-auto rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 dark:border-rose-500/30 dark:bg-rose-500/10">
          <span className="shrink-0 font-sans font-extrabold text-rose-700 dark:text-rose-300">MAL</span>
          <span className="whitespace-pre text-rose-900 dark:text-rose-100">{r.mal}</span>
        </div>
        <div className="flex gap-3 overflow-x-auto rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 dark:border-emerald-500/30 dark:bg-emerald-500/10">
          <span className="shrink-0 font-sans font-extrabold text-emerald-700 dark:text-emerald-300">BIEN</span>
          <span className="whitespace-pre text-emerald-900 dark:text-emerald-100">{r.bien}</span>
        </div>
      </div>
    </div>
  );
}

/** Texto en el que las opciones (-x, --help…) no se parten por el guion al saltar de línea. */
function SinPartirOpciones({ texto }: { texto: string }) {
  return texto.split(" ").map((t, i) => (
    <span key={i}>
      {i > 0 ? " " : ""}
      {t.startsWith("-") ? <span className="whitespace-nowrap">{t}</span> : t}
    </span>
  ));
}

const th = "px-4 py-2.5 text-left text-base font-bold text-zinc-800 dark:text-zinc-100";
const tdMono = "px-4 py-2 align-top font-mono text-base text-zinc-800 dark:text-zinc-200";

/**
 * Herramientas por categoría: nombre, para qué y un ejemplo de orden. Sin
 * `categoria` cuando el título del bloque ya la dice (no se repite el encabezado).
 */
function Herramientas({ grupos, categoria = true }: { grupos: typeof HERRAMIENTAS; categoria?: boolean }) {
  return (
    <div className="space-y-5">
      {grupos.map((g) => (
        <div key={g.cat}>
          {categoria ? <h4 className="text-base font-extrabold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">{g.cat}</h4> : null}
          <ul className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map(([n, d, ej]) => (
              <li
                key={n}
                className={`flex min-w-0 flex-col rounded-2xl border p-4 ${
                  n === "OpenCode"
                    ? "border-blue-400 bg-blue-50 dark:border-blue-400/60 dark:bg-blue-500/10"
                    : "border-zinc-200 bg-white dark:border-white/10 dark:bg-slate-900"
                }`}
              >
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-lg font-bold text-zinc-900 dark:text-zinc-50">{n}</span>
                  {n === "OpenCode" ? <Chip>la que usarás</Chip> : null}
                </span>
                <span className={`mt-1 flex-1 text-base leading-snug text-zinc-700 dark:text-zinc-300`}>{d}</span>
                <code className="mt-2 block whitespace-pre-wrap rounded-lg bg-[#0b1120] px-3 py-1.5 font-mono text-base text-emerald-300 [overflow-wrap:anywhere]">
                  <span aria-hidden className="select-none text-slate-400">
                    ${" "}
                  </span>
                  <SinPartirOpciones texto={ej} />
                </code>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export default function CursoIACliTareas() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      {/* Portada */}
      <section data-bloque className="max-w-[1100px]">
        <Breadcrumbs
          grande
          items={[
            { title: "Curso de Programación con IA", path: "/programacion-ia/" },
            { title: "CLI tareas con IA", path: "/programacion-ia/cli/" },
          ]}
        />
        <Chip>Proyecto 2 · CLI tareas con IA · Presencial y semipresencial</Chip>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Tu propia herramienta de terminal: <span className="text-blue-600 dark:text-blue-400">tareas</span>
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          Vas a construir una <b>CLI</b>: un programa que se usa escribiendo órdenes en la terminal y que trabaja con{" "}
          <b>tus ficheros</b> — ordena descargas, renombra fotos, limpia temporales, resume documentos — mediante{" "}
          <b>acciones que defines tú</b> en un fichero <C>acciones.json</C>. Combina lo que sabe hacer el sistema operativo
          con lo que sabe hacer la IA, y se instala con <b>una sola orden</b> en Linux, Windows y macOS.
        </p>

        <div className={`mt-5 rounded-2xl border p-5 ${TONO.verde.caja}`}>
          <p className={`text-base font-bold uppercase tracking-wider ${TONO.verde.texto}`}>El hilo del proyecto 2</p>
          <p className="mt-1 text-xl font-bold text-emerald-950 dark:text-emerald-50">
            Cada uno se construye una herramienta útil para sí mismo, y reutilizable.
          </p>
          <ol className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
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
      </section>

      <Bloque titulo="En esta página">
        <nav aria-label="En esta página">
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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

      {/* 1 · Lo que te hace perder tiempo */}
      <Bloque
        id="perder-tiempo"
        titulo="Tareas que te hacen perder tiempo"
        entradilla={
          <>
            Tus acciones tienen que resolver <b>un problema tuyo</b>: mira tu carpeta de descargas y piensa qué te gustaría
            no volver a hacer a mano. Estas son ideas, de menos a más difícil; empieza por arriba. Las de IA llegan en la
            semana 3.
          </>
        }
      >
        <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {IDEAS.map(([n, t, d, tipo]) => (
            <li key={t} className={`${cls.tarjeta} flex min-w-0 flex-col !p-4`}>
              <span className="flex items-center gap-2">
                <span aria-hidden className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-extrabold ${TONO.azul.disco}`}>
                  {n}
                </span>
                <span className="text-xl font-bold leading-tight text-zinc-900 dark:text-zinc-100">{t}</span>
              </span>
              <span className="mt-2 flex items-center gap-3">
                <Chip tono={tipo === "sistema" ? "gris" : "morado"}>{tipo}</Chip>
                <Dificultad n={n} />
              </span>
              <span className={`mt-2 ${cls.texto}`}>{d}</span>
            </li>
          ))}
        </ol>
      </Bloque>

      <Bloque titulo="De la tarea pesada a una orden" nivel={3}>
        <TareaAOrden />
      </Bloque>

      <Bloque titulo="Por qué importa" nivel={3}>
        <div className="space-y-3">
          <p className={`max-w-4xl text-lg ${cls.texto}`}>
            Los desarrolladores viven en la terminal. Git, los gestores de paquetes, los servidores, la integración continua
            y los propios agentes de IA son CLI. Quien sabe usarlas <b>automatiza</b>; quien sabe <b>construirlas</b> crea
            herramientas que usan otros.
          </p>
          <p className={`max-w-4xl text-lg ${cls.texto}`}>
            Y la construyes de otra manera: desde este proyecto trabajas de forma <b>agéntica</b> con <b>OpenCode</b>, un
            agente de programación open source conectado a los <b>modelos de IA locales del centro</b>. Tú decides qué se
            hace y apruebas cada cambio; el agente lee tu repo, propone y edita. El chat queda para consultas.
          </p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[
            ["Python 3.12", "+ Typer + uv"],
            ["acciones.json", "tus acciones, fuera del código"],
            ["Sistema + IA", "ficheros reales y modelos"],
            ["3 sistemas", "Linux · Windows · macOS"],
            ["OpenCode", "agente del centro · modelos locales"],
          ].map(([a, b]) => (
            <div key={a} className={`${cls.suave} !p-4`}>
              <p className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">{a}</p>
              <p className={cls.tenue}>{b}</p>
            </div>
          ))}
        </div>
      </Bloque>

      {/* 2 · Qué es una CLI */}
      <Bloque
        id="que-es"
        titulo="Qué es una CLI"
        entradilla={
          <>
            <b>CLI</b> (<i>Command Line Interface</i>, interfaz de línea de órdenes) es un programa que se controla
            escribiendo texto: tecleas una orden, pulsas Intro, el programa hace su trabajo, escribe un resultado y termina.
            Sin ventanas, sin botones. Lo contrario es una <b>GUI</b> (<i>Graphical User Interface</i>): ventanas, menús y
            ratón.
          </>
        }
      >
        <DosColumnas
          a={{
            antetitulo: "ventanas y ratón",
            titulo: "Gana la GUI",
            tono: "verde",
            puntos: [
              "Explorar algo que no conoces: ves las opciones en pantalla.",
              "Tareas visuales: retocar una foto, maquetar, editar vídeo a mano.",
              "Usuarios que no quieren aprender órdenes.",
            ],
          }}
          b={{
            antetitulo: "texto y teclado",
            titulo: "Gana la CLI",
            tono: "azul",
            puntos: [
              "Automatizar y repetir: la misma orden hoy, mañana y 300 veces.",
              "Encadenar herramientas con tuberías (|): la salida de una es la entrada de otra.",
              "Servidores sin pantalla: el 90 % de Internet se administra por SSH.",
              "Scripts, tareas programadas (cron) e integración continua (CI): nadie hace clic ahí.",
              "Dejar rastro: una orden se copia, se documenta y se repite exacta.",
            ],
          }}
        />
      </Bloque>

      <Bloque titulo="Terminal, shell y CLI: no es lo mismo" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="Terminal" nivel={4} antetitulo="La ventana">
            <p>La aplicación que muestra texto y recoge lo que tecleas: Terminal de Linux o macOS, Windows Terminal, la terminal integrada de VS Code.</p>
          </Tarjeta>
          <Tarjeta titulo="Shell" nivel={4} antetitulo="El intérprete">
            <p>
              El programa que lee tu orden y la lanza: <b>bash</b> (Linux), <b>zsh</b> (macOS), <b>PowerShell</b> (Windows).
              Cada una tiene su sintaxis: por eso hay órdenes que cambian de un sistema a otro.
            </p>
          </Tarjeta>
          <Tarjeta titulo="CLI" nivel={4} antetitulo="El programa">
            <p>
              La herramienta que la shell ejecuta: <C>git</C>, <C>curl</C>, <C>uv</C>… y, dentro de dos semanas,{" "}
              <C>tareas</C>. Funciona igual desde cualquier shell.
            </p>
          </Tarjeta>
        </div>
      </Bloque>

      <Bloque titulo="Una dentro de otra" nivel={3}>
        <CapasTerminal />
      </Bloque>

      {/* 3 · Anatomía */}
      <Bloque
        id="anatomia"
        titulo="Anatomía de una orden"
        entradilla="Esta es una orden real de tu futura herramienta. Separada en piezas se entiende todo lo demás:"
      >
        <AnatomiaOrden />
      </Bloque>

      {GRUPOS_PIEZAS.map(([titulo, i], k) => (
        <Bloque
          key={titulo}
          titulo={titulo}
          nivel={3}
          entradilla={k === 0 ? "Y estas son las otras piezas que tiene cualquier CLI seria (y tendrá la tuya):" : undefined}
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {PIEZAS.slice(i, i + 2).map(([t, d, ej]) => (
              <Tarjeta key={t} titulo={t} nivel={4} className="flex flex-col">
                <p className="mb-3">{d}</p>
                <Codigo code={ej} />
              </Tarjeta>
            ))}
          </div>
        </Bloque>
      ))}

      {/* 4 · Las CLI que usa el mundo */}
      <Bloque
        id="mundo"
        titulo="Las CLI que usa el mundo"
        entradilla="Muchas de las herramientas más potentes de la informática no tienen ventanas. Algunas que verás (o usarás) este curso:"
      >
        <Herramientas grupos={HERRAMIENTAS.slice(0, 1)} />
      </Bloque>

      <Bloque titulo="Red, descargas y multimedia" nivel={3}>
        <Herramientas grupos={HERRAMIENTAS.slice(1, 3)} />
      </Bloque>

      <Bloque titulo="Búsqueda y entornos" nivel={3}>
        <Herramientas grupos={HERRAMIENTAS.slice(3, 5)} />
      </Bloque>

      <Bloque titulo="Ayuda e IA" nivel={3}>
        <Herramientas grupos={HERRAMIENTAS.slice(5)} categoria={false} />
      </Bloque>

      <Bloque titulo="Encadenar herramientas" nivel={3}>
        <Tuberia />
      </Bloque>

      <Aviso titulo="Truco para la vida" tono="azul">
        <p>
          Antes de buscar en Google cómo se usa una orden, prueba <C>orden --help</C>, <C>tldr orden</C> o <C>man orden</C>.
          Y si tu herramienta no se explica así de bien, aún no está terminada.
        </p>
      </Aviso>

      {/* 5 · Ciclo */}
      <Bloque
        id="ciclo"
        titulo="Cómo se desarrolla una CLI de verdad"
        entradilla="Las herramientas profesionales no salen de un prompt gigante. Salen de este ciclo, paso a paso, con un commit al acabar cada uno. Es el que seguirás:"
      >
        <CicloDesarrollo />
      </Bloque>

      <Bloque titulo="El ciclo, paso a paso" nivel={3}>
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CICLO.map(([t, d, ej], i) => (
            <li key={t} className={`${cls.tarjeta} flex min-w-0 flex-col !p-4`}>
              <span aria-hidden className="text-2xl font-extrabold text-blue-700 dark:text-blue-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{t}</span>
              <span className="mt-1 flex-1 text-base leading-snug text-zinc-700 dark:text-zinc-300">{d}</span>
              <code className="mt-2 w-fit rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-base text-zinc-800 dark:bg-white/10 dark:text-zinc-200">
                {ej}
              </code>
            </li>
          ))}
        </ol>
      </Bloque>

      <Aviso titulo="El método del curso" tono="ambar">
        <p>
          Tú <b>escribes</b> la spec y el <C>acciones.json</C> (decides qué hace), el agente (<b>OpenCode</b>){" "}
          <b>implementa</b> con tu permiso, y tú <b>auditas</b>: lees el código, pruebas casos feos y haces commits pequeños
          con mensajes que cuentan el proceso. Guarda tus prompts clave en <C>docs/prompts.md</C>.
        </p>
        <p>
          <i>Lo que no sabes explicar, no lo entregas.</i>
        </p>
      </Aviso>

      {/* 6 · Con un agente */}
      <Bloque
        id="agente"
        titulo="Cómo vas a trabajar: con un agente"
        entradilla={
          <>
            Hasta ahora le pedías código a un chat y lo copiabas. Desde este proyecto, el código lo escribe un <b>agente</b>{" "}
            dentro de tu repo, y tú diriges. Se usará <b>todo el curso</b>, en presencial y en semipresencial; este proyecto
            es la introducción.
          </>
        }
      >
        <DosColumnas
          a={{
            antetitulo: "Para consultas",
            titulo: "Chat",
            tono: "gris",
            puntos: [
              "Preguntas, responde con texto y tú copias.",
              "No ve tu repo ni ejecuta nada: si se equivoca, no se entera.",
              "Sigue valiendo para dudas y explicaciones.",
            ],
          }}
          b={{
            antetitulo: "Para construir",
            titulo: "Agente (OpenCode)",
            tono: "azul",
            puntos: [
              "Lee tus ficheros, propone un plan, edita y lanza órdenes.",
              "Cada cambio te lo pide primero, y comprueba el resultado.",
              "Más potencia, más responsabilidad: tú apruebas y tú auditas.",
            ],
          }}
        />
      </Bloque>

      <Bloque titulo="El flujo de cada sesión" nivel={3} entradilla="Siempre el mismo:">
        <QuienHace />
      </Bloque>

      <Bloque titulo="Los seis pasos del flujo" nivel={3}>
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FLUJO.map(([t, d], i) => (
            <li key={t} className={`${cls.tarjeta} flex min-w-0 gap-3 !p-4`}>
              <span aria-hidden className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-extrabold ${TONO.azul.disco}`}>
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-lg font-bold text-zinc-900 dark:text-zinc-100">{t}</span>
                <span className="mt-0.5 block text-base leading-snug text-zinc-700 dark:text-zinc-300">{d}</span>
              </span>
            </li>
          ))}
        </ol>
      </Bloque>

      <Bloque
        titulo="Qué configuras en tu repo"
        nivel={3}
        entradilla={
          <>
            La conexión con los modelos del centro va en tu configuración <b>global</b> (con variables de entorno: la clave
            nunca acaba en un fichero que subas a git). En el repo van las reglas del juego para el agente:
          </>
        }
      >
        <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {FICHEROS_REPO.map(([f, w, d]) => (
            <li key={f} className={`${cls.tarjeta} min-w-0 !p-4`}>
              <span className="flex flex-wrap items-center gap-2">
                <code className="font-mono text-base font-bold text-zinc-900 [overflow-wrap:anywhere] dark:text-zinc-50">{f}</code>
                <Chip tono={w === "Semana 1" ? "azul" : "morado"}>{w}</Chip>
              </span>
              <span className={`mt-1 block ${cls.texto}`}>{d}</span>
            </li>
          ))}
        </ul>
        <p className={`mt-3 ${cls.tenue}`}>
          Usamos la última versión estable de OpenCode 2. Cómo se instala, se conecta y se configura, en la guía.
        </p>
      </Bloque>

      <Aviso titulo="El gancho: OpenCode es una CLI" tono="verde">
        <p>
          La herramienta con la que vas a programar tu CLI es… <b>una CLI</b>. OpenCode tiene ayuda, opciones,
          subcomandos, fichero de configuración y códigos de salida: todo lo que estás a punto de construir. Úsala con ojo de
          quien la va a imitar.
        </p>
        <Link
          href="/programacion-ia/opencode/"
          className="mt-1 inline-flex flex-wrap items-center gap-x-3 rounded-xl bg-blue-600 px-5 py-3 text-lg font-bold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:text-slate-950 dark:hover:bg-blue-400"
        >
          Guía: OpenCode con los modelos del centro →
        </Link>
      </Aviso>

      {/* 7 · Tecnologías */}
      <Bloque id="tecnologias" titulo="Tecnologías para hacer una CLI" entradilla="Casi cualquier lenguaje sirve. Cada uno paga un precio distinto:">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {TECNOLOGIAS.slice(0, 3).map(([o, pro, contra, fam], i) => (
            <Tecnologia key={o} o={o} pro={pro} contra={contra} fam={fam} delCurso={i === 0} />
          ))}
        </div>
      </Bloque>

      <Bloque titulo="Rust y scripts de shell" nivel={3}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {TECNOLOGIAS.slice(3).map(([o, pro, contra, fam]) => (
            <Tecnologia key={o} o={o} pro={pro} contra={contra} fam={fam} />
          ))}
        </div>
      </Bloque>

      <Bloque titulo="Por qué Python 3 + Typer + uv" nivel={3}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {POR_QUE.map(([t, d]) => (
            <Tarjeta key={t} titulo={t} nivel={4} suave>
              <p>{d}</p>
            </Tarjeta>
          ))}
        </div>
      </Bloque>

      <Bloque
        titulo="Un hola mundo con Typer"
        nivel={3}
        entradilla={
          <>
            Fíjate: no escribes nada sobre la ayuda ni sobre cómo leer los argumentos. Typer lo deduce de{" "}
            <C>nombre: str</C>, <C>veces: int = 1</C> y <C>gritar: bool = False</C>.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,620px)_minmax(0,1fr)]">
          <Codigo code={HOLA_PY} kind="py" etiqueta="hola.py" ajustar={false} />
          <Terminal
            lineas={[
              { o: "uv run --with typer hola.py Ana --veces 2 --gritar" },
              { s: "HOLA, ANA" },
              { s: "HOLA, ANA" },
            ]}
          />
        </div>
      </Bloque>

      <Bloque titulo="Lo que Typer deduce de los tipos" nivel={3}>
        <TyperDeduce />
      </Bloque>

      <Bloque titulo="La ayuda que genera Typer" nivel={3}>
        <Codigo code={HOLA_HELP} kind="txt" etiqueta="Salida de: uv run --with typer hola.py --help" ajustar={false} />
      </Bloque>

      {/* 8 · Multiplataforma */}
      <Bloque
        id="multiplataforma"
        titulo="Multiplataforma: Linux primero"
        entradilla={
          <>
            …pero en todas partes. En el aula trabajas en <b>Linux</b>. Pero tu herramienta la instalará gente con{" "}
            <b>Windows</b> y <b>macOS</b> (y si eres de semipresencial, tu propio equipo puede ser cualquiera de los tres).
            Python lo pone fácil si respetas seis reglas.
          </>
        }
      >
        <TresSistemas />
      </Bloque>

      {GRUPOS_REGLAS.map(([titulo, i], k) => (
        <Bloque key={titulo} titulo={titulo} nivel={3}>
          <div className="space-y-4">
            {REGLAS.slice(i, i + 2).map((r) => (
              <ReglaSistema key={r.regla} r={r} />
            ))}
          </div>
          {k === GRUPOS_REGLAS.length - 1 ? (
            <p className={`mt-4 ${cls.texto}`}>
              Y en la semana 4, GitHub Actions ejecutará tus pruebas en Ubuntu, Windows y macOS a la vez en cada{" "}
              <C>git push</C>: si algo solo funciona en tu equipo, te enterarás.
            </p>
          ) : null}
        </Bloque>
      ))}

      <Bloque
        titulo="Equivalencias bash ↔ PowerShell"
        nivel={3}
        entradilla={
          <>
            PowerShell tiene alias con los nombres de Linux (<C>ls</C>, <C>cp</C>, <C>mv</C>…), pero las opciones no siempre
            coinciden. Entre paréntesis, el nombre «de verdad» del cmdlet.
          </>
        }
      >
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="bg-zinc-100 dark:bg-white/10">
                <th className={`${th} w-[22%]`}>Quiero…</th>
                <th className={`${th} w-[30%]`}>bash / zsh (Linux, macOS)</th>
                <th className={th}>PowerShell (Windows)</th>
              </tr>
            </thead>
            <tbody>
              {EQUIV.map(([q, b, p]) => (
                <tr key={q} className="border-t border-zinc-200 dark:border-white/10">
                  <th scope="row" className="px-4 py-1.5 text-left align-top text-base font-semibold text-zinc-800 dark:text-zinc-200">
                    {q}
                  </th>
                  <td className={`${tdMono} !py-1.5`}>{b}</td>
                  <td className={`${tdMono} !py-1.5`}>{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Bloque>

      {/* 9 · Instalar */}
      <Bloque
        id="instalar"
        titulo="Instalarla para que sea útil"
        entradilla={
          <>
            Un script que solo funciona con <C>python src/tareas/cli.py</C> desde su carpeta es un ejercicio. Una
            herramienta se teclea por su nombre desde <b>cualquier carpeta</b>. ¿Cómo lo consigue <C>git</C>?
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tarjeta titulo="El PATH" nivel={4} className="flex flex-col">
            <p className="mb-3">
              Cuando escribes <C>tareas</C>, la shell busca un ejecutable con ese nombre en una lista de carpetas: la variable
              de entorno <b>PATH</b>. Un comando está «instalado» cuando hay un ejecutable suyo en alguna de ellas.
            </p>
            <Codigo code={`echo $PATH        # bash/zsh\n$env:Path          # PowerShell\nwhich tareas       # ¿cuál se ejecuta? (Get-Command en Windows)`} />
          </Tarjeta>
          <Tarjeta titulo="El entry point" nivel={4} className="flex flex-col">
            <p className="mb-3">
              En <C>pyproject.toml</C> declaras qué función se ejecuta al teclear el comando. Al instalar, uv crea el
              ejecutable <C>tareas</C> en una carpeta del PATH (<C>~/.local/bin</C> en Linux y macOS).
            </p>
            <Codigo code={`[project.scripts]\ntareas = "tareas.cli:app"   # comando = "módulo:objeto"`} kind="toml" etiqueta="pyproject.toml" />
          </Tarjeta>
        </div>
      </Bloque>

      <Bloque titulo="Del nombre a tu código" nivel={3}>
        <DelNombreAlCodigo />
      </Bloque>

      <Bloque titulo="Instalar y desinstalar" nivel={3}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Tarjeta titulo="Mientras desarrollas" nivel={4} tono="azul" className="flex flex-col">
            <p className="mb-3">Modo editable: cada cambio que guardas se nota al momento, sin reinstalar.</p>
            <Codigo code={`cd cli-tareas\nuv tool install --editable .\ntareas --help`} />
          </Tarjeta>
          <Tarjeta titulo="Para otra persona" nivel={4} tono="verde" className="flex flex-col">
            <p className="mb-3">Directamente desde tu repo público de GitHub. Con uv o, si no lo tiene, con pipx.</p>
            <Codigo code={`uv tool install git+https://github.com/TU-USUARIO/cli-tareas\n# o bien\npipx install git+https://github.com/TU-USUARIO/cli-tareas`} />
          </Tarjeta>
          <Tarjeta titulo="Desinstalar" nivel={4} tono="rosa" className="flex flex-col">
            <p className="mb-3">Una buena herramienta se va igual de limpia que llegó. Su configuración de usuario (si la hay) se borra aparte.</p>
            <Codigo code={`uv tool uninstall tareas\nuv tool list        # comprobar que ya no está`} />
          </Tarjeta>
        </div>
      </Bloque>

      <Bloque titulo="Dónde vive cada cosa" nivel={3}>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="bg-zinc-100 dark:bg-white/10">
                <th className={`${th} w-[28%]`}>Qué</th>
                <th className={th}>Linux / macOS</th>
                <th className={th}>Windows</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-zinc-200 dark:border-white/10">
                <th scope="row" className="px-4 py-2 text-left align-top text-base font-semibold text-zinc-800 dark:text-zinc-200">
                  El comando instalado
                </th>
                <td className={tdMono}>~/.local/bin/tareas</td>
                <td className={`${tdMono} [overflow-wrap:anywhere]`}>%USERPROFILE%\.local\bin\tareas.exe</td>
              </tr>
              <tr className="border-t border-zinc-200 dark:border-white/10">
                <th scope="row" className="px-4 py-2 text-left align-top text-base font-semibold text-zinc-800 dark:text-zinc-200">
                  acciones.json (por defecto)
                </th>
                <td className={tdMono} colSpan={2}>
                  ./acciones.json, en la carpeta donde lanzas la orden, o la que indiques con --config
                </td>
              </tr>
              <tr className="border-t border-zinc-200 dark:border-white/10">
                <th scope="row" className="px-4 py-2 text-left align-top text-base font-semibold text-zinc-800 dark:text-zinc-200">
                  Config de usuario (avance)
                </th>
                <td className={tdMono}>~/.config/tareas/</td>
                <td className={tdMono}>%APPDATA%\tareas\</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={`mt-3 ${cls.texto}`}>
          La ruta de config de usuario no se escribe a mano: la librería <C>platformdirs</C> devuelve la correcta en cada
          sistema.
        </p>
      </Bloque>

      <Bloque titulo="Cómo comprobar que funciona en otro sistema" nivel={3}>
        <ol className="grid grid-cols-1 gap-x-8 gap-y-3 lg:grid-cols-2">
          {[
            <>Pide a un compañero (mejor con otro sistema operativo) que siga <b>solo tu README</b>, sin ayuda tuya.</>,
            <>Instala con la orden de <C>uv tool install git+…</C> y prueba <C>tareas --help</C> y <C>tareas version</C> desde otra carpeta.</>,
            <>Crea una carpeta de pruebas con ficheros de ejemplo y lanza cada acción con <C>--simular</C> y luego de verdad.</>,
            <>Prueba un nombre con tildes y espacios (<C>Apuntes de Física.pdf</C>) y una ruta con <C>~</C>.</>,
            <>Rompe a propósito el <C>acciones.json</C>: <C>tareas validar</C> debe decir qué falla y salir con código 3.</>,
            <>Desinstala y comprueba que <C>tareas</C> ya no existe. Todo lo que haya fallado, al README o a un issue.</>,
          ].map((x, i) => (
            <li key={i} className={`flex gap-3 ${cls.texto}`}>
              <span aria-hidden className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-extrabold ${TONO.verde.disco}`}>
                {i + 1}
              </span>
              <span>{x}</span>
            </li>
          ))}
        </ol>
      </Bloque>

      {/* 10 · El proyecto */}
      <Bloque
        id="proyecto"
        titulo="El proyecto: qué tiene que hacer tu CLI"
        entradilla={
          <>
            El comando de ejemplo se llama <C>tareas</C> y el repo <C>cli-tareas</C> (público en GitHub). Puedes elegir otro
            nombre, pero estas son las órdenes de referencia:
          </>
        }
      >
        <dl className="grid grid-cols-1 gap-x-6 gap-y-2 lg:grid-cols-2">
          {ORDENES.map(([o, d]) => (
            <div key={o} className="border-b border-zinc-200 pb-2 dark:border-white/10">
              <dt className="font-mono text-base font-bold text-zinc-900 dark:text-zinc-50">{o}</dt>
              <dd className={cls.texto}>{d}</dd>
            </div>
          ))}
        </dl>
        <p className={`mt-3 ${cls.texto}`}>
          Códigos de salida: <b>0</b> bien · <b>1</b> fallo al ejecutar · <b>2</b> error de uso (lo pone Typer) · <b>3</b>{" "}
          configuración inválida.
        </p>
      </Bloque>

      <Bloque
        titulo="acciones.json: el corazón del proyecto"
        nivel={3}
        entradilla="Las acciones no se escriben en el código: se describen en este fichero y el motor las interpreta. Este es el esquema de referencia; tú lo adaptas a tus acciones y lo documentas en tu README."
      >
        <Codigo code={ACCIONES_JSON} kind="json" etiqueta="acciones.json" />
      </Bloque>

      <Bloque titulo="Campo a campo" nivel={3}>
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CAMPOS.map(([k, v]) => (
            <div key={k} className={`${cls.tarjeta} !px-4 !py-3`}>
              <dt className="font-mono text-base font-bold text-blue-700 dark:text-blue-300">{k}</dt>
              <dd className="mt-0.5 text-base leading-snug text-zinc-700 dark:text-zinc-300">{v}</dd>
            </div>
          ))}
        </dl>
      </Bloque>

      {EJEMPLOS.map((e) => (
        <Bloque key={e.titulo} titulo={e.titulo} nivel={3}>
          <Codigo code={ACCIONES_JSON} kind="json" etiqueta="acciones.json · esta acción" rango={e.linea} />
          <div className="mt-4">
            <AntesDespues antes={e.antes} despues={e.despues} orden={e.orden} aviso={e.aviso} />
          </div>
        </Bloque>
      ))}

      <Bloque titulo="Estructura del repositorio" nivel={3} entradilla="Cada fichero tiene un único trabajo.">
        <Arbol raiz="cli-tareas/" nodos={ESTRUCTURA} tono="azul" />
      </Bloque>

      <Bloque titulo="Por dónde pasa una orden" nivel={3}>
        <RecorridoOrden />
      </Bloque>

      <Bloque titulo="La capa de IA y el modo sin red" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tarjeta titulo="La capa de IA" nivel={4} antetitulo="Semana 3" tono="morado">
            <p>
              Acciones de tipo IA (resumir, generar README, renombrar por contenido) que llaman a un modelo — los mismos del
              centro con los que trabaja OpenCode, o el que configures. La clave va en un <C>.env</C> ignorado por git desde el
              primer commit, con un <C>.env.example</C> documentado.
            </p>
          </Tarjeta>
          <Tarjeta titulo="Modo sin red" nivel={4} antetitulo="Semana 3" tono="gris">
            <p>
              Si no hay red o falta la clave, tu CLI no revienta con un traceback: lo explica en una línea y sigue ofreciendo
              todas las acciones que no necesitan IA.
            </p>
          </Tarjeta>
        </div>
        <p className={`mt-4 ${cls.texto}`}>
          Paso a paso, en la{" "}
          <Link href="/programacion-ia/cli/sesion-03/" className={cls.enlace}>
            Sesión 3 · La capa IA
          </Link>
          .
        </p>
      </Bloque>

      <Aviso titulo="Seguridad desde el día 1" tono="rosa">
        <p>
          <C>.gitignore</C> con <C>.env</C> antes del primer commit; nunca claves en el repo ni en el chat; acciones
          destructivas siempre con <C>--simular</C> primero y confirmación.
        </p>
        <p>
          Y prueba <b>siempre</b> en <C>~/pruebas-tareas</C>, nunca en tus ficheros reales hasta que funcione.
        </p>
      </Aviso>

      {/* 11 · Planificación */}
      <Bloque id="planificacion" titulo="Planificación: las cuatro semanas">
        <LineaTiempo hitos={RUTA} />
      </Bloque>

      {SEMANAS.map((s) => (
        <Bloque key={s.n} titulo={`Qué haces la ${s.n.toLowerCase()}`} nivel={3}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Tarjeta titulo={`Objetivo · ${s.n.toLowerCase()}`} nivel={4} tono="azul" className="flex flex-col">
              <p>{s.objetivo}</p>
              <Link
                href={s.href}
                className="mt-4 inline-flex w-fit items-center gap-1 rounded-xl bg-blue-600 px-4 py-2 text-base font-bold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:text-slate-950 dark:hover:bg-blue-400"
              >
                Ir a la sesión →
              </Link>
            </Tarjeta>
            <Tarjeta titulo={`OpenCode · ${s.n.toLowerCase()}`} nivel={4} tono="morado">
              <ul className="list-disc space-y-1 pl-5 marker:text-zinc-400">
                {s.opencode.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </Tarjeta>
            <Tarjeta titulo={`Producto · ${s.n.toLowerCase()}`} nivel={4} tono="verde">
              <p>
                <SinPartirOpciones texto={s.producto} />
              </p>
            </Tarjeta>
          </div>
        </Bloque>
      ))}

      <Bloque titulo="El calendario de los dos grupos" nivel={3}>
        <Calendario />
      </Bloque>

      <Bloque titulo="Cómo se organiza cada grupo" nivel={3}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Tarjeta titulo="Presencial" nivel={4} tono="azul">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-zinc-400">
              <li>
                Es tu <b>segundo proyecto</b>: línea individual de <b>4 h/semana</b> en el aula, en paralelo a la startup en
                grupo (las otras 4 h).
              </li>
              <li>
                Equipos del aula con <b>Linux</b>: la terminal es bash desde el primer minuto.
              </li>
              <li>
                Herramientas: terminal y <b>OpenCode</b> conectado a los <b>modelos de IA locales del centro</b>. El chat, solo
                para consultas.
              </li>
              <li>Cada sesión acaba con commit y push: lo que no está en GitHub no existe.</li>
            </ul>
          </Tarjeta>
          <Tarjeta titulo="Semipresencial" nivel={4} tono="morado">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-zinc-400">
              <li>
                <b>Quincena 3</b> = estas dos semanas; <b>comprobación de proceso el 6 nov</b>: 3 acciones propias
                funcionando + ADR + commits reales.
              </li>
              <li>
                <b>Quincena 4</b> (9 → 20 nov): IA, pruebas, release y <b>entrega el 20 nov</b>.
              </li>
              <li>
                <b>OpenCode también en casa</b> (por ejemplo, en la terminal de VS Code), conectado a los modelos del centro. El
                chat de Copilot de Microsoft 365,{" "}
                <b>solo para consultas</b>.
              </li>
              <li>
                Terminal y conexión desde casa: en la <b>tutoría colectiva de arranque</b>, de <b>presencia obligatoria</b>{" "}
                (fecha en el aula virtual). Tu equipo puede ser Windows, Linux o macOS.
              </li>
            </ul>
          </Tarjeta>
        </div>
      </Bloque>

      {/* 12 · Evaluación */}
      <Bloque
        id="evaluacion"
        titulo="Cómo se evalúa"
        entradilla={
          <>
            Primero, la puerta de entrada: si falla <b>cualquiera</b> de estos mínimos, el proyecto no se evalúa (aunque el
            resto esté genial).
          </>
        }
      >
        <Checklist items={RUBRICA_CLI.minimos.map((m) => ({ texto: m.texto }))} />
      </Bloque>

      <Bloque titulo="Cuánto pesa cada criterio" nivel={3}>
        <PesosRubrica />
      </Bloque>

      {GRUPOS_RUBRICA.map(([titulo, ids], k) => (
        <Bloque
          key={titulo}
          titulo={titulo}
          nivel={3}
          entradilla={k === 0 ? "Cada criterio, casilla a casilla. Apunta a la última: Excelente." : undefined}
        >
          <div className="space-y-6">
            {ids.map((i) => {
              const c = RUBRICA_CLI.criterios[i];
              return (
                <CriterioRubrica key={c.id} nombre={c.nombre} peso={c.peso} que={c.qué} niveles={RUBRICA_CLI.niveles} descriptores={c.niveles} resaltar={3} />
              );
            })}
          </div>
          {k === GRUPOS_RUBRICA.length - 1 ? (
            <p className={`mt-6 ${cls.texto}`}>
              La tienes también en el campus del aula. Léela antes de empezar, no después de entregar.
            </p>
          ) : null}
        </Bloque>
      ))}

      {/* 13 · Enlaces */}
      <Bloque titulo="Enlaces">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/programacion-ia/opencode/", "Guía de OpenCode", "Instalación, conexión, permisos y flujo con el agente."],
            ["/programacion-ia/acceso/", "Acceso al aula", "Campus: entregas, rúbrica completa y notas."],
            ["/programacion-ia/presencial/", "Grupo presencial", "Horario, proyectos y avisos del grupo."],
            ["/programacion-ia/semipresencial/", "Grupo semipresencial", "Quincenas, tutorías y entregas."],
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
      </Bloque>
    </div>
  );
}

/** Una tecnología: a favor, en contra y CLI famosas hechas así. */
function Tecnologia({ o, pro, contra, fam, delCurso = false }: { o: string; pro: string; contra: string; fam: string; delCurso?: boolean }) {
  const tono: Tono = delCurso ? "azul" : "gris";
  return (
    <div className={`min-w-0 rounded-2xl border-2 bg-white p-4 dark:bg-slate-900 ${TONO[tono].linea}`}>
      <span className="flex flex-wrap items-center gap-2">
        <h4 className={`text-xl font-bold ${TONO[tono].texto}`}>{o}</h4>
        {delCurso ? <Chip>la del curso</Chip> : null}
      </span>
      <dl className="mt-2 space-y-2">
        <div>
          <dt className="text-base font-bold text-emerald-700 dark:text-emerald-300">A favor</dt>
          <dd className={`${cls.texto} leading-snug`}>{pro}</dd>
        </div>
        <div>
          <dt className="text-base font-bold text-rose-700 dark:text-rose-300">En contra</dt>
          <dd className={`${cls.texto} leading-snug`}>{contra}</dd>
        </div>
        <div>
          <dt className="text-base font-bold text-zinc-600 dark:text-zinc-400">Hechas así</dt>
          <dd className={`${cls.texto} italic leading-snug`}>{fam}</dd>
        </div>
      </dl>
    </div>
  );
}
