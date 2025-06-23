import React, { useState, useEffect } from "react";
import axios from "axios";
import "./listings.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const res = await axios.get("http://localhost:3001/api/listings");

    // Sort by createdAt (descending) so newest listings come first
    const sortedListings = res.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setListings(sortedListings);
  };

  const handleApply = async (listingId) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/applications",
        { listingId },
        { withCredentials: true }
      );

      if (res.status === 201) {
        alert("Application submitted successfully!");
      }
    } catch (error) {
      console.error("Error applying to listing:", error);
      alert(
        "You may have already applied, or you're not logged in as a seeker."
      );
    }
  };

  const handleSave = async (listingId) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/interests",
        { listingId },
        { withCredentials: true }
      );

      if (res.status === 201) {
        alert("Room saved successfully!");
      }
    } catch (error) {
      console.error("Error saving room:", error);
      alert(
        "This room may already be saved or you're not logged in as a seeker."
      );
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
                    {listing.provider?.fullname || "Unknown"}
                  </div>

                  <div className="listing-actions">
                    <button
                      className="view-details-btn"
                      onClick={() => navigate(`/view-room/${listing.id}`)}
                    >
                      View Details →
                    </button>
                    {authUser.role === "seeker" && (
                      <>
                        <button
                          className="apply-btn"
                          onClick={() => handleApply(listing.id)}
                        >
                          Apply
                        </button>
                        <button
                          className="save-btn"
                          onClick={() => handleSave(listing.id)}
                        >
                          Save
                        </button>
                      </>
                    )}
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
