"use client";

// Comprobación en vivo de un repositorio en la API pública de GitHub (desde el
// navegador, sin token). GitHub permite 60 consultas/hora por IP y en el aula
// todo el grupo sale por la misma IP: por eso se cachea en sessionStorage y el
// alumno solo consulta al pulsar, no mientras escribe.

import { useEffect, useState } from "react";
import { fechaCorta, haceCuanto, partesRepo } from "@/lib/campus/cliente";
import { cls } from "./ui";

type Info =
  | { t: "ok"; privado: boolean; pushed: string; rama: string; pages: boolean; homepage: string | null; commits: number | null; ultimo: { msg: string; fecha: string } | null }
  | { t: "no-existe" }
  | { t: "limite" }
  | { t: "error" };

const CACHE_MIN = 10;

async function consultar(dueno: string, repo: string, completo: boolean): Promise<Info> {
  const clave = `aeln_gh_${dueno}/${repo}/${completo ? 1 : 0}`;
  try {
    const c = JSON.parse(sessionStorage.getItem(clave) || "null");
    if (c && Date.now() - c.t < CACHE_MIN * 60000) return c.info;
  } catch {}
  const base = `https://api.github.com/repos/${dueno}/${repo}`;
  const r = await fetch(base, { headers: { Accept: "application/vnd.github+json" } });
  if (r.status === 404) return { t: "no-existe" };
  if (r.status === 403 || r.status === 429) return { t: "limite" };
  if (!r.ok) return { t: "error" };
  const j = await r.json();
  let commits: number | null = null;
  let ultimo: { msg: string; fecha: string } | null = null;
  if (completo) {
    const rc = await fetch(`${base}/commits?per_page=1`, { headers: { Accept: "application/vnd.github+json" } });
    if (rc.ok) {
      const link = rc.headers.get("Link") || "";
      const m = link.match(/[?&]page=(\d+)>;\s*rel="last"/);
      const lista = await rc.json();
      commits = m ? Number(m[1]) : Array.isArray(lista) ? lista.length : null;
      const c0 = Array.isArray(lista) ? lista[0] : null;
      if (c0) ultimo = { msg: String(c0.commit?.message || "").split("\n")[0], fecha: c0.commit?.author?.date || "" };
    }
  }
  const info: Info = {
    t: "ok",
    privado: !!j.private,
    pushed: j.pushed_at,
    rama: j.default_branch,
    pages: !!j.has_pages,
    homepage: j.homepage || null,
    commits,
    ultimo,
  };
  try {
    sessionStorage.setItem(clave, JSON.stringify({ t: Date.now(), info }));
  } catch {}
  return info;
}

/** completo = también nº de commits y último mensaje (2 consultas). auto = consultar al montar. */
export default function InfoRepo({ repo, completo = false, auto = false }: { repo: string | null; completo?: boolean; auto?: boolean }) {
  const partes = partesRepo(repo);
  const [info, setInfo] = useState<Info | null>(null);
  const [cargando, setCargando] = useState(false);

  const dueno = partes?.dueno;
  const nombre = partes?.repo;

  async function comprobar() {
    if (!dueno || !nombre) return;
    setCargando(true);
    try {
      setInfo(await consultar(dueno, nombre, completo));
    } catch {
      setInfo({ t: "error" });
    } finally {
      setCargando(false);
    }
  }

  // Quien lo usa lo monta con key={repo}: al cambiar de repo empieza de cero.
  useEffect(() => {
    if (!auto || !dueno || !nombre) return;
    let vivo = true;
    consultar(dueno, nombre, completo)
      .then((i) => vivo && setInfo(i))
      .catch(() => vivo && setInfo({ t: "error" }));
    return () => {
      vivo = false;
    };
  }, [auto, dueno, nombre, completo]);

  if (!partes) return null;

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-white/10 dark:bg-white/5">
      {!info ? (
        <button type="button" onClick={comprobar} disabled={cargando} className={cls.btnMini}>
          {cargando ? "Comprobando en GitHub…" : "Comprobar el repositorio en GitHub"}
        </button>
      ) : info.t === "ok" ? (
        <div className="space-y-1 text-zinc-700 dark:text-zinc-300">
          <p className="font-semibold text-emerald-700 dark:text-emerald-300">
            ✓ Repositorio {info.privado ? "privado" : "público"} encontrado{info.pages ? " · con GitHub Pages activado" : ""}
          </p>
          <p>
            Último push: {haceCuanto(info.pushed)} ({fechaCorta(info.pushed)}) · rama <code className="font-mono text-[12px]">{info.rama}</code>
            {info.commits !== null && <> · <b>{info.commits}</b> commits</>}
          </p>
          {info.ultimo && <p className="truncate">Último commit: «{info.ultimo.msg}»</p>}
          {!info.pages && <p className="text-amber-700 dark:text-amber-300">Aún no tiene GitHub Pages activado (Settings → Pages).</p>}
        </div>
      ) : info.t === "no-existe" ? (
        <p className="font-semibold text-red-700 dark:text-red-300">
          ✗ GitHub no encuentra este repositorio. Revisa el nombre o hazlo <b>público</b> (Settings → General → Danger Zone → Change visibility).
        </p>
      ) : info.t === "limite" ? (
        <p className="text-amber-800 dark:text-amber-300">
          GitHub no deja comprobarlo ahora mismo (límite de consultas desde esta red). No pasa nada: la entrega se guarda igual.
        </p>
      ) : (
        <p className="text-amber-800 dark:text-amber-300">No se ha podido consultar GitHub. La entrega se guarda igual.</p>
      )}
    </div>
  );
}
