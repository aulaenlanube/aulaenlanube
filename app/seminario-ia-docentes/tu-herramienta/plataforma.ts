// Ficheros reales de la plataforma «Mi módulo» (sesión 5), copiados tal cual de la carpeta donde OpenCode 2.2.5
// (GLM-5.3-Flash Free) la construyó el 7-11-2026. La sesión 5, «Tu herramienta» y el repositorio público
// (github.com/aulaenlanube/mi-modulo) usan los mismos: nunca se contradicen.
// Se descargan desde public/seminario-ia-docentes/herramientas/mi-modulo/.

export const AGENTS_MM = String.raw`
# Mi módulo · plataforma de preparación

## Qué es
Una plataforma web para preparar y llevar un módulo de FP durante todo el curso: currículo, unidades,
calendario, rúbricas, cuaderno de evaluación, banco de preguntas para Aules y prompts para Copilot.

## Quién la usa
Docentes de FP de la Comunitat Valenciana. Mi caso: 1.º de SMR, Montaje y mantenimiento de equipos
(224 horas, 7 a la semana). Evalúo por criterios: cada RA pesa en la nota final y cada CE pesa dentro de su RA.
No sé programar: todo lo que vea tiene que entenderse sin explicaciones.

## Reglas que no se rompen
- Un único fichero: index.html, con el HTML, el CSS y el JavaScript dentro.
- Sin librerías, sin CDN y sin internet: tiene que funcionar abriéndolo con doble clic.
- Los datos solo se guardan en este navegador (localStorage), con copia en JSON. Nada se envía a ningún sitio.
- Al alumnado se le identifica por código (A01, A02…). Nunca se piden datos de salud.
- Todo en castellano. Notas de 0 a 10 con coma decimal. Fechas en formato dd/mm/aaaa.
- Accesible: cada campo con su etiqueta, se maneja con el teclado, buen contraste y modo claro y oscuro.

## Cómo trabajar
- Antes de un cambio grande, explica tu plan en cinco líneas.
- Haz solo lo que se pide en cada mensaje y di qué has cambiado.
- No rompas lo que ya funciona: los datos guardados con una versión anterior se tienen que seguir leyendo.
- No borres ficheros ni salgas de esta carpeta.
`.trim();

export const ENCARGO_MM = String.raw`
# Encargo: Mi módulo, la plataforma de preparación de mi módulo

## El problema
Cada curso preparo el módulo con seis documentos que no se hablan: el currículo en un PDF, la programación en un
Word, la temporalización y las notas en dos hojas de cálculo, las rúbricas en otro Word y las preguntas de Aules
sueltas. Si cambio el peso de un RA o muevo una unidad, lo toco todo a mano y siempre se escapa algo: un CE que no
trabajo en ninguna unidad, una semana con festivo que conté entera o unos pesos que ya no suman 100.

## Quién la usa y dónde
Yo, en el ordenador del centro y en el mío. Y mis compañeros, cada uno con su módulo.

## Qué entra
- El currículo del módulo pegado tal cual del BOE: RA numerados («1. Selecciona…») y CE con letra («a) Se han…»).
- El peso de cada RA y de cada CE, las horas del módulo y las horas de clase de cada día de la semana.
- El calendario escolar: inicio, fin, festivos y el final de cada evaluación.
- Mis unidades, actividades, rúbricas y preguntas, y las notas del alumnado por código.

## Qué sale
- La temporalización con las fechas reales de cada unidad.
- La cobertura: qué CE trabaja cada unidad y cuáles no se trabajan en ninguna.
- La nota de cada CE, de cada RA y la final, y un CSV para mi hoja de cálculo.
- Rúbricas para imprimir, un fichero GIFT para importar en Aules y prompts para mi asistente de Copilot.

## Pantallas
1. Inicio: el estado del módulo de un vistazo y los avisos.
2. Currículo: RA y CE con sus pesos (se pegan del BOE).
3. Unidades: unidades de trabajo con sus horas y los CE que trabajan.
4. Calendario: horario, festivos, evaluaciones y la temporalización.
5. Rúbricas: una rúbrica de cuatro niveles por CE.
6. Cuaderno: alumnado, actividades, notas y resultados.
7. Preguntas: banco de preguntas por CE y exportación a GIFT para Aules.
8. Prompts: encargos para Copilot rellenados con los datos del módulo.

## Reglas fijas
- Un solo fichero index.html que funciona sin internet.
- Los datos se guardan solo en este navegador, con botones para exportar e importar una copia.
- Nada se envía a ningún servidor.
- Letra grande, buen contraste y se maneja con el teclado.
- Toda la interfaz en castellano.

## Qué NO hace
- No decide notas: calcula lo que yo defino y enseña cómo.
- No guarda datos de salud ni nombres completos del alumnado.
- No se conecta a ninguna IA: los prompts los copio yo en Copilot.
- No tiene usuarios ni contraseñas.

## Cómo sabré que funciona
1. Pego el currículo de Montaje (8 RA) y salen los 8 RA con todos sus CE, sin perder ni uno.
2. Con 224 horas, 7 a la semana y un festivo en martes, la temporalización descuenta ese día y no la semana entera.
3. Con dos alumnos inventados, la nota de cada CE, de cada RA y la final sale igual que con la calculadora.
4. En el GIFT, el verdadero o falso sale con {T} o {F}, como pide Aules.

## Por fases
Primero la fase 1, y esperas a que la pruebe: Inicio, Currículo y Unidades, con la copia en JSON.
Después, una pantalla por mensaje.
`.trim();
