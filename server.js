'use strict';

var version = process.env.APP_VERSION;
var commit = process.env.APP_COMMIT;

console.log(`Version is ${version}`);

const express = require('express');

// Constants
const PORT = 8080;

function getJSON(){
    return{
        "myaplication": [
            {
                "version": $version,
                "lastcommitsha": $commit,
                "description": "pre-interview technical test"
            }
        ]
    }
}
// App
const app = express();
app.get('/version', (req, res) => {
  res.json(getJSON());
});
app.listen(PORT);
console.log(`Running on port ${PORT}`);