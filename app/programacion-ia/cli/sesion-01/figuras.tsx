import { Caja, Figura, Flecha, T, TINTA, Zona, fuerte, linea, suave, type TonoSvg } from "../../_video/svg";

// Figuras de la Sesión 1 de la CLI (docs/paginas-para-video.md). Geometría
// calculada a mano y apuntada encima de cada figura; medidas de texto de
// _video/svg.tsx (sans 16 ≈ 9,5 px/car., negrita 18 ≈ 11,5, mono 16 ≈ 9,9).
// Cada <text> es corto y único en toda la página: ninguno es el principio de
// otro (por eso las rutas de la derecha de «Rutas» empiezan por «→»).

const SUAVE = "var(--dg-suave)";

/** Caja con título y líneas, cada una mono o no. Es un <g data-caja> (lo revisa el revisor). */
function CajaLineas({
  x,
  y,
  w,
  h,
  tono,
  titulo,
  lineas,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tono: TonoSvg;
  titulo: string;
  lineas: { t: string; mono?: boolean; color?: string }[];
}) {
  return (
    <g data-caja="">
      <rect x={x} y={y} width={w} height={h} rx={12} fill="var(--dg-papel)" stroke={linea(tono)} strokeWidth={2} />
      <text x={x + 16} y={y + 30} fontSize={18} fontWeight={800} fill={fuerte(tono)}>
        {titulo}
      </text>
      {lineas.map((l, i) => (
        <text
          key={l.t}
          x={x + 16}
          y={y + 54 + i * 24}
          fontSize={16}
          fontWeight={l.mono ? 700 : 500}
          fill={l.color ?? (l.mono ? TINTA : SUAVE)}
          className={l.mono ? "font-mono" : undefined}
        >
          {l.t}
        </text>
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Tu semana en 8 pasos                                                */
/* Nodos cada 123 desde x = 70 (último en 931), línea a y = 110, discos */
/* de radio 18. Rótulos alternos: pares debajo (152/174), impares      */
/* encima (58/80): los vecinos del mismo lado quedan a 246.            */
/* ------------------------------------------------------------------ */

const SEMANA: [string, string][] = [
  ["Terminal", "10 min"],
  ["Supervivencia", "15 min + reto"],
  ["Herramientas", "35 min"],
  ["Proyecto", "35 min"],
  ["Agente", "35 min"],
  ["Primera orden", "75 min"],
  ["Instalación", "15 min"],
  ["Revisión", "30 min"],
];

export function SemanaPasos() {
  const u = "s1semana";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={200}
      etiqueta="La sesión en 8 pasos: 1 terminal (10 min), 2 supervivencia (15 min y reto), 3 herramientas (35 min), 4 proyecto (35 min), 5 agente (35 min), 6 primera orden (75 min), 7 instalación (15 min) y 8 revisión (30 min). Unas 4 horas en total."
      pie="Unas 4 horas en total; la más larga es la del paso 6, tu primera orden con el agente."
    >
      <Flecha uid={u} d="M70 110 H931" punta={false} grosor={3} />
      {SEMANA.map(([nombre, dura], i) => {
        const x = 70 + i * 123;
        const arriba = i % 2 === 1;
        return (
          <g key={nombre}>
            <circle cx={x} cy={110} r={22} fill="var(--dg-fondo)" />
            <circle cx={x} cy={110} r={18} fill={linea("azul")} />
            <text x={x} y={116} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--dg-sobre-tono)">
              {i + 1}
            </text>
            <text x={x} y={arriba ? 58 : 152} textAnchor="middle" fontSize={16}>
              <tspan fontWeight={800} fill={TINTA}>
                {nombre}
              </tspan>
              <tspan x={x} dy={22} fontWeight={500} fill={SUAVE}>
                {dura}
              </tspan>
            </text>
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Lee el prompt                                                       */
/* Trozos en mono 20 negrita (≈ 12,4 px/car.) a y = 24 (alto 56):      */
/* ana 50..114 · aula-23 140..252 · ~/pruebas-tareas 274..498 · $      */
/* 564..604. Rótulos (alto 44) a y = 112, centrados bajo cada trozo:   */
/* 32..132 · 148..244 · 263..509 · 528..640.                           */
/* ------------------------------------------------------------------ */

const TROZOS: { t: string; x: number; w: number; tono: TonoSvg; rotulo: string; rw: number }[] = [
  { t: "ana", x: 50, w: 64, tono: "azul", rotulo: "usuario", rw: 100 },
  { t: "aula-23", x: 140, w: 112, tono: "morado", rotulo: "equipo", rw: 96 },
  { t: "~/pruebas-tareas", x: 274, w: 224, tono: "verde", rotulo: "carpeta: dónde estás", rw: 246 },
  { t: "$", x: 564, w: 40, tono: "ambar", rotulo: "tu turno", rw: 112 },
];

export function AnatomiaPrompt() {
  return (
    <Figura
      uid="s1prompt"
      ancho={680}
      alto={172}
      etiqueta="Anatomía del prompt ana@aula-23:~/pruebas-tareas$ : ana es el usuario, aula-23 el equipo, ~/pruebas-tareas la carpeta donde estás y el $ indica que es tu turno de escribir."
      pie="El prompt te dice quién eres, en qué equipo y, sobre todo, en qué carpeta estás. Tú escribes detrás del $."
    >
      {TROZOS.map((p) => {
        const cx = p.x + p.w / 2;
        return (
          <g key={p.t}>
            <rect x={p.x} y={24} width={p.w} height={56} rx={10} fill={suave(p.tono)} stroke={linea(p.tono)} strokeWidth={2} />
            <path d={`M${cx} 80 V112`} stroke={linea(p.tono)} strokeWidth={2} />
            <Caja x={cx - p.rw / 2} y={112} w={p.rw} h={44} tono={p.tono} titulo={p.rotulo} />
          </g>
        );
      })}
      {/* Un solo <text> con un tramo por trozo (x explícita, centrado): el prompt se lee
          entero y ningún trozo choca con otros textos de la página. */}
      <text y={61} textAnchor="middle" fontSize={20} fontWeight={800} className="font-mono">
        <tspan x={82} fill={fuerte("azul")}>
          ana
        </tspan>
        <tspan x={127} fill={SUAVE}>
          @
        </tspan>
        <tspan x={196} fill={fuerte("morado")}>
          aula-23
        </tspan>
        <tspan x={263} fill={SUAVE}>
          :
        </tspan>
        <tspan x={386} fill={fuerte("verde")}>
          ~/pruebas-tareas
        </tspan>
        <tspan x={584} fill={fuerte("ambar")}>
          $
        </tspan>
      </text>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Rutas absolutas y relativas                                         */
/* Árbol: filas cada 40 desde y = 60, sangría 32 por nivel desde x =   */
/* 40; el texto más largo acaba en 414 (← estás aquí). Tarjetas a la   */
/* derecha x 470..984: 40..116 · 132..208 · 224..348.                  */
/* ------------------------------------------------------------------ */

const NODOS: { nombre: string; nota?: string; nivel: number; padre: number | null }[] = [
  { nombre: "/", nota: " (la raíz)", nivel: 0, padre: null },
  { nombre: "home", nivel: 1, padre: 0 },
  { nombre: "ana", nota: " · ~ (tu carpeta)", nivel: 2, padre: 1 },
  { nombre: "Descargas", nivel: 3, padre: 2 },
  { nombre: "pruebas-tareas", nivel: 3, padre: 2 },
  { nombre: "fotos", nivel: 4, padre: 4 },
  { nombre: "IMG_0001.jpg", nivel: 5, padre: 5 },
];

export function Rutas() {
  const pos = NODOS.map((n, i) => ({ x: 40 + n.nivel * 32, y: 60 + i * 40 }));
  return (
    <Figura
      uid="s1rutas"
      ancho={1000}
      alto={364}
      etiqueta="Árbol de carpetas: la raíz contiene home, que contiene ana (tu carpeta personal, ~). Dentro de ana están Descargas y pruebas-tareas, donde estás. Dentro de pruebas-tareas está fotos con IMG_0001.jpg. Ruta absoluta: /home/ana/pruebas-tareas/fotos/IMG_0001.jpg; con ~: ~/pruebas-tareas/fotos/IMG_0001.jpg; relativa desde donde estás: fotos/IMG_0001.jpg. El punto es aquí, los dos puntos suben a ana y ../Descargas es la carpeta hermana."
      pie={
        <>
          Una ruta absoluta funciona estés donde estés; una relativa depende de tu carpeta actual (la que te dice{" "}
          <code className="font-mono">pwd</code>). En Windows la raíz es <code className="font-mono">C:\</code> y la carpeta
          personal <code className="font-mono">C:\Users\ana</code>, pero <code className="font-mono">~</code>,{" "}
          <code className="font-mono">.</code> y <code className="font-mono">..</code> funcionan igual en PowerShell.
        </>
      }
    >
      {NODOS.map((n, i) =>
        n.padre === null ? null : (
          <path
            key={`r${i}`}
            d={`M${pos[n.padre].x + 6} ${pos[n.padre].y + 8} V${pos[i].y - 5} H${pos[i].x - 6}`}
            fill="none"
            stroke={linea("gris")}
            strokeWidth={2}
          />
        ),
      )}
      <rect x={128} y={200} width={152} height={28} rx={8} fill={suave("azul")} stroke={linea("azul")} strokeWidth={2} />
      {NODOS.map((n, i) => (
        <text key={n.nombre} x={pos[i].x} y={pos[i].y} fontSize={16}>
          <tspan className="font-mono" fontWeight={700} fill={TINTA}>
            {n.nombre}
          </tspan>
          {n.nota ? (
            <tspan fontWeight={500} fill={SUAVE}>
              {n.nota}
            </tspan>
          ) : null}
        </text>
      ))}
      <T x={292} y={220} peso={800} color={fuerte("verde")}>
        ← estás aquí
      </T>

      <CajaLineas
        x={470}
        y={40}
        w={514}
        h={76}
        tono="morado"
        titulo="Ruta absoluta: empieza en /"
        lineas={[{ t: "→ /home/ana/pruebas-tareas/fotos/IMG_0001.jpg", mono: true }]}
      />
      <CajaLineas x={470} y={132} w={514} h={76} tono="azul" titulo="La misma con ~" lineas={[{ t: "→ ~/pruebas-tareas/fotos/IMG_0001.jpg", mono: true }]} />
      <CajaLineas
        x={470}
        y={224}
        w={514}
        h={124}
        tono="verde"
        titulo="Ruta relativa: desde donde estás"
        lineas={[
          { t: "→ fotos/IMG_0001.jpg", mono: true },
          { t: ". = aquí · .. = sube a ana" },
          { t: "../Descargas = la carpeta hermana" },
        ]}
      />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Permisos rwx                                                        */
/* Cadenas en mono 30 negrita; la de después se trocea en tspans con x */
/* explícita cada 18,6 (- · rwx · r-x · r-x) desde x = 460, así los    */
/* corchetes de debajo (y = 92) caen justo bajo cada grupo. Rótulos en */
/* dos filas (124 y 154) para que no se pisen.                         */
/* ------------------------------------------------------------------ */

const GRUPOS: { t: string; desde: number; n: number; rotulo: string; fila: 1 | 2; tono: TonoSvg }[] = [
  { t: "-", desde: 0, n: 1, rotulo: "tipo", fila: 1, tono: "gris" },
  { t: "rwx", desde: 1, n: 3, rotulo: "tú", fila: 2, tono: "verde" },
  { t: "r-x", desde: 4, n: 3, rotulo: "tu grupo", fila: 1, tono: "azul" },
  { t: "r-x", desde: 7, n: 3, rotulo: "el resto", fila: 2, tono: "morado" },
];

export function PermisosRwx() {
  const u = "s1rwx";
  const x0 = 460;
  const c = 18.6;
  return (
    <Figura
      uid={u}
      ancho={700}
      alto={180}
      etiqueta="Permisos de un fichero: antes, -rw-r--r--, nadie puede ejecutarlo. Tras chmod +x, -rwxr-xr-x: el primer carácter es el tipo; después tres letras para ti (rwx), tres para tu grupo (r-x) y tres para el resto (r-x). r es leer, w escribir y x ejecutar."
      pie={
        <>
          <b>r</b> leer · <b>w</b> escribir · <b>x</b> ejecutar. <code className="font-mono">chmod +x</code> añade la x.
        </>
      }
    >
      <T x={60} y={80} tam={30} peso={800} mono color={TINTA}>
        -rw-r--r--
      </T>
      <T x={153} y={124} ancla="middle">
        nadie puede ejecutarlo
      </T>
      <Flecha uid={u} d="M262 70 H446" tono="verde" />
      <T x={354} y={56} ancla="middle" mono peso={700} color={fuerte("verde")}>
        chmod +x
      </T>
      <text y={80} fontSize={30} fontWeight={800} className="font-mono">
        {GRUPOS.map((g) => (
          <tspan key={g.desde} x={x0 + g.desde * c} fill={fuerte(g.tono)}>
            {g.t}
          </tspan>
        ))}
      </text>
      {GRUPOS.map((g) => {
        const a = x0 + g.desde * c;
        const b = a + g.n * c;
        const cx = (a + b) / 2;
        return (
          <g key={g.rotulo}>
            <path d={`M${a + 2} 92 H${b - 2}`} stroke={linea(g.tono)} strokeWidth={3} />
            <path d={`M${cx} 92 V${g.fila === 1 ? 108 : 138}`} stroke={linea(g.tono)} strokeWidth={2} />
            <T x={cx} y={g.fila === 1 ? 124 : 154} ancla="middle" peso={800} color={fuerte(g.tono)}>
              {g.rotulo}
            </T>
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El PATH                                                             */
/* Zona del PATH 340..660 × 14..320; carpetas de 280 × 64 a x = 360,   */
/* y = 56 · 148 · 240 (centro x = 500). ls a la izquierda (40..240,    */
/* centro y = 180); resultado a la derecha (720..984, centro y = 272). */
/* ------------------------------------------------------------------ */

export function BuscaEnPath() {
  const u = "s1path";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={330}
      etiqueta="Cómo encuentra la terminal una orden: escribes ls -la y busca ls en las carpetas del PATH, en orden. En /home/ana/.local/bin no está, en /usr/local/bin tampoco, en /usr/bin sí: ejecuta /usr/bin/ls."
      pie="Si recorre todo el PATH sin encontrarla: «orden no encontrada». Por eso saludo.sh, que vive en tu carpeta de pruebas, se ejecuta con ./saludo.sh."
    >
      <Zona x={340} y={14} w={320} h={306} tono="azul" rotulo="El PATH, en orden" />
      <Caja x={360} y={56} w={280} h={64} tono="gris" titulo="/home/ana/.local/bin" mono lineas={["no está aquí"]} />
      <Caja x={360} y={148} w={280} h={64} tono="gris" titulo="/usr/local/bin" mono lineas={["tampoco"]} />
      <Caja x={360} y={240} w={280} h={64} tono="verde" titulo="/usr/bin" mono lineas={["¡aquí está!"]} />
      <Caja x={40} y={148} w={200} h={64} tono="morado" titulo="ls -la" mono lineas={["escribes la orden"]} />
      <Caja x={720} y={240} w={264} h={64} tono="verde" titulo="la ejecuta" lineas={["→ /usr/bin/ls"]} />
      <Flecha uid={u} d="M240 180 H300 V88 H354" tono="morado" />
      <Flecha uid={u} d="M500 120 V142" />
      <Flecha uid={u} d="M500 212 V234" />
      <Flecha uid={u} d="M640 272 H714" tono="verde" />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Las tres herramientas                                               */
/* Cajas de 210 × 76 a y = 30: git 16 · uv 246 · OpenCode 476; el     */
/* modelo del centro 770..984. Flecha 686 → 764 con «usa» encima.      */
/* ------------------------------------------------------------------ */

export function TresHerramientas() {
  const u = "s1herr";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={130}
      etiqueta="Las tres herramientas de la sesión: git guarda tu historial, uv gestiona Python y convierte tu código en un comando, y OpenCode es el agente, que usa el modelo del centro (Qwen 3.8 Flash-Next)."
      pie="Tres herramientas; la tercera es el agente, que piensa con el modelo del centro."
    >
      <Caja x={16} y={30} w={210} h={76} tono="gris" titulo="git · historial" lineas={["guarda cada paso"]} />
      <Caja x={246} y={30} w={210} h={76} tono="verde" titulo="uv · proyecto" lineas={["Python y tu comando"]} />
      <Caja x={476} y={30} w={210} h={76} tono="azul" titulo="OpenCode · agente" lineas={["programa contigo"]} />
      <Caja x={770} y={30} w={214} h={76} tono="morado" titulo="Modelo del centro" lineas={["Qwen 3.8 Flash-Next"]} />
      <Flecha uid={u} d="M686 68 H764" tono="azul" />
      <T x={725} y={58} ancla="middle">
        usa
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Qué entra en el repo                                                */
/* Zona «al repo» 16..576, filas cada 30 desde y = 80 (la más larga    */
/* acaba en 367). Zona «nunca» 600..984 con dos cajas de 336 × 76.     */
/* ------------------------------------------------------------------ */

const AL_REPO: [string, string][] = [
  ["pyproject.toml", "la ficha del proyecto"],
  ["uv.lock", "versiones exactas"],
  [".python-version", "Python 3.12"],
  ["README.md", "la portada (y tu spec)"],
  ["src/tareas/", "tu código"],
  [".gitignore", "lo que no entra"],
  [".gitattributes", "saltos de línea"],
];

export function QueVaAlRepo() {
  return (
    <Figura
      uid="s1repo"
      ancho={1000}
      alto={300}
      etiqueta="Qué entra en el repo y qué no. Al repo, con git add: pyproject.toml, uv.lock, .python-version, README.md, src/tareas, .gitignore y .gitattributes. Nunca al repo, porque lo frena el .gitignore: la carpeta .venv (pesa mucho y se regenera) y el fichero .env (tus claves)."
      pie="El .gitignore va en el primer commit: un secreto que entra en un commit se queda en el historial aunque lo borres."
    >
      <Zona x={16} y={16} w={560} h={268} tono="verde" rotulo="Al repo: lo subes con git add" />
      {AL_REPO.map(([f, nota], i) => (
        <text key={f} x={40} y={80 + i * 30} fontSize={16}>
          <tspan className="font-mono" fontWeight={700} fill={TINTA}>
            {f}
          </tspan>
          <tspan fontWeight={500} fill={SUAVE}>{` · ${nota}`}</tspan>
        </text>
      ))}
      <Zona x={600} y={16} w={384} h={268} tono="rosa" rotulo="Nunca al repo: lo frena .gitignore" />
      <Caja x={624} y={72} w={336} h={76} tono="rosa" titulo=".venv/" mono lineas={["pesa mucho; se regenera"]} />
      <Caja x={624} y={172} w={336} h={76} tono="rosa" titulo=".env" mono lineas={["tus claves: jamás"]} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Qué puede hacer tu agente                                           */
/* Tres zonas de 312 × 258 a x = 16 · 344 · 672; puntos cada 34 desde  */
/* y = 84, con un disco de radio 5 delante. El más largo (25 car.,     */
/* ≈ 245) cabe en los 266 que quedan. Sin «git status» ni «git push»   */
/* al principio: son títulos de CicloCommit y serían su prefijo.       */
/* ------------------------------------------------------------------ */

const ZONAS: { x: number; tono: TonoSvg; rotulo: string; puntos: string[] }[] = [
  {
    x: 16,
    tono: "verde",
    rotulo: "allow · lo hace solo",
    puntos: ["leer el proyecto", "ls, pwd, cat", "status, diff y log de git", "uv run tareas --help", "uv run tareas validar", "uv run pytest"],
  },
  {
    x: 344,
    tono: "ambar",
    rotulo: "ask · te pregunta",
    puntos: ["editar ficheros", "cualquier otra orden", "uv run tareas ejecutar", "hacer un commit", "leer una web", "salir del proyecto"],
  },
  {
    x: 672,
    tono: "rosa",
    rotulo: "deny · nunca",
    puntos: ["leer .env", "push y reset de git", "rm y sudo", "editar en plan y explore"],
  },
];

export function QuePuedeHacer() {
  return (
    <Figura
      uid="s1perm"
      ancho={1000}
      alto={290}
      etiqueta="Qué puede hacer tu agente con el opencode.json del proyecto. Lo hace solo (allow): leer el proyecto, ls, pwd, cat, git status, diff y log, uv run tareas --help, validar y pytest. Te pregunta (ask): editar ficheros, cualquier otra orden, uv run tareas ejecutar, git commit, leer una web y salir del proyecto. Nunca (deny): leer .env, git push y git reset, rm y sudo, y editar en los agentes plan y explore."
      pie="git push, git reset, rm y sudo van en policies: se aplican al final y solo pueden negar, así que ninguna regla las deshace."
    >
      {ZONAS.map((z) => (
        <g key={z.rotulo}>
          <Zona x={z.x} y={16} w={312} h={258} tono={z.tono} rotulo={z.rotulo} />
          {z.puntos.map((p, i) => (
            <g key={p}>
              <circle cx={z.x + 30} cy={84 + i * 34 - 6} r={5} fill={linea(z.tono)} />
              <T x={z.x + 46} y={84 + i * 34} peso={600} color={TINTA}>
                {p}
              </T>
            </g>
          ))}
        </g>
      ))}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El flujo con el agente (carriles)                                   */
/* Carriles de 70: Tú 60..130 · plan 130..200 · build 200..270. Pasos  */
/* de 120 × 52 cada 145 desde x = 142 (centros 202 · 347 · 492 · 637 · */
/* 782 · 927). La vuelta va por arriba, a y = 40.                      */
/* ------------------------------------------------------------------ */

const CARRILES: { rotulo: string; tono: TonoSvg; y: number }[] = [
  { rotulo: "Tú decides", tono: "verde", y: 60 },
  { rotulo: "plan piensa", tono: "morado", y: 130 },
  { rotulo: "build hace", tono: "azul", y: 200 },
];

const PASOS_FLUJO: { titulo: string; carril: number; mono?: boolean }[] = [
  { titulo: "Intención", carril: 0 },
  { titulo: "Pide plan", carril: 1 },
  { titulo: "Hazlo", carril: 2 },
  { titulo: "Audita", carril: 0 },
  { titulo: "Commit", carril: 0 },
  { titulo: "/new", carril: 0, mono: true },
];

export function FlujoCarriles() {
  const u = "s1flujo";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={285}
      etiqueta="Quién hace cada paso: tú escribes la intención, el agente plan te cuenta cómo lo haría, el agente build lo hace, y tú auditas, haces el commit y abres una sesión nueva para la siguiente tarea."
      pie="Tú decides al principio y al final; plan piensa y build hace en medio. El agente no decide qué hace tu herramienta."
    >
      {CARRILES.map((c) => (
        <g key={c.rotulo}>
          <rect x={12} y={c.y} width={976} height={70} fill={suave(c.tono)} />
          <T x={24} y={c.y + 41} peso={800} color={fuerte(c.tono)}>
            {c.rotulo}
          </T>
        </g>
      ))}
      {PASOS_FLUJO.map((p, i) => {
        const c = CARRILES[p.carril];
        return <Caja key={p.titulo} x={142 + i * 145} y={c.y + 9} w={120} h={52} tono={c.tono} titulo={p.titulo} mono={p.mono} />;
      })}
      <Flecha uid={u} d="M202 121 V165 H281" tono="morado" />
      <Flecha uid={u} d="M347 191 V235 H426" tono="azul" />
      <Flecha uid={u} d="M552 235 H637 V127" tono="verde" />
      <Flecha uid={u} d="M697 95 H716" tono="verde" />
      <Flecha uid={u} d="M842 95 H861" tono="verde" />
      <Flecha uid={u} d="M927 69 V40 H202 V63" discontinua />
      <T x={564} y={32} ancla="middle">
        siguiente tarea
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* uv run frente al comando instalado                                  */
/* Fila 1 (y = 30): «uv run tareas listar» 16..316 y «Tu código»       */
/* 704..984. Fila 2 (y = 150): «Instálala» 330..630 y ~/.local/bin     */
/* 704..984. Fila 3 (y = 270): «tareas listar» 16..316. Alto 76.       */
/* ------------------------------------------------------------------ */

export function ComandoInstalado() {
  const u = "s1inst";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={360}
      etiqueta="uv run tareas listar solo funciona dentro de cli-tareas y ejecuta tu código de src/tareas. uv tool install --editable . deja el comando tareas en ~/.local/bin, que está en el PATH y apunta a tu código; así tareas funciona en cualquier carpeta y siempre con tu código al día."
      pie="Con --editable, cuando cambias cli.py el comando instalado cambia también. Solo reinstalas si tocas pyproject.toml."
    >
      <Caja x={16} y={30} w={300} h={76} tono="gris" titulo="uv run tareas listar" mono lineas={["solo dentro de cli-tareas"]} />
      <Caja x={704} y={30} w={280} h={76} tono="azul" titulo="Tu código" lineas={["src/tareas/ al día"]} />
      <Caja x={330} y={150} w={300} h={76} tono="morado" titulo="Instálala" lineas={["uv tool install --editable ."]} />
      <Caja x={704} y={150} w={280} h={76} tono="verde" titulo="~/.local/bin" mono lineas={["carpeta en el PATH"]} />
      <Caja x={16} y={270} w={300} h={76} tono="verde" titulo="tareas listar" mono lineas={["en cualquier carpeta"]} />

      <Flecha uid={u} d="M316 68 H698" />
      <Flecha uid={u} d="M630 188 H698" tono="morado" />
      <Flecha uid={u} d="M844 150 V112" tono="azul" discontinua />
      <Flecha uid={u} d="M316 308 H844 V232" tono="verde" />
      <T x={507} y={58} ancla="middle">
        ejecuta
      </T>
      <T x={832} y={136} ancla="end">
        --editable: apunta a
      </T>
      <T x={560} y={298} ancla="middle">
        la busca en el PATH
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Tus commits de la semana (grafo de commits, estilo GitHub)          */
/* Carril de main a x = 60 (píldora con su nombre arriba), bolas de    */
/* radio 11 cada 56 desde y = 80 (la más nueva arriba), mensaje a      */
/* x = 90. El más largo (85 car. ≈ 808) acaba en 898.                  */
/* ------------------------------------------------------------------ */

const COMMITS_SEMANA = [
  "Guarda el prompt de la orden listar y lo que corregí",
  "Añade las órdenes version y listar con tabla Rich",
  "Escribe la spec v0 de la herramienta en el README",
  "Añade opencode.json con los permisos del agente y AGENTS.md con las normas del proyecto",
  "Crea el proyecto con uv y Typer, con .gitignore y .gitattributes",
];

export function CommitsSemana() {
  return (
    <Figura
      uid="s1commits"
      ancho={1000}
      alto={340}
      etiqueta="Historial de la rama main al acabar la semana, del más reciente al más antiguo: guarda el prompt de listar; añade las órdenes version y listar; escribe la spec v0; añade opencode.json y AGENTS.md; crea el proyecto con uv y Typer con .gitignore y .gitattributes."
      pie="Cinco commits tuyos, cada uno un paso con sentido: es el historial real que pide la rúbrica."
    >
      <path d="M60 48 V316" stroke={linea("azul")} strokeWidth={3} />
      <rect x={30} y={18} width={60} height={30} rx={15} fill={suave("azul")} stroke={linea("azul")} strokeWidth={2} />
      <T x={60} y={39} ancla="middle" mono peso={800} color={fuerte("azul")}>
        main
      </T>
      {COMMITS_SEMANA.map((m, i) => {
        const y = 80 + i * 56;
        return (
          <g key={m}>
            <circle cx={60} cy={y} r={15} fill="var(--dg-fondo)" />
            <circle cx={60} cy={y} r={11} fill={linea("azul")} stroke="var(--dg-fondo)" strokeWidth={3} />
            <T x={90} y={y + 6} peso={500} color={TINTA}>
              {m}
            </T>
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Antes de pedir ayuda                                                */
/* Tres cajas de 300 × 76 a y = 16: x = 16 · 350 · 684; flechas de 28.  */
/* ------------------------------------------------------------------ */

export function PedirAyuda() {
  const u = "s1ayuda";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={108}
      etiqueta="Antes de pedir ayuda: primero lee el error entero, que casi siempre dice qué pasa; después busca el síntoma en las tarjetas de abajo; y si sigues atascado, pregunta con la orden, el error y tu sistema."
      pie="Y nunca pegues una clave en un chat."
    >
      <Caja x={16} y={16} w={300} h={76} tono="azul" titulo="Lee el error entero" lineas={["casi siempre dice qué pasa"]} />
      <Caja x={350} y={16} w={300} h={76} tono="morado" titulo="Busca el síntoma" lineas={["en las tarjetas de abajo"]} />
      <Caja x={684} y={16} w={300} h={76} tono="verde" titulo="Pregunta con todo" lineas={["orden + error + tu sistema"]} />
      <Flecha uid={u} d="M316 54 H344" />
      <Flecha uid={u} d="M650 54 H678" />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Cómo llega OpenCode al centro                                       */
/* Variables (330 × 64) a x = 16, y = 16 · 98 · 180 (centros 48 · 130 · */
/* 212). «Tu OpenCode» 430..680 × 92..168 (centro y = 130); servidor   */
/* 740..984. Las de arriba y abajo bajan o suben por x = 388 y entran  */
/* a 112 y 148; todas las puntas acaban a 6 del borde (x = 424).        */
/* ------------------------------------------------------------------ */

export function ConexionCentro() {
  const u = "s1conexion";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={260}
      etiqueta="Cómo llega OpenCode a los modelos del centro: lee tres variables de entorno de tu equipo, CENTRO_IA_URL con la dirección (termina en /v1), CENTRO_IA_KEY con tu clave y NODE_EXTRA_CA_CERTS con el certificado del centro; con ellas y tu config global habla por https con el servidor del centro, que usa un certificado propio del instituto."
      pie="Las tres variables viven en tu equipo, nunca en el repo. La URL y la clave te las da el profesor; el certificado lo descargas de la plataforma."
    >
      <Caja x={16} y={16} w={330} h={64} tono="azul" titulo="CENTRO_IA_URL" mono lineas={["la dirección (termina en /v1)"]} />
      <Caja x={16} y={98} w={330} h={64} tono="ambar" titulo="CENTRO_IA_KEY" mono lineas={["tu clave"]} />
      <Caja x={16} y={180} w={330} h={64} tono="verde" titulo="NODE_EXTRA_CA_CERTS" mono lineas={["el certificado del centro"]} />
      <Caja x={430} y={92} w={250} h={76} tono="morado" titulo="Tu OpenCode" lineas={["lee tu config global"]} />
      <Caja x={740} y={92} w={244} h={76} tono="gris" titulo="Servidor del centro" lineas={["https · CA propia"]} />
      <Flecha uid={u} d="M346 48 H388 V112 H424" tono="azul" />
      <Flecha uid={u} d="M346 130 H424" tono="ambar" />
      <Flecha uid={u} d="M346 212 H388 V148 H424" tono="verde" />
      <Flecha uid={u} d="M680 130 H734" tono="morado" />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El commit lo haces tú                                               */
/* Zona 6..994 × 8..132. Cajas de 176 × 76 a y = 46: x = 16 · 216 ·    */
/* 416 · 616 · 816 (centros 104 · 304 · 504 · 704 · 904); flechas a    */
/* y = 84, de 192 a 210, etc. Agente 584..824 × 160..224, sube a git   */
/* commit (x = 704) y acaba a 6 de su borde (128).                      */
/* ------------------------------------------------------------------ */

const CICLO: [string, string][] = [
  ["git status", "¿qué ha cambiado?"],
  ["git diff", "repásalo entero"],
  ["git add", "por su nombre"],
  ["git commit", "con tu mensaje"],
  ["git push", "lo subes tú"],
];

export function CicloCommit() {
  const u = "s1ciclo";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={236}
      etiqueta="El commit lo haces tú, en tu terminal: git status para ver qué ha cambiado, git diff para repasarlo entero, git add de cada fichero por su nombre, git commit con tu mensaje y git push. El agente solo te propone el texto del mensaje."
      pie="El agente solo te propone el texto; git commit y git push los escribes tú."
    >
      <Zona x={6} y={8} w={988} h={124} tono="verde" rotulo="Lo haces tú, en tu terminal" />
      {CICLO.map(([orden, nota], i) => (
        <Caja key={orden} x={16 + i * 200} y={46} w={176} h={76} tono="verde" titulo={orden} mono lineas={[nota]} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Flecha key={i} uid={u} d={`M${192 + i * 200} 84 H${210 + i * 200}`} tono="verde" />
      ))}
      <Caja x={584} y={160} w={240} h={64} tono="morado" titulo="Te lo propone" lineas={["el agente, solo texto"]} discontinua />
      <Flecha uid={u} d="M704 160 V128" tono="morado" discontinua />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Lo que entregas                                                     */
/* Zonas 16..576 y 600..984, de 16 a 284. Filas cada 34 desde y = 80   */
/* (la última en 250). La más larga de la izquierda acaba en ≈ 380; la */
/* de la derecha (30 car., ≈ 285) en ≈ 930.                             */
/* ------------------------------------------------------------------ */

const EN_EL_REPO: [string, string][] = [
  ["README.md", "con tu spec"],
  ["opencode.json", "los permisos"],
  ["AGENTS.md", "las normas"],
  ["src/tareas/cli.py", "tu orden listar"],
  ["docs/prompts.md", "tu bitácora"],
  [".gitignore", "desde el primer commit"],
];

const EN_TU_EQUIPO = ["el comando tareas, instalado", "~/pruebas-tareas con ejemplos", "variables del centro", "certificado del centro"];

export function EntregaSemana() {
  return (
    <Figura
      uid="s1entrega"
      ancho={1000}
      alto={300}
      etiqueta="Lo que tienes al acabar la semana. En tu repo público de GitHub, con al menos 4 commits tuyos: README.md con tu spec, opencode.json con los permisos, AGENTS.md con las normas, src/tareas/cli.py con tu orden listar, docs/prompts.md como bitácora y el .gitignore desde el primer commit. En tu equipo: el comando tareas instalado, la carpeta ~/pruebas-tareas con ejemplos, las variables y el certificado del centro."
      pie="Lo de la izquierda se entrega; lo de la derecha se queda en tu equipo (y las claves, jamás en el repo)."
    >
      <Zona x={16} y={16} w={560} h={268} tono="azul" rotulo="Tu repo en GitHub: público, 4+ commits" />
      {EN_EL_REPO.map(([f, nota], i) => (
        <text key={f} x={40} y={80 + i * 34} fontSize={16}>
          <tspan className="font-mono" fontWeight={700} fill={TINTA}>
            {f}
          </tspan>
          <tspan fontWeight={500} fill={SUAVE}>{` · ${nota}`}</tspan>
        </text>
      ))}
      <Zona x={600} y={16} w={384} h={268} tono="verde" rotulo="En tu equipo" />
      {EN_TU_EQUIPO.map((t, i) => (
        <g key={t}>
          <circle cx={630} cy={74 + i * 34} r={5} fill={linea("verde")} />
          <T x={646} y={80 + i * 34} peso={600} color={TINTA}>
            {t}
          </T>
        </g>
      ))}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* La semana que viene                                                 */
/* Tres cajas de 290 × 76 a y = 24: x = 16 · 355 · 694 (acaba en 984). */
/* Flechas 306 → 349 y 645 → 688.                                      */
/* ------------------------------------------------------------------ */

export function SiguienteSemana() {
  const u = "s1siguiente";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={124}
      etiqueta="De esta semana a la siguiente: hoy tu herramienta solo mira una carpeta con tareas listar; la semana que viene describes tus 3 acciones en acciones.json y el motor las ejecuta, siempre con --simular primero."
      pie="Y tu agente sube de nivel: una skill, un comando propio y un subagente revisor."
    >
      <Caja x={16} y={24} w={290} h={76} tono="verde" titulo="Hoy: tareas listar" lineas={["mira una carpeta"]} />
      <Caja x={355} y={24} w={290} h={76} tono="azul" titulo="Tu acciones.json" lineas={["tus 3 acciones, por ti"]} />
      <Caja x={694} y={24} w={290} h={76} tono="morado" titulo="El motor" lineas={["las ejecuta con --simular"]} />
      <Flecha uid={u} d="M306 62 H349" />
      <Flecha uid={u} d="M645 62 H688" />
    </Figura>
  );
}
