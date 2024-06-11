const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now, required: true },
  discipline: { type: String, enum: ["Swim", "Bike", "Run"], required: true },
  workoutType: {
    type: String,
    enum: ["Recovery", "Zone 2", "Tempo", "Interval"],
    required: true,
  },
  time: Number,
  distance: Number,
  notes: String,
});

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  triathlon: [workoutSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
