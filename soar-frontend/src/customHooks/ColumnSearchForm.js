import { Checkbox, Modal, Select } from 'antd';

import React from 'react';

const ColumnSearchForm = (
  {
    visible,
    handleDownloadCSV,
    setShowModal,
    selectedFields,
    fieldsOrColumns,
    handleCheckboxChange,
    handleDownloadPDF,
    exportPdf,
    exportCsv,
    rowCountFlag,
    rowCount,
    setRowCount,
  },
  _ref,
) => {
  return (
    <Modal
      open={visible}
      onOk={() =>
        exportCsv
          ? handleDownloadCSV(rowCount) //if rowCountFlag  is false rowCount Flag will be ignored
          : exportPdf
            ? handleDownloadPDF(rowCount)
            : () => {}
      }
      onCancel={() => setShowModal(false)}
      width={400}
      okButtonProps={{
        disabled: selectedFields.length < 1,
        title:
          selectedFields.length < 1
            ? 'Please select at least one column.'
            : null,
      }}
      okText={'Export'}
      title={'Select Columns to export'}
    >
      <div className='d-flex flex-column align-start'>
        {Object.entries(fieldsOrColumns).map(([key, value]) => {
          return (
            <Checkbox
              key={key}
              style={{ padding: 0, margin: 0 }}
              defaultChecked={true}
              checked={selectedFields.indexOf(key) > -1}
              onChange={(e) => handleCheckboxChange(key, e.target.checked)}
            >
              {/* {typeof value === "string" ? value : value?.header ?? ""} */}
              {value}
            </Checkbox>
          );
        })}
        <br />
        <br />
        {rowCountFlag && (
          <>
            Row Count:{' '}
            <Select onChange={(v) => setRowCount(v)} defaultValue={'10'}>
              <Select.Option value='10' key='10'>
                10
              </Select.Option>
              <Select.Option value='50' key='50'>
                50
              </Select.Option>
              <Select.Option value='100' key='100'>
                100
              </Select.Option>
              <Select.Option value='500' key='500'>
                500
              </Select.Option>
              <Select.Option value='1000' key='1000'>
                1000
              </Select.Option>
              <Select.Option value='10000' key='10000'>
                ALL
              </Select.Option>
            </Select>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ColumnSearchForm;
