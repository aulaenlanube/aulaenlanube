import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Aviso, Bloque, Chip, Codigo, DosColumnas, Lista, Prompt, TONO, Tarjeta, cls } from "@/app/programacion-ia/_video/piezas";
import { HERRAMIENTAS, RAIZ } from "../_datos";
import { CarpetaMundo, UnFallo } from "../sesion-05/figuras";
import { PROMPTS_S5 } from "../sesion-05/prompts";
import { CADENA } from "./cadena";
import { AGENTS_MD, ENCARGO, OPENCODE_JSON } from "./ficheros";
import { CalculoNota, CatalogoMomentos, FpEso, SeisBloques, Versiones } from "./figuras";

export const metadata: Metadata = {
  title: "Tu herramienta, paso a paso: el cuaderno de evaluación — Seminario de IA para docentes – Aula en la nube",
  description:
    "Ejemplo resuelto del seminario de IA para docentes: un cuaderno de evaluación por criterios (RA y CE en FP, competencias y criterios en ESO y Bachillerato) construido con OpenCode y un modelo gratuito. El encargo, AGENTS.md, opencode.json y la cadena real de ocho mensajes, con lo que falló y cómo se arregló.",
  alternates: { canonical: `${RAIZ}tu-herramienta/` },
};

const HERRAMIENTA = `${RAIZ}herramientas/cuaderno-evaluacion/`;
const P = Object.fromEntries(PROMPTS_S5.map((p) => [p.id, p]));

const ADAPTAR = `Adapta el cuaderno a mi caso, sin cambiar cómo calcula:
- Etapa y materia o módulo: [ETAPA, MATERIA O MÓDULO].
- Mis bloques: [RA O COMPETENCIAS, CON SU PESO].
- Mis criterios: [CRITERIOS DE CADA BLOQUE, CON SU PESO].
- Cambia el ejemplo del botón «Cargar ejemplo» por uno de mi materia, con alumnado ficticio.
Antes de tocar el fichero, dime en tres líneas qué vas a cambiar.`;

export default function TuHerramienta() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      {/* Portada */}
      <section data-bloque className="max-w-[1100px]">
        <Breadcrumbs
          grande
          items={[
            { title: "Seminario de IA para docentes", path: RAIZ },
            { title: "Tu herramienta", path: `${RAIZ}tu-herramienta/` },
          ]}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Chip tono="rosa">Ejemplo resuelto · Sesión 5</Chip>
          <Chip tono="gris">FP y Secundaria</Chip>
        </div>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Tu herramienta, <span className="text-rose-600 dark:text-rose-400">paso a paso</span>
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          Esta es la herramienta de ejemplo del seminario, construida de verdad con OpenCode y un modelo gratuito: un{" "}
          <b>cuaderno de evaluación por criterios</b> que sirve para FP y para ESO y Bachillerato. Aquí tienes el encargo,
          los dos ficheros de la carpeta y <b>la conversación entera, mensaje a mensaje</b>, con lo que falló al probarla y
          cómo se arregló. Úsala tal cual o haz la tuya.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`${HERRAMIENTA}index.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-rose-600 px-5 py-3 text-lg font-bold text-white transition hover:bg-rose-700 dark:bg-rose-500 dark:text-slate-950 dark:hover:bg-rose-400"
          >
            Abrir el cuaderno de evaluación →
          </a>
          <a
            href={`${HERRAMIENTA}index.html`}
            download="cuaderno-evaluacion.html"
            className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-lg font-bold text-zinc-800 transition hover:border-rose-300 dark:border-white/15 dark:bg-slate-900 dark:text-zinc-100"
          >
            Descargar el fichero
          </a>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["8 mensajes", "del plan a la versión final"],
            ["Gratis", "GLM-5.3-Flash Free, sin cuenta"],
            ["0 líneas", "escritas a mano"],
            ["1 fichero", "unos 42 KB, sin internet"],
          ].map(([a, b]) => (
            <div key={a} className={`${cls.suave} !p-4`}>
              <p className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">{a}</p>
              <p className={cls.tenue}>{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Catálogo */}
      <Bloque
        id="catalogo"
        etiqueta="Antes de nada"
        titulo="Elige qué vas a construir"
        entradilla="Seis ideas que funcionan bien como primera herramienta: resuelven algo que haces cada semana y caben en un solo fichero. La que elegiste en la sesión 4 vale más que cualquiera de estas."
      >
        <CatalogoMomentos />
      </Bloque>

      <Bloque titulo="Las seis, una a una" nivel={3}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {HERRAMIENTAS.map((h) => (
            <Tarjeta key={h.id} titulo={h.titulo} tono={h.tono} antetitulo={h.ejemplo ? `${h.para} · el ejemplo` : h.para}>
              {h.hace}
            </Tarjeta>
          ))}
        </div>
      </Bloque>

      {/* Qué hace */}
      <Bloque
        id="que-hace"
        etiqueta="El ejemplo"
        titulo="Qué hace el cuaderno de evaluación"
        entradilla="Cinco pestañas, de izquierda a derecha: lo configuras una vez y después solo pones notas."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Tarjeta titulo="1. Configuración" tono="azul" suave>
            Modo FP o ESO/Bachillerato. Bloques (RA o competencias) y criterios, cada uno con su peso. Avisa si no suman 100.
          </Tarjeta>
          <Tarjeta titulo="2. Alumnado" tono="azul" suave>
            Por código (A01, A02…) o por nombre. Un aviso fijo recuerda que los datos solo están en este navegador.
          </Tarjeta>
          <Tarjeta titulo="3. Actividades" tono="azul" suave>
            Cada actividad o instrumento, con las casillas de los criterios que evalúa: uno o varios.
          </Tarjeta>
          <Tarjeta titulo="4. Notas" tono="azul" suave>
            Una tabla alumnado × actividades, de 0 a 10 con coma. Vacía significa «no evaluado», no un cero.
          </Tarjeta>
          <Tarjeta titulo="5. Resultados" tono="azul" suave>
            Nota de cada criterio, de cada bloque y final, con aviso de quién tiene criterios pendientes.
          </Tarjeta>
          <Tarjeta titulo="Copia, CSV e imprimir" tono="verde" suave>
            Copia de seguridad en JSON, notas finales en CSV para tu hoja de cálculo y una versión limpia para imprimir.
          </Tarjeta>
        </div>
      </Bloque>

      <Bloque
        titulo="Cómo calcula una nota"
        nivel={3}
        entradilla="El alumno A01 del botón «Cargar ejemplo»: un examen con un 8 y una práctica con un 6,5."
      >
        <CalculoNota />
      </Bloque>

      {/* El encargo */}
      <Bloque
        id="encargo"
        etiqueta="Mensaje 1"
        titulo="El encargo, en seis bloques"
        entradilla="Es la plantilla de la sesión 5 rellenada. Fíjate en el contexto: dice qué falla hoy y que los datos no pueden salir del ordenador."
      >
        <SeisBloques />
      </Bloque>

      <Bloque titulo="Rol, contexto y tarea" nivel={3}>
        <Codigo code={ENCARGO} kind="md" etiqueta="Encargo real · parte 1 de 2" rango={[1, 13]} />
      </Bloque>

      <Bloque titulo="Reglas, formato y control" nivel={3}>
        <Codigo code={ENCARGO} kind="md" etiqueta="Encargo real · parte 2 de 2" rango={[15, 25]} />
      </Bloque>

      {/* Los ficheros */}
      <Bloque
        id="ficheros"
        etiqueta="La carpeta"
        titulo="Los dos ficheros de la carpeta"
        entradilla={
          <>
            Antes del primer mensaje, la carpeta <code className={cls.codigo}>cuaderno-evaluacion</code> solo tenía estos dos
            ficheros. Descárgalos y cambia lo que sea tuyo.
          </>
        }
      >
        <CarpetaMundo uid="th-carpeta" />
        <p className={`mt-4 ${cls.texto}`}>
          <a href={`${HERRAMIENTA}AGENTS.md`} download className={cls.enlace}>
            Descargar AGENTS.md
          </a>{" "}
          ·{" "}
          <a href={`${HERRAMIENTA}opencode.json`} download className={cls.enlace}>
            Descargar opencode.json
          </a>
        </p>
      </Bloque>

      <Bloque titulo="AGENTS.md: qué es y quién la usa" nivel={3}>
        <Codigo code={AGENTS_MD} kind="md" etiqueta="AGENTS.md · parte 1 de 2" rango={[1, 11]} />
      </Bloque>

      <Bloque titulo="AGENTS.md: lo que no se rompe" nivel={3}>
        <Codigo code={AGENTS_MD} kind="md" etiqueta="AGENTS.md · parte 2 de 2" rango={[13, 25]} />
      </Bloque>

      <Bloque titulo="opencode.json: los permisos" nivel={3}>
        <Codigo code={OPENCODE_JSON} kind="json" etiqueta="opencode.json" ajustar={false} />
      </Bloque>

      {/* La cadena */}
      <Bloque
        id="cadena"
        etiqueta="La conversación"
        titulo="La cadena real, mensaje a mensaje"
        entradilla="Ocho mensajes. Después de cada versión la probamos con datos conocidos y con las pruebas del alumno trasto; cada fallo, un mensaje."
      >
        <Versiones />
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
          {m.n === 1 ? (
            <p className={cls.texto}>
              El mensaje: una frase pidiendo el plan y, debajo, el encargo entero de arriba.
            </p>
          ) : (
            <Prompt text={m.texto} etiqueta={`Mensaje ${m.n}, literal`} />
          )}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Tarjeta titulo={m.version === "plan" ? "Lo que propuso el plan" : `Lo que hizo en la ${m.version}`} tono="azul" nivel={4}>
              {m.paso}
            </Tarjeta>
            <Tarjeta titulo={m.version === "plan" ? "Lo que leímos del plan" : `Lo que probamos de la ${m.version}`} tono="verde" nivel={4}>
              {m.probamos}
            </Tarjeta>
          </div>
        </Bloque>
      ))}

      <Aviso titulo="Lo que se hizo sin pantalla, contado" tono="ambar">
        <p>
          Los mensajes 1 y 2 se enviaron desde un script, sin la interfaz: con una copia de las reglas que permitía editar
          dentro de la carpeta y prohibía las órdenes de terminal y la web. Del 3 al 8 se usó la interfaz web de OpenCode, y
          cada cambio se aprobó con <b>Permitir una vez</b>.
        </p>
        <p>
          <b>Ninguna línea de la herramienta se escribió a mano.</b> Las respuestas del agente tenían alguna errata («lo
          arrreglo»), y una vez prometió algo que no hacía: por eso cada versión se prueba antes de pedir la siguiente.
        </p>
      </Aviso>

      {/* Adaptar */}
      <Bloque
        id="adaptar"
        etiqueta="Hazla tuya"
        titulo="Adáptala a tu materia o módulo"
        entradilla="No hace falta tocar el código: el modo FP o ESO cambia los rótulos y tus bloques y criterios se escriben en Configuración. Si quieres que venga ya preparada, pídeselo al agente."
      >
        <FpEso />
      </Bloque>

      <Bloque titulo="FP o Secundaria: qué escribes" nivel={3}>
        <DosColumnas
          centro="o"
          a={{
            titulo: "En FP",
            tono: "azul",
            puntos: [
              "Bloques = los RA de tu módulo, con el peso de tu programación.",
              "Criterios = los CE de cada RA, con su peso dentro del RA.",
              "Actividades = prácticas, pruebas, proyectos y la formación en empresa si la evalúas tú.",
            ],
          }}
          b={{
            titulo: "En ESO o Bachillerato",
            tono: "verde",
            puntos: [
              "Bloques = las competencias específicas de tu materia, con su peso.",
              "Criterios = los criterios de evaluación de cada competencia.",
              "Actividades = situaciones de aprendizaje, pruebas, cuaderno, exposiciones…",
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

      <Bloque titulo="Las dos peticiones que más usarás" nivel={3}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Prompt text={P["s5-un-fallo"].texto} etiqueta="Prompt · un fallo" />
          <Prompt text={P["s5-mejora"].texto} etiqueta="Prompt · una mejora" />
        </div>
      </Bloque>

      <Bloque titulo="Ideas para la versión 8" nivel={3}>
        <Lista
          className={cls.texto}
          items={[
            "Pegar la lista de clase desde una hoja de cálculo, en vez de escribirla.",
            "Una columna de recuperación que sustituya la nota de un criterio.",
            "Una evaluación (1.ª, 2.ª, 3.ª) por pestaña, con la nota final de curso.",
            "Un informe por alumno para imprimir, con sus criterios pendientes.",
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
          <span className="mt-1 block text-xl font-bold text-zinc-900 dark:text-zinc-100">Sesión 5 · Tu herramienta desde cero</span>
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
