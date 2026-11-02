import type { PromptSeminario } from "../_datos";

// Prompts de la sesión 5. Los huecos van [EN MAYÚSCULAS]; los de la cadena
// real del cuaderno de evaluación están en tu-herramienta/cadena.ts.

export const PROMPTS_S5: PromptSeminario[] = [
  {
    id: "s5-agents-md",
    sesion: 5,
    momento: "herramienta",
    titulo: "Tu AGENTS.md a partir de tu ficha",
    para: "Convertir la ficha de la sesión 1 en la memoria del proyecto que lee el agente.",
    donde: "Copilot Chat",
    texto: `Te paso la ficha de mi materia o módulo y el encargo de mi herramienta.
Escríbeme un fichero AGENTS.md de menos de 30 líneas, en castellano, con cuatro apartados:
1. Qué es: la herramienta en dos frases.
2. Quién la usa: yo y mi contexto (etapa, materia o módulo), sin datos de alumnado.
3. Reglas que no se rompen: un único index.html sin librerías ni internet; datos solo en el navegador; accesible con teclado; modo claro y oscuro; en castellano.
4. Cómo trabajar: antes de un cambio grande, explica el plan; haz solo lo que se pide; no borres ficheros ni salgas de la carpeta.

Mi ficha:
[PEGA AQUÍ TU FICHA]

Mi encargo:
[PEGA AQUÍ EL ENCARGO DE LA SESIÓN 4]`,
  },
  {
    id: "s5-encargo",
    sesion: 5,
    momento: "herramienta",
    titulo: "El encargo de tu herramienta, en seis bloques",
    para: "La plantilla que convierte tu idea en una petición que un agente puede construir de una vez.",
    donde: "OpenCode (agente Plan)",
    texto: `# Rol
Eres desarrollador de aplicaciones web educativas y conoces [TU ETAPA: FP / ESO / BACHILLERATO] de la Comunitat Valenciana.

# Contexto
Soy docente de [MATERIA O MÓDULO]. Hoy [CÓMO LO HACES AHORA] y pierdo tiempo porque [QUÉ FALLA].
[SI HAY DATOS DEL ALUMNADO: «Son datos de mi alumnado: no pueden salir de mi ordenador.»]

# Tarea
Crea «[NOMBRE DE LA HERRAMIENTA]» en un único index.html, con estas pantallas:
1. [PANTALLA 1: QUÉ SE HACE EN ELLA]
2. [PANTALLA 2]
3. [PANTALLA 3]

# Reglas
- [CÓMO SE CALCULA O SE DECIDE CADA COSA, CON NÚMEROS]
- Guardar solo en localStorage. Exportar e importar una copia en JSON.
- [LO QUE NO DEBE HACER NUNCA]
- Sigue las reglas de AGENTS.md.

# Formato
Un solo fichero index.html en esta carpeta. Al acabar, explícame en cinco líneas cómo se usa y qué has decidido tú por tu cuenta.

# Control
Antes de terminar, comprueba con un ejemplo pequeño ([EJEMPLO CON DATOS INVENTADOS]) que funciona, y dime qué parte podría fallar con datos reales.`,
  },
  {
    id: "s5-plan",
    sesion: 5,
    momento: "herramienta",
    titulo: "Plan primero, sin tocar nada",
    para: "Que el agente te cuente qué va a hacer y qué dudas tiene antes de escribir una línea.",
    donde: "OpenCode (agente Plan)",
    texto: `Lee AGENTS.md. Te paso el encargo de mi herramienta. Todavía no escribas nada: dame tu plan en pocas líneas (pantallas, cómo guardarás los datos y cómo harás los cálculos) y las dudas que tengas.

[PEGA AQUÍ TU ENCARGO EN SEIS BLOQUES]`,
  },
  {
    id: "s5-adelante",
    sesion: 5,
    momento: "herramienta",
    titulo: "Responde las dudas y da luz verde",
    para: "Cerrar el plan con tus decisiones y que el agente Build construya la primera versión.",
    donde: "OpenCode (agente Build)",
    texto: `Respuestas a tus dudas: 1) [TU RESPUESTA]. 2) [TU RESPUESTA]. 3) [TU RESPUESTA].
[SI ALGO DEL PLAN NO TE CONVENCE: «Cambia esto: …»]
Adelante: construye el index.html siguiendo el plan.`,
  },
  {
    id: "s5-pruebas",
    sesion: 5,
    momento: "herramienta",
    titulo: "Diez pruebas del alumno más trasto",
    para: "Una lista de comprobación para encontrar los fallos antes de usarla con datos de verdad.",
    donde: "OpenCode (agente Plan) o Copilot Chat",
    texto: `Esta es mi herramienta: [DESCRÍBELA EN DOS FRASES O ADJUNTA EL index.html].
Dame diez pruebas que haría el usuario más trasto para romperla: datos vacíos, números fuera de rango, texto donde va un número, pesos que no suman, recargar la página, importar un fichero equivocado…
Para cada prueba: qué hago, qué debería pasar y qué sería un fallo. No cambies nada.`,
  },
  {
    id: "s5-un-fallo",
    sesion: 5,
    momento: "herramienta",
    titulo: "Un fallo, una petición",
    para: "La forma de pedir un arreglo que el agente entiende a la primera.",
    donde: "OpenCode (agente Build)",
    texto: `He probado [PANTALLA O BOTÓN] y hay un fallo:
- Hago esto: [LO QUE HACES, PASO A PASO].
- Pasa esto: [LO QUE VES].
- Esperaba esto: [LO QUE DEBERÍA PASAR].
Arregla solo esto y dime qué has cambiado.`,
  },
  {
    id: "s5-mejora",
    sesion: 5,
    momento: "herramienta",
    titulo: "Una mejora cada vez",
    para: "Añadir una función nueva sin que el agente toque lo que ya funciona.",
    donde: "OpenCode (agente Build)",
    texto: `Quiero añadir una sola cosa: [LA MEJORA, EN UNA FRASE].
Para qué me sirve: [EL MOMENTO DE CLASE EN QUE LA USARÉ].
No cambies nada de lo que ya funciona. Antes de tocar el fichero, dime en tres líneas cómo lo vas a hacer.`,
  },
  {
    id: "s5-explicame",
    sesion: 5,
    momento: "herramienta",
    titulo: "Explícame cómo calcula, sin código",
    para: "Entender lo que firmas: cómo llega tu herramienta a cada número.",
    donde: "OpenCode (agente Plan)",
    texto: `Explícame, como a un docente que no programa y sin enseñarme código, cómo calcula [LA NOTA FINAL / LO QUE SEA] la herramienta.
Hazlo con un ejemplo con números inventados y dime en qué casos el resultado podría sorprenderme.`,
  },
  {
    id: "s5-plan-b",
    sesion: 5,
    momento: "herramienta",
    titulo: "Plan B: el HTML completo desde Copilot Chat",
    para: "Si tu ordenador no te deja instalar nada: la herramienta sale de Copilot y la guardas tú.",
    donde: "Copilot Chat",
    texto: `[PEGA AQUÍ TU ENCARGO EN SEIS BLOQUES]

Dame el fichero index.html COMPLETO en un único bloque de código, de principio a fin, sin resumir ni cortar nada y sin explicaciones entre medias.
Si no cabe en una respuesta, dímelo antes de empezar y quita funciones hasta que quepa.`,
  },
];
