import fs from "fs";
import path from "path";

// Los tutoriales viven en docs/tutoriales/*.md (la fuente editable; igual que
// el plan, el repo es público: nada de claves ahí). Cada md lleva frontmatter:
//   slug / title / meta_description / chip
// Y aquí se cachea la lectura en build (export estático: fs solo en build).

export type Tutorial = {
  slug: string;
  title: string;
  meta_description: string;
  chip: string;
  md: string;
};

const DIR = path.join(process.cwd(), "docs", "tutoriales");

export function leerTutorial(slug: string): Tutorial {
  const ruta = path.join(DIR, `${slug}.md`);
  if (!fs.existsSync(ruta)) throw new Error(`Falta docs/tutoriales/${slug}.md`);
  const raw = fs.readFileSync(ruta, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta: Record<string, string> = {};
  let cuerpo = raw;
  if (m) {
    cuerpo = raw.slice(m[0].length);
    for (const linea of m[1].split("\n")) {
      const kv = linea.match(/^(\w+):\s*(.*)$/);
      if (kv) {
        let v = kv[2].trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
        meta[kv[1]] = v;
      }
    }
  }
  return {
    slug,
    title: meta.title || slug,
    meta_description: meta.meta_description || "",
    chip: meta.chip || "Tutorial",
    md: cuerpo.trim(),
  };
}

export const SLUGS_TUTORIALES = ["github-pages", "api-externa", "chatbot", "medios"] as const;
