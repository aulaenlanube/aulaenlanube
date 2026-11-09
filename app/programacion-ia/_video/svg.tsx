import type { CSSProperties, ReactNode } from "react";

// ════════════════════════════════════════════════════════════════════════════
// Primitivas de los diagramas para vídeo. Mismo lenguaje que bucle.tsx y que
// app/ponencia-tecnologia/_svg/base.tsx, pero SIN interacción: lo que cuenta
// cada pieza está escrito en ella.
//
//  · Colores: tokens --dg-* (app/globals.css), así el dibujo vale para los dos
//    temas sin JavaScript.
//  · Texto: 16 como mínimo; el <svg> se pinta 1:1 (maxWidth = minWidth = ancho
//    del viewBox) dentro de un overflow-x-auto, así que 16 son 16 px siempre.
//  · Flechas: <marker> por tono en userSpaceOnUse con refX = 10, la punta cae
//    justo al final del trazo; todo trazo que apunta a una caja acaba a 6 de su
//    borde. Los ids llevan el prefijo `uid` de cada figura (uno por figura).
//  · Cada caja es un <g data-caja>: tools/video/revisar-pagina.mjs comprueba
//    que sus textos no se salen del rectángulo ni se pisan entre sí.
//  · Medidas de texto para colocar (estimadas, con margen): sans 16 ≈ 9,5 px por
//    carácter, negrita 18 ≈ 11,5, monoespaciada 16 ≈ 9,9.
//
// Animación (opcional, desde las sesiones 3 y 4 de la CLI): una <Figura
// animada> se anima la primera vez que entra en pantalla y cada pieza dice
// CUÁNDO entra con `an` (segundos desde que la figura se ve). Sin `an`, la
// pieza está quieta. El estado final es siempre el dibujo completo: es lo que
// sale en la captura quieta, al imprimir y con «reducir movimiento». Las reglas
// están en app/globals.css y el motor en Animaciones.tsx.
// ════════════════════════════════════════════════════════════════════════════

export type TonoSvg = "azul" | "morado" | "verde" | "ambar" | "rosa" | "gris";

const TONOS: TonoSvg[] = ["azul", "morado", "verde", "ambar", "rosa", "gris"];

export const linea = (t: TonoSvg) => `var(--dg-${t}-linea)`;
export const fuerte = (t: TonoSvg) => `var(--dg-${t}-fuerte)`;
export const suave = (t: TonoSvg) => `var(--dg-${t}-suave)`;
export const SUAVE = "var(--dg-suave)";
export const TINTA = "var(--dg-tinta)";

/** Cómo entra una pieza (ver los @keyframes an-* de globals.css). */
export type TipoAn = "aparece" | "surge" | "funde" | "desliza" | "traza" | "teclea" | "barra" | "pulso" | "latido";

/**
 * Atributos de animación de una pieza: qué hace y cuándo (segundos). Sin `d`
 * no devuelve nada y la pieza se queda quieta. `pasos` es para «teclea»: un
 * paso por carácter.
 */
export function an(tipo: TipoAn, d?: number, dur?: number, pasos?: number): { "data-a"?: TipoAn; style?: CSSProperties } {
  if (d === undefined) return {};
  const style: Record<string, string> = { "--an-d": `${Math.round(d * 100) / 100}s` };
  if (dur !== undefined) style["--an-dur"] = `${dur}s`;
  if (pasos !== undefined) style["--an-pasos"] = String(pasos);
  return { "data-a": tipo, style: style as CSSProperties };
}

/** El botón de la web para volver a ver la animación (en vídeo no sale). */
export function BotonRepetir() {
  return (
    <button
      type="button"
      data-anim-repetir=""
      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3 py-1 text-base font-semibold text-zinc-700 transition hover:border-blue-400 hover:text-blue-700 dark:border-white/15 dark:bg-slate-800 dark:text-zinc-200 dark:hover:border-blue-400/60 dark:hover:text-blue-300"
    >
      <span aria-hidden>↻</span> Repetir animación
    </button>
  );
}

/** Marco común: la figura, el <svg> a escala 1:1 y el pie. Con `animada`, se anima al entrar en pantalla. */
export function Figura({
  uid,
  ancho,
  alto,
  etiqueta,
  pie,
  animada = false,
  children,
}: {
  uid: string;
  ancho: number;
  alto: number;
  etiqueta: string;
  pie?: ReactNode;
  animada?: boolean;
  children: ReactNode;
}) {
  return (
    <figure
      className="rounded-2xl border border-zinc-200 p-4 dark:border-white/10"
      style={{ background: "var(--dg-fondo)" }}
      {...(animada ? { "data-anim": "" } : {})}
    >
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${ancho} ${alto}`}
          role="img"
          aria-label={etiqueta}
          className="mx-auto block"
          style={{ maxWidth: ancho, minWidth: ancho }}
        >
          <defs>
            {TONOS.map((t) => (
              <marker
                key={t}
                id={`${uid}-${t}`}
                viewBox="0 0 10 8"
                refX={10}
                refY={4}
                markerWidth={10}
                markerHeight={8}
                markerUnits="userSpaceOnUse"
                orient="auto"
              >
                <path d="M0 0 L10 4 L0 8 Z" fill={linea(t)} />
              </marker>
            ))}
          </defs>
          {children}
        </svg>
      </div>
      <p className="mt-1 text-center text-base text-zinc-500 dark:text-zinc-400 lg:hidden">Desliza el diagrama de lado para verlo entero</p>
      {pie ? <figcaption className="mt-3 text-center text-lg text-zinc-700 dark:text-zinc-300">{pie}</figcaption> : null}
      {animada ? (
        <div className="mt-2 flex justify-end">
          <BotonRepetir />
        </div>
      ) : null}
    </figure>
  );
}

/**
 * Trazo con punta (o sin ella). Con `an`, se dibuja de principio a fin en
 * `dur` segundos y la punta aparece al llegar; con `pulso`, después un
 * destello recorre la flecha en bucle (el dato que viaja). Una flecha
 * discontinua no se dibuja: se funde.
 */
export function Flecha({
  uid,
  d,
  tono = "gris",
  discontinua = false,
  punta = true,
  grosor = 2.5,
  an: cuando,
  dur = 0.6,
  pulso,
}: {
  uid: string;
  d: string;
  tono?: TonoSvg;
  discontinua?: boolean;
  punta?: boolean;
  grosor?: number;
  an?: number;
  dur?: number;
  /** true, o la duración de cada vuelta del destello en segundos. */
  pulso?: boolean | number;
}) {
  if (cuando === undefined) {
    return (
      <path
        d={d}
        fill="none"
        stroke={linea(tono)}
        strokeWidth={grosor}
        strokeDasharray={discontinua ? "7 5" : undefined}
        markerEnd={punta ? `url(#${uid}-${tono})` : undefined}
      />
    );
  }
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={linea(tono)}
        strokeWidth={grosor}
        strokeDasharray={discontinua ? "7 5" : undefined}
        pathLength={discontinua ? undefined : 1}
        {...an(discontinua ? "funde" : "traza", cuando, dur)}
      />
      {punta ? <path d={d} fill="none" stroke="none" markerEnd={`url(#${uid}-${tono})`} {...an("funde", cuando + dur * 0.85, 0.2)} /> : null}
      {pulso ? (
        <path
          d={d}
          fill="none"
          stroke={fuerte(tono)}
          strokeWidth={grosor + 3.5}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="0.12 2"
          {...an("pulso", cuando + dur + 0.2, typeof pulso === "number" ? pulso : 2.4)}
        />
      ) : null}
    </g>
  );
}

/** Texto suelto. Con `an`, se funde (o se teclea, con `tipo="teclea"`). */
export function T({
  x,
  y,
  children,
  color = SUAVE,
  peso = 500,
  tam = 16,
  ancla = "start",
  mono = false,
  an: cuando,
  tipo = "funde",
  dur,
}: {
  x: number;
  y: number;
  children: ReactNode;
  color?: string;
  peso?: number;
  tam?: number;
  ancla?: "start" | "middle" | "end";
  mono?: boolean;
  an?: number;
  tipo?: TipoAn;
  dur?: number;
}) {
  const pasos = tipo === "teclea" && typeof children === "string" ? children.length : undefined;
  return (
    <text
      x={x}
      y={y}
      fontSize={tam}
      fontWeight={peso}
      fill={color}
      textAnchor={ancla}
      className={mono ? "font-mono" : undefined}
      {...an(tipo, cuando, dur ?? (pasos ? Math.min(1.6, 0.04 * pasos + 0.2) : undefined), pasos)}
    >
      {children}
    </text>
  );
}

/**
 * Caja con una línea de título (18, negrita, color del tono) y líneas de 16
 * debajo, cada una su propio <text>. Interlineado 24; el título va a 30 del
 * borde superior. Alto recomendado: 76 con una línea de cuerpo, 100 con dos.
 * Con `an`, aparece (sube y se funde) en ese segundo.
 */
export function Caja({
  x,
  y,
  w,
  h,
  tono,
  titulo,
  lineas = [],
  izquierda = false,
  discontinua = false,
  relleno = "var(--dg-papel)",
  mono = false,
  grosor = 2,
  an: cuando,
  tipo = "aparece",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tono: TonoSvg;
  titulo: string;
  lineas?: string[];
  izquierda?: boolean;
  discontinua?: boolean;
  relleno?: string;
  mono?: boolean;
  grosor?: number;
  an?: number;
  tipo?: TipoAn;
}) {
  const tx = izquierda ? x + 16 : x + w / 2;
  const ancla = izquierda ? "start" : "middle";
  return (
    <g data-caja="" {...an(tipo, cuando)}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        fill={relleno}
        stroke={linea(tono)}
        strokeWidth={grosor}
        strokeDasharray={discontinua ? "7 5" : undefined}
      />
      <text x={tx} y={y + 30} textAnchor={ancla} fontSize={18} fontWeight={800} fill={fuerte(tono)} className={mono ? "font-mono" : undefined}>
        {titulo}
      </text>
      {lineas.map((l, i) => (
        <text key={l} x={tx} y={y + 54 + i * 24} textAnchor={ancla} fontSize={16} fontWeight={500} fill={SUAVE}>
          {l}
        </text>
      ))}
    </g>
  );
}

/** Zona: marco discontinuo con su rótulo arriba a la izquierda (no es una caja). Con `an`, se funde. */
export function Zona({
  x,
  y,
  w,
  h,
  tono,
  rotulo,
  an: cuando,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tono: TonoSvg;
  rotulo: string;
  an?: number;
}) {
  return (
    <g {...an("funde", cuando, 0.5)}>
      <rect x={x} y={y} width={w} height={h} rx={16} fill={suave(tono)} stroke={linea(tono)} strokeWidth={2} strokeDasharray="8 6" />
      <text x={x + 18} y={y + 28} fontSize={16} fontWeight={800} fill={fuerte(tono)}>
        {rotulo}
      </text>
    </g>
  );
}

/**
 * Halo que late alrededor de una caja: «mira aquí». Solo existe mientras la
 * figura se anima; en una foto fija no se ve (ni tapa nada).
 */
export function Halo({ x, y, w, h, tono, an: cuando = 0, rx = 16 }: { x: number; y: number; w: number; h: number; tono: TonoSvg; an?: number; rx?: number }) {
  return (
    <rect
      x={x - 7}
      y={y - 7}
      width={w + 14}
      height={h + 14}
      rx={rx}
      fill="none"
      stroke={linea(tono)}
      strokeWidth={3}
      {...an("latido", cuando, 2.2)}
    />
  );
}

/** Barra horizontal que crece desde la izquierda (para cifras: tokens, pesos, segundos). */
export function Barra({
  x,
  y,
  w,
  h = 20,
  tono,
  an: cuando,
  dur = 0.9,
  hueca = false,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  tono: TonoSvg;
  an?: number;
  dur?: number;
  hueca?: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={Math.min(6, h / 2)}
      fill={hueca ? suave(tono) : linea(tono)}
      stroke={hueca ? linea(tono) : "none"}
      {...an("barra", cuando, dur)}
    />
  );
}

/** Disco numerado (pintar DESPUÉS de su caja: en SVG manda el orden). */
export function Disco({ cx, cy, n, tono, an: cuando, r = 15 }: { cx: number; cy: number; n: number | string; tono: TonoSvg; an?: number; r?: number }) {
  return (
    <g {...an("surge", cuando, 0.5)}>
      <circle cx={cx} cy={cy} r={r + 3} fill="var(--dg-fondo)" />
      <circle cx={cx} cy={cy} r={r} fill={linea(tono)} />
      <text x={cx} y={cy + 6} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--dg-sobre-tono)">
        {n}
      </text>
    </g>
  );
}
