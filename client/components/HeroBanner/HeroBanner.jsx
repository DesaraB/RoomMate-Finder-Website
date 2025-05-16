import React from "react";
import "./hero-banner.css";
import { Link } from "react-router-dom";

export const HeroBanner = () => {
  return (
      <div className="main__container">
        <div className="main__content">
          <h2>Find your ideal roommate in just a few clicks!</h2>
          <p>Use our filters to match your lifestyle, budget, and preferences.</p>
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
