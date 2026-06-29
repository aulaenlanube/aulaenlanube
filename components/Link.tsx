import NextLink from "next/link";
import type { ComponentProps } from "react";

// Wrapper de next/link con prefetch DESACTIVADO por defecto. En export estático
// con catch-all opcional ([[...path]]), el prefetch automático genera peticiones
// 404 (…/__next/$oc$path…). Como las páginas son estáticas y se sirven al
// instante, desactivar el prefetch elimina ese ruido sin penalizar la navegación.
type LinkProps = ComponentProps<typeof NextLink>;

export default function Link(props: LinkProps) {
  return <NextLink prefetch={false} {...props} />;
}
