import type { Historia } from "../tipos";

// Texto original de la historia, íntegro y en su orden: solo se reparte en
// páginas (una idea por página) y se le ponen marcas de género {o|a}.
export const CUANDO_ME_ENFADO: Historia = {
  slug: "cuando-me-enfado",
  titulo: "Cuando me enfado",
  tema: "Regulación emocional",
  resumen:
    "Reconocer las señales del enfado en el cuerpo, pedir ayuda o un descanso, ir al aula de orientación a calmarse y volver a la actividad. Incluye lo que no se puede hacer cuando uno está enfadado.",
  portada: "enfadadoBrazos",
  escenas: [
    { k: "frase", t: ["En el instituto, algunas situaciones pueden ser difíciles para mí."], p: ["instituto", "dificil"] },
    { k: "frase", t: ["A veces puedo sentirme enfadad{o|a}, nervios{o|a} o incómod{o|a}."], p: ["enfadado", "nervioso", "incomodo"] },
    { k: "frase", t: ["Cuando me siento así, mi cuerpo me avisa."], p: ["cuerpo", "alarma"] },
    {
      k: "lista",
      t: "Puedo notar que:",
      items: [
        { t: "Hablo más fuerte", p: ["gritar"] },
        { t: "Aprieto las manos", p: ["puno"] },
        { t: "Me muevo mucho", p: ["saltar"] },
        { t: "Necesito estar sol{o|a}", p: ["solo"] },
        { t: "Necesito un descanso", p: ["descanso"] },
      ],
    },
    { k: "frase", t: ["Cuando noto estas señales, puedo pedir ayuda."], p: ["pedirAyuda", "profesor"] },
    {
      k: "decir",
      t: "Puedo decir:",
      quien: "decir",
      frases: [
        { t: "«Necesito ayuda»", p: ["pedirAyuda"] },
        { t: "«Necesito un descanso»", p: ["descanso"] },
      ],
    },
    { k: "tarjeta", t: "También puedo enseñar mi tarjeta de descanso.", tarjeta: 0 },
    { k: "frase", t: ["El adulto me acompañará al aula de orientación."], p: ["acompanar", "orientacion"] },
    {
      k: "lista",
      t: "Allí puedo:",
      items: [
        { t: "Sentarme", p: ["sentarse"] },
        { t: "Respirar tranquilamente", p: ["respirar"] },
        { t: "Beber agua", p: ["beber"] },
        { t: "Utilizar mi material de calma", p: ["calma"] },
        { t: "Esperar hasta sentirme preparad{o|a}", p: ["esperar"] },
      ],
    },
    { k: "frase", t: ["Cuando estoy tranquil{o|a}, puedo volver a la actividad."], p: ["tranquilo", "volver", "clase"] },
    {
      k: "frase",
      t: ["Si algo me ha molestado, puedo contárselo a un adulto.", "El adulto me ayudará a encontrar una solución."],
      p: ["decir", "profesor", "solucion"],
    },
    { k: "frase", t: ["Cuando necesito espacio, puedo alejarme de las personas y de los objetos."], p: ["alejarse"] },
    {
      k: "lista",
      tono: "si",
      items: [
        { t: "Mis manos pueden estar tranquilas.", p: ["manos", "tranquilo"] },
        { t: "Los objetos pueden permanecer en su sitio.", p: ["ordenar"] },
        { t: "Mi ropa puede permanecer puesta.", p: ["vestido"] },
      ],
    },
    { k: "frase", t: ["Puedo utilizar palabras para expresar lo que necesito."], p: ["hablar"] },
    { k: "frase", t: ["Pedir ayuda me ayuda.", "Pedir un descanso me ayuda."], p: ["pedirAyuda", "descanso", "bien"] },
    { k: "frase", t: ["Puedo aprender diferentes maneras de estar tranquil{o|a}."], p: ["aprender", "tranquilo"] },
    {
      k: "lista",
      tono: "no",
      t: "Cuando estoy enfadad{o|a}, hay cosas que están prohibidas:",
      items: [
        { t: "Pegar a mis compañeros", p: ["pegar", "companeros"] },
        { t: "Pegar a los profesores", p: ["pegar", "profesor"] },
        { t: "Tirar objetos", p: ["tirar"] },
        { t: "Romper las cosas de otras personas", p: ["romper"] },
        { t: "Insultar", p: ["insultar"] },
        { t: "Quitarme la ropa", p: ["quitarRopa"] },
      ],
    },
    { k: "frase", t: ["Las personas que están conmigo también necesitan sentirse seguras."], p: ["personas", "tranquilas"] },
    {
      k: "cierre",
      si: { t: "Estar enfadad{o|a} está bien.", p: ["enfadado", "bien"] },
      no: { t: "Hacer daño no es la solución.", p: ["hacerDano"] },
    },
  ],
  tarjetas: [
    { p: "descanso", rotulo: "DESCANSO", frase: "Necesito un descanso" },
    { p: "pedirAyuda", rotulo: "AYUDA", frase: "Necesito ayuda" },
  ],
};
