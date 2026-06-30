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
import ProductGridTemplate from "@/components/ProductGridTemplate";
import CourseIndexTemplate from "@/components/CourseIndexTemplate";
import HomeTemplate from "@/components/HomeTemplate";

export const dynamicParams = false;

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

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: entry.path },
    openGraph: {
      title,
      description,
      url: SITE_URL + entry.path,
      siteName: SITE_NAME,
      type: entry.kind === "article" ? "article" : "website",
      images: image ? [{ url: image }] : undefined,
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
    case "courseIndex":
      return <CourseIndexTemplate entry={entry} />;
    case "article":
      return entry.cards?.length ? (
        <ProductGridTemplate entry={entry} />
      ) : (
        <ArticleTemplate entry={entry} />
      );
  }
}
