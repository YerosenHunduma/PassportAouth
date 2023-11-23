const mongoose = require("mongoose");

const userGithubSchema = new mongoose.Schema({
  githubId: String,
  email: String,
  displayName: String,
  name: String,
  pic: String,
});

const UserGithub = mongoose.model("UserGithub", userGithubSchema);

module.exports = UserGithub;
