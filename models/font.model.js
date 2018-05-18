const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

/** Font model */
let fontSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  likes: {type: Number, default: 0},
});

/** Font public methods */
fontSchema.methods = {
  like: function () {
    this.likes++;
    return this.save();
  }
};

/** Font static methods */
fontSchema.statics = {
  findAll: function (query) {
    return this.find((err, fonts) => {
      if(err) throw err;
      return fonts
    }).exec()
  }
};

module.exports = mongoose.model('Font', fontSchema);
