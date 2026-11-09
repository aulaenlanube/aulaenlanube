"use client";

// Permisos para vídeos (creado 09-11-2026). Cuando el profesor va a publicar en
// el canal de YouTube un vídeo con webs del alumnado, cada alumno elegido ve al
// entrar en su aula una ventana para dar (o no) permiso y decir qué puede salir.
// La ventana no se cierra sin contestar, pero contestar es un clic («Sí, puede
// salir» o «No, prefiero que no salga») y se puede cambiar después en Cuenta.

import { useCallback, useEffect, useState } from "react";
import { api, fechaCorta, type EstadoPermiso, type PermisoVideo, type RespuestaPermiso } from "@/lib/campus/cliente";
import { CajaError, cls, mensajeError, Modal, Pildora } from "./ui";

/** Las peticiones del alumno (null mientras cargan). Solo pregunta con sesión abierta. */
export function usePermisosVideo(activo: boolean) {
  const [permisos, setPermisos] = useState<PermisoVideo[] | null>(null);
  const [error, setError] = useState("");
  const [vuelta, setVuelta] = useState(0);
  useEffect(() => {
    if (!activo) return;
    let vivo = true;
    api<{ permisos: PermisoVideo[] }>("alumno.permisos_video")
      .then((r) => {
        if (!vivo) return;
        setPermisos(r.permisos);
        setError("");
      })
      .catch((e) => vivo && setError(mensajeError(e)));
    return () => {
      vivo = false;
    };
  }, [activo, vuelta]);
  const recargar = useCallback(() => setVuelta((v) => v + 1), []);
  const actualizar = useCallback((p: PermisoVideo) => setPermisos((l) => l && l.map((x) => (x.id === p.id ? p : x))), []);
  return { permisos, error, recargar, actualizar };
}

const ESTADOS: Record<EstadoPermiso, { tono: "verde" | "rojo" | "ambar"; texto: string }> = {
  si: { tono: "verde", texto: "Sí puede salir" },
  no: { tono: "rojo", texto: "No sale" },
  pendiente: { tono: "ambar", texto: "Sin contestar" },
};

/** Ventana al entrar en el aula con la primera petición sin contestar. */
export function ModalPermisoVideo({
  permiso,
  pendientes,
  nombreCompleto,
  onRespondido,
}: {
  permiso: PermisoVideo;
  pendientes: number;
  nombreCompleto: string;
  onRespondido: (p: PermisoVideo) => void;
}) {
  return (
    <Modal titulo="¿Puede salir tu web en un vídeo?">
      {pendientes > 1 && <p className={`-mt-2 mb-3 text-xs font-semibold ${cls.tenue}`}>Tienes {pendientes} vídeos por contestar: este es el primero.</p>}
      <FormPermiso key={permiso.id} permiso={permiso} nombreCompleto={nombreCompleto} conVideo onGuardado={onRespondido} />
    </Modal>
  );
}

/** Apartado de Cuenta: lo que ha contestado a cada vídeo, con la opción de cambiarlo. */
export function TarjetaPermisosVideo({
  permisos,
  error,
  recargar,
  nombreCompleto,
  onRespondido,
}: {
  permisos: PermisoVideo[] | null;
  error: string;
  recargar: () => void;
  nombreCompleto: string;
  onRespondido: (p: PermisoVideo) => void;
}) {
  if (error && !permisos) {
    return (
      <section className={cls.tarjeta}>
        <h2 className={cls.h2}>Permisos para vídeos</h2>
        <CajaError error={error} reintentar={recargar} />
      </section>
    );
  }
  if (!permisos?.length) return null;
  return (
    <section className={cls.tarjeta} id="permisos-video">
      <h2 className={cls.h2}>Permisos para vídeos</h2>
      <p className={`mt-1 max-w-3xl text-sm ${cls.suave}`}>
        Lo que has contestado sobre si tu web puede salir en los vídeos del canal de YouTube <b>Aula en la Nube</b>. Tu nota no sale nunca.
        Puedes cambiar tu respuesta cuando quieras.
      </p>
      <div className="mt-4 space-y-3">
        {permisos.map((p) => (
          <FilaPermiso key={p.id} permiso={p} nombreCompleto={nombreCompleto} onRespondido={onRespondido} />
        ))}
      </div>
    </section>
  );
}

function FilaPermiso({ permiso: p, nombreCompleto, onRespondido }: { permiso: PermisoVideo; nombreCompleto: string; onRespondido: (p: PermisoVideo) => void }) {
  const [editando, setEditando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const e = ESTADOS[p.estado];
  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-white/10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-[16px] font-bold">{p.titulo}</p>
          {p.descripcion && <p className={`mt-0.5 whitespace-pre-line text-sm ${cls.tenue}`}>{p.descripcion}</p>}
        </div>
        <span className="self-start">
          <Pildora tono={e.tono}>{e.texto}</Pildora>
        </span>
      </div>
      {editando ? (
        <div className="mt-4 border-t border-zinc-200 pt-4 dark:border-white/10">
          <FormPermiso
            permiso={p}
            nombreCompleto={nombreCompleto}
            onGuardado={(n) => {
              onRespondido(n);
              setEditando(false);
              setGuardado(true);
            }}
            onCancelar={() => setEditando(false)}
          />
        </div>
      ) : (
        <>
          <ResumenRespuesta permiso={p} />
          {guardado && <p role="status" className="mt-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">✓ Respuesta guardada.</p>}
          <button
            type="button"
            className={`${cls.btn2} mt-3`}
            onClick={() => {
              setGuardado(false);
              setEditando(true);
            }}
          >
            {p.estado === "pendiente" ? "Contestar" : "Cambiar mi respuesta"}
          </button>
        </>
      )}
    </div>
  );
}

/** «Has dicho que sí: con tu nombre…» */
function ResumenRespuesta({ permiso: p }: { permiso: PermisoVideo }) {
  if (p.estado === "pendiente") return <p className={`mt-3 text-sm ${cls.suave}`}>Todavía no has contestado.</p>;
  const cuando = p.respondido_at ? ` (${fechaCorta(p.respondido_at)})` : "";
  if (p.estado === "no") return <p className={`mt-3 text-sm ${cls.suave}`}>Has dicho que <b>no</b>: tu web no saldrá en este vídeo{cuando}.</p>;
  const sale: string[] = p.solo_web
    ? ["Solo la web: sin tu nombre, ni tu repositorio, ni datos tuyos."]
    : [
        ...(p.mostrar_nombre && p.nombre_mostrar ? [`Tu nombre, así: «${p.nombre_mostrar}».`] : []),
        ...(p.mostrar_repo ? ["El nombre y el enlace de tu repositorio de GitHub, y su historial (commits, ramas, PR)."] : []),
        ...(p.mostrar_info ? ["Lo que cuenta tu web sobre ti (estudios, experiencia, aficiones, tu historia)."] : []),
      ];
  return (
    <div className={`mt-3 text-sm ${cls.suave}`}>
      <p>Has dicho que <b>sí</b>{cuando}. Además de tu web, puede salir:</p>
      <ul className="mt-1 list-disc space-y-0.5 pl-5">
        {sale.map((s) => <li key={s}>{s}</li>)}
      </ul>
      {p.observaciones && (
        <p className="mt-2">
          <b>Prefieres que no salga:</b> <span className="whitespace-pre-line">{p.observaciones}</span>
        </p>
      )}
    </div>
  );
}

type Opcion = "nombre" | "repo" | "info" | "solo";

/** El formulario: qué puede salir y los dos botones para contestar. */
function FormPermiso({
  permiso: p,
  nombreCompleto,
  conVideo = false,
  onGuardado,
  onCancelar,
}: {
  permiso: PermisoVideo;
  nombreCompleto: string;
  conVideo?: boolean;
  onGuardado: (p: PermisoVideo) => void;
  onCancelar?: () => void;
}) {
  // Si ya dijo que sí, parte de lo que contestó; si no, del valor por defecto
  // (que salga su nombre completo).
  const si = p.estado === "si";
  const [nombre, setNombre] = useState(si ? p.mostrar_nombre : true);
  const [nombreMostrar, setNombreMostrar] = useState((si && p.nombre_mostrar) || nombreCompleto);
  const [repo, setRepo] = useState(si && p.mostrar_repo);
  const [info, setInfo] = useState(si && p.mostrar_info);
  const [soloWeb, setSoloWeb] = useState(si && p.solo_web);
  const [obs, setObs] = useState((si && p.observaciones) || "");
  const [estado, setEstado] = useState<{ t: "idle" | "enviando" } | { t: "error"; e: string }>({ t: "idle" });
  const id = `pv-${p.id}`;

  // Al tocar algo, el aviso de error deja de valer.
  const tocar = () => setEstado((e) => (e.t === "error" ? { t: "idle" } : e));

  // «Solo la web» excluye lo demás, y marcar otra cosa la desmarca.
  const marcar = (que: Opcion, v: boolean) => {
    tocar();
    if (que === "solo") {
      setSoloWeb(v);
      if (v) {
        setNombre(false);
        setRepo(false);
        setInfo(false);
      }
      return;
    }
    if (v) setSoloWeb(false);
    if (que === "nombre") setNombre(v);
    else if (que === "repo") setRepo(v);
    else setInfo(v);
  };
  const nada = !nombre && !repo && !info && !soloWeb;

  async function contestar(acepta: boolean) {
    if (acepta && nombre && !nombreMostrar.trim()) {
      setEstado({ t: "error", e: "Escribe cómo quieres que salga tu nombre, o desmarca «Mi nombre»." });
      return;
    }
    setEstado({ t: "enviando" });
    const datos: RespuestaPermiso = {
      acepta,
      mostrar_nombre: nombre,
      nombre_mostrar: nombreMostrar,
      mostrar_repo: repo,
      mostrar_info: info,
      solo_web: soloWeb,
      observaciones: obs,
    };
    try {
      const r = await api<{ permiso: PermisoVideo }>("alumno.permiso_video.responder", { id: p.id, ...datos });
      onGuardado(r.permiso);
    } catch (err) {
      setEstado({ t: "error", e: mensajeError(err) });
    }
  }

  const caja =
    "flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-200 px-3 py-2.5 transition hover:border-blue-300 dark:border-white/10 dark:hover:border-blue-500/40 has-checked:border-blue-300 has-checked:bg-blue-50/70 dark:has-checked:border-blue-500/40 dark:has-checked:bg-blue-500/10";
  const check = "mt-0.5 h-4 w-4 flex-none accent-blue-700";
  const opcion = (que: Opcion, marcado: boolean, titulo: string, detalle: string) => (
    <label className={caja}>
      <input type="checkbox" className={check} checked={marcado} onChange={(e) => marcar(que, e.target.checked)} />
      <span>
        <span className="block text-[15px] font-semibold">{titulo}</span>
        <span className={`block text-sm ${cls.tenue}`}>{detalle}</span>
      </span>
    </label>
  );

  return (
    <div className="space-y-4">
      {conVideo && (
        <>
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-500/30 dark:bg-blue-500/10">
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">El vídeo</p>
            <p className="mt-1 text-[16px] font-bold text-blue-950 dark:text-blue-100">{p.titulo}</p>
            {p.descripcion && <p className="mt-1 whitespace-pre-line text-sm text-blue-900 dark:text-blue-200">{p.descripcion}</p>}
          </div>
          <ul className={`list-disc space-y-1 pl-5 text-[15px] ${cls.suave}`}>
            <li>Sale en el canal de YouTube <b>Aula en la Nube</b>.</li>
            <li>Tu nota <b>no sale</b> en ningún caso.</li>
            <li>Puedes cambiar tu respuesta cuando quieras desde tu aula, en <b>Cuenta › Permisos para vídeos</b>.</li>
          </ul>
        </>
      )}

      <fieldset className="space-y-2">
        <legend className="text-[15px] font-bold">Si dices que sí, ¿qué puede salir además de tu web?</legend>
        <p className={`text-sm ${cls.tenue}`}>Marca lo que quieras: todo es opcional y se puede combinar.</p>

        <div>
          {opcion("nombre", nombre, "Mi nombre", "Tal y como lo escribas aquí debajo.")}
          {nombre && (
            <div className="mt-2 pl-3 sm:pl-10">
              <label htmlFor={`${id}-nombre`} className={cls.label}>¿Cómo quieres que salga tu nombre?</label>
              <input
                id={`${id}-nombre`}
                className={cls.input}
                maxLength={120}
                value={nombreMostrar}
                onChange={(e) => {
                  tocar();
                  setNombreMostrar(e.target.value);
                }}
                placeholder="Escribe cómo quieres que salga"
              />
              <p className={`mt-1 text-xs ${cls.tenue}`}>Tu nombre completo, solo el nombre de pila, un apodo… Como prefieras.</p>
            </div>
          )}
        </div>
        {opcion("repo", repo, "Mi repositorio de GitHub", "Su nombre y su enlace, y su historial: commits, ramas y PR.")}
        {opcion("info", info, "Lo que cuenta mi web sobre mí", "Tus estudios, tu experiencia, tus aficiones, tu historia…")}
        {opcion("solo", soloWeb, "Solo la web", "Que se vea la web y nada más: sin tu nombre, ni tu repositorio, ni datos tuyos.")}
        {nada && <p className={`text-sm font-semibold ${cls.suave}`}>Si no marcas nada, saldrá solo la web.</p>}
      </fieldset>

      <div>
        <label htmlFor={`${id}-obs`} className={cls.label}>
          ¿Hay algo de tu web que prefieres que no salga? <span className="font-normal text-zinc-400">· opcional</span>
        </label>
        <textarea
          id={`${id}-obs`}
          className={cls.input}
          rows={2}
          maxLength={1000}
          value={obs}
          onChange={(e) => {
            tocar();
            setObs(e.target.value);
          }}
          placeholder="Tu foto, una sección, un dato…"
        />
      </div>

      {estado.t === "error" && <p role="alert" className="text-sm font-semibold text-red-700 dark:text-red-300">{estado.e}</p>}

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <button type="button" className={cls.btnAzul} disabled={estado.t === "enviando"} onClick={() => contestar(true)}>
          Sí, puede salir
        </button>
        <button type="button" className={cls.btn2} disabled={estado.t === "enviando"} onClick={() => contestar(false)}>
          No, prefiero que no salga
        </button>
        {onCancelar && (
          <button type="button" className={`text-sm sm:ml-auto ${cls.enlace}`} disabled={estado.t === "enviando"} onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
      {estado.t === "enviando" && <p role="status" className={`text-sm ${cls.tenue}`}>Guardando…</p>}
    </div>
  );
}
