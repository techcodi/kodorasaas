import React from "react";
import "./Spinner.css";

export default function Spinner() {
  return (
    <div
      className="spinner-container"
      style={{ textAlign: "center", padding: "1rem" }}
    >
      <div className="spinner"></div>
      <p>Generating your resume...</p>
    </div>
  );
}
