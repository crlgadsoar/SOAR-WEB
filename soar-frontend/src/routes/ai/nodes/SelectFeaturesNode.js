import React from "react";
import { Settings2 } from "lucide-react";

function SelectFeaturesNode({ data }) {
  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      data.onSelectFeatures([...data.features, value]);
    } else {
      data.onSelectFeatures(data.features.filter((item) => item !== value));
    }
  };

  return (
    <div className="p-4 bg-orange-50 rounded-2xl shadow-md border border-orange-200 w-64">
      <div className="flex items-center mb-3">
        <Settings2 className="text-orange-600 mr-2" size={20} />
        <h3 className="text-orange-800 font-semibold text-lg">Select Features</h3>
      </div>
      <div className="space-y-2">
        {data.columns
          .filter((col) => col !== data.target)
          .map((col) => (
            <label
              key={col}
              htmlFor={`feature-${col}`}
              className="flex items-center space-x-2 hover:bg-orange-100 p-1 rounded cursor-pointer transition"
            >
              <input
                type="checkbox"
                id={`feature-${col}`}
                value={col}
                checked={data.features.includes(col)}
                onChange={handleChange}
                className="form-checkbox accent-orange-500 w-4 h-4"
              />
              <span className="text-sm text-gray-800">{col}</span>
            </label>
          ))}
      </div>
    </div>
  );
}

export default SelectFeaturesNode;
