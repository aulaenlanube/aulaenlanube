"use client";

import { useState } from "react";

// Botón de copiar de la terminal: copia solo las órdenes, sin la salida.
export default function BotonCopiar({ texto, etiqueta }: { texto: string; etiqueta: string }) {
  const [ok, setOk] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() =>
          navigator.clipboard.writeText(texto).then(() => {
            setOk(true);
            setTimeout(() => setOk(false), 1500);
          })
        }
        aria-label={`Copiar las órdenes de ${etiqueta}`}
        className="shrink-0 rounded-md px-3 py-1 text-base font-medium text-slate-300 ring-1 ring-slate-600/70 transition-colors hover:bg-slate-700/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        {ok ? "copiado ✓" : "copiar"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {ok ? "Órdenes copiadas al portapapeles" : ""}
      </span>
    </>
  );
}
