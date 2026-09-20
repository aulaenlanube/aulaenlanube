import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";
import { chip, n2, n1, n6, n5, tarjeta, Figura, Teoria, SeccionTitulo, Nivel } from "../../ui";

export const metadata: Metadata = {
  title: "6 · Problemas de la vida real — Tema 1 Matemáticas 2.º ESO — Adaptaciones PTE",
  description:
    "Enteros en temperatura, altitud y economía: teoría para traducir el enunciado a números, ejemplos y actividad en cuatro niveles.",
};

function Montanas() {
  return (
    <Figura caption="El nivel del mar es el 0: las montañas van hacia arriba (+), la mina y el submarino hacia abajo (−).">
      <svg viewBox="0 0 240 110" className="h-32 w-auto max-w-full" role="img" aria-label="Perfil de montaña y mina con nivel del mar en cero">
        <line x1="4" y1="60" x2="236" y2="60" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6 4" />
        <text x="10" y="54" fontSize="9" fill="#0369a1" fontFamily="system-ui">nivel del mar · 0</text>
        <path d="M30 60 L75 18 L120 60" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <text x="75" y="14" fontSize="10" fill="#14532d" textAnchor="middle" fontFamily="system-ui" fontWeight="bold">+800 m</text>
        <path d="M140 60 L165 60 L185 100 L215 100 L225 60" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
        <text x="192" y="96" fontSize="10" fill="#7f1d1d" textAnchor="middle" fontFamily="system-ui" fontWeight="bold">−60 m</text>
        <rect x="4" y="60" width="232" height="8" fill="#e0f2fe" opacity="0.6" />
      </svg>
    </Figura>
  );
}

export default function T1A06() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Adaptaciones PTE", path: "/adaptaciones-pte/" },
          { title: "2.º ESO", path: "/adaptaciones-pte/2eso/" },
          { title: "Matemáticas", path: "/adaptaciones-pte/2eso/matematicas/" },
          { title: "Tema 1", path: "/adaptaciones-pte/2eso/matematicas/tema-1/" },
          { title: "Ap. 6", path: "/adaptaciones-pte/2eso/matematicas/tema-1/06-problemas/" },
        ]}
      />
      <span className={chip}>Tema 1 · Apartado 6 — Problemas de la vida real</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        6 · Problemas de la vida real
      </h1>

      <Teoria>
        <p>
          Resolver con enteros es, casi siempre, <b>traducir</b>. Tres frases que aparecen en
          todos los exámenes y su traducción: «diferencia de temperatura entre a y b» → <b>a − b</b>
          · «sube/baja X» → <b>±X sumado al estado anterior</b> · «debe / debe menos / saldo» →
          <b> negativo, mayor (menos negativo), resultado de la resta de saldos</b>.
        </p>
        <p>
          Método en 4 pasos que vale para cualquier problema: 1) subraya los datos y la pregunta;
          2) dibuja la recta o el esquema; 3) escribe la operación ANTES de calcular; 4) responde
          con unidad y frase completa («la diferencia era de 8 °C»). El punto 4 es el que más
          nota salva: sin frase, la calculadora también sabía el número.
        </p>
      </Teoria>

      <Montanas />

      <SeccionTitulo emoji="✏️" titulo="Ejemplos resueltos" />
      <div className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <p>• Un dron a +45 m suelta una sonda que cae 70 m: 45 − 70 = <b>−25 m</b> → está 25 m por debajo del suelo del valle (la sonda en el pozo).</p>
        <p>• De −6 °C a 2 °C: 2 − (−6) = <b>8 °C de subida</b> — la diferencia NO es «−6 a 2 = 6» ni «−4».</p>
        <p>• Dos cuentas: −8 € y −14 €. Diferencia: −8 − (−14) = 6 € — la primera debe 6 € menos.</p>
      </div>

      <SeccionTitulo emoji="🎯" titulo="Actividad: temperatura, mina y dron" />
      <section className={tarjeta}>
        <Nivel
          cls={n2}
          label="2.º ESO · nivel de referencia"
          intro="Un valle tiene el fondo a −120 m. Sobre él, un pueblo a +340 m."
          partes={[
            <>a) ¿Cuál es el desnivel entre el fondo del valle y el pueblo? (diferencia de altitudes)</>,
            <>b) A mediodía la temperatura del valle era 7 °C y al anochecer bajó a −4 °C. ¿Cuántos grados bajó?</>,
            <>c) Un dron sale del pueblo, sube 60 m y baja 95 m. ¿A qué altitud queda respecto al mar? Escribe la operación completa antes de calcular.</>,
            <>d) Redacta la respuesta de c) en una frase completa con unidad.</>,
          ]}
          solucion={[
            <>a) 340 − (−120) = 340 + 120 = <b>460 m</b> de desnivel.</>,
            <>b) 7 − (−4) = <b>11 °C</b> de bajada.</>,
            <>c) 340 + 60 − 95 = <b>+305 m</b>.</>,
            <>d) «El dron queda a 305 metros sobre el nivel del mar, 35 metros por debajo del pueblo».</>,
          ]}
        />
        <Nivel
          cls={n1}
          label="1.º ESO · adaptación"
          partes={[
            <>a) Valle a −120 m, pueblo a +340 m. ¿Cuántos metros hay del uno al otro? (Pista: suma los dos números sin sus signos.)</>,
            <>b) De 7 °C a −4 °C, ¿cuántos grados bajó? Haz la recta primero.</>,
            <>c) Un globo está a 340 m: sube 60 y baja 95. ¿Altura final? Completa: 340 + ___ − ___ = ___</>,
          ]}
          solucion={[
            <>a) 340 + 120 = <b>460 m</b>.</>,
            <>b) 7 → 0 → −4: <b>11 °C</b>.</>,
            <>c) 340 + 60 − 95 = <b>305 m</b>.</>,
          ]}
          adaptacion={<>Mismos datos y operaciones; se da la pista de cómo tratar la resta de negativos (recta o «sumar sin signos») y la operación en c) viene semirrellenada.</>}
        />
        <Nivel
          cls={n6}
          label="6.º primaria · adaptación"
          partes={[
            <>a) En el dibujo de arriba: señala el valle (−120) y el pueblo (+340). ¿Quién está más alto? Rodea.</>,
            <>b) Del pueblo salen 2 senderos: sube 60 m y baja 95 m. En la recta impresa (de 300 a 400), traza los dos saltos y escribe la altura final.</>,
            <>c) Al anochecer hacía −4 °C y al mediodía +7 °C. ¿Cuál de las dos temperaturas es mayor? Rodea.</>,
          ]}
          solucion={[<>a) El pueblo (rodear +340).</>,
            <>b) 340 → 400 → <b>305 m</b>.</>,
            <>c) +7 °C.</>]}
          adaptacion={<>Se divide cada parte del problema en una acción (señalar, trazar, rodear), la recta se reduce al rango 300–400 y se quita la resta de negativos explícita: se resalta con «quién está más alto».</>}
        />
        <Nivel
          cls={n5}
          label="5.º primaria · adaptación"
          partes={[
            <>a) Maqueta: con plastilina, el valle va por debajo de la mesa (−120) y el pueblo por encima (+340). Pega la etiqueta a cada uno.</>,
            <>b) Con la recta de la mesa (del 300 al 400), mueve el muñeco 60 casillas arriba y luego 95… el profa ayuda con la calculadora de cinta: alturas 340 → 400 → 305. Pega la etiqueta final.</>,
            <>c) Copia la frase del profe: «el pueblo está a 340 m, el valle a −120 m».</>,
          ]}
          solucion={[<>a) Etiquetas colocadas: −120 debajo, +340 encima.</>,
            <>b) Etiqueta final en <b>305</b>.</>,
            <>c) Copia correcta.</>]}
          adaptacion={<>El problema se representa con el cuerpo y la maqueta (debajo/encima de la mesa = signo), el cálculo se apoya en calculadora de cinta, y la respuesta se copia de modelo.</>}
        />
      </section>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/adaptaciones-pte/2eso/matematicas/tema-1/05-combinadas/" className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← Apartado 5
        </Link>
        <div className="flex gap-3">
          <PrintButton />
          <Link href="/adaptaciones-pte/2eso/matematicas/tema-1/07-multiplicacion/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
            Apartado 7 · Multiplicación →
          </Link>
        </div>
      </div>
    </div>
  );
}
