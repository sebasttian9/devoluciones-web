import React from "react";
import "../css/spinner.css";

export default function LoadingSpinner({mensaje}) {
  return (
    <tr>
      <td colSpan={6}>
        <div className="spinner-container ">
          <div className="loading-spinner">
          </div>
          <span>{mensaje}</span>
        </div>
      </td>
    </tr>
  );
}