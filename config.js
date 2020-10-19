'use strict';

module.exports.appName = process.env.APP_NAME || 'myapplication';
module.exports.version = process.env.APP_VERSION || '';
module.exports.lastCommitSha = process.env.APP_COMMIT || '';
module.exports.description = process.env.DESCRIPTION || 'pre-interview technical test';
module.exports.port = process.env.NODE_ENV === 'test' ? 3000 : 8080;
