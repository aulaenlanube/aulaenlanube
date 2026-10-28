import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";
import { BASE } from "../../../_datos";
import { scriptIdioma, type Idioma } from "../../../_idioma";
import { Apartat, Definicio, Figura, Idea, Idees, Nota, R, chip } from "../../../_ui";
import BaixarMapa from "../../../_cliente/baixar-mapa";
import SelectorIdioma from "../../../_cliente/selector-idioma";
import {
  EscalaDo,
  EsquemaVolum,
  FiguraISilenci,
  MATISOS,
  OnesSoSoroll,
  PentagramaParts,
  Regulador,
  RepetirDesDelPrincipi,
  RepetirEntreBarres,
  type Figura as NomFigura,
} from "../../../_musica/notacion";
import { MapaConceptual } from "./mapa";
import { T } from "./textos";

// Esquema del tema 1 de Música de 1.º de ESO (llibre en valencià, pàg. 8-14),
// en valenciano y en castellano. Solo incluye lo que marca la guía de estudio
// del profesorado: los párrafos subrayados, los «quadres morats», el cuadro de
// las cualidades del sonido y las cajas laterales indicadas. Arriba, el mapa
// conceptual de una página (descargable); debajo, el esquema detallado.
//
// Se pintan las DOS versiones y el contenedor `#tema-1` decide cuál se ve
// (`data-idioma`, ver _idioma.ts). Los ids de la versión castellana llevan el
// sufijo `-es` para que las anclas no se repitan.

export const metadata: Metadata = {
  title: T.ca.titolDoc,
  description:
    "Esquema i mapa conceptual per a estudiar el tema 1 de Música de 1r d'ESO, en valencià i en castellà: so, soroll i silenci; altura, duració, intensitat i timbre; figures i silencis, matisos, reguladors i barres de repetició.",
};

const CONTENIDOR = "tema-1";

const QUALITATS_TONS = [
  { c: "border-rose-300 dark:border-rose-500/40", k: "bg-rose-600", t: "text-rose-700 dark:text-rose-300" },
  { c: "border-amber-300 dark:border-amber-500/40", k: "bg-amber-500", t: "text-amber-700 dark:text-amber-300" },
  { c: "border-emerald-300 dark:border-emerald-500/40", k: "bg-emerald-600", t: "text-emerald-700 dark:text-emerald-300" },
  { c: "border-teal-300 dark:border-teal-500/40", k: "bg-teal-600", t: "text-teal-700 dark:text-teal-300" },
];

const FIGURES: { f: NomFigura; valor: string; c: string; t: string }[] = [
  { f: "redona", valor: "4", c: "border-orange-400", t: "text-orange-700 dark:text-orange-300" },
  { f: "blanca", valor: "2", c: "border-rose-400", t: "text-rose-700 dark:text-rose-300" },
  { f: "negra", valor: "1", c: "border-teal-500", t: "text-teal-700 dark:text-teal-300" },
  { f: "corxera", valor: "½", c: "border-violet-500", t: "text-violet-700 dark:text-violet-300" },
  { f: "semicorxera", valor: "¼", c: "border-lime-500", t: "text-lime-700 dark:text-lime-300" },
];

const BRANCA_COLOR = ["border-sky-500", "border-violet-500"];

const h2 = "text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100";
const h4 = "mt-6 font-bold text-zinc-900 dark:text-zinc-100";
const pastilla =
  "ml-auto rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400";

function Versio({ l }: { l: Idioma }) {
  const t = T[l];
  const id = (a: string) => (l === "ca" ? a : `${a}-es`);
  const pag = (n: number) => `${t.pag} ${n}`;
  return (
    <div className={l === "ca" ? "solo-ca" : "solo-es"} lang={l}>
      <div className="mx-auto max-w-4xl">
        <span className={chip}>{t.chip}</span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{t.h1}</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          <R s={t.intro} />
        </p>
      </div>

      {/* ── Mapa conceptual (una pàgina) ─────────────────────────────── */}
      <section id={id("mapa")} className="mt-8 scroll-mt-24">
        <div className="mx-auto flex max-w-4xl flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className={h2}>{t.mapaTitol}</h2>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">{t.mapaIntro}</p>
          </div>
          <BaixarMapa svgId={`mapa-svg-${l}`} nom={`mapa-conceptual-musica-1eso-tema1-${l === "ca" ? "valencia" : "castellano"}`} t={t.baixar} />
        </div>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm dark:brightness-95">
          <MapaConceptual l={l} id={`mapa-svg-${l}`} />
        </div>
      </section>

      <div className="mx-auto max-w-4xl">
        <div className="mt-8 no-print">
          <PrintButton label={t.imprimir} />
        </div>

        {/* ── Què entra ─────────────────────────────────────────────────── */}
        <section className="mt-6 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 p-5">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{t.entraTitol}</h2>
          <ul className="mt-3 grid gap-1.5 text-[15px] text-zinc-700 dark:text-zinc-300">
            {t.entra.map((e) => (
              <li key={e.p} className="flex gap-3">
                <span className="w-16 flex-none font-bold text-zinc-900 dark:text-zinc-100">{e.p}</span>
                <a href={`#${id(e.a)}`} className="hover:underline">
                  {e.t}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Esquema general ───────────────────────────────────────────── */}
        <section className="mt-8">
          <h2 className={h2}>{t.esquemaTitol}</h2>
          <div className="mt-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5">
            <div className="flex justify-center">
              <span className="rounded-full bg-slate-700 px-5 py-2 text-base font-extrabold text-white">{t.arrel}</span>
            </div>
            <div className="mx-auto h-5 w-0.5 bg-zinc-300 dark:bg-white/20" aria-hidden />
            <div className="grid gap-4 md:grid-cols-2">
              {t.branques.map((b, i) => (
                <div key={b.titol} className={`rounded-xl border-2 ${BRANCA_COLOR[i]} p-4`}>
                  <a href={`#${id(b.a)}`} className="text-lg font-bold text-zinc-900 dark:text-zinc-100 hover:underline">
                    {b.titol}
                  </a>
                  <ul className="mt-3 space-y-2.5 border-l-2 border-zinc-300 dark:border-white/20 pl-4">
                    {b.fulles.map((f) => (
                      <li key={f.nom} className="relative text-[15px] leading-snug text-zinc-700 dark:text-zinc-300">
                        <span aria-hidden className="absolute -left-4 top-2.5 h-0.5 w-3 bg-zinc-300 dark:bg-white/20" />
                        <a href={`#${id(f.a)}`} className="font-bold text-zinc-900 dark:text-zinc-100 hover:underline">
                          {f.nom}
                        </a>
                        <span className="text-zinc-400"> — </span>
                        {f.clau}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 1. So, soroll i silenci ══════════════════════════════════════ */}
        <h2 className={`mt-12 ${h2}`}>{t.b1}</h2>

        <Apartat id={id("so")} num="1.1" titol={t.so.titol} pagina={pag(8)} tono="sky">
          <ol className="mt-4 grid gap-2 text-sm font-semibold sm:grid-cols-4">
            {t.so.passos.map((pas, i) => (
              <li
                key={pas}
                className="flex items-center gap-2 rounded-lg border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 px-3 py-2 text-sky-900 dark:text-sky-100"
              >
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-sky-600 text-xs text-white">{i + 1}</span>
                {pas}
              </li>
            ))}
          </ol>
          <Idees>
            {t.so.idees.map((s) => (
              <Idea key={s}>
                <R s={s} />
              </Idea>
            ))}
          </Idees>
          <Definicio etiqueta={t.definicio}>
            <R s={t.so.def} />
          </Definicio>
        </Apartat>

        <Apartat id={id("soroll")} num="1.2" titol={t.soroll.titol} pagina={pag(9)} tono="sky">
          <Idees>
            <Idea>
              <R s={t.soroll.idea} />
            </Idea>
          </Idees>
          <Definicio etiqueta={t.definicio}>
            <R s={t.soroll.def} />
          </Definicio>
          <Figura peu={t.soroll.figPeu}>
            <OnesSoSoroll l={l} />
          </Figura>

          <h4 className={h4}>{t.soroll.contTitol}</h4>
          <Idees>
            <Idea>
              <R s={t.soroll.cont} />
              <span className="mt-2 flex flex-wrap gap-1.5">
                {t.soroll.efectes.map((x) => (
                  <span key={x} className="rounded-full border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 px-2.5 py-0.5 text-sm text-rose-800 dark:text-rose-200">
                    {x}
                  </span>
                ))}
              </span>
            </Idea>
            <Idea>
              <R s={t.soroll.fontsIdea} />
              <span className="mt-2 flex flex-wrap gap-1.5">
                {t.soroll.fonts.map((x) => (
                  <span key={x} className="rounded-full border border-zinc-200 dark:border-white/15 bg-zinc-50 dark:bg-white/5 px-2.5 py-0.5 text-sm">
                    {x}
                  </span>
                ))}
              </span>
            </Idea>
          </Idees>
          <Nota tipus="info" titol={t.soroll.sonometreTitol}>
            <R s={t.soroll.sonometre} />
          </Nota>
        </Apartat>

        <Apartat id={id("silenci")} num="1.3" titol={t.silenci.titol} pagina={pag(10)} tono="sky">
          <Idees>
            {t.silenci.idees.map((s) => (
              <Idea key={s}>
                <R s={s} />
              </Idea>
            ))}
          </Idees>
          <Definicio etiqueta={t.definicio}>
            <R s={t.silenci.def} />
          </Definicio>
        </Apartat>

        {/* ══ 2. Les qualitats del so ═════════════════════════════════════ */}
        <h2 className={`mt-12 ${h2}`}>{t.b2}</h2>

        <section id={id("qualitats")} className="mt-6 scroll-mt-24 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 sm:p-6">
          <header className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">{t.qualitats.titol}</h3>
            <span className={pastilla}>{t.qualitats.pagina}</span>
          </header>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            <R s={t.qualitats.intro} />
          </p>
          <div className="mt-4 grid gap-3">
            {t.qualitats.items.map((q, i) => {
              const k = QUALITATS_TONS[i];
              return (
                <div key={q.nom} className={`grid gap-3 rounded-xl border-2 ${k.c} p-4 sm:grid-cols-[13rem_1fr]`}>
                  <div className="flex gap-3">
                    <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-lg text-xl font-extrabold text-white ${k.k}`}>{i + 1}</span>
                    <div>
                      <div className={`text-lg font-bold ${k.t}`}>{q.nom}</div>
                      <div className="text-sm text-zinc-700 dark:text-zinc-300">{q.poden}</div>
                    </div>
                  </div>
                  <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                    <span aria-hidden className="mr-1 text-zinc-400">→</span>
                    {q.exemple}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <Apartat id={id("altura")} num="2.1" titol={t.altura.titol} pagina={pag(12)} tono="rose">
          <Definicio etiqueta={t.definicio}>
            <R s={t.altura.def} />
          </Definicio>
          <Idees>
            {t.altura.idees.map((s) => (
              <Idea key={s}>
                <R s={s} />
              </Idea>
            ))}
          </Idees>
          <Figura peu={t.altura.figPeu}>
            <EscalaDo l={l} />
          </Figura>
          <Nota tipus="recorda" titol={t.altura.recordaTitol}>
            {t.altura.recorda.map((s, i) => (
              <p key={s} className={i ? "mt-1" : undefined}>
                <R s={s} />
              </p>
            ))}
            <div className="mt-3 overflow-x-auto rounded-lg bg-white/70 dark:bg-slate-900/60 p-2">
              <PentagramaParts l={l} />
            </div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{t.altura.recordaPeu}</p>
          </Nota>
          <Nota tipus="sabies" titol={t.altura.sabiesTitol}>
            <p>
              <R s={t.altura.sabies} />
            </p>
            <div className="mt-3 grid grid-cols-[1fr_2fr_1fr] overflow-hidden rounded-lg border border-amber-300 dark:border-amber-500/40 text-center text-sm">
              {t.altura.banda.map((b, i) => (
                <div key={b.t} className={i === 1 ? "bg-amber-200/70 dark:bg-amber-500/25 px-2 py-2" : "bg-zinc-200 dark:bg-white/10 px-2 py-2"}>
                  <b>{b.t}</b>
                  <div className="text-xs">{b.d}</div>
                </div>
              ))}
            </div>
          </Nota>
        </Apartat>

        <Apartat id={id("duracio")} num="2.2" titol={t.duracio.titol} pagina={pag(13)} tono="amber">
          <Definicio etiqueta={t.definicio}>
            <R s={t.duracio.def} />
          </Definicio>
          <h4 className={h4}>{t.duracio.esqTitol}</h4>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{t.duracio.esqIntro}</p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {FIGURES.map((x, i) => (
              <div key={x.f} className={`rounded-xl border-2 ${x.c} bg-white dark:bg-slate-900 p-2 text-center`}>
                <FiguraISilenci f={x.f} etiqueta={`${t.duracio.noms[i]}: ${t.duracio.figura} ${l === "ca" ? "i" : "y"} ${t.duracio.silenci}`} />
                <div className="flex justify-around text-[11px] uppercase tracking-wide text-zinc-400">
                  <span>{t.duracio.figura}</span>
                  <span>{t.duracio.silenci}</span>
                </div>
                <div className="mt-1 text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">{x.valor}</div>
                <div className={`font-bold capitalize ${x.t}`}>{t.duracio.noms[i]}</div>
              </div>
            ))}
          </div>
          <Nota tipus="info" titol={t.duracio.trucTitol}>
            <R s={t.duracio.truc} />
          </Nota>
          <Nota tipus="sabies" titol={t.duracio.sabiesTitol}>
            <p>
              <R s={t.duracio.sabies} />
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="overflow-x-auto rounded-lg bg-white/70 dark:bg-slate-900/60 p-2">
                <RepetirDesDelPrincipi etiqueta={t.duracio.repetir[0]} />
                <p className="mt-1 text-center text-sm font-semibold">{t.duracio.repetir[0]}</p>
              </div>
              <div className="overflow-x-auto rounded-lg bg-white/70 dark:bg-slate-900/60 p-2">
                <RepetirEntreBarres etiqueta={t.duracio.repetir[1]} />
                <p className="mt-1 text-center text-sm font-semibold">{t.duracio.repetir[1]}</p>
              </div>
            </div>
          </Nota>
        </Apartat>

        <Apartat id={id("intensitat")} num="2.3" titol={t.intensitat.titol} pagina={pag(14)} tono="emerald">
          <Nota tipus="mes" titol={t.intensitat.mesTitol}>
            <p>
              <R s={t.intensitat.mes} />
            </p>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center gap-3">
                <Regulador tipus="cresc" />
                <span>
                  <R s={t.intensitat.cresc} />
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Regulador tipus="dim" />
                <span>
                  <R s={t.intensitat.dim} />
                </span>
              </li>
            </ul>
          </Nota>
          <Definicio etiqueta={t.definicio}>
            <R s={t.intensitat.def} />
          </Definicio>
          <h4 className={h4}>{t.intensitat.esqTitol}</h4>
          <Figura peu={t.intensitat.figPeu}>
            <EsquemaVolum l={l} />
          </Figura>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[28rem] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-zinc-300 dark:border-white/15 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {t.intensitat.taula.map((c, i) => (
                    <th key={c} className={i < 2 ? "py-1.5 pr-3" : "py-1.5"}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATISOS.map((m, i) => (
                  <tr key={m.m} className="border-b border-zinc-200 dark:border-white/10">
                    <td className="py-1.5 pr-3 font-serif text-lg font-bold italic">{m.m}</td>
                    <td className="py-1.5 pr-3 italic">{m.nom}</td>
                    <td className="py-1.5 text-zinc-600 dark:text-zinc-400">{t.intensitat.sentits[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Apartat>

        <Apartat id={id("timbre")} num="2.4" titol={t.timbre.titol} pagina={pag(14)} tono="teal">
          <Definicio etiqueta={t.definicio}>
            <R s={t.timbre.def} />
          </Definicio>
          <Idees>
            <Idea>
              <R s={t.timbre.idea} />
            </Idea>
          </Idees>
        </Apartat>

        {/* ── Repàs ─────────────────────────────────────────────────────── */}
        <section className="mt-12 print-break">
          <h2 className={h2}>{t.repasTitol}</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">{t.repasIntro}</p>
          <ol className="mt-4 grid gap-2">
            {t.preguntes.map((p, i) => (
              <li key={p.q}>
                <details className="group rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 px-4 py-3">
                  <summary className="cursor-pointer list-none font-semibold text-zinc-900 dark:text-zinc-100">
                    <span className="mr-2 text-zinc-400">{i + 1}.</span>
                    {p.q}
                    <span className="ml-2 text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300 group-open:hidden">{t.veure}</span>
                  </summary>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">{p.r}</p>
                </details>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}

export default function MusicaTema1() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs
          items={[
            { title: "Materiales ESO y Bachillerato", path: BASE },
            { title: "1.º de ESO", path: `${BASE}1eso/` },
            { title: "Música", path: `${BASE}1eso/musica/` },
            { title: "Tema 1", path: `${BASE}1eso/musica/tema-1/` },
          ]}
        />
      </div>
      <div id={CONTENIDOR} data-idioma="ca" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: scriptIdioma(CONTENIDOR) }} />
        <div className="mx-auto mb-4 flex max-w-4xl justify-end">
          <SelectorIdioma objectiu={CONTENIDOR} titols={{ ca: T.ca.titolDoc, es: T.es.titolDoc }} />
        </div>
        <Versio l="ca" />
        <Versio l="es" />
      </div>
    </div>
  );
}
