'use strict';

var version = process.env.APP_VERSION;
var commit = process.env.APP_COMMIT;

const express = require('express');

// Constants
const PORT = 8080;

function getJSON(version,commit){
    return{
        "myaplication": [
            {
                "version": version,
                "lastcommitsha": commit,
                "description": "pre-interview technical test"
            }
        ]
    }
}
// App
const app = express();
app.get('/version', (req, res) => {
  res.json(getJSON(version,commit));
});
app.listen(PORT);
console.log(`Running on port ${PORT}`);