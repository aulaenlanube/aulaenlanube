import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { chip, notaNormativa } from "../ui";
import { HISTORIAS, BASE } from "./datos";
import { maquetar } from "./maqueta";
import { HojaSvg } from "./hoja";
import { ATRIBUCION_ARASAAC } from "./pictos";

export const metadata: Metadata = {
  title: "Historias sociales · Alumnado TEA — Adaptaciones PT — Aula en la Nube",
  description:
    "Historias sociales con pictogramas ARASAAC para alumnado TEA de secundaria: una idea por página, versión chico y chica, lector en pantalla y descarga en PDF con tarjetas recortables.",
};

export default function HistoriasSociales() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Programación e IA", path: "/zona-programacion/" },
          { title: "Adaptaciones PT", path: "/adaptaciones-pt/" },
          { title: "Alumnado TEA", path: "/adaptaciones-pt/tea/" },
          { title: "Historias sociales", path: `${BASE}/` },
        ]}
      />
      <span className={chip}>Alumnado TEA · Historias sociales</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Historias sociales</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Una historia social cuenta, en primera persona y con frases cortas, <b>una situación
        concreta</b>: qué suele pasar, qué puedo sentir y qué puedo hacer. Se lee con el alumno
        en momentos de calma para que, cuando llegue la situación, ya sepa qué hacer. Aquí cada
        página lleva <b>una sola idea</b> con sus pictogramas, y el PDF se genera en versión{" "}
        <b>chico</b> o <b>chica</b>.
      </p>

      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {HISTORIAS.map((h) => (
          <li key={h.slug}>
            <Link
              href={`${BASE}/${h.slug}/`}
              className="group block overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm transition hover:border-blue-300 dark:hover:border-blue-500/40"
            >
              <div className="aeln-lamina border-b border-zinc-200 dark:border-white/10 bg-white">
                <HojaSvg hoja={maquetar(h, "o", false)[0]} className="block h-auto w-full" />
              </div>
              <div className="p-5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400">
                  {h.tema} · {h.escenas.length + 1} páginas
                </div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-800 dark:group-hover:text-blue-300">
                  {h.titulo}
                </h2>
                <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400">{h.resumen}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className={notaNormativa}>
        <b>Pictogramas:</b> {ATRIBUCION_ARASAAC} Las historias se comparten con la misma licencia
        (uso no comercial, citando la autoría).
      </div>
    </div>
  );
}
