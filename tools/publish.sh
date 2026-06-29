#!/usr/bin/env bash
# Ciclo completo de publicación: app_content (MySQL) -> JSON -> build -> deploy.
# Vuelca el contenido EN EL SERVIDOR (wp-cli, sin túnel) y baja los JSON por scp.
# Uso: bash tools/publish.sh [docroot]
set -e
export MSYS_NO_PATHCONV=1
DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck disable=SC1091
source "$DIR/deploy.env" 2>/dev/null || { echo "Falta tools/deploy.env"; exit 1; }
cd "$DIR/.."
DOCROOT="${1:-$DOCROOT}"

echo "==> 1/3 Volcando app_content (servidor) -> JSON"
scp -P "$SSH_PORT" -o BatchMode=yes tools/dump-app-content.php "$HOST:~/aeln_dump.php"
ssh -p "$SSH_PORT" -o BatchMode=yes "$HOST" "cd $WP_DIR && wp eval-file ~/aeln_dump.php"
scp -P "$SSH_PORT" -o BatchMode=yes "$HOST:~/aeln-json/*.json" tools/data/
ssh -p "$SSH_PORT" -o BatchMode=yes "$HOST" 'rm -rf ~/aeln_dump.php ~/aeln-json'

echo "==> 2/3 Compilando sitio estático (staging)"
BASE_PATH=/preview-next STAGING=1 npm run build > /tmp/aeln-build.log 2>&1 \
  || { echo "BUILD FALLÓ:"; tail -25 /tmp/aeln-build.log; exit 1; }
echo "    build OK"

echo "==> 3/3 Desplegando a $DOCROOT"
bash tools/deploy-staging.sh "$DOCROOT"

echo "==> LISTO ✅  https://aulaenlanube.com/preview-next/"
