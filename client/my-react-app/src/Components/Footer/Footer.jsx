import React from "react";
import "./footer.css";
export const Footer = () => {
  return (
    <div class="footer__container">
        <div className="wrapper">
        <div class="footer__logo">
        <a href="/" id="footer__logo">
          <i class="fas faa-gem"></i>RoomMate Finder
        </a>
      </div>
        </div>
      
      <div class="footer__links">
        <div class="footer__link--wrapper">
          <div class="footer__link--items">
            <h2>Company</h2>
            <a href="/">How it works</a>
            <a href="/">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
          <div class="footer__link--items">
            <h2>Resources</h2>
            <a href="/">Support</a>
            <a href="/">Sponsorships</a>
            <a href="/">Testimonals</a>
          </div>
        </div>
        <div class="footer__link--wrapper">
          <div class="footer__link--items">
            <h2>Community</h2>
            <a href="/">Submit Video</a>
            <a href="/">Ambassadors</a>
            <a href="/">Agency</a>
            <a href="/">influencer</a>
          </div>
          <div class="footer__link--items">
            <h2>Social Media</h2>
            <a href="/">Instagram</a>
            <a href="/">Facebook</a>
            <a href="/">Youtube</a>
            <a href="/">Twitter</a>
          </div>
        </div>
      </div>

      <p class="webside__right">© RoomMate Finder 2025. All rights reserved</p>
    </div>
  );
};
