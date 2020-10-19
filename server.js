'use strict';

var version = process.env.APP_VERSION;
var commit = process.env.APP_COMMIT;

console.log(`Version is ${version}`);

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();
app.get('/version', (req, res) => {
  res.send(`version is ${version}`);
});
app.listen(PORT);
console.log(`Running on port ${PORT}`);