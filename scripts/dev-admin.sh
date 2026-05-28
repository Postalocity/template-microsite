#!/usr/bin/env bash
# scripts/dev-admin.sh
# Wrapper to start internal-admin Next.js dev server with workaround for
# Node v25.6.1 + Next 15.3.0 localStorage SSR crash in dev overlay.
#
# Root cause: npm exec --workspace spawn (or env) provides --localstorage-file
# without valid path to Node 25, causing a non-functional localStorage global
# (typeof object but .getItem not a function). Next's internal
# react-dev-overlay dev-tools-indicator/preferences code (getInitialPosition etc.)
# has only a weak `typeof localStorage !== 'undefined'` guard and crashes on
# .getItem during SSR of every page (incl. error/document renders) in dev.
#
# This disables the experimental feature for the dev server process only.
# Overlay user prefs (scale/position/theme) won't persist across restarts
# but that's acceptable for dev; no impact on prod or app logic.

set -euo pipefail

echo "==> Starting internal-admin dev server (Node 25+ localStorage workaround)..."

# Prepend flag so that the node processes started for `next` (via npm exec in workspace)
# launch without experimental-webstorage. This makes localStorage absent on server.
export NODE_OPTIONS="--no-experimental-webstorage${NODE_OPTIONS:+ $NODE_OPTIONS}"

echo "==> NODE_OPTIONS effective: $NODE_OPTIONS"
echo "==> Command: npm exec --workspace=internal-admin -- next dev $*"

exec npm exec --workspace=internal-admin -- next dev "$@"
