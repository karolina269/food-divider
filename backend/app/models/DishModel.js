const mongoose = require("mongoose");

const Dish = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  weight: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Dish", Dish);
