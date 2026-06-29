"use client";

import Link from "@/components/Link";
import { useState } from "react";

// Endpoint de suscripción. Cuando esté listo el backend (p.ej. subscribe.php
// en el servidor → MySQL, o un servicio externo), se define en
// NEXT_PUBLIC_SUBSCRIBE_URL y el formulario envía de verdad. Sin él, valida y
// muestra confirmación sin enviar a ningún sitio.
const ENDPOINT = process.env.NEXT_PUBLIC_SUBSCRIBE_URL || "";

type Status = "idle" | "sending" | "ok" | "error";

export default function NewsletterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [terms, setTerms] = useState(false);
  const [hp, setHp] = useState(""); // honeypot anti-bots (oculto)
  const [status, setStatus] = useState<Status>("idle");

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = name.trim().length > 1 && emailOk && terms && status !== "sending";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim(), email: email.trim(), website: hp }),
        });
        if (!res.ok) throw new Error();
      }
      setStatus("ok");
      setName("");
      setEmail("");
      setTerms(false);
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-2" aria-hidden="true">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="mt-4 text-lg font-semibold text-white">¡Gracias por suscribirte!</p>
        <p className="mt-1 text-sm text-zinc-300">Te avisaré de cada curso nuevo que publique.</p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-zinc-800 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot anti-bots: oculto para humanos */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre"
        aria-label="Tu nombre"
        autoComplete="name"
        className={inputCls}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu dirección de correo electrónico"
        aria-label="Tu dirección de correo electrónico"
        autoComplete="email"
        className={inputCls}
      />
      <label className="flex items-start gap-2.5 text-sm font-semibold text-emerald-400">
        <input
          type="checkbox"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          className="mt-0.5 h-4 w-4 flex-none accent-emerald-500"
        />
        <span>
          He leído y acepto los{" "}
          <Link href="/condiciones-de-uso/" className="underline hover:text-emerald-300">
            términos y condiciones
          </Link>
        </span>
      </label>
      <button
        type="submit"
        disabled={!canSubmit}
        className="rounded-md bg-slate-500 px-6 py-3 font-semibold text-white shadow-sm transition enabled:hover:bg-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? "Enviando…" : "Suscribirse"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-400">No se pudo completar la suscripción. Inténtalo de nuevo.</p>
      )}
    </form>
  );
}
