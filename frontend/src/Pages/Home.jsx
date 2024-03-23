import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Landing Page</h1>
            <p>Welcome to the home page</p>
            <button>
                <Link to="/signin">Sign In</Link>
            </button>
            <button>
                <Link to="/signup">Sign Up</Link>
            </button>
        </div>
    );
}

export default Home;
