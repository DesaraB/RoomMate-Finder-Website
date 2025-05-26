import React, { useState, useEffect } from "react";
import "./listings.css";
// eslint-disable-next-line
const Listings = () => {
  // Sample listings data for visual display
  const sampleListings = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      location: "Downtown",
      price: 1200,
      bedrooms: 2,
      roomType: "private",
      privateBathroom: true,
      description:
        "Beautiful modern apartment in the heart of downtown. Perfect for working professionals.",
      imageUrl:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
    },
    {
      id: 2,
      title: "Cozy Studio Near University",
      location: "University District",
      price: 800,
      bedrooms: 1,
      roomType: "studio",
      privateBathroom: false,
      description:
        "Perfect for students! Walking distance to campus and public transportation.",
      imageUrl:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400",
    },
    {
      id: 3,
      title: "Shared House with Garden",
      location: "Suburbs",
      price: 600,
      bedrooms: 3,
      roomType: "shared",
      privateBathroom: false,
      description: "Friendly roommates, beautiful garden, quiet neighborhood.",
      imageUrl:
        "https://images.unsplash.com/photo-1448630360428-65456885c650?w=400",
    },
    {
      id: 4,
      title: "Luxury Loft",
      location: "City Center",
      price: 1800,
      bedrooms: 2,
      roomType: "private",
      privateBathroom: true,
      description:
        "High-end loft with amazing city views and modern amenities.",
      imageUrl:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
    },
    {
      id: 5,
      title: "Bright Studio Apartment",
      location: "Midtown",
      price: 950,
      bedrooms: 1,
      roomType: "studio",
      privateBathroom: true,
      description:
        "Bright and airy studio with large windows and modern kitchen.",
      imageUrl:
        "https://images.unsplash.com/photo-1560448075-bb485b067938?w=400",
    },
    {
      id: 6,
      title: "Family Home Room",
      location: "Residential Area",
      price: 700,
      bedrooms: 4,
      roomType: "private",
      privateBathroom: false,
      description:
        "Comfortable room in a family home with access to common areas.",
      imageUrl:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    },
  ];

  const [filteredListings, setFilteredListings] = useState(sampleListings);

  // Filter states
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    roomType: "",
  });

  // Apply filters when they change
  useEffect(() => {
    let filtered = sampleListings;

    if (filters.location) {
      filtered = filtered.filter((listing) =>
        listing.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(
        (listing) => listing.price >= parseInt(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(
        (listing) => listing.price <= parseInt(filters.maxPrice)
      );
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(
        (listing) => listing.bedrooms === parseInt(filters.bedrooms)
      );
    }

    if (filters.roomType) {
      filtered = filtered.filter(
        (listing) => listing.roomType === filters.roomType
      );
    }

    setFilteredListings(filtered);
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      roomType: "",
    });
  };

  return (
    <div className="listings-page">
      <div className="listings-container">
        <div className="listings-header">
          <h1>Available Listings</h1>
          <p>Find your perfect roommate or housing situation</p>
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
                  <img src={listing.imageUrl} alt={listing.title} />
                  <div className="price-tag">${listing.price}/mo</div>
                </div>

                <div className="listing-content">
                  <h3 className="listing-title">{listing.title}</h3>

                  <div className="listing-location">📍 {listing.location}</div>

                  <div className="listing-details">
                    <span className="room-type">
                      {listing.roomType === "private"
                        ? "Private Room"
                        : listing.roomType === "shared"
                        ? "Shared Room"
                        : listing.roomType === "studio"
                        ? "Studio"
                        : "Room"}
                    </span>
                    <span className="bathroom-type">
                      {listing.privateBathroom
                        ? "Private Bathroom"
                        : "Shared Bathroom"}
                    </span>
                    <span className="bedrooms">
                      {listing.bedrooms}{" "}
                      {listing.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                    </span>
                  </div>

                  <div className="listing-description">
                    {listing.description}
                  </div>

                  <button className="view-details-btn">View Details →</button>
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
