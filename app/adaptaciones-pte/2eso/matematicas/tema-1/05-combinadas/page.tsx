import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";
import { chip, n2, n1, n6, n5, tarjeta, Figura, Teoria, SeccionTitulo, Nivel } from "../../ui";

export const metadata: Metadata = {
  title: "5 · Operaciones combinadas — Tema 1 Matemáticas 2.º ESO — Adaptaciones PTE",
  description:
    "Sumas, restas y paréntesis encadenados: teoría, ejemplos y la actividad «El ascensor del parking» en cuatro niveles.",
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

export default function T1A05() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Adaptaciones PTE", path: "/adaptaciones-pte/" },
          { title: "2.º ESO", path: "/adaptaciones-pte/2eso/" },
          { title: "Matemáticas", path: "/adaptaciones-pte/2eso/matematicas/" },
          { title: "Tema 1", path: "/adaptaciones-pte/2eso/matematicas/tema-1/" },
          { title: "Ap. 5", path: "/adaptaciones-pte/2eso/matematicas/tema-1/05-combinadas/" },
        ]}
      />
      <span className={chip}>Tema 1 · Apartado 5 — Operaciones combinadas</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        5 · Operaciones combinadas
      </h1>

      <Teoria>
        <p>
          Varias operaciones seguidas se resuelven <b>en orden</b>: primero paréntesis, después
          productos y cocientes, y al final sumas y restas — de izquierda a derecha. Con negativos,
          el orden no cambia: cambia solo que cada término lleva su signo pegado.
        </p>
        <p>
          Consejo anti-fallo: reescribe la cadena <b>como suma algebraica</b> — todas las restas
          convertidas en «+ un negativo» — y luego agrupa: (−2) + 5 − 3 + 4 = (−2) + (+5) + (−3) +
          (+4) = (positivos: +9) + (negativos: −5) = <b>+4</b>. Sumar por grupos y juntar al final
          es más seguro que ir saltando.
        </p>
        <p>
          Y la comprobación de siempre: el recorrido del ascensor en la recta vertical del dibujo
          da el mismo resultado que el cálculo. Si no coinciden, el error está en el orden, no en
          la recta.
        </p>
      </Teoria>

      <Edificio />

      <SeccionTitulo emoji="✏️" titulo="Ejemplos resueltos" />
      <div className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <p>• (−8) + 3 − (−5) + 1 → −8 + 3 + 5 + 1 = <b>+1</b> (positivos: 9 · negativos: 8).</p>
        <p>• 12 − (−3 + 8) → paréntesis primero: −3 + 8 = 5 → 12 − 5 = <b>7</b>.</p>
        <p>• (−2) + 5 − 3 + 4 = <b>4</b> · el ascensor dice lo mismo: −2 → +3 → 0 → +4.</p>
      </div>

      <SeccionTitulo emoji="🎯" titulo="Actividad: El ascensor del parking" subtitulo="El ejercicio ya creado, como actividad de este apartado." />
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
            <>b) −2 → +3 → 0 → +4: <b>planta 4</b>.</>,
            <>c) 4 − (−1) = 5: baja <b>5 plantas</b>.</>,
            <>d) 3 · 0 · 4 = 4 → <b>confirmas</b>: es correcto.</>]}
        />
        <Nivel
          cls={n1}
          label="1.º ESO · adaptación"
          partes={[<>a) El ascensor está en el sótano 1 (−1). Dibuja el edificio con los sótanos abajo y la planta 0 marcada.</>,
            <>b) Sube 4 y baja 2: sigue el recorrido con flechas y escribe el número de cada parada.</>,
            <>c) ¿En qué planta se queda?</>]}
          solucion={[<>b) −1 → +3 → <b>planta 1</b>.</>,
            <>c) Planta <b>1</b>.</>]}
          adaptacion={<>Dos movimientos, números pequeños y sin paréntesis (se introducen en el siguiente apartado del curso).</>}
        />
        <Nivel
          cls={n6}
          label="6.º primaria · adaptación"
          partes={[<>a) El ascensor está en −2. Traza la flecha hacia arriba de 3 plantas sobre el dibujo impreso.</>,
            <>b) Escribe: (−2) + 3 = ___ .</>,
            <>c) ¿Ha subido por encima de la planta 0? Sí / No.</>]}
          solucion={[<>b) = <b>1</b> (planta 1).</>, <>c) Sí.</>]}
          adaptacion={<>Una sola suma, dibujo con plantas numeradas impresas y opción cerrada.</>}
        />
        <Nivel
          cls={n5}
          label="5.º primaria · adaptación"
          partes={[<>a) Maqueta de cartón: el profe pone el imán en «−2». Sube el imán 3 plantas.</>,
            <>b) Di en voz alta: «estoy en la planta ___».</>,
            <>c) Pega una etiqueta en cada parada: «−2» y «1».</>]}
          solucion={[<>b) «Estoy en la <b>planta 1</b>».</>, <>c) Etiquetas −2 (salida) y 1 (final).</>]}
          adaptacion={<>Manipulativo (maqueta, imán, etiquetas); se verbaliza antes de escribir.</>}
        />
      </section>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/adaptaciones-pte/2eso/matematicas/tema-1/04-suma-resta/" className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← Apartado 4
        </Link>
        <div className="flex gap-3">
          <PrintButton />
          <Link href="/adaptaciones-pte/2eso/matematicas/tema-1/06-problemas/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
            Apartado 6 · Problemas →
          </Link>
        </div>
      </div>
    </div>
  );
}
