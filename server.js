'use strict';

const bodyParser = require('body-parser');
const app = require('express')();
const { appName, version, lastCommitSha, description, port } = require('./config');

app.listen(port);
app.use(bodyParser.json());

const buildAndReturnVersionPayload = (req, res) => {
  const payload = {
    [appName]: [{
      version,
      lastcommitsha: lastCommitSha,
      description
    }]
  };

  return res.json(payload);
};

app.get('/version', buildAndReturnVersionPayload);

module.exports = { app };
