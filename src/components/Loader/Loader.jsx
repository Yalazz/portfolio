// 📁 src/components/Loader/Loader.jsx
import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-container" role="status" aria-label="Loading...">
      <div className="loader-scanlines" />
      <div className="loader-content">
        <span className="loader-text glitch">LOADING</span>
        <span className="loader-bar" />
      </div>
    </div>
  );
}
