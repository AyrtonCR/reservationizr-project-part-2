import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useAuth0 } from "@auth0/auth0-react";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateReservation.css";

const CreateReservation = () => {
  const [partySize, setPartySize] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [date, setDate] = useState("");
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

    const response = await fetch("http://localhost:5001/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(reservation),
    });

    if (!response.ok) {
      setIsError(true);
      setErrorStatus(response.status);
    } else {
      setIsLoading(false);
      navigate("/reservations");
    }
  };

  if (isError) {
    return (
      <>
        <p className="no-properties">
          Error creating a property (error status {errorStatus})
        </p>
        {/* <Link to="/" className="button">
          Return to properties
        </Link> */}
      </>
    );
  }

  // const CreateReservation = ({ restaurantName }) => {
  //   // const [restaurantName, setRestaurantName] = useState("");
  //   const [partySize, setPartySize] = useState("");
  //   const [date, setDate] = useState("");
  //   const [isPending, setIsPending] = useState(false);
  //   const [isError, setIsError] = useState(false);
  //   const [errorStatus, setErrorStatus] = useState(false);
  //   const navigate = useNavigate();

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setIsPending(true);
  //     const addForm = { partySize, date };

  //     const response = await fetch("http://localhost:5001/reservations", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(addForm),
  //     }).then(() => {
  //       if (!response.ok) {
  //         setIsError(true);
  //         setErrorStatus(response.status);
  //       } else {
  //         console.log("new form added");
  //         setIsPending(false);
  //         navigate("/reservations");
  //       }
  //     });
  //   };

  return (
    <>
      <div className="form-main-grid">
        <h1 className="reservation-title">
          Reserve RESTAURANT NAME WILL GO HERE
        </h1>
        <div className="form-second-grid">
          <form className="reservation-form" onSubmit={handleSubmit}>
            <label className="label" htmlFor="restauratntName">
              Restaurant name
            </label>
            <input
              className="input"
              id="restaurantName"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              type="text"
              required
            />

            <label className="label" htmlFor="guests">
              Number of guests
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
            <input
              className="input"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="text"
              required
            ></input>
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
