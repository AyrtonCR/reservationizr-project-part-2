const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const { celebrate, Joi, errors, Segments } = require("celebrate");
const RestaurantModel = require("./models/RestaurantModel");
app.use(cors());
app.use(express.json());

app.get("/", async (request, response) => {
  response.send("Home Page: Please type a valid endpoints to receive data");
  // does it need the async //
});

app.get("/restaurants", async (request, response) => {
  const restaurants = await RestaurantModel.find();
  if (restaurants.length > 0) {
    return response.status(200).json(restaurants);
  } else {
    return response
      .status(200)
      .json({ message: "There are no saved restaurants yet" });
  }
});

module.exports = app;
