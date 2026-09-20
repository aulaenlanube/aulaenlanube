import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";
import { chip, n2, n1, n6, n5, tarjeta, Figura, Teoria, SeccionTitulo, Nivel } from "../../ui";

export const metadata: Metadata = {
  title: "7 · Multiplicación y división de enteros — Tema 1 Matemáticas 2.º ESO — Adaptaciones PTE",
  description:
    "Regla de signos del producto y del cociente: teoría, ejemplos y actividad en cuatro niveles.",
};

function Signos() {
  return (
    <Figura caption="La tabla de signos: mismo signo → positivo; distinto signo → negativo.">
      <svg viewBox="0 0 200 96" className="h-28 w-auto max-w-full" role="img" aria-label="Tabla de signos por pares de flechas">
        <g fontFamily="system-ui" fontSize="11" fontWeight="bold">
          <text x="16" y="22" fill="#166534">+</text><text x="34" y="22" fill="#166534">·</text><text x="48" y="22" fill="#166534">+</text><text x="70" y="22" fill="#166534">= +</text>
          <path d="M92 14 l8 8 l-8 8" fill="none" stroke="#16a34a" strokeWidth="2" />
          <path d="M108 14 l8 8 l-8 8" fill="none" stroke="#16a34a" strokeWidth="2" />
          <text x="16" y="48" fill="#b91c1c">+</text><text x="34" y="48" fill="#b91c1c">·</text><text x="48" y="48" fill="#b91c1c">−</text><text x="70" y="48" fill="#b91c1c">= −</text>
          <path d="M92 40 l8 8 l-8 8" fill="none" stroke="#16a34a" strokeWidth="2" />
          <path d="M108 56 l8 -8 l-8 -8" fill="none" stroke="#dc2626" strokeWidth="2" />
          <text x="16" y="74" fill="#b91c1c">−</text><text x="34" y="74" fill="#b91c1c">·</text><text x="48" y="74" fill="#b91c1c">−</text><text x="70" y="74" fill="#166534">= +</text>
          <path d="M92 72 l8 -8 l-8 -8" fill="none" stroke="#dc2626" strokeWidth="2" />
          <path d="M108 72 l8 -8 l-8 -8" fill="none" stroke="#dc2626" strokeWidth="2" />
          <text x="140" y="22" fill="#166534">mismo → +</text>
          <text x="140" y="48" fill="#b91c1c">distinto → −</text>
          <text x="140" y="74" fill="#166534">mismo → +</text>
        </g>
      </svg>
    </Figura>
  );
}

export default function T1A07() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Adaptaciones PTE", path: "/adaptaciones-pte/" },
          { title: "2.º ESO", path: "/adaptaciones-pte/2eso/" },
          { title: "Matemáticas", path: "/adaptaciones-pte/2eso/matematicas/" },
          { title: "Tema 1", path: "/adaptaciones-pte/2eso/matematicas/tema-1/" },
          { title: "Ap. 7", path: "/adaptaciones-pte/2eso/matematicas/tema-1/07-multiplicacion/" },
        ]}
      />
      <span className={chip}>Tema 1 · Apartado 7 — Multiplicación y división de enteros</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        7 · Multiplicación y división de enteros
      </h1>

      <Teoria>
        <p>
          Multiplicar enteros = multiplicar los números sin signos y luego <b>poner el signo con
          la regla</b>: mismo signo (+·+ o −·−) → positivo · distinto signo → negativo. Dividir es
          idéntico. Con varios factores: cuenta los negativos — <b>par de negativos, resultado
          positivo; impar, negativo</b>.
        </p>
        <p>
          Por qué funciona (para defenderlo, no para memorizarlo): (−3) · 4 = −3 −3 −3 = −12
          (sumar el negativo 4 veces). Y (−3) · (−4) = 12: restar un negativo es sumar — «4 veces
          deshacer algo que debías −3 → +12».
        </p>
        <p>
          Ojo con el exponente: (−2)² = (−2)·(−2) = <b>+4</b>, pero −2² = −(2·2) = <b>−4</b> — sin
          paréntesis, el signo de fuera se aplica después.
        </p>
      </Teoria>

      <Signos />

      <SeccionTitulo emoji="✏️" titulo="Ejemplos resueltos" />
      <div className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <p>• (−6) · 5 = <b>−30</b> · (−6) · (−5) = <b>+30</b> · (−30) : 5 = <b>−6</b>.</p>
        <p>• (−1)·(−2)·(−3) = −6 (impar de negativos) · (−2)² = 4 · −2² = −4.</p>
      </div>

      <SeccionTitulo emoji="🎯" titulo="Actividad: temperatura media y bloques de hielo" />
      <section className={tarjeta}>
        <Nivel
          cls={n2}
          label="2.º ESO · nivel de referencia"
          partes={[
            <>a) Calcula: (−7) · 4 · (−2) · 60 : (−15).</>,
            <>b) Durante 5 días seguidos la temperatura bajó 3 °C cada noche. Escribe la operación y el resultado total.</>,
            <>c) (−2)³ − (−3)² — calcula con cuidado: primero potencias, luego resta.</>,
            <>d) Explica en una frase por qué en b) el resultado es negativo aunque no haya «resta».</>,
          ]}
          solucion={[
            <>a) (−7·4) = −28 · (−28·−2) = <b>+56</b> · 60 : (−15) = <b>−4</b>.</>,
            <>b) 5 · (−3) = <b>−15 °C</b> en total.</>,
            <>c) (−2)³ = −8 · (−3)² = 9 → −8 − 9 = <b>−17</b>.</>,
            <>d) Porque sumamos 5 veces una cantidad negativa (un cambio hacia abajo): el signo viene del 3 con menos, no de una resta.</>,
          ]}
        />
        <Nivel
          cls={n1}
          label="1.º ESO · adaptación"
          partes={[
            <>a) Calcula: (−7) · 4 · (−2).</>,
            <>b) Durante 5 noches la temperatura bajó 3 °C cada noche. ¿Cuánto bajó en total? (suma sumas si lo prefieres)</>,
            <>c) Di la regla de signos con tus palabras.</>,
          ]}
          solucion={[
            <>a) −28 · (−2) = <b>+56</b>.</>,
            <>b) 5 · (−3) = −15 °C (o (−3)+(−3)+(−3)+(−3)+(−3) = −15).</>,
            <>c) Libre, válida si coincide con la tabla.</>,
          ]}
          adaptacion={<>Sin divisiones ni potencias (se posponen a 2.º); en b) se permite resolver como suma repetida. La regla se pide oralmente, no calculada.</>}
        />
        <Nivel
          cls={n6}
          label="6.º primaria · adaptación"
          partes={[
            <>a) Con la tabla de signos del dibujo: ¿el resultado de (−4) · 3 es positivo o negativo? Rodea y luego calcula el número.</>,
            <>b) La temperatura bajó 3 °C cada noche durante 4 noches. Completa la tabla: 4 noches de −3 → ___ °C.</>,
            <>c) (−2) : (−1) = ___ (ayuda: ¿«deuda entre −1» cuántas veces cabe?)</>,
          ]}
          solucion={[
            <>a) Negativo · −12.</>,
            <>b) −12 °C.</>,
            <>c) +2.</>,
          ]}
          adaptacion={<>La regla se aplica con la tabla a la vista (canal visual) y números pequeños; la división se plantea solo en el caso − : − con apoyo de pregunta verbal.</>}
        />
        <Nivel
          cls={n5}
          label="5.º primaria · adaptación"
          partes={[
            <>a) Colorea la fila de la tabla que corresponde a (−4) · 3: verde = positivo, rojo = negativo.</>,
            <>b) Con dados de colores: sacas 3 dados rojos con un 4 = «tres veces −4». Pon 3 fichas de 4 en la casilla de «abajo». Total: ___ (rojo).</>,
            <>c) Copia: «(−4) · 3 = −12 · mismo signo +, distinto signo −».</>,
          ]}
          solucion={[<>a) Rojo (distinto signo → negativo).</>,
            <>b) 12 fichas en «abajo» → <b>−12</b>.</>,
            <>c) Copia correcta.</>]}
          adaptacion={<>La regla entra por el color (rojo = negativo) y por fichas repetidas (multiplicar = sumar varias veces); la fórmula se copia como lectura final.</>}
        />
      </section>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/adaptaciones-pte/2eso/matematicas/tema-1/06-problemas/" className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← Apartado 6
        </Link>
        <div className="flex gap-3">
          <PrintButton />
          <Link href="/adaptaciones-pte/2eso/matematicas/tema-1/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
            Volver al Tema 1 →
          </Link>
        </div>
      </div>
    </div>
  );
}
