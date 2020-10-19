'use strict';

var version = process.env.BUILDKITE_BUILD_NUMBER;
var commit = process.env.BUILDKITE_COMMIT;

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();
app.get('/', (req, res) => {
  res.json({"myapplication": [{"version": version,"lastcommitsha": commit, "description": "pre-interview techinal test"}]});
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);