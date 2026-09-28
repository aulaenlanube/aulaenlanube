"use client";

// Franja fina en las páginas del curso cuando hay sesión abierta en el campus:
// «Conectado como … · Ir a mi panel». Solo pregunta a la API si existe la
// cookie-pista, así que a las visitas normales no les cuesta ninguna petición.

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { api, rolPista, RUTAS, type UsuarioSesion } from "@/lib/campus/cliente";

const PANELES = ["/programacion-ia/acceso/", "/programacion-ia/aula/", "/programacion-ia/profesor/"];

export default function BarraCampus() {
  const ruta = usePathname();
  const [usuario, setUsuario] = useState<UsuarioSesion | null>(null);
  const enPanel = PANELES.some((p) => `${ruta ?? ""}/`.replace(/\/+$/, "/").startsWith(p));

  useEffect(() => {
    if (enPanel || !rolPista()) return;
    let vivo = true;
    api<{ usuario: UsuarioSesion | null }>("yo")
      .then((r) => vivo && setUsuario(r.usuario))
      .catch(() => {});
    return () => {
      vivo = false;
    };
  }, [enPanel]);

  if (enPanel || !usuario) return null;
  const panel = usuario.rol === "profesor" ? RUTAS.profesor : RUTAS.alumno;
  return (
    <div className="border-b border-blue-200 bg-blue-50 text-sm text-blue-900 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2">
        <span>
          Conectado al campus como <b>{usuario.nombre}</b>
          {usuario.grupo && <> · {usuario.grupo.nombre}</>}
        </span>
        <a href={panel} className="font-semibold underline underline-offset-2">
          {usuario.rol === "profesor" ? "Panel del profesor" : "Ir a mi aula"} →
        </a>
      </div>
    </div>
  );
}
