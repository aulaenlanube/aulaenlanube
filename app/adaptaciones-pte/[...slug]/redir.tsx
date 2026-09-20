"use client";

// Componente de redireccion: PTE -> PT (Pedagogia Terapeutica).
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function OldPteRedirect() {
  const router = useRouter();
  const slug = useParams<{ slug?: string[] }>();
  useEffect(() => {
    const parts = Array.isArray(slug?.slug) ? slug!.slug.join("/") : "";
    router.replace("/adaptaciones-pt/" + parts + "/");
  }, [router, slug]);
  return null;
}
