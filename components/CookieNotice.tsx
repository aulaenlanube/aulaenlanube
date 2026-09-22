"use client";

import { useEffect, useState } from "react";
import Link from "@/components/Link";

const KEY = "aeln_cookie_aviso";

// Aviso de cookies. Este sitio NO carga cookies de analítica ni de publicidad, y
// YouTube solo se solicita al pulsar "play" (youtube-nocookie). Por eso el aviso
// es informativo: no bloquea nada porque no hay nada no esencial que bloquear.
// El "visto" se recuerda en localStorage (no viaja a ningún servidor).
export default function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* almacenamiento no disponible: no mostramos el aviso */
    }
  }, []);

  // Mientras el aviso tapa el borde inferior, el botón «volver arriba» se
  // esconde en pantallas estrechas para no quedar medio cubierto
  // (la regla vive en app/globals.css).
  useEffect(() => {
    if (!show) return;
    document.documentElement.setAttribute("data-aviso", "1");
    return () => document.documentElement.removeAttribute("data-aviso");
  }, [show]);

  function accept() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* sin persistencia: se cerrará solo durante la sesión */
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-xl border border-zinc-200 dark:border-white/10 bg-white/95 p-4 shadow-xl ring-1 ring-black/5 dark:bg-slate-900/95 dark:ring-white/10 backdrop-blur sm:inset-x-4 sm:bottom-4 sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
          🍪 Usamos solo <strong>cookies técnicas</strong> necesarias para el sitio.
          No usamos analítica ni publicidad, y los vídeos de YouTube se cargan solo
          cuando pulsas <em>play</em>.{" "}
          <Link href="/politica-de-cookies/" className="font-medium text-blue-600 dark:text-blue-400 underline">
            Más información
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
