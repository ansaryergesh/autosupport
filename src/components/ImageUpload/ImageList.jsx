import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DeleteOutlined, FireOutlined } from '@ant-design/icons';
import { i18n } from '../../utils/i18next.js';

const ImageList = ({ displayFileList, fileList, setFileList, handlePreview, handleRemove}) => {

  const moveItem = (firstId, secondId) => {
    const firstIndex = fileList.findIndex(item => item.id === firstId);
    const secondIndex = fileList.findIndex(item => item.id === secondId);
    if((firstIndex && secondIndex )|| (firstIndex === 0 || secondIndex === 0)) {
      const draggedItem = fileList[firstIndex];
      setFileList((prevState) => {
        const updatedItems = [...prevState];
        updatedItems.splice(firstIndex, 1);
        updatedItems.splice(secondIndex, 0, draggedItem);
        return updatedItems.map((u, index) => {
          return { ...u, imageOrder: index + 1 }
        });
      });
    }

  };

  const RenderImage = (item, index) => {
    const [, ref] = useDrag({
      type: 'IMAGE_ITEM',
      item: {id: item.item.id},
    });

    const [, drop] = useDrop({
      accept: 'IMAGE_ITEM',
      drop: (draggedItem) => {
        if (item.item.id !== draggedItem.id) {
          moveItem(draggedItem.id, item.item.id);
        }
      },
    });

    return (
      <div ref={(node) => ref(drop(node))} className="itemImage" key={index}>
        {item.item.imageOrder === 1 && <FireOutlined title={i18n.t('mainImage')} style={{position: 'absolute', top: "15px", left: '5px'}} />}
        <DeleteOutlined  style={{position: 'absolute', bottom: "15px", right: '5px'}} onClick={() => handleRemove(item.item)}/>
        <img src={item.item.url} alt={item.item.uuid} onClick={e => {
          if(e.target.tagName !== 'svg') {
            handlePreview(item.item)
          }
        }} />
      </div>
    );
  };

  return (
    <div className="imageList">
      {displayFileList.map((item, index) => {
        return <RenderImage key={index} item={item} index={index}/>
      })}
    </div>
  );
};

export default ImageList
