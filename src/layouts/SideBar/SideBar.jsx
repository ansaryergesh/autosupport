import React, {useEffect, useState} from 'react';
import {Image, Input, Layout, Menu, notification, Typography} from 'antd';
import { i18n } from 'utils/i18next.js';
import {adminNavItems} from './constants.js';
import { Link } from 'react-router-dom';
import ActionsModal from "./ActionsModal";
import DraggableMenuItem from "./DraggableMenuItem.jsx";
import SideBarButtons from "./SideBarButtons.jsx";
import Footer from "../Footer/Footer.jsx";
import {
    deleteCategory,
    deleteQuestion, editCategory, editCategoryQuestion,
    getCategories,
    getCategoryById,
    getQuestionById
} from "../../service/Category/index.js";
import ConstDropDownMenuItem from "./ConstDropDownMenuItem";
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
    const [allCategories, setAllCategories] = useState([]);
    const [openKeys,setOpenKeys] = useState('')


    useEffect(() => {
       getCategoryAll();
    },[])

    const getCategoryAll = () => {
        getCategories().then(res=> {
            setAllCategories(res.data)
        })
    }
    // eslint-disable-next-line no-unused-vars
  const moveMenuItem = (draggedItemId, orderNumber) => {
      if(orderNumber) {
            getCategoryById(draggedItemId).then(res => {
                console.log(res)
                const dataToChange = {...res.data, orderNumber};
                editCategory(dataToChange).then(res=> {
                    console.log(res)
                    getCategoryAll()
                })
            })
      }
  };

    const moveMenuItemQuestion = (draggedItemId, orderNumber) => {
        console.log(orderNumber)
        if(orderNumber) {
            getQuestionById(draggedItemId).then(res => {
                console.log("before")
                console.log(res.data.orderNumber)
                const dataToChange = {...res.data, orderNumber};
                console.log("after")
                console.log(dataToChange.orderNumber)
                editCategoryQuestion(dataToChange).then(res=> {
                    console.log("at the end")
                    console.log(res.data.orderNumber)
                    getCategoryAll()
                })
            })
        }
    }

  const [categoryModal,setCategoryModal] = useState(false);
  const [categoryEditModal,setCategoryEditModal] = useState(false);

  const [questionModal,setQuestionModal] = useState(false);
  const [questionEditModal, setQuestionEditModal] = useState(false);
  const [orderModal,setOrderModal] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryInfo,setCategoryInfo] = useState({});
  const [questionInfo,setQuestionInfo] = useState({});

  const handleAddCategory = () => {
      setCategoryModal(true)
  }

    // eslint-disable-next-line no-unused-vars
  const handleDeleteCategory = (categoryId) => {
      deleteCategory(categoryId).then(res=> {
          console.log(res)
          notification.success('deleted category');
          getCategoryAll();
      })
  }

  const handleDeleteQuestion = (questionId) => {
      deleteQuestion(questionId).then(res=> {
          console.log(res)
          notification.success('deleted question');
          getCategoryAll();
      })
  }

    // eslint-disable-next-line no-unused-vars
  const handleAddQuestion = (categoryId) => {
      setCategoryId(categoryId);
      setQuestionModal(true)
  }

    // eslint-disable-next-line no-unused-vars
  const handleEditCategory = (categoryId) => {
      getCategoryById(categoryId).then((res)=> {
          console.log(res)
          setCategoryInfo({});
          setCategoryInfo(res.data);
          setCategoryEditModal(true);
      })
  }

  const handleEditQuestion = (questionId) => {
      setQuestionInfo({});
      getQuestionById(questionId).then((res)=> {
          console.log(res)
          setQuestionInfo(res.data);
          setQuestionEditModal(true);
      })
  }

    const handleSubMenuClick = (key) => {
        setOpenKeys([key]); // Update openKeys with the clicked submenu's key
    };

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
            openKeys={[openKeys]}
          mode="inline"
          className="custom-menu"
          onOpenChange={newOpenKeys => {
              setOpenKeys(newOpenKeys)
          }}

            style={{
            maxHeight: '100vh',
            borderRight: 0,
            width: '100%!important'
          }}>
            <ConstDropDownMenuItem handleAdd={handleAddCategory} />
          {allCategories.map((m, index) => (
            <DraggableMenuItem
                item={m}
              key={`category_${m.id}`}
              id={m.id}
              index={index}
              handleAdd={handleAddCategory}
              handleDelete={() => handleDeleteCategory(m.id)}
              handleEdit={() => {handleEditCategory(m.id)}}
              handleAddQuestion={() => handleAddQuestion(m.id)}
              handleOrderChange={() => {setOrderModal(true)}}
              moveMenuItem={moveMenuItem}>
              <Menu.SubMenu
                  key={`submenu_${m.id}`}
                  onTitleClick={() => handleSubMenuClick(`submenu_${m.id}`)} // Set the clicked submenu's key
                  className="submenu"
                  title={m.categorieContents?.name}>
                {m.questions.map((q, qIndex) => (
                    <DraggableMenuItem
                        item={q}
                        handleDelete={() => handleDeleteQuestion(q.id)}
                        handleAdd={handleAddCategory}
                        isCategory={false}
                        key={q.id}
                        id={q.id}
                        handleEdit={() => handleEditQuestion(q.id)}
                        moveMenuItem={moveMenuItemQuestion}
                        index={index}>
                        <Menu.Item key={`question_${qIndex}_${q.id}`}>
                            <Link to={'/detailedQuestion'}>{q.questionContents?.title}</Link>
                        </Menu.Item>
                    </DraggableMenuItem>

                ))}
              </Menu.SubMenu>
            </DraggableMenuItem>
          ))}
        </Menu>
          <ActionsModal
              getCategoryAll={getCategoryAll}
              categoryId={categoryId}
              categoryInfo={categoryInfo}
              questionInfo={questionInfo}
              categoryModal={categoryModal}
              setCategoryModal={setCategoryModal}
              categoryEditModal={categoryEditModal}
              setCategoryEditModal={setCategoryEditModal}
              questionModal={questionModal}
              questionEditModal={questionEditModal}
              setQuestionEditModal={setQuestionEditModal}
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
