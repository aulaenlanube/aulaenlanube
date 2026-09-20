import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";
import { chip, n2, n1, n6, n5, tarjeta, Figura, Teoria, SeccionTitulo, Nivel } from "../../ui";

export const metadata: Metadata = {
  title: "3 · Comparación de números enteros — Tema 1 Matemáticas 2.º ESO — Adaptaciones PTE",
  description:
    "Comparar enteros con mayor y menor, valor absoluto y opuestos: teoría, ejemplos y actividad en cuatro niveles.",
};

function Balanza() {
  return (
    <Figura caption="Comparar en la recta: gana (es mayor) el que está más a la derecha, aunque sea negativo.">
      <svg viewBox="0 0 240 80" className="h-24 w-auto max-w-full" role="img" aria-label="Recta con dos puntos, minus seis y menos uno, y el signo mayor que">
        <line x1="14" y1="40" x2="226" y2="40" stroke="#64748b" strokeWidth="2" />
        <path d="M226 40l-8-4v8z" fill="#64748b" />
        <line x1="14" y1="40" x2="6" y2="40" stroke="#64748b" strokeWidth="2" />
        <g fontFamily="system-ui" fontSize="10" fill="#475569">
          <text x="120" y="60" textAnchor="middle">0</text>
          <text x="44" y="60" textAnchor="middle">−6</text>
          <text x="170" y="60" textAnchor="middle">−1</text>
        </g>
        <line x1="120" y1="34" x2="120" y2="46" stroke="#64748b" strokeWidth="2" />
        <line x1="44" y1="34" x2="44" y2="46" stroke="#dc2626" strokeWidth="2" />
        <line x1="170" y1="34" x2="170" y2="46" stroke="#16a34a" strokeWidth="2" />
        <circle cx="44" cy="40" r="4" fill="#dc2626" />
        <circle cx="170" cy="40" r="4" fill="#16a34a" />
        <text x="112" y="22" fontSize="18" fontWeight="bold" fill="#16a34a" fontFamily="system-ui">−6 &lt; −1</text>
      </svg>
    </Figura>
  );
}

export default function T1A03() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Adaptaciones PTE", path: "/adaptaciones-pte/" },
          { title: "2.º ESO", path: "/adaptaciones-pte/2eso/" },
          { title: "Matemáticas", path: "/adaptaciones-pte/2eso/matematicas/" },
          { title: "Tema 1", path: "/adaptaciones-pte/2eso/matematicas/tema-1/" },
          { title: "Ap. 3", path: "/adaptaciones-pte/2eso/matematicas/tema-1/03-comparacion/" },
        ]}
      />
      <span className={chip}>Tema 1 · Apartado 3 — Comparación de números</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        3 · Comparación de números enteros
      </h1>

      <Teoria>
        <p>
          Comparar enteros es decidir cuál es <b>mayor</b> (&gt;). La regla de la recta lo resuelve
          todo: <b>a la derecha es mayor</b>. Entre positivos, lo de siempre; entre negativos,
          sorprende al principio: −1 &gt; −6 porque −1 está más a la derecha (está más cerca del 0).
        </p>
        <p>
          El <b>valor absoluto</b> de un número es su distancia al 0, sin mirar el signo: |−6| = 6
          y |6| = 6. Dos números son <b>opuestos</b> si tienen el mismo valor absoluto y signos
          contrarios: 5 y −5 son opuestos; están a la misma distancia del 0, uno a cada lado.
        </p>
        <p>
          Truco de lectura para negativos: «−1 es más grande que −6» se lee bien como «debe menos
          dinero», «está más cerca del cero», «hace menos frío».
        </p>
      </Teoria>

      <Balanza />

      <SeccionTitulo emoji="✏️" titulo="Ejemplos resueltos" />
      <div className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <p>• −3 ___ 2 → −3 &lt; 2 (un negativo siempre es menor que un positivo).</p>
        <p>• −8 ___ −5 → −8 &lt; −5 (de los dos, −5 está más cerca del 0: debe menos).</p>
        <p>• |−7| = 7 · opuesto de −7 es +7 · pero −7 NO es «menor» que −7: es el mismo número.</p>
      </div>

      <SeccionTitulo emoji="🎯" titulo="Actividad: comparamos fríos, saldos y alturas" />
      <section className={tarjeta}>
        <Nivel
          cls={n2}
          label="2.º ESO · nivel de referencia"
          partes={[
            <>a) Compara con &lt;, &gt; o =: −4 ___ −9 · 0 ___ −2 · −7 ___ 3 · |−5| ___ |+5|.</>,
            <>b) Escribe un número mayor que −6 y menor que −2.</>,
            <>c) Una cuenta queda en −8 € y otra en −14 €. ¿Cuál está mejor? Explica con «debe».</>,
            <>d) ¿Es cierta esta frase? «Si a es negativo, entonces a es menor que |a|». Da un ejemplo y un contraejemplo si existe.</>,
          ]}
          solucion={[
            <>a) −4 &gt; −9 · 0 &gt; −2 · −7 &lt; 3 · |−5| = |+5| (los dos 5).</>,
            <>b) Cualquiera de −5, −4 o −3.</>,
            <>c) La de −8 €: debe menos dinero (8 € frente a 14 €) y está más cerca del 0.</>,
            <>d) <b>Cierta</b> para todo negativo: |a| es positivo y un negativo siempre es menor que un positivo. No hay contraejemplo.</>,
          ]}
        />
        <Nivel
          cls={n1}
          label="1.º ESO · adaptación"
          partes={[
            <>a) Compara: −4 ___ −9 · 0 ___ −2 · −7 ___ 3.</>,
            <>b) Escribe un número mayor que −6 y menor que −2.</>,
            <>c) Una cuenta queda en −8 € y otra en −14 €. ¿Cuál está mejor?</>,
          ]}
          solucion={[
            <>a) −4 &gt; −9 · 0 &gt; −2 · −7 &lt; 3.</>,
            <>b) −5, −4 o −3.</>,
            <>c) La de −8 €: debe menos.</>,
          ]}
          adaptacion={<>Se retira el apartado con valor absoluto y contraejemplo (d), y el ítem |−5| vs |+5|: la comparación va con números concretos y el apoyo de la recta. Respuestas cortas.</>}
        />
        <Nivel
          cls={n6}
          label="6.º primaria · adaptación"
          partes={[
            <>a) Colorea en la recta impresa: −4 en rojo y −9 en verde. ¿Cuál está más a la derecha?</>,
            <>b) Rodea el mayor: −4 / −9 · −7 / 3.</>,
            <>c) Maria debe 8 € y Juan debe 14 €. ¿Quién está más cerca de tener 0? Sí / No en la casilla.</>,
          ]}
          solucion={[
            <>a) El rojo (−4).</>,
            <>b) −4 · 3.</>,
            <>c) Maria.</>,
          ]}
          adaptacion={<>La comparación se hace pintando en la recta (canal visual) y con opciones cerradas; se elimina la notación &lt;/&gt; escrita: se usa «mayor/rodea».</>}
        />
        <Nivel
          cls={n5}
          label="5.º primaria · adaptación"
          partes={[
            <>a) Con la recta de pegatinas: pon el −4 y el −9. Señala con el dedo el que está más a la derecha.</>,
            <>b) Pega la tarjeta «MAYOR» sobre el número que corresponde: −4 / −9.</>,
            <>c) Di en voz alta: «−4 es mayor que −9 porque está más cerca del cero».</>,
          ]}
          solucion={[<>a) El −4.</>, <>b) Tarjeta MAYOR sobre −4.</>, <>c) Repetición correcta de la frase.</>]}
          adaptacion={<>Manipulativo y oral: se señala y se dice antes de escribir. La frase-modelo se copia del modelo del profe.</>}
        />
      </section>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/adaptaciones-pte/2eso/matematicas/tema-1/02-recta/" className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← Apartado 2
        </Link>
        <div className="flex gap-3">
          <PrintButton />
          <Link href="/adaptaciones-pte/2eso/matematicas/tema-1/04-suma-resta/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
            Apartado 4 · Suma y resta →
          </Link>
        </div>
      </div>
    </div>
  );
}
