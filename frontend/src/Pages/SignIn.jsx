import { useEffect } from "react";
import { apiUrl } from "../config";
import { Link } from "react-router-dom";
import back from '../Components/Vector.svg'
import './app.css';
import hand from '../Components/noto_waving-hand.png'
const SignIn = () => {
    const signInUser = async (email, password) => {
        const data = { email, password };
        try {
            const response = await fetch(apiUrl + "/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log("Login successful", jsonResponse);
                const token = jsonResponse.token;
                localStorage.setItem("token", token);
                window.location.href = "/dashboard";
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            window.location.href = "/dashboard";
        }
    }, []);

    const handleSignIn = async (e) => {
        e.preventDefault();
        const email = document.querySelector("input[type=email]").value;
        const password = document.querySelector("input[type=password]").value;
        signInUser(email, password);
    };

    return (
        <div class="cont">
        <div class="box1">
        <div class="box2">
        <Link to="/"><img src={back}></img></Link>
            <div id="closer">
            <h1>Hi, Welcome Back ! <img src={hand}/></h1>
            
            </div>
            <form>
            <div class='form1'>
                <h2>Email</h2>
                <input class="txtbox" type="email" placeholder="Type Email" />
                <h2>Password</h2>
                <input class="txtbox" type="password" placeholder="Type Password" />
                <button class="purplebtn" type="submit" onClick={handleSignIn}>
                    LOGIN
                </button>
                <p>Don't have an account? <Link to="/signup">Sign-up</Link>  </p>
                </div>
            </form>
            
        </div>
        </div></div>
    );
};

export default SignIn;
