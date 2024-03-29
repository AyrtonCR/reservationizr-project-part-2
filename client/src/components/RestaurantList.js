import "./RestaurantList.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/restaurants`
      );
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
                    <Link
                      to={`/restaurants/${restaurant.id}`}
                      className="reserve-button"
                    >
                      Reserve Now →{" "}
                    </Link>
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
