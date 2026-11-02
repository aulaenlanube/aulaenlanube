import { ENCARGO, P_ADELANTE, P_EJEMPLO, P_NOTAS, P_ROTULOS, PLAN_INTRO } from "./ficheros";

// La cadena real de mensajes con la que OpenCode 2.2.5 (modelo gratuito
// GLM-5.3-Flash Free) construyó el cuaderno de evaluación, el 2 de noviembre de
// 2026. Los textos de los mensajes son literales; «pasó» y «probamos» resumen
// la respuesta del agente y nuestras pruebas con datos conocidos.

export type Mensaje = {
  n: number;
  titulo: string;
  agente: "Plan" | "Build";
  version: string;
  texto: string;
  paso: string;
  probamos: string;
  /** Ediciones aprobadas con «Permitir una vez» (en la interfaz). */
  permisos?: number;
  tiempo?: string;
};

export const P_NOMBRES = `En la tabla de Resultados, el nombre de un criterio sale cortado a mitad de palabra: «CE2.1. Configura l».
Quiero ver el nombre entero: si es largo, que pase a una segunda línea dentro de su columna, también al imprimir.
Arregla solo esto y dime qué has cambiado.`;

export const P_AVISO = `He cargado el ejemplo y en Resultados dice «Todos los criterios tienen notas», pero a A03 le falta el CE1.2. Me dijiste que se vería el aviso y no se ve.
Quiero que el aviso diga qué alumnos tienen criterios sin nota, por ejemplo «A03: falta CE1.2», para saber que su nota final es provisional. Que «Todos los criterios tienen notas» solo salga cuando sea verdad para todo el alumnado.
Arregla solo esto y dime qué has cambiado.`;

export const P_PIE = `Última cosa: añade al final de la página un pie discreto que diga «Hecho con OpenCode y el modelo gratuito GLM-5.3-Flash Free en el Seminario de IA para docentes. Cómo se hizo, mensaje a mensaje» y que esa última frase enlace a https://aulaenlanube.com/seminario-ia-docentes/tu-herramienta/ abriéndose en otra pestaña.
Que el pie no salga al imprimir. No cambies nada más.`;

export const CADENA: Mensaje[] = [
  {
    n: 1,
    titulo: "El plan, sin tocar nada",
    agente: "Plan",
    version: "plan",
    texto: `${PLAN_INTRO}\n\n${ENCARGO}`,
    paso:
      "En 34 segundos propuso cinco pestañas, guardar todo en el navegador bajo una sola clave y medias ponderadas que ignoran lo no evaluado. Planteó tres dudas y, por su cuenta, decidió borrar todos los datos al cambiar de modo FP / ESO.",
    probamos:
      "Leímos el plan entero: en mitad de un nombre interno se le coló texto en chino («alumnoId的活动Id»). No importa en un plan, pero recuerda que lo que escribe la IA se lee antes de aceptarlo.",
    tiempo: "34 s",
  },
  {
    n: 2,
    titulo: "Luz verde, con las dudas resueltas",
    agente: "Build",
    version: "v1",
    texto: P_ADELANTE,
    paso:
      "Escribió un index.html de unos 35 KB con las cinco pestañas, la copia en JSON, el CSV y la impresión. Dijo haber comprobado las cuentas con su propio ejemplo.",
    probamos:
      "Cargamos un ejemplo con resultado conocido (7,32 y 4,0): las cuentas, bien. Pero «abc» borraba una nota sin avisar, un 11 se guardaba como 10 y había rótulos en minúsculas.",
  },
  {
    n: 3,
    titulo: "Que una nota mal escrita no borre nada",
    agente: "Build",
    version: "v2",
    texto: P_NOTAS,
    paso: "La casilla se pone en rojo, un aviso explica qué está mal y, al salir de la casilla, vuelve la nota anterior.",
    probamos: "Repetimos «abc» sobre un 5 y un 11: las notas guardadas no cambian y los cálculos siguen igual.",
    permisos: 6,
    tiempo: "2 min 5 s",
  },
  {
    n: 4,
    titulo: "Rótulos que se lean bien",
    agente: "Build",
    version: "v3",
    texto: P_ROTULOS,
    paso: "Arregló los tres y, por su cuenta, un cuarto del mismo tipo que no le habíamos dicho: «¿Quitar este ce?».",
    probamos: "«Nota RA», «Añadir CE» y «A01» sin punto colgando. Revisamos que no tocara nada más.",
    permisos: 8,
    tiempo: "1 min 12 s",
  },
  {
    n: 5,
    titulo: "Un botón para probarla en un minuto",
    agente: "Build",
    version: "v4",
    texto: P_EJEMPLO,
    paso:
      "Antes de tocar nada explicó su plan en tres líneas. Añadió «Cargar ejemplo» con tres alumnos ficticios y aseguró que el ejemplo enseñaría el aviso de criterio sin notas.",
    probamos:
      "Las notas del ejemplo, comprobadas con calculadora: 7,8 · 6,7 · 6,0. Pero el aviso prometido no salía: decía «Todos los criterios tienen notas» aunque a A03 le faltaba uno.",
    permisos: 3,
    tiempo: "1 min 24 s",
  },
  {
    n: 6,
    titulo: "El aviso, alumno por alumno",
    agente: "Build",
    version: "v5",
    texto: P_AVISO,
    paso: "El aviso miraba criterio a criterio en toda la clase; ahora mira alumno por alumno: «Notas pendientes: A03 · falta CE1.2».",
    probamos: "Con el ejemplo cargado sale el aviso de A03; al ponerle la nota que falta, desaparece.",
    permisos: 3,
    tiempo: "1 min 15 s",
  },
  {
    n: 7,
    titulo: "Nombres enteros en Resultados",
    agente: "Build",
    version: "v6",
    texto: P_NOMBRES,
    paso: "Encontró que cortaba los nombres a 18 caracteres. Quitó el corte y dejó que el nombre baje a una segunda línea.",
    probamos: "«CE2.1. Configura los parámetros del equipo», entero, en pantalla y en la vista de impresión.",
    permisos: 2,
    tiempo: "28 s",
  },
  {
    n: 8,
    titulo: "El pie que cuenta cómo se hizo",
    agente: "Build",
    version: "v7",
    texto: P_PIE,
    paso: "Añadió el pie con el enlace a esta página y lo ocultó al imprimir.",
    probamos: "El enlace abre esta página en otra pestaña y el pie no sale en la vista de impresión.",
    permisos: 1,
    tiempo: "10 s",
  },
];
