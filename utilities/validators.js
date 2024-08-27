const { body } = require("express-validator");

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

module.exports = { validateSignup };
