var mongoose = require('mongoose')
var Schema   = mongoose.Schema
var bcrypt   = require('bcrypt')

var UserSchema = new Schema(
    {
        username: String,
        password: String,
    }
);

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.isCorrectPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
  }

module.exports = mongoose.model("Users", UserSchema, "users")
