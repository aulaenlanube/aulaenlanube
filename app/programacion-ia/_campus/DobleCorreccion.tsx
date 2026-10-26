"use client";

// Doble corrección de una entrega (origen 'doble'): la del modelo de IA del
// centro y la de Claude Opus sobre la entrega anonimizada, con la misma
// rúbrica; la nota es la media. La ven el alumno (al publicarla) y el
// profesor, que además ve las notas privadas de cada corrección.

import type { Correcciones, CorreccionIA } from "@/lib/campus/cliente";
import { formatoNota, type Rubrica } from "@/lib/campus/rubricas";
import { TONO_NIVEL } from "./Rubrica";
import { Aviso, cls } from "./ui";

const FUENTES = [
  { id: "centro", corto: "Centro", nombre: "Modelo de IA del centro", detalle: "servidor del propio instituto" },
  { id: "opus", corto: "Opus", nombre: "Claude Opus", detalle: "entrega anonimizada" },
] as const;

/** Cómo se ha corregido: transparencia sobre el uso de IA y la protección de datos. */
export function MetodoDobleCorreccion() {
  return (
    <Aviso tono="azul">
      <h4 className="font-bold">Cómo se ha corregido este proyecto</h4>
      <p className="mt-2">
        Tu proyecto se ha corregido <b>dos veces, de forma independiente</b>, con la misma rúbrica oficial y las mismas evidencias
        objetivas: el historial de git, tu web publicada (medida con un navegador real en escritorio y en móvil) y el código del repositorio.
      </p>
      <ol className="mt-2 list-decimal space-y-1 pl-5">
        <li>
          <b>Modelo de IA del centro.</b> Se ejecuta en un servidor del propio instituto: tus datos no salen del centro.
        </li>
        <li>
          <b>Claude Opus</b> (Anthropic), un modelo de IA de frontera de mayor calidad, usado para tener una segunda opinión más fina.
          Para no ceder ningún dato personal, <b>tu entrega se le envió completamente anonimizada</b>: identificada solo por un código
          aleatorio, sin tu nombre, correo, usuario de GitHub, dominio, redes sociales, centro ni localidad, y sin fotos ni vídeos. Opus
          recibió únicamente la rúbrica y lo que entregaste; <b>en ningún momento supo a quién pertenecía el trabajo</b>. La relación entre
          ese código y tu nombre solo la tiene el profesor.
        </li>
      </ol>
      <p className="mt-2">
        <b>Tu nota es la media de las dos correcciones.</b> La IA ha sido una ayuda para corregir: el profesor ha revisado el resultado y es
        quien decide y publica la nota. Si no estás de acuerdo con algo, pídele una revisión.
      </p>
      <p className={`mt-2 text-sm`}>
        Este procedimiento aplica la minimización de datos y la protección de datos desde el diseño del RGPD y la LOPDGDD, y la
        transparencia y la supervisión humana que exige el Reglamento Europeo de Inteligencia Artificial (AI Act) cuando se usa IA en la
        evaluación educativa.
      </p>
    </Aviso>
  );
}

function NivelChip({ rubrica, n, etiqueta }: { rubrica: Rubrica; n: number | undefined; etiqueta: string }) {
  const t = n !== undefined ? TONO_NIVEL[n] : undefined;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${t ? `${t.borde} ${t.fondo} ${t.texto}` : "border-zinc-200"}`}>
      {etiqueta}: {n !== undefined ? rubrica.niveles[n]?.nombre : "—"}
    </span>
  );
}

function notaTexto(c: CorreccionIA) {
  return c.no_evaluable ? `NE (rúbrica ${formatoNota(c.nota)})` : formatoNota(c.nota);
}

type Props = { rubrica: Rubrica; correcciones: Correcciones; nota: number | null; noEvaluable: boolean; profesor?: boolean };

export default function DobleCorreccion({ rubrica, correcciones: cs, nota, noEvaluable, profesor = false }: Props) {
  const inf = cs.informe;
  const color = noEvaluable ? "text-red-700 dark:text-red-300" : (nota ?? 0) >= 5 ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300";
  const fallidos = rubrica.minimos.filter((m) => !(cs.centro.minimos[m.id] && cs.opus.minimos[m.id]));

  return (
    <div className="space-y-5">
      {/* Nota final y las dos notas */}
      <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
        <div>
          <p className={`text-xs font-bold uppercase tracking-wider ${cls.tenue}`}>Nota final · media</p>
          <p className={`text-5xl font-extrabold tracking-tight ${color}`}>{noEvaluable ? "NE" : formatoNota(nota)}</p>
          {noEvaluable && <p className={`text-sm ${cls.tenue}`}>no evaluable · tu rúbrica vale {formatoNota(nota)}</p>}
        </div>
        {FUENTES.map((f) => (
          <div key={f.id} className="rounded-xl border border-zinc-200 px-4 py-2 dark:border-white/10">
            <p className={`text-xs font-bold uppercase tracking-wider ${cls.tenue}`}>{f.nombre}</p>
            <p className="text-2xl font-extrabold">{notaTexto(cs[f.id])}</p>
            <p className={`text-xs ${cls.tenue}`}>{f.detalle}</p>
          </div>
        ))}
      </div>

      {noEvaluable && (
        <Aviso tono="rojo">
          <b>No evaluable:</b> no se cumple{fallidos.length > 1 ? "n" : ""} {fallidos.length === 1 ? "este requisito mínimo" : "estos requisitos mínimos"}:{" "}
          {fallidos.map((m) => m.texto).join(" · ")} Arréglalo y actualiza la entrega mientras siga abierta: la rúbrica ya te dice cuánto sacarías.
        </Aviso>
      )}

      <MetodoDobleCorreccion />

      {/* Informe final */}
      {inf && (
        <section className="space-y-4">
          <h3 className={cls.h2}>Informe final</h3>
          <p className="text-[15px] leading-relaxed">{inf.resumen}</p>
          <div>
            <h4 className="font-bold">En qué se basa tu nota</h4>
            <p className="mt-1 text-[15px] leading-relaxed">{inf.por_que}</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-500/30 dark:bg-emerald-500/10">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-200">Lo que has hecho bien</h4>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px]">{inf.fortalezas.map((f, i) => <li key={i}>{f}</li>)}</ul>
            </div>
            <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-500/30 dark:bg-blue-500/10">
              <h4 className="font-bold text-blue-900 dark:text-blue-200">Siguientes pasos</h4>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[15px]">{inf.siguientes_pasos.map((p, i) => <li key={i}>{p}</li>)}</ol>
            </div>
          </div>
          <div>
            <h4 className="font-bold">Áreas de mejora (por impacto en la nota)</h4>
            <div className="mt-2 space-y-3">
              {inf.mejoras.map((m, i) => (
                <div key={i} className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 text-[15px] dark:border-amber-500/30 dark:bg-amber-500/10">
                  <p className="font-bold text-amber-900 dark:text-amber-200">{i + 1}. {m.area}</p>
                  <p className="mt-1"><b>Qué pasa:</b> {m.que}</p>
                  <p className="mt-1"><b>Cómo mejorarlo:</b> {m.como}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Requisitos mínimos según cada corrección */}
      <section className="rounded-2xl border border-red-200 bg-red-50/60 p-4 dark:border-red-500/30 dark:bg-red-500/10">
        <h3 className="text-[15px] font-bold text-red-900 dark:text-red-200">Requisitos mínimos (sin ellos, el proyecto no se evalúa)</h3>
        <ul className="mt-2 space-y-2">
          {rubrica.minimos.map((m) => (
            <li key={m.id} className="flex flex-wrap items-start justify-between gap-2 text-sm text-zinc-800 dark:text-zinc-200">
              <span className="min-w-0 flex-1">{m.texto}</span>
              <span className="flex gap-2 font-bold">
                {FUENTES.map((f) => {
                  const ok = cs[f.id].minimos[m.id] === true;
                  return (
                    <span key={f.id} className={ok ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"}>
                      {f.corto} {ok ? "✓" : "✗"}
                    </span>
                  );
                })}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Rúbrica detallada: las dos valoraciones de cada criterio */}
      <section className="space-y-4">
        <h3 className={cls.h2}>Rúbrica detallada</h3>
        {rubrica.criterios.map((c) => {
          const va = cs.centro.valoraciones[c.id];
          const vb = cs.opus.valoraciones[c.id];
          const pts = (v?: { n: number }) => (v ? (c.peso * (rubrica.niveles[v.n]?.pct ?? 0)) / 100 : 0);
          return (
            <div key={c.id} className="rounded-2xl border border-zinc-200 p-4 dark:border-white/10">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-[15px] font-bold">
                  {c.nombre}
                  <span className="ml-2 rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-600 dark:bg-white/10 dark:text-zinc-300">{c.peso} % de la nota</span>
                </h4>
                <span className={`text-xs font-semibold ${cls.tenue}`}>media: {formatoNota(Math.round(((pts(va) + pts(vb)) / 2) * 10) / 100)} de {formatoNota(c.peso / 10)} pts</span>
              </div>
              <p className={`mt-0.5 text-xs ${cls.tenue}`}>{c.qué}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                {c.niveles.map((desc, i) => {
                  const marcas = [va?.n === i && "Centro", vb?.n === i && "Opus"].filter(Boolean);
                  const t = TONO_NIVEL[i];
                  return (
                    <div key={i} className={`rounded-xl border p-3 text-[13px] leading-snug ${marcas.length ? `${t.borde} ${t.fondo} ${t.anillo} ring-2` : "border-zinc-200 opacity-55 dark:border-white/10"}`}>
                      <span className={`mb-1 block text-[11px] font-bold uppercase tracking-wider ${t.texto}`}>
                        {rubrica.niveles[i].nombre} · {rubrica.niveles[i].pct}%{marcas.length > 0 && ` · ✓ ${marcas.join(" y ")}`}
                      </span>
                      <span className="text-zinc-700 dark:text-zinc-300">{desc}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 space-y-2 text-sm">
                {FUENTES.map((f) => {
                  const v = cs[f.id].valoraciones[c.id];
                  return (
                    <div key={f.id} className="rounded-xl bg-zinc-50 px-3 py-2 text-zinc-700 dark:bg-white/5 dark:text-zinc-300">
                      <NivelChip rubrica={rubrica} n={v?.n} etiqueta={f.nombre} /> {v?.c && <span className="ml-1">{v.c}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* Comentario de cada corrección */}
      <section className="grid gap-4 lg:grid-cols-2">
        {FUENTES.map((f) => (
          <div key={f.id} className="rounded-2xl border border-zinc-200 p-4 dark:border-white/10">
            <h4 className="font-bold">Comentario · {f.nombre}</h4>
            <p className="mt-1 whitespace-pre-line text-[15px]">{cs[f.id].comentario}</p>
            {profesor && cs[f.id].privado && (
              <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
                <b>Nota privada (solo tú):</b> {cs[f.id].privado}
              </p>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
