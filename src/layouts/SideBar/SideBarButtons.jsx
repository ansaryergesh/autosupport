import React from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';
import { SIDEBAR_BUTTON } from '../../constants/index.js';
import { LocalStorageKeys } from '../../storage/localStorageKey.js';
import { i18n } from 'utils/i18next.js';

const SideBarButtons = ({ activeButton, setActiveButton }) => {
  const handleRadioChange = (e) => {
    const value = e.target.value;
    localStorage.setItem(LocalStorageKeys.ACTIVE_SIDEBAR_BUTTON, value);
    setActiveButton(value);
  };

  const activeStyle = {
    background: 'linear-gradient(90deg, #00F260 0%, #04D4C8 100%)',
    borderRadius: '10px',
    padding: '12px 24px',
    flexDirection: 'row',
    width: '50%',
    color: '#000',
    justifyContent: 'center',
    textAlign: 'center',
    display: 'flex', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
    border: 'none',
    transition: '.2s', // Remove border
  };

  const inactiveStyle = {
    background: 'none',
    borderRadius: '0px 10px 10px 0px',
    padding: '12px 24px',
    justifyContent: 'center',
    textAlign: 'center',
    width: '50%',
    flexDirection: 'row',
    color: '#000',
    display: 'flex', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
    border: 'none',
  };

  const switchContainer = {
    borderRadius: '10px',
    background: 'white',
    width: '100%',
    display: 'flex', // Center the buttons horizontally
    justifyContent: 'center',
    border: 'none!important', // Center the buttons horizontally
  };

  return (
    <div>
      <Radio.Group
        className="switch-container"
        style={switchContainer}
        value={activeButton}
        onChange={handleRadioChange}
      >
        <Radio.Button
          value={SIDEBAR_BUTTON.ALL}
          style={activeButton === SIDEBAR_BUTTON.ALL ? activeStyle : inactiveStyle}
        >
          {i18n.t('allTheme')}
        </Radio.Button>
        <Radio.Button
          value={SIDEBAR_BUTTON.POPULAR}
          style={activeButton === SIDEBAR_BUTTON.POPULAR ? activeStyle : inactiveStyle}
        >
          {i18n.t('popularTheme')}
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};

SideBarButtons.prototype = {
  activeButton: PropTypes.string,
  setActiveButton: PropTypes.func,
};
export default SideBarButtons;
