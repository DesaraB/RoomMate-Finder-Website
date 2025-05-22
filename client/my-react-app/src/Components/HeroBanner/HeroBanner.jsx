import React from "react";
import { Link } from "react-router-dom"; // ✅ fix the error
import "./hero-banner.css";
export const HeroBanner = () => {
  return (
    <div className="main__container">
      <img src="/images/bedroom.jpg" alt="Roommate" className="bg-image" />
      <div className="main__content">
        <h2>Find Your Perfect RoomMate Today</h2>
        <p>
          Whether you have a place or need one, RoomMateFinder connects you
          with compatible roommates based on lifestyle, preferences, and
          location.
        </p>
        <button className="main__btn">
          <Link to="/register">Get Started</Link>
        </button>
      </div>
    </div>
  );
};
