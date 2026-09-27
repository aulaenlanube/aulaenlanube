// Maqueta de las hojas de una historia social. Cada página se describe UNA
// sola vez como lista de primitivas (rectángulos, pictogramas, texto, trazos)
// en puntos sobre un A4 apaisado; la web las pinta como SVG (hoja.tsx) y el
// PDF las escribe tal cual (pdf.ts). Así lo que se ve en pantalla es,
// milímetro a milímetro, lo que sale impreso.
//
// Coordenadas con origen arriba a la izquierda (como SVG); el PDF invierte la
// y al escribir. `y` de un texto = su línea base.

import { ancho, partir } from "./helvetica";
import { PICTOS, pictoId, ATRIBUCION_ARASAAC } from "./pictos";
import { conGenero, type Escena, type Genero, type Historia, type Item, type Tarjeta } from "./tipos";

export const W = 842;
export const H = 595;

export type El =
  | { k: "rect"; x: number; y: number; w: number; h: number; r?: number; fill?: string; stroke?: string; sw?: number; dash?: number[] }
  | { k: "circ"; cx: number; cy: number; r: number; fill?: string; stroke?: string; sw?: number }
  | { k: "img"; id: number; x: number; y: number; w: number; h: number }
  | { k: "text"; x: number; y: number; size: number; bold?: boolean; fill: string; t: string; anchor?: "start" | "middle" | "end" }
  // Trazo abierto (polilínea) con extremos y uniones redondeados.
  | { k: "line"; pts: number[]; stroke: string; sw: number; dash?: number[] }
  // Polígono cerrado.
  | { k: "poly"; pts: number[]; fill?: string; stroke?: string; sw?: number };

// `texto`: lo que dice la hoja, para el lector de pantalla y el buscador.
export type Hoja = { els: El[]; texto: string; pictos: string[] };

// Paleta sobria: papel blanco, tinta casi negra y un solo acento. En TEA, el
// color se reserva para lo que significa algo (verde = sí, rojo = no).
const C = {
  tinta: "#1f2937",
  suave: "#64748b",
  tenue: "#94a3b8",
  marco: "#cbd5e1",
  papelSuave: "#f8fafc",
  acento: "#1e40af",
  acentoFondo: "#eff6ff",
  acentoBorde: "#bfdbfe",
  si: "#16a34a",
  siTexto: "#166534",
  siFondo: "#f0fdf4",
  siBorde: "#86efac",
  no: "#dc2626",
  noTexto: "#991b1b",
  noFondo: "#fef2f2",
  noBorde: "#fca5a5",
};

const MARGEN = 40;
const PIE_Y = 574;

// ── Piezas ────────────────────────────────────────────────────────────────

class Lienzo {
  els: El[] = [];
  pictos: string[] = [];
  textos: string[] = [];
  constructor(public g: Genero) {}

  // Pictograma dentro de su marco blanco (el PNG se aplana sobre blanco en el
  // PDF, así que el marco hace que ese fondo sea intencionado).
  picto(clave: string, x: number, y: number, s: number, borde = C.marco) {
    this.els.push({ k: "rect", x, y, w: s, h: s, r: s * 0.08, fill: "#ffffff", stroke: borde, sw: 2 });
    const pad = s * 0.07;
    this.els.push({ k: "img", id: pictoId(clave, this.g), x: x + pad, y: y + pad, w: s - 2 * pad, h: s - 2 * pad });
    this.pictos.push(PICTOS[clave].alt);
  }

  // Aspa roja sobre la zona del dibujo (convención de «no» en los SAAC).
  aspa(x: number, y: number, w: number, h = w) {
    const i = Math.min(w, h) * 0.1;
    const sw = Math.max(5, Math.min(w, h) * 0.06);
    this.els.push({ k: "line", pts: [x + i, y + i, x + w - i, y + h - i], stroke: C.no, sw });
    this.els.push({ k: "line", pts: [x + w - i, y + i, x + i, y + h - i], stroke: C.no, sw });
  }

  // Insignia redonda verde con ✓.
  visto(cx: number, cy: number, r: number) {
    this.els.push({ k: "circ", cx, cy, r, fill: C.si });
    const u = r / 15;
    this.els.push({ k: "line", pts: [cx - 7 * u, cy + 0.5 * u, cx - 2 * u, cy + 5.5 * u, cx + 7.5 * u, cy - 5.5 * u], stroke: "#ffffff", sw: 3.6 * u });
  }

  texto(t: string, x: number, y: number, size: number, fill: string, anchor: "start" | "middle" | "end" = "middle", bold = false) {
    this.els.push({ k: "text", x, y, size, bold, fill, t, anchor });
  }

  // Párrafos centrados en `cx`, dentro de `maxW`, reduciendo el cuerpo si no
  // caben en `maxH`. Devuelve la altura que ocuparán y la función que los
  // dibuja a partir de un `top`, para poder centrar el conjunto antes.
  parrafos(ps: string[], cx: number, maxW: number, maxH: number, size0: number, fill = C.tinta, bold = false) {
    let size = size0;
    let lineas: string[][];
    let alto: number;
    for (;;) {
      lineas = ps.map((p) => partir(p, size, bold, maxW));
      const n = lineas.reduce((a, l) => a + l.length, 0);
      alto = n * size * 1.3 + (ps.length - 1) * size * 0.5;
      if (alto <= maxH || size <= 16) break;
      size -= 2;
    }
    const s = size;
    const pintar = (top: number) => {
      let y = top + s * 0.95;
      lineas.forEach((l, i) => {
        if (i) y += s * 0.5;
        for (const ln of l) {
          this.texto(ln, cx, y, s, fill, "middle", bold);
          y += s * 1.3;
        }
      });
    };
    return { alto, pintar, size: s };
  }

  pie(titulo: string, n: number, total: number) {
    this.texto(`${titulo} · Historia social`, MARGEN, PIE_Y, 9, C.tenue, "start");
    this.texto(`${n} / ${total}`, W - MARGEN, PIE_Y, 9, C.tenue, "end");
  }

  hoja(): Hoja {
    const texto = this.els
      .filter((e): e is Extract<El, { k: "text" }> => e.k === "text")
      .map((e) => e.t)
      .join(" ")
      .replace(/\s+/g, " ");
    return { els: this.els, texto, pictos: this.pictos };
  }
}

// Tarjeta de descanso / ayuda: la misma pieza en la escena y en el anexo.
function tarjeta(L: Lienzo, t: Tarjeta, x: number, y: number, w: number, h: number) {
  L.els.push({ k: "rect", x, y, w, h, r: h * 0.1, fill: C.acentoFondo, stroke: C.acento, sw: 4 });
  const s = h - h * 0.22;
  const pad = h * 0.11;
  L.picto(t.p, x + pad, y + pad, s, C.acentoBorde);
  const zx = x + pad + s + pad * 0.9;
  const zw = x + w - pad * 0.8 - zx;
  const cx = zx + zw / 2;
  let rs = Math.min(h * 0.2, 44);
  while (rs > 14 && ancho(t.rotulo, rs, true) > zw) rs -= 1;
  const fr = L.parrafos([t.frase], cx, zw, h * 0.34, Math.min(h * 0.1, 22), C.tinta);
  const bloque = rs + h * 0.07 + fr.alto;
  const top = y + (h - bloque) / 2;
  L.texto(t.rotulo, cx, top + rs * 0.8, rs, C.acento, "middle", true);
  fr.pintar(top + rs + h * 0.07);
}

// ── Escenas ───────────────────────────────────────────────────────────────

function frase(L: Lienzo, e: Extract<Escena, { k: "frase" }>) {
  const n = e.p.length;
  const S = n === 1 ? 285 : n === 2 ? 258 : 224;
  const gap = 28;
  const zona = { top: 34, bot: 552 };
  const hueco = 38;
  const tx = L.parrafos(e.t.map((t) => conGenero(t, L.g)), W / 2, 720, zona.bot - zona.top - S - hueco, 34);
  const alto = S + hueco + tx.alto;
  const top = zona.top + (zona.bot - zona.top - alto) / 2;
  const fila = n * S + (n - 1) * gap;
  e.p.forEach((c, i) => L.picto(c, (W - fila) / 2 + i * (S + gap), top, S));
  tx.pintar(top + S + hueco);
}

function lista(L: Lienzo, e: Extract<Escena, { k: "lista" }>) {
  const g = L.g;
  let top = 36;
  if (e.t) {
    const cab = L.parrafos([conGenero(e.t, g)], W / 2, 740, 90, 28);
    cab.pintar(top);
    top += cab.alto + 20;
  }
  const bot = 552;
  const n = e.items.length;
  const cols = n <= 3 ? n : n === 4 ? 2 : 3;
  const filas = Math.ceil(n / cols);
  const gap = 20;
  const CW = Math.min(250, (W - 2 * MARGEN - gap * (cols - 1)) / cols);
  const disp = bot - top;
  const CH = Math.min(filas === 1 ? 340 : 999, (disp - gap * (filas - 1)) / filas);

  // Rótulos: mismo cuerpo en todas las viñetas; el número de líneas manda en
  // el tamaño del pictograma, así que se iguala al de la viñeta más larga.
  let ls = 16;
  let rot: string[][];
  for (;;) {
    rot = e.items.map((it) => partir(conGenero(it.t, g), ls, true, CW - 22));
    if (Math.max(...rot.map((r) => r.length)) <= 2 || ls <= 13) break;
    ls--;
  }
  const lineas = Math.max(...rot.map((r) => r.length));
  const LH = lineas * ls * 1.2 + 14;
  const P = Math.min(CW - 24, CH - LH - 18);

  const tono = e.tono;
  const fondo = tono === "si" ? C.siFondo : tono === "no" ? C.noFondo : C.papelSuave;
  const borde = tono === "si" ? C.siBorde : tono === "no" ? C.noBorde : C.marco;
  const tinta = tono === "si" ? C.siTexto : tono === "no" ? C.noTexto : C.tinta;

  const altoRejilla = filas * CH + (filas - 1) * gap;
  const y0 = top + (disp - altoRejilla) / 2;
  e.items.forEach((it, i) => {
    const fila = Math.floor(i / cols);
    const enFila = Math.min(cols, n - fila * cols);
    const col = i - fila * cols;
    const x0 = (W - (enFila * CW + (enFila - 1) * gap)) / 2;
    const x = x0 + col * (CW + gap);
    const y = y0 + fila * (CH + gap);
    L.els.push({ k: "rect", x, y, w: CW, h: CH, r: 18, fill: fondo, stroke: borde, sw: 2.5 });
    // Zona del dibujo: 1 pictograma grande o 2 más pequeños uno al lado del otro.
    const zy = y + 10;
    const zh = CH - LH - 10;
    if (it.p.length === 1) {
      const px = x + (CW - P) / 2;
      const py = zy + (zh - P) / 2;
      L.picto(it.p[0], px, py, P);
      if (tono === "no") L.aspa(px, py, P);
    } else {
      const s2 = Math.min(P, (CW - 24 - 8) / 2);
      const px = x + (CW - (2 * s2 + 8)) / 2;
      const py = zy + (zh - s2) / 2;
      it.p.slice(0, 2).forEach((c, j) => L.picto(c, px + j * (s2 + 8), py, s2));
      // Se tacha la acción (primer pictograma), no a quien la recibe:
      // «pegar» está prohibido; los compañeros, no.
      if (tono === "no") L.aspa(px, py, s2);
    }
    if (tono === "si") L.visto(x + CW - 20, y + 20, 15);
    // Rótulo centrado en su franja inferior.
    const r = rot[i];
    const franja = y + CH - LH;
    const off = ((lineas - r.length) * ls * 1.2) / 2;
    r.forEach((ln, j) => L.texto(ln, x + CW / 2, franja + off + ls + j * ls * 1.2, ls, tinta, "middle", true));
  });
}

function decir(L: Lienzo, e: Extract<Escena, { k: "decir" }>) {
  const cab = L.parrafos([conGenero(e.t, L.g)], W / 2, 740, 60, 30);
  cab.pintar(36);
  const top = 36 + cab.alto + 26;
  const bot = 552;
  const S = 190;
  const sx = 56;
  const sy = top + (bot - top - S) / 2;
  L.picto(e.quien, sx, sy, S);
  const boca = { x: sx + S, y: sy + S * 0.42 };

  const bx = 330;
  const bw = W - MARGEN - 8 - bx;
  const n = e.frases.length;
  const gap = 34;
  const bh = Math.min(190, (bot - top - gap * (n - 1)) / n);
  const altoTotal = n * bh + (n - 1) * gap;
  const by0 = top + (bot - top - altoTotal) / 2;
  e.frases.forEach((f, i) => {
    const by = by0 + i * (bh + gap);
    L.els.push({ k: "rect", x: bx, y: by, w: bw, h: bh, r: 42, fill: "#ffffff", stroke: C.acento, sw: 3 });
    // Rabo del bocadillo hacia quien habla: relleno blanco que tapa el borde
    // del bocadillo y trazo abierto encima (sin línea en la base del rabo).
    const t1 = by + bh * 0.36;
    const t2 = by + bh * 0.64;
    const tip = { x: boca.x + 18, y: boca.y };
    const baseX = bx + 10;
    const k = 10 / (baseX - tip.x);
    const c1 = { x: bx, y: t1 + (tip.y - t1) * k };
    const c2 = { x: bx, y: t2 + (tip.y - t2) * k };
    L.els.push({ k: "poly", pts: [baseX, t1, tip.x, tip.y, baseX, t2], fill: "#ffffff" });
    L.els.push({ k: "line", pts: [c1.x, c1.y, tip.x, tip.y, c2.x, c2.y], stroke: C.acento, sw: 3 });
    const ps = bh - 40;
    L.picto(f.p[0], bx + 24, by + 20, ps);
    const zx = bx + 24 + ps + 20;
    const zw = bx + bw - 24 - zx;
    const tx = L.parrafos([conGenero(f.t, L.g)], zx + zw / 2, zw, bh - 30, 32, C.acento, true);
    tx.pintar(by + (bh - tx.alto) / 2);
  });
}

function escenaTarjeta(L: Lienzo, e: Extract<Escena, { k: "tarjeta" }>, h: Historia) {
  const tx = L.parrafos([conGenero(e.t, L.g)], W / 2, 700, 100, 32);
  const tw = 520;
  const th = 290;
  const hueco = 44;
  const alto = tx.alto + hueco + th;
  const top = 34 + (552 - 34 - alto) / 2;
  tx.pintar(top);
  tarjeta(L, h.tarjetas[e.tarjeta], (W - tw) / 2, top + tx.alto + hueco, tw, th);
}

function cierre(L: Lienzo, e: Extract<Escena, { k: "cierre" }>) {
  const pw = 362;
  const ph = 452;
  const gap = 38;
  const py = 50;
  const lados: { it: Item; x: number; si: boolean }[] = [
    { it: e.si, x: (W - 2 * pw - gap) / 2, si: true },
    { it: e.no, x: (W - 2 * pw - gap) / 2 + pw + gap, si: false },
  ];
  for (const { it, x, si } of lados) {
    L.els.push({ k: "rect", x, y: py, w: pw, h: ph, r: 24, fill: si ? C.siFondo : C.noFondo, stroke: si ? C.siBorde : C.noBorde, sw: 3 });
    const n = it.p.length;
    const S = n === 1 ? 200 : 148;
    const g2 = 14;
    const fila = n * S + (n - 1) * g2;
    const sy = py + 48;
    it.p.forEach((c, i) => L.picto(c, x + (pw - fila) / 2 + i * (S + g2), sy + (200 - S) / 2, S));
    if (!si) L.aspa(x + (pw - fila) / 2, sy + (200 - S) / 2, S);
    else L.visto(x + pw - 30, py + 30, 20);
    const tx = L.parrafos([conGenero(it.t, L.g)], x + pw / 2, pw - 50, ph - 290, 32, si ? C.siTexto : C.noTexto, true);
    tx.pintar(sy + 200 + 30 + (ph - 290 - tx.alto) / 2);
  }
}

function portada(L: Lienzo, h: Historia) {
  const chip = "HISTORIA SOCIAL";
  const cw = ancho(chip, 13, true) + 30;
  L.els.push({ k: "rect", x: (W - cw) / 2, y: 44, w: cw, h: 26, r: 13, fill: C.acentoFondo, stroke: C.acentoBorde, sw: 1.5 });
  L.texto(chip, W / 2, 61.5, 13, C.acento, "middle", true);
  let ts = 56;
  while (ts > 30 && ancho(h.titulo, ts, true) > W - 2 * MARGEN) ts -= 2;
  L.texto(h.titulo, W / 2, 134, ts, C.tinta, "middle", true);
  L.picto(h.portada, (W - 262) / 2, 162, 262);
  // Hueco para el nombre: la historia es del alumno, que la personaliza.
  const et = "Me llamo:";
  const gw = 460;
  const gx = (W - gw) / 2;
  L.texto(et, gx, 474, 22, C.tinta, "start");
  L.els.push({ k: "line", pts: [gx + ancho(et, 22) + 12, 476, gx + gw, 476], stroke: C.tenue, sw: 1.5 });
  atribucion(L, 536);
}

function atribucion(L: Lienzo, y: number) {
  partir(ATRIBUCION_ARASAAC, 8, false, 640).forEach((ln, i) => L.texto(ln, W / 2, y + i * 11, 8, C.suave));
}

function anexoTarjetas(L: Lienzo, h: Historia) {
  L.texto("Tarjetas para recortar", MARGEN, 52, 22, C.tinta, "start", true);
  L.texto("Recorta por la línea de puntos. Si las plastificas, duran todo el curso.", MARGEN, 72, 11, C.suave, "start");
  const cw = 370;
  const ch = 212;
  const gap = 20;
  const x0 = (W - 2 * cw - gap) / 2;
  const y0 = 92;
  // Dos copias de cada tarjeta: una para el aula y otra para llevar encima.
  const lista = h.tarjetas.flatMap((t) => [t, t]).slice(0, 4);
  lista.forEach((t, i) => {
    const x = x0 + (i % 2) * (cw + gap);
    const y = y0 + Math.floor(i / 2) * (ch + gap);
    L.els.push({ k: "rect", x, y, w: cw, h: ch, stroke: C.tenue, sw: 1, dash: [6, 5] });
    tarjeta(L, t, x + 12, y + 12, cw - 24, ch - 24);
  });
  atribucion(L, 556);
}

// ── Historia completa ─────────────────────────────────────────────────────

export function maquetar(h: Historia, g: Genero, conTarjetas: boolean): Hoja[] {
  const total = h.escenas.length + 1;
  const hojas: Hoja[] = [];
  const P = new Lienzo(g);
  portada(P, h);
  hojas.push(P.hoja());
  h.escenas.forEach((e, i) => {
    const L = new Lienzo(g);
    if (e.k === "frase") frase(L, e);
    else if (e.k === "lista") lista(L, e);
    else if (e.k === "decir") decir(L, e);
    else if (e.k === "tarjeta") escenaTarjeta(L, e, h);
    else cierre(L, e);
    L.pie(h.titulo, i + 2, total);
    hojas.push(L.hoja());
  });
  if (conTarjetas && h.tarjetas.length) {
    const L = new Lienzo(g);
    anexoTarjetas(L, h);
    hojas.push(L.hoja());
  }
  return hojas;
}
