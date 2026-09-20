import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";
import { chip, n2, n1, n6, n5, tarjeta, Figura, Nivel } from "../ui";

export const metadata: Metadata = {
  title: "Ejercicio 3 · El ascensor del parking — Matemáticas 2.º ESO — Adaptaciones PTE",
  description:
    "Números enteros: operaciones encadenadas con sótanos negativos. Cuatro niveles: 2º ESO, 1º ESO, 6º y 5º de primaria.",
};

function Edificio() {
  return (
    <Figura caption="El edificio como recta vertical: los sótanos van hacia abajo desde la planta 0.">
      <svg viewBox="0 0 240 150" className="h-44 w-auto max-w-full" role="img" aria-label="Edificio con sótanos negativos y ascensor subiendo">
        <rect x="60" y="8" width="70" height="134" fill="#ede9fe" stroke="#6d28d9" strokeWidth="2" rx="4" />
        <g stroke="#6d28d9" strokeWidth="1.2">
          <line x1="60" y1="35" x2="130" y2="35" /><line x1="60" y1="62" x2="130" y2="62" />
          <line x1="60" y1="89" x2="130" y2="89" /><line x1="60" y1="116" x2="130" y2="116" />
        </g>
        <g fontSize="10" fill="#4c1d95" fontFamily="system-ui" fontWeight="bold">
          <text x="50" y="26" textAnchor="end">4</text><text x="50" y="53" textAnchor="end">2</text>
          <text x="50" y="80" textAnchor="end">0</text><text x="50" y="107" textAnchor="end">−1</text>
          <text x="50" y="134" textAnchor="end">−2</text>
        </g>
        <rect x="86" y="120" width="18" height="12" rx="2" fill="#c4b5fd" stroke="#6d28d9" strokeWidth="1.5" />
        <path d="M140 126 C 150 110, 150 60, 140 20" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#f3)" />
        <defs>
          <marker id="f3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0L6 3L0 6z" fill="#16a34a" />
          </marker>
        </defs>
        <text x="160" y="70" fontSize="11" fill="#15803d" fontWeight="bold" fontFamily="system-ui">sube 5,</text>
        <text x="160" y="86" fontSize="11" fill="#15803d" fontWeight="bold" fontFamily="system-ui">baja 3,</text>
        <text x="160" y="102" fontSize="11" fill="#15803d" fontWeight="bold" fontFamily="system-ui">sube 4</text>
        <line x1="52" y1="82" x2="138" y2="82" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="138" y="78" fontSize="8.5" fill="#0369a1" fontFamily="system-ui">planta 0</text>
      </svg>
    </Figura>
  );
}

export default function PteEx3Ascensor() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Adaptaciones PTE", path: "/adaptaciones-pte/" },
          { title: "2.º ESO", path: "/adaptaciones-pte/2eso/" },
          { title: "Matemáticas", path: "/adaptaciones-pte/2eso/matematicas/" },
          { title: "Ej. 3", path: "/adaptaciones-pte/2eso/matematicas/03-ascensor/" },
        ]}
      />
      <span className={chip}>Matemáticas · Números enteros · Ejercicio 3</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        El ascensor del parking
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        Objetivo: operaciones encadenadas con enteros y paréntesis (sótano = negativo). Saberes
        básicos: operaciones con enteros, jerarquía — anexo III, Decreto 107/2022 (C. Valenciana).
      </p>

      <Edificio />

      <section className={tarjeta}>
        <Nivel
          cls={n2}
          label="2.º ESO · nivel de referencia"
          intro="El ascensor del parking empieza en el sótano 2 (−2)."
          partes={[<>a) Escribe la operación con signos y paréntesis: sube 5 plantas, baja 3 y vuelve a subir 4.</>,
            <>b) ¿En qué planta se queda?</>,
            <>c) Desde ahí, ¿cuántas plantas debe bajar para llegar al sótano 1 (−1)?</>,
            <>d) Un compañero dice: «−2 + 5 − 3 + 4 = 4». ¿Le corriges o le confirmas? Justifica.</>]}
          solucion={[<>a) (−2) + 5 − 3 + 4.</>,
            <>b) −2 → +3 → 0 → +4: se queda en la <b>planta 4</b>.</>,
            <>c) 4 − (−1) = 5: debe bajar <b>5 plantas</b>.</>,
            <>d) (−2 + 5) = 3 · 3 − 3 = 0 · 0 + 4 = 4. <b>Confirmas</b>: es correcto.</>]}
        />

        <Nivel
          cls={n1}
          label="1.º ESO · adaptación"
          partes={[<>a) El ascensor está en el sótano 1 (−1). Dibuja el edificio con los sótanos abajo y la planta 0 marcada.</>,
            <>b) Sube 4 plantas y baja 2: sigue el recorrido con flechas y escribe el número de cada parada.</>,
            <>c) ¿En qué planta se queda?</>]}
          solucion={[<>b) −1 → +3 → <b>planta 1</b>.</>,
            <>c) Planta <b>1</b>.</>]}
          adaptacion={<>Dos movimientos en vez de tres y el edificio dibujado como recta vertical (puente al contexto). Sin paréntesis: se introduce después.</>}
        />

        <Nivel
          cls={n6}
          label="6.º primaria · adaptación"
          partes={[<>a) El ascensor está en el sótano 2, que se escribe −2. Traza la flecha hacia arriba (3 plantas) sobre el dibujo impreso.</>,
            <>b) Escribe la operación: (−2) + 3 = ___ .</>,
            <>c) ¿Ha subido por encima de la planta 0? Sí / No.</>]}
          solucion={[<>b) (−2) + 3 = <b>1</b> (planta 1).</>,
            <>c) Sí.</>]}
          adaptacion={<>Una sola suma, dibujo con plantas numeradas impresas y opción cerrada. El negativo viene dado, no hay que generarlo.</>}
        />

        <Nivel
          cls={n5}
          label="5.º primaria · adaptación"
          partes={[<>a) Maqueta de cartón: el profe pone el imán (ascensor) en «−2». Sube el imán 3 plantas.</>,
            <>b) Di en voz alta: «estoy en la planta ___».</>,
            <>c) Pega una etiqueta en cada parada: «−2» y «1».</>]}
          solucion={[<>b) «Estoy en la <b>planta 1</b>».</>,
            <>c) Etiquetas: −2 (salida) y 1 (final).</>]}
          adaptacion={<>Todo manipulativo (maqueta, imán, etiquetas de pares fijos); se verbaliza antes de escribir. Mismo resultado que todos los niveles.</>}
        />
      </section>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/adaptaciones-pte/2eso/matematicas/" className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← Todos los ejercicios
        </Link>
        <div className="flex gap-3">
          <PrintButton />
          <Link href="/adaptaciones-pte/2eso/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
            Volver a 2.º ESO →
          </Link>
        </div>
      </div>
    </div>
  );
}
