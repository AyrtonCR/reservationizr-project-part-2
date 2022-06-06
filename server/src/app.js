const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
// const { celebrate, Joi, errors, Segments } = require("celebrate");
const RestaurantModel = require("./models/RestaurantModel");
const formatRestaurant = require("./formatRestaurants");

app.use(cors());
app.use(express.json());

app.get("/", async (request, response) => {
  response.send("Home Page: Please type a valid endpoints to receive data");
  // does it need the async //
});

app.get("/restaurants", async (request, response) => {
  const restaurants = await RestaurantModel.find();
  if (restaurants.length > 0) {
    const formattedRestaurant = restaurants.map((restaurant) => {
      return formatRestaurant(restaurant);
    });
    response.status(200).json(formattedRestaurant);
  } else {
    return (
      response
        .status(200)
        // Should the response above be something else //
        .json({ message: "There are no saved restaurants yet" })
    );
  }
});

app.get("/restaurants/:id", async (request, response) => {
  const { id } = request.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const restaurant = await RestaurantModel.findById(id);
    if (restaurant) {
      return response.status(200).send(formatRestaurant(restaurant));
    } else {
      return response
        .status(404)
        .send({ message: "The ID provided was not found" });
    }
  } else {
    return response.status(400).send({ message: "The ID provided is Invalid" });
  }
});

module.exports = app;
