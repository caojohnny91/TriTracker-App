const User = require("../models/user");

const index = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("workouts/index.ejs", { triathlon: currentUser.triathlon, indexPage: "workouts/index.ejs" });
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
    let workout = currentUser.triathlon.id(req.params.workoutId);
    const date = workout.date;
    const formattedDate = date.toString().slice(0, 15);
    console.log(formattedDate);
    workout = { ...workout._doc, date: formattedDate };
    console.log(workout);
    res.render("workouts/show.ejs", { workout: workout });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};
const deleteWorkout = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.triathlon.id(req.params.workoutId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/workouts`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

const edit = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    let workout = currentUser.triathlon.id(req.params.workoutId);
    // const date = workout.date;
    // const formattedDate = date.toString().slice(0, 15);
    // console.log(formattedDate);
    // workout = { ...workout._doc, date: formattedDate };
    // console.log(workout);
    res.render("workouts/edit.ejs", { workout: workout });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

const update = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const workout = currentUser.triathlon.id(req.params.workoutId);
    workout.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/workouts/${req.params.workoutId}`);
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
  deleteWorkout,
  edit,
  update,
};
