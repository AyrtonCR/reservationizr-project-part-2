const formatReservation = (reservation) => {
  const formattedReservation = {
    id: reservation._id,
    partySize: reservation.partySize,
    date: reservation.date,
    restaurantName: reservation.restaurantName,
    createdBy: reservation.createdBy,
  };
  return formattedReservation;
};

module.exports = formatReservation;
