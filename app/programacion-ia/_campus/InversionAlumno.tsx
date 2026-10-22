"use client";

// Ronda de inversión del proyecto en grupo (creado 20-10-2026). Tras los pitches,
// el equipo reparte su dinero ficticio entre los OTROS equipos: un único voto por
// equipo (quien lo registre da igual), múltiplos de 10, sin invertir en sí mismo,
// solo con la ronda abierta por el profesor.

import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/campus/cliente";
import { Aviso, CajaError, Cargando, cls, mensajeError, Pildora } from "./ui";

type EquipoResumen = {
  id: number;
  nombre: string;
  descripcion: string;
  miembros: number;
  ha_votado: boolean;
  recibido: number;
};
type Estado = {
  grupo_id: number;
  abierta: boolean;
  cupo_persona: number;
  mi_equipo_id: number;
  miembros: number;
  cupo_equipo: number;
  mi_voto: Record<string, number> | null;
  equipos: EquipoResumen[];
};

const PASO = 10;

export default function InversionAlumno() {
  const [estado, setEstado] = useState<Estado | null>(null);
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");
  const [vuelta, setVuelta] = useState(0);
  const [asig, setAsig] = useState<Record<number, number>>({});
  const [ocupado, setOcupado] = useState(false);

  useEffect(() => {
    let vivo = true;
    api<Estado>("inversion.estado")
      .then((e) => {
        if (!vivo) return;
        setEstado(e);
        if (e.mi_voto) {
          const inicial: Record<number, number> = {};
          for (const [k, v] of Object.entries(e.mi_voto)) inicial[Number(k)] = Number(v);
          setAsig(inicial);
        }
      })
      .catch((e) => vivo && setError(mensajeError(e)));
    return () => {
      vivo = false;
    };
  }, [vuelta]);

  const otros = useMemo(() => (estado ? estado.equipos.filter((e) => e.id !== estado.mi_equipo_id) : []), [estado]);
  const total = Object.values(asig).reduce((s, n) => s + n, 0);

  const mover = (id: number, delta: number) =>
    setAsig((a) => {
      const v = Math.max(0, (a[id] ?? 0) + delta);
      const resto = total - (a[id] ?? 0) + v;
      if (estado && resto > estado.cupo_equipo) return a; // no cabe
      return { ...a, [id]: v };
    });

  const enviar = async () => {
    if (!estado) return;
    const repartido: Record<number, number> = {};
    for (const [k, v] of Object.entries(asig)) if (v > 0) repartido[Number(k)] = v;
    if (!Object.keys(repartido).length) {
      setAviso("Reparte algo de dinero entre los otros equipos antes de enviar.");
      return;
    }
    setOcupado(true);
    setAviso("");
    try {
      const e = await api<Estado>("inversion.votar", { repartido });
      setEstado(e);
      const inicial: Record<number, number> = {};
      for (const [k, v] of Object.entries(e.mi_voto ?? {})) inicial[Number(k)] = Number(v);
      setAsig(inicial);
      setAviso("✅ Voto registrado por vuestro equipo. Mientras la ronda esté abierta, cualquier miembro lo puede actualizar.");
    } catch (err) {
      setAviso("⛔ " + mensajeError(err));
    } finally {
      setOcupado(false);
    }
  };

  if (error) return <CajaError error={error} reintentar={() => setVuelta((v) => v + 1)} />;
  if (!estado) return <Cargando />;

  const restante = estado.cupo_equipo - total;
  const yaVoto = !!estado.mi_voto;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Pildora tono={estado.abierta ? "verde" : "gris"}>{estado.abierta ? "Ronda abierta" : "Ronda cerrada"}</Pildora>
        <Pildora>{estado.cupo_persona} € por persona</Pildora>
        <Pildora>
          {estado.miembros} personas → cupo del equipo {estado.cupo_equipo} €
        </Pildora>
        {yaVoto && <Pildora tono="azul">Voto registrado</Pildora>}
      </div>

      {!estado.abierta && (
        <Aviso tono="ambar">
          {yaVoto
            ? "La ronda está cerrada: vuestro voto queda guardado y no se puede modificar hasta que el profesor la abra de nuevo."
            : "La ronda de inversión aún no está abierta. Cuando el profesor la abra, repartís vuestro dinero desde aquí."}
        </Aviso>
      )}
      {aviso && <Aviso tono={aviso.startsWith("✅") ? "verde" : aviso.startsWith("⛔") ? "rojo" : "gris"}>{aviso}</Aviso>}

      <div className={cls.tarjeta}>
        <h3 className="text-[15px] font-bold">Repartid vuestro dinero (solo entre los otros equipos)</h3>
        <p className={`mt-1 text-sm ${cls.tenue}`}>
          Múltiplos de 10 €. Un equipo puede recibir hasta todo vuestro cupo. Vale más el «por qué» que el número:
          concretad en equipo a quién dais qué y por qué.
        </p>
        <div className="mt-4 space-y-3">
          {otros.map((e) => (
            <div key={e.id} className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 px-4 py-2.5 dark:border-white/10">
              <div>
                <div className="font-semibold">{e.nombre}</div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">{e.descripcion || <em className="opacity-60">sin descripción</em>}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {e.recibido} € recibidos del resto de la clase {e.ha_votado ? "· ya han votado" : "· aún no han votado"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" disabled={!estado.abierta || ocupado} onClick={() => mover(e.id, -PASO)} className={`${cls.btn2} !px-3 !py-1`}>
                  −10
                </button>
                <span className="w-16 text-center font-mono text-lg font-bold">{asig[e.id] ?? 0} €</span>
                <button type="button" disabled={!estado.abierta || ocupado} onClick={() => mover(e.id, PASO)} className={`${cls.btn2} !px-3 !py-1`}>
                  +10
                </button>
              </div>
            </div>
          ))}
          {!otros.length && <Aviso tono="gris">Todavía no hay más equipos en la clase contra los que votar.</Aviso>}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-semibold">
            Repartido: {total} € de {estado.cupo_equipo} € ·{" "}
            <span className={restante < 0 ? "text-red-600" : restante === 0 ? "text-emerald-600" : ""}>
              {restante >= 0 ? `quedan ${restante} €` : `os pasáis de ${-restante} €`}
            </span>
          </div>
          <button
            type="button"
            disabled={!estado.abierta || ocupado || restante < 0}
            onClick={enviar}
            className="rounded-xl bg-blue-700 px-5 py-2 text-sm font-bold text-white transition hover:bg-blue-800 disabled:opacity-50 dark:bg-blue-600"
          >
            {yaVoto ? "Actualizar voto del equipo" : "Registrar voto del equipo"}
          </button>
        </div>
      </div>

      <details className="rounded-xl border border-zinc-200 px-4 py-3 text-sm dark:border-white/10">
        <summary className="cursor-pointer font-semibold">Así va la caja de toda la clase</summary>
        <ul className="mt-2 space-y-1 text-zinc-600 dark:text-zinc-400">
          {estado.equipos
            .slice()
            .sort((a, b) => b.recibido - a.recibido)
            .map((e) => (
              <li key={e.id}>
                <b>{e.nombre}</b>: {e.recibido} € {e.id === estado.mi_equipo_id ? "(el vuestro)" : ""} {e.ha_votado ? "✓ votado" : "· sin votar"}
              </li>
            ))}
        </ul>
      </details>
    </div>
  );
}
