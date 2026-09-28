---
slug: api-externa
title: Tu web cobra vida: muestra datos reales de una API sin escribir tú el código
meta_description: Añade a tu web de marca un widget con datos vivos (tiempo de Xàtiva, tu GitHub, tu música) usando una API externa sin clave. Todo pidiéndolo a la IA y sabiendo explicarlo en la defensa.
chip: Proyecto 1 · Tutorial · Sube: interactividad
---
# Tu web cobra vida: muestra datos reales de una API sin escribir tú el código

Un widget que saca el dato de internet y lo pinta en tu web, actualizado solo: hoy el tiempo de Xàtiva, tus repos de GitHub, tu canción del momento. Ninguna clave, ninguna tarjeta, nada que pagar.

Es la diferencia entre una web de cartel (lo que escribiste un día) y una web de aplicación (algo que vive y se alimenta de datos). Y es literalmente la casilla de **Excelente** del criterio de interactividad: consumo de una API externa real, con el código explicado en la defensa.

No vas a leer el código. Vas a decidir qué mostrar, exigir cómo debe funcionar, pegarlo, probarlo, y saber contar el recorrido del dato mirando el F12. El paso 5 te entrena justo para eso.

## Qué suma en la rúbrica

| Casilla que mueve | Qué exigen para llegar ahí (descriptor literal de la rúbrica) | Qué te da este tutorial |
| --- | --- | --- |
| **Interactividad** (peso 15) · nivel Excelente | «Función con estado o datos: login demo con zona interna, consumo de una API externa real, chatbot operativo, o personalización según parámetros — con el código explicado en la defensa.» | La función con datos: un widget que consume una API externa real. La segunda parte —explicarlo en la defensa— la entrenas con el paso 5 y las preguntas del final. |
| **Interactividad** · nivel Competente (por si te quedas a medias) | «≥2 funciones reales: menú móvil propio, buscador/filtro de proyectos, formulario validado, calculadora, test, dark-mode con persistencia.» | Con un widget sumas una función real más; junto a la que montaste en la sesión 1 llegas a las dos. |
| **Contenido** (peso 15) · nivel Excelente | «Además: casos de proyecto reales con problema→solución→resultado, datos o métricas propias, y una voz reconocible (se nota quién eres sin leer el nombre).» | Los datos vivos son contenido que se renueva solo, y si eliges GitHub son **métricas propias**: tus repos, tus seguidores. Además, *qué* muestras dice quién eres. |
| **Proceso** (peso 15) · desde Competente | «≥10 commits atómicos con mensajes que cuentan decisiones + ramas para las features grandes.» | Añadir el widget son 2 o 3 commits con historia: «añado widget de GitHub: pruebo API pública sin clave» es un mensaje que cuenta una decisión. |

Ojo con el mínimo «producción»: la web debe cargar en GitHub Pages **sin errores en consola**. Un widget roto que suelta errores en el F12 puede tumbar un mínimo y dejarte el proyecto como no evaluable. Por eso probar (paso 4) y revisar la consola publicada (paso 6) no es opcional.

Si aún no tienes la web publicada, haz antes el [tutorial 1 de GitHub Pages](/programacion-ia/tutoriales/github-pages/): aquí trabajamos encima de esa base.

## Qué es una API y qué es JSON, en dos minutos (sin tocar nada)

Una **API** es una dirección de internet que, cuando le pides datos, te los devuelve en texto ordenado. No es un programa que instalas: es una URL. Si escribes esta en el navegador (va, pruébala ahora mismo):

[FIG:api]

```text
https://api.open-meteo.com/v1/forecast?latitude=38.9921&longitude=-0.5215&current=temperature_2m,weather_code&timezone=Europe/Madrid
```

verás algo así (respuesta real de hoy, recortada):

```json
{
  "latitude": 39.0,
  "timezone": "Europe/Madrid",
  "current_units": { "temperature_2m": "°C" },
  "current": {
    "time": "2026-09-28T23:45",
    "temperature_2m": 22.3,
    "weather_code": 3
  }
}
```

Eso es **JSON**: texto con forma de lista de etiquetas y valores, con llaves `{ }` y corchetes `[ ]`. Lo único que necesitas saber de él es leer rutas: el valor que está en `current` y dentro de él el que está en `temperature_2m` se escribe `current.temperature_2m` y vale `22.3`. Tu widget hará exactamente eso: pedir la URL, sacar un valor por su ruta y pintarlo en tu web.

El navegador pide la URL → el servidor devuelve JSON → tu widget coge un campo → lo pinta en pantalla. Ni un paso más.

Y el orden mental del widget, dicho sin código:

```text
   (1)                    (2)                  (3)                 (4)
 Tu web abre  →  api.js pide la URL  →  llega JSON con el dato  →  se pinta en el hueco
                                                              ↘  si algo falla:
                                                                 mensaje de error amable
```

Cuatro pasos. Los memorizas ahora y los sueltas en la defensa. El profe no va a pedirte que leas `fetch` y `await` como un liturgia: va a comprobar que sabes decir **de dónde viene lo que sale en pantalla**.

### APIs fiables para este tutorial (verificadas todas sin clave y con CORS abierto)

«CORS abierto» significa que la API deja que una web cualquiera (la tuya) le pida datos desde el navegador. Todas estas lo tienen verificado: si una mañana te falla, es cosa de la API, no tuya — cambia de dato, no de vida. (Nota del que escribe: xkcd, el cómic, estaba en la lista de deseos de este tutorial, pero hoy su endpoint JSON responde 404 — fuera. Esto pasa; por eso la variante D te enseña a verificar antes de montar.)

[FIG:cors]

| API | Qué da | URL de ejemplo |
| --- | --- | --- |
| Open-Meteo | Tiempo de cualquier ciudad, coordenadas en la URL | `api.open-meteo.com/v1/forecast?latitude=38.9921&longitude=-0.5215&current=temperature_2m` |
| GitHub | Tu perfil público: repos públicos, seguidores | `api.github.com/users/TUUSUARIO` |
| Coinbase | Precio actual de cripto | `api.coinbase.com/v2/prices/BTC-USD/spot` |
| iTunes Search | Canciones, artistas y portadas de música | `itunes.apple.com/search?term=karol+g&limit=5&entity=musicTrack` |
| TheCatAPI / Dog CEO | Una foto de gato / de perro al recargar | `api.thecatapi.com/v1/images/search` |
| TheSportsDB | Partidos y resultados con la clave pública de prácticas `3` (sí, la letra clave es un 3, es su plan gratuito) | `www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4335&s=2024-2025` |

## Paso 1 · Decide qué mostrar (esto sí es tuyo, no de la IA)

El widget tiene que encajar con TU marca, la que definiste en la [sesión 1](/programacion-ia/sesion-01/). Si tu web dice «voy a ser desarrollador», un widget del tiempo mola pero uno de tus repos dice *más*. Piensa 2 minutos:

- **Marca dev (DAM, portfolio)** → tus datos de GitHub: repos públicos, estrellas, seguidores. Métricas propias, literal de la rúbrica.
- **Marca sobria / utilitaria** → el tiempo en Xàtiva (o tu pueblo): «esto es lo que hace falta para salir», dicho sin palabras.
- **Melómano** → tu canción o artista del momento con iTunes Search: nombre, artista y portada.
- **Deportista** → últimos resultados de tu equipo con TheSportsDB (id de La Liga: 4335; si es otro deporte o liga, pídele a la IA el id: «dame la URL de TheSportsDB con la clave 3 para los partidos de ___ temporada ___»).
- **Gamer** → aquí no hay API segura sin clave, así que este es el widget *explorador*: pide a la IA «¿CheapShark o IsThereAnyDeal tienen una API pública con CORS abierto que funcione desde el navegador sin clave? Verifícalo y dime la URL exacta». Compruébalo en el paso 5: si la respuesta no llega o el navegador la bloquea, vuelve a una de la lista fiable. El proceso de comprobarla **ya cuenta** como criterio de proceso: archiva la orden en el repo.

Escribe en tu `notas.txt` la frase de marca que justifica el widget («mi web va de ___ y por eso muestro ___»). La usarás en la defensa.

## Paso 2 · Pide 3 variantes y elige una (no al revés)

La IA te dará lo primero que se le ocurre si se lo pides hecho. Tú diriges:

```text
Tengo una web personal de marca (HTML, CSS y JS puros, ficheros separados) y quiero
añadir un widget que muestre datos vivos de una API externa SIN clave API.
El dato que quiero es: ___ (ej: el tiempo ahora mismo en Xàtiva con Open-Meteo /
mis datos de GitHub / mi última canción de iTunes Search).

Dame 3 variantes de widget DESCRITAS (no código todavía): nombre, qué campo exacto
pintaría en pantalla, cómo quedaría visualmente en 3 frases, y qué URL llamaría.
Que las 3 sean la misma idea con distinta presentación (tarjeta, línea de texto,
medidor). La presentación la elijo yo según mi marca, no tú.
```

Elige una variante (la que encaje con tus colores y tu discurso, no la más vistosa) y pasa al paso 3.

## Variantes listas para pedir (según tu marca)

Tres widgets pensados, con su URL real y el campo exacto que pintan. Copia la idea, no el código: el código se lo pides tú en el paso 3 con tus requisitos.

### A · Marca dev: «Lo que tengo en GitHub» (mi perfil, mis métricas)

URL: `https://api.github.com/users/TUUSUARIO` (el de github.com/TUUSUARIO, el que sacaste en la sesión 2).

Respuesta real (recortada) para el usuario de ejemplo `octocat`:

```json
{
  "login": "octocat",
  "public_repos": 8,
  "followers": 24320
}
```

Tu widget pinta la ruta `public_repos` («8 repos públicos») y opcionalmente `followers`. Por qué encaja: tu marca dice que programas, y esto lo demuestra con números que crecen solos. Cada commit que hagas a partir de hoy sube el número de tu web — la web se actualiza porque TÚ la alimentas, sin tocar nada. Es lo más cerca que vas a estar de «datos o métricas propias» sin escribir tú el dato.

El prompt del paso 3, completado para esta variante:

```text
Quiero un widget «Mi GitHub» en mi web personal de marca.
URL a consumir: https://api.github.com/users/MIUSUARIO (sin clave: es la API pública).
Pinta: «X repositorios públicos · Y seguidores» con mis números reales, y un enlace
a mi perfil. Si la petición falla, muestra «GitHub no responde ahora» en el hueco.
Requisitos: fetch + try/catch + «Cargando…» + error visible + recarga opcional.
Fichero único api.js completo, con el id de hueco que ya tengo y la línea de conexión.
```

### B · Marca melómano: «Lo que escucho ahora» (iTunes Search)

URL (cámbiale el término de búsqueda por tu artista): `https://itunes.apple.com/search?term=karol+g&limit=5&entity=musicTrack`

Respuesta real recortada:

```json
{
  "resultCount": 5,
  "results": [
    { "trackName": "BbY WOW",
      "artistName": "KAROL G, Judeline & rusowsky",
      "artworkUrl100": "https://.../6796864754_100x100.jpg" }
  ]
}
```

Rutas que se pintan: `results[0].trackName` (el `[0]` significa «el primero de la lista»), `results[0].artistName` y `results[0].artworkUrl100` como portada (una imagen normal). Por qué encaja: humaniza la marca, y la portada redonda junto a tu foto de perfil queda de diseño de verdad.

### C · Marca deportista: «Mi equipo, en directo (casi)» (TheSportsDB)

URL de La Liga 2024-25 (receta igual para tu deporte, cambiando el id y la temporada): `https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4335&s=2024-2025`

Respuesta real recortada (el primer partido del JSON, que es una LISTA de eventos):

```json
{
  "events": [
    { "strEvent": "Athletic Bilbao vs Getafe",
      "intHomeScore": "1",
      "intAwayScore": "1",
      "strTimestamp": "2024-08-15T17:00:00" }
  ]
}
```

Ruta: `events[0].strEvent` y los marcadores. Pide que el widget muestre el partido de TU equipo filtrando por nombre — eso, en un prompt de requisitos:

```text
Dame el listado de eventos de la temporada y filtra los de ___ (mi equipo):
pinta los 3 últimos con resultado y fecha. La clave pública de prácticas es 3.
```

### D · Marca gamer: la vía exploradora (sin garantía, y se puntúa igual)

Para precio de videojuegos las API conocidas son CheapShark (`www.cheapshark.com/api/1.0/deals`) e IsThereAnyDeal (`isthereanydeal.com`). Pídele a la IA la verificación ANTES de montarlo:

```text
¿La API de CheapShark tiene CORS abierto para llamarla desde una web de GitHub Pages
sin clave? Compruébalo con las cabeceras de la respuesta (access-control-allow-origin)
y dime la URL exacta que funcionaría en el navegador. Sé honesto: si no la tiene, dilo.
```

Y compruébalo tú mismo como en el paso 5 (F12 → Network: si el navegador la bloquea, aparece roja y con «CORS» en consola). Si no pasa el corte, cambia a una de la lista fiable sin dramatismos — **el proceso de probar y descartar, archivado en un commit, vale para «proceso» tanto como el widget**. En mi verificación de hoy, CheapShark no responde a peticiones simples desde el navegador: asumo que tocará descartarla y montar la B o la C.

## Paso 3 · Pide el fichero `api.js` entero, con condiciones

Aquí es donde la mayoría recibe un churro. Se lo exiges así:

[FIG:json]

```text
He elegido la variante ___ . Ahora escríbela. Requisitos NO negociables:

1. Todo en UN fichero nuevo llamado api.js. No toques ningún otro fichero.
2. Usa fetch() contra la URL ___ (la de la variante elegida).
3. Muestra un mensaje «Cargando dato…» en el hueco hasta que llegue la respuesta.
4. Envuelve la llamada en try/catch: si algo falla, pinta un mensaje de error
   visible y amable en el hueco (nunca dejes el hueco vacío ni con «Cargando» eterno).
5. Recarga automática cada ___ segundos (dime dónde cambiar ese número para
   desactivarla poniendo 0).
6. El hueco en el HTML será <div id="widget">. El fichero debe funcionar tal cual.
7. Comenta cada bloque en una línea, en español, como si se lo explicaras a alguien
   que no ha programado nunca.

Dame el fichero api.js COMPLETO (no fragmentos) en un solo bloque de código, y al
final dime EXACTAMENTE la línea que debo pegar en mi index.html para conectarlo,
y dónde va esa línea. No cambies nada más.
```

Qué comprobar antes de guardarlo (sin leer el código a fondo, solo lo evidente):

- ¿Te ha dado un fichero COMPLETO en un bloque, o trozos sueltos? Si son trozos: «dame el fichero completo».
- ¿Dice una línea de conexión tipo `<script src="api.js"></script>`? ¿Y te ha dicho en qué parte del `index.html` va?
- ¿El hueco del HTML es `id="widget"`? Si tu web ya usa ese id para otra cosa, pídele: «cambia el id del hueco a `mi-widget` y actualiza todo el fichero, dame el fichero completo».

Guarda `api.js` dentro de tu carpeta `mi-web`, al lado del `index.html`.

## Paso 4 · Conecta el widget y prueba en local (con servidor, no abriendo el fichero)

Añade al `index.html` la línea que te ha dado la IA. Casi siempre es esto, justo antes de cerrar el `<body>`:

```html
<div id="widget">Cargando dato…</div>
<script src="api.js"></script>
```

Primer clic en el `index.html` y… probablemente nada, o un error en rojo. **No está roto**: los navegadores bloquean las peticiones a APIs cuando abres la web como fichero (la barra de direcciones dice `file:///...`). Es una norma de seguridad, no un defecto tuyo. Dos salidas:

- **En casa, con VS Code**: instálate la extensión *Live Server* (icono de la izquierda → Extensiones → buscar «Live Server» → Install), clic derecho sobre `index.html` → «Open with Live Server». La URL ahora empieza por `http://127.0.0.1:...`. Ya funciona el fetch.
- **Sin instalar nada**: sube el cambio a GitHub y míralo en tu GitHub Pages (ya sabes: [tutorial 1](/programacion-ia/tutoriales/github-pages/) y [sesión 2](/programacion-ia/sesion-02/) para el `git add / commit / push`). Es la prueba de verdad, porque además el widget queda publicado.

Qué tiene que pasar, a simple vista, en este orden:

1. Ves «Cargando dato…» un instante.
2. Los segundos pasan… y aparece tu dato (el tiempo, tus estrellas, tu canción).
3. Si cortas el wifi y recargas: aparece el **mensaje de error amable**, no el «Cargando» eterno. Eso último es lo que separa un widget hecho a medias de uno profesional: el estado de error existe.

## Paso 5 · Mira el recorrido del dato (la evidencia de tu defensa)

Esto no es arreglar nada: es *verlo funcionando por dentro*, que es lo que te van a preguntar. Con el F12 abierto:

1. Pestaña **Network** (Red) → filtro **Fetch/XHR** → recarga la página.
2. Verás una petición con el nombre de tu API (`forecast?latitude...`, `users/TUUSUARIO`...). Doble clic.
3. Pestaña **Response** (Respuesta): ahí está el JSON tal cual lo devolvió el servidor — lo mismo que pegó la IA en su comentario. Pestaña **Headers**: busca `access-control-allow-origin: *` — esa línea es el permiso CORS que te deja leerlo desde tu web.
4. Busca en ese JSON el valor que pinta tu widget (la temperatura, el número de repos). Ese valor, con su ruta (`current.temperature_2m`), es **el dato**: la URL de dónde vino, el campo qué es, y el div de tu web dónde se pintó.

Ese recorrido —navegador → URL → JSON → campo → pantalla— lo contas en la defensa con el F12 abierto. No has leído una línea de código y sin embargo sabes exactamente qué pasó. Eso es lo que pide el descriptor de Excelente.

## Paso 6 · Commits que cuentan la decisión, y a producción

No subas el widget en un solo commit llamado «cambios». Mínimo dos, con mensajes que cuentan decisiones (esto puntúa en «proceso»). Guion con tus palabras:

```text
git add index.html
git commit -m "Añado hueco del widget y cargo api.js (paso 1/2: conexión)"
git add api.js
git commit -m "Widget de ___ con Open-Meteo: fetch + try/catch + error visible (paso 2/2: la lógica)"
git push
```

Después del push, abre tu GitHub Pages, pasa el F12 y comprueba dos cosas: consola **limpia** (sin errores rojos: es un mínimo de la rúbrica) y Network mostrando tu petición con respuesta 200.

¿No sabes qué escribir en el commit o qué ficheros seleccionar? Pídeselo a la IA: «voy a hacer ___ ; dame el mensaje de commit y los ficheros que debo seleccionar».

## Paso 7 · Itera dos veces y archiva las órdenes (oro para «proceso»)

Un widget de serie queda bien; un widget *tuyo* se nota en los detalles. Dos iteraciones cortas, cada una con su commit:

```text
Iteración: el widget ___ queda pegado al margen en móvil. Dame solo el CSS de ese
bloque con márgenes/espaciado coherentes con mi paleta (variables si la uso),
comentado, y no cambies nada más.
```

```text
Iteración: quiero que el hueco de carga no sea texto pelado: un pequeño «esqueleto»
(skeleton) o un punto que parpadea mientras llega el dato, con el estilo de mi web.
Dame api.js completo con el cambio marcado en comentarios y el CSS que haga falta.
```

Y la parte que casi nadie hace y la rúbrica sí mira (descriptor Excelente de proceso: «las órdenes clave a la IA archivadas en el repo»): abre tu `notas.txt` de la sesión 1 y añade una sección `## Widget API` con las 3-4 órdenes que más han definido el resultado (la de las variantes, la del fichero con requisitos, la de rescate si la hubo). Commit: `"Archivo las órdenes del widget API en notas.txt"`. En la defensa, ese fichero es tu coartada: «así dirigí yo el trabajo».

## Errores típicos (y su prompt de rescate)

**1 · Se queda en «Cargando dato…» para siempre.** Casi nunca es la API: el `id` del hueco no coincide (tu HTML dice `id="widget"` y el JS busca otro nombre), o el fichero `api.js` no está al lado del `index.html` (ruta mal). Revisa que la línea de conexión y el hueco dicen el MISMO id. Prompt de rescate (paso de defensa incluido):

[FIG:error]

```text
Mi widget no aparece: se queda en «Cargando…». No leo el código, así que haz tú el
diagnóstico. Te pego literal lo que dice la consola (F12 → Console):
«___»
Te pego mi index.html: [pégalo]
Te pego mi api.js: [pégalo]
Dime qué está pasando en 3 frases que entienda sin saber programar, y dame el
fichero corregido COMPLETO con los cambios marcados con comentarios. No cambies nada más.
```

**2 · Pone «undefined» en vez del dato.** La ruta del campo está mal: `current.temperature_2m` no existe en la respuesta de esa API concreta. Se comprueba sin leer código: F12 → Network → tu petición → Response, y le dices a la IA «el JSON real es este [lo copias], corrige la ruta del campo, dame el fichero completo».

**3 · Error rojo que dice «CORS» o «blocked by CORS policy».** Esa API no deja que navegadores ajenos la lean, o la llamaste desde `file://`. Vuelve a la lista fiable del tutorial o usa Live Server / Pages. Si la API elegida no es de la lista: no es tu fallo, es la API — cambia de dato.

**4 · `403` o «rate limit exceeded» en GitHub.** La API pública de GitHub sin clave deja ~60 peticiones por hora y **por IP compartida**: si media clase usa el widget a la vez desde el wifi del IES, satura. Solución honesta: en casa va fino, en clase baja la recarga automática (en `api.js` te dijeron dónde cambiar el número de segundos) o cambia el widget al tiempo (Open-Meteo no tiene ese límite). Explicar este límite en la defensa suma, no resta.

**5 · En mi GitHub Pages todo bien, pero el widget del móvil se ve cortado.** El widget es contenido nuevo: pídele el ajuste responsive — «en móvil el widget ___ se desborda; dame el CSS de ese bloque, con los cambios marcados en comentarios, y no cambies nada más».

## Mapa de decisión rápida (cuándo hacer qué)

```text
¿El widget aparece y se actualiza?  ── SÍ ──► ¿Consola limpia en Pages? ── SÍ ──► Terminado:
                                             │                                itera (paso 7)
                                             └─ NO → prompt de rescate (error 1)
                        └─ NO
                             │
   ¿La barra de direcciones dice file://?  ── SÍ ──► Live Server o push a Pages (paso 4)
                             └─ NO
                                  │
   ¿La consola dice «CORS»?  ── SÍ ──► API fuera de la lista fiable: cámbiala (error 3)
                             └─ NO
                                  │
   ¿Pone «undefined»?  ── SÍ ──► ruta de campo mal: copia el JSON real y pide el arreglo (error 2)
                             └─ NO ──► prompt de rescate con el error literal (error 1)
```

## Lista de comprobación final

☐ El widget aparece en mi web (Live Server o Pages) con un dato que cambia solo.
☐ He probado a cortar la conexión: muestra mensaje de error amable, no se queda eternamente en «Cargando…».
☐ F12 → Console está limpia de errores en mi GitHub Pages (mínimo «producción» a salvo).
☐ F12 → Network me muestra la petición a la API con la respuesta 200, y sé señalar en el JSON el valor que pinto.
☐ Sé contar el recorrido del dato en 4 pasos: navegador → URL → JSON → campo → pantalla.
☐ Sé decir por qué este dato encaja con MI marca (la frase del paso 1).
☐ Tengo 2+ commits con mensajes que cuentan decisiones, y la orden clave archivada en `notas.txt` del repo.
☐ No he subido ninguna clave ni token (este tutorial no usa: si algún día usas una, jamás va en `api.js` — la web es pública, cualquiera la lee con F12).

## Posibles preguntas del profe en la defensa

**— ¿Qué API consumes y por qué esa y no otra?**
Respuesta esperada: nombre de la API, qué dato da, y el encaje con tu marca (frase del paso 1). Valor extra si dices «verifiqué que tiene CORS abierto: en F12 → Network → Response Headers pone `access-control-allow-origin: *`».

**— Explícame el recorrido del dato desde que abro la web hasta que se ve.**
Respuesta esperada: «Al abrir la página, el navegador carga mi web y ejecuta `api.js`, que pide la URL ___ . El servidor devuelve JSON. Del JSON, el código saca el campo ___ (su ruta) y lo escribe en el `<div id="widget">`. Si la petición falla, en vez del dato se escribe el mensaje de error; por eso no se queda colgado.» Abre el F12 y señálalo: el efecto «lo tengo montado y lo sé mostrar» vale más que cualquier teoría.

**— ¿Tu widget funciona con `file://`? ¿Por qué?**
Respuesta esperada: «No. Los navegadores bloquean las peticiones a otras webs cuando abres la página como fichero, por seguridad (origen `null`). Con Live Server o en GitHub Pages la URL es `http(s)://...` y entonces sí.»

**— ¿Qué pasa si la API se cae o te quedas sin internet?**
Respuesta esperada: «Entra el bloque de error (el try/catch): el hueco muestra un aviso amable en vez de quedarse cargando. Lo probé cortando la conexión.» Si tu mensaje de error es feo o inexistente: no lo probaste. Vuelve al paso 4.

**— ¿Ese código lo escribiste tú?**
Respuesta esperada: «Lo pidió la IA a partir de mis requisitos (fetch, try/catch, estado de carga, error visible, recarga opcional), yo lo pegué en un fichero nuevo y lo probé. No lo leo línea a línea, pero sé qué pide, de dónde viene el dato y dónde se pinta, y puedo mejorarlo pidiendo cambios concretos. Además controlo el ritmo: una petición al cargar más la recarga automática, que en el wifi del instituto bajo para no chocar con el límite de ~60 peticiones por hora que GitHub da sin clave a cada IP.» — que es exactamente el criterio del curso.

---

*Hecho el widget, los compañeros que van a tu ritmo ya pueden probar con otras APIs de la lista, y el tutorial 3 (chatbot) reutiliza todo lo que has aprendido aquí: otra URL, otro JSON, mismo recorrido.*
