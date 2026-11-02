import type { PromptSeminario } from "../_datos";

// Prompts y plantillas de la sesión 1. La página los pinta desde aquí y la
// biblioteca (/seminario-ia-docentes/prompts/) los junta con los del resto.
// Huecos [EN MAYÚSCULAS ENTRE CORCHETES].

export const FICHA_FP = `# Ficha de mi módulo

## Dónde estoy
- Ciclo: [NOMBRE DEL CICLO] · [GRADO MEDIO / GRADO SUPERIOR] · [1.º / 2.º]
- Módulo: [NOMBRE DEL MÓDULO PROFESIONAL]
- Horas: [N] a la semana, sesiones de [N] minutos
- Modalidad: [PRESENCIAL / SEMIPRESENCIAL / A DISTANCIA]

## Lo que dice el currículo (copiado literal)
- RA1 · [RESULTADO DE APRENDIZAJE LITERAL] · peso [N] %
  - CE a) [CRITERIO DE EVALUACIÓN LITERAL]
  - CE b) [CRITERIO DE EVALUACIÓN LITERAL]
- RA2 · [RESULTADO DE APRENDIZAJE LITERAL] · peso [N] %

## Mi grupo (sin un solo nombre)
- [N] alumnos, de [EDADES] años; [N] repiten el módulo
- Dominan: [LO QUE YA SABEN HACER]
- Les cuesta: [LO QUE SE ATASCA CADA AÑO]
- Diversidad: [«4 leen despacio», «3 acaban siempre antes»]

## Cómo trabajo
- Espacios: [TALLER / AULA DE INFORMÁTICA / AULA ORDINARIA]
- Plataforma: [AULES / TEAMS] · Evalúo con: [PRÁCTICAS, PRUEBAS, PROYECTO…]

## Lo que quiero de la IA
- Idioma: [CASTELLANO / VALENCIANO] · Tono: [CERCANO Y PROFESIONAL]
- Nunca: inventar normativa ni datos; si dudas, escribe [COMPROBAR]`;

export const FICHA_ESO = `# Ficha de mi materia

## Dónde estoy
- Etapa: [ESO / BACHILLERATO] · Curso: [CURSO]
- Materia: [NOMBRE DE LA MATERIA]
- Horas: [N] a la semana, sesiones de [N] minutos

## Lo que dice el currículo (copiado literal)
- Competencia específica [N]: [TEXTO LITERAL]
  - Criterio [N.N]: [CRITERIO DE EVALUACIÓN LITERAL]
- Saberes básicos de la unidad: [LOS QUE TOQUEN]
- Situación de aprendizaje en marcha: [TÍTULO Y RETO]

## Mi grupo (sin un solo nombre)
- [N] alumnos de [EDAD] años
- Dominan: [LO QUE YA SABEN HACER]
- Les cuesta: [LO QUE SE ATASCA CADA AÑO]
- Diversidad: [«5 necesitan apoyo en lectura», «2 de altas capacidades»]

## Cómo trabajo
- Recursos: [AULA, LABORATORIO, PORTÁTILES, LIBRO…]
- Plataforma: [AULES / TEAMS] · Evalúo con: [RÚBRICAS, CUADERNO, PRUEBAS…]

## Lo que quiero de la IA
- Idioma: [CASTELLANO / VALENCIANO] · Tono: [CERCANO Y CLARO]
- Nunca: inventar normativa ni datos; si dudas, escribe [COMPROBAR]`;

export const PROMPTS_S1: PromptSeminario[] = [
  {
    id: "s1-ficha-fp",
    sesion: 1,
    momento: "empezar",
    titulo: "La ficha de tu módulo (FP)",
    para: "El contexto que pegas al empezar cualquier conversación sobre tu módulo.",
    donde: "Copilot Chat (al principio, o adjunta como fichero)",
    texto: FICHA_FP,
  },
  {
    id: "s1-ficha-eso",
    sesion: 1,
    momento: "empezar",
    titulo: "La ficha de tu materia (ESO y Bachillerato)",
    para: "El contexto que pegas al empezar cualquier conversación sobre tu materia.",
    donde: "Copilot Chat (al principio, o adjunta como fichero)",
    texto: FICHA_ESO,
  },
  {
    id: "s1-plantilla",
    sesion: 1,
    momento: "empezar",
    titulo: "La plantilla de seis bloques",
    para: "El esqueleto de cualquier encargo serio: cambia solo lo que va entre corchetes.",
    donde: "Copilot Chat",
    texto: `# Rol
Eres [ESPECIALISTA CONCRETO: «docente de FP con 20 años de taller»].
# Contexto
[PEGA TU FICHA O RESUME: ETAPA, MATERIA O MÓDULO, CURSO Y GRUPO].
Lo que me des es para [CLASE / EXAMEN / FAMILIAS / PROGRAMACIÓN].
# Tarea
[UN SOLO ENCARGO, EN IMPERATIVO, CON UN ENTREGABLE CLARO].
# Reglas
1) No inventes normativa, cifras ni referencias: si dudas, [COMPROBAR].
2) Nivel real de mi grupo, no el de un libro de texto.
3) Nada de introducciones de relleno.
4) Si no cabe en una respuesta, dime en cuántos pasos y espera.
# Formato
[EXTENSIÓN Y ESTRUCTURA: «una página», «tabla de tres columnas»].
# Control
Termina diciéndome qué partes debo comprobar yo y por qué.`,
  },
  {
    id: "s1-ejemplo-fp",
    sesion: 1,
    momento: "preparar",
    titulo: "Ejemplo FP: una práctica de taller",
    para: "Una práctica guiada para un módulo de FP, con su hoja de comprobación.",
    donde: "Copilot Chat",
    texto: `# Rol
Eres docente de FP de Informática y Comunicaciones, con años de taller.
# Contexto
1.º de SMR, módulo de Montaje y mantenimiento de equipos.
22 alumnos de 16 a 19 años; es su primera vez abriendo un equipo.
Sesión de 110 minutos en el taller con 11 sobremesas viejos.
RA que trabajamos: [COPIA EL RA LITERAL DE TU CURRÍCULO].
# Tarea
Diseña una práctica por parejas: desmontar y volver a montar un equipo,
identificando cada componente.
# Reglas
1) Seguridad: pulsera antiestática, equipo desenchufado, nada forzado.
2) Solo material que hay en un taller de instituto normal.
3) Sin marcas ni modelos concretos: componentes genéricos.
# Formato
Objetivo en una línea · material · pasos numerados (máximo 12) ·
hoja de comprobación para la pareja · tres preguntas de cierre.
# Control
Dime qué paso suele salir mal la primera vez y cómo lo detecto
mientras paso por las mesas.`,
  },
  {
    id: "s1-ejemplo-eso",
    sesion: 1,
    momento: "preparar",
    titulo: "Ejemplo ESO: un reto con porcentajes",
    para: "Una actividad contextualizada de Matemáticas, con su solución razonada.",
    donde: "Copilot Chat",
    texto: `# Rol
Eres profesora de Matemáticas de ESO y trabajas con retos reales.
# Contexto
2.º de ESO, 26 alumnos. Estamos con proporcionalidad y porcentajes.
A 6 les cuesta leer enunciados largos; 4 terminan antes que el resto.
Sesiones de 55 minutos, sin calculadora.
# Tarea
Crea un reto de 25 minutos: comparar tres ofertas de rebajas de una
tienda de ropa y decidir cuál conviene.
# Reglas
1) Precios redondos que se puedan calcular a mano.
2) Enunciado de seis líneas como máximo, en frases cortas.
3) Una pregunta final que obligue a justificar, no solo a calcular.
# Formato
Enunciado · tabla con las tres ofertas · solución paso a paso ·
ampliación para quien acaba antes.
# Control
Dime en qué cálculo se equivocarán más y qué error cometerán.`,
  },
  {
    id: "s1-metaprompt",
    sesion: 1,
    momento: "empezar",
    titulo: "El metaprompt",
    para: "Que la IA escriba el encargo por ti, preguntándote antes lo que le falte.",
    donde: "Copilot Chat (al final de tu explicación en bruto)",
    texto: `No me des todavía la respuesta.

Escribe el PROMPT ideal para conseguir lo que te acabo de contar, en seis bloques:
- Rol: qué especialista debería responder.
- Contexto: etapa, curso, materia o módulo, grupo y para qué es.
- Tarea: un solo encargo, en imperativo.
- Reglas: lo que NO puede hacer (inventar normativa, rellenar, salirse del nivel…).
- Formato: extensión y estructura exactas.
- Control: cómo comprobaré yo que la respuesta sirve.

Antes de escribirlo, hazme todas las preguntas que te falten. Todas de una vez.`,
  },
  {
    id: "s1-tres-niveles",
    sesion: 1,
    momento: "preparar",
    titulo: "Una actividad en tres niveles",
    para: "La misma actividad con tres andamios y una rúbrica común, para el grupo real.",
    donde: "Copilot Chat (con tu ficha pegada antes)",
    texto: `# Rol
Eres un docente experto en grupos muy diversos de [ETAPA Y MATERIA].
# Contexto
Arriba tienes la ficha de mi materia o módulo.
Trabajamos [RA O CRITERIO DE EVALUACIÓN, LITERAL]. Tengo [N] minutos.
# Tarea
Dame UNA actividad en tres niveles, no tres actividades: el mismo
enunciado base y la misma idea, con el andamiaje graduado.
# Reglas
1) Nivel 1: pasos guiados y datos dados. Nivel 2: el estándar.
   Nivel 3: abierto, con una decisión que haya que justificar.
2) Los tres se corrigen con LA MISMA rúbrica: nadie es de segunda.
3) Solo material que tengo según la ficha.
# Formato
Enunciado base · los tres niveles · rúbrica común (3 criterios,
4 niveles cada uno) · qué observo para saber si lo entienden.
# Control
Dime qué parte fallaría si el grupo llega más flojo que en la ficha.`,
  },
  {
    id: "s1-revisar",
    sesion: 1,
    momento: "empezar",
    titulo: "Que la IA te señale lo dudoso",
    para: "Antes de usar una respuesta, que te diga qué comprobar.",
    donde: "Copilot Chat (en la misma conversación, tras la respuesta)",
    texto: `Revisa tu última respuesta como si fueras un compañero exigente:
1) ¿Qué datos, cifras, normas o referencias podrían ser falsos o inventados? Márcalos.
2) ¿Qué has supuesto sobre mi grupo que yo no te he dicho?
3) ¿Qué parte no encaja con el tiempo o el material que te he dado?
No reescribas nada todavía: solo la lista, de lo más grave a lo menos.`,
  },
];

/** Busca un prompt de la sesión por su id (falla en compilación si no existe). */
export function p1(id: string): PromptSeminario {
  const p = PROMPTS_S1.find((x) => x.id === id);
  if (!p) throw new Error(`No existe el prompt ${id}`);
  return p;
}
