import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { chip } from "../ui";
import { APS, ACTS, TEMA } from "../datos";

export const metadata: Metadata = {
  title: "Tema 1 · Comunicació, llengua i ortografia — Valencià 2n ESO — Adaptaciones PT",
  description:
    "Tema 1 de Valencià amb adaptacions PT: huit blocs —l'últim, narrativa oral (rondalles i llegendes) del llibre U1—, cadascun amb teoria, exemples resolts i les seues activitats en cinc nivells (exercici base de 2n d'ESO i adaptacions a 1r d'ESO, 6è, 5è i 4t de primària).",
};

const DESC: Record<string, string> = {
  "00-repas": "Síl·laba tònica, gènere i nombre, articles i contraccions, lectura, ordre alfabètic i famílies de paraules: el que cal tindre a punt per a arrancar.",
  "01-comunicacio": "Emissor, receptor, missatge, canal, codi i context. Les funcions del llenguatge. Verbal i no verbal.",
  "02-diversitat": "Quantes llengües hi ha al món, famílies lingüístiques d'Europa, l'origen romànic del valencià i les llengües en perill.",
  "03-classes-paraules": "Les huit classes de paraules: variables (nom, adjectiu, determinant, pronom, verb) i invariables (adverbi, preposició, conjunció).",
  "04-sintagmes": "SN, SV, SAdj., SAdv. i SPrep.: la classe depén del nucli; proves de substitució i ampliació.",
  "05-puntuacio": "Coma, punt, punt i coma, dos punts, punts suspensius, signes d'entönació i el guió llarg de diàleg.",
  "06-ortografia-vocals": "E i o obertes o tancades, divergències amb el castellà, la [a] que no s'escriu i dictats de comprovació.",
  "07-vocals-contacte": "Diftongs, hiatos i triptongs: vocals fortes i febles, dígrafs i regles per a partir mots a final de línia.",
  "08-narrativa-oral": "Rondalles i llegendes (llibre, U1, p. 28-30): qüestions de «La flor del lliri blau» i de la llegenda de Rotlan amb espais amplis per a escriure, exemple resolt de l'activitat 3 i models de fórmules d'inici i d'acabament.",
};

export default function PteValenciaTema1() {
  const base = "/adaptaciones-pt/2eso/valenciano/tema-1";
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Adaptaciones PT", path: "/adaptaciones-pt/" },
          { title: "2.º ESO", path: "/adaptaciones-pt/2eso/" },
          { title: "Valencià", path: "/adaptaciones-pt/2eso/valenciano/" },
          { title: "Tema 1", path: `${base}/` },
        ]}
      />
      <span className={chip}>Tema 1 · {APS.length} blocs · {APS.reduce((s, a) => s + (ACTS[a.slug]?.length ?? 0), 0)} activitats × 5 nivells</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{TEMA}</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Cada bloc porta la seua <b>teoria</b> (explicació curta i accessible), <b>exemples</b>{" "}
        resolts i <b>sis activitats</b>, cadascuna amb l’exercici base de 2n d’ESO i les seues
        quatre adaptacions. El bloc 0 és de
        repàs: convé començar per ahí i seguir l’ordre, encara que els enllaços permeten saltar a
        qualsevol bloc.
      </p>

      <div className="mt-6 space-y-3">
        {APS.map((a) => (
          <Link
            key={a.slug}
            href={`${base}/${a.slug}/`}
            className="group flex gap-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:border-blue-300 dark:hover:border-blue-500/40 hover:bg-blue-50/40 dark:hover:bg-blue-500/10"
          >
            <div className="w-12 flex-none text-2xl font-extrabold tracking-tight text-blue-700 dark:text-blue-300">{a.n}</div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-800">{a.t}</h2>
              <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400">{DESC[a.slug]}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400">
                {(ACTS[a.slug] || []).length} activitats × 5 nivells
              </p>
            </div>
            <div className="self-center text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600">→</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link href={`${base}/completo/`} className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5">
          📄 Vore tema complet imprimible
        </Link>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 p-5 text-sm text-zinc-700 dark:text-zinc-300">
        <b>Sabers bàsics (annex III, Decret 107/2022):</b> els elements de la comunicació i la
        intenció comunicativa; les classes de paraules i els seus procediments de formació; la
        ortografia de la tilde; i la lectura i el reconeixement dels gèneres literaris.
      </div>
    </div>
  );
}
