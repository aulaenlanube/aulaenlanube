"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { SearchItem } from "@/lib/content";

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export default function SearchResults({ index }: { index: SearchItem[] }) {
  const params = useSearchParams();
  const [q, setQ] = useState("");

  useEffect(() => {
    setQ(params.get("q") || "");
  }, [params]);

  const results = useMemo(() => {
    const n = norm(q.trim());
    if (n.length < 2) return [];
    return index.filter((i) => norm(i.t).includes(n)).slice(0, 60);
  }, [q, index]);

  return (
    <div className="mt-6">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        type="search"
        placeholder="Escribe para buscar…"
        aria-label="Buscar"
        autoFocus
        className="w-full rounded-md border border-zinc-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {q.trim().length >= 2 ? (
        <>
          <p className="mt-4 text-sm text-zinc-500">
            {results.length} resultado{results.length === 1 ? "" : "s"} para «{q.trim()}»
          </p>
          <ul className="mt-2 divide-y divide-zinc-100">
            {results.map((r) => (
              <li key={r.p}>
                <Link href={r.p} className="block py-2.5 text-blue-700 hover:underline">
                  {r.t}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-4 text-sm text-zinc-500">Escribe al menos 2 caracteres.</p>
      )}
    </div>
  );
}
