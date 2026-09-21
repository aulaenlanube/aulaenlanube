import type { ReactNode } from "react";

// Diagramas SVG de la Sesión 2 — «Git es un grafo de bolitas».
// Autocontenidos: sin dependencias externas, sin hooks, sin 'use client'.
// Servidor (App Router): componentes puros de JSX. Cada svg lleva viewBox
// responsive (width 100%), aria-label descriptivo y tipografía sans del navegador.
// Paleta coherente con la página: bolas azules #2563eb (main), moradas #7c3aed
// (ramas), flechas gris oscuro #3f3f46, texto casi negro #18181b, verde #059669,
// ámbar #b45309 (HEAD y avisos).
//
// REGLAS DE GEOMETRÍA (para que nada se solape al reeditar):
//  · Los seis diagramas usan viewBox de 720 de ancho → el mismo fontSize se ve
//    igual en todos (el contenedor los limita a 720 px).
//  · Radio de bola constante por fila: RADIO = 26 (miniatura: 18).
//  · Las flechas se calculan con <Flecha>: nunca se meten dentro de la bola ni
//    se quedan colgando. Ver PUNTA más abajo.
//  · Toda rama dibujada lleva su nombre en una <EtiquetaRama> del color de la
//    rama, pegada al inicio de su línea (o encima de ella).
//  · Márgenes: ningún texto a menos de 8 unidades del borde del viewBox.
//
// IDs de marcadores: este fichero es un Componente de Servidor, así que no puede
// usar React.useId() (los hooks son solo de Componentes de Cliente). Cada
// diagrama acepta `idPrefix` con un valor por defecto único; si algún día se
// pinta el mismo diagrama dos veces en la misma página, basta con pasar un
// prefijo distinto en la segunda instancia para no duplicar ids en el DOM.

const FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
const AZUL = "#2563eb";
const AZUL_OSCURO = "#1d4ed8";
const MORADO = "#7c3aed";
const MORADO_OSCURO = "#6d28d9";
const TINTA = "#18181b";
const GRAFITO = "#3f3f46";
const SUAVE = "#52525b";
const TENUE = "#71717a";
const APAGADO = "#e4e4e7";
const APAGADO_BORDE = "#a1a1aa";
const VERDE = "#059669";
const VERDE_OSCURO = "#047857";
const AMBAR = "#b45309";

const RADIO = 26; // radio de bola en los seis diagramas grandes
const HUECO = 9; // aire entre el borde de la bola y la flecha
const MARGEN = RADIO + HUECO; // 35: distancia del centro a donde arranca/acaba la flecha

// El marcador hereda markerUnits="strokeWidth": su escala es grosor·(6.5/10) y
// la punta (x=10 del viewBox 0..10) sobresale (10-refX)·0.65·grosor del final
// de la línea. Con refX=8 → 1.3·grosor. <Flecha> lo descuenta para que la punta
// caiga exactamente donde se pide y no pise la bola ni el texto de destino.
const PUNTA = 1.3;

function Marker({ id, color = GRAFITO }: { id: string; color?: string }) {
  return (
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="8"
      refY="5"
      markerWidth="6.5"
      markerHeight="6.5"
      orient="auto-start-reverse"
    >
      <path d="M0 0 L10 5 L0 10 z" fill={color} />
    </marker>
  );
}

// Flecha recta entre dos puntos con «margen» propio: [x, y, margen], donde
// margen = radio visible + aire. La punta aterriza a `margen` del centro dado.
function Flecha({
  desde,
  hasta,
  marcador,
  color = GRAFITO,
  grosor = 3,
}: {
  desde: [number, number, number];
  hasta: [number, number, number];
  marcador: string;
  color?: string;
  grosor?: number;
}) {
  const [x1, y1, m1] = desde;
  const [x2, y2, m2] = hasta;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const largo = Math.hypot(dx, dy) || 1;
  const ux = dx / largo;
  const uy = dy / largo;
  const retroceso = m2 + PUNTA * grosor;
  return (
    <line
      x1={x1 + ux * m1}
      y1={y1 + uy * m1}
      x2={x2 - ux * retroceso}
      y2={y2 - uy * retroceso}
      stroke={color}
      strokeWidth={grosor}
      strokeLinecap="round"
      markerEnd={`url(#${marcador})`}
    />
  );
}

// Línea de guía discontinua (HEAD → bola, etiqueta de rama → línea). Sin punta.
function Guia({
  x1,
  y1,
  x2,
  y2,
  color = AMBAR,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2} strokeDasharray="5 4" />;
}

function Bola({
  x,
  y,
  r = RADIO,
  color = AZUL,
  borde = TINTA,
  grosor = 2,
  letra,
  tam = 24,
  colorLetra = "#ffffff",
}: {
  x: number;
  y: number;
  r?: number;
  color?: string;
  borde?: string;
  grosor?: number;
  letra?: string;
  tam?: number;
  colorLetra?: string;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={color} stroke={borde} strokeWidth={grosor} />
      {letra ? (
        <text
          x={x}
          y={y + tam * 0.36}
          textAnchor="middle"
          fontSize={tam}
          fontWeight={800}
          fill={colorLetra}
        >
          {letra}
        </text>
      ) : null}
    </g>
  );
}

function BolaTachada({ x, y, r = RADIO, letra }: { x: number; y: number; r?: number; letra: string }) {
  const aspa = r * 0.65;
  return (
    <g opacity={0.85}>
      <circle cx={x} cy={y} r={r} fill={APAGADO} stroke={APAGADO_BORDE} strokeWidth={2} />
      <text x={x} y={y + 24 * 0.36} textAnchor="middle" fontSize={24} fontWeight={800} fill={TENUE}>
        {letra}
      </text>
      <line
        x1={x - aspa}
        y1={y - aspa}
        x2={x + aspa}
        y2={y + aspa}
        stroke={TENUE}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
    </g>
  );
}

function Pill({
  x,
  y,
  w,
  h = 32,
  texto,
  color = AMBAR,
  tam = 19,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  texto: string;
  color?: string;
  tam?: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill="#ffffff" stroke={color} strokeWidth={2} />
      <text x={x + w / 2} y={y + h / 2 + tam * 0.36} textAnchor="middle" fontSize={tam} fontWeight={800} fill={color}>
        {texto}
      </text>
    </g>
  );
}

// Nombre de rama: obligatorio en toda rama dibujada. Píldora del color de la
// rama + guía discontinua hasta su línea (`hasta` = x donde empieza la línea).
function EtiquetaRama({
  x,
  y,
  w,
  h = 32,
  nombre,
  color = AZUL_OSCURO,
  tam = 18,
  hasta,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  nombre: string;
  color?: string;
  tam?: number;
  hasta?: number;
}) {
  const cy = y + h / 2;
  return (
    <g>
      {hasta === undefined ? null : <Guia x1={x + w} y1={cy} x2={hasta} y2={cy} color={color} />}
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill="#ffffff" stroke={color} strokeWidth={2.5} />
      <text x={x + w / 2} y={cy + tam * 0.36} textAnchor="middle" fontSize={tam} fontWeight={800} fill={color}>
        {nombre}
      </text>
    </g>
  );
}

function Fig({
  viewBox,
  etiqueta,
  pie,
  children,
}: {
  viewBox: string;
  etiqueta: string;
  pie: string;
  children: ReactNode;
}) {
  return (
    <figure className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 px-3 pt-3 pb-1">
      <div className="overflow-x-auto">
        <svg
          viewBox={viewBox}
          role="img"
          aria-label={etiqueta}
          className="mx-auto block w-full min-w-[720px]"
          style={{ maxWidth: 720, fontFamily: FONT }}
        >
          {children}
        </svg>
      </div>
      <figcaption className="mt-1.5 text-center text-[13px] font-medium text-zinc-500">{pie}</figcaption>
    </figure>
  );
}

// ── 1 · Cadena de commits ─────────────────────────────────────────────────
// Rejilla: fila y=128, bolas en x=158/348/538 (paso 190 → los mensajes de
// commit, de 147-155 de ancho, se quedan a ~38 unos de otros).
export function CadenaCommits({ idPrefix = "d1" }: { idPrefix?: string }) {
  const flecha = `${idPrefix}-flecha`;
  const y = 128;
  const bolas = [
    { x: 158, letra: "A", msg: "«añadí el hero»" },
    { x: 348, letra: "B", msg: "«dos columnas»" },
    { x: 538, letra: "C", msg: "«parche menú»" },
  ];
  return (
    <Fig
      viewBox="0 0 720 216"
      etiqueta="Cadena de tres commits A, B y C enlazados con flechas sobre la rama main; la etiqueta HEAD apunta a C, el último."
      pie="Cada commit es una bola nueva enlazada a la anterior, y HEAD siempre apunta a la última. Misión 3."
    >
      <defs>
        <Marker id={flecha} />
      </defs>
      {/* Nombre de la rama, pegado al inicio de la línea */}
      <EtiquetaRama x={28} y={y - 16} w={76} nombre="main" hasta={126} />
      {/* HEAD sobre el último commit */}
      <Pill x={496} y={28} w={84} texto="HEAD" />
      <Guia x1={538} y1={60} x2={538} y2={96} />
      <text x={596} y={50} fontSize={19} fill={AMBAR}>
        estás aquí
      </text>
      <Flecha desde={[158, y, MARGEN]} hasta={[348, y, MARGEN]} marcador={flecha} />
      <Flecha desde={[348, y, MARGEN]} hasta={[538, y, MARGEN]} marcador={flecha} />
      {bolas.map((b) => (
        <Bola key={b.letra} x={b.x} y={y} letra={b.letra} />
      ))}
      {bolas.map((b) => (
        <text key={b.msg} x={b.x} y={192} textAnchor="middle" fontSize={19} fontWeight={600} fill={TINTA}>
          {b.msg}
        </text>
      ))}
    </Fig>
  );
}

// ── 2 · Dos ramas, dos diseños ────────────────────────────────────────────
// Dos carriles: main en y=236 (x=152/322/492, paso 170) y la rama morada en
// y=108 (x=452/592). La curva de bifurcación va de B a D por x=347..425, así
// que «nace de B» (x=236..332) queda a su izquierda sin tocarla.
export function RamasDosDisenos({ idPrefix = "d2" }: { idPrefix?: string }) {
  const flecha = `${idPrefix}-flecha`;
  const flechaMorada = `${idPrefix}-flecha-morado`;
  return (
    <Fig
      viewBox="0 0 720 320"
      etiqueta="Ramificación: la rama principal main avanza con commits azules A, B y C; la rama morada diseno-morado nace en B y crece en paralelo con dos commits D y E, uno por cada diseño."
      pie="main (azul) sigue tranquila; tu experimento (morado) nace en B y crece en paralelo. Misión 5."
    >
      <defs>
        <Marker id={flecha} />
        <Marker id={flechaMorada} color={MORADO_OSCURO} />
      </defs>
      <text x={24} y={32} fontSize={19} fontWeight={700} fill={MORADO_OSCURO}>
        rama de experimentos: nada toca main
      </text>
      {/* Rama morada: nombre encima de su propia línea */}
      <EtiquetaRama x={437} y={42} w={170} nombre="diseno-morado" color={MORADO_OSCURO} />
      <Guia x1={522} y1={74} x2={522} y2={100} color={MORADO_OSCURO} />
      {/* Bifurcación B → D */}
      <path
        d="M 346.9 211.5 C 388 204, 406 162, 424.5 135.5"
        fill="none"
        stroke={MORADO_OSCURO}
        strokeWidth={3}
        strokeDasharray="7 6"
        markerEnd={`url(#${flechaMorada})`}
      />
      <text x={332} y={180} textAnchor="end" fontSize={19} fill={MORADO_OSCURO}>
        nace de B
      </text>
      {/* Carril morado */}
      <Flecha desde={[452, 108, MARGEN]} hasta={[592, 108, MARGEN]} marcador={flechaMorada} color={MORADO_OSCURO} />
      <Bola x={452} y={108} color={MORADO} letra="D" />
      <Bola x={592} y={108} color={MORADO} letra="E" />
      <text x={592} y={156} textAnchor="middle" fontSize={19} fontWeight={700} fill={MORADO_OSCURO}>
        morado
      </text>
      {/* Carril main */}
      <EtiquetaRama x={24} y={220} w={76} nombre="main" hasta={120} />
      <Flecha desde={[152, 236, MARGEN]} hasta={[322, 236, MARGEN]} marcador={flecha} />
      <Flecha desde={[322, 236, MARGEN]} hasta={[492, 236, MARGEN]} marcador={flecha} />
      <Bola x={152} y={236} letra="A" />
      <Bola x={322} y={236} letra="B" />
      <Bola x={492} y={236} letra="C" />
      <text x={540} y={243} fontSize={19} fontWeight={700} fill={AZUL_OSCURO}>
        azul
      </text>
      <text x={360} y={302} textAnchor="middle" fontSize={19} fill={SUAVE}>
        la misma carpeta: dos historias en paralelo, dos webs distintas
      </text>
    </Fig>
  );
}

// ── 3 · Merge ─────────────────────────────────────────────────────────────
// main en y=236 (A=152, B=322), rama morada en D=(400,104) y bola de fusión
// r=40 en (560,166). El pie «los dos diseños…» va a 18 px y centrado en 552
// para no salirse por la derecha (mide 287 y el viewBox son 720).
export function MergeDiagrama({ idPrefix = "d3" }: { idPrefix?: string }) {
  const flecha = `${idPrefix}-flecha`;
  const flechaMorada = `${idPrefix}-flecha-morado`;
  return (
    <Fig
      viewBox="0 0 720 320"
      etiqueta="Fusión: la línea azul de main y la línea morada de la rama diseno-morado convergen con dos flechas en un commit de fusión más grande, donde HEAD pasa a main."
      pie="Dos líneas de historia, dos flechas, una bola-mayor de fusión: así entra tu diseño ganador. Misión 6."
    >
      <defs>
        <Marker id={flecha} />
        <Marker id={flechaMorada} color={MORADO_OSCURO} />
      </defs>
      {/* Rama morada: nombre sobre su commit */}
      <EtiquetaRama x={315} y={36} w={170} nombre="diseno-morado" color={MORADO_OSCURO} />
      {/* HEAD sobre la fusión */}
      <Pill x={518} y={36} w={84} texto="HEAD" />
      <Guia x1={560} y1={68} x2={560} y2={117} />
      {/* Bifurcación B → D */}
      <path
        d="M 339.8 205.9 C 356 180, 360 150, 380.2 137.5"
        fill="none"
        stroke={MORADO_OSCURO}
        strokeWidth={3}
        strokeDasharray="7 6"
        markerEnd={`url(#${flechaMorada})`}
      />
      {/* Las dos flechas que entran en la fusión (43 = radio 40 + medio borde) */}
      <Flecha desde={[322, 236, MARGEN]} hasta={[560, 166, 43 + HUECO]} marcador={flecha} />
      <Flecha
        desde={[400, 104, MARGEN]}
        hasta={[560, 166, 43 + HUECO]}
        marcador={flechaMorada}
        color={MORADO_OSCURO}
      />
      {/* Carril main */}
      <EtiquetaRama x={24} y={220} w={76} nombre="main" hasta={120} />
      <Flecha desde={[152, 236, MARGEN]} hasta={[322, 236, MARGEN]} marcador={flecha} />
      <Bola x={152} y={236} letra="A" />
      <Bola x={322} y={236} letra="B" />
      <Bola x={400} y={104} color={MORADO} letra="D" />
      <Bola x={560} y={166} r={40} borde={MORADO} grosor={6} letra="merge" tam={19} />
      <text x={552} y={246} textAnchor="middle" fontSize={18} fontWeight={700} fill={TINTA}>
        los dos diseños, una decisión
      </text>
      <text x={360} y={302} textAnchor="middle" fontSize={19} fill={SUAVE}>
        tras el merge, la rama experimento se borra sin miedo
      </text>
    </Fig>
  );
}

// ── 4 · Git ≠ GitHub ──────────────────────────────────────────────────────
// Portátil a la izquierda (pantalla 18..218), nube a la derecha (446..705) y un
// pasillo libre de 226..446 donde caben las tres etiquetas (máx. 204 a 17 px).
// Las tres flechas son horizontales, a y=130/172/214, y cada rótulo vive en la
// banda de aire que queda encima de su flecha.
export function GitVsGithub({ idPrefix = "d4" }: { idPrefix?: string }) {
  const flecha = `${idPrefix}-flecha`;
  return (
    <Fig
      viewBox="0 0 720 360"
      etiqueta="Git y GitHub: un portátil con su carpeta .git donde ocurren los commits en local, y una nube de GitHub conectada por flechas: clone baja una vez, push sube, pull baja."
      pie="Git vive dentro de tu portátil (.git); GitHub es la copia que compartes. clone baja una vez; luego push sube y pull baja. Misión 2."
    >
      <defs>
        <Marker id={flecha} />
      </defs>
      {/* Portátil */}
      <rect x={18} y={124} width={200} height={120} rx={14} fill="#ffffff" stroke={GRAFITO} strokeWidth={3} />
      <rect x={6} y={244} width={224} height={12} rx={6} fill={GRAFITO} />
      <path d="M 40 156 h 22 l 6 -10 h -28 z" fill="#fef9c3" stroke="#a16207" strokeWidth={2} />
      <rect x={40} y={154} width={70} height={42} rx={5} fill="#fef9c3" stroke="#a16207" strokeWidth={2} />
      <text x={75} y={182} textAnchor="middle" fontSize={20} fontWeight={800} fill="#854d0e">
        .git
      </text>
      <circle cx={52} cy={224} r={7} fill={AZUL} />
      <circle cx={74} cy={224} r={7} fill={AZUL} />
      <circle cx={96} cy={224} r={7} fill={AZUL} />
      {/* Bucle local de commit: arco de 270° centrado en (166,176), r=24 */}
      <path
        d="M 166 152 A 24 24 0 1 1 142 176"
        fill="none"
        stroke={GRAFITO}
        strokeWidth={3}
        markerEnd={`url(#${flecha})`}
      />
      <text x={166} y={224} textAnchor="middle" fontSize={19} fontWeight={800} fill={TINTA}>
        commit
      </text>
      <text x={126} y={284} textAnchor="middle" fontSize={18} fontWeight={800} fill={TINTA}>
        tu portátil · Git vive aquí
      </text>
      {/* Nube GitHub: el grupo escala 1.5 → ocupa x 446..705, y 92..218 */}
      <g transform="translate(-220,-37) scale(1.5)">
        <path
          d="M 480 170 q -36 0 -36 -26 q 0 -22 24 -26 q 3 -32 38 -32 q 28 0 39 21 q 9 -7 20 -7 q 26 0 28 24 q 24 6 24 22 q 0 24 -32 24 z"
          fill="#ffffff"
          stroke={GRAFITO}
          strokeWidth={2}
        />
      </g>
      <text x={576} y={168} textAnchor="middle" fontSize={24} fontWeight={800} fill={TINTA}>
        GitHub
      </text>
      <text x={576} y={196} textAnchor="middle" fontSize={18} fill={SUAVE}>
        copia compartida
      </text>
      {/* Sincronización: rótulo en el aire de encima, flecha justo debajo */}
      <text x={334} y={112} textAnchor="middle" fontSize={17} fontWeight={700} fill={AZUL_OSCURO}>
        clone ↓ (una vez)
      </text>
      <Flecha desde={[484, 130, 0]} hasta={[218, 130, 8]} marcador={flecha} />
      <text x={334} y={154} textAnchor="middle" fontSize={17} fontWeight={700} fill={MORADO_OSCURO}>
        push ↑ sube lo tuyo
      </text>
      <Flecha desde={[218, 172, 8]} hasta={[446, 172, 0]} marcador={flecha} />
      <text x={334} y={196} textAnchor="middle" fontSize={17} fontWeight={700} fill={AZUL_OSCURO}>
        pull ↓ baja lo que falta
      </text>
      <Flecha desde={[471, 214, 0]} hasta={[218, 214, 8]} marcador={flecha} />
      <text x={360} y={336} textAnchor="middle" fontSize={19} fill={SUAVE}>
        Git funciona sin internet; el commit solo toca tu portátil
      </text>
    </Fig>
  );
}

// ── 5 · Pull Request ──────────────────────────────────────────────────────
// Todo el diagrama comparte el eje y=168: rama morada (96,168)-(208,168),
// burbuja de PR (276..518, 112..224, centro 168) y bola M de main (640,168).
// Los textos de dentro de la burbuja van a 17-21 px para dejar 15+ de margen
// contra el borde derecho de la caja.
export function PullRequestDiagrama({ idPrefix = "d5" }: { idPrefix?: string }) {
  const flechaVerde = `${idPrefix}-flecha-verde`;
  const flechaMorada = `${idPrefix}-flecha-morado`;
  return (
    <Fig
      viewBox="0 0 720 320"
      etiqueta="Pull request: la rama morada mejora-texto de la Persona A propone sus commits mediante una burbuja de revisión con un check verde y un comentario, y una flecha verde la fusiona en main."
      pie="Así trabajan los equipos: nadie entra en main sin que otra persona revise la PR. Misión 7 (bonus)."
    >
      <defs>
        <Marker id={flechaVerde} color={VERDE} />
        <Marker id={flechaMorada} color={MORADO_OSCURO} />
      </defs>
      <text x={152} y={76} textAnchor="middle" fontSize={18} fontWeight={700} fill={MORADO_OSCURO}>
        rama de la Persona A
      </text>
      <EtiquetaRama x={79.5} y={96} w={145} nombre="mejora-texto" color={MORADO_OSCURO} />
      <Guia x1={152} y1={128} x2={152} y2={158} color={MORADO_OSCURO} />
      <Flecha
        desde={[96, 168, MARGEN]}
        hasta={[208, 168, MARGEN]}
        marcador={flechaMorada}
        color={MORADO_OSCURO}
      />
      <Bola x={96} y={168} color={MORADO} letra="A" />
      <Bola x={208} y={168} color={MORADO} letra="B" />
      {/* Burbuja de PR: el pico apunta a B a 16 de su borde */}
      <path d="M 276 148 L 250 168 L 276 188 Z" fill="#ffffff" stroke={GRAFITO} strokeWidth={2.5} />
      <rect x={276} y={112} width={242} height={112} rx={16} fill="#ffffff" stroke={GRAFITO} strokeWidth={2.5} />
      <text x={397} y={150} textAnchor="middle" fontSize={21} fontWeight={800} fill={TINTA}>
        PR: ¿revisamos?
      </text>
      <circle cx={308} cy={186} r={13} fill={VERDE} />
      <text x={308} y={192} textAnchor="middle" fontSize={16} fontWeight={800} fill="#ffffff">
        ✓
      </text>
      <text x={328} y={192} fontSize={17} fill={SUAVE}>
        «todo ok, aprobada»
      </text>
      <Flecha desde={[518, 168, 8]} hasta={[640, 168, MARGEN]} marcador={flechaVerde} color={VERDE} grosor={3.5} />
      <Bola x={640} y={168} letra="M" />
      <Guia x1={640} y1={196} x2={640} y2={212} color={AZUL_OSCURO} />
      <EtiquetaRama x={602} y={212} w={76} nombre="main" />
      <text x={640} y={268} textAnchor="middle" fontSize={17} fill={SUAVE}>
        entra fusionada
      </text>
      <text x={360} y={300} textAnchor="middle" fontSize={19} fill={SUAVE}>
        la PR es una rama que pide permiso para entrar en main
      </text>
    </Fig>
  );
}

// ── 6 · Máquina del tiempo ────────────────────────────────────────────────
// Dos filas idénticas en rejilla: bolas en x=150/274/398/522(/646), paso 124.
// Fila 1 (reset) en y=140 con el arco de vuelta POR DEBAJO (baja hasta y≈203),
// para no cruzar el titular; fila 2 (revert) en y=332.
export function MaquinaDelTiempo({ idPrefix = "d6" }: { idPrefix?: string }) {
  const flecha = `${idPrefix}-flecha`;
  const flechaVerde = `${idPrefix}-flecha-verde`;
  const flechaApagada = `${idPrefix}-flecha-apagada`;
  const xs = [150, 274, 398, 522];
  return (
    <Fig
      viewBox="0 0 720 396"
      etiqueta="Comparación entre reset y revert sobre la rama main: con reset, HEAD retrocede a B y los commits posteriores aparecen atenuados y tachados; con revert, la historia avanza con una bola nueva con signo menos que anula la anterior."
      pie="reset borra el futuro; revert lo conserva y añade una bola que anula. Si ya hiciste push, usa revert. Misión 4."
    >
      <defs>
        <Marker id={flecha} />
        <Marker id={flechaVerde} color={VERDE} />
        <Marker id={flechaApagada} color={APAGADO_BORDE} />
      </defs>
      {/* Fila 1: reset */}
      <text x={24} y={30} fontSize={19} fontWeight={800} fill={TINTA}>
        git reset: HEAD retrocede, el futuro desaparece
      </text>
      <Pill x={232} y={64} w={84} texto="HEAD" />
      <Guia x1={274} y1={96} x2={274} y2={108} />
      <EtiquetaRama x={16} y={124} w={76} nombre="main" hasta={118} />
      <Flecha desde={[150, 140, MARGEN]} hasta={[274, 140, MARGEN]} marcador={flecha} />
      <Flecha
        desde={[274, 140, MARGEN]}
        hasta={[398, 140, MARGEN]}
        marcador={flechaApagada}
        color={APAGADO_BORDE}
      />
      <Flecha
        desde={[398, 140, MARGEN]}
        hasta={[522, 140, MARGEN]}
        marcador={flechaApagada}
        color={APAGADO_BORDE}
      />
      <Bola x={150} y={140} letra="A" />
      <Bola x={274} y={140} letra="B" />
      <BolaTachada x={398} y={140} letra="C" />
      <BolaTachada x={522} y={140} letra="D" />
      {/* Vuelta atrás: por debajo de la fila, lejos del titular */}
      <path
        d="M 504.5 170.3 C 460 214, 340 214, 293.5 173.7"
        fill="none"
        stroke={GRAFITO}
        strokeWidth={3}
        strokeDasharray="7 6"
        markerEnd={`url(#${flecha})`}
      />
      <text x={360} y={232} textAnchor="middle" fontSize={19} fontWeight={700} fill={AMBAR}>
        ¡ojo! si ya hiciste push, reescribes la historia
      </text>
      {/* Fila 2: revert */}
      <text x={24} y={274} fontSize={19} fontWeight={800} fill={TINTA}>
        git revert: avanzas con un commit que anula el anterior
      </text>
      <EtiquetaRama x={16} y={316} w={76} nombre="main" hasta={118} />
      {xs.slice(0, 3).map((x, i) => (
        <Flecha key={x} desde={[x, 332, MARGEN]} hasta={[xs[i + 1], 332, MARGEN]} marcador={flecha} />
      ))}
      <Flecha desde={[522, 332, MARGEN]} hasta={[646, 332, MARGEN]} marcador={flechaVerde} color={VERDE} grosor={3.5} />
      {xs.map((x, i) => (
        <Bola key={x} x={x} y={332} letra={"ABCD"[i]} />
      ))}
      <Bola x={646} y={332} color="#ffffff" borde={VERDE} grosor={4} letra="−" tam={34} colorLetra={VERDE_OSCURO} />
      <text x={646} y={384} textAnchor="middle" fontSize={19} fontWeight={700} fill={VERDE_OSCURO}>
        revierte D
      </text>
      <text x={330} y={384} textAnchor="middle" fontSize={19} fill={SUAVE}>
        la historia nunca miente: revert suma, reset borra
      </text>
    </Fig>
  );
}

// ── Intro: miniatura del grafo ────────────────────────────────────────────
// Escala pequeña: radio 18, grosor 2.5. Mismas reglas: cada rama con su nombre.
export function IntroGrafoBolitas({ idPrefix = "d0" }: { idPrefix?: string }) {
  const flecha = `${idPrefix}-flecha`;
  const flechaMorada = `${idPrefix}-flecha-morado`;
  const r = 18;
  const m = r + 7;
  return (
    <svg
      viewBox="0 0 400 148"
      role="img"
      aria-label="Miniatura: un grafo de bolitas azules en la línea main con una rama morada, diseno-morado, que se fusiona en una bola mayor."
      className="mx-auto block w-full"
      style={{ maxWidth: 400, fontFamily: FONT }}
    >
      <defs>
        <Marker id={flecha} />
        <Marker id={flechaMorada} color={MORADO_OSCURO} />
      </defs>
      <EtiquetaRama x={8} y={105} w={55} h={26} nombre="main" tam={14} hasta={74} />
      <EtiquetaRama x={194.5} y={3} w={123} h={26} nombre="diseno-morado" color={MORADO_OSCURO} tam={13} />
      <Flecha desde={[96, 118, m]} hasta={[192, 118, m]} marcador={flecha} grosor={2.5} />
      <Flecha desde={[192, 118, m]} hasta={[346, 86, 37]} marcador={flecha} grosor={2.5} />
      <path
        d="M 210 100.6 C 222 94, 226 82, 235.7 75.7"
        fill="none"
        stroke={MORADO_OSCURO}
        strokeWidth={2.5}
        strokeDasharray="6 5"
        markerEnd={`url(#${flechaMorada})`}
      />
      <Flecha
        desde={[256, 56, m]}
        hasta={[346, 86, 37]}
        marcador={flechaMorada}
        color={MORADO_OSCURO}
        grosor={2.5}
      />
      <Bola x={96} y={118} r={r} letra="A" tam={18} />
      <Bola x={192} y={118} r={r} letra="B" tam={18} />
      <Bola x={256} y={56} r={r} color={MORADO} letra="D" tam={18} />
      <Bola x={346} y={86} r={28} borde={MORADO} grosor={4.5} letra="merge" tam={14} />
    </svg>
  );
}
