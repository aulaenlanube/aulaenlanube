#!/usr/bin/env bash
# CUTOVER A PRODUCCIÓN: publica el sitio estático Next.js en la RAÍZ del dominio
# (public_html), de modo que sea la versión pública. NO borra WordPress: los
# ficheros estáticos se copian ENCIMA (rsync sin --delete) y un .htaccess nuevo
# (RewriteEngine Off + DirectoryIndex index.html index.php) hace que se sirvan
# las páginas estáticas. Así wp-content, /wp-admin, subscribe.php y las
# microwebs heredadas siguen funcionando.
#
# Seguridad/rollback:
#   - Se guarda el .htaccess original en .htaccess.wp-backup (solo la 1ª vez).
#   - WordPress queda intacto y recuperable.
#   - Rollback: bash tools/rollback-production.sh
#
# Uso: bash tools/deploy-production.sh
set -euo pipefail
export MSYS_NO_PATHCONV=1

DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck disable=SC1091
source "$DIR/deploy.env" 2>/dev/null || { echo "Falta tools/deploy.env"; exit 1; }
PROJ="$(cd "$DIR/.." && pwd)"

# Docroot real del dominio (no staging): el padre de /preview-next.
ROOT="${DOCROOT%/preview-next}"
case "$ROOT" in
  *preview-next*|*staging*|*nuevo*) echo "ABORTADO: '$ROOT' parece staging, no la raíz."; exit 1 ;;
  */public_html) : ;;
  *) echo "ABORTADO: '$ROOT' no parece la raíz del dominio (public_html)."; exit 1 ;;
esac

echo "==> 1/4 Compilando PRODUCCIÓN (sin basePath, indexable) ..."
( cd "$PROJ" && BASE_PATH="" STAGING="" npx next build >/tmp/aeln-prod-build.log 2>&1 ) \
  || { echo "BUILD FALLÓ:"; tail -25 /tmp/aeln-prod-build.log; exit 1; }
echo "    build OK"

echo "==> 2/4 Verificando paridad SEO (títulos) ..."
( cd "$PROJ" && node tools/verify-build.mjs 2>/dev/null | tail -1 )

echo "==> 3/4 Empaquetando y subiendo out/ ..."
tar czf /tmp/aeln-prod.tgz -C "$PROJ/out" .
scp -P "$SSH_PORT" -o BatchMode=yes /tmp/aeln-prod.tgz "$HOST:~/aeln-prod.tgz"

echo "==> 4/4 Publicando en la raíz (sin borrar WordPress) ..."
ssh -p "$SSH_PORT" -o BatchMode=yes "$HOST" "
  set -e
  ROOT='$ROOT'
  cd \"\$ROOT\"
  # Backup del .htaccess original (solo la primera vez)
  if [ -f .htaccess ] && [ ! -f .htaccess.wp-backup ]; then cp -p .htaccess .htaccess.wp-backup; echo '   .htaccess original guardado en .htaccess.wp-backup'; fi
  # Desempaquetar el sitio estático en una carpeta temporal y copiarlo ENCIMA
  rm -rf ~/aeln-prod-tmp && mkdir -p ~/aeln-prod-tmp
  tar xzf ~/aeln-prod.tgz -C ~/aeln-prod-tmp
  # rsync SIN --delete: añade/actualiza nuestras páginas, no toca ficheros de WP
  rsync -a --exclude='.htaccess' ~/aeln-prod-tmp/ \"\$ROOT/\"
  # .htaccess de producción: servir estático, con index.php de respaldo (wp-admin)
  printf 'Options +FollowSymLinks\nDirectoryIndex index.html index.php\nRewriteEngine Off\n' > \"\$ROOT/.htaccess\"
  rm -rf ~/aeln-prod.tgz ~/aeln-prod-tmp
  echo -n '   Ficheros en la raíz: '; find \"\$ROOT\" -maxdepth 1 -type d | wc -l
  echo '   robots.txt -> '; head -3 \"\$ROOT/robots.txt\" 2>/dev/null
"
rm -f /tmp/aeln-prod.tgz
echo "==> LISTO ✅  https://aulaenlanube.com/"
