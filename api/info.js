const mongoose = require("mongoose");
const User = require("./Models/user.model");
require("dotenv").config();

// CONNECT TO MONGODB
mongoose.connect(
  process.env.FALAFEL_DB,
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
  let infoArrStrings=req.query.infoStrStrings.split(',');
  let infoArrNumbers=req.query.infoStrNumbers.split(',');
  User.findOne({ username: infoArrStrings[0] })
    .then(user => {
      user.tdee = infoArrNumbers[0];
      user.goalCal = infoArrNumbers[1];
      user.diet = infoArrStrings[1];
      user.proteinDL = infoArrNumbers[2];
      user.carbsDL = infoArrNumbers[3];
      user.fatDL = infoArrNumbers[4];
      user.save();
      res.json('info saved')
    })
    .catch(err => res.status(400).json("Error: " + err));
};
