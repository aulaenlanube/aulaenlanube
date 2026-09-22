"use client";

import { useId, useState, type ReactNode } from "react";

// ════════════════════════════════════════════════════════════════════════════
// Piezas comunes de los diagramas de la ponencia.
//
// Mismo lenguaje visual que los diagramas de la Sesión 2 del curso de
// programación con IA: paleta fija, geometría calculada (nunca «a ojo»),
// tipografía que no baja de 16 unidades = 16 px, y flechas con <marker> en
// userSpaceOnUse para que la punta caiga exactamente donde acaba el trazo.
//
// ── REGLAS DE GEOMETRÍA (respétalas al reeditar) ────────────────────────────
//  · Los diagramas se pintan 1:1 (maxWidth = minWidth = ancho del viewBox):
//    un fontSize de 16 se ve SIEMPRE a 16 px, también en móvil, donde el
//    diagrama se desliza en horizontal. Nada de texto por debajo de 16.
//  · Anchos: ANCHO (560) para los diagramas en columna, MEDIO (680) para los
//    de dos columnas y AMPLIO (860) para los mapas. Todos caben en el
//    contenedor de la ponencia (max-w-5xl → 992 px útiles) sin recortarse.
//  · Márgenes: ningún elemento a menos de 12 unidades del borde del viewBox.
//  · FLECHAS: un <marker> por tono, markerUnits="userSpaceOnUse", refX = 10
//    (la punta cae EXACTAMENTE al final del trazo) y orient="auto". Por eso
//    todo trazo que apunta a una caja termina a 6 unidades de su borde.
//  · Los ids de <marker>, degradados y paneles se prefijan con useId(): dos
//    instancias del mismo diagrama en una página no comparten ids.
//  · Medida de texto: anchoTexto() estima la caja en la pila sans (Inter).
//    Sirve para centrar y para decidir saltos de línea, no para maquetar al
//    píxel: cuando algo tiene que encajar exacto, usa el modo monoespaciado.
// ════════════════════════════════════════════════════════════════════════════

// Los colores son tokens CSS (app/globals.css): el mismo dibujo se adapta al
// tema claro/oscuro sin JavaScript. Si alguna vez hay que serializar estos SVG
// para rasterizarlos aislados (como en el PDF de Adaptaciones PT), habrá que
// resolver los `var()` antes: fuera del documento no tienen valor.
// ── Paleta ──────────────────────────────────────────────────────────────────
export const TONOS = {
  azul: { linea: "var(--dg-azul-linea)", fuerte: "var(--dg-azul-fuerte)", suave: "var(--dg-azul-suave)", borde: "var(--dg-azul-borde)" },
  morado: { linea: "var(--dg-morado-linea)", fuerte: "var(--dg-morado-fuerte)", suave: "var(--dg-morado-suave)", borde: "var(--dg-morado-borde)" },
  verde: { linea: "var(--dg-verde-linea)", fuerte: "var(--dg-verde-fuerte)", suave: "var(--dg-verde-suave)", borde: "var(--dg-verde-borde)" },
  ambar: { linea: "var(--dg-ambar-linea)", fuerte: "var(--dg-ambar-fuerte)", suave: "var(--dg-ambar-suave)", borde: "var(--dg-ambar-borde)" },
  rosa: { linea: "var(--dg-rosa-linea)", fuerte: "var(--dg-rosa-fuerte)", suave: "var(--dg-rosa-suave)", borde: "var(--dg-rosa-borde)" },
  gris: { linea: "var(--dg-gris-linea)", fuerte: "var(--dg-gris-fuerte)", suave: "var(--dg-gris-suave)", borde: "var(--dg-gris-borde)" },
} as const;

export type Tono = keyof typeof TONOS;

export const FONDO = "var(--dg-fondo)"; // fondo de la tarjeta: también es el halo de los nodos
export const TINTA = "var(--dg-tinta)";
export const SUAVE = "var(--dg-suave)";
export const TENUE = "var(--dg-tenue)";

// ── Métricas ────────────────────────────────────────────────────────────────
export const ANCHO = 560; // diagrama en columna
export const MEDIO = 680; // diagrama a dos columnas
export const AMPLIO = 860; // mapa ancho

export const FS = 16; // tamaño base (mínimo legible en móvil)
export const FS_TIT = 18; // títulos dentro de caja
export const FS_GRANDE = 22; // cifras y rótulos protagonistas
const SANS = 0.53; // avance medio por carácter en la pila sans, peso normal
const SANS_BOLD = 0.57; // ídem en negrita
const MONO = 0.62; // avance por carácter en la pila monoespaciada

export const anchoTexto = (texto: string, fs = FS, negrita = false) =>
  texto.length * fs * (negrita ? SANS_BOLD : SANS);
export const anchoMono = (texto: string, fs = FS) => texto.length * fs * MONO;

/**
 * Parte un texto en líneas de como mucho `max` caracteres sin romper palabras.
 * Se usa para que los textos largos dentro de una caja quepan sin salirse: el
 * número de líneas que devuelve determina la altura de la caja, así que
 * calcula SIEMPRE con esta función en vez de contar líneas a mano.
 */
export function parteEnLineas(texto: string, max: number): string[] {
  const palabras = texto.split(" ");
  const lineas: string[] = [];
  let actual = "";
  for (const p of palabras) {
    if (!actual) actual = p;
    else if (`${actual} ${p}`.length <= max) actual = `${actual} ${p}`;
    else {
      lineas.push(actual);
      actual = p;
    }
  }
  if (actual) lineas.push(actual);
  return lineas;
}

// ── Contexto de interacción ─────────────────────────────────────────────────
export type Paso = {
  id: string;
  tono: Tono;
  titulo: string;
  texto: string;
  ejemplo?: string; // fragmento literal (se pinta en caja monoespaciada)
  clave?: string; // idea de una línea, en verde
};

export type Ctx = {
  sel: string | null;
  activar: (id: string) => void;
  panelId: string;
  uid: string;
};

// ── Marcadores de punta de flecha (uno por tono) ────────────────────────────
function Marcadores({ uid }: { uid: string }) {
  return (
    <defs>
      {(Object.keys(TONOS) as Tono[]).map((t) => (
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
          <path d="M0 0 L10 4 L0 8 Z" fill={TONOS[t].linea} />
        </marker>
      ))}
    </defs>
  );
}

// ── Trazos ──────────────────────────────────────────────────────────────────

export function Tramo({
  x1,
  y1,
  x2,
  y2,
  tono,
  uid,
  punta = true,
  discontinuo = false,
  grosor = 3,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tono: Tono;
  uid: string;
  punta?: boolean;
  discontinuo?: boolean;
  grosor?: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={TONOS[tono].linea}
      strokeWidth={grosor}
      strokeLinecap="butt"
      strokeDasharray={discontinuo ? "7 6" : undefined}
      markerEnd={punta ? `url(#${uid}-${tono})` : undefined}
    />
  );
}

export function Curva({
  d,
  tono,
  uid,
  punta = true,
  discontinua = false,
  grosor = 3,
}: {
  d: string;
  tono: Tono;
  uid: string;
  punta?: boolean;
  discontinua?: boolean;
  grosor?: number;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={TONOS[tono].linea}
      strokeWidth={grosor}
      strokeLinecap="butt"
      strokeDasharray={discontinua ? "7 6" : undefined}
      markerEnd={punta ? `url(#${uid}-${tono})` : undefined}
    />
  );
}

// ── Rótulos ─────────────────────────────────────────────────────────────────

export const Rotulo = ({
  x,
  y,
  texto,
  color = SUAVE,
  peso = 500,
  tam = FS,
  ancla = "start",
  mono = false,
}: {
  x: number;
  y: number;
  texto: string;
  color?: string;
  peso?: number;
  tam?: number;
  ancla?: "start" | "middle" | "end";
  mono?: boolean;
}) => (
  <text
    x={x}
    y={y}
    fontSize={tam}
    fontWeight={peso}
    fill={color}
    textAnchor={ancla}
    className={mono ? "font-mono" : undefined}
  >
    {texto}
  </text>
);

/** Varias líneas de texto con interlineado fijo, ancladas por su primera línea. */
export const Parrafo = ({
  x,
  y,
  lineas,
  color = SUAVE,
  peso = 400,
  tam = FS,
  interlineado = 21,
  ancla = "start",
}: {
  x: number;
  y: number;
  lineas: string[];
  color?: string;
  peso?: number;
  tam?: number;
  interlineado?: number;
  ancla?: "start" | "middle" | "end";
}) => (
  <text x={x} y={y} fontSize={tam} fontWeight={peso} fill={color} textAnchor={ancla}>
    {lineas.map((l, i) => (
      <tspan key={l + i} x={x} dy={i === 0 ? 0 : interlineado}>
        {l}
      </tspan>
    ))}
  </text>
);

/** Píldora: etiqueta corta con fondo del tono. Altura fija de 28. */
export function Pildora({
  x,
  y,
  texto,
  tono,
  mono = false,
  alto = 28,
}: {
  x: number;
  y: number;
  texto: string;
  tono: Tono;
  mono?: boolean;
  alto?: number;
}) {
  const t = TONOS[tono];
  const w = 22 + (mono ? anchoMono(texto) : anchoTexto(texto, FS, true));
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={alto}
        rx={alto / 2}
        fill={t.suave}
        stroke={t.linea}
        strokeWidth={1.5}
      />
      <text
        x={x + 11}
        y={y + alto / 2 + 5.6}
        fontSize={FS}
        fontWeight={700}
        fill={t.fuerte}
        className={mono ? "font-mono" : undefined}
      >
        {texto}
      </text>
    </g>
  );
}

/** Ancho que ocupa una píldora, para colocar lo que va detrás. */
export const anchoPildora = (texto: string, mono = false) =>
  22 + (mono ? anchoMono(texto) : anchoTexto(texto, FS, true));

/** Disco numerado: el «1», «2», «3» de las secuencias. */
export function Numero({
  cx,
  cy,
  n,
  tono,
  r = 17,
}: {
  cx: number;
  cy: number;
  n: number | string;
  tono: Tono;
  r?: number;
}) {
  const t = TONOS[tono];
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 4} fill={FONDO} />
      <circle cx={cx} cy={cy} r={r} fill={t.linea} stroke="var(--dg-fondo)" strokeWidth={3} />
      <text
        x={cx}
        y={cy + 6}
        fontSize={FS}
        fontWeight={800}
        fill="var(--dg-sobre-tono)"
        textAnchor="middle"
      >
        {n}
      </text>
    </g>
  );
}

// ── Interacción ─────────────────────────────────────────────────────────────

/**
 * Envoltorio pulsable: ratón, dedo y teclado (Enter / Espacio). El anillo de
 * foco se pinta con :focus-visible, así que el teclado siempre deja marca.
 */
export function Zona({
  ctx,
  paso,
  etiqueta,
  children,
}: {
  ctx: Ctx;
  paso: string;
  etiqueta: string;
  children: ReactNode;
}) {
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={etiqueta}
      aria-pressed={ctx.sel === paso}
      aria-describedby={ctx.panelId}
      onClick={() => ctx.activar(paso)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
          e.preventDefault();
          ctx.activar(paso);
        }
      }}
      className="group cursor-pointer outline-none"
    >
      {children}
    </g>
  );
}

/**
 * Caja pulsable con título, cuerpo opcional y una franja del tono a la
 * izquierda. Es la pieza que más se repite: un concepto del diagrama.
 * Los anillos de hover / foco / selección van por fuera del borde.
 */
export function Caja({
  x,
  y,
  w,
  h,
  tono,
  ctx,
  paso,
  titulo,
  lineas,
  etiqueta,
  franja = true,
  relleno,
  mono = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tono: Tono;
  ctx: Ctx;
  paso: string;
  titulo: string;
  lineas?: string[];
  etiqueta?: string;
  franja?: boolean;
  relleno?: string;
  mono?: boolean;
}) {
  const t = TONOS[tono];
  const activo = ctx.sel === paso;
  const px = franja ? 20 : 14; // sangría interior a la derecha de la franja
  return (
    <Zona ctx={ctx} paso={paso} etiqueta={etiqueta ?? `Ver: ${titulo}`}>
      <rect
        x={x - 5}
        y={y - 5}
        width={w + 10}
        height={h + 10}
        rx={16}
        fill="none"
        stroke={t.borde}
        strokeWidth={3}
        className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        fill={activo ? t.suave : (relleno ?? "var(--dg-papel)")}
        stroke={t.linea}
        strokeWidth={activo ? 2.5 : 1.5}
        style={{ transition: "fill 150ms ease, stroke-width 150ms ease" }}
      />
      {franja ? <rect x={x} y={y + 8} width={5} height={h - 16} rx={2.5} fill={t.linea} /> : null}
      <rect
        x={x - 8}
        y={y - 8}
        width={w + 16}
        height={h + 16}
        rx={18}
        fill="none"
        stroke={TINTA}
        strokeWidth={2}
        strokeDasharray="5 4"
        className="opacity-0 group-focus-visible:opacity-100"
      />
      <text
        x={x + px}
        y={y + 25}
        fontSize={FS_TIT}
        fontWeight={700}
        fill={t.fuerte}
        className={mono ? "font-mono" : undefined}
      >
        {titulo}
      </text>
      {lineas?.length ? (
        <Parrafo x={x + px} y={y + 50} lineas={lineas} color={SUAVE} tam={FS} interlineado={21} />
      ) : null}
    </Zona>
  );
}

/** Altura que necesita una Caja con `n` líneas de cuerpo. */
export const altoCaja = (n: number) => (n === 0 ? 44 : 40 + 21 * n + 8);

/**
 * Apila una lista en vertical y devuelve cada elemento con su `y` y su `h`.
 * Se llama SIEMPRE en el ámbito del módulo, nunca dentro de un componente:
 * los datos de los diagramas son fijos, así que el reparto se calcula una vez
 * al cargar y el render se limita a pintar.
 */
export function apilar<T>(
  items: T[],
  altoDe: (t: T) => number,
  hueco: number,
  y0: number,
): (T & { y: number; h: number })[] {
  const salida: (T & { y: number; h: number })[] = [];
  let y = y0;
  for (const it of items) {
    const h = altoDe(it);
    salida.push({ ...it, y, h });
    y += h + hueco;
  }
  return salida;
}

/** Alto total que ocupa lo apilado por `apilar`, con su margen inferior. */
export const altoApilado = <T extends { y: number; h: number }>(items: T[], margen: number) =>
  (items.length ? items[items.length - 1].y + items[items.length - 1].h : 0) + margen;

/** Nodo redondo pulsable (para ciclos y grafos). */
export function Nodo({
  cx,
  cy,
  r,
  tono,
  ctx,
  paso,
  etiqueta,
  lineas,
  n,
}: {
  cx: number;
  cy: number;
  r: number;
  tono: Tono;
  ctx: Ctx;
  paso: string;
  etiqueta: string;
  lineas: string[];
  n?: number | string;
}) {
  const t = TONOS[tono];
  const activo = ctx.sel === paso;
  const base = cy - ((lineas.length - 1) * 20) / 2 + 6;
  return (
    <Zona ctx={ctx} paso={paso} etiqueta={etiqueta}>
      <circle cx={cx} cy={cy} r={r + 7} fill={FONDO} />
      <circle
        cx={cx}
        cy={cy}
        r={r + 6}
        fill="none"
        stroke={t.borde}
        strokeWidth={3}
        className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={activo ? t.suave : "var(--dg-papel)"}
        stroke={t.linea}
        strokeWidth={activo ? 3.5 : 2.5}
        style={{ transition: "fill 150ms ease, stroke-width 150ms ease" }}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r + 10}
        fill="none"
        stroke={TINTA}
        strokeWidth={2}
        strokeDasharray="5 4"
        className="opacity-0 group-focus-visible:opacity-100"
      />
      {n !== undefined ? <Numero cx={cx} cy={cy - r} n={n} tono={tono} r={14} /> : null}
      <Parrafo
        x={cx}
        y={base}
        lineas={lineas}
        color={t.fuerte}
        peso={700}
        tam={FS}
        interlineado={20}
        ancla="middle"
      />
    </Zona>
  );
}

// ── Panel de detalle ────────────────────────────────────────────────────────

function Panel({ paso, panelId, cerrar }: { paso: Paso | null; panelId: string; cerrar: () => void }) {
  return (
    <div id={panelId} aria-live="polite" className="mt-3">
      {paso ? (
        <div
          className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-3.5 shadow-sm"
          style={{ borderLeftWidth: 6, borderLeftColor: TONOS[paso.tono].linea }}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100">{paso.titulo}</p>
            <button
              type="button"
              onClick={cerrar}
              className="shrink-0 rounded-lg border border-zinc-300 dark:border-white/15 px-2.5 py-1 text-[12px] font-semibold text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-100 dark:hover:bg-white/10"
            >
              cerrar ✕
            </button>
          </div>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">{paso.texto}</p>
          {paso.ejemplo ? (
            <pre className="mt-2.5 overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-zinc-900 px-3 py-2.5 font-mono text-[13px] leading-relaxed text-zinc-100">
              {paso.ejemplo}
            </pre>
          ) : null}
          {paso.clave ? (
            <p className="mt-2.5 rounded-lg border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-2 text-[14px] font-semibold text-emerald-900 dark:text-emerald-200">
              {paso.clave}
            </p>
          ) : null}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-zinc-300 dark:border-white/15 bg-white/70 dark:bg-white/5 px-3.5 py-2.5 text-[13px] text-zinc-500 dark:text-zinc-400">
          Toca cualquier pieza del diagrama y aquí te cuento qué hace y por qué está ahí.
        </p>
      )}
    </div>
  );
}

// ── Lienzo común ────────────────────────────────────────────────────────────

export function Lienzo({
  ancho,
  alto,
  etiqueta,
  pie,
  pasos,
  dibuja,
}: {
  ancho: number;
  alto: number;
  etiqueta: string;
  pie: string;
  pasos: Paso[];
  dibuja: (ctx: Ctx) => ReactNode;
}) {
  const [sel, setSel] = useState<string | null>(null);
  const bruto = useId();
  const uid = `p${bruto.replace(/[^a-zA-Z0-9]/g, "")}`;
  const panelId = `${uid}-panel`;
  const ctx: Ctx = {
    sel,
    panelId,
    uid,
    activar: (id) => setSel((actual) => (actual === id ? null : id)),
  };
  const activo = pasos.find((p) => p.id === sel) ?? null;
  return (
    <figure className="mt-5 rounded-2xl border border-zinc-200 dark:border-white/10 p-3 sm:p-4" style={{ background: FONDO }}>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${ancho} ${alto}`}
          role="group"
          aria-label={etiqueta}
          className="mx-auto block w-full"
          style={{ maxWidth: ancho, minWidth: ancho }}
        >
          <Marcadores uid={uid} />
          {dibuja(ctx)}
        </svg>
      </div>
      <p className="mt-1 text-center text-[12px] text-zinc-400 dark:text-zinc-400 lg:hidden">
        Desliza el diagrama de lado para verlo entero
      </p>
      <Panel paso={activo} panelId={panelId} cerrar={() => setSel(null)} />
      <figcaption className="mt-2 text-center text-[13px] font-medium text-zinc-500 dark:text-zinc-400">{pie}</figcaption>
    </figure>
  );
}
