import "./App.css";
import { HomePage } from "./Pages/HomePage/HomePage";
import { Navbar } from "./Components/NavBar/Navbar";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Contact from "./Pages/Contact/Contact";
import HowItWorks from "./Pages/How_it_works/HowItWorks";
import Listings from "./Pages/Listing/listings";
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* Persistent navigation bar across all routes */}
      <Navbar />
      <main>
        <Routes>
          {/* Define route paths and corresponding components */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/how it works" element={<HowItWorks />} />
          <Route path="/listings" element={<Listings/>} />
          {/* Fallback for undefined routes */}
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
