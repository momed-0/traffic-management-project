import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./simulation.css";


// Custom icon for markers 
const customIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

const SimulationForm = () => {
  const [formData, setFormData] = useState({
    lane1: "",
    lane2: "",
    lane3: "",
    lane4: "",
    lane5: "",
    lane6: "",
    lane7: "",
    lane8: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e, lane) => {
    const {value } = e.target;
    setFormData({ ...formData, [lane]: value === "" ? "" : Number(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);


    const numericFormData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, Number(value)])
    );

    try {
      const response = await fetch("https://xgboost-flask-server.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(numericFormData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Failed to fetch prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseResult = () => {
    setResult(null); // Close the result window
    setFormData({
      lane1: "",
      lane2: "",
      lane3: "",
      lane4: "",
      lane5: "",
      lane6: "",
      lane7: "",
      lane8: "",
    }); // Clear the form inputs
  };

  return (
    <div className="simulation-form-container">
      <h2>Traffic Simulation</h2>
      <MapContainer 
            center={[11.255312,75.788919]} 
            zoom={16} 
            zoomControl={false}
            style={{ height: "500px", width: "100%" }}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            dragging={false}
        >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Input boxes attached to specific coordinates */}
        <Marker position={[11.255457,75.785566]} icon={customIcon}>
          <Popup>
            <div>
              <label>Lane A1:</label>
              <input
                type="number"
                value={formData.lane1}
                onChange={(e) => handleChange(e, "lane1")}
                placeholder="Enter value"
              />
            </div>
          </Popup>
        </Marker>

        <Marker position={[11.256168,75.786558]} icon={customIcon}>
          <Popup>
            <div>
              <label>Lane A2:</label>
              <input
                type="number"
                value={formData.lane2}
                onChange={(e) => handleChange(e, "lane2")}
                placeholder="Enter value"
              />
            </div>
          </Popup>
        </Marker>

        <Marker position={[11.254915,75.786364]} icon={customIcon}>
          <Popup>
            <div>
              <label>Lane A3:</label>
              <input
                type="number"
                value={formData.lane3}
                onChange={(e) => handleChange(e, "lane3")}
                placeholder="Enter value"
              />
            </div>
          </Popup>
        </Marker>
        <Marker position={[11.255347,75.787116]} icon={customIcon}>
          <Popup>
            <div>
              <label>Lane A4:</label>
              <input
                type="number"
                value={formData.lane4}
                onChange={(e) => handleChange(e, "lane4")}
                placeholder="Enter value"
              />
            </div>
          </Popup>
        </Marker>
        <Marker position={[11.255278,75.791366]} icon={customIcon}>
          <Popup>
            <div>
              <label>Lane B1</label>
              <input
                type="number"
                value={formData.lane5}
                onChange={(e) => handleChange(e, "lane5")}
                placeholder="Enter value"
              />
            </div>
          </Popup>
        </Marker>
        <Marker position={[11.255856,75.791817]} icon={customIcon}>
          <Popup>
            <div>
              <label>Lane B2:</label>
              <input
                type="number"
                value={formData.lane6}
                onChange={(e) => handleChange(e, "lane6")}
                placeholder="Enter value"
              />
            </div>
          </Popup>
        </Marker>
        <Marker position={[11.255284,75.792471]} icon={customIcon}>
          <Popup>
            <div>
              <label>Lane B3:</label>
              <input
                type="number"
                value={formData.lane7}
                onChange={(e) => handleChange(e, "lane7")}
                placeholder="Enter value"
              />
            </div>
          </Popup>
        </Marker>
        <Marker position={[11.254652,75.791923]} icon={customIcon}>
          <Popup>
            <div>
              <label>Lane B4:</label>
              <input
                type="number"
                value={formData.lane8}
                onChange={(e) => handleChange(e, "lane8")}
                placeholder="Enter value"
              />
            </div>
          </Popup>
        </Marker>

        {/* Add more markers for other lanes */}
      </MapContainer>
      <button
        type="submit"
        className="submit-button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div className="result-modal">
          <div className="result-modal-content">
            <button className="close-button" onClick={handleCloseResult}>
              &times;
            </button>
            <h3>Prediction Result</h3>
            <div className="result-table">
                {Object.entries(result).map(([key, value]) => (
                <div key={key} className="result-row">
                    <span className="result-key">{key}:</span>
                    <span className="result-value">{value}</span>
                </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationForm;