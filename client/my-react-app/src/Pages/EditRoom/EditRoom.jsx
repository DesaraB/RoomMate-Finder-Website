import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./edit-room.css";

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    property_type: "",
    amenities: "",
    available_from: "",
    lease_term: "",
    photo_url: "",
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/listings/${id}`, {
          withCredentials: true,
        });
        setRoom(res.data);
        setFormData({
          title: res.data.title || "",
          description: res.data.description || "",
          location: res.data.location || "",
          price: res.data.price || "",
          bedrooms: res.data.bedrooms || "",
          bathrooms: res.data.bathrooms || "",
          property_type: res.data.property_type || "",
          amenities: res.data.amenities || "",
          available_from: res.data.available_from?.split("T")[0] || "",
          lease_term: res.data.lease_term || "",
          photo_url: res.data.photo_url || "",
        });
      } catch (err) {
        console.error("Error fetching room:", err);
        alert("Could not load room");
      }
    };

    fetchRoom();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/listings/${id}`, formData, {
        withCredentials: true,
      });
      alert("Room updated!");
      navigate("/provider-dashboard");
    } catch (err) {
      console.error("Error updating room:", err);
      alert("Failed to update room");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this room?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3001/api/listings/${id}`, {
        withCredentials: true,
      });
      alert("Room deleted");
      navigate("/provider-dashboard");
    } catch (err) {
      console.error("Error deleting room:", err);
      alert("Failed to delete room");
    }
  };

  if (!room) return <div className="loading">Loading room...</div>;

  return (
    <div className="edit-room-container">
      <h2>Edit Room Listing</h2>
      <form className="edit-room-form" onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          name="bedrooms"
          type="number"
          value={formData.bedrooms}
          onChange={handleChange}
          placeholder="Bedrooms"
          required
        />
        <input
          name="bathrooms"
          type="number"
          step="0.5"
          value={formData.bathrooms}
          onChange={handleChange}
          placeholder="Bathrooms"
          required
        />
        <select
          name="property_type"
          value={formData.property_type}
          onChange={handleChange}
          required
        >
          <option value="">Select Property Type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="studio">Studio</option>
        </select>
        <input
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
          placeholder="Amenities (comma separated)"
        />
        <input
          name="available_from"
          type="date"
          value={formData.available_from}
          onChange={handleChange}
        />
        <input
          name="lease_term"
          value={formData.lease_term}
          onChange={handleChange}
          placeholder="Lease Term"
        />
        <input
          name="photo_url"
          value={formData.photo_url}
          onChange={handleChange}
          placeholder="Photo URL"
        />
        <div className="edit-actions">
          <button type="submit" className="save-btn">Save Changes</button>
          <button type="button" className="delete-btn" onClick={handleDelete}>
            Delete Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoom;
