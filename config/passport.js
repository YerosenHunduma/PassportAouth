const passport = require("passport");
const { local } = require("./passport/local");
const { Jwt_strategy } = require("./passport/JwtStrategy");
const { Google_Strategy } = require("./passport/googleOauth");
const { Facebook_Strategy } = require("./passport/facebookStrategy");
const { GitHub_Strategy } = require("./passport/githubStrategy");

passport.use(local);
passport.use(Jwt_strategy);
passport.use(Google_Strategy);
passport.use(Facebook_Strategy);
passport.use(GitHub_Strategy);
