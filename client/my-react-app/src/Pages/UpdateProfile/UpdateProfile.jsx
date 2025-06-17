import React, { useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import axios from "axios";
import "./updateprofile.css";

const UpdateProfile = () => {
  const { authUser, setTrigger, logoutUser } = useAuthContext();
  const [formData, setFormData] = useState({
    name: authUser.name || "",
    email: authUser.email || "",
    profile_picture_url: authUser.profile_picture_url || "",
    budgetMin: authUser.budgetMin || "",
    budgetMax: authUser.budgetMax || "",
    location: authUser.location || "",
    description: authUser.description || "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/users/${authUser.id}`, formData, {
        withCredentials: true,
      });
      alert("Profile updated successfully!");
      setTrigger((prev) => !prev);
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile.");
    }
  };

  const confirmDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${authUser.id}`, {
        withCredentials: true,
      });
      alert("Your account has been deleted.");
      logoutUser();
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting account", error);
      alert("Something went wrong while deleting your account.");
    }
  };

  return (
    <div className="update-profile">
      <h2>Update Your Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input
          name="profile_picture_url"
          value={formData.profile_picture_url}
          onChange={handleChange}
          placeholder="Profile Picture URL"
        />
        <input
          name="budgetMin"
          type="number"
          value={formData.budgetMin}
          onChange={handleChange}
          placeholder="Budget Min"
        />
        <input
          name="budgetMax"
          type="number"
          value={formData.budgetMax}
          onChange={handleChange}
          placeholder="Budget Max"
        />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">Update Profile</button>
      </form>

      <button className="delete-account-btn" onClick={() => setShowModal(true)}>
        🗑️ Delete My Account
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to delete your account?</h3>
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="confirm-btn" onClick={confirmDeleteAccount}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
