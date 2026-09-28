"use client";

import { useEffect, useState } from "react";
import Link from "@/components/Link";
import { api, RUTAS, type UsuarioSesion } from "@/lib/campus/cliente";
import { cls, mensajeError } from "./ui";

/** Destino tras entrar: ?volver= solo si es una ruta del propio campus (sin redirecciones abiertas). */
function destino(usuario: UsuarioSesion): string {
  const panel = usuario.rol === "profesor" ? RUTAS.profesor : RUTAS.alumno;
  const volver = new URLSearchParams(window.location.search).get("volver") || "";
  return volver.startsWith(new URL(panel, window.location.origin).pathname) ? volver : panel;
}

export default function Acceso() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [recordar, setRecordar] = useState(false);
  const [verClave, setVerClave] = useState(false);
  const [estado, setEstado] = useState<{ t: "comprobando" | "idle" | "enviando" } | { t: "error"; e: string }>({ t: "comprobando" });

  // ¿Ya hay sesión? Directo al panel.
  useEffect(() => {
    api<{ usuario: UsuarioSesion | null }>("yo")
      .then(({ usuario }) => (usuario ? window.location.replace(destino(usuario)) : setEstado({ t: "idle" })))
      .catch(() => setEstado({ t: "idle" }));
  }, []);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setEstado({ t: "enviando" });
    try {
      const r = await api<{ usuario: UsuarioSesion }>("login", { usuario: usuario.trim(), password, recordar });
      window.location.replace(destino(r.usuario));
    } catch (err) {
      setEstado({ t: "error", e: mensajeError(err) });
    }
  }

  const ocupado = estado.t === "enviando" || estado.t === "comprobando";

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-start">
      <div>
        <span className={cls.chip}>Curso de Programación con IA · Campus</span>
        <h1 className={cls.h1}>Acceso al aula</h1>
        <p className={`mt-4 max-w-2xl text-lg ${cls.suave}`}>
          Tu panel del curso: las sesiones de cada proyecto, lo que hay que entregar y cuándo, tus
          entregas y la corrección con la rúbrica, criterio a criterio.
        </p>
        <ul className={`mt-6 space-y-3 text-[15px] ${cls.suave}`}>
          <li className="flex gap-3">
            <span aria-hidden className="mt-0.5 text-lg">🗂️</span>
            <span><b className="text-zinc-800 dark:text-zinc-200">Sesiones y actividades</b> de cada proyecto, en orden y con su material.</span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-0.5 text-lg">📤</span>
            <span><b className="text-zinc-800 dark:text-zinc-200">Entregas</b> desde aquí mismo: tu repositorio de GitHub, tu web publicada… y puedes actualizarlas mientras estén abiertas.</span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-0.5 text-lg">📊</span>
            <span><b className="text-zinc-800 dark:text-zinc-200">Tu nota explicada</b>: el nivel de cada criterio de la rúbrica y qué hacer para subirlo.</span>
          </li>
        </ul>
        <p className={`mt-8 text-sm ${cls.tenue}`}>
          ¿Buscas el contenido del curso? Es abierto:{" "}
          <Link href="/programacion-ia/" className={cls.enlace}>Curso de Programación con IA</Link>.
        </p>
      </div>

      <form onSubmit={entrar} className={`${cls.tarjeta} space-y-4 sm:p-6`} aria-busy={ocupado}>
        <h2 className={cls.h2}>Entrar</h2>
        <div>
          <label htmlFor="acc-usuario" className={cls.label}>Usuario</label>
          <input
            id="acc-usuario"
            className={cls.input}
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            required
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="nombre.apellido"
          />
        </div>
        <div>
          <label htmlFor="acc-clave" className={cls.label}>Contraseña</label>
          <div className="relative">
            <input
              id="acc-clave"
              className={`${cls.input} pr-20`}
              type={verClave ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setVerClave((v) => !v)}
              className="absolute inset-y-0 right-2 my-auto h-7 rounded-md px-2 text-xs font-semibold text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/10"
              aria-pressed={verClave}
            >
              {verClave ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>
        <label className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <input type="checkbox" checked={recordar} onChange={(e) => setRecordar(e.target.checked)} className="mt-0.5 h-4 w-4 accent-blue-700" />
          <span>Recordarme en este equipo (30 días). <b>No lo marques en los ordenadores del aula.</b></span>
        </label>
        {estado.t === "error" && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-300">
            {estado.e}
          </p>
        )}
        <button type="submit" className={`${cls.btnAzul} w-full`} disabled={ocupado}>
          {estado.t === "enviando" ? "Entrando…" : estado.t === "comprobando" ? "Comprobando sesión…" : "Entrar"}
        </button>
        <p className={`text-xs ${cls.tenue}`}>
          Las credenciales te las da el profesor. Si las has perdido o te has bloqueado, pídele que te
          genere una contraseña nueva. Aquí solo se guarda lo necesario para el curso: tu nombre, tu
          usuario, tus entregas y tus calificaciones.
        </p>
      </form>
    </div>
  );
}
