import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "2.º de ESO · Adaptaciones PTE — Aula en la Nube",
  description:
    "Adaptaciones de ejercicios para 2.º de ESO con dificultades: matemáticas, valenciano y castellano. Cada ejercicio, en cuatro niveles descendentes (2º ESO → 1º ESO → 6º → 5º de primaria).",
};

const chip =
  "inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700";

const MATERIAS = [
  {
    t: "Matemáticas",
    href: "/adaptaciones-pte/2eso/matematicas/",
    d: "Números enteros: 3 ejercicios típicos de 2.º de ESO adaptados a 1.º ESO, 6.º y 5.º de primaria, con solución en cada nivel.",
    listo: true,
    emoji: "🔢",
  },
  {
    t: "Valenciano",
    href: "",
    d: "Adaptaciones de lengua valenciana (comunicación, comprensión lectora, morfología básica). En preparación.",
    listo: false,
    emoji: "🟨",
  },
  {
    t: "Castellano",
    href: "",
    d: "Adaptaciones de lengua castellana y literatura. En preparación.",
    listo: false,
    emoji: "📖",
  },
];

export default function AdaptacionesPte2Eso() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Programación e IA", path: "/zona-programacion/" },
          { title: "Adaptaciones PTE", path: "/adaptaciones-pte/" },
          { title: "2.º ESO", path: "/adaptaciones-pte/2eso/" },
        ]}
      />
      <span className={chip}>2.º de ESO · Atención a la diversidad · C. Valenciana</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Adaptaciones de 2.º de ESO
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        Materiales de apoyo para alumnado de <b>2.º de ESO con dificultades</b>, listos para usar
        en clase y en casa. Cada ejercicio parte de una situación real y se declina en cuatro
        niveles: <b>2.º ESO (referencia), 1.º ESO, 6.º y 5.º de primaria</b> — el mismo objetivo
        de aprendizaje, accesible a cada alumno.
      </p>

      <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-100 p-5 text-sm text-zinc-700">
        <b>Normativa de referencia:</b> Decreto 107/2022 (currículo de ESO, CV, con la modificación
        del Decreto 66/2024) y Real Decreto 217/2022 para las enseñanzas mínimas; los saberes
        básicos citados en cada ejercicio son los del anexo III del Decreto 107/2022 para el
        bloque de números de 2.º y 3.er ciclo de la ESO, con descentración al Decreto 106/2022
        (Primaria) en los niveles adaptados. Medidas de acceso y no significativas de
        conformidad con el Decreto 104/2018 y la Orden 20/2019.
      </div>

      <div className="mt-6 space-y-4">
        {MATERIAS.map((m) =>
          m.listo ? (
            <Link key={m.t} href={m.href} className="group flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50/40">
              <div className="w-10 flex-none text-3xl">{m.emoji}</div>
              <div>
                <h2 className="text-lg font-bold text-zinc-900 group-hover:text-blue-800">{m.t}</h2>
                <p className="mt-1 text-sm text-zinc-600">{m.d}</p>
              </div>
              <div className="self-center text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600">→</div>
            </Link>
          ) : (
            <div key={m.t} className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 opacity-60">
              <div className="w-10 flex-none text-3xl">{m.emoji}</div>
              <div>
                <h2 className="text-lg font-bold text-zinc-500">{m.t}</h2>
                <p className="mt-1 text-sm text-zinc-500">{m.d}</p>
              </div>
              <div className="self-center text-xs font-bold uppercase tracking-wide text-zinc-400">En preparación</div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
