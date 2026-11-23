# Decisiones

Una decisión por entrada: qué se eligió, qué se descartó y por qué. Si algo de
aquí cambia, se añade una entrada nueva; no se reescribe la antigua.

## 001 · Three.js + Vite + TypeScript, sin motor ni framework (sesión 1)

- **Elegido**: Three.js a pelo, con Vite para desarrollar y compilar, y TypeScript
  estricto.
- **Descartado**: Babylon.js (más completo, pero más que aprender de golpe);
  React Three Fiber (una capa más entre el agente y el 3D); un motor como Godot
  exportado a web (deja de ser «una web» y pesa mucho más).
- **Por qué**: Three.js es lo más documentado que hay, así que el agente acierta
  más; el resultado son ficheros estáticos que caben en cualquier servidor; y
  TypeScript avisa cuando el agente se inventa una función que no existe.

## 002 · Bucle con paso fijo de 1/60 s (sesión 1)

- **Elegido**: la lógica avanza siempre en pasos de 1/60 s; el dibujo, cuando toca.
- **Descartado**: multiplicarlo todo por el `dt` real de cada fotograma.
- **Por qué**: con paso fijo el juego se comporta igual en un equipo lento y en uno
  rápido, y las físicas (sesión 4) no se vuelven locas cuando un fotograma tarda.
  En red (sesión 5) todos simulan con el mismo paso.

## 003 · El juego se sirve desde el servidor del centro (sesión 1)

- **Elegido**: publicar en el servidor del centro, en `/juegos/chispa/`, que está en
  el mismo origen que el Supabase del curso.
- **Descartado**: GitHub Pages. Funciona para el juego, pero el multijugador vive
  en la red del centro: una web pública que llama a una dirección privada tropieza
  con el certificado y con el permiso de «red local» del navegador.
- **Por qué**: mismo origen = sin CORS, sin contenido mixto y sin permisos raros.
  `base: "./"` en Vite deja el juego listo para cualquier carpeta, así que publicar
  además en GitHub Pages sigue siendo posible.

## 004 · El escenario se genera con un guion de Blender (sesión 2)

- **Elegido**: un guion de Python (`herramientas/blender/azotea.py`) que construye
  la azotea y la exporta a GLB.
- **Descartado**: modelarla a mano en Blender y guardar el `.blend`; montarla con
  primitivas de Three.js en el código del juego; comprar un escenario hecho.
- **Por qué**: el agente puede escribir y corregir un guion, pero no mover vértices
  con el ratón. Las medidas quedan a la vista y en git se ve qué cambió. Y sigue
  siendo un modelo de verdad: se puede abrir en Blender y retocar.

## 005 · El juego lee propiedades, no nombres (sesión 2)

- **Elegido**: lo que el juego necesita de cada objeto va en propiedades
  personalizadas de Blender (`colision`, `tipo`, `altura`), que llegan en `userData`.
- **Descartado**: convenios de nombre (`col_caja`, `spawn_01`).
- **Por qué**: Blender renombra solo (`caja.001`) y el exportador limpia los
  nombres. Una propiedad no se rompe al duplicar un objeto.

## 006 · Robot CC0 en lugar de un personaje de Mixamo (sesión 3)

- **Elegido**: RobotExpressive (Quaternius), CC0, que ya trae sus animaciones.
- **Descartado**: un personaje y animaciones de Mixamo.
- **Por qué**: Mixamo pide cuenta de Adobe y su licencia no deja repartir los
  modelos sueltos, y este repositorio es público. Un CC0 se puede subir, modificar
  y redistribuir sin condiciones. La forma de trabajar es la misma: un GLB con
  esqueleto y clips con nombre.

## 007 · La animación la decide el estado, no las teclas (sesión 3)

- **Elegido**: `control.animacion()` mira la velocidad y si está en el suelo, y de
  ahí sale el clip.
- **Descartado**: poner «correr» al pulsar W.
- **Por qué**: en red (sesión 5) los demás robots no tienen teclas, solo estado. Si
  la animación sale del estado, sirve igual para el jugador local, los remotos y
  los que maneja el ordenador.

## 008 · Las reglas son lógica pura (sesión 4)

- **Elegido**: `src/reglas/partida.ts` no importa three, ni Rapier, ni el DOM. Su
  estado es un objeto plano y sus funciones devuelven «jugadas».
- **Descartado**: repartir las reglas entre el código del jugador, el de la chispa
  y el del marcador.
- **Por qué**: se prueban en milisegundos sin navegador; en red (sesión 6) las
  ejecutará solo el anfitrión y el estado, al ser un objeto plano, se envía tal
  cual. Lo que se ve y lo que suena reacciona a las jugadas, no al revés.

## 009 · Los robots no chocan entre sí (sesión 4)

- **Elegido**: las cápsulas de los robots solo chocan con el escenario. El contacto
  entre robots es una regla: la embestida.
- **Descartado**: que se empujen físicamente al tocarse.
- **Por qué**: en red cada jugador ve a los demás con retraso. Dos cápsulas que
  chocan en una pantalla y no en la otra dan tirones imposibles de arreglar. Una
  regla («si le embistes a menos de 1,7 m, sale despedido») la arbitra uno solo.

## 010 · Los rivales devuelven una intención (sesión 4)

- **Elegido**: el cerebro de un rival produce lo mismo que el teclado (`Intencion`)
  y su robot usa el mismo motor que el del jugador.
- **Descartado**: moverlos directamente por coordenadas.
- **Por qué**: no pueden hacer nada que un jugador no pueda (misma velocidad,
  mismas físicas, mismo tiempo de recarga), y cualquier cambio en el movimiento
  les vale a todos.

## 011 · Cada jugador manda en su propio robot (sesión 5)

- **Elegido**: cada navegador simula su robot con sus físicas y envía dónde está.
  Los demás lo pintan.
- **Descartado**: un servidor que reciba teclas y simule a todos (lo que hacen los
  juegos comerciales).
- **Por qué**: no tenemos un servidor de juego, solo un repartidor de mensajes
  (Supabase Realtime). Así el control propio responde al instante. El precio: un
  jugador podría mentir sobre su posición. Se acepta (ver riesgos en el diseño).

## 012 · El juego y Supabase, en el mismo origen (sesión 5)

- **Elegido**: el cliente habla con `/supabase` de su propio servidor. En
  desarrollo, Vite lo reenvía.
- **Descartado**: escribir la dirección del servidor en el código.
- **Por qué**: la dirección del servidor del centro no se publica; y con el mismo
  origen no hay CORS, ni contenido mixto, ni avisos de certificado por el WebSocket.

## 013 · Cuentas anónimas (sesión 5)

- **Elegido**: `signInAnonymously()`. Cada navegador recibe un usuario real de
  Supabase sin correo ni contraseña.
- **Descartado**: registro con correo; o ninguna cuenta y un identificador
  inventado en el navegador.
- **Por qué**: hace falta un identificador que la base de datos pueda comprobar
  (`auth.uid()`) para que las políticas digan «esta fila es tuya». Un identificador
  inventado se puede falsificar; una cuenta con correo es demasiado para un juego.

## 014 · Un jugador hace de anfitrión y arbitra (sesión 6)

- **Elegido**: las reglas las ejecuta un solo navegador, el del jugador más
  antiguo de la sala. Si se va, hereda el siguiente.
- **Descartado**: que cada navegador ejecute las reglas por su cuenta (acaban
  discrepando: dos jugadores «tienen» la chispa a la vez); un servidor propio
  que arbitre (no lo tenemos; Supabase solo reparte mensajes).
- **Por qué**: con un solo árbitro no hay discusiones. El precio es fiarse de él
  y que, si su conexión va mal, la partida va mal para todos.

## 015 · Los remotos se pintan 100 ms en el pasado (sesión 6)

- **Elegido**: interpolar entre posiciones recibidas, con 100 ms de retraso.
- **Descartado**: pintar la última recibida (va a saltos); predecir hacia dónde
  irá (más fluido en línea recta, pero se equivoca en cada giro y hay que corregir).
- **Por qué**: se ve fluido con muy poco código y nunca enseña algo que no ha
  pasado. Quien arbitra usa la última posición recibida, sin retraso, y un margen
  de 1,2 m en las embestidas para compensar.

## 016 · Cada jugador apunta su propio resultado (sesión 6)

- **Elegido**: al acabar, cada navegador inserta su fila en `chispa_resultados`.
- **Descartado**: que el anfitrión inserte las de todos (la base de datos no puede
  comprobar que dice la verdad sobre los demás); una función en el servidor que
  valide (haría falta que el servidor conociera la partida).
- **Por qué**: con RLS, «esta fila es mía» sí se puede comprobar (`auth.uid()`).
  Lo que no se puede comprobar se limita con `check` y con el índice de un solo
  ganador por partida.

## 017 · El sonido se genera, no se descarga (sesión 7)

- **Elegido**: efectos y música con Web Audio (osciladores y ruido).
- **Descartado**: descargar efectos de una biblioteca libre.
- **Por qué**: cero megas, cero licencias que apuntar y se puede afinar cada
  sonido cambiando un número. Para un juego de robots, el sonido sintético encaja.

## 018 · El escenario se funde en una malla por material (sesión 7)

- **Elegido**: al cargar, las mallas quietas que comparten material se unen.
- **Descartado**: fundirlas en Blender antes de exportar (se perderían las
  propiedades de cada objeto y su collider por separado); instanciar (solo vale
  para copias idénticas, y casi nada lo es).
- **Por qué**: 117 llamadas de dibujo pasan a 13 sin tocar el modelo. Las mallas
  originales se guardan para las físicas.

## 019 · Calidad en tres niveles elegidos por el jugador (sesión 7)

- **Elegido**: alta, media y baja en el menú; cambian resolución y sombras.
- **Descartado**: ajustarla sola según los fotogramas por segundo (puede bajar la
  calidad por un tirón pasajero y no volver a subirla).
- **Por qué**: el jugador sabe qué equipo tiene. Lo que más cuesta son los píxeles
  y las sombras, así que los niveles tocan justo eso.

## 020 · Robots de piezas animados por código (ampliación 2)

- **Elegido**: los nueve robots nuevos son piezas rígidas con el origen en su
  articulación; el juego las mueve con funciones (ruedas que giran lo que el
  robot avanza, piernas con una onda…).
- **Descartado**: esqueleto y clips de animación para cada uno.
- **Por qué**: un agente puede escribir un guion que coloque cajas y cilindros,
  pero no animar a mano un esqueleto. Y la animación por código se adapta sola a
  la velocidad real, también en los robots remotos.

## 021 · Las características de un robot son datos (ampliación 2)

- **Elegido**: una tabla (`robots.ts`) que el motor lee.
- **Descartado**: una clase por robot con su propio movimiento.
- **Por qué**: equilibrar es cambiar números. Con una tabla se ven todos juntos.

## 022 · Habilidades y objetos: lo de uno, local; lo de los demás, arbitrado (ampliaciones 3 y 4)

- **Elegido**: lo que afecta a quien lo usa lo aplica su dueño; lo que afecta a
  otros o a la partida lo decide el anfitrión y viaja como jugada o en el estado.
- **Descartado**: que cada cliente aplique los efectos sobre los demás.
- **Por qué**: es la misma regla que las embestidas (decisión 014). Así no hay dos
  pantallas que discrepen sobre quién está congelado.

## 023 · Sin azar en las reglas (ampliación 4)

- **Elegido**: el objeto que sale después se elige con una cuenta.
- **Descartado**: `Math.random()`.
- **Por qué**: una prueba tiene que dar siempre lo mismo, y un anfitrión que
  hereda la partida tiene que seguir la misma secuencia.

## 024 · Un cargador de escenarios, cero código por escenario (ampliación 5)

- **Elegido**: un convenio de propiedades en Blender y un cargador único.
- **Descartado**: una clase o un fichero de código por escenario.
- **Por qué**: el sexto escenario costó cien líneas de guion y ninguna de juego.

## 025 · Lo que se mueve solo depende del reloj (ampliación 5)

- **Elegido**: plataformas, barredoras, viento y piezas que caen son funciones
  del reloj de la partida.
- **Descartado**: que el anfitrión envíe dónde está cada plataforma.
- **Por qué**: cero mensajes y cero discrepancias. Solo lo que depende de un
  jugador (un botón pisado) necesita arbitraje.

## 026 · El resplandor, solo en calidad alta (ampliación 6)

- **Elegido**: postprocesado con interruptor.
- **Descartado**: ponerlo siempre.
- **Por qué**: pinta la escena en una textura y la procesa varias veces. En un
  portátil justo, eso son los fotogramas que faltan.

## 027 · Las imágenes de la interfaz se generan con un guion (ampliación 8)

- **Elegido**: `herramientas/pixel/generar.mjs` escribe todos los PNG a partir de
  una paleta.
- **Descartado**: un kit descargado, o un modelo generador de imágenes.
- **Por qué**: coherencia garantizada (una paleta, una regla de luz), 6 kB en
  total, sin licencias de terceros y repetible: cambiar un color son diez
  segundos. Un generador de imágenes no respeta la rejilla de píxeles ni repite
  la misma paleta de una imagen a otra.

## 028 · Dos tipografías, cada una para lo suyo (ampliación 8)

- **Elegido**: Pixelify Sans para frases; Press Start 2P para cifras y títulos,
  solo a 8, 16, 24 o 32 px.
- **Descartado**: Press Start 2P para todo.
- **Por qué**: en frases largas cansa y ocupa el doble, y fuera de su rejilla de
  8 píxeles los acentos se emborronan.

## 029 · La interfaz sigue siendo HTML y CSS (ampliación 8)

- **Elegido**: HTML encima del lienzo, con `border-image` y hojas de iconos.
- **Descartado**: pintar la interfaz dentro de WebGL.
- **Por qué**: texto nítido, accesible (lectores de pantalla, teclado), se
  adapta sola al tamaño de la ventana y se depura con las herramientas del
  navegador.

## 030 · El pixel art 3D es una cadena de dibujo, no modelos nuevos (ampliación 9)

- **Elegido**: pintar a 360 líneas, contornos por profundidad y tramado, sobre
  los mismos modelos.
- **Descartado**: rehacer escenarios y robots con vóxeles o con texturas
  pintadas a mano.
- **Por qué**: vale para todo lo que hay y para todo lo que venga, se quita con
  una tecla (se puede comparar) y además abarata el dibujo.

## 031 · Texturas proyectadas en metros, sin UV (ampliación 9)

- **Elegido**: proyección triplanar con 16 téxeles por metro.
- **Descartado**: desplegar UV de cada objeto en Blender.
- **Por qué**: en pixel art todos los píxeles miden lo mismo. Con UV, cada
  objeto tendría su densidad y habría que cuidarla a mano en cientos de piezas.

## 032 · Los nombres de los robots no se pixelan (ampliación 9)

- **Elegido**: una pasada aparte, a resolución completa y sin tapar por paredes.
- **Descartado**: dejarlos dentro de la imagen de 360 líneas.
- **Por qué**: un nombre de 12 letras en 15 píxeles de alto no se lee. Lo que es
  información va nítido, como el HUD.


## 040 · Tres familias de objetos que se distinguen sin leer (ampliación 10)

- **Elegido**: ventajas, trampas y armas, cada familia con su marca en el suelo
  (aro, triángulo, cuadrado), su gama de color y su manera de moverse. Las
  trampas están a la vista; lo incierto va en una caja «?» aparte.
- **Descartado**: que todo fueran cajas sorpresa (coger un objeto sería una
  lotería: no hay nada que decidir); trampas con el mismo aspecto que las
  ventajas (castigan sin que el jugador haya podido hacer nada).
- **Por qué**: un objeto malo solo es divertido si se puede ver venir. A 360
  líneas no se lee un rótulo, pero sí una forma y un color.

## 041 · Los objetos salen de una baraja, y la baraja sale de una tabla (ampliación 10)

- **Elegido**: cada clase tiene `veces` cartas en una baraja de 40 que se roba
  por orden. Quien arbitra elige por dónde se corta al empezar la partida.
- **Descartado**: azar con pesos (`Math.random`); la cuenta de la ampliación 4
  (`(salidos × 3 + punto) % 7`), que no admitía que un objeto saliera más que otro.
- **Por qué**: la frecuencia pasa a ser un dato que se puede leer y probar, se
  mantiene la decisión 023 (sin azar en las reglas) y quien hereda el arbitraje
  sigue robando por donde iba el anterior. El azar que hace falta, que no todas
  las partidas empiecen igual, entra como un parámetro.

## 042 · Los efectos nuevos viven en el estado, no en el motor del robot (ampliación 10)

- **Elegido**: cada efecto es «robot → segundos» en el estado de la partida; el
  motor lo consulta en cada paso (lento, mareado, parado).
- **Descartado**: que el motor lleve su propia cuenta, como hacía con el turbo y
  el doble salto (que se quedan como estaban).
- **Por qué**: en el estado lo ven todas las pantallas, sobrevive a un cambio de
  anfitrión y pasarle una trampa a otro es mover un número en un solo sitio. Lo
  paga quien no arbitra: nota el efecto hasta 200 ms tarde.

## 043 · Las trampas se pasan embistiendo (ampliación 10)

- **Elegido**: quien lleva lastre, mareo o encogido y embiste a otro, se lo pasa
  con todos sus segundos.
- **Descartado**: que solo perjudiquen a quien las coge (nadie las cogería:
  serían decorado); objetos que se «lanzan» para endosarlos (otra tecla más).
- **Por qué**: convierte un error en una jugada y usa lo que el jugador ya sabe
  hacer. Y hay quien las coge adrede con la embestida lista.

## 044 · Las armas se guardan, y disparar es una petición (ampliación 10)

- **Elegido**: el objeto se guarda (una como mucho) y se dispara con otra tecla.
  Quien dispara envía «disparo hacia allí» (mensaje `d`) y el anfitrión decide.
- **Descartado**: que el arma actúe al cogerla (no se apunta ni se elige el
  momento); que cada cliente simule sus disparos y avise de a quién ha dado.
- **Por qué**: es la regla de las embestidas (decisión 014). Un solo mensaje
  nuevo; qué arma lleva cada uno y lo que hay volando viajan en el estado.

## 045 · Proyectiles sin físicas; las paredes entran como un dato (ampliación 10)

- **Elegido**: un proyectil es posición, velocidad y tiempo dentro del estado.
  Al disparar, el anfitrión mide con un rayo de físicas cuánto hay libre delante
  y se lo pasa a las reglas.
- **Descartado**: cuerpos de Rapier para los proyectiles (las reglas dejarían de
  ser puras y de poder probarse sin navegador); enviar su posición por la red.
- **Por qué**: con movimiento determinista, quien no arbitra los mueve por su
  cuenta y los ve suaves sin recibir nada. Límite aceptado: lo que se cruce
  después del disparo (una plataforma móvil) no lo para.

## 046 · Ningún arma roba la chispa (ampliación 10)

- **Elegido**: el rayo hace que la chispa se caiga donde estaba su portador, que
  no puede recogerla en 1,5 s. Si nadie llega a ella en 8 s, vuelve a la base.
- **Descartado**: que el rayo se la dé a quien dispara.
- **Por qué**: la regla central es «embiste para robar». Un robo a 18 metros la
  dejaría sin sentido. La vuelta a la base cubre el caso de que se le caiga a
  alguien en el aire, sobre el vacío.

## 047 · Tus armas no te afectan, y los empujones tienen tope (ampliación 10)

- **Elegido**: ni tu mina ni tu cohete te hacen nada; martillo, gigante y
  encogido se multiplican, pero un golpe nunca empuja más de cuatro veces.
- **Descartado**: fuego amigo sobre uno mismo; multiplicar sin límite.
- **Por qué**: se explica en una frase y evita las dos frustraciones típicas:
  matarse solo y salir despedido sin poder hacer nada.

## 048 · Un objeto, una malla (ampliación 10)

- **Elegido**: las piezas de cada figura se funden en una geometría con el color
  en los vértices; un solo material para los 21 objetos, que brilla con el
  color de cada pieza.
- **Descartado**: una malla por pieza (hasta treinta en la caja sorpresa);
  texturas.
- **Por qué**: una llamada de dibujo por objeto en vez de cinco, y colores planos
  de la paleta de la interfaz, que es lo que pide el pixel art 3D (decisión 030).

## 049 · Se apunta con la cámara (ampliación 10)

- **Elegido**: el arma del jugador dispara hacia donde mira la cámara.
- **Descartado**: hacia donde mira el robot (que es hacia donde corre).
- **Por qué**: huyendo no se podría disparar a quien te persigue. Con el ratón
  ya se mira; ahora, además, se apunta.

## 050 · Una trampa que nadie coge caduca (ampliación 10)

- **Elegido**: a los 20 s sin que nadie la toque, la trampa se cambia por la
  siguiente carta de la baraja.
- **Descartado**: dejarla hasta que alguien la coja (cuanto mejor se esquivan
  las trampas, más puntos de objetos se quedan muertos); que caduquen todos los
  objetos (una ventaja siempre acaba cogiéndola alguien: no hace falta).
- **Por qué**: se vio simulando. Los rivales del ordenador esquivaban tan bien
  dos trampas que esos dos puntos no dieron nada más en toda la partida.

## 051 · Donde no hay suelo no salen objetos (integración de las ampliaciones 10 y 11)

- **Elegido**: quien arbitra apunta qué puntos de objeto se han quedado sin
  suelo (`escenario.sinSuelo`) y las reglas no ponen nada ahí.
- **Descartado**: dejar los objetos flotando sobre el vacío; o no poner puntos
  de objeto en las piezas del Ring que se caen.
- **Por qué**: salió al juntar dos trabajos hechos por separado. El Ring pasó de
  2 a 6 puntos de objeto, casi todos en piezas que se caen: sin esto, al final
  de la partida los objetos (trampas incluidas) flotaban donde ya no se puede
  llegar. La regla es pura y tiene su prueba; qué puntos tienen suelo lo mira
  la física, fuera de las reglas.


## 052 · Goma elástica con zona muerta, progresiva y con tope (ampliación 12)

- **Elegido**: tres ayudas a quienes van por detrás (la racha pesa, la ventaja
  da alas a los que persiguen, la caja sorpresa mira quién la abre). Las tres
  valen cero con el marcador apretado y rachas cortas, crecen poco a poco y
  tienen un máximo.
- **Descartado**: no hacer nada (quien se escapa gana sin que nadie pueda
  evitarlo, y los demás dejan de jugar); una ayuda fija para el último (un
  interruptor: se nota y se puede abusar de ir último); frenar al primero sin
  límite (castiga jugar bien y nadie querría ir primero).
- **Por qué**: es realimentación negativa. Cuanto más se aleja alguien, más tira
  el juego de él hacia el grupo, así que las partidas se aprietan solas. Con
  tope, quien juega mejor sigue ganando; solo tarda más y con menos ventaja.

## 053 · La racha es de quien es: se compara, no se reinicia a mano (ampliación 12)

- **Elegido**: el estado guarda de quién es la racha (`rachaDe`). En cada paso,
  si quien lleva la chispa ya no es ese, la racha empieza de cero.
- **Descartado**: poner la racha a cero en cada sitio donde la chispa cambia de
  manos (hay siete: embestida, recogerla del suelo, caída, rayo, vuelta a la
  base, imán y alguien que se va).
- **Por qué**: una regla que hay que recordar en seis sitios se olvida en el
  séptimo. Comparar vale para los que hay y para los que vengan.

## 054 · La ayuda a quien persigue viaja en el estado, ya suavizada (ampliación 12)

- **Elegido**: `acoso`, un número de 0 a 1 por robot que sube y baja como mucho
  una unidad por segundo hacia lo que le toca. Quien simula el robot solo lo lee.
- **Descartado**: calcular la ayuda al vuelo con las baterías (aparecería y
  desaparecería de golpe cada vez que la chispa cambia de manos, que es cada
  pocos segundos); suavizarla en el motor de cada robot (cada máquina tendría
  un valor distinto y se perdería al heredar el arbitraje).
- **Por qué**: es la decisión 042 otra vez. En el estado, lo ven igual todas las
  pantallas, el marcador puede enseñarlo y sobrevive a un cambio de anfitrión.

## 055 · La posición decide lo que hay DENTRO de la caja, no lo que se ve (ampliación 12)

- **Elegido**: los objetos a la vista son iguales para todos. Lo que depende de
  cómo vayas es el contenido de la caja sorpresa (armas y teletransportes para
  el descolgado, trampas para el destacado) y, cuando el grupo va descolgado,
  salen más cajas.
- **Descartado**: que el objeto cambie según quién lo coja (la decisión 040
  dice que lo que se ve es lo que hay); poner más armas a la vista (las coge
  cualquiera, también el primero).
- **Por qué**: la caja es el único objeto que ya prometía «depende». Y sigue sin
  haber azar (decisión 023): qué lista toca sale de una cuenta, el `turno`.

## 056 · El equilibrio se mide con partidas simuladas, en dos situaciones (ampliación 12)

- **Elegido**: `herramientas/medir-partidas.mjs` juega partidas enteras entre
  rivales del ordenador con el corte de la baraja fijado, antes y después del
  cambio, y cuenta cambios de manos, rachas y diferencias. Dos situaciones: el
  pelotón (siete rivales) y la fuga (dos rivales, uno un 30 % más rápido).
- **Descartado**: afinar jugando y «a ojo»; medir solo el pelotón (ahí la chispa
  ya cambia de manos cada tres segundos: no hay nadie a quien frenar).
- **Por qué**: una regla de equilibrio se juzga por lo que hace en cien
  partidas, no en la que se acaba de jugar. Y hay que medirla donde tiene que
  actuar (la fuga) y donde no debe estorbar (el pelotón).

## 057 · Los números de la presión se pueden cambiar en caliente (ampliación 12)

- **Elegido**: el juego deja el bloque `PRESION` a mano en `chispa.presion` (el
  gancho de depuración) y la herramienta de medir acepta `--ajuste`.
- **Descartado**: editar `config.ts` y volver a medir para cada valor.
- **Por qué**: probar ocho combinaciones son ocho órdenes, no ocho ediciones. Lo
  que se queda, se escribe en `config.ts`; lo demás no deja rastro.
