import './Body.css';
import RestaurantCard from './RestaurantCard';
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

function Body() {

  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setsearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.2128808&lng=73.15303109999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );

      const json = await data.json();

      const restaurants =
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle.restaurants;

      setListOfRestaurant(restaurants || []);
      setFilteredRestaurant(restaurants || []);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Show shimmer until data loads
  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className='body'>
      <div className='filter'>

        {/* SEARCH SECTION */}
        <div className='search'>
          <input
            type='text'
            className='search-box'
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
            placeholder="Search restaurants..."
          />

          <button
            onClick={() => {
              const filteredData = listOfRestaurants.filter((res) =>
                res.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filteredData);
            }}
          >
            Search
          </button>
        </div>

        {/* TOP RATED FILTER */}
        <button
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.5
            );

            setFilteredRestaurant(filteredList);
          }}
          className='filter-btn'
        >
          Top Rated Restaurants
        </button>

        {/* CLEAR FILTER BUTTON */}
        <button
          onClick={() => {
            setFilteredRestaurant(listOfRestaurants);
            setsearchText("");
          }}
          className='filter-btn'
        >
          Clear Filters
        </button>

      </div>

      {/* RESTAURANT CARDS */}
      <div className='res-container'>
        {filteredRestaurant.map((restaurant) => (
          <RestaurantCard
            key={restaurant.info.id}
            resData={restaurant}
          />
        ))}
      </div>
    </div>
  );
}

export default Body;