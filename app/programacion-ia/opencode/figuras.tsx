import { Caja, Figura, Flecha, T, TINTA, Zona, fuerte, linea, suave, type TonoSvg } from "../_video/svg";

// Figuras de la guía de OpenCode (docs/paginas-para-video.md). Geometría
// calculada a mano y apuntada encima de cada figura; las medidas de texto son
// las de _video/svg.tsx. Cada <text> es corto y único en toda la página.

/* ------------------------------------------------------------------ */
/* El camino de tu petición                                            */
/* Zona del instituto 16..790 × 16..284. Cajas a y = 70 (alto 76).     */
/* x: teclado 40..200 · OpenCode 270..470 · modelo 550..770 ·          */
/* Internet 832..986 · proyecto 270..470 × 186..262.                   */
/* ------------------------------------------------------------------ */

export function CaminoPeticion() {
  const u = "camino";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={300}
      etiqueta="El camino de una petición: escribes en tu teclado, OpenCode trabaja en tu terminal y le pregunta al modelo del centro, que responde; OpenCode lee, edita y ejecuta en tu proyecto. Todo ocurre dentro de la red del instituto; Internet no recibe nada."
      pie="El agente trabaja en tu equipo y piensa en el servidor del centro: nada sale del instituto."
    >
      <Zona x={16} y={16} w={774} h={268} tono="verde" rotulo="Red del instituto" />
      <Caja x={40} y={70} w={160} h={76} tono="gris" titulo="Tu teclado" lineas={["pides la tarea"]} />
      <Caja x={270} y={70} w={200} h={76} tono="azul" titulo="OpenCode" lineas={["en tu terminal"]} />
      <Caja x={550} y={70} w={220} h={76} tono="morado" titulo="Modelo del centro" lineas={["Qwen 3.8 Flash-Next"]} />
      <Caja x={270} y={186} w={200} h={76} tono="ambar" titulo="Tu proyecto" lineas={["lee, edita, ejecuta"]} />
      <Caja x={832} y={70} w={154} h={76} tono="gris" titulo="Internet" lineas={["no recibe nada"]} discontinua />

      <Flecha uid={u} d="M200 108 H264" />
      <Flecha uid={u} d="M470 96 H544" tono="azul" />
      <Flecha uid={u} d="M550 122 H476" tono="morado" />
      <Flecha uid={u} d="M370 146 V180" tono="ambar" />
      <Flecha uid={u} d="M770 108 H826" tono="rosa" discontinua />

      <T x={510} y={88} ancla="middle">pregunta</T>
      <T x={510} y={144} ancla="middle">responde</T>
      <T x={382} y={170}>herramientas</T>
      <T x={808} y={100} ancla="middle" tam={18} peso={800} color={fuerte("rosa")}>
        ✕
      </T>
      <T x={770} y={258} ancla="end" color={fuerte("verde")}>
        tu código y tus datos no salen
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Dónde vive cada fichero                                             */
/* Paneles 16..486 y 514..984 × 16..344. Raíces a y = 84; hijos cada  */
/* 36 desde y = 124. Conectores: x = 50 (izq.) y 548 (der.), ramas de  */
/* 20; texto de los hijos a x = 76 y 574. El más largo (.opencode/    */
/* skills/acciones-json/SKILL.md, 39 car. mono ≈ 387) acaba en 961.    */
/* ------------------------------------------------------------------ */

type Hoja = { f: string; nota?: string };

function Arbol({ x, raiz, hojas, tono }: { x: number; raiz: string; hojas: Hoja[]; tono: TonoSvg }) {
  const cx = x + 10;
  const ultimo = 124 + (hojas.length - 1) * 36 - 6;
  return (
    <g>
      <text x={x} y={84} fontSize={18} fontWeight={800} fill={fuerte(tono)} className="font-mono">
        {raiz}
      </text>
      <path d={`M${cx} 92 V${ultimo}`} fill="none" stroke={linea("gris")} strokeWidth={2} />
      {hojas.map((h, i) => {
        const y = 124 + i * 36;
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

export function DondeVive() {
  return (
    <Figura
      uid="donde"
      ancho={1000}
      alto={360}
      etiqueta="Dónde vive cada fichero. En tu equipo, solo para ti: ~/.config/opencode con opencode.json (proveedor y modelo), AGENTS.md (tus preferencias) y tus agentes, comandos y skills; las variables de entorno CENTRO_IA_URL y CENTRO_IA_KEY no están en ningún fichero. En tu repo, que se sube a git: AGENTS.md con las normas del proyecto, opencode.json con los permisos, el agente revisor, el comando nueva-accion, la skill acciones-json y tu código."
      pie="Lo de la izquierda es tuyo y no se sube a ningún sitio; lo de la derecha viaja con tu repo."
    >
      <Zona x={16} y={16} w={470} h={328} tono="morado" rotulo="Tu equipo · solo para ti" />
      <Zona x={514} y={16} w={470} h={328} tono="azul" rotulo="Tu repo · se sube a git" />
      <Arbol
        x={40}
        raiz="~/.config/opencode/"
        tono="morado"
        hojas={[
          { f: "opencode.json", nota: "proveedor y modelo" },
          { f: "AGENTS.md", nota: "tus preferencias" },
          { f: "agents/ · commands/ · skills/" },
        ]}
      />
      <Caja
        x={40}
        y={226}
        w={420}
        h={100}
        tono="ambar"
        titulo="Variables de entorno"
        lineas={["CENTRO_IA_URL · CENTRO_IA_KEY", "en ningún fichero"]}
      />
      <Arbol
        x={538}
        raiz="cli-tareas/"
        tono="azul"
        hojas={[
          { f: "AGENTS.md", nota: "normas del proyecto" },
          { f: "opencode.json", nota: "permisos" },
          { f: ".opencode/agents/revisor.md" },
          { f: ".opencode/commands/nueva-accion.md" },
          { f: ".opencode/skills/acciones-json/SKILL.md" },
          { f: "src/tareas/", nota: "tu código" },
        ]}
      />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Cuando el agente quiere actuar                                      */
/* Quiere actuar 16..216, reglas 266..486 (y 128..204, centro 166).    */
/* Veredictos x 556..736: allow 20..96 · ask 128..204 · deny 236..312. */
/* Respuestas x 796..988 (alto 64): 56 · 134 · 212 (centros 88·166·244).*/
/* ------------------------------------------------------------------ */

export function FlujoPermiso() {
  const u = "permiso";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={328}
      etiqueta="Qué pasa cuando el agente quiere actuar: OpenCode mira tus reglas y gana la última que coincide. Con allow lo hace sin más; con deny ni lo intenta; con ask te pregunta, y respondes once (vale, esta vez), always (vale y recuérdalo) o reject (no a lo pendiente). Si ninguna regla coincide, pregunta."
      pie={
        <>
          <b>always</b> guarda la regla como allow del proyecto. Los deny que tú configuras se respetan siempre, también por
          encima de lo que respondas.
        </>
      }
    >
      <Caja x={16} y={128} w={200} h={76} tono="gris" titulo="Quiere actuar" lineas={["edit, shell, read…"]} />
      <Caja x={266} y={128} w={220} h={76} tono="azul" titulo="Mira tus reglas" lineas={["gana la última"]} />
      <Caja x={556} y={20} w={180} h={76} tono="verde" titulo="allow" mono lineas={["lo hace sin más"]} />
      <Caja x={556} y={128} w={180} h={76} tono="ambar" titulo="ask" mono lineas={["te pregunta"]} />
      <Caja x={556} y={236} w={180} h={76} tono="rosa" titulo="deny" mono lineas={["ni lo intenta"]} />
      <Caja x={796} y={56} w={192} h={64} tono="ambar" titulo="once" mono lineas={["vale, esta vez"]} />
      <Caja x={796} y={134} w={192} h={64} tono="ambar" titulo="always" mono lineas={["vale y recuérdalo"]} />
      <Caja x={796} y={212} w={192} h={64} tono="ambar" titulo="reject" mono lineas={["no a lo pendiente"]} />

      {/* Tronco gris común y una rama de color por veredicto (si no, la última pisa el tronco). */}
      <Flecha uid={u} d="M216 166 H260" />
      <Flecha uid={u} d="M486 166 H516" punta={false} />
      <Flecha uid={u} d="M516 166 V58 H550" tono="verde" />
      <Flecha uid={u} d="M516 166 H550" tono="ambar" />
      <Flecha uid={u} d="M516 166 V274 H550" tono="rosa" />
      <Flecha uid={u} d="M736 166 H762 V88 H790" tono="ambar" />
      <Flecha uid={u} d="M762 166 H790" tono="ambar" />
      <Flecha uid={u} d="M762 166 V244 H790" tono="ambar" />

      <T x={376} y={236} ancla="middle">
        ninguna coincide → ask
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Subagentes: una sesión hija                                         */
/* Sesiones 16..416 y 584..984 × 20..210. Barras de contexto a y = 142 */
/* (ancho 352): la tuya llena un 20 %, la hija un 85 % (ilustrativo).  */
/* ------------------------------------------------------------------ */

function Sesion({
  x,
  tono,
  titulo,
  agente,
  contexto,
  lleno,
  pie,
}: {
  x: number;
  tono: TonoSvg;
  titulo: string;
  agente: string;
  contexto: string;
  lleno: number;
  pie: string;
}) {
  return (
    <g data-caja="">
      <rect x={x} y={20} width={400} height={190} rx={14} fill="var(--dg-papel)" stroke={linea(tono)} strokeWidth={2} />
      <text x={x + 24} y={58} fontSize={18} fontWeight={800} fill={fuerte(tono)}>
        {titulo}
      </text>
      <text x={x + 24} y={84} fontSize={16} fontWeight={500} fill="var(--dg-suave)">
        {agente}
      </text>
      <text x={x + 24} y={130} fontSize={16} fontWeight={700} fill={TINTA}>
        {contexto}
      </text>
      <rect x={x + 24} y={142} width={352} height={18} rx={9} fill={suave("gris")} stroke={linea("gris")} strokeWidth={1} />
      <rect x={x + 24} y={142} width={Math.round(352 * lleno)} height={18} rx={9} fill={linea(tono)} />
      <text x={x + 24} y={190} fontSize={16} fontWeight={500} fill="var(--dg-suave)">
        {pie}
      </text>
    </g>
  );
}

export function Subagentes() {
  const u = "sub";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={230}
      etiqueta="Subagentes: tu sesión con el agente build le encarga una subtarea a una sesión hija con el subagente explore. La hija llena su propio contexto con toda la búsqueda y te devuelve solo un resumen, así tu contexto apenas crece."
      pie="La sesión hija lee y busca todo lo que necesita; a la tuya solo vuelve el resumen."
    >
      <Sesion x={16} tono="azul" titulo="Tu sesión" agente="agente build" contexto="tu contexto" lleno={0.2} pie="solo el resumen" />
      <Sesion x={584} tono="ambar" titulo="Sesión hija" agente="subagente explore" contexto="su contexto" lleno={0.85} pie="toda la búsqueda" />
      <Flecha uid={u} d="M416 70 H578" tono="azul" />
      <Flecha uid={u} d="M584 120 H422" tono="ambar" />
      <T x={500} y={60} ancla="middle">
        le encarga
      </T>
      <T x={500} y={146} ancla="middle">
        te devuelve
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Capas que se fusionan                                               */
/* Cinco columnas de 176 con huecos de 24: x = 12 · 212 · 412 · 612 ·  */
/* 812 (la última acaba en 988). Capas a y = 20 (alto 76), reglas a    */
/* y = 152 (alto 56), estado a y = 234, resultados a y = 256 (alto 56).*/
/* ------------------------------------------------------------------ */

const CAPAS: { titulo: string; sub: string; regla: string; estado: string; tono: TonoSvg }[] = [
  { titulo: "Base", sub: "de OpenCode", regla: "todo: allow", estado: "lo permite la base", tono: "gris" },
  { titulo: "Global", sub: "tu equipo", regla: '"rm *": deny', estado: "lo niega la global", tono: "morado" },
  { titulo: "Proyecto", sub: "tu repo", regla: '"*": allow', estado: "lo permite: gana", tono: "azul" },
  { titulo: "Agente", sub: "plan, build…", regla: "—", estado: "sin reglas aquí", tono: "verde" },
  { titulo: "Políticas", sub: "solo niegan", regla: "shell:rm *", estado: "lo niega siempre", tono: "rosa" },
];

export function CapasFusion() {
  const u = "capas";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={324}
      etiqueta="Las configuraciones se fusionan en este orden: base de OpenCode, global, proyecto, agente y, al final, políticas. Para la orden rm -r build: la base lo permite, la global lo niega, el proyecto lo permite y, como gana la última, sin políticas rm queda permitido. La política shell:rm * lo niega siempre, así que con ella rm queda bloqueado."
      pie="Las reglas se leen de izquierda a derecha y gana la última que coincide. Las políticas van al final y solo pueden negar."
    >
      {CAPAS.map((c, i) => {
        const x = 12 + i * 200;
        return (
          <g key={c.titulo}>
            <Caja x={x} y={20} w={176} h={76} tono={c.tono} titulo={c.titulo} lineas={[c.sub]} />
            <Caja x={x} y={152} w={176} h={56} tono={c.tono} titulo={c.regla} mono grosor={i === 2 ? 3.5 : 2} />
            <T x={x + 88} y={234} ancla="middle">
              {c.estado}
            </T>
            {i < CAPAS.length - 1 ? <Flecha uid={u} d={`M${x + 176} 58 H${x + 194}`} /> : null}
          </g>
        );
      })}
      <text x={12} y={136} fontSize={16} fontWeight={700} fill={TINTA}>
        Reglas que coinciden con{" "}
        <tspan className="font-mono">rm -r build</tspan>
      </text>
      <Caja x={12} y={256} w={476} h={56} tono="rosa" titulo="Sin políticas: rm queda permitido" relleno={suave("rosa")} />
      <Caja x={512} y={256} w={476} h={56} tono="verde" titulo="Con la política: rm, bloqueado" relleno={suave("verde")} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Quién hace cada paso                                                */
/* Carriles de 70: Tú 60..130 · Plan 130..200 · Build 200..270.        */
/* Pasos de 120 × 52 cada 145 desde x = 142 (centros 202 · 347 · 492 · */
/* 637 · 782 · 927). La vuelta va por arriba, a y = 40.                */
/* ------------------------------------------------------------------ */

const CARRILES: { rotulo: string; tono: TonoSvg; y: number }[] = [
  { rotulo: "Tú decides", tono: "verde", y: 60 },
  { rotulo: "Plan piensa", tono: "morado", y: 130 },
  { rotulo: "Build hace", tono: "azul", y: 200 },
];

const PASOS: { titulo: string; carril: number; mono?: boolean }[] = [
  { titulo: "Intención", carril: 0 },
  { titulo: "Pide plan", carril: 1 },
  { titulo: "Hazlo", carril: 2 },
  { titulo: "Audita", carril: 0 },
  { titulo: "Commit", carril: 0 },
  { titulo: "/new", carril: 0, mono: true },
];

export function QuienHace() {
  const u = "quien";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={285}
      etiqueta="Quién hace cada paso del flujo: tú escribes la intención, el agente plan propone un plan, el agente build lo hace, y tú auditas, haces el commit y abres una sesión nueva para la siguiente tarea."
      pie="Tú decides al principio y al final; plan piensa y build hace en medio. Y vuelta a empezar con la siguiente tarea."
    >
      {CARRILES.map((c) => (
        <g key={c.rotulo}>
          <rect x={12} y={c.y} width={976} height={70} fill={suave(c.tono)} />
          <T x={24} y={c.y + 41} peso={800} color={fuerte(c.tono)}>
            {c.rotulo}
          </T>
        </g>
      ))}
      {PASOS.map((p, i) => {
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
/* Cuándo entra cada cosa en el contexto                               */
/* Rótulos x = 12; la sesión va de x = 230 a 988. Carriles de 40 cada  */
/* 52 desde y = 40. La skill carga entera en 600..820; el comando, en  */
/* 700..880. Ilustrativo: sin escala de tiempo ni de tokens.           */
/* ------------------------------------------------------------------ */

function Barra({ x, y, w, tono, texto, lleno = false }: { x: number; y: number; w: number; tono: TonoSvg; texto: string; lleno?: boolean }) {
  return (
    <g data-caja="">
      <rect x={x} y={y} width={w} height={40} rx={10} fill={lleno ? linea(tono) : suave(tono)} stroke={linea(tono)} strokeWidth={2} />
      <text
        x={lleno ? x + w / 2 : x + 14}
        y={y + 26}
        textAnchor={lleno ? "middle" : "start"}
        fontSize={16}
        fontWeight={700}
        fill={lleno ? "var(--dg-sobre-tono)" : fuerte(tono)}
      >
        {texto}
      </text>
    </g>
  );
}

export function CuandoSeCarga() {
  const u = "carga";
  const carriles = ["AGENTS.md (normas)", "Skill", "Comando", "MCP encendido"];
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={252}
      etiqueta="Cuándo entra cada cosa en el contexto a lo largo de una sesión: AGENTS.md se carga siempre; de una skill solo está su descripción hasta que el agente la carga entera; un comando entra solo cuando tú escribes /nombre; un MCP encendido ocupa el contexto con todas sus herramientas, siempre."
      pie="Lo que se carga siempre resta contexto a tu tarea: AGENTS.md corto y los MCP, apagados hasta que hagan falta."
    >
      <T x={230} y={24}>
        empieza la sesión
      </T>
      <T x={988} y={24} ancla="end">
        la sesión avanza →
      </T>
      {carriles.map((c, i) => (
        <T key={c} x={12} y={66 + i * 52} peso={700} color={TINTA}>
          {c}
        </T>
      ))}
      <Barra x={230} y={40} w={758} tono="azul" texto="se carga siempre" />
      <Barra x={230} y={92} w={758} tono="morado" texto="solo su descripción" />
      <Barra x={600} y={92} w={220} tono="morado" texto="carga completa" lleno />
      <Barra x={700} y={144} w={180} tono="verde" texto="tú: /nombre" lleno />
      <Barra x={230} y={196} w={758} tono="ambar" texto="todas sus herramientas, siempre" />
      <Flecha uid={u} d="M230 34 V238" punta={false} grosor={1.5} discontinua />
    </Figura>
  );
}
