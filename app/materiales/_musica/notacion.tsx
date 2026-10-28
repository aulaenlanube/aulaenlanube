import type { ReactNode } from "react";
import { GLIFOS, type NombreGlifo } from "./glifos";

// ════════════════════════════════════════════════════════════════════════════
// Dibujos de notación musical para los esquemas de Música.
//
// Todo son Componentes de Servidor con SVG estático. Los símbolos (clave,
// cabezas, corchetes, silencios, letras de matiz) son contornos de Bravura
// (`glifos.ts`); pentagramas, plicas, barras y reguladores se trazan aquí.
// La tinta es `currentColor` y los acentos, tokens `--dg-*`, así que el mismo
// dibujo sirve en tema claro, oscuro y al imprimir.
//
// Geometría SMuFL: en la fuente, 250 unidades = un espacio de pentagrama, así
// que la escala de un glifo es `sp / 250`. El origen de cada glifo cae sobre la
// línea que le corresponde: la clave de sol, en la 2.ª línea; las cabezas, en
// el centro de su nota; la redonda (silencio), colgada de la 4.ª línea; la
// blanca (silencio), apoyada en la 3.ª; el resto de silencios, centrados en ella.
// ════════════════════════════════════════════════════════════════════════════

function Glifo({ n, x, y, sp }: { n: NombreGlifo; x: number; y: number; sp: number }) {
  return <path d={GLIFOS[n].d} transform={`translate(${x} ${y}) scale(${sp / 250})`} />;
}

/** Cinco líneas desde `y0` (línea superior) con separación `sp`. */
function Pauta({ x1, x2, y0, sp, color = "currentColor" }: { x1: number; x2: number; y0: number; sp: number; color?: string }) {
  const grosor = Math.max(1, sp * 0.1);
  return (
    <g stroke={color} strokeWidth={grosor}>
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={x1} x2={x2} y1={y0 + i * sp} y2={y0 + i * sp} />
      ))}
    </g>
  );
}

/** Doble barra final (fina + gruesa) acabando en `x`. */
function BarraFinal({ x, y0, sp }: { x: number; y0: number; sp: number }) {
  const gruesa = sp * 0.5;
  return (
    <g>
      <rect x={x - gruesa - sp * 0.4 - sp * 0.16} y={y0} width={sp * 0.16} height={sp * 4} />
      <rect x={x - gruesa} y={y0} width={gruesa} height={sp * 4} />
    </g>
  );
}

/** SVG pintado 1:1 (el contenedor desliza en móvil en vez de encoger el texto). */
function Lienzo({ w, h, etiqueta, children }: { w: number; h: number; etiqueta: string; children: ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      role="img"
      aria-label={etiqueta}
      className="mx-auto block max-w-none text-zinc-900 dark:text-zinc-100"
      fill="currentColor"
      fontFamily="inherit"
    >
      {children}
    </svg>
  );
}

// ── Ondas: so (regular) y soroll (irregular) ─────────────────────────────────

function onda(x0: number, ancho: number, f: (t: number) => number): string {
  const pts: string[] = [];
  for (let t = 0; t <= ancho; t += 2) pts.push(`${x0 + t},${(60 - f(t)).toFixed(1)}`);
  return "M" + pts.join(" L");
}
const ONDA_SO = onda(20, 260, (t) => 34 * Math.sin((2 * Math.PI * t) / 52));
const ONDA_SOROLL = onda(320, 260, (t) =>
  18 * Math.sin((2 * Math.PI * t) / 37) + 13 * Math.sin((2 * Math.PI * t) / 17 + 1) + 8 * Math.sin((2 * Math.PI * t) / 7.3 + 2),
);

export function OnesSoSoroll() {
  return (
    <Lienzo w={600} h={152} etiqueta="A l'esquerra, l'ona d'un so: ordenada i regular. A la dreta, l'ona d'un soroll: desordenada i irregular.">
      <g stroke="var(--dg-gris-borde)" strokeWidth={1} strokeDasharray="4 4">
        <line x1={14} x2={286} y1={60} y2={60} />
        <line x1={314} x2={586} y1={60} y2={60} />
      </g>
      <path d={ONDA_SO} fill="none" stroke="var(--dg-azul-linea)" strokeWidth={3} strokeLinejoin="round" />
      <path d={ONDA_SOROLL} fill="none" stroke="var(--dg-rosa-linea)" strokeWidth={3} strokeLinejoin="round" />
      <g textAnchor="middle" fontSize={17} fontWeight={700}>
        <text x={150} y={122} fill="var(--dg-azul-fuerte)">So</text>
        <text x={450} y={122} fill="var(--dg-rosa-fuerte)">Soroll</text>
      </g>
      <g textAnchor="middle" fontSize={16} fill="var(--dg-suave)">
        <text x={150} y={144}>ona ordenada i regular</text>
        <text x={450} y={144}>ona desordenada i irregular</text>
      </g>
    </Lienzo>
  );
}

// ── Pentagrama: línies, espais i clau de sol ────────────────────────────────

export function PentagramaParts() {
  const sp = 20;
  const y0 = 40;
  return (
    <Lienzo w={470} h={160} etiqueta="Pentagrama de cinc línies i quatre espais, numerats de baix a dalt, amb la clau de sol a la segona línia i la nota sol sobre la mateixa línia.">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={8} y={y0 + i * sp} width={292} height={sp} fill="var(--dg-ambar-suave)" />
      ))}
      <Pauta x1={8} x2={300} y0={y0} sp={sp} color="var(--dg-azul-linea)" />
      <Glifo n="gClef" x={16} y={y0 + 3 * sp} sp={sp} />
      <Glifo n="noteheadWhole" x={150} y={y0 + 3 * sp} sp={sp} />
      <text x={167} y={150} textAnchor="middle" fontSize={16} fontWeight={700}>sol</text>
      <BarraFinal x={300} y0={y0} sp={sp} />
      <g fontSize={16} fontWeight={600}>
        {[1, 2, 3, 4, 5].map((n) => (
          <text key={n} x={318} y={y0 + (5 - n) * sp + 5.5} fill="var(--dg-azul-fuerte)">línia {n}</text>
        ))}
        {[1, 2, 3, 4].map((n) => (
          <text key={n} x={398} y={y0 + (4 - n) * sp + sp / 2 + 5.5} fill="var(--dg-ambar-fuerte)">espai {n}</text>
        ))}
      </g>
    </Lienzo>
  );
}

// ── Escala de do a do en clau de sol ────────────────────────────────────────

const NOTES = ["do", "re", "mi", "fa", "sol", "la", "si", "do"];

export function EscalaDo() {
  const sp = 14;
  const y0 = 34;
  const amplada = (GLIFOS.noteheadWhole.w * sp) / 250;
  return (
    <Lienzo w={592} h={150} etiqueta="Les notes musicals en clau de sol, de més greu a més aguda: do, re, mi, fa, sol, la, si i do.">
      <Pauta x1={6} x2={582} y0={y0} sp={sp} />
      <Glifo n="gClef" x={10} y={y0 + 3 * sp} sp={sp} />
      {NOTES.map((nom, i) => {
        const x = 76 + i * 64;
        const y = y0 + 5 * sp - (i * sp) / 2;
        return (
          <g key={i}>
            {i === 0 && (
              <line x1={x - sp * 0.4} x2={x + amplada + sp * 0.4} y1={y} y2={y} stroke="currentColor" strokeWidth={sp * 0.1} />
            )}
            <Glifo n="noteheadWhole" x={x} y={y} sp={sp} />
            <text x={x + amplada / 2} y={138} textAnchor="middle" fontSize={16} fontWeight={600}>{nom}</text>
          </g>
        );
      })}
      <BarraFinal x={582} y0={y0} sp={sp} />
    </Lienzo>
  );
}

// ── Figures i silencis ──────────────────────────────────────────────────────

export type Figura = "redona" | "blanca" | "negra" | "corxera" | "semicorxera";

const CAPS: Record<Figura, { cap: NombreGlifo; pal?: number; bandera?: NombreGlifo; silenci: NombreGlifo; linia: number }> = {
  redona: { cap: "noteheadWhole", silenci: "restWhole", linia: 1 },
  blanca: { cap: "noteheadHalf", pal: 3.5, silenci: "restHalf", linia: 2 },
  negra: { cap: "noteheadBlack", pal: 3.5, silenci: "restQuarter", linia: 2 },
  corxera: { cap: "noteheadBlack", pal: 3.5, bandera: "flag8thUp", silenci: "rest8th", linia: 2 },
  semicorxera: { cap: "noteheadBlack", pal: 4, bandera: "flag16thUp", silenci: "rest16th", linia: 2 },
};

/** Una figura (en la 2.ª línia, plica amunt) i el seu silenci, sobre un pentagrama curt. */
export function FiguraISilenci({ f }: { f: Figura }) {
  const sp = 12;
  const y0 = 36;
  const c = CAPS[f];
  const xNota = 28;
  const yNota = y0 + 3 * sp;
  const dreta = xNota + (GLIFOS[c.cap].w * sp) / 250;
  const gruix = sp * 0.12;
  const dalt = c.pal ? yNota - c.pal * sp : 0;
  const xSilenci = 92;
  return (
    <Lienzo w={140} h={100} etiqueta={`Figura ${f} i el seu silenci`}>
      <Pauta x1={6} x2={134} y0={y0} sp={sp} />
      <Glifo n={c.cap} x={xNota} y={yNota} sp={sp} />
      {c.pal && <rect x={dreta - gruix} y={dalt} width={gruix} height={yNota - 0.168 * sp - dalt} />}
      {c.bandera && <Glifo n={c.bandera} x={dreta - gruix} y={dalt} sp={sp} />}
      <Glifo n={c.silenci} x={xSilenci} y={y0 + c.linia * sp} sp={sp} />
    </Lienzo>
  );
}

// ── Barres de repetició ─────────────────────────────────────────────────────

const SP_REP = 10;
const Y0_REP = 40;

function RepeticioFinal({ x }: { x: number }) {
  // Punts · fina · gruesa, acabant en x.
  return (
    <g>
      <circle cx={x - 16} cy={Y0_REP + 1.5 * SP_REP} r={2.4} />
      <circle cx={x - 16} cy={Y0_REP + 2.5 * SP_REP} r={2.4} />
      <rect x={x - 11} y={Y0_REP} width={1.6} height={4 * SP_REP} />
      <rect x={x - 5} y={Y0_REP} width={5} height={4 * SP_REP} />
    </g>
  );
}

function RepeticioInici({ x }: { x: number }) {
  // Gruesa · fina · punts, començant en x.
  return (
    <g>
      <rect x={x} y={Y0_REP} width={5} height={4 * SP_REP} />
      <rect x={x + 9.4} y={Y0_REP} width={1.6} height={4 * SP_REP} />
      <circle cx={x + 16} cy={Y0_REP + 1.5 * SP_REP} r={2.4} />
      <circle cx={x + 16} cy={Y0_REP + 2.5 * SP_REP} r={2.4} />
    </g>
  );
}

function Negra({ x, pas }: { x: number; pas: number }) {
  // `pas`: mitjos espais per damunt de la línia inferior.
  const y = Y0_REP + 4 * SP_REP - (pas * SP_REP) / 2;
  const dreta = x + (GLIFOS.noteheadBlack.w * SP_REP) / 250;
  return (
    <g>
      <Glifo n="noteheadBlack" x={x} y={y} sp={SP_REP} />
      <rect x={dreta - 1.2} y={y - 3.5 * SP_REP} width={1.2} height={3.5 * SP_REP - 1.7} />
    </g>
  );
}

/** Fletxa discontínua de tornada: de la barra final fins a `xDesti`, amb la punta cap avall. */
function Tornada({ xDesti }: { xDesti: number }) {
  return (
    <g>
      <path
        d={`M 214 34 C 214 8, ${xDesti} 8, ${xDesti} 29`}
        fill="none"
        stroke="var(--dg-morado-linea)"
        strokeWidth={2}
        strokeDasharray="5 4"
      />
      <path d={`M ${xDesti - 5} 28 L ${xDesti + 5} 28 L ${xDesti} 37 Z`} fill="var(--dg-morado-linea)" />
    </g>
  );
}

export function RepetirDesDelPrincipi() {
  return (
    <Lienzo w={240} h={92} etiqueta="Barra de repetició al final: cal tornar a tocar el fragment des del principi.">
      <Pauta x1={10} x2={222} y0={Y0_REP} sp={SP_REP} />
      <Negra x={50} pas={2} />
      <Negra x={95} pas={4} />
      <Negra x={140} pas={3} />
      <RepeticioFinal x={222} />
      <Tornada xDesti={20} />
    </Lienzo>
  );
}

export function RepetirEntreBarres() {
  return (
    <Lienzo w={240} h={92} etiqueta="Dues barres de repetició: cal repetir el fragment comprés entre les dues barres.">
      <Pauta x1={10} x2={222} y0={Y0_REP} sp={SP_REP} />
      <Negra x={26} pas={1} />
      <RepeticioInici x={60} />
      <Negra x={100} pas={2} />
      <Negra x={140} pas={4} />
      <Negra x={178} pas={3} />
      <RepeticioFinal x={222} />
      <Tornada xDesti={70} />
    </Lienzo>
  );
}

// ── Matisos d'intensitat ────────────────────────────────────────────────────

const LLETRA: Record<string, NombreGlifo> = { p: "dynamicPiano", m: "dynamicMezzo", f: "dynamicForte" };

/** Escriu un matís (pp, mf…) amb les lletres de Bravura, centrat en `cx`. */
function Matis({ text, cx, y, sp }: { text: string; cx: number; y: number; sp: number }) {
  const lletres = [...text].map((l) => LLETRA[l]);
  const amples = lletres.map((n) => (GLIFOS[n].w * sp) / 250);
  const inici = cx - amples.reduce((a, b) => a + b, 0) / 2;
  return (
    <g>
      {lletres.map((n, i) => (
        <Glifo key={i} n={n} x={inici + amples.slice(0, i).reduce((a, b) => a + b, 0)} y={y} sp={sp} />
      ))}
    </g>
  );
}

export const MATISOS = [
  { m: "pp", nom: "pianissimo", sentit: "molt suau" },
  { m: "p", nom: "piano", sentit: "suau" },
  { m: "mp", nom: "mezzopiano", sentit: "mig suau" },
  { m: "mf", nom: "mezzoforte", sentit: "mig fort" },
  { m: "f", nom: "forte", sentit: "fort" },
  { m: "ff", nom: "fortissimo", sentit: "molt fort" },
];
const ALTURES = [18, 32, 46, 60, 76, 92];

export function EsquemaVolum() {
  return (
    <Lienzo
      w={600}
      h={352}
      etiqueta="Matisos d'intensitat de més suau a més fort: pianissimo, piano, mezzopiano, mezzoforte, forte i fortissimo. El crescendo va de suau a fort i el diminuendo, de fort a suau."
    >
      {MATISOS.map((x, i) => {
        const cx = 50 + i * 100;
        return (
          <g key={x.m}>
            <rect
              x={cx - 22}
              y={120 - ALTURES[i]}
              width={44}
              height={ALTURES[i]}
              rx={4}
              fill="var(--dg-morado-linea)"
              fillOpacity={0.3 + i * 0.14}
            />
            <Matis text={x.m} cx={cx} y={170} sp={20} />
            <text x={cx} y={205} textAnchor="middle" fontSize={16} fontStyle="italic" fill="var(--dg-suave)">{x.nom}</text>
          </g>
        );
      })}
      <g fill="none" strokeWidth={2.5} strokeLinecap="round">
        <path d="M 560 228 L 40 240 L 560 252" stroke="var(--dg-verde-linea)" />
        <path d="M 40 293 L 560 305 L 40 317" stroke="var(--dg-rosa-linea)" />
      </g>
      <g textAnchor="middle" fontSize={16} fontWeight={600}>
        <text x={300} y={276} fill="var(--dg-verde-fuerte)">crescendo (cresc.): de suau a fort →</text>
        <text x={300} y={342} fill="var(--dg-rosa-fuerte)">← diminuendo (dim.): de fort a suau</text>
      </g>
    </Lienzo>
  );
}

/** Regulador xicotet per a la llegenda: «<» crescendo o «>» diminuendo. */
export function Regulador({ tipus }: { tipus: "cresc" | "dim" }) {
  const d = tipus === "cresc" ? "M 70 4 L 4 13 L 70 22" : "M 4 4 L 70 13 L 4 22";
  return (
    <svg viewBox="0 0 74 26" width={74} height={26} aria-hidden className="inline-block flex-none">
      <path d={d} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
