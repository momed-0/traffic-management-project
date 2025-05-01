import React, { useState } from "react";
import "./simulation.css";

const SimulationForm = () => {
  const [formData, setFormData] = useState({
    lane1: "",
    lane2: "",
    lane3: "",
    lane4: "",
    lane5: "",
    lane6: "",
    lane7: "",
    lane8: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value === "" ? "" : Number(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://xgboost-flask-server.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Failed to fetch prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseResult = () => {
    setResult(null); // Close the result window
    setFormData({
      lane1: "",
      lane2: "",
      lane3: "",
      lane4: "",
      lane5: "",
      lane6: "",
      lane7: "",
      lane8: "",
    }); // Clear the form inputs
  };

  return (
    <div className="simulation-form-container">
      <h2>Traffic Simulation</h2>
      <form onSubmit={handleSubmit} className="simulation-form">
        {Object.keys(formData).map((lane, index) => (
          <div key={index} className="form-group">
            <label htmlFor={lane}>{lane.toUpperCase()}</label>
            <input
              type="number"
              id={lane}
              name={lane}
              value={formData[lane]}
              onChange={handleChange}
              required
              min="0"
              placeholder={`Enter value for ${lane}`}
            />
          </div>
        ))}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div className="result-modal">
          <div className="result-modal-content">
            <button className="close-button" onClick={handleCloseResult}>
              &times;
            </button>
            <h3>Prediction Result</h3>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationForm;