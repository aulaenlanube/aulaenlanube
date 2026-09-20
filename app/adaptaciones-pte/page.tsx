import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Adaptaciones PTE — Aula en la Nube",
  description:
    "Adaptaciones de ejercicios para niveles de ESO con dificultades, alineadas con la normativa de la Comunitat Valenciana (LOMLOE). Segundo de ESO: matemáticas, valenciano y castellano.",
};

const chip =
  "inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700";

const NIVELES = [
  { n: "1º", t: "1.º de ESO", href: "", pronto: false, d: "Adaptaciones de 1.º de ESO. En preparación." },
  { n: "2º", t: "2.º de ESO", href: "/adaptaciones-pte/2eso/", pronto: true, d: "Matemáticas, valenciano y castellano — adaptaciones de un mismo ejercicio en 4 niveles (2.º ESO, 1.º ESO, 6.º y 5.º de primaria)." },
  { n: "3º", t: "3.º de ESO", href: "", pronto: false, d: "Adaptaciones de 3.º de ESO. En preparación." },
  { n: "4º", t: "4.º de ESO", href: "", pronto: false, d: "Adaptaciones de 4.º de ESO. En preparación." },
];

export default function AdaptacionesPte() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Programación e IA", path: "/zona-programacion/" },
          { title: "Adaptaciones PTE", path: "/adaptaciones-pte/" },
        ]}
      />
      <span className={chip}>Atención a la diversidad · Comunitat Valenciana</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Adaptaciones PTE
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        Banco de <b>adaptaciones de ejercicios para alumnado de ESO con dificultades</b>. Cada
        ejercicio se presenta en <b>cuatro niveles</b>: el de referencia del curso y tres
        adaptaciones descendentes (hasta 5.º de primaria) para que el mismo contenido sea
        accesible, con los mismos contextos y la misma dinámica de aula.
      </p>

      <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-100 p-5 text-sm text-zinc-700">
        <b>Marco normativo (Comunitat Valenciana):</b> Decreto 107/2022, de 5 de agosto, del
        Consell (ordenación y currículo de la ESO, modificado por el Decreto 66/2024) · Real
        Decreto 217/2022 (enseñanzas mínimas) · Decreto 106/2022, de 5 de agosto (currículo de
        Educación Primaria) · Decreto 104/2018, de 27 de julio (principios de equidad e inclusión
        del sistema educativo valenciano) y Orden 20/2019 (respuesta educativa para la inclusión).
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {NIVELES.map((x) =>
          x.pronto ? (
            <Link key={x.n} href={x.href} className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50/40">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold tracking-tight text-blue-700">{x.n}</span>
                <h2 className="text-lg font-bold text-zinc-900 group-hover:text-blue-800">{x.t}</h2>
              </div>
              <p className="mt-2 text-sm text-zinc-600">{x.d}</p>
              <div className="mt-2 text-xs font-bold uppercase tracking-wide text-emerald-700">Disponible →</div>
            </Link>
          ) : (
            <div key={x.n} className="rounded-2xl border border-zinc-200 bg-white p-5 opacity-60">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold tracking-tight text-zinc-400">{x.n}</span>
                <h2 className="text-lg font-bold text-zinc-500">{x.t}</h2>
              </div>
              <p className="mt-2 text-sm text-zinc-500">{x.d}</p>
              <div className="mt-2 text-xs font-bold uppercase tracking-wide text-zinc-400">En preparación</div>
            </div>
          )
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-[15px] text-blue-900">
        <b>Cómo está pensado cada ejercicio:</b> una situación real y cercana (temperaturas,
        cuenta del banco, ascensor con sótanos…) y, sobre ella, cuatro versiones numeradas y
        escalonadas: <b>2.º ESO (referencia)</b> → <b>1.º ESO</b> → <b>6.º primaria</b> →{" "}
        <b>5.º primaria</b>. Cada nivel indica qué se adapta (números, apoyo visual, extensión de
        la respuesta) y lleva su solución, para que la adaptación sea de acceso al mismo objetivo
        de aprendizaje, no otro ejercicio distinto.
      </div>
    </div>
  );
}
