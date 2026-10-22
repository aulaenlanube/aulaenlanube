"use client";

// Un grupo en el panel del profesor: seguimiento (alumnos × entregas), alumnado
// (altas con credenciales, edición, contraseñas nuevas) y la corrección.

import { useCallback, useEffect, useMemo, useState } from "react";
import { CURSOS, CURSO_IDS } from "@/lib/campus/catalogo";
import { api, haceCuanto, nombreCompleto, type Alumno, type Credencial, type Entrega, type Envio, type Grupo, type GrupoResumen, type NotaProfesor, type Seguimiento } from "@/lib/campus/cliente";
import { formatoNota } from "@/lib/campus/rubricas";
import { credencialesTexto, descargarCsv, imprimirCredenciales, parsearLista } from "./exportar";
import EquiposProf from "./EquiposProf";
import InversionProf from "./InversionProf";
import ProfCorregir from "./ProfCorregir";
import { Aviso, CajaError, Cargando, cls, mensajeError, Modal, Pildora } from "./ui";

type Props = { grupoId: number; ruta: string[]; grupos: GrupoResumen[]; onCambio: () => void };

export default function ProfGrupo({ grupoId, ruta, grupos, onCambio }: Props) {
  const [datos, setDatos] = useState<Seguimiento | null>(null);
  const [error, setError] = useState("");
  const [modal, setModal] = useState<null | "grupo" | "alta" | { alumno: Alumno } | { creds: Credencial[] }>(null);

  const [vuelta, setVuelta] = useState(0);
  const cargar = useCallback(() => {
    setError("");
    setVuelta((v) => v + 1);
  }, []);

  // El padre remonta este componente (key) al cambiar de grupo.
  useEffect(() => {
    let vivo = true;
    api<Seguimiento>("prof.seguimiento", { grupo_id: grupoId })
      .then((d) => vivo && setDatos(d))
      .catch((e) => vivo && setError(mensajeError(e)));
    return () => {
      vivo = false;
    };
  }, [grupoId, vuelta]);

  const cerrarModal = useCallback(() => setModal(null), []);

  if (error) return <CajaError error={error} reintentar={cargar} />;
  if (!datos) return <Cargando />;

  const { grupo, alumnos } = datos;
  const pestaña = ruta[2] === "alumnado" ? "alumnado" : ruta[2] === "equipos" ? "equipos" : ruta[2] === "inversion" ? "inversion" : ruta[2] === "corregir" ? "corregir" : "seguimiento";

  const ponerNota = (n: NotaProfesor | null, entregaId: number, alumnoId: number) =>
    setDatos((d) => {
      if (!d) return d;
      const resto = d.notas.filter((x) => !(x.entrega_id === entregaId && x.alumno_id === alumnoId));
      return { ...d, notas: n ? [...resto, n] : resto };
    });

  // ── Corrección de un alumno ──
  if (pestaña === "corregir") {
    const entrega = datos.entregas.find((e) => String(e.id) === ruta[3]);
    const idx = alumnos.findIndex((a) => String(a.id) === ruta[4]);
    if (!entrega || idx < 0) return <Aviso tono="ambar">No encuentro esa entrega o ese alumno en el grupo. <a href={`#/grupo/${grupoId}`} className="underline">Volver</a></Aviso>;
    const alumno = alumnos[idx];
    return (
      <ProfCorregir
        key={`${entrega.id}-${alumno.id}`}
        grupoId={grupoId}
        entrega={entrega}
        alumno={alumno}
        envio={datos.envios.find((e) => e.entrega_id === entrega.id && e.alumno_id === alumno.id) ?? null}
        nota={datos.notas.find((n) => n.entrega_id === entrega.id && n.alumno_id === alumno.id) ?? null}
        anterior={alumnos[idx - 1] ?? null}
        siguiente={alumnos[idx + 1] ?? null}
        onNota={(n) => {
          ponerNota(n, entrega.id, alumno.id);
          onCambio();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <a href="#/" className={`text-sm ${cls.enlace}`}>← Todos los grupos</a>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <Pildora tono="azul">{CURSOS[grupo.curso].corto}</Pildora>
            <Pildora>{grupo.anyo}</Pildora>
            {grupo.archivado && <Pildora tono="ambar">Archivado</Pildora>}
          </div>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight">{grupo.nombre}</h2>
          <p className={`text-sm ${cls.tenue}`}>{alumnos.filter((a) => a.activo).length} alumnos activos</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={cls.btn} onClick={() => setModal("alta")}>+ Añadir alumnado</button>
          <button type="button" className={cls.btn2} onClick={() => setModal("grupo")}>Editar grupo</button>
        </div>
      </div>

      <nav className="flex gap-1 border-b border-zinc-200 dark:border-white/10" aria-label="Secciones del grupo">
        {[
          ["seguimiento", "Seguimiento y notas", `#/grupo/${grupoId}`],
          ["alumnado", `Alumnado (${alumnos.length})`, `#/grupo/${grupoId}/alumnado`],
          ["equipos", "Equipos", `#/grupo/${grupoId}/equipos`],
          ["inversion", "Inversión", `#/grupo/${grupoId}/inversion`],
        ].map(([id, t, href]) => (
          <a
            key={id}
            href={href}
            aria-current={pestaña === id ? "page" : undefined}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition ${pestaña === id ? "border-blue-700 text-blue-700 dark:border-blue-400 dark:text-blue-300" : "border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
          >
            {t}
          </a>
        ))}
      </nav>

      {pestaña === "equipos" ? (
        <EquiposProf grupoId={grupoId} />
      ) : pestaña === "inversion" ? (
        <InversionProf grupoId={grupoId} />
      ) : pestaña === "alumnado" ? (
        <Alumnado
          alumnos={alumnos}
          onEditar={(a) => setModal({ alumno: a })}
          onCreds={(c) => setModal({ creds: c })}
          onRecargar={() => {
            cargar();
            onCambio();
          }}
          grupo={grupo}
        />
      ) : (
        <SeguimientoTabla datos={datos} onPublicadas={cargar} onCambio={onCambio} onAlta={() => setModal("alta")} />
      )}

      {modal === "grupo" && (
        <ModalGrupo
          grupo={grupo}
          vacio={alumnos.length === 0}
          onCerrar={cerrarModal}
          onGuardado={() => {
            cerrarModal();
            cargar();
            onCambio();
          }}
          onBorrado={() => {
            cerrarModal();
            onCambio();
            window.location.hash = "/";
          }}
        />
      )}
      {modal === "alta" && (
        <ModalAlta
          grupo={grupo}
          onCerrar={cerrarModal}
          onCreados={(c) => {
            setModal({ creds: c });
            cargar();
            onCambio();
          }}
        />
      )}
      {modal && typeof modal === "object" && "alumno" in modal && (
        <ModalAlumno
          alumno={modal.alumno}
          grupos={grupos}
          onCerrar={cerrarModal}
          onGuardado={() => {
            cerrarModal();
            cargar();
            onCambio();
          }}
        />
      )}
      {modal && typeof modal === "object" && "creds" in modal && <ModalCredenciales creds={modal.creds} grupo={grupo} onCerrar={cerrarModal} />}
    </div>
  );
}

// ── Seguimiento ───────────────────────────────────────────────────────────────

type Celda =
  | { t: "nada" }
  | { t: "entregada"; envio: Envio }
  | { t: "nota"; nota: NotaProfesor; envio: Envio | null; revisar: boolean };

function celda(entrega: Entrega, alumno: Alumno, envios: Envio[], notas: NotaProfesor[]): Celda {
  const envio = envios.find((e) => e.entrega_id === entrega.id && e.alumno_id === alumno.id) ?? null;
  const nota = notas.find((n) => n.entrega_id === entrega.id && n.alumno_id === alumno.id);
  if (nota) return { t: "nota", nota, envio, revisar: !!envio && envio.updated_at > nota.updated_at };
  return envio ? { t: "entregada", envio } : { t: "nada" };
}

function textoNota(n: NotaProfesor) {
  return n.no_evaluable ? "NE" : formatoNota(n.nota);
}

function SeguimientoTabla({ datos, onPublicadas, onCambio, onAlta }: { datos: Seguimiento; onPublicadas: () => void; onCambio: () => void; onAlta: () => void }) {
  const { grupo, alumnos, entregas, envios, notas } = datos;
  const [aviso, setAviso] = useState<{ tono: "verde" | "rojo" | "ambar"; m: string } | null>(null);

  if (!alumnos.length) {
    return (
      <Aviso tono="gris">
        Este grupo aún no tiene alumnado.{" "}
        <button type="button" onClick={onAlta} className="font-semibold underline">Añadir alumnos</button>
      </Aviso>
    );
  }
  if (!entregas.length) {
    return <Aviso tono="gris">No hay entregas en el curso {CURSOS[grupo.curso].corto}. Créalas en la pestaña «Entregas».</Aviso>;
  }

  async function publicar(e: Entrega) {
    if (!confirm(`¿Publicar todas las correcciones revisadas de «${e.titulo}» en ${grupo.nombre}? El alumnado las verá al momento.`)) return;
    try {
      const r = await api<{ publicadas: number; ia_sin_revisar: number }>("prof.notas.publicar", { entrega_id: e.id, grupo_id: grupo.id });
      setAviso({
        tono: r.ia_sin_revisar ? "ambar" : "verde",
        m: `${r.publicadas} ${r.publicadas === 1 ? "corrección publicada" : "correcciones publicadas"}.${r.ia_sin_revisar ? ` Quedan ${r.ia_sin_revisar} propuestas de la IA sin revisar (ábrelas y guárdalas para poder publicarlas).` : ""}`,
      });
      onPublicadas();
      onCambio();
    } catch (err) {
      setAviso({ tono: "rojo", m: mensajeError(err) });
    }
  }

  function exportar() {
    const cab = ["Apellidos", "Nombre", "Usuario", "Último acceso", ...entregas.flatMap((e) => [`${e.titulo} · nota`, `${e.titulo} · estado`])];
    const filas = alumnos.map((a) => [
      a.apellidos,
      a.nombre,
      a.usuario,
      a.ultimo_acceso ?? "",
      ...entregas.flatMap((e) => {
        const c = celda(e, a, envios, notas);
        if (c.t === "nota") return [c.nota.no_evaluable ? "NE" : c.nota.nota, c.nota.publicada ? "publicada" : c.nota.origen === "ia" ? "propuesta IA" : "borrador"] as (string | number | null)[];
        return [null, c.t === "entregada" ? "entregada" : "sin entregar"];
      }),
    ]);
    descargarCsv(`notas-${grupo.nombre.replace(/[^\w-]+/g, "-")}.csv`, [cab, ...filas]);
  }

  return (
    <div className="space-y-4">
      {aviso && <Aviso tono={aviso.tono}>{aviso.m}</Aviso>}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className={`text-sm ${cls.tenue}`}>Pulsa una casilla para corregir. <b>Azul</b> = entregado sin corregir · <b>ámbar</b> = borrador o propuesta IA · <b>verde</b> = publicada.</p>
        <button type="button" className={cls.btn2} onClick={exportar}>Exportar notas (CSV)</button>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-100 text-left align-bottom dark:bg-white/10">
              <th className="sticky left-0 z-10 bg-zinc-100 px-4 py-2.5 font-bold dark:bg-slate-800">Alumno</th>
              {entregas.map((e) => {
                const deGrupo = envios.filter((x) => x.entrega_id === e.id && alumnos.some((a) => a.id === x.alumno_id)).length;
                const pub = notas.filter((n) => n.entrega_id === e.id && n.publicada).length;
                const porPublicar = notas.filter((n) => n.entrega_id === e.id && !n.publicada && n.origen === "profesor").length;
                return (
                  <th key={e.id} className="min-w-[12rem] px-3 py-2.5 font-bold">
                    <span className="block leading-tight">{e.titulo}</span>
                    <span className={`block text-xs font-normal ${cls.tenue}`}>
                      {deGrupo}/{alumnos.length} entregadas · {pub} publicadas{!e.visible && " · oculta"}{!e.abierta && " · cerrada"}
                    </span>
                    {porPublicar > 0 && (
                      <button type="button" className={`${cls.btnMini} mt-1`} onClick={() => publicar(e)}>
                        Publicar {porPublicar} revisada{porPublicar > 1 ? "s" : ""}
                      </button>
                    )}
                  </th>
                );
              })}
              <th className="px-3 py-2.5 font-bold">Último acceso</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((a) => (
              <tr key={a.id} className={`border-t border-zinc-200 dark:border-white/10 ${a.activo ? "" : "opacity-50"}`}>
                <th scope="row" className="sticky left-0 z-10 bg-white px-4 py-2 text-left font-semibold dark:bg-slate-900">
                  {a.apellidos ? `${a.apellidos}, ${a.nombre}` : a.nombre}
                  {!a.activo && <span className="ml-1 text-xs font-normal">(inactivo)</span>}
                </th>
                {entregas.map((e) => {
                  const c = celda(e, a, envios, notas);
                  const href = `#/grupo/${grupo.id}/corregir/${e.id}/${a.id}`;
                  const base = "flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition hover:shadow";
                  if (c.t === "nada") return <td key={e.id} className="px-3 py-2"><a href={href} className={`${base} border-dashed border-zinc-300 text-zinc-400 dark:border-white/15`}>— sin entregar</a></td>;
                  if (c.t === "entregada")
                    return <td key={e.id} className="px-3 py-2"><a href={href} className={`${base} border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-300`}>Entregada <span aria-hidden>→ corregir</span></a></td>;
                  const n = c.nota;
                  const tono = n.publicada && !c.revisar
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300"
                    : "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300";
                  return (
                    <td key={e.id} className="px-3 py-2">
                      <a href={href} className={`${base} ${tono}`}>
                        <span className="text-sm">{textoNota(n)}</span>
                        <span className="font-semibold">
                          {c.revisar ? "reenviada" : n.publicada ? "✓ publicada" : n.origen === "ia" ? "IA · revisar" : "borrador"}
                        </span>
                      </a>
                    </td>
                  );
                })}
                <td className={`whitespace-nowrap px-3 py-2 text-xs ${cls.tenue}`}>{haceCuanto(a.ultimo_acceso)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Alumnado ──────────────────────────────────────────────────────────────────

function Alumnado({ alumnos, grupo, onEditar, onCreds, onRecargar }: { alumnos: Alumno[]; grupo: Grupo; onEditar: (a: Alumno) => void; onCreds: (c: Credencial[]) => void; onRecargar: () => void }) {
  const [ocupado, setOcupado] = useState<number | null>(null);
  const [aviso, setAviso] = useState("");

  async function nuevaClave(a: Alumno) {
    if (!confirm(`¿Generar una contraseña nueva para ${nombreCompleto(a)}? La actual dejará de funcionar y se cerrarán sus sesiones.`)) return;
    setOcupado(a.id);
    try {
      const r = await api<{ credencial: Credencial }>("prof.alumno.clave", { id: a.id });
      onCreds([r.credencial]);
    } catch (e) {
      setAviso(mensajeError(e));
    } finally {
      setOcupado(null);
    }
  }

  async function borrar(a: Alumno) {
    const conf = prompt(`Esto BORRA a ${nombreCompleto(a)} con todas sus entregas y notas, y no se puede deshacer.\nSi solo quieres impedirle el acceso, usa «Editar» → desactivar.\n\nPara confirmar, escribe su usuario: ${a.usuario}`);
    if (conf === null) return;
    if (conf.trim() !== a.usuario) {
      setAviso("No coincide el usuario: no se ha borrado nada.");
      return;
    }
    setOcupado(a.id);
    try {
      await api("prof.alumno.borrar", { id: a.id });
      onRecargar();
    } catch (e) {
      setAviso(mensajeError(e));
    } finally {
      setOcupado(null);
    }
  }

  if (!alumnos.length) return <Aviso tono="gris">Todavía no hay alumnado en {grupo.nombre}. Usa «+ Añadir alumnado».</Aviso>;

  return (
    <div className="space-y-3">
      {aviso && <Aviso tono="rojo">{aviso}</Aviso>}
      <p className={`text-sm ${cls.tenue}`}>
        Las contraseñas se guardan cifradas: no se pueden volver a ver. Si alguien pierde la suya, genera una nueva.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-100 text-left dark:bg-white/10">
              <th className="px-4 py-2.5 font-bold">Alumno</th>
              <th className="px-3 py-2.5 font-bold">Usuario</th>
              <th className="px-3 py-2.5 font-bold">Correo</th>
              <th className="px-3 py-2.5 font-bold">Último acceso</th>
              <th className="px-3 py-2.5 font-bold"><span className="sr-only">Acciones</span></th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((a) => (
              <tr key={a.id} className={`border-t border-zinc-200 dark:border-white/10 ${a.activo ? "" : "opacity-60"}`}>
                <td className="px-4 py-2 font-semibold">
                  {a.apellidos ? `${a.apellidos}, ${a.nombre}` : a.nombre}
                  {!a.activo && <span className="ml-2"><Pildora tono="gris">Inactivo</Pildora></span>}
                </td>
                <td className="px-3 py-2"><code className="font-mono">{a.usuario}</code></td>
                <td className={`px-3 py-2 ${cls.tenue}`}>{a.email ?? "—"}</td>
                <td className={`whitespace-nowrap px-3 py-2 ${cls.tenue}`}>{haceCuanto(a.ultimo_acceso)}</td>
                <td className="px-3 py-2">
                  <div className="flex justify-end gap-1.5">
                    <button type="button" className={cls.btnMini} onClick={() => onEditar(a)}>Editar</button>
                    <button type="button" className={cls.btnMini} disabled={ocupado === a.id} onClick={() => nuevaClave(a)}>Nueva contraseña</button>
                    <button type="button" className={`${cls.btnMini} text-red-700 dark:text-red-300`} disabled={ocupado === a.id} onClick={() => borrar(a)}>Borrar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Modales ───────────────────────────────────────────────────────────────────

export function ModalGrupo({ grupo, cursoInicial, vacio, onCerrar, onGuardado, onBorrado }: { grupo?: Grupo; cursoInicial?: Grupo["curso"]; vacio?: boolean; onCerrar: () => void; onGuardado: (g: Grupo) => void; onBorrado?: () => void }) {
  const [nombre, setNombre] = useState(grupo?.nombre ?? "");
  const [curso, setCurso] = useState<Grupo["curso"]>(grupo?.curso ?? cursoInicial ?? "presencial");
  const [anyo, setAnyo] = useState(grupo?.anyo ?? "2026-27");
  const [archivado, setArchivado] = useState(grupo?.archivado ?? false);
  const [error, setError] = useState("");
  const [ocupado, setOcupado] = useState(false);

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setOcupado(true);
    setError("");
    try {
      const r = await api<{ grupo: Grupo }>("prof.grupo.guardar", { id: grupo?.id, nombre, curso, anyo, archivado });
      onGuardado(r.grupo);
    } catch (err) {
      setError(mensajeError(err));
      setOcupado(false);
    }
  }

  async function borrar() {
    if (!grupo || !confirm(`¿Borrar el grupo «${grupo.nombre}»?`)) return;
    try {
      await api("prof.grupo.borrar", { id: grupo.id });
      onBorrado?.();
    } catch (err) {
      setError(mensajeError(err));
    }
  }

  return (
    <Modal titulo={grupo ? "Editar grupo" : "Nuevo grupo"} onCerrar={onCerrar} ancho="max-w-lg">
      <form onSubmit={guardar} className="space-y-4">
        <div>
          <label htmlFor="g-nombre" className={cls.label}>Nombre del grupo</label>
          <input id="g-nombre" className={cls.input} required maxLength={120} value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="1º DAM A" autoFocus />
        </div>
        <div>
          <span className={cls.label}>Curso</span>
          <div className="grid gap-2 sm:grid-cols-2">
            {CURSO_IDS.map((c) => (
              <label key={c} className={`flex cursor-pointer items-start gap-2 rounded-xl border p-3 text-sm ${curso === c ? "border-blue-400 bg-blue-50 dark:border-blue-500/50 dark:bg-blue-500/10" : "border-zinc-200 dark:border-white/10"}`}>
                <input type="radio" name="g-curso" checked={curso === c} onChange={() => setCurso(c)} className="mt-0.5 accent-blue-700" />
                <span><b>{CURSOS[c].corto}</b><span className={`block text-xs ${cls.tenue}`}>{CURSOS[c].descripcion}</span></span>
              </label>
            ))}
          </div>
          {grupo && curso !== grupo.curso && <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">Al cambiar de curso, el grupo pasa a ver las entregas del otro curso.</p>}
        </div>
        <div>
          <label htmlFor="g-anyo" className={cls.label}>Curso académico</label>
          <input id="g-anyo" className={`${cls.input} max-w-[10rem]`} required pattern="\d{4}-\d{2}" value={anyo} onChange={(e) => setAnyo(e.target.value)} />
        </div>
        {grupo && (
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={archivado} onChange={(e) => setArchivado(e.target.checked)} className="h-4 w-4 accent-blue-700" />
            Archivado (curso terminado: se guarda todo, pero sale abajo en la lista)
          </label>
        )}
        {error && <p role="alert" className="text-sm font-semibold text-red-700 dark:text-red-300">{error}</p>}
        <div className="flex flex-wrap justify-between gap-2">
          <button type="submit" className={cls.btn} disabled={ocupado}>{ocupado ? "Guardando…" : grupo ? "Guardar" : "Crear grupo"}</button>
          {grupo && vacio && <button type="button" className={cls.btnPeligro} onClick={borrar}>Borrar grupo</button>}
        </div>
      </form>
    </Modal>
  );
}

function ModalAlta({ grupo, onCerrar, onCreados }: { grupo: Grupo; onCerrar: () => void; onCreados: (c: Credencial[]) => void }) {
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const lista = useMemo(() => parsearLista(texto), [texto]);

  async function crear() {
    setOcupado(true);
    setError("");
    try {
      const r = await api<{ credenciales: Credencial[] }>("prof.alumnos.crear", { grupo_id: grupo.id, alumnos: lista });
      onCreados(r.credenciales);
    } catch (e) {
      setError(mensajeError(e));
      setOcupado(false);
    }
  }

  return (
    <Modal titulo={`Añadir alumnado a ${grupo.nombre}`} onCerrar={onCerrar} ancho="max-w-3xl">
      <p className={`text-sm ${cls.suave}`}>
        Pega la lista, <b>una persona por línea</b>. Vale «Apellidos, Nombre» (como sale de ITACA), columnas
        copiadas de una hoja de cálculo (Nombre · Apellidos · correo) o «Nombre Apellidos». El correo es opcional.
        Se genera un usuario y una contraseña para cada uno.
      </p>
      <textarea
        className={`${cls.input} mt-3 font-mono text-sm`}
        rows={8}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder={"García López, María José\nMuñoz Ferrer, Íñigo\nLaura;Sanchis Pla;laura@correo.com"}
        autoFocus
      />
      {lista.length > 0 && (
        <div className="mt-4 max-h-64 overflow-auto rounded-xl border border-zinc-200 dark:border-white/10">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-zinc-100 text-left dark:bg-white/10">
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">Nombre</th>
                <th className="px-3 py-2">Apellidos</th>
                <th className="px-3 py-2">Correo</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((a, i) => (
                <tr key={i} className="border-t border-zinc-200 dark:border-white/10">
                  <td className={`px-3 py-1.5 ${cls.tenue}`}>{i + 1}</td>
                  <td className="px-3 py-1.5 font-semibold">{a.nombre}</td>
                  <td className="px-3 py-1.5">{a.apellidos || <span className="text-amber-700 dark:text-amber-300">(sin apellidos)</span>}</td>
                  <td className={`px-3 py-1.5 ${cls.tenue}`}>{a.email || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {lista.length > 0 && <p className={`mt-2 text-xs ${cls.tenue}`}>Comprueba que nombre y apellidos están bien separados; si no, usa el formato «Apellidos, Nombre».</p>}
      {error && <p role="alert" className="mt-3 text-sm font-semibold text-red-700 dark:text-red-300">{error}</p>}
      <div className="mt-4 flex gap-2">
        <button type="button" className={cls.btn} disabled={!lista.length || ocupado} onClick={crear}>
          {ocupado ? "Creando…" : `Crear ${lista.length || ""} ${lista.length === 1 ? "alumno" : "alumnos"}`}
        </button>
        <button type="button" className={cls.btn2} onClick={onCerrar}>Cancelar</button>
      </div>
    </Modal>
  );
}

function ModalCredenciales({ creds, grupo, onCerrar }: { creds: Credencial[]; grupo: Grupo; onCerrar: () => void }) {
  const [copiado, setCopiado] = useState(false);
  return (
    <Modal titulo={creds.length === 1 ? "Credenciales" : `${creds.length} credenciales creadas`} onCerrar={onCerrar} ancho="max-w-3xl">
      <Aviso tono="ambar">
        <b>Apúntalas o imprímelas ahora:</b> las contraseñas se guardan cifradas y no se pueden volver a mostrar
        (sí puedes generar otras nuevas).
      </Aviso>
      <div className="mt-4 max-h-80 overflow-auto rounded-xl border border-zinc-200 dark:border-white/10">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-100 text-left dark:bg-white/10">
              <th className="px-3 py-2">Alumno</th>
              <th className="px-3 py-2">Usuario</th>
              <th className="px-3 py-2">Contraseña</th>
            </tr>
          </thead>
          <tbody>
            {creds.map((c) => (
              <tr key={c.id} className="border-t border-zinc-200 dark:border-white/10">
                <td className="px-3 py-1.5 font-semibold">{nombreCompleto(c)}</td>
                <td className="px-3 py-1.5"><code className="font-mono">{c.usuario}</code></td>
                <td className="px-3 py-1.5"><code className="font-mono">{c.password}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={cls.btn} onClick={() => imprimirCredenciales(creds, grupo.nombre)}>Imprimir fichas</button>
        <button
          type="button"
          className={cls.btn2}
          onClick={async () => {
            await navigator.clipboard.writeText(credencialesTexto(creds));
            setCopiado(true);
          }}
        >
          {copiado ? "✓ Copiado" : "Copiar como texto"}
        </button>
        <button
          type="button"
          className={cls.btn2}
          onClick={() => descargarCsv(`credenciales-${grupo.nombre.replace(/[^\w-]+/g, "-")}.csv`, [["Nombre", "Apellidos", "Usuario", "Contraseña"], ...creds.map((c) => [c.nombre, c.apellidos, c.usuario, c.password])])}
        >
          Descargar CSV
        </button>
        <button type="button" className={cls.btn2} onClick={onCerrar}>Hecho</button>
      </div>
    </Modal>
  );
}

function ModalAlumno({ alumno, grupos, onCerrar, onGuardado }: { alumno: Alumno; grupos: GrupoResumen[]; onCerrar: () => void; onGuardado: () => void }) {
  const [nombre, setNombre] = useState(alumno.nombre);
  const [apellidos, setApellidos] = useState(alumno.apellidos);
  const [email, setEmail] = useState(alumno.email ?? "");
  const [grupoId, setGrupoId] = useState(alumno.grupo_id ?? 0);
  const [activo, setActivo] = useState(alumno.activo);
  const [error, setError] = useState("");
  const [ocupado, setOcupado] = useState(false);

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setOcupado(true);
    setError("");
    try {
      await api("prof.alumno.guardar", { id: alumno.id, nombre, apellidos, email, grupo_id: grupoId, activo });
      onGuardado();
    } catch (err) {
      setError(mensajeError(err));
      setOcupado(false);
    }
  }

  return (
    <Modal titulo={`Editar · ${nombreCompleto(alumno)}`} onCerrar={onCerrar} ancho="max-w-lg">
      <form onSubmit={guardar} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="a-nombre" className={cls.label}>Nombre</label>
            <input id="a-nombre" className={cls.input} required value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div>
            <label htmlFor="a-ape" className={cls.label}>Apellidos</label>
            <input id="a-ape" className={cls.input} value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
          </div>
        </div>
        <div>
          <label htmlFor="a-email" className={cls.label}>Correo <span className="font-normal text-zinc-400">· opcional</span></label>
          <input id="a-email" type="email" className={cls.input} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="a-grupo" className={cls.label}>Grupo</label>
          <select id="a-grupo" className={cls.input} value={grupoId} onChange={(e) => setGrupoId(Number(e.target.value))}>
            {grupos.map((g) => (
              <option key={g.id} value={g.id}>{g.nombre} · {CURSOS[g.curso].corto} · {g.anyo}{g.archivado ? " (archivado)" : ""}</option>
            ))}
          </select>
          {grupoId !== alumno.grupo_id && <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">Sus entregas y notas se conservan y se ven desde el grupo nuevo.</p>}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} className="h-4 w-4 accent-blue-700" />
          Activo (desmárcalo para impedirle entrar sin borrar nada)
        </label>
        <p className={`text-xs ${cls.tenue}`}>Usuario: <code className="font-mono">{alumno.usuario}</code> (no cambia)</p>
        {error && <p role="alert" className="text-sm font-semibold text-red-700 dark:text-red-300">{error}</p>}
        <button type="submit" className={cls.btn} disabled={ocupado}>{ocupado ? "Guardando…" : "Guardar"}</button>
      </form>
    </Modal>
  );
}
