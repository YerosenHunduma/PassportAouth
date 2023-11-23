const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../../models/User");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const VerifiedUser = (email, password, done) => {
  User.findOne({ email: email })
    .then(async (user) => {
      if (!user) {
        return done(null, false, { message: "Unknown user" });
      }
      try {
        const isMatch = await bcrypt.compare(password, user.hash);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Either the Email or password you entered is incorrect",
          });
        }
      } catch (error) {
        return done(error);
      }
    })
    .catch((err) => done(err));
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

const local = new LocalStrategy(customFields, VerifiedUser);

module.exports = { local };
