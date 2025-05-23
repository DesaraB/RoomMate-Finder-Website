import React from "react";
import { Users, Shield, Heart, Home, CheckCircle, Star } from "lucide-react";
import "./about-us.css";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>About <span className="highlight">RoommateFinder</span></h1>
            <p className="hero-subtitle">
              Connecting compatible roommates since 2023. Making your search for the perfect living situation simple, safe, and successful.
            </p>
          </div>
          <div className="hero-image">
            <div className="image-placeholder">
              <Home size={80} className="placeholder-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                RoommateFinder was born from a simple frustration: finding a good roommate shouldn't be this hard. 
                Our founders experienced firsthand the challenges of searching through endless classified ads, 
                dealing with unreliable people, and struggling to find someone who truly matched their lifestyle.
              </p>
              <p>
                We realized there had to be a better way - a platform designed specifically for roommate matching 
                that prioritizes compatibility, safety, and genuine connections. That's how RoommateFinder was created.
              </p>
            </div>
            <div className="story-stats">
              <div className="stat-item">
                <div className="stat-number">10,000+</div>
                <div className="stat-label">Happy Users</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5,000+</div>
                <div className="stat-label">Successful Matches</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">What Drives Us</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Users />
              </div>
              <h3>Community-Focused</h3>
              <p>Building connections that go beyond just sharing a space. We believe great roommates become great friends.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <Shield />
              </div>
              <h3>Safety-First</h3>
              <p>Implementing verification processes and safety features to create a trusted environment for everyone.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <Heart />
              </div>
              <h3>Compatibility-Driven</h3>
              <p>Matching based on lifestyle preferences, habits, and personalities for truly harmonious living.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How We're Different Section */}
      <section className="different-section">
        <div className="container">
          <div className="different-content">
            <div className="different-text">
              <h2>How We're Different</h2>
              <p className="section-subtitle">
                Unlike other platforms, we focus on what really matters for successful roommate relationships.
              </p>
              <div className="features-list">
                <div className="feature-item">
                  <CheckCircle className="feature-icon" />
                  <span>Detailed compatibility profiles</span>
                </div>
                <div className="feature-item">
                  <CheckCircle className="feature-icon" />
                  <span>Two-way matching system</span>
                </div>
                <div className="feature-item">
                  <CheckCircle className="feature-icon" />
                  <span>Secure messaging platform</span>
                </div>
                <div className="feature-item">
                  <CheckCircle className="feature-icon" />
                  <span>Identity verification</span>
                </div>
                <div className="feature-item">
                  <CheckCircle className="feature-icon" />
                  <span>Lifestyle preference matching</span>
                </div>
                <div className="feature-item">
                  <CheckCircle className="feature-icon" />
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
            <div className="different-image">
              <div className="image-placeholder">
                <Star size={60} className="placeholder-icon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="container">
          <div className="vision-content">
            <h2>Our Vision</h2>
            <p>
              We envision a world where finding a compatible roommate is a straightforward and positive experience. 
              We're continuously improving our platform based on user feedback to create better matches and smoother transitions.
            </p>
            <p>
              Whether you're relocating to a new city, looking to share your apartment, or simply seeking a change 
              in your living situation, RoommateFinder is designed to help you make the right connection.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Perfect Roommate?</h2>
            <p>Join thousands of users who have found their ideal living situation through RoommateFinder.</p>
            <div className="cta-buttons">
              <a href="/register" className="cta-btn primary">Get Started Today</a>
              <a href="/listings" className="cta-btn secondary">Browse Listings</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;