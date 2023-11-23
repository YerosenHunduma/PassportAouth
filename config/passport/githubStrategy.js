const GitHubStrategy = require("passport-github2").Strategy;
const UserGithub = require("../../models/UserGithub");

const GitHub_Strategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:7777/api/users/auth/github/callback",
  },
  async function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    try {
      let user = await UserGithub.findOne({ githubId: profile.id });
      if (user) {
        done(null, user);
      } else {
        const newUser = new UserGithub({
          githubId: profile.id,
          email: profile._json.email,
          displayName: profile.displayName,
          name: profile._json.name,
          pic: profile.photos[0].value,
        });

        user = await newUser.save();
        console.log("New GitHub user registered");
        done(null, user);
      }
    } catch (error) {
      console.log(error);
      done(error, null);
    }
  }
);

module.exports.GitHub_Strategy = GitHub_Strategy;
