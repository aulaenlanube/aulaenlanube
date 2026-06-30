"use client";

import { useState } from "react";

// Caja de código con aspecto de editor: barra superior (semáforo + lenguaje +
// botón de copiar), numeración de líneas alineada y resaltado de sintaxis (el
// HTML pintado llega ya generado en tiempo de compilación desde lib/highlight).
export default function CodeBlock({
  code,
  lines,
  lang = "Java",
}: {
  code: string;
  lines: string[];
  lang?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Reserva para navegadores sin Clipboard API (o sin HTTPS).
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* sin solución */
      }
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="aeln-code overflow-hidden rounded-xl bg-[#0f172a] shadow-lg ring-1 ring-slate-700/60">
      {/* Barra superior */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-700/60 bg-[#111c33] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" aria-hidden />
          <span className="ml-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {lang}
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label="Copiar código"
          className="inline-flex min-h-[34px] min-w-[7.25rem] items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-slate-300 ring-1 ring-slate-600/70 transition-colors duration-150 hover:bg-slate-700/60 hover:text-white motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          {copied ? (
            <>
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-emerald-400" aria-hidden>
                <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0z" />
              </svg>
              <span className="text-emerald-400">¡Copiado!</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden>
                <path d="M7 2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V6.4a2 2 0 0 0-.6-1.4l-2.4-2.4A2 2 0 0 0 11.6 2H7zm0 1.5h4V6a1 1 0 0 0 1 1h2.5v6a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5z" />
                <path d="M4 6a2 2 0 0 0-1 1.7V16a2 2 0 0 0 2 2h7a2 2 0 0 0 1.7-1H5a.5.5 0 0 1-.5-.5V6z" />
              </svg>
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Aviso solo para lectores de pantalla cuando se copia (el cambio visual
          de texto no llega a la tecnología de asistencia). */}
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Código copiado al portapapeles" : ""}
      </span>

      {/* Cuerpo: numeración fija + código con scroll horizontal */}
      <div className="flex font-mono text-[13px] leading-6">
        <div
          className="select-none border-r border-slate-700/50 bg-slate-900/40 py-3 text-right text-slate-500"
          aria-hidden
        >
          {lines.map((_, i) => (
            <div key={i} className="h-6 px-3.5">
              {i + 1}
            </div>
          ))}
        </div>
        <div
          className="aeln-code-scroll min-w-0 flex-1 overflow-x-auto py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400"
          role="region"
          aria-label={`Código ${lang}`}
          tabIndex={0}
        >
          <code className="block">
            {lines.map((html, i) => (
              <div
                key={i}
                className="h-6 whitespace-pre px-4 text-slate-200"
                dangerouslySetInnerHTML={{ __html: html || "​" }}
              />
            ))}
          </code>
        </div>
      </div>
    </div>
  );
}
