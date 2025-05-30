import React from "react";
import { Link } from "react-router-dom";
import "./nav-bar.css";

import { useAuthContext } from "../../Context/AuthContext";

export const Navbar = () => {
  const { authUser } = useAuthContext();

  console.log("authUser----",authUser);
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">RoomMateFinder</Link>
      </div>

      <div className="nav-center">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/listings">Listings</Link>
          </li>
          <li>
            <Link to="/about-us">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/how it works">How It Works</Link>
          </li>
        </ul>
      </div>

      <div className="nav-right">
        <ul className="nav-links">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
