import React, { useState } from "react";
import "./provider-dashboard.css";

const ProviderDashboard = () => {
  // Sample data for provider dashboard
  const [providerData] = useState({
    name: "John Smith",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    totalListings: 3,
    activeListings: 2,
    totalApplications: 8,
    newApplications: 3,
    monthlyEarnings: 2400,
    totalEarnings: 14500,
  });

  const [listings] = useState([
    {
      id: 1,
      title: "Modern Downtown Apartment",
      price: 1200,
      status: "active",
      views: 156,
      applications: 5,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300",
    },
    {
      id: 2,
      title: "Cozy Studio Near University",
      price: 800,
      status: "active",
      views: 89,
      applications: 3,
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300",
    },
    {
      id: 3,
      title: "Luxury Loft with City View",
      price: 1800,
      status: "draft",
      views: 0,
      applications: 0,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300",
    },
  ]);

  const [applications] = useState([
    {
      id: 1,
      seekerName: "Sarah Johnson",
      seekerImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612d1cf?w=60",
      listingTitle: "Modern Downtown Apartment",
      status: "pending",
      appliedDate: "2 days ago",
      budget: "$1200",
    },
    {
      id: 2,
      seekerName: "Mike Chen",
      seekerImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60",
      listingTitle: "Modern Downtown Apartment",
      status: "pending",
      appliedDate: "3 days ago",
      budget: "$1200",
    },
    {
      id: 3,
      seekerName: "Emily Davis",
      seekerImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60",
      listingTitle: "Cozy Studio Near University",
      status: "accepted",
      appliedDate: "1 week ago",
      budget: "$800",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#28a745";
      case "pending":
        return "#ffc107";
      case "accepted":
        return "#28a745";
      case "draft":
        return "#6c757d";
      default:
        return "#6c757d";
    }
  };

  return (
    <div className="provider-dashboard">
      <div className="dashboard-container">
        {/* Header */}
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

        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* My Listings */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>My Listings</h3>
              <button className="add-btn">+ Add New Room</button>
            </div>
            <div className="listings-list">
              {listings.map((listing) => (
                <div key={listing.id} className="listing-item">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="listing-image"
                  />
                  <div className="listing-info">
                    <h4>{listing.title}</h4>
                    <p>${listing.price}/month</p>
                    <div className="listing-stats">
                      <span>{listing.views} views</span>
                      <span>{listing.applications} applications</span>
                    </div>
                  </div>
                  <div className="listing-status">
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: getStatusColor(listing.status),
                      }}
                    >
                      {listing.status}
                    </span>
                    <button className="edit-btn">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Applications</h3>
              <span className="badge">{providerData.newApplications} new</span>
            </div>
            <div className="applications-list">
              {applications.map((application) => (
                <div key={application.id} className="application-item">
                  <img
                    src={application.seekerImage}
                    alt={application.seekerName}
                    className="seeker-image"
                  />
                  <div className="application-info">
                    <h4>{application.seekerName}</h4>
                    <p>{application.listingTitle}</p>
                    <small>
                      {application.appliedDate} • Budget: {application.budget}
                    </small>
                  </div>
                  <div className="application-actions">
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: getStatusColor(application.status),
                      }}
                    >
                      {application.status}
                    </span>
                    {application.status === "pending" && (
                      <div className="action-buttons">
                        <button className="accept-btn">Accept</button>
                        <button className="decline-btn">Decline</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
