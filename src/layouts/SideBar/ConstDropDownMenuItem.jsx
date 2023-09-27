import { Dropdown, Menu } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { i18n } from 'utils/i18next.js';
import { MoreOutlined } from '@ant-design/icons';

const DraggableMenuItem = ({ handleAdd }) => {
  const constMenu = (
    <Menu>
      <Menu.Item key="addCategory" onClick={() => handleAdd()}>
        {i18n.t('menu.addCategory')}
      </Menu.Item>
    </Menu>
  );

  const history = useHistory();
  const currentPath = history.location.pathname;
  return (
    <div
      className={'mainMenu hoveredLink'}
      style={{
        padding: '12px 12px 12px 0',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px'
      }}>
      <Link className={` ${currentPath === '/' && 'activeLink'}`} to={`/`}>
        <span>{i18n.t('home')}</span>
      </Link>
      <Dropdown overlay={constMenu} trigger={['click']}>
        <MoreOutlined style={{ fontSize: '1.5em' }} />
      </Dropdown>
    </div>
  );
};
DraggableMenuItem.propTypes = {
  handleAdd: PropTypes.func
};

export default DraggableMenuItem;
