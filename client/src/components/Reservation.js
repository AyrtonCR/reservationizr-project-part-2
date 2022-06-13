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
  const [notFound, setNotFound] = useState(false);
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

      if (fetchUrl.ok) {
        const data = await fetchUrl.json();
        setReservation(data);
        setNotFound(false);
        setIsLoading(false);
      } else {
        setNotFound(true);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, getAccessTokenSilently]);

  if (isLoading) {
    return <p>Loading please wait...</p>;
  }

  if (notFound) {
    return (
      <>
        <p className="no-reservation-found">
          <strong> Sorry! We can't find that reservation.</strong>
        </p>
        <Link to={`/reservations/`}>
          <button className="back-to-reservations-2">
            ← Back to Reservations
          </button>
        </Link>
      </>
    );
  } else
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
