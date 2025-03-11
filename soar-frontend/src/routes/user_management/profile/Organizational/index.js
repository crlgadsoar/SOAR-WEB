import React from 'react';
import { Col, Row } from 'antd';
import Widget from 'components/Widget';
import OrganizationalItem from './OrganizationalItem';
import {
  DollarOutlined,
  ShopOutlined,
  BookOutlined,
  HomeOutlined,
} from '@ant-design/icons';
const Organizational = ({
  organizationType,
  acceptingOfficerStaffId,
  acceptingOfficerStaffName,
  hodStaffId,
  hodStaffName,
  costCenter,
  costPerHour,
}) => {
  const organizationalData = [
    {
      id: 1,
      title: 'Organization Type',
      iconComponent: <ShopOutlined />,
      userList: '',
      desc: organizationType,
    },
    {
      id: 2,
      title: 'Accepting Officer',
      iconComponent: <BookOutlined />,
      userList: '',
      desc: acceptingOfficerStaffName + ' (' + acceptingOfficerStaffId + ')',
    },
    {
      id: 3,
      title: 'HOD Officer',
      iconComponent: <HomeOutlined />,
      userList: '',
      desc: hodStaffName + ' (' + hodStaffId + ')',
    },
    {
      id: 4,
      title: 'Cost Center',
      iconComponent: <ShopOutlined />,
      userList: '',
      desc: costCenter,
    },
    {
      id: 5,
      title: 'Cost Per Hour',
      iconComponent: <DollarOutlined />,
      userList: '',
      desc: costPerHour,
    },
  ];
  return (
    <Widget
      title='Organization Info'
      style={{
        boxShadow:
          '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        marginTop: '25px',
        marginLeft: '25px',
        marginRight: '15px',
      }}
    >
      <Row>
        {organizationalData.map((about, index) => (
          <Col key={`T_${index}`} xl={8} lg={12} md={12} sm={12} xs={24}>
            <OrganizationalItem data={about} />
          </Col>
        ))}
      </Row>
    </Widget>
  );
};

export default Organizational;
