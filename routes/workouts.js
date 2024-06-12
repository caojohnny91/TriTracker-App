const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

const workoutsController = require("../controllers/auth/workouts");

router.get("/index", workoutsController.index);

module.exports = router;
