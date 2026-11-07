import type { PromptSeminario } from "../_datos";

// Prompts de la sesión 5. Los huecos van [EN MAYÚSCULAS]; los mensajes reales
// con los que OpenCode construyó la plataforma «Mi módulo» están en
// tu-herramienta/cadena.ts (y en github.com/aulaenlanube/mi-modulo).

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
    titulo: "El encargo de tu plataforma, por fases",
    para: "La plantilla de la sesión 4 con una sección más: describes el todo y lo construyes por partes.",
    donde: "encargo.md, en la carpeta de OpenCode",
    texto: `# Encargo: [NOMBRE DE TU PLATAFORMA]

## El problema
[QUÉ TE HACE PERDER TIEMPO HOY, CON UN EJEMPLO REAL]

## Quién la usa y dónde
[TÚ, TU DEPARTAMENTO…] · [ORDENADOR DEL CENTRO, EL TUYO…]

## Qué entra
[CURRÍCULO, PESOS, HORARIO, CALENDARIO, NOTAS POR CÓDIGO…]

## Qué sale
[TEMPORALIZACIÓN, NOTAS, RÚBRICAS, GIFT PARA AULES, PROMPTS…]

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
1. [UNA PRUEBA CON NÚMEROS]
2. [OTRA]
3. [OTRA]

## Por fases
Primero la fase 1, y esperas a que la pruebe: [LAS PANTALLAS BÁSICAS].
Después, una pantalla por mensaje.`,
  },
  {
    id: "s5-plan",
    sesion: 5,
    momento: "herramienta",
    titulo: "Plan primero, sin tocar nada",
    para: "Que el agente te cuente qué va a hacer y qué dudas tiene antes de escribir una línea.",
    donde: "OpenCode (agente Plan)",
    texto: `Lee AGENTS.md y encargo.md. Todavía no escribas nada: dame tu plan para la fase 1 en pocas líneas (pantallas, cómo guardarás los datos para que quepan las fases siguientes y cómo leerás [LO QUE PEGARÁS: EL CURRÍCULO, UNA LISTA…]) y las dudas que tengas. En [FICHERO DE EJEMPLO] tienes [DATOS REALES] para probar.`,
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
    titulo: "Una pantalla nueva cada vez",
    para: "Hacer crecer la plataforma sin que el agente toque lo que ya funciona.",
    donde: "OpenCode (agente Build)",
    texto: `Ahora una sola pantalla nueva: [NOMBRE]. Para qué me sirve: [EL MOMENTO DEL CURSO EN QUE LA USARÉ].
- [LO QUE ENTRA EN ELLA]
- [LO QUE CALCULA O DECIDE, CON NÚMEROS]
- [LO QUE SALE: IMPRIMIR, EXPORTAR…]
No cambies nada de lo que ya funciona. Antes de tocar el fichero, dime en tres líneas cómo lo vas a hacer. Al acabar, comprueba [UNA PRUEBA CON NÚMEROS] y enséñamelo.`,
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
    id: "s5-consola",
    sesion: 5,
    momento: "herramienta",
    titulo: "El error rojo de la consola",
    para: "Los fallos que no se ven en pantalla: los copias de la consola (F12) y se los pegas al agente.",
    donde: "OpenCode (agente Build)",
    texto: `Otro fallo, este no se ve a simple vista: he abierto la consola del navegador (F12, pestaña Consola) y al [LO QUE HACES] sale en rojo:
[PEGA AQUÍ EL TEXTO ROJO ENTERO, CON SUS LÍNEAS]
Arregla solo esto y dime qué has cambiado.`,
  },
  {
    id: "s5-calculadora",
    sesion: 5,
    momento: "herramienta",
    titulo: "La cuenta no cuadra con la calculadora",
    para: "Cuando una nota o una suma no sale como a mano: los números delante, para que el agente encuentre la causa.",
    donde: "OpenCode (agente Build)",
    texto: `He comprobado [UNA NOTA O UNA CUENTA] con la calculadora y no cuadra:
- Hago esto: [LOS DATOS QUE PONGO].
- Pasa esto: [LO QUE SALE].
- Esperaba esto: [TU CUENTA, CON LOS NÚMEROS].
Arregla solo esto y dime qué has cambiado.`,
  },
  {
    id: "s5-orden",
    sesion: 5,
    momento: "herramienta",
    titulo: "Si no entiendes una orden, pregunta",
    para: "Cuando pide ejecutar algo que no entiendes: Denegar, y que te lo explique antes de seguir.",
    donde: "OpenCode (agente Build)",
    texto: `He denegado la orden porque no la entendía. ¿Qué querías comprobar con ella? Si solo lee [EL FICHERO] para revisar que no hay errores, adelante. Y al acabar, dime qué has cambiado.`,
  },
  {
    id: "s5-sesion-nueva",
    sesion: 5,
    momento: "herramienta",
    titulo: "Seguir otro día, en una sesión nueva",
    para: "Cuando la conversación se hace larga: una sesión nueva que retoma la plataforma gracias a AGENTS.md.",
    donde: "OpenCode (agente Plan)",
    texto: `Lee AGENTS.md y mira index.html: es mi plataforma y ya tiene [LAS PANTALLAS QUE TIENE]. Vamos a seguir donde lo dejamos. No cambies nada todavía: dime en cinco líneas qué tiene, cómo guarda los datos y qué tendrás en cuenta para no romper nada.`,
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
