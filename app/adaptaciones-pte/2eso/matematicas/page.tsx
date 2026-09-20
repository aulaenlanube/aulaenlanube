import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { chip } from "./ui";

export const metadata: Metadata = {
  title: "Matemáticas · 2.º ESO — Adaptaciones PTE — Aula en la Nube",
  description:
    "Adaptaciones de matemáticas para 2.º de ESO: cada ejercicio, en su página, con cuatro niveles descendentes y su SVG de apoyo.",
};

const EX = [
  {
    n: "Ejercicio 1",
    t: "Temperaturas en la semana",
    d: "Leer, situar y ordenar enteros en la recta con temperaturas bajo cero. De Morella (−6 °C) a la recta recortable de 5.º.",
    href: "/adaptaciones-pte/2eso/matematicas/01-temperaturas/",
    svg: (
      <svg viewBox="0 0 40 64" className="h-14 w-auto" aria-hidden>
        <rect x="16" y="4" width="8" height="40" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <circle cx="20" cy="50" r="9" fill="#f87171" stroke="#dc2626" strokeWidth="1.5" />
        <rect x="18" y="22" width="4" height="24" rx="2" fill="#ef4444" />
        <path d="M27 12h6M27 22h6M27 32h6" stroke="#0369a1" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    n: "Ejercicio 2",
    t: "La cuenta del banco de Maria",
    d: "Ingresos (+) y gastos (−) hasta descubrir el descubierto: el saldo negativo como «lo que falta». Cuatro niveles, del descubierto a las monedas.",
    href: "/adaptaciones-pte/2eso/matematicas/02-cuenta-banco/",
    svg: (
      <svg viewBox="0 0 64 44" className="h-12 w-auto" aria-hidden>
        <rect x="4" y="8" width="56" height="30" rx="4" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
        <circle cx="32" cy="23" r="8" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <path d="M32 18v10M29 20.5h6M29 25.5h6" stroke="#b45309" strokeWidth="1.5" />
        <path d="M8 8v-4h48v4" fill="none" stroke="#b45309" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    n: "Ejercicio 3",
    t: "El ascensor del parking",
    d: "Operaciones encadenadas con enteros: sótanos negativos, paréntesis y el recorrido −2 → +4. Con maqueta de imán para 5.º de primaria.",
    href: "/adaptaciones-pte/2eso/matematicas/03-ascensor/",
    svg: (
      <svg viewBox="0 0 44 64" className="h-14 w-auto" aria-hidden>
        <rect x="8" y="4" width="28" height="56" rx="3" fill="#ede9fe" stroke="#6d28d9" strokeWidth="1.5" />
        <path d="M8 18h28M8 32h28M8 46h28" stroke="#6d28d9" strokeWidth="1" />
        <rect x="14" y="34" width="16" height="10" rx="2" fill="#c4b5fd" stroke="#6d28d9" strokeWidth="1.5" />
        <path d="M22 37v4M20 39l2-2 2 2" stroke="#4c1d95" strokeWidth="1.5" fill="none" />
        <text x="40" y="42" fontSize="7" fill="#6d28d9" textAnchor="middle">−2</text>
      </svg>
    ),
  },
];

export default function PteMatematicas() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Programación e IA", path: "/zona-programacion/" },
          { title: "Adaptaciones PTE", path: "/adaptaciones-pte/" },
          { title: "2.º ESO", path: "/adaptaciones-pte/2eso/" },
          { title: "Matemáticas", path: "/adaptaciones-pte/2eso/matematicas/" },
        ]}
      />
      <span className={chip}>2.º de ESO · Matemáticas · Números enteros</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Matemáticas: ejercicios adaptados
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        Cada ejercicio tiene su página: dentro, el enunciado completo en los <b>cuatro niveles</b>{" "}
        (2.º ESO, 1.º ESO, 6.º y 5.º de primaria) con sus soluciones, y un dibujo sencillo de
        apoyo. Todos trabajan números enteros en contextos reales (anexo III, Decreto 107/2022).
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {EX.map((e) => (
          <Link
            key={e.n}
            href={e.href}
            className="group flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50/40"
          >
            <div className="flex w-14 flex-none items-center justify-center">{e.svg}</div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{e.n}</div>
              <h2 className="text-base font-bold text-zinc-900 group-hover:text-blue-800">{e.t}</h2>
              <p className="mt-1 text-[13px] text-zinc-600">{e.d}</p>
            </div>
            <div className="self-center text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600">→</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-100 p-5 text-sm text-zinc-700">
        <b>Próximos bloques:</b> potencias y raíces, fracciones equivalentes y proporcionalidad.
        Se irán añadiendo como nuevas tarjetas de ejercicio.
      </div>
    </div>
  );
}
