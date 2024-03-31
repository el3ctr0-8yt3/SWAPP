import React from "react";
import { Link } from "react-router-dom";
import './app.css';
import logo from '../Components/swapp.png'
import x from '../Components/1.png'
function Home() {
    return (
        <div class="cont">
            <div class="box12">
                <img class="x" src={x}></img>
            </div>
            <div class="box1">
                <div class="box2">
                
                    <div class="lgbox"><img class="lg" src={logo}></img></div>
                    
                    <h2 id='h'>Getting The Right Courses, Easier Than Ever !</h2>
                    
                    <div class="box3">
                        <button class='purplebtn'>
                            <Link to="/signin">Sign In</Link>
                        </button>
                        <hr style={{
                            width: "5rem"
                        }} />
                        <button class='purplebtn' id ="up" Link to="/signup">
                            <Link to="/signup">Sign Up</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
