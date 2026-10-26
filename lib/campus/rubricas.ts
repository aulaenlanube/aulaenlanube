// Rúbricas del Curso de Programación con IA. Fuente única: la usan la página
// pública de la sesión 03, el panel del profesor (corrección) y las
// herramientas de tools/campus (corrección asistida por IA).
//
// OJO: este fichero lo importa Node directamente (tools/campus/*.mjs) con el
// borrado de tipos nativo, así que no puede llevar imports con alias (@/…),
// enums ni otra sintaxis de TypeScript que no sea borrable.

export type NivelRubrica = { nombre: string; pct: number };
export type CriterioRubrica = {
  id: string;
  nombre: string;
  peso: number;
  qué: string;
  /** Descriptor de cada nivel, en el mismo orden que Rubrica.niveles. */
  niveles: [string, string, string, string];
};
export type MinimoRubrica = { id: string; texto: string };
export type Rubrica = {
  id: string;
  titulo: string;
  niveles: NivelRubrica[];
  minimos: MinimoRubrica[];
  criterios: CriterioRubrica[];
};

const NIVELES: NivelRubrica[] = [
  { nombre: "Insuficiente", pct: 0 },
  { nombre: "En desarrollo", pct: 50 },
  { nombre: "Competente", pct: 80 },
  { nombre: "Excelente", pct: 100 },
];

export const RUBRICA_WEB_MARCA: Rubrica = {
  id: "web-marca",
  titulo: "Rúbrica · Web personal de marca",
  niveles: NIVELES,
  minimos: [
    { id: "produccion", texto: "La web carga en producción (GitHub Pages) sin errores en consola (F12 limpio)." },
    { id: "contacto", texto: "Un visitante puede ponerse en contacto y funciona de verdad (formulario que envía, chatbot o, al menos, mailto:/teléfono correctos)." },
    { id: "movil", texto: "Se ve bien en el móvil (probado con DevTools → modo dispositivo)." },
    { id: "git", texto: "Historial git real: mínimo 10 commits con mensajes que cuentan el proceso." },
  ],
  criterios: [
    {
      id: "contacto", nombre: "Contacto real y funcional", peso: 15,
      qué: "Que un desconocido pueda escribirte desde la web y te llegue.",
      niveles: [
        "Enlace roto, botón muerto o mail inventado.",
        "mailto: o teléfono visible y correcto, sin más.",
        "Formulario que envía de verdad (Formspree/Web3Forms/GitHub Issue) con validación y mensaje de éxito.",
        "Canal con respuesta automática: chatbot con la API del centro, auto-responder por correo, o formulario que abre un issue/PR etiquetado — y sabes explicar el recorrido del dato.",
      ],
    },
    {
      id: "contenido", nombre: "Contenido propio y densidad", peso: 15,
      qué: "Una web de marca se define por qué dice de TI, no por su plantilla.",
      niveles: [
        "Solo el texto genérico que soltó la IA en el primer prompt.",
        "1-2 secciones con algo tuyo (fotos, algún trabajo).",
        "4+ secciones coherentes: sobre mí, proyectos con contexto, servicios/habilidades, experiencia; textos revisados por ti, sin humo.",
        "Además: casos de proyecto reales con problema→solución→resultado, datos o métricas propias, y una voz reconocible (se nota quién eres sin leer el nombre).",
      ],
    },
    {
      id: "diseno", nombre: "Diseño y coherencia visual", peso: 15,
      qué: "Que parezca una marca, no una demo de plantilla.",
      niveles: [
        "Colores y tipografías aleatorias; roto en móvil.",
        "Plantilla correcta pero impersonal; responsive básico.",
        "Sistema coherente: paleta y tipografía deliberadas, espaciados regulares, responsive real en 3 anchos, modo oscuro que suma.",
        "Identidad propia defendible: logo/favicon hechos por ti, microinteracciones, consistencia en 4+ páginas, y sabes justificar cada decisión de diseño.",
      ],
    },
    {
      id: "medios", nombre: "Riqueza de medios", peso: 10,
      qué: "Imágenes, SVG, vídeo, animación: el contenido multimedia cuenta la historia.",
      niveles: [
        "Solo texto o una foto de stock.",
        "Imágenes variadas sin optimizar (peso, alt, lazy).",
        "Mezcla trabajada: fotos propias optimizadas, ≥2 SVG propios (iconos/illustraciones), vídeo embebido, animaciones CSS/JS que aportan.",
        "Todo lo anterior con criterio: SVG animados propios, vídeo propio o demo grabada, animaciones con intención (no decorativas), Lighthouse media sin avisos.",
      ],
    },
    {
      id: "interactividad", nombre: "Interactividad y funcionalidad extra", peso: 15,
      qué: "Lo que une el 'te hace una web' con el 'has construido una aplicación'.",
      niveles: [
        "Solo enlaces ancla y algún acordeón de serie.",
        "Alguna interacción cosmética (hover, carrusel).",
        "≥2 funciones reales: menú móvil propio, buscador/filtro de proyectos, formulario validado, calculadora, test, dark-mode con persistencia.",
        "Función con estado o datos: login demo con zona interna, consumo de una API externa real, chatbot operativo, o personalización según parámetros — con el código explicado en la defensa.",
      ],
    },
    {
      id: "arquitectura", nombre: "Arquitectura, calidad técnica y accesibilidad", peso: 15,
      qué: "Cómo está montado por dentro: semántica, estructura, rendimiento.",
      niveles: [
        "Un index.html gigante con estilos inline, sin carpetas.",
        "Estructura de ficheros razonable pero HTML no semántico.",
        "HTML semántico, CSS organizado (variables/tokens), JS modular, <title>/meta/OG por página, contraste y foco accesibles, alt en imágenes.",
        "Además: componentes reutilizables o templates, Lighthouse ≥90 en rendimiento/accesibilidad, y ADR o README técnico explicando 2 decisiones de arquitectura.",
      ],
    },
    {
      id: "proceso", nombre: "Proceso: git, iteración y evidencia de trabajo", peso: 15,
      qué: "El corazón del curso: el trabajo detrás, visible en el historial.",
      niveles: [
        "1-2 commits monolíticos.",
        "3-9 commits con mensajes flojos ('cambios', 'final').",
        "≥10 commits atómicos con mensajes que cuentan decisiones + ramas para las features grandes.",
        "Historial que se puede leer como un diario: issues/PR, iteraciones visibles, v1→v2 con mejoras rastreables, y las órdenes clave a la IA archivadas en el repo.",
      ],
    },
  ],
};

// Proyecto 2 (presencial y semipresencial). Criterios, pesos, mínimos y nivel
// «Excelente» tal como figuran en la programación didáctica (UT2).
export const RUBRICA_CLI: Rubrica = {
  id: "cli-tareas",
  titulo: "Rúbrica · CLI «tareas con IA»",
  niveles: NIVELES,
  minimos: [
    { id: "instalacion", texto: "Se instala siguiendo el README y la orden de ayuda (--help) funciona." },
    { id: "acciones", texto: "Al menos 3 acciones propias definidas en el fichero de configuración (acciones.json) funcionan." },
    { id: "secretos", texto: "Ninguna clave ni secreto en el repositorio ni en su historial." },
    { id: "git", texto: "Historial git real: mínimo 10 commits con mensajes que cuentan el proceso." },
  ],
  criterios: [
    {
      id: "acciones", nombre: "Acciones predefinidas funcionando", peso: 20,
      qué: "Lo que tu herramienta hace de verdad con tus ficheros.",
      niveles: [
        "Ninguna acción funciona de principio a fin, o solo el ejemplo de partida.",
        "1-2 acciones propias que funcionan en el caso fácil; salida confusa o efectos inesperados.",
        "3-4 acciones propias útiles, con salida clara (qué se ha hecho y sobre qué ficheros) y modo simulación.",
        "5 o más acciones propias útiles, combinables, con salida clara y sin efectos sorpresa (simulación previa o confirmación antes de borrar o sobrescribir).",
      ],
    },
    {
      id: "configuracion", nombre: "Configuración externa (acciones.json)", peso: 15,
      qué: "Las acciones viven en un fichero que escribes tú, no dentro del código.",
      niveles: [
        "Las acciones están escritas a mano dentro del código.",
        "Existe acciones.json pero el código lo lee sin comprobar nada: un error en el JSON rompe el programa.",
        "Esquema propio documentado en el README; el JSON se valida antes de ejecutar y los errores dicen qué campo falla.",
        "Además: añadir una acción no exige tocar el código y hay un ADR que justifica por qué configuración externa y no código.",
      ],
    },
    {
      id: "ia", nombre: "Capa IA, secretos y modo sin red", peso: 15,
      qué: "IA donde aporta, sin filtrar claves y sin depender de ella para todo.",
      niveles: [
        "Sin IA, o con la clave escrita en el código o subida al repositorio.",
        "Una acción con IA que funciona, pero si no hay red o falta la clave la CLI se rompe con un traceback.",
        "Al menos 2 acciones con IA útiles; clave en .env (ignorado por git desde el primer commit) y .env.example documentado.",
        "Al menos 2 acciones con IA útiles; ninguna clave en el historial; si no hay red, la CLI lo explica y sigue con las acciones sin IA.",
      ],
    },
    {
      id: "robustez", nombre: "Robustez: excepciones y entradas feas", peso: 15,
      qué: "Qué pasa cuando el usuario se equivoca o el disco no es como esperabas.",
      niveles: [
        "Cualquier error (ruta inexistente, JSON roto) termina en un traceback.",
        "Se capturan algunos errores, con mensajes genéricos («error»).",
        "Errores previsibles controlados con mensajes humanos y código de salida distinto de 0; nunca se pierde un fichero por un fallo a medias.",
        "Excepciones propias (ConfigError, AccionNoValida…) con mensajes humanos; ningún traceback ante errores previsibles; aserciones en desarrollo.",
      ],
    },
    {
      id: "diseno", nombre: "Diseño en clases y módulos", peso: 10,
      qué: "Cómo está organizado el código por dentro.",
      niveles: [
        "Todo en un único fichero sin funciones ni clases.",
        "Funciones separadas, pero interfaz, lógica y ficheros mezclados.",
        "Módulos separados (cli, motor, acciones, configuración) y clases con una responsabilidad clara.",
        "Responsabilidades separadas (interfaz, motor, acciones, proveedor IA), visibilidad cuidada y métodos estáticos con sentido (p. ej., fábricas desde la configuración).",
      ],
    },
    {
      id: "pruebas", nombre: "Pruebas y calidad", peso: 15,
      qué: "Cómo demuestras que funciona y que sigue funcionando.",
      niveles: [
        "Sin pruebas automáticas.",
        "Alguna prueba del camino feliz que el alumno no sabe explicar.",
        "Pruebas con pytest del camino feliz y de al menos 1 caso feo, en carpetas temporales (nunca sobre tus ficheros reales).",
        "Pruebas que cubren el camino feliz y 3 casos feos, ejecutadas en GitHub Actions y auditadas por el alumno (sabe explicar cada aserción).",
      ],
    },
    {
      id: "entrega", nombre: "Instalación, documentación y proceso", peso: 10,
      qué: "Que otra persona la instale y la use sin preguntarte nada.",
      niveles: [
        "Sin README o sin instrucciones para instalarla.",
        "README con pasos manuales (clonar, crear entorno, ejecutar el .py).",
        "Se instala con una orden (uv tool install / pipx install desde GitHub) y queda disponible como comando en cualquier carpeta; README con ejemplos.",
        "Se instala con una orden siguiendo el README; release v1.0 etiquetada con changelog; historial con ramas y PR legibles.",
      ],
    },
  ],
};

export const RUBRICAS: Record<string, Rubrica> = {
  [RUBRICA_WEB_MARCA.id]: RUBRICA_WEB_MARCA,
  [RUBRICA_CLI.id]: RUBRICA_CLI,
};

/** Valoración de un criterio: nivel elegido (índice en Rubrica.niveles) y comentario opcional. */
export type ValoracionCriterio = { n: number; c?: string };
export type Valoraciones = Record<string, ValoracionCriterio>;
export type Minimos = Record<string, boolean>;

export type ResultadoNota = {
  /** Puntuación de la rúbrica sobre 10 (2 decimales). null si falta algún criterio por valorar. */
  puntuacion: number | null;
  /** Criterios aún sin nivel. */
  pendientes: string[];
  /** Requisitos mínimos no cumplidos (o sin marcar). */
  minimosFallidos: string[];
  /** true si falla algún requisito mínimo: el proyecto no se evalúa (NE). */
  noEvaluable: boolean;
};

/**
 * Calcula la nota de una rúbrica: Σ peso·pct(nivel) / 10, sobre 10.
 * Los requisitos mínimos son la puerta de entrada: si alguno falla, el
 * proyecto queda como «no evaluable» (NE) aunque se conserve la puntuación
 * para enseñar al alumno cuánto sacaría al arreglarlo.
 */
export function calcularNota(r: Rubrica, valoraciones: Valoraciones, minimos: Minimos): ResultadoNota {
  let total = 0;
  const pendientes: string[] = [];
  for (const c of r.criterios) {
    const v = valoraciones[c.id];
    const nivel = v && Number.isInteger(v.n) ? r.niveles[v.n] : undefined;
    if (!nivel) { pendientes.push(c.id); continue; }
    total += c.peso * nivel.pct;
  }
  const minimosFallidos = r.minimos.filter((m) => minimos[m.id] !== true).map((m) => m.id);
  const puntuacion = pendientes.length ? null : Math.round(total / 10) / 100;
  return { puntuacion, pendientes, minimosFallidos, noEvaluable: minimosFallidos.length > 0 };
}

/** «7,35» — formato español para notas. */
export function formatoNota(n: number | null | undefined): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  return n.toLocaleString("es-ES", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
}
