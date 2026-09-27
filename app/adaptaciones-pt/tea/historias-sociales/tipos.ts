// Contrato de datos de las historias sociales (Alumnado TEA · Adaptaciones PT).
//
// Una historia es una secuencia de escenas: una idea por página, en primera
// persona, con pictogramas ARASAAC. Los textos llevan marcas de género
// `{o|a}` («enfadad{o|a}») que se resuelven al elegir la versión chico/chica;
// los pictogramas se nombran por su clave en pictos.ts, que ya sabe qué dibujo
// usar en cada versión.

export type Genero = "o" | "a";

// Viñeta: una frase corta y 1–2 pictogramas (claves de pictos.ts).
export type Item = { t: string; p: string[] };

export type Escena =
  // Frase o frases con una fila de 1–3 pictogramas encima.
  | { k: "frase"; t: string[]; p: string[] }
  // Rejilla de viñetas (máx. 6). tono "si" = conducta esperada (marco verde y
  // ✓); tono "no" = prohibida (marco rojo y aspa sobre el pictograma).
  | { k: "lista"; t?: string; items: Item[]; tono?: "si" | "no" }
  // Quien habla (pictograma) y sus frases en bocadillos.
  | { k: "decir"; t: string; quien: string; frases: Item[] }
  // La tarjeta de descanso, dibujada tal cual se imprime en el anexo.
  | { k: "tarjeta"; t: string; tarjeta: number }
  // Cierre en dos mitades: lo que está bien (✓) y lo que no (✗).
  | { k: "cierre"; si: Item; no: Item };

// Tarjeta recortable (anexo del PDF): pictograma + rótulo + frase.
export type Tarjeta = { p: string; rotulo: string; frase: string };

export type Historia = {
  slug: string;
  titulo: string;
  tema: string;
  resumen: string;
  portada: string;
  escenas: Escena[];
  tarjetas: Tarjeta[];
};

// «enfadad{o|a}» → «enfadado» / «enfadada».
export function conGenero(s: string, g: Genero): string {
  return s.replace(/\{([^|{}]*)\|([^|{}]*)\}/g, (_, m: string, f: string) => (g === "a" ? f : m));
}
