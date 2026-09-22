"use client";

// Ejercicio reubicado dentro del Tema 1 (esta URL antigua redirige al apartado
// que le corresponde; el contenido sigue vivo en la nueva dirección).
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Movido() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/adaptaciones-pt/2eso/matematicas/tema-1/04-suma-resta/");
  }, [router]);
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 text-center">
      <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Este ejercicio se ha movido</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Ahora forma parte del Tema 1 de Matemáticas —{" "}
        <a className="font-semibold text-blue-700 dark:text-blue-300 underline" href="/adaptaciones-pt/2eso/matematicas/tema-1/04-suma-resta/">mira el apartado completo aquí</a>.
      </p>
    </div>
  );
}
