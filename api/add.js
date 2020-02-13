const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./Models/user.model");
require("dotenv").config();

// CONNECT TO MONGODB
mongoose.connect(
  "mongodb+srv://alef:hello123@cluster0-2yq8x.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  err => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  User.findOne({ username: req.query.username })
    .then(user=> {
      if (!user) {
        res.send({ err: "user not found" });
      } else {
        user.udi=JSON.parse(req.query.udi)
        user.save();
        res.json('udi updated');
      }
    })
    .catch(err => res.status(400).json("err: " + err));
};
