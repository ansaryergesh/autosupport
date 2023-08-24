import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Col, Row } from 'antd';
import ReactPlayer from 'react-player';
import { getResources } from '../../service/Resources/index.js';
import { getQuestionById } from '../../service/Question/index.js';
import TypographyHead from 'components/Typography/TypographyHead.jsx';
import { TypoGraphyType } from 'components/Typography/constants.js';
import Button from 'components/Button/Button.jsx';
import JHeader from 'components/JHeader/JHeader.jsx';
import ImageSlider from 'components/ImageSlider/ImageSlider.jsx';
import ShowHtmlContent from 'components/ShowHtmlContent/ShowHtmlContent.jsx';
import { initialQuestionDto } from 'components/JHeader/constants.js';
import styles from './index.module.less';
import { initialData } from './constants.js';
import Review from './Review.jsx';
import SimilarQuestions from './SimilarQuestions.jsx';

const QuestionAnswerUser = () => {
  const { id } = useParams();
  const [resources, setResources] = useState([]);
  const [activeResource, setActiveResource] = useState(null);
  const [questionInfo, setQuestionInfo] = useState({ initialQuestionDto });
  const [showVideo, setShowVideo] = useState(false);
  const [selectedVideoButton, setSelectedVideoButton] =
    useState('Фото инструкция');

  const data = initialData;
  const [{ stepDescription }] = data.answerContents;
  const [{ images }] = data.answerContents;
  const [{ videoUrl }] = data.answerContents;

  const handleVideoButtonClick = () => {
    setShowVideo(true);
    setSelectedVideoButton('Видео инструкция');
  };
  const handleVisualButtonClick = () => {
    setShowVideo(false);
    setSelectedVideoButton('Фото инструкция');
  };

  useEffect(() => {
    getResources().then((res) => {
      setResources(res.data);

      setActiveResource(res.data[0].id);
    });

    getQuestionById(id).then((res) => {
      setQuestionInfo(res.data);
    });
  }, [id, questionInfo]);

  return (
    <div>
      <JHeader questionInfo={questionInfo} />
      <div
        style={{
          padding: '32px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
        {resources.map((resource, index) => (
          <Button
            onClick={() => setActiveResource(resource.id)}
            type={`${
              activeResource === resource.id ? 'default-active' : 'default'
            }`}
            key={index}>
            {resource.name}
          </Button>
        ))}
      </div>

      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Row gutter={[24, 24]} className={styles.card}>
            <Col>
              <TypographyHead
                type={TypoGraphyType.SECONDARY_HEAD}
                content={'Description'}
              />
              <ShowHtmlContent htmlContent={stepDescription} />
              <TypographyHead
                type={TypoGraphyType.LEVEL_2_BOLD}
                content={'Нашел ошибку в тексте?'}
              />
              <TypographyHead
                type={TypoGraphyType.LEVEL_2}
                content={'Выдели и нажми CTRL+Enter'}
              />
            </Col>

            <Col span={18}>
              <Button
                type={
                  !showVideo && selectedVideoButton === 'Фото инструкция'
                    ? 'default-active'
                    : 'default'
                }
                onClick={handleVisualButtonClick}>
                Фото инструкция
              </Button>
              <Button
                type={
                  showVideo && selectedVideoButton === 'Видео инструкция'
                    ? 'default-active'
                    : 'default'
                }
                onClick={handleVideoButtonClick}>
                Видео инструкция
              </Button>
            </Col>

            <Col className={styles.mediaBox}>
              {showVideo && (
                <ReactPlayer
                  width={720}
                  height={520}
                  controls={true}
                  url={videoUrl}
                />
              )}
              {!showVideo && (
                <ImageSlider slides={images} sliderData={images} />
              )}
            </Col>
          </Row>
        </Col>

        <Col style={{ padding: '0' }} span={16}>
          <Review />
        </Col>

        <Col span={9}>
          <SimilarQuestions />
        </Col>
      </Row>
    </div>
  );
};

export default QuestionAnswerUser;
