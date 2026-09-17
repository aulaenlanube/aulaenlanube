"use client";

import { useState } from "react";

export default function PromptBlock({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <div className="relative my-3">
      <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-zinc-900 p-4 pr-20 font-mono text-[13px] leading-relaxed text-zinc-100">
        {text}
      </pre>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(text).then(() => {
            setOk(true);
            setTimeout(() => setOk(false), 1500);
          });
        }}
        className="absolute right-2 top-2 rounded-lg bg-zinc-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-zinc-600"
      >
        {ok ? "copiado ✓" : "copiar"}
      </button>
    </div>
  );
}
