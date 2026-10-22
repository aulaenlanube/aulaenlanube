"use client";

// Panel del profesorado · pestaña «Inversión» (creado 20-10-2026). Abre y cierra
// la ronda de inversión, ajusta el cupo por persona y ve en directo la caja de
// cada equipo y quién ha votado (un voto por equipo).

import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/campus/cliente";
import { Aviso, CajaError, Cargando, cls, mensajeError, Pildora } from "./ui";

type Voto = {
  equipo_id: number;
  por: number;
  repartido: Record<string, number>;
  total: number;
  cuando: string;
};
type Equipo = {
  id: number;
  nombre: string;
  descripcion: string;
  miembros: number;
  ha_votado: boolean;
  recibido: number;
  voto: Record<string, number> | null;
};
type Datos = {
  grupo_id: number;
  config: { abierta: boolean; cupo: number };
  equipos: Equipo[];
  votos: Voto[];
};

export default function InversionProf({ grupoId }: { grupoId: number }) {
  const [datos, setDatos] = useState<Datos | null>(null);
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");
  const [vuelta, setVuelta] = useState(0);
  const [ocupado, setOcupado] = useState(false);
  const [cupo, setCupo] = useState("100");

  useEffect(() => {
    let vivo = true;
    setError("");
    api<Datos>("prof.inversion", { grupo_id: grupoId })
      .then((d) => {
        if (!vivo) return;
        setDatos(d);
        setCupo(String(d.config.cupo));
      })
      .catch((e) => vivo && setError(mensajeError(e)));
    return () => {
      vivo = false;
    };
  }, [grupoId, vuelta]);

  const cargar = useCallback(() => setVuelta((v) => v + 1), []);

  const accion = async (accion: string, extra: Record<string, unknown> = {}, ok = "") => {
    setOcupado(true);
    setAviso("");
    try {
      setDatos(await api<Datos>(accion, { grupo_id: grupoId, ...extra }));
      if (ok) setAviso(ok);
    } catch (e) {
      setAviso("⛔ " + mensajeError(e));
    } finally {
      setOcupado(false);
    }
  };

  const ranking = useMemo(() => (datos ? datos.equipos.slice().sort((a, b) => b.recibido - a.recibido) : []), [datos]);
  const sinVotar = datos ? datos.equipos.filter((e) => !e.ha_votado) : [];

  if (error) return <CajaError error={error} reintentar={cargar} />;
  if (!datos) return <Cargando />;

  const totalVotado = datos.votos.reduce((s, v) => s + v.total, 0);
  const totalRecibido = datos.equipos.reduce((s, e) => s + e.recibido, 0);

  return (
    <div className="space-y-5">
      <div className={cls.tarjeta}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Pildora tono={datos.config.abierta ? "verde" : "gris"}>{datos.config.abierta ? "Ronda ABIERTA" : "Ronda cerrada"}</Pildora>
            <Pildora>Cupo {datos.config.cupo} € × persona</Pildora>
            <Pildora>{datos.votos.length}/{datos.equipos.length} equipos han votado</Pildora>
            <Pildora>{totalVotado} € emitidos · {totalRecibido} € repartidos</Pildora>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-sm font-semibold">Cupo/persona</label>
            <input
              value={cupo}
              onChange={(e) => setCupo(e.target.value)}
              inputMode="numeric"
              className="w-20 rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-white/15 dark:bg-slate-950"
            />
            <button
              type="button"
              disabled={ocupado}
              onClick={() => accion("prof.inversion.abrir", { abierta: !datos.config.abierta, cupo: Number(cupo) || datos.config.cupo }, datos.config.abierta ? "Ronda cerrada." : "Ronda abierta: el alumnado ya puede votar.")}
              className={datos.config.abierta ? cls.btn2 : "rounded-xl bg-blue-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-800 disabled:opacity-50"}
            >
              {datos.config.abierta ? "Cerrar ronda" : "Abrir ronda"}
            </button>
            <button
              type="button"
              disabled={ocupado}
              onClick={() => accion("prof.inversion.abrir", { abierta: datos.config.abierta, cupo: Number(cupo) || datos.config.cupo }, "Configuración guardada.")}
              className={cls.btn2}
            >
              Guardar cupo
            </button>
          </div>
        </div>
        {aviso && (
          <Aviso tono={aviso.startsWith("⛔") ? "rojo" : "verde"} className="mt-3">
            {aviso}
          </Aviso>
        )}
        {sinVotar.length > 0 && (
          <Aviso tono="ambar" className="mt-3">
            Sin votar todavía: {sinVotar.map((e) => e.nombre).join(", ")}.
          </Aviso>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/10">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead className="bg-zinc-50 text-left dark:bg-white/5">
            <tr>
              <th className="px-3 py-2.5 font-bold">Equipo</th>
              <th className="px-3 py-2.5 font-bold">Miembros</th>
              <th className="px-3 py-2.5 text-right font-bold">€ recibidos</th>
              <th className="px-3 py-2.5 font-bold">Su voto (a quién dio)</th>
              <th className="px-3 py-2.5 font-bold"></th>
            </tr>
          </thead>
          <tbody className="[&_td]:px-3 [&_td]:py-2.5 [&_td]:align-top [&_tr]:border-t [&_tr]:border-zinc-100 dark:[&_tr]:border-white/5">
            {ranking.map((e) => {
              const nombrePorId = (id: string | number) => datos.equipos.find((x) => x.id === Number(id))?.nombre ?? "?";
              return (
                <tr key={e.id}>
                  <td className="font-bold">
                    {e.nombre}
                    <div className={`text-xs font-normal ${cls.tenue}`}>{e.descripcion || <em className="opacity-60">sin descripción</em>}</div>
                  </td>
                  <td>{e.miembros}</td>
                  <td className="text-right font-mono text-base font-bold">{e.recibido} €</td>
                  <td className="text-zinc-600 dark:text-zinc-400">
                    {e.ha_votado ? (
                      Object.entries(e.voto ?? {})
                        .sort((a, b) => Number(b[1]) - Number(a[1]))
                        .map(([id, imp]) => `${nombrePorId(id)} → ${imp} €`)
                        .join(" · ")
                    ) : (
                      <em>aún no ha votado</em>
                    )}
                  </td>
                  <td className="text-right">
                    {e.ha_votado && (
                      <button
                        type="button"
                        disabled={ocupado}
                        onClick={() => accion("prof.inversion.reset", { equipo_id: e.id }, `Voto de ${e.nombre} borrado: puede volver a registrarlo con la ronda abierta.`)}
                        className={`${cls.btn2} !px-3 !py-1 text-xs`}
                        title="Borrar su voto para que pueda repetirlo"
                      >
                        Repetir voto
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
            {!ranking.length && (
              <tr>
                <td colSpan={5} className="text-zinc-500">
                  Todavía no hay equipos en este grupo.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className={`text-sm ${cls.tenue}`}>
        Regla del juego: cada equipo reparte cupo × miembros entre los <b>otros</b> equipos, en múltiplos de 10,
        con <b>un único voto por equipo</b> (lo registra quien quiera del equipo). Con la ronda cerrada nadie
        puede votar ni cambiar su voto.
      </p>
    </div>
  );
}
