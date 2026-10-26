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
    "Semana 2 (2-6 nov): diseñas tu acciones.json, lo validas con excepciones propias, el agente programa el motor y escribes tu primer ADR.",
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

const PROMPT_VALIDAR = `Contexto: proyecto Python 3.12 «cli-tareas» (src layout, Typer + Rich, gestor uv).
Ya existe src/tareas/cli.py con las órdenes version y listar.
Te paso mi acciones.json y la documentación de su esquema (del README):
[pega aquí tu acciones.json y la tabla de campos]

Tarea, SOLO estos dos ficheros + una orden:
1. src/tareas/errores.py con TareasError (codigo_salida = 1), ConfigError(TareasError)
   (codigo_salida = 3) y AccionNoValida(ConfigError), que recibe (accion, campo, motivo)
   y genera el mensaje «Acción «X», campo «Y»: motivo».
2. src/tareas/config.py con cargar(ruta: Path) -> list[dict] que:
   - lea con encoding="utf-8" y Path.expanduser();
   - si el JSON está roto, lance ConfigError con línea y columna;
   - compruebe campos obligatorios, tipos conocidos, nombres únicos, campos
     obligatorios según el tipo y que filtro.patron compila como regex;
   - todos los mensajes dicen QUÉ acción y QUÉ campo fallan, en español.
3. Orden «tareas validar» en cli.py: si todo va bien imprime «✔ N acciones válidas»
   en verde; si no, el mensaje en rojo SIN traceback y sale con el código
   e.codigo_salida (3 para configuración inválida).
Reglas: pathlib siempre, nada de os.system ni shell=True, sin dependencias nuevas.
No toques otros ficheros. Al terminar, explícame en 5 líneas cómo funciona la validación.`;

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

const PROMPT_MOTOR = `Contexto: proyecto «cli-tareas» (Python 3.12, src layout, Typer + Rich, uv).
Ya existen errores.py (TareasError, ConfigError, AccionNoValida) y config.py,
que devuelve la lista de acciones YA validadas. Mi esquema de acciones.json:
[pega tu acciones.json y la tabla de campos del README]

Tarea: crea src/tareas/acciones.py y src/tareas/motor.py.
1. acciones.py
   - dataclass Resultado(origen: Path, destino: Path | None, estado: "hecho" | "simulado" | "saltado").
   - Clase base abstracta Accion(config: dict) con nombre, descripcion, atributo
     destructiva (False por defecto), método ejecutar(ficheros, simular) -> list[Resultado]
     y método abstracto aplicar(fichero, n, simular).
   - Método estático de fábrica Accion.desde_config(config) que devuelve la subclase
     según "tipo" (registro de subclases, nada de una cadena de if/elif).
   - Subclases Mover, Copiar, Renombrar y Borrar (destructiva = True).
   - Plantillas de nombre con str.format: {fecha:%Y-%m-%d} (fecha de modificación),
     {n:03}, {ext} (con punto, en minúsculas) y {nombre} (sin extensión).
2. motor.py: clase Motor(acciones: list[dict]) que crea las acciones con la fábrica,
   un método estático seleccionar(carpeta, filtro) (extensiones sin distinguir
   mayúsculas, patron regex sobre el nombre, mas_antiguo_que_dias, mayor_que_mb)
   y ejecutar(nombre, carpeta, simular) -> list[Resultado]. Si no se pasa carpeta,
   usa "origen" de la acción. Acción o carpeta inexistente → TareasError con mensaje humano.

Reglas multiplataforma (tiene que funcionar en Linux, Windows y macOS):
- pathlib.Path siempre; nunca concatenar rutas con "/" o "\\" en cadenas.
- Path.expanduser() para "~"; encoding="utf-8" si lees o escribes texto.
- shutil.move y shutil.copy2; NADA de os.system, subprocess ni shell=True.
- Nombres con tildes y espacios deben funcionar.
Reglas de seguridad:
- NUNCA sobrescribir: si el destino existe, añade sufijo « (1)», « (2)»… y dilo en el resultado.
- Si la carpeta de destino no existe, créala (solo cuando NO se simula).
- Con simular=True no se toca NADA del disco (ni mkdir).
- Borrar solo se ejecuta desde la CLI con confirmación o --si (eso lo haremos en cli.py).
No toques cli.py todavía. Al terminar, dime qué pasa si ejecuto dos veces seguidas
la misma acción de mover y por qué.`;

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

const PROMPT_CLI = `Contexto: proyecto «cli-tareas». Ya existen config.cargar(ruta), Motor y las Accion.
Tarea: amplía SOLO src/tareas/cli.py (Typer + Rich):
1. Opción global --config RUTA en @app.callback (por defecto ./acciones.json), guardada en ctx.obj.
2. «tareas acciones»: tabla Rich con nombre, tipo y descripción de cada acción.
3. «tareas ejecutar NOMBRE [CARPETA] --simular --si»:
   - --simular: muestra la tabla «qué fichero → qué destino» con estado «simulado» y no toca nada;
   - si la acción es destructiva y no hay --simular ni --si, pide confirmación (typer.confirm, abort=True);
   - al final, resumen: N hechos, N simulados, N saltados; si no hay ficheros que cumplan el filtro, dilo.
4. Códigos de salida: 0 bien · 1 fallo al ejecutar (TareasError) · 2 uso incorrecto (Typer) ·
   3 configuración inválida (ConfigError). Nunca un traceback ante errores previsibles:
   captura TareasError, pinta el mensaje en rojo y sal con typer.Exit(e.codigo_salida).
Rutas mostradas relativas a la carpeta de trabajo si se puede, para que la tabla quepa.
No toques acciones.py ni motor.py.`;

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
git commit -m "Esquema de acciones.json con 3 acciones propias, documentado en el README"

git add src/tareas/errores.py src/tareas/config.py src/tareas/cli.py
git commit -m "Validación de acciones.json con ConfigError/AccionNoValida y orden validar (sale con 3)"

git add src/tareas/acciones.py src/tareas/motor.py
git commit -m "Motor con filtro por extensión, regex, antigüedad y tamaño"

git commit -am "Acción mover: crea destino y no sobrescribe (sufijo (1))"
git commit -am "Acción renombrar con plantilla {fecha} {n} {ext}: probada con tildes y espacios"
git commit -am "Acción borrar con confirmación y --si; --simular no toca el disco"
git commit -am "Órdenes acciones y ejecutar con tabla Rich y opción --config"

git add docs/adr/0001-configuracion-externa.md docs/prompts.md
git commit -m "ADR-0001: por qué configuración externa; prompts de validación y motor"
git push`;

const CHECKLIST = [
  "acciones.json con al menos 3 acciones TUYAS (no las del ejemplo) y el esquema documentado en el README.",
  "«tareas validar» detecta los 4 casos feos con mensajes que dicen qué acción y qué campo fallan, y sale con 3.",
  "errores.py con TareasError, ConfigError y AccionNoValida; ningún traceback ante errores previsibles.",
  "acciones.py con la clase base Accion, la fábrica desde_config y una subclase por tipo; motor.py con la clase Motor.",
  "«tareas acciones» y «tareas ejecutar NOMBRE [CARPETA] --simular / --si» funcionando, y --config RUTA.",
  "Probado en ~/pruebas-tareas: siempre --simular primero; nada sobrescrito, nada perdido.",
  "docs/adr/0001-configuracion-externa.md terminado con TUS razones.",
  "docs/prompts.md con los prompts clave de la semana y qué tuviste que corregir de lo que generó el agente.",
  "≥ 10 commits acumulados (los de la Sesión 1 cuentan) con mensajes que cuentan el proceso, y push a GitHub.",
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
        acciones.json</b>; el agente programa el <b>motor</b> que lo interpreta. A partir de hoy, añadir una
        acción nueva es <b>editar el JSON, no el código</b>. Partes de lo que dejaste en la{" "}
        <Link href="/programacion-ia/cli/sesion-01/" className="font-semibold text-blue-700 underline dark:text-blue-300">
          Sesión 1
        </Link>
        : el comando <C>tareas</C> instalado con <C>--help</C>, <C>version</C> y <C>listar</C>, y el repo con su
        <C>.gitignore</C>.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={meta}>🗓 Semana 2 · 2-6 nov</span>
        <span className={meta}>🧩 acciones.json → config → Motor → Accion</span>
        <span className={meta}>🛡 Excepciones propias</span>
        <span className={meta}>📝 Primer ADR</span>
      </div>

      <div className={`mt-6 ${card}`}>
        <h2 className="text-lg font-extrabold">Producto al acabar la semana</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-zinc-700 dark:text-zinc-300">
          <li><b>3 acciones propias</b> en acciones.json funcionando, primero con <C>--simular</C>.</li>
          <li>Las órdenes <C>tareas validar</C> y <C>tareas acciones</C>.</li>
          <li>Excepciones propias: <C>TareasError</C>, <C>ConfigError</C>, <C>AccionNoValida</C>.</li>
          <li><C>docs/adr/0001-configuracion-externa.md</C> escrito con tus razones.</li>
          <li><b>≥ 10 commits</b> acumulados en GitHub (los de la Sesión 1 cuentan).</li>
        </ul>
        <p className="mt-3 rounded-xl bg-violet-50 p-3 text-[14px] text-violet-900 dark:bg-violet-500/10 dark:text-violet-200">
          <b>Semipresencial:</b> esto es exactamente lo que se comprueba el <b>viernes 6 de noviembre</b>, al
          cerrar la quincena 3: 3 acciones propias funcionando, el ADR y commits reales en tu repo.
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
      <p className={p}>
        El reparto de papeles queda así: el JSON dice <b>qué</b>; <C>config.py</C> comprueba que el JSON tiene
        sentido <b>antes</b> de tocar un solo fichero; el <C>Motor</C> elige los ficheros que cumplen el filtro;
        cada <C>Accion</C> sabe hacer <b>una</b> cosa; y la CLI pinta el resultado.
      </p>
      <Diagrama />
      <p className="text-center text-[13px] text-zinc-500 dark:text-zinc-400 sm:hidden">← desliza el diagrama →</p>

      {/* ───────────── PASO 1 ───────────── */}
      <Paso n="1" t="Diseña tu esquema (lo haces TÚ, sin IA)">
        <p>
          Esta parte es la que te pertenece: el esquema es <b>la especificación</b> de tu herramienta. Si se lo
          pides a la IA, tendrás la herramienta de otra persona. Crea <C>acciones.json</C> en la raíz del repo
          partiendo de este ejemplo:
        </p>
        <Codigo src={ESQUEMA} lang="JSON" />
        <h3 className="pt-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">Campo a campo</h3>
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

        <h3 className="pt-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">Tipos de acción</h3>
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

        <h3 className="pt-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">Filtros: qué ficheros se tocan</h3>
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

        <h3 className="pt-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">Plantillas de nombre</h3>
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
          <b>Reto de la semana:</b> borra las acciones de ejemplo y escribe <b>3 acciones para TU vida real</b>.
          Ideas, de menos a más difícil:
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li><b>Fácil:</b> mover las capturas de pantalla del escritorio a <C>~/Imágenes/Capturas</C> (filtro por extensión).</li>
            <li><b>Media:</b> copiar los apuntes de DAM modificados hace menos de 7 días a una carpeta de copia, o borrar instaladores <C>.exe</C>/<C>.deb</C> de más de 60 días.</li>
            <li><b>Difícil:</b> renombrar las fotos del móvil a <C>{"{fecha:%Y-%m-%d}_{n:03}{ext}"}</C> usando un <C>patron</C> regex que solo coja las que empiezan por <C>IMG_</C> o <C>PXL_</C>.</li>
          </ol>
          <p className="mt-2">
            Después, añade al README una sección <b>«Esquema de acciones.json»</b> con la tabla de campos (la
            tuya, no la de esta página si has cambiado algo). Ese README es lo que pegarás al agente en los pasos
            siguientes: si el esquema no está escrito, el agente se lo inventa.
          </p>
        </div>
      </Paso>

      {/* ───────────── PASO 2 ───────────── */}
      <Paso n="2" t="Valida antes de ejecutar">
        <p>
          Un programa que borra ficheros no puede fiarse de un JSON escrito a mano. Primero se comprueba
          <b> todo</b> el fichero y solo si está bien se toca el disco. Y cuando algo falla, el mensaje tiene que
          decir <b>qué acción y qué campo</b>: «Error en la configuración» no sirve; «Acción «renombrar-fotos»,
          campo «plantilla»: es obligatorio en acciones de tipo renombrar» te lo arregla en 10 segundos.
        </p>
        <p>
          Para eso creas <b>tus propias excepciones</b>. Heredan unas de otras, así la CLI puede capturar
          <C>TareasError</C> una sola vez y cada error trae su código de salida:
        </p>
        <Codigo src={ERRORES_PY} lang="Python" />
        <p>
          Y así es, resumido, el <C>config.py</C> que deberías obtener. No lo copies: es la referencia para
          <b> auditar</b> lo que te genere el agente.
        </p>
        <Codigo src={CONFIG_PY} lang="Python" />
        <p>El prompt para tu agente (OpenCode en el aula; el asistente de VS Code en casa):</p>
        <PromptBlock text={PROMPT_VALIDAR} />
        <p>Prueba la orden y su código de salida:</p>
        <Codigo src={"uv run tareas validar\necho $?        # Linux/macOS: 0 si es válido, 3 si no\n$LASTEXITCODE   # lo mismo en PowerShell"} lang="Bash" />
        <h3 className="pt-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">Casos feos para probar a mano</h3>
        <p>
          Haz una copia (<C>pruebas/roto.json</C>), estropéala a propósito de cada una de estas formas y
          ejecuta <C>tareas --config pruebas/roto.json validar</C>. Ninguno puede acabar en traceback.
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

      {/* ───────────── PASO 3 ───────────── */}
      <Paso n="3" t="El motor y las acciones en clases">
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
        <PromptBlock text={PROMPT_MOTOR} />
        <div className={nota}>
          <b>Antes de aceptar el código, léelo.</b> Busca en lo que te genere: ¿hay alguna ruta montada con{" "}
          <C>+ &quot;/&quot; +</C>? ¿Algún <C>open()</C> sin <C>encoding</C>? ¿Algún <C>os.system</C> o{" "}
          <C>shell=True</C>? ¿Con <C>simular=True</C> se llama a <C>mkdir</C>, <C>move</C> o <C>unlink</C>? Cada
          «sí» es un error que tienes que pedir que corrija, y un buen párrafo para <C>docs/prompts.md</C>.
        </div>
        <p>Código de referencia resumido para auditar:</p>
        <Codigo src={ACCIONES_PY} lang="Python" />
        <Codigo src={MOTOR_PY} lang="Python" />
      </Paso>

      {/* ───────────── PASO 4 ───────────── */}
      <Paso n="4" t="La interfaz: acciones, ejecutar y --config">
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
        <PromptBlock text={PROMPT_CLI} />
        <p>El fragmento clave de <C>cli.py</C>: fíjate en cómo se captura una sola excepción base para todo.</p>
        <Codigo src={CLI_PY} lang="Python" />
        <p>Lo que deberías ver (fíjate en el sufijo « (1)»: ya había una factura.pdf en el destino):</p>
        <pre className="overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-[12px] leading-snug text-zinc-100">{SALIDA}</pre>

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
        <h3 className="pt-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">Linux y macOS (bash/zsh)</h3>
        <Codigo src={PRUEBAS_BASH} lang="Bash" />
        <h3 className="pt-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">Windows (PowerShell)</h3>
        <Codigo src={PRUEBAS_PS} lang="PowerShell" />
      </Paso>

      {/* ───────────── PASO 5 ───────────── */}
      <Paso n="5" t="Tu primer ADR">
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
          huecos <C>[...]</C>). Puedes pedirle a la IA que te haga de abogado del diablo («dame 3 argumentos
          contra mi decisión»), pero el texto final es tuyo: en la defensa te preguntaré por él.
        </p>
        <Codigo src={ADR} lang="Markdown" />
      </Paso>

      {/* ───────────── PASO 6 ───────────── */}
      <Paso n="6" t="Audita, prueba en otro sistema y commitea">
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
          <b>Un commit por pieza</b>, con mensajes que cuenten el proceso. Algo así (los tuyos con tus palabras):
        </p>
        <Codigo src={COMMITS} lang="Bash" />
        <p>
          Y en <C>docs/prompts.md</C>, los prompts de la validación, del motor y de la CLI, con una línea por
          prompt de <b>qué tuviste que corregir</b> de lo que generó el agente. Es la prueba de que auditaste.
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
          <h3 className="font-bold">Semana 3 · Capa IA</h3>
          <p className="mt-1 text-[14px] text-zinc-600 dark:text-zinc-400">
            Acciones que deciden con un modelo del centro (clasificar, poner nombre por contenido). Claves en
            <C>.env</C>, nunca en el repo, y <b>modo sin red</b>: si no hay conexión, tu CLI lo explica y sigue con
            las acciones sin IA.
          </p>
        </div>
        <div className={card}>
          <h3 className="font-bold">Semana 4 · Pruebas y release</h3>
          <p className="mt-1 text-[14px] text-zinc-600 dark:text-zinc-400">
            pytest con carpetas temporales, GitHub Actions en Linux, Windows y macOS, README de instalación,
            release <b>v1.0</b> y día de instalación cruzada: otra persona instala tu herramienta sin preguntarte.
          </p>
        </div>
        <div className={card}>
          <h3 className="font-bold">Semipresencial · Quincena 4</h3>
          <p className="mt-1 text-[14px] text-zinc-600 dark:text-zinc-400">
            Del <b>9 al 20 de noviembre</b>: IA, pruebas y release. <b>Entrega el viernes 20 de noviembre.</b>
          </p>
        </div>
      </div>

      <nav className="mt-12 flex flex-col gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:justify-between dark:border-white/10">
        <Link
          href="/programacion-ia/cli/sesion-01/"
          className="rounded-xl border border-zinc-200 px-4 py-3 text-[15px] font-semibold text-blue-700 hover:bg-zinc-50 dark:border-white/10 dark:text-blue-300 dark:hover:bg-white/5"
        >
          ← Sesión 1 · Arranque: la terminal y tu primera orden
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
