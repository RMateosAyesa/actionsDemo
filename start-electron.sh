#!/bin/bash
set -e

export ELECTRON_DISABLE_SANDBOX=true
export DISPLAY=:99

eval `dbus-launch --sh-syntax`
export DBUS_SESSION_BUS_ADDRESS
export DBUS_SESSION_BUS_PID

xvfb-run --auto-servernum --server-args='-screen 0 1280x720x24' \
./app/DevaidStarter_Dev-4.1.1.AppImage \
--no-sandbox \
--disable-gpu \
--disable-software-rasterizer \
--disable-dev-shm-usage