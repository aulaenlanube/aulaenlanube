// Datos oficiales del módulo 0485 · Programación, copiados literalmente del
// Real Decreto 405/2023, de 29 de mayo (BOE núm. 132, 03-06-2023), que
// actualiza el RD 450/2010 (título DAM) y el RD 686/2010 (título DAW). Duración
// en la Comunitat Valenciana: Decreto 114/2025, de 29 de julio, del Consell
// (266 h, 8 h/semana en 1.º). No se parafrasea nada: es la fuente de las
// tablas RA → CE de las dos programaciones (contenido.ts).

export type RA = { n: number; texto: string; ce: string[] };

export const RAS: RA[] = [
  {
    n: 1,
    texto:
      "Reconoce la estructura de un programa informático, identificando y relacionando los elementos propios del lenguaje de programación utilizado.",
    ce: [
      "Se han identificado los bloques que componen la estructura de un programa informático.",
      "Se han creado proyectos de desarrollo de aplicaciones.",
      "Se han utilizado entornos integrados de desarrollo.",
      "Se han identificado los distintos tipos de variables y la utilidad específica de cada uno.",
      "Se ha modificado el código de un programa para crear y utilizar variables.",
      "Se han creado y utilizado constantes y literales.",
      "Se han clasificado, reconocido y utilizado en expresiones los operadores del lenguaje.",
      "Se ha comprobado el funcionamiento de las conversiones de tipo explícitas e implícitas.",
      "Se han introducido comentarios en el código.",
    ],
  },
  {
    n: 2,
    texto:
      "Escribe y prueba programas sencillos, reconociendo y aplicando los fundamentos de la programación orientada a objetos.",
    ce: [
      "Se han identificado los fundamentos de la programación orientada a objetos.",
      "Se han escrito programas simples.",
      "Se han instanciado objetos a partir de clases predefinidas.",
      "Se han utilizado métodos y propiedades de los objetos.",
      "Se han escrito llamadas a métodos estáticos.",
      "Se han utilizado parámetros en la llamada a métodos.",
      "Se han incorporado y utilizado librerías de objetos.",
      "Se han utilizado constructores.",
      "Se ha utilizado el entorno integrado de desarrollo en la creación y compilación de programas simples.",
    ],
  },
  {
    n: 3,
    texto: "Escribe y depura código, analizando y utilizando las estructuras de control del lenguaje.",
    ce: [
      "Se ha escrito y probado código que haga uso de estructuras de selección.",
      "Se han utilizado estructuras de repetición.",
      "Se han reconocido las posibilidades de las sentencias de salto.",
      "Se ha escrito código utilizando control de excepciones.",
      "Se han creado programas ejecutables utilizando diferentes estructuras de control.",
      "Se han probado y depurado los programas.",
      "Se ha comentado y documentado el código.",
      "Se han creado excepciones.",
      "Se han utilizado aserciones para la detección y corrección de errores durante la fase de desarrollo.",
    ],
  },
  {
    n: 4,
    texto:
      "Desarrolla programas organizados en clases analizando y aplicando los principios de la programación orientada a objetos.",
    ce: [
      "Se ha reconocido la sintaxis, estructura y componentes típicos de una clase.",
      "Se han definido clases.",
      "Se han definido propiedades y métodos.",
      "Se han creado constructores.",
      "Se han desarrollado programas que instancien y utilicen objetos de las clases creadas anteriormente.",
      "Se han utilizado mecanismos para controlar la visibilidad de las clases y de sus miembros.",
      "Se han definido y utilizado clases heredadas.",
      "Se han creado y utilizado métodos estáticos.",
      "Se han creado y utilizado conjuntos y librerías de clases.",
    ],
  },
  {
    n: 5,
    texto:
      "Realiza operaciones de entrada y salida de información, utilizando procedimientos específicos del lenguaje y librerías de clases.",
    ce: [
      "Se ha utilizado la consola para realizar operaciones de entrada y salida de información.",
      "Se han aplicado formatos en la visualización de la información.",
      "Se han reconocido las posibilidades de entrada / salida del lenguaje y las librerías asociadas.",
      "Se han utilizado ficheros para almacenar y recuperar información.",
      "Se han creado programas que utilicen diversos métodos de acceso al contenido de los ficheros.",
      "Se han utilizado las herramientas del entorno de desarrollo para crear interfaces gráficos de usuario simples.",
      "Se han programado controladores de eventos.",
      "Se han escrito programas que utilicen interfaces gráficos para la entrada y salida de información.",
    ],
  },
  {
    n: 6,
    texto:
      "Escribe programas que manipulen información seleccionando y utilizando tipos avanzados de datos.",
    ce: [
      "Se han escrito programas que utilicen matrices (arrays).",
      "Se han reconocido las librerías de clases relacionadas con tipos de datos avanzados.",
      "Se han utilizado listas para almacenar y procesar información.",
      "Se han utilizado iteradores para recorrer los elementos de las listas.",
      "Se han reconocido las características y ventajas de cada una de las colecciones de datos disponibles.",
      "Se han creado clases y métodos genéricos.",
      "Se han utilizado expresiones regulares en la búsqueda de patrones en cadenas de texto.",
      "Se han identificado las clases relacionadas con el tratamiento de documentos escritos en diferentes lenguajes de intercambio de datos.",
      "Se han realizado programas que realicen manipulaciones sobre documentos escritos en diferentes lenguajes de intercambio de datos.",
      "Se han utilizado operaciones agregadas para el manejo de información almacenada en colecciones.",
    ],
  },
  {
    n: 7,
    texto:
      "Desarrolla programas aplicando características avanzadas de los lenguajes orientados a objetos y del entorno de programación.",
    ce: [
      "Se han identificado los conceptos de herencia, superclase y subclase.",
      "Se han utilizado modificadores para bloquear y forzar la herencia de clases y métodos.",
      "Se ha reconocido la incidencia de los constructores en la herencia.",
      "Se han creado clases heredadas que sobrescriben la implementación de métodos de la superclase.",
      "Se han diseñado y aplicado jerarquías de clases.",
      "Se han probado y depurado las jerarquías de clases.",
      "Se han realizado programas que implementen y utilicen jerarquías de clases.",
      "Se ha comentado y documentado el código.",
      "Se han identificado y evaluado los escenarios de uso de interfaces.",
      "Se han identificado y evaluado los escenarios de utilización de la herencia y la composición.",
    ],
  },
  {
    n: 8,
    texto:
      "Utiliza bases de datos orientadas a objetos, analizando sus características y aplicando técnicas para mantener la persistencia de la información.",
    ce: [
      "Se han identificado las características de las bases de datos orientadas a objetos.",
      "Se ha analizado su aplicación en el desarrollo de aplicaciones mediante lenguajes orientados a objetos.",
      "Se han instalado sistemas gestores de bases de datos orientados a objetos.",
      "Se han clasificado y analizado los distintos métodos soportados por los sistemas gestores para la gestión de la información almacenada.",
      "Se han creado bases de datos y las estructuras necesarias para el almacenamiento de objetos.",
      "Se han programado aplicaciones que almacenen objetos en las bases de datos creadas.",
      "Se han realizado programas para recuperar, actualizar y eliminar objetos de las bases de datos.",
      "Se han realizado programas para almacenar y gestionar tipos de datos estructurados, compuestos y relacionados.",
    ],
  },
  {
    n: 9,
    texto: "Gestiona información almacenada en bases de datos manteniendo la integridad y consistencia de los datos.",
    ce: [
      "Se han identificado las características y métodos de acceso a sistemas gestores de bases de datos.",
      "Se han programado conexiones con bases de datos.",
      "Se ha escrito un código para almacenar información en bases de datos.",
      "Se han creado programas para recuperar y mostrar información almacenada en bases de datos.",
      "Se han efectuado borrados y modificaciones sobre la información almacenada.",
      "Se han creado aplicaciones que muestren la información almacenada en bases de datos.",
      "Se han creado aplicaciones para gestionar la información presente en bases de datos.",
    ],
  },
];

// Letra oficial del CE i-ésimo (a, b, c…).
export const letra = (i: number) => "abcdefghijklmnopqrstuvwxyz"[i];

// Contenidos básicos del módulo (RD 405/2023, anexo I), por bloque.
export const CONTENIDOS: { bloque: string; items: string[] }[] = [
  {
    bloque: "Identificación de los elementos de un programa informático",
    items: ["Estructura y bloques fundamentales.", "Variables.", "Tipos de datos.", "Literales.", "Constantes.", "Operadores y expresiones.", "Conversiones de tipo.", "Comentarios."],
  },
  {
    bloque: "Utilización de objetos",
    items: ["Características de los objetos.", "Instanciación de objetos.", "Utilización de métodos. Parámetros.", "Utilización de propiedades.", "Utilización de métodos estáticos.", "Constructores.", "Destrucción de objetos y liberación de memoria."],
  },
  {
    bloque: "Uso de estructuras de control",
    items: ["Estructuras de selección.", "Estructuras de repetición.", "Estructuras de salto.", "Control de excepciones.", "Aserciones.", "Prueba, depuración y documentación de la aplicación."],
  },
  {
    bloque: "Desarrollo de clases",
    items: ["Concepto de clase.", "Estructura y miembros de una clase. Visibilidad.", "Creación de propiedades.", "Creación de métodos.", "Creación de constructores.", "Utilización de clases y objetos.", "Utilización de clases heredadas."],
  },
  {
    bloque: "Lectura y escritura de información",
    items: [
      "Flujos. Tipos: bytes y caracteres. Clases relacionadas.",
      "Ficheros de datos. Registros.",
      "Apertura y cierre de ficheros. Modos de acceso. Escritura y lectura de información en ficheros.",
      "Utilización de los sistemas de ficheros.",
      "Creación y eliminación de ficheros y directorios.",
      "Entrada desde teclado. Salida a pantalla. Formatos de visualización.",
      "Interfaces gráficas.",
      "Concepto de evento.",
      "Creación de controladores de eventos.",
    ],
  },
  {
    bloque: "Aplicación de las estructuras de almacenamiento",
    items: [
      "Estructuras estáticas y dinámicas.",
      "Creación de matrices (arrays).",
      "Matrices (arrays) multidimensionales.",
      "Genericidad.",
      "Cadenas de caracteres. Expresiones regulares.",
      "Colecciones: Listas, Conjuntos y Diccionarios.",
      "Operaciones agregadas: filtrado, reducción y recolección.",
    ],
  },
  {
    bloque: "Utilización avanzada de clases",
    items: ["Composición de clases.", "Herencia y polimorfismo.", "Jerarquía de clases: Superclases y subclases.", "Clases y métodos abstractos y finales.", "Interfaces.", "Sobreescritura de métodos.", "Constructores y herencia."],
  },
  {
    bloque: "Mantenimiento de la persistencia de los objetos",
    items: [
      "Bases de datos orientadas a objetos.",
      "Características de las bases de datos orientadas a objetos.",
      "Instalación del gestor de bases de datos.",
      "Creación de bases de datos.",
      "Mecanismos de consulta.",
      "El lenguaje de consultas: sintaxis, expresiones, operadores.",
      "Recuperación, modificación y borrado de información.",
      "Tipos de datos objeto; atributos y métodos.",
      "Tipos de datos colección.",
    ],
  },
  {
    bloque: "Gestión de bases de datos",
    items: ["Acceso a bases de datos. Estándares. Características.", "Establecimiento de conexiones.", "Almacenamiento, recuperación, actualización y eliminación de información en bases de datos."],
  },
];

// Competencias profesionales, personales y sociales (art. 5) y objetivos
// generales (art. 9) a los que contribuye el módulo según sus orientaciones
// pedagógicas: objetivos e), j), q), w) y competencias e), j), t), w).
export const COMPETENCIAS: [string, string][] = [
  ["e", "Desarrollar aplicaciones multiplataforma con acceso a bases de datos utilizando lenguajes, librerías y herramientas adecuados a las especificaciones."],
  ["j", "Desarrollar aplicaciones para teléfonos móviles, tabletas y otros dispositivos inteligentes empleando técnicas y entornos de desarrollo específicos."],
  ["t", "Establecer vías eficaces de relación profesional y comunicación con sus superiores, compañeros y subordinados, respetando la autonomía y competencias de las distintas personas."],
  ["w", "Mantener el espíritu de innovación y actualización en el ámbito de su trabajo para adaptarse a los cambios tecnológicos y organizativos de su entorno profesional."],
];

export const OBJETIVOS: [string, string][] = [
  ["e", "Seleccionar y emplear lenguajes, herramientas y librerías, interpretando las especificaciones para desarrollar aplicaciones multiplataforma con acceso a bases de datos."],
  ["j", "Seleccionar y emplear técnicas, lenguajes y entornos de desarrollo, evaluando sus posibilidades, para desarrollar aplicaciones en teléfonos móviles, tabletas y otros dispositivos inteligentes."],
  ["q", "Seleccionar y emplear lenguajes y herramientas, atendiendo a los requerimientos, para desarrollar componentes personalizados en sistemas ERP-CRM."],
  ["w", "Identificar los cambios tecnológicos, organizativos, económicos y laborales en su actividad, analizando sus implicaciones en el ámbito de trabajo, para mantener el espíritu de innovación."],
];

export const COMPETENCIA_GENERAL =
  "La competencia general de este título consiste en desarrollar, implantar, documentar y mantener aplicaciones informáticas multiplataforma, utilizando tecnologías y entornos de desarrollo específicos, garantizando el acceso a los datos de forma segura y cumpliendo los criterios de «usabilidad» y calidad exigidas en los estándares establecidos.";

export const ORIENTACIONES = [
  "La interpretación y aplicación de los principios de la programación orientada a objetos.",
  "La evaluación, selección y utilización de herramientas y lenguajes de programación orientados a objetos.",
  "La utilización de las características específicas de lenguajes y entornos de programación en el desarrollo de aplicaciones informáticas.",
  "La identificación de las funcionalidades aportadas por los sistemas gestores de bases de datos y su incorporación a las aplicaciones desarrolladas.",
  "La prueba, depuración y documentación de las aplicaciones desarrolladas.",
];

// Peso de cada RA en la nota del módulo (suma 100). Igual en las dos
// modalidades: cambia cómo se evidencia cada RA (matrices en contenido.ts).
export const PESO_RA: Record<number, number> = { 1: 10, 2: 10, 3: 12, 4: 14, 5: 12, 6: 12, 7: 10, 8: 8, 9: 12 };
