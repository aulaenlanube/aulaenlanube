import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";
import { chip, n2, n1, n6, n5, tarjeta, Figura, Teoria, SeccionTitulo, Nivel } from "../../ui";

export const metadata: Metadata = {
  title: "4 · Suma y resta de enteros — Tema 1 Matemáticas 2.º ESO — Adaptaciones PTE",
  description:
    "Sumar y restar con signos: teoría, ejemplos y la actividad «La cuenta del banco de Maria» en cuatro niveles.",
};

function Extracto() {
  return (
    <Figura caption="Extracto de la cuenta: los gastos tiran del saldo por debajo de 0 — ahí nace el número negativo.">
      <svg viewBox="0 0 240 130" className="h-40 w-auto max-w-full" role="img" aria-label="Extracto bancario con saldo en negativo">
        <rect x="10" y="10" width="150" height="110" rx="8" fill="#fffbeb" stroke="#b45309" strokeWidth="2" />
        <rect x="10" y="10" width="150" height="24" rx="8" fill="#fde68a" />
        <text x="85" y="26" fontSize="11" fontWeight="bold" fill="#78350f" textAnchor="middle" fontFamily="system-ui">CUENTA DE MARIA</text>
        <g fontSize="10" fontFamily="system-ui">
          <text x="22" y="52" fill="#047857">+ 20 €  abuelo</text>
          <text x="22" y="70" fill="#b91c1c">− 62 €  videojuego</text>
          <text x="22" y="88" fill="#b91c1c">− 14 €  cine</text>
        </g>
        <line x1="22" y1="96" x2="148" y2="96" stroke="#b45309" strokeWidth="1.5" />
        <text x="22" y="112" fontSize="12" fontWeight="bold" fill="#b91c1c" fontFamily="system-ui">SALDO −11 €</text>
        <path d="M170 100 q 22 -6 30 -34" fill="none" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#f2)" />
        <defs>
          <marker id="f2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0L6 3L0 6z" fill="#dc2626" />
          </marker>
        </defs>
        <g fontFamily="system-ui">
          <line x1="212" y1="30" x2="238" y2="30" stroke="#0284c7" strokeWidth="2" />
          <text x="225" y="24" fontSize="9" fill="#0369a1" textAnchor="middle">0 €</text>
          <text x="225" y="46" fontSize="11" fontWeight="bold" fill="#b91c1c" textAnchor="middle">−11</text>
          <circle cx="225" cy="52" r="4" fill="#ef4444" />
        </g>
      </svg>
    </Figura>
  );
}

export default function T1A04() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Adaptaciones PTE", path: "/adaptaciones-pte/" },
          { title: "2.º ESO", path: "/adaptaciones-pte/2eso/" },
          { title: "Matemáticas", path: "/adaptaciones-pte/2eso/matematicas/" },
          { title: "Tema 1", path: "/adaptaciones-pte/2eso/matematicas/tema-1/" },
          { title: "Ap. 4", path: "/adaptaciones-pte/2eso/matematicas/tema-1/04-suma-resta/" },
        ]}
      />
      <span className={chip}>Tema 1 · Apartado 4 — Suma y resta de enteros</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        4 · Suma y resta de números enteros
      </h1>

      <Teoria>
        <p>
          En la recta: <b>sumar</b> = desplazarse a la derecha · <b>restar</b> = a la izquierda.
          Con negativos, la única duda típica es el doble signo: (−4) + (−3) son dos pasos a la
          izquierda de −4 → <b>−7</b> (unimos, mismo signo: sumamos valores y conservamos el
          signo).
        </p>
        <p>
          Y el caso que sorprende: (−4) − (−3) = <b>−1</b>. Restar un negativo es <b>sumar su
          opuesto</b>: «quitar una deuda es meter dinero». Dos signos seguidos se leen como uno:
          −(−3) = +3, −(+3) = −3, +(+3) = +3, +(−3) = −3.
        </p>
        <p>
          Truco final para no fallar en exámenes: en restas del tipo «a − b» con números grandes,
          calcula primero cuánto hay de b a 0 y cuánto de 0 a a: 2 − (−6) → 6 + 2 = 8 grados de
          diferencia. La recta siempre da la razón.
        </p>
      </Teoria>

      <Extracto />

      <SeccionTitulo emoji="✏️" titulo="Ejemplos resueltos" />
      <div className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <p>• (−7) + 4 = −3 · (7 − 4 = 3, gana el signo del 7) · 5 − 8 = −3 · (−3) − (−9) = −3 + 9 = 6.</p>
        <p>• Saldo 45 € · gasto 62 € · ingreso 20 €: 45 − 62 + 20 = 3 · −62 + 65 = +3 €. El saldo puede <b>volver</b> a positivo a mitad de semana.</p>
      </div>

      <SeccionTitulo emoji="🎯" titulo="Actividad: La cuenta del banco de Maria" subtitulo="El ejercicio ya creado, como actividad de este apartado." />
      <section className={tarjeta}>
        <Nivel
          cls={n2}
          label="2.º ESO · nivel de referencia"
          intro="Maria tiene 45 € en su cuenta. Esta semana:"
          partes={[<>a) Escribe cada movimiento como número con signo: lunes gasta <b>62 €</b>, miércoles ingresa <b>20 €</b> del abuelo, viernes gasta <b>14 €</b> en el cine.</>,
            <>b) Calcula su saldo del viernes.</>,
            <>c) Interpreta el resultado: si sale negativo, ¿qué significa?</>,
            <>d) ¿Cuánto necesita como mínimo el sábado para volver a saldo 0?</>]}
          solucion={[<>a) +45 (inicial), −62, +20, −14.</>,
            <>b) 45 − 62 + 20 − 14 = <b>−11 €</b>.</>,
            <>c) Está en descubierto: debe 11 € al banco.</>,
            <>d) 11 € exactamente.</>]}
        />
        <Nivel
          cls={n1}
          label="1.º ESO · adaptación"
          partes={[<>a) Rellena la tabla INGRESOS (+) / GASTOS (−): Maria tiene 40 €; el abuelo le ingresa 20 €; gasta 55 € en un videojuego.</>,
            <>b) Calcula el saldo en dos tiempos: primero junta los ingresos, luego resta el gasto.</>,
            <>c) Completa: «A Maria le <i>sobran / faltan</i> ___ €».</>]}
          solucion={[<>a) Ingresos: +40, +20 · Gasto: −55.</>,
            <>b) 40 + 20 = 60 · 60 − 55 = <b>+5 €</b>.</>,
            <>c) «Le sobran 5 €». <i>Variante profe: con gasto 65 € → −5 €.</i></>]}
          adaptacion={<>Tabla ingresos/gastos estructurada, números redondos y cálculo guiado en dos tiempos.</>}
        />
        <Nivel
          cls={n6}
          label="6.º primaria · adaptación"
          partes={[<>a) Maria tiene 30 € y gasta 45 €. Dibuja la recta de 0 a 50 y representa el salto hacia atrás.</>,
            <>b) ¿Cuántos euros le faltan?</>,
            <>c) Escríbelo con signo: si le faltan 15, se escribe −15 €.</>]}
          solucion={[<>a) El salto de 45 desde 30 se sale por debajo del 0.</>,
            <>b) Le faltan <b>15 €</b>.</>,
            <>c) Saldo: <b>−15 €</b>.</>]}
          adaptacion={<>Un solo movimiento; el negativo aparece como nombre de «lo que falta». Recta en positivos primero.</>}
        />
        <Nivel
          cls={n5}
          label="5.º primaria · adaptación"
          partes={[<>a) Monedas de 5 €: Maria tiene 6 monedas, el juguete vale 9 fichas. Coloca y cuenta: ¿cuántas monedas le faltan?</>,
            <>b) Completa: «A Maria le <i>faltan</i> ___ €».</>,
            <>c) Copia: «le faltan 15 € = saldo −15».</>]}
          solucion={[<>a) <b>3 monedas = 15 €</b>.</>,
            <>b) «…faltan <b>15</b> €».</>,
            <>c) <b>−15</b>.</>]}
          adaptacion={<>Manipulativo con monedas y fichas; una única sustracción por correspondencia; el signo se copia como etiqueta.</>}
        />
      </section>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/adaptaciones-pte/2eso/matematicas/tema-1/03-comparacion/" className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← Apartado 3
        </Link>
        <div className="flex gap-3">
          <PrintButton />
          <Link href="/adaptaciones-pte/2eso/matematicas/tema-1/05-combinadas/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
            Apartado 5 · Combinadas →
          </Link>
        </div>
      </div>
    </div>
  );
}
