"use client";

// Entregas de cada curso: crear, editar, abrir/cerrar, ocultar y borrar.

import { useState } from "react";
import { CURSOS, CURSO_IDS, PROYECTOS, sesionDe, type CursoId } from "@/lib/campus/catalogo";
import { api, fechaCorta, type EntregaResumen, type TipoEntrega } from "@/lib/campus/cliente";
import { RUBRICAS } from "@/lib/campus/rubricas";
import { Aviso, cls, mensajeError, Modal, Pildora } from "./ui";

const TIPOS: Record<TipoEntrega, string> = {
  github: "Repositorio de GitHub (+ web publicada opcional)",
  url: "Una dirección web (URL)",
  texto: "Texto libre",
};

export default function ProfEntregas({ entregas, onCambio }: { entregas: EntregaResumen[]; onCambio: () => void }) {
  const [editando, setEditando] = useState<EntregaResumen | "nueva" | null>(null);
  const [aviso, setAviso] = useState("");

  async function alternar(e: EntregaResumen, campo: "abierta" | "visible") {
    try {
      await api("prof.entrega.guardar", { ...e, [campo]: !e[campo] });
      onCambio();
    } catch (err) {
      setAviso(mensajeError(err));
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className={`max-w-2xl text-sm ${cls.suave}`}>
          Cada curso tiene sus entregas. El alumnado ve las <b>visibles</b> de su curso y puede entregar mientras
          estén <b>abiertas</b>; pasada la fecha límite se admiten, pero marcadas como fuera de plazo.
        </p>
        <button type="button" className={cls.btn} onClick={() => setEditando("nueva")}>+ Nueva entrega</button>
      </div>
      {aviso && <Aviso tono="rojo">{aviso}</Aviso>}

      {CURSO_IDS.map((c) => {
        const lista = entregas.filter((e) => e.curso === c);
        return (
          <section key={c}>
            <h2 className={cls.h2}>{CURSOS[c].nombre}</h2>
            {!lista.length ? (
              <p className={`mt-2 text-sm ${cls.tenue}`}>Sin entregas todavía.</p>
            ) : (
              <div className="mt-3 space-y-2">
                {lista.map((e) => {
                  const sesion = sesionDe(e.proyecto, e.sesion);
                  return (
                    <div key={e.id} className={`${cls.tarjeta} flex flex-col gap-3 !p-4 md:flex-row md:items-center`}>
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-1.5">
                          {e.abierta ? <Pildora tono="verde">Abierta</Pildora> : <Pildora>Cerrada</Pildora>}
                          {!e.visible && <Pildora tono="ambar">Oculta</Pildora>}
                          {e.rubrica && <Pildora tono="azul">Rúbrica</Pildora>}
                        </div>
                        <p className="mt-1 text-[15px] font-bold">{e.titulo}</p>
                        <p className={`text-xs ${cls.tenue}`}>
                          {PROYECTOS[e.proyecto]?.titulo ?? e.proyecto}
                          {sesion ? ` · sesión ${sesion.n}` : " · todo el proyecto"}
                          {" · "}
                          {e.fecha_limite ? `límite ${fechaCorta(e.fecha_limite)}` : "sin fecha límite"}
                          {" · "}
                          {e.envios} envíos · {e.publicadas} notas publicadas
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <button type="button" className={cls.btnMini} onClick={() => setEditando(e)}>Editar</button>
                        <button type="button" className={cls.btnMini} onClick={() => alternar(e, "abierta")}>{e.abierta ? "Cerrar" : "Abrir"}</button>
                        <button type="button" className={cls.btnMini} onClick={() => alternar(e, "visible")}>{e.visible ? "Ocultar" : "Mostrar"}</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}

      {editando && (
        <ModalEntrega
          entrega={editando === "nueva" ? null : editando}
          onCerrar={() => setEditando(null)}
          onGuardado={() => {
            setEditando(null);
            onCambio();
          }}
        />
      )}
    </div>
  );
}

function ModalEntrega({ entrega, onCerrar, onGuardado }: { entrega: EntregaResumen | null; onCerrar: () => void; onGuardado: () => void }) {
  const [curso, setCurso] = useState<CursoId>(entrega?.curso ?? "presencial");
  const [ambos, setAmbos] = useState(!entrega);
  const [proyecto, setProyecto] = useState(entrega?.proyecto ?? Object.keys(PROYECTOS)[0]);
  const [sesion, setSesion] = useState(entrega?.sesion ?? "");
  const [titulo, setTitulo] = useState(entrega?.titulo ?? "");
  const [instrucciones, setInstrucciones] = useState(entrega?.instrucciones ?? "");
  const [tipo, setTipo] = useState<TipoEntrega>(entrega?.tipo ?? "github");
  const [rubrica, setRubrica] = useState(entrega?.rubrica ?? PROYECTOS[proyecto]?.rubrica ?? "");
  const [limite, setLimite] = useState(entrega?.fecha_limite ? entrega.fecha_limite.slice(0, 16).replace(" ", "T") : "");
  const [abierta, setAbierta] = useState(entrega?.abierta ?? true);
  const [visible, setVisible] = useState(entrega?.visible ?? true);
  const [orden, setOrden] = useState(String(entrega?.orden ?? 10));
  const [error, setError] = useState("");
  const [ocupado, setOcupado] = useState(false);

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setOcupado(true);
    setError("");
    const datos = { proyecto, sesion, titulo, instrucciones, tipo, rubrica, fecha_limite: limite, abierta, visible, orden: Number(orden) || 0 };
    try {
      await api("prof.entrega.guardar", { ...datos, id: entrega?.id, curso });
      if (!entrega && ambos) {
        for (const otro of CURSO_IDS.filter((c) => c !== curso)) await api("prof.entrega.guardar", { ...datos, curso: otro });
      }
      onGuardado();
    } catch (err) {
      setError(mensajeError(err));
      setOcupado(false);
    }
  }

  async function borrar() {
    if (!entrega) return;
    if (!confirm(`¿Borrar la entrega «${entrega.titulo}» (${CURSOS[entrega.curso].corto})?`)) return;
    try {
      await api("prof.entrega.borrar", { id: entrega.id });
      onGuardado();
    } catch (err) {
      const m = mensajeError(err);
      if (entrega.envios > 0 && confirm(`${m}\n\n¿Borrarla IGUALMENTE con todos sus envíos y notas? No se puede deshacer.`)) {
        try {
          await api("prof.entrega.borrar", { id: entrega.id, forzar: true });
          onGuardado();
        } catch (err2) {
          setError(mensajeError(err2));
        }
      } else {
        setError(m);
      }
    }
  }

  const p = PROYECTOS[proyecto];

  return (
    <Modal titulo={entrega ? "Editar entrega" : "Nueva entrega"} onCerrar={onCerrar} ancho="max-w-3xl">
      <form onSubmit={guardar} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="e-curso" className={cls.label}>Curso</label>
            <select id="e-curso" className={cls.input} value={curso} onChange={(e) => setCurso(e.target.value as CursoId)}>
              {CURSO_IDS.map((c) => <option key={c} value={c}>{CURSOS[c].corto}</option>)}
            </select>
            {!entrega && (
              <label className="mt-2 flex items-center gap-2 text-sm">
                <input type="checkbox" checked={ambos} onChange={(e) => setAmbos(e.target.checked)} className="h-4 w-4 accent-blue-700" />
                Crearla también en {CURSO_IDS.filter((c) => c !== curso).map((c) => CURSOS[c].corto).join(" y ")}
              </label>
            )}
          </div>
          <div>
            <label htmlFor="e-orden" className={cls.label}>Orden <span className="font-normal text-zinc-400">· menor sale antes</span></label>
            <input id="e-orden" className={cls.input} inputMode="numeric" value={orden} onChange={(e) => setOrden(e.target.value)} />
          </div>
          <div>
            <label htmlFor="e-proy" className={cls.label}>Proyecto</label>
            <select
              id="e-proy"
              className={cls.input}
              value={proyecto}
              onChange={(e) => {
                setProyecto(e.target.value);
                setSesion("");
              }}
            >
              {Object.values(PROYECTOS).map((x) => <option key={x.id} value={x.id}>{x.titulo}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="e-ses" className={cls.label}>Sesión</label>
            <select id="e-ses" className={cls.input} value={sesion} onChange={(e) => setSesion(e.target.value)}>
              <option value="">— Entrega de todo el proyecto —</option>
              {p?.sesiones.map((s) => <option key={s.id} value={s.id}>Sesión {s.n} · {s.titulo}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="e-tit" className={cls.label}>Título</label>
          <input id="e-tit" className={cls.input} required maxLength={160} value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Entrega 2 · …" />
        </div>
        <div>
          <label htmlFor="e-ins" className={cls.label}>Instrucciones para el alumnado</label>
          <textarea id="e-ins" className={`${cls.input} text-sm`} rows={6} value={instrucciones} onChange={(e) => setInstrucciones(e.target.value)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="e-tipo" className={cls.label}>Qué entregan</label>
            <select id="e-tipo" className={cls.input} value={tipo} onChange={(e) => setTipo(e.target.value as TipoEntrega)}>
              {(Object.keys(TIPOS) as TipoEntrega[]).map((t) => <option key={t} value={t}>{TIPOS[t]}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="e-rub" className={cls.label}>Cómo se califica</label>
            <select id="e-rub" className={cls.input} value={rubrica} onChange={(e) => setRubrica(e.target.value)}>
              <option value="">Nota directa (0-10)</option>
              {Object.values(RUBRICAS).map((r) => <option key={r.id} value={r.id}>{r.titulo}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="e-lim" className={cls.label}>Fecha límite <span className="font-normal text-zinc-400">· opcional</span></label>
            <input id="e-lim" type="datetime-local" className={cls.input} value={limite} onChange={(e) => setLimite(e.target.value)} />
          </div>
          <div className="flex flex-col justify-end gap-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={abierta} onChange={(e) => setAbierta(e.target.checked)} className="h-4 w-4 accent-blue-700" />
              Abierta (admite entregas y cambios)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} className="h-4 w-4 accent-blue-700" />
              Visible para el alumnado
            </label>
          </div>
        </div>
        {entrega && entrega.envios > 0 && (entrega.tipo !== tipo || entrega.curso !== curso) && (
          <Aviso tono="ambar">Ya hay {entrega.envios} envíos: cambiar el tipo o el curso puede dejarlos descolocados.</Aviso>
        )}
        {error && <p role="alert" className="text-sm font-semibold text-red-700 dark:text-red-300">{error}</p>}
        <div className="flex flex-wrap justify-between gap-2">
          <button type="submit" className={cls.btn} disabled={ocupado}>{ocupado ? "Guardando…" : entrega ? "Guardar" : "Crear entrega"}</button>
          {entrega && <button type="button" className={cls.btnPeligro} onClick={borrar}>Borrar entrega</button>}
        </div>
      </form>
    </Modal>
  );
}
