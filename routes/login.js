const express = require("express");
const router = express.Router();

const User = require("../models/user");

// POST request for login
// Desc: Check for the user in the database

router.post("/", (req, res) => {
  User.find({ email: req.body.email })
  
    .then(result => {
      
      if (result.length === 0) {
        //res.statusCode = 404;
        res.setHeader("Content-Type","application/json")
        res.json({status:false});
      } else {
        if(result[0].password === req.body.password) {
          res.statusCode = 200;
          res.json({status:true,name:result[0].name,id:result[0]._id});
        }
        else {
          res.setHeader("Content-Type","application/json")
          res.json({status:false});
        }
      }
    })
    .catch(err => {
      console.log("in err")
      res.json(err);
    });
});

module.exports = router;
