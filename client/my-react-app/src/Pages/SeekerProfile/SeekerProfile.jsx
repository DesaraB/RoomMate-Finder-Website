import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./seeker-profile.css";

const SeekerProfile = () => {
  const { seekerId } = useParams();
  const [seeker, setSeeker] = useState(null);

  useEffect(() => {
    const fetchSeeker = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/users/${seekerId}`, {
          withCredentials: true,
        });
        setSeeker(res.data);
      } catch (err) {
        console.error("Failed to fetch seeker profile", err);
      }
    };

    fetchSeeker();
  }, [seekerId]);

  if (!seeker) return <p className="loading-text">Loading profile...</p>;

  return (
    <div className="seeker-profile">
      <div className="seeker-header">
        <img
          src={seeker.profile_picture_url || "https://via.placeholder.com/150"}
          alt={seeker.name}
          className="profile-image"
        />
        <div>
          <h2>{seeker.name}</h2>
          <p><span className="label">Gender:</span> {seeker.gender || "Not specified"}</p>
          <p><span className="label">Age:</span> {seeker.age || "Unknown"}</p>
        </div>
      </div>

      <div className="seeker-details">
        <p><span className="label">Location:</span> {seeker.location || "Unknown"}</p>
        <p>
          <span className="label">Budget:</span>{" "}
          {seeker.budget_min && seeker.budget_max
            ? `$${seeker.budget_min} – $${seeker.budget_max}`
            : "Not specified"}
        </p>
        <p>
          <span className="label">Has Children:</span>{" "}
          {seeker.has_children ? "Yes" : "No"}
        </p>
        <p>
          <span className="label">Preferred Move-in Date:</span>{" "}
          {seeker.preferred_move_in
            ? new Date(seeker.preferred_move_in).toLocaleDateString()
            : "Not specified"}
        </p>
        <p>
          <span className="label">About:</span><br />
          {seeker.bio || seeker.description || "No description provided."}
        </p>
      </div>
    </div>
  );
};

export default SeekerProfile;
