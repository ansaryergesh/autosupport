import React, { useState } from "react";
import {Col, Input, Layout, Menu, Row, Space} from 'antd';
import Button from "components/Button/Button.jsx";

const { Sider } = Layout;



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
    const rowStyle = { background: 'transparent' }; // Set the background of the Row to transparent
    return (
        <Row gutter={[16, 16]} style={rowStyle}>
            <Col span={12}>
                <Button type={"primary"} block>Все темы</Button>
            </Col>
            <Col span={12}>
                <Button type={"default"} block>Популярный темы</Button>
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
        /* Add more menu items as needed */
    ]);

    return (
            <Sider width={300} className="site-layout-background">
                <SearchInput />
                <div style={{margin: '30px 0', background:"transparent"}}>
                    <SideBarButtons />
                </div>
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
