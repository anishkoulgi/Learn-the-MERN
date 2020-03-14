const express = require("express");
const router = express.Router();

const User = require("../models/user");

// GET request for login
// Desc: Check for the user in the database

router.post("/", (req, res) => {
  User.find({email:req.body.email})
  .then(result => {
    if(result.length === 0) {
      User.create(req.body)
      .then(result => {
        res.statusCode = 200;
        res.json({ error: "" });
      })
      .catch(err => {
        console.log(err);
      });
    }
    else {
      res.statusCode = 200;
        res.json({ error: "Email ID already exists" });
    }
  })
  
});

module.exports = router;
