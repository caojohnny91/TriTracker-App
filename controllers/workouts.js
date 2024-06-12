const User = require("../models/user");

const index = async (req, res) => {
    try {
        res.render("workouts/index.ejs"); 
    } catch (error) {
        console.log(error);
        res.send("My Workouts Index Page error");
    }
};

module.exports = {
    index,
};