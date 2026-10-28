// Textos del tema 1 de Música (1.º ESO) en los dos idiomas de la página.
//
// El libro está en valenciano: `ca` sigue su redacción (las definiciones de los
// «quadres morats», literales) y `es` es su traducción fiel. Marcado mínimo:
// **negrita** y *cursiva* (lo pinta <R> de _ui.tsx).

import type { Idioma } from "../../../_idioma";
export type { Idioma };

const CA = {
  titolDoc: "Música 1r d'ESO · Tema 1: el so i les seues qualitats (esquema) — Aula en la Nube",
  chip: "1r d'ESO · Música · Tema 1",
  h1: "Esquema del tema 1: el so i les seues qualitats",
  intro:
    "Tot el que entra a l'examen, ordenat i resumit a partir de les parts subratllades del llibre (pàgines 8 a 14). Les **definicions** dels quadres morats van **literals**: són les que cal saber de memòria.",
  imprimir: "🖨 Imprimir l'esquema sencer",
  pag: "pàg.",
  definicio: "Definició · de memòria",

  mapaTitol: "Mapa conceptual: tot el tema en una pàgina",
  mapaIntro:
    "Per a repassar d'un colp d'ull. Descarrega'l en PDF (A4 apaïsat) per a imprimir-lo, o en imatge per a tindre'l al mòbil.",
  baixar: { pdf: "Descarregar PDF", png: "Imatge PNG", svg: "SVG", fent: "Preparant…", error: "No s'ha pogut generar el fitxer." },

  entraTitol: "Què entra a l'examen",
  entra: [
    { p: "Pàg. 8", t: "El so: d'on naix, com viatja i com l'oïm. Definició de so.", a: "so" },
    { p: "Pàg. 9", t: "El soroll: ones regulars i irregulars, contaminació acústica i el sonòmetre.", a: "soroll" },
    { p: "Pàg. 10", t: "El silenci: primer paràgraf i definició.", a: "silenci" },
    { p: "Pàg. 11", t: "Quadre sencer de les qualitats del so.", a: "qualitats" },
    { p: "Pàg. 12", t: "L'altura, «Recorda» (pentagrama i clau) i «Sabies que…» (Hz, infrasons i ultrasons).", a: "altura" },
    { p: "Pàg. 13", t: "La duració, esquema de figures i silencis i «Sabies que…» (barres de repetició).", a: "duracio" },
    { p: "Pàg. 14", t: "La intensitat («Saber-ne més» i esquema del volum) i el timbre.", a: "intensitat" },
  ],

  esquemaTitol: "Esquema general",
  arrel: "El so",
  branques: [
    {
      titol: "1 · So, soroll i silenci",
      a: "so",
      fulles: [
        { nom: "So", a: "so", clau: "un cos vibra → ones sonores → timpà → cervell" },
        { nom: "Soroll", a: "soroll", clau: "ona irregular · contaminació acústica · sonòmetre (dB)" },
        { nom: "Silenci", a: "silenci", clau: "absència de so o soroll" },
      ],
    },
    {
      titol: "2 · Les qualitats del so",
      a: "qualitats",
      fulles: [
        { nom: "Altura", a: "altura", clau: "greus / aguts · hertz (Hz) · pentagrama, clau i notes" },
        { nom: "Duració", a: "duracio", clau: "llargs / curts · figures i silencis" },
        { nom: "Intensitat", a: "intensitat", clau: "forts / suaus · matisos (pp … ff) · reguladors" },
        { nom: "Timbre", a: "timbre", clau: "qui o què produeix el so" },
      ],
    },
  ],

  b1: "1 · So, soroll i silenci",
  so: {
    titol: "El so",
    passos: ["Un cos vibra", "Ones sonores pel medi (aire, aigua, fusta…)", "El timpà de l'orella vibra", "La informació arriba al cervell"],
    idees: [
      "El so sorgeix quan un **cos** o un objecte **vibra**.",
      "La vibració es transmet en forma d'**ones sonores** que viatgen a través de diferents **medis**: l'aire, l'aigua, la fusta…",
      "Percebem les ones del so gràcies a l'**orella**. En aquest òrgan hi ha una membrana elàstica, anomenada **timpà**, que vibra quan li arriben les ones sonores i transmet aquesta informació al **cervell**.",
    ],
    def: "El **so** és la sensació que experimentem quan ens arriben a l'orella les ones produïdes per la **vibració d'un cos sonor**.",
  },
  soroll: {
    titol: "El soroll",
    idea: "Des d'un punt de vista físic, **el soroll i el so es diferencien pel tipus d'ona que produeixen**.",
    def: "L'ona d'un **so** és **ordenada i regular**, mentre que l'ona del **soroll** és **desordenada i irregular**.",
    figPeu: "Ones regulars (so, per exemple un saxòfon) i ones irregulars (soroll, per exemple uns plats).",
    contTitol: "La contaminació acústica",
    cont: "L'excés de soroll es denomina **contaminació acústica**. És un problema en la nostra societat, perquè redueix el nivell de qualitat de vida, ja que té **efectes nocius sobre la salut**:",
    efectes: ["dificultat de comunicació", "trastorns del son", "estrès", "pèrdua de capacitat auditiva", "conductes agressives", "etc."],
    fontsIdea: "Algunes de les **fonts de soroll ambiental** són:",
    fonts: ["🚗 els mitjans de transport", "🏭 l'activitat industrial", "🏗️ la construcció", "🎉 les zones d'oci"],
    sonometreTitol: "El sonòmetre: per a què serveix?",
    sonometre:
      "El nivell de soroll es mesura en **decibels (dB)** i l'aparell que s'utilitza per a mesurar-lo es diu **sonòmetre**. Aplicacions com *Sound Meter* o *Mesurador de decibels*, entre altres, poden servir-te per a mesurar el nivell de soroll en el teu entorn.",
  },
  silenci: {
    titol: "El silenci",
    idees: [
      "En la música, **el silenci és una part fonamental** tant de la **composició** com de la **interpretació**.",
      "La utilització combinada de **so i silenci** és la base de la creació musical.",
    ],
    def: "El **silenci** és l'**absència** de so o soroll.",
  },

  b2: "2 · Les qualitats del so",
  qualitats: {
    titol: "Quadre de les qualitats del so",
    pagina: "pàg. 11 · sencer",
    intro: "Els exemples comparen el **xilòfon** (plaques de fusta) i el **metal·lòfon** (plaques metàl·liques).",
    items: [
      {
        nom: "Altura",
        poden: "Els sons poden ser aguts o greus.",
        exemple:
          "Quan et desplaces mentre toques cap a la dreta del xilòfon o el metal·lòfon (cap a les plaques més menudes), el so es fa progressivament més fi o agut, mentre que cap a l'esquerra es fa més gros o greu.",
      },
      { nom: "Duració", poden: "Els sons poden ser llargs o curts.", exemple: "Els sons en el metal·lòfon duren més temps que en el xilòfon." },
      {
        nom: "Intensitat",
        poden: "Els sons poden ser forts o febles.",
        exemple: "Si colpeges amb més força l'instrument, obtens un so més fort, mentre que, si ho fas suaument, el so és més feble.",
      },
      {
        nom: "Timbre",
        poden: "Els sons poden procedir de veus o d'instruments.",
        exemple: "Quan es toquen dos instruments diferents, com el metal·lòfon i el xilòfon, la sonoritat o color canvia en cada un.",
      },
    ],
  },
  altura: {
    titol: "L'altura",
    def: "L'**altura** és la qualitat del so que distingeix entre sons **greus i aguts**.",
    idees: [
      "Com la resta de les qualitats del so, l'altura també es pot mesurar; la unitat de mesura corresponent és l'**hertz (Hz)**. Com més hertzs o vibracions per segon es produïsquen, **més agut** és el so.",
      "L'altura dels sons es representa mitjançant **el pentagrama, la clau i les notes musicals**.",
    ],
    figPeu: "Les notes en clau de sol, de més greu (esquerra) a més aguda (dreta).",
    recordaTitol: "Recorda",
    recorda: [
      "**Pentagrama:** és el conjunt de **cinc línies i quatre espais** en què s'escriu la música.",
      "**Clau:** signe musical que **dona nom a les notes**.",
    ],
    recordaPeu: "Línies i espais es compten de baix a dalt. La clau de sol naix en la 2a línia: la nota d'eixa línia es diu sol.",
    sabiesTitol: "Sabies que…",
    sabies:
      "L'orella humana percep freqüències entre **20 Hz** (to més baix) i **20 000 Hz** (to més alt). Els sons per davall de 20 Hz es consideren **infrasons**, mentre que els sons per damunt de 20 000 Hz són considerats **ultrasons**.",
    banda: [
      { t: "Infrasons", d: "menys de 20 Hz" },
      { t: "👂 Ho sentim", d: "de 20 Hz a 20 000 Hz" },
      { t: "Ultrasons", d: "més de 20 000 Hz" },
    ],
  },
  duracio: {
    titol: "La duració",
    def: "La **duració** és la qualitat que diferencia entre sons **llargs i curts**, i es representa amb **figures i silencis musicals**.",
    esqTitol: "Esquema de les figures i els silencis musicals",
    esqIntro: "Cada figura té el seu silenci, que dura el mateix. El número és el valor (en temps).",
    figura: "figura",
    silenci: "silenci",
    noms: ["redona", "blanca", "negra", "corxera", "semicorxera"],
    trucTitol: "Truc per a recordar-ho",
    truc: "Cada figura dura **la meitat** que l'anterior: 1 redona = 2 blanques = 4 negres = 8 corxeres = 16 semicorxeres.",
    sabiesTitol: "Sabies que…",
    sabies:
      "Els **signes de repetició** eviten tornar a escriure un mateix fragment quan es repeteix. Les **barres de repetició** ens indiquen que cal:",
    repetir: ["Repetir el fragment des del principi.", "Repetir el fragment comprés entre les dues barres."],
  },
  intensitat: {
    titol: "La intensitat",
    mesTitol: "Saber-ne més",
    mes: "Per indicar l'augment o la disminució **gradual** de la intensitat, se solen utilitzar uns signes anomenats **reguladors**:",
    cresc: "**Crescendo** (*cresc.*) = augmentar progressivament la intensitat.",
    dim: "**Diminuendo** (*dim.*) = disminuir progressivament la intensitat.",
    def: "La **intensitat** és la qualitat que distingeix entre sons **forts i suaus**.",
    esqTitol: "Esquema del volum: els matisos (copiar i estudiar)",
    figPeu: "La intensitat es representa amb matisos. De més suau (esquerra) a més fort (dreta).",
    taula: ["Signe", "Nom", "Vol dir"],
    sentits: ["molt suau", "suau", "mig suau", "mig fort", "fort", "molt fort"],
  },
  timbre: {
    titol: "El timbre",
    def: "El **timbre** és la qualitat del so que ens indica **qui o què el produeix**.",
    idea: "D'aquesta manera es pot determinar **quin tipus de veu o d'instrument** sonen tan bon punt els sents.",
  },

  repasTitol: "Comprova-ho: preguntes de repàs",
  repasIntro: "Intenta respondre de memòria i després obri la resposta per a comprovar-la.",
  veure: "Veure resposta",
  preguntes: [
    { q: "Què és el so?", r: "És la sensació que experimentem quan ens arriben a l'orella les ones produïdes per la vibració d'un cos sonor." },
    { q: "Quan sorgeix el so i com viatja?", r: "Quan un cos o un objecte vibra. La vibració es transmet en forma d'ones sonores a través de diferents medis: l'aire, l'aigua, la fusta…" },
    { q: "Quina part de l'orella vibra quan li arriben les ones sonores?", r: "El timpà, una membrana elàstica que vibra i transmet la informació al cervell." },
    { q: "En què es diferencien el so i el soroll des d'un punt de vista físic?", r: "En el tipus d'ona: la del so és ordenada i regular; la del soroll, desordenada i irregular." },
    { q: "Què és la contaminació acústica? Quins efectes té?", r: "L'excés de soroll. Té efectes nocius sobre la salut: dificultat de comunicació, trastorns del son, estrès, pèrdua de capacitat auditiva, conductes agressives…" },
    { q: "Digues quatre fonts de soroll ambiental.", r: "Els mitjans de transport, l'activitat industrial, la construcció i les zones d'oci." },
    { q: "Per a què serveix un sonòmetre?", r: "Per a mesurar el nivell de soroll, que es mesura en decibels (dB)." },
    { q: "Què és el silenci?", r: "L'absència de so o soroll. En la música és una part fonamental de la composició i de la interpretació." },
    { q: "Quines són les quatre qualitats del so?", r: "Altura, duració, intensitat i timbre." },
    { q: "En quina unitat es mesura l'altura? Com més hertzs…", r: "En hertzs (Hz). Com més hertzs o vibracions per segon, més agut és el so." },
    { q: "Quins sons percep l'orella humana? Què són els infrasons i els ultrasons?", r: "Entre 20 Hz i 20 000 Hz. Per davall de 20 Hz, infrasons; per damunt de 20 000 Hz, ultrasons." },
    { q: "Què és el pentagrama? I la clau?", r: "El pentagrama és el conjunt de cinc línies i quatre espais en què s'escriu la música. La clau és el signe musical que dona nom a les notes." },
    { q: "Ordena les figures de més llarga a més curta i digues quant val cadascuna.", r: "Redona (4), blanca (2), negra (1), corxera (½) i semicorxera (¼)." },
    { q: "Què indiquen les barres de repetició?", r: "Que cal repetir el fragment des del principi o el fragment comprés entre les dues barres." },
    { q: "Ordena els matisos de més suau a més fort.", r: "pp (pianissimo), p (piano), mp (mezzopiano), mf (mezzoforte), f (forte), ff (fortissimo)." },
    { q: "Què volen dir crescendo i diminuendo?", r: "Són reguladors. Crescendo (cresc.): augmentar progressivament la intensitat. Diminuendo (dim.): disminuir-la progressivament." },
    { q: "Què ens indica el timbre?", r: "Qui o què produeix el so: així podem saber quin tipus de veu o d'instrument sona." },
  ],
};

export type Textos = typeof CA;

const ES: Textos = {
  titolDoc: "Música 1.º ESO · Tema 1: el sonido y sus cualidades (esquema) — Aula en la Nube",
  chip: "1.º de ESO · Música · Tema 1",
  h1: "Esquema del tema 1: el sonido y sus cualidades",
  intro:
    "Todo lo que entra en el examen, ordenado y resumido a partir de las partes subrayadas del libro (páginas 8 a 14). El libro está en valenciano: esta versión es una **traducción fiel**. Las **definiciones** de los cuadros morados son las que hay que saber de memoria.",
  imprimir: "🖨 Imprimir el esquema completo",
  pag: "pág.",
  definicio: "Definición · de memoria",

  mapaTitol: "Mapa conceptual: todo el tema en una página",
  mapaIntro:
    "Para repasar de un vistazo. Descárgalo en PDF (A4 apaisado) para imprimirlo, o en imagen para tenerlo en el móvil.",
  baixar: { pdf: "Descargar PDF", png: "Imagen PNG", svg: "SVG", fent: "Preparando…", error: "No se ha podido generar el archivo." },

  entraTitol: "Qué entra en el examen",
  entra: [
    { p: "Pág. 8", t: "El sonido: de dónde nace, cómo viaja y cómo lo oímos. Definición de sonido.", a: "so" },
    { p: "Pág. 9", t: "El ruido: ondas regulares e irregulares, contaminación acústica y el sonómetro.", a: "soroll" },
    { p: "Pág. 10", t: "El silencio: primer párrafo y definición.", a: "silenci" },
    { p: "Pág. 11", t: "Cuadro completo de las cualidades del sonido.", a: "qualitats" },
    { p: "Pág. 12", t: "La altura, «Recuerda» (pentagrama y clave) y «¿Sabías que…?» (Hz, infrasonidos y ultrasonidos).", a: "altura" },
    { p: "Pág. 13", t: "La duración, esquema de figuras y silencios y «¿Sabías que…?» (barras de repetición).", a: "duracio" },
    { p: "Pág. 14", t: "La intensidad («Saber más» y esquema del volumen) y el timbre.", a: "intensitat" },
  ],

  esquemaTitol: "Esquema general",
  arrel: "El sonido",
  branques: [
    {
      titol: "1 · Sonido, ruido y silencio",
      a: "so",
      fulles: [
        { nom: "Sonido", a: "so", clau: "un cuerpo vibra → ondas sonoras → tímpano → cerebro" },
        { nom: "Ruido", a: "soroll", clau: "onda irregular · contaminación acústica · sonómetro (dB)" },
        { nom: "Silencio", a: "silenci", clau: "ausencia de sonido o ruido" },
      ],
    },
    {
      titol: "2 · Las cualidades del sonido",
      a: "qualitats",
      fulles: [
        { nom: "Altura", a: "altura", clau: "graves / agudos · hercio (Hz) · pentagrama, clave y notas" },
        { nom: "Duración", a: "duracio", clau: "largos / cortos · figuras y silencios" },
        { nom: "Intensidad", a: "intensitat", clau: "fuertes / suaves · matices (pp … ff) · reguladores" },
        { nom: "Timbre", a: "timbre", clau: "quién o qué produce el sonido" },
      ],
    },
  ],

  b1: "1 · Sonido, ruido y silencio",
  so: {
    titol: "El sonido",
    passos: ["Un cuerpo vibra", "Ondas sonoras por el medio (aire, agua, madera…)", "El tímpano del oído vibra", "La información llega al cerebro"],
    idees: [
      "El sonido surge cuando un **cuerpo** o un objeto **vibra**.",
      "La vibración se transmite en forma de **ondas sonoras** que viajan a través de diferentes **medios**: el aire, el agua, la madera…",
      "Percibimos las ondas del sonido gracias al **oído**. En este órgano hay una membrana elástica, llamada **tímpano**, que vibra cuando le llegan las ondas sonoras y transmite esta información al **cerebro**.",
    ],
    def: "El **sonido** es la sensación que experimentamos cuando nos llegan al oído las ondas producidas por la **vibración de un cuerpo sonoro**.",
  },
  soroll: {
    titol: "El ruido",
    idea: "Desde un punto de vista físico, **el ruido y el sonido se diferencian por el tipo de onda que producen**.",
    def: "La onda de un **sonido** es **ordenada y regular**, mientras que la onda del **ruido** es **desordenada e irregular**.",
    figPeu: "Ondas regulares (sonido, por ejemplo un saxofón) y ondas irregulares (ruido, por ejemplo unos platillos).",
    contTitol: "La contaminación acústica",
    cont: "El exceso de ruido se denomina **contaminación acústica**. Es un problema en nuestra sociedad, porque reduce el nivel de calidad de vida, ya que tiene **efectos nocivos sobre la salud**:",
    efectes: ["dificultad de comunicación", "trastornos del sueño", "estrés", "pérdida de capacidad auditiva", "conductas agresivas", "etc."],
    fontsIdea: "Algunas de las **fuentes de ruido ambiental** son:",
    fonts: ["🚗 los medios de transporte", "🏭 la actividad industrial", "🏗️ la construcción", "🎉 las zonas de ocio"],
    sonometreTitol: "El sonómetro: ¿para qué sirve?",
    sonometre:
      "El nivel de ruido se mide en **decibelios (dB)** y el aparato que se utiliza para medirlo se llama **sonómetro**. Aplicaciones como *Sound Meter* o *Medidor de decibelios*, entre otras, pueden servirte para medir el nivel de ruido de tu entorno.",
  },
  silenci: {
    titol: "El silencio",
    idees: [
      "En la música, **el silencio es una parte fundamental** tanto de la **composición** como de la **interpretación**.",
      "La utilización combinada de **sonido y silencio** es la base de la creación musical.",
    ],
    def: "El **silencio** es la **ausencia** de sonido o ruido.",
  },

  b2: "2 · Las cualidades del sonido",
  qualitats: {
    titol: "Cuadro de las cualidades del sonido",
    pagina: "pág. 11 · completo",
    intro: "Los ejemplos comparan el **xilófono** (láminas de madera) y el **metalófono** (láminas metálicas).",
    items: [
      {
        nom: "Altura",
        poden: "Los sonidos pueden ser agudos o graves.",
        exemple:
          "Cuando te desplazas mientras tocas hacia la derecha del xilófono o el metalófono (hacia las láminas más pequeñas), el sonido se vuelve progresivamente más fino o agudo, mientras que hacia la izquierda se vuelve más grueso o grave.",
      },
      { nom: "Duración", poden: "Los sonidos pueden ser largos o cortos.", exemple: "Los sonidos del metalófono duran más tiempo que los del xilófono." },
      {
        nom: "Intensidad",
        poden: "Los sonidos pueden ser fuertes o débiles.",
        exemple: "Si golpeas el instrumento con más fuerza, obtienes un sonido más fuerte, mientras que, si lo haces suavemente, el sonido es más débil.",
      },
      {
        nom: "Timbre",
        poden: "Los sonidos pueden proceder de voces o de instrumentos.",
        exemple: "Cuando se tocan dos instrumentos diferentes, como el metalófono y el xilófono, la sonoridad o color cambia en cada uno.",
      },
    ],
  },
  altura: {
    titol: "La altura",
    def: "La **altura** es la cualidad del sonido que distingue entre sonidos **graves y agudos**.",
    idees: [
      "Como el resto de cualidades del sonido, la altura también se puede medir; la unidad de medida correspondiente es el **hercio (Hz)**. Cuantos más hercios o vibraciones por segundo se produzcan, **más agudo** es el sonido.",
      "La altura de los sonidos se representa mediante **el pentagrama, la clave y las notas musicales**.",
    ],
    figPeu: "Las notas en clave de sol, de más grave (izquierda) a más aguda (derecha).",
    recordaTitol: "Recuerda",
    recorda: [
      "**Pentagrama:** es el conjunto de **cinco líneas y cuatro espacios** en el que se escribe la música.",
      "**Clave:** signo musical que **da nombre a las notas**.",
    ],
    recordaPeu: "Líneas y espacios se cuentan de abajo arriba. La clave de sol nace en la 2.ª línea: la nota de esa línea se llama sol.",
    sabiesTitol: "¿Sabías que…?",
    sabies:
      "El oído humano percibe frecuencias entre **20 Hz** (tono más bajo) y **20 000 Hz** (tono más alto). Los sonidos por debajo de 20 Hz se consideran **infrasonidos**, mientras que los sonidos por encima de 20 000 Hz se consideran **ultrasonidos**.",
    banda: [
      { t: "Infrasonidos", d: "menos de 20 Hz" },
      { t: "👂 Lo oímos", d: "de 20 Hz a 20 000 Hz" },
      { t: "Ultrasonidos", d: "más de 20 000 Hz" },
    ],
  },
  duracio: {
    titol: "La duración",
    def: "La **duración** es la cualidad que diferencia entre sonidos **largos y cortos**, y se representa con **figuras y silencios musicales**.",
    esqTitol: "Esquema de las figuras y los silencios musicales",
    esqIntro: "Cada figura tiene su silencio, que dura lo mismo. El número es el valor (en tiempos).",
    figura: "figura",
    silenci: "silencio",
    noms: ["redonda", "blanca", "negra", "corchea", "semicorchea"],
    trucTitol: "Truco para recordarlo",
    truc: "Cada figura dura **la mitad** que la anterior: 1 redonda = 2 blancas = 4 negras = 8 corcheas = 16 semicorcheas.",
    sabiesTitol: "¿Sabías que…?",
    sabies:
      "Los **signos de repetición** evitan volver a escribir un mismo fragmento cuando se repite. Las **barras de repetición** nos indican que hay que:",
    repetir: ["Repetir el fragmento desde el principio.", "Repetir el fragmento comprendido entre las dos barras."],
  },
  intensitat: {
    titol: "La intensidad",
    mesTitol: "Saber más",
    mes: "Para indicar el aumento o la disminución **gradual** de la intensidad, se suelen utilizar unos signos llamados **reguladores**:",
    cresc: "**Crescendo** (*cresc.*) = aumentar progresivamente la intensidad.",
    dim: "**Diminuendo** (*dim.*) = disminuir progresivamente la intensidad.",
    def: "La **intensidad** es la cualidad que distingue entre sonidos **fuertes y suaves**.",
    esqTitol: "Esquema del volumen: los matices (copiar y estudiar)",
    figPeu: "La intensidad se representa con matices. De más suave (izquierda) a más fuerte (derecha).",
    taula: ["Signo", "Nombre", "Significa"],
    sentits: ["muy suave", "suave", "medio suave", "medio fuerte", "fuerte", "muy fuerte"],
  },
  timbre: {
    titol: "El timbre",
    def: "El **timbre** es la cualidad del sonido que nos indica **quién o qué lo produce**.",
    idea: "De esta manera se puede saber **qué tipo de voz o de instrumento** suena en cuanto lo oyes.",
  },

  repasTitol: "Compruébalo: preguntas de repaso",
  repasIntro: "Intenta responder de memoria y después abre la respuesta para comprobarla.",
  veure: "Ver respuesta",
  preguntes: [
    { q: "¿Qué es el sonido?", r: "Es la sensación que experimentamos cuando nos llegan al oído las ondas producidas por la vibración de un cuerpo sonoro." },
    { q: "¿Cuándo surge el sonido y cómo viaja?", r: "Cuando un cuerpo o un objeto vibra. La vibración se transmite en forma de ondas sonoras a través de diferentes medios: el aire, el agua, la madera…" },
    { q: "¿Qué parte del oído vibra cuando le llegan las ondas sonoras?", r: "El tímpano, una membrana elástica que vibra y transmite la información al cerebro." },
    { q: "¿En qué se diferencian el sonido y el ruido desde un punto de vista físico?", r: "En el tipo de onda: la del sonido es ordenada y regular; la del ruido, desordenada e irregular." },
    { q: "¿Qué es la contaminación acústica? ¿Qué efectos tiene?", r: "El exceso de ruido. Tiene efectos nocivos sobre la salud: dificultad de comunicación, trastornos del sueño, estrés, pérdida de capacidad auditiva, conductas agresivas…" },
    { q: "Di cuatro fuentes de ruido ambiental.", r: "Los medios de transporte, la actividad industrial, la construcción y las zonas de ocio." },
    { q: "¿Para qué sirve un sonómetro?", r: "Para medir el nivel de ruido, que se mide en decibelios (dB)." },
    { q: "¿Qué es el silencio?", r: "La ausencia de sonido o ruido. En la música es una parte fundamental de la composición y de la interpretación." },
    { q: "¿Cuáles son las cuatro cualidades del sonido?", r: "Altura, duración, intensidad y timbre." },
    { q: "¿En qué unidad se mide la altura? Cuantos más hercios…", r: "En hercios (Hz). Cuantos más hercios o vibraciones por segundo, más agudo es el sonido." },
    { q: "¿Qué sonidos percibe el oído humano? ¿Qué son los infrasonidos y los ultrasonidos?", r: "Entre 20 Hz y 20 000 Hz. Por debajo de 20 Hz, infrasonidos; por encima de 20 000 Hz, ultrasonidos." },
    { q: "¿Qué es el pentagrama? ¿Y la clave?", r: "El pentagrama es el conjunto de cinco líneas y cuatro espacios en el que se escribe la música. La clave es el signo musical que da nombre a las notas." },
    { q: "Ordena las figuras de más larga a más corta y di cuánto vale cada una.", r: "Redonda (4), blanca (2), negra (1), corchea (½) y semicorchea (¼)." },
    { q: "¿Qué indican las barras de repetición?", r: "Que hay que repetir el fragmento desde el principio o el fragmento comprendido entre las dos barras." },
    { q: "Ordena los matices de más suave a más fuerte.", r: "pp (pianissimo), p (piano), mp (mezzopiano), mf (mezzoforte), f (forte), ff (fortissimo)." },
    { q: "¿Qué significan crescendo y diminuendo?", r: "Son reguladores. Crescendo (cresc.): aumentar progresivamente la intensidad. Diminuendo (dim.): disminuirla progresivamente." },
    { q: "¿Qué nos indica el timbre?", r: "Quién o qué produce el sonido: así podemos saber qué tipo de voz o de instrumento suena." },
  ],
};

export const T: Record<Idioma, Textos> = { ca: CA, es: ES };
