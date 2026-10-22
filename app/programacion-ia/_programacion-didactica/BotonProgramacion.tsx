"use client";

// Botón «Descargar programación didáctica» de las páginas de grupo. Genera el
// PDF en el navegador con el motor opos-pdf.js (plantilla del IES Simarro:
// cabecera de logos + pie de financiación + «Página X de Y»). El contenido
// (contenido.ts, ~100 KB de texto) se importa solo al pulsar, para no
// engordar la página.
import { useState } from "react";
import type { Modalidad } from "./unidades";

type Motor = {
  exportPdf: (
    content: string,
    filename: string,
    onToast: (m: string) => void,
    headerTitle: string,
    lang: string,
    sections?: { title?: string; content: string; pagebreak?: boolean }[],
    headerSubtitle?: string,
    footerTitle?: string,
  ) => Promise<void>;
};

let motorPromise: Promise<void> | null = null;
function cargarMotor(): Promise<void> {
  const w = window as unknown as { OposDownloads?: Motor };
  if (w.OposDownloads) return Promise.resolve();
  if (!motorPromise) {
    motorPromise = new Promise<void>((res, rej) => {
      const s = document.createElement("script");
      s.src = "/opos-pdf.js?v=15";
      s.onload = () => res();
      s.onerror = () => {
        motorPromise = null;
        rej(new Error("motor PDF no disponible"));
      };
      document.head.appendChild(s);
    });
  }
  return motorPromise;
}

export default function BotonProgramacion({ modalidad }: { modalidad: Modalidad }) {
  const [estado, setEstado] = useState<"idle" | "gen" | "ok" | "err">("idle");
  const ambar = modalidad === "semipresencial";

  const descargar = async () => {
    setEstado("gen");
    try {
      const [{ payloadProgramacion }] = await Promise.all([import("./contenido"), cargarMotor()]);
      const p = payloadProgramacion(modalidad);
      const motor = (window as unknown as { OposDownloads: Motor }).OposDownloads;
      await motor.exportPdf("", p.filename, () => {}, p.headerTitle, "castellano", p.sections, p.headerSubtitle, p.footerTitle);
      setEstado("ok");
    } catch {
      setEstado("err");
    }
  };

  return (
    <button
      type="button"
      onClick={descargar}
      disabled={estado === "gen"}
      className={`inline-flex flex-none items-center justify-center rounded-xl border px-5 py-2.5 text-sm font-semibold shadow-sm transition disabled:opacity-60 ${
        ambar
          ? "border-amber-300 bg-white text-amber-700 hover:bg-amber-50 dark:border-amber-500/40 dark:bg-slate-900 dark:text-amber-300 dark:hover:bg-amber-500/10"
          : "border-blue-300 bg-white text-blue-700 hover:bg-blue-50 dark:border-blue-500/40 dark:bg-slate-900 dark:text-blue-300 dark:hover:bg-blue-500/10"
      }`}
    >
      {estado === "gen"
        ? "Generando PDF…"
        : estado === "ok"
          ? "✓ Descargada"
          : estado === "err"
            ? "No se pudo generar, reintentar"
            : "⬇ Programación didáctica (PDF)"}
    </button>
  );
}
