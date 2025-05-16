import React from 'react';
import { Link } from 'react-router-dom';
import './nav-bar.css';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">RoomMateFinder</Link>
      </div>
      <div className="cnt-nav">
      <ul className="nav-links">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
      </ul>
      </div>
    </nav>
  );
};
