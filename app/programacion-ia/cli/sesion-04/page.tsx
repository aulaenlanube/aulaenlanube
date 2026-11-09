import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { RUBRICA_CLI } from "@/lib/campus/rubricas";
import {
  Anatomia,
  Aviso,
  Bloque,
  C,
  Checklist,
  Chip,
  Codigo,
  CriterioRubrica,
  DosColumnas,
  Paso,
  Prompt,
  Regla,
  TONO,
  Tarjeta,
  Terminal,
  cls,
  type LineaTerminal,
} from "../../_video/piezas";
import {
  AnatomiaPrueba,
  CajaDeArena,
  CapasPruebas,
  Cobertura,
  CodigosCli,
  DelTagAOtraPersona,
  DondeEstas,
  GrafoRelease,
  InstalacionCruzada,
  ManualFrenteAutomatico,
  MatrizActions,
  ModeloFalso,
  Parametrize,
  PesosRubrica,
  QuienPrepara,
  RepoFinal,
  RojoVerde,
  RunEnScript,
  SemanaPasos,
} from "./figuras";

export const metadata: Metadata = {
  title: "Sesión 4 · Pruebas y release v1.0 — CLI tareas con IA",
  description:
    "Semana 4 (16-20 nov): pytest con casos feos, la IA probada sin red, GitHub Actions en Linux, Windows y macOS, opencode run en un script, la release v1.0 y el día de instalación cruzada.",
};

// Página para vídeo (docs/paginas-para-video.md): cada <Bloque>/<Paso> cabe en
// 1100×620 y todas las figuras de ./figuras.tsx son animadas. Código y salidas
// son REALES: las pruebas de la CLI de referencia (28, en 0,18-0,21 s), el
// fallo que encontraron, la mutación a mano, la cobertura, el revisor y el
// borrador de CHANGELOG hechos con `opencode run` (OpenCode 2.2.5 y el modelo
// del centro), y el historial con su rama release-1.0, del 9-11-2026.

/* ───────────── ficheros de referencia (los de la CLI de referencia) ───────────── */

const CONFTEST_PY = String.raw`# tests/conftest.py: lo que comparten todas las pruebas
import json
import os
import time
from pathlib import Path

import pytest

from tareas.ia import ProveedorIA, Respuesta


@pytest.fixture(autouse=True)
def aislado(tmp_path, monkeypatch):
    """Cada prueba, en su carpeta temporal y sin el servidor de IA de verdad."""
    monkeypatch.chdir(tmp_path)
    monkeypatch.setenv("HOME", str(tmp_path))  # ~ apunta aquí (Linux, macOS)
    monkeypatch.setenv("USERPROFILE", str(tmp_path))  # y aquí en Windows
    for var in ("CENTRO_IA_URL", "CENTRO_IA_KEY", "CENTRO_IA_CA"):
        monkeypatch.delenv(var, raising=False)


@pytest.fixture
def descargas(tmp_path) -> Path:
    """Una carpeta con ficheros feos: tildes, espacios, mayúsculas y uno viejo."""
    carpeta = tmp_path / "Descargas"
    carpeta.mkdir()
    for nombre in ["factura.pdf", "apuntes de redes.docx", "FOTO1.JPG", "cumpleaños 2.png", "viejo.tmp"]:
        (carpeta / nombre).write_text("contenido de prueba", encoding="utf-8")
    hace_40_dias = time.time() - 40 * 86400
    os.utime(carpeta / "viejo.tmp", (hace_40_dias, hace_40_dias))
    return carpeta


@pytest.fixture
def escribir_config(tmp_path):
    """Escribe un acciones.json (lista de acciones o texto tal cual) y devuelve su ruta."""

    def escribir(acciones) -> Path:
        ruta = tmp_path / "acciones.json"
        texto = acciones if isinstance(acciones, str) else json.dumps({"version": 1, "acciones": acciones})
        ruta.write_text(texto, encoding="utf-8")
        return ruta

    return escribir


class ProveedorFalso(ProveedorIA):
    """Un «modelo» que contesta siempre lo mismo y apunta lo que le preguntan."""

    def __init__(self, respuesta: str):
        self.respuesta = respuesta
        self.preguntas: list[str] = []

    def completar(self, sistema, usuario, max_tokens=800):
        self.preguntas.append(usuario)
        return Respuesta(self.respuesta, 10, 5, 0.0)


@pytest.fixture
def modelo_falso():
    return ProveedorFalso`;

const TEST_CONFIG_PY = String.raw`# tests/test_config.py: acciones.json se valida ANTES de tocar nada
import pytest

from tareas import config
from tareas.errores import AccionNoValida, ConfigError

BUENA = {"nombre": "ordenar", "descripcion": "Mueve los PDF", "tipo": "mover", "destino": "~/PDF"}


def test_una_config_buena_se_carga(escribir_config):
    acciones = config.cargar(escribir_config([BUENA]))
    assert [a["nombre"] for a in acciones] == ["ordenar"]


@pytest.mark.parametrize(
    "cambio, campo",
    [
        ({"tipo": "mober"}, "tipo"),
        ({"destino": ""}, "destino"),
        ({"descripcion": None}, "descripcion"),
        ({"filtro": {"patron": "*.tmp"}}, "filtro.patron"),
    ],
    ids=["tipo-inexistente", "destino-vacio", "sin-descripcion", "regex-rota"],
)
def test_el_error_dice_que_campo_falla(escribir_config, cambio, campo):
    with pytest.raises(AccionNoValida) as error:
        config.cargar(escribir_config([BUENA | cambio]))
    assert error.value.campo == campo


def test_nombre_repetido(escribir_config):
    with pytest.raises(AccionNoValida, match="está repetido"):
        config.cargar(escribir_config([BUENA, BUENA]))


def test_json_roto_dice_la_linea(escribir_config):
    with pytest.raises(ConfigError, match="línea 1"):
        config.cargar(escribir_config('{"version": 1, "acciones": [ } ]'))


def test_fichero_que_no_existe(tmp_path):
    with pytest.raises(ConfigError, match="No encuentro"):
        config.cargar(tmp_path / "nada.json")`;

const TEST_ACCIONES_PY = String.raw`# tests/test_acciones.py: lo que cada acción hace con los ficheros (siempre en tmp_path)
from tareas.motor import Motor


def motor_con(**accion) -> Motor:
    return Motor([{"nombre": "prueba", "descripcion": "acción de prueba", **accion}])


def test_mover_solo_lo_que_cumple_el_filtro(descargas, tmp_path):
    destino = tmp_path / "PDF"
    motor = motor_con(tipo="mover", filtro={"extensiones": [".pdf", ".docx"]}, destino=str(destino))
    resultados = motor.ejecutar("prueba", descargas, simular=False)
    assert sorted(f.name for f in destino.iterdir()) == ["apuntes de redes.docx", "factura.pdf"]
    assert [r.estado for r in resultados] == ["hecho", "hecho"]
    assert (descargas / "FOTO1.JPG").exists()


def test_simular_no_toca_el_disco(descargas, tmp_path):
    destino = tmp_path / "PDF"
    antes = sorted(descargas.iterdir())
    motor = motor_con(tipo="mover", filtro={"extensiones": [".pdf"]}, destino=str(destino))
    motor.ejecutar("prueba", descargas, simular=True)
    assert sorted(descargas.iterdir()) == antes
    assert not destino.exists()  # ni siquiera un mkdir


def test_nunca_sobrescribe(descargas, tmp_path):
    destino = tmp_path / "PDF"
    destino.mkdir()
    (destino / "factura.pdf").write_text("la que ya estaba", encoding="utf-8")
    motor_con(tipo="mover", filtro={"extensiones": [".pdf"]}, destino=str(destino)).ejecutar("prueba", descargas, False)
    vieja, nueva = destino / "factura.pdf", destino / "factura (1).pdf"
    assert vieja.read_text(encoding="utf-8") == "la que ya estaba"
    assert nueva.exists()


def test_la_extension_en_mayusculas_cuenta(descargas):
    elegidos = Motor.seleccionar(descargas, {"extensiones": [".jpg"]})
    assert [f.name for f in elegidos] == ["FOTO1.JPG"]


def test_borrar_solo_los_viejos(descargas):
    (descargas / "nuevo.tmp").write_text("", encoding="utf-8")
    filtro = {"patron": r"\.tmp$", "mas_antiguo_que_dias": 30}
    motor_con(tipo="borrar", filtro=filtro).ejecutar("prueba", descargas, simular=False)
    assert not (descargas / "viejo.tmp").exists()
    assert (descargas / "nuevo.tmp").exists()


def test_renombrar_con_plantilla(descargas):
    motor = motor_con(tipo="renombrar", filtro={"extensiones": [".jpg", ".png"]}, plantilla="foto-{n:03}{ext}")
    motor.ejecutar("prueba", descargas, simular=False)
    assert (descargas / "foto-001.jpg").exists()
    assert (descargas / "foto-002.png").exists()`;

const TEST_IA_PY = String.raw`# tests/test_ia.py: la capa IA sin gastar ni un token (modelo falso)
import pytest

from tareas.acciones import a_nombre_seguro
from tareas.errores import IANoDisponible
from tareas.ia import ProveedorCentro
from tareas.motor import Motor


@pytest.mark.parametrize(
    "respuesta, esperado",
    [
        ("Tema 3: ¡Linux & Bash!", "tema-3-linux-bash"),
        ("../../etc/passwd", "etc-passwd"),
        ("redes-ip-protocolos.pdf", "redes-ip-protocolos"),
        ("", ""),
    ],
    ids=["tildes-y-signos", "ruta-peligrosa", "con-extension", "vacia"],
)
def test_la_respuesta_del_modelo_se_limpia(respuesta, esperado):
    assert a_nombre_seguro(respuesta) == esperado


def apuntes(tmp_path):
    carpeta = tmp_path / "Apuntes"
    carpeta.mkdir()
    (carpeta / "tema-1.txt").write_text("La CPU ejecuta instrucciones.", encoding="utf-8")
    return carpeta


def test_resumir_con_un_modelo_falso(tmp_path, modelo_falso):
    falso = modelo_falso("- La CPU ejecuta instrucciones")
    accion = {"nombre": "resumir", "descripcion": "x", "tipo": "resumir", "destino": str(tmp_path / "Res")}
    [r] = Motor([accion], proveedor=falso).ejecutar("resumir", apuntes(tmp_path), simular=False)
    assert r.estado == "hecho"
    assert "La CPU" in (tmp_path / "Res" / "tema-1.resumen.md").read_text(encoding="utf-8")
    assert "<documento>" in falso.preguntas[0]


def test_simular_no_pregunta_al_modelo(tmp_path, modelo_falso):
    falso = modelo_falso("no debería usarse")
    accion = {"nombre": "resumir", "descripcion": "x", "tipo": "resumir"}
    [r] = Motor([accion], proveedor=falso).ejecutar("resumir", apuntes(tmp_path), simular=True)
    assert r.estado == "simulado"
    assert falso.preguntas == []


def test_categoria_rara_va_a_sin_clasificar(tmp_path, modelo_falso):
    accion = {"nombre": "clasificar", "descripcion": "x", "tipo": "clasificar",
              "categorias": ["redes", "linux"], "destino": str(tmp_path / "Asig")}
    Motor([accion], proveedor=modelo_falso("Creo que es de mates")).ejecutar("clasificar", apuntes(tmp_path), False)
    assert (tmp_path / "Asig" / "sin-clasificar" / "tema-1.txt").exists()


def test_sin_clave_no_hay_ia():
    with pytest.raises(IANoDisponible, match="CENTRO_IA_KEY"):
        ProveedorCentro.desde_entorno()


def test_sin_red_el_mensaje_es_humano():
    proveedor = ProveedorCentro("http://127.0.0.1:9/v1", "clave-de-prueba")
    with pytest.raises(IANoDisponible, match="No llego"):
        proveedor.completar("sistema", "usuario")`;

const TEST_CLI_PY = String.raw`# tests/test_cli.py: la herramienta vista desde fuera, como la usa una persona
from typer.testing import CliRunner

from tareas.cli import app

runner = CliRunner()


def test_la_ayuda_funciona():
    r = runner.invoke(app, ["--help"])
    assert r.exit_code == 0
    assert "ejecutar" in r.output


def test_json_roto_sale_con_3_y_sin_traza(escribir_config):
    r = runner.invoke(app, ["--config", str(escribir_config('{"acciones": [ }')), "validar"])
    assert r.exit_code == 3
    assert "no es JSON válido" in r.output
    assert "Traceback" not in r.output


def test_accion_que_no_existe_sale_con_1(escribir_config, descargas):
    ruta = escribir_config([{"nombre": "a", "descripcion": "x", "tipo": "borrar"}])
    r = runner.invoke(app, ["--config", str(ruta), "ejecutar", "inventada", str(descargas)])
    assert r.exit_code == 1


def test_opcion_que_no_existe_sale_con_2():
    r = runner.invoke(app, ["listar", "--inventada"])
    assert r.exit_code == 2


def test_ia_sin_clave_sale_con_4(escribir_config, tmp_path):
    ruta = escribir_config([{"nombre": "res", "descripcion": "x", "tipo": "resumir"}])
    r = runner.invoke(app, ["--config", str(ruta), "ejecutar", "res", str(tmp_path)])
    assert r.exit_code == 4
    assert "siguen funcionando" in r.output`;

const PRUEBAS_YML = String.raw`# .github/workflows/pruebas.yml
name: Pruebas

on:
  push:
  pull_request:

jobs:
  pruebas:
    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
    runs-on: ${"${{ matrix.os }}"}
    steps:
      - uses: actions/checkout@v5
      - uses: astral-sh/setup-uv@v6
        with:
          python-version: "3.12"
      - run: uv run pytest -v`;

const REVISAR_SH = String.raw`#!/usr/bin/env bash
# Revisa lo que vas a commitear con el subagente revisor (solo lectura), sin abrir la TUI.
# Uso: git add … && scripts/revisar.sh      (sale con 0 si el revisor dice OK)
set -euo pipefail
if git diff --staged --quiet; then
  echo "No hay nada preparado: haz git add primero." >&2
  exit 1
fi
revision=$(git diff --staged | timeout 180 opencode run --agent revisor \
  "Revisa este diff (te llega por la entrada estándar) con tus normas. Acaba con una línea: VEREDICTO: OK o VEREDICTO: CAMBIAR.")
echo "$revision"
grep -q "^VEREDICTO: OK" <<< "$revision"`;

const CHANGELOG_ORDEN = String.raw`git log --format="- %s" v0.1.0..HEAD \
  | opencode run --agent plan "Te paso por la entrada estándar los commits desde la v0.1.0. Escribe SOLO la sección de la versión 1.0.0 de un CHANGELOG.md en formato Keep a Changelog (### Añadido, ### Cambiado, ### Arreglado), en español, para alguien que USA la herramienta: nada de nombres de clases ni ficheros internos. Fecha: 2026-11-19." \
  > docs/changelog-borrador.md`;

const CHANGELOG = `# Changelog

Todos los cambios que notará quien USA la herramienta. Formato: Keep a Changelog · versiones: SemVer.

## [1.0.0] - 2026-11-19

### Añadido
- Acciones con IA: \`resumir\`, \`renombrar-ia\` y \`clasificar\`, con los modelos del centro.
- \`tareas comprobar-ia\`: dice si hay IA disponible (sale con 4 si no la hay).
- \`--simular\` en las acciones con IA: dice cuántos caracteres mandaría, sin gastar.
- \`.env.example\` con las variables que hacen falta.

### Cambiado
- \`clasificar\` tiene la categoría «otros» para lo que no encaja.

### Arreglado
- \`renombrar-ia\` ya no duplica la extensión si el modelo la añade.
- En los resúmenes, la línea «Para el examen:» ya no sale vacía.

## [0.2.0] - 2026-11-06
- acciones.json validado, motor con \`--simular\`, órdenes \`acciones\`, \`validar\` y \`ejecutar\`.

## [0.1.0] - 2026-10-30
- Primera versión: \`tareas --help\`, \`version\` y \`listar\`.`;

const README_INSTALAR = `## Instalación

Necesitas [uv](https://docs.astral.sh/uv/) (instala Python solo si hace falta).

\`\`\`bash
uv tool install git+https://github.com/TU-USUARIO/cli-tareas@v1.0.0
tareas --help
tareas version        # debe decir: tareas 1.0.0
\`\`\`

## Primeros pasos

1. Copia \`acciones.json\` de este repo en tu carpeta y cambia las rutas por las tuyas.
2. Comprueba que está bien: \`tareas validar\`
3. Mira qué haría, sin tocar nada: \`tareas ejecutar ordenar-descargas --simular\`

## Acciones con IA (opcional)

Copia \`.env.example\` como \`.env\` y rellénalo, o exporta CENTRO_IA_URL y
CENTRO_IA_KEY. Comprueba la conexión con \`tareas comprobar-ia\`. Sin IA, el
resto de acciones funcionan igual.

## Desinstalar

\`\`\`bash
uv tool uninstall tareas
\`\`\``;

const RELEASE_ORDENES = String.raw`git switch -c release-1.0                # la versión se prepara en su rama
# … CHANGELOG.md, README.md y version = "1.0.0" en pyproject.toml y __init__.py
git push -u origin release-1.0
gh pr create --fill                      # el PR: GitHub Actions lo prueba en 3 sistemas
gh pr merge --merge                      # solo con las tres pruebas en verde
git switch main && git pull
git tag -a v1.0.0 -m "tareas 1.0.0: acciones, IA del centro y pruebas en tres sistemas"
git push --tags
gh release create v1.0.0 --title "tareas 1.0.0" --notes-file CHANGELOG.md`;

const COMMITS = `git add pyproject.toml uv.lock tests/conftest.py
git commit -m "pytest como dependencia de desarrollo y conftest con carpeta temporal y modelo falso"

git add tests/test_config.py tests/test_acciones.py
git commit -m "Pruebas de config y acciones: casos feos en tmp_path, nunca en mis carpetas"

git add tests/test_ia.py src/tareas/acciones.py
git commit -m "Prueba de a_nombre_seguro: quitaba mal la extensión que añade el modelo (arreglado)"

git add tests/test_cli.py
git commit -m "Pruebas de la CLI con CliRunner: códigos de salida 0, 1, 2, 3 y 4"

git add .github/workflows/pruebas.yml
git commit -m "GitHub Actions: pytest en Ubuntu, Windows y macOS en cada push"

git add scripts/revisar.sh
git commit -m "scripts/revisar.sh: el revisor con opencode run antes de cada commit"`;

/* ───────────── prompts ───────────── */

const PROMPT_PLAN = `Carga la skill acciones-json y lee @src/tareas/config.py, @src/tareas/motor.py,
@src/tareas/acciones.py y @src/tareas/ia.py.
Quiero pruebas con pytest. Antes de escribir nada, dime:
1. qué fixtures pondrías en tests/conftest.py para que NINGUNA prueba toque mis
   carpetas de verdad ni llame al servidor de IA;
2. qué casos feos probarías de config, de las acciones y de la capa IA;
3. qué códigos de salida probarías desde fuera con CliRunner.
No escribas código todavía.`;

const PROMPT_CONFTEST = `Hazlo según el plan, empezando solo por el andamiaje:
- uv add --dev pytest
- tests/conftest.py con:
  · aislado (autouse): monkeypatch.chdir(tmp_path), HOME y USERPROFILE a tmp_path
    y fuera CENTRO_IA_URL, CENTRO_IA_KEY y CENTRO_IA_CA;
  · descargas: tmp_path/Descargas con factura.pdf, «apuntes de redes.docx»,
    FOTO1.JPG, «cumpleaños 2.png» y viejo.tmp con 40 días (os.utime);
  · escribir_config: escribe un acciones.json y devuelve su ruta;
  · ProveedorFalso(ProveedorIA) y la fixture modelo_falso.
Termina con: uv run pytest`;

const PROMPT_PRUEBAS = `Ahora tests/test_config.py y tests/test_acciones.py. Reglas:
- Cada prueba, un nombre que diga qué comprueba: test_nunca_sobrescribe, no test_3.
- Casos feos de config con @pytest.mark.parametrize e ids legibles.
- Ni una ruta real: todo en tmp_path o con las fixtures.
- Mover, --simular (ni siquiera mkdir), nunca sobrescribir, .JPG en mayúsculas,
  borrar solo lo viejo y renombrar con plantilla.
No cambies src/. Si una prueba falla, NO la «arregles»: dime por qué falla.
Termina con: uv run pytest -v`;

const PROMPT_IA = `Ahora tests/test_ia.py, sin red y sin gastar un token:
- a_nombre_seguro con parametrize: tildes y signos, «../../etc/passwd», un nombre
  que el modelo devuelve con «.pdf» y la respuesta vacía.
- Resumir con modelo_falso: escribe el .md y la pregunta lleva <documento>.
- --simular no pregunta al modelo (falso.preguntas vacía).
- Una categoría que no está en la lista va a sin-clasificar.
- Sin clave → IANoDisponible; con http://127.0.0.1:9/v1 → «No llego».
No cambies src/. Termina con: uv run pytest -v`;

const PROMPT_CLI = `Ahora tests/test_cli.py con typer.testing.CliRunner:
una prueba por código de salida (0 ayuda, 1 acción inexistente, 2 opción inexistente,
3 JSON roto y sin traza, 4 IA sin clave y el aviso «siguen funcionando»).
Comprueba exit_code y una frase corta de r.output. Termina con: uv run pytest -v`;

const PROMPT_ACTIONS = `Crea .github/workflows/pruebas.yml: en cada push y pull_request, una matriz con
ubuntu-latest, windows-latest y macos-latest (fail-fast: false), actions/checkout,
astral-sh/setup-uv con Python 3.12 y «uv run pytest -v». Nada más: ni caché ni
publicar nada. Explícame cada línea en un comentario corto antes de crearlo.`;

/* ───────────── salidas reales ───────────── */

const filas = (texto: string): LineaTerminal[] =>
  texto.split("\n").map((l) =>
    l.startsWith("$ ")
      ? { o: l.slice(2) }
      : { s: l, tono: /passed in|PASSED/.test(l) && !/failed/.test(l) ? "ok" : /FAILED|failed|Error/.test(l) ? "error" : undefined },
  );

const SALIDA_V = String.raw`$ uv run pytest -v
collected 28 items

tests/test_acciones.py::test_mover_solo_lo_que_cumple_el_filtro PASSED               [  3%]
tests/test_acciones.py::test_simular_no_toca_el_disco PASSED                         [  7%]
tests/test_acciones.py::test_nunca_sobrescribe PASSED                                [ 10%]
tests/test_acciones.py::test_la_extension_en_mayusculas_cuenta PASSED                [ 14%]
tests/test_acciones.py::test_borrar_solo_los_viejos PASSED                           [ 17%]
tests/test_acciones.py::test_renombrar_con_plantilla PASSED                          [ 21%]
tests/test_cli.py::test_la_ayuda_funciona PASSED                                     [ 25%]
tests/test_cli.py::test_json_roto_sale_con_3_y_sin_traza PASSED                      [ 28%]
tests/test_cli.py::test_accion_que_no_existe_sale_con_1 PASSED                       [ 32%]
tests/test_cli.py::test_opcion_que_no_existe_sale_con_2 PASSED                       [ 35%]
tests/test_cli.py::test_ia_sin_clave_sale_con_4 PASSED                               [ 39%]`;

const SALIDA_V2 = String.raw`tests/test_config.py::test_una_config_buena_se_carga PASSED                          [ 42%]
tests/test_config.py::test_el_error_dice_que_campo_falla[tipo-inexistente] PASSED    [ 46%]
tests/test_config.py::test_el_error_dice_que_campo_falla[destino-vacio] PASSED       [ 50%]
tests/test_config.py::test_el_error_dice_que_campo_falla[sin-descripcion] PASSED     [ 53%]
tests/test_config.py::test_el_error_dice_que_campo_falla[regex-rota] PASSED          [ 57%]
tests/test_config.py::test_nombre_repetido PASSED                                    [ 60%]
tests/test_config.py::test_json_roto_dice_la_linea PASSED                            [ 64%]
tests/test_config.py::test_fichero_que_no_existe PASSED                              [ 67%]
tests/test_ia.py::test_la_respuesta_del_modelo_se_limpia[tildes-y-signos] PASSED     [ 71%]
tests/test_ia.py::test_la_respuesta_del_modelo_se_limpia[ruta-peligrosa] PASSED      [ 75%]
tests/test_ia.py::test_la_respuesta_del_modelo_se_limpia[con-extension] PASSED       [ 78%]
tests/test_ia.py::test_la_respuesta_del_modelo_se_limpia[vacia] PASSED               [ 82%]
tests/test_ia.py::test_resumir_con_un_modelo_falso PASSED                            [ 85%]
tests/test_ia.py::test_simular_no_pregunta_al_modelo PASSED                          [ 89%]
tests/test_ia.py::test_categoria_rara_va_a_sin_clasificar PASSED                     [ 92%]
tests/test_ia.py::test_sin_clave_no_hay_ia PASSED                                    [ 96%]
tests/test_ia.py::test_sin_red_el_mensaje_es_humano PASSED                           [100%]

==================================== 28 passed in 0.21s ====================================`;

const SALIDA_FALLO = String.raw`$ uv run pytest
tests/test_acciones.py ......                            [ 21%]
tests/test_cli.py .....                                  [ 39%]
tests/test_config.py ........                            [ 67%]
tests/test_ia.py ..F......                               [100%]
____ test_la_respuesta_del_modelo_se_limpia[con-extension] _____
respuesta = 'redes-ip-protocolos.pdf'
esperado = 'redes-ip-protocolos'
>       assert a_nombre_seguro(respuesta) == esperado
E       AssertionError: assert 'redes-ip-protocolos-pdf' == 'redes-ip-protocolos'
E         - redes-ip-protocolos
E         + redes-ip-protocolos-pdf
================= 1 failed, 27 passed in 0.35s =================`;

const SALIDA_MUTANTE = String.raw`$ uv run pytest
tests/test_acciones.py .F....                            [ 21%]
________________ test_simular_no_toca_el_disco _________________
        motor.ejecutar("prueba", descargas, simular=True)
        assert sorted(descargas.iterdir()) == antes
>       assert not destino.exists()  # ni siquiera un mkdir
E       AssertionError: assert not True
FAILED tests/test_acciones.py::test_simular_no_toca_el_disco
================= 1 failed, 27 passed in 0.55s =================`;

const MUTANTE_DIFF = String.raw`# src/tareas/acciones.py · clase Mover, roto A PROPÓSITO
        destino = destino_libre(carpeta / fichero.name)
        carpeta.mkdir(parents=True, exist_ok=True)   # ← fuera del if: también al simular
        if not simular:
            shutil.move(fichero, destino)`;

const SALIDA_COBERTURA = String.raw`$ uv run pytest -q --cov=tareas --cov-report=term-missing
Name                     Stmts   Miss  Cover   Missing
------------------------------------------------------
src/tareas/acciones.py     145     21    86%   54, 80-85, 95, 117-119, 150, 186-194, 203
src/tareas/cli.py          131     80    39%   28-36, 58, 66-87, 97, 103-115, 121-127, …
src/tareas/config.py        52      6    88%   30, 60, 63, 65-67
src/tareas/ia.py            57     15    74%   47, 57-58, 79, 82, 84-93
src/tareas/motor.py         42      3    93%   26, 34, 44
------------------------------------------------------
TOTAL                      441    127    71%
28 passed in 0.96s`;

const SALIDA_REVISOR: LineaTerminal[] = [
  { o: "git add src/tareas/acciones.py && scripts/revisar.sh", c: "# un os.system metido a propósito" },
  { s: "## 1. Errores seguros" },
  { s: '- src/tareas/acciones.py:85 — inyección de comandos. os.system(f"cp {fichero} {destino}") mete rutas sin citar en una shell.' },
  { s: "- src/tareas/acciones.py:85 — violación directa de las normas. AGENTS.md y la skill dicen literalmente: nunca os.system ni shell=True." },
  { s: "## 3. Problemas en Windows/macOS" },
  { s: "- Windows: cp no existe; os.system usa cmd.exe, que tampoco lo tiene. Cada copia fallaría silenciosamente y el informe diría \"hecho\"." },
  { s: "VEREDICTO: CAMBIAR", tono: "error" },
  { o: "echo $?" },
  { s: "1", tono: "aviso" },
];

const CHANGELOG_BORRADOR = String.raw`### Añadido
- Órdenes tareas acciones y tareas ejecutar, con tabla de resultados, --si …
- Acciones con IA: renombrar-ia y clasificar. Antes de usar la respuesta del
  modelo se limpia, para que no salgan nombres raros.
- Plantilla /nueva-accion para crear acciones nuevas con el asistente.

### Arreglado
- Al renombrar con IA se conservan las tildes y la ñ, y el nombre ya no sale
  con la extensión duplicada.

Notas rápidas: he dejado fuera deliberadamente lo interno de desarrollo …`;

const SALIDA_INSTALAR: LineaTerminal[] = [
  { o: "uv tool install git+https://github.com/ana-garcia/cli-tareas@v1.0.0" },
  { s: "Installed 1 executable: tareas" },
  { o: "cd /tmp && tareas version", c: "# desde cualquier carpeta" },
  { s: "tareas 1.0.0", tono: "ok" },
  { o: "uv tool uninstall tareas" },
  { s: "Uninstalled 1 executable: tareas" },
];

/* ───────────── contenido en piezas ───────────── */

const INDICE: [string, string][] = [
  ["producto", "Al acabar el proyecto"],
  ["por-que", "Por qué pruebas automáticas"],
  ["por-dentro", "Cómo funciona pytest"],
  ["paso-1", "Paso 1 · pytest y la caja de arena"],
  ["paso-2", "Paso 2 · Config y acciones"],
  ["paso-3", "Paso 3 · La prueba que prueba"],
  ["paso-4", "Paso 4 · La IA, sin red"],
  ["paso-5", "Paso 5 · La CLI desde fuera"],
  ["paso-6", "Paso 6 · GitHub Actions"],
  ["paso-7", "Paso 7 · El agente en un script"],
  ["paso-8", "Paso 8 · Release v1.0"],
  ["paso-9", "Paso 9 · Instalación cruzada"],
  ["entrega", "Entrega y defensa"],
  ["rubrica", "La rúbrica, entera"],
];

const PIEZAS_PYTEST: [string, ReactNode][] = [
  [
    "Una prueba es una función",
    <>
      Se llama <C>test_…</C>, vive en <C>tests/test_….py</C> y pytest la encuentra sola. Si ningún <C>assert</C> falla, pasa.
    </>,
  ],
  [
    "assert, y pytest te explica",
    <>
      Un <C>assert</C> normal de Python. Si falla, pytest enseña los dos valores y en qué se diferencian: no hace falta
      imprimir nada.
    </>,
  ],
  [
    "Fixtures: lo que se prepara",
    <>
      Una función con <C>@pytest.fixture</C> que la prueba recibe <b>con solo nombrarla</b> como parámetro. Las de todos,
      en <C>conftest.py</C>.
    </>,
  ],
  [
    "tmp_path y monkeypatch",
    <>
      Dos fixtures que trae pytest: una carpeta temporal nueva para cada prueba y una forma de cambiar variables de
      entorno o la carpeta actual <b>solo durante la prueba</b>.
    </>,
  ],
];

const DEFENSA: [string, string][] = [
  ["¿Por qué tus acciones viven en un JSON?", "Tu ADR-0001: lo que ganas, lo que pierdes y qué harías si el esquema cambia."],
  ["¿Qué viaja por la red en una acción con IA?", "La petición: sistema, instrucciones y documento; la clave, en la cabecera. Y vuelve texto y tokens."],
  ["¿Qué pasa si no hay red?", "Sale con 4 y una línea humana; las acciones sin IA siguen. Enséñalo en vivo."],
  ["¿Qué comprueba esta prueba? (y te señalo una)", "Cada assert, con tus palabras. Y qué cambio del código la pondría en rojo."],
  ["¿Por qué un ProveedorFalso?", "Pruebas sin red, sin clave y sin gastar; y saber qué se le preguntó al modelo."],
  ["¿Qué corregiste de lo que hizo el agente?", "Tu docs/prompts.md: la forma obsoleta de httpx, el CHANGELOG, la extensión duplicada…"],
];

const CHECKLIST: ReactNode[] = [
  <>tests/ con conftest.py: ninguna prueba toca tus carpetas reales ni llama al servidor de IA.</>,
  <>Camino feliz y al menos 3 casos feos con pytest; sabes explicar cada assert.</>,
  <>Has roto el código a propósito y alguna prueba se ha puesto en rojo (y lo has contado).</>,
  <>Las acciones con IA probadas con un ProveedorFalso; los códigos de salida 0-4, con CliRunner.</>,
  <>GitHub Actions en verde en Ubuntu, Windows y macOS.</>,
  <>scripts/revisar.sh (u otro uso de opencode run) con permisos exactos y un tiempo máximo.</>,
  <>README: instalación con una orden, primeros pasos, IA opcional y desinstalar.</>,
  <>CHANGELOG.md revisado por ti; versión 1.0.0 en pyproject.toml y en __init__.py.</>,
  <>Rama release-1.0 con su PR fusionado, etiqueta v1.0.0 y release en GitHub.</>,
  <>Instalado por otra persona siguiendo solo tu README; sus issues, contestados.</>,
];

const PARA_ENTREGAR: [string, ReactNode][] = [
  ["Qué entregas", <>La URL de tu repositorio en la <b>Entrega 2 · CLI</b> del aula. Se corrige lo que haya en el repo y en la etiqueta <C>v1.0.0</C>.</>],
  ["Cuándo", <>Semipresencial: <b>viernes 20 de noviembre</b>. Presencial: al acabar la semana, con la defensa en el aula.</>],
  ["Presencial: la defensa", <>5 minutos: instalas tu herramienta desde cero, ejecutas una acción con IA y otra sin red, y contestas preguntas como las de abajo.</>],
];

/* ───────────── piezas propias ───────────── */

function Rejilla({ items, columnas = 2 }: { items: [string, ReactNode][]; columnas?: 2 | 3 }) {
  return (
    <div className={`grid grid-cols-1 gap-4 ${columnas === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {items.map(([t, d]) => (
        <Tarjeta key={t} titulo={t} nivel={4} className="!p-4">
          {d}
        </Tarjeta>
      ))}
    </div>
  );
}

/* ───────────── página ───────────── */

export default function CliSesion4() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      {/* Portada */}
      <section data-bloque className="max-w-[1100px]">
        <Breadcrumbs
          grande
          items={[
            { title: "Curso de Programación con IA", path: "/programacion-ia/" },
            { title: "CLI tareas con IA", path: "/programacion-ia/cli/" },
            { title: "Sesión 4", path: "/programacion-ia/cli/sesion-04/" },
          ]}
        />
        <Chip>Proyecto 2 · Sesión 4 · Semana 16-20 nov</Chip>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Pruebas y release: tu herramienta, versión 1.0</h1>
        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          Tu herramienta ya hace cosas útiles. Esta semana demuestras que <b>funciona</b>, que <b>sigue funcionando</b>{" "}
          cuando la cambias y que <b>otra persona</b> la puede instalar con una orden. El agente escribe las pruebas y tú
          las <b>auditas</b>; GitHub las ejecuta en <b>Linux, Windows y macOS</b> en cada push; y por primera vez usas a
          OpenCode <b>sin pantalla</b>, dentro de un script. Al final: la <b>v1.0.0</b> etiquetada, publicada e instalada
          por un compañero.
        </p>
        <div className={`mt-5 rounded-2xl border p-5 ${TONO.verde.caja}`}>
          <p className={`text-base font-bold uppercase tracking-wider ${TONO.verde.texto}`}>El hilo del proyecto 2</p>
          <p className="mt-1 text-xl font-bold text-emerald-950 dark:text-emerald-50">
            Reutilizable de verdad: la instala otra persona, en otro sistema, y funciona.
          </p>
          <p className="mt-2 text-lg text-emerald-950 dark:text-emerald-100">
            Cada uno se construye una herramienta útil para sí mismo, y reutilizable. Esta semana se cierra el círculo: las
            tareas que te hacían perder tiempo, automatizadas en una herramienta en la que puedes confiar.
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Chip tono="gris">🗓 Semana 4 · 16-20 nov</Chip>
          <Chip tono="gris">🧪 pytest y casos feos</Chip>
          <Chip tono="gris">🤖 opencode run en un script</Chip>
          <Chip tono="gris">🖥 Actions en 3 sistemas</Chip>
          <Chip tono="gris">🏷 Release v1.0.0</Chip>
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
        titulo="Al acabar el proyecto"
        entradilla={
          <>
            Partes de la{" "}
            <Link href="/programacion-ia/cli/sesion-03/" className={cls.enlace}>
              Sesión 3
            </Link>
            . Al acabar, tu repo tiene pruebas en tres sistemas, una versión 1.0.0 publicada y lo que encontró otra persona
            al instalarla:
          </>
        }
      >
        <RepoFinal />
      </Bloque>

      <Aviso titulo="Semipresencial: se entrega el viernes 20" tono="morado">
        <p>
          Es la segunda semana de la <b>quincena 4</b>. La entrega es el <b>viernes 20 de noviembre</b>: la URL de tu repo en
          la Entrega 2 del aula, con la etiqueta <C>v1.0.0</C>. La instalación cruzada es la <b>tutoría final</b>: instalas
          la CLI de un compañero siguiendo solo su README y os abrís issues.
        </p>
      </Aviso>

      {/* ───────────── POR QUÉ ───────────── */}
      <Bloque
        id="por-que"
        titulo="Por qué pruebas automáticas"
        entradilla={
          <>
            Hasta hoy has probado a mano en <C>~/pruebas-tareas</C>. Funciona, pero cada vez que cambias algo tendrías que
            repetirlo todo, y en los tres sistemas. Una prueba automática es esa comprobación <b>escrita una vez</b> y
            repetida siempre, igual:
          </>
        }
      >
        <ManualFrenteAutomatico />
      </Bloque>

      <Aviso titulo="El agente las escribe; tú respondes por ellas" tono="ambar">
        <p>
          Una prueba que no sabes explicar no prueba nada: puede comprobar lo que el código hace, no lo que <b>debería</b>{" "}
          hacer. Por eso esta semana no basta con verlas en verde: vas a <b>romper el código a propósito</b> para ver si se
          ponen en rojo, y en la defensa (o al corregir) te señalaré un <C>assert</C> para que me digas qué comprueba.
        </p>
      </Aviso>

      {/* ───────────── POR DENTRO ───────────── */}
      <Bloque
        id="por-dentro"
        titulo="Cómo funciona pytest"
        entradilla="pytest busca en tests/ los ficheros test_*.py y, dentro, las funciones test_*. Las ejecuta una a una y te dice cuáles fallan y por qué. Tus 28 pruebas, por capas:"
      >
        <CapasPruebas />
      </Bloque>

      <Bloque titulo="Las cuatro ideas de pytest" nivel={3}>
        <Rejilla items={PIEZAS_PYTEST} />
      </Bloque>

      <Bloque titulo="Una prueba en tres tiempos" nivel={3}>
        <AnatomiaPrueba />
      </Bloque>

      {/* ───────────── PASO 1 ───────────── */}
      <Paso
        id="paso-1"
        n={1}
        titulo="pytest y la caja de arena"
        entradilla={
          <>
            Antes de la primera prueba, la regla de oro: <b>ninguna prueba toca tus carpetas de verdad ni llama al servidor
            de IA</b>. Lo garantiza una fixture con <C>autouse=True</C>: se aplica sola a todas.
          </>
        }
      >
        <CajaDeArena />
      </Paso>

      <Bloque titulo="Primero, el plan" nivel={3} entradilla="Sesión nueva, agente plan. Que te cuente su estrategia antes de escribir una línea:">
        <Prompt text={PROMPT_PLAN} etiqueta="Prompt · agente plan" />
      </Bloque>

      <Bloque titulo="El andamiaje: conftest.py" nivel={3} entradilla="Cuando el plan te cuadre, build. Primero, solo el andamiaje:">
        <Prompt text={PROMPT_CONFTEST} etiqueta="Prompt · agente build" />
        <ul className="mt-4 space-y-3">
          <Regla tipo="allow" regla="shell · uv run pytest *">
            Ya estaba en tu opencode.json desde la Sesión 1: el agente puede pasar las pruebas sin preguntarte. Lo demás, como
            siempre, pide permiso.
          </Regla>
        </ul>
      </Bloque>

      <Bloque titulo="conftest.py: la caja de arena" nivel={3} entradilla="Para auditar. La fixture aislado es la pared:">
        <Codigo code={CONFTEST_PY} kind="py" etiqueta="tests/conftest.py" rango={[12, 19]} />
      </Bloque>

      <Bloque titulo="conftest.py: la carpeta de ficheros feos" nivel={3}>
        <Codigo code={CONFTEST_PY} kind="py" etiqueta="tests/conftest.py" rango={[22, 31]} />
      </Bloque>

      <Bloque titulo="conftest.py: un acciones.json a medida" nivel={3}>
        <Codigo code={CONFTEST_PY} kind="py" etiqueta="tests/conftest.py" rango={[34, 44]} />
      </Bloque>

      <Bloque titulo="Las fixtures, y quién las pide" nivel={3}>
        <QuienPrepara />
      </Bloque>

      {/* ───────────── PASO 2 ───────────── */}
      <Paso
        id="paso-2"
        n={2}
        titulo="Pruebas de config y acciones"
        entradilla={
          <>
            Los casos feos que probabas a mano en la Sesión 2 (coma de más, tipo que no existe, regex rota, nombre
            repetido) pasan a ser pruebas. Con <C>@pytest.mark.parametrize</C>, una sola función prueba todos:
          </>
        }
      >
        <Parametrize />
      </Paso>

      <Bloque titulo="Config y acciones: el prompt" nivel={3}>
        <Prompt text={PROMPT_PRUEBAS} etiqueta="Prompt · agente build" />
      </Bloque>

      <Bloque titulo="test_config.py: una config buena" nivel={3}>
        <Codigo code={TEST_CONFIG_PY} kind="py" etiqueta="tests/test_config.py" rango={[1, 12]} />
      </Bloque>

      <Bloque titulo="test_config.py: cuatro casos, una función" nivel={3}>
        <Codigo code={TEST_CONFIG_PY} kind="py" etiqueta="tests/test_config.py" rango={[15, 28]} />
      </Bloque>

      <Bloque titulo="test_config.py: más casos feos" nivel={3}>
        <Codigo code={TEST_CONFIG_PY} kind="py" etiqueta="tests/test_config.py" rango={[31, 43]} />
      </Bloque>

      <Bloque titulo="test_acciones.py: mover y simular" nivel={3}>
        <Codigo code={TEST_ACCIONES_PY} kind="py" etiqueta="tests/test_acciones.py" rango={[5, 24]} />
      </Bloque>

      <Bloque titulo="test_acciones.py: nunca sobrescribir" nivel={3}>
        <Codigo code={TEST_ACCIONES_PY} kind="py" etiqueta="tests/test_acciones.py" rango={[27, 39]} />
      </Bloque>

      <Bloque titulo="test_acciones.py: borrar y renombrar" nivel={3}>
        <Codigo code={TEST_ACCIONES_PY} kind="py" etiqueta="tests/test_acciones.py" rango={[42, 54]} />
      </Bloque>

      <Bloque titulo="28 pruebas, en verde (1 de 2)" nivel={3} entradilla="Al acabar el paso 5 las tendrás todas. Salida real:">
        <div className="overflow-x-auto">
          <Terminal titulo="uv run pytest -v" lineas={filas(SALIDA_V)} />
        </div>
      </Bloque>

      <Bloque titulo="28 pruebas, en verde (2 de 2)" nivel={3}>
        <div className="overflow-x-auto">
          <Terminal titulo="uv run pytest -v · sigue" lineas={filas(SALIDA_V2)} />
        </div>
      </Bloque>

      {/* ───────────── PASO 3 ───────────── */}
      <Paso
        id="paso-3"
        n={3}
        titulo="La prueba que prueba"
        entradilla={
          <>
            Una prueba en verde puede estar comprobando nada. La forma de saberlo: <b>rompe el código a propósito</b> y
            mira si alguna se pone en rojo. Se llama <i>mutación</i>, y la haces tú, a mano, con lo que más te importa:{" "}
            <C>--simular</C> no puede tocar el disco.
          </>
        }
      >
        <RojoVerde />
      </Paso>

      <Bloque titulo="El cambio que rompe --simular" nivel={3} entradilla="Saca el mkdir del if, guarda y pasa las pruebas:">
        <Codigo code={MUTANTE_DIFF} kind="py" etiqueta="Mutación a mano (después: git restore)" />
        <div className="mt-4 overflow-x-auto">
          <Terminal titulo="uv run pytest · con el código roto" lineas={filas(SALIDA_MUTANTE)} animada />
        </div>
      </Bloque>

      <Aviso titulo="Y una prueba encontró un fallo de verdad" tono="rosa">
        <p>
          Al escribir el caso <C>con-extension</C> (el modelo devuelve <C>redes-ip-protocolos.pdf</C>), la prueba se puso en
          rojo <b>sin romper nada</b>: el fichero se habría llamado <C>redes-ip-protocolos-pdf.pdf</C>.
        </p>
        <div className="overflow-x-auto">
          <Terminal titulo="uv run pytest · el fallo que se te habría escapado" lineas={filas(SALIDA_FALLO)} />
        </div>
      </Aviso>

      <Bloque
        titulo="Arréglalo en el código, no en la prueba"
        nivel={3}
        entradilla={
          <>
            La prueba tenía razón. El arreglo fue una línea en <C>a_nombre_seguro</C>, y la prueba se queda para siempre
            vigilando:
          </>
        }
      >
        <Codigo code={'primera = re.sub(r"\\.[A-Za-z0-9]{1,5}$", "", primera.strip())  # si añade «.pdf», fuera'} kind="py" etiqueta="src/tareas/acciones.py · a_nombre_seguro, la línea nueva" />
        <DosColumnas
          a={{ antetitulo: "Trampa", titulo: "Cambiar la prueba", tono: "rosa", puntos: ["Hacer que espere redes-ip-protocolos-pdf: verde, y el fallo sigue ahí."] }}
          b={{ antetitulo: "Lo correcto", titulo: "Cambiar el código", tono: "verde", puntos: ["La prueba dice lo que DEBE pasar. Si el agente propone tocarla, pregúntale por qué."] }}
        />
      </Bloque>

      {/* ───────────── PASO 4 ───────────── */}
      <Paso
        id="paso-4"
        n={4}
        titulo="La IA, probada sin red"
        entradilla={
          <>
            Aquí cobra sentido la interfaz de la Sesión 3. Como las acciones solo conocen <C>ProveedorIA</C>, en las pruebas
            les das un <b>ProveedorFalso</b>: responde lo que tú le digas y apunta lo que le preguntan. Sin red, sin clave y
            sin gastar un token:
          </>
        }
      >
        <ModeloFalso />
      </Paso>

      <Bloque titulo="La IA: el prompt" nivel={3}>
        <Prompt text={PROMPT_IA} etiqueta="Prompt · agente build" />
      </Bloque>

      <Bloque titulo="conftest.py: el ProveedorFalso" nivel={3} entradilla="Hereda de ProveedorIA, así que cualquier acción lo acepta:">
        <Codigo code={CONFTEST_PY} kind="py" etiqueta="tests/conftest.py" rango={[47, 61]} />
      </Bloque>

      <Bloque titulo="test_ia.py: limpiar la respuesta" nivel={3}>
        <Codigo code={TEST_IA_PY} kind="py" etiqueta="tests/test_ia.py" rango={[10, 21]} />
      </Bloque>

      <Bloque titulo="test_ia.py: resumir con un modelo falso" nivel={3}>
        <Codigo code={TEST_IA_PY} kind="py" etiqueta="tests/test_ia.py" rango={[24, 37]} />
      </Bloque>

      <Bloque titulo="test_ia.py: simular y categorías raras" nivel={3}>
        <Codigo code={TEST_IA_PY} kind="py" etiqueta="tests/test_ia.py" rango={[40, 52]} />
      </Bloque>

      <Bloque titulo="test_ia.py: sin clave y sin red" nivel={3}>
        <Codigo code={TEST_IA_PY} kind="py" etiqueta="tests/test_ia.py" rango={[55, 64]} />
      </Bloque>

      <Aviso titulo="¿Y probar el modelo de verdad?" tono="azul">
        <p>
          No en <C>pytest</C>: el modelo no responde siempre igual (en la Sesión 3 dio tres nombres distintos para el mismo
          PDF) y una prueba que depende de la red falla cuando no la hay. Lo que pruebas es <b>tu código</b> ante cualquier
          respuesta: buena, rara, vacía o con una ruta peligrosa. El modelo real, con <C>tareas comprobar-ia</C>.
        </p>
      </Aviso>

      {/* ───────────── PASO 5 ───────────── */}
      <Paso
        id="paso-5"
        n={5}
        titulo="La CLI desde fuera"
        entradilla={
          <>
            Las pruebas de dentro no ven lo que ve una persona: la orden, el mensaje y el código de salida.{" "}
            <C>typer.testing.CliRunner</C> ejecuta tu CLI dentro de la prueba, como si alguien la tecleara. Una prueba por
            código de salida:
          </>
        }
      >
        <CodigosCli />
      </Paso>

      <Bloque titulo="La CLI: el prompt" nivel={3}>
        <Prompt text={PROMPT_CLI} etiqueta="Prompt · agente build" />
      </Bloque>

      <Bloque titulo="test_cli.py: salir con 3 y con 1" nivel={3}>
        <Codigo code={TEST_CLI_PY} kind="py" etiqueta="tests/test_cli.py" rango={[15, 25]} />
      </Bloque>

      <Bloque titulo="test_cli.py: salir con 2 y con 4" nivel={3}>
        <Codigo code={TEST_CLI_PY} kind="py" etiqueta="tests/test_cli.py" rango={[28, 37]} />
      </Bloque>

      <Bloque
        titulo="¿Qué no has probado? La cobertura"
        nivel={3}
        entradilla={
          <>
            <C>pytest-cov</C> mide qué líneas ejecutaron tus pruebas. No dice si están bien probadas, pero sí qué no se ha
            probado <b>nunca</b>:
          </>
        }
      >
        <Cobertura />
      </Bloque>

      <Bloque titulo="La cobertura, en la terminal" nivel={3} entradilla="Opcional: uv add --dev pytest-cov. Salida real:">
        <div className="overflow-x-auto">
          <Terminal titulo="uv run pytest --cov" lineas={filas(SALIDA_COBERTURA)} />
        </div>
        <p className={`mt-4 text-lg ${cls.texto}`}>
          Reto: una prueba de <C>tareas ejecutar … --simular</C> desde CliRunner. ¿Cuánto sube <C>cli.py</C>?
        </p>
      </Bloque>

      {/* ───────────── PASO 6 ───────────── */}
      <Paso
        id="paso-6"
        n={6}
        titulo="GitHub Actions en tres sistemas"
        entradilla={
          <>
            En tu equipo pasan las 28. ¿Y en Windows? ¿Y en macOS? GitHub te presta tres máquinas en cada <C>git push</C>:
            instalan tu proyecto desde cero y pasan tus pruebas. Si algo solo funciona en tu equipo, te enteras ahí, y no
            el día de la entrega.
          </>
        }
      >
        <MatrizActions />
      </Paso>

      <Bloque titulo="El workflow, línea a línea" nivel={3} anchoJunto={600} junto={<Codigo code={PRUEBAS_YML} kind="txt" etiqueta=".github/workflows/pruebas.yml" />}>
        <ul className={`list-disc space-y-2 pl-5 marker:text-zinc-400 ${cls.texto}`}>
          <li>
            <C>on</C>: cuándo se ejecuta. En cada <C>push</C> y en cada <C>pull_request</C>.
          </li>
          <li>
            <C>matrix</C>: el mismo trabajo, tres veces, una por sistema. <C>fail-fast: false</C>: si falla uno, los otros
            siguen y ves todos los resultados.
          </li>
          <li>
            <C>checkout</C> trae tu repo; <C>setup-uv</C> instala uv y Python 3.12.
          </li>
          <li>
            <C>uv run pytest -v</C>: lo mismo que en tu terminal. Si sale con un código distinto de 0, la máquina se pone en
            rojo.
          </li>
        </ul>
      </Bloque>

      <Bloque titulo="Actions: el prompt" nivel={3} entradilla="Pídeselo con explicación: el YAML lo tienes que entender tú.">
        <Prompt text={PROMPT_ACTIONS} etiqueta="Prompt · agente build" />
        <p className={`mt-4 text-lg ${cls.texto}`}>
          Commit, push y abre la pestaña <b>Actions</b> de tu repo. Si una se pone en rojo, entra, lee el error y arréglalo
          (las 6 reglas multiplataforma de la portada del proyecto). Ese arreglo es uno de tus mejores commits.
        </p>
      </Bloque>

      {/* ───────────── PASO 7 ───────────── */}
      <Paso
        id="paso-7"
        n={7}
        titulo="El agente en un script: opencode run"
        entradilla={
          <>
            OpenCode también es una CLI: <C>opencode run</C> recibe una tarea, la hace sin pantalla y escribe la respuesta.
            Así lo metes en un script: por ejemplo, que tu revisor mire lo que vas a commitear. Probado de verdad:
          </>
        }
      >
        <RunEnScript />
      </Paso>

      <Bloque titulo="scripts/revisar.sh" nivel={3} anchoJunto={700} junto={<Codigo code={REVISAR_SH} etiqueta="scripts/revisar.sh" />}>
        <ul className={`list-disc space-y-2 pl-5 marker:text-zinc-400 ${cls.texto}`}>
          <li>
            El diff entra por la <b>entrada estándar</b>: el agente no necesita permiso para leerlo.
          </li>
          <li>
            <C>--agent revisor</C>: el de la Sesión 2, sin poder editar.
          </li>
          <li>
            <C>timeout 180</C>: si el servidor no responde, el script no se queda colgado.
          </li>
          <li>El veredicto se convierte en un código de salida (0 o 1).</li>
        </ul>
      </Bloque>

      <Bloque titulo="Lo que dijo el revisor" nivel={3} entradilla="Metimos a propósito un os.system en Copiar. 14 segundos después (respuesta recortada, frases literales):">
        <Terminal titulo="scripts/revisar.sh" lineas={SALIDA_REVISOR} animada />
      </Bloque>

      <Aviso titulo="Sin nadie delante, «ask» es «no»" tono="rosa">
        <p>
          Con <C>opencode run</C> nadie puede contestar a un permiso. Lo comprobamos: le pedimos a build que ejecutara{" "}
          <C>uv run tareas acciones</C> y respondió que <i>la petición de permisos había sido denegada</i>, y buscó otra
          forma (leyó el JSON).
        </p>
        <p>
          Por eso un script <b>nunca</b> lleva <C>--auto</C>: si necesita una orden, se la permites exacta en el{" "}
          <C>opencode.json</C>, como <C>uv run pytest *</C>.
        </p>
      </Aviso>

      <Bloque
        titulo="Otro uso: el borrador del CHANGELOG"
        nivel={3}
        entradilla={
          <>
            Tus commits cuentan lo que has hecho. <C>opencode run</C> puede convertirlos en un borrador para quien USA la
            herramienta (agente plan: no puede escribir el fichero, así que la respuesta va con <C>&gt;</C>):
          </>
        }
      >
        <Codigo code={CHANGELOG_ORDEN} etiqueta="Terminal · 32 s" />
      </Bloque>

      <Bloque titulo="El borrador traía un error" nivel={3} entradilla="Parte de lo que escribió, tal cual. Encuentra los tres problemas antes de leer la solución:">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <Codigo code={CHANGELOG_BORRADOR} kind="md" etiqueta="docs/changelog-borrador.md (recortado)" />
          <ol className={`list-decimal space-y-2 pl-6 ${cls.texto}`}>
            <li>
              <b>Falso</b>: renombrar con IA <b>quita</b> las tildes (<C>a_nombre_seguro</C>). Se lo inventó.
            </li>
            <li>
              <C>/nueva-accion</C> es tuyo, de OpenCode: a quien usa la herramienta no le sirve.
            </li>
            <li>Venía entre ```markdown y con «Notas rápidas» al final: no se puede pegar tal cual.</li>
          </ol>
        </div>
      </Bloque>

      {/* ───────────── PASO 8 ───────────── */}
      <Paso
        id="paso-8"
        n={8}
        titulo="Release v1.0: rama, PR, CHANGELOG y tag"
        entradilla={
          <>
            Una <b>release</b> se prepara en su rama, entra en <C>main</C> con un <b>PR</b> que Actions prueba en los tres
            sistemas y se marca con una <b>etiqueta</b>. El historial de verdad:
          </>
        }
      >
        <GrafoRelease />
      </Paso>

      <Bloque titulo="El número de versión" nivel={3} entradilla="Versionado semántico (SemVer): tres números con significado.">
        <Anatomia
          animada
          etiqueta="Las partes del número de versión 1.0.0"
          partes={[
            { texto: "1", nombre: "MAJOR: cambia algo que ya usabas", tono: "rosa" },
            { texto: ".", nombre: "punto", tono: "gris" },
            { texto: "0", nombre: "MINOR: añade, sin romper", tono: "azul" },
            { texto: ".", nombre: "punto", tono: "gris" },
            { texto: "0", nombre: "PATCH: arregla", tono: "verde" },
          ]}
        />
        <p className={`mt-4 text-lg ${cls.texto}`}>
          Mientras era 0.x, podía cambiar cualquier cosa. La 1.0.0 es una promesa: tus órdenes y tu <C>acciones.json</C>{" "}
          no cambian sin subir a 2.0.0. El número va en <C>pyproject.toml</C> y en <C>__init__.py</C>, y{" "}
          <C>tareas version</C> lo enseña.
        </p>
      </Bloque>

      <Bloque titulo="CHANGELOG.md: para quien la usa" nivel={3} entradilla="El borrador del agente, corregido por ti. Formato Keep a Changelog:">
        <Codigo code={CHANGELOG} kind="md" etiqueta="CHANGELOG.md" rango={[1, 18]} />
      </Bloque>

      <Bloque titulo="README: instalar con una orden" nivel={3} entradilla="La sección que leerá tu compañero el día de instalación. Pruébala tú antes:">
        <Codigo code={README_INSTALAR} kind="md" etiqueta="README.md (lo de instalar)" rango={[1, 15]} />
      </Bloque>

      <Bloque titulo="La release, orden a orden" nivel={3} entradilla="Los commits y el PR, tuyos; el agente no hace push (tu opencode.json lo prohíbe).">
        <Codigo code={RELEASE_ORDENES} etiqueta="Terminal · la release" />
      </Bloque>

      <Bloque titulo="Del tag a otra persona" nivel={3}>
        <DelTagAOtraPersona />
        <div className="mt-4">
          <Terminal titulo="Terminal · lo que hará tu compañero (salida real)" lineas={SALIDA_INSTALAR} animada />
        </div>
      </Bloque>

      {/* ───────────── PASO 9 ───────────── */}
      <Paso
        id="paso-9"
        n={9}
        titulo="El día de instalación cruzada"
        entradilla={
          <>
            Tu herramienta funciona en tu equipo, con tus carpetas y con todo lo que tú sabes de ella. La prueba de verdad:
            que la instale <b>otra persona</b>, en <b>su</b> sistema, siguiendo <b>solo tu README</b>.
          </>
        }
      >
        <InstalacionCruzada />
      </Paso>

      <Bloque titulo="Cómo se hace" nivel={3}>
        <ol className="grid grid-cols-1 gap-x-8 gap-y-3 lg:grid-cols-2">
          {[
            <>Por parejas (mejor con otro sistema). Intercambiáis la URL del repo; nada más, ni una explicación.</>,
            <>Instala con la orden del README, desde otra carpeta: <C>tareas --help</C> y <C>tareas version</C>.</>,
            <>Copia un <C>acciones.json</C>, cambia las rutas a una carpeta de pruebas suya y ejecuta con <C>--simular</C>.</>,
            <>Prueba una acción con IA, y otra sin red. ¿Se entienden los mensajes?</>,
            <>Lo que falle o no se entienda, un issue: <C>gh issue create</C> con qué hizo, qué esperaba y qué pasó.</>,
            <>Tú lo arreglas con una prueba que lo demuestre, sacas la 1.0.1 y cierras el issue con el commit.</>,
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

      <Bloque titulo="Tus commits de la semana" nivel={3} entradilla="Antes de la rama de la release, en main. Uno por pieza:">
        <Codigo code={COMMITS} etiqueta="Terminal · commits de la semana 4" />
      </Bloque>

      {/* ───────────── CIERRE ───────────── */}
      <Bloque id="checklist" titulo="Checklist de la semana" entradilla="Los nueve pasos de un vistazo:">
        <SemanaPasos />
      </Bloque>

      <Bloque titulo="Checklist: pruebas" nivel={3}>
        <Checklist items={CHECKLIST.slice(0, 5).map((texto) => ({ texto }))} />
      </Bloque>

      <Bloque titulo="Checklist: release" nivel={3}>
        <Checklist items={CHECKLIST.slice(5).map((texto) => ({ texto }))} />
      </Bloque>

      <Bloque id="entrega" titulo="Entrega y defensa">
        <Rejilla items={PARA_ENTREGAR} columnas={3} />
        <p className={`mt-4 ${cls.texto}`}>
          Semipresencial: el proyecto se <b>presenta</b>, sin defensa oral. Si al corregir queda alguna duda, el profesor te
          pregunta por ese fichero concreto: son preguntas como estas.
        </p>
      </Bloque>

      <Bloque titulo="Preguntas de la defensa" nivel={3} entradilla="No hay trampa: son las de cada semana. Si sabes responderlas, el proyecto es tuyo.">
        <Rejilla items={DEFENSA} />
      </Bloque>

      <Bloque
        id="rubrica"
        titulo="La rúbrica, entera"
        entradilla={
          <>
            Antes que nada, los <b>4 mínimos</b>. Si falla uno, el proyecto no se evalúa. Repásalos el día antes de entregar:
          </>
        }
      >
        <Checklist items={RUBRICA_CLI.minimos.map((m) => ({ texto: m.texto }))} />
      </Bloque>

      <Bloque titulo="Lo que se juega la última semana" nivel={3}>
        <PesosRubrica />
      </Bloque>

      {[
        ["Rúbrica: pruebas y calidad", "pruebas"],
        ["Rúbrica: instalación, documentación y proceso", "entrega"],
      ].map(([titulo, id]) => {
        const c = RUBRICA_CLI.criterios.find((x) => x.id === id)!;
        return (
          <Bloque key={id} titulo={titulo} nivel={3}>
            <CriterioRubrica nombre={c.nombre} peso={c.peso} que={c.qué} niveles={RUBRICA_CLI.niveles} descriptores={c.niveles} resaltar={3} />
          </Bloque>
        );
      })}

      <Bloque titulo="Los demás criterios, en Excelente" nivel={3} entradilla="Lo que ya construiste las semanas 1-3, dicho con las palabras de la casilla más alta:">
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {RUBRICA_CLI.criterios
            .filter((c) => c.id !== "pruebas" && c.id !== "entrega")
            .map((c) => (
              <li key={c.id} className={`${cls.tarjeta} min-w-0 !p-4`}>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {c.nombre} · {c.peso}
                </h4>
                <p className={`mt-1 ${cls.texto}`}>{c.niveles[3]}</p>
              </li>
            ))}
        </ul>
      </Bloque>

      <Bloque id="despues" titulo="Dónde estás">
        <DondeEstas />
        <p className={`mt-4 text-lg ${cls.texto}`}>
          Con la v1.0.0 se cierra el proyecto 2. La forma de trabajar (spec, agente con permisos, auditoría, pruebas,
          commits pequeños, release) es la que usarás en todos los proyectos que vienen.
        </p>
      </Bloque>

      <nav className="mt-16 flex max-w-[1100px] flex-col gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:flex-wrap sm:justify-between dark:border-white/10">
        {[
          ["/programacion-ia/cli/sesion-03/", "← Sesión 3 · La capa IA"],
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
