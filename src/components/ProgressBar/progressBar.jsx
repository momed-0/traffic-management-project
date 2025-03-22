<<<<<<< HEAD
import React from "react";
import "./progressBar.css"; // Add CSS for the progress bar

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

=======
import React from "react";
import "./progressBar.css"; // Add CSS for the progress bar

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

>>>>>>> 14fa9f973e246b166e06a200410a8856421bcd9e
export default ProgressBar;