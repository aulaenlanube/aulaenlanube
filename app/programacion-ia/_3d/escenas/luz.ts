// Escenas de «Luz y cámara»: tipos de luz, la cámara por dentro y cámaras de juego.

import { COLOR, THREE, idaYVuelta, mezcla, num, suave, type Fabrica } from "../motor";

/** Unos cuantos objetos claros sobre el suelo, para ver cómo les da la luz. */
function bodegon(escena: THREE.Scene) {
  const mat = (color: number) => new THREE.MeshStandardMaterial({ color, roughness: 0.55 });
  const piezas: THREE.Mesh[] = [
    new THREE.Mesh(new THREE.SphereGeometry(0.75, 40, 28), mat(0xe2e8f0)),
    new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), mat(COLOR.azul)),
    new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.7, 32), mat(COLOR.ambar)),
    new THREE.Mesh(new THREE.TorusKnotGeometry(0.45, 0.17, 96, 14), mat(COLOR.rosa)),
  ];
  piezas[0].position.set(-2.4, 0.75, 0.3);
  piezas[1].position.set(-0.5, 0.6, -0.7);
  piezas[1].rotation.y = 0.5;
  piezas[2].position.set(1.3, 0.85, 0.5);
  piezas[3].position.set(2.9, 0.95, -0.5);
  for (const p of piezas) {
    p.castShadow = true;
    p.receiveShadow = true;
    escena.add(p);
  }
  return piezas;
}

// ── Cuatro tipos de luz ─────────────────────────────────────────────────────
export const luces: Fabrica = (e) => {
  e.suelo(14, { rejilla: false, color: 0x8792a5 });
  bodegon(e.escena);
  e.mirar([0, 3.6, 8.2], [0, 0.7, 0]);

  const ambiente = new THREE.AmbientLight(0xffffff, 1.7);

  const direccional = new THREE.DirectionalLight(0xffffff, 3);
  direccional.castShadow = true;
  direccional.shadow.mapSize.set(1024, 1024);
  const sc = direccional.shadow.camera;
  sc.left = sc.bottom = -7;
  sc.right = sc.top = 7;
  sc.far = 30;
  direccional.shadow.bias = -0.0004;
  direccional.shadow.normalBias = 0.02;

  const puntual = new THREE.PointLight(0xffd9a0, 34, 11, 2);
  puntual.castShadow = true;
  puntual.shadow.mapSize.set(512, 512);
  puntual.shadow.bias = -0.002;
  puntual.add(new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 10), new THREE.MeshBasicMaterial({ color: 0xffd9a0 })));

  const foco = new THREE.SpotLight(0xffffff, 150, 16, 0.42, 0.35, 2);
  foco.castShadow = true;
  foco.shadow.mapSize.set(1024, 1024);
  foco.shadow.bias = -0.0006;
  foco.position.set(0, 6, 1.5);
  const conoFoco = new THREE.SpotLightHelper(foco, COLOR.ambar);

  // El sol dibujado: una bolita y la línea por la que llegan sus rayos.
  const solDibujo = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 10), new THREE.MeshBasicMaterial({ color: 0xfde68a }));
  const rayo = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
    new THREE.LineDashedMaterial({ color: 0xfde68a, dashSize: 0.25, gapSize: 0.15 }),
  );

  e.escena.add(ambiente, direccional, direccional.target, puntual, foco, foco.target, conoFoco, solDibujo, rayo);
  const NOMBRE = ["AmbientLight", "DirectionalLight", "PointLight", "SpotLight"];
  let actual = 0;

  return {
    actualizar({ paso, u, tp }) {
      actual = paso;
      ambiente.intensity = paso === 0 ? 1.5 : paso === 1 ? 0.35 : 0.5;
      direccional.visible = solDibujo.visible = rayo.visible = paso === 1;
      puntual.visible = paso === 2;
      foco.visible = conoFoco.visible = paso === 3;

      if (paso === 1) {
        // El sol recorre un arco de un lado a otro: las sombras giran con él.
        const a = mezcla(-1.0, 1.0, idaYVuelta(u));
        direccional.position.set(7 * Math.sin(a), 6.5, 4 * Math.cos(a));
        solDibujo.position.copy(direccional.position);
        rayo.geometry.setFromPoints([direccional.position.clone(), new THREE.Vector3(0, 0, 0)]);
        rayo.computeLineDistances();
      } else if (paso === 2) {
        puntual.position.set(2.6 * Math.cos(tp * 1.1), 1.5 + 0.4 * Math.sin(tp * 0.8), 1.6 * Math.sin(tp * 1.1) + 0.9);
      } else if (paso === 3) {
        foco.target.position.set(3 * Math.sin(tp * 0.9), 0, 0.2);
        foco.target.updateMatrixWorld();
        conoFoco.update();
      }
    },
    dato: () => NOMBRE[actual],
  };
};

// ── La cámara por dentro ────────────────────────────────────────────────────
// Vista grande: la escena desde fuera, con la cámara de juego dibujada y su
// pirámide de visión (CameraHelper). Recuadro abajo a la derecha: lo que ve
// esa cámara. Cinco postes en fila, de z = 1 a z = −11, separados 3.
export const camara: Fabrica = (e) => {
  e.luces({ sombras: false });
  e.suelo(30);
  e.mirar([9.5, 7.5, 9.5], [0, 0.5, -4]);

  const colores = [COLOR.rosa, COLOR.ambar, COLOR.verde, COLOR.azul, COLOR.morado];
  colores.forEach((c, i) => {
    const poste = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2, 0.8), new THREE.MeshStandardMaterial({ color: c, roughness: 0.5 }));
    poste.position.set(i % 2 ? 1.1 : -1.1, 1, 1 - i * 3);
    e.escena.add(poste);
  });

  const ORIGEN = new THREE.Vector3(0, 1.3, 6);
  const persp = new THREE.PerspectiveCamera(50, 16 / 9, 0.3, 18);
  persp.position.copy(ORIGEN);
  persp.lookAt(0, 1, -6);
  const orto = new THREE.OrthographicCamera(-4.8, 4.8, 2.7, -2.7, 0.3, 18);
  orto.position.copy(ORIGEN);
  orto.lookAt(0, 1, -6);
  const ayudaPersp = new THREE.CameraHelper(persp);
  const ayudaOrto = new THREE.CameraHelper(orto);
  // El cuerpo de la cámara, para saber dónde está.
  const cuerpo = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.7), new THREE.MeshStandardMaterial({ color: e.tema.neutro }));
  cuerpo.position.copy(ORIGEN).add(new THREE.Vector3(0, 0, 0.4));
  e.escena.add(persp, orto, ayudaPersp, ayudaOrto, cuerpo);

  let texto = "";
  let activa: THREE.Camera = persp;
  const fondo = new THREE.Color(e.tema.papel);
  const borde = new THREE.Color(COLOR.azul);

  return {
    actualizar({ paso, u }) {
      let fov = 50;
      let near = 0.3;
      let far = 18;
      if (paso === 0) fov = mezcla(50, 22, suave(u * 2.2));
      else if (paso === 1) fov = mezcla(22, 85, suave(u * 1.8));
      else if (paso === 2) {
        // El plano lejano se acerca y vuelve; el cercano se aleja un poco.
        const k = idaYVuelta(u);
        far = mezcla(18, 6, k);
        near = mezcla(0.3, 3.2, k);
      }
      persp.fov = fov;
      persp.near = near;
      persp.far = far;
      persp.updateProjectionMatrix();
      activa = paso === 3 ? orto : persp;
      ayudaPersp.visible = paso !== 3;
      ayudaOrto.visible = paso === 3;
      ayudaPersp.update();
      ayudaOrto.update();
      texto =
        paso === 3
          ? "OrthographicCamera"
          : paso === 2
            ? `near ${num(near)} · far ${num(far)}`
            : `fov ${Math.round(fov)}°`;
    },
    pintar(r, ancho, alto) {
      r.render(e.escena, e.camara);
      // Recuadro: 40 % del ancho, 16:9, con un margen de 12 px y borde de 3.
      const w = Math.round(ancho * 0.4);
      const h = Math.round((w * 9) / 16);
      const x = ancho - w - 12;
      const y = 12;
      const va = ayudaPersp.visible;
      const vo = ayudaOrto.visible;
      ayudaPersp.visible = ayudaOrto.visible = cuerpo.visible = false;
      r.setScissorTest(true);
      r.setScissor(x - 3, y - 3, w + 6, h + 6);
      r.setViewport(x - 3, y - 3, w + 6, h + 6);
      r.setClearColor(borde, 1);
      r.clear();
      r.setScissor(x, y, w, h);
      r.setViewport(x, y, w, h);
      r.setClearColor(fondo, 1);
      r.clear();
      r.render(e.escena, activa);
      r.setScissorTest(false);
      r.setViewport(0, 0, ancho, alto);
      r.setClearColor(0x000000, 0);
      ayudaPersp.visible = va;
      ayudaOrto.visible = vo;
      cuerpo.visible = true;
    },
    dato: () => texto,
  };
};

// ── Cámaras de juego ────────────────────────────────────────────────────────
// El robot anda en círculo (radio 3,2) entre unos cuantos obstáculos. La
// cámara de la escena es la del paso: fija, tercera persona, primera persona
// o cenital. Cambia de una a otra deslizándose (salvo la primera persona).
export const seguimiento: Fabrica = async (e) => {
  e.luces();
  e.suelo(24);
  const { modelo, clips } = await e.robot(1.8);
  e.escena.add(modelo);
  const mezclador = new THREE.AnimationMixer(modelo);
  const andar = clips.find((c) => c.name === "Walking");
  if (andar) mezclador.clipAction(andar).play();

  // Decorado determinista: cajas y «árboles» alrededor del recorrido.
  const cosas: [number, number, number][] = [
    [0, 0, COLOR.ambar],
    [5.5, 1.5, COLOR.verde],
    [-5.2, -2.5, COLOR.verde],
    [1.5, -6, COLOR.rosa],
    [-2.5, 5.8, COLOR.morado],
    [6, -4.5, COLOR.azul],
    [-6.5, 3.5, COLOR.ambar],
  ];
  cosas.forEach(([x, z, color], i) => {
    const m =
      i % 2
        ? new THREE.Mesh(new THREE.ConeGeometry(0.7, 2.2, 7), new THREE.MeshStandardMaterial({ color, flatShading: true }))
        : new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 1.1), new THREE.MeshStandardMaterial({ color, roughness: 0.6 }));
    m.position.set(x, i % 2 ? 1.1 : 0.55, z);
    m.castShadow = true;
    e.escena.add(m);
  });

  const R = 3.2;
  const pos = new THREE.Vector3();
  const delante = new THREE.Vector3();
  const quiere = new THREE.Vector3();
  const mira = new THREE.Vector3();
  const miraSuave = new THREE.Vector3(0, 1, 0);
  let angulo = 0;
  e.camara.position.set(8, 5, 8);

  return {
    camaraPropia: true,
    actualizar({ paso, dt, entra }) {
      angulo += dt * 0.42;
      pos.set(R * Math.cos(angulo), 0, R * Math.sin(angulo));
      delante.set(-Math.sin(angulo), 0, Math.cos(angulo));
      modelo.position.copy(pos);
      modelo.rotation.y = Math.atan2(delante.x, delante.z);
      mezclador.update(dt);
      modelo.visible = paso !== 2;

      if (paso === 0) {
        quiere.set(8, 5, 8);
        mira.set(0, 0.8, 0);
      } else if (paso === 1) {
        quiere.copy(pos).addScaledVector(delante, -4.2).setY(2.5);
        mira.copy(pos).setY(1.3);
      } else if (paso === 2) {
        quiere.copy(pos).addScaledVector(delante, 0.25).setY(1.55);
        mira.copy(pos).addScaledVector(delante, 6).setY(1.3);
      } else {
        quiere.set(0, 15, 0.01);
        mira.set(0, 0, 0);
      }
      // La primera persona va clavada a los ojos; las demás llegan deslizándose.
      const k = paso === 2 && !entra ? 1 - Math.exp(-dt * 14) : 1 - Math.exp(-dt * 3.2);
      e.camara.position.lerp(quiere, dt === 0 ? 1 : k);
      miraSuave.lerp(mira, dt === 0 ? 1 : k);
      e.camara.fov = paso === 2 ? 68 : 42;
      e.camara.updateProjectionMatrix();
      e.camara.lookAt(miraSuave);
    },
    destruir() {
      mezclador.stopAllAction();
    },
  };
};
