// Bloque 5 del Tema 1 de Lengua Castellana · Adaptaciones PT · 2.º ESO
// Acentuación: sílaba tónica, agudas/llanas/esdrújulas, diptongo e hiato y tilde diacrítica.
// Los cuatro niveles comparten objetivo y contexto; lo que baja es la exigencia de acceso.

import type { Ap, Act } from "../tipos";

export const AP: Ap = {
  slug: "05-acentuacion",
  n: 5,
  t: "Acentuación",
  teoria: [
    "Toda palabra se divide en **sílabas**, que son los golpes de voz con los que la pronunciamos: *pan* tiene una, *me-sa* tiene dos y *bo-lí-gra-fo* tiene cuatro. Para separarlas, recuerda que **cada sílaba necesita una vocal** y que hay grupos que nunca se parten: *pr*, *br*, *tr*, *dr*, *cl*, *fl*… y las letras *ch*, *ll* y *rr*, que suenan de una sola vez (*co-che*, *ca-lle*, *pe-rro*). En cada palabra hay una sílaba que suena más fuerte que las demás, la **sílaba tónica**; todas las otras son **átonas**. Si no localizas el golpe de voz no puedes decidir nada sobre la tilde: di la palabra en voz alta y da una palmada más fuerte donde suene con más energía.",
    "Fig:acentos",
    "No confundas dos palabras que se parecen mucho. El **acento** es el golpe de voz y lo tienen **todas** las palabras, sin excepción; la **tilde** es la rayita (´) que solo se escribe encima de la vocal tónica cuando la regla lo manda. *Mesa* tiene acento en «me», pero no lleva tilde; *jamón* tiene acento en «món» y sí la lleva. Según dónde caiga la tónica contando desde el final, la palabra es **aguda** (última sílaba), **llana** (penúltima), **esdrújula** (antepenúltima) o **sobresdrújula** (antes de la antepenúltima). Las reglas generales son tres: las agudas llevan tilde si acaban en vocal, **-n** o **-s**; las llanas justo al revés, la llevan cuando **no** acaban así; y las esdrújulas y sobresdrújulas la llevan **siempre**, sin mirar la letra final. Para no fallar, sigue siempre el mismo camino: 1) separa en sílabas, 2) localiza la tónica, 3) mira la letra final, 4) aplica la regla.",
    "RAW:<table><caption>Las cuatro clases de palabras según la posición de la sílaba tónica</caption><thead><tr><th>Clase</th><th>¿Dónde está la sílaba tónica?</th><th>¿Cuándo lleva tilde?</th><th>Ejemplos con tilde</th><th>Ejemplos sin tilde</th></tr></thead><tbody><tr><td>Aguda</td><td>En la última sílaba</td><td>Si acaba en vocal, en -n o en -s</td><td>ca-mión, com-pás, ca-fé, pa-be-llón</td><td>re-loj, pa-pel, fe-liz, a-zul</td></tr><tr><td>Llana</td><td>En la penúltima sílaba</td><td>Si NO acaba en vocal, ni en -n, ni en -s</td><td>ár-bol, lá-piz, cés-ped, már-mol</td><td>me-sa, jo-ven, lu-nes, li-bro</td></tr><tr><td>Esdrújula</td><td>En la antepenúltima sílaba</td><td>Siempre, sin mirar la letra final</td><td>mú-si-ca, plá-ta-no, miér-co-les</td><td>Ninguna: todas la llevan</td></tr><tr><td>Sobresdrújula</td><td>Antes de la antepenúltima sílaba</td><td>Siempre, sin mirar la letra final</td><td>cuén-ta-me-lo, ex-plí-ca-me-lo</td><td>Ninguna: todas la llevan</td></tr></tbody></table>",
    "Cuando dos vocales van seguidas hay que mirarlas con lupa. Si se pronuncian dentro de la **misma sílaba** forman **diptongo** (*ai-re*, *cua-der-no*, *rui-do*) y la palabra sigue las reglas generales, con la tilde sobre la vocal abierta cuando toca (*tam-bién*, *des-pués*); si van tres juntas, es un **triptongo** (*es-tu-diáis*). Si se pronuncian en **sílabas distintas**, hay **hiato** (*te-a-tro*, *ca-í-da*). Y aquí está la regla que más se olvida: cuando la vocal cerrada (*i*, *u*) es la tónica y va junto a una abierta (*a*, *e*, *o*), el diptongo se rompe y esa vocal cerrada lleva tilde **siempre**, diga lo que diga la regla general: *dí-a*, *Ma-rí-a*, *ba-úl*, *pa-ís*, *o-ír*. Cuidado con los monosílabos: como se pronuncian de un solo golpe, no llevan tilde (*fue*, *vio*, *dio*, *guion*, *truhan*).",
    "RAW:<table><caption>La tilde diacrítica: dos palabras iguales con dos significados. Los interrogativos y exclamativos llevan tilde también en preguntas indirectas, aunque no aparezcan los signos ¿ ? ni ¡ !, como en «No sé qué hora es».</caption><thead><tr><th>Con tilde</th><th>Qué es</th><th>Sin tilde</th><th>Qué es</th><th>Ejemplo con las dos</th></tr></thead><tbody><tr><td>tú</td><td>pronombre personal</td><td>tu</td><td>posesivo</td><td>Tú traes tu carpeta.</td></tr><tr><td>él</td><td>pronombre personal</td><td>el</td><td>artículo</td><td>Él lleva el balón.</td></tr><tr><td>mí</td><td>pronombre personal</td><td>mi</td><td>posesivo</td><td>A mí me gusta mi barrio.</td></tr><tr><td>sí</td><td>afirmación o pronombre</td><td>si</td><td>condición</td><td>Si vienes, di que sí.</td></tr><tr><td>sé</td><td>verbo saber o ser</td><td>se</td><td>pronombre</td><td>Ya sé que se ha marchado.</td></tr><tr><td>dé</td><td>verbo dar</td><td>de</td><td>preposición</td><td>Espero que me dé el libro de Lengua.</td></tr><tr><td>más</td><td>cantidad</td><td>mas</td><td>equivale a «pero»</td><td>Quiero más agua, mas no queda.</td></tr><tr><td>té</td><td>la bebida</td><td>te</td><td>pronombre</td><td>Te preparo un té.</td></tr><tr><td>qué, cómo, dónde, cuándo</td><td>interrogativos y exclamativos</td><td>que, como, donde, cuando</td><td>relativos y conjunciones</td><td>¿Dónde vives? Donde siempre.</td></tr></tbody></table>",
  ],
  ej: [
    "«Cancion» es aguda y acaba en -n, así que lleva tilde: **canción**; «arbol» es llana y acaba en -l: **árbol**; «musica» es esdrújula y la lleva siempre: **música**.",
    "En «dia» el golpe de voz cae en la *i*, que es vocal cerrada: rompe el diptongo y lleva tilde → **día**, igual que **María**, **baúl** y **país**.",
    "«Si tu quieres, el te da el te» se escribe **Si tú quieres, él te da el té**: la tilde diacrítica separa el pronombre del posesivo, del artículo y de la bebida.",
  ],
};

export const ACTS: Act[] = [
  {
    t: "La palmada que manda",
    d: "Separa palabras en sílabas y localiza la sílaba tónica dando una palmada más fuerte.",
    ic: "palmas",
    fig: "silabas",
    nv: [
      {
        in: "Palabras del día a día en el instituto: bocadillo, almuerzo, plátano, compás, mochila, gimnasio.",
        p: [
          "**a)** Separa en sílabas las seis palabras y marca en cada una cuál es la sílaba tónica.",
          "**b)** Clasifícalas en agudas, llanas o esdrújulas y di cuáles llevan tilde y por qué.",
          "**c)** Explica con tus palabras la diferencia entre *acento* y *tilde* usando *mochila* y *compás* como ejemplo.",
        ],
        s: [
          "**a)** bo-ca-**di**-llo · al-**muer**-zo · **plá**-ta-no · com-**pás** · mo-**chi**-la · gim-**na**-sio.",
          "**b)** Llanas: bocadillo, almuerzo, mochila y gimnasio, sin tilde porque acaban en vocal. Esdrújula: plátano, con tilde porque las esdrújulas la llevan siempre. Aguda: compás, con tilde porque acaba en -s.",
          "**c)** Las dos palabras tienen acento, porque en las dos hay una sílaba que suena más fuerte; pero solo *compás* lleva tilde, ya que la regla de las agudas lo exige, mientras que *mochila* es llana acabada en vocal y no la necesita.",
        ],
      },
      {
        in: "Cuatro palabras de la mochila: carpeta, lápiz, bolígrafo, cartón. Ejemplo resuelto: car-**pe**-ta, porque la fuerza cae en «pe».",
        p: [
          "**a)** Separa en sílabas *lápiz*, *bolígrafo* y *cartón*, igual que en el ejemplo resuelto.",
          "**b)** Copia las cuatro palabras y rodea en cada una la sílaba que suena más fuerte.",
          "**c)** ¿Cuál de las cuatro palabras no lleva tilde? Di por qué.",
        ],
        s: [
          "**a)** **lá**-piz · bo-**lí**-gra-fo · car-**tón**.",
          "**b)** Se rodea «lá» en *lápiz*, «lí» en *bolígrafo*, «tón» en *cartón* y «pe» en *carpeta*.",
          "**c)** *Carpeta*: es llana y acaba en vocal, así que no necesita tilde.",
        ],
        ad: "Se baja a cuatro palabras conocidas, se da un ejemplo ya separado como modelo y basta con rodear la sílaba fuerte en lugar de describirla.",
      },
      {
        in: "Palabras cortas ya separadas en sílabas: ca-sa, so-fa, me-sa, ja-mon (a estas dos últimas les faltan las tildes a propósito).",
        p: [
          "**a)** Rodea en cada palabra la sílaba que suena más fuerte: ca-sa / so-fa / me-sa / ja-mon.",
          "**b)** Escribe cada palabra en una de estas dos columnas ya dibujadas: «la fuerza va al final» o «la fuerza va en medio».",
        ],
        s: [
          "**a)** **ca**-sa · so-**fá** · **me**-sa · ja-**món**.",
          "**b)** La fuerza va al final: sofá, jamón. La fuerza va en medio: casa, mesa.",
        ],
        ad: "Las palabras llegan ya separadas en sílabas, son muy frecuentes y la respuesta se limita a rodear y a repartir en dos columnas cerradas.",
      },
      {
        in: "Tres palabras para decir en voz alta: *mesa*, *jamón*, *pan*.",
        p: [
          "**a)** Di cada palabra en voz alta con el docente y da una palmada por sílaba; la palmada más fuerte va en la sílaba que más suena.",
          "**b)** Copia de la pizarra el modelo del docente y pinta de rojo la sílaba de la palmada fuerte: me-sa, ja-món.",
        ],
        s: [
          "**a)** **me**-sa, con la palmada fuerte en «me»; ja-**món**, con la palmada fuerte en «món»; **pan**, que tiene una sola sílaba y una sola palmada.",
          "**b)** Se pinta «me» en *mesa* y «món» en *jamón*.",
        ],
        ad: "Todo se resuelve con palmadas, color y respuesta oral sobre un modelo ya escrito por el docente, con solo tres palabras muy frecuentes.",
      },
    ],
  },
  {
    t: "Tres cajones para las palabras",
    d: "Clasifica palabras en agudas, llanas y esdrújulas según dónde cae la fuerza de la voz.",
    ic: "tarjetas",
    fig: "acentos",
    nv: [
      {
        in: "Lista de palabras del instituto: examen, química, cartón, lápiz, miércoles, autobús, joven, brújula.",
        p: [
          "**a)** Clasifica las ocho palabras en agudas, llanas y esdrújulas.",
          "**b)** Explica en cada grupo por qué llevan o no llevan tilde, nombrando la regla que aplicas.",
          "**c)** Añade tú una palabra sobresdrújula y justifica su tilde.",
        ],
        s: [
          "**a)** Agudas: cartón, autobús. Llanas: examen, lápiz, joven. Esdrújulas: química, miércoles, brújula.",
          "**b)** *Cartón* y *autobús* son agudas acabadas en -n y en -s, así que llevan tilde. *Examen* y *joven* son llanas acabadas en -n y no la llevan; *lápiz* es llana acabada en -z y sí la lleva. *Química*, *miércoles* y *brújula* son esdrújulas: la llevan siempre.",
          "**c)** Por ejemplo *cuéntamelo*: la fuerza cae cuatro sílabas antes del final (cuén-ta-me-lo) y las sobresdrújulas llevan tilde siempre.",
        ],
      },
      {
        in: "Seis palabras con la sílaba tónica ya marcada: ca-**fé**, **már**-mol, **pá**-gi-na, ca-**mión**, **ár**-bol, **lu**-nes.",
        p: [
          "**a)** Escribe al lado de cada palabra si es aguda, llana o esdrújula.",
          "**b)** Señala cuáles llevan tilde y di si es por ser esdrújula o por la letra en la que acaban.",
        ],
        s: [
          "**a)** café → aguda · mármol → llana · página → esdrújula · camión → aguda · árbol → llana · lunes → llana.",
          "**b)** Llevan tilde café y camión, agudas acabadas en vocal y en -n; mármol y árbol, llanas acabadas en -l; y página, que es esdrújula y la lleva siempre. *Lunes* no la lleva: es llana acabada en -s.",
        ],
        ad: "Se reduce la lista a seis palabras y la sílaba tónica viene ya marcada, así que el alumno solo tiene que clasificar y justificar.",
      },
      {
        in: "Ocho palabras cortas con la sílaba fuerte marcada: **me**-sa, ja-**món**, **plá**-ta-no, pa-**pel**, **li**-bro, **mú**-si-ca, so-**fá**, **co**-che.",
        p: [
          "**a)** Copia cada palabra en una de las tres columnas ya dibujadas: FINAL (aguda), MEDIO (llana), ANTES (esdrújula).",
          "**b)** Rodea las cuatro palabras de la lista que llevan tilde.",
        ],
        s: [
          "**a)** FINAL: jamón, papel, sofá. MEDIO: mesa, libro, coche. ANTES: plátano, música.",
          "**b)** jamón, plátano, música y sofá.",
        ],
        ad: "Las tres columnas están dibujadas y etiquetadas con palabras sencillas (FINAL, MEDIO, ANTES), y el vocabulario es corto y de uso diario.",
      },
      {
        in: "Tres tarjetas de colores: *mesa*, *jamón*, *música*.",
        p: [
          "**a)** Di cada palabra en voz alta con el docente y coloca su tarjeta en el aro rojo (la fuerza al final), en el aro azul (la fuerza en medio) o en el aro verde (la fuerza al principio).",
          "**b)** Copia las palabras del aro verde y del aro rojo y repasa con rotulador la rayita de la tilde.",
        ],
        s: [
          "**a)** Aro rojo: jamón. Aro azul: mesa. Aro verde: música.",
          "**b)** Se copian *música* y *jamón*, y la rayita se repasa sobre la «u» de *música* y sobre la «o» de *jamón*.",
        ],
        ad: "Se manipulan tarjetas y aros de colores con tres palabras muy conocidas, y la respuesta es oral y motriz antes de escribir nada.",
      },
    ],
  },
  {
    t: "El cartel al que le faltan las tildes",
    d: "Devuelve a un texto las tildes que le faltan aplicando las reglas generales.",
    ic: "tilde",
    nv: [
      {
        in: "Aviso del tablón del instituto, copiado **sin ninguna tilde**: «La excursion a la Albufera sera el miercoles. El autobus sale a las ocho del pabellon. Traed el almuerzo y un boligrafo azul».",
        p: [
          "**a)** Copia el aviso colocando las seis tildes que faltan.",
          "**b)** Junto a cada palabra corregida, escribe si es aguda, llana o esdrújula y qué regla has aplicado.",
          "**c)** Busca en el aviso dos palabras que, siendo agudas, no deben llevar tilde, y explica por qué.",
        ],
        s: [
          "**a)** «La **excursión** a la Albufera **será** el **miércoles**. El **autobús** sale a las ocho del **pabellón**. Traed el almuerzo y un **bolígrafo** azul».",
          "**b)** excursión, será, autobús y pabellón son agudas acabadas en -n, en vocal y en -s, y por eso llevan tilde. Miércoles y bolígrafo son esdrújulas, que la llevan siempre.",
          "**c)** *Traed*, aguda acabada en -d, y *azul*, aguda acabada en -l: la regla de las agudas solo obliga cuando la palabra acaba en vocal, en -n o en -s, y ninguna de las dos acaba así.",
        ],
      },
      {
        in: "Mensaje de móvil copiado **sin tildes**: «Mañana hay examen de musica. Trae el libro, un lapiz y un boligrafo. Despues vamos al gimnasio».",
        p: [
          "**a)** Copia el mensaje y pon las cuatro tildes que faltan. Ejemplo resuelto: musica → **música**.",
          "**b)** Di de cada palabra corregida si es aguda, llana o esdrújula.",
          "**c)** Hay una palabra llana que no lleva tilde, *examen*. Explica por qué usando la regla.",
        ],
        s: [
          "**a)** «Mañana hay examen de **música**. Trae el libro, un **lápiz** y un **bolígrafo**. **Después** vamos al gimnasio».",
          "**b)** música y bolígrafo son esdrújulas; lápiz es llana; después es aguda.",
          "**c)** *Examen* es llana y acaba en -n, y las llanas solo llevan tilde cuando **no** acaban en vocal, en -n o en -s.",
        ],
        ad: "El texto es mucho más corto, se avisa del número exacto de tildes que faltan y la primera viene ya resuelta como modelo.",
      },
      {
        in: "Cinco parejas de palabras: *arbol / árbol* · *jamon / jamón* · *casa / cása* · *musica / música* · *papel / pápel*.",
        p: [
          "**a)** Rodea en cada pareja la palabra que está bien escrita.",
          "**b)** Copia en el cuaderno las tres palabras que llevan tilde.",
        ],
        s: [
          "**a)** árbol · jamón · casa · música · papel.",
          "**b)** árbol, jamón y música.",
        ],
        ad: "La escritura libre se cambia por una elección entre dos opciones cerradas, con palabras cortas y muy frecuentes.",
      },
      {
        in: "Modelo escrito por el docente en la pizarra: **árbol**, **jamón**, **música**.",
        p: [
          "**a)** Copia las tres palabras de la pizarra sin olvidar la rayita de la tilde y repásala en verde.",
          "**b)** El docente dicta *casa* y *mesa*: escríbelas y comprueba con él que no llevan ninguna rayita.",
        ],
        s: [
          "**a)** árbol, jamón y música, con la tilde repasada sobre la «a», la «o» y la «u».",
          "**b)** casa y mesa, escritas sin tilde.",
        ],
        ad: "Se copia un modelo ya escrito por el docente y solo se dictan dos palabras muy sencillas, sin pedir clasificar ni justificar nada.",
      },
    ],
  },
  {
    t: "Dos vocales, ¿una sílaba o dos?",
    d: "Distingue diptongo de hiato y coloca la tilde de palabras como *día* o *baúl*.",
    ic: "lupa",
    nv: [
      {
        in: "Ocho palabras copiadas **sin tildes**: sandia, panaderia, frio, baul, aire, cuaderno, oido, raiz.",
        p: [
          "**a)** Separa las ocho palabras en sílabas y di en cuáles hay diptongo y en cuáles hay hiato.",
          "**b)** Escríbelas bien, con las tildes que falten, y explica la regla del hiato de vocal cerrada tónica.",
          "**c)** Escribe dos palabras tuyas con hiato acentuado y una con triptongo.",
        ],
        s: [
          "**a)** Con hiato: san-**dí**-a, pa-na-de-**rí**-a, **frí**-o, ba-**úl**, o-**í**-do, ra-**íz**. Con diptongo: **ai**-re, cua-**der**-no.",
          "**b)** sandía, panadería, frío, baúl, oído y raíz. Cuando la vocal cerrada (*i*, *u*) es la tónica y va junto a una abierta, el diptongo se rompe y esa vocal lleva tilde aunque la regla general no la pidiera; *aire* y *cuaderno* mantienen el diptongo y siguen las reglas generales, así que van sin tilde.",
          "**c)** Por ejemplo *María* y *reír*, con hiato acentuado, y *estudiáis*, con triptongo.",
        ],
      },
      {
        in: "Seis palabras sin tilde; en las tres primeras va marcada la vocal que suena fuerte: d**i**a, Mar**i**a, r**i**o, aire, peine, ruido.",
        p: [
          "**a)** Copia las tres primeras palabras poniendo la tilde justo en la vocal marcada.",
          "**b)** Di cuáles de las seis palabras llevan las dos vocales en la misma sílaba y por eso no necesitan tilde.",
          "**c)** Escribe una frase corta con la palabra *día*.",
        ],
        s: [
          "**a)** día, María, río.",
          "**b)** aire, peine y ruido: las dos vocales se pronuncian juntas, forman diptongo y la palabra va sin tilde.",
          "**c)** Por ejemplo: «Hoy es un día de sol y bajamos al mercado».",
        ],
        ad: "Viene marcada de antemano la vocal que lleva la tilde, así que la tarea se reduce a copiar con la rayita puesta y a separar dos grupos.",
      },
      {
        in: "Cuatro parejas: *dia / día* · *aire / aíre* · *rio / río* · *peine / peíne*.",
        p: [
          "**a)** Rodea en cada pareja la palabra que está bien escrita.",
          "**b)** Copia las dos palabras en las que la *i* suena fuerte y se separa de la otra vocal.",
        ],
        s: [
          "**a)** día · aire · río · peine.",
          "**b)** día y río: en las dos la *i* suena fuerte, se separa de la otra vocal y por eso lleva tilde.",
        ],
        ad: "Se usan solo palabras de dos sílabas muy conocidas y basta con rodear una de dos opciones, sin separar sílabas ni nombrar diptongo o hiato.",
      },
      {
        in: "Dos nombres para decir en voz alta: *María* y *Mario*.",
        p: [
          "**a)** Di *María* y *Mario* muy despacio con el docente y da una palmada por sílaba: ¿en cuál de los dos salen tres palmadas?",
          "**b)** Copia de la pizarra el modelo *María* y repasa con rotulador rojo la rayita de la *i*.",
        ],
        s: [
          "**a)** En *María* salen tres palmadas (Ma-rí-a) y en *Mario* solo dos (Ma-rio); por eso *María* lleva tilde en la *i* y *Mario* no lleva ninguna.",
          "**b)** Se copia *María* con la tilde repasada sobre la *i*.",
        ],
        ad: "Se comparan solo dos nombres conocidos mediante palmadas y respuesta oral, y lo único que se escribe es la copia de un modelo.",
      },
    ],
  },
  {
    t: "Una rayita que cambia el sentido",
    d: "Usa la tilde diacrítica para distinguir parejas como tú y tu o él y el.",
    ic: "semaforo",
    nv: [
      {
        in: "Tres frases copiadas **sin ninguna tilde**: 1) «Si tu quieres, el te da el te». 2) «A mi no me dijo que si». 3) «Se que quiere mas pan, mas no queda».",
        p: [
          "**a)** Copia las tres frases colocando las tildes diacríticas que faltan.",
          "**b)** Justifica cada tilde diciendo qué clase de palabra es la acentuada y cuál es su pareja sin tilde.",
          "**c)** Escribe tú una frase en la que aparezcan *dé* y *de*, y otra en la que aparezcan *sé* y *se*.",
        ],
        s: [
          "**a)** 1) «Si **tú** quieres, **él** te da el **té**». 2) «A **mí** no me dijo que **sí**». 3) «**Sé** que quiere **más** pan, mas no queda».",
          "**b)** *tú* es pronombre personal frente a *tu* posesivo; *él* es pronombre frente a *el* artículo; *té* es la bebida frente a *te* pronombre; *mí* es pronombre frente a *mi* posesivo; *sí* es afirmación frente a *si* de condición; *sé* es del verbo *saber* frente a *se* pronombre; *más* es de cantidad frente a *mas*, que equivale a «pero» y va sin tilde.",
          "**c)** Por ejemplo: «Espero que me **dé** el libro **de** Lengua» y «Ya **sé** que **se** ha ido a casa».",
        ],
      },
      {
        in: "Tres frases con la palabra dudosa marcada: 1) «**Tu** hermano ya lo sabe». 2) «**El** libro es de Ana». 3) «A **mi** me gusta el **te** con limón».",
        p: [
          "**a)** Decide en cada palabra marcada si lleva tilde o no y copia la frase corregida. Ejemplo resuelto: en «**Tu** hermano», *tu* es posesivo y va sin tilde.",
          "**b)** Usa esta pista: si la palabra va delante de un sustantivo (*tu hermano*, *mi casa*), es posesivo o artículo y no lleva tilde; si va sola, es pronombre y sí la lleva. Señala en qué frase pasa cada cosa.",
        ],
        s: [
          "**a)** 1) «Tu hermano ya lo sabe», sin tilde. 2) «El libro es de Ana», sin tilde porque es artículo. 3) «A **mí** me gusta el **té** con limón».",
          "**b)** Van delante de un sustantivo y sin tilde *tu* (frase 1) y *el* (frase 2). Va sola y con tilde *mí* (frase 3); *té* lleva tilde porque es la bebida, no el pronombre.",
        ],
        ad: "La palabra dudosa viene ya marcada, hay un ejemplo resuelto y se entrega una pista fija que evita razonar toda la gramática de golpe.",
      },
      {
        in: "Cuatro frases con dos opciones cada una: «(Tu / Tú) eres muy rápido» · «(Mi / Mí) casa está cerca» · «En las fallas hay (mas / más) ruido» · «(El / Él) no vino».",
        p: [
          "**a)** Rodea en cada frase la opción correcta.",
          "**b)** Copia las tres frases en las que la palabra elegida lleva tilde.",
        ],
        s: [
          "**a)** «**Tú** eres muy rápido» · «**Mi** casa está cerca» · «En las fallas hay **más** ruido» · «**Él** no vino».",
          "**b)** «Tú eres muy rápido», «En las fallas hay más ruido» y «Él no vino».",
        ],
        ad: "Cada frase ofrece solo dos opciones entre paréntesis, con vocabulario cotidiano y frases muy cortas.",
      },
      {
        in: "Dos tarjetas: una con **tú** (con rayita) y otra con **tu** (sin rayita).",
        p: [
          "**a)** El docente lee «___ eres mi amigo» y «___ mochila es azul»: levanta en cada frase la tarjeta que toca.",
          "**b)** Copia la frase «**Tú** eres mi amigo» y repasa en rojo la rayita de la *u*.",
        ],
        s: [
          "**a)** En «**Tú** eres mi amigo» se levanta la tarjeta con rayita; en «**Tu** mochila es azul», la tarjeta sin rayita.",
          "**b)** «Tú eres mi amigo», con la tilde repasada sobre la *u*.",
        ],
        ad: "Se trabaja una sola pareja de palabras, la respuesta se da levantando una tarjeta y lo escrito se limita a copiar un modelo.",
      },
    ],
  },
  {
    t: "Preguntar lleva tilde",
    d: "Acentúa los interrogativos y exclamativos y revisa un diálogo al que le faltan las tildes.",
    ic: "lapiz",
    nv: [
      {
        in: "Diálogo en la puerta del instituto, copiado **sin ninguna tilde**: «—¿Que hora es? —No se. —¿Como lo sabes tu? —¡Que tarde! ¿Donde has dejado la llave? —Donde siempre, en el cajon».",
        p: [
          "**a)** Copia el diálogo con todas las tildes que le faltan.",
          "**b)** Explica por qué *dónde* lleva tilde en la pregunta y *donde* no la lleva en la respuesta.",
          "**c)** Escribe dos preguntas indirectas, sin signos de interrogación, en las que *qué* y *cuándo* sigan llevando tilde.",
        ],
        s: [
          "**a)** «—¿**Qué** hora es? —No **sé**. —¿**Cómo** lo sabes **tú**? —¡**Qué** tarde! ¿**Dónde** has dejado la llave? —Donde siempre, en el **cajón**».",
          "**b)** En la pregunta, *dónde* es interrogativo y pide una información, así que lleva tilde; en la respuesta, *donde* es un relativo que significa «en el lugar de siempre» y va sin tilde.",
          "**c)** Por ejemplo: «No sé **qué** hora es» y «Dime **cuándo** llega el autobús»: aunque no aparezcan los signos, las dos siguen preguntando algo.",
        ],
      },
      {
        in: "Cuatro frases con la palabra dudosa marcada y sin tilde: 1) «¿**Que** quieres?» 2) «El libro **que** leo es corto». 3) «¿**Donde** vives?» 4) «¡**Cuanto** ha llovido!».",
        p: [
          "**a)** Pon la tilde solo cuando la palabra marcada pregunte o exclame. Ejemplo resuelto: «¿**Qué** quieres?» lleva tilde porque está preguntando.",
          "**b)** Copia la frase en la que la palabra marcada no lleva tilde y explica por qué con tus palabras.",
        ],
        s: [
          "**a)** 1) «¿**Qué** quieres?» 2) «El libro que leo es corto». 3) «¿**Dónde** vives?» 4) «¡**Cuánto** ha llovido!».",
          "**b)** «El libro que leo es corto»: aquí *que* no pregunta nada ni exclama, solo une dos partes de la frase.",
        ],
        ad: "Solo hay cuatro frases, la palabra dudosa viene marcada y los signos de interrogación y exclamación funcionan como pista visual.",
      },
      {
        in: "Tres frases con dos opciones cada una: «¿(Que / Qué) hora es?» · «Dijo (que / qué) vendría» · «¿(Como / Cómo) te llamas?».",
        p: [
          "**a)** Rodea la opción correcta en cada frase.",
          "**b)** Copia las dos frases que empiezan por el signo ¿ y comprueba que su palabra lleva tilde.",
        ],
        s: [
          "**a)** «¿**Qué** hora es?» · «Dijo **que** vendría» · «¿**Cómo** te llamas?».",
          "**b)** «¿Qué hora es?» y «¿Cómo te llamas?»: las dos preguntan, y por eso *qué* y *cómo* llevan tilde.",
        ],
        ad: "Cada frase ofrece solo dos opciones y la regla se reduce a una pista visual: si hay signo de interrogación, la palabra lleva tilde.",
      },
      {
        in: "Dos preguntas escritas por el docente en la pizarra: «¿**Qué** comes?» y «¿**Cómo** estás?».",
        p: [
          "**a)** Lee las dos preguntas en voz alta con entonación de pregunta y señala con el dedo la rayita de *qué* y de *cómo*.",
          "**b)** Cópialas debajo del modelo sin olvidar los dos signos (¿ y ?) ni las rayitas.",
        ],
        s: [
          "**a)** Se señala la tilde sobre la «e» de *qué* y sobre la «o» de *cómo*.",
          "**b)** «¿Qué comes?» y «¿Cómo estás?», copiadas con sus signos y con todas sus tildes.",
        ],
        ad: "Se parte de dos preguntas ya escritas por el docente, con lectura en voz alta y copia guiada, sin tener que decidir ninguna tilde por escrito.",
      },
    ],
  },
];
