// Paso 3b (RGPD): monta PAQUETES ANONIMIZADOS para que Opus corriente sin ver
// datos del alumnado. Cada alumno pendiente de una entrega recibe un código
// Axx y una carpeta .campus-trabajo/opus-anon/paquetes/Axx/ con:
//   repo/           copia del clon SIN .git, sin binarios/imagenes, con los
//                   identificadores personales sustituidos por [NOMBRE]/[CORREO]/[USUARIO]/[WEB]/[REPO]
//   evidencias.json la evidencia de analizar-repos.mjs sin campos de identidad
//   paquete.json    {codigo, titulo, rubrica, tipo}
// El mapa codigo → alumno queda SOLO en opus-anon/mapa.json (este equipo).
// Idempotente: solo crea paquetes de alumnos que aún no tengan código en esa
// entrega.  Uso: node tools/campus/anonimizar-opus.mjs --entrega 2
import fs from "node:fs";
import path from "node:path";
import { arg, TRABAJO } from "./_bd.mjs";

const ENTREGA = Number(arg("entrega"));
if (!ENTREGA) { console.error("uso: node tools/campus/anonimizar-opus.mjs --entrega <id>"); process.exit(1); }

const DIR = path.join(TRABAJO, `entrega-${ENTREGA}`);
const ANON = path.join(TRABAJO, "opus-anon");
const PAQ = path.join(ANON, "paquetes");
fs.mkdirSync(PAQ, { recursive: true });

const datos = JSON.parse(fs.readFileSync(path.join(DIR, "entregas.json"), "utf8"));
const mapaFile = path.join(ANON, "mapa.json");
const mapa = fs.existsSync(mapaFile) ? JSON.parse(fs.readFileSync(mapaFile, "utf8")) : {};
const yaConCodigo = new Set(Object.entries(mapa).filter(([, m]) => m.entrega === ENTREGA).map(([, m]) => m.usuario));
let next = Object.keys(mapa).reduce((mx, k) => Math.max(mx, Number(k.slice(1)) || 0), 0);

const BIN = /(^|\/)(\.git|node_modules|dist|build|\.next)\//;
const IMG = /\.(png|jpe?g|webp|gif|ico|avif|mp4|webm|pdf|zip|woff2?|ttf|eot)$/i;

function sustituciones(ev) {
  const s = [];
  const add = (from, to) => { if (from && from.length >= 3) s.push([from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), to]); };
  add(ev.usuario, "[USUARIO]");
  const correo = ev.usuario.includes("@") ? ev.usuario : ev.correo;
  add(correo, "[CORREO]");
  if (correo && correo.includes("@")) add(correo.split("@")[0], "[USUARIO]");
  if (ev.nombre) {
    add(ev.nombre, "[NOMBRE]");
    for (const p of ev.nombre.split(/[\s,]+/)) if (p.length >= 4) {
      add(p, "[NOMBRE]"); add(p.toLowerCase(), "[NOMBRE]"); add(p.charAt(0) + p.slice(1).toLowerCase(), "[NOMBRE]");
      const sinTilde = p.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (sinTilde !== p) { add(sinTilde, "[NOMBRE]"); add(sinTilde.charAt(0) + sinTilde.slice(1).toLowerCase(), "[NOMBRE]"); }
    }
  }
  if (ev.web?.url) { try { add(new URL(ev.web.url).hostname, "[WEB]"); } catch {} add(ev.web.url, "[WEB]"); }
  if (ev.repo) {
    add(ev.repo, "[REPO]");
    const m = ev.repo.match(/github\.com\/([^/]+)/); if (m) { add(m[1], "[USUARIO]"); add(m[1].toLowerCase(), "[USUARIO]"); }
  }
  return s;
}
// Sustitución sensible a mayúsculas + correos de TERCEROS borrados en bloque.
const CORREOS = /[\w.+-]+@[\w-]+\.[\w.-]+/g;
function limpiar(txt, sus) {
  for (const [de, a] of sus) txt = txt.replace(new RegExp(de, "gi"), a);
  txt = txt.replace(/https?:\/\/(?:www\.)?github\.com\/[\w.-]+\/[\w.-]+/gi, "[REPO]");
  txt = txt.replace(CORREOS, "[CORREO]");
  return txt;
}

let creados = 0;
for (const ev of datos.envios) {
  if (yaConCodigo.has(ev.usuario)) continue;
  const evFile = path.join(DIR, "evidencias", ev.usuario + ".json");
  if (!fs.existsSync(evFile)) { console.log(`  sin evidencias: ${ev.usuario}`); continue; }
  const sus = sustituciones(ev);
  const cod = `A${String(++next).padStart(2, "0")}`;
  const base = path.join(PAQ, cod);
  fs.rmSync(base, { recursive: true, force: true });
  fs.mkdirSync(path.join(base, "repo"), { recursive: true });

  // 1) repo anonimizado (sin imágenes ni binarios)
  const clon = path.join(DIR, "repos", ev.usuario);
  let n = 0;
  if (fs.existsSync(clon)) {
    (function walk(d, pref) {
      for (const e of fs.readdirSync(path.join(d), { withFileTypes: true })) {
        const p = path.join(d, e.name), rp = pref + e.name;
        if (BIN.test("/" + rp) || e.name === ".git") continue;
        const st = fs.statSync(p);
        if (st.isDirectory()) { fs.mkdirSync(path.join(base, "repo", rp), { recursive: true }); walk(p, rp + "/"); }
        else if (IMG.test(e.name)) continue; // sin imágenes (pueden llevar cara/matricula)
        else if (st.size > 500000) fs.writeFileSync(path.join(base, "repo", rp), `$(fichero grande omitido: ${e.name})`);
        else {
          try { fs.writeFileSync(path.join(base, "repo", rp), limpiar(fs.readFileSync(p, "utf8"), sus)); n++; }
          catch { /* binario: fuera */ }
        }
      }
    })(clon, "");
  }

  // 2) evidencias sin identidad (PERO conservando la MEDICIÓN de la web: HTTP,
  //    consola, móvil, contacto — sin URL; si no, Opus no ve la prueba de producción)
  const evj = JSON.parse(fs.readFileSync(evFile, "utf8"));
  for (const k of ["alumno_id", "usuario", "nombre", "correo", "repo", "captura", "capturas", "entregado_por"]) delete evj[k];
  if (evj.web?.url) delete evj.web.url;
  if (evj.web?.title) evj.web.title = "[WEB]";
  const evTxt = limpiar(JSON.stringify(evj, null, 1), sus);
  fs.writeFileSync(path.join(base, "evidencias.json"), evTxt);

  fs.writeFileSync(path.join(base, "paquete.json"), JSON.stringify({
    codigo: cod, entrega_id: ENTREGA, titulo: datos.entrega?.titulo ?? `Entrega ${ENTREGA}`,
    rubrica: datos.entrega?.rubrica ?? "web-marca", ficheros_repo: n,
  }, null, 1));

  mapa[cod] = { entrega: ENTREGA, usuario: ev.usuario };
  creados++;
  console.log(`  ${cod} ← paquete anonimizado (${n} ficheros)`);
}
fs.writeFileSync(mapaFile, JSON.stringify(mapa, null, 1));
console.log(`✓ ${creados} paquetes nuevos · mapa en ${path.relative(TRABAJO, mapaFile)} (SOLO este equipo)`);
