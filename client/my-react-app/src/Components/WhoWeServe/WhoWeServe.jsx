import React from "react";
import { Link } from "react-router-dom";
import "./who-we-serve.css";

export const WhoWeServe = () => {
  return (
    <section className="who-we-serve">
      <div className="container">
        <h2 className="section-title">Who We Serve</h2>
        <p className="section-subtitle">
          RoommateFinder is built for everyone in the shared housing market
        </p>

        <div className="service-cards">
          <div className="service-card provider-card">
            <div className="card-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <h3>Room Providers</h3>
            <p>
              Have a spare room or looking for someone to share your space? List
              your property and find the perfect roommate.
            </p>
            <Link
              to="/create-listing"
              className="action-button provider-button"
            >
              List Your Space
            </Link>
          </div>

          <div className="service-card seeker-card">
            <div className="card-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h3>Room Seekers</h3>
            <p>
              Looking for a place to stay? Browse listings that match your
              criteria and connect with potential roommates.
            </p>
            <Link to="/listings" className="action-button seeker-button">
              Find a Room
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
