import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PromptBlock from "@/components/PromptBlock";

export const metadata: Metadata = {
  title: "Sesión 2 · GitHub en carne viva — Curso de Programación con IA",
  description:
    "Sesión práctica: crea tu cuenta de GitHub, enlaza tu web local a un repositorio, practica commits, vuelve a una versión anterior y monta dos diseños en dos ramas. Todas las dudas, a los modelos del centro.",
};

const chip =
  "inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700";
const meta =
  "rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-[12px] font-semibold text-zinc-700";

function Concepto({ nombre, analogia, que }: { nombre: string; analogia: string; que: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h3 className="flex flex-wrap items-baseline gap-x-2 text-[15px] font-bold">
        {nombre}
        <span className="text-[13px] font-semibold italic text-blue-700">{analogia}</span>
      </h3>
      <p className="mt-1.5 text-sm text-zinc-700">{que}</p>
    </div>
  );
}

function Mision({
  n,
  titulo,
  objetivo,
  comprueba,
  extra,
}: {
  n: string;
  titulo: string;
  objetivo: string;
  comprueba: string;
  extra?: string;
}) {
  return (
    <section className="my-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h3 className="flex flex-wrap items-baseline gap-x-3 text-[17px] font-bold">
        <span className="text-zinc-400">{n}</span> {titulo}
      </h3>
      <p className="mt-2 text-[15px] text-zinc-700">{objetivo}</p>
      <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-sm text-emerald-900">
        <b>✔ Cómo compruebas que está logrado:</b> {comprueba}
      </div>
      {extra ? <p className="mt-2 text-sm text-zinc-500">{extra}</p> : null}
    </section>
  );
}

export default function CursoIASesion2() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Curso de Programación con IA", path: "/programacion-ia/" },
          { title: "Web personal de marca", path: "/programacion-ia/web-personal/" },
          { title: "Sesión 2", path: "/programacion-ia/sesion-02/" },
        ]}
      />
      <span className={chip}>1º DAM · Proyecto web personal · Sesión 2 (práctica)</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        GitHub en carne viva: tu web, versionada por ti
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        Hoy tu web deja de vivir solo en tu portátil. Cada uno sale de clase con su cuenta de GitHub,
        su repositorio enlazado a la web que empezaste el viernes, varios commits de verdad, una
        máquina del tiempo usada, y <b>dos diseños distintos en dos ramas</b>. Con una norma que no se
        rompe hoy: <b>todas las dudas se preguntan primero a los modelos del centro</b>.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={meta}>🤖 Pregúntalo a la IA del centro</span>
        <span className={meta}>⌨️ Tú escribes las instrucciones</span>
        <span className={meta}>🕰 Commits = máquina del tiempo</span>
        <span className={meta}>🌚🌕 Dos ramas, dos diseños</span>
      </div>

      <div className="my-5 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-[15px] text-blue-900">
        <b>Las reglas del juego de hoy</b> (así se trabaja de verdad con IA):
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>
            Esta página te dice <b>qué conseguir</b>, no <b>cómo</b>. Los comandos no vienen escritos
            aquí a propósito: los consigue cada uno preguntando a los modelos del centro.
          </li>
          <li>
            Preguntas al chat del centro, lees lo que te responde, <b>y lo tecleas tú</b> en tu
            terminal, entendiendo qué haces. Hoy no trabajamos de forma agéntica: la IA te guía, el
            que pulsa las teclas eres tú.
          </li>
          <li>
            Comprueba cada paso con el recuadro verde de la misión antes de seguir. Si no está el
            visto, no avances: pregunta de nuevo, más concreto.
          </li>
          <li>
            Si te atascas de verdad tras dos preguntas, levanta la mano y te ayudo. Pero{" "}
            <b>quien te crea la cuenta o el repo sin que lo hayas hecho tú no aprende la sesión</b>:
            el objetivo del curso es que sepas hacerlo, no que lo tengas hecho.
          </li>
        </ol>
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">
        Los cinco conceptos (esto sí te lo explico yo)
      </h2>
      <p className="mt-1 text-[15px] text-zinc-600">
        Lo importante de hoy no son los comandos —esos los pregunta cada uno a su IA—, es{" "}
        <b>entender qué está pasando</b>. Esto es lo que no puede hacer nadie por ti:
      </p>
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <Concepto
          nombre="Repositorio"
          analogia="«la carpeta con memoria»"
          que="Tu proyecto convertido en historia: una carpeta donde cada guardado queda registrado con autor, fecha y mensaje. Todo el trabajo del curso vivirá en repositorios."
        />
        <Concepto
          nombre="Commit"
          analogia="«un guardado con título»"
          que="Una foto de tu proyecto en un momento exacto, con un mensaje que dice qué cambió y por qué. Commits pequeños y frecuentes: uno por cosa, nunca «cosas varias»."
        />
        <Concepto
          nombre="Push / Pull"
          analogia="«sincronizar con la nube»"
          que="Tu portátil y GitHub son dos copias de la misma historia. Push sube lo tuyo; pull baja lo que te falta. Nada mágico: dos películas sincronizadas."
        />
        <Concepto
          nombre="Rama (branch)"
          analogia="«un universo paralelo»"
          que="Una copia de tu historia donde experimentas sin tocar la principal. Si la idea funciona, se fusiona (merge); si no, se borra y no ha pasado nada."
        />
        <Concepto
          nombre="Merge"
          analogia="«la decisión final»"
          que="Traer una rama terminada a la principal. Es lo que harás al final de hoy cuando decidas qué diseño gana — y lo que haréis por PR en el proyecto en grupo."
        />
      </div>
      <div className="my-5 rounded-2xl border border-zinc-200 bg-zinc-100 p-5 text-[15px] text-zinc-800">
        <b>Por qué esto importa fuera del aula:</b> cuando varias personas trabajan en el mismo
        repositorio —así funciona cualquier empresa de software—, nadie experimenta en la rama
        principal. Cada uno abre su rama, y lo bueno se fusiona. Hoy lo vas a practicar a escala
        individual: dos diseños tuyos conviviendo sin pisarse.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Las misiones de hoy</h2>

      <Mision
        n="1"
        titulo="Tu cuenta de GitHub"
        objetivo="Crea tu cuenta en github.com con un usuario profesional: es lo primero que verá cualquiera de ti después del currículum, así que ni motes ni números random. Completa el perfil: foto o avatar serio y una bio de una línea («Estudiante de 1º DAM, IES Simarro. Construyo X»)."
        comprueba="Entras en github.com y ves tu perfil con nombre, avatar y bio. Ese enlace (github.com/tuusuario) es ya parte de tu marca personal."
        extra="¿Problemas de registro o verificación? Es la única misión donde puede ayudarte una persona del centro si el correo del instituto te lo pone difícil: dímelo."
      />

      <Mision
        n="2"
        titulo="Tu primer repositorio, enlazado a tu web"
        objetivo="Crea un repositorio nuevo llamado mi-web, público. Después tienes que hacer algo más fino que «subir ficheros»: enlazar la carpeta que ya tienes en el portátil (tu web del viernes) para que ese repositorio local pertenezca a GitHub, y subirla. Ahí hay conceptos nuevos (git init, remote, push) — pregunta a la IA del centro cómo enlazar una carpeta local existente con un repo recién creado y hazlo con sus instrucciones tecleadas por ti."
        comprueba="Abres tu repo en el navegador y ves index.html, style.css y tu JS, no solo el README. Y en tu portátil, git status responde sin error: es un repo."
      />

      <Mision
        n="3"
        titulo="Commits honestos"
        objetivo="Haz hoy como mínimo tres commits con mensajes que expliquen el porqué («añadida sección de contacto», «hero: dos columnas y foto», «parche: menú móvil»). Pregunta a tu IA cómo preparar el commit (qué ficheros se añaden) y cómo escribir el mensaje. Nada de «actualizo», «cambios» o «asdfgh»."
        comprueba="Pestaña Commits de tu repo: tres entradas con mensajes que se entienden solos dentro de seis meses, cada una con su autor y su fecha."
      />

      <Mision
        n="4"
        titulo="La máquina del tiempo"
        objetivo="Ahora vas a romper algo a propósito: cambia un color o borra un bloque de la web, déjalo feo. Después vuelve a la versión anterior usando el historial —pregunta a tu IA dos formas de hacerlo (la interfaz web y la terminal)— y usa la que te atrevas. Si el mensaje del commit es honesto, sabes exactamente a qué punto volver."
        comprueba="Tu web vuelve a verse como antes del destrozo, y sabes explicar qué comando o botón usaste y qué hizo."
      />

      <Mision
        n="5"
        titulo="Dos ramas, dos diseños"
        objetivo="Crea dos ramas con dos diseños distintos de tu web: por ejemplo diseño-oscuro y diseño-minimal. En cada una cambia lo visual (colores, tipografía, disposición del hero) sin tocar la otra. Pregúntale a tu IA cómo crear una rama, cómo cambiarte de rama, y cómo guardar (commit) en la rama en la que estás. Cambiar de rama y refrescar la web es el momento «wow» de la sesión: la misma carpeta, dos webs distintas según el universo paralelo en el que te pongas."
        comprueba="git branch te lista al menos tres (main + tus dos diseños). Al cambiarte de rama, la web de tu navegador cambia de diseño sin que copies nada. Y en GitHub, el selector de ramas muestra las dos."
      />

      <Mision
        n="6"
        titulo="Elige tu diseño y fusiónalo a main"
        objetivo="Mira los dos diseños con calma, enséñaselos a quien tengas al lado… y decide cuál gana. Fusiona la rama elegida a main (la fusión puede hacerse desde la terminal o desde la propia interfaz de GitHub — pregunta a tu IA y usa la que quieras). La otra rama se puede borrar: fue un experimento, y eso es exactamente para lo que sirven las ramas."
        comprueba="main muestra tu diseño ganador, y el historial de commits de main cuenta la historia: trabajo → dos experimentos → decisión."
      />

      <Mision
        n="7"
        titulo="Bonus: el repo de otro (ensayo del proyecto en grupo)"
        objetivo="Si terminas: entra en el repo de un compañero, crea una rama ahí, mejora un detalle pequeño (un texto, un color), y abre una Pull Request a su main explicando qué propones. Es el ensayo general del proyecto final en grupo: allí todo cambio pasará por una PR revisada."
        comprueba="Tu compañero tiene una PR abierta con tu nombre, la revisa, la aprueba y la fusiona (o te pide un cambio, aún mejor)."
      />

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Cómo preguntar bien a la IA del centro</h2>
      <p className="mt-1 text-[15px] text-zinc-600">
        La calidad de lo que te responda depende de cómo lo preguntes. La fórmula:{" "}
        <b>contexto + objetivo + restricción</b>. Una plantilla para arrancar:
      </p>
      <PromptBlock
        text={`Estoy en 1º DAM usando Git por primera vez. Tengo una carpeta en mi portátil con index.html, style.css y script.js, y un repositorio vacío recién creado en GitHub llamado mi-web.
Explícame paso a paso, comando a comando, qué debo escribir en la terminal para enlazar mi carpeta local con ese repositorio de GitHub y subir la web. Para cada comando, dime en una línea qué hace y qué veré si ha salido bien.`}
      />
      <ul className="mt-3 space-y-1 text-[15px] text-zinc-700">
        <li>
          <b>Pide siempre el «qué hace cada comando»</b>: si no lo sabes explicar, no lo teclees.
        </li>
        <li>
          <b>Si te responde algo que no entiendes</b>, no insistas con la misma pregunta: díselo
          literalmente («no entiendo el paso 2, explícamo como si nunca hubiera usado la terminal»).
        </li>
        <li>
          <b>Si algo sale mal</b>, copia el mensaje de error exacto y pregúntale qué significa y qué
          hacer. Los errores de Git son mensajes legibles si preguntas: «conflict», «detached HEAD»,
          «non-fast-forward»… son los cinco conceptos hablando.
        </li>
      </ul>

      <div className="my-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-[15px] text-amber-900">
        <b>Trampas que os vais a encontrar hoy</b> (y que tenéis que saber leer):{" "}
        <span className="font-mono text-[13px]">working tree dirty</span> (tienes cambios sin
        commitear — Git no te deja cambiar de rama hasta que guardas o descartas),{" "}
        <span className="font-mono text-[13px]">conflicto de merge</span> (dos ramas tocaron lo
        mismo: Git pide un humano que decida),{" "}
        <span className="font-mono text-[13px]">3 commits behind/ahead</span> (tus dos copias de la
        historia se desincronizaron: pull o push). Detrás de cada uno hay uno de los cinco conceptos
        — si lo reconoces, ya sabes qué hacer.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Checklist de entrega (antes de salir)</h2>
      <div className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <div className="rounded-xl border border-zinc-200 bg-white p-3.5">
          ☐ Cuenta con perfil profesional · ☐ Repo <code>mi-web</code> con tu web dentro (no solo el
          README) · ☐ ≥ 3 commits con mensajes que explican el porqué
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-3.5">
          ☐ Has roto algo y has vuelto atrás con el historial · ☐ Dos ramas con dos diseños que
          cambian al moverte entre ellas · ☐ Tu diseño elegido fusionado en <code>main</code>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-3.5">
          ☐ Sabes explicar con tus palabras: repo, commit, push/pull, rama y merge — porque en la
          defensa del proyecto me basta con pedirte: «muéstrame tus commits y cuéntame la historia de
          tu web».
        </div>
      </div>

      <div className="my-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-[15px] text-emerald-900">
        <b>Regla de oro del curso desde hoy:</b> si funciona, se sube —<i>push</i> sagrado. Tu GitHub
        es la copia de seguridad de todo el curso: acabarlo significa tener literalmente tu historia
        en commits. Y cuando mañana usemos agentes de código, el agente podrá escribir el comando; la
        decisión de <i>cuándo</i> se guarda y <i>por qué</i> seguirá siendo tuya.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Para la próxima sesión</h2>
      <ul className="mt-2 space-y-1 text-[15px] text-zinc-700">
        <li>☐ Tu repo enlazado y con push: no necesitas traer nada más — tu trabajo ya vive en la nube</li>
        <li>☐ Curiosidad por el siguiente paso: la misma dinámica de hoy, pero con un agente escribiendo los comandos contigo (y tú decidiendo todos los commits)</li>
      </ul>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-5">
        <Link href="/programacion-ia/sesion-01/" className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← Sesión 1
        </Link>
        <Link href="/programacion-ia/web-personal/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
          Volver al proyecto →
        </Link>
      </div>
    </div>
  );
}
