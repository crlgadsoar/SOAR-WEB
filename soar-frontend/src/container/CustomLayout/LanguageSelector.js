import React from 'react';
import { Select } from 'antd';
import { setLanguage } from 'appRedux/reducers/ThemeConfig';
import { useDispatch, useSelector } from 'react-redux';
const { Option } = Select;

/**
 * A component that allows the user to select a language from a dropdown menu.
 * @returns The LanguageSelector component.
 */
const LanguageSelector = ({ displayMode }) => {
  const dispatch = useDispatch();

  const { language } = useSelector((state) => state.themeConfig);

  const handleLanguageChange = (value) => {
    dispatch(setLanguage(value));
  };

  return (
    <>
      <img
        alt='company_logo'
        //to change color in dark mode
        src={
          displayMode === 'DARK'
            ? require('../../assets/images/LanguageSelect2.png')
            : require('../../assets/images/LanguageSelect.png')
        }
        height={displayMode === 'DARK' ? 21 : 20}
        width={displayMode === 'DARK' ? 23 : 20}
        draggable='false'
      />
      <Select
        defaultValue='en_US'
        value={language}
        style={{ color: 'black', fontWeight: 'bold', minWidth: '80px' }}
        onChange={handleLanguageChange}
        bordered={false}
      >
        <Option value='en_US'>English</Option>
        <Option value='hi_IN'>हिन्दी</Option>
        <Option value='ta_IN'>தமிழ்</Option>
        <Option value='kn_IN'>ಕನ್ನಡ</Option>
        <Option value='ml_IN'>മലയാളം</Option>
      </Select>
    </>
  );
};

export default LanguageSelector;
