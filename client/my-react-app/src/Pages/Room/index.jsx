import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRoomContext } from "../../Context/RoomContext";
import "./index.css";

const Room = () => {
  const { id } = useParams();
  const { roomById } = useRoomContext();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const loadRoomById = async () => {
      try {
        const result = await roomById(id);
        if (result) {
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

  if (loading) return <div className="room-loader">Loading room details...</div>;
  if (!room) return <div className="room-not-found">Room not found.</div>;

  return (
    <div className="room-details-container">
      <div className="room-image-wrapper">
        <img
          src={room.photo_url || "https://via.placeholder.com/600x400"}
          alt={room.title}
          className="room-image"
        />
      </div>
      <div className="room-content">
        <h1 className="room-title">{room.title}</h1>
        <p className="room-description">{room.description}</p>

        <div className="room-info">
          <p><strong>Location:</strong> {room.location}</p>
          <p><strong>Price:</strong> ${room.price}/month</p>
          <p><strong>Bedrooms:</strong> {room.bedrooms}</p>
          <p><strong>Bathrooms:</strong> {room.bathrooms}</p>
          <p><strong>Lease Term:</strong> {room.lease_term}</p>
          <p><strong>Amenities:</strong> {room.amenities}</p>
          <p><strong>Available From:</strong> {new Date(room.available_from).toLocaleDateString()}</p>
        </div>

        <div className="room-provider">
          <h4>Hosted by</h4>
          <p>{room.provider?.name} ({room.provider?.email})</p>
        </div>

        <div className="room-actions">
          <button
            className="apply-now-btn"
            onClick={handleApply}
            disabled={applied}
          >
            {applied ? "Application Sent" : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
