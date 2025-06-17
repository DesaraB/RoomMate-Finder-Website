import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import axios from "axios";
import "./updateprofile.css";

const UpdateProfile = () => {
  const { authUser, setTrigger, logoutUser } = useAuthContext();
  const [formData, setFormData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/users/${authUser.id}`, {
          withCredentials: true,
        });
        const user = res.data;

        setFormData({
          name: user.name || "",
          email: user.email || "",
          profile_picture_url: user.profile_picture_url || "",
          location: user.location || "",
          description: user.description || "",
          phone_number: user.phone_number || "",
          budgetMin: user.budgetMin || "",
          budgetMax: user.budgetMax || "",
          password: "",
        });
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    if (authUser?.id) {
      fetchUserData();
    }
  }, [authUser?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        budgetMin: authUser.role === "seeker" ? parseFloat(formData.budgetMin) || null : undefined,
        budgetMax: authUser.role === "seeker" ? parseFloat(formData.budgetMax) || null : undefined,
      };

      await axios.put(`http://localhost:3001/api/users/${authUser.id}`, payload, {
        withCredentials: true,
      });

      alert("Profile updated successfully!");
      setTrigger((prev) => !prev);
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile.");
    } finally {
      setIsSubmitting(false);
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

  if (!formData) return <p style={{ textAlign: "center" }}>Loading profile...</p>;

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
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />

        {authUser.role === "seeker" && (
          <>
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
          </>
        )}

        {authUser.role === "provider" && (
          <input
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        )}

        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="New Password (optional)"
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
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
