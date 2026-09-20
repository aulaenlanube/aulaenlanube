import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";
import { chip, n2, n1, n6, n5, tarjeta } from "../../../ui";
import { LineaH, Icono } from "../../../figuras";
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
    title: `Actividad ${Number(act)}: ${A.t} — Tema 1 ${a.t} — Adaptaciones PTE`,
    description: `${A.d}. Cuatro niveles de adaptación: 2.º ESO, 1.º ESO, 6.º y 5.º de primaria, con soluciones.`,
  };
}

function md(s: string) {
  return s.split("**").map((part, i) => (i % 2 ? <b key={i}>{part}</b> : part));
}

const CLSN = [n2, n1, n6, n5];

export default async function ActividadPTE({ params }: P) {
  const { ap, act } = await params;
  const ai = APS.findIndex((x) => x.slug === ap);
  const a = APS[ai];
  const n = Number(act);
  const acts = a ? ACTS[a.slug] : undefined;
  const A = acts?.[n - 1];
  if (!a || !A) notFound();
  const prev = acts[n - 2];
  const next = acts[n];
  const base = "/adaptaciones-pte/2eso/matematicas/tema-1";
  const me = `${base}/${a.slug}/${String(n).padStart(2, "0")}/`;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Adaptaciones PTE", path: "/adaptaciones-pte/" },
          { title: "2.º ESO", path: "/adaptaciones-pte/2eso/" },
          { title: "Matemáticas", path: "/adaptaciones-pte/2eso/matematicas/" },
          { title: "Tema 1", path: `${base}/` },
          { title: `Ap. ${a.n}`, path: `${base}/${a.slug}/` },
          { title: `Act. ${n}`, path: me },
        ]}
      />
      <div className="flex items-start gap-4">
        <div className="mt-1 flex-none"><Icono k={A.ic} /></div>
        <div>
          <span className={chip}>Tema 1 · Apartado {a.n} · Actividad {n}</span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{A.t}</h1>
          <p className="mt-1 text-sm text-zinc-500">{A.d}</p>
        </div>
      </div>

      {A.ln ? <LineaH desde={A.ln[0]} hasta={A.ln[1]} marcas={A.ln[2].map(([x, label, color]) => ({ x, label, color: color as "rojo" }))} caption="Recta numérica horizontal de apoyo para esta actividad." /> : null}

      {A.nv.map((nv, i) => (
        <section key={i} className={tarjeta}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className={CLSN[i]}>{LABELS[i]}</span>
            {nv.in ? <p className="text-[15px] text-zinc-700">{md(nv.in)}</p> : null}
          </div>
          <div className="mt-2 space-y-1 text-[15px] text-zinc-800">
            {nv.p.map((p, j) => <p key={j}>{md(p)}</p>)}
          </div>
          {nv.ad ? (
            <div className="mt-2 rounded-xl border border-zinc-200 bg-white/70 p-4 text-[13px] text-zinc-600">
              <span className="text-sm font-bold uppercase tracking-wide text-zinc-500">🔧 Qué se adapta: </span>
              {md(nv.ad)}
            </div>
          ) : null}
          <details className="mt-3 rounded-xl border border-emerald-200 bg-white p-4 text-sm text-zinc-700">
            <summary className="cursor-pointer select-none font-bold text-emerald-700">Ver solución</summary>
            <div className="mt-2 space-y-1">{nv.s.map((s, j) => <p key={j}>{md(s)}</p>)}</div>
          </details>
        </section>
      ))}

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-100 p-5 text-sm text-zinc-700">
        <b>Mismo objetivo en los cuatro niveles:</b> la actividad no cambia de meta, cambia de
        andamiaje (recta impresa, opción cerrada, manipulativo, oral). Adaptación de acceso
        conforme al Decreto 104/2018 y la Orden 20/2019 (C. Valenciana).
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Link href={`${base}/${a.slug}/`} className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← Apartado {a.n}
        </Link>
        <div className="flex gap-3">
          <PrintButton />
          {next ? (
            <Link href={`${base}/${a.slug}/${String(n + 1).padStart(2, "0")}/`} className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
              Actividad {n + 1} →
            </Link>
          ) : (
            <Link href={`${base}/`} className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">Siguiente apartado →</Link>
          )}
        </div>
      </div>
    </div>
  );
}
