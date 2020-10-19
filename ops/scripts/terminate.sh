#!/bin/bash
set -euo pipefail

STACKUP_VERSION='1.5.0@sha256:fa1bc4eac1ec9c80a5aca4b3bc420b063c110392413bd89886fd0d8f0c1e94f2'

stackup () {
    docker run --rm -v "`pwd`:/cwd"  -v "$HOME/.aws_${ENV}:/root/.aws" -e AWS_DEFAULT_REGION realestate/stackup:$STACKUP_VERSION "$@"
}

stackup ${ENV}-api-demo-${STACK} delete