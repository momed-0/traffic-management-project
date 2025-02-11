import React, { useState, useEffect } from "react";
import './Table.css';

const TrafficDataTable = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Function to convert a date string to a Unix timestamp
  const convertDateToUnix = (dateString) => {
    return Math.floor(new Date(dateString).getTime() / 1000); // Convert to seconds
  };

  // Function to convert a Unix timestamp to a readable date string in dd-mm-yyyy format
  const convertUnixToDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds

    // Format the date as dd-mm-yyyy
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const fetchTrafficDataInitial = async () => {
      try {
        const response = await fetch('https://50vrn9obe2.execute-api.us-east-1.amazonaws.com/API1/Count?start_time=1737184640&end_time=1737184651');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result && result.length > 0) {
          setHeaders(Object.keys(result[0]));
          setData(result);
        } else {
          setData([]);
          alert("No data found for the provided time range.");
        }
      } catch (error) {
        console.error("Error fetching traffic data:", error);
      }
    };

    fetchTrafficDataInitial();
  }, []);

  const fetchTrafficData = async () => {
    if (!startTime || !endTime) {
      alert("Please provide both start time and end time!");
      return;
    }

    // Convert the date strings to Unix timestamps
    const startUnix = convertDateToUnix(startTime);
    const endUnix = convertDateToUnix(endTime);

    try {
      const url = `https://50vrn9obe2.execute-api.us-east-1.amazonaws.com/API1/Count?start_time=${startUnix}&end_time=${endUnix}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result && result.length > 0) {
        setHeaders(Object.keys(result[0]));
        setData(result);
      } else {
        setData([]);
        alert("No data found for the provided time range.");
      }
    } catch (error) {
      console.error("Error fetching traffic data:", error);
    }
  };

  const renderTable = () => {
    if (data.length === 0) {
      return <p>No data available for the selected time range.</p>;
    }

    return (
      <table className="table-div-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex} data-label={header}>
                  {header.toLowerCase().includes('time')
                    ? convertUnixToDate(row[header])
                    : row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="table-div">
      <h1>Traffic Data</h1>
      <div>
        <label>
          Start Time:{" "}
          <input
            type="datetime-local" // Use datetime-local for date and time input
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            placeholder="Enter start time (YYYY-MM-DD HH:MM:SS)"
          />
        </label>
        <label>
          End Time:{" "}
          <input
            type="datetime-local" // Use datetime-local for date and time input
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            placeholder="Enter end time (YYYY-MM-DD HH:MM:SS)"
          />
        </label>
        <button onClick={fetchTrafficData}>Fetch Data</button>
      </div>
      <div>{data.length > 0 ? renderTable() : <p>Loading...</p>}</div>
    </div>
  );
};

export default TrafficDataTable;