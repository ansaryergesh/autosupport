import { Space, Row, Upload } from 'antd';
import React, { useState } from 'react';
import styles from './index.module.less';
import Button from 'components/Button/Button';
import Input from '../../../components/Input/Input';
import plus from 'images/plus.svg';

const InstructionChoice = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [selectedVideoButton, setSelectedVideoButton] = useState('Видео инструкция');
  const handleVideoButtonClick = () => {
    setShowVideo(true);
    setSelectedVideoButton('Видео инструкция');
  };
  const handleVisualButtonClick = () => {
    setShowVideo(false);
    setSelectedVideoButton('Визуальная инструкция');
  };

  return (
    <Space>
      <Row>
        <Space direction="vertical" size={25}>
          <Row>
            <Space size={7}>
              <Button
                type={selectedVideoButton === 'Визуальная инструкция' ? 'primary' : 'default'}
                className="my-paragraph"
                onClick={handleVisualButtonClick}
              >
                Визуальная инструкция
              </Button>
              <Button
                type={selectedVideoButton === 'Видео инструкция' ? 'primary' : 'default'}
                className="my-paragraph"
                onClick={handleVideoButtonClick}
              >
                Видео инструкция
              </Button>
            </Space>
          </Row>
          <div className={styles.instructions}>
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
          </div>
        </Space>
      </Row>
    </Space>
  );
};

export default InstructionChoice;
