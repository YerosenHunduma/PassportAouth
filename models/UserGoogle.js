const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  name: String,
});

module.exports = mongoose.model("UserGoogle", userSchema);
