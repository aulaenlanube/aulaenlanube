import type { Metadata } from "next";
import Link from "@/components/Link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { VIDEOS, type Video } from "../data";

export function generateStaticParams() {
  return VIDEOS.map((v) => ({ ep: v.ep }));
}

const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";

/** «12:28» → 748 (segundos), para enlazar cada capítulo a su minuto en YouTube. */
function segundos(t: string): number {
  return t.split(":").reduce((acc, x) => acc * 60 + Number(x), 0);
}

/** Lo que no es guion: qué trata el vídeo, sus capítulos y la página del curso que se ve. */
function Contenido({ v }: { v: Video }) {
  if (!v.puntos?.length && !v.capitulos?.length && !v.pagina) return null;
  return (
    <div className="mt-8 space-y-6">
      {v.pagina && (
        <Link
          href={v.pagina.href}
          className="block rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300">La página que se ve en el vídeo</span>
          <span className="mt-1 block text-[15px] font-bold">{v.pagina.texto} →</span>
        </Link>
      )}
      {v.puntos?.length ? (
        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">En este vídeo</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-zinc-700 marker:text-zinc-400 dark:text-zinc-300">
            {v.puntos.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {v.capitulos?.length && v.youtubeId ? (
        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Capítulos</h2>
          <ol className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
            {v.capitulos.map(([t, titulo]) => (
              <li key={t} className="flex gap-3 text-[15px]">
                <a
                  href={`https://www.youtube.com/watch?v=${v.youtubeId}&t=${segundos(t)}s`}
                  target="_blank"
                  rel="noopener"
                  className="w-12 flex-none font-mono font-semibold text-blue-700 underline-offset-2 hover:underline dark:text-blue-300"
                >
                  {t}
                </a>
                <span className="text-zinc-700 dark:text-zinc-300">{titulo}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}

function Guion({ v }: { v: Video }) {
  if (!v.bloques.length) return null;
  return (
    <div className="mt-8">
      <h2 className="text-sm font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        Guion de la grabación
      </h2>
      <div className="mt-2 space-y-3">
        {v.bloques.map((b, i) => (
          <section key={i} className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{b.h}</h3>
              {b.dur && (
                <span className="flex-none rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400">
                  {b.dur}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">{b.p}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ ep: string }> }): Promise<Metadata> {
  const { ep } = await params;
  const v = VIDEOS.find((x) => x.ep === ep);
  if (!v) return { title: "Episodio no encontrado · Curso de Programación con IA" };
  return {
    title: `${v.semana} · ${v.titulo} — El curso, en vídeo`,
    description: v.resumen,
  };
}

export default async function VideoEpisodio({ params }: { params: Promise<{ ep: string }> }) {
  const { ep } = await params;
  const idx = VIDEOS.findIndex((v) => v.ep === ep);
  if (idx < 0) notFound();
  const v = VIDEOS[idx];
  const prev = idx > 0 ? VIDEOS[idx - 1] : null;
  const next = idx < VIDEOS.length - 1 ? VIDEOS[idx + 1] : null;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Curso de Programación con IA", path: "/programacion-ia/" },
          { title: "El curso, en vídeo", path: "/programacion-ia/video-semana/" },
          { title: v.semana, path: `/programacion-ia/video-semana/${v.ep}/` },
        ]}
      />
      <span className={chip}>{v.semana} · Bitácora en vídeo</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{v.titulo}</h1>
      <p className="mt-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">{v.fecha}</p>
      <p className="mt-3 max-w-3xl text-[15px] text-zinc-600 dark:text-zinc-400">{v.resumen}</p>

      {v.youtubeId ? (
        <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
            title={v.titulo}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 dark:border-white/15 bg-zinc-50 dark:bg-white/5 p-5 text-center text-sm text-zinc-500 dark:text-zinc-400">
          🎬 Vídeo en preparación — se incrustará aquí al publicarse.
          <span className="mt-1 block text-xs">
            (Mientras tanto: el guion de grabación, abajo — visible a propósito, para que veas cómo se
            construye cada entrega.)
          </span>
        </div>
      )}

      <Contenido v={v} />
      <Guion v={v} />

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 dark:border-white/10 pt-5">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/programacion-ia/video-semana/"
            className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5"
          >
            ← Todos los vídeos
          </Link>
          {prev && (
            <Link
              href={`/programacion-ia/video-semana/${prev.ep}/`}
              className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5"
            >
              ← {prev.semana}
            </Link>
          )}
          {next && (
            <Link
              href={`/programacion-ia/video-semana/${next.ep}/`}
              className="rounded-xl border border-blue-300 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10 px-5 py-2.5 text-sm font-semibold text-blue-800 dark:text-blue-200 transition hover:bg-blue-100 dark:hover:bg-blue-500/20"
            >
              {next.semana} →
            </Link>
          )}
        </div>
        <Link
          href="https://www.youtube.com/@aulaenlanube"
          className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:hover:bg-slate-600"
        >
          Canal en YouTube →
        </Link>
      </div>
    </div>
  );
}
