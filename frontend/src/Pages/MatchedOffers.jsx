import { useState, useEffect } from "react";
import { apiUrl } from "../config";
import { Link } from "react-router-dom";
import back from "../Components/Vector.svg";
import MatchedOffersList from "../Components/MatchedOffersList";

const MatchedOffers = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [user, setUser] = useState({});
    const [offers, setOffers] = useState([]);

    const getOffers = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${apiUrl}/match`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setOffers(data);
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

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsAuthenticated(false);
        } else {
            getUser();
            getOffers();
        }
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            setTimeout(() => {
                window.location.href = "/";
            }, 3000);
        }
    }, [isAuthenticated]);

    return (
        <div class="box1">
            <div class="box2">
                <Link to="/">
                    <img src={back}></img>
                </Link>
                <div class="closer cen">
                    <h1>Matched Offers</h1>
                </div>
                <div>
                    {isAuthenticated ? (
                        <>
                            <h2 id="l">Matched Offers List</h2>
                            <MatchedOffersList offers={offers} />
                        </>
                    ) : (
                        <h2>Please Log-in !</h2>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MatchedOffers;
