import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PromptBlock from "@/components/PromptBlock";

export const metadata: Metadata = {
  title: "Startup · Sesión 1 · Día 0: del problema a la primera ficha — Curso de Programación con IA",
  description:
    "Primera sesión del proyecto en grupo (1º DAM presencial, 19 de octubre de 2026): la meta de junio, cómo encontrar un problema por el que alguien pague, taller por equipos con la IA del centro y ronda de pitch con inversores.",
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
  ["0:00", "La misión y el listón de junio", "Qué es «terminado» para una startup de este curso"],
  ["0:10", "Problema antes que idea + la regla del dinero", "Los 4 filtros, las trampas y por qué todo producto debe poder monetizarse"],
  ["0:22", "Taller por equipos (pasos 1-6)", "De 15 problemas a una ficha de una página con sus cuentas, y la IA como abogado del diablo"],
  ["1:00", "Ensayo del pitch", "Cinco frases, un portavoz, un minuto de margen"],
  ["1:05", "Ronda de pitch", "3 min de pitch + 3 min de preguntas por equipo"],
  ["1:40", "Ronda de inversión", "Cada persona reparte 100 € ficticios entre los OTROS equipos"],
  ["1:45", "Recuento y lecciones", "Qué ha convencido y por qué"],
  ["1:53", "¿Pivotar o perseverar?", "Decisión del equipo y deberes de la semana"],
];

const FICHA = `# [Nombre provisional] — ficha v0

**Equipo:** nombre1 (rol), nombre2 (rol), nombre3 (rol), nombre4 (rol), nombre5 (rol)
**Fecha:** 19/10/2026

## 1. El problema (en una frase)
[Persona concreta] pierde [tiempo / dinero / nervios] cuando [situación].

## 2. Para quién (el primer cliente)
Quién es, dónde está, y el nombre de UNA persona real que conocemos que lo sufre.

## 3. Cómo lo resuelve hoy (la alternativa actual)
WhatsApp, Excel, papel, una app que odia… Si no hace nada, ¿de verdad le duele?

## 4. Nuestra solución (en una frase)
Una web/app que permite a [cliente] [hacer X] sin [el dolor].

## 5. Modelo de ingresos (OBLIGATORIO, aunque el proyecto sea altruista)
- Quién paga (puede no ser quien usa):
- Por qué paga (qué gana o qué se ahorra):
- Cómo y cuánto: suscripción / freemium / créditos / comisión / pago único / patrocinio
  Ej.: el negocio, 9 €/mes, suscripción con Stripe.

### Las cuentas del mantenimiento
- Coste al mes: servidor __ € + dominio __ € + IA/APIs __ € + otros __ € = __ €/mes
- Lo que deja cada cliente al mes (tras la comisión de Stripe): __ €
- Clientes que necesitamos para no perder dinero (coste ÷ lo que deja cada uno): __
- ¿Es realista conseguirlos? ¿Dónde están?

## 6. El MVP: lo mínimo que alguien usaría (máx. 3 funciones)
1.
2.
3.
Lo que NO hacemos en la primera versión:

## 7. Por qué nosotros
Qué sabemos, a quién conocemos o qué tenemos cerca que otros no.

## 8. El mayor riesgo (y cómo lo comprobaremos esta semana)
`;

export default function StartupSesion1() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Curso de Programación con IA", path: "/programacion-ia/" },
          { title: "Proyecto final en grupo", path: "/programacion-ia/proyecto-final-grupo/" },
          { title: "Sesión 1", path: "/programacion-ia/proyecto-final-grupo/sesion-01/" },
        ]}
      />
      <span className={chip}>1º DAM presencial · Startup en grupo · Sesión 1 · lunes 19 oct 2026</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Día 0 de vuestra startup: del problema a la primera ficha
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Los equipos ya están formados. Hoy dejáis de ser «un grupo de clase» y empezáis a funcionar como
        lo que vais a ser hasta junio: una <b>startup de 4-5 personas</b> que construye, con agentes de IA,
        un producto que alguien de fuera <b>usa y paga</b>. Hoy no se programa ni una línea: hoy se decide
        <b> qué merece la pena programar</b>, que es justo la parte que la IA no puede hacer por vosotros.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={meta}>👥 Por equipos (4-5)</span>
        <span className={meta}>⏱ 2 horas</span>
        <span className={meta}>💬 Chat del centro</span>
        <span className={meta}>🎤 Pitch de 3 min por equipo</span>
        <span className={meta}>💶 Modelo de ingresos obligatorio</span>
        <span className={meta}>📤 Para el 26 oct: repo + ficha v1 + 5 entrevistas</span>
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
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Primera hora: pensar en equipo. Segunda hora: exponerlo delante de todos y escuchar lo que el «mercado» (vuestros compañeros) opina.
      </p>

      {/* ───────────── PRIMERA HORA ───────────── */}
      <h2 className="mt-10 text-xl font-extrabold tracking-tight">1 · La misión: qué significa «terminado» en junio</h2>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        En este curso una startup no se acaba con «funciona en mi ordenador». Se acaba cuando cumple estas
        cuatro cosas, y todas se pueden comprobar desde fuera:
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className={card}>
          <h3 className="text-[15px] font-bold">🌍 Está en Internet</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">En un servidor de verdad, con dominio, HTTPS y base de datos. Cualquiera entra desde su móvil.</p>
        </div>
        <div className={card}>
          <h3 className="text-[15px] font-bold">🙋 Tiene usuarios reales</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Al menos 10 personas que no son de vuestra familia ni de esta clase y lo han usado para lo que sirve.</p>
        </div>
        <div className={card}>
          <h3 className="text-[15px] font-bold">💳 Se sostiene solo</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Tiene un modelo de ingresos pensado y pasarela de pago con Stripe funcionando: primero en modo test, y si el producto lo merece, en real. Como mínimo, sus ingresos pagan lo que cuesta mantenerlo.</p>
        </div>
        <div className={card}>
          <h3 className="text-[15px] font-bold">🧭 Se ve cómo lo hicisteis</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Sprints, PRs revisadas por un compañero, decisiones anotadas. Y cada uno sabe defender su parte.</p>
        </div>
      </div>

      <h3 className="mt-6 text-[15px] font-bold">El camino, a grandes rasgos</h3>
      <ol className="mt-2 space-y-2 text-[15px] text-zinc-700 dark:text-zinc-300">
        <li><b>Oct – dic · Descubrir:</b> encontrar el problema, hablar con clientes, decidir el MVP. Prototipo navegable.</li>
        <li><b>Ene – mar · Construir:</b> el MVP con base de datos y usuarios, desplegado en servidor. Primeros usuarios de verdad.</li>
        <li><b>Abr – jun · Lanzar:</b> Stripe, pulido, crecimiento y <b>demo day</b> con invitados de fuera.</li>
      </ol>
      <div className="my-5 rounded-2xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-5 text-[15px] text-emerald-900 dark:text-emerald-200">
        <b>Por qué empezamos por aquí y no por el código:</b> la mayoría de startups no mueren porque el
        código esté mal, sino porque construyen algo que nadie necesita. Con agentes de IA programar es cada
        vez más barato; equivocarse de problema sigue costando meses. Hoy os jugáis esos meses.
      </div>

      <h2 className="mt-10 text-xl font-extrabold tracking-tight">2 · Problema antes que idea</h2>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        «Una app para…» es una idea. «Mi tío pierde dos horas cada domingo cuadrando las reservas del pádel por
        WhatsApp» es un <b>problema</b>. Las startups buenas empiezan por lo segundo. Cualquier idea que salga
        hoy tiene que pasar <b>cuatro filtros</b>:
      </p>
      <div className="mt-4 space-y-3">
        <div className={card}>
          <h3 className="text-[15px] font-bold">1 · Dolor real, con nombre y apellidos</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Podéis señalar a una persona concreta que lo sufre y que ya intenta resolverlo de alguna forma (aunque sea mal). Si nadie hace nada hoy, probablemente no le duele.</p>
        </div>
        <div className={card}>
          <h3 className="text-[15px] font-bold">2 · Alguien paga (y no es vuestra madre)</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Sabéis quién sacaría la tarjeta, por qué y aproximadamente cuánto. Ojo: quien paga no siempre es quien usa (el bar paga, el cliente reserva). Este filtro no se puede saltar: lo explicamos ahora mismo.</p>
        </div>
        <div className={card}>
          <h3 className="text-[15px] font-bold">3 · Cabe en un MVP de seis semanas</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Una primera versión útil con 2-3 funciones, que 4-5 personas dirigiendo agentes pueden construir. Lo grande viene después, si alguien lo usa.</p>
        </div>
        <div className={card}>
          <h3 className="text-[15px] font-bold">4 · Legal y cobrable</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Nada de apuestas, datos de salud, contenido para adultos ni nada que Stripe no acepte. Si tratáis datos de menores o datos sensibles, el producto se complica mucho: mejor evitarlo.</p>
        </div>
      </div>
      <div className="my-5 rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-5 text-[15px] text-amber-900 dark:text-amber-200">
        <b>Trampas clásicas (si vuestra idea es una de estas, desconfiad):</b>
        <ul className="mt-2 space-y-1 text-sm">
          <li>• <b>«Una red social para…»</b>: sin miles de usuarios desde el primer día está vacía, y vacía no vale nada.</li>
          <li>• <b>«El Wallapop/Uber de…»</b>: un mercado necesita compradores Y vendedores a la vez; conseguir los dos es lo más difícil que existe.</li>
          <li>• <b>«La app que lo hace todo»</b>: si necesitáis más de una frase para explicarla, son tres productos.</li>
          <li>• <b>«Para todo el mundo»</b>: si es para todos, no sabéis a quién vendérsela el lunes.</li>
        </ul>
      </div>
      <h3 className="mt-8 text-lg font-extrabold tracking-tight">La regla del dinero: todo producto debe poder monetizarse</h3>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        Es <b>obligatoria en este proyecto</b>, también si vuestra idea nace para ayudar y no para ganar dinero.
        Podéis empezar algo sin saber todavía cuánto vais a ganar, pero no sin saber <b>cómo</b> lo podríais
        ganar. Un producto en Internet cuesta dinero cada mes aunque nadie lo use: servidor, dominio, la IA que
        llama, el correo, el mantenimiento. Si nadie paga esas facturas, las pagáis vosotros, y el proyecto
        muere el día que os canséis de pagarlas. Que se cierre una web gratuita que la gente usaba no es
        altruismo: es dejar tirados a sus usuarios.
      </p>
      <div className="my-5 rounded-2xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-5 text-[15px] text-emerald-900 dark:text-emerald-200">
        <b>El listón mínimo:</b> los ingresos tienen que cubrir, como poco, lo que cuesta mantener el producto
        vivo durante años <b>sin que os cueste dinero a vosotros</b>. Todo lo que entre por encima es negocio.
        Y lo tenéis que demostrar con números en la ficha, no con un «ya veremos».
      </div>

      <p className="text-[15px] text-zinc-700 dark:text-zinc-300">Formas de monetizar que caben en un producto de este curso:</p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/10">
        <table className="w-full min-w-[600px] border-collapse text-sm">
          <thead className="bg-zinc-50 text-left dark:bg-white/5">
            <tr>
              <th className="px-3 py-2.5 font-bold">Modelo</th>
              <th className="px-3 py-2.5 font-bold">Cómo funciona</th>
              <th className="px-3 py-2.5 font-bold">Ejemplo</th>
            </tr>
          </thead>
          <tbody className="[&_td]:px-3 [&_td]:py-2.5 [&_td]:align-top [&_td]:text-zinc-600 dark:[&_td]:text-zinc-400 [&_tr]:border-t [&_tr]:border-zinc-100 dark:[&_tr]:border-white/5">
            <tr><td className="font-bold !text-zinc-800 dark:!text-zinc-200">Suscripción</td><td>Una cuota al mes o al año por usarlo.</td><td>El club paga 15 €/mes por el sistema de reservas.</td></tr>
            <tr><td className="font-bold !text-zinc-800 dark:!text-zinc-200">Freemium</td><td>Lo básico gratis para todos; quien necesita más, paga.</td><td>Gratis hasta 20 alumnos; el profe con 5 grupos paga.</td></tr>
            <tr><td className="font-bold !text-zinc-800 dark:!text-zinc-200">Créditos / pago por uso</td><td>Se paga cada vez que se usa lo que os cuesta dinero (la IA, por ejemplo).</td><td>10 generaciones gratis; 3 € por 50 más.</td></tr>
            <tr><td className="font-bold !text-zinc-800 dark:!text-zinc-200">Comisión</td><td>Un porcentaje de lo que se mueve gracias a vosotros.</td><td>El 5 % de cada venta del marketplace.</td></tr>
            <tr><td className="font-bold !text-zinc-800 dark:!text-zinc-200">Paga el negocio, no el usuario</td><td>El usuario lo usa gratis; paga quien gana algo con él.</td><td>Los vecinos consultan gratis; los comercios pagan por aparecer destacados.</td></tr>
            <tr><td className="font-bold !text-zinc-800 dark:!text-zinc-200">Patrocinio y donaciones</td><td>Empresas o personas que apoyan la causa. Sirve de complemento, pero no basta como único modelo: nadie dona con regularidad durante años.</td><td>Una protectora: adoptar es gratis, una tienda de mascotas patrocina y hay botón de donar con Stripe.</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
        Publicidad: con pocos usuarios no da ni para el dominio y estropea el producto. No vale como modelo principal.
      </p>

      <p className="mt-6 text-[15px] text-zinc-600 dark:text-zinc-400">
        ¿Os falta inspiración? En la <Link href="/programacion-ia/proyecto-final-grupo/" className="font-semibold">página del proyecto</Link> tenéis
        cinco tipos de producto con potencial (reservas locales, segunda mano hiperlocal, SaaS para profes,
        comunidad deportiva, micro-SaaS con IA). Usadlos como punto de partida, no como respuesta.
      </p>

      <h2 className="mt-10 text-xl font-extrabold tracking-tight">3 · Taller por equipos: de 15 problemas a una ficha</h2>
      <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
        Casi cuarenta minutos, seis pasos y un cronómetro. Sentaos juntos y abrid un documento compartido (o un
        papel grande). Quien tome notas ese día no es quien más habla.
      </p>

      <Paso n="1" t="Escritura en silencio" min="5 min">
        <p>
          Cada persona, <b>sola y sin hablar</b>, escribe <b>3 problemas</b> que haya visto de cerca: en casa, en el
          trabajo de alguien, en el pueblo, en el club, en el instituto. Formato obligatorio:
        </p>
        <p className="rounded-xl bg-zinc-100 p-3 font-mono text-sm dark:bg-white/10">
          [Persona concreta] pierde [tiempo / dinero / nervios] cuando [situación].
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          ¿Por qué en silencio? Porque si se habla desde el minuto uno, gana la idea de quien más habla, no la mejor.
        </p>
      </Paso>

      <Paso n="2" t="Ponerlo en común y agrupar" min="6 min">
        <p>
          Cada uno lee los suyos sin defenderlos (nadie critica todavía). Juntad los que se parecen: casi
          siempre aparecen 4-6 temas. Para cada tema, preguntad: <b>¿quién de nosotros conoce a alguien que lo sufra?</b>
        </p>
      </Paso>

      <Paso n="3" t="Votación por puntos" min="3 min">
        <p>
          Cada persona tiene <b>3 votos</b> (puede ponerlos todos en uno). Votad a la vez, no en orden. Las
          <b> dos</b> más votadas pasan a la final. Pasad las dos por los 4 filtros: si una cae, la otra gana.
        </p>
      </Paso>

      <Paso n="4" t="La IA del centro, de abogado del diablo" min="8 min">
        <p>
          Pegad vuestras dos finalistas en el chat del centro con este prompt. No le pidáis que os diga que
          son buenas: pedidle que intente <b>tumbarlas</b>.
        </p>
        <PromptBlock text={`Actúa como un inversor exigente que ha visto fracasar cientos de startups.
Somos un equipo de 5 estudiantes de 1º de DAM. Construiremos el producto con agentes de IA
durante el curso y queremos venderlo de verdad (con Stripe) antes de junio.

Idea A: [problema en una frase] → [solución en una frase]
Idea B: [problema en una frase] → [solución en una frase]

Para cada idea:
1. Las 3 razones más probables por las que fracasaría.
2. Quién pagaría exactamente, por qué y cuánto es realista cobrar. Aunque la idea sea
   altruista, propón al menos 2 formas de monetizarla que no estropeen el producto.
3. Qué alternativa usan hoy esos clientes (gratis o de pago).
4. La pregunta que le harías a un cliente para saber si el problema es real.
Sé directo y breve. No inventes datos: si no lo sabes, dilo.`} />
        <div className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-4 text-sm text-blue-900 dark:text-blue-200">
          <b>Criterio de desarrollador:</b> la IA os va a nombrar competidores, cifras y precios. Algunos serán
          inventados con total seguridad. Lo que vaya a la ficha, comprobadlo antes (buscad la web del
          competidor, ¿existe de verdad?). Las críticas, en cambio, escuchadlas todas: son gratis.
        </div>
      </Paso>

      <Paso n="5" t="La ficha de una página" min="12 min">
        <p>
          Elegid <b>una</b> idea y rellenad esta ficha. Copiadla tal cual: será el <code>README.md</code> de
          vuestro repositorio esta misma semana. Si una casilla no os sale, no pasa nada: eso es exactamente
          lo que tenéis que averiguar hablando con clientes.
        </p>
        <PromptBlock text={FICHA} />
        <p>
          <b>La casilla 5 no puede quedar vacía.</b> Para las cuentas del mantenimiento, pedidle a la IA una
          estimación y luego comprobad los precios en la web de cada proveedor:
        </p>
        <PromptBlock text={`Vamos a lanzar este producto: [solución en una frase], para [cliente].
Esperamos unos [número] usuarios el primer año.
1. Haz una lista de lo que nos costaría mantenerlo en Internet cada mes: servidor,
   dominio, base de datos, correo, llamadas a IA o APIs, comisiones de Stripe.
   Pon un rango de precio para cada cosa y dime de dónde sale cada precio.
2. Propón 3 formas de monetizarlo y, para cada una, cuántos clientes harían falta
   para cubrir esos costes.
3. Dime cuál de las 3 encaja mejor con nuestro cliente y por qué.`} />
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Si el MVP se os va de las manos, pedidle a la IA que lo recorte: <i>«Este es nuestro MVP: […].
          Quita todo lo que no sea imprescindible para que un primer cliente lo use una vez y le resuelva
          el problema. Máximo 3 funciones.»</i>
        </p>
      </Paso>

      <Paso n="6" t="Nombre, roles y portavoz" min="4 min">
        <p>
          Poned un <b>nombre provisional</b> (se puede cambiar; no perdáis más de un minuto en esto) y repartid
          los roles del proyecto: <b>producto</b> (decide qué y en qué orden, habla con clientes),{" "}
          <b>lead técnico</b> (arquitectura y fusiones), <b>calidad</b> (que nada se publique roto),{" "}
          <b>datos/IA</b> (prompts, APIs, integración) y <b>diseño/contenido</b>. Todos programáis con los
          agentes; el rol dice de qué tira cada uno. Los roles de hoy son provisionales: se confirman en un mes.
        </p>
        <p>Elegid quién hace el pitch. Pista: no tiene por qué ser quien más habla, sino quien mejor entiende el problema.</p>
      </Paso>

      {/* ───────────── SEGUNDA HORA ───────────── */}
      <h2 className="mt-10 text-xl font-extrabold tracking-tight">4 · Segunda hora: ronda de pitch con inversores</h2>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        Cada equipo presenta su idea al resto de la clase. Mientras un equipo presenta, <b>los demás sois
        inversores</b>: escucháis, preguntáis y al final ponéis dinero (ficticio) donde creéis que hay negocio.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className={card}>
          <h3 className="text-[15px] font-bold">🎤 El pitch: 3 minutos, 5 frases</h3>
          <ol className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>1. <b>El problema</b>, contado con una persona real («Marta tiene una peluquería y…»).</li>
            <li>2. <b>A quién le pasa</b> y cuántos hay cerca de nosotros.</li>
            <li>3. <b>Nuestra solución</b> en una frase, y qué hace el MVP.</li>
            <li>4. <b>Cómo cobramos</b>: quién paga, cuánto, por qué lo haría y cuántos clientes necesitamos para cubrir el mantenimiento.</li>
            <li>5. <b>Por qué nosotros</b> y cuál es nuestro mayor riesgo.</li>
          </ol>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Sin diapositivas: la ficha proyectada como mucho. A los 3 minutos se corta.</p>
        </div>
        <div className={card}>
          <h3 className="text-[15px] font-bold">❓ Las preguntas: 3 minutos</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Los inversores preguntan; el equipo responde (todos, no solo el portavoz). Preguntas que valen oro:</p>
          <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>• ¿Con cuántas personas que lo sufren habéis hablado?</li>
            <li>• ¿Qué usan ahora y por qué se cambiarían?</li>
            <li>• Si mañana dejáis de poner dinero, ¿quién paga el servidor?</li>
            <li>• ¿Qué es lo primero que construiríais el lunes?</li>
            <li>• ¿Qué tendría que pasar para que lo dejarais?</li>
          </ul>
        </div>
      </div>

      <div className={`mt-4 ${card}`}>
        <h3 className="text-[15px] font-bold">💶 La ronda de inversión</h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Al acabar todos los pitches, cada persona tiene <b>100 € ficticios</b> para repartir entre los <b>otros</b>{" "}
          equipos (nunca el suyo), en múltiplos de 10. En un papel o en el formulario que diga el profe:
        </p>
        <p className="mt-2 rounded-xl bg-zinc-100 p-3 font-mono text-sm dark:bg-white/10">
          Equipo ___ : __ €  — porque ________________ <br />
          Equipo ___ : __ €  — porque ________________ <br />
          A este equipo le preguntaría: ________________
        </p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          La frase del «porque» es lo importante: el dinero dice <i>qué</i> convence, la frase dice <i>por qué</i>.
          Un inversor de verdad pregunta siempre lo mismo: <b>¿cómo me devolvéis el dinero?</b> Si un equipo no ha
          explicado cómo gana dinero, no le deis el vuestro, por buena que sea la causa.
          Invertid como si fuera vuestro dinero, no por amistad: el equipo al que le regaláis los votos se
          entera en abril de que su idea no funcionaba.
        </p>
      </div>

      <h2 className="mt-10 text-xl font-extrabold tracking-tight">5 · Cierre: ¿pivotar o perseverar?</h2>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        Con el recuento en la pizarra y las preguntas que os han hecho, cada equipo decide en 5 minutos una
        de tres cosas, y la apunta en la ficha:
      </p>
      <ul className="mt-3 space-y-2 text-[15px] text-zinc-700 dark:text-zinc-300">
        <li>• <b>Perseverar:</b> la idea aguanta; las preguntas nos dicen qué comprobar.</li>
        <li>• <b>Ajustar:</b> mismo problema, pero otro cliente u otra forma de cobrar (si el modelo de ingresos no convenció, es lo primero que se ajusta).</li>
        <li>• <b>Pivotar:</b> volvemos a la otra finalista (o a otro problema del paso 1). Cambiar ahora cuesta una semana; en marzo cuesta el proyecto.</li>
      </ul>
      <p className="mt-3 text-[15px] text-zinc-600 dark:text-zinc-400">
        Pocos inversores no significa mala idea, y muchos no significa buena: vuestros compañeros no son
        vuestros clientes. Lo que decide es lo que os digan los clientes de verdad esta semana.
      </p>

      <h2 className="mt-10 text-xl font-extrabold tracking-tight">Para el lunes 26 de octubre</h2>
      <div className="mt-3 rounded-2xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 p-5 text-[15px] text-red-900 dark:text-red-200">
        <ol className="space-y-2 text-sm">
          <li>
            <b>1 · El repo del equipo.</b> Una organización de GitHub para la startup y un repositorio dentro, con
            todos los miembros invitados. El profe también (usuario <code>aulaenlanube</code>).
          </li>
          <li>
            <b>2 · La ficha v1 como <code>README.md</code>,</b> corregida con lo que salió en el pitch, más un{" "}
            <code>docs/decisiones.md</code> con la primera decisión: por qué esta idea y no la otra finalista.
            Commits de varias personas, no de una.
          </li>
          <li>
            <b>3 · Cinco entrevistas</b> a personas que sufren el problema (fuera de la clase), apuntadas en{" "}
            <code>docs/entrevistas.md</code>: a quién, qué dijo, qué os sorprendió. Repartidlas: una por persona.
            Al menos dos tienen que ser a <b>quien pagaría</b>, y en ellas averiguad cuánto le cuesta hoy el
            problema (en tiempo o en dinero): es la mejor pista de cuánto podréis cobrar.
          </li>
        </ol>
      </div>

      <h3 className="mt-6 text-[15px] font-bold">Cómo entrevistar sin engañaros</h3>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        Si preguntáis «¿usarías una app que…?», todo el mundo os dirá que sí por educación, y no os sirve para
        nada. Las reglas:
      </p>
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 p-5 text-sm text-red-900 dark:text-red-200">
          <b>No preguntéis</b>
          <ul className="mt-2 space-y-1">
            <li>✗ ¿Te gusta la idea?</li>
            <li>✗ ¿Usarías una app que…?</li>
            <li>✗ ¿Cuánto pagarías por…?</li>
            <li>✗ (Y no expliquéis vuestra idea hasta el final, si acaso)</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-5 text-sm text-emerald-900 dark:text-emerald-200">
          <b>Preguntad por lo que ya pasó</b>
          <ul className="mt-2 space-y-1">
            <li>✓ Cuéntame la última vez que te pasó [el problema].</li>
            <li>✓ ¿Qué hiciste? ¿Cuánto tiempo o dinero te costó?</li>
            <li>✓ ¿Has probado algo para solucionarlo? ¿Por qué lo dejaste?</li>
            <li>✓ ¿Quién más tiene este problema? ¿Me lo presentas?</li>
          </ul>
        </div>
      </div>
      <PromptBlock text={`Vamos a entrevistar a [tipo de cliente] sobre este problema: [problema].
Escríbenos un guion de 6 preguntas que hablen solo de su experiencia pasada (nada de
"¿usarías…?" ni "¿pagarías…?"), y una pregunta final para que nos presente a otra persona
con el mismo problema. Tono cercano: somos estudiantes, no una empresa.`} />

      <div className="my-6 rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-5 text-[15px] text-blue-900 dark:text-blue-200">
        <b>Cómo cuenta esta fase:</b> hoy no hay nota numérica. Pero la ficha, el repo y las entrevistas son la
        primera página del <b>proceso</b> que se evalúa en el proyecto, y la nota es individual dentro del grupo:
        se verá quién hizo las entrevistas, quién escribió los commits y quién sabe explicar por qué elegisteis
        esta idea.
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 dark:border-white/10 pt-5">
        <Link href="/programacion-ia/proyecto-final-grupo/" className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-zinc-200 transition hover:bg-zinc-50 dark:hover:bg-white/5">
          ← El proyecto en grupo
        </Link>
        <Link href="/programacion-ia/aula/#/equipos" className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500">
          🧩 Mi equipo en el aula →
        </Link>
      </div>
    </div>
  );
}
