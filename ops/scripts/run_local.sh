#!/bin/bash

export APP_COMMIT=$(git rev-parse HEAD)
npm install
npm run start