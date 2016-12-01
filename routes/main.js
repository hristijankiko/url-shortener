let ctrl = require('../controllers/main');

module.exports = function(app) {
  app.get('/', ctrl.homepage);
  app.get('/new/*', ctrl.createLink);
  app.get('/:shorturl', ctrl.redirectToLink);
};