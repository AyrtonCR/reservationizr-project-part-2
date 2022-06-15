const app = require("./app");
const request = require("supertest");

/// /// /// /// /// /// /// ///
/// /// /// Restaurants /// ///
/// /// /// /// /// /// /// ///
describe("app", () => {
  it("should retrieve a list of all the restaurants formatted according to the API spec", async () => {
    await request(app)
      .get("/restaurants")
      .expect((response) => {
        const expected = [
          {
            id: "616005cae3c8e880c13dc0b9",
            name: "Curry Place",
            description:
              "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
            image: "https://i.ibb.co/yftcRcF/indian.jpg",
          },
          {
            id: "616005e26d59890f8f1e619b",
            name: "Thai Isaan",
            description:
              "We offer guests a modern dining experience featuring the authentic taste of Thailand. Food is prepared fresh from quality ingredients and presented with sophisticated elegance in a stunning dining setting filled with all the richness of Thai colour, sound and art.",
            image: "https://i.ibb.co/HPjd2jR/thai.jpg",
          },
          {
            id: "616bd284bae351bc447ace5b",
            name: "Italian Feast",
            description:
              "From the Italian classics, to our one-of-a-kind delicious Italian favourites, all of our offerings are handcrafted from the finest, freshest ingredients available locally. Whether you're craving Italian comfort food like our Ravioli, Pappardelle or something with a little more Flavour like our famous Fettuccine Carbonara.",
            image: "https://i.ibb.co/0r7ywJg/italian.jpg",
          },
        ];
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(200);
      });
  });

  it("should retrieve a single restaurant formatted correctly, with a valid id, and with a 200 status according to the API spec", async () => {
    await request(app)
      .get("/restaurants/616005cae3c8e880c13dc0b9")
      .expect((response) => {
        const expected = {
          id: "616005cae3c8e880c13dc0b9",
          name: "Curry Place",
          description:
            "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
          image: "https://i.ibb.co/yftcRcF/indian.jpg",
        };
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(200);
      });
  });

  it("should return an invalid id message when receiving an invalid restaurant id with a 400 status", async () => {
    await request(app)
      .get("/restaurants/bad-id")
      .expect((response) => {
        const expected = { message: "The ID provided is Invalid" };
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(400);
      });
  });

  it("should respond with a not found error message if the restaurant id does not exist with a 404 status", async () => {
    await request(app)
      .get("/restaurants/507f1f77bcf86cd799439099")
      .expect((response) => {
        const expected = { message: "The ID provided was not found" };
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(404);
      });
  });

  /// /// /// /// /// /// /// ///
  /// /// /// Reservations /// ///
  /// /// /// /// /// /// /// ///

  it("should retrieve a list of all the reservations formatted according to the API spec", async () => {
    await request(app)
      .get("/reservations")
      .expect((response) => {
        const expected = [
          {
            id: "507f1f77bcf86cd799439011",
            partySize: 4,
            date: "2023-11-17T06:30:00.000Z",
            userId: "mock-user-id",
            restaurantName: "Island Grill",
          },
          {
            id: "614abf0a93e8e80ace792ac6",
            partySize: 2,
            date: "2023-12-03T07:00:00.000Z",
            userId: "mock-user-id",
            restaurantName: "Green Curry",
          },
        ];
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(200);
      });
  });
  it("should retrieve a single reservation formatted correctly, with a valid id, and with a 200 status according to the API spec", async () => {
    await request(app)
      .get("/reservations/507f1f77bcf86cd799439011")
      .expect((response) => {
        const expected = {
          id: "507f1f77bcf86cd799439011",
          partySize: 4,
          date: "2023-11-17T06:30:00.000Z",
          userId: "mock-user-id",
          restaurantName: "Island Grill",
        };
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(200);
      });
  });

  it("should give a 403 forbidden access when trying to access another users reservations", async () => {
    await request(app)
      .get("/reservations/61679189b54f48aa6599a7fd")
      .expect((response) => {
        const expected = { message: "Access is forbidden" };
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(403);
      });
  });

  it("should return an invalid id message when receiving an invalid reservation id with a 400 status", async () => {
    await request(app)
      .get("/reservations/bad-id")
      .expect((response) => {
        const expected = { message: "The ID provided is Invalid" };
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(400);
      });
  });
  it("should respond with a not found error message if the reservation id does not exist with a 404 status", async () => {
    await request(app)
      .get("/reservations/507f1f77bcf86cd799439099")
      .expect((response) => {
        const expected = { message: "The ID provided was not found" };
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(404);
      });
  });
  /// /// /// /// /// /// /// ///
  /// /// /// POST Route Tests ///
  /// /// /// /// /// /// /// ///

  it("should post to /reservations and create a new reservation that is formatted correctly according to the API spec", async () => {
    const body = {
      userId: "mock-user-id",
      date: "2023-09-28",
      partySize: 1,
      restaurantName: "Curry Place",
    };

    const response = await request(app).post("/reservations").send(body);

    expect(response.status).toBe(201);
    expect(response.body.userId).toEqual("mock-user-id");
    expect(response.body.id).toBeDefined();
  });

  it("should return 400 if required validation error happens on POST /reservations", async () => {
    const body = {};
    const response = await request(app).post("/reservations").send(body);

    expect(response.status).toBe(400);
  });

  it("should return 400 if partySize is less than 0 on POST /reservations", async () => {
    const body = {
      _id: { $oid: "507f1f77bcf86cd799439011" },
      partySize: -2,
      date: { $date: "2023-11-17T06:30:00.000Z" },
      userId: "mock-user-id",
      restaurantName: "Island Grill",
    };
    const response = await request(app).post("/reservations").send(body);

    expect(response.status).toBe(400);
  });
});
