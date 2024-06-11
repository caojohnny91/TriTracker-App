// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// created auth routes for organization

const User = require("../models/user.js");

const signUp = (req, res) => {
  try {
    res.render("auth/sign-up.ejs");
  } catch (error) {
    res.redirect("/");
  }
};

module.exports = {
  signUp,
};
