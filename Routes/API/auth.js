const express = require('express');

const router = express.Router();

// @route Get   api/Auth
//@description  Test Route
//@access       Public
router.get('/', (req, res)=> res.send('Auth Route'))


module.exports = router; 