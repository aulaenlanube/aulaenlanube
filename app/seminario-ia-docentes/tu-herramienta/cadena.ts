import type { Tono } from "@/app/programacion-ia/_video/piezas";

// La cadena REAL de mensajes con la que OpenCode 2.2.5 (modelo gratuito GLM-5.3-Flash Free) construyó la plataforma
// «Mi módulo» el 7 de noviembre de 2026, en su interfaz (la de la app de escritorio). El texto de cada mensaje es literal
// (sale de la API de OpenCode) y el tiempo, del propio servidor. «paso» resume la respuesta del agente y «probamos», lo
// que comprobamos después con datos conocidos. Generado por 05-tu-plataforma/scripts/cadena_ts.py: no lo edites a mano.

export const REPO = "https://github.com/aulaenlanube/mi-modulo";

export type Mensaje = {
  n: number;
  clave: string;
  titulo: string;
  agente: "Plan" | "Build";
  version: string;
  texto: string;
  paso: string;
  probamos: string;
  tiempo: string;
  /** Cambios en ficheros aprobados con «Permitir una vez». */
  permisos: number;
};

export const CADENA: Mensaje[] = [
  {
    n: 1,
    clave: "plan",
    titulo: "El plan de la fase 1, sin tocar nada",
    agente: "Plan",
    version: "plan",
    texto: `Lee AGENTS.md y encargo.md. Todavía no escribas nada: dame tu plan para la fase 1 en pocas líneas (pantallas, cómo guardarás los datos para que quepan las fases siguientes y cómo leerás el currículo pegado del BOE) y las dudas que tengas. En curriculo-montaje.txt tienes el currículo real de mi módulo para probar.`,
    paso: "En 22 segundos: tres pantallas (Inicio, Currículo y Unidades), un único objeto de datos con sitio reservado para las fases siguientes y la lectura del BOE línea a línea. Y cuatro dudas: cómo repartir los pesos, si las horas bloquean algo, qué avisos quiero en Inicio y qué hacer al importar.",
    probamos: "Leímos el plan entero. En él contaba «59…» criterios: el currículo tiene 60. Una cifra que da la IA, la comprueba quien la usa.",
    tiempo: "22 s",
    permisos: 0,
  },
  {
    n: 2,
    clave: "adelante",
    titulo: "Luz verde, con las dudas resueltas",
    agente: "Build",
    version: "v1",
    texto: `Respuestas a tus dudas:
1) Pesos: al pegar el currículo, reparte 100 a partes iguales, con un decimal, y ajusta el último para que sumen exactamente 100. Luego yo los cambio.
2) Horas: solo avisa si no suman 224; no bloquees nada. Sí, las fechas llegan con Calendario.
3) Inicio: que cada aviso lleve un botón que me lleve a la pantalla donde se arregla.
4) Importar: enséñame antes qué trae la copia (módulo, RA, CE y unidades) y pide confirmación.
Adelante: construye el index.html de la fase 1 siguiendo el plan. Al acabar, comprueba con curriculo-montaje.txt cuántos RA y CE salen y dímelo.`,
    paso: "Escribió un index.html de 35 KB con las tres pantallas y la copia en JSON, y lo comprobó con el currículo real: 8 RA y 60 CE, ignorando el título, el código y «Duración: 130 horas». Los pesos, repartidos para que cada RA sume exactamente 100.",
    probamos: "El currículo, perfecto. Pero «abc» en un peso guardaba un 0 sin avisar, un 150 se guardaba como 100, dejaba crear una unidad de −20 horas y la consola daba un error en rojo al cambiar de pestaña.",
    tiempo: "6 min 00 s",
    permisos: 13,
  },
  {
    n: 3,
    clave: "numeros",
    titulo: "Que un número no válido no cambie nada",
    agente: "Build",
    version: "v2",
    texto: `He probado la pantalla Currículo como el alumno más trasto y hay un fallo que me puede estropear los pesos sin darme cuenta:
- Si escribo «abc» en el peso de un CE, se guarda un 0.
- Si escribo 150, se guarda un 100; y si escribo −5, un 0.
- Con las horas del módulo pasa igual («abc» se guarda como 0), y en Unidades me deja crear una unidad de −20 horas.
Quiero que un número no válido no cambie nada en silencio: la casilla se marca en rojo, sale un aviso que dice qué está mal y se conserva el valor anterior. Arregla solo esto y dime qué has cambiado.`,
    paso: "Cambió la función que «traducía» cualquier texto a número por una que valida y avisa en las cinco casillas numéricas. Al acabar quiso ejecutar una orden para comprobarlo; la denegamos y se detuvo («Interrumpido»).",
    probamos: "Denegar una orden no rompe nada: el agente se para y espera.",
    tiempo: "2 min 03 s",
    permisos: 8,
  },
  {
    n: 4,
    clave: "orden",
    titulo: "¿Qué querías comprobar?",
    agente: "Build",
    version: "v2",
    texto: `He denegado la orden porque no la entendía. ¿Qué querías comprobar con ella? Si solo lee index.html para revisar que no hay errores, adelante. Y al acabar, dime qué has cambiado.`,
    paso: "Explicó la orden en lenguaje llano: solo leía index.html para buscar errores y probaba la validación con los casos del alumno trasto. Con permiso, la ejecutó: los once casos, como se esperaba.",
    probamos: "«abc», 150, −5 y −20: casilla en rojo, el aviso de que «abc» no es un número y el valor anterior se conserva.",
    tiempo: "23 s",
    permisos: 0,
  },
  {
    n: 5,
    clave: "consola",
    titulo: "El error rojo de la consola",
    agente: "Build",
    version: "v3",
    texto: `Otro fallo, este no se ve a simple vista: he abierto la consola del navegador (F12, pestaña Consola) y cada vez que cambio de pestaña sale en rojo:
Uncaught ReferenceError: renderPantalla is not defined
Arregla solo esto y dime qué has cambiado.`,
    paso: "Era una función que nombró en el plan y nunca escribió: al cambiar de pestaña llamaba a renderPantalla, que no existía. La cambió por la de cada pantalla y buscó si quedaba algún fallo igual.",
    probamos: "La consola, limpia al cambiar de pestaña.",
    tiempo: "36 s",
    permisos: 1,
  },
  {
    n: 6,
    clave: "cuaderno",
    titulo: "Pantalla nueva: Cuaderno",
    agente: "Build",
    version: "v4",
    texto: `Ahora una sola pantalla nueva: Cuaderno. Para qué me sirve: llevar las notas de cada evaluación sin la hoja de cálculo.
- Alumnado: por código (A01, A02…) y, si quiero, un nombre de pila. Con un aviso visible: los datos solo están en este navegador.
- Actividades: nombre, instrumento (examen, práctica, informe…), unidad y qué CE evalúa (uno o varios, de los del currículo).
- Notas: tabla alumnado × actividades, de 0 a 10. Una casilla vacía es «no evaluado», no un cero. Una nota no válida no cambia nada en silencio, como en los pesos.
- Resultados: nota de cada CE = media de las actividades que lo evalúan; nota de cada RA = media ponderada de sus CE con nota; nota final = media ponderada de los RA con nota. Lo no evaluado no cuenta y se avisa. Un decimal, sin redondeos escondidos. Y exportar los resultados en CSV que abra bien mi hoja de cálculo.
No cambies nada de lo que ya funciona. Antes de tocar el fichero, dime en tres líneas cómo lo vas a hacer. Al acabar, comprueba las cuentas con un ejemplo pequeño inventado y enséñamelo.`,
    paso: "Alumnado por código, actividades con los CE que evalúan, notas de 0 a 10 (vacía = no evaluado), resultados por RA y final y CSV para la hoja de cálculo. Comprobó las cuentas con un ejemplo inventado y, de paso, arregló un fallo suyo que habría borrado al alumno equivocado.",
    probamos: "Con la calculadora, A01 daba 7,75 y la plataforma, 7,9. Al volver a Currículo, los pesos de los RA que cambiamos estaban otra vez en 12,5.",
    tiempo: "4 min 55 s",
    permisos: 11,
  },
  {
    n: 7,
    clave: "calculadora",
    titulo: "La cuenta no cuadra con la calculadora",
    agente: "Build",
    version: "v5",
    texto: `He comprobado las notas con la calculadora y no cuadran:
- Hago esto: en Currículo pongo los pesos de los RA a 15, 20, 10, 15, 10, 5, 10 y 15. A01 tiene RA1 = 7,0, RA2 = 7,5, RA3 = 9,0 y RA8 = 8,0.
- Pasa esto: la nota final sale 7,9. Y si vuelvo a Currículo, los pesos de los RA están otra vez en 12,5: el cambio no se guarda y no avisa de nada.
- Esperaba esto: (7 × 15 + 7,5 × 20 + 9 × 10 + 8 × 15) / 60 = 7,75, o sea, 7,8.
Arregla solo esto y dime qué has cambiado.`,
    paso: "Encontró la causa: la casilla del peso del RA se reconstruía después de conectarla y no estaba conectada a nada, así que el cambio no se guardaba y no avisaba. Lo arregló y repitió nuestro caso: 7,8.",
    probamos: "Los pesos se guardan y las tres notas de prueba (7,8 · 5,5 · 5,8) coinciden con nuestro cálculo independiente.",
    tiempo: "50 s",
    permisos: 1,
  },
  {
    n: 8,
    clave: "calendario",
    titulo: "Pantalla nueva: Calendario",
    agente: "Build",
    version: "v6",
    texto: `Ahora una sola pantalla nueva: Calendario. Para qué me sirve: saber qué día empieza y acaba cada unidad, con los festivos de verdad.
- Horario: las horas de clase de cada día, de lunes a viernes.
- Curso: fecha de inicio y de fin, y los días sin clase: festivos sueltos y periodos como Navidad o Pascua, cada uno con su nombre.
- Evaluaciones: nombre y fecha de fin de cada una.
- Temporalización: reparte las unidades, en orden y con sus horas, sobre los días reales de clase. De cada unidad: fecha de inicio, fecha de fin y evaluación en la que acaba. Un festivo quita solo las horas de ese día, no la semana entera.
- Avisos: si las horas de las unidades no caben en el curso o si una unidad empieza en una evaluación y acaba en otra. Y un resumen: horas reales de clase del curso frente a las del módulo.
No cambies nada de lo que ya funciona. Antes de tocar el fichero, dime en tres líneas cómo lo vas a hacer. Al acabar, comprueba el caso del encargo con calendario-2026-27.txt, que es el calendario oficial: 7 horas a la semana (lunes 2, martes 3 y jueves 2) y el festivo del martes 8 de diciembre.`,
    paso: "Horario, curso, días sin clase, evaluaciones y la temporalización. Su propia prueba con el calendario oficial destapó un fallo: por el cambio de hora de octubre, el festivo del martes 8/12 contaba como día de clase. Lo arregló comparando días y no horas.",
    probamos: "249 horas reales del 9/9/2026 al 18/6/2027. Las ocho unidades empiezan y acaban en las mismas fechas que en nuestro cálculo día a día, con dos avisos: UT4 y UT7 cruzan de evaluación.",
    tiempo: "12 min 02 s",
    permisos: 18,
  },
  {
    n: 9,
    clave: "rubricas",
    titulo: "Pantalla nueva: Rúbricas",
    agente: "Build",
    version: "v7",
    texto: `Ahora una sola pantalla nueva: Rúbricas. Para qué me sirve: tener la rúbrica de cada CE a mano, enseñársela al alumnado antes de la tarea y corregir con ella.
- Una rúbrica por CE, con subcriterios (cada uno con su peso, que suman 100) y cuatro niveles: Insuficiente, En desarrollo, Competente y Excelente. Cada nivel, con su descriptor y su nota (por defecto 2,5, 5, 7,5 y 10).
- Avisos: un descriptor vacío o unos pesos que no suman 100.
- Imprimir una rúbrica en limpio, o todas las de una unidad.
- En el Cuaderno, si la actividad evalúa un CE que tiene rúbrica, que pueda corregir eligiendo el nivel de cada subcriterio y que la nota se calcule sola (la media ponderada de los niveles), enseñando la cuenta.
No cambies nada de lo que ya funciona. Antes de tocar el fichero, dime en tres líneas cómo lo vas a hacer. Al acabar, comprueba con un ejemplo inventado que la nota con rúbrica sale igual que a mano.`,
    paso: "Una rúbrica por CE con subcriterios y cuatro niveles, avisos, impresión y «Corregir con rúbrica» en el Cuaderno, enseñando la cuenta. Detectó que su código nuevo pisaba una función de la fase 1 (la de los pesos de los CE) y la renombró.",
    probamos: "Al pulsar «Crear la rúbrica de RA2.h» no aparecía nada, y en la consola: «pareja is not defined». El cambio de nombre había dejado un cabo suelto.",
    tiempo: "7 min 05 s",
    permisos: 20,
  },
  {
    n: 10,
    clave: "pareja",
    titulo: "Crear la rúbrica no hace nada",
    agente: "Build",
    version: "v8",
    texto: `He probado Rúbricas: elijo el CE RA2.h, pulso «Crear la rúbrica de RA2.h» y no aparece nada. En la consola (F12) sale en rojo:
Uncaught ReferenceError: pareja is not defined
Arregla solo esto y dime qué has cambiado. Y repasa todo lo que tocaste al cambiar el nombre de aquella función, por si queda otro fallo igual.`,
    paso: "Arregló la variable que se quedó fuera de sitio y repasó las nueve apariciones de la función renombrada.",
    probamos: "Ya se creaba la rúbrica, pero al pulsar «Añadir subcriterio» el editor desaparecía, con otro error rojo en la consola.",
    tiempo: "1 min 02 s",
    permisos: 1,
  },
  {
    n: 11,
    clave: "subcriterio",
    titulo: "«Añadir subcriterio» rompe el editor",
    agente: "Build",
    version: "v9",
    texto: `Ya se crea la rúbrica, pero al pulsar «Añadir subcriterio» desaparece el editor. En la consola sale en rojo:
Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
Arregla solo esto. Y antes de decirme que está, repasa paso a paso el recorrido entero que haré yo, botón a botón: crear la rúbrica de RA2.h, añadir tres subcriterios con su peso y sus descriptores, imprimirla y, en el Cuaderno, corregir una actividad con ella. Dime qué has cambiado.`,
    paso: "Dijo que lo había arreglado y que había repasado el recorrido entero, botón a botón.",
    probamos: "Seguía igual: mismo error. Su arreglo buscaba el campo en la página antes de que el campo estuviera en ella.",
    tiempo: "1 min 57 s",
    permisos: 4,
  },
  {
    n: 12,
    clave: "otra-vez",
    titulo: "Sigue igual: el error entero",
    agente: "Build",
    version: "v10",
    texto: `Sigue igual: al pulsar «Añadir subcriterio» desaparece el editor. La consola lo dice entero:
Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
    at bloqueSubcriterio (index.html:1909:15)
    at editorRubrica (index.html:1854:23)
    at renderRubricas (index.html:1765:20)
No me digas que está arreglado hasta que hayas leído esas líneas y entiendas por qué ahí no encuentra el campo. Arregla solo esto y dime qué has cambiado.`,
    paso: "Con el error completo y sus líneas, lo entendió: buscaba el campo en la página cuando aún estaba en un trozo sin colgar. Lo buscó donde de verdad estaba y explicó por qué su arreglo anterior no podía funcionar.",
    probamos: "El recorrido entero: rúbrica de RA2.h con tres subcriterios (40/35/25), y en el Cuaderno, Competente, Excelente y En desarrollo: «(7,5×40 + 10×35 + 5×25) / 100 = 7,8», aplicada a la nota.",
    tiempo: "1 min 04 s",
    permisos: 2,
  },
  {
    n: 13,
    clave: "preguntas",
    titulo: "Pantalla nueva: Preguntas",
    agente: "Build",
    version: "v11",
    texto: `Ahora una sola pantalla nueva: Preguntas. Para qué me sirve: tener un banco de preguntas por CE y subirlo a Aules sin pelearme con el formato.
- Cada pregunta: el CE que evalúa, el tipo (test con una correcta y tres distractores, verdadero o falso, o respuesta corta), el enunciado, las respuestas y una retroalimentación opcional.
- Filtrar por RA, por CE o por unidad, y ver cuántas preguntas tiene cada CE.
- Exportar a GIFT las que elija, con una categoría por RA y escapando bien los caracteres especiales de GIFT (~ = # { } :). El verdadero o falso, con {T} o {F}.
- Importar un GIFT pegado (lo que me da Copilot): lo que entienda, al banco; lo que no, que avise de qué pregunta falla y por qué, sin inventar nada. Por ejemplo, un verdadero o falso escrito {=TRUE ~FALSE} es en realidad una de opción múltiple: que lo avise.
No cambies nada de lo que ya funciona. Antes de tocar el fichero, dime en tres líneas cómo lo vas a hacer. Al acabar, exporta tres preguntas de ejemplo y enséñame el GIFT.`,
    paso: "Planteó la pantalla en tres líneas y la escribió en casi diez minutos: banco por CE, filtros, exportación GIFT con una categoría por RA e importación con avisos. A mitad de su propio repaso, OpenCode cortó: «Límite gratuito alcanzado».",
    probamos: "El uso gratuito es por día y común a todos los modelos gratis: DeepSeek tampoco respondía. Se renovaba a las 1:58 del día siguiente.",
    tiempo: "9 min 50 s",
    permisos: 18,
  },
];

export const VERSIONES_MM: { v: string; que: string; detalle: string; tono: Tono }[] = [
  { v: "plan", que: "El plan de la fase 1", detalle: "22 s · tres pantallas y cuatro dudas", tono: "morado" },
  { v: "v1", que: "Inicio, Currículo y Unidades", detalle: "6 min · 8 RA y 60 CE del BOE", tono: "azul" },
  { v: "v2", que: "«abc» ya no se guarda como 0", detalle: "alumno trasto · y una orden denegada", tono: "rosa" },
  { v: "v3", que: "La consola, limpia", detalle: "una función que nunca escribió", tono: "rosa" },
  { v: "v4", que: "Pantalla Cuaderno", detalle: "notas por CE, RA y final, y CSV", tono: "verde" },
  { v: "v5", que: "El peso del RA se guarda", detalle: "la calculadora: 7,9 era 7,8", tono: "rosa" },
  { v: "v6", que: "Pantalla Calendario", detalle: "festivos reales y el cambio de hora", tono: "verde" },
  { v: "v7", que: "Pantalla Rúbricas", detalle: "y corregir con rúbrica en el Cuaderno", tono: "verde" },
  { v: "v8 a v10", que: "El editor de la rúbrica", detalle: "dos errores de consola; a la tercera, con el error entero", tono: "rosa" },
  { v: "v11", que: "Pantalla Preguntas", detalle: "cortada por el límite gratuito del día", tono: "ambar" },
];
