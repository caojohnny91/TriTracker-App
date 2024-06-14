const express = require("express");
const router = express.Router();

const workoutsController = require("../controllers/workouts");

router.get("/", workoutsController.index);

router.get("/new", workoutsController.newPage);

router.post("/", workoutsController.create);

router.get("/:workoutId", workoutsController.show);

router.delete("/:workoutId", workoutsController.deleteWorkout);

router.get("/:workoutId/edit", workoutsController.edit);

router.put("/:workoutId", workoutsController.update);

module.exports = router;
