import React, { useState } from 'react';
import styles from './index.module.less';
import { Rate, Row, Col, Form } from 'antd';
import Button from '../../components/Button/Button';
import InputTextArea from '../../components/Input/textArea';
import TypographyHead from '../../components/Typography/TypographyHead';
import { TypoGraphyType } from '../../components/Typography/constants';

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
          content={'Полезен ли был ответ?'}
        />
        <TypographyHead
          type={TypoGraphyType.LEVEL_3}
          content={
            'Просьба оценить ответ по 5-и бальной шкале, это поможет нам стать лучше'
          }
        />
      </Col>

      <Col span={24}>
        <Form onFinish={() => {}}>
          <Row>
            <Col span={24}>
              <Form.Item>
                <Rate
                  value={rating}
                  onChange={handleRating}
                  className={styles.rate}
                />
              </Form.Item>
            </Col>

            {rating > 0 && (
              <>
                <Col span={18}>
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
                </Col>

                <Col span={24}>
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
                      placeholder="Ваш коментарий"
                      maxLength={150}
                    />
                    <span className={styles.characterCount}>
                      {text.length}/{maxCharacterCount}
                    </span>
                    {text.length === maxCharacterCount && (
                      <span className={styles.characterLimitMessage}>
                        Достигнут лимит символов
                      </span>
                    )}
                  </Form.Item>
                </Col>
              </>
            )}

            <Col span={24}>
              <Form.Item>
                <Button
                  className={styles.reviewBtn}
                  disabled={!rating > 0}
                  type="third"
                  htmlType="submit">
                  Оставить отзыв
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default Review;
