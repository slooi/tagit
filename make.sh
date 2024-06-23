#!/bin/bash

if [ "$1" = "ec" ]; then
    npm run --prefix apps/extension chokidar_content_scripts
elif [ "$1" = "en" ]; then
    npm run --prefix apps/extension chokidar_normal
elif [ "$1" = "e" ]; then
    npm run --prefix apps/extension chokidar
elif [ "$1" = "s" ]; then
    npm run --prefix apps/extensionServer dev
fi