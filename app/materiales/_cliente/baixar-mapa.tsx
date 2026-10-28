"use client";

import { useState } from "react";

// Descarga de un mapa conceptual SVG en PDF (A4 apaisado), PNG o SVG.
//
// Todo ocurre en el navegador: el SVG (con colores literales y letra
// Helvetica/Arial, sin depender del CSS de la página) se serializa, se pinta en
// un canvas a 3× y, para el PDF, se mete como JPEG en un PDF de una página
// escrito a mano (un catálogo, una página y una imagen DCT). Sin dependencias.

type Textos = { pdf: string; png: string; svg: string; fent: string; error: string };

const ESCALA = 3; // 1120 px → 3360 px: ~290 ppp en A4 apaisado

function svgText(id: string): { text: string; w: number; h: number } {
  const svg = document.getElementById(id) as SVGSVGElement | null;
  if (!svg) throw new Error(`No existe #${id}`);
  const [, , w, h] = svg.getAttribute("viewBox")!.split(" ").map(Number);
  const clon = svg.cloneNode(true) as SVGSVGElement;
  clon.removeAttribute("class");
  clon.removeAttribute("id");
  clon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clon.setAttribute("width", String(w));
  clon.setAttribute("height", String(h));
  return { text: new XMLSerializer().serializeToString(clon), w, h };
}

async function aCanvas(id: string): Promise<HTMLCanvasElement> {
  const { text, w, h } = svgText(id);
  const url = URL.createObjectURL(new Blob([text], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = w * ESCALA;
    canvas.height = h * ESCALA;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function blobDe(canvas: HTMLCanvasElement, tipus: string, qualitat?: number): Promise<Blob> {
  return new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("toBlob"))), tipus, qualitat));
}

/** PDF de una página A4 apaisada con la imagen JPEG centrada y ajustada. */
function pdfAmbJpeg(jpeg: Uint8Array, w: number, h: number): Blob {
  const PW = 841.89;
  const PH = 595.28;
  const k = Math.min(PW / w, PH / h);
  const dw = (w * k).toFixed(2);
  const dh = (h * k).toFixed(2);
  const dx = ((PW - w * k) / 2).toFixed(2);
  const dy = ((PH - h * k) / 2).toFixed(2);
  const enc = new TextEncoder();
  const trossos: Uint8Array[] = [];
  const offsets: number[] = [];
  let mida = 0;
  const afig = (b: Uint8Array) => {
    trossos.push(b);
    mida += b.length;
  };
  const s = (t: string) => afig(enc.encode(t));
  const obj = (n: number, cos: string) => {
    offsets[n] = mida;
    s(`${n} 0 obj\n${cos}\nendobj\n`);
  };
  const contingut = `q ${dw} 0 0 ${dh} ${dx} ${dy} cm /Im0 Do Q`;

  s("%PDF-1.4\n");
  obj(1, "<< /Type /Catalog /Pages 2 0 R >>");
  obj(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  obj(3, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PW} ${PH}] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>`);
  obj(4, `<< /Length ${contingut.length} >>\nstream\n${contingut}\nendstream`);
  offsets[5] = mida;
  s(`5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${w * ESCALA} /Height ${h * ESCALA} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`);
  afig(jpeg);
  s("\nendstream\nendobj\n");
  const xref = mida;
  s(`xref\n0 6\n0000000000 65535 f \n${[1, 2, 3, 4, 5].map((n) => `${String(offsets[n]).padStart(10, "0")} 00000 n \n`).join("")}`);
  s(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  return new Blob(trossos as BlobPart[], { type: "application/pdf" });
}

function baixa(blob: Blob, nom: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nom;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

const btn =
  "rounded-xl px-4 py-2 text-sm font-semibold transition disabled:opacity-60";

export default function BaixarMapa({ svgId, nom, t }: { svgId: string; nom: string; t: Textos }) {
  const [fent, setFent] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const fes = async (format: "pdf" | "png" | "svg") => {
    setFent(format);
    setError(false);
    try {
      if (format === "svg") {
        baixa(new Blob([svgText(svgId).text], { type: "image/svg+xml" }), `${nom}.svg`);
      } else {
        const canvas = await aCanvas(svgId);
        if (format === "png") {
          baixa(await blobDe(canvas, "image/png"), `${nom}.png`);
        } else {
          const jpeg = new Uint8Array(await (await blobDe(canvas, "image/jpeg", 0.92)).arrayBuffer());
          baixa(pdfAmbJpeg(jpeg, canvas.width / ESCALA, canvas.height / ESCALA), `${nom}.pdf`);
        }
      }
    } catch {
      setError(true);
    } finally {
      setFent(null);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 print:hidden">
      <button type="button" disabled={!!fent} onClick={() => fes("pdf")} className={`${btn} bg-slate-700 text-white hover:bg-slate-800 dark:hover:bg-slate-600`}>
        ⬇ {fent === "pdf" ? t.fent : t.pdf}
      </button>
      <button
        type="button"
        disabled={!!fent}
        onClick={() => fes("png")}
        className={`${btn} border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-white/10`}
      >
        🖼 {fent === "png" ? t.fent : t.png}
      </button>
      <button
        type="button"
        disabled={!!fent}
        onClick={() => fes("svg")}
        className={`${btn} border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-white/10`}
      >
        {t.svg}
      </button>
      {error && <span className="text-sm text-rose-700 dark:text-rose-300">{t.error}</span>}
    </div>
  );
}
