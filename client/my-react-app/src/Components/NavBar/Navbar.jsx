import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import { useState, useEffect } from "react";
import "./nav-bar.css";

export const Navbar = () => {
  const { authUser, logoutUser } = useAuthContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const result = await logoutUser();
      if (result.status === 200) {
        navigate("/");
        setMenuOpen(false); // close menu on logout
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const goToDashboard = () => {
    if (authUser.role === "seeker") {
      navigate("/seeker-dashboard");
    } else if (authUser.role === "provider") {
      navigate("/provider-dashboard");
    }
    setMenuOpen(false);
  };

  const goToAccount = () => {
    navigate("/update-profile");
    setMenuOpen(false);
  };

  // Close menu if user clicks outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".hamburger-container")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">RoomMateFinder</Link>
      </div>

      <div className="nav-center">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/listings">Listings</Link></li>
          <li><Link to="/about-us">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/how it works">How It Works</Link></li>
        </ul>
      </div>

      <div className="nav-right">
        {authUser.name ? (
          <div className="hamburger-container">
            <button
              className="hamburger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
            {menuOpen && (
              <div className="hamburger-dropdown">
                <button onClick={goToDashboard}>Dashboard</button>
                <button onClick={goToAccount}>Account</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <ul className="nav-links">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
};
