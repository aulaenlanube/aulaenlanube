"use client";

// Boton «Descargar PDF» del formato OposicionesIA: construye el documento
// markdown en el build (payload prop), el motor opos-pdf.js (script public)
// lo pagina en el navegador y descarga el PDF con cabecera, pie y marca de
// agua identicals a los del repositorio OposicionesIA.
import { useState } from "react";

type PdfSec = { title?: string; content: string };
export type PdfPayload = {
  filename: string;
  headerTitle: string;
  headerSubtitle: string;
  footerTitle: string;
  sections: PdfSec[];
};

declare global {
  interface Window {
    OposDownloads?: {
      exportPdf: (
        content: string,
        filename: string,
        onToast: (m: string) => void,
        headerTitle: string,
        lang: string,
        sections?: { title?: string; content: string }[],
        headerSubtitle?: string,
        footerTitle?: string
      ) => Promise<void>;
    };
  }
}

export default function OposPdfButton({ payload, label }: { payload: PdfPayload; label?: string }) {
  const [estado, setEstado] = useState<"idle" | "ok" | "err">("idle");

  

  return (
    <button
      type="button"
      onClick={async () => {
        setEstado("idle");
        try {
          if (!window.OposDownloads) {
            const s = document.createElement("script");
            s.src = "/opos-pdf.js";
            await new Promise<void>((res, rej) => {
              s.onload = () => res();
              s.onerror = () => rej(new Error("motor PDF no disponible"));
              document.head.appendChild(s);
            });
          }
          await window.OposDownloads!.exportPdf(
            "",
            payload.filename,
            (m) => setEstado(m.indexOf("descargado") >= 0 ? "ok" : "idle"),
            payload.headerTitle,
            "castellano",
            payload.sections,
            payload.headerSubtitle,
            payload.footerTitle
          );
          setEstado("ok");
        } catch (e) {
          setEstado("err");
        }
      }}
      className="no-print rounded-xl border border-blue-300 bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
    >
      {estado === "ok" ? "✓ Descargado" : estado === "err" ? "No se pudo generar" : "⬇ Descargar PDF"}
    </button>
  );
}
