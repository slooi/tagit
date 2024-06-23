#!/bin/bash

if [ "$1" = "c" ]; then
    npm run --prefix apps/extension chokidar_content_scripts
elif [ "$1" = "n" ]; then
    npm run --prefix apps/extension chokidar_normal
else
    npm run --prefix apps/extension chokidar
fi