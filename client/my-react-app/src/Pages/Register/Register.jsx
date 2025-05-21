import React from 'react';

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log('Sign-up submitted');
  };

  return (
    <>
      <main>
        <div className="form-container">
          <h2>Create Your Account</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your Full Name"
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="6+ characters"
              required
            />

            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm password"
              required
            />

            <button type="submit">Sign Up</button>
          </form>
          <p className="login-link">
            Already have an account? <a href="/login">Login here</a>.
          </p>
        </div>
      </main>
    </>
  );
};

export default Register;
