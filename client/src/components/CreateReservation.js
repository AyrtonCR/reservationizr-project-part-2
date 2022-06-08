import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useAuth0 } from "@auth0/auth0-react";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateReservation.css";

const CreateReservation = ({ restaurantName }) => {
  // const [restaurantName, setRestaurantName] = useState("");
  const [partySize, setPartySize] = useState("");
  const [date, setDate] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const addForm = { restaurantName, partySize, date };

    setIsPending(true);

    fetch("http://localhost:5001/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addForm),
    }).then(() => {
      console.log("new form added");
      setIsPending(false);
      navigate("/");
    });
  };

  const DatePickerInput = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        showTimeSelect
        dateFormat="Pp"
      />
    );
  };

  return (
    <>
      <div className="form-main-grid">
        <h1 className="reservation-title">Reserve {restaurantName}</h1>
        <div className="form-second-grid">
          <form className="reservation-form" onSubmit={handleSubmit}>
            <label className="label" htmlFor="guests">
              Number of guests
            </label>
            <input
              className="input"
              id="guests"
              value={partySize}
              onChange={(e) => setPartySize(e.target.value)}
              type="text"
              required
            />
            <label className="label" htmlFor="date">
              Date
            </label>

            <DatePickerInput />

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
