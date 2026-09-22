import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Proyecto final individual — Curso de Programación con IA",
  description:
    "El proyecto final individual de 1º DAM con IA: tipos de proyecto (CLI, apps con IA, SaaS, videojuegos, Android), ejemplos reales replicables y cómo elegir el tuyo.",
};

const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";

const CATEGORIAS = [
  {
    icono: "⌨️",
    nombre: "Aplicación de línea de comandos (CLI)",
    dificultad: "Media",
    que: "Programa que se usa escribiendo comandos, sin interfaz gráfica: la base de las herramientas reales de desarrollador.",
    ideas: "Un gestor de tareas tipo todoist pero en terminal · un conversor masivo de ficheros (pdf→txt, imágenes→webp) · un descargador/renombrador inteligente de tu música · un CLI que te diga el tiempo y te lo guarde en un historial.",
    reales: "Los propios git, npm o curl son CLIs. Herramientas de moda como yt-dlp o la CLI de Gemini son exactamente esto: potentes, simples y 100% automatizables.",
  },
  {
    icono: "🤖",
    nombre: "App que usa IA por API",
    dificultad: "Media",
    que: "Tu programa llama a una IA (OpenAI, Gemini, Claude…) para generar algo: texto, imagen, audio, resúmenes. La habilidad no es el modelo: es diseñar para qué lo usas.",
    ideas: "Generador de planes de entrenamiento por objetivo · resumen automático de tus apuntes a tarjetas de repaso · «profe de Java» que corrige tu código y te explica solo tus errores · creador de descripciones de productos para la tienda de alguien.",
    reales: "Notion AI, Perplexity o PhotAI (un hispano la escaló a millones) empezaron como una fina capa sobre una API. Eso es exactamente lo que puedes construir tú.",
  },
  {
    icono: "🌐",
    nombre: "SaaS / web con usuarios",
    dificultad: "Alta",
    que: "Una web con cuentas, datos y (algún día) cobros: un servicio. Es el salto de «página» a «producto».",
    ideas: "Reserva de pistas de pádel/tenis para tu pueblo · control de gastos para comunidades de vecinos · gestor de turnos para peluquerías pequeñas · tablón de clases particulares locales.",
    reales: "Calendly (agendar reuniones) o Beanbag (turnos de trabajo) son micro-SaaS de una sola pantalla bien hecha. Piensa en tu entorno: cada trámite que haces a mano es un candidato.",
  },
  {
    icono: "🎮",
    nombre: "Videojuego",
    dificultad: "Media-Alta",
    que: "Con motores web (Phaser, Pixi) o Unity/Godot asistido por IA: bucle de juego, progresión, y si puede, multijugador.",
    ideas: "Un clon moderno de 2048/Flappy con Skin del IES Simarro · juego de preguntas de tu asignatura favorita con ranking online · tower defense minimal · el clásico snake pero con IA que lo juega mejor que tú.",
    reales: "Muchos indie de éxito (Vampire Survivors empezó casi solo) demuestran que la idea y el pulido valen más que los gráficos. Con IA, una persona ya hace lo que antes hacía un equipo.",
  },
  {
    icono: "📱",
    nombre: "App Android (o multiplataforma)",
    dificultad: "Alta",
    que: "El corazón del ciclo DAM: apps nativas o con framework (Flutter, React Native/Expo) usando sensores, notificaciones, ubicación.",
    ideas: "Companion de entrenamientos con GPS para runners del pueblo · escáner de nevera: foto → qué cocino con esto (IA) · app de controles parentales simplificada para mayores · monitor de La Creueta: cuenta subidas y récords como el mío.",
    reales: "Cada categoría de las apps que llevas instaladas tiene miles de clones: WhatsApp → Telegram, Uber → Cabify. En Android casi todo es mejorable; encuentra el hueco.",
  },
  {
    icono: "🧩",
    nombre: "Automatización / bot",
    dificultad: "Baja-Media",
    que: "Un programa que hace cosas solo: bot de Telegram/Discord, scraping, tareas programadas. El mejor punto de partida para el que quiera resultados rápidos.",
    ideas: "Bot de Telegram que avisa de restocks de componentes GPU · scraper de precios de segunda mano (Wallapop) para tu hobby con alertas · bot que pasa la lista de tu clase y genera el parte · mini-asistente por Telegram que te manda el tiempo y tus citas.",
    reales: "Milones de bots de Discord corriendo ya; las APIs de Telegram son gratis y su documentación es de las mejores. Empezar hoy es literalmente seguir un tutorial de 30 minutos… y luego mejorar la idea.",
  },
];

export default function CursoIAFinalIndividual() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Curso de Programación con IA", path: "/programacion-ia/" },
          { title: "Proyecto final individual", path: "/programacion-ia/proyecto-final-individual/" },
        ]}
      />
      <span className={chip}>1º DAM/DAW · Proyecto final · Individual</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Proyecto final individual: el que será <em className="not-italic text-blue-700 dark:text-blue-300">tuyo</em>
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
        A final de curso, cada alumno construye un software ambicioso y personal, con agentes de IA como
        equipo. No es un examen disfrazado: es tu primera pieza de portafolio real. Esta página es tu
        brújula para elegir — vuelve a ella cuando estés perdido.
      </p>

      <div className="my-5 rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-5 text-[15px] text-blue-900 dark:text-blue-200">
        <b>Cómo se elige bien:</b> el mejor proyecto final no es el más grande, es el que <b>tú usarás</b>
        {" "}(o alguien de tu entorno usará) y del que no podrás parar de hablar. Si después de tres días
        sigues con ganas, es el bueno. Si te aburre, cámbialo: el enunciado es tuyo.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Tipos de proyecto (con ideas y ejemplos reales)</h2>
      <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
        Seis familias donde caben casi todas las ideas. Las ideas son eso, ideas: inspírate, copia la
        estructura, cambia el contenido. Copiar <b>ideas</b> y mejorarlas no es trampa — es cómo progresa
        el software desde siempre.
      </p>

      <div className="mt-4 space-y-4">
        {CATEGORIAS.map((c) => (
          <section key={c.nombre} className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <h3 className="flex flex-wrap items-center gap-3 text-[17px] font-bold">
              <span aria-hidden>{c.icono}</span> {c.nombre}
              <span className="ml-auto rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 px-2.5 py-0.5 text-[11px] font-bold not-italic text-zinc-500 dark:text-zinc-400">
                Dificultad: {c.dificultad}
              </span>
            </h3>
            <p className="mt-2 text-[15px] text-zinc-700 dark:text-zinc-300">{c.que}</p>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Ideas para ti</div>
                <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{c.ideas}</p>
              </div>
              <div className="rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Casos reales</div>
                <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-200">{c.reales}</p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">El proyecto perfecto no existe; el bueno, sí</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">🎯 Alcance negociado</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Todo proyecto arranca con una versión mínima que funciona (MVP) y crece por funciones. Vale más un MVP pulido que un sueño a medias.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">🧾 Documentación mínima</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Un README que explique qué hace, cómo se usa y qué aprendiste; y commits con historia. Es tu defensa anticipada.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">🔊 Defensa oral</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Demo en vivo + preguntas sobre tus decisiones. No sobre memorizar código: sobre por qué elegiste esto y qué harías después.</p>
        </div>
      </div>

      <div className="my-5 rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-5 text-[15px] text-amber-900 dark:text-amber-200">
        <b>Lo que NO puntúa</b> (aunque te lo creas): empezar instalando el framework de moda porque sí ·
        pedir «hazme una app como Uber» sin haber usado una app tuya · esconder que la IA hizo algo que
        no sabes explicar. Puntúa lo contrario: decidir de pequeño, probar de verdad y contar la historia.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Camino sugerido (orientativo)</h2>
      <ol className="mt-3 space-y-2 text-[15px] text-zinc-700 dark:text-zinc-300">
        <li><b>1 · Elegir</b> una categoría y escribir una frase: «mi proyecto hace X para Y».</li>
        <li><b>2 · Validar</b> con 3 personas reales («¿lo usarías? ¿pagarías?»). Si nadie dice sí, pivota.</li>
        <li><b>3 · Recortar</b> hasta el MVP: la mínima versión que ya demuestra el valor.</li>
        <li><b>4 · Construir</b> con agentes, con commits frecuentes en tu repo (todo el curso para esto).</li>
        <li><b>5 · Pulir</b> lo que se ve: nombres claros, mensajes de error humanos, README honesto.</li>
        <li><b>6 · Defender</b> con la demo, y plan de futuro: qué harías con 3 meses más.</li>
      </ol>
      <p className="mt-4 text-[15px] text-zinc-600 dark:text-zinc-400">
        ¿No sabes por dónde empezar? La sesión 3 del proyecto te da el porqué; el resto lo resolvemos en
        clase con tu idea delante. Y recuerda: el proyecto individual es <b>para ti</b> — si funciona, será
        lo primero que pongas en tu CV, tu LinkedIn, o tu web personal (que ya tendrás: mira este curso).
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 dark:border-white/10 pt-5">
        <Link href="/programacion-ia/" className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5">
          ← Volver al curso
        </Link>
        <Link href="/programacion-ia/proyecto-final-grupo/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:hover:bg-slate-600">
          Ver el proyecto en grupo →
        </Link>
      </div>
    </div>
  );
}
