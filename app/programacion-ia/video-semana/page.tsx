import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { VIDEOS } from "./data";

export const metadata: Metadata = {
  title: "El curso, en vídeo — Semana a semana · Curso de Programación con IA",
  description:
    "Serie semanal de vídeos contando cómo se imparte el Curso de Programación con IA (1º DAM, IES Simarro): el método, los proyectos, la clase aumentada. Guiones incluidos.",
};

const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";

export default function CursoIAVideos() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Curso de Programación con IA", path: "/programacion-ia/" },
          { title: "El curso, en vídeo", path: "/programacion-ia/video-semana/" },
        ]}
      />
      <span className={chip}>1º DAM/DAW · IES Simarro · Bitácora en vídeo</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        El curso, en vídeo — semana a semana
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
        Cada semana un vídeo contando cómo va el curso: el método, los proyectos, la clase aumentada.
        Toca uno para verlo con su guion a la vista — porque contar el proceso incluye contar cómo se
        prepara.
      </p>
      <div className="mt-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 p-4 text-sm text-zinc-600 dark:text-zinc-400">
        <b>Formato:</b> vídeo corto (~10 min), grabado el viernes por la mañana, publicado el domingo
        por la noche. Los guiones se publican tal cual se usan: sin humo.
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {VIDEOS.map((v) => (
          <Link
            key={v.ep}
            href={`/programacion-ia/video-semana/${v.ep}/`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            {v.youtubeId ? (
              // Miniatura servida por YouTube (sin iframe: la portada sigue ligera)
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
                alt={`Miniatura: ${v.titulo}`}
                loading="lazy"
                className="aspect-video w-full border-b border-zinc-200 dark:border-white/10 object-cover"
              />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 text-sm text-zinc-500 dark:text-zinc-400">
                🎬 En preparación
              </div>
            )}
            <span className="flex flex-1 flex-col p-4">
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="rounded-full border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  {v.semana}
                </span>
                <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">{v.fecha}</span>
              </span>
              <span className="mt-1.5 block text-[15px] font-bold leading-snug">{v.titulo}</span>
              <span className="mt-1.5 flex-1 block text-sm text-zinc-600 dark:text-zinc-400">{v.resumen}</span>
              <span className="mt-3 block text-sm font-semibold text-blue-700 dark:text-blue-300 group-hover:underline">
                Ver vídeo y guion →
              </span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 dark:border-white/10 pt-5">
        <Link href="/programacion-ia/" className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5">
          ← Volver al curso
        </Link>
        <Link href="https://www.youtube.com/@aulaenlanube" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:hover:bg-slate-600">
          Canal en YouTube →
        </Link>
      </div>
    </div>
  );
}
