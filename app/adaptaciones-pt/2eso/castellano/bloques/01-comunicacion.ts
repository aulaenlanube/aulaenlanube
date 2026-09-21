// Bloque 1 · La comunicación · Tema 1 de Lengua Castellana · Adaptaciones PT · 2.º ESO
// Cuatro niveles por actividad: [0] 1.º ESO (referencia), [1] 6.º, [2] 5.º, [3] 4.º de primaria.

import type { Ap, Act } from "../tipos";

export const AP: Ap = {
  slug: "01-comunicacion",
  n: 1,
  t: "La comunicación",
  teoria: [
    "**Comunicarse** es enviar información a alguien con una **intención**: que se entere de algo, que haga algo, que cambie de idea o que sepa cómo te sientes. Lo haces todo el rato y casi siempre sin pensarlo: cuando mandas un audio, cuando levantas la mano en clase, cuando el conductor del autobús enciende el intermitente o cuando el pañuelo de la comisión dice, sin una sola palabra, de qué falla eres. Según para qué se emita, el mensaje sirve para *informar* (el examen es el jueves), *pedir* (¿me pasas los apuntes?), *convencer* (última semana de rebajas) o *expresar* (¡qué rabia!). Reconocer la intención es tan importante como entender las palabras.",
    "En toda situación comunicativa intervienen **seis elementos**. El **emisor** es quien produce el mensaje y el **receptor**, quien lo recibe; el **mensaje** es la información que viaja; el **canal** es el medio físico por donde viaja (el aire, el papel, la pantalla, el cable); el **código** es el sistema de signos compartido (el castellano, el valenciano, los gestos, los colores de un semáforo); y el **contexto** o situación es todo lo que rodea al mensaje y ayuda a interpretarlo: dónde, cuándo y entre quiénes ocurre. Si falla uno solo, la comunicación se rompe: un mensaje perfecto escrito en un código que el receptor no conoce no comunica absolutamente nada.",
    "Fig:circuito",
    "RAW:<table><caption>Los seis elementos en una situación real: Marta manda un audio a su padre desde la puerta del instituto de Xàtiva, a las 14:05, para pedirle que la recoja porque está lloviendo</caption><thead><tr><th>Elemento</th><th>Qué es</th><th>En esta situación</th></tr></thead><tbody><tr><td>Emisor</td><td>Quien produce y envía el mensaje</td><td>Marta</td></tr><tr><td>Receptor</td><td>Quien recibe e interpreta el mensaje</td><td>Su padre</td></tr><tr><td>Mensaje</td><td>La información que se transmite</td><td>Que pase a recogerla porque llueve</td></tr><tr><td>Canal</td><td>El medio físico por donde viaja</td><td>El móvil: un audio de mensajería</td></tr><tr><td>Código</td><td>El sistema de signos compartido</td><td>El castellano oral</td></tr><tr><td>Contexto</td><td>La situación que da sentido al mensaje</td><td>Final de las clases, lloviendo, el padre con coche cerca</td></tr></tbody></table>",
    "La comunicación **verbal** usa palabras y puede ser **oral** (una conversación, un audio, la megafonía del mercado) o **escrita** (un wasap, un examen, el cartel de una tienda). La comunicación **no verbal** transmite sin palabras: gestos, miradas, postura, tono de voz, señales de tráfico, imágenes, iconos y colores. Las dos se mezclan sin parar y, cuando se contradicen, el receptor hace más caso a lo no verbal: si dices «estoy bien» con la cabeza gacha y voz apagada, nadie te cree.",
    "Todo lo que usamos para comunicar es un **signo**: algo que está en lugar de otra cosa y que un grupo de personas interpreta igual. Dentro de los signos, una **señal** avisa o manda y es *convencional*, es decir, hay que aprenderla, porque el rojo del semáforo no se parece en nada a «párate»; un **icono**, en cambio, **se parece** a lo que representa (el sobrecito del correo en el móvil, el tenedor y el cuchillo de la señal de área de servicio). Conviene además no confundir tres palabras: el **lenguaje** es la capacidad humana de comunicarse con signos, la **lengua** es el sistema concreto que comparte una comunidad (castellano, valenciano, inglés) y el **habla** es el uso que cada persona hace de su lengua en un momento dado. Y cuando algo estropea el mensaje por el camino (mala cobertura, jaleo en el pasillo, letra ilegible) hablamos de **ruido**.",
  ],
  ej: [
    "Cartel en el mercado de Xàtiva: «Cerrado por fallas». Emisor: el tendero. Receptor: los clientes. Mensaje: que hoy no abre. Canal: el papel. Código: castellano escrito. Contexto: marzo, semana de fiestas.",
    "Levantar la mano en clase es comunicación **no verbal**: sin decir una palabra, el profesor entiende que quieres hablar y te da el turno.",
    "«¿Me dejas el boli?» no informa de nada: su intención es **pedir**, y por eso espera como respuesta un boli, no un dato.",
  ],
};

export const ACTS: Act[] = [
  {
    t: "El grupo de clase a las 21:40",
    d: "Identificas los seis elementos de la comunicación en mensajes de móvil reales.",
    ic: "chat",
    fig: "circuito",
    nv: [
      {
        in: "En el grupo de 2.º B, a las 21:40, Nerea escribe: «Mañana la excursión a la Albufera sale a las 8:00 desde la puerta del instituto. No lleguéis tarde.»",
        p: [
          "**a)** Identifica los seis elementos de la comunicación en esta situación: emisor, receptor, mensaje, canal, código y contexto.",
          "**b)** El receptor no es una sola persona. Explica qué consecuencia tiene eso para que el aviso funcione.",
          "**c)** Ese mismo mensaje, enviado un martes de agosto, no comunicaría nada. Justifica qué elemento falla.",
        ],
        s: [
          "**a)** Emisor: Nerea. Receptor: los compañeros del grupo de 2.º B. Mensaje: la hora y el lugar de salida de la excursión. Canal: el móvil, a través de la aplicación de mensajería. Código: el castellano escrito. Contexto: la noche antes de una excursión del instituto.",
          "**b)** Es un receptor **colectivo**: al no dirigirse a nadie en concreto, cada uno puede pensar que el aviso va para los demás y nadie confirma. Por eso en un grupo conviene pedir respuesta o nombrar a alguien.",
          "**c)** Falla el **contexto**: en agosto no hay clases ni excursión, así que el mensaje resulta incomprensible aunque el emisor, el canal y el código sean exactamente los mismos.",
        ],
      },
      {
        in: "Nerea escribe en el grupo de clase: «Mañana la excursión a la Albufera sale a las 8:00 desde la puerta del instituto.»",
        p: [
          "**a)** Copia y completa. Emisor: Nerea *(ya está hecho)*. Receptor: … Mensaje: … Canal: …",
          "**b)** ¿En qué código está escrito el mensaje: en castellano, en dibujos o en gestos?",
          "**c)** Señala en el texto las palabras que dicen **cuándo** y **dónde** es la salida.",
        ],
        s: [
          "**a)** Receptor: los compañeros de clase. Mensaje: la hora y el sitio de salida de la excursión. Canal: el móvil.",
          "**b)** En **castellano**, es decir, un código de palabras escritas.",
          "**c)** Cuándo: «mañana» y «a las 8:00». Dónde: «desde la puerta del instituto».",
        ],
        ad: "Se reduce a tres elementos, se da el emisor ya resuelto como modelo y basta con señalar en el texto en vez de redactar una explicación.",
      },
      {
        in: "Mensaje de móvil: «Mamá, hoy salgo a las 14:00. Te espero en la puerta.» Banco de palabras: *emisor* · *receptor* · *canal*.",
        p: [
          "**a)** Rodea el emisor: *la madre* / *el hijo* / *el instituto*.",
          "**b)** Completa con el banco de palabras: quien escribe es el …, quien lo lee es el … y el móvil es el …",
          "**c)** ¿El mensaje está hecho con palabras o con dibujos? Elige: *palabras* / *dibujos*.",
        ],
        s: [
          "**a)** *El hijo*, porque es quien escribe el mensaje.",
          "**b)** Quien escribe es el **emisor**, quien lo lee es el **receptor** y el móvil es el **canal**.",
          "**c)** Con *palabras*: es comunicación verbal escrita.",
        ],
        ad: "Se pasa a opciones cerradas (rodear y elegir entre tres) con banco de palabras a la vista y frases muy cortas.",
      },
      {
        in: "Tarjetas sobre la mesa: AZUL para quien habla, VERDE para quien escucha, AMARILLA para lo que se dice. El docente lee en voz alta: «Pablo le dice a su hermana: ponte el chubasquero, que llueve.»",
        p: [
          "**a)** Coloca la tarjeta AZUL delante del dibujo de Pablo y la VERDE delante del dibujo de su hermana.",
          "**b)** Di en voz alta qué pondría en la tarjeta AMARILLA, es decir, qué le dice Pablo.",
        ],
        s: [
          "**a)** AZUL sobre Pablo, que es quien habla (el emisor), y VERDE sobre la hermana, que es quien escucha (el receptor).",
          "**b)** En la tarjeta AMARILLA va el mensaje: que se ponga el chubasquero porque está lloviendo. Se responde oralmente.",
        ],
        ad: "Se trabaja con tarjetas de colores y respuesta oral, con solo dos elementos y el texto leído en voz alta por el docente.",
      },
    ],
  },
  {
    t: "Sin decir ni una palabra",
    d: "Separas la comunicación verbal de la no verbal y distingues señales de iconos.",
    ic: "semaforo",
    nv: [
      {
        in: "Cinco situaciones de un martes cualquiera: 1) el semáforo de la avenida se pone en rojo; 2) un compañero bosteza en tercera hora; 3) la megafonía del mercado anuncia una oferta de naranjas; 4) el cartel del ascensor dice «Fuera de servicio»; 5) en la pantalla del móvil aparece el icono de un sobre.",
        p: [
          "**a)** Clasifica las cinco situaciones en verbal oral, verbal escrita o no verbal.",
          "**b)** De las no verbales, di cuál es una **señal** y cuál es un **icono**, y justifica la diferencia.",
          "**c)** Una de las cinco comunica algo que el emisor no pretendía comunicar. Identifícala y explica por qué ocurre.",
        ],
        s: [
          "**a)** 1) no verbal; 2) no verbal; 3) verbal oral; 4) verbal escrita; 5) no verbal.",
          "**b)** El semáforo en rojo es una **señal**: es convencional, hay que aprender que el rojo significa detenerse, porque el color no se parece a la orden. El sobre del móvil es un **icono**: se parece a una carta, así que se entiende sin conocer el idioma.",
          "**c)** El bostezo. Es un gesto involuntario, pero el receptor lo interpreta como «me aburro» o «tengo sueño»: lo no verbal comunica aunque el emisor no lo decida.",
        ],
      },
      {
        in: "Cuatro situaciones: 1) el conserje dice «hasta mañana» *(ya resuelta: verbal, porque usa palabras)*; 2) el semáforo se pone en rojo; 3) una compañera te guiña un ojo; 4) el cartel del ascensor dice «Fuera de servicio».",
        p: [
          "**a)** Clasifica las situaciones 2, 3 y 4 en **verbal** o **no verbal**, como en el ejemplo resuelto.",
          "**b)** ¿Cuál de las cuatro entendería una persona que no sepa castellano? Explícalo en una frase.",
          "**c)** Escribe un ejemplo tuyo de comunicación no verbal que uses en el instituto.",
        ],
        s: [
          "**a)** 2) no verbal; 3) no verbal; 4) verbal, porque está escrito con palabras.",
          "**b)** El semáforo en rojo y el guiño, porque no necesitan palabras; los otros dos están en castellano y no los entendería.",
          "**c)** Respuesta abierta: levantar la mano para pedir el turno, señalar el reloj para avisar de la hora, chocar la mano al saludar.",
        ],
        ad: "Menos situaciones, la primera ya clasificada como modelo y la clasificación se reduce a dos opciones (verbal o no verbal).",
      },
      {
        in: "Cuatro mensajes: 1) un semáforo en rojo; 2) decir «buenos días»; 3) el icono de una papelera en el ordenador; 4) un cartel que pone «Abierto». Banco: V = verbal (usa palabras) · NV = no verbal (no usa palabras).",
        p: [
          "**a)** Escribe V o NV al lado de cada uno de los cuatro mensajes.",
          "**b)** Rodea el que es una señal de tráfico: *1* / *2* / *3* / *4*.",
          "**c)** El icono de la papelera sirve para… Elige: *borrar* / *imprimir* / *llamar*.",
        ],
        s: [
          "**a)** 1) NV; 2) V; 3) NV; 4) V.",
          "**b)** El *1*, el semáforo en rojo.",
          "**c)** *Borrar*: el dibujo se parece a una papelera de verdad, por eso se entiende.",
        ],
        ad: "Cada ítem se resuelve con dos letras o rodeando entre opciones cerradas, sin redactar ninguna explicación.",
      },
      {
        in: "Cuatro tarjetas con dibujo: un semáforo en rojo, una mano levantada, un dedo sobre los labios y un bocadillo de cómic con la palabra «hola».",
        p: [
          "**a)** Haz con tu cuerpo el gesto de cada tarjeta y di en voz alta qué significa.",
          "**b)** Haz dos montones: tarjetas que usan palabras y tarjetas que no usan palabras.",
        ],
        s: [
          "**a)** Semáforo en rojo: pararse. Mano levantada: pedir el turno de palabra. Dedo sobre los labios: silencio. Bocadillo con «hola»: saludar.",
          "**b)** Con palabras: solo la del bocadillo con «hola». Sin palabras: las otras tres, que son comunicación no verbal.",
        ],
        ad: "Se dramatiza con el cuerpo y se clasifica moviendo tarjetas en dos montones, con respuesta oral y solo dos pasos.",
      },
    ],
  },
  {
    t: "Del audio al papel",
    d: "Transformas un mismo mensaje cambiando el canal y el código con los que viaja.",
    ic: "carta",
    nv: [
      {
        in: "Audio de mensajería de Álex a su tutora, enviado a las 22:15: «Hola, que mañana no voy a poder ir a clase porque tengo médico a primera hora, luego me paso por el instituto y hablamos.»",
        p: [
          "**a)** Reescribe el mensaje como una **nota escrita** para entregar en conserjería. Indica qué canal usa ahora.",
          "**b)** Traduce el mismo mensaje a un **código no verbal**: describe qué iconos o dibujos usarías y di qué parte del mensaje se pierde por el camino.",
          "**c)** Explica por qué al cambiar de canal hay que cambiar también la forma de decirlo, aunque la información sea idéntica.",
        ],
        s: [
          "**a)** Por ejemplo: «Buenos días. Álex Ferrer, de 2.º B, no asistirá a clase el martes 14 por una cita médica a primera hora. Se incorporará a lo largo de la mañana.» El canal pasa a ser el papel.",
          "**b)** Un reloj con la hora, una cruz de farmacia o un maletín médico y el edificio del instituto tachado. Se pierden los matices: no queda claro quién lo envía, ni el «luego me paso», ni la disculpa.",
          "**c)** Porque el canal condiciona el registro y la permanencia. El audio es rápido, informal y se apoya en el tono de voz; la nota escrita queda archivada, la puede leer alguien que no conoce a Álex y necesita nombre, curso, fecha y motivo.",
        ],
      },
      {
        in: "Mensaje de audio: «Mañana no voy a clase porque tengo médico.» Modelo de nota ya empezado: «Buenos días. Álex Ferrer, de 2.º B, no asistirá a clase mañana porque…»",
        p: [
          "**a)** Termina la nota siguiendo el modelo que se te da.",
          "**b)** ¿Qué canal usa el audio y qué canal usa la nota?",
          "**c)** ¿El mensaje dice lo mismo en los dos casos? Responde sí o no y añade una razón.",
        ],
        s: [
          "**a)** «… porque tiene una cita médica. Gracias.» Vale cualquier final con el mismo sentido y en tono formal.",
          "**b)** El audio usa el móvil y la voz; la nota usa el papel.",
          "**c)** Sí: la información es la misma; lo que cambia es el canal y la forma de decirlo, más cuidada en el papel.",
        ],
        ad: "Se entrega el comienzo de la nota ya escrito como modelo y solo hay que completarla; las preguntas se limitan a nombrar el canal.",
      },
      {
        in: "Mensaje de móvil: «Mañana no voy a clase. Voy al médico.» Banco de palabras: *faltaré* · *a clase* · *mañana*.",
        p: [
          "**a)** Rodea el canal de ese mensaje: *el papel* / *la pantalla del móvil* / *un altavoz*.",
          "**b)** Elige el dibujo que mejor traduce el mensaje sin palabras: *un balón* / *una cruz de farmacia* / *una mochila*.",
          "**c)** Copia la frase cambiando «no voy a clase» por las palabras del banco.",
        ],
        s: [
          "**a)** *La pantalla del móvil*.",
          "**b)** *Una cruz de farmacia*, porque se relaciona con ir al médico.",
          "**c)** «Mañana faltaré a clase. Voy al médico.»",
        ],
        ad: "Se elige entre tres opciones y la escritura se reduce a copiar una frase usando las palabras del banco.",
      },
      {
        in: "El docente lee en voz alta: «Mañana no voy a clase porque voy al médico.»",
        p: [
          "**a)** Repite el mensaje en voz alta a tu compañero, como si hablaras por teléfono.",
          "**b)** Copia ahora el mensaje en un pósit y pégalo en la pizarra. Di en voz alta qué ha cambiado: el mensaje o el canal.",
        ],
        s: [
          "**a)** Al decirlo en voz alta, el canal es el aire y la voz: es comunicación oral.",
          "**b)** El mensaje es el mismo; lo que cambia es el **canal**, que ahora es el papel del pósit.",
        ],
        ad: "El texto lo dicta el docente y la tarea se resuelve diciéndolo y copiándolo en un pósit, en dos pasos manipulativos.",
      },
    ],
  },
  {
    t: "¿Para qué lo digo?",
    d: "Reconoces si un mensaje sirve para informar, pedir, convencer o expresar.",
    ic: "megafono",
    nv: [
      {
        in: "Cuatro mensajes del mismo día: 1) «El autobús a Morella sale a las 7:30.» 2) «¿Me dejas los apuntes de ayer?» 3) «Compra ya: última semana de rebajas.» 4) «¡Qué rabia, se me ha borrado el trabajo!»",
        p: [
          "**a)** Indica la intención comunicativa de cada mensaje: informar, pedir, convencer o expresar.",
          "**b)** Reescribe el mensaje 1 para que su intención pase a ser *convencer*, sin cambiar el tema del autobús.",
          "**c)** La frase «hace frío aquí» puede tener dos intenciones muy distintas. Explica cuáles son y qué elemento de la comunicación decide cuál vale en cada caso.",
        ],
        s: [
          "**a)** 1) informar; 2) pedir; 3) convencer; 4) expresar.",
          "**b)** Por ejemplo: «Coge el de las 7:30: llegas a Morella con tiempo y te ahorras la cola del siguiente.» Ahora no solo informa, busca que el receptor elija ese autobús.",
          "**c)** Puede *informar* (dar un dato sobre la temperatura) o *pedir* de forma indirecta (que cierres la ventana). Lo decide el **contexto**: quién lo dice, a quién y en qué situación.",
        ],
      },
      {
        in: "Tres mensajes: 1) «Mañana hay examen de Lengua» *(ya resuelto: informar, porque da un dato)*; 2) «¿Me acompañas a secretaría?»; 3) «¡Bien, hemos ganado!»",
        p: [
          "**a)** Di la intención de los mensajes 2 y 3: *pedir* o *expresar*.",
          "**b)** Escribe tú un mensaje corto que sirva para **pedir** algo en clase.",
          "**c)** ¿Cuál de los tres mensajes espera una respuesta del receptor? Señálalo.",
        ],
        s: [
          "**a)** 2) pedir; 3) expresar.",
          "**b)** Respuesta abierta: «¿Me prestas el sacapuntas?» o «¿Puedes repetir la última frase, por favor?».",
          "**c)** El mensaje 2, porque pide algo y necesita un sí o un no.",
        ],
        ad: "Menos mensajes, el primero ya resuelto como modelo y solo dos intenciones posibles entre las que elegir.",
      },
      {
        in: "Tres mensajes: 1) «Son las cinco.» 2) «¿Me das agua?» 3) «Prueba estas naranjas, son las mejores del mercado.» Banco: *informar* · *pedir* · *convencer*.",
        p: [
          "**a)** Une cada mensaje con su intención usando el banco de palabras.",
          "**b)** Rodea el mensaje que sirve para pedir: *1* / *2* / *3*.",
          "**c)** ¿Cuál oirías en el mercado de un vendedor? Elige: *1* / *2* / *3*.",
        ],
        s: [
          "**a)** 1) informar; 2) pedir; 3) convencer.",
          "**b)** El *2*.",
          "**c)** El *3*: el vendedor quiere convencerte de que compres.",
        ],
        ad: "Se resuelve uniendo y rodeando con banco de palabras a la vista, con frases de una línea y sin justificar.",
      },
      {
        in: "Tarjeta A: una cara contenta. Tarjeta B: una mano que pide. El docente dice la frase: «Me duele la cabeza.»",
        p: [
          "**a)** Di la frase dos veces: una con cara de pena, para *expresar* cómo te sientes, y otra pidiendo ayuda a alguien.",
          "**b)** Levanta la tarjeta B cuando el docente lea un mensaje que pida algo: «¿me abres la puerta?», «hoy es lunes», «¿me ayudas?».",
        ],
        s: [
          "**a)** La misma frase sirve para expresar un dolor o para pedir ayuda; lo cambian el tono de voz y la cara, que son comunicación no verbal.",
          "**b)** Se levanta la tarjeta B en «¿me abres la puerta?» y en «¿me ayudas?»; en «hoy es lunes» no, porque solo informa.",
        ],
        ad: "Se dramatiza la frase con el cuerpo y se responde levantando una tarjeta, con dictado del docente y sin escribir nada.",
      },
    ],
  },
  {
    t: "Se ha cortado el mensaje",
    d: "Localizas qué elemento falla cuando la comunicación no llega a su destino.",
    ic: "antena",
    fig: "circuito",
    nv: [
      {
        in: "Cuatro comunicaciones que salen mal: 1) Julia llama desde el cauce del Túria y se la oye entrecortada. 2) Un turista alemán pregunta en alemán en una panadería de Morella. 3) El profesor manda el correo de las notas a una dirección equivocada. 4) Marc escribe «nos vemos allí a las seis» y su amiga no sabe dónde es «allí».",
        p: [
          "**a)** Indica en cada caso qué elemento de la comunicación está fallando.",
          "**b)** Propón una solución concreta para cada fallo sin cambiar la información del mensaje.",
          "**c)** Define con tus palabras qué es el **ruido** en la comunicación y pon un ejemplo del instituto.",
        ],
        s: [
          "**a)** 1) el canal, porque hay interferencias en la línea; 2) el código, porque emisor y receptor no comparten idioma; 3) el receptor, porque el mensaje llega a quien no era; 4) el contexto, porque falta la información compartida que da sentido a «allí».",
          "**b)** 1) buscar cobertura o repetirlo por escrito; 2) pasar a un código común: inglés, gestos o señalar el producto; 3) comprobar la dirección y reenviar; 4) concretar el lugar: «nos vemos en la puerta del instituto a las seis».",
          "**c)** El ruido es cualquier interferencia que estropea el mensaje mientras viaja por el canal. En el instituto: el jaleo del pasillo durante una explicación, una fotocopia borrosa o un audio grabado con viento.",
        ],
      },
      {
        in: "Tres casos: 1) Julia llama y se la oye entrecortada *(ya resuelto: falla el canal, hay mala cobertura)*; 2) un turista pregunta en alemán y el panadero no le entiende; 3) Marc escribe «nos vemos allí» y su amiga no sabe dónde.",
        p: [
          "**a)** Di qué falla en los casos 2 y 3. Pista: uno es el **código** y el otro, el **contexto**.",
          "**b)** Escribe cómo arreglarías el caso 3 con una sola frase.",
          "**c)** ¿Qué es el ruido? Elige la mejor respuesta: *un mensaje largo* / *algo que estropea el mensaje por el camino* / *hablar despacio*.",
        ],
        s: [
          "**a)** 2) falla el código, porque no hablan el mismo idioma; 3) falla el contexto, porque falta decir el lugar.",
          "**b)** «Nos vemos en la puerta del instituto a las seis.»",
          "**c)** *Algo que estropea el mensaje por el camino*.",
        ],
        ad: "Un caso menos, el primero ya resuelto y una pista que da de antemano los dos elementos posibles.",
      },
      {
        in: "Tres fallos: 1) no hay cobertura en el móvil; 2) el compañero habla un idioma que no conoces; 3) la letra del cartel está borrada y no se lee. Banco: *canal* · *código* · *mensaje*.",
        p: [
          "**a)** Une cada fallo con la palabra del banco que le corresponde.",
          "**b)** Rodea el que es un problema de idioma: *1* / *2* / *3*.",
          "**c)** Para arreglar el fallo 1, ¿qué harías? Elige: *gritar más* / *salir a un sitio con cobertura* / *escribir más largo*.",
        ],
        s: [
          "**a)** 1) canal; 2) código; 3) mensaje, porque llega roto y no se puede leer.",
          "**b)** El *2*.",
          "**c)** *Salir a un sitio con cobertura*: el problema está en el canal, no en el volumen.",
        ],
        ad: "Se resuelve uniendo con un banco de tres palabras y eligiendo entre opciones cerradas, sin redacción.",
      },
      {
        in: "Juego del teléfono estropeado. El docente dice al oído del primero: «Mañana traed la carpeta roja y un lápiz.»",
        p: [
          "**a)** Pasad la frase al oído, uno a uno, hasta el último de la fila; el último la dice en voz alta.",
          "**b)** Compara la frase del principio con la del final y di en voz alta qué palabras se han perdido o cambiado.",
        ],
        s: [
          "**a)** Casi siempre la frase final no coincide con la inicial.",
          "**b)** Se han perdido o cambiado palabras porque el canal era el oído y había ruido. Conclusión oral: cuando el canal falla, el mensaje llega mal aunque el emisor lo diga bien.",
        ],
        ad: "Se convierte en un juego oral y en grupo, con dos pasos y sin necesidad de leer ni escribir.",
      },
    ],
  },
  {
    t: "Tres palabras que no son lo mismo",
    d: "Distingues lenguaje, lengua y habla con ejemplos de tu propio entorno.",
    ic: "tarjetas",
    nv: [
      {
        in: "En el recreo, Aisha habla en castellano con Pau, luego en árabe con su hermana por videollamada y, al entrar en clase, saluda a la profesora en valenciano: «Bon dia».",
        p: [
          "**a)** Explica qué es el **lenguaje**, qué es una **lengua** y qué es el **habla**, usando esta escena como ejemplo.",
          "**b)** ¿Cuántas lenguas usa Aisha y cuántos lenguajes? Justifica la diferencia.",
          "**c)** Un grupo de amigos usa palabras inventadas que solo entienden ellos. ¿Están creando una lengua nueva o es una forma de habla? Razona la respuesta.",
        ],
        s: [
          "**a)** El **lenguaje** es su capacidad de comunicarse con signos, que es la misma en las tres escenas. Las **lenguas** son los sistemas concretos que usa: castellano, árabe y valenciano. El **habla** es cada uso real y concreto, como el «Bon dia» que dice al entrar en clase.",
          "**b)** Usa tres lenguas y un solo lenguaje: el lenguaje es una capacidad humana, no un idioma, y por eso no se cuenta uno por cada lengua que se hable.",
          "**c)** Es una forma de **habla**, propia de ese grupo: siguen usando la gramática y casi todo el vocabulario de la misma lengua, solo cambian unas cuantas palabras.",
        ],
      },
      {
        in: "Pistas: **lenguaje** = poder comunicarse con signos · **lengua** = un idioma concreto · **habla** = cómo habla cada persona. Escena: Aisha habla castellano con Pau, árabe con su hermana y saluda en valenciano a la profesora.",
        p: [
          "**a)** Copia y completa: el castellano, el árabe y el valenciano son tres … *(ya está la pista arriba)*.",
          "**b)** ¿Aisha tiene un lenguaje o tres? Responde y añade una razón corta.",
          "**c)** Escribe dos lenguas que se hablen en tu clase o en tu barrio.",
        ],
        s: [
          "**a)** Son tres **lenguas** o idiomas.",
          "**b)** Uno solo: el lenguaje es la capacidad de comunicarse, y esa no cambia aunque sepa tres idiomas.",
          "**c)** Respuesta abierta: por ejemplo castellano y valenciano, o castellano y rumano.",
        ],
        ad: "Las tres definiciones se dan como pistas a la vista y solo hay que aplicarlas, con respuestas de una línea.",
      },
      {
        in: "Banco de palabras: *lenguaje* · *lengua* · *habla*. Frases: 1) el valenciano y el inglés son dos …; 2) todas las personas tenemos … para comunicarnos; 3) cuando Pau cuenta algo a su manera, eso es su …",
        p: [
          "**a)** Completa las tres frases con las palabras del banco.",
          "**b)** Rodea la respuesta correcta: el castellano es una *lengua* / un *lenguaje*.",
          "**c)** Une: *Bon dia* → valenciano · *Good morning* → …",
        ],
        s: [
          "**a)** 1) lenguas; 2) lenguaje; 3) habla.",
          "**b)** Una *lengua*.",
          "**c)** *Good morning* → inglés.",
        ],
        ad: "Se completa con un banco de tres palabras y se responde rodeando o uniendo, con frases muy cortas.",
      },
      {
        in: "Tarjetas con saludos y su bandera: «Hola» (castellano), «Bon dia» (valenciano), «Good morning» (inglés).",
        p: [
          "**a)** Lee cada tarjeta en voz alta y colócala junto a su bandera.",
          "**b)** Di en voz alta: ¿las tres tarjetas dicen lo mismo? ¿En qué se diferencian?",
        ],
        s: [
          "**a)** «Hola» con la bandera del castellano, «Bon dia» con la del valenciano y «Good morning» con la del inglés.",
          "**b)** Sí, las tres saludan: el mensaje es el mismo. Lo que cambia es la **lengua**, es decir, el código con el que se dice.",
        ],
        ad: "Se manipulan tarjetas con banderas y se responde en voz alta, con dos pasos y sin escribir.",
      },
    ],
  },
];
