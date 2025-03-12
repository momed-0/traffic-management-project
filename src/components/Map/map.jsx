import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { roadPath,roadCenter, vehicleColors,legendVehicle} from "../config";

const Map = ({ vehicleData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!vehicleData || vehicleData.length === 0) return;
    if (!isRunning) return; 

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < vehicleData.length - 1 ? prevIndex + 1 : prevIndex
      );
    }, 1000); // Move to next timestamp every second

    return () => clearInterval(interval);
  }, [isRunning, vehicleData]);


  const handleToggle = () => {
    setIsRunning((prev) => !prev); // Toggle between running and paused
  };

  const handleReset = () => {
    setCurrentIndex(0); // Restart from first timestamp
    setIsRunning(false); // stop the execution by default
  };


  const currentData = vehicleData[currentIndex] || {};
  return (
    <div style={{ display: "flex" }}>
      <MapContainer 
        center={roadCenter} 
        zoom={22} 
        style={{ width: "800px", height: "500px" }}
        zoomControl={false} 
        scrollWheelZoom={false} 
        doubleClickZoom={false} 
        dragging={true}
        >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={roadPath} color="blue" weight={0.5} />

        
        {currentData &&
          Object.keys(currentData).map((type) => {
            if (type !== "road_name" && type !== "detection_time" && vehicleColors[type]) {
              return [...Array(currentData[type])].map((_, i) => {
                const randomIndex = Math.floor(Math.random() * roadPath.length);
                return (
                  <CircleMarker
                    key={`${type}-${i}`}
                    center={roadPath[randomIndex]}
                    radius={vehicleColors[type].size}
                    fillColor={vehicleColors[type].color}
                    color={vehicleColors[type].color}
                    fillOpacity={1}
                  />
                );
              });
            }
            return null;
          })}
      </MapContainer>
      <div style={{ marginLeft: "10px", padding: "10px", background: "white", borderRadius: "5px", height: "fit-content" }}>
        <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>
           Time: {currentData.detection_time ? new Date(currentData.detection_time * 1000).toLocaleString() : "N/A"}
        </p>
        <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>
          Road: {currentData.road_name}
        </p>
        
        <div style={{ marginTop: "10px" }}>
          <button onClick={handleToggle} style={buttonStyle}>
            {isRunning ? "Stop" : "Start"}
          </button>
          <button onClick={handleReset} style={buttonStyle}>Reset</button>
        </div>

        {Object.entries(legendVehicle).map(([type, { color, size }]) => (
          <div key={type} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <div
              style={{
                width: `${size * 2}px`,
                height: `${size * 2}px`,
                backgroundColor: color,
                borderRadius: "50%",
                marginRight: "10px",
              }}
            ></div>
            <span>{type}</span>
          </div>
        ))}
      </div>
      
    </div>
  );
};

// Button styling
const buttonStyle = {
  margin: "5px",
  padding: "2px 5px",
  fontSize: "12px",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  backgroundColor: "#007BFF",
  color: "white",
};


export default Map;