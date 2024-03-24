import React from "react";

const OffersList = ({ offers }) => {
    if (offers.length === 0) {
        return <p>No offers available</p>;
    }
    return (
        <div>
            {offers.map((offer) => (
                <div key={offer._id}>
                    <p>
                        Offer ID: {offer._id} <br />
                        Course Offered: {offer.CourseOffer} <br />
                        Course Demanded: {offer.CourseDemand} <br />
                    </p>
                </div>
            ))}
        </div>
    );
};

export default OffersList;
