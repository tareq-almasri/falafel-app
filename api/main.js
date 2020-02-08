require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./Models/user.model");

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
  let user = jwt.verify(req.query.token, process.env.ACCESS_TOKEN_SECRET);
  if (!user) {
    res.send({ err: "eeeeerrrrooooorrrr" });
  } else {
      res.send({user})
    // User.findOne({ username: user.username })
    //   .then(userFound => {
    //     res.send({ userFound });
    //   })
    //   .catch(err => res.status(400).json("err: " + err));
  }
};

