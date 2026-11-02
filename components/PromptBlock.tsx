"use client";

import { useState } from "react";

// Caja de prompt (o de código) con botón de copiar. Cada línea es su propio
// elemento (`data-linea="n"`), así la cámara de los vídeos del curso puede
// subrayarla una a una; el número de línea va en un ::before, fuera del texto.
//
// · `text`: lo que se copia (y lo que se pinta si no llega `lineas`).
// · `lineas`: HTML ya resaltado y troceado por líneas (en compilación).
// · `etiqueta`: rótulo de la barra superior («Prompt», «opencode.json»…).
// · `grande`: letra de 16 px y barra con rótulo (páginas para vídeo).
// · `ajustar`: parte las líneas largas con sangría francesa (por defecto). Con
//   `false` la línea no se parte y la caja se desliza en horizontal.
export default function PromptBlock({
  text,
  lineas,
  etiqueta,
  grande = false,
  ajustar = true,
}: {
  text: string;
  lineas?: string[];
  etiqueta?: string;
  grande?: boolean;
  ajustar?: boolean;
}) {
  const [ok, setOk] = useState(false);
  const filas = lineas ?? text.split("\n");
  const copiar = () => {
    navigator.clipboard.writeText(text).then(() => {
      setOk(true);
      setTimeout(() => setOk(false), 1500);
    });
  };

  const linea = ajustar
    ? "block whitespace-pre-wrap break-words pl-[2ch] -indent-[2ch]"
    : "block whitespace-pre";
  const cuerpo = (
    <code className="block">
      {filas.map((l, i) =>
        lineas ? (
          <span
            key={i}
            data-linea={i + 1}
            className={linea}
            dangerouslySetInnerHTML={{ __html: l || "\u200b" }}
          />
        ) : (
          <span key={i} data-linea={i + 1} className={linea}>
            {l || "\u200b"}
          </span>
        ),
      )}
    </code>
  );

  if (!grande && !etiqueta) {
    return (
      <div className="relative my-3">
        <pre className="overflow-x-auto rounded-xl bg-zinc-900 p-4 pr-20 font-mono text-[13px] leading-relaxed text-zinc-100">
          {cuerpo}
        </pre>
        <button
          type="button"
          onClick={copiar}
          className="absolute right-2 top-2 rounded-lg bg-zinc-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-zinc-600"
        >
          {ok ? "copiado ✓" : "copiar"}
        </button>
      </div>
    );
  }

  return (
    <figure className="aeln-code min-w-0 overflow-hidden rounded-xl bg-[#0f172a] ring-1 ring-slate-700/60">
      <figcaption className="flex items-center justify-between gap-3 border-b border-slate-700/60 bg-[#111c33] px-4 py-1.5">
        <span className="min-w-0 truncate font-mono text-base font-semibold text-slate-300">
          {etiqueta ?? "Prompt"}
        </span>
        <button
          type="button"
          onClick={copiar}
          aria-label={`Copiar ${etiqueta ?? "prompt"}`}
          className="shrink-0 rounded-md px-3 py-1 text-base font-medium text-slate-300 ring-1 ring-slate-600/70 transition-colors hover:bg-slate-700/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          {ok ? "copiado ✓" : "copiar"}
        </button>
      </figcaption>
      <span className="sr-only" role="status" aria-live="polite">
        {ok ? "Copiado al portapapeles" : ""}
      </span>
      <pre
        className={`px-4 py-3 font-mono text-base leading-[1.45] text-slate-100 ${ajustar ? "" : "overflow-x-auto"}`}
        tabIndex={ajustar ? undefined : 0}
      >
        {cuerpo}
      </pre>
    </figure>
  );
}
