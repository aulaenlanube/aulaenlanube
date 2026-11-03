import type { Tono } from "@/app/programacion-ia/_video/piezas";

// ════════════════════════════════════════════════════════════════════════════
// Seminario de IA para docentes (FP y Secundaria, Comunitat Valenciana).
// Fuente única de la verdad: la portada, la navegación de pie, los vídeos
// resumen y los «Para ampliar» de cada sesión salen de aquí. Reordenar o
// renombrar una sesión es tocar solo este fichero.
//
// Sin fechas a propósito: las sesiones se nombran «Sesión 1…5».
// Las páginas siguen docs/paginas-para-video.md (se graban para el canal
// YouTube @ia-para-docentes con ?video).
// ════════════════════════════════════════════════════════════════════════════

export const RAIZ = "/seminario-ia-docentes/";

export type Sesion = {
  n: number;
  ruta: string;
  tono: Tono;
  /** Título de la sesión (h1). */
  titulo: string;
  /** Título abreviado para chips y navegación de pie. */
  corto: string;
  /** Una línea para la tarjeta de la portada. */
  breve: string;
  resumen: string;
  /** La pieza del hilo que se lleva el docente al acabar. */
  pieza: string;
  piezaDetalle: string;
  /** Id de YouTube del vídeo resumen cuando esté publicado. */
  video: string | null;
  /** Hora de estreno (ISO con zona): hasta entonces el vídeo es privado en YouTube y la web no lo enseña. Se mira al
   *  compilar, así que hay que desplegar después de esa hora (videoPublicado). */
  estreno?: string;
};

export const SESIONES: Sesion[] = [
  {
    n: 1,
    ruta: `${RAIZ}sesion-01/`,
    tono: "azul",
    titulo: "La IA que ya tienes y cómo pedirle las cosas",
    corto: "La IA que ya tienes",
    breve: "Copilot con tu cuenta @edu.gva.es, qué datos nunca se meten y el prompt en seis bloques.",
    resumen:
      "Qué es (y qué no es) una IA generativa, qué te da Copilot con la cuenta del centro sin pagar nada, el semáforo de datos de la guía oficial del CEFIRE y cómo se escribe un encargo que rinde a la primera.",
    pieza: "La ficha de tu materia",
    piezaDetalle: "El contexto que pegarás en cada prompt: etapa, materia o módulo, criterios y grupo, sin un solo nombre.",
    video: "Aqsq-HzrWWE",
    estreno: "2026-11-03T18:00:00+01:00",
  },
  {
    n: 2,
    ruta: `${RAIZ}sesion-02/`,
    tono: "verde",
    titulo: "Preparar clases: del currículo al material",
    corto: "Preparar clases",
    breve: "Un cuaderno con tus fuentes, Teach, materiales visuales y preguntas para Aules.",
    resumen:
      "Cómo se convierte el currículo en una unidad de trabajo o una situación de aprendizaje completa: un cuaderno que solo responde con tus fuentes, Teach para planes y cuestionarios, láminas y presentaciones, y bancos de preguntas que se importan en Aules.",
    pieza: "Tu cuaderno y tus prompts",
    piezaDetalle: "Un cuaderno con tu currículo y tu programación, y una biblioteca de prompts que ya funcionan.",
    video: null,
  },
  {
    n: 3,
    ruta: `${RAIZ}sesion-03/`,
    tono: "ambar",
    titulo: "Evaluar y corregir sin que la IA ponga la nota",
    corto: "Evaluar y corregir",
    breve: "Rúbricas desde tus criterios, feedback, corrección asistida y tareas a prueba de IA.",
    resumen:
      "Dónde ayuda la IA en la evaluación y dónde no puede entrar: rúbricas a partir de los criterios de evaluación, feedback a una clase entera sin datos personales, exámenes corregidos con rúbrica y revisión humana, y tareas que la IA no resuelve sola.",
    pieza: "Tus rúbricas y tu protocolo",
    piezaDetalle: "Una rúbrica probada y la forma de corregir con IA que puedes defender ante cualquiera.",
    video: null,
  },
  {
    n: 4,
    ruta: `${RAIZ}sesion-04/`,
    tono: "morado",
    titulo: "Planificar el curso y crear tu asistente",
    corto: "Planificar y tu asistente",
    breve: "Temporalización, programación y un agente de Copilot hecho con tu ficha.",
    resumen:
      "La planificación que más tiempo come —temporalización, programación didáctica, reuniones y correos— con IA, y tu propio asistente de Copilot construido con tu ficha. Al final, eliges qué herramienta te vas a construir y la dejas descrita en una página.",
    pieza: "Tu asistente y tu encargo",
    piezaDetalle: "Un agente de Copilot que ya te conoce y el encargo escrito de la herramienta que construirás.",
    video: null,
  },
  {
    n: 5,
    ruta: `${RAIZ}sesion-05/`,
    tono: "rosa",
    titulo: "Tu herramienta desde cero con OpenCode",
    corto: "Tu herramienta",
    breve: "Un agente que programa por ti: de tu encargo a una web que funciona sola.",
    resumen:
      "El laboratorio: OpenCode, un agente que escribe los ficheros por ti, convierte el encargo de la sesión 4 en una herramienta web de un solo fichero que funciona sin internet y guarda los datos en tu navegador. Plan, construir, probar, corregir y compartir.",
    pieza: "Tu herramienta",
    piezaDetalle: "Una web propia, de un solo fichero, que te ahorra tiempo de verdad el resto del curso.",
    video: null,
  },
];

/** Navegación de pie de una sesión: la anterior y la siguiente. */
export function vecinas(n: number) {
  const i = SESIONES.findIndex((s) => s.n === n);
  const portada = { titulo: "Portada del seminario", ruta: RAIZ };
  const atras = i > 0 ? { titulo: `Sesión ${SESIONES[i - 1].n} · ${SESIONES[i - 1].corto}`, ruta: SESIONES[i - 1].ruta } : portada;
  const adelante =
    i < SESIONES.length - 1
      ? { titulo: `Sesión ${SESIONES[i + 1].n} · ${SESIONES[i + 1].corto}`, ruta: SESIONES[i + 1].ruta }
      : { titulo: "Tu herramienta, paso a paso", ruta: `${RAIZ}tu-herramienta/` };
  return { atras, adelante };
}

/** El vídeo de la sesión si ya es público (el estreno ha pasado al compilar); si no, null. */
export function videoPublicado(s: Sesion): string | null {
  return s.video && (!s.estreno || Date.now() >= Date.parse(s.estreno)) ? s.video : null;
}

export function sesion(n: number): Sesion {
  const s = SESIONES.find((x) => x.n === n);
  if (!s) throw new Error(`No existe la sesión ${n}`);
  return s;
}

// ── Vídeos de apoyo (canales del autor) ─────────────────────────────────────
// Los «Para ampliar» de cada sesión citan por id. Títulos tal cual en YouTube
// (en castellano). Canal: «ipd» = @ia-para-docentes, «aeln» = @aulaenlanube.

export type VideoApoyo = { titulo: string; dur: string; canal: "ipd" | "aeln"; nota?: string; t?: number };

export const VIDEOS: Record<string, VideoApoyo> = {
  // Curso de IA para docentes (2025-26) y otros largos de @ia-para-docentes
  "p-SfyxxqhwE": { titulo: "¿Qué IAs utilizar?", dur: "9:42", canal: "ipd" },
  "3uvGObre7t0": { titulo: "Planifica con IA una evaluación entera en una tarde", dur: "9:41", canal: "ipd" },
  Z2AWL_YWqrY: { titulo: "Crea presentaciones para tus clases con IA", dur: "8:26", canal: "ipd" },
  pHbb8uNrK3M: { titulo: "Imágenes con IA, derechos de autor y marcas invisibles", dur: "10:21", canal: "ipd" },
  mtURjDFfFF0: { titulo: "Crea vídeos con IA para tus clases", dur: "11:19", canal: "ipd" },
  "7G-y0yFu8V0": { titulo: "Utiliza la IA para aprender y estudiar", dur: "14:38", canal: "ipd" },
  i2VB17Brw40: { titulo: "El cuaderno del docente: NotebookLM", dur: "17:38", canal: "ipd" },
  e3JGzKJ70rA: { titulo: "Cómo usar IA gratis y sin internet (LM Studio)", dur: "18:04", canal: "ipd" },
  hg7Kt0jkCvU: { titulo: "El único trabajo que sobrevivirá a la IA", dur: "12:11", canal: "ipd" },
  PMggpH1csws: { titulo: "IA para docentes: tu nueva aliada en el aula", dur: "6:47", canal: "ipd" },
  "2jh6-S7b_go": { titulo: "Usa la IA así para ser mejor docente", dur: "25:13", canal: "ipd" },
  jGhicjeUz24: { titulo: "Deja de corregir exámenes YA: la IA lo hace mejor", dur: "26:06", canal: "ipd" },
  gmNUxXxNxpc: { titulo: "Utiliza la IA en Educación Física", dur: "20:47", canal: "ipd" },
  n7zjADLSR5Y: { titulo: "Cómo crear apps para tus clases con IA en minutos (sin código)", dur: "28:35", canal: "ipd" },
  BPCe65apZTw: { titulo: "Crea apps educativas nivel PRO con IA (sin código)", dur: "20:46", canal: "ipd" },
  WXqvGKKFOHw: { titulo: "He creado la plataforma educativa perfecta sin programar", dur: "19:51", canal: "ipd" },
  y_MC9m803sc: { titulo: "Le di mi plataforma a una IA y la rediseñó entera", dur: "12:16", canal: "ipd" },
  zWgG2F5AkTU: { titulo: "Crea imágenes educativas con IA nivel PRO", dur: "5:45", canal: "ipd" },
  kZMsseeI9Zg: { titulo: "La alucinante historia de la IA moderna", dur: "6:06", canal: "ipd" },
  Zc2siCcNeHg: { titulo: "La IA ya programa mejor que tú (acéptalo)", dur: "8:50", canal: "ipd" },
  LjsQAt7ygzo: { titulo: "He usado IA para explicar 5 ejercicios de la ESO", dur: "14:06", canal: "ipd" },
  NbXf8NyFLXg: { titulo: "Crear videojuegos está en modo fácil", dur: "11:04", canal: "ipd" },
  // Seminario de IA para docentes 2026 (febrero-marzo, centrado en Gemini)
  pM8Eam7_exg: { titulo: "Seminario de IA para docentes 2026 · Parte 1 de 3", dur: "1:14:50", canal: "ipd" },
  ooJSYOcph_E: { titulo: "Seminario de IA para docentes 2026 · Parte 2 de 3", dur: "1:06:08", canal: "ipd" },
  pZvW2ENzJjQ: { titulo: "Seminario de IA para docentes 2026 · Parte 3 de 3", dur: "1:11:19", canal: "ipd" },
  // Serie de shorts «IA en clase SIN humo»
  oU_CeUjhjis: { titulo: "Tareas que ChatGPT no puede hacer por tus alumnos", dur: "1:08", canal: "ipd", nota: "IA en clase 1/12" },
  vuuAQe2AoJU: { titulo: "Los detectores de IA no funcionan (y qué hacer en su lugar)", dur: "1:13", canal: "ipd", nota: "IA en clase 2/12" },
  "Ph-Y_y7en94": { titulo: "Lo que nunca debes pegar en un chat de IA", dur: "1:11", canal: "ipd", nota: "IA en clase 3/12" },
  "8FOXlFX1wRg": { titulo: "Feedback a 30 redacciones sin perder la tarde", dur: "1:04", canal: "ipd", nota: "IA en clase 4/12" },
  tG2_SBBqp0Q: { titulo: "Una rúbrica en 2 minutos con IA (y cómo saber si es justa)", dur: "1:09", canal: "ipd", nota: "IA en clase 5/12" },
  "mxMTg7m-Npg": { titulo: "La IA se equivoca en mates: 3 trucos", dur: "1:04", canal: "ipd", nota: "IA en clase 6/12" },
  "2vET-LM-LGY": { titulo: "Convierte tu tema en un juego de clase en 5 minutos", dur: "1:04", canal: "ipd", nota: "IA en clase 7/12" },
  "2hJdcvMoov0": { titulo: "Situación de aprendizaje en 10 minutos con IA", dur: "1:04", canal: "ipd", nota: "IA en clase 8/12" },
  p2wAa5AYuNo: { titulo: "Imágenes con IA para clase: las 3 reglas para usarlas bien", dur: "1:05", canal: "ipd", nota: "IA en clase 9/12" },
  XL2aZId8h1o: { titulo: "3 normas para que tus alumnos usen la IA (en vez de prohibirla)", dur: "1:00", canal: "ipd", nota: "IA en clase 10/12" },
  // Apps educativas
  g4OocYhl9vA: { titulo: "He creado la web de apps educativas que siempre quise", dur: "11:05", canal: "ipd" },
  gJOHlZhpHR4: { titulo: "La plataforma educativa que odiarán las editoriales", dur: "38:14", canal: "ipd" },
  "lzPRNWoR-PU": { titulo: "Amplifica tus clases gratis con esta herramienta", dur: "14:33", canal: "ipd" },
  "9778n1WTGXY": { titulo: "Planetas por capas y moléculas que se corrigen solas", dur: "9:38", canal: "ipd" },
  // Aula en la Nube
  "OV_Br6wlr9o": { titulo: "Entiende la IA con un único vídeo", dur: "1:00:52", canal: "aeln" },
  zITksaNuP3A: { titulo: "La idea que hizo posible ChatGPT: cómo funcionan los Transformers", dur: "6:25", canal: "aeln" },
  "38M-DYI-geA": { titulo: "¿Cómo aprende una red neuronal?", dur: "6:08", canal: "aeln" },
  "O-mYNYBK2KE": { titulo: "¿Puede una IA decidir si consigues el trabajo? El AI Act", dur: "12:15", canal: "aeln" },
  jvFWBAwLhhw: { titulo: "¿Tiene sentido corregir código con IA?", dur: "10:08", canal: "aeln" },
  J155hrfLXwQ: { titulo: "Así generamos los materiales en el instituto del futuro · IA Simarro #2", dur: "14:30", canal: "aeln" },
};

/** Enlace a un vídeo de apoyo (con segundo de inicio si se da). */
export function urlVideo(id: string, t?: number) {
  return `https://www.youtube.com/watch?v=${id}${t ? `&t=${t}s` : ""}`;
}

// ── Catálogo de herramientas para la sesión 5 ───────────────────────────────

export type Herramienta = { id: string; titulo: string; para: string; hace: string; tono: Tono; ejemplo?: boolean };

export const HERRAMIENTAS: Herramienta[] = [
  {
    id: "cuaderno",
    titulo: "Cuaderno de evaluación por criterios",
    para: "Corregir y evaluar",
    hace: "Pesos de RA y CE (FP) o de competencias y criterios (ESO y Bachillerato), notas por actividad y la nota final calculada, sin hojas de cálculo frágiles.",
    tono: "ambar",
    ejemplo: true,
  },
  {
    id: "planificador",
    titulo: "Planificador del curso",
    para: "Planificar",
    hace: "Sesiones semanales, festivos y horas de cada unidad: la temporalización sale sola y se imprime.",
    tono: "morado",
  },
  {
    id: "rubricas",
    titulo: "Generador de rúbricas y feedback",
    para: "Corregir",
    hace: "Tus criterios se convierten en rúbricas con cuatro niveles y en hojas de comentarios listas para devolver.",
    tono: "rosa",
  },
  {
    id: "banco",
    titulo: "Banco de preguntas para Aules",
    para: "Preparar clases",
    hace: "Escribes o pegas preguntas y la herramienta las exporta en GIFT o Moodle XML para importarlas en Aules.",
    tono: "verde",
  },
  {
    id: "prompts",
    titulo: "Biblioteca de prompts de tu materia",
    para: "Preparar clases",
    hace: "Tus mejores prompts con huecos que se rellenan desde tu ficha: eliges, copias y pegas en Copilot.",
    tono: "azul",
  },
  {
    id: "empresa",
    titulo: "Seguimiento de la formación en empresa",
    para: "Planificar (FP)",
    hace: "Empresas, alumnado en prácticas, visitas y actividades del plan formativo en un solo panel.",
    tono: "gris",
  },
];

// ── Fuentes oficiales (comprobadas el 2 de noviembre de 2026) ───────────────

export const FUENTES = {
  guiaCefire: {
    t: "Guia per a planificar accions formatives sobre IA (CEFIRE, PAF 2026-2027)",
    u: "https://portal.edu.gva.es/cefire/wp-content/uploads/sites/1992/2026/09/Guia_accions_formatives_IA_PAF_2026-2027_VAL.pdf",
    f: "10 de septiembre de 2026",
  },
  licencias: {
    t: "Licencias educativas Microsoft 365 para centros públicos de la Generalitat",
    u: "https://portal.edu.gva.es/identitatdigital/es/licencias-educativas-microsoft-365-para-centros-publicos-de-titularidad-de-la-generalitat/",
    f: "actualizada el 7 de abril de 2026",
  },
  appsedu: {
    t: "AppsEdu: catálogo de aplicaciones evaluadas por la Conselleria",
    u: "https://portal.edu.gva.es/appsedu/aplicacions-web/",
    f: "consultado el 2 de noviembre de 2026",
  },
  teach: {
    t: "Teach en la app Microsoft Copilot (Soporte de Microsoft)",
    u: "https://support.microsoft.com/en-US/education/teach-in-the-microsoft-365-copilot-app",
    f: "2026",
  },
  funcionesEdu: {
    t: "Funciones de IA de Microsoft 365 Education (Microsoft Learn)",
    u: "https://learn.microsoft.com/en-us/microsoft-365/education/guide/1-reference/manage-microsoft-365-education-ai-features",
    f: "31 de agosto de 2026",
  },
  agentes: {
    t: "Agentes en Microsoft Copilot Chat (Microsoft Learn)",
    u: "https://learn.microsoft.com/en-us/copilot/agents",
    f: "21 de octubre de 2026",
  },
  aiAct: {
    t: "Reglamento (UE) 2026/1744 («ómnibus digital» del Reglamento de IA)",
    u: "https://www.boe.es/doue/2026/1744/L00001-00041.pdf",
    f: "DOUE de 24 de julio de 2026",
  },
  opencode: {
    t: "OpenCode: descarga de la app de escritorio",
    u: "https://opencode.ai/download",
    f: "versión 2.2.5, 30 de octubre de 2026",
  },
  githubDocentes: {
    t: "GitHub Copilot Pro gratis para docentes verificados",
    u: "https://github.com/education/teachers",
    f: "2026",
  },
  aules: {
    t: "Aules se actualiza a Moodle 5.2",
    u: "https://portal.edu.gva.es/aules/calendario-de-actualizacion-de-aules-a-la-version-5-2/",
    f: "7 de julio de 2026",
  },
} as const;

// ── Recursos generales (portada) ────────────────────────────────────────────

export const RECURSOS: { t: string; d: string; u: string }[] = [
  {
    t: "YouTube · IA para docentes",
    d: "El canal de este seminario: los vídeos resumen de cada sesión, el curso de IA para docentes y los shorts «IA en clase SIN humo».",
    u: "https://www.youtube.com/@ia-para-docentes",
  },
  {
    t: "Seminario de IA para docentes 2026 (las tres partes)",
    d: "La edición de febrero y marzo, centrada en Gemini, NotebookLM, imágenes y apps. Es el complemento natural de este: aquí el centro es Copilot.",
    u: urlVideo("pM8Eam7_exg"),
  },
  {
    t: "Cadenas de prompts e infografías",
    d: "Aplicaciones educativas reales con la conversación entera que las creó, prompt a prompt, y láminas de aula con su prompt exacto.",
    u: "https://aulaenlanube.com/cadenas-de-prompts/",
  },
  {
    t: "apps-educativas.com",
    d: "Más de 100 apps gratuitas, sin anuncios, hechas con IA: la prueba de hasta dónde llega lo que verás en la sesión 5.",
    u: "https://apps-educativas.com",
  },
  {
    t: "IA para docentes (web)",
    d: "Artículos sobre prompts, corrección de exámenes y apps para el aula.",
    u: "https://ia-para-docentes.com",
  },
  {
    t: "Curso de Programación con IA",
    d: "Si la sesión 5 te sabe a poco: el curso completo con agentes, GitHub y la guía avanzada de OpenCode.",
    u: "/programacion-ia/opencode/",
  },
];

// ── Prompts del seminario ───────────────────────────────────────────────────
// Cada sesión exporta los suyos en sesion-0N/prompts.ts (PROMPTS_SN) y la
// biblioteca (/prompts/) los junta todos. Los huecos van [EN MAYÚSCULAS ENTRE
// CORCHETES] para que se vean a la primera.

export type Momento = "empezar" | "preparar" | "evaluar" | "planificar" | "herramienta";

export const MOMENTOS: Record<Momento, string> = {
  empezar: "Para empezar",
  preparar: "Preparar clases",
  evaluar: "Evaluar y corregir",
  planificar: "Planificar",
  herramienta: "Tu herramienta",
};

export type PromptSeminario = {
  /** Único en todo el seminario: s1-ficha, s3-rubrica… (sirve de ancla). */
  id: string;
  sesion: number;
  momento: Momento;
  titulo: string;
  /** Para qué sirve, en una frase. */
  para: string;
  /** Dónde pegarlo: «Copilot Chat», «Teach», «OpenCode»… */
  donde: string;
  texto: string;
};
