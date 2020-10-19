'use strict';
​
module.exports.appName = process.env.APP_NAME || 'myapplication';
module.exports.version = process.env.APP_VERSION || '';
module.exports.lastCommitSha = process.env.APP_COMMIT || '';
module.exports.description = process.env.DESCRIPTION || '';
module.exports.port = process.env.NODE_ENV === 'test' ? 8080 : 3000;