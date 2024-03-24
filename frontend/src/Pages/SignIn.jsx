import { useEffect } from "react";
import { apiUrl } from "../config";
import './app.css';

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
        <div class="box1">
            <h1>Hi, Welcome Back !</h1>
            <div class="box1">
            <form>
                <input class="txtbox" type="email" placeholder="Email" />
                <input class="txtbox" type="password" placeholder="Password" />
                <button class="purplebtn" type="submit" onClick={handleSignIn}>
                    SIGN IN
                </button>
                
            </form>
            </div>
        </div>
    );
};

export default SignIn;
