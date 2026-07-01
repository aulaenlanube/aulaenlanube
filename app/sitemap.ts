import type { MetadataRoute } from "next";
import { getAllForSitemap, SITE_URL } from "@/lib/content";

export const dynamic = "force-static";

// Prioridad y frecuencia según el tipo de página (profundidad de la ruta):
// la home y las secciones principales pesan más que las lecciones profundas.
function meta(path: string): { priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] } {
  if (path === "/") return { priority: 1.0, changeFrequency: "weekly" };
  if (/^\/(politica-de-|condiciones-de-uso)/.test(path)) return { priority: 0.3, changeFrequency: "yearly" };
  const depth = path.replace(/^\/|\/$/g, "").split("/").length;
  if (depth <= 1) return { priority: 0.8, changeFrequency: "weekly" };
  if (depth === 2) return { priority: 0.7, changeFrequency: "monthly" };
  return { priority: 0.6, changeFrequency: "monthly" };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllForSitemap().map((e) => ({
    url: SITE_URL + e.path,
    lastModified: e.lastmod,
    ...meta(e.path),
  }));
}
