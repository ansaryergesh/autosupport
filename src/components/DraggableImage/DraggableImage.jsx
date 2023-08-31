import { useDrag, useDrop } from 'react-dnd';

const DraggableImage = ({ file, setFileList, index, children }) => {
  const [, drag] = useDrag({
    type: 'IMAGE',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'IMAGE',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        const updatedList = [...file];
        const [movedItem] = updatedList.splice(draggedItem.index, 1);
        updatedList.splice(index, 0, movedItem);
        setFileList(updatedList);
      }
    },
  });

  return <div ref={(node) => drag(drop(node))}>{children}</div>;
};

export default DraggableImage;
