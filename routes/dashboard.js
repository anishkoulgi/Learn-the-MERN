const express = require("express");
const router = express.Router();

const User = require("../models/user");

// POST request for login
// Desc: Check for the user in the database

router.post("/", (req, res) => {
  User.find({_id:req.body.id})
    .then(result => {
      if (result.length === 0) {
        //res.statusCode = 404;
        res.setHeader("Content-Type","application/json")
        res.json({name:"failed"});
      } else {
        res.statusCode = 200;
          res.json({name:result[0].name});
      }
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;