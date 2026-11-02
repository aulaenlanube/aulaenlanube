import type { PromptSeminario } from "../_datos";

// Prompts de la sesión 4 (Planificar el curso y crear tu asistente). La página
// los pinta desde aquí y la biblioteca (/prompts/) los junta con los demás.
// Líneas cortas (≤ 66 caracteres): se leen en una columna de 700 px sin
// partirse, que es como salen en el vídeo.

export const PROMPTS_S4: PromptSeminario[] = [
  {
    id: "s4-temporalizacion",
    sesion: 4,
    momento: "planificar",
    titulo: "La temporalización del curso",
    para: "Repartir el curso en unidades con sus semanas y horas, cuadrando las cuentas.",
    donde: "Copilot Chat",
    texto: `# Rol
Eres jefe de departamento y sabes programar un curso entero.

# Contexto
[PEGA AQUÍ TU FICHA]
Horas del curso: [HORAS TOTALES].
Sesiones: [Nº] por semana, de [MINUTOS] minutos.
Calendario oficial: [PEGA INICIO, FIN, FESTIVOS Y EVALUACIONES]

# Tarea
Reparte el curso en [UNIDADES DE TRABAJO / SITUACIONES]
y dale a cada una sus semanas y sus horas.

# Reglas
1) Todos los RA o criterios, cubiertos y citados en cada unidad.
2) La suma de horas da exactamente [HORAS TOTALES].
3) Deja una semana de margen en cada evaluación.

# Formato
Tabla: unidad · RA o criterios · semanas · horas · evaluación.

# Control
Suma las horas al final y avísame de lo que no cuadre.`,
  },
  {
    id: "s4-coherencia",
    sesion: 4,
    momento: "planificar",
    titulo: "Revisar la coherencia de tu programación",
    para: "Encontrar huecos entre criterios, actividades e instrumentos antes de entregarla.",
    donde: "Copilot Chat (con el documento adjunto)",
    texto: `# Rol
Eres un revisor exigente de programaciones didácticas.

# Contexto
[PEGA AQUÍ TU FICHA]
Mi programación: [ADJÚNTALA O PEGA EL TEXTO]

# Tarea
Comprueba la coherencia entre los RA o criterios, las
actividades y los instrumentos de evaluación.
No reescribas nada todavía.

# Reglas
1) No cites normativa de memoria: si echas algo en falta,
   pregúntame.
2) Distingue lo que falta de lo que solo podría mejorar.

# Formato
Tabla: RA o criterio · dónde se trabaja · cómo se evalúa · hueco.
Debajo, los tres arreglos más urgentes.

# Control
Marca cada afirmación que dependa de un dato que no te he dado.`,
  },
  {
    id: "s4-acta",
    sesion: 4,
    momento: "planificar",
    titulo: "El acta, a partir de tus notas",
    para: "Pasar las notas en bruto de una reunión a un acta ordenada, sin inventar nada.",
    donde: "Copilot Chat",
    texto: `Convierte estas notas en el acta de la reunión.
Reunión: [DEPARTAMENTO, EQUIPO EDUCATIVO, CLAUSTRO…]
Notas: [PEGA TUS NOTAS, SIN NOMBRES DE ALUMNADO]

Formato: asistentes (por cargo) · orden del día · acuerdos ·
responsable y plazo de cada acuerdo · temas pendientes.

Reglas: no añadas nada que no esté en mis notas.
Si un acuerdo no tiene responsable o plazo, escribe «FALTA».`,
  },
  {
    id: "s4-correo-familia",
    sesion: 4,
    momento: "planificar",
    titulo: "El correo difícil a una familia",
    para: "Un borrador firme y cercano, en dos versiones, sin datos personales en el chat.",
    donde: "Copilot Chat",
    texto: `Ayúdame a escribir un correo difícil a una familia.
Situación, sin nombres: [P. EJ. «LA ALUMNA DE 2.º B NO ENTREGA»]
Lo que quiero conseguir: [UNA REUNIÓN, UN COMPROMISO…]
Tono: firme y cercano, sin tecnicismos ni reproches.

Dame dos versiones: una breve y otra más detallada.
No inventes hechos ni des diagnósticos: solo lo que te cuento.
Al final, dime qué frase podría sentarle mal a la familia.`,
  },
  {
    id: "s4-correo-empresa",
    sesion: 4,
    momento: "planificar",
    titulo: "Correo a una empresa (FP)",
    para: "Contactar con la empresa de la formación en empresa en cinco líneas.",
    donde: "Copilot Chat",
    texto: `Escribe un correo a la empresa que acoge
a mi alumnado en la formación en empresa.
Ciclo y curso: [CICLO Y CURSO]
Objetivo: [PROPONER VISITA, REVISAR EL PLAN…]
Fechas posibles: [DOS O TRES FECHAS]

Profesional y breve: cinco líneas como mucho.
Sin datos del alumnado: los añado yo.`,
  },
  {
    id: "s4-comunicado",
    sesion: 4,
    momento: "planificar",
    titulo: "Comunicado de tutoría (ESO)",
    para: "Un aviso claro para las familias y su versión corta para la agenda.",
    donde: "Copilot Chat",
    texto: `Redacta un comunicado de tutoría para
las familias de [CURSO Y GRUPO].
Asunto: [SALIDA, REUNIÓN DE INICIO, NORMAS…]
Datos: [FECHA, HORA, LUGAR, QUÉ HAY QUE TRAER]

Frases cortas y lenguaje claro, en una página.
Después, una versión de tres líneas para la agenda.`,
  },
  {
    id: "s4-instrucciones",
    sesion: 4,
    momento: "planificar",
    titulo: "Las instrucciones de tu asistente",
    para: "Lo que tu agente de Copilot lee antes de cada respuesta: tu ficha y tus reglas.",
    donde: "Copilot · Agentes → Nuevo agente → Configurar → Instrucciones",
    texto: `# Quién eres
Eres mi asistente para [MATERIA O MÓDULO] de [CURSO],
en un centro público de la Comunitat Valenciana.

# Mi ficha
[PEGA AQUÍ TU FICHA]

# Qué haces
- Preparas actividades, explicaciones, ejercicios y rúbricas
  alineados con los criterios de mi ficha.
- Dices a qué RA o criterio responde cada cosa que preparas.
- Si te falta un dato, me preguntas antes de inventarlo.

# Cómo respondes
- En castellano, claro y directo, con listas o tablas.
- Pensando en sesiones de [MINUTOS] minutos y un grupo real.

# Lo que nunca haces
- No inventas normativa: si no lo sabes, lo dices.
- No pones notas ni decides sobre nadie: propones y yo decido.
- Si te escribo un nombre o un dato personal, me avisas
  y no lo repites.

# Al terminar
Acaba con una línea: qué debo revisar antes de usarlo.`,
  },
  {
    id: "s4-pruebas",
    sesion: 4,
    momento: "planificar",
    titulo: "Cinco pruebas para tu asistente",
    para: "Comprobar, una por mensaje, que tu agente cumple cada regla antes de compartirlo.",
    donde: "Copilot · Vista previa del agente",
    texto: `1. Prepárame una actividad de [TEMA] para [Nº] sesiones.
2. Hazme una rúbrica del criterio [CÓDIGO DEL CRITERIO].
3. ¿Qué dice la normativa sobre [ALGO QUE NO ESTÉ EN TU FICHA]?
4. ¿Qué nota final le pongo a quien ha sacado un 4 y un 7?
5. Alumno Inventado, de 3.º A, tiene dislexia: adáptale el examen.`,
  },
  {
    id: "s4-entrevista",
    sesion: 4,
    momento: "herramienta",
    titulo: "Que Copilot te entreviste",
    para: "Convertir tu idea en bruto en el encargo de tu herramienta, pregunta a pregunta.",
    donde: "Copilot Chat o tu asistente",
    texto: `Quiero construirme una herramienta web sencilla para mi trabajo.
Mi idea, en bruto: [CUÉNTALA COMO A UN COMPAÑERO]
Mi ficha: [PEGA AQUÍ TU FICHA]

No me des todavía la solución. Entrevístame:
- Hazme las preguntas de una en una, diez como mucho.
- Pregunta por el problema, quién la usa, qué datos entran,
  qué sale, qué pantallas tiene y qué NO debe hacer.
- Si una respuesta mía es vaga, repregunta con un ejemplo.

Cuando lo tengas claro, escribe el encargo con esta plantilla.
Conserva las «Reglas fijas» tal cual, sin cambiar ni una.
[PEGA AQUÍ LA PLANTILLA DEL ENCARGO]`,
  },
  {
    id: "s4-plantilla-encargo",
    sesion: 4,
    momento: "herramienta",
    titulo: "La plantilla del encargo",
    para: "Una página que le dice al agente de la sesión 5 qué construir y qué no.",
    donde: "Un documento tuyo (OneDrive) y, en la sesión 5, OpenCode",
    texto: `# Encargo: [NOMBRE DE LA HERRAMIENTA]

## El problema
[QUÉ TE HACE PERDER TIEMPO HOY, CON UN EJEMPLO REAL]

## Quién la usa y dónde
[TÚ, TU DEPARTAMENTO O TU ALUMNADO] · [ORDENADOR, MÓVIL…]

## Qué entra
[LO QUE ESCRIBES O PEGAS: CRITERIOS, PESOS, PREGUNTAS…]

## Qué sale
[UNA TABLA, UNA NOTA, UN FICHERO PARA AULES, ALGO IMPRIMIBLE…]

## Pantallas
1. [PRIMERA PANTALLA Y QUÉ SE HACE EN ELLA]
2. [SEGUNDA PANTALLA]

## Reglas fijas
- Un solo fichero index.html que funciona sin internet.
- Los datos se guardan solo en este navegador, con botones
  para exportar e importar una copia.
- Nada se envía a ningún servidor.
- Letra grande, buen contraste y se maneja con el teclado.
- Toda la interfaz en castellano.

## Qué NO hace
- [LO QUE QUEDA FUERA, PARA QUE NO CREZCA SIN CONTROL]

## Cómo sabré que funciona
1. [PRIMERA PRUEBA QUE HARÁS AL ABRIRLA]
2. [SEGUNDA PRUEBA]
3. [TERCERA PRUEBA]`,
  },
];

/** Acceso por id (la página los pinta por nombre). */
export const P4 = Object.fromEntries(PROMPTS_S4.map((p) => [p.id, p])) as Record<string, PromptSeminario>;
