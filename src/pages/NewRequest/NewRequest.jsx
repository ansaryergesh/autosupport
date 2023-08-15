import React from 'react';
import styles from './index.module.less';
import { Form, Row, Col } from 'antd';
import Input from 'components/Input/Input.jsx';
import PopularQuestionslist from 'components/PopularQuestionslist/PopularQuestionslist';
import Button from 'components/Button/Button.jsx';

const NewRequest = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Row gutter={16} className={styles.missingQuestionBox}>
        <Col span={24} className={styles.textContainer}>
          <h3 className={styles.heading}>
            К сожалению, мы ничего не нашли по Вашему запросу
          </h3>

          <p className="my-paragraph">
            Вы можете оставить заявку со своим вопросом, мы
            <br />
            обязательно вам ответим. Ответ займет 5 рабочих дней.
          </p>
        </Col>

        <Col span={24}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical">
            <Row gutter={16}>
              <Col style={{ marginLeft: 'auto' }} span={8}>
                <Form.Item
                  rules={[
                    { required: true, message: 'Please input your question!' }
                  ]}
                  label="Тема вопроса:">
                  <Input
                    className={styles.inputStyle}
                    placeholder="Введите тему вопроса"
                    maxLength={150}
                  />
                  <span className={styles.characterLimit}>
                    Ограничение по символам: 150
                  </span>
                </Form.Item>
              </Col>

              <Col style={{ marginRight: 'auto' }} span={8}>
                <Form.Item
                  rules={[
                    { required: true, message: 'Please input your email!' }
                  ]}
                  label="Почта:">
                  <Input
                    className={styles.inputStyle}
                    placeholder="Введите почту"
                    maxLength={150}
                  />
                  <span className={styles.characterLimit}>
                    Ограничение по символам: 150
                  </span>
                </Form.Item>
              </Col>

              <Col style={{ margin: 'auto' }} span={16}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Please input text of your request!'
                    }
                  ]}
                  label="Текст вопроса:">
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
              </Col>
            </Row>
            <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="default" htmlType="submit">
                Отправить
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col style={{ marginLeft: 'auto' }}>
          <PopularQuestionslist />
        </Col>

        <Col style={{ marginRight: 'auto' }}>
          <PopularQuestionslist />
        </Col>
      </Row>
    </div>
  );
};

export default NewRequest;
