import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Col, Row, notification } from 'antd';
import ReactPlayer from 'react-player';
import TypographyHead from 'components/Typography/TypographyHead.jsx';
import { TypoGraphyType } from 'components/Typography/constants.js';
import Button from 'components/Button/Button.jsx';
import ImageSlider from 'components/ImageSlider/ImageSlider.jsx';
import ShowHtmlContent from 'components/ShowHtmlContent/ShowHtmlContent.jsx';
import styles from './index.module.less';
import Review from './Review.jsx';
import SimilarQuestions from './SimilarQuestions.jsx';
import { getAnswerById, saveAnswer } from '../../service/Answer/index.js';
import { INSTRUCTION_TYPE } from '../../constants/index.js';
import { initialQuestionAnswerContent } from '../QuestionAnswerContent/constants';
import { LANG_KEY } from '../../constants/index.js';
import { i18n } from '../../utils/i18next.js';
import { useHistory } from 'react-router';
import JHeader from '../../components/JHeader/JHeader';

const QuestionAnswerUser = () => {
  const { questionId, resourceId } = useParams();
  const history = useHistory();
  const [data, setData] = useState(initialQuestionAnswerContent);
  const [selectedLanguage, setSelectedLanguage] = useState(LANG_KEY.RU);

  const answerContentByLanguage = data.answerContents?.find(
    (item) => item.langKey === selectedLanguage
  );

  const { videoUrl, videoDescription, images, stepDescription } =
    answerContentByLanguage;

  const [selectedInstructionType, setSelectedInstrcutionType] = useState(
    images.length ? INSTRUCTION_TYPE.VISUAL : INSTRUCTION_TYPE.VIDEO
  );

  useEffect(() => {
    getAnswerById(questionId, resourceId).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, [questionId, resourceId]);

  const saveNotification = () => {
    notification.success({
      message: i18n.t('actions.saved'),
      placement: 'top'
    });
  };

  const handleSave = () => {
    const sendData = {
      id: data.id,
      status: 'PUBLISHED'
    };
    saveAnswer(data.id, sendData)
      .then((res) => {
        console.log(res.data);
        history.push('/');
        saveNotification();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <JHeader pageTitle={i18n.t('actions.preview')} />

      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Button type="default-active">{data.resource.name}</Button>
        </Col>

        <Col
          span={16}
          style={{
            marginLeft: '8px',
            padding: '12px 0',
            display: 'flex',
            alignItems: 'center'
          }}>
          {Object.values(LANG_KEY).map((item) => (
            <Button
              key={item}
              onClick={() => setSelectedLanguage(item)}
              type={`${
                selectedLanguage === item ? 'default-active' : 'default'
              }`}>
              {item}
            </Button>
          ))}
        </Col>

        <Col span={16}>
          <div className={styles.card}>
            <TypographyHead
              type={TypoGraphyType.SECONDARY_HEAD}
              content={i18n.t('description')}
            />
            <ShowHtmlContent htmlContent={stepDescription} />
            {
              <>
                {Object.values(INSTRUCTION_TYPE).map((item) => (
                  <Button
                    className={styles.instructionBtn}
                    key={item}
                    onClick={() => setSelectedInstrcutionType(item)}
                    type={
                      item === selectedInstructionType
                        ? 'default-active'
                        : 'default'
                    }>
                    {i18n.t(item)}
                  </Button>
                ))}
                <div>
                  {selectedInstructionType === INSTRUCTION_TYPE.VIDEO && (
                    <>
                      <TypographyHead
                        type={TypoGraphyType.SUB_HEAD}
                        content={videoDescription}
                        className={styles.videoDescription}
                      />
                      <ReactPlayer
                        style={{ margin: 'auto' }}
                        width={600}
                        height={400}
                        controls={true}
                        url={videoUrl}
                      />
                    </>
                  )}

                  {selectedInstructionType === INSTRUCTION_TYPE.VISUAL && (
                    <div className={styles.mediaBox}>
                      <ImageSlider slides={images} sliderData={images} />
                    </div>
                  )}
                </div>
              </>
            }
          </div>
        </Col>

        <Col span={16}>
          <Review />
        </Col>

        <Col span={16}>
          <Button onClick={() => history.goBack()}>
            {i18n.t('actions.back')}
          </Button>
          <Button onClick={handleSave}>{i18n.t('actions.save')}</Button>
        </Col>

        <Col>
          <SimilarQuestions />
        </Col>
      </Row>
    </div>
  );
};

export default QuestionAnswerUser;

{
  /* <TypographyHead
                type={TypoGraphyType.LEVEL_2_BOLD}
                content={'Нашел ошибку в тексте?'}
              />
              <TypographyHead
                type={TypoGraphyType.LEVEL_2}
                content={'Выдели и нажми CTRL+Enter'}
              /> */
}
