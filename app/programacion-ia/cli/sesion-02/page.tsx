import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PromptBlock from "@/components/PromptBlock";
import CodeBlock from "@/components/CodeBlock";
import { highlightCode } from "@/lib/highlight";
import { RUBRICA_CLI } from "@/lib/campus/rubricas";

export const metadata: Metadata = {
  title: "Sesión 2 · Acciones predefinidas: acciones.json y el motor — CLI tareas con IA",
  description:
    "Semana 2 (2-6 nov): diseñas acciones.json y, con OpenCode, creas una skill, un comando y un subagente revisor; el agente programa el motor y tú lo auditas.",
};

/* ───────────── estilos compartidos ───────────── */
const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";
const meta =
  "rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 px-3 py-1 text-[12px] font-semibold text-zinc-700 dark:text-zinc-300";
const card = "rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm";
const h2 = "mt-12 text-2xl font-extrabold tracking-tight";
const p = "mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300";
const code = "rounded bg-zinc-100 px-1 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-white/10 dark:text-zinc-200";
const aviso =
  "my-5 rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-5 text-[15px] text-amber-900 dark:text-amber-200";
const nota =
  "my-5 rounded-2xl border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 p-5 text-[15px] text-sky-900 dark:text-sky-200";
const th = "px-3 py-2 text-left text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400";
const td = "px-3 py-2.5 align-top text-zinc-700 dark:text-zinc-300";
const tabla = "mt-3 overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/10";
const fila = "border-t border-zinc-100 first:border-t-0 dark:border-white/5";

function C({ children }: { children: React.ReactNode }) {
  return <code className={code}>{children}</code>;
}

function Codigo({ src, lang }: { src: string; lang: string }) {
  const h = highlightCode(src, lang.toLowerCase());
  return (
    <div className="my-4 min-w-0">
      <CodeBlock code={h.code} lines={h.lines} lang={lang} />
    </div>
  );
}

function Paso({ n, t, children }: { n: string; t: string; children: React.ReactNode }) {
  return (
    <section className={`mt-12 ${card}`}>
      <h2 className="flex flex-wrap items-center gap-3 text-xl font-extrabold tracking-tight">
        <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-slate-700 text-sm font-extrabold text-white">
          {n}
        </span>
        {t}
      </h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">{children}</div>
    </section>
  );
}

/* ───────────── contenido ───────────── */

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

const CAMPOS: [string, string, string, string, string][] = [
  ["version", "sí (raíz)", "entero", "1", "Versión del esquema. Si mañana cambias el formato, subes a 2 y el programa sabe qué está leyendo."],
  ["acciones", "sí (raíz)", "lista", "[ … ]", "La lista de acciones. Vacía = error de configuración."],
  ["nombre", "sí", "texto sin espacios", "ordenar-descargas", "Lo que escribes en tareas ejecutar NOMBRE. Único: no puede haber dos iguales."],
  ["descripcion", "sí", "texto", "Mueve los PDF…", "Lo que enseña tareas acciones. Escríbela para alguien que no eres tú."],
  ["tipo", "sí", "uno de la lista", "mover", "Qué clase de acción es. El motor elige la clase Python a partir de este campo."],
  ["origen", "no", "ruta", "~/Descargas", "Carpeta por defecto si no pasas CARPETA en la orden. ~ se expande a tu carpeta personal en Linux, macOS y Windows."],
  ["filtro", "no", "objeto", "{ \"extensiones\": [\".pdf\"] }", "Qué ficheros de la carpeta se tocan. Sin filtro = todos (¡cuidado con borrar!)."],
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
  ["extensiones", "[\".pdf\", \".docx\"]", "Solo esas extensiones. Compáralas en minúsculas: FOTO.JPG también es .jpg."],
  ["patron", "\"^captura.*\\\\.png$\"", "Expresión regular sobre el nombre. En JSON la barra invertida se escribe doble."],
  ["mas_antiguo_que_dias", "30", "Solo ficheros cuya fecha de modificación tiene más de N días."],
  ["mayor_que_mb", "100", "Solo ficheros de más de N MB (vídeos olvidados, ISOs…)."],
];

const PLANTILLAS: [string, string, string][] = [
  ["{fecha:%Y-%m-%d}", "2026-11-03", "Fecha de modificación del fichero con el formato que quieras (%d/%m no: la barra no vale en nombres)."],
  ["{n:03}", "001, 002…", "Contador con ceros a la izquierda. {n} sin formato da 1, 2, 3."],
  ["{ext}", ".jpg", "La extensión original, con punto, en minúsculas."],
  ["{nombre}", "IMG_2041", "El nombre original sin extensión, por si quieres conservarlo: {fecha:%Y%m%d}-{nombre}{ext}."],
];

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
touch -d "40 days ago" viejo.tmp

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

const CHECKLIST = [
  "acciones.json con al menos 3 acciones TUYAS (no las del ejemplo) y el esquema documentado en el README.",
  "«tareas validar» detecta los casos feos con mensajes que dicen qué acción y qué campo fallan, y sale con 3.",
  "errores.py con TareasError, ConfigError y AccionNoValida; ningún traceback ante errores previsibles.",
  "acciones.py con la clase base Accion, la fábrica desde_config y una subclase por tipo; motor.py con la clase Motor.",
  "«tareas acciones» y «tareas ejecutar NOMBRE [CARPETA] --simular / --si» funcionando, y --config RUTA.",
  "Probado en ~/pruebas-tareas y con el destino también en pruebas: siempre --simular primero; nada sobrescrito, nada perdido.",
  ".opencode/skills/acciones-json/SKILL.md en el repo y visible en /skills.",
  ".opencode/commands/nueva-accion.md en el repo y usado para tu 2.ª y 3.ª acción.",
  ".opencode/agents/revisor.md en el repo; @revisor o /review antes de cada commit de código.",
  "docs/adr/0001-configuracion-externa.md terminado con TUS razones.",
  "docs/prompts.md con los prompts clave de la semana y qué tuviste que corregir de lo que hizo el agente.",
  "≥ 10 commits tuyos acumulados (los de la Sesión 1 cuentan) con mensajes que cuentan el proceso, y push a GitHub.",
];

const SKILL_MD = `---
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
- Si añades un campo o un tipo nuevo, documéntalo en el README y en esta skill.`;

const COMANDO_MD = `---
description: Añade una acción nueva a acciones.json y, si hace falta, el código que la soporta
agent: build
---
Quiero añadir la acción: $ARGUMENTS
1. Carga la skill acciones-json.
2. Propón primero la entrada JSON y espera mi visto bueno.
3. Si el tipo ya existe, solo edita acciones.json. Si no, añade la clase en src/tareas/acciones.py siguiendo el patrón de las demás.
4. Termina ejecutando \`uv run tareas validar\` y dime qué orden con --simular debo probar yo.
Estado actual del repo:
!\`git status --short\``;

const REVISOR_MD = `---
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
No reescribas el código: señala y explica.`;

const ESTRUCTURA_OPENCODE = `cli-tareas/
├── opencode.json                  # permisos del proyecto (Sesión 1)
├── AGENTS.md                      # normas que el agente lee SIEMPRE (Sesión 1)
├── acciones.json
├── .opencode/
│   ├── skills/
│   │   └── acciones-json/
│   │       └── SKILL.md           # paso 2: lo que el agente sabe de tu esquema
│   ├── commands/
│   │   └── nueva-accion.md        # paso 5: tu orden /nueva-accion
│   └── agents/
│       └── revisor.md             # paso 6: tu subagente @revisor
└── src/tareas/ …`;

const PERSONALIZAR: [string, string, string, string][] = [
  ["AGENTS.md", "raíz del repo", "Siempre: entra en todas las conversaciones", "Normas generales del proyecto (stack, órdenes, «no hagas push»)."],
  ["Skill", ".opencode/skills/NOMBRE/SKILL.md", "El agente, bajo demanda, cuando la description encaja con la tarea", "Conocimiento concreto que no hace falta siempre: tu esquema de acciones.json."],
  ["Comando", ".opencode/commands/NOMBRE.md", "Tú, escribiendo /NOMBRE argumentos", "Un prompt que repites a menudo, con sus pasos fijos."],
  ["Subagente", ".opencode/agents/NOMBRE.md", "Tú con @NOMBRE (o el agente principal, si lo necesita)", "Otro agente con su propio papel y sus propios permisos: un revisor que no puede editar."],
];

/* ───────────── diagrama ───────────── */
function Diagrama() {
  const caja = (
    x: number,
    y: number,
    w: number,
    h: number,
    fill: string,
    stroke: string,
    ink: string,
    t1: string,
    t2: string,
    dash = false,
  ) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill={fill} stroke={stroke} strokeWidth={2} strokeDasharray={dash ? "6 4" : undefined} />
      <text x={x + w / 2} y={y + h / 2 - 4} textAnchor="middle" fontSize={14} fontWeight={700} fill={ink} fontFamily="ui-monospace, monospace">
        {t1}
      </text>
      <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" fontSize={12} fill={ink} fontFamily="ui-sans-serif, system-ui, sans-serif">
        {t2}
      </text>
    </g>
  );
  const gris = "#64748b";
  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-zinc-200 bg-white p-3 dark:border-white/10 dark:bg-slate-900">
      <svg
        viewBox="0 0 920 270"
        role="img"
        aria-label="Flujo: acciones.json lo lee config.py, que valida; si falla lanza ConfigError y sale con código 3. Si es válido pasa al Motor, que filtra los ficheros y llama a Accion.ejecutar sobre la carpeta. El resultado es una tabla Rich con los cambios hechos o, con --simular, la misma tabla sin tocar nada."
        className="h-auto w-full min-w-[640px]"
      >
        <defs>
          <marker id="flecha-s2" markerUnits="userSpaceOnUse" markerWidth={10} markerHeight={10} refX={9} refY={5} orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={gris} />
          </marker>
        </defs>
        {caja(10, 80, 150, 70, "#fef3c7", "#d97706", "#78350f", "acciones.json", "lo escribes tú")}
        {caja(200, 80, 150, 70, "#dbeafe", "#2563eb", "#1e3a8a", "config.py", "carga y valida")}
        {caja(390, 80, 150, 70, "#ede9fe", "#7c3aed", "#4c1d95", "Motor", "elige los ficheros")}
        {caja(580, 80, 150, 70, "#dcfce7", "#16a34a", "#14532d", "Accion.ejecutar()", "sobre los ficheros")}
        {caja(770, 25, 140, 70, "#f1f5f9", "#475569", "#0f172a", "Salida Rich", "tabla qué → dónde")}
        {caja(770, 140, 140, 70, "#f1f5f9", "#475569", "#0f172a", "--simular", "misma tabla, 0 cambios", true)}
        {caja(200, 195, 150, 64, "#fee2e2", "#dc2626", "#7f1d1d", "ConfigError", "sale con código 3")}
        <g stroke={gris} strokeWidth={2} fill="none" markerEnd="url(#flecha-s2)">
          <line x1={160} y1={115} x2={199} y2={115} />
          <line x1={350} y1={115} x2={389} y2={115} />
          <line x1={540} y1={115} x2={579} y2={115} />
          <line x1={730} y1={108} x2={769} y2={68} />
          <line x1={730} y1={122} x2={769} y2={168} />
          <line x1={275} y1={150} x2={275} y2={194} />
        </g>
        <text x={283} y={178} fontSize={12} fill={gris} fontFamily="ui-sans-serif, system-ui, sans-serif">
          si algo falla
        </text>
        <text x={395} y={60} fontSize={12} fill={gris} fontFamily="ui-sans-serif, system-ui, sans-serif">
          solo llega aquí un JSON válido
        </text>
      </svg>
    </div>
  );
}

/* ───────────── página ───────────── */
const enlace = "font-semibold text-blue-700 underline dark:text-blue-300";
const h3 = "pt-4 text-lg font-bold text-zinc-900 dark:text-zinc-100";

export default function CliSesion2() {
  const criteriosSemana = RUBRICA_CLI.criterios.filter((c) => ["acciones", "configuracion", "robustez", "diseno"].includes(c.id));
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Curso de Programación con IA", path: "/programacion-ia/" },
          { title: "CLI tareas con IA", path: "/programacion-ia/cli/" },
          { title: "Sesión 2", path: "/programacion-ia/cli/sesion-02/" },
        ]}
      />
      <span className={chip}>Proyecto 2 · Sesión 2 · Semana 2-6 nov</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Acciones predefinidas: acciones.json y el motor
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        Esta semana está la idea central del proyecto: <b>tú decides qué hace tu herramienta escribiendo
        acciones.json</b>; el agente programa el <b>motor</b> que lo interpreta. Y a la vez das el segundo paso
        con <b>OpenCode</b>: le enseñas tu esquema con una <b>skill</b>, te creas un <b>comando</b> propio para
        añadir acciones y un <b>subagente revisor</b> que lee tu código sin poder tocarlo. Partes de lo que
        dejaste en la{" "}
        <Link href="/programacion-ia/cli/sesion-01/" className={enlace}>
          Sesión 1
        </Link>
        : el comando <C>tareas</C> con <C>--help</C>, <C>version</C> y <C>listar</C>, el repo con su{" "}
        <C>.gitignore</C>, tu <C>opencode.json</C> de permisos y tu <C>AGENTS.md</C>.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={meta}>🗓 Semana 2 · 2-6 nov</span>
        <span className={meta}>🧩 acciones.json → config → Motor → Accion</span>
        <span className={meta}>🤖 skill · comando · subagente</span>
        <span className={meta}>🛡 Excepciones propias</span>
        <span className={meta}>📝 Primer ADR</span>
      </div>

      <div className={`mt-6 ${card}`}>
        <h2 className="text-lg font-extrabold">Producto al acabar la semana</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-zinc-700 dark:text-zinc-300">
          <li><b>3 acciones propias</b> en acciones.json funcionando, siempre primero con <C>--simular</C>.</li>
          <li>Las órdenes <C>tareas validar</C>, <C>tareas acciones</C> y <C>tareas ejecutar</C>.</li>
          <li>Excepciones propias: <C>TareasError</C>, <C>ConfigError</C>, <C>AccionNoValida</C>.</li>
          <li><C>docs/adr/0001-configuracion-externa.md</C> escrito con tus razones.</li>
          <li>
            En el repo: la skill <C>.opencode/skills/acciones-json/</C>, el comando <C>/nueva-accion</C> y el
            subagente <C>revisor</C>.
          </li>
          <li><b>≥ 10 commits tuyos</b> acumulados en GitHub (los de la Sesión 1 cuentan).</li>
        </ul>
        <p className="mt-3 rounded-xl bg-violet-50 p-3 text-[14px] text-violet-900 dark:bg-violet-500/10 dark:text-violet-200">
          <b>Semipresencial:</b> esto es exactamente lo que se comprueba el <b>viernes 6 de noviembre</b>, al
          cerrar la quincena 3: 3 acciones propias funcionando, el ADR y commits reales en tu repo. En casa
          trabajas también con OpenCode (puedes abrirlo en la terminal integrada de VS Code); cómo conectarte
          desde casa a los modelos del centro lo explica el profesor en la tutoría colectiva de arranque.
        </p>
        <p className="mt-3 text-[14px] text-zinc-600 dark:text-zinc-400">
          ¿Dudas con OpenCode (atajos, permisos, sesiones)? Tienes la{" "}
          <Link href="/programacion-ia/opencode/" className={enlace}>
            guía de OpenCode del curso
          </Link>
          .
        </p>
      </div>

      {/* ───────────── POR QUÉ ───────────── */}
      <h2 className={h2}>Por qué configuración externa y no código</h2>
      <p className={p}>
        Piensa en el mando de la tele. El fabricante programa una vez lo que hace cada botón (el motor), pero
        <b> qué canal está en el 1 lo decides tú</b> en el menú, sin abrir el aparato. Si para cambiar el canal
        del botón 1 tuvieras que soldar algo dentro, nadie lo haría. Con tu herramienta pasa igual: si cada
        acción es una función escrita en Python, cambiar «mueve los PDF» por «mueve los PDF y los EPUB» exige
        tocar código, probarlo y reinstalar. Si vive en un fichero de configuración, cambias una línea.
      </p>
      <p className={p}>No es un invento del curso: lo usas todos los días sin darte cuenta.</p>
      <div className={tabla}>
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead className="bg-zinc-50 dark:bg-white/5">
            <tr>
              <th className={th}>Fichero</th>
              <th className={th}>Quién lo interpreta</th>
              <th className={th}>Qué decides sin tocar el programa</th>
            </tr>
          </thead>
          <tbody>
            {[
              [".gitignore", "git", "Qué ficheros no se suben (lo escribiste en la Sesión 1)."],
              ["package.json", "npm / Node", "Dependencias y órdenes como npm run dev."],
              ["docker-compose.yml", "Docker", "Qué servicios arrancan, en qué puertos, con qué variables."],
              ["settings.json de VS Code", "VS Code", "Tema, tamaño de letra, formateo al guardar…"],
              ["pyproject.toml", "uv / pip", "Nombre del paquete, versión y el comando tareas."],
              ["opencode.json · AGENTS.md · .opencode/", "OpenCode", "Qué puede hacer tu agente, qué normas sigue y qué sabe de tu proyecto."],
              ["acciones.json", "TU motor", "Qué hace tu herramienta con tus ficheros."],
            ].map(([f, q, d]) => (
              <tr key={f} className={fila}>
                <td className={`${td} font-mono font-semibold`}>{f}</td>
                <td className={td}>{q}</td>
                <td className={td}>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={nota}>
        <b>La misma idea, dos veces.</b> Igual que tu CLI lee <C>acciones.json</C>, OpenCode lee{" "}
        <C>opencode.json</C>, <C>AGENTS.md</C> y la carpeta <C>.opencode/</C>. Nadie recompila OpenCode para
        adaptarlo a tu proyecto: <b>tú configuras a tu agente igual que tu usuario configura tu herramienta</b>.
        Esta semana harás las dos cosas: el <C>acciones.json</C> de tu CLI y tres ficheros nuevos en{" "}
        <C>.opencode/</C>.
      </div>
      <p className={p}>
        El reparto de papeles de tu CLI queda así: el JSON dice <b>qué</b>; <C>config.py</C> comprueba que el
        JSON tiene sentido <b>antes</b> de tocar un solo fichero; el <C>Motor</C> elige los ficheros que cumplen
        el filtro; cada <C>Accion</C> sabe hacer <b>una</b> cosa; y la CLI pinta el resultado.
      </p>
      <Diagrama />
      <p className="text-center text-[13px] text-zinc-500 dark:text-zinc-400 sm:hidden">← desliza el diagrama →</p>

      <h2 className={h2}>El método de cada paso (el mismo de la Sesión 1)</h2>
      <ol className="mt-3 list-decimal space-y-1.5 pl-6 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
        <li><b>Tú escribes la intención</b>: el esquema, la acción, el criterio de aceptación.</li>
        <li><b>Agente plan</b> (<C>Tab</C>): «explícame cómo lo harías y qué ficheros tocarías». Lees el plan y lo corriges.</li>
        <li><b>Agente build</b> (<C>Tab</C>): «hazlo». Apruebas cada edición y cada orden <b>leyendo el diff</b>.</li>
        <li>
          <b>Auditas</b>: lees el código, pruebas en <C>~/pruebas-tareas</C> con <C>--simular</C> y con casos
          feos. Si algo sale mal, <C>/undo</C> o le explicas el fallo.
        </li>
        <li><b>Commit pequeño hecho por ti</b> y el prompt clave a <C>docs/prompts.md</C> (o <C>/export</C> de la sesión).</li>
        <li><b>Sesión nueva por tarea</b> (<C>/new</C>); <C>/compact</C> si la conversación se alarga.</li>
      </ol>

      {/* ───────────── PASO 1 ───────────── */}
      <Paso n="1" t="Diseña tu esquema (lo haces TÚ, sin IA)">
        <p>
          Esta parte es la que te pertenece: el esquema es <b>la especificación</b> de tu herramienta. Si se lo
          pides a la IA, tendrás la herramienta de otra persona. OpenCode, cerrado. Crea <C>acciones.json</C> en
          la raíz del repo partiendo de este ejemplo:
        </p>
        <Codigo src={ESQUEMA} lang="JSON" />
        <h3 className={h3}>Campo a campo</h3>
        <div className={tabla}>
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead className="bg-zinc-50 dark:bg-white/5">
              <tr>
                <th className={th}>Campo</th>
                <th className={th}>Obligatorio</th>
                <th className={th}>Tipo</th>
                <th className={th}>Ejemplo</th>
                <th className={th}>Qué hace</th>
              </tr>
            </thead>
            <tbody>
              {CAMPOS.map(([c, o, t, e, q]) => (
                <tr key={c} className={fila}>
                  <td className={`${td} font-mono font-semibold`}>{c}</td>
                  <td className={td}>{o}</td>
                  <td className={td}>{t}</td>
                  <td className={`${td} font-mono text-[12px]`}>{e}</td>
                  <td className={td}>{q}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className={h3}>Tipos de acción</h3>
        <div className={tabla}>
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead className="bg-zinc-50 dark:bg-white/5">
              <tr>
                <th className={th}>tipo</th>
                <th className={th}>Qué le pasa al fichero</th>
                <th className={th}>Para qué en tu vida real</th>
              </tr>
            </thead>
            <tbody>
              {TIPOS.map(([t, q, u]) => (
                <tr key={t} className={fila}>
                  <td className={`${td} font-mono font-semibold`}>{t}</td>
                  <td className={td}>{q}</td>
                  <td className={td}>{u}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className={h3}>Filtros: qué ficheros se tocan</h3>
        <p>Dentro de <C>filtro</C>. Si pones varios, el fichero tiene que cumplirlos <b>todos</b>.</p>
        <div className={tabla}>
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <tbody>
              {FILTROS.map(([f, e, q]) => (
                <tr key={f} className={fila}>
                  <td className={`${td} font-mono font-semibold`}>{f}</td>
                  <td className={`${td} font-mono text-[12px]`}>{e}</td>
                  <td className={td}>{q}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className={h3}>Plantillas de nombre</h3>
        <p>
          Para <C>renombrar</C>. Son huecos entre llaves que el motor rellena con el formato de Python
          (<C>str.format</C>): lo de detrás de los dos puntos es el formato.
        </p>
        <div className={tabla}>
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <tbody>
              {PLANTILLAS.map(([h, r, q]) => (
                <tr key={h} className={fila}>
                  <td className={`${td} font-mono font-semibold`}>{h}</td>
                  <td className={`${td} font-mono text-[12px]`}>{r}</td>
                  <td className={td}>{q}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={aviso}>
          <b>Reto de la semana:</b> al final tendrás <b>3 acciones para TU vida real</b> (las del ejemplo no
          cuentan). La <b>primera la escribes ahora, a mano</b>; la 2.ª y la 3.ª las añadirás en el paso 5 con tu
          comando <C>/nueva-accion</C>. Ideas, de menos a más difícil:
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li><b>Fácil:</b> mover las capturas de pantalla del escritorio a <C>~/Imágenes/Capturas</C> (filtro por extensión).</li>
            <li><b>Media:</b> copiar los apuntes de DAM modificados hace menos de 7 días a una carpeta de copia, o borrar instaladores <C>.exe</C>/<C>.deb</C> de más de 60 días.</li>
            <li><b>Difícil:</b> renombrar las fotos del móvil a <C>{"{fecha:%Y-%m-%d}_{n:03}{ext}"}</C> usando un <C>patron</C> regex que solo coja las que empiezan por <C>IMG_</C> o <C>PXL_</C>.</li>
          </ol>
          <p className="mt-2">
            Después, añade al README una sección <b>«Esquema de acciones.json»</b> con la tabla de campos (la
            tuya, no la de esta página si has cambiado algo). Si el esquema no está escrito, el agente se lo
            inventa: en el paso siguiente se lo enseñas.
          </p>
        </div>
      </Paso>

      {/* ───────────── PASO 2 ───────────── */}
      <Paso n="2" t="Enseña el esquema a tu agente: tu primera skill">
        <p>
          Si en cada prompt tuvieras que pegar tu esquema entero, acabarías harto y, peor, una vez se te olvidaría.
          Para eso existen las <b>skills</b>: un fichero Markdown con conocimiento concreto (cómo es tu{" "}
          <C>acciones.json</C> y qué reglas sigue el código que lo lee) que el agente <b>carga cuando lo necesita</b>.
        </p>
        <p>Antes de crearla, el mapa de lo que puedes poner en tu repo para personalizar a OpenCode:</p>
        <div className={tabla}>
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead className="bg-zinc-50 dark:bg-white/5">
              <tr>
                <th className={th}>Pieza</th>
                <th className={th}>Dónde vive</th>
                <th className={th}>Quién la activa</th>
                <th className={th}>Para qué</th>
              </tr>
            </thead>
            <tbody>
              {PERSONALIZAR.map(([pz, d, q, pq]) => (
                <tr key={pz} className={fila}>
                  <td className={`${td} font-semibold`}>{pz}</td>
                  <td className={`${td} font-mono text-[12px]`}>{d}</td>
                  <td className={td}>{q}</td>
                  <td className={td}>{pq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Codigo src={ESTRUCTURA_OPENCODE} lang="Text" />
        <p>
          Crea la carpeta <C>.opencode/skills/acciones-json/</C> y dentro el fichero <C>SKILL.md</C> (en
          mayúsculas) con este contenido. Adáptalo a <b>tu</b> esquema si has cambiado campos:
        </p>
        <Codigo src={SKILL_MD} lang="Markdown" />
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Lo de arriba entre <C>---</C> es el <b>frontmatter</b>. <C>name</C> tiene que ser <b>igual que el
            nombre de la carpeta</b> (<C>acciones-json</C>), en minúsculas y con guiones.
          </li>
          <li>
            <C>description</C> es lo más importante: el agente solo ve el nombre y la descripción de cada skill, y
            con eso decide si la carga. Por eso dice <b>qué es</b> y, sobre todo, <b>cuándo usarla</b> («siempre
            que crees o cambies acciones o el código que las lee»). Sin descripción, la skill no le llega al modelo.
          </li>
          <li>
            Cuando la tarea encaja, el agente llama a su herramienta <C>skill</C> y entonces sí lee el fichero
            entero. Así no gasta contexto con tu esquema cuando le pides otra cosa.
          </li>
          <li>
            La última regla es para el agente y para ti: <b>si el esquema cambia, la skill cambia</b>. Una skill
            desactualizada enseña mal.
          </li>
        </ul>
        <div className={nota}>
          <b>¿Y por qué no meterlo en AGENTS.md?</b> <C>AGENTS.md</C> entra <b>siempre</b>, en cada conversación:
          ahí van las normas generales (stack, <C>pathlib</C>, «no hagas push»). La skill entra <b>solo cuando
          hace falta</b>: ahí va el conocimiento detallado de una parte del proyecto. Con los modelos del centro el
          contexto cuesta, así que AGENTS.md corto y el detalle en skills.
        </div>
        <p>
          <b>Compruébalo.</b> OpenCode no recarga la configuración en caliente: sal (<C>ctrl+c</C>) y vuelve a
          abrirlo en la carpeta del repo. Escribe <C>/skills</C>: tiene que aparecer <C>acciones-json</C>. Desde
          la terminal también puedes verlo con <C>opencode debug skill</C>.
        </p>
        <Codigo src={'git add .opencode/skills/acciones-json/SKILL.md\ngit commit -m "Skill acciones-json: el agente carga las reglas de mi esquema"'} lang="Bash" />
      </Paso>

      {/* ───────────── PASO 3 ───────────── */}
      <Paso n="3" t="Valida antes de ejecutar, con el agente">
        <p>
          Un programa que borra ficheros no puede fiarse de un JSON escrito a mano. Primero se comprueba
          <b> todo</b> el fichero y solo si está bien se toca el disco. Y cuando algo falla, el mensaje tiene que
          decir <b>qué acción y qué campo</b>: «Error en la configuración» no sirve; «Acción «renombrar-fotos»,
          campo «plantilla»: es obligatorio en acciones de tipo renombrar» te lo arregla en 10 segundos.
        </p>
        <p>
          Abre una sesión nueva (<C>/new</C>) y pasa al agente <b>plan</b> con <C>Tab</C>. Fíjate en lo corto que
          es el prompt: <C>@acciones.json</C> adjunta tu fichero y la skill pone el resto.
        </p>
        <PromptBlock text={PROMPT_VALIDAR_PLAN} />
        <p>
          Lee el plan. ¿Ha entendido tu esquema? ¿Se olvida de algún caso (nombre repetido, regex rota)? Corrígelo
          ahí mismo. Cuando el plan te convenza, <C>Tab</C> para pasar a <b>build</b>:
        </p>
        <PromptBlock text={PROMPT_VALIDAR_BUILD} />
        <p>
          Con tu <C>opencode.json</C> de la Sesión 1, cada edición te pide permiso: <b>lee el diff antes de
          aceptar</b>. <C>uv run tareas validar</C> sí lo puede ejecutar solo, porque está en tu lista de
          órdenes permitidas.
        </p>
        <p>
          Para auditar, esto es lo que deberías obtener. Las excepciones heredan unas de otras: la CLI captura
          <C>TareasError</C> una sola vez y cada error trae su código de salida.
        </p>
        <Codigo src={ERRORES_PY} lang="Python" />
        <p>
          Y así es, resumido, <C>config.py</C>. No lo copies: es la referencia para comparar con lo que te haya
          hecho el agente.
        </p>
        <Codigo src={CONFIG_PY} lang="Python" />
        <p>Prueba la orden y su código de salida (en tu terminal, o desde OpenCode con <C>!</C> delante):</p>
        <Codigo src={"uv run tareas validar\necho $?        # Linux/macOS: 0 si es válido, 3 si no\n$LASTEXITCODE   # lo mismo en PowerShell"} lang="Bash" />
        <h3 className={h3}>Casos feos que pruebas TÚ</h3>
        <p>
          Haz una copia (<C>pruebas/roto.json</C>), estropéala a propósito de cada una de estas formas y
          ejecuta <C>uv run tareas --config pruebas/roto.json validar</C>. Ninguno puede acabar en traceback. Si
          alguno falla, explícaselo al agente con el mensaje que has visto, no con «no va».
        </p>
        <div className={tabla}>
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead className="bg-zinc-50 dark:bg-white/5">
              <tr>
                <th className={th}>Caso</th>
                <th className={th}>Cómo provocarlo</th>
                <th className={th}>Lo que debe decir</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Coma de más", "Una coma tras la última acción: … } , ]", "No es JSON válido: línea X, columna Y"],
                ["Tipo inexistente", "\"tipo\": \"mober\"", "Acción «…», campo «tipo»: «mober» no existe; usa uno de: borrar, copiar, mover, renombrar"],
                ["Nombre repetido", "Dos acciones con \"nombre\": \"ordenar-descargas\"", "Acción «ordenar-descargas», campo «nombre»: está repetido"],
                ["Regex rota", "\"patron\": \"*.tmp\" (el * no puede ir el primero)", "Acción «…», campo «filtro.patron»: expresión regular rota"],
                ["Extra: fichero que no existe", "--config nada.json", "No encuentro nada.json…"],
              ].map(([c, h, d]) => (
                <tr key={c} className={fila}>
                  <td className={`${td} font-semibold`}>{c}</td>
                  <td className={`${td} font-mono text-[12px]`}>{h}</td>
                  <td className={td}>{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Paso>

      {/* ───────────── PASO 4 ───────────── */}
      <Paso n="4" t="El motor y las acciones en clases, con el agente">
        <p>
          Aquí aparecen las clases de verdad. Una <b>clase base</b> <C>Accion</C> define lo que toda acción sabe
          hacer (<C>ejecutar</C>) y cada <b>subclase</b> (<C>Mover</C>, <C>Copiar</C>, <C>Renombrar</C>,
          <C>Borrar</C>) solo implementa lo suyo en <C>aplicar</C>. El método estático{" "}
          <C>Accion.desde_config(dict)</C> es una <b>fábrica</b>: recibe un diccionario del JSON y devuelve el
          objeto de la clase que toca. Gracias a eso, el motor no tiene ni un <C>if tipo == …</C>: añadir un tipo
          nuevo es escribir una subclase más.
        </p>
        <p>
          El <C>Motor</C> recibe la carpeta de la orden (o el <C>origen</C> de la acción), <b>selecciona</b> los
          ficheros que cumplen el filtro y se los pasa a la acción, que devuelve un informe: una lista de
          <C>Resultado</C> (qué fichero, a qué destino, en qué estado).
        </p>
        <p>
          Sesión nueva (<C>/new</C>). Primero en <b>plan</b>: «Carga la skill acciones-json y explícame cómo
          harías acciones.py y motor.py: clases, métodos y cómo garantizas que --simular no toca el disco».
          Cuando el plan te cuadre, en <b>build</b>:
        </p>
        <PromptBlock text={PROMPT_MOTOR_BUILD} />
        <div className={nota}>
          <b>Reglas multiplataforma y de seguridad que auditas tú</b> (están en tu AGENTS.md y en la skill, pero
          que el agente las conozca no significa que las cumpla):
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li><C>pathlib.Path</C> siempre: ninguna ruta montada con <C>+ &quot;/&quot; +</C> ni con <C>\</C>.</li>
            <li><C>Path.expanduser()</C> para <C>~</C>; <C>encoding=&quot;utf-8&quot;</C> en todo <C>open()</C> o <C>read_text()</C>.</li>
            <li><C>shutil.move</C> y <C>shutil.copy2</C>; nada de <C>os.system</C>, <C>subprocess</C> ni <C>shell=True</C>.</li>
            <li>Nombres con tildes y espacios funcionan.</li>
            <li>Con <C>simular=True</C> no se llama a <C>mkdir</C>, <C>move</C>, <C>rename</C> ni <C>unlink</C>.</li>
            <li>Nunca se sobrescribe: si el destino existe, sufijo « (1)», « (2)»…</li>
          </ul>
          Cada «esto no lo cumple» es un error que le pides corregir y un buen párrafo para{" "}
          <C>docs/prompts.md</C>.
        </div>
        <p>Código de referencia resumido para auditar:</p>
        <Codigo src={ACCIONES_PY} lang="Python" />
        <Codigo src={MOTOR_PY} lang="Python" />

        <h3 className={h3}>La interfaz: acciones, ejecutar, --simular, --si y --config</h3>
        <p>La CLI es la capa fina que une todo. Tres piezas nuevas:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><C>tareas acciones</C>: tabla con nombre, tipo y descripción de lo que hay en acciones.json.</li>
          <li><C>tareas ejecutar NOMBRE [CARPETA] --simular --si</C>: la orden que hace el trabajo.</li>
          <li><C>--config RUTA</C>: opción global (va <b>antes</b> de la orden: <C>tareas --config otra.json acciones</C>). Por defecto, <C>./acciones.json</C>.</li>
        </ul>
        <div className={tabla}>
          <table className="w-full min-w-[460px] border-collapse text-sm">
            <thead className="bg-zinc-50 dark:bg-white/5">
              <tr>
                <th className={th}>Código de salida</th>
                <th className={th}>Significa</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["0", "Todo bien."],
                ["1", "Fallo al ejecutar (carpeta que no existe, acción desconocida, permiso denegado…)."],
                ["2", "Error de uso: falta un argumento o una opción no existe (lo pone Typer solo)."],
                ["3", "Configuración inválida: acciones.json roto o con campos mal."],
              ].map(([c, s]) => (
                <tr key={c} className={fila}>
                  <td className={`${td} font-mono text-base font-bold`}>{c}</td>
                  <td className={td}>{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Sesión nueva, plan y luego build con:</p>
        <PromptBlock text={PROMPT_CLI} />
        <p>El fragmento clave de <C>cli.py</C>: fíjate en cómo se captura una sola excepción base para todo.</p>
        <Codigo src={CLI_PY} lang="Python" />
        <p>Lo que deberías ver (fíjate en el sufijo « (1)»: ya había una factura.pdf en el destino):</p>
        <pre className="overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-[12px] leading-snug text-zinc-100">{SALIDA}</pre>

        <div className={aviso}>
          <b>Las acciones las ejecutas TÚ, no el agente.</b> En tu <C>opencode.json</C>,{" "}
          <C>uv run tareas ejecutar …</C> no está en la lista de permitidas: si el agente quiere lanzarla, OpenCode
          te pregunta. <b>Recházalo</b>: podría mover tus ficheros reales. Las pruebas las haces tú, en tu terminal
          o con <C>!uv run tareas …</C> dentro de OpenCode.
        </div>
        <div className={aviso}>
          <b>Regla de oro:</b> prueba <b>siempre</b> primero en <C>~/pruebas-tareas</C> y con{" "}
          <C>--simular</C>. Nunca sobre tu carpeta de Descargas de verdad hasta que la simulación diga
          exactamente lo que esperas. Mientras desarrollas, usa <C>uv run tareas …</C> desde la carpeta del repo
          (ejecuta tu código actual sin reinstalar).
        </div>
        <div className={aviso}>
          <b>Ojo con el destino:</b> la carpeta de pruebas protege el <b>origen</b>, pero <C>destino</C> sigue
          apuntando a tus carpetas reales (<C>~/Documentos/PDF</C>). Mientras pruebas, cambia también el destino
          a algo como <C>~/pruebas-tareas/Documentos/PDF</C> en tu <C>acciones.json</C> (o usa un{" "}
          <C>--config</C> de pruebas) y vuelve a tus rutas reales solo cuando todo funcione.
        </div>
        <h3 className={h3}>Linux y macOS (bash/zsh)</h3>
        <Codigo src={PRUEBAS_BASH} lang="Bash" />
        <h3 className={h3}>Windows (PowerShell)</h3>
        <Codigo src={PRUEBAS_PS} lang="PowerShell" />
      </Paso>

      {/* ───────────── PASO 5 ───────────── */}
      <Paso n="5" t="Tu comando /nueva-accion">
        <p>
          Añadir una acción siempre sigue los mismos pasos: proponer el JSON, revisarlo, validar y probar con{" "}
          <C>--simular</C>. Cuando repites un prompt, lo conviertes en un <b>comando personalizado</b>: un
          fichero Markdown en <C>.opencode/commands/</C> que se invoca con <C>/</C> y su nombre. Crea{" "}
          <C>.opencode/commands/nueva-accion.md</C>:
        </p>
        <Codigo src={COMANDO_MD} lang="Markdown" />
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            El nombre del fichero es el nombre del comando: <C>nueva-accion.md</C> → <C>/nueva-accion</C>.
          </li>
          <li>
            Frontmatter: <C>description</C> es lo que ves en la lista al escribir <C>/</C>; <C>agent: build</C>{" "}
            hace que se ejecute con el agente que puede editar (igualmente te pedirá permiso para cada cambio).
          </li>
          <li>
            <C>$ARGUMENTS</C> se sustituye por <b>todo lo que escribas detrás del comando</b>.
          </li>
          <li>
            <C>!`git status --short`</C> ejecuta esa orden en la raíz del repo <b>antes</b> de enviar el prompt y
            mete su salida: el agente sabe qué ficheros tienes sin guardar.
          </li>
          <li>
            El paso 2 del comando («propón primero la entrada JSON y <b>espera mi visto bueno</b>») es el que
            mantiene la decisión en tus manos.
          </li>
        </ul>
        <p>Sal de OpenCode, vuelve a abrirlo y úsalo para tu <b>2.ª acción</b>:</p>
        <Codigo src={'/nueva-accion renombrar-capturas "renombra capturas de pantalla con su fecha"'} lang="Text" />
        <p>
          Lee la entrada JSON que te propone: ¿el filtro coge <b>solo</b> las capturas? ¿La plantilla es la que
          tú quieres? ¿El destino está en <C>~/pruebas-tareas</C> mientras pruebas? Corrige lo que no te guste
          antes de dar el visto bueno. Al final te dirá qué orden con <C>--simular</C> debes probar: la ejecutas
          tú. Repite con tu <b>3.ª acción</b> (una idea tuya, no un ejemplo de esta página).
        </p>
        <div className={nota}>
          El comando ahorra escribir, <b>no decidir</b>. Las 3 acciones tienen que ser tuyas: qué hacen, con qué
          ficheros y por qué te sirven. En la defensa te preguntaré por ellas.
        </div>
      </Paso>

      {/* ───────────── PASO 6 ───────────── */}
      <Paso n="6" t="Tu subagente revisor">
        <p>
          El agente que escribe el código no es el mejor para revisarlo: ya está convencido de que está bien. Un{" "}
          <b>subagente</b> es otro agente, con su propio prompt y sus propios permisos, que trabaja en una
          conversación aparte y devuelve el resultado. Crea <C>.opencode/agents/revisor.md</C>:
        </p>
        <Codigo src={REVISOR_MD} lang="Markdown" />
        <ul className="list-disc space-y-1.5 pl-5">
          <li>El nombre del fichero es el nombre del agente: <C>revisor.md</C> → <C>@revisor</C>.</li>
          <li>
            <C>mode: subagent</C>: no aparece al cambiar con <C>Tab</C> (eso es para plan y build); se le llama con{" "}
            <C>@revisor</C>, o el agente principal lo lanza si su <C>description</C> encaja con lo que necesita.
          </li>
          <li>
            <C>permission</C>: <C>edit: deny</C> y <C>webfetch: deny</C> lo dejan en <b>solo lectura</b>; de{" "}
            <C>bash</C> solo puede usar <C>git diff</C>, <C>git log</C> y <C>git status</C>; cualquier otra orden
            está bloqueada (<C>"*": deny</C> va primero y las excepciones después: gana la última regla que
            coincide). Aunque quisiera, no puede «arreglarte» nada ni ejecutar tus acciones.
          </li>
          <li><C>temperature: 0.1</C> pide respuestas poco creativas (un revisor tiene que ser previsible), si el modelo del centro la admite; si no, se ignora sin romper nada.</li>
          <li>El cuerpo es su prompt de sistema: qué revisar y en qué formato responder.</li>
        </ul>
        <p>
          Sal, vuelve a abrir OpenCode (en la terminal, <C>opencode agent list</C> debe mostrar{" "}
          <C>revisor</C>) y pídele:
        </p>
        <Codigo src={"@revisor revisa @src/tareas/motor.py"} lang="Text" />
        <p>
          Además, OpenCode trae <C>/review</C>, que revisa los <b>cambios sin commitear</b>. La rutina a partir de
          hoy: <b>antes de cada commit de código, <C>/review</C> o <C>@revisor</C></b>.
        </p>
        <div className={aviso}>
          <b>Tú decides qué se arregla.</b> El revisor también se equivoca: a veces ve fallos que no existen o
          propone cosas que no tocan esta semana. Por cada punto, compruébalo (léelo, pruébalo en{" "}
          <C>~/pruebas-tareas</C>) y decide: lo arreglas (con build, en otra petición), lo apuntas como mejora en
          el README o lo descartas sabiendo por qué. Y contesta tú la pregunta que te hace al final.
        </div>
      </Paso>

      {/* ───────────── PASO 7 ───────────── */}
      <Paso n="7" t="Tu primer ADR">
        <p>
          Un <b>ADR</b> (<i>Architecture Decision Record</i>, registro de decisión de arquitectura) es un
          documento corto que cuenta <b>una</b> decisión técnica importante: qué decidiste, por qué y qué
          alternativas descartaste. Se escribe para la persona que llegue dentro de seis meses (muchas veces, tú
          mismo) y se pregunte «¿por qué narices está hecho así?». Los equipos profesionales los guardan
          numerados en <C>docs/adr/</C> y no se borran: si cambias de opinión, escribes uno nuevo que sustituye
          al anterior.
        </p>
        <p>
          Tu primera decisión de arquitectura es la de esta semana. Crea{" "}
          <C>docs/adr/0001-configuracion-externa.md</C> con esta plantilla y <b>termínala con TUS razones</b> (los
          huecos <C>[...]</C>).
        </p>
        <Codigo src={ADR} lang="Markdown" />
        <p>
          Puedes usar al agente en <b>plan</b> (no puede editar) como abogado del diablo: «Lee{" "}
          <C>@docs/adr/0001-configuracion-externa.md</C> y dame 3 argumentos en contra de mi decisión y una
          alternativa que no haya considerado». Pero el texto final es tuyo: en la defensa te preguntaré por él.
        </p>
      </Paso>

      {/* ───────────── PASO 8 ───────────── */}
      <Paso n="8" t="Audita, prueba en otro sistema y commitea">
        <p>
          «Lo que no sabes explicar, no lo entregas». Antes de dar por buena cada acción, pasa esta auditoría en
          <C>~/pruebas-tareas</C>:
        </p>
        <div className={tabla}>
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead className="bg-zinc-50 dark:bg-white/5">
              <tr>
                <th className={th}>Pregunta</th>
                <th className={th}>Lo que debería pasar</th>
              </tr>
            </thead>
            <tbody>
              {AUDITORIA.map(([q, r]) => (
                <tr key={q} className={fila}>
                  <td className={`${td} font-semibold`}>{q}</td>
                  <td className={td}>{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <b>Prueba en otro sistema si puedes.</b> En el aula tienes Linux; si en casa usas Windows o macOS,
          clona el repo allí y repite los bloques de prueba del paso 4. Los fallos típicos aparecen aquí: rutas
          con <C>\</C>, tildes que salen como <C>Ã±</C> (falta <C>encoding=&quot;utf-8&quot;</C>) o colores
          raros en una consola antigua. Cada fallo que encuentres y arregles es un commit con historia.
        </p>
        <p>
          <b>Un commit por pieza, hecho por ti</b> (el agente no hace commits ni push: lo dice tu AGENTS.md y lo
          bloquea tu <C>opencode.json</C>). Los ficheros de <C>.opencode/</C> también se commitean: son parte de
          tu proyecto. Algo así, con tus palabras:
        </p>
        <Codigo src={COMMITS} lang="Bash" />
        <p>
          Y en <C>docs/prompts.md</C>, los prompts de la validación, del motor y de la CLI, con una línea por
          prompt de <b>qué tuviste que corregir</b> de lo que hizo el agente y qué te señaló el revisor. Es la
          prueba de que auditaste.
        </p>
      </Paso>

      {/* ───────────── CIERRE ───────────── */}
      <h2 className={h2}>Checklist de la semana</h2>
      <ul className="mt-3 space-y-2">
        {CHECKLIST.map((c) => (
          <li key={c} className="flex gap-3 rounded-xl border border-zinc-200 bg-white p-3 text-[15px] text-zinc-700 dark:border-white/10 dark:bg-slate-900 dark:text-zinc-300">
            <span aria-hidden className="mt-0.5 inline-block h-4 w-4 flex-none rounded border-2 border-zinc-400 dark:border-zinc-500" />
            <span>{c}</span>
          </li>
        ))}
      </ul>

      <h2 className={h2}>Lo que cuenta en la rúbrica esta semana</h2>
      <p className={p}>
        Antes que nada, los <b>4 mínimos</b> de {RUBRICA_CLI.titulo.replace("Rúbrica · ", "")}: si falla uno,
        el proyecto no se evalúa. Esta semana ya puedes cumplir el segundo y avanzar mucho en el cuarto.
      </p>
      <ol className="mt-3 grid gap-3 sm:grid-cols-2">
        {RUBRICA_CLI.minimos.map((m, i) => (
          <li key={m.id} className={`${card} flex gap-3`}>
            <span className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-red-600 text-xs font-extrabold text-white">
              {i + 1}
            </span>
            <span className="text-[15px] text-zinc-700 dark:text-zinc-300">{m.texto}</span>
          </li>
        ))}
      </ol>
      <p className={p}>Y estos criterios se juegan casi enteros con el trabajo de hoy:</p>
      <div className={tabla}>
        <table className="w-full min-w-[600px] border-collapse text-sm">
          <thead className="bg-zinc-50 dark:bg-white/5">
            <tr>
              <th className={th}>Criterio</th>
              <th className={th}>Peso</th>
              <th className={th}>Nivel más alto</th>
            </tr>
          </thead>
          <tbody>
            {criteriosSemana.map((c) => (
              <tr key={c.id} className={fila}>
                <td className={`${td} font-semibold`}>{c.nombre}</td>
                <td className={`${td} font-mono`}>{c.peso} %</td>
                <td className={td}>{c.niveles[c.niveles.length - 1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={h2}>Qué viene después</h2>
      <div className="mt-3 grid gap-4 md:grid-cols-3">
        <div className={card}>
          <h3 className="font-bold">Semana 3 · MCP y capa IA</h3>
          <p className="mt-1 text-[14px] text-zinc-600 dark:text-zinc-400">
            OpenCode con <b>MCP</b>: el servidor <C>context7</C> para consultar documentación de librerías,
            activado solo cuando hace falta. Y la <b>capa IA de tu CLI</b>: acciones que deciden con los mismos
            modelos del centro, llamados desde Python, con la clave fuera del repo y <b>modo sin red</b>.
          </p>
        </div>
        <div className={card}>
          <h3 className="font-bold">Semana 4 · Pruebas y release</h3>
          <p className="mt-1 text-[14px] text-zinc-600 dark:text-zinc-400">
            Pruebas con pytest que <b>escribe el agente y auditas tú</b>, <C>opencode run</C> sin interfaz (por
            ejemplo, en scripts), README de instalación y release <b>v1.0</b>.
          </p>
        </div>
        <div className={card}>
          <h3 className="font-bold">Semipresencial · Quincena 4</h3>
          <p className="mt-1 text-[14px] text-zinc-600 dark:text-zinc-400">
            Del <b>9 al 20 de noviembre</b>: IA, pruebas y release. <b>Entrega el viernes 20 de noviembre.</b>
          </p>
        </div>
      </div>

      <nav className="mt-12 flex flex-col gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:flex-wrap sm:justify-between dark:border-white/10">
        <Link
          href="/programacion-ia/cli/sesion-01/"
          className="rounded-xl border border-zinc-200 px-4 py-3 text-[15px] font-semibold text-blue-700 hover:bg-zinc-50 dark:border-white/10 dark:text-blue-300 dark:hover:bg-white/5"
        >
          ← Sesión 1 · Arranque: la terminal y tu primera orden
        </Link>
        <Link
          href="/programacion-ia/opencode/"
          className="rounded-xl border border-zinc-200 px-4 py-3 text-[15px] font-semibold text-blue-700 hover:bg-zinc-50 dark:border-white/10 dark:text-blue-300 dark:hover:bg-white/5"
        >
          Guía de OpenCode
        </Link>
        <Link
          href="/programacion-ia/cli/"
          className="rounded-xl border border-zinc-200 px-4 py-3 text-[15px] font-semibold text-blue-700 hover:bg-zinc-50 dark:border-white/10 dark:text-blue-300 dark:hover:bg-white/5"
        >
          Portada del proyecto CLI tareas con IA →
        </Link>
      </nav>
    </div>
  );
}
