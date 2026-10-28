// Catálogo de la sección «Materiales de ESO y Bachillerato».
//
// Para publicar un material nuevo: añadir su tema a la asignatura (creándola si
// hace falta) y crear la página en app/materiales/<curso>/<asignatura>/<tema>/.
// Un curso sin asignaturas, o una asignatura sin temas, sale como «En preparación».
// Las páginas índice de curso y asignatura son estáticas: al estrenar un curso o
// una asignatura hay que crear también su page.tsx (copiando la de 1eso/musica).

export type Tema = { n: number; t: string; d: string; href: string; idioma?: string };
export type Asignatura = { id: string; t: string; emoji: string; d: string; temas: Tema[] };
export type Curso = { id: string; n: string; t: string; etapa: "ESO" | "Bachillerato"; asignaturas: Asignatura[] };

export const BASE = "/materiales/";

export const CURSOS: Curso[] = [
  {
    id: "1eso",
    n: "1º",
    t: "1.º de ESO",
    etapa: "ESO",
    asignaturas: [
      {
        id: "musica",
        t: "Música",
        emoji: "🎵",
        d: "Esquemas de estudio de cada tema del libro, con las definiciones clave, dibujos de notación y preguntas para repasar.",
        temas: [
          {
            n: 1,
            t: "El so i les seues qualitats",
            d: "So, soroll i silenci; altura, duració, intensitat i timbre. Mapa conceptual d'una pàgina (PDF i imatge), esquema detallat i preguntes de repàs.",
            href: "/materiales/1eso/musica/tema-1/",
            idioma: "Valencià · Castellano",
          },
        ],
      },
    ],
  },
  { id: "2eso", n: "2º", t: "2.º de ESO", etapa: "ESO", asignaturas: [] },
  { id: "3eso", n: "3º", t: "3.º de ESO", etapa: "ESO", asignaturas: [] },
  { id: "4eso", n: "4º", t: "4.º de ESO", etapa: "ESO", asignaturas: [] },
  { id: "1bach", n: "1º", t: "1.º de Bachillerato", etapa: "Bachillerato", asignaturas: [] },
  { id: "2bach", n: "2º", t: "2.º de Bachillerato", etapa: "Bachillerato", asignaturas: [] },
];

export function curso(id: string): Curso {
  const c = CURSOS.find((x) => x.id === id);
  if (!c) throw new Error(`Curso desconocido: ${id}`);
  return c;
}

export function asignatura(cursoId: string, id: string): Asignatura {
  const a = curso(cursoId).asignaturas.find((x) => x.id === id);
  if (!a) throw new Error(`Asignatura desconocida: ${cursoId}/${id}`);
  return a;
}
