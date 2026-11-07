import { Caja, Figura, Flecha, T, Zona, fuerte, type TonoSvg } from "@/app/programacion-ia/_video/svg";

// Figuras de la sesión 5 (docs/paginas-para-video.md): estáticas, 1:1, texto de
// 16 o más, cada <text> corto y único en la página. Medidas de texto para
// colocar: sans 16 ≈ 9,5 px/carácter, negrita 18 ≈ 11,5, mono 16 ≈ 9,9.
// Todo trazo que apunta a una caja acaba a 6 de su borde (punta refX = 10).

/* ------------------------------------------------------------------ */
/* El bucle del agente, para docentes                                  */
/* Columnas x = 20 · 370 · 720 (ancho 260, huecos de 90) → ancho 1000. */
/* Filas y = 20 (alto 76) · 140 (permiso, alto 100) · 284 (alto 76).   */
/* Centros x = 150 · 500 · 850 ; y = 58 · 190 · 322. Alto 380.         */
/* Texto más largo de una línea: «crea o cambia index.html» (24 car.   */
/* ≈ 228) en 260 − 24 = 236.                                           */
/* ------------------------------------------------------------------ */

export function BucleDocente({ uid = "s5-bucle" }: { uid?: string }) {
  return (
    <Figura
      uid={uid}
      ancho={1000}
      alto={380}
      etiqueta="El bucle del agente: tú le das el encargo; el agente planifica, escribe o cambia ficheros, te pide permiso si la regla es preguntar, mira el resultado y comprueba si ha terminado. Si no, da otra vuelta. Cuando acaba, te avisa y tú pruebas la herramienta."
      pie="Un chat te da una respuesta; un agente da muchas vueltas a este bucle por ti."
    >
      <Caja x={20} y={20} w={260} h={76} tono="gris" titulo="Tú pides" lineas={["el encargo, con tu ficha"]} />
      <Caja x={370} y={20} w={260} h={76} tono="azul" titulo="Planifica" lineas={["qué hace y en qué orden"]} />
      <Caja x={720} y={20} w={260} h={76} tono="morado" titulo="Escribe ficheros" lineas={["crea o cambia index.html"]} />
      <Caja x={720} y={140} w={260} h={100} tono="rosa" titulo="Te pide permiso" lineas={["si editar pregunta", "tú: sí o no"]} discontinua />
      <Caja x={720} y={284} w={260} h={76} tono="verde" titulo="Mira el resultado" lineas={["lee lo que ha escrito"]} />
      <Caja x={370} y={284} w={260} h={76} tono="ambar" titulo="¿Ha terminado?" lineas={["compara con lo pedido"]} />
      <Caja x={20} y={284} w={260} h={76} tono="gris" titulo="Te avisa" lineas={["tú la abres y la pruebas"]} />

      <Flecha uid={uid} d="M280 58 H364" />
      <Flecha uid={uid} d="M630 58 H714" />
      <Flecha uid={uid} d="M850 96 V134" />
      <Flecha uid={uid} d="M850 240 V278" />
      <Flecha uid={uid} d="M720 322 H636" />
      <Flecha uid={uid} d="M370 322 H286" />
      <Flecha uid={uid} d="M500 284 V102" tono="ambar" discontinua />
      <T x={328} y={312} ancla="middle" peso={700}>
        sí
      </T>
      <T x={512} y={196} peso={700} color={fuerte("ambar")}>
        no: otra vuelta
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Dónde vive cada cosa                                                 */
/* Zona «Tu ordenador» 16..616 × 16..284; zona «Internet» 640..984.    */
/* OpenCode 40..270 × 170..246 (centro y = 208). Carpeta 330..590 ×    */
/* 40..140. Modelo 680..960 × 150..250. Flecha a la carpeta: sube por  */
/* x = 155 hasta y = 102 y va a 324. Flechas al modelo a y = 196 y 228. */
/* ------------------------------------------------------------------ */

export function DondeVive({ uid = "s5-donde" }: { uid?: string }) {
  return (
    <Figura
      uid={uid}
      ancho={1000}
      alto={300}
      etiqueta="Dónde vive cada cosa: en tu ordenador están la app OpenCode y la carpeta del proyecto con AGENTS.md, opencode.json e index.html. En internet está el modelo de IA. OpenCode le envía tu petición y lo que lee, y el modelo responde."
      pie="Tu herramienta y tu carpeta se quedan en tu ordenador; al modelo solo viaja lo que el agente le envía."
    >
      <Zona x={16} y={16} w={600} h={268} tono="verde" rotulo="Tu ordenador" />
      <Zona x={640} y={16} w={344} h={268} tono="morado" rotulo="Internet" />
      <Caja x={40} y={170} w={230} h={76} tono="azul" titulo="OpenCode" lineas={["la app de escritorio"]} />
      <Caja x={330} y={40} w={260} h={100} tono="ambar" titulo="Tu carpeta" lineas={["memoria y reglas", "y tu herramienta"]} />
      <Caja x={680} y={150} w={280} h={100} tono="morado" titulo="El modelo de IA" lineas={["gratis de OpenCode", "o GitHub Copilot"]} />
      <Flecha uid={uid} d="M155 170 V102 H324" tono="ambar" />
      <T x={167} y={140}>
        lee y escribe
      </T>
      <Flecha uid={uid} d="M270 196 H674" tono="azul" />
      <T x={472} y={186} ancla="middle">
        tu petición y lo que lee
      </T>
      <Flecha uid={uid} d="M680 228 H276" tono="morado" />
      <T x={472} y={252} ancla="middle">
        la respuesta
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* La carpeta es su mundo                                               */
/* Zona verde 16..486 × 16..264 con la carpeta 40..460 × 60..184.      */
/* Zona rosa 520..984 con Documentos 545..745 y Escritorio 765..965,   */
/* ambas a y = 60 (alto 76). Flecha bloqueada a y = 150 de 466 a 539.  */
/* Textos de la zona rosa centrados en x = 752, y = 196 y 228.         */
/* ------------------------------------------------------------------ */

export function CarpetaMundo({ uid = "s5-carpeta" }: { uid?: string }) {
  return (
    <Figura
      uid={uid}
      ancho={1000}
      alto={280}
      etiqueta="La carpeta del proyecto es el mundo del agente: dentro están AGENTS.md, opencode.json, el encargo, el currículo y el calendario para probar, e index.html, la plataforma. Fuera quedan Documentos, Escritorio y todo lo demás, y la regla external_directory en deny le impide salir."
      pie="Una carpeta solo para la plataforma: lo que no está ahí, el agente no lo ve ni lo toca."
    >
      <Zona x={16} y={16} w={470} h={248} tono="verde" rotulo="Lo que el agente puede tocar" />
      <Caja
        x={40}
        y={60}
        w={420}
        h={172}
        tono="verde"
        titulo="mi-modulo"
        lineas={["AGENTS.md · la memoria", "opencode.json · las reglas", "encargo.md · el encargo", "currículo y calendario", "index.html · la plataforma"]}
        mono
      />
      <Zona x={520} y={16} w={464} h={248} tono="rosa" rotulo="Fuera de la carpeta" />
      <Caja x={545} y={60} w={200} h={76} tono="gris" titulo="Documentos" lineas={["tus otros ficheros"]} />
      <Caja x={765} y={60} w={200} h={76} tono="gris" titulo="Escritorio" lineas={["y todo lo demás"]} />
      <Flecha uid={uid} d="M466 150 H539" tono="rosa" discontinua />
      <T x={502} y={140} ancla="middle" tam={18} peso={800} color={fuerte("rosa")}>
        ✕
      </T>
      <T x={752} y={196} ancla="middle" mono color={fuerte("rosa")} peso={700}>
        external_directory: deny
      </T>
      <T x={752} y={228} ancla="middle">
        el agente no sale de aquí
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Tres caminos para el modelo                                          */
/* Tres cajas de 300 × 148 a y = 20: x = 20 · 350 · 680 (huecos 30).   */
/* Cuatro líneas de ≤ 26 car. (≈ 247) en 300 − 24 = 276.               */
/* Regla de oro centrada en x = 500, y = 206.                           */
/* ------------------------------------------------------------------ */

export function TresCaminos({ uid = "s5-modelos" }: { uid?: string }) {
  return (
    <Figura
      uid={uid}
      ancho={1000}
      alto={230}
      etiqueta="Tres caminos para el modelo: los gratis de OpenCode, sin cuenta y por tiempo limitado; GitHub Copilot, gratis para docentes verificados con 1.500 créditos al mes; y los de pago, que no hacen falta en este seminario."
    >
      <Caja
        x={20}
        y={20}
        w={300}
        h={148}
        tono="verde"
        titulo="Gratis de OpenCode"
        lineas={["sin cuenta y sin pagar", "por tiempo limitado", "solo GLM y DeepSeek", "declaran no guardar"]}
      />
      <Caja
        x={350}
        y={20}
        w={300}
        h={148}
        tono="azul"
        titulo="GitHub Copilot"
        lineas={["gratis si eres docente", "verificado en GitHub", "1.500 créditos al mes", "se conecta con /connect"]}
      />
      <Caja
        x={680}
        y={20}
        w={300}
        h={148}
        tono="gris"
        titulo="De pago"
        lineas={["Console o Go de OpenCode,", "OpenAI, Google…", "no te hacen falta", "para este seminario"]}
      />
      <T x={500} y={206} ancla="middle" peso={800} color={fuerte("rosa")}>
        Regla de oro: en un modelo gratis, nada personal ni confidencial
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* AGENTS.md se lee al empezar cada sesión                              */
/* AGENTS.md 390..610 × 16..116 (centro x = 500). Sesiones a y = 160   */
/* (alto 76): 60..280 · 390..610 · 720..940. Flechas desde el borde    */
/* inferior (y = 116) hasta 6 por encima de cada caja (y = 154).       */
/* ------------------------------------------------------------------ */

export function CuandoSeLee({ uid = "s5-memoria" }: { uid?: string }) {
  return (
    <Figura
      uid={uid}
      ancho={1000}
      alto={250}
      etiqueta="AGENTS.md guarda tu ficha y tus reglas, y OpenCode lo lee al empezar cada sesión: hoy, mañana o dentro de un mes, el agente sabe quién eres y qué normas tiene que cumplir sin que se lo repitas."
      pie="El modelo no recuerda nada de una conversación a otra: lo que debe saber siempre va en AGENTS.md."
    >
      <Caja x={390} y={16} w={220} h={100} tono="ambar" titulo="Tu AGENTS.md" lineas={["tu ficha y", "tus reglas"]} mono />
      <Caja x={60} y={160} w={220} h={76} tono="azul" titulo="Hoy" lineas={["sabe quién eres"]} />
      <Caja x={390} y={160} w={220} h={76} tono="azul" titulo="Mañana" lineas={["sabe tus reglas"]} />
      <Caja x={720} y={160} w={220} h={76} tono="azul" titulo="Dentro de un mes" lineas={["no hay que repetirlo"]} />
      <Flecha uid={uid} d="M440 116 L190 154" tono="ambar" />
      <Flecha uid={uid} d="M500 116 V154" tono="ambar" />
      <Flecha uid={uid} d="M560 116 L810 154" tono="ambar" />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Tres reglas: qué pasa cuando quiere actuar                           */
/* Izquierda 20..350 y derecha 650..980, filas a y = 16 · 112 · 208     */
/* (alto 76; centros 54 · 150 · 246). Flechas de 350 a 644 por el       */
/* centro de cada fila; rótulo mono encima, centrado en x = 497.       */
/* ------------------------------------------------------------------ */

export function TresReglas({ uid = "s5-reglas" }: { uid?: string }) {
  const filas = [
    { y: 16, quiere: "Cambiar index.html", que: "editar", regla: "preguntar · ask", tono: "ambar" as const, sale: "Te pregunta", linea: "permitir o rechazar" },
    { y: 112, quiere: "Abrir Documentos", que: "salir de la carpeta", regla: "denegar · deny", tono: "rosa" as const, sale: "No sale de la carpeta", linea: "bloqueado sin preguntar" },
    { y: 208, quiere: "Borrar un fichero", que: "orden rm", regla: "política · nunca", tono: "rosa" as const, sale: "Nunca borra", linea: "lo prohíbe una política" },
  ];
  return (
    <Figura
      uid={uid}
      ancho={1000}
      alto={300}
      etiqueta="Tres reglas del opencode.json: si quiere cambiar index.html, te pregunta; si quiere abrir otra carpeta, se le deniega sin preguntar; si quiere borrar un fichero, una política lo prohíbe siempre."
    >
      {filas.map((f) => (
        <g key={f.quiere}>
          <Caja x={20} y={f.y} w={330} h={76} tono="gris" titulo={f.quiere} lineas={[f.que]} />
          <Flecha uid={uid} d={`M350 ${f.y + 38} H644`} tono={f.tono} />
          <T x={497} y={f.y + 28} ancla="middle" mono peso={700} color={fuerte(f.tono)}>
            {f.regla}
          </T>
          <Caja x={650} y={f.y} w={330} h={76} tono={f.tono} titulo={f.sale} lineas={[f.linea]} />
        </g>
      ))}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Plan, revisas, build, pruebas                                        */
/* Cuatro cajas de 210 × 100 a y = 30: x = 20 · 270 · 520 · 770        */
/* (huecos de 40). Flechas a y = 80. Líneas de ≤ 19 car. (≈ 181).      */
/* ------------------------------------------------------------------ */

export function PlanBuild({ uid = "s5-planbuild" }: { uid?: string }) {
  return (
    <Figura
      uid={uid}
      ancho={1000}
      alto={160}
      etiqueta="El orden de trabajo: el agente Plan piensa y propone sin tocar ficheros; tú revisas el plan y respondes sus dudas; el agente Build escribe index.html con tu permiso; y tú pruebas la herramienta como el alumno más trasto."
    >
      <Caja x={20} y={30} w={210} h={100} tono="morado" titulo="Agente Plan" lineas={["piensa y propone", "no toca ficheros"]} />
      <Caja x={270} y={30} w={210} h={100} tono="gris" titulo="Tú revisas" lineas={["respondes dudas", "y corriges el plan"]} />
      <Caja x={520} y={30} w={210} h={100} tono="azul" titulo="Agente Build" lineas={["escribe el fichero", "con tu permiso"]} />
      <Caja x={770} y={30} w={210} h={100} tono="verde" titulo="Tú pruebas" lineas={["como el alumno", "más trasto"]} />
      <Flecha uid={uid} d="M230 80 H264" />
      <Flecha uid={uid} d="M480 80 H514" />
      <Flecha uid={uid} d="M730 80 H764" />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Un fallo, una petición                                               */
/* Cuatro cajas de 300 × 76: (40, 20) · (560, 20) · (560, 170) ·       */
/* (40, 170). Flechas en el sentido de las agujas: arriba a y = 58,    */
/* derecha en x = 710, abajo a y = 208, izquierda en x = 190.          */
/* Lema centrado en (450, 142). Ancho 900, alto 266.                   */
/* ------------------------------------------------------------------ */

export function UnFallo({ uid = "s5-fallo" }: { uid?: string }) {
  return (
    <Figura
      uid={uid}
      ancho={900}
      alto={266}
      etiqueta="Cómo se corrige con un agente: pruebas la herramienta, anotas un solo fallo, se lo pides diciendo qué pasa y qué esperabas, y compruebas que se arregló sin romper nada más. Después, otra vuelta."
      pie="«Arréglalo todo» devuelve un revoltijo; una cosa por petición, y compruebas cada una."
    >
      <Caja x={40} y={20} w={300} h={76} tono="verde" titulo="Prueba" lineas={["úsala de verdad"]} />
      <Caja x={560} y={20} w={300} h={76} tono="ambar" titulo="Anota un fallo" lineas={["solo uno"]} />
      <Caja x={560} y={170} w={300} h={76} tono="azul" titulo="Pídelo" lineas={["qué pasa y qué esperabas"]} />
      <Caja x={40} y={170} w={300} h={76} tono="morado" titulo="Comprueba" lineas={["que se arregló y nada más"]} />
      <Flecha uid={uid} d="M340 58 H554" />
      <Flecha uid={uid} d="M710 96 V164" />
      <Flecha uid={uid} d="M560 208 H346" />
      <Flecha uid={uid} d="M190 170 V102" />
      <T x={450} y={142} ancla="middle" peso={800} tam={18} color={fuerte("rosa")}>
        una cosa por petición
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* La herramienta viaja; los datos, no                                  */
/* index.html 20..240 × 90..166 (centro y = 128). Destinos x = 420..680 */
/* a y = 10 · 100 · 190 (alto 76; centros 48 · 138 · 228). Flechas      */
/* desde (240, 128) hasta x = 414. Recuadro verde 740..980 × 88..188.  */
/* ------------------------------------------------------------------ */

export function HerramientaViaja({ uid = "s5-viaja" }: { uid?: string }) {
  return (
    <Figura
      uid={uid}
      ancho={1000}
      alto={276}
      etiqueta="El fichero index.html se puede compartir con quien quieras: tu navegador, otro docente o el departamento. Cada uno guarda sus propios datos en su navegador; las notas no viajan con el fichero."
    >
      <Caja x={20} y={90} w={220} h={76} tono="ambar" titulo="Tu index.html" lineas={["un solo fichero"]} mono />
      <Caja x={420} y={10} w={260} h={76} tono="azul" titulo="Tu navegador" lineas={["tus datos, solo aquí"]} />
      <Caja x={420} y={100} w={260} h={76} tono="azul" titulo="Otro docente" lineas={["sus datos, en su equipo"]} />
      <Caja x={420} y={190} w={260} h={76} tono="azul" titulo="El departamento" lineas={["cada uno, los suyos"]} />
      <Flecha uid={uid} d="M240 128 L414 52" tono="ambar" />
      <Flecha uid={uid} d="M240 128 H414" tono="ambar" />
      <Flecha uid={uid} d="M240 128 L414 224" tono="ambar" />
      <Caja x={740} y={88} w={240} h={100} tono="verde" titulo="Los datos no viajan" lineas={["el fichero se comparte;", "las notas, nunca"]} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Plan B: sin instalar nada                                            */
/* Cuatro cajas de 210 × 100 a y = 30: x = 20 · 270 · 520 · 770.       */
/* Flechas a y = 80. «codificación UTF-8» (18 car. ≈ 171) en 186.      */
/* ------------------------------------------------------------------ */

export function PlanBSinInstalar({ uid = "s5-planb" }: { uid?: string }) {
  return (
    <Figura
      uid={uid}
      ancho={1000}
      alto={160}
      etiqueta="Plan B sin instalar nada: Copilot Chat te da el HTML completo, lo pegas en el Bloc de notas, lo guardas como cuaderno.html con codificación UTF-8 y lo abres con doble clic en el navegador."
    >
      <Caja x={20} y={30} w={210} h={100} tono="morado" titulo="Copilot Chat" lineas={["te da el HTML", "completo"]} />
      <Caja x={270} y={30} w={210} h={100} tono="gris" titulo="Bloc de notas" lineas={["pegas todo", "el código"]} />
      <Caja x={520} y={30} w={210} h={100} tono="ambar" titulo="Guardar como" lineas={["cuaderno.html", "codificación UTF-8"]} />
      <Caja x={770} y={30} w={210} h={100} tono="verde" titulo="Doble clic" lineas={["se abre en", "tu navegador"]} />
      <Flecha uid={uid} d="M230 80 H264" />
      <Flecha uid={uid} d="M480 80 H514" />
      <Flecha uid={uid} d="M730 80 H764" />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Tu plataforma del módulo: todo sale del currículo                    */
/* Currículo 20..220 × 190..290 (centro y = 240). Columna media x = 290 */
/* (ancho 250) y derecha x = 610 (ancho 250), filas y = 20 · 140 · 260 */
/* · 380 (alto 100; centros 70 · 190 · 310 · 430). Flechas del         */
/* currículo: curvas desde (220, 240) hasta x = 284. Horizontales a    */
/* x 540 → 604. Ancho 880, alto 500. Línea más larga: «encargos de     */
/* seis bloques» (24 car. ≈ 228) en 250 − 24 = 226 → «en seis bloques».*/
/* ------------------------------------------------------------------ */

const FILAS_PLATAFORMA: { mitad: [string, string[]]; destino: [string, string[]]; fuera?: boolean; tono: TonoSvg }[] = [
  { mitad: ["Unidades", ["horas y CE de cada una", "y la cobertura"]], destino: ["Calendario", ["festivos y evaluaciones", "fechas de cada unidad"]], tono: "azul" },
  { mitad: ["Rúbricas", ["un CE, cuatro niveles", "se imprimen"]], destino: ["Cuaderno", ["corriges con la rúbrica", "nota de CE, RA y final"]], tono: "verde" },
  { mitad: ["Preguntas", ["banco por CE", "test, V/F y corta"]], destino: ["Aules", ["importas el GIFT", "{T} y {F} bien escritos"]], fuera: true, tono: "ambar" },
  { mitad: ["Prompts", ["encargos en seis bloques", "con tus datos dentro"]], destino: ["Copilot", ["los pegas en", "tu asistente"]], fuera: true, tono: "morado" },
];

export function MapaPlataforma({ uid = "s5-mapa" }: { uid?: string }) {
  return (
    <Figura
      uid={uid}
      ancho={880}
      alto={500}
      etiqueta="Mapa de la plataforma Mi módulo: el currículo pegado del BOE alimenta cuatro pantallas. Unidades lleva al Calendario con las fechas reales; Rúbricas lleva al Cuaderno, donde se corrige con ellas; Preguntas exporta un fichero GIFT que se importa en Aules; y Prompts prepara encargos con los datos del módulo para pegarlos en Copilot."
      pie="Todo sale del currículo que pegas una vez. Y en Inicio, los avisos de todo junto."
    >
      <Caja x={20} y={190} w={200} h={100} tono="rosa" titulo="Currículo" lineas={["pegas el BOE", "RA y CE con pesos"]} grosor={3} />
      {FILAS_PLATAFORMA.map((f, i) => {
        const y = 20 + i * 120;
        const cy = y + 50;
        return (
          <g key={f.mitad[0]}>
            <Flecha uid={uid} d={`M220 240 C 252 240, 252 ${cy}, 284 ${cy}`} tono="rosa" />
            <Caja x={290} y={y} w={250} h={100} tono={f.tono} titulo={f.mitad[0]} lineas={f.mitad[1]} />
            <Flecha uid={uid} d={`M540 ${cy} H604`} tono={f.fuera ? "gris" : f.tono} discontinua={f.fuera} />
            <Caja x={610} y={y} w={250} h={100} tono={f.fuera ? "gris" : f.tono} titulo={f.destino[0]} lineas={f.destino[1]} discontinua={f.fuera} />
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Las cinco piezas del seminario, dentro de la plataforma              */
/* Izquierda x = 20 (ancho 360), derecha x = 600 (ancho 360); filas     */
/* y = 20 + i·92 (alto 76; centros 58 + i·92). Flechas a la altura del */
/* centro, de 382 a 594. Ancho 980, alto 476.                          */
/* ------------------------------------------------------------------ */

const PIEZAS_EN_UNA: { s: string; pieza: string; tono: TonoSvg; destino: string; linea: string }[] = [
  { s: "sesión 1 · tu contexto", pieza: "La ficha", tono: "azul", destino: "AGENTS.md", linea: "la memoria del agente" },
  { s: "sesión 2 · tus fuentes", pieza: "El cuaderno", tono: "verde", destino: "Currículo", linea: "el texto literal del BOE" },
  { s: "sesión 3 · tu protocolo", pieza: "Las rúbricas", tono: "ambar", destino: "Rúbricas y Cuaderno", linea: "corriges con ellas" },
  { s: "sesión 4 · tu agente", pieza: "El asistente", tono: "morado", destino: "Prompts", linea: "encargos listos para él" },
  { s: "sesión 4 · tu idea", pieza: "El encargo", tono: "morado", destino: "encargo.md", linea: "la plataforma, por fases" },
];

export function PiezasEnUna({ uid = "s5-piezas" }: { uid?: string }) {
  return (
    <Figura
      uid={uid}
      ancho={980}
      alto={476}
      etiqueta="Cómo entra cada pieza del seminario en la plataforma: la ficha de la sesión 1 se convierte en AGENTS.md; las fuentes del cuaderno de la sesión 2, en el currículo literal; las rúbricas de la sesión 3, en la pantalla Rúbricas y en la corrección del Cuaderno; el asistente de la sesión 4 recibe los prompts; y el encargo de la sesión 4 describe la plataforma entera."
      pie="Nada de lo que hiciste en las sesiones 1 a 4 se tira: hoy todo encaja en un solo sitio."
    >
      {PIEZAS_EN_UNA.map((p, i) => {
        const y = 20 + i * 92;
        return (
          <g key={p.pieza}>
            <Caja x={20} y={y} w={360} h={76} tono={p.tono} titulo={p.pieza} lineas={[p.s]} izquierda />
            <Flecha uid={uid} d={`M382 ${y + 38} H594`} tono={p.tono} />
            <Caja x={600} y={y} w={360} h={76} tono="rosa" titulo={p.destino} lineas={[p.linea]} izquierda />
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Tres comprobaciones que no se saltan                                 */
/* Tres cajas de 300 × 124 a y = 20: x = 20 · 350 · 680. Ancho 1000,   */
/* alto 164. Líneas ≤ 28 car. (≈ 266 px) en 300 − 24 = 276.            */
/* ------------------------------------------------------------------ */

export function TresComprobaciones({ uid = "s5-tres" }: { uid?: string }) {
  const cajas: [string, TonoSvg, string[]][] = [
    ["El alumno más trasto", "ambar", ["escribe lo que no toca", "«abc» en un peso: se ponía 0", "y no avisaba"]],
    ["La consola (F12)", "azul", ["lo rojo no se ve en pantalla", "un error en cada pestaña:", "lo copias y lo pegas"]],
    ["La calculadora", "rosa", ["una nota hecha a mano", "salía 7,9 y era 7,8:", "el peso no se guardaba"]],
  ];
  return (
    <Figura
      uid={uid}
      ancho={1000}
      alto={164}
      etiqueta="Tres comprobaciones que encontraron fallos reales en la plataforma: probarla como el alumno más trasto (al escribir abc en un peso se guardaba un 0 sin avisar), mirar la consola del navegador con F12 (salía un error en rojo al cambiar de pestaña) y comprobar una nota con la calculadora (salía 7,9 en lugar de 7,8 porque el peso de un RA no se guardaba)."
      pie="Las tres encontraron un fallo real en esta plataforma. Ninguno se veía usándola «bien»."
    >
      {cajas.map(([t, tono, l], i) => (
        <Caja key={t} x={20 + i * 330} y={20} w={300} h={124} tono={tono} titulo={t} lineas={l} />
      ))}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* La nota de A01, a mano                                               */
/* RA a la izquierda: x = 20 (ancho 300), y = 10 + i·88 (alto 76;      */
/* centros 48 · 136 · 224 · 312). Nota final 620..980 × 130..230       */
/* (centro y = 180). Flechas de (320, centro) a (614, 180). Debajo de  */
/* la final, en x = 800: lo que decía la plataforma (y = 272 y 300).   */
/* Ancho 1000, alto 360.                                               */
/* ------------------------------------------------------------------ */

export function CuentaA01({ uid = "s5-cuenta" }: { uid?: string }) {
  const ras: [string, string][] = [
    ["RA1 · peso 15", "7 × 15 = 105"],
    ["RA2 · peso 20", "7,5 × 20 = 150"],
    ["RA3 · peso 10", "9 × 10 = 90"],
    ["RA8 · peso 15", "8 × 15 = 120"],
  ];
  return (
    <Figura
      uid={uid}
      ancho={1000}
      alto={360}
      etiqueta="La nota final de A01, a mano: RA1 con un 7 y peso 15, RA2 con un 7,5 y peso 20, RA3 con un 9 y peso 10 y RA8 con un 8 y peso 15. La suma de notas por pesos es 465; entre 60, que suman los pesos, da 7,75, es decir, 7,8. La plataforma decía 7,9 porque el peso de un RA no se guardaba y usaba 12,5 en todos."
      pie="Una nota hecha a mano, con calculadora, encontró el fallo más peligroso de toda la plataforma."
    >
      {ras.map(([t, l], i) => (
        <g key={t}>
          <Caja x={20} y={10 + i * 88} w={300} h={76} tono="morado" titulo={t} lineas={[l]} />
          <Flecha uid={uid} d={`M320 ${48 + i * 88} L614 180`} tono="morado" />
        </g>
      ))}
      <Caja x={620} y={130} w={360} h={100} tono="verde" titulo="(105 + 150 + 90 + 120) / 60" lineas={["= 7,75 → nota final 7,8"]} grosor={4} />
      <T x={800} y={272} ancla="middle" peso={800} color={fuerte("rosa")}>
        La plataforma decía 7,9
      </T>
      <T x={800} y={300} ancla="middle">
        usaba 12,5 en todos los RA
      </T>
    </Figura>
  );
}
