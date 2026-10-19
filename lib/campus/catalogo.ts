// Catálogo del Curso de Programación con IA para el campus (panel del alumno y
// del profesor): cursos → proyectos → sesiones. Las sesiones enlazan a las
// páginas públicas de contenido; las ENTREGAS no viven aquí sino en la base de
// datos (app_campus_entregas), porque el profesor las crea y abre/cierra desde
// su panel. Cada entrega apunta a un proyecto (y opcionalmente a una sesión)
// por su id.
//
// Mismo aviso que rubricas.ts: sin imports con alias ni sintaxis TS no borrable
// (lo leen también las herramientas de tools/campus).

export type CursoId = "presencial" | "semipresencial";

export type SesionCatalogo = {
  id: string;
  n: number;
  titulo: string;
  resumen: string;
  href: string;
};

export type ProyectoCatalogo = {
  id: string;
  titulo: string;
  resumen: string;
  href: string;
  rubrica?: string;
  sesiones: SesionCatalogo[];
};

export type CursoCatalogo = {
  id: CursoId;
  nombre: string;
  corto: string;
  descripcion: string;
  proyectos: string[];
};

export const PROYECTOS: Record<string, ProyectoCatalogo> = {
  "web-marca": {
    id: "web-marca",
    titulo: "Web personal de marca",
    resumen:
      "Una landing sobre ti: quién eres, qué has hecho, qué te gusta. Se construye fichero a fichero con el chat del centro, se versiona en GitHub y se publica en GitHub Pages.",
    href: "/programacion-ia/web-personal/",
    rubrica: "web-marca",
    sesiones: [
      {
        id: "s01", n: 1,
        titulo: "Crear tu web con el chat del centro",
        resumen: "Pide tu HTML, tu CSS y tu JS con prompts listos para copiar, únelos, pruébala y publícala.",
        href: "/programacion-ia/sesion-01/",
      },
      {
        id: "s02", n: 2,
        titulo: "GitHub en carne viva: tu web, versionada por ti",
        resumen: "Git y GitHub de verdad: configuración, token, repo enlazado a tu carpeta, commits honestos, ramas y merge.",
        href: "/programacion-ia/sesion-02/",
      },
      {
        id: "s03", n: 3,
        titulo: "Por qué programamos así",
        resumen: "Los datos del sector, tu nuevo rol como desarrollador con IA y la rúbrica con la que se corrige tu web.",
        href: "/programacion-ia/sesion-03/",
      },
    ],
  },
  startup: {
    id: "startup",
    titulo: "Startup en grupo",
    resumen:
      "El proyecto en grupo del presencial: un producto real de 4-5 personas, desplegado en servidor, con usuarios de fuera y pago con Stripe, construido todo el curso con los agentes del centro.",
    href: "/programacion-ia/proyecto-final-grupo/",
    sesiones: [
      {
        id: "s01", n: 1,
        titulo: "Día 0: del problema a la primera ficha",
        resumen: "19 oct · La meta de junio, los 4 filtros de una buena idea, taller por equipos con la IA de abogado del diablo y ronda de pitch con inversores.",
        href: "/programacion-ia/proyecto-final-grupo/sesion-01/",
      },
    ],
  },
};

export const CURSOS: Record<CursoId, CursoCatalogo> = {
  presencial: {
    id: "presencial",
    nombre: "Programación con IA · Presencial",
    corto: "Presencial",
    descripcion: "1º DAM/DAW en el aula (1CFSD): kickoff, build y demo cada semana. Con proyecto final en grupo.",
    proyectos: ["web-marca", "startup"],
  },
  semipresencial: {
    id: "semipresencial",
    nombre: "Programación con IA · Semipresencial",
    corto: "Semipresencial",
    descripcion: "1º DAM semipresencial (1CFSDS): trabajo por QUINCENAS, solo proyectos individuales — sin proyecto en grupo. Entregas: proceso en git a mitad de quincena y proyecto completo al cierre.",
    proyectos: ["web-marca"],
  },
};

export const CURSO_IDS = Object.keys(CURSOS) as CursoId[];

export function esCurso(x: unknown): x is CursoId {
  return typeof x === "string" && x in CURSOS;
}

export function sesionDe(proyectoId: string, sesionId: string | null | undefined): SesionCatalogo | undefined {
  if (!sesionId) return undefined;
  return PROYECTOS[proyectoId]?.sesiones.find((s) => s.id === sesionId);
}
