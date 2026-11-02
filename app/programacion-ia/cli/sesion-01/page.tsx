import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  Anatomia,
  AntesDespues,
  Arbol,
  Aviso,
  Bloque,
  C,
  Checklist,
  Chip,
  Codigo,
  DosColumnas,
  IconoPermiso,
  Lista,
  Paso,
  Prompt,
  Regla,
  TONO,
  Tarjeta,
  Teclas,
  Terminal,
  cls,
  type TipoPermiso,
  type Tono,
} from "../../_video/piezas";
import { AGENTS_MD, CONFIG_GLOBAL, CONFIG_PROYECTO, VARIABLES_PS, VARIABLES_SH } from "../../_opencode/ficheros";
import {
  AnatomiaPrompt,
  BuscaEnPath,
  CicloCommit,
  ComandoInstalado,
  CommitsSemana,
  ConexionCentro,
  EntregaSemana,
  FlujoCarriles,
  PedirAyuda,
  PermisosRwx,
  QuePuedeHacer,
  QueVaAlRepo,
  Rutas,
  SemanaPasos,
  SiguienteSemana,
  TresHerramientas,
} from "./figuras";

export const metadata: Metadata = {
  title: "Sesión 1 · Arranque: la terminal y tu primera orden — CLI tareas con IA",
  description:
    "La terminal desde cero, uv y Git, y tu orden «tareas listar» construida con el agente OpenCode: plan, diffs que apruebas tú y commits propios.",
};

// Página pensada para grabarse (docs/paginas-para-video.md): cada <Bloque> es
// una pantalla de 16:9 con una sola idea, los pasos se titulan «Paso N · …» y
// todo lo que cuenta cada pieza está escrito, sin pulsar ni pasar el ratón.
// Los ficheros de OpenCode (config global, opencode.json, AGENTS.md, variables)
// vienen de _opencode/ficheros.ts: son los mismos que en la guía de OpenCode.

/* ------------------------------------------------------------------ */
/* Órdenes y código                                                    */
/* ------------------------------------------------------------------ */

const INDICE: [string, string][] = [
  ["#paso-1", "1 · Abre la terminal"],
  ["#paso-2", "2 · Supervivencia"],
  ["#paso-3", "3 · Herramientas"],
  ["#paso-4", "4 · Proyecto y primer commit"],
  ["#paso-5", "5 · Prepara a tu agente"],
  ["#paso-6", "6 · Tu primera orden"],
  ["#paso-7", "7 · Instálala"],
  ["#paso-8", "8 · Audita y commitea"],
  ["#final", "Checklist final"],
  ["#atascos", "Si te atascas"],
];

// [sistema, cómo se ve, la forma general]
const PROMPTS_SISTEMA: [string, string, string][] = [
  ["🐧 Linux", "ana@aula-23:~/pruebas-tareas$", "usuario@equipo:carpeta$"],
  ["🍎 macOS", "ana@MacBook-de-Ana pruebas-tareas %", "usuario@equipo carpeta %"],
  ["🪟 Windows (PowerShell)", String.raw`PS C:\Users\ana\pruebas-tareas>`, "PS carpeta>"],
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

const OPENCODE_SCRIPT = String.raw`curl -fsSL https://opencode.ai/v2/install | bash`;

const CONFIG_DIR_BASH = String.raw`mkdir -p ~/.config/opencode
code ~/.config/opencode/opencode.json     # o nano, o el editor que uses`;

const CONFIG_DIR_PS = String.raw`New-Item -ItemType Directory -Force "$HOME\.config\opencode" | Out-Null
code "$HOME\.config\opencode\opencode.json"`;

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

const ABRIR_OC = String.raw`cd ~/cli-tareas        # o donde creaste el proyecto
opencode`;

const COMMIT_AGENTE = String.raw`git status                  # deben aparecer opencode.json y AGENTS.md, y nada más
git add opencode.json AGENTS.md
git commit -m "Añade opencode.json con los permisos del agente y AGENTS.md con las normas del proyecto"
git push`;

const COMMIT_SPEC = String.raw`git add README.md
git commit -m "Escribe la spec v0 de la herramienta en el README"`;

const PROMPT_PLAN = `Lee @README.md y @pyproject.toml. Quiero src/tareas/cli.py (app de Typer llamada app) y src/tareas/__main__.py con dos órdenes: version y listar [CARPETA].
No escribas código todavía: dime qué ficheros crearías, qué funciones tendría cada uno y cómo tratarías la carpeta inexistente, la vacía, los nombres con corchetes y los ficheros que no se pueden leer.

Criterio de aceptación:
- uv run tareas sin argumentos muestra la ayuda, en español y sin autocompletado.
- version imprime «tareas 0.1.0» leyendo __version__ del paquete.
- listar (por defecto la carpeta actual, acepta ~) pinta una tabla Rich: Nombre, Tipo (extensión o «carpeta»), Tamaño legible, Modificado (AAAA-MM-DD HH:MM). Carpetas primero, luego alfabético sin distinguir mayúsculas.
- Carpeta inexistente o que no es carpeta: mensaje en stderr, sin traza, código 1. Carpeta vacía: aviso en vez de tabla vacía.
- pathlib, sin os.system ni subprocess, sin dependencias nuevas. uv run python -m tareas también funciona.`;

const PROMPT_CORRIGE = `Dos cambios al plan:
1. Escapa los nombres con rich.markup.escape para que [borrador].pdf salga entero.
2. Si un fichero da error al leer su fecha o tamaño (enlace roto, sin permisos), sáltalo sin romper la tabla.
Repíteme el plan corregido en 5 líneas.`;

const PROMPT_BUILD = `Hazlo con el plan corregido. Toca solo src/tareas/cli.py y src/tareas/__main__.py.
Cuando acabes, ejecuta uv run tareas --help y dime qué órdenes pruebo yo en ~/pruebas-tareas.`;

const PROBAR_EN_OC = `!uv run tareas version
!uv run tareas listar ~/pruebas-tareas
!uv run tareas listar /no/existe; echo $?`;

// En OpenCode 2, «!» al principio de la caja la pasa entera a modo shell: la
// orden que falla va sola y la explicación, en un mensaje aparte.
const FALLO_ORDEN = `!uv run tareas listar ~/pruebas-tareas/contrato.docx; echo $?`;

const FALLO_PROMPT = `Sale una traza de Python y código 1; esperaba el mensaje de error en stderr y código 1, sin traza.
Corrige solo eso en @src/tareas/cli.py y explícame en 2 líneas qué fallaba.`;

const PROMPT_MENSAJE = `Mira git diff y git status y propón un mensaje de commit en español, en imperativo, de una línea, que cuente qué cambia y para qué. No hagas el commit.`;

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
**Herramienta:** OpenCode 2 · modelo centro/qwen3.8-flash-next
**Prompt del plan (agente plan):** (pégalo tal cual lo enviaste)
**Qué corregí del plan:** ej.: no escapaba los nombres con corchetes; [foto].jpg salía sin corchetes.
**Diffs que rechacé o deshice (/undo) y por qué:** ej.: quería añadir la librería humanize.
**Funcionaba a la primera:** sí / no. Qué fallo le expliqué: ________
**Qué aprendí:** ej.: typer.Exit(code=1) termina con código 1 sin traza.`;

const COMMITS = String.raw`git status                  # ¿solo cli.py y __main__.py? Nada de .env ni .venv
git diff                    # repásalo una última vez
git add src/tareas/cli.py src/tareas/__main__.py
git commit -m "Añade las órdenes version y listar con tabla Rich"
git add docs/prompts.md
git commit -m "Guarda el prompt de la orden listar y lo que corregí"
git push
git log --oneline`;

/* ------------------------------------------------------------------ */
/* Datos de las piezas                                                 */
/* ------------------------------------------------------------------ */

const HILO: [string, string][] = [
  ["Detectas lo que te hace perder tiempo", "lo escribes en tu spec (paso 6)"],
  ["Lo automatizas con tu comando tareas", "construido con OpenCode: tú decides, el agente escribe"],
  ["Lo reutilizas desde cualquier carpeta", "instalado como un comando más (paso 7)"],
];

const PRODUCTO: [string, ReactNode][] = [
  ["Tu comando tareas", <>Instalado: lo escribes en cualquier carpeta y responde.</>],
  [
    "Tres órdenes",
    <>
      <C>tareas --help</C>, <C>tareas version</C> y <C>tareas listar</C> (tabla con nombre, tipo, tamaño y fecha),{" "}
      <b>construidas con OpenCode</b> aprobando tú cada cambio.
    </>,
  ],
  [
    "Un repo público",
    <>
      En GitHub, con <C>.gitignore</C> correcto desde el primer commit, <C>opencode.json</C> (los permisos de tu agente) y{" "}
      <C>AGENTS.md</C> (sus normas).
    </>,
  ],
  ["4 commits tuyos", <>Como mínimo, hechos por ti y con mensajes que cuentan qué has hecho.</>],
];

const ABRIR: { titulo: string; como: ReactNode; interprete: string }[] = [
  { titulo: "🐧 Linux (aula)", como: <><Teclas combo="Ctrl+Alt+T" />, o busca «Terminal» en el menú.</>, interprete: "bash (o zsh)" },
  {
    titulo: "🪟 Windows",
    como: <>Tecla Windows → escribe «Terminal» → <b>Windows Terminal</b>. Si no la tienes, «PowerShell». Evita «Símbolo del sistema» (cmd).</>,
    interprete: "PowerShell",
  },
  { titulo: "🍎 macOS", como: <><Teclas combo="Cmd+Espacio" /> → «Terminal».</>, interprete: "zsh (casi igual que bash)" },
  {
    titulo: "💻 VS Code",
    como: <>Menú Ver → Terminal, o <Teclas combo="Ctrl+ñ" /> (teclado español). Se abre en la carpeta del proyecto.</>,
    interprete: "la de tu sistema",
  },
];

const COMPARA_SHELL: [string, ReactNode, ReactNode][] = [
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
];

const TRUCOS: { titulo: string; tecla: string; texto: ReactNode }[] = [
  { titulo: "↑ y ↓", tecla: "↑ ↓", texto: <>Recorren las órdenes que ya escribiste. No vuelvas a teclear una orden larga.</> },
  {
    titulo: "Tab",
    tecla: "Tab",
    texto: (
      <>
        Autocompleta carpetas y ficheros: <C>cd pru</C> + Tab. Si no completa, pulsa Tab dos veces y verás las opciones. Así no
        hay erratas.
      </>
    ),
  },
  {
    titulo: "Ctrl+C",
    tecla: "Ctrl+C",
    texto: (
      <>
        Corta la orden en marcha. En la terminal <b>no</b> copia: usa <Teclas combo="Ctrl+Shift+C" /> /{" "}
        <Teclas combo="Ctrl+Shift+V" /> en Linux, o el ratón.
      </>
    ),
  },
  { titulo: "--help", tecla: "", texto: <>Casi toda orden explica sus opciones con <C>orden --help</C>. Tu herramienta también lo hará.</> },
];

const PRUEBAS_ARBOL = [
  { nombre: "docs/", nivel: 0, carpeta: true },
  { nombre: "notas.txt", nivel: 1, nota: "con texto" },
  { nombre: "fotos/", nivel: 0, carpeta: true },
  { nombre: "IMG_0001.jpg", nivel: 1 },
  { nombre: "IMG_0002.jpg", nivel: 1 },
  { nombre: "captura.png", nivel: 1 },
  { nombre: "apuntes-tema1.pdf", nivel: 0 },
  { nombre: "borrador.tmp", nivel: 0 },
  { nombre: "cache-1.tmp", nivel: 0 },
  { nombre: "cache-2.tmp", nivel: 0 },
  { nombre: "contrato.docx", nivel: 0 },
  { nombre: "factura-octubre.pdf", nivel: 0 },
  { nombre: "mi fichero con espacios.pdf", nivel: 0, tono: "ambar" as Tono },
  { nombre: "viejo-1.tmp", nivel: 0, nota: "1 sep 2026", tono: "rosa" as Tono },
  { nombre: "viejo-2.tmp", nivel: 0, nota: "1 sep 2026", tono: "rosa" as Tono },
];

const FICHEROS_UV: [string, string, string][] = [
  ["pyproject.toml", "La ficha del proyecto: nombre, versión, Python mínimo, dependencias y qué comandos instala.", "Sí"],
  ["src/tareas/__init__.py", "Convierte la carpeta en un paquete de Python. Aquí guardaremos la versión.", "Sí"],
  [".python-version", "Qué Python usa uv en este proyecto (3.12).", "Sí"],
  ["uv.lock", "Las versiones EXACTAS de todo lo instalado. Así en otro ordenador se instala lo mismo.", "Sí"],
  ["README.md", "La portada del repo. En el paso 6 pondrás aquí tu spec.", "Sí"],
  [".venv/", "El entorno virtual: Python y librerías de este proyecto. Pesa mucho y se regenera con uv sync.", "NO"],
  [".git/", "uv ya ha hecho git init por ti. Es la historia del repo.", "(es el repo)"],
];

// [veredicto, regla, qué significa]. Las tres partes del opencode.json del
// proyecto (líneas 1-10, 11-22 y 23-33 de CONFIG_PROYECTO, como en la guía).
const REGLAS_FICHEROS: [TipoPermiso, string, string][] = [
  ["ask", "edit · * → ask", "Cada vez que quiera crear o cambiar un fichero te enseña el diff y espera. En la semana 1 es obligatorio: lees cada cambio antes de aceptarlo."],
  ["ask", "webfetch y external_directory → ask", "Leer una web o salir de la carpeta del proyecto: siempre preguntando."],
  ["deny", "read · *.env, *.env.* → deny", "Puede leer todo el proyecto menos tus ficheros de secretos: tu clave de la semana 3 no debe viajar al modelo. .env.example sí (no lleva claves)."],
];

const REGLAS_ORDENES: [TipoPermiso, string, string][] = [
  ["ask", "shell · * → ask", "Cualquier orden pregunta, salvo las de la lista. Va la primera: las de debajo la matizan."],
  ["allow", "shell · ls, git status, git diff… → allow", "Las de solo mirar (ls, git status, git diff, uv run tareas --help) no hacen daño y van en allow."],
  ["ask", "uv run tareas ejecutar … (no está)", "Cae en el «*»: pregunta. Desde la semana 2 esa orden mueve y borra ficheros: nunca sin que tú lo veas."],
  ["ask", "shell · git commit * → ask", "Los commits los haces tú: si te lo propone, te pregunta."],
];

const REGLAS_NUNCA: [TipoPermiso, string, string][] = [
  ["deny", "policies: git push, git reset, rm, sudo", "Prohibidos para el agente: el push es tuyo y borrar o reescribir historia, nunca. Las policies solo pueden negar y ninguna regla las deshace."],
  ["deny", "agents · plan y explore: edit → deny", "plan y explore no editan nada; sus órdenes siguen tus reglas. Sin esto, tu edit · * → ask les devolvería la edición."],
];

// [lo que escribes (teclas o texto), comando, qué hace]
const TECLAS_OC: { teclas?: string; texto?: string; comando?: string; que: ReactNode }[] = [
  { teclas: "shift+tab", que: <>Cambia de agente: <b>build</b> (hace cambios) ↔ <b>plan</b> (solo piensa y propone). Lo ves abajo, junto al modelo.</> },
  { texto: "@fichero", que: <>Adjunta un fichero al mensaje (con búsqueda: escribe <C>@READ</C> y elige). Es como decir «mira esto».</> },
  { texto: "!orden", que: <>Al principio de la caja vacía, modo shell: la orden se ejecuta en tu proyecto y su salida le llega al agente.</> },
  { teclas: "Esc", que: <>Interrumpe al agente mientras responde (si se va por las ramas).</> },
  { teclas: "ctrl+x u", comando: "/undo", que: <>Deshace tu último mensaje <b>y los cambios en ficheros</b> que provocó. <C>/redo</C> lo rehace.</> },
  { teclas: "ctrl+x n", comando: "/new", que: <>Sesión nueva (conversación limpia). Una por tarea.</> },
  { teclas: "ctrl+x c", comando: "/compact", que: <>Resume la conversación cuando se alarga, para no llenar la memoria del modelo.</> },
  { teclas: "ctrl+x x", comando: "/export", que: <>Exporta la conversación a tu editor.</> },
  { teclas: "ctrl+p", comando: "/help", que: <>Paleta de comandos y ayuda.</> },
  { teclas: "ctrl+c", que: <>Sale de OpenCode. <C>opencode -c</C> continúa la última sesión.</> },
];

const RESPUESTAS: { tipo: string; tono: Tono; que: string; cuando: ReactNode }[] = [
  { tipo: "once", tono: "verde", que: "Lo permite solo esta vez.", cuando: <>Lo normal esta semana: lees, entiendes y aceptas.</> },
  {
    tipo: "always",
    tono: "ambar",
    que: "Lo guarda como regla allow del proyecto: ya no te preguntará por eso.",
    cuando: <>Solo para órdenes inofensivas que se repiten. <b>Nunca</b> para ediciones esta semana.</>,
  },
  { tipo: "reject", tono: "rosa", que: "Lo rechaza. El agente lo ve y busca otra forma.", cuando: <>Si no entiendes el cambio o no es lo que pediste. Después explícale por qué.</> },
];

const CODIGOS: [string, string, Tono][] = [
  ["0", "bien", "verde"],
  ["1", "fallo al ejecutar", "rosa"],
  ["2", "error de uso (lo pone Typer)", "ambar"],
  ["3", "configuración inválida (semana 2)", "morado"],
];

const MENSAJES: [string, string][] = [
  ["cambios", "Añade la orden listar con tabla Rich"],
  ["arreglos", "Devuelve código 1 si la carpeta no existe"],
  ["asdf", "Escapa nombres con corchetes en la tabla"],
  ["lo que me ha dado la IA", "Guarda en docs/prompts.md el plan de listar y lo que corregí"],
  ["version final final 2", "Escribe la spec v0 en el README"],
];

const CHECK_A: ReactNode[] = [
  <>Tengo <C>~/pruebas-tareas</C> con los ficheros de ejemplo (pdf, jpg, tmp viejos y nuevos, uno con espacios).</>,
  <><C>git --version</C>, <C>uv --version</C> y Python 3.12 o superior funcionan.</>,
  <><C>opencode --version</C> dice <b>v2</b> y <C>opencode models</C> lista <C>centro/qwen3.8-flash-next</C>.</>,
  <>La URL, la clave y el certificado del centro van en variables de entorno, <b>no</b> en ningún fichero del repo.</>,
  <>El proyecto <C>cli-tareas</C> tiene <C>pyproject.toml</C> con <C>tareas = &quot;tareas.cli:app&quot;</C>.</>,
  <><C>.gitignore</C> (con <C>.env</C> y <C>.venv/</C>) y <C>.gitattributes</C> estaban en el <b>primer</b> commit, hecho antes de abrir OpenCode.</>,
  <>El repo tiene <C>opencode.json</C> con los permisos del proyecto y un <C>AGENTS.md</C> que he revisado y editado yo.</>,
];

const CHECK_B: ReactNode[] = [
  <>El README tiene mi spec de 10 líneas, rellenada por mí.</>,
  <>He construido <C>cli.py</C> con <b>plan → build</b>, aprobando cada diff, y he usado <C>/undo</C> o le he explicado un fallo al menos una vez.</>,
  <>Desde cualquier carpeta: <C>tareas --help</C>, <C>tareas version</C> y <C>tareas listar ~/pruebas-tareas</C> funcionan.</>,
  <><C>tareas listar /no/existe</C> da un mensaje claro y código de salida 1.</>,
  <><C>docs/prompts.md</C> tiene al menos el prompt del plan y lo que corregí.</>,
  <>El repo es <b>público</b> en GitHub, tiene <b>al menos 4 commits hechos por mí</b> con mensajes que cuentan y no contiene <C>.venv</C> ni <C>.env</C>.</>,
  <>Sé explicar en voz alta qué hace cada línea de <C>cli.py</C> y cada regla de <C>opencode.json</C>.</>,
];

// [lo que ves, qué pasa, arreglo]
const ATASCOS: { titulo: string; items: [ReactNode, ReactNode, ReactNode][] }[] = [
  {
    titulo: "Errores de terminal y PATH",
    items: [
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
        <>PowerShell: «la ejecución de scripts está deshabilitada»</>,
        "La política de ejecución de Windows bloquea scripts .ps1.",
        <><C>Set-ExecutionPolicy -Scope CurrentUser RemoteSigned</C> (solo afecta a tu usuario).</>,
      ],
    ],
  },
  {
    titulo: "Errores de Python y Git",
    items: [
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
    ],
  },
  {
    titulo: "Errores al subir a GitHub",
    items: [
      [
        <>Push: «Authentication failed» / pide contraseña sin parar</>,
        "Estás usando la contraseña de GitHub en lugar de un token.",
        <>
          Sigue{" "}
          <Link href="/programacion-ia/sesion-02/#autenticacion" className={cls.enlace}>
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
    ],
  },
  {
    titulo: "Errores al instalar y conectar OpenCode",
    items: [
      [
        <><C>opencode: orden no encontrada</C></>,
        "La terminal es anterior a la instalación, o la carpeta del programa (en Windows, la del zip) no está en el PATH.",
        "Abre una terminal nueva (o reinicia VS Code). Si sigue, repite la instalación del paso 3 y lee el mensaje final del instalador.",
      ],
      [
        <><C>opencode --version</C> dice 1.algo</>,
        <>Tienes OpenCode 1 de otro instalador o de un paquete antiguo (<C>opencode-ai</C>).</>,
        <>Desinstálalo e instala con el script de la v2 (o <C>npm install -g @opencode/cli</C>).</>,
      ],
      [
        <><C>opencode models</C> no enseña el del centro</>,
        <>La config global no está donde OpenCode la busca, el JSON tiene un error o el proveedor no se llama <C>centro</C>.</>,
        <><C>opencode debug paths config</C> te dice la ruta; revisa el fichero y el nombre del proveedor.</>,
      ],
      [
        <><C>opencode run</C> se queda reintentando sin fin</>,
        <>Variable vacía, dirección sin <C>/v1</C>, falta el certificado del centro (<C>NODE_EXTRA_CA_CERTS</C>) o no estás en la red del centro.</>,
        <><C>Ctrl+C</C> y repite en una terminal nueva (obligatorio tras <C>setx</C> o <C>.bashrc</C>). Desde casa, lo que explicó el profesor en la tutoría; si en el aula le pasa a todos, avisa.</>,
      ],
    ],
  },
  {
    titulo: "Errores mientras trabajas con OpenCode",
    items: [
      [
        "Error 401 / 403",
        "La clave no llega o está mal copiada.",
        <>En una terminal nueva: <C>echo $CENTRO_IA_KEY</C> (bash) o <C>echo $env:CENTRO_IA_KEY</C> (PowerShell). Si sale vacía, revisa el <C>export</C> o el <C>setx</C>.</>,
      ],
      [
        "Me pregunta permiso para todo",
        <>Es lo que has configurado: <C>edit · * → ask</C> y <C>shell · * → ask</C>.</>,
        <>Es lo correcto esta semana. Para una orden inofensiva que se repite, responde <b>always</b>. Nunca <C>--auto</C>.</>,
      ],
      [
        <><C>/undo</C> no devuelve los ficheros</>,
        "La carpeta no es un repositorio git, o el fichero está ignorado por git o pasa de 2 MiB.",
        <><C>git init</C> (uv init ya lo hace) y vuelve a abrir <C>opencode</C>; los commits no hacen falta. Si ya estaba commiteado, <C>git restore fichero</C>.</>,
      ],
      [
        <>He cambiado <C>opencode.json</C> y no hace caso</>,
        "OpenCode trabaja con un servicio de fondo que puede seguir con la config anterior.",
        <><C>opencode reload</C>, o sal con <C>ctrl+c</C> y vuelve a abrir <C>opencode</C> (<C>opencode -c</C> para seguir la sesión).</>,
      ],
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Piezas propias de esta página                                       */
/* ------------------------------------------------------------------ */

/** Párrafo de un bloque (16 px; 18 con `grande`). */
function P({ children, grande = false, className = "" }: { children: ReactNode; grande?: boolean; className?: string }) {
  return <p className={`${cls.texto} ${grande ? "text-lg" : ""} ${className}`}>{children}</p>;
}

/** Duración del paso, delante de la entradilla. */
function Tiempo({ children }: { children: ReactNode }) {
  return (
    <span className="mr-2 inline-block rounded-full border border-zinc-300 bg-zinc-100 px-3 py-0.5 align-middle text-base font-bold text-zinc-700 dark:border-white/15 dark:bg-white/10 dark:text-zinc-200">
      ⏱ {children}
    </span>
  );
}

/** Tabla a 16 px que cabe en la pantalla (sin desplazamiento lateral a 1280). */
function Tabla({ cab, filas }: { cab: string[]; filas: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
      <table className="w-full min-w-[640px] border-collapse text-base">
        <thead>
          <tr className="bg-zinc-100 dark:bg-white/10">
            {cab.map((c) => (
              <th key={c} className="px-4 py-2 text-left font-bold text-zinc-800 dark:text-zinc-100">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((f, i) => (
            <tr key={i} className="border-t border-zinc-200 align-top dark:border-white/10">
              {f.map((celda, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="px-4 py-2 text-left font-semibold text-zinc-900 dark:text-zinc-100">
                    {celda}
                  </th>
                ) : (
                  <td key={j} className="px-4 py-2 text-zinc-700 dark:text-zinc-300">
                    {celda}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Un trozo del opencode.json del proyecto con sus reglas explicadas debajo. */
function TrozoConfig({ titulo, parte, rango, reglas }: { titulo: string; parte: number; rango: [number, number]; reglas: [TipoPermiso, string, string][] }) {
  return (
    <Bloque titulo={titulo} nivel={3}>
      <Codigo code={CONFIG_PROYECTO} kind="json" etiqueta={`cli-tareas/opencode.json · parte ${parte} de 3`} ajustar={false} rango={rango} />
      <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2">
        {reglas.map(([t, r, d]) => (
          <Regla key={r} tipo={t} regla={r}>
            {d}
          </Regla>
        ))}
      </ul>
    </Bloque>
  );
}

/** Un trozo de cli.py junto a lo que hay que mirar en él. */
function TrozoCli({ titulo, rango, children }: { titulo: string; rango: [number, number]; children: ReactNode }) {
  return (
    <Bloque
      titulo={titulo}
      nivel={3}
      anchoJunto={700}
      junto={<Codigo code={CLI_PY} kind="py" etiqueta={`src/tareas/cli.py · líneas ${rango[0]}-${rango[1]}`} rango={rango} />}
    >
      <div className="space-y-4">{children}</div>
    </Bloque>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export default function CliSesion1() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      {/* Portada */}
      <section data-bloque className="max-w-[1100px]">
        <Breadcrumbs
          grande
          items={[
            { title: "Curso de Programación con IA", path: "/programacion-ia/" },
            { title: "CLI tareas con IA", path: "/programacion-ia/cli/" },
            { title: "Sesión 1", path: "/programacion-ia/cli/sesion-01/" },
          ]}
        />
        <Chip>Proyecto 2 · Sesión 1 · Semana 26-30 oct</Chip>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Arranque: la terminal y <span className="text-blue-600 dark:text-blue-400">tu primera orden</span>
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          Esta semana pierdes el miedo a la pantalla negra y empiezas a programar como se programa ya: con un <b>agente</b>.
          Aprendes a moverte por la terminal, instalas las herramientas, creas tu proyecto en Python y construyes tu primera
          orden con <b>OpenCode</b>: tú decides y apruebas, el agente escribe. Todo paso a paso: si nunca has abierto una
          terminal, empiezas en el paso 1 y llegas igual que el resto.
        </p>

        <div className={`mt-5 rounded-2xl border p-4 ${TONO.verde.caja}`}>
          <p className={`text-base font-bold uppercase tracking-wider ${TONO.verde.texto}`}>
            El hilo del proyecto: una herramienta útil para ti
          </p>
          <ol className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3">
            {HILO.map(([t, d], i) => (
              <li key={t} className="flex items-start gap-3">
                <span aria-hidden className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-extrabold ${TONO.verde.disco}`}>
                  {i + 1}
                </span>
                <span>
                  <span className="block text-lg font-semibold text-emerald-950 dark:text-emerald-100">{t}</span>
                  <span className="block text-base text-emerald-900 dark:text-emerald-200">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {["⏱ 4 horas", "🐧 Linux primero · 🪟 Windows · 🍎 macOS", "🧭 100 % guiada", "📦 Python 3.12 · uv · Typer", "🤖 OpenCode 2"].map((m) => (
            <Chip key={m} tono="gris">
              {m}
            </Chip>
          ))}
        </div>
      </section>

      <Bloque id="semana" titulo="Tu semana en 8 pasos">
        <SemanaPasos />
        <nav aria-label="Pasos de la sesión" className="mt-5 flex flex-wrap gap-2">
          {INDICE.map(([href, t]) => (
            <a
              key={href}
              href={href}
              className="rounded-full border border-zinc-300 px-3 py-1 text-base font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/10"
            >
              {t}
            </a>
          ))}
        </nav>
      </Bloque>

      <Bloque titulo="Lo que tendrás al acabar la semana" nivel={3}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PRODUCTO.map(([t, d]) => (
            <Tarjeta key={t} titulo={t} nivel={4} tono="verde">
              <p>{d}</p>
            </Tarjeta>
          ))}
        </div>
      </Bloque>

      <Bloque titulo="Dos grupos, la misma sesión" nivel={3}>
        <DosColumnas
          centro="y"
          a={{
            antetitulo: "🏫 en el aula",
            titulo: "Grupo presencial",
            tono: "azul",
            puntos: [
              <>Trabajas en los <b>equipos Linux del aula</b>: sigue los bloques de bash.</>,
              <>El código lo construyes con <b>OpenCode conectado a los modelos del centro</b>; el chat del centro queda para consultas.</>,
              <>Son 4 h de línea individual, en paralelo a las 4 h de la startup en grupo: no mezcles los repos.</>,
            ],
          }}
          b={{
            antetitulo: "🏠 desde casa",
            titulo: "Grupo semipresencial",
            tono: "morado",
            puntos: [
              <>Terminal y puesta en marcha, en la <b>tutoría colectiva de arranque</b> (presencia <b>obligatoria</b>, fecha en el aula virtual): trae tu portátil. Allí el profesor explica cómo conectarte desde casa a los modelos del centro.</>,
              <>En casa, <b>OpenCode en la terminal integrada de VS Code</b>; el chat de Copilot de Microsoft 365, solo para consultas.</>,
              <>¿Equipo <b>Windows</b>? Sigue los bloques de <b>PowerShell</b>. El 6 nov hay comprobación de proceso.</>,
            ],
          }}
        />
        <Link
          href="/programacion-ia/opencode/"
          className={`mt-4 flex items-center justify-between gap-4 rounded-2xl border p-4 ${TONO.morado.caja}`}
        >
          <span className="min-w-0">
            <span className="block text-lg font-bold text-violet-900 dark:text-violet-100">🤖 Guía completa de OpenCode, tu agente</span>
            <span className="block text-base text-violet-900 dark:text-violet-200">
              Esta sesión te da lo justo para empezar; la guía, el resto (agentes, permisos, skills, MCP).
            </span>
          </span>
          <span aria-hidden className="flex-none text-2xl text-violet-700 dark:text-violet-300">
            →
          </span>
        </Link>
      </Bloque>

      {/* ───────────── PASO 1 ───────────── */}
      <Paso
        id="paso-1"
        n={1}
        titulo="Abre la terminal"
        entradilla={
          <>
            <Tiempo>10 min</Tiempo>
            La terminal es una ventana donde escribes órdenes en lugar de hacer clic. Es más rápida, se puede automatizar y es
            donde vive casi todo lo que hace un programador: Git, Python, servidores. Ábrela así:
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ABRIR.map((a) => (
            <Tarjeta key={a.titulo} titulo={a.titulo} nivel={4}>
              <p>{a.como}</p>
              <p className="mt-2">
                <Chip tono="gris">{a.interprete}</Chip>
              </p>
            </Tarjeta>
          ))}
        </div>
      </Paso>

      <Bloque
        titulo="Lee el prompt antes de escribir"
        nivel={3}
        entradilla={
          <>
            El <b>prompt</b> es el texto que la terminal escribe sola antes del cursor. Te dice quién eres, en qué máquina y, lo
            más importante, <b>en qué carpeta estás</b>:
          </>
        }
      >
        <AnatomiaPrompt />
        <dl className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {PROMPTS_SISTEMA.map(([sistema, prompt, forma]) => (
            <div key={sistema} className={`${cls.suave} min-w-0 !p-4`}>
              <dt className="text-base font-bold text-zinc-800 dark:text-zinc-100">{sistema}</dt>
              <dd className="mt-1 font-mono text-base font-semibold text-zinc-900 [overflow-wrap:anywhere] dark:text-zinc-50">{prompt}</dd>
              <dd className={cls.tenue}>{forma}</dd>
            </div>
          ))}
        </dl>
      </Bloque>

      <Aviso titulo="Regla de oro: sin el prompt" tono="azul">
        <p>
          En esta página, las órdenes van <b>sin</b> el prompt. No copies el <C>$</C> ni el <C>PS C:\...&gt;</C>. Lo que hay
          detrás de un <C>#</C> es un comentario para ti: la terminal lo ignora.
        </p>
        <p>
          Escribe una orden, pulsa Intro y <b>lee lo que responde</b>. Si no responde nada, normalmente es que todo ha ido bien.
        </p>
      </Aviso>

      {/* ───────────── PASO 2 ───────────── */}
      <Paso
        id="paso-2"
        n={2}
        titulo="Supervivencia en la terminal"
        entradilla={
          <>
            <Tiempo>15 min de práctica + reto</Tiempo>
            Con quince órdenes te mueves por cualquier ordenador. Antes, dos ideas: todo fichero vive en un <b>árbol de
            carpetas</b>, y para llegar a él escribes una <b>ruta</b>.
          </>
        }
      >
        <Rutas />
      </Paso>

      <Bloque
        titulo="Las órdenes básicas en bash"
        nivel={3}
        entradilla="Linux y macOS. Escríbelas una a una, no las pegues todas a la vez: el objetivo es que tus dedos las aprendan."
      >
        <Codigo code={SUPERVIVENCIA_BASH} etiqueta="bash · Linux y macOS" />
      </Bloque>

      <Bloque
        titulo="Las mismas en PowerShell"
        nivel={3}
        entradilla={
          <>
            Windows. PowerShell entiende muchos nombres de bash (<C>ls</C>, <C>cd</C>, <C>pwd</C>, <C>cat</C>, <C>cp</C>,{" "}
            <C>mv</C>, <C>rm</C>) como alias, pero las opciones cambian. Los nombres «de verdad» son estos:
          </>
        }
      >
        <Codigo code={SUPERVIVENCIA_PS} etiqueta="PowerShell · Windows" />
      </Bloque>

      <Bloque titulo="bash frente a PowerShell" nivel={3}>
        <Tabla cab={["Para qué", "bash (Linux/macOS)", "PowerShell (Windows)"]} filas={COMPARA_SHELL} />
      </Bloque>

      <Aviso titulo="La terminal no tiene papelera" tono="rosa" icono={<IconoPermiso tipo="deny" tam={36} />}>
        <p>
          <C>rm</C> y <C>Remove-Item</C> borran para siempre, sin preguntar. Antes de un <C>rm -r</C>, haz <C>pwd</C> y{" "}
          <C>ls</C> para comprobar dónde estás y qué vas a borrar.
        </p>
        <p>
          Nunca escribas <C>rm -rf</C> con rutas que no entiendes, ni las copies de internet o de una IA sin leerlas.
        </p>
      </Aviso>

      <Bloque titulo="Cuatro trucos que te ahorran horas" nivel={3}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TRUCOS.map((t) => (
            <Tarjeta key={t.titulo} titulo={t.titulo} nivel={4} mono tono="azul">
              <p>{t.texto}</p>
            </Tarjeta>
          ))}
        </div>
      </Bloque>

      <Bloque
        titulo="Mini-reto: tu carpeta de pruebas"
        nivel={3}
        entradilla={
          <>
            Tu herramienta va a mover, renombrar y borrar ficheros. Nunca la pruebes con tus ficheros reales: créate una carpeta
            de pruebas con ficheros de mentira (vacíos). Si la rompes, bórrala y vuelve a crearla: para eso está.
          </>
        }
      >
        <Codigo code={PRUEBAS_BASH} etiqueta="bash · Linux y macOS" />
      </Bloque>

      <Bloque titulo="El mismo reto en PowerShell" nivel={3}>
        <Codigo code={PRUEBAS_PS} etiqueta="PowerShell · Windows" />
      </Bloque>

      <Bloque titulo="Comprueba tu carpeta de pruebas" nivel={3}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <P grande>
              Compruébalo con <C>ls -la</C>: 3 <C>.pdf</C> (uno con espacios), un <C>.docx</C>, 5 <C>.tmp</C> (dos de ellos con
              fecha de septiembre), 3 imágenes en <C>fotos/</C> y un <C>notas.txt</C> con texto en <C>docs/</C>.
            </P>
            <P grande>
              En <C>ls -la</C>, fíjate en la columna de la fecha de los <C>viejo-*.tmp</C>: la usarás en la semana 2 para
              «borrar temporales de más de 30 días».
            </P>
          </div>
          <Arbol titulo="Lo que debes tener" raiz="~/pruebas-tareas/" nodos={PRUEBAS_ARBOL} tono="azul" />
        </div>
      </Bloque>

      <Bloque
        titulo="Permisos: «Permiso denegado»"
        nivel={3}
        entradilla={
          <>
            En Linux y macOS cada fichero tiene permisos de lectura (<C>r</C>), escritura (<C>w</C>) y ejecución (<C>x</C>) para
            ti, tu grupo y el resto. <C>ls -l</C> los enseña en la primera columna. Pruébalo con un script de una línea:
          </>
        }
      >
        <Codigo code={PERMISOS} etiqueta="bash · Linux y macOS" />
      </Bloque>

      <Bloque titulo="Cómo se leen los permisos" nivel={3}>
        <PermisosRwx />
        <P grande className="mt-4">
          En Windows no hay <C>chmod</C>: lo que decide si algo se ejecuta es la extensión (<C>.exe</C>, <C>.ps1</C>) y la
          política de ejecución de PowerShell. Tu comando <C>tareas</C> lo instalará uv con los permisos correctos en los tres
          sistemas.
        </P>
      </Bloque>

      <Bloque
        titulo="El PATH: dónde busca la terminal"
        nivel={3}
        entradilla={
          <>
            ¿Por qué <C>ls</C> funciona en cualquier carpeta y <C>saludo.sh</C> no? Porque cuando escribes una orden sin ruta, la
            terminal la busca en una lista de carpetas llamada <b>PATH</b>, por orden, y ejecuta la primera que encuentra.
          </>
        }
      >
        <BuscaEnPath />
      </Bloque>

      <Bloque titulo="Mira tu PATH" nivel={3}>
        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
          <Codigo code={PATH_BASH} etiqueta="bash · Linux y macOS" />
          <Codigo code={PATH_PS} etiqueta="PowerShell · Windows" />
        </div>
        <P grande className="mt-4">
          Guárdate la idea: en el paso 7 instalarás <C>tareas</C> en una carpeta que debe estar en el PATH. Si un día escribes una
          orden y te dice «orden no encontrada» o «no se reconoce como nombre de un cmdlet», el 99 % de las veces es el PATH.
        </P>
      </Bloque>

      {/* ───────────── PASO 3 ───────────── */}
      <Paso
        id="paso-3"
        n={3}
        titulo="Instala las herramientas"
        entradilla={
          <>
            <Tiempo>35 min</Tiempo>
            Necesitas tres cosas: <b>git</b> (ya lo usaste en la web de marca), <b>uv</b>, el gestor de proyectos Python (una
            sola herramienta en lugar de pip, venv, pipx y pyenv), y <b>OpenCode</b>, el agente que va a escribir código contigo.
            En el aula puede que ya estén: compruébalo con <C>git --version</C>, <C>uv --version</C> y{" "}
            <C>opencode --version</C> antes de instalar nada.
          </>
        }
      >
        <TresHerramientas />
      </Paso>

      <Bloque titulo="Instala git y uv" nivel={3}>
        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
          <Codigo code={UV_LINUX} etiqueta="bash · Linux y macOS" />
          <Codigo code={UV_WIN} etiqueta="PowerShell · Windows" />
        </div>
        <P className="mt-4">
          Debes ver git (cualquiera reciente), uv y un Python <b>3.12 o superior</b>. El instalador de uv es un script descargado
          de internet que se ejecuta en tu máquina: está bien porque viene de la web oficial de Astral, pero <b>nunca</b> lo
          hagas con una URL que no conoces.
        </P>
        <P className="mt-2">
          <b>Alternativa clásica</b> (solo si uv no te funciona y ya lo has consultado): Python 3.12 de python.org,{" "}
          <C>python -m venv .venv</C> + <C>pip install typer</C>, y <C>pipx</C> para instalar el comando.
        </P>
      </Bloque>

      <Aviso titulo="«uv: orden no encontrada»: es el PATH" tono="ambar">
        <p>
          Justo después de instalar, el instalador ha añadido su carpeta (<C>~/.local/bin</C> o{" "}
          <C>%USERPROFILE%\.local\bin</C>) al PATH, pero solo las terminales <b>nuevas</b> lo leen.
        </p>
        <p>
          Cierra la terminal (en VS Code, la papelera de la terminal; a veces hay que reiniciar VS Code entero) y abre otra. En
          Linux/macOS también vale <C>source $HOME/.local/bin/env</C>.
        </p>
      </Aviso>

      <Bloque
        titulo="Instala OpenCode"
        nivel={3}
        entradilla={
          <>
            Usamos la <b>última versión estable de OpenCode 2</b>. El número exacto importa poco: lo que aprendes es a trabajar
            con un agente. Elige tu sistema:
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Tarjeta titulo="Linux y macOS" nivel={4} className="flex flex-col">
            <p className="mb-3">
              El script oficial; después, <b>abre una terminal nueva</b>. También vale <C>npm install -g @opencode/cli</C>.
            </p>
            <Codigo code={OPENCODE_SCRIPT} />
          </Tarjeta>
          <Tarjeta titulo="Windows nativo (zip)" nivel={4}>
            <ol className="list-decimal space-y-1 pl-5">
              <li>
                Instala <b>Git for Windows</b>: OpenCode ejecuta sus órdenes con Git Bash (sin él, con PowerShell) y sin git
                no hay <C>/undo</C> de ficheros.
              </li>
              <li>
                Descarga el zip oficial:{" "}
                <a className={cls.enlace} href="https://opencode.ai/update/api/latest/cli/opencode/opencode-windows-x64.zip">
                  opencode-windows-x64.zip
                </a>
                .
              </li>
              <li>
                Descomprímelo en una carpeta tuya (<C>C:\opencode</C>) y añádela al <b>PATH</b>.
              </li>
              <li>Abre una terminal nueva de PowerShell.</li>
            </ol>
          </Tarjeta>
          <Tarjeta titulo="Windows con WSL" nivel={4}>
            <p>
              Un Linux dentro de Windows. Si ya usas WSL (Ubuntu), en su terminal usa el script de Linux. Ojo: las variables y la
              config van en el <C>~</C> de Linux, no en el de Windows.
            </p>
          </Tarjeta>
        </div>
        <div className="mt-4 max-w-2xl">
          <Terminal
            lineas={[
              { o: "opencode --version", c: "# debe decir v2.algo" },
              { s: "opencode v2.2.5", tono: "ok" },
            ]}
          />
        </div>
      </Bloque>

      <Bloque
        titulo="Conéctalo con los modelos del centro"
        nivel={3}
        entradilla={
          <>
            OpenCode no trae inteligencia propia: habla con un modelo de IA. Usamos los <b>modelos locales del instituto</b> (un
            servidor del centro con API compatible con OpenAI). La configuración va en tu carpeta personal, <b>no en el repo</b>.
          </>
        }
      >
        <ConexionCentro />
      </Bloque>

      <Bloque
        titulo="Crea el fichero de config global"
        nivel={3}
        entradilla={
          <>
            Crea la carpeta y abre el fichero con tu editor. Si dudas de la ruta (Windows, WSL…), <C>opencode debug paths config</C>{" "}
            te dice la carpeta exacta.
          </>
        }
      >
        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
          <Codigo code={CONFIG_DIR_BASH} etiqueta="bash · Linux y macOS" />
          <Codigo code={CONFIG_DIR_PS} etiqueta="PowerShell · Windows" />
        </div>
      </Bloque>

      <Bloque
        titulo="Pega la config global"
        nivel={3}
        entradilla="Tal cual, sin cambiar nada: la dirección y la clave no están escritas, salen de variables de entorno."
      >
        <Codigo code={CONFIG_GLOBAL} kind="json" etiqueta="~/.config/opencode/opencode.json" ajustar={false} />
      </Bloque>

      <Bloque titulo="Qué hace cada clave" nivel={3}>
        <ul className={`grid grid-cols-1 gap-x-8 gap-y-3 lg:grid-cols-2 ${cls.texto}`}>
          {[
            <><C>centro</C> (en <C>providers</C>): un proveedor que llamamos «centro»; es lo que va antes de la barra en <C>model</C>.</>,
            <><C>package</C> <C>openai-compatible</C>: el servidor del centro habla el mismo «idioma» que la API de OpenAI.</>,
            <><C>{'"env": ["CENTRO_IA_KEY"]'}</C>: la clave sale de esa variable de entorno, así no está en ningún fichero que pueda acabar en git.</>,
            <><C>{"{env:CENTRO_IA_URL}"}</C>: la dirección del servidor, leída de otra variable.</>,
            <><C>limit</C>: cuánto contexto y salida admite el modelo. Sin esto OpenCode no sabe cuándo resumir la conversación.</>,
            <><C>{'"tools": true'}</C>: el modelo sabe usar herramientas. Sin eso no hay agente, solo chat.</>,
            <><C>{'"model"'}</C>: el modelo que usa por defecto, en formato <C>proveedor/modelo</C>.</>,
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

      <Bloque
        titulo="Define las variables de entorno"
        nivel={3}
        entradilla={
          <>
            La dirección (termina en <C>/v1</C>) y la clave te las da el profesor en clase o en el aula virtual: sustituye los{" "}
            <C>…</C>. <b>No las publiques</b> en el repo, en el README ni en ningún chat.
          </>
        }
      >
        <P grande className="mb-4">
          Antes, descarga el <b>certificado del centro</b> (<C>ca-ies-simarro.crt</C>) desde la página «Certificado del centro»
          de la plataforma y déjalo en tu carpeta personal. El servidor va por https con un certificado del propio instituto: la
          tercera variable le dice a OpenCode que se fíe de él.
        </P>
        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
          <Codigo code={VARIABLES_SH} etiqueta="bash · Linux, macOS y WSL" />
          <Codigo code={VARIABLES_PS} etiqueta="PowerShell · Windows" />
        </div>
        <P grande className="mt-4">
          Y después, <b>abre una terminal nueva</b>: las variables solo existen en las terminales que se abren después (con{" "}
          <C>setx</C>, reinicia también VS Code).
        </P>
      </Bloque>

      <Bloque titulo="Comprueba que todo encaja" nivel={3} entradilla="En una terminal nueva:">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <Terminal
            lineas={[
              { o: "opencode models", c: "# entre ellos, el del centro" },
              { s: "centro/qwen3.8-flash-next", tono: "ok" },
              { o: 'opencode run "Responde solo: hola"', c: "# prueba real" },
              { s: "> build · qwen3.8-flash-next" },
              { s: "Hola", tono: "ok" },
            ]}
          />
          <Tarjeta titulo="Si se queda reintentando" nivel={4} tono="ambar">
            <p>
              Sal con <b>Ctrl+C</b>: el servidor no contesta. Revisa la URL, el certificado y que estás en la red del centro, y
              mira <a className={cls.enlace} href="#atascos">Si te atascas</a>.
            </p>
          </Tarjeta>
        </div>
      </Bloque>

      <Aviso titulo="Semipresencial: conectarte desde casa" tono="azul">
        <p>
          Desde casa, cómo llegar al servidor del centro lo explica el profesor en la <b>tutoría colectiva de arranque</b>.
        </p>
        <p>
          Hasta entonces, deja hecha la instalación y la config: si <C>opencode models</C> ya lista el modelo del centro, la
          parte que depende de ti está bien.
        </p>
      </Aviso>

      {/* ───────────── PASO 4 ───────────── */}
      <Paso
        id="paso-4"
        n={4}
        titulo="Crea el proyecto y haz el primer commit"
        entradilla={
          <>
            <Tiempo>35 min</Tiempo>
            El esqueleto lo haces <b>tú</b>, sin agente: son cuatro órdenes y así sabes qué hay en tu repo antes de dejar entrar a
            nadie. Ve a la carpeta donde guardas tus proyectos (no dentro de <C>pruebas-tareas</C> ni del repo de la web de marca):
          </>
        }
      >
        <Codigo code={INIT} />
      </Paso>

      <Bloque titulo="Anatomía de uv init" nivel={3}>
        <Anatomia
          etiqueta="Anatomía de la orden uv init --package --name tareas --python 3.12 cli-tareas"
          partes={[
            { texto: "uv init", nombre: "proyecto nuevo", tono: "azul" },
            { texto: "--package", nombre: "instalable (src/)", tono: "morado" },
            { texto: "--name tareas", nombre: "nombre del paquete", tono: "verde" },
            { texto: "--python 3.12", nombre: "Python mínimo", tono: "ambar" },
            { texto: "cli-tareas", nombre: "carpeta y repo", tono: "rosa" },
          ]}
        />
        <Lista
          className={`mt-5 text-lg ${cls.texto}`}
          items={[
            <><C>--package</C>: estructura de paquete instalable (carpeta <C>src/</C>). Es lo que permite convertirlo en un comando.</>,
            <><C>--name tareas</C>: sin esto, uv lo llamaría <C>cli_tareas</C> (el nombre de la carpeta con guion bajo).</>,
            <><C>uv add typer</C>: añade Typer, la librería para hacer CLIs (trae Rich, la de colores y tablas), y crea el entorno virtual <C>.venv/</C>.</>,
          ]}
        />
      </Bloque>

      <Bloque titulo="Antes y después de uv init" nivel={3}>
        <AntesDespues
          orden="uv init … cli-tareas + uv add typer"
          antes={{
            titulo: "Antes de uv init",
            raiz: "~/",
            nodos: [
              { nombre: "Descargas/", nivel: 0, carpeta: true },
              { nombre: "pruebas-tareas/", nivel: 0, carpeta: true },
            ],
          }}
          despues={{
            titulo: "Después de uv init",
            raiz: "~/",
            nodos: [
              { nombre: "Descargas/", nivel: 0, carpeta: true },
              { nombre: "pruebas-tareas/", nivel: 0, carpeta: true },
              { nombre: "cli-tareas/", nivel: 0, carpeta: true, tono: "verde" },
              { nombre: ".git/", nivel: 1, carpeta: true },
              { nombre: ".venv/", nivel: 1, carpeta: true, nota: "no va al repo" },
              { nombre: "src/", nivel: 1, carpeta: true },
              { nombre: "tareas/", nivel: 2, carpeta: true },
              { nombre: "__init__.py", nivel: 3 },
              { nombre: ".gitignore", nivel: 1 },
              { nombre: ".python-version", nivel: 1 },
              { nombre: "README.md", nivel: 1 },
              { nombre: "pyproject.toml", nivel: 1 },
              { nombre: "uv.lock", nivel: 1 },
            ],
          }}
        />
      </Bloque>

      <Bloque titulo="Qué es cada fichero" nivel={3}>
        <Tabla cab={["Fichero / carpeta", "Qué es", "¿Al repo?"]} filas={FICHEROS_UV.map(([f, q, r]) => [<C key="f">{f}</C>, q, r])} />
      </Bloque>

      <Bloque
        titulo="Primer ajuste: pyproject.toml"
        nivel={3}
        anchoJunto={600}
        junto={<Codigo code={PYPROJECT} kind="toml" etiqueta="pyproject.toml" />}
        entradilla={
          <>
            Abre la carpeta en tu editor (en casa, <C>code .</C> abre VS Code aquí) y cambia la línea de{" "}
            <C>[project.scripts]</C>.
          </>
        }
      >
        <div className="space-y-4">
          <P grande>
            Ese bloque dice «cuando instalen esto, crea un comando <C>tareas</C> que ejecute el objeto <C>app</C> del módulo{" "}
            <C>tareas/cli.py</C>».
          </P>
          <P grande>Rellena también la descripción.</P>
        </div>
      </Bloque>

      <Bloque
        titulo="Segundo ajuste: __init__.py"
        nivel={3}
        entradilla={
          <>
            Sustituye el contenido de <C>src/tareas/__init__.py</C> (uv pone una función <C>main</C> de ejemplo que ya no
            usaremos) por solo la versión:
          </>
        }
      >
        <Codigo code={INIT_PY} kind="py" etiqueta="src/tareas/__init__.py" />
        <P grande className="mt-4 mb-3">
          Todavía no funciona <C>uv run tareas</C>: falta <C>cli.py</C>, que construirá el agente en el paso 6. Si lo pruebas
          ahora verás este error, y es normal:
        </P>
        <Terminal
          lineas={[
            { o: "uv run tareas" },
            { s: "…" },
            { s: "ModuleNotFoundError: No module named 'tareas.cli'", tono: "error" },
          ]}
        />
      </Bloque>

      <Bloque
        titulo=".gitignore y .gitattributes antes de nada"
        nivel={3}
        anchoJunto={600}
        junto={<Codigo code={GITIGNORE} kind="toml" etiqueta=".gitignore" />}
        entradilla={
          <>
            <b>Antes</b> del primer commit decides qué no entra nunca en el repo: un secreto que llega a un commit se queda en el
            historial aunque lo borres, y en la semana 3 tendrás una clave en <C>.env</C>. Sustituye el <C>.gitignore</C> de uv
            por este (el suyo no incluye <C>.env</C>).
          </>
        }
      >
        <div className="space-y-3">
          <P>
            Y crea <C>.gitattributes</C> con una sola línea: Git guarda los saltos de línea igual venga el fichero de Windows
            (CRLF) o de Linux/macOS (LF). Sin ella, un compañero con Windows te cambiaría todas las líneas en un solo commit.
          </P>
          <Codigo code={GITATTRIBUTES} kind="toml" etiqueta=".gitattributes" />
        </div>
      </Bloque>

      <Bloque titulo="Qué entra en el repo y qué no" nivel={3}>
        <QueVaAlRepo />
      </Bloque>

      <Bloque
        titulo="Primer commit, antes de abrir OpenCode"
        nivel={3}
        entradilla={
          <>
            ¿Por qué ahora? El <C>/undo</C> de OpenCode usa instantáneas internas y solo necesita que la carpeta sea un
            repositorio git (uv ya hizo <C>git init</C>). El commit es para ti: deja guardado lo que hiciste a mano antes de dejar
            entrar al agente, y con <C>git diff</C> verás exactamente qué cambia él.
          </>
        }
      >
        <Codigo code={GIT_PRIMERO} />
        <P className="mt-4">
          Añadimos los ficheros <b>por su nombre</b> y no con <C>git add .</C> a ciegas: así ves qué entra. Si en el{" "}
          <C>git status</C> aparece <C>.venv</C> o <C>.env</C>, para: tu <C>.gitignore</C> no está bien guardado. ¿Git te
          pregunta quién eres? Repasa la{" "}
          <Link href="/programacion-ia/sesion-02/#configuracion" className={cls.enlace}>
            configuración global de la sesión 2 de la web de marca
          </Link>
          .
        </P>
      </Bloque>

      <Bloque titulo="Sube el repo a GitHub (público)" nivel={3}>
        <Codigo code={GH_PUSH} />
        <P grande className="mt-4">
          Si al hacer push te pide usuario y contraseña, la contraseña es un <b>token</b>, no la de tu cuenta: lo tienes en{" "}
          <Link href="/programacion-ia/sesion-02/#autenticacion" className={cls.enlace}>
            «Usuario y contraseña: qué escribir exactamente»
          </Link>
          . Abre tu repo en el navegador: se ven <C>src/</C>, <C>pyproject.toml</C> y <C>.gitignore</C>, y <b>no</b> se ve{" "}
          <C>.venv</C>.
        </P>
      </Bloque>

      {/* ───────────── PASO 5 ───────────── */}
      <Paso
        id="paso-5"
        n={5}
        titulo="Prepara a tu agente"
        entradilla={
          <>
            <Tiempo>35 min</Tiempo>
            Un <b>chat</b> solo genera texto y tú copias y pegas. Un <b>agente</b> además lee tus ficheros, los edita y ejecuta
            órdenes en tu terminal. Por eso, antes de dejarlo trabajar, decides <b>qué puede hacer solo, qué te tiene que
            preguntar y qué tiene prohibido</b>. Va en un <C>opencode.json</C> en la raíz de <C>cli-tareas</C>, que sí se sube al
            repo (no lleva ninguna clave).
          </>
        }
      >
        <QuePuedeHacer />
      </Paso>

      <TrozoConfig titulo="opencode.json · 1 · ficheros" parte={1} rango={[1, 10]} reglas={REGLAS_FICHEROS} />
      <TrozoConfig titulo="opencode.json · 2 · órdenes" parte={2} rango={[11, 22]} reglas={REGLAS_ORDENES} />
      <TrozoConfig titulo="opencode.json · 3 · lo que nunca hará" parte={3} rango={[23, 33]} reglas={REGLAS_NUNCA} />

      <Aviso titulo="Gana la última regla que coincide" tono="ambar" icono={<IconoPermiso tipo="ask" tam={36} />}>
        <p>
          Por eso <C>shell · * → ask</C> va primero (regla general) y las excepciones después. Si pusieras un{" "}
          <C>* → allow</C> debajo, lo permitiría todo. Lo que no debe pasar nunca va en <b>policies</b>: se aplican al final y
          solo pueden negar.
        </p>
        <p>
          Y nunca arranques OpenCode con <C>--auto</C>: aprueba solo todo lo que no esté denegado. En el curso está prohibido. El
          detalle, en la{" "}
          <Link href="/programacion-ia/opencode/#permisos" className={cls.enlace}>
            guía de OpenCode
          </Link>
          .
        </p>
      </Aviso>

      <Bloque
        titulo="Abre OpenCode en tu proyecto"
        nivel={3}
        entradilla={
          <>
            Trabaja con <b>dos terminales</b>: una con OpenCode y otra para ti (git, pruebas). En VS Code, el botón <C>+</C> o
            «dividir» de la terminal; en el aula, otra pestaña.
          </>
        }
      >
        <div className="max-w-2xl">
          <Codigo code={ABRIR_OC} />
        </div>
        <P grande className="mt-4">
          Lo que ves es una <b>TUI</b> (interfaz de texto): un programa de terminal con ventanas y atajos. La herramienta con la
          que vas a programar tu CLI es… otra CLI. Fíjate en cómo está hecha: es lo que estás aprendiendo a construir.
        </P>
      </Bloque>

      <Bloque titulo="Teclas y comandos de OpenCode" nivel={3}>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-2 lg:grid-cols-2">
          {TECLAS_OC.map((t) => (
            <li
              key={t.teclas ?? t.texto}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-3 gap-y-1 border-b border-zinc-200 pb-2 dark:border-white/10 sm:grid-cols-[7.5rem_5.5rem_minmax(0,1fr)]"
            >
              {t.teclas ? <Teclas combo={t.teclas} /> : <code className="font-mono text-base font-bold text-zinc-900 dark:text-zinc-50">{t.texto}</code>}
              <code className="font-mono text-base font-bold text-blue-700 dark:text-blue-300">{t.comando ?? ""}</code>
              <span className={`col-span-2 sm:col-span-1 ${cls.texto}`}>{t.que}</span>
            </li>
          ))}
        </ul>
      </Bloque>

      <Bloque
        titulo="/init: el AGENTS.md del proyecto"
        nivel={3}
        entradilla={
          <>
            <C>AGENTS.md</C> es un fichero en la raíz con las <b>normas de tu proyecto para el agente</b>: con qué está hecho,
            cómo se ejecuta y qué no debe hacer nunca. OpenCode lo lee al empezar cada sesión, así no tienes que repetirlo en cada
            mensaje. Escribe en OpenCode (agente build):
          </>
        }
      >
        <div className="max-w-md">
          <Prompt text="/init" etiqueta="En la caja de OpenCode" />
        </div>
        <P grande className="mt-4">
          <C>/init</C> te guía: analiza el repo, puede hacerte alguna pregunta y te propone un <C>AGENTS.md</C>. Como tienes{" "}
          <C>edit · * → ask</C>, te enseña el fichero antes de escribirlo: léelo y acéptalo. Después <b>edítalo tú</b> hasta que
          diga lo de la pantalla siguiente (o algo muy parecido); si <C>/init</C> no lo genera bien, créalo tú con esa plantilla.
        </P>
      </Bloque>

      <Bloque
        titulo="Tu AGENTS.md, revisado por ti"
        nivel={3}
        anchoJunto={600}
        junto={<Codigo code={AGENTS_MD} kind="md" etiqueta="cli-tareas/AGENTS.md" />}
        entradilla={
          <>
            Cada línea tiene un motivo: la de <C>~/pruebas-tareas</C> protege tus ficheros reales, la de <C>.env</C> tus claves y
            la de «explica antes de cambiar» te da tiempo a decir que no.
          </>
        }
      >
        <div className="space-y-3">
          <P>
            Si cambias <C>opencode.json</C> con OpenCode abierto, puede seguir con la config anterior: <C>opencode reload</C>, o
            sal y vuelve a abrirlo. En tu otra terminal, el commit de la configuración del agente:
          </P>
          <Codigo code={COMMIT_AGENTE} />
        </div>
      </Bloque>

      {/* ───────────── PASO 6 ───────────── */}
      <Paso
        id="paso-6"
        n={6}
        titulo="Tu primera orden, de forma agéntica"
        entradilla={
          <>
            <Tiempo>75 min</Tiempo>
            Así trabajaremos todo el curso: <b>tú decides</b>, el agente propone, <b>tú corriges el plan</b>, el agente
            implementa, <b>tú apruebas cada cambio</b>, <b>tú pruebas</b> y <b>tú commiteas</b>. El agente no decide qué hace tu
            herramienta.
          </>
        }
      >
        <FlujoCarriles />
      </Paso>

      <Bloque
        titulo="Tu spec: lo que te hace perder tiempo"
        etiqueta="El hilo del proyecto"
        nivel={3}
        anchoJunto={700}
        junto={<Codigo code={SPEC} kind="md" etiqueta="README.md · tu spec (15 min, sin IA)" />}
        entradilla={
          <>
            Copia esta plantilla en tu <C>README.md</C> y rellena los huecos <b>tú</b>. Piensa en una tarea real que te aburra:
            es lo que leerá el agente para saber qué construir.
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {["ordenar Descargas", "renombrar fotos del móvil", "limpiar temporales", "organizar apuntes por asignatura"].map((x) => (
              <Chip key={x} tono="verde">
                {x}
              </Chip>
            ))}
          </div>
          <P>Y guárdala en tu historial:</P>
          <Codigo code={COMMIT_SPEC} />
        </div>
      </Bloque>

      <Bloque titulo="plan frente a build" nivel={3}>
        <DosColumnas
          nivel={4}
          a={{
            antetitulo: "para pensar",
            titulo: "plan",
            tono: "morado",
            puntos: [
              "Te cuenta cómo lo haría y lo corriges antes de que escriba nada.",
              <>No puede tocar ningún fichero: lo dice tu <C>opencode.json</C>. Puedes pedirle ideas sin miedo.</>,
              "Sus órdenes siguen tus reglas: rm o git push siguen bloqueadas.",
            ],
          }}
          b={{
            antetitulo: "para hacer",
            titulo: "build",
            tono: "azul",
            puntos: [
              "Crea y edita ficheros y ejecuta órdenes.",
              <>Cada edición y cada orden que no está en tu lista <C>allow</C> se para y te pregunta.</>,
              "Es el agente con el que se abre OpenCode.",
            ],
          }}
        />
        <p className={`mt-4 flex flex-wrap items-center gap-2 text-lg ${cls.texto}`}>
          <Teclas combo="shift+tab" /> cambia de uno a otro: míralo abajo, junto al modelo.
        </p>
      </Bloque>

      <Bloque
        titulo="El agente plan te cuenta cómo lo haría"
        nivel={3}
        entradilla={
          <>
            Pulsa <Teclas combo="shift+tab" /> hasta que abajo ponga <b>plan</b> y envía:
          </>
        }
      >
        <Prompt text={PROMPT_PLAN} etiqueta="Prompt · agente plan" />
      </Bloque>

      <Bloque
        titulo="Lee el plan buscando esto"
        nivel={3}
        entradilla={
          <>
            El prompt es corto porque el agente <b>lee</b> tu repo: con <C>@README.md</C> y <C>@pyproject.toml</C> ya tiene el
            contexto. Lo que no puede faltar es el <b>criterio de aceptación</b>: cómo sabrás tú que está bien.
          </>
        }
      >
        <Checklist
          items={[
            { texto: <>¿Toca solo cli.py y __main__.py?</>, detalle: "Si quiere cambiar más ficheros, pregunta por qué." },
            { texto: "¿Añade dependencias nuevas?", detalle: "No hacen falta: Typer ya trae Rich." },
            {
              texto: <>¿Usa pathlib y expanduser()?</>,
              detalle: "¿Dice qué hace con la carpeta inexistente, la vacía y los corchetes?",
            },
            { texto: "¿Hay algo que no entiendes?", detalle: "Pregúntalo ahora, antes de que escriba código." },
          ]}
        />
        <P className="mt-5 mb-2">Corrige el plan con un mensaje corto, por ejemplo:</P>
        <Prompt text={PROMPT_CORRIGE} etiqueta="Prompt · agente plan" />
      </Bloque>

      <Bloque
        titulo="build lo hace; tú apruebas cada cambio"
        nivel={3}
        entradilla={
          <>
            Pulsa <Teclas combo="shift+tab" /> para volver a <b>build</b> y envía:
          </>
        }
      >
        <Prompt text={PROMPT_BUILD} etiqueta="Prompt · agente build" />
        <P className="mt-4 mb-3">
          Cada vez que quiera escribir un fichero o ejecutar una orden que no está en tu lista de <C>allow</C>, <b>se para y te
          pregunta</b>. Puedes contestar:
        </P>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {RESPUESTAS.map((r) => (
            <div key={r.tipo} className={`rounded-2xl border p-4 ${TONO[r.tono].caja}`}>
              <h4 className={`font-mono text-2xl font-extrabold ${TONO[r.tono].tinta}`}>{r.tipo}</h4>
              <p className={`mt-1 text-base font-semibold ${TONO[r.tono].tinta}`}>{r.que}</p>
              <p className={`mt-1 text-base ${TONO[r.tono].tinta}`}>{r.cuando}</p>
            </div>
          ))}
        </div>
      </Bloque>

      <Bloque titulo="Qué mirar en cada diff" nivel={3} entradilla="Líneas en verde: se añaden; en rojo: se quitan.">
        <Checklist
          items={[
            {
              texto: "¿Es el fichero que esperabas?",
              detalle: <>¿Toca algo fuera de <C>src/tareas/</C>? Ojo especial con <C>pyproject.toml</C> y <C>uv.lock</C>.</>,
            },
            { texto: "¿Borra algo tuyo?", detalle: "Líneas en rojo que no esperabas." },
            {
              texto: "¿Rutas escritas a mano o shell=True?",
              detalle: <>Rutas con <C>&quot;/&quot;</C> o <C>{'"\\"'}</C>, <C>os.system</C>, <C>subprocess</C> o <C>shell=True</C>: rechaza y pide <C>pathlib</C>.</>,
            },
            { texto: "¿Mensajes en español y errores por stderr?", detalle: "Los mensajes al usuario, en español; los errores, por la salida de errores." },
            {
              texto: "¿Te pide ejecutar una orden?",
              detalle: <>Léela entera. ¿Sabes qué hace? ¿Toca algo fuera de <C>cli-tareas</C>? Si no lo tienes claro, <b>reject</b> y pregunta.</>,
            },
          ]}
        />
      </Bloque>

      <Bloque
        titulo="Pruébalo sin salir de OpenCode"
        nivel={3}
        entradilla={
          <>
            Que el agente diga «hecho» no significa que funcione. Escribe en la caja, <b>una a una</b>: con <C>!</C> delante, la
            orden se ejecuta en tu proyecto y la salida le llega también al agente (<b>Esc</b> para salir del modo shell).
          </>
        }
      >
        <div className="max-w-3xl">
          <Prompt text={PROBAR_EN_OC} etiqueta="Modo shell de OpenCode · una a una" />
        </div>
      </Bloque>

      <Bloque titulo="La batería completa, en tu otra terminal" nivel={3}>
        <div className="space-y-4">
          <Codigo code={PROBAR_BASH} etiqueta="bash · Linux y macOS" />
          <Codigo code={PROBAR_PS} etiqueta="PowerShell · Windows" />
        </div>
      </Bloque>

      <Bloque
        titulo="Códigos de salida"
        nivel={3}
        entradilla={
          <>
            <C>echo $?</C> (bash) y <C>$LASTEXITCODE</C> (PowerShell) muestran el <b>código de salida</b> de la última orden: 0 si
            fue bien y otro número si falló. Los scripts y GitHub Actions deciden con él si algo ha funcionado, así que tu
            herramienta debe devolver el correcto. Nuestro convenio:
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Terminal
            titulo="Con el cli.py de referencia"
            lineas={[
              { o: "uv run tareas version" },
              { s: "tareas 0.1.0", tono: "ok" },
              { o: "uv run tareas listar /no/existe; echo $?" },
              { s: "Error: «/no/existe» no existe o no es una carpeta.", tono: "error" },
              { s: "1" },
            ]}
          />
          <div className="grid grid-cols-2 gap-3">
            {CODIGOS.map(([n, t, tono]) => (
              <div key={n} className={`rounded-2xl border p-3 ${TONO[tono].caja}`}>
                <p className={`font-mono text-3xl font-extrabold ${TONO[tono].tinta}`}>{n}</p>
                <p className={`text-base font-semibold ${TONO[tono].tinta}`}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </Bloque>

      <Bloque titulo="Si algo sale mal: /undo o explícale el fallo" nivel={3}>
        <DosColumnas
          nivel={4}
          centro="o"
          a={{
            antetitulo: "lo ha estropeado",
            titulo: "Deshaz con /undo",
            tono: "verde",
            puntos: [
              <><b>Esc</b> si aún está trabajando, y luego <C>/undo</C> (o <Teclas combo="ctrl+x u" />).</>,
              "Tus ficheros vuelven a como estaban antes de ese mensaje; reformula y vuelve a intentarlo.",
            ],
          }}
          b={{
            antetitulo: "falla un caso",
            titulo: "Explícale el fallo",
            tono: "azul",
            puntos: [
              "No lo arregles a ciegas ni le digas «no funciona».",
              "Dale la orden, lo que sale y lo que esperabas, con el fichero (pantalla siguiente).",
            ],
          }}
        />
        <P grande className="mt-4">
          <C>/undo</C> deshace ficheros, pero <b>no</b> lo que ya salió de tu equipo (un <C>git push</C>) ni lo que instaló. Por
          eso el push lo tiene prohibido y lo haces tú.
        </P>
      </Bloque>

      <Bloque
        titulo="Explícale el fallo con datos"
        nivel={3}
        entradilla="Primero ejecuta en modo shell la orden que falla, para que el agente vea la salida; después, en un mensaje aparte, lo que esperabas:"
      >
        <div className="space-y-4">
          <Prompt text={FALLO_ORDEN} etiqueta="1 · Modo shell de OpenCode" />
          <Prompt text={FALLO_PROMPT} etiqueta="2 · Prompt · agente build" />
        </div>
      </Bloque>

      <Bloque
        titulo="Audita contra el código de referencia"
        nivel={3}
        entradilla={
          <>
            No hace falta que tu <C>cli.py</C> sea idéntico, pero debe hacer lo mismo. Compáralo trozo a trozo: si al tuyo le falta
            algo, pregúntale al agente en <b>plan</b> por qué no lo puso y decide tú.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Tarjeta titulo="Busca en el tuyo" nivel={4} tono="azul">
            <Lista
              items={[
                <><C>escape</C>: los nombres con corchetes salen enteros.</>,
                <><C>typer.Exit(code=1)</C>: el error, sin traza.</>,
                <><C>expanduser()</C>: entiende <C>~</C>.</>,
              ]}
            />
          </Tarjeta>
          <div className="space-y-3">
            <Codigo code={MAIN_PY} kind="py" etiqueta="src/tareas/__main__.py" />
            <P>
              Por este fichero también funciona <C>uv run python -m tareas</C>.
            </P>
          </div>
        </div>
      </Bloque>

      <TrozoCli titulo="cli.py · 1 · la app y las consolas" rango={[1, 20]}>
        <P grande>
          <C>app = typer.Typer(…)</C> es tu programa: <C>no_args_is_help</C> enseña la ayuda si no escribes nada y{" "}
          <C>add_completion=False</C> quita el autocompletado.
        </P>
        <P grande>
          El error va a <C>Console(stderr=True)</C>: la salida de errores, separada de la normal. Así otro programa puede
          distinguir resultado y error.
        </P>
      </TrozoCli>

      <TrozoCli titulo="cli.py · 2 · tamaño legible y version" rango={[23, 40]}>
        <P grande>
          <C>@app.command()</C> convierte una función en una orden. El docstring (<C>&quot;&quot;&quot;...&quot;&quot;&quot;</C>) es lo que
          sale en <C>--help</C>.
        </P>
        <P grande>
          <C>tamano_legible</C> pasa los bytes a texto: 532 B, 1.2 KB, 3.4 MB…
        </P>
      </TrozoCli>

      <TrozoCli titulo="cli.py · 3 · listar y sus errores" rango={[42, 59]}>
        <P grande>
          El argumento <C>carpeta</C> tiene tipo <C>Path</C>: Typer convierte lo que escribes en una ruta de <C>pathlib</C>, que
          funciona igual en Linux, Windows y macOS.
        </P>
        <P grande>
          <C>raise typer.Exit(code=1)</C> termina el programa con código 1 sin soltar una traza de Python al usuario.
        </P>
      </TrozoCli>

      <TrozoCli titulo="cli.py · 4 · la tabla" rango={[61, 78]}>
        <P grande>
          <C>escape(ruta.name)</C>: <C>[borrador].pdf</C> sale entero, con sus corchetes.
        </P>
        <P grande>
          <C>try</C> / <C>except OSError</C>: un enlace roto o un fichero sin permisos se salta sin romper la tabla.
        </P>
      </TrozoCli>

      {/* ───────────── PASO 7 ───────────── */}
      <Paso
        id="paso-7"
        n={7}
        titulo="Instálala como comando de verdad"
        entradilla={
          <>
            <Tiempo>15 min</Tiempo>
            <C>uv run tareas</C> solo funciona dentro de la carpeta del proyecto. Para que <C>tareas</C> funcione en cualquier
            sitio, como <C>git</C>, <C>ls</C> u <C>opencode</C>, instálala (en tu terminal, no se lo pidas al agente).
          </>
        }
      >
        <ComandoInstalado />
      </Paso>

      <Bloque titulo="Instala tu comando" nivel={3}>
        <Codigo code={INSTALAR} />
        <P grande className="mt-4">
          <C>uv tool install</C> crea un entorno aislado para tu herramienta y deja un ejecutable <C>tareas</C> en la carpeta de
          comandos de uv (<C>~/.local/bin</C> en Linux y macOS). <C>--editable</C> apunta a tu código: cuando cambies{" "}
          <C>cli.py</C>, el comando instalado cambia también. Solo hay que reinstalar si tocas <C>pyproject.toml</C>:{" "}
          <C>uv tool install --editable . --force</C>.
        </P>
      </Bloque>

      <Bloque titulo="Si dice «orden no encontrada»" nivel={3} entradilla="Esa carpeta no está en tu PATH (¿te suena?):">
        <Codigo code={INSTALAR_PATH} />
        <P grande className="mt-4 mb-3">
          Para quitarla (por ejemplo, para probar la instalación desde cero como hará quien use tu repo):
        </P>
        <div className="max-w-xl">
          <Codigo code={DESINSTALAR} />
        </div>
      </Bloque>

      {/* ───────────── PASO 8 ───────────── */}
      <Paso
        id="paso-8"
        n={8}
        titulo="Audita y commitea tú"
        entradilla={
          <>
            <Tiempo>30 min</Tiempo>
            «Lo que no sabes explicar, no lo entregas». Aprobar los diffs no basta: antes del commit, repasa esta lista. Si algo
            falla, pídele el arreglo al agente, pero entiende qué ha cambiado.
          </>
        }
      >
        <Checklist
          items={[
            {
              texto: <>¿Entiendo cada línea de cli.py?</>,
              detalle: <>Si hay una que no, pregúntale en <b>plan</b>: «explícame la línea N de @src/tareas/cli.py como si fuera mi primer año».</>,
            },
            {
              texto: "¿Funciona en Windows?",
              detalle: (
                <>
                  Busca barras escritas a mano en rutas (<C>&quot;/&quot;</C>), <C>os.system</C>, <C>shell=True</C> o ficheros sin{" "}
                  <C>encoding=&quot;utf-8&quot;</C>. Si no tienes Windows, pide a alguien que lo pruebe.
                </>
              ),
            },
            { texto: <>¿tareas --help se entiende sin leer el código?</>, detalle: "¿Está en español?" },
            {
              texto: "¿Dependencias u órdenes que no pediste?",
              detalle: <>Mira <C>git diff pyproject.toml</C> y <C>git status</C>.</>,
            },
          ]}
        />
      </Paso>

      <Bloque titulo="Prueba los casos feos" nivel={3}>
        <Checklist
          items={[
            { texto: "¿Una carpeta vacía?", detalle: <C>mkdir ~/pruebas-tareas/vacia && tareas listar ~/pruebas-tareas/vacia</C> },
            {
              texto: "¿Una ruta con espacios?",
              detalle: (
                <>
                  <C>tareas listar &quot;~/pruebas-tareas/carpeta con espacios&quot;</C> (créala antes). Entre comillas, <C>~</C> no lo
                  expande la terminal: lo hace tu código con <C>expanduser()</C>.
                </>
              ),
            },
            { texto: "¿Un fichero en vez de carpeta?", detalle: <><C>tareas listar ~/pruebas-tareas/contrato.docx; echo $?</C> → mensaje y 1.</> },
            {
              texto: "¿Un nombre con corchetes?",
              detalle: <><C>touch ~/pruebas-tareas/&quot;[borrador].pdf&quot;</C> y lístalo: el nombre tiene que salir entero.</>,
            },
          ]}
        />
      </Bloque>

      <Bloque
        titulo="El mensaje lo propone el agente"
        nivel={3}
        entradilla={
          <>
            Tiene prohibido el push, los commits te los tiene que preguntar y tu <C>AGENTS.md</C> le dice que no los haga. Pídele
            solo el texto:
          </>
        }
      >
        <Prompt text={PROMPT_MENSAJE} etiqueta="Prompt · agente build" />
        <div className="mt-4">
          <CicloCommit />
        </div>
      </Bloque>

      <Bloque
        titulo="Tus commits, en tu terminal"
        nivel={3}
        entradilla={
          <>
            Léelo, cámbialo si no cuenta bien lo que hiciste, y commitea tú. Un commit = un paso con sentido: el mensaje dice{" "}
            <b>qué cambia y para qué</b>, en imperativo, como si terminara la frase «Este commit...».
          </>
        }
      >
        <Codigo code={COMMITS} />
      </Bloque>

      <Bloque titulo="Mensajes de commit: mal y bien" nivel={3}>
        <Tabla
          cab={["❌ Mensajes que no cuentan nada", "✅ Mensajes que cuentan el proceso"]}
          filas={MENSAJES.map(([mal, bien]) => [<C key="m">{mal}</C>, <C key="b">{bien}</C>])}
        />
      </Bloque>

      <Bloque
        titulo="Guarda tus prompts en docs/prompts.md"
        nivel={3}
        entradilla={
          <>
            Apunta los prompts clave con lo que corregiste tú: es tu cuaderno de bitácora y una parte de la nota de proceso.
            Demuestra que dirigiste al agente, no al revés. ¿La conversación entera? <C>/export</C> (<Teclas combo="ctrl+x x" />) la
            lleva a tu editor: guárdala en <C>docs/</C> y revisa que no tenga ninguna clave.
          </>
        }
      >
        <Codigo code={PROMPTS_MD} kind="md" etiqueta="docs/prompts.md" />
      </Bloque>

      <Bloque
        titulo="Tus cinco commits de la semana"
        nivel={3}
        entradilla={
          <>
            <b>Una sesión por tarea:</b> cuando termines algo y lo commitees, <C>/new</C> para empezar limpio la siguiente. Las
            conversaciones largas confunden al modelo; si una se alarga, <C>/compact</C>.
          </>
        }
      >
        <CommitsSemana />
      </Bloque>

      {/* ───────────── CHECKLIST FINAL ───────────── */}
      <Bloque id="final" titulo="Checklist de la semana" entradilla="El producto de la semana, punto por punto.">
        <EntregaSemana />
      </Bloque>

      <Bloque titulo="Checklist: instalación y proyecto" nivel={3}>
        <Checklist items={CHECK_A.map((texto) => ({ texto }))} />
      </Bloque>

      <Bloque titulo="Checklist: tu comando y tu repo" nivel={3}>
        <Checklist items={CHECK_B.map((texto) => ({ texto }))} />
      </Bloque>

      {/* ───────────── ATASCOS ───────────── */}
      <Bloque
        id="atascos"
        titulo="Si te atascas"
        entradilla={
          <>
            Antes de pedir ayuda, <b>lee el mensaje de error entero</b>: casi siempre dice qué pasa. Si no lo entiendes, pégalo en
            el chat con la orden que escribiste y tu sistema operativo (sin claves).
          </>
        }
      >
        <PedirAyuda />
      </Bloque>

      {ATASCOS.map((g) => (
        <Bloque key={g.titulo} titulo={g.titulo} nivel={3}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {g.items.map(([s, c, sol], i) => (
              <div key={i} className={`${cls.tarjeta} min-w-0 !p-4`}>
                <h4 className="text-lg font-bold text-zinc-900 [overflow-wrap:anywhere] dark:text-zinc-50">{s}</h4>
                <dl className="mt-2 space-y-1">
                  <div>
                    <dt className="text-base font-bold text-amber-700 dark:text-amber-300">Qué pasa</dt>
                    <dd className={cls.texto}>{c}</dd>
                  </div>
                  <div>
                    <dt className="text-base font-bold text-emerald-700 dark:text-emerald-300">Arreglo</dt>
                    <dd className={cls.texto}>{sol}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </Bloque>
      ))}

      {/* ───────────── SIGUIENTE ───────────── */}
      <Bloque
        titulo="La semana que viene"
        etiqueta="2-6 nov"
        entradilla={
          <>
            Tu herramienta deja de listar y empieza a <b>hacer</b>: describes tus acciones en <C>acciones.json</C> (mover,
            renombrar, borrar...) y el motor que las ejecuta, siempre con <C>--simular</C> primero. Trae pensadas tus 3 acciones del
            punto 6 de la spec.
          </>
        }
      >
        <SiguienteSemana />
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/programacion-ia/cli/sesion-02/" className="rounded-xl bg-blue-700 px-4 py-2 text-base font-bold text-white hover:bg-blue-800">
            Sesión 2 · Acciones predefinidas →
          </Link>
          <Link
            href="/programacion-ia/opencode/"
            className="rounded-xl border border-zinc-300 px-4 py-2 text-base font-bold text-zinc-800 hover:bg-zinc-100 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/10"
          >
            Guía de OpenCode
          </Link>
          <Link
            href="/programacion-ia/cli/"
            className="rounded-xl border border-zinc-300 px-4 py-2 text-base font-bold text-zinc-800 hover:bg-zinc-100 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/10"
          >
            Portada del proyecto CLI tareas
          </Link>
        </div>
      </Bloque>
    </div>
  );
}
