import React from "react";
import "./Table.css";

const TrafficDataTable = ({ data }) => {
  const convertUnixToDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  if (!data || data.length === 0) {
    return <p>No data available for the selected time range.</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="table-div">
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
                  {header.toLowerCase().includes("time") ? convertUnixToDate(row[header]) : row[header] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrafficDataTable;
