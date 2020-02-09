const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    tdee: Number,
    goalCal: Number,
    diet: String,
    proteinDL: Number,
    carbsDL: Number,
    fatDL: Number,
    dailyPlan: {
      wakeUp: String,
      breakfast: String,
      lunch: String,
      dinner: String,
      sleep: String
    },
    sport: [[String]],
    udi: {
      date: String,
      calCount: Number,
      proteinCount: Number,
      fatCount: Number,
      carbsCount: Number,
      waterCount: Number,
      caffCount: Number,
      sugarCount: Number
    }
  },

  { versionKey: false }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
