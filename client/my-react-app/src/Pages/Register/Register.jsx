import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./register.css";

const Register = () => {
  // Required fields from your API
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  
  // Optional fields
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  
  // Seeker-specific fields (conditional)
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [children, setChildren] = useState("");
  
  // Form state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setIsLoading(true);

    // Validation for required fields
    if (!name || !email || !password || !confirmPassword || !gender || !dateOfBirth || !role || !age) {
      setFormError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (!agreeToTerms) {
      setFormError("Please agree to the Terms of Service");
      setIsLoading(false);
      return;
    }

    try {
      // Prepare user data according to your API
      const userData = {
        name,
        email,
        password,
        gender,
        dateOfBirth,
        role,
        age: parseInt(age),
        phone_number: phoneNumber,
        location,
        description: role === "seeker" ? description : null,
        budgetMin: role === "seeker" && budgetMin ? parseInt(budgetMin) : null,
        budgetMax: role === "seeker" && budgetMax ? parseInt(budgetMax) : null,
        moveInDate: role === "seeker" ? moveInDate : null,
        children: role === "seeker" ? children : null,
      };

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Registration successful! Welcome to RoommateFinder!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        setFormError(errorData.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      setFormError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1>Join RoommateFinder</h1>
            <p>Create your profile to find the perfect roommate match</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {formError && (
              <div className="error-message">
                {formError}
              </div>
            )}

            {/* Account Information Section */}
            <div className="form-section">
              <h3 className="section-title">Account Information</h3>
              
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="password-row">
                <div className="form-group">
                  <label htmlFor="password">Password *</label>
                  <div className="input-wrapper">
                    <span className="input-icon">🔒</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <div className="input-wrapper">
                    <span className="input-icon">🔒</span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="role">I am a *</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="role"
                      value="provider"
                      checked={role === "provider"}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    />
                    <span className="radio-label">
                      <span className="radio-icon">🏠</span>
                      <div>
                        <strong>Room Provider</strong>
                        <small>I have a place and looking for roommates</small>
                      </div>
                    </span>
                  </label>
                  
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="role"
                      value="seeker"
                      checked={role === "seeker"}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    />
                    <span className="radio-label">
                      <span className="radio-icon">🔍</span>
                      <div>
                        <strong>Room Seeker</strong>
                        <small>I'm looking for a place to live</small>
                      </div>
                    </span>
                  </label>
                </div>
              </div>

              <div className="personal-row">
                <div className="form-group">
                  <label htmlFor="gender">Gender *</label>
                  <div className="input-wrapper">
                    <span className="input-icon">⚧️</span>
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
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
                    <span className="input-icon">🎂</span>
                    <input
                      type="number"
                      id="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Age"
                      min="18"
                      max="99"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth *</label>
                <div className="input-wrapper">
                  <span className="input-icon">📅</span>
                  <input
                    type="date"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="personal-row">
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <div className="input-wrapper">
                    <span className="input-icon">📱</span>
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <div className="input-wrapper">
                    <span className="input-icon">📍</span>
                    <input
                      type="text"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Seeker-specific fields */}
            {role === "seeker" && (
              <div className="form-section">
                <h3 className="section-title">Room Seeker Information</h3>
                
                <div className="personal-row">
                  <div className="form-group">
                    <label htmlFor="budgetMin">Budget Min ($)</label>
                    <div className="input-wrapper">
                      <span className="input-icon">💰</span>
                      <input
                        type="number"
                        id="budgetMin"
                        value={budgetMin}
                        onChange={(e) => setBudgetMin(e.target.value)}
                        placeholder="500"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="budgetMax">Budget Max ($)</label>
                    <div className="input-wrapper">
                      <span className="input-icon">💰</span>
                      <input
                        type="number"
                        id="budgetMax"
                        value={budgetMax}
                        onChange={(e) => setBudgetMax(e.target.value)}
                        placeholder="1000"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="personal-row">
                  <div className="form-group">
                    <label htmlFor="moveInDate">Move-in Date</label>
                    <div className="input-wrapper">
                      <span className="input-icon">📅</span>
                      <input
                        type="date"
                        id="moveInDate"
                        value={moveInDate}
                        onChange={(e) => setMoveInDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="children">Children</label>
                    <div className="input-wrapper">
                      <span className="input-icon">👶</span>
                      <select
                        id="children"
                        value={children}
                        onChange={(e) => setChildren(e.target.value)}
                      >
                        <option value="">Select option</option>
                        <option value="none">No children</option>
                        <option value="1">1 child</option>
                        <option value="2">2 children</option>
                        <option value="3+">3+ children</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">About Me</label>
                  <div className="textarea-wrapper">
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Tell potential roommates about yourself..."
                      rows="4"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="terms-agreement">
                <input 
                  type="checkbox" 
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  required
                />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" className="terms-link">Terms of Service</Link>
                  {" "}and{" "}
                  <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className={`register-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="register-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="signin-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;