module.exports = function (router, passport) {
  /** Login view */
  router.get("/login", (req, res) => {
    if (req.isUnauthenticated()) {
      res.render("login");
    }
    else res.redirect("/");
  });

  /** Login handler */
  router.post("/login", passport.authenticate("local", {
      successRedirect: "/accounts",
      failureRedirect: "/login",
      failureFlash   : true
    })
  );

  /** Facebook login handler */
  router.get("/login/facebook", passport.authenticate("facebook"));

  /** Facebook callback handler */
  router.get("/login/facebookcb", passport.authenticate('facebook', {
      successRedirect: '/accounts',
      failureRedirect: '/login'
    })
  );

  /** Logout */
  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
};


