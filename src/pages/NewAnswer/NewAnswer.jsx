import React from 'react';
import styles from './index.module.less';
import { Form, Row, Col } from 'antd';
import Input from 'components/Input/Input.jsx';
import Button from 'components/Button/Button.jsx';
import Title from 'antd/lib/typography/Title.js';

const NewAnswer = () => {
  return (
    <div>
      <div>
        <Row gutter={[16, 16]}>
          <Col span={24} className={styles.textBox}>
            <Title level={3}>
              Вы находитесь в административной панели Freedom Broker <br />
              Инструкция по работе с тикетами:
            </Title>
            <p style={{ fontSize: '16px' }}>
              Если ответ на вопрос есть в системе, ответить клиенту по почте со
              ссылкой на ответ <br />
              Если ответа нет в системе можно создать такой вопрос-ответ в
              соответствующей категории и выслать клиенту ссылку <br />
              Ответить клиенту по почте и после поставить задачу на создание
              вопроса и ответа в системе
              <br />
              Важно: не забывать внести перевод на казахский и английский языки.
            </p>
          </Col>

          <Col span={24}>
            <Form className={styles.formBox} layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="question"
                    rules={[
                      { required: true, message: `Question is required` }
                    ]}
                    className={styles.labelText}
                    label="Тема вопроса:">
                    <Input
                      className={styles.inputItem}
                      placeholder="Введите тему вопроса"
                      maxLength={150}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: `Email is required` }]}
                    className={styles.labelText}
                    label="Почта:">
                    <Input
                      className={styles.inputItem}
                      placeholder="Введите почту"
                      maxLength={150}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="answer"
                    rules={[{ required: true, message: `Answer is required` }]}
                    className={styles.labelText}
                    label="Текст вопроса:">
                    <Input.TextArea
                      rows={6}
                      className={styles.inputItem}
                      placeholder="Введите текст вашего ответа"
                      maxLength={2000}
                    />
                  </Form.Item>
                </Col>

                <Col style={{ marginLeft: 'auto' }}>
                  <Form.Item>
                    <p className={styles.handler}>
                      Обработан менеджером Жунисхан Аружан 10.07.2023 г в 11:23
                    </p>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="default" htmlType="submit">
                  Обработан
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NewAnswer;
