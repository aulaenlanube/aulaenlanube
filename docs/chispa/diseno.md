# Chispa · diseño en una página

> Robots que se disputan una chispa en una azotea flotante.

## La idea, en una frase

De 2 a 8 robots corren por una azotea suspendida en el cielo. Solo hay **una
chispa**: quien la lleva carga su batería; los demás le embisten para quitársela.
Gana quien llena antes la batería.

## El bucle de juego (lo que haces cada 10 segundos)

1. Ves quién lleva la chispa (brilla y tiene una flecha encima).
2. Corres hacia él, saltas lo que haga falta y le **embistes**.
3. Si aciertas, la chispa es tuya: ahora huyes tú.
4. Mientras la llevas, tu batería sube. Si te caes de la azotea, la pierdes.

## Reglas

| Regla | Valor inicial |
|---|---|
| Llevar la chispa | +1 % de batería cada 0,6 s |
| Ganar | primer robot en llegar al 100 %, o el que más tenga a los 3 min |
| Embestida | impulso corto hacia delante; se recarga en 2,5 s |
| Embestir al portador | le quitas la chispa y sale despedido |
| Embestir a otro | sale despedido (puedes tirarlo de la azotea) |
| Recién robada | 1,4 s en los que nadie te la puede quitar |
| Caerse | reapareces a los 2 s; si llevabas la chispa, vuelve al centro |
| El portador | corre un 8 % más despacio: siempre se le puede alcanzar. Desde la versión 3.1, si la lleva más de 5 s seguidos, cada vez menos (hasta un 25 % a los 25 s) |
| Presión sobre el líder | mientras el primero lleva la chispa, los demás corren hasta un 15 % más y recargan la embestida hasta un 30 % antes, según lo que les saque (todo, con 25 puntos o más) |

## Controles

| Acción | Teclado y ratón | Mando | Móvil |
|---|---|---|---|
| Moverse | WASD o flechas | stick izquierdo | joystick en pantalla |
| Mirar | ratón (o Q / E) | stick derecho | arrastrar a la derecha |
| Saltar | Espacio | A | botón |
| Embestir | Mayúsculas o clic | X | botón |

## Qué tiene de 3D y qué de multijugador

- **3D**: azotea modelada en Blender (rampas, plataformas, una plataforma móvil,
  muelles), robots con esqueleto y animaciones, cámara en tercera persona,
  físicas (cápsula del personaje, colisiones con el escenario, caídas).
- **Multijugador**: salas de 2 a 8 con código, en tiempo real con Supabase. Cada
  jugador envía su posición; el **anfitrión** decide quién lleva la chispa y cuánta
  batería tiene cada uno. El ranking se guarda en la base de datos.

## El filtro de alcance

| | Qué entra |
|---|---|
| **Mínimo jugable** (hito 1, sesión 4) | Un robot que corre, salta y embiste por la azotea; la chispa se coge y da batería; se puede ganar. Rivales manejados por el ordenador para probarlo solo. |
| **Versión 1.0** (sesión 8) | Salas en red, anfitrión con autoridad, interpolación, reconexión, ranking guardado, menú, marcador, sonido, móvil y mando. |
| **Fuera** (no se hace) | Varios escenarios, chat, personalizar el robot más allá del color, partidas con espectadores, servidor propio que arbitre. |

## Lo que viaja por la red (previsto)

| Mensaje | Quién lo envía | Cada cuánto |
|---|---|---|
| Mi posición, giro, animación | cada jugador | 15 veces por segundo |
| Quién lleva la chispa, baterías, reloj | el anfitrión | 5 veces por segundo |
| «He embestido a X» | quien embiste | cuando ocurre |
| «X sale despedido», «la chispa cambia de manos» | el anfitrión | cuando ocurre |

## Riesgos

- **Que alguien haga trampas**: el arbitraje lo hace el navegador del anfitrión, no
  un servidor. Se acepta y se documenta; es un juego entre compañeros.
- **Que no se pueda probar solo**: por eso hay rivales manejados por el ordenador
  desde el hito 1.
- **Rendimiento en los portátiles del aula**: presupuesto de 200 llamadas de dibujo
  y 300 000 triángulos; ajuste de calidad en el menú.

## Versión 2 (ampliaciones)

Con la 1.0 publicada, el juego se amplía sin cambiar la regla central:

| Qué se añade | Por qué |
|---|---|
| 10 robots con características y habilidad propia | Que elegir personaje sea una decisión de juego, no solo de aspecto |
| 21 objetos: ventajas, trampas y armas | Dar la vuelta a una partida que se está perdiendo, y que coger algo sea una decisión (no todo es bueno) |
| 6 escenarios, cada uno con un truco | Que cada partida pida jugar de otra manera |
| 3 ritmos | Subir la dificultad sin tocar las reglas |
| Presión sobre el líder (la chispa pesa, persecución, la caja sorpresa según cómo vayas) | Que quien se escapa no deje la partida decidida: progresiva y con tope, para que siga ganando quien juega mejor |

**Lo que sigue fuera**: chat, espectadores, modos de juego distintos de «la
chispa», servidor propio que arbitre.

Los detalles, bloque a bloque, en [`docs/ampliaciones/`](ampliaciones/).
