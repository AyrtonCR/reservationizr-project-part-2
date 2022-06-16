import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useAuth0 } from "@auth0/auth0-react";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateReservation.css";

const CreateReservation = ({ restaurantName }) => {
  const [partySize, setPartySize] = useState("");
  const [restaurantsName, setRestaurantsName] = useState("");
  const [date, setDate] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = await getAccessTokenSilently();
    setIsLoading(true);

    const reservation = {
      partySize,
      date,
      restaurantName,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/reservations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(reservation),
        }
      );

      if (!response.ok) {
        setIsError(true);
        setErrorStatus(response.status);
      } else {
        setIsLoading(false);
        navigate("/reservations");
      }
    } catch (error) {
      setIsError(true);
      setErrorStatus("unknown");
    }
  };

  if (isError) {
    return (
      <>
        <p className="no-properties">
          Error creating a property (error status {errorStatus})
        </p>
      </>
    );
  }

  return (
    <>
      <div className="form-main-grid">
        <h1 className="reservation-title">Reserve {restaurantName}</h1>
        <div className="form-second-grid">
          <form className="reservation-form" onSubmit={handleSubmit}>
            <div className="hidden-restaurant-name">
              <label className="label" htmlFor="restaurantName">
                Restaurant name
              </label>
              <input
                className="input"
                id="restaurantName"
                value={restaurantName}
                onChange={(e) => setRestaurantsName(e.target.value)}
                type="text"
                required
              />
            </div>
            <label className="label" htmlFor="partySize">
              Party size
            </label>
            <input
              className="input"
              id="partySize"
              value={partySize}
              onChange={(e) => setPartySize(e.target.value)}
              type="text"
              required
            />
            <label className="label" htmlFor="date">
              Date
            </label>

            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              showTimeSelect
              className="input"
              id="date"
              type="text"
              required
            />
            {!isPending && (
              <button className="reservation-button">Submit</button>
            )}
            {isPending && (
              <button className="reservation-button" disabled>
                Adding your reservation now ...
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateReservation;
