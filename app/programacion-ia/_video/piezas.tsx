import type { ReactNode } from "react";
import Link from "@/components/Link";
import PromptBlock from "@/components/PromptBlock";
import BotonCopiar from "./copiar";
import { pintar, type Kind } from "./resaltado";

// ════════════════════════════════════════════════════════════════════════════
// Piezas de las páginas que se graban para los vídeos del curso (serie
// «Programación con IA · Tutoriales en pantalla»). Reglas completas en
// docs/paginas-para-video.md. Lo esencial:
//  · Un bloque (<section data-bloque>) = una idea = una pantalla: cabe en
//    1100×620 CSS a 1280×720. Lo comprueba tools/video/revisar-pagina.mjs.
//  · Cada parte que la cámara pueda enfocar es un elemento con su propio texto,
//    corto y único (la cámara busca «etiqueta:texto con que empieza»).
//  · Nada por debajo de 16 px, nada fijo, nada que solo se vea al pasar el ratón.
//  · Clases de Tailwind siempre literales: cada tono lleva sus cadenas enteras.
// ════════════════════════════════════════════════════════════════════════════

export const TONO = {
  azul: {
    caja: "border-blue-200 bg-blue-50 dark:border-blue-500/30 dark:bg-blue-500/10",
    texto: "text-blue-700 dark:text-blue-300",
    tinta: "text-blue-950 dark:text-blue-100",
    chip: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-500/30 dark:bg-blue-500/15 dark:text-blue-200",
    disco: "bg-blue-600 text-white dark:bg-blue-500 dark:text-slate-950",
    linea: "border-blue-500 dark:border-blue-400",
  },
  verde: {
    caja: "border-emerald-200 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10",
    texto: "text-emerald-700 dark:text-emerald-300",
    tinta: "text-emerald-950 dark:text-emerald-100",
    chip: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-200",
    disco: "bg-emerald-700 text-white dark:bg-emerald-500 dark:text-slate-950",
    linea: "border-emerald-500 dark:border-emerald-400",
  },
  ambar: {
    caja: "border-amber-200 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10",
    texto: "text-amber-700 dark:text-amber-300",
    tinta: "text-amber-950 dark:text-amber-100",
    chip: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-200",
    disco: "bg-amber-500 text-zinc-950 dark:bg-amber-400 dark:text-slate-950",
    linea: "border-amber-500 dark:border-amber-400",
  },
  rosa: {
    caja: "border-rose-200 bg-rose-50 dark:border-rose-500/30 dark:bg-rose-500/10",
    texto: "text-rose-700 dark:text-rose-300",
    tinta: "text-rose-950 dark:text-rose-100",
    chip: "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/15 dark:text-rose-200",
    disco: "bg-rose-600 text-white dark:bg-rose-500 dark:text-slate-950",
    linea: "border-rose-500 dark:border-rose-400",
  },
  morado: {
    caja: "border-violet-200 bg-violet-50 dark:border-violet-500/30 dark:bg-violet-500/10",
    texto: "text-violet-700 dark:text-violet-300",
    tinta: "text-violet-950 dark:text-violet-100",
    chip: "border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-500/30 dark:bg-violet-500/15 dark:text-violet-200",
    disco: "bg-violet-600 text-white dark:bg-violet-500 dark:text-slate-950",
    linea: "border-violet-500 dark:border-violet-400",
  },
  gris: {
    caja: "border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/5",
    texto: "text-zinc-700 dark:text-zinc-200",
    tinta: "text-zinc-900 dark:text-zinc-100",
    chip: "border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-white/15 dark:bg-white/10 dark:text-zinc-200",
    disco: "bg-zinc-700 text-white dark:bg-zinc-300 dark:text-slate-950",
    linea: "border-zinc-400 dark:border-zinc-500",
  },
} as const;

export type Tono = keyof typeof TONO;

export const cls = {
  tarjeta: "rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900",
  suave: "rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/5",
  texto: "text-base leading-relaxed text-zinc-700 dark:text-zinc-300",
  tenue: "text-base leading-relaxed text-zinc-600 dark:text-zinc-400",
  fuerte: "font-semibold text-zinc-900 dark:text-zinc-100",
  enlace: "font-semibold text-blue-700 underline underline-offset-2 dark:text-blue-300",
  codigo: "rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-zinc-800 [overflow-wrap:anywhere] dark:bg-white/10 dark:text-zinc-100",
};

type Nivel = 2 | 3 | 4;

function H({ nivel, className, children }: { nivel: Nivel; className: string; children: ReactNode }) {
  if (nivel === 2) return <h2 className={className}>{children}</h2>;
  if (nivel === 3) return <h3 className={className}>{children}</h3>;
  return <h4 className={className}>{children}</h4>;
}

const TITULO: Record<Nivel, string> = {
  2: "text-[32px] font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50",
  3: "text-[26px] font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50",
  4: "text-xl font-bold text-zinc-900 dark:text-zinc-100",
};

/** Código en línea dentro de un texto. */
export function C({ children }: { children: ReactNode }) {
  return <code className={cls.codigo}>{children}</code>;
}

/** Píldora corta: «Agentes», «Semana 2», «subagente»… */
export function Chip({ tono = "azul", children }: { tono?: Tono; children: ReactNode }) {
  return (
    <span className={`inline-block rounded-full border px-3 py-0.5 text-base font-semibold ${TONO[tono].chip}`}>
      {children}
    </span>
  );
}

// ── Bloque: la unidad de grabación ──────────────────────────────────────────

// Ancho de la columna de código cuando el bloque va a dos columnas (`junto`).
const JUNTO = {
  600: "lg:grid-cols-[minmax(0,1fr)_minmax(0,600px)]",
  700: "lg:grid-cols-[minmax(0,1fr)_minmax(0,700px)]",
  760: "lg:grid-cols-[minmax(0,1fr)_minmax(0,760px)]",
} as const;

type Junto = { junto?: ReactNode; anchoJunto?: keyof typeof JUNTO };

/**
 * Esqueleto común de Bloque y Paso. Con `junto`, el bloque va a dos columnas:
 * título, entradilla y contenido a la izquierda y `junto` (un fichero largo) a
 * la derecha, para que el código quepa en la misma pantalla que su explicación.
 * En móvil, el texto va primero.
 */
function Seccion({
  id,
  cabecera,
  entradilla,
  junto,
  anchoJunto = 600,
  children,
}: Junto & { id?: string; cabecera: ReactNode; entradilla?: ReactNode; children?: ReactNode }) {
  const intro = entradilla ? (
    <p className={`mt-3 max-w-4xl leading-relaxed text-zinc-700 dark:text-zinc-300 ${junto ? "text-base" : "text-lg"}`}>
      {entradilla}
    </p>
  ) : null;
  return (
    <section id={id} data-bloque className="mt-16 max-w-[1100px] scroll-mt-24">
      {junto ? (
        <div className={`grid grid-cols-1 gap-6 ${JUNTO[anchoJunto]}`}>
          <div className="min-w-0">
            {cabecera}
            {intro}
            {children ? <div className="mt-4">{children}</div> : null}
          </div>
          <div className="min-w-0">{junto}</div>
        </div>
      ) : (
        <>
          {cabecera}
          {intro}
          {children ? <div className="mt-6">{children}</div> : null}
        </>
      )}
    </section>
  );
}

/**
 * Una pantalla del vídeo. `etiqueta` es la sección a la que pertenece (va
 * encima del título, como antetítulo); `entradilla`, la frase que lo presenta.
 */
export function Bloque({
  id,
  titulo,
  nivel = 2,
  etiqueta,
  ...resto
}: Junto & {
  id?: string;
  titulo: string;
  nivel?: 2 | 3;
  etiqueta?: string;
  entradilla?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Seccion
      id={id}
      {...resto}
      cabecera={
        <>
          {etiqueta ? (
            <p className="mb-2 text-base font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">{etiqueta}</p>
          ) : null}
          <H nivel={nivel} className={TITULO[nivel]}>
            {titulo}
          </H>
        </>
      }
    />
  );
}

/** Un paso numerado: el título siempre empieza por «Paso N · ». */
export function Paso({
  id,
  n,
  titulo,
  ...resto
}: Junto & {
  id?: string;
  n: number;
  titulo: string;
  entradilla?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Seccion
      id={id}
      {...resto}
      cabecera={
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-2xl font-extrabold text-white dark:bg-blue-500 dark:text-slate-950"
          >
            {n}
          </span>
          <h2 className={TITULO[2]}>
            Paso {n} · {titulo}
          </h2>
        </div>
      }
    />
  );
}

/** Bloque-aviso: una idea que hay que retener, en caja tintada con su título. */
export function Aviso({
  id,
  titulo,
  tono = "ambar",
  icono,
  children,
}: {
  id?: string;
  titulo: string;
  tono?: Tono;
  icono?: ReactNode;
  children: ReactNode;
}) {
  const t = TONO[tono];
  return (
    <section id={id} data-bloque className={`mt-16 max-w-[1100px] scroll-mt-24 rounded-2xl border p-6 ${t.caja}`}>
      <div className="flex items-center gap-3">
        {icono}
        <h3 className={`text-[26px] font-bold leading-tight tracking-tight ${t.tinta}`}>{titulo}</h3>
      </div>
      <div className={`mt-3 space-y-3 text-lg leading-relaxed ${t.tinta}`}>{children}</div>
    </section>
  );
}

// ── Tarjetas y listas ───────────────────────────────────────────────────────

export function Tarjeta({
  titulo,
  nivel = 3,
  tono,
  antetitulo,
  mono = false,
  suave = false,
  className = "",
  children,
}: {
  titulo: string;
  nivel?: Nivel;
  tono?: Tono;
  antetitulo?: string;
  mono?: boolean;
  suave?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`${suave ? cls.suave : cls.tarjeta} min-w-0 ${className}`}>
      {antetitulo ? (
        <p className={`text-base font-bold uppercase tracking-wider ${tono ? TONO[tono].texto : "text-zinc-600 dark:text-zinc-400"}`}>
          {antetitulo}
        </p>
      ) : null}
      <H
        nivel={nivel}
        className={`text-xl font-bold ${mono ? "font-mono" : ""} ${tono ? TONO[tono].texto : "text-zinc-900 dark:text-zinc-100"}`}
      >
        {titulo}
      </H>
      {children ? <div className={`mt-2 ${cls.texto}`}>{children}</div> : null}
    </div>
  );
}

/** Lista con viñeta; cada punto es un <li> con su texto. */
export function Lista({ items, className = "" }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={`list-disc space-y-1.5 pl-5 marker:text-zinc-400 ${className}`}>
      {items.map((x, i) => (
        <li key={i}>{x}</li>
      ))}
    </ul>
  );
}

// ── Dos columnas: chat frente a agente, plan frente a build… ────────────────

export type Columna = {
  titulo: string;
  antetitulo?: string;
  tono: Tono;
  puntos: ReactNode[];
  pie?: ReactNode;
};

export function DosColumnas({ a, b, nivel = 3, centro = "frente a" }: { a: Columna; b: Columna; nivel?: Nivel; centro?: string }) {
  const col = (c: Columna) => (
    <div className={`min-w-0 rounded-2xl border-2 bg-white p-6 dark:bg-slate-900 ${TONO[c.tono].linea}`}>
      {c.antetitulo ? (
        <p className={`text-base font-bold uppercase tracking-wider ${TONO[c.tono].texto}`}>{c.antetitulo}</p>
      ) : null}
      <H nivel={nivel} className={`text-2xl font-extrabold ${TONO[c.tono].texto}`}>
        {c.titulo}
      </H>
      <ul className={`mt-3 list-disc space-y-2 pl-5 ${cls.texto} marker:text-zinc-400`}>
        {c.puntos.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
      {c.pie ? <div className={`mt-4 ${cls.texto}`}>{c.pie}</div> : null}
    </div>
  );
  return (
    <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
      {col(a)}
      <div className="flex items-center justify-center" aria-hidden>
        <span className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-base font-bold text-zinc-600 dark:border-white/15 dark:bg-slate-800 dark:text-zinc-300">
          {centro}
        </span>
      </div>
      {col(b)}
    </div>
  );
}

// ── Permisos: allow / ask / deny ────────────────────────────────────────────

export type TipoPermiso = "allow" | "ask" | "deny";

const PERMISO: Record<TipoPermiso, { tono: Tono; circulo: string; trazo: string }> = {
  allow: { tono: "verde", circulo: "fill-emerald-600 dark:fill-emerald-400", trazo: "stroke-white dark:stroke-slate-950" },
  ask: { tono: "ambar", circulo: "fill-amber-500 dark:fill-amber-400", trazo: "stroke-zinc-950 dark:stroke-slate-950" },
  deny: { tono: "rosa", circulo: "fill-rose-600 dark:fill-rose-400", trazo: "stroke-white dark:stroke-slate-950" },
};

/** Icono de permiso: ✓ (allow), ? (ask) o prohibido (deny). Decorativo. */
export function IconoPermiso({ tipo, tam = 28 }: { tipo: TipoPermiso; tam?: number }) {
  const p = PERMISO[tipo];
  return (
    <svg viewBox="0 0 24 24" width={tam} height={tam} aria-hidden className="shrink-0">
      <circle cx={12} cy={12} r={12} className={p.circulo} />
      {tipo === "allow" ? (
        <path d="M6.5 12.5 L10.5 16.5 L17.5 8" fill="none" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" className={p.trazo} />
      ) : tipo === "ask" ? (
        <>
          <path d="M9 9.2 a3 3 0 1 1 4.6 2.5 c-1 .6 -1.6 1.2 -1.6 2.4" fill="none" strokeWidth={2.4} strokeLinecap="round" className={p.trazo} />
          <circle cx={12} cy={17.6} r={0.6} strokeWidth={2.2} className={p.trazo} />
        </>
      ) : (
        <path d="M7 12 H17" fill="none" strokeWidth={3} strokeLinecap="round" className={p.trazo} />
      )}
    </svg>
  );
}

export function Permiso({ tipo, texto }: { tipo: TipoPermiso; texto: string }) {
  const t = TONO[PERMISO[tipo].tono];
  return (
    <div className={`rounded-2xl border p-5 ${t.caja}`}>
      <div className="flex items-center gap-3">
        <IconoPermiso tipo={tipo} tam={40} />
        <h3 className={`font-mono text-[28px] font-extrabold ${t.tinta}`}>{tipo}</h3>
      </div>
      <p className={`mt-3 text-lg ${t.tinta}`}>{texto}</p>
    </div>
  );
}

/** Una regla de permisos con su veredicto a la vista y lo que significa. */
export function Regla({ tipo, regla, children }: { tipo: TipoPermiso; regla: string; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <IconoPermiso tipo={tipo} />
      <div className="min-w-0">
        <code className="font-mono text-base font-bold text-zinc-900 [overflow-wrap:anywhere] dark:text-zinc-100">{regla}</code>
        <p className={cls.tenue}>{children}</p>
      </div>
    </li>
  );
}

// ── Código y terminal ───────────────────────────────────────────────────────

/**
 * Código en PromptBlock: una línea, un elemento (`data-linea`). Con `rango`
 * ([desde, hasta], contando desde 1) se ve solo ese trozo, pero el botón copia
 * el fichero entero: así un fichero largo se enseña en varias pantallas.
 */
export function Codigo({
  code,
  kind = "sh",
  etiqueta,
  ajustar = true,
  rango,
}: {
  code: string;
  kind?: Kind;
  etiqueta?: string;
  ajustar?: boolean;
  rango?: [number, number];
}) {
  const p = pintar(code, kind);
  // Los espacios que alinean un comentario van no separables: al partir la
  // línea en móvil no cuelgan fuera del bloque. Lo que se copia es el original.
  const lineas = p.lines.map((l) => l.replace(/ {2,}(?=<span class="tok-com">)/g, (m) => "&nbsp;".repeat(m.length)));
  const rotulo = etiqueta ?? { sh: "Terminal", json: "JSON", md: "Markdown", py: "Python", toml: "TOML", txt: "Texto" }[kind];
  return (
    <PromptBlock
      text={p.code}
      lineas={rango ? lineas.slice(rango[0] - 1, rango[1]) : lineas}
      etiqueta={rotulo}
      grande
      ajustar={ajustar}
      rotuloCopiar={rango ? "copiar el fichero" : "copiar"}
    />
  );
}

/** Prompt para pegar en el agente, a 16 px. */
export function Prompt({ text, etiqueta = "Prompt" }: { text: string; etiqueta?: string }) {
  return <PromptBlock text={text} etiqueta={etiqueta} grande />;
}

/**
 * Una línea de terminal: `o` es lo que escribes (lleva el «$» delante, fuera
 * del texto de la línea), `s` lo que responde el programa. `c` es un comentario
 * que va detrás de la orden.
 */
export type LineaTerminal = { o: string; c?: string } | { s: string; tono?: "ok" | "error" | "aviso" };

const SALIDA = { ok: "text-emerald-300", error: "text-rose-300", aviso: "text-amber-300" } as const;

export function Terminal({ titulo = "Terminal", lineas }: { titulo?: string; lineas: LineaTerminal[] }) {
  const ordenes = lineas.flatMap((l) => ("o" in l ? [l.o] : [])).join("\n");
  return (
    <figure className="min-w-0 overflow-hidden rounded-xl bg-[#0b1120] ring-1 ring-slate-700/60">
      <figcaption className="flex items-center justify-between gap-3 border-b border-slate-700/60 bg-[#111c33] px-4 py-1.5">
        <span className="flex min-w-0 items-center gap-2">
          <span className="h-3 w-3 flex-none rounded-full bg-[#ff5f56]" aria-hidden />
          <span className="h-3 w-3 flex-none rounded-full bg-[#ffbd2e]" aria-hidden />
          <span className="h-3 w-3 flex-none rounded-full bg-[#27c93f]" aria-hidden />
          <span className="ml-2 min-w-0 truncate font-mono text-base font-semibold text-slate-300">{titulo}</span>
        </span>
        {ordenes ? <BotonCopiar texto={ordenes} etiqueta={titulo} /> : null}
      </figcaption>
      <div className="px-4 py-3 font-mono text-base leading-[1.45]">
        {lineas.map((l, i) =>
          "o" in l ? (
            <div key={i} className="flex gap-[1ch]">
              <span aria-hidden className="select-none text-emerald-400">
                $
              </span>
              <span data-linea={i + 1} className="min-w-0 whitespace-pre-wrap break-words text-slate-50">
                {l.o}
                {l.c ? <span className="text-slate-400">{"  "}{l.c}</span> : null}
              </span>
            </div>
          ) : (
            <span
              key={i}
              data-linea={i + 1}
              className={`block whitespace-pre-wrap break-words ${l.tono ? SALIDA[l.tono] : "text-slate-300"}`}
            >
              {l.s || "​"}
            </span>
          ),
        )}
      </div>
    </figure>
  );
}

// ── Teclas ──────────────────────────────────────────────────────────────────

/** «ctrl+x u» → [ctrl]+[x] [u]. El texto del conjunto sigue siendo «ctrl+x u». */
export function Teclas({ combo }: { combo: string }) {
  const grupos = combo.split(" ");
  return (
    <span className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-base">
      {grupos.map((g, i) => (
        <span key={i} className="inline-flex items-center gap-0.5">
          {g.split("+").map((k, j) => (
            <span key={j} className="inline-flex items-center gap-0.5">
              {j > 0 ? <span className="text-zinc-500 dark:text-zinc-400">+</span> : null}
              <kbd className="rounded-md border border-b-2 border-zinc-300 bg-white px-1.5 py-0.5 font-mono text-base font-semibold text-zinc-800 dark:border-white/25 dark:bg-slate-800 dark:text-zinc-100">
                {k}
              </kbd>
            </span>
          ))}
          {i < grupos.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

// ── Anatomía de una orden ───────────────────────────────────────────────────

export type Parte = { texto: string; nombre: string; tono: Tono };

/** La orden entera arriba, troceada; debajo de cada trozo, qué es. */
export function Anatomia({ partes, etiqueta }: { partes: Parte[]; etiqueta: string }) {
  return (
    <figure aria-label={etiqueta} className={cls.tarjeta}>
      <div className="flex flex-wrap items-start gap-3">
        {partes.map((p, i) => (
          <div key={i} className="flex min-w-0 max-w-full flex-col items-center gap-2">
            <code
              className={`max-w-full rounded-lg border-2 px-3 py-2 font-mono text-[22px] font-bold [overflow-wrap:anywhere] ${TONO[p.tono].linea} ${TONO[p.tono].tinta}`}
            >
              {p.texto}
            </code>
            <span aria-hidden className={`h-4 border-l-2 ${TONO[p.tono].linea}`} />
            <span className={`rounded-full border px-3 py-0.5 text-base font-bold ${TONO[p.tono].chip}`}>{p.nombre}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}

// ── Línea de tiempo ─────────────────────────────────────────────────────────

export type Hito = {
  titulo: string;
  fecha: string;
  enlace?: { texto: string; href: string };
  puntos: string[];
  futuro?: boolean;
};

/**
 * Línea de tiempo en vertical: un hito por fila, con su fecha y su enlace a la
 * izquierda y los puntos a dos columnas a la derecha. En horizontal, cuatro
 * columnas estrechas no caben en una pantalla en cuanto hay cinco puntos.
 */
export function LineaTiempo({ hitos }: { hitos: Hito[] }) {
  return (
    <ol className="relative ml-2 space-y-1.5 border-l-2 border-zinc-300 pl-6 dark:border-white/15">
      {hitos.map((h) => (
        <li key={h.titulo} className="relative">
          <span
            aria-hidden
            className={`absolute -left-[33px] top-5 h-4 w-4 rounded-full border-2 ${
              h.futuro
                ? "border-zinc-400 bg-[var(--background)] dark:border-zinc-500"
                : "border-blue-600 bg-blue-600 dark:border-blue-400 dark:bg-blue-400"
            }`}
          />
          <div
            className={`grid grid-cols-1 gap-x-5 gap-y-2 !px-4 !py-2.5 md:grid-cols-[12rem_minmax(0,1fr)] ${h.futuro ? cls.suave : cls.tarjeta}`}
          >
            <div>
              <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">{h.titulo}</h3>
              <p className="text-base font-semibold text-zinc-600 dark:text-zinc-400">{h.fecha}</p>
              {h.enlace ? (
                <Link href={h.enlace.href} className={`mt-1 block text-base ${cls.enlace}`}>
                  {h.enlace.texto} →
                </Link>
              ) : null}
            </div>
            {/* Columnas de texto (no rejilla): los puntos fluyen sin dejar huecos entre filas. */}
            <ul className="list-disc gap-x-8 pl-5 text-base leading-snug text-zinc-700 marker:text-zinc-400 dark:text-zinc-300 lg:columns-2">
              {h.puntos.map((p) => (
                <li key={p} className="mb-1 break-inside-avoid">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

// ── Árbol de carpetas ───────────────────────────────────────────────────────

/** Un nodo del árbol: `nivel` 0 cuelga de la raíz; `nota` va detrás, más tenue. */
export type NodoArbol = { nombre: string; nivel: number; carpeta?: boolean; nota?: string; tono?: Tono };

function IconoNodo({ carpeta }: { carpeta?: boolean }) {
  return carpeta ? (
    <svg viewBox="0 0 20 16" width={20} height={16} aria-hidden className="mt-1 shrink-0 fill-amber-400">
      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h5l2 2h8A1.5 1.5 0 0 1 19 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 1 13.5z" />
    </svg>
  ) : (
    <svg viewBox="0 0 16 20" width={16} height={20} aria-hidden className="mt-0.5 shrink-0 fill-zinc-400 dark:fill-zinc-500">
      <path d="M2.5 1h7L14 5.5v12a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 17.5v-15A1.5 1.5 0 0 1 2.5 1z" />
    </svg>
  );
}

/**
 * Árbol de carpetas en monoespaciada. Cada fila es su propio elemento
 * (`data-linea`) y su texto empieza por el nombre del fichero: las ramas
 * (├─ └─ │) van aparte, fuera del texto, para que la cámara lo encuentre.
 */
export function Arbol({ raiz, nodos, titulo, tono = "gris" }: { raiz: string; nodos: NodoArbol[]; titulo?: string; tono?: Tono }) {
  // ¿Hay más abajo otro nodo del mismo nivel antes de salir de esta rama?
  const sigue = (i: number, nivel: number) => {
    for (let j = i + 1; j < nodos.length; j++) {
      if (nodos[j].nivel < nivel) return false;
      if (nodos[j].nivel === nivel) return true;
    }
    return false;
  };
  const ramas = nodos.map((n, i) => {
    let prefijo = "";
    for (let k = 0; k < n.nivel; k++) prefijo += sigue(i, k) ? "│  " : "   ";
    return prefijo + (sigue(i, n.nivel) ? "├─ " : "└─ ");
  });
  return (
    <figure className={`min-w-0 rounded-2xl border bg-white p-4 dark:bg-slate-900 ${TONO[tono].linea}`}>
      {titulo ? <h4 className={`mb-2 text-xl font-bold ${TONO[tono].texto}`}>{titulo}</h4> : null}
      <div className="overflow-x-auto font-mono text-base leading-[1.6]">
        <div className="flex items-start gap-2 font-bold text-zinc-900 dark:text-zinc-50">
          <IconoNodo carpeta />
          <span data-linea={0}>{raiz}</span>
        </div>
        {nodos.map((n, i) => (
          <div key={i} className="flex items-start whitespace-pre">
            {/* Ramas en zinc-500 / zinc-400: con un gris más claro no pasan el AA en oscuro. */}
            <span aria-hidden className="select-none text-zinc-500 dark:text-zinc-400">
              {ramas[i]}
            </span>
            <span className="flex min-w-0 items-start gap-2">
              <IconoNodo carpeta={n.carpeta} />
              <span
                data-linea={i + 1}
                className={`min-w-0 whitespace-normal ${n.tono ? `font-bold ${TONO[n.tono].texto}` : "text-zinc-800 dark:text-zinc-200"}`}
              >
                {n.nombre}
                {n.nota ? <span className="ml-3 font-sans font-normal text-zinc-600 dark:text-zinc-400">{n.nota}</span> : null}
              </span>
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}

/**
 * Antes → orden → después: lo que hace una acción con tus ficheros. Si hay
 * más de uno en la página, cada árbol lleva su `titulo` («Antes: Descargas…»):
 * la cámara no distingue dos h4 que se llaman igual.
 */
export function AntesDespues({
  antes,
  despues,
  orden,
  aviso,
}: {
  antes: { titulo?: string; raiz: string; nodos: NodoArbol[] };
  despues: { titulo?: string; raiz: string; nodos: NodoArbol[] };
  orden: string;
  aviso?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
      <Arbol titulo={antes.titulo ?? "Antes"} raiz={antes.raiz} nodos={antes.nodos} tono="gris" />
      <div className="flex flex-col items-center gap-2">
        <code className="max-w-[15rem] rounded-lg bg-[#0b1120] px-3 py-2 text-center font-mono text-base text-emerald-300 [overflow-wrap:anywhere]">{orden}</code>
        {aviso ? <span className="max-w-[15rem] text-center text-base font-semibold text-amber-700 dark:text-amber-300">{aviso}</span> : null}
        <span aria-hidden className="text-3xl font-bold text-zinc-500 dark:text-zinc-400">
          →
        </span>
      </div>
      <Arbol titulo={despues.titulo ?? "Después"} raiz={despues.raiz} nodos={despues.nodos} tono="verde" />
    </div>
  );
}

// ── Checklist y rúbrica ─────────────────────────────────────────────────────

/** Lista de comprobación: casillas dibujadas (sin pulsar), cada punto un <li>. */
export function Checklist({ items }: { items: { texto: ReactNode; detalle?: ReactNode }[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-3 lg:grid-cols-2">
      {items.map((it, i) => (
        <li key={i} className={`flex gap-3 ${cls.texto}`}>
          <span aria-hidden className="mt-1 h-5 w-5 shrink-0 rounded-md border-2 border-zinc-400 dark:border-zinc-500" />
          <span>
            <span className={cls.fuerte}>{it.texto}</span>
            {it.detalle ? <span className="block text-zinc-600 dark:text-zinc-400">{it.detalle}</span> : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

const NIVEL_TONO: Tono[] = ["rosa", "ambar", "azul", "verde"];

/**
 * Un criterio de la rúbrica casilla a casilla: los cuatro niveles en fila, con
 * su porcentaje y su descriptor literal. `resaltar` marca la casilla a la que
 * apunta la semana (índice 0-3). Los nombres de nivel van en <dt> (se repiten
 * en cada criterio); el descriptor, en <dd>, es el texto único que se enfoca.
 */
export function CriterioRubrica({
  nombre,
  peso,
  que,
  niveles,
  descriptores,
  resaltar,
}: {
  nombre: string;
  peso: number;
  que: string;
  niveles: { nombre: string; pct: number }[];
  descriptores: string[];
  resaltar?: number;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-3">
        <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{nombre}</h4>
        <Chip tono="gris">peso {peso}</Chip>
      </div>
      <p className={`mt-1 ${cls.tenue}`}>{que}</p>
      <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {niveles.map((n, i) => (
          <div
            key={n.nombre}
            className={`rounded-xl border p-3 ${TONO[NIVEL_TONO[i]].caja} ${resaltar === i ? "ring-2 ring-offset-2 ring-blue-500 ring-offset-white dark:ring-blue-400 dark:ring-offset-slate-950" : ""}`}
          >
            <dt className={`text-base font-bold ${TONO[NIVEL_TONO[i]].tinta}`}>
              {n.nombre} · {n.pct} %
            </dt>
            <dd className={`mt-1 text-base leading-snug ${TONO[NIVEL_TONO[i]].tinta}`}>{descriptores[i]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
