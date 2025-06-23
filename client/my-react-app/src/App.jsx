import "./App.css";
import { HomePage } from "./Pages/HomePage/HomePage";
import { Navbar } from "./Components/NavBar/Navbar";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Contact from "./Pages/Contact/Contact";
import HowItWorks from "./Pages/How_it_works/HowItWorks";
import Listings from "./Pages/Listing/listings";
import ProviderDashboard from "./Pages/ProviderDashboard/provider-dashboard.jsx";
import SeekerDashboard from "./Pages/SeekerDashboard/seeker-dashboard.jsx";
import ProviderRegistration from "./Pages/Provider-Registration/provider-registration.jsx";
import SeekerRegistration from "./Pages/Seeker-Registration/seeker-registration.jsx";
import Room from "./Pages/Room";
import UpdateProfile from "./Pages/UpdateProfile/UpdateProfile.jsx";
import SeekerProfile from "./Pages/SeekerProfile/SeekerProfile.jsx"

import { AuthProvider } from "./Context/AuthContext.js";
import { RoomProvider } from "./Context/RoomContext.js";
import EditRoom from "./Pages/EditRoom/EditRoom.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <RoomProvider>
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
              <Route path="/listings" element={<Listings />} />
              <Route
                path="/provider-dashboard"
                element={<ProviderDashboard />}
              />
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="/seeker-dashboard" element={<SeekerDashboard />} />
              <Route path="/view-room/:id" element={<Room />} />
              <Route path="/edit-room/:id" element={<EditRoom />} />
              <Route path="/seeker/:seekerId" element={<SeekerProfile />} />


              <Route
                path="/provider-registration"
                element={<ProviderRegistration />}
              />
              <Route
                path="/seeker-registration"
                element={<SeekerRegistration />}
              />

              {/* Fallback for undefined routes */}
              <Route path="*" element={<h2>404: Page Not Found</h2>} />
            </Routes>
          </main>
        </RoomProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
