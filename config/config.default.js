'use strict';
const path = require('path')
module.exports = appInfo => {
    const config = {};
    // should change to your own
    config.keys = appInfo.name + '_1490750627161_5967';
    config.middleware = ['errorHandler'];
    config.mongoose = {
        url: 'mongodb://127.0.0.1:27017/novel',
        options: {}
    }
    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true
        },
        domainWhiteList: ['http://localhost:8080']
    }
    config.cors = {
        allowMethods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        credentials: true
    }
    // config/default.js
    config.passportGithub = {
        key: '16d5883995ab399ef830', //'your_clientID',
        secret: '60a633c04832f4568c166c8c0736069e0646117e' //'your_clientSecret',
        // callbackURL: '/passport/github/callback',
        // proxy: false,
    };
    
    config.view = {
        mapping: {
            '.html': 'nunjucks',
        },
    };
    
    config.static = {
        prefix: '/',
        dir: path.join(appInfo.baseDir, 'app/public')
    };
    return config;
};
