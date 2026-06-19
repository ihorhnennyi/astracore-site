#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/astracore-site"

cd "$APP_DIR"
git pull origin main
npm ci
npm run build
nginx -t
systemctl reload nginx

echo "Deployed: $(git rev-parse --short HEAD)"
