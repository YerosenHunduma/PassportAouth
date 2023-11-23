const jsonwebtoken = require("jsonwebtoken");

function issueJWT(user, userType) {
  const _id = user._id;
  const expiresIn = "1d";
  const payload = {
    sub: _id,
    iat: Date.now(),
    userType,
  };
  const signedToken = jsonwebtoken.sign(payload, "secret", {
    expiresIn: expiresIn,
  });
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

module.exports.issueJWT = issueJWT;
