import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PromptBlock from "@/components/PromptBlock";

export const metadata: Metadata = {
  title: "Sesión 2 · Presupuesto, arquitectura por tipo de producto y primer sprint — Curso de Programación con IA",
  description:
    "Segunda sesión del proyecto en grupo (1º DAM presencial, 20 de octubre de 2026, 3 horas): cada equipo administra la caja con el dinero que recibió ayer, define la arquitectura según el tipo de producto (juego, SaaS de servicio, control por voz) y cierra el primer sprint con tareas repartidas.",
};

const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";
const meta =
  "rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 px-3 py-1 text-[12px] font-semibold text-zinc-700 dark:text-zinc-300";
const card = "rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm";

function Paso({ n, t, min, children }: { n: string; t: string; min: string; children: React.ReactNode }) {
  return (
    <section className={`my-4 ${card}`}>
      <h3 className="flex flex-wrap items-center gap-3 text-[17px] font-bold">
        <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-slate-700 text-sm font-extrabold text-white">
          {n}
        </span>
        {t}
        <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-bold text-zinc-600 dark:bg-white/10 dark:text-zinc-300">{min}</span>
      </h3>
      <div className="mt-2 space-y-2 text-[15px] text-zinc-700 dark:text-zinc-300">{children}</div>
    </section>
  );
}

const AGENDA: [string, string, string][] = [
  ["0:00", "Recap de ayer y norma de la caja", "El dinero que recibisteis no es un premio: es un presupuesto con consecuencias"],
  ["0:10", "La caja del equipo", "Repartir el dinero por categorías y justificarlo en docs/presupuesto.md"],
  ["0:40", "Taller por tipo de producto", "Juego · SaaS de servicio · control por voz: qué decidir antes de tocar código"],
  ["1:25", "Descanso", "10 min"],
  ["1:35", "Sprint 1: del MVP a las tareas", "3 tareas verticales, branches, vuestro agente y vuestras reglas"],
  ["2:25", "Mini-demo entre equipos", "3 min por equipo: qué habéis montado hoy"],
  ["2:50", "Cierre y deberes", "Qué hay que traer el lunes 26"],
];

const PRESUPUESTO = `# Presupuesto del equipo — [nombre del proyecto]
**Fecha:** 20/10/2026 · **Inversión recibida ayer:** ___ € ficticios

| Categoría | € asignados | Para qué exactamente | Quién lo decide |
|---|---|---|---|
| Tiempo de desarrollo (vuestras horas, a 30 €/h ficticios) | | | |
| Herramientas e IA (APIs, licencias, lo que consuma el agente) | | | |
| Infraestructura (dominio, servidor, base de datos) | | | |
| Assets y contenido (música, gráficos, textos, fotos) | | | |
| Validación (entrevistas, pruebas con usuarios, pequeños anuncios) | | | |
| Colchón para imprevistos | | | |

**Regla:** nada puede llevarse más del 40 % sin una justificación escrita de dos líneas.
**La decisión más cara de hoy** y por qué: ________________`;

export default function StartupSesion2() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Curso de Programación con IA", path: "/programacion-ia/" },
          { title: "Proyecto final en grupo", path: "/programacion-ia/proyecto-final-grupo/" },
          { title: "Sesión 2", path: "/programacion-ia/proyecto-final-grupo/sesion-02/" },
        ]}
      />
      <span className={chip}>1º DAM presencial · Startup en grupo · Sesión 2 · martes 20 oct 2026</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Vuestra primera nómina es un presupuesto: decidid en qué se gasta el dinero que os inversores de ayer
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Ayer formasteis equipos, presentasteis y recibisteis inversión ficticia. Hoy esa inversión se convierte
        en algo muy concreto: <b>cada equipo administra su caja</b>, decide su <b>arquitectura según el tipo de
        producto</b> que ha elegido (no es lo mismo un juego que un SaaS de facturación que una app con control
        por voz) y termina la clase con el <b>sprint 1 en marcha</b>: tareas repartidas y la primera pieza
        funcionando con vuestro agente. Tres horas, todas por equipos.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={meta}>👥 Por equipos (4-5)</span>
        <span className={meta}>⏱ 3 horas</span>
        <span className={meta}>💶 La caja: el dinero de ayer, gastado hoy</span>
        <span className={meta}>🎮 🧾 🎙 Taller por tipo de producto</span>
        <span className={meta}>🌱 Sprint 1 Started</span>
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">La sesión de hoy</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/10">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <tbody>
            {AGENDA.map(([h, t, d]) => (
              <tr key={h} className="border-t border-zinc-100 first:border-t-0 align-top dark:border-white/5">
                <td className="w-16 px-3 py-2.5 font-mono font-bold text-blue-700 dark:text-blue-300">{h}</td>
                <td className="px-3 py-2.5 font-bold text-zinc-800 dark:text-zinc-200">{t}</td>
                <td className="px-3 py-2.5 text-zinc-600 dark:text-zinc-400">{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ───────────── BLOQUE 1: LA CAJA ───────────── */}
      <h2 className="mt-10 text-xl font-extrabold tracking-tight">1 · La caja del equipo (30 min)</h2>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        Ayer cada persona repartió 100 € ficticios entre otros equipos. Sumad lo que habéis recibido: <b>esa es
        vuestra caja para todo el curso</b>. Un equipo muy votado tendrá más caja; un equipo con dudas, menos.
        Como en la vida real: el dinero no cambia la calidad de la idea, pero obliga a decidir en qué se gasta.
      </p>
      <div className="my-5 rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-5 text-[15px] text-amber-900 dark:text-amber-200">
        <b>Lo que representa el dinero ficticio:</b> cada categoría se cambia por una decisión real de
        arquitectura o de alcance. Si asignáis poco a «tiempo de desarrollo», estáis diciendo que el alcance es
        pequeño (bien: más vale poco y terminado). Si asignáis mucho a «herramientas e IA», estáis prometiendo
        Features que costarán euros reales en APIs (voz, generación, mapas). Y el colchón no es opcional: el
        80 % de los proyectos de verdad se descubre en febrero que necesitaba algo que no previó en octubre.
      </div>
      <Paso n="1" t="Sumad y repartid" min="12 min">
        <p>
          Con los votos de ayer sobre la mesa, rellenad esta hoja de presupuesto. Las cifras exactas importan
          menos que <b>la conversación</b>: cuando dos personas quieren gastar lo mismo en cosas distintas, ese
          es el conflicto que un equipo fundador tiene que saber resolver.
        </p>
        <PromptBlock text={PRESUPUESTO} />
      </Paso>
      <Paso n="2" t="La decisión más cara" min="8 min">
        <p>
          Marcad la <b>decisión más cara</b> que habéis tomado hoy y escribid dos líneas de por qué vale lo que
          cuesta. Se va a <code>docs/presupuesto.md</code> del repo (o a vuestro documento compartido, si el
          repo aún no está creado — para el lunes lo tenéis).
        </p>
      </Paso>
      <Paso n="3" t="La IA os audita las cuentas" min="10 min">
        <p>
          Pasad el presupuesto por el chat del centro antes de darlo por bueno. Os dirá lo que un CFO aburrido
          pero útil os diría:
        </p>
        <PromptBlock text={`Audita este presupuesto de una startup de estudiantes (producto: [una frase], cliente: [quién]).
[pega la tabla]
1. ¿Qué categoría está infravalorada para este tipo de producto y cuál sobra?
2. ¿Qué gasto obligatorio se ha olvidado? (piensa en dominio, HTTPS, copias de seguridad, tiempo de pruebas)
3. Con esta caja, ¿qué Feature del MVP deberíamos recortar primero? Sé concreto.`} />
      </Paso>

      {/* ───────────── BLOQUE 2: TALLER POR TIPO ───────────── */}
      <h2 className="mt-10 text-xl font-extrabold tracking-tight">2 · Taller: la arquitectura depende del tipo de producto (45 min)</h2>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        «Usad la IA y ya está» no es una arquitectura. Lo que habéis elegido —un juego, un servicio de
        facturación tipo electricistas, una app que se maneja por voz— <b>obliga a decidir cosas distintas y en
        orden distinto</b>. Cada equipo va a la sección que le toque, rellena las 5 decisiones y las escribe en
        <code> docs/decisiones.md</code> con fecha. Las otras secciones también se leen, en voz alta si hace
        falta: el lunes habrá preguntas cruzadas.
      </p>

      <div className={`mt-4 ${card}`}>
        <h3 className="text-[15px] font-bold">🎮 Si hacéis un juego</h3>
        <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          <li>• <b>Loop de diversión primero:</b> escribid en una frase qué hace el jugador cada 20-30 segundos y por qué sonríe (o se pica). Si eso no se sostiene, no hay juego, haya los gráficos que haya.</li>
          <li>• <b>Género con precedente:</b> decidid «como [juego conocido] pero [vuestro giro]». Copiar el loop de un juego probado no es trampear: es no reinventar la rueda.</li>
          <li>• <b>Scope de una sentada:</b> 3-5 niveles o partidas de 2-5 minutos, sin multijugador (el multijugador es otro producto entero), sin cuentas al principio. Un juego corto y terminado vale más que una épica inacabada.</li>
          <li>• <b>Tecnología:</b> canvas o DOM con un game loop simple basta. Pedid a la IA el esqueleto <i>update → draw → input</i> y tocadlo vosotros; un motor completo (Godot, Unity) solo si alguien del equipo ya lo maneja.</li>
          <li>• <b>Caja:</b> aquí tiene sentido la categoría «assets»: música y arte con licencia libre (opengameart, Kenney, Pixabay) o generados — siempre comprobando la licencia.</li>
          <li>• <b>Y el dinero, ¿cómo entra?</b> Un juego gratuito de un instituto no monetiza casi nada (la publicidad no paga el servidor). Vale como producto si lo declaráis: cartera publicable, concurso, o una versión premium (capítulos extra) en una tienda tipo itch.io. Decidlo y anotadlo.</li>
        </ul>
      </div>

      <div className={`mt-4 ${card}`}>
        <h3 className="text-[15px] font-bold">🧾 Si hacéis un SaaS de servicio (facturación para electricistas, reservas, gestión…)</h3>
        <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          <li>• <b>El modelo de datos es el producto:</b> antes de pantallas, escribid las entidades y cómo se relacionan (cliente → presupuesto → factura → líneas → estado). En un gestor, el 70 % del trabajo de campo es ese modelo; la IA lo dibuja en un minuto pero lo tenéis que validar vosotros con un caso real.</li>
          <li>• <b>Datos de prueba ANÓNIMOS:</b> nunca nombres, teléfonos ni NIF reales de clientes de nadie en un repositorio de clase. Fingid clientes con nombres inventados.</li>
          <li>• <b>El PDF es la entrega, no un detalle:</b> lo que el profesional «saca» por la puerta es un presupuesto/factura en PDF bien impreso. Presupuesto y factura son el mismo documento con un campo más: haced primero ese PDF y que salga bien.</li>
          <li>• <b>Lo que NO tocáis en el MVP:</b> contabilidad, IVA complicado, rectificaciones legales completas, multiusuario fino. Una secuencia simple con número de factura correlativo y un PDF correcto es honesto y suficiente para que un electricista lo use una tarde.</li>
          <li>• <b>Datos de verdad:</b> hablad con UN electricista de verdad esta semana (el padre de alguien, el del pueblo) y preguntadle cómo factura hoy: qué papeles, qué app odia, cuánto tarda. La respuesta define vuestro MVP más que cualquier prompt.</li>
          <li>• <b>Caja:</b> la parte gorda va a «tiempo de desarrollo» y «infraestructura» (base de datos de verdad). Aquí el dinero de ayer se nota: un SaaS sin base de datos persistente no es un SaaS.</li>
        </ul>
      </div>

      <div className={`mt-4 ${card}`}>
        <h3 className="text-[15px] font-bold">🎙 Si vuestro producto se maneja por voz («dame ordenes y que se genere solo»)</h3>
        <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          <li>• <b>La voz no es la magia; la intención sí.</b> «Haz una factura a Pepe de dos horas a 30 euros» tiene que convertirse en un formulario <i>rellenado y mostrado para confirmar</i>. Voz → texto → <b>estructura</b> → confirmación humana → acción. Nunca ejecución directa sin pantalla de confirmación: un «sí» mal oído no puede facturar 500 €.</li>
          <li>• <b>Primero el formulario, después la voz:</b> si el producto no funciona tecleando, la voz solo tapará el agujero. El MVP de verdad es la ruta sin manos: un campo de voz, transcripción y relleno automático.</li>
          <li>• <b>Quién transcribe y a qué coste:</b> la API de voz del propio navegador (Web Speech API) es gratis y vale para empezar en Chrome; Whisper de OpenAI (o similar) es mejor y cuesta céntimos por minuto — ese gasto va a la categoría «herramientas e IA» del presupuesto, con números. Medidlo: cuantos minutos/mes creéis que usará vuestro electricista y cuánto costará.</li>
          <li>• <b>Ruido, acentos y valenciano:</b> probadlo en el aula, no en casa en silencio. Enunciad 10 frases de dominio real con ruido de fondo y anotad cuántas se entienden. Esto es testing de verdad y sale en docs/entrevistas.</li>
          <li>• <b>Privacidad:</b> la voz de un cliente es dato personal. En clase, voces de prueba; en producción, aviso claro y mínima retención.</li>
        </ul>
      </div>

      <div className="my-5 rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-5 text-[15px] text-blue-900 dark:text-blue-200">
        <b>Prompt común a los tres tipos</b> (rellenad el vuestro y mandadlo al chat del centro, en equipo):
        <PromptBlock text={`Somos un equipo de 1º DAM. Producto: [qué es] para [quién]. Presupuesto: [pega la tabla resumida].
Nuestra sección del taller de hoy: [juego / SaaS de servicio / voz].
1. Con nuestras 5 decisiones escritas [pega docs/decisiones.md], ¿qué decisión nos va a explotar en la cara y por qué?
2. Proponed la arquitectura más aburrida que funcione (stack concreto y por qué), sin microservicios ni inventos.
3. Dividid nuestro MVP en exactamente 3 tareas verticales que quepan en un sprint de una semana para 5 personas
   dirigiendo agentes. Cada tarea: nombre, «dado X cuando Y entonces Z», quién la coge y qué criterio de aceptación.
4. Qué NO debemos construir todavía aunque nos tiemble el pulso.`} />
      </div>

      {/* ───────────── BLOQUE 3: SPRINT 1 ───────────── */}
      <h2 className="mt-10 text-xl font-extrabold tracking-tight">3 · Sprint 1: que el proyecto exista de verdad (50 min)</h2>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        Con las tareas ya definidas (o con las que os acabe de proponer la IA), cada equipo arranca el sprint 1
        <b>hoy, aquí</b>. El objetivo no es acabar nada: es que el repo exista, que haya commits de varias
        personas y que el primer Vertical Slice de uno de vosotros funcione en local. Reglas del sprint:
      </p>
      <Paso n="1" t="Repo y organización" min="10 min">
        <p>
          Si aún no lo tenéis: organización de GitHub del equipo, repo con todos como miembros y el profe
          (<code>aulaenlanube</code>) como colaborador. README = la ficha de ayer. Primer commit: vosotros.
        </p>
      </Paso>
      <Paso n="2" t="Tareas asignadas con dueño" min="8 min">
        <p>
          Las 3 tareas del bloque anterior, cada una con <b>dueño y revisor</b> (el revisor es otra persona del
          equipo: nadie se aprueba su propio trabajo). Se anotan en el kanban del repo (GitHub Issues) con la
          etiqueta <code>sprint-1</code>.
        </p>
      </Paso>
      <Paso n="3" t="Cada uno, con su agente" min="27 min">
        <p>
          Vuestra tarea en dos partes: primero <b>dirigís al agente</b> (le pasáis criterio de aceptación, él
          propone, vosotros discutís y corregís); después <b>lo comprobáis sin él</b>: probáis la función a mano
          y escribís una línea de qué ha fallado. Cada uno hace su <b>branch</b> y su PR; se revisan en parejas
          antes de fusionar. Commits pequeños con mensaje que se entienda: mañana esto lo lee otro.
        </p>
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-white/10 dark:bg-white/5 text-zinc-700 dark:text-zinc-300">
          <b>Idea de prompt de arranque</b> (adaptadlo a vuestro stack): <i>«Quiero montar solo el esqueleto de
          [tarea]: estructura de carpetas, modelo de datos y la ruta principal vacía con sus tests. No generes
          la lógica todavía; quiero entender primero cada fichero que creas.»</i> Empezar pequeño no es perder
          tiempo: es la diferencia entre revisar un archivo y revisar 40.
        </div>
      </Paso>

      {/* ───────────── BLOQUE 4: DEMOS Y CIERRE ───────────── */}
      <h2 className="mt-10 text-xl font-extrabold tracking-tight">4 · Mini-demo y cierre (35 min)</h2>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        Tres minutos por equipo, sin diapositivas: <b>1</b> cómo habéis repartido la caja y la decisión más cara,
        <b>2</b> qué arquitectura habéis elegido y por qué (según vuestro tipo de producto), <b>3</b> qué
        funciona ya en local, aunque sea feo. El resto de la clase hace una sola pregunta por equipo: la que
        más dudas le haya generado.
      </p>
      <div className="my-5 rounded-2xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-5 text-[15px] text-emerald-900 dark:text-emerald-200">
        <b>Qué se evalúa hoy:</b> sigue siendo proceso, no producto. Cuenta para la nota de proyecto: que la
        caja esté repartida y justificada, las 5 decisiones de arquitectura por escrito, commits de varias
        personas con branches y PRs revisadas, y que cada miembro sepa explicar hoy lo que decidió su equipo.
        Quien no haya tocado el teclado hoy, mañana no tiene demo que contar.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Para el lunes 26 de octubre</h2>
      <div className="mt-3 rounded-2xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 p-5 text-[15px] text-red-900 dark:text-red-200">
        <ol className="space-y-2 text-sm">
          <li><b>1 · Repo completo:</b> ficha v1 como <code>README.md</code>, <code>docs/presupuesto.md</code> y <code>docs/decisiones.md</code> con lo de hoy, y el kanban con el sprint-1 asignado.</li>
          <li><b>2 · Sprint 1 terminado en local:</b> al menos una de las 3 tareas fusionada en main y funcionando.</li>
          <li><b>3 · Las 5 entrevistas</b> de la semana pasada (si aún no las tenéis): esta semana ya no vale «no hemos tenido tiempo» — la caja se justifica con evidencia, no con opiniones.</li>
        </ol>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 dark:border-white/10 pt-5">
        <Link href="/programacion-ia/proyecto-final-grupo/sesion-01/" className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-zinc-200 transition hover:bg-zinc-50 dark:hover:bg-white/5">
          ← Sesión 1 · Día 0
        </Link>
        <Link href="/programacion-ia/aula/#/equipos" className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500">
          🧩 Mi equipo en el aula →
        </Link>
        <Link href="/programacion-ia/proyecto-final-grupo/" className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-zinc-200 transition hover:bg-zinc-50 dark:hover:bg-white/5">
          El proyecto en grupo →
        </Link>
      </div>
    </div>
  );
}
