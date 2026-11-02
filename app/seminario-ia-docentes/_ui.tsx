import type { ReactNode } from "react";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import YouTubeLite from "@/components/YouTubeLite";
import { Bloque, Checklist, Chip, TONO, cls } from "@/app/programacion-ia/_video/piezas";
import { FUENTES, RAIZ, SESIONES, VIDEOS, sesion, urlVideo, vecinas } from "./_datos";
import { HiloSeminario } from "./_hilo";

// ════════════════════════════════════════════════════════════════════════════
// Piezas propias del seminario. Las genéricas (Bloque, Paso, Aviso, Tarjeta,
// Prompt, Checklist…) son las del curso de IA: app/programacion-ia/_video/.
// Reglas de vídeo en docs/paginas-para-video.md: un bloque = una pantalla
// (≤ 1100×620 a 1280×720), ≥ 16 px, nada solo al pasar el ratón.
// ════════════════════════════════════════════════════════════════════════════

/**
 * Portada de una sesión: migas, chips, h1, resumen y el hilo con la pieza de
 * hoy resaltada. Es la primera pantalla del vídeo.
 */
export function CabeceraSesion({ n, children }: { n: number; children?: ReactNode }) {
  const s = sesion(n);
  return (
    <section data-bloque className="max-w-[1100px]">
      <Breadcrumbs
        grande
        items={[
          { title: "Seminario de IA para docentes", path: RAIZ },
          { title: `Sesión ${n}`, path: s.ruta },
        ]}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Chip tono={s.tono}>{`Sesión ${n} de 5`}</Chip>
        <Chip tono="gris">FP y Secundaria · Comunitat Valenciana</Chip>
      </div>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">{s.titulo}</h1>
      <p className="mt-4 max-w-4xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">{children ?? s.resumen}</p>
      <div className="mt-6">
        <HiloSeminario actual={n} uid={`hilo-s${n}`} />
      </div>
    </section>
  );
}

/**
 * El vídeo resumen de la sesión. Solo en la web: en modo grabación (?video)
 * se oculta (sem-solo-web), porque el vídeo es precisamente esta página.
 */
export function VideoResumen({ n }: { n: number }) {
  const s = sesion(n);
  return (
    <section className="sem-solo-web mt-12 max-w-[1100px]" aria-labelledby={`video-s${n}`}>
      <div className={`grid grid-cols-1 gap-6 rounded-2xl border p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] ${TONO[s.tono].caja}`}>
        <div className="min-w-0">
          <p className={`text-base font-bold uppercase tracking-wider ${TONO[s.tono].texto}`}>Vídeo resumen</p>
          <h2 id={`video-s${n}`} className="mt-1 text-[26px] font-bold leading-tight text-zinc-900 dark:text-zinc-50">
            {`La sesión ${n}, en un vídeo`}
          </h2>
          <p className={`mt-2 ${cls.texto}`}>
            {s.video
              ? "Lo esencial de esta página, recorrido en pantalla y con calma. Ideal si te perdiste la sesión o quieres repasarla antes de hacer la tarea."
              : "Estamos preparando el recorrido en vídeo de esta sesión. Aparecerá aquí y en el canal IA para docentes; mientras tanto, todo lo que se ve en la sesión está en esta página."}
          </p>
          <a
            href="https://www.youtube.com/@ia-para-docentes"
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-3 inline-block text-base ${cls.enlace}`}
          >
            Canal de YouTube IA para docentes →
          </a>
        </div>
        <div className="min-w-0">
          {s.video ? (
            <YouTubeLite id={s.video} title={`Seminario de IA para docentes · Sesión ${n}: ${s.titulo}`} />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-white/60 p-6 text-center dark:border-white/15 dark:bg-slate-900/60">
              <p className="text-lg font-semibold text-zinc-600 dark:text-zinc-300">Vídeo en preparación</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Índice de la sesión: cada sección con su ancla. */
export function EnEstaSesion({ items, tono = "azul" }: { items: [string, string][]; tono?: keyof typeof TONO }) {
  return (
    <Bloque titulo="En esta sesión">
      <nav aria-label="En esta página">
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([id, t], i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="flex h-full items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-base font-semibold text-zinc-800 transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-900 dark:text-zinc-200 dark:hover:border-blue-500/50"
              >
                <span aria-hidden className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-base font-extrabold ${TONO[tono].disco}`}>
                  {i + 1}
                </span>
                {t}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </Bloque>
  );
}

/** Tarjetas de vídeos de apoyo, citados por id desde _datos.ts. */
export function ParaAmpliar({
  ids,
  titulo = "Para ampliar",
  entradilla,
  id,
}: {
  ids: (string | [string, number])[];
  titulo?: string;
  entradilla?: ReactNode;
  id?: string;
}) {
  return (
    <Bloque id={id} titulo={titulo} etiqueta="Vídeos de apoyo" entradilla={entradilla}>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ids.map((x) => {
          const [vid, t] = Array.isArray(x) ? x : [x, undefined];
          const v = VIDEOS[vid];
          if (!v) throw new Error(`Vídeo de apoyo desconocido: ${vid}`);
          return (
            <li key={vid}>
              <a
                href={urlVideo(vid, t)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full gap-3 rounded-2xl border border-zinc-200 bg-white p-3 transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-900 dark:hover:border-blue-500/50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${vid}/mqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  className="h-[68px] w-[120px] shrink-0 rounded-lg object-cover"
                />
                <span className="min-w-0">
                  <span className="block text-base font-bold leading-snug text-zinc-900 group-hover:underline dark:text-zinc-100">{v.titulo}</span>
                  <span className="mt-1 block text-base text-zinc-600 dark:text-zinc-400">
                    {[v.dur, v.nota, t ? `desde el min. ${Math.floor(t / 60)}` : null].filter(Boolean).join(" · ")}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </Bloque>
  );
}

/**
 * La tarea para trabajar por tu cuenta: no se entrega, se propone. Lista de
 * comprobación, tiempo orientativo y lo que tendrás al acabar.
 */
export function Tarea({
  n,
  tiempo,
  items,
  resultado,
  id = "tarea",
}: {
  n: number;
  tiempo: string;
  items: { texto: ReactNode; detalle?: ReactNode }[];
  resultado: ReactNode;
  id?: string;
}) {
  const s = sesion(n);
  return (
    <Bloque
      id={id}
      etiqueta="Para trabajar por tu cuenta"
      titulo={`Tu tarea de la sesión ${n}`}
      entradilla={
        <>
          No se entrega: es tu plan para que lo de hoy se quede. Calcula <b>{tiempo}</b>, mejor repartidos en dos ratos.
        </>
      }
    >
      <Checklist items={items} />
      <div className={`mt-6 rounded-2xl border p-4 ${TONO[s.tono].caja}`}>
        <p className={`text-base font-bold uppercase tracking-wider ${TONO[s.tono].texto}`}>Al acabar tendrás</p>
        <p className={`mt-1 text-lg ${TONO[s.tono].tinta}`}>{resultado}</p>
      </div>
    </Bloque>
  );
}

/** Cita de una fuente oficial, en una línea. */
export function Fuente({ id, children }: { id: keyof typeof FUENTES; children?: ReactNode }) {
  const f = FUENTES[id];
  return (
    <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
      {children ?? "Fuente"}:{" "}
      <a href={f.u} target="_blank" rel="noopener noreferrer" className={cls.enlace}>
        {f.t}
      </a>{" "}
      ({f.f}).
    </p>
  );
}

/** Navegación de pie: sesión anterior y siguiente. */
export function NavSesiones({ n }: { n: number }) {
  const { atras, adelante } = vecinas(n);
  return (
    <nav aria-label="Otras sesiones" className="mt-16 grid max-w-[1100px] grid-cols-1 gap-4 sm:grid-cols-2">
      <Link
        href={atras.ruta}
        className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-900 dark:hover:border-blue-500/50"
      >
        <span className="block text-base font-semibold text-zinc-600 dark:text-zinc-400">← Anterior</span>
        <span className="mt-1 block text-xl font-bold text-zinc-900 dark:text-zinc-100">{atras.titulo}</span>
      </Link>
      <Link
        href={adelante.ruta}
        className="rounded-2xl border border-zinc-200 bg-white p-5 text-right transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-900 dark:hover:border-blue-500/50"
      >
        <span className="block text-base font-semibold text-zinc-600 dark:text-zinc-400">Siguiente →</span>
        <span className="mt-1 block text-xl font-bold text-zinc-900 dark:text-zinc-100">{adelante.titulo}</span>
      </Link>
    </nav>
  );
}

/** Cierre de sesión: lo que te llevas, en una caja. */
export function LoQueTeLlevas({ n, children }: { n: number; children: ReactNode }) {
  const s = sesion(n);
  return (
    <section data-bloque className={`mt-16 max-w-[1100px] rounded-2xl border p-6 ${TONO[s.tono].caja}`}>
      <h2 className={`text-[26px] font-bold leading-tight ${TONO[s.tono].tinta}`}>Lo que te llevas de la sesión {n}</h2>
      <div className={`mt-3 space-y-3 text-lg leading-relaxed ${TONO[s.tono].tinta}`}>{children}</div>
    </section>
  );
}

export { SESIONES };
