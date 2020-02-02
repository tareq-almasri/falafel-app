// const express = require("express");
// const { body, validationResult } = require("express-validator");
// const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User=require('./Models/user.model');

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

// app.listen(5000, () => {
//   console.log("start listening on port 5000");
// });

// app.use((req, res, next) => {
//   res.set("ACCESS-CONTROL-ALLOW-ORIGIN", "*");
//   res.set("ACCESS-CONTROL-ALLOW-HEADERS", "*");
//   res.set("ACCESS-CONTROL-ALLOW-METHODS", "*");
//   next();
// });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


module.exports= (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let newUser = req.query.username;
  let pwd = bcrypt.hashSync(req.query.password, 10);

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
    
  
};
