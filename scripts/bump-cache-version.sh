#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════
# Cache busting para GitHub Pages
#
# Safari/iOS (y el caché de GitHub Pages, ~10 min) pueden servir una
# copia vieja de styles.css / app.js / data.js después de un deploy.
# Este script actualiza el parámetro ?v= de esos tres archivos en
# index.html con la fecha/hora actual (UTC), forzando a los
# navegadores a pedir la versión nueva.
#
# Uso: ./scripts/bump-cache-version.sh   (correr antes de cada commit)
# ═══════════════════════════════════════════════════════════
set -euo pipefail

cd "$(dirname "$0")/.."

FILE="index.html"
VERSION="$(date -u +%Y%m%d%H%M%S)"

if [ ! -f "$FILE" ]; then
  echo "No se encontró $FILE en $(pwd)" >&2
  exit 1
fi

# -i.bak funciona igual en GNU sed (Linux) y BSD sed (macOS); el
# .bak se borra después. Cada regla reemplaza el archivo + un ?v=
# opcional ya existente por el archivo + la versión nueva.
sed -i.bak -E \
  -e "s#(href=\"styles\.css)(\?v=[0-9]+)?\"#\1?v=${VERSION}\"#" \
  -e "s#(src=\"data\.js)(\?v=[0-9]+)?\"#\1?v=${VERSION}\"#" \
  -e "s#(src=\"app\.js)(\?v=[0-9]+)?\"#\1?v=${VERSION}\"#" \
  "$FILE"
rm -f "${FILE}.bak"

echo "✓ Cache-busting actualizado a v=${VERSION} en ${FILE}"
grep -n 'styles\.css?v=\|data\.js?v=\|app\.js?v=' "$FILE"
