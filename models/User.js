const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  hash: String,
  salt: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
