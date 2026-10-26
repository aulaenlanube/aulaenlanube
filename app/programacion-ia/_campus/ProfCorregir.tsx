"use client";

// Corrección de la entrega de un alumno: datos del envío (repo, web, GitHub en
// vivo), rúbrica clicable con la nota calculada al momento, comentarios, y
// guardar como borrador o publicar. Si la corrección viene de la IA
// (tools/campus), se marca como propuesta hasta que el profesor la guarda.
// Una doble corrección (centro + Opus anonimizado) se muestra completa y se
// publica tal cual; corregir a mano la sustituye.

import { useEffect, useState } from "react";
import { PROYECTOS, sesionDe } from "@/lib/campus/catalogo";
import { api, fechaCorta, haceCuanto, nombreCompleto, urlPages, type Alumno, type Entrega, type Envio, type NotaProfesor } from "@/lib/campus/cliente";
import { calcularNota, formatoNota, RUBRICAS, type Minimos, type Valoraciones } from "@/lib/campus/rubricas";
import DobleCorreccion from "./DobleCorreccion";
import InfoRepo from "./InfoRepo";
import RubricaVista, { NotaGrande } from "./Rubrica";
import { Aviso, cls, mensajeError, Pildora } from "./ui";

type Props = {
  grupoId: number;
  entrega: Entrega;
  alumno: Alumno;
  envio: Envio | null;
  nota: NotaProfesor | null;
  anterior: Alumno | null;
  siguiente: Alumno | null;
  onNota: (n: NotaProfesor | null) => void;
};

export default function ProfCorregir({ grupoId, entrega, alumno, envio, nota, anterior, siguiente, onNota }: Props) {
  const rubrica = entrega.rubrica ? RUBRICAS[entrega.rubrica] : undefined;
  const [valoraciones, setValoraciones] = useState<Valoraciones>(nota?.valoraciones ?? {});
  const [minimos, setMinimos] = useState<Minimos>(nota?.minimos ?? {});
  const [notaManual, setNotaManual] = useState(nota?.nota !== null && nota?.nota !== undefined ? String(nota.nota).replace(".", ",") : "");
  const [comentario, setComentario] = useState(nota?.comentario ?? "");
  const [privada, setPrivada] = useState(nota?.nota_privada ?? "");
  const [sucio, setSucio] = useState(false);
  const [manual, setManual] = useState(false);
  const [estado, setEstado] = useState<{ t: "idle" | "guardando" } | { t: "ok"; m: string } | { t: "error"; e: string }>({ t: "idle" });

  // Aviso si se intenta salir con cambios sin guardar (recarga o cierre de pestaña).
  useEffect(() => {
    if (!sucio) return;
    const aviso = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", aviso);
    return () => window.removeEventListener("beforeunload", aviso);
  }, [sucio]);

  const cambio = <T,>(fn: (v: T) => void) => (v: T) => {
    fn(v);
    setSucio(true);
    setEstado({ t: "idle" });
  };

  const calc = rubrica ? calcularNota(rubrica, valoraciones, minimos) : null;
  const notaNum = notaManual.trim() === "" ? null : Number(notaManual.replace(",", "."));
  const notaManualValida = notaNum === null || (!Number.isNaN(notaNum) && notaNum >= 0 && notaNum <= 10);

  /** Guarda la corrección; devuelve si ha ido bien. */
  async function guardar(publicar: boolean): Promise<boolean> {
    if (rubrica && publicar && calc!.puntuacion === null) {
      setEstado({ t: "error", e: `Para publicar hay que valorar todos los criterios (faltan ${calc!.pendientes.length}).` });
      return false;
    }
    if (!rubrica && (!notaManualValida || (publicar && notaNum === null))) {
      setEstado({ t: "error", e: "Escribe una nota entre 0 y 10." });
      return false;
    }
    setEstado({ t: "guardando" });
    try {
      const r = await api<{ nota: NotaProfesor }>("prof.nota.guardar", {
        entrega_id: entrega.id,
        alumno_id: alumno.id,
        valoraciones: rubrica ? valoraciones : null,
        minimos: rubrica ? minimos : null,
        nota: rubrica ? calc!.puntuacion : notaNum,
        no_evaluable: rubrica ? calc!.noEvaluable : false,
        comentario,
        nota_privada: privada,
        publicada: publicar,
      });
      onNota(r.nota);
      setSucio(false);
      setEstado({ t: "ok", m: publicar ? "Publicada: el alumno ya la ve." : "Borrador guardado (el alumno aún no lo ve)." });
      return true;
    } catch (e) {
      setEstado({ t: "error", e: mensajeError(e) });
      return false;
    }
  }

  /** Publica o despublica la corrección tal cual (doble corrección). */
  async function cambiarEstado(publicar: boolean) {
    setEstado({ t: "guardando" });
    try {
      const r = await api<{ nota: NotaProfesor }>("prof.nota.estado", { entrega_id: entrega.id, alumno_id: alumno.id, publicada: publicar });
      onNota(r.nota);
      setEstado({ t: "ok", m: publicar ? "Publicada: el alumno ya la ve." : "Despublicada: vuelve a ser borrador." });
    } catch (e) {
      setEstado({ t: "error", e: mensajeError(e) });
    }
  }

  async function descartar() {
    if (!confirm(`¿Borrar la corrección de ${nombreCompleto(alumno)}? ${nota?.publicada ? "Está publicada: el alumno dejará de verla." : ""}`)) return;
    try {
      await api("prof.nota.borrar", { entrega_id: entrega.id, alumno_id: alumno.id });
      onNota(null);
      setValoraciones({});
      setMinimos({});
      setNotaManual("");
      setComentario("");
      setPrivada("");
      setSucio(false);
      setEstado({ t: "ok", m: "Corrección borrada." });
    } catch (e) {
      setEstado({ t: "error", e: mensajeError(e) });
    }
  }

  const irA = (a: Alumno | null, sinPreguntar = false) => {
    if (!a) return;
    if (sucio && !sinPreguntar && !confirm("Hay cambios sin guardar. ¿Salir igualmente?")) return;
    window.location.hash = `/grupo/${grupoId}/corregir/${entrega.id}/${a.id}`;
  };

  const doble = !!(rubrica && nota?.correcciones && !manual);
  const proyecto = PROYECTOS[entrega.proyecto];
  const sesion = sesionDe(entrega.proyecto, entrega.sesion);
  const reenviada = envio && nota && envio.updated_at > nota.updated_at;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a
          href={`#/grupo/${grupoId}`}
          onClick={(e) => { if (sucio && !confirm("Hay cambios sin guardar. ¿Salir igualmente?")) e.preventDefault(); }}
          className={`text-sm ${cls.enlace}`}
        >
          ← Volver al seguimiento
        </a>
        <div className="flex gap-2">
          <button type="button" className={cls.btn2} disabled={!anterior} onClick={() => irA(anterior)}>← Anterior</button>
          <button type="button" className={cls.btn2} disabled={!siguiente} onClick={() => irA(siguiente)}>Siguiente →</button>
        </div>
      </div>

      <div>
        <p className={`text-sm ${cls.tenue}`}>
          {entrega.titulo}
          {proyecto && ` · ${proyecto.titulo}`}
          {sesion && ` · sesión ${sesion.n}`}
        </p>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight">{nombreCompleto(alumno)}</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {nota?.origen === "ia" && <Pildora tono="ambar">Propuesta de la IA · sin revisar</Pildora>}
          {doble && <Pildora tono="azul">Doble corrección · centro + Opus anonimizado</Pildora>}
          {nota && (nota.publicada ? <Pildora tono="verde">Publicada</Pildora> : <Pildora tono="gris">Borrador</Pildora>)}
          {reenviada && <Pildora tono="azul">Reenviada tras corregir</Pildora>}
          {envio?.fuera_plazo && <Pildora tono="rojo">Fuera de plazo</Pildora>}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          {/* Lo entregado */}
          <section className={cls.tarjeta}>
            <h3 className={cls.h2}>Entrega</h3>
            {!envio ? (
              <p className={`mt-2 ${cls.suave}`}>Todavía no ha entregado nada. Puedes calificar igualmente (p. ej., con lo visto en clase).</p>
            ) : (
              <div className="mt-3 space-y-3 text-[15px]">
                {envio.repo && (
                  <p>
                    <b>Repositorio:</b>{" "}
                    <a className={cls.enlace} href={envio.repo} target="_blank" rel="noopener">{envio.repo.replace("https://github.com/", "")}</a>
                    {" · "}
                    <a className={cls.enlace} href={`${envio.repo}/commits`} target="_blank" rel="noopener">commits</a>
                    {" · "}
                    <a className={cls.enlace} href={`${envio.repo}/branches`} target="_blank" rel="noopener">ramas</a>
                    {" · "}
                    <a className={cls.enlace} href={`${envio.repo}/pulls?q=is%3Apr`} target="_blank" rel="noopener">PRs</a>
                  </p>
                )}
                {(envio.web || urlPages(envio.repo)) && (
                  <p>
                    <b>Web:</b>{" "}
                    <a className={cls.enlace} href={envio.web || urlPages(envio.repo)!} target="_blank" rel="noopener">{envio.web || urlPages(envio.repo)}</a>
                    {!envio.web && <span className={`text-sm ${cls.tenue}`}> (deducida del repo)</span>}
                  </p>
                )}
                {envio.texto && <div className="whitespace-pre-line rounded-xl bg-zinc-50 p-3 dark:bg-white/5">{envio.texto}</div>}
                {envio.comentario && <Aviso tono="gris"><b>Comentario del alumno:</b> {envio.comentario}</Aviso>}
                <p className={`text-sm ${cls.tenue}`}>
                  Entregada {haceCuanto(envio.updated_at)} ({fechaCorta(envio.updated_at)}) · versión {envio.version}
                </p>
                {envio.repo && <InfoRepo key={envio.repo} repo={envio.repo} completo auto />}
              </div>
            )}
          </section>

          {/* Rúbrica o nota directa */}
          <section className={cls.tarjeta}>
            {doble ? (
              <DobleCorreccion rubrica={rubrica!} correcciones={nota!.correcciones!} nota={nota!.nota} noEvaluable={nota!.no_evaluable} profesor />
            ) : rubrica ? (
              <>
                <h3 className={`${cls.h2} mb-4`}>{rubrica.titulo}</h3>
                <RubricaVista
                  rubrica={rubrica}
                  valoraciones={valoraciones}
                  minimos={minimos}
                  editable
                  onValoraciones={cambio(setValoraciones)}
                  onMinimos={cambio(setMinimos)}
                />
              </>
            ) : (
              <>
                <h3 className={cls.h2}>Nota</h3>
                <p className={`mt-1 text-sm ${cls.tenue}`}>Esta entrega no tiene rúbrica: nota directa de 0 a 10.</p>
                <input
                  className={`${cls.input} mt-3 max-w-[8rem] text-lg font-bold`}
                  inputMode="decimal"
                  value={notaManual}
                  onChange={(e) => cambio(setNotaManual)(e.target.value)}
                  aria-label="Nota"
                  placeholder="7,5"
                />
                {!notaManualValida && <p className="mt-1 text-sm text-red-700 dark:text-red-300">Tiene que ser un número entre 0 y 10.</p>}
              </>
            )}
          </section>
        </div>

        {/* Resultado y acciones */}
        <aside className="xl:sticky xl:top-20 xl:self-start">
          {doble ? (
            <div className={`${cls.tarjeta} space-y-4`}>
              <p className="text-4xl font-extrabold">{nota!.no_evaluable ? "NE" : formatoNota(nota!.nota)}</p>
              <p className={`text-sm ${cls.tenue}`}>
                Media de las dos correcciones (centro {formatoNota(nota!.correcciones!.centro.nota)} · Opus {formatoNota(nota!.correcciones!.opus.nota)}).
                {nota!.publicada ? " El alumno ya la ve." : " El alumno aún no la ve."}
              </p>
              {nota!.nota_privada && (
                <p className="whitespace-pre-line rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">{nota!.nota_privada}</p>
              )}
              {estado.t === "error" && <p role="alert" className="text-sm font-semibold text-red-700 dark:text-red-300">{estado.e}</p>}
              {estado.t === "ok" && <p role="status" className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">✓ {estado.m}</p>}
              <div className="flex flex-col gap-2">
                <button type="button" className={nota!.publicada ? cls.btn2 : cls.btnAzul} disabled={estado.t === "guardando"} onClick={() => cambiarEstado(!nota!.publicada)}>
                  {nota!.publicada ? "Despublicar (pasar a borrador)" : "Publicar"}
                </button>
                {siguiente && <button type="button" className={cls.btn2} onClick={() => irA(siguiente)}>Siguiente →</button>}
                <button
                  type="button"
                  className={cls.btn2}
                  onClick={() => { if (confirm("Corregir a mano sustituye la doble corrección cuando guardes. ¿Seguir?")) setManual(true); }}
                >
                  Corregir a mano
                </button>
              </div>
            </div>
          ) : (
          <div className={`${cls.tarjeta} space-y-4`}>
            {rubrica ? (
              <NotaGrande rubrica={rubrica} valoraciones={valoraciones} minimos={minimos} />
            ) : (
              <p className="text-4xl font-extrabold">{notaNum !== null && notaManualValida ? formatoNota(notaNum) : "—"}</p>
            )}
            {calc?.noEvaluable && (
              <p className="text-sm text-red-700 dark:text-red-300">
                Falla{calc.minimosFallidos.length > 1 ? "n" : ""} {calc.minimosFallidos.length} requisito{calc.minimosFallidos.length > 1 ? "s" : ""} mínimo{calc.minimosFallidos.length > 1 ? "s" : ""}: se publicará como NE.
              </p>
            )}
            <div>
              <label htmlFor="cor-com" className={cls.label}>Comentario para el alumno</label>
              <textarea id="cor-com" rows={5} className={`${cls.input} text-sm`} value={comentario} onChange={(e) => cambio(setComentario)(e.target.value)} placeholder="Lo mejor, lo que falta y el siguiente paso concreto…" />
            </div>
            <div>
              <label htmlFor="cor-priv" className={cls.label}>Nota privada <span className="font-normal text-zinc-400">· solo la ves tú</span></label>
              <textarea id="cor-priv" rows={2} className={`${cls.input} text-sm`} value={privada} onChange={(e) => cambio(setPrivada)(e.target.value)} />
            </div>
            {estado.t === "error" && <p role="alert" className="text-sm font-semibold text-red-700 dark:text-red-300">{estado.e}</p>}
            {estado.t === "ok" && <p role="status" className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">✓ {estado.m}</p>}
            {sucio && estado.t === "idle" && <p className="text-sm text-amber-700 dark:text-amber-300">Cambios sin guardar.</p>}
            <div className="flex flex-col gap-2">
              <button type="button" className={cls.btnAzul} disabled={estado.t === "guardando"} onClick={() => guardar(true)}>
                {nota?.publicada ? "Guardar cambios (publicada)" : "Guardar y publicar"}
              </button>
              <button type="button" className={cls.btn2} disabled={estado.t === "guardando"} onClick={() => guardar(false)}>
                {nota?.publicada ? "Despublicar (pasar a borrador)" : "Guardar borrador"}
              </button>
              {siguiente && (
                <button
                  type="button"
                  className={cls.btn2}
                  disabled={estado.t === "guardando"}
                  onClick={async () => {
                    // Mantiene el estado actual: una nota publicada sigue publicada.
                    if (await guardar(nota?.publicada ?? false)) irA(siguiente, true);
                  }}
                >
                  {nota?.publicada ? "Guardar y siguiente →" : "Guardar borrador y siguiente →"}
                </button>
              )}
              {nota && (
                <button type="button" className={cls.btnPeligro} onClick={descartar}>
                  Borrar corrección
                </button>
              )}
            </div>
            <p className={`text-xs ${cls.tenue}`}>
              Último acceso del alumno: {haceCuanto(alumno.ultimo_acceso)}.
              {nota && ` Corrección guardada ${haceCuanto(nota.updated_at)}.`}
            </p>
          </div>
          )}
        </aside>
      </div>
    </div>
  );
}
