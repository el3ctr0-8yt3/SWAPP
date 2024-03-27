import React from "react";
import "../Pages/app.css";

const OffersList = ({ offers }) => {
    if (offers.length === 0) {
        return <p>No offers available</p>;
    }
    return (
        <div
            style={{
                maxHeight: "350px",
                overflowY: "scroll",
            }}
        >
            {offers.map((offer) => (
                <div className="offer">
                    {offer.CourseOfferer ? (
                        <>
                            <b>Offer By:</b> {offer.CourseOfferer} <br />
                        </>
                    ) : (
                        <></>
                    )}
                    <b>Offering Course:</b> {offer.CourseOfferCode}
                    &nbsp;-&nbsp;
                    {offer.CourseOfferName} <br />
                    &nbsp;&nbsp;&nbsp; Section: {offer.CourseOfferSection}
                    <br />
                    &nbsp;&nbsp;&nbsp; Timings: {offer.CourseOfferTimes}
                    <br />
                    <b>Demand Course:</b> {offer.CourseDemandCode}
                    &nbsp;-&nbsp;
                    {offer.CourseDemandName} <br />
                    &nbsp;&nbsp;&nbsp; Section: {offer.CourseDemandSection}
                    <br />
                    &nbsp;&nbsp;&nbsp; Timings: {offer.CourseDemandTimes}
                    <br />
                </div>
            ))}
        </div>
    );
};

export default OffersList;
