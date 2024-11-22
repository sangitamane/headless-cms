#!/usr/bin/env bash

set -xeuo pipefail
IFS=$'\n\t'

# use halfpipe cache dir if present
[[ -d "/var/halfpipe/cache" ]] && export npm_config_cache="/var/halfpipe/cache/.npm"
[[ -d "/var/halfpipe/shared-cache" ]] && export npm_config_cache="/var/halfpipe/shared-cache/.npm"

nvm use
npm ci