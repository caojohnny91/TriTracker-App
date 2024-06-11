const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

const authController = require("../controllers/auth");

router.get("/sign-up", authController.signUp);

router.post("/sign-up", authController.signUpPost);

router.get("/sign-in", authController.signIn);

module.exports = router;
