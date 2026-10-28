import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BASE, CURSOS } from "./_datos";
import { Tarjeta, chip } from "./_ui";

export const metadata: Metadata = {
  title: "Materiales de ESO y Bachillerato — Aula en la Nube",
  description:
    "Esquemas de estudio, resúmenes y materiales de apoyo por curso y asignatura para ESO y Bachillerato. Primer material: Música de 1.º de ESO, tema 1 (el sonido y sus cualidades).",
};

export default function Materiales() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs items={[{ title: "Materiales ESO y Bachillerato", path: BASE }]} />
      <span className={chip}>Secundaria · Por curso y asignatura</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Materiales de ESO y Bachillerato</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Esquemas para estudiar, resúmenes de cada tema y otros materiales de apoyo, ordenados por
        <b> curso</b> y <b>asignatura</b>. Cada material sigue el libro de texto y el idioma en que se
        da la asignatura, y se centra en lo que entra en el examen.
      </p>

      {(["ESO", "Bachillerato"] as const).map((etapa) => (
        <section key={etapa}>
          <h2 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">{etapa}</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {CURSOS.filter((c) => c.etapa === etapa).map((c) => {
              const listas = c.asignaturas.filter((a) => a.temas.length > 0);
              return (
                <Tarjeta key={c.id} href={listas.length ? `${BASE}${c.id}/` : undefined} marca={c.n} titulo={c.t}>
                  {listas.length ? listas.map((a) => `${a.emoji} ${a.t}`).join(" · ") : `Materiales de ${c.t}. En preparación.`}
                </Tarjeta>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
