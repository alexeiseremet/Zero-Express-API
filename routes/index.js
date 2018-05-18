// routes
const router = require('express').Router();
const authRoutes = require('./auth.routes');
const fontRoutes = require('./font.routes');
const accountRoutes = require('./account.routes');

module.exports = function (passport) {
  router.get('/', function (req, res) {
    res.render('index', {user: req.user});
  });

  authRoutes(router, passport);
  fontRoutes(router);
  accountRoutes(router);

  return router;
};
