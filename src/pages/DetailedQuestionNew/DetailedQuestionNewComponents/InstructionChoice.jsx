import { Space, Row } from 'antd';
import React, { useState } from 'react';
import styles from './index.module.less';
import phone from 'images/phone.jpg';
import Button from 'components/Button/Button';

const InstructionChoice = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [selectedVideoButton, setSelectedVideoButton] =
    useState('Видео инструкция');
  const [paragraphText, setParagraphText] = useState(
    'Как открыть брокерский счёт в мобильном приложении Tradernet.Global | Freedom Broker'
  );

  const handleVideoButtonClick = () => {
    setShowVideo(true);
    setSelectedVideoButton('Видео инструкция');
  };
  const handleVisualButtonClick = () => {
    setShowVideo(false);
    setSelectedVideoButton('Визуальная инструкция');
    setParagraphText('1. Зайдите в раздел “Категории” ');
  };

  return (
    <Space>
      <Row>
        <Space direction="vertical" size={25}>
          <Row>
            <Space size={7}>
              <Button
                type={
                  selectedVideoButton === 'Визуальная инструкция'
                    ? 'primary'
                    : 'default'
                }
                className="my-paragraph"
                onClick={handleVisualButtonClick}>
                Визуальная инструкция
              </Button>
              <Button
                type={
                  selectedVideoButton === 'Видео инструкция'
                    ? 'primary'
                    : 'default'
                }
                className="my-paragraph"
                onClick={handleVideoButtonClick}>
                Видео инструкция
              </Button>
            </Space>
          </Row>
          <div className={styles.instructions}>
            {showVideo ? (
              <iframe
                className={styles.youtubeVideoWrapper}
                title="Random YouTube Video"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/https://www.youtube.com/watch?v=xXtgHzBCHRw&list=PL_gRQJE4yEpedcDUhHVPkTc2KW8g3QCfJ&index=2"
                allowFullScreen></iframe>
            ) : (
              <Space direction="vertical" size={15}>
                <p className="my-paragraph">{paragraphText}</p>
                <img className={styles.phoneImage} src={phone} alt="phone" />
              </Space>
            )}
          </div>
        </Space>
      </Row>
    </Space>
  );
};

export default InstructionChoice;
