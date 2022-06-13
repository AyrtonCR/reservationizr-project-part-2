import "./ReservationList.css";
import React, { useState, useEffect } from "react";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch("http://localhost:5001/reservations", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setReservations(data);
      setIsLoading(false);
    };
    fetchData();
  }, [getAccessTokenSilently]);

  if (reservations.length < 1) {
    return (
      <>
        <h1>Upcoming reservations</h1>
        <p className="no-reservations-found">You dont have any reservations.</p>
        <Link to="/">
          <button className="view-details">View the restaurants</button>
        </Link>
      </>
    );
  }
  if (isLoading) {
    return <p>Loading please wait...</p>;
  } else
    return (
      <>
        <div className="main-grid">
          <h1>Upcoming reservations</h1>
          <ul className="second-grid">
            {reservations.map((reservation) => {
              return (
                <li className="single-reservation">
                  {}
                  <p className="reservation-name">
                    <strong>{reservation.restaurantName}</strong>
                  </p>
                  <p className="reservation-date">
                    {formatDate(reservation.date)}
                  </p>
                  <Link to={`/reservations/${reservation.id}`}>
                    <button className="view-details">View details → </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
};

export default ReservationList;
