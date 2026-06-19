#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/astracore-site"
DOMAIN="astracore.dev"

echo "==> DNS"
dig +short "$DOMAIN" A || true

echo
echo "==> Nginx site root"
nginx -T 2>/dev/null | awk '/server_name.*astracore.dev/,/^}/' | grep -E 'server_name|root|listen' || true

echo
echo "==> Built files"
ls -la "$APP_DIR/dist/index.html" || echo "dist/index.html missing"
head -n 22 "$APP_DIR/dist/index.html" | grep -E '<title>|favicon' || true

echo
echo "==> Live response"
curl -s "https://$DOMAIN" | grep -oE '<title>[^<]+' || true

echo
echo "==> Old default site (should be absent)"
if [[ -f /var/www/html/index.html ]]; then
  echo "WARNING: /var/www/html/index.html still exists"
  head -n 5 /var/www/html/index.html
else
  echo "OK: no /var/www/html/index.html"
fi
