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
    .then(user => {
      // user with this email not found? => error
      if (!user) {
        res.status(400).send({ err: "invalid username or password" });
      } else {
        // compare passwords using bcrypt.compare() function
        bcrypt.compare(req.query.password, user.password).then(success => {
          // user password does not match password from login form? => error
          if (!success) {
            res.status(400).send({ err: "invalid username or password" });
          } else {
            // create JWT token by signing
            // let secret = 'secret';
            // let token = jwt.sign(
            //   { username: user.username, aud: "iPhone-App" },
            //   secret
            // );
              
              
              // ,{ expiresIn: "1h" }
            

            // return token
            res.send({token: user.username}); // => same as: { "token": token }
          }
        });
      }
    })
    .catch(err => res.status(400).json("err: " + err));
};
