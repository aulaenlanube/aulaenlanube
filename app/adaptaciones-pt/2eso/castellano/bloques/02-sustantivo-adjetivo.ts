// Bloque 2 del Tema 1 · Sustantivo y adjetivo · Adaptaciones PT · 2.º ESO
// Cuatro niveles por actividad: 1.º ESO (referencia), 6.º, 5.º y 4.º de primaria.

import type { Ap, Act } from "../tipos";

export const AP: Ap = {
  slug: "02-sustantivo-adjetivo",
  n: 2,
  t: "Sustantivo y adjetivo",
  teoria: [
    "El **sustantivo** es la palabra que nombra: personas (*Neus*, *vecina*), animales (*jabalí*), objetos (*mochila*), lugares (*Xàtiva*, *mercado*) y también ideas o sentimientos que no se pueden tocar (*libertad*, *envidia*). Para saber si una palabra es un sustantivo tienes un truco que casi nunca falla: ponle delante un determinante. Si suena bien decir *el*, *la*, *un* o *esta* (*la envidia*, *un jabalí*), es un sustantivo. Además, el sustantivo es el **núcleo** del grupo de palabras en el que aparece: manda sobre todas las que lo acompañan.",
    "Los sustantivos tienen **género** (masculino o femenino) y **número** (singular o plural). Cuidado: la terminación ayuda, pero no decide — *el mapa* y *el problema* son masculinos aunque acaben en *-a*, y *la mano*, *la moto* o *la radio* son femeninos aunque acaben en *-o*. El caso que siempre cae en los exámenes: *el agua*, *el aula* y *el hacha* llevan *el* solo porque empiezan por *a* tónica, pero son **femeninos**, y se nota en el plural (*las aguas*) y en el adjetivo (*el agua fría*). El plural añade *-s* tras vocal (*silla → sillas*) y *-es* tras consonante (*papel → papeles*); si el singular acaba en *-z*, esa *z* se convierte en *c*: *lápiz → lápices*.",
    "RAW:<table><caption>Clases de sustantivo: cómo reconocerlas</caption><thead><tr><th>Clase</th><th>Qué nombra</th><th>Ejemplo</th><th>Truco para reconocerla</th></tr></thead><tbody><tr><td>Común</td><td>Cualquier ser de una clase</td><td>ciudad, río, falla</td><td>Va en minúscula y vale para muchos a la vez.</td></tr><tr><td>Propio</td><td>Un ser concreto, con su nombre</td><td>Xàtiva, el Túria, Neus</td><td>Lleva mayúscula inicial e identifica a uno solo.</td></tr><tr><td>Individual</td><td>Un único ser</td><td>oveja, músico, barco</td><td>Un ejemplar, una palabra.</td></tr><tr><td>Colectivo</td><td>Un conjunto, estando en singular</td><td>rebaño, orquesta, flota</td><td>Está en singular, pero nombra a muchos.</td></tr><tr><td>Concreto</td><td>Lo que se percibe con los sentidos</td><td>arroz, mochila, agua</td><td>Se puede ver, tocar, oler u oír.</td></tr><tr><td>Abstracto</td><td>Ideas, cualidades y sentimientos</td><td>valentía, amistad, miedo</td><td>Solo existe en la cabeza: no se toca.</td></tr><tr><td>Contable</td><td>Lo que se cuenta de uno en uno</td><td>dos fallas, tres lápices</td><td>Admite «una, dos, tres…» delante.</td></tr><tr><td>Incontable</td><td>Lo que se mide o se pesa</td><td>arroz, agua, azafrán</td><td>Se dice «un kilo de…», no «dos arroces».</td></tr></tbody></table>",
    "El **adjetivo calificativo** dice cómo es o cómo está el sustantivo al que acompaña: *una barca vieja*, *el agua turbia*, *unas paellas humeantes*. Su regla de oro es la **concordancia**: copia el género y el número del sustantivo, porque depende de él (*las murallas antiguas*, nunca *las murallas antiguo*). Los hay de **dos terminaciones**, que cambian según el género (*alto / alta*), y de **una terminación**, que sirven para los dos (*alegre*, *feliz*, *verde*); todos, eso sí, cambian en plural. Suele colocarse detrás del sustantivo, aunque puede ir delante para dar un matiz más literario o afectivo (*un valiente pescador*). Cuando un determinante, un sustantivo y un adjetivo van juntos forman un **sintagma nominal** con el sustantivo de núcleo; fíjate en cómo se marca la concordancia en el esquema:",
    "Fig:sintagma",
    "Un mismo adjetivo puede expresar la cualidad en distintos niveles: son los **grados**. En **positivo** se dice sin más (*Morella es antigua*). En **comparativo** se ponen dos cosas cara a cara: de superioridad (*más antigua que Xàtiva*), de igualdad (*tan antigua como Peñíscola*) y de inferioridad (*menos antigua que Sagunto*). En **superlativo** se llega al máximo, y aquí hay dos: el **absoluto**, que no compara con nadie (*antiquísima*, *muy antigua*), y el **relativo**, que destaca dentro de un grupo (*la más antigua de la comarca*). No mezcles los dos últimos: *ruidosísima* es una fiesta muy ruidosa; *la más ruidosa del barrio* gana a todas las demás fiestas del barrio.",
  ],
  ej: [
    "«La Albufera» es sustantivo propio (nombra un único lugar y lleva mayúscula); «el arrozal» es común, concreto y contable.",
    "«El agua turbia» lleva *el* por empezar por *a* tónica, pero es femenino: el adjetivo lo delata — *turbia*, no *turbio*.",
    "«Morella es más antigua que Xàtiva» está en comparativo de superioridad; «Morella es antiquísima», en superlativo absoluto.",
  ],
};

export const ACTS: Act[] = [
  {
    t: "Nombres en el mercado",
    d: "Localizar los sustantivos de un texto y separar los comunes de los propios.",
    ic: "etiqueta",
    nv: [
      {
        in: "Neus cruzó el mercado de Xàtiva con su abuela: compró naranjas, un ramo de flores y azafrán; la alegría de su hermano al ver el pastel duró toda la tarde.",
        p: [
          "**a)** Copia todos los sustantivos del texto y clasifícalos en comunes y propios; justifica por qué dos de ellos llevan mayúscula.",
          "**b)** Señala el sustantivo que nombra un sentimiento y explica cómo lo has reconocido.",
          "**c)** Sustituye «naranjas» por un sustantivo propio y explica qué cambia en el significado de la frase.",
        ],
        s: [
          "**a)** Comunes: mercado, abuela, naranjas, ramo, flores, azafrán, alegría, hermano, pastel, tarde. Propios: Neus y Xàtiva, con mayúscula porque identifican a una persona y a un pueblo únicos.",
          "**b)** «alegría»: no se puede ver ni tocar, solo se siente, así que es un sustantivo abstracto.",
          "**c)** Respuesta abierta, por ejemplo «compró Navelinas»: se pasa de nombrar una clase de fruta a identificar una variedad concreta con su nombre propio.",
        ],
      },
      {
        in: "Neus cruzó el mercado de Xàtiva con su abuela y compró naranjas, flores y azafrán.",
        p: [
          "**a)** Copia los siete sustantivos de la frase. Ya tienes uno resuelto: «mercado».",
          "**b)** Rodea los dos que son propios y di por qué lo son.",
          "**c)** ¿Cuál de los sustantivos podrías cambiar por «tomates» sin que la frase quede rara?",
        ],
        s: [
          "**a)** Neus, mercado, Xàtiva, abuela, naranjas, flores, azafrán.",
          "**b)** Neus y Xàtiva: nombran a una persona concreta y a un pueblo concreto, por eso se escriben con mayúscula.",
          "**c)** «naranjas», porque también es un producto del mercado: un sustantivo común y contable.",
        ],
        ad: "El texto se reduce a una sola frase, se dice cuántos sustantivos hay y se da el primero ya resuelto; vale señalarlos con el dedo antes de copiarlos.",
      },
      {
        in: "Banco de palabras: Neus · mercado · Xàtiva · abuela · naranjas · corrió · bonito · con",
        p: [
          "**a)** Del banco de palabras, rodea solo las cinco que son sustantivos (nombran personas, cosas o lugares).",
          "**b)** Une con flechas: «Neus» y «Xàtiva» con la etiqueta SUSTANTIVO PROPIO; «mercado», «abuela» y «naranjas» con la etiqueta SUSTANTIVO COMÚN.",
          "**c)** Elige la opción correcta: los sustantivos propios se escriben con... (1) mayúscula inicial · (2) minúscula · (3) tilde.",
        ],
        s: [
          "**a)** Neus, mercado, Xàtiva, abuela, naranjas. No lo son: corrió, bonito, con.",
          "**b)** Propios: Neus, Xàtiva. Comunes: mercado, abuela, naranjas.",
          "**c)** Opción 1: mayúscula inicial.",
        ],
        ad: "Se pasa de copiar a rodear y unir sobre un banco de palabras cerrado, con una pregunta de tres opciones y sin justificación escrita.",
      },
      {
        in: "Material: tarjetas azules para los nombres comunes (mesa, ventana, mochila, pizarra) y tarjetas rojas para los nombres propios.",
        p: [
          "**a)** El profesor señala un objeto del aula, tú dices su nombre en voz alta y colocas encima una tarjeta azul.",
          "**b)** Di tu nombre y el de tu pueblo y coloca la tarjeta roja: son nombres propios y empiezan por letra mayúscula.",
        ],
        s: [
          "**a)** El alumno nombra los objetos (mesa, ventana, mochila, pizarra) y pone la tarjeta azul: son nombres comunes porque en el aula hay varios iguales.",
          "**b)** Respuesta personal, por ejemplo «Me llamo Marc y vivo en Alzira»: dos nombres propios, con tarjeta roja y mayúscula inicial.",
        ],
        ad: "La tarea se resuelve de forma oral y manipulativa, con tarjetas de dos colores sobre objetos reales del aula, en solo dos apartados y sin escribir.",
      },
    ],
  },
  {
    t: "Trampas de género y número",
    d: "Decidir el género y el número de sustantivos que engañan por su terminación.",
    ic: "lupa",
    nv: [
      {
        in: "el agua · el mapa · la mano · el problema · la moto · la radio · el lápiz · el jabalí",
        p: [
          "**a)** Escribe el género de cada sustantivo y explica por qué «el agua» es femenino aunque lleve *el*.",
          "**b)** Pon en plural «el lápiz» y «el jabalí» y di qué regla has aplicado en cada caso.",
          "**c)** Escribe una frase con «el agua» y un adjetivo que demuestre el género del sustantivo.",
        ],
        s: [
          "**a)** Femeninos: agua, mano, moto, radio. Masculinos: mapa, problema, lápiz, jabalí. «El agua» lleva *el* únicamente porque empieza por *a* tónica, pero es femenino, como prueba el plural *las aguas*.",
          "**b)** «los lápices»: la *z* final pasa a *c* delante de *-es*. «los jabalíes»: los acabados en *-í* tónica admiten *-es* (también se acepta *jabalís*).",
          "**c)** Por ejemplo: «El agua de la Albufera está turbia». El adjetivo va en femenino, luego el sustantivo también lo es.",
        ],
      },
      {
        in: "el agua · el mapa · la mano · el lápiz",
        p: [
          "**a)** Escribe al lado de cada uno si es masculino o femenino. Ejemplo resuelto: «el mapa» → masculino, aunque acabe en *-a*.",
          "**b)** «El agua» es femenino aunque lleve *el*. Compruébalo escribiéndolo en plural y mira qué determinante le toca.",
          "**c)** Escribe el plural de «el lápiz». Pista: la *z* se convierte en *c*.",
        ],
        s: [
          "**a)** el agua → femenino; la mano → femenino; el lápiz → masculino.",
          "**b)** «las aguas»: en plural aparece *las*, que es femenino.",
          "**c)** «los lápices».",
        ],
        ad: "La lista baja a cuatro sustantivos, se da un caso ya resuelto y cada apartado lleva una pista que indica por dónde empezar.",
      },
      {
        in: "Palabras a la vista: el mapa · la mano · el agua · el lápiz",
        p: [
          "**a)** Rodea el determinante correcto: (el / la) mano · (el / la) mapa.",
          "**b)** Elige entre tres: el plural de «lápiz» es... (1) lápizes · (2) lápices · (3) lápiz.",
          "**c)** Copia y completa: «El agua está *fría / frío*», porque «agua» es un sustantivo (masculino / femenino).",
        ],
        s: [
          "**a)** la mano · el mapa.",
          "**b)** Opción 2: lápices.",
          "**c)** «El agua está **fría**», porque «agua» es un sustantivo **femenino**.",
        ],
        ad: "Todo se resuelve rodeando o eligiendo entre dos o tres opciones, con las palabras siempre a la vista y frases de una sola línea.",
      },
      {
        in: "Material: dos tarjetas grandes con los artículos EL y LA, y dibujos de mano, mapa, moto y lápiz.",
        p: [
          "**a)** El profesor dice una palabra en voz alta y tú levantas la tarjeta EL o la tarjeta LA.",
          "**b)** Coge un lápiz y di «un lápiz»; después coge dos y di en voz alta cuántos tienes.",
        ],
        s: [
          "**a)** LA mano · EL mapa · LA moto · EL lápiz.",
          "**b)** «dos lápices»: al pasar de uno a varios, la palabra cambia y se oye la terminación *-es*.",
        ],
        ad: "Basta con levantar la tarjeta del artículo y responder de viva voz manipulando objetos reales de la mesa; dos apartados y nada que escribir.",
      },
    ],
  },
  {
    t: "El detector de clases",
    d: "Clasificar sustantivos en individuales y colectivos, concretos y abstractos, contables e incontables.",
    ic: "arbol",
    nv: [
      {
        in: "rebaño · valentía · arroz · oveja · falla · músico · orquesta · agua",
        p: [
          "**a)** Clasifica cada sustantivo en dos columnas: concreto o abstracto, y contable o incontable.",
          "**b)** Encuentra las dos parejas individual–colectivo escondidas en la lista y añade tú una tercera pareja.",
          "**c)** Explica por qué «arroz» cambia de clase en «dos arroces de la carta» y qué ocurre con «agua» en «dos aguas, por favor».",
        ],
        s: [
          "**a)** Concretos: rebaño, arroz, oveja, falla, músico, orquesta, agua. Abstracto: valentía. Contables: rebaño, oveja, falla, músico, orquesta. Incontables: arroz, agua y también valentía.",
          "**b)** oveja–rebaño y músico–orquesta. Tercera pareja libre: jugador–equipo, barco–flota, árbol–arboleda...",
          "**c)** En «dos arroces» el incontable pasa a contable porque nombra clases o platos distintos; «dos aguas» significa «dos botellas de agua»: se cuenta el envase, no el líquido.",
        ],
      },
      {
        in: "oveja · rebaño · valentía · arroz",
        p: [
          "**a)** Une cada sustantivo con su etiqueta: individual · colectivo · abstracto · incontable. Ya tienes uno: «rebaño» → colectivo, porque es una palabra en singular que nombra muchas ovejas.",
          "**b)** ¿Cuál de los cuatro no se puede ver ni tocar? Señálalo y di cómo lo has sabido.",
          "**c)** Escribe una pareja individual–colectivo nueva. Pista: piensa en músicos que tocan juntos.",
        ],
        s: [
          "**a)** oveja → individual; rebaño → colectivo; valentía → abstracto; arroz → incontable.",
          "**b)** «valentía»: no se toca ni se ve, solo se demuestra; por eso es abstracto.",
          "**c)** músico (individual) – orquesta (colectivo). También vale jugador – equipo.",
        ],
        ad: "Se baja a cuatro sustantivos y a una tarea de unir con un caso ya resuelto, y la última pregunta lleva una pista que conduce a la respuesta.",
      },
      {
        in: "Banco de etiquetas: INDIVIDUAL · COLECTIVO · ABSTRACTO",
        p: [
          "**a)** Rodea el colectivo de cada pareja: oveja / rebaño · músico / orquesta.",
          "**b)** Elige entre tres: «valentía» es un sustantivo... (1) colectivo · (2) abstracto · (3) propio.",
          "**c)** Une con una flecha: «arroz» → SE MIDE (un kilo de arroz) · «falla» → SE CUENTA (una falla, dos fallas).",
        ],
        s: [
          "**a)** rebaño · orquesta.",
          "**b)** Opción 2: abstracto.",
          "**c)** arroz → SE MIDE; falla → SE CUENTA.",
        ],
        ad: "Solo hay que rodear, elegir entre tres y unir con flechas, con las etiquetas siempre visibles y sin explicar el porqué.",
      },
      {
        in: "Sobre la mesa: un bote con arroz, tres lápices y una foto de un rebaño de ovejas.",
        p: [
          "**a)** Señala lo que se puede contar de uno en uno y cuéntalo en voz alta; después señala lo que solo se puede pesar o medir.",
          "**b)** Mira la foto: muchas ovejas juntas se llaman con una sola palabra. Repite «rebaño» y dilo dentro de una frase.",
        ],
        s: [
          "**a)** Se cuentan los lápices: uno, dos, tres, porque son contables. El arroz no se cuenta grano a grano: se pesa o se mide, porque es incontable.",
          "**b)** Por ejemplo: «El rebaño sube al monte». Una sola palabra para muchas ovejas: es un sustantivo colectivo.",
        ],
        ad: "El contenido se toca: se cuenta y se pesa material real de la mesa y la respuesta es oral, con dos apartados y sin metalenguaje escrito.",
      },
    ],
  },
  {
    t: "Adjetivos a juego",
    d: "Añadir adjetivos que concuerden en género y número con su sustantivo.",
    ic: "paleta",
    fig: "sintagma",
    nv: [
      {
        in: "Un grupo de amigos sube al castillo de Xàtiva: las murallas ___, el camino ___, unas vistas ___ y un sol ___.",
        p: [
          "**a)** Completa con un adjetivo distinto en cada hueco y subraya la terminación que demuestra la concordancia.",
          "**b)** Di cuáles de los adjetivos que has usado son de una terminación y cuáles de dos.",
          "**c)** Cambia «las murallas» por «el muro» y reescribe el sintagma: ¿qué palabra ha tenido que cambiar y por qué?",
        ],
        s: [
          "**a)** Por ejemplo: «las murallas **antiguas**, el camino **empinado**, unas vistas **impresionantes** y un sol **abrasador**». Las terminaciones *-as*, *-o*, *-es* repiten el género y el número del sustantivo.",
          "**b)** De una terminación: *impresionantes*, que vale para masculino y femenino. De dos: antiguo/antigua, empinado/empinada, abrasador/abrasadora.",
          "**c)** «el muro **antiguo**»: cambia el adjetivo, que pasa a masculino singular porque debe concordar con el nuevo núcleo del sintagma.",
        ],
      },
      {
        in: "las murallas ___ · el camino ___ · unas vistas ___. Banco: antiguas · empinado · preciosas · antiguo",
        p: [
          "**a)** Elige del banco el adjetivo que encaja en cada hueco. Ejemplo resuelto: «el camino **empinado**».",
          "**b)** ¿Por qué no vale «las murallas antiguo»? Dilo con tus palabras o señala la terminación que falla.",
          "**c)** Escribe un adjetivo tuyo para «un sol ___».",
        ],
        s: [
          "**a)** las murallas **antiguas** · el camino **empinado** · unas vistas **preciosas**.",
          "**b)** Porque «murallas» es femenino plural y «antiguo» es masculino singular: la terminación no coincide, tendría que ser «antiguas».",
          "**c)** Respuesta abierta: «un sol fuerte», «un sol abrasador»... siempre en masculino singular.",
        ],
        ad: "Se entrega un banco con los adjetivos ya escritos y un hueco resuelto, y la justificación puede darse en voz alta o señalando la terminación.",
      },
      {
        in: "Banco: alta · alto · altas · altos",
        p: [
          "**a)** Rodea la forma correcta: las murallas (alta / altas) · el muro (alto / altos).",
          "**b)** Copia y completa con *-o* o *-a*: «una torre alt__» y «un castillo antigu__».",
          "**c)** Elige entre tres: el adjetivo copia del sustantivo... (1) la letra inicial · (2) el género y el número · (3) la tilde.",
        ],
        s: [
          "**a)** las murallas **altas** · el muro **alto**.",
          "**b)** «una torre alt**a**» y «un castillo antigu**o**».",
          "**c)** Opción 2: el género y el número.",
        ],
        ad: "Las cuatro formas del adjetivo están a la vista, solo hay que rodear o escribir la última letra y no se pide ninguna explicación.",
      },
      {
        in: "Material: dos tarjetas rosas con los sustantivos MESA y LIBRO y cuatro tarjetas verdes con los adjetivos NUEVA, NUEVO, ROJA y ROJO.",
        p: [
          "**a)** Coloca junto a MESA la tarjeta verde que suene bien y haz lo mismo con LIBRO. Di la pareja en voz alta.",
          "**b)** Señala una cosa del aula y descríbela con una palabra: «la silla ___», «el suelo ___».",
        ],
        s: [
          "**a)** MESA + NUEVA o ROJA; LIBRO + NUEVO o ROJO: las dos tarjetas de cada pareja terminan igual, en *-a* o en *-o*.",
          "**b)** Por ejemplo: «la silla azul», «el suelo limpio». El alumno describe objetos reales del aula en voz alta.",
        ],
        ad: "Se trabaja emparejando tarjetas de colores y hablando, con un solo par de sustantivos y respuestas siempre orales.",
      },
    ],
  },
  {
    t: "El termómetro del adjetivo",
    d: "Reconocer y construir los grados del adjetivo: positivo, comparativo y superlativo.",
    ic: "semaforo",
    nv: [
      {
        in: "1) Morella es antigua. 2) Morella es más antigua que Xàtiva. 3) Morella es tan antigua como Peñíscola. 4) Morella es la más antigua de la comarca. 5) Morella es antiquísima.",
        p: [
          "**a)** Indica el grado de cada una de las cinco frases y nombra las marcas que te han servido para decidirlo.",
          "**b)** Escribe un comparativo de inferioridad y un superlativo relativo con el adjetivo «ruidoso».",
          "**c)** Explica la diferencia de significado entre «la fiesta más ruidosa del barrio» y «una fiesta ruidosísima».",
        ],
        s: [
          "**a)** 1) positivo, sin marcas; 2) comparativo de superioridad, *más… que*; 3) comparativo de igualdad, *tan… como*; 4) superlativo relativo, *la más… de*; 5) superlativo absoluto, sufijo *-ísima*.",
          "**b)** Por ejemplo: «Mi calle es menos ruidosa que la tuya» (inferioridad) y «Es la calle más ruidosa del barrio» (superlativo relativo).",
          "**c)** El superlativo relativo compara dentro de un grupo: de todas las fiestas del barrio, esa gana. El absoluto expresa el grado máximo sin compararlo con nadie.",
        ],
      },
      {
        in: "1) Morella es antigua. 2) Morella es más antigua que Xàtiva. 3) Morella es la más antigua de la comarca.",
        p: [
          "**a)** Une cada frase con su grado: positivo · comparativo · superlativo. Ya tienes la 1: positivo.",
          "**b)** Rodea en las frases 2 y 3 las palabras que avisan del grado.",
          "**c)** Convierte «Mi mochila es pesada» en una comparación con la mochila de tu compañero.",
        ],
        s: [
          "**a)** 1 → positivo; 2 → comparativo (de superioridad); 3 → superlativo (relativo).",
          "**b)** Frase 2: *más… que*. Frase 3: *la más… de*.",
          "**c)** Por ejemplo: «Mi mochila es más pesada que la de Sergi» o «menos pesada que la de Sergi».",
        ],
        ad: "Se pasa de cinco frases a tres, la primera va resuelta y basta con unir y rodear las marcas en lugar de nombrar cada subtipo.",
      },
      {
        in: "Banco de marcas: más… que · tan… como · muy",
        p: [
          "**a)** Rodea la marca que aparece en «El Túria es más largo que el Serpis»: (más… que / tan… como).",
          "**b)** Completa con el banco: «El agua está ___ fría» y «Marc es ___ alto ___ Julia».",
          "**c)** Elige entre tres: «altísimo» significa... (1) poco alto · (2) muy alto · (3) más bajo.",
        ],
        s: [
          "**a)** *más… que*.",
          "**b)** «El agua está **muy** fría» y «Marc es **tan** alto **como** Julia».",
          "**c)** Opción 2: muy alto.",
        ],
        ad: "Las marcas de grado están escritas en un banco a la vista y la tarea se limita a rodear, copiar una marca y elegir entre tres significados.",
      },
      {
        in: "Material: tres lápices de distinta longitud y tres tarjetas con LARGO, MÁS LARGO y EL MÁS LARGO.",
        p: [
          "**a)** Ordena los tres lápices de menor a mayor y coloca encima la tarjeta que le toca a cada uno. Léelo en voz alta.",
          "**b)** Compara tu estatura con la de un compañero usando «más alto que» o «menos alto que».",
        ],
        s: [
          "**a)** El lápiz pequeño lleva LARGO, el mediano MÁS LARGO y el grande EL MÁS LARGO: la escala de grados se ve y se toca.",
          "**b)** Por ejemplo: «Soy más alto que Aitana» o «Soy menos alto que Aitana», dicho de pie y en voz alta.",
        ],
        ad: "La escala de grados se convierte en material real que se ordena y se manipula, con respuesta oral y solo dos apartados.",
      },
    ],
  },
  {
    t: "Monta el sintagma",
    d: "Construir sintagmas nominales de determinante, sustantivo y adjetivo, y localizar su núcleo.",
    ic: "tarjetas",
    fig: "sintagma",
    nv: [
      {
        in: "Determinantes: la · unas · el · aquellas. Sustantivos: barca · paellas · pescador · fallas. Adjetivos: vieja · humeantes · madrugador · valencianas.",
        p: [
          "**a)** Forma cuatro sintagmas nominales de determinante + sustantivo + adjetivo usando todas las palabras del recuadro.",
          "**b)** Rodea el núcleo de cada sintagma y explica por qué el núcleo es el sustantivo y no el adjetivo.",
          "**c)** Escribe un sintagma nominal sobre la Albufera y di qué ocurriría si cambiaras el número del sustantivo.",
        ],
        s: [
          "**a)** «la barca vieja», «unas paellas humeantes», «el pescador madrugador» y «aquellas fallas valencianas»: en cada uno, las tres palabras comparten género y número.",
          "**b)** Núcleos: barca, paellas, pescador, fallas. Es el sustantivo porque es la palabra imprescindible — sin el adjetivo el sintagma sigue en pie — y porque impone el género y el número a las demás.",
          "**c)** Por ejemplo: «el pato silencioso» → «los patos silenciosos». Al cambiar el número del núcleo cambian también el determinante y el adjetivo, que dependen de él.",
        ],
      },
      {
        in: "la · unas · barca · paellas · vieja · humeantes",
        p: [
          "**a)** Monta los dos sintagmas nominales posibles. Recuerda el orden del esquema: determinante + sustantivo + adjetivo.",
          "**b)** Subraya el núcleo, es decir, el sustantivo, de cada uno.",
          "**c)** Quita primero el adjetivo y después el sustantivo. ¿Cuál de las dos versiones sigue nombrando algo?",
        ],
        s: [
          "**a)** «la barca vieja» y «unas paellas humeantes».",
          "**b)** Núcleos: **barca** y **paellas**.",
          "**c)** Sin el adjetivo, «la barca» sigue nombrando algo. Sin el sustantivo, el sintagma se queda sin la palabra que nombra: por eso el sustantivo es el núcleo.",
        ],
        ad: "Se trabaja con solo seis palabras para montar dos sintagmas, se recuerda el orden del esquema y la comprobación del núcleo se hace quitando piezas, sin redactar.",
      },
      {
        in: "Banco: la · el · barca · pescador · vieja · madrugador",
        p: [
          "**a)** Rodea la pareja correcta: (la barca vieja / la barca viejo).",
          "**b)** Une cada determinante con su sustantivo: «la» → barca / pescador; «el» → barca / pescador.",
          "**c)** En «la barca vieja», el núcleo es... elige entre tres: (1) la · (2) barca · (3) vieja.",
        ],
        s: [
          "**a)** «la barca vieja».",
          "**b)** la → barca; el → pescador.",
          "**c)** Opción 2: barca.",
        ],
        ad: "Todas las piezas se dan en un banco cerrado y la tarea consiste en rodear, unir y elegir entre tres, sin construir nada desde cero.",
      },
      {
        in: "Material: tarjetas amarillas (EL, LA), tarjetas rosas (GATO, SILLA) y tarjetas verdes (NEGRO, NEGRA).",
        p: [
          "**a)** Coloca en la mesa una tarjeta de cada color en este orden: amarilla, rosa y verde. Lee en voz alta lo que has formado.",
          "**b)** Levanta la tarjeta rosa: es la palabra que nombra, la más importante. Di qué queda cuando la quitas.",
        ],
        s: [
          "**a)** «EL GATO NEGRO» o «LA SILLA NEGRA»: las tres tarjetas de la fila terminan igual, en *-o* o en *-a*.",
          "**b)** Al quitar la tarjeta rosa queda «el ___ negro», que ya no nombra nada: el sustantivo es el núcleo del sintagma.",
        ],
        ad: "El sintagma se construye con tarjetas de tres colores siguiendo un orden fijo y la respuesta se da en voz alta, en solo dos apartados.",
      },
    ],
  },
];
