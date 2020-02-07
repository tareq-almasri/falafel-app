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
  let planArr = req.query.planStr.split(",");
  let workoutArr = req.query.workoutStr.split(",");
  let i, j, temp;

  let arr2 = [];

  for (i = 0, j = workoutArr.length; i < j; i += 3) {
    temp = workoutArr.slice(i, i + 3);
    arr2.push(temp);
  }

  User.findOne({ username: planArr[0] })
    .then(user => {
      user.dailyPlan = {
        wakeUp: planArr[1],
        breakfast: planArr[2],
        lunch: planArr[3],
        dinner: planArr[4],
        sleep: planArr[5]
      };
      user.sport = arr2;
      user.udi = {
        calCount: 0,
        proteinCount: 0,
        fatCount: 0,
        carbsCount: 0,
        waterCount: 0,
        caffCount: 0,
        sugarCount: 0
      };
      user.save();
      res.json("plan saved");
    })
    .catch(err => res.status(400).json("Error: " + err));
};
