const bcrypt = require("bcrypt");
const User = require("../models/user.js");

const signUp = (req, res) => {
  try {
    res.render("auth/sign-up.ejs");
  } catch (error) {
    res.redirect("/");
  }
};

const signUpPost = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send("Sorry, this username has already taken!");
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.send("Passwords do not match!");
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);

    res.send(`Thank you for signing up ${user.username}!`);
  } catch (error) {
    res.redirect("/");
  }
};

const signIn = async (req, res) => {
    try {
        res.render("auth/sign-in.ejs")
    } catch(error){
        res.redirect("/")
    }
}

module.exports = {
  signUp,
  signUpPost,
  signIn,
};
