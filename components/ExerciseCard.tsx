"use client";

import { useState } from "react";
import CodeBlock from "./CodeBlock";

// Tarjeta de un ejercicio resuelto: cabecera con el título y, a su derecha, el
// botón "Mostrar/Ocultar solución"; debajo el enunciado (texto e imagen de
// ejemplo, siempre visibles) y la solución desplegable con el código.
export default function ExerciseCard({
  title,
  statementHtml,
  code,
  lines,
  lang = "Java",
}: {
  title: string;
  statementHtml: string;
  code?: string;
  lines?: string[];
  lang?: string;
}) {
  const [open, setOpen] = useState(false);
  const hasCode = !!(code && lines && lines.length > 0);

  return (
    <section className="mt-8 scroll-mt-24 rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50/80 via-white to-indigo-50/50 p-5 shadow-sm ring-1 ring-white/50 transition-all duration-200 hover:border-sky-200 hover:shadow-md motion-reduce:transition-none sm:p-7">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">{title}</h2>
        {hasCode && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="group inline-flex min-h-[38px] items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
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
        )}
      </div>

      <div
        className="prose prose-zinc mt-4 max-w-none text-[15px] prose-a:text-blue-600 prose-img:rounded-lg prose-img:ring-1 prose-img:ring-zinc-200"
        dangerouslySetInnerHTML={{ __html: statementHtml }}
      />

      {hasCode && (
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          {/* `inert` saca el código del orden de tabulación y del árbol de
              accesibilidad mientras está plegado, pero lo deja en el DOM (SEO). */}
          <div className="overflow-hidden" inert={!open} aria-hidden={!open || undefined}>
            <div className="pt-4">
              <CodeBlock code={code!} lines={lines!} lang={lang} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
