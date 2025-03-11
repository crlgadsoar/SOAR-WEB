import React from "react";
import InputForm from "./InputForm";
import { Card, Space, Tooltip, Button, theme, message } from "antd";
import CrudTable from "./CrudTable";
import { useSelector } from "react-redux";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import { instance } from "util/connection/axios";
import API_ENDPOINT_URL from "apiServices/API_ENDPOINT_URL";
//import CommonService from 'apiServices/common';
/**
 * Component for managing user data and displaying a CRUD table.
 * @returns JSX element
 */
const UserManagement = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalComponent, setModalComponent] = React.useState(null);
  const [rowDetail, setRowDetail] = React.useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = React.useState(null);
  const [buttonSpin, setButtonSpin] = React.useState(false);
  const { displayMode } = useSelector((state) => state.themeConfig);
  const { authUser } = useSelector(({ auth }) => auth);
  //Refs to call functions in the child component
  const childRef = React.useRef(null);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  //MODAL TOGGLE HANDLER FUNCTION
  const openModalHandler = React.useCallback(async (value, row) => {
    console.log(row);
    setModalComponent(value);
    setRowDetail(row);
    setModalVisible(true);
  }, []);

  /**
   * Renders the appropriate modal component based on the value of `modalComponent`.
   */
  const modalComponentRender = () => {
    switch (modalComponent) {
      case "ADD":
        return (
          <InputForm
            title="Add Staff"
            visible={modalVisible}
            buttonSpin={buttonSpin}
            onSubmit={onSubmit}
            onCancel={() => {
              setModalVisible(false);
              setModalComponent(null);
            }}
            type="ADD"
          />
        );

      case "EDIT":
        return (
          <InputForm
            title={"Edit Staff"}
            visible={modalVisible}
            buttonSpin={buttonSpin}
            onSubmit={onSubmit}
            onCancel={() => {
              setModalVisible(false);
              setModalComponent(null);
            }}
            type="EDIT"
            initialValues={{ ...rowDetail }}
          />
        );
      case "VIEW":
        return (
          <InputForm
            title={"View Staff"}
            visible={modalVisible}
            buttonSpin={buttonSpin}
            onSubmit={onSubmit}
            onCancel={() => {
              setModalVisible(false);
              setModalComponent(null);
            }}
            type="VIEW"
            initialValues={{ ...rowDetail }}
          />
        );
      default:
        return null;
    }
  };
  const onSubmit = (values) => {
    console.log("Received values of form: ", values);
    // setButtonSpin(true);
    let parsedValue = {
      ...values,
    };

    for (let item in parsedValue) {
      if (parsedValue[item] === undefined) {
        parsedValue[item] = null; //Set NULL if received values is undefined
      }
    }

    switch (values.action) {
      case "ADD":
        delete values.action;
        parsedValue = {
          ...values,
          createdBy: authUser.username,
          createdOn: "-1",
        };
        console.log("sent parsedValue of form  ", parsedValue);
        instance
          .post(API_ENDPOINT_URL.POST_USER_MANAGEMENT_ADD_USER, parsedValue)
          .then((res) => {
            console.log(res.data);
            if (res.data.response_type === "SUCCESS") {
              messageApi.open({
                type: "success",
                content: "data saved !",
                style: {
                  marginTop: "8vh",
                },
              });
              childRef.current.reloadDataHandle();
              setModalVisible(false);
              setModalComponent(null);
              setButtonSpin(false);
            } else {
              messageApi.open({
                type: "error",
                content: "server error, try again !",
                style: {
                  marginTop: "8vh",
                },
              });
              setButtonSpin(false);
            }
          })
          .catch((error) => {
            setButtonSpin(false);
            return error;
          });

        break;
      case "EDIT":
        delete values.action;
        parsedValue = {
          ...values,
        };
        console.log("Sent values of form: ", parsedValue);
        instance
          .put(
            API_ENDPOINT_URL.POST_USER_MANAGEMENT_SUBMIT_EDIT_USER,
            parsedValue
          )
          .then((res) => {
            console.log(res.data.response_type);
            if (res.data.response_type === "SUCCESS") {
              messageApi.open({
                type: "success",
                content: "data saved !",
                style: {
                  marginTop: "8vh",
                },
              });
              childRef.current.reloadDataHandle();
              setModalVisible(false);
              setModalComponent(null);
              setButtonSpin(false);
            } else {
              messageApi.open({
                type: "error",
                content: "server error, try again !",
                style: {
                  marginTop: "8vh",
                },
              });
              setButtonSpin(false);
            }
          })
          .catch((error) => {
            setButtonSpin(false);
            return error;
          });
        break;
      default:
        break;
    }
  };
  const reset = () => {
    childRef.current.resetRefHandle();
  };
  const deleteData = React.useCallback(
    async (row) => {
      console.log("DELETE API CALLING", row);
      let parsedValue = {
        ...row,
        del_reason: "User_requested",
      };
      console.log("Sent values of form: ", parsedValue);
      instance
        .delete(API_ENDPOINT_URL.POST_USER_MANAGEMENT_DEL_USER, {
          data: parsedValue,
        })
        .then((res) => {
          console.log(res.data);

          if (res.data.response_type === "SUCCESS") {
            messageApi.open({
              type: "success",
              content: "Staff Deleted !",
              style: {
                marginTop: "8vh",
              },
            });
            childRef.current.reloadDataHandle();
            setButtonSpin(false);
          } else {
            messageApi.open({
              type: "error",
              content: "server error, try again !",
              style: {
                marginTop: "8vh",
              },
            });
            setButtonSpin(false);
          }
        })
        .catch((error) => {
          setButtonSpin(false);
          return error;
        });
    },
    [messageApi]
  );

  return (
    <>
      {" "}
      <Card
        title="Staff Table"
        extra={
          <Space>
            <Tooltip title="Reset Table" color="blue">
              <div
                style={{
                  float: "left",
                  marginRight: "5px",
                }}
              >
                <Button
                  type="default"
                  onClick={reset}
                  style={{
                    borderColor: "#1677ff",
                    background: displayMode === "LIGHT" ? "white" : "#1677ff",
                    color: displayMode === "DARK" ? "white" : "#1677ff",
                  }}
                  className="openModal"
                >
                  <ReloadOutlined />
                </Button>
              </div>
            </Tooltip>
            <Tooltip title={"Add"} color={colorPrimary}>
              <div style={{ float: "left" }}>
                <Button
                  type="primary"
                  style={{
                    color: "white",
                    borderColor: colorPrimary,
                  }}
                  onClick={() => openModalHandler("ADD")}
                  className="openModal"
                >
                  <PlusOutlined style={{ fontSize: "15px" }} />
                </Button>
              </div>
            </Tooltip>
          </Space>
        }
      >
        {contextHolder}

        <CrudTable
          openModalHandler={openModalHandler}
          ref={childRef}
          deleteData={deleteData}
        />
      </Card>
      {modalComponentRender()}
    </>
  );
};

export default UserManagement;
