import React from "react";

function SelectTargetNode({ data }) {
  return (
    <div className="p-4 bg-gradient-to-br from-orange-200 to-orange-100 rounded-2xl shadow-md border-2 border-orange-400 hover:shadow-lg transition">
  <h3 className="font-bold mb-2 text-orange-900 text-lg">🎯 Select Target</h3>
  <select
    onChange={(e) => data.setTarget(e.target.value)}
    className="w-full p-2 border border-orange-300 rounded-lg bg-white text-orange-700 font-semibold"
    value={data.target}
  >
    <option value="">Select target column</option>
    {data.columns.map((col) => (
      <option key={col} value={col}>{col}</option>
    ))}
  </select>
</div>

  );
}

export default SelectTargetNode;