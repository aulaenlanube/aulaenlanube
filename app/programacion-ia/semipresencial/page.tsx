import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import BotonProgramacion from "../_programacion-didactica/BotonProgramacion";

export const metadata: Metadata = {
  title: "Curso de Programación con IA · Semipresencial (1º DAM) – Aula en la nube",
  description:
    "Grupo semipresencial (1CFSDS) del Curso de Programación con IA del IES Simarro: trabajo por quincenas y proyectos individuales. Ahora: CLI «tareas con IA».",
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
        recursos y una fecha. Avanzas tú, con tu agente (OpenCode) y las páginas de cada sesión; el
        profesor revisa al final de cada quincena. Estas son las dos quincenas del <b>proyecto 2</b>:
      </p>

      <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-[15px] text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
        <b>Quincenas 1 y 2 · Web personal de marca — terminadas.</b> La corrección (con la rúbrica detallada
        y tu informe) aparece en tu aula cuando el profesor la publica.{" "}
        <Link href="/programacion-ia/acceso/" className="font-semibold underline">Ir al aula →</Link>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Quincena 3 */}
        <section className="rounded-2xl border-2 border-amber-300 dark:border-amber-500/50 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <SvgQuincena3 />
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-amber-600 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
              Quincena 3 · EN CURSO
            </span>
            <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">26 oct → 6 nov</span>
          </div>
          <h3 className="mt-3 text-xl font-extrabold">Arrancar tu CLI «tareas con IA»</h3>
          <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
            <b>Objetivo de la quincena:</b> tu herramienta de terminal instalada como comando, con{" "}
            <b>3 acciones propias</b> definidas en tu <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] dark:bg-white/10">acciones.json</code>{" "}
            funcionando (con modo simulación), su primer ADR y commits reales desde el primer día.
          </p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[15px] text-zinc-800 dark:text-zinc-200">
            <li>
              Lee el proyecto: qué es una CLI, sus partes, las tecnologías y cómo se instala:{" "}
              <Link href="/programacion-ia/cli/" className="font-semibold text-amber-700 underline dark:text-amber-400">
                CLI «tareas con IA» →
              </Link>
            </li>
            <li>
              <b>Tutoría colectiva de arranque (presencia obligatoria):</b> la terminal desde cero, Python, uv y
              <b>OpenCode</b> conectado a los modelos del centro. Es el bloque del curso que más necesita al profesor a tu lado.
            </li>
            <li>
              <b>Semana 1:</b>{" "}
              <Link href="/programacion-ia/cli/sesion-01/" className="text-amber-700 underline dark:text-amber-400">Sesión 1 — la terminal y tu primera orden</Link>:
              repo <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] dark:bg-white/10">cli-tareas</code> público, <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] dark:bg-white/10">.gitignore</code> antes
              del primer commit y <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] dark:bg-white/10">tareas --help</code> funcionando.
            </li>
            <li>
              <b>Semana 2:</b>{" "}
              <Link href="/programacion-ia/cli/sesion-02/" className="text-amber-700 underline dark:text-amber-400">Sesión 2 — acciones.json y el motor</Link>:
              tu esquema de acciones, validación, excepciones propias y el ADR de la configuración externa.
            </li>
          </ol>
          <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
            <b>Comprobación del 6 de noviembre:</b> el profesor mira tu repo: 3 acciones propias que funcionan,
            el ADR y un historial de commits real. No se pone nota todavía; si vas atrasado, dilo antes de esa
            fecha y lo reorganizamos.
          </p>
        </section>

        {/* Quincena 4 */}
        <section className="rounded-2xl border-2 border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <SvgQuincena4 />
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-zinc-700 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white dark:bg-zinc-600">
              Quincena 4 · Próxima
            </span>
            <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">9 nov → 20 nov</span>
          </div>
          <h3 className="mt-3 text-xl font-extrabold">IA, pruebas y versión 1.0</h3>
          <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
            <b>Objetivo de la quincena:</b> la capa de IA (con la clave fuera del repositorio y un modo sin
            red), pruebas automáticas de los casos feos, README de instalación y la <b>release v1.0</b> que
            cualquiera instala con una orden. <b>Entrega el 20 de noviembre</b> desde el aula: URL del repo.
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] text-zinc-800 dark:text-zinc-200">
            <li>Acciones con IA (resumir, generar el README de una carpeta, renombrar por contenido) con <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] dark:bg-white/10">.env</code> ignorado por git.</li>
            <li>pytest + GitHub Actions en Linux, Windows y macOS.</li>
            <li>Tutoría final de <b>instalación cruzada</b>: instalas la CLI de un compañero siguiendo solo su README.</li>
          </ul>
          <p className="mt-4 rounded-xl bg-zinc-100 p-3 text-sm text-zinc-700 dark:bg-white/5 dark:text-zinc-300">
            Las páginas de las sesiones 3 y 4 se publican aquí antes de que empiece la quincena. La rúbrica
            completa ya está en la{" "}
            <Link href="/programacion-ia/cli/" className="font-semibold underline">portada del proyecto</Link>.
          </p>
        </section>
      </div>

      {/* Herramientas desde casa */}
      <div className="mt-10 rounded-2xl border-2 border-violet-300 dark:border-violet-500/40 bg-white p-6 shadow-sm dark:bg-slate-900">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <SvgHerramientas />
          <div className="flex-1">
            <h2 className="text-xl font-extrabold tracking-tight">Desde la CLI trabajas con un agente: OpenCode</h2>
            <p className="mt-2 text-[15px] text-zinc-700 dark:text-zinc-300">
              En la web de marca trabajaste <b>solo con el chat de Copilot</b> y creando los ficheros a mano:
              ya sabes qué es cada fichero y cómo funciona GitHub. Desde el proyecto 2 das el salto a trabajar de
              forma <b>agéntica</b> con <b>OpenCode</b>, el agente de programación open source que el instituto
              conecta a sus <b>modelos de IA locales</b>: lee tu proyecto, propone un plan, edita los ficheros y
              ejecuta órdenes, siempre con tu permiso. Lo abres en una terminal (también en la de VS Code) y lo
              usarás todo el curso. El chat queda para consultas.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-zinc-700 dark:text-zinc-300">
              <li><b>Guía completa:</b> <Link href="/programacion-ia/opencode/" className="font-semibold text-amber-700 underline dark:text-amber-400">OpenCode: tu agente de programación →</Link> (instalación, conexión, agentes, permisos, AGENTS.md, skills, MCP).</li>
              <li><b>Tú decides, el agente programa, tú auditas:</b> la spec y el <code className="rounded bg-zinc-100 px-1 font-mono text-[13px] dark:bg-white/10">acciones.json</code> son tuyos; cada cambio lo apruebas leyendo el diff y los commits los haces tú.</li>
              <li><b>Desde casa:</b> en la tutoría colectiva de arranque te explicamos cómo conectar OpenCode a los modelos del centro desde fuera del instituto.</li>
              <li><b>Windows, Linux o macOS:</b> cualquiera vale. Las sesiones traen las órdenes para bash y para PowerShell.</li>
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
      <h2 className="mt-10 text-2xl font-extrabold tracking-tight">Proyectos y evaluación (igual que en presencial)</h2>
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/programacion-ia/web-personal/" className="block rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
          <span className="mb-2 inline-block rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">Proyecto</span>
          <h3 className="text-lg font-bold">Web personal de marca</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Proyecto 1 (quincenas 1 y 2): qué es, anatomía de 6 secciones y todos los recursos.</p>
        </Link>
        <Link href="/programacion-ia/cli/" className="block rounded-2xl border-2 border-amber-300 dark:border-amber-500/50 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
          <span className="mb-2 inline-block rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">Proyecto 2 · ahora</span>
          <h3 className="text-lg font-bold">CLI «tareas con IA»</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Quincenas 3 y 4: tu herramienta de terminal con acciones propias, IA y release v1.0. Incluye su rúbrica.</p>
        </Link>
        <Link href="/programacion-ia/sesion-03/" className="block rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
          <span className="mb-2 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">Evaluación</span>
          <h3 className="text-lg font-bold">La rúbrica de la web, al detalle</h3>
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
        <b>Después:</b> tras la CLI viene el videojuego (quincenas 5 y 6) y, en los trimestres siguientes, tu <b>proyecto final individual</b>{" "}
        <Link href="/programacion-ia/proyecto-final-individual/" className="font-semibold text-amber-700 underline dark:text-amber-400">(ver familias y plan para elegirlo bien →)</Link>{" "}
        — también por quincenas. La planificación se publicará aquí con dos quincenas de antelación.
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px] text-amber-900 dark:text-amber-200">
          <b>Programación didáctica del módulo 0485 (curso 2026-27).</b> El documento oficial del grupo
          semipresencial: resultados de aprendizaje, las 5 unidades de trabajo (una por proyecto), quincenas,
          tutorías, evaluación y prueba final presencial.
        </p>
        <BotonProgramacion modalidad="semipresencial" />
      </div>
    </div>
  );
}

// ——— Il·lustracions de les quincenes (SVG inline, sense dependències) ———
function SvgQuincena3() {
  // Terminal con una orden y su salida: arrancar la CLI.
  return (
    <svg viewBox="0 0 300 84" role="img" aria-label="Terminal con la orden tareas --help y su salida" className="h-[72px] w-full">
      <rect x="8" y="6" width="200" height="72" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
      <circle cx="20" cy="17" r="3" fill="#f87171" /><circle cx="30" cy="17" r="3" fill="#fbbf24" /><circle cx="40" cy="17" r="3" fill="#34d399" />
      <text x="18" y="40" fontSize="12" fontFamily="monospace" fontWeight="700" fill="#fbbf24">$</text>
      <text x="30" y="40" fontSize="12" fontFamily="monospace" fill="#e2e8f0">tareas --help</text>
      <line x1="18" y1="52" x2="120" y2="52" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
      <line x1="18" y1="64" x2="160" y2="64" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
      <path d="M226 26 h44 a6 6 0 0 1 6 6 v34 a6 6 0 0 1 -6 6 h-44 a6 6 0 0 1 -6 -6 v-34 a6 6 0 0 1 6 -6 z" fill="none" stroke="#d97706" strokeWidth="2.5" />
      <text x="230" y="44" fontSize="10" fontFamily="monospace" fontWeight="700" fill="#d97706">{"{ }"}</text>
      <text x="228" y="62" fontSize="9" fontWeight="700" fill="#92400e">acciones</text>
    </svg>
  );
}

function SvgQuincena4() {
  // Release: commits que acaban en la etiqueta v1.0.
  return (
    <svg viewBox="0 0 300 84" role="img" aria-label="Historial de commits que termina en la versión 1.0" preserveAspectRatio="xMinYMid meet" className="h-[72px] w-full">
      <line x1="16" y1="46" x2="196" y2="46" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
      {[16, 60, 104, 148].map((x) => (
        <circle key={x} cx={x} cy="46" r="7" fill="#fff" stroke="#475569" strokeWidth="2.5" />
      ))}
      <circle cx="196" cy="46" r="9" fill="#d97706" />
      <path d="M212 30 h52 l14 16 l-14 16 h-52 z" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" strokeLinejoin="round" />
      <text x="222" y="51" fontSize="13" fontWeight="800" fill="#92400e">v1.0</text>
      <path d="M60 22 l6 -10 l6 10" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
      <text x="40" y="76" fontSize="10" fontWeight="700" fill="#475569">IA · pruebas · README</text>
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
      <text x="6" y="90" fontSize="9" fontWeight="700" fill="#5b21b6">OpenCode · agente</text>
    </svg>
  );
}
