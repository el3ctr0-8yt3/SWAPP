import { useState, useEffect } from "react";
import { apiUrl } from "../config";
import { Link } from "react-router-dom";
import back from "../Components/Vector.svg";

const DeleteOffer = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [user, setUser] = useState({});
    const [myOffers, setMyOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState("");

    const getMyOffers = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${apiUrl}/offers/myoffers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setMyOffers(data);
        console.log(data);
    };

    const getUser = async () => {
        const token = localStorage.getItem("token");
        let userid = JSON.parse(atob(token.split(".")[1]))["userId"];
        const response = await fetch(`${apiUrl}/user/${userid}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setUser(data);
    };

    const deleteOfferHandler = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const offerId = selectedOffer.OfferId;
        const response = await fetch(`${apiUrl}/offers/${offerId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            alert("Offer Deleted Successfully!");
            getMyOffers();
            setSelectedOffer("");
        } else {
            alert("Failed to Delete Offer!");
            console.log(response);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsAuthenticated(false);
        } else {
            getUser();
            getMyOffers();
        }
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            setTimeout(() => {
                window.location.href = "/";
            }, 100);
        }
    }, [isAuthenticated]);

    return (
        <div class="cont">
            <div class="box1">
                <div class="box2">
                    <Link to="/dashboard">
                        <img src={back}></img>
                    </Link>
                    <div id="co1">
                        <h1>Delete Existing Offers !</h1>
                        <div>
                            {isAuthenticated ? (
                                <>
                                    <br />
                                    <form>
                                        <div id="cd1">
                                            <h2 id="cdt">Select Offer</h2>
                                            <select
                                                class="txtbox"
                                                id="selectedOffer"
                                                onChange={(e) =>
                                                    setSelectedOffer(
                                                        myOffers.find(
                                                            (offer) =>
                                                                offer.OfferId ===
                                                                e.target.value
                                                        )
                                                    )
                                                }
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    selected
                                                    hidden
                                                >
                                                    Choose from your Offers
                                                </option>
                                                {myOffers.map((offer) => (
                                                    <option
                                                        value={offer.OfferId}
                                                        key={offer.OfferId}
                                                    >
                                                        {offer.OfferId}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <br />
                                        <br />
                                        {selectedOffer && (
                                            <div id="deloffer-box">
                                                <div className="offer">
                                                    <b>Offering Course:</b>{" "}
                                                    {
                                                        selectedOffer.CourseOfferCode
                                                    }
                                                    &nbsp;-&nbsp;
                                                    {
                                                        selectedOffer.CourseOfferName
                                                    }{" "}
                                                    <br />
                                                    &nbsp;&nbsp;&nbsp; Section:{" "}
                                                    {
                                                        selectedOffer.CourseOfferSection
                                                    }
                                                    <br />
                                                    &nbsp;&nbsp;&nbsp; Timings:{" "}
                                                    {
                                                        selectedOffer.CourseOfferTimes
                                                    }
                                                    <br />
                                                    <b>Demand Course:</b>{" "}
                                                    {
                                                        selectedOffer.CourseDemandCode
                                                    }
                                                    &nbsp;-&nbsp;
                                                    {
                                                        selectedOffer.CourseDemandName
                                                    }{" "}
                                                    <br />
                                                    &nbsp;&nbsp;&nbsp; Section:{" "}
                                                    {
                                                        selectedOffer.CourseDemandSection
                                                    }
                                                    <br />
                                                    &nbsp;&nbsp;&nbsp; Timings:{" "}
                                                    {
                                                        selectedOffer.CourseDemandTimes
                                                    }
                                                    <br />
                                                </div>
                                            </div>
                                        )}
                                        <div id="cobtn">
                                            <button
                                                class="greenbtn red big"
                                                type="submit"
                                                onClick={deleteOfferHandler}
                                            >
                                                Delete Offer
                                            </button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <h2>Please Log-in !</h2>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteOffer;
