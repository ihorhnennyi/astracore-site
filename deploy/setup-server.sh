#!/usr/bin/env bash
set -euo pipefail

DOMAIN="astracore.dev"
REPO_URL="https://github.com/ihorhnennyi/astracore-site.git"
APP_DIR="/var/www/astracore-site"
NGINX_SITE="/etc/nginx/sites-available/astracore.dev"

echo "==> Updating system packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get upgrade -y

echo "==> Installing base packages"
apt-get install -y curl git nginx certbot python3-certbot-nginx

if ! command -v node >/dev/null 2>&1 || [[ "$(node -v | cut -d. -f1 | tr -d v)" -lt 20 ]]; then
  echo "==> Installing Node.js 22"
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi

echo "==> Node $(node -v), npm $(npm -v)"

echo "==> Preparing app directory"
mkdir -p /var/www
if [[ -d "$APP_DIR/.git" ]]; then
  cd "$APP_DIR"
  git pull origin main
else
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

echo "==> Installing dependencies and building"
npm ci
npm run build

echo "==> Configuring nginx"
cp "$APP_DIR/deploy/nginx.astracore.dev.conf" "$NGINX_SITE"
ln -sf "$NGINX_SITE" /etc/nginx/sites-enabled/astracore.dev
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable nginx
systemctl restart nginx

echo "==> Requesting SSL certificate"
certbot --nginx \
  -d "$DOMAIN" \
  -d "www.$DOMAIN" \
  --non-interactive \
  --agree-tos \
  --register-unsafely-without-email \
  --redirect

echo "==> Done"
echo "Site should be live at https://$DOMAIN"
