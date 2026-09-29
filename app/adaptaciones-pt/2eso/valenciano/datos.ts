// Dades del Tema 1 de Valencià · Adaptacions PT · 2n ESO.
// Un fichero por bloque en `bloques/`; aquí solo se agregan y se indexan por
// slug, igual que hace castellano con su `datos.ts`.
import type { Ap, Act } from "./tipos";
import { AP as AP0, ACTS as ACTS0 } from "./bloques/00-repas";
import { AP as AP1, ACTS as ACTS1 } from "./bloques/01-comunicacio";
import { AP as AP2, ACTS as ACTS2 } from "./bloques/02-diversitat";
import { AP as AP3, ACTS as ACTS3 } from "./bloques/03-classes-paraules";
import { AP as AP4, ACTS as ACTS4 } from "./bloques/04-sintagmes";
import { AP as AP5, ACTS as ACTS5 } from "./bloques/05-puntuacio";
import { AP as AP6, ACTS as ACTS6 } from "./bloques/06-ortografia-vocals";
import { AP as AP7, ACTS as ACTS7 } from "./bloques/07-vocals-contacte";

export type { Ap, Act, Nv } from "./tipos";
export { LABELS } from "./tipos";

export const APS: Ap[] = [AP0, AP1, AP2, AP3, AP4, AP5, AP6, AP7];

export const ACTS: Record<string, Act[]> = {
  [AP0.slug]: ACTS0,
  [AP1.slug]: ACTS1,
  [AP2.slug]: ACTS2,
  [AP3.slug]: ACTS3,
  [AP4.slug]: ACTS4,
  [AP5.slug]: ACTS5,
  [AP6.slug]: ACTS6,
  [AP7.slug]: ACTS7,
};

export const TEMA = "Tema 1 · Comunicació, llengua i ortografia";
