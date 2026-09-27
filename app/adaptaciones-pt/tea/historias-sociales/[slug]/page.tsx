import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { chip, notaNormativa } from "../../ui";
import { HISTORIAS, BASE } from "../datos";
import { ATRIBUCION_ARASAAC } from "../pictos";
import Visor from "../visor";

type P = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return HISTORIAS.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const h = HISTORIAS.find((x) => x.slug === slug);
  if (!h) return {};
  return {
    title: `${h.titulo} · Historia social — Alumnado TEA — Adaptaciones PT`,
    description: `Historia social «${h.titulo}» con pictogramas ARASAAC para alumnado TEA de secundaria: ${h.resumen} Versión chico y chica, descarga en PDF.`,
  };
}

// Pautas de uso: las de siempre para historias sociales (formato de Carol
// Gray), concretadas para esta clase de historia de autorregulación.
const PAUTAS: { t: string; d: string }[] = [
  {
    t: "Léela en calma, nunca durante el enfado",
    d: "La historia se aprende antes para poder usarla después. En plena crisis no se lee: se recuerda, y basta con una frase corta de la historia («¿Necesitas un descanso?»).",
  },
  {
    t: "Al principio, todos los días",
    d: "Por ejemplo, al llegar al instituto o antes de la sesión que más le cuesta. Cuando ya la conozca, se espacia; se retoma si vuelven las dificultades.",
  },
  {
    t: "Ensayad la tarjeta antes de necesitarla",
    d: "Practicad en calma cómo se enseña y qué pasa después. Y cuando la use de verdad, respondedle siempre: si la tarjeta funciona, la seguirá usando.",
  },
  {
    t: "Reconoce cada vez que pida ayuda",
    d: "Pedir ayuda o un descanso en lugar de estallar es justo la conducta que la historia enseña: merece que se le diga en ese momento.",
  },
  {
    t: "Todos, con las mismas palabras",
    d: "Que el equipo docente, orientación y la familia conozcan la historia y usen sus mismas frases. Escribe su nombre en la portada: es su historia.",
  },
];

export default async function HistoriaSocial({ params }: P) {
  const { slug } = await params;
  const h = HISTORIAS.find((x) => x.slug === slug);
  if (!h) notFound();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Adaptaciones PT", path: "/adaptaciones-pt/" },
          { title: "Alumnado TEA", path: "/adaptaciones-pt/tea/" },
          { title: "Historias sociales", path: `${BASE}/` },
          { title: h.titulo, path: `${BASE}/${h.slug}/` },
        ]}
      />
      <span className={chip}>Historia social · {h.tema}</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{h.titulo}</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">{h.resumen}</p>
      <p className="mt-3 text-[15px] text-zinc-600 dark:text-zinc-400">
        Una idea por página, en primera persona y con pictogramas ARASAAC. Lo que la historia pide
        hacer va en <b className="text-emerald-700 dark:text-emerald-300">verde</b>; lo que no se
        puede hacer, en <b className="text-red-700 dark:text-red-300">rojo</b> y tachado. Al final,
        las <b>tarjetas de descanso y de ayuda</b> para recortar.
      </p>

      <Visor historia={h} />

      <section className="mt-12 rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/60 dark:bg-blue-500/10 p-5 shadow-sm sm:p-7">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">Cómo usar esta historia</h2>
        <ol className="mt-4 space-y-3">
          {PAUTAS.map((p, i) => (
            <li key={p.t} className="flex gap-3">
              <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-blue-600 text-sm font-bold text-white">{i + 1}</span>
              <div className="text-[15px] text-zinc-700 dark:text-zinc-300">
                <b className="text-zinc-900 dark:text-zinc-100">{p.t}.</b> {p.d}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className={notaNormativa}>
        <b>Pictogramas:</b> {ATRIBUCION_ARASAAC} Esta historia se comparte con la misma licencia
        (uso no comercial, citando la autoría).
      </div>
    </div>
  );
}
