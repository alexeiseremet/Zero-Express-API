const config = require('./config');
const Account = require('./models/account.model');

/** Local strategy */
const LocalStrategy = require('passport-local').Strategy;

/** Facebook strategy */
const FacebookStrategy = require('passport-facebook').Strategy;
const facebook = new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: 'http://localhost:3003/login/facebookcb',
    profileFields: ['id', 'displayName', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
);


module.exports = function (passport) {
  passport.use(Account.createStrategy());

  passport.serializeUser(Account.serializeUser());
  passport.deserializeUser(Account.deserializeUser());
};
