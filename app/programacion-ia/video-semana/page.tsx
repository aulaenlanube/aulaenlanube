import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "El curso, en vídeo — Semana a semana · Curso de Programación con IA",
  description:
    "Serie semanal de vídeos contando cómo se imparte el Curso de Programación con IA (1º DAM, IES Simarro): el método, los proyectos, la clase aumentada. Guiones incluidos.",
};

const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";

// ── Serie semanal ──────────────────────────────────────────────────────────
// Cada semana: añadir una entrada con su guion y, al subirlo, el id de YouTube.
type Video = {
  semana: string;
  fecha: string;
  titulo: string;
  youtubeId: string | null; // poner el id cuando esté publicado
  resumen: string;
  bloques: { h: string; dur?: string; p: string }[];
};

const VIDEOS: Video[] = [
  {
    semana: "Vídeo 01",
    fecha: "Viernes 19-09 grabación · Domingo 21-09 publicación",
    titulo: "Soy profe de DAM y este año no voy a enseñar a programar como hasta ahora",
    youtubeId: "WfTPdFcvJCc",
    resumen:
      "Presentación del cambio de método: por qué un curso de Java de 220+ vídeos deja de ser la forma de enseñar en 2026, qué haremos en el curso, y la clase aumentada (transcripción en tiempo real + JARVIS).",
    bloques: [
      {
        h: "GANCHO (primeros 20s, a cámara, sin saludo, sin intro, sin música. Directo y cortante)",
        p: "No vas a encontrar un curso de programación como este en ningún sitio. Y no es un curso para programar: es un curso para crear. No necesitas saber programar. No necesitas memorizar una sola coma. Necesitas ganas de crear: una app, una web, un negocio. Te voy a enseñar cómo se programa a partir de ahora. Y te lo enseña un profesor de una titulación oficial, en un instituto público, con 30 alumnos delante.",
      },
      {
        h: "CONTEXTO (aquí entra lo tuyo: lo del curso de Java)",
        dur: "60s",
        p: "Aclaración necesaria antes de que nadie me lo pregunte: yo tengo un curso de Java en este canal. Más de 220 vídeos, de los más completos que vas a encontrar. Y precisamente por eso, atención: este año he tomado la decisión de no enseñar así a mis alumnos de DAM. No porque esté mal, sino porque en 2026 ya no es la forma. Soy Edu, doy Programación en 1º de DAM en el IES Simarro, y estoy rediseñando la asignatura entera alrededor de una idea: programar con IA, no gracias a la IA. Los datos no dejan mucha salida: el 72% de los desarrolladores profesionales ya programa con IA a diario; el 90% del alumnado de FP Superior ya usa IA generativa para estudiar. La herramienta ya está en la industria y en las mochilas. Lo que no existe es enseñar a usarla como un profesional: dirigir, verificar, decidir. Y no es un experimento de un profe suelto: la UE aprobó este mayo unas conclusiones sobre el profesorado en la era de la IA que van en esta dirección.",
      },
      {
        h: "EL CAMBIO: de temas a proyectos",
        dur: "60-90s",
        p: "Antes: tema uno, sintaxis; tema dos, estructuras de control; tema cien, examen de memoria. Ahora: proyectos. Primero, una web personal de marca hecha fichero a fichero —HTML, CSS y JS por separado— con el chat del centro: antes de que un agente te construya una web, tienes que entender cómo funciona una web. Segundo, GitHub y Git sin memorizar comandos: commit, rama, PR, y qué significa cuando tu agente te dice «vas tres commits por detrás»; tu GitHub será la copia de seguridad y el portafolio del curso. Y a final de curso, dos piezas gordas: un proyecto final individual —cada alumno elige: CLI, app con IA, SaaS, videojuego, Android…— y un proyecto en grupo tipo startup: un producto real, publicado en un servidor, con Stripe montado, pensado para sobrevivir al curso. Un 1º de DAM con un producto que puede seguir vivo en septiembre.",
      },
      {
        h: "LA CLASE AUMENTADA (transcripción + JARVIS)",
        dur: "60-90s",
        p: "Segunda pata, igual de importante: la propia clase también está aumentada con IA. Cada sesión se transcribe en tiempo real desde el micro del aula y cada pocos minutos se genera un resumen automático. Consecuencias reales: el alumno que llega tarde abre la plataforma y en dos minutos sabe qué se ha hecho, sin preguntarme ni interrumpir; el que estaba concentrado programando y se ha despistado, lo recupera al instante; y al final del curso tiene todas las sesiones resumidas, con resúmenes semanales y mensuales encadenados: su propio material de estudio generado sin mover un dedo. Y un paso más: JARVIS, el asistente de clase. Escucha la sesión y cuando detecta un silencio de verdad —algo atascado, la clase rumiando una idea— interrumpe: «disculpad, tengo una información que puede interesaros». Un dato, un ejemplo, un aviso de error común. Con límites: intervenciones contadas, y el profesor siempre puede pedirle la palabra o silenciarlo. No sustituye al profe: es el alumno adelantado que levanta la mano con el dato correcto.",
      },
      {
        h: "SERIE SEMANAL + CTA",
        dur: "30s",
        p: "Esto es oficial: un ciclo de FP, con su currículo, haciéndolo. Y como es la primera vez que alguien lo cuenta desde dentro, voy a grabar el curso semana a semana: qué hemos hecho, qué ha salido mal, qué hemos cambiado. Sin postureo: si algo no funciona, sale también. Si enseñas programación, estás en FP o te interesa cómo se adapta de verdad la formación a la IA: suscríbete, esto no lo está contando nadie más desde dentro.",
      },
      {
        h: "DEMO WEB (~5 min, pantalla + voz en off)",
        p: "Ruta: 1) Portada del curso — el curso son los proyectos, no los temas; norma de oro: «usa todos los agentes que quieras, pero entiende lo que entregas». 2) Proyecto web personal — anatomía de la landing (cada bloque responde una pregunta del visitante) y el trío HTML/CSS/JS. 3) Sesión 1 — un prompt copiable en acción y el paso de comprobar en el navegador. 4) Opcional: la transcripción real de la última clase en la plataforma y 10s del control de JARVIS. 5) Proyectos finales — las 6 familias del individual con ejemplos reales (Calendly, PhotAI, Vampire Survivors) y la startup: roles, PRs, VPS, Stripe. Cierre de bloque: «¿Esto es 1º de DAM o una incubadora? Un poco de las dos.»",
      },
      {
        h: "CIERRE (30s, a cámara)",
        p: "El vídeo uno de una serie que durará todo el curso. Cada domingo, lo de la semana, con las webs de los alumnos de por medio si ellos quieren. Alumno de 1º DAM: la web del curso ya está arriba; iros pensando quién sois. Nos vemos el domingo que viene.",
      },
    ],
  },
  {
    semana: "Vídeo 02",
    fecha: "Sábado 26-09 grabación · Domingo 27-09 publicación",
    titulo: "Tu primer proyecto con IA: de una carpeta vacía a GitHub",
    youtubeId: "2L1hakuXpVk",
    resumen:
      "El primer proyecto real, creado desde cero fichero a fichero con el chat (HTML, CSS y JS por separado) y conectado a GitHub: repo, commit y push sin memorizar un solo comando. El tutorial se improvisa en pantalla; el intro va cerrado palabra por palabra.",
    bloques: [
      {
        h: "GANCHO (0:00-1:30, sin saludo, sin sintonía — carpeta vacía en pantalla. Redactado literal)",
        p: "Hoy vamos a crear un proyecto real desde cero: una web personal, fichero a fichero, sin escribir a mano una sola línea de código. Y no nos vamos a quedar en la carpeta: al final de este vídeo ese proyecto va a estar en GitHub, con tu nombre, público y con historial. Eso que separa a quien «hace cosas con la IA» de quien tiene un proyecto de desarrollador. Fíjate en la palabra: historial. Cualquiera te genera código hoy. Lo que casi nadie te enseña es el proceso que convierte una carpeta de ficheros sueltos en un proyecto del que puedes volver atrás, presumir y entregar. Eso es lo que vas a ver completo, desde una carpeta vacía. En unos diez minutos vas a tener algo que no existía cuando pulsaste play. Y el paso 5, el del token de GitHub, es donde la mitad de mis alumnos se atascaron la primera vez — te lo enseñaré también cuando falla. Vamos allá. [Corte al escritorio] Antes de seguir: esto es el resumen de la semana 2 del curso de programación con IA que doy a 1º de DAM en el IES Simarro. La semana pasada conté el cambio de método —por qué este año no enseño programación como toda la vida—; si no lo viste, no importa: este vídeo funciona solo. Pero si te pica, te lo dejo enlazado: youtu.be/WfTPdFcvJCc.",
      },
      {
        h: "TUTORIAL (1:30-9:00, improvisado — estos son los beats para que no falte ninguno)",
        p: "1) Carpeta vacía → pedir SOLO el HTML al chat; abrir en el navegador: ya existe, y es feo (bien: ese es el punto de partida real). «Un fichero cada vez, nunca la web entera de una». 2) style.css a petición aparte: antes/después en pantalla; «separados entiendes el edificio». 3) script.js con una interacción mínima: tercer prompt, tercer fichero. 4) La norma de oro a pantalla: «usa todos los agentes que quieras, pero entiende cada línea que entregas» — pedir al agente que explique lo que acaba de escribir. 5) GitHub, el momento de la verdad: repo vacío creado en la web (público, sin README); los comandos init/add/commit/remote/push los genera el agente — lo que se explica son los 4 conceptos (repo, commit=fotografía, remote=dirección, push=tirar para arriba). El token: tal cual, incluido que solo se copia una vez; «si os atascais aquí, es la fricción normal del día uno». 6) La recompensa: repo público con tu usuario, histórico del commit, los tres ficheros dentro; «esto es lo que lleva un junior a su primera entrevista — costado una tarde». 7) Cierre del tutorial: borrar un fichero y recuperarlo viajando en el tiempo con git; loop al ep03: «la semana que viene, todo lo que tiene que ser de Git — ramas, PRs y por qué tu agente te dice «vas tres commits por detrás»».",
      },
      {
        h: "LA REVELACIÓN (9:00-9:45, a cámara, tono cercano)",
        p: "Para los que no sabíais: esto es un curso de programación con IA. Oficial —1º de DAM, ciclo de FP, con su currículo y su examen final— rediseñado entero para aprender a programar dirigiendo agentes, no repitiendo sintaxis. Lo doy en un instituto público con treinta alumnos y lo estoy grabando semana a semana: qué hemos hecho, qué ha salido mal, qué hemos cambiado. Sin postureo: si algo no funciona, sale en el vídeo.",
      },
      {
        h: "CIERRE (9:45-10:15, a cámara)",
        p: "Tu deber, si te ha servido: carpeta vacía, tres ficheros, un repo con tu nombre. En media hora lo tienes. Suscríbete si quieres ver cómo se programa en 2026 contado desde dentro de un aula pública. Vídeo nuevo el domingo.",
      },
    ],
  },
];

function VideoEntry({ v }: { v: Video }) {
  return (
    <article className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm">
      <div className="border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 px-5 py-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2 className="text-lg font-extrabold tracking-tight">{v.titulo}</h2>
          <span className="rounded-full border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
            {v.semana}
          </span>
        </div>
        <p className="mt-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">{v.fecha}</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{v.resumen}</p>
      </div>

      {v.youtubeId ? (
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
            title={v.titulo}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="m-5 rounded-xl border border-dashed border-zinc-300 dark:border-white/15 bg-zinc-50 dark:bg-white/5 p-5 text-center text-sm text-zinc-500 dark:text-zinc-400">
          🎬 Vídeo en preparación — se incrustará aquí al publicarse.
          <span className="mt-1 block text-xs">
            (Mientras tanto: el guion de grabación, abajo — visible a propósito, para que veas cómo se
            construye cada entrega.)
          </span>
        </div>
      )}

      <div className="px-5 pb-5">
        <h3 className="mt-4 text-sm font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Guion de la grabación
        </h3>
        <div className="mt-2 space-y-3">
          {v.bloques.map((b, i) => (
            <section key={i} className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4">
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{b.h}</h4>
                {b.dur && (
                  <span className="flex-none rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400">
                    {b.dur}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">{b.p}</p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function CursoIAVideos() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Curso de Programación con IA", path: "/programacion-ia/" },
          { title: "El curso, en vídeo", path: "/programacion-ia/video-semana/" },
        ]}
      />
      <span className={chip}>1º DAM/DAW · IES Simarro · Bitácora en vídeo</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        El curso, en vídeo — semana a semana
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
        Cada semana grabamos un vídeo contando cómo va el curso: el método, los proyectos, la clase
        aumentada. Aquí viven todos, con su guion a la vista — porque contar el proceso incluye contar
        cómo se prepara.
      </p>
      <div className="mt-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 p-4 text-sm text-zinc-600 dark:text-zinc-400">
        <b>Formato:</b> vídeo corto (~10 min), grabado el viernes por la mañana, publicado el domingo
        por la noche. Los guiones se publican tal cual se usan: sin humo.
      </div>

      {VIDEOS.map((v) => (
        <VideoEntry key={v.semana} v={v} />
      ))}

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 dark:border-white/10 pt-5">
        <Link href="/programacion-ia/" className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5">
          ← Volver al curso
        </Link>
        <Link href="https://www.youtube.com/@aulaenlanube" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:hover:bg-slate-600">
          Canal en YouTube →
        </Link>
      </div>
    </div>
  );
}
