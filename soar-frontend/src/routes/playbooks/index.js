import React from "react";
import InputForm from "./InputForm";
import { Card, Space, Tooltip, Button, theme } from "antd";
import CrudTable from "./CrudTable";
import { useSelector } from "react-redux";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import { instance } from "util/connection/axios";
import API_ENDPOINT_URL from "apiServices/API_ENDPOINT_URL";
import CommonService from "apiServices/common";

const Playbooks = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalComponent, setModalComponent] = React.useState(null);
  const [rowDetail, setRowDetail] = React.useState(null);
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
  const openModalHandler = (value, row) => {
    console.log(row);
    setModalComponent(value);
    setModalVisible(true);
    setData(row);
    row &&
      CommonService.getEditUserInfo(row.username)
        .then((res) => {
          setRowDetail(res.data);
        })
        .catch((err) => {
          console.log("err", err);
          return err;
        });
  };

  /**
   * Renders the appropriate modal component based on the value of `modalComponent`.
   */
  const modalComponentRender = () => {
    switch (modalComponent) {
      case "ADD":
        return (
          <InputForm
            title="Add Playbook"
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
            title={"Edit Playbook details"}
            visible={modalVisible}
            buttonSpin={buttonSpin}
            onSubmit={onSubmit}
            onCancel={() => {
              setModalVisible(false);
              setModalComponent(null);
            }}
            staffId={data.staffId}
            type="EDIT"
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
            if (!res) {
              //TODO FAILED NOTIFICATION
              setButtonSpin(false);
            } else {
              // message.success({
              //   content: `Line Added Successfully`,
              //   key: 'UI',
              // });
              //TODO SUCCESS NOTIFICATION
              childRef.current.reloadDataHandle();
              setModalVisible(false);
              setModalComponent(null);
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
          .post(
            API_ENDPOINT_URL.POST_USER_MANAGEMENT_SUBMIT_EDIT_USER,
            parsedValue
          )
          .then((res) => {
            console.log(res.data);
            if (!res) {
              //TODO FAILED NOTIFICATION
              setButtonSpin(false);
            } else {
              // message.success({
              //   content: `Line Added Successfully`,
              //   key: 'UI',
              // });
              //TODO SUCCESS NOTIFICATION
              childRef.current.reloadDataHandle();
              setModalVisible(false);
              setModalComponent(null);
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

    // setButtonSpin(true);
    // console.log(values);

    // setTimeout(() => {
    //   setButtonSpin(false);
    // }, 5000);
  };
  const reset = () => {
    childRef.current.resetRefHandle();
  };
  const deleteData = (row) => {
    console.log("DELETE API CALLING", row);
    let parsedValue = {
      ...row,
    };
    console.log("Sent values of form: ", parsedValue);
    instance
      .post(API_ENDPOINT_URL.POST_USER_MANAGEMENT_DEL_USER, parsedValue)
      .then((res) => {
        console.log(res.data);
        if (!res) {
          //TODO FAILED NOTIFICATION
          setButtonSpin(false);
        } else {
          //TODO SUCCESS NOTIFICATION
          childRef.current.reloadDataHandle();
          setButtonSpin(false);
        }
      })
      .catch((error) => {
        setButtonSpin(false);
        return error;
      });
  };

  return (
    <>
      <Card
        title="List of Playbooks"
        extra={
          <Space>
            <Tooltip title="Reset Table" color="blue">
              <div
                style={{
                  float: "left",
                  marginRight: "5px",
                }}
              >
                {/* <Button
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
                </Button> */}
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

export default Playbooks;
