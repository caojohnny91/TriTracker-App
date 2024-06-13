const User = require("../models/user");

const index = async (req, res) => {
  try {
    res.render("workouts/index.ejs");
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

module.exports = {
  index,
  newPage,
};
