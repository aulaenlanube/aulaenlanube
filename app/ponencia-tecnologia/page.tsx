import type { Metadata } from "next";
import Link from "@/components/Link";
import PrintButton from "@/components/PrintButton";
import { RelojSesion } from "./_svg/proceso";
import { BLOQUES, RECURSOS } from "./_datos";
import { Chip, Dentro, ESTILO, Fuera, H2, Lista, Migas, Nota, P } from "./_ui/piezas";

export const metadata: Metadata = {
  title: "Del prompt a la plaza · IA para la oposición de Tecnología y para el aula — Aula en la Nube",
  description:
    "Guía completa de la sesión de dos horas para opositores de Tecnología de Secundaria (Comunitat Valenciana): cómo se escribe un prompt que rinde, el metaprompt, qué te da Copilot gratis con la cuenta del centro, los 71 temas con IA, láminas y materiales de aula, y dos aplicaciones educativas creadas con un agente —con el prompt exacto que las generó—.",
};

export default function PonenciaPortada() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <Migas />

      {/* ── Entrada ────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2">
        <Chip>Ponencia · 2 horas</Chip>
        <Chip tono="verde">Tecnología · Secundaria</Chip>
        <Chip tono="gris">Comunitat Valenciana</Chip>
      </div>

      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
        Del prompt a la plaza
      </h1>
      <p className="mt-2 text-xl font-semibold tracking-tight text-zinc-500">
        IA para tu oposición de Tecnología — y para las clases que darás cuando la tengas
      </p>

      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-600">
        Dos horas para salir con cuatro cosas funcionando: un <b>método para escribir prompts</b> que
        aguantan un tribunal, el <b>Copilot que ya tienes pagado</b> con la cuenta del centro, una
        <b> forma de atacar los 71 temas</b> sin perder criterio, y la capacidad de{" "}
        <b>encargarle a un agente una aplicación de aula</b> y defenderla después. Esta página es el
        apunte completo: todo lo que se ve en la sesión está aquí, con sus prompts, para volver
        antes de cada examen.
      </p>

      {/* ── Lo que te llevas, en cifras ────────────────────────────────── */}
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { n: "6", t: "bloques en 2 horas", tono: "azul" as const },
          { n: "15", t: "prompts copiables, con su explicación", tono: "morado" as const },
          { n: "2", t: "apps de aula que puedes probar aquí mismo", tono: "ambar" as const },
          { n: "0 €", t: "de coste: todo con lo que ya tienes", tono: "verde" as const },
        ].map((d) => (
          <div key={d.t} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className={`text-3xl font-extrabold tracking-tight ${ESTILO[d.tono].texto}`}>{d.n}</p>
            <p className="mt-1 text-[13px] leading-snug text-zinc-500">{d.t}</p>
          </div>
        ))}
      </div>

      {/* ── El reloj ───────────────────────────────────────────────────── */}
      <H2 ante="El itinerario" tono="azul">
        Dos horas, seis bloques, sin relleno
      </H2>
      <P>
        Cada bloque ocupa en la barra exactamente lo que dura. Los cuatro primeros se ven con el
        proyector; el quinto es laboratorio con el portátil abierto; el sexto es la estrategia que te
        llevas escrita. Pulsa cualquier tramo para ver qué pasa dentro.
      </P>
      <RelojSesion />

      {/* ── Los bloques ────────────────────────────────────────────────── */}
      <H2 ante="Los apuntes" tono="verde">
        El apunte de cada bloque
      </H2>
      <P>
        Uno por bloque, con el contenido completo, los prompts listos para copiar y lo que conviene
        practicar después. Si te pierdes algo en directo, aquí lo tienes entero.
      </P>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {BLOQUES.map((b) => {
          const e = ESTILO[b.tono];
          return (
            <Link
              key={b.ruta}
              href={b.ruta}
              className={`group flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition ${e.tarjeta}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg text-base font-extrabold ${e.numero}`}
                >
                  {b.n}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  {b.min} min
                </span>
              </div>
              <h3 className="mt-3 text-[17px] font-extrabold tracking-tight text-zinc-900">
                {b.titulo}
              </h3>
              <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-zinc-600">{b.resumen}</p>
              <p className={`mt-3 text-[13px] font-bold ${e.texto}`}>
                Abrir el apunte{" "}
                <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </p>
            </Link>
          );
        })}
      </div>

      {/* ── Las dos apps ───────────────────────────────────────────────── */}
      <H2 ante="La prueba" tono="ambar">
        Las dos aplicaciones, funcionando aquí mismo
      </H2>
      <P>
        No son capturas ni un vídeo: son dos aplicaciones de aula reales, cada una nacida de{" "}
        <b>un solo prompt</b>, que puedes abrir y usar ahora. Debajo de cada una está el encargo
        exacto que la generó, palabra por palabra, para que veas de dónde sale cada decisión.
      </P>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {[
          {
            ruta: "/ponencia-tecnologia/app-logica-digital/",
            curso: "4.º de ESO",
            titulo: "Laboratorio de lógica digital",
            d: "Puertas lógicas, tablas de verdad y seis retos con enunciado real. El clásico del bloque de electrónica digital, montado para proyectar.",
            tono: "azul" as const,
          },
          {
            ruta: "/ponencia-tecnologia/app-ensayo-traccion/",
            curso: "1.º de Bachillerato",
            titulo: "Banco de ensayo de tracción",
            d: "Tiras de una probeta y la curva tensión–deformación se dibuja sola. Con cinco materiales reales y el momento clave: soltar la fuerza y ver qué queda.",
            tono: "ambar" as const,
          },
        ].map((a) => {
          const e = ESTILO[a.tono];
          return (
            <Link
              key={a.ruta}
              href={a.ruta}
              className={`group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition ${e.tarjeta}`}
            >
              <Chip tono={a.tono}>{a.curso}</Chip>
              <h3 className="mt-3 text-[17px] font-extrabold tracking-tight text-zinc-900">
                {a.titulo}
              </h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-zinc-600">{a.d}</p>
              <p className={`mt-3 text-[13px] font-bold ${e.texto}`}>
                Probarla y ver su prompt{" "}
                <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </p>
            </Link>
          );
        })}
      </div>

      {/* ── Qué te llevas ──────────────────────────────────────────────── */}
      <H2 ante="El resultado" tono="morado">
        Qué te llevas puesto al salir
      </H2>
      <Lista
        tono="morado"
        items={[
          <>
            <b>Una plantilla de prompt</b> de seis bloques que sirve igual para un tema, para una
            programación de aula o para encargar una aplicación.
          </>,
          <>
            <b>El metaprompt:</b> la costumbre de pedirle a la IA que te escriba el encargo antes de
            pedirle el resultado. Es lo que más sube la calidad de todo lo demás.
          </>,
          <>
            <b>Tu Copilot configurado</b> y, sobre todo, saber cuál de los seis abrir para cada cosa
            — y qué no meter nunca en el chat.
          </>,
          <>
            <b>Una aplicación tuya</b>, hecha con un agente, publicada en internet y con un enlace
            que el tribunal puede abrir sin instalar nada.
          </>,
          <>
            <b>La respuesta a «¿y si aquí cambiamos esto?»</b>, que es la pregunta que decide la
            defensa de la parte práctica.
          </>,
        ]}
      />

      <Nota tono="ambar" titulo="La regla que atraviesa toda la sesión">
        La IA trabaja para que <b>tú</b> entiendas, no para que escriba en tu lugar. Un tribunal no
        detecta si usaste IA: detecta si puedes defender lo que traes. Todo lo que hay en esta página
        está pensado para que la respuesta sea siempre que sí.
      </Nota>

      {/* ── Material ───────────────────────────────────────────────────── */}
      <H2 ante="Para seguir" tono="gris">
        El material de referencia
      </H2>
      <P>Todo gratuito y de la casa: úsalo antes de la sesión y entre examen y examen.</P>
      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        {RECURSOS.map((r) => {
          const interno = r.u.startsWith("/");
          const cuerpo = (
            <>
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-bold text-blue-700 group-hover:underline">
                  {r.t}
                </span>
                <span className="text-blue-400">{interno ? "→" : "↗"}</span>
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">{r.d}</p>
            </>
          );
          const cls =
            "group rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:bg-blue-50/30";
          // Se indexa por título: dos fichas distintas pueden apuntar a la
          // misma página (las cadenas de prompts y su galería de infografías).
          return interno ? (
            <Link key={r.t} href={r.u} className={cls}>
              {cuerpo}
            </Link>
          ) : (
            <a key={r.t} href={r.u} target="_blank" rel="noopener" className={cls}>
              {cuerpo}
            </a>
          );
        })}
      </div>

      {/* ── Cómo usar esto ─────────────────────────────────────────────── */}
      <div className="mt-12 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
        <h2 className="text-[15px] font-extrabold tracking-tight text-zinc-900">
          Cómo sacarle partido a esta página
        </h2>
        <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-zinc-600">
          <li>
            • <b>Antes del examen:</b> imprime la lista de control del{" "}
            <Dentro href="/ponencia-tecnologia/04-evaluacion/">bloque 6</Dentro>.
          </li>
          <li>
            • <b>Estudiando un tema:</b> ten abierto el{" "}
            <Dentro href="/ponencia-tecnologia/temario-con-ia/">bloque 3</Dentro>: la ruta completa,
            con sus cinco prompts.
          </li>
          <li>
            • <b>Preparando materiales:</b> el{" "}
            <Dentro href="/ponencia-tecnologia/materiales-visuales/">bloque 4</Dentro> y la galería de{" "}
            <Fuera href="https://aulaenlanube.com/cadenas-de-prompts/">infografías con su prompt</Fuera>.
          </li>
          <li>
            • <b>Si te quedaste a medias en el laboratorio:</b> el{" "}
            <Dentro href="/ponencia-tecnologia/03-laboratorio/">bloque 5</Dentro> tiene cada paso
            copiable para rematarlo desde casa.
          </li>
        </ul>
      </div>

      <div className="mt-8 flex justify-end">
        <PrintButton />
      </div>
    </div>
  );
}
