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
  {
    n: 14,
    clave: "sesion-nueva",
    titulo: "Sesión nueva, con el modelo del instituto",
    agente: "Plan",
    version: "v11",
    texto: `Lee AGENTS.md y mira index.html: es mi plataforma y ya tiene Inicio, Currículo, Unidades, Calendario, Rúbricas y Cuaderno. La pantalla Preguntas se quedó a medias: al modelo gratuito se le acabó el uso del día mientras la construía. No cambies nada todavía: dime en cinco líneas qué tiene la plataforma, cómo guarda los datos y qué parte de Preguntas está hecha y cuál falta.`,
    paso: "Con el Qwen 3.8 del servidor del instituto, el agente Plan leyó AGENTS.md y el fichero en 92 segundos: qué tiene la plataforma, cómo guarda los datos y por qué falla Preguntas: los distractores se guardan con un nombre y se buscan con otro, y las preguntas importadas sin CE desaparecen del banco.",
    probamos: "Su diagnóstico explicaba el error rojo que habíamos visto en la consola al añadir una pregunta. Sin repetirle nada: AGENTS.md y el fichero le bastaron.",
    tiempo: "1 min 31 s",
    permisos: 0,
  },
  {
    n: 15,
    clave: "preguntas-fallo",
    titulo: "Preguntas: el banco no enseña nada",
    agente: "Build",
    version: "v12",
    texto: `De acuerdo con tu diagnóstico. Yo, al probarla, veo esto:
- Añado una pregunta de test y pulso «Añadir pregunta al banco»: se guarda, pero el banco no la enseña. La consola dice:
Uncaught TypeError: Cannot set properties of null (setting 'value')
    at rellenarCamposRespuesta (index.html:3175:65)
    at renderTarjetaPregunta (index.html:3294:3)
    at renderPreguntas (index.html:3160:22)
- Como no salen las tarjetas, no puedo marcar ninguna, y «Generar el GIFT de las marcadas» dice que no hay ninguna marcada.
Arregla esto y lo que has encontrado, y termina la pantalla tal como la pedí: exportar a GIFT con una categoría por RA, escapando ~ = # { } :, el verdadero o falso con {T} o {F}, e importar un GIFT pegado avisando de lo que no entienda, como un {=TRUE ~FALSE}. Al acabar, exporta tres preguntas de ejemplo, una de cada tipo, y enséñame el GIFT.`,
    paso: "Arregló las tarjetas del banco (buscaba sus campos antes de que estuvieran en la página) y los distractores que no se guardaban; hizo visibles las preguntas importadas sin CE, limpió el código muerto del corte y probó el GIFT con el código real del fichero. Por el camino le denegamos tres órdenes inofensivas por precaución: se paró cada vez y siguió al decirle que estaban bien.",
    probamos: "El banco ya enseña las tarjetas y se pueden marcar. Pero el GIFT exportado no pasaba un analizador de GIFT: faltaba la línea en blanco tras cada $CATEGORY y entre preguntas. Y el agente había asegurado que lo hacía «como Moodle».",
    tiempo: "7 min 09 s",
    permisos: 11,
  },
  {
    n: 16,
    clave: "gift-blancos",
    titulo: "El GIFT no pasa el analizador",
    agente: "Build",
    version: "v13",
    texto: `He comprobado el GIFT con un analizador de GIFT como el de Moodle, y no lo acepta:
- Hago esto: exporto tres preguntas de RA distintos.
- Pasa esto: después de cada línea $CATEGORY la pregunta va pegada, sin línea en blanco. Moodle separa por líneas en blanco, así que toma la pregunta como parte del nombre de la categoría. Y en tu ejemplo, dos preguntas del RA1 iban seguidas sin línea en blanco entre ellas.
- Esperaba esto: una línea en blanco después de cada $CATEGORY y entre pregunta y pregunta, como pide Moodle. Y al importar, lo mismo: separar por líneas en blanco.
Arregla solo esto y dime qué has cambiado.`,
    paso: "Añadió la línea en blanco tras cada categoría y entre pregunta y pregunta, al exportar y al importar, y lo comprobó exportando e importando de vuelta.",
    probamos: "El analizador lee las tres categorías y las tres preguntas (test, respuesta corta y verdadero o falso con {T}). Los caracteres «: = { } # ~» salen escapados y se recuperan tal cual. Al importar el GIFT de Copilot, avisa del {=TRUE ~FALSE} y rechaza el bloque sin llaves sin tocar el banco.",
    tiempo: "1 min 27 s",
    permisos: 3,
  },
  {
    n: 17,
    clave: "prompts",
    titulo: "Pantalla nueva: Prompts",
    agente: "Build",
    version: "v14",
    texto: `Ahora una sola pantalla nueva: Prompts. Para qué me sirve: pedirle cosas a mi asistente de Copilot sin volver a escribir mi contexto cada vez.
- Elijo una plantilla y una unidad o un CE, y me da el prompt en seis bloques (rol, contexto, tarea, reglas, formato y control) con los datos del módulo ya dentro: módulo y curso, el RA y el CE literales y las horas de la unidad.
- Plantillas: actividad en tres niveles, práctica de taller, rúbrica de un CE, diez preguntas GIFT de un CE (en el formato que entiende la pantalla Preguntas) y comentario de mejora para una actividad.
- Un botón «Copiar». Y nunca mete datos del alumnado.
No cambies nada de lo que ya funciona. Antes de tocar el fichero, dime en tres líneas cómo lo vas a hacer. Al acabar, enséñame el prompt de la rúbrica del CE RA2.h.`,
    paso: "Cinco plantillas (actividad en tres niveles, práctica de taller, rúbrica de un CE, diez preguntas GIFT y comentario de mejora) que se rellenan con el módulo, el RA y el CE literales y las horas de la unidad, con un botón Copiar. Y nunca piden datos del alumnado.",
    probamos: "El prompt de la rúbrica del RA2.h sale en seis bloques, con el texto literal del currículo, los cuatro niveles del seminario y la regla de no inventar datos.",
    tiempo: "5 min 17 s",
    permisos: 12,
  },
  {
    n: 18,
    clave: "ejemplo",
    titulo: "El botón Cargar ejemplo",
    agente: "Build",
    version: "v15",
    texto: `Quiero añadir una sola cosa: un botón «Cargar ejemplo» en Inicio, para que un compañero pruebe la plataforma en un minuto. El ejemplo es mi módulo:
- El currículo de curriculo-montaje.txt, con los RA a 15, 20, 10, 15, 10, 5, 10 y 15.
- El calendario de calendario-2026-27.txt: lunes 2 horas, martes 3 y jueves 2, y las evaluaciones el 18/12/2026, el 24/03/2027 y el 18/06/2027.
- Las ocho unidades de ejemplo-unidades.txt, con sus horas y sus CE.
- Tres alumnos inventados (A01, A02 y A03), tres actividades con sus notas, la rúbrica del CE RA2.h y cinco preguntas.
Si ya hay datos, pide confirmación antes de sustituirlos y recuerda que exporte una copia. No cambies nada de lo que ya funciona.`,
    paso: "Un botón en Inicio que monta el módulo de ejemplo leyendo el currículo y el calendario reales de la carpeta, con las ocho unidades, tres alumnos de muestra con notas, la rúbrica del RA2.h y cinco preguntas, y que avisa antes de sustituir lo guardado.",
    probamos: "Con un clic: 8 RA con sus pesos, 60 CE, 8 unidades, el calendario oficial y las evaluaciones. Y destapó un hueco: Inicio decía «Todo en orden» aunque el Calendario avisaba de dos unidades que cruzan de evaluación.",
    tiempo: "5 min 15 s",
    permisos: 3,
  },
  {
    n: 19,
    clave: "avisos",
    titulo: "Inicio, con los avisos de todas las pantallas",
    agente: "Build",
    version: "v16",
    texto: `En Inicio faltan los avisos de las pantallas nuevas: con el ejemplo cargado dice «Todo en orden de momento», pero el Calendario avisa de que la UT4 y la UT7 empiezan en una evaluación y acaban en otra. Quiero que Inicio recoja los avisos de todas las pantallas (Currículo, Unidades, Calendario, Rúbricas, Cuaderno y Preguntas), cada uno con su botón para ir a arreglarlo. Arregla solo esto y dime qué has cambiado.`,
    paso: "Inicio recoge los avisos de Currículo, Unidades, Calendario, Rúbricas, Cuaderno y Preguntas, cada uno con su botón para ir a arreglarlo.",
    probamos: "Con el ejemplo: las dos unidades que cruzan de evaluación y la casilla de nota que falta, cada una con su botón.",
    tiempo: "4 min 59 s",
    permisos: 3,
  },
  {
    n: 20,
    clave: "detalles",
    titulo: "Cuatro detalles de presentación",
    agente: "Build",
    version: "v17",
    texto: `Cuatro detalles que se ven raros:
- Los desplegables salen con una letra diminuta, y AGENTS.md pide letra grande: que tengan el mismo tamaño que el resto.
- Las unidades salen como «U1 · UT1. El ordenador por dentro», con el código repetido, y en los avisos como «U4, U7»: que el código sea UT1 y no se repita si el nombre ya lo trae.
- En Inicio, el nombre del módulo se sale de su tarjeta.
- En Inicio dice «Quedan 1 casilla de nota sin poner»: con una, «Queda 1 casilla».
Arregla solo esto y dime qué has cambiado.`,
    paso: "Desplegables con la letra del resto, el código de unidad UT1 sin repetirse, el nombre del módulo dentro de su tarjeta y el «Queda 1 casilla».",
    probamos: "Los cuatro, arreglados, y nada más tocado.",
    tiempo: "2 min 46 s",
    permisos: 14,
  },
  {
    n: 21,
    clave: "imprimir",
    titulo: "Imprimir la programación",
    agente: "Build",
    version: "v18",
    texto: `Quiero añadir una sola cosa: un botón «Imprimir la programación» en Unidades. Para qué me sirve: el anexo de mi programación didáctica. Por cada unidad: horas, fechas de inicio y fin, evaluación, los CE que trabaja (con su texto) y las actividades que la evalúan. Al final, una tabla de qué RA se trabaja en cada unidad y el peso de cada RA. Que se imprima limpio, en blanco y negro. No cambies nada de lo que ya funciona.`,
    paso: "Un botón en Unidades que imprime el anexo de la programación didáctica: cada unidad con sus horas, fechas, evaluación, CE literales y actividades, y al final la tabla de RA por unidad con sus pesos, en blanco y negro.",
    probamos: "Con el ejemplo cargado, las ocho unidades con sus fechas reales y sus criterios literales, listo para la programación.",
    tiempo: "2 min 39 s",
    permisos: 5,
  },
  {
    n: 22,
    clave: "eso",
    titulo: "También para ESO y Bachillerato",
    agente: "Build",
    version: "v19",
    texto: `Ahora una sola cosa nueva: que sirva también en ESO y Bachillerato. Para qué me sirve: mis compañeros de ESO y Bachillerato también la quieren.
- En Currículo, elegir la etapa: FP (RA y CE) o ESO y Bachillerato (competencias específicas y criterios de evaluación). Los rótulos de todas las pantallas cambian según la etapa.
- Al pegar un currículo de ESO, las líneas «Competencia específica 1.» son las competencias y las líneas «1.1 …» sus criterios. En curriculo-tecnologia-eso.txt tienes el de Tecnología y Digitalización, copiado del BOE.
- En FP todo sigue igual: no cambies nada de lo que ya funciona.
Antes de tocar el fichero, dime en tres líneas cómo lo vas a hacer. Al acabar, pega el de Tecnología y Digitalización y dime cuántas competencias y criterios salen.`,
    paso: "Una tarjeta «Etapa» en Currículo: FP (RA y CE) o ESO y Bachillerato (competencias específicas y criterios). Los rótulos de todas las pantallas cambian con ella, y el lector entiende «Competencia específica 1.» y «1.1». En FP, ni una letra distinta: lo comprobó con sus propias pruebas.",
    probamos: "Con Tecnología y Digitalización copiada del BOE: 7 competencias y 15 criterios, con los pesos repartidos. Y en FP, las mismas notas, fechas, rúbrica y GIFT que antes.",
    tiempo: "20 min 14 s",
    permisos: 63,
  },
  {
    n: 23,
    clave: "pie",
    titulo: "Un pie con el enlace a cómo se hizo",
    agente: "Build",
    version: "v20",
    texto: `Última cosa: añade al final de la página un pie discreto que diga «Hecho con OpenCode y modelos de IA abiertos en el Seminario de IA para docentes · Cómo se hizo», y que «Cómo se hizo» enlace a https://aulaenlanube.com/seminario-ia-docentes/tu-herramienta/ abriéndose en otra pestaña. Que el pie no salga al imprimir. No cambies nada más.`,
    paso: "Un pie discreto que no sale al imprimir. Quiso abrir la web del enlace para comprobarlo; se lo denegamos (no hace falta salir a internet) y lo dejó puesto.",
    probamos: "El pie, en su sitio y fuera de la impresión. La consola, limpia.",
    tiempo: "40 s",
    permisos: 3,
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
  { v: "v11", que: "Pantalla Preguntas, a medias", detalle: "el límite gratuito del día · sigue con el Qwen del instituto", tono: "ambar" },
  { v: "v12 y v13", que: "Preguntas y el GIFT para Aules", detalle: "el analizador de GIFT encontró las líneas en blanco", tono: "rosa" },
  { v: "v14", que: "Pantalla Prompts", detalle: "encargos para Copilot con tus datos dentro", tono: "verde" },
  { v: "v15", que: "Cargar ejemplo", detalle: "el módulo entero, en un clic", tono: "verde" },
  { v: "v16 y v17", que: "Avisos en Inicio y detalles", detalle: "lo que falla, a la vista y con su botón", tono: "rosa" },
  { v: "v18", que: "Imprimir la programación", detalle: "el anexo de tu programación didáctica", tono: "verde" },
  { v: "v19", que: "ESO y Bachillerato", detalle: "competencias y criterios, en toda la plataforma", tono: "verde" },
  { v: "v20", que: "El pie, y terminada", detalle: "21 mensajes, un solo fichero de 208 KB", tono: "morado" },
];
