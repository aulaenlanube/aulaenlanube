import type { Tono } from "./_tonos";

// ════════════════════════════════════════════════════════════════════════════
// Índice de la ponencia. Es la única fuente de la verdad para el orden, los
// títulos y las rutas: la portada pinta las tarjetas desde aquí y cada bloque
// saca de aquí su navegación de pie, así que reordenar la sesión es tocar
// solo este fichero.
//
// Las rutas 01-, 02-, 03- y 04- son las de la primera versión de la ponencia y
// se mantienen porque ya están publicadas y compartidas; los dos bloques
// nuevos usan ruta descriptiva. El número de bloque manda sobre el de la ruta.
// ════════════════════════════════════════════════════════════════════════════

export type Bloque = {
  n: number;
  tono: Tono;
  /** Minutos de sala: el reloj de la portada reparte la barra con esto. */
  min: number;
  titulo: string;
  /** Título abreviado para la navegación de pie. */
  corto: string;
  /** Una línea para la leyenda del reloj (máx. ~72 caracteres). */
  breve: string;
  resumen: string;
  ruta: string;
};

export const BLOQUES: Bloque[] = [
  {
    n: 1,
    min: 20,
    tono: "azul",
    titulo: "Prompts que rinden",
    corto: "Prompts que rinden",
    breve:
      "La anatomía de un prompt, el metaprompt y las cadenas.",
    resumen:
      "La anatomía de los seis bloques de un prompt, el metaprompt (pedirle el encargo en vez de la respuesta) y las cadenas de prompts con las que se construye una aplicación entera.",
    ruta: "/ponencia-tecnologia/01-introduccion/",
  },
  {
    n: 2,
    min: 20,
    tono: "morado",
    titulo: "Copilot: el kit que ya tienes",
    corto: "Copilot",
    breve:
      "Qué es cada Copilot, cuál abrir y qué no meter nunca en el chat.",
    resumen:
      "Seis herramientas distintas se llaman «Copilot». Cuál cuelga de la cuenta del centro, cuál de la tuya de GitHub, cuál abrir para cada encargo y qué no se mete nunca en un chat.",
    ruta: "/ponencia-tecnologia/02-herramientas-gratuitas/",
  },
  {
    n: 3,
    min: 20,
    tono: "verde",
    titulo: "Los 71 temas con IA",
    corto: "Los 71 temas",
    breve:
      "Esqueleto, redacción, verificación y simulador de tribunal.",
    resumen:
      "La ruta completa de un tema: esqueleto, tu lectura, tu redacción, la verificación normativa y el simulador de tribunal. Con la trampa de la referencia inventada y cómo esquivarla.",
    ruta: "/ponencia-tecnologia/temario-con-ia/",
  },
  {
    n: 4,
    min: 20,
    tono: "rosa",
    titulo: "Materiales que entran por los ojos",
    corto: "Materiales",
    breve:
      "Láminas, presentaciones y esquemas con las siete piezas del prompt.",
    resumen:
      "Láminas de aula, presentaciones y esquemas: las siete piezas que tiene que llevar el prompt de una imagen, y cómo pasar de un guion a una presentación defendible.",
    ruta: "/ponencia-tecnologia/materiales-visuales/",
  },
  {
    n: 5,
    min: 30,
    tono: "ambar",
    titulo: "El laboratorio: dos aplicaciones",
    corto: "El laboratorio",
    breve:
      "Programación agéntica: de un prompt a una app que funciona.",
    resumen:
      "Programación agéntica en directo. Las dos aplicaciones de Tecnología —4.º de ESO y 1.º de Bachillerato— con el prompt exacto que las generó, y cómo publicar la tuya en internet.",
    ruta: "/ponencia-tecnologia/03-laboratorio/",
  },
  {
    n: 6,
    min: 10,
    tono: "gris",
    titulo: "Delante del tribunal",
    corto: "El tribunal",
    breve:
      "Cómo se defiende todo esto y qué te llevas escrito.",
    resumen:
      "Cómo se defiende una práctica hecha con un agente, la regla «si te cambian una línea, respondes», el marco normativo verificado y la lista de control del día del examen.",
    ruta: "/ponencia-tecnologia/04-evaluacion/",
  },
];

/** Navegación de pie de un bloque: el anterior y el siguiente. */
export function vecinos(n: number) {
  const i = BLOQUES.findIndex((b) => b.n === n);
  const atras =
    i > 0
      ? { titulo: `${BLOQUES[i - 1].n} · ${BLOQUES[i - 1].corto}`, ruta: BLOQUES[i - 1].ruta }
      : { titulo: "Portada de la ponencia", ruta: "/ponencia-tecnologia/" };
  const adelante =
    i < BLOQUES.length - 1
      ? { titulo: `${BLOQUES[i + 1].n} · ${BLOQUES[i + 1].corto}`, ruta: BLOQUES[i + 1].ruta }
      : { titulo: "Portada de la ponencia", ruta: "/ponencia-tecnologia/" };
  return { atras, adelante };
}

export const RECURSOS: { t: string; d: string; u: string }[] = [
  {
    t: "Cadenas de prompts",
    d: "Cuatro aplicaciones educativas con la conversación entera que las creó, prompt a prompt. Es el bloque 1 y el bloque 5 en formato consultable.",
    u: "https://aulaenlanube.com/cadenas-de-prompts/",
  },
  {
    t: "Galería de infografías",
    d: "En la misma página, pestaña «Infografías»: diecisiete láminas de aula con el prompt exacto de cada una. Cámbiale el tema y tienes la tuya — es el atajo del bloque 4.",
    u: "https://aulaenlanube.com/cadenas-de-prompts/",
  },
  {
    t: "YouTube · IA para docentes",
    d: "Canal dedicado a IA aplicada al aula: la herramienta, el método y las clases donde se ve funcionando de verdad.",
    u: "https://www.youtube.com/@ia-para-docentes",
  },
  {
    t: "YouTube · Aula en la nube",
    d: "Más de 800 vídeos gratuitos de programación, GIMP, OBS, Google y ofimática. Si hay una herramienta que no dominas, empieza aquí.",
    u: "https://www.youtube.com/@aulaenlanube",
  },
  {
    t: "apps-educativas.com",
    d: "Plataforma gratuita para crear clases, grupos y ejercicios. Es donde viven las aplicaciones del bloque 5 convertidas en clase real.",
    u: "https://apps-educativas.com",
  },
  {
    t: "OposicionesIA",
    d: "La plataforma de oposiciones desarrollada por el autor: la misma familia de herramientas, aplicada a estudiar el temario.",
    u: "https://oposicionesia.com",
  },
  {
    t: "Insignias.org",
    d: "Blog de metodologías y prácticas de aula: material de primera mano para tus supuestos didácticos.",
    u: "https://insignias.org",
  },
  {
    t: "Curso de programación con IA",
    d: "El curso largo del autor sobre programar con IA: GitHub, agentes y proyectos reales, sesión a sesión. Si el bloque 5 te sabe a poco, sigue por ahí.",
    u: "/programacion-ia/",
  },
];
