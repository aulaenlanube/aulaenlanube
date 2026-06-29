import type { MetadataRoute } from "next";
import { getAllForSitemap, SITE_URL } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllForSitemap().map((e) => ({
    url: SITE_URL + e.path,
    lastModified: e.lastmod,
  }));
}
