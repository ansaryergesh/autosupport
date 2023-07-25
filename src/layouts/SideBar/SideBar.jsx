// import React from 'react';
// import { Layout, Menu } from 'antd';
//
// const { Sider } = Layout;
// const SidebarNav = () => {
//     return (
//         <Sider width={200} className="site-layout-background">
//             <Menu
//                 mode="inline"
//                 defaultSelectedKeys={['1']}
//                 defaultOpenKeys={['sub1']}
//                 style={{ height: '100%', borderRight: 0 }}
//             >
//                 <Menu.Item key="1">Option 1</Menu.Item>
//                 <Menu.Item key="2">Option 2</Menu.Item>
//                 <Menu.Item key="3">Option 3</Menu.Item>
//             </Menu>
//         </Sider>
//     );
// };
//
// export default SidebarNav;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {Button, Col, Input, Layout, Menu, Row} from 'antd';
import {AppstoreAddOutlined, DownOutlined, MailOutlined, SearchOutlined} from "@ant-design/icons";

const { Sider } = Layout;
const MenuItemTypes = {
    MENU_ITEM: "menu_item",
};

const DraggableMenuItem = ({ id, index, moveMenuItem, children }) => {
    const [, drag] = useDrag({
        type: MenuItemTypes.MENU_ITEM,
        item: { id, index },
    });

    const [, drop] = useDrop({
        accept: MenuItemTypes.MENU_ITEM,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveMenuItem(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <div ref={(node) => drag(drop(node))} style={{ cursor: "move" }}>
            {children}
        </div>
    );
};

const SearchInput = () => {
    return (
        <div style={{ position: 'relative' }}>
            <Input
                placeholder="Что вы ищите"
                style={{
                    border: 'none',
                    borderBottom: '2px solid transparent',
                    borderRadius: 0,
                    width:'100%',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(270deg, #99a6f9 0%, #1ccc9e 33.33%, #1ae276 65.10%, #80ff61 100%)',
                }}
            />
        </div>
    );
};

const SideBarButtons = () => {
    return (
        <Row gutter={[16, 16]} align="middle">
            <Col span={12}>
                <Button type="primary" block>Все темы</Button>
            </Col>
            <Col span={12}>
                <Button block>Популярный темы</Button>
            </Col>
        </Row>
    )
}

const SidebarNav = () => {
    const [menuItems, setMenuItems] = useState([
        { id: "home", label: "Home" , questions: [{name: "q1"}, {name: 'q2'}] },
        { id: "about", label: "About", questions: [{name: "q1"}, {name: 'q2'}] },
        { id: "home1", label: "Home" , questions: [{name: "q1"}, {name: 'q2'}] },
        { id: "about1", label: "About", questions: [{name: "q1"}, {name: 'q2'}] },
        { id: "home2", label: "Home" , questions: [{name: "q1"}, {name: 'q2'}] },
        { id: "about2", label: "About", questions: [{name: "q1"}, {name: 'q2'}] },
        { id: "home3", label: "Home" , questions: [{name: "q1"}, {name: 'q2'}] },
        { id: "about3", label: "About", questions: [{name: "q1"}, {name: 'q2'}] },
        { id: "home", label: "Home" , questions: [{name: "q1"}, {name: 'q2'}] },
        { id: "about", label: "About", questions: [{name: "q1"}, {name: 'q2'}] },
        { id: "home1", label: "Home" , questions: [{name: "q1"}, {name: 'q2'}] },
        { id: "about1", label: "About", questions: [{name: "q1"}, {name: 'q2'}] },
        { id: "home2", label: "Home" , questions: [{name: "q1"}, {name: 'q2'}] },
        { id: "about2", label: "About", questions: [{name: "q1"}, {name: 'q2'}] },
        { id: "home3", label: "Home" , questions: [{name: "q1"}, {name: 'q2'}] },
        { id: "about3", label: "About", questions: [{name: "q1"}, {name: 'q2'}] },
        { id: "home", label: "Home" , questions: [{name: "q1"}, {name: 'q2'}] },
        { id: "about", label: "About", questions: [{name: "q1"}, {name: 'q2'}] },
        /* Add more menu items as needed */
    ]);

    return (
            <Sider width={300} className="site-layout-background">
                <SearchInput />
                <SideBarButtons />
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['home']}
                    defaultOpenKeys={['subMenu1']}
                    className="custom-menu"
                    style={{ maxHeight: '100vh', borderRight: 0, width: '100%!important' }}
                >
                    {menuItems.map((m,index)=> (
                        <Menu.SubMenu className="submenu" key={index} title={m.label}>
                            {m.questions.map((q,index) => (
                                <Menu.Item key={index}>{q.name}</Menu.Item>
                            ))}
                        </Menu.SubMenu>
                    ))}
                </Menu>
            </Sider>
    );
};

export default SidebarNav;
