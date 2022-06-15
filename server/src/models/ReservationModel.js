const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservationsSchema = new Schema({
  partySize: { type: Number, required: true },
  restaurantName: { type: String, required: true },
  date: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model("Reservation", reservationsSchema);
// FIXME: Add a Mongoose model here
