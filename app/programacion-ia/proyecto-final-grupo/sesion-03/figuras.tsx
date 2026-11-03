import { Caja, Figura, Flecha, T, TINTA, Zona, fuerte, linea, suave, type TonoSvg } from "../../_video/svg";

// Figuras de la Sesión 3 de la startup (docs/paginas-para-video.md). Geometría
// calculada a mano y apuntada encima de cada figura, con las medidas de texto
// de _video/svg.tsx (sans 16 ≈ 9,5 px/car., negrita 16 ≈ 10, negrita 18 ≈ 11,5,
// mono 16 ≈ 9,9). Cada <text> es corto y único en toda la página: la cámara lo
// busca por su comienzo.

/* ------------------------------------------------------------------ */
/* Hoy frente a lo que viene en el sprint 1                             */
/* Dos zonas de 474 × 300: «Hoy» 16..490 y «A partir de ahora» 510..984. */
/* Hoy: raíz a y = 80 (x = 36), cuatro hojas cada 32 desde y = 116, texto */
/* a x = 72 (la más larga, «docs/entrevistas/ · las que tengáis» ≈ 339,  */
/* acaba en 411); debajo, dos puntos de GitHub a y = 252 y 284 (x = 40). */
/* Sprint 1: seis puntos cada 36 desde y = 80 (x = 534, texto a 550).    */
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

function Punto({ x, y, tono, children }: { x: number; y: number; tono: TonoSvg; children: string }) {
  return (
    <g>
      <circle cx={x} cy={y - 5} r={5} fill={linea(tono)} />
      <T x={x + 16} y={y} color={TINTA} peso={600}>
        {children}
      </T>
    </g>
  );
}

const SPRINT_1 = [
  "Las cinco entrevistas",
  "Recorrido del cliente",
  "La arquitectura en Mermaid",
  "AGENTS.md para los agentes",
  "Todo por PR, con revisión",
  "Rama main protegida",
];

export function KitArranque() {
  return (
    <Figura
      uid="kit"
      ancho={1000}
      alto={332}
      etiqueta="Lo que se entrega hoy y lo que viene después. Hoy, en el repo: README con la ficha v1, docs/equipo.md con roles y reglas, docs/decisiones.md con la idea y el stack, y en docs/entrevistas las que tengáis; en GitHub, el sprint 1 con tres issues con responsable y aulaenlanube con acceso. A partir de ahora, durante el sprint 1: las cinco entrevistas, el recorrido del cliente, la arquitectura en Mermaid, AGENTS.md para los agentes, todo por PR con revisión y la rama main protegida."
      pie="A la izquierda, lo de hoy: poco, pero las bases. A la derecha, lo que desarrolláis durante el sprint 1, hasta el 17 de noviembre."
    >
      <Zona x={16} y={16} w={474} h={300} tono="azul" rotulo="Hoy · la entrega" />
      <Zona x={510} y={16} w={474} h={300} tono="gris" rotulo="A partir de ahora · sprint 1" />
      <ArbolSvg
        x={36}
        raiz="tu-startup/"
        tono="azul"
        hojas={[
          { f: "README.md", nota: "la ficha v1" },
          { f: "docs/equipo.md", nota: "roles y reglas" },
          { f: "docs/decisiones.md", nota: "idea y stack" },
          { f: "docs/entrevistas/", nota: "las que tengáis" },
        ]}
      />
      <Punto x={40} y={252} tono="morado">
        Sprint 1: 3 issues con dueño
      </Punto>
      <Punto x={40} y={284} tono="morado">
        aulaenlanube con acceso
      </Punto>
      {SPRINT_1.map((t, i) => (
        <Punto key={t} x={534} y={80 + i * 36} tono="gris">
          {t}
        </Punto>
      ))}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Quién tira de cada pieza hoy                                         */
/* Cinco filas de 50 de alto cada 62 desde y = 16 (16·78·140·202·264).  */
/* Rol: caja 16..256. Pieza: caja 330..984. Flecha horizontal por el    */
/* centro de la fila, de 256 a 324 (6 antes del borde).                 */
/* ------------------------------------------------------------------ */

const REPARTO: [string, string, TonoSvg][] = [
  ["Producto", "La ficha v1 (README.md)", "azul"],
  ["Calidad", "Roles y reglas (docs/equipo.md)", "verde"],
  ["Lead técnico", "Idea y stack (docs/decisiones.md)", "morado"],
  ["Datos/IA o diseño", "Las 3 primeras issues del sprint 1", "ambar"],
  ["Todo el equipo", "Su entrevista, si ya la tiene", "gris"],
];

export function RepartoPiezas() {
  const u = "reparto";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={330}
      etiqueta="Quién tira de cada pieza hoy. Producto: la ficha v1 en el README. Calidad: roles y reglas en docs/equipo.md. Lead técnico: idea y stack en docs/decisiones.md. Datos e IA o diseño: las tres primeras issues del sprint 1. Todo el equipo: cada uno su entrevista, si ya la tiene."
      pie="Si sois tres, alguien lleva dos piezas; si sois seis, una se hace en pareja. Cada persona sube algo con su cuenta: es su aportación."
    >
      {REPARTO.map(([rol, pieza, tono], i) => {
        const y = 16 + i * 62;
        return (
          <g key={rol}>
            <Caja x={16} y={y} w={240} h={50} tono={tono} titulo={rol} />
            <Flecha uid={u} d={`M256 ${y + 25} H324`} tono={tono} />
            <Caja x={330} y={y} w={654} h={50} tono={tono} titulo={pieza} relleno={suave(tono)} />
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Una pieza, una rama, un PR (grafo de commits en horizontal)          */
/* Carril main a y = 250, de x = 100 a 960; carril de la rama a y = 130.*/
/* Bolas de radio 11 con anillo del color del fondo: A (180,250),       */
/* B1 (380,130), B2 (520,130), M (840,250). Salida: curva de A al carril */
/* (último control alineado con y = 130, acaba a 11 de B1). Entrada en M:*/
/* curva cuyo último control (840,170) está alineado con M; acaba a 15. */
/* Píldoras de rama a la izquierda: main 16..80 × 236..264,             */
/* docs/ficha-v1 16..169 × 116..144. Órdenes en chips a y = 60..88:     */
/* 176..324 · 391..509 · 551..649 · 686..834.                           */
/* ------------------------------------------------------------------ */

function Bola({ x, y, tono }: { x: number; y: number; tono: TonoSvg }) {
  return <circle cx={x} cy={y} r={11} fill={linea(tono)} stroke="var(--dg-fondo)" strokeWidth={4} />;
}

function Pildora({ x, y, w, texto, tono }: { x: number; y: number; w: number; texto: string; tono: TonoSvg }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={28} rx={14} fill={suave(tono)} stroke={linea(tono)} strokeWidth={2} />
      <text x={x + w / 2} y={y + 19} textAnchor="middle" fontSize={16} fontWeight={700} fill={fuerte(tono)} className="font-mono">
        {texto}
      </text>
    </g>
  );
}

export function UnaPiezaUnPR() {
  const u = "pieza";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={300}
      etiqueta="Una pieza, una rama, un PR. Desde main, al día, sale la rama docs/ficha-v1 con git switch -c; en ella van dos commits, la ficha v1 y las cuentas, con git commit; git push la sube a GitHub; se abre el pull request, otra persona lo revisa y quien revisa la fusiona en main."
      pie="Nadie escribe en main: cada pieza vive en su rama hasta que otra persona la ha leído."
    >
      <Pildora x={16} y={236} w={64} texto="main" tono="azul" />
      <Pildora x={16} y={116} w={153} texto="docs/ficha-v1" tono="morado" />
      <path d="M100 250 H960" fill="none" stroke={linea("azul")} strokeWidth={4} />
      <path d="M180 239 C180 175 230 130 300 130 H369" fill="none" stroke={linea("morado")} strokeWidth={4} />
      <path d="M391 130 H509" fill="none" stroke={linea("morado")} strokeWidth={4} />
      <path d="M531 130 H640 C760 130 840 150 840 170" fill="none" stroke={linea("morado")} strokeWidth={4} />
      <Flecha uid={u} d="M840 170 V235" tono="morado" grosor={4} />
      <Bola x={180} y={250} tono="azul" />
      <Bola x={380} y={130} tono="morado" />
      <Bola x={520} y={130} tono="morado" />
      <Bola x={840} y={250} tono="azul" />
      <Pildora x={176} y={60} w={148} texto="git switch -c" tono="gris" />
      <Pildora x={391} y={60} w={118} texto="git commit" tono="gris" />
      <Pildora x={551} y={60} w={98} texto="git push" tono="gris" />
      <Pildora x={686} y={60} w={148} texto="PR + revisión" tono="ambar" />
      <T x={380} y={166} ancla="middle">
        docs: ficha v1
      </T>
      <T x={520} y={166} ancla="middle">
        docs: cuentas
      </T>
      <T x={180} y={288} ancla="middle">
        punto de partida
      </T>
      <T x={840} y={288} ancla="middle" color={TINTA} peso={700}>
        fusiona quien revisa
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Ejemplo de dibujo del sistema: reservas de pádel                     */
/* Izquierda 16..216: Jugador (40..116) y Dueño del club (184..260).    */
/* Centro 330..590: App web (100..200). Derecha 700..984: Base de datos */
/* (16..92), Stripe (112..188), IA del centro (208..284, discontinua).   */
/* Flechas: acaban a 6 del borde; en las curvas el último control va a  */
/* la altura del destino.                                               */
/* ------------------------------------------------------------------ */

export function SistemaReservas() {
  const u = "sistema";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={300}
      etiqueta="Ejemplo de dibujo del sistema de una app de reservas de pádel. El jugador reserva desde el móvil y el dueño del club gestiona sus pistas; los dos usan la app web, que corre en el servidor del curso. La app guarda pistas, reservas y clientes en la base de datos, cobra la suscripción con Stripe y, solo si aporta algo, llama a la IA del centro."
      pie="Seis cajas bastan: quién lo usa, dónde corre y con qué habla. Si no sabéis dibujarlo, todavía no lo habéis decidido."
    >
      <Caja x={16} y={40} w={200} h={76} tono="azul" titulo="Jugador" lineas={["reserva en el móvil"]} />
      <Caja x={16} y={184} w={200} h={76} tono="azul" titulo="Dueño del club" lineas={["gestiona sus pistas"]} />
      <Caja x={330} y={100} w={260} h={100} tono="morado" titulo="App web" lineas={["pantallas y lógica", "en el servidor del curso"]} />
      <Caja x={700} y={16} w={284} h={76} tono="verde" titulo="Base de datos" lineas={["pistas, reservas, clientes"]} />
      <Caja x={700} y={112} w={284} h={76} tono="ambar" titulo="Stripe" lineas={["cobra la suscripción"]} />
      <Caja x={700} y={208} w={284} h={76} tono="gris" titulo="IA del centro" lineas={["solo si aporta algo"]} discontinua />
      <Flecha uid={u} d="M216 78 C270 78 270 130 324 130" tono="azul" />
      <Flecha uid={u} d="M216 222 C270 222 270 170 324 170" tono="azul" />
      <Flecha uid={u} d="M590 120 C645 120 645 54 694 54" tono="verde" />
      <Flecha uid={u} d="M590 150 H694" tono="ambar" />
      <Flecha uid={u} d="M590 180 C645 180 645 246 694 246" tono="gris" discontinua />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El tablero del sprint 1                                              */
/* Cuatro columnas de 230 cada 246 desde x = 16 (16·262·508·754), alto  */
/* 16..164. Tarjeta a x + 12, y = 60, 206 × 86: título 16 negrita a     */
/* y + 26 y dos líneas de 16 a y + 50 y y + 72. Título más largo:       */
/* «#1 Kit de arranque» (18 × 10 ≈ 180) en 206 − 24.                    */
/* ------------------------------------------------------------------ */

const COLUMNAS: { titulo: string; tono: TonoSvg; tarjeta: [string, string, string] }[] = [
  { titulo: "Por hacer", tono: "gris", tarjeta: ["#4 Panel del club", "lleva: Iván", "revisa: Ana"] },
  { titulo: "En curso", tono: "azul", tarjeta: ["#3 Reservar pista", "lleva: Ana", "revisa: Leo"] },
  { titulo: "En revisión", tono: "ambar", tarjeta: ["#2 Pistas libres", "lleva: Leo", "revisa: Sara"] },
  { titulo: "Hecho", tono: "verde", tarjeta: ["#1 Kit de arranque", "lo lleva el equipo", "hoy, 3 de noviembre"] },
];

export function TableroSprint() {
  return (
    <Figura
      uid="tablero"
      ancho={1000}
      alto={180}
      etiqueta="El tablero del sprint 1 de una app de reservas. Por hacer: la issue 4, panel del club, la lleva Iván y la revisa Ana. En curso: la 3, reservar pista, la lleva Ana y la revisa Leo. En revisión: la 2, pistas libres, la lleva Leo y la revisa Sara. Hecho: la 1, el kit de arranque, del equipo entero, hoy."
      pie="Cada tarjeta es una issue con la etiqueta sprint-1: una persona la lleva y otra la revisa. Nunca la misma."
    >
      {COLUMNAS.map((c, i) => {
        const x = 16 + i * 246;
        const [titulo, l1, l2] = c.tarjeta;
        return (
          <g key={c.titulo}>
            <Zona x={x} y={16} w={230} h={148} tono={c.tono} rotulo={c.titulo} />
            <g data-caja="">
              <rect x={x + 12} y={60} width={206} height={86} rx={10} fill="var(--dg-papel)" stroke={linea(c.tono)} strokeWidth={2} />
              <text x={x + 24} y={86} fontSize={16} fontWeight={800} fill={fuerte(c.tono)}>
                {titulo}
              </text>
              <text x={x + 24} y={110} fontSize={16} fontWeight={500} fill="var(--dg-suave)">
                {l1}
              </text>
              <text x={x + 24} y={132} fontSize={16} fontWeight={500} fill="var(--dg-suave)">
                {l2}
              </text>
            </g>
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Acceso y entrega                                                     */
/* Tres cajas de 290 × 100 a y = 16: 16..306 · 353..643 · 690..980.     */
/* Flechas por el centro (y = 66), de borde a borde menos 6.            */
/* ------------------------------------------------------------------ */

export function AccesoEntrega() {
  const u = "acceso";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={132}
      etiqueta="Acceso y entrega en tres pasos. Uno: si el repo es privado, invitáis a aulaenlanube con rol Read. Dos: el profe acepta la invitación; hasta entonces no ve nada. Tres: una persona entrega en el campus por todo el equipo y queda guardada para todos, hoy antes de las 23:59."
    >
      <Caja x={16} y={16} w={290} h={100} tono="morado" titulo="Invitar a aulaenlanube" lineas={["solo si el repo es privado", "con el rol Read"]} />
      <Caja x={353} y={16} w={290} h={100} tono="ambar" titulo="El profe acepta" lineas={["hasta entonces", "no puede ver nada"]} />
      <Caja x={690} y={16} w={290} h={100} tono="verde" titulo="Uno entrega por todos" lineas={["en el campus del curso", "y queda para el equipo"]} />
      <Flecha uid={u} d="M306 66 H347" tono="morado" />
      <Flecha uid={u} d="M643 66 H684" tono="ambar" />
    </Figura>
  );
}
