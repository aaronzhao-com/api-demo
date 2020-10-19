#!/bin/bash
set -euo pipefail

IMAGE=${ACCOUNT}.dkr.ecr.ap-southeast-2.amazonaws.com/api-demo
appImage="${IMAGE:=api-demo}:${BUILDKITE_BUILD_NUMBER:=latest}"

eval $(aws ecr get-login --registry-ids ${ACCOUNT} --region ap-southeast-2 --no-include-email --profile personal_prod)
docker push $appImage
