import React, { useState } from "react";
import axios from "axios";
import CanvasJSReact from "./canvasjs.react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DoughnutChart = ({ theme, exportEnable = "", style, data }) => {
  const [incidents, setIncidents] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleDataPointClick = (e) => {
    const status = e.dataPoint.label;
    setSelectedStatus(status);
    setShowModal(true);

    axios
      .get(`http://localhost:5002/incidents/status?status=${encodeURIComponent(status)}`, {
        withCredentials: true, // Ensures cookies are sent
      })
      .then((response) => {
        setIncidents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching incidents:", error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStatus("");
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
          { label: "Mitigated", y: data?.mitigated || 0, color: "green" },
          { label: "Under Investigation", y: data?.["Under Investigation"] || data?.["under investigation"] || 0, color: "purple" },
          { label: "Manually Mitigated", y: data?.["Mitigated Manually"] || data?.["mitigated_manually"] || 0, color: "blue" },
        ],
        click: handleDataPointClick,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} containerProps={style} />
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Incidents for Status: {selectedStatus}</h3>
            <button className="close-button" onClick={handleCloseModal}>✖</button>
            {incidents.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Incident ID</th>
                    <th>Status</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((incident) => (
                    <tr key={incident.incidentid}>
                      <td>{incident.incidentid}</td>
                      <td>{incident.status}</td>
                      <td>{incident.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No incidents found for {selectedStatus} status.</p>
            )}
          </div>
        </div>
      )}
      <style>
        {`
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
            z-index: 9999;
          }
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
          .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            border: none;
            background: none;
            font-size: 20px;
            cursor: pointer;
          }
          body.modal-open {
            overflow: hidden;
          }
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
