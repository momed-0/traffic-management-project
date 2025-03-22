import React, { useEffect, useState,useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { roadPath,roadCenter, vehicleColors,legendVehicle} from "../config";
import { transformVehicleData } from "./transformVehicleData";
import EmptyData from "../EmptyData/EmptyData";
import "./map.css";

const Map = ({ vehicleData, selectedRoad }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // memorize the function , rerun only when dependencies change
  const vehicleAnimated = useMemo(() => transformVehicleData(vehicleData, selectedRoad), [vehicleData,selectedRoad]);

  useEffect(() => {
    if (!vehicleData || vehicleData.length === 0) return;
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < vehicleAnimated.length - 1 ? prevIndex + 1 : prevIndex
      );
    }, 1000); // Move to next timestamp every second

    return () => clearInterval(interval);
  }, [isRunning, vehicleData,vehicleAnimated.length]);

  const handleToggle = () => {
    setIsRunning((prev) => !prev); // Toggle between running and paused
  };

  const handleReset = () => {
    setCurrentIndex(0); // Restart from first timestamp
    setIsRunning(false); // Stop the execution by default
  };

  const currentData = vehicleAnimated[currentIndex] || []; // array of vehicles in current timestamp with their unique id
  if(!vehicleData || vehicleData.length === 0) {
    let text = "";
    if(!selectedRoad) text = "Please select a road, date, and provide both start and end times!"
    else text = "No data available for the selected time range!"
    return  (
      <div className="map-container">
        <EmptyData displayText={text}/>
      </div>
    )
  }
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

        
        {
         currentData.map((vehicle) => (
            <CircleMarker
              key={`${vehicle.type}-${vehicle.id}`}
              center={roadPath[selectedRoad][vehicle.index]}
              radius={vehicleColors[vehicle.type].size}
              fillColor={vehicleColors[vehicle.type].color}
              color={vehicleColors[vehicle.type].color}
              fillOpacity={1}
            />
          ))}
      </MapContainer>
      <div className="controls-container">
        <p>{vehicleData?.[currentIndex]?.detection_time ? new Date(vehicleData[currentIndex].detection_time * 1000).toLocaleString() : "N/A"}</p>
        <p>Road: {vehicleData?.[currentIndex]?.road_name}</p>

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