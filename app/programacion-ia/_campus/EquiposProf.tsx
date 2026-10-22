"use client";

// Vista de equipos para el profesor (creado 15-10-2026; edición completa 15-10-2026):
// estado de los equipos del grupo-clase, reparto aleatorio de los sueltos y
// edición total: renombrar equipos, mover alumnos entre equipos, quitar a
// cualquiera y asignar sueltos al equipo que se elija.

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/campus/cliente";
import { Aviso, CajaError, Cargando, cls, mensajeError, Pildora } from "./ui";

type Miembro = { id: number; nombre: string; apellidos: string; usuario: string; lider: boolean };
type Equipo = { id: number; nombre: string; descripcion?: string; created_at: string; miembros: Miembro[] };
type Sueltos = { id: number; nombre: string; apellidos: string; usuario: string };
type Estado = {
  grupo_id: number;
  grupo_nombre: string;
  curso: string;
  equipos: Equipo[];
  sin_equipo: Sueltos[];
  min: number;
  max: number;
  avisos: string[];
  creados?: { nombre: string; miembros: string[] }[];
};

const nombre = (p: { nombre: string; apellidos: string }) => `${p.nombre} ${p.apellidos}`.trim();

export default function EquiposProf({ grupoId }: { grupoId: number }) {
  const [estado, setEstado] = useState<Estado | null>(null);
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [confir, setConfir] = useState(false);
  const [renombrado, setRenombrado] = useState<{ id: number; nombre: string } | null>(null);
  const [descEd, setDescEd] = useState<{ id: number; texto: string } | null>(null);
  const [vuelta, setVuelta] = useState(0);

  const cargar = useCallback(() => {
    setError("");
    setVuelta((v) => v + 1);
  }, []);

  useEffect(() => {
    let vivo = true;
    api<Estado>("prof.equipos", { grupo_id: grupoId })
      .then((e) => vivo && setEstado(e))
      .catch((e) => vivo && setError(mensajeError(e)));
    return () => {
      vivo = false;
    };
  }, [grupoId, vuelta]);

  const accion = async (accion: string, datos: Record<string, unknown>, ok?: string) => {
    setOcupado(true);
    setAviso("");
    try {
      const e = await api<Estado>(accion, { grupo_id: grupoId, ...datos });
      setEstado(e);
      if (ok) setAviso(ok);
    } catch (e) {
      setAviso(mensajeError(e));
    } finally {
      setOcupado(false);
    }
  };

  const aleatorio = async () => {
    setOcupado(true);
    try {
      setEstado(await api<Estado>("prof.equipos.aleatorio", { grupo_id: grupoId }));
      setConfir(false);
    } catch (e) {
      setError(mensajeError(e));
    } finally {
      setOcupado(false);
    }
  };

  if (error) return <CajaError error={error} reintentar={cargar} />;
  if (!estado) return <Cargando />;

  const conEquipo = estado.equipos.reduce((n, e) => n + e.miembros.length, 0);
  const total = conEquipo + estado.sin_equipo.length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <Pildora tono="gris">{conEquipo} de {total} con equipo</Pildora>
        {estado.sin_equipo.length > 0 && <Pildora tono="ambar">{estado.sin_equipo.length} sin equipo</Pildora>}
        <div className="ml-auto">
          {!confir ? (
            <button type="button" className={cls.btnAzul} disabled={ocupado || !estado.sin_equipo.length} onClick={() => setConfir(true)}>
              🎲 Repartir al azar a los {estado.sin_equipo.length} que faltan
            </button>
          ) : (
            <span className="inline-flex items-center gap-2">
              <span className="text-sm font-semibold">¿Repartir a {estado.sin_equipo.length}? Se crearán equipos nuevos.</span>
              <button type="button" className={cls.btnAzul} disabled={ocupado} onClick={aleatorio}>Sí, repartir</button>
              <button type="button" className={cls.btn2} onClick={() => setConfir(false)}>Cancelar</button>
            </span>
          )}
        </div>
      </div>

      {aviso && <Aviso tono={aviso.startsWith("✗") ? "rojo" : "verde"}>{aviso}</Aviso>}
      {estado.avisos?.length ? estado.avisos.map((a, i) => <Aviso key={i} tono="ambar">{a}</Aviso>) : null}
      {estado.creados?.length ? (
        <Aviso tono="verde">
          Equipos creados: {estado.creados.map((c) => `${c.nombre} (${c.miembros.join(", ")})`).join(" · ")}
        </Aviso>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        {estado.equipos.map((e) => {
          const otros = estado.equipos.filter((x) => x.id !== e.id);
          const editando = renombrado?.id === e.id;
          return (
            <div key={e.id} className={`rounded-xl border p-4 ${e.miembros.length >= estado.min ? "border-zinc-200 dark:border-white/10" : "border-amber-300 bg-amber-50/50 dark:border-amber-500/40"}`}>
              <div className="flex items-center gap-2">
                {editando ? (
                  <>
                    <input
                      className={`${cls.input} !w-auto flex-1`}
                      value={renombrado.nombre}
                      maxLength={40}
                      onChange={(ev) => setRenombrado({ id: e.id, nombre: ev.target.value })}
                      onKeyDown={(ev) => {
                        if (ev.key === "Enter") {
                          const n = renombrado.nombre.trim();
                          setRenombrado(null);
                          if (n) accion("prof.equipo.renombrar", { equipo_id: e.id, nombre: n }, `✗ Equipo renombrado a «${n}».`);
                        }
                        if (ev.key === "Escape") setRenombrado(null);
                      }}
                    />
                    <button type="button" className={cls.btnMini} disabled={ocupado || !renombrado.nombre.trim()} onClick={() => { const n = renombrado.nombre.trim(); setRenombrado(null); if (n) accion("prof.equipo.renombrar", { equipo_id: e.id, nombre: n }, `✗ Equipo renombrado a «${n}».`); }}>Guardar</button>
                    <button type="button" className={cls.btnMini} onClick={() => setRenombrado(null)}>✕</button>
                  </>
                ) : (
                  <>
                    <strong className="text-[15px]">{e.nombre}</strong>
                    <Pildora tono={e.miembros.length >= estado.min ? "verde" : "ambar"}>{e.miembros.length}</Pildora>
                    <button type="button" className={`${cls.btnMini} ml-auto`} disabled={ocupado} onClick={() => setRenombrado({ id: e.id, nombre: e.nombre })} title="Renombrar equipo">✎</button>
                    <button type="button" className={cls.btnMini} disabled={ocupado} onClick={() => accion("prof.equipo.borrar", { equipo_id: e.id }, `✗ «${e.nombre}» disuelto: sus miembros pasan a «sin equipo».`)} title="Disolver equipo">✕</button>
                  </>
                )}
              </div>

              {(() => {
                const editD = descEd?.id === e.id;
                return editD ? (
                  <div className="mt-2 flex gap-2">
                    <input
                      className={`${cls.input} flex-1`}
                      maxLength={200}
                      autoFocus
                      value={descEd.texto}
                      placeholder="Qué proyecto está desarrollando este equipo"
                      onChange={(ev) => setDescEd({ id: e.id, texto: ev.target.value })}
                      onKeyDown={(ev) => {
                        if (ev.key === "Enter") { const t = descEd.texto.trim(); setDescEd(null); accion("prof.equipo.descripcion", { equipo_id: e.id, descripcion: t }, `✗ Descripción de «${e.nombre}» guardada.`); }
                        if (ev.key === "Escape") setDescEd(null);
                      }}
                    />
                    <button type="button" className={cls.btnMini} disabled={ocupado} onClick={() => { const t = descEd.texto.trim(); setDescEd(null); accion("prof.equipo.descripcion", { equipo_id: e.id, descripcion: t }, `✗ Descripción de «${e.nombre}» guardada.`); }}>Guardar</button>
                    <button type="button" className={cls.btnMini} onClick={() => setDescEd(null)}>✕</button>
                  </div>
                ) : (
                  <p className={`mt-1 text-sm ${cls.tenue}`}>
                    <span className="italic">{e.descripcion?.trim() || "sin descripción del proyecto"}</span>{" "}
                    <button type="button" className={cls.btnMini} disabled={ocupado} title="Editar descripción" onClick={() => setDescEd({ id: e.id, texto: e.descripcion ?? "" })}>✎</button>
                  </p>
                );
              })()}

              <ul className="mt-2 space-y-1">
                {e.miembros.map((m) => (
                  <li key={m.id} className="flex flex-wrap items-center gap-2 rounded-lg bg-zinc-50 px-2 py-1 text-sm dark:bg-white/5">
                    <span className="font-semibold">{m.lider ? "👑 " : "· "}{nombre(m)}</span>
                    <span className="ml-auto flex items-center gap-1">
                      {otros.length > 0 && (
                        <select
                          className="rounded-md border border-zinc-300 bg-white px-1 py-0.5 text-xs dark:border-white/15 dark:bg-slate-900"
                          value=""
                          disabled={ocupado}
                          onChange={(ev) => {
                            const destino = otros.find((x) => x.id === Number(ev.target.value));
                            if (destino) accion("prof.equipo.mover", { equipo_id: destino.id, alumno_id: m.id }, `✗ ${nombre(m)} se va a «${destino.nombre}».`);
                          }}
                          aria-label={`Mover a ${nombre(m)}`}
                        >
                          <option value="">mover…</option>
                          {otros.map((o) => (
                            <option key={o.id} value={o.id} disabled={o.miembros.length >= estado.max}>→ {o.nombre} ({o.miembros.length})</option>
                          ))}
                        </select>
                      )}
                      <button type="button" className={cls.btnMini} disabled={ocupado} onClick={() => accion("prof.equipo.quitar", { alumno_id: m.id }, `✗ ${nombre(m)} queda sin equipo.`)} title="Quitar del equipo (pasa a sin equipo)">−</button>
                    </span>
                  </li>
                ))}
              </ul>

              {estado.sin_equipo.length > 0 && e.miembros.length < estado.max && (
                <select
                  className={`${cls.input} mt-2 text-sm`}
                  value=""
                  disabled={ocupado}
                  onChange={(ev) => {
                    const s = estado.sin_equipo.find((x) => x.id === Number(ev.target.value));
                    if (s) accion("prof.equipo.anadir", { equipo_id: e.id, alumno_id: s.id }, `✗ ${nombre(s)} asignado a «${e.nombre}».`);
                  }}
                  aria-label={`Asignar alguien sin equipo a ${e.nombre}`}
                >
                  <option value="">+ asignar alguien sin equipo…</option>
                  {estado.sin_equipo.map((s) => <option key={s.id} value={s.id}>{nombre(s)}</option>)}
                </select>
              )}
            </div>
          );
        })}
      </div>

      {!estado.equipos.length && <Aviso tono="gris">Todavía no hay equipos en este grupo. El alumnado puede formarlos desde su panel («Mi equipo»).</Aviso>}

      {estado.sin_equipo.length ? (
        <section className={cls.tarjeta}>
          <h3 className={cls.h2}>Sin equipo ({estado.sin_equipo.length})</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {estado.sin_equipo.map((s) => (
              <span key={s.id} className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
                {nombre(s)}
              </span>
            ))}
          </div>
        </section>
      ) : (
        <Aviso tono="verde">Todo el grupo tiene equipo. ✅</Aviso>
      )}
    </div>
  );
}
