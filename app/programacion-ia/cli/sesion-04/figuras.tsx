import { RUBRICA_CLI } from "@/lib/campus/rubricas";
import { Barra, Caja, Figura, Flecha, Halo, SUAVE, T, TINTA, Zona, an, fuerte, linea, suave, type TonoSvg } from "../../_video/svg";

// Figuras de la Sesión 4 de la CLI (docs/paginas-para-video.md). Todas son
// ANIMADAS (se construyen al entrar en pantalla en una toma grabada; en la
// captura quieta salen terminadas). Geometría calculada a mano y apuntada encima
// de cada figura (sans 16 ≈ 9,5 px/car., negrita 18 ≈ 11,5, mono 16 ≈ 9,9, mono
// negrita 18 ≈ 11,2). Cada <text> es corto y único en la página, y ninguno es
// el principio de otro. Las cifras (28 pruebas, 0,18 y 0,21 s, la cobertura, los
// hashes y las etiquetas) son las de la CLI de referencia del 9-11-2026.

/* ------------------------------------------------------------------ */
/* Producto: tu repo al acabar el proyecto                             */
/* Zonas 16..490 y 510..984 × 16..366. Raíz a y = 80; hojas cada 30    */
/* desde y = 112 (nueve: la última a 352). La más larga de la izquierda */
/* (.github/workflows/pruebas.yml · 3 sistemas, ≈ 411) acaba en 483.   */
/* ------------------------------------------------------------------ */

type Hoja = { f: string; nota?: string };

function ArbolSvg({ x, raiz, hojas, tono, desde }: { x: number; raiz: string; hojas: Hoja[]; tono: TonoSvg; desde: number }) {
  const cx = x + 10;
  const ultimo = 112 + (hojas.length - 1) * 30 - 6;
  return (
    <g>
      <text x={x} y={80} fontSize={18} fontWeight={800} fill={fuerte(tono)} className="font-mono" {...an("funde", desde)}>
        {raiz}
      </text>
      <path d={`M${cx} 88 V${ultimo}`} fill="none" stroke={linea("gris")} strokeWidth={2} pathLength={1} {...an("traza", desde + 0.2, 0.22 * hojas.length)} />
      {hojas.map((h, i) => {
        const y = 112 + i * 30;
        return (
          <g key={h.f} {...an("desliza", desde + 0.3 + i * 0.22, 0.45)}>
            <path d={`M${cx} ${y - 6} H${cx + 20}`} fill="none" stroke={linea("gris")} strokeWidth={2} />
            <text x={cx + 26} y={y} fontSize={16}>
              <tspan className="font-mono" fontWeight={700} fill={TINTA}>
                {h.f}
              </tspan>
              {h.nota ? (
                <tspan fill={SUAVE} fontWeight={500}>
                  {` · ${h.nota}`}
                </tspan>
              ) : null}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function RepoFinal() {
  return (
    <Figura
      uid="repo4"
      ancho={1000}
      alto={380}
      animada
      etiqueta="Tu repo al acabar el proyecto. Tu herramienta, versión 1.0: tests con conftest.py y sus fixtures, test_config con 8 pruebas, test_acciones con 6, test_ia con 9 sin red y test_cli con 5, de la salida 0 a la 4; el flujo de GitHub Actions en 3 sistemas; pyproject con la versión 1.0.0; el CHANGELOG para quien la usa; y el README para instalar con una orden. Tu proceso: scripts/revisar.sh con opencode run, docs/prompts.md, la rama release-1.0 y su PR, la etiqueta v1.0.0 y su release, y los issues del día de instalación."
      pie="Lo que se entrega: una herramienta que otra persona instala con una orden y en la que puedes confiar."
    >
      <Zona x={16} y={16} w={474} h={350} tono="ambar" rotulo="Tu herramienta, versión 1.0" an={0} />
      <Zona x={510} y={16} w={474} h={350} tono="morado" rotulo="Tu proceso, semana 4" an={0.15} />
      <ArbolSvg
        x={36}
        raiz="cli-tareas/"
        tono="ambar"
        desde={0.3}
        hojas={[
          { f: "tests/conftest.py", nota: "fixtures" },
          { f: "tests/test_config.py", nota: "8 pruebas" },
          { f: "tests/test_acciones.py", nota: "6 pruebas" },
          { f: "tests/test_ia.py", nota: "9, sin red" },
          { f: "tests/test_cli.py", nota: "5, de 0 a 4" },
          { f: ".github/workflows/pruebas.yml", nota: "3 sistemas" },
          { f: "pyproject.toml", nota: "version 1.0.0" },
          { f: "CHANGELOG.md", nota: "para quien la usa" },
          { f: "README.md", nota: "instalar con una orden" },
        ]}
      />
      <ArbolSvg
        x={534}
        raiz="y además…"
        tono="morado"
        desde={2.4}
        hojas={[
          { f: "scripts/revisar.sh", nota: "opencode run" },
          { f: "docs/prompts.md", nota: "y lo que corregiste" },
          { f: "rama release-1.0", nota: "y su PR" },
          { f: "etiqueta v1.0.0", nota: "y su release" },
          { f: "issues", nota: "del día de instalación" },
        ]}
      />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* A mano frente a pytest                                              */
/* Carril 1: rótulo a y = 36; seis fichas de 310 × 38 en dos filas    */
/* (x 16 · 340 · 664; y 50 · 98). Carril 2: rótulo a y = 184; ficha    */
/* uv run pytest 16..326 × 200..250 y resultado 380..984 × 196..254.  */
/* ------------------------------------------------------------------ */

const A_MANO = ["mkdir + touch: ficheros feos", "uv run tareas validar", "… ejecutar … --simular", "ls para ver qué ha pasado", "echo $? para el código", "¿y en Windows? Otra vez"];

export function ManualFrenteAutomatico() {
  const u = "mano";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={276}
      animada
      etiqueta="Probar a mano frente a probar con pytest. A mano, cada vez que cambias algo: crear ficheros feos con mkdir y touch, uv run tareas validar, ejecutar con --simular, ls para ver qué ha pasado, echo $? para el código de salida, y en Windows otra vez; y algún caso se olvida. Con pytest, una orden, uv run pytest, y las 28 pruebas pasan en 0,18 segundos, siempre las mismas."
    >
      <T x={16} y={36} peso={800} color={fuerte("rosa")} an={0}>
        A mano, cada vez que cambias algo
      </T>
      {A_MANO.map((t, i) => {
        const x = 16 + (i % 3) * 324;
        const y = i < 3 ? 50 : 98;
        return (
          <g key={t} data-caja="" {...an("aparece", 0.3 + i * 0.45, 0.4)}>
            <rect x={x} y={y} width={310} height={38} rx={8} fill={suave("rosa")} stroke={linea("rosa")} strokeWidth={1.5} />
            <text x={x + 14} y={y + 25} fontSize={16} fontWeight={600} fill={TINTA}>
              {t}
            </text>
          </g>
        );
      })}
      <T x={16} y={162} an={3.0}>
        Y siempre se olvida algún caso.
      </T>
      <T x={16} y={204} peso={800} color={fuerte("verde")} an={3.3}>
        Con pytest, siempre igual
      </T>
      <Caja x={16} y={216} w={310} h={50} tono="verde" titulo="uv run pytest" mono an={3.5} />
      <Flecha uid={u} d="M326 241 H374" tono="verde" an={3.8} dur={0.25} pulso />
      <Caja x={380} y={216} w={604} h={50} tono="verde" titulo="28 passed in 0.18s" mono an={4.0} tipo="surge" grosor={3} />
      <Halo x={380} y={216} w={604} h={50} tono="verde" an={4.4} rx={14} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Las capas de tus pruebas                                            */
/* Pirámide desplazada a la izquierda: base 16..736 × 220..300, medio  */
/* 96..656 × 130..210, cima 176..576 × 40..120. A la derecha, flecha   */
/* de x = 790 de y 296 a 50 con sus rótulos a x = 810.                 */
/* ------------------------------------------------------------------ */

export function CapasPruebas() {
  const u = "capas4";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={316}
      animada
      etiqueta="Las capas de tus 28 pruebas, de dentro a fuera. Abajo, las piezas sueltas: test_config.py con 8 y test_ia.py con 9, funciones y clases. En medio, las acciones con ficheros: test_acciones.py, 6 pruebas en tmp_path. Arriba, la CLI desde fuera: test_cli.py, 5 pruebas con CliRunner, como la usaría una persona."
      pie="Abajo, pruebas pequeñas y rápidas que dicen exactamente qué falla; arriba, pocas pruebas que miran la herramienta entera."
    >
      <Caja x={16} y={220} w={720} h={80} tono="morado" titulo="Piezas sueltas" lineas={["8 de config y 9 de IA"]} an={0.2} tipo="desliza" />
      <Caja x={96} y={130} w={560} h={80} tono="verde" titulo="Acciones con ficheros" lineas={["6 pruebas · tmp_path"]} an={0.8} tipo="desliza" />
      <Caja x={176} y={40} w={400} h={80} tono="azul" titulo="La CLI desde fuera" lineas={["5 pruebas · CliRunner"]} an={1.4} tipo="desliza" />
      <Flecha uid={u} d="M790 296 V50" tono="gris" an={2.0} dur={0.6} />
      <T x={810} y={64} peso={800} color={TINTA} an={2.4}>
        como la usa
      </T>
      <T x={810} y={88} an={2.5}>
        una persona
      </T>
      <T x={810} y={262} peso={800} color={TINTA} an={2.6}>
        pieza a pieza,
      </T>
      <T x={810} y={286} an={2.7}>
        muy rápidas
      </T>
      <T x={16} y={64} peso={800} tam={18} color={fuerte("verde")} an={2.9}>
        28 pruebas
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Una prueba en tres tiempos (test_nunca_sobrescribe, abreviada)       */
/* Código 16..748 × 20..312, nueve líneas mono cada 30 desde y = 52,   */
/* x = 36 (la más larga, 69 car. ≈ 683, acaba en 719). Llaves a x = 760 */
/* sobre las líneas 2-4, 5-6 y 7-9; rótulo a x = 790 (≤ 24 car.).      */
/* ------------------------------------------------------------------ */

const PRUEBA: string[] = [
  "def test_nunca_sobrescribe(descargas, tmp_path):",
  '    destino = tmp_path / "PDF"',
  "    destino.mkdir()",
  '    (destino / "factura.pdf").write_text("la que ya estaba", …)',
  '    motor = motor_con(tipo="mover", …, destino=str(destino))',
  '    motor.ejecutar("prueba", descargas, simular=False)',
  '    vieja, nueva = destino / "factura.pdf", destino / "factura (1).pdf"',
  '    assert vieja.read_text(…) == "la que ya estaba"',
  "    assert nueva.exists()",
];
const TIEMPOS: { de: number; a: number; t: string; sub: string; tono: TonoSvg }[] = [
  { de: 1, a: 3, t: "1 · Prepara", sub: "la factura que ya estaba", tono: "azul" },
  { de: 4, a: 5, t: "2 · Actúa", sub: "mover los PDF a PDF/", tono: "morado" },
  { de: 6, a: 8, t: "3 · Comprueba", sub: "la vieja, intacta; y (1)", tono: "verde" },
];

export function AnatomiaPrueba() {
  return (
    <Figura
      uid="aaa"
      ancho={1060}
      alto={330}
      animada
      etiqueta="Una prueba en tres tiempos, test_nunca_sobrescribe. 1, prepara: crea la carpeta PDF y dentro una factura.pdf que ya estaba. 2, actúa: el motor mueve los PDF de descargas a PDF. 3, comprueba: la factura vieja sigue intacta y la nueva se llama factura (1).pdf."
      pie="Preparar, actuar, comprobar: casi todas las pruebas tienen esta forma. Si no sabes decir qué comprueba cada assert, aún no es tu prueba."
    >
      <rect x={16} y={20} width={732} height={292} rx={12} fill="var(--dg-papel)" stroke={linea("gris")} strokeWidth={2} {...an("funde", 0, 0.4)} />
      {PRUEBA.map((l, i) => (
        <text key={l} x={36} y={52 + i * 30} fontSize={16} className="whitespace-pre font-mono" fill={i === 0 ? fuerte("azul") : TINTA} fontWeight={i === 0 ? 700 : 500} {...an("funde", 0.2 + i * 0.25, 0.3)}>
          {l}
        </text>
      ))}
      {TIEMPOS.map((b, k) => {
        const y1 = 52 + b.de * 30 - 18;
        const y2 = 52 + b.a * 30 + 6;
        const d = 2.4 + k * 0.6;
        return (
          <g key={b.t} {...an("desliza", d, 0.45)}>
            <path d={`M754 ${y1} H764 V${y2} H754`} fill="none" stroke={linea(b.tono)} strokeWidth={3} />
            <text x={790} y={(y1 + y2) / 2 - 2} fontSize={18} fontWeight={800} fill={fuerte(b.tono)}>
              {b.t}
            </text>
            <text x={790} y={(y1 + y2) / 2 + 20} fontSize={16} fontWeight={500} fill={SUAVE}>
              {b.sub}
            </text>
          </g>
        );
      })}
      <Halo x={28} y={244} w={560} h={58} tono="verde" an={4.4} rx={10} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* La caja de arena: lo que hace la fixture `aislado`                  */
/* Zona izquierda 16..420 (cuatro cajas de 364 × 52 a x = 36, y 60 ·   */
/* 124 · 188 · 252). Pared a x = 470. Zona derecha 520..984 (cinco     */
/* cajas de 424 × 44 a x = 540, cada 52 desde y = 60).                 */
/* ------------------------------------------------------------------ */

const REAL = ["~/Documentos y ~/Descargas", "Tu .env y tu clave", "El servidor del centro", "Tu acciones.json real"];
const ARENA: [string, boolean][] = [
  ["tmp_path: …/test_x0/", true],
  ["Descargas/ con 5 ficheros feos", false],
  ["HOME y USERPROFILE → aquí", false],
  ["Sin CENTRO_IA_URL ni _KEY", false],
  ["cwd → aquí (monkeypatch.chdir)", false],
];

export function CajaDeArena() {
  return (
    <Figura
      uid="arena"
      ancho={1000}
      alto={346}
      animada
      etiqueta="La caja de arena de cada prueba. Lo de verdad no se toca: tus carpetas Documentos y Descargas, tu .env y tu clave, el servidor del centro y tu acciones.json real. La fixture aislado, que se aplica sola a todas las pruebas, pone una pared: cada prueba trabaja en su carpeta temporal tmp_path, con una carpeta Descargas de ficheros feos, con HOME y USERPROFILE apuntando ahí, sin las variables CENTRO_IA_URL ni CENTRO_IA_KEY y con la carpeta actual también ahí."
      pie="Una prueba que puede tocar tus ficheros de verdad, tarde o temprano los toca. Aquí, ni puede."
    >
      <Zona x={16} y={16} w={404} h={304} tono="gris" rotulo="Lo de verdad: no se toca" an={0} />
      {REAL.map((t, i) => (
        <Caja key={t} x={36} y={60 + i * 64} w={364} h={52} tono="rosa" titulo={t} izquierda discontinua an={0.3 + i * 0.25} />
      ))}
      <path d="M470 24 V312" fill="none" stroke={linea("rosa")} strokeWidth={6} strokeLinecap="round" pathLength={1} {...an("traza", 1.5, 0.6)} />
      <T x={470} y={340} ancla="middle" peso={800} color={fuerte("rosa")} an={1.9}>
        la fixture aislado
      </T>
      <Zona x={520} y={16} w={464} h={304} tono="verde" rotulo="Cada prueba, en su carpeta" an={2.0} />
      {ARENA.map(([t, mono], i) => (
        <Caja key={t} x={540} y={60 + i * 52} w={424} h={44} tono="verde" titulo={t} mono={mono} izquierda an={2.3 + i * 0.3} />
      ))}
      <Halo x={462} y={24} w={16} h={288} tono="rosa" an={3.8} rx={8} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Las fixtures: quién prepara qué                                     */
/* Fixtures (conftest.py) 40..340, cajas de 68 cada 80 desde y = 60    */
/* (centros 94 · 174 · 254 · 334). Ficheros 660..960, cajas de 52 a    */
/* y 70 · 150 · 230 · 310 (centros 96 · 176 · 256 · 336). Curvas de     */
/* 340 a 654 con llegadas distintas en test_cli.py (334 y 348); las    */
/* discontinuas de aislado llegan 16 por encima del centro.            */
/* ------------------------------------------------------------------ */

const FIXTURES: { n: string; l: string; tono: TonoSvg }[] = [
  { n: "aislado", l: "autouse: en todas", tono: "gris" },
  { n: "descargas", l: "5 ficheros feos y uno viejo", tono: "ambar" },
  { n: "escribir_config", l: "un acciones.json a medida", tono: "azul" },
  { n: "modelo_falso", l: "una IA que no gasta", tono: "morado" },
];
const FICHEROS = ["test_config.py", "test_acciones.py", "test_ia.py", "test_cli.py"];
// [fixture, fichero, y de llegada]
const USOS: [number, number, number][] = [
  [1, 1, 176],
  [1, 3, 334],
  [2, 0, 96],
  [2, 3, 348],
  [3, 2, 256],
];

export function QuienPrepara() {
  const u = "fixtures";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={384}
      animada
      etiqueta="Las fixtures de conftest.py y las pruebas que las usan. aislado se aplica sola a todas (autouse). descargas, con 5 ficheros feos y uno viejo, la usan test_acciones.py y test_cli.py. escribir_config, que escribe un acciones.json a medida, la usan test_config.py y test_cli.py. modelo_falso, una IA que no gasta, la usa test_ia.py."
      pie="Una prueba pide una fixture con solo nombrarla como parámetro: def test_x(descargas, tmp_path)."
    >
      <T x={40} y={36} peso={800} color={TINTA} mono an={0}>
        conftest.py
      </T>
      <T x={660} y={36} peso={800} color={TINTA} an={0.1}>
        las pruebas que las piden
      </T>
      {FIXTURES.map((f, i) => (
        <Caja key={f.n} x={40} y={60 + i * 80} w={300} h={68} tono={f.tono} titulo={f.n} mono lineas={[f.l]} an={0.3 + i * 0.3} />
      ))}
      {FICHEROS.map((f, i) => (
        <Caja key={f} x={660} y={70 + i * 80} w={300} h={52} tono="gris" titulo={f} mono an={0.5 + i * 0.3} />
      ))}
      {FICHEROS.map((_, i) => (
        <path
          key={`a${i}`}
          d={`M340 94 C 500 94, 500 ${96 + i * 80 - 16}, 654 ${96 + i * 80 - 16}`}
          fill="none"
          stroke={linea("gris")}
          strokeWidth={1.5}
          strokeDasharray="5 5"
          {...an("funde", 1.8 + i * 0.1, 0.4)}
        />
      ))}
      {USOS.map(([fx, , y], k) => {
        const y0 = 94 + fx * 80;
        return <Flecha key={k} uid={u} d={`M340 ${y0} C 500 ${y0}, 500 ${y}, 654 ${y}`} tono={FIXTURES[fx].tono} an={2.3 + k * 0.35} dur={0.45} />;
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* parametrize: una función, cuatro pruebas                            */
/* Función 16..416 × 134..226 (centro 180). Casos de 470 × 76 a x = 514,*/
/* y 16 · 100 · 184 · 268 (centros 54 · 138 · 222 · 306); el icono, a   */
/* la derecha de cada caso (círculo de 12 en x = 956).                 */
/* ------------------------------------------------------------------ */

const CASOS: [string, string][] = [
  ["[tipo-inexistente]", '{"tipo": "mober"} → campo tipo'],
  ["[destino-vacio]", '{"destino": ""} → campo destino'],
  ["[sin-descripcion]", '{"descripcion": None} → descripcion'],
  ["[regex-rota]", '{"filtro": {"patron": "*.tmp"}} → filtro.patron'],
];

export function Parametrize() {
  const u = "param";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={360}
      animada
      etiqueta="parametrize: una función de prueba, test_el_error_dice_que_campo_falla, se ejecuta cuatro veces con cuatro casos: tipo-inexistente, mober, falla el campo tipo; destino-vacio, falla destino; sin-descripcion, falla descripcion; y regex-rota, con el patrón *.tmp, falla filtro.patron. Las cuatro pasan."
      pie="Cuatro casos feos con una sola función: añadir el quinto es añadir una línea."
    >
      <T x={16} y={110} mono peso={700} color={fuerte("morado")} an={0}>
        @pytest.mark.parametrize
      </T>
      <Caja x={16} y={134} w={400} h={92} tono="morado" titulo="Una función de prueba" lineas={["test_el_error_dice_que_campo_falla"]} an={0.2} />
      <T x={16} y={262} an={0.6}>
        cuatro ids, cuatro pruebas
      </T>
      {CASOS.map(([id, l], i) => {
        const cy = 54 + i * 84;
        const d = 1.0 + i * 0.45;
        return (
          <g key={id}>
            <Flecha uid={u} d={`M416 180 C 466 180, 460 ${cy}, 508 ${cy}`} tono="morado" an={d} dur={0.35} />
            <Caja x={514} y={cy - 38} w={470} h={76} tono="verde" titulo={id} mono lineas={[l]} an={d + 0.3} />
            <g {...an("surge", d + 0.9, 0.4)}>
              <circle cx={956} cy={cy - 16} r={12} fill={linea("verde")} />
              <path d={`M950 ${cy - 16} L954.5 ${cy - 11.5} L962 ${cy - 21}`} fill="none" stroke="var(--dg-sobre-tono)" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Rojo, verde: la prueba que prueba                                   */
/* Tres columnas de 300 a x = 16 · 350 · 684. Arriba y 40..116 (centro */
/* 78), abajo y 180..256. Flechas de 28 en los huecos de 34; bajadas   */
/* por el centro de cada columna.                                      */
/* ------------------------------------------------------------------ */

export function RojoVerde() {
  const u = "rojoverde";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={300}
      animada
      etiqueta="La prueba que prueba. Con tu código de verdad, 28 passed in 0.21s. Lo rompes a propósito sacando el mkdir del if de --simular: 1 failed, 27 passed, y la que falla es test_simular_no_toca_el_disco. Lo dejas como estaba con git restore: 28 passed otra vez. La prueba sí protege."
      pie="Salidas reales. Si al romper el código nada se pone en rojo, esa prueba no protegía nada."
    >
      <Caja x={16} y={40} w={300} h={76} tono="gris" titulo="Tu código de verdad" lineas={["como está en el repo"]} an={0.1} />
      <Caja x={350} y={40} w={300} h={76} tono="rosa" titulo="Lo rompes a propósito" lineas={["mkdir fuera del if"]} an={1.2} />
      <Caja x={684} y={40} w={300} h={76} tono="gris" titulo="Lo dejas como estaba" lineas={["git restore"]} an={2.6} />
      <Flecha uid={u} d="M316 78 H344" an={1.0} dur={0.2} />
      <Flecha uid={u} d="M650 78 H678" an={2.4} dur={0.2} />
      <Flecha uid={u} d="M166 116 V174" tono="verde" an={0.5} dur={0.25} />
      <Flecha uid={u} d="M500 116 V174" tono="rosa" an={1.6} dur={0.25} />
      <Flecha uid={u} d="M834 116 V174" tono="verde" an={3.0} dur={0.25} />
      <Caja x={16} y={180} w={300} h={76} tono="verde" titulo="28 passed in 0.21s" mono lineas={["todo en verde"]} an={0.7} />
      <Caja x={350} y={180} w={300} h={76} tono="rosa" titulo="1 failed, 27 passed" mono lineas={["test_simular_no_toca_el_disco"]} an={1.8} grosor={3} />
      <Caja x={684} y={180} w={300} h={76} tono="verde" titulo="28 passed, otra vez" mono lineas={["la prueba sí protege"]} an={3.2} />
      <Halo x={350} y={180} w={300} h={76} tono="rosa" an={2.1} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El modelo falso                                                     */
/* Fila de arriba y 40..116 (centro 78): prueba 16..216, Motor 266..486,*/
/* Resumir 536..756, el .md 806..984. Abajo y 190..266: ProveedorCentro */
/* (discontinua) 266..486 y ProveedorFalso 536..756. Pregunta y         */
/* respuesta por x 606 y 686. Nota a y = 300.                          */
/* ------------------------------------------------------------------ */

export function ModeloFalso() {
  const u = "falso";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={316}
      animada
      etiqueta="El modelo falso en una prueba. La prueba crea el Motor con proveedor igual al modelo falso. Resumir le pregunta al ProveedorFalso, que apunta la pregunta y responde lo que le dijiste; Resumir escribe el .md en tmp_path. El ProveedorCentro no se llama nunca: ni red, ni clave, ni tokens. Al final se comprueba que el .md dice «La CPU» y que la pregunta llevaba <documento>."
    >
      <Caja x={16} y={40} w={200} h={76} tono="gris" titulo="La prueba" lineas={["test_resumir_…"]} an={0.1} />
      <Caja x={266} y={40} w={220} h={76} tono="azul" titulo="Motor" mono lineas={["proveedor=falso"]} an={0.5} />
      <Caja x={536} y={40} w={220} h={76} tono="azul" titulo="Resumir" mono lineas={["pregunta y escribe"]} an={0.9} />
      <Caja x={806} y={40} w={178} h={76} tono="verde" titulo="El .md" lineas={["en tmp_path"]} an={2.6} />
      <Caja x={536} y={190} w={220} h={76} tono="morado" titulo="ProveedorFalso" mono lineas={["apunta la pregunta"]} an={1.4} grosor={3} />
      <Caja x={266} y={190} w={220} h={76} tono="gris" titulo="ProveedorCentro" mono lineas={["no se llama nunca"]} discontinua an={1.2} />
      <Flecha uid={u} d="M216 78 H260" an={0.4} dur={0.2} />
      <Flecha uid={u} d="M486 78 H530" tono="azul" an={0.8} dur={0.2} />
      <Flecha uid={u} d="M606 116 V184" tono="morado" an={1.7} dur={0.25} pulso={1.4} />
      <Flecha uid={u} d="M686 190 V122" tono="morado" an={2.0} dur={0.25} pulso={1.4} />
      <Flecha uid={u} d="M756 78 H800" tono="verde" an={2.4} dur={0.2} />
      <path d="M376 116 V184" fill="none" stroke={linea("gris")} strokeWidth={2} strokeDasharray="5 6" {...an("funde", 1.2, 0.4)} />
      <T x={366} y={156} ancla="end" peso={800} color={fuerte("rosa")} an={1.3}>
        ✗ ni red, ni clave, ni tokens
      </T>
      <T x={16} y={304} color={TINTA} peso={600} an={3.0}>
        assert «La CPU» en el .md · assert «&lt;documento&gt;» en falso.preguntas[0]
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* CliRunner: cada código de salida, su prueba                         */
/* Cinco filas cada 52 desde y = 24 (alto 40): orden mono 16..436;     */
/* píldora «sale con N» 470..590; nombre de la prueba a x = 610 (el    */
/* más largo, 37 car. mono ≈ 366, acaba en 976).                       */
/* ------------------------------------------------------------------ */

const CODIGOS: [string, number, string, TonoSvg][] = [
  ["tareas --help", 0, "test_la_ayuda_funciona", "verde"],
  ["tareas ejecutar inventada", 1, "test_accion_que_no_existe_sale_con_1", "rosa"],
  ["tareas listar --inventada", 2, "test_opcion_que_no_existe_sale_con_2", "ambar"],
  ["tareas --config roto.json validar", 3, "test_json_roto_sale_con_3_y_sin_traza", "morado"],
  ["tareas ejecutar res  (sin clave)", 4, "test_ia_sin_clave_sale_con_4", "azul"],
];

export function CodigosCli() {
  const u = "codigos4";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={290}
      animada
      etiqueta={`Cada código de salida, con su prueba de CliRunner: ${CODIGOS.map(([o, c, t]) => `${o} sale con ${c}, lo prueba ${t}`).join("; ")}.`}
      pie="CliRunner ejecuta tu CLI dentro de la prueba, como si la tecleara alguien, y te da su salida y su código."
    >
      {CODIGOS.map(([orden, c, prueba, tono], i) => {
        const y = 24 + i * 52;
        const d = 0.2 + i * 0.5;
        return (
          <g key={orden}>
            <g data-caja="" {...an("desliza", d, 0.4)}>
              <rect x={16} y={y} width={420} height={40} rx={8} fill="#0b1120" />
              <text x={30} y={y + 26} fontSize={16} className="whitespace-pre font-mono" fill="#a7f3d0">
                {orden}
              </text>
            </g>
            <Flecha uid={u} d={`M436 ${y + 20} H464`} tono={tono} an={d + 0.3} dur={0.15} />
            <g data-caja="" {...an("surge", d + 0.4, 0.4)}>
              <rect x={470} y={y + 2} width={120} height={36} rx={18} fill={suave(tono)} stroke={linea(tono)} strokeWidth={2} />
              <text x={530} y={y + 26} textAnchor="middle" fontSize={16} fontWeight={800} fill={fuerte(tono)}>
                {`sale con ${c}`}
              </text>
            </g>
            <T x={610} y={y + 26} mono color={TINTA} an={d + 0.55}>
              {prueba}
            </T>
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Cobertura real por módulo (pytest --cov)                            */
/* Filas cada 36 desde y = 40: módulo mono a x = 16; barra hueca de    */
/* 500 desde x = 260 y encima la llena (5 px por punto); la cifra a     */
/* x = 776.                                                            */
/* ------------------------------------------------------------------ */

const COBERTURA: [string, number][] = [
  ["errores.py", 100],
  ["motor.py", 93],
  ["config.py", 88],
  ["acciones.py", 86],
  ["ia.py", 74],
  ["cli.py", 39],
  ["TOTAL", 71],
];

export function Cobertura() {
  return (
    <Figura
      uid="cobertura"
      ancho={1000}
      alto={300}
      animada
      etiqueta={`Cobertura real de las 28 pruebas por módulo: ${COBERTURA.map(([m, p]) => `${m}, ${p} %`).join("; ")}. cli.py se queda en el 39 %: las pruebas de la CLI solo miran los errores.`}
      pie="Medido con pytest-cov en la CLI de referencia. cli.py, al 39 %: ninguna prueba ejecuta de verdad listar ni una acción desde la orden."
    >
      {COBERTURA.map(([m, p], i) => {
        const y = 40 + i * 36;
        const tono: TonoSvg = p >= 85 ? "verde" : p >= 70 ? "ambar" : "rosa";
        const total = m === "TOTAL";
        return (
          <g key={m}>
            <T x={16} y={y + 6} mono peso={total ? 800 : 600} color={TINTA} an={0.1 + i * 0.15}>
              {total ? "total" : `src/tareas/${m}`}
            </T>
            <Barra x={260} y={y - 10} w={500} h={22} tono="gris" hueca an={0.15 + i * 0.15} dur={0.3} />
            <Barra x={260} y={y - 10} w={p * 5} h={22} tono={tono} an={0.4 + i * 0.15} dur={0.4 + p / 150} />
            <T x={776} y={y + 6} peso={800} color={fuerte(tono)} an={0.9 + i * 0.15 + p / 150}>
              {`${p} %`}
            </T>
          </g>
        );
      })}
      <Halo x={260} y={210} w={500} h={22} tono="rosa" an={2.6} rx={10} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* GitHub Actions: la matriz de tres sistemas (ilustración)            */
/* git push 16..176 × 137..193; flujo Pruebas 216..396 × 120..210      */
/* (centro y 165). Carriles a y 80 · 150 · 220 (centros 100 · 170 ·    */
/* 240): rótulo mono 436..616; tres pasos-barra de 110 · 120 · 104 a   */
/* x 650 · 780 · 920; la marca a x = 1040. Cabeceras de paso a y = 52. */
/* ------------------------------------------------------------------ */

const SISTEMAS: [string, number][] = [
  ["ubuntu-latest", 0],
  ["windows-latest", 0.9],
  ["macos-latest", 0.45],
];
const PASOS_CI: [string, number, number][] = [
  ["checkout", 650, 110],
  ["setup-uv 3.12", 780, 120],
  ["pytest -v", 920, 104],
];

export function MatrizActions() {
  const u = "ci";
  return (
    <Figura
      uid={u}
      ancho={1060}
      alto={290}
      animada
      etiqueta="Lo que pasa en GitHub Actions con cada git push: el flujo Pruebas, de pruebas.yml, lanza tres máquinas a la vez, ubuntu-latest, windows-latest y macos-latest. En cada una: checkout del repo, setup-uv con Python 3.12 y uv run pytest. Si las tres acaban en verde, tu herramienta funciona en los tres sistemas."
      pie="Ilustración: los tiempos de verdad los ves en la pestaña Actions de tu repo. Cada sistema va a su ritmo."
    >
      <Caja x={16} y={137} w={160} h={56} tono="gris" titulo="Haces push" an={0} />
      <Flecha uid={u} d="M176 165 H210" an={0.3} dur={0.2} pulso />
      <Caja x={216} y={120} w={180} h={90} tono="azul" titulo="El workflow" lineas={["pruebas.yml", "en cada push"]} an={0.5} />
      {PASOS_CI.map(([t, x, w], j) => (
        <T key={t} x={x + w / 2} y={52} ancla="middle" peso={700} mono color={SUAVE} an={0.8 + j * 0.1}>
          {t}
        </T>
      ))}
      {SISTEMAS.map(([s, retraso], i) => {
        const cy = 100 + i * 70;
        const d = 1.1 + i * 0.15;
        return (
          <g key={s}>
            <Flecha uid={u} d={`M396 165 C 416 165, 410 ${cy}, 430 ${cy}`} tono="azul" an={0.9 + i * 0.1} dur={0.3} />
            <T x={436} y={cy + 6} mono peso={800} color={TINTA} an={d}>
              {s}
            </T>
            {PASOS_CI.map(([t, x, w], j) => (
              <g key={t}>
                <Barra x={x} y={cy - 14} w={w} h={28} tono="gris" hueca an={d} dur={0.2} />
                <Barra x={x} y={cy - 14} w={w} h={28} tono={j === 2 ? "verde" : "azul"} an={d + 0.3 + retraso + j * (0.7 + retraso * 0.5)} dur={0.6 + retraso * 0.4} />
              </g>
            ))}
            <g {...an("surge", d + 0.3 + retraso + 2 * (0.7 + retraso * 0.5) + 0.7 + retraso * 0.4, 0.4)}>
              <circle cx={1040} cy={cy} r={13} fill={linea("verde")} />
              <path d={`M1033.5 ${cy} L1038 ${cy + 4.5} L1046 ${cy - 5}`} fill="none" stroke="var(--dg-sobre-tono)" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* opencode run en un script                                           */
/* git diff 16..216 × 60..136 (centro 98) → opencode run 276..516 →    */
/* stdout 576..796 × 20..96 (centro 58) y stderr 576..796 × 120..196   */
/* (centro 158); VEREDICTO 846..984 × 20..96. Abajo: timeout 16..216 y  */
/* «sin nadie delante» 276..516, y 210..286.                           */
/* ------------------------------------------------------------------ */

export function RunEnScript() {
  const u = "run";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={300}
      animada
      etiqueta="opencode run dentro de un script. git diff --staged entra por la entrada estándar en opencode run con el agente revisor. Por la salida estándar sale la revisión, que acaba en VEREDICTO: OK o CAMBIAR; por la salida de error, la cabecera con el agente y el modelo. timeout 180 lo corta si el servidor no responde. Y sin nadie delante, cada regla ask se trata como deny."
      pie="Medido: entre 14 y 31 s para revisar un diff. stdout se puede guardar o filtrar; stderr no lo ensucia."
    >
      <Caja x={16} y={60} w={200} h={76} tono="gris" titulo="git diff --staged" mono lineas={["por la entrada"]} an={0.1} />
      <Caja x={276} y={60} w={240} h={76} tono="morado" titulo="opencode run" mono lineas={["--agent revisor"]} an={0.6} grosor={3} />
      <Caja x={576} y={20} w={220} h={76} tono="verde" titulo="stdout" mono lineas={["la revisión"]} an={1.4} />
      <Caja x={576} y={120} w={220} h={76} tono="gris" titulo="stderr" mono lineas={["la cabecera"]} an={1.7} />
      <Caja x={846} y={20} w={138} h={76} tono="ambar" titulo="VEREDICTO" lineas={["OK o CAMBIAR"]} an={2.2} />
      <Caja x={16} y={210} w={200} h={76} tono="ambar" titulo="timeout 180" mono lineas={["si no responde"]} an={2.6} />
      <Caja x={276} y={210} w={240} h={76} tono="rosa" titulo="Sin nadie delante" lineas={["ask se trata como deny"]} an={3.0} discontinua />
      <Flecha uid={u} d="M216 98 H270" an={0.4} dur={0.25} pulso />
      <Flecha uid={u} d="M516 88 C 546 88, 546 58, 570 58" tono="verde" an={1.2} dur={0.3} pulso />
      <Flecha uid={u} d="M516 108 C 546 108, 546 158, 570 158" an={1.5} dur={0.3} />
      <Flecha uid={u} d="M796 58 H840" tono="ambar" an={2.0} dur={0.2} />
      <Flecha uid={u} d="M216 248 C 246 248, 300 190, 300 142" tono="ambar" an={2.8} dur={0.35} />
      <Flecha uid={u} d="M396 210 V142" tono="rosa" discontinua an={3.2} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Tu historial, de la v0.1.0 a la v1.0.0 (grafo de commits real)      */
/* Carriles: main a x = 60 y release-1.0 a x = 170, con su píldora      */
/* arriba (y 20..46). Bolas de radio 11 (anillo del color del fondo y   */
/* halo de 15) cada 32 desde y = 80. Hash mono a x = 230; si hay        */
/* etiqueta, píldora de 300 a 380 y mensaje a 392; si no, a 310. La    */
/* fusión entra en la bola a 40°: punto (69,6; 91,5), último control    */
/* (82,5; 106,8) alineado con el centro. Filas cada 32: la rama sale de */
/* la bola de d2213b3 (y 208) a 40° y llega en vertical a la de b95b120 */
/* (y 176), y la fusión parte de la de d36d707 (y 112).                 */
/* ------------------------------------------------------------------ */

const HISTORIAL: { h: string; m: string; rama: "main" | "release"; tag?: string }[] = [
  { h: "88e2170", m: "Merge pull request #1 from ana-garcia/release-1.0", rama: "main", tag: "v1.0.0" },
  { h: "d36d707", m: "Versión 1.0.0", rama: "release" },
  { h: "2f7ad15", m: "README: instalación con una orden y ejemplos de cada acción", rama: "release" },
  { h: "b95b120", m: "CHANGELOG 1.0.0 revisado a mano (el borrador del agente traía un error)", rama: "release" },
  { h: "d2213b3", m: "scripts/revisar.sh: el revisor con opencode run antes de cada commit", rama: "main" },
  { h: "46347a3", m: "GitHub Actions: pytest en Ubuntu, Windows y macOS en cada push", rama: "main" },
  { h: "0e7d6dc", m: "Pruebas de la CLI con CliRunner: códigos de salida 0, 1, 2, 3 y 4", rama: "main" },
  { h: "7b77992", m: "ADR-0002: la IA detrás de una interfaz; skill y README al día…", rama: "main", tag: "v0.3.0" },
  { h: "34fcff6", m: "ADR-0001: por qué configuración externa; prompts clave…", rama: "main", tag: "v0.2.0" },
  { h: "4637ba1", m: "listar: error claro y código 1 si la carpeta no existe", rama: "main", tag: "v0.1.0" },
];
const X_RAMA = { main: 60, release: 170 } as const;

export function GrafoRelease() {
  const filas = HISTORIAL.map((c, i) => ({ ...c, y: 80 + i * 32 }));
  const ultimo = filas[filas.length - 1].y;
  return (
    <Figura
      uid="grafo"
      ancho={1060}
      alto={ultimo + 30}
      animada
      etiqueta={`Tu historial real, de la versión 0.1.0 a la 1.0.0, en dos ramas, main y release-1.0: ${HISTORIAL.map((c) => `${c.h}, ${c.m}${c.tag ? `, etiqueta ${c.tag}` : ""}${c.rama === "release" ? ", en release-1.0" : ""}`).join("; ")}.`}
    >
      <g {...an("surge", 0, 0.4)}>
        <rect x={30} y={20} width={60} height={26} rx={13} fill={suave("azul")} stroke={linea("azul")} strokeWidth={1.5} />
        <text x={60} y={38} fontSize={16} fontWeight={800} fill={fuerte("azul")} textAnchor="middle" className="font-mono">
          main
        </text>
      </g>
      <g {...an("surge", 1.6, 0.4)}>
        <rect x={110} y={20} width={120} height={26} rx={13} fill={suave("morado")} stroke={linea("morado")} strokeWidth={1.5} />
        <text x={170} y={38} fontSize={16} fontWeight={800} fill={fuerte("morado")} textAnchor="middle" className="font-mono">
          release-1.0
        </text>
      </g>
      <path d={`M60 ${ultimo + 15} V46`} fill="none" stroke={linea("azul")} strokeWidth={3} pathLength={1} {...an("traza", 0.2, 2.6)} />
      <path d="M170 176 V46" fill="none" stroke={linea("morado")} strokeWidth={3} pathLength={1} {...an("traza", 1.8, 0.6)} />
      <path d="M69.6 196.5 C 82.5 181.2, 170 214, 170 191" fill="none" stroke={linea("morado")} strokeWidth={3} pathLength={1} {...an("traza", 1.5, 0.4)} />
      <path d="M170 97 C 170 88, 82.5 106.8, 69.6 91.5" fill="none" stroke={linea("morado")} strokeWidth={3} pathLength={1} {...an("traza", 2.9, 0.4)} />
      {filas
        .slice()
        .reverse()
        .map((c, k) => {
          const x = X_RAMA[c.rama];
          const tono: TonoSvg = c.rama === "main" ? "azul" : "morado";
          const d = 0.3 + k * 0.28;
          return (
            <g key={c.h} {...an("aparece", d, 0.35)}>
              <circle cx={x} cy={c.y} r={15} fill="var(--dg-fondo)" />
              <circle cx={x} cy={c.y} r={11} fill={linea(tono)} stroke="var(--dg-fondo)" strokeWidth={3} />
              <text x={230} y={c.y + 6} fontSize={16} className="font-mono" fill={SUAVE}>
                {c.h}
              </text>
              {c.tag ? (
                <g>
                  <rect x={300} y={c.y - 13} width={80} height={26} rx={13} fill={suave("ambar")} stroke={linea("ambar")} strokeWidth={1.5} />
                  <text x={340} y={c.y + 6} textAnchor="middle" fontSize={16} fontWeight={800} fill={fuerte("ambar")} className="font-mono">
                    {c.tag}
                  </text>
                </g>
              ) : null}
              <text x={c.tag ? 392 : 310} y={c.y + 6} fontSize={16} fill={TINTA} fontWeight={c.tag === "v1.0.0" ? 800 : 500}>
                {c.m}
              </text>
            </g>
          );
        })}
      <Halo x={300} y={67} w={80} h={26} tono="ambar" an={3.4} rx={14} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Del tag a otra persona                                              */
/* Cinco cajas de 180 × 76 cada 205 desde x = 16 (16 · 221 · 426 · 631 */
/* · 836, acaba en 1016), y 40..116 (centro 78); flechas de 19.        */
/* ------------------------------------------------------------------ */

const RELEASE: [string, string, TonoSvg][] = [
  ["La etiqueta", "git tag -a v1.0.0", "ambar"],
  ["A GitHub", "git push --tags", "gris"],
  ["La release", "gh release create", "azul"],
  ["Otra persona", "uv tool install …", "morado"],
  ["Ya la tiene", "tareas 1.0.0", "verde"],
];

export function DelTagAOtraPersona() {
  const u = "tag";
  return (
    <Figura
      uid={u}
      ancho={1032}
      alto={160}
      animada
      etiqueta="Del tag a otra persona: la etiqueta con git tag -a v1.0.0; a GitHub con git push --tags; la release con gh release create; otra persona la instala con uv tool install desde tu repo y la etiqueta; y ya la tiene: tareas version dice 1.0.0."
      pie="La etiqueta congela una versión: quien instala @v1.0.0 tiene siempre exactamente eso."
    >
      {RELEASE.map(([t, l, tono], i) => (
        <Caja key={t} x={16 + i * 205} y={40} w={180} h={76} tono={tono} titulo={t} lineas={[l]} an={0.1 + i * 0.5} />
      ))}
      {[0, 1, 2, 3].map((k) => (
        <Flecha key={k} uid={u} d={`M${196 + k * 205} 78 H${215 + k * 205}`} an={0.4 + k * 0.5} dur={0.15} pulso />
      ))}
      <Halo x={836} y={40} w={180} h={76} tono="verde" an={2.6} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El día de instalación cruzada                                       */
/* Dos filas de tres cajas de 300 cada 330 desde x = 16 (16 · 346 ·    */
/* 676): fila 1 y 30..106, fila 2 y 170..246 (de derecha a izquierda). */
/* La vuelta, de la caja 6 a la 1, por x = 166.                        */
/* ------------------------------------------------------------------ */

export function InstalacionCruzada() {
  const u = "cruzada";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={262}
      animada
      etiqueta="El día de instalación cruzada. Tu repo en la versión 1.0.0; lo instala otra persona siguiendo solo tu README; lo usa con sus propios ficheros; si algo falla, abre un issue; tú lo arreglas con una prueba que lo demuestre; y publicas la 1.0.1 y se lo dices. Y vuelta a empezar."
      pie="Lo que falla en el equipo de otra persona no lo ibas a ver nunca en el tuyo."
    >
      <Caja x={16} y={30} w={300} h={76} tono="gris" titulo="Tu repo, v1.0.0" lineas={["README, CHANGELOG, tag"]} an={0.1} />
      <Caja x={346} y={30} w={300} h={76} tono="azul" titulo="Lo instala otra persona" lineas={["solo con tu README"]} an={0.6} />
      <Caja x={676} y={30} w={300} h={76} tono="azul" titulo="Con SUS ficheros" lineas={["y en SU sistema"]} an={1.1} />
      <Caja x={676} y={170} w={300} h={76} tono="rosa" titulo="Abre un issue" lineas={["qué hizo, qué esperaba"]} an={1.7} />
      <Caja x={346} y={170} w={300} h={76} tono="ambar" titulo="Lo arreglas" lineas={["con una prueba que lo diga"]} an={2.2} />
      <Caja x={16} y={170} w={300} h={76} tono="verde" titulo="Publicas la v1.0.1" lineas={["y se lo dices"]} an={2.7} />
      <Flecha uid={u} d="M316 68 H340" an={0.4} dur={0.15} />
      <Flecha uid={u} d="M646 68 H670" an={0.9} dur={0.15} />
      <Flecha uid={u} d="M826 106 V164" tono="rosa" an={1.4} dur={0.25} />
      <Flecha uid={u} d="M676 208 H652" tono="ambar" an={2.0} dur={0.15} />
      <Flecha uid={u} d="M346 208 H322" tono="verde" an={2.5} dur={0.15} />
      <Flecha uid={u} d="M166 170 V112" tono="verde" an={3.0} dur={0.25} pulso />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* La semana de un vistazo: nueve pasos                                */
/* Tres filas de tres cajas de 300 × 76 cada 330 desde x = 16, y 20 ·  */
/* 120 · 220. Flechas de 24 en los huecos; los cambios de fila bajan   */
/* por la derecha (x 826) y vuelven a la izquierda hasta x = 166.      */
/* ------------------------------------------------------------------ */

const SEMANA: { titulo: string; linea: string; tono: TonoSvg }[] = [
  { titulo: "1 · pytest", linea: "conftest y la caja de arena", tono: "azul" },
  { titulo: "2 · Config y acciones", linea: "casos feos con parametrize", tono: "azul" },
  { titulo: "3 · La prueba que prueba", linea: "rómpelo a propósito", tono: "rosa" },
  { titulo: "4 · IA sin red", linea: "con un modelo falso", tono: "morado" },
  { titulo: "5 · La CLI desde fuera", linea: "CliRunner, del 0 al 4", tono: "azul" },
  { titulo: "6 · GitHub Actions", linea: "tres sistemas en cada push", tono: "verde" },
  { titulo: "7 · opencode run", linea: "el revisor en un script", tono: "morado" },
  { titulo: "8 · Release v1.0", linea: "rama, PR, CHANGELOG y tag", tono: "ambar" },
  { titulo: "9 · Instalación cruzada", linea: "la de otra persona", tono: "verde" },
];

export function SemanaPasos() {
  const u = "semana4";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={316}
      animada
      etiqueta={`La semana 4 de un vistazo, en nueve pasos: ${SEMANA.map((p) => `${p.titulo}, ${p.linea}`).join("; ")}.`}
    >
      {SEMANA.map((p, i) => (
        <Caja key={p.titulo} x={16 + (i % 3) * 330} y={20 + Math.floor(i / 3) * 100} w={300} h={76} tono={p.tono} titulo={p.titulo} lineas={[p.linea]} an={0.1 + i * 0.3} />
      ))}
      {[0, 1, 2].map((f) => (
        <g key={f}>
          <Flecha uid={u} d={`M316 ${58 + f * 100} H340`} an={0.3 + f * 0.9} dur={0.12} />
          <Flecha uid={u} d={`M646 ${58 + f * 100} H670`} an={0.6 + f * 0.9} dur={0.12} />
        </g>
      ))}
      <Flecha uid={u} d="M826 96 V108 H166 V114" an={0.85} dur={0.3} />
      <Flecha uid={u} d="M826 196 V208 H166 V214" an={1.75} dur={0.3} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Dónde estás en el proyecto                                          */
/* Línea a y = 70 de x = 100 a 900; hitos cada 200; píldora sobre la    */
/* semana 4 (x 652..748).                                              */
/* ------------------------------------------------------------------ */

const HITOS: { t: string; d: string; estado: "hecho" | "ahora" | "luego" }[] = [
  { t: "Semana 1", d: "Arranque", estado: "hecho" },
  { t: "Semana 2", d: "acciones.json y motor", estado: "hecho" },
  { t: "Semana 3", d: "MCP y capa IA", estado: "hecho" },
  { t: "Semana 4", d: "pruebas y release", estado: "ahora" },
  { t: "Entrega", d: "semi: 20 nov", estado: "luego" },
];

export function DondeEstas() {
  return (
    <Figura
      uid="semanas4"
      ancho={1000}
      alto={156}
      animada
      etiqueta="Dónde estás en el proyecto 2: semanas 1, 2 y 3 hechas; semana 4, pruebas y release, estás aquí; y después, la entrega del semipresencial, el 20 de noviembre."
    >
      <path d="M100 70 H900" fill="none" stroke={linea("gris")} strokeWidth={3} pathLength={1} {...an("traza", 0, 1.2)} />
      <g {...an("surge", 1.2, 0.5)}>
        <rect x={652} y={18} width={96} height={26} rx={13} fill={suave("verde")} stroke={linea("verde")} strokeWidth={1.5} />
        <text x={700} y={36} fontSize={16} fontWeight={800} fill={fuerte("verde")} textAnchor="middle">
          estás aquí
        </text>
      </g>
      {HITOS.map((h, i) => {
        const x = 100 + i * 200;
        const tono: TonoSvg = h.estado === "ahora" ? "verde" : h.estado === "hecho" ? "azul" : "gris";
        return (
          <g key={h.t} {...an("aparece", 0.2 + i * 0.25)}>
            <circle cx={x} cy={70} r={15} fill="var(--dg-fondo)" />
            <circle cx={x} cy={70} r={11} fill={h.estado === "luego" ? "var(--dg-fondo)" : linea(tono)} stroke={h.estado === "luego" ? linea("gris") : "var(--dg-fondo)"} strokeWidth={3} />
            <text x={x} y={112} fontSize={18} fontWeight={800} fill={fuerte(tono)} textAnchor="middle">
              {h.t}
            </text>
            <text x={x} y={136} fontSize={16} fontWeight={500} fill={SUAVE} textAnchor="middle">
              {h.d}
            </text>
          </g>
        );
      })}
      <Halo x={685} y={55} w={30} h={30} tono="verde" an={1.6} rx={20} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Peso de cada criterio: lo que se juega la última semana             */
/* Filas cada 40 desde y = 40: rótulo a x = 16; barra desde x = 450,   */
/* 20 px por punto.                                                    */
/* ------------------------------------------------------------------ */

const ESTA_SEMANA = ["pruebas", "entrega"];

export function PesosRubrica() {
  const criterios = RUBRICA_CLI.criterios;
  return (
    <Figura
      uid="pesos4"
      ancho={1000}
      alto={40 + criterios.length * 40}
      animada
      etiqueta={`Peso de cada criterio de la rúbrica sobre 100: ${criterios.map((c) => `${c.nombre}, ${c.peso}`).join("; ")}. Esta semana se juegan enteros las pruebas y calidad, y la instalación, documentación y proceso.`}
      pie="En azul, los dos criterios que se juegan enteros esta semana: 25 de los 100 puntos. Los demás ya los tienes: ahora se demuestran."
    >
      {criterios.map((c, i) => {
        const y = 40 + i * 40;
        const ahora = ESTA_SEMANA.includes(c.id);
        return (
          <g key={c.id}>
            <text x={16} y={y + 6} fontSize={16} fontWeight={ahora ? 700 : 500} fill={ahora ? TINTA : SUAVE} {...an("funde", 0.1 + i * 0.12, 0.3)}>
              {`${c.nombre} · ${c.peso}`}
            </text>
            <Barra x={450} y={y - 10} w={c.peso * 20} tono={ahora ? "azul" : "gris"} hueca={!ahora} an={0.3 + i * 0.12} dur={0.6} />
          </g>
        );
      })}
    </Figura>
  );
}
