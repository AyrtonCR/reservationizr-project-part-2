import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateReservation from "./CreateReservation";
import "./Restaurant.css";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchUrl = `http://localhost:5001/restaurants/${id}`;
      const data = await fetchUrl.json();
      setRestaurant(data);
      setIsLoading(false);
      // FIXME: Make a fetch request and call setRestaurant with the response body
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <p>Loading please wait...</p>;
  }

  return (
    <>
      <CreateReservation restaurantName={restaurant.name} />
    </>
  );
};

export default Restaurant;
