const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: String,
    username: String,
    password: String,
    tdee: Number,
    goalCal: Number,
    diet: String,
    weeklyPlan: {
      dailyPlan: {
        wakeUp: String,
        breakfast: String,
        lunch: String,
        dinner: String,
        sleep: String
      },
      sport: [{ day: String, time: String }]
    },
    udi: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'udi'
    }
  },
  
  { versionKey: false }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
