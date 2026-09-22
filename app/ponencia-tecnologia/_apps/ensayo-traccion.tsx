"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";

/* ══════════════════════════════════════════════════════════════════════════
   BANCO DE ENSAYO DE TRACCIÓN
   Laboratorio virtual de una sola pantalla para 1.º de Bachillerato
   (Tecnología e Ingeniería I — materiales y resistencia).

   ── FÍSICA (las unidades cuadran; comprobado a mano) ──────────────────────
   A [mm²] = π·d²/4        σ [MPa] = F [N] / A [mm²]       1 kN = 1000 N
   E [MPa] = E [GPa]·1000  ε = ΔL/L₀ (adimensional, se muestra en %)
   Caso de control: acero S275, d = 10 mm → A = 78,54 mm²; F = 20 kN →
   σ = 254,6 MPa (elástico, n = 1,08); ε = σ/E = 0,121 %; con L₀ = 100 mm,
   ΔL = 0,121 mm.

   ── MODELO DE LA CURVA ────────────────────────────────────────────────────
   · Tramo elástico  0 ≤ ε ≤ εe:  σ = E·ε        (ley de Hooke, recta)
   · Tramo plástico  εe ≤ ε ≤ εu: σ = σe + (σr−σe)·[1−(1−t)²],
     con t = (ε−εe)/(εu−εe). Sube con pendiente decreciente y llega a σr con
     tangente horizontal: la carga máxima es un máximo de verdad.
   · Estricción      εu ≤ ε ≤ εr: σ = σr − (σr−σf)·t^1,6, t = (ε−εu)/(εr−εu).
   · Descarga/recarga: recta de pendiente E que sale del punto alcanzado y
     corta el eje en εp = ε − σ/E (la deformación remanente).
   · Frágil (fundición gris): no hay tramo plástico; rompe sobre la propia
     recta de Hooke al alcanzar σr.

   ── CONTROL DEL ENSAYO ────────────────────────────────────────────────────
   Hasta la carga máxima manda la FUERZA (el deslizador): σ = F/A y ε sale de
   invertir la curva. Pasada la carga máxima ya no se puede mandar con la
   fuerza — la probeta se estrangula y la carga cae sola —, así que la app
   pasa a control por desplazamiento, igual que una máquina real.

   ── GEOMETRÍA SVG ─────────────────────────────────────────────────────────
   Todo calculado a partir de las constantes MQ (máquina), GR (gráfica) y CP
   (comparador). Ningún texto por debajo de 13 px efectivos. Los ids internos
   (gradientes, marcadores, clips) se prefijan con useId() saneado.
   ══════════════════════════════════════════════════════════════════════════ */

/* ─── Formato español ──────────────────────────────────────────────────── */

function num(valor: number, dec: number): string {
  const v = Number.isFinite(valor) ? valor : 0;
  const limpio = Math.abs(v) < 0.5 * Math.pow(10, -dec) ? 0 : v;
  return limpio.toLocaleString("es-ES", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });
}

/** Redondeo corto para no inflar las cadenas de los atributos «d» del SVG. */
const r2 = (v: number): number => Math.round(v * 100) / 100;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/* ─── Materiales ───────────────────────────────────────────────────────── */

type Material = {
  id: string;
  nombre: string;
  corto: string;
  color: string;
  /** Módulo de Young en GPa (como viene en las tablas). */
  eGPa: number;
  /** Límite elástico en MPa. En los frágiles se iguala a σr. */
  se: number;
  /** Resistencia a tracción en MPa. */
  sr: number;
  /** Alargamiento de rotura de tabla, en %. */
  aTabla: number;
  /** Deformación bajo carga máxima (alargamiento uniforme), en tanto por uno. */
  epsU: number;
  /** Deformación de rotura del modelo, en tanto por uno. */
  epsR: number;
  /** σ en la rotura como fracción de σr (la curva baja un poco tras el máximo). */
  caida: number;
  fragil: boolean;
  uso: string;
  nota?: string;
};

const MATERIALES: Material[] = [
  {
    id: "acero",
    nombre: "Acero S275 (estructural)",
    corto: "Acero S275",
    color: "#60a5fa",
    eGPa: 210,
    se: 275,
    sr: 430,
    aTabla: 23,
    epsU: 0.15,
    epsR: 0.23,
    caida: 0.78,
    fragil: false,
    uso: "Vigas, pilares, tirantes, estructuras de nave.",
  },
  {
    id: "aluminio",
    nombre: "Aluminio 6061-T6",
    corto: "Aluminio 6061",
    color: "#34d399",
    eGPa: 69,
    se: 275,
    sr: 310,
    aTabla: 12,
    epsU: 0.08,
    epsR: 0.12,
    caida: 0.85,
    fragil: false,
    uso: "Perfilería, bicicletas, drones, carcasas ligeras.",
  },
  {
    id: "cobre",
    nombre: "Cobre recocido",
    corto: "Cobre recocido",
    color: "#fb923c",
    eGPa: 117,
    se: 70,
    sr: 220,
    aTabla: 45,
    epsU: 0.3,
    epsR: 0.45,
    caida: 0.8,
    fragil: false,
    uso: "Conductores, tubería de fontanería, embutición.",
  },
  {
    id: "fundicion",
    nombre: "Fundición gris EN-GJL-250",
    corto: "Fundición gris",
    color: "#f472b6",
    eGPa: 110,
    se: 250,
    sr: 250,
    aTabla: 0.6,
    epsU: 0,
    epsR: 0,
    caida: 1,
    fragil: true,
    uso: "Bancadas de máquina, bloques de motor, tapas de registro.",
    nota:
      "La fundición gris no tiene límite elástico convencional: rompe sin fluir, en plena recta de Hooke, al llegar a σr. Por eso aquí el coeficiente de seguridad se calcula contra σr, no contra σe. El 0,6 % de alargamiento de las tablas es el valor medido real: la fundición se curva ligeramente desde el origen y no cumple Hooke con exactitud. El modelo lineal de esta app rompe antes, en ε = σr/E ≈ 0,23 %. Lo que hay que quedarse: rompe sin avisar y sin deformarse.",
  },
  {
    id: "pla",
    nombre: "PLA impreso en 3D",
    corto: "PLA impreso",
    color: "#c084fc",
    eGPa: 3.5,
    se: 45,
    sr: 50,
    aTabla: 5,
    epsU: 0.032,
    epsR: 0.05,
    caida: 0.9,
    fragil: false,
    uso: "Prototipos, plantillas, piezas de taller sin carga crítica.",
    nota:
      "El PLA impreso es anisótropo: aguanta bastante menos si se tira en la dirección en que se apilan las capas. Los valores de aquí son los de la dirección buena.",
  },
];

/* ─── Modelo σ–ε ───────────────────────────────────────────────────────── */

const eMPa = (m: Material) => m.eGPa * 1000;
const epsElastico = (m: Material) => m.se / eMPa(m);
/** Deformación de rotura efectiva del modelo (los frágiles rompen en la recta). */
const epsRotura = (m: Material) => (m.fragil ? epsElastico(m) : m.epsR);
/** Deformación bajo carga máxima efectiva. */
const epsMaxCarga = (m: Material) => (m.fragil ? epsElastico(m) : m.epsU);
/** Tensión en el instante de la rotura. */
const sigmaRotura = (m: Material) => m.sr * m.caida;
/** Tensión de referencia del coeficiente de seguridad. */
const sigmaRef = (m: Material) => (m.fragil ? m.sr : m.se);

/** σ(ε) sobre la curva virgen: recta de Hooke, endurecimiento y estricción. */
function sigmaDeEps(m: Material, eps: number): number {
  const ee = epsElastico(m);
  if (eps <= ee || m.fragil) return eMPa(m) * Math.min(eps, ee);
  const eu = m.epsU;
  if (eps <= eu) {
    const t = (eps - ee) / (eu - ee);
    return m.se + (m.sr - m.se) * (1 - Math.pow(1 - t, 2));
  }
  const t = clamp((eps - eu) / (m.epsR - eu), 0, 1);
  return m.sr - (m.sr - sigmaRotura(m)) * Math.pow(t, 1.6);
}

/** ε(σ) sobre la RAMA ASCENDENTE de la curva virgen (inversa exacta). */
function epsDeSigma(m: Material, sigma: number): number {
  const ee = epsElastico(m);
  if (sigma <= m.se || m.fragil) return sigma / eMPa(m);
  const u = clamp((sigma - m.se) / (m.sr - m.se), 0, 1);
  const t = 1 - Math.sqrt(1 - u);
  return ee + (m.epsU - ee) * t;
}

const areaSeccion = (d: number) => (Math.PI * d * d) / 4;

/* ─── Estado del ensayo ────────────────────────────────────────────────── */

type Ensayo = {
  /** Fuerza aplicada, en kN. */
  f: number;
  /** ε del punto más avanzado recorrido en el camino (el extremo del trazo). */
  picoEps: number;
  /** σ en ese mismo punto. */
  picoSigma: number;
  /** Ya se alcanzó la carga máxima: la fuerza deja de mandar. */
  pasadoMax: boolean;
  roto: boolean;
};

const ENSAYO_CERO: Ensayo = {
  f: 0,
  picoEps: 0,
  picoSigma: 0,
  pasadoMax: false,
  roto: false,
};

type Fase =
  | "sin-carga"
  | "elastica"
  | "plastica"
  | "carga-max"
  | "estriccion"
  | "descarga"
  | "rotura";

/** Estado completo derivado del ensayo: es la única fuente de los números. */
type Lectura = {
  fase: Fase;
  /** Fuerza real que soporta la probeta en este instante, en kN. */
  f: number;
  sigma: number;
  eps: number;
  dL: number;
  /** Deformación remanente si se soltara ahora la fuerza (tanto por uno). */
  epsPerm: number;
  /** ¿Estamos sobre la recta de descarga en lugar de sobre la curva virgen? */
  descargando: boolean;
};

function leer(e: Ensayo, m: Material, area: number, l0: number): Lectura {
  const E = eMPa(m);
  if (e.roto) {
    const eps = epsRotura(m);
    const sigma = sigmaRotura(m);
    return {
      fase: "rotura",
      f: (sigma * area) / 1000,
      sigma,
      eps,
      dL: eps * l0,
      epsPerm: Math.max(0, eps - sigma / E),
      descargando: false,
    };
  }
  const epsPermPico = Math.max(0, e.picoEps - e.picoSigma / E);
  const sigma = (e.f * 1000) / area;
  const enVirgen = sigma >= e.picoSigma - 1e-9;
  const eps = enVirgen ? epsDeSigma(m, sigma) : epsPermPico + sigma / E;
  const epsPerm = Math.max(0, eps - sigma / E);

  let fase: Fase;
  if (e.f <= 0) fase = epsPerm > 1e-6 ? "descarga" : "sin-carga";
  else if (!enVirgen) fase = "descarga";
  else if (e.pasadoMax) fase = eps > epsMaxCarga(m) + 1e-9 ? "estriccion" : "carga-max";
  else if (sigma > m.se + 1e-9) fase = "plastica";
  else fase = "elastica";

  return { fase, f: e.f, sigma, eps, dL: eps * l0, epsPerm, descargando: !enVirgen };
}

const FASES: Record<Fase, { rotulo: string; pastilla: string; punto: string }> = {
  "sin-carga": { rotulo: "sin carga", pastilla: "bg-slate-700 text-slate-100", punto: "#94a3b8" },
  elastica: { rotulo: "zona elástica", pastilla: "bg-blue-600 text-white", punto: "#60a5fa" },
  plastica: { rotulo: "zona plástica", pastilla: "bg-amber-500 text-slate-900", punto: "#fbbf24" },
  "carga-max": { rotulo: "carga máxima", pastilla: "bg-orange-500 text-white", punto: "#fb923c" },
  estriccion: { rotulo: "estricción", pastilla: "bg-orange-600 text-white", punto: "#fb923c" },
  descarga: { rotulo: "descarga", pastilla: "bg-indigo-500 text-white", punto: "#a5b4fc" },
  rotura: { rotulo: "rotura", pastilla: "bg-rose-600 text-white", punto: "#fb7185" },
};

/* ─── Ejes automáticos ─────────────────────────────────────────────────── */

function ejeBonito(maximo: number): { max: number; paso: number } {
  const objetivo = Math.max(maximo, 1e-6) * 1.08;
  const bruto = objetivo / 6;
  const exp = Math.floor(Math.log10(bruto));
  const base = Math.pow(10, exp);
  let paso = base * 10;
  for (const mult of [1, 2, 2.5, 5, 10]) {
    if (base * mult >= bruto) {
      paso = base * mult;
      break;
    }
  }
  return { max: Math.ceil(objetivo / paso) * paso, paso };
}

function decimalesDe(paso: number): number {
  const s = String(paso);
  const i = s.indexOf(".");
  return i < 0 ? 0 : s.length - i - 1;
}

/* ─── Geometría de la máquina (unidades del viewBox) ───────────────────── */

const MQ = {
  W: 300,
  H: 452,
  travSupX: 22,
  travSupY: 14,
  travSupW: 256,
  travSupH: 24, // 14 → 38
  colX1: 30,
  colX2: 257,
  colW: 13,
  colY: 26,
  colH: 392, // 26 → 418
  mordX: 102,
  mordW: 96,
  mordH: 48, // mordaza fija: 38 → 86
  probTop: 86, // arriba de la probeta = abajo de la mordaza fija
  lpx0: 118, // longitud dibujada de L₀ (siempre la misma: L₀ real va en el rótulo)
  elastPx: 18, // píxeles que ocupa TODA la zona elástica
  plastPx: 104, // píxeles extra que ocupa TODA la zona plástica
  travMovX: 54,
  travMovW: 192,
  travMovH: 18,
  husX1: 86,
  husX2: 202,
  husW: 12,
  baseX: 22,
  baseY: 416,
  baseW: 256,
  baseH: 28, // 416 → 444 (8 de margen)
  cx: 150,
  cotaL: 74, // línea de cota de L₀ (izquierda)
  cotaD: 226, // línea de cota de ΔL (derecha)
  hueco: 16, // separación de las dos mitades tras la rotura
} as const;

/** ε → píxeles de alargamiento. Tramo elástico y tramo plástico con escalas
 *  distintas para que el elástico (décimas de %) llegue a verse. */
function alargamientoPx(m: Material, eps: number): number {
  const ee = epsElastico(m);
  const er = epsRotura(m);
  if (eps <= ee || er <= ee) return MQ.elastPx * clamp(eps / ee, 0, 1);
  return MQ.elastPx + MQ.plastPx * clamp((eps - ee) / (er - ee), 0, 1);
}

/** Radio dibujado de la probeta a partir del diámetro real en mm (4–20). */
const radioPx = (d: number) => 9 + ((clamp(d, 4, 20) - 4) / 16) * 13; // 9 → 22

function caminoProbeta(top: number, bottom: number, r: number, k: number): string {
  const cx = MQ.cx;
  if (k <= 0.005) {
    return `M ${r2(cx - r)} ${r2(top)} L ${r2(cx + r)} ${r2(top)} L ${r2(cx + r)} ${r2(bottom)} L ${r2(cx - r)} ${r2(bottom)} Z`;
  }
  const rn = r * (1 - 0.6 * k);
  const half = (bottom - top) / 2;
  const yc = (top + bottom) / 2;
  const hn = Math.min(half * 0.92, r * 3.4);
  const c = hn * 0.5;
  const yA = yc - hn;
  const yB = yc + hn;
  return [
    `M ${r2(cx - r)} ${r2(top)}`,
    `L ${r2(cx - r)} ${r2(yA)}`,
    `C ${r2(cx - r)} ${r2(yA + c)} ${r2(cx - rn)} ${r2(yc - c)} ${r2(cx - rn)} ${r2(yc)}`,
    `C ${r2(cx - rn)} ${r2(yc + c)} ${r2(cx - r)} ${r2(yB - c)} ${r2(cx - r)} ${r2(yB)}`,
    `L ${r2(cx - r)} ${r2(bottom)}`,
    `L ${r2(cx + r)} ${r2(bottom)}`,
    `L ${r2(cx + r)} ${r2(yB)}`,
    `C ${r2(cx + r)} ${r2(yB - c)} ${r2(cx + rn)} ${r2(yc + c)} ${r2(cx + rn)} ${r2(yc)}`,
    `C ${r2(cx + rn)} ${r2(yc - c)} ${r2(cx + r)} ${r2(yA + c)} ${r2(cx + r)} ${r2(yA)}`,
    `L ${r2(cx + r)} ${r2(top)}`,
    "Z",
  ].join(" ");
}

function mitadSuperior(top: number, yF: number, r: number, rn: number, cono: number): string {
  const cx = MQ.cx;
  const yA = Math.max(top, yF - rn * 3.4);
  const c = (yF - yA) * 0.5;
  return [
    `M ${r2(cx - r)} ${r2(top)}`,
    `L ${r2(cx - r)} ${r2(yA)}`,
    `C ${r2(cx - r)} ${r2(yA + c)} ${r2(cx - rn)} ${r2(yF - c)} ${r2(cx - rn)} ${r2(yF)}`,
    `L ${r2(cx)} ${r2(yF + cono)}`,
    `L ${r2(cx + rn)} ${r2(yF)}`,
    `C ${r2(cx + rn)} ${r2(yF - c)} ${r2(cx + r)} ${r2(yA + c)} ${r2(cx + r)} ${r2(yA)}`,
    `L ${r2(cx + r)} ${r2(top)}`,
    "Z",
  ].join(" ");
}

function mitadInferior(yG: number, bottom: number, r: number, rn: number, cono: number): string {
  const cx = MQ.cx;
  const yB = Math.min(bottom, yG + rn * 3.4);
  const c = (yB - yG) * 0.5;
  return [
    `M ${r2(cx - r)} ${r2(bottom)}`,
    `L ${r2(cx - r)} ${r2(yB)}`,
    `C ${r2(cx - r)} ${r2(yB - c)} ${r2(cx - rn)} ${r2(yG + c)} ${r2(cx - rn)} ${r2(yG)}`,
    `L ${r2(cx)} ${r2(yG + cono)}`,
    `L ${r2(cx + rn)} ${r2(yG)}`,
    `C ${r2(cx + rn)} ${r2(yG + c)} ${r2(cx + r)} ${r2(yB - c)} ${r2(cx + r)} ${r2(yB)}`,
    `L ${r2(cx + r)} ${r2(bottom)}`,
    "Z",
  ].join(" ");
}

/* ─── La máquina universal de ensayos ──────────────────────────────────── */

type MaquinaProps = {
  uid: string;
  material: Material;
  lectura: Lectura;
  diametro: number;
  l0: number;
  etiqueta: string;
};

function Maquina({ uid, material, lectura, diametro, l0, etiqueta }: MaquinaProps) {
  const roto = lectura.fase === "rotura";
  const estirado = alargamientoPx(material, lectura.eps);
  const largo = MQ.lpx0 + estirado;
  const top = MQ.probTop;
  const abajo = top + largo;
  const r = radioPx(diametro);

  const eu = epsMaxCarga(material);
  const er = epsRotura(material);
  const cuello = material.fragil || er <= eu ? 0 : clamp((lectura.eps - eu) / (er - eu), 0, 1);
  const rn = r * (1 - 0.6 * cuello);

  const hueco = roto ? MQ.hueco : 0;
  const mordMovY = abajo + hueco;
  const travMovY = mordMovY + MQ.mordH;
  const husY = travMovY + MQ.travMovH;
  const yc = (top + abajo) / 2;
  const cono = material.fragil ? 0 : Math.max(3, rn * 0.42);

  const tira = lectura.f > 0.0001 && !roto;
  const intensidad = tira ? clamp(0.4 + (lectura.sigma / material.sr) * 0.6, 0.4, 1) : 0;
  const cotaTop = top + MQ.lpx0;
  const verCotaD = abajo - cotaTop >= 7;

  return (
    <svg
      viewBox={`0 0 ${MQ.W} ${MQ.H}`}
      className="h-auto w-full max-w-[340px]"
      role="img"
      aria-label={etiqueta}
    >
      <defs>
        <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="32%" stopColor="#f1f5f9" />
          <stop offset="62%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#8a97a8" />
        </linearGradient>
        <linearGradient id={`${uid}-acero`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="45%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#3f4a5c" />
        </linearGradient>
        <marker
          id={`${uid}-flecha`}
          viewBox="0 0 10 9"
          refX={10}
          refY={4.5}
          markerWidth={10}
          markerHeight={9}
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M0 0 L10 4.5 L0 9 Z" fill="#f8fafc" />
        </marker>
      </defs>

      {/* Bastidor: columnas, travesaño superior y base */}
      <rect x={MQ.colX1} y={MQ.colY} width={MQ.colW} height={MQ.colH} rx={3} fill="#334155" />
      <rect x={MQ.colX2} y={MQ.colY} width={MQ.colW} height={MQ.colH} rx={3} fill="#334155" />
      <rect
        x={MQ.travSupX}
        y={MQ.travSupY}
        width={MQ.travSupW}
        height={MQ.travSupH}
        rx={5}
        fill={`url(#${uid}-acero)`}
      />
      <rect x={MQ.baseX} y={MQ.baseY} width={MQ.baseW} height={MQ.baseH} rx={5} fill="#334155" />

      {/* Husillos del cabezal móvil (se acortan al bajar el cabezal) */}
      <rect x={MQ.husX1} y={husY} width={MQ.husW} height={Math.max(0, MQ.baseY - husY)} fill="#1e293b" />
      <rect x={MQ.husX2} y={husY} width={MQ.husW} height={Math.max(0, MQ.baseY - husY)} fill="#1e293b" />

      {/* Probeta (entera, con cuello, o partida en dos) */}
      {roto ? (
        <>
          <path d={mitadSuperior(top, yc - MQ.hueco / 2, r, rn, cono)} fill={`url(#${uid}-metal)`} />
          <path
            d={mitadInferior(yc + MQ.hueco / 2, abajo + hueco, r, rn, cono)}
            fill={`url(#${uid}-metal)`}
          />
          <path
            d={`M ${r2(MQ.cx - rn)} ${r2(yc - MQ.hueco / 2)} L ${r2(MQ.cx)} ${r2(yc - MQ.hueco / 2 + cono)} L ${r2(MQ.cx + rn)} ${r2(yc - MQ.hueco / 2)}`}
            fill="none"
            stroke="#fb7185"
            strokeWidth={2.5}
            strokeLinejoin="round"
          />
          <path
            d={`M ${r2(MQ.cx - rn)} ${r2(yc + MQ.hueco / 2)} L ${r2(MQ.cx)} ${r2(yc + MQ.hueco / 2 + cono)} L ${r2(MQ.cx + rn)} ${r2(yc + MQ.hueco / 2)}`}
            fill="none"
            stroke="#fb7185"
            strokeWidth={2.5}
            strokeLinejoin="round"
          />
        </>
      ) : (
        <path d={caminoProbeta(top, abajo, r, cuello)} fill={`url(#${uid}-metal)`} />
      )}

      {/* Mordazas y cabezal móvil */}
      <rect
        x={MQ.mordX}
        y={MQ.travSupY + MQ.travSupH}
        width={MQ.mordW}
        height={MQ.mordH}
        rx={4}
        fill={`url(#${uid}-acero)`}
      />
      <rect x={MQ.mordX} y={mordMovY} width={MQ.mordW} height={MQ.mordH} rx={4} fill={`url(#${uid}-acero)`} />
      <rect
        x={MQ.travMovX}
        y={travMovY}
        width={MQ.travMovW}
        height={MQ.travMovH}
        rx={4}
        fill="#475569"
      />
      {/* Estrías de las mordazas (agarre) */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} stroke="#94a3b8" strokeWidth={1.2} opacity={0.55}>
          <line x1={MQ.mordX + 8} y1={48 + i * 9} x2={MQ.mordX + 30} y2={48 + i * 9} />
          <line x1={MQ.mordX + MQ.mordW - 30} y1={48 + i * 9} x2={MQ.mordX + MQ.mordW - 8} y2={48 + i * 9} />
          <line x1={MQ.mordX + 8} y1={mordMovY + 10 + i * 9} x2={MQ.mordX + 30} y2={mordMovY + 10 + i * 9} />
          <line
            x1={MQ.mordX + MQ.mordW - 30}
            y1={mordMovY + 10 + i * 9}
            x2={MQ.mordX + MQ.mordW - 8}
            y2={mordMovY + 10 + i * 9}
          />
        </g>
      ))}

      {/* Cota de L₀ (izquierda) */}
      <g stroke="#94a3b8" strokeWidth={1.4}>
        <line x1={MQ.cotaL} y1={top} x2={MQ.cotaL} y2={cotaTop} />
        <line x1={MQ.cotaL - 6} y1={top} x2={MQ.cotaL + 6} y2={top} />
        <line x1={MQ.cotaL - 6} y1={cotaTop} x2={MQ.cotaL + 6} y2={cotaTop} />
      </g>
      <text x={MQ.cotaL - 9} y={(top + cotaTop) / 2 + 5} fontSize={14} fill="#cbd5e1" textAnchor="end">
        L₀
      </text>

      {/* Cota de ΔL (derecha) */}
      {verCotaD && (
        <>
          <g stroke="#fbbf24" strokeWidth={1.6}>
            <line x1={MQ.cotaD} y1={cotaTop} x2={MQ.cotaD} y2={abajo + hueco} />
            <line x1={MQ.cotaD - 6} y1={cotaTop} x2={MQ.cotaD + 6} y2={cotaTop} />
            <line x1={MQ.cotaD - 6} y1={abajo + hueco} x2={MQ.cotaD + 6} y2={abajo + hueco} />
          </g>
          <text
            x={MQ.cotaD + 9}
            y={(cotaTop + abajo + hueco) / 2 + 5}
            fontSize={14}
            fill="#fbbf24"
            textAnchor="start"
          >
            ΔL
          </text>
        </>
      )}

      {/* Flechas de la fuerza: reacción arriba, carga abajo */}
      {tira && (
        <g stroke="#f8fafc" strokeWidth={3.2} opacity={intensidad} markerEnd={`url(#${uid}-flecha)`}>
          <line x1={MQ.cotaL - 2} y1={78} x2={MQ.cotaL - 2} y2={50} />
          <line x1={MQ.cotaL - 2} y1={mordMovY + 10} x2={MQ.cotaL - 2} y2={mordMovY + 38} />
        </g>
      )}
      {tira && (
        <>
          <text x={MQ.cotaL - 12} y={70} fontSize={15} fontWeight={700} fill="#f8fafc" textAnchor="end">
            F
          </text>
          <text
            x={MQ.cotaL - 12}
            y={mordMovY + 30}
            fontSize={15}
            fontWeight={700}
            fill="#f8fafc"
            textAnchor="end"
          >
            F
          </text>
        </>
      )}

      {/* Rótulo de la probeta */}
      <text x={MQ.cx} y={MQ.H - 2} fontSize={13} fill="#94a3b8" textAnchor="middle">
        probeta ⌀ {num(diametro, 1)} mm · L₀ = {num(l0, 0)} mm
      </text>
    </svg>
  );
}

/* ─── Geometría de la gráfica σ–ε ──────────────────────────────────────── */

const GR = { W: 480, H: 340, L: 66, R: 22, T: 28, B: 54 } as const;
const GX0 = GR.L;
const GX1 = GR.W - GR.R; // 458
const GY0 = GR.T; // 28
const GY1 = GR.H - GR.B; // 286

type GraficaProps = {
  uid: string;
  material: Material;
  lectura: Lectura;
  ensayo: Ensayo;
  etiqueta: string;
};

function Grafica({ uid, material, lectura, ensayo, etiqueta }: GraficaProps) {
  const ejeS = useMemo(() => ejeBonito(material.sr), [material]);
  const ejeE = useMemo(() => ejeBonito(epsRotura(material) * 100), [material]);
  const decS = decimalesDe(ejeS.paso);
  const decE = decimalesDe(ejeE.paso);

  const X = useCallback((eps: number) => GX0 + (clamp(eps * 100, 0, ejeE.max) / ejeE.max) * (GX1 - GX0), [ejeE.max]);
  const Y = useCallback((s: number) => GY1 - (clamp(s, 0, ejeS.max) / ejeS.max) * (GY1 - GY0), [ejeS.max]);

  const ee = epsElastico(material);
  const eu = epsMaxCarga(material);
  const er = epsRotura(material);
  const roto = lectura.fase === "rotura";
  const trazado = roto ? er : ensayo.picoEps;

  // Trazo elástico y trazo plástico de la curva virgen, hasta donde se ha tirado.
  const trazoElastico = useMemo(() => {
    const hasta = Math.min(trazado, ee);
    return `${X(0)},${Y(0)} ${X(hasta)},${Y(sigmaDeEps(material, hasta))}`;
  }, [trazado, ee, X, Y, material]);

  const trazoPlastico = useMemo(() => {
    if (trazado <= ee + 1e-9 || material.fragil) return "";
    const puntos: number[] = [];
    const n = 140;
    for (let i = 0; i <= n; i++) puntos.push(ee + (trazado - ee) * (i / n));
    if (eu > ee && eu < trazado) puntos.push(eu);
    puntos.sort((a, b) => a - b);
    return puntos.map((e) => `${r2(X(e))},${r2(Y(sigmaDeEps(material, e)))}`).join(" ");
  }, [trazado, ee, eu, X, Y, material]);

  // Recta de descarga: del extremo del trazo al punto actual, y su prolongación.
  const hayDescarga = !roto && lectura.descargando;
  const picoX = X(ensayo.picoEps);
  const picoY = Y(ensayo.picoSigma);
  const actX = X(lectura.eps);
  const actY = Y(lectura.sigma);
  const permX = X(lectura.epsPerm);

  // El rótulo de σe va DEBAJO de su guía y el de σr ENCIMA de la suya: así
  // ninguno se cruza con la curva (que sube hacia σr por encima de σe) ni con
  // el otro, sea cual sea la escala que le toque al material.
  const verSe = trazado > ee - 1e-9 && !material.fragil;
  const verSr = trazado >= eu - 1e-9;
  const ySe = Y(material.se);
  const ySr = Y(material.sr);

  return (
    <svg
      viewBox={`0 0 ${GR.W} ${GR.H}`}
      className="h-auto w-full"
      role="img"
      aria-label={etiqueta}
    >
      <defs>
        <clipPath id={`${uid}-plot`}>
          <rect x={GX0} y={GY0} width={GX1 - GX0} height={GY1 - GY0} />
        </clipPath>
      </defs>

      {/* Sombreado de zonas */}
      <rect x={GX0} y={GY0} width={Math.max(0, X(ee) - GX0)} height={GY1 - GY0} fill="#60a5fa" opacity={0.13} />
      {!material.fragil && (
        <rect
          x={X(ee)}
          y={GY0}
          width={Math.max(0, GX1 - X(ee))}
          height={GY1 - GY0}
          fill="#fbbf24"
          opacity={0.09}
        />
      )}

      {/* Rejilla */}
      {Array.from({ length: Math.round(ejeS.max / ejeS.paso) + 1 }, (_, i) => i * ejeS.paso).map((v) => (
        <g key={`s${v}`}>
          <line x1={GX0} y1={Y(v)} x2={GX1} y2={Y(v)} stroke="#334155" strokeWidth={1} />
          <text x={GX0 - 8} y={Y(v) + 5} fontSize={13} fill="#94a3b8" textAnchor="end">
            {num(v, decS)}
          </text>
        </g>
      ))}
      {Array.from({ length: Math.round(ejeE.max / ejeE.paso) + 1 }, (_, i) => i * ejeE.paso).map((v) => (
        <g key={`e${v}`}>
          <line x1={X(v / 100)} y1={GY0} x2={X(v / 100)} y2={GY1} stroke="#334155" strokeWidth={1} />
          <text x={X(v / 100)} y={GY1 + 21} fontSize={13} fill="#94a3b8" textAnchor="middle">
            {num(v, decE)}
          </text>
        </g>
      ))}

      {/* Ejes */}
      <line x1={GX0} y1={GY0} x2={GX0} y2={GY1} stroke="#94a3b8" strokeWidth={2} />
      <line x1={GX0} y1={GY1} x2={GX1} y2={GY1} stroke="#94a3b8" strokeWidth={2} />
      <text x={GX0} y={GY0 - 11} fontSize={14} fill="#cbd5e1" textAnchor="start">
        σ (MPa)
      </text>
      <text x={GX1} y={GY1 + 44} fontSize={14} fill="#cbd5e1" textAnchor="end">
        ε (%)
      </text>

      <g clipPath={`url(#${uid}-plot)`}>
        {/* Guías de los hitos */}
        {verSe && (
          <line x1={GX0} y1={ySe} x2={X(ee)} y2={ySe} stroke="#93c5fd" strokeWidth={1.3} strokeDasharray="5 4" />
        )}
        {verSr && (
          <line x1={GX0} y1={ySr} x2={X(eu)} y2={ySr} stroke="#fcd34d" strokeWidth={1.3} strokeDasharray="5 4" />
        )}

        {/* Curva trazada hasta ahora */}
        <polyline points={trazoElastico} fill="none" stroke="#60a5fa" strokeWidth={3.4} strokeLinecap="round" />
        {trazoPlastico && (
          <polyline
            points={trazoPlastico}
            fill="none"
            stroke="#fbbf24"
            strokeWidth={3.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Recta de descarga (paralela al tramo elástico) */}
        {hayDescarga && (
          <>
            <line x1={picoX} y1={picoY} x2={actX} y2={actY} stroke="#a5b4fc" strokeWidth={3} strokeLinecap="round" />
            <line
              x1={actX}
              y1={actY}
              x2={permX}
              y2={GY1}
              stroke="#a5b4fc"
              strokeWidth={2}
              strokeDasharray="6 5"
              opacity={0.75}
            />
            {lectura.epsPerm > 1e-6 && (
              <>
                <line x1={permX} y1={GY1 - 9} x2={permX} y2={GY1 + 9} stroke="#a5b4fc" strokeWidth={2.4} />
                <circle cx={permX} cy={GY1} r={4} fill="#a5b4fc" />
              </>
            )}
          </>
        )}

        {/* Hitos alcanzados */}
        {verSe && (
          <>
            <circle cx={X(ee)} cy={ySe} r={5} fill="#0f172a" stroke="#93c5fd" strokeWidth={2.4} />
            <text x={GX0 + 8} y={ySe + 17} fontSize={13} fill="#bfdbfe">
              límite elástico σe = {num(material.se, 0)} MPa
            </text>
          </>
        )}
        {verSr && (
          <>
            <circle cx={X(eu)} cy={ySr} r={5} fill="#0f172a" stroke="#fcd34d" strokeWidth={2.4} />
            <text x={GX0 + 8} y={ySr - 9} fontSize={13} fill="#fde68a">
              carga máxima σr = {num(material.sr, 0)} MPa
            </text>
          </>
        )}
        {roto && (
          <>
            <g stroke="#fb7185" strokeWidth={3} strokeLinecap="round">
              <line x1={X(er) - 7} y1={Y(sigmaRotura(material)) - 7} x2={X(er) + 7} y2={Y(sigmaRotura(material)) + 7} />
              <line x1={X(er) - 7} y1={Y(sigmaRotura(material)) + 7} x2={X(er) + 7} y2={Y(sigmaRotura(material)) - 7} />
            </g>
            <text
              x={X(er) - 12}
              y={Y(sigmaRotura(material)) + 22}
              fontSize={13}
              fontWeight={700}
              fill="#fda4af"
              textAnchor="end"
            >
              rotura
            </text>
          </>
        )}

        {/* Punto actual */}
        {!roto && (
          <>
            <circle cx={actX} cy={actY} r={11} fill="#ffffff" opacity={0.2} />
            <circle cx={actX} cy={actY} r={6} fill="#ffffff" stroke={FASES[lectura.fase].punto} strokeWidth={2.6} />
          </>
        )}
      </g>

      {/* Leyenda de zonas */}
      <g fontSize={13}>
        <rect x={GX0} y={GR.H - 20} width={13} height={13} rx={3} fill="#60a5fa" opacity={0.65} />
        <text x={GX0 + 19} y={GR.H - 9} fill="#94a3b8">
          zona elástica
        </text>
        <rect x={GX0 + 110} y={GR.H - 20} width={13} height={13} rx={3} fill="#fbbf24" opacity={0.6} />
        <text x={GX0 + 129} y={GR.H - 9} fill="#94a3b8">
          zona plástica
        </text>
        {hayDescarga && (
          <>
            <line
              x1={GX0 + 222}
              y1={GR.H - 13}
              x2={GX0 + 240}
              y2={GR.H - 13}
              stroke="#a5b4fc"
              strokeWidth={3}
            />
            <text x={GX0 + 246} y={GR.H - 9} fill="#a5b4fc">
              descarga
            </text>
          </>
        )}
      </g>
    </svg>
  );
}

/* ─── Comparador: los cinco materiales en los mismos ejes ──────────────── */

const CP = { W: 480, H: 250, L: 58, R: 18, T: 16, B: 46 } as const;
const CX0 = CP.L;
const CX1 = CP.W - CP.R;
const CY0 = CP.T;
const CY1 = CP.H - CP.B;
const CP_EPS = 50; // %
const CP_SIG = 500; // MPa

const cx = (eps: number) => CX0 + (clamp(eps * 100, 0, CP_EPS) / CP_EPS) * (CX1 - CX0);
const cy = (s: number) => CY1 - (clamp(s, 0, CP_SIG) / CP_SIG) * (CY1 - CY0);

const COMPARADOR_ALT =
  "Las curvas tensión–deformación de los cinco materiales sobre los mismos ejes: deformación de 0 a 50 % y tensión de 0 a 500 MPa. El acero S275 es la más alta y llega al 23 %; el cobre recocido es la más baja y larga, hasta el 45 %; la fundición gris es una recta casi vertical que se corta en seguida, al 0,23 %; el PLA queda pegado al eje horizontal.";

function Comparador({ activo }: { activo: string }) {
  const curvas = useMemo(
    () =>
      MATERIALES.map((m) => {
        const er = epsRotura(m);
        const ee = epsElastico(m);
        const puntos: number[] = [0, ee];
        if (!m.fragil) {
          for (let i = 1; i <= 90; i++) puntos.push(ee + (er - ee) * (i / 90));
          if (m.epsU > ee && m.epsU < er) puntos.push(m.epsU);
        }
        puntos.sort((a, b) => a - b);
        return {
          m,
          d: puntos.map((e) => `${r2(cx(e))},${r2(cy(sigmaDeEps(m, e)))}`).join(" "),
          fx: cx(er),
          fy: cy(sigmaDeEps(m, er)),
        };
      }),
    [],
  );

  return (
    <svg viewBox={`0 0 ${CP.W} ${CP.H}`} className="h-auto w-full" role="img" aria-label={COMPARADOR_ALT}>
      {[0, 100, 200, 300, 400, 500].map((v) => (
        <g key={v}>
          <line x1={CX0} y1={cy(v)} x2={CX1} y2={cy(v)} stroke="#334155" strokeWidth={1} />
          <text x={CX0 - 8} y={cy(v) + 5} fontSize={13} fill="#94a3b8" textAnchor="end">
            {v}
          </text>
        </g>
      ))}
      {[0, 10, 20, 30, 40, 50].map((v) => (
        <g key={`x${v}`}>
          <line x1={cx(v / 100)} y1={CY0} x2={cx(v / 100)} y2={CY1} stroke="#334155" strokeWidth={1} />
          <text x={cx(v / 100)} y={CY1 + 21} fontSize={13} fill="#94a3b8" textAnchor="middle">
            {v}
          </text>
        </g>
      ))}
      <line x1={CX0} y1={CY0} x2={CX0} y2={CY1} stroke="#94a3b8" strokeWidth={2} />
      <line x1={CX0} y1={CY1} x2={CX1} y2={CY1} stroke="#94a3b8" strokeWidth={2} />
      <text x={CX0} y={CY0 - 3} fontSize={13} fill="#cbd5e1">
        σ (MPa)
      </text>
      <text x={CX1} y={CY1 + 42} fontSize={13} fill="#cbd5e1" textAnchor="end">
        ε (%)
      </text>

      {curvas.map(({ m, d, fx, fy }) => {
        const esActivo = m.id === activo;
        return (
          <g key={m.id} opacity={esActivo ? 1 : 0.45}>
            <polyline
              points={d}
              fill="none"
              stroke={m.color}
              strokeWidth={esActivo ? 3.6 : 2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx={fx} cy={fy} r={esActivo ? 5 : 3.5} fill={m.color} />
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Instrumento del panel de lecturas ────────────────────────────────── */

function Instrumento({
  simbolo,
  formula,
  valor,
  unidad,
  nombre,
  tono = "zinc",
}: {
  simbolo: string;
  formula: string;
  valor: string;
  unidad: string;
  nombre: string;
  tono?: "zinc" | "azul" | "ambar" | "rosa";
}) {
  const marco =
    tono === "azul"
      ? "border-blue-200 dark:border-blue-500/30 bg-blue-50/70 dark:bg-blue-500/10"
      : tono === "ambar"
        ? "border-amber-200 dark:border-amber-500/30 bg-amber-50/70 dark:bg-amber-500/10"
        : tono === "rosa"
          ? "border-rose-200 dark:border-rose-500/30 bg-rose-50/70 dark:bg-rose-500/10"
          : "border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900";
  return (
    <div className={`rounded-xl border ${marco} p-3`}>
      <div className="flex items-baseline gap-2">
        <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-slate-100">{simbolo}</span>
        <span className="truncate text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{nombre}</span>
      </div>
      <div className="mt-0.5 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">{formula}</div>
      <div className="mt-1.5 flex items-baseline gap-1">
        <span className="text-xl font-extrabold tracking-tight tabular-nums text-slate-900 dark:text-slate-100">{valor}</span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">{unidad}</span>
      </div>
    </div>
  );
}

/* ─── Retos de dimensionado ────────────────────────────────────────────── */

type Veredicto = "bien" | "corto" | "pasado" | null;

function CajaVeredicto({ estado, children }: { estado: Veredicto; children: ReactNode }) {
  const marco =
    estado === "bien"
      ? "border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-200"
      : estado === "corto"
        ? "border-rose-300 dark:border-rose-500/40 bg-rose-50 dark:bg-rose-500/10 text-rose-900 dark:text-rose-200"
        : "border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 text-amber-900 dark:text-amber-200";
  return (
    <div className={`mt-3 rounded-xl border p-4 text-[15px] leading-relaxed ${marco}`} aria-live="polite">
      {children}
    </div>
  );
}

function Reto1() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [d, setD] = useState("20");
  const [comprobado, setComprobado] = useState(false);

  const acero = MATERIALES[0];
  const F = 50000; // N
  const n = 2;
  const sAdm = acero.se / n; // 137,5 MPa
  const aMin = F / sAdm; // 363,64 mm²
  const dMin = Math.sqrt((4 * aMin) / Math.PI); // 21,517 mm

  const dv = Number(d.replace(",", "."));
  const valido = Number.isFinite(dv) && dv > 0;
  const aReal = valido ? areaSeccion(dv) : 0;
  const sReal = valido ? F / aReal : 0;
  const nReal = valido ? acero.se / sReal : 0;
  const estado: Veredicto = !valido ? null : nReal < n ? "corto" : dv <= dMin + 1.2 ? "bien" : "pasado";

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
      <h4 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Reto 1 · El tirante de acero</h4>
      <p className="mt-1.5 text-[15px] text-zinc-700 dark:text-zinc-300">
        Un tirante de <b>acero S275</b> debe soportar <b>50 kN</b> con un coeficiente de seguridad{" "}
        <b>n = 2</b> frente al límite elástico. ¿Qué diámetro mínimo necesita?
      </p>
      <div className="mt-3 flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor={`${uid}-d`} className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
            Tu diámetro d
          </label>
          <div className="mt-1 flex items-center gap-2">
            <input
              id={`${uid}-d`}
              type="number"
              min={1}
              max={100}
              step={0.1}
              value={d}
              onChange={(ev) => {
                setD(ev.target.value);
                setComprobado(false);
              }}
              className="w-28 rounded-xl border border-zinc-300 dark:border-white/15 px-3 py-2 text-[15px] tabular-nums text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <span className="text-sm text-zinc-500 dark:text-zinc-400">mm</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setComprobado(true)}
          className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:hover:bg-slate-600"
        >
          Comprobar
        </button>
      </div>

      {comprobado && valido && (
        <CajaVeredicto estado={estado}>
          <p className="font-bold">
            {estado === "bien"
              ? `Correcto: con d = ${num(dv, 1)} mm el coeficiente de seguridad es n = ${num(nReal, 2)}.`
              : estado === "corto"
                ? `No llega: con d = ${num(dv, 1)} mm sale n = ${num(nReal, 2)}, por debajo de 2.`
                : `Aguanta de sobra (n = ${num(nReal, 2)}), pero estás gastando material de más.`}
          </p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>
              Tensión admisible: σ<sub>adm</sub> = σe / n = {num(acero.se, 0)} MPa / 2 = <b>{num(sAdm, 1)} MPa</b>.
            </li>
            <li>
              Sección mínima: A = F / σ<sub>adm</sub> = 50 000 N / {num(sAdm, 1)} N/mm² ={" "}
              <b>{num(aMin, 2)} mm²</b>.
            </li>
            <li>
              Diámetro: de A = π·d²/4 se despeja d = √(4A/π) = <b>{num(dMin, 2)} mm</b>.
            </li>
            <li>
              En la práctica se sube a la medida comercial siguiente: <b>⌀ 22 mm</b> (n = {num(acero.se / (F / areaSeccion(22)), 2)}).
            </li>
          </ol>
          <p className="mt-2 text-sm">
            Fíjate en que el tirante no cabría como probeta de este banco: el ensayo normalizado usa ⌀ 4–20 mm y
            luego el resultado se aplica a la pieza real, sea del tamaño que sea. Eso es lo bueno de trabajar con
            tensiones y no con fuerzas.
          </p>
        </CajaVeredicto>
      )}
    </div>
  );
}

function Reto2() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [elegido, setElegido] = useState("");
  const [comprobado, setComprobado] = useState(false);
  const area = areaSeccion(10);

  const opciones = [
    ...MATERIALES.map((m) => ({ id: m.id, texto: m.corto })),
    { id: "empate", texto: "Empatan el acero S275 y el aluminio 6061-T6" },
  ];
  const acertado = elegido === "empate";

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
      <h4 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
        Reto 2 · Quién aguanta más sin deformarse
      </h4>
      <p className="mt-1.5 text-[15px] text-zinc-700 dark:text-zinc-300">
        Con una probeta de <b>10 mm</b> de diámetro (A = {num(area, 2)} mm²), ¿qué material aguanta{" "}
        <b>más fuerza</b> antes de deformarse permanentemente, es decir, antes de pasar su límite elástico?
      </p>
      <fieldset className="mt-3">
        <legend className="sr-only">Elige el material que más fuerza aguanta antes de deformarse</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {opciones.map((o) => (
            <label key={o.id} className="cursor-pointer">
              <input
                type="radio"
                name={`${uid}-r2`}
                value={o.id}
                checked={elegido === o.id}
                onChange={() => {
                  setElegido(o.id);
                  setComprobado(false);
                }}
                className="peer sr-only"
              />
              <span className="block rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-3 py-2 text-[15px] text-slate-700 dark:text-slate-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:font-semibold peer-checked:text-blue-800 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-400 hover:bg-zinc-50 dark:hover:bg-white/5">
                {o.texto}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <button
        type="button"
        disabled={!elegido}
        onClick={() => setComprobado(true)}
        className="mt-3 rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Comprobar
      </button>

      {comprobado && (
        <CajaVeredicto estado={acertado ? "bien" : "corto"}>
          <p className="font-bold">
            {acertado
              ? "Correcto: es un empate, y no por casualidad."
              : "Casi: hay un empate que no se ve si solo miras el nombre del material."}
          </p>
          <p className="mt-2">
            La fuerza que aguanta cada uno antes de deformarse es F<sub>e</sub> = σe · A. Con la misma sección,
            el que gana es simplemente el de mayor límite elástico:
          </p>
          <ul className="mt-2 space-y-1">
            {MATERIALES.map((m) => (
              <li key={m.id} className="flex flex-wrap items-baseline gap-x-2 font-mono text-[13px]">
                <span className="w-36 flex-none">{m.corto}</span>
                <span>
                  σ{m.fragil ? "r" : "e"} = {num(m.se, 0)} MPa → F = <b>{num((m.se * area) / 1000, 2)} kN</b>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2">
            El acero S275 y el aluminio 6061-T6 tienen <b>el mismo límite elástico</b>, 275 MPa, así que con la
            misma sección aguantan exactamente la misma fuerza: <b>21,60 kN</b>. La fundición llega a 19,64 kN,
            pero ahí ya no se deforma: <b>revienta</b>.
          </p>
          <p className="mt-2">
            Entonces, ¿en qué se diferencian el acero y el aluminio? En tres cosas de examen: el acero es{" "}
            <b>tres veces más rígido</b> (E = 210 frente a 69 GPa), así que se estira tres veces menos antes de
            ceder; el acero tiene mucha más <b>reserva</b> hasta la rotura (430 frente a 310 MPa) y avisa mucho
            más (23 % frente a 12 % de alargamiento); y el aluminio pesa{" "}
            <b>la tercera parte</b>, que es exactamente por lo que se usa en aeronáutica. Misma fuerza, distinta
            ingeniería.
          </p>
        </CajaVeredicto>
      )}
    </div>
  );
}

function Reto3() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [dAl, setDAl] = useState("");
  const [dPla, setDPla] = useState("");
  const [comprobado, setComprobado] = useState(false);

  const aluminio = MATERIALES[1];
  const pla = MATERIALES[4];
  const F = 3000; // N
  const objAl = Math.sqrt((4 * (F / aluminio.se)) / Math.PI); // 3,7269 mm
  const objPla = Math.sqrt((4 * (F / pla.se)) / Math.PI); // 9,2132 mm

  const vAl = Number(dAl.replace(",", "."));
  const vPla = Number(dPla.replace(",", "."));
  const ok = (v: number, obj: number) => Number.isFinite(v) && v >= obj - 0.2 && v <= obj + 0.2;
  const valido = Number.isFinite(vAl) && vAl > 0 && Number.isFinite(vPla) && vPla > 0;
  const acertado = ok(vAl, objAl) && ok(vPla, objPla);

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
      <h4 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Reto 3 · Sustituir aluminio por PLA</h4>
      <p className="mt-1.5 text-[15px] text-zinc-700 dark:text-zinc-300">
        Una pieza de <b>PLA impreso</b> sustituye a una de <b>aluminio 6061-T6</b> en una fijación que soporta{" "}
        <b>3 kN</b>. ¿Qué diámetro necesita cada una para <b>no superar su límite elástico</b>? Calcula los dos.
      </p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-al`} className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
            Diámetro de la pieza de aluminio
          </label>
          <div className="mt-1 flex items-center gap-2">
            <input
              id={`${uid}-al`}
              type="number"
              min={0.5}
              max={100}
              step={0.01}
              value={dAl}
              onChange={(ev) => {
                setDAl(ev.target.value);
                setComprobado(false);
              }}
              className="w-28 rounded-xl border border-zinc-300 dark:border-white/15 px-3 py-2 text-[15px] tabular-nums text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <span className="text-sm text-zinc-500 dark:text-zinc-400">mm</span>
          </div>
        </div>
        <div>
          <label htmlFor={`${uid}-pla`} className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
            Diámetro de la pieza de PLA
          </label>
          <div className="mt-1 flex items-center gap-2">
            <input
              id={`${uid}-pla`}
              type="number"
              min={0.5}
              max={100}
              step={0.01}
              value={dPla}
              onChange={(ev) => {
                setDPla(ev.target.value);
                setComprobado(false);
              }}
              className="w-28 rounded-xl border border-zinc-300 dark:border-white/15 px-3 py-2 text-[15px] tabular-nums text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <span className="text-sm text-zinc-500 dark:text-zinc-400">mm</span>
          </div>
        </div>
      </div>
      <button
        type="button"
        disabled={!valido}
        onClick={() => setComprobado(true)}
        className="mt-3 rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Comprobar
      </button>

      {comprobado && valido && (
        <CajaVeredicto estado={acertado ? "bien" : "corto"}>
          <p className="font-bold">
            {acertado
              ? "Correcto los dos. Ahora mira lo que significa el resultado."
              : `Repásalos: el aluminio necesita ${num(objAl, 2)} mm y el PLA, ${num(objPla, 2)} mm.`}
          </p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>
              Aluminio: A = F / σe = 3 000 N / {num(aluminio.se, 0)} MPa = {num(F / aluminio.se, 2)} mm² → d ={" "}
              √(4A/π) = <b>{num(objAl, 2)} mm</b>
              {Number.isFinite(vAl) && ` · tú has puesto ${num(vAl, 2)} mm`}.
            </li>
            <li>
              PLA: A = F / σe = 3 000 N / {num(pla.se, 0)} MPa = {num(F / pla.se, 2)} mm² → d = √(4A/π) ={" "}
              <b>{num(objPla, 2)} mm</b>
              {Number.isFinite(vPla) && ` · tú has puesto ${num(vPla, 2)} mm`}.
            </li>
          </ol>
          <p className="mt-2">
            La comparación: el PLA necesita <b>{num(objPla / objAl, 2)} veces más diámetro</b> y{" "}
            <b>{num(aluminio.se / pla.se, 2)} veces más sección</b> que el aluminio. Y no es casualidad: como la
            fuerza y la sección van ligadas por σ = F/A, la relación de secciones es exactamente la de límites
            elásticos ({num(aluminio.se, 0)} / {num(pla.se, 0)} = {num(aluminio.se / pla.se, 2)}) y la de
            diámetros es su raíz cuadrada.
          </p>
          <p className="mt-2 text-sm">
            Dos avisos de taller: estos diámetros son el <b>mínimo estricto</b>, con n = 1 (la pieza trabajaría
            justo en el límite elástico), así que en un proyecto real habría que dividir por un coeficiente de
            seguridad. Y el PLA impreso además <b>fluye con el tiempo</b> bajo carga mantenida y se ablanda a
            partir de unos 60 °C: por eso se usa para prototipos y no para fijaciones que aguantan de verdad.
          </p>
        </CajaVeredicto>
      )}
    </div>
  );
}

/* ═══ Componente principal ═════════════════════════════════════════════ */

const TIC_MS = 45;

export default function EnsayoTraccionApp() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  const [matId, setMatId] = useState(MATERIALES[0].id);
  const [diametro, setDiametro] = useState(10);
  const [l0, setL0] = useState(100);
  const [ensayo, setEnsayo] = useState<Ensayo>(ENSAYO_CERO);
  const [auto, setAuto] = useState(false);
  const [reducido, setReducido] = useState(false);

  const material = useMemo(() => MATERIALES.find((m) => m.id === matId) ?? MATERIALES[0], [matId]);
  const area = useMemo(() => areaSeccion(diametro), [diametro]);
  const fMax = useMemo(() => (material.sr * area) / 1000, [material, area]); // kN
  const fElastico = useMemo(() => (material.se * area) / 1000, [material, area]);
  const lectura = useMemo(() => leer(ensayo, material, area, l0), [ensayo, material, area, l0]);

  const ensayoRef = useRef(ensayo);
  useEffect(() => {
    ensayoRef.current = ensayo;
  }, [ensayo]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducido(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const reiniciar = useCallback(() => {
    setAuto(false);
    setEnsayo(ENSAYO_CERO);
  }, []);

  /** Aplica una fuerza en kN: avanza por la curva virgen o descarga/recarga. */
  const aplicar = useCallback(
    (kN: number) => {
      const f = clamp(kN, 0, fMax);
      setEnsayo((prev) => {
        if (prev.roto) return prev;
        const sigma = (f * 1000) / area;
        if (sigma < prev.picoSigma - 1e-9) return { ...prev, f };
        if (prev.pasadoMax) {
          // Pasada la carga máxima la probeta no puede volver a subir de carga.
          return sigma > prev.picoSigma + 1e-6 ? { ...prev, f, roto: true } : { ...prev, f };
        }
        if (material.fragil && sigma >= material.sr - 1e-9) {
          return { ...prev, f, picoEps: epsRotura(material), picoSigma: material.sr, pasadoMax: true, roto: true };
        }
        const eps = epsDeSigma(material, sigma);
        return {
          f,
          picoEps: eps,
          picoSigma: sigma,
          pasadoMax: sigma >= material.sr - 1e-9,
          roto: false,
        };
      });
    },
    [area, fMax, material],
  );

  /** Avanza la estricción: aquí manda el desplazamiento, no la fuerza. */
  const estirar = useCallback(
    (dEps: number) => {
      setEnsayo((prev) => {
        if (prev.roto || !prev.pasadoMax) return prev;
        const er = epsRotura(material);
        const eps = prev.picoEps + dEps;
        if (eps >= er - 1e-9) {
          return { ...prev, f: (sigmaRotura(material) * area) / 1000, picoEps: er, picoSigma: sigmaRotura(material), roto: true };
        }
        const sigma = sigmaDeEps(material, eps);
        return { ...prev, f: (sigma * area) / 1000, picoEps: eps, picoSigma: sigma };
      });
    },
    [area, material],
  );

  const seguirTirando = useCallback(() => {
    if (material.fragil) return;
    const er = epsRotura(material);
    const eu = epsMaxCarga(material);
    if (reducido) {
      estirar(er - eu + 1);
      return;
    }
    setAuto(true);
  }, [estirar, material, reducido]);

  const soltar = useCallback(() => {
    setAuto(false);
    setEnsayo((prev) => (prev.roto ? prev : { ...prev, f: 0 }));
  }, []);

  // Ensayo automático: rampa de fuerza y, pasada la carga máxima, estricción.
  useEffect(() => {
    if (!auto) return;
    const er = epsRotura(material);
    const eu = epsMaxCarga(material);
    const dF = fMax / (reducido ? 40 : 130);
    const dEps = Math.max((er - eu) / (reducido ? 12 : 55), 1e-6);
    const id = window.setInterval(() => {
      const prev = ensayoRef.current;
      if (prev.roto) {
        setAuto(false);
        return;
      }
      if (prev.pasadoMax) estirar(dEps);
      else aplicar(prev.f + dF);
    }, TIC_MS);
    return () => window.clearInterval(id);
  }, [auto, aplicar, estirar, fMax, material, reducido]);

  // Cambiar de material o de probeta equivale a montar una probeta nueva.
  const cambiarMaterial = useCallback(
    (id: string) => {
      setMatId(id);
      reiniciar();
    },
    [reiniciar],
  );
  const cambiarDiametro = useCallback(
    (v: number) => {
      setDiametro(clamp(v, 4, 20));
      reiniciar();
    },
    [reiniciar],
  );
  const cambiarL0 = useCallback(
    (v: number) => {
      setL0(clamp(v, 20, 200));
      reiniciar();
    },
    [reiniciar],
  );

  /* ─── Textos de estado ──────────────────────────────────────────────── */

  const fase = lectura.fase;
  const rotoYa = fase === "rotura";
  const nSeg = lectura.sigma > 0.001 ? sigmaRef(material) / lectura.sigma : Number.POSITIVE_INFINITY;
  const lActual = l0 + lectura.dL;

  const resumen = rotoYa
    ? `La probeta de ${material.corto} ha roto. Valores en el instante de la rotura: tensión ${num(lectura.sigma, 1)} megapascales, deformación ${num(lectura.eps * 100, 2)} por ciento, alargamiento ${num(lectura.dL, 2)} milímetros.`
    : `Fase: ${FASES[fase].rotulo}. Fuerza ${num(lectura.f, 2)} kilonewton, tensión ${num(lectura.sigma, 1)} megapascales, deformación ${num(lectura.eps * 100, 3)} por ciento, alargamiento ${num(lectura.dL, 3)} milímetros, coeficiente de seguridad ${Number.isFinite(nSeg) ? num(nSeg, 2) : "sin carga"}.`;

  const altMaquina = `Máquina universal de ensayos con la probeta de ${material.corto} entre las dos mordazas. ${
    rotoYa
      ? "La probeta está partida en dos, con las superficies de fractura separadas."
      : fase === "estriccion"
        ? "La probeta muestra un cuello marcado en el centro: es la estricción."
        : fase === "sin-carga"
          ? "La probeta está en reposo, sin alargar."
          : `La probeta está alargada ${num(lectura.dL, 3)} milímetros sobre una longitud inicial de ${num(l0, 0)} milímetros.`
  } Fase actual: ${FASES[fase].rotulo}.`;

  const altGrafica = `Gráfica tensión–deformación del ${material.corto}. El eje horizontal es la deformación unitaria en por ciento y el vertical la tensión en megapascales. La curva se ha trazado hasta una deformación de ${num((rotoYa ? epsRotura(material) : ensayo.picoEps) * 100, 3)} por ciento. ${resumen}`;

  /* ─── Explicación de la fase actual ─────────────────────────────────── */

  const explicacion: { titulo: string; cuerpo: string } = (() => {
    switch (fase) {
      case "rotura":
        return {
          titulo: "Rotura",
          cuerpo: material.fragil
            ? "La fundición gris ha roto sin avisar: no ha habido zona plástica, la superficie de fractura es plana y perpendicular al eje, y la curva se ha cortado en plena recta de Hooke. Un material frágil no da señales antes de fallar, y por eso no se usa donde el fallo sería peligroso."
            : `La probeta se ha partido en dos. La fractura es de copa y cono: el cuello se ha estrechado hasta que la sección ya no pudo más. El alargamiento de rotura de este material es del ${num(material.aTabla, 1)} %, y ese número es el que dice cuánto avisa antes de romper.`,
        };
      case "sin-carga":
        return {
          titulo: "Sin carga",
          cuerpo: `La probeta está montada y sin tirar: F = 0, σ = 0 y L = L₀ = ${num(l0, 0)} mm. Mueve el deslizador de fuerza o pulsa el ensayo automático.`,
        };
      case "elastica":
        return {
          titulo: "Zona elástica · manda la ley de Hooke",
          cuerpo: `σ = E · ε: la curva es una recta de pendiente E = ${num(material.eGPa, 1)} GPa. Todo lo que se alarga aquí lo devuelve: si sueltas la fuerza, la probeta vuelve exactamente a sus ${num(l0, 0)} mm. Quedan ${num(sigmaRef(material) - lectura.sigma, 1)} MPa hasta ${material.fragil ? "la rotura, porque en la fundición gris no hay nada después de la recta" : "el límite elástico"}.`,
        };
      case "plastica":
        return {
          titulo: "Zona plástica · ya no hay vuelta atrás",
          cuerpo: `Has pasado el límite elástico (σe = ${num(material.se, 0)} MPa): el material fluye y se endurece por deformación, así que hace falta cada vez más tensión para seguir alargándolo, pero cada vez se alarga mucho más por cada newton de más. Si sueltas ahora la fuerza, la probeta ya no vuelve: se quedará ${num(lectura.epsPerm * l0, 2)} mm más larga.`,
        };
      case "carga-max":
        return {
          titulo: "Carga máxima · aquí se te acaba el mando",
          cuerpo: `Estás justo en σr = ${num(material.sr, 0)} MPa, la mayor tensión que soporta este material: F = ${num(fMax, 2)} kN sobre A = ${num(area, 2)} mm². El deslizador no sube más porque la probeta no aguanta más. Pulsa SEGUIR TIRANDO HASTA LA ROTURA y fíjate en que la carga BAJA mientras la probeta se sigue alargando. Hasta aquí se ha alargado por igual en toda su longitud; a partir de aquí, todo se concentra en un punto.`,
        };
      case "estriccion":
        return {
          titulo: "Estricción · la carga cae y la probeta se estrangula",
          cuerpo: `Se ha superado la carga máxima (σr = ${num(material.sr, 0)} MPa) y toda la deformación se concentra en un punto: ahí está el cuello. La fuerza BAJA mientras la probeta sigue alargándose, y por eso ya no puedes mandar tú con el deslizador. Así trabajan las máquinas reales: controlan el desplazamiento, no la carga.`,
        };
      default:
        return {
          titulo: lectura.f <= 0 ? "Descargada" : "Descargando",
          cuerpo:
            lectura.epsPerm > 1e-6
              ? `Estás bajando por la recta de descarga, que es PARALELA al tramo elástico (misma pendiente E). No vuelve al origen: corta el eje en εp = ${num(lectura.epsPerm * 100, 3)} %, la deformación remanente. Lo único que se recupera es la parte elástica, σ/E.`
              : "Estás descargando desde la zona elástica: la recta de descarga es la misma recta de carga y termina en el origen. Cero deformación permanente.",
        };
    }
  })();

  /* ─── Render ────────────────────────────────────────────────────────── */

  const pctSlider = fMax > 0 ? clamp((lectura.f / fMax) * 100, 0, 100) : 0;

  return (
    <section className="w-full">
      <p aria-live="polite" className="sr-only">
        {resumen}
      </p>

      {/* Cabecera */}
      <header className="mb-5">
        <span className="inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
          1.º Bachillerato · Tecnología e Ingeniería I · Materiales
        </span>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
          Banco de ensayo de tracción
        </h2>
        <p className="mt-2 max-w-3xl text-[15px] text-zinc-700 dark:text-zinc-300">
          Tira de la probeta y mira qué le pasa. La curva tensión–deformación no está dibujada de antemano:{" "}
          <b>se va trazando conforme tiras</b>. Cuando quieras, pulsa <b>suelta la fuerza</b> y comprueba si la
          probeta vuelve a su sitio o se queda estirada para siempre. Ahí está el examen entero.
        </p>
      </header>

      {/* Escena: máquina + gráfica */}
      <div className="rounded-2xl bg-slate-900 p-4 shadow-sm sm:p-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
          {/* Máquina */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${FASES[fase].pastilla}`}>
                {FASES[fase].rotulo}
              </span>
              <span className="text-xs font-semibold text-slate-400">{material.corto}</span>
            </div>
            <div className="mt-3 flex justify-center">
              <Maquina
                uid={uid}
                material={material}
                lectura={lectura}
                diametro={diametro}
                l0={l0}
                etiqueta={altMaquina}
              />
            </div>
            <p className="mt-2 text-center text-xs text-slate-400">
              Alargamiento exagerado en pantalla: si no, la zona elástica (décimas de milímetro) sería invisible.
            </p>
          </div>

          {/* Gráfica */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Curva σ–ε</h3>
              <span className="text-xs text-slate-400">los ejes se ajustan a cada material</span>
            </div>
            <div className="mt-2">
              <Grafica uid={uid} material={material} lectura={lectura} ensayo={ensayo} etiqueta={altGrafica} />
            </div>
          </div>
        </div>
      </div>

      {/* Mandos */}
      <div className="mt-5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
        <h3 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Mandos de la máquina</h3>

        <fieldset className="mt-4">
          <legend className="text-sm font-semibold text-slate-700 dark:text-slate-200">Material de la probeta</legend>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-5">
            {MATERIALES.map((m) => (
              <label key={m.id} className="cursor-pointer">
                <input
                  type="radio"
                  name={`${uid}-mat`}
                  value={m.id}
                  checked={matId === m.id}
                  onChange={() => cambiarMaterial(m.id)}
                  className="peer sr-only"
                />
                <span className="flex h-full flex-col rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-3 py-2 text-left peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-400 hover:bg-zinc-50 dark:hover:bg-white/5">
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 flex-none rounded-full" style={{ backgroundColor: m.color }} />
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{m.corto}</span>
                  </span>
                  <span className="mt-1 font-mono text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">
                    E = {num(m.eGPa, 1)} GPa · σ{m.fragil ? "r" : "e"} = {num(m.se, 0)} · σr = {num(m.sr, 0)} MPa
                  </span>
                  <span className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">A = {num(m.aTabla, 1)} % de alargamiento</span>
                </span>
              </label>
            ))}
          </div>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{material.uso}</p>
          {material.nota && (
            <p className="mt-2 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-3 text-sm text-amber-900 dark:text-amber-200">
              {material.nota}
            </p>
          )}
        </fieldset>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${uid}-diam`} className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Diámetro de la probeta d (4 a 20 mm)
            </label>
            <div className="mt-1 flex items-center gap-2">
              <input
                id={`${uid}-diam`}
                type="number"
                min={4}
                max={20}
                step={0.5}
                value={diametro}
                onChange={(ev) => cambiarDiametro(Number(ev.target.value))}
                className="w-28 rounded-xl border border-zinc-300 dark:border-white/15 px-3 py-2 text-[15px] tabular-nums text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <span className="text-sm text-zinc-500 dark:text-zinc-400">mm → A = {num(area, 2)} mm²</span>
            </div>
          </div>
          <div>
            <label htmlFor={`${uid}-l0`} className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Longitud inicial L₀ (20 a 200 mm)
            </label>
            <div className="mt-1 flex items-center gap-2">
              <input
                id={`${uid}-l0`}
                type="number"
                min={20}
                max={200}
                step={5}
                value={l0}
                onChange={(ev) => cambiarL0(Number(ev.target.value))}
                className="w-28 rounded-xl border border-zinc-300 dark:border-white/15 px-3 py-2 text-[15px] tabular-nums text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <span className="text-sm text-zinc-500 dark:text-zinc-400">mm → L = {num(lActual, 3)} mm</span>
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Cambiar el material o la probeta reinicia el ensayo: estás montando una probeta nueva.
        </p>

        {/* Deslizador de fuerza */}
        <div className="mt-5">
          <label htmlFor={`${uid}-f`} className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
            Fuerza aplicada F
          </label>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold tracking-tight tabular-nums text-slate-900 dark:text-slate-100">
              {num(lectura.f, 2)}
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">kN de un máximo de {num(fMax, 2)} kN</span>
          </div>
          <input
            id={`${uid}-f`}
            type="range"
            min={0}
            max={fMax}
            step={fMax / 1000}
            value={clamp(lectura.f, 0, fMax)}
            disabled={rotoYa}
            onChange={(ev) => {
              setAuto(false);
              aplicar(Number(ev.target.value));
            }}
            aria-valuetext={`${num(lectura.f, 2)} kilonewton, tensión ${num(lectura.sigma, 1)} megapascales, ${FASES[fase].rotulo}`}
            className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 dark:bg-white/15 accent-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              background: `linear-gradient(to right, ${
                fase === "plastica" || fase === "carga-max" || fase === "estriccion" ? "#f59e0b" : "#2563eb"
              } ${pctSlider}%, #e4e4e7 ${pctSlider}%)`,
            }}
          />
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            El tope del deslizador es la carga máxima que aguanta esta probeta: F<sub>máx</sub> = σr · A ={" "}
            {num(fMax, 2)} kN. Con el teclado: flechas para afinar, Inicio y Fin para los extremos.
          </p>
        </div>

        {/* Botonera */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={soltar}
            disabled={rotoYa || lectura.f <= 0}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Suelta la fuerza
          </button>
          {auto ? (
            <button
              type="button"
              onClick={() => setAuto(false)}
              className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:hover:bg-slate-600"
            >
              Pausa
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setAuto(true)}
              disabled={rotoYa}
              className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Ensayo automático
            </button>
          )}
          {ensayo.pasadoMax && !rotoYa && !material.fragil && !auto && (
            <button
              type="button"
              onClick={seguirTirando}
              className="rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
            >
              Seguir tirando hasta la rotura
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setAuto(false);
              aplicar(material.fragil ? fMax * 0.97 : fElastico);
            }}
            disabled={rotoYa}
            className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-zinc-50 dark:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {material.fragil ? "Ir al borde de la rotura" : "Ir al límite elástico"}
          </button>
          <button
            type="button"
            onClick={reiniciar}
            className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-zinc-50 dark:hover:bg-white/5"
          >
            Reiniciar
          </button>
        </div>
      </div>

      {/* Panel de instrumentos */}
      <div className="mt-5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Panel de instrumentos</h3>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {rotoYa ? "valores en el instante de la rotura" : "lecturas en vivo"}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-6">
          <Instrumento nombre="fuerza" simbolo="F" formula="dato del ensayo" valor={num(lectura.f, 2)} unidad="kN" />
          <Instrumento nombre="sección" simbolo="A" formula="A = π·d²/4" valor={num(area, 2)} unidad="mm²" />
          <Instrumento
            nombre="tensión"
            simbolo="σ"
            formula="σ = F/A"
            valor={num(lectura.sigma, 1)}
            unidad="MPa"
            tono={fase === "plastica" || fase === "carga-max" || fase === "estriccion" ? "ambar" : "azul"}
          />
          <Instrumento nombre="alargamiento" simbolo="ΔL" formula="ΔL = L − L₀" valor={num(lectura.dL, 3)} unidad="mm" />
          <Instrumento
            nombre="deformación"
            simbolo="ε"
            formula="ε = ΔL/L₀"
            valor={num(lectura.eps * 100, 3)}
            unidad="%"
          />
          <Instrumento
            nombre="c. seguridad"
            simbolo="n"
            formula={material.fragil ? "n = σr/σ" : "n = σe/σ"}
            valor={Number.isFinite(nSeg) ? num(nSeg, 2) : "—"}
            unidad={Number.isFinite(nSeg) ? "" : "sin carga"}
            tono={Number.isFinite(nSeg) && nSeg < 1 ? "rosa" : "zinc"}
          />
        </div>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          1 kN = 1 000 N · 1 MPa = 1 N/mm² · E en GPa = E en MPa entre 1 000 · ε es adimensional y se muestra en %.
          El coeficiente de seguridad n dice cuántas veces cabe la tensión de trabajo dentro de σ
          {material.fragil ? "r" : "e"}: si n es menor que 1, la pieza ya ha fallado.
        </p>
      </div>

      {/* La idea central: la descarga */}
      <div
        className={`mt-5 rounded-2xl border p-5 shadow-sm ${
          lectura.epsPerm > 1e-6 ? "border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10" : "border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10"
        }`}
        aria-live="polite"
      >
        <h3 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Suelta la fuerza: ¿vuelve o se queda?
        </h3>
        {lectura.epsPerm > 1e-6 ? (
          <>
            <p className="mt-2 text-[15px] text-amber-950">
              Has pasado el límite elástico. Si sueltas la fuerza ahora, la probeta <b>no vuelve</b>: se queda con
              una <b>deformación remanente</b> de ε<sub>p</sub> = <b>{num(lectura.epsPerm * 100, 3)} %</b>, es
              decir, <b>{num(lectura.epsPerm * l0, 3)} mm</b> que no se recuperan. La probeta pasa de{" "}
              {num(l0, 0)} mm a <b>{num(l0 + lectura.epsPerm * l0, 3)} mm</b> para siempre.
            </p>
            <p className="mt-2 text-[15px] text-amber-950">
              En la gráfica, la recta de descarga sale del punto actual con la <b>misma pendiente E</b> que el
              tramo elástico: es paralela a él. Por eso no acaba en el origen, sino en ε<sub>p</sub>. Lo que se
              recupera es solo la parte elástica, σ/E = {num((lectura.sigma / eMPa(material)) * 100, 3)} %; el
              resto es deformación plástica y se queda.
            </p>
          </>
        ) : (
          <>
            <p className="mt-2 text-[15px] text-blue-950">
              Mientras no pases el límite elástico (σ{material.fragil ? "r" : "e"} ={" "}
              {num(sigmaRef(material), 0)} MPa), si sueltas la fuerza la probeta vuelve <b>exactamente</b> a sus{" "}
              {num(l0, 0)} mm: ΔL = 0,000 mm y ε<sub>p</sub> = 0,000 %. La energía que has metido estirándola te
              la devuelve entera. Eso es la elasticidad.
            </p>
            <p className="mt-2 text-[15px] text-blue-950">
              {material.fragil
                ? "Con la fundición gris no hay más que esto: es elástica hasta el último instante y después rompe. Nunca llega a quedarse deformada, así que no te avisa. Cambia a acero S275 o a cobre recocido y repite la prueba para ver la otra mitad de la historia."
                : "Tira ahora hasta pasar el límite elástico y vuelve a soltar: verás que la curva de vuelta ya no pasa por el origen. Esa diferencia es toda la diferencia entre doblar un clip y estirar una goma."}
            </p>
          </>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={soltar}
            disabled={rotoYa || lectura.f <= 0}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Suelta la fuerza
          </button>
          <button
            type="button"
            onClick={() => {
              setAuto(false);
              aplicar(fElastico * 0.9);
            }}
            disabled={rotoYa}
            className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-zinc-50 dark:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Probar dentro de la zona elástica
          </button>
          <button
            type="button"
            onClick={() => {
              setAuto(false);
              aplicar(fMax * 0.99);
            }}
            disabled={rotoYa || material.fragil}
            className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-zinc-50 dark:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Probar en plena zona plástica
          </button>
        </div>
      </div>

      {/* Explicación de la fase */}
      <div className="mt-5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm" aria-live="polite">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${FASES[fase].pastilla}`}>
            {FASES[fase].rotulo}
          </span>
          <h3 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100">{explicacion.titulo}</h3>
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">{explicacion.cuerpo}</p>
        <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400 sm:grid-cols-2">
          <div className="flex justify-between gap-3 border-b border-zinc-100 dark:border-white/5 py-1">
            <dt>{material.fragil ? "Sin límite elástico: rompe en" : "Límite elástico σe"}</dt>
            <dd className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
              {num(material.se, 0)} MPa (ε = {num(epsElastico(material) * 100, 3)} %)
            </dd>
          </div>
          <div className="flex justify-between gap-3 border-b border-zinc-100 dark:border-white/5 py-1">
            <dt>Resistencia a tracción σr</dt>
            <dd className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
              {num(material.sr, 0)} MPa (ε = {num(epsMaxCarga(material) * 100, 2)} %)
            </dd>
          </div>
          <div className="flex justify-between gap-3 border-b border-zinc-100 dark:border-white/5 py-1">
            <dt>{material.fragil ? "Fuerza que la parte" : "Fuerza en el límite elástico"}</dt>
            <dd className="font-mono tabular-nums text-slate-900 dark:text-slate-100">{num(fElastico, 2)} kN</dd>
          </div>
          <div className="flex justify-between gap-3 border-b border-zinc-100 dark:border-white/5 py-1">
            <dt>Fuerza máxima de la probeta</dt>
            <dd className="font-mono tabular-nums text-slate-900 dark:text-slate-100">{num(fMax, 2)} kN</dd>
          </div>
        </dl>
      </div>

      {/* Comparador */}
      <div className="mt-5 rounded-2xl bg-slate-900 p-4 shadow-sm sm:p-5">
        <h3 className="text-lg font-extrabold tracking-tight text-white">Los cinco, en los mismos ejes</h3>
        <p className="mt-1 text-sm text-slate-400">
          Aquí las escalas no cambian: así se ve de golpe quién es rígido, quién es tenaz y quién es frágil. La
          curva del material que tienes montado va resaltada.
        </p>
        <div className="mt-3">
          <Comparador activo={matId} />
        </div>
        <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-3">
          {MATERIALES.map((m) => (
            <li key={m.id} className="flex items-center gap-2 text-sm text-slate-300">
              <span className="h-3 w-3 flex-none rounded-full" style={{ backgroundColor: m.color }} />
              <span className={m.id === matId ? "font-bold text-white" : ""}>{m.corto}</span>
              <span className="font-mono text-xs text-slate-400">
                σr {num(m.sr, 0)} MPa · A {num(m.aTabla, 1)} %
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-slate-400">
          La <b className="text-pink-300">fundición gris</b> es esa rayita casi vertical pegada al eje: sube
          rápido y se corta. El <b className="text-orange-300">cobre recocido</b> es lo contrario: sube poco pero
          llega al 45 % de alargamiento. Área bajo la curva = energía que absorbe el material antes de romper.
          Eso es la <b>tenacidad</b>, y es la razón por la que un chasis se hace de acero y no de fundición.
        </p>
      </div>

      {/* Retos */}
      <div className="mt-5">
        <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Tres retos de dimensionado</h3>
        <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
          Los mismos que caen en el examen: se resuelven con σ = F/A, A = π·d²/4 y el coeficiente de seguridad.
          Escribe tu respuesta y la app te corrige el razonamiento paso a paso.
        </p>
        <div className="mt-3 space-y-4">
          <Reto1 />
          <Reto2 />
          <Reto3 />
        </div>
      </div>

      {/* Pie */}
      <p className="mt-5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 p-4 text-sm text-zinc-600 dark:text-zinc-400">
        <b>Valores orientativos.</b> Las constantes de los cinco materiales están redondeadas a partir de tablas
        técnicas habituales y sirven para aprender el método, no para calcular una estructura real: en un
        proyecto se usan los valores del certificado del fabricante y los coeficientes de seguridad que fije la
        normativa. La curva del modelo es la <b>curva de ingeniería</b> (σ y ε referidos a la sección y la
        longitud <i>iniciales</i>), que es la que se dibuja en Bachillerato; la curva real o verdadera, referida
        a la sección instantánea, no baja después de la carga máxima.
      </p>
    </section>
  );
}
