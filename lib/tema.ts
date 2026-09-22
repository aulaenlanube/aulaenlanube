// Tema claro/oscuro, en un módulo neutro.
//
// Lo comparten el layout (Componente de Servidor, que inyecta el script en
// línea) y el botón de la cabecera (Componente de Cliente). Vive aparte a
// propósito: un módulo con "use client" no puede exportar datos que lea el
// servidor —sus exportaciones se convierten en referencias de cliente—, así que
// todo lo que cruce esa frontera va aquí.

/** Clave de localStorage con la preferencia explícita del usuario.
    Solo existe si ha pulsado el botón: sin ella manda `prefers-color-scheme`. */
export const CLAVE_TEMA = "aeln_tema";

/** Script que se ejecuta mientras el navegador analiza el HTML (antes del
    primer pintado) y aplica el tema guardado a <html data-theme>. El resto lo
    resuelve el CSS, ver la variante `dark` en app/globals.css. */
export const SCRIPT_TEMA =
  `(function(){try{var t=localStorage.getItem("${CLAVE_TEMA}");` +
  `if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
