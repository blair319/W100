'use strict';

// had enabled by egg
// exports.static = true;
const path = require('path');
exports.validate = {
    enable: true,
    package: 'egg-validate',
};

// console.log(path.join(__dirname, '../lib/plugin/egg-ws'));
// exports.weex_ws = {
//     enable: true,
//     path: path.join(__dirname, '../lib/plugin/egg-weex-ws'),
// };
// exports.weex_http = {
//     enable: true,
//     path: path.join(__dirname, '../lib/plugin/egg-weex-http'),
// };

// exports.bian = {
//     enable: true,
//     path: path.join(__dirname, '../lib/plugin/egg-bian'),
// };

// exports.huobi = {
//     enable: true,
//     path: path.join(__dirname, '../lib/plugin/egg-huobi'),
// };

// exports.okex = {
//     enable: true,
//     path: path.join(__dirname, '../lib/plugin/egg-okex'),
// };

// exports.ZB = {
//     enable: true,
//     path: path.join(__dirname, '../lib/plugin/egg-ZB'),
// };

//redis config
exports.redis = {
    enable: true,
    package: 'egg-redis'
};

exports.weexWs = {
    enable: true,
    package: 'egg-weex-ws',
};


exports.weexHttps = {
    enable: true,
    package: 'egg-weex-https',
};