#!/usr/bin/env bash
# Despliega out/ en el docroot de staging. El sincronizado/borrado lo hace
# rsync EN EL SERVIDOR (rápido). NO toca el WordPress: solo el docroot indicado.
# Uso: bash tools/deploy-staging.sh [docroot]
set -euo pipefail
export MSYS_NO_PATHCONV=1

DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck disable=SC1091
source "$DIR/deploy.env" 2>/dev/null || { echo "Falta tools/deploy.env"; exit 1; }
PROJ="$(cd "$DIR/.." && pwd)"
DOCROOT="${1:-$DOCROOT}"

case "$DOCROOT" in
  *nuevo*|*staging*|*preview*) : ;;
  *) echo "ABORTADO: '$DOCROOT' no parece un docroot de staging."; exit 1 ;;
esac

echo "==> Empaquetando out/ ..."
tar czf /tmp/aeln-out.tgz -C "$PROJ/out" .

echo "==> Subiendo paquete ..."
scp -P "$SSH_PORT" -o BatchMode=yes /tmp/aeln-out.tgz "$HOST:~/aeln-out.tgz"

echo "==> Sincronizando en el servidor (rsync) ..."
ssh -p "$SSH_PORT" -o BatchMode=yes "$HOST" "
  set -e
  rm -rf ~/aeln-stage-tmp && mkdir -p ~/aeln-stage-tmp
  tar xzf ~/aeln-out.tgz -C ~/aeln-stage-tmp
  mkdir -p '$DOCROOT'
  rsync -a --delete --exclude='.htaccess' --exclude='robots.txt' ~/aeln-stage-tmp/ '$DOCROOT/'
  printf 'User-agent: *\nDisallow: /\n' > '$DOCROOT/robots.txt'
  printf 'RewriteEngine Off\nDirectoryIndex index.html\n' > '$DOCROOT/.htaccess'
  rm -rf ~/aeln-out.tgz ~/aeln-stage-tmp
  echo -n 'Ficheros en docroot: '; find '$DOCROOT' -type f | wc -l
"
rm -f /tmp/aeln-out.tgz
echo "==> Hecho."
