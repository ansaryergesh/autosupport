import React, { useEffect, useState } from 'react';
import { Image, Input, Layout, notification, Typography, AutoComplete } from 'antd';
import { i18n } from 'utils/i18next.js';
import { adminNavItems } from './constants.js';
import { Link } from 'react-router-dom';
import ActionsModal from './ActionsModal';
import SideBarButtons from './SideBarButtons.jsx';
import Footer from '../Footer/Footer.jsx';
import {
  changeOrderCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
} from '../../service/Category/index.js';
import {
  changeQuestionOrder,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  searchQuestions,
} from '../../service/Question/index.js';
import MenuItem from './Menu/MenuItem.jsx';
import { LocalStorageKeys } from '../../storage/localStorageKey.js';
import { LANG_KEY, SIDEBAR_BUTTON } from '../../constants/index.js';
import { getLocale } from '../../utils/i18next.js';
import ConstDropDownMenuItem from './ConstDropDownMenuItem';
import { useHistory } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { clearStorage } from '../../service/Auth/index.js';
import { checkIfBottomScrolled } from '../../helpers/handleScroll.js';
import styles from './index.module.less';
import { ReactComponent as SearchIcon } from 'images/SearchIcon.svg';
import { ReactComponent as SearchIconFocus } from 'images/SearchIconFocus.svg';

const { Sider } = Layout;

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState([]);
  const [focus, setFocus] = useState(false);

  const handleFocus = (focused) => {
    setFocus(focused);
  };

  const handleSearch = (value) => {
    if (searchValue.length >= 2) {
      const params = {
        query: value,
        pageSize: 5,
      };
      searchQuestions(params).then((res) => {
        setOptions(
          res?.data.map((item) => ({
            value: item.questionContents.title,
            id: item.questionContents.id,
          })),
        );
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      // window.location.href = '/detailedQuestion';
    }
  };
  return (
    <>
      {focus ? (
        <SearchIconFocus className={styles.searchIcon} />
      ) : (
        <SearchIcon className={styles.searchIcon} />
      )}
      <AutoComplete
        className={styles.autoComplete}
        onSearch={handleSearch}
        onFocus={() => handleFocus(true)}
        onBlur={() => handleFocus(false)}
        options={options}
        value={searchValue}
        onChange={(value) => setSearchValue(value)}
      >
        <Input
          className={styles.searchInput}
          placeholder={i18n.t('SearchQuestion')}
          onKeyDown={handleKeyPress}
        />
      </AutoComplete>
    </>
  );
};

const SidebarNav = ({ isAdmin = true }) => {
  const [allCategories, setAllCategories] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);

  const [openKeys, setOpenKeys] = useState('');
  const [categoryModal, setCategoryModal] = useState(false);
  const [categoryEditModal, setCategoryEditModal] = useState(false);

  const [questionModal, setQuestionModal] = useState(false);
  const [questionEditModal, setQuestionEditModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryInfo, setCategoryInfo] = useState({});
  const [questionInfo, setQuestionInfo] = useState({});
  const [pageCurrent, setPageCurrent] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const defaultPageSize = 20;
  const [activeButton, setActiveButton] = useState(
    localStorage.getItem(LocalStorageKeys.ACTIVE_SIDEBAR_BUTTON) || SIDEBAR_BUTTON.ALL,
  );

  const history = useHistory();

  useEffect(() => {
    setOpenKeys([]);
    if (activeButton === SIDEBAR_BUTTON.ALL) {
      getCategoryAll();
    } else {
      getAllQuestions();
    }
  }, [activeButton]);

  const getCategoryAll = () => {
    getCategories({
      pageCurrent: 0,
      pageSize: defaultPageSize,
      langKey: getLocale()?.toUpperCase() || LANG_KEY.RU,
    }).then((res) => {
      setAllCategories(res.data);
      setTotalCount(res.headers['x-total-count']);
    });
  };

  const getCategoryOnScroll = (pageCurrent) => {
    getCategories({
      pageCurrent,
      pageSize: defaultPageSize,
      langKey: getLocale()?.toUpperCase() || LANG_KEY.RU,
    }).then((res) => {
      setAllCategories((prevState) => [...prevState, ...res.data]);
    });
  };

  const getAllQuestions = () => {
    console.log(allQuestions);
    const params = {
      langKey: getLocale().toUpperCase(),
      pageSize: 20,
    };
    getQuestions(params).then((res) => {
      setAllQuestions(res.data);
    });
  };

  // eslint-disable-next-line no-unused-vars
  const moveMenuItem = (draggedItemId, orderNumber) => {
    if (orderNumber) {
      changeOrderCategory(draggedItemId, orderNumber).then((res) => {
        console.log(res);
        getCategoryAll();
      });
    }
  };

  const moveMenuItemQuestion = (draggedItemId, orderNumber) => {
    console.log(orderNumber);
    if (orderNumber) {
      changeQuestionOrder(draggedItemId, orderNumber).then((res) => {
        console.log(res);
        getCategoryAll();
      });
    }
  };

  const handleAddCategory = () => {
    setCategoryModal(true);
  };

  // eslint-disable-next-line no-unused-vars
  const handleDeleteCategory = (categoryId) => {
    deleteCategory(categoryId).then((res) => {
      console.log(res);
      history.push('/');
      notification.success('deleted category');
      getCategoryAll();
    });
  };

  const handleDeleteQuestion = (questionId) => {
    deleteQuestion(questionId).then((res) => {
      console.log(res);
      notification.success('deleted question');
      getCategoryAll();
    });
  };

  // eslint-disable-next-line no-unused-vars
  const handleAddQuestion = (categoryId) => {
    setCategoryId(categoryId);
    setQuestionModal(true);
  };

  // eslint-disable-next-line no-unused-vars
  const handleEditCategory = (categoryId) => {
    getCategoryById(categoryId).then((res) => {
      console.log(res);
      setCategoryInfo({});
      setCategoryInfo(res.data);
      setCategoryEditModal(true);
    });
  };

  const handleEditQuestion = (questionId) => {
    setQuestionInfo({});
    getQuestionById(questionId).then((res) => {
      console.log(res);
      setQuestionInfo(res.data);
      setQuestionEditModal(true);
    });
  };

  const handleSubMenuClick = (key) => {
    setOpenKeys([key]); // Update openKeys with the clicked submenu's key
  };

  const logOutNotification = () => {
    notification.info({
      message: i18n.t('commons.signOutMessage'),
      placement: 'top',
    });
  };

  const handleLogOut = () => {
    clearStorage();
    logOutNotification();
    history.push(`/sign-in`);
  };

  const handleScroll = (e) => {
    if (checkIfBottomScrolled(e) && Math.ceil(totalCount / defaultPageSize) >= pageCurrent + 1) {
      setPageCurrent((prevState) => {
        getCategoryOnScroll(prevState + 1);
        return prevState + 1;
      });
    }
  };

  return (
    <Sider width={300} className="site-layout-background">
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
          background: 'transparent',
        }}
      >
        <SideBarButtons activeButton={activeButton} setActiveButton={setActiveButton} />
      </div>
      <ConstDropDownMenuItem handleAdd={handleAddCategory} />
      <div
        onScroll={(e) => {
          handleScroll(e);
        }}
        className="custom-menu"
        style={{
          maxHeight: '100vh',
          borderRight: 0,
          width: '100%!important',
        }}
      >
        {allCategories?.map((m, index) => (
          <MenuItem
            activeButton={activeButton}
            key={m.id}
            category={m}
            index={index}
            handleAddCategory={handleAddCategory}
            handleDeleteCategory={() => handleDeleteCategory(m.id)}
            handleEditCategory={() => {
              handleEditCategory(m.id);
            }}
            handleAddQuestion={() => handleAddQuestion(m.id)}
            setOrderModal={() => {
              setOrderModal(true);
            }}
            moveMenuItem={moveMenuItem}
            activeOpenedKeys={openKeys}
            handleDeleteQuestion={handleDeleteQuestion}
            onMenuClick={handleSubMenuClick}
            handleEditQuestion={handleEditQuestion}
            moveMenuItemQuestion={moveMenuItemQuestion}
          />
        ))}
        {allQuestions?.map((question, index) => (
          <MenuItem
            activeButton={activeButton}
            key={question.id}
            question={question}
            index={index}
            handleAddCategory={handleAddCategory}
            handleDeleteCategory={() => handleDeleteCategory(question.id)}
            handleEditCategory={() => {
              handleEditCategory(question.id);
            }}
            handleAddQuestion={() => handleAddQuestion(question.id)}
            setOrderModal={() => {
              setOrderModal(true);
            }}
            moveMenuItem={() => {}}
            activeOpenedKeys={openKeys}
            handleDeleteQuestion={handleDeleteQuestion}
            onMenuClick={handleSubMenuClick}
            handleEditQuestion={handleEditQuestion}
            moveMenuItemQuestion={() => {}}
          />
        ))}
      </div>

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

      <div onClick={handleLogOut} style={{ padding: '26px 0', cursor: 'pointer' }}>
        <LogoutOutlined /> <span>{i18n.t('commons.signOut')}</span>
      </div>

      <Footer />
    </Sider>
  );
};

export default SidebarNav;
