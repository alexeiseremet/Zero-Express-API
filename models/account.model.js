const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');

/** Account model */
let accountSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid Email Address']
  },
  password: String,
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'Principal design'
  }
});

/** Account static methods */
accountSchema.statics = {
  findAll: function (query) {
    return this.find((err, accounts) => {
      if(err) throw err;
      return accounts
    }).exec()
  }
};

accountSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

module.exports = mongoose.model('Account', accountSchema);
