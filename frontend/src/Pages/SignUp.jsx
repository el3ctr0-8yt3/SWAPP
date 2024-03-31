import { apiUrl } from "../config";
import { Link } from "react-router-dom";
import "./app.css";
import back from "../Components/Vector.svg";
const SignUp = () => {
    const sendOTP = async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const data = {
            email,
        };
        try {
            const response = await fetch(apiUrl + "/otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log("OTP sent", jsonResponse);
            } else {
                console.error("OTP failed");
            }
        } catch (error) {
            console.error("OTP failed", error);
        }
    };

    const buttonClick = async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const phone = document.getElementById("phone").value;
        const batch = document.getElementById("batch").value;
        const Major = document.getElementById("Major").value;
        const otp = document.getElementById("otp").value;
        const data = {
            name,
            email,
            password,
            phone,
            batch,
            Major,
            otp,
        };
        try {
            const response = await fetch(apiUrl + "/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log("Sign Up successful", jsonResponse);
                window.location.href = "/signin";
            } else {
                console.error("Sign Up failed");
            }
        } catch (error) {
            console.error("Sign Up failed", error);
        }
    };
    return (
        
        <div class="box1">
            <div class="box2">
                <Link to="/">
                    <img src={back}></img>
                </Link>
                <div id="closer">
                    <h1>Create Account</h1>
                    <h2>Create your account & start Swapping !</h2>
                </div>
                <form>
                    <input
                        class="txtbox"
                        type="text"
                        placeholder="Enter Your Full Name"
                        id="name"
                        required={true}
                    />
                    <br />
                    <input
                        class="txtbox"
                        type="email"
                        placeholder="Enter Your Habib Email"
                        id="email"
                        required={true}
                    />
                    <br />
                    <input
                        class="txtbox otp"
                        type="number"
                        placeholder="Enter OTP sent to your email"
                        id="otp"
                        required={true}
                    />
                    <button class="otp-btn" onClick={sendOTP}>
                        Send OTP
                    </button>
                    <br />
                    <input
                        class="txtbox"
                        type="password"
                        placeholder="Create a Secure Password"
                        id="password"
                        required={true}
                    />
                    <br />
                    <input
                        class="txtbox"
                        type="number"
                        placeholder="Enter Your Phone Number"
                        id="phone"
                        required={true}
                    />
                    <br />
                    <input
                        class="txtbox"
                        type="number"
                        placeholder="Enter Your Batch Year (e.g. 2020)"
                        id="batch"
                        required={true}
                    />
                    <br />
                    <select id="Major" class="txtbox">
                        <option value="Computer Science">
                            Computer Science
                        </option>
                        <option value="Computer Engineering">
                            Computer Engineering
                        </option>
                        <option value="Electrical Engineering">
                            Electrical Engineering
                        </option>
                        <option value="Social Development and Policy">
                            Social Development and Policy
                        </option>
                        <option value="Comparitive Humanities">
                            Comparitive Humanities
                        </option>
                        <option value="Communication and Design">
                            Communication and Design
                        </option>
                    </select>
                    <br />
                    <button
                        class="purplebtn"
                        type="submit"
                        onClick={buttonClick}
                    >
                        Create Account !
                    </button>
                    <p>
                        Already have an account?{" "}
                        <Link to="/signin">Log-in</Link>{" "}
                    </p>
                </form>
            </div>
        </div>
        
    );
};

export default SignUp;
