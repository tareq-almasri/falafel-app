const mongoose = require("mongoose");
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
  let planArr = req.query.planStr.split(',');
  let workoutArr = req.query.workoutStr.split('-');
  User.findOne({ username: planArr[0] })
    .then(user => {
      user.dailyPlan = {
        wakeUp: planArr[1],
        breakfast: planArr[2],
        lunch: planArr[3],
        dinner: planArr[4],
        sleep: planArr[5]
      };
      user.sport = workoutArr;
      user.save();
      res.json("plan saved");
    })
    .catch(err =>
      res.status(400).send({
        error: "plan did not save"+err
      })
    );
};
