import React from 'react';
import { Row, Col } from 'antd';
import ProfileHeader from './ProfileHeader/index';
import About from './About/index';
import Contact from './Contact/index';
import Organizational from './Organizational/index';

import { useSelector } from 'react-redux';
const ProfileView = () => {
  // let { staffId } = useParams();
  const { authUser } = useSelector((state) => state.auth);
  // console.log('staffId ', staffId);
  // if (staffId === '0') {
  //   staffId = authUser.staffId;
  // }

  return (
    <>
      <ProfileHeader
        name={authUser?.staffName}
        id={'219462'}
        emailId={authUser?.emailId?.toLowerCase()}
        gender={authUser?.gender}
        role={'Executive'}
        nationality={'INDIAN'}
        city={'delhi'}
        designation={'MRS'}
        userName={'Viv_10240'}
      />
      <div className='gx-profile-content'>
        <Row>
          <Col md={14}>
            <About
              dob={'staffData'?.dob}
              doj={'staffData'?.dateOfJoining}
              yrOfExperience={2}
              govtIdNo={'219462'}
              govtIdType={'Aadhar'}
              orgRole={'Executive'}
              contactNo={'88382948745'}
            />
            <Organizational
              organizationType='Goverment Org.'
              acceptingOfficerStaffId='E219462'
              acceptingOfficerStaffName='harsh'
              hodStaffId='E5768'
              hodStaffName='sarwan ram'
              orgRole='MRS'
              costCenter='delhi'
              costPerHour='20$'
            />
          </Col>
          {/* <Col md={1} /> */}
          <Col md={10}>
            <Contact
              whatsApp={'staffData'?.whatsappNo}
              emailId={authUser?.emailId?.toLowerCase()}
              faxNo={'staffData'?.faxNo}
              extensionNo={'staffData'?.extensionNo}
              landlineNo={'staffData'?.landlineNo}
              mobileNo={'65739846'}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfileView;
