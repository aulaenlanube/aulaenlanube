"use client";

// Vista de equipos para el profesor (creado 15-10-2026): estado de los equipos
// del grupo-clase, quién queda suelto y botón de reparto aleatorio de los que
// no tienen equipo (los equipos formados por el alumnado no se tocan).

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/campus/cliente";
import { Aviso, CajaError, Cargando, cls, mensajeError, Pildora } from "./ui";

type Miembro = { id: number; nombre: string; apellidos: string; usuario: string; lider: boolean };
type Equipo = { id: number; nombre: string; created_at: string; miembros: Miembro[] };
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
  const [ocupado, setOcupado] = useState(false);
  const [confir, setConfir] = useState(false);
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

  const aleatorio = async () => {
    setOcupado(true);
    try {
      const e = await api<Estado>("prof.equipos.aleatorio", { grupo_id: grupoId });
      setEstado(e);
      setConfir(false);
    } catch (e) {
      setError(mensajeError(e));
    } finally {
      setOcupado(false);
    }
  };

  const borrarEquipo = async (id: number) => {
    setOcupado(true);
    try {
      setEstado(await api<Estado>("prof.equipo.borrar", { grupo_id: grupoId, equipo_id: id }));
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
        {estado.sin_equipo.length > 0 && (
          <Pildora tono="ambar">{estado.sin_equipo.length} sin equipo</Pildora>
        )}
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

      {estado.avisos?.length ? estado.avisos.map((a, i) => <Aviso key={i} tono="ambar">{a}</Aviso>) : null}
      {estado.creados?.length ? (
        <Aviso tono="verde">
          Equipos creados: {estado.creados.map((c) => `${c.nombre} (${c.miembros.join(", ")})`).join(" · ")}
        </Aviso>
      ) : null}

      {estado.equipos.length ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {estado.equipos.map((e) => (
            <div key={e.id} className={`rounded-xl border p-4 ${e.miembros.length >= estado.min ? "border-zinc-200 dark:border-white/10" : "border-amber-300 bg-amber-50/50 dark:border-amber-500/40"}`}>
              <div className="flex items-center gap-2">
                <strong className="text-[15px]">{e.nombre}</strong>
                <Pildora tono={e.miembros.length >= estado.min ? "verde" : "ambar"}>{e.miembros.length}</Pildora>
                <button type="button" className={`${cls.btnMini} ml-auto`} disabled={ocupado} onClick={() => borrarEquipo(e.id)} title="Disolver y dejar a sus miembros sin equipo">
                  ✕
                </button>
              </div>
              <ul className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {e.miembros.map((m) => (
                  <li key={m.id}>{m.lider ? "👑 " : "· "}{nombre(m)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <Aviso tono="gris">Todavía no hay equipos en este grupo. El alumnado puede formarlos desde su panel («Mi equipo»).</Aviso>
      )}

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
