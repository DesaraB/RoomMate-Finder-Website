import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css'; // Make sure to import your CSS file

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'seeker', // Default to seeker
    gender: '',
    age: '',
    phone_number: '',
    description: '',
    location: ''
  });
  
  // Additional fields for seekers
  const [seekerData, setSeekerData] = useState({
    budgetMin: '',
    budgetMax: '',
    moveInDate: '',
    children: 'No children'
  });
  
  // Additional fields for providers (home details)
  const [providerData, setProviderData] = useState({
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

  // Handle input changes for seeker-specific fields
  const handleSeekerChange = (e) => {
    const { name, value } = e.target;
    setSeekerData({
      ...seekerData,
      [name]: value
    });
  };

  // Handle input changes for provider-specific fields
  const handleProviderChange = (e) => {
    const { name, value } = e.target;
    setProviderData({
      ...providerData,
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

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      // Combine data for API request
      const userData = {
        ...formData
      };

      // Add seeker-specific fields if role is seeker
      if (formData.role === 'seeker') {
        userData.budgetMin = seekerData.budgetMin ? parseInt(seekerData.budgetMin) : null;
        userData.budgetMax = seekerData.budgetMax ? parseInt(seekerData.budgetMax) : null;
        userData.moveInDate = seekerData.moveInDate || null;
        userData.children = seekerData.children;
      }

      // Add provider-specific fields if role is provider
      if (formData.role === 'provider') {
        userData.homeData = {
          title: providerData.homeTitle,
          description: providerData.homeDescription,
          location: providerData.homeLocation,
          price: providerData.homePrice ? parseFloat(providerData.homePrice) : null,
          bedrooms: providerData.bedrooms ? parseInt(providerData.bedrooms) : null,
          bathrooms: providerData.bathrooms ? parseFloat(providerData.bathrooms) : null,
          property_type: providerData.propertyType,
          available_from: providerData.availableFrom || null,
          lease_term: providerData.leaseTerm,
          amenities: providerData.amenities,
          photo_url: providerData.photoUrl
        };
      }

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
      
      // Redirect based on role
      if (result.role === 'provider') {
        navigate('/provider-dashboard');
      } else {
        navigate('/seeker-dashboard');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1>Join RoomMate Finder</h1>
            <p>Find your perfect living situation today</p>
          </div>

          {error && (
            <div className="error-message">{error}</div>
          )}
          
          <form className="register-form" onSubmit={handleSubmit}>
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
              
              <div className="form-group">
                <label htmlFor="role">I am a *</label>
                <div className="radio-group">
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="seeker"
                      name="role"
                      value="seeker"
                      checked={formData.role === 'seeker'}
                      onChange={handleChange}
                    />
                    <label htmlFor="seeker" className="radio-label">
                      <span className="radio-icon">🔍</span>
                      <div>
                        <strong>Room Seeker</strong>
                        <small>Looking for a place to live</small>
                      </div>
                    </label>
                  </div>
                  
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="provider"
                      name="role"
                      value="provider"
                      checked={formData.role === 'provider'}
                      onChange={handleChange}
                    />
                    <label htmlFor="provider" className="radio-label">
                      <span className="radio-icon">🏠</span>
                      <div>
                        <strong>Room Provider</strong>
                        <small>Have a place to share</small>
                      </div>
                    </label>
                  </div>
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
                <label htmlFor="location">Location</label>
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
            
            {/* Seeker Preferences */}
            {formData.role === 'seeker' && (
              <div className="form-section seeker-section">
                <h3 className="section-title">Your Preferences</h3>
                
                <div className="grid-row">
                  <div className="form-group">
                    <label htmlFor="budgetMin">Min Budget ($)</label>
                    <div className="input-wrapper">
                      <span className="input-icon icon-budget"></span>
                      <input
                        id="budgetMin"
                        name="budgetMin"
                        type="number"
                        min="0"
                        placeholder="500"
                        value={seekerData.budgetMin}
                        onChange={handleSeekerChange}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="budgetMax">Max Budget ($)</label>
                    <div className="input-wrapper">
                      <span className="input-icon icon-budget"></span>
                      <input
                        id="budgetMax"
                        name="budgetMax"
                        type="number"
                        min="0"
                        placeholder="1500"
                        value={seekerData.budgetMax}
                        onChange={handleSeekerChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="moveInDate">Preferred Move-In Date</label>
                  <div className="input-wrapper">
                    <span className="input-icon icon-calendar"></span>
                    <input
                      id="moveInDate"
                      name="moveInDate"
                      type="date"
                      value={seekerData.moveInDate}
                      onChange={handleSeekerChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="children">Children</label>
                  <div className="input-wrapper">
                    <span className="input-icon icon-children"></span>
                    <select
                      id="children"
                      name="children"
                      value={seekerData.children}
                      onChange={handleSeekerChange}
                    >
                      <option value="No children">No children</option>
                      <option value="Have children">Have children</option>
                      <option value="Expecting children">Expecting children</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {/* Provider Property Details */}
            {formData.role === 'provider' && (
              <div className="form-section provider-section">
                <h3 className="section-title">Property Details</h3>
                
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
                      value={providerData.homeTitle}
                      onChange={handleProviderChange}
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
                      value={providerData.homeDescription}
                      onChange={handleProviderChange}
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
                        value={providerData.homeLocation}
                        onChange={handleProviderChange}
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
                        value={providerData.homePrice}
                        onChange={handleProviderChange}
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
                        value={providerData.bedrooms}
                        onChange={handleProviderChange}
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
                        value={providerData.bathrooms}
                        onChange={handleProviderChange}
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
                        value={providerData.propertyType}
                        onChange={handleProviderChange}
                      >
                        <option value="">Select type</option>
                        <option value="apartment">🏢 Apartment</option>
                        <option value="house">🏡 House</option>
                        <option value="condo">🏙 Condo</option>
                        <option value="studio">🏠 Studio</option>
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
                        value={providerData.availableFrom}
                        onChange={handleProviderChange}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="leaseTerm">Lease Term</label>
                    <div className="input-wrapper">
                      <span className="input-icon icon-lease"></span>
                      <input
                        id="leaseTerm"
                        name="leaseTerm"
                        type="text"
                        placeholder="e.g., 12 months, flexible"
                        value={providerData.leaseTerm}
                        onChange={handleProviderChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="amenities">Amenities</label>
                  <div className="textarea-wrapper">
                    <textarea
                      id="amenities"
                      name="amenities"
                      rows="2"
                      placeholder="e.g., WiFi, air conditioning, balcony, parking, gym..."
                      value={providerData.amenities}
                      onChange={handleProviderChange}
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
                      value={providerData.photoUrl}
                      onChange={handleProviderChange}
                    />
                  </div>
                </div>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className={`register-btn ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? 'Creating your account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="register-footer">
            <p>
              Already have an account?{' '}
              <button 
                className="signin-link"
                onClick={() => navigate('/login')}
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;