"use client";

// Panel del profesor: los dos cursos (presencial y semipresencial) con sus
// grupos, las entregas, el seguimiento por grupo y la corrección.

import { useCallback, useEffect, useState } from "react";
import Link from "@/components/Link";
import { CURSOS, CURSO_IDS, type CursoId } from "@/lib/campus/catalogo";
import { api, RUTAS, type EntregaResumen, type GrupoResumen } from "@/lib/campus/cliente";
import { ModalGrupo } from "./ProfGrupo";
import ProfEntregas from "./ProfEntregas";
import ProfGrupo from "./ProfGrupo";
import { Aviso, CabeceraPanel, CajaError, CambiarPassword, Cargando, cerrarSesion, cls, mensajeError, Pildora, useHashRuta, useSesion } from "./ui";

type Resumen = { grupos: GrupoResumen[]; entregas: EntregaResumen[] };

export default function PanelProfesor() {
  const sesion = useSesion("profesor");
  const [ruta] = useHashRuta();
  const [resumen, setResumen] = useState<Resumen | null>(null);
  const [error, setError] = useState("");
  const [vuelta, setVuelta] = useState(0);
  const cargar = useCallback(() => {
    setError("");
    setVuelta((v) => v + 1);
  }, []);

  useEffect(() => {
    if (sesion.estado !== "ok") return;
    let vivo = true;
    api<Resumen>("prof.resumen")
      .then((r) => vivo && setResumen(r))
      .catch((e) => vivo && setError(mensajeError(e)));
    return () => {
      vivo = false;
    };
  }, [sesion.estado, vuelta]);

  if (sesion.estado === "error") return <Marco><CajaError error={sesion.error} reintentar={sesion.recargar} /></Marco>;
  if (sesion.estado === "cargando") return <Marco><Cargando /></Marco>;

  const vista = ruta[0] || "inicio";
  const pestañas: [string, string, string][] = [
    ["inicio", "Grupos", "#/"],
    ["entregas", "Entregas", "#/entregas"],
    ["cuenta", "Cuenta", "#/cuenta"],
  ];

  return (
    <Marco>
      <CabeceraPanel
        chip="Campus · profesor"
        titulo="Panel del profesor"
        acciones={
          <>
            <a href={RUTAS.plan} className={cls.btn2}>Planificación</a>
            <button type="button" onClick={cerrarSesion} className={cls.btn2}>Salir</button>
          </>
        }
      >
        <p className={`mt-2 ${cls.suave}`}>
          {sesion.usuario.nombre} {sesion.usuario.apellidos} · Curso de Programación con IA ·{" "}
          <Link href="/programacion-ia/" className={cls.enlace}>ver el curso público</Link>
        </p>
      </CabeceraPanel>

      <nav className="mt-6 flex gap-1 border-b border-zinc-200 dark:border-white/10" aria-label="Secciones del panel">
        {pestañas.map(([id, t, href]) => {
          const activa = vista === id || (id === "inicio" && vista === "grupo");
          return (
            <a
              key={id}
              href={href}
              aria-current={activa ? "page" : undefined}
              className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition ${activa ? "border-blue-700 text-blue-700 dark:border-blue-400 dark:text-blue-300" : "border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
            >
              {t}
            </a>
          );
        })}
      </nav>

      <div className="mt-6">
        {vista === "cuenta" ? (
          <div className="max-w-md">
            <h2 className={`${cls.h2} mb-3`}>Cambiar contraseña</h2>
            <CambiarPassword />
          </div>
        ) : error ? (
          <CajaError error={error} reintentar={cargar} />
        ) : !resumen ? (
          <Cargando />
        ) : vista === "grupo" && ruta[1] ? (
          <ProfGrupo key={ruta[1]} grupoId={Number(ruta[1])} ruta={ruta} grupos={resumen.grupos} onCambio={cargar} />
        ) : vista === "entregas" ? (
          <ProfEntregas entregas={resumen.entregas} onCambio={cargar} />
        ) : (
          <Inicio resumen={resumen} onCambio={cargar} />
        )}
      </div>
    </Marco>
  );
}

function Marco({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 py-6">{children}</div>;
}

function Inicio({ resumen, onCambio }: { resumen: Resumen; onCambio: () => void }) {
  const [nuevo, setNuevo] = useState<CursoId | null>(null);
  const cerrar = useCallback(() => setNuevo(null), []);
  const activos = resumen.grupos.filter((g) => !g.archivado);
  const archivados = resumen.grupos.filter((g) => g.archivado);
  const totalPendiente = activos.reduce((s, g) => s + g.por_corregir, 0);

  return (
    <div className="space-y-8">
      {!resumen.grupos.length ? (
        <Aviso tono="azul">
          <b>Primeros pasos:</b> crea un grupo en cada curso (presencial y semipresencial), añade el alumnado
          pegando la lista y reparte las fichas con las credenciales. Luego, en «Entregas», revisa lo que tiene que
          entregar cada curso.
        </Aviso>
      ) : totalPendiente > 0 ? (
        <Aviso tono="ambar">
          Tienes <b>{totalPendiente}</b> {totalPendiente === 1 ? "entrega" : "entregas"} por corregir o por publicar.
        </Aviso>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        {CURSO_IDS.map((c) => {
          const grupos = activos.filter((g) => g.curso === c);
          const entregas = resumen.entregas.filter((e) => e.curso === c);
          return (
            <section key={c} className={`${cls.tarjeta} flex flex-col`}>
              <span className={`${cls.chip} self-start`}>{CURSOS[c].corto}</span>
              <h2 className="mt-2 text-xl font-extrabold tracking-tight">{CURSOS[c].nombre}</h2>
              <p className={`text-sm ${cls.tenue}`}>
                {CURSOS[c].descripcion} · {entregas.length} {entregas.length === 1 ? "entrega" : "entregas"} ·{" "}
                <a href="#/entregas" className={cls.enlace}>gestionar</a>
              </p>
              <div className="mt-4 flex-1 space-y-2">
                {grupos.length === 0 && <p className={`text-sm ${cls.tenue}`}>Todavía no hay grupos en este curso.</p>}
                {grupos.map((g) => (
                  <a
                    key={g.id}
                    href={`#/grupo/${g.id}`}
                    className="flex items-center gap-3 rounded-xl border border-zinc-200 px-4 py-3 transition hover:border-blue-300 hover:bg-blue-50/60 dark:border-white/10 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10"
                  >
                    <span className="flex-1">
                      <span className="block text-[16px] font-bold">{g.nombre}</span>
                      <span className={`block text-xs ${cls.tenue}`}>{g.alumnos} alumnos · {g.anyo}</span>
                    </span>
                    {g.por_corregir > 0 ? <Pildora tono="ambar">{g.por_corregir} por corregir</Pildora> : g.alumnos > 0 && <Pildora tono="verde">Al día</Pildora>}
                    <span aria-hidden className="text-zinc-400">→</span>
                  </a>
                ))}
              </div>
              <button type="button" className={`${cls.btn2} mt-4 self-start`} onClick={() => setNuevo(c)}>+ Nuevo grupo {CURSOS[c].corto.toLowerCase()}</button>
            </section>
          );
        })}
      </div>

      {archivados.length > 0 && (
        <details className={cls.tarjeta}>
          <summary className="cursor-pointer font-bold">Grupos archivados ({archivados.length})</summary>
          <div className="mt-3 space-y-2">
            {archivados.map((g) => (
              <a key={g.id} href={`#/grupo/${g.id}`} className={`block text-sm ${cls.enlace}`}>
                {g.nombre} · {CURSOS[g.curso].corto} · {g.anyo} · {g.alumnos} alumnos
              </a>
            ))}
          </div>
        </details>
      )}

      <Aviso tono="gris">
        <b>Corrección asistida por IA:</b> desde el repositorio del sitio, <code className="font-mono text-sm">tools/campus/</code>{" "}
        exporta los repos entregados, recoge evidencias de cada uno y carga las propuestas de nota como borradores
        «IA · revisar». Tú las abres, ajustas y publicas. Procedimiento en <code className="font-mono text-sm">docs/campus.md</code>.
      </Aviso>

      {nuevo && (
        <ModalGrupo
          cursoInicial={nuevo}
          onCerrar={cerrar}
          onGuardado={(g) => {
            cerrar();
            onCambio();
            window.location.hash = `/grupo/${g.id}`;
          }}
        />
      )}
    </div>
  );
}
