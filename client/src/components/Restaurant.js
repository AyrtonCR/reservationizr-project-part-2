import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateReservation from "./CreateReservation";
import { useAuth0 } from "@auth0/auth0-react";
import "./Restaurant.css";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchUrl = await fetch(`http://localhost:5001/restaurants/${id}`);
      const data = await fetchUrl.json();
      setRestaurant(data);
      setIsLoading(false);
      // FIXME: Make a fetch request and call setRestaurant with the response body
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <p>Loading please wait...</p>;
  }

  return (
    <>
      <div className="restaurants-grid">
        <h1 className="main-title">Restaurant</h1>
        <ul className="restaurant-list">
          <li className="single-restaurant" key={restaurant.id}>
            <img
              className="restaurant-image"
              src={restaurant.image}
              alt={restaurant.address}
            />
            <div className="tablet-div-2">
              <h2 className="restaurant-name">{restaurant.name}</h2>
              <p className="restaurant-description">{restaurant.description}</p>
            </div>
          </li>
        </ul>
      </div>
      <CreateReservation restaurantName={restaurant.name} />
    </>
  );
};

export default Restaurant;
