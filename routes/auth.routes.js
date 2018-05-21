const Account = require('../models/account.model');

module.exports = function (router, passport) {
  /** Login view */
  router.get("/login", (req, res) => {
    if (req.isUnauthenticated()) {
      res.render("login");
    }
    else res.redirect("/accounts");
  });

  /** Login handler */
  router.post("/login", passport.authenticate("local", {
    successRedirect:"/accounts",
    failureRedirect:"/login"
  }));

  /** Facebook login handler */
  router.get("/login/facebook", passport.authenticate("facebook"));

  /** Facebook callback handler */
  router.get("/login/facebookcb", passport.authenticate('facebook', {
      successRedirect: '/accounts',
      failureRedirect: '/login'
    })
  );

  /** Register view */
  router.get("/register", (req, res) => {
    if (req.isUnauthenticated()) {
      res.render("register");
    }
    else res.redirect("/accounts");
  });

  /** Register handler */
  router.post("/register", function(req, res){
    Account.register(new Account({
        email: req.body.email,
        name: req.body.name,
        role: req.body.role
      }),
      req.body.password, function(err, user){
        if(err){
          return res.render('register', {err: err});
        }
        passport.authenticate("local")(req, res, function(){
          res.redirect("/accounts");
        });
      });
  });

  /** Logout */
  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
};


