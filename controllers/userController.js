const { validationResult } = require("express-validator");
const passport = require("passport");
const hashedPassword = require("../utils/password").hashedPassword;
const signJwt = require("../utils/signJwt");
const { User } = require("../models/User");

const registration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.render("register", {
        email: req.body.email,
        username: req.body.username,
        errorMessages,
      });
    }
    const saltHash = await hashedPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
      email: req.body.email,
      hash: hash,
      salt: salt,
      username: req.body.username,
    });

    await newUser.save();

    res.redirect("/api/users/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user.");
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      const errorMessages = [info.message];
      return res.render("login", { errorMessages });
    }

    const tokenObject = signJwt.issueJWT(user, "local");
    console.log("Token Object:", tokenObject);

    res.cookie("token", tokenObject.token, { httpOnly: true });

    res.redirect("/api/users/home");
  })(req, res, next);
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/api/users/login");
};

const registrationForm = (req, res) => {
  res.render("register.ejs");
};

const loginForm = (req, res) => {
  res.render("login.ejs");
};

const home = (req, res) => {
  const token = req.cookies.token;
  console.log("Received Token:", token);
  const userName = req.user ? req.user.name || req.user.username : null;
  res.render("home.ejs", { userName });
};

const googleAuth = (req, res) => {
  const token = signJwt.issueJWT(req.user, "google");
  console.log(req.user);
  res.cookie("token", token.token, { httpOnly: true });
  res.redirect("/api/users/home");
};

const facebookAuth = (req, res) => {
  const token = signJwt.issueJWT(req.user, "facebook");
  console.log(req.user);
  res.cookie("token", token.token, { httpOnly: true });
  res.redirect("/api/users/home");
};

const githubAuth = (req, res) => {
  const token = signJwt.issueJWT(req.user, "github");
  console.log(req.user);
  res.cookie("token", token.token, { httpOnly: true });
  res.redirect("/api/users/home");
};
module.exports = {
  registration,
  login,
  logout,
  registrationForm,
  loginForm,
  googleAuth,
  facebookAuth,
  githubAuth,
  home,
};
