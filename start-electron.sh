#!/bin/bash
set -e

# Desactivar el sandbox de Electron y establecer display
export ELECTRON_DISABLE_SANDBOX=true
export DISPLAY=:99

# Inicializar D-Bus y obtener las variables necesarias
eval $(dbus-launch --sh-syntax)
export DBUS_SESSION_BUS_ADDRESS
export DBUS_SESSION_BUS_PID

# Iniciar la app de Electron con xvfb en segundo plano
xvfb-run --auto-servernum --server-args='-screen 0 1280x720x24' \
  ./app/DevaidStarter_Dev-4.1.1.AppImage \
  --no-sandbox \
  --disable-gpu \
  --disable-software-rasterizer \
  --disable-dev-shm-usage &

# Esperar unos segundos para asegurar que la app ha arrancado
sleep 5
