import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getByPath,
  getAllPaths,
  segsToPath,
  SITE_NAME,
  SITE_URL,
} from "@/lib/content";
import LessonTemplate from "@/components/LessonTemplate";
import HubTemplate from "@/components/HubTemplate";
import ArticleTemplate from "@/components/ArticleTemplate";
import ExercisesTemplate from "@/components/ExercisesTemplate";
import ProductGridTemplate from "@/components/ProductGridTemplate";
import CourseIndexTemplate from "@/components/CourseIndexTemplate";
import HomeTemplate from "@/components/HomeTemplate";
import LegalTemplate from "@/components/LegalTemplate";

export const dynamicParams = false;

const AUTHOR_URL = "https://www.linkedin.com/in/edutorregrosa/";
const DEFAULT_OG = `${SITE_URL}/wp-content/uploads/2021/03/Logo-CABECERA-web-1-1024x280.webp`;

type Params = { path?: string[] };

// Decodifica el segmento para que la carpeta en disco use el carácter real
// (p.ej. "▷" en vez de "%e2%96%b7"); así LiteSpeed, que decodifica la URL al
// servir ficheros estáticos, encuentra la carpeta. Los enlaces y la canonical
// siguen usando la forma codificada (la que indexa Google).
function decodeSeg(s: string): string {
  let cur = s;
  for (let i = 0; i < 4; i++) {
    try {
      const d = decodeURIComponent(cur);
      if (d === cur) break;
      cur = d;
    } catch {
      break;
    }
  }
  return cur;
}

export function generateStaticParams(): Params[] {
  return getAllPaths().map((p) =>
    p === "/"
      ? { path: [] }
      : { path: p.replace(/^\/|\/$/g, "").split("/").map(decodeSeg) }
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { path } = await params;
  const p = segsToPath(path);
  const entry = getByPath(p);
  if (!entry) return {};

  const head = "head" in entry ? entry.head : undefined;
  const title =
    head?.title ||
    (p === "/"
      ? `${SITE_NAME} – Tutoriales y cursos de informática`
      : `${entry.title} – ${SITE_NAME}`);
  const description = entry.description;
  const image = (entry as { image?: string }).image;
  const isArticle = entry.kind === "article" || entry.kind === "exercises";
  const date = (entry as { date?: string }).date;
  const ogImage = image || DEFAULT_OG;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: entry.path },
    authors: [{ name: "Edu Torregrosa", url: AUTHOR_URL }],
    creator: "Edu Torregrosa",
    publisher: SITE_NAME,
    openGraph: {
      title,
      description,
      url: SITE_URL + entry.path,
      siteName: SITE_NAME,
      locale: "es_ES",
      type: isArticle ? "article" : "website",
      images: [{ url: ogImage }],
      ...(isArticle && date
        ? {
            publishedTime: date.replace(" ", "T"),
            modifiedTime: date.replace(" ", "T"),
            authors: [AUTHOR_URL],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { path } = await params;
  const entry = getByPath(segsToPath(path));
  if (!entry) notFound();

  switch (entry.kind) {
    case "home":
      return <HomeTemplate entry={entry} />;
    case "lesson":
      return <LessonTemplate entry={entry} />;
    case "hub":
      return <HubTemplate entry={entry} />;
    case "exercises":
      return <ExercisesTemplate entry={entry} />;
    case "courseIndex":
      return <CourseIndexTemplate entry={entry} />;
    case "legal":
      return <LegalTemplate entry={entry} />;
    case "article":
      return entry.cards?.length ? (
        <ProductGridTemplate entry={entry} />
      ) : (
        <ArticleTemplate entry={entry} />
      );
  }
}
