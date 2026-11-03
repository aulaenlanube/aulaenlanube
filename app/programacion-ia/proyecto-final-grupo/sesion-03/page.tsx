import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { RUBRICA_STARTUP_ARRANQUE } from "@/lib/campus/rubricas";
import {
  Aviso,
  Bloque,
  C,
  Checklist,
  Chip,
  Codigo,
  CriterioRubrica,
  DosColumnas,
  LineaTiempo,
  Paso,
  Prompt,
  TONO,
  Tarjeta,
  Terminal,
  cls,
  type Hito,
} from "../../_video/piezas";
import { AccesoEntrega, KitArranque, RepartoPiezas, SistemaReservas, TableroSprint, UnaPiezaUnPR } from "./figuras";

export const metadata: Metadata = {
  title: "Startup · Sesión 3 · Kickoff: el repo que arranca la startup — Curso de Programación con IA",
  description:
    "Tercera sesión del proyecto en grupo (1º DAM presencial, 3 de noviembre de 2026, 3 horas): el kit de arranque de una startup de verdad —ficha v1, entrevistas, acuerdo de equipo, decisiones, arquitectura, AGENTS.md y tablero del sprint 1—, cada pieza con su rama y su PR, y la entrega en el campus.",
};

// Página para vídeo (docs/paginas-para-video.md): cada <Bloque>/<Paso> es una
// pantalla de 1100×620 como mucho. Las plantillas largas van enteras en sus
// constantes y se enseñan por trozos con `rango`; el botón copia siempre la
// plantilla entera.

/* ───────────── plantillas que copia el equipo ───────────── */

const ISSUE_KIT = `## Kit de arranque · entrega del 3 de noviembre
- [ ] README.md · ficha v1 con el modelo de ingresos (producto)
- [ ] docs/entrevistas/ · una entrevista por persona (todo el equipo)
- [ ] docs/equipo.md · el acuerdo de equipo (calidad)
- [ ] .github/pull_request_template.md (calidad)
- [ ] docs/recorrido.md · el primer cliente en 5 pasos (diseño)
- [ ] docs/decisiones.md · 001 la idea y 002 el stack (lead técnico)
- [ ] docs/arquitectura.md · sistema y datos (datos/IA)
- [ ] AGENTS.md · reglas para los agentes (lead técnico)
- [ ] Sprint 1: 3 issues con responsable y revisor (producto)
- [ ] main protegida, o la regla «todo por PR» (lead técnico)
- [ ] aulaenlanube con acceso, si el repo es privado
- [ ] Cada persona: su entrega en el campus`;

const EQUIPO_MD = `# Acuerdo de equipo — [nombre de la startup]
03/11/2026 · Lo aprobamos todos en el PR.

## Roles
- [Nombre] · producto: qué se hace y en qué orden; habla con clientes
- [Nombre] · lead técnico: arquitectura, stack y fusiones
- [Nombre] · calidad: revisiones; que nada llegue roto a main
- [Nombre] · datos/IA: modelo de datos, prompts y APIs
- [Nombre] · diseño/contenido: pantallas y textos

## Cómo trabajamos
- Avisos por [canal]; las decisiones, en issues: lo que no está escrito no se decidió.
- Al empezar cada clase, 5 minutos: qué hice, qué haré, qué me bloquea.
- Decide quien lleva el área, después de escuchar; si no hay acuerdo, se vota.
- Nadie sube a main: rama y PR, y nadie fusiona su propio PR.

## «Terminado» significa
- Cumple el criterio de aceptación de su issue.
- Lo ha probado otra persona del equipo, no solo quien lo hizo.
- No hay claves ni datos personales en el repo.
- El PR cuenta qué hizo el agente y qué decidimos nosotros.

## Si alguien no cumple
Primero se habla en el equipo; si se repite, en la retro del sprint;
si sigue, se habla con el profe, con las issues y los PR delante.`;

const PR_TEMPLATE = `## Qué cambia
Issue: #

## Cómo lo he probado

## Qué hizo el agente y qué decidí yo

## Para quien revisa
- [ ] Cumple el criterio de aceptación de la issue
- [ ] Lo he probado yo, no solo quien lo hizo
- [ ] Sin claves ni datos personales`;

const FICHA_V1 = `# [Nombre] — ficha v1
> [Qué es, en una frase, y para quién]. Estado: kickoff (3 nov 2026).

**Equipo:** [Nombre] (producto) · [Nombre] (lead técnico) · [Nombre] (calidad) · …

## El problema
[Persona concreta] pierde [tiempo / dinero / nervios] cuando [situación].
Comprobado con [N] entrevistas: docs/entrevistas/

## Para quién
Quién lo usa: … · Quién paga: … · El primer cliente: [dónde está].

## Cómo lo resuelve hoy
La alternativa actual y por qué no le basta.

## Nuestra solución
Una web/app que permite a [cliente] [hacer X] sin [el dolor].

## El MVP (3 funciones como máximo)
1. …
2. …
3. …
Lo que NO hacemos todavía: …

## Modelo de ingresos
- Quién paga, por qué y cuánto: …
- Coste al mes: servidor __ € + dominio __ € + IA/APIs __ € + otros __ € = __ €/mes
- Lo que deja cada cliente al mes, tras la comisión de Stripe: __ €
- Clientes para no perder dinero (coste ÷ lo que deja cada uno): __

## Qué ha cambiado desde la v0
Lo que nos dijeron en el pitch y en las entrevistas, y qué hemos cambiado por ello.

## El mayor riesgo
Lo que, si resulta falso, hunde la idea, y cómo lo comprobaremos antes del [fecha].

## Documentos
[Acuerdo](docs/equipo.md) · [Recorrido](docs/recorrido.md) · [Decisiones](docs/decisiones.md) · [Arquitectura](docs/arquitectura.md)`;

const ENTREVISTA_MD = `# Entrevista 01 · [a qué se dedica, sin apellidos]
Fecha: __/__/2026 · La hizo: [tu nombre] · ¿Es quien pagaría? sí / no

## Lo que contó (hechos, no opiniones)
- La última vez que le pasó: …
- Qué hizo y cuánto le costó, en tiempo o en dinero: …
- Qué ha probado para arreglarlo y por qué lo dejó: …

## Lo que nos sorprendió
- …

## Qué cambia en la ficha
- …`;

const RECORRIDO_MD = `# El recorrido del primer cliente (MVP)
Quién: [Marta, dueña de una peluquería en Xàtiva].
Qué quiere conseguir: [llenar la agenda sin pasarse la tarde en WhatsApp].

1. Entra desde [dónde] y ve [qué].
2. …
3. …
4. …
5. Termina cuando [ha conseguido qué], y se va con [qué].

Boceto de las pantallas: docs/img/boceto.jpg (una foto del papel vale).`;

const DECISIONES_MD = `# Decisiones del equipo
Una decisión por bloque, con fecha. No se borran: si cambiamos de idea, se añade otra que la sustituye.

## 001 · Por qué esta idea (19/10/2026)
- Contexto: las dos finalistas eran [A] y [B].
- Decisión: [A].
- Por qué: [lo que dijeron el pitch, la inversión y las entrevistas].
- Descartado: [B], porque [...].

## 002 · El stack (03/11/2026)
- Contexto: producto de tipo [juego / SaaS de servicio / voz], equipo de [N], servidor del curso.
- Decisión: [interfaz] + [servidor] + [base de datos].
- Por qué: es lo más aburrido que funciona; [quién del equipo ya lo conoce].
- Descartado: [alternativa], porque [...].
- Consecuencias: [lo que nos obliga a aprender o a pagar].`;

const ARQUITECTURA_MD = `# Arquitectura (v1)

## El sistema
\`\`\`mermaid
flowchart LR
  J[Jugador en el móvil] --> W[App web]
  D[Dueño del club] --> W
  W --> BD[(Base de datos)]
  W --> S[Stripe]
  W -.-> IA[IA del centro]
\`\`\`

## Los datos
\`\`\`mermaid
erDiagram
  CLUB ||--o{ PISTA : tiene
  PISTA ||--o{ RESERVA : recibe
  CLIENTE ||--o{ RESERVA : hace
\`\`\`
Lo que NO guardamos: [lo que no necesitamos, p. ej. el DNI].`;

const AGENTS_MD = `# AGENTS.md — [nombre de la startup]
Reglas para cualquier agente (OpenCode u otro) que trabaje en este repo.
Las acordamos entre todos y se cambian por PR, como el código.

## El producto
[La frase de la ficha]. Lee README.md y docs/ antes de proponer nada.

## Stack
[interfaz] · [servidor] · [base de datos].
Ninguna librería nueva sin preguntar: cada una, su decisión en docs/decisiones.md.

## Cómo se arranca y se prueba
- Arrancar: [orden]
- Pruebas: [orden]

## Convenciones
- Código y nombres en [inglés / español]; textos de la interfaz en español.
- Ramas tipo/descripcion: feat/reservar-pista, fix/..., docs/...
- Commits pequeños que dicen qué y por qué.

## Prohibido
- Tocar main o fusionar sin revisión.
- Claves en el código: van en .env (fuera de git) y el ejemplo en .env.example.
- Datos personales reales: los datos de prueba se inventan.
- Cambios grandes sin plan: primero propones, después programas.`;

const ISSUE_SPRINT = `Título: Reservar una pista
Como [jugador], quiero [reservar una pista libre desde el móvil]
para [no tener que llamar al club].

Criterio de aceptación
- Dado [que la pista 2 está libre a las 18:00],
  cuando [la reservo],
  entonces [aparece ocupada para los demás y me llega la confirmación].

Lleva: @… · Revisa: @… · Etiqueta: sprint-1 · Hito: Sprint 1`;

const COMENTARIO_ENTREGA = `Rol: lead técnico
Mi PR: https://github.com/vuestra-org/vuestro-repo/pull/3
He revisado: #4 (le pedí que quitara un teléfono real de los datos de prueba)`;

/* ───────────── prompts ───────────── */

const PROMPT_FICHA = `Actúa como un inversor que ya puso dinero en nuestra startup y quiere saber si
lo va a recuperar. Esta es nuestra ficha v1 y estas, las notas de las entrevistas:
[pega README.md] [pega docs/entrevistas/]
1. ¿Qué afirma la ficha que las entrevistas NO demuestran?
2. ¿Cuadran las cuentas del mantenimiento? Rehaz la división y dime si falta algún coste.
3. ¿Qué función del MVP quitarías y por qué?
No inventes datos: si algo no se puede saber con lo que te paso, dilo.`;

const PROMPT_ARQUITECTURA = `Lee docs/decisiones.md y el MVP de README.md.
Escribe docs/arquitectura.md con dos diagramas en Mermaid que GitHub sepa pintar:
1. flowchart LR con quién usa el producto, dónde corre y con qué servicios habla
   (máximo 7 cajas).
2. erDiagram con las entidades del MVP y sus relaciones (máximo 6 entidades).
Nada que no esté en el MVP. Debajo, una línea con los datos que NO guardamos.
Antes de escribir, enséñame las entidades y dime qué dudas tienes.`;

const PROMPT_AGENTS = `/init
Revisa el AGENTS.md que has generado con estas condiciones:
- Máximo 30 líneas: es para que lo lean agentes y personas.
- Añade la sección «Prohibido» con: tocar main, claves en el código,
  datos personales reales y librerías nuevas sin una decisión en docs/decisiones.md.
- Si todavía no hay código, deja [orden] donde irá cada orden. No te las inventes.`;

/* ───────────── datos de la página ───────────── */

const INDICE: [string, string][] = [
  ["hoy", "Lo que entregáis hoy"],
  ["agenda", "Las tres horas"],
  ["paso-1", "Paso 1 · Auditoría y reparto"],
  ["paso-2", "Paso 2 · Acuerdo de equipo"],
  ["paso-3", "Paso 3 · Una rama por pieza"],
  ["paso-4", "Paso 4 · La ficha v1"],
  ["paso-5", "Paso 5 · Las entrevistas"],
  ["paso-6", "Paso 6 · El recorrido"],
  ["paso-7", "Paso 7 · Las decisiones"],
  ["paso-8", "Paso 8 · La arquitectura"],
  ["paso-9", "Paso 9 · AGENTS.md"],
  ["paso-10", "Paso 10 · Revisar y fusionar"],
  ["paso-11", "Paso 11 · El sprint 1"],
  ["paso-12", "Paso 12 · Acceso y entrega"],
  ["readout", "Tres minutos por equipo"],
  ["rubrica", "Lo que se mira"],
];

const AGENDA: [string, string, string][] = [
  ["0:00", "Kickoff", "Qué es hoy, qué se entrega y el reparto de piezas"],
  ["0:10", "Auditoría y reparto", "Paso 1: qué tenéis ya, qué falta y quién lo lleva"],
  ["0:25", "El acuerdo de equipo", "Paso 2: todos juntos, una sola conversación"],
  ["0:45", "Cada pieza, su rama", "Pasos 3-9: en paralelo, cada persona con la suya"],
  ["1:40", "Descanso", "10 minutos"],
  ["1:50", "Revisión cruzada", "Paso 10: cada PR lo lee otra persona antes de fusionar"],
  ["2:10", "El tablero del sprint 1", "Paso 11: 3 issues con responsable y revisor"],
  ["2:30", "Readout", "3 minutos por equipo, con el repo proyectado"],
  ["2:50", "Acceso y entrega", "Paso 12: invitación al profe y entrega en el campus"],
];

const HITOS: Hito[] = [
  {
    titulo: "Día 0 y la caja",
    fecha: "19 y 20 oct",
    enlace: { texto: "Sesiones 1 y 2", href: "/programacion-ia/proyecto-final-grupo/sesion-01/" },
    puntos: ["Del problema a la ficha v0", "Pitch y ronda de inversión", "El presupuesto ficticio", "Arquitectura por tipo de producto"],
  },
  {
    titulo: "Kickoff",
    fecha: "Hoy · martes 3 nov",
    puntos: ["El kit de arranque en el repo", "Una pieza por persona, con su PR", "Entrega en el campus, hoy"],
  },
  {
    titulo: "Sprint 1",
    fecha: "Hasta el 17 nov",
    futuro: true,
    puntos: ["Las 3 tareas del tablero", "Cada PR, revisado", "Mini-demo de 3 minutos al cerrar"],
  },
  {
    titulo: "Sprints 2 y 3",
    fecha: "17 nov – 15 dic",
    futuro: true,
    puntos: ["Una parte que funcione de verdad", "Más entrevistas, ficha v2", "Mini-demo en cada cierre"],
  },
  {
    titulo: "Revisión fase 1",
    fecha: "Semana del 14 dic",
    futuro: true,
    puntos: ["Demo del equipo", "Defensa individual de tu parte"],
  },
];

export default function StartupSesion3() {
  const criterio = (id: string) => RUBRICA_STARTUP_ARRANQUE.criterios.find((c) => c.id === id)!;
  const rubrica = (id: string) => {
    const c = criterio(id);
    return (
      <CriterioRubrica
        nombre={c.nombre}
        peso={c.peso}
        que={c.qué}
        niveles={RUBRICA_STARTUP_ARRANQUE.niveles}
        descriptores={c.niveles}
      />
    );
  };
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      {/* Portada */}
      <section data-bloque className="max-w-[1100px]">
        <Breadcrumbs
          grande
          items={[
            { title: "Curso de Programación con IA", path: "/programacion-ia/" },
            { title: "Proyecto final en grupo", path: "/programacion-ia/proyecto-final-grupo/" },
            { title: "Sesión 3", path: "/programacion-ia/proyecto-final-grupo/sesion-03/" },
          ]}
        />
        <Chip>Startup en grupo · Sesión 3 · Martes 3 nov 2026</Chip>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Kickoff: el repo que arranca vuestra startup</h1>
        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          Cuando una startup de verdad arranca, lo primero no es programar: es una reunión de <b>kickoff</b> de la que
          todo el mundo sale sabiendo <b>qué se construye, para quién, quién lleva cada cosa y cómo se trabaja</b>. Y todo
          eso queda escrito en el repo, para que lo lea quien entra después: un compañero, un inversor o el agente de IA
          que va a programar con vosotros. Hoy hacéis vuestro kickoff y lo <b>entregáis hoy mismo</b>.
        </p>
        <div className={`mt-5 rounded-2xl border p-5 ${TONO.verde.caja}`}>
          <p className={`text-base font-bold uppercase tracking-wider ${TONO.verde.texto}`}>El hilo del proyecto en grupo</p>
          <p className="mt-1 text-xl font-bold text-emerald-950 dark:text-emerald-50">
            En junio, alguien de fuera usa vuestro producto y lo paga.
          </p>
          <p className="mt-2 text-lg text-emerald-950 dark:text-emerald-100">
            Hoy ponéis los cimientos: no un producto, sino las decisiones que lo hacen posible, escritas, revisadas y
            firmadas por todo el equipo. Primera versión: corta y verdadera, no larga y perfecta.
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Chip tono="gris">👥 Por equipos</Chip>
          <Chip tono="gris">⏱ 3 horas</Chip>
          <Chip tono="gris">🧰 El kit de arranque</Chip>
          <Chip tono="gris">🔀 Una pieza, un PR</Chip>
          <Chip tono="rosa">📤 Entrega: hoy, antes de las 23:59</Chip>
        </div>
      </section>

      <Bloque titulo="En esta página">
        <nav aria-label="En esta página">
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {INDICE.map(([id, t], i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="flex h-full items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-base font-semibold text-zinc-800 transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-900 dark:text-zinc-200 dark:hover:border-blue-500/50"
                >
                  <span aria-hidden className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-base font-extrabold ${TONO.azul.disco}`}>
                    {i + 1}
                  </span>
                  {t}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Bloque>

      {/* ───────────── HOY ───────────── */}
      <Bloque
        id="hoy"
        titulo="Lo que entregáis hoy: el kit de arranque"
        entradilla={
          <>
            Ocho ficheros cortos en el repo de la organización, el sprint 1 en GitHub y una entrega por persona en el
            campus. Es lo que quedó pendiente de las sesiones{" "}
            <Link href="/programacion-ia/proyecto-final-grupo/sesion-01/" className={cls.enlace}>
              1
            </Link>{" "}
            y{" "}
            <Link href="/programacion-ia/proyecto-final-grupo/sesion-02/" className={cls.enlace}>
              2
            </Link>
            , ordenado como lo haría un equipo profesional:
          </>
        }
      >
        <KitArranque />
      </Bloque>

      <Bloque titulo="Por qué empezar así" nivel={3} entradilla="Con agentes, programar es barato. Lo caro es que cinco personas y cinco agentes tiren cada uno hacia un lado.">
        <DosColumnas
          centro="o bien"
          a={{
            titulo: "Directos al código",
            antetitulo: "Lo que sale solo",
            tono: "rosa",
            puntos: [
              "Cada uno le pide al agente una cosa distinta: cinco estilos, un Frankenstein.",
              "Lo decidido vive en un chat de WhatsApp que nadie vuelve a leer.",
              "En febrero alguien pregunta «¿por qué usamos esto?» y nadie lo sabe.",
            ],
          }}
          b={{
            titulo: "Con kickoff",
            antetitulo: "Lo que hacen los equipos que acaban",
            tono: "verde",
            puntos: [
              "El README dice qué se construye: cualquiera lo explica en un minuto.",
              "AGENTS.md hace que todos los agentes sigan las mismas reglas.",
              "Cada decisión tiene fecha y motivo: cambiar de idea es barato.",
            ],
          }}
        />
      </Bloque>

      <Aviso titulo="¿Ya habéis empezado a programar?" tono="ambar">
        <p>
          Perfecto, no tiréis nada. Pasa en las startups reales: el código va por delante de las decisiones. Hoy las
          ponéis por escrito, y muchas veces descubriréis alguna que <b>no habíais tomado</b> aunque creyerais que sí.
        </p>
        <p>
          Si el código está en el repo personal de alguien, pasadlo hoy a la organización del equipo: en el repo,{" "}
          <b>Settings → General → Danger Zone → Transfer ownership</b>. Se conservan los commits, las issues y los PR.
        </p>
      </Aviso>

      <Aviso titulo="Corto y verdadero" tono="azul">
        <p>
          Cada documento cabe en una pantalla. Una casilla con «todavía no lo sabemos, lo comprobamos el día 10» vale
          más que un párrafo bonito inventado.
        </p>
        <p>
          La IA os ayuda a redactar y a encontrar huecos, pero <b>no inventa entrevistas ni números</b>. Lo que escriba el
          agente, lo leéis, lo corregís y lo firmáis con vuestro commit: a partir de ahí es vuestro.
        </p>
      </Aviso>

      <Bloque id="agenda" titulo="Las tres horas" entradilla="Primero, juntos; después, cada uno con su pieza; al final, revisión cruzada y entrega.">
        <ol className="space-y-1.5">
          {AGENDA.map(([h, t, d]) => (
            <li
              key={h}
              className={`grid grid-cols-[3.5rem_minmax(0,1fr)] items-baseline gap-x-4 !py-2 md:grid-cols-[3.5rem_14rem_minmax(0,1fr)] ${cls.tarjeta}`}
            >
              <span className="font-mono text-lg font-bold text-blue-700 dark:text-blue-300">{h}</span>
              <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{t}</span>
              <span className={`col-start-2 md:col-start-auto ${cls.texto}`}>{d}</span>
            </li>
          ))}
        </ol>
      </Bloque>

      {/* ───────────── JUNTOS ───────────── */}
      <Paso
        id="paso-1"
        n={1}
        titulo="Auditoría y reparto"
        entradilla={
          <>
            Proyectad el repo de la organización y repasad la lista: lo que ya está, se marca; lo que falta, se le pone
            dueño. Copiadla en una issue nueva, «Kit de arranque»: GitHub pinta las casillas y os dice cuánto os falta.
          </>
        }
        junto={<Codigo code={ISSUE_KIT} kind="md" etiqueta="Issue #1 · Kit de arranque" />}
        anchoJunto={700}
      >
        <p className={cls.texto}>
          ¿Aún no hay organización ni repo? Lo primero: en GitHub, <b>+ → New organization</b> (plan gratuito), un
          repositorio dentro y todo el equipo invitado. Lo hace el lead técnico mientras los demás leen el paso 2.
        </p>
      </Paso>

      <Bloque titulo="Quién tira de cada pieza" nivel={3} entradilla="Cada pieza tiene un dueño según su rol: la escribe, abre su PR y responde a la revisión.">
        <RepartoPiezas />
      </Bloque>

      <Paso
        id="paso-2"
        n={2}
        titulo="El acuerdo de equipo"
        entradilla={
          <>
            Veinte minutos, todo el equipo, una sola conversación: cómo vais a trabajar hasta junio. Escribe calidad en{" "}
            <C>docs/equipo.md</C>; decidís todos. Es la pieza que más se agradece en febrero, cuando hay un conflicto.
          </>
        }
        junto={<Codigo code={EQUIPO_MD} kind="md" etiqueta="docs/equipo.md" rango={[1, 15]} />}
      />

      <Bloque
        titulo="Lo que significa «terminado»"
        nivel={3}
        entradilla={
          <>
            La segunda mitad del acuerdo es la más importante. La <b>definición de terminado</b> es lo que se comprueba
            antes de fusionar, y el último apartado evita que un conflicto se pudra en silencio.
          </>
        }
        junto={<Codigo code={EQUIPO_MD} kind="md" etiqueta="docs/equipo.md" rango={[17, 25]} />}
      >
        <p className={cls.texto}>
          Calidad añade también <C>.github/pull_request_template.md</C>: GitHub lo pone solo en cada PR nuevo.
        </p>
        <div className="mt-4">
          <Codigo code={PR_TEMPLATE} kind="md" etiqueta=".github/pull_request_template.md" />
        </div>
      </Bloque>

      <Paso
        id="paso-3"
        n={3}
        titulo="Una pieza, una rama, un PR"
        entradilla={
          <>
            A partir de aquí cada persona trabaja en su pieza, en paralelo. Nadie escribe en <C>main</C>: cada pieza va
            en su rama, sube a GitHub y entra por un pull request que revisa otra persona. Así practicáis hoy, con
            documentos, el flujo que usaréis todo el curso con código.
          </>
        }
      >
        <UnaPiezaUnPR />
      </Paso>

      <Bloque
        titulo="Las órdenes de cada pieza"
        nivel={3}
        entradilla={
          <>
            Igual que en la <Link href="/programacion-ia/sesion-02/" className={cls.enlace}>sesión de Git</Link> del primer
            proyecto. Cada pieza, en su fichero: así dos ramas nunca tocan el mismo y no hay conflictos al fusionar.
          </>
        }
        junto={
          <Terminal
            titulo="Tu pieza, de la rama al PR"
            lineas={[
              { o: "git switch main" },
              { o: "git pull", c: "# main al día antes de empezar" },
              { o: "git switch -c docs/ficha-v1" },
              { s: "Switched to a new branch 'docs/ficha-v1'", tono: "ok" },
              { s: "  (escribes README.md, con el agente o a mano)" },
              { o: "git add README.md" },
              { o: 'git commit -m "docs: ficha v1 con el modelo de ingresos"' },
              { o: "git push -u origin docs/ficha-v1" },
            ]}
          />
        }
      >
        <p className={cls.texto}>
          En GitHub sale el botón <b>Compare &amp; pull request</b>: lo abrís, rellenáis la plantilla y en{" "}
          <b>Reviewers</b> elegís a quien os revisa. Las entrevistas van una por fichero precisamente por esto: cinco
          personas escribiendo a la vez y ningún conflicto.
        </p>
      </Bloque>

      {/* ───────────── LAS PIEZAS ───────────── */}
      <Paso
        id="paso-4"
        n={4}
        titulo="La ficha v1 (README)"
        entradilla={
          <>
            Producto parte de la ficha v0 de la sesión 1 y la pone al día con lo que dijeron el pitch y las
            entrevistas. Es la portada del repo: lo primero que lee cualquiera que llegue.
          </>
        }
        junto={<Codigo code={FICHA_V1} kind="md" etiqueta="README.md" rango={[1, 17]} />}
      />

      <Bloque
        titulo="La ficha v1: el MVP y el dinero"
        nivel={3}
        entradilla={
          <>
            Tres funciones como máximo, con lo que <b>no</b> hacéis todavía. Y el modelo de ingresos con números, que es{" "}
            <b>obligatorio</b> también si la idea es altruista: si las cuentas no salen, mejor saberlo hoy.
          </>
        }
        junto={<Codigo code={FICHA_V1} kind="md" etiqueta="README.md" rango={[19, 29]} />}
      />

      <Bloque
        titulo="La ficha v1: qué ha cambiado"
        nivel={3}
        entradilla={
          <>
            El apartado nuevo de la v1: lo que os dijeron el pitch y las entrevistas, y qué habéis cambiado por ello. Una
            ficha que no ha cambiado nada desde el 19 de octubre es sospechosa. Al final, el riesgo y el índice de docs.
          </>
        }
        junto={<Codigo code={FICHA_V1} kind="md" etiqueta="README.md" rango={[31, 38]} />}
      />

      <Bloque
        titulo="La IA, de inversor exigente"
        nivel={3}
        entradilla="Antes de abrir el PR, producto pasa la ficha por la IA del centro. No para que la apruebe: para que encuentre lo que no se sostiene."
      >
        <Prompt text={PROMPT_FICHA} etiqueta="Prompt · la IA audita la ficha" />
      </Bloque>

      <Paso
        id="paso-5"
        n={5}
        titulo="Las entrevistas"
        entradilla={
          <>
            Cada persona sube <b>la suya</b>, en su fichero: <C>docs/entrevistas/01-peluquera.md</C>,{" "}
            <C>02-dueno-gimnasio.md</C>… Sin apellidos ni teléfonos: a qué se dedica y nada más. Si ya teníais un{" "}
            <C>docs/entrevistas.md</C>, seguid con él.
          </>
        }
        junto={<Codigo code={ENTREVISTA_MD} kind="md" etiqueta="docs/entrevistas/01-….md" />}
      >
        <div className={`rounded-2xl border p-5 ${TONO.rosa.caja}`}>
          <p className={`text-lg font-bold ${TONO.rosa.tinta}`}>¿No la has hecho todavía?</p>
          <p className={`mt-1 text-lg ${TONO.rosa.tinta}`}>
            Escribe a quién se la vas a hacer y cuándo, y súbela así. Una entrevista inventada es peor que ninguna: os
            hace construir para alguien que no existe.
          </p>
        </div>
      </Paso>

      <Paso
        id="paso-6"
        n={6}
        titulo="El recorrido del primer cliente"
        entradilla={
          <>
            Diseño (o producto, si no hay diseño) cuenta en cinco pasos lo que hace vuestro primer cliente con el MVP,
            de principio a fin. Es lo que todo el equipo tiene que tener en la cabeza cuando programa.
          </>
        }
        junto={<Codigo code={RECORRIDO_MD} kind="md" etiqueta="docs/recorrido.md" />}
      >
        <p className={cls.texto}>
          Si un paso necesita una función que no está en las 3 del MVP, una de las dos cosas está mal: el recorrido o el
          MVP. Decidid cuál y apuntadlo.
        </p>
      </Paso>

      <Paso
        id="paso-7"
        n={7}
        titulo="Las decisiones (ADR)"
        entradilla={
          <>
            El lead técnico escribe las dos primeras decisiones del equipo: <b>por qué esta idea</b> y{" "}
            <b>por qué este stack</b>, con lo que descartasteis. Para el stack, el taller de la{" "}
            <Link href="/programacion-ia/proyecto-final-grupo/sesion-02/" className={cls.enlace}>
              sesión 2
            </Link>{" "}
            por tipo de producto: juego, SaaS de servicio o voz.
          </>
        }
        junto={<Codigo code={DECISIONES_MD} kind="md" etiqueta="docs/decisiones.md" />}
      >
        <p className={cls.texto}>
          La regla: <b>la arquitectura más aburrida que funcione</b>. Si nadie del equipo conoce una tecnología, la
          decisión tiene que decir quién la va a aprender y cuándo.
        </p>
      </Paso>

      <Paso
        id="paso-8"
        n={8}
        titulo="La arquitectura en un dibujo"
        entradilla="Datos/IA dibuja el sistema y sus datos. Así es el de una app de reservas de pádel:"
      >
        <SistemaReservas />
      </Paso>

      <Bloque
        titulo="El dibujo, en Mermaid"
        nivel={3}
        entradilla={
          <>
            No hace falta ninguna herramienta de dibujo: GitHub pinta solo los diagramas <b>Mermaid</b> que escribís en un{" "}
            <C>.md</C>. El de arriba y sus datos son estas pocas líneas. El agente las escribe bien; vosotros comprobáis
            que dibujan lo que habéis decidido.
          </>
        }
        junto={<Codigo code={ARQUITECTURA_MD} kind="md" etiqueta="docs/arquitectura.md" />}
      >
        <Prompt text={PROMPT_ARQUITECTURA} etiqueta="Prompt · al agente" />
      </Bloque>

      <Paso
        id="paso-9"
        n={9}
        titulo="AGENTS.md: reglas para los agentes"
        entradilla={
          <>
            Cinco personas son cinco agentes. Con un <C>AGENTS.md</C> común, todos leen las mismas reglas antes de tocar
            nada. Ya lo usasteis en la{" "}
            <Link href="/programacion-ia/cli/sesion-01/" className={cls.enlace}>
              CLI
            </Link>
            ; ahora es de equipo. Lo lleva el lead técnico.
          </>
        }
        junto={<Codigo code={AGENTS_MD} kind="md" etiqueta="AGENTS.md" rango={[1, 14]} />}
      />

      <Bloque
        titulo="Lo que ningún agente puede hacer"
        nivel={3}
        entradilla={
          <>
            Las convenciones y lo prohibido: lo que repetiríais a cada agente en cada conversación, escrito una vez. Con
            OpenCode, <C>/init</C> os prepara un borrador leyendo el repo; después lo recortáis.
          </>
        }
        junto={<Codigo code={AGENTS_MD} kind="md" etiqueta="AGENTS.md" rango={[16, 25]} />}
      >
        <Prompt text={PROMPT_AGENTS} etiqueta="Prompt · en OpenCode" />
      </Bloque>

      {/* ───────────── REVISAR Y PLANIFICAR ───────────── */}
      <Paso
        id="paso-10"
        n={10}
        titulo="Revisar y fusionar"
        entradilla="Después del descanso, cada PR lo lee otra persona. Revisar documentos es lo mismo que revisar código: se busca lo que no cuadra."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tarjeta titulo="Quien revisa" tono="azul">
            <Checklist
              items={[
                { texto: "Lee el fichero entero", detalle: "Y lo compara con la ficha: ¿dice lo mismo?" },
                { texto: "Deja un comentario útil", detalle: "Una pregunta o un hueco; «LGTM» no cuenta." },
                { texto: "Aprueba y fusiona", detalle: "Approve → Merge. Nunca fusiona su propio PR." },
              ]}
            />
          </Tarjeta>
          <Tarjeta titulo="Lo que más se escapa" tono="ambar">
            <Checklist
              items={[
                { texto: "Cuentas que no cuadran", detalle: "Coste ÷ lo que deja cada cliente: rehacedla." },
                { texto: "Un MVP con seis funciones", detalle: "Si el recorrido no las usa, sobran." },
                { texto: "Datos personales reales", detalle: "Un teléfono o un apellido no pueden ir al repo." },
              ]}
            />
          </Tarjeta>
        </div>
      </Paso>

      <Paso
        id="paso-11"
        n={11}
        titulo="El tablero del sprint 1"
        entradilla={
          <>
            Producto y calidad convierten el MVP en <b>3 issues verticales</b> (cada una, una función de principio a fin
            que se puede enseñar), con la etiqueta <C>sprint-1</C>, el hito «Sprint 1» y una persona que la lleva y otra
            que la revisa. Si en la sesión 2 ya las creasteis, revisadlas con esta plantilla.
          </>
        }
      >
        <TableroSprint />
      </Paso>

      <Bloque
        titulo="Una issue que se puede comprobar"
        nivel={3}
        entradilla={
          <>
            El criterio de aceptación en «dado… cuando… entonces…» es lo que convierte una tarea en algo que alguien puede
            revisar. Y si el repo es público, proteged <C>main</C>: <b>Settings → Branches → Add rule</b>, con «Require a
            pull request before merging».
          </>
        }
        junto={<Codigo code={ISSUE_SPRINT} kind="md" etiqueta="Issue · sprint-1" />}
      >
        <p className={cls.texto}>
          En un repo privado de una organización gratuita, GitHub puede no dejaros proteger <C>main</C>. Entonces la
          protección es la regla del acuerdo de equipo, y se nota en el historial: ningún commit directo a main.
        </p>
      </Bloque>

      {/* ───────────── ENTREGA ───────────── */}
      <Paso
        id="paso-12"
        n={12}
        titulo="Acceso y entrega en el campus"
        entradilla={
          <>
            El repo puede ser <b>público o privado</b>: lo decidís vosotros (es vuestro producto). Si es privado, en el
            repo: <b>Settings → Collaborators and teams → Add people</b>, la cuenta <C>aulaenlanube</C> con el rol{" "}
            <b>Read</b>.
          </>
        }
      >
        <AccesoEntrega />
      </Paso>

      <Bloque
        titulo="Lo que escribe cada persona"
        nivel={3}
        entradilla={
          <>
            Entrega <b>cada persona del equipo</b>, en su{" "}
            <Link href="/programacion-ia/aula/" className={cls.enlace}>
              aula del campus
            </Link>
            : el mismo enlace del repo para todos y, en el comentario, tres líneas tuyas. Se puede actualizar mientras la
            entrega esté abierta.
          </>
        }
        junto={<Codigo code={COMENTARIO_ENTREGA} kind="txt" etiqueta="Comentario de la entrega" />}
      >
        <p className={cls.texto}>
          La nota es individual dentro del grupo: tu PR y tu revisión son lo que demuestra tu parte.
        </p>
      </Bloque>

      {/* ───────────── CIERRE ───────────── */}
      <Bloque
        id="readout"
        titulo="Tres minutos por equipo"
        entradilla="El cierre de un kickoff: cada equipo proyecta su repo y lo cuenta. Sin diapositivas; el README es la diapositiva."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Tarjeta titulo="El producto" antetitulo="Minuto 1" tono="azul">
            Problema, cliente y cómo cobra, en tres frases.
          </Tarjeta>
          <Tarjeta titulo="La regla que os importa" antetitulo="Minuto 2" tono="verde">
            Una del acuerdo de equipo, y por qué la habéis puesto.
          </Tarjeta>
          <Tarjeta titulo="El sprint 1" antetitulo="Minuto 3" tono="morado">
            Las 3 issues y quién lleva cada una.
          </Tarjeta>
          <Tarjeta titulo="Una pregunta de la clase" antetitulo="Al final" tono="ambar">
            La que más dudas haya generado. Responde quien no ha hablado.
          </Tarjeta>
        </div>
      </Bloque>

      <Bloque
        id="rubrica"
        titulo="Lo que se mira: los mínimos"
        entradilla={
          <>
            Es una <b>entrega de proceso</b>: es apta si cumple los tres mínimos. La rúbrica dice cómo está cada pieza y
            es la base sobre la que se revisa la fase 1 en diciembre.
          </>
        }
      >
        <Checklist items={RUBRICA_STARTUP_ARRANQUE.minimos.map((m) => ({ texto: m.texto }))} />
      </Bloque>

      <Bloque titulo="La rúbrica: ficha y clientes" nivel={3}>
        <div className="space-y-8">
          {rubrica("ficha")}
          {rubrica("clientes")}
        </div>
      </Bloque>

      <Bloque titulo="La rúbrica: decisiones y equipo" nivel={3}>
        <div className="space-y-8">
          {rubrica("decisiones")}
          {rubrica("equipo")}
        </div>
      </Bloque>

      <Bloque
        titulo="La rúbrica: tu aportación"
        nivel={3}
        entradilla="Los cuatro criterios de arriba son del equipo; este es solo tuyo."
      >
        {rubrica("aportacion")}
      </Bloque>

      <Bloque titulo="Y después: hasta diciembre" entradilla="Las fechas de los sprints son una previsión: se ajustan, el orden no.">
        <LineaTiempo hitos={HITOS} />
      </Bloque>

      <div className="mt-16 flex max-w-[1100px] flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-5 dark:border-white/10">
        <Link
          href="/programacion-ia/proyecto-final-grupo/sesion-02/"
          className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-base font-semibold text-slate-700 transition hover:bg-zinc-50 dark:border-white/15 dark:bg-slate-900 dark:text-zinc-200 dark:hover:bg-white/5"
        >
          ← Sesión 2 · La caja
        </Link>
        <Link
          href="/programacion-ia/aula/"
          className="rounded-xl bg-blue-700 px-5 py-2.5 text-base font-semibold text-white transition hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          📤 Entregar en el campus →
        </Link>
        <Link
          href="/programacion-ia/proyecto-final-grupo/"
          className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-base font-semibold text-slate-700 transition hover:bg-zinc-50 dark:border-white/15 dark:bg-slate-900 dark:text-zinc-200 dark:hover:bg-white/5"
        >
          El proyecto en grupo →
        </Link>
      </div>
    </div>
  );
}
