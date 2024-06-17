const User = require("../models/user.js");

const index = async (req, res) => {
  try {
    const users = await User.find({});
    res.render("users/index.ejs", { users });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};

module.exports = {
  index,
};
