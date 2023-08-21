import DraggableMenuItem from "../DraggableMenuItem.jsx";
import {Link} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import './index.module.less'
import ArrowRight from 'images/arrowRight.svg';
import ArrowDown from 'images/arrowDown.svg';
import {SIDEBAR_BUTTON} from "../../../constants/index.js";
const MenuItem = ({
                      category,
                      question,
                      index,
                      handleAddCategory,
                      handleDeleteCategory,
                      handleEditCategory,
                      handleAddQuestion,
                      setOrderModal,
                      moveMenuItem,
                      activeOpenedKeys,
                      onMenuClick,
                      handleDeleteQuestion,
                      handleEditQuestion,
                      moveMenuItemQuestion,
                      activeButton = SIDEBAR_BUTTON.ALL,
                  }) => {
    const AllMenuItem = () => {
        return (
            <div key={`category_${category?.id}`}>
                <DraggableMenuItem
                    item={category}
                    key={`category_${category?.id}`}
                    id={category?.id}
                    index={index}
                    handleAdd={handleAddCategory}
                    handleDelete={() => handleDeleteCategory(category?.id)}
                    handleEdit={() => {handleEditCategory(category?.id)}}
                    handleAddQuestion={() => handleAddQuestion(category?.id)}
                    handleOrderChange={() => {setOrderModal(true)}}
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
                                className={activeOpenedKeys?.includes(category.id) && 'activeLink'}
                                style={{display: 'flex',
                                    justifyContent: 'space-between',}}
                                to={`/category/${category?.id}`}
                            >
                                <span>
                       {category?.categorieContents?.name}
                    </span>
                                {category?.questions?.length !== 0
                                    &&  <img src={activeOpenedKeys !== [] && activeOpenedKeys?.includes(category.id) ? ArrowDown : ArrowRight} />}
                            </Link>


                        </div>
                        {category?.questions?.map((q, qIndex) => (
                            <div key={q.id} style={{display: activeOpenedKeys !== [] && activeOpenedKeys?.includes(category.id) ? 'inherit' : 'none' }}>
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
                                    <div
                                        key={`question_${qIndex}_${q.id}`}
                                        className={'hoveredLinkSecondary subMenu'}

                                        style={{padding: '8px', marginBottom: '4px'}}>
                                        <Link
                                            to={`/detailedQuestionNewAdmin/${q.id}`}
                                        >
                            <span>
                                {q?.questionContents?.title}
                            </span>
                                        </Link>
                                    </div>

                                </DraggableMenuItem>
                            </div>


                        ))}
                    </div>
                </DraggableMenuItem>
            </div>

        )
    }

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

                        style={{padding: '8px', marginBottom: '4px'}}>
                        <Link
                            to={`/detailedQuestionNewAdmin/${question?.id}`}
                        >
                            <span>
                                {question?.questionContents?.title}
                            </span>
                        </Link>
                    </div>

                </DraggableMenuItem>
            </div>
        )
    }
    return (
        <React.Fragment>
            {activeButton === SIDEBAR_BUTTON.ALL && category && <AllMenuItem />}
            {activeButton === SIDEBAR_BUTTON.POPULAR && question && <PopularMenuItem />}
        </React.Fragment>
    )
}

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
}

export default MenuItem;