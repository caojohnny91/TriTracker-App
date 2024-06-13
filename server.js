const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const session = require("express-session");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const morgan = require("morgan");
const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");
const path = require("path");


// const authController = require("./controllers/auth.js"); // made routes for auth
const authRoutes = require("./routes/auth.js");
const workoutsController = require("./routes/workouts.js");

const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false })); // midware to parse url data from forms
app.use(methodOverride("_method")); // midware for using http verbs such as PUT or DELETE
app.use(morgan("dev")); // morgan for http requests
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(passUserToView);

app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/workouts`);
  } else {
    res.render("home.ejs");
  }
});

app.use("/auth", authRoutes);
app.use(isSignedIn);

// app.use("/users/workouts", workoutsController); // old before is-signed/pass middleware
app.use("/users/:userId/workouts", workoutsController);

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
