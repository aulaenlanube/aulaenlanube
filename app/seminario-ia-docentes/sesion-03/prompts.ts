import type { PromptSeminario } from "../_datos";

// Prompts de la sesión 3 (evaluar y corregir). La página los pinta desde aquí
// y la biblioteca (/seminario-ia-docentes/prompts/) los junta con los demás.
// Huecos [EN MAYÚSCULAS ENTRE CORCHETES]; [PEGA AQUÍ TU FICHA] es la ficha de
// la sesión 1.

export const PROMPTS_S3: PromptSeminario[] = [
  {
    id: "s3-instrumentos",
    sesion: 3,
    momento: "evaluar",
    titulo: "De los criterios a los instrumentos",
    para: "Decidir con qué actividad o instrumento evalúas cada criterio, sin que la IA toque los pesos.",
    donde: "Copilot Chat",
    texto: `[PEGA AQUÍ TU FICHA]

Voy a evaluar [EL RA / LA COMPETENCIA ESPECÍFICA] «[TEXTO LITERAL]» con estos criterios:
[LISTA LITERAL DE CE O DE CRITERIOS DE EVALUACIÓN]

Propón qué actividad o instrumento evalúa mejor cada criterio (práctica, observación,
examen, proyecto, exposición…) y qué evidencia concreta recogería yo de cada uno.

Reglas: cada criterio se evalúa al menos una vez; nada que no quepa en [HORAS] horas de clase;
no calcules notas ni repartas pesos: eso lo decido yo.

Formato: una tabla con criterio · instrumento · evidencia · cuándo.`,
  },
  {
    id: "s3-rubrica",
    sesion: 3,
    momento: "evaluar",
    titulo: "Una rúbrica a partir de tu criterio",
    para: "Convertir un CE o un criterio de evaluación en una rúbrica de cuatro niveles con descriptores observables.",
    donde: "Copilot Chat (en Enseñar → «Criterio de evaluación», pega el criterio en «Descripción»)",
    texto: `# Rol
Eres docente de [FP / ESO / BACHILLERATO] con experiencia en evaluar por criterios.
# Contexto
[PEGA AQUÍ TU FICHA]
Criterio que evalúo: «[COPIA LITERAL DEL CE O DEL CRITERIO]».
Evidencia: [QUÉ ENTREGA O HACE EL ALUMNADO: PRÁCTICA, INFORME, EXPOSICIÓN…].
# Tarea
Redacta una rúbrica de ese criterio con cuatro niveles: Insuficiente, En desarrollo, Competente y Excelente.
# Reglas
1) Cada descriptor dice algo que se puede ver o señalar en el trabajo: nada de «adecuado» o «bueno» a secas.
2) Los niveles no se solapan: un trabajo solo puede caer en uno.
3) Cada nivel añade algo concreto al anterior.
4) Si el criterio tiene varias partes, como mucho tres subcriterios, cada uno con su peso.
5) Usa el vocabulario del criterio literal; no añadas contenidos que no estén en él.
# Formato
Tabla: filas = subcriterios con su peso; columnas = los cuatro niveles.
# Control
Dime qué descriptor te parece más difícil de aplicar y por qué.`,
  },
  {
    id: "s3-prueba-justicia",
    sesion: 3,
    momento: "evaluar",
    titulo: "La prueba de justicia de una rúbrica",
    para: "Que la IA busque los fallos de tu rúbrica y la pruebe con tres trabajos anonimizados de nivel distinto.",
    donde: "Copilot Chat con la cuenta del centro",
    texto: `Te paso una rúbrica y tres trabajos sin nombre (A01, A02 y A03).

Primero, sin puntuar, revisa la rúbrica:
1) ¿Qué descriptores no se pueden comprobar mirando el trabajo?
2) ¿Dónde se solapan dos niveles?
3) ¿Qué palabras vagas habría que concretar?

Después, coloca cada trabajo en un nivel por subcriterio y cita la parte del trabajo que lo justifica.
Si dos trabajos de calidad distinta caen en el mismo nivel, dime qué descriptor falla y cómo reescribirlo.
No inventes citas: si algo no está en el trabajo, escribe «no aparece».

RÚBRICA:
[PEGA LA RÚBRICA]

TRABAJOS:
A01: [TEXTO DEL TRABAJO, SIN NOMBRE]
A02: [TEXTO DEL TRABAJO, SIN NOMBRE]
A03: [TEXTO DEL TRABAJO, SIN NOMBRE]`,
  },
  {
    id: "s3-feedback",
    sesion: 3,
    momento: "evaluar",
    titulo: "Feedback para toda la clase",
    para: "Un comentario útil para cada trabajo: dos fortalezas, una mejora y un siguiente paso, sin nombres.",
    donde: "Copilot Chat con la cuenta del centro",
    texto: `# Rol
Eres docente de [MATERIA O MÓDULO] y das feedback formativo: concreto, amable y útil.
# Contexto
[PEGA AQUÍ TU FICHA]
Rúbrica: [PEGA LA RÚBRICA]
Los trabajos solo llevan un código (A01, A02…). No hay ningún nombre.
# Tarea
Escribe un comentario de 80 a 120 palabras para cada trabajo.
# Reglas
1) Siempre igual: dos fortalezas, una mejora y un siguiente paso.
2) Cada fortaleza y la mejora citan algo concreto del trabajo.
3) El siguiente paso se puede hacer en menos de una semana.
4) Tutea y no pongas nota: la nota la pongo yo.
5) Si una parte no se entiende, dilo; no la inventes.
# Formato
Código · comentario. Un bloque por trabajo.
# Control
Al final, dime en qué trabajos tu comentario se apoya en poca evidencia.
TRABAJOS: [A01: …]`,
  },
  {
    id: "s3-patrones",
    sesion: 3,
    momento: "evaluar",
    titulo: "Lo que falla toda la clase",
    para: "Encontrar los errores que se repiten en un grupo y convertirlos en la actividad de la próxima clase.",
    donde: "Copilot Chat con la cuenta del centro",
    texto: `Aquí tienes las valoraciones por criterio y los comentarios de los trabajos de un grupo,
identificados solo con códigos (A01, A02…):
[PEGA LAS VALORACIONES]

1) ¿Qué errores se repiten en al menos un tercio de los trabajos?
2) ¿Hay un malentendido de concepto detrás? ¿Cuál?
3) Propón una actividad de 15 minutos para la próxima clase contra el error más frecuente.
4) ¿Qué criterio casi nadie supera? ¿Es cosa del grupo o de cómo está escrito el criterio?

Sé concreto y dime cuántos trabajos sostienen cada conclusión.`,
  },
  {
    id: "s3-corregir-examen",
    sesion: 3,
    momento: "evaluar",
    titulo: "Propuesta de corrección de un examen",
    para: "Que la IA transcriba un examen fotografiado y proponga una valoración con citas, para revisarla tú.",
    donde: "Copilot Chat con la cuenta del centro, adjuntando las fotos con el botón +",
    texto: `# Rol
Corriges exámenes de [MATERIA O MÓDULO] de [CURSO]. Propones; la nota la decide el docente.
# Contexto
Te adjunto las fotos del examen [CÓDIGO, P. EJ. A07]. No lleva nombre.
Rúbrica y solución de referencia: [PEGA LA RÚBRICA Y LA SOLUCIÓN]
# Tarea
1) Transcribe cada respuesta tal cual. Lo que no se lea, márcalo [ILEGIBLE]; no lo adivines.
2) Valora cada pregunta con la rúbrica.
# Reglas
1) Cada puntuación lleva la cita exacta de la respuesta que la justifica.
2) En los cálculos, rehaz las operaciones paso a paso antes de valorar.
3) Si dudas entre dos niveles, dilo y explica por qué.
4) No valores letra ni presentación salvo que la rúbrica lo diga.
# Formato
Tabla: pregunta · transcripción · puntos · cita · duda. Al final, nota propuesta y tres frases para el alumno.
# Control
Lista las preguntas en las que tu propuesta es menos fiable.`,
  },
  {
    id: "s3-tarea-proceso",
    sesion: 3,
    momento: "evaluar",
    titulo: "Rediseñar una tarea para que cuente el proceso",
    para: "Transformar una tarea que se puede encargar entera a una IA en otra con hitos, evidencias en clase y defensa oral.",
    donde: "Copilot Chat",
    texto: `Esta es una tarea que pongo ahora:
[PEGA EL ENUNCIADO]

Rediséñala para que el proceso cuente tanto como el producto y no se pueda encargar entera a una IA.

Reglas:
1) Mantén el mismo criterio de evaluación: «[CRITERIO]».
2) Al menos tres hitos con evidencia en clase: idea, borrador y versión final.
3) Incluye algo que solo existe en nuestra aula o nuestro entorno: [DATO LOCAL, FUENTE QUE DOY YO, PRÁCTICA DE TALLER…].
4) Termina con una defensa oral de 3 minutos y dos preguntas tipo para hacerla.
5) Indica en qué hitos se puede usar IA y cómo se declara.

Formato: hitos con su duración · qué se entrega en cada uno · cómo lo compruebo yo.`,
  },
  {
    id: "s3-normas-ia",
    sesion: 3,
    momento: "evaluar",
    titulo: "Normas de uso de la IA para tu grupo",
    para: "Redactar con el grupo unas normas claras: niveles de uso por tarea y cómo se declara.",
    donde: "Copilot Chat",
    texto: `Ayúdame a redactar las normas de uso de la IA para mi grupo de [CURSO] de [MATERIA O MÓDULO].
Contexto: no puedo exigir ninguna IA que no esté autorizada en AppsEdu; lo que regulo es cómo
se declara si la usan por su cuenta.

Quiero:
1) Cuatro niveles de uso que pondré en cada tarea: 0 · sin IA, 1 · IA para ideas,
   2 · IA para revisar, 3 · IA libre y declarada.
2) Una forma sencilla de declararlo: qué herramienta, para qué y qué cambió el alumno.
3) Qué pasa si no se declara, sin tono de amenaza.
4) Una versión de media página para leer en clase en cinco minutos.

Lenguaje claro para alumnado de [EDAD] años.`,
  },
];
