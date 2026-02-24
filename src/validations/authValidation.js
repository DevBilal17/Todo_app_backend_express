const { body } = require("express-validator");


const registerValidations = [
  body("name").notEmpty().withMessage("Name is required")
  .isLength({min:3}).withMessage("Name must be at least 3 characters long")
  .isLength({max:20}).withMessage("Name must be less than 20 characters long"),

  body("email").notEmpty().withMessage("Email is required")
  .isEmail().withMessage("Please provide a valid email address"),


  body("password").notEmpty().withMessage("Password is required")
  .isLength({min:6}).withMessage("Password must be at least 6 characters long")
]





module.exports = {
    registerValidations
}