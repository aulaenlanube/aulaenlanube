# Sesión 8 · Release y defensa

**Etiqueta de git:** `sesion-08` y `v1.0.0` · **Se ve en:** lo mismo que en la
sesión 7, publicado como versión 1.0, con su documentación completa.

## Qué se ha hecho

1. **Medir antes de optimizar** (`herramientas/tamano.mjs`): cada fichero de
   `dist/`, en bruto y con gzip. Resultado: 2 MB comprimidos, de los que 1,6 son
   el motor de físicas.
2. **Librerías en ficheros aparte** (`vite.config.ts`): Rapier, Three.js y
   supabase-js salen cada una en su fichero, con el hash en el nombre. El
   servidor las deja guardar un año; publicar una versión nueva solo hace bajar
   de nuevo los 24 kB del juego.
3. **README** que se sostiene solo: qué es, cómo se juega, cómo se arranca, cómo
   está hecho, lo que pesa y lo que no hace.
4. **Créditos completos** (`CREDITOS.md`), **licencia** (MIT) y **registro de
   cambios** (`CHANGELOG.md`).
5. **Postmortem** (`docs/postmortem.md`) y **la rúbrica punto por punto**
   (`docs/rubrica.md`).
6. **Versión 1.0.0**: etiqueta en git y publicación.

## Cómo se pidió (resumen de los prompts)

- «Dime cuánto pesa cada fichero de lo que se publica, en bruto y con gzip, y qué
  es lo que más pesa.»
- «Separa las librerías del código del juego para que el navegador las guarde.»
- «Escribe el README para alguien que no sabe nada del proyecto. Incluye los
  límites conocidos: lo que no hace y por qué.»
- «Repasa `CREDITOS.md`: ¿falta algo que hayamos usado?»
- «Recorre la rúbrica y dime, punto por punto, dónde está la evidencia.»

## Para la defensa

Cinco minutos, en este orden:

1. **Jugar** una partida corta en red (dos equipos).
2. **El diseño**: `docs/diseno.md`, y qué se dejó fuera.
3. **Una decisión**: la 014 (un anfitrión arbitra) y su precio.
4. **Un tropiezo**: el ascensor que hundía al robot, o los escalones.
5. **La rúbrica**: `docs/rubrica.md`.

Preguntas que hay que saber contestar: ¿qué viaja por la red y cada cuánto?,
¿quién decide quién lleva la chispa?, ¿qué pasa si el anfitrión se va?, ¿por qué
los otros robots no van a saltos?, ¿qué impide que alguien se apunte una
victoria falsa y qué no lo impide?

## Para comprobarlo

```bash
npm run build && node herramientas/tamano.mjs
git tag            # sesion-01 … sesion-08, v1.0.0
git checkout sesion-03   # para ver el juego como estaba en cualquier sesión
```

## Tropiezos

- **Optimizar a ciegas.** La primera idea era comprimir los modelos; midiendo,
  entre los dos pesan 177 kB y las físicas, 1 604. El orden importa.
- **Volver a una sesión anterior** con `git checkout sesion-0N` pide
  `npm install` después: las dependencias cambian de una sesión a otra.
