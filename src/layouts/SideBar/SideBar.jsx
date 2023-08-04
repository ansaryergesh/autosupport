import React, { useState } from "react";
import {Col, Image, Input, Layout, Menu, Row, Typography} from 'antd';
import Button from "components/Button/Button.jsx";
import {i18n} from 'utils/i18next.js';
import {adminNavItems} from "./constants.js";
import {Link} from "react-router-dom";
// import DotsSvg from 'images/dots.svg'
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
                <Button type={"primary"} block>{i18n.t("allTheme")}</Button>
            </Col>
            <Col span={12}>
                <Button type={"default"} block>{i18n.t('popularTheme')}</Button>
            </Col>
        </Row>
    )
}

// const SideBarEdit = () => {
//     return (
//         <Dropdown
//             overlay={
//                 <Menu>
//                         <Menu.Item
//                             key="0"
//                             className="administration"
//                         >
//                         <span className="administration__text-warning">
//                           {i18n.t('administration.action.edit')}
//                         </span>
//                         </Menu.Item>
//                         <Menu.Item
//                             key="1"
//                             className="administration administration__text-error"
//                             onClick={(e) => {
//                                 e.domEvent.stopPropagation();
//                             }}
//                         >
//                             <Popconfirm
//                                 cancelButtonProps={{
//                                     size: 'middle',
//                                     className: 'administration__button-white-small',
//                                 }}
//                                 cancelText={i18n.t('administration.action.cancel')}
//                                 okButtonProps={{
//                                     size: 'middle',
//                                     className: 'administration__button-gold-small',
//                                 }}
//                                 okText={i18n.t('administration.action.yes')}
//                                 overlayClassName="administration"
//                                 title={i18n.t('administration.alertManagers.notification.delete')}
//                             >
//                           <span className="administration__text-error">
//                             {i18n.t('administration.action.delete')}
//                           </span>
//                             </Popconfirm>
//                         </Menu.Item>
//                 </Menu>
//             }
//             trigger={['click']}
//             onClick={(e) => {
//                 e.stopPropagation();
//             }}
//         >
//             <div className="administration__action">
//                 <Image src={DotsSvg} preview={false} />
//             </div>
//         </Dropdown>
//         )
//
// }


const SidebarNav = ({isAdmin = true}) => {
    const [menuItems] = useState([
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
    const [openKeys, setOpenKeys] = useState([]); // State to manage open submenus

    const handleMenuOpenChange = (keys) => {

        setOpenKeys(keys);
    };

    return (
            <Sider width={300} className="site-layout-background">
                <SearchInput />
                <Layout className={"navAdmin"}>
                    {isAdmin && adminNavItems.map((item,index) =>
                        <Link to={item.path} className={"navAdminItem"} key={index}>
                            <Image src={item.icon} preview={false} />
                            <Typography>{i18n.t(item.name)}</Typography>
                        </Link>
                    )}

                </Layout>


                <div style={{marginTop: '10px', marginBottom: '20px', background:"transparent"}}>
                    <SideBarButtons />
                </div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[]}
                    defaultOpenKeys={['subMenu1']}
                    className="custom-menu administration"
                    openKeys={openKeys} // Pass the state to manage open submenus
                    onOpenChange={(keys) => handleMenuOpenChange(keys)} // Use a callback function to handle the open and close events
                    style={{ maxHeight: '100vh', borderRight: 0, width: '100%!important' }}
                >
                    {menuItems.map((m, index) => (
                        // <div style={{ position: 'relative' }} key={`submenu_${index}`}>
                            <Menu.SubMenu className="submenu" key={`submenu_${index}_1`} title={m.label}>
                                {m.questions.map((q, qIndex) => (
                                    <Menu.Item key={`question_${index}_${qIndex}`}>{q.name}</Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        //     <div style={{ position: 'absolute', right: 0, zIndex: 1, top:10 }} >
                        //         <SideBarEdit />
                        //     </div>
                        // </div>
                    ))}
                </Menu>
            </Sider>
    );
};

export default SidebarNav;
