"use client";

import { useState } from "react";
import CodeBlock from "./CodeBlock";

// Botón "Mostrar / Ocultar solución" + caja de código que se despliega con una
// animación suave (truco de grid-rows 0fr→1fr, que anima alturas desconocidas
// sin saltos). El código permanece en el DOM (bueno para SEO); solo se oculta
// visualmente cuando está plegado.
export default function ExerciseSolution({
  code,
  lines,
  lang = "Java",
}: {
  code: string;
  lines: string[];
  lang?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group inline-flex min-h-[40px] items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-100 hover:shadow active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
      >
        <svg
          viewBox="0 0 20 20"
          className={`h-4 w-4 fill-current transition-transform duration-300 motion-reduce:transition-none ${
            open ? "rotate-90" : ""
          }`}
          aria-hidden
        >
          <path d="M7 4l6 6-6 6V4z" />
        </svg>
        <span>{open ? "Ocultar solución" : "Mostrar solución"}</span>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        {/* `inert` saca el código del orden de tabulación y del árbol de
            accesibilidad mientras está plegado, pero lo deja en el DOM (bueno
            para SEO). */}
        <div className="overflow-hidden" inert={!open} aria-hidden={!open || undefined}>
          <div className="pt-4">
            <CodeBlock code={code} lines={lines} lang={lang} />
          </div>
        </div>
      </div>
    </div>
  );
}
