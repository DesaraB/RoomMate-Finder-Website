import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./provider-registration.css";
import MapPicker from "../../Components/MapPicker/MapPicker";

function ProviderRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    gender: "",
    age: "",
    phone_number: "",
    description: "",
    location: "",
    coordinates: null,
  });

  const [propertyData, setPropertyData] = useState({
    homeTitle: "",
    homeDescription: "",
    homeLocation: "",
    homePrice: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
    availableFrom: "",
    leaseTerm: "",
    amenities: "",
    photoUrl: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMapSelect = (coords) => {
    setFormData({ ...formData, coordinates: coords });
  };

  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({
      ...propertyData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!formData.username || !formData.email || !formData.password || !formData.name || !formData.gender) {
        setError("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      if (!propertyData.homeTitle || !propertyData.homeLocation || !propertyData.homePrice || !propertyData.bedrooms || !propertyData.bathrooms || !propertyData.propertyType) {
        setError("Please fill in all required property details");
        setIsLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      const userData = {
        ...formData,
        role: "provider",
        homeData: {
          title: propertyData.homeTitle,
          description: propertyData.homeDescription,
          location: propertyData.homeLocation,
          price: propertyData.homePrice ? parseFloat(propertyData.homePrice) : null,
          bedrooms: propertyData.bedrooms ? parseInt(propertyData.bedrooms) : null,
          bathrooms: propertyData.bathrooms ? parseFloat(propertyData.bathrooms) : null,
          property_type: propertyData.propertyType,
          available_from: propertyData.availableFrom || null,
          lease_term: propertyData.leaseTerm,
          amenities: propertyData.amenities,
          photo_url: propertyData.photoUrl,
          coordinates: formData.coordinates || null,
        },
      };

      delete userData.confirmPassword;

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const result = await response.json();
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/provider-dashboard");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="provider-registration-page">
      <div className="provider-registration-container">
        <div className="provider-registration-card">
          <div className="provider-registration-header">
            <div className="provider-icon">🏠</div>
            <h1>List Your Room</h1>
            <p>Join as a room provider and start earning from your space</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form className="provider-registration-form" onSubmit={handleSubmit}>
            {/* ... existing form sections ... */}

            {/* 📍 Map Picker */}
            <div className="form-section">
              <h3 className="section-title">Pin Property Location on Map</h3>
              <MapPicker onSelect={handleMapSelect} />
            </div>

            <button
              type="submit"
              className={`provider-register-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "List My Room"}
            </button>
          </form>

          <div className="provider-registration-footer">
            <p>
              Already have an account? <a href="/login" className="signin-link">Sign in</a>
            </p>
            <p>
              Looking for a room instead? <a href="/seeker-registration" className="switch-link">Join as Seeker</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderRegistration;
