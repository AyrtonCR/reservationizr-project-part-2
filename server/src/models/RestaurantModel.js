const mongoose = require("mongoose");
const { Schema } = mongoose;

const restaurantsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("Restaurant", restaurantsSchema);
