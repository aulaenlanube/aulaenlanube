// Escena de «Red»: qué se envía y cómo lo pinta el otro jugador. No hay red de
// verdad: se simula el envío a 10 mensajes por segundo para poder verlo.

import { COLOR, THREE, miles, type Fabrica } from "../motor";

// Tres carriles a lo largo de X (de −4 a 4):
//   z = −2,2  tu pantalla: el personaje se mueve en cada fotograma;
//   z =  0    otro jugador, sin interpolar: salta a la última posición recibida;
//   z =  2,2  otro jugador, interpolando: va 100 ms por detrás, entre dos muestras.
// Sobre el carril de arriba quedan marcadas las posiciones que se han enviado.
export const red: Fabrica = (e) => {
  e.luces();
  e.mirar([0, 5.8, 7.8], [0, 0.2, 0.5]);

  const HZ = 10;
  const RETARDO = 1 / HZ;
  const CARRILES = [
    { z: -2.2, color: COLOR.azul, texto: "tu pantalla" },
    { z: 0, color: COLOR.rosa, texto: "en la del otro, tal cual llega" },
    { z: 2.2, color: COLOR.verde, texto: "en la del otro, interpolando" },
  ];

  const figura = (color: number) => {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.45, transparent: true });
    const cuerpo = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 0.55, 6, 16), mat);
    cuerpo.position.y = 0.58;
    cuerpo.castShadow = true;
    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.14, 0.34), new THREE.MeshStandardMaterial({ color: 0x0f172a, transparent: true }));
    visor.position.set(0.24, 0.85, 0);
    g.add(cuerpo, visor);
    g.userData.mats = [mat, visor.material];
    return g;
  };

  const partes = CARRILES.map((c) => {
    const pista = new THREE.Mesh(
      new THREE.PlaneGeometry(9.2, 1.5),
      new THREE.MeshStandardMaterial({ color: c.color, transparent: true, opacity: 0.3, roughness: 1 }),
    );
    pista.rotation.x = -Math.PI / 2;
    pista.position.set(0, 0.006, c.z);
    pista.receiveShadow = true;
    // El rótulo, tumbado delante de su carril: no tapa al personaje.
    const rotulo = e.etiqueta(c.texto, { alto: 0.36 });
    rotulo.position.set(0, 0.2, c.z + 0.98);
    const f = figura(c.color);
    f.position.z = c.z;
    e.escena.add(pista, rotulo, f);
    return { pista, rotulo, f };
  });

  // Marcas de lo enviado: aros en el suelo del primer carril (los 14 últimos).
  const MARCAS = 14;
  const geoAro = new THREE.RingGeometry(0.1, 0.17, 20).rotateX(-Math.PI / 2);
  const aros = Array.from({ length: MARCAS }, () => {
    const a = new THREE.Mesh(geoAro, new THREE.MeshBasicMaterial({ color: COLOR.ambar, transparent: true }));
    a.visible = false;
    e.escena.add(a);
    return a;
  });

  // El recorrido del jugador: va y viene, con cambios de ritmo.
  const camino = (t: number) => 3.6 * Math.sin(t * 1.25) * Math.cos(t * 0.37);

  type Muestra = { t: number; x: number };
  let muestras: Muestra[] = [];
  let enviados = 0;
  let proximo = 0;
  let reloj = 0;

  const opacidad = (g: THREE.Group, v: number) => {
    for (const m of g.userData.mats as THREE.Material[]) m.opacity = v;
  };

  return {
    actualizar({ paso, entra, dt }) {
      if (entra && paso === 0) {
        muestras = [];
        enviados = 0;
        proximo = 0;
        reloj = 0;
      }
      reloj += dt;
      const x = camino(reloj);
      // Envío: una muestra cada 100 ms.
      while (reloj >= proximo) {
        muestras.push({ t: proximo, x: camino(proximo) });
        if (muestras.length > MARCAS) muestras.shift();
        proximo += RETARDO;
        enviados++;
      }
      const ultima = muestras[muestras.length - 1];

      partes[0].f.position.x = x;
      partes[1].f.position.x = ultima ? ultima.x : x;
      // Interpolación: se dibuja el instante «ahora − 100 ms», entre las dos
      // muestras que lo rodean.
      const tr = reloj - RETARDO;
      let xi = muestras[0]?.x ?? x;
      for (let i = 0; i < muestras.length - 1; i++) {
        const a = muestras[i];
        const b = muestras[i + 1];
        if (tr >= a.t && tr <= b.t) {
          xi = a.x + ((b.x - a.x) * (tr - a.t)) / (b.t - a.t);
          break;
        }
        if (tr > b.t) xi = b.x;
      }
      partes[2].f.position.x = xi;

      aros.forEach((a, i) => {
        const m = muestras[muestras.length - 1 - i];
        a.visible = paso >= 1 && !!m;
        if (m) {
          a.position.set(m.x, 0.02, CARRILES[0].z);
          a.material.opacity = 1 - i / MARCAS;
        }
      });

      // Cada paso ilumina su carril; los que aún no se han explicado, tenues.
      const VISTA = [
        [1, 0.22, 0.22],
        [1, 0.22, 0.22],
        [0.5, 1, 0.22],
        [0.5, 0.5, 1],
      ][paso];
      partes.forEach((p, i) => {
        opacidad(p.f, VISTA[i]);
        p.rotulo.material.opacity = VISTA[i] < 0.3 ? 0.4 : 1;
      });
    },
    dato: () => `${HZ} mensajes por segundo · enviados: ${miles(enviados)}`,
  };
};
