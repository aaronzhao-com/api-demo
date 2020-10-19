'use strict';

var version = process.env.BUILDKITE_BUILD_NUMBER;
ver commit = process.env.BUILDKITE_COMMIT;

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.json("myapplication":[{"version": version,"lastcommitsha": commit, "description: pre-interview techinal test"}]);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);