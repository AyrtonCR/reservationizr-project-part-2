const formatReservation = (reservation) => {
  const formattedReservation = {
    id: reservation._id,
    partySize: reservation.partySize,
    date: reservation.date,
    restaurantName: reservation.restaurantName,
    userId: "mock-user-id",
  };
  return formattedReservation;
};

module.exports = formatReservation;
