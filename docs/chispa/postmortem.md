# Postmortem

Qué salió bien, qué salió mal y qué se haría distinto. Escrito al cerrar la 1.0.

## Lo que funcionó

- **Diseño en una página con filtro de alcance.** Todo lo que está en «fuera»
  siguió fuera. El juego se acabó porque era pequeño.
- **Reglas como lógica pura.** Lo mejor del proyecto. Se probaron sin navegador,
  y al llegar la red bastó con decidir quién las ejecuta: no hubo que tocarlas.
- **Rivales del ordenador desde el hito 1.** Sin ellos no se puede probar solo un
  juego multijugador. Además sirvieron para medir el ritmo simulando partidas.
- **Herramientas para que el agente vea.** La captura sin pantalla y
  `chispa.adelantar()` convirtieron «creo que funciona» en «mira».
- **El escenario por guion.** Mover cuatro pilares fue cambiar una línea.
- **La prueba de dos navegadores.** Encontró que todos aparecían en el mismo
  punto antes de que lo viera nadie, y dio confianza para reescribir la partida
  entera en la sesión 6.
- **Mismo origen para el juego y Supabase.** Ni un problema de CORS ni de
  certificados.

## Lo que costó

- **El controlador de personaje de Rapier.** Tres tropiezos seguidos: no subía
  escalones (caída demasiado grande en el mismo movimiento), la velocidad no era
  la real y el ascensor hundía al robot. Ninguno estaba en la documentación.
- **Pasar de «paseo» a «partida» en red.** `partida.ts` se reescribió entera en
  la sesión 6. Habría sido más barato pensar en el anfitrión desde la sesión 4.
- **Las llamadas de dibujo.** Se arregló lo que se creía el problema (el
  escenario) y resultó que eran los robots con sus sombras.

## Lo que queda

- Rapier pesa 1,6 MB comprimido porque lleva el WebAssembly incrustado en el
  JavaScript. Con el paquete que lo trae aparte bajaría a menos de la mitad.
- El anfitrión se fía de la posición que dice cada jugador y cada jugador apunta
  su propio resultado. Arreglarlo de verdad pide un servidor que arbitre.
- Solo se ha probado con personas de verdad lo que cabe en dos navegadores
  automáticos. Falta el playtest en clase.
- Los rivales del ordenador no usan el ascensor ni los turbos.

## Si se empezara otra vez

1. El anfitrión y los mensajes, dibujados en la sesión 1 aunque no se programen
   hasta la 5.
2. La prueba de dos navegadores, el mismo día que el primer mensaje por la red.
3. El panel de F3 con las llamadas de dibujo, desde la primera escena.
