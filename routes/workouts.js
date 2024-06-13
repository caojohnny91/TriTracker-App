const express = require("express");
const router = express.Router();

const workoutsController = require("../controllers/workouts");

router.get("/", workoutsController.index);

router.get("/new", workoutsController.newPage);

router.post("/", workoutsController.create);

router.get("/:workoutId", workoutsController.show);

module.exports = router;
