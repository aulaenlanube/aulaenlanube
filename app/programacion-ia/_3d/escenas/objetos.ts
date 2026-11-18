// Escenas de «Los objetos»: la malla, el nivel de detalle, los materiales y las texturas.

import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { COLOR, THREE, miles, suave, triangulos, type Fabrica } from "../motor";

// ── Vértices, aristas, caras, suavizado ─────────────────────────────────────
export const malla: Fabrica = (e) => {
  e.luces({ sombras: false });
  e.mirar([0, 1.2, 5.6], [0, 0, 0]);

  // Un icosaedro subdividido, con los vértices compartidos (indexado): así la
  // cuenta de vértices es la real y las normales suaves salen bien.
  const base = new THREE.IcosahedronGeometry(1.7, 2);
  const soloPos = new THREE.BufferGeometry();
  soloPos.setAttribute("position", base.attributes.position.clone());
  base.dispose();
  const geo = mergeVertices(soloPos, 1e-4);
  geo.computeVertexNormals();
  const nVert = geo.attributes.position.count;
  const nTri = triangulos(geo);

  const grupo = new THREE.Group();
  const puntos = new THREE.Points(geo, new THREE.PointsMaterial({ color: COLOR.ambar, size: 0.11, sizeAttenuation: true }));
  const aristasGeo = new THREE.EdgesGeometry(geo, 0.1);
  const aristas = new THREE.LineSegments(aristasGeo, new THREE.LineBasicMaterial({ color: e.tema.neutro, transparent: true }));
  const nAristas = aristasGeo.attributes.position.count;
  const facetada = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({ color: COLOR.azul, flatShading: true, roughness: 0.55, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 }),
  );
  const lisa = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: COLOR.azul, roughness: 0.45 }));
  grupo.add(puntos, aristas, facetada, lisa);
  e.escena.add(grupo);

  return {
    actualizar({ paso, u, dt }) {
      grupo.rotation.y += dt * 0.45;
      grupo.rotation.x = 0.25;
      puntos.visible = paso <= 1;
      aristas.visible = paso >= 1 && paso <= 2;
      // Las aristas se van trazando; ya con caras, quedan tenues.
      aristasGeo.setDrawRange(0, paso === 1 ? 2 * Math.floor((nAristas / 2) * suave(u * 1.6)) : nAristas);
      aristas.material.opacity = paso === 2 ? 0.45 : 1;
      facetada.visible = paso === 2;
      lisa.visible = paso === 3;
    },
    dato: () => `${miles(nVert)} vértices · ${miles(nTri)} triángulos`,
  };
};

// ── Más triángulos, más detalle ─────────────────────────────────────────────
export const detalle: Fabrica = (e) => {
  e.luces({ sombras: false });
  e.mirar([0, 0.9, 5.4], [0, 0, 0]);

  const NIVELES: [number, number][] = [
    [6, 4],
    [12, 8],
    [24, 16],
    [96, 64],
  ];
  const grupo = new THREE.Group();
  const cara = new THREE.MeshStandardMaterial({ color: COLOR.verde, flatShading: true, roughness: 0.5, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
  const linea = new THREE.LineBasicMaterial({ color: e.tema.oscuro ? 0x06281d : 0x064e3b, transparent: true, opacity: 0.75 });
  const esferas = NIVELES.map(([w, h]) => {
    const g = new THREE.SphereGeometry(1.7, w, h);
    const nivel = new THREE.Group();
    nivel.add(new THREE.Mesh(g, cara), new THREE.LineSegments(new THREE.WireframeGeometry(g), linea));
    // Los triángulos de los polos de una esfera son degenerados: w*2*(h-1) reales.
    nivel.userData.tri = 2 * w * (h - 1);
    grupo.add(nivel);
    return nivel;
  });
  e.escena.add(grupo);
  let actual = 0;

  return {
    actualizar({ paso, dt }) {
      actual = paso;
      grupo.rotation.y += dt * 0.4;
      esferas.forEach((s, i) => (s.visible = i === paso));
    },
    dato: () => `${miles(esferas[actual].userData.tri)} triángulos`,
  };
};

// ── Materiales PBR ──────────────────────────────────────────────────────────
// Cinco esferas de radio 0,62 separadas 1,5 (x de −3 a 3), sobre el suelo.
export const materiales: Fabrica = (e) => {
  e.luces({ ambiente: 0.25, sol: 1.5 });
  e.suelo(14, { rejilla: false, color: 0x566175 });
  e.escena.environment = e.entorno();
  e.escena.environmentIntensity = 0.9;
  e.mirar([0, 2.3, 7.4], [0, 0.7, 0]);

  const XS = [-3, -1.5, 0, 1.5, 3];
  const geo = new THREE.SphereGeometry(0.62, 48, 32);
  const bolas = XS.map((x) => {
    const m = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color: COLOR.azul }));
    m.position.set(x, 0.62, 0);
    m.castShadow = true;
    e.escena.add(m);
    return m;
  });
  const mat = (i: number) => bolas[i].material as THREE.MeshPhysicalMaterial;

  // Un juego de rótulos por paso (se enseña solo el del paso actual).
  const TEXTOS = [
    ["rojo", "ámbar", "verde", "azul", "morado"],
    ["0", "0,25", "0,5", "0,75", "1"],
    ["0", "0,25", "0,5", "0,75", "1"],
    ["emite", "cristal", "emite", "cristal", "normal"],
  ];
  const rotulos = TEXTOS.map((fila) =>
    fila.map((texto, i) => {
      const s = e.etiqueta(texto, { alto: 0.3 });
      s.position.set(XS[i], 1.62, 0);
      e.escena.add(s);
      return s;
    }),
  );
  const BASES = [0xef4444, COLOR.ambar, COLOR.verde, COLOR.azul, COLOR.morado];

  const aplicar = (paso: number) => {
    bolas.forEach((_, i) => {
      const m = mat(i);
      m.emissive.set(0x000000);
      m.emissiveIntensity = 0;
      m.transmission = 0;
      m.thickness = 0;
      m.envMapIntensity = 1;
      if (paso === 0) {
        m.color.set(BASES[i]);
        m.roughness = 1;
        m.metalness = 0;
        m.envMapIntensity = 0.15;
      } else if (paso === 1) {
        m.color.set(0x24406e);
        m.roughness = i / 4;
        m.metalness = 0;
      } else if (paso === 2) {
        m.color.set(0xf2b84b);
        m.roughness = 0.22;
        m.metalness = i / 4;
      } else if (i === 0 || i === 2) {
        m.color.set(0x111827);
        m.emissive.set(i === 0 ? COLOR.verde : COLOR.rosa);
        m.emissiveIntensity = 1.6;
        m.roughness = 0.5;
        m.metalness = 0;
      } else if (i === 1 || i === 3) {
        m.color.set(i === 1 ? 0xffffff : 0x9bd3ff);
        m.roughness = 0.04;
        m.metalness = 0;
        m.transmission = 1;
        m.thickness = 1.1;
        m.ior = 1.45;
      } else {
        m.color.set(COLOR.azul);
        m.roughness = 0.5;
        m.metalness = 0;
      }
      m.needsUpdate = true;
    });
    rotulos.forEach((fila, p) => fila.forEach((s) => (s.visible = p === paso)));
  };

  const NOMBRE = ["color base", "rugosidad (roughness)", "metalicidad (metalness)", "emissive · transmission"];
  let actual = 0;
  return {
    actualizar({ paso, entra, t }) {
      if (entra) aplicar(paso);
      actual = paso;
      // Las esferas suben y bajan un poco para que el brillo se mueva.
      bolas.forEach((b, i) => (b.position.y = 0.62 + 0.06 * Math.sin(t * 1.4 + i)));
    },
    dato: () => NOMBRE[actual],
  };
};

// ── Texturas ────────────────────────────────────────────────────────────────
// Azulejos generados con canvas (no se descarga ninguna imagen): 4×4 baldosas
// de colores con junta. Del mismo dibujo salen el mapa de color, el de
// normales (bisel de cada baldosa) y el de rugosidad (baldosa brillante, junta mate).
function azulejos() {
  const N = 256;
  const CELDA = N / 4;
  const JUNTA = 5;
  const BISEL = 5;
  const lienzo = (pintar: (c: CanvasRenderingContext2D) => void) => {
    const l = document.createElement("canvas");
    l.width = l.height = N;
    pintar(l.getContext("2d")!);
    return l;
  };
  const tonos = ["#2f7fd8", "#f5f0e6", "#e0a23a", "#2f7fd8", "#f5f0e6", "#c94f4f", "#f5f0e6", "#e0a23a"];

  const color = lienzo((c) => {
    c.fillStyle = "#8a8f98";
    c.fillRect(0, 0, N, N);
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 4; i++) {
        c.fillStyle = tonos[(i * 3 + j * 5) % tonos.length];
        c.fillRect(i * CELDA + JUNTA / 2, j * CELDA + JUNTA / 2, CELDA - JUNTA, CELDA - JUNTA);
      }
    }
  });

  // Altura de cada píxel: 0 en la junta, sube en el bisel y 1 en la baldosa.
  const altura = (x: number, y: number) => {
    const dx = Math.min(x % CELDA, CELDA - (x % CELDA)) - JUNTA / 2;
    const dy = Math.min(y % CELDA, CELDA - (y % CELDA)) - JUNTA / 2;
    return Math.min(1, Math.max(0, Math.min(dx, dy) / BISEL));
  };
  const normales = lienzo((c) => {
    const img = c.createImageData(N, N);
    const F = 2.4;
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const nx = (altura(x - 1, y) - altura(x + 1, y)) * F;
        const ny = (altura(x, y + 1) - altura(x, y - 1)) * F;
        const k = 1 / Math.hypot(nx, ny, 1);
        const p = (y * N + x) * 4;
        img.data[p] = (nx * k * 0.5 + 0.5) * 255;
        img.data[p + 1] = (ny * k * 0.5 + 0.5) * 255;
        img.data[p + 2] = (k * 0.5 + 0.5) * 255;
        img.data[p + 3] = 255;
      }
    }
    c.putImageData(img, 0, 0);
  });
  const rugosidad = lienzo((c) => {
    const img = c.createImageData(N, N);
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const v = altura(x, y) > 0.5 ? 38 : 235; // baldosa 0,15 · junta 0,92
        const p = (y * N + x) * 4;
        img.data[p] = img.data[p + 1] = img.data[p + 2] = v;
        img.data[p + 3] = 255;
      }
    }
    c.putImageData(img, 0, 0);
  });

  const tex = (l: HTMLCanvasElement, esColor: boolean) => {
    const t = new THREE.CanvasTexture(l);
    if (esColor) t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  };
  return {
    color: tex(color, true),
    normales: tex(normales, false),
    rugosidad: tex(rugosidad, false),
    // Las mismas imágenes para enseñarlas «planas» en el panel (siempre como color).
    verNormales: tex(normales, true),
    verRugosidad: tex(rugosidad, true),
  };
}

export const texturas: Fabrica = (e) => {
  e.luces({ ambiente: 0.3, sol: 0.9 });
  e.suelo(14, { rejilla: false, color: 0x566175 });
  e.escena.environment = e.entorno();
  e.escena.environmentIntensity = 0.6;
  e.mirar([0, 2.2, 7.2], [0, 1.15, 0]);

  const tx = azulejos();
  const material = new THREE.MeshStandardMaterial({ color: 0x9aa7b8, roughness: 0.5, metalness: 0 });
  const cubo = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), material);
  cubo.position.set(-1.9, 1.3, 0);
  cubo.castShadow = true;

  // El panel: la imagen tal cual, sin luz, con su marco y su rótulo.
  const panelMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 2.1), panelMat);
  panel.position.set(2.1, 1.35, 0);
  const marco = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.PlaneGeometry(2.2, 2.2)),
    new THREE.LineBasicMaterial({ color: e.tema.neutro }),
  );
  panel.add(marco);
  const rotulos = ["la imagen de color", "la imagen de normales", "la imagen de rugosidad"].map((t) => {
    const s = e.etiqueta(t, { alto: 0.3 });
    s.position.set(2.1, 2.75, 0);
    e.escena.add(s);
    return s;
  });

  // Una bombilla que da vueltas: sin luz en movimiento no se ve el relieve.
  const bombilla = new THREE.PointLight(0xfff1d6, 16, 12, 2);
  const bulbo = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 8), new THREE.MeshBasicMaterial({ color: 0xfff1d6 }));
  bombilla.add(bulbo);
  e.escena.add(cubo, panel, bombilla);

  let texto = "";
  return {
    actualizar({ paso, entra, t, dt }) {
      if (entra) {
        material.map = paso >= 1 ? tx.color : null;
        material.normalMap = paso >= 2 ? tx.normales : null;
        material.normalScale.set(1.4, 1.4);
        material.roughnessMap = paso >= 3 ? tx.rugosidad : null;
        material.color.set(paso >= 1 ? 0xffffff : 0x9aa7b8);
        material.roughness = paso >= 3 ? 1 : 0.5;
        material.needsUpdate = true;
        panel.visible = paso >= 1;
        panelMat.map = paso === 1 ? tx.color : paso === 2 ? tx.verNormales : tx.verRugosidad;
        panelMat.needsUpdate = true;
        rotulos.forEach((r, i) => (r.visible = i === paso - 1));
        texto = ["material.color", "material.map", "material.normalMap", "material.roughnessMap"][paso];
      }
      cubo.rotation.y += dt * 0.35;
      bombilla.position.set(-1.9 + 2.4 * Math.cos(t * 0.9), 2.5 + 0.5 * Math.sin(t * 0.6), 2.4 * Math.sin(t * 0.9) + 0.6);
    },
    dato: () => texto,
  };
};
