const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const login = require("./routes/login");
const signup = require("./routes/signup");
const dashboard = require("./routes/dashboard")

const app = express();

// Body Parser middleware

app.use(bodyParser.json());

// DB config

const db = require("./config/keys").mongoURI;

// Connect to mongo

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo DB connected");
  })
  .catch(err => {
    console.log(err);
  });

const port = 5000;
// Use routes
app.use("/login", login);
app.use("/signup", signup);
app.use("/dashboard",dashboard)

app.listen(port, () => {
  console.log("Server started");
});
