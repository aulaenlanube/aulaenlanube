"use client";

// Herramienta de equipos del proyecto en grupo (creado 15-10-2026 a petición de
// Edu para 1º DAM presencial). El alumnado forma su equipo de 4-5 personas;
// quien se queda sin equipo, el profesor lo reparte al azar desde su panel.

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/campus/cliente";
import { Aviso, CajaError, Cargando, cls, mensajeError, Pildora } from "./ui";

type Miembro = { id: number; nombre: string; apellidos: string; usuario: string; lider: boolean };
type Equipo = { id: number; nombre: string; created_at: string; miembros: Miembro[]; yo_lider?: boolean };
type Disponible = { id: number; nombre: string; apellidos: string; usuario: string };
type Estado = {
  grupo_id: number;
  curso: string;
  yo_id: number;
  equipos: Equipo[];
  mi_equipo: Equipo | null;
  disponibles: Disponible[];
  min: number;
  max: number;
};

const nombre = (p: { nombre: string; apellidos: string }) => `${p.nombre} ${p.apellidos}`.trim();

export default function EquiposAlumno() {
  const [estado, setEstado] = useState<Estado | null>(null);
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");
  const [vuelta, setVuelta] = useState(0);
  const [ocupado, setOcupado] = useState(false);
  const [nombreEq, setNombreEq] = useState("");
  const [sel, setSel] = useState<number[]>([]);
  const [confir, setConfir] = useState<"salir" | "disolver" | null>(null);

  const cargar = useCallback(() => {
    setError("");
    setVuelta((v) => v + 1);
  }, []);

  useEffect(() => {
    let vivo = true;
    api<Estado>("equipos.estado")
      .then((e) => vivo && setEstado(e))
      .catch((e) => vivo && setError(mensajeError(e)));
    return () => {
      vivo = false;
    };
  }, [vuelta]);

  const accion = async (accion: string, datos: Record<string, unknown> = {}, mensaje = "") => {
    setOcupado(true);
    setAviso("");
    try {
      const e = await api<Estado>(accion, datos);
      setEstado(e);
      setSel([]);
      setNombreEq("");
      setConfir(null);
      if (mensaje) setAviso(mensaje);
    } catch (e) {
      setAviso(mensajeError(e));
    } finally {
      setOcupado(false);
    }
  };

  if (error) return <CajaError error={error} reintentar={cargar} />;
  if (!estado) return <Cargando />;
  const { mi_equipo: mio, equipos, disponibles, min, max } = estado;
  const libre = (disponibles ?? []).filter((d) => !sel.includes(d.id));

  return (
    <div className="space-y-5">
      <Aviso tono="azul">
        Para el <strong>proyecto final en grupo</strong>: formad equipos de <strong>{min} a {max} personas</strong>. Solo puedes estar en un equipo, y para elegir
        compañeros solo aparecen los que todavía no tienen ninguno. Si al final quedas sin equipo, el profesor te asignará uno al azar.
      </Aviso>
      {aviso && <Aviso tono={aviso.startsWith("✗") ? "rojo" : "verde"}>{aviso}</Aviso>}

      {/* Mi equipo */}
      {mio ? (
        <section className={cls.tarjeta}>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className={`${cls.h2} flex-1`}>Tu equipo: {mio.nombre}</h2>
            <Pildora tono={mio.miembros.length >= min ? "verde" : "ambar"}>{mio.miembros.length} de {min}-{max}</Pildora>
            {mio.yo_lider && <Pildora tono="azul">lo creaste tú</Pildora>}
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {mio.miembros.map((m) => (
              <li key={m.id} className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-[15px] dark:border-white/10 dark:bg-white/5">
                <span className="font-semibold">{nombre(m)}</span>
                {m.lider && <span title="quien creó el equipo" aria-label="creador del equipo">👑</span>}
                {(mio.yo_lider || m.id === estado.yo_id) && (
                  <button type="button" className={`${cls.btnMini} ml-auto`} disabled={ocupado} onClick={() => accion("equipos.quitar", { alumno_id: m.id }, m.id === estado.yo_id ? "✗ Te has salido del equipo." : "✗ Compañero quitado.")}>
                    {m.id === estado.yo_id ? "Salirme" : "Quitar"}
                  </button>
                )}
              </li>
            ))}
            <li>
              <button
                type="button"
                className={`${cls.btnMini} w-full justify-center border-dashed py-2`}
                disabled={ocupado || mio.miembros.length >= max || !sel.length}
                onClick={() => accion("equipos.anadir", { miembros: sel }, "✗ Compañeros añadidos ✅")}
              >
                {sel.length ? `Añadir ${sel.length} seleccionados` : "Elige abajo compañeros para añadir"}
              </button>
            </li>
          </ul>
          {mio.yo_lider && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {!confir ? (
                <button type="button" className={cls.btnPeligro} disabled={ocupado} onClick={() => setConfir("disolver")}>Disolver el equipo</button>
              ) : (
                <>
                  <span className="text-sm text-red-700 dark:text-red-300">¿Disolver? Tus compañeros se quedan sin equipo.</span>
                  <button type="button" className={cls.btnPeligro} disabled={ocupado} onClick={() => accion("equipos.disolver", {}, "✗ Equipo disuelto.")}>Sí, disolver</button>
                  <button type="button" className={cls.btn2} onClick={() => setConfir(null)}>Cancelar</button>
                </>
              )}
            </div>
          )}
        </section>
      ) : (
        <section className={cls.tarjeta}>
          <h2 className={cls.h2}>Todavía no tienes equipo</h2>
          <p className={`mt-1 text-[15px] ${cls.suave}`}>Ponle nombre al equipo y elige a {min - 1} o {max - 1} compañeros que estén libre.</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input className={cls.input} placeholder="Nombre del equipo" value={nombreEq} maxLength={40} onChange={(e) => setNombreEq(e.target.value)} />
            <button
              type="button"
              className={`${cls.btnAzul} whitespace-nowrap`}
              disabled={ocupado || sel.length < min - 1}
              onClick={() => accion("equipos.crear", { nombre: nombreEq.trim(), miembros: sel }, "✗ ¡Equipo creado!")}
            >
              Crear equipo con {sel.length} + tú
            </button>
          </div>
          {sel.length < min - 1 && <p className={`mt-2 text-sm ${cls.tenue}`}>Faltan {min - 1 - sel.length} como mínimo para poder crearlo.</p>}
        </section>
      )}

      {/* Compañeros libres */}
      <section className={cls.tarjeta}>
        <h2 className={cls.h2}>Compañeros sin equipo ({disponibles.length})</h2>
        {disponibles.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {disponibles.map((d) => {
              const on = sel.includes(d.id);
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSel((s) => (on ? s.filter((x) => x !== d.id) : mio && s.length + mio.miembros.length >= max ? s : [...s, d.id]))}
                  className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
                    on
                      ? "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500"
                      : "border-zinc-300 bg-white text-zinc-700 hover:border-blue-400 dark:border-white/15 dark:bg-slate-900 dark:text-zinc-200"
                  }`}
                >
                  {on ? "✓ " : ""}{nombre(d)}
                </button>
              );
            })}
          </div>
        ) : (
          <p className={`mt-2 text-[15px] ${cls.tenue}`}>Todo el mundo tiene equipo. ✅</p>
        )}
      </section>

      {/* Todos los equipos de la clase */}
      <section className={cls.tarjeta}>
        <h2 className={cls.h2}>Equipos de la clase ({equipos.length})</h2>
        {equipos.length ? (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {equipos.map((e) => (
              <div key={e.id} className={`rounded-xl border p-3 ${e.id === mio?.id ? "border-blue-400 bg-blue-50/60 dark:border-blue-500/50 dark:bg-blue-500/10" : "border-zinc-200 dark:border-white/10"}`}>
                <div className="flex items-center gap-2">
                  <strong>{e.nombre}</strong>
                  <Pildora tono={e.miembros.length >= min ? "verde" : "ambar"}>{e.miembros.length}</Pildora>
                </div>
                <ul className={`mt-1 text-sm ${cls.suave}`}>
                  {e.miembros.map((m) => (
                    <li key={m.id}>{m.lider ? "👑 " : "· "}{nombre(m)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className={`mt-2 text-[15px] ${cls.tenue}`}>Aún no hay equipos formados.</p>
        )}
      </section>
    </div>
  );
}
