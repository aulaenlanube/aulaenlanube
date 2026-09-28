#!/usr/bin/env bash
# Entorno local del campus (Docker): MariaDB + PHP 8.2 sirviendo out/.
# Uso:
#   bash tools/campus/dev.sh up      # compila (si falta out/) y arranca → http://127.0.0.1:8088/programacion-ia/acceso/
#   bash tools/campus/dev.sh build   # recompila el sitio (next build) sin tocar la BD
#   bash tools/campus/dev.sh down    # para y BORRA la BD de pruebas
#   bash tools/campus/dev.sh sql     # consola SQL de la BD de pruebas
# Profesor de pruebas: profe / profe-local-123
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
PROJ="$(cd "$DIR/../.." && pwd)"
COMPOSE=(docker compose -f "$DIR/dev/docker-compose.yml")

case "${1:-up}" in
  up)
    [ -f "$PROJ/out/index.html" ] || (cd "$PROJ" && pnpm exec next build)
    mkdir -p "$PROJ/out/campus-api"  # punto de montaje de la API en vivo
    "${COMPOSE[@]}" up -d --build --wait
    echo "Campus local: http://127.0.0.1:8088/programacion-ia/acceso/  (profe / profe-local-123)"
    ;;
  build) (cd "$PROJ" && pnpm exec next build) ;;
  down) "${COMPOSE[@]}" down -v ;;
  sql) "${COMPOSE[@]}" exec db mariadb -ucampus -pcampus-local campus_dev ;;
  *) echo "Uso: $0 up|build|down|sql"; exit 1 ;;
esac
