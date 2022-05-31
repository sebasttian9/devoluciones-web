import React from "react";
import "../css/spinner.css";

export default function LoadingSpinner({mensaje}) {
  return (
        <div className="spinner-container mt-5" style={{'textAlign': 'center'}}>
          <div className="loading-spinner mt-5">
          </div>
          <span >{mensaje}</span>
        </div>

  );
}