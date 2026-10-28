"use client";

import { useEffect, useSyncExternalStore } from "react";
import { CLAU_IDIOMA, EVENT_IDIOMA, type Idioma } from "../_idioma";

// Interruptor Valencià / Castellano. El idioma vive en el atributo
// `data-idioma` del contenedor (lo pone antes de pintar `scriptIdioma`), así
// que aquí solo se lee y se cambia: no hay estado propio que sincronizar.

function subscriu(cb: () => void) {
  window.addEventListener(EVENT_IDIOMA, cb);
  return () => window.removeEventListener(EVENT_IDIOMA, cb);
}

const OPCIONS: { l: Idioma; t: string }[] = [
  { l: "ca", t: "Valencià" },
  { l: "es", t: "Castellano" },
];

export default function SelectorIdioma({ objectiu, titols }: { objectiu: string; titols: Record<Idioma, string> }) {
  const idioma = useSyncExternalStore(
    subscriu,
    () => (document.getElementById(objectiu)?.getAttribute("data-idioma") === "es" ? "es" : "ca"),
    () => "ca" as Idioma,
  );

  useEffect(() => {
    document.title = titols[idioma];
  }, [idioma, titols]);

  const tria = (l: Idioma) => {
    document.getElementById(objectiu)?.setAttribute("data-idioma", l);
    try {
      localStorage.setItem(CLAU_IDIOMA, l);
    } catch {}
    const url = new URL(location.href);
    if (url.searchParams.has("idioma")) {
      url.searchParams.set("idioma", l === "es" ? "castellano" : "valencia");
      history.replaceState(null, "", url);
    }
    window.dispatchEvent(new Event(EVENT_IDIOMA));
  };

  return (
    <div role="group" aria-label="Idioma / Idioma" className="inline-flex rounded-full border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 p-1 shadow-sm print:hidden">
      {OPCIONS.map((o) => (
        <button
          key={o.l}
          type="button"
          lang={o.l}
          aria-pressed={idioma === o.l}
          onClick={() => tria(o.l)}
          className={
            idioma === o.l
              ? "rounded-full bg-slate-700 px-4 py-1.5 text-sm font-semibold text-white"
              : "rounded-full px-4 py-1.5 text-sm font-semibold text-zinc-600 dark:text-zinc-300 transition hover:bg-zinc-100 dark:hover:bg-white/10"
          }
        >
          {o.t}
        </button>
      ))}
    </div>
  );
}
