import { RUBRICA_CLI } from "@/lib/campus/rubricas";
import { Barra, Caja, Figura, Flecha, Halo, SUAVE, T, TINTA, Zona, an, fuerte, linea, suave, type TonoSvg } from "../../_video/svg";

// Figuras de la Sesión 3 de la CLI (docs/paginas-para-video.md). Todas son
// ANIMADAS: se construyen pieza a pieza cuando entran en pantalla (en una toma
// grabada) y salen terminadas en la captura quieta. Geometría calculada a mano y
// apuntada encima de cada figura, con las medidas de texto de _video/svg.tsx
// (sans 16 ≈ 9,5 px/car., negrita 18 ≈ 11,5, mono 16 ≈ 9,9, mono negrita 18 ≈
// 11,2). Cada <text> es corto y único en toda la página, y ninguno es el
// principio de otro: la cámara lo busca por su comienzo. Las cifras (tokens,
// segundos, nombres que propone el modelo) son las de la CLI de referencia
// ejecutada contra el servidor del centro el 9-11-2026.

/* ------------------------------------------------------------------ */
/* Producto: tu repo al acabar la semana                               */
/* Dos zonas 16..490 y 510..984 × 16..336. Raíz a y = 80; hojas cada   */
/* 32 desde y = 116; texto de la hoja a raíz + 36. La más larga de la  */
/* izquierda («src/tareas/acciones.py · + tipos con IA», ≈ 380) acaba  */
/* en 452; la de la derecha (.opencode/skills/…/SKILL.md, 39 car. mono */
/* ≈ 386) va del 570 al 956.                                           */
/* ------------------------------------------------------------------ */

type Hoja = { f: string; nota?: string };

function ArbolSvg({ x, raiz, hojas, tono, desde }: { x: number; raiz: string; hojas: Hoja[]; tono: TonoSvg; desde: number }) {
  const cx = x + 10;
  const ultimo = 116 + (hojas.length - 1) * 32 - 6;
  return (
    <g>
      <text x={x} y={80} fontSize={18} fontWeight={800} fill={fuerte(tono)} className="font-mono" {...an("funde", desde)}>
        {raiz}
      </text>
      <path d={`M${cx} 88 V${ultimo}`} fill="none" stroke={linea("gris")} strokeWidth={2} pathLength={1} {...an("traza", desde + 0.2, 0.25 * hojas.length)} />
      {hojas.map((h, i) => {
        const y = 116 + i * 32;
        return (
          <g key={h.f} {...an("desliza", desde + 0.3 + i * 0.25, 0.45)}>
            <path d={`M${cx} ${y - 6} H${cx + 20}`} fill="none" stroke={linea("gris")} strokeWidth={2} />
            <text x={cx + 26} y={y} fontSize={16}>
              <tspan className="font-mono" fontWeight={700} fill={TINTA}>
                {h.f}
              </tspan>
              {h.nota ? (
                <tspan fill={SUAVE} fontWeight={500}>
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
      uid="repo3"
      ancho={1000}
      alto={352}
      animada
      etiqueta="Tu repo al acabar la semana 3. Tu herramienta: .env.example sin claves, acciones.json con dos acciones con IA tuyas, src/tareas/ia.py con el proveedor, acciones.py con los tipos con IA, config.py que valida la IA, cli.py con la orden comprobar-ia y el README con el .env y las acciones con IA. Tu proceso: opencode.json con context7 apagado, la skill al día, el ADR 0002 del proveedor de IA, docs/prompts.md y commits pequeños."
      pie="A la izquierda, lo nuevo de tu herramienta; a la derecha, cómo lo has construido con el agente."
    >
      <Zona x={16} y={16} w={474} h={320} tono="ambar" rotulo="Tu herramienta, semana 3" an={0} />
      <Zona x={510} y={16} w={474} h={320} tono="morado" rotulo="Tu proceso, semana 3" an={0.15} />
      <ArbolSvg
        x={36}
        raiz="cli-tareas/"
        tono="ambar"
        desde={0.3}
        hojas={[
          { f: ".env.example", nota: "sin claves" },
          { f: "acciones.json", nota: "+ 2 acciones con IA" },
          { f: "src/tareas/ia.py", nota: "el proveedor" },
          { f: "src/tareas/acciones.py", nota: "+ tipos con IA" },
          { f: "src/tareas/config.py", nota: "valida la IA" },
          { f: "src/tareas/cli.py", nota: "comprobar-ia" },
          { f: "README.md", nota: ".env y acciones IA" },
        ]}
      />
      <ArbolSvg
        x={534}
        raiz="y además…"
        tono="morado"
        desde={1.4}
        hojas={[
          { f: "opencode.json", nota: "+ context7, apagado" },
          { f: ".opencode/skills/acciones-json/SKILL.md" },
          { f: "docs/adr/0002-proveedor-ia.md" },
          { f: "docs/prompts.md", nota: "y lo que corregiste" },
          { f: "commits pequeños", nota: "uno por pieza" },
        ]}
      />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Una regla frente a un modelo                                        */
/* Fichero 16..236 × 112..188 (centro y 150). Rama de arriba: regla    */
/* 300..560 × 30..130 (centro 80) y su resultado 620..984; rama de     */
/* abajo: modelo 300..560 × 170..270 (centro 220) y resultado 620..984. */
/* Las curvas salen del fichero a 140 y 160 y llegan horizontales.     */
/* ------------------------------------------------------------------ */

export function ReglaOModelo() {
  const u = "reglaia";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={290}
      animada
      etiqueta="El mismo fichero, escaneo_0042.pdf, ante una regla y ante un modelo. Una regla mira nombre, extensión y fecha: sabe que es un PDF, pero no de qué trata. Un modelo lee el contenido, «Una red conecta equipos…», y propone redes-protocolos-ip: sabe de qué trata."
      pie="Nombre real que propuso el modelo del centro para escaneo_0042.pdf, que en realidad es el tema 2 de Redes."
    >
      <Caja x={16} y={112} w={220} h={76} tono="gris" titulo="escaneo_0042.pdf" mono lineas={["338 caracteres"]} an={0.1} />
      <Caja x={300} y={30} w={260} h={100} tono="ambar" titulo="Una regla" lineas={["mira nombre, extensión", "y fecha"]} an={0.8} />
      <Caja x={620} y={30} w={364} h={100} tono="rosa" titulo="Sabe que es un PDF" lineas={["pero no de qué trata"]} an={1.5} />
      <Caja x={300} y={170} w={260} h={100} tono="azul" titulo="Un modelo" lineas={["lee el contenido:", "«Una red conecta…»"]} an={2.2} />
      <Caja x={620} y={170} w={364} h={100} tono="verde" titulo="redes-protocolos-ip" mono lineas={["sabe de qué trata"]} grosor={3} an={2.9} />
      <Flecha uid={u} d="M236 140 C 266 140, 270 80, 294 80" tono="ambar" an={0.5} dur={0.35} />
      <Flecha uid={u} d="M560 80 H614" tono="ambar" an={1.2} dur={0.3} />
      <Flecha uid={u} d="M236 160 C 266 160, 270 220, 294 220" tono="azul" an={1.9} dur={0.35} pulso />
      <Flecha uid={u} d="M560 220 H614" tono="azul" an={2.6} dur={0.3} pulso />
      <Halo x={620} y={170} w={364} h={100} tono="verde" an={3.4} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El viaje de una petición                                            */
/* Ocho cajas de 220 × 76 cada 250 desde x = 16 (16 · 266 · 516 · 766):*/
/* la ida a y 60..136 (centro 98), de izquierda a derecha; la vuelta a  */
/* y 216..292 (centro 254), de derecha a izquierda. Flechas de 24 en   */
/* los huecos de 30; la bajada, del centro de la 4.ª (x 876).          */
/* ------------------------------------------------------------------ */

const VIAJE: { x: number; y: number; t: string; l: string; tono: TonoSvg }[] = [
  { x: 16, y: 60, t: "Tu orden", l: "tareas ejecutar …", tono: "gris" },
  { x: 266, y: 60, t: "Petición JSON", l: "sistema + tu texto", tono: "azul" },
  { x: 516, y: 60, t: "HTTPS + clave", l: "Bearer CENTRO_IA_KEY", tono: "morado" },
  { x: 766, y: 60, t: "El servidor", l: "gateway → modelo", tono: "verde" },
  { x: 766, y: 216, t: "Respuesta JSON", l: "texto + tokens", tono: "verde" },
  { x: 516, y: 216, t: "La acción", l: "toma el texto", tono: "azul" },
  { x: 266, y: 216, t: "Tu disco", l: "el .md nuevo", tono: "ambar" },
  { x: 16, y: 216, t: "Tabla Rich", l: "205+166 tokens", tono: "gris" },
];
const TRAMOS = ["M236 98 H260", "M486 98 H510", "M736 98 H760", "M876 136 V210", "M766 254 H742", "M516 254 H492", "M266 254 H242"];

export function ViajePeticion() {
  const u = "viaje";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={336}
      animada
      etiqueta="El viaje de una petición. Ida: tu orden; la petición JSON con el sistema y tu texto; HTTPS con tu clave en la cabecera Bearer CENTRO_IA_KEY; el servidor del centro, que pasa por el gateway al modelo. Vuelta, unos 2 segundos después: la respuesta JSON con el texto y los tokens; la acción usa el texto; tu disco recibe el .md nuevo; y la tabla Rich te enseña 205+166 tokens."
      pie="Medido con tema-3-linux.pdf: 205 tokens de ida, 166 de vuelta y 2,0 segundos en total."
    >
      <T x={16} y={36} peso={800} color={fuerte("azul")} an={0}>
        Ida: tu texto sale de tu equipo
      </T>
      {VIAJE.map((c, i) => (
        <Caja key={c.t} x={c.x} y={c.y} w={220} h={76} tono={c.tono} titulo={c.t} lineas={[c.l]} an={0.2 + i * 0.55} />
      ))}
      {TRAMOS.map((d, i) => (
        <Flecha key={d} uid={u} d={d} tono={VIAJE[i].tono} an={0.55 + i * 0.55} dur={0.3} pulso />
      ))}
      <T x={888} y={180} peso={800} color={fuerte("verde")} an={2.3}>
        2,0 s
      </T>
      <Halo x={766} y={60} w={220} h={76} tono="verde" an={2.1} />
      <T x={16} y={324} peso={800} color={fuerte("ambar")} an={4.2}>
        Vuelta: el texto del modelo acaba en un fichero tuyo
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* La petición, línea a línea                                          */
/* Caja del código 16..600 × 24..340; líneas mono cada 32 desde y = 60 */
/* (60 … 316), sangría a x = 36. La más larga (`    { "role":          */
/* "system", "content": "Propones nombres…" },`, 54 car. ≈ 535) acaba  */
/* en 571. JSON compacto: ninguna línea es solo una llave (cada texto, */
/* único). Rótulos a x = 640, guion de 608 a 630; el más largo («tu    */
/* texto: instrucciones + documento», 35 car. ≈ 333) acaba en 973.    */
/* ------------------------------------------------------------------ */

const PETICION: { l: string; r?: string; clave?: boolean }[] = [
  { l: "POST /v1/chat/completions", r: "a dónde: CENTRO_IA_URL", clave: true },
  { l: "Authorization: Bearer …", r: "tu clave, en la cabecera", clave: true },
  { l: '{ "model": "qwen3.8-flash-next",', r: "qué modelo del servidor" },
  { l: '  "messages": [' },
  { l: '    { "role": "system", "content": "Propones nombres…" },', r: "las reglas: las pone tu código" },
  { l: '    { "role": "user", "content": "<documento>…" }', r: "tu texto: instrucciones + documento" },
  { l: "  ]," },
  { l: '  "temperature": 0.2,', r: "0,2: respuestas poco creativas" },
  { l: '  "max_tokens": 800 }', r: "tope de lo que responde" },
];

export function AnatomiaPeticion() {
  return (
    <Figura
      uid="peticion"
      ancho={1000}
      alto={356}
      animada
      etiqueta="La petición que manda tu CLI, línea a línea: POST a CENTRO_IA_URL más /chat/completions; la clave en la cabecera Authorization: Bearer; el modelo qwen3.8-flash-next; los mensajes, uno de sistema con las reglas que pone tu código y uno de usuario con tus instrucciones y el documento; temperature 0,2 para respuestas poco creativas; y max_tokens 800, el tope de lo que responde."
      pie="Es la API de chat de OpenAI: la hablan el servidor del centro, Ollama y casi todos los proveedores."
    >
      <rect x={16} y={24} width={584} height={316} rx={12} fill="var(--dg-papel)" stroke={linea("gris")} strokeWidth={2} {...an("funde", 0, 0.4)} />
      {PETICION.map((p, i) => {
        const y = 60 + i * 32;
        const d = 0.3 + i * 0.36;
        return (
          <g key={p.l}>
            <text x={36} y={y} fontSize={16} className="whitespace-pre font-mono" fill={p.clave ? fuerte("morado") : TINTA} fontWeight={p.clave ? 700 : 500} {...an("teclea", d, 0.32, p.l.length)}>
              {p.l}
            </text>
            {p.r ? (
              <g {...an("desliza", d + 0.28, 0.4)}>
                <path d={`M608 ${y - 6} H630`} fill="none" stroke={linea("azul")} strokeWidth={2} strokeDasharray="4 4" />
                <text x={640} y={y} fontSize={16} fontWeight={700} fill={fuerte("azul")}>
                  {p.r}
                </text>
              </g>
            ) : null}
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* La respuesta, línea a línea (respuesta REAL, recortada)             */
/* Caja 16..560 × 24..320; líneas mono cada 30 desde y = 56 (nueve,    */
/* la última a 296), sangría a x = 36; la más larga (content, 51 car.  */
/* ≈ 505) acaba en 541. Rótulos a x = 600 con guion de 568 a 590.      */
/* ------------------------------------------------------------------ */

const RESPUESTA: { l: string; r?: string; tono?: TonoSvg }[] = [
  { l: '{ "id": "chatcmpl-97d4132d1981aa54",', r: "el número de esta respuesta", tono: "gris" },
  { l: '  "model": "qwen3.8-flash-next",' },
  { l: '  "choices": [{' },
  { l: '    "message": { "role": "assistant",' },
  { l: '                 "content": "redes-direccion-ip" },', r: "EL TEXTO: lo único que usa tu acción", tono: "verde" },
  { l: '    "finish_reason": "stop" }],', r: "stop: terminó · length: se cortó", tono: "ambar" },
  { l: '  "usage": { "prompt_tokens": 94,', r: "lo que mandaste: 94 tokens", tono: "azul" },
  { l: '             "completion_tokens": 6,', r: "lo que escribió: 6 tokens", tono: "azul" },
  { l: '             "total_tokens": 100 } }' },
];

export function AnatomiaRespuesta() {
  return (
    <Figura
      uid="respuesta"
      ancho={1000}
      alto={336}
      animada
      etiqueta="La respuesta real del servidor del centro, recortada. id, el número de esta respuesta; model; choices con un message de role assistant cuyo content, redes-direccion-ip, es el texto: lo único que usa tu acción; finish_reason stop, que significa que terminó (length significaría que se cortó); y usage con prompt_tokens 94, lo que mandaste, completion_tokens 6, lo que escribió, y total_tokens 100."
      pie="Respuesta real del servidor del centro a una petición de renombrar-ia (sin los campos que no usas)."
    >
      <rect x={16} y={24} width={544} height={296} rx={12} fill="var(--dg-papel)" stroke={linea("gris")} strokeWidth={2} {...an("funde", 0, 0.4)} />
      {RESPUESTA.map((p, i) => {
        const y = 56 + i * 30;
        const d = 0.2 + i * 0.3;
        const verde = p.tono === "verde";
        return (
          <g key={p.l}>
            <text x={36} y={y} fontSize={16} className="whitespace-pre font-mono" fill={verde ? fuerte("verde") : TINTA} fontWeight={verde ? 800 : 500} {...an("funde", d, 0.3)}>
              {p.l}
            </text>
            {p.r && p.tono ? (
              <g {...an("desliza", d + 0.15, 0.4)}>
                <path d={`M568 ${y - 6} H590`} fill="none" stroke={linea(p.tono)} strokeWidth={2} strokeDasharray="4 4" />
                <text x={600} y={y} fontSize={16} fontWeight={verde ? 800 : 700} fill={fuerte(p.tono)}>
                  {p.r}
                </text>
              </g>
            ) : null}
          </g>
        );
      })}
      <Halo x={200} y={162} w={345} h={26} tono="verde" an={3.0} rx={8} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Tokens por fichero (datos reales de resumir-apuntes)                */
/* Filas cada 50 desde y = 76: nombre mono a x = 16 (el más largo,     */
/* tema-1-sistemas-informaticos.pdf, 32 car. ≈ 317, acaba en 333).     */
/* Barras desde x = 350, 1,1 px por token: entrada (azul) y a          */
/* continuación salida (verde). La más larga, 205 + 166 = 371 → 408,   */
/* acaba en 758; la cifra va detrás, a +12 (≈ 160 → 930).              */
/* ------------------------------------------------------------------ */

const TOKENS: [string, number, number, string][] = [
  ["calendario-examenes.pdf", 150, 100, "1,3 s"],
  ["tema-1-sistemas-informaticos.pdf", 217, 133, "1,6 s"],
  ["tema-2-redes.pdf", 197, 131, "1,6 s"],
  ["tema-3-linux.pdf", 205, 166, "2,0 s"],
];
const PX = 1.1;

export function TokensPorFichero() {
  return (
    <Figura
      uid="tokens"
      ancho={1000}
      alto={300}
      animada
      etiqueta={`Tokens reales al resumir los cuatro PDF de apuntes con el modelo del centro: ${TOKENS.map(([f, e, s, t]) => `${f}, ${e} de entrada y ${s} de salida en ${t}`).join("; ")}.`}
      pie="La entrada es tu documento más el sistema y tus instrucciones; la salida, el resumen. Unos 4 caracteres por token."
    >
      <rect x={350} y={20} width={18} height={18} rx={4} fill={linea("azul")} {...an("funde", 0)} />
      <T x={376} y={35} color={TINTA} peso={700} an={0}>
        entrada: lo que mandas
      </T>
      <rect x={600} y={20} width={18} height={18} rx={4} fill={linea("verde")} {...an("funde", 0.1)} />
      <T x={626} y={35} color={TINTA} peso={700} an={0.1}>
        salida: lo que escribe
      </T>
      {TOKENS.map(([f, e, s, t], i) => {
        const y = 76 + i * 50;
        const d = 0.4 + i * 0.6;
        return (
          <g key={f}>
            <T x={16} y={y + 16} mono color={TINTA} an={d}>
              {f}
            </T>
            <Barra x={350} y={y} w={e * PX} h={24} tono="azul" an={d + 0.1} dur={0.6} />
            <Barra x={350 + e * PX} y={y} w={s * PX} h={24} tono="verde" an={d + 0.5} dur={0.5} />
            <T x={350 + (e + s) * PX + 12} y={y + 18} peso={700} color={TINTA} an={d + 0.9}>
              {`${e} + ${s} · ${t}`}
            </T>
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Un agente frente a tu CLI                                           */
/* Zonas 16..488 y 512..984 × 16..372. Izquierda: bucle de 4 cajas de  */
/* 200 × 76 (40 y 264; y 64 y 200), flechas en los huecos de 24 y 64.   */
/* Derecha: tres cajas de 424 × 76 a x = 536 (y 64 · 172 · 280),       */
/* flechas verticales de 26 en los huecos de 32.                       */
/* ------------------------------------------------------------------ */

export function AgenteFrenteCli() {
  const u = "agentecli";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={388}
      animada
      etiqueta="Un agente frente a tu CLI. OpenCode es un agente: decide el paso, usa una herramienta (read, edit, bash), te pide permiso si la regla es ask, ve el resultado y vuelve a decidir: muchas vueltas, con herramientas. Tu CLI hace una sola llamada: tu código prepara sistema, instrucciones y documento; el modelo responde solo texto y no ejecuta nada; y tu código decide: limpia, valida y escribe."
      pie="El modelo de tu CLI no tiene herramientas: no puede leer, borrar ni ejecutar. Todo lo que pasa en tu disco lo decide tu código."
    >
      <Zona x={16} y={16} w={472} h={356} tono="morado" rotulo="Un agente: OpenCode" an={0} />
      <Zona x={512} y={16} w={472} h={356} tono="azul" rotulo="Tu CLI: una sola llamada" an={0.1} />
      <Caja x={40} y={64} w={200} h={76} tono="morado" titulo="Decide el paso" lineas={["el modelo piensa"]} an={0.3} />
      <Caja x={264} y={64} w={200} h={76} tono="morado" titulo="Herramienta" lineas={["read · edit · bash"]} an={0.6} />
      <Caja x={264} y={200} w={200} h={76} tono="ambar" titulo="Pide permiso" lineas={["si la regla es ask"]} an={0.9} />
      <Caja x={40} y={200} w={200} h={76} tono="verde" titulo="Ve el resultado" lineas={["y vuelve a decidir"]} an={1.2} />
      <Flecha uid={u} d="M240 102 H258" tono="morado" an={0.5} dur={0.2} pulso={1.6} />
      <Flecha uid={u} d="M364 140 V194" tono="morado" an={0.8} dur={0.2} pulso={1.6} />
      <Flecha uid={u} d="M264 238 H246" tono="ambar" an={1.1} dur={0.2} pulso={1.6} />
      <Flecha uid={u} d="M140 200 V146" tono="verde" an={1.4} dur={0.2} pulso={1.6} />
      <T x={40} y={326} peso={800} color={fuerte("morado")} an={1.6}>
        muchas vueltas, con herramientas
      </T>
      <Caja x={536} y={64} w={424} h={76} tono="gris" titulo="Tu código prepara" lineas={["sistema + instrucciones + documento"]} an={2.0} />
      <Caja x={536} y={172} w={424} h={76} tono="azul" titulo="Responde el modelo" lineas={["solo texto: no ejecuta nada"]} an={2.6} grosor={3} />
      <Caja x={536} y={280} w={424} h={76} tono="verde" titulo="Tu código decide" lineas={["limpia, valida y escribe"]} an={3.2} />
      <Flecha uid={u} d="M748 140 V166" tono="gris" an={2.4} dur={0.2} pulso />
      <Flecha uid={u} d="M748 248 V274" tono="azul" an={3.0} dur={0.2} pulso />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Dónde vive la clave: una tabla con veredictos                       */
/* Columna de filas 16..206 (190). Tres columnas de 248 cada 256 desde */
/* x = 222 (222 · 478 · 734, acaba en 982). Cabecera a y = 50; filas de */
/* 72 a y = 76 · 160 · 244 (acaba en 316). En cada celda, el icono     */
/* (24 × 24) a x+14, y+24 y el texto a x+48, y+42 (≤ 19 car. ≈ 180).   */
/* ------------------------------------------------------------------ */

type Veredicto = "allow" | "ask" | "deny" | "nada";
const TONO_VER: Record<Veredicto, TonoSvg> = { allow: "verde", ask: "ambar", deny: "rosa", nada: "gris" };

function IconoVer({ x, y, v }: { x: number; y: number; v: Veredicto }) {
  const trazo = { fill: "none", stroke: "var(--dg-sobre-tono)", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={12} cy={12} r={12} fill={linea(TONO_VER[v])} />
      {v === "allow" ? <path d="M6.5 12.5 L10.5 16.5 L17.5 8" strokeWidth={2.6} {...trazo} /> : null}
      {v === "ask" ? (
        <>
          <path d="M9 9.2 a3 3 0 1 1 4.6 2.5 c-1 .6 -1.6 1.2 -1.6 2.4" strokeWidth={2.4} {...trazo} />
          <circle cx={12} cy={17.6} r={0.6} strokeWidth={2.2} {...trazo} />
        </>
      ) : null}
      {v === "deny" ? <path d="M7 12 H17" strokeWidth={3} {...trazo} /> : null}
      {v === "nada" ? <path d="M8 12 H16" strokeWidth={2.4} {...trazo} /> : null}
    </g>
  );
}

const CLAVE_FILAS: { titulo: string; linea: string; tono: TonoSvg; celdas: [Veredicto, string, string][] }[] = [
  {
    titulo: "En tu terminal",
    linea: "export · setx",
    tono: "gris",
    celdas: [
      ["allow", "Sí:", " es la primera"],
      ["ask", "Pregunta:", " un echo"],
      ["nada", "No:", " no es fichero"],
    ],
  },
  {
    titulo: "En el .env",
    linea: "solo en local",
    tono: "rosa",
    celdas: [
      ["allow", "Sí:", " si no hay otra"],
      ["deny", "No:", " read *.env deny"],
      ["deny", "No:", " .gitignore"],
    ],
  },
  {
    titulo: "En .env.example",
    linea: "la plantilla",
    tono: "verde",
    celdas: [
      ["nada", "No:", " es plantilla"],
      ["allow", "Sí:", " sin secretos"],
      ["allow", "Sí:", " la documenta"],
    ],
  },
];
const CLAVE_COLS = ["¿La lee tu CLI?", "¿La ve el agente?", "¿Sube a GitHub?"];

export function DondeViveLaClave() {
  return (
    <Figura
      uid="clave"
      ancho={1000}
      alto={332}
      animada
      etiqueta="Dónde vive la clave. La variable de tu terminal (export o setx): la lee tu CLI, es la primera que manda; el agente solo la vería si aprobaras un echo; no sube a GitHub porque no es un fichero. El fichero .env: tu CLI lo lee si no hay variable; el agente no puede, por la regla read *.env deny; y no sube a GitHub porque lo para el .gitignore. El .env.example: tu CLI no lo usa, es la plantilla; el agente puede leerlo porque no tiene secretos; y sí sube a GitHub: documenta qué hace falta."
      pie="La clave de verdad nunca entra en un fichero que suba a git, ni en el contexto del agente."
    >
      {CLAVE_COLS.map((c, j) => (
        <T key={c} x={222 + j * 256 + 124} y={50} ancla="middle" peso={800} tam={18} color={TINTA} an={0.1 + j * 0.15}>
          {c}
        </T>
      ))}
      {CLAVE_FILAS.map((f, i) => {
        const y = 76 + i * 84;
        const d = 0.5 + i * 0.9;
        return (
          <g key={f.titulo}>
            <Caja x={16} y={y} w={190} h={72} tono={f.tono} titulo={f.titulo} lineas={[f.linea]} an={d} tipo="desliza" />
            {f.celdas.map(([v, fuerteTxt, resto], j) => {
              const x = 222 + j * 256;
              return (
                <g key={j} data-caja="" {...an("surge", d + 0.25 + j * 0.2, 0.5)}>
                  <rect x={x} y={y} width={248} height={72} rx={12} fill={suave(TONO_VER[v])} stroke={linea(TONO_VER[v])} strokeWidth={2} />
                  <IconoVer x={x + 14} y={y + 24} v={v} />
                  <text x={x + 48} y={y + 42} fontSize={16} fill={TINTA}>
                    <tspan fontWeight={800} fill={fuerte(TONO_VER[v])}>
                      {fuerteTxt}
                    </tspan>
                    <tspan fontWeight={500}>{resto}</tspan>
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* MCP por dentro: diagrama de secuencia (lo que pasó de verdad)       */
/* Cabeceras de 150 × 46 a y = 16, centradas en x = 90 · 330 · 590 ·   */
/* 870; líneas de vida discontinuas de y = 62 a 392. Diez mensajes     */
/* cada 30 desde y = 104; el rótulo va 9 por encima, centrado entre    */
/* los extremos, sobre un rectángulo del color del fondo (tapa la      */
/* línea de vida que cruza). Las flechas acaban a 6 de la línea de     */
/* vida destino. Llave «×2» a la derecha de las filas 5-7.             */
/* ------------------------------------------------------------------ */

const ACTORES: [string, number, TonoSvg][] = [
  ["Tú escribes", 90, "gris"],
  ["El modelo", 330, "morado"],
  ["OpenCode", 590, "azul"],
  ["context7", 870, "verde"],
];
const X_ACTOR: Record<string, number> = { tu: 90, modelo: 330, oc: 590, c7: 870 };
const MENSAJES: { de: keyof typeof X_ACTOR; a: keyof typeof X_ACTOR; texto: string; vuelta?: boolean; tono: TonoSvg; mono?: boolean }[] = [
  { de: "oc", a: "c7", texto: "tools/list · al conectarse", tono: "azul" },
  { de: "c7", a: "oc", texto: "2 herramientas + descripciones", vuelta: true, tono: "verde" },
  { de: "tu", a: "oc", texto: "«Usa context7: CA en httpx»", tono: "gris" },
  { de: "oc", a: "modelo", texto: "tu mensaje + herramientas", tono: "azul" },
  { de: "modelo", a: "oc", texto: "pide resolve-library-id", vuelta: true, tono: "morado", mono: true },
  { de: "oc", a: "c7", texto: "tools/call: resolve-library-id", tono: "azul" },
  { de: "c7", a: "oc", texto: "/encode/httpx/0.28.1", vuelta: true, tono: "verde", mono: true },
  { de: "oc", a: "modelo", texto: "la doc de httpx 0.28.1", tono: "azul" },
  { de: "modelo", a: "oc", texto: "respuesta con el ejemplo", vuelta: true, tono: "morado" },
  { de: "oc", a: "tu", texto: "13 s después: tu respuesta", vuelta: true, tono: "azul" },
];

export function McpPorDentro() {
  const u = "mcp";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={404}
      animada
      etiqueta="MCP por dentro, lo que pasó de verdad. Al conectarse, OpenCode pide a context7 tools/list y recibe 2 herramientas con sus descripciones. Tú escribes «Usa context7: CA en httpx». OpenCode manda al modelo tu mensaje más las herramientas. El modelo pide resolve-library-id; OpenCode lo llama en context7 con tools/call y recibe /encode/httpx/0.28.1. Lo mismo, una segunda vez, con query-docs. OpenCode le pasa al modelo la documentación de httpx 0.28.1, el modelo responde con el ejemplo y, 13 segundos después, tienes tu respuesta. El modelo nunca habla con context7: siempre pasa por OpenCode."
      pie="El modelo nunca habla con context7: pide, y OpenCode llama. Las filas 5 a 7 se repitieron con query-docs."
    >
      {ACTORES.map(([n, x, tono], i) => (
        <g key={n}>
          <path d={`M${x} 62 V392`} fill="none" stroke={linea("gris")} strokeWidth={1.5} strokeDasharray="5 6" {...an("funde", 0.2 + i * 0.1, 0.4)} />
          <Caja x={x - 75} y={16} w={150} h={46} tono={tono} titulo={n} an={i * 0.12} />
        </g>
      ))}
      {MENSAJES.map((m, i) => {
        const y = 104 + i * 30;
        const x1 = X_ACTOR[m.de];
        const x2 = X_ACTOR[m.a];
        const fin = x2 > x1 ? x2 - 6 : x2 + 6;
        const centro = (x1 + x2) / 2;
        const ancho = m.texto.length * (m.mono ? 9.9 : 9.5) + 16;
        const d = 0.7 + i * 0.5;
        return (
          <g key={m.texto}>
            <Flecha uid={u} d={`M${x1} ${y} H${fin}`} tono={m.tono} discontinua={m.vuelta} an={d} dur={0.35} grosor={2} />
            <rect x={centro - ancho / 2} y={y - 27} width={ancho} height={22} rx={6} fill="var(--dg-fondo)" {...an("funde", d + 0.1, 0.3)} />
            <T x={centro} y={y - 10} ancla="middle" mono={m.mono} peso={600} color={fuerte(m.tono)} an={d + 0.15}>
              {m.texto}
            </T>
          </g>
        );
      })}
      <path d="M955 210 H965 V292 H955" fill="none" stroke={linea("ambar")} strokeWidth={2.5} {...an("funde", 3.4, 0.4)} />
      <T x={970} y={258} peso={800} color={fuerte("ambar")} an={3.5}>
        ×2
      </T>
      <Halo x={795} y={16} w={150} h={46} tono="verde" an={3.0} rx={14} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Lo que cuesta cada cosa en el contexto (caracteres reales)          */
/* Filas cada 64 desde y = 70: rótulo a x = 16 (≤ 30 car. ≈ 285) y,     */
/* debajo, cuándo entra (16, tenue). Barra desde x = 330, 0,22 px por   */
/* carácter (2553 → 562, acaba en 892); la cifra va detrás a +10.      */
/* ------------------------------------------------------------------ */

const COSTE: { q: string; cuando: string; n: number; tono: TonoSvg }[] = [
  { q: "Descripción de tu skill", cuando: "siempre, en cada mensaje", n: 203, tono: "morado" },
  { q: "Tu AGENTS.md", cuando: "siempre: es la memoria", n: 736, tono: "gris" },
  { q: "SKILL.md entera", cuando: "solo si la carga", n: 1042, tono: "morado" },
  { q: "Las 2 herramientas de context7", cuando: "en cada mensaje, lo uses o no", n: 2553, tono: "ambar" },
];

export function CosteContexto() {
  return (
    <Figura
      uid="coste"
      ancho={1000}
      alto={316}
      animada
      etiqueta={`Lo que ocupa cada cosa en el contexto del agente, en caracteres reales: ${COSTE.map((c) => `${c.q}, ${c.n}, ${c.cuando}`).join("; ")}. context7 encendido pesa más del triple que tu AGENTS.md.`}
      pie="Medido en tu repo: las dos herramientas de context7 traen 2.553 caracteres de descripción. Unos 4 caracteres por token."
    >
      {COSTE.map((c, i) => {
        const y = 70 + i * 64;
        const d = 0.2 + i * 0.6;
        const w = c.n * 0.22;
        return (
          <g key={c.q}>
            <T x={16} y={y} peso={800} color={TINTA} an={d}>
              {c.q}
            </T>
            <T x={16} y={y + 22} an={d + 0.1}>
              {c.cuando}
            </T>
            <Barra x={330} y={y - 14} w={w} h={26} tono={c.tono} an={d + 0.15} dur={0.4 + c.n / 2553} />
            <T x={330 + w + 10} y={y + 5} peso={800} color={fuerte(c.tono)} an={d + 0.4 + c.n / 2553}>
              {`${c.n.toLocaleString("es-ES")} car.`}
            </T>
          </g>
        );
      })}
      <Halo x={330} y={248} w={562} h={26} tono="ambar" an={2.6} rx={8} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El proveedor detrás de una interfaz                                 */
/* ProveedorIA 360..640 × 30..134 (centro x 500). Arriba a la izquierda */
/* AccionIA 40..300 × 44..120 → «usa»; a la derecha Motor 700..960 →   */
/* «lo pone». Hijas de 280 × 100 a x = 40 · 360 · 680, y 236..336.     */
/* Tronco: de (500, 134) a y = 190 y bus de x 180 a 820; bajadas a las  */
/* hijas sin punta; la punta, en el tronco, apunta a la madre.         */
/* ------------------------------------------------------------------ */

export function ProveedorInterfaz() {
  const u = "proveedor";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={352}
      animada
      etiqueta="El proveedor detrás de una interfaz. ProveedorIA es una clase abstracta con un solo método, completar(sistema, usuario). AccionIA la usa sin saber qué hay detrás y el Motor le pone el proveedor. Tres clases hijas: ProveedorCentro, con httpx y tu clave, habla con el servidor; ProveedorFalso, en la semana 4, para las pruebas, responde lo que le digas; y cualquier otro servidor sería otra subclase, sin tocar las acciones."
      pie="Las acciones solo conocen completar(). Cambiar de servidor, o probar sin red, es cambiar la clase de abajo."
    >
      <Caja x={360} y={30} w={280} h={104} tono="azul" titulo="ProveedorIA" mono lineas={["clase abstracta", "completar(sistema, usuario)"]} an={0.1} tipo="surge" grosor={3} />
      <Caja x={40} y={44} w={260} h={76} tono="gris" titulo="AccionIA" mono lineas={["pide texto, recibe texto"]} an={0.7} />
      <Caja x={700} y={44} w={260} h={76} tono="gris" titulo="Motor" mono lineas={["le pone el proveedor"]} an={0.9} />
      <Flecha uid={u} d="M300 82 H354" an={1.0} dur={0.3} />
      <Flecha uid={u} d="M700 82 H646" an={1.2} dur={0.3} />
      <T x={327} y={72} ancla="middle" peso={700} an={1.1}>
        usa
      </T>
      <path d="M180 236 V190 H820 V236 M500 236 V190" fill="none" stroke={linea("azul")} strokeWidth={2.5} pathLength={1} {...an("traza", 1.5, 0.6)} />
      <Flecha uid={u} d="M500 190 V140" tono="azul" an={2.0} dur={0.25} />
      <T x={512} y={170} peso={700} color={fuerte("azul")} an={2.1}>
        son un ProveedorIA
      </T>
      <Caja x={40} y={236} w={280} h={100} tono="verde" titulo="ProveedorCentro" mono lineas={["httpx + tu clave", "habla con el servidor"]} an={2.3} />
      <Caja x={360} y={236} w={280} h={100} tono="morado" titulo="ProveedorFalso" mono lineas={["semana 4: para pruebas", "responde lo que digas"]} discontinua an={2.6} />
      <Caja x={680} y={236} w={280} h={100} tono="gris" titulo="¿Otro servidor?" lineas={["otra subclase,", "sin tocar las acciones"]} discontinua an={2.9} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El prompt en capas                                                  */
/* Capas de 400 × 76 a x = 16, y 20 · 112 · 204 (centros 58 · 150 ·    */
/* 242). Petición 480..720 × 100..200 (centro 150); llegadas a 474 en   */
/* y 130 · 150 · 170. Modelo 770..984 × 112..188. Nota a y = 320.       */
/* ------------------------------------------------------------------ */

export function PromptEnCapas() {
  const u = "capas";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={336}
      animada
      etiqueta="El prompt de una acción con IA, en tres capas: el sistema lo fija tu código y pone las reglas de formato; las instrucciones las escribes tú en acciones.json; el documento va entre <documento> y </documento>. Las tres forman la petición, system y user, que es lo único que ve el modelo."
    >
      <Caja x={16} y={20} w={400} h={76} tono="azul" titulo="Sistema" lineas={["lo fija tu código: reglas de formato"]} an={0.1} tipo="desliza" />
      <Caja x={16} y={112} w={400} h={76} tono="ambar" titulo="Instrucciones" lineas={["las escribes tú en acciones.json"]} an={0.5} tipo="desliza" />
      <Caja x={16} y={204} w={400} h={76} tono="verde" titulo="Documento" lineas={["entre <documento> y </documento>"]} an={0.9} tipo="desliza" />
      <Flecha uid={u} d="M416 58 C 446 58, 444 130, 474 130" tono="azul" an={1.3} dur={0.35} />
      <Flecha uid={u} d="M416 150 H474" tono="ambar" an={1.4} dur={0.3} />
      <Flecha uid={u} d="M416 242 C 446 242, 444 170, 474 170" tono="verde" an={1.5} dur={0.35} />
      <Caja x={480} y={100} w={240} h={100} tono="gris" titulo="La petición" lineas={["system: tu código", "user: lo tuyo + el doc"]} an={1.9} tipo="surge" />
      <Flecha uid={u} d="M720 150 H764" tono="morado" an={2.3} dur={0.3} pulso />
      <Caja x={770} y={112} w={214} h={76} tono="morado" titulo="Modelo del centro" lineas={["solo ve texto"]} an={2.5} />
      <T x={16} y={320} color={TINTA} peso={600} an={3.0}>
        Lo que no va en la petición, el modelo no lo sabe: ni tu carpeta, ni tus otros ficheros.
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* La respuesta del modelo se limpia                                   */
/* Ejemplos crudos 16..316 × 48 alto, centros y 90 · 170 · 250. Caja   */
/* a_nombre_seguro() 360..640 × 60..280 (título a 90; pasos a 114 …   */
/* 210, cada 24). Salidas 684..984. Flechas rectas de 38 a cada lado. */
/* ------------------------------------------------------------------ */

const LIMPIEZA: [string, string][] = [
  ["Tema 3: ¡Linux & Bash!", "tema-3-linux-bash"],
  ["../../etc/passwd", "etc-passwd"],
  ["Terminal Linux.pdf", "terminal-linux"],
];
const PASOS_LIMPIEZA = ["1 · la primera línea", "2 · fuera la extensión", "3 · sin tildes ni eñes", "4 · solo a-z, 0-9 y -", "5 · como mucho 60"];

export function LimpiarRespuesta() {
  const u = "limpiar";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={300}
      animada
      etiqueta="La respuesta del modelo se limpia antes de usarla como nombre de fichero. a_nombre_seguro() se queda con la primera línea, quita la extensión si la añade, quita tildes y eñes, deja solo letras de la a a la z, cifras y guiones, y corta en 60. Así, «Tema 3: ¡Linux & Bash!» queda tema-3-linux-bash; «../../etc/passwd», un intento de salirse de la carpeta, queda etc-passwd; y «Terminal Linux.pdf» queda terminal-linux."
      pie="Lo que dice el modelo es una entrada más, como lo que teclea una persona: nunca se usa tal cual."
    >
      <T x={16} y={36} peso={800} color={fuerte("morado")} an={0}>
        Lo que dice el modelo
      </T>
      <T x={684} y={36} peso={800} color={fuerte("verde")} an={0.1}>
        Lo que usa tu código
      </T>
      {LIMPIEZA.map(([crudo], i) => {
        const y = 90 + i * 80;
        return (
          <g key={crudo} data-caja="" {...an("aparece", 0.3 + i * 0.35)}>
            <rect x={16} y={y - 24} width={300} height={48} rx={10} fill="var(--dg-papel)" stroke={linea("morado")} strokeWidth={2} />
            <text x={32} y={y + 6} fontSize={16} className="font-mono" fill={TINTA}>
              {crudo}
            </text>
          </g>
        );
      })}
      {LIMPIEZA.map((_, i) => (
        <Flecha key={i} uid={u} d={`M316 ${90 + i * 80} H354`} tono="morado" an={1.4 + i * 0.1} dur={0.25} />
      ))}
      <g data-caja="" {...an("surge", 1.7, 0.5)}>
        <rect x={360} y={60} width={280} height={220} rx={12} fill="var(--dg-papel)" stroke={linea("azul")} strokeWidth={3} />
        <text x={376} y={90} fontSize={18} fontWeight={800} fill={fuerte("azul")} className="font-mono">
          a_nombre_seguro()
        </text>
        {PASOS_LIMPIEZA.map((p, i) => (
          <text key={p} x={376} y={114 + i * 24} fontSize={16} fontWeight={500} fill={SUAVE} {...an("funde", 2.0 + i * 0.25, 0.3)}>
            {p}
          </text>
        ))}
      </g>
      {LIMPIEZA.map(([, limpio], i) => {
        const y = 90 + i * 80;
        return (
          <g key={limpio}>
            <Flecha uid={u} d={`M640 ${y} H678`} tono="verde" an={3.3 + i * 0.25} dur={0.25} pulso />
            <g data-caja="" {...an("surge", 3.5 + i * 0.25, 0.45)}>
              <rect x={684} y={y - 24} width={300} height={48} rx={10} fill={suave("verde")} stroke={linea("verde")} strokeWidth={2} />
              <text x={700} y={y + 6} fontSize={16} fontWeight={800} className="font-mono" fill={fuerte("verde")}>
                {limpio}
              </text>
            </g>
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Modo sin red: el árbol de decisión                                  */
/* Cinco columnas de 182 cada 206 desde x = 16 (16 · 222 · 428 · 634 · */
/* 840, acaba en 1022): fila de arriba y 40..116 (centro 78), fila de  */
/* abajo y 210..286. Flechas de 18 entre columnas; bajadas por el      */
/* centro de las columnas 2, 3 y 4. Rótulos únicos en cada flecha.     */
/* ------------------------------------------------------------------ */

export function SinRed() {
  const u = "sinred";
  return (
    <Figura
      uid={u}
      ancho={1040}
      alto={340}
      animada
      etiqueta="Qué hace tu CLI sin red. Tu orden ejecutar NOMBRE: ¿la acción usa IA? Si no, funciona sin red ni clave. Si sí, ¿hay --simular? Con él, solo cuenta caracteres y no gasta tokens. Sin él, ¿hay clave y red? Si están las dos, pregunta al modelo. Si falta una, sale con 4 y explica por qué, y las acciones sin IA siguen funcionando."
      pie="Con --simular, una acción con IA funciona sin red: solo cuenta lo que mandaría."
    >
      <Caja x={16} y={40} w={182} h={76} tono="gris" titulo="La orden" lineas={["ejecutar NOMBRE"]} an={0.1} />
      <Caja x={222} y={40} w={182} h={76} tono="ambar" titulo="¿Usa IA?" lineas={["mira el tipo"]} an={0.5} />
      <Caja x={428} y={40} w={182} h={76} tono="ambar" titulo="¿--simular?" mono lineas={["¿solo contar?"]} an={1.3} />
      <Caja x={634} y={40} w={182} h={76} tono="ambar" titulo="¿Clave y red?" lineas={["desde_entorno()"]} an={2.1} />
      <Caja x={840} y={40} w={182} h={76} tono="verde" titulo="Al modelo" lineas={["texto de vuelta"]} an={2.9} />
      <Caja x={222} y={210} w={182} h={76} tono="verde" titulo="Funciona" lineas={["sin red ni clave"]} an={0.9} grosor={3} />
      <Caja x={428} y={210} w={182} h={76} tono="azul" titulo="Solo cuenta" lineas={["sin gastar tokens"]} an={1.7} />
      <Caja x={634} y={210} w={182} h={76} tono="rosa" titulo="Sale con 4" lineas={["y explica por qué"]} an={2.5} grosor={3} />
      <Flecha uid={u} d="M198 78 H216" an={0.4} dur={0.15} />
      <Flecha uid={u} d="M404 78 H422" tono="ambar" an={1.2} dur={0.15} />
      <Flecha uid={u} d="M610 78 H628" tono="ambar" an={2.0} dur={0.15} />
      <Flecha uid={u} d="M816 78 H834" tono="verde" an={2.8} dur={0.15} pulso />
      <Flecha uid={u} d="M313 116 V204" tono="verde" an={0.7} dur={0.25} />
      <Flecha uid={u} d="M519 116 V204" tono="azul" an={1.5} dur={0.25} />
      <Flecha uid={u} d="M725 116 V204" tono="rosa" an={2.3} dur={0.25} />
      <T x={413} y={30} ancla="middle" peso={800} color={fuerte("ambar")} an={1.2}>
        sí
      </T>
      <T x={325} y={166} peso={800} color={fuerte("verde")} an={0.7}>
        no
      </T>
      <T x={531} y={166} peso={800} color={fuerte("azul")} an={1.5}>
        con él
      </T>
      <T x={619} y={30} ancla="middle" peso={800} color={fuerte("ambar")} an={2.0}>
        sin él
      </T>
      <T x={737} y={166} peso={800} color={fuerte("rosa")} an={2.3}>
        falta una
      </T>
      <T x={825} y={30} ancla="middle" peso={800} color={fuerte("verde")} an={2.8}>
        las dos
      </T>
      <T x={634} y={318} peso={700} color={TINTA} an={3.2}>
        y las acciones sin IA siguen funcionando
      </T>
      <Halo x={222} y={210} w={182} h={76} tono="verde" an={3.4} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* La semana de un vistazo                                             */
/* Dos filas de cuatro cajas de 220 × 76 cada 245 desde x = 16 (16 ·   */
/* 261 · 506 · 751): fila 1 y 20..96, fila 2 y 136..212. Flechas de 19 */
/* en los huecos de 25; el cambio de fila baja a y = 116 y vuelve a la */
/* izquierda hasta x = 126.                                            */
/* ------------------------------------------------------------------ */

const SEMANA: { titulo: string; linea: string; tono: TonoSvg }[] = [
  { titulo: "1 · Secretos", linea: ".env antes que nada", tono: "rosa" },
  { titulo: "2 · context7", linea: "MCP, solo un rato", tono: "morado" },
  { titulo: "3 · Proveedor", linea: "ia.py y comprobar-ia", tono: "azul" },
  { titulo: "4 · Resumir", linea: "tu 1.ª acción con IA", tono: "azul" },
  { titulo: "5 · Renombrar", linea: "limpia la respuesta", tono: "azul" },
  { titulo: "6 · Sin red", linea: "sale con 4 y sigue", tono: "ambar" },
  { titulo: "7 · Skill y ADR", linea: "el agente al día", tono: "morado" },
  { titulo: "8 · Commits", linea: "y push a GitHub", tono: "verde" },
];

export function SemanaPasos() {
  const u = "semana3";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={228}
      animada
      etiqueta="La semana 3 de un vistazo, en ocho pasos: 1, los secretos, el .env antes que nada; 2, context7 por MCP, solo un rato; 3, el proveedor, ia.py y la orden comprobar-ia; 4, resumir, tu primera acción con IA; 5, renombrar, limpiando la respuesta; 6, sin red, sale con 4 y sigue; 7, la skill y el ADR, el agente al día; 8, los commits y el push a GitHub."
    >
      {SEMANA.map((p, i) => (
        <Caja key={p.titulo} x={16 + (i % 4) * 245} y={i < 4 ? 20 : 136} w={220} h={76} tono={p.tono} titulo={p.titulo} lineas={[p.linea]} an={0.1 + i * 0.3} />
      ))}
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <Flecha uid={u} d={`M${236 + k * 245} 58 H${255 + k * 245}`} an={0.3 + k * 0.3} dur={0.15} />
          <Flecha uid={u} d={`M${236 + k * 245} 174 H${255 + k * 245}`} an={1.5 + k * 0.3} dur={0.15} />
        </g>
      ))}
      <Flecha uid={u} d="M861 96 V116 H126 V130" an={1.15} dur={0.35} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Dónde estás en el proyecto                                          */
/* Línea a y = 70 de x = 100 a 900; hitos cada 200; píldora «estás     */
/* aquí» sobre la semana 3 (x 452..548, y 18..44).                     */
/* ------------------------------------------------------------------ */

const HITOS: { t: string; d: string; estado: "hecho" | "ahora" | "luego" }[] = [
  { t: "Semana 1", d: "Arranque", estado: "hecho" },
  { t: "Semana 2", d: "acciones.json y motor", estado: "hecho" },
  { t: "Semana 3", d: "MCP y capa IA", estado: "ahora" },
  { t: "Semana 4", d: "pruebas y release", estado: "luego" },
  { t: "Entrega", d: "semi: 20 nov", estado: "luego" },
];

export function DondeEstas() {
  return (
    <Figura
      uid="semanas3"
      ancho={1000}
      alto={156}
      animada
      etiqueta="Dónde estás en el proyecto 2: semanas 1 y 2 hechas; semana 3, MCP y capa IA, estás aquí; luego la semana 4, pruebas y release; y la entrega del semipresencial, el 20 de noviembre."
    >
      <path d="M100 70 H900" fill="none" stroke={linea("gris")} strokeWidth={3} pathLength={1} {...an("traza", 0, 1.2)} />
      <g {...an("surge", 1.2, 0.5)}>
        <rect x={452} y={18} width={96} height={26} rx={13} fill={suave("verde")} stroke={linea("verde")} strokeWidth={1.5} />
        <text x={500} y={36} fontSize={16} fontWeight={800} fill={fuerte("verde")} textAnchor="middle">
          estás aquí
        </text>
      </g>
      {HITOS.map((h, i) => {
        const x = 100 + i * 200;
        const tono: TonoSvg = h.estado === "ahora" ? "verde" : h.estado === "hecho" ? "azul" : "gris";
        return (
          <g key={h.t} {...an("aparece", 0.2 + i * 0.25)}>
            <circle cx={x} cy={70} r={15} fill="var(--dg-fondo)" />
            <circle cx={x} cy={70} r={11} fill={h.estado === "luego" ? "var(--dg-fondo)" : linea(tono)} stroke={h.estado === "luego" ? linea("gris") : "var(--dg-fondo)"} strokeWidth={3} />
            <text x={x} y={112} fontSize={18} fontWeight={800} fill={fuerte(tono)} textAnchor="middle">
              {h.t}
            </text>
            <text x={x} y={136} fontSize={16} fontWeight={500} fill={SUAVE} textAnchor="middle">
              {h.d}
            </text>
          </g>
        );
      })}
      <Halo x={485} y={55} w={30} h={30} tono="verde" an={1.6} rx={20} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Peso de cada criterio (datos reales de RUBRICA_CLI)                 */
/* Filas cada 40 desde y = 40: rótulo a x = 16; barra desde x = 450,   */
/* 20 px por punto (el 20 llega a 850).                                */
/* ------------------------------------------------------------------ */

const ESTA_SEMANA = ["ia", "diseno", "robustez"];

export function PesosRubrica() {
  const criterios = RUBRICA_CLI.criterios;
  return (
    <Figura
      uid="pesos3"
      ancho={1000}
      alto={40 + criterios.length * 40}
      animada
      etiqueta={`Peso de cada criterio de la rúbrica sobre 100: ${criterios.map((c) => `${c.nombre}, ${c.peso}`).join("; ")}. Esta semana se juegan la capa IA, el diseño (el proveedor de IA aparte) y la robustez (sin red).`}
      pie="En azul, lo que esta semana sube de nivel: la capa IA entera, y el diseño y la robustez con el proveedor y el modo sin red."
    >
      {criterios.map((c, i) => {
        const y = 40 + i * 40;
        const ahora = ESTA_SEMANA.includes(c.id);
        return (
          <g key={c.id}>
            <text x={16} y={y + 6} fontSize={16} fontWeight={ahora ? 700 : 500} fill={ahora ? TINTA : SUAVE} {...an("funde", 0.1 + i * 0.12, 0.3)}>
              {`${c.nombre} · ${c.peso}`}
            </text>
            <Barra x={450} y={y - 10} w={c.peso * 20} tono={ahora ? "azul" : "gris"} hueca={!ahora} an={0.3 + i * 0.12} dur={0.6} />
          </g>
        );
      })}
    </Figura>
  );
}

