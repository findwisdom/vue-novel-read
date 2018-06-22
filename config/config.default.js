'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1490750627161_5967';

  config.middleware = [ 'errorHandler' ];
  
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/novel',
    options: {}
  }
  
  config.security= {
      csrf: {
          enable: false,
          ignoreJSON: true
      },
      domainWhiteList: ['http://localhost:8080']
  }
  config.cors= {
      allowMethods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      credentials: true
  }

  return config;
};
