import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";
import { leerTutorial, SLUGS_TUTORIALES } from "../cargar";
import Prosa from "../prosa";

export function generateStaticParams() {
  return SLUGS_TUTORIALES.map((slug) => ({ slug }));
}

const TITULOS: Record<string, string> = {
  "github-pages": "Publica tu web y domina GitHub",
  "api-externa": "Datos vivos de una API externa",
  chatbot: "Un chatbot que responde por ti",
  medios: "Medios que cuentan tu historia",
};

export const metadata: Metadata = {
  title: "Tutoriales · Web personal de marca — Curso de Programación con IA",
};

const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(SLUGS_TUTORIALES as readonly string[]).includes(slug)) notFound();
  const t = leerTutorial(slug);
  const idx = SLUGS_TUTORIALES.indexOf(slug as (typeof SLUGS_TUTORIALES)[number]);
  const prev = idx > 0 ? SLUGS_TUTORIALES[idx - 1] : null;
  const next = idx < SLUGS_TUTORIALES.length - 1 ? SLUGS_TUTORIALES[idx + 1] : null;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Curso de Programación con IA", path: "/programacion-ia/" },
          { title: "Web personal de marca", path: "/programacion-ia/web-personal/" },
          { title: TITULOS[slug] ?? slug, path: `/programacion-ia/tutoriales/${slug}/` },
        ]}
      />
      <span className={chip}>{t.chip}</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{t.title}</h1>
      <Prosa md={t.md} />
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 dark:border-white/10 pt-5">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/programacion-ia/web-personal/"
            className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5"
          >
            ← Volver al proyecto
          </Link>
          {prev && (
            <Link
              href={`/programacion-ia/tutoriales/${prev}/`}
              className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5"
            >
              ← {TITULOS[prev]}
            </Link>
          )}
          {next && (
            <Link
              href={`/programacion-ia/tutoriales/${next}/`}
              className="rounded-xl border border-blue-300 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10 px-5 py-2.5 text-sm font-semibold text-blue-800 dark:text-blue-200 transition hover:bg-blue-100 dark:hover:bg-blue-500/20"
            >
              {TITULOS[next]} →
            </Link>
          )}
        </div>
        <PrintButton />
      </div>
    </div>
  );
}
