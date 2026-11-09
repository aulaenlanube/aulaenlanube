"use client";

// Panel del profesor · «Vídeos» (creado 09-11-2026): permisos del alumnado para
// salir en los vídeos del canal de YouTube. Por vídeo, quién ha contestado y qué
// deja que salga; y el formulario para pedir permiso a alumnos de un grupo (lo
// mismo que hace tools/campus/permisos-video.mjs crear).

import { useCallback, useEffect, useMemo, useState } from "react";
import { CURSOS } from "@/lib/campus/catalogo";
import { api, fechaCorta, type Alumno, type EstadoPermiso, type GrupoResumen, type PermisoVideoProfesor, type VideoPermisos } from "@/lib/campus/cliente";
import { descargarCsv } from "./exportar";
import { Aviso, CajaError, Cargando, cls, mensajeError, Modal, Pildora } from "./ui";

type Datos = { videos: VideoPermisos[]; peticiones: PermisoVideoProfesor[] };
type Resultado = { creadas: number; ya_estaban: number; actualizadas: number };

const ESTADO: Record<EstadoPermiso, { tono: "verde" | "rojo" | "ambar"; texto: string }> = {
  si: { tono: "verde", texto: "Sí" },
  no: { tono: "rojo", texto: "No" },
  pendiente: { tono: "ambar", texto: "Pendiente" },
};

const nombreAlumno = (p: { nombre: string; apellidos: string }) => (p.apellidos ? `${p.apellidos}, ${p.nombre}` : p.nombre);

export default function PermisosVideoProf({ grupos }: { grupos: GrupoResumen[] }) {
  const [datos, setDatos] = useState<Datos | null>(null);
  const [error, setError] = useState("");
  const [vuelta, setVuelta] = useState(0);
  const [aviso, setAviso] = useState<{ tono: "verde" | "rojo"; m: string } | null>(null);
  const [modal, setModal] = useState<{ video: VideoPermisos | null } | null>(null);

  const cargar = useCallback(() => {
    setError("");
    setVuelta((v) => v + 1);
  }, []);
  const cerrar = useCallback(() => setModal(null), []);

  useEffect(() => {
    let vivo = true;
    api<Datos>("prof.permisos_video")
      .then((d) => vivo && setDatos(d))
      .catch((e) => vivo && setError(mensajeError(e)));
    return () => {
      vivo = false;
    };
  }, [vuelta]);

  async function quitar(p: PermisoVideoProfesor) {
    if (!confirm(`¿Quitar la petición de «${p.titulo}» a ${p.nombre} ${p.apellidos}? Todavía no ha contestado.`)) return;
    try {
      await api("prof.permiso_video.quitar", { id: p.id });
      setAviso(null);
      cargar();
    } catch (e) {
      setAviso({ tono: "rojo", m: mensajeError(e) });
    }
  }

  if (error) return <CajaError error={error} reintentar={cargar} />;
  if (!datos) return <Cargando />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className={`max-w-3xl text-sm ${cls.suave}`}>
          Antes de publicar un vídeo con webs del alumnado, pide permiso a cada alumno elegido. Lo ve al entrar en su aula y contesta
          sí o no y qué puede salir (su nombre como él quiera, su repositorio, lo que cuenta su web o solo la web). Su nota no sale nunca y
          puede cambiar la respuesta cuando quiera. Desde la terminal: <code className="font-mono text-xs">node tools/campus/permisos-video.mjs</code>.
        </p>
        <button type="button" className={`${cls.btn} self-start sm:self-auto`} onClick={() => setModal({ video: null })}>
          + Pedir permiso
        </button>
      </div>
      {aviso && <Aviso tono={aviso.tono}>{aviso.m}</Aviso>}

      {!datos.videos.length ? (
        <Aviso tono="gris">Todavía no has pedido permiso para ningún vídeo.</Aviso>
      ) : (
        datos.videos.map((v) => (
          <TarjetaVideo
            key={v.clave_video}
            video={v}
            peticiones={datos.peticiones.filter((p) => p.clave_video === v.clave_video)}
            onAnadir={() => setModal({ video: v })}
            onQuitar={quitar}
          />
        ))
      )}

      {modal && (
        <ModalPeticion
          video={modal.video}
          grupos={grupos}
          ya={datos.peticiones}
          onCerrar={cerrar}
          onHecho={(r, clave) => {
            cerrar();
            const partes = [
              `${r.creadas} ${r.creadas === 1 ? "petición nueva" : "peticiones nuevas"}`,
              ...(r.ya_estaban ? [`${r.ya_estaban} ya la tenían (no se toca su respuesta)`] : []),
              ...(r.actualizadas ? [`título o descripción actualizados en ${r.actualizadas}`] : []),
            ];
            setAviso({ tono: "verde", m: `«${clave}»: ${partes.join(" · ")}.` });
            cargar();
          }}
        />
      )}
    </div>
  );
}

function SiNo({ v }: { v: boolean }) {
  return v ? <span className="font-semibold text-emerald-700 dark:text-emerald-300">Sí</span> : <span className={cls.tenue}>No</span>;
}

function TarjetaVideo({
  video: v,
  peticiones,
  onAnadir,
  onQuitar,
}: {
  video: VideoPermisos;
  peticiones: PermisoVideoProfesor[];
  onAnadir: () => void;
  onQuitar: (p: PermisoVideoProfesor) => void;
}) {
  function exportar() {
    const cab = ["Apellidos", "Nombre", "Usuario", "Grupo", "Estado", "Nombre que quiere", "Repositorio", "Lo que cuenta su web", "Solo la web", "Que no salga", "Respondido"];
    const filas = peticiones.map((p) => {
      const si = p.estado === "si";
      return [
        p.apellidos,
        p.nombre,
        p.usuario,
        p.grupo ?? "",
        p.estado === "si" ? "sí" : p.estado,
        si && p.mostrar_nombre ? p.nombre_mostrar ?? "" : "",
        si ? (p.mostrar_repo ? "sí" : "no") : "",
        si ? (p.mostrar_info ? "sí" : "no") : "",
        si ? (p.solo_web ? "sí" : "no") : "",
        si ? p.observaciones ?? "" : "",
        p.respondido_at ?? "",
      ];
    });
    descargarCsv(`permisos-video-${v.clave_video}.csv`, [cab, ...filas]);
  }

  return (
    <section className={cls.tarjeta}>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-1.5">
            <Pildora tono="verde">{v.si} sí</Pildora>
            <Pildora tono="rojo">{v.no} no</Pildora>
            <Pildora tono="ambar">{v.pendientes} {v.pendientes === 1 ? "pendiente" : "pendientes"}</Pildora>
          </div>
          <h2 className="mt-2 text-xl font-extrabold tracking-tight">{v.titulo}</h2>
          <p className={`text-xs ${cls.tenue}`}>
            Clave <code className="font-mono">{v.clave_video}</code> · pedido el {fechaCorta(v.created_at, false)} · {v.total} {v.total === 1 ? "alumno" : "alumnos"}
          </p>
          {v.descripcion && <p className={`mt-2 max-w-3xl whitespace-pre-line text-sm ${cls.suave}`}>{v.descripcion}</p>}
        </div>
        <div className="flex flex-wrap gap-1.5 md:flex-none md:justify-end">
          <button type="button" className={cls.btnMini} onClick={onAnadir}>Añadir alumnos o cambiar el texto</button>
          <button type="button" className={cls.btnMini} onClick={exportar}>Exportar CSV</button>
        </div>
      </div>

      <div className="relative mt-4 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
        <table className="w-full min-w-[960px] border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-100 text-left align-bottom dark:bg-white/10">
              <th className="px-4 py-2.5 font-bold">Alumno</th>
              <th className="px-3 py-2.5 font-bold">Grupo</th>
              <th className="px-3 py-2.5 font-bold">Estado</th>
              <th className="px-3 py-2.5 font-bold">Nombre que quiere</th>
              <th className="px-3 py-2.5 font-bold">Repo</th>
              <th className="px-3 py-2.5 font-bold">Info</th>
              <th className="px-3 py-2.5 font-bold">Solo web</th>
              <th className="px-3 py-2.5 font-bold">Que no salga</th>
              <th className="px-3 py-2.5 font-bold">Respondido</th>
              <th className="px-3 py-2.5 font-bold"><span className="sr-only">Acciones</span></th>
            </tr>
          </thead>
          <tbody>
            {peticiones.map((p) => {
              const si = p.estado === "si";
              const e = ESTADO[p.estado];
              return (
                <tr key={p.id} className={`border-t border-zinc-200 align-top dark:border-white/10 ${p.activo ? "" : "opacity-60"}`}>
                  <td className="px-4 py-2">
                    <span className="block font-semibold">{nombreAlumno(p)}</span>
                    <code className={`font-mono text-xs ${cls.tenue}`}>{p.usuario}</code>
                  </td>
                  <td className={`px-3 py-2 ${cls.tenue}`}>{p.grupo ?? "—"}</td>
                  <td className="px-3 py-2"><Pildora tono={e.tono}>{e.texto}</Pildora></td>
                  <td className="px-3 py-2">{si && p.mostrar_nombre && p.nombre_mostrar ? <span className="font-semibold">«{p.nombre_mostrar}»</span> : <span className={cls.tenue}>—</span>}</td>
                  <td className="px-3 py-2">{si ? <SiNo v={p.mostrar_repo} /> : <span className={cls.tenue}>—</span>}</td>
                  <td className="px-3 py-2">{si ? <SiNo v={p.mostrar_info} /> : <span className={cls.tenue}>—</span>}</td>
                  <td className="px-3 py-2">{si ? <SiNo v={p.solo_web} /> : <span className={cls.tenue}>—</span>}</td>
                  <td className="max-w-[16rem] whitespace-pre-line px-3 py-2">{si && p.observaciones ? p.observaciones : <span className={cls.tenue}>—</span>}</td>
                  <td className={`whitespace-nowrap px-3 py-2 ${cls.tenue}`}>{p.respondido_at ? fechaCorta(p.respondido_at) : "—"}</td>
                  <td className="px-3 py-2 text-right">
                    {p.estado === "pendiente" && (
                      <button type="button" className={cls.btnMini} onClick={() => onQuitar(p)}>Quitar</button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/** «Las mejores webs del proyecto 1» → «las-mejores-webs-del-proyecto-1» */
function aClave(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/, "");
}

/** Pedir permiso para un vídeo (nuevo o ya existente) a alumnos de uno o varios grupos. */
function ModalPeticion({
  video,
  grupos,
  ya,
  onCerrar,
  onHecho,
}: {
  video: VideoPermisos | null;
  grupos: GrupoResumen[];
  ya: PermisoVideoProfesor[];
  onCerrar: () => void;
  onHecho: (r: Resultado, clave: string) => void;
}) {
  const activos = useMemo(() => grupos.filter((g) => !g.archivado), [grupos]);
  const [clave, setClave] = useState(video?.clave_video ?? "");
  const [claveTocada, setClaveTocada] = useState(!!video);
  const [titulo, setTitulo] = useState(video?.titulo ?? "");
  const [descripcion, setDescripcion] = useState(video?.descripcion ?? "");
  const [grupoId, setGrupoId] = useState<number | null>(activos[0]?.id ?? grupos[0]?.id ?? null);
  const [alumnos, setAlumnos] = useState<Alumno[] | null>(null);
  const [errorAlumnos, setErrorAlumnos] = useState("");
  const [elegidos, setElegidos] = useState<Set<number>>(new Set());
  const [error, setError] = useState("");
  const [ocupado, setOcupado] = useState(false);

  // Quién tiene ya la petición de esta clave (no se puede volver a elegir).
  const conPeticion = useMemo(() => new Set(ya.filter((p) => p.clave_video === clave.trim()).map((p) => p.alumno_id)), [ya, clave]);

  useEffect(() => {
    if (!grupoId) return;
    let vivo = true;
    api<{ alumnos: Alumno[] }>("prof.grupo", { id: grupoId })
      .then((r) => {
        if (!vivo) return;
        setAlumnos(r.alumnos.filter((a) => a.activo));
        setErrorAlumnos("");
      })
      .catch((e) => vivo && setErrorAlumnos(mensajeError(e)));
    return () => {
      vivo = false;
    };
  }, [grupoId]);

  const libres = (alumnos ?? []).filter((a) => !conPeticion.has(a.id));
  const alternar = (id: number, v: boolean) =>
    setElegidos((s) => {
      const n = new Set(s);
      if (v) n.add(id);
      else n.delete(id);
      return n;
    });
  const todos = (v: boolean) =>
    setElegidos((s) => {
      const n = new Set(s);
      for (const a of libres) {
        if (v) n.add(a.id);
        else n.delete(a.id);
      }
      return n;
    });
  const nuevos = [...elegidos].filter((id) => !conPeticion.has(id));

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setOcupado(true);
    setError("");
    try {
      const c = clave.trim();
      const r = await api<Resultado>("prof.permisos_video.crear", { clave_video: c, titulo, descripcion, alumno_ids: nuevos });
      onHecho(r, c);
    } catch (err) {
      setError(mensajeError(err));
      setOcupado(false);
    }
  }

  return (
    <Modal titulo={video ? "Añadir alumnos o cambiar el texto" : "Pedir permiso para un vídeo"} onCerrar={onCerrar} ancho="max-w-3xl">
      <form onSubmit={guardar} className="space-y-4">
        <div>
          <label htmlFor="pv-titulo" className={cls.label}>Título del vídeo</label>
          <input
            id="pv-titulo"
            className={cls.input}
            required
            maxLength={200}
            value={titulo}
            onChange={(e) => {
              setTitulo(e.target.value);
              if (!claveTocada) setClave(aClave(e.target.value));
            }}
            placeholder="Las mejores webs del proyecto 1"
          />
        </div>
        <div>
          <label htmlFor="pv-desc" className={cls.label}>Descripción para el alumnado <span className="font-normal text-zinc-400">· qué se va a ver</span></label>
          <textarea
            id="pv-desc"
            className={`${cls.input} text-sm`}
            rows={3}
            maxLength={2000}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Un repaso a las webs de marca personal del proyecto 1: qué tienen de bueno y qué se puede aprender de ellas."
          />
        </div>
        <div>
          <label htmlFor="pv-clave" className={cls.label}>Clave del vídeo <span className="font-normal text-zinc-400">· minúsculas, números y guiones</span></label>
          <input
            id="pv-clave"
            className={`${cls.input} font-mono text-sm`}
            required
            maxLength={60}
            pattern="[a-z0-9][a-z0-9\-]{0,59}"
            value={clave}
            disabled={!!video}
            onChange={(e) => {
              setClave(e.target.value.toLowerCase());
              setClaveTocada(true);
            }}
            autoCapitalize="none"
            spellCheck={false}
          />
          {video && <p className={`mt-1 text-xs ${cls.tenue}`}>Si cambias el título o la descripción, cambian para todo el alumnado de este vídeo (sin tocar sus respuestas).</p>}
        </div>

        <fieldset className="rounded-2xl border border-zinc-200 p-4 dark:border-white/10">
          <legend className="px-1 text-sm font-bold">Alumnado</legend>
          {!grupos.length ? (
            <p className={`text-sm ${cls.tenue}`}>Todavía no hay grupos.</p>
          ) : (
            <>
              <div className="flex flex-wrap items-end gap-3">
                <div className="min-w-[14rem] flex-1">
                  <label htmlFor="pv-grupo" className={cls.label}>Grupo</label>
                  <select
                    id="pv-grupo"
                    className={cls.input}
                    value={grupoId ?? ""}
                    onChange={(e) => {
                      setAlumnos(null);
                      setGrupoId(Number(e.target.value));
                    }}
                  >
                    {grupos.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.nombre} · {CURSOS[g.curso].corto}{g.archivado ? " (archivado)" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-1.5">
                  <button type="button" className={cls.btnMini} onClick={() => todos(true)} disabled={!libres.length}>Todos</button>
                  <button type="button" className={cls.btnMini} onClick={() => todos(false)} disabled={!libres.length}>Ninguno</button>
                </div>
              </div>
              {errorAlumnos ? (
                <p role="alert" className="mt-3 text-sm font-semibold text-red-700 dark:text-red-300">{errorAlumnos}</p>
              ) : !alumnos ? (
                <Cargando texto="Cargando el alumnado…" />
              ) : !alumnos.length ? (
                <p className={`mt-3 text-sm ${cls.tenue}`}>Este grupo no tiene alumnado activo.</p>
              ) : (
                <ul className="mt-3 grid max-h-72 gap-1 overflow-y-auto sm:grid-cols-2">
                  {alumnos.map((a) => {
                    const tiene = conPeticion.has(a.id);
                    return (
                      <li key={a.id}>
                        <label className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm ${tiene ? "opacity-60" : "cursor-pointer hover:bg-zinc-50 dark:hover:bg-white/5"}`}>
                          <input
                            type="checkbox"
                            className="h-4 w-4 accent-blue-700"
                            checked={tiene || elegidos.has(a.id)}
                            disabled={tiene}
                            onChange={(e) => alternar(a.id, e.target.checked)}
                          />
                          <span className="min-w-0 flex-1 truncate">{nombreAlumno(a)}</span>
                          {tiene && <span className={`text-xs ${cls.tenue}`}>ya la tiene</span>}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
              <p className={`mt-2 text-xs ${cls.tenue}`}>
                {nuevos.length} {nuevos.length === 1 ? "alumno elegido" : "alumnos elegidos"} en total (puedes cambiar de grupo y seguir eligiendo).
              </p>
            </>
          )}
        </fieldset>

        {error && <p role="alert" className="text-sm font-semibold text-red-700 dark:text-red-300">{error}</p>}
        <div className="flex flex-wrap gap-2">
          <button type="submit" className={cls.btn} disabled={ocupado || (!video && !nuevos.length)}>
            {ocupado ? "Guardando…" : nuevos.length ? `Pedir permiso a ${nuevos.length}` : "Guardar el texto"}
          </button>
          <button type="button" className={cls.btn2} onClick={onCerrar}>Cancelar</button>
        </div>
      </form>
    </Modal>
  );
}
