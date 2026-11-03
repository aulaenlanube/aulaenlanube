// ── Serie semanal «El curso, en vídeo» ─────────────────────────────────────
// Cada semana: añadir una entrada y, al subirlo, el id de YouTube.
// El índice (/video-semana/) pinta un bloque-tarjeta por vídeo; cada tarjeta
// enlaza a su página (/video-semana/ep01/) con el reproductor y el guion.
// Hasta el vídeo 3 se grababa a cámara con guion propio (`bloques`). Desde el 4
// el vídeo recorre la página del tutorial con voz clonada: el guion es esa
// página (`pagina`) y la ficha lleva los capítulos de YouTube (`capitulos`).

export type BloqueGuion = { h: string; dur?: string; p: string };

export type Video = {
  ep: string; // slug de la página: ep01, ep02…
  semana: string; // etiqueta del chip: «Vídeo 01»
  fecha: string;
  titulo: string;
  youtubeId: string | null; // poner el id cuando esté publicado
  resumen: string;
  bloques: BloqueGuion[]; // guion de la grabación (vacío si el guion es la página)
  puntos?: string[]; // «En este vídeo», cuando no hay guion publicado
  capitulos?: [string, string][]; // [«2:27», «Paso 1 · Activar GitHub Pages»]
  pagina?: { texto: string; href: string }; // la página del curso que se ve en el vídeo
};

export const VIDEOS: Video[] = [
  {
    ep: "ep01",
    semana: "Vídeo 01",
    fecha: "Viernes 19-09 grabación · Domingo 21-09 publicación",
    titulo: "Soy profe de DAM y este año no voy a enseñar a programar como hasta ahora",
    youtubeId: "WfTPdFcvJCc",
    resumen:
      "Presentación del cambio de método: por qué un curso de Java de 220+ vídeos deja de ser la forma de enseñar en 2026, qué haremos en el curso, y la clase aumentada (transcripción en tiempo real + JARVIS).",
    bloques: [
      {
        h: "GANCHO (primeros 20s, a cámara, sin saludo, sin intro, sin música. Directo y cortante)",
        p: "No vas a encontrar un curso de programación como este en ningún sitio. Y no es un curso para programar: es un curso para crear. No necesitas saber programar. No necesitas memorizar una sola coma. Necesitas ganas de crear: una app, una web, un negocio. Te voy a enseñar cómo se programa a partir de ahora. Y te lo enseña un profesor de una titulación oficial, en un instituto público, con 30 alumnos delante.",
      },
      {
        h: "CONTEXTO (aquí entra lo tuyo: lo del curso de Java)",
        dur: "60s",
        p: "Aclaración necesaria antes de que nadie me lo pregunte: yo tengo un curso de Java en este canal. Más de 220 vídeos, de los más completos que vas a encontrar. Y precisamente por eso, atención: este año he tomado la decisión de no enseñar así a mis alumnos de DAM. No porque esté mal, sino porque en 2026 ya no es la forma. Soy Edu, doy Programación en 1º de DAM en el IES Simarro, y estoy rediseñando la asignatura entera alrededor de una idea: programar con IA, no gracias a la IA. Los datos no dejan mucha salida: el 72% de los desarrolladores profesionales ya programa con IA a diario; el 90% del alumnado de FP Superior ya usa IA generativa para estudiar. La herramienta ya está en la industria y en las mochilas. Lo que no existe es enseñar a usarla como un profesional: dirigir, verificar, decidir. Y no es un experimento de un profe suelto: la UE aprobó este mayo unas conclusiones sobre el profesorado en la era de la IA que van en esta dirección.",
      },
      {
        h: "EL CAMBIO: de temas a proyectos",
        dur: "60-90s",
        p: "Antes: tema uno, sintaxis; tema dos, estructuras de control; tema cien, examen de memoria. Ahora: proyectos. Primero, una web personal de marca hecha fichero a fichero —HTML, CSS y JS por separado— con el chat del centro: antes de que un agente te construya una web, tienes que entender cómo funciona una web. Segundo, GitHub y Git sin memorizar comandos: commit, rama, PR, y qué significa cuando tu agente te dice «vas tres commits por detrás»; tu GitHub será la copia de seguridad y el portafolio del curso. Y a final de curso, dos piezas gordas: un proyecto final individual —cada alumno elige: CLI, app con IA, SaaS, videojuego, Android…— y un proyecto en grupo tipo startup: un producto real, publicado en un servidor, con Stripe montado, pensado para sobrevivir al curso. Un 1º de DAM con un producto que puede seguir vivo en septiembre.",
      },
      {
        h: "LA CLASE AUMENTADA (transcripción + JARVIS)",
        dur: "60-90s",
        p: "Segunda pata, igual de importante: la propia clase también está aumentada con IA. Cada sesión se transcribe en tiempo real desde el micro del aula y cada pocos minutos se genera un resumen automático. Consecuencias reales: el alumno que llega tarde abre la plataforma y en dos minutos sabe qué se ha hecho, sin preguntarme ni interrumpir; el que estaba concentrado programando y se ha despistado, lo recupera al instante; y al final del curso tiene todas las sesiones resumidas, con resúmenes semanales y mensuales encadenados: su propio material de estudio generado sin mover un dedo. Y un paso más: JARVIS, el asistente de clase. Escucha la sesión y cuando detecta un silencio de verdad —algo atascado, la clase rumiando una idea— interrumpe: «disculpad, tengo una información que puede interesaros». Un dato, un ejemplo, un aviso de error común. Con límites: intervenciones contadas, y el profesor siempre puede pedirle la palabra o silenciarlo. No sustituye al profe: es el alumno adelantado que levanta la mano con el dato correcto.",
      },
      {
        h: "SERIE SEMANAL + CTA",
        dur: "30s",
        p: "Esto es oficial: un ciclo de FP, con su currículo, haciéndolo. Y como es la primera vez que alguien lo cuenta desde dentro, voy a grabar el curso semana a semana: qué hemos hecho, qué ha salido mal, qué hemos cambiado. Sin postureo: si algo no funciona, sale también. Si enseñas programación, estás en FP o te interesa cómo se adapta de verdad la formación a la IA: suscríbete, esto no lo está contando nadie más desde dentro.",
      },
      {
        h: "DEMO WEB (~5 min, pantalla + voz en off)",
        p: "Ruta: 1) Portada del curso — el curso son los proyectos, no los temas; norma de oro: «usa todos los agentes que quieras, pero entiende lo que entregas». 2) Proyecto web personal — anatomía de la landing (cada bloque responde una pregunta del visitante) y el trío HTML/CSS/JS. 3) Sesión 1 — un prompt copiable en acción y el paso de comprobar en el navegador. 4) Opcional: la transcripción real de la última clase en la plataforma y 10s del control de JARVIS. 5) Proyectos finales — las 6 familias del individual con ejemplos reales (Calendly, PhotAI, Vampire Survivors) y la startup: roles, PRs, VPS, Stripe. Cierre de bloque: «¿Esto es 1º de DAM o una incubadora? Un poco de las dos.»",
      },
      {
        h: "CIERRE (30s, a cámara)",
        p: "El vídeo uno de una serie que durará todo el curso. Cada domingo, lo de la semana, con las webs de los alumnos de por medio si ellos quieren. Alumno de 1º DAM: la web del curso ya está arriba; iros pensando quién sois. Nos vemos el domingo que viene.",
      },
    ],
  },
  {
    ep: "ep02",
    semana: "Vídeo 02",
    fecha: "Sábado 26-09 grabación · Domingo 27-09 publicación",
    titulo: "Tu primer proyecto con IA: de una carpeta vacía a GitHub",
    youtubeId: "2L1hakuXpVk",
    resumen:
      "El primer proyecto real, creado desde cero fichero a fichero con el chat (HTML, CSS y JS por separado) y conectado a GitHub: repo, commit y push sin memorizar un solo comando. El tutorial se improvisa en pantalla; el intro va cerrado palabra por palabra.",
    bloques: [
      {
        h: "GANCHO (0:00-1:30, sin saludo, sin sintonía — carpeta vacía en pantalla. Redactado literal)",
        p: "Hoy vamos a crear un proyecto real desde cero: una web personal, fichero a fichero, sin escribir a mano una sola línea de código. Y no nos vamos a quedar en la carpeta: al final de este vídeo ese proyecto va a estar en GitHub, con tu nombre, público y con historial. Eso que separa a quien «hace cosas con la IA» de quien tiene un proyecto de desarrollador. Fíjate en la palabra: historial. Cualquiera te genera código hoy. Lo que casi nadie te enseña es el proceso que convierte una carpeta de ficheros sueltos en un proyecto del que puedes volver atrás, presumir y entregar. Eso es lo que vas a ver completo, desde una carpeta vacía. En unos diez minutos vas a tener algo que no existía cuando pulsaste play. Y el paso 5, el del token de GitHub, es donde la mitad de mis alumnos se atascaron la primera vez — te lo enseñaré también cuando falla. Vamos allá. [Corte al escritorio] Antes de seguir: esto es el resumen de la semana 2 del curso de programación con IA que doy a 1º de DAM en el IES Simarro. La semana pasada conté el cambio de método —por qué este año no enseño programación como toda la vida—; si no lo viste, no importa: este vídeo funciona solo. Pero si te pica, te lo dejo enlazado: youtu.be/WfTPdFcvJCc.",
      },
      {
        h: "TUTORIAL (1:30-9:00, improvisado — estos son los beats para que no falte ninguno)",
        p: "1) Carpeta vacía → pedir SOLO el HTML al chat; abrir en el navegador: ya existe, y es feo (bien: ese es el punto de partida real). «Un fichero cada vez, nunca la web entera de una». 2) style.css a petición aparte: antes/después en pantalla; «separados entiendes el edificio». 3) script.js con una interacción mínima: tercer prompt, tercer fichero. 4) La norma de oro a pantalla: «usa todos los agentes que quieras, pero entiende cada línea que entregas» — pedir al agente que explique lo que acaba de escribir. 5) GitHub, el momento de la verdad: repo vacío creado en la web (público, sin README); los comandos init/add/commit/remote/push los genera el agente — lo que se explica son los 4 conceptos (repo, commit=fotografía, remote=dirección, push=tirar para arriba). El token: tal cual, incluido que solo se copia una vez; «si os atascais aquí, es la fricción normal del día uno». 6) La recompensa: repo público con tu usuario, histórico del commit, los tres ficheros dentro; «esto es lo que lleva un junior a su primera entrevista — costado una tarde». 7) Cierre del tutorial: borrar un fichero y recuperarlo viajando en el tiempo con git; loop al ep03: «la semana que viene, todo lo que tiene que ser de Git — ramas, PRs y por qué tu agente te dice «vas tres commits por detrás»».",
      },
      {
        h: "LA REVELACIÓN (9:00-9:45, a cámara, tono cercano)",
        p: "Para los que no sabíais: esto es un curso de programación con IA. Oficial —1º de DAM, ciclo de FP, con su currículo y su examen final— rediseñado entero para aprender a programar dirigiendo agentes, no repitiendo sintaxis. Lo doy en un instituto público con treinta alumnos y lo estoy grabando semana a semana: qué hemos hecho, qué ha salido mal, qué hemos cambiado. Sin postureo: si algo no funciona, sale en el vídeo.",
      },
      {
        h: "CIERRE (9:45-10:15, a cámara)",
        p: "Tu deber, si te ha servido: carpeta vacía, tres ficheros, un repo con tu nombre. En media hora lo tienes. Suscríbete si quieres ver cómo se programa en 2026 contado desde dentro de un aula pública. Vídeo nuevo el domingo.",
      },
    ],
  },
  {
    ep: "ep03",
    semana: "Vídeo 03",
    fecha: "Miércoles 07-10 publicación",
    titulo: "GitHub y APIs: subes tu web, entiendes push y pull, y le conectas datos reales",
    youtubeId: "me9YRc-2L0c",
    resumen:
      "El proyecto sube a GitHub con commits de verdad: push, pull y Visual Studio Code para trabajar sin memorizar comandos. Después, lo que pasó en clase: la rúbrica del Proyecto 1 (conectar la web con varias APIs), qué es una API y un widget del tiempo con selector de ciudades hecho con la IA del instituto, errores incluidos.",
    bloques: [],
    puntos: [
      "Retomamos donde lo dejamos: cómo ocultar tu correo en los commits.",
      "Subimos el proyecto a GitHub: qué hacen git push y git pull.",
      "Trabajar sin memorizar comandos con Visual Studio Code: un cambio, un commit, sincronizar y comprobar en GitHub qué líneas han cambiado.",
      "La rúbrica del Proyecto 1: como mínimo, conectar la web con varias APIs.",
      "Qué es una API, y un widget del tiempo con selector de ciudades hecho con la IA del instituto, con sus errores incluidos.",
    ],
    pagina: { texto: "La web del curso: Git y GitHub, errores típicos y la rúbrica del Proyecto 1", href: "/programacion-ia/sesion-02/" },
  },
  {
    ep: "ep04",
    semana: "Vídeo 04",
    fecha: "Domingo 01-11 publicación",
    titulo: "GitHub Pages: publica tu web y deja tu repo como lo revisa el profe",
    youtubeId: "yZ4eZT4dP34",
    resumen:
      "Tutorial 1 del primer proyecto: la web personal publicada con GitHub Pages y el repositorio como lo reviso cuando corrijo (commits atómicos, issues, una pull request y un README técnico). Desde este vídeo el curso cambia de formato: ya no salgo a cámara; se ve la web de cada sesión, la misma que usa el alumnado, con mi voz clonada con IA.",
    bloques: [],
    pagina: { texto: "Tutorial 1 · GitHub Pages, con todos los prompts", href: "/programacion-ia/tutoriales/github-pages/" },
    capitulos: [
      ["0:00", "Apertura"],
      ["0:11", "Lo que vas a aprender"],
      ["0:35", "Cómo funciona el curso"],
      ["1:43", "Qué suma en la rúbrica"],
      ["2:27", "Paso 1 · Activar GitHub Pages"],
      ["4:21", "Paso 2 · .nojekyll y rutas"],
      ["5:40", "Paso 3 · Lo que no se sube"],
      ["6:24", "Paso 4 · Commits atómicos"],
      ["8:12", "Paso 5 · Issues"],
      ["8:48", "Paso 6 · Ramas y PR"],
      ["9:35", "Paso 7 · README, prompts y v1"],
      ["10:21", "Cómo revisa el profe tu repo"],
      ["11:03", "Errores típicos de Pages"],
      ["11:44", "Si has subido el token"],
      ["12:28", "Plan de 4 días"],
      ["13:10", "Cierre"],
    ],
  },
  {
    ep: "ep05",
    semana: "Vídeo 05",
    fecha: "Lunes 02-11 publicación",
    titulo: "Tu web cobra vida: conecta una API sin escribir código",
    youtubeId: "p919S-4siww",
    resumen:
      "Tutorial 2 del primer proyecto: tu web deja de ser un cartel con un widget que pide datos reales a una API y los pinta solo. Qué es una API y qué es un JSON, más de 2.000 APIs gratis en public-apis, cómo dirigir a la IA para que escriba el widget con condiciones y cómo seguir el recorrido del dato en el F12 para explicarlo en la defensa.",
    bloques: [],
    pagina: { texto: "Tutorial 2 · API externa, con todos los prompts", href: "/programacion-ia/tutoriales/api-externa/" },
    capitulos: [
      ["0:00", "Apertura"],
      ["0:16", "Lo que vas a aprender"],
      ["0:42", "Cómo funciona el curso"],
      ["1:55", "Qué suma en la rúbrica"],
      ["2:37", "Qué es una API y qué es JSON"],
      ["4:10", "Más de 2.000 APIs gratis"],
      ["5:23", "Paso 1 · Decide qué mostrar"],
      ["6:15", "Paso 2 · Pide 3 variantes"],
      ["6:56", "Paso 3 · api.js con condiciones"],
      ["7:50", "Paso 4 · Conecta y prueba"],
      ["8:53", "Paso 5 · El recorrido en el F12"],
      ["9:50", "Pasos 6 y 7 · Commits e iteraciones"],
      ["10:33", "Errores típicos"],
      ["11:51", "Las preguntas de la defensa"],
      ["12:38", "Cierre"],
    ],
  },
];
