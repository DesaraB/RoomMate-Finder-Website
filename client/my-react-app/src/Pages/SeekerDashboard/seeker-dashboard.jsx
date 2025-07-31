// SeekerDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import ChatBox from "../../Components/Chatbox/ChatBox";
import "./seeker-dashboard.css";

const SeekerDashboard = () => {
  const { authUser } = useAuthContext();
  const seekerData = {
    name: authUser.fullname || "Seeker",
    profileImage: authUser.profile_picture_url
      ? `http://localhost:3001${authUser.profile_picture_url}`
      : "https://images.unsplash.com/photo-1494790108755-2616b612d1cf?w=100",
  };
  const navigate = useNavigate();

  const [myApplications, setMyApplications] = useState([]);
  const [savedRooms, setSavedRooms] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/applications",
          { withCredentials: true }
        );
        setMyApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    const fetchSavedRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/interests",
          { withCredentials: true }
        );
        setSavedRooms(response.data);
      } catch (error) {
        console.error("Error fetching saved rooms:", error);
      }
    };

    fetchApplications();
    fetchSavedRooms();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#ffc107";
      case "accepted":
        return "#28a745";
      case "declined":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  const handleUnsave = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/interests/${id}`, {
        withCredentials: true,
      });
      setSavedRooms((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Failed to unsave room", err);
    }
  };

  const handleApply = async (listingId, interestId) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/applications",
        { listingId },
        { withCredentials: true }
      );

      if (response.status === 201) {
        await axios.delete(
          `http://localhost:3001/api/interests/${interestId}`,
          { withCredentials: true }
        );

        setSavedRooms((prev) => prev.filter((room) => room.id !== interestId));
        setMyApplications((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error("Error applying to room:", error.response?.data || error);
    }
  };

  return (
    <div className="seeker-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="welcome-section">
            <img
              src={seekerData.profileImage}
              alt="Profile"
              className="profile-image"
            />
            <div className="welcome-text">
              <h1>Welcome back, {authUser.fullname || "User"}!</h1>
              <p>Find your perfect roommate and housing situation</p>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h3>My Applications</h3>
            </div>
            <div className="applications-list">
              {myApplications.length === 0 ? (
                <p>No applications yet.</p>
              ) : (
                myApplications.map((application) => (
                  <div key={application.id} className="application-item">
                    <img
                      src={
                        application.listing?.photo_url
                          ? `http://localhost:3001/${application.listing.photo_url}`
                          : "https://via.placeholder.com/80"
                      }
                      alt={application.listing?.title}
                      className="property-image"
                    />

                    <div className="application-info">
                      <h4>{application.listing?.title}</h4>
                      <p>${application.listing?.price}/month</p>
                      <small>
                        Applied on{" "}
                        {new Date(application.createdAt).toLocaleDateString()} •
                        Provider: {application.listing?.provider?.fullname}
                      </small>

                      {application.status === "accepted" && (
                        <>
                          <div className="accepted-contact">
                            <p>✅ Your application has been accepted!</p>
                            <p>
                              <strong>Email:</strong>{" "}
                              {application.listing?.provider?.email}
                            </p>
                            <p>
                              <strong>Phone:</strong>{" "}
                              {application.listing?.provider?.phone_number}
                            </p>
                          </div>

                          {/* 💬 ChatBox shfaqet vetëm nëse është accepted */}
                          {application.listing?.provider?.id &&
                            application.listing?.id && (
                              <div style={{ marginTop: "10px" }}>
                                <ChatBox
                                  seekerId={authUser.id}
                                  providerId={application.listing.provider.id}
                                  listingId={application.listing.id}
                                  currentUserId={authUser.id}
                                />
                              </div>
                            )}
                        </>
                      )}
                    </div>

                    <div className="application-status">
                      <span
                        className="status-badge"
                        style={{
                          backgroundColor: getStatusColor(application.status),
                        }}
                      >
                        {application.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Saved Rooms</h3>
            </div>
            <div className="saved-rooms-list">
              {savedRooms.length === 0 ? (
                <p>No saved rooms yet.</p>
              ) : (
                savedRooms.map((room) => (
                  <div key={room.id} className="saved-room-item">
                    <img
                      src={
                        room.listing?.photo_url
                          ? `http://localhost:3001/${room.listing.photo_url}`
                          : "https://via.placeholder.com/80"
                      }
                      alt={room.listing?.title}
                      className="room-image"
                    />

                    <div className="room-info">
                      <h4>{room.listing?.title || "No title"}</h4>
                      <p>${room.listing?.price || "N/A"}/month</p>
                      <small>
                        {room.listing?.location || "Unknown location"} •{" "}
                        {room.listing?.bedrooms || "?"} bedrooms
                      </small>
                    </div>

                    <div className="room-actions">
                      <button
                        className="view-btn"
                        onClick={() =>
                          navigate(`/view-room/${room.listing?.id}`)
                        }
                      >
                        View
                      </button>
                      <button
                        className="apply-btn"
                        onClick={() => handleApply(room.listing?.id, room.id)}
                      >
                        Apply
                      </button>
                      <button
                        className="unsave-btn"
                        onClick={() => handleUnsave(room.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <button
            className="action-btn primary"
            onClick={() => navigate("/listings")}
          >
            Browse All Listings
          </button>
          <button
            className="action-btn secondary"
            onClick={() => navigate("/update-profile")}
          >
            Update My Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeekerDashboard;
