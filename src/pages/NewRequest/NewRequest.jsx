import React from 'react';
import styles from './index.module.less';
import { Col, Row, Form } from 'antd';
import Input from 'components/Input/Input.jsx';
import PopularQuestionslist from 'components/PopularQuestionslist/PopularQuestionslist';
import Button from 'components/Button/Button.jsx';

const NewRequest = () => {
  return (
    <div>
      <div className={styles.missingQuestionBox}>
        <div className={`${styles.textContainer} my-paragraph`}>
          <h3 className={styles.heading}>
            К сожалению, мы ничего не нашли по Вашему запросу
          </h3>
          <p>
            Вы можете оставить заявку со своим вопросом, мы
            <br />
            обязательно вам ответим. Ответ займет 5 рабочих дней.
          </p>
        </div>

        <div>
          <Form layout="vertical">
            <div className={styles.missingQuestionForm}>
              <Form.Item required label="Тема вопроса:">
                <Input
                  className={styles.inputStyle}
                  placeholder="Введите тему вопроса"
                  maxLength={150}
                />
                <span className={styles.characterLimit}>
                  Ограничение по символам: 150
                </span>
              </Form.Item>

              <Form.Item required label="Почта:">
                <Input
                  className={styles.inputStyle}
                  placeholder="Введите почту"
                  maxLength={150}
                />
                <span className={styles.characterLimit}>
                  Ограничение по символам: 150
                </span>
              </Form.Item>
            </div>

            <Form.Item required label="Текст вопроса:">
              <Input.TextArea
                rows={6}
                className={styles.textareaStyle}
                placeholder="Введите текст вашего запроса"
                maxLength={2000}
              />
              <span className={styles.characterLimit}>
                Ограничение по символам: 2000
              </span>
            </Form.Item>
          </Form>
        </div>
        <Button type="primary" shape="round" className={styles.btnSend}>
          Отправить
        </Button>

        <div className={styles.popular}>
          <PopularQuestionslist />
          <PopularQuestionslist />
        </div>
      </div>
    </div>
  );
};

export default NewRequest;
