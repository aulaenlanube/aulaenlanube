// Paleta de la ponencia, en un módulo neutro.
//
// La comparten los Componentes de Servidor (_ui/piezas.tsx, _datos.ts) y los de
// cliente (_svg/*). Vive aparte a propósito: un módulo con "use client" no
// puede exportar datos que lea el servidor —sus exportaciones se convierten en
// referencias de cliente—, así que todo lo que cruce esa frontera va aquí.
export type Tono = "azul" | "morado" | "verde" | "ambar" | "rosa" | "gris";
