import { apiUrl } from "../config";
import './app.css';
const SignUp = () => {
    const buttonClick = async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const universityemail =
            document.getElementById("universityemail").value;
        const password = document.getElementById("password").value;
        const phone = document.getElementById("phone").value;
        const batch = document.getElementById("batch").value;
        const Major = document.getElementById("Major").value;
        const data = {
            name,
            email,
            universityemail,
            password,
            phone,
            batch,
            Major,
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
        <div>
            <h1>Sign Up</h1>
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
                    placeholder="Enter Your Personal Email"
                    id="email"
                    required={true}
                />
                <br />
                <input
                class="txtbox"
                    type="email"
                    placeholder="Enter Your University Email"
                    id="universityemail"
                    required={true}
                />
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
                    <option value="Computer Science">Computer Science</option>
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
                <button class="purplebtn" type="submit" onClick={buttonClick}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
