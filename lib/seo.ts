import { SITE_NAME, SITE_URL } from "./content";
import type { Lesson, ArticleEntry, NavLink } from "./content";

function strip(s: string): string {
  return (s || "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

export function videoLd(l: Lesson) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: l.title,
    description: strip(l.desc) || l.title,
    thumbnailUrl: [`https://i.ytimg.com/vi/${l.videoId}/hqdefault.jpg`],
    uploadDate: l.date ? l.date.replace(" ", "T") : undefined,
    embedUrl: `https://www.youtube-nocookie.com/embed/${l.videoId}`,
    contentUrl: `https://www.youtube.com/watch?v=${l.videoId}`,
  };
}

export function articleLd(e: ArticleEntry) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: e.title,
    datePublished: e.date ? e.date.replace(" ", "T") : undefined,
    image: e.image ? [e.image] : undefined,
    author: { "@type": "Person", name: "Edu Torregrosa" },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: SITE_URL + e.path,
  };
}

export function breadcrumbLd(crumbs: NavLink[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      item: SITE_URL + c.path,
    })),
  };
}
