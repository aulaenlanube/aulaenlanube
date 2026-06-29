import { Suspense } from "react";
import type { Metadata } from "next";
import { getSearchIndex } from "@/lib/content";
import SearchResults from "@/components/SearchResults";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Buscar – Aula en la nube",
  robots: { index: false, follow: true },
};

export default function BuscarPage() {
  const index = getSearchIndex();
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-12">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Buscar en la web</h1>
      <Suspense fallback={null}>
        <SearchResults index={index} />
      </Suspense>
    </div>
  );
}
