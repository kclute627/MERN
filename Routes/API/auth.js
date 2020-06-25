const express = require("express");
const router = express.Router();
const authController = require("../../Controllers/authController");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");




// @route       Get   api/Auth
//@description  Test Route
//@access       Public
router.get("/", auth, authController.signUpUser);


// @route       POST api/Auth
//@description  Auth user and get token
//@access       Public

router.post("/",
[
    check("email", "Please Enter a valid email address").isEmail(), 
    check("password", "Password is required").exists(),
],

authController.isUser
);

module.exports = router;
