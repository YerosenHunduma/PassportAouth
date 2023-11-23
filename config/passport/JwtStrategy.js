const { User } = require("../../models/User");
const UserGoogle = require("../../models/UserGoogle");
const UserFacebook = require("../../models/UserFacebook");
const UserGithub = require("../../models/UserGithub");
const JwtStrategy = require("passport-jwt").Strategy;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    const bearerToken = req.cookies["token"];
    if (bearerToken && bearerToken.startsWith("Bearer ")) {
      [, token] = bearerToken.split(" ");
    }
  }
  console.log("Token extracted:", token);
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: "secret",
};

const Jwt_strategy = new JwtStrategy(opts, async function (jwt_payload, done) {
  console.log("JWT Payload:", jwt_payload);
  try {
    let UserModel;
    if (jwt_payload.userType === "local") {
      UserModel = User;
    } else if (jwt_payload.userType === "google") {
      UserModel = UserGoogle;
    } else if (jwt_payload.userType === "facebook") {
      UserModel = UserFacebook;
    } else if (jwt_payload.userType === "github") {
      UserModel = UserGithub;
    } else {
      return done(null, false);
    }

    const user = await UserModel.findOne({ _id: jwt_payload.sub });
    if (!user) {
      // Redirect to login page if there's no user
      return done(null, false, { message: "Unauthorized" });
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

module.exports.Jwt_strategy = Jwt_strategy;
