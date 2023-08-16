import {Dropdown, Menu} from "antd";
import {useDrag, useDrop} from "react-dnd";
import React from "react";
import PropTypes from "prop-types";

const MenuItemTypes = {
    MENU_ITEM: 'menu_item'
};

const DraggableMenuItem = ({
                               id,
                               index,
                               moveMenuItem,
                               children,
                               handleEdit,
                               handleAdd,
                               handleDelete,
                               handleOrderChange,
                               handleAddQuestion
}) => {
    const menu = (
        <Menu>
            <Menu.Item key="addCategory" onClick={() => handleAdd(id)}>Добавить новая категория</Menu.Item>
            <Menu.Item key="edit" onClick={() => handleEdit(id)}>Редактировать</Menu.Item>
            <Menu.Item key="add" onClick={() => handleOrderChange(id)}>Изменить порядок</Menu.Item>
            <Menu.Item key="addQuestion" onClick={() => handleAddQuestion(id)}>Добавить вопрос</Menu.Item>
            <Menu.Item key="remove" onClick={() => handleDelete(id)}>Удалить</Menu.Item>
        </Menu>
    );

    const [, drag] = useDrag({
        type: MenuItemTypes.MENU_ITEM,
        item: { id, index }
    });

    const [, drop] = useDrop({
        accept: MenuItemTypes.MENU_ITEM,
        hover: (draggedItem) => {
            console.log(draggedItem);
            console.log(id);
            if (draggedItem.index !== index) {
                moveMenuItem(draggedItem.index, index);
                draggedItem.index = index;
            }
        }
    });

    return (

        <div ref={(node) => drag(drop(node))} style={{ cursor: 'move' }}>
            <Dropdown overlay={menu} trigger={['contextMenu']} >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {children}
                </div>
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
    handleAddQuestion: PropTypes.func
};

export default DraggableMenuItem;