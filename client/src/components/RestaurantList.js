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
        {/* <Link to="/add" className="button">
          Add a new property
        </Link> */}
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
                <h2 className="restaurant-name">{restaurant.name}</h2>
                <p className="restaurant-description">
                  {restaurant.description}
                </p>
                <button className="reserve-button">Reserve Now → </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default RestaurantList;
