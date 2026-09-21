import type { ReactNode } from "react";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Tono } from "../_tonos";

export type { Tono };

// ════════════════════════════════════════════════════════════════════════════
// Piezas de maquetación de la ponencia.
//
// Los seis bloques y la portada comparten este vocabulario visual, así que un
// cambio aquí se propaga a todas las páginas. Todo son Componentes de Servidor:
// lo único interactivo de la ponencia son los diagramas (_svg) y las dos
// aplicaciones (_apps), que sí llevan "use client".
//
// Anchos: el contenedor es max-w-5xl (992 px útiles). La prosa se limita a
// max-w-3xl para no pasar de ~75 caracteres por línea; los diagramas, las
// rejillas y las cajas de prompt ocupan todo el ancho.
// ════════════════════════════════════════════════════════════════════════════

type Estilo = {
  chip: string;
  barra: string;
  /** Clase literal `border-…`: Tailwind lee el código fuente, así que nunca
      se puede construir una clase concatenando o con replace(). */
  borde: string;
  texto: string;
  nota: string;
  tarjeta: string;
  numero: string;
  suave: string;
};

export const ESTILO: Record<Tono, Estilo> = {
  azul: {
    chip: "border-blue-200 bg-blue-50 text-blue-700",
    barra: "bg-blue-600",
    borde: "border-blue-600",
    texto: "text-blue-700",
    nota: "border-blue-200 bg-blue-50 text-blue-900",
    tarjeta: "hover:border-blue-300 hover:bg-blue-50/40",
    numero: "bg-blue-600 text-white",
    suave: "bg-blue-50",
  },
  morado: {
    chip: "border-violet-200 bg-violet-50 text-violet-700",
    barra: "bg-violet-600",
    borde: "border-violet-600",
    texto: "text-violet-700",
    nota: "border-violet-200 bg-violet-50 text-violet-900",
    tarjeta: "hover:border-violet-300 hover:bg-violet-50/40",
    numero: "bg-violet-600 text-white",
    suave: "bg-violet-50",
  },
  verde: {
    chip: "border-emerald-200 bg-emerald-50 text-emerald-700",
    barra: "bg-emerald-600",
    borde: "border-emerald-600",
    texto: "text-emerald-700",
    nota: "border-emerald-200 bg-emerald-50 text-emerald-900",
    tarjeta: "hover:border-emerald-300 hover:bg-emerald-50/40",
    numero: "bg-emerald-600 text-white",
    suave: "bg-emerald-50",
  },
  ambar: {
    chip: "border-amber-200 bg-amber-50 text-amber-800",
    barra: "bg-amber-500",
    borde: "border-amber-500",
    texto: "text-amber-800",
    nota: "border-amber-200 bg-amber-50 text-amber-900",
    tarjeta: "hover:border-amber-300 hover:bg-amber-50/40",
    numero: "bg-amber-500 text-white",
    suave: "bg-amber-50",
  },
  rosa: {
    chip: "border-rose-200 bg-rose-50 text-rose-700",
    barra: "bg-rose-600",
    borde: "border-rose-600",
    texto: "text-rose-700",
    nota: "border-rose-200 bg-rose-50 text-rose-900",
    tarjeta: "hover:border-rose-300 hover:bg-rose-50/40",
    numero: "bg-rose-600 text-white",
    suave: "bg-rose-50",
  },
  gris: {
    chip: "border-zinc-300 bg-zinc-100 text-zinc-700",
    barra: "bg-zinc-500",
    borde: "border-zinc-500",
    texto: "text-zinc-700",
    nota: "border-zinc-300 bg-zinc-50 text-zinc-800",
    tarjeta: "hover:border-zinc-400 hover:bg-zinc-50",
    numero: "bg-zinc-600 text-white",
    suave: "bg-zinc-100",
  },
};

// ── Cabecera de página ──────────────────────────────────────────────────────

export function Migas({ bloque }: { bloque?: { titulo: string; ruta: string } }) {
  return (
    <Breadcrumbs
      items={[
        { title: "Programación e IA", path: "/zona-programacion/" },
        { title: "Del prompt a la plaza", path: "/ponencia-tecnologia/" },
        ...(bloque ? [{ title: bloque.titulo, path: bloque.ruta }] : []),
      ]}
    />
  );
}

export function Chip({ tono = "azul", children }: { tono?: Tono; children: ReactNode }) {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${ESTILO[tono].chip}`}
    >
      {children}
    </span>
  );
}

/** Cabecera de un bloque: número grande, cronómetro, título y entradilla. */
export function Portadilla({
  n,
  tono,
  minutos,
  titulo,
  entradilla,
}: {
  n: number;
  tono: Tono;
  minutos: number;
  titulo: string;
  entradilla: ReactNode;
}) {
  const e = ESTILO[tono];
  return (
    <header className="mb-8">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl text-xl font-extrabold ${e.numero}`}
        >
          {n}
        </span>
        <Chip tono={tono}>Bloque {n} de 6</Chip>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
          <RelojIcono /> {minutos} min
        </span>
      </div>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">{titulo}</h1>
      <div className={`mt-4 border-l-4 pl-4 ${e.borde}`}>
        <p className="max-w-3xl text-lg leading-relaxed text-zinc-600">{entradilla}</p>
      </div>
    </header>
  );
}

function RelojIcono() {
  return (
    <svg viewBox="0 0 16 16" width={12} height={12} aria-hidden="true" className="opacity-70">
      <circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 4.2V8l2.6 1.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// ── Estructura interna ──────────────────────────────────────────────────────

/** Encabezado de sección con barra de color y antetítulo opcional. */
export function H2({
  tono = "azul",
  ante,
  children,
}: {
  tono?: Tono;
  ante?: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-12 first:mt-0">
      {ante ? (
        <p className={`text-[11px] font-bold uppercase tracking-[0.14em] ${ESTILO[tono].texto}`}>{ante}</p>
      ) : null}
      <h2 className="mt-1 flex items-start gap-3 text-2xl font-extrabold tracking-tight text-zinc-900">
        <span className={`mt-2 h-5 w-1.5 flex-none rounded-full ${ESTILO[tono].barra}`} aria-hidden="true" />
        <span>{children}</span>
      </h2>
    </div>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 text-lg font-bold tracking-tight text-zinc-900">{children}</h3>;
}

/** Párrafo de cuerpo, con el ancho de lectura acotado. */
export function P({ children }: { children: ReactNode }) {
  return <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-zinc-700">{children}</p>;
}

/** Lista con viñetas cuadradas del tono. */
export function Lista({ tono = "azul", items }: { tono?: Tono; items: ReactNode[] }) {
  return (
    <ul className="mt-4 max-w-3xl space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-[16px] leading-relaxed text-zinc-700">
          <span
            className={`mt-2.5 h-1.5 w-1.5 flex-none rounded-[2px] ${ESTILO[tono].barra}`}
            aria-hidden="true"
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** Lista numerada con discos del tono. */
export function Pasos({ tono = "azul", items }: { tono?: Tono; items: ReactNode[] }) {
  return (
    <ol className="mt-4 max-w-3xl space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-[16px] leading-relaxed text-zinc-700">
          <span
            className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full text-[12px] font-extrabold ${ESTILO[tono].numero}`}
          >
            {i + 1}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ol>
  );
}

/** Aviso destacado con barra lateral del tono. */
export function Nota({
  tono = "azul",
  titulo,
  children,
}: {
  tono?: Tono;
  titulo?: string;
  children: ReactNode;
}) {
  const e = ESTILO[tono];
  return (
    <div className={`mt-5 rounded-2xl border border-l-[6px] p-5 text-[15px] leading-relaxed ${e.nota}`}>
      {titulo ? <p className="mb-1.5 text-[15px] font-extrabold">{titulo}</p> : null}
      {children}
    </div>
  );
}

export function Tarjeta({
  tono = "gris",
  titulo,
  children,
}: {
  tono?: Tono;
  titulo?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      {titulo ? (
        <h3 className="flex items-start gap-2.5 text-[15px] font-bold text-zinc-900">
          <span
            className={`mt-1.5 h-3 w-1 flex-none rounded-full ${ESTILO[tono].barra}`}
            aria-hidden="true"
          />
          <span>{titulo}</span>
        </h3>
      ) : null}
      <div className="mt-2 text-[15px] leading-relaxed text-zinc-600">{children}</div>
    </div>
  );
}

export function Rejilla({ cols = 2, children }: { cols?: 2 | 3; children: ReactNode }) {
  return (
    <div
      className={`mt-5 grid grid-cols-1 gap-4 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
    >
      {children}
    </div>
  );
}

/** Cifra grande con su pie: para los datos citables. */
export function Dato({
  tono = "azul",
  cifra,
  children,
}: {
  tono?: Tono;
  cifra: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <p className={`text-3xl font-extrabold tracking-tight ${ESTILO[tono].texto}`}>{cifra}</p>
      <div className="mt-1.5 text-[14px] leading-relaxed text-zinc-600">{children}</div>
    </div>
  );
}

/** Dos columnas enfrentadas: lo que funciona / lo que hunde. */
export function Contraste({
  bien,
  mal,
}: {
  bien: { titulo: string; items: ReactNode[] };
  mal: { titulo: string; items: ReactNode[] };
}) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <h3 className="text-[15px] font-extrabold text-emerald-900">✔ {bien.titulo}</h3>
        <ul className="mt-2.5 space-y-2">
          {bien.items.map((it, i) => (
            <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-emerald-900">
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-[2px] bg-emerald-600" aria-hidden="true" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
        <h3 className="text-[15px] font-extrabold text-rose-900">✘ {mal.titulo}</h3>
        <ul className="mt-2.5 space-y-2">
          {mal.items.map((it, i) => (
            <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-rose-900">
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-[2px] bg-rose-600" aria-hidden="true" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Ficha de un prompt: cabecera con el rótulo del paso y el título, y dentro el
 * para-qué seguido de la caja copiable (`<PromptBlock>`), que va como hijo.
 */
export function FichaPrompt({
  tono = "azul",
  etiqueta,
  titulo,
  children,
}: {
  tono?: Tono;
  etiqueta: string;
  titulo: string;
  children: ReactNode;
}) {
  const e = ESTILO[tono];
  return (
    <section className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-zinc-200 px-5 py-3 ${e.suave}`}>
        <span className={`text-[11px] font-bold uppercase tracking-[0.14em] ${e.texto}`}>{etiqueta}</span>
        <h3 className="text-[16px] font-extrabold tracking-tight text-zinc-900">{titulo}</h3>
      </div>
      <div className="px-5 pb-5 pt-4 text-[15px] leading-relaxed text-zinc-600">{children}</div>
    </section>
  );
}

// ── Cierres de página ───────────────────────────────────────────────────────

/** La grabación: el mismo compromiso en los seis bloques, con su matiz. */
export function Grabacion({ matiz }: { matiz: string }) {
  return (
    <div className="mt-12 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
      <h2 className="flex items-center gap-2 text-[15px] font-extrabold tracking-tight text-zinc-900">
        <span aria-hidden="true">🎧</span> La sesión queda grabada
      </h2>
      <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-zinc-600">
        Al día siguiente tendrás aquí el enlace a la grabación completa y, de este bloque, un resumen
        en audio y otro escrito de diez líneas. {matiz}
      </p>
    </div>
  );
}

export function Cierre({ tono = "verde", children }: { tono?: Tono; children: ReactNode }) {
  return (
    <div className={`mt-8 rounded-2xl border border-l-[6px] p-5 text-[16px] leading-relaxed ${ESTILO[tono].nota}`}>
      {children}
    </div>
  );
}

export function NavPie({
  atras,
  adelante,
}: {
  atras: { titulo: string; ruta: string };
  adelante: { titulo: string; ruta: string };
}) {
  return (
    <nav
      aria-label="Navegación entre bloques"
      className="mt-12 flex flex-wrap items-stretch justify-between gap-3 border-t border-zinc-200 pt-6"
    >
      <Link
        href={atras.ruta}
        className="group max-w-[47%] flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 transition hover:border-zinc-400 hover:bg-zinc-50"
      >
        <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">← Anterior</span>
        <span className="mt-0.5 block text-[14px] font-semibold text-slate-700">{atras.titulo}</span>
      </Link>
      <Link
        href={adelante.ruta}
        className="group max-w-[47%] flex-1 rounded-xl bg-slate-700 px-4 py-3 text-right transition hover:bg-slate-800"
      >
        <span className="block text-[11px] font-bold uppercase tracking-wider text-white/60">Siguiente →</span>
        <span className="mt-0.5 block text-[14px] font-semibold text-white">{adelante.titulo}</span>
      </Link>
    </nav>
  );
}

/** Enlace externo con el «↗» y estilo de la ponencia. */
export function Fuera({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener" className="font-semibold text-blue-700 underline">
      {children} ↗
    </a>
  );
}

export function Dentro({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-blue-700 underline">
      {children}
    </Link>
  );
}
