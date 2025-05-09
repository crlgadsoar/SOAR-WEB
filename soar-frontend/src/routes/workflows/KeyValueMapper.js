// KeyValueMapper.js
import React from "react";
import { Input, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const KeyValueMapper = ({ mappingRows, onChange, outputNodeName = "Output Node", inputNodeName = "Input Node" }) => {
  // Add new empty row
  const handleAddRow = () => {
    onChange([...mappingRows, { outputKey: "", inputKey: "" }]);
  };

  // Update a row
  const handleRowChange = (idx, field, value) => {
    const updated = mappingRows.map((row, i) =>
      i === idx ? { ...row, [field]: value } : row
    );
    onChange(updated);
  };

  // Remove a row
  const handleRemoveRow = (idx) => {
    const updated = mappingRows.filter((_, i) => i !== idx);
    onChange(updated);
  };

  return (
    <div className="kv-mapper-table-container">
      <table className="kv-mapper-table">
        <thead>
          <tr>
            <th>Output Key ({outputNodeName})</th>
            <th>Input Key ({inputNodeName})</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {mappingRows.map((row, idx) => (
            <tr key={idx}>
              <td>
                <Input
                  className="kv-mapper-input"
                  value={row.outputKey}
                  onChange={e => handleRowChange(idx, "outputKey", e.target.value)}
                  placeholder="Enter output key"
                  allowClear
                />
              </td>
              <td>
                <Input
                  className="kv-mapper-input"
                  value={row.inputKey}
                  onChange={e => handleRowChange(idx, "inputKey", e.target.value)}
                  placeholder="Enter input key"
                  allowClear
                />
              </td>
              <td>
                <Button
                  className="kv-mapper-remove-btn"
                  danger
                  size="small"
                  onClick={() => handleRemoveRow(idx)}
                >
                  <DeleteOutlined />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        className="kv-mapper-add-btn"
        type="primary"
        onClick={handleAddRow}
        style={{ marginTop: 12, width: "100%" }}
      >
        Add Mapping
      </Button>
    </div>
  );
};

export default KeyValueMapper;