const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  facebookId: String,
  email: String,
  displayName: String,
  name: String,
  pic: String,
});

module.exports = mongoose.model("UserFacebook", userSchema);
