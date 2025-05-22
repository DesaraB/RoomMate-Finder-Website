import React from "react";
import "./service.css";

const cardData = [
  {
    title: "Create your profile",
    description:
      "Sign up and build your complete profile highlighting your lifestyle, habits, and what you're looking for in a roommate.",
    image: "/images/login.jpg",
  },
  {
    title: "Set your preferences",
    description:
      "Specify your budget, location preferences, move-in date, and other important criteria to find suitable matches.",
    image: "/images/signup.jpg",
  },
  {
    title: "Find matches and connect",
    description:
      "Browse compatible roommates, message potential matches, and arrange meetings to find your ideal living partner.",
    image: "/images/match.jpg",
  },
];

export const ServicesSection = () => {
  return (
    <div className="services">
      <h1>How it works?</h1>
      <p>Simple steps to find your ideal living situation</p>
      <div className="services__container">
        {cardData.map((card, index) => (
          <div className="services__card-wrapper" key={index}>
            <h2 className="services__title">{card.title}</h2>
            <div
              className="services__card"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(17,17,17,0.6) 100%), url(${card.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <p className="card__description">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="services__learn-more">
        <a href="/how-it-works" className="learn-more-link">
          Learn more about our process <span className="arrow">→</span>
        </a>
      </div>
    </div>
  );
};
