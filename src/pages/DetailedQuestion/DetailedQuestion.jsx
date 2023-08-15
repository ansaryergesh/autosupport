import React, { useState } from 'react';
import { Col, Input, Rate, Row, Space } from 'antd';
import styles from './index.module.less';
import TestImage from 'images/freedomSm.jpg';
import phone from 'images/phone.jpg';
import Button from '../../components/Button/Button';

const dataStep = [
  '1. Зайдите в раздел “Категории”',
  '2. Нажмите на кнопку Поиска',
  '3. В окне Поиска введите название компании, или тикер ценной бумаги',
  '4. Выберите нужный вам тикер(для покупки ценных бумаг на американских рынках, тикер должен содеражать .US)'
];
const dataStep2 = [
  '7. Укажите тип операции (Купить или Продать)',
  '8. Укажите количество бумаг, которые хотите купить'
];

const dataQuestions = [
  'Сколько занимает открытие счета?',
  'Сколько занимает открытие счета?',
  'Сколько занимает открытие счета?',
  'Сколько занимает открытие счета?',
  'Сколько занимает открытие счета?'
];

const DetailedQuestion = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [selectedVideoButton, setSelectedVideoButton] =
    useState('Видео инструкция');
  const [paragraphText, setParagraphText] = useState(
    'Как открыть брокерский счёт в мобильном приложении Tradernet.Global | Freedom Broker'
  );

  const handleVideoButtonClick = () => {
    setShowVideo(true);
    setSelectedVideoButton('Видео инструкция');
    setParagraphText(
      'Как открыть брокерский счёт в мобильном приложении Tradernet.Global | Freedom Broker'
    );
  };

  const handleVisualButtonClick = () => {
    setShowVideo(false);
    setSelectedVideoButton('Визуальная инструкция');
    setParagraphText('Зайдите в раздел Категории');
  };

  const [selectedAppButton, setSelectedAppButton] = useState('В приложении');

  return (
    <div>
      <Space direction="vertical" size={30}>
        <Row>
          <Space size={10}>
            <Button
              type={
                selectedAppButton === 'В приложении' ? 'primary' : undefined
              }
              onClick={() => setSelectedAppButton('В приложении')}>
              В приложении
            </Button>
            <Button
              type={selectedAppButton === 'На сайте' ? 'primary' : undefined}
              onClick={() => setSelectedAppButton('На сайте')}>
              На сайте
            </Button>
            <Button
              type={
                selectedAppButton === 'Freedom Finance PLC'
                  ? 'primary'
                  : undefined
              }
              onClick={() => setSelectedAppButton('Freedom Finance PLC')}>
              Freedom Finance PLC
            </Button>
            <Button
              type={
                selectedAppButton === 'АО Фридом Финанас'
                  ? 'primary'
                  : undefined
              }
              onClick={() => setSelectedAppButton('АО Фридом Финанас')}>
              АО Фридом Финанас
            </Button>
          </Space>
        </Row>

        <Row gutter={[24, 24]}>
          <Col span={16}>
            <div className={styles.content}>
              <Space direction="vertical" size={16}>
                <p className="my-heading-2  ">Описание шагов</p>
                <Space direction="vertical" size="small">
                  {dataStep.map((item, index) => (
                    <p key={index} className="my-paragraph">
                      {item}
                    </p>
                  ))}
                  <img src={TestImage} />
                  {dataStep2.map((item, index) => (
                    <p key={index} className="my-paragraph">
                      {item}
                    </p>
                  ))}
                  <img src={TestImage} />
                </Space>
              </Space>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.content}>
              <Space direction="vertical" size={23} className={styles.similar}>
                <p className="my-heading-2">Похожие вопросы</p>
                <Space direction="vertical" size={19.6}>
                  {dataQuestions.map((item, index) => (
                    <p
                      key={index}
                      className={`my-paragraph ${styles.similarQuestions}`}>
                      {' '}
                      {item}{' '}
                    </p>
                  ))}
                  <p className="my-paragraph">
                    Сколько занимает открытие счета?
                  </p>
                </Space>
              </Space>
            </div>
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={16}>
            <div className={styles.content}>
              <Space
                direction="vertical"
                size={35}
                className={styles.instructions}>
                <p className="my-heading-2">Выбрать вид инструкции </p>
                <Space
                  direction="vertical"
                  size={13}
                  className={styles.instructionsTypes}>
                  <p className="my-paragraph">
                    {' '}
                    1. Визуальная инструкция(вам будут показаны фотографии с
                    дальнейщими шагами)
                  </p>
                  <p className="my-paragraph">
                    {' '}
                    2. Видео инструкция(полная видео инструкция как получить
                    ответ)
                  </p>
                </Space>
                <Row>
                  <Space size={15}>
                    <Button
                      type={
                        selectedVideoButton === 'Видео инструкция'
                          ? 'primary'
                          : undefined
                      }
                      className="my-paragraph"
                      onClick={handleVideoButtonClick}>
                      Видео инструкция
                    </Button>
                    <Button
                      type={
                        selectedVideoButton === 'Визуальная инструкция'
                          ? 'primary'
                          : undefined
                      }
                      className="my-paragraph"
                      onClick={handleVisualButtonClick}>
                      Визуальная инструкция
                    </Button>
                  </Space>
                </Row>
                {showVideo ? (
                  <iframe
                    className={styles.youtubeVideoWrapper}
                    title="Random YouTube Video"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/pSY3i5XHHXo"
                    allowFullScreen></iframe>
                ) : (
                  <img className={styles.phoneImage} src={phone} alt="phone" />
                )}
                <p className="my-paragraph">{paragraphText}</p>
              </Space>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.content}>
              <Space direction="vertical" size={23.3} className={styles.rate}>
                <p className="my-heading-2">Полезен ли был ответ ?</p>
                <p className={`{my-paragraph ${styles.rateSubtitel}`}>
                  Просьба оценить насколько был полезен ответ по 5-и больной
                  шкале, это поможет нам стать лучше{' '}
                </p>
                <Rate />
                <Row>
                  <Space size={10}>
                    <Button type="secondary-active">Быстрый ответ</Button>
                    <Button>Быстрый ответ</Button>
                  </Space>
                </Row>
                <Row>
                  <Space size={10}>
                    <Button type="secondary">Быстрый ответ</Button>
                    <Button>Быстрый ответ</Button>
                  </Space>
                </Row>
                <Button type="primary">Быстрый ответ</Button>
                <p className={`{my-paragraph ${styles.rateSubtitel}`}>
                  Напишите полный отзыв, ваше мнение поможет стать нам лучше
                </p>
                <Input.TextArea
                  rows={7}
                  className={styles.quickAnswerInput}
                  placeholder="Введите текст"
                />
                <Button type="primary">Оставить отзыв</Button>
              </Space>
            </div>
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default DetailedQuestion;
