import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

const DropDownMenu = ({ handleClose, contextMenuPosition }) => {
  return (
    <div>
      <Menu
        theme="dark"
        mode="vertical"
        style={{
          position: 'absolute',
          left: contextMenuPosition.left,
          top: contextMenuPosition.top,
        }}
      >
        <Menu.Item key="option1" onClick={handleClose}>
          Option 1
        </Menu.Item>
        <Menu.Item key="option2" onClick={handleClose}>
          Option 2
        </Menu.Item>
        <Menu.Item key="option3" onClick={handleClose}>
          Option 3
        </Menu.Item>
      </Menu>
    </div>
  );
};
DropDownMenu.propTypes = {
  handleClose: PropTypes.func,
  contextMenuPosition: PropTypes.object,
};

export default DropDownMenu;
