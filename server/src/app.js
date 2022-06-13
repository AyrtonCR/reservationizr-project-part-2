const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const { celebrate, Joi, errors, Segments } = require("celebrate");
const { auth } = require("express-oauth2-jwt-bearer");
const RestaurantModel = require("./models/RestaurantModel");
const ReservationModel = require("./models/ReservationModel");
const formatRestaurant = require("./formatRestaurants");
const formatReservation = require("./formatReservation");

const checkJwt = auth({
  audience: "https://reservationizr.com",
  issuerBaseURL: `https://dev-qlz4drmq.au.auth0.com/`,
});

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

app.post(
  "/reservations",
  checkJwt,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      partySize: Joi.number().required(),
      date: Joi.string().required(),
      restaurantName: Joi.string().required(),
    }),
  }),

  async (request, response, next) => {
    try {
      const { body, auth } = request;
      const reservationBody = {
        createdBy: auth.payload.sub,
        ...body,
      };
      const reservation = new ReservationModel(reservationBody);
      await reservation.save();
      return response.status(201).send(formatReservation(reservation));
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

app.get(
  "/reservations",
  checkJwt,

  async (request, response) => {
    const { auth } = request;
    const userId = auth.payload.sub;
    let reservations = [];
    reservations = await ReservationModel.find({
      createdBy: userId,
    });
    if (reservations.length > 0) {
      const formattedReservation = reservations.map((reservation) => {
        return formatReservation(reservation);
      });
      response.status(200).json(formattedReservation);
    } else {
      return (
        response
          .status(200)
          // Should the response above be something else //
          .json({ message: "There are no saved reservations yet" })
      );
    }
  }
);

app.get("/reservations/:id", checkJwt, async (request, response) => {
  const { id } = request.params;
  const { auth } = request;
  const userId = auth.payload.sub;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const reservation = await ReservationModel.findById(id);
    if (reservation) {
      if (reservation.createdBy === userId) {
        return response.status(200).send(formatReservation(reservation));
      } else {
        return response.status(403).send({ message: "Access is forbidden" });
      }
    } else {
      return response
        .status(404)
        .send({ message: "The ID provided was not found" });
    }
  } else {
    return response.status(400).send({ message: "The ID provided is Invalid" });
  }
});

app.use(errors());

module.exports = app;
