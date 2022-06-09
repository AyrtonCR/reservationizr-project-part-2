const formatReservation = require("./formatReservation");

describe("formatReservation", () => {
  it("should return the reservation formatted with id", () => {
    const reservation = {
      _id: { $oid: "507f1f77bcf86cd799439011" },
      partySize: 4,
      date: { $date: "2023-11-17T06:30:00.000Z" },
      userId: "mock-user-id",
      restaurantName: "Island Grill",
    };
    const results = formatReservation(reservation);
    const expected = {
      id: "507f1f77bcf86cd799439011",
      partySize: 4,
      date: { $date: "2023-11-17T06:30:00.000Z" },
      userId: "mock-user-id",
      restaurantName: "Island Grill",
    };
    expect(results).toEqual(expected);
  });
});
