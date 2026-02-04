import './RestaurantCard.css'

function RestaurantCard(props){
    const { resData } = props;

    const {
        name,
        cuisines,
        avgRating,
        costForTwo,
        sla
    } = resData?.info;

    return(
        <>
            <div className="res-card">
                <h3>{name}</h3>

                <h4>{cuisines.join(", ")}</h4>

                <h4>Rating: {avgRating}</h4>

                <h4>{costForTwo}</h4>

                <h4>{sla?.deliveryTime} minutes</h4>
            </div>
        </>
    )
}

export default RestaurantCard
