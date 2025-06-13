import React, { useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import axios from "axios";
import "./updateprofile.css";

const UpdateProfile = () => {
  const { authUser, setTrigger } = useAuthContext(); // trigger to refresh auth
  const [formData, setFormData] = useState({
    name: authUser.name || "",
    email: authUser.email || "",
    profile_picture_url: authUser.profile_picture_url || "",
    budgetMin: authUser.budgetMin || "",
    budgetMax: authUser.budgetMax || "",
    location: authUser.location || "",
    description: authUser.description || "",
  });

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
      setTrigger((prev) => !prev); // Refresh user context
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile.");
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
    </div>
  );
};

export default UpdateProfile;
