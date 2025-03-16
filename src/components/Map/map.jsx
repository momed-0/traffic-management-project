import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { roadPath, roadCenter, vehicleColors, legendVehicle } from "../config";
import "./map.css";

const Map = ({ vehicleData, selectedRoad }) => {
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
    setIsRunning(false); // Stop the execution by default
  };

  const currentData = vehicleData[currentIndex] || {};

  return (
    <div className="map-container">
      <MapContainer
        center={roadCenter[selectedRoad]}
        zoom={22}
        className="leaflet-container"
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={roadPath[selectedRoad]} color="blue" weight={0.5} />

        {currentData &&
          Object.keys(currentData).map((type) => {
            if (type !== "road_name" && type !== "detection_time" && vehicleColors[type]) {
              return [...Array(currentData[type])].map((_, i) => {
                const randomIndex = Math.floor(Math.random() * roadPath[selectedRoad].length);
                return (
                  <CircleMarker
                    key={`${type}-${i}`}
                    center={roadPath[selectedRoad][randomIndex]}
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

      <div className="controls-container">
        <p>Time: {currentData.detection_time ? new Date(currentData.detection_time * 1000).toLocaleString() : "N/A"}</p>
        <p>Road: {currentData.road_name}</p>

        <div className="buttons-container">
          <button onClick={handleToggle} className="button">
            {isRunning ? "Stop" : "Start"}
          </button>
          <button onClick={handleReset} className="button">
            Reset
          </button>
        </div>

        <div className="legend-container">
          {Object.entries(legendVehicle).map(([type, { color, size }]) => (
            <div key={type} className="legend-item">
              <div
                className="legend-circle"
                style={{ backgroundColor: color, width: `${size * 2}px`, height: `${size * 2}px` }}
              ></div>
              <span className="legend-text">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;