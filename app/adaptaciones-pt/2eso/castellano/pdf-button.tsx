"use client";

// Panel «Descargar PDF» del formato OposicionesIA: el payload markdown (prop)
// se construye en el build y SIEMPRE lleva la sintaxis completa (cajas de
// nivel :::box, huecos [[fill]] y soluciones @). Quien filtra es el motor
// opos-pdf.js (script public) a través del 9º argumento opts de exportPdf:
// { niveles:number[], soluciones:boolean }. El botón compone el nombre final
// del fichero: base del payload + _<nivelTag>_<con|sin>soluciones.pdf.
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
        footerTitle?: string,
        opts?: { niveles?: number[]; soluciones?: boolean }
      ) => Promise<void>;
    };
  }
}

// Cargador del motor (una sola vez, con caché de promesa para no duplicar el
// script si se pulsa dos veces).
let motorPromise: Promise<void> | null = null;
function cargarMotor(): Promise<void> {
  if (window.OposDownloads) return Promise.resolve();
  if (!motorPromise) {
    motorPromise = new Promise<void>((res, rej) => {
      const s = document.createElement("script");
      s.src = "/opos-pdf.js?v=10";
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

type Chip = { tag: string; label: string; niveles: number[] };
const CHIPS: Chip[] = [
  { tag: "todos", label: "Todos", niveles: [0, 1, 2, 3, 4] },
  { tag: "2eso", label: "2.º ESO (base)", niveles: [0] },
  { tag: "1eso", label: "1.º ESO", niveles: [1] },
  { tag: "6p", label: "6.º Primaria", niveles: [2] },
  { tag: "5p", label: "5.º Primaria", niveles: [3] },
  { tag: "4p", label: "4.º Primaria", niveles: [4] },
];

const chipCls = (sel: boolean) =>
  sel
    ? "rounded-full border border-blue-500 bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-sm transition"
    : "rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-blue-300 hover:bg-blue-50";

export default function OposPdfButton({ payload, label }: { payload: PdfPayload; label?: string }) {
  const [chip, setChip] = useState<Chip>(CHIPS[0]);
  const [conSoluciones, setConSoluciones] = useState(true);
  const [estado, setEstado] = useState<"idle" | "ok" | "err">("idle");

  const descargar = async () => {
    setEstado("idle");
    try {
      await cargarMotor();
      const base = payload.filename.replace(/\.pdf$/i, "");
      const fname = `${base}_${chip.tag}_${conSoluciones ? "con" : "sin"}soluciones.pdf`;
      await window.OposDownloads!.exportPdf(
        "",
        fname,
        (m) => setEstado(m.indexOf("descargado") >= 0 ? "ok" : "idle"),
        payload.headerTitle,
        "castellano",
        payload.sections,
        payload.headerSubtitle,
        payload.footerTitle,
        { niveles: chip.niveles, soluciones: conSoluciones }
      );
      setEstado("ok");
    } catch {
      setEstado("err");
    }
  };

  return (
    <span className="no-print inline-flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-3">
      <span className="flex flex-wrap items-center gap-1.5">
        {CHIPS.map((c) => (
          <button key={c.tag} type="button" onClick={() => setChip(c)} className={chipCls(c.tag === chip.tag)}>
            {c.label}
          </button>
        ))}
        <span className="mx-1 h-4 w-px bg-zinc-300" aria-hidden />
        <button
          type="button"
          role="switch"
          aria-checked={conSoluciones}
          onClick={() => setConSoluciones((v) => !v)}
          className={`rounded-full border px-3 py-1 text-xs font-semibold shadow-sm transition ${
            conSoluciones
              ? "border-emerald-500 bg-emerald-600 text-white hover:bg-emerald-700"
              : "border-zinc-400 bg-white text-slate-600 hover:bg-zinc-100"
          }`}
        >
          {conSoluciones ? "Con soluciones" : "Sin soluciones"}
        </button>
      </span>
      <button
        type="button"
        onClick={descargar}
        className="self-start rounded-xl border border-blue-300 bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
      >
        {estado === "ok" ? "✓ Descargado" : estado === "err" ? "No se pudo generar" : label ?? "⬇ Descargar PDF"}
      </button>
    </span>
  );
}
