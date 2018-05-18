const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator');

/** Account model */
let accountSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid Email Address']
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  role: String
});

/** Account public methods */
accountSchema.methods = {
  validPassword: function(password) {
    return bcrypt.compareSync(password, this.password);
  }
};

/** Account static methods */
accountSchema.statics = {
  findAll: function (query) {
    return this.find((err, accounts) => {
      if(err) throw err;
      return accounts
    }).exec()
  }
};

accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', accountSchema);
