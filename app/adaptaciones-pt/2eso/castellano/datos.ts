// Datos del Tema 1 de Lengua Castellana · Adaptaciones PT · 2.º ESO.
// Un fichero por bloque en `bloques/`; aquí solo se agregan y se indexan por
// slug, igual que hace matemáticas con su `datos.ts`.
import type { Ap, Act } from "./tipos";
import { AP as AP0, ACTS as ACTS0 } from "./bloques/00-repaso";
import { AP as AP1, ACTS as ACTS1 } from "./bloques/01-comunicacion";
import { AP as AP2, ACTS as ACTS2 } from "./bloques/02-sustantivo-adjetivo";
import { AP as AP3, ACTS as ACTS3 } from "./bloques/03-derivacion";
import { AP as AP4, ACTS as ACTS4 } from "./bloques/04-generos-literarios";
import { AP as AP5, ACTS as ACTS5 } from "./bloques/05-acentuacion";

export type { Ap, Act, Nv } from "./tipos";
export { LABELS } from "./tipos";

export const APS: Ap[] = [AP0, AP1, AP2, AP3, AP4, AP5];

export const ACTS: Record<string, Act[]> = {
  [AP0.slug]: ACTS0,
  [AP1.slug]: ACTS1,
  [AP2.slug]: ACTS2,
  [AP3.slug]: ACTS3,
  [AP4.slug]: ACTS4,
  [AP5.slug]: ACTS5,
};

export const TEMA = "Tema 1 · Comunicación, palabra y literatura";
