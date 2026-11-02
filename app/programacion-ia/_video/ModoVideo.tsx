"use client";

import { useEffect } from "react";

// Modo grabación de las páginas del curso: con `?video` en la URL, <html> lleva
// `data-video` y app/globals.css quita todo lo fijo que taparía el contenido
// (barra de menú pegajosa, aviso de cookies, botón «volver arriba»).
export default function ModoVideo() {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("video")) {
      document.documentElement.setAttribute("data-video", "");
    }
  }, []);
  return null;
}
