import React from 'react';
import styles from './index.module.less';
import { Form, Row, Col } from 'antd';
import Input from 'components/Input/Input.jsx';
import Button from 'components/Button/Button.jsx';
import TypographyHead from '../../components/Typography/TypographyHead';
import { TypoGraphyType } from '../../components/Typography/constants';

const NewAnswer = () => {
  return (
    <div>
      <Form requiredMark={false} layout="vertical">
        <Row justify={'center'} gutter={16}>
          <Col span={16} className={styles.textBox}>
            <TypographyHead
              type={TypoGraphyType.SECONDARY_HEAD}
              content={
                ' Вы находитесь в административной панели Freedom Broker Инструкция по работе с тикетами:'
              }
            />
            <TypographyHead
              type={TypoGraphyType.LEVEL_3}
              content={
                'Если ответ на вопрос есть в системе, ответить клиенту по почте со ссылкой на ответ Если ответа нет в системе можно создать такой вопрос-ответ в соответствующей категории и выслать клиенту ссылку Ответить клиенту по почте и после поставить задачу на создание вопроса и ответа в системе Важно: не забывать внести перевод на казахский и английский языки.'
              }
            />
          </Col>

          <Col span={9}>
            <Form.Item
              name="question"
              rules={[{ required: true, message: `Question is required` }]}
              className={styles.labelText}>
              <Input placeholder="Тема вопроса" maxLength={150} />
            </Form.Item>
          </Col>

          <Col span={9}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: `Email is required` }]}
              className={styles.labelText}>
              <Input placeholder="Введите почту" maxLength={150} />
            </Form.Item>
          </Col>

          <Col span={18}>
            <Form.Item
              name="answer"
              rules={[{ required: true, message: `Answer is required` }]}
              className={styles.labelText}
              label="Ответ">
              <Input.TextArea
                rows={6}
                placeholder="Начните вводить..."
                maxLength={2000}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item>
              <p className={styles.handler}>
                Обработан менеджером Жунисхан Аружан 10.07.2023 г в 11:23
              </p>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Отправить
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default NewAnswer;
