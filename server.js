const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const session = require("express-session");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false })); // midware to parse url data from forms
app.use(methodOverride("_method")); // midware for using http verbs such as PUT or DELETE
app.use(morgan("dev")); // morgan for http requests

app.get("/", async (req, res) => {
  res.send("Hello Home Page");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
