// nodes/ModelSelectionNode.js
import React from "react";

function ModelSelectionNode({ data }) {
  return (
    <div className="p-4 bg-gradient-to-br from-orange-200 to-orange-100 rounded-2xl shadow-md border-2 border-orange-400 hover:shadow-lg transition">
      <h3 className="font-bold mb-2 text-orange-900 text-lg">🤖 Select Model</h3>
      <select
        onChange={(e) => data.setSelectedModel(e.target.value)}
        className="w-full p-2 border border-orange-300 rounded-lg bg-white text-orange-700 font-semibold"
        value={data.selectedModel}
      >
        <option value="">Select a model</option>
        <option value="logistic_regression">Logistic Regression</option>
        <option value="random_forest">Random Forest</option>
      </select>
      {data.selectedModel && (
        <div className="mt-2 text-sm text-orange-600">
          Selected: {data.selectedModel === "logistic_regression" 
            ? "Logistic Regression" 
            : "Random Forest"}
        </div>
      )}
    </div>
  );
}

export default ModelSelectionNode;