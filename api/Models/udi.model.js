const mongoose = require("mongoose");

const udiSchema = mongoose.Schema({
  calCount: Number,
  proteinCount: Number,
  fatCount: Number,
  carbsCount: Number,
  waterCount: Number,
  caffCount: Number,
  sugarCount: Number
});

const Udi = mongoose.model("udi", udiSchema);

module.exports = Udi;
