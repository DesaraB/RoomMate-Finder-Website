import React, { useState, useEffect } from "react";
import axios from "axios";
import "./listings.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  // Fetch listings on search input change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchSearchListings(searchQuery);
      } else {
        fetchListings();
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Fetch all listings
  const fetchListings = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/listings");
      const sortedListings = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setListings(sortedListings);
    } catch (err) {
      console.error("Failed to fetch listings", err);
    }
  };

  // Fetch filtered listings by search query
  const fetchSearchListings = async (query) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/listings/search?query=${encodeURIComponent(query)}`
      );
      const sortedListings = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setListings(sortedListings);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  // Apply for a room
  const handleApply = async (listingId) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/applications",
        { listingId },
        { withCredentials: true }
      );
      if (res.status === 201) alert("Application submitted successfully!");
    } catch (error) {
      alert("You may have already applied or are not logged in as a seeker.");
    }
  };

  // Save room to favorites
  const handleSave = async (listingId) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/interests",
        { listingId },
        { withCredentials: true }
      );
      if (res.status === 201) alert("Room saved successfully!");
    } catch (error) {
      alert("Room may already be saved or you're not a seeker.");
    }
  };

  return (
    <div className="listings-page">
      <div className="listings-container">
        <div className="listings-header">
          <h1>Available Listings</h1>
          <p>Find your perfect roommate or housing situation</p>
        </div>

        {/* 🔍 Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by location or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* 🏠 Listings Grid */}
        <div className="listings-grid">
          {listings.length === 0 ? (
            <p>No listings found.</p>
          ) : (
            listings.map((listing) => (
              <div key={listing.id} className="listing-card">
                <div className="listing-image">
                  <img
                    src={
                      listing.photo_url
                        ? `http://localhost:3001/${listing.photo_url}`
                        : "https://via.placeholder.com/600x400"
                    }
                    style={{
                      objectFit: listing.photo_url?.includes("wide_banner")
                        ? "contain"
                        : "cover",
                    }}
                    alt={listing.title}
                  />
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
                      onClick={() =>
                        listing.id && navigate(`/view-room/${listing.id}`)
                      }
                    >
                      View Details →
                    </button>
                    {authUser?.role === "seeker" && (
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
