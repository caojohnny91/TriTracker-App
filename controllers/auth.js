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
    res.render("auth/sign-in.ejs");
  } catch (error) {
    res.redirect("/");
  }
};

const signInPost = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send("Login failed! Please try again.");
    }
    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    );
    if (!validPassword) {
      res.send("Login failed! Please try again.");
    }
    req.session.user = {
      username: userInDatabase.username,
    };
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

const signOut = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

module.exports = {
  signUp,
  signUpPost,
  signIn,
  signInPost,
  signOut,
};
