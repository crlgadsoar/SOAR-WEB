import React from 'react';
import { Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { readableWord, regularizeSentence } from 'util/common';

export const GetColumnSearchProps = (
  dataIndex,
  columnIndex,
  columnIndexCapitalize,
  setResetColumnText,
  paramObj,
  setParamObj,
  searchInput,
  regularizeSentenceFlag,
) => {
  //console.log("GetColumnSearchProps paramObj",paramObj);
  const handleSearch = (selectedKeys, confirm, setSelectedKeys) => {
    console.log('handleSearch 1', selectedKeys, confirm, setSelectedKeys);
    confirm();
    //This will keep the function that will clear individual input column input box
    //This will help to clear individual input column input box  on Click of "Reset" button
    //present in parent component
    setResetColumnText((prevState) => {
      return {
        ...prevState,
        [dataIndex]: setSelectedKeys,
      };
    });
    console.log('handleSearch 2', selectedKeys, confirm, setSelectedKeys);
  };

  const handleReset = (clearFilters, setSelectedKeys, selectedKeys) => {
    console.log('handleReset 1', clearFilters, setSelectedKeys, selectedKeys);
    clearFilters();
    setParamObj((prevState) => {
      delete prevState.filterInfo[dataIndex]; //delete property of filter if individual reset is done
      return {
        ...prevState,
        filterInfo: { ...prevState.filterInfo },
        //globalSearchTxt: "",
      };
    });
    // setSearchBarTxt("");

    setTimeout(() => {
      console.log('handleReset 2', clearFilters, setSelectedKeys, selectedKeys);
    }, 500);
  };

  const getColumnSearchProps = () => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 0 }}>
        <Input
          ref={(el) => (searchInput.current[columnIndex] = el)} //search input refs are stored
          placeholder={`Search ${readableWord(dataIndex)}`}
          value={selectedKeys[0]}
          //value={paramObj.filterInfo[dataIndex][0] || ""}
          name={dataIndex}
          onChange={(e) =>
            columnIndexCapitalize
              ? setSelectedKeys(
                  e.target.value ? [e.target.value.toUpperCase()] : [],
                )
              : regularizeSentenceFlag
                ? setSelectedKeys(
                    e.target.value ? [regularizeSentence(e.target.value)] : [],
                  )
                : setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys, confirm, setSelectedKeys)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, setSelectedKeys)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              setSelectedKeys([]);
              // document.getElementById() get the element by id from above input and make it empty-ANOTHER METHOD
              handleReset(clearFilters, setSelectedKeys, selectedKeys);
            }}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (_) => (
      <SearchOutlined
        style={{
          color: paramObj.filterInfo[dataIndex] ? '#1890ff' : null,
        }}
      />
    ),
    onFilterDropdownVisibleChange: (visible) => {
      //console.log('FIRED EVENT ON CLICK', visible);

      if (visible) {
        setTimeout(() => searchInput.current[columnIndex].select(), 100);
      }
    },
  });

  return getColumnSearchProps(dataIndex);
};
