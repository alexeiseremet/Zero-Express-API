/** Config */
const config = require('./config');

/** Mongoose */
const mongoose = require('mongoose');

/** Server */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require("cookie-session");
const passport = require('passport');

/** Create server */
const app = express();

/** Session */
app.use(cookieParser());
app.use(cookieSession({keys: ['Hello World']}));
app.use(require('flash')());

/** View engine */
app.set('views', './views');
app.set('view engine', 'pug');

/** Assets */
app.use(express.static('assets'));

/** Post data */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Init passport */
app.use(passport.initialize());
app.use(passport.session());
require('./passport')(passport);

/** Require routes */
app.use("/", require("./routes")(passport));

/** Catch 404 errors */
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/** Init server & database */
app.listen(config.port, (err) => {
  if (err) process.exit(1);

  mongoose.connect(config.db, (err, db) => {
    if (err) {
      throw err;
    }
    console.log(`Server is listening on port ${config.port}.`);
  });
});


