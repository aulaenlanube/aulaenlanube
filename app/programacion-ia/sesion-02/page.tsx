import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PromptBlock from "@/components/PromptBlock";

export const metadata: Metadata = {
  title: "Sesión 2 · Tu proyecto en GitHub — Curso de Programación con IA",
  description:
    "Segunda fase del proyecto web personal: qué es Git y para qué sirve, repositorio, commit, push, rama y PR. Conceptos para trabajar con agentes y no perder nunca tu trabajo.",
};

const chip =
  "inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700";
const meta =
  "rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-[12px] font-semibold text-zinc-700";

function Concepto({
  nombre,
  analogia,
  que,
  cuando,
}: {
  nombre: string;
  analogia: string;
  que: string;
  cuando: string;
}) {
  return (
    <section className="my-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h3 className="flex flex-wrap items-baseline gap-x-3 text-[17px] font-bold">
        {nombre}
        <span className="text-sm font-semibold italic text-blue-700">{analogia}</span>
      </h3>
      <p className="mt-2 text-[15px] text-zinc-700">{que}</p>
      <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50 p-3.5 text-sm text-blue-900">
        <b>Cuándo lo vas a notar de verdad:</b> {cuando}
      </div>
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
      <span className={chip}>1º DAM · Proyecto web personal · Sesión 2 (fase)</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Tu proyecto en GitHub: Git sin comandos
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        Segunda fase del proyecto: mejoramos la web <b>y</b> la ponemos a salvo. Git es la herramienta
        que guarda la historia completa de tu proyecto; GitHub es donde esa historia vive en la nube.
        Con agentes de código trabajando contigo, esto deja de ser opcional: es tu máquina del tiempo
        y tu copia de seguridad del curso.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={meta}>🕰 Historia, no copias</span>
        <span className={meta}>☁️ GitHub = respaldo</span>
        <span className={meta}>🧠 Conceptos, no comandos</span>
        <span className={meta}>🤝 Base del proyecto final en grupo</span>
      </div>

      <div className="my-5 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-[15px] text-blue-900">
        <b>Idea que tienes que entenderte:</b> Git no guarda «la última versión»: guarda <b>cada versión</b>.
        Tu proyecto con Git es como un videojuego con guardado automático: si te equivocas con el jefe
        final, cargas la partida. Sin Git solo tienes la foto actual; con Git tienes la película entera.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Los cinco conceptos que sí o sí</h2>
      <p className="mt-1 text-[15px] text-zinc-600">
        No necesitas memorizar comandos: los agentes y las interfaces los escriben por ti. Lo que{" "}
        <b>nadie puede hacer por ti es entender qué está pasando</b>. Con estos cinco lo tienes todo:
      </p>

      <Concepto
        nombre="Repositorio"
        analogia="«la carpeta con memoria»"
        que="Tu proyecto convertido en historia: una carpeta donde cada guardado queda registrado con autor, fecha y mensaje. Todo trabajo del curso vivirá en repositorios —empezando por mi-web."
        cuando="cuando abras GitHub y veas tu web ahí, con todas sus versiones, desde cualquier ordenador del mundo."
      />
      <Concepto
        nombre="Commit"
        analogia="«un guardado con título»"
        que="Una foto de tu proyecto en un momento exacto, con un mensaje que dice qué cambió y por qué. Se hacen commits pequeños y frecuentes: uno por cosa, no «cosas varias»."
        cuando="cuando rompes algo y necesitas volver al guardado anterior sin perder horas, o cuando repasas tu historia y ves cómo ha crecido el proyecto."
      />
      <Concepto
        nombre="Push / Pull"
        analogia="«sincronizar con la nube»"
        que="Tu portátil y GitHub son dos copias de la historia. Push: subo mis commits nuevos. Pull: bajo los que no tengo (de GitHub o de otro compañero). Nada mágico, solo mantener las dos películas sincronizadas."
        cuando="cuando el agente te avise: «estás X commits por detrás» o «hay cambios remotos: haz pull antes de continuar». Eso no es un error: es Git hablando, y tú sabrás qué significa."
      />
      <Concepto
        nombre="Rama (branch)"
        analogia="«un universo paralelo»"
        que="Una copia de tu historia donde experimentas sin tocar la principal. Si la idea funciona, se fusiona (merge); si no, se borra y no ha pasado nada. Los profesionales nunca experimentan en la rama principal (main)."
        cuando="cuando quieras rehacer el diseño de tu web «por probar» sin arriesgar lo que ya funciona."
      />
      <Concepto
        nombre="Pull Request (PR)"
        analogia="«propuesta de cambio a revisión»"
        que="Cuando trabajas en equipo: tu rama terminada se propone al resto con un mensaje de lo que hace. Se revisa entre todos, se comenta, se aprueba y entonces entra en el proyecto común. Así funciona cualquier empresa de software."
        cuando="en el proyecto final en grupo: nadie subirá código directo a main; todo pasará por PR con revisión de tus compañeros."
      />

      <div className="my-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-[15px] text-amber-900">
        <b>Lo que vas a aprender a «leer» este curso</b> (mensajes típicos de tu agente o de GitHub):
        <span className="mt-2 block font-mono text-[13px] leading-7">
          «working tree limpio ✓» · «3 commits por detrás de origin/main, haz pull» · «conflicto de
          merge en style.css» · «ramas divergentes» · «PR aprobada, se puede fusionar»
        </span>
        Detrás de cada frase hay uno de los cinco conceptos. Si sabes qué significa, siempre sabes qué
        hacer; si no, estás conduciendo a ciegas.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Tu primera vez en GitHub</h2>
      <p className="mt-1 text-[15px] text-zinc-600">
        Lo haremos en clase, juntos y sin prisa. Cada uno saldrá con su cuenta, su primer repositorio y
        su web dentro. Guía de lo que haremos (no hace falta que la traigas estudiada):
      </p>
      <ol className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <li><b>1 · Cuenta.</b> github.com → Sign up (usuario serio: es tu nombre profesional; es lo primero que verá cualquier empresa de ti después del currículum).</li>
        <li><b>2 · Repositorio nuevo.</b> «New repository» → nombre <code>mi-web</code> → público → «Add a README». Ya tienes un repositorio vacío en la nube.</li>
        <li><b>3 · Subir tu web.</b> Con la interfaz web (Add file → Upload files) o con el agente, subes tu carpeta. En GitHub verás tus ficheros: tu primera copia en la nube.</li>
        <li><b>4 · Primer commit honesto.</b> En clase practicaremos escribir mensajes que expliquen el <i>porqué</i>: «año: web personal» vs «añadida sección de contacto con GitHub».</li>
        <li><b>5 · Historia.</b> Pestaña commits: tu película. Entra en uno y mira la «foto» exacta de ese momento.</li>
      </ol>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Git + IA: tu forma de trabajar</h2>
      <p className="mt-1 text-[15px] text-zinc-600">
        A partir de ahora, con agentes de código, el flujo profesional es este. Guárdalo: lo usarás
        todo el curso y en el proyecto en grupo:
      </p>
      <PromptBlock text={`Antes de que un agente toque mi proyecto:
1) Hacer commit de lo que ya funciona (aunque esté imperfecto).
2) Crear una rama nueva para el experimento (feat/...).
3) Dejar que el agente trabaje en la rama, con commits pequeños.
4) Si funciona: merge a main y push. Si no: borrar la rama, main intacta.`} />
      <div className="my-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-[15px] text-emerald-900">
        <b>Regla de oro del curso:</b> el agente puede escribir el comando; la decisión de{" "}
        <i>cuándo</i> se guarda y <i>por qué</i> es tuya. Un proyecto que solo entiende su autor es un
        pasivo, no un activo. En la defensa me basta con pedirte: «muéstrame tus commits y cuéntame la
        historia de tu web».
      </div>

      <details className="my-2 rounded-xl border border-zinc-200 bg-white p-4">
        <summary className="cursor-pointer text-[15px] font-bold text-zinc-800">¿Y «la máquina del tiempo» esa cómo se usa en un examen?</summary>
        <p className="mt-2 text-sm text-zinc-600">Cuando rompas algo y no sepas volver: en GitHub, pestaña Commits → busca el último estado bueno → abre sus ficheros → copia el contenido de vuelta. Sin tocar terminal: la interfaz web lo permite. En clase lo practicamos.</p>
      </details>
      <details className="my-2 rounded-xl border border-zinc-200 bg-white p-4">
        <summary className="cursor-pointer text-[15px] font-bold text-zinc-800">¿Git es solo para programar?</summary>
        <p className="mt-2 text-sm text-zinc-600">Sirve para cualquier cosa que cambie con el tiempo y quieras versionar: apuntes, este mismo proyecto, documentos. Programar es donde nació, pero tu TFG de DAM también podría vivir en un repo. Los datos curiosos vendrán en futuras sesiones.</p>
      </details>
      <details className="my-2 rounded-xl border border-zinc-200 bg-white p-4">
        <summary className="cursor-pointer text-[15px] font-bold text-zinc-800">¿Y si pierdo el portátil con todo en local?</summary>
        <p className="mt-2 text-sm text-zinc-600">Por eso push es sagrado. Regla del curso: si funciona, se sube. Tu GitHub es la copia de seguridad de todo lo que hagas este año: al final del curso tendrás tu historia literal en commits.</p>
      </details>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Para la próxima sesión: trae</h2>
      <ul className="mt-2 space-y-1 text-[15px] text-zinc-700">
        <li>☐ Cuenta de GitHub creada (hecha en casa: es lo único que necesitas tener listo)</li>
        <li>☐ Tu <code>mi-web</code> funcionando en local (lo que tengas: no hace falta perfecta)</li>
        <li>☐ Ganas de contar la historia de tu web con commits</li>
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
