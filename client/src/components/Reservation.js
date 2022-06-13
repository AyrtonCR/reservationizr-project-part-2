import "./Reservation.css";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Reservation = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();
      const fetchUrl = await fetch(`http://localhost:5001/reservations/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await fetchUrl.json();
      setReservation(data);
      setIsLoading(false);
      // FIXME: Make a fetch request and call setRestaurant with the response body
    };
    fetchData();
  }, [getAccessTokenSilently, id]);

  if (isLoading) {
    return <p>Loading please wait...</p>;
  }

  return (
    <>
      <div className="main-grid">
        <h1>Reservation</h1>
        <ul className="second-grid">
          <li className="single-reservation">
            {}
            <p className="reservation-name">
              <strong>{reservation.restaurantName}</strong>
            </p>
            <p className="single-reservation-date">
              {formatDate(reservation.date)}
            </p>
            <p className="reservation-party-size">
              <strong>Party Size: {reservation.partySize}</strong>
            </p>
          </li>
          <Link to={`/reservations/`}>
            <button className="back-to-reservations">
              ← Back to Reservations{" "}
            </button>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Reservation;
