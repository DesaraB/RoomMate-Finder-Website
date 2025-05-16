import React from 'react';
import './service.css';

const cardData = [
  {
    title: 'Create your profile',
    image: '/images/login.jpg',
  },
  {
    title: 'Set your preferences',
    image: '/images/signup.jpg',
  },
  {
    title: 'Find matches and connect with potential roommates',
    image: '/images/match.jpg',
  },
];

export const ServicesSection = () => {
  return (
    <div className="services">
      <h1>How it works</h1>
      <div className="services__container">
        {cardData.map((card, index) => (
          <div
            className="services__card"
            key={index}
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(17,17,17,0.6) 100%), url(${card.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <h2>{card.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
