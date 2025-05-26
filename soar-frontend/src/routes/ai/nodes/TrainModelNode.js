// components/TrainModelNode.js
import React, { useState } from "react";
import { Button } from "antd";
import { Brain } from "lucide-react";

function TrainModelNode({ data }) {
  const [isTraining, setIsTraining] = useState(false);

  const handleTrainClick = async () => {
    setIsTraining(true);
    try {
      await data.onTrain(); // Let the parent component handle the modal
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div className="p-4 bg-orange-50 rounded-2xl shadow-md border border-orange-200 w-64">
      <div className="flex items-center mb-3">
        <Brain className="text-orange-600 mr-2" size={20} />
        <h3 className="text-orange-800 font-semibold text-lg">Train Model</h3>
      </div>

      <Button
        type="primary"
        onClick={handleTrainClick}
        className="w-full bg-orange-500 hover:bg-orange-600 border-none transition duration-200"
        disabled={!data.canTrain}
        loading={isTraining}
      >
        Train Model
      </Button>

      {data.trainingResult && (
        <p className="mt-3 text-sm text-orange-700">{data.trainingResult}</p>
      )}
    </div>
  );
}

export default TrainModelNode;