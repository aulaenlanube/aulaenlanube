// De cada nombre de escena (pasos.ts) a su fábrica. Cada grupo es un import()
// aparte: una página solo descarga los grupos de las escenas que enseña (y
// Rapier, solo si hay alguna de físicas).

import type { Fabrica } from "../motor";
import type { NombreEscena } from "../pasos";

const GRUPO: Record<NombreEscena, () => Promise<Record<string, Fabrica>>> = {
  ejes: () => import("./espacio"),
  transformaciones: () => import("./espacio"),
  grafo: () => import("./espacio"),
  malla: () => import("./objetos"),
  detalle: () => import("./objetos"),
  materiales: () => import("./objetos"),
  texturas: () => import("./objetos"),
  luces: () => import("./luz"),
  camara: () => import("./luz"),
  seguimiento: () => import("./luz"),
  lod: () => import("./rendimiento"),
  instancias: () => import("./rendimiento"),
  esqueleto: () => import("./animacion"),
  clips: () => import("./animacion"),
  cuerpos: () => import("./fisicas"),
  colliders: () => import("./fisicas"),
  capsula: () => import("./fisicas"),
  rebote: () => import("./fisicas"),
  sensor: () => import("./fisicas"),
  red: () => import("./red"),
};

export async function cargarEscena(nombre: NombreEscena): Promise<Fabrica> {
  const modulo = await GRUPO[nombre]();
  return modulo[nombre];
}
