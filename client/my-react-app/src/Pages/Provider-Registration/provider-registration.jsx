import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./provider-registration.css"

function ProviderRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    gender: '',
    age: '',
    phone_number: '',
    description: '',
    location: ''
  });
  
  // Provider property fields
  const [propertyData, setPropertyData] = useState({
    homeTitle: '',
    homeDescription: '',
    homeLocation: '',
    homePrice: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    availableFrom: '',
    leaseTerm: '',
    amenities: '',
    photoUrl: ''
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input changes for main form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle input changes for property fields
  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({
      ...propertyData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate form
      if (!formData.username || !formData.email || !formData.password || !formData.name || !formData.gender) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      if (!propertyData.homeTitle || !propertyData.homeLocation || !propertyData.homePrice || !propertyData.bedrooms || !propertyData.bathrooms || !propertyData.propertyType) {
        setError('Please fill in all required property details');
        setIsLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      // Combine data for API request
      const userData = {
        ...formData,
        role: 'provider',
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
          photo_url: propertyData.photoUrl
        }
      };

      // Remove confirmPassword as it's not needed for the API
      delete userData.confirmPassword;

      // Send registration request to your backend
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();
      
      // Store user data and redirect
      localStorage.setItem('user', JSON.stringify(result));
      
      // Redirect to provider dashboard
      navigate('/provider-dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
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

          {error && (
            <div className="error-message">{error}</div>
          )}
          
          <form className="provider-registration-form" onSubmit={handleSubmit}>
            {/* Account Information */}
            <div className="form-section">
              <h3 className="section-title">Account Information</h3>
              
              <div className="form-group">
                <label htmlFor="username">Username *</label>
                <div className="input-wrapper">
                  <span className="input-icon icon-user"></span>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="Choose a unique username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <div className="input-wrapper">
                  <span className="input-icon icon-email"></span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="password-row">
                <div className="form-group">
                  <label htmlFor="password">Password *</label>
                  <div className="input-wrapper">
                    <span className="input-icon icon-lock"></span>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <div className="input-wrapper">
                    <span className="input-icon icon-lock"></span>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Personal Information */}
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <div className="input-wrapper">
                  <span className="input-icon icon-person"></span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="personal-row">
                <div className="form-group">
                  <label htmlFor="gender">Gender *</label>
                  <div className="input-wrapper">
                    <span className="input-icon icon-gender"></span>
                    <select
                      id="gender"
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="non-binary">Non-binary</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <div className="input-wrapper">
                    <span className="input-icon icon-age"></span>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      min="18"
                      max="120"
                      placeholder="25"
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="phone_number">Phone Number</label>
                <div className="input-wrapper">
                  <span className="input-icon icon-phone"></span>
                  <input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Your Location</label>
                <div className="input-wrapper">
                  <span className="input-icon icon-location"></span>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="description">About Me</label>
                <div className="textarea-wrapper">
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    placeholder="Tell potential roommates about yourself, your lifestyle, interests..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            
            {/* Property Details */}
            <div className="form-section property-section">
              <h3 className="section-title">Your Property Details</h3>
              
              <div className="form-group">
                <label htmlFor="homeTitle">Property Title *</label>
                <div className="input-wrapper">
                  <span className="input-icon icon-home"></span>
                  <input
                    id="homeTitle"
                    name="homeTitle"
                    type="text"
                    required
                    placeholder="e.g., Modern Downtown Apartment"
                    value={propertyData.homeTitle}
                    onChange={handlePropertyChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="homeDescription">Property Description</label>
                <div className="textarea-wrapper">
                  <textarea
                    id="homeDescription"
                    name="homeDescription"
                    rows="3"
                    placeholder="Describe your property and what makes it special..."
                    value={propertyData.homeDescription}
                    onChange={handlePropertyChange}
                  />
                </div>
              </div>
              
              <div className="grid-row">
                <div className="form-group">
                  <label htmlFor="homeLocation">Property Location *</label>
                  <div className="input-wrapper">
                    <span className="input-icon icon-location"></span>
                    <input
                      id="homeLocation"
                      name="homeLocation"
                      type="text"
                      required
                      placeholder="City, State"
                      value={propertyData.homeLocation}
                      onChange={handlePropertyChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="homePrice">Monthly Rent ($) *</label>
                  <div className="input-wrapper">
                    <span className="input-icon icon-price"></span>
                    <input
                      id="homePrice"
                      name="homePrice"
                      type="number"
                      min="0"
                      required
                      placeholder="1200"
                      value={propertyData.homePrice}
                      onChange={handlePropertyChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid-row-3">
                <div className="form-group">
                  <label htmlFor="bedrooms">Bedrooms *</label>
                  <div className="input-wrapper">
                    <span className="input-icon icon-bed"></span>
                    <input
                      id="bedrooms"
                      name="bedrooms"
                      type="number"
                      min="0"
                      required
                      placeholder="2"
                      value={propertyData.bedrooms}
                      onChange={handlePropertyChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="bathrooms">Bathrooms *</label>
                  <div className="input-wrapper">
                    <span className="input-icon icon-bath"></span>
                    <input
                      id="bathrooms"
                      name="bathrooms"
                      type="number"
                      min="0"
                      step="0.5"
                      required
                      placeholder="1.5"
                      value={propertyData.bathrooms}
                      onChange={handlePropertyChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="propertyType">Property Type *</label>
                  <div className="input-wrapper">
                    <span className="input-icon icon-type"></span>
                    <select
                      id="propertyType"
                      name="propertyType"
                      required
                      value={propertyData.propertyType}
                      onChange={handlePropertyChange}
                    >
                      <option value="">Select type</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="condo">Condo</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="studio">Studio</option>
                      <option value="loft">Loft</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="grid-row">
                <div className="form-group">
                  <label htmlFor="availableFrom">Available From</label>
                  <div className="input-wrapper">
                    <span className="input-icon icon-calendar"></span>
                    <input
                      id="availableFrom"
                      name="availableFrom"
                      type="date"
                      value={propertyData.availableFrom}
                      onChange={handlePropertyChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="leaseTerm">Lease Term</label>
                  <div className="input-wrapper">
                    <span className="input-icon icon-lease"></span>
                    <select
                      id="leaseTerm"
                      name="leaseTerm"
                      value={propertyData.leaseTerm}
                      onChange={handlePropertyChange}
                    >
                      <option value="">Select term</option>
                      <option value="monthly">Month-to-month</option>
                      <option value="3-months">3 months</option>
                      <option value="6-months">6 months</option>
                      <option value="12-months">12 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="amenities">Amenities & Features</label>
                <div className="textarea-wrapper">
                  <textarea
                    id="amenities"
                    name="amenities"
                    rows="3"
                    placeholder="List amenities like WiFi, parking, laundry, gym, pool, etc..."
                    value={propertyData.amenities}
                    onChange={handlePropertyChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="photoUrl">Property Photo URL</label>
                <div className="input-wrapper">
                  <span className="input-icon icon-photo"></span>
                  <input
                    id="photoUrl"
                    name="photoUrl"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={propertyData.photoUrl}
                    onChange={handlePropertyChange}
                  />
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              className={`provider-register-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'List My Room'}
            </button>
          </form>
          
          <div className="provider-registration-footer">
            <p>Already have an account? <a href="/login" className="signin-link">Sign in</a></p>
            <p>Looking for a room instead? <a href="/seeker-registration" className="switch-link">Join as Seeker</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderRegistration;