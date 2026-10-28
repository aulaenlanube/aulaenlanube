// Idiomas de los materiales: valenciano (el de los libros) y castellano.
//
// Una página bilingüe pinta las dos versiones y un contenedor con
// `data-idioma` decide cuál se ve (reglas `.solo-ca` / `.solo-es` en
// globals.css). La elección se guarda en localStorage y se puede forzar con
// `?idioma=castellano` o `?idioma=valencia` en la URL.

export type Idioma = "ca" | "es";

export const CLAU_IDIOMA = "aeln_idioma_materials";
export const EVENT_IDIOMA = "aeln-idioma";

/** Script en línea que aplica el idioma guardado antes de pintar (sin destello). */
export function scriptIdioma(id: string): string {
  return `(function(){try{var e=document.getElementById(${JSON.stringify(id)});var q=(new URLSearchParams(location.search).get("idioma")||"").toLowerCase();var m={es:"es",castellano:"es",ca:"ca",va:"ca",valencia:"ca",valencian:"ca"};var l=m[q]||localStorage.getItem(${JSON.stringify(CLAU_IDIOMA)});if(l==="es"||l==="ca")e.setAttribute("data-idioma",l)}catch(_){}})()`;
}
