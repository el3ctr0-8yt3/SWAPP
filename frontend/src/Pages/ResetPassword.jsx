import { useEffect } from "react";
import { apiUrl } from "../config";
import { Link } from "react-router-dom";
import back from "../Components/Vector.svg";
import "./app.css";

const ResetPassword = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@st.habib.edu.pk$/;
    const resetPasswordHandler = async (e) => {
        e.preventDefault();
        const email = document.querySelector("input[type=email]").value;
        const data = { email };
        if (!emailRegex.test(email)) {
            alert("Invalid Email. Please use your Habib Student Email");
            return;
        }
        alert("Password reset link sent to your email: \n" + email);
        window.location.href = "/signin";
    };

    return (
        <div class="cont">
            <div class="box1">
                <div class="box2">
                    <Link to="/signin">
                        <img src={back}></img>
                    </Link>
                    <div class="closer">
                        <h1>
                            Forgot you password? <br /> No worries, reset it!
                        </h1>
                    </div>
                    <form>
                        <div class="form1">
                            <h2>Email</h2>
                            <input
                                class="txtbox"
                                type="email"
                                placeholder="Type Email"
                            />
                            <button
                                class="purplebtn"
                                type="submit"
                                onClick={resetPasswordHandler}
                            >
                                RESET PASSWORD
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
