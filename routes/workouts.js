const express = require("express");
const router = express.Router();

const workoutsController = require("../controllers/workouts");

router.get("/", workoutsController.index);

router.get("/new", workoutsController.newPage);

module.exports = router;
