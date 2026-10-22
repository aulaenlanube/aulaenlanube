// Programación didáctica del módulo 0485 · Programación (1.º DAM/DAW) en el
// formato del motor PDF de OposicionesIA (public/opos-pdf.js) con la plantilla
// del IES Dr. Lluís Simarro. Estructura de secciones = la de las programaciones
// FP de OposicionesIA (PlantillaSecundaria::modoFp), adaptada a lo que se hace
// de verdad en el Curso de Programación con IA: cada proyecto es una unidad de
// trabajo (unidades.ts). Se importa solo al pulsar «Descargar» (boton-pdf.tsx).
import { RUBRICA_WEB_MARCA } from "@/lib/campus/rubricas";
import {
  RAS, letra, CONTENIDOS, COMPETENCIAS, OBJETIVOS, COMPETENCIA_GENERAL, ORIENTACIONES, PESO_RA,
} from "./curriculo";
import { UNIDADES, MATRIZ } from "./unidades";
import type { Modalidad, UT } from "./unidades";

export type PdfSec = { title?: string; content: string; pagebreak?: boolean };
export type PdfPayload = {
  filename: string;
  headerTitle: string;
  headerSubtitle: string;
  footerTitle: string;
  sections: PdfSec[];
};

const CURSO = "2026-2027";
const DOCENTE = "Edu Torregrosa Llácer";

const G: Record<Modalidad, { grupo: string; nombre: string; regimen: string; ritmo: string }> = {
  presencial: {
    grupo: "1CFSD",
    nombre: "1.º DAM/DAW presencial",
    regimen: "régimen presencial",
    ritmo: "8 horas semanales en el aula-taller",
  },
  semipresencial: {
    grupo: "1CFSDS",
    nombre: "1.º DAM semipresencial",
    regimen: "régimen semipresencial",
    ritmo: "8 horas semanales de carga lectiva distribuidas en 4 horas de tutoría colectiva y 4 horas de tutoría individual (Orden 30/2022, art. 28)",
  },
};

// Caracteres sin glifo en Helvetica/WinAnsi que el motor descartaría.
const limpiar = (s: string) =>
  s.replace(/≥/g, ">=").replace(/≤/g, "<=").replace(/€/g, " euros").replace(/[✓✔]/g, "").replace(/ /g, " ");

const tabla = (cab: string[], filas: (string | number)[][]) =>
  [`| ${cab.join(" | ")} |`, `|${cab.map(() => "---").join("|")}|`, ...filas.map((f) => `| ${f.map((c) => String(c).replace(/\|/g, "/")).join(" | ")} |`)].join("\n");

const lista = (xs: string[]) => xs.map((x) => `- ${x}`).join("\n");

const pesoUT = (m: Modalidad, i: number) => Object.values(MATRIZ[m]).reduce((a, fila) => a + fila[i], 0);

// ── Portada e índice ──────────────────────────────────────────────────────

function portada(m: Modalidad, uts: UT[]): string {
  const g = G[m];
  return `# Programación didáctica

## Módulo profesional 0485 · Programación

**Ciclo formativo de grado superior:** Desarrollo de Aplicaciones Multiplataforma (primer curso común con Desarrollo de Aplicaciones Web)

**Familia profesional:** Informática y Comunicaciones

**Grupo:** ${g.grupo} · ${g.nombre} · ${g.regimen}

**Curso académico:** ${CURSO}

**Duración del módulo:** 266 horas (8 horas semanales), Decreto 114/2025, de 29 de julio, del Consell

**Centro:** IES Dr. Lluís Simarro · Xàtiva (València)

**Departamento:** Informática y Comunicaciones

**Profesor:** ${DOCENTE}

**Proyecto de innovación:** Curso de Programación con IA, el alumnado dirige agentes de inteligencia artificial que escriben el código; su trabajo es especificar, decidir, auditar, probar, integrar y entregar.

---

## Índice

1. Introducción y justificación
2. Marco normativo de la Formación Profesional
3. Contextualización (centro, ciclo, módulo y grupo)
4. Competencia general, competencias profesionales y objetivos generales
5. Resultados de aprendizaje, criterios de evaluación y contenidos del módulo
6. Orientaciones pedagógicas y metodología
7. Unidades de trabajo: secuenciación y temporalización
8. Evaluación, criterios de calificación, mínimos exigibles y recuperación
9. Atención a la diversidad e inclusión en FP
10. Recursos y espacios
11. Elementos transversales
12. Seguimiento de la programación y evaluación de la práctica docente
13. Conclusión
14. Bibliografía y normativa
15. Desarrollo de las unidades de trabajo
${uts.map((u) => `   - UT${u.n}. ${u.titulo}`).join("\n")}
16. Anexos: normas de uso de la IA, calendario y rúbrica de referencia`;
}

// ── 1. Introducción ───────────────────────────────────────────────────────

function introduccion(m: Modalidad, uts: UT[]): string {
  const semi = m === "semipresencial";
  return `El módulo profesional 0485 Programación es el módulo troncal del primer curso del ciclo formativo de grado superior Desarrollo de Aplicaciones Multiplataforma (DAM), y también del ciclo de Desarrollo de Aplicaciones Web (DAW), con el que comparte código, resultados de aprendizaje y contenidos. Con 266 horas en el currículo valenciano es el módulo de mayor carga horaria del curso y el cimiento sobre el que se sostienen los módulos de segundo curso: acceso a datos, desarrollo de interfaces, programación multimedia y de dispositivos móviles, programación de servicios y procesos y el proyecto intermodular. Si el título forma a profesionales capaces de «desarrollar, implantar, documentar y mantener aplicaciones informáticas multiplataforma», este es el módulo donde el alumnado aprende a construirlas.

Esta programación concreta el módulo para el grupo ${G[m].grupo} (${G[m].nombre}) del IES Dr. Lluís Simarro en el curso ${CURSO} y lo hace desde un proyecto de innovación docente: el **Curso de Programación con IA**. La tesis que lo vertebra es sencilla y, a la vez, exigente: el profesional de FP que se incorporará al mercado laboral en 2028 no va a escribir la mayor parte del código línea a línea, sino que va a **dirigir agentes de inteligencia artificial** que lo escriben. Su trabajo real será especificar con precisión, decidir entre alternativas, auditar lo que el agente produce, probarlo, integrarlo y entregarlo. El código no se memoriza: se **audita**. El alumno pasa de ser autor material a ser **editor con criterio** del software que firma.

Esta tesis no reduce la exigencia técnica del módulo: la desplaza. Para auditar una jerarquía de clases hay que entender la herencia mejor que para escribirla copiando un ejemplo; para detectar una inyección SQL en una consulta generada hay que saber cómo se programa una conexión segura; para aceptar o rechazar una prueba automática hay que saber qué es una aserción y qué caso límite cubre. Por eso todos los resultados de aprendizaje (RA) del Real Decreto 450/2010, en la redacción dada por el Real Decreto 405/2023, se mantienen íntegros y se evalúan con sus criterios de evaluación (CE) oficiales. Lo que cambia es el camino: en lugar de unidades temáticas (variables, bucles, clases, ficheros, bases de datos) que se recorren de forma lineal con ejercicios aislados, el módulo se organiza en **proyectos reales**, y **cada proyecto es una unidad de trabajo**. Cada proyecto deja una técnica o una herramienta nueva y vuelve sobre las anteriores con más profundidad (progresión en espiral).

Tres razones justifican la decisión. La primera es la **prospectiva del propio título**: el artículo 8 del RD 450/2010, actualizado por el RD 405/2023, pide a las administraciones que tengan en cuenta que «los rápidos avances y cambios tecnológicos del sector hacen que se demanden profesionales con una actitud favorable hacia la autoformación», y la competencia w) del título exige «mantener el espíritu de innovación y actualización». La segunda es el **marco de la Ley Orgánica 3/2022**, que sitúa la innovación, la digitalización y el emprendimiento en el centro del sistema de FP y pide metodologías activas vinculadas a la realidad productiva. La tercera es **normativa europea**: el Reglamento (UE) 2024/1689 de inteligencia artificial obliga, desde el 2 de febrero de 2025, a garantizar un nivel suficiente de alfabetización en IA de las personas que utilizan estos sistemas; formar a futuros desarrolladores que los usen con criterio, seguridad y honestidad es una obligación, no una moda.

${semi
    ? `En el grupo semipresencial, el método es el mismo que en el presencial (mismo material, mismas rúbricas, mismos tutoriales), pero el ritmo se organiza por **quincenas**: cada quincena tiene un objetivo, sus recursos y una fecha de comprobación o de entrega. El curso es íntegramente de **proyectos individuales**, sin proyecto en grupo, para respetar la disponibilidad horaria de un alumnado que con frecuencia trabaja o tiene cargas familiares. La acción tutorial, que la Orden 30/2022 define como «el elemento fundamental de este régimen de enseñanza», se articula a través del campus del curso, el foro del aula, las tutorías individuales en línea y las tutorías colectivas presenciales.`
    : `En el grupo presencial, el curso combina dos líneas de trabajo que avanzan en paralelo a partir del 19 de octubre: una **línea individual** de proyectos que van a más (web de marca, aplicación de terminal, videojuego, aplicación con datos y proyecto final) y una **startup en grupo** que dura todo el curso y que debe terminar con un producto publicado, usuarios reales de fuera del aula y un modelo de ingresos que, como mínimo, cubra su mantenimiento. La línea individual garantiza que cada alumno evidencia por sí mismo todos los RA; la startup los lleva a un contexto profesional de equipo con revisión de código, despliegue y clientes.`}

El documento se estructura en ${uts.length} unidades de trabajo que cubren la totalidad de los RA del módulo, con su temporalización en horas, sus actividades, sus instrumentos de evaluación vinculados a los CE, sus criterios de calificación y sus mínimos exigibles. Es una programación viva: la Orden 8/2025, de 22 de abril, establece en su artículo 11 que las programaciones «han de adaptarse a la evaluación continua» y «evolucionar a lo largo del curso para atender a la diversidad», y así se hace aquí: se mueven las fechas, nunca el orden de los proyectos ni los RA que evidencian.`;
}

// ── 2. Marco normativo ────────────────────────────────────────────────────

function marco(m: Modalidad): string {
  const semi = m === "semipresencial";
  return `La programación se fundamenta en un marco normativo estatal y autonómico que no se enumera aquí como mera lista, sino porque cada norma justifica una decisión concreta del documento.

## 2.1. Marco estatal

- **Ley Orgánica 2/2006, de 3 de mayo, de Educación (LOE), modificada por la Ley Orgánica 3/2020, de 29 de diciembre (LOMLOE).** Define la Formación Profesional como parte del sistema educativo y fija sus principios: preparación para la actividad profesional, aprendizaje a lo largo de la vida y atención a la diversidad.
- **Ley Orgánica 3/2022, de 31 de marzo, de ordenación e integración de la Formación Profesional (LOFP).** Establece un sistema único de FP orientado a la empleabilidad, con carácter dual, e incorpora como ejes la innovación, la digitalización, el emprendimiento y la sostenibilidad. Es el fundamento de la metodología por proyectos con vinculación al entorno productivo y de la startup ${semi ? "que se trabaja en el grupo presencial y del enfoque de producto de los proyectos individuales" : "en grupo"}.
- **Real Decreto 659/2023, de 18 de julio, por el que se desarrolla la ordenación del Sistema de Formación Profesional** (modificado por el Real Decreto 658/2024). Concreta la organización de los ciclos formativos, la evaluación por resultados de aprendizaje, la Formación en Empresa y el proyecto intermodular.
- **Real Decreto 450/2010, de 16 de abril, por el que se establece el título de Técnico Superior en Desarrollo de Aplicaciones Multiplataforma y se fijan sus enseñanzas mínimas,** en la redacción dada por el **Real Decreto 405/2023, de 29 de mayo**, que actualiza los títulos de DAM y DAW (BOE núm. 132, de 3 de junio de 2023). De él proceden literalmente la competencia general, las competencias profesionales, personales y sociales, los objetivos generales, los RA, los CE, los contenidos básicos y las orientaciones pedagógicas del módulo 0485 que se citan en esta programación. El título de DAW (RD 686/2010, actualizado por el mismo RD 405/2023) comparte el módulo 0485 con idéntico contenido.
- **Real Decreto 500/2024, de 21 de mayo,** que adapta los títulos de grado superior al nuevo sistema de FP (Formación en Empresa, proyecto intermodular y módulos comunes de Digitalización aplicada, Sostenibilidad aplicada, Itinerario Personal para la Empleabilidad e Inglés profesional).
- **Reglamento (UE) 2016/679 (RGPD) y Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales.** Rigen el tratamiento de datos del alumnado en el campus del curso y el diseño de las aplicaciones que el alumnado construye (protección de datos desde el diseño, datos de prueba anónimos).
- **Reglamento (UE) 2024/1689, de 13 de junio, de inteligencia artificial.** Su artículo 4 (alfabetización en IA) fundamenta las normas de uso de la IA del anexo I y la formación explícita del alumnado en el uso responsable de estos sistemas.

## 2.2. Marco autonómico (Comunitat Valenciana)

- **Decreto 114/2025, de 29 de julio, del Consell,** por el que se establecen los currículos de los ciclos formativos de grado medio y superior en la Comunitat Valenciana. Fija para el módulo 0485 una duración de **266 horas** en primer curso, con **8 horas semanales**, y es la referencia para la secuenciación del módulo en el ciclo.
- **Orden 8/2025, de 22 de abril, de la Conselleria de Educación, Cultura, Universidades y Empleo, por la que se regula la evaluación del proceso de enseñanza-aprendizaje en ciclos formativos y cursos de especialización** (DOGV núm. 10098, de 30 de abril de 2025), modificada por la **Orden 5/2026, de 1 de abril** (DOGV núm. 10336, de 7 de abril de 2026). Determina el carácter continuo, formativo e integrador de la evaluación (art. 4), la calificación numérica entre 1 y 10 sin decimales en función de la consecución de los RA (art. 5), la pérdida de la evaluación continua al superar el 15 % de inasistencia (art. 7), el régimen de convocatorias (art. 9), la adaptación de las programaciones a la evaluación continua (art. 11) y las sesiones de evaluación inicial, parciales, ordinaria y extraordinaria (art. 12).${semi ? " Para las modalidades no presenciales establece que la evaluación se realizará «mediante el seguimiento del proceso de aprendizaje y una prueba de evaluación final de carácter presencial» (art. 4.3) y que la evaluación continua exige «la asistencia a las tutorías colectivas, la realización de las actividades de autoaprendizaje, el acceso regular al aula virtual y la participación en los foros» (art. 7.2)." : ""}
${semi ? "- **Orden 30/2022, de 12 de mayo, de la Conselleria de Educación, Cultura y Deporte,** por la que se regula la organización y autorización de los ciclos formativos de FP en régimen semipresencial. Establece que estas enseñanzas tienen los mismos efectos académicos y el mismo currículo que las presenciales (arts. 2 y 3), define las tutorías individuales y colectivas (arts. 26 y 27), reparte la carga horaria del módulo (8 horas semanales: 4 de tutoría colectiva y 4 de tutoría individual, art. 28), limita la presencialidad exigible al 20 % de las tutorías colectivas y al 10 % de las individuales (art. 29), fundamenta la metodología en el autoaprendizaje con TIC y en la acción tutorial (art. 30) y obliga a que el departamento recoja en su programación las adaptaciones y la metodología propias de este régimen (art. 34).\n" : ""}- **Decreto 104/2018, de 27 de julio, del Consell, por el que se desarrollan los principios de equidad y de inclusión en el sistema educativo valenciano,** y **Orden 20/2019, de 30 de abril, por la que se regula la organización de la respuesta educativa para la inclusión del alumnado.** Fundamentan las medidas de atención a la diversidad del apartado 9, aplicables también en FP, con el Diseño Universal para el Aprendizaje (DUA) como marco.
- **Decreto 193/2025, de 12 de diciembre, del Consell, de la convivencia en el sistema educativo,** marco de las normas de convivencia del aula y del uso de los espacios virtuales del curso.
- **Ley 1/2024, de 27 de junio, de la Generalitat, de libertad educativa,** que rige el uso de las lenguas en la enseñanza; los materiales del curso se ofrecen en castellano y la documentación técnica se apoya en inglés profesional.
- **Resolución de 15 de junio de 2026 por la que se aprueba el calendario escolar del curso 2026-2027,** que fija los periodos lectivos y festivos sobre los que se calcula la temporalización${semi ? " (las enseñanzas en régimen semipresencial se rigen por el calendario de los ciclos presenciales)" : ""}.

## 2.3. Marco de centro

La programación se integra en el proyecto educativo del IES Dr. Lluís Simarro, en el proyecto de ciclo de la familia de Informática y Comunicaciones y en la programación general anual, y se alinea con la condición del centro como **centro de excelencia en Formación Profesional**, en cuyo marco se inscribe el Curso de Programación con IA como proyecto de innovación metodológica. La distribución de los RA entre el centro y la Formación en Empresa se ajusta a lo que establezca el proyecto de ciclo (Orden 8/2025, art. 11.2); en esta programación, todos los RA del módulo 0485 se trabajan y evalúan en el centro.`;
}

// ── 3. Contextualización ──────────────────────────────────────────────────

function contexto(m: Modalidad): string {
  const semi = m === "semipresencial";
  return `## 3.1. El centro y su entorno

El IES Dr. Lluís Simarro está situado en Xàtiva, capital de la comarca de La Costera, en el sur de la provincia de València. Es un centro público con una amplia oferta de Formación Profesional y reconocido como centro de excelencia en FP, con experiencia en proyectos de innovación y en FP dual. El tejido productivo del entorno combina industria (papel, textil, química, metal), comercio y servicios, con un número creciente de pequeñas empresas y profesionales autónomos que necesitan digitalizarse: tiendas que quieren vender en línea, clubes deportivos que gestionan reservas en hojas de cálculo, asesorías que automatizan tareas repetitivas. A menos de una hora se encuentra el ecosistema tecnológico del área metropolitana de València, con empresas de desarrollo de software, consultoras y startups que acogen alumnado en Formación en Empresa y contratan perfiles DAM y DAW. Este contexto inspira directamente los proyectos: el alumnado busca problemas reales en su entorno (La Costera, La Creueta, el comercio local) y los resuelve con software.

## 3.2. El ciclo y el módulo

El módulo 0485 se imparte en primer curso con 266 horas (8 horas semanales). Se relaciona de manera directa con los otros módulos de primer curso: **Bases de datos** (0484), con el que se coordina el modelado y el lenguaje SQL que la UT de datos utiliza desde el programa; **Lenguajes de marcas y sistemas de gestión de información** (0373), que aporta HTML, CSS y los lenguajes de intercambio (JSON, XML) que aparecen desde el primer proyecto; **Entornos de desarrollo** (0487), que trabaja control de versiones, pruebas y refactorización que aquí se aplican en cada entrega; y **Sistemas informáticos** (0483), base de la terminal y del sistema de ficheros de la CLI. También conecta con los módulos comunes del nuevo sistema (Digitalización aplicada a los sectores productivos, Sostenibilidad aplicada al sistema productivo, Itinerario Personal para la Empleabilidad I e Inglés profesional) y prepara el proyecto intermodular y los módulos de segundo curso.

## 3.3. El grupo

${semi
    ? `El grupo ${G[m].grupo} cursa el primer curso de DAM en **régimen semipresencial**. Es un grupo heterogéneo en edad (desde jóvenes que acaban de terminar el bachillerato hasta personas adultas que buscan reciclarse), en vías de acceso (bachillerato, ciclos de grado medio, prueba de acceso, titulación universitaria) y en disponibilidad: una parte importante del alumnado trabaja, tiene cargas familiares o vive lejos del centro. Por eso el curso se organiza por quincenas, con objetivos claros y flexibilidad horaria («no hace falta trabajar todos los días»), y se evalúa el trabajo visible en el repositorio, no la asistencia. Las tutorías colectivas presenciales se reservan para los momentos que requieren intervención directa del profesor (arranque de cada proyecto, terminal, verificación de entregas) y las tutorías individuales se ofrecen en un horario amplio y preferentemente en línea.

El nivel de partida en programación es muy dispar: hay alumnado sin ninguna experiencia previa junto a personas que ya programan por afición o en su trabajo. La competencia digital de base también varía, y una parte del grupo no ha usado nunca una terminal ni Git. La evaluación inicial (antes de finalizar el segundo mes lectivo, Orden 8/2025, art. 12.7) recoge esta información, junto con la del departamento de orientación, para ajustar el andamiaje de cada unidad.`
    : `El grupo ${G[m].grupo} cursa el primer curso de DAM y DAW en **régimen presencial**. Es un grupo heterogéneo en vías de acceso (bachillerato, ciclos de grado medio, prueba de acceso), edad e intereses, con un nivel de partida en programación muy dispar: conviven alumnos sin experiencia previa con otros que ya programan por su cuenta, y la mitad del grupo no había usado nunca una terminal. La motivación es alta cuando el trabajo produce algo real y visible, y cae cuando la tarea es un ejercicio aislado; por eso cada unidad termina con un producto publicado que el alumno puede enseñar.

Una parte del grupo es menor de edad al inicio del curso, lo que condiciona algunas decisiones (por ejemplo, los cobros reales con Stripe en la startup solo se activan con una persona mayor de edad responsable). Los equipos de la startup (4-5 personas) se formaron en el campus del curso el 15 de octubre con criterio de perfiles complementarios y misma ambición; el profesor reasigna al alumnado que queda sin equipo. La evaluación inicial (antes de finalizar el segundo mes lectivo, Orden 8/2025, art. 12.7) y la información del departamento de orientación se utilizan para ajustar el andamiaje de cada unidad.`}`;
}

// ── 4. Competencias y objetivos ───────────────────────────────────────────

function competencias(m: Modalidad): string {
  const uts = UNIDADES[m];
  const rel: Record<string, string> = {
    e: uts.filter((u) => ["app-datos", "proyecto-final-individual", "startup", "cli-tareas"].includes(u.id)).map((u) => `UT${u.n}`).join(", "),
    j: uts.filter((u) => ["proyecto-final-individual", "web-marca", "startup"].includes(u.id)).map((u) => `UT${u.n}`).join(", "),
    q: uts.filter((u) => ["cli-tareas", "app-datos"].includes(u.id)).map((u) => `UT${u.n}`).join(", "),
    t: uts.filter((u) => ["startup", "web-marca", "videojuego"].includes(u.id)).map((u) => `UT${u.n}`).join(", "),
    w: uts.map((u) => `UT${u.n}`).join(", "),
  };
  return `## 4.1. Competencia general del título

${COMPETENCIA_GENERAL} (RD 450/2010, art. 4).

El módulo 0485 contribuye a ella en su núcleo: desarrollar aplicaciones con un lenguaje orientado a objetos, con acceso seguro a los datos, probadas y documentadas.

## 4.2. Competencias profesionales, personales y sociales

Según sus orientaciones pedagógicas, la formación del módulo contribuye a alcanzar las competencias e), j), t) y w) del título:

${COMPETENCIAS.map(([l, t]) => `- **${l})** ${t}`).join("\n")}

## 4.3. Objetivos generales del ciclo

El módulo contribuye a los objetivos generales e), j), q) y w):

${OBJETIVOS.map(([l, t]) => `- **${l})** ${t}`).join("\n")}

## 4.4. Relación entre objetivos, competencias y unidades de trabajo

${tabla(
    ["Objetivo general", "Competencia", "Cómo se trabaja en el curso", "Unidades"],
    [
      ["e)", "e)", "Seleccionar lenguaje, librerías y herramientas a partir de una especificación y construir aplicaciones con acceso a datos; cada elección queda en un ADR.", rel.e],
      ["j)", "j)", "Diseño adaptable a móvil desde el primer proyecto; familia Android o multiplataforma en el proyecto final.", rel.j],
      ["q)", "-", "Componentes configurables por el usuario (acciones en JSON) y aplicaciones de gestión de información, base de los componentes personalizados ERP-CRM de segundo curso.", rel.q],
      ["t)", "t)", m === "presencial" ? "Revisión de código entre iguales, trabajo en equipo con roles de startup, comunicación con usuarios y clientes." : "Revisión entre iguales por el foro, playtest cruzado, comunicación escrita profesional (README, issues, cuaderno de decisiones).", rel.t],
      ["w)", "w)", "Dirigir agentes de IA con criterio y mantenerse actualizado: toda la propuesta metodológica del curso.", rel.w],
    ],
  )}

## 4.5. Cualificaciones y unidades de competencia

El título incluye, entre otras, la cualificación profesional completa **Programación con lenguajes orientados a objetos y bases de datos relacionales IFC080_3**, cuya unidad de competencia **UC0227_3: Desarrollar componentes software en lenguajes de programación orientados a objetos** está directamente vinculada al módulo 0485, y la cualificación **Programación en lenguajes estructurados de aplicaciones de gestión IFC155_3**, con la **UC0494_3: Desarrollar componentes software en lenguajes de programación estructurada** (RD 450/2010, art. 6, en la redacción del RD 405/2023).`;
}

// ── 5. RA, CE y contenidos ────────────────────────────────────────────────

function raCe(m: Modalidad): string {
  const uts = UNIDADES[m];
  const bloques = RAS.map((r) => {
    const donde = uts.filter((u) => u.ra[r.n]).map((u) => `UT${u.n}`).join(", ");
    return `**RA${r.n}. ${r.texto}**

*Peso en la calificación del módulo: ${PESO_RA[r.n]} %. Se trabaja en: ${donde}.*

${r.ce.map((c, i) => `- **${letra(i)})** ${c}`).join("\n")}`;
  }).join("\n\n");

  const mapaCont = [
    ["Identificación de los elementos de un programa informático", "RA1", "web-marca", "cli-tareas"],
    ["Utilización de objetos", "RA2", "web-marca", "videojuego"],
    ["Uso de estructuras de control", "RA3", "web-marca", "cli-tareas"],
    ["Desarrollo de clases", "RA4", "cli-tareas", "app-datos"],
    ["Lectura y escritura de información", "RA5", "cli-tareas", "videojuego"],
    ["Aplicación de las estructuras de almacenamiento", "RA6", "app-datos", "videojuego"],
    ["Utilización avanzada de clases", "RA7", "videojuego", "proyecto-final-individual"],
    ["Mantenimiento de la persistencia de los objetos", "RA8", "app-datos", "startup"],
    ["Gestión de bases de datos", "RA9", "app-datos", "startup"],
  ].map(([b, ra, ...ids]) => {
    const enUT = ids.map((id) => uts.find((u) => u.id === id)).filter(Boolean).map((u) => `UT${u!.n}`);
    const resto = uts.filter((u) => u.ra[Number(ra.slice(2))] && !ids.includes(u.id)).map((u) => `UT${u.n}`);
    return [b, ra, enUT.join(", ") || "-", resto.join(", ") || "-"];
  });

  return `El módulo se define por nueve resultados de aprendizaje con sus criterios de evaluación, que se reproducen literalmente del anexo I del RD 450/2010 en la redacción del RD 405/2023. No se inventa ni se reformula ningún RA: lo que esta programación decide es **en qué proyecto se evidencia cada uno** y con qué peso.

## 5.1. Resultados de aprendizaje y criterios de evaluación

${bloques}

## 5.2. Contenidos básicos

${CONTENIDOS.map((c) => `**${c.bloque}**\n\n${lista(c.items)}`).join("\n\n")}

## 5.3. Mapa de contenidos, RA y unidades de trabajo

Los contenidos no se imparten como temas aislados, sino cuando el proyecto los necesita; por eso cada bloque aparece en una unidad principal (donde se introduce) y vuelve en unidades posteriores con más profundidad.

${tabla(["Bloque de contenidos", "RA", "Se introduce en", "Se profundiza en"], mapaCont)}

## 5.4. Una precisión sobre el lenguaje

El currículo formula los RA de manera independiente del lenguaje. En este curso se trabajan varios lenguajes, cada uno donde aporta más: JavaScript en el navegador (web, videojuego), Python en la terminal y en los datos (CLI, aplicación con datos) y el lenguaje que exija la familia del proyecto final (incluidos Kotlin o Java para Android). Todos ellos son orientados a objetos y permiten evidenciar los CE: clases, constructores, visibilidad, herencia, interfaces, genéricos, excepciones, colecciones, flujos y acceso a bases de datos. Cambiar de lenguaje dentro del curso es, además, una competencia profesional en sí misma: el criterio para auditar código se transfiere; la sintaxis se consulta.`;
}

// ── 6. Metodología ────────────────────────────────────────────────────────

function metodologia(m: Modalidad): string {
  const semi = m === "semipresencial";
  return `## 6.1. Orientaciones pedagógicas del título

Las orientaciones pedagógicas del módulo señalan que las líneas de actuación del proceso de enseñanza-aprendizaje versarán sobre:

${lista(ORIENTACIONES)}

Todas ellas son el centro del método del curso: la prueba, la depuración y la documentación no son un tema más, sino el trabajo diario del alumno que audita el código generado por un agente.

## 6.2. Principios metodológicos

- **Aprendizaje basado en proyectos reales.** Cada unidad de trabajo es un proyecto que termina en un producto publicado o instalable que cualquiera puede usar. Los proyectos van a más (de una web estática a una aplicación con datos en producción) y comparten un mismo esqueleto: **especificación de 10 líneas → dirigir al agente → auditar → probar → publicar → defender**.
- **El alumno dirige, la IA ejecuta, el alumno responde.** Se entrenan explícitamente tres papeles: especificar (problema, usuarios, criterios de aceptación, no-objetivos: «la orden es el nuevo pliego de condiciones»), verificar (leer, probar, atacar el propio producto) y dirigir (decidir entre alternativas y documentar por qué). La regla que lo resume: **lo que no sabes explicar, no lo entregas**.
- **Regla de oro de cada entrega.** Toda entrega necesita (a) una especificación de 10 líneas, (b) al menos una decisión anotada (ADR o cuaderno de decisiones) y (c) una prueba de que funciona. Sin eso, no cuenta.
- **Rúbrica publicada por delante.** Cada proyecto se evalúa con una rúbrica que el alumnado conoce antes de empezar y que usa para autoevaluarse e iterar: se itera contra criterios, no contra gustos.
- **Proceso visible.** El repositorio Git es el cuaderno de laboratorio: commits atómicos con mensajes que cuentan decisiones, ramas, issues y pull requests. El historial es evidencia de aprendizaje y de autoría.
- **Progresión en espiral.** Las técnicas reaparecen con más profundidad: los eventos de la web vuelven en el videojuego; los ficheros de la CLI vuelven en la aplicación con datos; las clases sencillas de la CLI se convierten en jerarquías en el juego y en arquitectura en el proyecto final.
- **Currículo «oculto» explícito.** Además de los contenidos del módulo, el curso enseña herramientas profesionales repartidas entre los proyectos: GitHub completo (ramas, PR, issues, Actions, releases, protección de ramas), plantillas de especificación, terminal y sistema operativo, secretos y configuración externa, calidad con IA, arquitectura ligera (ADR, módulos), diseño de producto (MVP frente a versión 2) y comunicación (README, changelog, demo de 3 minutos, postmortem).
- **Nunca se evalúa** la velocidad tecleando, la memorización de APIs o de sintaxis ni el «código a mano»: sería evaluar la era anterior. Sí se evalúa, y con exigencia, la comprensión de lo entregado.
- **Diseño Universal para el Aprendizaje.** Múltiples formas de representación (páginas del curso, tutoriales escritos, diagramas interactivos, vídeo semanal), de acción y expresión (web, terminal, juego, defensa oral o presentación escrita) y de implicación (proyectos elegidos por el alumno y conectados con su entorno).

## 6.3. Uso de la inteligencia artificial

Se utilizan prioritariamente los **modelos de IA locales del centro** (sin cuentas de pago y sin que los datos salgan del centro)${semi ? " y, desde casa, las herramientas institucionales que facilita la Conselleria a través de Microsoft 365 (chat de Copilot) y, a partir del segundo proyecto, el asistente de código que se habilite para el alumnado" : " y, a medida que avanza el curso, agentes de código (OpenCode) conectados a esos modelos"}. Lo que el centro todavía no pueda ofrecer se cubre con vías gratuitas sin clave. El alumnado **nunca** introduce una clave de API propia en un repositorio del curso. Las normas completas de uso responsable (transparencia, autoría, datos, verificación) están en el anexo I y forman parte de los criterios de calificación.

${semi ? `## 6.4. Metodología específica del régimen semipresencial

La Orden 30/2022 establece que estas enseñanzas «incluirán actividades de autoaprendizaje y autoevaluación del alumnado y actividades presenciales de formación en el centro docente» y que su elemento fundamental es la acción tutorial (art. 30). En este módulo se concreta así:

- **Quincenas.** Cada quincena tiene un objetivo, unos recursos (páginas del curso, tutoriales, vídeo-guías) y un cierre: comprobación de proceso del repositorio a mitad de proyecto y entrega completa al final. La planificación se publica con dos quincenas de antelación en la página del grupo.
- **Tutorías colectivas (4 h/semana).** Exposición de los contenidos fundamentales de la unidad, orientación del trabajo y resolución de las dudas más difíciles (Orden 30/2022, art. 27.3). Se ofrecen en horario de mañana y tarde de forma equitativa cuando la carga lo permite, con el mismo contenido en ambos turnos (art. 28.3).
- **Tutorías individuales (4 h/semana).** Preferentemente telemáticas (art. 26.2): foro del aula, mensajería del campus y videollamada con cita previa en horario amplio. Norma del curso: **bloqueado más de 30 minutos, pregunta**. Atascarse es trabajar; atascarse en silencio es perder la quincena.
- **Presencialidad obligatoria limitada.** Se fijan como de presencia obligatoria únicamente las tutorías colectivas de arranque de cada unidad de trabajo (5 sesiones de 4 horas, 20 horas en total), por debajo del máximo del 20 % de las horas de tutoría colectiva que permite el art. 29.2. Las pruebas de evaluación no computan a este efecto. La distribución se comunica al alumnado en la guía didáctica a principio de curso (art. 29.3).
- **Contenido completo disponible desde el inicio** en la plataforma (art. 28.4): las páginas de proyecto, sesiones y tutoriales del curso están publicadas y accesibles en todo momento.
- **Sin proyecto en grupo y sin nota por asistencia.** Cuenta el trabajo visible en el repositorio al cierre de cada quincena. Los proyectos se **presentan** (no hay defensa oral formal), y el profesor puede preguntar por un fichero concreto si tiene dudas sobre la comprensión o la autoría.` : `## 6.4. Ritmo semanal en el aula-taller

- **Arranque (2 minutos):** resumen de la semana anterior y especificación asistida (el alumno dicta, la IA estructura, el alumno corta).
- **Trabajo con los agentes del centro:** el profesor pasa por los puestos auditando **decisiones**, no código: por qué esta estructura, qué has comprobado, qué no sabes explicar todavía.
- **Cierre:** demostración breve, fusión en la rama principal y grabación del vídeo-semana (se publica el domingo en la serie «El curso, en vídeo»).
- **Reparto horario:** hasta el 16 de octubre, las 8 horas semanales se dedican al primer proyecto; desde el 19 de octubre, 4 horas semanales a la línea individual y 4 a la startup en grupo.
- **Startup:** sprints de una a dos semanas, issues con responsable y revisor, pull requests obligatorias revisadas por otra persona del equipo y mini-demos de 3 minutos al cierre de cada sprint.`}

## 6.5. Papel del profesor y del alumnado

El profesor diseña los proyectos y las rúbricas, prueba la cadena de herramientas de cada proyecto la semana anterior, prepara el andamiaje (plantillas, tutoriales, vídeos), audita decisiones, da retroalimentación frecuente y evalúa con evidencias. El alumnado especifica, dirige al agente, audita y prueba lo que recibe, documenta sus decisiones, revisa el trabajo de sus compañeros y defiende o presenta sus productos. La corrección se apoya en un sistema propio de **corrección asistida**: un análisis automático de los repositorios (historial, evidencias técnicas, pruebas en móvil y consola) propone una valoración que siempre queda como borrador «IA · revisar» y que el profesor revisa y firma; nunca se publica una calificación sin revisión humana.`;
}

// ── 7. Secuenciación ──────────────────────────────────────────────────────

function secuencia(m: Modalidad): string {
  const uts = UNIDADES[m];
  const total = uts.reduce((a, u) => a + u.horas, 0);
  const filas = uts.map((u) => [`UT${u.n}`, u.titulo, u.periodo, u.trimestre, Object.keys(u.ra).map((r) => `RA${r}`).join(", "), `${u.horas} h`]);
  const porTrim = ["1.ª", "2.ª", "3.ª"].map((t) => {
    if (m === "presencial") {
      const h = { "1.ª": 38 + 16 + 20 + 36, "2.ª": 40 + 40, "3.ª": 40 + 36 }[t]!;
      return [`${t} evaluación`, `${h} h`];
    }
    const h = uts.filter((u) => u.trimestre.startsWith(t)).reduce((a, u) => a + u.horas, 0);
    return [`${t} evaluación`, `${h} h`];
  });
  return `Una unidad de trabajo es, en este curso, un proyecto completo: tiene un producto final, una rúbrica, unos RA que evidencia y una temporalización en horas (la FP se planifica por horas, no por sesiones). La secuencia está pensada para que cada proyecto se apoye en el anterior y para que, al terminar el curso, todos los RA hayan sido evidenciados al menos dos veces por cada alumno.

## 7.1. Cuadro general

${tabla(["UT", "Proyecto", "Periodo", "Evaluación", "RA", "Horas"], filas)}

**Total: ${total} horas** (Decreto 114/2025: 266 h).

## 7.2. Distribución por evaluaciones

${tabla(["Evaluación", "Horas"], porTrim)}

${m === "presencial"
    ? `La UT6 (startup) se extiende a lo largo de las tres evaluaciones en tres fases (36 h, 40 h y 36 h) y se califica en cada una de ellas. Las fechas se anclan al calendario escolar 2026-2027 de la Comunitat Valenciana: puente del 9 al 12 de octubre, Navidad del 22 de diciembre al 6 de enero, Fallas del 16 al 19 de marzo, Pascua del 25 de marzo al 5 de abril y fin de las actividades lectivas el 18 de junio.`
    : `Las fechas se anclan al calendario escolar 2026-2027 de la Comunitat Valenciana: puente del 9 al 12 de octubre, Navidad del 22 de diciembre al 6 de enero, Fallas del 16 al 19 de marzo, Pascua del 25 de marzo al 5 de abril y fin de las actividades lectivas el 18 de junio. El calendario de quincenas completo figura en el anexo II.`}

## 7.3. Justificación de la secuencia

1. **Publicar y decidir** (web de marca): el alumno aprende el método (especificar, dirigir, auditar) con el producto más visible y menos arriesgado, reconoce la estructura de un programa y usa objetos predefinidos.
2. **Sistema** (CLI): terminal, ficheros, excepciones, configuración externa, secretos y pruebas; aparecen las primeras clases propias.
3. **Estados y jerarquías** (videojuego): el bucle de juego obliga a pensar en objetos que se relacionan, heredan y se componen.
4. **Datos** (aplicación con datos): el salto de «mi web» a «producto con usuarios», con todo el recorrido de la persistencia.
5. **Autoría** (proyecto final individual): integración de todo con un proyecto elegido y defendido por el alumno.
${m === "presencial" ? "6. **Equipo y mercado** (startup): en paralelo desde octubre, lleva los mismos RA a un producto real con usuarios, revisión de código y modelo de ingresos.\n" : ""}
La cobertura de RA se comprueba en la matriz del apartado 8.3: cada RA tiene evidencias en varias unidades y el peso de cada unidad en la calificación es explícito.

## 7.4. Riesgos previstos y mitigación

- **Dependencia del agente sin criterio:** lo que no se sabe explicar no cuenta; ${m === "presencial" ? "defensa con la rúbrica en la mano" : "consultas variables sobre ficheros concretos y prueba final presencial"}.
- **Copiar y pegar sin auditar:** pruebas obligatorias y revisión cruzada desde la UT2.
- **Fricción con el entorno:** el profesor prueba la cadena de herramientas de cada proyecto la semana anterior; los tutoriales recogen los atascos reales detectados.
- **Caídas de red o de los modelos:** todo proyecto tiene un modo degradado (la CLI ejecuta sus acciones sin IA; el juego no depende de la red).
- **Claves y datos:** ninguna clave personal en ningún repositorio; datos de prueba anónimos.
- **Fiestas, excursiones y cambios de día:** se mueven las fechas, nunca el orden de los proyectos; los bloques van holgados a propósito.`;
}

// ── 8. Evaluación ─────────────────────────────────────────────────────────

function evaluacion(m: Modalidad): string {
  const semi = m === "semipresencial";
  const uts = UNIDADES[m];
  const mat = MATRIZ[m];
  const filas = RAS.map((r) => [`RA${r.n}`, `${PESO_RA[r.n]}`, ...mat[r.n].map((p) => (p ? String(p) : "-"))]);
  filas.push(["Peso UT", "100", ...uts.map((_, i) => String(pesoUT(m, i)))]);
  return `## 8.1. Características de la evaluación

La evaluación es **continua, formativa e integradora** (Orden 8/2025, art. 4.1), se realiza por **resultados de aprendizaje y criterios de evaluación** y no por competencias clave, y se apoya en instrumentos variados que el alumnado conoce y comprende en todo momento (art. 4.2): las rúbricas de cada proyecto se publican en el campus antes de empezar.${semi ? " En el régimen semipresencial, la evaluación se realiza mediante el **seguimiento del proceso de aprendizaje** (repositorio, comprobaciones de proceso, entregas, foro) y una **prueba de evaluación final de carácter presencial** (art. 4.3)." : ""}

## 8.2. Instrumentos de evaluación

${tabla(
    ["Instrumento", "Qué evidencia", "CE vinculados (ejemplos)"],
    [
      ["Rúbrica del producto (publicada por delante)", "Calidad funcional, técnica y de proceso del producto entregado", "Todos los de la UT"],
      ["Historial del repositorio (commits, ramas, issues, PR)", "Proceso real, iteración, autoría, revisión", "RA1 b, c · RA3 f, g · RA7 f"],
      ["Cuaderno de decisiones y ADR", "Criterio: qué se pidió a la IA, qué devolvió, qué se cambió y por qué", "RA7 i, j · RA8 b · RA9 a"],
      ["Pruebas automáticas y evidencias de funcionamiento", "Programa probado y depurado; casos límite", "RA3 f, i · RA7 f"],
      [semi ? "Presentación con consultas variables" : "Defensa oral con la rúbrica", "Comprensión de lo entregado; capacidad de explicar cualquier fichero", "RA1 a · RA4 a · RA7 a"],
      ["Comprobaciones de proceso y entregas en el campus", "Avance en los plazos, iteración visible", "Según UT"],
      ...(semi
        ? [["Prueba final presencial", "Dominio y autoría: modificar en directo los propios proyectos y resolver un caso nuevo con el agente", "Todos los RA"]]
        : [["Analítica de equipo y coevaluación (startup)", "Contribución individual dentro del grupo", "RA3 e, f · RA4 i · RA9 g"]]),
      ["Observación sistemática", semi ? "Participación en tutorías y foro, actividades de autoaprendizaje" : "Trabajo en el aula-taller, uso del método, actitud profesional", "Transversal"],
    ],
  )}

## 8.3. Criterios de calificación

La calificación del módulo es **numérica, entre 1 y 10, sin decimales**, y está en función de la consecución de los RA (Orden 8/2025, art. 5.1). El procedimiento es el siguiente:

1. **Cada proyecto se califica con su rúbrica** sobre 10 (suma de peso por porcentaje del nivel alcanzado en cada criterio: Insuficiente 0 %, En desarrollo 50 %, Competente 80 %, Excelente 100 %). Si falla algún **requisito mínimo** del proyecto, este queda como **no evaluable (NE)** hasta que se subsane; se conserva la puntuación orientativa para que el alumno sepa cuánto obtendría al corregirlo.
2. **Cada criterio de la rúbrica está vinculado a CE concretos**, de modo que la calificación del proyecto se traslada a los RA que evidencia según la matriz siguiente (puntos sobre 100 del módulo que cada unidad aporta a cada RA).
3. **La calificación de cada RA** es la media ponderada de las calificaciones de los proyectos que lo evidencian, con los pesos de la matriz${semi ? ", combinada en un 80 % con el seguimiento y en un 20 % con la prueba final presencial (apartado 8.4)" : ""}.
4. **La calificación del módulo** es la suma ponderada de las calificaciones de los RA con el peso de cada RA. Para superar el módulo es necesario que **todos los RA alcancen al menos un 5**. Si algún RA no llega a 5, la calificación del módulo no puede ser superior a 4 y el plan de recuperación se limita a ese RA (art. 12.9).
5. El redondeo a entero se hace al entero más próximo, salvo entre 4 y 5, donde nunca se redondea al alza (un 4,6 con un RA no superado es un 4).

${tabla(["RA", "Peso RA", ...uts.map((u) => `UT${u.n}`)], filas)}

**Lectura por proyectos:** ${uts.map((u, i) => `UT${u.n} ${pesoUT(m, i)} %`).join(" · ")}.${m === "presencial" ? " La startup pesa un 35 % porque concentra la evidencia de RA8 y RA9 en producción y porque dura todo el curso; su calificación es **individual dentro del grupo**." : ""}

## 8.4. ${semi ? "Prueba final presencial y calificaciones parciales" : "Calificaciones parciales"}

${semi
    ? `- **Prueba final presencial (semana del 14 al 18 de junio).** Obligatoria por la Orden 8/2025 (art. 4.3). Duración de 3 horas en el aula-taller, sin acceso a los repositorios desde casa. Consta de dos partes: (a) modificar en directo uno de sus propios proyectos según un cambio que propone el profesor (por ejemplo, una nueva acción en la CLI, una nueva entidad en el juego o una nueva consulta en la aplicación con datos), explicando el código afectado; y (b) resolver un caso nuevo y pequeño dirigiendo al agente del centro, con especificación, auditoría y prueba. Se califica por RA con la misma escala y pesa un **20 %** en la calificación de cada RA. Es necesario obtener al menos un 4 en la prueba para que se pondere; en caso contrario, el módulo queda pendiente para la convocatoria extraordinaria.
- **Calificaciones parciales (diciembre y marzo).** Se emiten calificaciones numéricas parciales con los proyectos cerrados hasta la fecha (art. 12.8), que se tienen en cuenta en la calificación final según la matriz. Son informativas del progreso por RA.`
    : `- **Calificaciones parciales (diciembre y marzo).** Se emiten calificaciones numéricas parciales con los proyectos y las fases de la startup cerrados hasta la fecha (Orden 8/2025, art. 12.8), calculadas con la matriz anterior y tenidas en cuenta en la calificación final.
- **Startup.** En cada revisión de fase se aplica la rúbrica de la startup a cada persona. La fase de descubrimiento (Día 0 y entregas del 26 de octubre: repositorio de la organización con la ficha v1, docs/decisiones.md y docs/entrevistas.md con cinco entrevistas) se valora como **apto / no apto de proceso**: una ficha sin modelo de ingresos y sin sus números es no apto.`}

## 8.5. Mínimos exigibles

Para superar el módulo se exige, como mínimo:

- Haber entregado todos los proyectos de la línea individual cumpliendo sus requisitos mínimos (apartado 15 de cada UT)${m === "presencial" ? " y haber superado los mínimos de cada fase de la startup" : ""}.
- Haber alcanzado al menos el nivel «En desarrollo» en los criterios de rúbrica vinculados a cada RA, de modo que cada RA alcance una calificación de 5.
- Saber explicar cualquier fichero de sus entregas: lo que no se sabe explicar no se considera evidenciado.
- No incluir ninguna clave, secreto ni dato personal real en ningún repositorio.

## 8.6. Pérdida de la evaluación continua

${semi
    ? `En régimen semipresencial, la evaluación continua exige la asistencia a las tutorías colectivas de presencia obligatoria (anexo II), la realización de las actividades de autoaprendizaje (comprobaciones de proceso y entregas), el acceso regular al aula virtual y la participación en los foros (Orden 8/2025, art. 7.2). Se pierde al superar el 15 % de inasistencia a las actividades obligatorias (art. 7.3), con aviso al tutor del grupo al alcanzar el 10 % (art. 7.4) y notificación fehaciente por ITACA (art. 7.5). El alumnado que la pierda se evalúa en la prueba final presencial con todos los RA y la entrega previa de los proyectos individuales.`
    : `Se pierde el derecho a la evaluación continua al superar el 15 % de inasistencia a las actividades de formación (Orden 8/2025, art. 7.3), con aviso al tutor del grupo al alcanzar el 10 % (art. 7.4) y notificación fehaciente por ITACA (art. 7.5). El alumnado afectado se evalúa en la convocatoria ordinaria mediante la entrega de los proyectos individuales y una prueba presencial de producción que abarca todos los RA (modificar en directo sus proyectos y resolver un caso nuevo dirigiendo al agente). La parte de equipo de la startup se sustituye por un proyecto individual con base de datos en producción.`}

## 8.7. Recuperación y convocatorias

- **Durante el curso:** cada proyecto deja una «prueba de producción» reproducible (web publicada, paquete instalable, juego jugable, aplicación desplegada). Un proyecto no superado o NE se puede recuperar mejorándolo contra la rúbrica en el plazo que se acuerde con el alumno, normalmente dentro de la evaluación siguiente, y con una defensa${semi ? " o presentación" : ""} de los cambios.
- **Convocatoria ordinaria (junio):** asigna la calificación final del módulo. Se dispone de un máximo de 4 convocatorias por módulo (Orden 8/2025, art. 9.1), con posibilidad de renuncia justificada (art. 9.2) y de convocatoria extraordinaria de gracia (art. 10).
- **Convocatoria extraordinaria:** para el alumnado que no supere algún RA, el plan de recuperación recoge **exclusivamente los RA no superados** (art. 12.9) y consiste en: (a) la mejora o el rehecho del proyecto o proyectos que evidencian ese RA, con una rúbrica de recuperación específica, y (b) una prueba presencial de producción sobre ese RA. Las calificaciones de los RA superados se conservan.
- **Honestidad académica:** entregar como propio el trabajo de otra persona o un código que no se sabe explicar supone la calificación de Insuficiente en todos los criterios afectados de ese proyecto y su recuperación en la forma descrita.

## 8.8. Garantías

El alumnado (o sus representantes legales si es menor de edad) puede consultar en todo momento sus calificaciones por criterio y por RA en el campus del curso, con la rúbrica y los comentarios del profesor, y tiene derecho a una evaluación objetiva y a reclamar conforme al art. 13 de la Orden 8/2025. Las calificaciones se trasladan a ITACA en cada sesión de evaluación.`;
}

// ── 9. Diversidad ─────────────────────────────────────────────────────────

function diversidad(m: Modalidad): string {
  const semi = m === "semipresencial";
  return `La atención a la diversidad se fundamenta en el Decreto 104/2018 y en la Orden 20/2019, aplicables también en FP, con el Diseño Universal para el Aprendizaje como marco. En Formación Profesional no procede la adaptación curricular significativa: los RA y los mínimos exigibles son los mismos para todo el alumnado, porque garantizan la competencia profesional del título. Sí proceden adaptaciones de acceso, metodológicas, de tiempos y de instrumentos de evaluación, que en este curso se ven favorecidas por el propio método.

## 9.1. Medidas generales (nivel I y II)

- **Suelo y techo explícitos en cada rúbrica:** los requisitos mínimos marcan el suelo común; los descriptores de nivel Excelente y los tutoriales de ampliación ofrecen retos para el alumnado con más ritmo, sin que nadie quede fuera del producto básico.
- **Andamiaje graduado:** anatomías de proyecto, plantillas de especificación y de órdenes a la IA, tutoriales paso a paso con los atascos reales, vídeos semanales y diagramas interactivos.
- **La IA como apoyo personalizado:** el alumnado puede pedir al asistente explicaciones al nivel que necesite (y en el idioma que necesite), con la obligación de verificar y anotar lo aprendido en su cuaderno de decisiones.
- **Proyectos con elección:** dominio de la aplicación con datos, familia del proyecto final${semi ? "" : ", rol en la startup"}; aumentan la implicación y permiten conectar con intereses y realidades personales.
- **Aprendizaje entre iguales:** revisión cruzada de pull requests, playtest cruzado, instalación cruzada de la CLI${semi ? " (a través del foro y de las tutorías colectivas)" : ", parejas de revisión estables"}.
- **Evaluación inicial** y coordinación con el departamento de orientación y el tutor del grupo para detectar necesidades.

## 9.2. Medidas específicas (nivel III)

- **Alumnado con discapacidad visual o motriz:** adaptaciones de acceso (lector de pantalla, ampliación, atajos de teclado, dictado), tiempos ampliados en la defensa y en las pruebas, y productos accesibles como contenido curricular.
- **Alumnado con TDAH o dificultades de aprendizaje:** tareas fragmentadas en issues pequeñas con listas de comprobación, recordatorios de plazos en el campus, pruebas en espacio tranquilo y con tiempo adicional, instrucciones también por escrito.
- **Alumnado con trastorno del espectro autista:** rutinas semanales estables y anticipadas (la plantilla de clase y las quincenas lo favorecen), roles claros en los trabajos en equipo, alternativa escrita o grabada a la exposición oral cuando proceda.
- **Alumnado con altas capacidades o experiencia previa:** retos de ampliación (API reales, pruebas de rendimiento, contribución a código abierto, mentoría de compañeros con límites claros), sin adelantar contenidos de segundo curso.
- **Alumnado con desconocimiento del idioma:** materiales con apoyo visual y glosarios, uso del asistente de IA para traducción y explicación verificada.
${semi ? "- **Alumnado trabajador o con cargas familiares:** flexibilidad dentro de la quincena, tutorías individuales en horario de mañana y de tarde, grabación de las tutorías colectivas cuando sea posible y reorganización de plazos con justificación.\n- **Brecha digital:** préstamo de equipos del centro cuando sea posible, uso de los equipos del aula-taller en las tutorías colectivas y modo sin conexión de las herramientas.\n" : "- **Alumnado menor de edad en la startup:** cobros reales solo con una persona mayor de edad responsable; el modo de prueba de Stripe no supone ninguna desventaja en la calificación.\n- **Brecha digital:** todo el trabajo se puede completar en los equipos del aula-taller; no es necesario disponer de equipo propio.\n"}
## 9.3. Igualdad y convivencia

Se cuidan la composición mixta de los equipos, el reparto de roles técnicos sin estereotipos y la presencia de referentes diversos en los materiales. Las normas de convivencia del aula se extienden a los espacios digitales del curso (foro, repositorios, revisiones de código): las revisiones critican el código, nunca a la persona (Decreto 193/2025).`;
}

// ── 10. Recursos ──────────────────────────────────────────────────────────

function recursos(m: Modalidad): string {
  const semi = m === "semipresencial";
  return `## 10.1. Espacios

- **Aula-taller de informática** con un equipo por alumno, proyector, red estable y permisos para instalar herramientas de desarrollo.${semi ? " Se utiliza en las tutorías colectivas." : ""}
- **Servidor de IA del centro** con modelos locales accesibles desde el aula (y, cuando exista, mediante un proxy con clave en servidor).
- **Servidor virtual del curso** para despliegues de aplicaciones con base de datos${semi ? "" : " y de los productos de la startup (dominios y certificados HTTPS)"}.
${semi ? "- **Espacio virtual:** plataforma institucional de la Conselleria para la guía didáctica y la comunicación oficial, y campus del curso con foro, entregas y calificaciones.\n" : ""}
## 10.2. Software y servicios

- Editores y entornos de desarrollo: VS Code y los IDE de cada lenguaje; navegadores con herramientas de desarrollo.
- Asistentes y agentes de IA: chat del centro, agentes de código (OpenCode) conectados a los modelos del centro${semi ? ", Copilot de Microsoft 365 de la Conselleria y el asistente de código que se habilite para el alumnado" : ""}.
- Lenguajes y librerías: HTML, CSS y JavaScript; Python con Typer y pytest; Phaser; SQLite, PostgreSQL y una base de datos de documentos; mapeadores objeto-relacionales${semi ? "" : "; Stripe en modo de prueba"}.
- Git y GitHub (cuentas gratuitas y beneficios educativos): repositorios, ramas, pull requests, issues, Projects, Actions, Releases y GitHub Pages.
- Se prioriza el software libre y gratuito; ningún alumno necesita pagar ninguna licencia ni cuenta.

## 10.3. Materiales del curso (publicados en aulaenlanube.com/programacion-ia/)

- Página del grupo ${semi ? "semipresencial con la planificación por quincenas" : "presencial con los proyectos"} y páginas de cada proyecto con sus sesiones.
- Sesiones publicadas del primer proyecto: crear la web con el chat del centro, Git de verdad y la rúbrica por dentro.
- Cuatro tutoriales: publicar en GitHub Pages y dominar GitHub, datos vivos de una API externa, un chatbot que responde por ti y medios que cuentan tu historia.
- Proyecto final individual con seis familias, ideas y ejemplos reales${semi ? "" : "; proyecto final en grupo (startup) con sus sesiones"}.
- Serie semanal «El curso, en vídeo».
- **Campus del curso:** acceso del alumnado y del profesor, entregas por proyecto, rúbricas con descriptores, calificaciones explicadas por criterio, ${semi ? "" : "herramienta de equipos, "}exportación a ITACA y corrección asistida con revisión humana.

## 10.4. Bibliografía técnica de aula

Documentación oficial de los lenguajes y librerías (MDN Web Docs, documentación de Python, Phaser, SQLAlchemy, PostgreSQL, GitHub Docs), las guías de estilo del curso y la bibliografía del apartado 14.`;
}

// ── 11. Transversales ─────────────────────────────────────────────────────

function transversales(m: Modalidad): string {
  return `- **Prevención de riesgos laborales:** ergonomía del puesto de trabajo con pantallas de visualización (Real Decreto 488/1997), pausas activas, iluminación y postura; seguridad eléctrica en el aula-taller. Se trata en la primera semana y se recuerda en cada proyecto largo.
- **Sostenibilidad (vinculada al módulo de Sostenibilidad aplicada al sistema productivo):** coste energético de la IA y uso preferente de modelos locales, dimensionado de servidores, limpieza de datos y ficheros innecesarios, ODS 12 (producción y consumo responsables).
- **Digitalización (vinculada al módulo de Digitalización aplicada a los sectores productivos):** automatización de tareas, aplicaciones para pequeños negocios del entorno, uso profesional de la IA generativa.
- **Emprendimiento e iniciativa (vinculado a IPE I):** validación con usuarios, producto mínimo viable${m === "presencial" ? ", modelo de ingresos y startup en grupo" : " y proyecto final con plan de futuro"}.
- **Igualdad de género y no discriminación:** equipos y roles sin estereotipos, referentes diversos, lenguaje inclusivo en las interfaces.
- **Protección de datos y ciudadanía digital:** RGPD y LOPDGDD, privacidad desde el diseño, huella digital y marca personal responsable.
- **Ética de la inteligencia artificial:** transparencia sobre lo que hace la IA, sesgos, autoría, propiedad intelectual de los contenidos generados y alfabetización en IA (Reglamento (UE) 2024/1689, art. 4).
- **Inglés profesional:** documentación técnica, mensajes de commit y nombres en inglés cuando es la convención del sector; README en castellano.
- **Objetivos de Desarrollo Sostenible:** ODS 4 (educación de calidad), 8 (trabajo decente y crecimiento económico), 9 (industria, innovación e infraestructura) y 12.

Cada unidad de trabajo concreta sus elementos transversales en su apartado específico.`;
}

// ── 12. Seguimiento ───────────────────────────────────────────────────────

function seguimiento(m: Modalidad): string {
  return `## 12.1. Seguimiento de la programación

La programación se revisa al cierre de cada semana con la retrospectiva docente y el vídeo-semana, y formalmente en cada sesión de evaluación del departamento. Se registran las desviaciones de calendario y sus causas. El principio es fijo: **se mueven las fechas, nunca el orden de los proyectos ni los RA que evidencian**. La planificación de la 2.ª y 3.ª evaluación se concreta en enero y en marzo con los resultados reales de la evaluación anterior, sin alterar los RA ni los pesos de esta programación.

## 12.2. Indicadores

${tabla(
    ["Indicador", "Meta"],
    [
      ["Proyectos entregados en plazo (cumpliendo mínimos)", ">= 85 %"],
      ["Alumnado con todos los RA de la evaluación >= 5", ">= 75 %"],
      ["Repositorios con historial real (>= 10 commits por proyecto)", ">= 90 %"],
      ["Satisfacción del alumnado (encuesta anónima, escala 1-5)", ">= 4"],
      [m === "presencial" ? "Productos de la startup en producción con usuarios externos en junio" : "Comprobaciones de proceso de quincena superadas", m === "presencial" ? "100 % de los equipos" : ">= 80 %"],
    ],
  )}

## 12.3. Evaluación de la práctica docente

- **Encuesta anónima** al alumnado al final de cada evaluación (método, materiales, carga de trabajo, uso de la IA, retroalimentación).
- **Retrospectiva del curso en vídeo** al final de la 1.ª evaluación: qué ha funcionado y qué no, contado con honestidad.
- **Análisis de resultados por RA** en cada sesión de evaluación para detectar RA con dificultades y reforzarlos en el proyecto siguiente.
- **Coevaluación entre docentes** del departamento y difusión del proyecto de innovación en el marco del Programa de Excelencia del centro.
- Las conclusiones se recogen en la memoria final del departamento${m === "semipresencial" ? " y en la evaluación del desarrollo de las enseñanzas en régimen semipresencial que el centro debe realizar al finalizar el curso (Orden 30/2022, art. 35.2)" : ""}.`;
}

// ── 13. Conclusión ────────────────────────────────────────────────────────

function conclusion(m: Modalidad): string {
  return `Esta programación mantiene íntegros los nueve resultados de aprendizaje del módulo 0485 y sus criterios de evaluación oficiales, y cambia la forma de alcanzarlos: proyectos reales en lugar de temas aislados, agentes de IA dirigidos por el alumno en lugar de código memorizado, rúbricas públicas en lugar de exámenes sorpresa, y un historial de Git que cuenta el aprendizaje mejor que cualquier prueba escrita. ${m === "presencial" ? "La combinación de una línea individual, que garantiza la evidencia personal de cada RA, con una startup en grupo, que la lleva a un producto con usuarios y clientes, prepara al alumnado para el trabajo real en un equipo de desarrollo." : "La organización por quincenas, la acción tutorial y la prueba final presencial garantizan que el alumnado semipresencial alcanza los mismos RA con la misma exigencia que el presencial, respetando su disponibilidad."}

El compromiso como docente de FP es triple: que cada alumno termine el curso con un portfolio público de productos que funcionan y que sabe explicar; que aprenda a usar la inteligencia artificial con criterio, seguridad y honestidad, como la usarán en su primer empleo; y que la programación se revise con datos reales a lo largo del curso. Es un documento abierto: se mueven las fechas, nunca los resultados de aprendizaje.`;
}

// ── 14. Bibliografía ──────────────────────────────────────────────────────

function bibliografia(m: Modalidad): string {
  const semi = m === "semipresencial";
  return `## Normativa y legislación

- Ley Orgánica 2/2006, de 3 de mayo, de Educación (BOE núm. 106, de 4 de mayo de 2006), modificada por la Ley Orgánica 3/2020, de 29 de diciembre (BOE núm. 340, de 30 de diciembre de 2020).
- Ley Orgánica 3/2022, de 31 de marzo, de ordenación e integración de la Formación Profesional (BOE núm. 78, de 1 de abril de 2022).
- Real Decreto 659/2023, de 18 de julio, por el que se desarrolla la ordenación del Sistema de Formación Profesional (BOE núm. 171, de 19 de julio de 2023), modificado por el Real Decreto 658/2024.
- Real Decreto 450/2010, de 16 de abril, por el que se establece el título de Técnico Superior en Desarrollo de Aplicaciones Multiplataforma y se fijan sus enseñanzas mínimas (BOE núm. 123, de 20 de mayo de 2010).
- Real Decreto 405/2023, de 29 de mayo, por el que se actualizan los títulos de Técnico Superior en Desarrollo de Aplicaciones Multiplataforma y Técnico Superior en Desarrollo de Aplicaciones Web, de la familia profesional Informática y Comunicaciones, y se fijan sus enseñanzas mínimas (BOE núm. 132, de 3 de junio de 2023).
- Real Decreto 500/2024, de 21 de mayo, que adapta los títulos de Formación Profesional de grado superior al Sistema de Formación Profesional.
- Real Decreto 488/1997, de 14 de abril, sobre disposiciones mínimas de seguridad y salud relativas al trabajo con equipos que incluyen pantallas de visualización.
- Reglamento (UE) 2016/679, General de Protección de Datos, y Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales.
- Reglamento (UE) 2024/1689 del Parlamento Europeo y del Consejo, de 13 de junio de 2024, por el que se establecen normas armonizadas en materia de inteligencia artificial (DOUE L, de 12 de julio de 2024).
- Decreto 114/2025, de 29 de julio, del Consell, de currículos de los ciclos formativos de grado medio y superior en la Comunitat Valenciana (DOGV núm. 10165, de 4 de agosto de 2025).
- Orden 8/2025, de 22 de abril, de la Conselleria de Educación, Cultura, Universidades y Empleo, de evaluación en ciclos formativos y cursos de especialización (DOGV núm. 10098, de 30 de abril de 2025), modificada por la Orden 5/2026, de 1 de abril (DOGV núm. 10336, de 7 de abril de 2026).
${semi ? "- Orden 30/2022, de 12 de mayo, de la Conselleria de Educación, Cultura y Deporte, por la que se regula la organización y autorización de los ciclos formativos de Formación Profesional en régimen semipresencial (DOGV núm. 9342, de 18 de mayo de 2022).\n" : ""}- Decreto 104/2018, de 27 de julio, del Consell, de equidad e inclusión en el sistema educativo valenciano (DOGV núm. 8356, de 7 de agosto de 2018).
- Orden 20/2019, de 30 de abril, de organización de la respuesta educativa para la inclusión del alumnado (DOGV núm. 8540, de 3 de mayo de 2019).
- Decreto 193/2025, de 12 de diciembre, del Consell, de la convivencia en el sistema educativo.
- Ley 1/2024, de 27 de junio, de la Generalitat, de libertad educativa.
- Resolución de 15 de junio de 2026, por la que se aprueba el calendario escolar del curso 2026-2027 en la Comunitat Valenciana.

## Referencias bibliográficas y técnicas

- Bloch, J. (2018). *Effective Java* (3.ª ed.). Addison-Wesley.
- CAST (2018). *Universal Design for Learning Guidelines version 2.2*. CAST.
- Fowler, M. (2018). *Refactoring: Improving the Design of Existing Code* (2.ª ed.). Addison-Wesley.
- Gamma, E., Helm, R., Johnson, R. y Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
- Hunt, A. y Thomas, D. (2019). *The Pragmatic Programmer* (ed. 20.º aniversario). Addison-Wesley.
- Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O'Reilly.
- Martin, R. C. (2008). *Clean Code: A Handbook of Agile Software Craftsmanship*. Prentice Hall.
- Nystrom, R. (2014). *Game Programming Patterns*. Genever Benning.
- Ries, E. (2011). *The Lean Startup*. Crown Business.
- Thomas, J. W. (2000). *A Review of Research on Project-Based Learning*. The Autodesk Foundation.
- UNESCO (2023). *Guidance for generative AI in education and research*. UNESCO.
- Comisión Europea (2022). *DigComp 2.2: The Digital Competence Framework for Citizens*. Oficina de Publicaciones de la Unión Europea.

## Webgrafía

- Curso de Programación con IA: aulaenlanube.com/programacion-ia/ (páginas de grupo, proyectos, sesiones, tutoriales y campus).
- MDN Web Docs (developer.mozilla.org), documentación oficial de Python (docs.python.org), GitHub Docs (docs.github.com), documentación de Phaser, SQLAlchemy, PostgreSQL${semi ? "" : " y Stripe"}.`;
}

// ── 15. Desarrollo de cada UT ─────────────────────────────────────────────

function desarrolloUT(m: Modalidad, u: UT, i: number): string {
  const ceRA = Object.entries(u.ra).map(([n, letras]) => {
    const r = RAS[Number(n) - 1];
    const ls = letras.split(",").map((s) => s.trim());
    return `**RA${n}.** ${r.texto}\n\n${ls.map((l) => `- **${l})** ${r.ce["abcdefghijklmnopqrstuvwxyz".indexOf(l)]}`).join("\n")}`;
  }).join("\n\n");
  const sumaAct = u.actividades.reduce((a, x) => a + x.h, 0);
  const rub =
    u.rubrica === "web-marca"
      ? `Rúbrica oficial del proyecto, publicada en el campus y explicada en la sesión 3 (niveles: Insuficiente 0 %, En desarrollo 50 %, Competente 80 %, Excelente 100 %).\n\n${tabla(
          ["Criterio", "Peso", "Insuficiente", "En desarrollo", "Competente", "Excelente"],
          RUBRICA_WEB_MARCA.criterios.map((c) => [`**${c.nombre}**. ${c.qué}`, c.peso, ...c.niveles]),
        )}\n\n${tabla(
          ["Criterio", "CE vinculados"],
          [
            ["Contacto real y funcional", "RA5 g, h · RA2 g"],
            ["Contenido propio y densidad", "RA1 b · RA2 b"],
            ["Diseño y coherencia visual", "RA1 a · RA2 d"],
            ["Riqueza de medios", "RA2 c, d, g"],
            ["Interactividad y funcionalidad extra", "RA2 c, d, f · RA3 a, b, e · RA5 b, g"],
            ["Arquitectura, calidad técnica y accesibilidad", "RA1 a, d, e, f, g, i · RA3 f, g"],
            ["Proceso: git, iteración y evidencia", "RA1 b, c · RA3 f"],
          ],
        )}`
      : `Rúbrica del proyecto (se publica en el campus antes de que empiece la construcción y se aplica con los cuatro niveles comunes: Insuficiente 0 %, En desarrollo 50 %, Competente 80 %, Excelente 100 %). Se muestra el descriptor del nivel Excelente; el nivel Competente exige lo esencial del descriptor con carencias menores, En desarrollo un cumplimiento parcial e Insuficiente su ausencia.\n\n${tabla(
          ["Criterio", "Peso", "Nivel Excelente", "CE vinculados"],
          u.rubrica.map((c) => [`**${c.c}**`, c.peso, c.exc, c.ra]),
        )}`;
  return `**Periodo:** ${u.periodo} · **Evaluación:** ${u.trimestre} · **Duración:** ${u.horas} horas · **Peso en la calificación del módulo:** ${pesoUT(m, i)} %

> ${u.lema}

## 1. Presentación y objetivos de la unidad

${u.presentacion}

**Objetivos didácticos.** Al finalizar la unidad, el alumno o la alumna será capaz de:

${lista(u.objetivos)}

## 2. Resultados de aprendizaje (RA)

${Object.keys(u.ra).map((n) => `- **RA${n}.** ${RAS[Number(n) - 1].texto}`).join("\n")}

Los RA se abordan de forma parcial en esta unidad y se completan en las unidades posteriores, según la matriz del apartado 8.3.

## 3. Criterios de evaluación (CE)

${ceRA}

## 4. Contenidos

${lista(u.contenidos)}

**Tecnologías y herramientas:** ${u.tecnologias}

## 5. Organización de la unidad

${u.organizacion}

## 6. Actividades de enseñanza-aprendizaje

${tabla(["Actividad", "Descripción", "Horas", "Agrupamiento", "Producto"], u.actividades.map((a) => [`**${a.t}**`, a.d, a.h, a.agr, a.prod]))}

**Total: ${sumaAct} horas.**

## 7. Recursos y espacios

${lista(u.recursos)}

## 8. Temporalización

${u.horas} horas, ${u.periodo}. ${m === "semipresencial" ? "Las horas indicadas son de carga lectiva del módulo (tutorías colectivas e individuales); el trabajo autónomo del alumno se organiza dentro de cada quincena." : u.id === "startup" ? "4 horas semanales durante todo el curso desde el 19 de octubre." : u.id === "web-marca" ? "8 horas semanales." : "4 horas semanales de línea individual."}

## 9. Instrumentos de evaluación

${lista(u.instrumentos)}

## 10. Criterios de calificación

${rub}

## 11. Mínimos exigibles

Requisitos mínimos del proyecto (si falla alguno, el proyecto queda como no evaluable hasta que se subsane):

${lista(u.minimos)}

## 12. Recuperación

${u.id === "startup"
    ? "Cada fase no superada se recupera en la fase siguiente con un plan individual de contribución (issues asignadas con responsable y revisor) y una defensa específica. Si al final de curso la contribución individual no alcanza los mínimos, el alumno realiza en la convocatoria extraordinaria un proyecto individual con base de datos en producción que evidencie los RA afectados."
    : `Mejora del proyecto contra la rúbrica en el plazo acordado, con ${m === "presencial" ? "defensa" : "presentación"} de los cambios; en convocatoria extraordinaria, rehecho del proyecto (o de la parte vinculada a los RA no superados) y prueba presencial de producción sobre esos RA.`}

## 13. Atención a la diversidad e inclusión

${lista(u.diversidad)}

## 14. Elementos transversales

${lista(u.transversal)}`;
}

// ── Anexos ────────────────────────────────────────────────────────────────

function anexos(m: Modalidad): string {
  const semi = m === "semipresencial";
  return `## Anexo I. Normas de uso de la inteligencia artificial en el curso

1. **Transparencia.** Se declara siempre qué ha hecho la IA. Las órdenes clave se guardan en el repositorio y el cuaderno de decisiones recoge qué se pidió, qué devolvió y qué se cambió y por qué.
2. **Autoría con criterio.** Lo que no sabes explicar, no lo entregas. El profesor puede preguntar por cualquier fichero que lleve tu firma.
3. **Verificación.** Todo lo que produce la IA se prueba. Si la IA cita un dato, una librería o un competidor, se comprueba en la fuente.
4. **Secretos.** Ninguna clave de API propia en ningún repositorio del curso. El fichero .gitignore se crea antes del primer commit.
5. **Datos personales.** Nunca se introducen datos personales reales de terceros en un asistente ni en una aplicación de prueba: datos de prueba anónimos.
6. **Herramientas del centro primero.** Se usan los modelos del centro${semi ? " y las herramientas institucionales de la Conselleria" : ""}; no se exige ninguna cuenta de pago.
7. **Propiedad intelectual.** Se respetan las licencias de librerías, imágenes y tipografías; los recursos generados con IA se curan y se documenta su origen.
8. **Lo que no se evalúa:** velocidad tecleando, memorización de sintaxis o «código a mano». **Lo que sí:** criterio, comprensión, pruebas, proceso y producto.

## Anexo II. Calendario

${semi
    ? tabla(
        ["Bloque", "Fechas", "UT", "Hito"],
        [
          ["Acogida", "14 - 25 sep", "UT1", "Tutoría colectiva de presencia obligatoria"],
          ["Quincena 1", "29 sep - 9 oct", "UT1", "Comprobación de proceso (9 oct)"],
          ["Quincena 2", "13 - 23 oct", "UT1", "Entrega web de marca (23 oct)"],
          ["Quincena 3", "26 oct - 6 nov", "UT2", "Arranque presencial obligatorio · comprobación de proceso"],
          ["Quincena 4", "9 - 20 nov", "UT2", "Entrega CLI v1.0"],
          ["Quincena 5", "23 nov - 4 dic", "UT3", "Arranque presencial obligatorio · comprobación de proceso"],
          ["Quincena 6", "7 - 18 dic", "UT3", "Entrega videojuego · 1.ª evaluación (21 dic)"],
          ["Quincena 7", "7 - 22 ene", "UT4", "Arranque presencial obligatorio · modelo y colecciones"],
          ["Quincena 8", "25 ene - 5 feb", "UT4", "Ficheros"],
          ["Quincena 9", "8 - 19 feb", "UT4", "Base de datos relacional (I)"],
          ["Quincena 10", "22 feb - 5 mar", "UT4", "Base de datos relacional (II)"],
          ["Quincena 11", "8 - 24 mar", "UT4", "Entrega aplicación con datos · 2.ª evaluación"],
          ["Quincena 12", "6 - 16 abr", "UT5", "Arranque presencial obligatorio · validar y recortar"],
          ["Quincenas 13-15", "19 abr - 28 may", "UT5", "Sprints con comprobación de proceso"],
          ["Quincena 16", "31 may - 11 jun", "UT5", "Calidad y publicación"],
          ["Cierre", "14 - 18 jun", "UT5", "Presentación final y prueba final presencial"],
        ],
      )
    : tabla(
        ["Semanas", "Línea individual (4-8 h/sem)", "Startup (4 h/sem)", "Hito"],
        [
          ["14 sep - 16 oct", "UT1 Web de marca (8 h/sem)", "-", "Release day UT1; equipos formados (15 oct)"],
          ["19 oct - 13 nov", "UT2 CLI", "F1 · Día 0, caja, sprint 1, validación", "Entregas startup (26 oct) · release CLI"],
          ["16 nov - 18 dic", "UT3 Videojuego", "F1 · Sprints 2-4 y revisión de fase", "Torneo y portfolio · 1.ª evaluación (21 dic)"],
          ["7 ene - 24 mar", "UT4 Aplicación con datos", "F2 · Infraestructura, datos, MVP, piloto", "Revisión fase 2 · 2.ª evaluación"],
          ["6 abr - 14 may", "UT5 Proyecto final", "F3 · Pagos y sprints", "-"],
          ["17 may - 18 jun", "UT5 Proyecto final (defensa)", "F3 · Demo-day y defensa final", "Evaluación ordinaria"],
        ],
      )}

Días no lectivos considerados: 9 y 12 de octubre, 8 de diciembre, del 22 de diciembre al 6 de enero, del 16 al 19 de marzo y del 25 de marzo al 5 de abril (más los festivos locales de Xàtiva que fije el calendario municipal).

## Anexo III. Plantilla de especificación de 10 líneas

1. Problema: qué duele y a quién (con nombre propio).
2. Usuario principal y contexto de uso.
3. Qué hace el producto en una frase («hace X para Y»).
4. Tres funcionalidades imprescindibles (MVP).
5. Criterios de aceptación de cada una (cómo sé que funciona).
6. No-objetivos: lo que deliberadamente no hará.
7. Datos que maneja y dónde se guardan.
8. Restricciones: tecnología, plazos, privacidad.
9. Riesgos y cómo los voy a probar.
10. Cómo se publica o se instala.`;
}

// ── Ensamblado ────────────────────────────────────────────────────────────

export function payloadProgramacion(m: Modalidad): PdfPayload {
  const uts = UNIDADES[m];
  const secs: PdfSec[] = [
    { content: portada(m, uts) },
    { title: "1. Introducción y justificación", content: introduccion(m, uts) },
    { title: "2. Marco normativo de la Formación Profesional", content: marco(m) },
    { title: "3. Contextualización (centro, ciclo, módulo y grupo)", content: contexto(m) },
    { title: "4. Competencia general, competencias profesionales y objetivos generales", content: competencias(m) },
    { title: "5. Resultados de aprendizaje, criterios de evaluación y contenidos del módulo", content: raCe(m) },
    { title: "6. Orientaciones pedagógicas y metodología", content: metodologia(m) },
    { title: "7. Unidades de trabajo: secuenciación y temporalización", content: secuencia(m) },
    { title: "8. Evaluación, criterios de calificación, mínimos exigibles y recuperación", content: evaluacion(m) },
    { title: "9. Atención a la diversidad e inclusión en FP", content: diversidad(m) },
    { title: "10. Recursos y espacios", content: recursos(m) },
    { title: "11. Elementos transversales", content: transversales(m) },
    { title: "12. Seguimiento de la programación y evaluación de la práctica docente", content: seguimiento(m) },
    { title: "13. Conclusión", content: conclusion(m) },
    { title: "14. Bibliografía y normativa", content: bibliografia(m) },
    ...uts.map((u, i) => ({ title: `15.${u.n}. UT${u.n} · ${u.titulo}`, content: desarrolloUT(m, u, i) })),
    { title: "16. Anexos", content: anexos(m) },
  ];
  const mod = m === "presencial" ? "Presencial" : "Semipresencial";
  return {
    filename: `Programacion-0485-Programacion-1DAM-${mod}-2026-27.pdf`,
    headerTitle: `Programación didáctica · 0485 Programación · 1.º DAM ${mod} · ${CURSO}`,
    headerSubtitle: `IES Dr. Lluís Simarro · ${G[m].grupo}`,
    footerTitle: "IES Dr. Lluís Simarro",
    // Cada sección en página nueva con su «## N. Título» (lo que el motor
    // enlaza desde el índice); sus subapartados bajan a nivel 3.
    sections: secs.map((s) =>
      s.title
        ? { pagebreak: true, content: limpiar(`## ${s.title}\n\n${s.content.replace(/^## /gm, "### ")}`) }
        : { content: limpiar(s.content) },
    ),
  };
}
