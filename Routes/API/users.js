const express = require("express");
const router = express.Router();
const userController = require('../../Controllers/usersController')
const { check, validationResult } = require("express-validator");

// @route       POst   api/user
//@description  Register User
//@access       Public
router.post(   
  "/",
  [
    check("name", "Name is Required").not().isEmpty(), 
    check("email", "Please Enter a valid email address").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  userController.regUser
);



module.exports = router;
