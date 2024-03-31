import { useState, useEffect } from "react";
import { apiUrl } from "../config";
import { Link } from "react-router-dom";
import back from "../Components/Vector.svg";

const CreateOffer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({});
  const [course, setCourse] = useState([]);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    let userid = JSON.parse(atob(token.split(".")[1]))["userId"];
    const response = await fetch(`${apiUrl}/user/${userid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUser(data);
  };

  const getCourses = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/course`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setCourse(data);
  };

  const createOfferHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const courseoffercode = document.getElementById("courseoffercode").value;
    const coursedemandcode = document.getElementById("coursedemandcode").value;
    const response = await fetch(`${apiUrl}/offers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: user.email,
        Courseoffercode: courseoffercode,
        Coursedemandcode: coursedemandcode,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
    } else {
      getUser();
      getCourses();
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    }
  }, [isAuthenticated]);

  return (
    <div class="cont">
      <div class="box1">
        <div class="box2">
          <Link to="/dashboard">
            <img src={back}></img>
          </Link>
          <h1>Create Offer</h1>
          <div>
            {isAuthenticated ? (
              <>
                <br />
                <form>
                  <span>
                    <h2>I Want :</h2>
                  </span>
                  <select class="txtbox" id="coursedemandcode">
                    {course.map((course) => (
                      <option
                        key={course._id}
                        value={course.code}
                      >
                        {course.code + " - " + course.name}
                      </option>
                    ))}
                  </select>
                  <br />
                  <br />
                  <span>
                    <h2>I am Offering :</h2>
                  </span>
                  <select class="txtbox" id="courseoffercode">
                    {course.map((course) => (
                      <option
                        key={course._id}
                        value={course.code}
                      >
                        {course.code + " - " + course.name}
                      </option>
                    ))}
                  </select>
                  <br />
                  <br />
                  <button
                    class="purplebtn"
                    type="submit"
                    onClick={createOfferHandler}
                  >
                    Create Offer !
                  </button>
                </form>
              </>
            ) : (
              <h2>Please Log-in !</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOffer;
