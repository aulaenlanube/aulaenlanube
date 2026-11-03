"use client";

// Panel del alumno: su curso (proyectos → sesiones → entregas), el detalle de
// cada entrega con el formulario para entregar, sus notas y su cuenta.

import { useCallback, useEffect, useState } from "react";
import Link from "@/components/Link";
import { CURSOS, PROYECTOS, type ProyectoCatalogo } from "@/lib/campus/catalogo";
import { api, fechaCorta, haceCuanto, plazoVencido, urlPages, type EntregaAlumno, type Envio, type EquipoEntrega, type EquipoParaElegir, type Grupo, type UsuarioSesion } from "@/lib/campus/cliente";
import { formatoNota, RUBRICAS } from "@/lib/campus/rubricas";
import DobleCorreccion from "./DobleCorreccion";
import InfoRepo from "./InfoRepo";
import EquiposAlumno from "./EquiposAlumno";
import InversionAlumno from "./InversionAlumno";
import RubricaVista, { NotaGrande } from "./Rubrica";
import { Aviso, CabeceraPanel, CajaError, CambiarPassword, Cargando, cerrarSesion, cls, mensajeError, Pildora, useHashRuta, useSesion } from "./ui";

type Panel = { usuario: UsuarioSesion; grupo: Grupo | null; entregas: EntregaAlumno[] };

export default function PanelAlumno() {
  const sesion = useSesion("alumno");
  const [ruta, ir] = useHashRuta();
  const [panel, setPanel] = useState<Panel | null>(null);
  const [error, setError] = useState("");
  const [vuelta, setVuelta] = useState(0);
  const cargar = useCallback(() => {
    setError("");
    setVuelta((v) => v + 1);
  }, []);

  useEffect(() => {
    if (sesion.estado !== "ok") return;
    let vivo = true;
    api<Panel>("alumno.panel")
      .then((p) => vivo && setPanel(p))
      .catch((e) => vivo && setError(mensajeError(e)));
    return () => {
      vivo = false;
    };
  }, [sesion.estado, vuelta]);

  if (sesion.estado === "error") return <Marco><CajaError error={sesion.error} reintentar={sesion.recargar} /></Marco>;
  if (sesion.estado === "cargando" || (!panel && !error)) return <Marco><Cargando /></Marco>;
  if (!panel) return <Marco><CajaError error={error} reintentar={cargar} /></Marco>;

  const { usuario, grupo, entregas } = panel;
  const curso = grupo ? CURSOS[grupo.curso] : null;
  const vista = ruta[0] || "curso";

  const actualizarEnvio = (envio: Envio, equipo?: EquipoEntrega) =>
    setPanel(
      (p) =>
        p && {
          ...p,
          entregas: p.entregas.map((e) => (e.id === envio.entrega_id ? { ...e, envio, ...(equipo ? { equipo } : {}) } : e)),
        },
    );

  return (
    <Marco>
      <CabeceraPanel
        chip={curso ? `${curso.corto} · ${grupo!.nombre}` : "Campus · alumnado"}
        titulo={<>Hola, {usuario.nombre}</>}
        acciones={
          <>
            <a href="#/cuenta" className={cls.btn2}>Mi cuenta</a>
            <button type="button" onClick={cerrarSesion} className={cls.btn2}>Salir</button>
          </>
        }
      >
        <p className={`mt-2 ${cls.suave}`}>
          {curso ? curso.nombre : "Curso de Programación con IA"} · usuario <code className="font-mono text-sm">{usuario.usuario}</code>
        </p>
      </CabeceraPanel>

      <nav className="mt-6 flex gap-1 border-b border-zinc-200 dark:border-white/10" aria-label="Secciones del panel">
        {[
          ["curso", "Mi curso"],
          ["equipos", "Mi equipo"],
          ...(grupo?.curso === "presencial" ? [["inversion", "Inversión"]] : []),
          ["notas", "Mis notas"],
          ["cuenta", "Cuenta"],
        ].map(([id, t]) => {
          const activa = vista === id || (id === "curso" && vista === "entrega");
          return (
            <a
              key={id}
              href={`#/${id === "curso" ? "" : id}`}
              aria-current={activa ? "page" : undefined}
              className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition ${activa ? "border-blue-700 text-blue-700 dark:border-blue-400 dark:text-blue-300" : "border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
            >
              {t}
            </a>
          );
        })}
      </nav>

      <div className="mt-6">
        {!grupo ? (
          <Aviso tono="ambar">Todavía no estás en ningún grupo del curso. Díselo al profesor para que te asigne.</Aviso>
        ) : vista === "entrega" ? (
          <VistaEntrega
            // Al entrar en un equipo cambia el equipo de la entrega: el formulario vuelve a partir de lo del equipo.
            key={`${ruta[1]}-${entregas.find((e) => String(e.id) === ruta[1])?.equipo?.nombre ?? ""}`}
            entrega={entregas.find((e) => String(e.id) === ruta[1])}
            onEnvio={actualizarEnvio}
            recargar={cargar}
            volver={() => ir("")}
          />
        ) : vista === "equipos" ? (
          <EquiposAlumno />
        ) : vista === "inversion" ? (
          <InversionAlumno />
        ) : vista === "notas" ? (
          <VistaNotas entregas={entregas} />
        ) : vista === "cuenta" ? (
          <VistaCuenta usuario={usuario} grupo={grupo} />
        ) : (
          <VistaCurso proyectos={curso!.proyectos.map((id) => PROYECTOS[id]).filter(Boolean)} entregas={entregas} />
        )}
      </div>
    </Marco>
  );
}

function Marco({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 py-6">{children}</div>;
}

// ── Estado de una entrega ─────────────────────────────────────────────────────

function EstadoEntrega({ e }: { e: EntregaAlumno }) {
  if (e.nota) {
    return e.nota.no_evaluable ? <Pildora tono="rojo">Corregida · NE</Pildora> : <Pildora tono="verde">Corregida · {formatoNota(e.nota.nota)}</Pildora>;
  }
  if (e.envio) return <Pildora tono="azul">Entregada</Pildora>;
  if (!e.abierta) return <Pildora tono="gris">Cerrada</Pildora>;
  if (plazoVencido(e.fecha_limite)) return <Pildora tono="rojo">Fuera de plazo</Pildora>;
  return <Pildora tono="ambar">Pendiente</Pildora>;
}

function FilaEntrega({ e }: { e: EntregaAlumno }) {
  return (
    <a
      href={`#/entrega/${e.id}`}
      className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 transition hover:border-blue-300 hover:bg-blue-50/60 dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10 sm:flex-row sm:items-center"
    >
      <span aria-hidden className="text-lg">📤</span>
      <span className="flex-1">
        <span className="block text-[15px] font-bold">{e.titulo}</span>
        <span className={`block text-xs ${cls.tenue}`}>
          {e.fecha_limite ? `Fecha límite: ${fechaCorta(e.fecha_limite)}` : "Sin fecha límite"}
          {e.envio && ` · entregada ${haceCuanto(e.envio.updated_at)}`}
        </span>
      </span>
      <span className="self-start sm:self-auto">
        <EstadoEntrega e={e} />
      </span>
    </a>
  );
}

// ── Vistas ────────────────────────────────────────────────────────────────────

function VistaCurso({ proyectos, entregas }: { proyectos: ProyectoCatalogo[]; entregas: EntregaAlumno[] }) {
  const pendientes = entregas.filter((e) => e.abierta && !e.envio);
  return (
    <div className="space-y-8">
      {pendientes.length > 0 && (
        <Aviso tono="ambar">
          <b>Tienes {pendientes.length === 1 ? "1 entrega pendiente" : `${pendientes.length} entregas pendientes`}:</b>{" "}
          {pendientes.map((e, i) => (
            <span key={e.id}>
              {i > 0 && " · "}
              <a href={`#/entrega/${e.id}`} className="font-semibold underline underline-offset-2">{e.titulo}</a>
              {e.fecha_limite && <> (hasta el {fechaCorta(e.fecha_limite)})</>}
            </span>
          ))}
        </Aviso>
      )}

      {proyectos.map((p, i) => {
        const delProyecto = entregas.filter((e) => e.proyecto === p.id);
        const sinSesion = delProyecto.filter((e) => !e.sesion || !p.sesiones.some((s) => s.id === e.sesion));
        return (
          <section key={p.id} className={cls.tarjeta}>
            <span className="mb-2 inline-block rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">
              Proyecto {i + 1}
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight">{p.titulo}</h2>
            <p className={`mt-1 max-w-3xl text-[15px] ${cls.suave}`}>{p.resumen}</p>
            <Link href={p.href} className={`mt-2 inline-block text-sm ${cls.enlace}`}>Ver la página del proyecto →</Link>

            <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Sesiones</h3>
            <div className="mt-3 space-y-3">
              {p.sesiones.map((s) => {
                const deSesion = delProyecto.filter((e) => e.sesion === s.id);
                return (
                  <div key={s.id} className="rounded-2xl border border-zinc-200 p-4 dark:border-white/10">
                    <Link href={s.href} className="group flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                      <span className="font-extrabold text-zinc-400">{String(s.n).padStart(2, "0")}</span>
                      <span className="flex-1">
                        <span className="block text-[16px] font-bold group-hover:underline">{s.titulo}</span>
                        <span className={`block text-sm ${cls.suave}`}>{s.resumen}</span>
                      </span>
                      <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Abrir sesión →</span>
                    </Link>
                    {deSesion.length > 0 && <div className="mt-3 space-y-2">{deSesion.map((e) => <FilaEntrega key={e.id} e={e} />)}</div>}
                  </div>
                );
              })}
            </div>

            {sinSesion.length > 0 && (
              <>
                <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Entregas del proyecto</h3>
                <div className="mt-3 space-y-2">{sinSesion.map((e) => <FilaEntrega key={e.id} e={e} />)}</div>
              </>
            )}
          </section>
        );
      })}

      {/* Entregas de proyectos que aún no están en el catálogo del curso */}
      {entregas.filter((e) => !proyectos.some((p) => p.id === e.proyecto)).length > 0 && (
        <section className={cls.tarjeta}>
          <h2 className={cls.h2}>Otras entregas</h2>
          <div className="mt-3 space-y-2">
            {entregas.filter((e) => !proyectos.some((p) => p.id === e.proyecto)).map((e) => <FilaEntrega key={e.id} e={e} />)}
          </div>
        </section>
      )}
    </div>
  );
}

function VistaEntrega({
  entrega: e,
  onEnvio,
  recargar,
  volver,
}: {
  entrega?: EntregaAlumno;
  onEnvio: (envio: Envio, equipo?: EquipoEntrega) => void;
  recargar: () => void;
  volver: () => void;
}) {
  // En una entrega por equipos, si aún no has entregado tú, el formulario parte
  // de lo que haya subido tu equipo.
  const [repo, setRepo] = useState(e?.envio?.repo ?? e?.equipo?.repo ?? "");
  const [web, setWeb] = useState(e?.envio?.web ?? e?.equipo?.web ?? "");
  const [texto, setTexto] = useState(e?.envio?.texto ?? "");
  const [comentario, setComentario] = useState(e?.envio?.comentario ?? "");
  const [estado, setEstado] = useState<{ t: "idle" | "enviando" | "ok" } | { t: "error"; e: string }>({ t: "idle" });

  if (!e) {
    return (
      <Aviso tono="ambar">
        Esa entrega no existe o ya no está visible.{" "}
        <button type="button" onClick={volver} className="font-semibold underline">Volver al curso</button>
      </Aviso>
    );
  }

  const rubrica = e.rubrica ? RUBRICAS[e.rubrica] : undefined;
  const proyecto = PROYECTOS[e.proyecto];
  // Entrega por equipos: el repo es del equipo (el mismo para todos) y puede ser privado.
  const deEquipo = e.en_equipo;
  const subidoPor =
    deEquipo && e.envio?.entregado_por && e.envio.entregado_por !== e.envio.alumno_id
      ? e.equipo?.miembros.find((m) => m.id === e.envio!.entregado_por)?.nombre ?? "otra persona de tu equipo"
      : null;
  const sugerencia = urlPages(e.envio?.repo ?? null);

  async function entregar(ev: React.FormEvent) {
    ev.preventDefault();
    setEstado({ t: "enviando" });
    try {
      const r = await api<{ envio: Envio; equipo?: EquipoEntrega }>("alumno.entregar", { entrega_id: e!.id, repo, web, texto, comentario });
      onEnvio(r.envio, r.equipo);
      setRepo(r.envio.repo ?? "");
      setWeb(r.envio.web ?? "");
      setEstado({ t: "ok" });
    } catch (err) {
      setEstado({ t: "error", e: mensajeError(err) });
    }
  }

  return (
    <div className="space-y-6">
      <a href="#/" className={`text-sm ${cls.enlace}`}>← Volver a mi curso</a>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <EstadoEntrega e={e} />
          {proyecto && <span className={`text-sm ${cls.tenue}`}>{proyecto.titulo}</span>}
        </div>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight">{e.titulo}</h2>
        <p className={`mt-1 text-sm ${cls.tenue}`}>
          {e.fecha_limite ? <>Fecha límite: <b>{fechaCorta(e.fecha_limite)}</b></> : "Sin fecha límite"} · {e.abierta ? "admite entregas y cambios" : "cerrada"}
        </p>
      </div>

      {e.instrucciones && <div className={`${cls.tarjeta} whitespace-pre-line text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300`}>{e.instrucciones}</div>}

      {/* Corrección publicada */}
      {e.nota && (
        <section className={`${cls.tarjeta} space-y-4`}>
          <h3 className={cls.h2}>Tu corrección</h3>
          {rubrica && e.nota.correcciones ? (
            <DobleCorreccion rubrica={rubrica} correcciones={e.nota.correcciones} nota={e.nota.nota} noEvaluable={e.nota.no_evaluable} />
          ) : rubrica ? (
            <NotaGrande rubrica={rubrica} valoraciones={e.nota.valoraciones ?? {}} minimos={e.nota.minimos ?? {}} />
          ) : (
            <p className="text-4xl font-extrabold">{e.nota.no_evaluable ? "NE" : formatoNota(e.nota.nota)}</p>
          )}
          {e.nota.no_evaluable && !e.nota.correcciones && (
            <Aviso tono="rojo">
              <b>No evaluable:</b> falla algún requisito mínimo (abajo, marcado con ✗). Arréglalo, sube los cambios y
              actualiza la entrega mientras siga abierta: la puntuación de la rúbrica ya te dice cuánto sacarías.
            </Aviso>
          )}
          {e.nota.comentario && !e.nota.correcciones && <Aviso tono="azul"><b>Comentario del profesor:</b> <span className="whitespace-pre-line">{e.nota.comentario}</span></Aviso>}
          {e.envio && e.nota.updated_at < e.envio.updated_at && (
            <Aviso tono="ambar">Has actualizado la entrega después de esta corrección: el profesor la revisará de nuevo.</Aviso>
          )}
          {rubrica && !e.nota.correcciones && <RubricaVista rubrica={rubrica} valoraciones={e.nota.valoraciones ?? {}} minimos={e.nota.minimos ?? {}} />}
        </section>
      )}

      {deEquipo && <CajaEquipo equipo={e.equipo ?? null} equipos={e.equipos_clase ?? []} subidoPor={subidoPor} onUnido={recargar} />}

      {/* Formulario de entrega */}
      <section className={cls.tarjeta}>
        <h3 className={cls.h2}>{e.envio ? "Tu entrega" : "Entregar"}</h3>
        {e.envio && (
          <p className={`mt-1 text-sm ${cls.tenue}`}>
            Entregada {haceCuanto(e.envio.updated_at)} ({fechaCorta(e.envio.updated_at)})
            {e.envio.version > 1 && ` · actualizada ${e.envio.version - 1} ${e.envio.version === 2 ? "vez" : "veces"}`}
            {e.envio.fuera_plazo && " · fuera de plazo"}
          </p>
        )}
        {deEquipo && !e.equipo ? (
          <p className={`mt-3 ${cls.suave}`}>Elige tu equipo arriba y podrás entregar (o ver lo que ya ha entregado tu equipo).</p>
        ) : e.abierta ? (
          <form onSubmit={entregar} className="mt-4 space-y-4">
            {e.tipo === "github" && (
              <>
                <div>
                  <label htmlFor="ent-repo" className={cls.label}>{deEquipo ? "El repositorio de tu equipo" : "Tu repositorio de GitHub"}</label>
                  <input
                    id="ent-repo"
                    className={cls.input}
                    required
                    value={repo}
                    onChange={(x) => setRepo(x.target.value)}
                    placeholder={deEquipo ? "https://github.com/vuestra-organizacion/vuestro-repo" : "https://github.com/tu-usuario/tu-repositorio"}
                    autoCapitalize="none"
                    spellCheck={false}
                  />
                  <p className={`mt-1 text-xs ${cls.tenue}`}>
                    {deEquipo
                      ? "El mismo para todo el equipo: lo que entregue cualquiera vale para todos. Puede ser privado: entonces invita antes a aulaenlanube (Settings → Collaborators and teams → Add people, rol Read)."
                      : "Vale la dirección completa o solo «usuario/repositorio». Tiene que ser público."}
                  </p>
                </div>
                <div>
                  <label htmlFor="ent-web" className={cls.label}>{deEquipo ? "Prototipo o web publicada" : "Tu web publicada (GitHub Pages)"} <span className="font-normal text-zinc-400">· opcional</span></label>
                  <input
                    id="ent-web"
                    className={cls.input}
                    value={web}
                    onChange={(x) => setWeb(x.target.value)}
                    placeholder={deEquipo ? "https://… (si ya tenéis algo publicado)" : "https://tu-usuario.github.io/tu-repositorio/"}
                    autoCapitalize="none"
                    spellCheck={false}
                  />
                  {sugerencia && !web && !deEquipo && (
                    <button type="button" onClick={() => setWeb(sugerencia)} className={`mt-1 text-xs ${cls.enlace}`}>
                      Usar {sugerencia}
                    </button>
                  )}
                </div>
              </>
            )}
            {e.tipo === "url" && (
              <div>
                <label htmlFor="ent-url" className={cls.label}>Dirección (URL) de tu entrega</label>
                <input id="ent-url" className={cls.input} required value={web} onChange={(x) => setWeb(x.target.value)} placeholder="https://…" />
              </div>
            )}
            {e.tipo === "texto" && (
              <div>
                <label htmlFor="ent-texto" className={cls.label}>Tu respuesta</label>
                <textarea id="ent-texto" className={cls.input} required rows={10} value={texto} onChange={(x) => setTexto(x.target.value)} />
              </div>
            )}
            <div>
              <label htmlFor="ent-com" className={cls.label}>
                {deEquipo ? "Tu rol y tu aportación" : "Comentario para el profesor"} <span className="font-normal text-zinc-400">· {deEquipo ? "opcional, es solo tuyo" : "opcional"}</span>
              </label>
              <textarea
                id="ent-com"
                className={cls.input}
                rows={deEquipo ? 3 : 2}
                value={comentario}
                onChange={(x) => setComentario(x.target.value)}
                placeholder={deEquipo ? "Rol: lead técnico\nHoy he hecho: docs/decisiones.md\nEnlace: https://github.com/…/commit/…" : "Algo que quieras destacar o que no funcione todavía…"}
              />
            </div>
            {estado.t === "error" && <p role="alert" className="text-sm font-semibold text-red-700 dark:text-red-300">{estado.e}</p>}
            {estado.t === "ok" && (
              <p role="status" className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                ✓ Entrega guardada{deEquipo ? " para todo tu equipo" : ""}. Puedes actualizarla mientras siga abierta.
              </p>
            )}
            <button type="submit" className={cls.btnAzul} disabled={estado.t === "enviando"}>
              {estado.t === "enviando" ? "Guardando…" : e.envio ? "Actualizar entrega" : "Entregar"}
            </button>
          </form>
        ) : e.envio ? (
          <dl className="mt-4 space-y-2 text-sm">
            {e.envio.repo && <div><dt className="font-semibold">Repositorio</dt><dd><a className={cls.enlace} href={e.envio.repo} target="_blank" rel="noopener">{e.envio.repo}</a></dd></div>}
            {e.envio.web && <div><dt className="font-semibold">Web</dt><dd><a className={cls.enlace} href={e.envio.web} target="_blank" rel="noopener">{e.envio.web}</a></dd></div>}
            {e.envio.texto && <div><dt className="font-semibold">Respuesta</dt><dd className="whitespace-pre-line">{e.envio.texto}</dd></div>}
          </dl>
        ) : (
          <p className={`mt-3 ${cls.suave}`}>Esta entrega está cerrada y no llegaste a entregarla.</p>
        )}
        {e.tipo === "github" && e.envio?.repo && (
          <div className="mt-4">
            <InfoRepo key={e.envio.repo} repo={e.envio.repo} auto={estado.t === "ok"} equipo={deEquipo} />
          </div>
        )}
      </section>

      {rubrica && !e.nota && (
        <details className={cls.tarjeta}>
          <summary className="cursor-pointer text-[15px] font-bold">Cómo se corrige: {rubrica.titulo.replace(/^Rúbrica · /, "rúbrica de la ")}</summary>
          <p className={`mt-2 text-sm ${cls.suave}`}>
            Sobre 10 puntos. Cada criterio tiene cuatro niveles; usa la rúbrica como hoja de ruta para decidir qué mejorar antes de la fecha límite.
          </p>
          <div className="mt-4">
            <RubricaVista rubrica={rubrica} valoraciones={{}} minimos={{}} />
          </div>
        </details>
      )}
    </div>
  );
}

/**
 * Entrega por equipos: de qué equipo es, quién lo ha entregado y el comentario
 * de cada miembro. Sin equipo, el alumno elige el suyo aquí mismo.
 */
function CajaEquipo({
  equipo,
  equipos,
  subidoPor,
  onUnido,
}: {
  equipo: EquipoEntrega | null;
  equipos: EquipoParaElegir[];
  subidoPor: string | null;
  onUnido: () => void;
}) {
  const [elegido, setElegido] = useState("");
  const [estado, setEstado] = useState<{ t: "idle" | "enviando" } | { t: "error"; e: string }>({ t: "idle" });

  async function unirse(ev: React.FormEvent) {
    ev.preventDefault();
    if (!elegido) return;
    setEstado({ t: "enviando" });
    try {
      await api("alumno.unirse_equipo", { equipo_id: Number(elegido) });
      onUnido();
    } catch (err) {
      setEstado({ t: "error", e: mensajeError(err) });
    }
  }

  if (!equipo) {
    return (
      <section className={`${cls.tarjeta} space-y-3`}>
        <h3 className={cls.h2}>¿De qué equipo eres?</h3>
        <p className={`text-sm ${cls.suave}`}>
          Esta entrega es <b>por equipos</b>: basta con que la entregue una persona y queda guardada para todo el equipo. Indica el tuyo y
          verás lo que ya habéis entregado.
        </p>
        {equipos.length ? (
          <form onSubmit={unirse} className="flex flex-wrap items-end gap-3">
            <div className="min-w-[16rem] flex-1">
              <label htmlFor="ent-equipo" className={cls.label}>Mi equipo</label>
              <select id="ent-equipo" className={cls.input} value={elegido} onChange={(x) => setElegido(x.target.value)} required>
                <option value="">Elige tu equipo…</option>
                {equipos.map((q) => (
                  <option key={q.id} value={q.id} disabled={q.lleno}>
                    {q.nombre} · {q.miembros} {q.miembros === 1 ? "persona" : "personas"}{q.lleno ? " (completo)" : ""}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className={cls.btnAzul} disabled={!elegido || estado.t === "enviando"}>
              {estado.t === "enviando" ? "Guardando…" : "Este es mi equipo"}
            </button>
          </form>
        ) : (
          <Aviso tono="ambar">Todavía no hay equipos en tu clase. Formad el vuestro en <a href="#/equipos" className="font-semibold underline underline-offset-2">Mi equipo</a>.</Aviso>
        )}
        {estado.t === "error" && <p role="alert" className="text-sm font-semibold text-red-700 dark:text-red-300">{estado.e}</p>}
        <p className={`text-xs ${cls.tenue}`}>Si te equivocas de equipo, díselo al profesor para que te cambie.</p>
      </section>
    );
  }
  const entregado = equipo.miembros.some((m) => m.entregado);
  return (
    <section className={`${cls.tarjeta} space-y-3`}>
      <h3 className={cls.h2}>Entrega del equipo «{equipo.nombre}»</h3>
      <p className={`text-sm ${cls.suave}`}>
        Basta con que entregue <b>una persona</b>: queda guardada para todo el equipo y cualquiera de vosotros puede actualizarla. El
        comentario con tu rol y tu aportación es opcional y solo tuyo; lo ve tu equipo.
      </p>
      {subidoPor ? (
        <Aviso tono="azul">
          <b>{subidoPor}</b> ya ha entregado por el equipo. Si quieres, añade tu comentario y pulsa «Actualizar entrega».
        </Aviso>
      ) : !entregado ? (
        <Aviso tono="ambar">Vuestro equipo todavía no ha entregado.</Aviso>
      ) : null}
      <ul className="space-y-1.5">
        {equipo.miembros.map((m) => (
          <li key={m.id} className="rounded-xl border border-zinc-200 px-3 py-2 text-sm dark:border-white/10">
            <span className="font-semibold">
              {m.nombre}
              {m.yo ? " (tú)" : ""}
            </span>
            {m.comentario ? (
              <span className={`mt-0.5 block whitespace-pre-line ${cls.suave}`}>{m.comentario}</span>
            ) : (
              <span className={`block ${cls.tenue}`}>Sin comentario propio</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function VistaNotas({ entregas }: { entregas: EntregaAlumno[] }) {
  const corregidas = entregas.filter((e) => e.nota);
  if (!corregidas.length) {
    return <Aviso tono="gris">Todavía no tienes ninguna entrega corregida. Cuando el profesor publique una nota, aparecerá aquí con la rúbrica explicada.</Aviso>;
  }
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="bg-zinc-100 text-left dark:bg-white/10">
            <th className="px-4 py-2.5 font-bold">Entrega</th>
            <th className="px-4 py-2.5 font-bold">Nota</th>
            <th className="px-4 py-2.5 font-bold">Publicada</th>
          </tr>
        </thead>
        <tbody>
          {corregidas.map((e) => (
            <tr key={e.id} className="border-t border-zinc-200 dark:border-white/10">
              <td className="px-4 py-2.5"><a href={`#/entrega/${e.id}`} className={cls.enlace}>{e.titulo}</a></td>
              <td className="px-4 py-2.5 font-bold">{e.nota!.no_evaluable ? "NE" : formatoNota(e.nota!.nota)}</td>
              <td className={`px-4 py-2.5 ${cls.tenue}`}>{fechaCorta(e.nota!.publicada_at, false)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function VistaCuenta({ usuario, grupo }: { usuario: UsuarioSesion; grupo: Grupo }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className={cls.tarjeta}>
        <h2 className={cls.h2}>Tus datos</h2>
        <dl className="mt-3 space-y-2 text-[15px]">
          <div><dt className={`text-xs font-bold uppercase tracking-wider ${cls.tenue}`}>Nombre</dt><dd>{usuario.nombre} {usuario.apellidos}</dd></div>
          <div><dt className={`text-xs font-bold uppercase tracking-wider ${cls.tenue}`}>Usuario</dt><dd><code className="font-mono">{usuario.usuario}</code></dd></div>
          <div><dt className={`text-xs font-bold uppercase tracking-wider ${cls.tenue}`}>Grupo</dt><dd>{grupo.nombre} · {CURSOS[grupo.curso].nombre} · {grupo.anyo}</dd></div>
        </dl>
        <p className={`mt-4 text-sm ${cls.tenue}`}>¿Algún dato mal? Díselo al profesor.</p>
      </div>
      <div>
        <h2 className={`${cls.h2} mb-3`}>Cambiar contraseña</h2>
        <CambiarPassword />
      </div>
    </div>
  );
}
