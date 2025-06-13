import React, { useState, useEffect } from "react";
import axios from "axios";
import "./listings.css";
import { useNavigate } from "react-router-dom";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/listings", {
        withCredentials: true,
      });
      setListings(res.data);
    } catch (error) {
      console.error("Error fetching listings", error);
    }
  };

  return (
    <div className="listings-page">
      <div className="listings-container">
        <div className="listings-header">
          <h1>Available Listings</h1>
          <p>Find your perfect roommate or housing situation</p>
        </div>

        <div className="listings-grid">
          {listings.length === 0 ? (
            <p>No listings found.</p>
          ) : (
            listings.map((listing) => (
              <div key={listing.id} className="listing-card">
                <div className="listing-image">
                  <img src={listing.photo_url} alt={listing.title} />
                  <div className="price-tag">${listing.price}/mo</div>
                </div>

                <div className="listing-content">
                  <h3 className="listing-title">{listing.title}</h3>
                  <div className="listing-location">📍 {listing.location}</div>

                  <div className="listing-details">
                    <span>{listing.property_type}</span>
                    <span>{listing.bedrooms} Bedrooms</span>
                    <span>{listing.bathrooms} Bathrooms</span>
                  </div>

                  <div className="listing-description">
                    {listing.description}
                  </div>

                  <div className="provider-name">
                    <strong>Provider:</strong>{" "}
                    {listing.provider?.name || "Unknown"}
                  </div>

                  <div className="listing-actions">
                    <button
                      className="view-details-btn"
                      onClick={() => navigate(`/view-room/${listing.id}`)}
                    >
                      View Details →
                    </button>
                    <button
                      className="apply-btn"
                      onClick={() => navigate(`/view-room/${listing.id}`)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Listings;
