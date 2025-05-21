import React from 'react'
import './login.css'

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle login logic here
    console.log('Form submitted');
  };

  return (
    <div className="form-container">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
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
          placeholder="Enter your password"
          required
        />

        <button type="submit">Login</button>
      </form>
      <p className="signup-link">
        Don't have an account? <a href="/register">Sign up here</a>.
      </p>
    </div>
  );
};

export default Login;
