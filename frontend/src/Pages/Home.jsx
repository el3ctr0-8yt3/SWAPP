import React from "react";
import { Link } from "react-router-dom";
import './app.css';
function Home() {
    return (
        <div class="box1">
        <div class="box2">
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
        </div>
    );
}

export default Home;
