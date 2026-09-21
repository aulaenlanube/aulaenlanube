// Contrato de datos del Tema 1 de Lengua Castellana · Adaptaciones PT · 2.º ESO.
// Estructura: bloque → teoría + ejemplos + actividades (1 caja = 1 página).
// Los textos admiten **negrita**, *cursiva* y `código`; en `teoria`, además,
// bloques «RAW:<table>…</table>» (HTML de confianza) y figuras «Fig:clave».

export type Nv = { in?: string; p: string[]; s: string[]; ad?: string };
export type Act = { t: string; d: string; ic: string; fig?: string; nv: Nv[] };
export type Ap = { slug: string; n: number; t: string; teoria: string[]; ej: string[] };

// Los cuatro niveles, en orden: referencia + tres adaptaciones descendentes.
export const LABELS = [
  "1.º ESO · nivel de referencia",
  "6.º primaria · adaptación",
  "5.º primaria · adaptación",
  "4.º primaria · adaptación",
];

// Claves de icono válidas para `ic` (ver figuras.tsx).
export const ICONOS = [
  "repaso", "chat", "megafono", "carta", "antena", "etiqueta", "paleta",
  "lupa", "puzzle", "arbol", "libro", "lira", "mascaras", "tilde", "palmas",
  "tarjetas", "oreja", "semaforo", "verdad", "lapiz",
] as const;

// Claves de figura válidas para `fig` y para «Fig:clave» en la teoría.
export const FIGURAS = [
  "circuito", "sintagma", "derivacion", "generos", "acentos", "silabas",
] as const;
