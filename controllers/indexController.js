const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

const validateSignup = [
  body("username")
    .trim()
    .isLength({ max: 16 })
    .withMessage("Username can not be longer than 16 characters."),
  body("password")
    .isLength({ min: 6, max: 255 })
    .withMessage("Password must be from 6 to 255 characters long."),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match."),
];

//name convention <rootPath><thing><httpVerb>
function indexGet(req, res) {
  res.render("index", { title: "Homepage" });
}

function indexLoginGet(req, res) {
  res.render("login", { title: "Login" });
}

const indexLoginPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

function indexLogoutGet(req, res, next) {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    res.redirect("/");
  });
}

function indexSignupGet(req, res) {
  res.render("signup", { title: "Sign Up" });
}

const indexSignupPost = [
  validateSignup,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("signup", { title: "Sign Up", errors: errors.array() });
    }
    const { username, password } = req.body;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      try {
        await db.createUser(username, hashedPassword);
        res.redirect("/");
      } catch (err) {
        return next(err);
      }
    });
  },
];

module.exports = {
  indexGet,
  indexLoginGet,
  indexLoginPost,
  indexLogoutGet,
  indexSignupGet,
  indexSignupPost,
};
