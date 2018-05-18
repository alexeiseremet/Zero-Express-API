const Account = require('../models/account.model');

module.exports = function (router) {
  /** Accounts view */
  router.get("/accounts", (req, res, next) => {
    if (req.isAuthenticated()) {
      let query = req.query || {};

      Account.findAll(query)
        .then(accounts => {
          res.render('accounts', {accounts: accounts, user: req.user});
        })
        .catch(err => {
          next(err);
        });
    }
    else res.redirect("/login");
  });
};


