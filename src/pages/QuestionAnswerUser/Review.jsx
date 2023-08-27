import React, { useState } from 'react';
import styles from './index.module.less';
import { Rate, Row, Col, Form } from 'antd';
import Button from '../../components/Button/Button';
import InputTextArea from '../../components/Input/textArea';
import TypographyHead from '../../components/Typography/TypographyHead';
import { TypoGraphyType } from '../../components/Typography/constants';
import { i18n } from '../../utils/i18next.js';

const quickAnswers = [
  {
    id: 1,
    text: 'Понятно'
  },
  {
    id: 2,
    text: 'Удобный интерфейс'
  },
  {
    id: 3,
    text: 'Быстро'
  },
  {
    id: 4,
    text: 'Видео инструкция'
  },
  {
    id: 5,
    text: 'Содержание'
  }
];

const Review = () => {
  const [rating, setRating] = useState();
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [text, setText] = useState('');
  const maxCharacterCount = 150;

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
  };

  const handleRating = (value) => {
    setRating(value);
  };

  const handleAnswer = (id) => {
    selectedAnswers.includes(id)
      ? setSelectedAnswers(selectedAnswers.filter((item) => item !== id))
      : setSelectedAnswers([...selectedAnswers, id]);
  };

  return (
    <Row gutter={[0, 10]} className={styles.card}>
      <Col span={24}>
        <TypographyHead
          className={styles.reviewHead}
          type={TypoGraphyType.SECONDARY_HEAD}
          content={i18n.t('questionAnswer.rateAnswer')}
        />
        <TypographyHead
          type={TypoGraphyType.LEVEL_3}
          content={i18n.t('questionAnswer.rateSubtitel')}
        />

        <Form onFinish={() => {}}>
          <Form.Item>
            <Rate
              value={rating}
              onChange={handleRating}
              className={styles.rate}
            />
          </Form.Item>

          {rating > 0 && (
            <>
              <Form.Item>
                <div className={styles.quick}>
                  {quickAnswers.map((q) => (
                    <Button
                      type={
                        selectedAnswers?.includes(q.id)
                          ? 'secondary-active'
                          : 'secondary'
                      }
                      key={q.id}
                      onClick={() => handleAnswer(q.id)}>
                      {q.text}
                    </Button>
                  ))}
                </div>
              </Form.Item>

              <Form.Item>
                <InputTextArea
                  value={text}
                  onChange={handleTextChange}
                  className={
                    text.length === maxCharacterCount
                      ? styles.textAreaLimit
                      : styles.textArea
                  }
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  placeholder={i18n.t('questionAnswer.comment')}
                  maxLength={150}
                />
                <span className={styles.characterCount}>
                  {text.length}/{maxCharacterCount}
                </span>
                {text.length === maxCharacterCount && (
                  <span className={styles.characterLimitMessage}>
                    {i18n.t('questionAnswer.characterLimit')}
                  </span>
                )}
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button
              className={styles.reviewBtn}
              disabled={!rating > 0}
              type="third"
              htmlType="submit">
              {i18n.t('questionAnswer.rateButton')}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Review;
