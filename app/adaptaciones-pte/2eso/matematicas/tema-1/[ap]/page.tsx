import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { chip, tarjeta } from "../../ui";
import { Icono } from "../../figuras";
import { APS, ACTS } from "../../datos";
import { TeoriaBloque } from "../../teoria-bloque";
import { mdTex } from "../../tex";
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
    title: `${a.n} · ${a.t} — Tema 1 Matemáticas 2.º ESO — Adaptaciones PTE`,
    description: `Teoría, ejemplos resueltos y actividades adaptadas en cuatro niveles del apartado ${a.n} (${a.t}) del Tema 1 de números enteros.`,
  };
}

export default async function ApartadoPTE({ params }: P) {
  const { ap } = await params;
  const a = APS.find((x) => x.slug === ap);
  if (!a) notFound();
  const acts = ACTS[a.slug] ?? [];
  const idx = APS.findIndex((x) => x.slug === ap);
  const prev = APS[idx - 1];
  const next = APS[idx + 1];
  const base = "/adaptaciones-pte/2eso/matematicas/tema-1";

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Adaptaciones PTE", path: "/adaptaciones-pte/" },
          { title: "2.º ESO", path: "/adaptaciones-pte/2eso/" },
          { title: "Matemáticas", path: "/adaptaciones-pte/2eso/matematicas/" },
          { title: "Tema 1", path: `${base}/` },
          { title: `Ap. ${a.n}`, path: `${base}/${a.slug}/` },
        ]}
      />
      <span className={chip}>Tema 1 · Apartado {a.n}</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {a.n} · {a.t}
      </h1>

      <section className="mt-8 rounded-2xl border border-blue-200 bg-blue-50/60 p-5 shadow-sm sm:p-7">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">📘 Teoría</h2>
        <TeoriaBloque items={a.teoria} />
      </section>

      <div className="mt-10">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">✏️ Ejemplos resueltos</h2>
        <div className="pte-ej mt-3 space-y-2 text-[15px] text-zinc-700">
          {a.ej.map((e, i) => <p key={i}>• <span dangerouslySetInnerHTML={{ __html: mdTex(e) }} /></p>)}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">🎯 Actividades</h2>
        <p className="mt-1 text-sm text-zinc-500">
          {acts.length} actividades: entra en cada caja para verla completa, con teoría propia,
          los cuatro niveles y su solución.
        </p>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {acts.map((act, i) => (
          <Link
            key={i}
            href={`${base}/${a.slug}/${String(i + 1).padStart(2, "0")}/`}
            className="group flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50/40"
          >
            <div className="flex w-12 flex-none items-center justify-center"><Icono k={act.ic} /></div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Actividad {i + 1}</div>
              <h3 className="text-base font-bold text-zinc-900 group-hover:text-blue-800">{act.t}</h3>
              <p className="mt-1 text-[13px] text-zinc-600">{act.d}</p>
            </div>
            <div className="self-center text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600">→</div>
          </Link>
        ))}
      </div>

      <div className={`${tarjeta} !mt-10 !text-sm`}>
        <b>Para el profe:</b> las cuatro actividades de este apartado son intercambiables en
        dificultad — comparten objetivo y recta horizontal. Si un alumno acaba una antes de tiempo,
        mándale a la siguiente caja; la 4.ª suele ser la más abierta (crear/verbalizar).
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <OposPdfButton payload={payloadApartado(a)} />
        <Link href={`${base}/completo/`} className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          📄 Ver tema completo imprimible
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        {prev ? (
          <Link href={`${base}/${prev.slug}/`} className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
            ← {prev.n} · {prev.t}
          </Link>
        ) : (
          <Link href={`${base}/`} className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">← Tema 1</Link>
        )}
        <div className="flex gap-3">
          <Link href={`${base}/`} className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">Índice</Link>
          {next ? (
            <Link href={`${base}/${next.slug}/`} className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
              {next.n} · {next.t} →
            </Link>
          ) : (
            <Link href={`${base}/`} className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">Volver al tema →</Link>
          )}
        </div>
      </div>
    </div>
  );
}
