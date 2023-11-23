const router = require("express").Router();
const passport = require("passport");
const { regiterValidator } = require("../../vadation/registerValidator");
const {
  registration,
  login,
  logout,
  registrationForm,
  loginForm,
  googleAuth,
  facebookAuth,
  githubAuth,
  home,
} = require("../../controllers/userController");
const { isAuth } = require("../../utils/auth");

router.use(passport.initialize());

router.post("/login", login);
router.post("/register", regiterValidator, registration);
router.delete("/logout", logout);
router.get("/register", registrationForm);
router.get("/login", loginForm);

router.get("/home", passport.authenticate("jwt", { session: false }), home);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"],
    prompt: "select_account",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuth
);

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  facebookAuth
);

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { session: false }),
  githubAuth
);

module.exports.router = router;
