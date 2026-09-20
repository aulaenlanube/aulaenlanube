import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";
import { chip, n2, n1, n6, n5, tarjeta, Figura, Teoria, SeccionTitulo, Nivel } from "../../ui";

export const metadata: Metadata = {
  title: "2 · La recta numérica — Tema 1 Matemáticas 2.º ESO — Adaptaciones PTE",
  description:
    "Situar enteros en la recta: teoría, ejemplos y la actividad «Temperaturas en la semana» adaptada en cuatro niveles.",
};

function Termometro() {
  return (
    <Figura caption="Termómetro de enero en Morella: la columna roja marca −3 °C. La escala es una recta numérica vertical.">
      <svg viewBox="0 0 220 120" className="h-36 w-auto max-w-full" role="img" aria-label="Termómetro marcando menos tres grados">
        <rect x="24" y="8" width="18" height="78" rx="9" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <circle cx="33" cy="98" r="15" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
        <rect x="28" y="54" width="10" height="42" rx="5" fill="#ef4444" />
        <g stroke="#0369a1" strokeWidth="1.5">
          <path d="M46 16h14" /><path d="M46 34h14" /><path d="M46 52h20" /><path d="M46 70h14" /><path d="M46 88h14" />
        </g>
        <g fontSize="10" fill="#0c4a6e" fontFamily="system-ui">
          <text x="66" y="20">+6</text><text x="66" y="38">+3</text>
          <text x="72" y="56" fontWeight="bold">0</text>
          <text x="66" y="74">−3</text><text x="66" y="92">−6</text>
        </g>
        <path d="M96 74h34" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="5 4" markerEnd="url(#flecha1)" />
        <defs>
          <marker id="flecha1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0L6 3L0 6z" fill="#dc2626" />
          </marker>
        </defs>
        <text x="138" y="70" fontSize="13" fill="#b91c1c" fontWeight="bold">−3 °C</text>
        <text x="138" y="86" fontSize="10" fill="#57534e">lunes, mínima</text>
      </svg>
    </Figura>
  );
}

export default function T1A02() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Adaptaciones PTE", path: "/adaptaciones-pte/" },
          { title: "2.º ESO", path: "/adaptaciones-pte/2eso/" },
          { title: "Matemáticas", path: "/adaptaciones-pte/2eso/matematicas/" },
          { title: "Tema 1", path: "/adaptaciones-pte/2eso/matematicas/tema-1/" },
          { title: "Ap. 2", path: "/adaptaciones-pte/2eso/matematicas/tema-1/02-recta/" },
        ]}
      />
      <span className={chip}>Tema 1 · Apartado 2 — La recta numérica</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        2 · La recta numérica
      </h1>

      <Teoria>
        <p>
          La <b>recta numérica</b> es una línea donde colocamos los números en orden: a la
          derecha, los positivos (cada paso, +1); a la izquierda del 0, los negativos (cada paso,
          −1). Así, los números se ven como <b>puestos</b>, no como cantidades: −6 está «más lejos
          del 0 hacia la izquierda» que −1.
        </p>
        <p>
          Regla visual que resuelve dudas: en la recta, <b>el número que está más a la derecha
          siempre es mayor</b> — también entre negativos. −1 &gt; −6 porque −1 está más cerca del 0
          por la derecha.
        </p>
        <p>
          El termómetro de la imagen es una recta vertical: abajo del todo están los números más
          pequeños (más fríos), arriba los más grandes. Subir = sumar; bajar = restar.
        </p>
      </Teoria>

      <Termometro />

      <SeccionTitulo emoji="✏️" titulo="Ejemplos resueltos" />
      <div className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <p>• Sitúa −4, +2 y 0 en la recta: −4 va cuatro pasos a la izquierda del 0; +2, dos a la derecha; el 0, en la frontera.</p>
        <p>• Partiendo de −3 y subiendo 5: −3 → −2 → −1 → 0 → +1 → <b>+2</b>. El salto cruza el cero sin enterarse: solo hay que seguir contando.</p>
      </div>

      <SeccionTitulo emoji="🎯" titulo="Actividad: Temperaturas en la semana" subtitulo="El ejercicio ya creado, como actividad de este apartado. Cuatro niveles, mismo contexto, misma idea." />
      <section className={tarjeta}>
        <Nivel
          cls={n2}
          label="2.º ESO · nivel de referencia"
          intro="Anota las temperaturas mínimas de una semana de enero en Morella:"
          partes={[<>a) Ordénalas de más fría a menos fría: lunes <b>−3 °C</b>, martes <b>0 °C</b>, miércoles <b>−6 °C</b>, jueves <b>2 °C</b>, viernes <b>−1 °C</b>.</>,
            <>b) ¿Qué día hizo más calor y qué día más frío?</>,
            <>c) Calcula la diferencia de temperatura entre el miércoles y el jueves.</>,
            <>d) Si el sábado la mínima fue −4 °C y el domingo subió 5 grados, ¿qué marcó el termómetro?</>]}
          solucion={[<>a) −6 (miércoles) &lt; −3 (lunes) &lt; −1 (viernes) &lt; 0 (martes) &lt; 2 (jueves).</>,
            <>b) Más calor: jueves (2 °C) · Más frío: miércoles (−6 °C).</>,
            <>c) 2 − (−6) = 2 + 6 = <b>8 °C</b> de diferencia.</>,
            <>d) −4 + 5 = <b>1 °C</b>.</>]}
        />
        <Nivel
          cls={n1}
          label="1.º ESO · adaptación"
          partes={[<>a) Marcalas en la recta impresa: sábado <b>−2 °C</b>, domingo <b>−5 °C</b>.</>,
            <>b) ¿Qué día hacía más frío? Rodea: sábado / domingo.</>,
            <>c) El lunes subió a 0 °C. ¿Cuántos grados subió desde el domingo?</>]}
          solucion={[<>a) −5 queda a la izquierda de −2.</>,
            <>b) Domingo (−5 °C).</>,
            <>c) De −5 a 0: subió <b>5 grados</b>.</>]}
          adaptacion={<>Menos datos (2 días), números pequeños, recta impresa para marcar a mano y opción cerrada en b.</>}
        />
        <Nivel
          cls={n6}
          label="6.º primaria · adaptación"
          partes={[<>a) Escribe con número y signo lo que marca el termómetro del dibujo: <b>−2 °C</b>.</>,
            <>b) A las 12 h subió 6 grados. Dibuja el salto en la recta y escribe la temperatura del mediodía.</>,
            <>c) ¿Era más fría la mañana (−2 °C) o la noche (−4 °C)?</>]}
          solucion={[<>a) −2 °C.</>,
            <>b) −2 + 6 = <b>4 °C</b>.</>,
            <>c) La noche: −4 °C es más frío.</>]}
          adaptacion={<>Una sola magnitud y una sola operación; el termómetro del dibujo es el apoyo directo. «Más fría» en vez de «menor».</>}
        />
        <Nivel
          cls={n5}
          label="5.º primaria · adaptación"
          partes={[<>a) Copia la temperatura del dibujo y di en voz alta: «dos grados bajo cero».</>,
            <>b) En la recta recortada, pegatina en −2 y otra 6 saltos más arriba.</>,
            <>c) Completa: «Al mediodía la temperatura era ___ grados, porque subió 6 desde −2».</>]}
          solucion={[<>a) −2 °C.</>,
            <>b) Pegatinas en −2 y en +4.</>,
            <>c) «…era <b>4</b> grados».</>]}
          adaptacion={<>Solo sumas hacia arriba en la recta física; el negativo se lee y se toca, no se opera.</>}
        />
      </section>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/adaptaciones-pte/2eso/matematicas/tema-1/01-introduccion/" className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← Apartado 1
        </Link>
        <div className="flex gap-3">
          <PrintButton />
          <Link href="/adaptaciones-pte/2eso/matematicas/tema-1/03-comparacion/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
            Apartado 3 · Comparación →
          </Link>
        </div>
      </div>
    </div>
  );
}
