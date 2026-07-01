import { SITE_NAME, SITE_URL } from "./content";
import type { Lesson, ArticleEntry, NavLink } from "./content";
import { SOCIAL } from "./social";

function strip(s: string): string {
  return (s || "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

// Identificadores estables para enlazar los nodos del grafo (Google los deduplica).
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const LOGO = `${SITE_URL}/wp-content/uploads/2021/03/Logo-CABECERA-web-1-1024x280.webp`;
const AUTHOR_URL = "https://www.linkedin.com/in/edutorregrosa/";
const SAMEAS = SOCIAL.map((s) => s.u);
const DESC =
  "Cursos y tutoriales gratuitos de programación, informática y edición multimedia: Java, Google, GIMP, OBS, hardware y mucho más.";

const orgRef = { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/`, logo: { "@type": "ImageObject", url: LOGO } };
const authorRef = { "@type": "Person", name: "Edu Torregrosa", url: AUTHOR_URL };

// ---- Grafo de sitio (va en el layout, en todas las páginas) ----
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: "aulaenlanube",
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: LOGO },
    image: LOGO,
    description: DESC,
    email: "info@aulaenlanube.com",
    inLanguage: "es-ES",
    founder: { "@type": "Person", name: "Edu Torregrosa Llácer", url: AUTHOR_URL },
    sameAs: SAMEAS,
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description: DESC,
    inLanguage: "es-ES",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/buscar/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

// ---- Esquemas por página ----
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
    inLanguage: "es-ES",
    publisher: orgRef,
    isFamilyFriendly: true,
  };
}

export function articleLd(e: Pick<ArticleEntry, "title" | "date" | "image" | "path"> & { description?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: e.title,
    description: e.description ? strip(e.description) : undefined,
    datePublished: e.date ? e.date.replace(" ", "T") : undefined,
    dateModified: e.date ? e.date.replace(" ", "T") : undefined,
    image: e.image ? [e.image] : undefined,
    inLanguage: "es-ES",
    author: authorRef,
    publisher: orgRef,
    isPartOf: { "@id": SITE_ID },
    mainEntityOfPage: SITE_URL + e.path,
  };
}

// Curso educativo (índices de curso). Válido y útil para SEO/GEO: deja claro que
// es formación online gratuita en español impartida por Aula en la nube.
export function courseLd(o: { name: string; description?: string; url: string; image?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: strip(o.name),
    description: o.description ? strip(o.description) : `Curso gratuito de ${strip(o.name)} en Aula en la nube.`,
    url: o.url,
    inLanguage: "es-ES",
    image: o.image ? [o.image] : undefined,
    provider: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/`, sameAs: SAMEAS },
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: 0, priceCurrency: "EUR", availability: "https://schema.org/InStock", category: "Gratis" },
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: strip(f.q),
      acceptedAnswer: { "@type": "Answer", text: strip(f.a) },
    })),
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
