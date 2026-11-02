import type { PromptSeminario } from "../_datos";

// Prompts de la sesión 2 · Preparar clases. La biblioteca (/prompts/) los
// junta con los de las demás sesiones. Huecos [EN MAYÚSCULAS]; líneas de 72
// caracteres como mucho, para que quepan en el bloque de vídeo sin partirse.

export const PROMPTS_S2: PromptSeminario[] = [
  {
    id: "s2-mapa-curriculo",
    sesion: 2,
    momento: "preparar",
    titulo: "El mapa de tu currículo",
    para: "Tener en una tabla, literales y con su página, todos los RA o competencias y sus criterios.",
    donde: "Cuaderno de Copilot",
    texto: `Usa solo las fuentes de este cuaderno.
Hazme una tabla con todos los [RA / COMPETENCIAS ESPECÍFICAS] de
[TU MÓDULO O MATERIA] y, debajo de cada uno, sus criterios de evaluación.
Copia la redacción literal: no resumas ni reformules.
Añade una columna con el documento y la página de cada fila.
Si algo no aparece en las fuentes, escribe «no está en las fuentes».`,
  },
  {
    id: "s2-pregunta-fuentes",
    sesion: 2,
    momento: "preparar",
    titulo: "Una pregunta con red",
    para: "Preguntar a tu cuaderno sin que complete con lo que sabe de fuera.",
    donde: "Cuaderno de Copilot",
    texto: `Responde solo con la información de mis fuentes.
Pregunta: [TU PREGUNTA SOBRE EL CURRÍCULO O TU PROGRAMACIÓN]
Reglas:
1) Cita el documento y la página de cada afirmación.
2) Si las fuentes no lo dicen, contesta «no está en las fuentes»
   y no completes con lo que sepas de fuera.
3) Si dos fuentes se contradicen, enséñame las dos.`,
  },
  {
    id: "s2-plan-leccion",
    sesion: 2,
    momento: "preparar",
    titulo: "Tu plan de lección en Enseñar",
    para: "La descripción que se pega en el Plan de lección de Enseñar (Teach).",
    donde: "Enseñar (Teach) · Plan de lección",
    texto: `[PEGA AQUÍ TU FICHA]

Plan de una sesión de [Nº] minutos para [CURSO Y GRUPO].
Criterio que trabajamos (literal): «[CRITERIO DE EVALUACIÓN]».
Quiero: un inicio que enganche, una actividad práctica por parejas
y un cierre en el que comprobemos qué han entendido.
Recursos que tengo: [AULA, TALLER, ORDENADORES…].
No inventes normativa ni datos; si falta algo, escribe [COMPLETAR].`,
  },
  {
    id: "s2-unidad",
    sesion: 2,
    momento: "preparar",
    titulo: "Una unidad o situación completa",
    para: "Una unidad de trabajo (FP) o una situación de aprendizaje (ESO y Bachillerato) entera, con su evaluación.",
    donde: "Copilot Chat",
    texto: `[PEGA AQUÍ TU FICHA]

# Rol
Eres docente con experiencia programando [FP / ESO / BACHILLERATO].
# Contexto
La ficha de arriba describe mi materia o módulo y mi grupo real.
# Tarea
Diseña una [UNIDAD DE TRABAJO / SITUACIÓN DE APRENDIZAJE] de [Nº]
sesiones de [Nº] minutos para [RA Y CE / COMPETENCIA Y CRITERIOS].
# Reglas
1) Usa solo los criterios que te doy, con su redacción literal.
2) Un reto o producto final con sentido fuera del aula.
3) Cada sesión: qué hace el alumnado, qué hago yo y con qué recursos.
4) Atención a la diversidad pensada para el grupo de mi ficha.
5) No inventes normativa ni datos: si falta algo, escribe [COMPLETAR].
# Formato
Tabla de sesiones · producto final · criterio ↔ instrumento.
# Control
Dime qué sesión es la más floja y qué recursos das por hecho que tengo.`,
  },
  {
    id: "s2-revisar-unidad",
    sesion: 2,
    momento: "preparar",
    titulo: "Que tu cuaderno revise la unidad",
    para: "Comparar una unidad con el currículo y tu programación antes de darla.",
    donde: "Cuaderno de Copilot",
    texto: `Te pego una unidad que he preparado. Compárala solo con mis fuentes:
1) ¿Qué criterios cita que no aparecen en el currículo, o aparecen
   con otra redacción? Dame la cita literal correcta y la página.
2) ¿Qué criterios del [RA / COMPETENCIA] se han quedado sin trabajar?
3) ¿Hay algo que contradiga mi programación didáctica?
Responde en una tabla y no reescribas la unidad.

[PEGA AQUÍ LA UNIDAD]`,
  },
  {
    id: "s2-lamina",
    sesion: 2,
    momento: "preparar",
    titulo: "Una lámina para proyectar",
    para: "Una infografía de aula con las siete piezas: el texto lo dictas tú.",
    donde: "Copilot Chat (imágenes)",
    texto: `Crea una infografía educativa vertical 9:16, en español, sobre
"[TEMA]", para alumnado de [CURSO Y ETAPA]. Estilo editorial y riguroso.

Ilustración central: [DESCRIBE LA ESCENA ENTERA Y DESDE DÓNDE SE VE].

Título: "[TÍTULO EXACTO]". Subtítulo: "[SUBTÍTULO EXACTO]".

Representa cada elemento con su rótulo y esta definición, literal:
- [ELEMENTO 1]: "[DEFINICIÓN EXACTA, UNA LÍNEA]"
- [ELEMENTO 2]: "[DEFINICIÓN EXACTA, UNA LÍNEA]"
- [… HASTA 6 U 8 ELEMENTOS]

Recuadros laterales con estas ideas clave, literales:
- "[IDEA CLAVE 1]"
- "[IDEA CLAVE 2]"

Paleta: [COLORES]. Flechas claras, leyendas, jerarquía visual cuidada
y letra grande: se tiene que leer desde el fondo del aula.`,
  },
  {
    id: "s2-presentacion",
    sesion: 2,
    momento: "preparar",
    titulo: "De tu guion a la presentación",
    para: "Diapositivas de una idea cada una, con lo que dirás en las notas.",
    donde: "Copilot Chat, y después el agente de PowerPoint",
    texto: `# Rol
Eres diseñador de materiales didácticos para [FP / ESO / BACHILLERATO].
# Contexto
Voy a explicar "[TEMA]" a [CURSO] en [Nº] minutos, proyectando.
Mi guion (lo que se tiene que entender, en orden):
[CINCO O SEIS IDEAS, UNA LÍNEA CADA UNA]
# Tarea
Conviértelo en una presentación.
# Reglas
1) Una idea por diapositiva; como mucho veinte palabras en pantalla.
2) Nada de relleno: ni «índice» ni «gracias por su atención».
3) No inventes datos: si falta una cifra, escribe [DATO].
# Formato
Por diapositiva: título · texto en pantalla · qué digo yo (dos líneas)
· qué imagen o esquema llevaría.
# Control
Dime qué tres diapositivas quitarías si me quedara sin tiempo.`,
  },
  {
    id: "s2-gift",
    sesion: 2,
    momento: "preparar",
    titulo: "Preguntas para Aules en GIFT",
    para: "Un banco de preguntas que Aules importa tal cual, con retroalimentación.",
    donde: "Copilot Chat",
    texto: `[PEGA AQUÍ TU FICHA]

# Tarea
Escribe [Nº] preguntas en formato GIFT de Moodle sobre [CONTENIDO],
para el criterio «[CRITERIO DE EVALUACIÓN]».
# Reglas
1) Mezcla: [Nº] de opción múltiple, [Nº] de verdadero o falso
   y [Nº] de respuesta corta.
2) En opción múltiple, tres distractores creíbles: errores que
   comete de verdad el alumnado.
3) Cada respuesta con su retroalimentación tras #, con el porqué.
4) Cada pregunta con un título ::P1 · tema:: y un comentario //.
5) Escapa con \\ los caracteres ~ = # { } : dentro del texto.
# Formato
Primero el fichero GIFT completo, en un único bloque de código.
# Control
Después del bloque, dime qué respuesta te ha dado más dudas y por qué.`,
  },
];

/** Busca un prompt de la sesión por id (falla en compilación si no existe). */
export function p2(id: string): string {
  const p = PROMPTS_S2.find((x) => x.id === id);
  if (!p) throw new Error(`Prompt desconocido: ${id}`);
  return p.texto;
}
