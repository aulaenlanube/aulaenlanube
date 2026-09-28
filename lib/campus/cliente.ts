// Cliente de la API del campus (public/campus-api/api.php) y sus tipos.
// Solo se usa desde componentes cliente: el sitio es un export estático y los
// datos del alumnado se piden en el navegador, con la cookie de sesión.

import type { CursoId } from "./catalogo";
import type { Minimos, Valoraciones } from "./rubricas";

export const CAMPUS_API = process.env.NEXT_PUBLIC_CAMPUS_API || "/campus-api/api.php";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Rutas de los paneles (respetan el basePath de staging). */
export const RUTAS = {
  acceso: `${BASE}/programacion-ia/acceso/`,
  alumno: `${BASE}/programacion-ia/aula/`,
  profesor: `${BASE}/programacion-ia/profesor/`,
};

export type Rol = "alumno" | "profesor";

export type Grupo = {
  id: number;
  nombre: string;
  curso: CursoId;
  anyo: string;
  archivado: boolean;
};

export type UsuarioSesion = {
  id: number;
  rol: Rol;
  usuario: string;
  nombre: string;
  apellidos: string;
  grupo: Grupo | null;
};

export type TipoEntrega = "github" | "url" | "texto";

export type Entrega = {
  id: number;
  curso: CursoId;
  proyecto: string;
  sesion: string | null;
  titulo: string;
  instrucciones: string;
  tipo: TipoEntrega;
  rubrica: string | null;
  fecha_limite: string | null;
  abierta: boolean;
  visible: boolean;
  orden: number;
};

export type Envio = {
  entrega_id: number;
  alumno_id: number;
  repo: string | null;
  web: string | null;
  texto: string | null;
  comentario: string | null;
  version: number;
  fuera_plazo: boolean;
  created_at: string;
  updated_at: string;
};

export type Nota = {
  entrega_id: number;
  alumno_id: number;
  valoraciones: Valoraciones | null;
  minimos: Minimos | null;
  nota: number | null;
  no_evaluable: boolean;
  comentario: string | null;
  publicada: boolean;
  publicada_at: string | null;
  updated_at: string;
};

export type NotaProfesor = Nota & { origen: "profesor" | "ia"; nota_privada: string | null };

export type EntregaAlumno = Entrega & { envio: Envio | null; nota: Nota | null };

export type Alumno = {
  id: number;
  usuario: string;
  nombre: string;
  apellidos: string;
  email: string | null;
  grupo_id: number | null;
  activo: boolean;
  ultimo_acceso: string | null;
  created_at: string;
};

export type Credencial = { id: number; nombre: string; apellidos: string; usuario: string; password: string };

export type GrupoResumen = Grupo & { alumnos: number; por_corregir: number };
export type EntregaResumen = Entrega & { envios: number; publicadas: number };

export type Seguimiento = {
  grupo: Grupo;
  alumnos: Alumno[];
  entregas: Entrega[];
  envios: Envio[];
  notas: NotaProfesor[];
};

export class ErrorCampus extends Error {
  constructor(public estado: number, mensaje: string) {
    super(mensaje);
  }
}

export async function api<T = Record<string, never>>(accion: string, datos: Record<string, unknown> = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(CAMPUS_API, {
      method: "POST",
      credentials: "same-origin",
      cache: "no-store",
      headers: { "Content-Type": "application/json", "X-Campus": "1" },
      body: JSON.stringify({ accion, ...datos }),
    });
  } catch {
    throw new ErrorCampus(0, "No hay conexión con el servidor. Revisa tu conexión a internet.");
  }
  let j: { ok?: boolean; error?: string } & Record<string, unknown>;
  try {
    j = await res.json();
  } catch {
    throw new ErrorCampus(res.status, "El servidor no ha respondido bien. Inténtalo de nuevo en un momento.");
  }
  if (!res.ok || !j.ok) throw new ErrorCampus(res.status, j.error || "Algo ha fallado.");
  return j as T;
}

/** Pista (no segura, solo para la interfaz) de que hay sesión abierta en este navegador. */
export function rolPista(): Rol | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|;\s*)aeln_campus_rol=(alumno|profesor)/);
  return m ? (m[1] as Rol) : null;
}

export function nombreCompleto(p: { nombre: string; apellidos: string }): string {
  return `${p.nombre} ${p.apellidos}`.trim();
}

/** «2026-10-20 23:59:00» → «lun 20 oct, 23:59». */
export function fechaCorta(s: string | null | undefined, conHora = true): string {
  if (!s) return "";
  const d = new Date(s.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return s;
  const f = d.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" });
  return conHora ? `${f}, ${d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}` : f;
}

/** Hace cuánto: «hace 5 min», «hace 3 días»… */
export function haceCuanto(s: string | null | undefined): string {
  if (!s) return "nunca";
  const d = new Date(s.replace(" ", "T")).getTime();
  const seg = Math.max(0, (Date.now() - d) / 1000);
  if (seg < 60) return "ahora mismo";
  if (seg < 3600) return `hace ${Math.round(seg / 60)} min`;
  if (seg < 86400) return `hace ${Math.round(seg / 3600)} h`;
  const dias = Math.round(seg / 86400);
  return dias === 1 ? "ayer" : `hace ${dias} días`;
}

/** Fecha límite pasada (en hora local del navegador; el servidor manda la de Madrid). */
export function plazoVencido(limite: string | null): boolean {
  if (!limite) return false;
  return new Date(limite.replace(" ", "T")).getTime() < Date.now();
}

/** https://github.com/usuario/repo → { dueno, repo } */
export function partesRepo(url: string | null): { dueno: string; repo: string } | null {
  const m = url?.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)$/);
  return m ? { dueno: m[1], repo: m[2] } : null;
}

/** URL de GitHub Pages que corresponde a un repositorio. */
export function urlPages(repoUrl: string | null): string | null {
  const p = partesRepo(repoUrl);
  if (!p) return null;
  return p.repo.toLowerCase() === `${p.dueno.toLowerCase()}.github.io`
    ? `https://${p.dueno.toLowerCase()}.github.io/`
    : `https://${p.dueno.toLowerCase()}.github.io/${p.repo}/`;
}
