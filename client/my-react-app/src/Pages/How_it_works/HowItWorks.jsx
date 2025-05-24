import React from "react";
import {
  Users,
  Search,
  Home,
  CheckCircle,
} from "lucide-react";
import "./how_it_works.css";

const HowItWorks = () => {
  return (
    <div className="how-it-works-page">
      {/* Hero Section */}
      <section className="how-hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>
              How <span className="highlight">RoommateFinder</span> Works
            </h1>
            <p className="hero-subtitle">
              Finding your perfect roommate has never been easier. Follow our
              simple 3-step process to connect with compatible people.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <div className="container">
          <h2 className="section-title">Simple Steps to Find Your Match</h2>

          <div className="steps-grid">
            {/* Step 1 */}
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">
                <Users />
              </div>
              <h3>Create Your Profile</h3>
              <p>
                Sign up and create a detailed profile with your preferences,
                lifestyle habits, and what you're looking for in a roommate or
                living situation.
              </p>
            </div>

            {/* Step 2 */}
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">
                <Search />
              </div>
              <h3>Browse & Search</h3>
              <p>
                Use our smart filters to find listings or profiles that match
                your criteria. Search by location, budget, lifestyle
                preferences, and more.
              </p>
            </div>

            {/* Step 4 */}
            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-icon">
                <Home />
              </div>
              <h3>Move In Together</h3>
              <p>
                Once you've found the perfect match, coordinate your move-in
                details and start your new living arrangement with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Room Providers Section */}
      <section className="providers-section">
        <div className="container">
          <div className="providers-content">
            <div className="providers-text">
              <h2>For Room Providers</h2>
              <p className="section-subtitle">
                Have a place and looking for the right roommate? We make it easy
                to find trustworthy people.
              </p>
              <div className="features-list">
                <div className="feature-item">
                  <CheckCircle className="feature-icon" />
                  <span>Create detailed room listings with photos</span>
                </div>
                <div className="feature-item">
                  <CheckCircle className="feature-icon" />
                  <span>Set your preferences and requirements</span>
                </div>
                <div className="feature-item">
                  <CheckCircle className="feature-icon" />
                  <span>Review potential roommates' profiles</span>
                </div>
              </div>
            </div>
            <div className="providers-image">
              <div className="image-placeholder">
                <Home size={80} className="placeholder-icon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Room Seekers Section */}
      <section className="seekers-section">
        <div className="container">
          <div className="seekers-content">
            <div className="seekers-image">
              <div className="image-placeholder">
                <Search size={80} className="placeholder-icon" />
              </div>
            </div>
            <div className="seekers-text">
              <h2>For Room Seekers</h2>
              <p className="section-subtitle">
                Looking for a place to call home? Find rooms and compatible
                roommates in your area.
              </p>
              <div className="features-list">
                <div className="feature-item">
                  <CheckCircle className="feature-icon" />
                  <span>Browse verified room listings</span>
                </div>
                <div className="feature-item">
                  <CheckCircle className="feature-icon" />
                  <span>Filter by budget, location, and amenities</span>
                </div>
                <div className="feature-item">
                  <CheckCircle className="feature-icon" />
                  <span>Create a detailed seeker profile</span>
                </div>
                <div className="feature-item">
                  <CheckCircle className="feature-icon" />
                  <span>Connect with compatible room providers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Perfect Roommate?</h2>
            <p>
              Join thousands of users who have found their ideal living
              situation through RoommateFinder.
            </p>
            <div className="cta-buttons">
              <a href="/register" className="cta-btn primary">
                Get Started Today
              </a>
              <a href="/listings" className="cta-btn secondary">
                Browse Listings
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
