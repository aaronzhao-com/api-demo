#!/bin/bash
set -euo pipefail

STACKUP_VERSION='1.5.0@sha256:fa1bc4eac1ec9c80a5aca4b3bc420b063c110392413bd89886fd0d8f0c1e94f2'

stackup () {
    docker run --rm -v "`pwd`:/cwd"  -v "$HOME/.aws_${ENV}:/root/.aws" -e AWS_DEFAULT_REGION realestate/stackup:$STACKUP_VERSION "$@"
}

IMAGE=${ACCOUNT}.dkr.ecr.ap-southeast-2.amazonaws.com/api-demo

stackup ${ENV}-api-demo-${STACK} up \
    --preserve-template-formatting \
    --capability CAPABILITY_IAM \
    --capability CAPABILITY_AUTO_EXPAND \
    -t ./ops/cfn/${STACK}.yaml \
    -p ./ops/cfn/params/${ENV}-${STACK}.yaml \
    -o DockerImage=${IMAGE}:${BUILDKITE_BUILD_NUMBER}
    -o AppVersion=${BUILDKITE_BUILD_NUMBER}
    -o AppCommit=${BUILDKITE_COMMIT}
