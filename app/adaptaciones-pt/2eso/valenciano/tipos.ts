// Contrato de datos del Tema 1 de Valencià · Adaptacions PT · 2n ESO.
// Estructura: bloc → teoria + exemples + activitats (1 caixa = 1 pàgina).
// Los textos admiten **negrita**, *cursiva* y `código`; en `teoria`, además,
// bloques «RAW:<table>…</table>» (HTML de confianza) y figuras «Fig:clave».

export type Nv = { in?: string; p: string[]; s: string[]; ad?: string; files?: Fila[] };
export type Act = { t: string; d: string; ic: string; fig?: string; nv: Nv[] };
export type Ap = { slug: string; n: number; t: string; teoria: string[]; ej: string[] };

// Fila d'exercici en format "plantilla": la paraula, un espai per a separar
// en síl·labes (opcional) i N caixes perquè l'alumne escriga la resposta.
export type Fila = { w: string; sep?: boolean; cx: number };

// Els cinc nivells, en ordre: l'exercici del curs (2n ESO) i les quatre
// adaptacions descendents que penjen d'ell.
export const LABELS = [
  "2n ESO · exercici base",
  "1r ESO · adaptació",
  "6è primària · adaptació",
  "5è primària · adaptació",
  "4t primària · adaptació",
];

// Claves de icono válidas para `ic` (ver figuras.tsx).
export const ICONOS = [
  "repaso", "chat", "megafono", "carta", "antena", "etiqueta", "paleta",
  "lupa", "puzzle", "arbol", "libro", "lira", "mascaras", "tilde", "palmas",
  "tarjetas", "oreja", "semaforo", "verdad", "lapiz",
] as const;

// Claves de figura válidas para `fig` y para «Fig:clave» en la teoría.
export const FIGURAS = [
  "circuit", "funcions", "paraules", "sintagmes", "puntuacio", "vocals",
  "vocals-contacte", "esquema-rondalles", "crucigrama-vocals",
] as const;
