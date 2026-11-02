import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Aviso, Bloque, Checklist, Chip, DosColumnas, TONO, Tarjeta, cls } from "@/app/programacion-ia/_video/piezas";
import { HiloSeminario } from "./_hilo";
import { RAIZ, RECURSOS, SESIONES } from "./_datos";

export const metadata: Metadata = {
  title: "Seminario de IA para docentes · 5 sesiones para FP y Secundaria – Aula en la nube",
  description:
    "Seminario práctico de inteligencia artificial para docentes de FP, ESO y Bachillerato de la Comunitat Valenciana: Copilot con la cuenta @edu.gva.es, protección de datos, preparar clases, evaluar y corregir, planificar el curso y construir tu propia herramienta con OpenCode. Cinco sesiones con prompts, tareas y vídeo resumen.",
  alternates: { canonical: RAIZ },
};

export default function SeminarioPortada() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      {/* Portada */}
      <section data-bloque className="max-w-[1100px]">
        <Breadcrumbs grande items={[{ title: "Seminario de IA para docentes", path: RAIZ }]} />
        <div className="flex flex-wrap items-center gap-2">
          <Chip>Seminario · 5 sesiones</Chip>
          <Chip tono="verde">FP, ESO y Bachillerato</Chip>
          <Chip tono="gris">Comunitat Valenciana</Chip>
        </div>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Seminario de <span className="text-blue-600 dark:text-blue-400">IA para docentes</span>
        </h1>
        <p className="mt-2 text-xl font-semibold tracking-tight text-zinc-600 dark:text-zinc-400">
          Preparar clases, corregir y planificar con la IA que ya tienes, y acabar con una herramienta tuya
        </p>
        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          Cinco sesiones pensadas para cualquier docente, aunque nunca hayas abierto un chat de IA. Trabajamos con{" "}
          <b>Copilot y tu cuenta @edu.gva.es</b>, que ya tienes pagada y protege tus datos, y con tu materia o tu
          módulo de verdad. Cada sesión deja una pieza, y en la última te construyes <b>desde cero una herramienta propia</b>{" "}
          con un agente de IA. Todo lo que se ve en clase está aquí, con sus prompts, para volver cuando lo necesites.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["5 sesiones", "de la primera pregunta a tu herramienta"],
            ["Prompts listos", "para copiar, con tus huecos marcados"],
            ["1 herramienta", "tuya, para el resto del curso"],
            ["0 €", "todo con lo que ya tienes"],
          ].map(([a, b]) => (
            <div key={a} className={`${cls.suave} !p-4`}>
              <p className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">{a}</p>
              <p className={cls.tenue}>{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* El hilo */}
      <Bloque
        id="hilo"
        etiqueta="El hilo del seminario"
        titulo="Cada sesión deja una pieza"
        entradilla={
          <>
            No son cinco charlas sueltas. Empiezas escribiendo la <b>ficha de tu materia o módulo</b>, el contexto que la
            IA necesita para no contestarte en genérico, y sesión a sesión le vas añadiendo piezas. En la quinta, un
            agente las junta en una <b>herramienta web hecha a tu medida</b>.
          </>
        }
      >
        <HiloSeminario uid="hilo-portada" />
      </Bloque>

      {/* Las cinco sesiones */}
      <Bloque id="sesiones" titulo="Las cinco sesiones">
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SESIONES.map((s) => (
            <li key={s.n}>
              <Link
                href={s.ruta}
                className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-slate-900 dark:hover:border-blue-500/50"
              >
                <span className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-0.5 text-base font-bold ${TONO[s.tono].chip}`}>
                  {`Sesión ${s.n}`}
                </span>
                <h3 className="mt-3 text-xl font-extrabold leading-snug text-zinc-900 dark:text-zinc-100">{s.titulo}</h3>
                <p className={`mt-2 flex-1 ${cls.texto}`}>{s.breve}</p>
                <p className={`mt-3 text-base font-bold ${TONO[s.tono].texto}`}>{`Te llevas: ${s.pieza.toLowerCase()} →`}</p>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={`${RAIZ}prompts/`}
              className="group flex h-full flex-col rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-5 transition hover:border-blue-300 dark:border-white/15 dark:bg-white/5 dark:hover:border-blue-500/50"
            >
              <span className={`inline-flex w-fit rounded-full border px-3 py-0.5 text-base font-bold ${TONO.gris.chip}`}>Para todas</span>
              <h3 className="mt-3 text-xl font-extrabold leading-snug text-zinc-900 dark:text-zinc-100">Biblioteca de prompts</h3>
              <p className={`mt-2 flex-1 ${cls.texto}`}>Todos los prompts del seminario en una sola página, por momento del curso.</p>
              <p className="mt-3 text-base font-bold text-blue-700 dark:text-blue-300">Abrir la biblioteca →</p>
            </Link>
          </li>
        </ol>
      </Bloque>

      {/* Tres reglas */}
      <Bloque
        id="reglas"
        titulo="Tres reglas que valen para todo"
        entradilla="Se repiten en cada sesión porque son las que separan usar la IA con criterio de tener un problema."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="La IA propone, tú decides" tono="azul" antetitulo="Regla 1">
            Ninguna nota, informe ni decisión sobre el alumnado sale de la IA sin pasar por ti. Lo que firmas es tuyo,
            aunque lo haya escrito una máquina.
          </Tarjeta>
          <Tarjeta titulo="Datos, solo en Copilot" tono="rosa" antetitulo="Regla 2">
            Si de verdad hace falta un dato personal, solo en Copilot con la cuenta del centro y el mínimo. Salud, NEE o
            situaciones familiares: nunca, en ninguna IA.
          </Tarjeta>
          <Tarjeta titulo="Lo que no pides, no viene" tono="verde" antetitulo="Regla 3">
            La IA no sabe quién es tu grupo ni qué dice tu currículo. Tu ficha se lo cuenta: con contexto, la respuesta
            deja de ser genérica.
          </Tarjeta>
        </div>
      </Bloque>

      {/* FP y Secundaria */}
      <Bloque
        id="para-quien"
        titulo="Para FP y para Secundaria"
        entradilla="El método es el mismo; lo que cambia es el vocabulario de tu currículo. En cada sesión verás los ejemplos de las dos etapas."
      >
        <DosColumnas
          centro="y"
          a={{
            titulo: "Si das clase en FP",
            tono: "azul",
            puntos: [
              "Módulos profesionales con sus resultados de aprendizaje (RA) y criterios de evaluación (CE).",
              "Unidades de trabajo, prácticas de taller y formación en empresa.",
              "Aules para el curso, las tareas y los bancos de preguntas.",
            ],
          }}
          b={{
            titulo: "Si das clase en ESO o Bachillerato",
            tono: "verde",
            puntos: [
              "Materias con competencias específicas, criterios de evaluación y saberes básicos.",
              "Situaciones de aprendizaje y atención a la diversidad del grupo real.",
              "Aules o Teams para el aula virtual; familias que preguntan.",
            ],
          }}
        />
      </Bloque>

      {/* Antes de empezar */}
      <Bloque
        id="antes"
        etiqueta="Antes de la sesión 1"
        titulo="Lo que conviene traer preparado"
        entradilla="Diez minutos el día antes y la primera sesión empieza trabajando, no peleándote con las contraseñas."
      >
        <Checklist
          items={[
            {
              texto: "Entra en copilot.cloud.microsoft",
              detalle: "Con tu cuenta del centro (@edu.gva.es), no con una personal. Si te pide elegir cuenta, es la del trabajo.",
            },
            {
              texto: "Busca el indicador de protección",
              detalle: "Un escudo o el aviso de protección de datos de la organización junto al chat: es lo que hace seguro el Copilot del centro.",
            },
            {
              texto: "Ten a mano tu currículo",
              detalle: "El de tu materia o módulo (DOGV o BOE) y, si la tienes, tu programación didáctica.",
            },
            {
              texto: "Piensa en un grupo real",
              detalle: "Cuántos son, cómo van y qué les cuesta. Sin nombres: «24 alumnos, 3 con dificultades de lectura».",
            },
            {
              texto: "Trae portátil y cargador",
              detalle: "Se trabaja en cada sesión. Con el navegador basta hasta la sesión 5.",
            },
            {
              texto: "Opcional: pide GitHub Education",
              detalle: "Da Copilot Pro gratis a docentes, pero la verificación tarda días. Te servirá en la sesión 5.",
            },
          ]}
        />
      </Bloque>

      {/* Vídeos resumen: solo en la web */}
      <section id="videos" className="sem-solo-web mt-16 max-w-[1100px]">
        <h2 className="text-[32px] font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">Vídeos resumen</h2>
        <p className={`mt-3 max-w-4xl text-lg ${cls.texto}`}>
          Cada sesión tiene su recorrido en vídeo en el canal{" "}
          <a href="https://www.youtube.com/@ia-para-docentes" target="_blank" rel="noopener noreferrer" className={cls.enlace}>
            IA para docentes
          </a>
          . Aparecen aquí a medida que se publican.
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {SESIONES.map((s) => (
            <li key={s.n}>
              <Link href={s.video ? `https://www.youtube.com/watch?v=${s.video}` : `${s.ruta}#video-s${s.n}`} {...(s.video ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`block h-full rounded-xl border p-4 ${TONO[s.tono].caja}`}>
                <span className={`block text-base font-bold ${TONO[s.tono].texto}`}>{`Sesión ${s.n}`}</span>
                <span className={`mt-1 block text-base font-semibold ${TONO[s.tono].tinta}`}>{s.corto}</span>
                <span className="mt-2 block text-base text-zinc-600 dark:text-zinc-400">{s.video ? "Ver el vídeo →" : "En preparación"}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Recursos */}
      <Bloque id="recursos" titulo="Recursos del seminario">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {RECURSOS.map((r) => (
            <li key={r.t}>
              <Link
                href={r.u}
                {...(r.u.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="block h-full rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-900 dark:hover:border-blue-500/50"
              >
                <span className="block text-xl font-bold text-zinc-900 dark:text-zinc-100">{r.t} →</span>
                <span className={`mt-1 block ${cls.texto}`}>{r.d}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Bloque>

      <Aviso titulo="Esto cambia cada pocos meses" tono="ambar">
        <p>
          Los nombres, los botones y lo que incluye cada licencia se mueven a menudo: en abril de 2026, por ejemplo,
          desapareció el botón de Copilot dentro de Word y PowerPoint para quien no paga licencia. Todo lo que afirma este
          seminario está comprobado en fuentes oficiales a <b>noviembre de 2026</b>, y cada sesión enlaza la suya. Si algo
          no aparece en tu pantalla, no es culpa tuya: compruébalo con tu cuenta y avisa.
        </p>
      </Aviso>
    </div>
  );
}
