import { useEffect } from "react";
import { apiUrl } from "../config";

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
        <div>
            <h1>Sign In</h1>
            <form>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit" onClick={handleSignIn}>
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignIn;
