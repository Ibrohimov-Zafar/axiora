#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/axiora"
HEALTH_URL="http://127.0.0.1:8088/api/health"
MAX_ATTEMPTS=30

cd "$APP_DIR"

echo "==> Git yangilanmoqda..."
git fetch origin
git reset --hard origin/main

if [ ! -f .env ]; then
  echo "XATO: .env topilmadi. Serverda $APP_DIR/.env yarating."
  exit 1
fi

echo "==> Docker build va ishga tushirish..."
docker compose down
docker compose up -d --build

echo "==> Health check kutilmoqda..."
for i in $(seq 1 "$MAX_ATTEMPTS"); do
  if curl -sf "$HEALTH_URL" > /dev/null; then
    echo "OK: $HEALTH_URL"
    break
  fi
  if [ "$i" -eq "$MAX_ATTEMPTS" ]; then
    echo "XATO: Health check muvaffaqiyatsiz"
    docker compose ps
    docker compose logs --tail=80
    exit 1
  fi
  sleep 2
done

if [ -d /etc/nginx/sites-available ]; then
  echo "==> Host nginx yangilanmoqda..."
  cp deploy/nginx-host.conf /etc/nginx/sites-available/axiora-team.com
  ln -sf /etc/nginx/sites-available/axiora-team.com /etc/nginx/sites-enabled/axiora-team.com
  nginx -t
  systemctl reload nginx
fi

echo "==> Eski imagelar tozalanmoqda..."
docker image prune -f

echo "==> Deploy tugallandi"
