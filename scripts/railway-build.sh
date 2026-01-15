#!/usr/bin/env bash
set -euo pipefail

# Railway build wrapper: ensure devDependencies are installed during build
export NPM_CONFIG_PRODUCTION=false
echo "NPM_CONFIG_PRODUCTION=$NPM_CONFIG_PRODUCTION"

# Install and build
npm ci --prefer-offline --no-audit
npm run build

echo "Railway build script completed." 
