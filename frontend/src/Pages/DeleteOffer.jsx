import { useState, useEffect } from "react";
import { apiUrl } from "../config";
import { Link } from "react-router-dom";
import back from "../Components/Vector.png";

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
        data.unshift({ _id: "Select Offer" });
        setMyOffers(data);
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
        <div class="box1">
            <div class="box2">
                <Link to="/dashboard">
                    <img src={back}></img>
                </Link>
                <h1>Delete Offer</h1>
                <div>
                    {isAuthenticated ? (
                        <>
                            <br />
                            <form>
                                <span>
                                    <h2>Select the Offer to Delete:</h2>
                                </span>
                                <select
                                    class="txtbox"
                                    id="offer"
                                    name="offer"
                                    onChange={(e) =>
                                        setSelectedOffer(e.target.value)
                                    }
                                >
                                    {myOffers.map((offer) => (
                                        <option value={offer._id}>
                                            {offer._id}
                                        </option>
                                    ))}
                                </select>
                                <br />
                                <br />
                                <button
                                    class="purplebtn"
                                    type="submit"
                                    onClick={deleteOfferHandler}
                                >
                                    Delete Offer
                                </button>
                            </form>
                        </>
                    ) : (
                        <h2>Please Log-in !</h2>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeleteOffer;
