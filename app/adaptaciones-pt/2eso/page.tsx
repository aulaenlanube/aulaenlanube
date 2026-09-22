import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "2.º de ESO · Adaptaciones PT — Aula en la Nube",
  description:
    "Adaptaciones de ejercicios para 2.º de ESO con dificultades: matemáticas y castellano. Cada ejercicio parte del nivel de 2.º de ESO y baja en adaptaciones: hasta 5.º de primaria en matemáticas y hasta 4.º de primaria en castellano.",
};

const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";

const MATERIAS = [
  {
    t: "Matemáticas",
    href: "/adaptaciones-pt/2eso/matematicas/",
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
    href: "/adaptaciones-pt/2eso/castellano/",
    d: "Tema 1 de Lengua Castellana: 6 bloques (repaso, comunicación, sustantivo y adjetivo, derivación, géneros literarios y acentuación) con 6 actividades cada uno, en 5 niveles: el ejercicio base de 2.º de ESO y sus adaptaciones a 1.º de ESO, 6.º, 5.º y 4.º de primaria.",
    listo: true,
    emoji: "📖",
  },
];

export default function AdaptacionesPte2Eso() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Programación e IA", path: "/zona-programacion/" },
          { title: "Adaptaciones PT", path: "/adaptaciones-pt/" },
          { title: "2.º ESO", path: "/adaptaciones-pt/2eso/" },
        ]}
      />
      <span className={chip}>2.º de ESO · Atención a la diversidad · C. Valenciana</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Adaptaciones de 2.º de ESO
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Materiales de apoyo para alumnado de <b>2.º de ESO con dificultades</b>, listos para usar
        en clase y en casa. Cada ejercicio parte de una situación real y se declina en{" "}
        varios <b>niveles descendentes</b>: siempre arriba el ejercicio de 2.º de ESO y, debajo,
        las adaptaciones —hasta 5.º de primaria en matemáticas y hasta 4.º de primaria en
        castellano—. El mismo objetivo de aprendizaje, accesible a cada alumno.
      </p>

      <div className="mt-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 p-5 text-sm text-zinc-700 dark:text-zinc-300">
        <b>Normativa de referencia:</b> Decreto 107/2022 (currículo de ESO, CV, con la modificación
        del Decreto 66/2024) y Real Decreto 217/2022 para las enseñanzas mínimas; los saberes
        básicos citados en cada ejercicio son los del anexo III del Decreto 107/2022 (bloque de
        números en matemáticas; comunicación, reflexión sobre la lengua y educación literaria en
        castellano), con descentración al Decreto 106/2022 (Primaria) en los niveles adaptados
        más bajos. Medidas de acceso y no significativas de
        conformidad con el Decreto 104/2018 y la Orden 20/2019.
      </div>

      <div className="mt-6 space-y-4">
        {MATERIAS.map((m) =>
          m.listo ? (
            <Link key={m.t} href={m.href} className="group flex gap-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:border-blue-300 dark:hover:border-blue-500/40 hover:bg-blue-50/40 dark:hover:bg-blue-500/10">
              <div className="w-10 flex-none text-3xl">{m.emoji}</div>
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-800">{m.t}</h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{m.d}</p>
              </div>
              <div className="self-center text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600">→</div>
            </Link>
          ) : (
            <div key={m.t} className="flex gap-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 opacity-60">
              <div className="w-10 flex-none text-3xl">{m.emoji}</div>
              <div>
                <h2 className="text-lg font-bold text-zinc-500 dark:text-zinc-400">{m.t}</h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{m.d}</p>
              </div>
              <div className="self-center text-xs font-bold uppercase tracking-wide text-zinc-400 dark:text-zinc-400">En preparación</div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
