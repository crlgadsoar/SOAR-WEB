import React, { useState } from "react";
import axios from "axios";
import CanvasJSReact from "./canvasjs.react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DoughnutChart = ({ theme, exportEnable = "", style, data }) => {
  const [incidents, setIncidents] = useState([]); // Store fetched incidents
  const [selectedSeverity, setSelectedSeverity] = useState(""); // Track selected severity
  const [showModal, setShowModal] = useState(false); // Track modal visibility

  const handleDataPointClick = (e) => {
    const severity = e.dataPoint.label; // Get clicked severity
    setSelectedSeverity(severity);
    setShowModal(true); // Show the modal

    console.log("Clicked Severity:", severity);

    // Fetch incidents from the API
    axios
      .get(`http://localhost:5002/incidents/severity?severity=${severity}`, {
        withCredentials: true, // Ensures cookies are sent
      })
      .then((response) => {
        console.log("Fetched Incidents:", response.data);
        setIncidents(response.data); // Store incidents in state
      })
      .catch((error) => {
        console.error("Error fetching incidents:", error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSeverity("");
    setIncidents([]);
  };

  const options = {
    animationEnabled: true,
    theme: theme,
    exportEnabled: exportEnable,
    legend: {
      verticalAlign: "bottom",
      horizontalAlign: "center",
      fontSize: 14,
    },
    data: [
      {
        type: "doughnut",
        toolTipContent: "{label}: <strong>{y}</strong>",
        indexLabel: "{label}: {y}",
        indexLabelPlacement: "outside",
        indexLabelFontSize: 12,
        showInLegend: true,
        legendText: "{label}",
        dataPoints: [
          { label: "Critical", y: data?.critical || 0, color: "red" },
          { label: "Info", y: data?.info || 0, color: "blue" },
          { label: "High", y: data?.high || 0, color: "orange" },
          { label: "Medium", y: data?.medium || 0, color: "yellow" },
          { label: "Low", y: data?.low || 0, color: "green" },
        ],
        click: handleDataPointClick, // Make chart segments clickable
      },
    ],
  };

  return (
    <div>
      {/* Doughnut Chart */}
      <CanvasJSChart options={options} containerProps={style} />

      {/* Custom Modal Popup */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Incidents for Severity: {selectedSeverity}</h3>
            <button className="close-button" onClick={handleCloseModal}>
              ✖
            </button>

            {incidents.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Incident ID</th>
                    <th>Severity</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((incident) => (
                    <tr key={incident.incidentid}>
                      <td>{incident.incidentid}</td>
                      <td>{incident.severity}</td>
                      <td>{incident.description}</td>
                      <td>{incident.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No incidents found for {selectedSeverity} severity.</p>
            )}
          </div>
        </div>
      )}

      {/* Styles for Modal */}
      <style>
        {`
          /* Modal Overlay - Full Screen */
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999; /* Ensure it's above everything */
          }
          
          /* Modal Content */
          .modal-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            width: 50%;
            max-height: 80%;
            overflow-y: auto;
            position: relative;
            z-index: 10000;
            box-shadow: 0px 5px 15px rgba(0,0,0,0.3);
          }

          /* Close Button */
          .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            border: none;
            background: none;
            font-size: 20px;
            cursor: pointer;
          }

          /* Prevent Background Scrolling when Modal is Open */
          body.modal-open {
            overflow: hidden;
          }

          /* Table Styling */
          table {
            width: 100%;
            border-collapse: collapse;
          }
          
          th, td {
            padding: 8px;
            border: 1px solid #ddd;
            text-align: left;
          }
          
          th {
            background: #f2f2f2;
          }
        `}
      </style>
    </div>
  );
};

export default DoughnutChart;
