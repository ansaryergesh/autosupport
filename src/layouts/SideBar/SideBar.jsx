import React, { useState } from "react";
import {Col, Image, Input, Layout, Menu, Row, Typography} from 'antd';
import Button from "components/Button/Button.jsx";
import {i18n} from 'utils/i18next.js';
import {adminNavItems} from "./constants.js";
import {Link} from "react-router-dom";
const { Sider } = Layout;
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const SearchInput = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        console.log("searchValue:", searchValue);
    };

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
            window.location.href = '/detailedQuestion';
        }
    };
    return (
        <div style={{ position: 'relative' }}>
            <Input
                placeholder="Что вы ищите"
                style={{
                    border: 'none',
                    borderBottom: '1px solid transparent',
                    borderRadius: 0,
                    width:'100%',
                }}
                value={searchValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
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
            console.log(draggedItem)
            console.log(id)
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

const SidebarNav = ({isAdmin = true}) => {
    const [menuItems, setMenuItems] = useState([
        { id: "home", label: "Сколько занимает открытие счета1" , questions: [{name: "Продвинутые функции"}, {name: 'Веб версия и мобильная'}, {name: 'Основные фуниции'}, {name: 'Проблемы с платформой'}, {name: 'Веб версия и мобильная'}], order:1, },
        { id: "about", label: "Сколько занимает открытие счета2", questions: [{name: "Продвинутые функции"}, {name: 'Веб версия и мобильная'}, {name: 'Основные фуниции'}, {name: 'Проблемы с платформой'}, {name: 'Веб версия и мобильная'}], order:2, },
        { id: "home1", label: "Сколько занимает открытие счета3" , questions: [{name: "Продвинутые функции"}, {name: 'Веб версия и мобильная'}, {name: 'Основные фуниции'}, {name: 'Проблемы с платформой'}, {name: 'Веб версия и мобильная'}] },
        { id: "about1", label: "Сколько занимает открытие счета4", questions: [{name: "Продвинутые функции"}, {name: 'Веб версия и мобильная'}, {name: 'Основные фуниции'}, {name: 'Проблемы с платформой'}, {name: 'Веб версия и мобильная'}] },
        { id: "home2", label: "Сколько занимает открытие счета5" , questions: [{name: "Продвинутые функции"}, {name: 'Веб версия и мобильная'}, {name: 'Основные фуниции'}, {name: 'Проблемы с платформой'}, {name: 'Веб версия и мобильная'}] },
        { id: "about2", label: "Сколько занимает открытие счета", questions: [{name: "Продвинутые функции"}, {name: 'Веб версия и мобильная'}, {name: 'Основные фуниции'}, {name: 'Проблемы с платформой'}, {name: 'Веб версия и мобильная'}] },
        { id: "home3", label: "Сколько занимает открытие счета" , questions: [{name: "Продвинутые функции"}, {name: 'Веб версия и мобильная'}, {name: 'Основные фуниции'}, {name: 'Проблемы с платформой'}, {name: 'Веб версия и мобильная'}] },
        { id: "about3", label: "Сколько занимает открытие счета", questions: [{name: "Продвинутые функции"}, {name: 'Веб версия и мобильная'}, {name: 'Основные фуниции'}, {name: 'Проблемы с платформой'}, {name: 'Веб версия и мобильная'}] },
        { id: "home", label: "Сколько занимает открытие счета" , questions: [{name: "Продвинутые функции"}, {name: 'Веб версия и мобильная'}, {name: 'Основные фуниции'}, {name: 'Проблемы с платформой'}, {name: 'Веб версия и мобильная'}] },
        { id: "about", label: "Сколько занимает открытие счета", questions: [{name: "Продвинутые функции"}, {name: 'Веб версия и мобильная'}, {name: 'Основные фуниции'}, {name: 'Проблемы с платформой'}, {name: 'Веб версия и мобильная'}] },
        { id: "home1", label: "Сколько занимает открытие счета" , questions: [{name: "Продвинутые функции"}, {name: 'Веб версия и мобильная'}, {name: 'Основные фуниции'}, {name: 'Проблемы с платформой'}, {name: 'Веб версия и мобильная'}] },
        { id: "about1", label: "Сколько занимает открытие счета", questions: [{name: "Продвинутые функции"}, {name: 'Веб версия и мобильная'}, {name: 'Основные фуниции'}, {name: 'Проблемы с платформой'}, {name: 'Веб версия и мобильная'}] },
        { id: "home2", label: "Сколько занимает открытие счета" , questions: [{name: "Продвинутые функции"}, {name: 'Веб версия и мобильная'}, {name: 'Основные фуниции'}, {name: 'Проблемы с платформой'}, {name: 'Веб версия и мобильная'}] },
        { id: "about2", label: "Сколько занимает открытие счета", questions: [{name: "Продвинутые функции"}, {name: 'Веб версия и мобильная'}, {name: 'Основные фуниции'}, {name: 'Проблемы с платформой'}, {name: 'Веб версия и мобильная'}] },
        { id: "home3", label: "Сколько занимает открытие счета" , questions: [{name: "Продвинутые функции"}, {name: 'Веб версия и мобильная'}, {name: 'Основные фуниции'}, {name: 'Проблемы с платформой'}, {name: 'Веб версия и мобильная'}] },
        { id: "about3", label: "Сколько занимает открытие счета", questions: [{name: "Продвинутые функции"}, {name: 'Веб версия и мобильная'}, {name: 'Основные фуниции'}, {name: 'Проблемы с платформой'}, {name: 'Веб версия и мобильная'}] },
        { id: "home", label: "Сколько занимает открытие счета" , questions: [{name: "Продвинутые функции"}, {name: 'Веб версия и мобильная'}, {name: 'Основные фуниции'}, {name: 'Проблемы с платформой'}, {name: 'Веб версия и мобильная'}] },
        { id: "about", label: "Сколько занимает открытие счета", questions: [{name: "Продвинутые функции"}, {name: 'Веб версия и мобильная'}, {name: 'Основные фуниции'}, {name: 'Проблемы с платформой'}, {name: 'Веб версия и мобильная'}] },
        /* Add more menu items as needed */
    ]);

    const moveMenuItem = (fromIndex, toIndex) => {
        const newMenuItems = [...menuItems];
        const [movedItem] = newMenuItems.splice(fromIndex, 1);
        newMenuItems.splice(toIndex, 0, movedItem);
        setMenuItems(newMenuItems);
    };

    const [openKeys, setOpenKeys] = useState([]); // State to manage open submenus

    const handleMenuOpenChange = (keys) => {

        setOpenKeys(keys);
    };

    return (
        <DndProvider backend={HTML5Backend}>
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
                    className="custom-menu"
                    openKeys={openKeys} // Pass the state to manage open submenus
                    onOpenChange={(keys) => handleMenuOpenChange(keys)} // Use a callback function to handle the open and close events
                    style={{ maxHeight: '100vh', borderRight: 0, width: '100%!important' }}
                >
                    {menuItems.map((m, index) => (
                        <DraggableMenuItem
                                key={m.id}
                                id={m.id}
                                index={index}
                                moveMenuItem={moveMenuItem}
                            >
                            <Menu.SubMenu className="submenu" key={`submenu_${index}_1`} title={m.label}>
                                {m.questions.map((q, qIndex) => (
                                    <Menu.Item key={`question_${index}_${qIndex}`}>
                                        <Link to={'/detailedQuestion'}>
                                        {q.name}
                                        </Link>
                                     
                                        </Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        </DraggableMenuItem>))}
                </Menu>
            </Sider>
        </DndProvider>
    );
};

export default SidebarNav;
