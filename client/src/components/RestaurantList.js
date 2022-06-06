import "./RestaurantList.css";
import { useState, useEffect } from "react";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5001/restaurants");
      const data = await response.json();
      setRestaurants(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading please wait...</p>;
  }
  if (restaurants.length < 1) {
    return (
      <>
        <p className="no-restaurants-found">
          Sorry, no restaurants were found...
        </p>
      </>
    );
  }

  return (
    <>
      <div className="restaurants-grid">
        <h1 className="main-title">Restaurants</h1>
        <ul className="restaurant-list">
          {restaurants.map((restaurant) => {
            return (
              <li className="single-restaurant" key={restaurant.id}>
                <img
                  className="restaurant-image"
                  src={restaurant.image}
                  alt={restaurant.address}
                />
                <div className="tablet-div-1">
                  <h2 className="restaurant-name">{restaurant.name}</h2>
                  <p className="restaurant-description">
                    {restaurant.description}
                  </p>
                  <div className="button-mover">
                    <button className="reserve-button">Reserve Now → </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default RestaurantList;
