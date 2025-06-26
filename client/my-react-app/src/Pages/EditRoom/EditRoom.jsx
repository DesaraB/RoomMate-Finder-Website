import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./edit-room.css";

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [coverFile, setCoverFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
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
    gallery_photos: [],
  });

  const amenityOptions = [
    { id: "wifi", label: "WiFi", icon: "📶" },
    { id: "parking", label: "Parking", icon: "🚗" },
    { id: "gym", label: "Gym", icon: "💪" },
    { id: "pool", label: "Pool", icon: "🏊" },
    { id: "ac", label: "Air Conditioning", icon: "❄️" },
    { id: "laundry", label: "Laundry", icon: "👔" },
    { id: "kitchen", label: "Kitchen", icon: "🍳" },
    { id: "pet-friendly", label: "Pet Friendly", icon: "🐕" },
  ];

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `http://localhost:3001/api/listings/${id}`,
          {
            withCredentials: true,
          }
        );
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
          gallery_photos: res.data.gallery_photos || [],
        });
        const normalizeAmenities = (value) => {
          if (!value) return [];

          if (Array.isArray(value)) {
            return [...new Set(value.map((a) => a.trim()))];
          }

          if (typeof value === "string") {
            try {
              const parsed = JSON.parse(value);
              if (Array.isArray(parsed)) {
                return [...new Set(parsed.map((a) => a.trim()))];
              }
            } catch {
              // fallback for CSV string
              return [...new Set(value.split(",").map((a) => a.trim()))];
            }
          }

          return [];
        };

        setSelectedAmenities(normalizeAmenities(res.data.amenities));
      } catch (err) {
        console.error("Error fetching room:", err);
        showNotification("Could not load room", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenityId) => {
    setSelectedAmenities((prev) => {
      if (prev.includes(amenityId)) {
        return prev.filter((id) => id !== amenityId);
      } else {
        return [...prev, amenityId];
      }
    });
  };

  const handleCoverFileChange = (e) => {
    const file = e.target.files[0];
    setCoverFile(file);
  };

  const handleGalleryFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(files);
  };

  const removeGalleryPhoto = (index) => {
    const updatedGallery = formData.gallery_photos.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({ ...prev, gallery_photos: updatedGallery }));
  };

  const showNotification = (message, type = "success") => {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  const calculateProgress = () => {
    const requiredFields = [
      "title",
      "description",
      "location",
      "price",
      "bedrooms",
      "bathrooms",
      "property_type",
    ];
    const filledRequired = requiredFields.filter(
      (field) => formData[field] !== ""
    ).length;
    const optionalFields = [
      "amenities",
      "available_from",
      "lease_term",
      "photo_url",
    ];
    const filledOptional = optionalFields.filter((field) => {
      const value = formData[field];
      return value && (Array.isArray(value) ? value.length > 0 : value !== "");
    }).length;

    const total = requiredFields.length + optionalFields.length;
    const filled = filledRequired + filledOptional;
    return Math.round((filled / total) * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => {
        if (key !== "gallery_photos" && formData[key] !== "") {
          formDataToSend.append(key, formData[key]);
        }
      });

      formDataToSend.append("amenities", selectedAmenities.join(","));

      // Append cover photo if new one selected
      if (coverFile) {
        formDataToSend.append("cover_photo", coverFile);
      }

      // Append gallery photos if new ones selected
      galleryFiles.forEach((file) => {
        formDataToSend.append("gallery_photos", file);
      });

      await axios.put(
        `http://localhost:3001/api/listings/${id}`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showNotification("Room updated successfully!", "success");
      setTimeout(() => navigate("/provider-dashboard"), 1500);
    } catch (err) {
      console.error("Error updating room:", err);
      showNotification("Failed to update room. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/listings/${id}`, {
        withCredentials: true,
      });
      showNotification("Room deleted successfully", "success");
      setTimeout(() => navigate("/provider-dashboard"), 1500);
    } catch (err) {
      console.error("Error deleting room:", err);
      showNotification("Failed to delete room. Please try again.", "error");
    }
    setShowDeleteModal(false);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h3>Loading room details...</h3>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h2>Room Not Found</h2>
        <p>
          The room listing you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/provider-dashboard")}
          className="btn btn-primary"
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  const progress = calculateProgress();

  return (
    <div className="edit-room-container">
      {/* Compact Header */}
      <header className="page-header">
        <button
          onClick={() => navigate("/provider-dashboard")}
          className="back-btn"
        >
          ← Back
        </button>
        <h1>Edit Room</h1>
        <div className="progress-mini">
          <span>{progress}%</span>
          <div className="progress-bar-mini">
            <div
              className="progress-fill-mini"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Compact Form */}
      <div className="form-container">
        <form className="edit-form" onSubmit={handleSubmit}>
          {/* Basic Info Section */}
          <div className="form-section">
            <h3>📝 Basic Information</h3>
            <div className="form-grid">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Room Title *"
                required
                className="form-input"
              />
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location *"
                required
                className="form-input"
              />
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Monthly Rent ($) *"
                required
                className="form-input"
              />
              <select
                name="property_type"
                value={formData.property_type}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="">Property Type *</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="studio">Studio</option>
              </select>
              <input
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="Bedrooms *"
                min="1"
                required
                className="form-input"
              />
              <input
                name="bathrooms"
                type="number"
                step="0.5"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="Bathrooms *"
                min="0.5"
                required
                className="form-input"
              />
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your property... *"
              required
              rows="3"
              className="form-textarea"
            />
          </div>

          {/* Details Section */}
          <div className="form-section">
            <h3>📅 Details</h3>
            <div className="form-grid">
              <input
                name="available_from"
                type="date"
                value={formData.available_from}
                onChange={handleChange}
                className="form-input"
              />
              <input
                name="lease_term"
                value={formData.lease_term}
                onChange={handleChange}
                placeholder="Lease Term (e.g., 1 year)"
                className="form-input"
              />
            </div>
          </div>

          {/* Amenities Section */}
          <div className="form-section">
            <h3>✨ Amenities</h3>

            {selectedAmenities.length > 0 && (
              <div className="selected-amenities-preview">
                <strong>Selected:</strong>{" "}
                {selectedAmenities.map((a, i) => (
                  <span key={i} className="amenity-preview-chip">
                    {amenityOptions.find((opt) => opt.id === a)?.label || a}
                    {i < selectedAmenities.length - 1 && ", "}
                  </span>
                ))}
              </div>
            )}

            <div className="amenities-compact">
              {amenityOptions.map((amenity) => (
                <label
                  key={amenity.id}
                  className={`amenity-chip ${
                    selectedAmenities.includes(amenity.id) ? "selected" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity.id)}
                    onChange={() => handleAmenityToggle(amenity.id)}
                    style={{ display: "none" }}
                  />
                  <span className="amenity-icon">{amenity.icon}</span>
                  <span>{amenity.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Photos Section */}
          <div className="form-section">
            <h3>📷 Photos</h3>

            {/* Cover Photo */}
            <div className="photo-section">
              <label className="photo-label">Cover Photo</label>
              <div className="photo-upload-area">
                {formData.photo_url && (
                  <div className="current-photo">
                    <img
                      src={`http://localhost:3001/${formData.photo_url}`}
                      alt="Current cover"
                      className="photo-preview"
                    />
                    <span className="photo-caption">Current Cover</span>
                  </div>
                )}
                <div className="upload-zone">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverFileChange}
                    className="file-input"
                    id="cover-upload"
                  />
                  <label htmlFor="cover-upload" className="upload-btn">
                    📎 {coverFile ? coverFile.name : "Choose New Cover"}
                  </label>
                </div>
              </div>
            </div>

            {/* Gallery Photos */}
            <div className="photo-section">
              <label className="photo-label">Gallery Photos</label>

              {/* Current Gallery */}
              {formData.gallery_photos?.length > 0 && (
                <div className="gallery-current">
                  <span className="gallery-caption">Current Gallery:</span>
                  <div className="gallery-grid">
                    {formData.gallery_photos.map((photo, index) => (
                      <div key={index} className="gallery-item">
                        <img
                          src={`http://localhost:3001/${photo}`}
                          alt={`Gallery ${index + 1}`}
                          className="gallery-thumb"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryPhoto(index)}
                          className="remove-btn"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Gallery Photos */}
              <div className="upload-zone">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryFilesChange}
                  className="file-input"
                  id="gallery-upload"
                />
                <label htmlFor="gallery-upload" className="upload-btn">
                  🖼️{" "}
                  {galleryFiles.length > 0
                    ? `${galleryFiles.length} files selected`
                    : "Add More Photos"}
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-save"
            >
              {isSubmitting ? "Saving..." : "💾 Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="btn btn-delete"
            >
              🗑️ Delete
            </button>
          </div>
        </form>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="modal-compact" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Listing?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn btn-cancel"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="btn btn-delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditRoom;
