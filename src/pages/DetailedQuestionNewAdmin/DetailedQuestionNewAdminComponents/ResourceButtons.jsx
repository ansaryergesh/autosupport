import React, { useState } from 'react';
import { Row, Space, Dropdown, Menu } from 'antd';
import Button from '../../../components/Button/Button';
import dots from 'images/dots.svg';
import Input from '../../../components/Input/Input';
import styles from './index.module.less';
import plus from 'images/plus.svg';

const ResourceButtons = () => {
  const [inputText, setInputText] = useState('');
  const [additionalButtons, setAdditionalButtons] = useState([]);
  const [showInputField, setShowInputField] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleShowInputField = () => {
    setShowInputField(true);
  };

  const handleDeleteButtonClick = (index) => {
    const updatedButtons = [...additionalButtons];
    updatedButtons.splice(index, 1);
    setAdditionalButtons(updatedButtons);
  };

  const handleEditButtonClick = (index, buttonText) => {
    setEditedText(buttonText);
    setEditingIndex(index);
  };

  const handleSaveEditedText = (index) => {
    const updatedButtons = [...additionalButtons];
    updatedButtons[index] = editedText;
    setAdditionalButtons(updatedButtons);
    setEditingIndex(-1);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleInputKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      handleSaveEditedText(index);
    }
  };

  const handleInputEnterPress = (e) => {
    if (e.key === 'Enter' && inputText.trim() !== '') {
      setAdditionalButtons([...additionalButtons, inputText]);
      setInputText('');
      setShowInputField(false); // Close the input field after creating the new button
    }
  };
  return (
    <Row className={styles.resourceButtonWrapper}>
      <Space size={10}>
        {additionalButtons.map((buttonText, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            {editingIndex === index ? (
              <div style={{ flex: 1 }}>
                <Input
                  value={editedText}
                  onChange={handleInputChange}
                  onKeyPress={(e) => handleInputKeyPress(e, index)}
                />
              </div>
            ) : (
              <Space>
                <Button className={styles.custombutton}>
                  {buttonText}
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item onClick={() => handleEditButtonClick(index, buttonText)}>
                          Edit
                        </Menu.Item>
                        <Menu.Item onClick={() => handleDeleteButtonClick(index)}>Delete</Menu.Item>
                      </Menu>
                    }
                    placement="bottomRight"
                  >
                    <img src={dots} alt="dots" style={{ marginLeft: '10px' }} />
                  </Dropdown>
                </Button>
              </Space>
            )}
          </div>
        ))}
        {showInputField && (
          <>
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleInputEnterPress}
            />
            <button className={styles.button} onClick={handleShowInputField}>
              <img src={plus} alt="" />
            </button>
          </>
        )}
        {!showInputField && (
          <button className={styles.button} onClick={handleShowInputField}>
            <img src={plus} alt="" />
          </button>
        )}
      </Space>
    </Row>
  );
};

export default ResourceButtons;
