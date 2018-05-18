const config = require('./config');
const Account = require('./models/account.model');

/** Local strategy */
const LocalStrategy = require('passport-local').Strategy;
const local = new LocalStrategy({
    usernameField: 'email',
    passReqToCallback : true
  },
  function (req, email, password, done) {
    Account.findOne({email})
      .then(account => {
        if (!account || !account.validPassword(password)) {
          done(null, false, {message: "Invalid username/password"});
        } else {
          done(null, account);
        }
      })
      .catch(err => done(err));
  });

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
  passport.use('local', local);
  passport.use('facebook', facebook);

  passport.serializeUser(function (account, done) {
    done(null, account._id)
  });

  passport.deserializeUser(function (id, done) {
    Account.findById(id, (err, account) => done(err, account));
  });
};
