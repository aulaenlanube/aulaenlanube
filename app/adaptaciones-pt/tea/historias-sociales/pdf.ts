// Generador del PDF de una historia social, en el navegador y sin librerías:
// escribe a mano un PDF 1.4 con las hojas de la maqueta (las mismas primitivas
// que pinta la web). Texto vectorial en Helvetica (WinAnsi) y pictogramas
// incrustados sin pérdida: los PNG de ARASAAC son indexados, así que su IDAT
// entra tal cual como FlateDecode con predictor PNG, y la transparencia se
// resuelve componiendo la paleta sobre blanco (exacto en una imagen indexada).
// Cualquier otro PNG cae a JPEG vía canvas.

import { W, H, type El, type Hoja } from "./maqueta";
import { ancho } from "./helvetica";
import { pictoSrc } from "./pictos";

type Imagen = { w: number; h: number; dict: string; datos: Uint8Array };

// ── Pictogramas ───────────────────────────────────────────────────────────

const u32 = (b: Uint8Array, i: number) => ((b[i] << 24) | (b[i + 1] << 16) | (b[i + 2] << 8) | b[i + 3]) >>> 0;

function pngIndexado(b: Uint8Array): Imagen | null {
  const firma = [137, 80, 78, 71, 13, 10, 26, 10];
  if (!firma.every((v, i) => b[i] === v)) return null;
  let i = 8;
  let w = 0, h = 0, prof = 0, tipo = 0, entrelazado = 0;
  let plte: Uint8Array | null = null;
  let trns: Uint8Array | null = null;
  const idat: Uint8Array[] = [];
  while (i < b.length) {
    const n = u32(b, i);
    const t = String.fromCharCode(b[i + 4], b[i + 5], b[i + 6], b[i + 7]);
    const d = b.subarray(i + 8, i + 8 + n);
    if (t === "IHDR") {
      w = u32(d, 0); h = u32(d, 4); prof = d[8]; tipo = d[9]; entrelazado = d[12];
    } else if (t === "PLTE") plte = d;
    else if (t === "tRNS") trns = d;
    else if (t === "IDAT") idat.push(d);
    else if (t === "IEND") break;
    i += 12 + n;
  }
  if (tipo !== 3 || entrelazado !== 0 || !plte || !idat.length) return null;
  const nCol = plte.length / 3;
  let hex = "";
  for (let k = 0; k < nCol; k++) {
    const a = (trns && k < trns.length ? trns[k] : 255) / 255;
    for (let c = 0; c < 3; c++) {
      const v = Math.round(plte[k * 3 + c] * a + 255 * (1 - a));
      hex += v.toString(16).padStart(2, "0");
    }
  }
  const datos = new Uint8Array(idat.reduce((a, x) => a + x.length, 0));
  let o = 0;
  for (const x of idat) { datos.set(x, o); o += x.length; }
  const dict =
    `/Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace [/Indexed /DeviceRGB ${nCol - 1} <${hex}>]` +
    ` /BitsPerComponent ${prof} /Filter /FlateDecode /DecodeParms << /Predictor 15 /Colors 1 /BitsPerComponent ${prof} /Columns ${w} >>`;
  return { w, h, dict, datos };
}

async function jpegPorCanvas(url: string): Promise<Imagen> {
  const img = new Image();
  img.src = url;
  await img.decode();
  const w = img.naturalWidth, h = img.naturalHeight;
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = h;
  const ctx = cv.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0);
  const blob: Blob = await new Promise((ok, ko) => cv.toBlob((x) => (x ? ok(x) : ko(new Error("canvas"))), "image/jpeg", 0.92));
  const datos = new Uint8Array(await blob.arrayBuffer());
  return { w, h, dict: `/Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode`, datos };
}

async function cargarImagen(id: number): Promise<Imagen> {
  const url = pictoSrc(id);
  const r = await fetch(url);
  if (!r.ok) throw new Error(`No se pudo cargar el pictograma ${id}`);
  return pngIndexado(new Uint8Array(await r.arrayBuffer())) ?? (await jpegPorCanvas(url));
}

// ── Escritura ─────────────────────────────────────────────────────────────

const f = (n: number) => (Math.round(n * 100) / 100).toString();

function rgb(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => (v / 255).toFixed(3)).join(" ");
}

// Cadena literal en WinAnsiEncoding (Latin-1 + los símbolos tipográficos de
// cp1252); todo lo que pasa de 126 va en octal, así el flujo es ASCII puro.
const CP1252: Record<number, number> = {
  0x20ac: 0x80, 0x201a: 0x82, 0x2026: 0x85, 0x2018: 0x91, 0x2019: 0x92,
  0x201c: 0x93, 0x201d: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97,
};
function lit(s: string): string {
  let out = "(";
  for (const ch of s) {
    let c = ch.codePointAt(0)!;
    if (c > 255) c = CP1252[c] ?? 63;
    if (c === 40 || c === 41 || c === 92) out += "\\" + ch;
    else if (c < 32 || c > 126) out += "\\" + c.toString(8).padStart(3, "0");
    else out += ch;
  }
  return out + ")";
}

// Origen arriba (maqueta) → origen abajo (PDF).
const Y = (y: number) => H - y;

function rectRedondo(x: number, y: number, w: number, h: number, r: number): string {
  const k = 0.5523 * r;
  const t = Y(y), b = Y(y + h);
  return [
    `${f(x + r)} ${f(t)} m`,
    `${f(x + w - r)} ${f(t)} l`,
    `${f(x + w - r + k)} ${f(t)} ${f(x + w)} ${f(t - r + k)} ${f(x + w)} ${f(t - r)} c`,
    `${f(x + w)} ${f(b + r)} l`,
    `${f(x + w)} ${f(b + r - k)} ${f(x + w - r + k)} ${f(b)} ${f(x + w - r)} ${f(b)} c`,
    `${f(x + r)} ${f(b)} l`,
    `${f(x + r - k)} ${f(b)} ${f(x)} ${f(b + r - k)} ${f(x)} ${f(b + r)} c`,
    `${f(x)} ${f(t - r)} l`,
    `${f(x)} ${f(t - r + k)} ${f(x + r - k)} ${f(t)} ${f(x + r)} ${f(t)} c`,
    "h",
  ].join("\n");
}

function circulo(cx: number, cy: number, r: number): string {
  const k = 0.5523 * r;
  const y = Y(cy);
  return [
    `${f(cx + r)} ${f(y)} m`,
    `${f(cx + r)} ${f(y + k)} ${f(cx + k)} ${f(y + r)} ${f(cx)} ${f(y + r)} c`,
    `${f(cx - k)} ${f(y + r)} ${f(cx - r)} ${f(y + k)} ${f(cx - r)} ${f(y)} c`,
    `${f(cx - r)} ${f(y - k)} ${f(cx - k)} ${f(y - r)} ${f(cx)} ${f(y - r)} c`,
    `${f(cx + k)} ${f(y - r)} ${f(cx + r)} ${f(y - k)} ${f(cx + r)} ${f(y)} c`,
    "h",
  ].join("\n");
}

function estilo(fill?: string, stroke?: string, sw?: number, dash?: number[]): { pre: string; op: string } | null {
  if (!fill && !stroke) return null;
  let pre = "";
  if (fill) pre += `${rgb(fill)} rg\n`;
  if (stroke) pre += `${rgb(stroke)} RG\n${f(sw ?? 1)} w\n`;
  if (dash) pre += `[${dash.join(" ")}] 0 d\n`;
  return { pre, op: fill && stroke ? "B" : fill ? "f" : "S" };
}

function flujo(els: El[]): string {
  let s = "1 J\n1 j\n";
  for (const e of els) {
    if (e.k === "rect") {
      const st = estilo(e.fill, e.stroke, e.sw, e.dash);
      if (!st) continue;
      const path = e.r ? rectRedondo(e.x, e.y, e.w, e.h, e.r) : `${f(e.x)} ${f(Y(e.y + e.h))} ${f(e.w)} ${f(e.h)} re`;
      s += `q\n${st.pre}${path}\n${st.op}\nQ\n`;
    } else if (e.k === "circ") {
      const st = estilo(e.fill, e.stroke, e.sw);
      if (!st) continue;
      s += `q\n${st.pre}${circulo(e.cx, e.cy, e.r)}\n${st.op}\nQ\n`;
    } else if (e.k === "img") {
      s += `q\n${f(e.w)} 0 0 ${f(e.h)} ${f(e.x)} ${f(Y(e.y + e.h))} cm\n/I${e.id} Do\nQ\n`;
    } else if (e.k === "text") {
      const w = ancho(e.t, e.size, e.bold);
      const x = e.anchor === "middle" ? e.x - w / 2 : e.anchor === "end" ? e.x - w : e.x;
      s += `q\n${rgb(e.fill)} rg\nBT\n/${e.bold ? "F2" : "F1"} ${f(e.size)} Tf\n${f(x)} ${f(Y(e.y))} Td\n${lit(e.t)} Tj\nET\nQ\n`;
    } else if (e.k === "line" || e.k === "poly") {
      const st = e.k === "line" ? estilo(undefined, e.stroke, e.sw, e.dash) : estilo(e.fill, e.stroke, e.sw);
      if (!st) continue;
      let path = "";
      for (let i = 0; i < e.pts.length; i += 2) path += `${f(e.pts[i])} ${f(Y(e.pts[i + 1]))} ${i ? "l" : "m"}\n`;
      if (e.k === "poly") path += "h\n";
      s += `q\n${st.pre}${path}${st.op}\nQ\n`;
    }
  }
  return s;
}

export async function generarPdf(hojas: Hoja[], meta: { titulo: string; asunto: string }): Promise<Blob> {
  const ids = [...new Set(hojas.flatMap((h) => h.els.filter((e) => e.k === "img").map((e) => (e as { id: number }).id)))];
  const imgs = await Promise.all(ids.map(cargarImagen));

  type Obj = string | { cab: string; bin: Uint8Array; col: string };
  const objs: Obj[] = [];
  const nuevo = (o: Obj) => objs.push(o);
  // 1 catálogo · 2 árbol de páginas · 3–4 fuentes · 5 información
  nuevo("<< /Type /Catalog /Pages 2 0 R /PageLayout /SinglePage >>");
  nuevo(""); // árbol de páginas: se rellena al final, cuando se conocen los hijos
  nuevo("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
  nuevo("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
  nuevo(`<< /Title ${lit(meta.titulo)} /Subject ${lit(meta.asunto)} /Author (aulaenlanube.com) /Creator (Aula en la Nube - Adaptaciones PT) >>`);

  const numImg: Record<number, number> = {};
  imgs.forEach((im, k) => {
    nuevo({ cab: `<< ${im.dict} /Length ${im.datos.length} >>\nstream\n`, bin: im.datos, col: "\nendstream" });
    numImg[ids[k]] = objs.length;
  });

  const paginas: number[] = [];
  for (const h of hojas) {
    const c = flujo(h.els);
    nuevo(`<< /Length ${c.length} >>\nstream\n${c}endstream`);
    const nc = objs.length;
    const usadas = [...new Set(h.els.filter((e) => e.k === "img").map((e) => (e as { id: number }).id))];
    const xo = usadas.length ? ` /XObject << ${usadas.map((id) => `/I${id} ${numImg[id]} 0 R`).join(" ")} >>` : "";
    nuevo(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Contents ${nc} 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >>${xo} >> >>`);
    paginas.push(objs.length);
  }
  objs[1] = `<< /Type /Pages /Kids [${paginas.map((n) => `${n} 0 R`).join(" ")}] /Count ${paginas.length} >>`;

  // Ensamblado con desplazamientos en bytes (todo lo textual es ASCII).
  const partes: (string | Uint8Array)[] = [];
  const offs: number[] = [];
  let pos = 0;
  const txt = (s: string) => { partes.push(s); pos += s.length; };
  txt("%PDF-1.4\n");
  // Comentario con 4 bytes > 127: avisa a los programas de que el fichero es
  // binario. Va como bytes, no como texto (el Blob lo codificaría en UTF-8).
  partes.push(new Uint8Array([37, 226, 227, 207, 211, 10]));
  pos += 6;
  objs.forEach((o, k) => {
    offs.push(pos);
    if (typeof o === "string") txt(`${k + 1} 0 obj\n${o}\nendobj\n`);
    else {
      txt(`${k + 1} 0 obj\n${o.cab}`);
      partes.push(o.bin);
      pos += o.bin.length;
      txt(`${o.col}\nendobj\n`);
    }
  });
  const xref = pos;
  txt(`xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${offs.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("")}`);
  txt(`trailer\n<< /Size ${objs.length + 1} /Root 1 0 R /Info 5 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  return new Blob(partes as BlobPart[], { type: "application/pdf" });
}

export function descargar(blob: Blob, nombre: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
