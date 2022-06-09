import "./ReservationList.css";
import { formatDate } from "../utils/formatDate";
import React, { useState, useEffect } from "react";
import Restaurant from "./Restaurant";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5001/reservations");
      const data = await response.json();
      setReservations(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading please wait...</p>;
  }
  if (reservations.length < 1) {
    return (
      <>
        <p className="no-reservations-found">
          Sorry, no reservations have been added yet, add some and they will
          display here ...
        </p>
      </>
    );
  }

  return (
    <>
      <div className="main-grid">
        <h1>Upcoming reservations</h1>
        <ul className="second-grid">
          {reservations.map((reservation) => {
            return (
              <li className="single-reservation">
                {}
                <p className="restaurant-name">{reservation.restaurantName}</p>
                <p className="party-size">
                  You have booked for {reservation.partySize} people at the
                  restaurant.
                </p>
                <p className="date">
                  The time your are booked for is {reservation.date}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ReservationList;
