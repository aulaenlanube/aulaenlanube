---
slug: github-pages
title: "Publica tu web y domina GitHub: GitHub Pages y las claves del flujo óptimo"
meta_description: "Sube tu web personal a producción con GitHub Pages (.nojekyll, rutas y consola limpia) y monta el flujo de git que puntúa: commits atómicos, issues, PRs y README técnico."
chip: "Proyecto 1 · Tutorial 1 · Sube: producción y proceso"
---
# Publica tu web y domina GitHub: GitHub Pages y las claves del flujo óptimo

Ya tienes la web hecha (sesión 1) y el repositorio en GitHub con tus primeros commits (sesión 2). Este tutorial te lleva de ahí a lo que de verdad se evalúa: **tu web publicada en internet** con GitHub Pages y **un historial que se lee como un diario**. Cada paso se hace igual que siempre: pides, pegas, guardas, compruebas en el navegador.

Si aún no tienes el repo montado —configuración, token, primer push—, para aquí y [vuelve a la sesión 2](/programacion-ia/sesion-02/). Este tutorial **no repite esa teoría**: da por hecho que tu carpeta `mi-web` ya vive en `github.com/tuusuario/mi-web` y se centra en publicarla y en pasar de «tengo el repo» a «producción + historial que puntúa».

## Qué suma en la rúbrica

Estas son las casillas exactas que mueves (descriptores literales de la rúbrica del proyecto, `rubricas.ts`):

| Casilla que mueves | Qué exigen para llegar ahí (literal) | Qué te da este tutorial |
|---|---|---|
| **Mínimo «produccion»** | «La web carga en producción (GitHub Pages) sin errores en consola (F12 limpio).» | Pasos 1-2: activar Pages desde la rama main, poner `.nojekyll` y dejar la consola F12 sin errores rojos. Sin este mínimo el proyecto es **no evaluable (NE)**: no hay nota que calcular. |
| **Mínimo «git»** | «Historial git real: mínimo 10 commits con mensajes que cuentan el proceso.» | Paso 4: el prompt de estrategia de commits para llegar a ≥10 sin rellenar con mensajes falsos. También es mínimo que fails: NE directo. |
| **Criterio «proceso»** (peso 15) — a por **Competente** | «≥10 commits atómicos con mensajes que cuentan decisiones + ramas para las features grandes.» | Paso 4 (commits atómicos con el prompt de estrategia) y paso 6 (rama + PR para el experimento grande). |
| **Criterio «proceso»** — salto a **Excelente** | «Historial que se puede leer como un diario: issues/PR, iteraciones visibles, v1→v2 con mejoras rastreables, y las órdenes clave a la IA archivadas en el repo.» | Pasos 5-7: issues como tablero con `Closes #__`, una PR fusionada aunque estés solo, releases v1→v2 y la carpeta `prompts/` dentro del repo. |
| **Criterio «arquitectura»** (peso 15) — a por **Excelente** | «Además: componentes reutilizables o templates, Lighthouse ≥90 en rendimiento/accesibilidad, y ADR o README técnico explicando 2 decisiones de arquitectura.» | El **README técnico** del paso 7 (2 decisiones con formato situación → decisión → consecuencia), revisado por ti: si dice algo que no es verdad, lo corriges. Es la casilla más asequible del Excelente: no exige tocar el código. |

Un detalle que explica el peso de todo esto: los mínimos son la puerta de entrada. Puedes tener un diseño espectacular; si la web no carga en producción sin errores en consola o no llegas a 10 commits honestos, el proyecto no se evalúa. Producción y git primero; lo demás, encima.

## Paso 1 · Activar GitHub Pages (todo con clics, sin terminal)

GitHub Pages publica una web estática gratis desde tu repo: si tu usuario es `anagarcia` y tu repo `mi-web`, tu web vivirá en `https://anagarcia.github.io/mi-web/`. La documentación oficial está en [pages.github.com](https://pages.github.com) y en [About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages).

[FIG:pages]

Pide esto en el chat (funciona en cualquier asistente, también en los modelos del centro):

```
Tengo un repositorio PÚBLICO en GitHub llamado ___ (mi usuario es ___) con index.html,
style.css y script.js en la raíz de la rama main. Quiero publicarlo con GitHub Pages.
Guíame paso a paso SOLO con clics en la web de GitHub (sin terminal) para:
1) ir a los ajustes del repo y elegir Pages, fuente "Deploy from a branch", rama
   "main" y carpeta "/" (la raíz);
2) saber qué mensaje verde confirma que la web ya está publicada;
3) abrir la URL final de mi web y comprobar que carga.
La fuente puede ser la raíz o la carpeta /docs: explícame en 2 líneas cuál elegir si
mi web está en la raíz. No me pidas instalar nada.
```

**Qué comprobar:** entra en tu repo → **Settings → Pages**. Debe salir un aviso verde del estilo *«Your site is live at `https://tuusuario.github.io/mi-web/`»*. Ábrela en una pestaña. La primera publicación tarda entre 1 y 10 minutos: si aún no sale, el aviso estará en amarillo («is being built»): espera y recarga.

**Si sale mal:** 404 al abrir la URL → ve al bloque de errores típicos de abajo. ¿No ves la pestaña **Settings**? Estás viendo el repo de otra persona, o has entrado en GitHub con otra cuenta: mira tu avatar arriba a la derecha.

**La decisión de dónde publicar** (la IA te la va a proponer en cuanto hables de Pages; decide tú, con la cabeza, no por defecto):

| Opción | Cómo queda la URL | Qué exige | Veredicto para tu proyecto |
|---|---|---|---|
| **main + carpeta `/`** (esta) | `tuusuario.github.io/mi-web/` | Nada más: Settings → Pages → rama main | La correcta hoy. Tu web ya vive en main y es estática. |
| **Rama `gh-pages`** | `tuusuario.github.io/mi-web/` | Exportar el resultado a una rama aparte (`git checkout -b gh-pages` y subir ahí solo lo publicado) | Se usa cuando la rama main tiene código que NO debe publicarse, o cuando un generador construye la web. Tu caso todavía no es ese. |
| **Repo `tuusuario.github.io`** | `tuusuario.github.io` (sin sufijo, la más pro) | Crear un repo con ese nombre EXACTO y volcar ahí la web | La opción «web de marca» de verdad cuando quieras un dominio limpio. Da bonus estético, pero duplica repos. Más adelante. |
| **Carpeta `/docs` dentro de main** | `tuusuario.github.io/mi-web/` | Mover toda la web a `docs/` | Solo si quieres documentar el proyecto fuera de la raíz. Te obliga a mover ficheros: evita el trasiego innecesario. |

Apunta la que elegiste y por qué en el README del paso 7: eso es literalmente una de las «decisiones de arquitectura» que pide el descriptor Excelente de «arquitectura» («ADR o README técnico explicando 2 decisiones de arquitectura»).

## Paso 2 · Que la publicación sea limpia: .nojekyll y rutas relativas

Pages, por defecto, pasa tu web por **Jekyll**, un procesador pensado para blogs que **ignora todo lo que empieza por `_` o por punto** — y no hace falta ninguna cuando tu web es HTML+CSS+JS puro. La forma de desactivarlo es un fichero vacío llamado `.nojekyll` en la raíz del repo. Y el segundo fallo silencioso: **rutas absolutas**. Si tu `index.html` tiene `<link href="/style.css">`, al publicarse dentro de `tuusuario.github.io/mi-web/` buscará el CSS en la raíz del dominio, no en tu carpeta, y la web saldrá sin estilos.

Pide esto:

```
Mi web personal (index.html + style.css + script.js en la raíz) se publica con GitHub
Pages desde la rama main, en la URL https://___/mi-web/.
1) Créame el fichero .nojekyll: dime contenido (vacío o no), nombre EXACTO y ruta donde
   guardarlo, y en 2 líneas qué hace.
2) Te pego abajo las líneas <link>, <script> e <img> de mi index.html. Dime cuáles son
   rutas absolutas (empiezan por /) que se romperán al publicarse dentro de /mi-web/, y
   dame el index.html completo con los cambios marcados con comentarios, sin cambiar
   nada más.
[pega aquí las líneas link / script / img de tu index.html]
```

Guarda el `.nojekyll` en la raíz de tu carpeta `mi-web` (en Windows, si el explorador no te deja crear un fichero que empieza por punto, pide a la IA el truco o créalo con un editor). Commitea y sube.

**Qué comprobar (esto es el mínimo «produccion», foto para la defensa):** abre la **URL publicada** (no el fichero local), pulsa **F12 → pestaña Console**. Debe estar **sin líneas rojas**: amarillas de avisos aceptable, rojas no. La web debe verse con estilos y tus imágenes. Si la consola tiene errores, sigue la ruta: copia el mensaje rojo literal y pídelo:

```
Mi web publicada en ___ abre, pero la consola de F12 muestra este error exacto:
«___» (pega el mensaje rojo tal cual, y la URL de la web).
Qué significa en 3 frases, qué fichero está mal y dame el fichero completo corregido
con los cambios marcados con comentarios, sin cambiar nada más.
```

## Paso 3 · Lo que NO se sube nunca: .gitignore y el token fuera del repo

Tu repo es público: **todo lo que subas lo lee cualquiera para siempre**. Antes de seguir acumulando commits, blinda el repo. Nunca se sube: el token (empieza por `ghp_`), claves de APIs, ficheros `.env`, carpetas de basura del sistema o del editor, y `node_modules` si apareciera.

```
Estoy en 1º DAM con un repositorio PÚBLICO de web estática (index.html, style.css,
script.js, carpeta imágenes/). Hazme un .gitignore completo para no subir basura ni
secretos: al menos .env y variantes, cualquier fichero de claves o tokens, node_modules,
.DS_Store, Thumbs.db, y los temporales del editor. Comenta cada línea con una frase de
que evita. Dame el fichero .gitignore completo y no cambies nada más.
```

Guárdalo en la raíz, commitea («añadido .gitignore con secretos y basura») y comprueba que aparece en tu repo en GitHub. La referencia oficial de patrones es [git-scm.com/docs/gitignore](https://git-scm.com/docs/gitignore).

Y acuérdate de la norma de la sesión 2: el token se pega **en la terminal** cuando la pide (o lo guarda el gestor de credenciales de tu sistema), nunca dentro de un fichero del proyecto. Si tienes la sospecha de que se fue, al final de este tutorial tienes los 3 pasos de rescate sin leer código.

## Paso 4 · Commits atómicos: el prompt de estrategia (mínimo «git» + «proceso»)

Un commit atómico es **una cosa, un guardado**. «Añadida sección de contacto» vale; «actualizo cosas» no. El mensaje cuenta **la decisión**, en imperativo: *añade / arregla / reordena / cambia*, y el cuerpo (opcional) el porqué: «el menú se apilaba a 360px».

[FIG:commit]

Deberíamos tener unos 4-5 commits de la sesión 2. Vamos a por los 10 mínimos con trabajo real (producción, .nojekyll, .gitignore… ya son 3 nuevos). Para cada cambio que hagas de ahora en adelante usa este prompt — es la herramienta del criterio «proceso»:

```
Voy a hacer en mi web: ___ (describe el cambio en una frase, p.ej. "quitar el modo
oscuro porque no lo controlo" o "anyadir la seccion de proyectos con 2 tarjetas").
Mi repo tiene index.html, style.css, script.js, .nojekyll, .gitignore, README.md.
Dame:
1) el mensaje de commit en imperativo que cuenta la DECISIÓN (una línea) y un cuerpo
   opcional de una frase con el porque;
2) los ficheros exactos que debo seleccionar con git add para que el commit sea
   atómico (lista: nada de git add . si toco ficheros que aún no están listos);
3) los comandos escritos con esos ficheros y ese mensaje (git add ... y git commit -m
   ... y git push);
4) qué veré al terminar que confirma que el commit salió limpio.
No me escribas el código del cambio: solo la estrategia de guardado.
```

**Qué comprobar:** pestaña **Commits** de tu repo en GitHub ([así se ve un historial de referencia, el del kernel](https://github.com/torvalds/linux/commits/main)). Debes ver ≥10 entradas con tu avatar al lado, cada una con **pocos ficheros y un mensaje que se entiende solo dentro de seis meses**. Si dos commits dicen «cambios», «final» o «asdf», tienes un 50 (En desarrollo, «3-9 commits con mensajes flojos») o peor: el mínimo pide que los mensajes **cuenten el proceso**.

**Un mensaje bueno se parte en dos:** título corto (máx. 50 caracteres, imperativo, sin punto final) y —si hace falta— un cuerpo de una frase con el porqué. En la terminal se hace con dos `-m`:

```
git commit -m "añade .nojekyll para publicar sin Jekyll" -m "Pages ignoraba la carpeta _icons; el fichero vacío desactiva el procesador"
```

**Bien / mal, visto y no visto:**

| ❌ Mensaje que baja nota | ✅ Mensaje que sube nota | Por qué |
|---|---|---|
| `actualizo` | `añade formulario de contacto con validación` | Dice QUÉ se guardó; dentro de 6 meses sabes qué tocaron. |
| `cambios css` | `arregla menú apilado en 360px` | Cuenta la decisión y su motivo, no el fichero tocado. |
| `final` / `final2` / `va3` | `prepara publicación: rutas relativas en index` | «final» es mentira siempre: nunca era el final. |
| `arreglo todo` | `revierte modo oscuro (no controlaba el localStorage)` | Un «arreglo todo» es un commit monolítico: imposible de rehacer a medias. |

**Así se ve un diario que puntúa** (`git log --oneline`, el día que entregues). Guíate por esto al redactar los tuyos — el orden y el tono, no copia los textos:

```
e4f1a02 publica: enlaces relativos en css y js para el subdirectorio /mi-web
9b7c3d1 añade .nojekyll para publicar la web tal cual, sin Jekyll
5a2f8e0 añade .gitignore (env, basura de sistema, temporales)
c1d94b7 añade seccion proyectos con 2 tarjetas y contexto problema-solucion
8e6a21f experimental: diseño oscuro completo (rama, fusionada por PR #2)
f0b3c55 añade formulario mailto con asunto prellenado (cierra #1)
d2e7a90 primera web: estructura semántica de secciones básicas
```

Si tu historial se parece a esto, en la defensa solo tienes que decir «leamos el log» y el trabajo se cuenta solo.

**Audita tu historial con la IA antes de entregar.** Pega el listado y pide la nota:

```
Te pego el historial de commits de mi proyecto (git log --oneline) de mi web personal:
[pega aquí las líneas del historial]
Auditámelo contra estos dos requisitos: (1) mínimo 10 commits con mensajes que cuentan
el proceso; (2) commits atómicos (una cosa por commit). Para cada defecto: dime qué
commit es flojo, por qué lo es y qué mensaje honesto lo sustituiría si mañana haces el
cambio correspondiente. Y dime cuántos commits atómicos reales de trabajo PENDIENTE me
recomiendas hacer todavia para llegar a 10 sin inventar nada.
```

Y un aviso honesto: si ya tienes un mega-commit («subo todo»), no borres ni reescribas historia a esas alturas — es más arriesgado que feo. Lo que cuenta a partir de ahora es que los siguientes 6-8 commits sean atómicos y limpios. El profe lee el conjunto, no solo el primero.

## Paso 5 · Issues como tablero: el trabajo antes de hacerlo

Los [issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues) son tareas pegadas al repo: lo que la mayoría lleva en la cabeza o en un post-it, GitHub lo guarda con número, fecha y estado. Es el detalle que más suma para el Excelente de «proceso» («issues/PR… iteraciones visibles»).

```
Dame 6 issues redactados para la próxima semana de mi web personal de marca (repo
público en GitHub). Situación actual: ___ (2 líneas: secciones que tiene, qué
funciona). Quiero: ___ (2-3 cosas que te apetece añadir o arreglar).
Cada issue con: título en una línea, cuerpo de 2-3 frases con el "debería" de
aceptación, y una etiqueta sugerida (mejora / bug / contenido / diseño). Numerados 1 a 6.
```

Créalos uno a uno en la pestaña **Issues → New issue** (copiando y pegando lo que te dio la IA). Cuando completes uno, en el mensaje o en la descripción del PR escribes `Cierra el #3` (o `Closes #3`) y GitHub lo marca como cerrado automáticamente al subir. Ve cerrando issues sobre la marcha: dentro de dos semanas tu lista cerrada **es** tu historial de trabajo.

## Paso 6 · Ramas y una PR aunque estés solo

Una rama es un universo paralelo para experimentar sin tocar lo publicado. Y una **pull request** es proponer los cambios de tu rama a `main` con una explicación: la [revisión la haces tú, aunque estés solo](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) — así trabaja cualquier empresa de software y así se hace el proyecto en grupo del curso.

[FIG:rama]

```
Quiero probar un cambio grande en mi web (___) sin romper lo publicado. Guíame solo
con CLICS en la web de GitHub, paso a paso:
1) crear una rama nueva llamada experimento-___ desde main (dónde está el selector de
   ramas);
2) editar style.css desde el lapicero de la web de GitHub dentro de esa rama, con un
   commit que cuente la decisión;
3) abrir la Pull Request comparando mi rama con main, con título y descripción que yo
   rellenaré según lo que te pegue abajo;
4) fusionar (Merge) la PR y después borrar la rama del experimento.
Para cada paso: qué botón pulso y qué veré. Mi usuario es ___, repo ___.
```

La descripción de la PR, pídesela aparte y edítala: «**Qué cambia:** ___. **Por qué:** ___. **Cómo se comprueba:** abrí la web y ___.» Cierra el issue correspondiente desde ahí con `Closes #__`.

**Qué comprobar:** pestaña **Pull requests → Closed**: tu primera PR fusionada, con la «bolita morada» del merge en el historial de main. ¿El experimento salió mal? Cierra la PR sin fusionar y borra la rama: eso **también** es proceso válido y cuenta igual de bien en la defensa («lo probé y lo descarté»).

## Paso 7 · README técnico, prompts archivados y v1 → v2

Tres últimas piezas, todas del Excelente de «proceso» y «arquitectura»:

**a) El README técnico.** El README que sale al crear el repo está vacío o es un copiapega de la IA sin tus datos. Pídelo así:

```
Escribe el README tecnico de mi web personal de marca ya publicada. Datos reales:
- URL publicada: https://___.github.io/___  ·  usuario/repo: ___
- Ficheros y qué hace cada uno: ___
- 2-3 decisiones que tome yo: ___ (ej: "un solo CSS con variables al principio",
  "modo oscuro con localStorage en vez de cookie")
- Funciones extra: ___ (formulario, dark mode, widget de API...)
Estructura obligatoria: qué es + enlace a la web en directo · lista de secciones ·
árbol de ficheros · DECISIONES DE ARQUITECTURA con formato situación -> decisión ->
consecuencia (mínimo 2) · cómo se publica (Pages desde main, .nojekyll) · creditos
de imagenes. Tono tecnico y honesto, sin humo de marketing. Dame el README.md
completo con los cambios marcados con comentarios y no cambies nada más.
```

Revísalo: si dice algo que no es verdad («optimicé las imágenes» si no lo has hecho), cámbialo o pídeselo corregido. Un README mentiroso en la defensa es un 0 en «arquitectura».

**b) Archiva tus prompts en el repo.** Crea la carpeta `prompts/` y guarda dentro los pedidos clave que has hecho esta semana (sesión 1, este tutorial…), uno por fichero o todos en `prompts/semana-1.txt`, con fecha y para qué era cada uno. El descriptor del Excelente lo pide literal: *«las órdenes clave a la IA archivadas en el repo»*. Commitea con el prompt del paso 4.

**c) Publica el release v1.** En la pestaña **Releases → Draft a new release**, etiqueta `v1`, título «Web publicada en Pages», descripción de 3 líneas con lo que funciona. Cuando termines el proyecto, `v2` con lo mejorado. Así la iteración «v1→v2 con mejoras rastreables» no es una promesa: son dos etiquetas con fecha que cualquiera puede abrir. ([About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases).)

## Cómo revisa el profe tu repo en 2 minutos (y qué ve en cada sitio)

Cuando te corrijan, no van a leer tu código: van a abrir el repo y mirar cinco sitios, en este orden. Prepara tu repo para que esos cinco sitios hablen solos:

| Qué abren | Qué buscan | En qué casilla de la rúbrica impacta |
|---|---|---|
| **La URL publicada** (enlace del README o de la descripción del repo) | ¿Carga? ¿Se ve tuya? ¿F12 limpio? | Mínimo «produccion» (NE si falla) |
| **Pestaña Commits** | ¿≥10? ¿Mensajes que cuentan decisiones? ¿Fechas repartidas, no todas a la misma hora? | Mínimo «git» + criterio «proceso» |
| **Pestaña Issues (abiertos y cerrados)** | ¿Hay planificación? ¿Los cerrados cuadran con commits/PRs? | «proceso» nivel Excelente («issues/PR… iteraciones visibles») |
| **Pestaña Pull requests → Closed** | ¿Al menos una, aunque sea tuya, con descripción? | «proceso» (ramas para features grandes) |
| **README.md** | ¿Explica qué es, la URL en directo, y 2 decisiones de arquitectura? | «arquitectura» nivel Excelente |

Tres trampas que se detectan en ese repaso y restan de golpe:

1. **Commits todos con la misma fecha y hora** (los 10 hechos la noche antes en 15 minutos). Se ve en la lista sin abrir nada. El proceso se puntúa como diario, y un diario con una sola entrada no es un diario. Reparte el trabajo como propone el plan de abajo.
2. **El README dice «Web hecha con IA» y nada más.** Un README de tres líneas no mueve «arquitectura»; y un README que miente («optimicé imágenes» sin haberlo hecho), si lo sostienes en la defensa, la lias.
3. **Ramas fantasmas**: 4 ramas abandonadas sin PR ni merge, solo «por aparentar». Una rama con su PR fusionada o cerrada a propósito vale el doble que tres colgadas. Y si cierras una PR sin fusionar, escribe en ella por qué: eso es una decisión rastreable.

## Los errores típicos de Pages (y su prompt de rescate)

**1 · 404 al abrir la URL publicada.** Casi siempre es la ruta: tu `index.html` no está en la raíz de la rama que publicas (¿está dentro de una carpeta `mi-web/` dentro del repo?), o elegiste la carpeta `/docs` y tu web está en `/`. Comprueba Settings → Pages (rama y carpeta) y compara con el árbol de ficheros de tu repo.

```
Mi GitHub Pages da 404. Mi repo ___ tiene los ficheros aquí: ___ (describe el árbol
que ves en la página del repo). La fuente de Pages que tengo puesta: rama ___, carpeta
___. Dime en 3 líneas la causa y las dos opciones para arreglarlo (mover ficheros de
sitio o cambiar la fuente de Pages), con los clics o comandos exactos de cada una.
```

**2 · Abre pero sin estilos (o imágenes rotas).** Ruta absoluta (`/style.css`) publicada dentro de la subcarpeta del repo, o fichero con nombre distinto por mayúsculas/acentos (`Style.css` ≠ `style.css`). Vuelve al prompt del paso 2 y pide el index corregido.

**3 · Ha desaparecido una carpeta o un fichero (empezaba por `_` o punto).** Jekyll se lo comió: Pages no subió ese fichero al publicar. Solución: `.nojekyll` en la raíz (paso 2), commitear y esperar al siguiente build. Referencia: [Jekyll · sites](https://jekyllrb.com/docs/sites/).

**4 · He hecho push y sigue viéndose la versión vieja.** El build tarda 1-10 min. Repo → pestaña **Actions** → «pages build and deployment» en amarillo: espera. En verde y sigue vieja: recarga fuerte (**Ctrl+Shift+R** / Cmd+Shift+R) para saltarte la caché del navegador.

**5 · Consola F12 con líneas rojas en la URL publicada.** Error de tu JS o de un fichero que no existe. Copia el mensaje literal entero y usa el prompt de rescate del paso 2. El mínimo exige **F12 limpio**: un error rojo no arreglado es un mínimo fallido y el proyecto pasa a NE.

## Si crees que has subido el token: 3 pasos sin leer código

Un token `ghp_...` es tu contraseña para GitHub: quien lo tenga, sube y borra cosas con tu nombre. Si alguna vez has pegado el token en un fichero del proyecto (un `config.js`, un `.env`, un comentario…), haz esto **en orden**, aunque solo lo sospeches:

[FIG:token]

1. **Comprobar si está en el repo.** Entra en tu repo en GitHub, busca en el cajón de búsqueda de la barra superior tu repo y escribe `ghp_` filtrando por *Code* (también vale abrir la pestaña **Commits** y repasar los diffs de los últimos días a ojo). O, más fiable, pídele a la IA local:

```
En mi carpeta del repo ___ (es un repositorio git), quiero comprobar si en TODA mi
historia (no solo la version actual) aparece la cadena ghp_. Dame el comando git de
busqueda en el historial y explícame en 2 líneas cada parte, y qué veré si no aparece
nada (resultado bueno) y si aparece algo (nombre del fichero y commit).
```

2. **Revocar el token.** Entra en [github.com/settings/tokens](https://github.com/settings/tokens), busca el token por su *Note* (el nombre que le pusiste) y pulsa **Delete/Revoke**. En un segundo deja de servir: aunque alguien lo tenga, ya no puede hacer nada. ([Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).)

3. **Regenerar y limpiar.** Genera uno nuevo igual que en la sesión 2 (mismos permisos, scope `repo`), actualiza la credencial guardada en tu sistema, y si el token viejo llegó a subirse, bórralo del repo con un commit que lo diga («eliminado token del repo y .gitignore»); si aparece en muchos sitios, levanta la mano y lo vemos. Bonus: GitHub escanea los repos públicos y **revoca él mismo** los tokens que encuentra (te llegará un correo). Que te llegue ese correo no es mala nota: es la señal de que hiciste bien la prueba. Lo que sí baja nota es no reaccionar a él.

## Plan de 4 días para montar esto sin agobios

El flujo óptimo no se monta en una tarde; se nota en que los commits tienen fechas distintas. Si te pilla el lunes con 3 commits, reparte así (30-40 min al día):

| Día | Qué haces (pasos de este tutorial) | Commits que salen |
|---|---|---|
| **Día 1** | Activar Pages (paso 1) + `.nojekyll` y rutas (paso 2) | «publica: Pages desde main» · «añade .nojekyll» · «cambia rutas a relativas» → ya vas por 7-8 con los de la sesión 2 |
| **Día 2** | `.gitignore` y comprobación del token (paso 3) + crear los 6 issues (paso 5) | «añade .gitignore» → y el tablero montado para toda la semana |
| **Día 3** | Un cambio mediano en rama con PR (paso 6): sección nueva, redesign del hero, lo que quieras | 2-3 commits atómicos dentro de la rama + el merge de la PR cerrando su issue |
| **Día 4** | README técnico + `prompts/` + release v1 (paso 7), auditoría del log (paso 4) y lista de comprobación | «añade README tecnico con 2 decisiones» · «archiva prompts de la semana» · tag `v1` |

Al final: ≥12 commits, ≥1 PR fusionada, issues cerrados con número, README con decisiones. Eso no es «tener el repo»: es tener producción + un diario. Que es exactamente lo que dice la rúbrica.

## Lista de comprobación final

- ☐ Abro `https://tuusuario.github.io/mi-web/` y carga con estilos (abierta desde la URL, no desde mi carpeta)
- ☐ F12 → Console **sin líneas rojas** en la URL publicada → mínimo «produccion» cubierto
- ☐ `.nojekyll` en la raíz del repo
- ☐ `.gitignore` subido, y he buscado `ghp_` en el repo: cero resultados → token fuera
- ☐ ≥10 commits con mensajes en imperativo que cuentan decisiones (ni uno «cambios» / «final») → mínimo «git» cubierto
- ☐ ≥6 issues creados, varios cerrados con `Closes #__`
- ☐ ≥1 rama con su Pull Request fusionada (o cerrada a propósito, y la sé explicar)
- ☐ README técnico con 2 decisiones de arquitectura, carpeta `prompts/` en el repo y release `v1` publicado

## Posibles preguntas del profe en la defensa

**«Enséñame tu web publicada y la consola, sin abrir tu portátil.»**
Abre la URL del repo → F12. Esperada: carga limpia. Si hay rojos, sabes decir cuál es y qué harías (el prompt de rescate del paso 2).

**«Muéstrame tus commits y cuéntame la historia de tu web.»**
Pestaña Commits, de viejos a nuevos. Esperada: «primero subí la web, luego la publiqué en Pages, luego rompí el modo oscuro y lo revertí en tal commit…». Si tu historial cuenta eso, tienes el «proceso» ganado sin leer una línea.

**«¿Qué hace el .nojekyll? ¿Qué pasaría si lo borras?»**
Espera: desactiva el procesador Jekyll de Pages; sin él, GitHub ignora al publicar los ficheros que empiezan por `_` o punto y puede romper carpetas. Con mi HTML puro no debería romperse, pero lo pongo para publicar exactamente lo que tengo.

Y «¿por qué este commit es "arregla menú en móvil" y no "cambios en css"?»: cada commit guarda UNA cosa y el mensaje dice la decisión, para poder volver atrás y para que el historial se lea. «Cambios» no dice nada y el día que rompo algo no sé a dónde volver.

**«¿Has subido alguna vez el token por accidente? ¿Qué harías?»**
Espera: «no, lo comprobé buscando ghp_ en el repo; y si pasara: revoco el token en settings/tokens, genero otro, y hago un commit diciendo que lo quité».

**«Enséñame una iteración v1→v2.»**
Releases (o dos commits separados en el tiempo sobre la misma sección): «esto era la v1, esto la v2, y este issue/PR cuenta por qué cambió». Si aún no tienes v2, responde con el plan: «la v1 es lo que funciona hoy; el issue #___ es la v2 que queda pendiente».

---

## Anexo · Los cinco comandos que vas a teclear (el resto, clics)

Este tutorial es de clics y prompts; para los commits hacen falta solo estos, que ya viste en la sesión 2:

| Comando | Qué hace en una línea | Cuándo lo usas aquí |
|---|---|---|
| `git status` | Enseña qué cambios hay y en qué zona están | Antes y después de cada commit: es tu tablero de control |
| `git add archivo.html` | Apunta QUÉ ficheros van en el próximo commit | Los que te diga el prompt de estrategia (paso 4). Nada de `git add .` a ciegas |
| `git commit -m "..."` | Guarda la foto con mensaje | Una vez por cambio atómico |
| `git push` | Sincroniza con GitHub: sin esto, en la web publicada no existe | Después de CADA commit (push sagrado) |
| `git log --oneline` | Enseña tu diario en 1 línea por entrada | Para auditar antes de entregar (paso 4) |

Y para cuando la IA te proponga algo que no entiendas: «expícame este comando en 2 líneas antes de teclearlo». La regla de la sesión 2 sigue en pie: si no sabes qué hace, no lo escribes.

Si te sale un error que no está en este tutorial: copia el mensaje **entero y literal** y pregúntalo tal cual a los modelos del centro. Aprender a leer el error es media asignatura.

## Siguiente paso

[ Tutorial 2: tu web consume una API externa ](/programacion-ia/tutorial-api-externa/) para mover el criterio «interactividad» — encaja perfecto con la web ya publicada: muchas APIs fallan al abrirlas en local (`file://`) y funcionan en producción.
