import React from "react";
import { ReactComponent as UploadIcon } from "../../../components/ImageCarousel/icon.svg";

function UploadDatasetNode({ data }) {
  return (
    <div className="p-3 bg-white rounded-lg shadow-xs border border-orange-200 hover:border-orange-300 transition-all">
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-md text-orange-800 mb-2">Upload Dataset</h3>
          
          <label className="flex flex-col items-center justify-center w-full p-2 border border-dashed border-orange-300 rounded-md cursor-pointer bg-orange-50 hover:bg-orange-100">
            <div className="w-[8px] h-[8px] flex items-center justify-center mb-0.5">
              <UploadIcon 
                className="w-full h-full"
                style={{
                  color: '#f97316',
                  opacity: 0.9
                }}
              />
            </div>
            
            <p className="text-xs text-orange-600 font-medium">Click to browse</p>
            <p className="text-[10px] text-orange-400 mt-0.5">Supports: CSV, JSON</p>
            <input 
              type="file" 
              accept=".csv,.json" 
              onChange={data.onUpload} 
              className="hidden" 
            />
          </label>
        </div>
      </div>

      {data.uploadMessage && (
        <div className={`mt-2 p-1 rounded text-xs ${
          data.uploadMessage.includes('success') 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {data.uploadMessage}
        </div>
      )}
    </div>
  );
}

export default UploadDatasetNode;