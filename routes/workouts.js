const express = require("express");
const router = express.Router();

const workoutsController = require("../controllers/workouts");

router.get("/", workoutsController.index);

module.exports = router;
