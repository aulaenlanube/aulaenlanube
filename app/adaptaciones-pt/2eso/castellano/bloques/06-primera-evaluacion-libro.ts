// Bloque 6 del Tema 1 · 1.ª evaluación · Ejercicios del libro de texto · Adaptaciones PT · 2.º ESO.
// Ejercicios de «Reflexión sobre la lengua» del libro de clase (adjetivo: págs. 17-19;
// verbo: págs. 38-41; derivación verbal: págs. 42-43; modalidad oracional y sintaxis:
// págs. 104-106), copiados del libro y adaptados según los saberes básicos de la 1.ª
// evaluación (escrito del departamento). Tres niveles por actividad: 2.º ESO (base),
// 1.º ESO y 6.º de primaria. Los marcadores «[[espai:N]]» dejan N renglones anchos
// para escribir a mano (renglones punteados en la web, [[fill:N]] en el PDF).

import type { Ap, Act } from "../tipos";

// Pregunta + renglones de escritura a mano.
const Q = (q: string, n: number): string[] => [`**${q}**`, `[[espai:${n}]]`];

export const AP: Ap = {
  slug: "06-primera-evaluacion-libro",
  n: 6,
  t: "1.ª evaluación · Ejercicios del libro",
  teoria: [
    "El **adjetivo** acompaña al sustantivo y dice cómo es: concuerda con él en género y número (*las murallas antiguas*). Según su forma, los adjetivos son **variables** (cambian entre masculino y femenino: *cálido / cálida*, *terrorífico / terrorífica*) o **invariables** (una sola terminación para los dos géneros: *amable*, *perezoso*, *inteligente*, *verosímil*). Y según el significado: **especificativos**, que seleccionan y diferencian al sustantivo dentro de un grupo (*pásame la sal rosa*), y **explicativos**, que señalan una cualidad propia de ese sustantivo y suelen ir delante (*la blanca nieve*); cuando un explicativo aparece en un poema por su fuerza expresiva se llama **epíteto**.",
    "Los adjetivos tienen **grados**: **positivo** (*divertido*), **comparativo** —de superioridad (*más divertido que*), de igualdad (*tan divertido como*) y de inferioridad (*menos divertido que*)— y **superlativo**: el **absoluto** no compara con nadie y se forma con *muy*, con sufijos (*-ísimo*, *-érrimo*) o con prefijos (*divertidísimo*, *fuertísimo*, *hiperdivertido*), y el **relativo** destaca dentro de un grupo (*el más divertido de la clase*). Unos pocos adjetivos tienen formas especiales de comparativo y superlativo, llamadas **sintéticas**: *bueno → mejor → óptimo*; *malo → peor → pésimo*; *grande → mayor → máximo*; *pequeño → menor → mínimo*; *alto → superior → supremo*; *bajo → inferior → ínfimo*.",
    "El **verbo** es la palabra que expresa acciones, estados o procesos en un tiempo. En cada forma conjugada distinguimos el **lexema o raíz** (el significado: *com-* de comer) y la **desinencia** (persona, número, tiempo y modo: *-emos* en *comemos*). Según la terminación del infinitivo, los verbos se conjugan en tres modelos: **1.ª -ar** (*amar*), **2.ª -er** (*comer*) y **3.ª -ir** (*vivir*). Las **formas personales** llevan persona y número (*amo, amas, amamos…*); las **formas no personales** no los llevan: **infinitivo** (*comer*), **gerundio** (*comiendo*) y **participio** (*comido*), cada una con su variante compuesta (*haber comido*, *habiendo comido*, *había comido*).",
    "Los **verbos regulares** mantienen el lexema y siguen la desinencia modelo en todas sus formas (*mirar*: *miro*, *miré*, *miraré*). Son **irregulares** si cambia la raíz o la desinencia en alguna forma (*venir*: *vengo*, *vine*, *vendré*); basta con que falle una forma para que el verbo sea irregular. La irregularidad a veces afecta solo a las formas no personales: gerundios como *diciendo*, *durmiendo*, *pudiendo*, *trayendo*, y participios como *escrito*, *puesto*, *roto*, *hecho*, *dicho*, *muerto*. Ojo con el doble uso del participio: en *«Se ha **soltado** el perro»* es verbo (acompaña a *haber*); en *«El perro está **suelto**»* funciona como adjetivo.",
    "Un verbo **transitivo** admite complemento directo (*María lee un libro*), y eso permite ver la misma acción desde dos **voces**: en **activa** el sujeto hace la acción (*María lee un libro de misterio*); en **pasiva** el sujeto la recibe, y el verbo se convierte en *ser + participio*, que copia el género y el número del nuevo sujeto (*Un libro de misterio es leído por María*). El agente va presentado por *por*. Para pasar una pasiva compuesta, el auxiliar *ser* se conjuga en el mismo tiempo que estaba el verbo activo: *había escrito → habían sido escritas*.",
    "La **derivación verbal** fabrica verbos a partir de sustantivos, adjetivos o adverbios. Por **sufijación**: *cristal → cristalizar*, *débil → debilitar*, *fantasía → fantasear* (a veces la base pierde la vocal final: *pálido → palidecer*). Por **parasíntesis**, prefijo y sufijo se añaden a la vez y ninguno vale por separado: *dolor → a-dolor-ar* (no existe *dolorar* ni *adolor*), *tierra → enterrar*, *viejo → envejecer*. Si la palabra ya existe sin uno de los dos afijos (*des-cans-ar* → *cansar* existe), no es parasíntesis, sino afijación simple.",
    "Según la actitud del hablante, los enunciados se clasifican en **oracionales** (llevan verbo: *¿En qué piensas?*) y **no oracionales** (una palabra o un grupo sin verbo: *¡Adiós!*, *Buenas noches*). Las oraciones, según la **modalidad**, pueden ser **enunciativas** (afirman o niegan), **interrogativas** (preguntan: directas con signos, indirectas tras un verbo de habla: *Dime qué hora es*), **exclamativas** (expresan sentimientos), **dubitativas** (dudan: *quizás*, *tal vez*, futuros de conjetura), **desiderativas** (desean: *¡Ojalá…!*), **imperativas o exhortativas** (piden, ordenan o prohíben).",
    "En toda oración personal distinguimos **sujeto** (sintagma nominal cuyo núcleo concuerda en número y persona con el verbo) y **predicado** (sintagma verbal). El sujeto puede ser **expreso** (*Mis vecinos tienen doce hijos*) u **omitido o elidido** (*Respondió amablemente* → él/ella). El predicado es **nominal** con los verbos copulativos *ser, estar, parecer* (*Mi habitación está desordenada*) y **verbal** con los demás (*Anduve durante tres kilómetros*). Las oraciones **impersonales** no tienen sujeto: fenómenos meteorológicos (*Llueve desde ayer*), *haber* existencial (*Había bailarines muy famosos*) y expresiones de tiempo o clima con *ser* o *hacer* (*Es tarde*, *Hace mucho calor*).",
  ],
  ej: [
    "«Perezoso» y «gimnástico» (Oda al gato) concuerdan en masculino singular con «gato»; «arrogante» también lo acompaña, pero no cambia nunca de forma: es un adjetivo invariable.",
    "«La blanca nieve» es un adjetivo explicativo (epíteto): la blancura es propia de la nieve, así que no la diferencia de otras nieves, solo la destaca. «Las hojas rotas», en cambio, es especificativo: selecciona qué hojas.",
    "«Se ha soltado el perro»: participio con *haber*, funciona como verbo. «Llevaba el dinero suelto»: «suelto» acompaña a un sustantivo y concuerda con él: es un adjetivo.",
    "«El sol iluminaba la luna» (activa) pasa a «La luna era iluminada por el sol» (pasiva): el complemento directo se convierte en sujeto paciente, y el verbo, en *ser* imperfecto + participio, en femenino singular.",
  ],
};

export const ACTS: Act[] = [
  // ── 1 · Laberinto de adjetivos (libro: pág. 17, actividades 8-9) ──
  {
    t: "El laberinto de adjetivos",
    d: "Libro: pág. 17, actividades 8 y 9. Distinguir adjetivos de sustantivos colados y clasificarlos según su forma.",
    ic: "puzzle",
    nv: [
      {
        in: "En el laberinto de la pág. 17 se han colado sustantivos entre los adjetivos. Estas son sus casillas: `inteligente · Luisa · cálido · ordenador · terrorífico · paz · esbelto · amable · dentista · ejército · histórico · amarillo · trágico · simpatía · verosímil`. Solo puedes pisar adjetivos para llegar hasta el **baúl del tesoro**.",
        p: [
          ...Q("**a)** Escribe las casillas por las que pasa el camino correcto (solo adjetivos) hasta el tesoro.", 3),
          ...Q("**b)** Clasifica esos adjetivos en dos columnas: **variables** (dos terminaciones: -o/-a) e **invariables** (una sola terminación).", 3),
          ...Q("**c)** ¿Qué tipo de sustantivo es cada intruso? Di si «Luisa» es propio o común, si «ejército» es individual o colectivo, y si «paz» y «simpatía» son concretos o abstractos.", 2),
          "**d)** Actividad 9 del libro: elaborad vuestro propio laberinto. Inventad un recorrido con una regla (por ejemplo: dos variables, un invariable, dos variables…) o usad solo adjetivos variables. Dibújalo en una hoja aparte.",
        ],
        s: [
          "**a)** inteligente, cálido, terrorífico, esbelto, amable, histórico, amarillo, trágico, verosímil. No son adjetivos: Luisa, ordenador, paz, dentista, ejército, simpatía.",
          "**b)** Variables: cálido/cálida, terrorífico/terrorífica, esbelto/esbelta, histórico/histórica, amarillo/amarilla, trágico/trágica. Invariables: inteligente, amable, verosímil (sirven igual para masculino y femenino: *un chico amable / una chica amable*).",
          "**c)** «Luisa» es propio; «ejército» es colectivo (una palabra en singular que nombra un conjunto); «paz» y «simpatía» son abstractos (no se perciben con los sentidos).",
          "**d)** Respuesta libre: un laberinto dibujado en el que el camino válido cumpla la regla inventada (p. ej., casillas con dos adjetivos variables y uno invariable, alternando).",
        ],
      },
      {
        in: "Mismo laberinto de la pág. 17, con las casillas agrupadas por filas: `inteligente · Luisa · cálido · ordenador // terrorífico · paz · esbelto · amable // dentista · ejército · histórico · amarillo // trágico · simpatía · verosímil · TESORO`. Para llegar al tesoro solo vale pisar adjetivos.",
        p: [
          "**a)** Copia las casillas del camino correcto: solo adjetivos. (Pista: los intrusos son nombres de personas, cosas o ideas).",
          ...Q("**b)** De los adjetivos que has copiado, escribe cuáles cambian a femenino (variables) y cuáles no cambian nunca (invariables).", 2),
        ],
        s: [
          "**a)** inteligente, cálido, terrorífico, esbelto, amable, histórico, amarillo, trágico, verosímil.",
          "**b)** Variables: cálido, terrorífico, esbelto, histórico, amarillo, trágico (añaden -a: *amarilla*). Invariables: inteligente, amable, verosímil (valen para chico y chica).",
        ],
        ad: "Las casillas se presentan ordenadas en filas (no en laberinto dibujado), la pista dice qué buscar y se retira tanto la clasificación de los intrusos como el laberinto de creación, que aquí es opcional en clase con el profesor.",
      },
      {
        in: "Banco de palabras del laberinto de la pág. 17, ya ordenadas y con los intrusos separados: `intelligentes?` no — son estas: **inteligente · cálido · terrorífico · esbelto · amable · amarillo**. Y los intrusos: Luisa · paz.",
        p: [
          "**a)** Rodea de la lista los adjetivos (palabras que dicen cómo es algo). Ya tienes uno: *inteligente*.",
          "**b)** En cada pareja, encierra la terminación del femenino: amarill_ (o/a) · cálid_ (o/a) · inteligent_ (o/a).",
          ...Q("**c)** Copia una frase con dos de estos adjetivos: «El gato ______ es muy ______.»", 3),
        ],
        s: [
          "**a)** Los seis de la lista son adjetivos; Luisa y paz son sustantivos (nombres).",
          "**b)** amarill**a**, cálid**a**; «inteligente» no cambia: es invariable.",
          "**c)** Respuesta abierta bien construida, por ejemplo: «El gato esbelto es muy inteligente.»",
        ],
        ad: "Se entrega el banco de palabras ya separado en adjetivos e intrusos; el trabajo se reduce a rodear, encerrar la terminación del femenino y completar una frase dada, con el primer caso resuelto.",
      },
    ],
  },

  // ── 2 · Oda al gato (libro: pág. 17, actividad 10) ──
  {
    t: "Adjetivos en un poema: *Oda al gato*",
    d: "Libro: pág. 17, actividad 10. Localizar adjetivos, comprobar la concordancia y clasificarlos según su forma.",
    ic: "lira",
    nv: [
      {
        in: "Fragmento de *Oda al gato*, de Pablo Neruda (libro de texto, pág. 17): «Oh fiera **independiente** / de la casa, **arrogante** / vestigio de la noche, / **perezoso**, **gimnástico** / y **ajeno**, / **profundísimo** gato, / policía **secreta** / de las habitaciones…»",
        p: [
          ...Q("**a)** Localiza los adjetivos del fragmento y escríbelos junto al sustantivo al que acompañan.", 4),
          ...Q("**b)** ¿Concuerdan en género y número con ese sustantivo? Explica los casos de «gato» (masculino singular).", 2),
          ...Q("**c)** Clasifícalos según sean variables o invariables.", 2),
          "**d)** Escribe dos adjetivos variables y dos invariables con los que tú describirías a tu gato (o a un animal que conozcas).",
        ],
        s: [
          "**a)** fiera/independiente → «fiera» funciona aquí como apelativo del gato; arrogante, perezoso, gimnástico, ajeno, profundísimo, secreta → acompañan a «gato» (o a los sustantivos que lo nombran: *fiera*, *policía*).",
          "**b)** Sí: *perezoso, gimnástico, ajeno, profundísimo* concuerdan en masculino singular con *gato*; *secreta* concuerda en femenino singular con *policía*; *arrogante* e *independiente* también se refieren al gato, aunque no lo demuestren con su terminación.",
          "**c)** Variables: fiera/fiero, perezoso/perezosa, gimnástico/gimnástica, ajeno/ajena, profundísimo/profundísima, secreta/secreto. Invariables: arrogante, independiente.",
          "**d)** Respuesta abierta. Ejemplo: variables «negro», «mimosa»; invariables «valiente», «feliz».",
        ],
      },
      {
        in: "Fragmento de *Oda al gato*, de Pablo Neruda (pág. 17): «Oh fiera independiente de la casa, **arrogante** vestigio de la noche, **perezoso**, **gimnástico** y **ajeno**, **profundísimo** gato, policía **secreta** de las habitaciones…»",
        p: [
          "**a)** Copia los adjetivos y escribe al lado el sustantivo al que acompañan. (Ya tienes uno: *arrogante* → «vestigio»).",
          ...Q("**b)** «Perezoso» acaba en -o y el sustantivo es masculino. ¿Concuerda o no? Escribe por qué.", 2),
          "**c)** Rodea los adjetivos que no cambian aunque el sustantivo pase a femenino, y subraza los que sí cambian.",
        ],
        s: [
          "**a)** arrogante → vestigio; perezoso, gimnástico, ajeno, profundísimo → gato; secreta → policía; independiente → fiera.",
          "**b)** Sí concuerda: «gato» es masculino singular y *perezoso* es masculino singular; si fuera una gata, sería *perezosa*.",
          "**c)** No cambian (invariables): arrogante, independiente. Sí cambian (variables): perezoso/-a, gimnástico/-a, ajeno/-a, profundísimo/-a, secreto/-a.",
        ],
        ad: "El fragmento se recorta, un adjetivo va ya resuelto con su sustantivo, y en lugar de explicar la clasificación basta con rodear y subrayar.",
      },
      {
        in: "Versos del poema con huecos (la palabra del recuadro encaja en cada uno): recuadro `arrogante · perezoso · secreta`. «Oh fiera independiente de la casa, ______ vestigio de la noche, ______, gimnástico y ajeno, profundísimo gato, policía ______ de las habitaciones…»",
        p: [
          "**a)** Completa el poema con las tres palabras del recuadro.",
          "**b)** ¿«Arrogante» acaba en -o, en -a o en -e? — Encierra la opción correcta: (o / a / e).",
          ...Q("**c)** Copia: «El gato es ______.» con un adjetivo que te guste.", 3),
        ],
        s: [
          "**a)** arrogante, perezoso, secreta.",
          "**b)** en -e: por eso sirve para masculino y femenino (invariable).",
          "**c)** Respuesta personal con concordancia correcta (masculino singular).",
        ],
        ad: "Se convierte en un ejercicio de completar con banco cerrado de tres palabras; la clasificación se sustituye por una pregunta de tres opciones y una frase de una línea.",
      },
    ],
  },

  // ── 3 · Especificativo o explicativo (libro: pág. 18, actividades 11-14) ──
  {
    t: "¿Especificativo o explicativo?",
    d: "Libro: pág. 18, actividades 11 a 14. Distinguir la función del adjetivo según aporte o no información nueva.",
    ic: "etiqueta",
    nv: [
      {
        in: "Oraciones del libro (pág. 18, act. 11): a. Dicen que los lobos salen con la luna **llena**. b. Nos dormimos junto al **cálido** fuego. c. La **blanca** nieve le cubría hasta las **delgadas** rodillas. d. Aquí huele a ropa **limpia**. e. Echa a la papelera las hojas **rotas**.",
        p: [
          ...Q("**a)** Localiza el adjetivo de cada oración y explica si es especificativo o explicativo. Recuerda: si la cualidad es propia del sustantivo y suele ir delante, es explicativo; si selecciona o diferencia, es especificativo.", 4),
          "**b)** ¿Por qué «la blanca nieve» puede llamarse epíteto? ¿En qué tipo de textos aparecen muchos epítetos?",
          ...Q("**c)** Act. 13: completa con un adjetivo adecuado y di si lo has hecho especificativo o explicativo: «No cojas el vaso ____ te puedes cortar», «No soporto este ____ calor», «Estuvimos en un ____ hotel».", 3),
          "**d)** Act. 14: ¿podrías cambiar de sitio los adjetivos de las oraciones de la actividad 11? Reescribe una y explica si cambia el sentido.",
        ],
        s: [
          "**a)** a) *llena*: especificativo (distingue la luna llena de otras fases). b) *cálido*: explicativo (el calor es propio del fuego; va antepuesto). c) *blanca*: explicativo/epíteto; *delgadas*: especificativo. d) *limpia*: especificativo (hay ropa limpia y sucia). e) *rotas*: especificativo (solo las rotas).",
          "**b)** Porque blanco es cualidad inherente a la nieve: no la diferencia, la realza; al ir antepuesto suena expresivo. Abundan en textos poéticos.",
          "**c)** Por ejemplo: «vaso **roto**» (especificativo), «este **insoportable** calor» (explicativo si expresa queja, pero selecciona: admite debate; válido *bochornoso*), «un **diminuto** hotel» (explicativo si va delante como epíteto afectivo; *hotel nuevo*, especificativo). Se valora la justificación, no la palabra exacta.",
          "**d)** Sí en las especificativas sin cambio de significado (*las hojas rotas → las rotas hojas*, que gana matiz literario); «la nieve blanca» deja de ser epíteto al posponerse y pasa a informar de una variante. Respuesta razonada.",
        ],
      },
      {
        in: "Oraciones de la pág. 18: a. los lobos salen con la luna **llena**. b. junto al **cálido** fuego. c. la **blanca** nieve. d. huele a ropa **limpia**. e. las hojas **rotas**.",
        p: [
          "**a)** Une cada adjetivo con su etiqueta: ESPECIFICATIVO (diferencia) o EXPLICATIVO (cualidad propia). (Pista: los que van delante del sustantivo suelen ser explicativos).",
          "**b)** Escribe la frase del libro con «nieve» y di en voz alta por qué ese adjetivo es un epíteto.",
          ...Q("**c)** Completa: «No cojas el vaso ____ , te puedes cortar.»", 2),
        ],
        s: [
          "**a)** Especificativos: llena, limpia, rotas. Explicativos: cálido, blanca.",
          "**b)** «La blanca nieve»: la nieve es blanca por naturaleza, así que el adjetivo no la diferencia de otras nieves; solo la pinta bonita.",
          "**c)** «roto» (especificativo: distingue el vaso roto de los enteros).",
        ],
        ad: "Se quitan la justificación escrita extensa y las preguntas de cambio de orden; queda un emparejamiento con pista (delante/detrás) y un solo hueco.",
      },
      {
        in: "Parejas listas para unir: `luna → llena · fuego → cálido · nieve → blanca · ropa → limpia · hojas → rotas`. Arriba dos columnas: DIFFERENCIA (especificativo) / CUALIDAD PROPIA (explicativo).",
        p: [
          "**a)** Une con flechas cada pareja con la columna que le toca. Ejemplo hecho: «nieve → blanca» va a CUALIDAD PROPIA.",
          "**b)** Rodea la opción: «las hojas rotas» es… (1) explicativo · (2) especificativo.",
          ...Q("**c)** Copia y completa con una palabra: «El fuego es ______.»", 2),
        ],
        s: [
          "**a)** CUALIDAD PROPIA: fuego-cálido, nieve-blanca. DIFFERENCIA: luna-llena, ropa-limpia, hojas-rotas.",
          "**b)** Opción 2: especificativo (solo se tiran las rotas).",
          "**c)** Por ejemplo: «El fuego es caliente». Concordancia correcta.",
        ],
        ad: "Las oraciones se reducen a parejas de dos palabras, hay un caso resuelto, una pregunta de dos opciones y una frase de una sola línea.",
      },
    ],
  },

  // ── 4 · Grados del adjetivo (libro: pág. 19, actividades 15-20) ──
  {
    t: "Los grados del adjetivo",
    d: "Libro: pág. 19, actividades 15 a 20. Identificar y construir positivo, comparativo, superlativo y las formas sintéticas.",
    ic: "semaforo",
    nv: [
      {
        in: "Trabajas con el adjetivo *divertido* y con las oraciones de la act. 16: a. Camina más lento que una tortuga. b. ¿Sabes cuál es el planeta más diminuto del Sistema Solar? c. Esos sucesos parecen verosímiles. d. Tu decisión es más importante que la mía. e. Esa cortina está menos arrugada que aquella.",
        p: [
          ...Q("**a)** Act. 15: escribe los tres grados de *divertido* (positivo, comparativo de superioridad y superlativo absoluto).", 3),
          "**b)** Act. 16: indica el grado del adjetivo de cada oración (a-e).",
          ...Q("**c)** Act. 17: superlativo absoluto con -ísimo o -érrimo: *cruel, valiente, pobre, antiguo, fiel, sabio, célebre, fuerte*.", 4),
          "**d)** Act. 19: completa la tabla de formas sintéticas: bueno → … → …; malo → … → …; grande → … → …; pequeño → … → …; bajo → … → …; alto → … → …",
          "**e)** Act. 20 (dos frases): «Es el actor ____ pagado de Hollywood» y «El último libro de la saga es ____ que los anteriores». Di qué grado has usado.",
        ],
        s: [
          "**a)** Divertido · más divertido que · divertidísimo.",
          "**b)** a) comparativo de superioridad (*más lento que*); b) superlativo relativo (*el más diminuto* del Sistema Solar); c) positivo; d) comparativo de superioridad; e) comparativo de inferioridad (*menos arrugada que*).",
          "**c)** crudelísimo (o cruelísimo), valentísimo, paupérrimo, antiquísimo, fidelísimo, sapientísimo, celebérrimo, fuertísimo.",
          "**d)** bueno → mejor → óptimo; malo → peor → pésimo; grande → mayor → máximo; pequeño → menor → mínimo; bajo → inferior → ínfimo; alto → superior → supremo.",
          "**e)** «mejor pagado» (comparativo sintético de superioridad → superlativo relativo en el grupo «de Hollywood»); «mejor que los anteriores». Grado: comparativo sintético.",
        ],
      },
      {
        in: "Oraciones de la act. 16 (recortadas): a. Camina más lento que una tortuga. c. Esos sucesos parecen verosímiles. e. Esa cortina está menos arrugada que aquella.",
        p: [
          "**a)** Escribe los tres grados de *divertido*, uno por renglón: positivo / comparativo (más… que) / superlativo (-ísimo).",
          "**b)** Une cada oración con su grado: positivo · comparativo de inferioridad · comparativo de superioridad. (Pista: mira si aparece «más» o «menos»).",
          ...Q("**c)** Escribe el superlativo absoluto (acabado en -ísimo) de: *fuerte*, *pobre* y *antiguo*.", 3),
        ],
        s: [
          "**a)** divertido · más divertido que · divertidísimo.",
          "**b)** c) positivo (sin marcas); a) comparativo de superioridad (*más… que*); e) comparativo de inferioridad (*menos… que*).",
          "**c)** fuertísimo, paupérrimo (aceptable pobrísimo), antiquísimo.",
        ],
        ad: "Se trabajan tres oraciones en lugar de cinco, el banco de frases de la act. 20 desaparece y la lista de superlativos baja de ocho a tres, con un caso de -érrimo ya visto en clase.",
      },
      {
        in: "Banco: `más divertido que · divertidísimo · divertido`. Y dos frases: A. «El clown es ______ que el mago.» B. «El clown es ______.»",
        p: [
          "**a)** Completa A con la forma del banco que lleva «más… que» y B con la palabra que acaba en -ísimo.",
          "**b)** Rodea: «divertidísimo» significa (1) un poco divertido · (2) muy divertido.",
          "**c)** Copia el superlativo: fuerte → fuert______ · antiguo → antiqu______.",
        ],
        s: [
          "**a)** A. más divertido que; B. divertidísimo.",
          "**b)** Opción 2: muy divertido.",
          "**c)** fuert**ísimo**, antiqu**ísimo**.",
        ],
        ad: "Todo se resuelve copiando del banco o eligiendo entre dos; solo se escribe la terminación del superlativo, sin construir comparativos nuevos.",
      },
    ],
  },

  // ── 5 · Lexema, desinencia y formas no personales (libro: pág. 38, actividades 1-3) ──
  {
    t: "La forma del verbo",
    d: "Libro: pág. 38, actividades 1 a 3. Dividir lexema y desinencia, clasificar la conjugación y formar las personas no personales.",
    ic: "tarjetas",
    nv: [
      {
        in: "Verbos de la act. 1 y la tabla de la pág. 38: `buscar · arreglar · emprender · resolver · revestir · reconocer`.",
        p: [
          ...Q("**a)** Siguiendo el ejemplo (`comimos → com- + -imos`), separa en lexema y desinencia: buscaron, arreglamos, resolvimos, reconocieron.", 4),
          ...Q("**b)** Completa la tabla: indica a qué conjugación (-ar, -er, -ir) pertenece cada uno de los seis verbos.", 3),
          "**c)** «El verano pasado mi hermano y yo conocimos estudiantes peligrosos»: indica persona y número del verbo.",
          ...Q("**d)** Act. 3: escribe las formas no personales de *resolver*: infinitivo compuesto (haber + participio), gerundio, gerundio compuesto (habiendo + gerundio) y participio.", 4),
        ],
        s: [
          "**a)** bus-caron, arregl-amos, resolv-imos, reconoc-ieron (lexema en la primera parte; persona, número, tiempo y modo van en la desinencia).",
          "**b)** -ar: buscar, arreglar. -er: emprender, resolver, reconocer. -ir: revestir.",
          "**c)** *conocimos*: 1.ª persona del plural (nosotros), pretérito perfecto simple.",
          "**d)** haber resuelto, resolviendo, habiendo resuelto, resuelto.",
        ],
      },
      {
        in: "Verbos: `buscar · arreglar · resolver · revestir`. Ejemplo del libro: `cantar → cant-ar` (lexema *cant-*).",
        p: [
          "**a)** Une cada verbo con su conjugación: -ar · -er · -ir. (Pista: mira la terminación del infinitivo).",
          "**b)** En «Nosotros buscamos tesoros», ¿el verbo es de 1.ª o de 2.ª persona? ¿singular o plural? Encierra la opción.",
          ...Q("**c)** Escribe las dos formas no personales del verbo *resolver* que acaban en -iendo y en -ido.", 2),
        ],
        s: [
          "**a)** -ar: buscar, arreglar. -er: resolver. -ir: revestir.",
          "**b)** 1.ª persona plural (*nosotros* buscamos).",
          "**c)** resolviendo (gerundio), resuelto (participio).",
        ],
        ad: "Cuatro verbos en lugar de seis, preguntas de unir y encerrar, y de las cuatro formas no personales solo se piden dos y con la terminación escrita.",
      },
      {
        in: "Palabras a la vista: `bail-ar · com-er · viv-ir` y las etiquetas 1.ª (-ar), 2.ª (-er), 3.ª (-ir).",
        p: [
          "**a)** Pega con celo (o une con flechas) cada verbo con su conjugación. Ejemplo resuelto: *bail-ar → 1.ª*.",
          "**b)** El gerundio de *comer* es «comiendo». Escribe el gerundio de *vivir*: viv______.",
        ],
        s: [
          "**a)** comer → 2.ª; vivir → 3.ª.",
          "**b)** viviendo.",
        ],
        ad: "Manipulativo (pegar o unir etiquetas), un verbo por conjugación y un gerundio calcado del ejemplo.",
      },
    ],
  },

  // ── 6 · Regulares e irregulares (libro: pág. 40, actividades 10-14) ──
  {
    t: "¿Regulares o irregulares?",
    d: "Libro: pág. 40, actividades 10 a 14. El truco de los tres tiempos, gerundios y participios irregulares, y participio-verbo frente a participio-adjetivo.",
    ic: "verdad",
    nv: [
      {
        in: "Truco del libro: un verbo es regular si no cambia en **presente, pretérito perfecto simple y futuro** (*mirar*: miro, miré, miraré). Verbos de las actividades: `sentir · traer · decir · llamar · preferir · ir · caer · reír · poder · morir · vender · mentir · romper · descubrir · luchar · escribir · andar · hacer`.",
        p: [
          ...Q("**a)** Act. 11: escribe el gerundio de: *sentir, traer, decir, llamar, preferir, ir, caer, reír, poder*. Clasifícalos en regulares e irregulares en esa forma.", 4),
          ...Q("**b)** Act. 12: escribe el participio de: *morir, vender, mentir, romper, descubrir, escribir, andar, hacer, decir*. Clasifícalos.", 4),
          "**c)** Act. 10: ¿por qué son irregulares *dar, decir* y *jugar*? Da una prueba en uno de los tres tiempos del truco.",
          ...Q("**d)** Act. 14: elige e indica si funciona como verbo o como adjetivo: «Se ha (soltado/suelto) el perro de la correa», «El médico me ha (atendido/atenido)», «Aún no he (corregido/correcto) los exámenes», «Lo han felicitado por su (corregido/correcto) comportamiento».", 4),
        ],
        s: [
          "**a)** sintiendo (irr., i→ie), trayendo (irr.), diciendo (irr., raíz *dic-*), llamando (reg.), prefiriendo (irr., i→ie), yendo (irr.), cayendo (reg.: la *-y-* es ortográfica), riendo (irr., e→i), pudiendo (irr., o→u).",
          "**b)** muerto (irr.), vendido (reg.), mentido (reg.), roto (irr.), descubierto (irr., o→ue), escrito (irr.), andado (reg. en esa forma), hecho (irr.), dicho (irr.).",
          "**c)** *dar*: doy/di/daré (raíz cambiada); *decir*: digo/dije/diremos → diré; *jugar*: juego (u→ue en presente). Basta una forma alterada.",
          "**d)** soltado → verbo (con *haber*); atendido → verbo; corregido → verbo; correcto → adjetivo (acompaña a «comportamiento»). En los tres primeros el participio forma los tiempos compuestos.",
        ],
      },
      {
        in: "Verbos con la forma no personal empezada: `sentir → sint… · traer → tray… · decir → dici… · poder → pudi… · dormir → durm…` y participios: `morir → mu… · vender → vend… · romper → ro… · escribir → esc… · hacer → he…`",
        p: [
          "**a)** Completa los gerundios y rodea los que hayan cambiado la raíz.",
          "**b)** Completa los participios y clasifícalos en dos columnas (regulares / irregulares).",
          "**c)** Elige y copia la frase: «Se ha (soltado / suelto) el perro». Di por qué esa forma va con «ha».",
        ],
        s: [
          "**a)** sintiendo, trayendo, diciendo, pudiendo, durmiendo: los cinco cambian la raíz, así que ninguno es regular en el gerundio.",
          "**b)** muerto (irr.), vendido (reg.), roto (irr.), escrito (irr.), hecho (irr.).",
          "**c)** «Se ha soltado»: con el auxiliar *haber* se usa el participio regular, y funciona como verbo.",
        ],
        ad: "Las formas van empezadas (solo se completa lo que falta), la lista baja a diez verbos y la act. 14 se reduce a una frase con las dos opciones delante.",
      },
      {
        in: "Pares ya escritos: `diciendo · durmiendo · pudiendo · hecho · dicho · vendido · escrito`. Columnas: GERUNDIO / PARTICIPIO.",
        p: [
          "**a)** Reparte las siete palabras entre las dos columnas. Ejemplo: *diciendo* va en GERUNDIO.",
          "**b)** «El huevo está frito». ¿«Frito» es regular (frido) o irregular? Encierra la opción.",
          "**c)** Rodea el participio correcto de *romper*: (roto / romido) y cópialo en «Se ha ______ el jarrón.»",
        ],
        s: [
          "**a)** Gerundios: diciendo, durmiendo, pudiendo. Participios: hecho, dicho, vendido, escrito.",
          "**b)** irregular (se admite *frito*; también *freído*).",
          "**c)** roto.",
        ],
        ad: "Trabajo de repartir palabras escritas y encerrar opciones: no se forma ninguna forma nueva desde cero.",
      },
    ],
  },

  // ── 7 · Voz activa y voz pasiva (libro: pág. 41, actividades 16-18) ──
  {
    t: "Voz activa y voz pasiva",
    d: "Libro: pág. 41, actividades 16 a 18. Reconocer la voz, transformar activas en pasivas y hacerlo también con tiempos compuestos.",
    ic: "megafono",
    fig: "sintagma",
    nv: [
      {
        in: "Oraciones de la act. 17 (las más claras del libro): a. El sol iluminaba la luna. b. Todos pidieron la cuenta. c. Todos escuchaban la música. d. Mi padre pintaba la casa. Act. 18 (compuestas): e. Concha Méndez había escrito muchas poesías. f. Ellos habían dicho la verdad.",
        p: [
          "**a)** Act. 16: clasifica en activa o pasiva e indica el tiempo: *fue tomado, habían venido, serían enviados, ha sido descubierto*.",
          ...Q("**b)** Act. 17: pasa a pasiva a-d. Recuerda: CD → sujeto paciente; verbo → ser (mismo tiempo) + participio; agente → «por…». ", 4),
          "**c)** Act. 18: pasa a pasiva e y f. Fíjate: ahora el auxiliar *ser* va en tiempo compuesto (había → había sido; habían → habían sido).",
          "**d)** ¿En «Un libro de misterio es leído por María» quién es el sujeto? ¿Qué caso es el de *leído* (masculino singular)?",
        ],
        s: [
          "**a)** fue tomado: pasiva, pretérito perfecto simple. habían venido: activa, pluscuamperfecto. serían enviados: pasiva, condicional (simple de *ser* + participio). ha sido descubierto: pasiva, pretérito perfecto compuesto.",
          "**b)** a) La luna era iluminada por el sol. b) La cuenta fue pedida por todos. c) La música era escuchada por todos. d) La casa era pintada por mi padre.",
          "**c)** e) Muchas poesías habían sido escritas por Concha Méndez. f) La verdad había sido dicha por ellos.",
          "**d)** Sujeto: *un libro de misterio*; el participio *leído* concuerda con él en masculino singular (*leída* si fuera «una novela»).",
        ],
      },
      {
        in: "Solo dos oraciones: a. El sol iluminaba la luna. → La luna ______ ______ por el sol. b. Concha Méndez había escrito muchas poesías. → Muchas poesías ______ ______ ______ por Concha Méndez.",
        p: [
          "**a)** Completa la pasiva de a con las dos palabras que faltan (ser en imperfecto + participio).",
          "**b)** Completa la pasiva de b con las tres palabras que faltan (habían + sido + participio).",
          "**c)** ¿«El perro corre» es activa o pasiva? Encierra.",
        ],
        s: [
          "**a)** era iluminada.",
          "**b)** habían sido escritas.",
          "**c)** activa (el sujeto hace la acción).",
        ],
        ad: "Las transformaciones se hacen en frases con el hueco ya montado (solo se rellenan las palabras del verbo), se baja a dos oraciones y se añade una pregunta de dos opciones.",
      },
      {
        in: "Dos tarjetas: «El sol» (quien hace) y «la luna» (la recibe). Frase en la pizarra: «El sol iluminaba la luna».",
        p: [
          "**a)** Con las tarjetas, monta la frase al revés: empieza por «La luna…» y añade «por el sol».",
          "**b)** En voz alta, di si el sol ACTÚA o RECIBE la acción. Y la luna, ¿qué hace?",
        ],
        s: [
          "**a)** «La luna era iluminada por el sol» (aceptable «La luna recibía la luz del sol» si aún no escribe el participio).",
          "**b)** El sol actúa (voz activa); la luna recibe la acción (sujeto paciente, voz pasiva).",
        ],
        ad: "Manipulativo y oral: la voz se aprende invirtiendo con tarjetas y respondiendo en voz alta.",
      },
    ],
  },

  // ── 8 · Derivación verbal y parasíntesis (libro: págs. 42-43, actividades 1-8) ──
  {
    t: "Verbos nuevos: sufijos y parasíntesis",
    d: "Libro: págs. 42 y 43. Formar verbos por sufijación y por parasíntesis, y distinguir afijación simple de parasíntesis.",
    ic: "arbol",
    nv: [
      {
        in: "Regla del libro: en la **parasíntesis** el prefijo y el sufijo se añaden a la vez; si la palabra existe sin uno de los dos afijos, es afijación simple (*des-cans-ar* → *cansar* existe: simple). Lista de la act. 7 (pág. 43): `desmontar · aminorar · desabrigar · alejar · desequilibrar · encharcar · alargar · desmoronar · ahondar · desinflar · desvelar · entrever`.",
        p: [
          ...Q("**a)** Act. 3/5: escribe el verbo parasintético que corresponde: «poner dulce» (de *dulce*), «poner pobre» (de *pobre*), «poner en la tierra» (de *tierra*), «hacer viejo» (de *viejo*).", 4),
          "**b)** Prueba con *adolorar* y *descansar*: *adolorar* no existe sin el sufijo ni *dolorar* sin el prefijo → parasíntesis. En cambio, en *descansar* existe *cansar* sin el prefijo → afijación simple (prefijo *des-*).",
          ...Q("**c)** Act. 7: reparte la lista en dos columnas: afijación simple / parasíntesis.", 4),
          "**d)** Act. 8: escribe el verbo que corresponde a cada definición: «poner blando algo», «hacer más ancho», «poner rojo algo por el calor o el fuego».",
        ],
        s: [
          "**a)** endulzar, empobrecer, enterrar, envejecer (en las cuatro, prefijo + sufijo a la vez).",
          "**b)** *adolorar* no existe sin el sufijo ni *dolorar* sin el prefijo: parasíntesis. En cambio *des cansar*: *cansar* existe sin prefijo → afijación simple (prefijo *des-*).",
          "**c)** Parasíntesis: aminorar, desabrigar, alejar, encharcar, alargar, ahondar. Afijación simple: desmontar (montar existe), desequilibrar (equilibrar existe), desmoronar (moronar existe), desinflar (inflar existe), desvelar (velar existe), entrever (ver existe).",
          "**d)** ablandar, ensanchar, enrojecer.",
        ],
      },
      {
        in: "Verbos con las piezas separadas: `en-dulce-ar · em-pobre-cer · en-tierra-ar · en-viejo-ecer`. Y el truco: en la parasíntesis, si tapas el prefijo no queda palabra; si tapas el sufijo tampoco.",
        p: [
          "**a)** Lee el verbo sin las piezas en negrita y di la palabra base: *endulzar* → dulce.",
          "**b)** Completa: «El panadero ____ la masa de lo viejo que estaba» (verbo de *viejo*, sin *en-* inicial). ¿Es parasintético?",
          "**c)** Une con flechas: EN + VIEJO + ECER → envejecer · DES + MONTAR → desmontar. ¿Cuál de los dos puede existir sin su prefijo? Señálalo.",
        ],
        s: [
          "**a)** endulzar → dulce; empobrecer → pobre; enterrar → tierra; envejecer → viejo.",
          "**b)** «envejeció»; sí, porque *envejecer* necesita las dos piezas (*vejecer* no existe).",
          "**c)** *desmontar* (existe *montar*): afijación simple; *envejecer* no existe sin las dos piezas: parasíntesis.",
        ],
        ad: "Los verbos se entregan despieceados con el truco escrito y la prueba de tapar piezas; solo se responde a una pregunta de clasificación con dos casos.",
      },
      {
        in: "Tarjetas: `EN · DULCE · AR` y una fila vacía. Otra fila: `EN · VIEJO · ECER`.",
        p: [
          "**a)** Ordena las tres tarjetas y copia el verbo: endulzar.",
          "**b)** Ordena la segunda fila (EN + VIEJO + ECER) y copia el verbo.",
          "**c)** Di en voz alta: ¿se puede decir «dulcear» sin la EN? ¿Y «vejecer» sin la EN?",
        ],
        s: [
          "**a)** endulzar.",
          "**b)** envejecer.",
          "**c)** No a las dos: las dos piezas se necesitan a la vez → verbos parasintéticos.",
        ],
        ad: "Manipulativo: se forman los verbos moviendo tarjetas; la comprobación es oral y se copia la respuesta.",
      },
    ],
  },

  // ── 9 · Modalidad oracional (libro: págs. 104-105, actividades 1-3) ──
  {
    t: "¿Cómo llegan mis frases?",
    d: "Libro: págs. 104-105, actividades 1 a 3. Distinguir enunciados oracionales y no oracionales y reconocer la modalidad según la actitud del hablante.",
    ic: "chat",
    nv: [
      {
        in: "Enunciados de la act. 1: a. ¡Uf… un ratón! b. ¿Hay flores en tu jardín? c. Adiós, muy buenas. d. Llame antes de entrar. e. Recogió los papeles del suelo. f. ¡Qué pena me da!",
        p: [
          "**a)** Act. 1: clasifícalos en oracionales (con verbo) y no oracionales.",
          ...Q("**b)** Act. 2: toma «He preparado la maleta solo con lo imprescindible para el viaje» y reescríbela en seis modalidades: enunciativa negativa, interrogativa directa, dubitativa, desiderativa, exclamativa y exhortativa.", 6),
          "**c)** Act. 3: en el fragmento de *Alicia en el país de las maravillas* de la pág. 105 busca un ejemplo de oración enunciativa, exclamativa, interrogativa directa, interrogativa indirecta y exhortativa, y justifica cada elección.",
          "**d)** Localiza en el mismo fragmento dos enunciados no oracionales (pista: «¡Uf!»; «¡Ejem!»).",
        ],
        s: [
          "**a)** Oracionales: b, d, e, f (*hay, llame, recogió, da*). No oracionales: a y c (sin verbo conjugado; «¡Uf… un ratón!» y «Adiós, muy buenas»).",
          "**b)** Negativa: «No he preparado la maleta…» · Interrogativa: «¿He preparado la maleta…?» · Dubitativa: «Quizás (haya) preparado la maleta…» · Desiderativa: «¡Ojalá haya preparado la maleta…!» · Exclamativa: «¡He preparado la maleta solo con lo imprescindible!» · Exhortativa: «Prepara la maleta solo con lo imprescindible.»",
          "**c)** Enunciativa: «Todos se sentaron…»; exclamativa: «¡Sentaos todos y escuchadme!»; interrogativa directa: «¿Estáis preparados?» (o «¿Decía usted algo?»); interrogativa indirecta: «se apresuró a continuar» no cuenta — el ejemplo claro es «Lo que quiero saber es qué fue lo que encontró el arzobispo» (pregunta tras verbo de habla, sin signos); exhortativa: «Sentaos todos y escuchadme» / «¡Silencio todos, por favor!». Justificación: signos de interrogación/exclamación, verbo en imperativo o subordinación interrogativa.",
          "**d)** «¡Uf!» (graznido del Loro) y «¡Ejem!» (carraspeo del Ratón).",
        ],
      },
      {
        in: "Solo cuatro enunciados: a. ¡Uf… un ratón! b. ¿Hay flores en tu jardín? d. Llame antes de entrar. e. Recogió los papeles del suelo.",
        p: [
          "**a)** Rodea los que tengan verbo (oracionales).",
          "**b)** Pasa «Recogió los papeles del suelo» a pregunta y cópiala con sus signos.",
          "**c)** Escribe «¡Qué pena me da!» con dos signos de exclamación, uno delante y otro detrás.",
        ],
        s: [
          "**a)** b, d y e (hay, llame, recogió); a) no tiene verbo.",
          "**b)** «¿Recogió los papeles del suelo?».",
          "**c)** «¡Qué pena me da!» (con las dos barras de exclamación).",
        ],
        ad: "La lista baja de seis a cuatro, la conversión a seis modalidades se reduce a una pregunta y el trabajo se apoya en copiar los signos.",
      },
      {
        in: "Dos frases grandes en la mesa: «Hay flores en tu jardín?» y «¡Uf, un ratón!». Y dos etiquetas: CON VERBO / SIN VERBO.",
        p: [
          "**a)** Pega cada etiqueta debajo de la frase que le toca.",
          "**b)** Lee en voz alta la primera como si preguntaras de verdad.",
          "**c)** Copia la pregunta con los signos: ¿ + frase + ?",
        ],
        s: [
          "**a)** CON VERBO: «Hay flores en tu jardín?» (hay = verbo haber). SIN VERBO: «¡Uf, un ratón!».",
          "**b)** Lectura con entonación ascendente final.",
          "**c)** «¿Hay flores en tu jardín?»",
        ],
        ad: "Solo dos frases, con etiquetas físicas y lectura en voz alta; la escritura se limita a copiar una pregunta.",
      },
    ],
  },

  // ── 10 · Sujeto y predicado (libro: pág. 106, repaso) ──
  {
    t: "Sujeto y predicado (repaso)",
    d: "Libro: pág. 106. Repaso de sintaxis de primaria: reconocer el sujeto (expreso u omitido), el tipo de predicado y las oraciones impersonales.",
    ic: "repaso",
    fig: "sintagma",
    nv: [
      {
        in: "Oraciones de la teoría de la pág. 106: a. Mis vecinos tienen doce hijos. b. Mi habitación está desordenada. c. Respondió amablemente. d. Lloverá hoy. e. En esa aula habrá unas veinticinco mesas. f. Esta mañana han llegado los nuevos inquilinos.",
        p: [
          ...Q("**a)** Indica el sujeto y el predicado de a, b y f. En f, di con qué verbo concuerda el sujeto (persona y número).", 4),
          "**b)** ¿De quién es «c»? Escribe el sujeto omitido. ¿Qué tipo de predicado tiene b (nominal o verbal)? ¿Por qué?",
          ...Q("**c)** Di cuáles de d, e y f son impersonales y prueba la regla (verbo meteorológico / *haber* existencial).", 3),
          "**d)** Escribe una oración con sujeto colectivo en singular («Ese grupo de músicos…») y justifica el verbo en singular.",
        ],
        s: [
          "**a)** a) S: *Mis vecinos* (SN); P: *tienen doce hijos* (SV). b) S: *Mi habitación*; P: *está desordenada*. f) S: *los nuevos inquilinos*; P: *Esta mañana han llegado*; concuerda en 3.ª persona del plural (*han*, no *ha*).",
          "**b)** Sujeto omitido: *él / ella*. El predicado de b es **nominal** porque el verbo *estar* es copulativo y el atributo dice una cualidad del sujeto.",
          "**c)** d) impersonal (verbo meteorológico); e) impersonal (*haber* existencial, «Había bailarines muy famosos» vale igual); f) NO es impersonal: tiene sujeto (*los nuevos inquilinos*).",
          "**d)** «Ese grupo de músicos ganó el certamen»: el núcleo del sujeto es *grupo* (singular), por eso el verbo va en singular.",
        ],
      },
      {
        in: "Tres oraciones: a. Mis vecinos tienen doce hijos. b. Mi habitación está desordenada. c. Respondió amablemente.",
        p: [
          "**a)** Subraya el sujeto en a y b (responde a «¿quién tiene…? / ¿qué está…?»).",
          "**b)** En c, escribe entre paréntesis quién respondió: (él/ella).",
          "**c)** ¿El predicado de b es nominal (ser/estar/parecer) o verbal? Encierra la opción.",
        ],
        s: [
          "**a)** *Mis vecinos*; *Mi habitación*.",
          "**b)** (él/ella) respondió amablemente → sujeto elidido.",
          "**c)** nominal (verbo *estar*).",
        ],
        ad: "Tres oraciones y preguntas de subrayar, completar entre paréntesis o encerrar, con la pregunta guía escrita en el enunciado.",
      },
      {
        in: "Oración en la pizarra: «Mi hermana mayor pintó un mural». Y una pregunta grande: ¿QUIÉN pintó?",
        p: [
          "**a)** Responde en voz alta a «¿quién pintó un mural?» y señala las palabras en la frase.",
          "**b)** Rodea la palabra del sujeto que manda (el núcleo: hermana).",
          "**c)** Copia el resto de la frase: eso es el predicado.",
        ],
        s: [
          "**a)** «Mi hermana mayor» (sujeto).",
          "**b)** *hermana*: es el núcleo; «mayor» lo acompaña.",
          "**c)** «pintó un mural» = predicado (el verbo y lo que dice del sujeto).",
        ],
        ad: "Una sola oración, búsqueda oral con la pregunta «¿quién…?» y copia del predicado ya localizado.",
      },
    ],
  },
];
