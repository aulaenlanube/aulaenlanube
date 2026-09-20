import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { chip } from "../ui";

export const metadata: Metadata = {
  title: "Tema 1 · Números enteros — Matemáticas 2.º ESO — Adaptaciones PT",
  description:
    "Tema 1 de matemáticas de 2.º de ESO con adaptaciones PT: siete apartados, cada uno con teoría, ejemplos y actividades en cuatro niveles.",
};

const AP = [
  { n: 1, t: "Introducción a los números enteros", href: "01-introduccion/", d: "Qué son los negativos, para qué sirven y dónde aparecen en la vida diaria." },
  { n: 2, t: "La recta numérica", href: "02-recta/", d: "Situar enteros. Actividad: ejercicio «Temperaturas en la semana»." },
  { n: 3, t: "Comparación de números", href: "03-comparacion/", d: "Mayor, menor y opuestos con ‹ y ›. Comparar temperaturas y saldos." },
  { n: 4, t: "Suma y resta de enteros", href: "04-suma-resta/", d: "Reglas de signos en la práctica. Actividad: «La cuenta del banco de Maria»." },
  { n: 5, t: "Operaciones combinadas", href: "05-combinadas/", d: "Varias operaciones seguidas y paréntesis. Actividad: «El ascensor del parking»." },
  { n: 6, t: "Problemas de la vida real", href: "06-problemas/", d: "Temperaturas, bancos, ascensores, altitudes… todo junto." },
  { n: 7, t: "Multiplicación y división", href: "07-multiplicacion/", d: "Regla de signos del producto y del cociente." },
];

export default function PteTema1() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Adaptaciones PT", path: "/adaptaciones-pt/" },
          { title: "2.º ESO", path: "/adaptaciones-pt/2eso/" },
          { title: "Matemáticas", path: "/adaptaciones-pt/2eso/matematicas/" },
          { title: "Tema 1", path: "/adaptaciones-pt/2eso/matematicas/tema-1/" },
        ]}
      />
      <span className={chip}>Tema 1 · Números enteros · 7 apartados</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Tema 1 · Números enteros
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        Cada apartado lleva su <b>teoría</b> (explicación corta y accesible), <b>ejemplos</b>{" "}
        resueltos y <b>actividades</b> adaptadas en los cuatro niveles. El orden es el de la
        secuencia del tema: conviene seguirlo, pero los enlaces laterales permiten saltar a
        cualquier apartado.
      </p>

      <div className="mt-6 space-y-3">
        {AP.map((a) => (
          <Link
            key={a.n}
            href={`/adaptaciones-pt/2eso/matematicas/tema-1/${a.href}`}
            className="group flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50/40"
          >
            <div className="w-12 flex-none text-2xl font-extrabold tracking-tight text-blue-700">{a.n}</div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 group-hover:text-blue-800">{a.t}</h2>
              <p className="mt-1 text-[13px] text-zinc-600">{a.d}</p>
            </div>
            <div className="self-center text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600">→</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-100 p-5 text-sm text-zinc-700">
        <b>Saberes básicos (anexo III, Decreto 107/2022):</b> números enteros, representación y
        orden en la recta, valor absoluto y opuesto, operaciones y jerarquía, y uso en contextos
        familiares (temperaturas, altitudes, economía doméstica).
      </div>
    </div>
  );
}
