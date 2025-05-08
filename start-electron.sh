#!/bin/bash

ELECTRON_DISABLE_SANDBOX=true \
xvfb-run --auto-servernum --server-args='-screen 0 1280x720x24' \
./app/DevaidStarter_Dev-4.1.1.AppImage --no-sandbox