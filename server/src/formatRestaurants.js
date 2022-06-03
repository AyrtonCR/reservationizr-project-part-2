const formatRestaurant = (restaurant) => {
  const formattedRestaurant = {
    id: restaurant._id,
    name: restaurant.name,
    description: restaurant.description,
    image: restaurant.image,
  };
  return formattedRestaurant;
};
module.exports = formatRestaurant;
