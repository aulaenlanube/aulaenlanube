"use client";

import { useEffect, useRef, useState } from "react";

export default function YouTubeLite({ id, title }: { id: string; title: string }) {
  const [open, setOpen] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  useEffect(() => {
    if (open) frameRef.current?.focus();
  }, [open]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-sm ring-1 ring-zinc-200">
      {open ? (
        <iframe
          ref={frameRef}
          tabIndex={-1}
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          aria-label={`Reproducir vídeo: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt=""
            className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
            loading="lazy"
          />
          <span className="absolute left-1/2 top-1/2 flex h-14 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-red-600 shadow-lg transition group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
