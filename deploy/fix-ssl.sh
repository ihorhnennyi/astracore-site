#!/usr/bin/env bash
set -euo pipefail

DOMAIN="astracore.dev"
WWW_DOMAIN="www.astracore.dev"
APP_DIR="/var/www/astracore-site"
NGINX_SITE="/etc/nginx/sites-available/astracore.dev"

if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
  echo "Run as root: sudo bash deploy/fix-ssl.sh"
  exit 1
fi

echo "==> Open firewall ports"
apt-get install -y ufw curl
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable || true

echo "==> Ensure project is built"
cd "$APP_DIR"
git pull origin main
npm ci
npm run build

echo "==> Configure nginx HTTP site"
cp "$APP_DIR/deploy/nginx.astracore.dev.conf" "$NGINX_SITE"
ln -sf "$NGINX_SITE" /etc/nginx/sites-enabled/astracore.dev
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl restart nginx

echo "==> Listening ports"
ss -tlnp | grep -E ':80|:443' || echo "WARNING: nginx not listening on 80/443"

echo "==> Issue or renew SSL"
certbot --nginx \
  -d "$DOMAIN" \
  -d "$WWW_DOMAIN" \
  --non-interactive \
  --agree-tos \
  -m "support@astracore.dev" \
  --redirect \
  --force-renewal || certbot --nginx \
  -d "$DOMAIN" \
  -d "$WWW_DOMAIN" \
  --non-interactive \
  --agree-tos \
  -m "support@astracore.dev" \
  --redirect

nginx -t
systemctl reload nginx

echo "==> Test locally"
echo -n "HTTP:  "
curl -sI --max-time 5 "http://${DOMAIN}" | head -1 || echo "failed"
echo -n "HTTPS: "
curl -skI --max-time 5 "https://${DOMAIN}" | head -1 || echo "failed"

echo
echo "==> Nginx SSL config"
nginx -T 2>/dev/null | awk '/server_name.*astracore.dev/,/^}/' | grep -E 'listen|server_name|root|ssl_certificate' || true

echo
echo "If HTTPS still fails, open port 443 in your VPS provider panel (Hostinger/hPanel firewall)."
