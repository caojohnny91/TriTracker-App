const User = require("../models/user");

const index = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("workouts/index.ejs", { triathlon: currentUser.triathlon });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

const newPage = async (req, res) => {
  try {
    res.render("workouts/new.ejs");
  } catch (error) {
    res.redirect("/");
  }
};

const create = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.triathlon.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/workouts`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

const show = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const workout = currentUser.triathlon.id(req.params.workoutId);
    res.render("workouts/show.ejs", { workout: workout });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

module.exports = {
  index,
  newPage,
  create,
  show,
};
