import React, { useState } from "react";
import { fetchIncidents } from "api/api"; // Import the fetchIncidents function
import CanvasJSReact from "./canvasjs.react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DoughnutChart = ({ theme, exportEnable = "", style, data }) => {
  const [incidents, setIncidents] = useState([]); // Store fetched incidents
  const [selectedSeverity, setSelectedSeverity] = useState(""); // Track selected severity
  const [showModal, setShowModal] = useState(false); // Track modal visibility

  const handleDataPointClick = async (e) => {
    const severity = e.dataPoint.label; // Get clicked severity
    setSelectedSeverity(severity);
    setShowModal(true); // Show the modal

    console.log("Clicked Severity:", severity);

    try {
      // Fetch incidents using the API function
      const fetchedIncidents = await fetchIncidents({ severity });
      console.log("Fetched Incidents:", fetchedIncidents);
      setIncidents(fetchedIncidents); // Store incidents in state
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
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
    </div>
  );
};

export default DoughnutChart;
