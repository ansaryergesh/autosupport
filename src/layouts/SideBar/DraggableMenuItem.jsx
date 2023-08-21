import {Dropdown, Menu, Popconfirm} from "antd";
import {useDrag, useDrop} from "react-dnd";
import React from "react";
import PropTypes from "prop-types";

const MenuItemTypes = {
    MENU_ITEM: 'menu_item',
    QUESTION_ITEM: 'question_item'
};


const DraggableMenuItem = ({
                               id,
                               index,
                               item,
                               isCategory=true,
                               moveMenuItem,
                               children,
                                draggable=true,
                               handleEdit,
                               handleAdd,
                               handleDelete,
                               handleOrderChange,
                               handleAddQuestion
}) => {
    const menu = (
        <Menu>
            {draggable && <Menu.Item key="addCategory" onClick={() => handleAdd(id)}>Добавить новая категория</Menu.Item>}
            <Menu.Item key="edit" onClick={() => handleEdit(id)}>Редактировать категория</Menu.Item>
            {draggable && <Menu.Item key="add" onClick={() => handleOrderChange(id)}>Изменить порядок</Menu.Item>}
            <Menu.Item key="addQuestion" onClick={() => handleAddQuestion(id)}>Добавить вопрос</Menu.Item>
            <Menu.Item key="remove"><Popconfirm
                title="Title"
                description="Open Popconfirm with Promise"
                onConfirm={() => handleDelete(id)}
                onOpenChange={() => console.log('open change')}
            >
                Удалить категория
            </Popconfirm></Menu.Item>
        </Menu>
    );
    const menuQuestion = (
        <Menu>
            {draggable && <Menu.Item key="addCategory" onClick={() => handleAdd(id)}>Добавить новая категория</Menu.Item>}
            <Menu.Item key="open" onClick={() => handleAdd(id)}>Открыть вопрос</Menu.Item>
            <Menu.Item key="edit" onClick={() => handleEdit(id)}>Редактировать вопрос</Menu.Item>
            {draggable && <Menu.Item key="add" onClick={() => handleOrderChange(id)}>Изменить порядок</Menu.Item>}
            <Menu.Item key="remove"><Popconfirm
                title="Title"
                description="Open Popconfirm with Promise"
                onConfirm={() => handleDelete(id)}
                onOpenChange={() => console.log('open change')}
            >
                Удалить вопрос
            </Popconfirm></Menu.Item>
        </Menu>
    );


    const [, drag] = useDrag({
        type: isCategory ? MenuItemTypes.MENU_ITEM : MenuItemTypes.QUESTION_ITEM,
        item: { id: item.id  }
    });

    const [, drop] = useDrop({
        accept: isCategory ? MenuItemTypes.MENU_ITEM : MenuItemTypes.QUESTION_ITEM,
        drop: (draggedItem) => {
            if (draggedItem.id !== item.id) {
                moveMenuItem(draggedItem.id, item.orderNumber);
                draggedItem.index = index;
            }
        }
    });
    return (
        <div ref={(node) => drag(drop(node))} style={{ cursor: 'move' }}>
            <Dropdown overlay={isCategory ? menu : menuQuestion} menu={isCategory ? menu : menuQuestion} trigger={['contextMenu']}>
                    {children}
            </Dropdown>
            {/*{children}*/}
        </div>
    );
};
DraggableMenuItem.propTypes = {
    id: PropTypes.number || PropTypes.string,
    index: PropTypes.number || PropTypes.string,
    moveMenuItem: PropTypes.func,
    children: PropTypes.any,
    handleEdit: PropTypes.func,
    handleAdd: PropTypes.func,
    handleDelete: PropTypes.func,
    handleOrderChange: PropTypes.func,
    handleAddQuestion: PropTypes.func,
    isCategory: PropTypes.bool,
    item: PropTypes.object,
    draggable: PropTypes.bool,
};

export default DraggableMenuItem;