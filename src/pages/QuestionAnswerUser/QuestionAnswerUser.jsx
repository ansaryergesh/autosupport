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
import { getQuestionById } from '../../service/Question/index.js';
import { PlaySquareFilled } from '@ant-design/icons';

const QuestionAnswerUser = () => {
  const { questionId, resourceId } = useParams();
  const history = useHistory();
  const [data, setData] = useState(initialQuestionAnswerContent);
  const [selectedLanguage, setSelectedLanguage] = useState(LANG_KEY.RU);
  const answerContentByLanguage = data.answerContents?.find(
    (item) => item.langKey === selectedLanguage
  );
  const [activeResource, setActiveResource] = useState(null);
  const { videoUrl, images, stepDescription } = answerContentByLanguage;

  const [selectedInstructionType, setSelectedInstrcutionType] = useState(
    images[0] ? INSTRUCTION_TYPE.VISUAL : INSTRUCTION_TYPE.VIDEO
  );

  useEffect(() => {
    getQuestionById(questionId).then((res) => {
      const active =
        res.data?.resources?.find((item) => item.id === resourceId) || null;
      setActiveResource(active);
    });

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

  const similarQuestionExist = data?.question?.children?.length > 0;

  return (
    <div>
      <Row>
        <Col span={similarQuestionExist ? 17 : 24}>
          <JHeader pageTitle={i18n.t('actions.preview')} />
        </Col>
        {similarQuestionExist && <SimilarQuestions data={data} />
        }

      </Row>

      <Row gutter={[16, 16]}>
        <Col span={17}>
          {activeResource && (
            <Button type="default-active">{activeResource.name}</Button>
          )}
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

        <Col span={similarQuestionExist ? 18 : 24}>
          <div className={styles.card}>
            <TypographyHead
              type={TypoGraphyType.SECONDARY_HEAD}
              content={i18n.t('questionAnswer.descriptionTitle')}
            />
            <ShowHtmlContent htmlContent={stepDescription} />
            {
              <>
                <div>
                  {Object.values(INSTRUCTION_TYPE).map(
                    (item) =>
                      ((item === INSTRUCTION_TYPE.VISUAL && images[0]) ||
                        (item === INSTRUCTION_TYPE.VIDEO && videoUrl)) && (
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
                      )
                  )}
                </div>
                <div>
                  {selectedInstructionType === INSTRUCTION_TYPE.VIDEO && (
                    <div
                      style={{
                        borderRadius: '24px',
                        background: 'white'
                      }}>
                      <ReactPlayer
                        pip={true}
                        progressInterval={12}
                        playsinline={true}
                        playIcon={PlaySquareFilled}
                        style={{ margin: 'auto' }}
                        width={'100%'}
                        height={450}
                        controls={true}
                        url={videoUrl}
                      />
                    </div>
                  )}

                  {selectedInstructionType === INSTRUCTION_TYPE.VISUAL &&
                  images[0] ? (
                    <div className={styles.mediaBox}>
                      <ImageSlider slides={images || []} sliderData={images} />
                    </div>
                  ) : null}
                </div>
              </>
            }
          </div>
        </Col>

        <Col span={similarQuestionExist ? 18 : 24}>
          <Review />
        </Col>

        <Col span={similarQuestionExist ? 18 : 24}>
          <Button onClick={() => history.goBack()}>
            {i18n.t('actions.back')}
          </Button>
          <Button onClick={handleSave}>{i18n.t('actions.save')}</Button>
        </Col>
      </Row>
    </div>
  );
};

export default QuestionAnswerUser;
