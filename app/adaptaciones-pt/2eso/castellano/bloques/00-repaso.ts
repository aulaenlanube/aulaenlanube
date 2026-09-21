// Bloque 0 · Actividades de repaso · Tema 1 de Lengua Castellana · Adaptaciones PT · 2.º ESO.
// Repaso de lo básico de primaria: sílaba y sílaba tónica, palabra y oración,
// orden alfabético y diccionario, mayúsculas y puntuación, comprensión lectora.

import type { Ap, Act } from "../tipos";

export const AP: Ap = {
  slug: "00-repaso",
  n: 0,
  t: "Actividades de repaso",
  teoria: [
    "Una **sílaba** es cada golpe de voz con el que pronunciamos una palabra: si dices *mochila* despacio, o das una palmada por cada golpe, salen tres (`mo-chi-la`). Toda sílaba lleva al menos una **vocal**, así que no existen sílabas sin vocal. Según cuántas tengan, las palabras son **monosílabas** (`sol`), **bisílabas** (`me-sa`), **trisílabas** (`na-ran-ja`) o **polisílabas** (`or-de-na-dor`). Y hay tres parejas de letras que nunca se parten al separar: `ch`, `ll` y `rr`; por eso escribimos `pi-za-rra` y no `piz-ar-ra`.",
    "Fig:silabas",
    "En toda palabra hay una sílaba que suena **más fuerte** que las demás: es la **sílaba tónica**. Para encontrarla, llama a la palabra como si estuvieras lejos (or-de-na-**dor**) o alárgala al pronunciarla: la que se estira sola es la tónica. Cuidado con un error muy común: la sílaba tónica **no siempre lleva tilde**; la tilde solo aparece en algunos casos, pero la fuerza de voz está siempre. Y no es un detalle menor, porque cambiar de sitio esa fuerza cambia la palabra: *yo canto ahora* frente a *él cantó ayer*.",
    "Con las palabras formamos **oraciones**. Una oración tiene **sentido completo**, empieza por **mayúscula** y acaba en **punto**: «La barca salió del puerto.» es una oración; «La barca del» no lo es, porque se queda a medias. Varias oraciones que hablan de lo mismo forman un **texto**, y de un texto siempre se preguntan dos cosas: de qué **trata** (el tema, en pocas palabras) y cuál es su **idea principal** (lo más importante que dice, que suele estar en una de sus oraciones). Norma de aula para todo el curso: las preguntas de lectura se contestan **con frase completa**, nunca con una palabra suelta.",
    "RAW:<table><caption>Los signos que ordenan lo que escribes</caption><thead><tr><th>Signo</th><th>Para qué sirve</th><th>Ejemplo</th><th>Error típico</th></tr></thead><tbody><tr><td>Punto (.)</td><td>Cierra la oración; lo que viene detrás empieza por mayúscula.</td><td>Hoy hay mercado. Iremos pronto.</td><td>Enlazarlo todo con «y» y no poner ni un punto.</td></tr><tr><td>Coma (,)</td><td>Separa los elementos de una lista y marca una pausa breve.</td><td>Compramos pan, fruta, arroz y agua.</td><td>Poner coma delante de la «y» que cierra la lista.</td></tr><tr><td>Interrogación (¿?)</td><td>Marca una pregunta; en español <strong>se abre y se cierra</strong>.</td><td>¿Vienes a la excursión?</td><td>Escribir solo el signo final, al estilo del inglés.</td></tr><tr><td>Exclamación (¡!)</td><td>Marca sorpresa, alegría o enfado; también se abre y se cierra.</td><td>¡Qué frío hace hoy!</td><td>Olvidar el signo de apertura.</td></tr><tr><td>Mayúscula</td><td>Al empezar la oración, detrás de punto y en los nombres propios.</td><td>El domingo fuimos a Morella.</td><td>Escribir los nombres propios en minúscula.</td></tr></tbody></table>",
    "El **abecedario** español tiene 27 letras, de la `a` a la `z`, y es el orden que siguen la lista de clase, la agenda y el **diccionario**. Para ordenar palabras te fijas en la **primera letra**; si coincide, pasas a la **segunda**, y si también coincide, a la **tercera**: por eso «paseo» va antes que «patos» (la s va antes que la t). En cada página del diccionario, arriba, hay dos **palabras guía**: la primera y la última de esa página; si la que buscas queda entre las dos, está ahí. Y dos avisos que ahorran muchos «no lo encuentro»: los **verbos** se buscan en **infinitivo** (`pescaban` se busca en `pescar`) y los **sustantivos**, en **masculino singular** (`barqueras` se busca en `barquero`).",
  ],
  ej: [
    "«Ventana» se separa en `ven-ta-na`: tres golpes de voz, y la fuerza recae en la segunda sílaba, `ven-**ta**-na`.",
    "«el sábado fuimos al mercado» está mal escrito: le faltan la mayúscula inicial y el punto final; lo correcto es «El sábado fuimos al mercado.».",
    "Para ordenar naranja, limón y sandía basta con la primera letra (l, n, s): limón, naranja, sandía.",
  ],
};

export const ACTS: Act[] = [
  {
    t: "Cuenta los golpes de voz",
    d: "Separar palabras en sílabas dando una palmada por cada golpe.",
    ic: "palmas",
    fig: "silabas",
    nv: [
      {
        in: "Diez palabras de uso diario en clase y en casa: bicicleta, cuaderno, paella, ordenador, maíz, ciudad, pizarra, estudiáis, sol, aula.",
        p: [
          "**a)** Separa en sílabas las diez palabras e indica cuántas sílabas tiene cada una.",
          "**b)** Clasifícalas en monosílabas, bisílabas, trisílabas y polisílabas.",
          "**c)** Localiza los **diptongos**, el **triptongo** y los **hiatos** que hay en la lista y explica en cada caso qué vocales se combinan.",
          "**d)** «Maíz» y «ciudad» llevan las dos una vocal cerrada junto a otra vocal, pero una forma hiato y la otra diptongo. Explica razonadamente de qué depende.",
          "**e)** Escribe tres palabras del instituto, una con diptongo, otra con hiato y otra con triptongo, y sepáralas en sílabas.",
        ],
        s: [
          "**a)** `bi-ci-cle-ta` (4) · `cua-der-no` (3) · `pa-e-lla` (3) · `or-de-na-dor` (4) · `ma-íz` (2) · `ciu-dad` (2) · `pi-za-rra` (3) · `es-tu-diáis` (3) · `sol` (1) · `au-la` (2).",
          "**b)** Monosílaba: sol · bisílabas: maíz, ciudad, aula · trisílabas: cuaderno, paella, pizarra, estudiáis · polisílabas: bicicleta, ordenador.",
          "**c)** Diptongos: `cua` de cuaderno (cerrada átona + abierta), `au` de aula (abierta + cerrada átona) y `ciu` de ciudad (dos cerradas distintas). Triptongo: la secuencia i + á + i de `es-tu-diáis`. Hiatos: `pa-e` de paella (dos vocales abiertas) y `ma-íz` (abierta + cerrada tónica).",
          "**d)** De si la vocal cerrada es átona o tónica: en «ciudad» la i y la u son átonas y se pronuncian en un mismo golpe de voz, así que forman diptongo; en «maíz» la í es tónica y lleva tilde, de modo que se separa de la a y forma hiato.",
          "**e)** Respuesta libre; por ejemplo `pa-tio` (diptongo io), `ma-es-tro` (hiato a-e) y `co-piáis` (triptongo iái).",
        ],
      },
      {
        in: "Ocho palabras sacadas de la mochila y de la mesa del comedor: bicicleta, mochila, ordenador, tren, paella, reloj, pizarra, sol.",
        p: [
          "**a)** Separa en sílabas las ocho palabras y escribe al lado cuántas sílabas tiene cada una.",
          "**b)** Clasifícalas en monosílabas, bisílabas, trisílabas y polisílabas.",
          "**c)** En la lista hay una palabra con dos vocales seguidas que van en sílabas distintas. Localízala y explica por qué se separan.",
          "**d)** Escribe tú tres palabras del instituto que tengan cuatro sílabas y sepáralas.",
        ],
        s: [
          "**a)** `bi-ci-cle-ta` (4) · `mo-chi-la` (3) · `or-de-na-dor` (4) · `tren` (1) · `pa-e-lla` (3) · `re-loj` (2) · `pi-za-rra` (3) · `sol` (1).",
          "**b)** Monosílabas: tren, sol · bisílaba: reloj · trisílabas: mochila, paella, pizarra · polisílabas: bicicleta, ordenador.",
          "**c)** «Paella»: `pa-e-lla`, porque la a y la e son dos vocales fuertes y no se pueden pronunciar en el mismo golpe de voz. En cambio la `ll` no se parte nunca.",
          "**d)** Respuesta libre, por ejemplo `ca-mi-se-ta`, `pa-pe-le-ra`, `bi-blio-te-ca`.",
        ],
        ad: "La lista baja de diez palabras a ocho, se retiran el triptongo y los términos diptongo e hiato —basta con localizar una palabra con dos vocales seguidas y explicarlo con palabras propias— y desaparece el apartado que pedía razonar por qué una secuencia es hiato y otra diptongo.",
      },
      {
        in: "Cuatro palabras de la lista: bicicleta, reloj, pizarra, sol.",
        p: [
          "**a)** Fíjate en el ejemplo ya resuelto, `mo-chi-la` (3), y separa igual las cuatro palabras.",
          "**b)** Rodea las palabras que tienen más de dos sílabas.",
          "**c)** ¿Cuál es la palabra con más golpes de voz? Puedes señalarla con el dedo.",
        ],
        s: [
          "**a)** `bi-ci-cle-ta` (4) · `re-loj` (2) · `pi-za-rra` (3) · `sol` (1).",
          "**b)** Bicicleta y pizarra.",
          "**c)** Bicicleta, con cuatro golpes.",
        ],
        ad: "Se pasa de ocho palabras a cuatro, con una ya resuelta que sirve de modelo y una última pregunta que se puede resolver señalando en lugar de escribir.",
      },
      {
        in: "Banco de palabras a la vista: sol · reloj · mochila · bicicleta.",
        p: [
          "**a)** Da una palmada por cada sílaba y une cada palabra con su número de golpes: 1 · 2 · 3 · 4.",
          "**b)** Rodea la separación correcta: `mo-chi-la` o `moc-hi-la`.",
          "**c)** Copia la palabra del banco que tiene una sola sílaba.",
        ],
        s: [
          "**a)** sol con 1 · reloj con 2 · mochila con 3 · bicicleta con 4.",
          "**b)** `mo-chi-la`, porque la `ch` no se separa.",
          "**c)** Sol.",
        ],
        ad: "El banco de cuatro palabras está siempre a la vista, se une y se rodea en vez de escribir, y la separación se elige entre dos opciones cerradas.",
      },
      {
        p: [
          "**a)** El profesor dice una palabra y tú das una palmada por cada golpe de voz: sol, mesa, mochila. Di en voz alta cuántas palmadas han salido.",
          "**b)** Coloca una ficha de color por cada sílaba de «mochila» y copia debajo el modelo: `mo-chi-la`.",
        ],
        s: [
          "**a)** Sol, una palmada · mesa, dos · mochila, tres.",
          "**b)** Tres fichas en fila y la copia `mo-chi-la`.",
        ],
        ad: "Las palabras las dicta el docente, la respuesta se da con palmadas y en voz alta, y las fichas de colores hacen visible el número de sílabas antes de copiar el modelo.",
      },
    ],
  },
  {
    t: "¿Dónde suena la fuerza?",
    d: "Localizar la sílaba tónica alargando y llamando a la palabra.",
    ic: "oreja",
    fig: "silabas",
    nv: [
      {
        in: "Palabras de una parada del mercado de Xàtiva: naranja, limón, sandía, plátano, café, azúcar, horchata, níspero.",
        p: [
          "**a)** Separa las ocho palabras en sílabas y subraya la sílaba tónica de cada una.",
          "**b)** Clasifícalas en **agudas**, **llanas** y **esdrújulas**, y explica el criterio que has seguido.",
          "**c)** «Naranja», «horchata» y «azúcar» son las tres llanas, pero solo una lleva tilde. Razona por qué.",
          "**d)** Explica por qué «sandía» lleva tilde aunque sea llana y acabe en vocal.",
          "**e)** Busca una pareja de palabras que solo se diferencien en el lugar de la sílaba tónica, redacta una oración con cada una y explica qué cambia de la primera a la segunda.",
        ],
        s: [
          "**a)** `na-ran-ja` (ran) · `li-món` (món) · `san-dí-a` (dí) · `plá-ta-no` (plá) · `ca-fé` (fé) · `a-zú-car` (zú) · `hor-cha-ta` (cha) · `nís-pe-ro` (nís).",
          "**b)** Agudas: limón, café · llanas: naranja, sandía, azúcar, horchata · esdrújulas: plátano, níspero. El criterio es la posición de la sílaba tónica contando desde el final: última, penúltima o antepenúltima.",
          "**c)** Porque las llanas solo llevan tilde cuando no acaban en vocal, en -n o en -s: «naranja» y «horchata» acaban en vocal y no la necesitan, mientras que «azúcar» acaba en -r y por eso la lleva.",
          "**d)** Porque la í y la a forman un hiato, y una vocal cerrada tónica junto a una abierta lleva tilde siempre, al margen de la regla general de las llanas. Por eso se separa `san-dí-a`.",
          "**e)** Respuesta libre, por ejemplo ánimo / animo / animó: «No pierdas el ánimo.» · «Yo te animo desde la grada.» · «El público lo animó hasta el final.» Al cambiar la fuerza de voz cambian la clase de palabra y el tiempo verbal: de sustantivo a verbo en presente y a verbo en pasado.",
        ],
      },
      {
        in: "Palabras de una parada del mercado de Xàtiva: naranja, limón, sandía, plátano, café, azúcar.",
        p: [
          "**a)** Separa las seis palabras en sílabas y subraya la sílaba tónica de cada una.",
          "**b)** Agrúpalas según dónde cae la fuerza: en la última sílaba, en la penúltima o antes de la penúltima.",
          "**c)** Explica con tus palabras por qué «canto» y «cantó» no significan lo mismo.",
          "**d)** Busca una pareja de palabras que solo se diferencien en el lugar de la fuerza y escribe una oración con cada una.",
        ],
        s: [
          "**a)** `na-ran-ja` (ran) · `li-món` (món) · `san-dí-a` (dí) · `plá-ta-no` (plá) · `ca-fé` (fé) · `a-zú-car` (zú).",
          "**b)** Última: limón, café · penúltima: naranja, sandía, azúcar · antes de la penúltima: plátano.",
          "**c)** Tienen las mismas letras, pero la fuerza cambia quién actúa y cuándo: *yo canto ahora* frente a *él cantó ayer*.",
          "**d)** Respuesta libre, por ejemplo ánimo / animo / animó: «No pierdas el ánimo.» · «Yo te animo desde la grada.» · «El público lo animó hasta el final.»",
        ],
        ad: "Se pasa de ocho palabras a seis, la clasificación no usa los términos aguda, llana y esdrújula, sino la posición de la fuerza contada desde el final, y se retiran los dos apartados que pedían justificar por qué unas palabras llevan tilde y otras no.",
      },
      {
        in: "Tres palabras de la parada: naranja, plátano, café.",
        p: [
          "**a)** Mira el ejemplo resuelto, `li-**món**`, donde la fuerza cae al final. Separa las tres palabras y marca su sílaba tónica.",
          "**b)** ¿En cuál de las tres la fuerza está en la primera sílaba? Puedes señalarla.",
          "**c)** Di «plátano» en voz alta alargando la sílaba que suena más fuerte. ¿Cuál es?",
        ],
        s: [
          "**a)** `na-ran-ja` (ran) · `plá-ta-no` (plá) · `ca-fé` (fé).",
          "**b)** Plátano.",
          "**c)** La sílaba `plá`.",
        ],
        ad: "Se reducen las palabras de seis a tres, se entrega una ya marcada como modelo y la comprobación se hace en voz alta, sin tener que redactar la explicación.",
      },
      {
        in: "Banco de palabras con las sílabas ya separadas: `li-món` · `na-ran-ja` · `plá-ta-no`.",
        p: [
          "**a)** Rodea en cada palabra la sílaba que suena más fuerte.",
          "**b)** Une cada palabra con su casilla: fuerza al final · fuerza en medio · fuerza al principio.",
          "**c)** Elige entre tres: en «naranja» la fuerza está en `na`, en `ran` o en `ja`.",
        ],
        s: [
          "**a)** `món` · `ran` · `plá`.",
          "**b)** Limón con fuerza al final · naranja con fuerza en medio · plátano con fuerza al principio.",
          "**c)** En `ran`.",
        ],
        ad: "Las palabras llegan ya separadas en sílabas, el trabajo consiste en rodear y unir, y el último apartado ofrece solo tres opciones cerradas.",
      },
      {
        p: [
          "**a)** El profesor dice la palabra y da un golpe en la mesa en la sílaba fuerte: `li-món`, `na-ran-ja`. Hazlo tú con `plá-ta-no`.",
          "**b)** Tienes las tarjetas `li` y `món` sobre la mesa: pon la tarjeta roja encima de la sílaba fuerte.",
        ],
        s: [
          "**a)** El golpe fuerte va en `plá`.",
          "**b)** La tarjeta roja, sobre `món`.",
        ],
        ad: "El docente modela con la voz y con un golpe en la mesa, y el alumno responde imitando y colocando una tarjeta de color, sin escribir nada.",
      },
    ],
  },
  {
    t: "Mayúscula al salir, punto al llegar",
    d: "Reconocer y escribir oraciones completas con mayúscula inicial y punto final.",
    ic: "lapiz",
    nv: [
      {
        in: "Tira de texto sin puntuar: el sábado fuimos al castillo de xàtiva mi hermana y yo subimos andando hasta arriba desde la torre más alta se ve todo el valle a la vuelta merendamos en la plaza",
        p: [
          "**a)** Copia el texto repartido en cuatro oraciones, con sus mayúsculas y sus puntos, y explica qué criterio has seguido para cerrar cada una.",
          "**b)** Cuenta las palabras de la primera oración y separa en sílabas «sábado» y «castillo», señalando la sílaba tónica de cada una.",
          "**c)** Analiza la segunda oración: separa el sujeto del predicado e indica el núcleo de cada uno.",
          "**d)** Explica por qué «al castillo de Xàtiva» no llega a ser una oración, aunque sea un grupo de palabras con significado.",
          "**e)** Añade una quinta oración que cierre el texto y razona qué hace que el conjunto sea un texto y no una lista de oraciones sueltas.",
        ],
        s: [
          "**a)** «El sábado fuimos al castillo de Xàtiva. Mi hermana y yo subimos andando hasta arriba. Desde la torre más alta se ve todo el valle. A la vuelta merendamos en la plaza.» Se cierra una oración cada vez que el grupo de palabras ya tiene sentido completo por sí solo.",
          "**b)** Siete palabras: El, sábado, fuimos, al, castillo, de, Xàtiva. Sílabas: `sá-ba-do`, con la tónica en `sá`, y `cas-ti-llo`, con la tónica en `ti`.",
          "**c)** Sujeto: «Mi hermana y yo», con dos núcleos, «hermana» y «yo». Predicado: «subimos andando hasta arriba», con el núcleo «subimos».",
          "**d)** Porque no tiene sentido completo ni verbo en forma personal: nombra un lugar, pero no llega a informar de nada sobre él.",
          "**e)** Respuesta libre; debe empezar por mayúscula y acabar en punto. El conjunto es un texto porque todas las oraciones tratan del mismo asunto, la excursión al castillo, y se ordenan siguiendo el hilo del día.",
        ],
      },
      {
        in: "Tira de texto sin puntuar: el sábado fuimos al castillo de Xàtiva subimos andando hasta arriba desde la torre se ve todo el valle",
        p: [
          "**a)** Copia el texto repartido en tres oraciones, con sus mayúsculas y sus puntos.",
          "**b)** ¿Cuántas palabras tiene la primera oración? Separa además en sílabas «sábado» y «castillo».",
          "**c)** Explica por qué «el castillo de» no llega a ser una oración.",
          "**d)** Añade una cuarta oración que continúe el texto y di de qué habla el conjunto.",
        ],
        s: [
          "**a)** «El sábado fuimos al castillo de Xàtiva. Subimos andando hasta arriba. Desde la torre se ve todo el valle.»",
          "**b)** Siete palabras: El, sábado, fuimos, al, castillo, de, Xàtiva. Sílabas: `sá-ba-do` y `cas-ti-llo`.",
          "**c)** Porque no tiene sentido completo: empieza a decir algo del castillo y se corta antes de informar de nada.",
          "**d)** Respuesta libre; debe empezar por mayúscula y acabar en punto. El texto habla de una excursión al castillo de Xàtiva.",
        ],
        ad: "La tira se acorta de cuatro oraciones a tres, se retira el análisis de sujeto y predicado con sus núcleos y el apartado final solo pide añadir una oración y decir de qué habla el texto, sin razonar qué convierte un conjunto de oraciones en un texto.",
      },
      {
        in: "Tira de texto sin puntuar: el domingo hubo mercado en la plaza mi hermana compró naranjas",
        p: [
          "**a)** La primera oración ya está resuelta: «El domingo hubo mercado en la plaza.» Escribe tú la segunda con su mayúscula y su punto.",
          "**b)** ¿Cuántas oraciones hay en total? Señálalas con el dedo antes de contestar.",
          "**c)** Rodea las letras que van en mayúscula por empezar una oración.",
        ],
        s: [
          "**a)** «Mi hermana compró naranjas.»",
          "**b)** Dos oraciones.",
          "**c)** La E de «El» y la M de «Mi».",
        ],
        ad: "El texto baja de tres oraciones a dos, la primera va resuelta como modelo y el recuento se puede hacer señalando antes de escribir la respuesta.",
      },
      {
        p: [
          "**a)** Rodea la frase bien escrita: «el domingo hubo mercado.» · «El domingo hubo mercado.» · «El domingo hubo mercado»",
          "**b)** Pon el punto donde toca: «Mi hermana compró naranjas»",
          "**c)** Elige la que NO es una oración: «Llueve en la Albufera.» · «La barca de.» · «Los patos nadan.»",
        ],
        s: [
          "**a)** «El domingo hubo mercado.»",
          "**b)** «Mi hermana compró naranjas.»",
          "**c)** «La barca de.», porque se queda a medias y no dice nada completo.",
        ],
        ad: "Cada apartado ofrece opciones cerradas o una única marca que añadir, y todas las frases son cortas y del mismo contexto del mercado.",
      },
      {
        p: [
          "**a)** Sobre la mesa tienes las tarjetas MI · HERMANA · COMPRÓ · NARANJAS. Ordénalas y coloca al final la tarjeta del punto.",
          "**b)** Copia el modelo en la libreta: «Mi hermana compró naranjas.» Después di en voz alta por dónde empieza y por dónde acaba.",
        ],
        s: [
          "**a)** MI · HERMANA · COMPRÓ · NARANJAS y, al final, la tarjeta del punto.",
          "**b)** Copia correcta; empieza por mayúscula y acaba en punto.",
        ],
        ad: "La oración se construye moviendo tarjetas de palabras con la mano y después se copia de un modelo escrito, con la explicación dada oralmente.",
      },
    ],
  },
  {
    t: "La fila del abecedario",
    d: "Ordenar palabras por orden alfabético y localizarlas en el diccionario.",
    ic: "tarjetas",
    nv: [
      {
        in: "Palabras de una excursión a la Albufera: barca, arroz, patos, caña, agua, paseo, pescador, pescaban, barquera. Entrada del diccionario · **caña**: 1. Tallo hueco y con nudos de algunas plantas. 2. Vara larga con un sedal en la punta que sirve para pescar. 3. Vaso alto y estrecho en el que se sirve la cerveza. 4. Parte de la bota que cubre la pierna.",
        p: [
          "**a)** Ordena alfabéticamente las nueve palabras y explica qué haces cuando dos de ellas empiezan por las mismas letras.",
          "**b)** Una página del diccionario tiene las palabras guía «pared» y «pez». Di cuáles de la lista aparecen en esa página y justifícalo letra a letra.",
          "**c)** Explica en qué forma hay que buscar «pescaban» y «barquera» y por qué no aparecen en el diccionario tal como están escritas.",
          "**d)** Elige la acepción de «caña» que corresponde a cada oración y justifica tu elección con el contexto: «El pescador dejó la caña sobre la barca.» · «Los patos se esconden entre las cañas.» · «Nos tomamos una caña en el Palmar.»",
          "**e)** Elige otra palabra de la lista que tenga más de un significado y redacta dos oraciones en las que signifique cosas distintas.",
        ],
        s: [
          "**a)** agua, arroz, barca, barquera, caña, paseo, patos, pescaban, pescador. Cuando la primera letra coincide se compara la segunda, y si también coincide, la tercera, y así sucesivamente: `barc` va antes que `barq` (la c antes que la q) y `pescab` antes que `pescad` (la b antes que la d).",
          "**b)** Paseo, patos, pescaban y pescador. Van detrás de «pared» porque en «paseo» y «patos» la tercera letra (s, t) es posterior a la r, y en «pescaban» y «pescador» la segunda letra (e) es posterior a la a. Y van delante de «pez» porque «paseo» y «patos» llevan a en segunda posición, anterior a la e, y en «pescaban» y «pescador» la tercera letra es la s, anterior a la z.",
          "**c)** «Pescaban» se busca en infinitivo, «pescar», porque el diccionario recoge los verbos en esa forma; «barquera» se busca en masculino singular, «barquero», porque así es como se registran los sustantivos.",
          "**d)** Primera oración, acepción 2: la deja un pescador y va sobre una barca. Segunda oración, acepción 1: los patos se esconden entre las plantas de la orilla. Tercera oración, acepción 3: se toma en un bar del Palmar.",
          "**e)** Respuesta libre, por ejemplo «paseo»: «Dimos un paseo en barca por la Albufera.» (la acción de pasear) · «El paseo marítimo estaba lleno de gente.» (el lugar por donde se pasea).",
        ],
      },
      {
        in: "Palabras de una excursión a la Albufera: barca, arroz, patos, caña, agua, paseo, pescador.",
        p: [
          "**a)** Ordena alfabéticamente las siete palabras.",
          "**b)** Explica qué has tenido que hacer con «paseo», «patos» y «pescador», que empiezan igual.",
          "**c)** Una página del diccionario tiene las palabras guía «pared» y «pez». ¿Cuáles de la lista están en esa página? Justifícalo.",
          "**d)** ¿Cómo buscarías «pescaban» en el diccionario? Explica por qué no aparece tal cual.",
        ],
        s: [
          "**a)** agua, arroz, barca, caña, paseo, patos, pescador.",
          "**b)** Si la primera letra coincide se mira la segunda, y si también coincide, la tercera: pas, pat, pes.",
          "**c)** Paseo, patos y pescador, porque las tres van detrás de «pared» y delante de «pez».",
          "**d)** En infinitivo, «pescar»: los verbos se buscan siempre en infinitivo, igual que los sustantivos se buscan en masculino singular.",
        ],
        ad: "Se ordenan siete palabras en lugar de nueve, se retira la entrada de diccionario con sus cuatro acepciones —y con ella la elección de la acepción según el contexto y la redacción con una palabra polisémica— y la búsqueda se limita a un verbo, sin el sustantivo en femenino.",
      },
      {
        in: "Cuatro palabras de la excursión: barca, agua, caña, arroz.",
        p: [
          "**a)** Fíjate: «agua» va antes que «arroz» porque la g va antes que la r. Ordena ahora las cuatro palabras.",
          "**b)** De «paseo» y «patos», ¿cuál va primero? Señálalo y di en qué letra te has fijado.",
          "**c)** ¿En qué letra del diccionario buscarías «pescador»?",
        ],
        s: [
          "**a)** agua, arroz, barca, caña.",
          "**b)** Paseo; en la tercera letra, porque la s va antes que la t.",
          "**c)** En la letra P.",
        ],
        ad: "Se trabaja con cuatro palabras en lugar de siete, se regala un ejemplo ya razonado y la comparación difícil se resuelve señalando y contestando en voz alta.",
      },
      {
        in: "Banco de palabras: agua · barca · caña · patos. El abecedario está colgado en la pared.",
        p: [
          "**a)** Numera las palabras del 1 al 4 siguiendo el abecedario.",
          "**b)** Rodea la palabra que va la primera de todas.",
          "**c)** Une cada palabra con su letra inicial: a · b · c · p.",
        ],
        s: [
          "**a)** 1 agua · 2 barca · 3 caña · 4 patos.",
          "**b)** Agua.",
          "**c)** agua con a · barca con b · caña con c · patos con p.",
        ],
        ad: "Las cuatro palabras empiezan por letras distintas, el abecedario permanece a la vista y la tarea se reduce a numerar, rodear y unir.",
      },
      {
        p: [
          "**a)** Tienes las tarjetas agua, barca y caña. Colócalas en fila sobre la tira del abecedario de la mesa.",
          "**b)** Di en voz alta la letra por la que empieza cada tarjeta.",
        ],
        s: [
          "**a)** agua, barca, caña.",
          "**b)** a, b, c.",
        ],
        ad: "Solo tres tarjetas, que se colocan físicamente sobre una tira del abecedario, y la respuesta se da oralmente sin necesidad de escribir.",
      },
    ],
  },
  {
    t: "El semáforo de la frase",
    d: "Colocar puntos, comas, mayúsculas y signos de interrogación o exclamación.",
    ic: "semaforo",
    nv: [
      {
        in: "Mensaje sin puntuar: mañana hay falla en mi barrio vendrás a verla con nosotros qué bonita es la de la calle colón por la tarde hay mascletà por la noche hay cremà compramos de todo buñuelos chocolate horchata y agua",
        p: [
          "**a)** Copia el mensaje puntuado: mayúsculas, puntos, comas, punto y coma, dos puntos y los signos de interrogación y de exclamación que falten.",
          "**b)** Justifica el punto y coma y los dos puntos que has colocado: ¿qué hace cada uno que no haría una coma?",
          "**c)** Explica por qué en la enumeración final no se pone coma delante de la «y».",
          "**d)** Clasifica todas las mayúsculas del texto según el motivo por el que las llevan.",
          "**e)** Redacta un mensaje de cuatro o cinco líneas invitando a un compañero a las fiestas de tu pueblo. Debe llevar una pregunta, una exclamación, una enumeración presentada con dos puntos y un punto y coma.",
        ],
        s: [
          "**a)** «Mañana hay falla en mi barrio. ¿Vendrás a verla con nosotros? ¡Qué bonita es la de la calle Colón! Por la tarde hay mascletà; por la noche hay cremà. Compramos de todo: buñuelos, chocolate, horchata y agua.»",
          "**b)** El punto y coma separa dos oraciones muy relacionadas entre sí, las dos actividades del mismo día, con una pausa mayor que la de la coma pero sin cortar el hilo como haría el punto. Los dos puntos anuncian la enumeración que viene detrás: cierran «Compramos de todo» y abren la lista que lo concreta.",
          "**c)** Porque la «y» ya enlaza los dos últimos elementos: la coma separa los elementos de la serie y la conjunción la cierra.",
          "**d)** Por empezar oración: «Mañana», que abre el texto; «Vendrás» y «Compramos», que van detrás de un punto; «Qué» y «Por», que van detrás del cierre de interrogación y de exclamación, signos que equivalen a un punto. Por ser nombre propio: «Colón».",
          "**e)** Respuesta libre. Se comprueba que aparezcan los cuatro signos pedidos y que cada oración empiece por mayúscula y acabe en punto o en el signo que le corresponda.",
        ],
      },
      {
        in: "Mensaje sin puntuar: mañana hay falla en mi barrio vendrás a verla con nosotros qué bonita es la de la calle Colón compramos buñuelos chocolate horchata y agua",
        p: [
          "**a)** Copia el mensaje puntuado: mayúsculas, puntos, comas y los signos de interrogación y exclamación que falten.",
          "**b)** Explica por qué en la lista final no se pone coma delante de la «y».",
          "**c)** Señala dos palabras que lleven mayúscula por motivos distintos y di cuál es el motivo de cada una.",
        ],
        s: [
          "**a)** «Mañana hay falla en mi barrio. ¿Vendrás a verla con nosotros? ¡Qué bonita es la de la calle Colón! Compramos buñuelos, chocolate, horchata y agua.»",
          "**b)** Porque la «y» ya enlaza los dos últimos elementos: la coma separa el resto de la lista y la «y» la cierra.",
          "**c)** «Mañana» lleva mayúscula por empezar la oración; «Colón» la lleva por ser nombre propio.",
        ],
        ad: "El mensaje se acorta y se queda solo con punto, coma, interrogación y exclamación: se retiran el punto y coma y los dos puntos con su justificación, la clasificación de las mayúsculas se reduce a dos casos y desaparece la redacción final del mensaje de invitación.",
      },
      {
        in: "Mensaje sin puntuar: mañana hay falla en mi barrio vendrás a verla compramos buñuelos chocolate y horchata",
        p: [
          "**a)** La primera oración ya está puntuada: «Mañana hay falla en mi barrio.» Escribe la segunda, que es una pregunta, con el signo de abrir y el de cerrar.",
          "**b)** Pon la coma que falta en la lista de la última oración.",
          "**c)** Señala las tres mayúsculas que van por empezar una oración.",
        ],
        s: [
          "**a)** «¿Vendrás a verla?»",
          "**b)** «Compramos buñuelos, chocolate y horchata.»",
          "**c)** Mañana, Vendrás y Compramos.",
        ],
        ad: "El mensaje se acorta, la primera oración va resuelta como modelo y se avisa de antemano de que la segunda es una pregunta, para no tener que deducirlo.",
      },
      {
        p: [
          "**a)** Rodea la frase bien escrita: «Vendrás a ver la falla?» · «¿Vendrás a ver la falla?» · «¿Vendrás a ver la falla»",
          "**b)** Pon las dos comas que faltan: «Compramos buñuelos chocolate horchata y agua.»",
          "**c)** Rodea la letra que tendría que ir en mayúscula: «mañana hay falla en mi barrio.»",
        ],
        s: [
          "**a)** «¿Vendrás a ver la falla?», porque en español la pregunta se abre y se cierra.",
          "**b)** «Compramos buñuelos, chocolate, horchata y agua.»",
          "**c)** La m de «mañana», que debe ser «Mañana».",
        ],
        ad: "Se elige entre tres opciones cerradas, cada apartado pide una sola marca y todas las frases son breves y del mismo contexto de las fallas.",
      },
      {
        p: [
          "**a)** Tienes cuatro tarjetas de signos: punto, coma, ¿? y ¡! El profesor lee con entonación «Mañana hay falla en mi barrio» y «Vendrás a verla»: levanta la tarjeta que toca en cada caso.",
          "**b)** Copia el modelo con sus dos signos: «¿Vendrás a verla?»",
        ],
        s: [
          "**a)** En la primera, la tarjeta del punto; en la segunda, la de ¿?",
          "**b)** Copia correcta, con el signo de abrir y el de cerrar.",
        ],
        ad: "El docente lee en voz alta marcando la entonación y el alumno responde levantando una tarjeta de signo, antes de copiar un modelo ya escrito.",
      },
    ],
  },
  {
    t: "¿De qué trata esto?",
    d: "Leer un texto corto y sacar el tema, la idea principal y una respuesta completa.",
    ic: "lupa",
    nv: [
      {
        in: "Texto: «En la Albufera, los barqueros llevan a los visitantes a ver la puesta de sol. Las barcas salen del Palmar cuando cae la tarde y cruzan el lago en silencio. El paseo dura poco más de media hora. A veces se ven bancos de peces muy cerca de la superficie. Entre las cañas descansan cientos de pájaros, algunos llegados desde el norte de Europa. Por eso los barqueros piden que nadie grite ni encienda la música: el ruido asusta a las aves y las obliga a levantar el vuelo.»",
        p: [
          "**a)** ¿Cuál es el **tema** del texto? Exprésalo en pocas palabras, sin llegar a formar una oración.",
          "**b)** Escribe la **idea principal** en una oración e indica dos **ideas secundarias**; explica en qué se nota que lo son.",
          "**c)** Resume el texto en dos o tres líneas, con tus palabras y sin copiar ninguna oración entera.",
          "**d)** ¿Por qué piden los barqueros que nadie grite? Responde con una frase completa y apóyate en lo que dice el texto.",
          "**e)** Busca «banco» en el diccionario: copia dos acepciones distintas, di cuál es la que vale aquí y explica qué palabras del texto te lo han indicado.",
        ],
        s: [
          "**a)** Los paseos en barca por la Albufera al atardecer y el silencio que exigen.",
          "**b)** Idea principal: «Los barqueros de la Albufera pasean a los visitantes al atardecer y piden silencio para no molestar a las aves.» Ideas secundarias: que las barcas salen del Palmar y que el paseo dura poco más de media hora, o que algunos pájaros llegan desde el norte de Europa. Se nota que son secundarias porque son detalles que se pueden quitar y el texto se sigue entendiendo igual.",
          "**c)** Resumen modelo: «Al atardecer, los barqueros de la Albufera llevan a los visitantes a ver la puesta de sol en un paseo de media hora. Como entre las cañas descansan muchas aves, piden que nadie grite ni ponga música, porque el ruido las espanta.»",
          "**d)** «Los barqueros piden silencio porque el ruido asusta a las aves que descansan entre las cañas y las obliga a levantar el vuelo.»",
          "**e)** Entre las acepciones de «banco» están la de asiento largo para varias personas y la de conjunto numeroso de peces que se desplazan juntos. Aquí vale la segunda, porque el texto habla de lo que se ve en el agua, cerca de la superficie, y dice «bancos de peces».",
        ],
      },
      {
        in: "Texto: «En la Albufera, los barqueros llevan a los visitantes a ver la puesta de sol. Las barcas salen del Palmar cuando cae la tarde y cruzan el lago en silencio. Muchos pájaros descansan entre las cañas. Los barqueros piden que nadie grite, porque el ruido los asusta.»",
        p: [
          "**a)** ¿De qué trata el texto? Escríbelo en una sola frase.",
          "**b)** Subraya la oración que resume mejor todo el texto y explica por qué has elegido esa.",
          "**c)** ¿Por qué piden silencio los barqueros? Responde con una frase completa.",
          "**d)** ¿En qué letra buscarías «barquero» y en qué página estaría: en la de «barco / bastón» o en la de «banco / barba»?",
        ],
        s: [
          "**a)** Trata de los paseos en barca por la Albufera al atardecer.",
          "**b)** «En la Albufera, los barqueros llevan a los visitantes a ver la puesta de sol»: las demás oraciones solo añaden detalles (de dónde salen, qué hay entre las cañas, qué piden).",
          "**c)** «Piden silencio porque el ruido asusta a los pájaros que descansan entre las cañas.»",
          "**d)** En la B, en la página de «barco / bastón», porque barquero va detrás de barco (la c antes que la q) y delante de bastón (la r antes que la s).",
        ],
        ad: "El texto baja de seis oraciones a cuatro, se retiran el resumen y la distinción entre tema, idea principal e ideas secundarias —basta con decir de qué trata y subrayar la oración que lo resume— y la consulta del diccionario se limita a localizar la letra y la página, sin elegir acepciones.",
      },
      {
        in: "Texto: «En la Albufera, los barqueros llevan a los visitantes a ver la puesta de sol. Muchos pájaros descansan entre las cañas. Los barqueros piden que nadie grite.»",
        p: [
          "**a)** ¿De qué trata el texto? Empieza tu respuesta así: «El texto trata de…».",
          "**b)** Señala en el texto dónde dice que los pájaros descansan.",
          "**c)** ¿Por qué crees que piden que nadie grite? Contesta con una frase completa.",
        ],
        s: [
          "**a)** «El texto trata de los paseos en barca por la Albufera.»",
          "**b)** En la segunda oración: «Muchos pájaros descansan entre las cañas.»",
          "**c)** «Piden silencio para no asustar a los pájaros.»",
        ],
        ad: "El texto se recorta a tres oraciones, se entrega hecho el comienzo de la respuesta escrita y uno de los apartados se resuelve señalando dentro del texto.",
      },
      {
        in: "Texto: «En la Albufera, los barqueros llevan a los visitantes en barca. Muchos pájaros descansan entre las cañas.» Banco de palabras: barca · pájaros · Albufera.",
        p: [
          "**a)** Rodea de qué trata el texto: de un partido de fútbol · de un paseo en barca · de una receta de cocina.",
          "**b)** Completa con una palabra del banco: «Los barqueros llevan a la gente en ___.»",
          "**c)** ¿Dónde descansan los pájaros? Elige: entre las cañas · en el instituto · en el mercado.",
        ],
        s: [
          "**a)** De un paseo en barca.",
          "**b)** «Los barqueros llevan a la gente en **barca**.»",
          "**c)** Entre las cañas.",
        ],
        ad: "El texto se queda en dos oraciones, dos apartados se responden eligiendo entre tres opciones y el hueco se rellena con un banco de palabras a la vista.",
      },
      {
        p: [
          "**a)** El profesor lee el texto en voz alta dos veces. Señala en la lámina la foto que le corresponde: una barca en la Albufera o un patio de instituto.",
          "**b)** Contesta en voz alta y copia después el modelo: «El texto trata de una barca.»",
        ],
        s: [
          "**a)** La foto de la barca en la Albufera.",
          "**b)** Respuesta oral correcta y copia del modelo.",
        ],
        ad: "La lectura corre a cargo del docente, la comprensión se demuestra señalando una lámina con dos fotos y la frase final se copia de un modelo dado.",
      },
    ],
  },
];
