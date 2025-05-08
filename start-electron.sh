#!/bin/bash
set -e

export ELECTRON_DISABLE_SANDBOX=true
export DBUS_SESSION_BUS_ADDRESS=unix:path=/tmp/dbus-fake
export DISPLAY=:99

xvfb-run --auto-servernum --server-args='-screen 0 1280x720x24' \
./app/DevaidStarter_Dev-4.1.1.AppImage \
--no-sandbox \
--disable-gpu \
--disable-software-rasterizer \
--disable-dev-shm-usage \
--no-startup-window
