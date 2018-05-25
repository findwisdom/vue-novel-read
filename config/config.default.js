'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1490750627161_5967';

  config.middleware = [ 'errorHandler' ];
  
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/book',
    options: {}
  }

  return config;
};
