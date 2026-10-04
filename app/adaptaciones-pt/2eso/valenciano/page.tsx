import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { chip } from "./ui";

export const metadata: Metadata = {
  title: "Valencià · 2n ESO — Adaptaciones PT — Aula en la Nube",
  description:
    "Temari de Valencià amb adaptacions PT: cada tema amb els seus blocs de teoria, exemples i activitats en cinc nivells (l'exercici base de 2n d'ESO i les adaptacions a 1r d'ESO, 6è, 5è i 4t de primària).",
};

const TEMAS = [
  { n: "Tema 1", t: "Comunicació, llengua i ortografia", href: "/adaptaciones-pt/2eso/valenciano/tema-1/", listo: true,
    d: "8 blocs: repàs, la comunicació i les funcions del llenguatge, la diversitat lingüística, classes de paraules, sintagmes, signes de puntuació, ortografia de les vocals i narrativa oral (rondalles i llegendes, llibre U1). Amb els exercicis adaptats ja publicats." },
  { n: "Tema 2", t: "El text narratiu: contes i llegendes", href: "", listo: false, d: "En preparació." },
  { n: "Tema 3", t: "Vocals en contacte i dígrafs", href: "", listo: false, d: "En preparació." },
  { n: "Tema 4", t: "El text descriptiu i la publicitat", href: "", listo: false, d: "En preparació." },
  { n: "Tema 5", t: "El verb i els temps verbals", href: "", listo: false, d: "En preparació." },
  { n: "Tema 6", t: "La lírica: poemes i cançons", href: "", listo: false, d: "En preparació." },
  { n: "Tema 7", t: "El teatre i la lectura dramatitzada", href: "", listo: false, d: "En preparació." },
  { n: "Tema 8", t: "Els mitjans de comunicació", href: "", listo: false, d: "En preparació." },
];

export default function PteValencia() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Programación e IA", path: "/zona-programacion/" },
          { title: "Adaptaciones PT", path: "/adaptaciones-pt/" },
          { title: "2.º ESO", path: "/adaptaciones-pt/2eso/" },
          { title: "Valencià", path: "/adaptaciones-pt/2eso/valenciano/" },
        ]}
      />
      <span className={chip}>2n d’ESO · Valencià · Temari del curs</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Valencià: temes
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Cada tema es repartix en <b>blocs</b> amb teoria, exemples resolts i activitats
        en <b>cinc nivells</b>. Primer va l’<b>exercici base de 2n d’ESO</b>, el del
        curs; avall, quatre adaptacions descendents —<b>1r d’ESO, 6è, 5è i 4t de
        primària</b>— per a l’alumnat el nivell de competència curricular del qual està
        per davall del curs. Mateix objectiu en els cinc: el que baixa és l’exigència
        d’accés, no la meta. Tot el contingut d’esta matèria està redactat <b>en
        valencià</b>, com l’àrea.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {TEMAS.map((t) =>
          t.listo ? (
            <Link key={t.n} href={t.href} className="group rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:border-blue-300 dark:hover:border-blue-500/40 hover:bg-blue-50/40 dark:hover:bg-blue-500/10">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400">{t.n}</div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-800">{t.t}</h2>
              <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400">{t.d}</p>
              <div className="mt-2 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Disponible →</div>
            </Link>
          ) : (
            <div key={t.n} className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 opacity-60">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400">{t.n}</div>
              <h2 className="text-base font-bold text-zinc-500 dark:text-zinc-400">{t.t}</h2>
              <p className="mt-1 text-[13px] text-zinc-500 dark:text-zinc-400">{t.d}</p>
            </div>
          )
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 p-5 text-sm text-zinc-700 dark:text-zinc-300">
        <b>Marc normatiu:</b> sabers bàsics de l’annex III del Decret 107/2022 (C. Valenciana)
        per a Valencià —comunicació, reflexió sobre la llengua i educació literària—; en els
        nivells de Primària, descentralització al Decret 106/2022. Adaptacions d’accés conformes al
        Decret 104/2018 i l’Orden 20/2019.
      </div>
    </div>
  );
}
