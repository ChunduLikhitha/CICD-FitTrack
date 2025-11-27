import React from "react";
import "./home.css"; // Importing the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Travel Booking</div>
      <ul className="nav-links">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Services</a>
        </li>
        <li>
          <a href="#">Destinations</a>
        </li>
        <li>
          <a href="#">Reviews</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
      <button className="login-btn">Login / Register</button>
    </nav>
  );
};

export default Navbar;
