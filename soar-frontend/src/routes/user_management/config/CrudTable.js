import React from "react";
import { Space } from "antd";
import useTable from "customHooks/useTable";
import { USER_ROLES } from "constants/IRS";
import { getDreamFactoryUrlQueryParams } from "util/common";
import RowAction from "components/RowAction";
import UserManagementService from "apiServices/user_management";

/**
 * A CRUD table component that displays data in a table format and provides
 * functionality for adding, editing, and deleting data.
 * @returns A table component with CRUD functionality.
 */
const CrudTable = React.forwardRef(({ openModalHandler, deleteData }, ref) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const isComponentMounted = React.useRef(true);

  const columns = React.useMemo(
    () => [
      {
        title: "Username",
        dataIndex: "user_name",
        exportCsvPdf: true,
        searchBarKey: true,
        sorter: true,
      },
      {
        title: "Staff Id",
        dataIndex: "staff_id",
        sorter: true,
        exportCsvPdf: true,
        searchBarKey: true,
      },
      {
        title: "Name",
        dataIndex: "full_name",
        exportCsvPdf: true,
        searchBarKey: true,
      },
      {
        title: "Designation",
        dataIndex: "designation",
        exportCsvPdf: true,
      },
      {
        title: "Mobile No",
        dataIndex: "mobile_no",
        exportCsvPdf: true,
      },
      {
        title: "Account Type",
        dataIndex: "user_role",
        render: (user_role) => USER_ROLES[+user_role],
        filters: Object.keys(USER_ROLES).map((item) => {
          return { value: item, text: USER_ROLES[item] };
        }),
        exportCsvPdf: true,
      },

      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        exportCsvPdf: false,
        render: (_, row) => (
          <Space>
            <RowAction
              editModalHandler={openModalHandler}
              viewModalHandler={openModalHandler}
              row={row}
              msg=""
              deleteData={deleteData}
            />
          </Space>
        ),
        width: 70,
      },
    ],
    [openModalHandler, deleteData]
  );

  const getDataWithRow = async (rowCount) => {
    let _pObj = { ...paramObj };
    _pObj.pagination.current = 1;
    _pObj.pagination.pageSize = rowCount;
    let _queryParam2 = "/?limit=" + rowCount; //getDreamFactoryUrlQueryParams(paramObj, columns);
    console.log("_queryParam2", _queryParam2);
    return UserManagementService.getUsernameList(_queryParam2)
      .then((res) => {
        console.log("response form error counter", res.resource);
        setData(res.resource);
        setTotal(res?.meta?.count);
        return res.resource;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  };

  const { DataTable, resetCallback, paramObj } = useTable({
    columns: columns,
    dataSource: data,
    primaryKeyColDataIndex: columns[0].dataIndex,
    loading: loading,
    isSearchVisible: true,
    exportCsv: true,
    exportPdf: true,
    searchBarOnly: true,
    csvPdfFileName: "Staff List",
    scrollX: true,
    scrollY: "470px",
    total: total,
    displayTotal: true,
    //initialSortOrder: { staff_id: 'ascend' },
    executeFetchReq: getDataWithRow,
  });
  /**
   * Retrieves data asynchronously and updates the state variables for loading, data, and total.
   * @returns None
   */
  const getData = React.useCallback(async () => {
    setLoading(true);
    let _queryParam = getDreamFactoryUrlQueryParams(paramObj, columns);
    console.log("_queryParam", _queryParam);
    UserManagementService.getUsernameList(_queryParam)
      .then((res) => {
        console.log("Response user list", res);

        setData(res.resource);
        setTotal(res?.meta?.count);
      })
      .catch((e) => console.log("Error", e));
    setLoading(false);
  }, [paramObj, columns]);
  React.useImperativeHandle(ref, () => ({
    resetRefHandle: resetCallback,
    reloadDataHandle: getData,
  }));
  React.useEffect(() => {
    isComponentMounted.current && getData();
  }, [paramObj, getData]);

  return DataTable;
});
export default CrudTable;
