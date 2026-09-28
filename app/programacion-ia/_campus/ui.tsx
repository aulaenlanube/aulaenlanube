"use client";

// Piezas de interfaz compartidas por los paneles del campus (acceso, alumno,
// profesor). Mismas equivalencias de color claro/oscuro que el resto del sitio
// (docs/estilos-de-pagina.md).

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { api, ErrorCampus, RUTAS, type Rol, type UsuarioSesion } from "@/lib/campus/cliente";

export const cls = {
  tarjeta: "rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm",
  tarjetaLink:
    "block rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
  chip: "inline-block rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300",
  h1: "mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl",
  h2: "text-xl font-extrabold tracking-tight",
  suave: "text-zinc-600 dark:text-zinc-400",
  tenue: "text-zinc-500 dark:text-zinc-400",
  btn: "inline-flex items-center justify-center gap-2 rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50",
  btnAzul: "inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
  btn2: "inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50",
  btnPeligro: "inline-flex items-center justify-center gap-2 rounded-xl border border-red-300 dark:border-red-500/40 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-red-700 dark:text-red-300 transition hover:bg-red-50 dark:hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50",
  btnMini: "inline-flex items-center gap-1 rounded-lg border border-zinc-300 dark:border-white/15 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-zinc-50 dark:hover:bg-white/5 disabled:opacity-50",
  input:
    "w-full rounded-lg border border-zinc-300 dark:border-white/15 bg-white dark:bg-slate-950 px-3 py-2 text-[15px] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
  label: "mb-1 block text-sm font-semibold text-zinc-700 dark:text-zinc-300",
  enlace: "font-semibold text-blue-700 underline-offset-2 hover:underline dark:text-blue-300",
};

type Tono = "azul" | "verde" | "ambar" | "rojo" | "gris";

const TONOS: Record<Tono, string> = {
  azul: "border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-200",
  verde: "border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-200",
  ambar: "border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 text-amber-900 dark:text-amber-200",
  rojo: "border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 text-red-900 dark:text-red-200",
  gris: "border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 text-zinc-700 dark:text-zinc-300",
};

const PILDORAS: Record<Tono, string> = {
  azul: "border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300",
  verde: "border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  ambar: "border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300",
  rojo: "border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300",
  gris: "border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300",
};

export function Aviso({ tono = "azul", children, className = "" }: { tono?: Tono; children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border p-4 text-[15px] ${TONOS[tono]} ${className}`}>{children}</div>;
}

export function Pildora({ tono = "gris", children }: { tono?: Tono; children: ReactNode }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${PILDORAS[tono]}`}>
      {children}
    </span>
  );
}

export function Cargando({ texto = "Cargando…" }: { texto?: string }) {
  return (
    <div className="flex items-center gap-3 py-10 text-zinc-500 dark:text-zinc-400" role="status">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600 dark:border-white/20 dark:border-t-blue-400" aria-hidden />
      {texto}
    </div>
  );
}

export function CajaError({ error, reintentar }: { error: string; reintentar?: () => void }) {
  return (
    <Aviso tono="rojo" className="my-4">
      <p role="alert">{error}</p>
      {reintentar && (
        <button type="button" onClick={reintentar} className={`${cls.btn2} mt-3`}>
          Reintentar
        </button>
      )}
    </Aviso>
  );
}

/** Mensaje de un error de la API (o genérico). */
export function mensajeError(e: unknown): string {
  return e instanceof ErrorCampus || e instanceof Error ? e.message : "Algo ha fallado.";
}

/** Ruta interna del panel en el hash: «#/grupo/3» → ["grupo", "3"]. */
export function useHashRuta(): [string[], (r: string) => void] {
  const [ruta, setRuta] = useState<string[]>([]);
  useEffect(() => {
    const leer = () => setRuta(window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent));
    leer();
    window.addEventListener("hashchange", leer);
    return () => window.removeEventListener("hashchange", leer);
  }, []);
  const ir = useCallback((r: string) => {
    window.location.hash = r ? `/${r}` : "/";
    window.scrollTo({ top: 0 });
  }, []);
  return [ruta, ir];
}

type EstadoSesion = { estado: "cargando" } | { estado: "ok"; usuario: UsuarioSesion } | { estado: "error"; error: string };

/**
 * Comprueba la sesión y el rol. Sin sesión → a la página de acceso; con el rol
 * equivocado → a su panel. Así cada panel solo se pinta para quien le toca.
 */
export function useSesion(rol: Rol): EstadoSesion & { recargar: () => void } {
  const [s, setS] = useState<EstadoSesion>({ estado: "cargando" });
  const [vuelta, setVuelta] = useState(0);
  useEffect(() => {
    let vivo = true;
    api<{ usuario: UsuarioSesion | null }>("yo")
      .then(({ usuario }) => {
        if (!vivo) return;
        if (!usuario) {
          const vuelta = encodeURIComponent(window.location.pathname + window.location.hash);
          window.location.replace(`${RUTAS.acceso}?volver=${vuelta}`);
          return;
        }
        if (usuario.rol !== rol) {
          window.location.replace(usuario.rol === "profesor" ? RUTAS.profesor : RUTAS.alumno);
          return;
        }
        setS({ estado: "ok", usuario });
      })
      .catch((e) => vivo && setS({ estado: "error", error: mensajeError(e) }));
    return () => {
      vivo = false;
    };
  }, [rol, vuelta]);
  const recargar = useCallback(() => setVuelta((v) => v + 1), []);
  return { ...s, recargar };
}

export async function cerrarSesion() {
  try {
    await api("logout");
  } finally {
    window.location.replace(RUTAS.acceso);
  }
}

/** Ventana modal sencilla (Escape o clic fuera para cerrar). */
export function Modal({ titulo, onCerrar, children, ancho = "max-w-2xl" }: { titulo: string; onCerrar: () => void; children: ReactNode; ancho?: string }) {
  useEffect(() => {
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && onCerrar();
    document.addEventListener("keydown", tecla);
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", tecla);
      document.body.style.overflow = previo;
    };
  }, [onCerrar]);
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm sm:p-8" onMouseDown={(e) => e.target === e.currentTarget && onCerrar()}>
      <div role="dialog" aria-modal="true" aria-label={titulo} className={`w-full ${ancho} rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-slate-900 sm:p-6`}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-lg font-extrabold tracking-tight">{titulo}</h2>
          <button type="button" onClick={onCerrar} className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/10" aria-label="Cerrar">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/** Formulario de cambio de contraseña (sirve para alumno y profesor). */
export function CambiarPassword() {
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [repite, setRepite] = useState("");
  const [estado, setEstado] = useState<{ t: "idle" | "enviando" | "ok" } | { t: "error"; e: string }>({ t: "idle" });

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (nueva !== repite) return setEstado({ t: "error", e: "Las dos contraseñas nuevas no coinciden." });
    setEstado({ t: "enviando" });
    try {
      await api("cuenta.password", { actual, nueva });
      setEstado({ t: "ok" });
      setActual("");
      setNueva("");
      setRepite("");
    } catch (err) {
      setEstado({ t: "error", e: mensajeError(err) });
    }
  }

  return (
    <form onSubmit={enviar} className={`${cls.tarjeta} max-w-md space-y-4`}>
      <div>
        <label className={cls.label} htmlFor="pw-actual">Contraseña actual</label>
        <input id="pw-actual" type="password" autoComplete="current-password" required value={actual} onChange={(e) => setActual(e.target.value)} className={cls.input} />
      </div>
      <div>
        <label className={cls.label} htmlFor="pw-nueva">Nueva contraseña (mínimo 8 caracteres)</label>
        <input id="pw-nueva" type="password" autoComplete="new-password" required minLength={8} value={nueva} onChange={(e) => setNueva(e.target.value)} className={cls.input} />
      </div>
      <div>
        <label className={cls.label} htmlFor="pw-repite">Repite la nueva contraseña</label>
        <input id="pw-repite" type="password" autoComplete="new-password" required minLength={8} value={repite} onChange={(e) => setRepite(e.target.value)} className={cls.input} />
      </div>
      {estado.t === "error" && <p role="alert" className="text-sm font-semibold text-red-700 dark:text-red-300">{estado.e}</p>}
      {estado.t === "ok" && <p role="status" className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Contraseña cambiada. Se han cerrado tus otras sesiones abiertas.</p>}
      <button type="submit" className={cls.btn} disabled={estado.t === "enviando"}>
        {estado.t === "enviando" ? "Guardando…" : "Cambiar contraseña"}
      </button>
    </form>
  );
}

/** Cabecera común de los paneles: saludo, datos y acciones de sesión. */
export function CabeceraPanel({ chip, titulo, children, acciones }: { chip: string; titulo: ReactNode; children?: ReactNode; acciones?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span className={cls.chip}>{chip}</span>
        <h1 className={cls.h1}>{titulo}</h1>
        {children}
      </div>
      <div className="flex flex-wrap gap-2">{acciones}</div>
    </div>
  );
}
