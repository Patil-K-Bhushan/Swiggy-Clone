import './Body.css';
import RestaurantCard from './RestaurantCard';
import resList from '../utils/mockData';
import { useState } from "react";

function Body(){

    const [listOfRestaurants, setListOfRestaurant] = useState(resList);

    return(
        <>
            <div className='body'>
                <div className='filter'>
                    <button 
                        onClick={() => {
                            const filteredList = listOfRestaurants.filter(
                                (res) => res.info.avgRating > 4.5
                            );
                            setListOfRestaurant(filteredList);
                        }} 
                        className='filter-btn'
                    >
                        Top Rated Restaurants
                    </button>
                </div>

                <div className='search'>Search</div>

                <div className='res-container'>
                    {listOfRestaurants.map((restaurant) => (
                        <RestaurantCard 
                            key={restaurant.info.id} 
                            resData={restaurant} 
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Body;
