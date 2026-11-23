import type { ReactNode } from "react";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Bloque, Chip, TONO, cls } from "../_video/piezas";

// Las 8 sesiones de Chispa, el juego de referencia del proyecto 3. Títulos y
// «se ve» salen de docs/chispa/sesiones/sesion-0N.md (fuente de verdad). Las
// sesiones con `publicada` tienen su página; las demás están documentadas y en
// preparación para vídeo. Lo usan la portada y el pie de cada sesión.

export type SesionChispa = {
  n: number;
  titulo: string;
  corto: string;
  seVe: string;
  publicada: boolean;
};

export const SESIONES: SesionChispa[] = [
  {
    n: 1,
    titulo: "La idea, la escena y el bucle",
    corto: "La idea y el bucle",
    seVe: "Un cubo que gira sobre una rejilla, con sombra, cámara que se mueve con el ratón y un contador de fps.",
    publicada: true,
  },
  {
    n: 2,
    titulo: "El mundo: geometría, materiales, texturas y luz",
    corto: "El mundo",
    seVe: "La azotea flotante completa, con su cielo y sus nubes; la cámara da vueltas alrededor.",
    publicada: true,
  },
  {
    n: 3,
    titulo: "El protagonista: control, cámara y animación",
    corto: "El protagonista",
    seVe: "Un robot que corre y salta por la azotea con la cámara detrás. Todavía atraviesa las paredes.",
    publicada: true,
  },
  {
    n: 4,
    titulo: "Físicas y reglas (hito 1: ya es un juego)",
    corto: "Físicas y reglas",
    seVe: "Una partida completa contra tres rivales del ordenador: cuenta atrás, chispa, embestidas, caídas, turbos, marcador y pantalla final.",
    publicada: true,
  },
  {
    n: 5,
    titulo: "Multijugador I: verse en la misma sala",
    corto: "Multijugador I",
    seVe: "«Crear una sala» da un código de cuatro letras; quien entra con ese código aparece en la azotea y todos se ven moverse.",
    publicada: false,
  },
  {
    n: 6,
    titulo: "Multijugador II: fluido, justo y persistente",
    corto: "Multijugador II",
    seVe: "Vestíbulo, partidas completas en red, los demás robots fluidos y el ranking en el menú.",
    publicada: false,
  },
  {
    n: 7,
    titulo: "Juego completo: estados, interfaz, sonido y pruebas",
    corto: "Juego completo",
    seVe: "El juego ya se siente: suena, saltan chispas, la cámara tiembla al recibir un golpe, hay ayuda, ajustes y controles táctiles.",
    publicada: false,
  },
  {
    n: 8,
    titulo: "Release y defensa",
    corto: "Release y defensa",
    seVe: "Lo mismo que en la sesión 7, publicado como versión 1.0 con su documentación completa.",
    publicada: false,
  },
];

export const hrefSesion = (n: number) => `/programacion-ia/juego-3d/sesion-0${n}/`;
export const etiquetaGit = (n: number) => `sesion-0${n}`;

const tarjetaEnlace =
  "rounded-xl border border-zinc-200 px-4 py-3 text-base font-semibold text-blue-700 hover:bg-zinc-50 dark:border-white/10 dark:text-blue-300 dark:hover:bg-white/5";

/** Portada de una sesión: migas, antetítulo con la etiqueta de git, título y lo que se ve al acabar. */
export function CabeceraSesion({ n, chips }: { n: number; chips: string[] }) {
  const s = SESIONES[n - 1];
  return (
    <section data-bloque className="max-w-[1100px]">
      <Breadcrumbs
        grande
        items={[
          { title: "Curso de Programación con IA", path: "/programacion-ia/" },
          { title: "Juego 3D multijugador", path: "/programacion-ia/juego-3d/" },
          { title: `Sesión ${n}`, path: hrefSesion(n) },
        ]}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Chip>Proyecto 3 · Chispa · Sesión {n}</Chip>
        <span className="inline-block rounded-full border border-zinc-300 bg-zinc-900 px-3 py-0.5 font-mono text-base font-semibold text-emerald-300 dark:border-white/15">
          git tag {etiquetaGit(n)}
        </span>
      </div>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight">{s.titulo}</h1>
      <div className={`mt-5 rounded-2xl border p-5 ${TONO.verde.caja}`}>
        <p className={`text-base font-bold uppercase tracking-wider ${TONO.verde.texto}`}>Al acabar la sesión se ve</p>
        <p className="mt-1 text-xl font-bold text-emerald-950 dark:text-emerald-50">{s.seVe}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {chips.map((c) => (
          <Chip key={c} tono="gris">
            {c}
          </Chip>
        ))}
      </div>
    </section>
  );
}

/** Índice de los pasos de la sesión, enlazados a su ancla. */
export function IndicePasos({ pasos }: { pasos: string[] }) {
  return (
    <Bloque titulo={`La sesión en ${pasos.length} pasos`}>
      <nav aria-label="Pasos de la sesión">
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((t, i) => (
            <li key={t}>
              <a
                href={`#paso-${i + 1}`}
                className="flex h-full items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-base font-semibold text-zinc-800 transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-900 dark:text-zinc-200 dark:hover:border-blue-500/50"
              >
                <span aria-hidden className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-base font-extrabold ${TONO.azul.disco}`}>
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

/** Las decisiones de la sesión (docs/decisiones.md del juego), una tarjeta cada una. */
export function Decisiones({ items }: { items: [string, string, ReactNode][] }) {
  return (
    <Bloque id="decisiones" titulo="Decisiones de la sesión" entradilla="Cada una queda apuntada en el registro de decisiones del juego, con su porqué.">
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map(([num, titulo, porque]) => (
          <li key={num} className={`${cls.tarjeta} min-w-0`}>
            <p className={`text-base font-bold uppercase tracking-wider ${TONO.morado.texto}`}>Decisión {num}</p>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{titulo}</h3>
            <p className={`mt-2 ${cls.texto}`}>{porque}</p>
          </li>
        ))}
      </ul>
    </Bloque>
  );
}

/** Los conceptos del laboratorio que toca la sesión, enlazados a su sección. */
export function ConceptosLaboratorio({ items }: { items: [string, string][] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map(([texto, ancla]) => (
        <li key={texto}>
          <Link
            href={`/programacion-ia/juego-3d/laboratorio/#${ancla}`}
            className="inline-block rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-base font-semibold text-violet-800 hover:underline dark:border-violet-500/30 dark:bg-violet-500/15 dark:text-violet-200"
          >
            🧊 {texto}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Tropiezos: lo que falló y cómo se arregló, a dos columnas. */
export function Tropiezos({ titulo = "Tropiezos", items }: { titulo?: string; items: [string, ReactNode][] }) {
  return (
    <Bloque id="tropiezos" titulo={titulo} entradilla="Lo que falló por el camino y cómo se arregló. Ninguno se ve en el resultado final.">
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map(([t, d]) => (
          <li key={t} className={`min-w-0 rounded-2xl border p-5 ${TONO.rosa.caja}`}>
            <h3 className={`text-xl font-bold ${TONO.rosa.tinta}`}>{t}</h3>
            <p className={`mt-2 text-base leading-relaxed ${TONO.rosa.tinta}`}>{d}</p>
          </li>
        ))}
      </ul>
    </Bloque>
  );
}

/** Pie de cada sesión: las 8 sesiones (las 5 a 8, en preparación) y la navegación. */
export function PieSesiones({ actual }: { actual: number }) {
  const ant = actual > 1 ? SESIONES[actual - 2] : null;
  const sig = SESIONES[actual]?.publicada ? SESIONES[actual] : null;
  return (
    <>
      <Bloque id="sesiones" titulo="8 sesiones documentadas" entradilla="Las 5 a 8, en preparación para vídeo.">
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SESIONES.map((s) => {
            const dentro = (
              <>
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-base font-extrabold ${
                      s.publicada ? TONO.azul.disco : TONO.gris.disco
                    }`}
                  >
                    {s.n}
                  </span>
                  <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">{s.corto}</span>
                </span>
                <span className={`mt-1 block ${cls.tenue}`}>
                  {s.n === actual ? "Estás aquí" : s.publicada ? "Publicada" : "En preparación"}
                </span>
              </>
            );
            return (
              <li key={s.n}>
                {s.publicada && s.n !== actual ? (
                  <Link href={hrefSesion(s.n)} className={`${cls.tarjeta} block h-full !p-4 hover:border-blue-300 dark:hover:border-blue-500/50`}>
                    {dentro}
                  </Link>
                ) : (
                  <div className={`${s.n === actual ? cls.tarjeta : cls.suave} h-full !p-4 ${s.n === actual ? "border-blue-400 dark:border-blue-400/60" : ""}`}>
                    {dentro}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </Bloque>

      <nav className="mt-16 flex max-w-[1100px] flex-col gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:flex-wrap sm:justify-between dark:border-white/10">
        {[
          ant ? [hrefSesion(ant.n), `← Sesión ${ant.n} · ${ant.corto}`] : ["/programacion-ia/juego-3d/", "← Portada del proyecto"],
          ["/programacion-ia/juego-3d/laboratorio/", "Laboratorio 3D"],
          sig ? [hrefSesion(sig.n), `Sesión ${sig.n} · ${sig.corto} →`] : ["/programacion-ia/juego-3d/", "Portada del proyecto →"],
        ].map(([href, t]) => (
          <Link key={t} href={href} className={tarjetaEnlace}>
            {t}
          </Link>
        ))}
      </nav>
    </>
  );
}
