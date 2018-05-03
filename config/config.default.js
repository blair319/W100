'use strict';

module.exports = appInfo => {
  const config = exports = {

  };
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 加载 errorHandler 中间件
  config.middleware = ['errorHandler'];

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1524152383762_782';

  // add your config here
  // config.middleware = [];
  config.weexurl = "https://wwwapp.weex.com:8443/";

  config.wsurl = "ws://ws.weexpro.com";


  return config;
};


