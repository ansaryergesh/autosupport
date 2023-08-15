import { Col, Form, Image, notification, Row } from 'antd';
import styles from '../index.module.less';
import Logo from 'images/logoFreedom.svg';
import Send from 'images/Send.svg';
import Title from 'antd/lib/typography/Title.js';
import Button from 'components/Button/Button.jsx';
import Input from 'components/Input/Input.jsx';
import { onLogin } from '../../../service/Auth/index.js';
import { LocalStorageKeys } from '../../../storage/localStorageKey.js';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { i18n } from '../../../utils/i18next.js';
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onFinish = (values) => {
    setLoading(true);
    onLogin(values)
      .then((res) => {
        if (res) {
          localStorage.setItem(
            LocalStorageKeys.FREEDOM_ACCESS_TOKEN,
            res.data?.id_token
          );
          notification.success({ message: 'welcome' });
        }
      })
      .catch((err) => {
        notification.error({ message: err });
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
        console.log('finally');
      });
  };

  useEffect(() => {
    if (localStorage.getItem(LocalStorageKeys.FREEDOM_ACCESS_TOKEN)) {
      history.push('/');
    }
  }, [localStorage.getItem(LocalStorageKeys.FREEDOM_ACCESS_TOKEN)]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const IconSend = () => {
    return <Image src={Send} preview={false} />;
  };

  return (
    <div className={styles.authBlock}>
      <Col span={24}>
        <Image src={Logo} preview={false} />
        <Title level={2}>{i18n.t('commons.signIn')}</Title>
        <span>{i18n.t('commons.comeBack')}</span>
        <Form
          name="basic"
          style={{ maxWidth: 550 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Row gutter={[16]}>
            <Col span={24}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' }
                ]}>
                <Input
                  size={'large'}
                  placeholder="Почта"
                  className={styles.inputItem}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' }
                ]}>
                <Input
                  size={'large'}
                  className={styles.inputItem}
                  placeholder="Пароль"
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button
                  className={styles.inputButton}
                  loading={loading}
                  iconButton={<IconSend />}
                  htmlType="submit">
                  <span>Войти</span>
                </Button>
              </Form.Item>
              <span>Забыли пароль?</span>
            </Col>
          </Row>
        </Form>
      </Col>
    </div>
  );
};

export default SignIn;
