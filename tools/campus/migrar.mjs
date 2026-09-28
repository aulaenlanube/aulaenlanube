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
  const [tablas] = await db.query("SHOW TABLES LIKE 'app\\_campus\\_%'");
  const [[{ n }]] = await db.query("SELECT COUNT(*) n FROM app_campus_entregas");
  console.log(`Tablas del campus: ${tablas.map((t) => Object.values(t)[0]).join(", ")}`);
  console.log(`Entregas: ${n}`);
} finally {
  await db.end();
}
