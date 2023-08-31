import React, { useState } from 'react';
import { Col, Row, Space, Dropdown, Menu } from 'antd';
import styles from './index.module.less';
import Button from '../../components/Button/Button';
import dots from 'images/dots.svg';
import MyComponent from './SunEditor';
import trash from 'images/trash.svg';
import plus from 'images/plus.svg';
import deleteX from 'images/deleteX.svg';
import { Upload } from 'antd';
import Input from '../../components/Input/Input';

const DetailedQuestionAdmin = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [selectedVideoButton, setSelectedVideoButton] = useState('Видео инструкция');
  const [inputText, setInputText] = useState('');
  const [additionalButtons, setAdditionalButtons] = useState([]);
  const handlePlusButtonClick = (areaIndex) => {
    const updatedCounts = [...inputCounts];
    updatedCounts[areaIndex] += 1;
    setInputCounts(updatedCounts);
  };
  const [inputCounts, setInputCounts] = useState(Array.from({ length: 4 }, () => 0)); // Замените '3' на количество областей, которые у вас есть

  const handleVideoButtonClick = () => {
    setShowVideo(true);
    setSelectedVideoButton('Видео инструкция');
  };

  const handleVisualButtonClick = () => {
    setShowVideo(false);
    setSelectedVideoButton('Визуальная инструкция');
  };

  const [selectedAppButton, setSelectedAppButton] = useState('РУС');
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

  const handleDeleteInput = (areaIndex, inputIndex) => {
    const updatedCounts = [...inputCounts];
    updatedCounts[areaIndex] -= 1;
    setInputCounts(updatedCounts);

    const updatedButtons = [...additionalButtons];
    updatedButtons[areaIndex].splice(inputIndex, 1);
    setAdditionalButtons(updatedButtons);
  };

  return (
    <div>
      <Space direction="vertical" size={30}>
        <Row>
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
                            <Menu.Item onClick={() => handleDeleteButtonClick(index)}>
                              Delete
                            </Menu.Item>
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
        <Row>
          <Space direction="horizontal" size={'small'}>
            <Button
              type={selectedAppButton === 'РУС' ? 'default-active' : 'default'}
              onClick={() => setSelectedAppButton('РУС')}
            >
              РУС
            </Button>
            <Button
              type={selectedAppButton === 'КАЗ' ? 'default-active' : 'default'}
              onClick={() => setSelectedAppButton('КАЗ')}
            >
              КАЗ
            </Button>
            <Button
              type={selectedAppButton === 'ENG' ? 'default-active' : 'default'}
              onClick={() => setSelectedAppButton('ENG')}
            >
              ENG
            </Button>
          </Space>
        </Row>

        <Row gutter={[24, 24]}>
          <Col span={16}>
            <div className={styles.content}>
              <Space direction="vertical" size={16}>
                <p className="my-heading-2  ">Описание шагов</p>
                <MyComponent />
              </Space>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.content}>
              <div className={styles.sameQuestionContainer}>
                <p className="my-heading-2">Похожие вопроcы</p>
                <button className={styles.button}>
                  <img src={trash} alt="" />
                </button>
              </div>
              <div className={styles.sameQuestionInputContainer}>
                <Input className={styles.sameQuestionInput} placeholder="Поиск похожих вопросов" />
                <button className={styles.button} onClick={() => handlePlusButtonClick(0)}>
                  <img src={plus} alt="Add" />
                </button>
              </div>
              <Row>
                {Array.from({ length: inputCounts[0] }).map((index) => (
                  <div key={index} className={styles.sameQuestionInputContainer}>
                    <Input
                      className={styles.newQuestionAdd}
                      type="text"
                      placeholder={`Введите вопрос`}
                    />
                    <button className={styles.button} onClick={() => handleDeleteInput(0, index)}>
                      <img src={deleteX} alt="Delete" />
                    </button>
                  </div>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
        <div className={styles.content}>
          <Space direction="vertical" size={35} className={styles.instructions}>
            <p className="my-heading-2">Выбрать вид инструкции </p>
            <Space direction="vertical" size={13} className={styles.instructionsTypes}>
              <p className="my-paragraph">
                {' '}
                1. Визуальная инструкция(вам будут показаны фотографии с дальнейщими шагами)
              </p>
              <p className="my-paragraph">
                {' '}
                2. Видео инструкция(полная видео инструкция как получить ответ)
              </p>
            </Space>
            <Row>
              <Space size={15}>
                <Button
                  type={selectedVideoButton === 'Видео инструкция' ? 'default-active' : 'default'}
                  className="my-paragraph"
                  onClick={handleVideoButtonClick}
                >
                  Видео инструкция
                </Button>
                <Button
                  type={
                    selectedVideoButton === 'Визуальная инструкция' ? 'default-active' : 'default'
                  }
                  className="my-paragraph"
                  onClick={handleVisualButtonClick}
                >
                  Визуальная инструкция
                </Button>
              </Space>
            </Row>
            {showVideo ? (
              <Row>
                <Space direction="vertical" size={15}>
                  <Input className={styles.inputs} placeholder="URL видео" />
                  <Input className={styles.inputs} placeholder="Описание к видео" />
                </Space>
              </Row>
            ) : (
              <Row>
                <Space direction="vertical" size={15}>
                  <Upload
                    className={styles.upload}
                    accept="image/*,video/*"
                    showUploadList={false}
                    beforeUpload={() => false} // To prevent immediate upload
                  >
                    <Button className={styles.uploadButton}>
                      <img src={plus} alt="plus" />
                    </Button>
                  </Upload>
                  <Input className={styles.inputs} placeholder="Введите описание к картинке" />
                </Space>
              </Row>
            )}
          </Space>
        </div>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <div className={styles.content}>
              <div className={styles.addNewTagContainer}>
                <p className="my-heading-2">Добавить теги</p>
              </div>
              <div className={styles.addNewTagInputContainer}>
                <Input className={styles.sameQuestionInput} placeholder="Поиск похожих тегов" />
                <button className={styles.button} onClick={() => handlePlusButtonClick(2)}>
                  <img src={plus} alt="Add" />
                </button>
              </div>
              <Row>
                {Array.from({ length: inputCounts[2] }).map((_, index) => (
                  <div key={index} className={styles.addNewTagInputContainer}>
                    <Input
                      className={styles.newQuestionAdd}
                      type="text"
                      placeholder={`Введите вопрос`}
                    />
                    <button className={styles.button} onClick={() => handleDeleteInput(2, index)}>
                      <img src={deleteX} alt="Delete" />
                    </button>
                  </div>
                ))}
              </Row>
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.content}>
              <div className={styles.addNewTagContainer}>
                <p className="my-heading-2">Добавить ключевые слова</p>
              </div>
              <div className={styles.addNewTagInputContainer}>
                <Input className={styles.sameQuestionInput} placeholder="Поиск ключевых слов" />
                <button className={styles.button} onClick={() => handlePlusButtonClick(3)}>
                  <img src={plus} alt="Add" />
                </button>
              </div>
              <Row>
                {Array.from({ length: inputCounts[3] }).map((_, index) => (
                  <div key={index} className={styles.addNewTagInputContainer}>
                    <Input
                      className={styles.newQuestionAdd}
                      type="text"
                      placeholder={`Введите вопрос`}
                    />
                    <button className={styles.button} onClick={() => handleDeleteInput(3, index)}>
                      <img src={deleteX} alt="Delete" />
                    </button>
                  </div>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
        <Row></Row>
      </Space>
    </div>
  );
};

export default DetailedQuestionAdmin;
