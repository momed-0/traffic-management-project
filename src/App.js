import React, { useState, useEffect } from "react";
import LandingPage from "./components/landingPage";
import Header from "./components/Header/header";
import Map from "./components/Map/map";
import TimeRangeSelector from "./components/TimeRangeSelector/timeRangeSelector";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initData } from "./components/config";
import WorkInProgress from "./components/workInProgress";
import ProgressBar from "./components/ProgressBar/progressBar" ;

const App = () => {
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState(false);
  const [selectedRoad, setSelectedRoad] = useState("palayam");
  const [isAppLoaded, setIsAppLoaded] = useState(false); // Track app loading state
  const [progress, setProgress] = useState(0); // Track progress bar progress

  const endpoint = process.env.REACT_APP_API_ENDPOINT;

  const fetchTrafficData = async (road, startUnix, endUnix) => {
    setLoading(true);
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
      const body = JSON.parse(result.body);

      if (body && body.length > 0) {
        setData(body);
      } else {
        setData([]);
        alert("No data found for the provided time range.");
      }
    } catch (error) {
      console.error("Error fetching traffic data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Simulate app loading
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsAppLoaded(true); // App is fully loaded
          return 100;
        }
        return prevProgress + 10; // Increase progress by 10% every 200ms
      });
    }, 200);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Show ProgressBar only when the app is loading */}
        {!isAppLoaded && (
          <div className="loading-screen">
            <ProgressBar progress={progress} />
          </div>
        )}

        {/* Show the rest of the app only after loading is complete */}
        {isAppLoaded && (
          <>
            <Header />
            <TimeRangeSelector
              onFetchData={fetchTrafficData}
              selectedRoad={selectedRoad}
              setSelectedRoad={setSelectedRoad}
            />
            {loading && (
              <div className="loading-overlay">
                <div className="spinner"></div>
                <p>Loading data...</p>
              </div>
            )}
            <Routes>
              <Route path="/" element={<LandingPage data={data} />} />
              <Route
                path="/traffic-management-project"
                element={<LandingPage data={data} />}
              />
              <Route
                path="/map"
                element={<Map key={data.length} vehicleData={data} selectedRoad={selectedRoad} />}
              />
              <Route path="/live" element={<WorkInProgress />} />
              <Route path="/statistics" element={<WorkInProgress />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;