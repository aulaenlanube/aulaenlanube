import type { Metadata } from "next";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";
import { BASE } from "../../../_datos";
import { Apartat, Definicio, Figura, Idea, Idees, Nota, chip } from "../../../_ui";
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

// Esquema del tema 1 de Música de 1.º de ESO (llibre en valencià, pàg. 8-14).
// Només inclou el que marca la guia d'estudi del professorat: els paràgrafs
// subratllats, els quadres morats, el quadre de les qualitats del so i les
// caixes laterals indicades. Les definicions dels quadres morats van literals.

export const metadata: Metadata = {
  title: "Música 1r d'ESO · Tema 1: el so i les seues qualitats (esquema) — Aula en la Nube",
  description:
    "Esquema per a estudiar el tema 1 de Música de 1r d'ESO: so, soroll i silenci; altura, duració, intensitat i timbre; figures i silencis musicals, matisos, reguladors i barres de repetició.",
};

const ENTRA = [
  { p: "Pàg. 8", t: "El so: d'on naix, com viatja i com l'oïm. Definició de so.", a: "#so" },
  { p: "Pàg. 9", t: "El soroll: ones regulars i irregulars, contaminació acústica i el sonòmetre.", a: "#soroll" },
  { p: "Pàg. 10", t: "El silenci: primer paràgraf i definició.", a: "#silenci" },
  { p: "Pàg. 11", t: "Quadre sencer de les qualitats del so.", a: "#qualitats" },
  { p: "Pàg. 12", t: "L'altura, «Recorda» (pentagrama i clau) i «Sabies que…» (Hz, infrasons i ultrasons).", a: "#altura" },
  { p: "Pàg. 13", t: "La duració, esquema de figures i silencis i «Sabies que…» (barres de repetició).", a: "#duracio" },
  { p: "Pàg. 14", t: "La intensitat («Saber-ne més» i esquema del volum) i el timbre.", a: "#intensitat" },
];

const BRANQUES: { titol: string; a: string; color: string; fulles: { nom: string; a: string; clau: string }[] }[] = [
  {
    titol: "1 · So, soroll i silenci",
    a: "#so",
    color: "border-sky-500",
    fulles: [
      { nom: "So", a: "#so", clau: "un cos vibra → ones sonores → timpà → cervell" },
      { nom: "Soroll", a: "#soroll", clau: "ona irregular · contaminació acústica · sonòmetre (dB)" },
      { nom: "Silenci", a: "#silenci", clau: "absència de so o soroll" },
    ],
  },
  {
    titol: "2 · Les qualitats del so",
    a: "#qualitats",
    color: "border-violet-500",
    fulles: [
      { nom: "Altura", a: "#altura", clau: "greus / aguts · hertz (Hz) · pentagrama, clau i notes" },
      { nom: "Duració", a: "#duracio", clau: "llargs / curts · figures i silencis" },
      { nom: "Intensitat", a: "#intensitat", clau: "forts / suaus · matisos (pp … ff) · reguladors" },
      { nom: "Timbre", a: "#timbre", clau: "qui o què produeix el so" },
    ],
  },
];

const QUALITATS = [
  {
    n: "1",
    nom: "Altura",
    poden: "Els sons poden ser aguts o greus.",
    exemple:
      "Quan et desplaces mentre toques cap a la dreta del xilòfon o el metal·lòfon (cap a les plaques més menudes), el so es fa progressivament més fi o agut, mentre que cap a l'esquerra es fa més gros o greu.",
    c: "border-rose-300 dark:border-rose-500/40",
    k: "bg-rose-600",
    t: "text-rose-700 dark:text-rose-300",
  },
  {
    n: "2",
    nom: "Duració",
    poden: "Els sons poden ser llargs o curts.",
    exemple: "Els sons en el metal·lòfon duren més temps que en el xilòfon.",
    c: "border-amber-300 dark:border-amber-500/40",
    k: "bg-amber-500",
    t: "text-amber-700 dark:text-amber-300",
  },
  {
    n: "3",
    nom: "Intensitat",
    poden: "Els sons poden ser forts o febles.",
    exemple: "Si colpeges amb més força l'instrument, obtens un so més fort, mentre que, si ho fas suaument, el so és més feble.",
    c: "border-emerald-300 dark:border-emerald-500/40",
    k: "bg-emerald-600",
    t: "text-emerald-700 dark:text-emerald-300",
  },
  {
    n: "4",
    nom: "Timbre",
    poden: "Els sons poden procedir de veus o d'instruments.",
    exemple: "Quan es toquen dos instruments diferents, com el metal·lòfon i el xilòfon, la sonoritat o color canvia en cada un.",
    c: "border-teal-300 dark:border-teal-500/40",
    k: "bg-teal-600",
    t: "text-teal-700 dark:text-teal-300",
  },
];

const FIGURES: { f: NomFigura; valor: string; c: string; t: string }[] = [
  { f: "redona", valor: "4", c: "border-orange-400", t: "text-orange-700 dark:text-orange-300" },
  { f: "blanca", valor: "2", c: "border-rose-400", t: "text-rose-700 dark:text-rose-300" },
  { f: "negra", valor: "1", c: "border-teal-500", t: "text-teal-700 dark:text-teal-300" },
  { f: "corxera", valor: "½", c: "border-violet-500", t: "text-violet-700 dark:text-violet-300" },
  { f: "semicorxera", valor: "¼", c: "border-lime-500", t: "text-lime-700 dark:text-lime-300" },
];

const PREGUNTES: { q: string; r: ReactNode }[] = [
  { q: "Què és el so?", r: <>És la sensació que experimentem quan ens arriben a l&apos;orella les ones produïdes per la vibració d&apos;un cos sonor.</> },
  { q: "Quan sorgeix el so i com viatja?", r: <>Quan un cos o un objecte vibra. La vibració es transmet en forma d&apos;ones sonores a través de diferents medis: l&apos;aire, l&apos;aigua, la fusta…</> },
  { q: "Quina part de l'orella vibra quan li arriben les ones sonores?", r: <>El timpà, una membrana elàstica que vibra i transmet la informació al cervell.</> },
  { q: "En què es diferencien el so i el soroll des d'un punt de vista físic?", r: <>En el tipus d&apos;ona: la del so és ordenada i regular; la del soroll, desordenada i irregular.</> },
  { q: "Què és la contaminació acústica? Quins efectes té?", r: <>L&apos;excés de soroll. Té efectes nocius sobre la salut: dificultat de comunicació, trastorns del son, estrès, pèrdua de capacitat auditiva, conductes agressives…</> },
  { q: "Digues quatre fonts de soroll ambiental.", r: <>Els mitjans de transport, l&apos;activitat industrial, la construcció i les zones d&apos;oci.</> },
  { q: "Per a què serveix un sonòmetre?", r: <>Per a mesurar el nivell de soroll, que es mesura en decibels (dB).</> },
  { q: "Què és el silenci?", r: <>L&apos;absència de so o soroll. En la música és una part fonamental de la composició i de la interpretació.</> },
  { q: "Quines són les quatre qualitats del so?", r: <>Altura, duració, intensitat i timbre.</> },
  { q: "En quina unitat es mesura l'altura? Com més hertzs…", r: <>En hertzs (Hz). Com més hertzs o vibracions per segon, més agut és el so.</> },
  { q: "Quins sons percep l'orella humana? Què són els infrasons i els ultrasons?", r: <>Entre 20 Hz i 20 000 Hz. Per davall de 20 Hz, infrasons; per damunt de 20 000 Hz, ultrasons.</> },
  { q: "Què és el pentagrama? I la clau?", r: <>El pentagrama és el conjunt de cinc línies i quatre espais en què s&apos;escriu la música. La clau és el signe musical que dona nom a les notes.</> },
  { q: "Ordena les figures de més llarga a més curta i digues quant val cadascuna.", r: <>Redona (4), blanca (2), negra (1), corxera (½) i semicorxera (¼).</> },
  { q: "Què indiquen les barres de repetició?", r: <>Que cal repetir el fragment des del principi o el fragment comprés entre les dues barres.</> },
  { q: "Ordena els matisos de més suau a més fort.", r: <>pp (pianissimo), p (piano), mp (mezzopiano), mf (mezzoforte), f (forte), ff (fortissimo).</> },
  { q: "Què volen dir crescendo i diminuendo?", r: <>Són reguladors. Crescendo (cresc.): augmentar progressivament la intensitat. Diminuendo (dim.): disminuir-la progressivament.</> },
  { q: "Què ens indica el timbre?", r: <>Qui o què produeix el so: així podem saber quin tipus de veu o d&apos;instrument sona.</> },
];

export default function MusicaTema1() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Materiales ESO y Bachillerato", path: BASE },
          { title: "1.º de ESO", path: `${BASE}1eso/` },
          { title: "Música", path: `${BASE}1eso/musica/` },
          { title: "Tema 1", path: `${BASE}1eso/musica/tema-1/` },
        ]}
      />

      <article lang="ca">
        <span className={chip}>1r d&apos;ESO · Música · Tema 1</span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Esquema del tema 1: el so i les seues qualitats</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Tot el que entra a l&apos;examen, ordenat i resumit a partir de les parts subratllades del llibre
          (pàgines 8 a 14). Les <b>definicions</b> dels quadres morats van <b>literals</b>: són les que cal
          saber de memòria.
        </p>
        <div className="mt-4 no-print">
          <PrintButton />
        </div>

        {/* ── Què entra ─────────────────────────────────────────────────── */}
        <section className="mt-8 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 p-5">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Què entra a l&apos;examen</h2>
          <ul className="mt-3 grid gap-1.5 text-[15px] text-zinc-700 dark:text-zinc-300">
            {ENTRA.map((e) => (
              <li key={e.p} className="flex gap-3">
                <span className="w-16 flex-none font-bold text-zinc-900 dark:text-zinc-100">{e.p}</span>
                <a href={e.a} className="hover:underline">{e.t}</a>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Esquema general ───────────────────────────────────────────── */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Esquema general</h2>
          <div className="mt-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5">
            <div className="flex justify-center">
              <span className="rounded-full bg-slate-700 px-5 py-2 text-base font-extrabold text-white">El so</span>
            </div>
            <div className="mx-auto h-5 w-0.5 bg-zinc-300 dark:bg-white/20" aria-hidden />
            <div className="grid gap-4 md:grid-cols-2">
              {BRANQUES.map((b) => (
                <div key={b.titol} className={`rounded-xl border-2 ${b.color} p-4`}>
                  <a href={b.a} className="text-lg font-bold text-zinc-900 dark:text-zinc-100 hover:underline">{b.titol}</a>
                  <ul className="mt-3 space-y-2.5 border-l-2 border-zinc-300 dark:border-white/20 pl-4">
                    {b.fulles.map((f) => (
                      <li key={f.nom} className="relative text-[15px] leading-snug text-zinc-700 dark:text-zinc-300">
                        <span aria-hidden className="absolute -left-4 top-2.5 h-0.5 w-3 bg-zinc-300 dark:bg-white/20" />
                        <a href={f.a} className="font-bold text-zinc-900 dark:text-zinc-100 hover:underline">{f.nom}</a>
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
        <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">1 · So, soroll i silenci</h2>

        <Apartat id="so" num="1.1" titol="El so" pagina="pàg. 8" tono="sky">
          <ol className="mt-4 grid gap-2 text-sm font-semibold sm:grid-cols-4">
            {["Un cos vibra", "Ones sonores pel medi (aire, aigua, fusta…)", "El timpà de l'orella vibra", "La informació arriba al cervell"].map(
              (pas, i) => (
                <li key={pas} className="flex items-center gap-2 rounded-lg border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 px-3 py-2 text-sky-900 dark:text-sky-100">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-sky-600 text-xs text-white">{i + 1}</span>
                  {pas}
                </li>
              ),
            )}
          </ol>
          <Idees>
            <Idea>
              El so sorgeix quan un <b>cos</b> o un objecte <b>vibra</b>.
            </Idea>
            <Idea>
              La vibració es transmet en forma d&apos;<b>ones sonores</b> que viatgen a través de diferents <b>medis</b>: l&apos;aire,
              l&apos;aigua, la fusta…
            </Idea>
            <Idea>
              Percebem les ones del so gràcies a l&apos;<b>orella</b>. En aquest òrgan hi ha una membrana elàstica, anomenada{" "}
              <b>timpà</b>, que vibra quan li arriben les ones sonores i transmet aquesta informació al <b>cervell</b>.
            </Idea>
          </Idees>
          <Definicio>
            El <b>so</b> és la sensació que experimentem quan ens arriben a l&apos;orella les ones produïdes per la{" "}
            <b>vibració d&apos;un cos sonor</b>.
          </Definicio>
        </Apartat>

        <Apartat id="soroll" num="1.2" titol="El soroll" pagina="pàg. 9" tono="sky">
          <Idees>
            <Idea>
              Des d&apos;un punt de vista físic, <b>el soroll i el so es diferencien pel tipus d&apos;ona que produeixen</b>.
            </Idea>
          </Idees>
          <Definicio>
            L&apos;ona d&apos;un <b>so</b> és <b>ordenada i regular</b>, mentre que l&apos;ona del <b>soroll</b> és{" "}
            <b>desordenada i irregular</b>.
          </Definicio>
          <Figura peu="Ones regulars (so, per exemple un saxòfon) i ones irregulars (soroll, per exemple uns plats).">
            <OnesSoSoroll />
          </Figura>

          <h4 className="mt-6 font-bold text-zinc-900 dark:text-zinc-100">La contaminació acústica</h4>
          <Idees>
            <Idea>
              L&apos;excés de soroll es denomina <b>contaminació acústica</b>. És un problema en la nostra societat, perquè redueix
              el nivell de qualitat de vida, ja que té <b>efectes nocius sobre la salut</b>:
              <span className="mt-2 flex flex-wrap gap-1.5">
                {["dificultat de comunicació", "trastorns del son", "estrès", "pèrdua de capacitat auditiva", "conductes agressives", "etc."].map((x) => (
                  <span key={x} className="rounded-full border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 px-2.5 py-0.5 text-sm text-rose-800 dark:text-rose-200">{x}</span>
                ))}
              </span>
            </Idea>
            <Idea>
              Algunes de les <b>fonts de soroll ambiental</b> són:
              <span className="mt-2 flex flex-wrap gap-1.5">
                {["🚗 els mitjans de transport", "🏭 l'activitat industrial", "🏗️ la construcció", "🎉 les zones d'oci"].map((x) => (
                  <span key={x} className="rounded-full border border-zinc-200 dark:border-white/15 bg-zinc-50 dark:bg-white/5 px-2.5 py-0.5 text-sm">{x}</span>
                ))}
              </span>
            </Idea>
          </Idees>
          <Nota tipus="info" titol="El sonòmetre: per a què serveix?">
            El nivell de soroll es mesura en <b>decibels (dB)</b> i l&apos;aparell que s&apos;utilitza per a mesurar-lo es diu{" "}
            <b>sonòmetre</b>. Aplicacions com <i>Sound Meter</i> o <i>Mesurador de decibels</i>, entre altres, poden servir-te per a
            mesurar el nivell de soroll en el teu entorn.
          </Nota>
        </Apartat>

        <Apartat id="silenci" num="1.3" titol="El silenci" pagina="pàg. 10" tono="sky">
          <Idees>
            <Idea>
              En la música, <b>el silenci és una part fonamental</b> tant de la <b>composició</b> com de la <b>interpretació</b>.
            </Idea>
            <Idea>
              La utilització combinada de <b>so i silenci</b> és la base de la creació musical.
            </Idea>
          </Idees>
          <Definicio>
            El <b>silenci</b> és l&apos;<b>absència</b> de so o soroll.
          </Definicio>
        </Apartat>

        {/* ══ 2. Les qualitats del so ═════════════════════════════════════ */}
        <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">2 · Les qualitats del so</h2>

        <section id="qualitats" className="mt-6 scroll-mt-24 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 sm:p-6">
          <header className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">Quadre de les qualitats del so</h3>
            <span className="ml-auto rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              pàg. 11 · sencer
            </span>
          </header>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Els exemples comparen el <b>xilòfon</b> (plaques de fusta) i el <b>metal·lòfon</b> (plaques metàl·liques).
          </p>
          <div className="mt-4 grid gap-3">
            {QUALITATS.map((q) => (
              <div key={q.n} className={`grid gap-3 rounded-xl border-2 ${q.c} p-4 sm:grid-cols-[13rem_1fr]`}>
                <div className="flex gap-3">
                  <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-lg text-xl font-extrabold text-white ${q.k}`}>{q.n}</span>
                  <div>
                    <div className={`text-lg font-bold ${q.t}`}>{q.nom}</div>
                    <div className="text-sm text-zinc-700 dark:text-zinc-300">{q.poden}</div>
                  </div>
                </div>
                <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                  <span aria-hidden className="mr-1 text-zinc-400">→</span>
                  {q.exemple}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Apartat id="altura" num="2.1" titol="L'altura" pagina="pàg. 12" tono="rose">
          <Definicio>
            L&apos;<b>altura</b> és la qualitat del so que distingeix entre sons <b>greus i aguts</b>.
          </Definicio>
          <Idees>
            <Idea>
              Com la resta de les qualitats del so, l&apos;altura també es pot mesurar; la unitat de mesura corresponent és
              l&apos;<b>hertz (Hz)</b>. Com més hertzs o vibracions per segon es produïsquen, <b>més agut</b> és el so.
            </Idea>
            <Idea>
              L&apos;altura dels sons es representa mitjançant <b>el pentagrama, la clau i les notes musicals</b>.
            </Idea>
          </Idees>
          <Figura peu="Les notes en clau de sol, de més greu (esquerra) a més aguda (dreta).">
            <EscalaDo />
          </Figura>
          <Nota tipus="recorda">
            <p>
              <b>Pentagrama:</b> és el conjunt de <b>cinc línies i quatre espais</b>{" "}en què s&apos;escriu la música.
            </p>
            <p className="mt-1">
              <b>Clau:</b> signe musical que <b>dona nom a les notes</b>.
            </p>
            <div className="mt-3 overflow-x-auto rounded-lg bg-white/70 dark:bg-slate-900/60 p-2">
              <PentagramaParts />
            </div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Línies i espais es compten de baix a dalt. La clau de sol naix en la 2a línia: la nota d&apos;eixa línia es diu sol.
            </p>
          </Nota>
          <Nota tipus="sabies">
            <p>
              L&apos;orella humana percep freqüències entre <b>20 Hz</b> (to més baix) i <b>20 000 Hz</b> (to més alt). Els sons per
              davall de 20 Hz es consideren <b>infrasons</b>, mentre que els sons per damunt de 20 000 Hz són considerats{" "}
              <b>ultrasons</b>.
            </p>
            <div className="mt-3 grid grid-cols-[1fr_2fr_1fr] overflow-hidden rounded-lg border border-amber-300 dark:border-amber-500/40 text-center text-sm">
              <div className="bg-zinc-200 dark:bg-white/10 px-2 py-2">
                <b>Infrasons</b>
                <div className="text-xs">menys de 20 Hz</div>
              </div>
              <div className="bg-amber-200/70 dark:bg-amber-500/25 px-2 py-2">
                <b>👂 Ho sentim</b>
                <div className="text-xs">de 20 Hz a 20 000 Hz</div>
              </div>
              <div className="bg-zinc-200 dark:bg-white/10 px-2 py-2">
                <b>Ultrasons</b>
                <div className="text-xs">més de 20 000 Hz</div>
              </div>
            </div>
          </Nota>
        </Apartat>

        <Apartat id="duracio" num="2.2" titol="La duració" pagina="pàg. 13" tono="amber">
          <Definicio>
            La <b>duració</b> és la qualitat que diferencia entre sons <b>llargs i curts</b>, i es representa amb{" "}
            <b>figures i silencis musicals</b>.
          </Definicio>
          <h4 className="mt-6 font-bold text-zinc-900 dark:text-zinc-100">Esquema de les figures i els silencis musicals</h4>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Cada figura té el seu silenci, que dura el mateix. El número és el valor (en temps).
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {FIGURES.map((x) => (
              <div key={x.f} className={`rounded-xl border-2 ${x.c} bg-white dark:bg-slate-900 p-2 text-center`}>
                <FiguraISilenci f={x.f} />
                <div className="flex justify-around text-[11px] uppercase tracking-wide text-zinc-400">
                  <span>figura</span>
                  <span>silenci</span>
                </div>
                <div className="mt-1 text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">{x.valor}</div>
                <div className={`font-bold capitalize ${x.t}`}>{x.f}</div>
              </div>
            ))}
          </div>
          <Nota tipus="info" titol="Truc per a recordar-ho">
            Cada figura dura <b>la meitat</b>{" "}que l&apos;anterior: 1 redona = 2 blanques = 4 negres = 8 corxeres = 16 semicorxeres.
          </Nota>
          <Nota tipus="sabies">
            <p>
              Els <b>signes de repetició</b> eviten tornar a escriure un mateix fragment quan es repeteix. Les{" "}
              <b>barres de repetició</b> ens indiquen que cal:
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="overflow-x-auto rounded-lg bg-white/70 dark:bg-slate-900/60 p-2">
                <RepetirDesDelPrincipi />
                <p className="mt-1 text-center text-sm font-semibold">Repetir el fragment des del principi.</p>
              </div>
              <div className="overflow-x-auto rounded-lg bg-white/70 dark:bg-slate-900/60 p-2">
                <RepetirEntreBarres />
                <p className="mt-1 text-center text-sm font-semibold">Repetir el fragment comprés entre les dues barres.</p>
              </div>
            </div>
          </Nota>
        </Apartat>

        <Apartat id="intensitat" num="2.3" titol="La intensitat" pagina="pàg. 14" tono="emerald">
          <Nota tipus="mes">
            <p>
              Per indicar l&apos;augment o la disminució <b>gradual</b> de la intensitat, se solen utilitzar uns signes anomenats{" "}
              <b>reguladors</b>:
            </p>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center gap-3">
                <Regulador tipus="cresc" />
                <span>
                  <b>Crescendo</b> (<i>cresc.</i>) = augmentar progressivament la intensitat.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Regulador tipus="dim" />
                <span>
                  <b>Diminuendo</b> (<i>dim.</i>) = disminuir progressivament la intensitat.
                </span>
              </li>
            </ul>
          </Nota>
          <Definicio>
            La <b>intensitat</b> és la qualitat que distingeix entre sons <b>forts i suaus</b>.
          </Definicio>
          <h4 className="mt-6 font-bold text-zinc-900 dark:text-zinc-100">Esquema del volum: els matisos (copiar i estudiar)</h4>
          <Figura peu="La intensitat es representa amb matisos. De més suau (esquerra) a més fort (dreta).">
            <EsquemaVolum />
          </Figura>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[28rem] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-zinc-300 dark:border-white/15 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  <th className="py-1.5 pr-3">Signe</th>
                  <th className="py-1.5 pr-3">Nom</th>
                  <th className="py-1.5">Vol dir</th>
                </tr>
              </thead>
              <tbody>
                {MATISOS.map((m) => (
                  <tr key={m.m} className="border-b border-zinc-200 dark:border-white/10">
                    <td className="py-1.5 pr-3 font-serif text-lg font-bold italic">{m.m}</td>
                    <td className="py-1.5 pr-3 italic">{m.nom}</td>
                    <td className="py-1.5 text-zinc-600 dark:text-zinc-400">{m.sentit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Apartat>

        <Apartat id="timbre" num="2.4" titol="El timbre" pagina="pàg. 14" tono="teal">
          <Definicio>
            El <b>timbre</b> és la qualitat del so que ens indica <b>qui o què el produeix</b>.
          </Definicio>
          <Idees>
            <Idea>
              D&apos;aquesta manera es pot determinar <b>quin tipus de veu o d&apos;instrument</b> sonen tan bon punt els sents.
            </Idea>
          </Idees>
        </Apartat>

        {/* ── Repàs ─────────────────────────────────────────────────────── */}
        <section className="mt-12 print-break">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Comprova-ho: preguntes de repàs</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Intenta respondre de memòria i després obri la resposta per a comprovar-la.
          </p>
          <ol className="mt-4 grid gap-2">
            {PREGUNTES.map((p, i) => (
              <li key={p.q}>
                <details className="group rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 px-4 py-3">
                  <summary className="cursor-pointer list-none font-semibold text-zinc-900 dark:text-zinc-100">
                    <span className="mr-2 text-zinc-400">{i + 1}.</span>
                    {p.q}
                    <span className="ml-2 text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300 group-open:hidden">Veure resposta</span>
                  </summary>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">{p.r}</p>
                </details>
              </li>
            ))}
          </ol>
        </section>
      </article>
    </div>
  );
}
