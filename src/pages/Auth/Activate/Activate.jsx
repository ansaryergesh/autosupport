import { Col, Form, Image, notification, Row } from 'antd';
import styles from '../index.module.less';
import Logo from 'images/logoFreedom.svg';
import Title from 'antd/lib/typography/Title.js';
import Button from 'components/Button/Button.jsx';
import Input from 'components/Input/Input.jsx';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { activateUser, clearStorage } from '../../../service/Auth/index.js';
import { useEffect } from 'react';

const Activate = () => {
  useEffect(() => {
    clearStorage();
  }, []);
  const history = useHistory();
  const queryParams = queryString.parse(history.location.search);
  const onFinish = (values) => {
    const key = queryParams.key;
    const data = {
      key,
      password: values.password,
    };

    activateUser(data).then(() => {
      clearStorage();
      history.push('/sign-in');
      notification.success({ message: 'Activated' });
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.authBlock}>
      <Col span={24}>
        <div className={styles.logoBox}>
          <div className={styles.logo}>
            <Image src={Logo} preview={false} />
          </div>
        </div>

        <Title level={2}>Страница активаций</Title>
        <span>Введите новый пароль и активируйте свой аккаунт</span>
        <Form
          name="basic"
          style={{ maxWidth: 550 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={[16]}>
            <Col span={24}>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input
                  type="password"
                  size={'large'}
                  placeholder="Придумайте новый пароль"
                  className={styles.inputItem}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button className={styles.inputButton} type="submit" htmlType="submit">
                  Сохранить
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </div>
  );
};

export default Activate;
