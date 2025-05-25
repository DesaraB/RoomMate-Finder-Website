import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./listings.css";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Filter states
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    roomType: ""
  });

  // Fetch listings from your API
  useEffect(() => {
    const fetchListings = async () => {
      try {
		const response = await fetch("http://localhost:3001/api/listings");
        if (response.ok) {
          const data = await response.json();
          setListings(data);
          setFilteredListings(data);
        } else {
          setError("Failed to load listings");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = listings;

    if (filters.location) {
      filtered = filtered.filter(listing => 
        listing.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(listing => 
        listing.price >= parseInt(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(listing => 
        listing.price <= parseInt(filters.maxPrice)
      );
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(listing => 
        listing.bedrooms === parseInt(filters.bedrooms)
      );
    }

    if (filters.roomType) {
      filtered = filtered.filter(listing => 
        listing.roomType === filters.roomType
      );
    }

    setFilteredListings(filtered);
  }, [filters, listings]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      roomType: ""
    });
  };

  if (isLoading) {
    return (
      <div className="listings-page">
        <div className="listings-container">
          <div className="loading-message">Loading listings...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="listings-page">
        <div className="listings-container">
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="listings-page">
      <div className="listings-container">
        <div className="listings-header">
          <h1>Available Listings</h1>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <h3>Filter Listings</h3>
          
          <div className="filter-grid">
            <div className="filter-group">
              <label>Location:</label>
              <input
                type="text"
                placeholder="Enter city or area"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>Min Price:</label>
              <input
                type="number"
                placeholder="Min $"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>Max Price:</label>
              <input
                type="number"
                placeholder="Max $"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>Bedrooms:</label>
              <select
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
              >
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Room Type:</label>
              <select
                value={filters.roomType}
                onChange={(e) => handleFilterChange("roomType", e.target.value)}
              >
                <option value="">Any</option>
                <option value="private">Private Room</option>
                <option value="shared">Shared Room</option>
                <option value="studio">Studio</option>
              </select>
            </div>
          </div>

          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>

        {/* Listings Grid */}
        <div className="listings-grid">
          {filteredListings.length === 0 ? (
            <div className="no-listings">
              <p>No listings found matching your criteria.</p>
            </div>
          ) : (
            filteredListings.map((listing) => (
              <div key={listing.id} className="listing-card">
                <div className="listing-image">
                  {listing.imageUrl ? (
                    <img src={listing.imageUrl} alt={listing.title} />
                  ) : (
                    <div className="placeholder-image">
                      <span>🏠</span>
                    </div>
                  )}
                  <div className="price-tag">
                    ${listing.price}/mo
                  </div>
                </div>
                
                <div className="listing-content">
                  <h3 className="listing-title">{listing.title}</h3>
                  
                  <div className="listing-location">
                    📍 {listing.location}
                  </div>
                  
                  <div className="listing-details">
                    <span className="room-type">
                      {listing.roomType === 'private' ? 'Private Room' : 
                       listing.roomType === 'shared' ? 'Shared Room' : 
                       listing.roomType === 'studio' ? 'Studio' : 'Room'}
                    </span>
                    <span className="bathroom-type">
                      {listing.privateBathroom ? 'Private Bathroom' : 'Shared Bathroom'}
                    </span>
                  </div>
                  
                  <div className="listing-description">
                    {listing.description}
                  </div>
                  
                  <Link to={`/listings/${listing.id}`} className="view-details-btn">
                    View Details →
                  </Link>
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