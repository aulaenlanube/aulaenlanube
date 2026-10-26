// Unidades de trabajo (UT) de la programación del módulo 0485 en el Curso de
// Programación con IA. Cada UT es un PROYECTO real del curso (catálogo del
// campus y plan docs/plan-curso-*.md). El «núcleo» de cada proyecto (RA/CE,
// objetivos, contenidos, rúbrica, mínimos) es común; la temporalización y las
// actividades cambian por modalidad: presencial (8 h/semana en el aula,
// línea individual + startup en grupo) y semipresencial (quincenas, 4 h de
// tutoría colectiva + 4 h de tutoría individual por semana, Orden 30/2022).

export type Modalidad = "presencial" | "semipresencial";

export type Actividad = { t: string; d: string; h: number; agr: string; prod: string };
export type Criterio = { c: string; peso: number; exc: string; ra: string };

export type Nucleo = {
  id: string;
  titulo: string;
  lema: string;
  // RA → letras de CE que se trabajan y evalúan en la UT.
  ra: Record<number, string>;
  presentacion: string;
  objetivos: string[];
  contenidos: string[];
  tecnologias: string;
  rubrica: Criterio[] | "web-marca";
  minimos: string[];
  diversidad: string[];
  transversal: string[];
};

export type UT = Nucleo & {
  n: number;
  periodo: string;
  trimestre: string;
  horas: number;
  actividades: Actividad[];
  organizacion: string;
  instrumentos: string[];
  recursos: string[];
};

// ── Núcleos comunes ────────────────────────────────────────────────────────

const WEB: Nucleo = {
  id: "web-marca",
  titulo: "Web personal de marca",
  lema: "Publicar y decidir: mi primera aplicación real, versionada y en producción",
  ra: { 1: "a, b, c, d, e, f, g, i", 2: "a, b, c, d, f, g", 3: "a, b, e, f, g", 5: "b, g, h" },
  presentacion:
    "Primer proyecto del curso y puerta de entrada al método. Cada alumno o alumna construye una landing sobre sí mismo (quién es, qué ha hecho, qué le interesa y cómo contactarle) con HTML, CSS y JavaScript, pidiendo cada fichero a un asistente de IA del centro y auditando lo que devuelve. La web se versiona con Git desde el primer día, se publica en GitHub Pages y se itera contra una rúbrica publicada de antemano. El proyecto sirve para reconocer la estructura de un programa (bloques, variables, constantes, operadores, comentarios), para utilizar objetos predefinidos del navegador (document, elementos del DOM, fetch, localStorage) con sus métodos, propiedades y constructores, y para escribir los primeros controladores de eventos de una interfaz gráfica. El producto es real: queda publicado, lo ve cualquiera y se convierte en el portfolio en el que se enlazarán los proyectos siguientes.",
  objetivos: [
    "Identificar la estructura de un proyecto web (HTML, CSS, JS) y los bloques que componen un programa en JavaScript: declaraciones, expresiones, funciones y módulos.",
    "Crear un proyecto de desarrollo desde cero en un entorno integrado (VS Code o el editor del centro) y gestionarlo con Git: commits atómicos, ramas y pull requests.",
    "Redactar una especificación de 10 líneas (problema, público, secciones, criterios de aceptación y no-objetivos) y dirigir con ella a un asistente de IA.",
    "Utilizar objetos predefinidos del lenguaje y del navegador (DOM, Date, fetch, localStorage), sus métodos, propiedades y constructores.",
    "Programar controladores de eventos para la interacción (menú móvil, modo oscuro persistente, filtros, formulario validado).",
    "Auditar el código generado: leerlo, comentarlo, detectar errores con las herramientas del navegador (consola, depurador) y corregirlos.",
    "Publicar la aplicación en producción (GitHub Pages) y defenderla con la rúbrica en la mano.",
  ],
  contenidos: [
    "Estructura y bloques fundamentales de un programa: documento HTML, hojas de estilo y scripts; módulos ES.",
    "Variables (let/const), tipos de datos primitivos, literales y constantes; operadores y expresiones; conversiones de tipo implícitas y explícitas (Number, String, coerción en comparaciones).",
    "Comentarios y documentación mínima del código; README técnico.",
    "Utilización de objetos predefinidos: document, Element, Date, URL, fetch y Response, localStorage; instanciación con new, métodos, propiedades y parámetros; métodos estáticos (Object.keys, JSON.parse, Number.isInteger).",
    "Librerías de objetos: incorporación de una librería externa (iconos, animación o formularios) y criterios para elegirla.",
    "Estructuras de selección y repetición aplicadas a la interfaz (pintar listas de proyectos, filtros, validación de formularios).",
    "Interfaces gráficas en la web y concepto de evento: addEventListener, propagación, eventos de formulario y de teclado; formatos de visualización.",
    "Prueba y depuración: consola, puntos de ruptura del navegador, modo dispositivo, auditoría Lighthouse básica.",
    "Control de versiones: repositorio, commit, rama, pull request, issues; GitHub Pages como despliegue.",
    "Especificación asistida y auditoría de código generado por IA: la orden como pliego de condiciones.",
  ],
  tecnologias: "HTML, CSS, JavaScript (ES2022), Git y GitHub, GitHub Pages, DevTools del navegador, asistente de IA del centro (chat).",
  rubrica: "web-marca",
  minimos: [
    "La web carga en producción (GitHub Pages) sin errores en la consola.",
    "El contacto funciona de verdad (formulario que envía, chatbot o, como mínimo, mailto/teléfono correctos).",
    "Se ve correctamente en el móvil (comprobado en modo dispositivo).",
    "Historial Git real: al menos 10 commits con mensajes que cuentan el proceso.",
  ],
  diversidad: [
    "Andamiaje graduado: anatomía de 6 secciones y plantillas de orden (prompt) para quien se bloquea; los cuatro tutoriales (GitHub Pages, API externa, chatbot y medios) funcionan como itinerario de ampliación para subir nivel.",
    "Suelo y techo explícitos en la rúbrica: los mínimos garantizan el producto básico; los descriptores de «Excelente» abren retos (API real, chatbot, componentes, Lighthouse 90+) para el alumnado con más ritmo.",
    "Accesibilidad del propio producto como contenido: contraste, foco, texto alternativo; el alumnado con discapacidad visual puede trabajar con lector de pantalla y lupa sin cambiar los criterios.",
    "El problema conocido del token de GitHub se resuelve con un tutorial paso a paso y apoyo entre iguales (parejas de revisión).",
  ],
  transversal: [
    "Identidad digital y marca personal responsable: qué se publica de uno mismo, privacidad y huella digital (RGPD, LOPDGDD).",
    "Propiedad intelectual: licencias de imágenes, tipografías y librerías; atribución.",
    "Accesibilidad web como derecho (igualdad de oportunidades) y criterio de calidad.",
    "PRL: ergonomía del puesto y pausas en el trabajo con pantallas.",
    "Empleabilidad: la web es el portfolio del curso y la carta de presentación ante empresas de la Formación en Empresa.",
  ],
};

const CLI: Nucleo = {
  id: "cli-tareas",
  titulo: "CLI «tareas con IA»",
  lema: "El sistema operativo como plataforma: ficheros, configuración externa, secretos y pruebas",
  ra: { 1: "c, h", 2: "b, e, f, g", 3: "a, b, c, d, e, f, h, i", 4: "a, b, c, d, e, f, i", 5: "a, b, c, d, e", 6: "g, h, i" },
  presentacion:
    "Aplicación de línea de comandos que gestiona los propios ficheros del alumnado con acciones predefinidas (ordenar descargas por tipo, renombrar fotos por fecha, resumir documentos, generar el README de una carpeta) combinando operaciones del sistema operativo y modelos de IA del centro. Lo característico del diseño es que las acciones viven en un fichero de configuración externo (acciones.json) que escribe el alumno: el agente de IA implementa el motor que las interpreta y el alumno decide qué hace su herramienta. El proyecto trabaja la entrada y salida por consola con formato, el acceso a ficheros y directorios, las estructuras de control, el control de excepciones (incluidas excepciones propias), la organización en clases y módulos, las expresiones regulares y el tratamiento de documentos JSON. Cierra con pruebas automáticas, versionado semántico y un paquete instalable que usa otra persona de la clase.",
  objetivos: [
    "Utilizar la terminal con soltura: rutas, permisos, variables de entorno y PATH; instalar y ejecutar programas.",
    "Diseñar una aplicación de consola con subcomandos, ayuda y formatos de salida legibles.",
    "Leer, crear, mover, renombrar y eliminar ficheros y directorios con distintos métodos de acceso, controlando los errores.",
    "Separar la configuración del código: definir acciones en un documento JSON y validarlo antes de ejecutarlo.",
    "Organizar el código en clases y módulos (acción, motor, proveedor de IA) con visibilidad controlada.",
    "Gestionar secretos correctamente (.env y .gitignore antes del primer commit) y mantener un modo sin red.",
    "Escribir, con ayuda del agente, pruebas automáticas que el alumno audita (casos feos: fichero inexistente, carpeta vacía, JSON mal formado) y publicar una versión 1.0 instalable.",
  ],
  contenidos: [
    "Entornos de desarrollo y ejecución: intérprete, entorno virtual, gestor de paquetes; estructura de un paquete instalable.",
    "Entrada desde teclado y argumentos de línea de órdenes; salida a pantalla con formatos de visualización (tablas, colores, códigos de salida).",
    "Flujos de bytes y de caracteres; apertura, lectura, escritura y cierre de ficheros; modos de acceso; recorrido del sistema de ficheros; creación y eliminación de ficheros y directorios.",
    "Estructuras de selección, repetición y salto aplicadas al recorrido de directorios.",
    "Control de excepciones: captura, propagación y creación de excepciones propias (AccionNoValida, ConfigError); aserciones durante el desarrollo.",
    "Desarrollo de clases: Accion, Motor, ProveedorIA; constructores, propiedades, métodos, visibilidad y métodos estáticos (fábricas desde la configuración).",
    "Documentos de intercambio de datos: lectura, validación y manipulación de JSON; expresiones regulares para patrones de nombres de fichero y fechas.",
    "Secretos y configuración: variables de entorno, ficheros .env, .gitignore; consumo de un modelo de IA por HTTP con degradación elegante.",
    "Prueba, depuración y documentación: pytest, depurador del IDE, README de instalación, changelog y versionado semántico; GitHub Releases.",
    "ADR (registro de decisiones de arquitectura): por qué configuración externa y no código.",
  ],
  tecnologias: "Python 3 con Typer, pytest, ficheros .env, JSON, Git/GitHub (Actions y Releases), modelos de IA locales del centro (endpoint del aula), agente de código del centro.",
  rubrica: [
    { c: "Acciones predefinidas funcionando", peso: 20, exc: "5 o más acciones propias útiles, combinables, con salida clara y sin efectos sorpresa (simulación previa o confirmación antes de borrar).", ra: "RA5 d, e · RA3 b, e" },
    { c: "Configuración externa (acciones.json)", peso: 15, exc: "Esquema propio documentado y validado antes de ejecutar; añadir una acción no exige tocar el código; ADR que lo justifica.", ra: "RA6 h, i · RA4 i" },
    { c: "Capa IA, secretos y modo sin red", peso: 15, exc: "Al menos 2 acciones con IA útiles; ninguna clave en el historial; si no hay red, la CLI lo explica y sigue con las acciones sin IA.", ra: "RA5 c · RA3 d" },
    { c: "Robustez: excepciones y entradas feas", peso: 15, exc: "Excepciones propias con mensajes humanos; ningún traceback ante errores previsibles; aserciones en desarrollo.", ra: "RA3 d, h, i" },
    { c: "Diseño en clases y módulos", peso: 10, exc: "Responsabilidades separadas (interfaz, motor, acciones, proveedor IA), visibilidad cuidada, métodos estáticos con sentido.", ra: "RA4 a-f" },
    { c: "Pruebas y calidad", peso: 15, exc: "Pruebas automáticas que cubren el camino feliz y 3 casos feos, ejecutadas en GitHub Actions y auditadas por el alumno (sabe explicar cada aserción).", ra: "RA3 f" },
    { c: "Instalación, documentación y proceso", peso: 10, exc: "Se instala con una orden siguiendo el README; release v1.0 etiquetada con changelog; historial con ramas y PR legibles.", ra: "RA1 c · RA3 g" },
  ],
  minimos: [
    "Se instala siguiendo el README y la orden de ayuda funciona.",
    "Al menos 3 acciones propias definidas en el fichero de configuración funcionan.",
    "Ninguna clave ni secreto en el repositorio ni en su historial.",
    "Al menos 10 commits con mensajes que cuentan el proceso.",
  ],
  diversidad: [
    "La primera sesión de terminal es 100 % guiada con la plantilla del profesor probada la semana anterior en los equipos del aula: la mitad del grupo no ha usado nunca la terminal.",
    "Catálogo de acciones de dificultad creciente (renombrar < ordenar < resumir con IA < acciones encadenadas) para que cada alumno elija su techo sin bajar el suelo.",
    "Modo sin IA garantizado: quien tenga problemas de red o de equipo en casa puede completar todos los mínimos sin depender del modelo.",
    "Parejas de instalación cruzada en el día de release: el alumno con más soltura acompaña, pero no teclea por el compañero.",
  ],
  transversal: [
    "Seguridad y secretos: nunca una clave personal en un repositorio; principio de mínimo privilegio con los ficheros.",
    "Protección de datos: la IA solo procesa ficheros propios y no personales de terceros; datos de prueba anónimos.",
    "Sostenibilidad digital: limpieza de ficheros duplicados, uso de modelos locales del centro frente a servicios externos.",
    "Digitalización aplicada: automatizar tareas repetitivas de una oficina o un pequeño negocio.",
  ],
};

const JUEGO: Nucleo = {
  id: "videojuego",
  titulo: "Videojuego web 2D",
  lema: "Estados, jerarquías de clases y pulido: la parte de producto que más se nota",
  ra: { 2: "c, d, h", 3: "a, b, e, f", 4: "b, c, d, e, g", 5: "f, g, h", 6: "a, c, d", 7: "a, c, d, e, f, g, j" },
  presentacion:
    "Juego web 2D pequeño y pulido (una pantalla, alcance deliberadamente reducido), publicado en GitHub Pages y jugable por cualquiera. Se parte de un documento de diseño de una página (GDD) y de la máquina de estados del juego (menú, partida, pausa, fin), se modelan las entidades como una jerarquía de clases (Entidad, Jugador, Enemigo, Proyectil, PowerUp) y se decide con argumentos cuándo heredar y cuándo componer. El bucle de juego obliga a trabajar matrices y listas dinámicas de objetos, iteradores, eventos de teclado y ratón y una interfaz gráfica que muestra el estado. Los recursos gráficos se generan con IA y se curan a mano. El proyecto termina con un playtest cruzado registrado en issues, un torneo en clase y un postmortem de media página.",
  objetivos: [
    "Especificar un juego en una página: mecánica principal, condición de victoria y derrota, controles y alcance.",
    "Modelar el estado del juego con una máquina de estados y representarlo en una interfaz gráfica.",
    "Diseñar y aplicar una jerarquía de clases con superclases, subclases y sobrescritura de métodos (actualizar, dibujar, colisionar).",
    "Evaluar cuándo usar herencia y cuándo composición (componentes de movimiento, vida o disparo).",
    "Utilizar matrices (mapas de casillas) y listas dinámicas de objetos, recorriéndolas con iteradores sin errores al eliminar elementos.",
    "Programar controladores de eventos de teclado, ratón y táctil.",
    "Probar y depurar la jerarquía con playtest, issues y depurador; publicar y documentar con un postmortem.",
  ],
  contenidos: [
    "Interfaces gráficas: canvas, escenas y capas; concepto de evento y controladores de entrada.",
    "Estados de una aplicación y máquina de estados finitos.",
    "Desarrollo de clases: constructores, propiedades, métodos; instanciación de muchos objetos.",
    "Utilización avanzada de clases: herencia y polimorfismo; superclases y subclases; constructores y herencia (super); sobrescritura de métodos; clases abstractas; composición de clases.",
    "Estructuras de almacenamiento: matrices bidimensionales (mapas de casillas), listas dinámicas de entidades, iteradores y eliminación segura durante el recorrido.",
    "Prueba y depuración de jerarquías de clases: depurador, trazas y playtest con registro de incidencias.",
    "Recursos gráficos y sonoros generados con IA: curación, licencias y optimización.",
    "Comunicación del producto: landing del juego, postmortem y changelog.",
  ],
  tecnologias: "JavaScript con Phaser o canvas puro (según la especificación), GitHub Pages, generadores de imagen y sonido del centro, issues de GitHub para el playtest.",
  rubrica: [
    { c: "GDD y alcance", peso: 10, exc: "GDD de una página con mecánica, controles, victoria/derrota y no-objetivos; el juego entregado respeta el alcance y lo justifica.", ra: "RA4 b" },
    { c: "Bucle de juego y estados", peso: 20, exc: "Máquina de estados completa (menú, partida, pausa, fin), puntuación, vidas y dificultad progresiva sin estados imposibles.", ra: "RA5 g, h · RA6 a, c, d" },
    { c: "Jerarquía de clases y composición", peso: 20, exc: "Jerarquía con superclase abstracta y 3+ subclases que sobrescriben comportamiento; composición donde tiene sentido, explicada en un ADR.", ra: "RA7 a, c, d, e, j · RA4 g" },
    { c: "Interacción y controles", peso: 10, exc: "Controles de teclado y táctil, respuesta inmediata y configurable; sin eventos duplicados ni fugas al cambiar de escena.", ra: "RA5 f, g" },
    { c: "Pulido («juice») y recursos curados", peso: 15, exc: "Sonido, partículas y transiciones con intención; recursos generados con IA retocados a mano y con origen documentado.", ra: "RA5 h" },
    { c: "Pruebas, playtest y corrección", peso: 10, exc: "Issues del playtest cruzado cerradas con commits que las referencian; errores de la jerarquía depurados y explicados.", ra: "RA7 f, g" },
    { c: "Proceso, publicación y postmortem", peso: 15, exc: "Build pública con landing propia, historial legible y postmortem honesto (qué funcionó, qué no, qué haría con un mes más).", ra: "RA7 h" },
  ],
  minimos: [
    "Jugable en GitHub Pages sin errores en la consola.",
    "Existe condición de victoria o de derrota y puntuación visible.",
    "Las entidades están modeladas como clases (al menos una relación de herencia).",
    "Al menos 10 commits con mensajes que cuentan el proceso y postmortem entregado.",
  ],
  diversidad: [
    "Alcance negociado: el mismo esqueleto admite un juego de una mecánica (suelo) o un juego con niveles, enemigos con IA simple y guardado de récords (techo).",
    "Plantilla mínima de Phaser probada en los equipos del aula para eliminar la fricción de arranque.",
    "Controles adaptables (teclado, ratón o táctil) y opción de modo sin parpadeos ni sonido para alumnado con sensibilidad sensorial.",
    "El playtest cruzado da a cada alumno retroalimentación concreta de varios compañeros, no solo del profesor.",
  ],
  transversal: [
    "Igualdad y representación: personajes y narrativas sin estereotipos; referentes diversos en la industria del videojuego.",
    "Salud digital: diseño ético frente a mecánicas adictivas.",
    "Propiedad intelectual y uso responsable de recursos generados con IA.",
    "Sector productivo: el videojuego como salida del perfil DAM (competencia profesional i) del título).",
  ],
};

const DATOS: Nucleo = {
  id: "app-datos",
  titulo: "Aplicación con datos: del fichero a la base de datos",
  lema: "El salto de «mi web» a «producto con usuarios»: colecciones, persistencia e integridad",
  ra: { 4: "a, b, c, d, e, f, h", 5: "d, e, g, h", 6: "b, c, e, f, g, i, j", 7: "b, i", 8: "a, b, c, d, e, f, g, h", 9: "a, b, c, d, e, f, g" },
  presentacion:
    "Aplicación de gestión de datos para un caso real elegido por cada alumno o alumna (reservas de un club, inventario de un pequeño negocio, biblioteca de la clase, control de gastos de una comunidad de vecinos). El proyecto recorre de forma deliberada el camino de la persistencia: primero colecciones en memoria con un modelo de dominio en clases, después ficheros (JSON y CSV), después una base de datos relacional con conexiones, consultas parametrizadas, transacciones e integridad, y por último la persistencia de objetos con un mapeador objeto-relacional y con una base de datos de documentos, comparando ventajas e inconvenientes en un ADR. La aplicación ofrece una interfaz (web o gráfica de escritorio) con validación de entrada y queda desplegada en el servidor del curso.",
  objetivos: [
    "Modelar un dominio con clases relacionadas (composición y asociación), con visibilidad y métodos estáticos de fábrica.",
    "Seleccionar la colección adecuada (lista, conjunto, diccionario) y procesar datos con operaciones agregadas de filtrado, reducción y recolección.",
    "Crear clases y métodos genéricos (repositorio genérico) y validar entradas con expresiones regulares.",
    "Persistir y recuperar información en ficheros de intercambio (JSON, CSV) con control de errores.",
    "Programar conexiones con una base de datos relacional y realizar altas, consultas, modificaciones y bajas manteniendo la integridad y la consistencia (claves, restricciones, transacciones).",
    "Analizar y utilizar mecanismos de persistencia de objetos (mapeador objeto-relacional y base de datos de documentos) para almacenar y recuperar objetos, incluidos tipos estructurados y colecciones.",
    "Construir una interfaz que muestre y gestione la información almacenada, con pruebas y despliegue.",
  ],
  contenidos: [
    "Desarrollo de clases: modelo de dominio, constructores, propiedades calculadas, visibilidad, métodos estáticos; conjuntos y librerías de clases.",
    "Aplicación de las estructuras de almacenamiento: estructuras estáticas y dinámicas; listas, conjuntos y diccionarios; genericidad; cadenas y expresiones regulares; operaciones agregadas (filtrado, reducción y recolección).",
    "Lectura y escritura de información: ficheros de datos y registros; documentos JSON y CSV; serialización de objetos.",
    "Gestión de bases de datos: acceso a bases de datos, estándares y características; establecimiento de conexiones; almacenamiento, recuperación, actualización y eliminación; consultas parametrizadas frente a inyección SQL; transacciones.",
    "Mantenimiento de la persistencia de los objetos: características de las bases de datos orientadas a objetos y de documentos; instalación del gestor; creación de la base de datos; mecanismos y lenguaje de consulta; recuperación, modificación y borrado; tipos de datos objeto y colección; mapeo objeto-relacional.",
    "Interfaces y eventos: formularios, validación y mensajes de error; mostrar listados, detalle y filtros.",
    "Interfaces y modificadores de herencia aplicados al diseño de repositorios intercambiables (memoria, fichero, SQL, documentos).",
    "Pruebas automáticas de la capa de datos con una base de datos de prueba; datos de prueba anónimos.",
  ],
  tecnologias: "Python (sqlite3, SQLAlchemy, FastAPI o interfaz de escritorio) o JavaScript/TypeScript (Node, Prisma) según la especificación; SQLite y PostgreSQL; base de datos de documentos (MongoDB o equivalente local); servidor del curso.",
  rubrica: [
    { c: "Modelo de dominio en clases", peso: 15, exc: "Clases con responsabilidades claras, relaciones de composición/asociación justificadas, visibilidad y validaciones en el propio modelo.", ra: "RA4 a-f, h" },
    { c: "Colecciones, genéricos y operaciones agregadas", peso: 10, exc: "Repositorio genérico reutilizable, colección adecuada a cada uso y consultas en memoria con filtrado, reducción y recolección.", ra: "RA6 b, c, e, f, j" },
    { c: "Ficheros e intercambio de datos", peso: 10, exc: "Importación y exportación JSON/CSV robustas, con validación por expresiones regulares y errores controlados.", ra: "RA5 d, e · RA6 g, i" },
    { c: "Base de datos relacional con integridad", peso: 20, exc: "CRUD completo con consultas parametrizadas, claves y restricciones, transacciones en operaciones compuestas y migraciones versionadas.", ra: "RA9 a-g" },
    { c: "Persistencia de objetos", peso: 15, exc: "La misma interfaz de repositorio funciona con ORM y con base de datos de documentos; ADR que compara ambos enfoques con datos.", ra: "RA8 a-h · RA7 i" },
    { c: "Interfaz y experiencia de uso", peso: 10, exc: "Listados, filtros y formularios con validación y mensajes humanos; la información se gestiona sin tocar la base de datos a mano.", ra: "RA5 g, h · RA9 f, g" },
    { c: "Pruebas, seguridad y proceso", peso: 20, exc: "Pruebas de la capa de datos con base de prueba, sin secretos en el repositorio, datos anónimos, despliegue reproducible e historial legible.", ra: "RA9 e · RA3 f" },
  ],
  minimos: [
    "La aplicación permite dar de alta, consultar, modificar y borrar información persistida en una base de datos.",
    "Todas las consultas a la base de datos son parametrizadas (sin concatenar entradas del usuario).",
    "Ninguna clave ni dato personal real en el repositorio; README de instalación que funciona.",
    "Al menos 15 commits con mensajes que cuentan el proceso.",
  ],
  diversidad: [
    "Dominio elegido por el alumno, conectado con su entorno (club, trabajo, familia): aumenta la motivación y el sentido.",
    "Recorrido por capas con entregables intermedios: quien no llega a la base de datos de documentos tiene evaluados los RA anteriores con evidencia propia.",
    "Base de datos de ejemplo y esquema guía para quien necesita andamiaje; reto de ampliación (búsqueda de texto completo, informes, API REST pública documentada) para quien va más rápido.",
    "Ejercicios de lectura de código y consultas antes de escribirlas, para alumnado con menos base previa.",
  ],
  transversal: [
    "Protección de datos personales desde el diseño (RGPD y LOPDGDD): minimización, datos de prueba anónimos y permisos.",
    "Seguridad: inyección SQL, gestión de credenciales y copias de seguridad.",
    "Sostenibilidad: dimensionar el servidor a la necesidad real, coste energético y económico del alojamiento.",
    "Emprendimiento y digitalización de pequeños negocios del entorno de la Costera.",
  ],
};

const FINAL: Nucleo = {
  id: "proyecto-final-individual",
  titulo: "Proyecto final individual",
  lema: "Mi proyecto, a mi altura: elegir, validar, recortar, construir, pulir y defender",
  ra: { 1: "a, b, c", 3: "e, f, g", 4: "b, e, g, i", 5: "d, h", 6: "c, e, j", 7: "e, g, h, i, j", 8: "f, g", 9: "f, g" },
  presentacion:
    "Proyecto de autor que integra todo lo aprendido y que cada alumno elige dentro de seis familias con ideas y ejemplos reales: aplicación de línea de comandos, aplicación que usa IA por API, SaaS o web con usuarios, videojuego, aplicación Android o multiplataforma y automatización o bot. El camino es el de un producto: elegir y formular («mi proyecto hace X para Y»), validar con al menos tres personas reales, recortar hasta un producto mínimo viable, construir por iteraciones con agentes de IA y commits frecuentes, pulir lo que se ve y defenderlo con una demostración y un plan de futuro. Es la evidencia final de los RA del módulo y lo primero que el alumnado enseñará en su currículum.",
  objetivos: [
    "Formular un problema real y validar la propuesta con usuarios antes de construir.",
    "Delimitar un producto mínimo viable y planificar su desarrollo por iteraciones con un tablero de issues.",
    "Diseñar una arquitectura orientada a objetos adecuada a la familia elegida (jerarquías, interfaces y composición) y documentar las decisiones en ADR.",
    "Integrar entrada y salida, colecciones y persistencia según lo exija el producto.",
    "Elaborar y ejecutar un plan de pruebas y depurar los errores encontrados.",
    "Documentar, empaquetar o publicar la aplicación y defenderla ante el grupo.",
  ],
  contenidos: [
    "Ciclo de vida de una aplicación: idea, validación, MVP, iteraciones, versión 1.0 y mantenimiento.",
    "Creación de proyectos y uso avanzado del entorno de desarrollo y de los agentes de código.",
    "Arquitectura orientada a objetos: jerarquías de clases, interfaces, composición; módulos y librerías propias.",
    "Persistencia (ficheros o bases de datos) y presentación de la información según la familia de proyecto.",
    "Plan de pruebas, depuración y refactorización; documentación técnica y de usuario.",
    "Empaquetado y distribución (paquete, build web, APK o despliegue en servidor).",
    "Comunicación profesional: README, demostración de 5 minutos, plan de futuro.",
  ],
  tecnologias: "Las de la familia elegida (Python, JavaScript/TypeScript, Kotlin o Java para Android, frameworks web), siempre con Git/GitHub, agentes de código del centro y despliegue o empaquetado real.",
  rubrica: [
    { c: "Problema, validación y alcance", peso: 10, exc: "Frase de producto clara, validación con 3+ personas documentada y MVP recortado con criterio (no-objetivos explícitos).", ra: "RA1 b" },
    { c: "MVP funcionando", peso: 20, exc: "El valor principal funciona de principio a fin en producción o instalado, sin pasos ocultos.", ra: "RA3 e · RA5 h" },
    { c: "Arquitectura y calidad orientada a objetos", peso: 20, exc: "Jerarquías e interfaces bien elegidas, composición justificada, módulos cohesionados y ADR que explican 2+ decisiones.", ra: "RA4 b, e, g, i · RA7 e, g, i, j" },
    { c: "Datos y persistencia", peso: 10, exc: "La información se conserva entre ejecuciones con el mecanismo adecuado y se gestiona desde la aplicación.", ra: "RA5 d · RA6 c, e, j · RA8 f, g · RA9 f, g" },
    { c: "Pruebas y robustez", peso: 15, exc: "Plan de pruebas ejecutado, automatizado donde tiene sentido, errores depurados y documentados.", ra: "RA3 f · RA7 h" },
    { c: "Documentación y comunicación", peso: 10, exc: "README que se sostiene solo, documentación de usuario, changelog y comentarios útiles.", ra: "RA3 g · RA1 a" },
    { c: "Defensa", peso: 15, exc: "Demo fluida de 5 minutos, respuestas razonadas sobre las decisiones y sobre lo que hizo la IA, y plan de futuro realista.", ra: "RA1 c" },
  ],
  minimos: [
    "Validación con al menos 3 personas documentada en el repositorio.",
    "MVP publicado o instalable siguiendo el README.",
    "Al menos 20 commits repartidos durante el periodo del proyecto.",
    "Presentación o defensa realizada.",
  ],
  diversidad: [
    "Seis familias de dificultad declarada (de baja-media a alta) para que cada alumno elija un reto a su altura con acompañamiento para no infra- ni sobredimensionarlo.",
    "Alcance negociado individualmente: el MVP es el suelo común; las funciones adicionales, el techo de cada uno.",
    "Tutorías individuales de seguimiento quincenal con revisión del tablero de issues.",
    "Posibilidad de proyecto vinculado al entorno del alumno (trabajo, deporte, asociación), especialmente relevante para alumnado adulto o trabajador.",
  ],
  transversal: [
    "Emprendimiento e iniciativa (vinculación con Itinerario Personal para la Empleabilidad I).",
    "ODS 8 y 9: productos digitales útiles para el entorno productivo y social.",
    "Ética de la IA: transparencia sobre lo que hizo la IA y sobre los datos que procesa el producto.",
    "Sostenibilidad y accesibilidad como requisitos no funcionales del producto.",
  ],
};

const STARTUP: Nucleo = {
  id: "startup",
  titulo: "Startup en grupo",
  lema: "Un producto real, con usuarios de fuera y modelo de ingresos, construido en equipo todo el curso",
  ra: { 1: "b, c", 2: "c, d, g", 3: "e, f", 4: "b, e, g, i", 5: "g, h", 6: "c, e, i, j", 7: "e, i, j", 8: "e, f, g, h", 9: "a, b, c, d, e, f, g" },
  presentacion:
    "Proyecto transversal de todo el curso, exclusivo del grupo presencial, en equipos de 4 o 5 personas formados en el campus (15 de octubre). Cada equipo construye un producto real que en junio debe estar publicado en internet (servidor propio, dominio, HTTPS y base de datos), con usuarios reales de fuera del aula (aunque sean diez) y con pagos configurados en Stripe (modo de prueba; cobros reales solo con una persona mayor de edad responsable). El modelo de ingresos es obligatorio desde el primer día, también si la idea es altruista: como mínimo debe cubrir el mantenimiento. Los equipos trabajan con roles de startup (dirección técnica, producto, calidad, datos e IA, diseño y contenido), sprints de una a dos semanas, issues con responsable y revisor, ramas y pull requests obligatorias revisadas por otra persona del equipo. La calificación es individual dentro del grupo: cuenta lo que cada persona aporta, revisa y sabe defender.",
  objetivos: [
    "Detectar un problema real con una persona concreta que lo sufre y formular una propuesta de valor que alguien pagaría.",
    "Diseñar y defender un modelo de ingresos numérico (coste mensual de mantenimiento, quién paga, cuánto y cuántos clientes se necesitan).",
    "Elegir y documentar la arquitectura según el tipo de producto (juego, SaaS de servicio, voz con confirmación humana) en docs/decisiones.md.",
    "Trabajar con un flujo profesional en equipo: issues, ramas, pull requests con revisión, integración continua y despliegue.",
    "Modelar los datos del producto y gestionarlos con integridad en una base de datos en producción.",
    "Integrar servicios externos mediante librerías y API (pagos, correo, IA) gestionando secretos y errores.",
    "Lanzar el producto a usuarios reales, medir su uso y presentarlo en un demo-day con invitado externo.",
  ],
  contenidos: [
    "Del problema al producto: entrevistas, cuatro filtros (dolor real, alguien paga, cabe en un MVP de 6 semanas, legal y cobrable), ficha de producto y pitch.",
    "Presupuesto y caja ficticia (docs/presupuesto.md): costes de desarrollo, infraestructura y mantenimiento; auditoría con IA como director financiero.",
    "Arquitectura ligera por tipo de producto y registro de decisiones (ADR).",
    "Trabajo en equipo con Git: organización de GitHub, issues etiquetadas por sprint, ramas, pull requests, revisión de código, protección de la rama principal y Actions.",
    "Desarrollo orientado a objetos en un proyecto compartido: módulos, interfaces entre componentes, librerías de clases y convenciones del equipo.",
    "Persistencia en producción: modelo de datos, migraciones, conexiones, transacciones, integridad y copias de seguridad; persistencia de objetos mediante ORM o base de datos de documentos.",
    "Integración de librerías y servicios externos: pagos con Stripe (checkout y webhooks en modo de prueba), correo, modelos de IA; manejo de errores y secretos.",
    "Despliegue: servidor virtual, dominio, HTTPS, variables de entorno, monitorización básica.",
    "Calidad: pruebas automáticas, revisión cruzada, gestión de incidencias de usuarios reales.",
    "Comunicación: mini-demos de sprint, pitch, demo-day y defensa individual.",
  ],
  tecnologias: "Stack elegido por cada equipo y justificado en un ADR (habitualmente framework web full-stack en JavaScript/TypeScript o Python), base de datos relacional en servidor, Stripe (modo de prueba), GitHub (organización, Projects, Actions), servidor virtual del curso con dominio y HTTPS, agentes de código del centro.",
  rubrica: [
    { c: "Producto publicado y usado", peso: 15, exc: "En producción con dominio y HTTPS, usuarios reales externos que lo usan de forma recurrente y métricas de uso.", ra: "RA5 h · RA9 f, g" },
    { c: "Modelo de ingresos con números", peso: 10, exc: "Coste de mantenimiento calculado, precio validado con clientes potenciales y Stripe funcionando en modo de prueba de extremo a extremo.", ra: "RA2 g" },
    { c: "Contribución técnica individual", peso: 25, exc: "Pull requests propias significativas en varias capas (modelo, datos, interfaz), con commits atómicos y descripción clara.", ra: "RA4 b, e, g, i · RA7 e, i, j · RA6 c, e, j" },
    { c: "Calidad y revisión", peso: 15, exc: "Revisa PR de compañeros con comentarios útiles, escribe pruebas, cierra incidencias reportadas por usuarios.", ra: "RA3 e, f" },
    { c: "Datos y persistencia en producción", peso: 15, exc: "Modelo de datos con integridad, migraciones versionadas, transacciones y copia de seguridad probada.", ra: "RA8 e-h · RA9 a-e" },
    { c: "Defensa individual", peso: 10, exc: "Explica con soltura su parte y cómo encaja en el conjunto; responde a preguntas sobre cualquier fichero que lleve su firma.", ra: "RA1 c" },
    { c: "Honestidad sobre el uso de la IA y cuaderno de decisiones", peso: 10, exc: "Cuaderno de decisiones vivo (qué pidió, qué devolvió la IA, qué cambió y por qué) y órdenes clave archivadas en el repositorio.", ra: "RA3 g" },
  ],
  minimos: [
    "Ficha de producto con modelo de ingresos numérico (sin modelo de ingresos el proyecto no se considera terminado).",
    "Producto accesible en internet al final de curso con base de datos en producción.",
    "Cada persona tiene pull requests propias fusionadas en la rama principal en cada fase y ha revisado PR de otras personas.",
    "Defensa individual realizada en cada revisión de fase.",
  ],
  diversidad: [
    "Roles de startup asignados según perfil e intereses (técnico, producto, calidad, datos, diseño), con rotación de revisión para que todos toquen código.",
    "Tareas verticales pequeñas con responsable y revisor: permiten aportar valor desde el primer sprint a todos los niveles.",
    "Equipos heterogéneos formados con criterio (perfiles distintos, misma ambición) y reasignación por el profesor del alumnado sin equipo.",
    "Nota individual dentro del grupo basada en evidencias (PR, revisiones, issues): evita que el trabajo de unos oculte la falta de trabajo de otros y protege a quien trabaja.",
    "Cobros reales solo con una persona mayor de edad responsable; el alumnado menor de edad trabaja en modo de prueba sin ninguna desventaja en la calificación.",
  ],
  transversal: [
    "Emprendimiento: creación de una empresa simulada con números reales (vinculación con IPE I y con el Programa de Excelencia del centro).",
    "Trabajo en equipo, comunicación y resolución de conflictos (competencias t), u) del título).",
    "Igualdad: equipos mixtos, roles técnicos repartidos sin estereotipos.",
    "Legalidad y ética: aviso legal, política de privacidad, RGPD, condiciones de Stripe; ninguna idea que no sea legal y cobrable.",
    "Sostenibilidad: costes y huella de la infraestructura; ODS 8, 9 y 12.",
  ],
};

// ── Presencial: 266 h · 8 h/semana ───────────────────────────────────────
// 1.ª ev.: UT1 (8 h/sem) hasta el 16 oct; desde el 19 oct, 4 h/sem para la
// línea individual (UT2, UT3) y 4 h/sem para la startup (UT6).

const INST_PRES = [
  "Rúbrica del proyecto publicada en el campus antes de empezar (autoevaluación, coevaluación en parejas y heteroevaluación).",
  "Repositorio con historial real: commits, ramas, issues y pull requests (evidencia del proceso).",
  "Cuaderno de decisiones: qué se pidió a la IA, qué devolvió, qué se cambió y por qué.",
  "Defensa oral con la rúbrica en la mano y preguntas sobre cualquier fichero del repositorio.",
  "Observación sistemática en el aula-taller (registro de seguimiento del profesor).",
];

const PRESENCIAL: UT[] = [
  {
    ...WEB,
    n: 1,
    periodo: "14 de septiembre – 16 de octubre de 2026 (entrega hasta el 23 de octubre)",
    trimestre: "1.ª evaluación",
    horas: 38,
    organizacion:
      "Se dedica a esta unidad la totalidad de las 8 horas semanales del módulo hasta el inicio de la startup. Cada semana sigue la plantilla fija del curso: arranque de 2 minutos (resumen de la semana y especificación asistida), trabajo con el asistente del centro mientras el profesor audita decisiones (no código) puesto por puesto, y cierre con demostración y fusión en la rama principal. La serie «El curso, en vídeo» documenta cada semana.",
    actividades: [
      { t: "El cambio de método", d: "Por qué este curso no memoriza sintaxis: el alumno especifica, dirige, audita y entrega. Creación de cuentas de GitHub, perfil profesional y primer encargo dirigido a la IA. Evaluación inicial del grupo.", h: 6, agr: "Gran grupo e individual", prod: "Cuenta y repositorio vacío; cuestionario inicial" },
      { t: "Crear la web sin escribir código (sesión 1)", d: "Anatomía de una web de marca en 6 secciones; especificación de 10 líneas; construcción fichero a fichero con el chat del centro, leyendo y comentando cada fichero recibido.", h: 8, agr: "Individual", prod: "Web v1 en local" },
      { t: "Git de verdad (sesión 2)", d: "Token, clonado, commits atómicos, ramas para funcionalidades y publicación en GitHub Pages; diagrama interactivo del flujo.", h: 6, agr: "Individual con apoyo entre iguales", prod: "Web v1 publicada con historial" },
      { t: "La rúbrica por dentro (sesión 3)", d: "Qué pide cada criterio y cómo se ve el nivel Excelente; autoauditoría de la propia web y plan de la versión 2. Publicación de los 4 tutoriales para subir nivel.", h: 4, agr: "Individual y parejas", prod: "Autoauditoría (notas.txt) y plan de v2" },
      { t: "Iteración dirigida y revisión cruzada", d: "Cada alumno ataca su criterio peor puntuado con una orden de iteración (plantilla del tutorial 1); integración de API externa, chatbot o medios; revisión cruzada de pull requests en parejas.", h: 10, agr: "Individual y parejas", prod: "Web v2 con 10+ commits y PR revisadas" },
      { t: "Release day", d: "Defensa oral de 5 minutos con la rúbrica en la mano y README técnico; calificación del proyecto.", h: 4, agr: "Individual ante el grupo", prod: "Proyecto evaluado y portfolio limpio" },
    ],
    instrumentos: INST_PRES,
    recursos: [
      "Aula-taller con un equipo por alumno, proyector y conexión estable.",
      "Chat de IA del centro (modelos locales, sin cuentas de pago).",
      "Páginas del proyecto, sesiones 1-3 y tutoriales en aulaenlanube.com/programacion-ia/.",
      "Cuentas gratuitas de GitHub y GitHub Pages; campus del curso para entregas y rúbrica.",
    ],
  },
  {
    ...CLI,
    n: 2,
    periodo: "19 de octubre – 13 de noviembre de 2026",
    trimestre: "1.ª evaluación",
    horas: 16,
    organizacion:
      "Desde el 19 de octubre el horario semanal se reparte en 4 horas de línea individual (esta unidad) y 4 horas de startup (UT6). La preparación docente se hace la semana anterior: librería probada en los equipos del aula y punto de acceso a los modelos del centro abierto al aula con límite de uso.",
    actividades: [
      { t: "Arranque y terminal", d: "Qué es una CLI y para qué la usa un desarrollador; rutas, ls, cd, mkdir, permisos y PATH; instalación de Python y andamiaje con el agente; primera orden que funciona.", h: 4, agr: "Gran grupo guiado e individual", prod: "Orden de ayuda funcional" },
      { t: "Acciones predefinidas", d: "Diseño del fichero acciones.json (lo escribe el alumno); el agente implementa el motor que las ejecuta; ADR sobre configuración externa frente a código.", h: 4, agr: "Individual", prod: "3 acciones propias funcionando y ADR" },
      { t: "La capa de IA", d: "Modelos del centro desde la terminal; .env y .gitignore antes del primer commit; acciones con IA (resumir, generar README, renombrar por contenido); modo sin red.", h: 4, agr: "Individual", prod: "Acción con IA demostrada y .gitignore auditado" },
      { t: "Calidad y release", d: "Pruebas que escribe el agente y audita el alumno (casos feos), excepciones propias, README de instalación y GitHub Release v1.0. Día de release: cada alumno instala y usa la CLI de otro.", h: 4, agr: "Individual y parejas cruzadas", prod: "Paquete instalable con etiqueta v1.0" },
    ],
    instrumentos: INST_PRES,
    recursos: ["Terminal de los equipos del aula (Linux/Windows), Python 3 y entorno virtual.", "Punto de acceso a los modelos de IA locales del centro.", "GitHub Actions para la ejecución de pruebas.", "Agente de código del centro (OpenCode)."],
  },
  {
    ...JUEGO,
    n: 3,
    periodo: "16 de noviembre – 18 de diciembre de 2026",
    trimestre: "1.ª evaluación",
    horas: 20,
    organizacion:
      "4 horas semanales de línea individual. La última semana (14-18 de diciembre) incluye el día de portfolio: los proyectos de la evaluación quedan enlazados desde la web de marca. El cierre de calificaciones de la 1.ª evaluación es el 21 de diciembre.",
    actividades: [
      { t: "Diseño en una página", d: "GDD: mecánica, máquina de estados, diversión por minuto y alcance de una pantalla; elección de Phaser o canvas según la especificación; prototipo «un cuadrado se mueve».", h: 4, agr: "Individual", prod: "GDD, repositorio y prototipo" },
      { t: "Jerarquía de entidades", d: "Superclase Entidad y subclases Jugador, Enemigo, Proyectil y PowerUp; sobrescritura de actualizar y dibujar; ADR herencia frente a composición.", h: 4, agr: "Individual", prod: "Diagrama de clases y ADR" },
      { t: "El bucle", d: "Puntuación, vidas, derrota y dificultad progresiva; listas dinámicas de entidades; playtest cruzado con feedback en issues.", h: 4, agr: "Individual y playtest en grupo", prod: "Vertical slice jugable" },
      { t: "Pulido y recursos con IA", d: "Sonido, partículas y transiciones; sprites generados con IA y curados a mano; landing del juego en GitHub Pages.", h: 4, agr: "Individual", prod: "Build pública con página propia" },
      { t: "Torneo, postmortem y portfolio", d: "Todos juegan a todos, ranking, defensa oral (por qué este bucle y no otro), postmortem de media página y enlace del juego en el portfolio.", h: 4, agr: "Gran grupo e individual", prod: "Proyecto evaluado y portfolio actualizado" },
    ],
    instrumentos: INST_PRES,
    recursos: ["Plantilla mínima de Phaser probada en los equipos del aula.", "Generadores de imagen y sonido del centro.", "GitHub Pages e issues para el playtest.", "Mandos o periféricos del aula-taller cuando se disponga de ellos."],
  },
  {
    ...DATOS,
    n: 4,
    periodo: "7 de enero – 24 de marzo de 2027",
    trimestre: "2.ª evaluación",
    horas: 40,
    organizacion:
      "4 horas semanales de línea individual durante la 2.ª evaluación (las otras 4, en la fase 2 de la startup). Fallas (16-19 de marzo) ya descontadas. La elección concreta del producto se vota en enero con el grupo a partir del balance de la 1.ª evaluación.",
    actividades: [
      { t: "Arranque y modelo de dominio", d: "Especificación del caso, entidades y relaciones, diagrama de clases y criterios de aceptación.", h: 4, agr: "Individual", prod: "Spec y diagrama de clases" },
      { t: "Colecciones y genéricos", d: "Repositorio genérico en memoria; elección de lista, conjunto o diccionario; operaciones agregadas; validación con expresiones regulares.", h: 6, agr: "Individual", prod: "Modelo funcionando con pruebas" },
      { t: "Persistencia en ficheros", d: "Exportar e importar JSON y CSV; serialización; errores de formato controlados.", h: 6, agr: "Individual", prod: "Importación y exportación robustas" },
      { t: "Base de datos relacional", d: "Conexión, CRUD con consultas parametrizadas, claves y restricciones, transacciones, migraciones; demostración de inyección SQL y su prevención.", h: 10, agr: "Individual y parejas de revisión", prod: "Repositorio SQL con pruebas" },
      { t: "Persistencia de objetos", d: "Mapeador objeto-relacional y base de datos de documentos detrás de la misma interfaz de repositorio; ADR comparativo.", h: 6, agr: "Individual", prod: "Dos implementaciones intercambiables y ADR" },
      { t: "Interfaz, pruebas y release", d: "Interfaz de gestión con filtros y validación; pruebas de la capa de datos; despliegue en el servidor del curso y defensa.", h: 8, agr: "Individual", prod: "Aplicación desplegada y evaluada" },
    ],
    instrumentos: INST_PRES,
    recursos: ["Servidor del curso con base de datos relacional y de documentos.", "SQLite local para desarrollo y pruebas.", "Agente de código del centro.", "Juegos de datos anónimos preparados por el profesor."],
  },
  {
    ...FINAL,
    n: 5,
    periodo: "6 de abril – 18 de junio de 2027",
    trimestre: "3.ª evaluación",
    horas: 40,
    organizacion:
      "4 horas semanales de línea individual en la 3.ª evaluación (las otras 4, en la fase 3 de la startup). Pascua (25 de marzo – 5 de abril) descontada. La elección de la familia se prepara en marzo para empezar a construir desde la primera semana de abril.",
    actividades: [
      { t: "Elegir y validar", d: "Elección de familia, frase de producto y validación con al menos tres personas reales; pivotar si nadie dice sí.", h: 4, agr: "Individual", prod: "Ficha de proyecto y evidencias de validación" },
      { t: "Recortar y diseñar", d: "MVP, tablero de issues, arquitectura y ADR iniciales.", h: 4, agr: "Individual", prod: "Spec, tablero y ADR" },
      { t: "Construir por iteraciones", d: "Tres sprints con agentes, commits frecuentes y revisión quincenal con el profesor.", h: 18, agr: "Individual", prod: "MVP funcionando" },
      { t: "Calidad", d: "Plan de pruebas, depuración y refactorización.", h: 6, agr: "Individual y parejas de prueba", prod: "Informe de pruebas" },
      { t: "Pulir y publicar", d: "Nombres claros, mensajes de error humanos, README honesto, empaquetado o despliegue.", h: 4, agr: "Individual", prod: "Versión 1.0 publicada" },
      { t: "Defensa", d: "Demo de 5 minutos, preguntas sobre decisiones y plan de futuro.", h: 4, agr: "Individual ante el grupo", prod: "Proyecto evaluado" },
    ],
    instrumentos: INST_PRES,
    recursos: ["Agentes de código del centro.", "Servidor del curso o tiendas y plataformas de distribución según la familia.", "Dispositivos Android del departamento para pruebas cuando proceda."],
  },
  {
    ...STARTUP,
    n: 6,
    periodo: "19 de octubre de 2026 – 18 de junio de 2027 (todo el curso, en tres fases)",
    trimestre: "1.ª, 2.ª y 3.ª evaluación",
    horas: 112,
    organizacion:
      "4 horas semanales desde el 19 de octubre, organizadas en tres fases que coinciden con las evaluaciones: Fase 1, descubrimiento y primer sprint (36 h, 19 de octubre – 18 de diciembre); Fase 2, MVP con base de datos en producción y usuarios piloto (40 h, enero – marzo); Fase 3, lanzamiento, pagos y demo-day con invitado externo (36 h, abril – junio; demo-day entre el 17 de mayo y el 18 de junio). Las dos primeras sesiones (19 de octubre, 2 h, y 20 de octubre, 3 h) tienen página propia para el alumnado y guion docente.",
    actividades: [
      { t: "F1 · Día 0", d: "Misión, cuatro filtros, regla del dinero; taller problema → ficha con la IA como abogado del diablo; pitch de 3 minutos, ronda de inversión ficticia y decisión de pivotar o perseverar.", h: 2, agr: "Equipos", prod: "Ficha v1 (README), repositorio de la organización" },
      { t: "F1 · Caja, arquitectura y sprint 1", d: "Reparto de la caja ficticia en docs/presupuesto.md con auditoría de IA; taller de arquitectura por tipo de producto; issues con responsable y revisor, ramas y PR en parejas; mini-demos.", h: 3, agr: "Equipos", prod: "Presupuesto, decisiones y primera tarea fusionada" },
      { t: "F1 · Validación", d: "Cinco entrevistas (al menos dos con alguien que pagaría), ficha v2 y modelo de ingresos con números.", h: 5, agr: "Equipos", prod: "docs/entrevistas.md y ficha v2" },
      { t: "F1 · Sprints 1-4", d: "Sprints quincenales: autenticación, modelo de datos inicial y primera funcionalidad de valor; revisión cruzada de PR; mini-demo de cierre de sprint.", h: 22, agr: "Equipos y parejas de revisión", prod: "Incremento desplegado en cada sprint" },
      { t: "F1 · Revisión de fase", d: "Demo del equipo y defensa individual de la contribución.", h: 4, agr: "Equipos e individual", prod: "Calificación de la fase 1" },
      { t: "F2 · Infraestructura", d: "Servidor virtual, dominio, HTTPS, variables de entorno y despliegue continuo.", h: 6, agr: "Equipos", prod: "Entorno de producción" },
      { t: "F2 · Datos en producción", d: "Modelo de datos definitivo, migraciones, integridad, transacciones y copias de seguridad.", h: 6, agr: "Equipos", prod: "Base de datos en producción" },
      { t: "F2 · Sprints 5-9", d: "Construcción del MVP completo con pruebas y revisión.", h: 20, agr: "Equipos", prod: "MVP en producción" },
      { t: "F2 · Usuarios piloto", d: "Diez usuarios reales, recogida de incidencias y métricas de uso.", h: 4, agr: "Equipos", prod: "Informe de piloto" },
      { t: "F2 · Revisión de fase", d: "Demo del equipo y defensa individual.", h: 4, agr: "Equipos e individual", prod: "Calificación de la fase 2" },
      { t: "F3 · Pagos", d: "Stripe en modo de prueba: precios, checkout y webhooks; pruebas de extremo a extremo.", h: 6, agr: "Equipos", prod: "Flujo de pago verificado" },
      { t: "F3 · Sprints 10-13", d: "Mejoras guiadas por los usuarios, rendimiento y accesibilidad.", h: 18, agr: "Equipos", prod: "Versión de lanzamiento" },
      { t: "F3 · Legal, seguridad y sostenibilidad", d: "Aviso legal, privacidad, RGPD, revisión de seguridad y costes de la infraestructura.", h: 4, agr: "Equipos", prod: "Documentación legal y de seguridad" },
      { t: "F3 · Demo-day", d: "Presentación pública con invitado externo del sector.", h: 4, agr: "Equipos", prod: "Pitch y demo" },
      { t: "F3 · Defensa final y retrospectiva", d: "Defensa individual, retrospectiva del equipo y plan de continuidad del producto.", h: 4, agr: "Individual y equipos", prod: "Calificación de la fase 3" },
    ],
    instrumentos: [
      "Rúbrica de la startup aplicada en cada revisión de fase (nota individual dentro del grupo).",
      "Analítica del repositorio de la organización: PR propias, revisiones realizadas, issues cerradas, commits.",
      "Entregas de proceso en el campus (apto / no apto de proceso en la fase de descubrimiento).",
      "Coevaluación del equipo con evidencias (no por simpatía) y autoevaluación.",
      "Defensa individual con preguntas sobre ficheros con su firma.",
      "Cuaderno de decisiones del equipo y de cada persona.",
    ],
    recursos: [
      "Organización de GitHub por equipo con el profesor (cuenta aulaenlanube) como colaborador.",
      "Servidor virtual del curso, dominios y certificados.",
      "Cuenta de Stripe en modo de prueba.",
      "Herramienta de equipos del campus (formación, reasignación y seguimiento).",
      "Páginas de las sesiones de la startup y guiones docentes.",
    ],
  },
];

// ── Semipresencial: 266 h · 8 h/semana → 4 h TC + 4 h TI (Orden 30/2022) ─
// Quincenas con objetivo, recursos y entrega. Sin proyecto en grupo.

const INST_SEMI = [
  "Rúbrica del proyecto publicada en el campus antes de empezar (autoevaluación y heteroevaluación).",
  "Repositorio con historial real, revisado en la comprobación de proceso de mitad de unidad y en la entrega (cuenta lo visible en el repositorio a la fecha de cierre).",
  "Cuaderno de decisiones o README con la explicación de lo que se pidió a la IA y por qué se cambió.",
  "Presentación del proyecto con consultas variables del profesor sobre ficheros concretos (sin defensa oral formal).",
  "Participación en el foro del aula y actividades de autoaprendizaje y autoevaluación (Orden 8/2025, art. 7.2).",
  "Prueba final presencial (Orden 8/2025, art. 4.3).",
];

const SEMI: UT[] = [
  {
    ...WEB,
    n: 1,
    periodo: "14 de septiembre – 23 de octubre de 2026 (quincenas 1 y 2: 29 sep – 9 oct y 13 – 23 oct)",
    trimestre: "1.ª evaluación",
    horas: 42,
    organizacion:
      "Acogida presencial y dos quincenas. Quincena 1: web funcionando en local, sección a sección, con su repositorio público y al menos 6 commits; sin entrega, solo comprobación de proceso el 9 de octubre. Quincena 2: web pulida, publicada en GitHub Pages y probada en el móvil; entrega el 23 de octubre (URL de la web + URL del repositorio + párrafo de 3 líneas: qué decidí y qué haría distinto). Herramienta única desde casa en este proyecto: el chat de Copilot de Microsoft 365 del centro, con flujo manual chat → crear los ficheros → commits propios.",
    actividades: [
      { t: "Acogida (tutoría colectiva de presencia obligatoria)", d: "Método del curso, cuentas de GitHub, acceso al campus, uso del chat de Copilot de Microsoft 365 y normas de uso de la IA.", h: 4, agr: "Gran grupo presencial", prod: "Cuenta, campus y repositorio creados" },
      { t: "Quincena 1 · Iniciar la web", d: "Anatomía de 6 secciones, especificación de 10 líneas y construcción fichero a fichero con el chat; tutoriales T1 (GitHub) y T4 (medios); tutorías colectivas de dudas y tutorías individuales en línea.", h: 16, agr: "Individual (TC 6 h · TI 10 h)", prod: "Web en local y 6+ commits" },
      { t: "Comprobación de proceso", d: "Revisión del repositorio el 9 de octubre y retroalimentación escrita individual.", h: 2, agr: "Tutoría individual", prod: "Informe de proceso" },
      { t: "Quincena 2 · Entregar la web", d: "Lectura obligatoria de la sesión 3 (la rúbrica por dentro), tutoriales T2-T4, publicación en GitHub Pages y prueba en el móvil. Consejo de quincena: primera semana a construir, segunda a pulir y probar.", h: 16, agr: "Individual (TC 6 h · TI 10 h)", prod: "Web publicada" },
      { t: "Entrega y verificación", d: "Entrega en el aula virtual y presentación breve con consultas variables sobre ficheros concretos en la tutoría colectiva.", h: 4, agr: "Individual en tutoría colectiva", prod: "Proyecto evaluado con la rúbrica" },
    ],
    instrumentos: INST_SEMI,
    recursos: [
      "Chat de Copilot de Microsoft 365 de la Conselleria (cuenta del centro).",
      "Páginas del proyecto, sesiones 1-3 y tutoriales en aulaenlanube.com/programacion-ia/.",
      "Cuentas gratuitas de GitHub y GitHub Pages; campus del curso y foro del aula.",
      "Equipos del aula-taller en las tutorías colectivas para quien no disponga de equipo adecuado en casa.",
    ],
  },
  {
    ...CLI,
    n: 2,
    periodo: "26 de octubre – 20 de noviembre de 2026 (quincenas 3 y 4)",
    trimestre: "1.ª evaluación",
    horas: 32,
    organizacion:
      "Primera unidad con agente de programación en casa: OpenCode (open source) conectado a los modelos de IA locales del centro, desde la terminal o la de VS Code. La terminal y el agente se aprenden en la tutoría colectiva de arranque, de presencia obligatoria, porque es el único bloque del curso que exige intervención directa del profesor (Orden 30/2022, art. 27). Comprobación de proceso al final de la quincena 3 y entrega al final de la quincena 4.",
    actividades: [
      { t: "Arranque guiado (presencia obligatoria)", d: "Terminal desde cero (rutas, permisos, PATH), instalación de Python, uv y OpenCode conectado a los modelos del centro; andamiaje y orden de ayuda funcionando antes de salir del aula.", h: 4, agr: "Gran grupo presencial", prod: "Orden de ayuda funcional" },
      { t: "Quincena 3 · Acciones predefinidas", d: "Diseño de acciones.json y motor que las ejecuta; ADR sobre configuración externa; vídeo-guía y foro de dudas.", h: 12, agr: "Individual (TC 4 h · TI 8 h)", prod: "3 acciones propias y ADR" },
      { t: "Quincena 4 · IA, pruebas y release", d: "Capa de IA con .env y .gitignore, modo sin red, pruebas de casos feos, README de instalación y release v1.0.", h: 12, agr: "Individual (TC 4 h · TI 8 h)", prod: "Paquete instalable v1.0" },
      { t: "Entrega e instalación cruzada", d: "Entrega en el aula virtual; en tutoría colectiva cada alumno instala la CLI de otro siguiendo su README.", h: 4, agr: "Parejas en tutoría colectiva", prod: "Proyecto evaluado" },
    ],
    instrumentos: INST_SEMI,
    recursos: ["OpenCode (agente open source) con los modelos de IA locales del centro; VS Code como editor.", "Python 3 y terminal del equipo propio o del aula.", "Punto de acceso a modelos de IA del centro o modo sin IA.", "Vídeo-guías del profesor y foro del aula."],
  },
  {
    ...JUEGO,
    n: 3,
    periodo: "23 de noviembre – 18 de diciembre de 2026 (quincenas 5 y 6)",
    trimestre: "1.ª evaluación",
    horas: 32,
    organizacion:
      "Arranque presencial obligatorio con la plantilla del juego, quincena 5 dedicada a la jerarquía y al bucle (comprobación de proceso al cierre) y quincena 6 al pulido y la publicación. El playtest cruzado se hace en el foro: cada alumno juega a dos juegos de compañeros y deja feedback en sus issues. Cierre de calificaciones de la 1.ª evaluación el 21 de diciembre.",
    actividades: [
      { t: "Arranque (presencia obligatoria)", d: "GDD en una página, máquina de estados y plantilla Phaser funcionando en el equipo de cada alumno.", h: 4, agr: "Gran grupo presencial", prod: "GDD y prototipo" },
      { t: "Quincena 5 · Jerarquía y bucle", d: "Superclase Entidad y subclases; ADR herencia frente a composición; puntuación, vidas y dificultad.", h: 12, agr: "Individual (TC 4 h · TI 8 h)", prod: "Vertical slice jugable" },
      { t: "Quincena 6 · Pulido y playtest", d: "Recursos generados con IA y curados, sonido y partículas, playtest cruzado por el foro, landing en GitHub Pages.", h: 12, agr: "Individual y playtest en línea", prod: "Build pública" },
      { t: "Entrega, postmortem y portfolio", d: "Entrega, postmortem de media página y enlace del juego desde la web de marca; presentación con consultas variables.", h: 4, agr: "Individual en tutoría colectiva", prod: "Proyecto evaluado y portfolio" },
    ],
    instrumentos: INST_SEMI,
    recursos: ["Plantilla mínima de Phaser.", "Generadores de imagen y sonido del centro o gratuitos con licencia clara.", "GitHub Pages e issues para el playtest.", "Foro del aula."],
  },
  {
    ...DATOS,
    n: 4,
    periodo: "7 de enero – 24 de marzo de 2027 (quincenas 7 a 11)",
    trimestre: "2.ª evaluación",
    horas: 72,
    organizacion:
      "La unidad más larga del grupo semipresencial, con una comprobación de proceso por quincena: Q7 modelo y colecciones, Q8 ficheros, Q9-Q10 base de datos relacional, Q11 persistencia de objetos, interfaz y pruebas. La planificación de cada quincena se publica con dos quincenas de antelación. Fallas (16-19 de marzo) descontadas.",
    actividades: [
      { t: "Arranque (presencia obligatoria)", d: "Elección del caso, modelo de dominio y diagrama de clases revisados en el aula.", h: 4, agr: "Gran grupo presencial", prod: "Spec y diagrama de clases" },
      { t: "Quincena 7 · Colecciones y genéricos", d: "Repositorio genérico en memoria, operaciones agregadas y validación con expresiones regulares.", h: 14, agr: "Individual (TC 4 h · TI 10 h)", prod: "Modelo con pruebas" },
      { t: "Quincena 8 · Ficheros", d: "Importación y exportación JSON y CSV con errores controlados.", h: 14, agr: "Individual (TC 4 h · TI 10 h)", prod: "Persistencia en ficheros" },
      { t: "Quincenas 9 y 10 · Base de datos relacional", d: "Conexiones, CRUD con consultas parametrizadas, integridad, transacciones y migraciones.", h: 22, agr: "Individual (TC 8 h · TI 14 h)", prod: "Repositorio SQL con pruebas" },
      { t: "Quincena 11 · Objetos e interfaz", d: "ORM y base de datos de documentos detrás de la misma interfaz; ADR comparativo; interfaz de gestión y pruebas.", h: 14, agr: "Individual (TC 4 h · TI 10 h)", prod: "Aplicación completa" },
      { t: "Entrega y verificación", d: "Despliegue en el servidor del curso y presentación con consultas variables.", h: 4, agr: "Individual en tutoría colectiva", prod: "Proyecto evaluado" },
    ],
    instrumentos: INST_SEMI,
    recursos: ["Servidor del curso con base de datos relacional y de documentos.", "SQLite local para trabajar desde casa sin conexión.", "Vídeo-guías por quincena y juegos de datos anónimos.", "Asistente de código facilitado por la Conselleria."],
  },
  {
    ...FINAL,
    n: 5,
    periodo: "6 de abril – 18 de junio de 2027 (quincenas 12 a 16 y prueba final presencial)",
    trimestre: "3.ª evaluación",
    horas: 88,
    organizacion:
      "Proyecto de autor por quincenas: Q12 elegir, validar y recortar; Q13-Q15 construir por sprints quincenales con comprobación de proceso en cada cierre; Q16 calidad, documentación y publicación. La semana del 14 al 18 de junio se dedica a la presentación final y a la prueba final presencial del módulo.",
    actividades: [
      { t: "Arranque (presencia obligatoria)", d: "Las seis familias de proyecto, frase de producto y plan de validación con tres personas reales.", h: 4, agr: "Gran grupo presencial", prod: "Ficha de proyecto" },
      { t: "Quincena 12 · Validar y recortar", d: "Validación documentada, MVP, tablero de issues y ADR iniciales.", h: 14, agr: "Individual (TC 4 h · TI 10 h)", prod: "Spec, tablero y ADR" },
      { t: "Quincenas 13-15 · Construir", d: "Tres sprints quincenales con agentes y comprobación de proceso al cierre de cada uno; tutorías individuales de seguimiento.", h: 42, agr: "Individual (TC 12 h · TI 30 h)", prod: "MVP funcionando" },
      { t: "Quincena 16 · Calidad y publicación", d: "Plan de pruebas, depuración, documentación, empaquetado o despliegue.", h: 20, agr: "Individual (TC 8 h · TI 12 h)", prod: "Versión 1.0 publicada" },
      { t: "Presentación y prueba final presencial", d: "Presentación del proyecto y prueba final presencial del módulo (Orden 8/2025, art. 4.3).", h: 8, agr: "Individual presencial", prod: "Proyecto y módulo evaluados" },
    ],
    instrumentos: INST_SEMI,
    recursos: ["Asistente de código facilitado por la Conselleria y agentes del centro en el aula.", "Servidor del curso o plataformas de distribución según la familia.", "Tutorías individuales en línea con horario amplio de mañana y tarde."],
  },
];

export const UNIDADES: Record<Modalidad, UT[]> = { presencial: PRESENCIAL, semipresencial: SEMI };

// Matriz de evidencia: puntos (sobre 100 del módulo) que cada UT aporta a
// cada RA. Filas = RA (suman PESO_RA), columnas = UT (suman el peso de la UT).
export const MATRIZ: Record<Modalidad, Record<number, number[]>> = {
  presencial: {
    1: [6, 2, 0, 0, 0, 2],
    2: [5, 2, 1, 0, 0, 2],
    3: [2, 3, 3, 0, 2, 2],
    4: [0, 2, 3, 3, 3, 3],
    5: [1, 0, 2, 2, 2, 5],
    6: [0, 1, 1, 3, 2, 5],
    7: [0, 0, 1, 2, 2, 5],
    8: [0, 0, 0, 3, 1, 4],
    9: [0, 0, 0, 2, 3, 7],
  },
  semipresencial: {
    1: [6, 2, 0, 0, 2],
    2: [5, 3, 2, 0, 0],
    3: [2, 4, 3, 0, 3],
    4: [0, 3, 4, 3, 4],
    5: [2, 2, 3, 2, 3],
    6: [0, 1, 2, 4, 5],
    7: [0, 0, 1, 3, 6],
    8: [0, 0, 0, 4, 4],
    9: [0, 0, 0, 9, 3],
  },
};
