import React from "react";
import "../Pages/app.css";
import whatsapp from "./logo.png";
import email from "./gmail.png";

const MatchedOffersList = ({ offers }) => {
    if (offers.length === 0) {
        return <p>No matching offers available</p>;
    }
    return (
        <div
            id=""
            style={{
                maxHeight: "350px",
                overflowY: "scroll",
            }}
        >
            {offers.map((offer) => (
                <div className="offer">
                    <b>Want:</b> {offer.OfferName}
                    <br />
                    <br />
                    <b>Have:</b> {offer.DemandName}
                    <br />
                    <br />
                    <b>Offer Matched With: </b> {offer.Name}
                    <br />
                    <br />
                    <b>Contact Details:</b> <br />
                    <br />
                    <a href={`https://wa.me/${offer.Phone}`}>
                        <img
                            src={whatsapp}
                            alt="whatsapp"
                            style={{ width: "50px" }}
                        />
                    </a>
                    <a href={`mailto:${offer.Email}`}>
                        <img
                            src={email}
                            alt="email"
                            style={{ width: "50px" }}
                        />
                    </a>
                </div>
            ))}
        </div>
    );
};

export default MatchedOffersList;
