import { useState, useEffect } from "react";
import { apiUrl } from "../config";
import { Link } from "react-router-dom";
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
        <>
            <h1>Dashboard</h1>
            <div>
                {isAuthenticated ? (
                    <>
                        <h2>Welcome, {user.name}</h2>
                        <button>
                            <Link to="/createoffer">Create Offer</Link>
                        </button>
                        <button onClick={signout}>Sign Out</button>
                        <h2>Offers List</h2>
                        <OffersList offers={offers} />
                        <h2>My Offers</h2>
                        <OffersList offers={myOffers} />
                    </>
                ) : (
                    <h2>You are not logged in</h2>
                )}
            </div>
        </>
    );
};

export default Dashboard;
