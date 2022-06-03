import "./RestaurantList.css";
import { useState, useEffect } from "react";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5001/restaurants");
      const data = await response.json();
      setRestaurants(data);
    };
    fetchData();
  }, []);

  if (restaurants < 1) {
    return (
      <>
        <p className="no-restaurants-found">
          No restaurants were found, add a restaurant and it will display here!
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
                <li className="restaurant-image">{restaurant.image}</li>
                <li className="restaurant-title">{restaurant.title}</li>
                <li className="restaurant-description">
                  {restaurant.description}
                </li>
                <button>Reserve Now → </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default RestaurantList;
