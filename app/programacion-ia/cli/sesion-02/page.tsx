import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { RUBRICA_CLI } from "@/lib/campus/rubricas";
import { NUEVA_ACCION_MD, REVISOR_MD, SKILL_MD } from "../../_opencode/ficheros";
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
  CriterioRubrica,
  DosColumnas,
  LineaTiempo,
  Paso,
  Prompt,
  Regla,
  TONO,
  Tarjeta,
  Teclas,
  Terminal,
  cls,
  type Hito,
  type LineaTerminal,
  type NodoArbol,
} from "../../_video/piezas";
import { QuienHace } from "../../opencode/figuras";
import {
  AnatomiaAccion,
  CargaSkill,
  CodigoFrenteJson,
  CommitsSemana,
  DondeEstas,
  EmbudoFiltro,
  Excepciones,
  Fabrica,
  PartesAdr,
  PesosRubrica,
  PuedeRevisor,
  RecorridoAccion,
  RecorridoComando,
  RepoFinal,
  SemanaPasos,
} from "./figuras";

export const metadata: Metadata = {
  title: "Sesión 2 · Acciones predefinidas: acciones.json y el motor — CLI tareas con IA",
  description:
    "Semana 2 (2-6 nov): diseñas acciones.json y, con OpenCode, creas una skill, un comando y un subagente revisor; el agente programa el motor y tú lo auditas.",
};

// Página para vídeo (docs/paginas-para-video.md): cada <Bloque>/<Paso> es una
// pantalla de 1100×620 como mucho. Los ficheros de código de referencia van
// enteros en sus constantes y se enseñan por trozos con `rango`; el botón
// copia siempre el fichero entero. Los ficheros de OpenCode (skill, comando y
// revisor) vienen de _opencode/ficheros.ts, los mismos que la guía.

/* ───────────── ficheros y salidas de referencia ───────────── */

const ESQUEMA = String.raw`{
  "version": 1,
  "acciones": [
    {
      "nombre": "ordenar-descargas",
      "descripcion": "Mueve los PDF y documentos de Descargas a Documentos/PDF",
      "tipo": "mover",
      "origen": "~/Descargas",
      "filtro": { "extensiones": [".pdf", ".docx"] },
      "destino": "~/Documentos/PDF"
    },
    {
      "nombre": "renombrar-fotos",
      "descripcion": "Renombra fotos con su fecha: 2026-10-26_001.jpg",
      "tipo": "renombrar",
      "filtro": { "extensiones": [".jpg", ".jpeg", ".png"] },
      "plantilla": "{fecha:%Y-%m-%d}_{n:03}{ext}"
    },
    {
      "nombre": "limpiar-temporales",
      "descripcion": "Borra .tmp con más de 30 días",
      "tipo": "borrar",
      "filtro": { "patron": ".*\\.tmp$", "mas_antiguo_que_dias": 30 },
      "confirmar": true
    }
  ]
}`;

const ERRORES_PY = String.raw`# src/tareas/errores.py
class TareasError(Exception):
    """Base de todos los errores previsibles de la herramienta."""
    codigo_salida = 1


class ConfigError(TareasError):
    """acciones.json no existe, no es JSON o no cumple el esquema."""
    codigo_salida = 3


class AccionNoValida(ConfigError):
    """Una acción concreta tiene un campo mal: dice cuál y por qué."""

    def __init__(self, accion: str, campo: str, motivo: str):
        super().__init__(f"Acción «{accion}», campo «{campo}»: {motivo}")
        self.accion = accion
        self.campo = campo`;

const CONFIG_PY = String.raw`# src/tareas/config.py (resumido)
import json
import re
from pathlib import Path

from .errores import AccionNoValida, ConfigError

TIPOS = {"mover", "copiar", "renombrar", "borrar"}
OBLIGATORIOS = ["nombre", "descripcion", "tipo"]
POR_TIPO = {"mover": "destino", "copiar": "destino", "renombrar": "plantilla"}


def cargar(ruta: Path) -> list[dict]:
    ruta = ruta.expanduser()
    if not ruta.is_file():
        raise ConfigError(f"No encuentro {ruta}. Crea acciones.json o usa --config RUTA")
    try:
        datos = json.loads(ruta.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        raise ConfigError(f"{ruta.name} no es JSON válido: línea {e.lineno}, columna {e.colno} ({e.msg})")

    acciones = datos.get("acciones") if isinstance(datos, dict) else None
    if not isinstance(acciones, list) or not acciones:
        raise ConfigError("Falta la lista «acciones» o está vacía")

    vistos = set()
    for i, a in enumerate(acciones, start=1):
        nombre = a.get("nombre", f"nº {i}")
        for campo in OBLIGATORIOS:
            if not a.get(campo):
                raise AccionNoValida(nombre, campo, "es obligatorio")
        if nombre in vistos:
            raise AccionNoValida(nombre, "nombre", "está repetido")
        vistos.add(nombre)
        if a["tipo"] not in TIPOS:
            raise AccionNoValida(nombre, "tipo", f"«{a['tipo']}» no existe; usa uno de: {', '.join(sorted(TIPOS))}")
        extra = POR_TIPO.get(a["tipo"])
        if extra and not a.get(extra):
            raise AccionNoValida(nombre, extra, f"es obligatorio en acciones de tipo {a['tipo']}")
        patron = a.get("filtro", {}).get("patron")
        if patron is not None:
            try:
                re.compile(patron)
            except re.error as e:
                raise AccionNoValida(nombre, "filtro.patron", f"expresión regular rota: {e}")
    return acciones`;

const PROMPT_VALIDAR_PLAN = `Carga la skill acciones-json y lee @acciones.json.
Quiero validar acciones.json ANTES de ejecutar nada:
- src/tareas/errores.py con TareasError, ConfigError y AccionNoValida;
- src/tareas/config.py con cargar(ruta) -> list[dict];
- la orden «tareas validar» en src/tareas/cli.py.
No toques nada todavía: dime qué ficheros crearías o cambiarías, qué clases
y funciones tendrán y qué casos de error vas a detectar.`;

const PROMPT_VALIDAR_BUILD = `Hazlo según el plan. Criterio de aceptación:
- TareasError (codigo_salida = 1), ConfigError (codigo_salida = 3) y
  AccionNoValida(accion, campo, motivo) → «Acción «X», campo «Y»: motivo».
- JSON roto → ConfigError con línea y columna.
- Cada mensaje dice QUÉ acción y QUÉ campo fallan, en español.
- «tareas validar»: «✔ N acciones válidas» en verde, o el error en rojo
  SIN traceback y saliendo con e.codigo_salida.
Solo esos tres ficheros, sin dependencias nuevas.
Termina ejecutando: uv run tareas validar`;

const PROMPT_MOTOR_BUILD = `Carga la skill acciones-json. Crea src/tareas/acciones.py y src/tareas/motor.py:
1. acciones.py: dataclass Resultado(origen, destino, estado: hecho | simulado | saltado);
   clase base abstracta Accion con ejecutar(ficheros, simular) y aplicar(fichero, n, simular)
   abstracto; fábrica Accion.desde_config(dict) con un registro de subclases (nada de
   if/elif por tipo); subclases Mover, Copiar, Renombrar y Borrar (destructiva = True).
2. motor.py: clase Motor(acciones) con seleccionar(carpeta, filtro) y
   ejecutar(nombre, carpeta, simular) -> list[Resultado]. Sin carpeta, usa "origen".
   Acción o carpeta inexistente → TareasError con mensaje humano.
Con simular=True no se toca NADA del disco (ni mkdir). Nunca sobrescribir: sufijo « (1)».
No toques cli.py y NO ejecutes ninguna acción: las pruebo yo.
Al terminar, dime qué pasa si ejecuto dos veces seguidas la misma acción de mover y por qué.`;

const ACCIONES_PY = String.raw`# src/tareas/acciones.py (resumido)
from __future__ import annotations

import shutil
from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path

from .errores import AccionNoValida


@dataclass
class Resultado:
    origen: Path
    destino: Path | None
    estado: str  # "hecho", "simulado" o "saltado"


def destino_libre(destino: Path) -> Path:
    """Nunca sobrescribe: si existe, prueba 'nombre (1).ext', 'nombre (2).ext'..."""
    libre, n = destino, 1
    while libre.exists():
        libre = destino.with_name(f"{destino.stem} ({n}){destino.suffix}")
        n += 1
    return libre


class Accion(ABC):
    tipo = ""
    destructiva = False
    _registro: dict[str, type[Accion]] = {}

    def __init__(self, config: dict):
        self.nombre = config["nombre"]
        self.descripcion = config["descripcion"]
        self.config = config

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        Accion._registro[cls.tipo] = cls  # cada subclase se apunta sola

    @staticmethod
    def desde_config(config: dict) -> Accion:
        """Fábrica: del diccionario del JSON a la clase que toca."""
        clase = Accion._registro.get(config["tipo"])
        if clase is None:
            raise AccionNoValida(config["nombre"], "tipo", "no hay ninguna clase para ese tipo")
        return clase(config)

    def ejecutar(self, ficheros: list[Path], simular: bool) -> list[Resultado]:
        return [self.aplicar(f, n, simular) for n, f in enumerate(ficheros, start=1)]

    @abstractmethod
    def aplicar(self, fichero: Path, n: int, simular: bool) -> Resultado: ...


class Mover(Accion):
    tipo = "mover"

    def aplicar(self, fichero, n, simular):
        carpeta = Path(self.config["destino"]).expanduser()
        destino = destino_libre(carpeta / fichero.name)
        if not simular:
            carpeta.mkdir(parents=True, exist_ok=True)
            shutil.move(fichero, destino)
        return Resultado(fichero, destino, "simulado" if simular else "hecho")


class Renombrar(Accion):
    tipo = "renombrar"

    def aplicar(self, fichero, n, simular):
        fecha = datetime.fromtimestamp(fichero.stat().st_mtime)
        nuevo = self.config["plantilla"].format(
            fecha=fecha, n=n, ext=fichero.suffix.lower(), nombre=fichero.stem
        )
        if nuevo == fichero.name:
            return Resultado(fichero, None, "saltado")
        destino = destino_libre(fichero.with_name(nuevo))
        if not simular:
            fichero.rename(destino)
        return Resultado(fichero, destino, "simulado" if simular else "hecho")


class Borrar(Accion):
    tipo = "borrar"
    destructiva = True

    def aplicar(self, fichero, n, simular):
        if not simular:
            fichero.unlink()
        return Resultado(fichero, None, "simulado" if simular else "hecho")

# Copiar es igual que Mover pero con shutil.copy2 (conserva la fecha).`;

const MOTOR_PY = String.raw`# src/tareas/motor.py (resumido)
import re
import time
from pathlib import Path

from .acciones import Accion, Resultado
from .errores import TareasError


class Motor:
    def __init__(self, acciones: list[dict]):
        self.acciones = {a["nombre"]: Accion.desde_config(a) for a in acciones}

    @staticmethod
    def seleccionar(carpeta: Path, filtro: dict) -> list[Path]:
        exts = {e.lower() for e in filtro.get("extensiones", [])}
        patron = re.compile(filtro["patron"]) if "patron" in filtro else None
        dias = filtro.get("mas_antiguo_que_dias")
        mb = filtro.get("mayor_que_mb")
        ahora = time.time()
        elegidos = []
        for f in sorted(carpeta.iterdir()):
            if not f.is_file():
                continue
            if exts and f.suffix.lower() not in exts:
                continue
            if patron and not patron.search(f.name):
                continue
            if dias and ahora - f.stat().st_mtime < dias * 86400:
                continue
            if mb and f.stat().st_size < mb * 1024 * 1024:
                continue
            elegidos.append(f)
        return elegidos

    def ejecutar(self, nombre: str, carpeta: Path | None, simular: bool) -> list[Resultado]:
        accion = self.acciones.get(nombre)
        if accion is None:
            raise TareasError(f"No hay ninguna acción «{nombre}». Mira la lista con: tareas acciones")
        carpeta = (carpeta or Path(accion.config.get("origen", "."))).expanduser()
        if not carpeta.is_dir():
            raise TareasError(f"La carpeta {carpeta} no existe")
        ficheros = self.seleccionar(carpeta, accion.config.get("filtro", {}))
        return accion.ejecutar(ficheros, simular)`;

const CLI_PY = String.raw`# src/tareas/cli.py (fragmento)
@app.callback()
def principal(
    ctx: typer.Context,
    config: Path = typer.Option(Path("acciones.json"), "--config", help="Ruta de acciones.json"),
):
    ctx.obj = config


@app.command()
def ejecutar(
    ctx: typer.Context,
    nombre: str = typer.Argument(..., help="Nombre de la acción (ver: tareas acciones)"),
    carpeta: Path | None = typer.Argument(None, help="Carpeta sobre la que actuar"),
    simular: bool = typer.Option(False, "--simular", help="Enseña qué haría sin tocar nada"),
    si: bool = typer.Option(False, "--si", help="No pedir confirmación"),
):
    try:
        motor = Motor(config.cargar(ctx.obj))
        accion = motor.acciones.get(nombre)
        if accion and accion.destructiva and not simular and not si:
            typer.confirm(f"«{nombre}» borra ficheros. ¿Seguro?", abort=True)
        resultados = motor.ejecutar(nombre, carpeta, simular)
    except TareasError as e:
        consola.print(f"[red]✘ {e}[/red]")
        raise typer.Exit(e.codigo_salida)
    pintar_tabla(resultados, simular)  # Rich: fichero → destino → estado`;

const PROMPT_CLI = `Amplía SOLO @src/tareas/cli.py (Typer + Rich). Ya existen config.cargar, Motor y las Accion.
1. Opción global --config RUTA en @app.callback (por defecto ./acciones.json), guardada en ctx.obj.
2. «tareas acciones»: tabla Rich con nombre, tipo y descripción.
3. «tareas ejecutar NOMBRE [CARPETA] --simular --si»:
   - --simular: tabla «fichero → destino» con estado «simulado», sin tocar nada;
   - acción destructiva sin --simular ni --si → typer.confirm(..., abort=True);
   - resumen final: N hechos, N simulados, N saltados; si ningún fichero cumple el filtro, dilo.
4. Códigos de salida: 0 bien · 1 TareasError · 2 uso (Typer) · 3 ConfigError.
   Nunca un traceback ante errores previsibles: mensaje en rojo y typer.Exit(e.codigo_salida).
No toques acciones.py ni motor.py. Termina con: uv run tareas --help`;

const PRUEBAS_BASH = String.raw`# 1) Una carpeta de pruebas con ficheros feos (tildes, espacios, mayúsculas)
mkdir -p ~/pruebas-tareas/Descargas
cd ~/pruebas-tareas/Descargas
touch factura.pdf "apuntes de redes.docx" FOTO1.JPG "cumpleaños 2.png" viejo.tmp
touch -d "40 days ago" viejo.tmp   # macOS: touch -t "$(date -v-40d +%Y%m%d%H%M)" viejo.tmp

# 2) Desde la carpeta del repo
cd ~/cli-tareas
uv run tareas validar
uv run tareas acciones
uv run tareas ejecutar ordenar-descargas ~/pruebas-tareas/Descargas --simular
uv run tareas ejecutar limpiar-temporales ~/pruebas-tareas/Descargas --simular

# 3) Solo cuando la simulación dice lo que esperas
uv run tareas ejecutar ordenar-descargas ~/pruebas-tareas/Descargas
echo $?   # 0 si todo ha ido bien

# 4) Otro acciones.json (por ejemplo, uno roto a propósito)
uv run tareas --config pruebas/roto.json validar
echo $?   # debe ser 3`;

const PRUEBAS_PS = String.raw`# 1) Una carpeta de pruebas con ficheros feos (tildes, espacios, mayúsculas)
New-Item -ItemType Directory -Force "$HOME\pruebas-tareas\Descargas"
Set-Location "$HOME\pruebas-tareas\Descargas"
New-Item -ItemType File factura.pdf, "apuntes de redes.docx", FOTO1.JPG, "cumpleaños 2.png", viejo.tmp
(Get-Item viejo.tmp).LastWriteTime = (Get-Date).AddDays(-40)

# 2) Desde la carpeta del repo
Set-Location "$HOME\cli-tareas"
uv run tareas validar
uv run tareas acciones
uv run tareas ejecutar ordenar-descargas "$HOME\pruebas-tareas\Descargas" --simular

# 3) Solo cuando la simulación dice lo que esperas
uv run tareas ejecutar ordenar-descargas "$HOME\pruebas-tareas\Descargas"
$LASTEXITCODE   # 0 si todo ha ido bien

# 4) Otro acciones.json (por ejemplo, uno roto a propósito)
uv run tareas --config pruebas\roto.json validar
$LASTEXITCODE   # debe ser 3`;

const SALIDA = `$ uv run tareas ejecutar ordenar-descargas ~/pruebas-tareas/Descargas --simular
              ordenar-descargas (SIMULACIÓN: no se ha tocado nada)
┏━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━┓
┃ Fichero               ┃ Destino                                 ┃ Estado   ┃
┡━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━┩
│ apuntes de redes.docx │ ~/Documentos/PDF/apuntes de redes.docx  │ simulado │
│ factura.pdf           │ ~/Documentos/PDF/factura (1).pdf        │ simulado │
└───────────────────────┴─────────────────────────────────────────┴──────────┘
2 ficheros · 0 hechos · 2 simulados · 0 saltados
Para hacerlo de verdad, repite la orden sin --simular.`;

const ADR = `# ADR-0001: Las acciones viven en acciones.json, no en el código

- Estado: aceptada
- Fecha: 2026-11-04
- Autor/a: [tu nombre]

## Contexto

Mi herramienta «tareas» automatiza tareas repetitivas con ficheros
(ordenar Descargas, renombrar fotos, limpiar temporales...). Cada persona
que la use tendrá carpetas y manías distintas, y yo mismo voy a querer
añadir acciones nuevas cada pocas semanas. [Añade TU situación: qué
acciones tienes y quién más la va a usar.]

## Decisión

Las acciones se describen en un fichero JSON externo (acciones.json) con
un esquema documentado en el README. El código solo contiene el MOTOR que
lee, valida y ejecuta ese fichero. Añadir una acción = editar el JSON.

## Alternativas consideradas

1. Escribir cada acción como una función en Python.
   - A favor: [...]
   - En contra: cada cambio exige tocar el código y volver a instalar; quien
     no programa no puede añadir acciones.
2. Usar YAML o TOML en vez de JSON.
   - A favor: [...]
   - En contra: [...]
3. [Otra que se te ocurra o que te propusiera la IA]

## Consecuencias

- Positivas: añadir una acción no toca el código; el JSON se puede validar
  antes de ejecutar nada; [...]
- Negativas: hay que mantener la validación al día cuando el esquema
  crezca; los errores de escritura en el JSON solo se ven al ejecutar
  validar; [...]
- Qué haré si el esquema cambia: [por ejemplo, subir "version" a 2 y ...]`;

const COMMITS = `git add acciones.json README.md
git commit -m "Esquema de acciones.json con mi primera acción, documentado en el README"

git add .opencode/skills/acciones-json/SKILL.md
git commit -m "Skill acciones-json: el agente carga las reglas de mi esquema"

git add src/tareas/errores.py src/tareas/config.py src/tareas/cli.py
git commit -m "Validación de acciones.json con ConfigError/AccionNoValida y orden validar (sale con 3)"

git add src/tareas/acciones.py src/tareas/motor.py
git commit -m "Motor y clases Accion: --simular no toca el disco y nunca sobrescribe"

git add src/tareas/cli.py
git commit -m "Órdenes acciones y ejecutar con tabla Rich, --si y --config"

git add .opencode/commands/nueva-accion.md
git commit -m "Comando /nueva-accion: propone el JSON y espera mi visto bueno"

git add acciones.json
git commit -m "Acción renombrar-capturas creada con /nueva-accion y probada con --simular"

git add .opencode/agents/revisor.md
git commit -m "Subagente revisor de solo lectura (edit: deny)"

git add src/tareas/acciones.py
git commit -m "Arreglo del revisor: nombres con tildes al renombrar"

git add docs/adr/0001-configuracion-externa.md docs/prompts.md
git commit -m "ADR-0001: por qué configuración externa; prompts clave de la semana"
git push`;

const MENSAJES_COMMIT = [...COMMITS.matchAll(/git commit -m "(.*)"/g)].map((m) => m[1]);

const SALIDA_TERMINAL: LineaTerminal[] = SALIDA.split("\n").map((l, i, todas) =>
  i === 0 ? { o: l.replace(/^\$ /, "") } : i === todas.length - 1 ? { s: l, tono: "aviso" } : { s: l },
);

/* ───────────── contenido en piezas ───────────── */

const INDICE: [string, string][] = [
  ["producto", "Al acabar la semana"],
  ["por-que", "Por qué configuración externa"],
  ["metodo", "El método de cada paso"],
  ["paso-1", "Paso 1 · Tu esquema"],
  ["paso-2", "Paso 2 · Tu primera skill"],
  ["paso-3", "Paso 3 · Validar"],
  ["paso-4", "Paso 4 · Motor y clases"],
  ["paso-5", "Paso 5 · /nueva-accion"],
  ["paso-6", "Paso 6 · Subagente revisor"],
  ["paso-7", "Paso 7 · Tu primer ADR"],
  ["paso-8", "Paso 8 · Audita y commitea"],
  ["checklist", "Checklist de la semana"],
  ["rubrica", "Lo que cuenta en la rúbrica"],
  ["despues", "Qué viene después"],
];

const FICHEROS_CONFIG: [string, string, string][] = [
  [".gitignore", "git", "Qué ficheros no se suben (lo escribiste en la Sesión 1)."],
  ["package.json", "npm / Node", "Dependencias y órdenes como npm run dev."],
  ["docker-compose.yml", "Docker", "Qué servicios arrancan, en qué puertos, con qué variables."],
  ["settings.json de VS Code", "VS Code", "Tema, tamaño de letra, formateo al guardar…"],
  ["pyproject.toml", "uv / pip", "Nombre del paquete, versión y el comando tareas."],
  ["opencode.json · AGENTS.md · .opencode/", "OpenCode", "Qué puede hacer tu agente, qué normas sigue y qué sabe de tu proyecto."],
  ["acciones.json", "TU motor", "Qué hace tu herramienta con tus ficheros."],
];

const METODO: { t: string; d: ReactNode }[] = [
  { t: "1 · Tú escribes la intención", d: "El esquema, la acción, el criterio de aceptación." },
  {
    t: "2 · Agente plan",
    d: (
      <>
        <Teclas combo="shift+tab" />: «explícame cómo lo harías y qué ficheros tocarías». Lees el plan y lo corriges.
      </>
    ),
  },
  {
    t: "3 · Agente build",
    d: (
      <>
        <Teclas combo="shift+tab" />: «hazlo». Apruebas cada edición y cada orden <b>leyendo el diff</b>.
      </>
    ),
  },
  {
    t: "4 · Auditas",
    d: (
      <>
        Lees el código, pruebas en <C>~/pruebas-tareas</C> con <C>--simular</C> y con casos feos. Si algo sale mal,{" "}
        <C>/undo</C> o le explicas el fallo.
      </>
    ),
  },
  {
    t: "5 · Commit pequeño hecho por ti",
    d: (
      <>
        Y el prompt clave a <C>docs/prompts.md</C> (o <C>/export</C> de la sesión).
      </>
    ),
  },
  {
    t: "6 · Sesión nueva por tarea",
    d: (
      <>
        <C>/new</C>; <C>/compact</C> si la conversación se alarga.
      </>
    ),
  },
];

const CAMPOS: [string, string, string, string, string][] = [
  ["version", "sí (raíz)", "entero", "1", "Versión del esquema. Si mañana cambias el formato, subes a 2 y el programa sabe qué está leyendo."],
  ["acciones", "sí (raíz)", "lista", "[ … ]", "La lista de acciones. Vacía = error de configuración."],
  ["nombre", "sí", "texto sin espacios", "ordenar-descargas", "Lo que escribes en tareas ejecutar NOMBRE. Único: no puede haber dos iguales."],
  ["descripcion", "sí", "texto", "Mueve los PDF…", "Lo que enseña tareas acciones. Escríbela para alguien que no eres tú."],
  ["tipo", "sí", "uno de la lista", "mover", "Qué clase de acción es. El motor elige la clase Python a partir de este campo."],
  ["origen", "no", "ruta", "~/Descargas", "Carpeta por defecto si no pasas CARPETA en la orden. ~ se expande a tu carpeta personal en Linux, macOS y Windows."],
  ["filtro", "no", "objeto", '{ "extensiones": [".pdf"] }', "Qué ficheros de la carpeta se tocan. Sin filtro = todos (¡cuidado con borrar!)."],
  ["destino", "mover / copiar", "ruta", "~/Documentos/PDF", "A dónde van. Si no existe, se crea."],
  ["plantilla", "renombrar", "texto con {huecos}", "{fecha:%Y-%m-%d}_{n:03}{ext}", "El nombre nuevo de cada fichero."],
  ["confirmar", "no (borrar: sí)", "true / false", "true", "Pide confirmación antes de actuar salvo que pases --si."],
];

const TIPOS: [string, string, string][] = [
  ["mover", "origen → destino", "Ordenar Descargas, sacar las capturas del escritorio."],
  ["copiar", "origen → destino (el original se queda)", "Copia de seguridad de tus apuntes a un USB o a una carpeta sincronizada."],
  ["renombrar", "mismo sitio, nombre nuevo", "Fotos con fecha, apuntes numerados (tema-01, tema-02…)."],
  ["borrar", "desaparece (con confirmación)", "Temporales, instaladores .exe/.deb viejos, ficheros vacíos."],
  ["… con IA (semana 3)", "lo decide un modelo del centro", "Clasificar por contenido, poner nombre a partir del texto de un PDF, resumir."],
];

const FILTROS: [string, string, string][] = [
  ["extensiones", '[".pdf", ".docx"]', "Solo esas extensiones. Compáralas en minúsculas: FOTO1.JPG también es .jpg."],
  ["patron", '"^captura.*\\\\.png$"', "Expresión regular sobre el nombre. En JSON la barra invertida se escribe doble."],
  ["mas_antiguo_que_dias", "30", "Solo ficheros cuya fecha de modificación tiene más de N días."],
  ["mayor_que_mb", "100", "Solo ficheros de más de N MB (vídeos olvidados, ISOs…)."],
];

const PLANTILLAS: [string, string, string][] = [
  ["{fecha:%Y-%m-%d}", "2026-11-03", "Fecha de modificación del fichero con el formato que quieras (%d/%m no: la barra no vale en nombres)."],
  ["{n:03}", "001, 002…", "Contador con ceros a la izquierda. {n} sin formato da 1, 2, 3."],
  ["{ext}", ".jpg", "La extensión original, con punto, en minúsculas."],
  ["{nombre}", "IMG_2041", "El nombre original sin extensión, por si quieres conservarlo: {fecha:%Y%m%d}-{nombre}{ext}."],
];

const IDEAS: [string, ReactNode][] = [
  [
    "Fácil",
    <>
      Mover las capturas de pantalla del escritorio a <C>~/Imágenes/Capturas</C> (filtro por extensión).
    </>,
  ],
  [
    "Media",
    <>
      Copiar los apuntes de DAM modificados hace menos de 7 días a una carpeta de copia, o borrar instaladores{" "}
      <C>.exe</C>/<C>.deb</C> de más de 60 días.
    </>,
  ],
  [
    "Difícil",
    <>
      Renombrar las fotos del móvil a <C>{"{fecha:%Y-%m-%d}_{n:03}{ext}"}</C> usando un <C>patron</C> regex que solo
      coja las que empiezan por <C>IMG_</C> o <C>PXL_</C>.
    </>,
  ],
];

// Ficheros de ~/pruebas-tareas/Descargas (los que crea el bloque de pruebas del paso 4),
// en el orden en que los recorre el motor (sorted: mayúsculas antes que minúsculas).
const DESCARGAS = ["FOTO1.JPG", "apuntes de redes.docx", "cumpleaños 2.png", "factura.pdf", "viejo.tmp"];
const ficheros = (nombres: string[], nivel = 0): NodoArbol[] => nombres.map((nombre) => ({ nombre, nivel }));

const PERSONALIZAR: [string, string, string, string][] = [
  ["AGENTS.md", "raíz del repo", "Siempre: entra en todas las conversaciones.", "Normas generales del proyecto (stack, órdenes, «no hagas push»)."],
  [
    "Skill",
    ".opencode/skills/NOMBRE/SKILL.md",
    "El agente, bajo demanda, cuando la description encaja con la tarea (o tú, con @NOMBRE).",
    "Conocimiento concreto que no hace falta siempre: tu esquema de acciones.json.",
  ],
  ["Comando", ".opencode/commands/NOMBRE.md", "Tú, escribiendo /NOMBRE argumentos.", "Un prompt que repites a menudo, con sus pasos fijos."],
  [
    "Subagente",
    ".opencode/agents/NOMBRE.md",
    "Tú, pidiéndoselo con palabras (o el agente principal, si lo necesita).",
    "Otro agente con su propio papel y sus propios permisos: un revisor que no puede editar.",
  ],
];

const ESTRUCTURA_OPENCODE: NodoArbol[] = [
  { nombre: "opencode.json", nivel: 0, nota: "permisos del proyecto (Sesión 1)" },
  { nombre: "AGENTS.md", nivel: 0, nota: "normas que el agente lee SIEMPRE (Sesión 1)" },
  { nombre: "acciones.json", nivel: 0 },
  { nombre: ".opencode/", nivel: 0, carpeta: true },
  { nombre: "skills/", nivel: 1, carpeta: true },
  { nombre: "acciones-json/", nivel: 2, carpeta: true },
  { nombre: "SKILL.md", nivel: 3, nota: "paso 2: lo que el agente sabe de tu esquema", tono: "morado" },
  { nombre: "commands/", nivel: 1, carpeta: true },
  { nombre: "nueva-accion.md", nivel: 2, nota: "paso 5: tu orden /nueva-accion", tono: "morado" },
  { nombre: "agents/", nivel: 1, carpeta: true },
  { nombre: "revisor.md", nivel: 2, nota: "paso 6: tu subagente revisor", tono: "morado" },
  { nombre: "src/tareas/ …", nivel: 0, carpeta: true },
];

const PIEZAS_SKILL: [string, ReactNode][] = [
  [
    "Frontmatter de la skill",
    <>
      Lo de arriba entre <C>---</C>. El <b>id</b> de la skill es el nombre de la carpeta (<C>acciones-json</C>), en
      minúsculas y con guiones; <C>name</C> es solo una etiqueta.
    </>,
  ],
  [
    "description, lo más importante",
    <>
      El agente solo ve el id y la descripción de cada skill, y con eso decide si la carga. Por eso dice <b>qué es</b> y,
      sobre todo, <b>cuándo usarla</b>. Sin descripción, la skill no le llega al modelo.
    </>,
  ],
  [
    "Se carga cuando encaja",
    <>
      El agente llama a su herramienta <C>skill</C> y entonces sí lee el fichero entero: no gasta contexto con tu
      esquema cuando le pides otra cosa. Para forzarla, escribe <C>@acciones-json</C>.
    </>,
  ],
  [
    "Si el esquema cambia, la skill cambia",
    <>La última regla es para el agente y para ti. Una skill desactualizada enseña mal.</>,
  ],
];

const CASOS_FEOS: [string, string, string][] = [
  ["Coma de más", "Una coma tras la última acción: … } , ]", "No es JSON válido: línea X, columna Y"],
  ["Tipo inexistente", '"tipo": "mober"', "Acción «…», campo «tipo»: «mober» no existe; usa uno de: borrar, copiar, mover, renombrar"],
  ["Nombre repetido", 'Dos acciones con "nombre": "ordenar-descargas"', "Acción «ordenar-descargas», campo «nombre»: está repetido"],
  ["Regex rota", '"patron": "*.tmp" (el * no puede ir el primero)', "Acción «…», campo «filtro.patron»: expresión regular rota"],
  ["Extra: fichero que no existe", "--config nada.json", "No encuentro nada.json…"],
];

const REGLAS_AUDITA: ReactNode[] = [
  <>
    <C>pathlib.Path</C> siempre: ninguna ruta montada con <C>+ &quot;/&quot; +</C> ni con <C>\</C>.
  </>,
  <>
    <C>Path.expanduser()</C> para <C>~</C>; <C>encoding=&quot;utf-8&quot;</C> en todo <C>open()</C> o <C>read_text()</C>.
  </>,
  <>
    <C>shutil.move</C> y <C>shutil.copy2</C>; nada de <C>os.system</C>, <C>subprocess</C> ni <C>shell=True</C>.
  </>,
  <>Nombres con tildes y espacios funcionan.</>,
  <>
    Con <C>simular=True</C> no se llama a <C>mkdir</C>, <C>move</C>, <C>rename</C> ni <C>unlink</C>.
  </>,
  <>Nunca se sobrescribe: si el destino existe, sufijo « (1)», « (2)»…</>,
];

const CODIGOS_SALIDA: [string, string][] = [
  ["0", "Todo bien."],
  ["1", "Fallo al ejecutar (carpeta que no existe, acción desconocida, permiso denegado…)."],
  ["2", "Error de uso: falta un argumento o una opción no existe (lo pone Typer solo)."],
  ["3", "Configuración inválida: acciones.json roto o con campos mal."],
];

const PIEZAS_COMANDO: [string, ReactNode][] = [
  ["nueva-accion.md → /nueva-accion", <>El nombre del fichero es el nombre del comando.</>],
  [
    "Frontmatter del comando",
    <>
      <C>description</C> es lo que ves en la lista al escribir <C>/</C>; <C>agent: build</C> lo ejecuta con el agente que
      puede editar (igualmente te pedirá permiso para cada cambio).
    </>,
  ],
  [
    "$ARGUMENTS",
    <>
      Se sustituye por <b>todo lo que escribas detrás del comando</b>. <C>$1</C>, <C>$2</C>…: cada argumento por
      separado (entre comillas si lleva espacios).
    </>,
  ],
  [
    "!`git status --short`",
    <>
      Ejecuta esa orden <b>antes</b> de enviar el prompt y mete su salida: el agente sabe qué ficheros tienes sin guardar.
      Va fuera de tus permisos: solo órdenes de confianza.
    </>,
  ],
  [
    "«Espera mi visto bueno»",
    <>El paso 2 del comando («propón primero la entrada JSON») es el que mantiene la decisión en tus manos.</>,
  ],
  [
    "@fichero no se adjunta",
    <>
      Un <C>@fichero</C> escrito dentro del comando no se adjunta: adjúntalo en la caja al lanzarlo.
    </>,
  ],
];

const AUDITORIA: [string, string][] = [
  ["¿Qué pasa si ejecuto dos veces la misma acción?", "Mover: la segunda vez no encuentra nada en origen (bien). Renombrar: no debería generar 2026-10-26_001_001… ni cambiar números a lo loco. Copiar: aparecen «(1)», no se machaca nada."],
  ["¿Y si la carpeta de destino no existe?", "Se crea al ejecutar de verdad; con --simular NO se crea (compruébalo con ls / dir)."],
  ["¿Y si el destino ya tiene un fichero con ese nombre?", "Sufijo « (1)» y la tabla lo enseña. Nunca se pierde un fichero."],
  ["¿Nombres con tildes, eñes o espacios?", "«cumpleaños 2.png» y «apuntes de redes.docx» se mueven y se ven bien en la tabla."],
  ["¿Mayúsculas en la extensión?", "FOTO1.JPG entra en el filtro de .jpg."],
  ["¿La carpeta de origen no existe o la acción no existe?", "Mensaje humano en rojo y código de salida 1, sin traceback."],
  ["¿Borrar sin --si?", "Pregunta antes. Si contestas que no, no borra nada y sale con código distinto de 0."],
  ["¿Dos ficheros que se renombran al MISMO nombre en una simulación?", "Caso traicionero: destino_libre mira el disco, y en simulación el primero aún no existe. ¿Tu tabla lo detecta? Si no, apúntalo como mejora en el README."],
];

const OTRO_SISTEMA: [string, ReactNode][] = [
  ["Rutas con barra invertida", <>Rutas montadas a mano con <C>\</C> o con <C>/</C>: en otro sistema no existen.</>],
  [
    "Tildes que salen como Ã±",
    <>
      Falta <C>encoding=&quot;utf-8&quot;</C> al leer o escribir.
    </>,
  ],
  ["Colores raros", <>En una consola antigua, los colores de Rich pueden salir como códigos extraños.</>],
];

const CHECKLIST: ReactNode[] = [
  <>acciones.json con al menos 3 acciones TUYAS (no las del ejemplo) y el esquema documentado en el README.</>,
  <>«tareas validar» detecta los casos feos con mensajes que dicen qué acción y qué campo fallan, y sale con 3.</>,
  <>errores.py con TareasError, ConfigError y AccionNoValida; ningún traceback ante errores previsibles.</>,
  <>acciones.py con la clase base Accion, la fábrica desde_config y una subclase por tipo; motor.py con la clase Motor.</>,
  <>«tareas acciones» y «tareas ejecutar NOMBRE [CARPETA] --simular / --si» funcionando, y --config RUTA.</>,
  <>Probado en ~/pruebas-tareas y con el destino también en pruebas: siempre --simular primero; nada sobrescrito, nada perdido.</>,
  <>.opencode/skills/acciones-json/SKILL.md en el repo y visible en /skills.</>,
  <>.opencode/commands/nueva-accion.md en el repo y usado para tu 2.ª y 3.ª acción.</>,
  <>.opencode/agents/revisor.md en el repo; el subagente revisor o /review antes de cada commit de código.</>,
  <>docs/adr/0001-configuracion-externa.md terminado con TUS razones.</>,
  <>docs/prompts.md con los prompts clave de la semana y qué tuviste que corregir de lo que hizo el agente.</>,
  <>≥ 10 commits tuyos acumulados (los de la Sesión 1 cuentan) con mensajes que cuentan el proceso, y push a GitHub.</>,
];

// La casilla a la que llegas con el trabajo de esta semana (índice de nivel 0-3).
const CRITERIOS_SEMANA: { titulo: string; criterios: [string, number][] }[] = [
  {
    titulo: "Criterios: acciones y configuración",
    criterios: [
      ["acciones", 2],
      ["configuracion", 3],
    ],
  },
  {
    titulo: "Criterios: robustez y diseño",
    criterios: [
      ["robustez", 2],
      ["diseno", 2],
    ],
  },
];

const DESPUES: Hito[] = [
  {
    titulo: "Semana 3 · MCP y capa IA",
    fecha: "9-13 nov",
    puntos: [
      "OpenCode con MCP: el servidor context7 para consultar documentación de librerías, activado solo cuando hace falta.",
      "La capa IA de tu CLI: acciones que deciden con los mismos modelos del centro, llamados desde Python.",
      "La clave, fuera del repo, y un modo sin red.",
    ],
    futuro: true,
  },
  {
    titulo: "Semana 4 · Pruebas y release",
    fecha: "16-20 nov",
    puntos: [
      "Pruebas con pytest que escribe el agente y auditas tú.",
      "opencode run sin interfaz (por ejemplo, en scripts).",
      "README de instalación y release v1.0.",
    ],
    futuro: true,
  },
  {
    titulo: "Semipresencial · Quincena 4",
    fecha: "Del 9 al 20 de noviembre",
    puntos: ["IA, pruebas y release.", "Entrega el viernes 20 de noviembre."],
    futuro: true,
  },
];

/* ───────────── piezas propias de la página ───────────── */

const titulo4 = "text-xl font-bold text-zinc-900 dark:text-zinc-100";
const enlaceGuia = (ancla: string, texto: string) => (
  <Link href={`/programacion-ia/opencode/#${ancla}`} className={cls.enlace}>
    {texto}
  </Link>
);

function TarjetaCampo({ campo }: { campo: [string, string, string, string, string] }) {
  const [c, o, t, e, q] = campo;
  return (
    <div className={`${cls.tarjeta} min-w-0 !p-4`}>
      <h4 className={`font-mono ${titulo4}`}>&quot;{c}&quot;</h4>
      <p className="mt-2 flex flex-wrap gap-2">
        <Chip tono={o.startsWith("sí") ? "azul" : "gris"}>obligatorio: {o}</Chip>
        <Chip tono="gris">{t}</Chip>
      </p>
      <p className={`mt-2 ${cls.texto}`}>
        Ej.: <C>{e}</C>
      </p>
      <p className={`mt-1 ${cls.texto}`}>{q}</p>
    </div>
  );
}

/** Rejilla de tarjetas sencillas: título (h4) y texto. */
function Rejilla({ items, columnas = 2, mono = false }: { items: [string, ReactNode][]; columnas?: 2 | 3; mono?: boolean }) {
  return (
    <div className={`grid grid-cols-1 gap-4 ${columnas === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {items.map(([t, d]) => (
        <Tarjeta key={t} titulo={t} nivel={4} mono={mono} className="!p-4">
          {d}
        </Tarjeta>
      ))}
    </div>
  );
}

/* ───────────── página ───────────── */

export default function CliSesion2() {
  const criterio = (id: string) => RUBRICA_CLI.criterios.find((c) => c.id === id)!;
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      {/* Portada */}
      <section data-bloque className="max-w-[1100px]">
        <Breadcrumbs
          grande
          items={[
            { title: "Curso de Programación con IA", path: "/programacion-ia/" },
            { title: "CLI tareas con IA", path: "/programacion-ia/cli/" },
            { title: "Sesión 2", path: "/programacion-ia/cli/sesion-02/" },
          ]}
        />
        <Chip>Proyecto 2 · Sesión 2 · Semana 2-6 nov</Chip>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Acciones predefinidas: acciones.json y el motor</h1>
        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          Esta semana está la idea central del proyecto: <b>tú decides qué hace tu herramienta escribiendo acciones.json</b>;
          el agente programa el <b>motor</b> que lo interpreta. Y a la vez das el segundo paso con <b>OpenCode</b>: le enseñas
          tu esquema con una <b>skill</b>, te creas un <b>comando</b> propio para añadir acciones y un <b>subagente revisor</b>{" "}
          que lee tu código sin poder tocarlo.
        </p>
        <div className={`mt-5 rounded-2xl border p-5 ${TONO.verde.caja}`}>
          <p className={`text-base font-bold uppercase tracking-wider ${TONO.verde.texto}`}>El hilo del proyecto 2</p>
          <p className="mt-1 text-xl font-bold text-emerald-950 dark:text-emerald-50">
            Tus acciones son las tareas que te hacen perder tiempo.
          </p>
          <p className="mt-2 text-lg text-emerald-950 dark:text-emerald-100">
            Cada uno se construye una herramienta útil para sí mismo, y reutilizable. Esta semana la llenas: cada acción de tu{" "}
            <C>acciones.json</C> automatiza algo que hoy haces a mano, y la ejecutas con una orden cada vez que la necesites.
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Chip tono="gris">🗓 Semana 2 · 2-6 nov</Chip>
          <Chip tono="gris">🧩 acciones.json → config → Motor → Accion</Chip>
          <Chip tono="gris">🤖 skill · comando · subagente</Chip>
          <Chip tono="gris">🛡 Excepciones propias</Chip>
          <Chip tono="gris">📝 Primer ADR</Chip>
        </div>
      </section>

      <Bloque titulo="En esta página">
        <nav aria-label="En esta página">
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* ───────────── PRODUCTO ───────────── */}
      <Bloque
        id="producto"
        titulo="Al acabar la semana"
        entradilla={
          <>
            Partes de lo que dejaste en la{" "}
            <Link href="/programacion-ia/cli/sesion-01/" className={cls.enlace}>
              Sesión 1
            </Link>
            : el comando <C>tareas</C> con <C>--help</C>, <C>version</C> y <C>listar</C>, el repo con su <C>.gitignore</C>,
            tu <C>opencode.json</C> de permisos y tu <C>AGENTS.md</C>. Al acabar tendrás <b>3 acciones propias</b>{" "}
            funcionando (siempre primero con <C>--simular</C>), las órdenes <C>tareas validar</C>, <C>tareas acciones</C> y{" "}
            <C>tareas ejecutar</C>, y esto en tu repo:
          </>
        }
      >
        <RepoFinal />
      </Bloque>

      <Aviso titulo="Semipresencial: lo que se comprueba el 6 nov" tono="morado">
        <p>
          Esto es exactamente lo que se comprueba el <b>viernes 6 de noviembre</b>, al cerrar la quincena 3: 3 acciones
          propias funcionando, el ADR y commits reales en tu repo.
        </p>
        <p>
          En casa trabajas también con OpenCode (puedes abrirlo en la terminal integrada de VS Code); cómo conectarte desde
          casa a los modelos del centro lo explica el profesor en la tutoría colectiva de arranque.
        </p>
      </Aviso>

      {/* ───────────── POR QUÉ ───────────── */}
      <Bloque
        id="por-que"
        titulo="Por qué configuración externa y no código"
        entradilla={
          <>
            Piensa en el mando de la tele. El fabricante programa una vez lo que hace cada botón (el motor), pero{" "}
            <b>qué canal está en el 1 lo decides tú</b> en el menú, sin abrir el aparato. Si para cambiar el canal del botón
            1 tuvieras que soldar algo dentro, nadie lo haría. Con tu herramienta pasa igual: si cada acción es una función
            escrita en Python, cambiar «mueve los PDF» por «mueve los PDF y los EPUB» exige tocar código, probarlo y
            reinstalar. Si vive en un fichero de configuración, cambias una línea.
          </>
        }
      >
        <CodigoFrenteJson />
      </Bloque>

      <Bloque titulo="Lo usas todos los días" nivel={3} entradilla="No es un invento del curso: lo usas todos los días sin darte cuenta.">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FICHEROS_CONFIG.map(([f, q, d]) => (
            <Tarjeta
              key={f}
              titulo={f}
              nivel={4}
              mono
              antetitulo={`Lo interpreta: ${q}`}
              tono={f === "acciones.json" ? "azul" : undefined}
              className="!p-4"
            >
              {d}
            </Tarjeta>
          ))}
        </div>
      </Bloque>

      <Aviso titulo="La misma idea, dos veces" tono="azul">
        <p>
          Igual que tu CLI lee <C>acciones.json</C>, OpenCode lee <C>opencode.json</C>, <C>AGENTS.md</C> y la carpeta{" "}
          <C>.opencode/</C>. Nadie recompila OpenCode para adaptarlo a tu proyecto:{" "}
          <b>tú configuras a tu agente igual que tu usuario configura tu herramienta</b>.
        </p>
        <p>
          Esta semana harás las dos cosas: el <C>acciones.json</C> de tu CLI y tres ficheros nuevos en <C>.opencode/</C>.
        </p>
      </Aviso>

      <Bloque
        titulo="El reparto de papeles"
        nivel={3}
        entradilla={
          <>
            Así queda tu CLI: el JSON dice <b>qué</b>; <C>config.py</C> comprueba que el JSON tiene sentido <b>antes</b> de
            tocar un solo fichero; el <C>Motor</C> elige los ficheros que cumplen el filtro; cada <C>Accion</C> sabe hacer{" "}
            <b>una</b> cosa; y la CLI pinta el resultado.
          </>
        }
      >
        <RecorridoAccion />
      </Bloque>

      {/* ───────────── MÉTODO ───────────── */}
      <Bloque
        id="metodo"
        titulo="El método de cada paso"
        entradilla={
          <>
            El mismo de la Sesión 1. ¿Dudas con OpenCode (atajos, permisos, sesiones)? Tienes la{" "}
            <Link href="/programacion-ia/opencode/" className={cls.enlace}>
              guía de OpenCode del curso
            </Link>
            .
          </>
        }
      >
        <QuienHace />
      </Bloque>

      <Bloque titulo="Los seis pasos, uno a uno" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {METODO.map((m) => (
            <Tarjeta key={m.t} titulo={m.t} nivel={4} className="!p-4">
              {m.d}
            </Tarjeta>
          ))}
        </div>
      </Bloque>

      {/* ───────────── PASO 1 ───────────── */}
      <Paso
        id="paso-1"
        n={1}
        titulo="Diseña tu esquema: lo haces TÚ, sin IA"
        entradilla={
          <>
            Esta parte es la que te pertenece: el esquema es <b>la especificación</b> de tu herramienta. Si se lo pides a la
            IA, tendrás la herramienta de otra persona. OpenCode, cerrado. Crea <C>acciones.json</C> en la raíz del repo
            partiendo de este ejemplo:
          </>
        }
      >
        <Codigo code={ESQUEMA} kind="json" etiqueta="acciones.json" rango={[1, 11]} />
      </Paso>

      <Bloque
        titulo="La acción ordenar-descargas"
        nivel={3}
        entradilla={
          <>
            Tipo <C>mover</C>: de <C>origen</C> a <C>destino</C>, solo los PDF y los Word. Sin <C>CARPETA</C> en la orden,
            usa su <C>origen</C>.
          </>
        }
      >
        <AntesDespues
          orden="tareas ejecutar ordenar-descargas"
          antes={{
            titulo: "Antes de ordenar",
            raiz: "~/",
            nodos: [
              { nombre: "Descargas/", nivel: 0, carpeta: true },
              ...ficheros(DESCARGAS, 1),
              { nombre: "Documentos/PDF/", nivel: 0, carpeta: true, nota: "vacía" },
            ],
          }}
          despues={{
            titulo: "Después de ordenar",
            raiz: "~/",
            nodos: [
              { nombre: "Descargas/", nivel: 0, carpeta: true },
              ...ficheros(["FOTO1.JPG", "cumpleaños 2.png", "viejo.tmp"], 1),
              { nombre: "Documentos/PDF/", nivel: 0, carpeta: true },
              { nombre: "apuntes de redes.docx", nivel: 1, tono: "verde" },
              { nombre: "factura.pdf", nivel: 1, tono: "verde" },
            ],
          }}
        />
      </Bloque>

      <Bloque
        titulo="La acción renombrar-fotos"
        nivel={3}
        entradilla="FOTO1.JPG pasa a ser la 001 y cumpleaños 2.png, la 002; los demás no cumplen el filtro."
      >
        <Codigo code={ESQUEMA} kind="json" etiqueta="acciones.json" rango={[12, 18]} />
        <div className="mt-4">
          <AntesDespues
            orden="tareas ejecutar renombrar-fotos ~/pruebas-tareas/Descargas"
            antes={{ titulo: "Antes de renombrar", raiz: "Descargas/", nodos: ficheros(DESCARGAS) }}
            despues={{
              titulo: "Después de renombrar",
              raiz: "Descargas/",
              nodos: [
                { nombre: "2026-11-03_001.jpg", nivel: 0, tono: "verde" },
                { nombre: "2026-11-03_002.png", nivel: 0, tono: "verde" },
                ...ficheros(["apuntes de redes.docx", "factura.pdf", "viejo.tmp"]),
              ],
            }}
          />
        </div>
      </Bloque>

      <Bloque titulo="La acción limpiar-temporales" nivel={3}>
        <Codigo code={ESQUEMA} kind="json" etiqueta="acciones.json" rango={[19, 25]} />
        <div className="mt-4">
          <AntesDespues
            orden="tareas ejecutar limpiar-temporales ~/pruebas-tareas/Descargas"
            aviso="pregunta antes de borrar"
            antes={{
              titulo: "Antes de limpiar",
              raiz: "Descargas/",
              nodos: [...ficheros(DESCARGAS.slice(0, 4)), { nombre: "viejo.tmp", nivel: 0, tono: "rosa", nota: "40 días" }],
            }}
            despues={{ titulo: "Después de limpiar", raiz: "Descargas/", nodos: ficheros(DESCARGAS.slice(0, 4)) }}
          />
        </div>
      </Bloque>

      <Bloque titulo="Campo a campo" nivel={3}>
        <AnatomiaAccion />
      </Bloque>

      <Bloque titulo="Campos de la raíz y obligatorios" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {CAMPOS.slice(0, 5).map((c) => (
            <TarjetaCampo key={c[0]} campo={c} />
          ))}
        </div>
      </Bloque>

      <Bloque titulo="Campos según el tipo de acción" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {CAMPOS.slice(5).map((c) => (
            <TarjetaCampo key={c[0]} campo={c} />
          ))}
        </div>
      </Bloque>

      <Bloque titulo="Tipos de acción" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TIPOS.map(([t, q, u], i) => (
            <Tarjeta key={t} titulo={t} nivel={4} mono suave={i === TIPOS.length - 1} tono={i < 4 ? "azul" : "morado"} className="!p-4">
              <p>
                <b>Qué le pasa al fichero:</b> {q}
              </p>
              <p className="mt-1">
                <b>Para qué en tu vida real:</b> {u}
              </p>
            </Tarjeta>
          ))}
        </div>
      </Bloque>

      <Bloque
        titulo="Filtros: qué ficheros se tocan"
        nivel={3}
        entradilla={
          <>
            Dentro de <C>filtro</C>. Si pones varios, el fichero tiene que cumplirlos <b>todos</b>.
          </>
        }
      >
        <EmbudoFiltro />
      </Bloque>

      <Bloque titulo="Los cuatro filtros" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {FILTROS.map(([f, e, q]) => (
            <Tarjeta key={f} titulo={`"${f}"`} nivel={4} mono className="!p-4">
              <p>
                Ej.: <C>{e}</C>
              </p>
              <p className="mt-1">{q}</p>
            </Tarjeta>
          ))}
        </div>
      </Bloque>

      <Bloque
        titulo="Plantillas de nombre"
        nivel={3}
        entradilla={
          <>
            Para <C>renombrar</C>. Son huecos entre llaves que el motor rellena con el formato de Python (
            <C>str.format</C>): lo de detrás de los dos puntos es el formato.
          </>
        }
      >
        <Anatomia
          etiqueta="La plantilla de renombrar-fotos, hueco a hueco"
          partes={[
            { texto: "{fecha:%Y-%m-%d}", nombre: "→ 2026-11-03", tono: "azul" },
            { texto: "_", nombre: "tal cual", tono: "gris" },
            { texto: "{n:03}", nombre: "→ 001", tono: "morado" },
            { texto: "{ext}", nombre: "→ .jpg", tono: "verde" },
          ]}
        />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PLANTILLAS.map(([h, r, q]) => (
            <Tarjeta key={h} titulo={h} nivel={4} mono className="!p-4">
              <p>
                <Chip tono="azul">da {r}</Chip>
              </p>
              <p className="mt-2">{q}</p>
            </Tarjeta>
          ))}
        </div>
      </Bloque>

      <Aviso titulo="Reto: 3 acciones para TU vida real">
        <p>
          Al final tendrás <b>3 acciones que te ahorran tiempo a ti</b> (las del ejemplo no cuentan). La{" "}
          <b>primera la escribes ahora, a mano</b>; la 2.ª y la 3.ª las añadirás en el paso 5 con tu comando{" "}
          <C>/nueva-accion</C>. Ideas, de menos a más difícil:
        </p>
        <ol className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {IDEAS.map(([nivel, d]) => (
            <li key={nivel} className="rounded-xl border border-amber-300 bg-white p-4 text-base dark:border-amber-500/40 dark:bg-slate-900">
              <b className="block text-lg">{nivel}</b>
              {d}
            </li>
          ))}
        </ol>
        <p>
          Después, añade al README una sección <b>«Esquema de acciones.json»</b> con la tabla de campos (la tuya, no la de
          esta página si has cambiado algo). Si el esquema no está escrito, el agente se lo inventa: en el paso siguiente se
          lo enseñas.
        </p>
      </Aviso>

      {/* ───────────── PASO 2 ───────────── */}
      <Paso
        id="paso-2"
        n={2}
        titulo="Tu primera skill: enseña el esquema"
        entradilla={
          <>
            Si en cada prompt tuvieras que pegar tu esquema entero, acabarías harto y, peor, una vez se te olvidaría. Para eso
            existen las <b>skills</b>: un fichero Markdown con conocimiento concreto (cómo es tu <C>acciones.json</C> y qué
            reglas sigue el código que lo lee) que el agente <b>carga cuando lo necesita</b>.
          </>
        }
      >
        <CargaSkill />
      </Paso>

      <Bloque
        titulo="Cuatro formas de personalizar OpenCode"
        nivel={3}
        entradilla="Antes de crearla, el mapa de lo que puedes poner en tu repo para personalizar a OpenCode:"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {PERSONALIZAR.map(([pz, d, q, pq]) => (
            <Tarjeta key={pz} titulo={pz} nivel={4} className="!p-4">
              <p className="font-mono text-zinc-900 [overflow-wrap:anywhere] dark:text-zinc-100">{d}</p>
              <p className="mt-1">
                <b>Quién la activa:</b> {q}
              </p>
              <p className="mt-1">
                <b>Para qué:</b> {pq}
              </p>
            </Tarjeta>
          ))}
        </div>
      </Bloque>

      <Bloque
        titulo="Dónde vive cada pieza"
        nivel={3}
        entradilla={
          <>
            Crea la carpeta <C>.opencode/skills/acciones-json/</C> y dentro el fichero <C>SKILL.md</C> (en mayúsculas).
            Adáptalo a <b>tu</b> esquema si has cambiado campos.
          </>
        }
      >
        <Arbol raiz="cli-tareas/" nodos={ESTRUCTURA_OPENCODE} />
      </Bloque>

      <Bloque titulo="La skill acciones-json" nivel={3}>
        <Codigo code={SKILL_MD} kind="md" etiqueta=".opencode/skills/acciones-json/SKILL.md" />
      </Bloque>

      <Bloque titulo="Cómo está hecha una skill" nivel={3}>
        <Rejilla items={PIEZAS_SKILL} />
        <p className={`mt-4 ${cls.texto}`}>Más detalle en la guía: {enlaceGuia("skills", "Skills: conocimiento bajo demanda")}.</p>
      </Bloque>

      <Bloque titulo="¿AGENTS.md o skill?" nivel={3}>
        <DosColumnas
          nivel={4}
          centro="o"
          a={{
            antetitulo: "AGENTS.md",
            titulo: "Siempre",
            tono: "gris",
            puntos: [
              "Entra en cada conversación.",
              <>
                Normas generales: stack, <C>pathlib</C>, «no hagas push».
              </>,
            ],
          }}
          b={{
            antetitulo: "Skill",
            titulo: "Solo cuando hace falta",
            tono: "morado",
            puntos: ["El conocimiento detallado de una parte del proyecto.", "Aquí: tu esquema de acciones.json."],
          }}
        />
        <p className={`mt-4 text-lg ${cls.texto}`}>
          Con los modelos del centro el contexto cuesta, así que <b>AGENTS.md corto y el detalle en skills</b>.
        </p>
      </Bloque>

      <Bloque titulo="Compruébalo con /skills" nivel={3}>
        <ol className={`list-decimal space-y-2 pl-6 text-lg ${cls.texto}`}>
          <li>
            Sal de OpenCode y vuelve a abrirlo en la carpeta del repo (o <C>opencode reload</C>): con la config ya cargada
            puede seguir sin ver la skill.
          </li>
          <li>
            Escribe <C>/skills</C>: tiene que aparecer <C>acciones-json</C>.
          </li>
          <li>Y a git, que la skill es parte de tu proyecto:</li>
        </ol>
        <div className="mt-4">
          <Codigo
            code={'git add .opencode/skills/acciones-json/SKILL.md\ngit commit -m "Skill acciones-json: el agente carga las reglas de mi esquema"'}
          />
        </div>
      </Bloque>

      {/* ───────────── PASO 3 ───────────── */}
      <Paso
        id="paso-3"
        n={3}
        titulo="Valida antes de ejecutar, con el agente"
        entradilla={
          <>
            Un programa que borra ficheros no puede fiarse de un JSON escrito a mano. Primero se comprueba <b>todo</b> el
            fichero y solo si está bien se toca el disco. Y cuando algo falla, el mensaje tiene que decir{" "}
            <b>qué acción y qué campo</b>:
          </>
        }
      >
        <DosColumnas
          a={{
            antetitulo: "No sirve",
            titulo: "Mensaje genérico",
            tono: "rosa",
            puntos: [<C key="m">Error en la configuración</C>, "No dice qué acción ni qué campo: a buscar a ciegas."],
          }}
          b={{
            antetitulo: "Te lo arregla en 10 segundos",
            titulo: "Mensaje que dice dónde",
            tono: "verde",
            puntos: [<C key="m">Acción «renombrar-fotos», campo «plantilla»: es obligatorio en acciones de tipo renombrar</C>],
          }}
        />
      </Paso>

      <Bloque
        titulo="Validar: primero, el plan"
        nivel={3}
        entradilla={
          <>
            Abre una sesión nueva (<C>/new</C>) y pasa al agente <b>plan</b> con <Teclas combo="shift+tab" />. Fíjate en lo
            corto que es el prompt: <C>@acciones.json</C> adjunta tu fichero y la skill pone el resto.
          </>
        }
      >
        <Prompt text={PROMPT_VALIDAR_PLAN} etiqueta="Prompt · agente plan" />
        <p className={`mt-4 text-lg ${cls.texto}`}>
          Lee el plan. ¿Ha entendido tu esquema? ¿Se olvida de algún caso (nombre repetido, regex rota)? Corrígelo ahí mismo.
        </p>
      </Bloque>

      <Bloque
        titulo="Validar: después, build"
        nivel={3}
        entradilla={
          <>
            Cuando el plan te convenza, <Teclas combo="shift+tab" /> para pasar a <b>build</b>:
          </>
        }
      >
        <Prompt text={PROMPT_VALIDAR_BUILD} etiqueta="Prompt · agente build" />
        <ul className="mt-4 space-y-3">
          <Regla tipo="ask" regla="edit · *">
            Con tu opencode.json de la Sesión 1, cada edición te pide permiso: lee el diff antes de aceptar.
          </Regla>
          <Regla tipo="allow" regla="shell · uv run tareas validar *">
            Esta sí la puede ejecutar solo: está en tu lista de órdenes permitidas.
          </Regla>
        </ul>
      </Bloque>

      <Bloque
        titulo="Las excepciones heredan"
        nivel={3}
        entradilla="Para auditar, esto es lo que deberías obtener. Las excepciones heredan unas de otras:"
      >
        <Excepciones />
      </Bloque>

      <Bloque titulo="errores.py de referencia" nivel={3}>
        <Codigo code={ERRORES_PY} kind="py" etiqueta="src/tareas/errores.py" />
      </Bloque>

      <Bloque
        titulo="config.py: cargar el fichero"
        nivel={3}
        entradilla={
          <>
            Y así es, resumido, <C>config.py</C>. No lo copies: es la referencia para comparar con lo que te haya hecho el
            agente.
          </>
        }
      >
        <Codigo code={CONFIG_PY} kind="py" etiqueta="src/tareas/config.py (resumido)" rango={[8, 24]} />
      </Bloque>

      <Bloque titulo="config.py: acción a acción" nivel={3}>
        <Codigo code={CONFIG_PY} kind="py" etiqueta="src/tareas/config.py (resumido)" rango={[26, 39]} />
      </Bloque>

      <Bloque titulo="config.py: ¿la regex compila?" nivel={3}>
        <Codigo code={CONFIG_PY} kind="py" etiqueta="src/tareas/config.py (resumido)" rango={[40, 46]} />
      </Bloque>

      <Bloque
        titulo="Pruébalo y mira el código de salida"
        nivel={3}
        entradilla={
          <>
            En tu terminal, o desde OpenCode con <C>!</C> delante:
          </>
        }
      >
        <Codigo code={"uv run tareas validar\necho $?        # Linux/macOS: 0 si es válido, 3 si no\n$LASTEXITCODE   # lo mismo en PowerShell"} />
      </Bloque>

      <Bloque
        titulo="Casos feos que pruebas TÚ"
        nivel={3}
        entradilla={
          <>
            Haz una copia (<C>pruebas/roto.json</C>), estropéala a propósito de cada una de estas formas y ejecuta{" "}
            <C>uv run tareas --config pruebas/roto.json validar</C>. Ninguno puede acabar en traceback. Si alguno falla,
            explícaselo al agente con el mensaje que has visto, no con «no va».
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {CASOS_FEOS.map(([c, h, d]) => (
            <Tarjeta key={c} titulo={c} nivel={4} tono="rosa" className="!p-4">
              <p>
                <C>{h}</C>
              </p>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">Debe decir: {d}</p>
            </Tarjeta>
          ))}
        </div>
      </Bloque>

      {/* ───────────── PASO 4 ───────────── */}
      <Paso
        id="paso-4"
        n={4}
        titulo="El motor y las acciones en clases"
        entradilla={
          <>
            Aquí aparecen las clases de verdad. Una <b>clase base</b> <C>Accion</C> define lo que toda acción sabe hacer (
            <C>ejecutar</C>) y cada <b>subclase</b> (<C>Mover</C>, <C>Copiar</C>, <C>Renombrar</C>, <C>Borrar</C>) solo
            implementa lo suyo en <C>aplicar</C>. El método estático <C>Accion.desde_config(dict)</C> es una <b>fábrica</b>:
            gracias a ella, el motor no tiene ni un <C>if tipo == …</C>, y añadir un tipo nuevo es escribir una subclase más.
          </>
        }
      >
        <Fabrica />
      </Paso>

      <Bloque
        titulo="El motor elige, la acción aplica"
        nivel={3}
        entradilla={
          <>
            El <C>Motor</C> recibe la carpeta de la orden (o el <C>origen</C> de la acción), <b>selecciona</b> los ficheros que
            cumplen el filtro y se los pasa a la acción, que devuelve un informe: una lista de <C>Resultado</C> (qué fichero,
            a qué destino, en qué estado). El estado es uno de estos tres:
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="hecho" nivel={4} mono tono="verde" className="!p-4">
            La acción ha tocado el disco de verdad.
          </Tarjeta>
          <Tarjeta titulo="simulado" nivel={4} mono tono="azul" className="!p-4">
            Con <C>--simular</C>: dice qué haría, sin tocar nada.
          </Tarjeta>
          <Tarjeta titulo="saltado" nivel={4} mono tono="gris" className="!p-4">
            No había nada que hacer: al renombrar, el nombre nuevo es el que ya tenía.
          </Tarjeta>
        </div>
      </Bloque>

      <Bloque
        titulo="Motor: plan y luego build"
        nivel={3}
        entradilla={
          <>
            Sesión nueva (<C>/new</C>). Primero en <b>plan</b>; cuando el plan te cuadre, en <b>build</b>:
          </>
        }
      >
        <Prompt
          etiqueta="Prompt · agente plan"
          text="Carga la skill acciones-json y explícame cómo harías acciones.py y motor.py: clases, métodos y cómo garantizas que --simular no toca el disco"
        />
        <div className="mt-4">
          <Prompt text={PROMPT_MOTOR_BUILD} etiqueta="Prompt · agente build" />
        </div>
      </Bloque>

      <Aviso titulo="Reglas que auditas tú">
        <p>
          Están en tu AGENTS.md y en la skill, pero <b>que el agente las conozca no significa que las cumpla</b>:
        </p>
        <ul className="grid list-disc grid-cols-1 gap-x-8 gap-y-1.5 pl-5 lg:grid-cols-2">
          {REGLAS_AUDITA.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
        <p>
          Cada «esto no lo cumple» es un error que le pides corregir y un buen párrafo para <C>docs/prompts.md</C>.
        </p>
      </Aviso>

      <Bloque titulo="acciones.py: Resultado y destino_libre" nivel={3} entradilla="Código de referencia resumido para auditar:">
        <Codigo code={ACCIONES_PY} kind="py" etiqueta="src/tareas/acciones.py (resumido)" rango={[13, 26]} />
      </Bloque>

      <Bloque titulo="acciones.py: la clase base Accion" nivel={3}>
        <Codigo code={ACCIONES_PY} kind="py" etiqueta="src/tareas/acciones.py (resumido)" rango={[29, 49]} />
      </Bloque>

      <Bloque titulo="acciones.py: ejecutar, aplicar y Mover" nivel={3}>
        <Codigo code={ACCIONES_PY} kind="py" etiqueta="src/tareas/acciones.py (resumido)" rango={[51, 67]} />
      </Bloque>

      <Bloque titulo="acciones.py: Renombrar" nivel={3}>
        <Codigo code={ACCIONES_PY} kind="py" etiqueta="src/tareas/acciones.py (resumido)" rango={[70, 83]} />
      </Bloque>

      <Bloque titulo="acciones.py: Borrar, y Copiar" nivel={3}>
        <Codigo code={ACCIONES_PY} kind="py" etiqueta="src/tareas/acciones.py (resumido)" rango={[86, 95]} />
      </Bloque>

      <Bloque titulo="motor.py: la clase Motor" nivel={3}>
        <Codigo code={MOTOR_PY} kind="py" etiqueta="src/tareas/motor.py (resumido)" rango={[10, 21]} />
      </Bloque>

      <Bloque titulo="motor.py: el filtro, fichero a fichero" nivel={3}>
        <Codigo code={MOTOR_PY} kind="py" etiqueta="src/tareas/motor.py (resumido)" rango={[22, 34]} />
      </Bloque>

      <Bloque titulo="motor.py: ejecutar una acción" nivel={3}>
        <Codigo code={MOTOR_PY} kind="py" etiqueta="src/tareas/motor.py (resumido)" rango={[36, 44]} />
      </Bloque>

      <Bloque titulo="La interfaz: acciones, ejecutar y opciones" nivel={3} entradilla="La CLI es la capa fina que une todo. La orden que hace el trabajo:">
        <Anatomia
          etiqueta="Partes de la orden tareas ejecutar"
          partes={[
            { texto: "tareas", nombre: "programa", tono: "gris" },
            { texto: "ejecutar", nombre: "orden", tono: "azul" },
            { texto: "ordenar-descargas", nombre: "NOMBRE de la acción", tono: "morado" },
            { texto: "~/pruebas-tareas/Descargas", nombre: "[CARPETA], opcional", tono: "verde" },
            { texto: "--simular", nombre: "opción", tono: "ambar" },
          ]}
        />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="tareas acciones" nivel={4} mono className="!p-4">
            Tabla con nombre, tipo y descripción de lo que hay en acciones.json.
          </Tarjeta>
          <Tarjeta titulo="--simular · --si" nivel={4} mono className="!p-4">
            Enseña qué haría sin tocar nada · no pedir confirmación.
          </Tarjeta>
          <Tarjeta titulo="--config RUTA" nivel={4} mono className="!p-4">
            Opción global: va <b>antes</b> de la orden (<C>tareas --config otra.json acciones</C>). Por defecto,{" "}
            <C>./acciones.json</C>.
          </Tarjeta>
        </div>
      </Bloque>

      <Bloque titulo="Códigos de salida" nivel={3}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CODIGOS_SALIDA.map(([c, s]) => (
            <div key={c} className={`${cls.tarjeta} min-w-0 !p-4`}>
              <h4 className="font-mono text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">Sale con {c}</h4>
              <p className={`mt-2 ${cls.texto}`}>{s}</p>
            </div>
          ))}
        </div>
      </Bloque>

      <Bloque titulo="Interfaz: plan y luego build" nivel={3} entradilla="Sesión nueva, plan y luego build con:">
        <Prompt text={PROMPT_CLI} etiqueta="Prompt · agente build" />
      </Bloque>

      <Bloque titulo="cli.py: --config para todas las órdenes" nivel={3}>
        <Codigo code={CLI_PY} kind="py" etiqueta="src/tareas/cli.py (fragmento)" rango={[1, 7]} />
      </Bloque>

      <Bloque
        titulo="cli.py: una sola captura para todo"
        nivel={3}
        entradilla="El fragmento clave de cli.py: fíjate en cómo se captura una sola excepción base para todo."
      >
        <Codigo code={CLI_PY} kind="py" etiqueta="src/tareas/cli.py (fragmento)" rango={[10, 27]} />
      </Bloque>

      <Bloque
        titulo="Lo que deberías ver"
        nivel={3}
        entradilla="Fíjate en el sufijo « (1)»: ya había una factura.pdf en el destino."
      >
        {/* La tabla de Rich no se puede partir: en móvil se desliza. */}
        <div className="overflow-x-auto">
          <Terminal titulo="tareas ejecutar --simular" lineas={SALIDA_TERMINAL} />
        </div>
      </Bloque>

      <Aviso titulo="Las acciones las ejecutas TÚ, no el agente" tono="rosa">
        <ul>
          <Regla tipo="ask" regla="shell · *">
            En tu opencode.json, uv run tareas ejecutar … no está entre las permitidas: si el agente quiere lanzarla, OpenCode
            te pregunta.
          </Regla>
        </ul>
        <p>
          <b>Recházalo</b>: podría mover tus ficheros reales. Las pruebas las haces tú, en tu terminal o con{" "}
          <C>!uv run tareas …</C> dentro de OpenCode.
        </p>
      </Aviso>

      <Aviso titulo="Regla de oro: --simular primero">
        <p>
          Prueba <b>siempre</b> primero en <C>~/pruebas-tareas</C> y con <C>--simular</C>. Nunca sobre tu carpeta de
          Descargas de verdad hasta que la simulación diga exactamente lo que esperas.
        </p>
        <p>
          Mientras desarrollas, usa <C>uv run tareas …</C> desde la carpeta del repo (ejecuta tu código actual sin
          reinstalar).
        </p>
      </Aviso>

      <Aviso titulo="Ojo con el destino">
        <p>
          La carpeta de pruebas protege el <b>origen</b>, pero <C>destino</C> sigue apuntando a tus carpetas reales (
          <C>~/Documentos/PDF</C>).
        </p>
        <p>
          Mientras pruebas, cambia también el destino a algo como <C>~/pruebas-tareas/Documentos/PDF</C> en tu{" "}
          <C>acciones.json</C> (o usa un <C>--config</C> de pruebas) y vuelve a tus rutas reales solo cuando todo funcione.
        </p>
      </Aviso>

      <Bloque titulo="Pruebas en Linux y macOS (bash/zsh)" nivel={3}>
        <Codigo code={PRUEBAS_BASH} etiqueta="Terminal · bash / zsh" />
      </Bloque>

      <Bloque titulo="Pruebas en Windows (PowerShell)" nivel={3}>
        <Codigo code={PRUEBAS_PS} etiqueta="Terminal · PowerShell" />
      </Bloque>

      {/* ───────────── PASO 5 ───────────── */}
      <Paso
        id="paso-5"
        n={5}
        titulo="Tu comando /nueva-accion"
        entradilla={
          <>
            Añadir una acción siempre sigue los mismos pasos: proponer el JSON, revisarlo, validar y probar con{" "}
            <span className="whitespace-nowrap">
              <C>--simular</C>.
            </span>{" "}
            Cuando repites un prompt, lo conviertes en un <b>comando personalizado</b>: un fichero Markdown
            en <C>.opencode/commands/</C> que se invoca con <C>/</C> y su nombre.
          </>
        }
      >
        <RecorridoComando />
      </Paso>

      <Bloque
        titulo="nueva-accion.md"
        nivel={3}
        entradilla={
          <>
            Crea <C>.opencode/commands/nueva-accion.md</C>:
          </>
        }
      >
        <Codigo code={NUEVA_ACCION_MD} kind="md" etiqueta=".opencode/commands/nueva-accion.md" />
      </Bloque>

      <Bloque titulo="Piezas del comando" nivel={3}>
        <Rejilla items={PIEZAS_COMANDO} columnas={3} />
        <p className={`mt-4 ${cls.texto}`}>Más detalle en la guía: {enlaceGuia("comandos", "Comandos personalizados")}.</p>
      </Bloque>

      <Bloque
        titulo="Úsalo para tu 2.ª acción"
        nivel={3}
        entradilla={
          <>
            Vuelve a abrir OpenCode (o <C>opencode reload</C>) y lánzalo en la caja de entrada:
          </>
        }
      >
        <Prompt etiqueta="Caja de entrada de OpenCode" text={'/nueva-accion renombrar-capturas "renombra capturas de pantalla con su fecha"'} />
        <div className="mt-4">
          <Anatomia
            etiqueta="Partes del comando /nueva-accion"
            partes={[
              { texto: "/nueva-accion", nombre: "el comando", tono: "azul" },
              { texto: "renombrar-capturas", nombre: "$1", tono: "morado" },
              { texto: '"renombra capturas de pantalla con su fecha"', nombre: "$2", tono: "verde" },
            ]}
          />
        </div>
      </Bloque>

      <Bloque
        titulo="Antes de dar el visto bueno"
        nivel={3}
        entradilla="Lee la entrada JSON que te propone y corrige lo que no te guste antes de dar el visto bueno:"
      >
        <Checklist
          items={[
            { texto: "¿El filtro coge solo las capturas?" },
            { texto: "¿La plantilla es la que tú quieres?" },
            {
              texto: (
                <>
                  ¿El destino está en <C>~/pruebas-tareas</C> mientras pruebas?
                </>
              ),
            },
          ]}
        />
        <p className={`mt-5 text-lg ${cls.texto}`}>
          Al final te dirá qué orden con <C>--simular</C> debes probar: <b>la ejecutas tú</b>. Repite con tu{" "}
          <b>3.ª acción</b> (una idea tuya, no un ejemplo de esta página).
        </p>
      </Bloque>

      <Aviso titulo="El comando ahorra escribir, no decidir" tono="verde">
        <p>
          Las 3 acciones tienen que ser tuyas: qué hacen, con qué ficheros y por qué te sirven. En la defensa te preguntaré
          por ellas.
        </p>
      </Aviso>

      {/* ───────────── PASO 6 ───────────── */}
      <Paso
        id="paso-6"
        n={6}
        titulo="Tu subagente revisor"
        entradilla={
          <>
            El agente que escribe el código no es el mejor para revisarlo: ya está convencido de que está bien. Un{" "}
            <b>subagente</b> es otro agente, con su propio prompt y sus propios permisos, que trabaja en una conversación
            aparte y devuelve el resultado. Crea <C>.opencode/agents/revisor.md</C>:
          </>
        }
      >
        <PuedeRevisor />
      </Paso>

      <Bloque titulo="revisor.md" nivel={3}>
        <Codigo code={REVISOR_MD} kind="md" etiqueta=".opencode/agents/revisor.md" />
      </Bloque>

      <Bloque titulo="Cómo está hecho el revisor" nivel={3}>
        <Rejilla
          columnas={3}
          items={[
            ["revisor.md → revisor", <>El nombre del fichero es el id del agente.</>],
            [
              "mode: subagent",
              <>
                No aparece al cambiar con <Teclas combo="shift+tab" /> (eso es para plan y build). Se le pide con palabras, o
                el agente principal lo lanza solo si su <C>description</C> encaja con lo que necesita.
              </>,
            ],
            ["El cuerpo, su prompt", <>Qué revisar y en qué formato responder.</>],
          ]}
        />
      </Bloque>

      <Bloque
        titulo="Los permisos del revisor"
        nivel={3}
        entradilla={
          <>
            <C>permissions</C> es una lista de reglas (acción · recurso). Va primero la general y después las excepciones:
            gana la última que coincide.
          </>
        }
      >
        <ul className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
          <Regla tipo="deny" regla="edit · *">
            No puede editar ningún fichero: solo lectura.
          </Regla>
          <Regla tipo="deny" regla="webfetch · *">
            No puede navegar por la web.
          </Regla>
          <Regla tipo="deny" regla="shell · *">
            Ninguna orden de la terminal…
          </Regla>
          <Regla tipo="allow" regla="shell · git diff *">
            …salvo ver los cambios,
          </Regla>
          <Regla tipo="allow" regla="shell · git log *">
            el historial
          </Regla>
          <Regla tipo="allow" regla="shell · git status *">
            y qué ficheros han cambiado.
          </Regla>
        </ul>
        <p className={`mt-5 text-lg ${cls.texto}`}>
          Aunque quisiera, no puede «arreglarte» nada ni ejecutar tus acciones.
        </p>
      </Bloque>

      <Bloque
        titulo="Cómo se usa el revisor"
        nivel={3}
        entradilla={
          <>
            Sal y vuelve a abrir OpenCode (en la terminal, <C>opencode debug agents</C> debe mostrar <C>revisor</C>). Se usa
            pidiéndoselo con palabras:
          </>
        }
      >
        <Prompt etiqueta="Caja de entrada de OpenCode" text="Usa el subagente revisor para revisar src/tareas/motor.py" />
        <p className={`mt-4 text-lg ${cls.texto}`}>
          Además, OpenCode trae <C>/review</C>, que revisa los <b>cambios sin commitear</b>. La rutina a partir de hoy:{" "}
          <b>
            antes de cada commit de código, <C>/review</C> o el revisor
          </b>
          .
        </p>
        <p className={`mt-3 ${cls.texto}`}>Más detalle en la guía: {enlaceGuia("agentes", "Agentes y subagentes")}.</p>
      </Bloque>

      <Aviso titulo="Tú decides qué se arregla" tono="ambar">
        <p>
          El revisor también se equivoca: a veces ve fallos que no existen o propone cosas que no tocan esta semana. Por cada
          punto, compruébalo (léelo, pruébalo en <C>~/pruebas-tareas</C>) y decide: lo arreglas (con build, en otra
          petición), lo apuntas como mejora en el README o lo descartas sabiendo por qué.
        </p>
        <p>Y contesta tú la pregunta que te hace al final.</p>
      </Aviso>

      {/* ───────────── PASO 7 ───────────── */}
      <Paso
        id="paso-7"
        n={7}
        titulo="Tu primer ADR"
        entradilla={
          <>
            Un <b>ADR</b> (<i>Architecture Decision Record</i>, registro de decisión de arquitectura) es un documento corto que
            cuenta <b>una</b> decisión técnica importante: qué decidiste, por qué y qué alternativas descartaste. Se escribe
            para la persona que llegue dentro de seis meses (muchas veces, tú mismo) y se pregunte «¿por qué narices está hecho
            así?». Los equipos profesionales los guardan numerados en <C>docs/adr/</C>. Tu primera decisión es la de esta
            semana: crea <C>docs/adr/0001-configuracion-externa.md</C> y <b>termínalo con TUS razones</b> (los huecos{" "}
            <C>[...]</C>).
          </>
        }
      >
        <PartesAdr />
      </Paso>

      <Bloque titulo="ADR: contexto y decisión" nivel={3}>
        <Codigo code={ADR} kind="md" etiqueta="docs/adr/0001-configuracion-externa.md" rango={[1, 19]} />
      </Bloque>

      <Bloque titulo="ADR: alternativas y consecuencias" nivel={3}>
        <Codigo code={ADR} kind="md" etiqueta="docs/adr/0001-configuracion-externa.md" rango={[21, 39]} />
      </Bloque>

      <Bloque
        titulo="El agente, abogado del diablo"
        nivel={3}
        entradilla={
          <>
            Puedes usar al agente en <b>plan</b> (no puede editar) como abogado del diablo:
          </>
        }
      >
        <Prompt
          etiqueta="Prompt · agente plan"
          text="Lee @docs/adr/0001-configuracion-externa.md y dame 3 argumentos en contra de mi decisión y una alternativa que no haya considerado"
        />
        <p className={`mt-4 text-lg ${cls.texto}`}>
          Pero <b>el texto final es tuyo</b>: en la defensa te preguntaré por él.
        </p>
      </Bloque>

      {/* ───────────── PASO 8 ───────────── */}
      <Paso
        id="paso-8"
        n={8}
        titulo="Audita, prueba y commitea"
        entradilla={
          <>
            «Lo que no sabes explicar, no lo entregas». Antes de dar por buena cada acción, pasa esta auditoría en{" "}
            <C>~/pruebas-tareas</C>:
          </>
        }
      >
        <Rejilla items={AUDITORIA.slice(0, 4)} />
      </Paso>

      <Bloque titulo="Más preguntas de la auditoría" nivel={3}>
        <Rejilla items={AUDITORIA.slice(4)} />
      </Bloque>

      <Bloque
        titulo="Prueba en otro sistema si puedes"
        nivel={3}
        entradilla={
          <>
            En el aula tienes Linux; si en casa usas Windows o macOS, clona el repo allí y repite los bloques de prueba del
            paso 4. Los fallos típicos aparecen aquí:
          </>
        }
      >
        <Rejilla items={OTRO_SISTEMA} columnas={3} />
        <p className={`mt-4 text-lg ${cls.texto}`}>Cada fallo que encuentres y arregles es un commit con historia.</p>
      </Bloque>

      <Bloque
        titulo="Un commit por pieza, hecho por ti"
        nivel={3}
        entradilla={
          <>
            El agente no hace commits ni push: se lo prohíbe tu AGENTS.md, y tu <C>opencode.json</C> bloquea el push y te
            pregunta antes de cualquier commit.
          </>
        }
      >
        <CommitsSemana mensajes={MENSAJES_COMMIT} />
      </Bloque>

      <Bloque
        titulo="Tus commits, del 1 al 5"
        nivel={3}
        entradilla={
          <>
            Los ficheros de <C>.opencode/</C> también se commitean: son parte de tu proyecto. Algo así, con tus palabras:
          </>
        }
      >
        <Codigo code={COMMITS} etiqueta="Terminal · commits de la semana" rango={[1, 14]} />
      </Bloque>

      <Bloque titulo="Tus commits, del 6 al 10" nivel={3}>
        <Codigo code={COMMITS} etiqueta="Terminal · commits de la semana" rango={[16, 30]} />
      </Bloque>

      <Aviso titulo="docs/prompts.md: la prueba de que auditaste" tono="azul">
        <p>
          En <C>docs/prompts.md</C>, los prompts de la validación, del motor y de la CLI, con una línea por prompt de{" "}
          <b>qué tuviste que corregir</b> de lo que hizo el agente y qué te señaló el revisor.
        </p>
      </Aviso>

      {/* ───────────── CIERRE ───────────── */}
      <Bloque id="checklist" titulo="Checklist de la semana" entradilla="Los ocho pasos de un vistazo, y lo que tiene que estar hecho al acabar:">
        <SemanaPasos />
      </Bloque>

      <Bloque titulo="Checklist: tu herramienta" nivel={3}>
        <Checklist items={CHECKLIST.slice(0, 6).map((texto) => ({ texto }))} />
      </Bloque>

      <Bloque titulo="Checklist: tu proceso" nivel={3}>
        <Checklist items={CHECKLIST.slice(6).map((texto) => ({ texto }))} />
      </Bloque>

      <Bloque
        id="rubrica"
        titulo="Lo que cuenta en la rúbrica"
        entradilla={
          <>
            Antes que nada, los <b>4 mínimos</b> de {RUBRICA_CLI.titulo.replace("Rúbrica · ", "")}: si falla uno, el proyecto
            no se evalúa. Esta semana ya puedes cumplir el segundo y avanzar mucho en el cuarto.
          </>
        }
      >
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {RUBRICA_CLI.minimos.map((m, i) => (
            <li key={m.id} className={`${cls.tarjeta} flex gap-3 !p-4`}>
              <span aria-hidden className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-extrabold ${TONO.rosa.disco}`}>
                {i + 1}
              </span>
              <span className={cls.texto}>
                {m.texto}
                {i === 1 ? (
                  <span className="mt-2 block">
                    <Chip tono="verde">esta semana lo cumples</Chip>
                  </span>
                ) : i === 3 ? (
                  <span className="mt-2 block">
                    <Chip tono="azul">esta semana avanzas mucho</Chip>
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ol>
      </Bloque>

      <Bloque titulo="Peso de cada criterio" nivel={3} entradilla="Y estos criterios se juegan casi enteros con el trabajo de hoy:">
        <PesosRubrica />
      </Bloque>

      {CRITERIOS_SEMANA.map((grupo) => (
        <Bloque key={grupo.titulo} titulo={grupo.titulo} nivel={3}>
          <div className="space-y-6">
            {grupo.criterios.map(([id, nivel]) => {
              const c = criterio(id);
              return (
                <CriterioRubrica
                  key={id}
                  nombre={c.nombre}
                  peso={c.peso}
                  que={c.qué}
                  niveles={RUBRICA_CLI.niveles}
                  descriptores={c.niveles}
                  resaltar={nivel}
                />
              );
            })}
          </div>
        </Bloque>
      ))}

      <Bloque id="despues" titulo="Qué viene después">
        <DondeEstas />
      </Bloque>

      <Bloque titulo="Las próximas semanas" nivel={3}>
        <LineaTiempo hitos={DESPUES} />
      </Bloque>

      <nav className="mt-16 flex max-w-[1100px] flex-col gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:flex-wrap sm:justify-between dark:border-white/10">
        {[
          ["/programacion-ia/cli/sesion-01/", "← Sesión 1 · Arranque: la terminal y tu primera orden"],
          ["/programacion-ia/opencode/", "Guía de OpenCode"],
          ["/programacion-ia/cli/", "Portada del proyecto CLI tareas con IA →"],
        ].map(([href, t]) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl border border-zinc-200 px-4 py-3 text-base font-semibold text-blue-700 hover:bg-zinc-50 dark:border-white/10 dark:text-blue-300 dark:hover:bg-white/5"
          >
            {t}
          </Link>
        ))}
      </nav>
    </div>
  );
}
