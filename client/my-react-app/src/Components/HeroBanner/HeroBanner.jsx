import React from "react";
import "./hero-banner.css";
import { Link } from "react-router-dom";

export const HeroBanner = () => {
  return (
      <div className="main__container">
        <div className="main__content">
          <h2>Find Your Perfect RoomMate Today</h2>
          <p>Whether you have a place or need one, RoomMateFinder connects you with compatible roommates based on lifestyle, preferences, and location.</p>
          <button className="main__btn">
            <Link to="/register">Get Started</Link>
          </button>
        </div>
        <div className="main__img--container">
          <img src="/images/pic1.svg" alt="Roommate" id="main__img" />
        </div>
      </div>
  );
};
