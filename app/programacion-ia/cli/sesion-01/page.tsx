import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PromptBlock from "@/components/PromptBlock";
import CodeBlock from "@/components/CodeBlock";
import { highlightCode } from "@/lib/highlight";

export const metadata: Metadata = {
  title: "Sesión 1 · Arranque: la terminal y tu primera orden — CLI tareas con IA",
  description:
    "La terminal desde cero, uv, Typer y Git: tu orden «tareas listar» instalada como comando de verdad y tu repo público en GitHub con commits que cuentan.",
};

/* ───────────── Estilos compartidos ───────────── */

const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";
const meta =
  "rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 px-3 py-1 text-[12px] font-semibold text-zinc-700 dark:text-zinc-300";
const tarjeta =
  "rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm";
const aviso =
  "my-4 rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-4 text-[15px] text-amber-900 dark:text-amber-200";
const info =
  "my-4 rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-4 text-[15px] text-blue-900 dark:text-blue-200";
const peligro =
  "my-4 rounded-2xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 p-4 text-[15px] text-red-900 dark:text-red-200";
const enlace = "font-semibold text-blue-700 underline underline-offset-2 hover:no-underline dark:text-blue-300";

function C({ children }: { children: ReactNode }) {
  return (
    <code className="break-words rounded bg-zinc-100 px-1 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-white/10 dark:text-zinc-200">
      {children}
    </code>
  );
}

// Bloque de código copiable con resaltado generado en el servidor.
function Codigo({ code, lang = "bash" }: { code: string; lang?: string }) {
  const h = highlightCode(code);
  return (
    <div className="my-3 min-w-0">
      <CodeBlock code={h.code} lines={h.lines} lang={lang} />
    </div>
  );
}

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mt-12 scroll-mt-24 text-2xl font-extrabold tracking-tight">
      {children}
    </h2>
  );
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-6 text-lg font-bold">{children}</h3>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">{children}</p>;
}

function Tiempo({ children }: { children: ReactNode }) {
  return (
    <span className="ml-2 inline-block rounded-full bg-zinc-100 px-2.5 py-0.5 align-middle text-[11px] font-bold text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
      {children}
    </span>
  );
}

function Tabla({ cab, filas, min = 560 }: { cab: string[]; filas: ReactNode[][]; min?: number }) {
  return (
    <div className="mt-3 overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/10">
      <table className="w-full border-collapse text-sm" style={{ minWidth: min }}>
        <thead className="bg-zinc-50 dark:bg-white/5">
          <tr>
            {cab.map((c) => (
              <th key={c} className="px-3 py-2 text-left font-bold text-zinc-800 dark:text-zinc-200">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((f, i) => (
            <tr key={i} className="border-t border-zinc-100 align-top dark:border-white/5">
              {f.map((celda, j) => (
                <td key={j} className="px-3 py-2 text-zinc-700 dark:text-zinc-300">
                  {celda}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Lista({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-3 space-y-1.5 text-[15px] text-zinc-700 dark:text-zinc-300">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2">
          <span aria-hidden className="text-zinc-400">•</span>
          <span className="min-w-0">{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Check({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-3 space-y-2 text-[15px] text-zinc-700 dark:text-zinc-300">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5">
          <span
            aria-hidden
            className="mt-0.5 inline-block h-4 w-4 flex-none rounded border-2 border-zinc-400 dark:border-zinc-500"
          />
          <span className="min-w-0">{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ───────────── Contenido: órdenes y código ───────────── */

const INDICE: [string, string][] = [
  ["#paso-0", "0 · Abre la terminal"],
  ["#paso-1", "1 · Supervivencia"],
  ["#paso-2", "2 · Herramientas"],
  ["#paso-3", "3 · Crea el proyecto"],
  ["#paso-4", "4 · Git y GitHub"],
  ["#paso-5", "5 · Tu primera orden"],
  ["#paso-6", "6 · Instálala"],
  ["#paso-7", "7 · Audita y commitea"],
  ["#final", "Checklist final"],
  ["#atascos", "Si te atascas"],
];

const SUPERVIVENCIA_BASH = String.raw`pwd                     # ¿dónde estoy?
ls                      # ¿qué hay aquí?
ls -la                  # todo, también lo oculto (.git, .env...), con detalles
cd Descargas            # entra en una carpeta (ruta relativa)
cd ..                   # sube un nivel
cd ~                    # vuelve a tu carpeta personal (o solo: cd)
cd /tmp                 # ve a una ruta absoluta
mkdir -p ~/zona/a/b     # crea carpetas, también las intermedias
touch ~/zona/nota.txt   # crea un fichero vacío
cp ~/zona/nota.txt ~/zona/copia.txt
mv ~/zona/copia.txt ~/zona/a/renombrada.txt
cat ~/zona/nota.txt     # muestra el contenido de un fichero
rm ~/zona/a/renombrada.txt
rm -r ~/zona            # borra una carpeta entera. SIN papelera.
ls --help               # ayuda corta de casi cualquier orden
man ls                  # manual completo (sal con q)`;

const SUPERVIVENCIA_PS = String.raw`Get-Location                       # pwd también funciona
Get-ChildItem                      # ls y dir también funcionan
Get-ChildItem -Force               # incluye ocultos
Set-Location Descargas             # cd también funciona
Set-Location ..
Set-Location ~
New-Item -ItemType Directory -Force "$HOME\zona\a\b"
New-Item -ItemType File "$HOME\zona\nota.txt"
Copy-Item "$HOME\zona\nota.txt" "$HOME\zona\copia.txt"
Move-Item "$HOME\zona\copia.txt" "$HOME\zona\a\renombrada.txt"
Get-Content "$HOME\zona\nota.txt"  # cat también funciona
Remove-Item "$HOME\zona\a\renombrada.txt"
Remove-Item -Recurse "$HOME\zona"  # SIN papelera
Get-Help Get-ChildItem             # ayuda de una orden`;

const PRUEBAS_BASH = String.raw`mkdir -p ~/pruebas-tareas/fotos ~/pruebas-tareas/docs
cd ~/pruebas-tareas
touch factura-octubre.pdf apuntes-tema1.pdf contrato.docx
touch fotos/IMG_0001.jpg fotos/IMG_0002.jpg fotos/captura.png
touch cache-1.tmp cache-2.tmp borrador.tmp
touch -t 202609010000 viejo-1.tmp viejo-2.tmp    # fecha: 1 sep 2026 (más de 30 días)
touch "mi fichero con espacios.pdf"
echo "hola, soy un fichero con texto" > docs/notas.txt
ls -la
ls -la fotos docs`;

const PRUEBAS_PS = String.raw`New-Item -ItemType Directory -Force "$HOME\pruebas-tareas\fotos", "$HOME\pruebas-tareas\docs" | Out-Null
Set-Location "$HOME\pruebas-tareas"
"factura-octubre.pdf", "apuntes-tema1.pdf", "contrato.docx",
"fotos\IMG_0001.jpg", "fotos\IMG_0002.jpg", "fotos\captura.png",
"cache-1.tmp", "cache-2.tmp", "borrador.tmp", "viejo-1.tmp", "viejo-2.tmp",
"mi fichero con espacios.pdf" | ForEach-Object { New-Item -ItemType File -Force $_ | Out-Null }
"viejo-1.tmp", "viejo-2.tmp" | ForEach-Object { (Get-Item $_).LastWriteTime = Get-Date "2026-09-01" }
"hola, soy un fichero con texto" | Set-Content "docs\notas.txt" -Encoding utf8
Get-ChildItem -Force
Get-ChildItem fotos, docs`;

const PERMISOS = String.raw`cd ~/pruebas-tareas
printf '#!/bin/sh\necho "Hola desde un script"\n' > saludo.sh
ls -l saludo.sh      # -rw-r--r--  → nadie puede ejecutarlo
./saludo.sh          # Permiso denegado
chmod +x saludo.sh   # +x = dale permiso de ejecución
ls -l saludo.sh      # -rwxr-xr-x  → ahora sí
./saludo.sh          # Hola desde un script
saludo.sh            # orden no encontrada: esta carpeta NO está en el PATH`;

const PATH_BASH = String.raw`echo $PATH                  # lista de carpetas separadas por :
echo $PATH | tr ':' '\n'    # la misma lista, una por línea
which ls                    # ¿de qué carpeta sale ls?
which python3 git`;

const PATH_PS = String.raw`$env:Path -split ";"         # carpetas separadas por ;
Get-Command git              # ¿de dónde sale git?
Get-Command python`;

const UV_LINUX = String.raw`git --version               # si falla: sudo apt install git (Linux) · xcode-select --install (macOS)
curl -LsSf https://astral.sh/uv/install.sh | sh
# cierra la terminal y abre una nueva (o: source $HOME/.local/bin/env)
uv --version
uv python install 3.12
uv python list --only-installed`;

const UV_WIN = String.raw`git --version               # si falla: winget install --id Git.Git -e   (y abre otra terminal)
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
# cierra Windows Terminal y ábrela otra vez
uv --version
uv python install 3.12
uv python list --only-installed`;

const INIT = String.raw`cd ~                                     # o la carpeta donde guardes tus proyectos
uv init --package --name tareas --python 3.12 cli-tareas
cd cli-tareas
uv add typer
ls -la
ls src/tareas`;

const PYPROJECT = String.raw`[project]
name = "tareas"
version = "0.1.0"
description = "Automatiza tareas repetitivas con ficheros desde la terminal"
readme = "README.md"
requires-python = ">=3.12"
dependencies = [
    "typer>=0.20",          # tu versión puede ser otra: la pone uv add
]

[project.scripts]
tareas = "tareas.cli:app"   # antes ponía: tareas = "tareas:main"

[build-system]
# lo que haya puesto uv aquí, déjalo tal cual`;

const INIT_PY = String.raw`"""tareas: automatiza tareas repetitivas con ficheros desde la terminal."""

__version__ = "0.1.0"`;

const GITIGNORE = String.raw`# Entorno virtual que crea uv (se regenera con: uv sync)
.venv/

# Cachés de Python
__pycache__/
*.egg-info
dist/

# Secretos: claves de API y configuración privada. NUNCA al repo.
.env`;

const GITATTRIBUTES = String.raw`* text=auto`;

const GIT_PRIMERO = String.raw`git status                  # si dice "not a git repository": git init
git add .gitignore .gitattributes pyproject.toml uv.lock .python-version README.md src
git status                  # comprueba: NO debe aparecer .venv ni .env
git commit -m "Crea el proyecto con uv y Typer, con .gitignore y .gitattributes"
git branch -M main
git log --oneline`;

const GH_PUSH = String.raw`# Opción A · con la CLI de GitHub (si tienes gh y has hecho: gh auth login)
gh repo create cli-tareas --public --source=. --push

# Opción B · desde la web: crea el repo VACÍO (sin README, sin .gitignore, sin licencia)
git remote add origin https://github.com/TU_USUARIO/cli-tareas.git
git push -u origin main`;

const SPEC = `# tareas

Mi herramienta de línea de órdenes para automatizar tareas repetitivas con ficheros.

## Spec (versión 0 · 26/10/2026)
1. **Problema:** cada semana pierdo tiempo en ________ (ej.: ordenar Descargas a mano).
2. **Para quién:** para mí y para ________.
3. **Cómo se usa:** \`tareas ORDEN [CARPETA] [opciones]\` desde cualquier terminal.
4. **Órdenes de la semana 1:** \`tareas --help\`, \`tareas version\`, \`tareas listar [CARPETA]\`.
5. **Órdenes previstas:** \`tareas acciones\`, \`tareas validar\`, \`tareas ejecutar NOMBRE --simular\`.
6. **Mis 3 acciones (borrador):** ________, ________, ________.
7. **Nunca hará:** borrar sin preguntar ni tocar ficheros fuera de la carpeta que le indique.
8. **Plataformas:** Linux primero; también Windows y macOS.
9. **Códigos de salida:** 0 bien · 1 fallo al ejecutar · 2 uso incorrecto · 3 configuración inválida.
10. **Instalación:** \`uv tool install --editable .\` (lo completo en la semana 4).`;

const PROMPT_CLI = `Contexto: proyecto Python 3.12 gestionado con uv, con src layout. El paquete se llama «tareas» y vive en src/tareas/ (__init__.py ya contiene __version__ = "0.1.0"). Ya he ejecutado uv add typer. Antes de tocar nada, lee README.md (mi spec) y pyproject.toml.

Tarea: crea src/tareas/cli.py y src/tareas/__main__.py.
1. Una app de Typer llamada \`app\`, con la ayuda en español, no_args_is_help=True y add_completion=False.
2. Orden \`version\`: imprime «tareas X.Y.Z» leyendo __version__ del paquete.
3. Orden \`listar [CARPETA]\` (por defecto, la carpeta actual): tabla de Rich con las columnas Nombre, Tipo (la extensión, o «carpeta»), Tamaño legible (B, KB, MB, GB) y Modificado (AAAA-MM-DD HH:MM). Primero las carpetas y luego por orden alfabético sin distinguir mayúsculas.
4. Si la carpeta no existe o no es una carpeta: mensaje claro en español por la salida de error (stderr), sin traza de Python, y código de salida 1. Si está vacía, dilo con un mensaje en lugar de pintar una tabla vacía.
5. Reglas: pathlib.Path siempre (nada de concatenar rutas con barras ni os.path), expanduser() para aceptar ~, nada de os.system ni subprocess. Escapa los nombres de fichero para que Rich no interprete los corchetes como estilos. Si un fichero no se puede leer (enlace roto, sin permisos), sáltalo sin romper.
6. __main__.py para que también funcione «uv run python -m tareas».
7. Comprueba que en pyproject.toml, [project.scripts] dice: tareas = "tareas.cli:app".

No añadas más órdenes ni dependencias. Al terminar, explícame en 5 viñetas qué hace cada función y dime qué órdenes ejecuto para probarlo en Linux y en Windows.`;

const CLI_PY = String.raw`"""Interfaz de línea de órdenes: aquí solo hay órdenes, opciones y salida."""

from datetime import datetime
from pathlib import Path
from typing import Annotated

import typer
from rich.console import Console
from rich.markup import escape
from rich.table import Table

from tareas import __version__

app = typer.Typer(
    help="tareas: automatiza tareas repetitivas con tus ficheros.",
    no_args_is_help=True,
    add_completion=False,
)
consola = Console()
consola_err = Console(stderr=True)


def tamano_legible(n: int) -> str:
    """Convierte bytes en texto: 532 B, 1.2 KB, 3.4 MB..."""
    if n < 1024:
        return f"{n} B"
    tamano = float(n)
    unidad = "B"
    for unidad in ("KB", "MB", "GB", "TB"):
        tamano /= 1024
        if tamano < 1024:
            break
    return f"{tamano:.1f} {unidad}"


@app.command()
def version() -> None:
    """Muestra la versión instalada."""
    consola.print(f"tareas {__version__}")


@app.command()
def listar(
    carpeta: Annotated[
        Path, typer.Argument(help="Carpeta que quieres ver (por defecto, la actual).")
    ] = Path("."),
) -> None:
    """Lista los ficheros de una carpeta en una tabla."""
    carpeta = carpeta.expanduser()
    if not carpeta.is_dir():
        consola_err.print(
            f"[red]Error:[/red] «{escape(str(carpeta))}» no existe o no es una carpeta."
        )
        raise typer.Exit(code=1)

    elementos = sorted(carpeta.iterdir(), key=lambda p: (not p.is_dir(), p.name.lower()))
    if not elementos:
        consola.print(f"La carpeta «{escape(str(carpeta))}» está vacía.")
        return

    tabla = Table(title=f"Contenido de {escape(str(carpeta.resolve()))}")
    tabla.add_column("Nombre")
    tabla.add_column("Tipo")
    tabla.add_column("Tamaño", justify="right")
    tabla.add_column("Modificado")

    for ruta in elementos:
        try:
            datos = ruta.stat()
        except OSError:
            continue  # enlace roto o sin permisos: lo saltamos
        es_carpeta = ruta.is_dir()
        tipo = "carpeta" if es_carpeta else (ruta.suffix.lower() or "(sin extensión)")
        tamano = "—" if es_carpeta else tamano_legible(datos.st_size)
        fecha = datetime.fromtimestamp(datos.st_mtime).strftime("%Y-%m-%d %H:%M")
        tabla.add_row(escape(ruta.name), tipo, tamano, fecha)

    consola.print(tabla)`;

const MAIN_PY = String.raw`"""Permite ejecutar el paquete con: python -m tareas"""

from tareas.cli import app

app(prog_name="tareas")`;

const PROBAR_BASH = String.raw`uv run tareas --help
uv run tareas version
uv run tareas listar ~/pruebas-tareas
uv run tareas listar ~/pruebas-tareas/fotos
uv run tareas listar                        # la carpeta actual
uv run tareas listar /no/existe; echo $?    # debe imprimir 1
uv run tareas listar a b; echo $?           # error de uso: 2 (lo pone Typer)
uv run python -m tareas --help`;

const PROBAR_PS = String.raw`uv run tareas --help
uv run tareas listar "$HOME\pruebas-tareas"
uv run tareas listar C:\no\existe; $LASTEXITCODE    # debe imprimir 1`;

const INSTALAR = String.raw`uv tool install --editable .     # desde dentro de cli-tareas
cd ~                             # vete a otra carpeta cualquiera
tareas --help
tareas listar ~/pruebas-tareas
which tareas                     # Windows: Get-Command tareas
uv tool list                     # herramientas instaladas con uv`;

const INSTALAR_PATH = String.raw`uv tool dir --bin                # carpeta donde uv deja los comandos
uv tool update-shell             # la añade al PATH de tu terminal
# cierra la terminal, abre otra y prueba de nuevo: tareas --help`;

const DESINSTALAR = String.raw`uv tool uninstall tareas`;

const PROMPTS_MD = `# Prompts clave del proyecto

## 2026-10-27 · Primera orden: listar
**Herramienta:** OpenCode / asistente de VS Code / chat del centro (modelo: ________)
**Prompt:** (pega aquí el prompt tal cual lo enviaste)
**Qué me dio:** cli.py con version y listar. Funcionaba a la primera: sí / no.
**Qué cambié yo y por qué:** ej.: no escapaba los nombres con corchetes; [foto].jpg salía sin corchetes.
**Qué aprendí:** ej.: typer.Exit(code=1) termina con código 1 sin traza.`;

const COMMITS = String.raw`git add README.md
git commit -m "Escribe la spec v0 de la herramienta en el README"
git add src/tareas/cli.py src/tareas/__main__.py
git commit -m "Añade las órdenes version y listar con tabla Rich"
git add docs/prompts.md
git commit -m "Guarda el prompt de la orden listar y lo que corregí"
git push
git log --oneline`;

/* ───────────── Diagrama: rutas absolutas y relativas ───────────── */

function DiagramaRutas() {
  // Árbol de carpetas a 40 px por nivel; el nodo «estás aquí» resaltado.
  const nodos: { x: number; y: number; t: string; aqui?: boolean; fichero?: boolean }[] = [
    { x: 24, y: 34, t: "/   (la raíz)" },
    { x: 64, y: 74, t: "home" },
    { x: 104, y: 114, t: "ana   ← ~ (tu carpeta personal)" },
    { x: 144, y: 154, t: "Descargas" },
    { x: 144, y: 194, t: "pruebas-tareas", aqui: true },
    { x: 184, y: 234, t: "fotos" },
    { x: 224, y: 274, t: "IMG_0001.jpg", fichero: true },
  ];
  const ramas: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [2, 4],
    [4, 5],
    [5, 6],
  ];
  return (
    <figure className="my-5">
      <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white p-3 dark:border-white/10 dark:bg-slate-900">
        <svg
          viewBox="0 0 720 300"
          className="h-auto w-full min-w-[600px]"
          role="img"
          aria-label="Árbol de carpetas: la raíz contiene home, que contiene ana (tu carpeta personal, ~). Dentro de ana están Descargas y pruebas-tareas, donde estás. Dentro de pruebas-tareas está fotos con IMG_0001.jpg. La ruta absoluta de la foto es /home/ana/pruebas-tareas/fotos/IMG_0001.jpg; la relativa desde donde estás es fotos/IMG_0001.jpg; .. te sube a ana."
        >
          {ramas.map(([a, b]) => {
            const p = nodos[a];
            const h = nodos[b];
            return (
              <path
                key={`${a}-${b}`}
                d={`M ${p.x + 6} ${p.y + 8} V ${h.y - 4} H ${h.x - 6}`}
                fill="none"
                stroke="#94a3b8"
                strokeWidth={1.5}
              />
            );
          })}
          {nodos.map((n) => (
            <g key={n.t}>
              {n.aqui && (
                <rect x={n.x - 6} y={n.y - 18} width={238} height={26} rx={7} fill="#2563eb" fillOpacity={0.15} stroke="#2563eb" />
              )}
              <text
                x={n.x}
                y={n.y}
                fontSize={14}
                fontFamily="ui-monospace, monospace"
                className={n.fichero ? "fill-emerald-700 dark:fill-emerald-400" : "fill-zinc-800 dark:fill-zinc-100"}
              >
                {n.fichero ? "" : "📁 "}
                {n.t}
                {n.aqui ? "  ← estás aquí" : ""}
              </text>
            </g>
          ))}
          <g fontSize={13} fontFamily="ui-monospace, monospace">
            <text x={400} y={40} className="fill-zinc-500 dark:fill-zinc-400" fontWeight={700}>
              Ruta ABSOLUTA (empieza en /):
            </text>
            <text x={400} y={62} className="fill-zinc-800 dark:fill-zinc-100">
              /home/ana/pruebas-tareas/
            </text>
            <text x={400} y={80} className="fill-zinc-800 dark:fill-zinc-100">
              fotos/IMG_0001.jpg
            </text>
            <text x={400} y={120} className="fill-zinc-500 dark:fill-zinc-400" fontWeight={700}>
              La misma con ~:
            </text>
            <text x={400} y={142} className="fill-zinc-800 dark:fill-zinc-100">
              ~/pruebas-tareas/fotos/IMG_0001.jpg
            </text>
            <text x={400} y={182} className="fill-zinc-500 dark:fill-zinc-400" fontWeight={700}>
              Ruta RELATIVA (desde donde estás):
            </text>
            <text x={400} y={204} className="fill-emerald-700 dark:fill-emerald-400">
              fotos/IMG_0001.jpg
            </text>
            <text x={400} y={244} className="fill-zinc-500 dark:fill-zinc-400" fontWeight={700}>
              .  = aquí  ·  .. = sube a ana
            </text>
            <text x={400} y={266} className="fill-zinc-800 dark:fill-zinc-100">
              ../Descargas = la carpeta hermana
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Una ruta absoluta funciona estés donde estés; una relativa depende de tu carpeta actual (la que te dice{" "}
        <C>pwd</C>). En Windows la raíz es <C>C:\</C> y la carpeta personal es <C>C:\Users\ana</C>, pero <C>~</C>,{" "}
        <C>.</C> y <C>..</C> funcionan igual en PowerShell.
      </figcaption>
    </figure>
  );
}

/* ───────────── Página ───────────── */

export default function CliSesion1() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs
          items={[
            { title: "Curso de Programación con IA", path: "/programacion-ia/" },
            { title: "CLI tareas con IA", path: "/programacion-ia/cli/" },
            { title: "Sesión 1", path: "/programacion-ia/cli/sesion-01/" },
          ]}
        />
        <span className={chip}>Proyecto 2 · Sesión 1 · Semana 26-30 oct</span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Arranque: la terminal y tu primera orden
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Esta semana pierdes el miedo a la pantalla negra. Aprendes a moverte por la terminal, instalas las
          herramientas, creas tu proyecto en Python y, con ayuda de la IA, escribes tu primera orden. Todo paso a
          paso: si nunca has abierto una terminal, empiezas en el paso 0 y llegas igual que el resto.
        </p>

        <div className={`mt-5 ${tarjeta}`}>
          <p className="text-[13px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            El producto al acabar la semana
          </p>
          <Lista
            items={[
              <>Tu comando <C>tareas</C> instalado: lo escribes en cualquier carpeta y responde.</>,
              <><C>tareas --help</C> y <C>tareas listar</C> funcionando (tabla con nombre, tipo, tamaño y fecha).</>,
              <>Un repo <b>público</b> en GitHub con un <C>.gitignore</C> correcto desde el primer commit.</>,
              <>Al menos <b>4 commits</b> con mensajes que cuentan qué has hecho.</>,
            ]}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className={meta}>⏱ 4 horas</span>
          <span className={meta}>🐧 Linux primero · 🪟 Windows · 🍎 macOS</span>
          <span className={meta}>🧭 100 % guiada</span>
          <span className={meta}>📦 Python 3.12 · uv · Typer</span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className={tarjeta}>
            <h2 className="text-[15px] font-bold">🏫 Grupo presencial</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Trabajas en los <b>equipos Linux del aula</b>: sigue los bloques de bash. Para que la IA escriba
              código usas el <b>agente del centro (OpenCode)</b> y, para preguntar, el <b>chat del centro</b>{" "}
              (modelos locales). Son 4 h de línea individual que van en paralelo a las 4 h de la startup en
              grupo: no mezcles los repos.
            </p>
          </div>
          <div className={tarjeta}>
            <h2 className="text-[15px] font-bold">🏠 Grupo semipresencial</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              La terminal se aprende en la <b>tutoría colectiva de arranque</b>, de presencia{" "}
              <b>obligatoria</b> (fecha en el aula virtual): trae tu portátil. En casa trabajas con{" "}
              <b>VS Code</b>, su terminal integrada y el asistente de código que facilite la Conselleria; el chat
              de Copilot de Microsoft 365 sigue valiendo para preguntar. Si tu equipo es <b>Windows</b>, sigue los
              bloques de <b>PowerShell</b>. El 6 nov hay comprobación de proceso.
            </p>
          </div>
        </div>

        <nav aria-label="Pasos de la sesión" className="mt-6 flex flex-wrap gap-2">
          {INDICE.map(([href, t]) => (
            <a
              key={href}
              href={href}
              className="rounded-full border border-zinc-200 px-3 py-1 text-[13px] font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/10"
            >
              {t}
            </a>
          ))}
        </nav>

        {/* ───────────── PASO 0 ───────────── */}
        <H2 id="paso-0">
          Paso 0 · Abre la terminal <Tiempo>10 min</Tiempo>
        </H2>
        <P>
          La terminal es una ventana donde escribes órdenes en lugar de hacer clic. Es más rápida, se puede
          automatizar y es donde vive casi todo lo que hace un programador: Git, Python, servidores. Ábrela así:
        </P>
        <Tabla
          cab={["Sistema", "Cómo abrirla", "Qué intérprete usas"]}
          filas={[
            [<b key="l">🐧 Linux (aula)</b>, <><C>Ctrl+Alt+T</C>, o busca «Terminal» en el menú</>, "bash (o zsh)"],
            [
              <b key="w">🪟 Windows</b>,
              <>Tecla Windows → escribe «Terminal» → <b>Windows Terminal</b>. Si no la tienes, «PowerShell». Evita «Símbolo del sistema» (cmd).</>,
              "PowerShell",
            ],
            [<b key="m">🍎 macOS</b>, <><C>Cmd+Espacio</C> → «Terminal»</>, "zsh (casi igual que bash)"],
            [
              <b key="v">💻 VS Code</b>,
              <>Menú Ver → Terminal, o <C>Ctrl+ñ</C> (teclado español). Se abre en la carpeta del proyecto.</>,
              "la de tu sistema",
            ],
          ]}
        />
        <H3>Lee el prompt antes de escribir</H3>
        <P>
          El <b>prompt</b> es el texto que la terminal escribe sola antes del cursor. Te dice quién eres, en qué
          máquina y, lo más importante, <b>en qué carpeta estás</b>:
        </P>
        <Codigo
          lang="prompt"
          code={String.raw`ana@aula-23:~/pruebas-tareas$         Linux: usuario@equipo:carpeta$
ana@MacBook-de-Ana pruebas-tareas %    macOS: usuario@equipo carpeta %
PS C:\Users\ana\pruebas-tareas>        Windows (PowerShell): PS carpeta>`}
        />
        <div className={info}>
          <b>Regla de oro:</b> en esta página, las órdenes van <b>sin</b> el prompt. No copies el <C>$</C> ni el{" "}
          <C>PS C:\...&gt;</C>. Lo que hay detrás de un <C>#</C> es un comentario para ti: la terminal lo ignora.
          Escribe una orden, pulsa Intro y <b>lee lo que responde</b>. Si no responde nada, normalmente es que
          todo ha ido bien.
        </div>

        {/* ───────────── PASO 1 ───────────── */}
        <H2 id="paso-1">
          Paso 1 · Supervivencia en la terminal <Tiempo>15 min de práctica + reto</Tiempo>
        </H2>
        <P>
          Con quince órdenes te mueves por cualquier ordenador. Antes, dos ideas: todo fichero vive en un{" "}
          <b>árbol de carpetas</b>, y para llegar a él escribes una <b>ruta</b>.
        </P>
        <DiagramaRutas />
        <H3>Las órdenes básicas (bash: Linux y macOS)</H3>
        <P>Escríbelas una a una, no las pegues todas a la vez: el objetivo es que tus dedos las aprendan.</P>
        <Codigo code={SUPERVIVENCIA_BASH} />
        <H3>Las mismas en PowerShell (Windows)</H3>
        <P>
          PowerShell entiende muchos nombres de bash (<C>ls</C>, <C>cd</C>, <C>pwd</C>, <C>cat</C>, <C>cp</C>,{" "}
          <C>mv</C>, <C>rm</C>) como alias, pero las opciones cambian. Los nombres «de verdad» son estos:
        </P>
        <Codigo lang="PowerShell" code={SUPERVIVENCIA_PS} />
        <Tabla
          min={620}
          cab={["Para qué", "bash (Linux/macOS)", "PowerShell (Windows)"]}
          filas={[
            ["¿Dónde estoy?", <C key="a">pwd</C>, <C key="b">Get-Location</C>],
            ["Listar (con ocultos)", <C key="a">ls -la</C>, <C key="b">Get-ChildItem -Force</C>],
            ["Entrar / subir", <><C>cd carpeta</C> · <C>cd ..</C></>, <><C>cd carpeta</C> · <C>cd ..</C></>],
            ["Crear carpetas", <C key="a">mkdir -p a/b/c</C>, <C key="b">New-Item -ItemType Directory -Force a\b\c</C>],
            ["Crear fichero vacío", <C key="a">touch f.txt</C>, <C key="b">New-Item -ItemType File f.txt</C>],
            ["Copiar", <C key="a">cp a b</C>, <C key="b">Copy-Item a b</C>],
            ["Mover / renombrar", <C key="a">mv a b</C>, <C key="b">Move-Item a b</C>],
            ["Borrar (sin papelera)", <><C>rm f</C> · <C>rm -r carpeta</C></>, <><C>Remove-Item f</C> · <C>-Recurse</C></>],
            ["Ver un fichero", <C key="a">cat f.txt</C>, <C key="b">Get-Content f.txt</C>],
            ["Ayuda", <><C>orden --help</C> · <C>man orden</C></>, <C key="b">Get-Help orden</C>],
            ["Ver el PATH", <C key="a">echo $PATH</C>, <C key="b">$env:Path</C>],
            ["¿De dónde sale una orden?", <C key="a">which git</C>, <C key="b">Get-Command git</C>],
          ]}
        />
        <div className={peligro}>
          <b>⚠ La terminal no tiene papelera.</b> <C>rm</C> y <C>Remove-Item</C> borran para siempre, sin
          preguntar. Antes de un <C>rm -r</C>, haz <C>pwd</C> y <C>ls</C> para comprobar dónde estás y qué vas a
          borrar. Nunca escribas <C>rm -rf</C> con rutas que no entiendes, ni las copies de internet o de una IA
          sin leerlas.
        </div>
        <H3>Cuatro trucos que te ahorran horas</H3>
        <Lista
          items={[
            <><b>↑ y ↓</b>: recorren las órdenes que ya escribiste. No vuelvas a teclear una orden larga.</>,
            <><b>Tab</b>: autocompleta nombres de carpetas y ficheros. Escribe <C>cd pru</C> + Tab. Si no completa, pulsa Tab dos veces y verás las opciones. Así no hay erratas.</>,
            <><b>Ctrl+C</b>: corta la orden que está en marcha (si algo se queda «colgado»). En la terminal <b>no</b> sirve para copiar: usa <C>Ctrl+Shift+C</C> / <C>Ctrl+Shift+V</C> en Linux, o selecciona con el ratón.</>,
            <><b>--help</b>: casi toda orden explica sus opciones con <C>orden --help</C>. Tu herramienta también lo hará.</>,
          ]}
        />

        <H3>Mini-reto: tu carpeta de pruebas para toda la semana</H3>
        <P>
          Tu herramienta va a mover, renombrar y borrar ficheros. Nunca la pruebes con tus ficheros reales:
          créate una carpeta de pruebas con ficheros de mentira (vacíos). Ejecuta el bloque de tu sistema y
          comprueba el resultado con <C>ls -la</C>. Si lo rompes, bórrala y vuelve a crearla: para eso está.
        </P>
        <p className="mt-4 text-sm font-bold text-zinc-800 dark:text-zinc-200">🐧🍎 bash (Linux y macOS)</p>
        <Codigo code={PRUEBAS_BASH} />
        <p className="mt-4 text-sm font-bold text-zinc-800 dark:text-zinc-200">🪟 PowerShell (Windows)</p>
        <Codigo lang="PowerShell" code={PRUEBAS_PS} />
        <P>
          Comprueba que tienes 3 <C>.pdf</C> (uno con espacios), un <C>.docx</C>, 5 <C>.tmp</C> (dos de ellos con
          fecha de septiembre), 3 imágenes en <C>fotos/</C> y un <C>notas.txt</C> con texto en <C>docs/</C>. En{" "}
          <C>ls -la</C>, fíjate en la columna de la fecha de los <C>viejo-*.tmp</C>: la usarás en la semana 2
          para «borrar temporales de más de 30 días».
        </P>

        <H3>Permisos: por qué a veces dice «Permiso denegado»</H3>
        <P>
          En Linux y macOS cada fichero tiene permisos de lectura (<C>r</C>), escritura (<C>w</C>) y ejecución
          (<C>x</C>) para ti, tu grupo y el resto. <C>ls -l</C> los enseña en la primera columna. Pruébalo con un
          script de una línea:
        </P>
        <Codigo code={PERMISOS} />
        <P>
          En Windows no hay <C>chmod</C>: lo que decide si algo se ejecuta es la extensión (<C>.exe</C>,{" "}
          <C>.ps1</C>) y la política de ejecución de PowerShell. Tu comando <C>tareas</C> lo instalará uv con los
          permisos correctos en los tres sistemas.
        </P>

        <H3>El PATH: la lista de sitios donde la terminal busca órdenes</H3>
        <P>
          ¿Por qué <C>ls</C> funciona en cualquier carpeta y <C>saludo.sh</C> no? Porque cuando escribes una orden
          sin ruta, la terminal la busca en una lista de carpetas llamada <b>PATH</b>, por orden, y ejecuta la
          primera que encuentra. <C>ls</C> está en <C>/usr/bin</C>, que está en el PATH. Tu carpeta de pruebas
          no; por eso hay que escribir <C>./saludo.sh</C> (ruta relativa).
        </P>
        <div className="grid min-w-0 gap-x-4 md:grid-cols-2">
          <div className="min-w-0">
            <p className="mt-2 text-sm font-bold text-zinc-800 dark:text-zinc-200">🐧🍎 bash</p>
            <Codigo code={PATH_BASH} />
          </div>
          <div className="min-w-0">
            <p className="mt-2 text-sm font-bold text-zinc-800 dark:text-zinc-200">🪟 PowerShell</p>
            <Codigo lang="PowerShell" code={PATH_PS} />
          </div>
        </div>
        <P>
          Guárdate la idea: en el paso 6 instalarás <C>tareas</C> en una carpeta que debe estar en el PATH. Si un
          día escribes una orden y te dice «orden no encontrada» o «no se reconoce como nombre de un cmdlet», el
          99 % de las veces es el PATH.
        </P>

        {/* ───────────── PASO 2 ───────────── */}
        <H2 id="paso-2">
          Paso 2 · Instala las herramientas <Tiempo>20 min</Tiempo>
        </H2>
        <P>
          Necesitas dos cosas: <b>git</b> (ya lo usaste en la web de marca) y <b>uv</b>, el gestor de proyectos
          Python que usaremos: crea el proyecto, instala Python, gestiona dependencias y entornos virtuales y
          convierte tu código en un comando. Una sola herramienta en lugar de cinco (pip, venv, pipx,
          pyenv...). En los equipos del aula ya puede estar instalado: compruébalo con <C>uv --version</C> antes
          de instalar nada.
        </P>
        <p className="mt-4 text-sm font-bold text-zinc-800 dark:text-zinc-200">🐧🍎 Linux y macOS</p>
        <Codigo code={UV_LINUX} />
        <p className="mt-4 text-sm font-bold text-zinc-800 dark:text-zinc-200">🪟 Windows (PowerShell)</p>
        <Codigo lang="PowerShell" code={UV_WIN} />
        <P>
          Al final debes ver tres versiones: git (cualquiera reciente), uv y un Python <b>3.12 o superior</b>.
          Fíjate en que el instalador de uv es un script descargado de internet que se ejecuta en tu máquina:
          está bien porque viene de la web oficial de Astral, pero <b>nunca</b> lo hagas con una URL que no
          conoces.
        </P>
        <div className={aviso}>
          <b>«uv: orden no encontrada» / «uv no se reconoce como nombre de un cmdlet»</b> justo después de
          instalar: es el PATH. El instalador ha añadido su carpeta (<C>~/.local/bin</C> o{" "}
          <C>%USERPROFILE%\.local\bin</C>) al PATH, pero solo las terminales <b>nuevas</b> lo leen. Cierra la
          terminal (en VS Code, la papelera de la terminal; a veces hay que reiniciar VS Code entero) y abre otra.
          En Linux/macOS también vale <C>source $HOME/.local/bin/env</C>.
        </div>
        <P>
          <b>Alternativa clásica</b> (solo si uv no te funciona y ya lo has consultado): Python 3.12 de
          python.org, <C>python -m venv .venv</C> + <C>pip install typer</C>, y <C>pipx</C> para instalar el
          comando. Funciona, pero son más pasos y en clase todo irá con uv.
        </P>

        {/* ───────────── PASO 3 ───────────── */}
        <H2 id="paso-3">
          Paso 3 · Crea el proyecto <Tiempo>20 min</Tiempo>
        </H2>
        <P>
          Ve a la carpeta donde guardas tus proyectos (no dentro de <C>pruebas-tareas</C> ni dentro del repo de
          la web de marca) y crea el proyecto:
        </P>
        <Codigo code={INIT} />
        <P>Qué significa cada trozo de la orden importante:</P>
        <Lista
          items={[
            <><C>uv init</C>: crea un proyecto Python nuevo.</>,
            <><C>--package</C>: con estructura de paquete instalable (carpeta <C>src/</C>). Es lo que permite convertirlo en un comando.</>,
            <><C>--name tareas</C>: el paquete se llama <C>tareas</C>. Sin esto, uv lo llamaría <C>cli_tareas</C> (el nombre de la carpeta con guion bajo).</>,
            <><C>--python 3.12</C>: fija la versión mínima de Python.</>,
            <><C>cli-tareas</C>: la carpeta que crea (y el nombre de tu repo).</>,
            <><C>uv add typer</C>: añade Typer, la librería para hacer CLIs (trae Rich, la de colores y tablas), y crea el entorno virtual <C>.venv/</C>.</>,
          ]}
        />
        <Tabla
          cab={["Fichero / carpeta", "Qué es", "¿Al repo?"]}
          filas={[
            [<C key="a">pyproject.toml</C>, "La ficha del proyecto: nombre, versión, Python mínimo, dependencias y qué comandos instala.", "Sí"],
            [<C key="a">src/tareas/__init__.py</C>, "Convierte la carpeta en un paquete de Python. Aquí guardaremos la versión.", "Sí"],
            [<C key="a">.python-version</C>, "Qué Python usa uv en este proyecto (3.12).", "Sí"],
            [<C key="a">uv.lock</C>, "Las versiones EXACTAS de todo lo instalado. Así en otro ordenador se instala lo mismo.", "Sí"],
            [<C key="a">README.md</C>, "La portada del repo. Hoy pondrás aquí tu spec.", "Sí"],
            [<C key="a">.venv/</C>, "El entorno virtual: Python y librerías de este proyecto. Pesa mucho y se regenera con uv sync.", "NO"],
            [<C key="a">.git/</C>, "uv ya ha hecho git init por ti. Es la historia del repo.", "(es el repo)"],
          ]}
        />
        <H3>Dos ajustes a mano</H3>
        <P>
          Abre la carpeta en tu editor (en el aula, el que uses con OpenCode; en casa, <C>code .</C> abre VS
          Code aquí). Primero, en <C>pyproject.toml</C>, cambia la línea de <C>[project.scripts]</C>: ese
          bloque dice «cuando instalen esto, crea un comando <C>tareas</C> que ejecute el objeto <C>app</C> del
          módulo <C>tareas/cli.py</C>». Rellena también la descripción.
        </P>
        <Codigo lang="TOML" code={PYPROJECT} />
        <P>
          Segundo, sustituye el contenido de <C>src/tareas/__init__.py</C> (uv pone una función <C>main</C> de
          ejemplo que ya no usaremos) por solo la versión:
        </P>
        <Codigo lang="Python" code={INIT_PY} />
        <P>
          Todavía no funciona <C>uv run tareas</C>: falta <C>cli.py</C>, que llega en el paso 5. Si lo pruebas
          ahora verás <C>ModuleNotFoundError: No module named &apos;tareas.cli&apos;</C>, y es normal.
        </P>

        {/* ───────────── PASO 4 ───────────── */}
        <H2 id="paso-4">
          Paso 4 · .gitignore, .gitattributes y GitHub <Tiempo>25 min</Tiempo>
        </H2>
        <P>
          <b>Antes</b> del primer commit decides qué no entra nunca en el repo. Un secreto que llega a un
          commit se queda en el historial aunque lo borres después, y en la semana 3 tendrás una clave en{" "}
          <C>.env</C>. Sustituye el <C>.gitignore</C> que ha creado uv por este (el de uv no incluye{" "}
          <C>.env</C>):
        </P>
        <Codigo lang=".gitignore" code={GITIGNORE} />
        <P>
          Y crea <C>.gitattributes</C> con una sola línea. Hace que Git guarde los saltos de línea igual venga
          el fichero de Windows (CRLF) o de Linux/macOS (LF): sin ella, un compañero con Windows te cambiaría
          todas las líneas de todos los ficheros en un solo commit.
        </P>
        <Codigo lang=".gitattributes" code={GITATTRIBUTES} />
        <P>
          Ahora el primer commit. Si Git te pregunta quién eres o no lo tienes configurado en este equipo, repasa
          la{" "}
          <Link href="/programacion-ia/sesion-02/#configuracion" className={enlace}>
            configuración global de la sesión 2 de la web de marca
          </Link>
          .
        </P>
        <Codigo code={GIT_PRIMERO} />
        <P>
          Fíjate en que añadimos los ficheros <b>por su nombre</b> y no con <C>git add .</C> a ciegas: así ves qué
          entra. Si en el <C>git status</C> aparece <C>.venv</C> o <C>.env</C>, para: tu <C>.gitignore</C> no está
          bien guardado.
        </P>
        <H3>Sube el repo a GitHub (público)</H3>
        <Codigo code={GH_PUSH} />
        <P>
          Si al hacer push te pide usuario y contraseña, la contraseña es un <b>token</b>, no la de tu cuenta: lo
          tienes explicado en{" "}
          <Link href="/programacion-ia/sesion-02/#autenticacion" className={enlace}>
            «Usuario y contraseña: qué escribir exactamente»
          </Link>
          . Abre tu repo en el navegador y comprueba que se ven <C>src/</C>, <C>pyproject.toml</C> y{" "}
          <C>.gitignore</C>, y que <b>no</b> se ve <C>.venv</C>.
        </P>

        {/* ───────────── PASO 5 ───────────── */}
        <H2 id="paso-5">
          Paso 5 · Tu primera orden con Typer <Tiempo>60 min</Tiempo>
        </H2>
        <P>
          Así trabajaremos todo el proyecto: <b>tú decides</b> (escribes la spec), <b>la IA implementa</b>,{" "}
          <b>tú auditas</b> (lees el código y lo pruebas con casos feos) y <b>tú commiteas</b>. La IA no decide
          qué hace tu herramienta.
        </P>
        <H3>5.1 · Escribe la spec en el README (10 líneas, 15 min)</H3>
        <P>
          Copia esta plantilla en tu <C>README.md</C> y rellena los huecos <b>tú</b>, sin IA. Piensa en una tarea
          real que te aburra: ordenar descargas, renombrar fotos del móvil, limpiar temporales, organizar apuntes
          por asignatura...
        </P>
        <PromptBlock text={SPEC} />
        <H3>5.2 · Pide el código al agente</H3>
        <P>
          En el aula, abre <b>OpenCode</b> dentro de la carpeta <C>cli-tareas</C>; en casa, el{" "}
          <b>asistente de VS Code</b> con la carpeta abierta. Si solo tienes un chat, pégale además el contenido
          de <C>README.md</C> y <C>pyproject.toml</C>, y crea tú los ficheros con lo que te devuelva. Este es el
          prompt:
        </P>
        <PromptBlock text={PROMPT_CLI} />
        <H3>5.3 · El código de referencia (para auditar lo que te dé la IA)</H3>
        <P>
          No hace falta que tu <C>cli.py</C> sea idéntico, pero debe hacer lo mismo. Compáralo línea a línea: si
          al tuyo le falta algo de lo que hay aquí (el <C>escape</C>, el <C>typer.Exit(code=1)</C>, el{" "}
          <C>expanduser()</C>), pregúntale a la IA por qué y decide tú.
        </P>
        <Codigo lang="Python · src/tareas/cli.py" code={CLI_PY} />
        <Codigo lang="Python · src/tareas/__main__.py" code={MAIN_PY} />
        <Lista
          items={[
            <><C>@app.command()</C> convierte una función en una orden. El docstring (<C>&quot;&quot;&quot;...&quot;&quot;&quot;</C>) es lo que sale en <C>--help</C>.</>,
            <>El argumento <C>carpeta</C> tiene tipo <C>Path</C>: Typer convierte lo que escribes en una ruta de <C>pathlib</C>, que funciona igual en Linux, Windows y macOS.</>,
            <><C>raise typer.Exit(code=1)</C> termina el programa con código 1 sin soltar una traza de Python al usuario.</>,
            <>El error va a <C>Console(stderr=True)</C>: la salida de errores, separada de la normal. Así otro programa puede distinguir resultado y error.</>,
          ]}
        />
        <H3>5.4 · Pruébalo</H3>
        <Codigo code={PROBAR_BASH} />
        <Codigo lang="PowerShell" code={PROBAR_PS} />
        <P>
          <C>echo $?</C> (bash) y <C>$LASTEXITCODE</C> (PowerShell) muestran el <b>código de salida</b> de la
          última orden: 0 si fue bien y otro número si falló. Los scripts y GitHub Actions deciden con él si algo
          ha funcionado, así que tu herramienta debe devolver el correcto. Nuestro convenio: 0 bien · 1 fallo al
          ejecutar · 2 error de uso (lo pone Typer) · 3 configuración inválida (semana 2).
        </P>

        {/* ───────────── PASO 6 ───────────── */}
        <H2 id="paso-6">
          Paso 6 · Instálala como comando de verdad <Tiempo>15 min</Tiempo>
        </H2>
        <P>
          <C>uv run tareas</C> solo funciona dentro de la carpeta del proyecto. Para que <C>tareas</C> funcione en
          cualquier sitio, como <C>git</C> o <C>ls</C>, instálala:
        </P>
        <Codigo code={INSTALAR} />
        <P>
          <C>uv tool install</C> crea un entorno aislado para tu herramienta y deja un ejecutable <C>tareas</C> en
          la carpeta de comandos de uv (<C>~/.local/bin</C> en Linux y macOS). <C>--editable</C> significa que
          apunta a tu código: cuando cambies <C>cli.py</C>, el comando instalado cambia también, sin reinstalar.
          Solo hay que reinstalar si tocas <C>pyproject.toml</C> (dependencias o el nombre del comando):{" "}
          <C>uv tool install --editable . --force</C>.
        </P>
        <P>Si dice «orden no encontrada», esa carpeta no está en tu PATH (¿te suena?):</P>
        <Codigo code={INSTALAR_PATH} />
        <P>Para quitarla (por ejemplo, para probar la instalación desde cero como hará quien use tu repo):</P>
        <Codigo code={DESINSTALAR} />

        {/* ───────────── PASO 7 ───────────── */}
        <H2 id="paso-7">
          Paso 7 · Audita y commitea <Tiempo>30 min</Tiempo>
        </H2>
        <P>
          «Lo que no sabes explicar, no lo entregas». Antes de cada commit con código de la IA, repasa esta
          lista. Si algo falla, pídele el arreglo a la IA, pero entiende qué ha cambiado.
        </P>
        <Check
          items={[
            <>¿Entiendo <b>cada línea</b> de <C>cli.py</C>? Si hay una que no, pregúntale a la IA «explícame esta línea como si fuera mi primer año» hasta que sí.</>,
            <>¿Qué pasa con una <b>carpeta vacía</b>? <C>mkdir ~/pruebas-tareas/vacia && tareas listar ~/pruebas-tareas/vacia</C></>,
            <>¿Y con una <b>ruta con espacios</b>? <C>tareas listar &quot;~/pruebas-tareas/carpeta con espacios&quot;</C> (créala antes). Ojo: entre comillas, <C>~</C> no lo expande la terminal; lo tiene que hacer tu código con <C>expanduser()</C>.</>,
            <>¿Y con un <b>fichero en vez de carpeta</b>? <C>tareas listar ~/pruebas-tareas/contrato.docx; echo $?</C> → mensaje y 1.</>,
            <>¿Y un nombre con <b>corchetes</b>? <C>touch ~/pruebas-tareas/&quot;[borrador].pdf&quot;</C> y lístalo: el nombre tiene que salir entero.</>,
            <>¿Funciona <b>en Windows</b>? Busca en el código barras escritas a mano dentro de rutas (<C>&quot;/&quot;</C>), <C>os.system</C>, <C>shell=True</C> o ficheros abiertos sin <C>encoding=&quot;utf-8&quot;</C>. Si tienes Windows, pruébalo; si no, pide a alguien que lo pruebe.</>,
            <>¿<C>tareas --help</C> se entiende sin haber leído el código? ¿Está en español?</>,
            <>¿La IA ha añadido dependencias u órdenes que no pediste? Mira <C>git diff pyproject.toml</C>.</>,
          ]}
        />
        <H3>Guarda tus prompts en docs/prompts.md</H3>
        <P>
          Crea <C>docs/prompts.md</C> y apunta cada prompt importante con lo que cambiaste tú. Es tu cuaderno de
          bitácora y una parte de la nota de proceso: demuestra que dirigiste a la IA, no al revés.
        </P>
        <PromptBlock text={PROMPTS_MD} />
        <H3>Commits pequeños con mensajes que cuentan</H3>
        <P>
          Un commit = un paso con sentido. El mensaje dice <b>qué cambia y para qué</b>, en imperativo, como si
          terminara la frase «Este commit...».
        </P>
        <Codigo code={COMMITS} />
        <Tabla
          cab={["❌ Mensajes que no cuentan nada", "✅ Mensajes que cuentan el proceso"]}
          filas={[
            [<C key="a">cambios</C>, <C key="b">Añade la orden listar con tabla Rich</C>],
            [<C key="a">arreglos</C>, <C key="b">Devuelve código 1 si la carpeta no existe</C>],
            [<C key="a">asdf</C>, <C key="b">Escapa nombres con corchetes en la tabla</C>],
            [<C key="a">lo que me ha dado la IA</C>, <C key="b">Guarda en docs/prompts.md el prompt de listar y lo que corregí</C>],
            [<C key="a">version final final 2</C>, <C key="b">Escribe la spec v0 en el README</C>],
          ]}
        />
        <P>
          Con el commit del paso 4 y estos tres ya tienes <b>4 commits</b>. Si al auditar has corregido algo,
          mejor: es un commit más, y de los que mejor cuentan el proceso.
        </P>

        {/* ───────────── CHECKLIST FINAL ───────────── */}
        <H2 id="final">Checklist de la semana (el producto)</H2>
        <div className={`mt-4 ${tarjeta}`}>
          <Check
            items={[
              <>Tengo <C>~/pruebas-tareas</C> con los ficheros de ejemplo (pdf, jpg, tmp viejos y nuevos, uno con espacios).</>,
              <><C>git --version</C>, <C>uv --version</C> y Python 3.12 o superior funcionan.</>,
              <>El proyecto <C>cli-tareas</C> tiene <C>pyproject.toml</C> con <C>tareas = &quot;tareas.cli:app&quot;</C>.</>,
              <><C>.gitignore</C> (con <C>.env</C> y <C>.venv/</C>) y <C>.gitattributes</C> estaban en el <b>primer</b> commit.</>,
              <>El README tiene mi spec de 10 líneas, rellenada por mí.</>,
              <>Desde cualquier carpeta: <C>tareas --help</C>, <C>tareas version</C> y <C>tareas listar ~/pruebas-tareas</C> funcionan.</>,
              <><C>tareas listar /no/existe</C> da un mensaje claro y código de salida 1.</>,
              <><C>docs/prompts.md</C> tiene al menos el prompt de hoy y lo que cambié.</>,
              <>El repo es <b>público</b> en GitHub, tiene <b>al menos 4 commits</b> con mensajes que cuentan y no contiene <C>.venv</C>.</>,
              <>Sé explicar en voz alta qué hace cada línea de <C>cli.py</C>.</>,
            ]}
          />
        </div>

        {/* ───────────── ATASCOS ───────────── */}
        <H2 id="atascos">Si te atascas</H2>
        <P>
          Antes de pedir ayuda, <b>lee el mensaje de error entero</b>: casi siempre dice qué pasa. Si no lo
          entiendes, pégalo en el chat con la orden que escribiste y tu sistema operativo. Estos son los
          habituales:
        </P>
        <Tabla
          min={640}
          cab={["Lo que ves", "Qué pasa", "Arreglo"]}
          filas={[
            [
              <><C>tareas: orden no encontrada</C> · «no se reconoce como nombre de un cmdlet»</>,
              "La carpeta donde uv instala comandos no está en el PATH, o la terminal es anterior a la instalación.",
              <><C>uv tool update-shell</C>, cierra y abre la terminal. Comprueba con <C>uv tool list</C> que está instalada.</>,
            ],
            [
              <><C>uv: orden no encontrada</C> justo después de instalarlo</>,
              "La terminal todavía no ha leído el PATH nuevo.",
              <>Abre una terminal nueva (o reinicia VS Code). En Linux/macOS: <C>source $HOME/.local/bin/env</C>.</>,
            ],
            [
              <>«Permiso denegado» / <C>Permission denied</C></>,
              "El fichero no tiene permiso de ejecución, o intentas escribir en una carpeta del sistema.",
              <><C>chmod +x fichero</C> si es tu script. Trabaja siempre dentro de tu carpeta personal. Nunca uses <C>sudo</C> con uv ni con pip.</>,
            ],
            [
              <>PowerShell: «la ejecución de scripts está deshabilitada en este sistema»</>,
              "La política de ejecución de Windows bloquea scripts .ps1.",
              <><C>Set-ExecutionPolicy -Scope CurrentUser RemoteSigned</C> (solo afecta a tu usuario).</>,
            ],
            [
              <><C>requires-python</C> · «No interpreter found» · Python 3.10</>,
              "Python demasiado antiguo para el proyecto.",
              <><C>uv python install 3.12</C> y <C>uv python pin 3.12</C> dentro del proyecto. No hace falta tocar el Python del sistema.</>,
            ],
            [
              <><C>ModuleNotFoundError: No module named &apos;tareas.cli&apos;</C></>,
              <>Falta <C>src/tareas/cli.py</C>, está en otra carpeta o el paquete se llama distinto.</>,
              <><C>ls src/tareas</C>. El fichero tiene que estar ahí y <C>[project.scripts]</C> tiene que coincidir.</>,
            ],
            [
              <>Push rechazado: <C>! [rejected] (fetch first)</C></>,
              "Creaste el repo de GitHub con README o licencia y tiene un commit que tú no tienes.",
              <><C>git pull --rebase origin main</C> y luego <C>git push</C>.</>,
            ],
            [
              <><C>src refspec main does not match any</C></>,
              "Aún no hay commits, o tu rama se llama master.",
              <>Haz el primer commit y <C>git branch -M main</C>.</>,
            ],
            [
              <>Push: «Authentication failed» / pide contraseña sin parar</>,
              "Estás usando la contraseña de GitHub en lugar de un token.",
              <>
                Sigue{" "}
                <Link href="/programacion-ia/sesion-02/#autenticacion" className={enlace}>
                  la sesión 2 de la web de marca
                </Link>
                .
              </>,
            ],
            [
              <>Subiste <C>.venv</C> o <C>.env</C> por error</>,
              "El .gitignore no estaba antes del commit.",
              <><C>git rm -r --cached .venv</C>, revisa el <C>.gitignore</C> y haz commit. Si era una clave, <b>cámbiala</b>: sigue en el historial. Avisa al profesor.</>,
            ],
          ]}
        />

        {/* ───────────── SIGUIENTE ───────────── */}
        <div className={`mt-10 ${tarjeta}`}>
          <p className="text-[13px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            La semana que viene · 2-6 nov
          </p>
          <p className="mt-2 text-[15px] text-zinc-700 dark:text-zinc-300">
            Tu herramienta deja de listar y empieza a <b>hacer</b>: describes tus acciones en{" "}
            <C>acciones.json</C> (mover, renombrar, borrar...) y escribes el motor que las ejecuta, siempre con{" "}
            <C>--simular</C> primero. Trae pensadas tus 3 acciones del punto 6 de la spec.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/programacion-ia/cli/sesion-02/"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
            >
              Sesión 2 · Acciones predefinidas →
            </Link>
            <Link
              href="/programacion-ia/cli/"
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-bold text-zinc-800 hover:bg-zinc-100 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/10"
            >
              Portada del proyecto CLI tareas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
