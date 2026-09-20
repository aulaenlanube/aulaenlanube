import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { chip } from "./ui";

export const metadata: Metadata = {
  title: "Matemáticas · 2.º ESO — Adaptaciones PT — Aula en la Nube",
  description:
    "Temario de matemáticas de 2.º de ESO con adaptaciones PT: cada tema con sus apartados de teoría, ejemplos y actividades en cuatro niveles.",
};

const TEMAS = [
  { n: "Tema 1", t: "Números enteros", href: "/adaptaciones-pt/2eso/matematicas/tema-1/", listo: true,
    d: "7 apartados: introducción, recta numérica, comparación, suma y resta, operaciones combinadas, problemas de la vida real, multiplicación y división. Con los ejercicios adaptados ya publicados." },
  { n: "Tema 2", t: "Divisibilidad y potencias", href: "", listo: false, d: "En preparación." },
  { n: "Tema 3", t: "Fracciones y decimales", href: "", listo: false, d: "En preparación." },
  { n: "Tema 4", t: "Proporcionalidad y porcentajes", href: "", listo: false, d: "En preparación." },
  { n: "Tema 5", t: "Álgebra: expresiones y ecuaciones", href: "", listo: false, d: "En preparación." },
  { n: "Tema 6", t: "Geometría plana y del espacio", href: "", listo: false, d: "En preparación." },
  { n: "Tema 7", t: "Funciones y gráficas", href: "", listo: false, d: "En preparación." },
  { n: "Tema 8", t: "Estadística y probabilidad", href: "", listo: false, d: "En preparación." },
];

export default function PteMatematicas() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Programación e IA", path: "/zona-programacion/" },
          { title: "Adaptaciones PT", path: "/adaptaciones-pt/" },
          { title: "2.º ESO", path: "/adaptaciones-pt/2eso/" },
          { title: "Matemáticas", path: "/adaptaciones-pt/2eso/matematicas/" },
        ]}
      />
      <span className={chip}>2.º de ESO · Matemáticas · Temario del curso</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Matemáticas: temas
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        El curso va avanzando por temas, y aquí cada tema tiene sus <b>apartados</b> con teoría,
        ejemplos y actividades adaptadas en los cuatro niveles (2.º ESO, 1.º ESO, 6.º y 5.º de
        primaria). La organización de temas sigue la programación estándar de 2.º de ESO del
        centro; ajústala si tu departmento la ordena de otra forma.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {TEMAS.map((t) =>
          t.listo ? (
            <Link key={t.n} href={t.href} className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50/40">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{t.n}</div>
              <h2 className="text-base font-bold text-zinc-900 group-hover:text-blue-800">{t.t}</h2>
              <p className="mt-1 text-[13px] text-zinc-600">{t.d}</p>
              <div className="mt-2 text-xs font-bold uppercase tracking-wide text-emerald-700">Disponible →</div>
            </Link>
          ) : (
            <div key={t.n} className="rounded-2xl border border-zinc-200 bg-white p-5 opacity-60">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{t.n}</div>
              <h2 className="text-base font-bold text-zinc-500">{t.t}</h2>
              <p className="mt-1 text-[13px] text-zinc-500">{t.d}</p>
            </div>
          )
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-100 p-5 text-sm text-zinc-700">
        <b>Marco normativo:</b> saberes básicos del anexo III del Decreto 107/2022 (C. Valenciana)
        para el bloque «Números y álgebra»; en los niveles de Primaria, descentración al Decreto
        106/2022. Adaptaciones de acceso conforme al Decreto 104/2018 y la Orden 20/2019.
      </div>
    </div>
  );
}
