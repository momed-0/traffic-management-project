import React from "react";

const WorkInProgress = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Work in Progress</h1>
      <p style={styles.text}>We're working hard to bring something amazing!</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  heading: {
    color: "#333",
  },
  text: {
    color: "#666",
  },
};

export default WorkInProgress;
