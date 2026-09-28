---
slug: medios
title: "Medios que cuentan tu historia: SVG propios, vídeo por código y animaciones con intención"
meta_description: "Tutorial 4 del proyecto web personal de marca (1º DAM): logo e iconos SVG propios, animaciones que aportan, vídeo de 30 segundos y limpieza final con Lighthouse. Sube el criterio «Riqueza de medios» al Excelente sin tocar código."
chip: "Proyecto 1 · Tutorial 4 · Sube: medios + diseño"
---
# Medios que cuentan tu historia: SVG propios, vídeo por código y animaciones con intención

Este tutorial sube un solo criterio de la rúbrica: **Riqueza de medios** (peso 10). Se sube entero, del primer casillero al último, y se nota en la nota: de «En desarrollo» a «Excelente» son 5 puntos de los 100 del proyecto (medio punto si tu nota va sobre 10), y encima arrastra parte de la casilla máxima de «Diseño» (microinteracciones) y la de «Arquitectura» (Lighthouse), las dos con peso 15.

La idea es simple. Las imágenes de stock las tiene todo el mundo; lo que nadie puede copiar es un SVG que ha escrito tu IA por ti, un vídeo de TU pantalla trabajando con la IA, y animaciones que están porque cuentan algo. Ni un píxel de relleno: cada medio que añadas tiene una misión que sabes explicar.

No vas a leer código. Pedirás, pegarás lo que salga en el fichero completo que te diga, guardarás y comprobarás en el navegador. Igual que en la [sesión 1](/programacion-ia/sesion-01/). El git y los commits ya los tienes de la [sesión 2](/programacion-ia/sesion-02/): cada paso de este tutorial termina con un commit, punto.

## Qué suma en la rúbrica

Transcribo los descriptores literales de la rúbrica del proyecto (`RUBRICA_WEB_MARCA`) para que sepas exactamente dónde vas.

| Casilla que mueve | Qué exigen para llegar ahí (literal de la rúbrica) | Qué te da este tutorial |
|---|---|---|
| **Riqueza de medios · Competente** (nivel 3, 80 % de 10 pts) | «Mezcla trabajada: fotos propias optimizadas, ≥2 SVG propios (iconos/illustraciones), vídeo embebido, animaciones CSS/JS que aportan.» | Los 4 SVG propios del paso 2-3, el vídeo del paso 4-5 y las 3 animaciones del paso 3. |
| **Riqueza de medios · Excelente** (nivel 4, 100 % de 10 pts) | «SVG animados propios, vídeo propio o demo grabada, animaciones con intención (no decorativas), Lighthouse media sin avisos.» | Logo animado (paso 2), demo grabada de 30 s (paso 4), las 8 comprobaciones de defensa (paso 7) y la limpieza con Lighthouse (paso 6). |
| **Diseño · Excelente** (4 de 4) | «Identidad propia defendible: logo/favicon hechos por ti, microinteracciones, consistencia en 4+ páginas, y sabes justificar cada decisión de diseño.» | Tu logo SVG + favicon (paso 2) son literalmente «logo/favicon hechos por ti»; las microinteracciones del paso 3 son la otra mitad de la casilla. |
| **Arquitectura · Excelente** (4 de 4) | «…Lighthouse ≥90 en rendimiento/accesibilidad, y ADR o README técnico explicando 2 decisiones de arquitectura.» | El paso 6 deja tu Lighthouse sin avisos de medios, que es lo que sostiene la puntuación cuando añades vídeo. |

Un detalle del «Excelente» de medios: exige **todo lo anterior** además de lo nuevo. O sea, además del SVG, el vídeo y la animación con intención, pide «fotos propias optimizadas». Si en tu web solo hay foto de stock, tienes un hueco. Se tapa fácil: sustituye la foto de stock por una tuya (en el espejo, tu mesa de trabajo, tu pantalla) pasada por Squoosh. El paso 6 te dice cómo.

Y ojo con el otro extremo: un vídeo de 200 MB en tu repo puede tumbar el mínimo de la rúbrica —«La web carga en producción (GitHub Pages) sin errores en consola»—. Por eso el vídeo pasa por compresión obligatoria antes de llegar a la web. Es el paso 4.

El tutorial completo, de un vistazo (una tarde entera con margen):

| Paso | Qué haces | Tiempo |
|---|---|---|
| 1 | Inventario de lo que hay hoy | 10 min |
| 2 | Logo + favicon SVG | 20 min |
| 3 | 4 iconos + 3 microinteracciones | 30 min |
| 4 | Guion, grabación y compresión del vídeo | 40 min |
| 5 | Embeber el vídeo bien | 15 min |
| 6 | Higiene (alt, lazy, Squoosh) y Lighthouse | 25 min |
| 7 | Recorrer las 8 comprobaciones de defensa | 10 min |

## Paso 1 · Inventario: qué tiene ahora tu web

Antes de pedir nada, mira lo que hay. Abre tu web en producción (la URL de GitHub Pages), F12, pestaña **Red** (Network), recarga con `Ctrl+R` y mira las peticiones:

- ¿Cuántas imágenes hay y de dónde salen? Si todas apuntan a una página de fotos de stock, tu criterio de medios está en «Insuficiente» o «En desarrollo», con permiso de la rúbrica.
- ¿Cuánto pesan? La columna «Size» te lo dice. Si pasas de 500 KB por imagen, vas sobrado de peso y corto de nota.
- ¿Algún fichero falla (rojo, 404)? Anótalo.
- ¿Hay algún SVG propio? Casi seguro que no, o es un icono pegado de una librería. Apunta «SVG propios: 0».

Anota el resultado en un `notas.txt` dentro de tu carpeta del proyecto, con este formato:

```
Inventario de medios (fecha):
- imágenes: 3 (1 de stock), peso total 1.8 MB
- SVG propios: 0
- vídeo: 0
- animaciones: 1 (hover de botones de serie)
- avisos Lighthouse de medios: por comprobar
```

Ese texto va a ser el punto de partida del primer prompt y, en la defensa, tu evidencia de que sabías dónde estabas antes de mejorar. Cuando termines el tutorial, repite el inventario y guarda las dos versiones en el repo: el antes/después también es proceso, que es la otra pata de la rúbrica.

**Commit:** `inventario de medios: situarme antes de tocar`

## Paso 2 · Tu logo en SVG: texto que la IA escribe

Vas a pedir un **SVG**, y aquí está la idea que cambia el tutorial: un SVG no es una foto, es texto. Dentro hay etiquetas, como en HTML, solo que dibujando. Por eso puedes decirle a la IA «póntelo azul» y reescribirlo en tres segundos, por eso escala sin pixelarse en cualquier pantalla, y por eso un logo hecho por ti no es un privilegio de gente que sabe dibujar. Y por eso también encaja tan bien en este curso: si la IA ya te escribe HTML, escribirte SVG es exactamente el mismo oficio.

Por qué SVG y no un PNG o una foto, en tres líneas (úsalas tal cual en la defensa):

| | PNG / JPG | SVG |
|---|---|---|
| Peso de un icono | 5-50 KB | 1-3 KB |
| Zoom o pantalla 4K | se pixela | perfecto siempre |
| Cambiar de color | rehacer el dibujo | cambiar una palabra (o `currentColor`) |

Prompt (complétalo con tus datos, es lo que lo hace tuyo):

```
Tengo una web personal de marca en HTML+CSS+JS puros (index.html, style.css, script.js).
Quiero un LOGO en SVG hecho por código, sin imágenes externas, para la cabecera de la web.

Mi nombre es ___ y quiero que el logo use mis iniciales ___
Estilo: ___ (minimalista / gamer / retro / sobrio), que combine con esta paleta: ___

Dame:
1. El SVG inline (las etiquetas <svg>…) listo para pegar en el sitio del nombre de la cabecera,
   con atributo fill="currentColor" en las partes de color para heredar el color del CSS.
2. La versión favicon: el mismo dibujo en un fichero favicon.svg, que se vea bien a 16 píxeles
   (pocas formas, sin detalles finos).
Dame el index.html completo con los cambios marcados con comentarios y el favicon.svg completo.
No cambies nada más.
```

**Comprobar en pantalla:** el logo aparece en la cabecera, nítido al hacer zoom del navegador (un SVG nunca se pixela, compruébalo con `Ctrl++`), y en la pestaña del navegador ves el favicon nuevo. Si el favicon no aparece, vacía la caché con `Ctrl+Shift+R`: el navegador se resiste a cambiarlo.

**El truco del currentColor (pruébalo, es tu defensa):** `currentColor` significa «usa el color del texto que tengo alrededor». Pídelo:

```
Cambia el color del logo en la cabecera sin tocar el SVG: quiero que herede el color del texto
del menú. Indica con comentarios solo las líneas de HTML y CSS que cambian. No cambies nada más.
```

Al cambiar el color del menú en el CSS, el logo cambia con él. Si tienes modo oscuro, esto tiene premio doble: tu SVG seguirá siendo visible en los dos temas porque no lleva un color fijo, lleva «el color del tema». Si alguien te pregunta en la defensa por qué tu logo no se ve negro sobre fondo negro, esa es la respuesta: `currentColor`.

**Si sale mal:**

- El logo se ve negro en modo oscuro → no usó `currentColor`. Rescate: `«El logo SVG de la cabecera se ve negro en modo oscuro. Devuélvelo con fill="currentColor" en las partes de trazo y relleno, y dime qué le pasaba. Dame el fichero completo con el cambio marcado con comentarios.»`
- El dibujo es un churro o no se parece a lo que pediste → no borres, pide otro. «Dame 3 variantes alternativas del mismo concepto, en 3 bloques distintos». Elegir entre tres es más fácil que imaginar una.
- El favicon no carga → mira en la pestaña Red si `favicon.svg` da 404: no lo subiste al repo o el `href` está mal. Rescate: `«Mi favicon da 404. Dame la línea <link rel="icon"> correcta para un favicon.svg que está en la raíz del sitio.»`

**Commit:** `logo y favicon SVG propios (currentColor)`

## Paso 3 · Cuatro iconos SVG coherentes y tres animaciones que aportan

Ahora una familia de iconos para tus secciones o habilidades. La palabra clave del prompt es **mismo estilo**: cuatro iconos sueltos parecen robados de cuatro webs; cuatro iconos del mismo trazo parecen una marca.

```
Añade a mi web 4 iconos en SVG inline, los cuatro con el mismo estilo de trazo (línea de 2 píxeles,
esquinas redondeadas), para estas 4 habilidades/secciones: ___ y ___, ___ y ___.
Quiero que se vean en la sección ___ de mi web.
Nada de imágenes externas ni librerías de iconos: solo <svg> escritos por ti.
Usa currentColor para el color de trazo y relleno, para que se adapten al tema claro y oscuro.
Dame el index.html completo con los bloques nuevos marcados con comentarios y el CSS que necesiten.
No cambies nada más.
```

**Comprobar:** los 4 iconos tienen el mismo grosor de línea y el mismo carácter (eso es «coherentes»), y al activar el modo oscuro ninguno se vuelve invisible ni se queda blanco sobre blanco.

**Y la parte que sube la casilla de «SVG animados propios»:** tu web lleva **tres** micro-interacciones, cada una con una misión. Pides las tres de una vez y en un solo prompt —así la IA no te rellena la web de movimiento gratuito—:

```
Añade a mi web exactamente estas 3 micro-interacciones, ninguna más:
1. Aparición al hacer scroll: cada sección entra con un fundido y 20 píxeles hacia arriba
   cuando llega a la pantalla (IntersectionObserver + CSS, una sola vez, sin repetir).
2. Hover en el botón de contacto: se levanta 2 píxeles y cambia de sombra, transición 0.2 s.
3. Contador animado: el número de ___ (ej: «12 proyectos») sube de 0 hasta su valor cuando
   el número aparece en pantalla, en 1 segundo.
Todas deben desactivarse si el visitante tiene preferencia de menos movimiento del sistema
(prefers-reduced-motion). Marca cada bloque con comentarios. No cambies nada más.
```

Y ahora la pregunta que decide si esto suma o resta nota: **¿para qué sirve cada una?** Tienes que saber responderlo, porque el descriptor del Excelente dice «animaciones con intención (no decorativas)»:

| Animación | Misión (tu respuesta en la defensa) |
|---|---|
| Aparición al scroll | Señalar «empieza una sección nueva» sin líneas ni titulares extra: ordena la lectura. |
| Hover en el botón | Decir «esto se puede pulsar» justo donde está tu llamada a la acción (contáctame). |
| Contador animado | Convertir un dato tuyo en un momento: el número de proyectos se recuerda mejor si se cuenta solo. |

Lo que **no** entra: partículas de fondo en bucle, textos parpadeando, fuegos artificiales de cursor. Prueba infalible antes de aceptar una animación: si la borras y nadie pierde información ni se le confunde el clic, esa animación no va en tu web.

**Y el logo, que se mueva él también:**

```
Haz que el logo de la cabecera tenga una animación sutil al pasar el ratón: que gire 5 grados
o se levante 2 píxeles, con una transición de 0.2 segundos, y que el movimiento desaparezca
si el visitante tiene activada la opción de menos movimiento del sistema
(prefers-reduced-motion). Marca el cambio con comentarios. No cambies nada más.
```

Ese paréntesis del `prefers-reduced-motion` vale oro. Hay gente a la que el movimiento en pantalla marea de verdad (es una condición real, no un capricho); respetarla se llama accesibilidad y la rúbrica la mide en «Arquitectura». En la defensa, saber explicar por qué tus animaciones **se apagan solas** para esas personas es un punto que casi nadie trae.

**Si sale mal:** los iconos se ven enormes o deformes → casi siempre falta el atributo `viewBox` o el CSS no los limita. Rescate: `«Mis SVG se ven de un tamaño raro. Añade viewBox correcto a cada uno y CSS que los limite a 24 píxeles de alto.»`

**Commit:** `iconos SVG coherentes + 3 microinteracciones con reduced-motion`

## Paso 4 · Vídeo por código (I): el guion, los 30 segundos y la compresión obligatoria

Vas a grabar una demo de **30 segundos** de ti trabajando con la IA: tú pides, la IA escribe, la web mejora. Es «vídeo propio o demo grabada» literal de la casilla Excelente, y es el medio que más se recuerda en una defensa.

Primero el guion, que se pide. Luego se graba, y al final se comprime. No te saltes el orden: grabar sin guion produce 4 minutos de cursor temblando.

```
Quiero grabar una demo de 30 segundos para mi web: yo pidiéndote una mejora, tú escribiendo el
código, y la web mejorando en el navegador. Escríbeme un guion de 3 escenas con marcas de tiempo
(0-10 s, 10-20 s, 20-30 s): qué tecleo, qué hago ver en pantalla y qué texto de rótulo pongo
encima del vídeo en cada escena (una frase corta por escena).
La mejora que voy a pedir en la demo es: ___ (ej: una sección de proyectos con tarjetas).
```

Ahora grabas pantalla. Dos vías, la que tengas a mano:

- **OBS Studio** ([obsproject.com](https://obsproject.com), gratis, para todo): escena → capturar pantalla → grabar. Un poco tosco de aprender, una tarde de configuración, pero es la vía del curso si ya lo usas.
- **Grab de macOS** (`Mayús+Comando+5`): seleccionar zona, grabar, parar. Cero configuración.

Graba los 30 segundos de una vez, con el navegador y el chat del centro ya abiertos, sin esperar respuestas largas: en la escena 1-2 puedes pedir en vivo, en la escena 3 muestras la web ya con el cambio. Nadie dice que el vídeo tenga que ser un directo. Tres detalles que separan un vídeo decente de uno cutre:

- Ordena el escritorio y cierra pestañas que no salen en el guion: en pantalla solo se ve tu web y el chat.
- Habla si quieres (un «voy a pedirle que…» en la escena 1 queda bien) o no: con rótulos basta. Pero nada de música de fondo con derechos: no es tuya y en una web de marca propia se ve fatal.
- Graba en horizontal, aunque tu web se vea en vertical: el reproductor queda mejor apaisado.

**Compresión, obligatoria:** el vídeo de 30 s de OBS en crudo ocupa 50-200 MB y eso no va en tu web ni en tu repo: GitHub avisa a los 50 MB y rompe a los 100, y una web que tarda media eternidad en cargar revienta tu Lighthouse de rendimiento y, con él, la casilla de Arquitectura. Pásalo por **HandBrake** ([handbrake.fr](https://handbrake.fr), gratis) con el preajuste **Fast 1080p30**, calidad de vídeo a `CRF 28` y marcado «Optimize for streaming» (web optimizado). De 30 segundos deben salir 2-5 MB. Si no salen, baja la resolución a 1280×720 en el preajuste.

Y saca la miniatura: pausa el vídeo donde se vea algo con sentido (tu cara, la web, el chat) y haz una captura de pantalla de esa zona; recórtala a 16:9 con cualquier editor. Eso será el póster.

**Commit:** `vídeo demo 30 s comprimido + póster (aún sin embeber)` — el `.mp4` y el póster van a una carpeta `media/` en el repo.

## Paso 5 · Vídeo por código (II): embeberlo bien o no embeberlo

El `<video>` mal puesto es la causa nº 1 de webs lentas con buena intención. El prompt de la IA, con la lista de condiciones integrada (no la negocias, es la ley):

```
Quiero poner en mi web el vídeo de mi carpeta media/demo.mp4, en la sección ___.
Ponme el <video> con:
- controls, para que el visitante decida
- el atributo poster="media/poster.png" (imagen de miniatura) y preload="none"
- width y height explícitos, para que la página no baile al cargar
- un texto de respaldo dentro del video («Tu navegador no soporta vídeo»)
Añade un <figcaption> de una línea diciendo qué se ve en el vídeo.
Dame el index.html completo con el bloque nuevo marcado con comentarios y el CSS de la figura.
No cambies nada más.
```

**Comprobar:** antes de pulsar play se ve tu póster (no un rectángulo negro), la página ya había cargado ligera (el vídeo no baja solo, `preload="none"`), y el reproductor tiene los controles. Y la prueba definitiva: **mándate la URL de producción al móvil y reprodúcelo ahí**. Si en el móvil va, en la defensa no hay duda: el mínimo de «se ve bien en el móvil» también queda cubierto con el medio nuevo.

Una nota técnica que te puede tocar explicar: el `.mp4` debe estar codificado con **H.264** (viene así por defecto en HandBrake y en las grabadoras de sistema), porque es el formato que entienden todos los navegadores. Si un día usas un `.webm` o un `.mov`, pídele a la IA la conversión: `«Convierte mi vídeo a mp4 H.264 listo para web: dame la orden exacta de HandBrake o ffmpeg y la línea <video> con las dos fuentes si hace falta.»`

**Si sale mal:**

- La página tardó una barbaridad en abrir → te saltaste la compresión o pusiste `autoplay`. Rescate: `«Mi web va lenta y pesa demasiado por el vídeo. Dame el <video> con preload="none" y sin autoplay, y dime qué peso máximo debo tener (mi mp4 pesa ___ MB).»` Y a HandBrake otra vez.
- El vídeo reproduce pero en el móvil a pantalla completa, sin tu diseño → normal en móvil, no es un error tuyo; con `controls` y `playsinline` (pídeselo) queda bien.
- No aparece el póster → ruta mal escrita. Míralo en la pestaña Red: si `poster.png` da 404, el fichero no está subido al repo.

**Commit:** `vídeo embebido con poster y preload="none"`

## Paso 6 · Higiene obligatoria y Lighthouse limpio

Aquí se separa el trabajo de la nota, y es un paso de 10 minutos. La higiene de medios no es estética: un `alt` bien puesto hace que un lector de pantalla le «lea» la imagen a quien no la ve, y un `loading="lazy"` hace que tu web arranque sin descargar lo que todavía no se ve. La rúbrica los cobra en «Arquitectura» y la casilla Competente de medios («Imágenes variadas **sin optimizar (peso, alt, lazy)**») te penaliza justo por no tenerlos.

Empieza por los `alt`, que es lo único que quizá quieras escribir tú (son TU foto, TU historia). La regla en dos líneas, y un ejemplo de tu web:

| Mal `alt` | Bien `alt` |
|---|---|
| `imagen1.jpg` | «Yo en el taller de robótica del instituto, presentando el brazo impreso en 3D» |
| «foto de mí» | «Mi escritorio: pantalla con el chat del centro y la web abierta» |
| «logo» (en el icono de GitHub) | «Enlace a mi perfil de GitHub» |

Tres cosas que delatan un `alt` perezoso: repite el nombre del fichero, dice «foto de» o «imagen de» (un lector de pantalla ya anuncia que es imagen), o es un párrafo. Una frase, qué se ve y por qué está ahí. Si prefieres que la IA te proponga los `alt` a partir de tu descripción, vale —pero luego los lees tú y los ajustas, porque en la defensa te los pueden preguntar.

Ahora el repaso completo, con un solo prompt:

```
Repasa de higiene de medios en mi web, una por una:
1. Cada <img> con alt descriptivo de verdad (no el nombre del fichero, ni «imagen»,
   ni «foto de mí»).
2. Cada <img> con loading="lazy" (excepto la del hero, que debe cargar antes).
3. Los nombres de fichero en minúscula, sin espacios ni tildes (logo-mio.svg, no «Logo Mío!.svg»).
4. La <video> con poster y preload="none" (ya la tienes, confírmalo).
5. Las imágenes de stock fuera: si queda alguna, déjame al lado un comentario «SUSTITUIR POR FOTO PROPIA».
Dame los ficheros completos con cada cambio marcado con un comentario que diga el número de la lista.
No cambies nada más.
```

Ahora optimiza las imágenes con tus manos, que para esto no hace falta IA: abre [squoosh.app](https://squoosh.app), arrastra cada imagen de tu web, baja la calidad hasta que se vea igual de bien (formato **MozJPEG** o **WebP**, calidad 60-75) y descarga la versión nueva, que sustituye a la vieja en tu carpeta. Una foto de 2 MB sale en 150 KB sin que nadie note la diferencia. Es la parte de «fotos propias optimizadas» que la casilla Competente exige, y la haces en cinco minutos.

> Squoosh se ejecuta en tu propio navegador: las fotos no se suben a ningún servidor. Dato útil por si alguien pregunta por la privacidad en la defensa.

Y el examen, Lighthouse: F12 → botón **⋮** (o `»`) en DevTools → **Lighthouse** → categoría **Rendimiento** y **Accesibilidad** → Analyze. Debes tener **0 avisos de medios**: ni «Image elements do not have explicit width and height», ni «Serves images with low resolution», ni nada que mencione `<img>` o `<video>`. Si sale alguno, ese es tu prompt de rescate:

```
Lighthouse me avisa de esto en mi web: ___ (copia el aviso literal).
Explícame en 2 líneas qué significa y dame el cambio exacto para que desaparezca.
Dame el fichero completo con el cambio marcado con comentarios. No cambies nada más.
```

Repite hasta que Lighthouse esté limpio de medios. Es el último descriptor del Excelente: «Lighthouse media sin avisos». No se negocia, se comprueba.

**Commit:** `higiene de medios: alt, lazy, imágenes optimizadas, Lighthouse limpio`

## Paso 7 · Las 8 comprobaciones de defensa

En la defensa no vas a explicar código; vas a explicar **qué** tiene tu web y **para qué**. Recorre esta lista en voz alta, con la web abierta, señalando cada elemento en pantalla. Si alguna te falla, el tutorial no ha terminado:

1. ☐ **Logo:** SVG inline escrito por mí, con `currentColor` y animación al hover. Para qué: identidad, y por eso se anima solo él, porque es la cara de la marca.
2. ☐ **Favicon:** el mismo símbolo a 16 píxeles, hecho por mí. Para qué: que se me reconozca en una pestaña entre doce.
3. ☐ **4 iconos SVG** de la misma familia de trazo. Para qué: escanear las habilidades sin leer, más rápido que un texto.
4. ☐ **Animación con intención y nombre propio:** sé decir qué hace cada animación de mi web y a qué visitante respeta (reduced motion). Sin animación «porque sí».
5. ☐ **Vídeo demo de 30 s** con guion, mío, comprimido con HandBrake y con póster. Para qué: contar cómo trabajo, no solo cómo quedó.
6. ☐ **Fotos propias optimizadas** (Squoosh), ninguna de stock. Para qué: autenticidad y peso.
7. ☐ **Higiene:** todos los `alt` descriptivos, `loading="lazy"` donde toca, `preload="none"` en el vídeo. Para qué: accesibilidad y velocidad, que es la casilla de Arquitectura.
8. ☐ **Lighthouse** con 0 avisos de medios, y capturas de la pantalla de resultados en el repo (carpeta `docs/`), como evidencia.

El recorrido entero son 90 segundos si te lo sabes. Si te pierdes en un punto, vuelve al paso correspondiente y repítelo con la web delante: la defensa se prepara usándola, no leyéndola.

**Commit final:** `evidencia Lighthouse 0 avisos de medios` (con las capturas dentro).

Y si miras tus commits de este tutorial —inventario, logo, iconos, vídeo, higiene, evidencia— verás que suman cinco más con mensajes que cuentan el proceso. El criterio «Proceso» (peso 15) también come de esto: casi nunca se señala, pero un historial donde cada paso multimedia tiene su commit se lee solo.

## Extra solo si vas sobrado: vídeo-gif hecho 100 % por código

La vía fiable es la demo grabada: la has probado tú, siempre funciona, y la rúbrica la admite tal cual. Pero si te sobra tiempo y quieres que el «vídeo» también salga del texto —el mismo argumento del SVG, pero en movimiento— hay dos caminos, uno barato y uno serio:

1. **Una animación CSS del logo en bucle**, con `@keyframes`, que parezca un GIF. Es el mismo SVG del paso 2, pero con la animación corriendo siempre. Pide:

```
Convierte el logo de mi cabecera en una animación en bucle de 4 segundos con @keyframes:
que se dibuje solo (stroke-dasharray/stroke-dashoffset) o se despiece y se recomponga,
lo que quede mejor con mi logo. Que respete prefers-reduced-motion (que pare el bucle).
Ponla como una <img> o inline en la sección ___. Dame los ficheros completos con el cambio
marcado con comentarios. No cambies nada más.
```

   Ocupa kilobytes, no requiere servicios externos y lo puedes poner en la cabecera o como «vídeo» de la defensa si lo justificas (es tu logo contándose). En la defensa esto es una **animación**, no una demo grabada: no sustituye al punto 5 de la lista de defensa, lo refuerza.

2. **Manim** ([manim.community](https://www.manim.community)) si ya manejas Python: un script genera un `.mp4` del logo animándose, y ese `.mp4` entra en el paso 5 como uno grabado, con su póster y su compresión. Potentísimo, pero es instalar cosas y aprender una librería; solo si vas sobrado, y avisa a tu profe de que el vídeo «está dibujado por código» en la defensa, que es justo lo que la casilla Excelente quiere oír.

Lo que **no** es vía válida: GIFs descargados, vídeos de stock con tu nombre encima o embeds de YouTube de terceros. La rúbrica dice «vídeo propio o demo grabada». Si no lo has hecho tú o no lo has generado tú, no puntúa.

## Errores típicos (y su prompt de rescate)

1. **Web lenta por un vídeo enorme.** Síntoma: el primer render pasa de 5 segundos y Lighthouse de rendimiento cae solo. Causa: vídeo crudo de OBS sin pasar por HandBrake, o `autoplay` que descarga el archivo entero al abrir. Rescate: el prompt del paso 5, y en HandBrake CRF 28 + 720p.
2. **Animación que marea.** Parallax continuo, partículas que no paran, un banner con bucle a pantalla completa. Síntoma real: alguien te dice «me marea tu web». Es accesibilidad fallando, no cuestión de gustos. Solución: anima al hover o a la entrada (una vez), nada de bucles eternos, y siempre `prefers-reduced-motion`.
3. **SVG negro en modo oscuro.** El SVG llevó un `fill="#000"` fijo en vez de `currentColor`. Pide el `currentColor` y compruébalo alternando el tema. El paso 2 tiene el rescate.
4. **Iconos incoherentes entre sí, o ficheros con el nombre de la grabación** (`Screencast 2026-09-28 21-43-05.mp4`, `Logo Mío!.svg`). Cada icono de un estilo distinto = no hay marca, hay recortable; y los nombres con espacios y mayúsculas dan 404 al publicar. Solución: un solo prompt para los cuatro iconos (paso 3, con «mismo estilo de trazo»), nombres en minúscula con guiones, y si el repo pesa una barbaridad: `«Mi repo es enorme por los medios. ¿Cómo lo dejo en menos de 50 MB sin romper la web? Dame la lista exacta de qué comprimir o quitar.»`
5. **«Fuego decorativo»**: la animación que no informaba de nada (partículas, confeti, cursor con estela). Es la antítesis del descriptor «animaciones con intención (no decorativas)». Antes de aceptar cualquier animación que proponga la IA, hazle la pregunta que te hará el profe: ¿qué le aporta a quien mira? Si la respuesta es «nada, pero queda guay», no va.

## Lista de comprobación final

Antes de dar el tutorial por terminado, todo esto se ve en pantalla sin abrir el código:

- ☐ Logo SVG en la cabecera, nítido con el zoom del navegador, y favicon nuevo en la pestaña (tras `Ctrl+Shift+R`).
- ☐ El logo cambia de color si cambia el tema (claro/oscuro) — hereda el color, no lo tiene fijo.
- ☐ Los 4 iconos comparten grosor de línea y carácter.
- ☐ Al pasar el ratón por el logo se anima, y el bucle desaparece si simulo menos movimiento.
- ☐ El vídeo tiene póster antes de pulsar play, el reproductor tiene controles y la página no se mueve al cargarlo.
- ☐ Squoosh pasado por cada imagen propia: ninguna pesa más de ~300 KB.
- ☐ Lighthouse → Rendimiento y Accesibilidad: cero avisos que mencionen imágenes o vídeo.
- ☐ Los 8 puntos de defensa los recorro en voz alta sin leer.

## Posibles preguntas del profe en la defensa

- **«¿Qué medios tiene tu web y para qué está cada uno?»** — Respuesta esperada: recorrer la lista de los 8 con la web abierta: logo (marca), iconos (escaneo), vídeo (proceso), fotos (prueba), animaciones (guiar la atención). Ninguno «porque sí».
- **«Explícame qué es currentColor sin abrir el código.»** — «Es una palabra que va en el SVG en lugar de un color: usa el color del texto que tiene alrededor, así el logo se adapta solo al tema claro y oscuro y yo lo pinto desde el CSS.»
- **«Tu vídeo pesa 3 MB, no 150. ¿Qué hiciste?»** — «Lo grabé en crudo, pesaba 80 MB, y lo pasé por HandBrake con el preset Fast 1080p30 y CRF 28. Y el reproductor usa `preload="none"`: el navegador no descarga el vídeo hasta que le doy play.»
- **«¿Esta animación que has puesto qué aporta, o es decorativa?»** — Nombrar UNA y su misión: «La aparición al hacer scroll separa las secciones sin poner líneas: el ojo entiende que empieza contenido nuevo. Si no aportara, la habría quitado: la rúbrica pide intención, no adorno.»
- **«¿Y si a un usuario le marea el movimiento de tu web?»** — «Todas mis animaciones respetan prefers-reduced-motion: si el sistema pide menos movimiento, se apagan solas. Lo probé activándolo en el sistema operativo y el logo y el contador dejan de animarse.»

---

## Si vas justo de tiempo: el camino mínimo a «Competente»

El «Excelente» es la meta de este tutorial, pero si solo tienes media hora antes de la entrega, el orden que más nota te da por minuto es este:

1. **Paso 2** (logo + favicon SVG): 20 min y te da los «SVG propios» que exige Competente y el «logo/favicon hechos por ti» del Diseño Excelente. Imprescindible.
2. **Paso 3, solo los iconos** (sin animaciones): 15 min más, y ya tienes los «≥2 SVG propios» con creces (5).
3. **Paso 6, solo la higiene**: 10 min de Squoosh y `alt`, y dejas de ser «imágenes sin optimizar» (el nivel 2 de la rúbrica).
4. Vídeo: si no da tiempo, queda para la siguiente sesión y aspiras a Competente sin el vídeo… que la casilla también pide. Con el tiempo justo, graba los 30 s y súbuelos al día siguiente: el guion ya lo tienes pedido.

Con eso tu «medios» está en Competente (8 de 10) y el diseño en camino. El Excelente se completa con el logo animado, el vídeo embebido y el Lighthouse limpio del paso 6.

## Cierre: qué has conseguido y qué toca ahora

Medios, del primer casillero al último: SVG propios y animados, una demo tuya embebida y sin avisos en Lighthouse. Diseño, con el logo/favicon hechos por ti y tres microinteracciones justificadas. Arquitectura, con la higiene y el rendimiento a raya. Y cinco commits nuevos que cuentan el proceso, que nunca viene mal.

*¿Y ahora qué?* Te quedan casillas caras por otro lado: el formulario con respuesta automática del [tutorial 3](/programacion-ia/tutoriales/chatbot/) (criterio Contacto, 15) o el widget con datos vivos del [tutorial 2](/programacion-ia/tutoriales/api-externa/) (Interactividad, 15). Y si el git se te oxida, la [sesión 2](/programacion-ia/sesion-02/) sigue siendo tu manual.
