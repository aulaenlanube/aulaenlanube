// Bloque 4 del Tema 1 de Lengua Castellana · Adaptaciones PT · 2.º ESO
// Los géneros literarios: narrativa, lírica y dramática (teatro).
// Todos los fragmentos literarios son de creación propia o de tradición popular.
// Los textos admiten **negrita**, *cursiva* y `código`; en `teoria`, además,
// bloques «RAW:<table>…</table>» (HTML de confianza) y figuras «Fig:clave».

import type { Ap, Act } from "../tipos";

export const AP: Ap = {
  slug: "04-generos-literarios", n: 4, t: "Los géneros literarios",
  teoria: [
    "Un **texto literario** no se escribe solo para informar: se escribe para **emocionar, imaginar y hacer pensar**. Por eso el autor cuida cómo suenan las palabras, inventa historias que no han ocurrido (eso es la *ficción*) y busca que quien lee sienta algo. Un cartel del mercado te dice a cuánto están las naranjas; un poema sobre esas mismas naranjas te las hace ver. Además, la literatura se escribe de dos formas: en **prosa**, que llena la línea hasta el margen como este párrafo, o en **verso**, con líneas cortadas a propósito. Desde hace siglos, los textos literarios se ordenan en tres **géneros**: **narrativa**, **lírica** y **dramática** o teatro.",
    "Fig:generos",
    "RAW:<table><caption>Los tres géneros de un vistazo</caption><thead><tr><th>Género</th><th>Cómo se reconoce a simple vista</th><th>Quién habla</th><th>Forma</th><th>Subgéneros</th></tr></thead><tbody><tr><td>Narrativa</td><td>Párrafos seguidos; alguien cuenta algo que pasó</td><td>El narrador, en 1.ª o en 3.ª persona</td><td>Casi siempre prosa</td><td>Cuento, novela, leyenda, mito, fábula</td></tr><tr><td>Lírica</td><td>Líneas cortas y cortadas, agrupadas en estrofas</td><td>El yo lírico, que expresa lo que siente</td><td>Casi siempre verso</td><td>Poema, canción, romance</td></tr><tr><td>Dramática (teatro)</td><td>El nombre del personaje delante y paréntesis sueltos</td><td>Los personajes, que dialogan entre ellos</td><td>Prosa o verso; se escribe para representarse</td><td>Tragedia, comedia, drama</td></tr></tbody></table>",
    "En la **narrativa** siempre hay alguien que **cuenta** una historia: el **narrador**. Si el narrador es un personaje y habla de sí mismo, está en **1.ª persona** (*salí*, *me llamo*, *mi abuela*); si es una voz de fuera que lo observa todo, está en **3.ª persona** (*salió*, *se llamaba*, *su abuela*). Junto al narrador, toda narración tiene cuatro ingredientes: **personajes** (quién), **espacio** (dónde), **tiempo** (cuándo) y **acción** (qué pasa, ordenada en planteamiento, nudo y desenlace). Sus subgéneros más frecuentes son el **cuento** (breve, pocos personajes), la **novela** (larga, con muchas historias a la vez), la **leyenda** (algo del pasado de un lugar que se cuenta como si fuera verdad), el **mito** (dioses y héroes que explican el origen de algo) y la **fábula** (animales que hablan y una **moraleja** al final).",
    "En la **lírica** no se cuenta una historia: se expresa lo que se siente. Quien habla es el **yo lírico**, una voz que dice *yo* pero que no tiene por qué ser el autor. Casi siempre se escribe en **verso**: cada línea es un **verso** y los versos agrupados forman una **estrofa**. Dos versos **riman** cuando terminan igual a partir de la última vocal acentuada: si coinciden todos los sonidos, la rima es **consonante** (*ventana* – *mañana*); si solo coinciden las vocales, es **asonante** (*barco* – *lago*). Para **medir** un verso se cuentan sus sílabas, con dos avisos: cuando una palabra acaba en vocal y la siguiente empieza por vocal, las dos se cuentan como una sola sílaba (**sinalefa**: *la Albufera*), y si el verso termina en palabra aguda se suma una sílaba. Subgéneros: **poema**, **canción** y **romance** (versos de ocho sílabas con rima asonante en los pares).",
    "La **dramática** o **teatro** se escribe para **representarse** encima de un escenario, no solo para leerse. Por eso no hay narrador: la historia avanza porque los **personajes dialogan**, y el nombre de cada uno va delante de lo que dice. Entre paréntesis, y normalmente en cursiva, aparecen las **acotaciones**: las instrucciones del autor sobre gestos, tono de voz, luz, ruidos o decorado; no se leen en voz alta, se hacen. El texto se divide en **actos** (grandes partes separadas por la caída del telón) y cada acto en **escenas**, que cambian cada vez que entra o sale un personaje. Sus subgéneros clásicos son la **tragedia** (personajes nobles y final desgraciado), la **comedia** (personajes corrientes, enredo y final feliz) y el **drama** (mezcla los dos: problemas serios con final abierto o triste).",
  ],
  ej: [
    "«Aquel martes salí de casa sin desayunar»: hay alguien que cuenta y dice *yo* → **narrativa** con narrador en **1.ª persona**.",
    "«La luna se ha dormido sobre el río / y el viento en los naranjos tiene frío»: líneas cortadas, un yo que siente y rima **consonante** en *-ío* → **lírica**.",
    "«JULIA. (*Mirando el reloj*) ¿Otra vez llegas tarde?»: el nombre del personaje delante y una **acotación** entre paréntesis → **teatro**.",
  ],
};

export const ACTS: Act[] = [
  {
    t: "¿Quién habla aquí?",
    d: "Lees tres fragmentos breves y decides a qué género pertenece cada uno.",
    ic: "libro",
    fig: "generos",
    nv: [
      {
        in: "**A)** Aquel sábado el mercado de Xàtiva olía a naranjas. Marc apretó la lista de la compra y se perdió entre los puestos. · **B)** Naranjas del huerto mío, / dormidas en la mañana: / cuando el sol baja hasta el río / se asoman a mi ventana. · **C)** **JULIA.** (*Abre la ventana.*) Huele a pólvora: ya empieza la mascletà. **PAU.** Baja, que sin ti no salimos.",
        p: [
          "**a)** Di a qué género pertenece cada fragmento: A, B y C.",
          "**b)** Justifica cada respuesta con **dos rasgos** del propio texto (quién habla, cómo está escrito, qué marcas aparecen).",
          "**c)** ¿Cuáles están en prosa y cuál en verso? ¿Cómo se ve antes incluso de leerlos?",
          "**d)** Propón un subgénero posible para A y otro para C, y explica por qué.",
        ],
        s: [
          "**a)** A → narrativa · B → lírica · C → dramática (teatro).",
          "**b)** A: hay un narrador en 3.ª persona (*apretó*, *se perdió*) y se cuentan hechos con espacio y tiempo. B: habla un yo lírico (*mío*, *mi ventana*) y está escrito en versos con rima. C: el nombre del personaje va delante de lo que dice y hay una acotación entre paréntesis.",
          "**c)** A y C, en prosa; B, en verso. Se ve por la forma: las líneas de B se cortan antes del margen y se agrupan en una estrofa.",
          "**d)** A podría ser el comienzo de un cuento o de una novela (todavía no se sabe la extensión); C se acerca a una comedia: personajes corrientes, escena cotidiana y tono de enredo.",
        ],
      },
      {
        in: "**A)** Aquel sábado el mercado de Xàtiva olía a naranjas. Marc se perdió entre los puestos. · **B)** Naranjas del huerto mío, / dormidas en la mañana. · Pista: fíjate en quién habla y en si las líneas llegan hasta el margen.",
        p: [
          "**a)** ¿A qué género pertenece A? Ya está resuelto como ejemplo: **narrativa**, porque alguien cuenta lo que pasó (*se perdió*).",
          "**b)** ¿A qué género pertenece B? Señala en el texto **una** palabra que te lo demuestre.",
          "**c)** ¿Cuál de los dos está en verso?",
        ],
        s: [
          "**a)** Narrativa: hay un narrador que cuenta en 3.ª persona.",
          "**b)** Lírica. Vale señalar *mío* (habla un yo que siente) o el hecho de que la línea se corta antes del margen.",
          "**c)** B está en verso; A, en prosa.",
        ],
        ad: "Se reduce a dos fragmentos, uno ya resuelto como modelo, y se admite señalar la palabra en el texto en lugar de redactar la justificación.",
      },
      {
        in: "**A)** Marc se perdió en el mercado de Xàtiva. · **B)** Naranjas del huerto mío, / dormidas en la mañana. · **C)** **JULIA.** ¡Ya empieza la mascletà! · Palabras clave: narrativa (alguien lo cuenta) · lírica (versos y sentimientos) · teatro (personajes que hablan).",
        p: [
          "**a)** Rodea el género de A: narrativa / lírica / teatro.",
          "**b)** Rodea el género de B: narrativa / lírica / teatro.",
          "**c)** Rodea el género de C: narrativa / lírica / teatro.",
        ],
        s: [
          "**a)** Narrativa.",
          "**b)** Lírica.",
          "**c)** Teatro.",
        ],
        ad: "Se responde rodeando una de tres opciones cerradas, con los fragmentos reducidos a una línea y las palabras clave de cada género a la vista.",
      },
      {
        in: "Tres tarjetas de colores: azul = narrativa, verde = lírica, rojo = teatro. **A)** Marc fue al mercado. · **B)** Naranjas del huerto mío. · **C)** **JULIA.** ¡Ya empieza la mascletà!",
        p: [
          "**a)** Lee las tres tarjetas en voz alta y levanta el color que corresponde a cada texto.",
          "**b)** Di en voz alta cuál de los tres suena a que alguien está hablando en un escenario.",
        ],
        s: [
          "**a)** A → azul (narrativa) · B → verde (lírica) · C → rojo (teatro).",
          "**b)** El C: lleva el nombre del personaje delante y se puede decir con voz de actor.",
        ],
        ad: "Se trabaja con tarjetas de colores y respuesta oral levantando el color, sin tener que escribir nada.",
      },
    ],
  },
  {
    t: "El ojo del narrador",
    d: "Descubres quién cuenta la historia y localizas personajes, espacio y tiempo.",
    ic: "lupa",
    nv: [
      {
        in: "Me llamo Ainhoa y aquel martes de octubre llegué tarde al instituto. La niebla tapaba el campo de fútbol y, al cruzar el patio, oí una voz que me llamaba desde el porche. Era Nerea, con el abrigo empapado y cara de malas noticias.",
        p: [
          "**a)** ¿En qué persona está el narrador? Copia **tres** palabras del texto que lo demuestren.",
          "**b)** Identifica los personajes, el espacio y el tiempo de la narración.",
          "**c)** Reescribe las dos primeras frases con un narrador en **3.ª persona**.",
          "**d)** ¿Qué parte de la acción es este fragmento: planteamiento, nudo o desenlace? Justifícalo.",
        ],
        s: [
          "**a)** Está en 1.ª persona: *me llamo*, *llegué*, *oí* (también vale *me llamaba*).",
          "**b)** Personajes: Ainhoa y Nerea. Espacio: el instituto (el patio, el campo de fútbol, el porche). Tiempo: un martes de octubre, por la mañana.",
          "**c)** Modelo: «Se llamaba Ainhoa y aquel martes de octubre llegó tarde al instituto. La niebla tapaba el campo de fútbol y, al cruzar el patio, oyó una voz que la llamaba desde el porche.»",
          "**d)** Es el planteamiento: se presentan los personajes, el lugar y el momento, y asoma el problema que pondrá en marcha la historia.",
        ],
      },
      {
        in: "Me llamo Ainhoa y aquel martes llegué tarde al instituto. Al cruzar el patio, oí una voz que me llamaba.",
        p: [
          "**a)** ¿En qué persona está el narrador? Copia **una** palabra que lo demuestre. Ejemplo resuelto: *me llamo* → 1.ª persona.",
          "**b)** Escribe quién cuenta la historia y en qué lugar está.",
          "**c)** Cambia la palabra *llegué* por la forma que usaría un narrador en 3.ª persona.",
        ],
        s: [
          "**a)** 1.ª persona. Vale *llegué* o también *oí*.",
          "**b)** La cuenta Ainhoa, que es un personaje de la historia. Espacio: el instituto (el patio).",
          "**c)** *llegó*.",
        ],
        ad: "El fragmento se acorta a dos frases, se da el primer caso ya resuelto y solo se transforma una palabra en vez de reescribir el texto entero.",
      },
      {
        in: "Me llamo Ainhoa y aquel martes llegué tarde al instituto. · Recuerda: 1.ª persona = *yo*, *me*, *llegué* · 3.ª persona = *ella*, *se*, *llegó*.",
        p: [
          "**a)** Rodea el narrador que aparece: 1.ª persona / 3.ª persona.",
          "**b)** Une con flechas: Ainhoa · el instituto · aquel martes → personaje · espacio · tiempo.",
          "**c)** Elige la forma de 3.ª persona: *llegué* / *llegó* / *llegar*.",
        ],
        s: [
          "**a)** 1.ª persona.",
          "**b)** Ainhoa → personaje · el instituto → espacio · aquel martes → tiempo.",
          "**c)** *llegó*.",
        ],
        ad: "Se pasa a opciones cerradas (rodear y unir con flechas) sobre una sola frase, con las marcas de cada persona escritas a la vista.",
      },
      {
        in: "Me llamo Ainhoa y llegué tarde al instituto.",
        p: [
          "**a)** Lee la frase en voz alta y señálate con el dedo al decir *me llamo*. ¿Quién cuenta la historia: ella misma u otra persona de fuera?",
          "**b)** Vuelve a decirla empezando por *Ainhoa llegó tarde*. ¿Qué palabra ha cambiado?",
        ],
        s: [
          "**a)** La cuenta ella misma: el narrador dice *yo*, es un personaje de la historia.",
          "**b)** Ha cambiado *llegué* por *llegó*.",
        ],
        ad: "Se baja a dos apartados sobre una única frase, con apoyo gestual (señalarse) y respuesta oral, sin escritura.",
      },
    ],
  },
  {
    t: "Cinco cajas, cinco historias",
    d: "Clasificas cinco descripciones en los subgéneros de la narrativa.",
    ic: "tarjetas",
    nv: [
      {
        in: "**1)** Una zorra elogia el canto de un cuervo hasta que este abre el pico y suelta el queso; el texto acaba con una frase que enseña algo. · **2)** Un libro de trescientas páginas sobre tres generaciones de una familia de Morella. · **3)** Dos páginas: un chico encuentra una llave en el patio y en la última línea descubre qué abre. · **4)** Los antiguos contaban que el Túria bajaba enfadado porque un dios le había roto el cántaro. · **5)** En el pueblo dicen que quien cruza el puente a medianoche oye las campanas hundidas de la Albufera.",
        p: [
          "**a)** Asigna a cada descripción su subgénero: cuento, novela, leyenda, mito o fábula.",
          "**b)** Explica con tus palabras qué diferencia hay entre la 2 y la 3.",
          "**c)** Escribe la **moraleja** que le pondrías a la descripción 1.",
          "**d)** ¿Qué tienen en común la 4 y la 5, y en qué se distinguen?",
        ],
        s: [
          "**a)** 1 → fábula · 2 → novela · 3 → cuento · 4 → mito · 5 → leyenda.",
          "**b)** La 2 es una novela: es larga, abarca mucho tiempo y muchos personajes. La 3 es un cuento: es breve, tiene pocos personajes y todo avanza directo hacia un final.",
          "**c)** Modelo: «No te fíes de quien te alaba demasiado: algo quiere.»",
          "**d)** Las dos se cuentan como si fueran verdad y vienen de lo que la gente contaba antiguamente. El mito explica el origen de algo con dioses; la leyenda se sitúa en un lugar concreto y reconocible.",
        ],
      },
      {
        in: "**1)** Una zorra elogia al cuervo hasta que suelta el queso; al final hay una frase que enseña algo. · **2)** Un libro muy largo sobre una familia de Morella. · **3)** Dos páginas: un chico encuentra una llave. · **4)** En el pueblo dicen que a medianoche se oyen campanas bajo la Albufera. · Ejemplo resuelto: 1 → fábula (animales que hablan y moraleja).",
        p: [
          "**a)** Une la 2 y la 3 con *novela* o *cuento*.",
          "**b)** ¿Qué es la 4: una leyenda o una fábula?",
          "**c)** Copia del texto 1 las dos palabras que te han hecho decir *fábula*.",
        ],
        s: [
          "**a)** 2 → novela (libro largo) · 3 → cuento (texto breve).",
          "**b)** Una leyenda: la cuenta la gente del pueblo sobre un lugar conocido.",
          "**c)** *zorra* y *cuervo* (animales que actúan como personas); también vale señalar la frase que enseña algo.",
        ],
        ad: "Se quita una descripción, se acortan las demás, se da el primer caso resuelto como modelo y basta con unir y copiar palabras del texto.",
      },
      {
        in: "**1)** La zorra engaña al cuervo y al final hay una enseñanza. · **2)** Un libro muy largo sobre una familia. · **3)** En el pueblo dicen que se oyen campanas bajo el agua. · Palabras clave: fábula (animales y enseñanza) · novela (libro largo) · leyenda (lo cuenta la gente del pueblo).",
        p: [
          "**a)** Une cada número con su palabra clave.",
          "**b)** Rodea el texto en el que hay animales que hablan: 1 / 2 / 3.",
          "**c)** Elige: la moraleja de una fábula aparece al *principio* / al *final*.",
        ],
        s: [
          "**a)** 1 → fábula · 2 → novela · 3 → leyenda.",
          "**b)** El 1.",
          "**c)** Al final.",
        ],
        ad: "Solo quedan tres casos, escritos en una línea cada uno, y se resuelven uniendo o eligiendo entre opciones que están a la vista.",
      },
      {
        in: "Tres tarjetas ilustradas: **fábula** (una zorra), **novela** (un libro gordo) y **leyenda** (un pueblo de noche). Textos: **1)** La zorra engaña al cuervo. · **2)** Un libro muy largo. · **3)** En el pueblo cuentan que se oyen campanas bajo el agua.",
        p: [
          "**a)** Coloca cada tarjeta encima de su texto y di su nombre en voz alta.",
          "**b)** Cuenta en voz alta, en una sola frase, qué le pasa a la zorra.",
        ],
        s: [
          "**a)** La zorra → texto 1 (fábula) · el libro gordo → texto 2 (novela) · el pueblo de noche → texto 3 (leyenda).",
          "**b)** Modelo oral: «La zorra engaña al cuervo para quitarle el queso.»",
        ],
        ad: "Se manipulan tarjetas ilustradas colocándolas sobre el texto y se responde hablando, con un modelo de frase para apoyarse.",
      },
    ],
  },
  {
    t: "Cuenta sílabas, caza la rima",
    d: "Mides los versos de una copla y distingues la rima consonante de la asonante.",
    ic: "lira",
    nv: [
      {
        in: "En la Albufera, temprano, / el agua parece un cristal; / mi abuelo mueve la mano / y el barco empieza a cantar.",
        p: [
          "**a)** ¿Cuántos versos tiene y cuántas estrofas forman? ¿Es arte mayor o arte menor?",
          "**b)** Mide el primer verso y el segundo. Cuidado con la **sinalefa** y con el verso que acaba en palabra aguda.",
          "**c)** Clasifica la rima de *temprano – mano* y la de *cristal – cantar*, y justifica cada una.",
          "**d)** ¿Quién es el yo lírico y qué transmite? Apóyate en una palabra del texto.",
        ],
        s: [
          "**a)** Cuatro versos que forman una sola estrofa. Miden ocho sílabas, así que son de **arte menor**.",
          "**b)** Verso 1: *en / la-Al / bu / fe / ra / tem / pra / no* = 8 sílabas (hay sinalefa en *la Albufera*). Verso 2: *el-a / gua / pa / re / ce-un / cris / tal* = 7 sílabas y, como acaba en palabra aguda, se suma una: **8**.",
          "**c)** *temprano – mano*: rima **consonante**, porque desde la vocal tónica coinciden todos los sonidos (*-ano*). *cristal – cantar*: rima **asonante**, porque solo coincide la vocal tónica (*a*) y las consonantes finales son distintas (*l* y *r*).",
          "**d)** El yo lírico es alguien que recuerda salir temprano a la Albufera con su abuelo; transmite calma y cariño (*mi abuelo*, *el agua parece un cristal*).",
        ],
      },
      {
        in: "En la Albufera, temprano, / mi abuelo mueve la mano. · Pista: cuando una palabra acaba en vocal y la siguiente empieza por vocal, las dos vocales se cuentan como una sola sílaba (sinalefa).",
        p: [
          "**a)** ¿Cuántos versos hay? ¿Cuántas estrofas forman?",
          "**b)** Mide el segundo verso. Ejemplo resuelto del primero: *en / la-Al / bu / fe / ra / tem / pra / no* = 8 sílabas.",
          "**c)** Señala las dos palabras que riman y di si la rima es consonante o asonante.",
        ],
        s: [
          "**a)** Dos versos, que forman una única estrofa.",
          "**b)** *mi-a / bue / lo / mue / ve / la / ma / no* = 8 sílabas (hay sinalefa en *mi abuelo*).",
          "**c)** Riman *temprano* y *mano*: rima **consonante**, porque suena igual todo el final (*-ano*).",
        ],
        ad: "La copla baja a dos versos, el primero viene ya medido como modelo y se avisa de dónde está la sinalefa.",
      },
      {
        in: "Sale la luna en el mar / y la barca va a pescar. · Recuerda: rima consonante = suena igual TODO el final · rima asonante = solo coinciden las vocales.",
        p: [
          "**a)** Rodea las dos palabras que riman.",
          "**b)** Rodea la respuesta: la rima es consonante / asonante.",
          "**c)** Da una palmada por sílaba en *luna* y escribe cuántas tiene.",
        ],
        s: [
          "**a)** *mar* y *pescar*.",
          "**b)** Consonante: las dos acaban en *-ar*, suena igual todo el final.",
          "**c)** *lu-na*: 2 sílabas, 2 palmadas.",
        ],
        ad: "Se cambia a una pareja de versos muy sencillos, se rodea en vez de redactar y se cuentan las sílabas de una palabra, no las del verso entero.",
      },
      {
        in: "Sale la luna en el mar / y la barca va a pescar.",
        p: [
          "**a)** Lee los dos versos en voz alta y da una palmada por cada sílaba de *luna* y de *barca*.",
          "**b)** Di en voz alta las dos palabras del final que suenan igual.",
        ],
        s: [
          "**a)** *lu-na*: dos palmadas. *bar-ca*: dos palmadas.",
          "**b)** *mar* y *pescar*: las dos terminan con el mismo sonido.",
        ],
        ad: "Se trabaja solo con palmas y lectura en voz alta, sobre dos palabras conocidas y con dos apartados.",
      },
    ],
  },
  {
    t: "Detrás del telón",
    d: "Analizas un diálogo teatral y averiguas qué ordenan sus acotaciones.",
    ic: "mascaras",
    nv: [
      {
        in: "(*Cocina de un piso de Valencia. Es de noche.*) **JULIA.** (*Asomándose al pasillo*) ¿Alguien ha visto mi camiseta de la falla? **PAU.** Está tendida en la terraza desde el domingo. **JULIA.** (*Sale corriendo.*) ¡No me esperéis para cenar! **PAU.** (*Al público.*) Siempre igual: entra, pregunta y desaparece.",
        p: [
          "**a)** Copia las **cuatro** acotaciones y explica qué indica cada una: lugar, gesto, movimiento o destinatario.",
          "**b)** Demuestra con dos pruebas del texto que aquí no hay narrador.",
          "**c)** Escribe **una réplica más** para Julia, con su acotación entre paréntesis.",
          "**d)** ¿A qué subgénero se acerca este fragmento: tragedia, comedia o drama? Justifícalo.",
        ],
        s: [
          "**a)** (*Cocina de un piso de Valencia. Es de noche.*) → el espacio y el momento. (*Asomándose al pasillo*) → el gesto con el que habla Julia. (*Sale corriendo.*) → un movimiento: Julia abandona la escena. (*Al público.*) → a quién se dirige Pau.",
          "**b)** Primera prueba: delante de cada intervención está el nombre del personaje, no una voz que cuente. Segunda prueba: todo lo que sabemos (dónde está la camiseta, que Julia se va) lo dicen los propios personajes hablando.",
          "**c)** Modelo: «**JULIA.** (*Desde la escalera, gritando*) ¡Y guardadme un trozo de tortilla!»",
          "**d)** A la **comedia**: personajes corrientes en una escena cotidiana, un pequeño enredo doméstico y un tono que busca la sonrisa, sin final desgraciado.",
        ],
      },
      {
        in: "(*Cocina. Es de noche.*) **JULIA.** (*Asomándose*) ¿Alguien ha visto mi camiseta de la falla? **PAU.** Está tendida en la terraza.",
        p: [
          "**a)** Copia las **dos** acotaciones. Ejemplo resuelto: (*Cocina. Es de noche.*) indica dónde y cuándo pasa la escena.",
          "**b)** Señala los nombres de los dos personajes que hablan.",
          "**c)** Añade una réplica más para Pau, sin acotación.",
        ],
        s: [
          "**a)** (*Cocina. Es de noche.*) → el lugar y el momento · (*Asomándose*) → el gesto de Julia mientras habla.",
          "**b)** JULIA y PAU, escritos delante de lo que dice cada uno.",
          "**c)** Modelo: «**PAU.** Y llévate las llaves, que hoy no estaré.»",
        ],
        ad: "El diálogo baja a dos réplicas, una acotación va ya explicada como ejemplo y la réplica nueva se pide sin acotación.",
      },
      {
        in: "**JULIA.** (*Asomándose*) ¿Has visto mi camiseta de la falla? **PAU.** Está en la terraza. · Recuerda: la acotación va entre paréntesis y dice cómo se hace; el nombre en mayúsculas dice quién habla.",
        p: [
          "**a)** Rodea la acotación del fragmento.",
          "**b)** Une: JULIA · PAU → pregunta · responde.",
          "**c)** Elige qué indica (*Asomándose*): el lugar / un gesto / un personaje nuevo.",
        ],
        s: [
          "**a)** (*Asomándose*).",
          "**b)** JULIA → pregunta · PAU → responde.",
          "**c)** Un gesto: cómo se mueve Julia mientras habla.",
        ],
        ad: "Queda un intercambio de dos líneas y todo se resuelve rodeando, uniendo o eligiendo entre tres opciones, con la regla escrita al lado.",
      },
      {
        in: "**JULIA.** (*Asomándose*) ¿Has visto mi camiseta? **PAU.** Está en la terraza.",
        p: [
          "**a)** Repartid las dos máscaras y leed el diálogo en voz alta, cada uno con su personaje.",
          "**b)** Al llegar a (*Asomándose*), no lo digas: hazlo. ¿Qué has tenido que hacer con el cuerpo?",
        ],
        s: [
          "**a)** Quien lleva la máscara de Julia pregunta; quien lleva la de Pau responde.",
          "**b)** Asomarse: sacar la cabeza como quien mira por una puerta. La acotación no se lee en voz alta, se representa.",
        ],
        ad: "Se dramatiza con máscaras y lectura en voz alta por turnos, con dos apartados y la acotación convertida en movimiento.",
      },
    ],
  },
  {
    t: "La misma escena, tres veces",
    d: "Cuentas una única escena en narrativa, en lírica y en teatro.",
    ic: "lapiz",
    fig: "generos",
    nv: [
      {
        in: "Escena de partida: **Hugo pierde el autobús del instituto bajo la lluvia.**",
        p: [
          "**a)** Escríbela en **narrativa**: tres líneas en prosa con narrador en 3.ª persona, indicando espacio y tiempo.",
          "**b)** Escríbela en **lírica**: dos versos con rima, y di después si es consonante o asonante.",
          "**c)** Escríbela en **teatro**: dos réplicas con una acotación entre paréntesis.",
          "**d)** ¿Cuál de las tres versiones está en verso y cuáles en prosa? ¿Qué desaparece al pasar de la narrativa al teatro?",
        ],
        s: [
          "**a)** Modelo: «Hugo llegó empapado a la parada del instituto. El autobús ya giraba la esquina y no frenó. Se quedó solo bajo la marquesina, a las ocho y cuarto de la mañana.»",
          "**b)** Modelo: «La lluvia me ha dejado sin salida / y el autobús se marcha de mi vida.» La rima es **consonante** en *-ida*.",
          "**c)** Modelo: «**HUGO.** (*Corriendo tras el autobús*) ¡Para, que llego! **CONDUCTOR.** (*Sin mirarlo*) A las ocho en punto, como siempre.»",
          "**d)** En verso solo está la versión lírica; las otras dos, en prosa. Al pasar al teatro desaparece el **narrador**: nadie cuenta nada, todo lo sostienen los personajes y las acotaciones.",
        ],
      },
      {
        in: "Escena de partida: **Hugo pierde el autobús bajo la lluvia.** · Modelo narrativo ya resuelto: «Hugo llegó empapado a la parada y el autobús ya se iba.»",
        p: [
          "**a)** Copia el modelo narrativo y subraya la palabra que demuestra que el narrador está en 3.ª persona.",
          "**b)** Completa los dos versos para que rimen: «La lluvia me ha dejado sin ______ / y el autobús se marcha de mi ______.»",
          "**c)** Escribe **una** réplica de Hugo con su acotación entre paréntesis.",
        ],
        s: [
          "**a)** «Hugo **llegó** empapado a la parada y el autobús ya se iba.» La palabra es *llegó* (también vale *se iba*).",
          "**b)** Modelo: «sin **salida**» / «de mi **vida**», que riman en *-ida*. Vale cualquier pareja que rime.",
          "**c)** Modelo: «**HUGO.** (*Corriendo*) ¡Espera, que llego!»",
        ],
        ad: "La versión narrativa viene dada y solo se subraya; los versos se completan con huecos y del teatro se pide una única réplica.",
      },
      {
        in: "Escena: **Hugo pierde el autobús bajo la lluvia.** · Caja de palabras: *llegó* · *tarde* · *parada* · *mojada*. · Versiones: **(1)** Hugo llegó tarde a la parada. **(2)** **HUGO.** ¡Espera, que llego!",
        p: [
          "**a)** Rodea la versión que es teatro: (1) / (2).",
          "**b)** Elige de la caja la palabra que rima con *parada*.",
          "**c)** Rodea: la versión (1) está en prosa / en verso.",
        ],
        s: [
          "**a)** La (2): lleva el nombre del personaje delante de lo que dice.",
          "**b)** *mojada*, porque las dos acaban en *-ada*.",
          "**c)** En prosa: llena la línea y nadie la ha cortado en versos.",
        ],
        ad: "Se eligen versiones ya escritas en lugar de redactarlas y la rima se resuelve con una caja de palabras a la vista.",
      },
      {
        in: "Modelo para copiar: «**HUGO.** (*Con el paraguas roto*) ¡Se me ha ido el autobús!»",
        p: [
          "**a)** Copia el modelo cambiando solo el nombre del personaje por el tuyo.",
          "**b)** Léelo en voz alta con cara de enfado y haz lo que dice el paréntesis.",
        ],
        s: [
          "**a)** Modelo copiado, por ejemplo: «**LUCÍA.** (*Con el paraguas roto*) ¡Se me ha ido el autobús!»",
          "**b)** En voz alta solo se dice lo que está fuera del paréntesis; lo del paréntesis se hace con el cuerpo, sujetando un paraguas roto.",
        ],
        ad: "Se copia un modelo cambiando una sola palabra y se representa en voz alta, sin tener que inventar texto nuevo.",
      },
    ],
  },
];
