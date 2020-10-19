#!/bin/bash
set -euo pipefail

hash docker 2>/dev/null || die "missing docker dependency"

IMAGE=${ACCOUNT}.dkr.ecr.ap-southeast-2.amazonaws.com/api-demo

appImage="${IMAGE:=api-demo}:${BUILDKITE_BUILD_NUMBER:=latest}"

echo "--- Build and publish app image"

docker build -t $appImage $(pwd) || die "failed building docker image"
