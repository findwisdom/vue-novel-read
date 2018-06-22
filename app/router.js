'use strict';

/**
 * @param {Egg.Application} app - egg application
 */


module.exports = app => {
  const { router, controller } = app;
  router.resources('topics', '/api/v2/topics', 'topics');
  router.resources('novelinfo', '/api/booklist', 'novelinfo');
  router.resources('novelread', '/api/bookread', 'novelread');
  router.get('/crawel', controller.crawel.index);
  router.get('/alimit', controller.crawel.aLimit)
};
