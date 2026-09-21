"use client";

import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

/* ───────────────────────────────────────────────────────────────────────────
   LABORATORIO DE LÓGICA DIGITAL — 4.º ESO · Tecnología (electrónica digital)

   App de una sola pantalla con tres modos (Explorar / Montar / Retos).
   Autocontenida: solo React. Todo el grafismo es SVG en línea.

   ── REGLAS DE GEOMETRÍA SVG (para que nada se solape al reeditar) ──────────
   · Todas las medidas son CONSTANTES con nombre; nada se adivina.
   · El símbolo de puerta ocupa GW × GH. Si la puerta es negada, el CUERPO
     mide GW − 2·BR y la burbuja (radio BR) ocupa el resto, de modo que la
     salida cae SIEMPRE en x + GW, sea la puerta que sea.
   · Los cables entran por xEntrada() y salen por xSalida(). En las puertas de
     escudo (OR/NOR/XOR) el cable penetra 0,22·ancho porque la trasera es
     cóncava: a un cuarto de altura la curva está en 0,173·ancho, así que el
     cable la cruza con ~5 unidades de solape y nunca queda al aire.
   · Los codos de cable se trazan con codo(), que redondea la esquina con un
     radio que jamás supera la mitad del desnivel: no hay esquinas rotas.
   · Ningún texto baja de 17 unidades. Los lienzos se muestran con un ancho
     mínimo (640 y 700 px) dentro de un contenedor con desplazamiento propio,
     así que 17 unidades nunca se ven por debajo de ~14 px reales y la PÁGINA
     no llega a tener desplazamiento horizontal.
   · Los ids de <defs> van prefijados con useId() saneado: dos instancias del
     componente en la misma página no comparten degradados ni tramas.
   ─────────────────────────────────────────────────────────────────────────── */

/* ── Paleta del banco de trabajo ─────────────────────────────────────────── */
const CABLE_0 = "#64748b"; // cable que lleva un 0
const CABLE_1 = "#34d399"; // cable que lleva un 1
const LED_ON = "#34d399";
const LED_OFF = "#334155";
const PANEL = "#0f172a"; // = bg-slate-900, fondo del banco
const TRAZO = "#cbd5e1"; // contorno de los símbolos de puerta
const TINTA = "#e2e8f0"; // texto claro sobre el banco
const METAL = "#94a3b8"; // bornes y palanca de los interruptores

const tono = (v: number) => (v ? CABLE_1 : CABLE_0);

/* ── Clases reutilizadas del sistema de diseño del sitio ─────────────────── */
const TARJETA = "rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm";
const TITULO = "font-extrabold tracking-tight";
const CUERPO = "text-[15px] text-zinc-700";
const SECUNDARIO = "text-sm text-zinc-500";
const ANILLO =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2";
const ANILLO_OSCURO =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";
const BOTON_1 = `rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 ${ANILLO}`;
const BOTON_2 = `rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-zinc-50 ${ANILLO}`;

/* ── Las seis puertas ────────────────────────────────────────────────────── */
const ORDEN = ["NOT", "AND", "OR", "NAND", "NOR", "XOR"] as const;
type Puerta = (typeof ORDEN)[number];

/** Las de dos entradas: las únicas que caben en los huecos del modo Montar. */
const ORDEN_2: readonly Puerta[] = ["AND", "OR", "NAND", "NOR", "XOR"];

type FichaPuerta = {
  alias: string;
  entradas: 1 | 2;
  expresion: string;
  frase: string;
  analogia: string;
  fn: (a: number, b: number) => 0 | 1;
};

const PUERTAS: Record<Puerta, FichaPuerta> = {
  NOT: {
    alias: "NO · inversor",
    entradas: 1,
    expresion: "S = ¬A",
    frase: "La NOT le da la vuelta a lo que entra: si entra un 0 sale un 1, y si entra un 1 sale un 0.",
    analogia: "Como la bombilla de la nevera: con la puerta cerrada (1) la luz está apagada (0).",
    fn: (a) => (a ? 0 : 1),
  },
  AND: {
    alias: "Y",
    entradas: 2,
    expresion: "S = A · B",
    frase: "La AND solo da 1 cuando las DOS entradas valen 1.",
    analogia: "Como la caja fuerte de dos llaves: no se abre hasta que giran las dos a la vez.",
    fn: (a, b) => (a && b ? 1 : 0),
  },
  OR: {
    alias: "O",
    entradas: 2,
    expresion: "S = A + B",
    frase: "La OR da 1 cuando al menos una entrada vale 1; solo da 0 si las dos están a 0.",
    analogia: "Como el timbre de una casa con dos pulsadores: con que llames por uno, suena.",
    fn: (a, b) => (a || b ? 1 : 0),
  },
  NAND: {
    alias: "NO-Y",
    entradas: 2,
    expresion: "S = ¬(A · B)",
    frase: "La NAND es una AND con la salida del revés: da 0 únicamente cuando las dos entradas valen 1.",
    analogia: "Como el piloto de «te falta algo» del lavavajillas: se apaga justo cuando ya está todo listo.",
    fn: (a, b) => (a && b ? 0 : 1),
  },
  NOR: {
    alias: "NO-O",
    entradas: 2,
    expresion: "S = ¬(A + B)",
    frase: "La NOR es una OR con la salida del revés: da 1 únicamente cuando las dos entradas valen 0.",
    analogia: "Como el piloto verde de «sala libre»: se enciende solo si no hay nadie en ninguno de los dos puestos.",
    fn: (a, b) => (a || b ? 0 : 1),
  },
  XOR: {
    alias: "O exclusiva",
    entradas: 2,
    expresion: "S = A ⊕ B",
    frase: "La XOR da 1 cuando las dos entradas son DISTINTAS, y 0 cuando son iguales.",
    analogia: "Como la luz de la escalera con dos conmutadores: muevas el que muevas, la luz cambia.",
    fn: (a, b) => (a !== b ? 1 : 0),
  },
};

/** Todas las combinaciones de n bits, en el orden canónico 00, 01, 10, 11… */
const combinaciones = (n: number): number[][] =>
  Array.from({ length: 1 << n }, (_, i) =>
    Array.from({ length: n }, (_, k) => (i >> (n - 1 - k)) & 1),
  );

const COMB_2 = combinaciones(2);
const COMB_3 = combinaciones(3);

/* ═══════════════════════════════════════════════════════════════════════════
   GEOMETRÍA DEL SÍMBOLO DE PUERTA (ANSI / IEEE, forma distintiva)
   ═══════════════════════════════════════════════════════════════════════ */

const GW = 112; // ancho TOTAL del símbolo, burbuja de negación incluida
const GH = 96; // alto del cuerpo
const BR = 9; // radio de la burbuja de negación
const XOR_SEP = 12; // separación de la doble curva de la XOR

const esNegada = (t: Puerta) => t === "NOT" || t === "NAND" || t === "NOR";
const esEscudo = (t: Puerta) => t === "OR" || t === "NOR" || t === "XOR";
/** Ancho del cuerpo: la burbuja se come 2·BR para que la salida caiga en x+GW. */
const anchoCuerpo = (t: Puerta) => (esNegada(t) ? GW - 2 * BR : GW);
/** x donde acaban los cables de entrada (penetran en el escudo cóncavo). */
const xEntrada = (t: Puerta, x: number) =>
  esEscudo(t) ? x + 0.22 * anchoCuerpo(t) : x;
/** x donde nace el cable de salida: siempre la misma, haya burbuja o no. */
const xSalida = (x: number) => x + GW;
/** Alturas de los bornes de entrada. */
const yEntradas = (t: Puerta, cy: number): number[] =>
  t === "NOT" ? [cy] : [cy - GH / 4, cy + GH / 4];

/** Cuerpo de la AND: medio rectángulo + semicírculo exacto de radio h/2. */
const cuerpoAnd = (x: number, y: number, w: number, h: number) => {
  const r = h / 2;
  return `M ${x} ${y} L ${x + w - r} ${y} A ${r} ${r} 0 0 1 ${x + w - r} ${y + h} L ${x} ${y + h} Z`;
};

/** Trasera cóncava del escudo de la OR/NOR/XOR (también se usa suelta en la XOR). */
const traseraEscudo = (x: number, y: number, w: number, h: number) => {
  const bx = x + 0.3 * w;
  return `M ${x} ${y} C ${bx} ${y + 0.3 * h} ${bx} ${y + 0.7 * h} ${x} ${y + h}`;
};

/** Cuerpo de la OR: trasera cóncava + dos curvas que se juntan en la punta. */
const cuerpoOr = (x: number, y: number, w: number, h: number) =>
  [
    traseraEscudo(x, y, w, h),
    `C ${x + 0.52 * w} ${y + h} ${x + 0.8 * w} ${y + 0.8 * h} ${x + w} ${y + h / 2}`,
    `C ${x + 0.8 * w} ${y + 0.2 * h} ${x + 0.52 * w} ${y} ${x} ${y}`,
    "Z",
  ].join(" ");

/** Cuerpo del inversor: triángulo isósceles apuntando a la derecha. */
const cuerpoNot = (x: number, y: number, w: number, h: number) =>
  `M ${x} ${y} L ${x + w} ${y + h / 2} L ${x} ${y + h} Z`;

/**
 * Dibuja el símbolo de una puerta. Se usa a tamaño grande en el banco de
 * trabajo y en miniatura dentro de los botones (con `trazo="currentColor"`).
 */
function CuerpoPuerta({
  tipo,
  x,
  y,
  w,
  h,
  br,
  grosor,
  trazo,
  relleno,
  fondoBurbuja,
}: {
  tipo: Puerta;
  x: number;
  y: number;
  w: number; // ancho TOTAL (burbuja incluida)
  h: number;
  br: number;
  grosor: number;
  trazo: string;
  relleno: string;
  fondoBurbuja: string;
}) {
  const negada = esNegada(tipo);
  const wc = negada ? w - 2 * br : w; // ancho del cuerpo
  const d =
    tipo === "NOT"
      ? cuerpoNot(x, y, wc, h)
      : tipo === "AND" || tipo === "NAND"
        ? cuerpoAnd(x, y, wc, h)
        : cuerpoOr(x, y, wc, h);
  const sep = (XOR_SEP * w) / GW; // la doble curva escala con el símbolo

  return (
    <>
      {tipo === "XOR" && (
        <path
          d={traseraEscudo(x - sep, y, wc, h)}
          fill="none"
          stroke={trazo}
          strokeWidth={grosor}
          strokeLinecap="round"
        />
      )}
      <path
        d={d}
        fill={relleno}
        stroke={trazo}
        strokeWidth={grosor}
        strokeLinejoin="round"
      />
      {negada && (
        <circle
          cx={x + w - br}
          cy={y + h / 2}
          r={br}
          fill={fondoBurbuja}
          stroke={trazo}
          strokeWidth={grosor}
        />
      )}
    </>
  );
}

/** Miniatura decorativa del símbolo, para los botones del selector. */
function MiniSimbolo({ tipo }: { tipo: Puerta }) {
  const w = 34;
  const h = 22;
  const br = 3.4;
  const x = 8;
  const y = 4;
  const xe = esEscudo(tipo) ? x + 0.22 * (esNegada(tipo) ? w - 2 * br : w) : x;
  const ys =
    tipo === "NOT" ? [y + h / 2] : [y + h / 4, y + (3 * h) / 4];

  return (
    <svg viewBox="0 0 52 30" className="h-[22px] w-[38px] shrink-0" aria-hidden="true">
      <g stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
        {ys.map((yy) => (
          <line key={yy} x1={0} y1={yy} x2={xe} y2={yy} />
        ))}
        <line x1={x + w} y1={y + h / 2} x2={52} y2={y + h / 2} />
      </g>
      <CuerpoPuerta
        tipo={tipo}
        x={x}
        y={y}
        w={w}
        h={h}
        br={br}
        grosor={1.6}
        trazo="currentColor"
        relleno="none"
        fondoBurbuja="none"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PIEZAS DEL BANCO DE TRABAJO
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * Codo de cable con la esquina redondeada. El radio nunca supera la mitad del
 * desnivel, así que la curva siempre cabe y el trazo no se dobla sobre sí mismo.
 */
function codo(x0: number, y0: number, xq: number, y1: number, x1: number, r = 14) {
  if (y0 === y1) return `M ${x0} ${y0} L ${x1} ${y1}`;
  const dir = y1 > y0 ? 1 : -1;
  const rr = Math.min(r, Math.abs(y1 - y0) / 2);
  return [
    `M ${x0} ${y0}`,
    `L ${xq - rr} ${y0}`,
    `Q ${xq} ${y0} ${xq} ${y0 + dir * rr}`,
    `L ${xq} ${y1 - dir * rr}`,
    `Q ${xq} ${y1} ${xq + rr} ${y1}`,
    `L ${x1} ${y1}`,
  ].join(" ");
}

/** Cable: trazo oscuro de fondo (aísla los cruces) + alma de color según el bit. */
function Cable({ d, v }: { d: string; v: number }) {
  return (
    <g aria-hidden="true">
      <path
        d={d}
        fill="none"
        stroke={PANEL}
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        fill="none"
        stroke={tono(v)}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** Rótulo del valor que circula por un tramo de cable. */
function Rotulo({ x, y, v }: { x: number; y: number; v: number }) {
  const col = tono(v);
  return (
    <g aria-hidden="true">
      <rect
        x={x - 18}
        y={y - 15}
        width={36}
        height={30}
        rx={9}
        fill={PANEL}
        stroke={col}
        strokeWidth={2.5}
      />
      <text
        x={x}
        y={y + 7}
        textAnchor="middle"
        fontSize={19}
        fontWeight={800}
        fill={col}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        {v}
      </text>
    </g>
  );
}

const SW_X0 = 52; // borne izquierdo del interruptor
const SW_X1 = 112; // borne derecho
const SW_ALZA = 24; // cuánto se levanta la palanca al abrirse

/** Interruptor de palanca: cerrado = 1, abierto = 0. Decorativo (manda el botón). */
function Llave({ letra, y, v }: { letra: string; y: number; v: number }) {
  const col = v ? CABLE_1 : METAL;
  return (
    <g aria-hidden="true">
      <text
        x={26}
        y={y + 8}
        textAnchor="middle"
        fontSize={22}
        fontWeight={800}
        fill={TINTA}
      >
        {letra}
      </text>
      <line
        x1={SW_X0}
        y1={y}
        x2={v ? SW_X1 : SW_X1 - 6}
        y2={v ? y : y - SW_ALZA}
        stroke={col}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <circle cx={SW_X0} cy={y} r={6} fill={METAL} />
      <circle cx={SW_X1} cy={y} r={6} fill={METAL} />
    </g>
  );
}

/** LED de salida, con halo cuando está encendido y el bit escrito dentro. */
function Led({
  cx,
  cy,
  r,
  v,
  halo,
}: {
  cx: number;
  cy: number;
  r: number;
  v: number;
  halo: string;
}) {
  const on = v === 1;
  return (
    <g aria-hidden="true">
      {on && <circle cx={cx} cy={cy} r={r * 1.75} fill={`url(#${halo})`} />}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={on ? LED_ON : LED_OFF}
        stroke={on ? "#a7f3d0" : "#475569"}
        strokeWidth={3}
      />
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        fontSize={34}
        fontWeight={800}
        fill={on ? "#064e3b" : "#94a3b8"}
      >
        {v}
      </text>
    </g>
  );
}

/** Trama de puntos del banco + degradado del cuerpo de las puertas + halo. */
function DefsBanco({ uid }: { uid: string }) {
  return (
    <defs>
      <pattern
        id={`${uid}-trama`}
        width={22}
        height={22}
        patternUnits="userSpaceOnUse"
      >
        <circle cx={1.5} cy={1.5} r={1.5} fill="#1e293b" />
      </pattern>
      <linearGradient id={`${uid}-cuerpo`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#334155" />
        <stop offset="1" stopColor="#1e293b" />
      </linearGradient>
      <radialGradient id={`${uid}-halo`}>
        <stop offset="0.4" stopColor={LED_ON} stopOpacity="0.45" />
        <stop offset="1" stopColor={LED_ON} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

/** Leyenda de colores del banco (los mismos que usan los cables del lienzo). */
function LeyendaCables() {
  return (
    <ul className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-slate-400">
      <li className="flex items-center gap-2">
        <span
          className="inline-block h-1.5 w-7 rounded-full"
          style={{ backgroundColor: CABLE_0 }}
          aria-hidden="true"
        />
        cable a 0 (sin tensión)
      </li>
      <li className="flex items-center gap-2">
        <span
          className="inline-block h-1.5 w-7 rounded-full"
          style={{ backgroundColor: CABLE_1 }}
          aria-hidden="true"
        />
        cable a 1 (con tensión)
      </li>
      <li className="flex items-center gap-2">
        <span
          className="inline-block h-3 w-3 rounded-full"
          style={{ backgroundColor: LED_ON }}
          aria-hidden="true"
        />
        LED encendido = la salida vale 1
      </li>
    </ul>
  );
}

/** Contenedor con desplazamiento propio: en móvil el circuito se desliza. */
function Lienzo({ minWidth, children }: { minWidth: number; children: ReactNode }) {
  return (
    <>
      <div className="-mx-1 overflow-x-auto px-1">
        <div style={{ minWidth }}>{children}</div>
      </div>
      <p className="mt-2 text-[13px] text-slate-500 sm:hidden">
        Desliza el circuito con el dedo para verlo entero.
      </p>
    </>
  );
}

/* ── Conmutador: botón real con aria-pressed ─────────────────────────────── */
function Conmutador({
  letra,
  descripcion,
  v,
  onToggle,
}: {
  letra: string;
  descripcion: string;
  v: number;
  onToggle: () => void;
}) {
  const on = v === 1;
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={`${descripcion}. Ahora vale ${v}.`}
      onClick={onToggle}
      className={`inline-flex items-center gap-2.5 rounded-xl border px-3 py-2 font-bold transition-colors ${ANILLO_OSCURO} ${
        on
          ? "border-emerald-400/70 bg-emerald-500/15 text-emerald-300"
          : "border-slate-600 bg-slate-800 text-slate-300 hover:bg-slate-700"
      }`}
    >
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-700 text-[14px] font-extrabold text-white">
        {letra}
      </span>
      <span
        className={`relative inline-block h-6 w-11 rounded-full transition-colors ${
          on ? "bg-emerald-500" : "bg-slate-600"
        }`}
        aria-hidden="true"
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-[left] ${
            on ? "left-[22px]" : "left-0.5"
          }`}
        />
      </span>
      <span className="font-mono text-base tabular-nums">{v}</span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MODO 1 · EXPLORAR
   ═══════════════════════════════════════════════════════════════════════ */

const EX_W = 700;
const EX_H = 240;
const EX_FA = 60; // fila del interruptor A (puertas de dos entradas)
const EX_FB = 180; // fila del interruptor B
const EX_CY = 120; // eje del símbolo y del LED
const EX_GX = 330; // borde izquierdo del cuerpo de la puerta
const EX_CODO = 264; // x de los codos de entrada
const EX_ROT = 168; // x de los rótulos de valor de entrada
const EX_LED_CX = 618;
const EX_LED_R = 30;

function BancoExplorar({
  tipo,
  a,
  b,
  s,
  uid,
}: {
  tipo: Puerta;
  a: number;
  b: number;
  s: number;
  uid: string;
}) {
  const dos = PUERTAS[tipo].entradas === 2;
  const filaA = dos ? EX_FA : EX_CY;
  const [yIn1, yIn2] = yEntradas(tipo, EX_CY);
  const xe = xEntrada(tipo, EX_GX);
  const xs = xSalida(EX_GX);

  const etiqueta = dos
    ? `Circuito de la puerta ${tipo}. El interruptor A está ${
        a ? "cerrado, a 1" : "abierto, a 0"
      } y el interruptor B está ${b ? "cerrado, a 1" : "abierto, a 0"}. La salida S vale ${s}, así que el LED está ${
        s ? "encendido" : "apagado"
      }.`
    : `Circuito de la puerta NOT. El interruptor A está ${
        a ? "cerrado, a 1" : "abierto, a 0"
      }. La salida S vale ${s}, así que el LED está ${s ? "encendido" : "apagado"}.`;

  return (
    <svg
      viewBox={`0 0 ${EX_W} ${EX_H}`}
      className="h-auto w-full"
      role="img"
      aria-label={etiqueta}
    >
      <DefsBanco uid={uid} />
      <rect width={EX_W} height={EX_H} fill={`url(#${uid}-trama)`} />

      <text
        x={EX_GX + GW / 2}
        y={48}
        textAnchor="middle"
        fontSize={23}
        fontWeight={800}
        letterSpacing={3}
        fill={TINTA}
      >
        {tipo}
      </text>

      <Cable d={codo(SW_X1, filaA, EX_CODO, yIn1, xe)} v={a} />
      {dos && <Cable d={codo(SW_X1, EX_FB, EX_CODO, yIn2, xe)} v={b} />}
      <Cable d={`M ${xs} ${EX_CY} L ${EX_LED_CX - EX_LED_R} ${EX_CY}`} v={s} />

      <CuerpoPuerta
        tipo={tipo}
        x={EX_GX}
        y={EX_CY - GH / 2}
        w={GW}
        h={GH}
        br={BR}
        grosor={3}
        trazo={TRAZO}
        relleno={`url(#${uid}-cuerpo)`}
        fondoBurbuja={PANEL}
      />

      <Llave letra="A" y={filaA} v={a} />
      {dos && <Llave letra="B" y={EX_FB} v={b} />}

      <Rotulo x={EX_ROT} y={filaA} v={a} />
      {dos && <Rotulo x={EX_ROT} y={EX_FB} v={b} />}
      <Rotulo x={515} y={EX_CY} v={s} />

      <Led cx={EX_LED_CX} cy={EX_CY} r={EX_LED_R} v={s} halo={`${uid}-halo`} />
      <text
        x={EX_LED_CX}
        y={EX_CY + EX_LED_R + 32}
        textAnchor="middle"
        fontSize={22}
        fontWeight={800}
        fill={TINTA}
      >
        S
      </text>
    </svg>
  );
}

function ModoExplorar({ uid }: { uid: string }) {
  const [tipo, setTipo] = useState<Puerta>("AND");
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const ficha = PUERTAS[tipo];
  const dos = ficha.entradas === 2;
  const s = ficha.fn(a, b);
  const filas = dos ? COMB_2 : combinaciones(1);

  return (
    <div className="space-y-5">
      {/* Selector de puerta */}
      <div>
        <h3 className={`text-base ${TITULO}`}>1 · Elige la puerta</h3>
        <p className={`mt-1 ${SECUNDARIO}`}>
          Seis puertas básicas. Pulsa una y el banco de trabajo dibuja su símbolo normalizado
          ANSI/IEEE.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {ORDEN.map((p) => {
            const activa = p === tipo;
            return (
              <button
                key={p}
                type="button"
                aria-pressed={activa}
                onClick={() => setTipo(p)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-bold transition-colors ${ANILLO} ${
                  activa
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-zinc-300 bg-white text-slate-700 hover:bg-zinc-50"
                }`}
              >
                <MiniSimbolo tipo={p} />
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Banco de trabajo */}
      <div className="rounded-2xl bg-slate-900 p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[13px] font-semibold uppercase tracking-wider text-slate-400">
            Interruptores
          </span>
          <Conmutador
            letra="A"
            descripcion="Interruptor de la entrada A"
            v={a}
            onToggle={() => setA((v) => (v ? 0 : 1))}
          />
          {dos && (
            <Conmutador
              letra="B"
              descripcion="Interruptor de la entrada B"
              v={b}
              onToggle={() => setB((v) => (v ? 0 : 1))}
            />
          )}
        </div>

        <div className="mt-4">
          <Lienzo minWidth={640}>
            <BancoExplorar tipo={tipo} a={a} b={b} s={s} uid={uid} />
          </Lienzo>
        </div>

        <p
          aria-live="polite"
          className="mt-3 rounded-xl bg-slate-800 px-4 py-2.5 text-[15px] font-semibold text-slate-200"
        >
          {dos ? `A = ${a} · B = ${b}` : `A = ${a}`} → S = {s}.{" "}
          <span className={s ? "text-emerald-300" : "text-slate-400"}>
            El LED está {s ? "encendido" : "apagado"}.
          </span>
        </p>

        <LeyendaCables />
      </div>

      {/* Tabla + ficha */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className={TARJETA}>
          <h3 className={`text-base ${TITULO}`}>Tabla de verdad de la {tipo}</h3>
          <p className={`mt-1 ${SECUNDARIO}`}>
            La fila azul es la que estás probando ahora mismo en el banco.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-center text-[15px]">
              <caption className="sr-only">
                Tabla de verdad completa de la puerta {tipo}
              </caption>
              <thead>
                <tr className="text-[13px] uppercase tracking-wider text-zinc-500">
                  <th scope="col" className="border-b border-zinc-200 px-3 py-2">
                    A
                  </th>
                  {dos && (
                    <th scope="col" className="border-b border-zinc-200 px-3 py-2">
                      B
                    </th>
                  )}
                  <th scope="col" className="border-b border-zinc-200 px-3 py-2">
                    S
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono tabular-nums">
                {filas.map((fila) => {
                  const actual = dos
                    ? fila[0] === a && fila[1] === b
                    : fila[0] === a;
                  const out = ficha.fn(fila[0], dos ? fila[1] : 0);
                  return (
                    <tr
                      key={fila.join("")}
                      aria-current={actual ? "true" : undefined}
                      className={
                        actual
                          ? "bg-blue-50 font-bold text-blue-900 ring-1 ring-inset ring-blue-200"
                          : "text-zinc-700"
                      }
                    >
                      <td className="border-b border-zinc-100 px-3 py-2">{fila[0]}</td>
                      {dos && (
                        <td className="border-b border-zinc-100 px-3 py-2">{fila[1]}</td>
                      )}
                      <td className="border-b border-zinc-100 px-3 py-2">
                        <span
                          className={`inline-grid h-7 w-7 place-items-center rounded-lg font-bold ${
                            out
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-zinc-100 text-zinc-500"
                          }`}
                        >
                          {out}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className={TARJETA}>
          <div className="flex items-center gap-3 text-slate-700">
            <MiniSimbolo tipo={tipo} />
            <h3 className={`text-base ${TITULO}`}>
              {tipo} <span className="font-semibold text-zinc-500">· {ficha.alias}</span>
            </h3>
          </div>
          <p className={`mt-3 ${CUERPO}`}>{ficha.frase}</p>
          <div className="mt-4 rounded-xl bg-zinc-50 px-4 py-3">
            <p className="text-[13px] font-semibold uppercase tracking-wider text-zinc-500">
              Expresión booleana
            </p>
            <p className="mt-1 font-mono text-lg font-bold text-slate-800">
              {ficha.expresion}
            </p>
          </div>
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-[13px] font-semibold uppercase tracking-wider text-amber-700">
              Para entenderla
            </p>
            <p className="mt-1 text-[15px] text-amber-900">{ficha.analogia}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MODO 2 · MONTAR
   ═══════════════════════════════════════════════════════════════════════ */

const MO_W = 820;
const MO_H = 320;
const MO_FA = 52;
const MO_FB = 124;
const MO_FC = 252;
const MO_G1X = 250;
const MO_G1CY = 88; // bornes en 64 y 112 → casan con las filas A y B
const MO_G2X = 520;
const MO_G2CY = 170; // bornes en 146 y 194 → casan con P1 (88) y C (252)
const MO_CODO_AB = 210;
const MO_CODO_12 = 442;
const MO_CODO_C = 460;
const MO_ROT = 162;
const MO_ROT_P1 = 396; // x del rótulo de P1: cabe holgado entre la punta (362) y el codo (428)
const MO_ROT_S = 668; // x del rótulo de S: entre la punta de la puerta 2 (632) y el LED (710)
const MO_LED_CX = 740;
const MO_LED_R = 30;

type Objetivo = {
  id: string;
  titulo: string;
  enunciado: string;
  entradas: [string, string, string];
  salida: string;
  fn: (a: number, b: number, c: number) => 0 | 1;
  pista: string;
};

/* Los tres objetivos tienen solución ÚNICA con esta topología (comprobado
   por fuerza bruta sobre las 25 combinaciones de puertas de dos entradas):
   alarma → NAND + NOR · riego → OR + AND · reposo → OR + NOR. */
const OBJETIVOS: Objetivo[] = [
  {
    id: "alarma",
    titulo: "Alarma con anulación",
    enunciado:
      "Que la alarma suene solo si la puerta está abierta Y el sistema está armado, salvo que se haya pulsado el botón de anulación.",
    entradas: [
      "la puerta está abierta",
      "el sistema está armado",
      "se ha pulsado el botón de anulación",
    ],
    salida: "la alarma suena",
    fn: (a, b, c) => (a && b && !c ? 1 : 0),
    pista:
      "La anulación tiene que poder tumbar el resultado, así que la segunda puerta debe negar. Prueba a negar también la primera: es De Morgan en acción, ¬(¬(A·B) + C) = A · B · ¬C.",
  },
  {
    id: "riego",
    titulo: "Riego del invernadero",
    enunciado:
      "Que la electroválvula se abra si la tierra está seca O ha llegado la hora programada de riego, pero solo mientras quede agua en el depósito.",
    entradas: [
      "el sensor marca tierra seca",
      "ha llegado la hora programada",
      "queda agua en el depósito",
    ],
    salida: "la electroválvula se abre",
    fn: (a, b, c) => ((a || b) && c ? 1 : 0),
    pista:
      "Léelo en voz alta: «(esto O aquello) Y además lo otro». Las dos puertas están dichas en el propio enunciado.",
  },
  {
    id: "reposo",
    titulo: "Taller en reposo",
    enunciado:
      "Que el piloto verde de «taller en reposo» se encienda solo cuando las tres máquinas estén paradas.",
    entradas: [
      "el torno está encendido",
      "la fresadora está encendida",
      "la sierra está encendida",
    ],
    salida: "el piloto verde se enciende",
    fn: (a, b, c) => (a || b || c ? 0 : 1),
    pista:
      "Primero júntalo todo en un «hay alguna máquina en marcha» y después dale la vuelta de una vez.",
  },
];

function BancoMontar({
  g1,
  g2,
  a,
  b,
  c,
  p1,
  s,
  uid,
}: {
  g1: Puerta;
  g2: Puerta;
  a: number;
  b: number;
  c: number;
  p1: number;
  s: number;
  uid: string;
}) {
  const [y1a, y1b] = yEntradas(g1, MO_G1CY);
  const [y2a, y2b] = yEntradas(g2, MO_G2CY);
  const xe1 = xEntrada(g1, MO_G1X);
  const xs1 = xSalida(MO_G1X);
  const xe2 = xEntrada(g2, MO_G2X);
  const xs2 = xSalida(MO_G2X);

  return (
    <svg
      viewBox={`0 0 ${MO_W} ${MO_H}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Circuito de dos puertas encadenadas. A vale ${a}, B vale ${b} y C vale ${c}. La puerta 1 es una ${g1} y su salida P1 vale ${p1}. La puerta 2 es una ${g2} y la salida final S vale ${s}, así que el LED está ${
        s ? "encendido" : "apagado"
      }.`}
    >
      <DefsBanco uid={uid} />
      <rect width={MO_W} height={MO_H} fill={`url(#${uid}-trama)`} />

      <Cable d={codo(SW_X1, MO_FA, MO_CODO_AB, y1a, xe1)} v={a} />
      <Cable d={codo(SW_X1, MO_FB, MO_CODO_AB, y1b, xe1)} v={b} />
      <Cable d={codo(xs1, MO_G1CY, MO_CODO_12, y2a, xe2)} v={p1} />
      <Cable d={codo(SW_X1, MO_FC, MO_CODO_C, y2b, xe2)} v={c} />
      <Cable d={`M ${xs2} ${MO_G2CY} L ${MO_LED_CX - MO_LED_R} ${MO_G2CY}`} v={s} />

      <CuerpoPuerta
        tipo={g1}
        x={MO_G1X}
        y={MO_G1CY - GH / 2}
        w={GW}
        h={GH}
        br={BR}
        grosor={3}
        trazo={TRAZO}
        relleno={`url(#${uid}-cuerpo)`}
        fondoBurbuja={PANEL}
      />
      <CuerpoPuerta
        tipo={g2}
        x={MO_G2X}
        y={MO_G2CY - GH / 2}
        w={GW}
        h={GH}
        br={BR}
        grosor={3}
        trazo={TRAZO}
        relleno={`url(#${uid}-cuerpo)`}
        fondoBurbuja={PANEL}
      />

      <text
        x={MO_G1X + GW / 2}
        y={MO_G1CY + GH / 2 + 26}
        textAnchor="middle"
        fontSize={21}
        fontWeight={800}
        fill={TINTA}
      >
        1 · {g1}
      </text>
      <text
        x={MO_G2X + GW / 2}
        y={MO_G2CY + GH / 2 + 26}
        textAnchor="middle"
        fontSize={21}
        fontWeight={800}
        fill={TINTA}
      >
        2 · {g2}
      </text>

      <Llave letra="A" y={MO_FA} v={a} />
      <Llave letra="B" y={MO_FB} v={b} />
      <Llave letra="C" y={MO_FC} v={c} />

      <Rotulo x={MO_ROT} y={MO_FA} v={a} />
      <Rotulo x={MO_ROT} y={MO_FB} v={b} />
      <Rotulo x={MO_ROT} y={MO_FC} v={c} />
      <text
        x={MO_ROT_P1}
        y={MO_G1CY - 26}
        textAnchor="middle"
        fontSize={18}
        fontWeight={700}
        fill={METAL}
      >
        P1
      </text>
      <Rotulo x={MO_ROT_P1} y={MO_G1CY} v={p1} />
      <Rotulo x={MO_ROT_S} y={MO_G2CY} v={s} />

      <Led cx={MO_LED_CX} cy={MO_G2CY} r={MO_LED_R} v={s} halo={`${uid}-halo`} />
      <text
        x={MO_LED_CX}
        y={MO_G2CY + MO_LED_R + 32}
        textAnchor="middle"
        fontSize={22}
        fontWeight={800}
        fill={TINTA}
      >
        S
      </text>
    </svg>
  );
}

function ModoMontar({ uid }: { uid: string }) {
  const [g1, setG1] = useState<Puerta>("AND");
  const [g2, setG2] = useState<Puerta>("AND");
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [objId, setObjId] = useState(OBJETIVOS[0].id);

  const objetivo = OBJETIVOS.find((o) => o.id === objId) ?? OBJETIVOS[0];

  const filas = useMemo(
    () =>
      COMB_3.map((v) => {
        const p1 = PUERTAS[g1].fn(v[0], v[1]);
        const s = PUERTAS[g2].fn(p1, v[2]);
        return { v, p1, s, obj: objetivo.fn(v[0], v[1], v[2]) };
      }),
    [g1, g2, objetivo],
  );

  const aciertos = filas.filter((f) => f.s === f.obj).length;
  const resuelto = aciertos === 8;
  const p1Actual = PUERTAS[g1].fn(a, b);
  const sActual = PUERTAS[g2].fn(p1Actual, c);

  const selector = `rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-bold text-white ${ANILLO_OSCURO}`;

  return (
    <div className="space-y-5">
      <div className={TARJETA}>
        <h3 className={`text-base ${TITULO}`}>El circuito que vas a montar</h3>
        <p className={`mt-2 ${CUERPO}`}>
          Dos puertas encadenadas: la <b>puerta 1</b> recibe las entradas A y B; la{" "}
          <b>puerta 2</b> recibe la salida de la puerta 1 (la llamamos <b>P1</b>) y la
          entrada C. Cambia las puertas, conmuta las entradas y mira cómo se propagan los
          valores por cada tramo de cable.
        </p>
      </div>

      <div className="rounded-2xl bg-slate-900 p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
          <span className="text-[13px] font-semibold uppercase tracking-wider text-slate-400">
            Entradas
          </span>
          <Conmutador
            letra="A"
            descripcion={`Entrada A: ${objetivo.entradas[0]}`}
            v={a}
            onToggle={() => setA((v) => (v ? 0 : 1))}
          />
          <Conmutador
            letra="B"
            descripcion={`Entrada B: ${objetivo.entradas[1]}`}
            v={b}
            onToggle={() => setB((v) => (v ? 0 : 1))}
          />
          <Conmutador
            letra="C"
            descripcion={`Entrada C: ${objetivo.entradas[2]}`}
            v={c}
            onToggle={() => setC((v) => (v ? 0 : 1))}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-3">
          <span className="text-[13px] font-semibold uppercase tracking-wider text-slate-400">
            Puertas
          </span>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            Hueco 1
            <select
              value={g1}
              onChange={(e) => setG1(e.target.value as Puerta)}
              className={selector}
            >
              {ORDEN_2.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            Hueco 2
            <select
              value={g2}
              onChange={(e) => setG2(e.target.value as Puerta)}
              className={selector}
            >
              {ORDEN_2.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <span className="text-[13px] text-slate-500">
            Solo puertas de dos entradas: cada hueco tiene dos cables.
          </span>
        </div>

        <div className="mt-4">
          <Lienzo minWidth={700}>
            <BancoMontar
              g1={g1}
              g2={g2}
              a={a}
              b={b}
              c={c}
              p1={p1Actual}
              s={sActual}
              uid={uid}
            />
          </Lienzo>
        </div>

        <p
          aria-live="polite"
          className="mt-3 rounded-xl bg-slate-800 px-4 py-2.5 text-[15px] font-semibold text-slate-200"
        >
          A = {a} · B = {b} · C = {c} → P1 = {p1Actual} → S = {sActual}.{" "}
          <span className={sActual ? "text-emerald-300" : "text-slate-400"}>
            El LED está {sActual ? "encendido" : "apagado"}.
          </span>
        </p>

        <LeyendaCables />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Objetivo */}
        <div className={TARJETA}>
          <h3 className={`text-base ${TITULO}`}>El objetivo</h3>
          <label className="mt-3 block text-[13px] font-semibold uppercase tracking-wider text-zinc-500">
            Elige el encargo
            <select
              value={objId}
              onChange={(e) => setObjId(e.target.value)}
              className={`mt-1.5 block w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-[15px] font-semibold normal-case tracking-normal text-slate-700 ${ANILLO}`}
            >
              {OBJETIVOS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.titulo}
                </option>
              ))}
            </select>
          </label>

          <p className={`mt-4 ${CUERPO}`}>{objetivo.enunciado}</p>

          <ul className={`mt-3 space-y-1 ${SECUNDARIO}`}>
            {(["A", "B", "C"] as const).map((letra, i) => (
              <li key={letra}>
                <b className="font-mono text-slate-700">{letra} = 1</b> →{" "}
                {objetivo.entradas[i]}
              </li>
            ))}
            <li>
              <b className="font-mono text-slate-700">S = 1</b> → {objetivo.salida}
            </li>
          </ul>

          <div
            aria-live="polite"
            className={`mt-4 rounded-xl border px-4 py-3 text-[15px] ${
              resuelto
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-amber-200 bg-amber-50 text-amber-900"
            }`}
          >
            {resuelto ? (
              <>
                <b>¡Circuito resuelto!</b> Tu combinación {g1} + {g2} coincide con el objetivo
                en las <b>8 filas de 8</b>. Fíjate en la columna «objetivo» de la tabla: ya no
                queda ni una diferencia.
              </>
            ) : (
              <>
                Con <b>{g1}</b> en el hueco 1 y <b>{g2}</b> en el hueco 2, tu circuito coincide
                con el objetivo en <b>{aciertos} de las 8 filas</b>. Busca en la tabla las filas
                marcadas en rosa: son las que se te resisten.
              </>
            )}
          </div>

          <details className="mt-3 rounded-xl bg-zinc-50 px-4 py-3">
            <summary
              className={`cursor-pointer text-sm font-semibold text-slate-700 ${ANILLO}`}
            >
              ¿Te has atascado? Abre la pista
            </summary>
            <p className={`mt-2 ${CUERPO}`}>{objetivo.pista}</p>
          </details>
        </div>

        {/* Tabla del circuito completo */}
        <div className={TARJETA}>
          <h3 className={`text-base ${TITULO}`}>Tabla del circuito completo</h3>
          <p className={`mt-1 ${SECUNDARIO}`}>
            Las 8 combinaciones, recalculadas en cuanto tocas algo. En azul, la fila que
            tienes puesta ahora en el banco.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-center text-[15px]">
              <caption className="sr-only">
                Tabla de verdad del circuito con {g1} en el hueco 1 y {g2} en el hueco 2,
                comparada con la tabla objetivo
              </caption>
              <thead>
                <tr className="text-[13px] uppercase tracking-wider text-zinc-500">
                  {["A", "B", "C", "P1", "S"].map((h) => (
                    <th key={h} scope="col" className="border-b border-zinc-200 px-2 py-2">
                      {h}
                    </th>
                  ))}
                  <th scope="col" className="border-b border-zinc-200 px-2 py-2">
                    Obj.
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono tabular-nums">
                {filas.map((f) => {
                  const actual = f.v[0] === a && f.v[1] === b && f.v[2] === c;
                  const falla = f.s !== f.obj;
                  return (
                    <tr
                      key={f.v.join("")}
                      aria-current={actual ? "true" : undefined}
                      className={
                        actual
                          ? "bg-blue-50 font-bold text-blue-900 ring-1 ring-inset ring-blue-200"
                          : falla
                            ? "bg-rose-50 text-rose-900"
                            : "text-zinc-700"
                      }
                    >
                      {f.v.map((bit, k) => (
                        <td
                          key={k}
                          className="border-b border-zinc-100 px-2 py-2"
                        >
                          {bit}
                        </td>
                      ))}
                      <td className="border-b border-zinc-100 px-2 py-2 text-zinc-500">
                        {f.p1}
                      </td>
                      <td className="border-b border-zinc-100 px-2 py-2">
                        <span
                          className={`inline-grid h-7 w-7 place-items-center rounded-lg font-bold ${
                            f.s
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-zinc-100 text-zinc-500"
                          }`}
                        >
                          {f.s}
                        </span>
                      </td>
                      <td className="border-b border-zinc-100 px-2 py-2">
                        <span
                          className={`inline-grid h-7 w-7 place-items-center rounded-lg font-bold ${
                            falla
                              ? "bg-rose-100 text-rose-700"
                              : "bg-zinc-100 text-zinc-400"
                          }`}
                        >
                          {f.obj}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className={`mt-3 ${SECUNDARIO}`}>
            <b>P1</b> es el valor que sale de la puerta 1 y entra en la puerta 2. Si P1 ya está
            mal, la S nunca podrá estar bien.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MODO 3 · RETOS
   ═══════════════════════════════════════════════════════════════════════ */

type Reto = {
  id: string;
  tipo: "puerta" | "tabla";
  tema: string;
  escenario: string;
  enunciado: string;
  entradas: { letra: string; uno: string }[];
  salida: string;
  fn: (v: readonly number[]) => 0 | 1;
  motivo: (v: readonly number[]) => string;
  pista: string;
};

const RETOS: Reto[] = [
  {
    id: "alarma",
    tipo: "puerta",
    tema: "Alarma de una vivienda",
    escenario:
      "Una vivienda tiene dos sensores de intrusión: uno en la puerta de entrada y otro en la ventana del salón.",
    enunciado:
      "La sirena tiene que sonar en cuanto salte cualquiera de los dos sensores: basta con uno. ¿Qué puerta lógica pondrías?",
    entradas: [
      { letra: "A", uno: "ha saltado el sensor de la puerta" },
      { letra: "B", uno: "ha saltado el sensor de la ventana" },
    ],
    salida: "la sirena suena",
    fn: (v) => (v[0] || v[1] ? 1 : 0),
    motivo: (v) =>
      v[0] && v[1]
        ? "Han saltado los dos sensores a la vez: con más razón todavía, la sirena suena (1)."
        : v[0] || v[1]
          ? `Ha saltado ${v[0] ? "el sensor de la puerta" : "el sensor de la ventana"} y con uno basta, así que la sirena suena (1).`
          : "Los dos sensores en reposo: no ha entrado nadie y la sirena calla (0).",
    pista:
      "«Basta con uno» es la clave. Busca la puerta que da 1 en cuanto una entrada vale 1.",
  },
  {
    id: "riego",
    tipo: "tabla",
    tema: "Riego automático de un invernadero",
    escenario:
      "En un invernadero, una electroválvula abre el riego. Hay un sensor de humedad en la tierra y un flotador en el depósito.",
    enunciado:
      "La electroválvula solo debe abrirse si la tierra está seca Y además queda agua en el depósito. Rellena la salida de las cuatro filas.",
    entradas: [
      { letra: "A", uno: "la tierra está seca" },
      { letra: "B", uno: "queda agua en el depósito" },
    ],
    salida: "la electroválvula se abre",
    fn: (v) => (v[0] && v[1] ? 1 : 0),
    motivo: (v) =>
      v[0] && v[1]
        ? "Tierra seca y depósito con agua: se cumplen las dos condiciones, así que riega (1)."
        : v[0]
          ? "La tierra está seca, pero el depósito está vacío: si abrimos, la bomba trabaja en seco. No riega (0)."
          : v[1]
            ? "Hay agua de sobra, pero la tierra ya está húmeda: regar ahora sería ahogar la planta (0)."
            : "Ni la tierra está seca ni hay agua: no hay nada que hacer (0).",
    pista: "Hacen falta las DOS condiciones a la vez. Esa es la tabla de la AND.",
  },
  {
    id: "ascensor",
    tipo: "puerta",
    tema: "Luz del hueco del ascensor",
    escenario:
      "La lámpara del hueco del ascensor se maneja con dos conmutadores: uno en la planta baja (A) y otro en el ático (B). Cada conmutador puede estar arriba (1) o abajo (0).",
    enunciado:
      "La lámpara se enciende cuando los dos conmutadores están en posiciones DISTINTAS: así cualquiera de los dos apaga o enciende sin moverse de su planta. ¿Qué puerta describe ese comportamiento?",
    entradas: [
      { letra: "A", uno: "el conmutador de la planta baja está arriba" },
      { letra: "B", uno: "el conmutador del ático está arriba" },
    ],
    salida: "la lámpara se enciende",
    fn: (v) => (v[0] !== v[1] ? 1 : 0),
    motivo: (v) => {
      const pos = (x: number) => (x ? "arriba" : "abajo");
      return v[0] === v[1]
        ? `Los dos conmutadores ${pos(v[0])}: están en la misma posición, así que la lámpara está apagada (0).`
        : `El de la planta baja ${pos(v[0])} y el del ático ${pos(v[1])}: posiciones distintas, así que la lámpara se enciende (1).`;
    },
    pista:
      "«Distintas» es la palabra. La puerta que da 1 solo cuando las entradas se diferencian se llama O exclusiva.",
  },
  {
    id: "cinturon",
    tipo: "tabla",
    tema: "Detector de cinturón de seguridad",
    escenario:
      "El asiento del copiloto tiene un sensor de peso y la hebilla del cinturón, un contacto. Ojo con B: vale 1 cuando el cinturón SÍ está abrochado.",
    enunciado:
      "El pitido de aviso debe sonar cuando hay alguien sentado pero el cinturón NO está abrochado. Rellena las cuatro filas.",
    entradas: [
      { letra: "A", uno: "hay alguien sentado" },
      { letra: "B", uno: "el cinturón está abrochado" },
    ],
    salida: "el pitido de aviso suena",
    fn: (v) => (v[0] && !v[1] ? 1 : 0),
    motivo: (v) =>
      v[0] && !v[1]
        ? "Hay alguien sentado y el cinturón sin abrochar: esta es justo la situación peligrosa, el pitido suena (1)."
        : v[0]
          ? "Hay alguien sentado y el cinturón abrochado: todo correcto, no hay que avisar de nada (0)."
          : v[1]
            ? "El asiento está vacío y encima el cinturón está abrochado: no hay nada de lo que avisar (0)."
            : "El cinturón está suelto, sí, pero el asiento está vacío: sin pasajero no hay a quién avisar (0).",
    pista:
      "Cuidado: esta no es ninguna de las seis puertas básicas. Es una AND con la entrada B negada, S = A · ¬B. Primero niegas B y después haces la Y.",
  },
  {
    id: "ventilacion",
    tipo: "tabla",
    tema: "Ventilación de un taller",
    escenario:
      "Un taller tiene un extractor de virutas, un torno, una fresadora y una seta de parada de emergencia.",
    enunciado:
      "El extractor arranca si está funcionando el torno O la fresadora, salvo que alguien haya pulsado la seta de emergencia: entonces no arranca pase lo que pase. Rellena las ocho filas.",
    entradas: [
      { letra: "A", uno: "el torno está encendido" },
      { letra: "B", uno: "la fresadora está encendida" },
      { letra: "C", uno: "la seta de emergencia está pulsada" },
    ],
    salida: "el extractor se pone en marcha",
    fn: (v) => ((v[0] || v[1]) && !v[2] ? 1 : 0),
    motivo: (v) => {
      if (!v[0] && !v[1]) {
        return v[2]
          ? "No hay ninguna máquina en marcha y, además, la seta de emergencia está pulsada: el extractor no arranca (0)."
          : "La seta está sin pulsar, pero no hay ninguna máquina en marcha: no hay virutas que extraer (0).";
      }
      const dos = v[0] === 1 && v[1] === 1;
      const quien = dos ? "el torno y la fresadora" : v[0] ? "el torno" : "la fresadora";
      const verbo = dos ? "están" : "está";
      return v[2]
        ? `La seta de emergencia está pulsada y eso manda sobre todo lo demás: aunque ${quien} ${verbo} en marcha, el extractor no arranca (0).`
        : `Hay máquina trabajando (${quien}) y la seta está sin pulsar: hay virutas que extraer, así que el extractor arranca (1).`;
    },
    pista:
      "Divídelo en dos trozos: «alguna máquina en marcha» (una OR) y «la seta NO está pulsada» (una negación). Después únelos con una Y.",
  },
  {
    id: "semaforo",
    tipo: "tabla",
    tema: "Semáforo de una obra",
    escenario:
      "Una obra deja un solo carril libre y lo regula con dos semáforos. Miramos únicamente el verde del lado A.",
    enunciado:
      "El verde del lado A solo se enciende si hay un coche esperando en ese lado, el tramo de obra está libre y el operario NO ha activado el modo manual. Rellena las ocho filas.",
    entradas: [
      { letra: "A", uno: "hay un coche esperando en el lado A" },
      { letra: "B", uno: "el tramo de obra está ocupado" },
      { letra: "C", uno: "el operario ha activado el modo manual" },
    ],
    salida: "se enciende el verde del lado A",
    fn: (v) => (v[0] && !v[1] && !v[2] ? 1 : 0),
    motivo: (v) => {
      if (v[0] && !v[1] && !v[2]) {
        return "Coche esperando, tramo libre y sin modo manual: se cumplen las tres condiciones, verde para el lado A (1).";
      }
      const fallos: string[] = [];
      if (!v[0]) fallos.push("no hay ningún coche esperando en el lado A");
      if (v[1]) fallos.push("el tramo de obra sigue ocupado");
      if (v[2]) fallos.push("el operario lleva puesto el modo manual");
      const lista =
        fallos.length === 1
          ? fallos[0]
          : `${fallos.slice(0, -1).join(", ")} y ${fallos[fallos.length - 1]}`;
      return fallos.length === 1
        ? `Falla una de las tres condiciones: ${lista}. El verde del lado A no se enciende (0).`
        : `Fallan ${fallos.length === 2 ? "dos" : "las tres"} condiciones: ${lista}. El verde del lado A no se enciende (0).`;
    },
    pista:
      "Tres condiciones a la vez, y dos de ellas van negadas: hace falta que B valga 0 y que C valga 0. Solo UNA de las ocho filas puede dar 1.",
  },
];

const numEntradas = (r: Reto) => r.entradas.length;
const filasDe = (r: Reto) => (numEntradas(r) === 2 ? COMB_2 : COMB_3);

/** Puerta de dos entradas cuya tabla coincide con la del reto (si existe). */
const puertaSolucion = (r: Reto): Puerta | null =>
  ORDEN_2.find((p) =>
    filasDe(r).every((v) => PUERTAS[p].fn(v[0], v[1]) === r.fn(v)),
  ) ?? null;

type EstadoReto = {
  tabla: (0 | 1 | null)[];
  puerta: Puerta | null;
  comprobado: boolean;
  intentos: number;
  superado: boolean;
  aLaPrimera: boolean;
};

const estadoInicial = (r: Reto): EstadoReto => ({
  tabla: filasDe(r).map(() => null),
  puerta: null,
  comprobado: false,
  intentos: 0,
  superado: false,
  aLaPrimera: false,
});

function ModoRetos({ uid }: { uid: string }) {
  const [indice, setIndice] = useState(0);
  const [estados, setEstados] = useState<EstadoReto[]>(() =>
    RETOS.map(estadoInicial),
  );

  const reto = RETOS[indice];
  const est = estados[indice];
  const filas = filasDe(reto);
  const esperado = filas.map((v) => reto.fn(v));

  const cambiar = useCallback((i: number, parche: Partial<EstadoReto>) => {
    setEstados((prev) => prev.map((e, j) => (j === i ? { ...e, ...parche } : e)));
  }, []);

  const marcarFila = (k: number, valor: 0 | 1) => {
    if (est.superado) return;
    const tabla = est.tabla.map((x, j) => (j === k ? valor : x));
    cambiar(indice, { tabla, comprobado: false });
  };

  const completo =
    reto.tipo === "puerta" ? est.puerta !== null : est.tabla.every((x) => x !== null);

  const comprobar = () => {
    const elegida = est.puerta;
    const ok =
      reto.tipo === "puerta"
        ? elegida !== null &&
          filas.every((v, k) => PUERTAS[elegida].fn(v[0], v[1]) === esperado[k])
        : est.tabla.every((x, k) => x === esperado[k]);
    cambiar(indice, {
      comprobado: true,
      intentos: est.intentos + 1,
      superado: ok,
      aLaPrimera: ok && est.intentos === 0,
    });
  };

  const reintentar = () => cambiar(indice, { ...estadoInicial(reto), intentos: est.intentos });

  /** Filas en las que la respuesta no cuadra con lo que pide el enunciado. */
  const falladas = !est.comprobado
    ? []
    : filas
        .map((v, k) => {
          const dado =
            reto.tipo === "puerta"
              ? est.puerta
                ? PUERTAS[est.puerta].fn(v[0], v[1])
                : null
              : est.tabla[k];
          return { v, k, dado, bien: dado === esperado[k] };
        })
        .filter((f) => !f.bien);

  const superados = estados.filter((e) => e.superado).length;
  const primeras = estados.filter((e) => e.aLaPrimera).length;
  const todos = superados === RETOS.length;

  const cierre = todos
    ? primeras === RETOS.length
      ? "Pleno a la primera. Esto ya no es suerte: has entendido cómo se lee un enunciado y se convierte en tabla."
      : primeras >= 4
        ? "Muy bien. Los que has tenido que corregir son justo los que más caen en el examen: los que llevan una entrada negada."
        : primeras >= 2
          ? "Los seis resueltos, que es lo que cuenta. Vuelve al modo Explorar y repasa las tablas que se te atragantaron."
          : "Has llegado al final con todos resueltos. Repite mañana el del cinturón y el del semáforo: son los que más se resisten, y a la segunda vuelta caen solos."
    : "";

  return (
    <div className="space-y-5">
      {/* Progreso */}
      <div className={TARJETA}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className={`text-base ${TITULO}`}>
            Reto {indice + 1} de {RETOS.length}
            <span className="ml-2 font-semibold text-zinc-500">· {reto.tema}</span>
          </h3>
          <p className={SECUNDARIO}>
            Resueltos: <b className="text-emerald-600">{superados}</b> de {RETOS.length} ·{" "}
            <b className="text-blue-700">{primeras}</b> a la primera
          </p>
        </div>

        <div
          className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-zinc-200"
          role="progressbar"
          aria-valuenow={superados}
          aria-valuemin={0}
          aria-valuemax={RETOS.length}
          aria-label="Retos resueltos"
        >
          <div
            className="h-full rounded-full bg-emerald-500 transition-[width] duration-300"
            style={{ width: `${(superados / RETOS.length) * 100}%` }}
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {RETOS.map((r, i) => {
            const e = estados[i];
            const aqui = i === indice;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setIndice(i)}
                aria-current={aqui ? "true" : undefined}
                aria-label={`Ir al reto ${i + 1}: ${r.tema}${e.superado ? " (resuelto)" : ""}`}
                className={`h-9 w-9 rounded-lg text-sm font-bold transition-colors ${ANILLO} ${
                  aqui
                    ? "bg-slate-700 text-white"
                    : e.superado
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Enunciado */}
      <div className={TARJETA}>
        <p className={`${SECUNDARIO} font-semibold uppercase tracking-wider`}>
          La situación
        </p>
        <p className={`mt-1.5 ${CUERPO}`}>{reto.escenario}</p>
        <p className="mt-3 text-[15px] font-semibold text-slate-800">{reto.enunciado}</p>

        <ul className="mt-4 grid gap-1.5 rounded-xl bg-zinc-50 px-4 py-3 text-[15px] text-zinc-700 sm:grid-cols-2">
          {reto.entradas.map((e) => (
            <li key={e.letra}>
              <b className="font-mono text-slate-800">{e.letra} = 1</b> → {e.uno}
            </li>
          ))}
          <li className="sm:col-span-2">
            <b className="font-mono text-slate-800">S = 1</b> → {reto.salida}
          </li>
        </ul>

        {/* Respuesta: elegir puerta */}
        {reto.tipo === "puerta" && (
          <fieldset className="mt-5" disabled={est.superado}>
            <legend className={`${SECUNDARIO} font-semibold uppercase tracking-wider`}>
              Elige la puerta que lo resuelve
            </legend>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {ORDEN_2.map((p) => {
                const elegida = est.puerta === p;
                return (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={elegida}
                    onClick={() => cambiar(indice, { puerta: p, comprobado: false })}
                    className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-bold transition-colors disabled:opacity-60 ${ANILLO} ${
                      elegida
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-zinc-300 bg-white text-slate-700 hover:bg-zinc-50"
                    }`}
                  >
                    <MiniSimbolo tipo={p} />
                    {p}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {/* Respuesta: rellenar la tabla */}
        {reto.tipo === "tabla" && (
          <div className="mt-5">
            <p className={`${SECUNDARIO} font-semibold uppercase tracking-wider`}>
              Decide la salida de cada fila
            </p>
            <div className="mt-2.5 overflow-x-auto">
              <table className="w-full border-collapse text-center text-[15px]">
                <caption className="sr-only">
                  Tabla de verdad que debes completar para el reto {reto.tema}
                </caption>
                <thead>
                  <tr className="text-[13px] uppercase tracking-wider text-zinc-500">
                    {reto.entradas.map((e) => (
                      <th
                        key={e.letra}
                        scope="col"
                        className="border-b border-zinc-200 px-2 py-2"
                      >
                        {e.letra}
                      </th>
                    ))}
                    <th scope="col" className="border-b border-zinc-200 px-2 py-2">
                      S
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filas.map((v, k) => {
                    const dado = est.tabla[k];
                    const bien = est.comprobado && dado === esperado[k];
                    const mal = est.comprobado && dado !== esperado[k];
                    return (
                      <tr
                        key={v.join("")}
                        className={
                          bien
                            ? "bg-emerald-50"
                            : mal
                              ? "bg-rose-50"
                              : "odd:bg-zinc-50/60"
                        }
                      >
                        {v.map((bit, j) => (
                          <td
                            key={j}
                            className="border-b border-zinc-100 px-2 py-2 font-mono tabular-nums text-zinc-700"
                          >
                            {bit}
                          </td>
                        ))}
                        <td className="border-b border-zinc-100 px-2 py-2">
                          <div className="flex items-center justify-center gap-1.5">
                            {([0, 1] as const).map((opcion) => (
                              <label key={opcion} className="cursor-pointer">
                                <input
                                  type="radio"
                                  name={`${uid}-${reto.id}-f${k}`}
                                  className="peer sr-only"
                                  checked={dado === opcion}
                                  disabled={est.superado}
                                  onChange={() => marcarFila(k, opcion)}
                                  aria-label={`Fila ${reto.entradas
                                    .map((e, j) => `${e.letra} igual a ${v[j]}`)
                                    .join(", ")}: la salida vale ${opcion}`}
                                />
                                <span className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-300 bg-white font-mono text-[15px] font-bold text-zinc-500 transition-colors peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600 peer-focus-visible:ring-offset-2 peer-disabled:opacity-60">
                                  {opcion}
                                </span>
                              </label>
                            ))}
                            {est.comprobado && (
                              <span
                                className={`ml-1 text-lg font-bold ${
                                  bien ? "text-emerald-600" : "text-rose-600"
                                }`}
                                aria-hidden="true"
                              >
                                {bien ? "✓" : "✗"}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Acciones */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {!est.superado && (
            <button
              type="button"
              onClick={comprobar}
              disabled={!completo}
              className={`${BOTON_1} disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500`}
            >
              Comprobar
            </button>
          )}
          {!est.superado && est.comprobado && (
            <button type="button" onClick={reintentar} className={BOTON_2}>
              Reintentar el reto
            </button>
          )}
          {est.superado && indice < RETOS.length - 1 && (
            <button
              type="button"
              onClick={() => setIndice(indice + 1)}
              className={BOTON_1}
            >
              Siguiente reto
            </button>
          )}
          {!completo && !est.comprobado && (
            <span className={SECUNDARIO}>
              {reto.tipo === "puerta"
                ? "Elige una puerta para poder comprobar."
                : "Completa todas las filas para poder comprobar."}
            </span>
          )}
        </div>

        {/* Corrección */}
        <div aria-live="polite">
          {est.comprobado && est.superado && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[15px] text-emerald-900">
              <b>Correcto.</b>{" "}
              {reto.tipo === "puerta"
                ? `La ${est.puerta} es la puerta que pide el enunciado.`
                : "Tu tabla es exactamente la que pide el enunciado."}{" "}
              {est.aLaPrimera
                ? "Y además a la primera."
                : "Lo has sacado corrigiendo: así es como se aprende esto."}
              {puertaSolucion(reto) === null && (
                <>
                  {" "}
                  Fíjate en un detalle: esta función <b>no</b> es ninguna de las seis puertas
                  básicas por sí sola; hace falta combinar varias.
                </>
              )}
            </div>
          )}

          {est.comprobado && !est.superado && (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
              <p className="text-[15px] font-semibold text-rose-900">
                Todavía no. {falladas.length === 1 ? "Se te escapa 1 fila" : `Se te escapan ${falladas.length} filas`}{" "}
                de {filas.length}; el resto ya lo tienes bien.
                {reto.tipo === "puerta" && est.puerta && (
                  <> Con la {est.puerta} pasaría esto:</>
                )}
              </p>
              <ul className="mt-2.5 space-y-2">
                {falladas.map((f) => (
                  <li key={f.k} className="text-[15px] text-rose-900">
                    <span className="font-mono font-bold">
                      {reto.entradas.map((e, j) => `${e.letra}=${f.v[j]}`).join(" · ")}
                    </span>{" "}
                    → pusiste <b>{f.dado}</b>, y debería ser <b>{esperado[f.k]}</b>.{" "}
                    <span className="text-rose-800">{reto.motivo(f.v)}</span>
                  </li>
                ))}
              </ul>
              <details className="mt-3">
                <summary className={`cursor-pointer text-sm font-semibold text-rose-900 ${ANILLO}`}>
                  Ver la pista
                </summary>
                <p className="mt-1.5 text-[15px] text-rose-900">{reto.pista}</p>
              </details>
            </div>
          )}
        </div>
      </div>

      {/* Resumen final */}
      {todos && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <h3 className={`text-lg ${TITULO} text-emerald-900`}>
            Has terminado los seis retos
          </h3>
          <p className="mt-2 text-[15px] text-emerald-900">
            Marcador: <b>{superados} de {RETOS.length}</b> resueltos, <b>{primeras}</b> a la
            primera y <b>{estados.reduce((n, e) => n + e.intentos, 0)}</b> comprobaciones en
            total.
          </p>
          <p className="mt-2 text-[15px] text-emerald-900">{cierre}</p>
          <button
            type="button"
            onClick={() => {
              setEstados(RETOS.map(estadoInicial));
              setIndice(0);
            }}
            className={`mt-4 ${BOTON_2}`}
          >
            Empezar otra vez
          </button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ARMAZÓN: pestañas accesibles
   ═══════════════════════════════════════════════════════════════════════ */

const MODOS = [
  {
    id: "explorar",
    etiqueta: "1 · Explorar",
    resumen:
      "Conmuta los interruptores y mira cómo responde cada una de las seis puertas básicas.",
  },
  {
    id: "montar",
    etiqueta: "2 · Montar",
    resumen:
      "Encadena dos puertas, propaga los valores por los cables y resuelve un encargo real.",
  },
  {
    id: "retos",
    etiqueta: "3 · Retos",
    resumen:
      "Seis situaciones del mundo real: decide la salida de cada fila o elige la puerta que toca.",
  },
] as const;

type ModoId = (typeof MODOS)[number]["id"];

export default function LogicaDigitalApp() {
  const bruto = useId();
  const uid = bruto.replace(/[^a-zA-Z0-9-]/g, "");
  const [modo, setModo] = useState<ModoId>("explorar");
  const refsTabs = useRef<Partial<Record<ModoId, HTMLButtonElement | null>>>({});

  const activo = MODOS.find((m) => m.id === modo) ?? MODOS[0];

  const teclaTab = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = MODOS.length;
    let j = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") j = (i + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") j = (i - 1 + n) % n;
    else if (e.key === "Home") j = 0;
    else if (e.key === "End") j = n - 1;
    if (j < 0) return;
    e.preventDefault();
    const destino = MODOS[j].id;
    setModo(destino);
    refsTabs.current[destino]?.focus();
  };

  return (
    <section className="w-full">
      <header>
        <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[13px] font-bold uppercase tracking-wider text-blue-700">
          4.º ESO · Tecnología · Electrónica digital
        </span>
        <h2 className={`mt-3 text-2xl sm:text-3xl ${TITULO}`}>
          Laboratorio de lógica digital
        </h2>
        <p className="mt-3 max-w-3xl text-lg text-zinc-600">
          Puertas lógicas, tablas de verdad y funciones booleanas, pero tocándolas. Conmuta
          interruptores, monta circuitos de dos puertas y resuelve seis encargos reales:
          una alarma, un riego, un ascensor, un cinturón, un taller y un semáforo de obra.
        </p>
      </header>

      <div
        role="tablist"
        aria-label="Modos del laboratorio de lógica digital"
        className="mt-6 flex gap-1.5 rounded-2xl border border-zinc-200 bg-zinc-50 p-1.5"
      >
        {MODOS.map((m, i) => {
          const activa = m.id === modo;
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              id={`${uid}-tab-${m.id}`}
              aria-selected={activa}
              aria-controls={`${uid}-panel-${m.id}`}
              tabIndex={activa ? 0 : -1}
              ref={(el) => {
                refsTabs.current[m.id] = el;
              }}
              onClick={() => setModo(m.id)}
              onKeyDown={(e) => teclaTab(e, i)}
              className={`min-w-0 flex-1 whitespace-nowrap rounded-xl px-2 py-2.5 text-sm font-semibold transition-colors sm:px-4 ${ANILLO} ${
                activa
                  ? "bg-slate-700 text-white shadow-sm"
                  : "text-slate-600 hover:bg-white"
              }`}
            >
              {m.etiqueta}
            </button>
          );
        })}
      </div>

      <p className={`mt-3 ${SECUNDARIO}`}>{activo.resumen}</p>

      {/* Los tres paneles se quedan montados y los inactivos se ocultan con
          `hidden` (patrón WAI-ARIA de pestañas): así el alumno puede irse al
          modo Explorar a repasar una tabla y volver a los Retos sin perder lo
          que llevaba hecho. `hidden` los saca además del orden de tabulación. */}
      {MODOS.map((m) => {
        const oculto = m.id !== modo;
        return (
          <div
            key={m.id}
            role="tabpanel"
            id={`${uid}-panel-${m.id}`}
            aria-labelledby={`${uid}-tab-${m.id}`}
            tabIndex={0}
            hidden={oculto}
            className={`mt-4 rounded-2xl ${ANILLO} ${oculto ? "hidden" : ""}`}
          >
            {m.id === "explorar" && <ModoExplorar uid={`${uid}-ex`} />}
            {m.id === "montar" && <ModoMontar uid={`${uid}-mo`} />}
            {m.id === "retos" && <ModoRetos uid={`${uid}-re`} />}
          </div>
        );
      })}
    </section>
  );
}
