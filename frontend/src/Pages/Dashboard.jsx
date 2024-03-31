import { useState, useEffect } from "react";
import { apiUrl } from "../config";
import { Link } from "react-router-dom";
import back from "../Components/Vector.svg";
import OffersList from "../Components/OffersList";

const Dashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [user, setUser] = useState({});
    const [offers, setOffers] = useState([]);
    const [myOffers, setMyOffers] = useState([]);

    const getOffers = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${apiUrl}/offers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setOffers(data);
    };

    const getMyOffers = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${apiUrl}/offers/myoffers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
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

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsAuthenticated(false);
        } else {
            getUser();
            getOffers();
            getMyOffers();
        }
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            setTimeout(() => {
                window.location.href = "/";
            }, 3000);
        }
    }, [isAuthenticated]);

    const signout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div class="box1">
            <div class="box2">
                <Link onClick={signout} to="/">
                    <img src={back}></img>
                </Link>
                <div class="closer cen">
                    <h1>Browse Offers</h1>
                </div>
                <div>
                    {isAuthenticated ? (
                        <>
                            <div id="wide">
                                <h2 id="l">Welcome, {user.name} !</h2>
                                <div id="button-box">
                                    <button class="greenbtn">
                                        <Link to="/createoffer">New Offer</Link>
                                    </button>
                                    <button class="greenbtn red">
                                        <Link to="/deleteoffer">
                                            Delete Offer
                                        </Link>
                                    </button>
                                </div>
                            </div>
                            {/* <button onClick={signout}>Sign Out</button> */}
                            <h2 id="l">Offers List</h2>
                            <OffersList offers={offers} />
                            <h2 id="l">My Offers</h2>
                            <OffersList offers={myOffers} />
                        </>
                    ) : (
                        <h2>Please Log-in !</h2>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
