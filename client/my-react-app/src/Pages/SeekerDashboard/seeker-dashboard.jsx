import React, { useState } from "react";
import "./seeker-dashboard.css";

const SeekerDashboard = () => {
  // Sample data for seeker dashboard
  const [seekerData] = useState({
    name: "Maria Garcia",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612d1cf?w=100",
    budget: "$800-1200",
    location: "Downtown/University District"
  });

  const [myApplications] = useState([
    {
      id: 1,
      propertyTitle: "Modern Downtown Apartment",
      propertyImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=80",
      rent: "$1200/month",
      status: "pending",
      appliedDate: "2 days ago",
      providerName: "John Smith"
    },
    {
      id: 2,
      propertyTitle: "Cozy Studio Near University",
      propertyImage: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=80",
      rent: "$800/month",
      status: "accepted",
      appliedDate: "1 week ago",
      providerName: "Sarah Wilson"
    },
    {
      id: 3,
      propertyTitle: "Shared House with Garden",
      propertyImage: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=80",
      rent: "$600/month",
      status: "declined",
      appliedDate: "3 days ago",
      providerName: "Mike Johnson"
    }
  ]);

  const [savedRooms] = useState([
    {
      id: 1,
      title: "Luxury Loft Downtown",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=80",
      price: "$1500/month",
      location: "City Center",
      bedrooms: 2,
      savedDate: "1 day ago"
    },
    {
      id: 2,
      title: "Bright Studio Apartment",
      image: "https://images.unsplash.com/photo-1560448075-bb485b067938?w=80",
      price: "$950/month",
      location: "Midtown",
      bedrooms: 1,
      savedDate: "3 days ago"
    },
    {
      id: 3,
      title: "Family Home Room",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=80",
      price: "$700/month",
      location: "Residential Area",
      bedrooms: 4,
      savedDate: "1 week ago"
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#ffc107';
      case 'accepted': return '#28a745';
      case 'declined': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div className="seeker-dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="welcome-section">
            <img src={seekerData.profileImage} alt="Profile" className="profile-image" />
            <div className="welcome-text">
              <h1>Welcome back, {seekerData.name}!</h1>
              <p>Find your perfect roommate and housing situation</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* My Applications */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>My Applications</h3>
            </div>
            <div className="applications-list">
              {myApplications.map(application => (
                <div key={application.id} className="application-item">
                  <img src={application.propertyImage} alt={application.propertyTitle} className="property-image" />
                  <div className="application-info">
                    <h4>{application.propertyTitle}</h4>
                    <p>{application.rent}</p>
                    <small>Applied {application.appliedDate} • Provider: {application.providerName}</small>
                  </div>
                  <div className="application-status">
                    <span 
                      className="status-badge" 
                      style={{ backgroundColor: getStatusColor(application.status) }}
                    >
                      {application.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Rooms */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Saved Rooms</h3>
            </div>
            <div className="saved-rooms-list">
              {savedRooms.map(room => (
                <div key={room.id} className="saved-room-item">
                  <img src={room.image} alt={room.title} className="room-image" />
                  <div className="room-info">
                    <h4>{room.title}</h4>
                    <p>{room.price}</p>
                    <small>{room.location} • {room.bedrooms} bedrooms • Saved {room.savedDate}</small>
                  </div>
                  <div className="room-actions">
                    <button className="view-btn">View</button>
                    <button className="apply-btn">Apply</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="action-btn primary">Browse All Listings</button>
          <button className="action-btn secondary">Update My Profile</button>
        </div>
      </div>
    </div>
  );
};

export default SeekerDashboard;