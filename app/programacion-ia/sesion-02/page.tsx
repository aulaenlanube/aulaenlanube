import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PromptBlock from "@/components/PromptBlock";
// Diagramas interactivos (Componente de Cliente). Esta página sigue siendo de
// servidor: solo renderiza los componentes, sin pasarles props ni funciones.
import {
  CadenaCommits,
  GitVsGithub,
  IdentidadVsCredenciales,
  IntroGrafoBolitas,
  MaquinaDelTiempo,
  MergeDiagrama,
  PullRequestDiagrama,
  RamasDosDisenos,
  TresZonas,
} from "./diagrama-interactivo";

export const metadata: Metadata = {
  title: "Sesión 2 · Git y GitHub de verdad (y la autenticación que falla) — Curso de Programación con IA",
  description:
    "Qué es Git y qué es GitHub, explicados en profundidad; la configuración global desde consola paso a paso; qué escribir exactamente cuando la terminal pide usuario y contraseña (pista: un token, no tu contraseña) y los errores típicos de la configuración inicial, con su arreglo.",
};

const chip =
  "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300";
const meta =
  "rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 px-3 py-1 text-[12px] font-semibold text-zinc-700 dark:text-zinc-300";
const tarjeta =
  "rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm";

const INDICE = [
  ["#git", "Qué es Git"],
  ["#github", "Qué es GitHub"],
  ["#configuracion", "Configuración global"],
  ["#autenticacion", "Usuario y contraseña"],
  ["#errores", "Errores típicos"],
  ["#conceptos", "Los cinco conceptos"],
  ["#misiones", "Las misiones"],
] as const;

const COMPARATIVA = [
  ["Qué es", "Un programa instalado en tu ordenador", "Una web y una empresa (github.com)"],
  ["Quién y cuándo", "Linus Torvalds, 2005, para el kernel de Linux", "GitHub Inc., 2008; de Microsoft desde 2018"],
  ["¿Necesita internet?", "No. Sin wifi puedes trabajar toda la tarde", "Sí: es un servidor al que te conectas"],
  ["¿Usuario y contraseña?", "No tiene. No sabe quién eres", "Sí: cuenta, doble factor y tokens"],
  ["Dónde guarda tu historia", "En la carpeta oculta .git de tu proyecto", "En sus servidores, en una copia del repositorio"],
  ["Qué te da", "Historial, ramas, fusiones, volver atrás", "Copia remota, pull requests, issues, Actions, Pages, perfil"],
  ["¿Se puede usar sin el otro?", "Sí, perfectamente y para siempre", "No: GitHub guarda repositorios de Git"],
  ["Se maneja con", "Comandos: add, commit, branch, merge", "Botones en la web; push y pull hablan con él"],
] as const;

const EXTRAS_GITHUB = [
  ["☁️", "Copia remota", "Tu historia deja de vivir solo en tu portátil. Si se rompe, se moja o lo pierdes, tu trabajo sigue ahí."],
  ["🔀", "Pull requests", "No existen en Git: son invento de GitHub. Propones un cambio, otra persona lo revisa y decide si entra."],
  ["🗒", "Issues y Projects", "Tareas, errores y tableros pegados al código, no en otra herramienta aparte."],
  ["🔍", "Revisión de código", "Comentarios línea a línea sobre un cambio concreto. Así se aprende de verdad en una empresa."],
  ["🤖", "Actions", "Robots que en cada push ejecutan tus pruebas o despliegan la web sin que tú hagas nada."],
  ["🌐", "Pages", "Publicar una web estática gratis en tuusuario.github.io. Literalmente, la web que estás haciendo."],
  ["👤", "Perfil público", "Tu portafolio: repositorios, el cuadrito verde de contribuciones y lo que enseñas de ti."],
  ["🔑", "Cuentas y permisos", "Quién puede escribir dónde. Aquí nacen los usuarios, el doble factor y los tokens de hoy."],
];

function Concepto({ nombre, analogia, que }: { nombre: string; analogia: string; que: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4 shadow-sm">
      <h3 className="flex flex-wrap items-baseline gap-x-2 text-[15px] font-bold">
        {nombre}
        <span className="text-[13px] font-semibold italic text-blue-700 dark:text-blue-300">{analogia}</span>
      </h3>
      <p className="mt-1.5 text-sm text-zinc-700 dark:text-zinc-300">{que}</p>
    </div>
  );
}

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mt-10 scroll-mt-24 text-xl font-extrabold tracking-tight">
      {children}
    </h2>
  );
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-6 text-[17px] font-bold tracking-tight">{children}</h3>;
}

// Caja tintada: aviso (ámbar), nota (azul), bien (verde) y peligro (rosa).
const CAJAS = {
  aviso: "border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 text-amber-900 dark:text-amber-200",
  nota: "border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-200",
  bien: "border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-200",
  peligro: "border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 text-rose-900 dark:text-rose-200",
  neutra: "border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 text-zinc-800 dark:text-zinc-200",
} as const;

function Caja({ tipo, children }: { tipo: keyof typeof CAJAS; children: ReactNode }) {
  return <div className={`my-5 rounded-2xl border p-5 text-[15px] ${CAJAS[tipo]}`}>{children}</div>;
}

function Ficha({ icono, titulo, texto }: { icono: string; titulo: string; texto: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4 shadow-sm">
      <h4 className="text-[15px] font-bold">
        <span aria-hidden="true" className="mr-1.5">
          {icono}
        </span>
        {titulo}
      </h4>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{texto}</p>
    </div>
  );
}

// Ficha de error: el mensaje exacto de la terminal en la cabecera plegable y,
// dentro, qué ha pasado y cómo se arregla. El mensaje llega como prop (string)
// para poder escribir comillas y apóstrofos tal cual los saca Git.
function ErrorGit({
  msg,
  causa,
  arreglo,
  cmd,
}: {
  msg: string;
  causa: ReactNode;
  arreglo: ReactNode;
  cmd?: string;
}) {
  return (
    <details className="group overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm">
      <summary className="flex cursor-pointer list-none gap-2 px-4 py-3 transition hover:bg-zinc-50 dark:hover:bg-white/5 [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-zinc-400 dark:text-zinc-400 transition-transform group-open:rotate-90"
        >
          ▸
        </span>
        <span className="font-mono text-[13px] font-semibold leading-snug text-rose-700 dark:text-rose-300">
          {msg}
        </span>
      </summary>
      <div className="border-t border-zinc-200 dark:border-white/10 px-4 py-3 text-[15px] text-zinc-700 dark:text-zinc-300">
        <p>
          <b>Qué ha pasado:</b> {causa}
        </p>
        <p className="mt-1.5">
          <b>Cómo se arregla:</b> {arreglo}
        </p>
        {cmd ? <PromptBlock text={cmd} /> : null}
      </div>
    </details>
  );
}

function Mision({
  n,
  titulo,
  objetivo,
  comprueba,
  extra,
  diagrama,
}: {
  n: string;
  titulo: string;
  objetivo: ReactNode;
  comprueba: ReactNode;
  extra?: ReactNode;
  diagrama?: ReactNode;
}) {
  return (
    <section className="my-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm">
      <h3 className="flex flex-wrap items-baseline gap-x-3 text-[17px] font-bold">
        <span className="text-zinc-400 dark:text-zinc-400">{n}</span> {titulo}
      </h3>
      <p className="mt-2 text-[15px] text-zinc-700 dark:text-zinc-300">{objetivo}</p>
      {diagrama}
      <div className="mt-3 rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-3.5 text-sm text-emerald-900 dark:text-emerald-200">
        <b>✔ Cómo compruebas que está logrado:</b> {comprueba}
      </div>
      {extra ? <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{extra}</p> : null}
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
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Hoy tu web deja de vivir solo en tu portátil. Cada uno sale de clase con su cuenta de GitHub,
        su Git configurado y autenticado, su repositorio enlazado a la web que empezaste el viernes,
        varios commits de verdad, una máquina del tiempo usada, y <b>dos diseños distintos en dos
        ramas</b>. Con una norma que no se rompe hoy: <b>todas las dudas se preguntan primero a los
        modelos del centro</b>.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={meta}>🤖 Pregúntalo a la IA del centro</span>
        <span className={meta}>⌨️ Tú escribes las instrucciones</span>
        <span className={meta}>🔑 Un token, no tu contraseña</span>
        <span className={meta}>🕰 Commits = máquina del tiempo</span>
        <span className={meta}>🌚🌕 Dos ramas, dos diseños</span>
      </div>

      <nav aria-label="Índice de la sesión" className={`my-5 ${tarjeta}`}>
        <p className="text-[13px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400">
          En esta sesión
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {INDICE.map(([href, texto]) => (
            <li key={href}>
              <a
                href={href}
                className="inline-block rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 px-3 py-1 text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 transition hover:border-blue-300 dark:hover:border-blue-500/40 hover:text-blue-700 dark:hover:text-blue-300"
              >
                {texto}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`my-5 ${tarjeta}`}>
        <p className="text-[15px] text-zinc-700 dark:text-zinc-300">
          <b>Git es un grafo de bolitas, no una carpeta con versiones.</b> Cada commit es una bola;
          las flechas marcan hacia dónde avanza la historia; una píldora (HEAD) dice dónde estás. Todo lo de
          hoy son bolitas, flechas y dos o tres palabras: mira cada dibujo antes de tocar el teclado
          y sabrás qué tecla pulsar.
        </p>
        <div className="mt-3">
          <IntroGrafoBolitas />
        </div>
      </div>

      <Caja tipo="nota">
        <b>Las reglas del juego de hoy</b> (así se trabaja de verdad con IA):
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>
            Esta página te dice <b>qué conseguir</b>, no <b>cómo</b>. Los comandos no vienen escritos
            aquí a propósito: los consigue cada uno preguntando a los modelos del centro.
          </li>
          <li>
            <b>Con una excepción, la de hoy: la configuración inicial y la autenticación sí vienen
            escritas</b>, comando a comando, en las dos secciones de abajo. Pelearse a ciegas con un
            token no enseña nada, y el curso entero depende de que esto quede bien montado. Todo lo
            demás —add, commit, ramas, merge— lo sigues preguntando tú.
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
      </Caja>

      {/* ══════════════════════════ GIT ══════════════════════════ */}
      <H2 id="git">Qué es Git, de verdad</H2>
      <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
        La mitad de los líos de hoy vienen de creer que Git y GitHub son la misma cosa. No lo son, y
        no se parecen: uno es un programa y el otro es una web. Empecemos por el programa.
      </p>

      <div className={`mt-4 ${tarjeta}`}>
        <ul className="space-y-3 text-[15px] text-zinc-700 dark:text-zinc-300">
          <li>
            <b>Es un programa que se instala en tu ordenador.</b> Lo escribió Linus Torvalds en 2005,
            el mismo que hizo Linux, porque necesitaba controlar los cambios de un proyecto donde
            miles de personas tocan el mismo código a la vez. Se maneja escribiendo comandos.
          </li>
          <li>
            <b>No tiene cuenta, ni contraseña, ni necesita internet.</b> Con el wifi caído puedes
            hacer commits toda la tarde. Git no sabe quién eres ni le importa: eso llega después, y
            es de GitHub.
          </li>
          <li>
            <b>Lo que hace es guardar fotos completas de tu proyecto.</b> Cada vez que le dices
            «guarda», Git congela cómo estaba todo en ese instante y le pone una etiqueta única de 40
            caracteres —el <i>hash</i>, del que solemos ver solo los siete primeros:{" "}
            <code className="font-mono text-[13px]">a1b2c3d</code>—. Tu historia es la cadena de esas
            fotos, y puedes volver a cualquiera.
          </li>
          <li>
            <b>Vive en una carpeta oculta llamada .git</b>, dentro de tu proyecto. Eso <i>es</i> el
            repositorio: copia la carpeta del proyecto en un pendrive y te llevas la historia entera;
            borra <code className="font-mono text-[13px]">.git</code> y tus ficheros siguen ahí, pero
            la historia desaparece para siempre.
          </li>
          <li>
            <b>Es «distribuido».</b> Cada copia del repositorio es un repositorio completo, con toda
            la historia dentro, no un trozo que depende de un servidor. Por eso no hay un «Git
            central» al que pedir permiso: hay copias que se ponen de acuerdo.
          </li>
        </ul>
      </div>

      <H3>Las cuatro paradas de un cambio (esto es lo que más cuesta)</H3>
      <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
        Cuando cambias un color en tu CSS, ese cambio no salta directo a GitHub: hace cuatro paradas,
        y cada salto lo provoca un comando distinto. Entender esto es entender Git entero; la mayoría
        de los «no me sube nada» son un cambio dormido en la parada equivocada.
      </p>
      <TresZonas />
      <Caja tipo="neutra">
        <b>La consecuencia práctica:</b> <code className="font-mono text-[13px]">git add</code> no
        guarda, solo apunta lo que quieres guardar. <code className="font-mono text-[13px]">git
        commit</code> guarda, pero solo en tu portátil.{" "}
        <code className="font-mono text-[13px]">git push</code> es el único que sale a internet. Si
        haces commit y cierras el portátil, en GitHub no hay nada: no es un fallo, es que te falta
        una parada.
      </Caja>

      {/* ══════════════════════════ GITHUB ══════════════════════════ */}
      <H2 id="github">Qué es GitHub, de verdad</H2>
      <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
        GitHub es <b>una web y una empresa</b>: github.com, nacida en 2008 y comprada por Microsoft
        en 2018. Su trabajo es guardar repositorios de Git en sus servidores y montar herramientas
        alrededor. Es un sitio, no una tecnología —hay otros que hacen lo mismo: GitLab, Bitbucket,
        Codeberg, o un servidor tuyo—. Podrías usar Git toda tu vida sin abrir GitHub jamás.
      </p>
      <p className="mt-2 text-[15px] text-zinc-600 dark:text-zinc-400">
        Entonces, ¿para qué lo usamos? Porque encima de Git añade todo esto, que Git no tiene:
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {EXTRAS_GITHUB.map(([icono, titulo, texto]) => (
          <Ficha key={titulo} icono={icono} titulo={titulo} texto={texto} />
        ))}
      </div>

      <Caja tipo="nota">
        <b>La frase para acordarse:</b> Git es el programa que guarda tu historia; GitHub es el sitio
        donde esa historia se guarda <i>para los demás</i>. Y el detalle que lo explica todo sobre lo
        que viene ahora: <b>Git no tiene usuarios ni contraseñas; GitHub sí</b>. Toda la autenticación
        que vamos a montar es de GitHub, no de Git.
      </Caja>

      <H3>Las dos herramientas, una al lado de la otra</H3>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
        <table className="w-full min-w-[620px] border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-100 dark:bg-white/10 text-left">
              <th className="w-[22%] px-3.5 py-2.5 font-bold">&nbsp;</th>
              <th className="w-[39%] px-3.5 py-2.5 font-bold">Git</th>
              <th className="px-3.5 py-2.5 font-bold">GitHub</th>
            </tr>
          </thead>
          <tbody>
            {COMPARATIVA.map(([campo, git, github]) => (
              <tr key={campo} className="border-t border-zinc-200 dark:border-white/10 align-top">
                <td className="px-3.5 py-2.5 font-bold text-zinc-800 dark:text-zinc-200">{campo}</td>
                <td className="px-3.5 py-2.5 text-zinc-600 dark:text-zinc-400">{git}</td>
                <td className="px-3.5 py-2.5 text-zinc-600 dark:text-zinc-400">{github}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <GitVsGithub />

      {/* ══════════════════════════ CONFIGURACIÓN ══════════════════════════ */}
      <H2 id="configuracion">Configuración global: dile a Git quién eres</H2>
      <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
        Antes del primer commit hay que configurar Git en <b>ese</b> ordenador. Son dos cosas:{" "}
        <b>quién eres</b> (para que pueda firmar tus commits) y <b>cómo quieres que se comporte</b>{" "}
        (para que no te sorprenda). Se hace una vez y vale para todos tus repositorios.
      </p>

      <H3>Los tres niveles: system, global y local</H3>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        Git lee su configuración de tres sitios, del más general al más concreto, y{" "}
        <b>siempre gana el más cercano al repositorio</b>:
      </p>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
        <table className="w-full min-w-[620px] border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-100 dark:bg-white/10 text-left">
              <th className="w-[20%] px-3.5 py-2.5 font-bold">Nivel</th>
              <th className="w-[26%] px-3.5 py-2.5 font-bold">Fichero</th>
              <th className="px-3.5 py-2.5 font-bold">A quién afecta</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-zinc-200 dark:border-white/10 align-top">
              <td className="px-3.5 py-2.5 font-mono text-[13px] font-bold">--system</td>
              <td className="px-3.5 py-2.5 font-mono text-[13px] text-zinc-600 dark:text-zinc-400">/etc/gitconfig</td>
              <td className="px-3.5 py-2.5 text-zinc-600 dark:text-zinc-400">
                A todos los usuarios del ordenador. Casi nunca se toca.
              </td>
            </tr>
            <tr className="border-t border-zinc-200 dark:border-white/10 align-top">
              <td className="px-3.5 py-2.5 font-mono text-[13px] font-bold text-blue-700 dark:text-blue-300">
                --global
              </td>
              <td className="px-3.5 py-2.5 font-mono text-[13px] text-zinc-600 dark:text-zinc-400">~/.gitconfig</td>
              <td className="px-3.5 py-2.5 text-zinc-600 dark:text-zinc-400">
                <b>A ti, en ese ordenador, en todos tus repos.</b> Es el que vas a usar hoy.
              </td>
            </tr>
            <tr className="border-t border-zinc-200 dark:border-white/10 align-top">
              <td className="px-3.5 py-2.5 font-mono text-[13px] font-bold">(sin nada)</td>
              <td className="px-3.5 py-2.5 font-mono text-[13px] text-zinc-600 dark:text-zinc-400">.git/config</td>
              <td className="px-3.5 py-2.5 text-zinc-600 dark:text-zinc-400">
                Solo a ese repositorio. Gana sobre los otros dos.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Caja tipo="aviso">
        <b>Si el portátil es compartido</b> (el del aula, el de tu hermano) piénsalo dos veces antes
        de poner tu identidad en <code className="font-mono text-[13px]">--global</code>: se la
        quedas puesta al siguiente, y sus commits saldrán firmados con tu nombre. En un equipo que no
        es tuyo, configura la identidad <b>dentro de tu repo</b>, sin{" "}
        <code className="font-mono text-[13px]">--global</code>.
      </Caja>

      <H3>Los cinco comandos, uno a uno</H3>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        Cámbialos por tus datos y pégalos en la terminal, línea a línea. Las comillas son necesarias
        cuando el valor lleva espacios.
      </p>
      <PromptBlock
        text={`git config --global user.name "Ana García"
git config --global user.email "ana@ejemplo.com"
git config --global init.defaultBranch main
git config --global core.editor "nano -w"
git config --global pull.rebase false`}
      />
      <ul className="mt-3 space-y-3 text-[15px] text-zinc-700 dark:text-zinc-300">
        <li>
          <code className="font-mono text-[13px] font-bold">user.name</code> — tu nombre y apellido,
          con espacios y acentos si quieres. <b>No es tu usuario de GitHub</b>: es la firma que
          aparecerá en cada commit. Escríbelo como te gustaría que lo lea quien te esté planteando
          contratarte, porque es exactamente quien lo va a leer.
        </li>
        <li>
          <code className="font-mono text-[13px] font-bold">user.email</code> — tiene que ser{" "}
          <b>uno de los correos de tu cuenta de GitHub</b>, de los que aparecen verificados en
          Settings → Emails. Es lo que enlaza cada commit con tu perfil: si pones otro correo, los
          commits salen con un muñequito gris, no llevan a tu cuenta y no cuentan en tu cuadrito
          verde de contribuciones.
        </li>
        <li>
          <code className="font-mono text-[13px] font-bold">init.defaultBranch main</code> — que los
          repositorios nuevos nazcan con la rama llamada{" "}
          <code className="font-mono text-[13px]">main</code>. GitHub usa{" "}
          <code className="font-mono text-[13px]">main</code>; Git venía de fábrica con{" "}
          <code className="font-mono text-[13px]">master</code>. Esta línea te ahorra el error{" "}
          <code className="font-mono text-[13px]">src refspec main does not match any</code>.
        </li>
        <li>
          <code className="font-mono text-[13px] font-bold">core.editor</code> — cuando Git necesite
          que escribas un texto largo (el mensaje de una fusión, por ejemplo) abrirá un editor dentro
          de la terminal. Sin esta línea abre <b>vim</b>, y ahí es donde se queda encallada media
          clase. Con <code className="font-mono text-[13px]">nano</code> se sale con{" "}
          <kbd className="rounded border border-zinc-300 dark:border-white/20 px-1 text-[12px]">Ctrl</kbd>+
          <kbd className="rounded border border-zinc-300 dark:border-white/20 px-1 text-[12px]">O</kbd>,{" "}
          <kbd className="rounded border border-zinc-300 dark:border-white/20 px-1 text-[12px]">Enter</kbd>,{" "}
          <kbd className="rounded border border-zinc-300 dark:border-white/20 px-1 text-[12px]">Ctrl</kbd>+
          <kbd className="rounded border border-zinc-300 dark:border-white/20 px-1 text-[12px]">X</kbd>. Si
          prefieres VS Code: <code className="font-mono text-[13px]">&quot;code --wait&quot;</code>.
        </li>
        <li>
          <code className="font-mono text-[13px] font-bold">pull.rebase false</code> — le dices de
          antemano qué hacer cuando tu copia y la de GitHub han avanzado cada una por su lado:{" "}
          <code className="font-mono text-[13px]">false</code> significa «fúndelas». Sin esta línea,
          el día que pase, Git se planta y te suelta un aviso de{" "}
          <code className="font-mono text-[13px]">divergent branches</code> en vez de hacer nada.
        </li>
      </ul>

      <H3>El correo sin enseñar tu correo</H3>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        Cuidado con una cosa: el correo del commit <b>se publica</b> y queda visible para cualquiera
        que mire tu repositorio. Si no quieres que tu correo real acabe en manos de un robot de spam,
        GitHub te regala uno de mentira que sigue enlazando con tu perfil. En{" "}
        <b>Settings → Emails</b> marcas <i>Keep my email addresses private</i> y te dan una dirección
        con esta pinta, que es la que pones en{" "}
        <code className="font-mono text-[13px]">user.email</code>:
      </p>
      <PromptBlock text={`git config --global user.email "12345678+anagarcia@users.noreply.github.com"`} />

      <H3>Comprobar que ha quedado bien</H3>
      <PromptBlock
        text={`git config --global --list
git config --list --show-origin`}
      />
      <p className="mt-2 text-[15px] text-zinc-700 dark:text-zinc-300">
        El primero tiene que enseñar, como mínimo, tu{" "}
        <code className="font-mono text-[13px]">user.name</code> y tu{" "}
        <code className="font-mono text-[13px]">user.email</code>. El segundo dice además{" "}
        <b>de qué fichero sale cada línea</b>: es el comando con el que se descubre, en dos segundos,
        que el portátil traía puesta la configuración de otra persona. Y si estás dentro de un repo,{" "}
        <code className="font-mono text-[13px]">git config user.email</code> a secas te dice el que
        se está aplicando ahí de verdad, contando el local.
      </p>

      <Caja tipo="peligro">
        <b>Esto que acabas de configurar NO es tu contraseña.</b>{" "}
        <code className="font-mono text-[13px]">user.name</code> y{" "}
        <code className="font-mono text-[13px]">user.email</code> son etiquetas: Git no las comprueba
        con nadie y no dan acceso a nada. Poner ahí tu correo <b>no te conecta con GitHub</b> ni te
        deja subir nada. Que dos cosas te pidan un correo no significa que sean la misma cosa. El
        permiso para subir se pide aparte, y va en la sección siguiente.
      </Caja>

      {/* ══════════════════════════ AUTENTICACIÓN ══════════════════════════ */}
      <H2 id="autenticacion">Usuario y contraseña: qué escribir exactamente</H2>
      <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
        Aquí es donde se atasca media clase todos los años, así que vamos despacio. La clave es ver
        que Git te pide dos cosas distintas en dos momentos distintos: la <b>identidad</b>, al hacer
        commit, y las <b>credenciales</b>, al hacer push. No son lo mismo y no se escriben igual.
      </p>
      <IdentidadVsCredenciales />

      <H3>El momento exacto: qué sale en la terminal</H3>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        Cuando haces tu primer <code className="font-mono text-[13px]">git push</code> por HTTPS, la
        terminal se para y te enseña estas dos líneas:
      </p>
      <PromptBlock
        text={`Username for 'https://github.com':
Password for 'https://anagarcia@github.com':`}
      />
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-4">
          <p className="font-mono text-[13px] font-bold text-emerald-800 dark:text-emerald-300">Username</p>
          <p className="mt-1.5 text-[15px] text-emerald-900 dark:text-emerald-200">
            Tu <b>nombre de usuario de GitHub</b>. El que sale en la dirección de tu perfil: si tu
            perfil es <code className="font-mono text-[13px]">github.com/anagarcia</code>, escribes{" "}
            <code className="font-mono text-[13px]">anagarcia</code>.
          </p>
          <p className="mt-1.5 text-[14px] text-emerald-800 dark:text-emerald-300">
            No el correo. No tu nombre y apellido. No lo que pusiste en{" "}
            <code className="font-mono text-[12px]">user.name</code>.
          </p>
        </div>
        <div className="rounded-2xl border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 p-4">
          <p className="font-mono text-[13px] font-bold text-rose-800 dark:text-rose-300">Password</p>
          <p className="mt-1.5 text-[15px] text-rose-900 dark:text-rose-200">
            Un <b>token de acceso personal</b>: una tira larga de letras y números que empieza por{" "}
            <code className="font-mono text-[13px]">ghp_</code>. Lo generas tú en GitHub, en un
            minuto, y lo pegas aquí.
          </p>
          <p className="mt-1.5 text-[14px] text-rose-800 dark:text-rose-300">
            <b>NO la contraseña con la que entras en github.com.</b> GitHub dejó de aceptarla para
            Git el 13 de agosto de 2021: por muy bien escrita que esté, siempre va a fallar.
          </p>
        </div>
      </div>

      <H3>Cómo se saca el token, paso a paso</H3>
      <ol className="mt-2 space-y-2 text-[15px] text-zinc-700 dark:text-zinc-300">
        <li>
          <b>1 ·</b> Entra en github.com con tu cuenta.
        </li>
        <li>
          <b>2 ·</b> Pulsa tu foto, arriba a la derecha, y entra en <b>Settings</b>.
        </li>
        <li>
          <b>3 ·</b> En la columna de la izquierda, baja hasta el final: <b>Developer settings</b>.
        </li>
        <li>
          <b>4 ·</b> <b>Personal access tokens</b> → <b>Tokens (classic)</b> → botón{" "}
          <b>Generate new token (classic)</b>.
        </li>
        <li>
          <b>5 ·</b> En <b>Note</b>, un nombre para acordarte de para qué es:{" "}
          <code className="font-mono text-[13px]">portatil-aula</code>. En <b>Expiration</b>, 90 días
          (lo que dura esta parte del curso).
        </li>
        <li>
          <b>6 ·</b> En <b>Select scopes</b>, marca la casilla <b>repo</b>, la primera del todo: con
          eso puedes leer y escribir en tus repositorios. No marques nada más; un token da
          exactamente los permisos que le pongas, y de más no hace falta.
        </li>
        <li>
          <b>7 ·</b> Abajo del todo, <b>Generate token</b>.
        </li>
        <li>
          <b>8 ·</b> <b>Copia el token ahora</b>, con el botón de copiar. En cuanto salgas de esa
          página <b>no se vuelve a enseñar nunca</b>. Si lo pierdes no es un drama: se borra ese y se
          genera otro.
        </li>
      </ol>

      <Caja tipo="aviso">
        <b>Al pegarlo, la terminal no va a enseñar nada.</b> Ni puntos, ni asteriscos, ni el cursor
        moviéndose: parece que no ha entrado, y ha entrado. Es así a propósito, para que nadie lo lea
        por encima de tu hombro. Pega y pulsa{" "}
        <kbd className="rounded border border-amber-300 dark:border-amber-500/40 px-1 text-[12px]">Enter</kbd>{" "}
        a ciegas. Y ojo, que <kbd className="rounded border border-amber-300 dark:border-amber-500/40 px-1 text-[12px]">Ctrl</kbd>+
        <kbd className="rounded border border-amber-300 dark:border-amber-500/40 px-1 text-[12px]">V</kbd> no
        siempre pega en un terminal: en Linux suele ser{" "}
        <kbd className="rounded border border-amber-300 dark:border-amber-500/40 px-1 text-[12px]">Ctrl</kbd>+
        <kbd className="rounded border border-amber-300 dark:border-amber-500/40 px-1 text-[12px]">Shift</kbd>+
        <kbd className="rounded border border-amber-300 dark:border-amber-500/40 px-1 text-[12px]">V</kbd>, en
        el Git Bash de Windows es <b>clic derecho</b>, y en Mac{" "}
        <kbd className="rounded border border-amber-300 dark:border-amber-500/40 px-1 text-[12px]">Cmd</kbd>+
        <kbd className="rounded border border-amber-300 dark:border-amber-500/40 px-1 text-[12px]">V</kbd>.
        Tecleado a mano te vas a equivocar seguro: se pega, siempre.
      </Caja>

      <H3>Para no volver a escribirlo cada vez</H3>
      <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        Git puede recordar la credencial. El <i>credential helper</i> que toca depende de tu sistema:
      </p>
      <PromptBlock
        text={`# Windows (viene con Git for Windows)
git config --global credential.helper manager

# macOS (lo guarda en el Llavero)
git config --global credential.helper osxkeychain

# Linux: en tu portátil, lo recuerda para siempre...
git config --global credential.helper store
# ...y en uno compartido, mejor que lo olvide en una hora:
git config --global credential.helper 'cache --timeout=3600'`}
      />
      <ul className="mt-3 space-y-2 text-[15px] text-zinc-700 dark:text-zinc-300">
        <li>
          <b>Windows.</b> El Git Credential Manager ya viene instalado con Git. La primera vez abre
          una ventana del navegador para que inicies sesión en GitHub —ahí sí usas tu cuenta normal,
          con el doble factor— y él se fabrica el token solito. Si te sale esa ventana, no te has
          equivocado: es lo normal en Windows.
        </li>
        <li>
          <b>Linux con <code className="font-mono text-[13px]">store</code>.</b> Guarda el token{" "}
          <b>en texto plano</b> en <code className="font-mono text-[13px]">~/.git-credentials</code>.
          En tu portátil vale; en uno compartido, ni se te ocurra: el siguiente que lo use puede
          leerlo y subir cosas con tu nombre.
        </li>
      </ul>

      <Caja tipo="peligro">
        <b>El token es una contraseña, trátalo como tal.</b> No se sube al repositorio, no se pega en
        el grupo de la clase, no sale en una captura de pantalla. Si se te escapa: Settings →
        Developer settings → el token → <b>Delete</b>, y generas otro; con eso el viejo deja de
        funcionar al instante. GitHub además rastrea los repositorios públicos y revoca por su cuenta
        los tokens que encuentra dentro — si algún día te llega ese correo, ya sabes lo que ha pasado.
      </Caja>

      <details className={`my-5 ${tarjeta}`}>
        <summary className="cursor-pointer list-none text-[15px] font-bold [&::-webkit-details-marker]:hidden">
          🔒 Alternativa para quien acabe pronto: claves SSH (y no volver a escribir nada nunca)
        </summary>
        <div className="mt-3 text-[15px] text-zinc-700 dark:text-zinc-300">
          <p>
            En vez de usuario y token, tu ordenador y GitHub se reconocen por un par de claves. Se
            configura una vez y ya no pide nada más:
          </p>
          <PromptBlock
            text={`ssh-keygen -t ed25519 -C "ana@ejemplo.com"
cat ~/.ssh/id_ed25519.pub`}
          />
          <p className="mt-2">
            Copia la línea entera que sale del segundo comando y pégala en GitHub, en{" "}
            <b>Settings → SSH and GPG keys → New SSH key</b>. Compruébalo con{" "}
            <code className="font-mono text-[13px]">ssh -T git@github.com</code>: tiene que
            contestarte con un <i>Hi anagarcia!</i>. Después, cambia la dirección de tu repo a la
            versión SSH:
          </p>
          <PromptBlock text={`git remote set-url origin git@github.com:anagarcia/mi-web.git`} />
          <p className="mt-2">
            La clave <b>privada</b> es el fichero sin{" "}
            <code className="font-mono text-[13px]">.pub</code> y no sale de tu ordenador jamás; la
            que se sube es siempre la que acaba en{" "}
            <code className="font-mono text-[13px]">.pub</code>. Para saber por dónde estás hablando
            en cualquier momento: <code className="font-mono text-[13px]">git remote -v</code>. Si la
            dirección empieza por <code className="font-mono text-[13px]">https://</code> te pedirá
            usuario y token; si empieza por{" "}
            <code className="font-mono text-[13px]">git@github.com:</code> usará la clave.
          </p>
        </div>
      </details>

      {/* ══════════════════════════ ERRORES ══════════════════════════ */}
      <H2 id="errores">Los errores que vais a ver hoy (y qué significa cada uno)</H2>
      <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
        Los mensajes de Git dan miedo por la pinta, pero casi todos dicen exactamente lo que pasa.
        Aquí están los que más salen, con el texto tal cual aparece. Búscalo, ábrelo,
        arréglalo. Y cuando te salga uno que no esté aquí: cópialo entero y pregúntaselo a la IA del
        centro, que para eso está.
      </p>
      <Caja tipo="neutra">
        <b>Antes de nada, los tres comandos del diagnóstico:</b>{" "}
        <code className="font-mono text-[13px]">git status</code> (en qué zona está cada cambio),{" "}
        <code className="font-mono text-[13px]">git remote -v</code> (a qué repositorio estás
        hablando) y <code className="font-mono text-[13px]">git config --global --list</code> (con qué
        identidad). Nueve de cada diez veces, el fallo se ve en uno de los tres.
      </Caja>

      <H3>No me deja ni empezar (configuración)</H3>
      <div className="mt-3 space-y-2">
        <ErrorGit
          msg={`Author identity unknown — *** Please tell me who you are. fatal: unable to auto-detect email address`}
          causa="No has configurado user.name y user.email en este ordenador. Git se niega a firmar un commit sin saber de quién es."
          arreglo="Pones tu identidad global y repites el commit: el que falló no se ha perdido, tus cambios siguen preparados."
          cmd={`git config --global user.name "Ana García"
git config --global user.email "ana@ejemplo.com"`}
        />
        <ErrorGit
          msg={`fatal: not a git repository (or any of the parent directories): .git`}
          causa="Estás ejecutando Git en una carpeta que no es un repositorio: o te has equivocado de carpeta, o nunca llegaste a hacer git init."
          arreglo={
            <>
              Mira dónde estás y si hay un <code className="font-mono text-[13px]">.git</code> ahí
              dentro. Si es la carpeta buena y no lo hay, la conviertes en repositorio.
            </>
          }
          cmd={`pwd
ls -a
git init`}
        />
        <ErrorGit
          msg={`Se abre una pantalla llena de ~ y no hay forma de salir`}
          causa="No es un error: es vim, el editor que Git trae de fábrica, pidiéndote el mensaje de una fusión."
          arreglo={
            <>
              Pulsa <b>Esc</b>, escribe <code className="font-mono text-[13px]">:wq</code> y{" "}
              <b>Enter</b> (guardar y salir). Y para que no vuelva a pasarte, cambia el editor por
              nano.
            </>
          }
          cmd={`git config --global core.editor "nano -w"`}
        />
        <ErrorGit
          msg={`hint: You have divergent branches and need to specify how to reconcile them.`}
          causa="Tu copia y la de GitHub han avanzado cada una por su lado, y Git no quiere decidir por ti si fusionar o reescribir."
          arreglo="Le dices de una vez cómo quieres que lo resuelva y repites el pull."
          cmd={`git config --global pull.rebase false
git pull`}
        />
      </div>

      <H3>No me deja subir (autenticación)</H3>
      <div className="mt-3 space-y-2">
        <ErrorGit
          msg={`remote: Support for password authentication was removed on August 13, 2021. fatal: Authentication failed for 'https://github.com/anagarcia/mi-web.git/'`}
          causa="Has escrito la contraseña con la que entras en github.com. Para Git ya no vale, y no va a valer por mucho que la repitas."
          arreglo={
            <>
              Generas un token de acceso personal y lo pegas donde pide{" "}
              <code className="font-mono text-[13px]">Password</code>. Tienes los ocho pasos en{" "}
              <a href="#autenticacion" className="font-semibold underline decoration-dotted">
                la sección de arriba
              </a>
              .
            </>
          }
        />
        <ErrorGit
          msg={`remote: Invalid username or password. fatal: Authentication failed`}
          causa="O el usuario está mal escrito (es el de github.com/TUUSUARIO, no tu correo), o el token está mal pegado, o ha caducado."
          arreglo="Comprueba el usuario mirando la dirección de tu perfil, y si tienes la menor duda del token, genera uno nuevo: no cuesta nada."
        />
        <ErrorGit
          msg={`remote: Permission to anagarcia/mi-web.git denied to otroalumno. fatal: unable to access '...': The requested URL returned error: 403`}
          causa="El clásico del aula: el ordenador tiene guardadas las credenciales de quien lo usó antes que tú, así que está intentando subir con la cuenta de otra persona."
          arreglo={
            <>
              Hay que borrar la credencial guardada. En <b>Windows</b>, busca «Administrador de
              credenciales» → Credenciales de Windows → borra las entradas{" "}
              <code className="font-mono text-[13px]">git:https://github.com</code>. En <b>macOS</b>,
              Acceso a Llaveros → busca <code className="font-mono text-[13px]">github.com</code> →
              borrar. En <b>Linux</b>, quita la línea de github.com de{" "}
              <code className="font-mono text-[13px]">~/.git-credentials</code>. El siguiente push te
              volverá a pedir usuario y token: los tuyos.
            </>
          }
        />
        <ErrorGit
          msg={`remote: Repository not found. fatal: repository 'https://github.com/anagarcia/mi-web.git/' not found`}
          causa="O el nombre está mal escrito (Git distingue mayúsculas, minúsculas y guiones), o el repositorio es privado y estás autenticado como otra persona, o nunca llegaste a crearlo."
          arreglo={
            <>
              Mira a dónde estás apuntando y compáralo con la dirección que sale en el botón verde{" "}
              <b>Code</b> de tu repositorio en GitHub. Si no coincide, la corriges.
            </>
          }
          cmd={`git remote -v
git remote set-url origin https://github.com/anagarcia/mi-web.git`}
        />
        <ErrorGit
          msg={`git@github.com: Permission denied (publickey). fatal: Could not read from remote repository.`}
          causa="Estás usando SSH pero GitHub no reconoce tu clave: o no la has subido, o subiste la privada por error, o la subiste a otra cuenta."
          arreglo={
            <>
              Pruebas la conexión y, si no te saluda por tu nombre, subes el contenido del fichero
              que acaba en <code className="font-mono text-[13px]">.pub</code> a Settings → SSH and
              GPG keys.
            </>
          }
          cmd={`ssh -T git@github.com
cat ~/.ssh/id_ed25519.pub`}
        />
        <ErrorGit
          msg={`Pego el token en Password y no aparece nada en la pantalla`}
          causa="No es un error. Los terminales ocultan lo que escribes en una contraseña: ni puntos, ni asteriscos, ni cursor que avance."
          arreglo={
            <>
              Pega y pulsa <b>Enter</b> a ciegas. Si al pegar no pasa nada de nada, prueba{" "}
              <b>Ctrl+Shift+V</b> (Linux), <b>clic derecho</b> (Git Bash en Windows) o <b>Cmd+V</b>{" "}
              (Mac).
            </>
          }
        />
      </div>

      <H3>Sube, pero hay algo raro</H3>
      <div className="mt-3 space-y-2">
        <ErrorGit
          msg={`error: remote origin already exists.`}
          causa="Ya habías enlazado este repositorio con un remoto, seguramente equivocado, y Git no lo pisa sin permiso."
          arreglo="Miras a dónde apunta y le cambias la dirección en vez de añadir otro."
          cmd={`git remote -v
git remote set-url origin https://github.com/anagarcia/mi-web.git`}
        />
        <ErrorGit
          msg={`error: src refspec main does not match any — error: failed to push some refs`}
          causa="O todavía no has hecho ningún commit, y no hay nada que subir, o tu rama se llama master y estás intentando subir una rama main que no existe."
          arreglo="Miras si hay commits y cómo se llama tu rama; si hace falta, la renombras a main y vuelves a subir."
          cmd={`git log --oneline
git branch
git branch -M main
git push -u origin main`}
        />
        <ErrorGit
          msg={`! [rejected] main -> main (fetch first) — hint: Updates were rejected because the remote contains work that you do not have locally.`}
          causa="En GitHub hay un commit que tú no tienes: casi siempre, el README que creaste al hacer el repositorio marcando «Add a README»."
          arreglo={
            <>
              Te traes ese commit y colocas los tuyos encima. <b>Nunca</b>{" "}
              <code className="font-mono text-[13px]">--force</code> en un repositorio compartido:
              borrarías el trabajo de otro.
            </>
          }
          cmd={`git pull --rebase origin main
git push -u origin main`}
        />
        <ErrorGit
          msg={`Mis commits salen con un muñequito gris y no cuentan en mi perfil`}
          causa="El correo con el que firmas no es ninguno de los que tiene tu cuenta de GitHub, así que GitHub no sabe que esos commits son tuyos."
          arreglo={
            <>
              Mira tus correos en <b>Settings → Emails</b> (o activa el{" "}
              <code className="font-mono text-[13px]">noreply</code>) y corrige la configuración. Los
              commits viejos se quedan como están; los nuevos ya saldrán bien.
            </>
          }
          cmd={`git config --global user.email "12345678+anagarcia@users.noreply.github.com"`}
        />
        <ErrorGit
          msg={`Mis commits aparecen firmados por un compañero`}
          causa="Portátil compartido con la configuración global del anterior todavía puesta. Tus commits llevan su nombre y su correo."
          arreglo="Compruebas quién está firmando y pones tu identidad antes de seguir (en un equipo que no es tuyo, sin --global)."
          cmd={`git log --format="%an <%ae>" -5
git config user.name "Ana García"
git config user.email "ana@ejemplo.com"`}
        />
        <ErrorGit
          msg={`warning: LF will be replaced by CRLF in index.html`}
          causa="No es un error: es Windows avisando de que cambia los saltos de línea del fichero al guardarlo."
          arreglo="Nada. Puedes seguir tranquilamente."
        />
      </div>

      {/* ══════════════════════════ CONCEPTOS ══════════════════════════ */}
      <H2 id="conceptos">Los cinco conceptos (esto sí te lo explico yo)</H2>
      <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
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
      <Caja tipo="neutra">
        <b>Por qué esto importa fuera del aula:</b> cuando varias personas trabajan en el mismo
        repositorio —así funciona cualquier empresa de software—, nadie experimenta en la rama
        principal. Cada uno abre su rama, y lo bueno se fusiona. Hoy lo vas a practicar a escala
        individual: dos diseños tuyos conviviendo sin pisarse.
      </Caja>

      {/* ══════════════════════════ MISIONES ══════════════════════════ */}
      <H2 id="misiones">Las misiones de hoy</H2>

      <Mision
        n="1"
        titulo="Tu cuenta de GitHub"
        objetivo="Crea tu cuenta en github.com con un usuario profesional: es lo primero que verá cualquiera de ti después del currículum, así que ni motes ni números random. Completa el perfil: foto o avatar serio y una bio de una línea («Estudiante de 1º DAM, IES Simarro. Construyo X»). Apúntate bien tu nombre de usuario: es la mitad de lo que te va a pedir la terminal dentro de un rato."
        comprueba="Entras en github.com y ves tu perfil con nombre, avatar y bio. Ese enlace (github.com/tuusuario) es ya parte de tu marca personal."
        extra="¿Problemas de registro o verificación? Es la única misión donde puede ayudarte una persona del centro si el correo del instituto te lo pone difícil: dímelo."
      />

      <Mision
        n="2"
        titulo="Git en tu portátil: identidad y llave"
        objetivo={
          <>
            Comprueba que tienes Git con{" "}
            <code className="font-mono text-[13px]">git --version</code> (si no responde, instálalo:
            esto sí puedes preguntárselo a la IA). Después deja hechas las dos cosas de las secciones
            de arriba: la{" "}
            <a href="#configuracion" className="font-semibold underline decoration-dotted">
              configuración global
            </a>{" "}
            con tu nombre y el correo de tu cuenta de GitHub, y tu{" "}
            <a href="#autenticacion" className="font-semibold underline decoration-dotted">
              token de acceso personal
            </a>{" "}
            generado y copiado en sitio seguro. Esta es la misión donde los comandos vienen escritos:
            úsalos, pero léelos antes de pegarlos.
          </>
        }
        comprueba={
          <>
            <code className="font-mono text-[13px]">git config --global --list</code> enseña tu
            nombre y tu correo, y ese correo es uno de los que tienes en GitHub. Tienes el token
            guardado y sabes decir, sin mirar, en qué se diferencia de tu contraseña.
          </>
        }
        extra="Si el portátil no es tuyo, configura la identidad dentro de tu repo (sin --global) y usa el helper que olvida la credencial en una hora."
      />

      <Mision
        n="3"
        titulo="Tu primer repositorio, enlazado a tu web"
        objetivo="Crea un repositorio nuevo llamado mi-web, público. Después tienes que hacer algo más fino que «subir ficheros»: enlazar la carpeta que ya tienes en el portátil (tu web del viernes) para que ese repositorio local pertenezca a GitHub, y subirla. Ahí hay conceptos nuevos (git init, remote, push) — pregunta a la IA del centro cómo enlazar una carpeta local existente con un repo recién creado y hazlo con sus instrucciones tecleadas por ti."
        comprueba="Abres tu repo en el navegador y ves index.html, style.css y tu JS, no solo el README. Y en tu portátil, git status responde sin error: es un repo."
        extra="Consejo: crea el repositorio vacío, SIN marcar «Add a README». Te ahorras el rechazo del primer push que tienes explicado en los errores."
      />

      <Mision
        n="4"
        titulo="Commits honestos"
        objetivo="Haz hoy como mínimo tres commits con mensajes que expliquen el porqué («añadida sección de contacto», «hero: dos columnas y foto», «parche: menú móvil»). Pregunta a tu IA cómo preparar el commit (qué ficheros se añaden) y cómo escribir el mensaje. Nada de «actualizo», «cambios» o «asdfgh»."
        comprueba="Pestaña Commits de tu repo: tres entradas con mensajes que se entienden solos dentro de seis meses, cada una con su autor y su fecha. Y tu avatar al lado de cada una: si sale un muñeco gris, tienes mal el user.email."
        diagrama={<CadenaCommits />}
      />

      <Mision
        n="5"
        titulo="La máquina del tiempo"
        objetivo="Ahora vas a romper algo a propósito: cambia un color o borra un bloque de la web, déjalo feo. Después vuelve a la versión anterior usando el historial —pregunta a tu IA dos formas de hacerlo (la interfaz web y la terminal)— y usa la que te atrevas. Si el mensaje del commit es honesto, sabes exactamente a qué punto volver."
        comprueba="Tu web vuelve a verse como antes del destrozo, y sabes explicar qué comando o botón usaste y qué hizo."
        diagrama={<MaquinaDelTiempo />}
      />

      <Mision
        n="6"
        titulo="Dos ramas, dos diseños"
        objetivo="Crea dos ramas con dos diseños distintos de tu web: por ejemplo diseño-oscuro y diseño-minimal. En cada una cambia lo visual (colores, tipografía, disposición del hero) sin tocar la otra. Pregúntale a tu IA cómo crear una rama, cómo cambiarte de rama, y cómo guardar (commit) en la rama en la que estás. Cambiar de rama y refrescar la web es el momento «wow» de la sesión: la misma carpeta, dos webs distintas según el universo paralelo en el que te pongas."
        comprueba="git branch te lista al menos tres (main + tus dos diseños). Al cambiarte de rama, la web de tu navegador cambia de diseño sin que copies nada. Y en GitHub, el selector de ramas muestra las dos."
        diagrama={<RamasDosDisenos />}
      />

      <Mision
        n="7"
        titulo="Elige tu diseño y fusiónalo a main"
        objetivo="Mira los dos diseños con calma, enséñaselos a quien tengas al lado… y decide cuál gana. Fusiona la rama elegida a main (la fusión puede hacerse desde la terminal o desde la propia interfaz de GitHub — pregunta a tu IA y usa la que quieras). La otra rama se puede borrar: fue un experimento, y eso es exactamente para lo que sirven las ramas."
        comprueba="main muestra tu diseño ganador, y el historial de commits de main cuenta la historia: trabajo → dos experimentos → decisión."
        diagrama={<MergeDiagrama />}
      />

      <Mision
        n="8"
        titulo="Bonus: el repo de otro (ensayo del proyecto en grupo)"
        objetivo="Si terminas: entra en el repo de un compañero, crea una rama ahí, mejora un detalle pequeño (un texto, un color), y abre una Pull Request a su main explicando qué propones. Es el ensayo general del proyecto final en grupo: allí todo cambio pasará por una PR revisada."
        comprueba="Tu compañero tiene una PR abierta con tu nombre, la revisa, la aprueba y la fusiona (o te pide un cambio, aún mejor)."
        diagrama={<PullRequestDiagrama />}
      />

      <h2 className="mt-10 text-xl font-extrabold tracking-tight">Cómo preguntar bien a la IA del centro</h2>
      <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">
        La calidad de lo que te responda depende de cómo lo preguntes. La fórmula:{" "}
        <b>contexto + objetivo + restricción</b>. Una plantilla para arrancar:
      </p>
      <PromptBlock
        text={`Estoy en 1º DAM usando Git por primera vez. Tengo una carpeta en mi portátil con index.html, style.css y script.js, y un repositorio vacío recién creado en GitHub llamado mi-web.
Explícame paso a paso, comando a comando, qué debo escribir en la terminal para enlazar mi carpeta local con ese repositorio de GitHub y subir la web. Para cada comando, dime en una línea qué hace y qué veré si ha salido bien.`}
      />
      <ul className="mt-3 space-y-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        <li>
          <b>Pide siempre el «qué hace cada comando»</b>: si no lo sabes explicar, no lo teclees.
        </li>
        <li>
          <b>Si te responde algo que no entiendes</b>, no insistas con la misma pregunta: díselo
          literalmente («no entiendo el paso 2, explícamelo como si nunca hubiera usado la terminal»).
        </li>
        <li>
          <b>Si algo sale mal</b>, copia el mensaje de error exacto y pregúntale qué significa y qué
          hacer. Los errores de Git son mensajes legibles si preguntas: «conflict», «detached HEAD»,
          «non-fast-forward»… son los cinco conceptos hablando.
        </li>
        <li>
          <b>Ojo con una cosa:</b> los modelos tienen fecha de caducidad en lo suyo, y en Git y
          GitHub las pantallas cambian. Si la IA te dice que pongas tu contraseña de GitHub en el
          push, te está dando una respuesta de hace años: la buena es la de esta página.
        </li>
      </ul>

      <Caja tipo="aviso">
        <b>Trampas que os vais a encontrar hoy</b> (y que tenéis que saber leer):{" "}
        <span className="font-mono text-[13px]">working tree dirty</span> (tienes cambios sin
        commitear — Git no te deja cambiar de rama hasta que guardas o descartas),{" "}
        <span className="font-mono text-[13px]">conflicto de merge</span> (dos ramas tocaron lo
        mismo: Git pide un humano que decida),{" "}
        <span className="font-mono text-[13px]">3 commits behind/ahead</span> (tus dos copias de la
        historia se desincronizaron: pull o push). Detrás de cada uno hay uno de los cinco conceptos
        — si lo reconoces, ya sabes qué hacer.
      </Caja>

      <h2 className="mt-10 text-xl font-extrabold tracking-tight">Checklist de entrega (antes de salir)</h2>
      <div className="mt-3 space-y-2 text-[15px] text-zinc-700 dark:text-zinc-300">
        <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-3.5">
          ☐ Cuenta con perfil profesional · ☐{" "}
          <code className="font-mono text-[13px]">git config --global --list</code> con tu nombre y
          el correo de tu cuenta de GitHub · ☐ Token generado, guardado, y sabes por qué no es tu
          contraseña
        </div>
        <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-3.5">
          ☐ Repo <code>mi-web</code> con tu web dentro (no solo el README) · ☐ ≥ 3 commits con
          mensajes que explican el porqué, y con tu avatar al lado
        </div>
        <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-3.5">
          ☐ Has roto algo y has vuelto atrás con el historial · ☐ Dos ramas con dos diseños que
          cambian al moverte entre ellas · ☐ Tu diseño elegido fusionado en <code>main</code>
        </div>
        <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-3.5">
          ☐ Sabes explicar con tus palabras: qué es Git y qué es GitHub, repo, commit, push/pull,
          rama y merge — porque en la defensa del proyecto me basta con pedirte: «muéstrame tus
          commits y cuéntame la historia de tu web».
        </div>
      </div>

      <Caja tipo="bien">
        <b>Regla de oro del curso desde hoy:</b> si funciona, se sube —<i>push</i> sagrado. Tu GitHub
        es la copia de seguridad de todo el curso: acabarlo significa tener literalmente tu historia
        en commits. Y cuando mañana usemos agentes de código, el agente podrá escribir el comando; la
        decisión de <i>cuándo</i> se guarda y <i>por qué</i> seguirá siendo tuya.
      </Caja>

      <h2 className="mt-10 text-xl font-extrabold tracking-tight">Para la próxima sesión</h2>
      <ul className="mt-2 space-y-1 text-[15px] text-zinc-700 dark:text-zinc-300">
        <li>☐ Tu repo enlazado y con push: no necesitas traer nada más — tu trabajo ya vive en la nube</li>
        <li>☐ Tu token a mano (o el credential helper puesto): el día que no puedas subir, perderás media clase</li>
        <li>☐ Curiosidad por el siguiente paso: la misma dinámica de hoy, pero con un agente escribiendo los comandos contigo (y tú decidiendo todos los commits)</li>
      </ul>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 dark:border-white/10 pt-5">
        <Link href="/programacion-ia/sesion-01/" className="rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5">
          ← Sesión 1
        </Link>
        <Link href="/programacion-ia/web-personal/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:hover:bg-slate-600">
          Volver al proyecto →
        </Link>
      </div>
    </div>
  );
}
