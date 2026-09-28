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

function Guion({ v }: { v: Video }) {
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
