import fs from "fs";
import path from "path";
import React from "react";

/* ── Minimal Markdown renderer (sin dependencias): headers, tablas, listas, bold, inline code ── */
type Blk =
  | { t: "h"; lvl: number; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "hr" };

function parse(md: string): Blk[] {
  const lines = md.split(/\r?\n/);
  const out: Blk[] = [];
  let i = 0;
  while (i < lines.length) {
    const ln = lines[i];
    if (/^\s*$/.test(ln)) { i++; continue; }
    const h = ln.match(/^(#{1,4})\s+(.*)$/);
    if (h) { out.push({ t: "h", lvl: h[1].length, text: h[2] }); i++; continue; }
    if (/^(-{3,}|\*{3,})\s*$/.test(ln)) { out.push({ t: "hr" }); i++; continue; }
    if (/^\s*[-*]\s+/.test(ln)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*[-*]\s+/, "")); i++; }
      out.push({ t: "ul", items }); continue;
    }
    if (/^\s*\d+\.\s+/.test(ln)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*\d+\.\s+/, "")); i++; }
      out.push({ t: "ol", items }); continue;
    }
    if (ln.includes("|") && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[i + 1]) && lines[i + 1].includes("-")) {
      const cells = (s: string) => s.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(c => c.trim());
      const head = cells(ln); i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|")) { rows.push(cells(lines[i])); i++; }
      out.push({ t: "table", head, rows }); continue;
    }
    const para: string[] = [];
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,4}\s|\s*[-*]\s|\s*\d+\.\s)/.test(lines[i]) && !/^(-{3,})\s*$/.test(lines[i])) { para.push(lines[i]); i++; }
    if (para.length) out.push({ t: "p", text: para.join(" ") });
  }
  return out;
}

function inline(s: string, key: number): React.ReactNode {
  // **bold**, `code`, enlaces [t](u)
  const parts: React.ReactNode[] = [];
  const re = /(\*\*([^*]+)\*\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(s))) {
    if (m.index > last) parts.push(s.slice(last, m.index));
    if (m[1]) parts.push(<strong key={k++}>{m[2]}</strong>);
    else if (m[3]) parts.push(<code key={k++} className="rounded bg-slate-100 dark:bg-white/10 px-1 py-0.5 text-[0.85em] font-mono">{m[4]}</code>);
    else if (m[5]) parts.push(<a key={k++} href={m[7]} className="text-[#1d4ed8] dark:text-blue-300 underline underline-offset-2">{m[6]}</a>);
    last = m.index + m[0].length;
  }
  if (last < s.length) parts.push(s.slice(last));
  return <span key={key}>{parts}</span>;
}

export function RenderDoc({ doc }: { doc: string; titulo?: string }) {
  const file = path.join(process.cwd(), "docs", doc);
  const md = fs.readFileSync(file, "utf8");
  const blocks = parse(md);
  const cls = {
    h1: "mt-10 text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 first:mt-0",
    h2: "mt-8 text-xl font-bold text-slate-900 dark:text-zinc-100 border-b border-slate-200 dark:border-white/10 pb-1",
    h3: "mt-6 text-lg font-semibold text-slate-800 dark:text-zinc-200",
    h4: "mt-4 text-base font-semibold text-slate-800 dark:text-zinc-200",
  } as const;
  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-300">
        Acceso restringido · visión interna del claustro · no publicar
      </div>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h": {
            const T = (["h1", "h2", "h3", "h4"] as const)[Math.min(b.lvl, 4) - 1];
            const c = cls[T as keyof typeof cls];
            return <T key={i} className={c}>{inline(b.text, i)}</T>;
          }
          case "p": return <p key={i} className="mt-3 leading-relaxed text-slate-700 dark:text-zinc-300">{inline(b.text, i)}</p>;
          case "hr": return <hr key={i} className="my-8 border-slate-200 dark:border-white/10" />;
          case "ul": return (
            <ul key={i} className="mt-3 list-disc space-y-1.5 pl-6 text-slate-700 dark:text-zinc-300 marker:text-slate-400 dark:marker:text-zinc-500">
              {b.items.map((it, j) => <li key={j}>{inline(it, j)}</li>)}
            </ul>
          );
          case "ol": return (
            <ol key={i} className="mt-3 list-decimal space-y-1.5 pl-6 text-slate-700 dark:text-zinc-300 marker:text-slate-400 dark:marker:text-zinc-500">
              {b.items.map((it, j) => <li key={j}>{inline(it, j)}</li>)}
            </ol>
          );
          case "table": return (
            <div key={i} className="mt-4 overflow-x-auto rounded-lg border border-slate-200 dark:border-white/10">
              <table className="min-w-full border-collapse text-sm">
                <thead className="bg-slate-50 dark:bg-white/5 text-left text-slate-700 dark:text-zinc-200">
                  <tr>{b.head.map((h2, j) => <th key={j} className="px-3 py-2 font-semibold">{inline(h2, j)}</th>)}</tr>
                </thead>
                <tbody>
                  {b.rows.map((r, j) => (
                    <tr key={j} className="border-t border-slate-100 dark:border-white/10 align-top">
                      {r.map((c, k) => <td key={k} className="px-3 py-2 text-slate-700 dark:text-zinc-300">{inline(c, k)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      })}
      <p className="mt-10 border-t border-slate-200 dark:border-white/10 pt-4 text-xs text-slate-500 dark:text-zinc-400">
        Fuente de verdad: <code className="font-mono">docs/plan-curso-programacion-ia-2026-27.md</code> en el repositorio.
        Para editar el plan, actualizar ese fichero y redesplegar (JARVIS lo mantiene).
      </p>
    </article>
  );
}
