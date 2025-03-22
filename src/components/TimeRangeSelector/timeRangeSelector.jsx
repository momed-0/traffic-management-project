import React, { useState } from "react";
import "./timeRangeSelector.css";

const convertToUnix = (date, time) => {
  return Math.floor(new Date(`${date}T${time}:00`).getTime() / 1000);
};

const TimeRangeSelector = ({ onFetchData, selectedRoad, setSelectedRoad }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleFetchData = () => {
    if (!selectedRoad || !selectedDate || !startTime || !endTime) {
      alert("Please select a road, date, and provide both start and end times!");
      return;
    }
    const startUnix = convertToUnix(selectedDate, startTime);
    const endUnix = convertToUnix(selectedDate, endTime);
    if (endUnix <= startUnix) {
      alert("End time must be after start time!");
      return;
    }
    onFetchData(selectedRoad, startUnix, endUnix);
  };

  return (
    <div className="time-range-selector">
      <label className="road-selector-label">
        select an area:
        <select
          className="road-selector"
          value={selectedRoad}
          onChange={(e) => setSelectedRoad(e.target.value)}
        >
          <option value="palayam">Palayam</option>
          <option value="PuthiyaStand">Puthiya Stand</option>
          <option value="stadiumJn">Stadium Jn</option>
          <option value="highway">Highway</option>
          <option value="rajpath">Rajpath</option>
        </select>
      </label>
      {selectedRoad && (
        <div className="time-inputs">
          <label className="date-label">
            choose a Date:  
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="time-input"
            />
          </label>
          <label className="time-label">
            from:
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="time-input"
              disabled={!selectedDate}
            />
          </label>
          <label className="time-label">
            till:
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="time-input"
              disabled={!selectedDate}
            />
          </label>
          <button className="fetch-button" onClick={handleFetchData}>
            Fetch Data
          </button>
        </div>
      )}
    </div>
  );
};

export default TimeRangeSelector;
