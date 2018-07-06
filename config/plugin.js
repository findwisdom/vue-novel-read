'use strict';

// had enabled by egg
// exports.static = true;
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.mongoose = {
    enable: true,
    package: 'egg-mongoose',
};

exports.cors = {
    enable: true,
    package: 'egg-cors',
};

exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks',
};

exports.passport = {
    enable: true,
    package: 'egg-passport',
};

exports.passportGithub = {
    enable: true,
    package: 'egg-passport-github',
};
