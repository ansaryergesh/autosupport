import React, { useState } from 'react';
import { Image, Input, Layout, Menu, Typography} from 'antd';
import { i18n } from 'utils/i18next.js';
import {adminNavItems, initialMenuItems} from './constants.js';
import { Link } from 'react-router-dom';
import ActionsModal from "./ActionsModal";
import DraggableMenuItem from "./DraggableMenuItem.jsx";
import SideBarButtons from "./SideBarButtons.jsx";
import Footer from "../Footer/Footer.jsx";
const { Sider } = Layout;

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
    <Input
      placeholder={i18n.t('SearchQuestion')}
      style={{
        border: 'none',
        width: '100%'
      }}
      value={searchValue}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
    />
  );
};



const SidebarNav = ({ isAdmin = true }) => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  const moveMenuItem = (fromIndex, toIndex) => {
    const newMenuItems = [...menuItems];
    const [movedItem] = newMenuItems.splice(fromIndex, 1);
    newMenuItems.splice(toIndex, 0, movedItem);
    setMenuItems(newMenuItems);
  };

    const moveMenuItemQuestion = (fromIndex, toIndex) => {
        console.log(fromIndex, toIndex)
    }

  const [openKeys, setOpenKeys] = useState([]); // State to manage open submenus
  const [categoryModal,setCategoryModal] = useState(false);
  const [categoryEditModal,setCategoryEditModal] = useState(false);

  const [questionModal,setQuestionModal] = useState(false);
  const [orderModal,setOrderModal] = useState(false);

  const handleMenuOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const handleAddCategory = () => {
      setCategoryModal(true)
  }

  return (
      <Sider width={300} className="site-layout-background" >
        <SearchInput />
        <Layout className={'navAdmin'}>
          {isAdmin &&
            adminNavItems.map((item, index) => (
              <Link to={item.path} className={'navAdminItem'} key={index}>
                <Image src={item.icon} preview={false} />
                <Typography>{i18n.t(item.name)}</Typography>
              </Link>
            ))}
        </Layout>
        <div
          style={{
            marginTop: '10px',
            marginBottom: '20px',
            background: 'transparent'
          }}>
          <SideBarButtons />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[]}
          className="custom-menu"
          openKeys={openKeys} // Pass the state to manage open submenus
          onOpenChange={(keys) => handleMenuOpenChange(keys)} // Use a callback function to handle the open and close events
          style={{
            maxHeight: '100vh',
            borderRight: 0,
            width: '100%!important'
          }}>
          {menuItems.map((m, index) => (
            <DraggableMenuItem
              key={m.id}
              id={m.id}
              index={index}
              handleAdd={handleAddCategory}
              handleDelete={() => {}}
              handleEdit={() => {setCategoryEditModal(true)}}
              handleAddQuestion={() => {setQuestionModal(true)}}
              handleOrderChange={() => {setOrderModal(true)}}
              moveMenuItem={moveMenuItem}>

              <Menu.SubMenu
                className="submenu"
                key={`submenu_${index}_1`}
                title={m.label}>
                {m.questions.map((q, qIndex) => (
                    <DraggableMenuItem
                        key={`question_${index}_${qIndex}`}
                        moveMenuItem={moveMenuItemQuestion}
                        index={`question_${index}_i${qIndex}`}>
                        <Menu.Item key={`question_${index}_${qIndex}`}>
                            <Link to={'/detailedQuestion'}>{q.name}</Link>
                        </Menu.Item>
                    </DraggableMenuItem>

                ))}
              </Menu.SubMenu>
            </DraggableMenuItem>
          ))}
        </Menu>
          <ActionsModal
              categoryModal={categoryModal}
              setCategoryModal={setCategoryModal}
              categoryEditModal={categoryEditModal}
              setCategoryEditModal={setCategoryEditModal}
              questionModal={questionModal}
              setQuestionModal={setQuestionModal}
              orderModal={orderModal}
              setOrderModal={setOrderModal}
          />
        <div>
          <Footer />
        </div>
      </Sider>
  );
};

export default SidebarNav;
