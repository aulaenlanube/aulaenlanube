"use client";

// Ejercicio reubicado dentro del Tema 1 (esta URL antigua redirige al apartado
// que le corresponde; el contenido sigue vivo en la nueva dirección).
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Movido() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/adaptaciones-pt/2eso/matematicas/tema-1/05-combinadas/");
  }, [router]);
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 text-center">
      <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900">Este ejercicio se ha movido</h1>
      <p className="mt-3 text-zinc-600">
        Ahora forma parte del Tema 1 de Matemáticas —{" "}
        <a className="font-semibold text-blue-700 underline" href="/adaptaciones-pt/2eso/matematicas/tema-1/05-combinadas/">mira el apartado completo aquí</a>.
      </p>
    </div>
  );
}
