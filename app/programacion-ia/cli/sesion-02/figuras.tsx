import { RUBRICA_CLI } from "@/lib/campus/rubricas";
import { Caja, Figura, Flecha, T, TINTA, Zona, fuerte, linea, suave, type TonoSvg } from "../../_video/svg";

// Figuras de la Sesión 2 de la CLI (docs/paginas-para-video.md). Geometría
// calculada a mano y apuntada encima de cada figura, con las medidas de texto
// de _video/svg.tsx (sans 16 ≈ 9,5 px/car., negrita 18 ≈ 11,5, mono 16 ≈ 9,9,
// mono negrita 18 ≈ 11,2). Cada <text> es corto y único en toda la página: la
// cámara lo busca por su comienzo (el revisor avisa si uno empieza como otro).

/* ------------------------------------------------------------------ */
/* Producto: tu repo al acabar la semana                               */
/* Dos paneles 16..490 y 510..984 × 16..320. Raíz a y = 80; hijos cada */
/* 32 desde y = 116; conector a x = raíz + 10, ramas de 20, texto a     */
/* raíz + 36. El más largo (.opencode/skills/acciones-json/SKILL.md,   */
/* 39 car. mono ≈ 387) va del 570 al 957.                              */
/* ------------------------------------------------------------------ */

type Hoja = { f: string; nota?: string };

function ArbolSvg({ x, raiz, hojas, tono }: { x: number; raiz: string; hojas: Hoja[]; tono: TonoSvg }) {
  const cx = x + 10;
  const ultimo = 116 + (hojas.length - 1) * 32 - 6;
  return (
    <g>
      <text x={x} y={80} fontSize={18} fontWeight={800} fill={fuerte(tono)} className="font-mono">
        {raiz}
      </text>
      <path d={`M${cx} 88 V${ultimo}`} fill="none" stroke={linea("gris")} strokeWidth={2} />
      {hojas.map((h, i) => {
        const y = 116 + i * 32;
        return (
          <g key={h.f}>
            <path d={`M${cx} ${y - 6} H${cx + 20}`} fill="none" stroke={linea("gris")} strokeWidth={2} />
            <text x={cx + 26} y={y} fontSize={16}>
              <tspan className="font-mono" fontWeight={700} fill={TINTA}>
                {h.f}
              </tspan>
              {h.nota ? (
                <tspan fill="var(--dg-suave)" fontWeight={500}>
                  {` · ${h.nota}`}
                </tspan>
              ) : null}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function RepoFinal() {
  return (
    <Figura
      uid="repo"
      ancho={1000}
      alto={336}
      etiqueta="Tu repo al acabar la semana. Tu herramienta: acciones.json con 3 acciones tuyas probadas con --simular, el README con el esquema, y en src/tareas los ficheros errores, config, acciones, motor y cli. Tu proceso: la skill, el comando y el subagente revisor en .opencode, el ADR y los prompts en docs, y al menos 10 commits tuyos en GitHub."
      pie="A la izquierda, lo que hace tu herramienta; a la derecha, cómo la has construido con el agente."
    >
      <Zona x={16} y={16} w={474} h={304} tono="ambar" rotulo="Tu herramienta" />
      <Zona x={510} y={16} w={474} h={304} tono="morado" rotulo="Tu proceso" />
      <ArbolSvg
        x={36}
        raiz="cli-tareas/"
        tono="ambar"
        hojas={[
          { f: "acciones.json", nota: "3 acciones tuyas" },
          { f: "README.md", nota: "con el esquema" },
          { f: "src/tareas/errores.py", nota: "excepciones" },
          { f: "src/tareas/config.py", nota: "valida" },
          { f: "src/tareas/acciones.py", nota: "las clases" },
          { f: "src/tareas/motor.py", nota: "el motor" },
          { f: "src/tareas/cli.py", nota: "las órdenes" },
        ]}
      />
      <ArbolSvg
        x={534}
        raiz="y además…"
        tono="morado"
        hojas={[
          { f: ".opencode/skills/acciones-json/SKILL.md" },
          { f: ".opencode/commands/nueva-accion.md" },
          { f: ".opencode/agents/revisor.md" },
          { f: "docs/adr/0001-configuracion-externa.md" },
          { f: "docs/prompts.md" },
          { f: "≥ 10 commits", nota: "cuentan los de la Sesión 1" },
        ]}
      />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Configuración externa frente a código                               */
/* Rótulos de carril a x = 24. Carril 1 (y 60..136): cuatro cajas de  */
/* 172 desde x = 210 cada 196 (210 · 406 · 602 · 798, la última acaba */
/* en 970). Carril 2 (y 180..256): una caja de 368 (210..578) y otra de */
/* 172 (798..970), unidas por una flecha larga.                        */
/* ------------------------------------------------------------------ */

export function CodigoFrenteJson() {
  const u = "cambio";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={280}
      etiqueta="El mismo cambio, mover también los EPUB, hecho de dos formas. Si la acción está en el código: editar Python, probarlo otra vez entero, reinstalar y, por fin, listo tras tres pasos. Si está en acciones.json: cambiar una línea en el JSON y listo, sin tocar Python."
      pie="Si la acción es código, cada cambio pasa por tocar, probar y reinstalar. Si es configuración, cambias una línea."
    >
      <T x={24} y={36} peso={800} color={TINTA}>
        El cambio: mover también los EPUB
      </T>
      <T x={24} y={104} peso={800} color={fuerte("rosa")}>
        En el código
      </T>
      <T x={24} y={224} peso={800} color={fuerte("verde")}>
        En acciones.json
      </T>
      <Caja x={210} y={60} w={172} h={76} tono="ambar" titulo="Editar Python" lineas={["la función"]} />
      <Caja x={406} y={60} w={172} h={76} tono="ambar" titulo="Probarlo" lineas={["otra vez entero"]} />
      <Caja x={602} y={60} w={172} h={76} tono="ambar" titulo="Reinstalar" lineas={["la herramienta"]} />
      <Caja x={798} y={60} w={172} h={76} tono="gris" titulo="Por fin" lineas={["tras tres pasos"]} />
      <Caja x={210} y={180} w={368} h={76} tono="verde" titulo="Cambiar una línea" lineas={["en el JSON"]} grosor={3} />
      <Caja x={798} y={180} w={172} h={76} tono="verde" titulo="Listo" lineas={["sin tocar Python"]} />
      <Flecha uid={u} d="M382 98 H400" tono="ambar" />
      <Flecha uid={u} d="M578 98 H596" tono="ambar" />
      <Flecha uid={u} d="M774 98 H792" tono="ambar" />
      <Flecha uid={u} d="M578 218 H792" tono="verde" />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El recorrido de una acción                                          */
/* Fila principal y 64..140 (centro 102): cajas de 176 cada 210 desde  */
/* x = 16 (16 · 226 · 436 · 646 · 856; la última acaba en 1032). Debajo,*/
/* y 224..300: ConfigError bajo config.py y «Tu disco» bajo la acción. */
/* ------------------------------------------------------------------ */

export function RecorridoAccion() {
  const u = "recorrido";
  return (
    <Figura
      uid={u}
      ancho={1048}
      alto={316}
      etiqueta="El recorrido de una acción: el JSON que escribes tú lo carga y valida config.py; si algo falla, ConfigError y sale con un 3. Solo llega un JSON válido al Motor, que elige los ficheros; la acción se aplica a cada uno y la tabla Rich enseña qué va a dónde. Solo sin --simular se toca tu disco."
      pie="Solo un JSON válido llega al motor. Con --simular sale la misma tabla, pero nada toca el disco."
    >
      <T x={436} y={44}>
        solo llega un JSON válido
      </T>
      <Caja x={16} y={64} w={176} h={76} tono="ambar" titulo="El JSON" lineas={["lo escribes tú"]} />
      <Caja x={226} y={64} w={176} h={76} tono="azul" titulo="config.py" mono lineas={["carga y valida"]} />
      <Caja x={436} y={64} w={176} h={76} tono="morado" titulo="El motor" lineas={["elige ficheros"]} />
      <Caja x={646} y={64} w={176} h={76} tono="verde" titulo="La acción" lineas={["una por fichero"]} />
      <Caja x={856} y={64} w={176} h={76} tono="gris" titulo="Tabla Rich" lineas={["qué → dónde"]} />
      <Caja x={226} y={224} w={176} h={76} tono="rosa" titulo="Error de config" lineas={["sale con un 3"]} />
      <Caja x={646} y={224} w={176} h={76} tono="verde" titulo="Tu disco" lineas={["mueve, renombra…"]} />
      <Flecha uid={u} d="M192 102 H220" tono="ambar" />
      <Flecha uid={u} d="M402 102 H430" tono="azul" />
      <Flecha uid={u} d="M612 102 H640" tono="morado" />
      <Flecha uid={u} d="M822 102 H850" tono="verde" />
      <Flecha uid={u} d="M314 140 V218" tono="rosa" />
      <Flecha uid={u} d="M734 140 V218" tono="verde" />
      <T x={326} y={186}>
        si algo falla
      </T>
      <T x={746} y={186} peso={700} color={fuerte("verde")}>
        solo sin --simular
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Campo a campo de una acción                                         */
/* Caja del código 16..576 × 24..264; líneas mono cada 36 desde y = 64 */
/* (64 · 100 · 136 · 172 · 208 · 244), sangría a x = 40. La más larga  */
/* ("filtro": { "extensiones": [".pdf", ".docx"] },, 46 car. ≈ 456)   */
/* acaba en 496. Rótulos a x = 624 con su guion desde 584.             */
/* ------------------------------------------------------------------ */

const CAMPOS_FIG: { clave: string; resto: string; rotulo: string; obligatorio: boolean }[] = [
  { clave: '"nombre"', resto: ': "ordenar-descargas",', rotulo: "lo que escribes en tareas ejecutar", obligatorio: true },
  { clave: '"descripcion"', resto: ': "Mueve los PDF…",', rotulo: "lo que enseña tareas acciones", obligatorio: true },
  { clave: '"tipo"', resto: ': "mover",', rotulo: "qué clase Python la ejecuta", obligatorio: true },
  { clave: '"origen"', resto: ': "~/Descargas",', rotulo: "carpeta si no le pasas otra", obligatorio: false },
  { clave: '"filtro"', resto: ': { "extensiones": [".pdf", ".docx"] },', rotulo: "qué ficheros se tocan", obligatorio: false },
  { clave: '"destino"', resto: ': "~/Documentos/PDF"', rotulo: "a dónde van (se crea si no existe)", obligatorio: false },
];

export function AnatomiaAccion() {
  return (
    <Figura
      uid="anatomia"
      ancho={1000}
      alto={288}
      etiqueta="Una acción de acciones.json campo a campo: nombre es lo que escribes en tareas ejecutar; descripcion, lo que enseña tareas acciones; tipo, qué clase Python la ejecuta; origen, la carpeta si no le pasas otra; filtro, qué ficheros se tocan; destino, a dónde van, y se crea si no existe. Los tres primeros son obligatorios."
      pie="En azul, los campos obligatorios; en gris, los opcionales o los que pide cada tipo de acción."
    >
      <g data-caja="">
        <rect x={16} y={24} width={560} height={240} rx={12} fill="var(--dg-papel)" stroke={linea("gris")} strokeWidth={2} />
        {CAMPOS_FIG.map((c, i) => (
          <text key={c.clave} x={40} y={64 + i * 36} fontSize={16} className="font-mono">
            <tspan fontWeight={700} fill={c.obligatorio ? fuerte("azul") : "var(--dg-suave)"}>
              {c.clave}
            </tspan>
            <tspan fill={TINTA}>{c.resto}</tspan>
          </text>
        ))}
      </g>
      {CAMPOS_FIG.map((c, i) => {
        const y = 64 + i * 36;
        return (
          <g key={c.rotulo}>
            <path d={`M584 ${y - 6} H612`} fill="none" stroke={linea(c.obligatorio ? "azul" : "gris")} strokeWidth={2} strokeDasharray="4 4" />
            <T x={624} y={y} peso={c.obligatorio ? 700 : 500} color={c.obligatorio ? fuerte("azul") : "var(--dg-suave)"}>
              {c.rotulo}
            </T>
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El filtro como embudo                                               */
/* Ficheros: cajas de 260 × 36 a x = 24, centros cada 44 desde y = 64 */
/* (64 · 108 · 152 · 196 · 240). Líneas hasta la puerta (420..620 ×   */
/* 96..196, centro 520,146). Elegidos 700..980 × 108..184; los que se  */
/* quedan, 400..640 × 234..290.                                        */
/* ------------------------------------------------------------------ */

const FICHEROS_FIG: { f: string; pasa: boolean }[] = [
  { f: "factura.pdf", pasa: true },
  { f: "apuntes de redes.docx", pasa: true },
  { f: "FOTO1.JPG", pasa: false },
  { f: "cumpleaños 2.png", pasa: false },
  { f: "viejo.tmp", pasa: false },
];

export function EmbudoFiltro() {
  const u = "embudo";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={306}
      etiqueta="El filtro de ordenar-descargas como un embudo: de los cinco ficheros de pruebas, el filtro extensiones [.pdf, .docx] deja pasar factura.pdf y apuntes de redes.docx, que pasan a la acción; FOTO1.JPG, cumpleaños 2.png y viejo.tmp se quedan."
    >
      <T x={24} y={28} peso={800} color={TINTA}>
        Filtro de ordenar-descargas
      </T>
      {FICHEROS_FIG.map((f, i) => {
        const y = 64 + i * 44;
        return (
          <g key={f.f}>
            <g data-caja="">
              <rect x={24} y={y - 18} width={260} height={36} rx={8} fill="var(--dg-papel)" stroke={linea(f.pasa ? "verde" : "gris")} strokeWidth={2} />
              <text x={40} y={y + 6} fontSize={16} fill={TINTA} className="font-mono">
                {f.f}
              </text>
            </g>
            <path
              d={`M284 ${y} C 350 ${y}, 350 146, 414 146`}
              fill="none"
              stroke={linea(f.pasa ? "verde" : "gris")}
              strokeWidth={f.pasa ? 3 : 2}
              strokeDasharray={f.pasa ? undefined : "6 5"}
            />
          </g>
        );
      })}
      <Caja x={420} y={96} w={200} h={100} tono="azul" titulo="extensiones" mono lineas={["[.pdf, .docx]", "en minúsculas"]} />
      <Caja x={700} y={108} w={280} h={76} tono="verde" titulo="Elegidos · 2 de 5" lineas={["pasan a la acción"]} />
      <Caja x={400} y={234} w={240} h={56} tono="gris" titulo="Se quedan · 3 de 5" />
      <Flecha uid={u} d="M620 146 H694" tono="verde" />
      <Flecha uid={u} d="M520 196 V228" />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Cómo usa el agente tu skill                                         */
/* Fila y 110..186 (centro 148): cajas de 200 cada 240 desde x = 16   */
/* (16 · 256 · 496 · 736). «No la carga» bajo «¿Encaja?» (y 230..306); */
/* «@acciones-json» sobre «Carga la skill» (y 16..72).                 */
/* ------------------------------------------------------------------ */

export function CargaSkill() {
  const u = "skill";
  return (
    <Figura
      uid={u}
      ancho={960}
      alto={322}
      etiqueta="Cómo usa el agente tu skill: el agente ve el id y la description de cada skill; si encaja con lo que pides, carga la skill y lee SKILL.md entero, y trabaja con tu esquema; si no encaja, no la carga y ahorra contexto. Tú puedes forzarla escribiendo @acciones-json."
    >
      <Caja x={16} y={110} w={200} h={76} tono="gris" titulo="El agente ve" lineas={["id y description"]} />
      <Caja x={256} y={110} w={200} h={76} tono="ambar" titulo="¿Encaja?" lineas={["con lo que pides"]} />
      <Caja x={496} y={110} w={200} h={76} tono="morado" titulo="Carga la skill" lineas={["lee SKILL.md entero"]} />
      <Caja x={736} y={110} w={200} h={76} tono="verde" titulo="Trabaja" lineas={["con tu esquema"]} />
      <Caja x={256} y={230} w={200} h={76} tono="gris" titulo="No la carga" lineas={["ahorra contexto"]} />
      <Caja x={496} y={16} w={200} h={56} tono="azul" titulo="@acciones-json" mono />
      <Flecha uid={u} d="M216 148 H250" />
      <Flecha uid={u} d="M456 148 H490" tono="verde" />
      <Flecha uid={u} d="M696 148 H730" tono="morado" />
      <Flecha uid={u} d="M356 186 V224" />
      <Flecha uid={u} d="M596 72 V104" tono="azul" />
      <T x={473} y={138} ancla="middle" peso={800} color={fuerte("verde")}>
        sí
      </T>
      <T x={368} y={212} peso={800}>
        no
      </T>
      <T x={708} y={50}>
        tú la fuerzas
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Las excepciones heredan                                             */
/* Familia a x 80..380: TareasError 20..96 · ConfigError 136..212 ·    */
/* AccionNoValida 252..328 (huecos de 40 con la flecha «es un…»).      */
/* cli.py 600..960 × 20..120; typer.Exit 600..960 × 176..252.          */
/* ------------------------------------------------------------------ */

export function Excepciones() {
  const u = "errores";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={344}
      etiqueta="Las excepciones heredan: AccionNoValida es un ConfigError, y ConfigError es un TareasError. TareasError sale con 1 y ConfigError con 3. La CLI captura TareasError una sola vez y sale con typer.Exit y el código de salida de cada error."
      pie="La CLI captura TareasError una sola vez: cualquier error de la familia trae su propio código de salida."
    >
      <Caja x={80} y={20} w={300} h={76} tono="gris" titulo="TareasError" mono lineas={["base · sale con 1"]} />
      <Caja x={80} y={136} w={300} h={76} tono="ambar" titulo="ConfigError" mono lineas={["JSON roto · sale con 3"]} />
      <Caja x={80} y={252} w={300} h={76} tono="rosa" titulo="AccionNoValida" mono lineas={["acción, campo y motivo"]} />
      <Caja x={600} y={20} w={360} h={100} tono="azul" titulo="cli.py" mono lineas={["except TareasError as e:", "una sola captura para todo"]} />
      <Caja x={600} y={176} w={360} h={76} tono="verde" titulo="typer.Exit" mono lineas={["con e.codigo_salida"]} />
      <Flecha uid={u} d="M230 136 V102" tono="ambar" />
      <Flecha uid={u} d="M230 252 V218" tono="rosa" />
      <Flecha uid={u} d="M600 58 H386" tono="azul" />
      <Flecha uid={u} d="M780 120 V170" tono="verde" />
      <T x={242} y={124}>
        es un TareasError
      </T>
      <T x={242} y={240}>
        es un ConfigError
      </T>
      <T x={493} y={48} ancla="middle" peso={700} color={fuerte("azul")}>
        captura
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* La fábrica de acciones                                              */
/* Fila y 100..176 (centro 138): dict 16..226, fábrica 262..508,       */
/* registro 544..784 × 40..230 (entradas mono cada 36 desde y = 88),   */
/* objeto 820..984. Nota a y = 270.                                    */
/* ------------------------------------------------------------------ */

const REGISTRO: [string, boolean][] = [
  ["mover → Mover", true],
  ["copiar → Copiar", false],
  ["renombrar → Renombrar", false],
  ["borrar → Borrar", false],
];

export function Fabrica() {
  const u = "fabrica";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={290}
      etiqueta="La fábrica de acciones: el diccionario del JSON con tipo mover entra en Accion.desde_config, que busca en el registro (mover, copiar, renombrar y borrar, cada uno con su clase) y devuelve el objeto Mover(config). Ni un if por tipo: cada subclase se apunta sola al registro."
    >
      <Caja x={16} y={100} w={210} h={76} tono="ambar" titulo={'{"tipo": "mover"}'} mono lineas={["del JSON"]} />
      <Caja x={262} y={100} w={246} h={76} tono="morado" titulo="Accion.desde_config" mono lineas={["la fábrica"]} />
      <g data-caja="">
        <rect x={544} y={40} width={240} height={190} rx={12} fill="var(--dg-papel)" stroke={linea("azul")} strokeWidth={2} />
        <text x={560} y={68} fontSize={18} fontWeight={800} fill={fuerte("azul")} className="font-mono">
          _registro
        </text>
        {REGISTRO.map(([t, sel], i) => (
          <text
            key={t}
            x={560}
            y={104 + i * 34}
            fontSize={16}
            fontWeight={sel ? 800 : 500}
            fill={sel ? fuerte("verde") : "var(--dg-suave)"}
            className="font-mono"
          >
            {t}
          </text>
        ))}
      </g>
      <Caja x={820} y={100} w={164} h={76} tono="verde" titulo="Mover(config)" mono lineas={["el objeto"]} />
      <Flecha uid={u} d="M226 138 H256" tono="ambar" />
      <Flecha uid={u} d="M508 138 H538" tono="morado" />
      <Flecha uid={u} d="M784 98 H800 V138 H814" tono="verde" />
      <T x={16} y={270}>
        Ni un if por tipo: cada subclase se apunta sola al registro
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El recorrido de /nueva-accion                                       */
/* Dos filas de tres cajas de 300 cada 330 desde x = 16 (16 · 346 ·    */
/* 676): fila 1 y 30..106, fila 2 y 170..246. Del final de la fila 1  */
/* se baja a y = 138 y se vuelve a la izquierda hasta x = 166.         */
/* ------------------------------------------------------------------ */

export function RecorridoComando() {
  const u = "comando";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={262}
      etiqueta="El recorrido de /nueva-accion: tú lo lanzas con tu idea; el comando rellena $ARGUMENTS y mete el git status; build propone la entrada JSON y espera; tú das el visto bueno revisando filtro, plantilla y destino; edita y valida con uv run tareas validar; y tú lo pruebas en pruebas, con --simular."
      pie="El paso de tu visto bueno es el que mantiene la decisión en tus manos."
    >
      <Caja x={16} y={30} w={300} h={76} tono="gris" titulo="Tú lo lanzas" lineas={["/nueva-accion y tu idea"]} />
      <Caja x={346} y={30} w={300} h={76} tono="azul" titulo="El comando rellena" lineas={["$ARGUMENTS y git status"]} />
      <Caja x={676} y={30} w={300} h={76} tono="morado" titulo="build propone" lineas={["la entrada JSON, y espera"]} />
      <Caja x={16} y={170} w={300} h={76} tono="verde" titulo="Tu visto bueno" lineas={["¿filtro, plantilla, destino?"]} grosor={3.5} />
      <Caja x={346} y={170} w={300} h={76} tono="morado" titulo="Edita y valida" lineas={["uv run tareas validar"]} />
      <Caja x={676} y={170} w={300} h={76} tono="gris" titulo="Tú lo pruebas" lineas={["en pruebas, con --simular"]} />
      <Flecha uid={u} d="M316 68 H340" />
      <Flecha uid={u} d="M646 68 H670" />
      <Flecha uid={u} d="M826 106 V138 H166 V164" tono="morado" />
      <Flecha uid={u} d="M316 208 H340" tono="verde" />
      <Flecha uid={u} d="M646 208 H670" />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Lo que puede y no puede el revisor                                  */
/* Zonas 16..488 y 512..984 × 16..320. Cajas de 420 × 52 a x = 40 y    */
/* 536, cada 64 desde y = 60 (60 · 124 · 188 · 252).                   */
/* ------------------------------------------------------------------ */

const PUEDE: [string, boolean][] = [
  ["Leer tu código", false],
  ["git diff", true],
  ["git log", true],
  ["git status", true],
];
const NO_PUEDE = ["Editar ficheros", "Navegar por la web", "Otras órdenes", "Ejecutar tus acciones"];

export function PuedeRevisor() {
  return (
    <Figura
      uid="revisor"
      ancho={1000}
      alto={336}
      etiqueta="Lo que puede y no puede el subagente revisor. Puede, sin preguntar: leer tu código, git diff, git log y git status. No puede: editar ficheros, navegar por la web, otras órdenes ni ejecutar tus acciones."
      pie="Un subagente tuyo solo tiene sus permisos: no hereda los del agente que lo llama."
    >
      <Zona x={16} y={16} w={472} h={304} tono="verde" rotulo="Puede, sin preguntar" />
      <Zona x={512} y={16} w={472} h={304} tono="rosa" rotulo="No puede: deny" />
      {PUEDE.map(([t, mono], i) => (
        <Caja key={t} x={40} y={60 + i * 64} w={420} h={52} tono="verde" titulo={t} mono={mono} izquierda />
      ))}
      {NO_PUEDE.map((t, i) => (
        <Caja key={t} x={536} y={60 + i * 64} w={420} h={52} tono="rosa" titulo={t} izquierda />
      ))}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Un ADR, cuatro partes                                               */
/* Cajas de 220 × 100 cada 250 desde x = 16 (16 · 266 · 516 · 766),   */
/* y 70..170; flechas de 24 en los huecos de 30. Nota a y = 210.       */
/* ------------------------------------------------------------------ */

export function PartesAdr() {
  const u = "adr";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={230}
      etiqueta="Un ADR, cuatro partes: contexto, qué pasa y por qué hay que decidir; decisión, qué haces; alternativas, qué descartaste y por qué; consecuencias, lo bueno, lo malo y qué harás si cambia. No se borran: si cambias de opinión, un ADR nuevo sustituye al anterior."
    >
      <T x={16} y={40} peso={800} color={TINTA}>
        Un ADR, cuatro partes
      </T>
      <Caja x={16} y={70} w={220} h={100} tono="gris" titulo="Contexto" lineas={["qué pasa y por qué", "hay que decidir"]} />
      <Caja x={266} y={70} w={220} h={100} tono="azul" titulo="Decisión" lineas={["qué haces:", "acciones en JSON"]} />
      <Caja x={516} y={70} w={220} h={100} tono="ambar" titulo="Alternativas" lineas={["qué descartaste", "y por qué"]} />
      <Caja x={766} y={70} w={220} h={100} tono="verde" titulo="Consecuencias" lineas={["lo bueno, lo malo", "y qué harás si cambia"]} />
      <Flecha uid={u} d="M236 120 H260" />
      <Flecha uid={u} d="M486 120 H510" />
      <Flecha uid={u} d="M736 120 H760" />
      <T x={16} y={210}>
        No se borran: si cambias de opinión, un ADR nuevo sustituye al anterior
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Tu semana en commits (grafo de commits de GitHub, en vertical)      */
/* Carril main a x = 60 con su píldora arriba (y 20..46). Bolas de     */
/* radio 11 (halo 15 del color del fondo) cada 32 desde y = 76; el     */
/* mensaje a x = 90. El más largo (85 car. ≈ 808) acaba en 898.        */
/* ------------------------------------------------------------------ */

export function CommitsSemana({ mensajes }: { mensajes: string[] }) {
  const ultimo = 76 + (mensajes.length - 1) * 32;
  return (
    <Figura
      uid="commits"
      ancho={1000}
      alto={ultimo + 56}
      etiqueta={`Tu semana en commits, en la rama main: ${mensajes.join("; ")}. Y al final, git push a GitHub.`}
    >
      <rect x={30} y={20} width={60} height={26} rx={13} fill={suave("azul")} stroke={linea("azul")} strokeWidth={1.5} />
      <text x={60} y={38} fontSize={16} fontWeight={800} fill={fuerte("azul")} textAnchor="middle" className="font-mono">
        main
      </text>
      <path d={`M60 46 V${ultimo + 26}`} fill="none" stroke={linea("azul")} strokeWidth={3} />
      {mensajes.map((m, i) => {
        const y = 76 + i * 32;
        return (
          <g key={m}>
            <circle cx={60} cy={y} r={15} fill="var(--dg-fondo)" />
            <circle cx={60} cy={y} r={11} fill={linea("azul")} stroke="var(--dg-fondo)" strokeWidth={3} />
            <text x={90} y={y + 6} fontSize={16} fill={TINTA}>
              {m}
            </text>
          </g>
        );
      })}
      <text x={90} y={ultimo + 40} fontSize={16} fontWeight={700} fill={fuerte("verde")} className="font-mono">
        git push → GitHub
      </text>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* La semana de un vistazo                                             */
/* Dos filas de cuatro cajas de 220 × 76 cada 245 desde x = 16 (16 ·   */
/* 261 · 506 · 751; la última acaba en 971): fila 1 y 20..96, fila 2   */
/* y 136..212. Flechas de 19 en los huecos de 25; el cambio de fila    */
/* baja a y = 116 y vuelve a la izquierda hasta x = 126.               */
/* ------------------------------------------------------------------ */

const SEMANA: { titulo: string; linea: string; tono: TonoSvg }[] = [
  { titulo: "1 · Esquema", linea: "a mano, sin IA", tono: "ambar" },
  { titulo: "2 · Skill", linea: "enseñas tu esquema", tono: "morado" },
  { titulo: "3 · Validar", linea: "antes de ejecutar", tono: "azul" },
  { titulo: "4 · Motor", linea: "clases y --simular", tono: "azul" },
  { titulo: "5 · Comando", linea: "tus acciones 2 y 3", tono: "morado" },
  { titulo: "6 · Revisor", linea: "solo lectura", tono: "morado" },
  { titulo: "7 · ADR", linea: "tus razones", tono: "verde" },
  { titulo: "8 · Commits", linea: "y push a GitHub", tono: "verde" },
];

export function SemanaPasos() {
  const u = "semana";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={228}
      etiqueta="La semana de un vistazo, en ocho pasos: 1, el esquema, a mano y sin IA; 2, la skill que enseña tu esquema; 3, validar antes de ejecutar; 4, el motor en clases y con --simular; 5, el comando para tus acciones 2 y 3; 6, el revisor de solo lectura; 7, el ADR con tus razones; 8, los commits y el push a GitHub."
    >
      {SEMANA.map((p, i) => (
        <Caja key={p.titulo} x={16 + (i % 4) * 245} y={i < 4 ? 20 : 136} w={220} h={76} tono={p.tono} titulo={p.titulo} lineas={[p.linea]} />
      ))}
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <Flecha uid={u} d={`M${236 + k * 245} 58 H${255 + k * 245}`} />
          <Flecha uid={u} d={`M${236 + k * 245} 174 H${255 + k * 245}`} />
        </g>
      ))}
      <Flecha uid={u} d="M861 96 V116 H126 V130" />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Dónde estás en el proyecto                                          */
/* Línea a y = 70 de x = 100 a 900; hitos cada 200 (100 · 300 · 500 ·  */
/* 700 · 900); bola de radio 11; título a y = 112 y detalle a y = 136. */
/* Píldora «estás aquí» sobre la semana 2 (y 18..44).                  */
/* ------------------------------------------------------------------ */

const HITOS: { t: string; d: string; estado: "hecho" | "ahora" | "luego" }[] = [
  { t: "Semana 1", d: "Arranque", estado: "hecho" },
  { t: "Semana 2", d: "acciones.json y motor", estado: "ahora" },
  { t: "Semana 3", d: "MCP y capa IA", estado: "luego" },
  { t: "Semana 4", d: "pruebas y release", estado: "luego" },
  { t: "Entrega", d: "semi: 20 nov", estado: "luego" },
];

export function DondeEstas() {
  return (
    <Figura
      uid="semanas"
      ancho={1000}
      alto={156}
      etiqueta="Dónde estás en el proyecto 2: semana 1, arranque, hecha; semana 2, acciones.json y motor, estás aquí; luego la semana 3, MCP y capa IA; la semana 4, pruebas y release; y la entrega del semipresencial, el 20 de noviembre."
    >
      <path d="M100 70 H900" fill="none" stroke={linea("gris")} strokeWidth={3} />
      <rect x={252} y={18} width={96} height={26} rx={13} fill={suave("verde")} stroke={linea("verde")} strokeWidth={1.5} />
      <text x={300} y={36} fontSize={16} fontWeight={800} fill={fuerte("verde")} textAnchor="middle">
        estás aquí
      </text>
      {HITOS.map((h, i) => {
        const x = 100 + i * 200;
        const tono: TonoSvg = h.estado === "ahora" ? "verde" : h.estado === "hecho" ? "azul" : "gris";
        return (
          <g key={h.t}>
            <circle cx={x} cy={70} r={15} fill="var(--dg-fondo)" />
            <circle
              cx={x}
              cy={70}
              r={11}
              fill={h.estado === "luego" ? "var(--dg-fondo)" : linea(tono)}
              stroke={h.estado === "luego" ? linea("gris") : "var(--dg-fondo)"}
              strokeWidth={3}
            />
            <text x={x} y={112} fontSize={18} fontWeight={800} fill={fuerte(tono)} textAnchor="middle">
              {h.t}
            </text>
            <text x={x} y={136} fontSize={16} fontWeight={500} fill="var(--dg-suave)" textAnchor="middle">
              {h.d}
            </text>
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Peso de cada criterio de la rúbrica (datos reales de RUBRICA_CLI)   */
/* Filas cada 40 desde y = 40: rótulo a x = 16 (el más largo, 41 car. */
/* ≈ 390, acaba en 406); barra desde x = 450, 20 px por punto (el 20   */
/* llega a 850), alto 20.                                              */
/* ------------------------------------------------------------------ */

const ESTA_SEMANA = ["acciones", "configuracion", "robustez", "diseno"];

export function PesosRubrica() {
  const criterios = RUBRICA_CLI.criterios;
  const alto = 40 + criterios.length * 40;
  return (
    <Figura
      uid="pesos"
      ancho={1000}
      alto={alto}
      etiqueta={`Peso de cada criterio de la rúbrica sobre 100: ${criterios.map((c) => `${c.nombre}, ${c.peso}`).join("; ")}. Esta semana se juegan acciones, configuración externa, robustez y diseño en clases.`}
      pie="En azul, los criterios que se juegan casi enteros esta semana. Suman 60 de los 100 puntos."
    >
      {criterios.map((c, i) => {
        const y = 40 + i * 40;
        const ahora = ESTA_SEMANA.includes(c.id);
        return (
          <g key={c.id}>
            <text x={16} y={y + 6} fontSize={16} fontWeight={ahora ? 700 : 500} fill={ahora ? TINTA : "var(--dg-suave)"}>
              {`${c.nombre} · ${c.peso}`}
            </text>
            <rect x={450} y={y - 10} width={c.peso * 20} height={20} rx={6} fill={ahora ? linea("azul") : suave("gris")} stroke={ahora ? "none" : linea("gris")} />
          </g>
        );
      })}
    </Figura>
  );
}
