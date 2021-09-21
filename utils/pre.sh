#!/usr/bin/env bash
#
# This script assumes a linux environment
# Usage:
#   To be run before running Chromium.js

set -e

cd utils

npm install crx

version=$( cat ver.txt )
build=$(echo $version | cut -d. -f3)

build=$(( $build + 1 ))
version="$(echo $version | cut -d. -f 1,2).$build"

echo $version > ver.txt 

cd ..

git clone https://github.com/FastForwardteam/FastForward.git --depth 1
cd FastForward
bash scripts/chromium.sh nover

cd ..
