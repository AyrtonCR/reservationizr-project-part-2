const app = require("./app");
const request = require("supertest");

/// /// /// /// /// /// /// ///
/// /// /// Reservations /// ///
/// /// /// /// /// /// /// ///

describe("app", () => {
  it("should retrieve a list of all the reservations formatted according to the API spec", async () => {
    await request(app)
      .get("/reservations")
      .expect((response) => {
        const expected = [];
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(200);
      });
  });
  it("should retrieve a single reservation formatted correctly, with a valid id, and with a 200 status according to the API spec", async () => {
    await request(app)
      .get("/reservations/507f1f77bcf86cd799439011")
      .expect((response) => {
        const expected = {};
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(200);
      });
  });
  it("should return an invalid id message when receiving an invalid reservation id with a 400 status", async () => {
    await request(app)
      .get("/reservations/bad-id")
      .expect((response) => {
        const expected = { message: "id provided is invalid" };
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(400);
      });
  });
  it("should respond with a not found error message if the reservation id does not exist with a 404 status", async () => {
    await request(app)
      .get("/reservations/507f1f77bcf86cd799439099")
      .expect((response) => {
        const expected = { message: "id not found" };
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(404);
      });
  });
});

/// /// /// /// /// /// /// ///
/// /// /// Restaurants /// ///
/// /// /// /// /// /// /// ///

it("should retrieve a list of all the restaurants formatted according to the API spec", async () => {
  await request(app)
    .get("/reservations")
    .expect((response) => {
      const expected = [];
      expect(response.body).toEqual(expected);
      expect(response.status).toBe(200);
    });
});

it("should retrieve a single restaurant formatted correctly, with a valid id, and with a 200 status according to the API spec", async () => {
  await request(app)
    .get("/restaurant/507f1f77bcf86cd799439011")
    .expect((response) => {
      const expected = {};
      expect(response.body).toEqual(expected);
      expect(response.status).toBe(200);
    });
});

it("should return an invalid id message when receiving an invalid restaurant id with a 400 status", async () => {
  await request(app)
    .get("/restaurant/bad-id")
    .expect((response) => {
      const expected = { message: "id provided is invalid" };
      expect(response.body).toEqual(expected);
      expect(response.status).toBe(400);
    });
});
it("should respond with a not found error message if the restaurant id does not exist with a 404 status", async () => {
  await request(app)
    .get("/restaurant/507f1f77bcf86cd799439099")
    .expect((response) => {
      const expected = { message: "id not found" };
      expect(response.body).toEqual(expected);
      expect(response.status).toBe(404);
    });
});

/// /// /// /// /// /// /// ///
/// /// /// POST Route Tests ///
/// /// /// /// /// /// /// ///

test("POST /reservations creates a new reservation that is formatted correctly according to the API spec", async () => {
  const expectedStatus = 201;
  const body = {};

  await request(app)
    .post("/reservations")
    .send(body)
    .expect(expectedStatus)
    .expect((response) => {
      expect(response.body).toEqual(expect.objectContaining(body));
      expect(response.body.id).toBeTruthy();
    });

  test("POST /reservations returns a 400 when a negative ................. is used", async () => {
    const expectedStatus = 400;
    const body = {
      description:
        "An easy living, conveniently located, brick & tile home on a highly desirable street and surrounded by quality homes.",
      address: "8 Shasta Pass",
      title: "Another Different title",
      img: "https://placeimg.com/640/480/arch",
      askingPrice: -891822.26,
    };

    await request(app).post("/reservations").send(body).expect(expectedStatus);
  });
});
