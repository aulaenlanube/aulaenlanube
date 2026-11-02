import type { ReactNode } from "react";

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
// ════════════════════════════════════════════════════════════════════════════

export type TonoSvg = "azul" | "morado" | "verde" | "ambar" | "rosa" | "gris";

const TONOS: TonoSvg[] = ["azul", "morado", "verde", "ambar", "rosa", "gris"];

export const linea = (t: TonoSvg) => `var(--dg-${t}-linea)`;
export const fuerte = (t: TonoSvg) => `var(--dg-${t}-fuerte)`;
export const suave = (t: TonoSvg) => `var(--dg-${t}-suave)`;
export const SUAVE = "var(--dg-suave)";
export const TINTA = "var(--dg-tinta)";

/** Marco común: la figura, el <svg> a escala 1:1 y el pie. */
export function Figura({
  uid,
  ancho,
  alto,
  etiqueta,
  pie,
  children,
}: {
  uid: string;
  ancho: number;
  alto: number;
  etiqueta: string;
  pie?: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className="rounded-2xl border border-zinc-200 p-4 dark:border-white/10" style={{ background: "var(--dg-fondo)" }}>
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
    </figure>
  );
}

/** Trazo con punta (o sin ella). */
export function Flecha({
  uid,
  d,
  tono = "gris",
  discontinua = false,
  punta = true,
  grosor = 2.5,
}: {
  uid: string;
  d: string;
  tono?: TonoSvg;
  discontinua?: boolean;
  punta?: boolean;
  grosor?: number;
}) {
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

/** Texto suelto. */
export function T({
  x,
  y,
  children,
  color = SUAVE,
  peso = 500,
  tam = 16,
  ancla = "start",
  mono = false,
}: {
  x: number;
  y: number;
  children: ReactNode;
  color?: string;
  peso?: number;
  tam?: number;
  ancla?: "start" | "middle" | "end";
  mono?: boolean;
}) {
  return (
    <text x={x} y={y} fontSize={tam} fontWeight={peso} fill={color} textAnchor={ancla} className={mono ? "font-mono" : undefined}>
      {children}
    </text>
  );
}

/**
 * Caja con una línea de título (18, negrita, color del tono) y líneas de 16
 * debajo, cada una su propio <text>. Interlineado 24; el título va a 30 del
 * borde superior. Alto recomendado: 76 con una línea de cuerpo, 100 con dos.
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
}) {
  const tx = izquierda ? x + 16 : x + w / 2;
  const ancla = izquierda ? "start" : "middle";
  return (
    <g data-caja="">
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

/** Zona: marco discontinuo con su rótulo arriba a la izquierda (no es una caja). */
export function Zona({
  x,
  y,
  w,
  h,
  tono,
  rotulo,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tono: TonoSvg;
  rotulo: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={16} fill={suave(tono)} stroke={linea(tono)} strokeWidth={2} strokeDasharray="8 6" />
      <text x={x + 18} y={y + 28} fontSize={16} fontWeight={800} fill={fuerte(tono)}>
        {rotulo}
      </text>
    </g>
  );
}
