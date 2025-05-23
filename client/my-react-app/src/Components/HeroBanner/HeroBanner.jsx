import React from "react";
import { Link } from "react-router-dom";
import "./hero-banner.css";

export const HeroBanner = () => {
  return (
    <div className="hero__container">
      {/* Background Image */}
      <img src="/images/bedroom.jpg" alt="Roommate" className="bg-image" />

      {/* Main Content - Title and Description */}
      <div className="main__content">
        <h2>Find Your Perfect RoomMate Today</h2>
        <p>
          Whether you have a place or need one, RoomMateFinder connects you with
          compatible roommates based on lifestyle, preferences, and location.
        </p>

        {/* Hero Cards Section */}
        <div className="hero__cards">
          {/* Left Card - Need a roommate */}
          <div className="hero__card">
            <div className="hero__overlay hero__overlay--teal"></div>
            <div className="hero__content">
              <div className="hero__illustration">
                <div className="person-illustration">
                  <div className="person-head"></div>
                  <div className="person-body"></div>
                  <div className="person-legs"></div>
                </div>
              </div>
              <h3 className="hero__title">Need a roommate?</h3>
              <Link to="/create-listing" className="hero__btn hero__btn--teal">
                List your room →
              </Link>
            </div>
          </div>

          {/* Right Card - Looking for a place */}
          <div className="hero__card">
            <div className="hero__overlay hero__overlay--orange"></div>
            <div className="hero__content">
              <div className="hero__illustration">
                <div className="house-illustration">
                  <div className="house-roof"></div>
                  <div className="house-body"></div>
                  <div className="house-windows"></div>
                  <div className="house-door"></div>
                </div>
                <div className="location-pin"></div>
              </div>
              <h3 className="hero__title">Looking for a place?</h3>
              <Link to="/listings" className="hero__btn hero__btn--orange">
                Create your profile →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
