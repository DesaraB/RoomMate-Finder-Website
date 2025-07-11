// src/Components/MapPicker/MapPicker.jsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position} />;
};

const MapPicker = ({ onSelect }) => {
  const [position, setPosition] = useState(null);

  const handleSave = () => {
    if (position) {
      onSelect(position); // Return coordinates to parent
    }
  };

  return (
    <div>
      <MapContainer
        center={[41.3275, 19.8189]} // Tirana
        zoom={13}
        style={{ height: "400px", width: "100%", marginBottom: "1rem" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
      {position && (
        <button onClick={handleSave} style={{ padding: "10px 20px" }}>
          Save Location 📍
        </button>
      )}
    </div>
  );
};

export default MapPicker;
