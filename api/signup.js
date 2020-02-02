const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
  res.setHeader("Access-Control-Allow-Origin", "*");
  let newUser = req.query.username;
  let pwd = bcrypt.hashSync(req.query.password, 10);

  User.findOne({ username: newUser })
    .then(user => {
      if (!user) {
        User.create({
          username: newUser,
          password: pwd
        }).then(userNew => {
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
    .catch(err => res.status(400).json("Error: " + err));
};
