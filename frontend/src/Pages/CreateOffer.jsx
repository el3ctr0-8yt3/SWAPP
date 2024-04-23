import { useState, useEffect } from "react";
import { apiUrl } from "../config";
import { Link } from "react-router-dom";
import back from "../Components/Vector.svg";

const CreateOffer = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [user, setUser] = useState({});
    const [course, setCourse] = useState([]);

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

    const getCourses = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${apiUrl}/course`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setCourse(data);
    };

    const createOfferHandler = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const courseoffercode =
            document.getElementById("courseoffercode").value;
        const coursedemandcode =
            document.getElementById("coursedemandcode").value;
        const response = await fetch(`${apiUrl}/offers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                email: user.email,
                Courseoffercode: courseoffercode,
                Coursedemandcode: coursedemandcode,
            }),
        });
        const data = await response.json();
        alert("Offer Created Successfully !");
        window.location.href = "/dashboard";
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsAuthenticated(false);
        } else {
            getUser();
            getCourses();
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
                        <h1>Make an Offer !</h1>
                        <div>
                            {isAuthenticated ? (
                                <>
                                    <br />
                                    <form>
                                        <div id="cd1">
                                            <h2 id="cdt">I Want</h2>
                                            <select
                                                class="txtbox"
                                                id="coursedemandcode"
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    selected
                                                    hidden
                                                >
                                                    Choose from Courses Catalog
                                                </option>
                                                {course.map((course) => (
                                                    <option
                                                        key={course._id}
                                                        value={course.code}
                                                    >
                                                        {course.code +
                                                            " - " +
                                                            course.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <br />
                                        <br />
                                        <div id="cd1">
                                            <h2 id="cdt">I am Offering</h2>
                                            <select
                                                class="txtbox"
                                                id="courseoffercode"
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    selected
                                                    hidden
                                                >
                                                    Choose from Courses Catalog
                                                </option>
                                                {course.map((course) => (
                                                    <option
                                                        key={course._id}
                                                        value={course.code}
                                                    >
                                                        {course.code +
                                                            " - " +
                                                            course.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <br />
                                        <br />
                                        <div id="cobtn">
                                            <button
                                                class="greenbtn big"
                                                type="submit"
                                                onClick={createOfferHandler}
                                            >
                                                Create Offer
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

export default CreateOffer;
