import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Aviso, Bloque, Chip, Codigo, DosColumnas, Lista, Prompt, TONO, Tarjeta, cls } from "@/app/programacion-ia/_video/piezas";
import { HERRAMIENTAS, RAIZ } from "../_datos";
import { CarpetaMundo, CuentaA01, MapaPlataforma, UnFallo } from "../sesion-05/figuras";
import { PROMPTS_S5 } from "../sesion-05/prompts";
import { CADENA, REPO, VERSIONES_MM } from "./cadena";
import { OPENCODE_JSON } from "./ficheros";
import { AGENTS_MM, ENCARGO_MM } from "./plataforma";
import { CatalogoMomentos } from "./figuras";

export const metadata: Metadata = {
  title: "Tu plataforma, paso a paso: Mi módulo — Seminario de IA para docentes – Aula en la nube",
  description:
    "Ejemplo resuelto del seminario de IA para docentes: la plataforma «Mi módulo» (currículo del BOE, unidades, calendario, rúbricas, cuaderno de evaluación, preguntas GIFT para Aules y prompts para Copilot) construida con OpenCode y un modelo gratuito. El encargo, los ficheros de la carpeta y la conversación entera, con cada fallo y cómo se arregló.",
  alternates: { canonical: `${RAIZ}tu-herramienta/` },
};

const RUTA = `${RAIZ}herramientas/mi-modulo/`;
const P = Object.fromEntries(PROMPTS_S5.map((p) => [p.id, p]));

const ADAPTAR = `Lee AGENTS.md y mira index.html: es una plataforma para preparar un módulo. Adáptala a mi caso, sin cambiar cómo calcula:
- Mi módulo o materia: [NOMBRE, CURSO Y HORAS].
- Cambia en AGENTS.md lo que es de Montaje y mantenimiento de equipos por lo mío.
- Cambia el ejemplo del botón «Cargar ejemplo» por uno de mi módulo, con alumnado inventado.
Antes de tocar nada, dime en tres líneas qué vas a cambiar.`;

export default function TuPlataforma() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      {/* Portada */}
      <section data-bloque className="max-w-[1100px]">
        <Breadcrumbs
          grande
          items={[
            { title: "Seminario de IA para docentes", path: RAIZ },
            { title: "Tu plataforma", path: `${RAIZ}tu-herramienta/` },
          ]}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Chip tono="rosa">Ejemplo resuelto · Sesión 5</Chip>
          <Chip tono="gris">FP y Secundaria</Chip>
        </div>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Tu plataforma, <span className="text-rose-600 dark:text-rose-400">paso a paso</span>
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          La plataforma de ejemplo del seminario, construida de verdad con OpenCode y un modelo gratuito: <b>Mi módulo</b>,
          para preparar y llevar un módulo de FP todo el curso. Aquí tienes el encargo, los ficheros de la carpeta y{" "}
          <b>la conversación entera, mensaje a mensaje</b>, con cada fallo que encontramos al probarla y cómo se arregló.
          Úsala tal cual o haz la tuya.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`${RUTA}index.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-rose-600 px-5 py-3 text-lg font-bold text-white transition hover:bg-rose-700 dark:bg-rose-500 dark:text-slate-950 dark:hover:bg-rose-400"
          >
            Abrir Mi módulo →
          </a>
          <a
            href={`${RUTA}index.html`}
            download="mi-modulo.html"
            className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-lg font-bold text-zinc-800 transition hover:border-rose-300 dark:border-white/15 dark:bg-slate-900 dark:text-zinc-100"
          >
            Descargar el fichero
          </a>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-lg font-bold text-zinc-800 transition hover:border-rose-300 dark:border-white/15 dark:bg-slate-900 dark:text-zinc-100"
          >
            El repositorio en GitHub
          </a>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            [`${CADENA.length} mensajes`, "del plan a la versión final"],
            ["2 modelos", "GLM gratis y el Qwen del instituto"],
            ["0 líneas", "escritas a mano"],
            ["1 fichero", "sin internet ni instalación"],
          ].map(([a, b]) => (
            <div key={a} className={`${cls.suave} !p-4`}>
              <p className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">{a}</p>
              <p className={cls.tenue}>{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Qué hace */}
      <Bloque
        id="que-hace"
        etiqueta="El ejemplo"
        titulo="Qué hace Mi módulo"
        entradilla="Todo sale del currículo que pegas una vez. Pulsa «Cargar ejemplo» en Inicio y la verás llena con Montaje y mantenimiento de equipos (1.º de SMR), el calendario 2026-27 y alumnado inventado."
      >
        <MapaPlataforma uid="th-mapa" />
      </Bloque>

      <Bloque
        titulo="Las cinco herramientas del catálogo, juntas"
        nivel={3}
        entradilla="En la sesión 4 elegías una de estas. La plataforma junta las cinco primeras; la de la formación en empresa queda como idea para tu versión."
      >
        <CatalogoMomentos />
      </Bloque>

      <Bloque titulo="Las seis, una a una" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {HERRAMIENTAS.map((h) => (
            <Tarjeta key={h.id} titulo={h.titulo} tono={h.tono} antetitulo={h.id === "empresa" ? `${h.para} · para tu versión` : `${h.para} · dentro`}>
              {h.hace}
            </Tarjeta>
          ))}
        </div>
      </Bloque>

      <Bloque
        titulo="Cómo calcula una nota"
        nivel={3}
        entradilla="Nota de cada CE = media de las actividades que lo evalúan; nota de cada RA = media ponderada de sus CE con nota; nota final = media ponderada de los RA con nota. Lo no evaluado no cuenta y se avisa."
      >
        <CuentaA01 uid="th-cuenta" />
      </Bloque>

      {/* El encargo */}
      <Bloque
        id="encargo"
        etiqueta="Antes del primer mensaje"
        titulo="El encargo, por fases"
        entradilla="La plantilla de la sesión 4, con una sección más: describe la plataforma entera y pide construirla por partes."
      >
        <Codigo code={ENCARGO_MM} kind="md" etiqueta="encargo.md · parte 1 de 2" rango={[1, 22]} />
      </Bloque>

      <Bloque titulo="Pantallas, reglas, límites y pruebas" nivel={3}>
        <Codigo code={ENCARGO_MM} kind="md" etiqueta="encargo.md · parte 2 de 2" rango={[24, 54]} />
      </Bloque>

      {/* Los ficheros */}
      <Bloque
        id="ficheros"
        etiqueta="La carpeta"
        titulo="Los ficheros de la carpeta"
        entradilla={
          <>
            Antes del primer mensaje, la carpeta <code className={cls.codigo}>mi-modulo</code> tenía AGENTS.md, opencode.json,
            el encargo y dos ficheros para probar: el currículo copiado del BOE y el calendario escolar del DOGV.
          </>
        }
      >
        <CarpetaMundo uid="th-carpeta" />
        <p className={`mt-4 ${cls.texto}`}>
          <a href={`${RUTA}AGENTS.md`} download className={cls.enlace}>
            Descargar AGENTS.md
          </a>{" "}
          ·{" "}
          <a href={`${RUTA}opencode.json`} download className={cls.enlace}>
            Descargar opencode.json
          </a>{" "}
          ·{" "}
          <a href={`${RUTA}encargo.md`} download className={cls.enlace}>
            Descargar encargo.md
          </a>
        </p>
      </Bloque>

      <Bloque titulo="AGENTS.md: qué es y quién la usa" nivel={3}>
        <Codigo code={AGENTS_MM} kind="md" etiqueta="AGENTS.md · parte 1 de 2" rango={[1, 10]} />
      </Bloque>

      <Bloque titulo="AGENTS.md: lo que no se rompe" nivel={3}>
        <Codigo code={AGENTS_MM} kind="md" etiqueta="AGENTS.md · parte 2 de 2" rango={[12, 24]} />
      </Bloque>

      <Bloque titulo="opencode.json: los permisos" nivel={3}>
        <Codigo code={OPENCODE_JSON} kind="json" etiqueta="opencode.json" ajustar={false} />
      </Bloque>

      {/* La cadena */}
      <Bloque
        id="cadena"
        etiqueta="La conversación"
        titulo="La cadena real, mensaje a mensaje"
        entradilla={`${CADENA.length} mensajes. Después de cada versión la probamos con datos conocidos, con las pruebas del alumno trasto, con la consola abierta y con la calculadora; cada fallo, un mensaje.`}
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {VERSIONES_MM.map((v) => (
            <div key={v.v} className={`${cls.suave} !p-4`}>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                <span className={`mr-2 font-mono ${TONO[v.tono].texto}`}>{v.v}</span>
                {v.que}
              </p>
              <p className={cls.tenue}>{v.detalle}</p>
            </div>
          ))}
        </div>
      </Bloque>

      {CADENA.map((m) => (
        <Bloque
          key={m.n}
          id={`mensaje-${m.n}`}
          nivel={3}
          titulo={`${m.n}. ${m.titulo}`}
          entradilla={
            <span className="flex flex-wrap items-center gap-2">
              <Chip tono={m.agente === "Plan" ? "morado" : "azul"}>{`Agente ${m.agente}`}</Chip>
              <Chip tono="gris">{m.version === "plan" ? "Sin cambios en ficheros" : `Resultado: ${m.version}`}</Chip>
              {m.permisos ? <Chip tono="ambar">{`${m.permisos} × Permitir una vez`}</Chip> : null}
              {m.tiempo ? <Chip tono="gris">{m.tiempo}</Chip> : null}
            </span>
          }
        >
          <Prompt text={m.texto} etiqueta={`Mensaje ${m.n}, literal`} />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Tarjeta titulo={m.version === "plan" ? "Lo que propuso el plan" : "Lo que hizo el agente"} tono="azul" nivel={4}>
              {m.paso}
            </Tarjeta>
            <Tarjeta titulo={m.version === "plan" ? "Lo que leímos del plan" : "Lo que probamos después"} tono="verde" nivel={4}>
              {m.probamos}
            </Tarjeta>
          </div>
        </Bloque>
      ))}

      <Aviso titulo="Cómo se hizo, con total transparencia" tono="ambar">
        <p>
          Todo en la interfaz de OpenCode 2.2.5 (la misma de la app de escritorio) y una carpeta aislada: los mensajes 1 a
          13 con el modelo gratuito GLM-5.3-Flash Free y, cuando se agotó el uso gratuito del día, del 14 en adelante con
          Qwen 3.8 Flash-Next en el servidor de IA del instituto. Cada cambio en <code className={cls.codigo}>index.html</code> se aprobó con{" "}
          <b>Permitir una vez</b>; las órdenes que pidió ejecutar se leyeron antes de aprobarlas (una se denegó, y lo
          contamos en el mensaje 3; otras tres, por precaución, en el mensaje 15).
        </p>
        <p>
          <b>Ninguna línea de la plataforma se escribió a mano.</b> El agente se equivocó y lo dijo varias veces; otras dijo
          «arreglado» y no lo estaba. Por eso cada versión se probó antes de pedir la siguiente, y cada una está guardada en
          el repositorio.
        </p>
      </Aviso>

      {/* Adaptar */}
      <Bloque
        id="adaptar"
        etiqueta="Hazla tuya"
        titulo="Adáptala a tu módulo o materia"
        entradilla="No hace falta tocar el código: pegas tu currículo en Currículo y pones tus unidades y tu calendario. Si quieres que venga preparada para ti, pídeselo al agente."
      >
        <DosColumnas
          centro="o"
          a={{
            titulo: "En FP",
            tono: "azul",
            puntos: [
              "Pegas los RA y CE de tu módulo tal cual del BOE.",
              "Pones el peso de cada RA según tu programación.",
              "Unidades, calendario, rúbricas y preguntas, con tus horas y tus CE.",
            ],
          }}
          b={{
            titulo: "En ESO o Bachillerato",
            tono: "verde",
            puntos: [
              "Competencias específicas en lugar de RA; criterios en lugar de CE.",
              "Pegas los criterios de tu materia (1.1, 1.2…) del currículo.",
              "Situaciones de aprendizaje en lugar de unidades de trabajo.",
            ],
          }}
        />
      </Bloque>

      <Bloque titulo="Que venga preparada para ti" nivel={3}>
        <Prompt text={ADAPTAR} etiqueta="Prompt · OpenCode (agente Build)" />
      </Bloque>

      {/* Mejoras */}
      <Bloque
        id="mejoras"
        etiqueta="Y después"
        titulo="Cómo pedirle mejoras"
        entradilla="Igual que en la cadena: una cosa por mensaje, probada antes de pedir la siguiente, y una copia de cada versión que funcione."
      >
        <UnFallo uid="th-fallo" />
      </Bloque>

      <Bloque titulo="Las peticiones que más usarás" nivel={3}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Prompt text={P["s5-un-fallo"].texto} etiqueta="Prompt · un fallo" />
          <Prompt text={P["s5-consola"].texto} etiqueta="Prompt · el error de la consola" />
          <Prompt text={P["s5-calculadora"].texto} etiqueta="Prompt · la cuenta no cuadra" />
          <Prompt text={P["s5-mejora"].texto} etiqueta="Prompt · una pantalla nueva" />
        </div>
      </Bloque>

      <Bloque titulo="Ideas para tu versión" nivel={3}>
        <Lista
          className={cls.texto}
          items={[
            "La formación en empresa: empresas, alumnado, visitas y el plan formativo.",
            "Pegar la lista de clase desde una hoja de cálculo, en vez de escribirla.",
            "Una columna de recuperación que sustituya la nota de un CE.",
            "Un informe por alumno para imprimir, con sus CE pendientes.",
          ]}
        />
      </Bloque>

      {/* Enlaces */}
      <nav aria-label="Seguir" className="mt-16 grid max-w-[1100px] grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href={`${RAIZ}sesion-05/`}
          className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-900 dark:hover:border-blue-500/50"
        >
          <span className="block text-base font-semibold text-zinc-600 dark:text-zinc-400">← Volver</span>
          <span className="mt-1 block text-xl font-bold text-zinc-900 dark:text-zinc-100">Sesión 5 · Tu plataforma del módulo</span>
        </Link>
        <Link
          href={RAIZ}
          className={`rounded-2xl border p-5 text-right transition hover:-translate-y-0.5 ${TONO.rosa.caja}`}
        >
          <span className="block text-base font-semibold text-zinc-600 dark:text-zinc-400">Seminario</span>
          <span className="mt-1 block text-xl font-bold text-zinc-900 dark:text-zinc-100">Portada del seminario →</span>
        </Link>
      </nav>
    </div>
  );
}
