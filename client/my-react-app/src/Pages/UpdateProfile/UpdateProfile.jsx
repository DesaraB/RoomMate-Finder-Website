import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import axios from "axios";
import "./updateprofile.css";

const UpdateProfile = () => {
  const { authUser, setTrigger, logoutUser, refreshAuthUser } =
    useAuthContext();
  const [formData, setFormData] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/users/${authUser.id}`,
          {
            withCredentials: true,
          }
        );
        const user = res.data;

        setFormData({
          fullname: user.fullname || "",
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
      const formDataPayload = new FormData();

      // Add your original payload fields
      const payload = {
        ...formData,
        budgetMin:
          authUser.role === "seeker"
            ? parseFloat(formData.budgetMin) || null
            : undefined,
        budgetMax:
          authUser.role === "seeker"
            ? parseFloat(formData.budgetMax) || null
            : undefined,
      };

      // Append fields to FormData
      for (const key in payload) {
        if (payload[key] !== undefined && payload[key] !== null) {
          formDataPayload.append(key, payload[key]);
        }
      }

      // ✅ Append image file if selected
      if (profilePictureFile) {
        formDataPayload.append("profile_picture", profilePictureFile);
      }

      await axios.put(
        `http://localhost:3001/api/users/${authUser.id}`,
        formDataPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      alert("Profile updated successfully!");
      await refreshAuthUser();
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

  if (!formData)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );

  return (
    <div className="update-profile">
      <div className="profile-header">
        <h2>Update Your Profile</h2>
        <div className="animated-border"></div>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group floating">
          <input
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="fullname"
          />
          <label>Fullname</label>
        </div>

        <div className="form-group floating">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <label>Email</label>
        </div>

        <div className="form-group">
          <label>Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePictureFile(e.target.files[0])}
          />
        </div>

        {formData.profile_picture_url && (
          <div className="profile-preview">
            <img
              src={`http://localhost:3001${formData.profile_picture_url}`}
              alt="Current Profile"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                marginTop: "10px",
              }}
            />
          </div>
        )}

        <div className="form-group floating">
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
          />
          <label>Location</label>
        </div>

        <div className="form-group floating">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <label>Description</label>
        </div>

        {authUser.role === "seeker" && (
          <div className="budget-container">
            <div className="form-group floating">
              <input
                name="budgetMin"
                type="number"
                value={formData.budgetMin}
                onChange={handleChange}
                placeholder="Budget Min"
              />
              <label>Budget Min</label>
            </div>
            <div className="form-group floating">
              <input
                name="budgetMax"
                type="number"
                value={formData.budgetMax}
                onChange={handleChange}
                placeholder="Budget Max"
              />
              <label>Budget Max</label>
            </div>
          </div>
        )}

        {authUser.role === "provider" && (
          <div className="form-group floating">
            <input
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            <label>Phone Number</label>
          </div>
        )}

        <div className="form-group floating">
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="New Password (optional)"
          />
          <label>New Password (optional)</label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`update-btn ${isSubmitting ? "submitting" : ""}`}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Updating...
            </>
          ) : (
            "Update Profile"
          )}
        </button>
      </form>

      <button className="delete-account-btn" onClick={() => setShowModal(true)}>
        <span className="trash-icon">🗑️</span>
        Delete My Account
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content scale-in">
            <h3>Are you sure you want to delete your account?</h3>
            <p className="warning-text">This action cannot be undone!</p>
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
