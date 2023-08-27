import { Dropdown, Menu } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const DraggableMenuItem = ({ handleAdd }) => {
  const constMenu = (
    <Menu>
      <Menu.Item key="addCategory" onClick={() => handleAdd()}>
        Добавить новая категория
      </Menu.Item>
    </Menu>
  );

  const history = useHistory();
  const currentPath = history.location.pathname;
  return (
    <div>
      <Dropdown overlay={constMenu} trigger={['contextMenu']}>
        <div
          className={'mainMenu hoveredLink'}
          style={{
            padding: '12px 0',
            fontSize: '14px',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
          <Link className={` ${currentPath === '/' && 'activeLink'}`} to={`/`}>
            <span>Главная</span>
          </Link>
        </div>
      </Dropdown>
      {/*{children}*/}
    </div>
  );
};
DraggableMenuItem.propTypes = {
  handleAdd: PropTypes.func
};

export default DraggableMenuItem;
