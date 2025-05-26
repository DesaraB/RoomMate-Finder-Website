import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './seeker-registration.css';

function SeekerRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: '',
    age: '',
    phone_number: '',
    profile_picture_url: '',
    location: '',
    description: ''
  });
  
  // Seeker preference fields
  const [preferenceData, setPreferenceData] = useState({
    budgetMin: '',
    budgetMax: '',
    moveInDate: '',
    children: 'No children'
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

  // Handle input changes for preference fields
  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferenceData({
      ...preferenceData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate form - based on your userController required fields
      if (!formData.name || !formData.email || !formData.password || !formData.gender || !formData.dateOfBirth || !formData.age) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      // Combine data for API request - matching your userController structure
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        role: 'seeker',
        phone_number: formData.phone_number,
        profile_picture_url: formData.profile_picture_url,
        location: formData.location,
        age: formData.age ? parseInt(formData.age) : null,
        description: formData.description,
        budgetMin: preferenceData.budgetMin ? parseInt(preferenceData.budgetMin) : null,
        budgetMax: preferenceData.budgetMax ? parseInt(preferenceData.budgetMax) : null,
        moveInDate: preferenceData.moveInDate || null,
        children: preferenceData.children
      };

      // Send registration request to your backend
      const response = await fetch('/api/users', {
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
      
      // Redirect to seeker dashboard
      navigate('/seeker-dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="seeker-registration-page">
      <div className="seeker-registration-container">
        <div className="seeker-registration-card">
          <div className="seeker-registration-header">
            <div className="seeker-icon">🔍</div>
            <h1>Create Your Profile</h1>
            <p>Find your perfect roommate and ideal living space</p>
          </div>

          {error && (
            <div className="error-message">{error}</div>
          )}
          
          <form className="seeker-registration-form" onSubmit={handleSubmit}>
            {/* Account Information */}
            <div className="form-section">
              <h3 className="section-title">Account Information</h3>
              
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <div className="input-wrapper">
                  <span className="input-icon icon-user"></span>
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
                  <label htmlFor="age">Age *</label>
                  <div className="input-wrapper">
                    <span className="input-icon icon-age"></span>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      min="18"
                      max="120"
                      required
                      placeholder="25"
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth *</label>
                <div className="input-wrapper">
                  <span className="input-icon icon-calendar"></span>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
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
                <label htmlFor="profile_picture_url">Profile Picture URL</label>
                <div className="input-wrapper">
                  <span className="input-icon icon-photo"></span>
                  <input
                    id="profile_picture_url"
                    name="profile_picture_url"
                    type="url"
                    placeholder="https://example.com/your-photo.jpg"
                    value={formData.profile_picture_url}
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
            
            {/* Preferences */}
            <div className="form-section preferences-section">
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
                      value={preferenceData.budgetMin}
                      onChange={handlePreferenceChange}
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
                      value={preferenceData.budgetMax}
                      onChange={handlePreferenceChange}
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
                    value={preferenceData.moveInDate}
                    onChange={handlePreferenceChange}
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
                    value={preferenceData.children}
                    onChange={handlePreferenceChange}
                  >
                    <option value="No children">No children</option>
                    <option value="Have children">Have children</option>
                    <option value="Expecting children">Expecting children</option>
                  </select>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`seeker-register-btn ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? 'Creating your profile...' : 'Create My Profile'}
            </button>
          </form>
          
          <div className="seeker-registration-footer">
            <p>
              Already have an account?{' '}
              <button 
                className="signin-link"
                onClick={() => navigate('/login')}
              >
                Sign in here
              </button>
            </p>
            <p>
              Have a room to share?{' '}
              <button 
                className="switch-link"
                onClick={() => navigate('/provider-registration')}
              >
                List your room
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeekerRegistration;