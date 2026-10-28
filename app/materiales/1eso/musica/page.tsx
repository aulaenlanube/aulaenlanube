import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BASE, asignatura, curso } from "../../_datos";
import { Tarjeta, chip } from "../../_ui";

const C = curso("1eso");
const A = asignatura("1eso", "musica");

export const metadata: Metadata = {
  title: `${A.t} · ${C.t} · Materiales — Aula en la Nube`,
  description: `Esquemas de estudio de ${A.t} de ${C.t}, tema a tema: definiciones del libro, dibujos de notación musical y preguntas para repasar antes del examen.`,
};

export default function Musica1Eso() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Materiales ESO y Bachillerato", path: BASE },
          { title: C.t, path: `${BASE}${C.id}/` },
          { title: A.t, path: `${BASE}${C.id}/${A.id}/` },
        ]}
      />
      <span className={chip}>{C.t} · {A.t}</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {A.emoji} {A.t} de {C.t}
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">{A.d}</p>
      <div className="mt-6 grid grid-cols-1 gap-4">
        {A.temas.map((t) => (
          <Tarjeta key={t.n} href={t.href} marca={`T${t.n}`} titulo={t.t} extra={t.idioma}>
            {t.d}
          </Tarjeta>
        ))}
      </div>
    </div>
  );
}
