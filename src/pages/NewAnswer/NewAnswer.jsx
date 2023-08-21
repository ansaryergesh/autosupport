import React from 'react';
import styles from './index.module.less';
import { Form, Row, Col } from 'antd';
import Input from 'components/Input/Input.jsx';
import Button from 'components/Button/Button.jsx';

const NewAnswer = () => {
  return (
    <div>
      <div>
        <Row gutter={16}>
          <Col span={24} className={styles.textBox}>
            <h2 className={styles.heading}>
              Вы находитесь в административной панели Freedom Broker <br />
              Инструкция по работе с тикетами:
            </h2>
            <p className={styles.paragraph} style={{ fontSize: '16px' }}>
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
            <Form
              requiredMark={false}
              className={styles.formBox}
              layout="vertical">
              <Row gutter={16}>
                <Col style={{ marginLeft: 'auto' }} span={9}>
                  <Form.Item
                    name="question"
                    rules={[
                      { required: true, message: `Question is required` }
                    ]}
                    className={styles.labelText}>
                    <Input
                      className={styles.inputItem}
                      placeholder="Тема вопроса"
                      maxLength={150}
                    />
                  </Form.Item>
                </Col>

                <Col style={{ marginRight: 'auto' }} span={9}>
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: `Email is required` }]}
                    className={styles.labelText}>
                    <Input
                      className={styles.inputItem}
                      placeholder="Введите почту"
                      maxLength={150}
                    />
                  </Form.Item>
                </Col>

                <Col style={{ margin: 'auto' }} span={18}>
                  <Form.Item
                    name="answer"
                    rules={[{ required: true, message: `Answer is required` }]}
                    className={styles.labelText}
                    label="Ответ">
                    <Input.TextArea
                      rows={6}
                      className={styles.inputItem}
                      placeholder="Начните вводить..."
                      maxLength={2000}
                    />
                  </Form.Item>
                </Col>

                <Col style={{ margin: 'auto' }}>
                  <Form.Item>
                    <p className={styles.handler}>
                      Обработан менеджером Жунисхан Аружан 10.07.2023 г в 11:23
                    </p>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="primary" htmlType="submit">
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
