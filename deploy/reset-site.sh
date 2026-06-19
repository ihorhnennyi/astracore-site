#!/usr/bin/env bash
set -euo pipefail

DOMAIN="astracore.dev"
WWW_DOMAIN="www.astracore.dev"
REPO_URL="https://github.com/ihorhnennyi/astracore-site.git"
APP_DIR="/var/www/astracore-site"
NGINX_AVAILABLE="/etc/nginx/sites-available/astracore.dev"
NGINX_ENABLED="/etc/nginx/sites-enabled/astracore.dev"
BACKUP_DIR="/root/site-backup-$(date +%Y%m%d-%H%M%S)"

if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
  echo "Run as root: sudo bash deploy/reset-site.sh"
  exit 1
fi

echo "==> Backup old web files and nginx configs"
mkdir -p "$BACKUP_DIR/nginx" "$BACKUP_DIR/www"

if [[ -d /etc/nginx/sites-available ]]; then
  cp -a /etc/nginx/sites-available/. "$BACKUP_DIR/nginx/" 2>/dev/null || true
fi

if [[ -d /var/www ]]; then
  cp -a /var/www/. "$BACKUP_DIR/www/" 2>/dev/null || true
fi

echo "Backup saved to: $BACKUP_DIR"

echo "==> Stop conflicting web servers"
for service in apache2 httpd caddy; do
  if systemctl list-unit-files | grep -q "^${service}.service"; then
    systemctl stop "$service" 2>/dev/null || true
    systemctl disable "$service" 2>/dev/null || true
  fi
done

echo "==> Remove ALL old nginx site configs"
rm -f /etc/nginx/sites-enabled/*
rm -f /etc/nginx/sites-available/default
rm -f /etc/nginx/sites-available/000-default.conf
rm -f /etc/nginx/sites-available/default.conf

for config in /etc/nginx/sites-available/*; do
  [[ -e "$config" ]] || continue
  basename="$(basename "$config")"
  if [[ "$basename" != "astracore.dev" ]]; then
    rm -f "$config"
  fi
done

echo "==> Remove old website files"
rm -rf /var/www/html
mkdir -p /var/www/html

for dir in /var/www/*; do
  [[ -d "$dir" ]] || continue
  name="$(basename "$dir")"
  if [[ "$name" != "astracore-site" && "$name" != "html" ]]; then
    echo "Removing old site folder: $dir"
    rm -rf "$dir"
  fi
done

# Explicitly remove legacy folder from previous deployment
rm -rf /var/www/astracore

for dir in /home/*/public_html /home/*/domains/*/public_html; do
  if [[ -d "$dir" ]]; then
    echo "Removing panel site folder: $dir"
    rm -rf "$dir"
  fi
done

echo "==> Install required packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y curl git nginx certbot python3-certbot-nginx

if ! command -v node >/dev/null 2>&1 || [[ "$(node -v | cut -d. -f1 | tr -d v)" -lt 20 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi

echo "==> Deploy new project"
if [[ -d "$APP_DIR/.git" ]]; then
  cd "$APP_DIR"
  git fetch origin
  git reset --hard origin/main
else
  rm -rf "$APP_DIR"
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

npm ci
npm run build

if [[ ! -f "$APP_DIR/dist/index.html" ]]; then
  echo "ERROR: build failed, dist/index.html not found"
  exit 1
fi

echo "==> Configure nginx (only astracore.dev)"
cp "$APP_DIR/deploy/nginx.astracore.dev.conf" "$NGINX_AVAILABLE"
ln -sf "$NGINX_AVAILABLE" "$NGINX_ENABLED"

cat > /etc/nginx/sites-available/000-catch-all.conf <<'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    return 444;
}
EOF

ln -sf /etc/nginx/sites-available/000-catch-all.conf /etc/nginx/sites-enabled/000-catch-all.conf

nginx -t
systemctl enable nginx
systemctl restart nginx

echo "==> SSL certificate"
if [[ ! -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ]]; then
  certbot --nginx \
    -d "$DOMAIN" \
    -d "$WWW_DOMAIN" \
    --non-interactive \
    --agree-tos \
    -m "support@astracore.dev" \
    --redirect
else
  certbot renew --quiet || true
  nginx -t
  systemctl reload nginx
fi

echo "==> Verification"
echo "Nginx root:"
nginx -T 2>/dev/null | awk '/server_name.*astracore.dev/,/^}/' | grep -E 'server_name|root|listen' || true

echo
echo "Local title:"
curl -sk "https://${DOMAIN}" | grep -oE '<title>[^<]+' || true

echo
echo "Done. New site: https://${DOMAIN}"
echo "Old files backup: ${BACKUP_DIR}"
