// Diccionario de pictogramas ARASAAC (autor: Sergio Palao; propiedad del
// Gobierno de Aragón; licencia CC BY-NC-SA). Los PNG (500 px) se sirven desde
// public/pictos/arasaac/<id>.png para no depender del servidor de ARASAAC ni
// en la web ni al generar el PDF.
//
// `m` es el pictograma de la versión chico y `f`, si existe, el de la versión
// chica (mismo dibujo con una niña). Sin `f`, el pictograma es neutro y sirve
// para las dos. Para añadir uno: buscarlo en https://arasaac.org, descargar
// https://static.arasaac.org/pictograms/<id>/<id>_500.png a la carpeta de
// arriba y darlo de alta aquí.

export type Picto = { m: number; f?: number; alt: string };

export const PICTOS: Record<string, Picto> = {
  // Emociones (caras del mismo estilo)
  enfadado: { m: 31884, f: 31101, alt: "enfadado" },
  enfadadoBrazos: { m: 21820, alt: "enfadado con los brazos cruzados" },
  nervioso: { m: 38930, f: 38929, alt: "nervioso" },
  tranquilo: { m: 38932, f: 38931, alt: "tranquilo" },
  incomodo: { m: 32528, alt: "incómodo" },
  dificil: { m: 4629, alt: "difícil" },

  // Lugares y personas
  instituto: { m: 15515, alt: "instituto" },
  orientacion: { m: 34707, f: 4708, alt: "aula de orientación" },
  clase: { m: 36273, alt: "clase" },
  profesor: { m: 2457, alt: "profesor" },
  companeros: { m: 7062, alt: "compañeros" },
  personas: { m: 2255, alt: "las personas que están conmigo" },
  tranquilas: { m: 37828, alt: "sentirse tranquilo y seguro" },

  // Señales del cuerpo
  cuerpo: { m: 6473, alt: "cuerpo" },
  alarma: { m: 6891, alt: "aviso" },
  gritar: { m: 4686, f: 36137, alt: "hablar fuerte" },
  puno: { m: 16865, alt: "apretar la mano" },
  saltar: { m: 28447, f: 2804, alt: "moverse mucho" },
  solo: { m: 7253, f: 25776, alt: "estar solo" },

  // Pedir ayuda y calmarse
  descanso: { m: 31937, f: 28649, alt: "descanso" },
  pedirAyuda: { m: 16125, alt: "pedir ayuda" },
  decir: { m: 9692, f: 28663, alt: "decir" },
  acompanar: { m: 37485, alt: "acompañar" },
  sentarse: { m: 25082, f: 25081, alt: "sentarse" },
  respirar: { m: 34508, f: 34409, alt: "respirar" },
  beber: { m: 2276, f: 29716, alt: "beber agua" },
  calma: { m: 37858, alt: "material de calma" },
  esperar: { m: 28677, f: 8109, alt: "esperar" },
  volver: { m: 6248, alt: "volver" },
  solucion: { m: 32862, alt: "buscar una solución" },
  alejarse: { m: 32154, alt: "alejarse" },
  manos: { m: 9830, alt: "manos" },
  ordenar: { m: 6474, alt: "cada cosa en su sitio" },
  vestido: { m: 34737, f: 34735, alt: "con la ropa puesta" },
  hablar: { m: 3345, f: 36544, alt: "hablar" },
  aprender: { m: 8029, f: 37776, alt: "aprender" },
  bien: { m: 5397, alt: "bien" },

  // Conductas que no se permiten
  pegar: { m: 31793, alt: "pegar" },
  tirar: { m: 36381, alt: "tirar objetos" },
  romper: { m: 31752, f: 37773, alt: "romper" },
  insultar: { m: 8140, f: 8139, alt: "insultar" },
  quitarRopa: { m: 34021, f: 34022, alt: "quitarse la ropa" },
  hacerDano: { m: 20091, alt: "hacer daño" },
};

export function pictoId(clave: string, g: "o" | "a"): number {
  const p = PICTOS[clave];
  if (!p) throw new Error(`Pictograma desconocido: ${clave}`);
  return g === "a" && p.f ? p.f : p.m;
}

export const pictoSrc = (id: number) => `/pictos/arasaac/${id}.png`;

export const ATRIBUCION_ARASAAC =
  "Los símbolos pictográficos utilizados son propiedad del Gobierno de Aragón y han sido creados por Sergio Palao para ARASAAC (https://arasaac.org), que los distribuye bajo Licencia Creative Commons BY-NC-SA.";
