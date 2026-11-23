// Guion de cada escena de los visores 3D: sus pasos, lo que dura cada uno y la
// frase que lo explica. Este fichero NO importa three: lo lee Visor3D.tsx para
// pintar la lista de pasos en HTML (así la cámara del vídeo puede enfocar cada
// uno) y el motor para saber cuánto dura cada paso.
//
// Reglas (docs/paginas-para-video.md):
//  · el nombre de un paso es corto y ÚNICO en toda la página del laboratorio:
//    la cámara localiza los elementos por el texto con que empiezan;
//  · el detalle es una frase, sin punto y aparte;
//  · una escena dura entre 12 y 24 s en total.

export type PasoEscena = { nombre: string; detalle: string; dur: number };
export type GuionEscena = { etiqueta: string; pasos: PasoEscena[] };

export const ESCENAS = {
  // ── El espacio ────────────────────────────────────────────────────────────
  ejes: {
    etiqueta: "Una bola se mueve por los tres ejes del espacio: X, Y y Z",
    pasos: [
      { nombre: "Eje X", detalle: "Izquierda y derecha. En rojo, por convenio.", dur: 4 },
      { nombre: "Eje Y", detalle: "Arriba y abajo. En verde. En Three.js, Y es la altura.", dur: 4 },
      { nombre: "Eje Z", detalle: "Hacia ti y hacia el fondo. En azul.", dur: 4 },
      { nombre: "Tres números", detalle: "Una posición es siempre (x, y, z), medida desde el origen.", dur: 6 },
    ],
  },
  transformaciones: {
    etiqueta: "Una nave se mueve, gira y cambia de tamaño",
    pasos: [
      { nombre: "Posición", detalle: "Dónde está: tres números, uno por eje.", dur: 4 },
      { nombre: "Rotación", detalle: "Hacia dónde mira: un giro alrededor de cada eje.", dur: 4 },
      { nombre: "Escala", detalle: "Cuánto mide: 1 es su tamaño original; 2, el doble.", dur: 4 },
      { nombre: "Las tres juntas", detalle: "Todo objeto de la escena lleva siempre las tres.", dur: 5 },
    ],
  },
  grafo: {
    etiqueta: "Un sol, un planeta y una luna: cada hijo hereda el movimiento de su padre",
    pasos: [
      { nombre: "Un objeto suelto", detalle: "El sol gira sobre sí mismo. Nadie depende de él.", dur: 4 },
      { nombre: "Un hijo", detalle: "El planeta cuelga del sol: al girar el padre, el hijo da vueltas.", dur: 5 },
      { nombre: "Un nieto", detalle: "La luna cuelga del planeta: hereda los dos movimientos.", dur: 5 },
      { nombre: "Mover al padre", detalle: "Desplazas el sol y se va el sistema entero.", dur: 5 },
    ],
  },

  // ── Los objetos ───────────────────────────────────────────────────────────
  malla: {
    etiqueta: "La misma malla enseñada como puntos, como líneas y como caras",
    pasos: [
      { nombre: "Vértices", detalle: "Puntos en el espacio. Es lo único que se guarda de verdad.", dur: 4 },
      { nombre: "Aristas", detalle: "Al unir los vértices de tres en tres salen triángulos.", dur: 4 },
      { nombre: "Caras", detalle: "Cada triángulo se rellena. Todo lo que ves en 3D son triángulos.", dur: 4 },
      { nombre: "Suavizado", detalle: "Las normales engañan a la luz: mismos triángulos, parece curvo.", dur: 5 },
    ],
  },
  detalle: {
    etiqueta: "Una esfera con cada vez más triángulos",
    pasos: [
      { nombre: "Muy pocos triángulos", detalle: "Barata de dibujar, pero se ven los picos.", dur: 3.5 },
      { nombre: "Algunos más", detalle: "Empieza a parecer una esfera.", dur: 3.5 },
      { nombre: "Suficientes", detalle: "A partir de aquí casi no se nota la mejora.", dur: 3.5 },
      { nombre: "Demasiados", detalle: "Miles de triángulos que nadie aprecia y que la tarjeta gráfica paga.", dur: 4.5 },
    ],
  },
  materiales: {
    etiqueta: "Cinco esferas iguales con materiales distintos",
    pasos: [
      { nombre: "Color base", detalle: "El color propio de la superficie, sin brillos.", dur: 3.5 },
      { nombre: "Rugosidad", detalle: "De izquierda a derecha: de espejo a mate.", dur: 5 },
      { nombre: "Metalicidad", detalle: "De izquierda a derecha: de plástico a metal.", dur: 5 },
      { nombre: "Emisión y cristal", detalle: "Un material puede emitir luz propia o dejarla pasar.", dur: 5 },
    ],
  },
  texturas: {
    etiqueta: "Un cubo al que se le van poniendo texturas, con la imagen al lado",
    pasos: [
      { nombre: "Sin textura", detalle: "Un solo color para toda la malla.", dur: 3.5 },
      { nombre: "Mapa de color", detalle: "Una imagen pegada a la malla. Las coordenadas UV dicen dónde.", dur: 4.5 },
      { nombre: "Mapa de normales", detalle: "Relieve falso: la luz reacciona como si las juntas estuvieran hundidas.", dur: 5 },
      { nombre: "Mapa de rugosidad", detalle: "Qué zonas brillan y cuáles no: la baldosa, sí; la junta, no.", dur: 5 },
    ],
  },

  // ── Luz y cámara ──────────────────────────────────────────────────────────
  luces: {
    etiqueta: "La misma escena iluminada con cuatro tipos de luz",
    pasos: [
      { nombre: "Luz ambiente", detalle: "Ilumina todo por igual: sin sombras, sin volumen.", dur: 4 },
      { nombre: "Luz direccional", detalle: "Rayos paralelos, como el sol. Da sombras a toda la escena.", dur: 5 },
      { nombre: "Luz puntual", detalle: "Una bombilla: ilumina alrededor y se apaga con la distancia.", dur: 5 },
      { nombre: "Foco", detalle: "Un cono de luz, como una linterna o un escenario.", dur: 5 },
    ],
  },
  camara: {
    etiqueta: "A la izquierda, la cámara vista desde fuera; a la derecha, lo que ve",
    pasos: [
      { nombre: "Campo de visión estrecho", detalle: "Poco ángulo: efecto teleobjetivo, todo parece cerca.", dur: 4.5 },
      { nombre: "Campo de visión amplio", detalle: "Mucho ángulo: entra más escena, las cosas se alejan.", dur: 4.5 },
      { nombre: "Plano cercano y lejano", detalle: "Solo se dibuja lo que queda entre los dos planos.", dur: 5.5 },
      { nombre: "Cámara ortográfica", detalle: "Sin perspectiva: lo lejano no encoge. Estrategia, puzles, 2,5D.", dur: 5.5 },
    ],
  },
  seguimiento: {
    etiqueta: "El mismo personaje visto con cuatro cámaras de juego",
    pasos: [
      { nombre: "Cámara fija", detalle: "No se mueve. Aventuras gráficas, salas, puzles.", dur: 5 },
      { nombre: "Tercera persona", detalle: "Detrás del personaje, siguiéndolo con un pequeño retardo.", dur: 5 },
      { nombre: "Primera persona", detalle: "La cámara va en los ojos: ves lo que ve el personaje.", dur: 5 },
      { nombre: "Cenital", detalle: "Desde arriba. Carreras, estrategia, arenas.", dur: 5 },
    ],
  },

  // ── Rendimiento ───────────────────────────────────────────────────────────
  lod: {
    etiqueta: "Un objeto se aleja y cambia a versiones con menos triángulos; en el recuadro, la malla que se dibuja",
    pasos: [
      { nombre: "Cerca", detalle: "La malla completa: aquí sí se aprecia el detalle.", dur: 4.5 },
      { nombre: "A media distancia", detalle: "Una versión intermedia. No notas el cambio.", dur: 4.5 },
      { nombre: "Lejos", detalle: "Unas decenas de triángulos: ocupa cuatro píxeles.", dur: 4.5 },
    ],
  },
  instancias: {
    etiqueta: "Un bosque de 900 árboles dibujado de dos maneras",
    pasos: [
      { nombre: "900 mallas sueltas", detalle: "Una llamada de dibujo por árbol. La CPU no da abasto.", dur: 6 },
      { nombre: "Una malla instanciada", detalle: "El mismo bosque en una sola llamada: se manda la malla una vez y 900 posiciones.", dur: 6 },
    ],
  },

  // ── Animación ─────────────────────────────────────────────────────────────
  esqueleto: {
    etiqueta: "Un robot con su esqueleto a la vista",
    pasos: [
      { nombre: "La malla", detalle: "Sin esqueleto es una estatua: una malla rígida.", dur: 3.5 },
      { nombre: "Los huesos", detalle: "Por dentro lleva una jerarquía de huesos, como el grafo de escena.", dur: 4.5 },
      { nombre: "Un hueso tira", detalle: "Al girar el hombro se mueven los vértices pegados a él y sus hijos.", dur: 5 },
      { nombre: "Un clip", detalle: "Una animación guarda el giro de cada hueso en cada instante.", dur: 6 },
    ],
  },
  clips: {
    etiqueta: "El robot pasa de una animación a otra",
    pasos: [
      { nombre: "Clip Idle", detalle: "Parado, respirando. El estado de reposo.", dur: 4 },
      { nombre: "Clip Walking", detalle: "Andar: un ciclo corto que se repite.", dur: 4 },
      { nombre: "Clip Running", detalle: "Correr: otro ciclo, otro ritmo.", dur: 4 },
      { nombre: "Mezcla", detalle: "Entre dos clips no se corta: se funde uno con otro medio segundo.", dur: 6 },
      { nombre: "Clip Jump", detalle: "Una acción de una sola vez que vuelve al reposo.", dur: 4 },
    ],
  },

  // ── Físicas ───────────────────────────────────────────────────────────────
  cuerpos: {
    etiqueta: "Un suelo, unas cajas que caen y una plataforma que las empuja",
    pasos: [
      { nombre: "Estático", detalle: "El suelo y las paredes: chocan, pero no se mueven nunca.", dur: 4 },
      { nombre: "Dinámico", detalle: "Las cajas: las mueven la gravedad y los golpes, no tu código.", dur: 6 },
      { nombre: "Cinemático", detalle: "La plataforma: la mueves tú y empuja, pero nada la empuja a ella.", dur: 7 },
    ],
  },
  colliders: {
    etiqueta: "Bolas que caen sobre un anillo de piedra con distintas formas de colisión",
    pasos: [
      { nombre: "Collider de caja", detalle: "El más barato. Las bolas rebotan en esquinas que no existen.", dur: 5.5 },
      { nombre: "Collider de esfera", detalle: "Igual de barato. Vale para lo redondo; aquí sobra por arriba.", dur: 5.5 },
      { nombre: "Envolvente convexa", detalle: "Se ajusta por fuera, pero tapa el agujero: no admite huecos.", dur: 5.5 },
      { nombre: "Malla de triángulos", detalle: "Exacta: las bolas caen por el agujero. Cara; solo para escenarios.", dur: 5.5 },
    ],
  },
  capsula: {
    etiqueta: "El robot con la cápsula que usa la física para moverlo",
    pasos: [
      { nombre: "Lo que ves", detalle: "La malla animada del personaje: miles de triángulos.", dur: 4 },
      { nombre: "Lo que choca", detalle: "Una cápsula. La física no sabe nada de brazos ni piernas.", dur: 5 },
      { nombre: "Por qué una cápsula", detalle: "Es redonda por abajo: sube escalones y no se engancha.", dur: 6 },
    ],
  },
  rebote: {
    etiqueta: "Tres bolas con distinto rebote y tres cajas con distinto rozamiento",
    pasos: [
      { nombre: "Restitución", detalle: "Cuánto rebota: 0 se queda clavada; cerca de 1, casi no pierde altura.", dur: 7 },
      { nombre: "Rozamiento", detalle: "Cuánto resbala: con poco, la caja baja la rampa; con mucho, se queda.", dur: 7 },
    ],
  },
  sensor: {
    etiqueta: "Una zona que detecta lo que entra y un rayo que mide lo que tiene delante",
    pasos: [
      { nombre: "Sensor", detalle: "Una zona que avisa cuando algo entra, sin chocar: metas, monedas, trampas.", dur: 8 },
      { nombre: "Rayo", detalle: "Una línea invisible que pregunta qué hay delante y a qué distancia.", dur: 8 },
    ],
  },

  // ── Red ───────────────────────────────────────────────────────────────────
  red: {
    etiqueta: "El mismo jugador visto en su pantalla y en la de otro",
    pasos: [
      { nombre: "En tu pantalla", detalle: "Tu personaje se mueve en cada fotograma: 60 veces por segundo.", dur: 5 },
      { nombre: "Lo que viaja", detalle: "Por la red solo sale su posición 10 veces por segundo.", dur: 5 },
      { nombre: "Sin interpolar", detalle: "Si el otro la pinta tal cual llega, tu personaje va a saltos.", dur: 5 },
      { nombre: "Interpolando", detalle: "Si la dibuja entre las dos últimas posiciones, va fluido y 100 ms tarde.", dur: 6 },
    ],
  },
} as const satisfies Record<string, GuionEscena>;

export type NombreEscena = keyof typeof ESCENAS;
