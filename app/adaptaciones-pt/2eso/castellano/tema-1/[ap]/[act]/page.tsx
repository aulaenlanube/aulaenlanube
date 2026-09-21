import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";
import { chip, NIVEL_CLS, tarjeta } from "../../../ui";
import { md } from "../../../texto";
import { Icono, Fig } from "../../../figuras";
import { APS, ACTS, LABELS } from "../../../datos";

type P = { params: Promise<{ ap: string; act: string }> };

export function generateStaticParams() {
  const out: { ap: string; act: string }[] = [];
  for (const a of APS) for (let i = 0; i < (ACTS[a.slug]?.length ?? 0); i++) out.push({ ap: a.slug, act: String(i + 1).padStart(2, "0") });
  return out;
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { ap, act } = await params;
  const a = APS.find((x) => x.slug === ap);
  const A = a && ACTS[a.slug]?.[Number(act) - 1];
  if (!a || !A) return {};
  return {
    title: `Actividad ${Number(act)}: ${A.t} — Tema 1 ${a.t} — Adaptaciones PT`,
    description: `${A.d} El ejercicio base de 2.º de ESO y cuatro adaptaciones: 1.º ESO, 6.º, 5.º y 4.º de primaria, con soluciones.`,
  };
}

export default async function ActividadPT({ params }: P) {
  const { ap, act } = await params;
  const a = APS.find((x) => x.slug === ap);
  const n = Number(act);
  const acts = a ? ACTS[a.slug] : undefined;
  const A = acts?.[n - 1];
  if (!a || !acts || !A) notFound();
  const next = acts[n];
  const base = "/adaptaciones-pt/2eso/castellano/tema-1";
  const me = `${base}/${a.slug}/${String(n).padStart(2, "0")}/`;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Adaptaciones PT", path: "/adaptaciones-pt/" },
          { title: "2.º ESO", path: "/adaptaciones-pt/2eso/" },
          { title: "Castellano", path: "/adaptaciones-pt/2eso/castellano/" },
          { title: "Tema 1", path: `${base}/` },
          { title: `Bloque ${a.n}`, path: `${base}/${a.slug}/` },
          { title: `Act. ${n}`, path: me },
        ]}
      />
      <div className="flex items-start gap-4">
        <div className="mt-1 flex-none"><Icono k={A.ic} /></div>
        <div>
          <span className={chip}>Tema 1 · Bloque {a.n} · Actividad {n}</span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{A.t}</h1>
          <p className="mt-1 text-sm text-zinc-500">{A.d}</p>
        </div>
      </div>

      {A.fig ? <Fig k={A.fig} /> : null}

      {A.nv.map((nv, i) => (
        <section key={i} className={tarjeta}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className={NIVEL_CLS[i]}>{LABELS[i]}</span>
            {nv.in ? <p className="text-[15px] text-zinc-700" dangerouslySetInnerHTML={{ __html: md(nv.in) }} /> : null}
          </div>
          <div className="mt-2 space-y-1 text-[15px] text-zinc-800">
            {nv.p.map((p, j) => <p key={j} dangerouslySetInnerHTML={{ __html: md(p) }} />)}
          </div>
          {nv.ad ? (
            <div className="mt-2 rounded-xl border border-zinc-200 bg-white/70 p-4 text-[13px] text-zinc-600">
              <span className="text-sm font-bold uppercase tracking-wide text-zinc-500">🔧 Qué se adapta: </span>
              <span dangerouslySetInnerHTML={{ __html: md(nv.ad) }} />
            </div>
          ) : null}
          <details className="mt-3 rounded-xl border border-emerald-200 bg-white p-4 text-sm text-zinc-700">
            <summary className="cursor-pointer select-none font-bold text-emerald-700">Ver solución</summary>
            <div className="mt-2 space-y-1">{nv.s.map((s, j) => <p key={j} dangerouslySetInnerHTML={{ __html: md(s) }} />)}</div>
          </details>
        </section>
      ))}

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-100 p-5 text-sm text-zinc-700">
        <b>Mismo objetivo en los cinco niveles:</b> arriba va el ejercicio tal y como se plantea
        en 2.º de ESO; debajo, la misma actividad con más andamiaje (texto más corto, opción
        cerrada, banco de palabras, manipulativo, oral). No cambia la meta, cambia el acceso.
        Adaptación de acceso conforme al Decreto 104/2018 y la Orden 20/2019 (C. Valenciana).
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Link href={`${base}/${a.slug}/`} className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← Bloque {a.n}
        </Link>
        <div className="flex gap-3">
          <PrintButton />
          {next ? (
            <Link href={`${base}/${a.slug}/${String(n + 1).padStart(2, "0")}/`} className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
              Actividad {n + 1} →
            </Link>
          ) : (
            <Link href={`${base}/`} className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">Siguiente bloque →</Link>
          )}
        </div>
      </div>
    </div>
  );
}
