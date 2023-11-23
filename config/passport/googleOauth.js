const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserGoogle = require("../../models/UserGoogle");

const Google_Strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:7777/api/users/auth/google/callback",
  },
  async function (accessToken, refreshToken, profile, done) {
    try {
      let user = await UserGoogle.findOne({ googleId: profile.id });
      if (user) {
        done(null, user);
      } else {
        const newUser = new UserGoogle({
          googleId: profile.id,
          name: profile.displayName,
        });
        user = await newUser.save();
        console.log("new user registered");
        done(null, user);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports.Google_Strategy = Google_Strategy;
