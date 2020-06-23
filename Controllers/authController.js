const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require('../Models/User');




exports.isUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credintials" });
    }

    const isMatched = await bcrypt.compare(password, user.password); 

    if (!isMatched) {
      return res.status(400).json({ msg: "Invalid Credintials" });
    }

    //JWS Token

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.signUpUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
  
      res.json(user);
    } catch (err) {
      console.error(err.msg);
  
      res.status(500).send("server error");
    }
  }