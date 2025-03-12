import React, { useState } from "react";
import LandingPage from "./components/landingPage";
import Header from "./components/Header/header";
import Map from "./components/Map/map";
import TimeRangeSelector from "./components/TimeRangeSelector/timeRangeSelector";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initData } from "./components/config";

const App = () => {
  const [data, setData] = useState(initData);
  const endpoint = process.env.REACT_APP_API_ENDPOINT;

  const fetchTrafficData = async (road, startUnix, endUnix) => {
    try {
      const url = `${endpoint}/count/${road}?start_time=${startUnix}&end_time=${endUnix}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      const body = JSON.parse(result.body)

      if (body && body.length > 0) {
        setData(body);
      } else {
        setData([]);
        alert("No data found for the provided time range.");
      }
    } catch (error) {
      console.error("Error fetching traffic data:", error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <TimeRangeSelector onFetchData={fetchTrafficData} />
        <Routes>
          <Route path="/" element={<LandingPage data={data} />} />
          <Route path="/traffic-management-project" element={<LandingPage data={data} />} />
          <Route path="/map" element={<Map vehicleData={data}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
