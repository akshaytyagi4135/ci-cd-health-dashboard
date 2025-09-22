#!/bin/bash
set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y docker.io docker-compose-plugin git

systemctl enable docker
systemctl start docker

if id "${linux_user}" &>/dev/null; then
  usermod -aG docker "${linux_user}" || true
fi

APP_DIR="/opt/${project_name}"
REPO_DIR="${APP_DIR}/app"

mkdir -p "${APP_DIR}"
cd "${APP_DIR}"

if [ ! -d "${REPO_DIR}" ]; then
  git clone --branch "${app_branch}" "${app_repo_url}" app
else
  cd "${REPO_DIR}"
  git fetch origin "${app_branch}"
  git reset --hard "origin/${app_branch}"
  cd "${APP_DIR}"
fi

cd "${REPO_DIR}"

cat <<'EOCONFIG' > .env
${app_env_content}
EOCONFIG

chown -R "${linux_user}:${linux_user}" "${APP_DIR}" || true

/usr/bin/docker compose down --remove-orphans || true
/usr/bin/docker compose pull || true
/usr/bin/docker compose up -d --build
