// Utilidades del panel del profesor: fichas de credenciales imprimibles,
// descarga de CSV y lectura de listas de alumnos pegadas.

import { RUTAS, type Credencial } from "@/lib/campus/cliente";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Abre una ventana con una ficha recortable por alumno (usuario + contraseña +
 * dirección de acceso) y lanza la impresión. Las contraseñas solo existen en
 * este momento: en la BD se guardan cifradas.
 */
export function imprimirCredenciales(creds: Credencial[], grupo: string) {
  const url = new URL(RUTAS.acceso, window.location.origin).href;
  const fichas = creds
    .map(
      (c) => `<div class="ficha">
  <div class="cab">Curso de Programación con IA · ${esc(grupo)}</div>
  <div class="nom">${esc(`${c.nombre} ${c.apellidos}`.trim())}</div>
  <div class="fila"><span>Entra en</span><b>${esc(url)}</b></div>
  <div class="fila"><span>Usuario</span><code>${esc(c.usuario)}</code></div>
  <div class="fila"><span>Contraseña</span><code>${esc(c.password)}</code></div>
  <div class="pie">Guárdala bien. Puedes cambiarla dentro, en «Mi cuenta».</div>
</div>`,
    )
    .join("\n");
  const w = window.open("", "_blank", "width=900,height=700");
  if (!w) {
    alert("El navegador ha bloqueado la ventana de impresión. Permite las ventanas emergentes para esta web.");
    return;
  }
  w.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Credenciales · ${esc(grupo)}</title>
<style>
  *{box-sizing:border-box} body{font:14px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0f172a;margin:0;padding:16px}
  .rejilla{display:grid;grid-template-columns:1fr 1fr;gap:0}
  .ficha{border:1.5px dashed #94a3b8;padding:14px 16px;break-inside:avoid;margin:-0.75px}
  .cab{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#475569;font-weight:700}
  .nom{font-size:17px;font-weight:800;margin:4px 0 8px}
  .fila{display:flex;gap:8px;align-items:baseline;margin:3px 0} .fila span{width:78px;flex:none;color:#475569;font-size:12px}
  .fila b{font-weight:600;font-size:12px;word-break:break-all} code{font:600 15px ui-monospace,SFMono-Regular,Menlo,monospace;background:#f1f5f9;padding:1px 6px;border-radius:4px}
  .pie{margin-top:8px;font-size:11px;color:#64748b}
  .barra{margin-bottom:12px;display:flex;gap:8px;align-items:center} @media print{.barra{display:none} body{padding:0}}
</style></head><body>
<div class="barra"><button onclick="print()">Imprimir</button><span>${creds.length} fichas · recórtalas por la línea discontinua</span></div>
<div class="rejilla">${fichas}</div>
<script>setTimeout(function(){print()},300)</script>
</body></html>`);
  w.document.close();
}

/** Texto plano para copiar (una línea por alumno). */
export function credencialesTexto(creds: Credencial[]): string {
  const url = new URL(RUTAS.acceso, window.location.origin).href;
  return [`Acceso: ${url}`, "", ...creds.map((c) => `${`${c.nombre} ${c.apellidos}`.trim()}\tusuario: ${c.usuario}\tcontraseña: ${c.password}`)].join("\n");
}

/** Descarga un CSV que Excel/LibreOffice en español abren bien (separador ;, BOM UTF-8). */
export function descargarCsv(nombre: string, filas: (string | number | null)[][]) {
  const celda = (v: string | number | null) => {
    const s = v === null ? "" : typeof v === "number" ? v.toLocaleString("es-ES", { maximumFractionDigits: 2 }) : v;
    return /[";\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = "﻿" + filas.map((f) => f.map(celda).join(";")).join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export type AlumnoNuevo = { nombre: string; apellidos: string; email: string };

/**
 * Lista de alumnos pegada (una persona por línea). Formatos:
 *  - «Apellidos, Nombre»            (como sale de ITACA)
 *  - «Nombre;Apellidos;correo» o separado por tabuladores (copiado de una hoja de cálculo)
 *  - «Nombre Apellido1 Apellido2»   (la primera palabra es el nombre)
 * El correo puede ir en cualquier posición de la línea.
 */
export function parsearLista(txt: string): AlumnoNuevo[] {
  const out: AlumnoNuevo[] = [];
  for (let linea of txt.split(/\r?\n/)) {
    linea = linea.trim();
    if (!linea) continue;
    if (/^nombre\b/i.test(linea) && /apellido/i.test(linea)) continue; // cabecera de hoja
    const m = linea.match(/[^\s;,\t<>()]+@[^\s;,\t<>()]+\.[a-z]{2,}/i);
    const email = m ? m[0].toLowerCase() : "";
    if (m) linea = linea.replace(m[0], "").replace(/[<>()]/g, "");
    let nombre = "";
    let apellidos = "";
    if (/[\t;]/.test(linea)) {
      const cols = linea.split(/[\t;]/).map((c) => c.trim()).filter(Boolean);
      [nombre = "", apellidos = ""] = cols;
    } else if (linea.includes(",")) {
      const [a, n] = linea.split(",", 2);
      apellidos = a.trim();
      nombre = (n || "").trim();
    } else {
      const pal = linea.split(/\s+/);
      nombre = pal.shift() || "";
      apellidos = pal.join(" ");
    }
    nombre = nombre.replace(/\s+/g, " ").trim();
    apellidos = apellidos.replace(/[,;]+$/, "").replace(/\s+/g, " ").trim();
    if (nombre) out.push({ nombre, apellidos, email });
  }
  return out;
}
