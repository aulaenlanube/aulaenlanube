import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";
import { chip, n2, n1, n6, n5, tarjeta, Figura, Teoria, SeccionTitulo, Nivel } from "../../ui";

export const metadata: Metadata = {
  title: "1 · Introducción a los números enteros — Tema 1 Matemáticas 2.º ESO — Adaptaciones PTE",
  description:
    "Qué son los números negativos y para qué sirven: teoría accesible, ejemplos resueltos y actividad en cuatro niveles (2º ESO, 1º ESO, 6º y 5º primaria).",
};

function Etiquetas() {
  return (
    <Figura caption="Etiqueta cada situación con el número con su signo: ↑ positivas, ↓ negativas.">
      <svg viewBox="0 0 260 90" className="h-28 w-auto max-w-full" role="img" aria-label="Cuatro tarjetas de situaciones con flechas arriba y abajo">
        <g fontFamily="system-ui" fontSize="10">
          <rect x="6" y="14" width="56" height="60" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x="34" y="34" textAnchor="middle" fill="#14532d">+20 °C</text>
          <text x="34" y="50" textAnchor="middle" fill="#166534">calor</text>
          <path d="M34 66v-10m0 0l-4 5m4-5l4 5" stroke="#16a34a" strokeWidth="2" fill="none" />
          <rect x="72" y="14" width="56" height="60" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
          <text x="100" y="34" textAnchor="middle" fill="#7f1d1d">−3 °C</text>
          <text x="100" y="50" textAnchor="middle" fill="#b91c1c">bajo cero</text>
          <path d="M100 56v10m0 0l-4-5m4 5l4 5" stroke="#dc2626" strokeWidth="2" fill="none" />
          <rect x="138" y="14" width="56" height="60" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
          <text x="166" y="34" textAnchor="middle" fill="#7f1d1d">−11 €</text>
          <text x="166" y="50" textAnchor="middle" fill="#b91c1c">deuda</text>
          <path d="M166 56v10m0 0l-4-5m4 5l4 5" stroke="#dc2626" strokeWidth="2" fill="none" />
          <rect x="204" y="14" width="50" height="60" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x="229" y="34" textAnchor="middle" fill="#14532d">+45 m</text>
          <text x="229" y="50" textAnchor="middle" fill="#166534">altura</text>
          <path d="M229 66v-10m0 0l-4 5m4-5l4 5" stroke="#16a34a" strokeWidth="2" fill="none" />
        </g>
      </svg>
    </Figura>
  );
}

export default function T1A01() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Adaptaciones PTE", path: "/adaptaciones-pte/" },
          { title: "2.º ESO", path: "/adaptaciones-pte/2eso/" },
          { title: "Matemáticas", path: "/adaptaciones-pte/2eso/matematicas/" },
          { title: "Tema 1", path: "/adaptaciones-pte/2eso/matematicas/tema-1/" },
          { title: "Ap. 1", path: "/adaptaciones-pte/2eso/matematicas/tema-1/01-introduccion/" },
        ]}
      />
      <span className={chip}>Tema 1 · Apartado 1 — Introducción a los enteros</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        1 · Introducción a los números enteros
      </h1>

      <Teoria>
        <p>
          Los números que usas desde pequeño (1, 2, 3…) sirven para <b>contar</b>. Pero hay
          situaciones en la vida real que no se pueden contar con ellos: estar <b>bajo cero</b>,
          <b> deber dinero</b> o estar en un <b>sótano</b>. Para esas situaciones inventamos los{" "}
          <b>números negativos</b>, que se escriben con un signo menos delante: −3, −11, −45.
        </p>
        <p>
          Los negativos y los positivos (estos últimos pueden escribirse con + o sin nada) forman
          juntos los <b>números enteros</b>. El 0 no es ni positivo ni negativo: es la frontera.
        </p>
        <p>
          Truco para no confundirse: el signo no dice «tamaño», dice <b>dirección</b>. +20 °C es
          calor; −20 °C es tanto frío «al revés». En el banco, +20 € es dinero que entra; −20 € es
          dinero que falta.
        </p>
      </Teoria>

      <Etiquetas />

      <SeccionTitulo emoji="✏️" titulo="Ejemplos resueltos" />
      <div className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <p>• El lunes hace −3 °C y el martes 3 °C: <b>no</b> es el mismo día. El −3 está «por debajo de cero» (hay que abrigarse más), el 3 está «por encima».</p>
        <p>• Maria gasta 62 € y solo tiene 45 €: el banco le anota −11 €. El menos significa <b>«debe 11 €»</b>, no «11 €».</p>
        <p>• El parking tiene plantas −1 y −2: cuanto <b>más negativo</b> el sótano, <b>más abajo</b> estás.</p>
      </div>

      <SeccionTitulo emoji="🎯" titulo="Actividad: clasifica la situación" subtitulo="Mismo objetivo en los cuatro niveles: escribir cada situación con su número con signo." />
      <section className={tarjeta}>
        <Nivel
          cls={n2}
          label="2.º ESO · nivel de referencia"
          partes={[
            <>a) Escribe con signo: 5 °C bajo cero; un buzo a 18 m bajo el nivel del mar; ingreso de 30 €; 400 m de altitud.</>,
            <>b) Inventa TÚ dos situaciones nuevas, una positiva y una negativa, y escríbelas como en el apartado a.</>,
            <>c) ¿En cuál de tus dos inventadas el número «está más cerca del 0»? Justifícalo.</>,
          ]}
          solucion={[
            <>a) −5 °C · −18 m · +30 € · +400 m.</>,
            <>b) Respuesta personal (válida si el signo cuadra con la situación).</>,
            <>c) Depende de los números elegidos: el que esté más cerca del 0 es el de valor absoluto menor (−5 está más cerca del 0 que −18).</>,
          ]}
        />
        <Nivel
          cls={n1}
          label="1.º ESO · adaptación"
          partes={[
            <>a) Escribe con signo: 5 °C bajo cero; un buzo a 18 m bajo el mar; ingreso de 30 €.</>,
            <>b) Inventa solo UNA situación, con la pista: «cosas que suben, suben… o cosas que se deben».</>,
          ]}
          solucion={[<>a) −5 °C · −18 m · +30 €.</>, <>b) Respuesta personal con signo correcto.</>]}
          adaptacion={<>Menos ítems (3), se quita la altitud (contexto ambiguo para empezar) y el apartado c; la invención lleva pista verbal.</>}
        />
        <Nivel
          cls={n6}
          label="6.º primaria · adaptación"
          partes={[
            <>a) Une con flechas cada tarjeta de arriba con su frase: «bajo cero», «deuda», «dinero que entra».</>,
            <>b) Copia cada número con su signo debajo de la frase que le toca.</>,
          ]}
          solucion={[<>a) −3 °C → bajo cero · −11 € → deuda · +20 € → dinero que entra.</>, <>b) Se comprueba mirando el dibujo.</>]}
          adaptacion={<>Trabajo con las tarjetas del dibujo (emparejar y copiar): sin invención propia todavía. El signo se copia del modelo.</>}
        />
        <Nivel
          cls={n5}
          label="5.º primaria · adaptación"
          partes={[
            <>a) Con las tarjetas del dibujo: señala con el dedo las que son «bajo cero o deudas». ¿Cuántas hay?</>,
            <>b) Copia las dos frases del profe: «−3 = tres bajo cero», «−11 = debo 11».</>,
          ]}
          solucion={[<>a) Dos: −3 °C y −11 €.</>, <>b) Copia correcta de ambas.</>]}
          adaptacion={<>Solo señalar y copiar, con dictado de la lectura oral. El concepto «negativo = debajo/deuda» va por el gesto y la voz antes que por el número.</>}
        />
      </section>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/adaptaciones-pte/2eso/matematicas/tema-1/" className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← Tema 1
        </Link>
        <div className="flex gap-3">
          <PrintButton />
          <Link href="/adaptaciones-pte/2eso/matematicas/tema-1/02-recta/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
            Apartado 2 · La recta →
          </Link>
        </div>
      </div>
    </div>
  );
}
