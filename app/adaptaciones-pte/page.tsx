"use client";

// Seccion renombrada PTE -> PT (Pedagogia Terapeutica): redirige a la nueva ruta.
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OldPteIndexRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/adaptaciones-pt/");
  }, [router]);
  return null;
}
