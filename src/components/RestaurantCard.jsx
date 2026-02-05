import './RestaurantCard.css'
import { CDN_URL } from "../utils/constants";
import fallbackImg from "../assets/no-image.png"

function RestaurantCard({ resData }) {

    const {
        name,
        cuisines,
        avgRating,
        costForTwo,
        sla,
        imageId
    } = resData?.info;

    return (
        <div className="res-card">

            <img
  className="res-logo"
  src={imageId ? CDN_URL + imageId : fallbackImg}
  alt="restaurant"
/>
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>Rating: {avgRating}</h4>
            <h4>{costForTwo}</h4>
            <h4>{sla?.deliveryTime} minutes</h4>
        </div>
    )
}

export default RestaurantCard