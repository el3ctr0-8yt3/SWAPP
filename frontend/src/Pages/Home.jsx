import React from "react";
import { Link } from "react-router-dom";
import './app.css';
import logo from '../Components/swapp.png'
function Home() {
    return (
        <div class="box1">
        
        <div class="box2">
        <div class="lgbox"><img class="lg" src={logo}></img></div>
            
            <h2 id='h'>Getting the right courses, Easier than ever !</h2>
            <div class="box3">
            <button class='purplebtn'>
                <Link to="/signin">Sign In</Link>
            </button>
            <button class='purplebtn' Link to="/signup">
                <Link to="/signup">Sign Up</Link>
            </button>
            </div>
        </div>
        </div>
    );
}

export default Home;
