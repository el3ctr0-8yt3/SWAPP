import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>SWAPP</h1>
            <p>Getting the right courses easier
than before !</p>
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
