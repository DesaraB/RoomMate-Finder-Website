import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./provider-dashboard.css";
import { useAuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProviderDashboard = () => {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  const amenityOptions = [
    { id: "wifi", label: "WiFi", icon: "📶" },
    { id: "parking", label: "Parking", icon: "🚗" },
    { id: "gym", label: "Gym", icon: "💪" },
    { id: "pool", label: "Pool", icon: "🏊" },
    { id: "ac", label: "Air Conditioning", icon: "❄️" },
    { id: "laundry", label: "Laundry", icon: "👔" },
    { id: "kitchen", label: "Kitchen", icon: "🍳" },
    { id: "pet-friendly", label: "Pet Friendly", icon: "🐕" },
  ];
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const handleAmenityToggle = (amenityId) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const providerData = {
    name: authUser.fullname || "Provider",
    profileImage: authUser.profile_picture_url
      ? `http://localhost:3001${authUser.profile_picture_url}`
      : "https://images.unsplash.com/photo-1494790108755-2616b612d1cf?w=100",
    totalListings: authUser.totalListings || 3,
    activeListings: authUser.activeListings || 2,
    totalApplications: authUser.totalApplications || 8,
    newApplications: authUser.newApplications || 3,
    monthlyEarnings: authUser.monthlyEarnings || 2400,
    totalEarnings: authUser.totalEarnings || 14500,
  };

  const [listings, setListings] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchListings = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/listings/provider/${authUser.id}`,
        { withCredentials: true }
      );
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  }, [authUser.id]);

  useEffect(() => {
    if (authUser?.id) {
      fetchListings();
    }
  }, [authUser?.id, fetchListings, showAddForm]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/applications/provider",
          { withCredentials: true }
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    if (authUser?.id) {
      fetchApplications();
    }
  }, [authUser?.id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
      case "accepted":
        return "#28a745";
      case "pending":
        return "#ffc107";
      case "declined":
        return "#dc3545";
      case "draft":
        return "#6c757d";
      default:
        return "#6c757d";
    }
  };

  const handleApplicationStatus = async (appId, status) => {
    try {
      await axios.put(
        `http://localhost:3001/api/applications/${appId}/status`,
        { status },
        { withCredentials: true }
      );
      const response = await axios.get(
        "http://localhost:3001/api/applications/provider",
        { withCredentials: true }
      );
      setApplications(response.data);
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const handleEdit = (listing) => {
    navigate(`/edit-room/${listing.id}`);
  };

  const handleViewSeekerProfile = (seekerId) => {
    navigate(`/seeker/${seekerId}`);
  };

  return (
    <div className="provider-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="welcome-section">
            <img
              src={providerData.profileImage}
              alt="Profile"
              className="profile-image"
            />
            <div className="welcome-text">
              <h1>Welcome back, {providerData.name}!</h1>
              <p>Manage your listings and connect with potential roommates</p>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* My Listings */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>My Listings</h3>
              <button
                className="add-btn"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? "Close Form" : "+ Add New Room"}
              </button>
            </div>

            {showAddForm && (
              <form
                className="add-room-form"
                onSubmit={async (e) => {
                  e.preventDefault();

                  const formData = new FormData();

                  // Append text fields
                  formData.append("title", e.target.title.value);
                  formData.append("description", e.target.description.value);
                  formData.append("location", e.target.location.value);
                  formData.append("price", e.target.price.value);
                  formData.append("bedrooms", e.target.bedrooms.value);
                  formData.append("bathrooms", e.target.bathrooms.value);
                  formData.append(
                    "property_type",
                    e.target.property_type.value
                  );
                  formData.append("amenities", selectedAmenities.join(","));
                  formData.append(
                    "available_from",
                    e.target.available_from.value
                  );
                  formData.append("lease_term", e.target.lease_term.value);
                  formData.append("provider_id", authUser.id);

                  // ✅ Append cover photo
                  const coverPhoto = e.target.cover_photo.files[0];
                  if (coverPhoto) {
                    formData.append("cover_photo", coverPhoto);
                  }

                  // ✅ Append gallery photos
                  const galleryFiles = e.target.gallery_photos.files;
                  for (let i = 0; i < galleryFiles.length; i++) {
                    formData.append("gallery_photos", galleryFiles[i]);
                  }

                  try {
                    await axios.post(
                      "http://localhost:3001/api/listings",
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                        withCredentials: true,
                      }
                    );

                    alert("Room added!");
                    e.target.reset();
                    setShowAddForm(false);
                    fetchListings();
                  } catch (err) {
                    console.error(
                      "Error adding room:",
                      err.response?.data || err.message
                    );
                    alert(
                      "Failed to add room: " +
                        (err.response?.data?.message || err.message)
                    );
                  }
                }}
              >
                <input name="title" placeholder="Room Title" required />
                <textarea
                  name="description"
                  placeholder="Description"
                  required
                />
                <input name="location" placeholder="Location" required />
                <input
                  name="price"
                  type="number"
                  placeholder="Rent"
                  step="0.01"
                  required
                />
                <input
                  name="bedrooms"
                  type="number"
                  placeholder="Bedrooms"
                  required
                />
                <input
                  name="bathrooms"
                  type="number"
                  step="0.5"
                  placeholder="Bathrooms"
                  required
                />
                <select name="property_type" required>
                  <option value="">Select Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="studio">Studio</option>
                </select>
                <div className="amenities-compact">
                  {amenityOptions.map((amenity) => (
                    <label
                      key={amenity.id}
                      className={`amenity-chip ${
                        selectedAmenities.includes(amenity.id) ? "selected" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity.id)}
                        onChange={() => handleAmenityToggle(amenity.id)}
                        style={{ display: "none" }}
                      />
                      <span className="amenity-icon">{amenity.icon}</span>
                      <span>{amenity.label}</span>
                    </label>
                  ))}
                </div>

                <input name="available_from" type="date" required />
                <input name="lease_term" placeholder="Lease Term" />
                <label>Cover Photo:</label>
                <input name="cover_photo" type="file" accept="image/*" />

                <label>Gallery Photos:</label>
                <input
                  name="gallery_photos"
                  type="file"
                  accept="image/*"
                  multiple
                />
                <button type="submit">Submit</button>
              </form>
            )}

            <div className="listings-list">
              {listings.length === 0 ? (
                <p>No listings yet.</p>
              ) : (
                [...listings]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((listing) => (
                    <div key={listing.id} className="listing-item">
                      <img
                        src={
                          listing.photo_url
                            ? `http://localhost:3001/${
                                listing.photo_url
                              }?t=${Date.now()}`
                            : "https://via.placeholder.com/300"
                        }
                        alt={listing.title}
                        className="listing-image"
                      />

                      {/* ✅ GALLERY PHOTOS */}
                      {listing.gallery_photos?.length > 0 && (
                        <div className="gallery-preview">
                          {listing.gallery_photos.map((img, i) => (
                            <img
                              key={i}
                              src={`http://localhost:3001/${img}`}
                              alt={`Gallery ${i}`}
                              className="gallery-thumbnail"
                            />
                          ))}
                        </div>
                      )}

                      <div className="listing-info">
                        <h4>{listing.title}</h4>
                        <p>${listing.price}/month</p>
                        <div className="listing-stats">
                          <span>{listing.views || 0} views</span>
                          <span>
                            {listing.applications?.length || 0} applications
                          </span>
                        </div>
                      </div>
                      <div className="listing-status">
                        <span
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor("active") }}
                        >
                          active
                        </span>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(listing)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Recent Applications */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Applications</h3>
              <span className="badge">{providerData.newApplications} new</span>
            </div>
            <div className="applications-list">
              {applications.length === 0 ? (
                <p>No recent applications.</p>
              ) : (
                applications.map((app) => (
                  <div key={app.id} className="application-item">
                    <img
                      src={
                        app.seeker?.profile_picture_url ||
                        "https://images.unsplash.com/photo-1494790108755-2616b612d1cf?w=60"
                      }
                      alt={app.seeker?.name || "Seeker"}
                      className="seeker-image"
                    />
                    <div className="application-info">
                      <h4
                        onClick={() => handleViewSeekerProfile(app.seeker?.id)}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {app.seeker?.name}
                      </h4>
                      <p>{app.listing?.title}</p>
                      <small>
                        Applied on{" "}
                        {new Date(app.createdAt).toLocaleDateString()} • Status:{" "}
                        {app.status}
                      </small>
                    </div>
                    <div className="application-actions">
                      <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(app.status) }}
                      >
                        {app.status}
                      </span>
                      {app.status === "pending" && (
                        <div className="action-buttons">
                          <button
                            className="accept-btn"
                            onClick={() =>
                              handleApplicationStatus(app.id, "accepted")
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="decline-btn"
                            onClick={() =>
                              handleApplicationStatus(app.id, "declined")
                            }
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
