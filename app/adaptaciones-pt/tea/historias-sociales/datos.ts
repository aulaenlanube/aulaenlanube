import type { Historia } from "./tipos";
import { CUANDO_ME_ENFADO } from "./historias/cuando-me-enfado";

// Registro de historias sociales: el índice y las rutas estáticas
// (/adaptaciones-pt/tea/historias-sociales/<slug>/) salen de aquí.
export const HISTORIAS: Historia[] = [CUANDO_ME_ENFADO];

export const BASE = "/adaptaciones-pt/tea/historias-sociales";
