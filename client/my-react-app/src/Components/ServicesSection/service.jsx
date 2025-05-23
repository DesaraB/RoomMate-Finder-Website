import React from "react";
import { Search, MessageCircle, Home } from "lucide-react";
import "./service.css";

const cardData = [
  {
    title: "Search",
    description:
      "Browse listings to find places that match your preferences, or create a profile to be found by room providers.",
    icon: Search,
  },
  {
    title: "Connect",
    description:
      "Reach out to potential roommates through our secure messaging system to ask questions and arrange viewings.",
    icon: MessageCircle,
  },
  {
    title: "Move In",
    description:
      "Finalize your arrangements and begin your new living situation with confidence and clarity.",
    icon: Home,
  },
];

export const ServicesSection = () => {
  return (
    <div className="services">
      <h1>How It Works</h1>
      <p>Simple steps to find your ideal living situation</p>
      <div className="services__container">
        {cardData.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div className="services__card" key={index}>
              <div className="icon__wrapper">
                <IconComponent className="service__icon" />
              </div>
              <h2 className="services__title">{card.title}</h2>
              <p className="card__description">{card.description}</p>
            </div>
          );
        })}
      </div>

      <div className="services__learn-more">
        <a href="/how-it-works" className="learn-more-link">
          Learn more about our process <span className="arrow">→</span>
        </a>
      </div>
    </div>
  );
};
