#!/usr/bin/env bash
#
# This script assumes a linux environment
# Usage:
#   To be run after running Chromium.js

rm          utils/key.pem
rm -rf      utils/node_modules/
rm -rf      FastForward/

cp update/FastForward.crx /tmp/

version=$( cat utils/ver.txt )

mv /tmp/FastForward.crx "./rels/FastForward$version.crx"
