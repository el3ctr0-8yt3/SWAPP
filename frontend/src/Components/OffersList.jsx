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
            User: {offer.CourseOfferer} <br />
            Course Offered: {offer.CourseOfferName} <br />
            Course Demanded: {offer.CourseDemandName} <br />
          </p>
        </div>
      ))}
    </div>
  );
};

export default OffersList;
