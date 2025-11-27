import { Link } from "react-router-dom";
import { useState } from "react";
import "./home.css";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("Activities");
  const token = localStorage.getItem("token"); // check if logged in

  return (
    <div className="home-page">
      <div className="navbar">
        <button
          className={selectedTab === "Activities" ? "active" : ""}
          onClick={() => setSelectedTab("Activities")}
        >
          Activities
        </button>
        <button
          className={selectedTab === "Diet" ? "active" : ""}
          onClick={() => setSelectedTab("Diet")}
        >
          Diet
        </button>
        <button
          className={selectedTab === "Reviews" ? "active" : ""}
          onClick={() => setSelectedTab("Reviews")}
        >
          Reviews
        </button>
        <button
          className={selectedTab === "Contact" ? "active" : ""}
          onClick={() => setSelectedTab("Contact")}
        >
          Contact
        </button>
      </div>

      <div className="content-box">
        <h2>{selectedTab}</h2>
        {selectedTab === "Activities" && (
          <p>Heart Rate, Steps per day, Exercises.</p>
        )}
        {selectedTab === "Diet" && <p>Diet plans, calories, nutrients, etc.</p>}
        {selectedTab === "Reviews" && <p>Reviews content goes here.</p>}
        {selectedTab === "Contact" && <p>Contact content goes here.</p>}
      </div>

      {/* Show Login/Register only if NOT logged in */}
      {!token && (
        <div className="buttons">
          <Link to="/login" className="btn">
            Login
          </Link>
          <Link to="/register" className="btn">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
