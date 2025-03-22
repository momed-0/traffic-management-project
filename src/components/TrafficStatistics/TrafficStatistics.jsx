import React from "react";
import TrafficDataTable from "../Table/trafficDataTable.jsx";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import "./TrafficStatistics.css";

const COLORS = ["#8884d8", "#82ca9d", "#ff7300", "#ffbb28", "#ff8042", "#0088FE"];

const TrafficStatistics = ({ data, selectedRoad }) => {
  if (!data || data.length === 0) {
    return <p className="no-data">No traffic data available for {selectedRoad}.</p>;
  }

  // Aggregate vehicle counts
  const aggregateVehicleData = (data) => {
    const summary = {
      bus: 0,
      bicycle: 0,
      auto: 0,
      car: 0,
      truck: 0,
      motorcycle: 0,
    };

    data.forEach((entry) => {
      summary.bus += entry.bus || 0;
      summary.bicycle += entry.bicycle || 0;
      summary.auto += entry.Auto || 0;
      summary.car += entry.car || 0;
      summary.truck += entry.truck || 0;
      summary.motorcycle += entry.motorcycle || 0;
    });

    return Object.keys(summary).map((key) => ({ vehicle: key, count: summary[key] }));
  };

  const chartData = aggregateVehicleData(data);

  // Prepare time-series data for Line Chart (assuming timestamps exist)
  const timeSeriesData = data.map((entry) => ({
    time: new Date(entry.timestamp * 1000).toLocaleTimeString(),
    count: entry.car + entry.bus + entry.motorcycle + entry.truck + entry.bicycle + (entry.auto || 0),
  }));

  return (
    <div className="traffic-statistics">
      <h2>Traffic Statistics for <span className="highlight">{selectedRoad}</span></h2>

      {/* Bar Chart */}
      <div className="chart-container">
        <h3>Vehicle Count Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="vehicle" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#4A90E2" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart & Line Chart Side by Side */}
      <div className="chart-row">
        {/* Pie Chart */}
        <div className="chart-container pie-chart">
          <h3>Vehicle Type Share</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} dataKey="count" nameKey="vehicle" cx="50%" cy="50%" outerRadius={100} label>
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="chart-container line-chart">
          <h3>Vehicle Count Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="none" />
              <YAxis  />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#FF5733" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Traffic Data Table */}
      <TrafficDataTable data={data} />
    </div>
  );
};

<<<<<<< HEAD
export default TrafficStatistics;
=======
export default TrafficStatistics;
>>>>>>> 14fa9f973e246b166e06a200410a8856421bcd9e
