import { RUBRICA_CLI } from "@/lib/campus/rubricas";
import { Caja, Figura, Flecha, T, TINTA, Zona, fuerte, linea, suave, type TonoSvg } from "../_video/svg";

// Figuras de la portada del proyecto 2 (docs/paginas-para-video.md).
// Geometría calculada a mano y apuntada encima de cada figura; medidas de texto
// de _video/svg.tsx (sans 16 ≈ 9,5 px/carácter, negrita 18 ≈ 11,5, mono 18 ≈
// 11,2). Cada <text> es corto y ÚNICO en toda la página, y ninguno es el
// principio de otro (por eso solo la anatomía dice «tareas» a secas).

/* ------------------------------------------------------------------ */
/* De la tarea pesada a una orden (el hilo del proyecto)               */
/* Cajas de 210 × 76 a y = 20, x = 20 · 270 · 520 · 770 (huecos de 40). */
/* La vuelta sale de la 4.ª (875, 96), baja a 140 y entra en la 3.ª.   */
/* ------------------------------------------------------------------ */

export function TareaAOrden() {
  const u = "hilo";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={184}
      etiqueta="El hilo del proyecto: una tarea pesada que haces a mano cada vez; la describes en acciones.json; la lanzas con una orden en tu terminal; queda hecha sola y siempre igual. Y la próxima vez la reutilizas con la misma orden."
      pie="Tu herramienta, útil para ti y reutilizable: lo que hoy te hace perder tiempo, mañana es una orden."
    >
      <Caja x={20} y={20} w={210} h={76} tono="gris" titulo="Tarea pesada" lineas={["a mano, cada vez"]} />
      <Caja x={270} y={20} w={210} h={76} tono="azul" titulo="La describes" lineas={["en acciones.json"]} />
      <Caja x={520} y={20} w={210} h={76} tono="morado" titulo="Una orden" lineas={["en tu terminal"]} />
      <Caja x={770} y={20} w={210} h={76} tono="verde" titulo="Hecha sola" lineas={["siempre igual"]} />
      <Flecha uid={u} d="M230 58 H264" />
      <Flecha uid={u} d="M480 58 H514" />
      <Flecha uid={u} d="M730 58 H764" />
      <Flecha uid={u} d="M875 96 V140 H625 V102" tono="verde" discontinua />
      <T x={750} y={164} ancla="middle" color={fuerte("verde")} peso={700}>
        y la reutilizas
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Terminal ⊃ shell ⊃ CLI                                              */
/* Zona terminal 16..984 × 16..284; zona shell 40..960 × 56..264.      */
/* Programas de 200 × 76 a y = 104, x = 64 · 288 · 512 · 736.          */
/* ------------------------------------------------------------------ */

export function CapasTerminal() {
  return (
    <Figura
      uid="capas-terminal"
      ancho={1000}
      alto={300}
      etiqueta="Terminal, shell y CLI, una dentro de otra: la terminal es la ventana; dentro corre una shell (bash, zsh o PowerShell); en ella escribes órdenes que lanzan programas de línea de órdenes como git, curl, uv y, dentro de dos semanas, tu propia CLI."
      pie="Abres una terminal, dentro corre una shell, y en ella escribes órdenes que lanzan CLI."
    >
      <Zona x={16} y={16} w={968} h={268} tono="gris" rotulo="Terminal · la ventana" />
      <Zona x={40} y={56} w={920} h={208} tono="azul" rotulo="Shell · el intérprete: bash, zsh o PowerShell" />
      <Caja x={64} y={104} w={200} h={76} tono="morado" titulo="git" mono lineas={["máquina del tiempo"]} />
      <Caja x={288} y={104} w={200} h={76} tono="morado" titulo="curl" mono lineas={["habla HTTP"]} />
      <Caja x={512} y={104} w={200} h={76} tono="morado" titulo="uv" mono lineas={["instala paquetes"]} />
      <Caja x={736} y={104} w={200} h={76} tono="verde" titulo="tu CLI" lineas={["dentro de 2 semanas"]} />
      <T x={64} y={226} mono peso={700} color={fuerte("verde")}>
        $ git log --oneline -5
      </T>
      <T x={936} y={226} ancla="end">
        tú escribes, la shell lanza
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Anatomía de una orden                                               */
/* Columnas de 100 · 116 · 216 · 170 · 156 con huecos de 20, desde     */
/* x = 31 (centros 81 · 209 · 395 · 608 · 791). Piezas en mono 18     */
/* (≈ 11,2 px/car. + 24): 92 · 116 · 216 · 148 · 126, centradas.       */
/* Piezas a y = 20 (alto 44), llave a 72-92, nombre a 116, texto a     */
/* 140 y 164.                                                          */
/* ------------------------------------------------------------------ */

const PIEZAS_ORDEN: { t: string; caja: number; cx: number; nombre: string; l1: string; l2: string; tono: TonoSvg }[] = [
  { t: "tareas", caja: 92, cx: 81, nombre: "programa", l1: "el comando", l2: "instalado", tono: "gris" },
  { t: "ejecutar", caja: 116, cx: 209, nombre: "subcomando", l1: "qué hacer", l2: "(un verbo)", tono: "azul" },
  { t: "ordenar-descargas", caja: 216, cx: 395, nombre: "argumento 1", l1: "qué acción ejecutar", l2: "(de acciones.json)", tono: "verde" },
  { t: "~/Descargas", caja: 148, cx: 608, nombre: "argumento 2", l1: "sobre qué carpeta", l2: "(opcional)", tono: "verde" },
  { t: "--simular", caja: 126, cx: 791, nombre: "opción (flag)", l1: "cómo: enseña qué", l2: "haría, sin tocar", tono: "ambar" },
];

export function AnatomiaOrden() {
  return (
    <Figura
      uid="anatomia"
      ancho={900}
      alto={184}
      etiqueta="Anatomía de la orden tareas ejecutar ordenar-descargas ~/Descargas --simular: tareas es el programa (el comando instalado); ejecutar, el subcomando (qué hacer); ordenar-descargas, el argumento 1 (qué acción de acciones.json); ~/Descargas, el argumento 2 (sobre qué carpeta, opcional); y --simular, una opción o flag (enseña qué haría sin tocar nada)."
      pie={
        <>
          Se lee como una frase: <i>«herramienta, haz esto, con esto, aquí, de esta manera»</i>.
        </>
      }
    >
      {PIEZAS_ORDEN.map((p) => {
        const x = p.cx - p.caja / 2;
        return (
          <g key={p.t}>
            <g data-caja="">
              <rect x={x} y={20} width={p.caja} height={44} rx={10} fill={suave(p.tono)} stroke={linea(p.tono)} strokeWidth={2} />
              <text x={p.cx} y={48} textAnchor="middle" fontSize={18} fontWeight={800} fill={fuerte(p.tono)} className="font-mono">
                {p.t}
              </text>
            </g>
            <path d={`M${x + 4} 72 V78 H${x + p.caja - 4} V72 M${p.cx} 78 V92`} fill="none" stroke={linea("gris")} strokeWidth={2} />
            <T x={p.cx} y={116} ancla="middle" peso={800} color={fuerte(p.tono)}>
              {p.nombre}
            </T>
            <T x={p.cx} y={140} ancla="middle">
              {p.l1}
            </T>
            <T x={p.cx} y={164} ancla="middle">
              {p.l2}
            </T>
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Una tubería: ls | fzf                                               */
/* ls 20..320, fzf 440..660, pantalla 780..980 (y 20..96).             */
/* stderr 20..320 × 156..232, colgando de ls (170, 96 → 150).          */
/* ------------------------------------------------------------------ */

export function Tuberia() {
  const u = "tuberia";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={248}
      etiqueta="Una tubería: ls escribe la lista de ficheros en su salida estándar; la tubería la conecta con la entrada estándar de fzf, donde eliges uno tecleando, y lo elegido sale por pantalla. Los avisos y fallos van aparte, por la salida de error, que se puede mandar a un fichero con 2> errores.txt."
      pie="Encadenar herramientas con tuberías (|): la salida de una es la entrada de otra."
    >
      <Caja x={20} y={20} w={300} h={76} tono="azul" titulo="ls" mono lineas={["lista los ficheros"]} />
      <Caja x={440} y={20} w={220} h={76} tono="morado" titulo="fzf" mono lineas={["eliges uno tecleando"]} />
      <Caja x={780} y={20} w={200} h={76} tono="gris" titulo="Tu pantalla" lineas={["solo lo elegido"]} />
      <Caja x={20} y={156} w={300} h={76} tono="rosa" titulo="stderr" mono lineas={["avisos y fallos, aparte"]} />
      <Flecha uid={u} d="M320 58 H434" tono="azul" />
      <Flecha uid={u} d="M660 58 H774" tono="morado" />
      <Flecha uid={u} d="M170 96 V150" tono="rosa" discontinua />
      <T x={380} y={48} ancla="middle">
        la tubería |
      </T>
      <T x={720} y={48} ancla="middle">
        su stdout
      </T>
      <T x={182} y={130} mono>
        2&gt; errores.txt
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El ciclo de desarrollo                                              */
/* Fila 1 (y 30..106): pasos 1-4 a x = 20 · 270 · 520 · 770 (ancho 210).*/
/* Fila 2 (y 170..246), de derecha a izquierda: 5 a 770, 6 a 520, 7 a  */
/* 270. La vuelta baja del 7 (375, 246) a 276, va a x = 125 y sube al  */
/* 1 (acaba en 112, 6 bajo su borde).                                  */
/* ------------------------------------------------------------------ */

const CICLO: { t: string; s: string; x: number; y: number; tono: TonoSvg }[] = [
  { t: "1 · Spec", s: "para quién y qué", x: 20, y: 30, tono: "azul" },
  { t: "2 · Interfaz", s: "las órdenes exactas", x: 270, y: 30, tono: "azul" },
  { t: "3 · Núcleo", s: "el motor, sin Typer", x: 520, y: 30, tono: "morado" },
  { t: "4 · Casos feos", s: "mensajes claros", x: 770, y: 30, tono: "ambar" },
  { t: "5 · Pruebas", s: "pytest", x: 770, y: 170, tono: "verde" },
  { t: "6 · Empaquetado", s: "comando instalable", x: 520, y: 170, tono: "verde" },
  { t: "7 · Release", s: "v1.0.0 etiquetada", x: 270, y: 170, tono: "gris" },
];

export function CicloDesarrollo() {
  const u = "ciclo";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={314}
      etiqueta="El ciclo de desarrollo de una CLI: 1, spec; 2, interfaz; 3, núcleo o motor; 4, errores y casos feos; 5, pruebas; 6, empaquetado e instalación; 7, release. Y vuelta a empezar con cada acción nueva."
      pie="Cada acción nueva repasa el ciclo en pequeño, con un commit al acabar cada paso."
    >
      {CICLO.map((c) => (
        <Caja key={c.t} x={c.x} y={c.y} w={210} h={76} tono={c.tono} titulo={c.t} lineas={[c.s]} />
      ))}
      <Flecha uid={u} d="M230 68 H264" />
      <Flecha uid={u} d="M480 68 H514" />
      <Flecha uid={u} d="M730 68 H764" />
      <Flecha uid={u} d="M875 106 V164" />
      <Flecha uid={u} d="M770 208 H736" />
      <Flecha uid={u} d="M520 208 H486" />
      <Flecha uid={u} d="M375 246 V276 H125 V112" tono="azul" discontinua />
      <T x={250} y={298} ancla="middle" peso={700} color={fuerte("azul")}>
        y vuelta a empezar
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Lo que Typer deduce de los tipos                                    */
/* Parámetros 20..380, resultado 600..980; filas a y = 20 · 120 · 220  */
/* (alto 76). Flechas de 380 a 594.                                    */
/* ------------------------------------------------------------------ */

export function TyperDeduce() {
  const u = "typer";
  const filas: [string, string, string, string][] = [
    ["nombre: str", "sin valor por defecto", "argumento obligatorio", "nombre  [required]"],
    ["veces: int = 1", "con valor por defecto", "opción con valor", "--veces  [default: 1]"],
    ["gritar: bool = False", "verdadero o falso", "flag con su contrario", "--gritar / --no-gritar"],
  ];
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={316}
      etiqueta="Lo que Typer deduce de los tipos: nombre: str, sin valor por defecto, se convierte en un argumento obligatorio; veces: int = 1, en una opción con valor por defecto 1; gritar: bool = False, en un flag con su contrario, --gritar y --no-gritar."
      pie="Argumento obligatorio, opciones con valor por defecto, un flag con su contrario y autocompletado para tu shell. Gratis."
    >
      {filas.map(([p, ps, r, rs], i) => {
        const y = 20 + i * 100;
        return (
          <g key={p}>
            <Caja x={20} y={y} w={360} h={76} tono="azul" titulo={p} mono lineas={[ps]} />
            <Caja x={600} y={y} w={380} h={76} tono="verde" titulo={r} lineas={[rs]} />
            <Flecha uid={u} d={`M380 ${y + 38} H594`} />
          </g>
        );
      })}
      <T x={490} y={46} ancla="middle" peso={700} color={TINTA}>
        Typer lo deduce
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Un código, tres sistemas                                            */
/* Código 350..650 × 16..116. Sistemas de 300 × 118 a y = 168:         */
/* x = 20 · 350 · 680. Ramas desde (500, 116) por y = 140.             */
/* ------------------------------------------------------------------ */

export function TresSistemas() {
  const u = "sistemas";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={300}
      etiqueta="Un mismo código Python, con pathlib, utf-8 y shutil, funciona en los tres sistemas. Linux: shell bash, separador /, fin de línea LF. Windows: shell PowerShell, separador \, fin de línea CRLF. macOS: shell zsh, también / y también LF."
      pie="Lo que cambia de un sistema a otro lo resuelven pathlib, la codificación explícita y .gitattributes."
    >
      <Caja x={350} y={16} w={300} h={100} tono="azul" titulo="Tu código Python" lineas={["pathlib · utf-8 · shutil", "el mismo en los tres"]} />
      <Caja x={20} y={168} w={300} h={118} tono="verde" titulo="Linux" lineas={["shell: bash", "separador /", "fin de línea LF"]} />
      <Caja x={350} y={168} w={300} h={118} tono="morado" titulo="Windows" lineas={["shell: PowerShell", "separador \\", "fin de línea CRLF"]} />
      <Caja x={680} y={168} w={300} h={118} tono="gris" titulo="macOS" lineas={["shell: zsh", "también usa /", "también LF"]} />
      <Flecha uid={u} d="M500 116 V140 H170 V162" />
      <Flecha uid={u} d="M500 116 V162" />
      <Flecha uid={u} d="M500 116 V140 H830 V162" />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Del nombre a tu código                                              */
/* Cinco cajas de 176 × 76 cada 200 desde x = 12 (y 20..96).           */
/* ------------------------------------------------------------------ */

export function DelNombreAlCodigo() {
  const u = "path";
  const pasos: [string, string, TonoSvg][] = [
    ["Tecleas", "el nombre", "gris"],
    ["La shell", "busca en el PATH", "azul"],
    ["Lo encuentra", "en ~/.local/bin", "morado"],
    ["Entry point", "«tareas.cli:app»", "ambar"],
    ["Tu programa", "app de cli.py", "verde"],
  ];
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={150}
      etiqueta="Del nombre a tu código: tecleas el nombre del comando; la shell lo busca en las carpetas del PATH; lo encuentra en ~/.local/bin; el ejecutable sigue el entry point tareas.cli:app de pyproject.toml; y arranca tu programa, la app de cli.py. En Windows el ejecutable es %USERPROFILE%\.local\bin\tareas.exe."
    >
      {pasos.map(([t, s, tono], i) => (
        <g key={t}>
          <Caja x={12 + i * 200} y={20} w={176} h={76} tono={tono} titulo={t} lineas={[s]} />
          {i < pasos.length - 1 ? <Flecha uid={u} d={`M${188 + i * 200} 58 H${206 + i * 200}`} /> : null}
        </g>
      ))}
      <T x={500} y={132} ancla="middle">
        En Windows: %USERPROFILE%\.local\bin\tareas.exe
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Por dónde pasa una orden                                            */
/* Columnas de 176 cada 200 desde x = 12. Fila A (y 20..96): tu orden  */
/* (col. 0) y acciones.json (col. 1). Fila B (y 150..226): cli.py,     */
/* config.py, motor.py, acciones.py y tus ficheros. Fila C (y 280..356):*/
/* errores.py bajo las columnas 1-2 (212..588).                        */
/* ------------------------------------------------------------------ */

export function RecorridoOrden() {
  const u = "recorrido";
  const fila: [string, string, TonoSvg, boolean][] = [
    ["cli.py", "habla contigo", "azul", true],
    ["config.py", "valida el JSON", "ambar", true],
    ["motor.py", "hace el trabajo", "morado", true],
    ["acciones.py", "mover, borrar…", "morado", true],
    ["Tus ficheros", "de prueba", "verde", false],
  ];
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={372}
      etiqueta="Por dónde pasa una orden: tu orden en la terminal entra por cli.py, que habla contigo; config.py lee y valida acciones.json, que escribes tú; motor.py hace el trabajo con la clase de acciones.py que toca (mover, borrar…) sobre tus ficheros de prueba. Si algo falla, errores.py da un mensaje claro, nunca un traceback."
      pie={
        <>
          <b>cli.py</b> habla con la persona, <b>motor.py</b> y <b>acciones.py</b> hacen el trabajo, <b>config.py</b> desconfía
          del JSON.
        </>
      }
    >
      <Caja x={12} y={20} w={176} h={76} tono="gris" titulo="Tu orden" lineas={["en la terminal"]} />
      <Caja x={212} y={20} w={176} h={76} tono="ambar" titulo="acciones.json" mono lineas={["lo escribes tú"]} />
      {fila.map(([t, s, tono, mono], i) => (
        <Caja key={t} x={12 + i * 200} y={150} w={176} h={76} tono={tono} titulo={t} mono={mono} lineas={[s]} />
      ))}
      <Caja x={212} y={280} w={376} h={76} tono="rosa" titulo="errores.py" mono lineas={["nunca un traceback"]} discontinua />
      <Flecha uid={u} d="M100 96 V144" />
      <Flecha uid={u} d="M300 96 V144" tono="ambar" />
      {[0, 1, 2, 3].map((i) => (
        <Flecha key={i} uid={u} d={`M${188 + i * 200} 188 H${206 + i * 200}`} />
      ))}
      <Flecha uid={u} d="M300 226 V274" tono="rosa" discontinua />
      <Flecha uid={u} d="M500 226 V274" tono="rosa" discontinua />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El calendario de los dos grupos                                     */
/* Semanas de 196 desde x = 194 (centros 292 · 488 · 684 · 880).       */
/* Presencial: barras de 184 × 70 a y = 60. Semipresencial: quincenas  */
/* de 380 × 70 a y = 150 (x = 200 y 592). Hitos a y = 236.             */
/* ------------------------------------------------------------------ */

export function Calendario() {
  const semanas = ["Semana 1 · 26-30 oct", "Semana 2 · 2-6 nov", "Semana 3 · 9-13 nov", "Semana 4 · 16-20 nov"];
  const sesiones: [string, string, TonoSvg][] = [
    ["Sesión 1", "arranque", "azul"],
    ["Sesión 2", "acciones y motor", "azul"],
    ["Sesión 3", "capa IA y MCP", "morado"],
    ["Sesión 4", "pruebas y v1.0", "verde"],
  ];
  return (
    <Figura
      uid="calendario"
      ancho={1000}
      alto={264}
      etiqueta="El calendario de los dos grupos. Presencial: sesión 1 (arranque) la semana del 26 al 30 de octubre, sesión 2 (acciones y motor) la del 2 al 6 de noviembre, sesión 3 (capa IA y MCP) la del 9 al 13 y sesión 4 (pruebas y release v1.0) la del 16 al 20. Semipresencial: quincena 3 del 26 de octubre al 6 de noviembre, con comprobación de proceso el 6 de noviembre, y quincena 4 del 9 al 20 de noviembre, con la entrega el 20 de noviembre."
    >
      {semanas.map((s, i) => (
        <g key={s}>
          <T x={292 + i * 196} y={36} ancla="middle" peso={700} color={TINTA}>
            {s}
          </T>
          {i > 0 ? <Flecha uid="calendario" d={`M${194 + i * 196} 48 V250`} punta={false} grosor={1.5} discontinua /> : null}
        </g>
      ))}
      <T x={20} y={101} peso={800} color={fuerte("azul")}>
        Presencial
      </T>
      <T x={20} y={191} peso={800} color={fuerte("morado")}>
        Semipresencial
      </T>
      {sesiones.map(([t, s, tono], i) => (
        <Caja key={t} x={200 + i * 196} y={60} w={184} h={70} tono={tono} titulo={t} lineas={[s]} />
      ))}
      <Caja x={200} y={150} w={380} h={70} tono="morado" titulo="Quincena 3" lineas={["26 oct → 6 nov"]} />
      <Caja x={592} y={150} w={380} h={70} tono="morado" titulo="Quincena 4" lineas={["9 → 20 nov"]} />
      <path d="M580 228 l8 8 l-8 8 l-8 -8 z" fill={linea("ambar")} />
      <path d="M972 228 l8 8 l-8 8 l-8 -8 z" fill={linea("rosa")} />
      <T x={566} y={242} ancla="end" peso={700} color={fuerte("ambar")}>
        comprobación 6 nov
      </T>
      <T x={958} y={242} ancla="end" peso={700} color={fuerte("rosa")}>
        entrega 20 nov
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Cuánto pesa cada criterio                                           */
/* Una fila cada 54 desde y = 36: rótulo con su peso y, 10 más abajo,  */
/* la barra (alto 18) de x = 20, a 40 px por punto (20 → 800).         */
/* ------------------------------------------------------------------ */

export function PesosRubrica() {
  const alto = 36 + (RUBRICA_CLI.criterios.length - 1) * 54 + 10 + 18 + 22;
  return (
    <Figura
      uid="pesos"
      ancho={1000}
      alto={alto}
      etiqueta={`Peso de cada criterio de la rúbrica sobre 100: ${RUBRICA_CLI.criterios.map((c) => `${c.nombre}, ${c.peso}`).join("; ")}.`}
      pie="Los siete criterios suman 100: pesan más las acciones (20); el resto, entre 10 y 15."
    >
      {RUBRICA_CLI.criterios.map((c, i) => {
        const y = 36 + i * 54;
        return (
          <g key={c.id}>
            <T x={20} y={y} peso={600} color={TINTA}>
              {`${c.nombre} · ${c.peso} %`}
            </T>
            <rect x={20} y={y + 10} width={800} height={18} rx={9} fill={suave("gris")} />
            <rect x={20} y={y + 10} width={c.peso * 40} height={18} rx={9} fill={linea("azul")} />
          </g>
        );
      })}
    </Figura>
  );
}
