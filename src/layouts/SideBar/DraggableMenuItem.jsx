import { useDrag, useDrop } from 'react-dnd';
import React from 'react';
import PropTypes from 'prop-types';

const MenuItemTypes = {
  MENU_ITEM: 'menu_item',
  QUESTION_ITEM: 'question_item',
};

const DraggableMenuItem = ({ index, item, isCategory = true, moveMenuItem, children }) => {
  const [, drag] = useDrag({
    type: isCategory ? MenuItemTypes.MENU_ITEM : MenuItemTypes.QUESTION_ITEM,
    item: { id: item.id },
  });

  const [, drop] = useDrop({
    accept: isCategory ? MenuItemTypes.MENU_ITEM : MenuItemTypes.QUESTION_ITEM,
    drop: (draggedItem) => {
      if (draggedItem.id !== item.id) {
        moveMenuItem(draggedItem.id, item.orderNumber);
        draggedItem.index = index;
      }
    },
  });
  return (
    <div ref={(node) => drag(drop(node))} style={{ cursor: 'move' }}>
      {children}
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
