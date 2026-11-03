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
  title: "Startup · Sesión 3 · Punto de seguimiento: las bases de vuestra startup — Curso de Programación con IA",
  description:
    "Tercera sesión del proyecto en grupo (1º DAM presencial, 3 de noviembre de 2026): punto de seguimiento con una entrega corta —ficha v1 con números, roles y reglas, idea y stack, entrevistas y las tres primeras issues del sprint 1— y el resto de la sesión para avanzar. Después, lo que se desarrolla durante el sprint 1.",
};

// Página para vídeo (docs/paginas-para-video.md): cada <Bloque>/<Paso> es una
// pantalla de 1100×620 como mucho. Las plantillas largas van enteras en sus
// constantes y se enseñan por trozos con `rango`; el botón copia siempre la
// plantilla entera. Hoy es un punto de seguimiento: los «Paso N» son solo lo que
// se entrega hoy; lo demás va después, en «A desarrollar a partir de ahora».

/* ───────────── plantillas de hoy ───────────── */

const FICHA_V1 = `# [Nombre] — ficha v1
> [Qué es, en una frase, y para quién]. Estado: 3 nov 2026, arrancando.

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
Lo que, si resulta falso, hunde la idea, y cómo lo comprobaremos antes del [fecha].`;

const EQUIPO_MD = `# Cómo trabajamos — [nombre de la startup]
03/11/2026

## Roles
- [Nombre] · producto: qué se hace y en qué orden; habla con clientes
- [Nombre] · lead técnico: arquitectura, stack y fusiones
- [Nombre] · calidad: revisiones; que nada llegue roto a main
- [Nombre] · datos/IA: modelo de datos, prompts y APIs
- [Nombre] · diseño/contenido: pantallas y textos

## Reglas
- Avisos por [canal]; las decisiones, en issues: lo que no está escrito no se decidió.
- Al empezar cada clase, 5 minutos: qué hice, qué haré, qué me bloquea.
- Nadie da por bueno su propio trabajo: lo revisa otra persona.
- Si alguien no cumple, primero se habla en el equipo; si sigue, con el profe.`;

const DECISIONES_MD = `# Decisiones del equipo
Una decisión por bloque, con fecha. No se borran: si cambiamos de idea, se añade otra.

## 001 · Por qué esta idea (19/10/2026)
- Decisión: [A]. Descartada: [B].
- Por qué: [lo que dijeron el pitch, la inversión y las entrevistas].

## 002 · El stack (03/11/2026)
- Producto de tipo [juego / SaaS de servicio / voz], equipo de [N].
- Decisión: [interfaz] + [servidor] + [base de datos].
- Por qué: es lo más aburrido que funciona; [quién del equipo ya lo conoce].
- Descartado: [alternativa], porque [...].
- Nos obliga a aprender: [qué], y lo aprende [quién].`;

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

const ISSUE_SPRINT = `Título: Reservar una pista
Como [jugador], quiero [reservar una pista libre desde el móvil]
para [no tener que llamar al club].

Criterio de aceptación
- Dado [que la pista 2 está libre a las 18:00],
  cuando [la reservo],
  entonces [aparece ocupada para los demás y me llega la confirmación].

Lleva: @… · Revisa: @… · Etiqueta: sprint-1`;

const COMENTARIO_ENTREGA = `Rol: lead técnico
Hoy he hecho: docs/decisiones.md (la idea y el stack)
Enlace: https://github.com/vuestra-org/vuestro-repo/commit/…`;

const PROMPT_FICHA = `Actúa como un inversor que ya puso dinero en nuestra startup y quiere saber si
lo va a recuperar. Esta es nuestra ficha v1 y estas, las notas de las entrevistas:
[pega README.md] [pega docs/entrevistas/]
1. ¿Qué afirma la ficha que las entrevistas NO demuestran?
2. ¿Cuadran las cuentas del mantenimiento? Rehaz la división y dime si falta algún coste.
3. ¿Qué función del MVP quitarías y por qué?
No inventes datos: si algo no se puede saber con lo que te paso, dilo.`;

/* ───────────── plantillas del sprint 1 ───────────── */

const PR_TEMPLATE = `## Qué cambia
Issue: #

## Cómo lo he probado

## Qué hizo el agente y qué decidí yo

## Para quien revisa
- [ ] Cumple el criterio de aceptación de la issue
- [ ] Lo he probado yo, no solo quien lo hizo
- [ ] Sin claves ni datos personales`;

const RECORRIDO_MD = `# El recorrido del primer cliente (MVP)
Quién: [Marta, dueña de una peluquería en Xàtiva].
Qué quiere conseguir: [llenar la agenda sin pasarse la tarde en WhatsApp].

1. Entra desde [dónde] y ve [qué].
2. …
3. …
4. …
5. Termina cuando [ha conseguido qué], y se va con [qué].

Boceto de las pantallas: docs/img/boceto.jpg (una foto del papel vale).`;

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
  ["sesion", "Cómo va la sesión"],
  ["paso-1", "Paso 1 · Repartid las piezas"],
  ["paso-2", "Paso 2 · La ficha v1"],
  ["paso-3", "Paso 3 · Roles y reglas"],
  ["paso-4", "Paso 4 · Idea y stack"],
  ["paso-5", "Paso 5 · Las entrevistas"],
  ["paso-6", "Paso 6 · Las 3 primeras issues"],
  ["paso-7", "Paso 7 · Acceso y entrega"],
  ["resto", "El resto de la sesión"],
  ["despues", "A partir de ahora"],
  ["rubrica", "Lo que se mira"],
];

const SESION: [string, string, string][] = [
  ["0:00", "Punto de seguimiento", "Qué se entrega hoy y qué queda para el sprint 1"],
  ["0:10", "La entrega", "Pasos 1-6: cada pieza, una persona; corto y verdadero"],
  ["0:55", "Acceso y entrega", "Paso 7: invitación al profe y entrega en el campus"],
  ["1:00", "A seguir avanzando", "El sprint 1 de vuestro producto; el profe pasa por cada equipo"],
];

const HITOS: Hito[] = [
  {
    titulo: "Día 0 y la caja",
    fecha: "19 y 20 oct",
    enlace: { texto: "Sesiones 1 y 2", href: "/programacion-ia/proyecto-final-grupo/sesion-01/" },
    puntos: ["Del problema a la ficha v0", "Pitch y ronda de inversión", "El presupuesto ficticio", "Arquitectura por tipo de producto"],
  },
  {
    titulo: "Seguimiento 1",
    fecha: "Hoy · martes 3 nov",
    puntos: ["Ficha v1, roles, idea y stack", "Las 3 primeras issues", "Entrega en el campus, hoy"],
  },
  {
    titulo: "Sprint 1",
    fecha: "Hasta el 17 nov",
    futuro: true,
    puntos: ["Las 3 issues, programadas", "El resto del kit, pieza a pieza", "Mini-demo de 3 minutos al cerrar"],
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
  const rubrica = (id: string) => {
    const c = RUBRICA_STARTUP_ARRANQUE.criterios.find((x) => x.id === id)!;
    return (
      <CriterioRubrica nombre={c.nombre} peso={c.peso} que={c.qué} niveles={RUBRICA_STARTUP_ARRANQUE.niveles} descriptores={c.niveles} />
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
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Punto de seguimiento: las bases de vuestra startup</h1>
        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          Hoy no es un día de entregar mucho: es un <b>punto de seguimiento</b>. Recogemos lo que estaba pendiente para
          el 26 de octubre en una versión corta, la que cualquier startup tiene escrita a las dos semanas de arrancar:
          <b> qué construís, cómo se paga, quién hace qué y por dónde empezáis</b>. Os lleva alrededor de una hora y os
          sirve para organizaros; el resto de la sesión, a seguir avanzando.
        </p>
        <div className={`mt-5 rounded-2xl border p-5 ${TONO.verde.caja}`}>
          <p className={`text-base font-bold uppercase tracking-wider ${TONO.verde.texto}`}>El hilo del proyecto en grupo</p>
          <p className="mt-1 text-xl font-bold text-emerald-950 dark:text-emerald-50">
            En junio, alguien de fuera usa vuestro producto y lo paga.
          </p>
          <p className="mt-2 text-lg text-emerald-950 dark:text-emerald-100">
            Hoy dejáis escritas las bases: primera versión, corta y verdadera. Lo demás lo iréis construyendo durante el
            sprint 1, pieza a pieza.
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Chip tono="gris">👥 Por equipos</Chip>
          <Chip tono="gris">⏱ Entrega: alrededor de una hora</Chip>
          <Chip tono="gris">🚀 El resto: a avanzar</Chip>
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
        titulo="Lo que entregáis hoy, y lo que viene después"
        entradilla={
          <>
            Cuatro ficheros cortos en el repo, las 3 primeras tareas en GitHub y una entrega por persona en el campus. Es
            lo esencial de lo que quedó pendiente de las sesiones{" "}
            <Link href="/programacion-ia/proyecto-final-grupo/sesion-01/" className={cls.enlace}>
              1
            </Link>{" "}
            y{" "}
            <Link href="/programacion-ia/proyecto-final-grupo/sesion-02/" className={cls.enlace}>
              2
            </Link>
            . Lo de la derecha no es para hoy: lo vais desarrollando durante el sprint 1.
          </>
        }
      >
        <KitArranque />
      </Bloque>

      <Bloque titulo="Por qué ahora" nivel={3} entradilla="Con agentes, programar es barato. Lo caro es que cinco personas y cinco agentes tiren cada uno hacia un lado.">
        <DosColumnas
          centro="o bien"
          a={{
            titulo: "Sin bases escritas",
            antetitulo: "Lo que sale solo",
            tono: "rosa",
            puntos: [
              "Cada uno le pide al agente una cosa distinta: cinco estilos, un Frankenstein.",
              "Lo decidido vive en un chat de WhatsApp que nadie vuelve a leer.",
              "En febrero alguien pregunta «¿por qué usamos esto?» y nadie lo sabe.",
            ],
          }}
          b={{
            titulo: "Con las bases en el repo",
            antetitulo: "Lo que hacen los equipos que acaban",
            tono: "verde",
            puntos: [
              "El README dice qué se construye: cualquiera lo explica en un minuto.",
              "Cada persona sabe qué lleva y quién se lo revisa.",
              "Cada decisión tiene fecha y motivo: cambiar de idea es barato.",
            ],
          }}
        />
      </Bloque>

      <Aviso titulo="¿Ya habéis empezado a programar?" tono="ambar">
        <p>
          Perfecto, no tiréis nada: seguid después de entregar. Las bases de hoy ponen por escrito lo que ya habéis
          decidido, y a veces descubren algo que no habíais decidido aunque creyerais que sí.
        </p>
        <p>
          Si el código está en el repo personal de alguien, pasadlo a la organización del equipo: en el repo,{" "}
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

      <Bloque id="sesion" titulo="Cómo va la sesión" entradilla="Una hora para la entrega y el resto para avanzar. Las horas son orientativas.">
        <ol className="space-y-1.5">
          {SESION.map(([h, t, d]) => (
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

      {/* ───────────── LA ENTREGA DE HOY ───────────── */}
      <Paso
        id="paso-1"
        n={1}
        titulo="Repartid las piezas"
        entradilla={
          <>
            Cinco minutos. Cada pieza, una persona según su rol, y así cada uno sube algo con su cuenta. ¿Aún no hay
            organización ni repo? Lo primero: en GitHub, <b>+ → New organization</b> (plan gratuito), un repositorio dentro
            y todo el equipo invitado.
          </>
        }
      >
        <RepartoPiezas />
      </Paso>

      <Paso
        id="paso-2"
        n={2}
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
            ficha que no ha cambiado nada desde el 19 de octubre es sospechosa. Al final, el mayor riesgo.
          </>
        }
        junto={<Codigo code={FICHA_V1} kind="md" etiqueta="README.md" rango={[31, 35]} />}
      >
        <p className={cls.texto}>Si os sobran cinco minutos, pasadla por la IA del centro haciendo de inversor exigente:</p>
        <div className="mt-4">
          <Prompt text={PROMPT_FICHA} etiqueta="Prompt · la IA audita la ficha" />
        </div>
      </Bloque>

      <Paso
        id="paso-3"
        n={3}
        titulo="Roles y reglas"
        entradilla={
          <>
            Diez minutos, todo el equipo, una sola conversación: quién hace qué y cuatro reglas para trabajar juntos hasta
            junio. Lo escribe calidad en <C>docs/equipo.md</C>; lo decidís todos.
          </>
        }
        junto={<Codigo code={EQUIPO_MD} kind="md" etiqueta="docs/equipo.md" />}
      />

      <Paso
        id="paso-4"
        n={4}
        titulo="Idea y stack"
        entradilla={
          <>
            El lead técnico deja escritas las dos primeras decisiones: <b>por qué esta idea</b> y <b>con qué la vais a
            construir</b>. Para el stack, el taller de la{" "}
            <Link href="/programacion-ia/proyecto-final-grupo/sesion-02/" className={cls.enlace}>
              sesión 2
            </Link>{" "}
            por tipo de producto. La regla: lo más aburrido que funcione.
          </>
        }
        junto={<Codigo code={DECISIONES_MD} kind="md" etiqueta="docs/decisiones.md" />}
      />

      <Paso
        id="paso-5"
        n={5}
        titulo="Las entrevistas que tengáis"
        entradilla={
          <>
            Cada persona sube <b>la suya</b>, en su fichero: <C>docs/entrevistas/01-peluquera.md</C>,{" "}
            <C>02-dueno-gimnasio.md</C>… Así nadie pisa a nadie. Sin apellidos ni teléfonos: a qué se dedica y nada más.
            Si ya teníais un <C>docs/entrevistas.md</C>, seguid con él.
          </>
        }
        junto={<Codigo code={ENTREVISTA_MD} kind="md" etiqueta="docs/entrevistas/01-….md" />}
      >
        <div className={`rounded-2xl border p-5 ${TONO.rosa.caja}`}>
          <p className={`text-lg font-bold ${TONO.rosa.tinta}`}>¿No la has hecho todavía?</p>
          <p className={`mt-1 text-lg ${TONO.rosa.tinta}`}>
            Hoy sube lo que tengas; las cinco, durante el sprint 1. Una entrevista inventada es peor que ninguna: os hace
            construir para alguien que no existe.
          </p>
        </div>
      </Paso>

      <Paso
        id="paso-6"
        n={6}
        titulo="Las 3 primeras issues"
        entradilla={
          <>
            Por dónde empezáis a construir: el MVP partido en <b>3 issues</b> en GitHub, cada una una función de principio a
            fin que se pueda enseñar, con la etiqueta <C>sprint-1</C> y una persona que la lleva. Si en la sesión 2 ya las
            creasteis, revisadlas.
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
            Hoy basta con el título y quien la lleva. Si os da tiempo, añadid quién la revisa y el criterio de aceptación en
            «dado… cuando… entonces…»: es lo que convierte una tarea en algo que otra persona puede comprobar.
          </>
        }
        junto={<Codigo code={ISSUE_SPRINT} kind="md" etiqueta="Issue · sprint-1" />}
      />

      <Paso
        id="paso-7"
        n={7}
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
        <p className={cls.texto}>La nota es individual dentro del grupo: tu parte, subida con tu cuenta, es lo que la demuestra.</p>
      </Bloque>

      {/* ───────────── EL RESTO DE LA SESIÓN ───────────── */}
      <Bloque
        id="resto"
        titulo="El resto de la sesión: a avanzar"
        entradilla="Entregado lo de hoy, el tiempo es vuestro y de vuestro producto."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="Seguimiento con el profe" antetitulo="Cinco minutos por equipo" tono="ambar">
            El profe pasa por cada mesa con vuestro README abierto: qué habéis decidido, qué os bloquea y qué vais a enseñar
            al cerrar el sprint 1.
          </Tarjeta>
          <Tarjeta titulo="Arrancad el sprint 1" antetitulo="Lo principal" tono="azul">
            Cada uno coge su issue y empieza a construirla con su agente, en su propia rama.
          </Tarjeta>
          <Tarjeta titulo="Adelantad una pieza" antetitulo="Si queréis" tono="verde">
            Cualquiera de las de «a partir de ahora»: el recorrido, la arquitectura o el AGENTS.md.
          </Tarjeta>
        </div>
      </Bloque>

      {/* ───────────── A PARTIR DE AHORA ───────────── */}
      <Bloque
        id="despues"
        titulo="A desarrollar a partir de ahora"
        entradilla={
          <>
            No es para hoy. Es lo que completa las bases de un equipo profesional y lo vais haciendo durante el sprint 1,
            hasta el 17 de noviembre, a la vez que programáis. Abajo tenéis cada pieza con su plantilla.
          </>
        }
      >
        <Checklist
          items={[
            { texto: "Las cinco entrevistas", detalle: "Dos, al menos, a quien pagaría: cuánto le cuesta hoy el problema." },
            { texto: "Todo por rama y PR", detalle: "Con la plantilla de PR y otra persona que revisa y fusiona." },
            { texto: "El recorrido del primer cliente", detalle: "Lo que hace con el MVP, en cinco pasos." },
            { texto: "La arquitectura en un dibujo", detalle: "El sistema y sus datos, en Mermaid." },
            { texto: "AGENTS.md común", detalle: "Las mismas reglas para todos los agentes del equipo." },
            { texto: "main protegida", detalle: "Nadie sube a main sin un PR revisado." },
          ]}
        />
      </Bloque>

      <Bloque
        titulo="Una pieza, una rama, un PR"
        entradilla={
          <>
            La forma de trabajar desde ahora: nadie escribe en <C>main</C>. Cada pieza, de código o de documentación, va en su
            rama, sube a GitHub y entra por un pull request que revisa otra persona.
          </>
        }
      >
        <UnaPiezaUnPR />
      </Bloque>

      <Bloque
        titulo="Las órdenes de cada pieza"
        nivel={3}
        entradilla={
          <>
            Igual que en la <Link href="/programacion-ia/sesion-02/" className={cls.enlace}>sesión de Git</Link> del primer
            proyecto. En GitHub sale el botón <b>Compare &amp; pull request</b>: lo abrís y en <b>Reviewers</b> elegís a quien os
            revisa.
          </>
        }
        junto={
          <Terminal
            titulo="Tu pieza, de la rama al PR"
            lineas={[
              { o: "git switch main" },
              { o: "git pull", c: "# main al día antes de empezar" },
              { o: "git switch -c docs/recorrido" },
              { s: "Switched to a new branch 'docs/recorrido'", tono: "ok" },
              { s: "  (escribes docs/recorrido.md, con el agente o a mano)" },
              { o: "git add docs/recorrido.md" },
              { o: 'git commit -m "docs: recorrido del primer cliente"' },
              { o: "git push -u origin docs/recorrido" },
            ]}
          />
        }
      />

      <Bloque
        titulo="La plantilla de PR y main protegida"
        nivel={3}
        entradilla={
          <>
            Calidad añade <C>.github/pull_request_template.md</C>: GitHub la pone sola en cada PR nuevo. Si el repo es
            público, proteged <C>main</C> en <b>Settings → Branches → Add rule</b>, con «Require a pull request before
            merging».
          </>
        }
        junto={<Codigo code={PR_TEMPLATE} kind="md" etiqueta=".github/pull_request_template.md" />}
      >
        <p className={cls.texto}>
          En un repo privado de una organización gratuita, GitHub puede no dejaros proteger <C>main</C>. Entonces la
          protección es una regla del equipo, y se nota en el historial: ningún commit directo a main.
        </p>
      </Bloque>

      <Bloque
        titulo="El recorrido del primer cliente"
        entradilla={
          <>
            Diseño (o producto) cuenta en cinco pasos lo que hace vuestro primer cliente con el MVP, de principio a fin. Si
            un paso necesita una función que no está en las 3 del MVP, una de las dos cosas está mal: decidid cuál.
          </>
        }
        junto={<Codigo code={RECORRIDO_MD} kind="md" etiqueta="docs/recorrido.md" />}
      />

      <Bloque titulo="La arquitectura en un dibujo" entradilla="Datos/IA dibuja el sistema y sus datos. Así es el de una app de reservas de pádel:">
        <SistemaReservas />
      </Bloque>

      <Bloque
        titulo="El dibujo, en Mermaid"
        nivel={3}
        entradilla={
          <>
            No hace falta ninguna herramienta de dibujo: GitHub pinta solo los diagramas <b>Mermaid</b> que escribís en un{" "}
            <C>.md</C>. El agente las escribe bien; vosotros comprobáis que dibujan lo que habéis decidido.
          </>
        }
        junto={<Codigo code={ARQUITECTURA_MD} kind="md" etiqueta="docs/arquitectura.md" />}
      >
        <Prompt text={PROMPT_ARQUITECTURA} etiqueta="Prompt · al agente" />
      </Bloque>

      <Bloque
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

      {/* ───────────── LO QUE SE MIRA ───────────── */}
      <Bloque
        id="rubrica"
        titulo="Lo que se mira hoy: los mínimos"
        entradilla={
          <>
            Es una <b>entrega de proceso</b>: es apta si cumple los tres mínimos. La rúbrica solo mira lo que se pide hoy y
            dice cómo están las bases; lo de «a partir de ahora» se verá en la revisión de la fase 1.
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

      <Bloque titulo="La rúbrica: tu aportación" nivel={3} entradilla="Los cuatro criterios de arriba son del equipo; este es solo tuyo.">
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
