import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BASE, curso } from "../_datos";
import { Tarjeta, chip } from "../_ui";

const C = curso("1eso");

export const metadata: Metadata = {
  title: `${C.t} · Materiales — Aula en la Nube`,
  description: `Materiales de estudio de ${C.t} por asignatura: esquemas de cada tema con las definiciones clave y preguntas de repaso.`,
};

export default function Curso1Eso() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Materiales ESO y Bachillerato", path: BASE },
          { title: C.t, path: `${BASE}${C.id}/` },
        ]}
      />
      <span className={chip}>{C.etapa} · Materiales por asignatura</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Materiales de {C.t}</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Elige la asignatura. Dentro encontrarás los temas publicados, cada uno con su esquema de estudio.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {C.asignaturas.map((a) => (
          <Tarjeta
            key={a.id}
            href={a.temas.length ? `${BASE}${C.id}/${a.id}/` : undefined}
            marca={a.emoji}
            titulo={a.t}
            extra={`${a.temas.length} ${a.temas.length === 1 ? "tema" : "temas"}`}
          >
            {a.d}
          </Tarjeta>
        ))}
      </div>
    </div>
  );
}
