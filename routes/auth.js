const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");

const authController = require("../controllers/auth")

router.get("/sign-up", authController.signUp);

module.exports = router;