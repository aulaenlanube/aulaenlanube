import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Proyecto final en grupo · Startup — Curso de Programación con IA",
  description:
    "El proyecto final en grupo de 1º DAM como una startup real: producto vendible, grupos compactos, publicación en un VPS, Stripe y un proyecto que no muere con el curso.",
};

const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";

export default function CursoIAFinalGrupo() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Curso de Programación con IA", path: "/programacion-ia/" },
          { title: "Proyecto final en grupo", path: "/programacion-ia/proyecto-final-grupo/" },
        ]}
      />
      <span className={chip}>1º DAM/DAW · Proyecto final · En grupo (4-5)</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Proyecto final en grupo: vuestra <em className="not-italic text-blue-700 dark:text-blue-300">startup</em>
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
        El proyecto más serio del curso: un producto real construido en un equipo compacto, con la
        ambición de <b>sobrevivir al curso</b>. Si el individual es tu portafolio, este es vuestra
        empresa en miniatura: con producto, usuarios, despliegue e incluso cobros.
      </p>

      <div className="my-5 rounded-2xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-5 text-[15px] text-emerald-900 dark:text-emerald-200">
        <b>El objetivo declarado:</b> terminar el curso con un producto <b>publicado en Internet</b>{" "}
        (VPS propio, dominio), con usuarios reales aunque sean 10, y con la infraestructura de pago
        montada (Stripe) aunque el primer mes no facture. Un proyecto que, si queréis, el septiembre que
        viene sigue vivo — y puede llegar a dar dinero de verdad. Mucha gente con millones lo empezó
        exactamente así, con menos medios que vosotros.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Primero los grupos: compactos o no hay startup</h2>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        Una startup es un equipo pequeño aguantando decisiones difíciles durante meses. Por eso los
        grupos se forman con criterio, no por simpatía de pasillo:
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">🧠 Perfiles distintos</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Quien diseña, quien organiza, quien prueba todo, quien habla con usuarios, quien no para de proponer. 4-5 cabezas <b>distintas</b> valen el doble que 5 iguales.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">🔥 Misma ambición</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Que haya hambre de producto vendible en todos. Mezclar ambiciosos con «solo quiero aprobar» rompe al equipo a la tercera semana. Los que queréis algo grande, os juntáis entre vosotros.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">🤝 Confianza</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Nos conoceremos antes de decidir: dinámicas en clase, proyectos pequeños previos. Elegid a quien cumple, no solo a quien cae bien — aunque la mejor combinación es quien cae bien Y cumple.</p>
        </div>
      </div>
      <p className="mt-3 text-[15px] text-zinc-600 dark:text-zinc-400">
        Y honestidad: <b>no todo el mundo tiene que querer lo mismo</b>. Quien busque aprobar con un
        producto correcto y acotado, lo hará con un proyecto a su medida y se le evaluará igual de justo.
        Los que quieran la luna, iréis más lejos. Los dos caben en el curso.
      </p>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Qué producto: ideas con potencial real</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-100 dark:bg-white/10 text-left">
              <th className="px-3.5 py-2.5 font-bold">Candidato</th>
              <th className="px-3.5 py-2.5 font-bold">Por qué puede funcionar</th>
              <th className="px-3.5 py-2.5 font-bold">El pago (Stripe) encaja porque…</th>
            </tr>
          </thead>
          <tbody className="[&_tr]:border-t [&_tr]:border-zinc-200 [&_td]:px-3.5 [&_td]:py-2.5 [&_td]:align-top [&_td]:text-zinc-600">
            <tr>
              <td className="font-bold text-zinc-800 dark:text-zinc-200">Reservas locales (pádel, aula de estudio, peluquería del pueblo)</td>
              <td>Negocios reales de tu entorno que hoy se gestionan por WhatsApp. Un calendario + recordatorios ya es una revolución para ellos.</td>
              <td>Se cobra por reserva o suscripción mensual: cobro recurrente natural.</td>
            </tr>
            <tr>
              <td className="font-bold text-zinc-800 dark:text-zinc-200">Marketplace de segunda mano hiperlocal (material escolar, componentes)</td>
              <td>Wallapop es generalista; un sitio de confianza de tu comarca tiene sentido. Comunidad pequeña = coste de adquisición cero.</td>
              <td>Destacados de pago, comisión por transacción.</td>
            </tr>
            <tr>
              <td className="font-bold text-zinc-800 dark:text-zinc-200">SaaS para profes (pase de lista, generador de exámenes, control de proyectos)</td>
              <td>Lo necesitáis vosotros: conocéis al usuario desde dentro. Los primeros 10 usuarios del instituto están asegurados.</td>
              <td>Suscripción por docente/centro: el modelo SaaS de toda la vida.</td>
            </tr>
            <tr>
              <td className="font-bold text-zinc-800 dark:text-zinc-200">Comunidad deportiva (rutas, récords, quedadas — tipo Strava local)</td>
              <td>Vuestro instituto ya tiene gente subiendo a La Creueta a diario: hay cultura y hay dato.</td>
              <td>Plan premium con estadísticas y clubs.</td>
            </tr>
            <tr>
              <td className="font-bold text-zinc-800 dark:text-zinc-200">Micro-SaaS con IA (generador de algo útil para un nicho concreto)</td>
              <td>Casos reales: PhotAI, Jenni AI empezaron de una necesidad muy concreta. El nicho pequeño mal servido es el hueco del estudiante.</td>
              <td>Créditos de pago por generación: alineado con el coste real.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">El plan de empresa en clase (así se trabaja, no «haced un proyecto»)</h2>
      <div className="mt-4 space-y-3">
        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">1 · Roles (como en una startup, no como en un trabajo de clase)</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            <b>Lead técnico</b> (arquitectura y fusiones), <b>producto</b> (decide qué se hace y en qué orden, habla con usuarios),
            <b>calidad</b> (pruebas, que nada se publique roto), <b>datos/IA</b> (prompts, APIs, integración), y quien quiera,{" "}
            <b>diseño/contenido</b> (que se vea profesional). Todos codeáis; los roles deciden quién tira de qué.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">2 · Sprints de una o dos semanas</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Cada sprint acaba con algo funcionando y demostrado. Git con PRs obligatorias: nada entra a{" "}
            <code>main</code> sin que otro compañero lo revise. Así trabaja cualquier equipo del mundo; vosotros lo
            haréis de verdad, no de simulacro.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">3 · Publicar de verdad (VPS + Stripe)</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            El producto final vive en un <b>servidor propio</b> con su base de datos y su HTTPS, no en un localhost
            de examen. Y el botón de pago de <b>Stripe</b> (modo test primero) estará montado y funcionando: cobrar
            en modo test es gratis, sencillo y te enseña más del mundo real que mil diapositivas.
          </p>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">La regla que lo cambia todo: que sobreviva al curso</h2>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        Este proyecto os va a consumir muchas horas. O se convierte en algo que os importa, o será trabajo
        esclavo. Por eso el criterio de éxito no es solo la nota: es poder decir en junio <i>«esto existe,
        hay gente que lo usa, y en septiembre seguimos»</i>. Si además empieza a entrar dinero —aunque sean
        20 euros—, habréis hecho algo que el 99% de la gente de vuestra edad no ha hecho nunca: lanzar un
        producto. Y tendréis algo que ningún CV puede fingir.
      </p>

      <div className="my-5 rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-5 text-[15px] text-blue-900 dark:text-blue-200">
        <b>Criterio de evaluación (resumen):</b> producto publicado y usable + proceso (sprints, PRs,
        commits con historia) + defensa del equipo (cada uno explica su parte y las decisiones comunes) +
        honestidad sobre lo que hizo la IA y lo que decidisteis vosotros. La nota es individual dentro del
        grupo: los equipos se valoran, las personas se evalúan.
      </div>

      <p className="text-[15px] text-zinc-600 dark:text-zinc-400">
        No hace falta que decidáis la idea hoy. Sí hace falta que empecéis a observar: ¿qué trámite os
        hartáis de hacer a mano? ¿de qué se queja el pequeño negocio de vuestra calle? ¿qué usaríais
        vosotros mismos cada semana? Ahí fuera hay un producto con vuestro nombre: la semana que viene
        aprendemos a buscarlo.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 dark:border-white/10 pt-5">
        <Link href="/programacion-ia/proyecto-final-individual/" className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5">
          ← Proyecto individual
        </Link>
        <Link href="/programacion-ia/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:hover:bg-slate-600">
          Volver al curso →
        </Link>
      </div>
    </div>
  );
}
