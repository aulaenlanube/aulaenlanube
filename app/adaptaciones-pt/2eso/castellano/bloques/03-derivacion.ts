// Bloque 3 · Derivación nominal y adjetival · Tema 1 de Lengua Castellana
// Adaptaciones PT · 2.º ESO. Cuatro niveles por actividad: 1.º ESO (referencia),
// 6.º, 5.º y 4.º de primaria. Lo que baja es el acceso, no el objetivo.

import type { Ap, Act } from "../tipos";

export const AP: Ap = {
  slug: "03-derivacion",
  n: 3,
  t: "Derivación nominal y adjetival",
  teoria: [
    "Todas las palabras se pueden partir en trozos que significan algo. El trozo que guarda la idea principal es el **lexema** o raíz: en `pan`, `panadero` y `panadería` el lexema es `pan-`, y por eso las tres hablan de lo mismo. Lo que se le añade son **morfemas derivativos**: si van delante se llaman **prefijos** (`des-hacer`) y si van detrás, **sufijos** (`pan-adero`). Fabricar palabras nuevas añadiendo morfemas a un lexema se llama **derivación**, y es la forma más productiva que tiene el castellano de inventar palabras sin inventarse nada.",
    "Fig:derivacion",
    "Los **prefijos** se colocan delante del lexema y casi siempre cambian el significado sin cambiar la clase de palabra: `hacer` y `deshacer` son los dos verbos; `posible` e `imposible`, los dos adjetivos. Los que más te vas a encontrar son seis: `des-` (lo contrario: `desordenado`), `in-` / `im-` (negación, con `im-` delante de `b` y de `p`: `inútil`, `imposible`), `re-` (otra vez: `releer`), `pre-` (antes: `prehistoria`), `sub-` (debajo: `submarino`) y `anti-` (contra: `antirrobo`).",
    "RAW:<table><caption>Sufijos que fabrican palabras nuevas</caption><thead><tr><th>Sufijo</th><th>Qué significa</th><th>Palabra de partida</th><th>Palabra derivada</th><th>¿Qué sale?</th></tr></thead><tbody><tr><td>-dor / -dora</td><td>quien hace la acción, o el aparato que la hace</td><td>pescar</td><td>pescador</td><td>sustantivo</td></tr><tr><td>-ción / -sión</td><td>la acción o su resultado</td><td>decidir</td><td>decisión</td><td>sustantivo</td></tr><tr><td>-miento</td><td>la acción o su efecto</td><td>aparcar</td><td>aparcamiento</td><td>sustantivo</td></tr><tr><td>-eza</td><td>la cualidad, en abstracto</td><td>bello</td><td>belleza</td><td>sustantivo</td></tr><tr><td>-ura</td><td>la cualidad o la medida</td><td>alto</td><td>altura</td><td>sustantivo</td></tr><tr><td>-ero / -era</td><td>oficio, lugar u objeto</td><td>fruta</td><td>frutero</td><td>sustantivo</td></tr><tr><td>-aje</td><td>la acción o el conjunto</td><td>aterrizar</td><td>aterrizaje</td><td>sustantivo</td></tr><tr><td>-ista</td><td>quien se dedica a ello</td><td>piano</td><td>pianista</td><td>sustantivo</td></tr><tr><td>-dad</td><td>la cualidad</td><td>real</td><td>realidad</td><td>sustantivo</td></tr><tr><td>-oso / -osa</td><td>que tiene mucho de eso</td><td>cariño</td><td>cariñoso</td><td>adjetivo</td></tr><tr><td>-able / -ible</td><td>que se puede hacer</td><td>lavar</td><td>lavable</td><td>adjetivo</td></tr><tr><td>-al</td><td>relacionado con</td><td>música</td><td>musical</td><td>adjetivo</td></tr><tr><td>-ivo / -iva</td><td>que sirve para eso</td><td>deporte</td><td>deportivo</td><td>adjetivo</td></tr><tr><td>-ante</td><td>que está haciendo eso</td><td>brillar</td><td>brillante</td><td>adjetivo</td></tr><tr><td>-ísimo / -ísima</td><td>muy, en grado máximo</td><td>alto</td><td>altísimo</td><td>adjetivo (superlativo)</td></tr></tbody></table>",
    "El truco que más te va a servir es preguntarte, después de derivar, **qué clase de palabra te ha salido**. Si delante le puedes poner `el`, `la`, `un` o `una` y suena bien, es un **sustantivo**: `la altura`, `el aparcamiento`, `una pianista`. Si le puedes poner `muy` delante o encaja en «esto es muy…», es un **adjetivo**: `muy cariñoso`, `muy musical`, `muy deportivo`. Algunas valen para las dos cosas según la frase — «es **una deportista**» frente a «es **muy deportista**» —, y ahí manda el contexto, no el sufijo.",
    "Todas las palabras que comparten lexema forman una **familia léxica** o familia de palabras: `flor`, `florero`, `florista`, `floristería` y `florecer` son la familia de `flor-`. Cuidado con los parecidos falsos: `marido` empieza como `mar`, pero no es de su familia, porque no comparte el significado. Y distingue dos cosas que se parecen mucho: los **morfemas apreciativos** (diminutivos `-ito`, `-illo`; aumentativos `-azo`, `-ón`) solo añaden un matiz de tamaño o de cariño y **no cambian la clase de palabra** — `mesa` y `mesita` son las dos sustantivos —, mientras que los derivativos de la tabla sí pueden convertir un adjetivo en sustantivo (`bello` da `belleza`). Fíjate además en que `-azo` a veces significa «golpe»: un `codazo` no es un codo enorme.",
  ],
  ej: [
    "`des-` + `orden` + `-ado` da `desordenado`: prefijo delante, lexema en medio y sufijo detrás, todo en la misma palabra.",
    "`pescar` da `pescador` (sustantivo: quien pesca) y `cariño` da `cariñoso` (adjetivo: que tiene cariño); el sufijo decide la clase de palabra.",
    "`mesa` da `mesita` y sigue siendo un nombre (solo es más pequeña); en cambio `bello` da `belleza`, que ya no es un adjetivo sino un sustantivo.",
  ],
};

export const ACTS: Act[] = [
  {
    t: "Despieza la palabra", d: "Separar lexema, prefijos y sufijos en palabras derivadas.", ic: "puzzle", fig: "derivacion",
    nv: [
      {
        in: "Palabras del panel: frutería · desordenado · imposible · futbolista · altura · submarino · relectura.",
        p: [
          "**a)** Parte cada palabra en sus trozos y marca cuál es el **lexema**.",
          "**b)** Di si el morfema que la acompaña es **prefijo** o **sufijo**. Hay tres palabras que llevan los dos a la vez: ¿cuáles son?",
          "**c)** Explica por qué `orden` y `desordenado` pertenecen a la misma familia léxica aunque signifiquen casi lo contrario.",
        ],
        s: [
          "**a)** frut-ería · des-orden-ado · im-posible · futbol-ista · alt-ura · sub-mar-ino · re-lect-ura. Lexemas: `frut-`, `orden-`, `posible`, `futbol-`, `alt-`, `mar-`, `lect-`.",
          "**b)** Prefijos: `des-`, `im-`, `sub-`, `re-`. Sufijos: `-ería`, `-ado`, `-ista`, `-ura`, `-ino`. Llevan prefijo y sufijo a la vez `desordenado`, `submarino` y `relectura`.",
          "**c)** Porque comparten el lexema `orden-`: el prefijo `des-` le da la vuelta al significado, pero la raíz que aporta la idea es la misma.",
        ],
      },
      {
        in: "Modelo ya resuelto: `frutería` = `frut-` (lexema) + `-ería` (sufijo).",
        p: [
          "**a)** Haz lo mismo con `futbolista` y con `altura`: subraya el lexema y rodea el sufijo.",
          "**b)** En `desordenado` y `submarino`, señala con el dedo el trozo que va delante. ¿Cómo se llama ese trozo?",
          "**c)** ¿Qué tienen en común `orden` y `desordenado`?",
        ],
        s: [
          "**a)** `futbol-` + `-ista` · `alt-` + `-ura`.",
          "**b)** `des-` y `sub-`: son **prefijos**.",
          "**c)** El mismo lexema, `orden-`; por eso son de la misma familia.",
        ],
        ad: "Cuatro palabras en vez de siete, un modelo ya resuelto delante y se admite señalar o subrayar en lugar de redactar la respuesta.",
      },
      {
        in: "Banco a la vista: PREFIJO va delante · SUFIJO va detrás. Palabras: panadero · desordenado · relectura.",
        p: [
          "**a)** Rodea en las tres palabras el trozo que se repite en `pan`, `orden` y `lectura`.",
          "**b)** Une cada trozo suelto con su nombre: `des-` · `-ero` · `re-`.",
          "**c)** Elige la correcta: en `panadero`, el trozo `-ero` va (delante / detrás).",
        ],
        s: [
          "**a)** `pan-`, `orden-` y `lect-`.",
          "**b)** `des-` es prefijo · `-ero` es sufijo · `re-` es prefijo.",
          "**c)** Detrás.",
        ],
        ad: "Solo tareas cerradas (rodear, unir y elegir entre dos) con el banco prefijo/sufijo siempre visible en la mesa.",
      },
      {
        in: "Tarjetas partidas sobre la mesa: `alt-` · `-ura` · `futbol-` · `-ista`.",
        p: [
          "**a)** Junta cada trozo de la izquierda con su final y di en voz alta la palabra que sale.",
          "**b)** Copia las dos palabras en el cuaderno y rodea el trozo que va detrás.",
        ],
        s: [
          "**a)** Salen `altura` y `futbolista`, leídas en voz alta antes de escribir nada.",
          "**b)** Copia correcta de las dos, con `-ura` y `-ista` rodeados.",
        ],
        ad: "Manipulativo y oral: la palabra se monta con dos tarjetas físicas, se dice primero en voz alta y solo al final se copia.",
      },
    ],
  },
  {
    t: "Fábrica de oficios del mercado", d: "Crear nombres de oficio con los sufijos que forman sustantivos.", ic: "etiqueta",
    nv: [
      {
        in: "Cartel del mercado de Xàtiva: puesto de fruta · puesto de pescado · puesto de flores · quien reparte los pedidos · quien toca el piano en la plaza · quien arregla zapatos.",
        p: [
          "**a)** Escribe el oficio derivado de cada palabra de partida: `fruta`, `pescado`, `flor`, `repartir`, `piano`, `zapato`.",
          "**b)** Anota al lado el sufijo que has usado en cada uno y explica qué aporta.",
          "**c)** Pasa a femenino los que cambien de forma y di cuáles se dicen igual para un chico y para una chica.",
        ],
        s: [
          "**a)** frutero · pescadero · florista · repartidor · pianista · zapatero.",
          "**b)** `-ero/-era` (oficio, lugar u objeto), `-ista` (quien se dedica a ello) y `-dor/-dora` (quien hace la acción).",
          "**c)** Cambian: frutera, pescadera, repartidora, zapatera. Se dicen igual `florista` y `pianista`: lo que cambia es el artículo (el pianista / la pianista).",
        ],
      },
      {
        in: "Modelo resuelto: puesto de fruta da **frutero**.",
        p: [
          "**a)** Forma el oficio de `pescado`, `flor` y `piano` eligiendo entre estos dos sufijos: `-ero` o `-ista`.",
          "**b)** ¿Cuáles de los tres se dicen igual para un chico y para una chica?",
          "**c)** Señala en el cartel los dos puestos cuyo oficio acaba en `-ero`.",
        ],
        s: [
          "**a)** pescadero · florista · pianista.",
          "**b)** `florista` y `pianista`.",
          "**c)** El puesto de fruta (frutero) y el de pescado (pescadero).",
        ],
        ad: "Tres oficios en vez de seis, un modelo resuelto a la vista y el sufijo se elige entre dos opciones dadas, no se inventa.",
      },
      {
        in: "Banco de sufijos a la vista: `-ero` (oficio) · `-ista` (se dedica a) · `-dor` (hace la acción). Bases: pan · piano · repartir.",
        p: [
          "**a)** Une cada base con el sufijo que le toca.",
          "**b)** Rodea la palabra correcta: quien vende pan es (panista / panadero / pandero).",
          "**c)** Copia y completa: «El que toca el piano es un ______.»",
        ],
        s: [
          "**a)** pan con `-ero` (panadero) · piano con `-ista` (pianista) · repartir con `-dor` (repartidor).",
          "**b)** panadero.",
          "**c)** pianista.",
        ],
        ad: "Opción cerrada en todo (unir, rodear entre tres y completar copiando) con el banco de sufijos delante y palabras muy frecuentes.",
      },
      {
        in: "Tarjetas grandes en la mesa: PAN · FLOR · `-ero` · `-ista`.",
        p: [
          "**a)** Junta la tarjeta del objeto con la del final y di en voz alta el oficio que sale.",
          "**b)** Copia debajo del dibujo de cada puesto: «panadero» y «florista».",
        ],
        s: [
          "**a)** pan con `-ero` da panadero; flor con `-ista` da florista.",
          "**b)** Copia correcta de las dos palabras bajo su dibujo.",
        ],
        ad: "Dos oficios muy conocidos, tarjetas físicas que se juntan sobre la mesa y respuesta oral antes de copiar.",
      },
    ],
  },
  {
    t: "¿Nombre o adjetivo?", d: "Reconocer la clase de palabra que sale al derivar.", ic: "lupa",
    nv: [
      {
        in: "Derivadas recogidas en clase: belleza · cariñoso · aparcamiento · lavable · musical · deportista · brillante · altura.",
        p: [
          "**a)** Clasifícalas en dos columnas, **sustantivos** y **adjetivos**, y subraya el sufijo de cada una.",
          "**b)** Escribe al lado la prueba que has usado con el artículo o con `muy`.",
          "**c)** Dos de ellas pueden funcionar como nombre o como adjetivo según la frase: encuéntralas y escribe una frase de cada uso.",
        ],
        s: [
          "**a)** Sustantivos: belleza (`-eza`), aparcamiento (`-miento`), altura (`-ura`), deportista (`-ista`). Adjetivos: cariñoso (`-oso`), lavable (`-able`), musical (`-al`), brillante (`-ante`).",
          "**b)** `la belleza`, `el aparcamiento`, `la altura`, `una deportista` frente a `muy cariñoso`, `muy lavable`, `muy musical`, `muy brillante`.",
          "**c)** `deportista` y `brillante`: «Mi hermana es **una deportista**» (nombre) / «Mi hermana es **muy deportista**» (adjetivo); «Llevaba un **brillante** en el anillo» (nombre) / «Tuvo una idea **brillante**» (adjetivo).",
        ],
      },
      {
        in: "Modelo hecho: `belleza` va con los sustantivos, porque decimos `la belleza`.",
        p: [
          "**a)** Coloca en la columna que toca: `altura`, `cariñoso`, `aparcamiento`, `musical`.",
          "**b)** Antes de decidir, prueba en voz alta con `el`/`la` y con `muy`.",
          "**c)** ¿Cuáles de las cuatro no admiten `muy` delante? Pista: nada es «muy aparcamiento».",
        ],
        s: [
          "**a)** Sustantivos: altura, aparcamiento. Adjetivos: cariñoso, musical.",
          "**b)** Suenan bien `la altura`, `el aparcamiento`, `muy cariñoso` y `muy musical`.",
          "**c)** `altura` y `aparcamiento`: son nombres.",
        ],
        ad: "Cuatro palabras en vez de ocho, una ya clasificada como modelo y la prueba del artículo se hace en voz alta antes de escribir.",
      },
      {
        in: "Dos cajas dibujadas en la pizarra: caja EL/LA (nombres) y caja MUY (adjetivos). Palabras: altura · cariñoso · frutería · musical.",
        p: [
          "**a)** Rodea de azul las que caben en la caja EL/LA y de rojo las de la caja MUY.",
          "**b)** Elige la correcta: `la altura` / `muy altura`.",
          "**c)** Une `cariñoso` con lo que es: (nombre / adjetivo).",
        ],
        s: [
          "**a)** Azul: altura y frutería. Rojo: cariñoso y musical.",
          "**b)** `la altura`.",
          "**c)** Adjetivo.",
        ],
        ad: "Opciones cerradas y color en lugar de escritura: dos cajas visibles, cuatro palabras frecuentes y ninguna respuesta que haya que redactar.",
      },
      {
        in: "Tarjetas: `altura` y `cariñoso`. Dos platos en la mesa, uno con `el/la` y otro con `muy`.",
        p: [
          "**a)** Di la frase en voz alta y deja cada tarjeta en el plato en el que suena bien.",
          "**b)** Copia la frase que ha sonado bien: «la altura» y «muy cariñoso».",
        ],
        s: [
          "**a)** `altura` al plato `el/la`; `cariñoso` al plato `muy`.",
          "**b)** Copia correcta de las dos frases.",
        ],
        ad: "Dos palabras, material manipulativo (tarjetas y platos) y la decisión se toma oyendo la frase, no analizándola.",
      },
    ],
  },
  {
    t: "La familia al completo", d: "Formar familias léxicas y cazar al intruso que solo se parece.", ic: "arbol",
    nv: [
      {
        in: "Lista del cuaderno: marea · marino · marisco · marido · marinero.",
        p: [
          "**a)** Escribe cinco palabras de la familia de `flor` y subraya el lexema común.",
          "**b)** En la lista del cuaderno hay un intruso: descúbrelo y justifica por qué no es de la familia de `mar`.",
          "**c)** Elige dos palabras de tu familia de `flor` y di qué sufijo lleva cada una y qué significa.",
        ],
        s: [
          "**a)** flor, florero, florista, floristería, florecer; el lexema común es `flor-`.",
          "**b)** `marido`: empieza igual, pero su significado no tiene nada que ver con el mar, y una familia léxica comparte lexema **y** significado.",
          "**c)** Por ejemplo: `florero` con `-ero` (objeto donde se ponen flores) y `florista` con `-ista` (quien se dedica a las flores).",
        ],
      },
      {
        in: "Familia empezada: `flor` da `florero`, `florista`, …",
        p: [
          "**a)** Añade dos palabras más a la familia de `flor`. Pistas: la tienda donde se venden y lo que hacen los almendros en primavera.",
          "**b)** Tacha el intruso: `marino` · `marinero` · `marido`.",
          "**c)** ¿Qué trozo se repite en todas las palabras de la familia de `mar`?",
        ],
        s: [
          "**a)** `floristería` y `florecer`.",
          "**b)** `marido`.",
          "**c)** El lexema `mar-`.",
        ],
        ad: "La familia viene empezada con dos ejemplos, el intruso se busca entre tres palabras y cada hueco lleva pista verbal.",
      },
      {
        in: "Recuerda: la familia de `pan` habla siempre de pan.",
        p: [
          "**a)** Rodea las que son de la familia de `pan`: panadería · panda · panecillo · pantalón · empanada.",
          "**b)** Elige la correcta: `panadería` es (el sitio donde se vende pan / un pan pequeño).",
          "**c)** Copia las tres palabras que has rodeado.",
        ],
        s: [
          "**a)** panadería, panecillo y empanada.",
          "**b)** El sitio donde se vende pan.",
          "**c)** Copia de esas tres palabras.",
        ],
        ad: "Se rodea entre cinco palabras muy frecuentes, hay una sola opción cerrada de dos y lo que se escribe se limita a copiar lo ya acertado.",
      },
      {
        in: "Un árbol de cartulina con el tronco `flor-` y tres tarjetas sueltas: florero · florista · flecha.",
        p: [
          "**a)** Pega en el árbol solo las tarjetas que empiezan por `flor-` y dilas en voz alta.",
          "**b)** Copia el nombre del árbol: «familia de flor».",
        ],
        s: [
          "**a)** Se pegan `florero` y `florista`; `flecha` se queda fuera del árbol.",
          "**b)** Copia correcta de la frase.",
        ],
        ad: "Árbol manipulativo con solo tres tarjetas, criterio visual (empieza por `flor-`) y cierre copiando una única frase.",
      },
    ],
  },
  {
    t: "Prefijos que dan la vuelta", d: "Localizar prefijos en un aviso real y crear palabras nuevas con ellos.", ic: "tarjetas", fig: "derivacion",
    nv: [
      {
        in: "Aviso del tablón del instituto: «El viernes hay que **desmontar** el escenario de la fiesta. Es **imposible** entrar antes de las nueve. Quien faltó puede **rehacer** la prueba. Conviene **prever** la lluvia: traed chubasquero.»",
        p: [
          "**a)** Localiza las cuatro palabras con prefijo y escribe, para cada una, prefijo + palabra de partida.",
          "**b)** Di qué significado aporta cada uno de esos prefijos.",
          "**c)** Forma una palabra nueva con `sub-`, otra con `anti-` y otra con `re-`, y escribe una frase con una de ellas.",
        ],
        s: [
          "**a)** `des-` + `montar` · `im-` + `posible` · `re-` + `hacer` · `pre-` + `ver`.",
          "**b)** `des-` lo contrario o deshacer la acción; `im-` negación (es `in-`, que se escribe `im-` delante de `p`); `re-` otra vez; `pre-` antes.",
          "**c)** Por ejemplo `subsuelo` o `subdirector`, `antirrobo` o `antivirus`, `releer` o `recargar`; la frase vale si el significado del prefijo se nota.",
        ],
      },
      {
        in: "Aviso con las palabras ya subrayadas: hay que **desmontar** el escenario · es **imposible** entrar · se puede **rehacer** la prueba.",
        p: [
          "**a)** Escribe la palabra de partida de cada una. Modelo: `desmontar` = `des-` + `montar`.",
          "**b)** Une cada prefijo con su significado: `des-`, `im-`, `re-`.",
          "**c)** Señala en el aviso la palabra que significa «que no se puede».",
        ],
        s: [
          "**a)** `imposible` = `im-` + `posible` · `rehacer` = `re-` + `hacer`.",
          "**b)** `des-` es lo contrario · `im-` es no · `re-` es otra vez.",
          "**c)** `imposible`.",
        ],
        ad: "Las palabras vienen ya subrayadas en el aviso, hay un modelo resuelto y los significados se unen con una flecha en vez de redactarse.",
      },
      {
        in: "Banco de prefijos a la vista: `des-` (lo contrario) · `re-` (otra vez) · `sub-` (debajo).",
        p: [
          "**a)** Une cada prefijo con la palabra que le pega: `hacer` · `leer` · `marino`.",
          "**b)** Rodea la correcta: `deshacer` significa (hacer otra vez / lo contrario de hacer).",
          "**c)** Copia las tres palabras completas que has formado.",
        ],
        s: [
          "**a)** `des-` con `hacer` · `re-` con `leer` · `sub-` con `marino`.",
          "**b)** Lo contrario de hacer.",
          "**c)** deshacer, releer y submarino.",
        ],
        ad: "Tres prefijos con su significado escrito al lado, la unión guiada y una única pregunta de elegir entre dos.",
      },
      {
        in: "Tarjetas grandes en la mesa: `des-` · `re-` · `hacer` · `leer`.",
        p: [
          "**a)** Coloca el trozo pequeño delante del grande y lee en voz alta la palabra que sale.",
          "**b)** Copia el modelo: «des- + hacer = deshacer» y «re- + leer = releer».",
        ],
        s: [
          "**a)** Salen `deshacer` y `releer`, leídas en voz alta.",
          "**b)** Copia correcta de las dos sumas de tarjetas.",
        ],
        ad: "Solo dos prefijos, tarjetas físicas que se colocan delante con la mano y respuesta oral; lo escrito se reduce a copiar el modelo.",
      },
    ],
  },
  {
    t: "¿Cariño o palabra nueva?", d: "Distinguir los sufijos apreciativos de los que cambian la palabra.", ic: "verdad",
    nv: [
      {
        p: [
          "**a)** ¿Verdad o mentira? «En `mesita`, el sufijo `-ita` solo dice que la mesa es pequeña, así que sigue siendo un sustantivo.» Corrige si es falsa.",
          "**b)** ¿Verdad o mentira? «En `belleza`, el sufijo `-eza` solo añade cariño.»",
          "**c)** ¿Verdad o mentira? «`perrazo`, `perrito` y `perrera` son de la familia de `perro`.»",
          "**d)** ¿Verdad o mentira? «Un `codazo` es un codo muy grande.»",
        ],
        s: [
          "**a)** Verdad: los diminutivos son morfemas apreciativos y no cambian la clase de palabra.",
          "**b)** Mentira: `-eza` convierte el adjetivo `bello` en el sustantivo `belleza`; es un sufijo derivativo, no apreciativo.",
          "**c)** Verdad: las tres comparten el lexema `perr-`, aunque dos sean apreciativas y la tercera nombre un lugar.",
          "**d)** Mentira: aquí `-azo` significa «golpe» (golpe dado con el codo); en `cochazo` sí significa «grande».",
        ],
      },
      {
        in: "Recuerda antes de empezar: los diminutivos y aumentativos solo cambian el tamaño o el cariño.",
        p: [
          "**a)** ¿Verdad o mentira? «`mesita` sigue siendo un nombre, igual que `mesa`.»",
          "**b)** ¿Verdad o mentira? «`belleza` es un adjetivo, como `bello`.» Pista: prueba a decir `la belleza`.",
          "**c)** ¿Verdad o mentira? «`perrito` y `perrazo` son de la familia de `perro`.»",
        ],
        s: [
          "**a)** Verdad.",
          "**b)** Mentira: `la belleza` suena bien, así que es un sustantivo.",
          "**c)** Verdad: las dos llevan el lexema `perr-`.",
        ],
        ad: "Tres frases en vez de cuatro, un recordatorio escrito antes de empezar y una pista con la prueba del artículo en la más difícil.",
      },
      {
        in: "Tarjetas de color: VERDE para lo verdadero y ROJO para lo falso.",
        p: [
          "**a)** Pon el color que toca: «`gatito` es un gato pequeño» · «`gatito` ya no es un nombre».",
          "**b)** Rodea la correcta: `librería` es (un libro pequeño / la tienda de libros).",
          "**c)** Corrige la falsa cambiando una sola palabra.",
        ],
        s: [
          "**a)** Verde la primera; roja la segunda.",
          "**b)** La tienda de libros.",
          "**c)** «`gatito` **sí** es un nombre».",
        ],
        ad: "El color sustituye a escribir verdadero o falso, las frases son cortísimas y la corrección se resuelve cambiando una única palabra.",
      },
      {
        in: "Dos cajas en la mesa, una con la etiqueta PEQUEÑO y otra con la etiqueta GRANDE. Tarjetas: `perrito` · `perrazo` · `cochecito` · `cochazo`.",
        p: [
          "**a)** Deja cada tarjeta en su caja después de decirla en voz alta.",
          "**b)** Copia el modelo: «perrito = perro pequeño».",
        ],
        s: [
          "**a)** PEQUEÑO: `perrito` y `cochecito`. GRANDE: `perrazo` y `cochazo`.",
          "**b)** Copia correcta de la frase modelo.",
        ],
        ad: "Manipulativo y oral: dos cajas etiquetadas, cuatro palabras conocidísimas y una única frase que se copia como cierre.",
      },
    ],
  },
];
