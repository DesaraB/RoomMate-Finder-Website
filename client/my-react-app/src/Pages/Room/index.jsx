import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRoomContext } from "../../Context/RoomContext";
import { useAuthContext } from "../../Context/AuthContext";

import "./index.css";

const Room = () => {
  const { id } = useParams();
  const { roomById } = useRoomContext();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const loadRoomById = async () => {
      try {
        const result = await roomById(id);
        if (result) {
          console.log("room.photo_url:", result.photo_url);
          console.log("room.gallery_photos:", result.gallery_photos);
          setRoom(result);
        }
      } catch (error) {
        console.log("error---loadRoomById-", error);
      } finally {
        setLoading(false);
      }
    };

    loadRoomById();
  }, [id, roomById]);

  const handleApply = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          listingId: room.id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Application submitted successfully!");
        setApplied(true);
      } else {
        alert(data.error || "Application failed");
      }
    } catch (error) {
      console.error("Apply error:", error);
      alert("Something went wrong.");
    }
  };

  if (loading)
    return <div className="room-loader">Loading room details...</div>;
  if (!room) return <div className="room-not-found">Room not found.</div>;

  const amenityLabels = {
    wifi: "WiFi",
    parking: "Parking",
    gym: "Gym",
    pool: "Pool",
    ac: "Air Conditioning",
    laundry: "Laundry",
    kitchen: "Kitchen",
    "pet-friendly": "Pet Friendly",
  };

  return (
    <div className="room-details-page">
      <div className="room-image-section">
        <img
          src={
            room.photo_url
              ? `http://localhost:3001/${room.photo_url}`
              : "https://via.placeholder.com/600x400"
          }
          alt={room.title}
          className="room-main-image"
        />

        {room.gallery_photos?.length > 0 && (
          <div className="room-gallery">
            {room.gallery_photos.map((img, i) => (
              <img
                key={i}
                src={`http://localhost:3001/${img}`}
                alt={`Gallery ${i}`}
                className="room-gallery-thumb"
              />
            ))}
          </div>
        )}
      </div>

      <div className="room-info-section">
        <h2>{room.title}</h2>
        <p className="room-location">📍 {room.location}</p>
        <div className="room-meta">
          <p>
            <strong>Price:</strong> ${room.price}/month
          </p>
          <p>
            <strong>Bedrooms:</strong> {room.bedrooms}
          </p>
          <p>
            <strong>Bathrooms:</strong> {room.bathrooms}
          </p>
          <p>
            <strong>Lease Term:</strong> {room.lease_term}
          </p>
          <p>
            <strong>Available From:</strong>{" "}
            {room.available_from
              ? new Date(room.available_from).toLocaleDateString()
              : "Not specified"}
          </p>
        </div>

        {room.amenities && (
          <div className="room-amenities">
            <h4>Amenities</h4>
            <div className="amenities-badge-list">
              {Array.from(
                new Set(
                  (Array.isArray(room.amenities)
                    ? room.amenities
                    : typeof room.amenities === "string"
                    ? room.amenities.split(",")
                    : []
                  ).map((a) => a.trim())
                )
              ).map((a, i) => (
                <span key={i} className="amenity-badge">
                  {amenityLabels[a] || a}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="room-description">
          <h4>Description</h4>
          <p>{room.description}</p>
        </div>

        <div className="room-provider">
          <h4>Hosted by</h4>
          <p>
            {room.provider?.fullname} ({room.provider?.email})
          </p>
        </div>

        {authUser?.role === "seeker" && (
          <button
            className="apply-now-btn"
            onClick={handleApply}
            disabled={applied}
          >
            {applied ? "Application Sent" : "Apply Now"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Room;
