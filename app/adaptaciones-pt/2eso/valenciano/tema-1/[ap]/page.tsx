import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { chip, tarjeta } from "../../ui";
import { Icono } from "../../figuras";
import { APS, ACTS, TEMA } from "../../datos";
import { TeoriaBloque } from "../../teoria-bloque";
import { md } from "../../texto";
import OposPdfButton from "../../pdf-button";
import { payloadApartado } from "../../exportar";

type P = { params: Promise<{ ap: string }> };

export function generateStaticParams() {
  return APS.map((a) => ({ ap: a.slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { ap } = await params;
  const a = APS.find((x) => x.slug === ap);
  if (!a) return {};
  return {
    title: `${a.n} · ${a.t} — Tema 1 Valencià 2n ESO — Adaptaciones PT`,
    description: `Teoria, exemples resolts i sis activitats del bloc ${a.n} (${a.t}) del Tema 1 de Valencià: l’exercici base de 2n d’ESO i les seues quatre adaptacions.`,
  };
}

export default async function BloquePT({ params }: P) {
  const { ap } = await params;
  const a = APS.find((x) => x.slug === ap);
  if (!a) notFound();
  const acts = ACTS[a.slug] ?? [];
  const idx = APS.findIndex((x) => x.slug === ap);
  const prev = APS[idx - 1];
  const next = APS[idx + 1];
  const base = "/adaptaciones-pt/2eso/valenciano/tema-1";

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Adaptaciones PT", path: "/adaptaciones-pt/" },
          { title: "2.º ESO", path: "/adaptaciones-pt/2eso/" },
          { title: "Valencià", path: "/adaptaciones-pt/2eso/valenciano/" },
          { title: "Tema 1", path: `${base}/` },
          { title: `Bloc ${a.n}`, path: `${base}/${a.slug}/` },
        ]}
      />
      <span className={chip}>{TEMA} · Bloc {a.n}</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {a.n} · {a.t}
      </h1>

      <section className="mt-8 rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/60 dark:bg-blue-500/10 p-5 shadow-sm sm:p-7">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">📘 Teoria</h2>
        <TeoriaBloque items={a.teoria} />
      </section>

      <div className="mt-10">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">✏️ Exemples resolts</h2>
        <div className="pte-ej mt-3 space-y-2 text-[15px] text-zinc-700 dark:text-zinc-300">
          {a.ej.map((e, i) => <p key={i}>• <span dangerouslySetInnerHTML={{ __html: md(e) }} /></p>)}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">🎯 Activitats</h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {acts.length} activitats: entra en cada caixa per a veure-la completa, amb
          l'exercici base de 2n d'ESO, les seues quatre adaptacions i la solució de cada nivell.
        </p>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {acts.map((act, i) => (
          <Link
            key={i}
            href={`${base}/${a.slug}/${String(i + 1).padStart(2, "0")}/`}
            className="group flex gap-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:border-blue-300 dark:hover:border-blue-500/40 hover:bg-blue-50/40 dark:hover:bg-blue-500/10"
          >
            <div className="flex w-12 flex-none items-center justify-center"><Icono k={act.ic} /></div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400">Activitat {i + 1}</div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-800">{act.t}</h3>
              <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400">{act.d}</p>
            </div>
            <div className="self-center text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600">→</div>
          </Link>
        ))}
      </div>

      <div className={`${tarjeta} !mt-10 !text-sm`}>
        <b>Per al profe:</b> les sis activitats d’este bloc compartixen objectiu, així que són
        intercanviables: si un alumne acaba una abans de temps, envia’l a la següent caixa. Les
        últimes solen ser les més obertes (crear, verbalitzar, dramatitzar), i les primeres, les
        més guiades.
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <OposPdfButton payload={payloadApartado(a)} />
        <Link href={`${base}/completo/`} className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5">
          📄 Vore tema complet imprimible
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        {prev ? (
          <Link href={`${base}/${prev.slug}/`} className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5">
            ← {prev.n} · {prev.t}
          </Link>
        ) : (
          <Link href={`${base}/`} className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5">← Tema 1</Link>
        )}
        <div className="flex gap-3">
          <Link href={`${base}/`} className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5">Índex</Link>
          {next ? (
            <Link href={`${base}/${next.slug}/`} className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:hover:bg-slate-600">
              {next.n} · {next.t} →
            </Link>
          ) : (
            <Link href={`${base}/`} className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:hover:bg-slate-600">Tornar al tema →</Link>
          )}
        </div>
      </div>
    </div>
  );
}
