const express = require("express");
const { body, validationResult } = require("express-validator");
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User=require('./Models/user.model');

// CONNECT TO MONGODB
mongoose.connect(
  "mongodb://localhost/falafel_users",
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

app.listen(5000, () => {
  console.log("start listening on port 5000");
});

app.use((req, res, next) => {
  res.set("ACCESS-CONTROL-ALLOW-ORIGIN", "*");
  res.set("ACCESS-CONTROL-ALLOW-HEADERS", "*");
  res.set("ACCESS-CONTROL-ALLOW-METHODS", "*");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/sign-up", (req, res) => {
  let newUser = req.body.username;
  let pwd = bcrypt.hashSync(req.body.password, 10);

  User.findOne({username: newUser}).then(user=>{
    if(!user){
      User.create({
          username: newUser,
          password: pwd
        })
          .then(userNew => {
            return res.send(userNew);
          });
      }
      // user already exists!
      else {
        res.status(400).send({
          error: "username already exists"
        });
      }
    })
    .catch(err => next(err));
    
  
});
