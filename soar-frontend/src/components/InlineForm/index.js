import React from 'react';
import { Button, Card, Col, Form, Row } from 'antd';
import { FORM_ITEM_LAYOUT } from 'util/common';
import { CloseCircleOutlined } from '@ant-design/icons';
import Scrollbars from 'react-custom-scrollbars-2';

const InlineForm = ({
  title,
  type,
  formArray,
  form,
  onSubmit,
  onSubmitAction,
  initialValues,
  fetchedObject,
  isCardVisible,
  setIsCardVisible,
  setCheckedState,
  xl,
  xxl,
  bigger,
}) => {
  const handleCardClose = () => {
    if (type === 'EDIT') {
      // If the type is 'EDIT', set isCardVisible to true
      setIsCardVisible(false);
      // Additional logic to perform when the card is closed for 'EDIT' type
    } else {
      // For other types, set isCardVisible to false
      setIsCardVisible(true);
      // Additional logic to perform when the card is closed for other types
    }
    bigger();
    setCheckedState((prevState) => !prevState);
  };
  // Additional logic to perform when the card is closed

  return (
    isCardVisible && (
      <Card
        title={title}
        extra={
          type === 'EDIT' && (
            <Button size='middle' onClick={handleCardClose}>
              <CloseCircleOutlined />
            </Button>
          )
        }
        onClose={handleCardClose}
      >
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={0}
          autoHeightMax={type === 'EDIT' ? 100 : 300}
          thumbMinSize={30}
          universal={true}
        >
          <Form
            form={form}
            {...FORM_ITEM_LAYOUT}
            name='inlineForm'
            title={title}
            setIsCardVisible={setIsCardVisible}
            style={{ overflowX: 'hidden' }}
            initialValues={initialValues || {}}
          >
            <Row gutter={[44, 4]}>
              {formArray?.length &&
                formArray.map((i, index) => {
                  return (
                    <Col
                      xxl={xxl || 6}
                      xl={xl || 8}
                      lg={12}
                      md={12}
                      sm={24}
                      xs={24}
                      key={index}
                      style={{ alignItems: 'right', justifyContent: 'right' }}
                    >
                      {i}
                    </Col>
                  );
                })}
            </Row>
            <Row>
              <Col
                span={24}
                style={{
                  textAlign: 'right',
                }}
              >
                {type !== 'EDIT' && (
                  <Button
                    key='submit'
                    type='primary'
                    onClick={() => {
                      form
                        .validateFields()
                        .then((values) => {
                          let _tempObject = {
                            ...values,
                            action: onSubmitAction || 'GET',
                          };
                          onSubmit(_tempObject, fetchedObject);
                        })
                        .catch((info) => {
                          console.log('Validate Failed:', info);
                        });
                    }}
                  >
                    Submit
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </Scrollbars>
      </Card>
    )
  );
};

export default InlineForm;
