"use client";

import { useEffect, useState } from "react";

// Botón flotante «volver arriba».
//
// Aparece al bajar del primer pantallazo y lleva un aro de progreso que se
// completa según lo que llevas leído de la página: da referencia en las
// lecciones largas y en las páginas de ejercicios, que son kilométricas.
//
// Detalles que importan:
//
// · El desplazamiento no fuerza `behavior: "smooth"`. Lo pone el CSS
//   (`html { scroll-behavior: smooth }`), que ya lo desactiva si el usuario ha
//   pedido reducir el movimiento: una sola fuente de verdad.
// · Mientras está oculto va `inert`, así que no se puede tabular hasta un botón
//   invisible. Al pulsarlo, el botón se oculta (ya estás arriba) y el foco
//   vuelve al principio del documento, que es justo lo que se espera al
//   "volver arriba" con el teclado.
// · No se pinta al imprimir: `.fixed` está oculto en el bloque @media print.

const APARECE = 400; // px de scroll a partir de los cuales se muestra
const RADIO = 21;
const PERIMETRO = 2 * Math.PI * RADIO;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    let frame = 0;

    const medir = () => {
      frame = 0;
      const y = window.scrollY;
      const recorrido = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(y > APARECE);
      setProgreso(recorrido > 0 ? Math.min(1, Math.max(0, y / recorrido)) : 0);
    };

    // Una medición por fotograma como mucho, aunque el scroll dispare cien.
    const alMoverse = () => {
      if (!frame) frame = requestAnimationFrame(medir);
    };

    // La primera medición también va en un fotograma aparte: así el efecto no
    // llama a setState de forma síncrona (evita renders en cascada) y además
    // recoge la posición restaurada por el navegador al volver atrás.
    frame = requestAnimationFrame(medir);
    window.addEventListener("scroll", alMoverse, { passive: true });
    window.addEventListener("resize", alMoverse);
    return () => {
      window.removeEventListener("scroll", alMoverse);
      window.removeEventListener("resize", alMoverse);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      inert={!visible}
      aria-label="Volver arriba"
      title="Volver arriba"
      className={`aeln-arriba group fixed bottom-6 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-slate-700/95 text-white shadow-lg shadow-slate-900/25 ring-1 ring-black/5 backdrop-blur transition duration-300 ease-out hover:bg-slate-800 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transition-none dark:bg-slate-800/90 dark:shadow-black/40 dark:ring-white/10 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900 sm:right-6 ${
        visible
          ? "translate-y-0 opacity-100 hover:-translate-y-0.5"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      {/* Aro de progreso de lectura (empieza arriba: -90°) */}
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle
          cx="24"
          cy="24"
          r={RADIO}
          fill="none"
          className="stroke-white/20"
          strokeWidth="2.5"
        />
        <circle
          cx="24"
          cy="24"
          r={RADIO}
          fill="none"
          className="stroke-sky-400"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={PERIMETRO}
          strokeDashoffset={PERIMETRO * (1 - progreso)}
        />
      </svg>

      {/* Flecha: sube un pelín al pasar el ratón */}
      <svg
        viewBox="0 0 24 24"
        className="relative h-5 w-5 fill-none stroke-current stroke-2 transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
