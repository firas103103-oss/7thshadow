#!/usr/bin/env bash
set -euo pipefail

# Railway build wrapper: ensure devDependencies are installed during build
export NPM_CONFIG_PRODUCTION=false
echo "NPM_CONFIG_PRODUCTION=$NPM_CONFIG_PRODUCTION"

# Install and build (skip if already done in install phase)
if [ ! -d "dist" ]; then
  npm run build
else
  echo "Build artifacts already exist, skipping build"
fi

echo "Railway build script completed." 
