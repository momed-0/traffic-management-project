import React, { useState } from "react";
import { initConfig } from "../config";

const convertDateToUnix = (dateString) => {
  return Math.floor(new Date(dateString).getTime() / 1000);
};

const TimeRangeSelector = ({ onFetchData , initData}) => {
  const [selectedRoad, setSelectedRoad] = useState(initConfig[0]); // show initial data on selectors
  const [startTime, setStartTime] = useState(new Date(initConfig[1] * 1000).toISOString().slice(0, 16));
  const [endTime, setEndTime] = useState(new Date(initConfig[2] * 1000).toISOString().slice(0, 16));


  const handleFetchData = () => {
    if (!selectedRoad || !startTime || !endTime) {
      alert("Please select a road and provide both start and end times!");
      return;
    }
    const startUnix = convertDateToUnix(startTime);
    const endUnix = convertDateToUnix(endTime);
    onFetchData(selectedRoad, startUnix, endUnix);
  };

  return (
    <div>
      <h2>Select Time Range</h2>
      <label>
        Select Road:
        <select value={selectedRoad} onChange={(e) => setSelectedRoad(e.target.value)}>
          <option value="">-- Select a Road --</option>
          <option value="palayam">Palayam</option>
          <option value="stadiumJn">Stadium Jn</option>
          <option value="highway">Highway</option>
        </select>
      </label>
      {selectedRoad && (
        <>
          <label>
            Start Time:
            <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </label>
          <label>
            End Time:
            <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </label>
          <button onClick={handleFetchData}>Fetch Data</button>
        </>
      )}
    </div>
  );
};

export default TimeRangeSelector;
