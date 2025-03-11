import { Row, Col, Input, Space, Table, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { GetColumnSearchProps } from './GetColumnSearchProps';
import React from 'react';
//import styles from './useTable.module.css';
const useAdvanceServerSideTable = ({
  columns,
  dataSource,
  primaryKeyColDataIndex,
  loading,
  _exportPdf,
  _exportCsv,
  scrollX,
  scrollY,
  searchBarOnly,
  pageSizeOptions,
  hidePagination,
  total,
  displayTotal,
  initialSortOrder,
  _csvPdfFileName,
  _executeFetchReq,
  normalizeSearchBarFunc,
  searchBarUpperCase,
}) => {
  const DEFAULT_PAGE_SIZE = pageSizeOptions?.length ? +pageSizeOptions[0] : 10;

  //make one object as react state
  const [paramObj, setParamObj] = React.useState({
    pagination: { current: 1, pageSize: DEFAULT_PAGE_SIZE },
    filterInfo: {}, //individual column search + individual column filter both will be taken care by this state Variable
    sortedInfo: initialSortOrder || {},
    globalSearchTxt: '', //for BIG Search Bar queryParams
  });
  const [searchBarTxt, setSearchBarTxt] = React.useState(''); //controlled components for search bar
  const [resetColumnText, setResetColumnText] = React.useState({});
  const searchInput = React.useRef({});

  React.useEffect(() => {
    console.log('Param Obj has changed', paramObj);
  }, [paramObj]);

  const suffix =
    searchBarTxt.length > 0 ? (
      <CloseOutlined
        onClick={() => {
          setSearchBarTxt('');
          setParamObj((prevState) => ({ ...prevState, globalSearchTxt: '' }));
        }}
      />
    ) : (
      <span />
    );

  const onGlobalSearch = (value) => {
    if (value.trim().length === 0) {
      return;
    }

    let _sortedObj = { ...paramObj.sortedInfo };

    // if (preserveFilterOnGlobalSearch) {
    //   let _filteredObj = { ...paramObj.filterInfo };
    //   setParamObj({
    //     pagination: { current: 1, pageSize: DEFAULT_PAGE_SIZE },
    //     sortedInfo: _sortedObj, //sorting should not be reset during global search
    //     filterInfo: _filteredObj,
    //     globalSearchTxt: value,
    //   });
    //   return;
    // }

    //let _filteredObj = { ...paramObj.filterInfo };
    setParamObj({
      pagination: { current: 1, pageSize: DEFAULT_PAGE_SIZE },
      filterInfo: {},
      sortedInfo: _sortedObj, //sorting should not be reset during global search
      globalSearchTxt: value,
    });
  };

  const onChangeGlobalSearch = (event) => {
    if (normalizeSearchBarFunc) {
      setSearchBarTxt(normalizeSearchBarFunc(event.target.value.toString()));
      return;
    }
    setSearchBarTxt(
      searchBarUpperCase
        ? event.target.value.toString().toUpperCase()
        : event.target.value,
    );
  };

  const handleTableChange = (pagination, filters, sorter, currentTable) => {
    console.log('handleTableChange pagination', pagination);
    console.log('handleTableChange currentTable', currentTable);
    console.log('handleTableChange sorter', sorter);

    //console.log("sorter", sorter);
    //only one column sort can be applied at a time
    let _sorterObj = {}; //...paramObj.sortedInfo
    if (sorter?.column) {
      _sorterObj[sorter.column.dataIndex] = sorter.order;
    }

    if (Object.keys(sorter).length === 0 && initialSortOrder) {
      _sorterObj = initialSortOrder;
    }
    console.log('_sorterObj', _sorterObj);

    console.log('handleTableChange filters', filters);
    let _filterObj = { ...paramObj.filterInfo };

    //if any new filters is set then it will update local _filterObj

    for (const key in filters) {
      if (filters[key]) {
        _filterObj[key] = filters[key];
      }
    }

    //get array of column that has "filters" present or
    //that has filter menu in columns
    const columnFiltersArray = columns
      .filter((item) => !!item.filters)
      .map((item) => item.dataIndex);
    console.log('handleTableChange columnFiltersArray', columnFiltersArray);

    //NOW WE HAVE TO SPECIFY SPECIAL CHECK FOR filter menu in columns
    //IF THE ARE NOT  PRESENT in filters then remove them from _filterObj
    columnFiltersArray.forEach((key) => {
      if (!filters[key]) {
        //if role  is null remove from filterObj
        delete _filterObj[key];
      }
    });

    let _gs = paramObj.globalSearchTxt;

    if (Object.keys(_filterObj).length) {
      _gs = '';
    }

    //clear Big Search Bar
    if (_gs.trim().length === 0) {
      setSearchBarTxt('');
    }

    //console.log("_filterObj", _filterObj);

    setParamObj({
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
      filterInfo: _filterObj,
      sortedInfo: _sorterObj,
      //globalSearchTxt: "",
      globalSearchTxt: _gs,
    });
  };

  const resetCallback = () => {
    console.log('Child Function Reset Called');
    setParamObj({
      pagination: { current: 1, pageSize: DEFAULT_PAGE_SIZE },
      filterInfo: {},
      sortedInfo: initialSortOrder || {},
      globalSearchTxt: '',
    });
    setSearchBarTxt('');

    //console.log(resetColumnText);
    //THis will clear all individual column text box by calling setSelectedKeys function of individual column
    //setSelectedKeys was store in this object in handleSearch function
    Object.keys(resetColumnText).forEach((key) => resetColumnText[key](''));

    //unselect all keys
    //setSelectedRowKeys && setSelectedRowKeys([]);
  };

  const newColumns = () => {
    return columns.map((item) => {
      let _newColumnObj = {
        ...item,
      };
      if (item.filteredValue) {
        //delete item.filteredValue;
        _newColumnObj = {
          ...item,
          filteredValue: paramObj.filterInfo[item.dataIndex] || null,
          sortOrder: paramObj.sortedInfo[item.dataIndex] || null,
          align: 'center',
        };
      } else {
        _newColumnObj = {
          ...item,
          sortOrder: paramObj.sortedInfo[item.dataIndex] || null,
          align: 'center',
        };
      }

      if (
        typeof item.columnSearchIndex == 'undefined' ||
        item.columnSearchIndex == null
      ) {
        return _newColumnObj;
      }

      _newColumnObj = {
        ...item,
        align: 'center',
        sortOrder: paramObj.sortedInfo[item.dataIndex] || null,
        ...GetColumnSearchProps(
          item.dataIndex,
          item.columnSearchIndex,
          item.columnIndexCapitalize,
          setResetColumnText,
          paramObj,
          setParamObj,
          searchInput,
          item.regularizeSentenceFlag,
        ),
      };

      return _newColumnObj;
    });
  };

  const DataTable = (
    <>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Space direction='horizontal'>
            {searchBarOnly && (
              <Tooltip title='Search All'>
                <Input.Search
                  // disabled={!(dataSource && dataSource.length)}
                  placeholder='Search'
                  suffix={suffix}
                  onSearch={onGlobalSearch} //will work only on click
                  onChange={onChangeGlobalSearch} //right now no debouncing and throttling implemented
                  //style={{ width: isMobileOnly ? '55vw' : '65vw' }}
                  style={{ width: '15vw' }}
                  value={searchBarTxt}
                  //size={!isMobile ? 'medium' : 'small'}
                  size={'small'}
                />
              </Tooltip>
            )}
          </Space>
        </Col>
      </Row>

      <Table
        rowKey={primaryKeyColDataIndex}
        // rowClassName={(record, index) =>
        //   index % 2 === 0 ? styles.tableRowLight : styles.tableRowDark
        // }
        columns={newColumns().filter((col) => col.visibility !== false)}
        dataSource={dataSource}
        loading={loading}
        pagination={
          !hidePagination && {
            defaultPageSize: DEFAULT_PAGE_SIZE,
            size: 'small',
            defaultCurrent: paramObj.pagination.current,
            current: paramObj.pagination.current,
            responsive: true,
            pageSizeOptions: pageSizeOptions || [
              '10',
              '20',
              '50',
              '100',
              '200',
              '500',
            ],
            showSizeChanger: true,
            total: total,
            showTotal: (total) => (displayTotal ? `Total ${total}` : ''),
          }
        }
        onChange={handleTableChange}
        size={scrollX ? 'middle' : 'small'}
        bordered={scrollX || scrollY}
        scroll={
          scrollX
            ? scrollY
              ? { x: 'max-content', y: scrollY }
              : { x: 'max-content' }
            : scrollY
              ? { y: scrollY }
              : false
        }
      />

      {/* <div>{JSON.stringify(paramObj)}</div> */}
    </>
  );

  return { DataTable, resetCallback, paramObj, setParamObj };
};

export default useAdvanceServerSideTable;
