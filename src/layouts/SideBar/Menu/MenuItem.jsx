import DraggableMenuItem from '../DraggableMenuItem.jsx';
import { Link, useHistory } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import './index.module.less';
// import ArrowRight from 'images/arrowRight.svg';
// import ArrowDown from 'images/arrowDown.svg';
import { SIDEBAR_BUTTON } from '../../../constants/index.js';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Popconfirm } from 'antd';
import { i18n } from '../../../utils/i18next.js';
import { findByLangKey } from '../../../helpers/findByLangKey';
import { checkPermissions } from '../../../helpers/checkPermission.js';

const MenuItem = ({
  category,
  question,
  index,
  handleAddCategory,
  handleDeleteCategory,
  handleEditCategory,
  handleAddQuestion,
  moveMenuItem,
  activeOpenedKeys,
  onMenuClick,
  handleDeleteQuestion,
  handleEditQuestion,
  moveMenuItemQuestion,
  activeButton = SIDEBAR_BUTTON.ALL,
  openQuestionKey,
}) => {
  const history = useHistory();
  const menu = (id) => {
    return (
      <Menu>
        {checkPermissions(['ROLE_SUPER_ADMIN', 'ROLE_WATCHER']) ? null : (
          <>
            <Menu.Item key="addCategory" onClick={() => handleAddCategory(id)}>
              {i18n.t('menu.addCategory')}
            </Menu.Item>
            <Menu.Item key="edit" onClick={() => handleEditCategory(id)}>
              {i18n.t('menu.editCategory')}
            </Menu.Item>
            <Menu.Item key="addQuestion" onClick={() => handleAddQuestion(id)}>
              {i18n.t('menu.addQuestion')}
            </Menu.Item>
          </>
        )}
        <Menu.Item key="remove">
          <Popconfirm
            title={i18n.t('actions.sure')}
            cancelText={i18n.t('actions.cancel')}
            okButtonProps={{
              className: 'button-modal',
            }}
            cancelButtonProps={{ className: 'button-default' }}
            onConfirm={() => handleDeleteCategory(id)}
            onOpenChange={() => console.log('open change')}
          >
            {i18n.t('menu.deleteCategory')}
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );
  };

  const menuQuestion = (id) => {
    return (
      <Menu>
        {checkPermissions(['ROLE_SUPER_ADMIN', 'ROLE_WATCHER']) ? null : (
          <>
            <Menu.Item key="addCategory" onClick={() => handleAddCategory(id)}>
              {i18n.t('menu.addCategory')}
            </Menu.Item>
            <Menu.Item key="edit" onClick={() => handleEditQuestion(id)}>
              {i18n.t('menu.editQuestion')}
            </Menu.Item>
          </>
        )}
        <Menu.Item key="remove" onClick={() => handleDeleteQuestion(id)}>
          {i18n.t('menu.deleteQuestion')}
        </Menu.Item>
      </Menu>
    );
  };

  const AllMenuItem = () => {
    return (
      <div key={`category_${category?.id}`}>
        <DraggableMenuItem
          item={category}
          key={`category_${category?.id}`}
          index={index}
          moveMenuItem={moveMenuItem}
        >
          <div>
            <div
              className={'mainMenu hoveredLink'}
              key={`submenu_${category?.id}`}
              onClick={(e) => {
                if (e.target.tagName !== 'svg' && e.target.classList.contains('linkName')) {
                  onMenuClick(category?.id);
                }
              }}
              style={{
                padding: '12px 0',
                fontSize: '14px',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <a
                className={
                  location.pathname !== '/' &&
                  activeOpenedKeys?.includes(category.id) &&
                  'activeLink'
                }
                onClick={(e) => {
                  if (e.target.tagName !== 'svg' && e.target.classList.contains('linkName')) {
                    history.push(`/category/${category?.id}`);
                  } else {
                    e.preventDefault(); // Prevent the link from being triggered
                  }
                }}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <span className="linkName">{category?.categorieContents?.name}</span>
                <Dropdown overlay={menu(category.id)} trigger={['click']}>
                  <MoreOutlined style={{ fontSize: '1.5em' }} />
                </Dropdown>
              </a>
            </div>
            {category?.questions?.map((q, qIndex) => (
              <div
                key={q.id}
                style={{
                  display:
                    activeOpenedKeys !== [] && activeOpenedKeys?.includes(category.id)
                      ? 'inherit'
                      : 'none',
                }}
              >
                <DraggableMenuItem
                  item={q}
                  isCategory={false}
                  key={q.id}
                  moveMenuItem={moveMenuItemQuestion}
                  index={index}
                >
                  <div
                    key={`question_${qIndex}_${q.id}`}
                    className={'hoveredLinkSecondary subMenu'}
                    style={{ padding: '8px 2px 8px 8px', marginBottom: '4px' }}
                  >
                    <a
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                      onClick={(e) => {
                        if (
                          e.target.tagName !== 'svg' &&
                          !e.target.classList.contains('anticon') &&
                          e.target.classList.contains('linkName')
                        ) {
                          history.push(`/question/admin/${q.id}`);
                        } else {
                          e.preventDefault(); // Prevent the link from being triggered
                        }
                      }}
                    >
                      <span className="linkName">
                        {findByLangKey(q?.questionContents)
                          ? findByLangKey(q?.questionContents).title
                          : ''}
                      </span>
                      <Dropdown
                        style={{ zIndex: '10' }}
                        overlay={menuQuestion(q.id)}
                        trigger={['click']}
                      >
                        <MoreOutlined style={{ fontSize: '1.5em' }} />
                      </Dropdown>
                    </a>
                  </div>
                </DraggableMenuItem>
              </div>
            ))}
          </div>
        </DraggableMenuItem>
      </div>
    );
  };

  const PopularMenuItem = () => {
    return (
      <div key={question?.id}>
        <DraggableMenuItem
          item={question}
          handleDelete={() => handleDeleteQuestion(question.id)}
          handleAdd={handleAddCategory}
          isCategory={false}
          draggable={false}
          key={question?.id}
          id={question?.id}
          handleEdit={() => handleEditQuestion(question?.id)}
          moveMenuItem={moveMenuItemQuestion}
          index={index}
        >
          <div
            key={`question_${index}_${question?.id}`}
            className={openQuestionKey && openQuestionKey === question?.id
              ? 'activeLink mainMenu' : 'hoveredLink mainMenu'}
            style={{ padding: '8px', marginBottom: '4px' }}
          >
            <Link to={`/question/admin/${question?.id}`}>
              <span>
                {findByLangKey(question?.questionContents)
                  ? findByLangKey(question?.questionContents).title
                  : ''}
              </span>
            </Link>
          </div>
        </DraggableMenuItem>
      </div>
    );
  };
  return (
    <React.Fragment>
      {activeButton === SIDEBAR_BUTTON.ALL && category && <AllMenuItem />}
      {activeButton === SIDEBAR_BUTTON.POPULAR && question && <PopularMenuItem />}
    </React.Fragment>
  );
};

MenuItem.prototype = {
  category: PropTypes.any,
  index: PropTypes.any,
  handleAddCategory: PropTypes.any,
  handleDeleteCategory: PropTypes.any,
  handleEditCategory: PropTypes.any,
  handleAddQuestion: PropTypes.any,
  setOrderModal: PropTypes.any,
  moveMenuItem: PropTypes.any,
  activeOpenedKeys: PropTypes.any,
  onMenuClick: PropTypes.any,
  handleDeleteQuestion: PropTypes.any,
  handleEditQuestion: PropTypes.any,
  moveMenuItemQuestion: PropTypes.any,
};

export default MenuItem;
