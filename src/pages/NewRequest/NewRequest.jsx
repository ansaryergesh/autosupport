import React, { useState } from 'react';
import styles from './index.module.less';
import { Form, Row, Col, Image } from 'antd';
import Input from 'components/Input/Input.jsx';
import InputTextArea from 'components/Input/textArea';
import Button from 'components/Button/Button.jsx';
import notFound from 'images/notFound.svg';

const NewRequest = () => {
  const [text, setText] = useState('');
  const maxCharacterCount = 2000;

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
        requiredMark={false}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Row justify={'center'} gutter={16}>
          <Col>
            <Image src={notFound} alt="Illustrationw" preview={false} />
          </Col>
          <Col span={24} className={styles.textContainer}>
            <h3 className={styles.heading}>К сожалению, мы ничего не нашли по Вашему запросу</h3>

            <p className={styles.paragraph}>
              Вы можете оставить заявку со своим вопросом, мы обязательно вам ответим. <br />
              Ответ займет 5 рабочих дней.
            </p>
          </Col>

          <Col span={8}>
            <Form.Item
              name="question"
              rules={[{ required: true, message: 'Please input your question!' }]}
            >
              <Input className={styles.inputItem} placeholder="Тема вопроса" maxLength={150} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input className={styles.inputItem} placeholder="Введите почту" maxLength={150} />
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item
              name="text"
              rules={[
                {
                  required: true,
                  message: 'Please input text of your request!',
                },
              ]}
              label="Текст вопроса"
            >
              <InputTextArea
                value={text}
                onChange={handleTextChange}
                autoSize={{ minRows: 6, maxRows: 50 }}
                className={styles.textareaStyle}
                placeholder="Начните вводить..."
                maxLength={2000}
              />
              <span className={styles.characterCount}>
                {text.length}/{maxCharacterCount}
              </span>
            </Form.Item>
          </Col>

          <Col span={10} style={{ display: 'flex', justifyContent: 'center' }}>
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

export default NewRequest;
