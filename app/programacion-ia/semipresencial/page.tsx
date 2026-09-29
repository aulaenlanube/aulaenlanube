import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Curso de Programación con IA · Semipresencial (1º DAM) – Aula en la nube",
  description:
    "Grupo semipresencial (1CFSDS) del Curso de Programación con IA del IES Simarro: trabajo por quincenas, proyecto individual (web personal de marca) sin proyecto en grupo.",
};

const chip =
  "inline-block rounded-full border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300";

const RUTA = "/programacion-ia/tutoriales/";
const TUTORIALES = [
  [`${RUTA}github-pages/`, "TUTORIAL 1", "Publica tu web y domina GitHub", "GitHub Pages paso a paso y el flujo óptimo: commits que cuentan, issues, PRs y qué no se sube nunca."],
  [`${RUTA}api-externa/`, "TUTORIAL 2", "Datos vivos de una API externa", "Un widget con datos reales (tiempo, GitHub, música) que la IA escribe por ti y tú sabes explicar."],
  [`${RUTA}chatbot/`, "TUTORIAL 3", "Un chatbot que responde por ti", "Burbuja de chat en tu web con tu personalidad, sin filtrar tus datos y sin exponer claves."],
  [`${RUTA}medios/`, "TUTORIAL 4", "Medios que cuentan tu historia", "SVG propios, vídeo por código y animaciones con intención: la riqueza de medios que puntúa."],
] as const;

const SESIONES = [
  ["/programacion-ia/sesion-01/", "Sesión 1", "Crear tu web con el chat del centro", "Pide tu HTML, tu CSS y tu JS con prompts listos para copiar, únelos, pruébala y publícala."],
  ["/programacion-ia/sesion-02/", "Sesión 2", "GitHub en carne viva", "Git y GitHub de verdad: configuración, token, repo enlazado a tu carpeta, commits honestos, ramas y merge."],
  ["/programacion-ia/sesion-03/", "Sesión 3", "Por qué programamos así + rúbrica", "Los datos del sector, tu nuevo rol como desarrollador con IA y la rúbrica con la que se corrige tu web."],
] as const;

export default function CursoIASemipresencial() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Curso de Programación con IA", path: "/programacion-ia/" },
          { title: "Semipresencial", path: "/programacion-ia/semipresencial/" },
        ]}
      />
      <span className={chip}>Grupo semipresencial · 1CFSDS · IES Simarro</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Curso de Programación con IA · <span className="text-amber-600 dark:text-amber-400">Semipresencial</span>
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
        Estás viendo la zona del <b>grupo semipresencial</b>. Mismo método que el presencial —programar
        <b> con</b> IA, no gracias a la IA—, pero con dos diferencias de peso: <b>trabajamos por
        quincenas</b> y <b>todo el curso es proyecto individual</b>: no hay proyecto en grupo. Tu
        evaluación son tus proyectos, publicados y
        presentados.
      </p>

      <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px] text-zinc-700 dark:text-zinc-300">
          <b>Alumnado del grupo:</b> accede a tu aula para ver tus entregas abiertas y tu nota.
        </p>
        <Link
          href="/programacion-ia/acceso/"
          className="inline-flex flex-none items-center justify-center rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400"
        >
          Acceso al aula →
        </Link>
      </div>

      {/* ============ QUINCENAS ============ */}
      <h2 className="mt-10 text-2xl font-extrabold tracking-tight">El ritmo: quincenas</h2>
      <p className="mt-1 max-w-3xl text-[15px] text-zinc-600 dark:text-zinc-400">
        En semipresencial no hay «la clase del miércoles»: cada <b>quincena</b> tiene un objetivo, sus
        recursos y una fecha de entrega. Avanzas tú, con el chat del centro y los tutoriales; el profesor
        revisa al final de cada quincena. Estas son las dos quincenas activas ahora mismo:
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Quincena 1 */}
        <section className="rounded-2xl border-2 border-amber-300 dark:border-amber-500/50 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <SvgQuincena1 />
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-amber-600 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
              Quincena 1 · EN CURSO
            </span>
            <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">29 sep → 9 oct</span>
          </div>
          <h3 className="mt-3 text-xl font-extrabold">Iniciar la web personal de marca</h3>
          <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
            <b>Objetivo de la quincena:</b> tu web funcionando en local, sección a sección, con su repositorio
            GitHub creado y con commits desde el primer día. <b>No se entrega nada al acabar:</b> se entrega
            el trabajo de dentro (git) y la web completa llega en la quincena 2.
          </p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[15px] text-zinc-800 dark:text-zinc-200">
            <li>
              Lee el proyecto y su anatomía de 6 secciones:{" "}
              <Link href="/programacion-ia/web-personal/" className="font-semibold text-amber-700 underline dark:text-amber-400">
                Web personal de marca →
              </Link>
            </li>
            <li>
              <b>Sesiones 1 y 2</b> (toca la sesión 3 al final, cuando quieras ver cómo se corrige):
              <ul className="mt-1 list-none space-y-1 pl-0">
                <li>· <Link href="/programacion-ia/sesion-01/" className="text-amber-700 underline dark:text-amber-400">Sesión 1 — crear tu web con el chat del centro</Link></li>
                <li>· <Link href="/programacion-ia/sesion-02/" className="text-amber-700 underline dark:text-amber-400">Sesión 2 — GitHub en carne viva</Link></li>
              </ul>
            </li>
            <li>
              Crea tu repo <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] dark:bg-white/10">web-marca</code> en GitHub (público),
              enlázalo a tu carpeta y haz <b>al menos 6 commits</b> con mensajes honestos esta quincena.
            </li>
            <li>
              Apoya con los tutoriales cuando atores: <Link href={`${RUTA}github-pages/`} className="text-amber-700 underline dark:text-amber-400">T1 GitHub</Link>{" "}
              y <Link href={`${RUTA}medios/`} className="text-amber-700 underline dark:text-amber-400">T4 Medios</Link> son los de esta quincena.
            </li>
            <li>
              Apunta en tu cuaderno de decisiones (o en <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] dark:bg-white/10">README.md</code>)
              qué decidiste tú y qué pidió la IA: esto se valora.
            </li>
          </ol>
          <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
            <b>Comprobación del 9 de octubre:</b> el profesor mira tu repo: commits reales y la web en
            marcha. En semipresencial <b>no hace falta trabajar todos los días</b> — vale con que el
            trabajo exista y se vea en el historial. Si estás más atrasado, dilo antes de esa fecha y lo
            reorganizamos; no pasa nada por empezar con la quincena 2.
          </p>
        </section>

        {/* Quincena 2 */}
        <section className="rounded-2xl border-2 border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <SvgQuincena2 />
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-zinc-700 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white dark:bg-zinc-600">
              Quincena 2 · Próxima
            </span>
            <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">12 oct → 23 oct</span>
          </div>
          <h3 className="mt-3 text-xl font-extrabold">Entregar la web de marca (con su repo)</h3>
          <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
            <b>Objetivo de la quincena:</b> terminar la web pulida, publicarla en GitHub Pages y{" "}
            <b>ENTREGAR: URL de tu web + URL de tu repositorio</b>. La nota sale de la rúbrica aplicada
            sobre el repo del día de la entrega.
          </p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[15px] text-zinc-800 dark:text-zinc-200">
            <li>
              <b>Sesión 3</b> — lectura obligatoria antes de pulir:{" "}
              <Link href="/programacion-ia/sesion-03/" className="font-semibold text-amber-700 underline dark:text-amber-400">
                Por qué programamos así + la rúbrica completa
              </Link>
              . Ahí están los 4 requisitos mínimos y los 7 criterios: cada punto te dice exactamente qué
              hacer para subir.
            </li>
            <li>
              Sube de nivel con lo que puntúa: <Link href={`${RUTA}api-externa/`} className="text-amber-700 underline dark:text-amber-400">T2 API externa</Link>,{" "}
              <Link href={`${RUTA}chatbot/`} className="text-amber-700 underline dark:text-amber-400">T3 chatbot</Link>,{" "}
              <Link href={`${RUTA}medios/`} className="text-amber-700 underline dark:text-amber-400">T4 medios</Link>. Una vía de
              contacto que <b>funcione de verdad</b> es requisito mínimo.
            </li>
            <li>
              Publica en GitHub Pages (tutorial 1) y comprueba la web en tu móvil (requisito mínimo:
              responsive probado en dispositivo).
            </li>
            <li>
              Historial git limpio: commits con mensajes que cuenten el trabajo, sin claves ni basura
              subida. Se corrige sobre el repo, no sobre promesas.
            </li>
            <li>
              <b>Entrega el 23 de octubre</b> desde el aula: <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] dark:bg-white/10">URL web + URL repo</code>.
              Con la entrega, un párrafo de 3 líneas: qué decidiste tú, qué harías distinto.
            </li>
          </ol>
          <p className="mt-4 rounded-xl bg-zinc-100 p-3 text-sm text-zinc-700 dark:bg-white/5 dark:text-zinc-300">
            <b>Hasta el último minuto hay puntos en la mesa:</b> la rúbrica premia la iteración. Mejorar el
            contacto, añadir un widget real o unos SVG propios la última semana vale igual que hacerlo en
            la primera.
          </p>
        </section>
      </div>

      {/* Herramientas desde casa */}
      <div className="mt-10 rounded-2xl border-2 border-violet-300 dark:border-violet-500/40 bg-white p-6 shadow-sm dark:bg-slate-900">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <SvgHerramientas />
          <div className="flex-1">
            <h2 className="text-xl font-extrabold tracking-tight">Tus herramientas desde casa: el chat de Copilot (Microsoft 365)</h2>
            <p className="mt-2 text-[15px] text-zinc-700 dark:text-zinc-300">
              Tu cuenta de <b>Microsoft 365 del centro</b> incluye <b>Copilot</b>, y su <b>chat</b> es
              <b> lo único que vas a usar en este primer proyecto</b> (estas dos quincenas). Nada de
              instalar editores ni complementos todavía: preguntas al chat, con las respuestas que te dé
              <b> creas y editas tú los ficheros</b> (index.html, style.css…), y <b>tú manualmente haces
              los commits</b> con lo que has preguntado y conseguido en cada paso.
            </p>
            <p className="mt-2 text-[15px] text-zinc-700 dark:text-zinc-300">
              Es un método a propósito <b>manual y sin atajos</b>: así aprendes de verdad qué es cada
              fichero, cómo se monta una web por dentro y cómo funciona GitHub. El Visual Studio Code con
              su Copilot integrado llegará más adelante, en otro proyecto, cuando ya domines esto.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-zinc-700 dark:text-zinc-300">
              <li><b>Pregunta como si hablaras con una persona:</b> explica qué quieres conseguir y por qué; el chat responde mejor a una intención clara que a un «hazme una web».</li>
              <li><b>Guarda tus preguntas buenas:</b> tus prompts van dentro del commit (o en un comentario del fichero) — son la evidencia de tu proceso que valora la rúbrica.</li>
              <li><b>Consejo de quincena:</b> primera semana a construir, segunda a pulir y probar en tu móvil; entregar a última hora sin probar es perder puntos gratis.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cómo se trabaja */}
      <h2 className="mt-10 text-2xl font-extrabold tracking-tight">Cómo se trabaja en semipresencial</h2>
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 text-[15px] text-zinc-800 dark:text-zinc-200">
          <h3 className="font-bold">Tu forma de trabajar (no negociable)</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li><b>Git es tu diario:</b> no hace falta trabajar a diario, pero cada sesión de trabajo real deja sus commits. Un único commit gigante el día de entrega no cuenta como proceso.</li>
            <li><b>Decide tú, escribe la IA:</b> pide, prueba, rompe, corrige. El proyecto se <b>presenta</b> (no hay defensa oral); si al corregir queda alguna duda, el profesor te pregunta sobre ese fichero concreto y lo aclaras. Variable según el caso.</li>
            <li><b>Nada de clave API expuesta:</b> ni en el repo ni en el chat público del centro. Lo que no sabes explicar, no lo entregas.</li>
            <li><b>Bloqueado &gt; 30 minutos:</b> pregunta (foro del aula o sesión presencial). Atascarse es trabajar; atascarse en silencio es perder la quincena.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 text-[15px] text-zinc-800 dark:text-zinc-200">
          <h3 className="font-bold">Qué NO tiene este grupo (y por qué)</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li><b>Sin proyecto en grupo:</b> el semipresencial se evalúa íntegramente con proyectos individuales. El «proyecto final en grupo · startup» es solo del grupo presencial.</li>
            <li><b>Sin notas por asistencia:</b> cuenta el trabajo visible en el repo al cierre de cada quincena.</li>
            <li><b>Sin entrega de la quincena 1:</b> solo comprobación de proceso; la nota del proyecto llega en la quincena 2.</li>
          </ul>
        </div>
      </div>

      {/* Misma información que el presencial */}
      <h2 className="mt-10 text-2xl font-extrabold tracking-tight">Todo lo que puntúa (igual que en presencial)</h2>
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link href="/programacion-ia/web-personal/" className="block rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
          <span className="mb-2 inline-block rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">Proyecto</span>
          <h3 className="text-lg font-bold">Web personal de marca</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Qué es, anatomía de 6 secciones y todos los recursos. Es el proyecto de estas dos quincenas.</p>
        </Link>
        <Link href="/programacion-ia/sesion-03/" className="block rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
          <span className="mb-2 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">Evaluación</span>
          <h3 className="text-lg font-bold">La rúbrica, al detalle</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">4 requisitos mínimos + 7 criterios con 4 niveles de concreción sobre 100 puntos. Tu hoja de ruta para la máxima nota.</p>
        </Link>
        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <span className="mb-2 inline-block rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300">Tutoriales</span>
          <h3 className="text-lg font-bold">Los 4, encajados con la rúbrica</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {TUTORIALES.map(([href, num, t]) => (
              <li key={href}><Link href={href} className="font-semibold text-amber-700 underline underline-offset-2 dark:text-amber-400">{num}: {t}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 p-5 text-[15px]">
        <b>Trimestres siguientes:</b> tras la web de marca toca elegir tu <b>proyecto final individual</b>{" "}
        <Link href="/programacion-ia/proyecto-final-individual/" className="font-semibold text-amber-700 underline dark:text-amber-400">(ver familias y plan para elegirlo bien →)</Link>{" "}
        — también por quincenas. La planificación se publicará aquí con dos quincenas de antelación.
      </div>
    </div>
  );
}

// ——— Il·lustracions de les quincenes (SVG inline, sense dependències) ———
function SvgQuincena1() {
  // Navegador brotant: esquelet de la web naixent d'una branca de git.
  return (
    <svg viewBox="0 0 300 84" role="img" aria-label="Iniciar la web: navegador amb brot verds sobre una branca de git" className="h-[72px] w-full">
      <path d="M8 70 C 80 70, 100 70, 150 40 S 240 12, 292 12" fill="none" stroke="#d97706" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="8" cy="70" r="7" fill="#f59e0b" />
      <circle cx="150" cy="40" r="6" fill="#fff" stroke="#d97706" strokeWidth="3" />
      <rect x="182" y="40" width="46" height="32" rx="4" fill="none" stroke="#475569" strokeWidth="2.5" />
      <line x1="182" y1="48" x2="228" y2="48" stroke="#475569" strokeWidth="2" />
      <line x1="187" y1="56" x2="212" y2="56" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="187" y1="63" x2="222" y2="63" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M244 16 q -8 -14 4 -18 q 2 12 -4 18" fill="#16a34a" />
      <path d="M256 12 q 10 -12 20 -6 q -8 12 -20 6" fill="#22c55e" />
    </svg>
  );
}

function SvgQuincena2() {
  // Entrega: checklist + pujada a la nau (publicar + entregar).
  return (
    <svg viewBox="0 0 300 84" role="img" aria-label="Entrega: llista de comprovació i publicació" preserveAspectRatio="xMinYMid meet" className="h-[72px] w-full">
      <rect x="8" y="14" width="56" height="62" rx="6" fill="none" stroke="#475569" strokeWidth="2.5" />
      {[26, 42, 58].map((y, i) => (
        <g key={i}>
          <rect x="16" y={y - 8} width="10" height="10" rx="2" fill="none" stroke="#16a34a" strokeWidth="2" />
          {i < 3 && <path d={`M18 ${y - 3} l3 3 l5 -6`} fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />}
          <line x1="34" y1={y - 3} x2="56" y2={y - 3} stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
      <path d="M84 52 h 96" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="7 6" strokeLinecap="round" />
      <path d="M170 52 l-10 -6 v12 z" fill="#94a3b8" />
      <rect x="206" y="40" width="52" height="30" rx="8" fill="none" stroke="#475569" strokeWidth="2.5" />
      <path d="M220 58 v-8 m0 0 l-6 6 m6 -6 l6 6" stroke="#2563eb" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="210" y="28" fontSize="11" fontWeight="700" fill="#1e40af">web + repo</text>
      <path d="M280 24 l0 34 m0 -34 l-8 10 m8 -10 l8 10" stroke="#d97706" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function SvgHerramientas() {
  // Xat de Copilot: bombolles de conversa + espurnes + fitxer creat — sense logos registrats.
  return (
    <svg viewBox="0 0 120 96" role="img" aria-label="Xat d'intel·ligència artificial que genera fitxers" className="h-[96px] w-[120px] flex-none">
      <rect x="6" y="8" width="108" height="66" rx="8" fill="none" stroke="#475569" strokeWidth="2.5" />
      <line x1="6" y1="20" x2="114" y2="20" stroke="#475569" strokeWidth="2" />
      <circle cx="14" cy="14" r="2.2" fill="#f87171" /><circle cx="21" cy="14" r="2.2" fill="#fbbf24" /><circle cx="28" cy="14" r="2.2" fill="#34d399" />
      <rect x="14" y="27" width="52" height="11" rx="5.5" fill="#7c3aed" opacity="0.16" stroke="#7c3aed" strokeWidth="1.5" />
      <line x1="20" y1="32.5" x2="58" y2="32.5" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="52" y="43" width="54" height="11" rx="5.5" fill="#a78bfa" opacity="0.18" stroke="#7c3aed" strokeWidth="1.5" />
      <line x1="58" y1="48.5" x2="100" y2="48.5" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="14" y="59" width="44" height="10" rx="5" fill="none" stroke="#475569" strokeWidth="1.8" />
      <path d="M104 58 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" fill="#7c3aed" />
      <path d="M40 61 h14 v8 h-14 z" fill="none" stroke="#16a34a" strokeWidth="2" />
      <text x="18" y="67.5" fontSize="7" fontWeight="700" fill="#16a34a">index</text>
      <text x="6" y="90" fontSize="9" fontWeight="700" fill="#5b21b6">Copilot · tot per xat</text>
    </svg>
  );
}
