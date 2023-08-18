import {Dropdown, Menu} from "antd";
import React from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";

const DraggableMenuItem = ({
                               handleAdd,
                           }) => {

    const constMenu = (
        <Menu>
            <Menu.Item key="addCategory" onClick={() => handleAdd()}>Добавить новая категория</Menu.Item>
        </Menu>
    );

    const history = useHistory();
    const currentPath = history.location.pathname;
    return (
        <div>
            <Dropdown overlay={constMenu} trigger={['contextMenu']}>
                <div className={'constMenu'} style={{ display: 'flex', justifyContent: 'space-between',color: '@primary-color' }}>
                    <Menu.SubMenu
                        className={`${currentPath === '/' && "activeLink"}  submenu`}
                        title={'Главная'}/>
                </div>
            </Dropdown>
            {/*{children}*/}
        </div>
    );
};
DraggableMenuItem.propTypes = {
    handleAdd: PropTypes.func,
};

export default DraggableMenuItem;