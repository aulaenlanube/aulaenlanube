import PromptBlock from "@/components/PromptBlock";
import Link from "@/components/Link";
import type { ReactNode } from "react";

// Renderizador de los markdown de tutoriales (docs/tutoriales/*.md → página).
// Componente de SERVIDOR: solo elementos + PromptBlock (client) para los
// bloques de prompt copiables. Cubre: párrafos, listas (un nivel de anidado),
// tablas GFM, blockquote, encabezados ##/###, negrita, `código`, enlaces
// [t](u) — internos con <Link> — y cercas de código. Nada de HTML crudo.

function enLinea(txt: string, keyBase: string): ReactNode[] {
  const nodos: ReactNode[] = [];
  const re = /(\*\*([^*]+)\*\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)\s]+)\))|(_([^_]+)_)/g;
  let ultimo = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(txt))) {
    if (m.index > ultimo) nodos.push(txt.slice(ultimo, m.index));
    const k = `${keyBase}-${i++}`;
    if (m[1]) nodos.push(<strong key={k}>{m[2]}</strong>);
    else if (m[3])
      nodos.push(
        <code key={k} className="rounded bg-zinc-100 dark:bg-white/10 px-1 py-0.5 font-mono text-[13px] text-pink-700 dark:text-pink-300">
          {m[4]}
        </code>
      );
    else if (m[5]) {
      const url = m[7];
      const texto = m[6];
      nodos.push(
        url.startsWith("/") ? (
          <Link key={k} href={url} className="font-semibold text-blue-700 dark:text-blue-300 underline underline-offset-2">
            {texto}
          </Link>
        ) : (
          <a key={k} href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 dark:text-blue-300 underline underline-offset-2">
            {texto}
          </a>
        )
      );
    } else if (m[8]) nodos.push(<em key={k}>{m[9]}</em>);
    ultimo = m.index + m[0].length;
  }
  if (ultimo < txt.length) nodos.push(txt.slice(ultimo));
  return nodos;
}

const liCls = "text-[15px] text-zinc-700 dark:text-zinc-300";

export default function Prosa({ md }: { md: string }) {
  const lineas = md.replace(/\r\n/g, "\n").split("\n");
  const bloques: ReactNode[] = [];
  let k = 0;
  let i = 0;

  const parrafoDe = (arr: string[], key: string) => (
    <p key={key} className="mt-3 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
      {enLinea(arr.join(" ").trim(), key)}
    </p>
  );

  while (i < lineas.length) {
    const L = lineas[i];

    // Cerca de código → PromptBlock (copiable)
    if (/^```/.test(L.trim())) {
      const cuerpo: string[] = [];
      i++;
      while (i < lineas.length && !/^```/.test(lineas[i].trim())) {
        cuerpo.push(lineas[i]);
        i++;
      }
      i++; // cerrar cerca
      bloques.push(<PromptBlock key={`pb${k++}`} text={cuerpo.join("\n").trim()} />);
      continue;
    }

    if (/^###\s+/.test(L)) {
      const t = L.replace(/^###\s+/, "").trim();
      bloques.push(
        <h4 key={`h${k++}`} id={t.toLowerCase().replace(/[^\wáéíóúñü]+/g, "-")} className="mt-6 text-[16px] font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          {enLinea(t, `h${k}`)}
        </h4>
      );
      i++;
      continue;
    }
    if (/^##\s+/.test(L)) {
      const t = L.replace(/^##\s+/, "").trim();
      bloques.push(
        <h2 key={`h${k++}`} className="mt-9 text-xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          {enLinea(t, `h${k}`)}
        </h2>
      );
      i++;
      continue;
    }

    // Tabla GFM
    if (L.trim().startsWith("|") && i + 1 < lineas.length && /^\|?[\s:|-]+\|?$/.test(lineas[i + 1].trim()) && lineas[i + 1].includes("-")) {
      const cab = L.split("|").map((c) => c.trim()).filter(Boolean);
      i += 2;
      const filas: string[][] = [];
      while (i < lineas.length && lineas[i].trim().startsWith("|")) {
        filas.push(lineas[i].split("|").map((c) => c.trim()));
        // conservar columnas (incluidos vacíos del primer split)
        filas[filas.length - 1] = lineas[i].trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
        i++;
      }
      const key = `t${k++}`;
      bloques.push(
        <div key={key} className="my-4 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="bg-zinc-100 dark:bg-white/10 text-left">
                {cab.map((c, ci) => (
                  <th key={ci} className="px-3.5 py-2.5 font-bold text-zinc-800 dark:text-zinc-200">{enLinea(c, `${key}-c${ci}`)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filas.map((f, fi) => (
                <tr key={fi} className="border-t border-zinc-200 dark:border-white/10 align-top">
                  {f.map((c, ci) => (
                    <td key={ci} className="px-3.5 py-2.5 text-zinc-600 dark:text-zinc-400">{enLinea(c, `${key}-${fi}-${ci}`)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Blockquote
    if (L.trim().startsWith(">")) {
      const arr: string[] = [];
      while (i < lineas.length && lineas[i].trim().startsWith(">")) {
        arr.push(lineas[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      const key = `bq${k++}`;
      bloques.push(
        <blockquote key={key} className="my-4 rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-4 text-[15px] text-blue-900 dark:text-blue-200">
          {enLinea(arr.join(" "), key)}
        </blockquote>
      );
      continue;
    }

    // Listas (radio + un nivel de sublista indentada)
    if (/^\s*([-*•]|\d+[.)])\s+/.test(L)) {
      const ordenada = /^\s*\d+[.)]\s+/.test(L);
      const items: { texto: string; sub: string[] }[] = [];
      while (i < lineas.length && /^\s*([-*•]|\d+[.)])\s+/.test(lineas[i])) {
        const item = lineas[i].replace(/^\s*([-*•]|\d+[.)])\s+/, "").trim();
        items.push({ texto: item, sub: [] });
        i++;
        // subitems indentados y líneas de continuación
        while (i < lineas.length && /^\s{2,}\S/.test(lineas[i]) && !/^\s*([-*•]|\d+[.)])\s*$/.test(lineas[i])) {
          const sub = lineas[i].trim().replace(/^([-*•]|\d+[.)])\s+/, "");
          const ultimo = items[items.length - 1];
          if (/^\s{2,}([-*•]|\d+[.)])\s/.test(lineas[i]) || sub !== lineas[i].trim()) ultimo.sub.push(sub);
          else ultimo.texto += " " + sub;
          i++;
        }
      }
      const key = `ul${k++}`;
      const Ul = ordenada ? "ol" : "ul";
      bloques.push(
        <Ul key={key} className={`${ordenada ? "list-decimal" : "list-disc"} my-3 space-y-1.5 pl-6`}>
          {items.map((it, ii) => (
            <li key={ii} className={liCls}>
              {enLinea(it.texto, `${key}-${ii}`)}
              {it.sub.length > 0 && (
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
                  {it.sub.map((s, si) => (
                    <li key={si}>{enLinea(s, `${key}-${ii}-${si}`)}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </Ul>
      );
      continue;
    }

    // Regla horizontal → separador visual
    if (/^(-{3,}|\*{3,})$/.test(L.trim())) {
      bloques.push(<hr key={`hr${k++}`} className="my-8 border-zinc-200 dark:border-white/10" />);
      i++;
      continue;
    }

    // Vacío
    if (L.trim() === "") {
      i++;
      continue;
    }

    // Párrafo (líneas consecutivas hasta bloque roto)
    const arr: string[] = [];
    while (i < lineas.length && lineas[i].trim() !== "" && !/^```/.test(lineas[i].trim()) && !/^(#|>|\s*[-*•]|\s*\d+[.)]|\|)/.test(lineas[i]) && !/^(-{3,}|\*{3,})$/.test(lineas[i].trim())) {
      arr.push(lineas[i].trim());
      i++;
    }
    if (arr.length) bloques.push(parrafoDe(arr, `p${k++}`));
    else {
      bloques.push(<p key={`p${k++}`} className="mt-3 text-[15px] text-zinc-700 dark:text-zinc-300">{enLinea(L.trim(), `p${k}`)}</p>);
      i++;
    }
  }

  return <div>{bloques}</div>;
}
