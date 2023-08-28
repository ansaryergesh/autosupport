import DraggableMenuItem from '../DraggableMenuItem.jsx';
import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import './index.module.less';
// import ArrowRight from 'images/arrowRight.svg';
// import ArrowDown from 'images/arrowDown.svg';
import { SIDEBAR_BUTTON } from '../../../constants/index.js';
import {MoreOutlined} from "@ant-design/icons";
import {Dropdown, Menu, Popconfirm} from "antd";

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
  activeButton = SIDEBAR_BUTTON.ALL
}) => {

  const menu = (id) => {
    return (
        <Menu>
          { (
              <Menu.Item key="addCategory" onClick={() => handleAddCategory(id)}>
                Добавить новая категория
              </Menu.Item>
          )}
          <Menu.Item key="edit" onClick={() => handleEditCategory(id)}>
            Редактировать категория
          </Menu.Item>
          <Menu.Item key="addQuestion" onClick={() => handleAddQuestion(id)}>
            Добавить вопрос
          </Menu.Item>
          <Menu.Item key="remove">
            <Popconfirm
                title="Title"
                description="Open Popconfirm with Promise"
                onConfirm={() => handleDeleteCategory(id)}
                onOpenChange={() => console.log('open change')}>
              Удалить категория
            </Popconfirm>
          </Menu.Item>
        </Menu>
    )
  }

  const menuQuestion = (id) => {
    return (
        <Menu>
          <Menu.Item key="addCategory" onClick={() => handleAddCategory(id)}>
            Добавить новая категория
          </Menu.Item>
          <Menu.Item key="edit" onClick={() => handleEditQuestion(id)}>
            Редактировать вопрос
          </Menu.Item>
          <Menu.Item key="remove" onClick={() => handleDeleteQuestion(id)}>
              Удалить вопрос
          </Menu.Item>
        </Menu>
    );
  }

  const AllMenuItem = () => {
    return (
      <div key={`category_${category?.id}`}>
        <DraggableMenuItem
          item={category}
          key={`category_${category?.id}`}
          index={index}
          moveMenuItem={moveMenuItem}>
          <div>
            <div
              className={'mainMenu hoveredLink'}
              key={`submenu_${category?.id}`}
              onClick={() => onMenuClick(category?.id)}
              style={{
                padding: '12px 0',
                fontSize: '14px',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
              <Link
                className={
                  location.pathname !== '/' &&
                  activeOpenedKeys?.includes(category.id) &&
                  'activeLink'
                }
                style={{ display: 'flex', justifyContent: 'space-between' }}
                to={`/category/${category?.id}`}>
                <span>{category?.categorieContents?.name}</span>
                  <Dropdown overlay={menu(category.id)} trigger={['contextMenu']}>
                      <MoreOutlined style={{ fontSize: '1.5em' }} />
                  </Dropdown>
              </Link>
            </div>
            {category?.questions?.map((q, qIndex) => (
              <div
                key={q.id}
                style={{
                  display:
                    activeOpenedKeys !== [] &&
                    activeOpenedKeys?.includes(category.id)
                      ? 'inherit'
                      : 'none'
                }}>
                <DraggableMenuItem
                  item={q}
                  isCategory={false}
                  key={q.id}
                  moveMenuItem={moveMenuItemQuestion}
                  index={index}>
                  <div
                    key={`question_${qIndex}_${q.id}`}
                    className={'hoveredLinkSecondary subMenu'}
                    style={{ padding: '8px 2px 8px 8px', marginBottom: '4px' }}>
                    <Link
                        style={{ display: 'flex', justifyContent: 'space-between' }}
                        to={`/question/admin/${q.id}`}>
                      <span>{q?.questionContents?.title}</span>
                      <Dropdown style={{zIndex: '1000000000'}} overlay={menuQuestion(q.id)} trigger={['contextMenu']}>
                        <MoreOutlined style={{ fontSize: '1.5em' }} />
                      </Dropdown>
                    </Link>
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
          index={index}>
          <div
            key={`question_${index}_${question?.id}`}
            className={'hoveredLink mainMenu'}
            style={{ padding: '8px', marginBottom: '4px' }}>
            <Link to={`/question/admin/${question?.id}`}>
              <span>{question?.questionContents?.title}</span>
            </Link>
          </div>
        </DraggableMenuItem>
      </div>
    );
  };
  return (
    <React.Fragment>
      {activeButton === SIDEBAR_BUTTON.ALL && category && <AllMenuItem />}
      {activeButton === SIDEBAR_BUTTON.POPULAR && question && (
        <PopularMenuItem />
      )}
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
  moveMenuItemQuestion: PropTypes.any
};

export default MenuItem;
