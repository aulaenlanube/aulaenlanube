// Crea (o completa) las tablas del campus y las entregas iniciales.
// Idempotente: CREATE TABLE IF NOT EXISTS + INSERT solo si no existe.
//   node tools/campus/migrar.mjs            → producción (túnel SSH)
//   node tools/campus/migrar.mjs --local    → BD de pruebas de Docker

import fs from "node:fs";
import path from "node:path";
import { conectar, destino } from "./_bd.mjs";

const db = await conectar();
try {
  for (const f of ["schema.sql", "semilla.sql"]) {
    await db.query(fs.readFileSync(path.join(import.meta.dirname, f), "utf8"));
    console.log(`✓ ${f} aplicado en la ${destino()}`);
  }
  // Columnas añadidas después de crear las tablas (CREATE TABLE IF NOT EXISTS no las añade).
  const [col] = await db.query("SHOW COLUMNS FROM app_campus_notas LIKE 'correcciones'");
  if (!col.length) {
    await db.query("ALTER TABLE app_campus_notas ADD COLUMN correcciones MEDIUMTEXT NULL AFTER nota_privada");
    console.log("✓ app_campus_notas.correcciones añadida");
  }
  const [eq] = await db.query("SHOW COLUMNS FROM app_campus_entregas LIKE 'en_equipo'");
  if (!eq.length) {
    await db.query("ALTER TABLE app_campus_entregas ADD COLUMN en_equipo TINYINT(1) NOT NULL DEFAULT 0 AFTER visible");
    console.log("✓ app_campus_entregas.en_equipo añadida");
  }
  const [por] = await db.query("SHOW COLUMNS FROM app_campus_envios LIKE 'entregado_por'");
  if (!por.length) {
    await db.query("ALTER TABLE app_campus_envios ADD COLUMN entregado_por INT UNSIGNED NULL AFTER fuera_plazo");
    console.log("✓ app_campus_envios.entregado_por añadida");
  }
  const [tablas] = await db.query("SHOW TABLES LIKE 'app\\_campus\\_%'");
  const [[{ n }]] = await db.query("SELECT COUNT(*) n FROM app_campus_entregas");
  console.log(`Tablas del campus: ${tablas.map((t) => Object.values(t)[0]).join(", ")}`);
  console.log(`Entregas: ${n}`);
} finally {
  await db.end();
}
